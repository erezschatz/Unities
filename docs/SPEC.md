# Spec

When this file and the repository disagree, fix one of them in the same scene.

## Why this project exists

Work done with an agent leaves its reasons in a chat that ends. The Unities are a
discipline that keeps them in the repository instead: one place (every part of the work
is a file), one time (code, test, doc, record and review in the same unit), one action
(one record, the task files, from which everything shared is compiled). This repository
is where that discipline is written down and shipped, as a Claude Code plugin, so that it
can be planted in other repositories and enforced there by scripts rather than requested
by a checklist.

## Scope

What it does:

- **The essay**, `docs/the-unities.md`: the form, where it comes from, what it forces,
  what it costs. It names no tools.
- **The skill**, `skills/unities-project/SKILL.md`: the front door. For a new project it
  runs the kickoff interview and writes `CLAUDE.md`, `docs/SPEC.md` and the task files;
  for an existing repository it plants the runbook and carries it out.
- **The runbook**, `skills/unities-project/UNITIES.md`: the procedure. It installs, in a
  repository, the task record (`tasks/`), the gate (`check-unit.mjs`) and its tests, the
  Claude Code, git, CI and Codex bindings, the changelog compiler and the record compiler.
  The scripts exist today only as listings in its appendices (A, F, J, K, and the
  bindings in B, C, I, L).
- **The plugin manifest**, `.claude-plugin/plugin.json`.

What it explicitly does not do, as of 0.5.5:

- It is not installable by name; there is no marketplace file yet
  (`tasks/a-marketplace-file.md`).
- The scripts are not shipped as files (`tasks/the-scripts-as-files.md`).
- The Codex binding has not been run under Codex (`tasks/verify-the-codex-binding.md`),
  and the gate has not been run on Windows outside WSL
  (`tasks/run-the-gate-under-cmd-exe.md`).
- The gate does not require that a scene adds a record
  (`tasks/the-gate-does-not-require-a-record.md`).

## Architecture

**Master and deployments.** The runbook in this repository is the only master. Each
repository that adopts the Unities holds a deployment of it at `docs/UNITIES.md`, whose
first line carries the master's date and version. When the skill runs on a repository
with an older copy, it replaces the copy and re-runs the procedure, which is idempotent
and so installs only what changed. Deployments are never edited in place; a change to the
procedure is a change here.

**Versions.** A change to the procedure gets a new date and version on the runbook's
first line and the same version in `.claude-plugin/plugin.json`, in the same commit. The
version changes with the work, not at a separate release step.

**Releases.** The compiled `CHANGELOG.md` starts at the adoption; its boundary is the
local tag `v0.5.5` on the last commit before it. A release is
`node scripts/compile-changelog.mjs <version>`, run by Erez and committed from his shell
with `CHANGELOG.md` and `.claude-plugin/plugin.json` only. Nothing checks a shell commit
here (there is no git hook); a release committed through Claude Code is refused as a
hand edit of `CHANGELOG.md` (D8).

**This repository under its own rule.** It runs the strict staging. It plants no
`docs/UNITIES.md`: it carries out the master in place. Its own gate, tests and compilers
(`.claude/hooks/`, `scripts/`) were cut from the master's listings with this repository's
per-repo values; they are deployments, changed by changing the listing and re-cutting.

**Roles here** (the gate's `RULES`): source is `skills/` and `.claude-plugin/`; doc is
`docs/`, `README.md`, `CLAUDE.md`; task is `tasks/`; shared is `CHANGELOG.md`. There is no
test folder and nothing retired. A source change requires a task record only; why is a
decision in `tasks/adopt-unities.md`.

## Stack

| Dependency | What it replaces | Why it is rote |
| --- | --- | --- |
| Node (built-ins only: `node:child_process`, `node:fs`, `node:path`; the tests add `node:test`, `node:assert/strict`, `node:os`, `node:url`) | — | Runs the gate, the compilers and the tests; Deno and Bun run the same files. The README says Node 22; Erez's machine has 26. |
| git | — | The gate reads the scene from git; the changelog compiler reads the record from history. |
| Claude Code hooks (`Stop`, `PreToolUse`) | a Definition-of-Done checklist | The bindings that make the gate fire; documented by Claude Code. |

No package dependencies. Adding one needs a row here and a decision.
