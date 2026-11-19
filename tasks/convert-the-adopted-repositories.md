# Convert the repositories adopted before 0.6.0

## Context

Asked by Erez on 2026-11-19, in chat, after reading what 0.6.0 did.

Since 0.6.0 the scripts are files, the same in every repository, checked against a
manifest (`tasks/the-scripts-as-files.md`). The conversion of a repository adopted
earlier is runbook 5.5. It has been carried out once, on this repository, which was
adopted the same day and carried no local change. Every other repository under the
Unities still holds copies cut from the old listings, and one team repository carries a
local fix (`tasks/new-records-are-found-by-heading-text.md`). The manifest check fires
only when a scene touches a planted file (D23), so a repository that was never converted
says nothing.

Erez runs the conversion in the repositories; that is where the plugin runs and is
verified. This file is where the results come back to.

**Promise** — Every repository under the Unities runs the same gate as this one.

**Acceptance**

- [ ] the assignee: the repositories adopted before 0.6.0 are listed in this file, without the names of those that are not public
- [ ] the assignee: runbook 5.5 is carried out in each, and for each the version it was on, its local changes and what was decided for each change are written into this file
- [ ] the assignee: in each, the planted copies are compared with this repository's `manifest.json` and the result is written into this file
- [ ] the assignee: every local change that is brought to the plugin is a task file here before this task closes

## Decisions

### 2026-11-19 · The conversion is worked first

**Decision** — This task is worked ahead of the open tasks ordered by D7 and D35.
**Rejected** — Taking it after them.
**Why** — Erez runs it next, from Sunday 2026-11-22, when the team repository is at hand. Until the repositories are converted, each fix
to the gate reaches them by retyping, which is what 0.6.0 was made to end, and the only
proof that the conversion works is the plugin's own repository.
