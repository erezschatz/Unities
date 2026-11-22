# A repository that compiles no plan can say so

## Context

Brought by Erez on 2026-11-22, from the Claude Code session that was to convert a team
repository from 0.5.2 to 0.6.4 (runbook 5.5, `tasks/convert-the-adopted-repositories.md`).
The session stopped before writing anything, and Erez chose to hold that repository's
upgrade until the plugin has this.

That repository has no `docs/PLAN.md`, by a decision of its own, and a later decision
there rejected compiling one. Its copy of `compile-record.mjs` switches the plan off
with a local `PLAN = null`. Since 0.6.0 a planted script is not edited, and the master
has no setting for it: copied as it is, the compiler writes `docs/PLAN.md`, and its
`--check` fails while the file is missing. The gate also counts `docs/PLAN.md` among the
compiled files. The local change has not been seen here; only the session's report of it.

**Promise** — A repository that keeps no plan is converted without gaining one.

**Acceptance**

- [ ] script: with the plan switched off in `.claude/hooks/unities.json`, the record compiler writes `docs/DECISIONS.md` and no `docs/PLAN.md`, and its check passes while `docs/PLAN.md` is absent
- [ ] script: with the plan switched off, the gate does not ask for `docs/PLAN.md` to be up to date
- [ ] script: with no such setting, every existing test passes unchanged
- [ ] the assignee: the team repository's conversion is re-run on the version that carries this, and what its gate and compiler did about the plan is written into `tasks/convert-the-adopted-repositories.md`
