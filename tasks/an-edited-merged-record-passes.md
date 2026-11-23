# An edited merged record passes the "no record" check

## Context

Found by a design reader in the multi-developer repository in the adapted staging, at its
upgrade to 0.6.8, and owed to the plugin (`tasks/convert-the-adopted-repositories.md`).
Brought in by Erez on 2026-11-23, in chat.

A section of a task file counts as the scene's unless the base held it word for word.
So a change that edits one word of another task's merged, reviewed `## What was done`
makes that section the scene's, and it carries its old `Reviewed by:` line, so the new
"no record" check of 0.6.8 passes. 0.6.5 passed it too. `check-unit.mjs` says this is
the design: a section the scene edited is judged whole, and must say who read it.

No such change has been seen in a repository; the reader constructed it. A finding that
would have the gate refuse something it lets through is Erez's to admit (`CLAUDE.md`,
*A check enters the gate because something happened*). What Claude would rule: not admitted.
`tasks/README.md` says a merged record is never edited, but that is a rule for whoever
writes, not a promise, an acceptance or a test the gate breaks.

**Promise** — A record, once merged, reads as it did when it was reviewed.

**Acceptance**

- [ ] the assignee: Erez's ruling on this finding is recorded here as a decision that supersedes the one below, or the one below stands

## Review · 2026-11-23

### An edited merged record counts as a new one

**Found** — An edit to one word of a merged `## What was done` in another task file passes
as the scene's record.

**Done when**

- [x] a scene that edits a merged record and adds none → the gate is unchanged

**Not asked** — refusing every edit to a merged section, which would refuse the record
corrections a review round asks for.

## Decisions

### 2026-11-23 · Not admitted: an edited merged record passes as a new one

**Decision** — Not built. The gate keeps counting a section the scene edited as the
scene's, judged whole.
**Rejected** — Refusing an edited merged section, on the reader's constructed case.
**Why** — It has not happened in a repository, and until Erez admits a finding of this
kind it is not admitted.
