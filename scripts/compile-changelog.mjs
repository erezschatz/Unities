#!/usr/bin/env node
// Copyright (c) 2026 Erez Schatz, https://github.com/erezschatz/unities. SPDX-License-Identifier: MIT
// compile-changelog <version> [--since <ref>] [--dry-run]
// The only writer CHANGELOG.md has. Reads "## What was done" sections added to tasks/
// since the last release and prepends them under a version heading.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const argv = process.argv.slice(2);
const dry = argv.includes("--dry-run");
const sinceIdx = argv.indexOf("--since");
const version = argv.find((a, i) => !a.startsWith("--") && argv[i - 1] !== "--since");
if (!version && !dry) { console.error("usage: compile-changelog <version> [--since <ref>] [--dry-run]"); process.exit(1); }

// git is started by name with a list of arguments, never through a shell: under Deno a
// shell is one more program to allow, and allowing it allows any program. The buffer is
// large because the log of a long-unreleased history is long.
// core.quotePath, on by default, prints a file name with a non-ASCII character quoted
// and escaped; off, it is printed as it is.
const git = args => {
  const result = spawnSync("git", ["-c", "core.quotePath=false", ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 1 << 30 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`git ${args.join(" ")} exited ${result.status}`);
  return result.stdout.trim();
};
// A Windows checkout commits and hands back CRLF line endings, and some editors put a
// byte-order mark first; neither is content.
const lf = text => text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
const lastTag = () => { try { return git(["describe", "--tags", "--abbrev=0"]); } catch { return ""; } };
const since = sinceIdx >= 0 ? argv[sinceIdx + 1] : (lastTag() || git(["rev-list", "--max-parents=0", "HEAD"]));

// The developer's git configuration can colour the diff, change its a/ and b/ prefixes,
// hand it to another program, widen or merge its context, stop finding renames, or pick
// another diff algorithm; these flags set each back to git's default.
const PLAIN_DIFF = ["--no-color", "--no-ext-diff", "--no-textconv", "--src-prefix=a/", "--dst-prefix=b/",
  "--unified=3", "--inter-hunk-context=0", "--find-renames", "--diff-algorithm=myers"];
const raw = git(["log", "--no-merges", "--reverse", "--format=%x1e%h%x1f%as", "-p", ...PLAIN_DIFF, `${since}..HEAD`, "--", "tasks/"]);
const entries = [];                       // { file, hash, date, lines[] }

for (const chunk of raw.split("\x1e").filter(Boolean)) {
  const [head, ...rest] = chunk.split("\n");
  const [hash, date] = head.split("\x1f");
  // A file's header runs from "diff --git" to its first "@@"; only there is "+++" the
  // header, so an added line that itself begins "++" is content.
  let file = null, inHeader = false, inSection = false, current = null;
  for (const line of rest) {
    if (line.startsWith("diff --git ")) { file = null; inHeader = true; inSection = false; current = null; continue; }
    if (inHeader) {
      if (line.startsWith("+++ b/")) file = line.slice(6);
      if (line.startsWith("@@")) inHeader = false;
      continue;
    }
    if (!file || !file.startsWith("tasks/") || file.startsWith("tasks/_")) continue;
    // A heading the scene did not change still ends the section above it, when the hunk
    // reaches it as context.
    if (line.startsWith(" ") && /^## /.test(line.slice(1))) { inSection = false; current = null; continue; }
    if (!line.startsWith("+")) { if (line.startsWith("@@")) { inSection = false; current = null; } continue; }
    const text = line.slice(1).replace(/^\uFEFF/, "").replace(/\r$/, "");
    if (/^## What was done/.test(text)) { inSection = true; current = { file, hash, date, lines: [] }; entries.push(current); continue; }
    if (/^## /.test(text)) { inSection = false; current = null; continue; }
    if (inSection && current) current.lines.push(text);
  }
}

// Task files get renamed (e.g. when a work item id is assigned). Records written
// under an earlier name must land under the file's current name.
const renamed = new Map();
for (const line of git(["log", "--reverse", "--format=", "--name-status", "-M", "--diff-filter=R", `${since}..HEAD`, "--", "tasks/"]).split("\n")) {
  const [, from, to] = line.split("\t");
  if (from && to) renamed.set(from, to);
}
const current = f => {
  const seen = new Set();
  while (renamed.has(f) && !seen.has(f)) { seen.add(f); f = renamed.get(f); }
  return f;
};

const byTask = new Map();
for (const e of entries) {
  const file = current(e.file);
  if (!byTask.has(file)) byTask.set(file, []);
  byTask.get(file).push(e);
}

const title = f => {
  if (!existsSync(f)) return f.replace(/^tasks\//, "").replace(/\.md$/, "");
  const m = lf(readFileSync(f, "utf8")).match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : f;
};

// ---- the entry ----
// Blank lines inside a record are its paragraph and list breaks: keep them, trim the
// ends. The hash goes once per record. Ordering is by task path, then by commit order,
// so the output is deterministic for the gate.
const trimBlank = lines => {
  let a = 0, b = lines.length;
  while (a < b && !lines[a].trim()) a++;
  while (b > a && !lines[b - 1].trim()) b--;
  return lines.slice(a, b);
};
// The line that closes an entry is the one per-repo value here, read from the gate's
// configuration ("changelog": {"recorded": ...}); {hash} is the short hash of the commit.
const CONFIG = ".claude/hooks/unities.json";
let config = {};
if (existsSync(CONFIG)) try { config = JSON.parse(lf(readFileSync(CONFIG, "utf8"))); }
catch (e) { console.error(`${CONFIG}: not valid JSON: ${e.message}`); process.exit(1); }
if (typeof config !== "object" || config === null || Array.isArray(config)) { console.error(`${CONFIG}: must hold a JSON object`); process.exit(1); }
if (config.changelog?.recorded !== undefined && typeof config.changelog.recorded !== "string") { console.error(`${CONFIG}: changelog.recorded must be a string`); process.exit(1); }
const recorded = config.changelog?.recorded || "Recorded in `{hash}`.";
const formatEntry = (e) => `${trimBlank(e.lines.filter(l => !/^Reviewed by:/.test(l))).join("\n")}\n\n${recorded.replaceAll("{hash}", e.hash)}`;
const today = new Date().toISOString().slice(0, 10);
let out = `## ${version ?? "<version>"} — ${today}\n\n`;
for (const file of [...byTask.keys()].sort()) {
  out += `### ${title(file)}\n\n${byTask.get(file).map(formatEntry).join("\n\n")}\n\n`;
}
// -----------------------------------------------------------

if (dry || entries.length === 0) {
  process.stdout.write(entries.length ? out : `(no task records since ${since})\n`);
  process.exit(0);
}

const path = "CHANGELOG.md";
const marker = /<!-- Compiled from tasks\/.*?-->\n?/;
let existing = existsSync(path) ? lf(readFileSync(path, "utf8")) : "# Changelog\n\n";
if (marker.test(existing)) existing = existing.replace(marker, m => m + "\n" + out);
else {
  const i = existing.indexOf("\n", existing.indexOf("# ")) + 1;
  existing = existing.slice(0, i) + "\n" + out + existing.slice(i);
}
writeFileSync(path, existing);
console.log(`CHANGELOG.md: ${entries.length} record(s) from ${byTask.size} task(s) since ${since}`);
