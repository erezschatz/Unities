# Acceptance boxes are judged where the scene wrote them

## Context

Found on 2026-11-19 by the cold reader of `tasks/new-records-are-found-by-heading-text.md`,
outside that scene's diff.

The gate checks every acceptance box in every task file a scene touches. So when
`ACCEPTANCE_FORBIDDEN` is widened and an older `## Context` holds a box the new rule
refuses, every later scene that adds a record to that file is refused for a box it did
not write. Whether a widened rule should reach old boxes is undecided.

**Promise** — A scene is held to the boxes it wrote, as it is to the sections it wrote.

**Acceptance**

- Withdrawn (tasks/acceptance-boxes-are-judged-where-the-scene-wrote.md): script: a scene that adds a record to a task file whose older Context holds a box the current rule refuses, and leaves the box alone, gets no acceptance message
- [x] script: a scene that adds a record to a task file closed at the scene's base, whose Context holds a box the current rule refuses, and leaves the box alone, gets no acceptance message
- [x] script: the same box in a task file open at the scene's base, with a box still open or no record, is refused
- [x] script: a box the scene adds or edits, ticking included, that the rule refuses, is refused as now
- [x] script: a new task file with such a box is refused as now

## Decisions

### 2026-11-26 · A later rule does not reach a closed task; an open task is held to today's

**Decision** — Ruled by the developer on 2026-11-26, in chat: "if we change the rules, it
should not affect closed tasks. If a task is opened, then it should be subjected to
whatever rules there are, I don't want to maintain 10 versions for 10 tasks." A task
file closed at the scene's base and still closed in the scene keeps the acceptance boxes
it closed with: each box line the base held outside a review section, trimmed, passes
once, and a box the scene adds, edits or copies is judged. Closed is what the compiled
plan calls done: a `## What was done` record, and no `- [ ]` outside a fenced block. A
task file open at the base, or one the scene reopens with a new open box, is judged
whole by the rule as it is now. The first acceptance box, which asked
for every older box to be left alone, is withdrawn in the form of D89 and replaced by two
that say this.
**Rejected** — Leaving every box a scene did not write alone, which this task first
asked, so that an open task keeps the rule it was opened under; judging every box in
every file touched, as before, so that a closed task is refused for a box it closed with;
recording which rule a task was opened under, a version per task.
**Why** — The developer's words: a closed task is history and stays as it closed, and
an open one has one rule to meet, today's.

### 2026-11-26 · A closed task renamed is read as a new task file

**Decision** — The gate reads a task file at the base under the name the scene gives it,
so a closed task renamed in the scene has no base and is judged whole, as a new task
file is.
**Rejected** — Following the rename to the old name, which no other part of the
acceptance check does.
**Why** — A rename of a task file is rare, its acceptance can then be read as written
anew, and following it would add rename detection for this one check.

### 2026-11-26 · A review line is withdrawn in the same form as a box

**Decision** — A *Done when* line a ruling makes untrue is withdrawn in D89's form,
`- Withdrawn (<the task file whose decision withdraws it>): <the line as it was>`, and
the lines the ruling makes true stand below it, ticked when they hold. The first review
line of "Acceptance boxes were still judged across the whole file" in
`tasks/new-records-are-found-by-heading-text.md` is withdrawn so.
**Rejected** — Ticking it, when it holds only for a closed task; leaving it open, which
no work can close; rewriting it in place, which loses what was asked.
**Why** — D89 already says how a line that no longer binds stays in the record.

### 2026-11-26 · 0.6.20

**Decision** — The gate and the runbook change, so the plugin is 0.6.20. The form is
unchanged at 1.0.
**Rejected** — Carrying it in 0.6.19, which is committed.
**Why** — A change to the procedure is a version (`docs/SPEC.md`, *Versions*).

## What was done

`check-unit.mjs`: before it reads a touched task file's acceptance boxes, the gate reads
the file at the scene's base. If it holds a `## What was done` record there and no open
box, every box line the base held word for word is passed over; any other box is judged
by `ACCEPTANCE_FORBIDDEN` as before. Runbook 4.7, *Acceptance boxes*, says a task is held
to the rule as it is while it is open, and that a later rule does not reach the boxes a
closed task closed with. `docs/SPEC.md` says the same in a sentence.

Test: "a rule made after a task closed does not reach its boxes; an open task is held to
today's rule". A box the rule refuses is committed on main, as if written before the
rule, in a task that is closed, open with another box, or without a record; a scene then
adds a record, in `--pr` and `--staged`. The closed task with its box left alone passes
the acceptance check; the same box edited, a refused box added to the closed task, the
open task and the unrecorded one are refused. Against 0.6.19 it fails on the first case.

In `tasks/new-records-are-found-by-heading-text.md` the review item that pointed here
has its first line withdrawn the same way, replaced by the two cases above, and its other
two lines ticked. The open box of `tasks/a-check-is-admitted-from-what-happened.md`, that
both findings of D35 are ruled on and the rulings written into their task files, is
ticked: this file and `tasks/diffs-are-read-under-any-git-config.md` (D97) carry them.

The plugin is 0.6.20: the runbook's first line, `.claude-plugin/plugin.json`, the
manifest (both copies) and SPEC's "as of". The masters were copied over the planted
copies. `node --test` at the root: 108 tests, 108 pass.

This record describes the first pass; what it says of how a closed task's boxes are
matched is replaced by the record below.

Reviewed by: a read-only Claude subagent that had not seen the work, given
`docs/reviewer.md`; it probed the gate in throwaway repositories in every mode, strict
and adapted. Its five findings are the review below, answered before commit.

## Review · 2026-11-26

The reader's findings, condensed by the agent that did the work. The first three break
an acceptance box or the developer's ruling, so they are answered under that ruling.

### A box line the base held anywhere passed, however often and wherever

**Found** — The exemption matched any trimmed line of the base, any number of times: a
second copy of the old box, or a review line copied into Acceptance, passed.

**Done when**

- [x] closed task, its old refused box left alone, once → no acceptance message
- [x] closed task, a second copy of that box added → the copy is refused
- [x] closed task, a `## Review` Done-when line the rule refuses copied into Acceptance → refused
- [x] closed task, the old box only re-indented → no acceptance message
- [x] closed task, the old box with `[x]` changed to `[X]` → refused
- [x] each case above, in `--staged` and `--pr` → the same outcome

**Not asked** — a change to `ACCEPTANCE_FORBIDDEN`, or judging review boxes.

### A task the scene reopened kept its old boxes for that scene

**Found** — Closed was read from the base alone, so a scene that added an open box to a
closed task passed with the old refused box, and the next scene was refused for it.

**Done when**

- [x] closed at the base, the scene adds an open box and leaves the old one → the old box is judged in that scene
- [x] closed at the base, the scene only adds a record → no acceptance message
- [x] open at the base → refused
- [x] each case, in `--staged` and `--pr` → the same outcome

**Not asked** — a rule version per task.

### Closed was not the plan's done: fenced lines counted

**Found** — The gate counted a `- [ ]` inside a fenced block as open; the record compiler
does not. (The reader's second case, a record heading only inside a fence, is the same in
both: neither skips a fence when it looks for `## What was done`.)

**Done when**

- [x] base has a record and its only `- [ ]` is fenced; the old box is left alone → no acceptance message
- [x] base has an open box outside a fence, in Acceptance or in a review → refused
- [x] the gate's closed and the plan's done → the same test: a `## What was done` line, and no `- [ ]` outside a fence

**Not asked** — any other change to how the compiler counts boxes.

### A closed task renamed was judged whole

**Found** — The base is read under the new name, so a renamed closed task is judged as
new.

**Done when**

- [x] closed task renamed, old box left alone → refused, as a recorded decision ("A closed task renamed is read as a new task file")
- [x] closed task copied into a new file → refused, as a new task file is

**Not asked** — rename detection anywhere else in the gate.

### Withdrawing a review line was not a decision

**Found** — The review line withdrawn in `tasks/new-records-are-found-by-heading-text.md`
was named only in the record.

**Done when**

- [x] this task's `## Decisions` → names the withdrawal of the review line, its form and why
- [x] `docs/DECISIONS.md` → compiled with it

**Not asked** — a change to D89 or to the compiler.

## What was done

Answering the reading. `check-unit.mjs` reads a touched task file as closed when, at the
base and in the scene, it holds a `## What was done` line and no `- [ ]` outside a
fenced block (`closed`), the test the record compiler uses for done. In a file closed in
both, the acceptance boxes the base held outside review sections (`acceptanceBoxes`) are
counted, and each passes once, anywhere outside a review section; every other box is
judged. The runbook's paragraph says a task the scene reopens is judged whole, what
closed is, and that a renamed task file is read as a new one; `docs/SPEC.md`'s sentence
says a task closed at the base and still closed in the scene is judged only on the boxes
the scene adds, edits or copies; two decisions record the rename and the withdrawn
review line.

The test adds: the old box copied, refused; re-indented, passed; edited to `[X]`,
refused; a review line copied into Acceptance, refused; the task reopened by a new open
box, refused; an open box only inside a fence, passed. Against the first pass it fails on
the copied box; against 0.6.19, on its first case. `node --test` at the root: 108 tests,
108 pass.

Reviewed by: the same reader, on a second reading; it probed every review line in six
modes and a real merge in throwaway repositories, found every line to hold, and found
the two points below

## Review · 2026-11-26

### "Passes once where it stood" was not what the code does

**Found** — Second reading. The exemption is a count with no position: an old box moved
elsewhere in the file, outside a review, passes; the record, the test's comment and the
gate's comment said "where it stood", and the record left out the SPEC sentence.

**Done when**

- [x] closed task, an old box moved elsewhere in the same file, outside a review → no acceptance message
- [x] the record, the test's comment and the gate's comment → say each base box passes once anywhere outside a review section
- [x] the record → names the SPEC sentence it changed

**Not asked** — matching boxes by position.

### The runbook defined closed by a plan a plan-off repository does not have

**Found** — Second reading. The paragraph said closed is what the compiled plan calls
done; with `"plan": false` there is no plan, and the gate's test applies the same.

**Done when**

- [x] the runbook paragraph → defines closed as a `## What was done` record and no `- [ ]` outside a fenced block
- [x] a `"plan": false` repository → judged by the same test, as now

**Not asked** — any change to how the compiler handles `"plan": false`.

## What was done

Answering the second reading. The record above, the test's comment and the gate's comment
say each base box passes once anywhere outside a review section, and the record names
SPEC's sentence. The runbook's paragraph defines closed in its own terms. Manifest
regenerated and the masters copied again; `node --test` at the root: 108 tests, 108 pass.

Reviewed by: the same reader, on a third reading; it re-ran the tests and the record
check, probed the moved-box and plan-off cases, found every line above to hold, and
found that two code comments still defined closed by the plan

## Review · 2026-11-26

### Two code comments still defined closed by the plan

**Found** — Third reading. The comment above `closed()` and the test's comment said
closed is what the plan calls done; one line of the gate's comment ran past the others.

**Done when**

- [x] the comments above `closed()` and in the test → define closed as a `## What was done` record and no `- [ ]` outside a fence
- [x] the gate comment → wrapped like the lines around it
- [x] `"plan": false` and plan-keeping repositories → judged as now

**Not asked** — any change to `closed()` or the compiler.

## What was done

Answering the third reading: the two comments define closed in its own terms, and the
gate's comment is rewrapped. Only comments changed. Manifest regenerated and the masters
copied; `node --test` at the root: 108 tests, 108 pass.

Reviewed by: the same reader, on a fourth reading; it compared the changed lines with the
third reading's code and re-ran the tests, the manifest and the record check in a clone.
