# Ship the scripts as files, not as listings

## Context

Proposed on 2026-11-19 and agreed in principle by Erez; when it is done is a kickoff
question for this repository's adoption.

The gate, its tests and the two compilers exist only as code blocks inside
`skills/unities-project/UNITIES.md`. An agent copies each into a repository and edits the
per-repo block by hand. Copies have drifted that way more than once, one repository
carries a fix this master lacks, and the tests here can only be run by cutting the
listings out of the runbook into a throwaway directory.

The shape proposed: each script is a file in this repository, identical in every
repository it is planted in, and reads a small per-repo configuration file for what is
now the per-repo block. An upgrade is then a copy, and a planted script that differs
from the master is a mismatch the gate can refuse. Each shipped file keeps its licence
line.

**Promise** — The gate in any repository is the gate in this one, and anyone can run its
tests here with one command.

**Acceptance**

- [x] script: `node --test` in this repository runs the gate's tests from files, with nothing extracted from the runbook
- [x] script: the per-repo values are read from one configuration file, and a script planted in a throwaway repository is byte-identical to the master's
- [x] script: a planted script that was edited is refused by the gate, with a message naming the file
- [x] the assignee: one existing repository is re-run from the files, and its gate's results before and after are compared and written into this file

## Decisions

### 2026-11-19 · The scripts are files in the skill folder, side by side

**Decision** — The four scripts and `manifest.json` live in `skills/unities-project/files/`,
flat, next to the runbook that plants them. They are planted at the paths they always
had (`.claude/hooks/`, `scripts/`). Appendices A, F, J and K now describe the files and
point to them; the bindings (B, C, I, L) stay listings.
**Rejected** — Mirroring the planted layout inside the plugin (`files/.claude/hooks/…`),
which puts dot-folders in the plugin and hides the tests from `node --test`; keeping the
listings in the runbook beside the files, which is two accounts of each script.
**Why** — The plugin ships the skill folder, so the files travel with the runbook at the
same version. Flat, the tests find the compilers beside them in the plugin and in
`../../scripts/` once planted.
Supersedes: D10

### 2026-11-19 · One configuration file, JSON, beside the gate

**Decision** — The per-repo values are `.claude/hooks/unities.json`: `scene`, `rules` (one
regular expression per role, as a string), `required`, `base`, `releaseFiles`, and the
optional `changelog.recorded` and `run`. The gate reads it from the repository it runs
in and stops, naming the file, when it is missing, is not JSON or lacks a key.
`compile-record.mjs` has no per-repo values; its paths are the ones the gate already
fixes.
**Rejected** — A JavaScript configuration module (per-repo code again); globs instead of
regular expressions (a second syntax, and the old `RULES` are regular expressions, so
converting a repository is a copy); a file at the repository's root; making the record
compiler's paths configurable.
**Why** — JSON needs nothing to read in Node, Deno or Bun, and holds values, not
behaviour, so a script that reads it can be the same file everywhere. Beside the gate,
because the gate is what `adopted()` looks for and what reads it.

### 2026-11-19 · A manifest of hashes, checked when a scene touches a planted file

**Decision** — `manifest.json` holds the sha256 of each shipped script, under its planted
path, and the plugin's version; it is planted as `.claude/hooks/unities.manifest.json`.
When a scene touches a planted script or the manifest, the gate refuses it if any planted
script differs from its hash or is missing. Line endings are left out of the hash.
**Rejected** — Checking on every run, which would refuse a clean tree in strict and leave
revert no way out; comparing with the plugin's own folder, which is not there in CI or on
another machine; comparing versions only, which misses an edit; refusing a scene that
edits a script and the manifest together, which is exactly what an upgrade is.
**Why** — The gate can check presence, not truth. A copy edited with its manifest passes,
but the edit is then deliberate and in the diff, and a fix carried quietly in one
repository (the case in this task's context) no longer happens by accident.

### 2026-11-19 · The tests carry their own configuration

**Decision** — `check-unit.test.mjs` writes a fixed configuration (`FIXTURE`) into each
throwaway repository, so the file has nothing per-repo and the four tests skipped here
run again. One test, that `manifest.json` holds every shipped file's hash, runs only in
the plugin and is skipped in a planted copy.
**Rejected** — Tests that read the host repository's configuration, as the listing's
per-repo paths did; keeping the skips.
**Why** — The tests pin what the script does. Which roles a repository has is its
configuration's business, and a test of it would differ in every repository.
Supersedes: D4

### 2026-11-19 · The changelog's closing line and the compilers' invocation are configuration

**Decision** — `compile-changelog.mjs` reads `changelog.recorded` (default
``Recorded in `{hash}`.``). The gate invokes the compilers with `run` (default `node`).
Any other change to an entry's shape is a change to the plugin.
**Rejected** — Leaving `formatEntry` per-repo, as the listing did; telling Deno and Bun
repositories to edit the gate's two `node` calls, as Appendix H did.
**Why** — Both were edits to a planted copy, which the manifest now refuses. They are the
only per-repo variations the runbook named for these scripts.

### 2026-11-19 · In this repository the scripts are source and the runbook is a doc

**Decision** — Source is the scripts in `skills/unities-project/files/` other than the
tests; test is the tests there; doc adds every `.md` under `skills/`. `required` is
`["test", "doc", "task"]`. `.claude-plugin/plugin.json` and `manifest.json` are in no
role.
**Rejected** — Keeping D3 (task only); the runbook as source with tests required, which
asks for a test with every change of wording; teaching the gate per-role requirements
("a doc change needs a task"), a change to the master nobody asked for.
**Why** — D3 said test and doc would come back once the scripts were files. They are. The
cost is that a change to the runbook alone is no longer held to a record by the gate,
only by `CLAUDE.md`, as a doc change is in any repository.
Supersedes: D3

### 2026-11-19 · 0.6.0, and a conversion for repositories cut from listings

**Decision** — The version is 0.6.0. Runbook 5.5 converts a repository adopted earlier:
its per-repo values go into the configuration; any other difference between its copies
and the listings it was cut from is listed and decided one by one, brought to the plugin
as a task or dropped; then the files are copied, and the old and new gates are run on the
same scenes.
**Rejected** — 0.5.6; carrying a local change into the new copy, which breaks the byte
identity; dropping local changes silently.
**Why** — Every adopted repository has to be re-run and changes files it had owned. One
team repository is known to carry such a local change
(`tasks/new-records-are-found-by-heading-text.md`).

### 2026-11-19 · In the plugin's repository the gate also compares masters with copies

**Decision** — An optional `plugin` key in the configuration names the folder of the
master files. Where it is set, a scene that touches a master, a planted copy or the
manifest is refused unless every planted copy and the manifest equal the masters. This
repository sets it; no planted repository does.
**Rejected** — Leaving it to `CLAUDE.md`; a test in the plugin's suite, which runs when
asked and not at the commit; making the plugin a special case in the code by path.
**Why** — The cold reader changed a master here without copying it, and the gate passed:
the drift this task exists to end, in the one repository that ships the gate.

### 2026-11-19 · A missing configuration is refused like an incomplete scene

**Decision** — The gate reads its configuration after the `PreToolUse` filter, so a
command that is not a commit passes. Missing or broken, it refuses a commit, the gate at
the pull request and a first `Stop`, naming the file, and lets a second `Stop` end with
a message.
**Rejected** — Refusing every hook call, including the second `Stop`, which traps the
agent; defaults for a missing configuration, which would run the gate on roles nobody
chose.
**Why** — It is an incomplete adoption, and the gate already knows how to treat an
incomplete thing without trapping anyone.

## What was done

The gate, its tests and the two compilers are files in `skills/unities-project/files/`,
with `manifest.json` (their sha256 hashes and the version) and `make-manifest.mjs`, which
rewrites it and is not planted. They were made from this repository's planted copies,
changed only as follows. `check-unit.mjs` reads `scene`, `rules`, `required`, `base`,
`releaseFiles` and `run` from `.claude/hooks/unities.json` instead of its per-repo block,
stops with an error naming the file when it is missing or incomplete, and refuses a scene
that touches a planted script or the manifest when a planted script differs from its hash
or is missing. `compile-changelog.mjs` reads its closing line from `changelog.recorded`.
`compile-record.mjs` lost its per-repo label and nothing else. The test file carries its
own configuration, runs the four tests that were skipped here, and adds seven: roles read
from the configuration, a missing configuration, a planted script edited (in `--branch`,
`--staged` and `--pr`), a copy equal to the plugin's passing and a deleted one refused,
an upgrade of a script with its manifest, CRLF, and, in the plugin only, the manifest
against the files.

The runbook (0.6.0) says to copy the files and write the configuration (4.1, 4.5); its
appendices A, F, J and K describe the files instead of listing them, Appendix A gives the
configuration and the manifest, Appendix H sets `run` instead of editing the gate, 4.11
gains the manifest check and its limit, 5.5 converts a repository cut from listings, and
Phase 6 step 6 probes the manifest check. `rules`, `scene`, `base` and `releaseFiles`
replace the old constants in the prose. `SKILL.md` says the scripts are masters in
`files/` and how a repository adopted before 0.6.0 is upgraded. `CLAUDE.md`,
`docs/SPEC.md` and the README say where the scripts are, how one is changed, and this
repository's roles. `plugin.json` is 0.6.0.

This repository was re-run from the files: the four copies and the manifest were
copied over the old ones, and `.claude/hooks/unities.json` holds its values (the last
decision above). The copies are byte-identical to the masters (`cmp`).

Verified on Node 26.13.1:

- `node --test` at the root runs the master tests and nothing extracted: 48 tests, 48
  pass. `node --test .claude/hooks/check-unit.test.mjs`: 47 pass, 1 skipped (the
  plugin-only manifest test).
- The same test file against the previous gate: 15 fail, among them the four new tests
  that pin this change (roles from the configuration, missing configuration, an edited
  copy, a deleted copy). The rest fail because that gate carried this repository's old
  roles inline.
- The same scenes, staged in a copy of the repository, with the gate before (HEAD,
  inline values) and after (this change):

  | Scene | Before | After |
  | --- | --- | --- |
  | S1 runbook edited alone | 2, no task change | 0 (the runbook is a doc) |
  | S2 runbook + task record | 0 | 0 |
  | S3 `plugin.json` + README + task record | 0 | 0 |
  | S4 planted gate edited alone | 0 | 2, planted file edited: `.claude/hooks/check-unit.mjs` |
  | S5 planted compiler edited alone | 0 | 2, planted file edited: `scripts/compile-record.mjs` |
  | S6 hand edit to `CHANGELOG.md` | 2, shared file edited directly | 2, the same |
  | S7 clean tree | 0 | 0 |
  | S8 master script + task record only | — | 2, no test change; no doc change |
  | S9 master script + test + runbook + task record | — | 0 |

  S1, S4 and S5 change on purpose (the last two decisions and the manifest's); S8 and S9
  exist only now.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

The first reading, written in by Claude.

### Deleting the manifest switched the manifest check off

**Found** — `check-unit.mjs` skipped the check when the planted manifest was absent, so a
scene that deleted it and edited the gate passed, in all three modes.

**Done when**

- [x] a scene that deletes the planted manifest (`--branch`, `--staged`, `--pr`) → refused, naming `.claude/hooks/unities.manifest.json`
- [x] a scene that deletes the manifest and edits a planted script → refused, naming both
- [x] a scene that touches neither a planted script nor the manifest, in a repository that has one → judged on its other roles only
- [x] a clean tree in strict → exit 0
- [x] an upgrade that copies the scripts and the manifest together → exit 0

**Not asked** — Checking on every run; a signature; another hash.

### A missing configuration blocked every hook call, and Stop never let go

**Found** — The configuration was read before the `PreToolUse` filter, and its error
ignored `stop_hook_active`.

**Done when**

- [x] config missing, `PreToolUse` with a command that is not `git commit` → exit 0
- [x] config missing, `PreToolUse` with `git commit` → exit 2, naming the file
- [x] config missing, `--staged` from pre-commit, or `--pr` → refused, naming the file
- [x] config missing or not JSON, `Stop` first pass → sent back once, naming the file
- [x] config missing or not JSON, `Stop` with `stop_hook_active` → exit 0 with a `systemMessage` naming the file
- [x] config present and valid, in all modes → behaviour unchanged

**Not asked** — Defaults; reading the configuration from git.

### In this repository a master could change while its planted copy stayed stale

**Found** — A master script changed, with its manifest regenerated and nothing copied,
passed `--staged`.

**Done when**

- [x] a scene here that changes a master or `files/manifest.json` without the planted copy and manifest → refused, naming the planted file
- [x] the same scene with the copies and the manifest made → exit 0, given its other roles
- [x] a scene that changes only the runbook or another doc → exit 0
- [x] a planted repository, without `plugin` in its configuration → unchanged

**Not asked** — A change to how planted repositories are checked; a new role.

### Phase 6 step 6 (A) predicted a warning the gate cannot give at adoption

**Found** — In adapted, `--branch` is silent while the target has not adopted, which at
adoption it has not.

**Done when**

- [x] adapted adoption, step 6 as written → a warning naming `scripts/compile-record.mjs`
- [x] strict adoption, the same step → exit 2, naming the file
- [x] adapted re-run on a repository whose base has adopted → a warning naming the file

**Not asked** — Changing `--branch`'s early exit.

### Text left stating the old arrangement

**Found** — `SKILL.md` said the scripts and their per-repo decisions live in
`UNITIES.md`; Appendix H listed two modules; 3.1 asked for globs.

**Done when**

- [x] `SKILL.md`'s "Not a second copy" paragraph → names `files/` and the configuration
- [x] Appendix H's module list → the scripts' imports, as in the spec's stack table
- [x] 3.1 → asks for a regular expression per role
- [x] 5.5's references to the old constants and the listings → unchanged

**Not asked** — Any other rewording.

## What was done

The review was answered.

- The manifest check now takes the manifest from the scene's base when the scene deleted
  it, refuses the deletion, and judges the scripts against it.
- The configuration is read after the `PreToolUse` filter, and a missing or broken one
  lets a second `Stop` end with a `systemMessage`; it also checks that `scene` is one of
  the two and that each rule is a string, which the first record did not say.
- An optional `plugin` key makes the gate compare masters with planted copies, and this
  repository's configuration sets it (the first decision above).
- Phase 6 step 6 uses `--staged`, which answers in adapted before the target has
  adopted.
- Runbook 3.1, 4.11 (the configuration's failure is not silent), Appendix A (`plugin`,
  the deleted manifest) and Appendix H (the modules), and `SKILL.md`'s last paragraph were
  corrected.
- Four tests were added: the deleted manifest in three modes, a scene that touches no
  planted file, the missing configuration under each hook, and the plugin's masters and
  copies.
- `make-manifest.mjs` was run and the copies made again; they are byte-identical.

Verified on Node 26.13.1:

- `node --test` at the root: 52 pass.
- `node --test .claude/hooks/check-unit.test.mjs`: 51 pass, 1 skipped.
- The same tests against the gate as the reader read it: 3 fail, the three that pin the
  first three items. The fourth, the scene that touches no planted file, guards the
  clean tree and passes on both.
- The scenes again, in a copy of the repository with this state committed:
  - S1–S3, S6, S7, S8 and S11 are as the first record's table, with S8 now also naming
    the stale copy.
  - S4 and S5 now also name the planted copy out of date.
  - S9, a master changed without its copies, is now exit 2, naming the two stale copies.
  - S10 (the same with the manifest regenerated) is exit 2, naming the manifest and both
    copies.
  - S11 (copies made) is exit 0.
  - S12 (the manifest deleted alone) is exit 2, naming it.
- The scenes had to be run with a `Reviewed by:` line added in the copy. Without it,
  every scene that appends a record to this task file was refused for this task's first
  record, by the defect in `tasks/new-records-are-found-by-heading-text.md`.

Reviewed by: the same read-only subagent, second reading (its findings are the review below)

## Review · 2026-11-19 · second reading

### Phase 6 step 6 still said nothing at a first adoption

**Found** — At a first adoption the planted files and manifest are not staged yet, so
staging the probed file alone gave a scene in which the manifest check had nothing to
judge: exit 0 in both stagings.

**Done when**

- [x] adapted, first adoption with the planted files and manifest not yet committed, step 6 as written → exit 0 with a warning naming `scripts/compile-record.mjs` as edited
- [x] strict, the same state, step 6 as written → exit 2, naming the file
- [x] adapted or strict re-run (5.5) on a repository whose manifest is committed → the same outcomes
- [x] step 6 done and undone as written → the adoption's work tree and index as they were before the step

**Not asked** — Changing `--branch`'s early exit; running the manifest check on scenes that
touch no planted file.

### A broken master manifest crashed the gate in the plugin's repository

**Found** — `JSON.parse` of the master manifest had no guard: a stack trace, exit 1, and no
`systemMessage` on a second `Stop`.

**Done when**

- [x] plugin repository, master `manifest.json` not JSON, any mode → refused, naming it
- [x] the same, `Stop` with `stop_hook_active` → exit 0 with a `systemMessage` naming it
- [x] master manifest valid → unchanged
- [x] planted repository, no `plugin` key → unchanged

**Not asked** — Validating the manifest's hashes or version beyond parsing.

## What was done

The second reading was answered. Phase 6 step 6 now probes the manifest check in a
temporary index (`GIT_INDEX_FILE`), with the planted files added to it, so it answers at a
first adoption and leaves the adoption's index and work tree as they were. It was run as
written on two throwaway repositories in the first-adoption state (main without the gate,
the planted files untracked): strict exit 2 and adapted exit 0 with a warning, each
naming `scripts/compile-record.mjs`; `git status` and the staged list identical before and
after. On a repository with the manifest committed (a re-run): the same two outcomes.

The gate now reports a master manifest that is not JSON by name, as one more missing
part of the scene, which a second `Stop` lets go like the others; a test pins it. Runbook
3.4 item 2 asks for paths, not globs.

Verified on Node 26.13.1: `node --test` at the root, 53 pass; on
`.claude/hooks/check-unit.test.mjs`, 52 pass and 1 skipped. The planted copies and the
manifest are byte-identical to the masters (`cmp`). The two stale review boxes of the
first round (Phase 6 step 6, adapted and strict) hold now, by this answer.

Reviewed by: the same read-only subagent, second reading; its two findings were checked by the runs above and the new test, not read a third time
