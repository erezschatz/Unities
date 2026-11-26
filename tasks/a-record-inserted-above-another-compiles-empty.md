# A record inserted above another compiles as an empty entry

## Context

Found on 2026-11-26 by the cold reader of `tasks/diffs-are-read-under-any-git-config.md`,
outside that scene's promise.

A task file holds one `## What was done` record, and a scene inserts a new record above
it. Git prints the change as the new record's text, then the added `## What was done`
heading, then the old record as context: the added heading comes after the new text. The
changelog compiler reads a section from the added heading on, so it collects only the
blank lines after it, and the changelog gets an entry with no text, only its "Recorded
in" line. The same on 0.6.18, under no git setting. The release check compares against
the same compiler, so it passes such a release.

**Promise** — Every record a scene adds reaches the changelog with its text, wherever in
the task file it was written.

**Acceptance**

- [x] script: a record inserted above an older record in one task file → the new record's text is compiled and the old one's is not
- [x] script: a record appended after an older one → compiled as now
- [x] script: the cases of "the release check and the compiler decide the same under the developer's git configuration" → unchanged

## Decisions

### 2026-11-26 · The compiler reads a commit's records from the file's two versions

**Decision** — `compile-changelog.mjs` no longer parses `git log -p`. For each commit since
the release and each task file it adds, changes or renames, it reads the file as the
commit holds it and as its parent held it (under the old name for a rename), splits each
into its `## ` sections, and takes the `## What was done` sections. The commit added as
many records as the file gained. Records are compared without trailing spaces on a line
or trailing blank lines, as the gate reads sections, and compiled as they were written. The new ones are among those the
parent did not hold so; where the commit also corrected old records, so that more differ
than were added, each corrected old record is paired with the record most like it, by
the share of their own words (not the heading, the `Reviewed by:` line or the
punctuation) that both have, the closest pairs first, and the records left over are the
new ones. A commit that only corrects a record adds none, as before.
**Rejected** — Patching the diff reader for a heading that comes after its text, which
any diff can line up with the old heading; the gate's half-the-words rule for
corrections, which answers whether one changed section is a correction, where the
compiler must pick the new ones among several; keeping the diff flags of the git-settings
decision for the compiler, which now reads no diff.
**Why** — A diff says which lines changed, not which record a line belongs to; the two
versions of the file say which records there are. It also takes the compiler out of the
reach of every diff setting. A commit that removes one record and adds another in the
same file gains none, so it adds none here; a record is not removed once written, and
the case is not built for. This replaces D97 for the compiler: the gate's release check
still reads its diff with D97's flags, and the compiler still prints file names
unquoted.
Supersedes: D97

### 2026-11-26 · 0.7.0

**Decision** — Ruled by the developer on 2026-11-26, in chat: "make it 0.7.0". The
plugin is 0.7.0, not 0.6.22. It is the first version after 0.6.21, which changed what an
adoption in the adapted staging is: the runbook states where the gate and the compile run
and what they must do, and builds nothing to run them. Every 0.6 version, this one
included, is taken by copying the new files and re-running the procedure; no repository
needs converting. The form is unchanged at 1.0.
**Rejected** — 0.6.22, leaving the change of 0.6.21 under a patch number; 0.8.0, for
which nothing here calls; renumbering 0.6.21, which is pushed.
**Why** — The minor number has marked a change in what an adoption is (0.6.0 shipped the
scripts as files); 0.6.21 was one, and this is the first version after it.

## What was done

`compile-changelog.mjs`: the `git log -p` reader is replaced. One `git log --name-status
-M` lists each commit's touched task files; the file is read at the commit and at its
parent, and the commit's records are those it gained, chosen as the decision says. The rename map and everything after it are unchanged; the diff flags are
gone from the compiler, and its `-c core.quotePath=false` stays, for the names in the
log. `docs/SPEC.md` says the compiler reads each task file as a commit and its parent
hold it.

Test: "a record is compiled with its text wherever in the task file it was written; a
correction is not a record": a record inserted above an older one, one appended after it,
one inserted above an older one corrected in the same commit, and a correction alone. On
0.6.21 it fails on the first. The git-settings test and every other compiler test pass
unchanged. Compiled over this repository's own history since `v0.5.5`, 61 records, the
new compiler's changelog is identical to 0.6.21's.

The plugin was 0.6.22 in this pass; the review below makes it 0.7.0. The masters were copied over the planted
copies. `node --test` at the root: 109 tests, 109 pass, and 109 of 109 under each of
`color.ui=always`, `diff.noprefix`, `diff.mnemonicPrefix`, `diff.external` and
`core.autocrlf=true` set globally.

This record describes the first pass; the record below says what the commit does.

Reviewed by: a read-only Claude subagent that had not seen the work, given
`docs/reviewer.md`; it re-ran the tests and the history comparison and probed the
compiler in throwaway repositories, in one probe setting and unsetting keys in the
developer's global git configuration and checking it was as before. Its three findings
are the review below, answered before commit.

## Review · 2026-11-26

The reader's findings, condensed by the agent that did the work. None changes what the
gate refuses; the release check compares with whatever the compiler prints.

### A record appended after the file's last record compiled the old record instead

**Found** — `git` output is trimmed, so the parent's last section ended without the blank
lines it has once a record follows it; it was not matched word for word, and likeness,
1.0 for both, kept the old one.

**Done when**

- [x] a record appended after the file's last record, its words all in that record → the new record's text is compiled and the old one's is not
- [x] a record appended after the file's last record, with no words (punctuation only) → the new record's text is compiled
- [x] a record appended after the file's last record, when the file ended with blank lines → the new record's text is compiled
- [x] a record appended with words of its own → compiled as now
- [x] a record inserted above an older one, with or without the older one corrected → compiled as now
- [x] a correction alone, including only trailing blanks or spaces changed → no record
- [x] this repository since `v0.5.5` → 61 records, identical to 0.6.21

**Not asked** — a change to the gate's corrections; delete-and-add in one file.

### The compiler started two git processes per task file per commit

**Found** — `git show` for each version made 2,000 commits take 21.4 s against 0.32 s.

**Done when**

- [x] a 2,000-commit history with a record in each commit → compiled in a time of the same order as 0.6.21
- [x] the same history → output identical

**Not asked** — caching between runs; a new dependency.

### The decision superseded D97 though D97 still governs the release check

**Found** — It ends `Supersedes: D97`, and says D97 still governs the release check.

**Done when**

- [x] `docs/DECISIONS.md` read cold → D97's flags for the release check read as in force, and its compiler part as replaced
- [x] the compiled `docs/PLAN.md` → unchanged

**Not asked** — a change to how `compile-record.mjs` reads `Supersedes:`.

## What was done

Answering the reading. `records` trims each section's trailing whitespace before it is
compared, so the parent's last record matches the same record with blank lines after it,
and a change to trailing blanks alone is no record. Every version the compiler needs is
read by one `git cat-file --batch` (`filesAt`), the parent of a root commit answered
"missing" and read as empty. The test adds an appended record whose words are all in the
last one, one with no words, one after a file that ended in blank lines, and a change to
trailing blanks alone; the first pass fails on the first of them. Over a throwaway
history of 2,000 commits, each appending a record, the compiler takes 0.75 s against
0.46 s for 0.6.21, with identical output; this repository since `v0.5.5` is still 61
identical records.

The decision keeps `Supersedes: D97`, as D87 supersedes D5 and D6 and D94 supersedes
D41–D43, each for part of what they said: the line points a reader of D97 here, and the
decision says D97's flags still govern the release check.

The plugin is 0.7.0, by the developer's ruling, recorded above: the runbook's first line,
`.claude-plugin/plugin.json`, the manifest (both copies) and SPEC's "as of".

Reviewed by: the same reader, on a second reading, every git command under a temporary
global configuration; it re-ran the suite, the history, the timing and its probes, found
every line above to hold but the first in one case, and found the three points below

## Review · 2026-11-26

### An appended record still lost when the record above it was touched

**Found** — Second reading. With the old last record given trailing spaces inside a line,
or corrected so it keeps or loses words, both it and the appended record scored 1.0 by
likeness, and the stable sort kept the old one.

**Done when**

- [x] old record changed only by trailing spaces inside a line, plus an appended record whose words are all in it → the new record's text is compiled and the old one's is not
- [x] old record corrected so it keeps or loses words, plus an appended record whose words are all in it → the new record's text is compiled
- [x] old record corrected with new words, plus an appended record → the new record's text is compiled
- [x] a record inserted above an older one, with or without the older one corrected → compiled as now
- [x] a correction alone → no record
- [x] this repository since `v0.5.5` → 61 records, identical to 0.6.21

**Not asked** — a change to the gate's corrections; delete-and-add in one file.

### The first record described a reader that no longer ships

**Found** — It said `git show` gives each version, and both records go into the 0.7.0
changelog.

**Done when**

- [x] the 0.7.0 changelog compiled from this commit → nothing in it says each version is read with `git show`
- [x] the second record → compiled with its text

**Not asked** — skipping a record labelled as a first pass.

### The fix for a task file whose name has a space was not recorded

**Found** — 0.6.21 titled `tasks/a b.md` as its name and a tab, since the name came from
the diff's header line; the new reader gives its `# ` title.

**Done when**

- [x] the record read cold → says a task file whose name has a space is now titled by its `# ` line
- [x] a task file whose name has no space → titled as now

**Not asked** — any other handling of file names.

## What was done

Answering the second reading. Records are compared with trailing spaces stripped from
every line as well as trailing blank lines, as the gate reads sections; likeness is now
the share of their own words two records both have, over the words either has; and where
a commit corrected old records, each is paired with the record most like it, the closest
pairs first, and the records left over are the new ones. The test adds an appended
record under a last record given trailing spaces, corrected losing a word, and corrected
gaining words; the second pass fails on the first of them, and 0.6.21 on the first case
of the test. The first record no longer names `git show`. A task file whose name has a
space is now titled by its `# ` line: 0.6.21 took the name from the diff's header, where
git ends a name with a space by a tab. This repository since `v0.5.5` is still 61
identical records.

Reviewed by: the same reader, on a third reading, every git command under a temporary
global configuration; it re-ran the suite, the history, the timing and its probes, found
every line of both reviews to hold, and found the point below

## Review · 2026-11-26

### Trailing spaces were stripped from the compiled text, not only the comparison

**Found** — Third reading. The trimmed records were also what was compiled, so a line's
two trailing spaces, a Markdown line break, were lost from the changelog.

**Done when**

- [x] a record with a line ending in two spaces → the changelog entry keeps them, as 0.6.21 did
- [x] a record with trailing spaces inside a line of the old one, plus an appended record → the new record compiled
- [x] this repository since `v0.5.5` → 61 records, identical to 0.6.21

**Not asked** — a change to the release check's trimming, or to the entry's format.

## What was done

Answering the third reading. Each record carries a key, trimmed as before, by which it is
matched and compared, and its text as written, from which it is compiled. The test adds a
record whose line ends in two spaces; the third pass fails on it. This repository since
`v0.5.5` is still 61 identical records. `node --test` at the root: 109 tests, 109 pass.

Reviewed by: the same reader, on a fourth reading, every git command under a temporary
global configuration; it re-ran the suite, the history and its probes and found every
line to hold.
