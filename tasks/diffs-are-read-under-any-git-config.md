# The release check and the changelog compiler read diffs under any git configuration

## Context

Found on 2026-11-19 by the cold reader of `tasks/new-records-are-found-by-heading-text.md`,
outside that scene's diff; the same on 0.6.1.

The gate's release check (`git diff <base> HEAD -- CHANGELOG.md`) and
`compile-changelog.mjs` (`git log -p`, looking for `+++ b/`) read git's output as git
prints it by default. Run with `GIT_CONFIG_GLOBAL` pointing at each of these, tests fail:

- `color.ui=always`: "a release pull request whose changelog equals the compiler's output
  passes" and "the compiler leaves the Reviewed by line out of the changelog";
- `diff.noprefix=true`: the same two;
- `diff.external`: the release test, and "a pull request editing the compiled changelog by
  hand is refused" (found on 2026-11-19 in the same scene, the same on 0.6.1);
- `core.autocrlf=true`: "the compile after a merge…".

Both also drop every `+++` line, including a changelog or record line that begins with
`++`.

**Promise** — A developer's own git configuration never changes what the gate or the
compiler decides.

**Acceptance**

- [x] script: the release-PR test and the compiler tests pass under `color.ui=always`, `diff.noprefix`, `diff.mnemonicPrefix` and `diff.external`
- [x] script: a changelog entry with a line beginning `++` is compared and compiled, not dropped
- [x] script: "the compile after a merge…" passes under `core.autocrlf=true`
- [x] script: the same suites with no special configuration pass unchanged

## Decisions

### 2026-11-20 · Not admitted: the release check and the compiler under unusual git configuration

**Decision** — Not built. The gate and `compile-changelog.mjs` keep reading git's output
as git prints it by default. Erez ruled: it is handled when it comes to be an issue.
This task stays open and is not worked until then.
**Rejected** — Building it now, on the reader's constructed configurations.
**Why** — None of the four configurations has met the gate in a repository (D41). The
one to watch is `core.autocrlf=true`, the default of Git for Windows, wherever the gate
runs outside WSL.

### 2026-11-26 · The release check and the compiler print git's diffs as git does by default

**Decision** — Ruled by the developer on 2026-11-26, in chat: "ignore git settings", then,
asked whether that meant building it in place of the ruling above, "Yes, build it". The
gate's release check and `compile-changelog.mjs` call `git diff` and `git log -p` with
`--no-color --no-ext-diff --no-textconv --src-prefix=a/ --dst-prefix=b/ --unified=3
--inter-hunk-context=0 --diff-algorithm=myers`, and the compiler with `--find-renames`
too. The compiler runs git with `-c core.quotePath=false`, so a task file whose name has
a non-ASCII character has its record compiled under that name; the gate does not, since
how it matches such a name against the roles is not a developer's setting (the review
below). A file's header ends at its first `@@`, so an added line
that begins `++` is content, and a line is tested for `+` before it is trimmed. In the
compiler, a `## ` heading that reaches a hunk as context ends the section above it, as an
added one does. These cover the settings named here and in the review below; a git
setting that changes the diff in some other way is not covered by name.
**Rejected** — Clearing the developer's configuration for every git call
(`GIT_CONFIG_GLOBAL`), which reaches settings the scripts never read and misses a
repository's own; overriding the diff settings by name with `-c`, which a more specific
key such as `color.diff` outranks (`core.quotePath` has no more specific key, so it is
set with `-c`); `core.quotePath=false` on every git call the gate makes, which changed what
the gate refuses for any non-ASCII file name; `--unified=0`, under which an unchanged blank line inside a new record
splits it into two hunks; keeping the ruling above until one of these configurations
meets the gate.
**Why** — A developer's own git settings are theirs to choose, and the record they keep
is the same whatever git prints; the flags are the plain form of each diff, and command
line flags outrank every level of configuration.
Supersedes: D45

### 2026-11-26 · Left unchecked: the gate does not match a file name git quotes against the roles

**Decision** — Not built. With `core.quotePath` on, as git ships it, the gate reads a file
whose name has a non-ASCII character as a quoted, escaped name that no role's pattern
matches: a scene whose only task file has such a name is refused as having no task
change, and a source file with such a name is held to nothing. An unread record in such
a task file, beside a read one in another, passes the gate; since this change the
compiler reads the name, so that unread record is also compiled into the changelog,
where on 0.6.18 it was dropped.
**Rejected** — Running every git call of the gate with `-c core.quotePath=false`, built and
taken back in this scene, which changes what the gate refuses in every mode.
**Why** — It is not a developer's setting, so the ruling above does not reach it, and it
has not happened in a repository. The developer has not ruled. What Claude would rule:
left unchecked.

### 2026-11-26 · A record inserted above another becomes a task

**Decision** — The second reading's case of a record inserted above an older one, which
compiles as an empty entry, is `tasks/a-record-inserted-above-another-compiles-empty.md`.
**Rejected** — Fixing it in this scene.
**Why** — It happens with no git setting, on 0.6.18 too, so it is outside this task's
promise, and it needs its own record.

## What was done

`check-unit.mjs`: the release check's `git diff <base> HEAD -- CHANGELOG.md` runs with the
five flags of the decision, and its added lines are read from the first `@@` on.
`compile-changelog.mjs`: its `git log -p` takes the same flags; a file's header runs from
`diff --git` to the first `@@`, `+++ b/` is read only there, and every added line after it
is content. `docs/SPEC.md` says the release check and the compiler read git's diffs the
same whatever the developer's git configuration does to how they print.

Test: "the release check and the compiler decide the same under the developer's git
configuration" builds a release under no setting and under each of `color.ui=always`,
`color.diff=always`, `diff.noprefix=true`, `diff.mnemonicPrefix=true` and a
`diff.external` program, set in the throwaway repository's own configuration, with a
record line that begins `++`. It compiles the changelog, checks the line is kept and the
`Reviewed by:` line left out, and runs the release check. Against the 0.6.18 scripts it
fails on the `++` line with no setting.

The whole suite was also run with `GIT_CONFIG_GLOBAL` set to each of `color.ui=always`,
`diff.noprefix=true`, `diff.mnemonicPrefix=true`, `diff.external` and
`core.autocrlf=true`. On 0.6.18, 5, 5, 0, 2 and 0 tests failed; on this change, 107 of
107 pass under each, and with no setting. `core.autocrlf=true` already passed: the CRLF
reading of 0.6.5 covers "the compile after a merge…". So do the four review lines in
`tasks/new-records-are-found-by-heading-text.md` that point here, now ticked.

The plugin is 0.6.19: the runbook's first line, `.claude-plugin/plugin.json`, the
manifest (both copies) and SPEC's "as of". The masters were copied over the planted
copies here. `node --test` at the root: 107 tests, 107 pass.

This record describes the first pass. What it says of the flags and of SPEC's sentence is
replaced by the records below, which say what this commit does.

Reviewed by: a read-only subagent that had not seen the work, given `docs/reviewer.md`;
it ran the suite on 0.6.18 and on this change under each git setting, and reproduced the
four findings below in throwaway repositories. They are answered before commit.

## Review · 2026-11-26

The reader's findings, condensed by the agent that did the work. A and B are cases of
this task's promise, so they are answered under the developer's ruling above; C and D
are about the record.

### A correct release is refused under diff.context

**Found** — The release check trimmed each diff line before testing it for `+`, so a
context line from an older release that begins `+ ` was read as added; a wider context
(`diff.context`, `diff.interHunkContext`) reaches such a line.

**Done when**

- [x] a correct release, an older entry with a line beginning `+`, `diff.context=10` → passes
- [x] the same under `diff.interHunkContext=10` → passes
- [x] the same with no setting → passes
- [x] a hand-added line in the new section, under any setting of the test → refused
- [x] the five settings of the first decision → unchanged

**Not asked** — a change to the changelog format, or to how a release is recognised.

### Settings the five flags did not pin changed what the compiler wrote

**Found** — `diff.renames=false` made a renamed task file new, compiling its released
record again; a wider context, or a gap of six lines or fewer, let a box ticked in an
unchanged section join the record above it; `core.quotePath`, on by default, quoted a
non-ASCII file name and dropped its record; another `diff.algorithm` may draw the hunks
differently.

**Done when**

- [x] a renamed task file with a new record, `diff.renames=false` → only the new record compiled
- [x] the same with no setting → only the new record compiled
- [x] a record above an unchanged section whose box the scene ticks, under `diff.context=10`, `diff.interHunkContext=10`, or no setting → the tick is not in the record
- [x] a record in a task file whose name has a non-ASCII character, with no setting and under `core.quotePath=true` → compiled, under the file's name
- [x] `diff.algorithm=patience` → the same changelog as with no setting
- [x] the five settings of the first decision, and a `++` line → unchanged

**Not asked** — clearing the developer's configuration for every git call; a rule on
task-file names.

### SPEC and the decision claimed more than the flags do

**Found** — SPEC, the comments and the decision said the diffs read the same whatever
the configuration does; A and B were settings they did not cover.

**Done when**

- [x] SPEC's line → names what is set back to git's default
- [x] the comments in both scripts and the decision → say no more than the flags do, and the decision says a setting not named is not covered

**Not asked** — a list of every git setting.

### The new refusal of a hand-added ++ line was neither recorded nor tested

**Found** — 0.6.18 dropped every `+++…` line, so a hand-added line beginning `++` in a
release passed; this change refuses it, and nothing said or tested that.

**Done when**

- [x] a release whose changelog carries a hand-added line beginning `++` → refused, and a test says so
- [x] the record → names that refusal

**Not asked** — any other check on hand edits.

## What was done

Answering the reading. The release check reads the diff untrimmed when it tests a line
for `+`, and adds `--unified=3 --inter-hunk-context=0 --diff-algorithm=myers`. The
compiler adds the same three and `--find-renames`, and ends a section at a `## ` heading
that reaches it as context. Both run git with `-c core.quotePath=false`; in the gate that
also keeps a non-ASCII task file's name matching the task role (taken back in the gate by
the second reading, below). The gate now refuses a
release whose changelog carries a hand-added line beginning `++`, which 0.6.18 let
through. SPEC, the comments and the decision say what is set back to git's default, and
the decision that a setting not named is not covered.

The test now runs under eleven settings: none, the five of the first record, and
`diff.context=10`, `diff.interHunkContext=10`, `diff.renames=false`,
`diff.algorithm=patience` and `core.quotePath=true`. Its repository has an older release
whose entry has lines beginning `+ `, and a released task file that the scene renames to
`tasks/1-renamed-café.md`, adds a record to above its review, and ticks the review's box
well below it. It checks that only the new record is compiled, with its `++` line and
without the old record, the `Reviewed by:` line or the tick, that the release passes,
and that a hand-added `++` line is then refused. Against 0.6.18 and against the first
pass of this scene it fails with no setting, on the non-ASCII name; each other case was
reproduced by the reader.

Manifest regenerated and the masters copied over the planted copies again. `node --test`
at the root: 107 tests, 107 pass, and 107 of 107 under each of the five global settings
of the first record.

Reviewed by: the same reader, on a second reading; it ran the suite and the extended
test under nine more git settings and the gate and the compiler in throwaway
repositories, found every line of the review above to hold, and found the three points
below

## Review · 2026-11-26

The second reading's findings, condensed by the agent that did the work.

### core.quotePath=false changed the whole gate

**Found** — The second pass ran every git call of the gate with `-c core.quotePath=false`,
so the gate began to refuse a source file with a non-ASCII name and no other change, and
to read an unread record in a non-ASCII task file, and began to pass a scene whose only
task file has such a name. `core.quotePath` is on by default, not a developer's setting,
so the ruling does not reach it.

**Done when**

- [x] any file name with a non-ASCII character, in every mode of the gate → the gate is unchanged, under "Left unchecked: the gate does not match a file name git quotes against the roles"
- [x] ASCII names, in every mode → unchanged
- [x] the release check and the compiler with a non-ASCII task file → as the first review says

**Not asked** — a rule on file names; unquoting names some other way.

### A record inserted above an older one compiles as an empty entry

**Found** — With a new record inserted above an older one in the same task file, git
prints the new text before the added heading, and the compiler keeps only the blank lines
after it. The same on 0.6.18 and under no setting, so it is outside this task's promise.

**Done when**

- [x] the case → a task file of its own, `tasks/a-record-inserted-above-another-compiles-empty.md`
- [x] the compiler in this scene → unchanged for it

**Not asked** — a rule about where a record goes.

### The first record no longer described the diff

**Found** — The first record named five flags and SPEC's first sentence; the commit has
more flags and another sentence.

**Done when**

- [x] the first record → says it describes the first pass and that the records below replace it

**Not asked** — rewriting the review.

## What was done

Answering the second reading. The gate's `git()` and `gitOk()` are as on 0.6.18; only
the compiler runs git with `-c core.quotePath=false`. SPEC and the first decision say so,
and the decision rejects the gate-wide flag. The gate's handling of a non-ASCII file name
is left unchecked, in a decision above. The empty-entry case is a task file of its own.
The first record says it describes the first pass. The extended test still passes, since
its release scene touches only `CHANGELOG.md` and the compiler reads the renamed file.
Manifest regenerated and the masters copied over the planted copies. `node --test` at the
root: 107 tests, 107 pass.

Reviewed by: the same reader, on a third reading; it ran the suite, the extended test
under nine more settings and the gate's non-ASCII cases against 0.6.18, found every line
of the second review to hold, and found the point below

## Review · 2026-11-26

### The left-unchecked decision left out an unread record that is now compiled

**Found** — Third reading. An unread record in a non-ASCII task file, beside a read one,
passes the gate; the compiler now reads that file's name, so the record is compiled,
where 0.6.18 dropped it. The decision named neither.

**Done when**

- [x] the decision → names the unread record in a non-ASCII task file, which passes the gate and is compiled into the changelog
- [x] the gate and the compiler → unchanged

**Not asked** — matching quoted names in the gate; leaving that record out of the changelog.

## What was done

Answering the third reading. The left-unchecked decision names the unread record in a
non-ASCII task file: it passes the gate and, since this change, is compiled into the
changelog. Nothing else changed.

Reviewed by: the same reader, on a fourth reading; it checked the decision's new sentence
and this record against the staged diff, and that the gate, the compiler and the test
were unchanged, with 107 of 107 passing.
