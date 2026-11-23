# A broken configuration is refused, not crashed on

## Context

Found by a design reader in the multi-developer repository in the adapted staging, at its
upgrade to 0.6.8, and owed to the plugin (`tasks/convert-the-adopted-repositories.md`).
Brought in by Erez on 2026-11-23, in chat. That repository's own `unities.json` is valid,
so nothing fails there today.

Runbook 4.11 says a missing or broken configuration is not silent: the gate refuses a
commit and sends a turn back once, naming the file. `readConfig` in `check-unit.mjs`
checks that each key is present, that each rule is a string, that `scene` is `commit` or
`pr`, that `plan` is a boolean when given, and the shape of `required` and the roles it
names. A key that is present but `null` passes the presence check, and `releaseFiles` and
`base` are not checked further. Read against the master on 2026-11-23:

- a file holding `null`, or `"rules": null`, throws a `TypeError` inside `readConfig`;
- a rule that is a string but not a valid regular expression passes `readConfig` and
  throws where the rules are compiled;
- `"releaseFiles": null` passes, since only `undefined` is checked, and becomes the
  pattern `/null/`;
- `compile-changelog.mjs` checks that the file exists, but its parse is unguarded: a file
  that is not valid JSON, or holds `null`, throws.

A throw exits 1 with a stack trace. Claude Code takes exit 1 from a `PreToolUse` hook as a
non-blocking error, so a gate that crashes there may let the commit through, which is
the opposite of what 4.11 says. That is read from Claude Code's hook contract, not run.

This is a finding that would have the gate handle a case it does not handle, so it is
Erez's to admit (`CLAUDE.md`, *A check enters the gate because something happened*).
What Claude would rule: admit it, because 4.11 already says a broken configuration is
refused, and the gate crashing instead breaks what the runbook promises.

**Promise** — A broken configuration is named and refused, never a stack trace.

**Acceptance**

- [x] the assignee: Erez's ruling on this finding is recorded here as a decision that supersedes the one below, or the one below stands
- [x] script, once admitted: a file holding `null`, a `rules` that is not an object, a rule that is not a valid regular expression and a `releaseFiles` that is not a string are each refused with a message naming the file and the key, at a commit and at a `Stop`
- [x] script, once admitted: `compile-changelog.mjs` given a broken file stops with a message naming it
- [x] script: `node --test` at the root passes with the manifest at the new version

## Review · 2026-11-23

### A broken configuration crashes the gate

**Found** — `readConfig` checks presence and string type only; the cases listed in
*Context* throw instead of being refused.

**Done when**

- [x] a configuration with any of the cases in *Context* → the gate is unchanged

**Not asked** — validating keys the gate does not read; a schema file.

## Decisions

### 2026-11-23 · Not admitted: a broken configuration crashes the gate

**Decision** — Not built until Erez rules. The gate keeps its present checks of
`unities.json`.
**Rejected** — Building the refusals on the reader's word.
**Why** — No broken configuration has met the gate in a repository, and until Erez
admits a finding of this kind it is not admitted. The case for admitting it is in
*Context*.

### 2026-11-23 · A broken configuration is refused by name

Supersedes: D68

**Decision** — Admitted by Erez, 2026-11-23, in chat ("Yes, admit and build"), because
runbook 4.11 already says a broken configuration is refused. `readConfig` refuses, by
name, a file that is not a JSON object, a `rules` that is not a map, a rule or
`releaseFiles` that is not a string or will not compile, and a `run` that is not a
non-empty string, through the same `fail` as a missing key, so a `Stop` lets go on its
second pass. Both compilers refuse a file that is not a JSON object, and
`compile-changelog.mjs` one that is not valid JSON and a `changelog.recorded` that is not
a string (`null` included, which used to fall back to the default line), by name.
**Rejected** — A schema file, or validating keys nothing reads; checking `base` and
`plugin` beyond their presence, which is the decision below.
**Why** — A crash is exit 1, which Claude Code takes from a `PreToolUse` hook as a
non-blocking error, so the commit the configuration was meant to hold could go through.

### 2026-11-23 · Not admitted: a record compiler that cannot be run passes

**Decision** — Not built. The gate takes 3 from the record compiler as a refusal and 1
as out of date, as before; any other exit, such as 127 when the runtime in `run` is not
installed, or a kill by a signal, passes as if the record had been checked.
**Rejected** — Refusing it, as the patch this task was built from did: Erez admitted the
cases in *Context*, which do not include it.
**Why** — It has not happened in a repository. What Claude would rule: admit it, since a
`run` naming a runtime that is not installed is what the Deno task
(`tasks/the-gate-runs-under-deno-without-a-shell.md`) can meet, and a gate that could not
check the record should not answer as if it had. The patch's check and test are kept in
the saved patch.

### 2026-11-23 · Not admitted: a wrong base or plugin passes silently

**Decision** — Not built. Under the adapted staging, `--branch` with a `base` that is
`null` or names no branch exits 0 without a word; `--pr` with a target that does not
exist stops with its own error, as before. In the plugin's repository a `plugin` that is
not a string skips the planted-copy check without a word.
**Rejected** — Refusing them by name with the other keys, which the cold reader of this
scene found and which nobody admitted.
**Why** — Neither has happened in a repository. A wrong `base` in a team repository would
silence the end-of-turn advice, not the pull request's gate, which names its target.

## What was done

Built from a patch written on 2026-11-23 by another Claude Code session, one asked to fix
a pull request in another repository, that wrote into this repository's master scripts
without being asked to. It removed its own changes and left the patch in its scratchpad
without its `check-unit.mjs` hunks; Claude rebuilt those from a diff taken while they
were still in the tree, and saved the whole patch outside the repository. Applied to the
previous commit in a throwaway clone it passed every test but the manifest's. Here it was
applied to 0.6.9: the three scripts' hunks, and four of its five tests, placed before the
stdin test. Its check of the record compiler's exit and the test for it were taken out
again, as not admitted (decision above); they stay in the saved patch.

`check-unit.mjs`: `readConfig` checks what the first decision above says.
`compile-record.mjs` refuses a file that is not an object with exit 3, its "unreadable"
answer; `compile-changelog.mjs` refuses it, a file that is not valid JSON, and a
`changelog.recorded` that is not a string, with exit 1. The last was the cold reader's
finding: `{"recorded": 5}` threw from `replaceAll`. The tests: a configuration not an
object or whose rules are not a map; a rule or `releaseFiles` that will not compile, with
a `Stop` letting go on its second pass and a repository's own role held to the same; a
`run` that is not a non-empty string; both compilers on a file that is not an object or
not JSON, and the changelog compiler on a `recorded` that is a number, `null` or an
object. The
acceptance box's `Stop` case is tested for a pattern that will not compile; the other
cases go through the same `fail`, read from the code. The review item above held while
D68 stood and is superseded with it.

Runbook Appendix A says, under its table, which program refuses which case. Because the scripts changed, the plugin is
0.6.10: the runbook's first line, `.claude-plugin/plugin.json`, the manifest (both copies)
and SPEC's "as of 0.6.10". The form is unchanged at 1.0. The planted copies here are the
masters. `node --test` at the root, on Node 26.13.1: 96 tests, 96 pass.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. It ran the suite and probed broken configurations in a throwaway
clone; its five findings are the review below, answered before commit. On a second
reading of the answer it found every ticked line held on the running scripts and noted
that the first decision left out the `changelog.recorded` refusal, now added.

## Review · 2026-11-23

### The record compiler's exit check was never admitted

**Found** — `check-unit.mjs` refused a record compiler exiting outside 0, 1 and 3; the
case has not happened, and Erez admitted only the cases in *Context*.

**Done when**

- [x] a compiler that exits 127, or another status outside 0, 1 and 3 → the gate is unchanged, under a `Not admitted:` decision, unless Erez admits it himself
- [x] exits 0, 1 and 3 → unchanged

**Not asked** — any other exit-code policy.

### A non-string changelog.recorded crashes compile-changelog

**Found** — `{"recorded": 5}` threw a stack trace from `replaceAll`.

**Done when**

- [x] `recorded` is a number, null or an object → it exits 1 naming `changelog.recorded`
- [x] `recorded` is a string, or absent → unchanged

**Not asked** — checking other `changelog` keys.

### The record's claim about base is false

**Found** — The decision said a wrong `base` stops the gate with git's error; adapted
`--branch` exits 0 silently, and a non-string `plugin` skips the planted-copy check.

**Done when**

- [x] the decision's account of a wrong `base` → says what the gate does with one, in each mode
- [x] a broken `base` or `plugin` → the gate is unchanged, under a `Not admitted:` decision

**Not asked** — validating keys nothing reads.

### The runbook overstates what the compilers refuse

**Found** — Appendix A said the gate and both compilers refuse every listed case.

**Done when**

- [x] Appendix A's paragraph on a broken configuration → says which program refuses which case

**Not asked** — new compiler checks.

### Misleading advice on exit 127

**Found** — The "could not be run" message ended in the incomplete-scene advice, which
does not fix a missing runtime.

**Done when**

- [x] 127 or a kill by a signal → the message names `run` as the thing to fix, or the check is not built

**Not asked** — a separate message channel.
