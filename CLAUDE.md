# CLAUDE.md

This repository is the `unities` Claude Code plugin: one skill (`unities-project`), the
runbook it carries out (`UNITIES.md`, the master copy), and the essay the form comes from.
It is itself run under the Unities, in the strict staging.

## Read first, in this order

1. `docs/SPEC.md`: what the plugin is, what it ships, how a version is made.
2. `docs/DECISIONS.md`: what was decided and rejected. Compiled; read it, never write it.
3. `docs/PLAN.md`: the open and finished tasks. Compiled. The working order is D7, not the
   file-name order.
4. `tasks/README.md`: what a task file is.

`docs/the-unities.md` is the essay. Read it for why; it is not the procedure.

## The Unities

The work, its record and its location are the same thing at the same time. Every commit
that changes source (here: the scripts in `skills/unities-project/files/`) also carries
its test, its doc line and a `## What was done` section appended to the task file in
`tasks/`, read cold against the diff by a reader that did not write it: code, test,
document, review are one unit. The runbook and the skill are what every adoption runs, so
they are source too, held to a doc line and a record but not to a test: a change to
either carries a doc change (anything in `docs/` but the compiled `DECISIONS.md` and
`PLAN.md`, or `README.md`, `CLAUDE.md`, `AGENTS.md`), and its record.
This is enforced, not
requested: a `git commit` made through Claude Code refuses an incomplete scene, and a
Stop hook says what a half-recorded change still lacks (`.claude/hooks/check-unit.mjs`). A commit from a shell is not checked here: there is no
git hook (D5). `CHANGELOG.md` is compiled from task records at release
(`node scripts/compile-changelog.mjs <version>`), by the developer, who commits the
release from their shell; a commit through Claude Code that touches it is refused (D8). It is never
edited by hand. A scene ends at its commit, not at the end of a turn: if you
are unsure, stop and ask the developer, and leave the change uncommitted until it is finished. If
it is abandoned, revert it; do not leave it for later. Any choice with a rejected alternative gets
a dated entry under `## Decisions` in the task file of the work that made it; a listed
decision is not reopened quietly but by a new entry that supersedes it.
`docs/DECISIONS.md` and `docs/PLAN.md` are read, never written: they are compiled from the
task files (`node scripts/compile-record.mjs`), the commit carries the compiler's output,
and the gate refuses one where they are out of date. A review item (`## Review` in the
task file) is done when every *Done when* line holds for the running program, not when
its wording is satisfied; whatever a fix needs beyond its item is recorded as a decision
before it is built. Before committing, give the staged diff and the task file to a reader
that has not seen the work — a read-only subagent, never yourself — to carry out
`docs/reviewer.md`; write what it finds into the task file and its name on the record's
`Reviewed by:` line. The agent does not claim a build is green or a feature works where
it runs; the developer does. A box you checked by reading the code or by a command whose
output you report, or a review box the reader found to hold, you tick; do not ask the
developer to tick it for you. A box that can only be checked by running the plugin in a
repository you leave open and hand to them, those boxes alone, each with what to do and what should be
seen.

## Code rules

- **The master and its deployments.** `skills/unities-project/UNITIES.md` is the master
  runbook. A copy in any other repository is a deployment and is never edited in place.
  This repository plants no `docs/UNITIES.md`; it carries out the master directly.
- **A change to the procedure is a version.** A new date and version on the runbook's
  first line, the same version in `.claude-plugin/plugin.json`, and the manifest
  regenerated so it carries it, in the same commit.
- **The form has its own version** (1.0; the four statements are in the runbook's §0).
  No change to the tooling changes it. It moves only by a decision that names the new
  form version, in a task the developer opened for that (`docs/SPEC.md`, *The form's version*).
- **A check enters the gate because something happened.** This is about one kind of
  finding: one whose answer would make the gate refuse something it lets through, or
  handle a case it does not handle. Such a finding is not built on the reader's word.
  Write it into the task file as a review item, as any finding, and say to the developer
  what you would rule; they rule. They let it into the gate when the case happened in a
  repository, or when it breaks something a task file's promise or acceptance, or a
  test, already says. Until then it is left unchecked: the item's *Done when* reads
  `<case> → the gate is unchanged`, and a decision titled `Left unchecked: <the case>`
  says why, so `docs/DECISIONS.md` lists what is known and not checked. Their ruling to
  keep it so is a decision titled `Left unchecked, by the developer: <the case>`. A finding about
  the record, the docs, or a fault in what the scene itself wrote is answered in the
  scene, as before. The reader's brief does not change; the reader still reports
  everything.
- **The scripts are masters in `skills/unities-project/files/`.** After changing one, run
  `node skills/unities-project/files/make-manifest.mjs` and `node --test`, then copy the
  changed files and `manifest.json` over the planted copies here (`.claude/hooks/`,
  `scripts/`, `.claude/hooks/unities.manifest.json`). The gate refuses a planted copy
  that differs from the manifest. This repository's own values are in
  `.claude/hooks/unities.json`.
- **No dependencies.** The scripts use only `node:` built-ins and git, and run on Node,
  Deno and Bun. No `package.json` here; scripts are called as `node <path>`.
- **Every planted script keeps its licence line** (MIT, first or second line).
- **Readable to a strong JavaScript developer in week one.** If a construct needs
  explaining, write it the plain way. Comments explain why.
- **The essay is Erez's.** `docs/the-unities.md` is changed only when he asks, and what
  Claude drafts there is said to be Claude's in the task file.
- **Prose rules.** The runbook is addressed to the agent that carries it out. Say a thing
  in one place; point to it from the others.

## Division of labour

- **Claude** edits the runbook, the skill, the README, the spec and the task files; runs
  the tests (`node --test` at the root, the master files), reporting the output as it
  came, not as a verdict on the plugin.
- **The developer** judges the prose, runs the plugin in repositories (that
  is where it runs, and where it is verified; one set up for the check, since no task here
  waits on another project's state: runbook 4.7, *Acceptance boxes*), decides versions, compiles and commits releases from their shell, and pushes.
  The essay is its author's (*Code rules*).
- Tests here run on whatever Node is installed (26 on the developer's machine); the README's
  claim is Node 22.
