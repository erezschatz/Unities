# A repository that compiles no plan can say so

## Context

Brought by Erez on 2026-11-22, from the Claude Code session that was to convert a team
repository from 0.5.2 to 0.6.4 (runbook 5.5, `tasks/convert-the-adopted-repositories.md`).
The session stopped before writing anything, and Erez chose to hold that repository's
upgrade until the plugin has this.

That repository has no `docs/PLAN.md`, by a decision of its own, and a later decision
there rejected compiling one. Its copy of `compile-record.mjs` switches the plan off
with a local `PLAN = null`. Since 0.6.0 a planted script is not edited, and the master
has no setting for it: copied as it is, the compiler writes `docs/PLAN.md`, and its
`--check` fails while the file is missing. The gate also counts `docs/PLAN.md` among the
compiled files. The local change has not been seen here; only the session's report of it.

**Promise** — A repository that keeps no plan is converted without gaining one.

**Acceptance**

- [x] script: with the plan switched off in `.claude/hooks/unities.json`, the record compiler writes `docs/DECISIONS.md` and no `docs/PLAN.md`, and its check passes while `docs/PLAN.md` is absent
- [x] script: with the plan switched off, the gate does not ask for `docs/PLAN.md` to be up to date
- [x] script: with no such setting, every existing test passes unchanged
- Withdrawn (tasks/a-box-never-waits-on-another-project.md): the assignee: the team repository's conversion is re-run on the version that carries this, and what its gate and compiler did about the plan is written into `tasks/convert-the-adopted-repositories.md`
- [ ] the assignee: runbook 5.5 is carried out in a repository set up for the check, whose `compile-record.mjs` had been changed to compile no plan, and what its gate and compiler did about the plan is written into this file

## Decisions

### 2026-11-22 · "plan": false in the configuration, read by the gate and the record compiler

**Decision** — A repository that keeps no compiled plan sets `"plan": false` in
`.claude/hooks/unities.json`. `compile-record.mjs` reads the configuration for it and
then writes and checks `docs/DECISIONS.md` alone; the gate leaves `docs/PLAN.md` out of
the compiled files. Absent or `true`, nothing changes. A value that is neither stops the
gate and the compiler, each naming the configuration; so does a configuration the
compiler cannot parse, and it exits 3, which until now meant only an invalid record. This reverses one sentence of D22, that
`compile-record.mjs` has no per-repo values; the rest of D22 stands.
**Rejected** — A `--no-plan` flag, which the gate and every caller would each have to
pass; taking a missing `docs/PLAN.md` to mean no plan, which lets a deleted plan stop
being asked for; a nested key such as `record.plan`, for one value; a new exit code for
the compiler, which the gate would have to learn.
**Why** — The team repository switched its plan off by editing its copy, which 0.6.0
ended. The configuration is where a repository's own values now live, and both scripts
must agree, so both read the one key. The two lines of that repository's change that let
the plan's path be empty are taken as they were shown in its patch.

### 2026-11-22 · With the plan off, docs/PLAN.md is an ordinary file and plan lines go nowhere

**Decision** — With `"plan": false` a `docs/PLAN.md`, if the repository has one, is a doc
like any other: written by hand, counted as a doc change, never compared with the
compiler. `Milestone:` and `Not in scope:` lines in decisions stay in the decisions and
are compiled into no plan. The runbook says so in one place, the `plan` row of Appendix
A, which also says that what the runbook, the standing paragraph and the gate's messages
say of `docs/PLAN.md` as a compiled file does not apply there. The gate's refusal of an
outcome box no longer points such a repository to a `PLAN.md` milestone, and the
Azure DevOps pipeline of Appendix I stages `docs/PLAN.md` only when it is compiled.
**Rejected** — Refusing a `docs/PLAN.md` where the plan is off; refusing or warning
about plan lines there; a second wording of every passage of the runbook that mentions
the plan.
**Why** — Neither has happened in a repository (D41). The repository that asked for this
wants no plan at all, and what it does with a file of that name is its own business.

### 2026-11-22 · 0.6.5, with the line-ending change

**Decision** — This and `tasks/the-compilers-read-crlf-and-a-bom.md` are one scene and
one version, 0.6.5.
**Rejected** — Two versions.
**Why** — One repository waits on both, they touch the same three scripts, and its
conversion is re-run once.

## What was done

`compile-record.mjs` reads `plan` from `.claude/hooks/unities.json`; with `false` it
compiles `docs/DECISIONS.md` only, and `--check` no longer asks for `docs/PLAN.md`.
`check-unit.mjs` builds its list of compiled files from the same key and stops on a
value that is not true or false. Five tests were added to `check-unit.test.mjs`: the
compiler with the plan off; a strict commit held to the decisions alone; the adapted
compile after a merge touching `docs/DECISIONS.md` only; a `docs/PLAN.md` that was
compiled before the switch, edited by hand afterwards and accepted as a doc; and the
bad value. The test file's `repo()` takes a configuration.

The runbook (0.6.5, dated 2026-11-22) gains the `plan` row in Appendix A, a sentence in
Appendix K, and in 5.5 the instruction that a repository whose compiler was changed to
compile no plan gets `"plan": false`. `docs/SPEC.md` names the key. 0.6.5 is in the
runbook's first line, `.claude-plugin/plugin.json`, both manifests and SPEC's "as of".
The masters were copied over this repository's planted copies with the manifest.

`node --test` at the root: 84 tests, 84 pass. The planted copy
(`.claude/hooks/check-unit.test.mjs`): 83 pass, 1 skipped (the plugin-only manifest
test). The five tests, run against the 0.6.4 scripts, all fail. Node 22.23.5.

The fourth acceptance box is open: the team repository's conversion has not been re-run.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below and in `tasks/the-compilers-read-crlf-and-a-bom.md`)

## Review · 2026-11-22

The reader's findings on this task, condensed by the agent that did the work. The reader
ran the tests, compared the copies with the masters and built its own cases outside the
repository. It called all three false or missing statements in the runbook and the
record; none asks the gate to refuse more.

### The merge-man pipeline in Appendix I fails where the plan is off

**Found** — Appendix I's compile step ran `git add docs/DECISIONS.md docs/PLAN.md` under
`set -e`. With `"plan": false` and no `docs/PLAN.md`, git stops on the missing path and
the compiled decisions are never committed after a merge.

**Done when**

- [x] adapted, `"plan": false`, no `docs/PLAN.md`, a merge that adds a decision → the step names `docs/DECISIONS.md` alone
- [x] adapted, `"plan": false`, a `docs/PLAN.md` kept by hand → the step commits `docs/DECISIONS.md` alone (it names `docs/PLAN.md` too while that file still carries the compiler's marker, and git then adds nothing for it)
- [x] adapted, the plan compiled → the step names both files
- [x] nothing to compile → the step exits 0 without a commit

**Not asked** — a change to the gate or the compilers; a second pipeline listing.

### The gate and the runbook still sent a plan-off repository to docs/PLAN.md

**Found** — The gate's refusal of an outcome box says "make it the promise or a PLAN.md
milestone", and runbook 4.7 the same; Appendix E's standing paragraph says
`docs/DECISIONS.md` and `docs/PLAN.md` are read, never written; Phase 6 step 3 and
Appendix K say "both" compiled files.

**Done when**

- [x] plan off, an outcome box refused → the gate's message does not name `PLAN.md`
- [x] plan off, the adoption writes the standing paragraph → Appendix A's `plan` row tells it to write `docs/DECISIONS.md` alone
- [x] the plan compiled → the gate's message and every passage read as before, but Appendix K's "both files", now "the compiled files"
- [x] what plan-off means → said in the `plan` row of Appendix A, and the other passages are not reworded

**Not asked** — a different refusal rule for outcome boxes; a warning about plan lines.

### The compiler exits 3 on a configuration that is not JSON, and nothing said so

**Found** — An unparsable `unities.json` made `compile-record.mjs` exit 3 with "Invalid
record", where its header and Appendix K define 3 as an invalid record only. A `plan`
value that is neither true nor false stopped the gate while the compiler took it as
plan-on. Neither was in the record or a decision.

**Done when**

- [x] `unities.json` not valid JSON, the compiler alone or with `--check` → exit 3 and a message naming the file, as the header and Appendix K now say
- [x] `unities.json` absent → both files compiled
- [x] `"plan": "no"` → the compiler stops as the gate does, exit 3
- [x] a valid configuration, `plan` absent, `true` or `false` → unchanged

**Not asked** — validation of the other keys in the compiler; a new exit code.

## What was done

Answering the reading. Appendix I's compile step builds the list of compiled files and
includes `docs/PLAN.md` only when that file carries the compiler's marker. The gate's
refusal of an outcome box ends "(make it the promise)" where the plan is off. Appendix
A's `plan` row now says what does not apply in such a repository and that the adoption
writes the standing paragraph with `docs/DECISIONS.md` alone; Appendix K says "the
compiled files". `compile-record.mjs` stops with exit 3, naming the configuration, when
it is not JSON or `plan` is not true or false; its header and Appendix K say so, the
first two decisions above were extended before the commit to record all of this, and
the test of the bad value now runs the compiler too. The pipeline step itself was not
run: it is a listing for Azure DevOps.

`node --test` at the root: 84 tests, 84 pass. Node 22.23.5.

Reviewed by: the same reader, which ran these corrections in throwaway repositories; it found one box of the review above worded falsely, corrected before the commit
