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

The same repository's reader reported it again on 2026-11-23, brought in by Erez the same
day, with what the first reading missed: runbook 4.7 says "a task file that was only
touched, a line added to its Context or a box ticked, is not a record", and the gate lets
a box ticked or a line added inside a merged `## What was done` pass as one. So the gate
and its own runbook disagree. Erez ruled the same day; the second decision below.

**Promise** — Correcting a record is never refused, and never counts as the record of new
work. (Rewritten with the ruling; it read "A record, once merged, reads as it did when it
was reviewed", which the ruling rejects.)

**Acceptance**

- [x] the assignee: Erez's ruling on this finding is recorded here as a decision that supersedes the one below, or the one below stands
- [ ] script: source + doc change + one box ticked, or one line added, inside an earlier merged `## What was done` that has its `Reviewed by:` → refused as "no record"
- [ ] script: the same correction together with a new `## What was done` that has its `Reviewed by:` → passes
- [ ] script: a scene that only corrects a merged record, with no source change → passes
- [ ] script: a box ticked only in an acceptance section, or a line added only to `## Context`, with source → refused as "no record", as now
- [ ] script: a new `## What was done` with no `Reviewed by:` → refused for the missing reader, as now
- [ ] script: `node --test` at the root passes with the manifest at the new version

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

### 2026-11-23 · A correction to a record is allowed and is not a record

Supersedes: D69

**Decision** — Admitted by Erez, 2026-11-23, in chat. Fixing a record that is already
there, a mistake or something added by accident, is not part of the scene's action and
is never refused for it. It is not the scene's record either: "no record" is answered
only by a `## What was done` the scene adds, told from an edited one by the diff.
Records copied by hand from one task file into another are not designed for: the gate
does not try to tell a copy from new work.
**Rejected** — Keeping the gate as it is and changing runbook 4.7 and Appendix D to say a
correction counts as a record; refusing edits to merged records.
**Why** — Erez: "The idea was never to prevent updates and fixes", and "If someone starts
copy pasting stuff between tasks rather than using the available tools, then we shouldn't
validate this by trying to figure how to support it." The runbook already says a touched
task file is not a record; the gate is brought to it.
