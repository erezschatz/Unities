# The runbook and the skill are source in this repository

## Context

Said by Erez on 2026-11-19, after `tasks/the-scripts-as-files.md` had made the runbook a
doc here (D26): "The runbook here is not a documentation, as it is what everything is
ran, so it should, in this case, be treated as such." Asked what a change to the runbook
alone must then carry, he chose a list per role, the runbook and the skill held to a doc
and a task change but not to a test, and both files as source.

**Promise** — A change to the procedure every adoption runs cannot land in this
repository without its record.

**Acceptance**

- [x] script: a test in which `required` maps roles to lists passes, with a procedure change refused without its doc and task and passed without a test
- [x] script: `--staged` in this repository refuses a runbook change alone, naming the missing doc and task change, and passes one with a doc and a task change
- [x] script: a script change here is still refused without its test
- [x] script: `node --test` passes

## Decisions

### 2026-11-19 · The runbook and the skill are source, held to a doc and a task change

**Decision** — In this repository a seventh role, `procedure`, holds
`skills/unities-project/UNITIES.md` and `SKILL.md`. `required` is
`{"source": ["test", "doc", "task"], "procedure": ["doc", "task"]}`. Doc is `docs/`,
`README.md` and `CLAUDE.md`.
**Rejected** — D26's arrangement, the runbook a doc and not held to a record; the runbook
as plain source, which asks for a test with every change of wording; source with
`["doc", "task"]` for everything, which lets a script change through without a test.
**Why** — The runbook is what every adoption runs; a change to it is a change of
behaviour in every repository that re-runs it, and the gate should hold it to a record
as it does code. A wording change has no test to carry.
Supersedes: D26

### 2026-11-19 · `required` may map roles to lists, in the plugin, for every repository

**Decision** — The gate accepts `required` either as a list (for source, as before) or as
a map from role to list, and `rules` may hold roles beyond the six, for `required` to
name. A configuration whose `required` names a role `rules` lacks stops the gate. The
version is 0.6.1.
**Rejected** — A special case for this repository; a fixed `procedure` role in the gate,
which names something only this repository has.
**Why** — The finding that made it necessary is this repository's, but the shape (some
files held to less than source) is general, and a list stays valid, so no repository's
configuration changes.

### 2026-11-19 · A map without `source` stops the gate

**Decision** — When `required` is a map it must hold `source`, and in either form
`source` must name at least one role; otherwise the gate stops, naming the
configuration.
**Rejected** — Allowing it, with source then held to nothing; defaulting `source` to the
six-role default.
**Why** — A configuration that holds a source change to nothing is a mistake, not a
staging; and a default would put roles into a repository that nobody chose.

## What was done

The gate (`skills/unities-project/files/check-unit.mjs`) reads `required` as a list, for
source as before, or as a map from role to list, and accepts roles in `rules` beyond the
six. It stops, naming the configuration, when `required` names a role `rules` lacks or
maps a role to something that is not a list, and when any rule, including an added one,
is not a string. Two tests pin it: a `procedure` role refused without its doc and task
change and passed without a test, a source change in the same repository still asked for
its test; and a `required` naming a role that is not in `rules`.

This repository's configuration adds `procedure` (`UNITIES.md`, `SKILL.md`), takes the two
files out of `doc`, and sets `required` to the map in the first decision above. The
runbook's Appendix A describes the map and the added roles; `CLAUDE.md` and
`docs/SPEC.md` state the roles here. The version is 0.6.1: runbook first line,
`plugin.json`, and the manifest, regenerated; the planted copies were made again.

Verified on Node 26.13.1: `node --test` at the root, 55 pass. In a copy of the
repository with this scene committed, `--staged`:

- the runbook edited alone → exit 2, "no doc change; no task change";
- `SKILL.md` edited alone → the same;
- the runbook with `docs/SPEC.md` and a task record → exit 0;
- a script with its copies made, a doc and a task record, and no test → exit 2, "no test
  change".

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

The first reading, written in by Claude.

### A `required` that is neither a list nor a map, or names an inherited key, got past the validation

**Found** — `null`, a number or a string passed; `toString` passed `name in rules`; two of
them crashed the gate with exit 1, which a hook does not treat as a refusal.

**Done when**

- [x] `required` is `null`, a number, a string or a boolean → exit 2, naming `.claude/hooks/unities.json` and `required`
- [x] `required` names an inherited property (`toString`, `constructor`), as a key or in a list → exit 2, `required names "<name>"`
- [x] `required` maps a role to something that is not a list → exit 2, `required.<role> must be a list of roles`
- [x] `required` names a role absent from `rules` → exit 2, as before
- [x] `required` a list of roles all in `rules` → the behaviour of 0.6.0
- [x] `required` a valid map → the behaviour the two earlier tests pin
- [x] each invalid case in a `Stop` with `stop_hook_active` → exit 0 with the message as `systemMessage`

**Not asked** — A schema library; new keys; a change to the six roles.

### A map without `source` held script changes to nothing

**Found** — `{}` and `{"procedure": [...]}` were accepted, and a source change then needed
nothing.

**Done when**

- [x] a map without `source` → the gate stops naming the configuration, and the decision is recorded
- [x] a map with `source` → unchanged
- [x] a list → unchanged, read as `{source: <list>}`

**Not asked** — An implicit default for `source`.

### `CLAUDE.md` listed fewer doc files than the gate accepts

**Found** — `CLAUDE.md` named three files and `docs/SPEC.md` left out `AGENTS.md` and the
compiled files' exclusion.

**Done when**

- [x] `CLAUDE.md` → names the doc role as the gate applies it
- [x] `docs/SPEC.md` "Roles here" → the same

**Not asked** — A change to the `doc` expression.

## What was done

The review was answered. The gate stops, naming the configuration, when `required` is
neither a list nor a map, when a map has no `source` (the decision above), and when it
names a role `rules` does not hold as its own (`Object.hasOwn`, so `toString` and
`constructor` are not roles). One test runs eight invalid `required` values, each at the
commit and at a second `Stop`, and a non-string added rule at the commit. Appendix A says a map
must hold `source`. `CLAUDE.md` and `docs/SPEC.md` name the doc role as the gate applies
it. The manifest was regenerated and the copies made again.

Verified on Node 26.13.1: `node --test` at the root, 56 pass. The new test against the
gate as the reader read it, in a folder without `manifest.json`: it fails, the
plugin-only manifest test is skipped, and the other 54 pass. (The reader ran it beside
the plugin's manifest, where that test fails too, because the test file had changed
after the manifest was made.)

Reviewed by: the same read-only subagent, second reading (its findings are the review below)

## Review · 2026-11-19 · second reading

### The record said more about the new test than the test does

**Found** — The added-rule case ran only at the commit, and the run against the earlier
gate did not say which other test failed in the reader's setup.

**Done when**

- [x] the record's description of the new test → names the cases at the commit and those at a second `Stop`
- [x] the record's run against the earlier gate → names every test that fails, and why

**Not asked** — A new test.

### `{"source": []}` and `[]` still held a source change to nothing

**Found** — Both passed `readConfig()`, and a source change then needed nothing.

**Done when**

- [x] `required` is `[]` or `{"source": []}` → the gate stops, naming the configuration
- [x] a map without `source` → exit 2, `required has no "source"`
- [x] a non-empty list, or a map with a non-empty `source` → unchanged

**Not asked** — Default roles for an empty list.

## What was done

The second reading was answered. The gate stops when `source` is held to an empty list,
in either form, and the decision "A map without `source` stops the gate" now says so;
Appendix A says `source` must be held to at least one role. The test adds `[]` and
`{"source": []}` and runs the added-rule case at a second `Stop` too; the record's first
answer was corrected where it overstated the test and where it described the run against
the earlier gate. The manifest was regenerated and the copies made again.

Verified on Node 26.13.1: `node --test` at the root, 56 pass. The test against the gate
as staged before this answer: the extended test fails, the other 54 pass, the manifest
test is skipped.

Reviewed by: the same read-only subagent, second reading; its two findings were checked by the test and the run above, not read a third time
