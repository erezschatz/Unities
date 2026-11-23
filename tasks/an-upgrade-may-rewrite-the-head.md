# An upgrade may rewrite the compiled files' head

## Context

Raised 2026-11-23 by Mandy's session, while upgrading Mandy to 0.6.8, in
`~/dev/erez/mandy/tasks/unities-plugin-asks.md` (its second ask). The gate refuses any
edit above the marker in `docs/DECISIONS.md` and `docs/PLAN.md` and says to change the
head through a new decision, but nothing in a decision reaches the head. Mandy's
`docs/PLAN.md` head still says a task is done when its last record carries
`Status: done`, which stopped being true at 0.6.8. Mandy asked for a way to edit the head
that the gate accepts.

Erez, the same day, in chat: the ask is an attempt "to keep what was over what is, and
the whole point of this plugin is to replace what was with what is. If this causes
issues with existing files, replace the files."

The runbook (4.7, *Shared files*) already says the scene that installs this, "a new
project's first, an adoption, an upgrade", is not held to the head rule. The gate holds
an upgrade to it: a file counts as compiled when its version at the scene's base carries
the marker, and at an upgrade it already does. So the upgrade cannot replace a stale
head, and the only way round is a commit that deletes the file and a later one that
writes it again.

**Promise** — When a repository takes a new version, a head that the new version makes
wrong is replaced in the same upgrade.

**Acceptance**

- [ ] script: a scene that installs a new version of the procedure may change the head of either compiled file, and the gate passes it
- [ ] script: any other scene that changes the head is refused, as before
- [ ] the assignee: the runbook says how an upgrade checks the head against the new version and replaces what is stale, and 4.7 says the same as the gate
- [ ] script: `node --test` at the root passes with the manifest at the new version

## Decisions

### 2026-11-23 · No door for hand edits to the head; the upgrade replaces it

**Decision** — The head of a compiled file stays closed to ordinary scenes. A stale head
is replaced by the scene that installs a new version, as 4.7 already says.
**Rejected** — Mandy's ask for a scene that touches only the head and a task file whose
decision explains it, which keeps the old head and patches it by hand.
**Why** — Erez: the plugin replaces what was with what is; where that leaves an existing
file wrong, the file is replaced.
