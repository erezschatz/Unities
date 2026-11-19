# The form has its own version

## Context

Proposed by Claude on 2026-11-19, in chat, and agreed by Erez the same day.

One version number carries two things: the form (the runbook's §0 and the essay: place,
time, action) and the tooling that checks it (the gate, the compilers, the bindings).
The number went from 0.2.0 on 2026-11-07 to 0.6.2 on 2026-11-19, and nearly every step
was a change to the tooling. To someone learning the Unities each of those reads as the
Unities having changed. Erez's team is learning them now.

To decide before anything is written: which text is the form (§0 alone, or the essay
too); what counts as a change to it, since review rounds and the compiled record entered
§0 in November; whether the form is 1.0 as it stands; and where its version is written.
The essay is Erez's.

**Promise** — Someone who has learned the Unities does not have to learn them again
because the gate changed.

**Acceptance**

- [x] the assignee: which text is the form, its version, and what counts as a change to it are recorded under `## Decisions` in this file
- [x] the assignee: the runbook's §0 and the README state the form's version apart from the plugin's, and a fresh session asked "did the form change in the last version?" answers from the repository alone

## Decisions

### 2026-11-19 · The form is four statements quoted from the essay

**Decision** — The form is the principle and one statement for each unity, in the
essay's words: "the work, its record and its location are the same thing at the same
time"; "Everything the work consists of lives in the repository as files"; "The record
of the work and the work itself happen in the same moment", with its corollary that a
change without its record is a scene that did not happen; "there is one record, and
anything else is derived from it, never kept in parallel", and "the check belongs in the
same gesture as the writing". The rest of the essay explains them and shows them in
practice. A staging says how much of the form a repository holds to and is not part of
it. Everything else the plugin ships is tooling. Erez chose the essay's statement over
the runbook's, and then these four statements when the first reading showed that "the
essay" was not precise enough.
**Rejected** — The runbook's §0 as the form, which names tooling and so would move with
it; the essay and §0 together, two texts to keep in step; the essay as a whole, which
names git, commits, pull requests and the gate as its examples; the same four statements
without the check, leaving the cold reading to the tooling.
**Why** — What is held still has to be sentences that no change to a script can reach.
These name the repository and nothing else. That a check happens in the same gesture is
in the form; who reads, and the `Reviewed by:` line, are how the tooling does it.

### 2026-11-19 · The form is 1.0 as it stands today

**Decision** — The form is at version 1.0, dated 2026-11-19, first numbered in plugin
0.6.3. The plugin keeps its own number and its 0.6 line. Erez chose this.
**Rejected** — 1.0 dated to the essay (14 October 2026), which would claim the essay
stood still since, when it was edited in three commits on 2026-11-19; a number below 1.0
until the team has worked with it.
**Why** — The team is learning it now, and what they learn should be something that has
a number and stays.

### 2026-11-19 · What changes the form, and where it is written

**Decision** — A change to the form is a change to one of the four statements. It is
made only by a decision that names the new form version, in a task Erez opened for it.
The form is read, with its version, in the runbook's §0; the README states the version
and points there, and `docs/SPEC.md` holds the rule. §0 names the essay the statements
are quoted from by its public URL. Beside the form's version stands the plugin version
it arrived in. The essay is not touched in this scene.
**Rejected** — Writing the version into the essay here, which is Erez's and is changed
only when he asks; pointing §0 at the essay alone, or at it by a path in the plugin's
repository, neither of which a repository that adopted the Unities can open; a version file of its own, a third place to read; a date alone
beside the version, which cannot tell two plugin versions of one day apart; letting any
scene that finds the form wanting change it.
**Why** — §0 is what travels to every repository with the runbook, so the form can be
read where the work is done. The plugin version beside it answers "did the form change
in this version?" from the file alone. Whether the essay carries the number too is
Erez's to say.

## What was done

The form now has a version of its own, 1.0, dated 2026-11-19. The README states it
under the three unities and says what it is apart from the plugin's number. The
runbook's §0 says the same to the agent carrying it out, names the essay as where the
form is stated, and says that what §0 names beyond it is tooling. `docs/SPEC.md` gains
*The form's version*: what the form is, what counts as a change to it and how one is
made. `CLAUDE.md` gains the code rule. The essay was not changed.

Because the runbook changed, the plugin is 0.6.3 (the runbook's first line,
`plugin.json`, both manifests; the scripts' hashes are the same).

`node --test` at the root: 75 tests, 75 pass, on Node 22.23.5 (the shell this was run from, not Erez's Node 26).

The second acceptance box was checked by a session that had seen nothing of this work
and was given the repository only: asked "did the form change in the last version?", it
answered no: 0.6.3 gave the form a number and changed nothing in it, and 0.6.2 changed
only the gate. It also said what muddied the answer; that is in the review below.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

Written by the first reader, a read-only subagent that had not seen the work, and by the
fresh session of the second acceptance box. The decisions above were rewritten in answer,
before the commit; what they said first is in each item.

### The essay does name tools

**Found** — The first decision said "The essay's Part I names no tools (D11), so nothing
done to the gate can reach it", and `docs/SPEC.md` said the form is the unities "as the
essay states them, with no tools named". The essay has no Part I any more, and it names
`git diff`, a commit, the pull request, the gate, `CHANGELOG.md` and, in its closing
line, git, Node and Claude Code.

**Done when**

- [x] a reader opens `docs/the-unities.md` after reading the first decision → the decision says which sentences of the essay are the form, and none of them names a tool
- [x] a reader looks for "Part I" in the essay → no record written in this scene sends them to it
- [x] `docs/SPEC.md`, the Scope line on the essay and *The form's version* → say the same thing about tools in the essay, and it is true of the file
- [x] D11 → unchanged

**Not asked** — any edit to `docs/the-unities.md`; rewriting D11.

### What the form contains was said three ways

**Found** — The first decision said the form is the unities as the essay states them;
the second counted the cold reading and the compiled decisions as part of the form; the
essay's unit has no review and its derived documents are the changelog and the board.
The stagings were called tooling in the first decision and in SPEC, left out of §0's
list, and the essay says the adapted staging gives up part of the unity of time.

**Done when**

- [x] "is a check in the same gesture as the writing part of form 1.0?" → yes, from §0, and SPEC, the README and the decisions point there or say the same
- [x] "is a cold reading by a reader who did not write the change, named on a `Reviewed by:` line, part of form 1.0?" → no, it is how the tooling does the check, from §0 and the first decision
- [x] "are compiled decisions part of form 1.0?" → the form says one record with everything else derived; that decisions are among what is derived is tooling
- [x] "is the adapted staging part of the form, or tooling?" → neither: it says how much of the form is held to, and nothing written here contradicts the essay on what it gives up
- [x] the lists of what is tooling → no two lists to disagree: §0, SPEC and the first decision each say "everything else", and `CLAUDE.md` lists nothing

**Not asked** — an edit to the essay; a new form version; a change to what the gate checks.

### §0 pointed to a text an adopting repository does not have

**Found** — §0 said the form is "as the essay *The Unities* states them
(`docs/the-unities.md` in the plugin's repository)". A deployment holds no essay.

**Done when**

- [x] a session in an adopting repository, with only its `docs/UNITIES.md`, asked "what is the form at 1.0?" → answers from §0
- [x] the same session in the plugin's repository → answers from §0
- [x] the form is read in one place → §0; the README and SPEC point to it and hold no full copy

**Not asked** — planting the essay in every repository; a version file of its own.

### Nothing tied a form version to the plugin version it arrived in

**Found** — The form's version carried a date, and the plugin moved five times on that
date. The fresh session answered the second acceptance box's question, and said the
answer for 0.6.3 itself could be read two ways: the form was given a number in it, and
nothing in it changed.

**Done when**

- [x] a fresh session at 0.6.3 asked "did the form change in the last version?" → no: §0 says it was first numbered in 0.6.3 and nothing in it changed then
- [x] the same question at a later plugin version that leaves the form alone → no, from §0's "since plugin 0.6.3" against the file's first line, without reading history
- [x] the same question at a plugin version that moves the form → yes; SPEC requires §0 and the README to name that plugin version, and the decision names the form version
- [x] the same question in an adopting repository with only `docs/UNITIES.md` → answered from §0 and the first line

**Not asked** — a form changelog; a third place carrying the number.

### The record's list of version places, and the acceptance boxes

**Found** — The record listed where 0.6.3 is written and left out `docs/SPEC.md` ("as of
0.6.3"). Both acceptance boxes were open while the record said the second was checked
and `docs/PLAN.md` said done.

**Done when**

- [x] every file the diff changes to carry 0.6.3 → named in the record below
- [x] an acceptance box the record says was checked → reads `[x]`
- [x] the gate's handling of this task file → unchanged

**Not asked** — a gate rule on acceptance boxes.

## What was done

Answering the first reading. The form is now four statements quoted from the essay, and
they are written out with the version in the runbook's §0, which every repository under
the Unities holds; the README states the version and points there, and `docs/SPEC.md`
holds the rule and no second copy. Beside the version stands the plugin version the form
arrived in ("since plugin 0.6.3, when it was first numbered; nothing in it changed
then"), so the second acceptance box's question is answered from §0 and the file's first
line. §0 and SPEC no longer list what is tooling; each says everything beyond the four
statements is, and that a staging is neither. `CLAUDE.md` says only that no change to
the tooling changes the form, and points to SPEC. SPEC's Scope line on the
essay no longer says it names no tools. The three decisions were rewritten before the
commit: the first names the statements, the second no longer says the form moved in
November, the third puts the statements in §0 and adds the plugin version.

0.6.3 is written in the runbook's first line, `.claude-plugin/plugin.json`, both
manifests and `docs/SPEC.md` ("as of 0.6.3"). No script changed. The essay was not
changed.

`node --test` at the root: 75 tests, 75 pass, on Node 22.23.5.

Reviewed by: a second read-only subagent that had not seen the work (second reading; its findings are the review below)

## Review · 2026-11-19 · second reading

Written by the second reader. It checked every *Done when* line of the first review
against the working tree; all held but the two it names here.

### The record said CLAUDE.md states what is tooling and what a staging is

**Found** — The record above and one box of the first review said `CLAUDE.md` says
everything beyond the four statements is tooling and that a staging is neither.
`CLAUDE.md` says only "No change to the tooling changes it".

**Done when**

- [x] the record's sentence about `CLAUDE.md` → says what `CLAUDE.md` says
- [x] §0, SPEC and the first decision → unchanged, each says "everything else" and that a staging is not part of the form
- [x] the first review's box naming `CLAUDE.md` → true of the file as it stands

**Not asked** — a list of tooling in `CLAUDE.md`; a second copy of the rule there.

### "Nowhere else" was not true of the repository

**Found** — The third decision and SPEC said the statements are written out in §0 "and
nowhere else". The first decision quotes them in full, and the README carries two.

**Done when**

- [x] a grep for "never kept in parallel" outside the essay → what the third decision and SPEC say about where the form is read is true of what it finds
- [x] "where do I read the form at 1.0?" → §0
- [x] the README and SPEC → point to §0 and hold no full copy

**Not asked** — removing the quotations from the first decision; an edit to the essay.

### §0 carries the essay's public URL, and no record said so

**Found** — §0 names the essay by its URL on GitHub, where the first draft named a path
in the plugin's repository. Every deployment now points at that host, repository and
branch. Neither record nor decision mentioned it.

**Done when**

- [x] a reader of the record → finds that §0 names the essay by its public URL
- [x] a reader of `## Decisions` → finds the URL in the third decision, with the path it replaced among what was rejected
- [x] §0's four statements and the version line → unchanged

**Not asked** — planting the essay in adopting repositories; removing the link.

## What was done

Answering the second reading; only wording changed. The record above now says of
`CLAUDE.md` what `CLAUDE.md` says. The third decision and SPEC say the form is read in
§0 and no longer that it is written nowhere else. The third decision says §0 names the
essay by its public URL (`https://github.com/erezschatz/Unities/blob/main/docs/the-unities.md`),
and rejects the path in the plugin's repository that the first draft used. Two boxes of
the first review were reworded to match. §0, the README and `CLAUDE.md` did not change
in this round.

Reviewed by: the second reader, which read these corrections against the working tree
