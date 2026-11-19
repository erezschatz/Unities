# Adopt the Unities in this repository

## Context

Asked by Erez on 2026-11-19, by running `/unities:unities-project` in this repository.
Several open tasks waited on it (`tasks/a-marketplace-file.md`,
`tasks/the-scripts-as-files.md`). Discovery and the proposal are in the session; Erez
approved the proposal as written ("all is good, go").

**Promise** — A fresh session, a person or Claude, can open this repository and know what
the plugin is, what was decided and what comes next; and the repository that ships the
gate is held to it.

**Acceptance**

- [x] script: `node --test .claude/hooks/check-unit.test.mjs` passes
- [x] script: `node scripts/compile-record.mjs --check` exits 0
- [x] script: `check-unit.mjs --staged` with a probe file under `skills/` and nothing else exits 2 naming the missing task change
- [x] the assignee: a fresh subagent given only the repository says what the project is, what was decided and what comes next without guessing

## Decisions

### 2026-11-19 · Strict: the commit is the scene

**Decision** — This repository runs the strict staging: a `git commit` made through
Claude Code and the end of an agent turn refuse an incomplete scene. A commit from a
shell is not checked (D5); the one made there is a release (D8).
**Rejected** — Adapted (the pull request is the scene).
**Why** — One developer, every commit but a release made through the agent, no
pull-request policy and no CI. Strict is the ideal where commits are already complete units, and they are here.

### 2026-11-19 · No copy of the runbook in docs/

**Decision** — This repository plants no `docs/UNITIES.md`. The adoption carried out the
master, `skills/unities-project/UNITIES.md`, in place.
**Rejected** — Planting a byte-identical copy like any other deployment.
**Why** — A second copy of the master in the repository that holds the master is a second
account of the procedure, which would drift exactly the way deployments are forbidden to.

### 2026-11-19 · A source change requires a task record, and only that, until the scripts are files

**Decision** — Source is `skills/` and `.claude-plugin/`. `REQUIRED` is `["task"]`. The
test role is `tests/`, which does not exist yet; the doc role is the usual
`docs/`, `README.md`, `CLAUDE.md`. Nothing is retired (`RULES.retired` matches nothing).
**Rejected** — `["test", "doc", "task"]`, the runbook's default; `["doc", "task"]`.
**Why** — The runbook is at once the source, the tests (Appendix J) and much of the
documentation. A test change cannot be a separate file until the scripts are files, and
a doc requirement would force a README or spec edit with every runbook change (the 0.5.4
commit, correct as it was, touched no doc). The `CLAUDE.md` paragraph asks for the tests
and the doc line by rule instead. `tasks/the-scripts-as-files.md` brings `test` and `doc`
back by a decision that supersedes this one.

### 2026-11-19 · Four Appendix J tests are skipped here, not deleted

**Decision** — The three tests of retired files and "the compiled record does not count
as the doc change" carry a `skip` with the reason. The per-repo paths are
`skills/x/SKILL.md` for source and `tests/x.test.mjs` for test.
**Rejected** — Deleting them, as the runbook says a new project does with the retired
tests; leaving them failing.
**Why** — They test rules this repository's `RULES` and `REQUIRED` switch off (nothing
retired; doc not required). A skip keeps their text, so they return unchanged with the
roles.

### 2026-11-19 · Bindings left out: git hook, Codex, CI gate, developer's guide, package.json

**Decision** — Installed: the Claude Code `Stop` and `PreToolUse` bindings. Not installed:
the git pre-commit binding (4.3), the Codex binding (4.10), the CI gate (4.7), the
developer's guide (4.8), a `package.json` for the compilers.
**Rejected** — Installing each.
**Why** — Erez said every commit goes through Claude Code, except a release, which he
commits from his shell (D8), and that no one works here with Codex; add the git hook the day a commit comes from a shell or a second agent, and 4.10
with it. There is no CI to put a gate in. The developer's guide would repeat
`tasks/README.md` and `CLAUDE.md` for one developer. A `package.json` would make the
plugin look like an npm package only to name two scripts, which are called as
`node scripts/….mjs` instead. `tasks/verify-the-codex-binding.md` stays open; it is to be
run in another repository.

### 2026-11-19 · No phases and no final run

**Decision** — The plan has no phases and no final-run task.
**Rejected** — A phase 1 closed by a final run, as the skill prescribes for a new project.
**Why** — A plugin repository has no app that a user runs for a period; the plugin is
verified by being run in other repositories, which each open task names in its own
acceptance. A final run here would be ceremony.

### 2026-11-19 · The order of the open tasks

**Decision** — The task files keep their names. The open tasks are worked in this order:
`the-scripts-as-files`, `new-records-are-found-by-heading-text`,
`the-gate-does-not-require-a-record`, `a-marketplace-file`, `verify-the-codex-binding`,
`run-the-gate-under-cmd-exe`.
**Rejected** — Renaming them with numbers so the file-name order is the working order.
**Why** — Their `## Context` sections cite one another by path, and Context is not
edited. Scripts as files comes first because both gate fixes are then made once, in
files, with tests that run here.

### 2026-11-19 · The changelog starts at the adoption

**Decision** — The release boundary is a local tag `v0.5.5` on `db7a6d4`, the last commit
before the adoption. A release touches `CHANGELOG.md` and `.claude-plugin/plugin.json`.
Erez runs the compiler and commits the release from his shell, which nothing here
checks (D5). A release committed through Claude Code is refused by the `PreToolUse`
binding as a hand edit of `CHANGELOG.md`, and that stays so. `RELEASE_FILES` takes
effect only under `--pr`, which nothing here runs; it is set for the day a CI gate is.
**Rejected** — Compiling the records of 0.5.2–0.5.5 into the first changelog; no tag,
leaving the compiler to start from the first commit; `--no-verify`, the runbook's strict
release path, which bypasses no hook here because there is no git hook; exempting
releases from the `--staged` check, which is a change to the master.
**Why** — The skill says the compiled changelog starts at the migration. Without a tag
the compiler and the gate both fall back to the root commit. The tag is not pushed; Erez
pushes.

### 2026-11-19 · Versions move with the work (recorded 2026-11-19)

**Decision** — A change to the procedure bumps the runbook's first line and
`.claude-plugin/plugin.json` in the commit that makes it (0.5.4, 0.5.5 did).
**Rejected** — Bumping only at a separate release step.
**Why** — A deployed runbook is compared with the master by its first line; a change
that is installed without a new version is invisible to the re-run. Recorded at the
adoption; the practice predates it.

### 2026-11-19 · The scripts live as listings in the runbook, for now (recorded 2026-11-19)

**Decision** — The gate, its tests and the compilers are code blocks in the runbook's
appendices, copied into each repository by the agent carrying out the runbook.
**Rejected** — Shipping them as files (proposed, agreed in principle).
**Why** — How the plugin was first written. A newcomer will ask; the answer is
`tasks/the-scripts-as-files.md`, first in the order above.

### 2026-11-19 · The essay has no description of the script to keep

**Decision** — D19 is superseded. The essay holds no description of the script: its
Part II, which carried the `--pr <base>` row D19 kept, was cut whole (D11), and what it
said lives in the runbook's 4.11.
**Rejected** — Leaving D19 standing.
**Why** — The fresh-session test of this adoption read D19 against D11 as a
contradiction. D19's reason (one account of the script, the runbook's) still holds and
D11 carried it further; only its object is gone.
Supersedes: D19

## What was done

The repository adopted the Unities in the strict staging (D1), because it has one
developer, every commit but a release goes through Claude Code, and there is no
pull-request policy or CI.

Created: `CLAUDE.md` (read-first list, the strict Unities paragraph adapted to
`REQUIRED = ["task"]` and to `node` invocations, code rules, division of labour);
`docs/SPEC.md`, written from the README and the runbook as they stand; `docs/reviewer.md`
(Appendix G); `tasks/README.md` and `tasks/_template.md` (Appendix D; the README's
pointer to a developer's guide replaced by one to `CLAUDE.md`);
`.claude/settings.json` with the `Stop` and `PreToolUse` bindings (Appendix B);
`.claude/hooks/check-unit.mjs` (Appendix A) with this repository's `SCENE`, `RULES`,
`REQUIRED`, `RELEASE_FILES` (D3, D8); `.claude/hooks/check-unit.test.mjs` (Appendix J)
with source and test paths changed, four tests skipped (D4), and the comment on the
`RETIRED` line rewritten to say so;
`scripts/compile-changelog.mjs` and `scripts/compile-record.mjs` (Appendices F and K,
unchanged); `docs/DECISIONS.md` and `docs/PLAN.md`, compiled. The listings were cut from
the master by a script, so the planted copies differ from the runbook only in the
per-repo lines named here.

Merged: `README.md` gained two rows in "What is here", for `CLAUDE.md` with
`docs/SPEC.md`, and for the compiled files.

Retired: nothing; the nine existing task files were already in the form and are
unchanged. Not installed, each with its reason: `docs/UNITIES.md` (D2), the git binding,
the Codex binding, the CI gate, the developer's guide and a `package.json` (D5); phases
and a final run (D6). The working order of the open tasks is D7.

Spec and the record: spec created; decisions and plan created by the compiler — 20
decisions: ten of this task first (D1–D10), then the nine already in task files
(D11–D19), then this task's eleventh, D20, which supersedes D19. The plan lists `the-essay-says-whose-idea-this-is` as done because it has a
record, although its one acceptance box, Erez's reading, is open.

Release boundary: the local tag `v0.5.5` on `db7a6d4`, not pushed (D8).

Verified, on Node 26.13.1 (the README says 22; not run on 22):

- `check-unit.mjs --branch HEAD`, run before this record was written, printed nothing,
  exit 0.
- A probe `skills/_unities_probe`, staged alone: `--staged` exited 2 with
  "Incomplete scene: no task change."
- `compile-changelog.mjs --dry-run`: "(no task records since v0.5.5)", as expected
  before this commit. `compile-record.mjs --check`: exit 0.
- `node --test .claude/hooks/check-unit.test.mjs`: 41 tests, 37 pass, 0 fail, 4 skipped.
  Before the skips, the same four were the only failures (two failed, two passed
  vacuously).
- `.claude/settings.json` parses. Phase 6 steps 4 (git binding), 7 (adapted) and 8
  (Codex) do not apply.
- Fresh-session test: a subagent given only the working tree said what the project is
  (from `CLAUDE.md`, `docs/SPEC.md`, the README), the decisions (from
  `docs/DECISIONS.md`) and the next tasks in D7's order, guessing nothing. It found D19
  contradicted by D11, superseded above; a stale `docs/PLAN.md`, recompiled after it
  read it; and the essay task's open box, already stated here.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

The first reading, written in by Claude. Two items were already met when the reader
returned (it read while the fresh-session result was being written in); they are
listed as found and closed.

### A release cannot be committed the way D8 and the spec said

**Found** — D8 said a release "is committed with `--no-verify`". There is no git hook here
(D5), so that bypasses nothing. The `PreToolUse` binding refuses a Claude Code commit
of `CHANGELOG.md` as a shared file edited directly, and `plugin.json` is source.
`RELEASE_FILES` is read only under `--pr`. `CLAUDE.md` said `git commit` refuses an
incomplete scene without saying that this holds only through Claude Code.

**Done when**

- [x] a release commit through Claude Code → refused, and the record and spec name the one path that works (Erez's shell), and it works
- [x] a hand edit to `CHANGELOG.md` committed through Claude Code → still refused
- [x] a source change with no task change, committed through Claude Code → still refused
- [x] a commit from a shell → `CLAUDE.md` and `docs/SPEC.md` say it is not gated here, and nothing implies otherwise
- [x] D8 and the spec's "Releases" → describe the same mechanism

**Not asked** — Installing the git binding, a CI gate or `--pr` here; changing the master
listing.

### The record miscounted the compiled decisions

**Found** — The record said 19 decisions, D11–D19 carried over; the compiled file has 20.

**Done when**

- [x] the record's count and range → match `docs/DECISIONS.md`: D1–D10 and D20 this task's, D11–D19 carried over
- [x] D1–D10 → still the first ten decisions of this task, in that order

**Not asked** — Renumbering anything.

### The plan shows this task done with every acceptance box open

**Found** — `docs/PLAN.md` lists `adopt-unities` as done, and its four boxes were open.

**Done when**

- [x] this task's boxes → ticked, each one backed by a result in the record
- [x] the essay task → still named in the record as done in the plan with an open box
- [x] the plan's other steps → unchanged

**Not asked** — Changing how the compiler decides "done".

### "Fresh-session test: see below" pointed at nothing

**Found** — The record's last line promised a result that was not there.

**Done when**

- [x] the record → states the fresh-session test's result
- [x] its acceptance box → ticked only because that result supports it

**Not asked** — Running the test again.

### One unnamed per-repo change in the planted tests

**Found** — The comment on the `RETIRED` line of `check-unit.test.mjs` differs from
Appendix J, and the record did not name it.

**Done when**

- [x] the record → names every line the planted test file changes from Appendix J

**Not asked** — Changing the master listing.

### The spec's list of built-ins was incomplete

**Found** — The stack row named four `node:` modules; the tests import three more.

**Done when**

- [x] the stack row → names every `node:` module the planted scripts and tests import
- [x] "No package dependencies" → still true

**Not asked** — Any change to the scripts.

## What was done

The review was answered. D8 now says what is true here. Erez compiles a release and
commits it from his shell, which nothing checks, and a release committed through
Claude Code stays refused. `--no-verify` and a gate exemption are named as rejected. D5
names the release as the one commit that does not go through Claude Code.
`docs/SPEC.md` "Releases" and `CLAUDE.md` (the Unities paragraph and Division of labour)
say the same: a commit through Claude Code is gated, a shell commit is not. The first
record's count of decisions, its list of per-repo test changes and the timing of the
`--branch HEAD` run were corrected. Its four acceptance boxes were ticked. The spec's
stack row names all seven `node:` modules.

Verified in a throwaway copy of the repository with this scene committed:

- `compile-changelog.mjs 0.5.6` plus the version bump, staged → `--staged` exit 2, with
  "shared file edited directly: CHANGELOG.md" and "no task change".
- The same, committed by plain `git commit` with no hooks and `core.hooksPath` unset →
  committed. The changelog it wrote holds this task's record under `## 0.5.6`.
- A hand edit to `CHANGELOG.md` → exit 2. A source change with no task change → exit 2.
- The copy also reported `docs/DECISIONS.md` out of date, because D5 and D8 had been
  edited after the last compile. It was recompiled here, and `--check` exits 0.

Reviewed by: the same read-only subagent, second reading (its findings are the review below)

## Review · 2026-11-19 · second reading

### The first record still said 19 decisions

**Found** — The ranges added up to 20; the count said 19.

**Done when**

- [x] the record's count → 20, matching `docs/DECISIONS.md`
- [x] the record's ranges → unchanged: D1–D10 and D20 this task's, D11–D19 carried over

**Not asked** — Renumbering or recompiling.

### D1 and the first record still said every commit goes through the agent

**Found** — D1's Decision and Why, and the first record's opening line, implied every
commit is gated, against D5 and D8.

**Done when**

- [x] D1 as compiled → says only a commit through Claude Code is refused, and names the shell release
- [x] the first record's opening line → says every commit but a release
- [x] D5, D8, `CLAUDE.md` and SPEC "Releases" → unchanged in what they say about shell commits
- [x] `node scripts/compile-record.mjs --check` → exit 0 after the change

**Not asked** — Changing the strict staging, or installing a git hook.

## What was done

The second reading was answered. D1's Decision and Why, and the first record's opening
line, now say that a commit through Claude Code is gated and a release from Erez's shell
is not. The first record's count reads 20. The record was recompiled.

Reviewed by: the same read-only subagent, second reading; its two findings were checked by `compile-record.mjs --check` and by reading the changed lines, not read a third time
