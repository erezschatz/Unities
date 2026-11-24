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
- [x] script: source + doc change + one box ticked, or one line added, inside an earlier merged `## What was done` that has its `Reviewed by:` → refused as "no record"
- [x] script: the same correction together with a new `## What was done` that has its `Reviewed by:` → passes
- [x] script: a scene that only corrects a merged record, with no source change → passes
- [x] script: a box ticked only in an acceptance section, or a line added only to `## Context`, with source → refused as "no record", as now
- [x] script: a new `## What was done` with no `Reviewed by:` → refused for the missing reader, as now
- [x] script: `node --test` at the root passes with the manifest at the new version

## Review · 2026-11-23

### An edited merged record counts as a new one

**Found** — An edit to one word of a merged `## What was done` in another task file passes
as the scene's record.

**Done when**

- [x] a scene that edits a merged record and adds none → the gate is unchanged while D69 stands (it was superseded on 2026-11-23)

**Not asked** — refusing every edit to a merged section, which would refuse the record
corrections a review round asks for.

## What was done

The master gate (`skills/unities-project/files/check-unit.mjs`) now tells a corrected
record from a new one by the rule of the first 2026-11-24 decision: `corrections` pairs
the changed `## What was done` sections of all touched task files, read in path order,
with the records the base held more times than the scene does (`baseSections().all` and
`sceneSections().all` hold every section as often as it occurs; `sceneSections` lists
every task file as the scene has it, by mode). It pairs as many as can be paired, by
augmenting paths: a changed record takes a free original or one whose holder can move to
another, the closest records trying first. `likeness` is the share of the longer
section's words both hold. A correction is skipped where records are judged:
it is not asked for a reader and does not set `recorded`. Review rounds are judged as
before.

Tests turned with the ruling: "an older record the scene corrects is not refused, with or
without a reader line" (was: refused until it names its reader); "corrected older records
are not asked for a reader, only the new one is; after a rename too" (was: each refused);
and the tab-inside-a-line case of the trailing-spaces test, which now passes as a
correction. New: "source with a corrected merged record and no new one is refused as no
record", for a box ticked and a line added inside a merged record with its reader: refused
as "no record" in every mode, passing with a new read record beside it, and passing alone
with no source change. A box ticked or a line added outside a record, with source, is
refused as before: the existing tests "a record the base already held is not this scene's"
and the "touched task file but no record" pair cover the line case; a ticked box outside a
record is read from the code, since only `## What was done` sections are records. Also
new: "a correction passes when its record is also in another file, is one of two alike,
or has a close new record beside it", the three cases the cold reader found refused, and
the fourth from its second reading: two records corrected where taking the closest pair
first leaves the second without one. The
deleted-record, long-record, split and copy tests pass unchanged; of the rename cases,
the one in "a renamed task file keeps its older records" is unchanged and the one in
"corrected older records…" was turned with the ruling.

The review item above held while D69 stood and is superseded with it. Runbook 4.7 says a
correction is never refused and is not a record, and how the gate tells one; 4.11 and the
finishing step of the developer's guide (4.8) say a merged record may be corrected and not
added to; Appendix D's task README and this repository's say the same. Because a script
changed, the plugin is 0.6.11: the runbook's first line, `.claude-plugin/plugin.json`, the
manifest (both copies) and SPEC's "as of 0.6.11". The form is unchanged at 1.0. The
planted copies here are the masters. `node --test` at the root, on Node 26.13.1: 98 tests,
98 pass.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. It probed the gate with scenes of its own in throwaway clones, in
every mode, over three readings: the first found the three refused corrections, the
gaming case and the overclaims, the second the closest-first pairing, and the third found
every ticked line held and nothing new. Its findings are the 2026-11-24 review below,
answered before commit.

## Review · 2026-11-24

### A new unread record passes if it reuses half the words of a record it replaces

**Found** — A read record deleted and new unread work sharing 9 of its 15 words passed
as a correction; distinct real records here score up to 0.51.

**Done when**

- [x] an old record deleted and a new unread record written in its place that shares at least half its words → the gate is unchanged (until Erez admits the case)
- [x] a real correction (one word fixed, a box ticked, a line added) → passes, unasked for a reader

**Not asked** — telling corrections from new work by meaning.

### A real correction is still refused

**Found** — `gone` held only base records the scene no longer has anywhere, as a set, and
pairs were taken in file order: a correction whose base text is also in another file, one
of two identical records corrected, and a correction beside a close new record in an
earlier file were refused, the last only in some modes.

**Done when**

- [x] a correction whose base text is also in another task file → passes
- [x] one of two identical base records corrected → passes
- [x] a correction plus a similar new record in an earlier file → the same verdict in every mode
- [x] a correction in a renamed file, or in one deleted and re-created untracked → passes (holds now)

**Not asked** — git rename detection.

### The ticked boxes and the record say more than holds

**Found** — The promise and acceptance boxes 3 and 5 did not hold for the cases above;
the 2026-11-23 review box read "→ the gate is unchanged" after the gate changed; the
record said the rename tests passed unchanged.

**Done when**

- [x] each ticked box → holds for the running program, or is unticked with its reason

**Not asked** — rewriting the ruling.

### Closest-first pairing refuses two corrections that a full pairing would pass

**Found** — Second reading. With base records A and B and both corrected, the first
changed record scoring 0.9 to A and 0.5 to B and the second 0.8 to A and 0.4 to B, the
first took A and the second was refused in every mode, though the other pairing passes
both.

**Done when**

- [x] each changed record could be paired with its own base record at 0.5 or above → no correction is refused, in every mode
- [x] a pairing where some changed record has no partner left → that one is judged as new, as now

**Not asked** — a different likeness measure.

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

### 2026-11-24 · A changed record is a correction when half its words are a record the scene no longer holds

**Decision** — A `## What was done` the base did not hold word for word, in any task
file, is a correction when at least half the words below its heading, counted against the
longer of the two, are those of a record the base held more times than the scene still
does, across all task files. Each such base record corrects at most one section, and as
many changed records are paired with originals as can be; the closest records try first,
so where not all can be paired, the closest are. Task files are read in path order, so
every mode gives the same answer. Anything else is new: it is the scene's record and must name
its reader. Corrections are not asked for
a reader and do not answer "no record". Records that only moved, word for word, are still
the base's, as before.
**Rejected** — Counting `## What was done` sections per task file against its own
version at the base, the rule first proposed: it needs git's rename detection to find a
renamed file's base version, and it cannot say which of a file's changed sections is the
new one, so a correction in the same file as a new record would be asked for a reader.
Taking the changed sections least like the base as the new ones, up to the count: a
ranking, where a fixed share is one rule. Reading which lines git's diff marks as added:
the same heading line repeats in every record, and git may pair a new record's heading
with an old one's.
**Why** — It tells an edit from new work by the words, which is what the diff shows a
person, without pairing files or reading git's alignment. A long new record is judged on
its own words, not hidden by a short edited one. A new record written in place of a
deleted one is judged when it shares less than half that one's words; one that shares
more passes as its correction (the decision below).

### 2026-11-24 · Not admitted: a new record that reuses half the words of one it deletes passes as a correction

**Decision** — Not built. The cold reader of this scene deleted a read record of 15 words
and wrote new work sharing 9 of them, with no reader; it passed as a correction. Among
this repository's 42 records, two pairs from separate scenes score 0.50 and 0.51.
**Rejected** — Raising the share, or judging corrections by more than their words, on
the reader's constructed case.
**Why** — It has not happened in a repository, and it needs a record deleted, which is
not a correction. Erez has not ruled on this case. What Claude would rule: not admitted,
in the spirit of his ruling on records copied between task files.

### 2026-11-24 · Not admitted, by Erez: a new record that reuses half the words of one it deletes

Supersedes: D76

**Decision** — Not built, and not to be. Erez ruled on 2026-11-24, in chat, after the
case was put to him as it affects people using the plugin: an earlier record can be
overwritten in a task file without being flagged and without a reader named for the
rewrite, but a change to source still needs a new record.
**Rejected** — Raising the share, or judging an entry by its meaning, to catch it.
**Why** — Erez: "it feels like an edge case that is just dipping into heuristics that are
never going to fully pick up the 1% of cases that should be flagged, and even that 1% is
probably ok if you really think about it, we're working in a software project, not
proving a mathematical theorem here."
