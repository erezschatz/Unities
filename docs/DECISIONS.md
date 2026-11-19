# Decisions

Dated, append-only. A decision is reversed only by a new entry naming the one it supersedes.
Written in the task file of the work that made it (`## Decisions`); compiled here after each merge.

<!-- Compiled from tasks/ by scripts/compile-record.mjs. Do not edit below this line by hand. -->

## D1 · 2026-11-19 · Strict: the commit is the scene

**Decision** — This repository runs the strict staging: a `git commit` made through
Claude Code and the end of an agent turn refuse an incomplete scene. A commit from a
shell is not checked (D5); the one made there is a release (D8).
**Rejected** — Adapted (the pull request is the scene).
**Why** — One developer, every commit but a release made through the agent, no
pull-request policy and no CI. Strict is the ideal where commits are already complete units, and they are here.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D2 · 2026-11-19 · No copy of the runbook in docs/

**Decision** — This repository plants no `docs/UNITIES.md`. The adoption carried out the
master, `skills/unities-project/UNITIES.md`, in place.
**Rejected** — Planting a byte-identical copy like any other deployment.
**Why** — A second copy of the master in the repository that holds the master is a second
account of the procedure, which would drift exactly the way deployments are forbidden to.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D3 · 2026-11-19 · A source change requires a task record, and only that, until the scripts are files

**Decision** — Source is `skills/` and `.claude-plugin/`. `REQUIRED` is `["task"]`. The
test role is `tests/`, which does not exist yet; the doc role is the usual
`docs/`, `README.md`, `CLAUDE.md`. Nothing is retired (`RULES.retired` matches nothing).
**Rejected** — `["test", "doc", "task"]`, the runbook's default; `["doc", "task"]`.
**Why** — The runbook is at once the source, the tests (Appendix J) and much of the
documentation. A test change cannot be a separate file until the scripts are files, and
a doc requirement would force a README or spec edit with every runbook change (the 0.5.4
commit, correct as it was, touched no doc). The `CLAUDE.md` paragraph asks for the tests
and the doc line by rule instead. `tasks/the-scripts-as-files.md` brings `test` and `doc`
back by a decision that supersedes this one.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D4 · 2026-11-19 · Four Appendix J tests are skipped here, not deleted

**Decision** — The three tests of retired files and "the compiled record does not count
as the doc change" carry a `skip` with the reason. The per-repo paths are
`skills/x/SKILL.md` for source and `tests/x.test.mjs` for test.
**Rejected** — Deleting them, as the runbook says a new project does with the retired
tests; leaving them failing.
**Why** — They test rules this repository's `RULES` and `REQUIRED` switch off (nothing
retired; doc not required). A skip keeps their text, so they return unchanged with the
roles.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D5 · 2026-11-19 · Bindings left out: git hook, Codex, CI gate, developer's guide, package.json

**Decision** — Installed: the Claude Code `Stop` and `PreToolUse` bindings. Not installed:
the git pre-commit binding (4.3), the Codex binding (4.10), the CI gate (4.7), the
developer's guide (4.8), a `package.json` for the compilers.
**Rejected** — Installing each.
**Why** — Erez said every commit goes through Claude Code, except a release, which he
commits from his shell (D8), and that no one works here with Codex; add the git hook the day a commit comes from a shell or a second agent, and 4.10
with it. There is no CI to put a gate in. The developer's guide would repeat
`tasks/README.md` and `CLAUDE.md` for one developer. A `package.json` would make the
plugin look like an npm package only to name two scripts, which are called as
`node scripts/….mjs` instead. `tasks/verify-the-codex-binding.md` stays open; it is to be
run in another repository.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D6 · 2026-11-19 · No phases and no final run

**Decision** — The plan has no phases and no final-run task.
**Rejected** — A phase 1 closed by a final run, as the skill prescribes for a new project.
**Why** — A plugin repository has no app that a user runs for a period; the plugin is
verified by being run in other repositories, which each open task names in its own
acceptance. A final run here would be ceremony.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D7 · 2026-11-19 · The order of the open tasks

**Decision** — The task files keep their names. The open tasks are worked in this order:
`the-scripts-as-files`, `new-records-are-found-by-heading-text`,
`the-gate-does-not-require-a-record`, `a-marketplace-file`, `verify-the-codex-binding`,
`run-the-gate-under-cmd-exe`.
**Rejected** — Renaming them with numbers so the file-name order is the working order.
**Why** — Their `## Context` sections cite one another by path, and Context is not
edited. Scripts as files comes first because both gate fixes are then made once, in
files, with tests that run here.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D8 · 2026-11-19 · The changelog starts at the adoption

**Decision** — The release boundary is a local tag `v0.5.5` on `db7a6d4`, the last commit
before the adoption. A release touches `CHANGELOG.md` and `.claude-plugin/plugin.json`.
Erez runs the compiler and commits the release from his shell, which nothing here
checks (D5). A release committed through Claude Code is refused by the `PreToolUse`
binding as a hand edit of `CHANGELOG.md`, and that stays so. `RELEASE_FILES` takes
effect only under `--pr`, which nothing here runs; it is set for the day a CI gate is.
**Rejected** — Compiling the records of 0.5.2–0.5.5 into the first changelog; no tag,
leaving the compiler to start from the first commit; `--no-verify`, the runbook's strict
release path, which bypasses no hook here because there is no git hook; exempting
releases from the `--staged` check, which is a change to the master.
**Why** — The skill says the compiled changelog starts at the migration. Without a tag
the compiler and the gate both fall back to the root commit. The tag is not pushed; Erez
pushes.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D9 · 2026-11-19 · Versions move with the work (recorded 2026-11-19)

**Decision** — A change to the procedure bumps the runbook's first line and
`.claude-plugin/plugin.json` in the commit that makes it (0.5.4, 0.5.5 did).
**Rejected** — Bumping only at a separate release step.
**Why** — A deployed runbook is compared with the master by its first line; a change
that is installed without a new version is invisible to the re-run. Recorded at the
adoption; the practice predates it.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D10 · 2026-11-19 · The scripts live as listings in the runbook, for now (recorded 2026-11-19)

**Decision** — The gate, its tests and the compilers are code blocks in the runbook's
appendices, copied into each repository by the agent carrying out the runbook.
**Rejected** — Shipping them as files (proposed, agreed in principle).
**Why** — How the plugin was first written. A newcomer will ask; the answer is
`tasks/the-scripts-as-files.md`, first in the order above.

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)

## D11 · 2026-11-19 · What Part II said and the runbook did not goes into the runbook

**Decision** — Part II is cut whole. What it said that the runbook and the skill did not
is carried into the runbook as a new section, 4.11.
**Rejected** — Keeping a shortened Part II in the essay; dropping the remainder.
**Why** — Part I names no tools, and everything left over is about git and Claude Code.
The runbook is where the staging is described, so a second place for it in the essay
would be a second account. The essay now points to the runbook in one sentence.

Source: [tasks/essay-part-two-and-licences.md](../tasks/essay-part-two-and-licences.md)

## D12 · 2026-11-19 · The carried statements about Claude Code are not re-verified

**Decision** — Three statements are carried as they stood on 14 October 2026, and 4.11
says so: that `onFailure: "block"` has no effect on `Stop` hooks, that cloud sessions do
not read a machine's user settings, and that an agent-type `Stop` hook is experimental.
**Rejected** — Dropping them; presenting them as current.
**Why** — The request was that nothing be lost. They are cautions, not steps; nothing in
the procedure acts on them.

Source: [tasks/essay-part-two-and-licences.md](../tasks/essay-part-two-and-licences.md)

## D13 · 2026-11-19 · The plugin is MIT, the essay and the README are CC BY-SA

**Decision** — "The prose" is the essay and the README. The skill and the runbook stay
under MIT with the scripts.
**Rejected** — Putting the runbook and the skill under CC BY-SA as well.
**Why** — The runbook is what an agent carries out, and its templates (the standing
paragraph, `tasks/README.md`, the reader's brief) are copied into every adopting
repository and adapted there. Share-alike on those would attach to files in other
people's repositories. Erez may reverse this; it is two sentences in the README.

Source: [tasks/essay-part-two-and-licences.md](../tasks/essay-part-two-and-licences.md)

## D14 · 2026-11-19 · The licence text of CC BY-SA is linked, not included

**Decision** — The essay and the README link to the licence's page.
**Rejected** — A copy of the legal code in the repository.
**Why** — The licence's site could not be reached from where this was written, and a
retyped legal text is worse than a link.

Source: [tasks/essay-part-two-and-licences.md](../tasks/essay-part-two-and-licences.md)

## D15 · 2026-11-19 · The script finds the fork point, not the caller

**Decision** — `--pr <target>` computes `git merge-base <target> HEAD` itself and measures
the scene from there.
**Rejected** — Leaving it to the caller, as 4.7 did (`--pr $(git merge-base <target> HEAD)`).
**Why** — The caller got it wrong in practice and nothing said so: the check ran and
gave a wrong answer. `--branch` already finds the merge base itself. A caller that still
passes the fork point gets the same result, so nothing that follows the old 4.7 breaks.

Source: [tasks/pr-measures-from-the-fork-point.md](../tasks/pr-measures-from-the-fork-point.md)

## D16 · 2026-11-19 · Adoption is judged on the target's tip

**Decision** — Whether the record is required is decided by whether the target, as it is
now, carries `check-unit.mjs`.
**Rejected** — Deciding it at the fork point.
**Why** — What matters is the branch being merged into. The script judges adoption on
whatever name it is handed. A caller that passes the target, as 4.7 now says, has a
branch cut before the target adopted the Unities checked. A caller that still passes the
fork point is still judged there, and such a branch is still skipped.

Source: [tasks/pr-measures-from-the-fork-point.md](../tasks/pr-measures-from-the-fork-point.md)

## D17 · 2026-11-19 · A target git does not know is an error

**Decision** — `--pr <name>` exits 2 when `<name>` is not a commit in the checkout.
**Rejected** — Treating it as a target that has not adopted yet, which is what happened:
the check printed one line and exited 0.
**Why** — A typo in the caller, or a target branch that was never fetched, passed every
pull request unchecked. Only a target that exists and has no `check-unit.mjs` has not
adopted. A caller that passed for this reason now fails until its checkout fetches the
target.

Source: [tasks/pr-measures-from-the-fork-point.md](../tasks/pr-measures-from-the-fork-point.md)

## D18 · 2026-11-19 · No fork point is an error

**Decision** — When git finds no merge base between the target and `HEAD`, the script
exits 2 and says the checkout lacks the history.
**Rejected** — Falling back to the difference from the target's tip; letting the git
call throw.
**Why** — The fallback is the bug this task removes. A stack trace does not tell the
person reading a CI log that the clone is shallow.

Source: [tasks/pr-measures-from-the-fork-point.md](../tasks/pr-measures-from-the-fork-point.md)

## D19 · 2026-11-19 · The essay keeps its October wording

**Decision** — `docs/the-unities.md` is left as written on 14 October 2026, including
its `--pr <base>` row.
**Rejected** — Updating the essay's Part II with each change to the script.
**Why** — Part II describes the staging as it stood then, and the README says the
runbook is the current one. Keeping two descriptions of the script in step is a second
account of it.

Source: [tasks/pr-measures-from-the-fork-point.md](../tasks/pr-measures-from-the-fork-point.md)

## D20 · 2026-11-19 · The essay has no description of the script to keep

**Decision** — D19 is superseded. The essay holds no description of the script: its
Part II, which carried the `--pr <base>` row D19 kept, was cut whole (D11), and what it
said lives in the runbook's 4.11.
**Rejected** — Leaving D19 standing.
**Why** — The fresh-session test of this adoption read D19 against D11 as a
contradiction. D19's reason (one account of the script, the runbook's) still holds and
D11 carried it further; only its object is gone.
Supersedes: D19

Source: [tasks/adopt-unities.md](../tasks/adopt-unities.md)
