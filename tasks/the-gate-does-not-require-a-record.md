# The gate does not require a record

## Context

Found on 2026-11-19 by the reader, while the essay's second part was being cut
(`tasks/essay-part-two-and-licences.md`).

The gate asks that a task file changed, and checks the `## What was done` sections a
scene adds. It does not ask that one be added. A scene with source, test, doc and one
line added anywhere in a task file passes, in every mode. The essay of October 2026
named the missing check as a later tightening: look for an added `## What was done`
heading, so that "touched the task" becomes "recorded the scene". It was never built.
Runbook 4.11 states the limit.

To decide before building: in the adapted staging a branch may commit before its record
exists, so the check belongs to `--pr` there, and to `--staged` and `--branch` in strict.
A scene that only opens a task (context, promise, acceptance, no source change) must
still pass.

**Promise** — A change to source cannot land without a record of what was done.

**Acceptance**

- [x] script: an Appendix J test in which a scene changes source and adds no `## What was done` is refused, strict at the commit and adapted at the pull request
- [x] script: a scene that adds a task file and changes no source passes
- [x] script: all Appendix J tests pass

## Decisions

### 2026-11-22 · Admitted: a change held to a task change must add a record

**Decision** — Erez admitted this on 2026-11-22, in chat: "yes, this has to be
enforced." The gate refuses a scene that changes a file in a role held to a task change
and adds no `## What was done` section to any task file.
**Rejected** — Leaving it as the known limit of runbook 4.11 until a pull request is
seen to pass without a record.
**Why** — It was not shown to have happened in a repository. Erez admitted it on what
the standing paragraph every adopted repository carries already says, that a change to
source also carries a `## What was done` section: the gate let through what the
instructions forbid. That is not one of the two grounds D41 lists; the ruling is his
(D42).

### 2026-11-22 · Owed by every role held to a task change, in every mode

**Decision** — The record is owed when the scene changes a file in any role whose
`required` list names `task`: source where its list names it, as the default and this
repository's do, and whatever else a repository holds to a task change, as this one
holds the runbook and the skill. A repository whose source list leaves `task` out owes
no record, as it owed no task change. A section counts as added by
the same test the reader's line uses: one the base did not hold word for word. The check
runs in every mode and is refused as every other finding is: at the commit and the end
of the turn in strict, at the pull request in adapted, where `--staged` and `--branch`
say it and let the commit stand. Where no task file changed at all, the older message
"no task change" stands alone.
**Rejected** — Source only, which would leave a procedure held to a task change open to
the same line-anywhere pass; a check in `--pr` alone in adapted with nothing said at the
commit, which is not how the gate treats any other finding there; asking that the record
be in the same task file that was touched.
**Why** — "Held to a task change" already means "must be recorded"; the check makes the
task change mean the record. This task's Context asked for strict at `--staged` and
`--branch` and adapted at `--pr`, and that a scene which only opens a task still passes;
both hold.

### 2026-11-22 · A scene that undoes a recorded scene owes a record of its own

**Decision** — A commit or pull request that takes a recorded change back out (source,
test and doc restored, the `## What was done` section removed) is refused as "no
record", since it changes a role held to a task change and adds no section. That is
left as it is. The undoing is recorded as any change is: the earlier section stays, and
a new one says what was taken out and why.
**Rejected** — An exemption for a scene that removes a section; saying nothing of it.
**Why** — Found by the reader; it has not happened in a repository. A record is not
edited once merged, so removing one was never the form, and taking a change out is a
change to source like any other. Erez may rule otherwise.

### 2026-11-22 · 0.6.8

**Decision** — The version is 0.6.8.
**Rejected** — Folding it into 0.6.7.
**Why** — 0.6.7 was committed as its own scene, and this changes what the gate refuses
(D9).

## What was done

`check-unit.mjs` notes whether the scene added a `## What was done` section while it
reads the scene's task files, and refuses with `no record: a task file changed but no
"## What was done" section was added` when the scene changes a role held to a task
change and added none. Five tests were added to `check-unit.test.mjs`: adapted (told at
the commit, refused at the pull request, passes once the record is added); strict
(refused at `--staged` and `--branch` with the record the only thing missing, passes
once added); a record the base already held with a line added elsewhere (refused); a
scene that only opens a task (passes in both stagings); a role held to a task change
(refused) beside one held to a doc only (passes). Run against the 0.6.7 gate, four of
the five fail and the task-only one passes. `node --test` at the root: 91 tests, 91
pass, on Node 22.23.5. None of the 86 earlier tests needed changing.

The runbook says it in 4.7, beside the reader; 4.11 no longer lists it as a limit, and
says what stays a presence test; Appendix J names it. `docs/SPEC.md` no longer lists it
among what the plugin does not do. The runbook's first line, `plugin.json` and the
manifest carry 0.6.8, and the planted copies here were replaced from the masters.

Not run in any other repository. A repository that takes 0.6.8 will have a pull request
refused, or a commit in strict, where source changed and its task file was touched
without a record; that is the change.

Reviewed by: a read-only subagent that had not seen this work (it read the scene before this one); it did not run the tests

## Review · 2026-11-22

The reader's three findings, condensed by the agent that did the work.

### The first decision named a ground D41 does not list

**Found** — The first decision's Why called the standing paragraph "the second ground
of D41". D41's second ground is what a task file's promise or acceptance, or a test,
already says; the standing paragraph is none of those.

**Done when**

- [x] the first decision's Why, and as compiled → says Erez admitted it on the standing paragraph, and that D41 does not list that ground
- [x] the Decision and Rejected clauses, and "It was not shown to have happened in a repository" → unchanged
- [x] `docs/DECISIONS.md` → equal to the compiler's output

**Not asked** — any change to the gate, to D41 or D42, or to the tests.

### "Source always" was not what the gate does

**Found** — The second decision and the runbook's 4.7 said the record is owed by "source
always". The gate asks only whether a role's `required` list names `task`, and Appendix
A allows a source list without it.

**Done when**

- [x] the second decision and runbook 4.7 → say the record is owed by source where its list names `task`, as the default does
- [x] a configuration whose source list names `task` → refused without a record, as before this review
- [x] a configuration whose source list does not name `task` → the gate is unchanged

**Not asked** — a new configuration check, or a version beyond 0.6.8.

### A scene that undoes a recorded scene is now refused, and nothing said so

**Found** — A commit that restores source, test and doc and removes the `## What was
done` section changes a role held to a task change and adds no section. 0.6.7 passed it;
this gate refuses it as "no record". Neither the record nor the decisions mentioned it.

**Done when**

- [x] the task file → says in a decision that such a scene is refused and that this is left as it is
- [x] a scene that changes source and adds a record → passes as before this review
- [x] the gate → unchanged by this review

**Not asked** — an exemption for a scene that removes a record.

## What was done

Answering the reading. The first decision's Why now says the admission rests on the
standing paragraph and on Erez's ruling, not on a ground of D41. The second decision
and the runbook's 4.7 no longer say "source always". A fourth decision, placed before
the version's, says a scene that undoes a recorded scene is refused and owes a record of
its own; nothing was built for it. The scripts were not changed by this review; the
manifest is as it was. The reader found the nine boxes above to hold and the agent
ticked them.

Reviewed by: the same reader, which read these corrections against the staged files
