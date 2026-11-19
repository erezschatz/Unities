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

- [ ] script: a scene that adds a record to a task file whose older Context holds a box the current rule refuses, and leaves the box alone, gets no acceptance message
- [ ] script: a box the scene adds or edits, ticking included, that the rule refuses, is refused as now
- [ ] script: a new task file with such a box is refused as now
