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

- [ ] script: a task file with CRLF line endings compiles to the same `docs/DECISIONS.md`, `docs/PLAN.md` and changelog entry as the same file with LF
- [ ] script: the same for a task file that begins with a byte-order mark
- [ ] script: the gate's checks of a task file (acceptance boxes, records, review items) give the same result for the CRLF and BOM forms as for LF
- [ ] the assignee: the team repository's local fix is compared with this one before its conversion is re-run, and any case it handles that this does not is written into this file
