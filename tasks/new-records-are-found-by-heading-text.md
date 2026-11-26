# A second record in a task file makes the first one count as new

## Context

Found on 2026-11-19, from two directions. A team repository's own copy of the gate
carries a local fix described as "sections are new by heading line number", which is not
in this master. Reproduced here against the 0.5.5 script.

The gate checks that every `## What was done` section a scene adds ends with
`Reviewed by:`. It decides that a section is new when the text of its heading line is
among the lines the scene added (`addedLines` in Appendix A). Every such section has the
same heading. So when a scene adds a second `## What was done` to a task file, the first
one counts as added too. If that older section has no `Reviewed by:` line and is not a
migrated record, the scene is refused for a section it did not touch. `## Review`
sections written on the same date share a heading in the same way.

To reproduce: a task file on the target with one `## What was done` and no
`Reviewed by:`; on a branch, a source, test and doc change, and a second
`## What was done` with its `Reviewed by:` line; `--pr <target>` exits 1 with
`record in tasks/… has no "Reviewed by:" line`.

The team repository's fix has not been seen here. Either its diff of that function is
brought in, or the fix is written fresh and that copy is replaced on its next re-run.

**Promise** — A scene is held to the sections it added, and to no others.

**Acceptance**

- [x] script: an Appendix J test with the case above passes `--pr`, and fails against the 0.5.5 script
- [x] script: the same holds for two `## Review` sections with one heading
- [x] script: a section the scene did add, without `Reviewed by:`, is still refused in all three modes
- [x] script: all Appendix J tests pass

## Decisions

### 2026-11-19 · Written fresh: a section is new when its heading's line was added

**Decision** — The gate takes, from the scene's diff with no context lines (`-U0`), the
numbers of the lines it adds in the scene's version of the file, and counts a
`## What was done` or `## Review` section as the scene's when the line its heading
stands on is one of them. An untracked file is new throughout. A `+++` line is a header
only before the first hunk; after it, it is an added line that begins with `++`.
**Rejected** — Bringing in the team repository's fix, which has not been seen here;
matching the section's whole text, which still confuses two identical sections;
counting a section as the scene's when any line in it was added, which would charge the
scene with an old record it only appended a line to.
**Why** — The heading's own line is what a scene writes when it writes a section, and
its number tells two sections with one heading apart. When the team repository is
re-run (runbook 5.5), its local fix is a local change to be listed; this one replaces
it, and that repository's decision says so.

### 2026-11-19 · Sections are compared with the base's, not found in the diff

**Decision** — A section is the scene's when the base has no section identical to it,
wherever it stands; of the sections left over, a base section is paired with the scene's
section under the same heading that shares the most lines with it, as an edit, and what
stays unpaired is new. The base is the file at the scene's base plus the task files that
left the scene, so a renamed file keeps its past. Line endings are normalised, and only
`\n` starts a line.
**Rejected** — The line numbers of D33: git chooses which of two identical lines it
reports as added, and charged a new record to an old one; asking git for rename
detection, which a work-tree rename and `diff.renames=false` do not give.
**Why** — The cold reader showed D33 judging the wrong record when a new one is inserted
above an older one, a regression on 0.6.1. Comparing the sections themselves needs no
diff at all, so git's configuration cannot change it.
Supersedes: D33

### 2026-11-19 · Two findings outside this scene become tasks

**Decision** — The reader's findings on the release check and compiler under unusual git
configuration, and on acceptance boxes judged across the whole file, are
`tasks/diffs-are-read-under-any-git-config.md` and
`tasks/acceptance-boxes-are-judged-where-the-scene-wrote.md`, worked after the six of D7.
**Rejected** — Fixing them in this scene.
**Why** — Both predate this change and lie outside its diff; each needs its own record,
and the second a decision on whether a widened rule should reach old boxes.

### 2026-11-19 · A section is the scene's unless the base held it, word for word

**Decision** — A `## What was done` or `## Review` section is judged when no task file at
the scene's base holds an identical section (line endings aside). A section that only
moved, by reordering, rename, split or copy, is the base's. One the scene edited is the
scene's and is judged whole, so editing an older record that names no reader is refused
until it does. This reverses the first round's box "an older record the scene only
appended a line to → not judged".
**Rejected** — D34's pairing of left-over sections by heading and shared lines, which a
deleted record, a long new one or a deleted task file made stand for a new section; any
other heuristic that lets one section stand for another.
**Why** — The second reading broke the pairing four ways, and each repair moves the
failure. Identity needs no guess. The cost falls on editing a merged record, which the
form already forbids: such a record then names its reader, or is left as it was.
Supersedes: D34

## What was done

The gate (`skills/unities-project/files/check-unit.mjs`) decides which sections a scene
added by line number: `addedLineNumbers` reads the scene's diff with `-U0`, `--no-color`
and `--no-ext-diff`, and `sectionsOf` gives each `## ` section the number of its heading's
line. The record check and the review-round check both judge only the sections whose
heading line the scene added. `addedLines`, which matched heading text, is gone. Four
tests were added: a second record beside an old one without a reader passes `--pr`; a
second review round under the heading of an older, pre-rule round passes `--pr`; a new
record without a reader is still refused at `--branch`, `--staged` and `--pr` after an
older one that has a reader; an added line beginning with `++` is counted. The version
is 0.6.2 (runbook first line, `plugin.json`, the manifest regenerated, the copies made
again); the spec's version line is this scene's doc change, because no doc described the
matching.

Verified on Node 26.13.1: `node --test` at the root, 60 pass. The four tests against the
0.5.5 gate (cut from the `v0.5.5` runbook's Appendix A, whose values are the tests'
fixture) and against the 0.6.1 gate: the two tests of the defect fail on both; the other
two pass on both, as they guard what must not change.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

The first reading, written in by Claude. The last two items are not answered here; they
are task files of their own (the second decision above).

### A new record inserted above an older one was judged as the older one

**Found** — With identical lines in a file, git chooses which it reports as added; an
unread record inserted above a read one passed in every mode, a regression on 0.6.1.

**Done when**

- [x] an unread `## What was done` inserted above an older record that has a reader → refused at `--staged`, `--pr` and strict `--branch`, warned at adapted `--branch`
- [x] a read `## What was done` inserted above an older pre-rule record → passes all four
- [x] a second `## Review` round with the same heading, inserted above the older round → only the new round judged
- [x] the cases above under `diff.algorithm=histogram` or `patience` → the same outcomes
- [x] a record appended after an older one → outcomes unchanged
- [x] an older record the scene only appended a line to → not judged

**Not asked** — A rule about where a record goes; a change to the record format.

### A renamed task file charged the scene with every record in it

**Found** — The diff of one path sees a renamed file as new throughout.

**Done when**

- [x] task file renamed with `git mv`, plus a new record with a reader → no record message in any mode
- [x] task file renamed, plus a new unread record → refused once, for the new record only
- [x] task file renamed with no other change to it → no record or review message
- [x] renamed in the work tree only, at strict and adapted `--branch` → the same as `git mv`
- [x] a task file really new in the scene → every section judged

**Not asked** — The changelog compiler's renames; the naming rule.

### A change of line endings charged the scene with every record

**Found** — An LF file rewritten as CRLF showed every line added; `## ` after U+2028,
U+2029 or a lone CR counted as a heading.

**Done when**

- [x] LF task file rewritten with CRLF, plus a new record with a reader → passes all four
- [x] the same with an unread new record → refused for the new record only
- [x] CRLF throughout, or a `core.autocrlf=true` checkout → unchanged
- [x] a line holding U+2028, U+2029 or a lone CR followed by `## ` → not a heading

**Not asked** — Rewriting files; a `.gitattributes`.

### The release check and the compiler read diffs as this change stopped doing

**Found** — Under `color.ui=always`, `diff.noprefix`, `diff.external` and
`core.autocrlf=true`, release and compiler tests fail; `+++` lines are dropped. The same
on 0.6.1.

**Done when**

- [x] the release-PR and compiler tests under `color.ui=always`, `diff.noprefix`, `diff.mnemonicPrefix`, `diff.external` → pass
- [x] a changelog line beginning `++` → compared and compiled
- [x] "the compile after a merge…" under `core.autocrlf=true` → passes
- [x] the same with no special configuration → unchanged

**Not asked** — A change to the changelog format or to how a release PR is recognised.

### Acceptance boxes were still judged across the whole file

**Found** — An older Context box that a widened rule refuses refuses every later scene in
that file.

**Done when**

- [ ] a scene adds a record beside an older box the rule refuses, and leaves it alone → no acceptance message
- [ ] a box the scene adds or edits that the rule refuses → refused as now
- [ ] a new task file with such a box → refused as now

**Not asked** — A change to `ACCEPTANCE_FORBIDDEN`.

## What was done

The first three items were answered; the last two are the task files named in the second
decision above, and their boxes stay open here.

The gate no longer reads a diff to find a scene's sections. `newSections` compares the
file's sections with the base's (the file at the scene's base, and the task files at the
base that the scene no longer has), removes those that are identical, pairs each left-over
base section with the scene's section under its heading that shares the most lines, and
judges what stays unpaired. `sectionsOf` normalises line endings and starts a line only at
`\n`. `addedLineNumbers` and its `-U0` diff are gone. Seven tests were added:

- an unread record inserted above a read one, in all four modes;
- a read one above a pre-rule one;
- a review round inserted above an older one;
- an older record that was only extended;
- a rename by `git mv`, read and unread, and in the work tree only;
- a CRLF rewrite, read and unread;
- `## ` after U+2028, U+2029 and a lone CR.

The manifest was regenerated and the copies made again.

Verified on Node 26.13.1: `node --test` at the root, 67 pass. Against the gate as the
reader read it (the D33 version), six of the new tests fail: all but "an older record
the scene only appended a line to". Against the 0.6.1 gate, six fail: the two of the
first round and four of these (inserted above, read and review; rename; CRLF). The
inserted-above unread case, which 0.6.1 got right, passes there.
Ten tests, the seven above, the first round's two tests of the defect, and the
manifest's CRLF test, also pass under `diff.algorithm=histogram`, under
`diff.algorithm=patience` and under `core.autocrlf=true`, each set through
`GIT_CONFIG_GLOBAL`.

Reviewed by: the same read-only subagent, second reading (its findings are the review below)

## Review · 2026-11-19 · second reading

The second reading, written in by Claude. Where a *Done when* line says "by the decision
above", it was rewritten from the reader's, which kept the first round's rule for edited
records; the decision reverses that rule.

### A section left over from the base absorbed a new section with the same heading

**Found** — A deleted record, a deleted review round, another task file deleted, or a split
with the original deleted let a new unread section pass in every mode.

**Done when**

- [x] an older record deleted and a new unread one added in the same file → refused at `--staged`, `--pr` and strict `--branch`, warned at adapted `--branch`
- [x] an older review round deleted and an incomplete new round added under its heading → refused or warned the same way
- [x] another task file deleted, and an unread record added to this one → refused or warned for that record
- [x] a task file split in two with the original deleted, one part holding a new unread record → refused or warned for that record only
- [x] a rename (`git mv`, or in the work tree only) plus a new read record → passes
- [x] two older records each edited in place, nothing new → refused for both, by the decision above: an edited record that names no reader is the scene's

**Not asked** — A rule refusing the deletion of a record; a change to the record format.

### "Shares the most lines" counted blank lines, so an edit paired with the wrong section

**Found** — A short record edited beside a long new one passed; an edited pre-rule record
after a rename was judged.

**Done when**

- [x] an older read record edited in one line, plus a new unread record of any length → refused or warned for the new record
- [x] an older pre-rule record edited in one line, plus a new read record → refused for the edited record, by the decision above; with its reader named → passes
- [x] an older record the scene only appended a line to → judged, by the decision above
- [x] two older pre-rule records edited at once plus a new unread one → refused for each

**Not asked** — A change to what counts as an identical section.

### A task file copied or split, with the original kept, charged the scene with the moved records

**Found** — A new file holding sections of a file that still exists had no past.

**Done when**

- [x] a task file split in two with the original kept, plus a new read record → no record message in any mode
- [x] a task file copied, plus a new read record in the copy → no record message
- [x] the same with a new unread record → refused or warned for the new record only
- [x] a task file that is really new in the scene → every section judged

**Not asked** — A rule on whether a task file may be split or copied.

## What was done

The second reading was answered with a simpler rule (the third decision above, superseding
D34). `scenesSections` judges the sections of the file that no task file at the scene's
base holds word for word (`baseSections`, every section of every task file there, line
endings normalised). The pairing of left-over sections and `gone()` are gone. The test
"an older record the scene only appended a line to is not judged" was reversed into "an
older record the scene edits becomes the scene's: refused until it names its reader", by
that decision. "An added line that begins with ++" was removed, because nothing the gate
reads depends on it now. Eight tests were added for the reader's cases:

- an older record deleted beside a new unread one;
- a review round deleted beside an incomplete new one;
- another task file deleted;
- a long new record beside a short edited one;
- split and copy, with the original kept or deleted, read and unread;
- a rename staged before its deletion;
- a task file new in the scene;
- edited older records without a reader, in place and after a rename.

Verified on Node 26.13.1: `node --test` at the root, 74 pass.

- Against the D34 gate, seven of these fail (all but "a task file that is new in the
  scene", which every version gets right), and the reversed test fails too.
- Against the 0.6.1 gate, eleven of the suite's tests fail, including the first round's
  two and every move or deletion case. "The edited older records" test passes there,
  because 0.6.1 also charged an edited record by its heading.
- The whole suite under each git configuration the reader used, set through
  `GIT_CONFIG_GLOBAL`:
  - `diff.algorithm=histogram`, `diff.algorithm=patience` and `diff.mnemonicPrefix`:
    74 pass.
  - `core.autocrlf=true`: 73 pass. The failure is "the compile after a merge…".
  - `color.ui=always` and `diff.noprefix`: 72 pass. The failures are the release-PR test
    and "the compiler leaves the Reviewed by line out of the changelog".
  - `diff.external`: 72 pass. The failures are the release-PR test and "a pull request
    editing the compiled changelog by hand is refused". The second also fails on 0.6.1, and
    was added to that task's list.

  These are the failures already open in `tasks/diffs-are-read-under-any-git-config.md`.
  No test of which sections are the scene's fails under any of them.

Reviewed by: the same read-only subagent, third reading (its findings are the review below)

## Review · 2026-11-19 · third reading

The third reading, written in by Claude. The reader judged the decision sound and its
ticked lines to hold in all four modes.

### A whitespace-only change made an older record the scene's

**Found** — An editor stripping a hard break's trailing spaces, or a line of only a space
between sections, made an untouched older record the scene's.

**Done when**

- [x] an older record whose only change is trailing spaces or tabs removed or added → not the scene's, in all four modes
- [x] a line of only spaces or tabs added or removed between sections → not a change to either section
- [x] an older record with a changed word → the scene's, judged whole
- [x] CRLF rewritten to LF, or LF to CRLF → not the scene's

**Not asked** — Normalising whitespace inside a line; rewriting the file; an `.editorconfig`.

### The gate read every task file at the base, one call each, on every run

**Found** — One `git show` per task file: 4.1 s at 600 task files against 0.25 s on 0.6.1.

**Done when**

- [x] a scene adding one record, with 600 task files at the base → the same order of time as 0.6.1
- [x] the same with 5000 task files → well inside a hook's timeout
- [x] which sections are the scene's → unchanged: every case of the second reading gives the same outcome

**Not asked** — A cache between runs; a change to what the base is.

## What was done

The third reading was answered.

- `sectionsOf` ignores trailing spaces and tabs on each line, as it ignores line endings.
  A test pins a stripped hard break and a space-only line between sections, which pass,
  and a tab inside a line, which is still a change.
- `baseSections` reads all task files at the base in one `git cat-file --batch` call,
  instead of one `git show` each.
- The manifest was regenerated and the copies made again.

Verified on Node 26.13.1: `node --test` at the root, 75 pass. `--staged`, one record
added, in throwaway repositories:

| Task files at the base | 0.6.1 | as read the third time | now |
| --- | --- | --- | --- |
| 600 | 0.26 s | 4.30 s | 0.30 s |
| 5000 | 0.39 s | 35.40 s | 0.65 s |

`--branch` now takes 0.28 s at 600 and 0.62 s at 5000. The 19 tests of which sections
are the scene's pass under `core.autocrlf=true`, `color.ui=always`,
`diff.external=cat` and `diff.noprefix=true`.

Reviewed by: the same read-only subagent, third reading; its two findings were checked by the test and the timings above, not read a fourth time
