# The Unities

A working discipline for software projects, after the dramatic unities: one place, one
time, one action.

- **Place.** Everything the work consists of lives in the repository as files: spec,
  decisions, plan, tasks, code, tests, changelog. The test is whether a fresh session,
  a person or an agent, can pick the work up from the repository alone.
- **Time.** The test, the doc line and the task record are written in the same scene as
  the code they describe. Nothing is recorded later; whatever is unwritten when a
  session ends is lost.
- **Action.** There is one record, the task files. Decisions, plan and changelog are
  compiled from them and never edited by hand.

Taken together: the work, its record and its location are the same thing at the same
time.

**The form is at version 1.0**, since plugin 0.6.3 (2026-11-19), when it was first
numbered. The form is four statements quoted from the essay: that sentence and one for
each unity. They are written out in the runbook's
[§0](skills/unities-project/UNITIES.md#0-the-form). The form has a version of its own,
apart from the plugin's: the plugin's number moves with the gate, the compilers and the
runbook, and the form's moves only when one of the four statements does. Someone who has
learned the form at 1.0 has nothing to learn again until that number moves.

The Unities are constraints, not fixes. They force the work into a better shape, and
they cost something; the essay names the costs.

## What is here

| Path | What it is |
| --- | --- |
| [`docs/the-unities.md`](docs/the-unities.md) | The essay: the form, where it comes from, what it forces, what it costs. Start here. |
| [`skills/unities-project/SKILL.md`](skills/unities-project/SKILL.md) | The front door. It runs the kickoff interview for a new project, or migrates an existing repository. |
| [`skills/unities-project/UNITIES.md`](skills/unities-project/UNITIES.md) | The runbook. The skill plants it in a repository as `docs/UNITIES.md` and carries it out: the task record, the gate script and its tests, the two compilers, the CI example. This copy is the master. |
| [`skills/unities-project/files/`](skills/unities-project/files/) | The scripts the runbook plants, as files: the gate, its tests, the two compilers, and a manifest of their hashes. They are copied as they are; each repository keeps its own values in one configuration file. |
| `tasks/` | The record of this repository's own work, one file per task. |
| [`CLAUDE.md`](CLAUDE.md), [`docs/SPEC.md`](docs/SPEC.md) | How to work in this repository, and what the plugin is and how a version is made. |
| `docs/DECISIONS.md`, `docs/PLAN.md` | Compiled from `tasks/`; read, never written. |

## Two stagings

The form says what a scene is, not how long one is. A repository chooses once.

- **Strict: the commit is the scene.** `git commit` and the end of an agent's turn refuse
  an incomplete scene. For one developer, or a team that already commits complete units.
- **Adapted: the pull request is the scene.** Commits on the branch are free. The pull
  request must be complete, and a required check refuses it otherwise.

Strict is the ideal. Adapted is what a team repository with a pull-request policy
accepts, and it was learned by trying strict on one.

## Using it

This repository is a Claude Code plugin named `unities`, with one skill, and the
marketplace it is installed from. From a shell:

```
claude plugin marketplace add erezschatz/Unities
claude plugin install unities@erezschatz
```

A new version is fetched by asking for it:

```
claude plugin marketplace update erezschatz
claude plugin update unities@erezschatz
```

Installed, the skill is run inside a repository:

```
/unities:unities-project
```

For a new project it asks the kickoff questions, then writes the files a fresh session
needs. For an existing repository it plants the runbook and carries it out. A repository
that already has an older `docs/UNITIES.md` gets the newer one, and the run installs only
what changed.

The gate and the compilers are Node scripts with no dependencies. They need git and
Node; the tests are run with Node 22.

The runbook also binds the same gate to Codex. That binding was written from Codex's
documentation and has not yet been verified under Codex.

## Changing it

A change to the procedure is a change to `skills/unities-project/UNITIES.md` or to a
script in `skills/unities-project/files/` here, a new date and version on the runbook's
first line, a new plugin version, then a re-run on each repository. Copies in other repositories are deployments and are never edited in place.

Each change to this repository arrives as a task file in `tasks/`, and carries its record
with it.

## Status

Version 0.6. In use in several repositories, solo and team. The tests run with
`node --test` at the root of this repository.

## Licence

The plugin is under the MIT licence: the skill, the runbook, and every script and
template the runbook plants in a repository. See [`LICENSE`](LICENSE).

The prose is under
[Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/):
the essay in `docs/` and this README.
