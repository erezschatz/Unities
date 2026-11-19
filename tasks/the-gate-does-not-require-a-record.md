# The gate does not require a record

## Context

Found on 2026-11-19 by the reader, while the essay's second part was being cut
(`tasks/essay-part-two-and-licences.md`).

The gate asks that a task file changed, and checks the `## What was done` sections a
scene adds. It does not ask that one be added. A scene with source, test, doc and one
line added anywhere in a task file passes, in every mode. The essay of October 2026
named the missing check as a later tightening: look for an added `## What was done`
heading, so that "touched the task" becomes "recorded the scene". It was never built.
Runbook 4.11 states the limit.

To decide before building: in the adapted staging a branch may commit before its record
exists, so the check belongs to `--pr` there, and to `--staged` and `--branch` in strict.
A scene that only opens a task (context, promise, acceptance, no source change) must
still pass.

**Promise** — A change to source cannot land without a record of what was done.

**Acceptance**

- [ ] script: an Appendix J test in which a scene changes source and adds no `## What was done` is refused, strict at the commit and adapted at the pull request
- [ ] script: a scene that adds a task file and changes no source passes
- [ ] script: all Appendix J tests pass
