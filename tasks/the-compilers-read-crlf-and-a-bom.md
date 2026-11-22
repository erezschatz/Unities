# The compilers read a task file the same with CRLF, or with a BOM

## Context

Brought by Erez on 2026-11-22, from the same session as
`tasks/the-plan-can-be-switched-off.md`; he holds that repository's upgrade for this too.

On 2026-11-17 that repository fixed its own copies so that a Windows checkout, where task
files arrive with CRLF line endings and may begin with a byte-order mark, is read as an
LF one is. The session reports that the master's two compilers have none of that
handling and the master's gate only part of it (it normalises line endings where it
compares sections and where it hashes a planted script), and that dropping the local fix
brings back a fault that repository has met: the gate misreads task files that are fine.
The local fix has not been seen here.

This is not the finding ruled on in D45. That one is about git's output under unusual
configuration and was constructed by a reader; this is about the bytes of a task file,
and it happened.

**Promise** — A developer on a Windows checkout gets the same answer from the gate and
the compilers as one on Linux.

**Acceptance**

- [x] script: a task file with CRLF line endings compiles to the same `docs/DECISIONS.md`, `docs/PLAN.md` and changelog entry as the same file with LF
- [x] script: the same for a task file that begins with a byte-order mark
- [x] script: the gate's checks of a task file (acceptance boxes, records, review items) give the same result for the CRLF and BOM forms as for LF
- [x] the assignee: the team repository's local fix is compared with this one before its conversion is re-run, and any case it handles that this does not is written into this file

## Decisions

### 2026-11-22 · One function in each script, and every file is read through it

**Decision** — Each of the three scripts has one function that drops a leading
byte-order mark and turns CRLF into LF, and reads every file through it: task files,
the compiled files, `CHANGELOG.md`, and what `git show` returns for the scene and for
its base. The changelog compiler does the same to each added line it takes from
`git log -p`. This is the team repository's fix of 2026-11-17, taken from the patch
against the 0.6.4 masters that its session wrote out on 2026-11-22 and Erez brought
here. Its tests were not in the patch; the tests here were written for this change.
**Rejected** — Normalising only where a pattern was seen to fail; a `.gitattributes`
rule in every repository instead, which fixes line endings and not the byte-order mark,
and which a planted script cannot check.
**Why** — It happened: on a Windows checkout a line such as `- [ ] box` ends in a
carriage return, and none of the gate's patterns that end in `(.+)$` match it, so
acceptance boxes and review items went unread.

### 2026-11-22 · The configuration and the manifest are read the same way

**Decision** — Beyond that patch, the gate's configuration is read through the same
function in all three scripts, and so is the manifest, since the gate reads it as it
reads any file of the scene.
**Rejected** — Leaving `JSON.parse` on the raw bytes, as the patch did.
**Why** — `JSON.parse` refuses a byte-order mark. The same editor that puts one on a
task file puts one on `unities.json`, and the gate would then stop on a configuration
that is fine. This case was not met in that repository; it is included because every
read going through one function is the fix's own shape, and leaving one read out is the
exception that would need explaining.

### 2026-11-22 · What follows from it, accepted

**Decision** — Three consequences stand. A planted script that differs from the master
only by a byte-order mark passes the manifest check, as one that differs only by CRLF
already did (D23). `compile-record.mjs --check` takes a compiled file checked out with
CRLF as up to date. `compile-changelog.mjs` writes `CHANGELOG.md` back with LF.
**Rejected** — Keeping the byte-order mark in the hash; writing files back in the line
endings they were read in.
**Why** — None of these is content. What git checks out or commits for line endings is
the repository's own setting, and the scripts no longer depend on it.

## What was done

`compile-record.mjs` reads every file through `read`, `compile-changelog.mjs` through
`lf` (and strips a byte-order mark and a trailing carriage return from each added line
of the log), and `check-unit.mjs` through `lf` in `contents()` and `show()` and where it
reads its configuration. Four tests were added: a task file in CRLF, with a byte-order
mark, and with both compiles to the same decisions and plan as in LF; compiled files
checked out with CRLF pass `--check`; a record committed in each form compiles to the
same changelog entry; and the gate at a pull request gives the same status and the same
messages in each form for five task files (an outcome box, a read record, an unread
one, an open review item, a review item without its parts).

Compared with the team repository's patch, hunk by hunk: every change in it is here.
Nothing it handles is left out; the second decision above is the one thing added. The
patch left out that repository's own tests, so they were not compared.

Runbook Appendix A says the gate and the compilers read CRLF and a byte-order mark as
not there; `docs/SPEC.md` says the same. The version, the manifests and the planted
copies are as recorded in `tasks/the-plan-can-be-switched-off.md`, the same scene.

`node --test` at the root: 84 tests, 84 pass; the four tests fail against the 0.6.4
scripts. Node 22.23.5, on Linux; nothing here was run on Windows.

Reviewed by: a read-only subagent that had not seen the work (first reading; its finding on this task is the review below)

## Review · 2026-11-22

The reader's finding on this task, condensed by the agent that did the work.

### The base's task files were not read through the function

**Found** — `baseSections()` reads every task file at the scene's base with
`git cat-file` and hands it to `sectionsOf`, which removed CRLF and not a byte-order
mark, while the scene's side now had it removed. The first decision and Appendix A said
every file is read through the function. A base file that begins with a byte-order mark
directly followed by a `## ` heading had that section taken for the scene's, which the
0.6.4 gate did not do.

**Done when**

- [x] the first decision and Appendix A → true of the code: the base's task files go through the function too
- [x] a base task file beginning with a byte-order mark and a `## ` section, touched by a later scene → judged as 0.6.4 judged it
- [x] a task file beginning with a byte-order mark and `# title`, at the base and in the scene → sections compare equal
- [x] a CRLF task file at the base, LF in the scene → sections compare equal

**Not asked** — a new check; normalising anything but line endings and the byte-order mark.

## What was done

Answering the reading. `sectionsOf` in `check-unit.mjs` now uses `lf`, so a task file is
read the same from the base as from the scene, and the difference this change had
introduced between the two sides is gone. No test was added for the reader's case; the
existing test of CRLF at the base still passes. Appendix A now lists what is read
through the function.

Reviewed by: the same reader, which ran these corrections in throwaway repositories
