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
  what it costs. The tools it mentions are examples; it prescribes none.
- **The skill**, `skills/unities-project/SKILL.md`: the front door. For a new project it
  runs the kickoff interview and writes `CLAUDE.md`, `docs/SPEC.md` and the task files;
  for an existing repository it plants the runbook and carries it out.
- **The runbook**, `skills/unities-project/UNITIES.md`: the procedure. It installs, in a
  repository, the task record (`tasks/`), the gate and its tests, the Claude Code, git,
  CI and Codex bindings, the changelog compiler and the record compiler. The bindings are
  listings in its appendices (B, C, I, L); the scripts are files.
- **The scripts**, `skills/unities-project/files/`: `check-unit.mjs` (the gate),
  `check-unit.test.mjs`, `compile-changelog.mjs`, `compile-record.mjs`, and
  `manifest.json` with their sha256 hashes and the plugin's version. They are planted by
  copy; a repository's own values live in its `.claude/hooks/unities.json`, among them
  `"plan": false` for one that keeps no compiled plan. All three scripts read a file
  with CRLF line endings or a byte-order mark as they read it without.
  `make-manifest.mjs` rewrites the manifest and is not planted.
- **The plugin manifest**, `.claude-plugin/plugin.json`, and beside it the marketplace
  file, `.claude-plugin/marketplace.json`: one marketplace, `erezschatz`, listing this
  plugin at the repository's root, so it is installed as `unities@erezschatz`. The
  file says whose marketplace it is (its own one-line description, and the owner, which
  Claude Code requires). The plugin's entry carries no version and no description; both
  are read from `plugin.json`.

What it explicitly does not do, as of 0.6.6:

- The Codex binding has not been run under Codex (`tasks/verify-the-codex-binding.md`),
  and the gate has not been run on Windows outside WSL
  (`tasks/run-the-gate-under-cmd-exe.md`).
- The gate does not require that a scene adds a record
  (`tasks/the-gate-does-not-require-a-record.md`).

## Architecture

**Master and deployments.** The runbook and the scripts in this repository are the only
masters. Each repository that adopts the Unities holds a deployment of the runbook at
`docs/UNITIES.md`, whose first line carries the master's date and version, and copies of
the scripts with the manifest. When the skill runs on a repository with an older copy,
it replaces the copy and re-runs the procedure, which is idempotent and so installs only
what changed. Deployments are never edited in place; a change to the procedure is a
change here. The gate refuses a planted script whose hash is not the manifest's, in a
scene that touches one (runbook Appendix A).

**Versions.** A change to the procedure gets a new date and version on the runbook's
first line, the same version in `.claude-plugin/plugin.json`, and a regenerated
`manifest.json`, which carries it, in the same commit. The
version changes with the work, not at a separate release step.

**How the gate grows.** A check enters the gate because something happened: in a
repository, or to something a task file or a test already promises. A case a reader
constructed is recorded and not built until Erez admits it (`CLAUDE.md`, *Code rules*).

**The form's version.** The form is four statements quoted from the essay: the principle
and one for each unity. They are read, with the version, in the runbook's §0; the README states
the version and points there. The form is at 1.0, since
plugin 0.6.3 (2026-11-19), when it was first numbered. A change to the form is a change
to one of the four statements. It is made only by a decision that names the new form
version, in a task Erez opened for it, and §0 and the README then name the plugin
version it arrived in. A staging says how much of the form a repository holds to and is
not part of it. Everything else the plugin ships is tooling and moves the plugin's
version only.

**Releases.** The compiled `CHANGELOG.md` starts at the adoption; its boundary is the
local tag `v0.5.5` on the last commit before it. A release is
`node scripts/compile-changelog.mjs <version>`, run by Erez and committed from his shell
with `CHANGELOG.md` and `.claude-plugin/plugin.json` only. Nothing checks a shell commit
here (there is no git hook); a release committed through Claude Code is refused as a
hand edit of `CHANGELOG.md` (D8).

**This repository under its own rule.** It runs the strict staging. It plants no
`docs/UNITIES.md`: it carries out the master in place. Its own gate, tests and compilers
(`.claude/hooks/`, `scripts/`) are copies of the files in `skills/unities-project/files/`,
with the manifest, and its values are in `.claude/hooks/unities.json`.

**Roles here** (`rules` in that file): source is the scripts in
`skills/unities-project/files/` other than the tests; test is the tests there; procedure
is the runbook and the skill (`UNITIES.md`, `SKILL.md`); doc is `docs/` other than the
compiled `DECISIONS.md` and `PLAN.md`, and `README.md`, `CLAUDE.md`, `AGENTS.md`; task is `tasks/`; shared is `CHANGELOG.md`. Nothing is retired, and
`.claude-plugin/plugin.json` and `manifest.json` are in no role. A script change requires
a test, a doc and a task change; a change to the runbook or the skill, a doc and a task
change.

## Stack

| Dependency | What it replaces | Why it is rote |
| --- | --- | --- |
| Node (built-ins only: `node:child_process`, `node:crypto`, `node:fs`, `node:path`, `node:url`; the tests add `node:test`, `node:assert/strict`, `node:os`) | — | Runs the gate, the compilers and the tests; Deno and Bun run the same files. The README says Node 22; Erez's machine has 26. |
| git | — | The gate reads the scene from git; the changelog compiler reads the record from history. |
| Claude Code hooks (`Stop`, `PreToolUse`) | a Definition-of-Done checklist | The bindings that make the gate fire; documented by Claude Code. |

No package dependencies. Adding one needs a row here and a decision.
