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

- [ ] script: an Appendix J test with the case above passes `--pr`, and fails against the 0.5.5 script
- [ ] script: the same holds for two `## Review` sections with one heading
- [ ] script: a section the scene did add, without `Reviewed by:`, is still refused in all three modes
- [ ] script: all Appendix J tests pass
