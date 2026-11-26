# An acceptance box never waits on another project

## Context

Raised by Erez on 2026-11-26, in chat, on reading `tasks/convert-the-adopted-repositories.md`
listed as open work: "the whole unities as a concept cannot have a project task relying
on a different project. Not 'user uses this on production', 'user installed on phone' and
most definitely not 'other projects running the latest'." He had said so before, in
other places; it was written nowhere here.

He drew the line the same day: Windows, Codex and a clean machine are features of this
project and are tested; a box that needs "a third person who uses only windows
installing it" is outside. In another project, "running on a phone as the main app for a
week" or "client uses this on their side, unsupported for real data" is an acceptable
box; "old app uninstalled from phone" or "client stop using excel as their main
management tool" is not.

The runbook already refuses an outcome box about users, adoption or production (4.7,
*Acceptance boxes*; `ACCEPTANCE_FORBIDDEN` in the gate). Two boxes here wait on another
repository in words the pattern does not catch: all four of
`tasks/convert-the-adopted-repositories.md`, and the last of
`tasks/the-plan-can-be-switched-off.md`. D6 says the plugin "is verified by being run in
other repositories, which each open task names in its own acceptance", D5 that
`tasks/verify-the-codex-binding.md` "is to be run in another repository", and `CLAUDE.md`
that Erez runs the plugin "in real repositories".

**Promise** — A task here can always be finished here: no box waits for another project,
person or tool to change.

**Acceptance**

- [x] the assignee: runbook 4.7 and Appendix D, the skill and `tasks/README.md` each say that a box may run what the project ships anywhere and may not wait on the state of something that is not the project
- [x] the assignee: no open box in `tasks/` waits on the state of another repository, person or tool
- [ ] Erez: reads the new paragraph in runbook 4.7, *Acceptance boxes*, and keeps or rewrites it, and says which in this file

## Decisions

### 2026-11-26 · A box runs what the project ships; it never waits on another thing's state

**Decision** — An acceptance box may exercise what the project ships wherever it runs:
another operating system, another agent, a clean machine, a week as someone's main app, a
client trying it on their side. A box may not wait on the state of anything that is not
the project: another repository taking a version, an old app removed, a client leaving a
tool, a third person installing it. Such a box is an outcome, moved to the promise or a
milestone as the runbook already says of users and production. Runbook 4.7 states it, and
Appendix D, the skill and `tasks/README.md` point to it. This reverses the clause of D6
that the plugin is verified in other repositories "which each open task names in its own
acceptance", and the last sentence of D5, that `tasks/verify-the-codex-binding.md` is run
in another repository: it is run in a repository set up for the check. The rest of D5 and
D6 stands: the bindings D5 left out stay out, and D6's plan still has no phases and no
final run.
**Rejected** — Refusing any box checked outside this repository, which would leave
Windows, Codex and a clean install, features of this project, untestable; keeping the
rule at users and production, which is what let the two boxes in.
**Why** — Erez's line, above. The work, its record and its place are one; a box closed
by another project's state closes this task somewhere else.
Supersedes: D5, D6

### 2026-11-26 · Not admitted: an acceptance box that waits on another repository

**Decision** — Not built. The gate's outcome pattern does not catch "the team
repository's conversion is re-run" or "runbook 5.5 is carried out in each", and is not
extended to.
**Rejected** — Adding repository words to `ACCEPTANCE_FORBIDDEN`, which would refuse boxes
this decision allows, such as "under Codex in one repository" in
`tasks/verify-the-codex-binding.md`.
**Why** — The case happened here, so it is admissible. It is judged by the rule's words
and at review instead, because any repository word added to the pattern also matches the
boxes this task allows. Erez has not ruled on it in words of his own. What Claude would
rule: not admitted.

### 2026-11-26 · A withdrawn box stays in Context as a plain line

**Decision** — A box this task withdraws loses its checkbox and keeps its words, as
`- Withdrawn (tasks/a-box-never-waits-on-another-project.md): <the box as it was>`. The
line is not a box, so the record compiler, unchanged, does not count it as open.
**Rejected** — Ticking it, when no one performed its check; deleting it, when Context is
the brief as it arrived; leaving it open, when no work here can close it.
**Why** — The record keeps what was asked and says why it no longer binds.

### 2026-11-26 · The conversion of the adopted repositories is withdrawn

**Decision** — All four boxes of `tasks/convert-the-adopted-repositories.md` are
withdrawn, and the task gains none. Its promise and its record stay; the compiled plan
will call it done, and this decision is why. A conversion is the work of the repository
converted, recorded in its own task file. What a conversion brings back to the plugin
arrives here as a task file of its own, as the four it brought already did.
**Rejected** — Replacing its boxes with checks here, when there is no work here to
check; deleting the file, which carries a record and its review.
**Why** — Every box waited on another repository's state.

### 2026-11-26 · The plan-off conversion is checked in a repository set up for it

**Decision** — The last box of `tasks/the-plan-can-be-switched-off.md`, which waited on
the team repository's conversion, is withdrawn and replaced by a box for the assignee:
runbook 5.5 carried out in a repository set up for the check, whose compiler had been
changed to compile no plan.
**Rejected** — Withdrawing it with nothing in its place: the three script boxes test the
compiler and the gate, not that 5.5 converts such a repository.
**Why** — What 5.5 does to a plan-off repository is a feature of this project, and a
repository set up for the check runs it without waiting on anyone's.

### 2026-11-26 · 0.6.17

**Decision** — The runbook and the skill change, so the plugin is 0.6.17. The form is
unchanged at 1.0.
**Rejected** — A form version: the form's four statements are unchanged; this says what
one of them already meant for an acceptance box.
**Why** — A change to the procedure is a version (`docs/SPEC.md`, *Versions*).

## What was done

Runbook 4.7, *Acceptance boxes*, gains a paragraph: a box may run what the project ships
anywhere, may not wait on the state of anything that is not the project, and the gate
catches only some wordings of that. Appendix D's task-file format and `tasks/README.md`
say the same in a sentence each, and the skill's acceptance test points to 4.7.
`CLAUDE.md`'s *Division of labour* says the repositories Erez runs the plugin in are set
up for the check. The gate is unchanged (the second decision).

In `tasks/convert-the-adopted-repositories.md` the four boxes are withdrawn as the third
decision sets out, and the compiled plan now calls that task done. In
`tasks/the-plan-can-be-switched-off.md` the box that waited on the team repository is
withdrawn and a box for a repository set up for the check stands below it, open. The
other open boxes in `tasks/` were read against the first decision: each is a script, a
ruling or reading by Erez, or a run of this project's own features (a clean install,
Windows outside WSL, Codex in a repository); none waits on another project.

The plugin is 0.6.17: the runbook's first line, `.claude-plugin/plugin.json`, the
manifest (both copies) and SPEC's "as of". No script changed. `node --test` at the root:
106 tests, 106 pass.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`; it ran the record check, the gate on the staged diff, `node --test`
and the gate's pattern against sample boxes in a throwaway script. Its four findings are
the review below, answered before commit.

## Review · 2026-11-26

The reader's findings, condensed by the agent that did the work. None asks the gate to
refuse more except the case of the second item, which stays not admitted.

### The skill said the gate rejects a box that waits on another project

**Found** — The skill's new sentence followed "rejected at review and by the runbook's
gate" with "So does a box that waits…", reading as if the gate refused it; the runbook's
own example passes the gate.

**Done when**

- [x] the skill's sentence about a box that waits on something that is not the project → does not say the gate refuses it, and says the gate catches only some wordings
- [x] the skill's sentence about users, production and adoption → unchanged
- [x] runbook 4.7, Appendix D, `tasks/README.md` → unchanged

**Not asked** — any change to the gate or to `ACCEPTANCE_FORBIDDEN`.

### A box that waits on another repository in other words passes the gate

**Found** — "the other repositories run the new version" and "runbook 5.5 is carried out
in each" pass `ACCEPTANCE_FORBIDDEN`; the not-admitted decision had no review item, and
said both that Erez agreed and what Claude would rule.

**Done when**

- [x] a box that waits on another repository's state in words `ACCEPTANCE_FORBIDDEN` does not match → the gate is unchanged, under "Not admitted: an acceptance box that waits on another repository"
- [x] a box about users, production or adoption that the pattern already matches → refused as now
- [x] "under Codex in one repository", "on Windows outside WSL", "on a machine without the plugin" → accepted as now
- [x] the decision's title and *Why* → say one thing: that Erez ruled, or only what Claude would rule
- [x] the decision → rests on words of Erez's that rule on admission, or stays `Not admitted:` with what Claude would rule until he does (second reading: "Yes, open it" answered whether to open the task)

**Not asked** — extending `ACCEPTANCE_FORBIDDEN`; any new gate check.

### The withdrawn-box decision said the compiler changed

**Found** — It said the compiler "no longer counts" a withdrawn line; no script changed,
and a line with no checkbox was never counted.

**Done when**

- [x] the decision's sentence about the compiler → says the line is not a box, so the compiler, unchanged, does not count it
- [x] the compiled `docs/DECISIONS.md` → carries the corrected wording, and `compile-record.mjs --check` exits 0

**Not asked** — any change to `compile-record.mjs`; a "Withdrawn" convention in the runbook or `tasks/README.md`.

### The first decision reversed parts of D5 and D6 with no Supersedes line

**Found** — It reversed a clause of each in prose only, where runbook 4.5 and Appendix D
say a decision is reversed by a `Supersedes:` line; a reader of D5 or D6 had nothing
pointing on.

**Done when**

- [x] the first decision → carries `Supersedes: D5, D6`, and its text says which parts of each still stand
- [x] the compiled plan → unchanged by it, since neither D5 nor D6 has a `Milestone:` or `Not in scope:` line

**Not asked** — editing D5, D6 or `tasks/adopt-unities.md`.

## What was done

Answering the reading. The skill's sentence says a box that waits on something outside
the project is rejected at review and caught by the gate only in some wordings. The
not-admitted decision keeps the plain `Not admitted:` title: it was first retitled as
ruled by Erez, and the second reading found the quoted answer was to opening the task,
not to admission; its *Why* now says why the pattern is not extended and that Erez has
not ruled. The withdrawn-box decision says the line is not a box, so the unchanged
compiler does not count it. The first decision carries `Supersedes: D5, D6`, after its
*Why*, and says what of each stands. `docs/DECISIONS.md` was regenerated from HEAD and
recompiled, since the compiler refuses a retitled decision it has already compiled; the
plan is unchanged by it. `node --test` at the root: 106 tests, 106 pass.

Reviewed by: the same reader, on a second and a third reading of the corrections; it ran
the record check and the gate on the staged diff, and found every *Done when* line above
to hold
