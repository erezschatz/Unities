// Copyright (c) 2026 Erez Schatz, https://github.com/erezschatz/unities. SPDX-License-Identifier: MIT
// Run with: node --test   (in the plugin: the master; in a repository: its planted copy)
// The same file in every repository. The throwaway repositories these tests build carry
// their own configuration, FIXTURE, so the tests pin the script's behaviour and not the
// roles of the repository they happen to run in.
import test from "node:test";
import assert from "node:assert/strict";
import { execSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// One path in each role of FIXTURE.
const SOURCE = "src/x.ts";
const TEST = "tests/x.test.ts";
const DOC = "docs/a.md";
const TASK = "tasks/1-t.md";
const SHARED = "CHANGELOG.md";
const RETIRED = "TODO.md";
const CONFIG = ".claude/hooks/unities.json";
const MANIFEST = ".claude/hooks/unities.manifest.json";
const FIXTURE = {
  scene: "pr",
  rules: {
    source: "^src/",
    test: "^tests?/",
    doc: "^(docs/|(^|/)(README|CLAUDE|AGENTS)\\.md$)",
    task: "^tasks/(?!README\\.md$)[^/_][^/]*\\.md$",
    shared: "^CHANGELOG\\.md$",
    retired: "^(TODO\\.md|TASKS\\.md|ROADMAP\\.md)$",
  },
  required: ["test", "doc", "task"],
  base: "origin/main",
  releaseFiles: "^(CHANGELOG\\.md|package\\.json|deno\\.json)$",
};

// The scripts sit side by side in the plugin, and in .claude/hooks/ and scripts/ once planted.
const here = dirname(fileURLToPath(import.meta.url));
const hook = join(here, "check-unit.mjs");
const sibling = name => existsSync(join(here, name)) ? join(here, name) : resolve(here, "../../scripts", name);
const compiler = sibling("compile-changelog.mjs");
const recordCompiler = sibling("compile-record.mjs");
const DECISIONS = "docs/DECISIONS.md";
const PLAN = "docs/PLAN.md";

// A repo whose main branch has adopted the hook, unless told otherwise.
function repo({ adopted = true } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "check-unit-"));
  const git = (args) => execSync(`git ${args}`, { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  const write = (file, text) => { mkdirSync(dirname(join(dir, file)), { recursive: true }); writeFileSync(join(dir, file), text); };
  git("init -q -b main");
  git("config user.email t@example.com");
  git("config user.name t");
  git("config commit.gpgsign false");
  write(CONFIG, JSON.stringify(FIXTURE, null, 2) + "\n");
  write(SHARED, "# Changelog\n\n<!-- Compiled from tasks/ by scripts/compile-changelog.mjs. Do not edit below this line by hand. -->\n");
  write(RETIRED, "Tasks now live in tasks/, one file each.\n");
  write(SOURCE, "base\n");
  write(DOC, "base\n");
  if (adopted) {
    mkdirSync(join(dir, ".claude/hooks"), { recursive: true });
    copyFileSync(hook, join(dir, ".claude/hooks/check-unit.mjs"));
    mkdirSync(join(dir, "scripts"), { recursive: true });
    copyFileSync(compiler, join(dir, "scripts/compile-changelog.mjs"));
    copyFileSync(recordCompiler, join(dir, "scripts/compile-record.mjs"));
  }
  // The merge man: compiles docs/DECISIONS.md and docs/PLAN.md from the task files.
  const compile = () => execSync("node scripts/compile-record.mjs", { cwd: dir, stdio: "ignore" });
  const read = (file) => readFileSync(join(dir, file), "utf8");
  if (adopted) compile();
  git("add -A");
  git("commit -q -m base");
  git("tag v0");
  const commit = (message) => { git("add -A"); git(`commit -q -m ${message}`); };
  return { dir, git, write, commit, compile, read };
}

function run(dir, args, { scene = "pr", stdin = "" } = {}) {
  return spawnSync("node", [hook, ...args], {
    cwd: dir, input: stdin, encoding: "utf8", env: { ...process.env, UNITIES_SCENE: scene },
  });
}

const complete = (write) => {
  write(TEST, "test\n");
  write(DOC, "documented\n");
  write(TASK, "# t\n\n## What was done\n\ndone\n\nReviewed by: a reader\n");
};

// ---- the gate (both stagings) ----

test("a pull request that changes source without its record is refused", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  commit("wip");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /no \w+ change/);
});

test("work-in-progress commits are fine once the pull request as a whole carries its record", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "stage 1\n");
  commit("stage-1");
  write(SOURCE, "stage 2\n");
  commit("stage-2");
  complete(write);
  commit("record");
  assert.equal(run(dir, ["--pr", "main"]).status, 0);
});

test("a pull request editing the compiled changelog by hand is refused", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SHARED, "hand edit\n");
  commit("edit");
  assert.match(run(dir, ["--pr", "main"]).stderr, /CHANGELOG\.md does not equal/);
});

test("a pull request deleting the compiled changelog is refused", () => {
  const { dir, git, commit } = repo();
  git("checkout -q -b feature");
  git(`rm -q ${SHARED}`);
  commit("delete");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /CHANGELOG\.md/);
});

test("a pull request editing a retired file is refused", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(RETIRED, "- [ ] a new item, in the old place\n");
  commit("edit");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /shared file edited directly: TODO\.md/);
});

test("a pull request deleting a retired file is not refused", () => {
  const { dir, git, commit } = repo();
  git("checkout -q -b feature");
  git(`rm -q ${RETIRED}`);
  commit("retire");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 0);
  assert.doesNotMatch(result.stderr, /shared file/);
});

test("a release pull request whose changelog equals the compiler's output passes", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  commit("feature");
  git("checkout -q main");
  git("merge -q --no-ff -m merge feature");
  git("checkout -q -b release");
  execSync("node scripts/compile-changelog.mjs 1.0.0 --since v0", { cwd: dir, stdio: "ignore" });
  commit("release");
  const ok = run(dir, ["--pr", "main"]);
  assert.equal(ok.status, 0, ok.stderr);
  // then a hand edit to the compiled section
  const path = join(dir, SHARED);
  writeFileSync(path, execSync(`cat ${path}`, { encoding: "utf8" }).replace("done", "done, and more"));
  commit("tamper");
  const bad = run(dir, ["--pr", "main"]);
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /does not equal the compiler's output/);
});

test("a pull request into a target that has not adopted the hook is not checked", () => {
  const { dir, git, write, commit } = repo({ adopted: false });
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  write(SHARED, "hand edit\n");
  commit("edit");
  assert.equal(run(dir, ["--pr", "main"]).status, 0);
});

test("a target the checkout does not know is an error, not a target that has not adopted", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  commit("wip");
  const result = run(dir, ["--pr", "origin/mian"]);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /origin\/mian is not a commit this checkout knows/);
  // A commit id the checkout never fetched, and a name that is not a commit, are refused too.
  const unfetched = "1234567890123456789012345678901234567890";
  for (const name of [unfetched, `main:${SOURCE}`]) {
    const other = run(dir, ["--pr", name]);
    assert.equal(other.status, 2, name);
    assert.match(other.stderr, /is not a commit this checkout knows/);
  }
});

test("on a CI merge commit, HEAD^1 is the target and only the PR's changes count", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  commit("feature");
  git("checkout -q main");
  write(DOC, "changed on main\n");   // on the target only; not the PR's doing
  commit("main");
  git("merge -q --no-ff -m merge feature");
  const result = run(dir, ["--pr", "HEAD^1"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /no \w+ change/);
});

// ---- acceptance boxes (both stagings, every mode) ----

test("a task file whose acceptance box names an outcome is refused", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, "# t\n\n## Context\n\n**Acceptance**\n\n- [ ] the user uninstalled the old app and started to use the new one\n- [ ] new schema is running in production\n\n## What was done\n\ndone\n\nReviewed by: a reader\n");
  commit("record");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /acceptance box in tasks\/1-t\.md names an outcome/);
  assert.match(result.stderr, /running in production/);
});

test("a task file whose acceptance boxes name the assignee's checks passes, in every mode", () => {
  const { dir, git, write, commit, compile } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, "# t\n\n## Context\n\n**Promise** — you no longer need the old app.\n\n**Acceptance**\n\n- [ ] every record from the old app exported and verified in the new one by the programmer\n- [ ] each ported workflow run end to end on the phone, logged\n- [x] `npm test` green\n\n## What was done\n\ndone\n\nReviewed by: a reader\n");
  git("add -A");
  assert.equal(run(dir, ["--staged"]).status, 0);
  commit("record");
  assert.equal(run(dir, ["--pr", "main"]).status, 0);
  compile();   // strict: the commit is also the merge, so it carries the compiled record
  git("add -A");
  assert.equal(run(dir, ["--staged"], { scene: "commit" }).status, 0);
  assert.equal(run(dir, ["--branch"], { scene: "commit" }).status, 0);
});

test("strict: an outcome acceptance box is refused at the commit, not only at merge", () => {
  const { dir, write, git } = repo();
  write(TASK, "# t\n\n- [ ] feature replaced old by active users\n");
  git("add -A");
  const result = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /names an outcome/);
});

// ---- the reader (both stagings, every mode) ----

test("a record without a Reviewed by line is refused; the one with it passes", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, "# t\n\n## What was done\n\ndone, nobody read it\n");
  git("add -A");
  const staged = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(staged.status, 2);
  assert.match(staged.stderr, /no "Reviewed by:" line/);
  commit("record");
  assert.match(run(dir, ["--pr", "main"]).stderr, /no "Reviewed by:" line/);
  write(TASK, "# t\n\n## What was done\n\ndone, nobody read it\n\nReviewed by: colleague\n");
  commit("reviewed");
  assert.equal(run(dir, ["--pr", "main"]).status, 0);
});

test("only records this scene adds are asked for a reader; earlier and migrated ones are not", () => {
  const { dir, git, write, commit } = repo();
  write(TASK, "# t\n\n## Context\n\nMigrated from TODO.md on 2026-01-01\n\n## What was done\n\nDone before adoption; no record.\n");
  commit("migrated");
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  write(TEST, "test\n");
  write(DOC, "documented\n");
  write(TASK, "# t\n\n## Context\n\nMigrated from TODO.md on 2026-01-01\n\n## What was done\n\nDone before adoption; no record.\n\n## What was done\n\nnew work\n\nReviewed by: a reader\n");
  commit("new");
  const ok = run(dir, ["--pr", "main"]);
  assert.equal(ok.status, 0, ok.stderr);
});

test("the compiler leaves the Reviewed by line out of the changelog", () => {
  const { dir, git, write, commit } = repo();
  write(SOURCE, "changed\n");
  complete(write);
  commit("feature");
  const out = execSync("node scripts/compile-changelog.mjs --dry-run --since v0", { cwd: dir, encoding: "utf8" });
  assert.match(out, /done/);
  assert.doesNotMatch(out, /Reviewed by/);
});

// ---- adapted staging: commits and turns warn ----

test("adapted: a commit with an incomplete scene warns but is not refused", () => {
  const { dir, write, git } = repo();
  write(SOURCE, "wip\n");
  git("add -A");
  const result = run(dir, ["--staged"]);
  assert.equal(result.status, 0);
  assert.match(result.stderr, /no \w+ change.*pull request will be refused/);
});

test("a clean merge commit does not warn about what the other branch recorded", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b other");
  write(SOURCE, "base\nmore\n");
  complete(write);
  commit("other");
  git("checkout -q main");
  write("docs/b.md", "ours\n");
  commit("ours");
  git("merge --no-commit --no-ff other");
  assert.equal(run(dir, ["--staged"]).stderr, "");
});

test("adapted: the Stop hook advises the agent once, in its context, and never blocks", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "stage 1\n");
  commit("stage-1");
  const stop = (active) => JSON.stringify({ hook_event_name: "Stop", cwd: dir, stop_hook_active: active });
  const first = run(dir, ["--branch", "main"], { stdin: stop(false) });
  assert.equal(first.status, 0);
  assert.match(JSON.parse(first.stdout).hookSpecificOutput.additionalContext, /no \w+ change/);
  const second = run(dir, ["--branch", "main"], { stdin: stop(true) });
  assert.equal(second.status, 0);
  assert.match(JSON.parse(second.stdout).systemMessage, /no \w+ change/);
  complete(write);   // uncommitted and untracked still count
  assert.equal(run(dir, ["--branch", "main"], { stdin: stop(false) }).stdout, "");
});

// ---- strict staging: commits and turns refuse ----

test("strict: a commit with an incomplete scene is refused", () => {
  const { dir, write, git } = repo();
  write(SOURCE, "wip\n");
  git("add -A");
  const result = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /revert it/);
});

test("strict: deleting a retired file is a complete scene on its own", () => {
  const { dir, git } = repo();
  git(`rm -q ${RETIRED}`);
  assert.equal(run(dir, ["--staged"], { scene: "commit" }).status, 0);
});

test("strict: PreToolUse ignores shell commands that are not a git commit", () => {
  const { dir, write, git } = repo();
  write(SOURCE, "wip\n");
  git("add -A");
  const pre = (command) => JSON.stringify({ hook_event_name: "PreToolUse", cwd: dir, tool_input: { command } });
  assert.equal(run(dir, ["--staged"], { scene: "commit", stdin: pre("npm test && echo $(date)") }).status, 0);
  assert.equal(run(dir, ["--staged"], { scene: "commit", stdin: pre("git commit -m \"$(cat <<'EOF'\nwip\nEOF\n)\"") }).status, 2);
});

test("strict: the Stop hook sends the agent back once, then lets go and tells the person", () => {
  const { dir, write, compile } = repo();
  write(SOURCE, "wip\n");
  const stop = (active) => JSON.stringify({ hook_event_name: "Stop", cwd: dir, stop_hook_active: active });
  const first = run(dir, ["--branch"], { scene: "commit", stdin: stop(false) });
  assert.equal(first.status, 2);
  const second = run(dir, ["--branch"], { scene: "commit", stdin: stop(true) });
  assert.equal(second.status, 0);
  assert.match(JSON.parse(second.stdout).systemMessage, /no \w+ change/);
  complete(write);
  compile();
  assert.equal(run(dir, ["--branch"], { scene: "commit", stdin: stop(false) }).status, 0);
});

// ---- the same script, called from Codex's hooks (4.10) ----

test("codex, adapted: the Stop hook continues the turn once with the note, then lets go and tells the person", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "stage 1\n");
  commit("stage-1");
  const stop = (active) => JSON.stringify({ hook_event_name: "Stop", cwd: dir, turn_id: "t1", stop_hook_active: active });
  const first = run(dir, ["--branch", "--codex", "main"], { stdin: stop(false) });
  assert.equal(first.status, 0);
  const told = JSON.parse(first.stdout);
  assert.equal(told.decision, "block");
  assert.match(told.reason, /no \w+ change/);
  assert.match(told.reason, /fine to keep/);
  assert.equal(told.hookSpecificOutput, undefined);   // Codex documents no such field at Stop
  const second = run(dir, ["--branch", "--codex", "main"], { stdin: stop(true) });
  assert.equal(second.status, 0);
  assert.match(JSON.parse(second.stdout).systemMessage, /no \w+ change/);
  complete(write);
  assert.equal(run(dir, ["--branch", "--codex", "main"], { stdin: stop(false) }).stdout, "");
});

test("codex: the flag is not read as the base, wherever it stands", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  commit("wip");
  const plain = run(dir, ["--pr", "main"]);
  for (const args of [["--pr", "--codex", "main"], ["--pr", "main", "--codex"]]) {
    const flagged = run(dir, args);
    assert.equal(flagged.status, plain.status);
    assert.equal(flagged.stderr, plain.stderr);
  }
});

test("codex, strict: Stop and PreToolUse refuse as they do under Claude Code", () => {
  const { dir, write, git } = repo();
  write(SOURCE, "wip\n");
  const stop = (active) => JSON.stringify({ hook_event_name: "Stop", cwd: dir, turn_id: "t1", stop_hook_active: active });
  const first = run(dir, ["--branch", "--codex"], { scene: "commit", stdin: stop(false) });
  assert.equal(first.status, 2);
  assert.match(first.stderr, /no \w+ change/);
  const second = run(dir, ["--branch", "--codex"], { scene: "commit", stdin: stop(true) });
  assert.equal(second.status, 0);
  assert.match(JSON.parse(second.stdout).systemMessage, /no \w+ change/);
  git("add -A");
  const pre = (command) => JSON.stringify({ hook_event_name: "PreToolUse", cwd: dir, tool_name: "Bash", tool_input: { command } });
  assert.equal(run(dir, ["--staged", "--codex"], { scene: "commit", stdin: pre("npm test") }).status, 0);
  assert.equal(run(dir, ["--staged", "--codex"], { scene: "commit", stdin: pre("git commit -m wip") }).status, 2);
});

// ---- the compiled record: docs/DECISIONS.md and docs/PLAN.md ----

const decision = (date, title, extra = "") =>
  `### ${date} · ${title}\n\n**Decision** — yes.\n**Rejected** — no.\n**Why** — because.\n${extra}`;
const taskWith = (...decisions) =>
  `# t\n\n## Context\n\nasked\n\n## Decisions\n\n${decisions.join("\n")}\n## What was done\n\ndone\n\nReviewed by: a reader\n`;

test("a decision written in a task file is compiled with the next number, and the plan lists the task", () => {
  const { write, compile, read } = repo();
  write(DECISIONS, "# Decisions\n\n## D1 · 2026-01-01 · written by hand before\n\nkept\n");
  write(TASK, taskWith(decision("2026-11-11", "One file per unit", "Milestone: After 03: sync proven\nNot in scope: tablets\n")));
  compile();
  assert.match(read(DECISIONS), /written by hand before\n\nkept\n\n<!-- Compiled from tasks\//);
  assert.match(read(DECISIONS), /## D2 · 2026-11-11 · One file per unit\n\n\*\*Decision\*\* — yes\./);
  assert.match(read(DECISIONS), /Source: \[tasks\/1-t\.md\]/);
  assert.match(read(PLAN), /- \[1-t\]\(\.\.\/tasks\/1-t\.md\) — t · done/);
  assert.match(read(PLAN), /## Milestones\n\n- After 03: sync proven \(D2\)/);
  assert.match(read(PLAN), /## Not in scope\n\n- tablets \(D2\)/);
  const before = read(DECISIONS) + read(PLAN);
  compile();
  assert.equal(read(DECISIONS) + read(PLAN), before);
});

test("a compiled decision keeps its number whatever is compiled after it", () => {
  const { write, compile, read } = repo();
  write(TASK, taskWith(decision("2026-11-11", "Second by date")));
  compile();
  write("tasks/0-earlier.md", taskWith(decision("2026-10-01", "First by date")));
  compile();
  assert.match(read(DECISIONS), /## D1 · 2026-11-11 · Second by date[^]*## D2 · 2026-10-01 · First by date/);
});

test("a decision that supersedes another takes that one's lines out of the plan", () => {
  const { write, compile, read } = repo();
  write(TASK, taskWith(decision("2026-11-01", "No tablets", "Not in scope: tablets\n")));
  compile();
  assert.match(read(PLAN), /- tablets \(D1\)/);
  write("tasks/2-u.md", taskWith(decision("2026-11-11", "Tablets after all", "Supersedes: D1\n")));
  compile();
  assert.doesNotMatch(read(PLAN), /tablets \(D1\)/);
  assert.match(read(DECISIONS), /## D1 · 2026-11-01 · No tablets/);   // the old entry stays
});

test("adapted: a pull request that writes its decision in its task file passes", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, taskWith(decision("2026-11-11", "One file per unit")));
  commit("feature");
  const ok = run(dir, ["--pr", "main"]);
  assert.equal(ok.status, 0, ok.stderr);
});

test("adapted: a pull request that touches the compiled record is refused, by hand or by compiler", () => {
  const { dir, git, write, commit, compile, read } = repo();
  git("checkout -q -b by-hand");
  write(SOURCE, "changed\n");
  complete(write);
  write(DECISIONS, read(DECISIONS) + "\n## D1 · 2026-11-11 · appended by hand\n");
  commit("by-hand");
  assert.match(run(dir, ["--pr", "main"]).stderr, /compiled record edited in this scene: docs\/DECISIONS\.md/);
  git("checkout -q main");
  git("checkout -q -b by-compiler");
  write(SOURCE, "changed\n");
  complete(write);
  compile();
  commit("by-compiler");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /compiled record edited in this scene: docs\/PLAN\.md/);
});

test("what the target did after the branch forked is not the pull request's doing", () => {
  const { dir, git, write, commit, compile } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  commit("feature");
  git("checkout -q main");
  write("tasks/2-u.md", taskWith(decision("2026-11-19", "Decided on the target")));
  compile();   // the merge man recompiled the record on the target; the branch is now behind
  commit("main");
  git("checkout -q feature");
  const ok = run(dir, ["--pr", "main"]);
  assert.equal(ok.status, 0, ok.stderr);
  // A caller that still passes the fork point itself gets the same answer.
  assert.equal(run(dir, ["--pr", git("merge-base main HEAD").trim()]).status, 0);
  // And the branch's own edit to the compiled record is still refused.
  write(DECISIONS, "by hand\n");
  commit("by-hand");
  const own = run(dir, ["--pr", "main"]);
  assert.equal(own.status, 1);
  assert.match(own.stderr, /compiled record edited in this scene: docs\/DECISIONS\.md/);
});

test("a pull request with no history in common with its target stops with an error", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q --orphan elsewhere");
  write(SOURCE, "changed\n");
  commit("elsewhere");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /no merge base between main and HEAD/);
});

test("the compiled record does not count as the doc change", () => {
  const { dir, git, write, commit, compile } = repo();
  write(SOURCE, "changed\n");
  write(TEST, "test\n");
  write(TASK, taskWith(decision("2026-11-11", "One file per unit")));
  compile();
  git("add -A");
  const result = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /no doc change/);
});

test("the compile after a merge: only the compiled files, equal to the compiler's output", () => {
  const { dir, git, write, commit, compile, read } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, taskWith(decision("2026-11-11", "One file per unit")));
  commit("feature");
  git("checkout -q main");
  git("merge -q --no-ff -m merge feature");
  git("checkout -q -b record");
  compile();
  commit("compile");
  const ok = run(dir, ["--pr", "main"]);
  assert.equal(ok.status, 0, ok.stderr);
  write(DECISIONS, read(DECISIONS).replace("because", "because I say so"));
  commit("tamper");
  assert.match(run(dir, ["--pr", "main"]).stderr, /compiled record is out of date/);
  compile();
  write(PLAN, "# Plan\n\nA milestone added by hand above the line.\n" + read(PLAN).slice(read(PLAN).indexOf("\n<!-- Compiled")));
  commit("head");
  assert.match(run(dir, ["--pr", "main"]).stderr, /hand-written head of docs\/PLAN\.md was edited/);
});

test("removing or retitling a compiled decision is refused in every staging", () => {
  const { dir, git, write, commit, compile } = repo();
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, taskWith(decision("2026-11-11", "One file per unit")));
  compile();
  commit("compiled");
  git("checkout -q -b feature");
  write(TASK, taskWith(decision("2026-11-11", "One file per unit, on second thought")));
  commit("retitle");
  const result = run(dir, ["--pr", "main"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /D1 .* is compiled .* never removed or retitled/);
  git("add -A");
  assert.equal(run(dir, ["--branch"], { scene: "commit" }).status, 0);   // nothing uncommitted
  write(TASK, taskWith(decision("2026-11-11", "Retitled again")));
  assert.equal(run(dir, ["--branch"], { scene: "commit" }).status, 2);
});

test("strict: a commit whose compiled record is out of date is refused; compiled and staged, it passes", () => {
  const { dir, git, write, compile } = repo();
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, taskWith(decision("2026-11-11", "One file per unit")));
  git("add -A");
  const stale = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(stale.status, 2);
  assert.match(stale.stderr, /compiled record is out of date/);
  compile();
  assert.match(run(dir, ["--staged"], { scene: "commit" }).stderr, /compiled record not staged/);
  git("add -A");
  assert.equal(run(dir, ["--staged"], { scene: "commit" }).status, 0);
});

test("a file that is not compiled yet at the base is an ordinary file", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b old");
  write(DECISIONS, "# Decisions\n\n## D1 · 2026-01-01 · by hand\n");   // main as it was before this version
  write(PLAN, "# Plan\n\n| 01 | by hand |\n");
  commit("old");
  git("checkout -q -b upgrade");
  write(DECISIONS, "# Decisions\n\n## D1 · 2026-01-01 · by hand\n\ntidied during the upgrade\n");
  write(SOURCE, "changed\n");
  complete(write);
  commit("upgrade");
  const result = run(dir, ["--pr", "old"]);
  assert.equal(result.status, 0, result.stderr);
});

// ---- review rounds (both stagings) ----

const review = (...items) => `# t\n\n## What was done\n\ndone\n\nReviewed by: a reader\n\n## Review · 2026-11-11\n\n${items.join("\n")}`;
const item = (boxes, { found = "**Found** — created rows stay in the preview after a partial import.\n\n", notAsked = "**Not asked** — no schema change.\n" } = {}) =>
  `### Rows after a partial import\n\n${found}**Done when**\n\n${boxes.join("\n")}\n\n${notAsked}`;

test("a review item names every case as case → outcome, and what was not asked", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  write(TASK, review(item(["- [x] keep only the failed rows importable"])));
  commit("review");
  assert.match(run(dir, ["--pr", "main"]).stderr, /"keep only the failed rows importable" is not "case → outcome"/);
  write(TASK, review(item(["- [x] rows created → removed"], { notAsked: "" })));
  commit("no-not-asked");
  assert.match(run(dir, ["--pr", "main"]).stderr, /needs \*\*Found\*\*, \*\*Done when\*\* with a box per case, and \*\*Not asked\*\*/);
});

test("a pull request with an open review item does not merge; a commit on the way is not held to it", () => {
  const { dir, git, write, commit } = repo();
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  complete(write);
  const boxes = (tick) => [`- [x] rows created → removed`, `- [${tick}] rows never sent → stay, with their error, not importable`, `- [x] the user edits the default → it is no longer refreshed`];
  write(TASK, review(item(boxes(" "))));
  git("add -A");
  assert.equal(run(dir, ["--staged"]).stderr, "");
  commit("review");
  const open = run(dir, ["--pr", "main"]);
  assert.equal(open.status, 1);
  assert.match(open.stderr, /review item "Rows after a partial import" in tasks\/1-t\.md is still open/);
  write(TASK, review(item(boxes("x"))));
  commit("closed");
  const ok = run(dir, ["--pr", "main"]);
  assert.equal(ok.status, 0, ok.stderr);
});

test("a review round from before this rule is left alone", () => {
  const { dir, git, write, commit } = repo();
  write(TASK, "# t\n\n## Review\n\n### Barrages\n\n- [ ] keep only the failed rows importable\n");
  commit("old");
  git("checkout -q -b feature");
  write(SOURCE, "changed\n");
  write(TEST, "test\n");
  write(DOC, "documented\n");
  write(TASK, "# t\n\n## Review\n\n### Barrages\n\n- [ ] keep only the failed rows importable\n\n## What was done\n\ndone\n\nReviewed by: a reader\n");
  commit("new");
  const ok = run(dir, ["--pr", "main"]);
  assert.equal(ok.status, 0, ok.stderr);
});

// ---- the scripts as files: configuration and manifest ----

const sha256 = text => createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex");
const PLANTED = {
  ".claude/hooks/check-unit.mjs": hook,
  "scripts/compile-changelog.mjs": compiler,
  "scripts/compile-record.mjs": recordCompiler,
};
// A repository planted the way the runbook plants: the files copied, the manifest beside them.
function planted() {
  const r = repo();
  const files = Object.fromEntries(Object.keys(PLANTED).map(f => [f, sha256(r.read(f))]));
  r.write(MANIFEST, JSON.stringify({ version: "test", files }, null, 2) + "\n");
  r.commit("manifest");
  return r;
}

test("the roles are read from the configuration file", () => {
  const { dir, git, write, read } = repo();
  write(CONFIG, JSON.stringify({ ...FIXTURE, rules: { ...FIXTURE.rules, source: "^lib/" } }));
  git("add -A"); git("commit -q -m lib-is-source");
  write("src/y.ts", "not source here\n");
  git("add -A");
  assert.equal(run(dir, ["--staged"], { scene: "commit" }).status, 0);
  write("lib/y.ts", "source here\n");
  git("add -A");
  const result = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /no test change/);
  assert.ok(read(CONFIG).includes("^lib/"));
});

test("without its configuration the gate stops and names the file", () => {
  const { dir, git } = repo();
  git(`rm -q ${CONFIG}`);
  const result = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /\.claude\/hooks\/unities\.json is missing/);
});

test("a planted script edited in place is refused, naming the file, in every mode", () => {
  const { dir, git, write, read, commit } = planted();
  git("checkout -q -b feature");
  write("scripts/compile-record.mjs", read("scripts/compile-record.mjs") + "// a local fix\n");
  const edited = /planted file edited: scripts\/compile-record\.mjs/;
  const branch = run(dir, ["--branch"], { scene: "commit" });   // strict Stop: the work tree
  assert.equal(branch.status, 2);
  assert.match(branch.stderr, edited);
  git("add -A");
  const staged = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(staged.status, 2);
  assert.match(staged.stderr, edited);
  commit("local-fix");
  const pr = run(dir, ["--pr", "main"]);
  assert.equal(pr.status, 1);
  assert.match(pr.stderr, /planted file edited: scripts\/compile-record\.mjs/);
});

test("a planted copy equal to the plugin's passes; deleting one is refused", () => {
  const { dir, git, write, read, compile } = planted();
  // The same bytes copied again, as an upgrade to an unchanged file does.
  write(".claude/hooks/check-unit.mjs", readFileSync(hook, "utf8"));
  write(TASK, "# t\n\n## Context\n\nopened\n");
  compile();
  git("add -A");
  const same = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(same.status, 0, same.stderr);
  git("reset -q --hard");
  git("rm -q scripts/compile-changelog.mjs");
  const gone = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(gone.status, 2);
  assert.match(gone.stderr, /planted file missing: scripts\/compile-changelog\.mjs/);
  assert.ok(read(MANIFEST).includes("compile-changelog"));
});

test("an upgrade copies a script and the manifest together, and passes", () => {
  const { dir, git, write, read } = planted();
  const next = read("scripts/compile-record.mjs") + "// the plugin's next version\n";
  const manifest = JSON.parse(read(MANIFEST));
  manifest.files["scripts/compile-record.mjs"] = sha256(next);
  write("scripts/compile-record.mjs", next);
  write(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  git("add -A");
  assert.equal(run(dir, ["--staged"], { scene: "commit" }).status, 0);
});

test("a checkout that writes CRLF has not edited a planted script", () => {
  const { dir, git, write, read } = planted();
  write("scripts/compile-record.mjs", read("scripts/compile-record.mjs").replace(/\n/g, "\r\n"));
  assert.equal(run(dir, ["--branch"], { scene: "commit" }).status, 0);
});

test("the plugin's manifest holds the hash of every file it ships", { skip: !existsSync(join(here, "manifest.json")) && "not the plugin: this copy is planted" }, () => {
  const manifest = JSON.parse(readFileSync(join(here, "manifest.json"), "utf8"));
  const shipped = [".claude/hooks/check-unit.mjs", ".claude/hooks/check-unit.test.mjs", "scripts/compile-changelog.mjs", "scripts/compile-record.mjs"];
  assert.deepEqual(Object.keys(manifest.files).sort(), shipped.sort());
  for (const [file, hash] of Object.entries(manifest.files)) {
    const master = join(here, file.split("/").pop());
    assert.equal(hash, sha256(readFileSync(master, "utf8")), `${file}: run node ${join(here, "make-manifest.mjs")}`);
  }
});

test("deleting the planted manifest is refused, and the scripts are still judged against it", () => {
  const { dir, git, write, read, commit } = planted();
  git("checkout -q -b feature");
  git(`rm -q ${MANIFEST}`);
  const deleted = /planted manifest deleted: \.claude\/hooks\/unities\.manifest\.json/;
  const branch = run(dir, ["--branch"], { scene: "commit" });
  assert.equal(branch.status, 2);
  assert.match(branch.stderr, deleted);
  write("scripts/compile-record.mjs", read("scripts/compile-record.mjs") + "// a local fix\n");
  git("add -A");
  const staged = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(staged.status, 2);
  assert.match(staged.stderr, deleted);
  assert.match(staged.stderr, /planted file edited: scripts\/compile-record\.mjs/);
  commit("no-manifest");
  const pr = run(dir, ["--pr", "main"]);
  assert.equal(pr.status, 1);
  assert.match(pr.stderr, deleted);
});

test("a scene that touches no planted file is not judged by the manifest; a clean tree passes", () => {
  const { dir, git, write, compile } = planted();
  assert.equal(run(dir, ["--branch"], { scene: "commit" }).status, 0);
  write(SOURCE, "changed\n");
  git("add -A");
  const result = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(result.status, 2);
  assert.doesNotMatch(result.stderr, /planted/);
  complete(write);
  compile();
  git("add -A");
  assert.equal(run(dir, ["--staged"], { scene: "commit" }).status, 0);
});

test("without its configuration: other commands pass, a commit is refused, a Stop lets go on its second pass", () => {
  const { dir, git } = repo();
  git(`rm -q ${CONFIG}`);
  const pre = (command) => JSON.stringify({ hook_event_name: "PreToolUse", cwd: dir, tool_input: { command } });
  const stop = (active) => JSON.stringify({ hook_event_name: "Stop", cwd: dir, stop_hook_active: active });
  assert.equal(run(dir, ["--staged"], { scene: "commit", stdin: pre("ls") }).status, 0);
  const commit = run(dir, ["--staged"], { scene: "commit", stdin: pre("git commit -m x") });
  assert.equal(commit.status, 2);
  assert.match(commit.stderr, /unities\.json is missing/);
  const first = run(dir, ["--branch"], { scene: "commit", stdin: stop(false) });
  assert.equal(first.status, 2);
  assert.match(first.stderr, /unities\.json is missing/);
  const second = run(dir, ["--branch"], { scene: "commit", stdin: stop(true) });
  assert.equal(second.status, 0);
  assert.match(JSON.parse(second.stdout).systemMessage, /unities\.json is missing/);
  assert.equal(run(dir, ["--pr", "main"]).status, 2);
});

test("in the plugin's own repository a changed master must arrive in its planted copy", () => {
  const { dir, git, write, read, compile } = planted();
  const PLUGIN = "plugin/files";
  // The masters beside the copies, and the configuration that says where they are.
  for (const [file] of Object.entries(PLANTED)) write(`${PLUGIN}/${file.split("/").pop()}`, read(file));
  write(`${PLUGIN}/manifest.json`, read(MANIFEST));
  write(CONFIG, JSON.stringify({ ...FIXTURE, plugin: PLUGIN }));
  git("add -A"); git("commit -q -m masters");
  const next = read(`${PLUGIN}/compile-record.mjs`) + "// the next version\n";
  const manifest = JSON.parse(read(MANIFEST));
  manifest.files["scripts/compile-record.mjs"] = sha256(next);
  write(`${PLUGIN}/compile-record.mjs`, next);
  write(`${PLUGIN}/manifest.json`, JSON.stringify(manifest, null, 2) + "\n");
  git("add -A");
  const stale = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(stale.status, 2);
  assert.match(stale.stderr, /planted copy out of date: scripts\/compile-record\.mjs/);
  assert.match(stale.stderr, /planted copy out of date: \.claude\/hooks\/unities\.manifest\.json/);
  write("scripts/compile-record.mjs", next);
  write(MANIFEST, read(`${PLUGIN}/manifest.json`));
  compile();
  git("add -A");
  const copied = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(copied.status, 0, copied.stderr);
  git("commit -q -m copied");
  write(DOC, "a doc change only\n");
  git("add -A");
  assert.equal(run(dir, ["--staged"], { scene: "commit" }).status, 0);
});

test("in the plugin's repository a broken master manifest is refused by name, and a Stop lets go", () => {
  const { dir, git, write, read } = planted();
  write("plugin/files/manifest.json", read(MANIFEST));
  write(CONFIG, JSON.stringify({ ...FIXTURE, plugin: "plugin/files" }));
  git("add -A"); git("commit -q -m masters");
  write("plugin/files/manifest.json", "{");
  git("add -A");
  const staged = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(staged.status, 2);
  assert.match(staged.stderr, /plugin\/files\/manifest\.json is not valid JSON/);
  const stop = run(dir, ["--branch"], { scene: "commit", stdin: JSON.stringify({ hook_event_name: "Stop", cwd: dir, stop_hook_active: true }) });
  assert.equal(stop.status, 0);
  assert.match(JSON.parse(stop.stdout).systemMessage, /manifest\.json is not valid JSON/);
});

test("required may hold a list per role: a procedure needs its doc and task, not a test", () => {
  const { dir, git, write, compile } = repo();
  write(CONFIG, JSON.stringify({
    ...FIXTURE,
    rules: { ...FIXTURE.rules, procedure: "^procedure/" },
    required: { source: ["test", "doc", "task"], procedure: ["doc", "task"] },
  }));
  git("add -A"); git("commit -q -m procedure-role");
  write("procedure/RUNBOOK.md", "a step\n");
  git("add -A");
  const alone = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(alone.status, 2);
  assert.match(alone.stderr, /no doc change; no task change/);
  assert.doesNotMatch(alone.stderr, /no test change/);
  write(DOC, "documented\n");
  write(TASK, "# t\n\n## What was done\n\ndone\n\nReviewed by: a reader\n");
  compile();
  git("add -A");
  const recorded = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(recorded.status, 0, recorded.stderr);
  write(SOURCE, "changed too\n");
  git("add -A");
  const source = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(source.status, 2);
  assert.match(source.stderr, /no test change/);
});

test("required naming a role that rules does not have stops the gate", () => {
  const { dir, git, write } = repo();
  write(CONFIG, JSON.stringify({ ...FIXTURE, required: { source: ["test"], procedure: ["doc"] } }));
  git("add -A");
  const result = run(dir, ["--staged"], { scene: "commit" });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /required names "procedure"/);
});

test("a required that is not a list or a map, misses source, or names no own role stops the gate", () => {
  const { dir, git, write } = repo();
  const stop = JSON.stringify({ hook_event_name: "Stop", cwd: dir, stop_hook_active: true });
  const cases = [
    [null, /required must be a list of roles, or a map/],
    [5, /required must be a list of roles, or a map/],
    ["test", /required must be a list of roles, or a map/],
    [{ procedure: ["doc"] }, /required has no "source"/],
    [{}, /required has no "source"/],
    [[], /required has no "source", or an empty one/],
    [{ source: [] }, /required has no "source", or an empty one/],
    [{ source: "test" }, /required\.source must be a list of roles/],
    [{ source: ["test"], toString: ["doc"] }, /required names "toString"/],
    [["test", "constructor"], /required names "constructor"/],
  ];
  for (const [required, message] of cases) {
    write(CONFIG, JSON.stringify({ ...FIXTURE, required }));
    write(SOURCE, `changed ${JSON.stringify(required)}\n`);
    git("add -A");
    const result = run(dir, ["--staged"], { scene: "commit" });
    assert.equal(result.status, 2, JSON.stringify(required));
    assert.match(result.stderr, message);
    assert.match(result.stderr, /\.claude\/hooks\/unities\.json/);
    const second = run(dir, ["--branch"], { scene: "commit", stdin: stop });
    assert.equal(second.status, 0);
    assert.match(JSON.parse(second.stdout).systemMessage, message);
  }
  write(CONFIG, JSON.stringify({ ...FIXTURE, rules: { ...FIXTURE.rules, extra: 7 } }));
  git("add -A");
  assert.match(run(dir, ["--staged"], { scene: "commit" }).stderr, /rules\.extra must be a regular expression/);
  assert.match(JSON.parse(run(dir, ["--branch"], { scene: "commit", stdin: stop }).stdout).systemMessage, /rules\.extra must be a regular expression/);
});
