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

- [ ] script: a record inserted above an older record in one task file → the new record's text is compiled and the old one's is not
- [ ] script: a record appended after an older one → compiled as now
- [ ] script: the cases of "the release check and the compiler decide the same under the developer's git configuration" → unchanged
