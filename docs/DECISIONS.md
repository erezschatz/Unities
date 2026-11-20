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

## D21 · 2026-11-19 · The scripts are files in the skill folder, side by side

**Decision** — The four scripts and `manifest.json` live in `skills/unities-project/files/`,
flat, next to the runbook that plants them. They are planted at the paths they always
had (`.claude/hooks/`, `scripts/`). Appendices A, F, J and K now describe the files and
point to them; the bindings (B, C, I, L) stay listings.
**Rejected** — Mirroring the planted layout inside the plugin (`files/.claude/hooks/…`),
which puts dot-folders in the plugin and hides the tests from `node --test`; keeping the
listings in the runbook beside the files, which is two accounts of each script.
**Why** — The plugin ships the skill folder, so the files travel with the runbook at the
same version. Flat, the tests find the compilers beside them in the plugin and in
`../../scripts/` once planted.
Supersedes: D10

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D22 · 2026-11-19 · One configuration file, JSON, beside the gate

**Decision** — The per-repo values are `.claude/hooks/unities.json`: `scene`, `rules` (one
regular expression per role, as a string), `required`, `base`, `releaseFiles`, and the
optional `changelog.recorded` and `run`. The gate reads it from the repository it runs
in and stops, naming the file, when it is missing, is not JSON or lacks a key.
`compile-record.mjs` has no per-repo values; its paths are the ones the gate already
fixes.
**Rejected** — A JavaScript configuration module (per-repo code again); globs instead of
regular expressions (a second syntax, and the old `RULES` are regular expressions, so
converting a repository is a copy); a file at the repository's root; making the record
compiler's paths configurable.
**Why** — JSON needs nothing to read in Node, Deno or Bun, and holds values, not
behaviour, so a script that reads it can be the same file everywhere. Beside the gate,
because the gate is what `adopted()` looks for and what reads it.

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D23 · 2026-11-19 · A manifest of hashes, checked when a scene touches a planted file

**Decision** — `manifest.json` holds the sha256 of each shipped script, under its planted
path, and the plugin's version; it is planted as `.claude/hooks/unities.manifest.json`.
When a scene touches a planted script or the manifest, the gate refuses it if any planted
script differs from its hash or is missing. Line endings are left out of the hash.
**Rejected** — Checking on every run, which would refuse a clean tree in strict and leave
revert no way out; comparing with the plugin's own folder, which is not there in CI or on
another machine; comparing versions only, which misses an edit; refusing a scene that
edits a script and the manifest together, which is exactly what an upgrade is.
**Why** — The gate can check presence, not truth. A copy edited with its manifest passes,
but the edit is then deliberate and in the diff, and a fix carried quietly in one
repository (the case in this task's context) no longer happens by accident.

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D24 · 2026-11-19 · The tests carry their own configuration

**Decision** — `check-unit.test.mjs` writes a fixed configuration (`FIXTURE`) into each
throwaway repository, so the file has nothing per-repo and the four tests skipped here
run again. One test, that `manifest.json` holds every shipped file's hash, runs only in
the plugin and is skipped in a planted copy.
**Rejected** — Tests that read the host repository's configuration, as the listing's
per-repo paths did; keeping the skips.
**Why** — The tests pin what the script does. Which roles a repository has is its
configuration's business, and a test of it would differ in every repository.
Supersedes: D4

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D25 · 2026-11-19 · The changelog's closing line and the compilers' invocation are configuration

**Decision** — `compile-changelog.mjs` reads `changelog.recorded` (default
``Recorded in `{hash}`.``). The gate invokes the compilers with `run` (default `node`).
Any other change to an entry's shape is a change to the plugin.
**Rejected** — Leaving `formatEntry` per-repo, as the listing did; telling Deno and Bun
repositories to edit the gate's two `node` calls, as Appendix H did.
**Why** — Both were edits to a planted copy, which the manifest now refuses. They are the
only per-repo variations the runbook named for these scripts.

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D26 · 2026-11-19 · In this repository the scripts are source and the runbook is a doc

**Decision** — Source is the scripts in `skills/unities-project/files/` other than the
tests; test is the tests there; doc adds every `.md` under `skills/`. `required` is
`["test", "doc", "task"]`. `.claude-plugin/plugin.json` and `manifest.json` are in no
role.
**Rejected** — Keeping D3 (task only); the runbook as source with tests required, which
asks for a test with every change of wording; teaching the gate per-role requirements
("a doc change needs a task"), a change to the master nobody asked for.
**Why** — D3 said test and doc would come back once the scripts were files. They are. The
cost is that a change to the runbook alone is no longer held to a record by the gate,
only by `CLAUDE.md`, as a doc change is in any repository.
Supersedes: D3

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D27 · 2026-11-19 · 0.6.0, and a conversion for repositories cut from listings

**Decision** — The version is 0.6.0. Runbook 5.5 converts a repository adopted earlier:
its per-repo values go into the configuration; any other difference between its copies
and the listings it was cut from is listed and decided one by one, brought to the plugin
as a task or dropped; then the files are copied, and the old and new gates are run on the
same scenes.
**Rejected** — 0.5.6; carrying a local change into the new copy, which breaks the byte
identity; dropping local changes silently.
**Why** — Every adopted repository has to be re-run and changes files it had owned. One
team repository is known to carry such a local change
(`tasks/new-records-are-found-by-heading-text.md`).

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D28 · 2026-11-19 · In the plugin's repository the gate also compares masters with copies

**Decision** — An optional `plugin` key in the configuration names the folder of the
master files. Where it is set, a scene that touches a master, a planted copy or the
manifest is refused unless every planted copy and the manifest equal the masters. This
repository sets it; no planted repository does.
**Rejected** — Leaving it to `CLAUDE.md`; a test in the plugin's suite, which runs when
asked and not at the commit; making the plugin a special case in the code by path.
**Why** — The cold reader changed a master here without copying it, and the gate passed:
the drift this task exists to end, in the one repository that ships the gate.

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D29 · 2026-11-19 · A missing configuration is refused like an incomplete scene

**Decision** — The gate reads its configuration after the `PreToolUse` filter, so a
command that is not a commit passes. Missing or broken, it refuses a commit, the gate at
the pull request and a first `Stop`, naming the file, and lets a second `Stop` end with
a message.
**Rejected** — Refusing every hook call, including the second `Stop`, which traps the
agent; defaults for a missing configuration, which would run the gate on roles nobody
chose.
**Why** — It is an incomplete adoption, and the gate already knows how to treat an
incomplete thing without trapping anyone.

Source: [tasks/the-scripts-as-files.md](../tasks/the-scripts-as-files.md)

## D30 · 2026-11-19 · The runbook and the skill are source, held to a doc and a task change

**Decision** — In this repository a seventh role, `procedure`, holds
`skills/unities-project/UNITIES.md` and `SKILL.md`. `required` is
`{"source": ["test", "doc", "task"], "procedure": ["doc", "task"]}`. Doc is `docs/`,
`README.md` and `CLAUDE.md`.
**Rejected** — D26's arrangement, the runbook a doc and not held to a record; the runbook
as plain source, which asks for a test with every change of wording; source with
`["doc", "task"]` for everything, which lets a script change through without a test.
**Why** — The runbook is what every adoption runs; a change to it is a change of
behaviour in every repository that re-runs it, and the gate should hold it to a record
as it does code. A wording change has no test to carry.
Supersedes: D26

Source: [tasks/the-runbook-is-source.md](../tasks/the-runbook-is-source.md)

## D31 · 2026-11-19 · `required` may map roles to lists, in the plugin, for every repository

**Decision** — The gate accepts `required` either as a list (for source, as before) or as
a map from role to list, and `rules` may hold roles beyond the six, for `required` to
name. A configuration whose `required` names a role `rules` lacks stops the gate. The
version is 0.6.1.
**Rejected** — A special case for this repository; a fixed `procedure` role in the gate,
which names something only this repository has.
**Why** — The finding that made it necessary is this repository's, but the shape (some
files held to less than source) is general, and a list stays valid, so no repository's
configuration changes.

Source: [tasks/the-runbook-is-source.md](../tasks/the-runbook-is-source.md)

## D32 · 2026-11-19 · A map without `source` stops the gate

**Decision** — When `required` is a map it must hold `source`, and in either form
`source` must name at least one role; otherwise the gate stops, naming the
configuration.
**Rejected** — Allowing it, with source then held to nothing; defaulting `source` to the
six-role default.
**Why** — A configuration that holds a source change to nothing is a mistake, not a
staging; and a default would put roles into a repository that nobody chose.

Source: [tasks/the-runbook-is-source.md](../tasks/the-runbook-is-source.md)

## D33 · 2026-11-19 · Written fresh: a section is new when its heading's line was added

**Decision** — The gate takes, from the scene's diff with no context lines (`-U0`), the
numbers of the lines it adds in the scene's version of the file, and counts a
`## What was done` or `## Review` section as the scene's when the line its heading
stands on is one of them. An untracked file is new throughout. A `+++` line is a header
only before the first hunk; after it, it is an added line that begins with `++`.
**Rejected** — Bringing in the team repository's fix, which has not been seen here;
matching the section's whole text, which still confuses two identical sections;
counting a section as the scene's when any line in it was added, which would charge the
scene with an old record it only appended a line to.
**Why** — The heading's own line is what a scene writes when it writes a section, and
its number tells two sections with one heading apart. When the team repository is
re-run (runbook 5.5), its local fix is a local change to be listed; this one replaces
it, and that repository's decision says so.

Source: [tasks/new-records-are-found-by-heading-text.md](../tasks/new-records-are-found-by-heading-text.md)

## D34 · 2026-11-19 · Sections are compared with the base's, not found in the diff

**Decision** — A section is the scene's when the base has no section identical to it,
wherever it stands; of the sections left over, a base section is paired with the scene's
section under the same heading that shares the most lines with it, as an edit, and what
stays unpaired is new. The base is the file at the scene's base plus the task files that
left the scene, so a renamed file keeps its past. Line endings are normalised, and only
`\n` starts a line.
**Rejected** — The line numbers of D33: git chooses which of two identical lines it
reports as added, and charged a new record to an old one; asking git for rename
detection, which a work-tree rename and `diff.renames=false` do not give.
**Why** — The cold reader showed D33 judging the wrong record when a new one is inserted
above an older one, a regression on 0.6.1. Comparing the sections themselves needs no
diff at all, so git's configuration cannot change it.
Supersedes: D33

Source: [tasks/new-records-are-found-by-heading-text.md](../tasks/new-records-are-found-by-heading-text.md)

## D35 · 2026-11-19 · Two findings outside this scene become tasks

**Decision** — The reader's findings on the release check and compiler under unusual git
configuration, and on acceptance boxes judged across the whole file, are
`tasks/diffs-are-read-under-any-git-config.md` and
`tasks/acceptance-boxes-are-judged-where-the-scene-wrote.md`, worked after the six of D7.
**Rejected** — Fixing them in this scene.
**Why** — Both predate this change and lie outside its diff; each needs its own record,
and the second a decision on whether a widened rule should reach old boxes.

Source: [tasks/new-records-are-found-by-heading-text.md](../tasks/new-records-are-found-by-heading-text.md)

## D36 · 2026-11-19 · A section is the scene's unless the base held it, word for word

**Decision** — A `## What was done` or `## Review` section is judged when no task file at
the scene's base holds an identical section (line endings aside). A section that only
moved, by reordering, rename, split or copy, is the base's. One the scene edited is the
scene's and is judged whole, so editing an older record that names no reader is refused
until it does. This reverses the first round's box "an older record the scene only
appended a line to → not judged".
**Rejected** — D34's pairing of left-over sections by heading and shared lines, which a
deleted record, a long new one or a deleted task file made stand for a new section; any
other heuristic that lets one section stand for another.
**Why** — The second reading broke the pairing four ways, and each repair moves the
failure. Identity needs no guess. The cost falls on editing a merged record, which the
form already forbids: such a record then names its reader, or is left as it was.
Supersedes: D34

Source: [tasks/new-records-are-found-by-heading-text.md](../tasks/new-records-are-found-by-heading-text.md)

## D37 · 2026-11-19 · The conversion is worked first

**Decision** — This task is worked ahead of the open tasks ordered by D7 and D35.
**Rejected** — Taking it after them.
**Why** — Erez runs it next, from Sunday 2026-11-22, when the team repository is at hand. Until the repositories are converted, each fix
to the gate reaches them by retyping, which is what 0.6.0 was made to end, and the only
proof that the conversion works is the plugin's own repository.

Source: [tasks/convert-the-adopted-repositories.md](../tasks/convert-the-adopted-repositories.md)

## D38 · 2026-11-19 · The form is four statements quoted from the essay

**Decision** — The form is the principle and one statement for each unity, in the
essay's words: "the work, its record and its location are the same thing at the same
time"; "Everything the work consists of lives in the repository as files"; "The record
of the work and the work itself happen in the same moment", with its corollary that a
change without its record is a scene that did not happen; "there is one record, and
anything else is derived from it, never kept in parallel", and "the check belongs in the
same gesture as the writing". The rest of the essay explains them and shows them in
practice. A staging says how much of the form a repository holds to and is not part of
it. Everything else the plugin ships is tooling. Erez chose the essay's statement over
the runbook's, and then these four statements when the first reading showed that "the
essay" was not precise enough.
**Rejected** — The runbook's §0 as the form, which names tooling and so would move with
it; the essay and §0 together, two texts to keep in step; the essay as a whole, which
names git, commits, pull requests and the gate as its examples; the same four statements
without the check, leaving the cold reading to the tooling.
**Why** — What is held still has to be sentences that no change to a script can reach.
These name the repository and nothing else. That a check happens in the same gesture is
in the form; who reads, and the `Reviewed by:` line, are how the tooling does it.

Source: [tasks/the-form-has-its-own-version.md](../tasks/the-form-has-its-own-version.md)

## D39 · 2026-11-19 · The form is 1.0 as it stands today

**Decision** — The form is at version 1.0, dated 2026-11-19, first numbered in plugin
0.6.3. The plugin keeps its own number and its 0.6 line. Erez chose this.
**Rejected** — 1.0 dated to the essay (14 October 2026), which would claim the essay
stood still since, when it was edited in three commits on 2026-11-19; a number below 1.0
until the team has worked with it.
**Why** — The team is learning it now, and what they learn should be something that has
a number and stays.

Source: [tasks/the-form-has-its-own-version.md](../tasks/the-form-has-its-own-version.md)

## D40 · 2026-11-19 · What changes the form, and where it is written

**Decision** — A change to the form is a change to one of the four statements. It is
made only by a decision that names the new form version, in a task Erez opened for it.
The form is read, with its version, in the runbook's §0; the README states the version
and points there, and `docs/SPEC.md` holds the rule. §0 names the essay the statements
are quoted from by its public URL. Beside the form's version stands the plugin version
it arrived in. The essay is not touched in this scene.
**Rejected** — Writing the version into the essay here, which is Erez's and is changed
only when he asks; pointing §0 at the essay alone, or at it by a path in the plugin's
repository, neither of which a repository that adopted the Unities can open; a version file of its own, a third place to read; a date alone
beside the version, which cannot tell two plugin versions of one day apart; letting any
scene that finds the form wanting change it.
**Why** — §0 is what travels to every repository with the runbook, so the form can be
read where the work is done. The plugin version beside it answers "did the form change
in this version?" from the file alone. Whether the essay carries the number too is
Erez's to say.

Source: [tasks/the-form-has-its-own-version.md](../tasks/the-form-has-its-own-version.md)

## D41 · 2026-11-19 · A finding that would grow the gate waits for what happened

**Decision** — A reader's finding whose answer would make the gate refuse something it
lets through, or handle a case it does not handle, is admitted when the case happened
in a repository, or when it breaks something a task file's promise or acceptance, or a
test, already says. Otherwise it is not admitted and the gate is unchanged. Every other
finding (about the record, the docs, a fault in what the scene itself wrote) is answered
in the scene as before.
**Rejected** — Building every finding, which is how one question took three decisions
in a day (D33, D34, D36); admitting by how likely a case seems, which is the reader's
guess again; applying the rule to all findings, which would let a false record stand.
**Why** — A reader asked what is wrong always finds something, so only what happened
can end the list. A regression is admitted by the second clause: the test it breaks is
the promise.

Source: [tasks/a-check-is-admitted-from-what-happened.md](../tasks/a-check-is-admitted-from-what-happened.md)

## D42 · 2026-11-19 · Erez rules, and until he does a finding is not admitted

**Decision** — The agent writes the finding into the task file, tells Erez what it would
rule, and Erez rules. Until he admits it, it is not admitted. Erez chose to rule
himself.
**Rejected** — The agent ruling and Erez reversing by a superseding decision; holding
the scene uncommitted until he rules, which leaves a change unrecorded when he is away.
**Why** — The cost of a check is paid by everyone the gate runs for, and he is the one
who knows what happened in their repositories. A default keeps the scene whole in one
sitting.

Source: [tasks/a-check-is-admitted-from-what-happened.md](../tasks/a-check-is-admitted-from-what-happened.md)

## D43 · 2026-11-19 · A finding not admitted is a review item and a decision, not a new file

**Decision** — It stays in the task file where it was found: a review item whose *Done
when* reads `<case> → the gate is unchanged`, and a decision titled
`Not admitted: <the case>` with the reason. The compiled `docs/DECISIONS.md` is then the
list of what is known and not built. Runbook 4.11 says, once, that its list of limits
is not that list and where that list is. It gets no line per finding.
**Rejected** — A line in runbook 4.11 for each such finding, as this task's context
proposed: every line would be a change to the procedure and a new plugin version, the
churn this task is against; a `docs/LIMITS.md`, a shared file many scenes would write; a
task file per finding, as D35 did, which puts a step into the plan before anyone has
ruled that the case is to be built.
**Why** — The task file is the record and decisions are already compiled, so nothing
new is needed. 4.11 is for the person adopting.

Source: [tasks/a-check-is-admitted-from-what-happened.md](../tasks/a-check-is-admitted-from-what-happened.md)

## D44 · 2026-11-19 · The rule is this repository's, and the reader's brief does not change

**Decision** — The rule is written in this repository's `CLAUDE.md`, with a paragraph in
`docs/SPEC.md`. `docs/reviewer.md` and the runbook's Appendix G are unchanged.
**Rejected** — Putting the rule into the runbook for every repository; telling the
reader to hold back constructed cases.
**Why** — The gate is changed only here, so only here can a finding grow it; in any
other repository the reader's findings are about that repository's own work. A reader
that filters is a reader that decides, and the ruling is Erez's.

Source: [tasks/a-check-is-admitted-from-what-happened.md](../tasks/a-check-is-admitted-from-what-happened.md)

## D45 · 2026-11-20 · Not admitted: the release check and the compiler under unusual git configuration

**Decision** — Not built. The gate and `compile-changelog.mjs` keep reading git's output
as git prints it by default. Erez ruled: it is handled when it comes to be an issue.
This task stays open and is not worked until then.
**Rejected** — Building it now, on the reader's constructed configurations.
**Why** — None of the four configurations has met the gate in a repository (D41). The
one to watch is `core.autocrlf=true`, the default of Git for Windows, wherever the gate
runs outside WSL.

Source: [tasks/diffs-are-read-under-any-git-config.md](../tasks/diffs-are-read-under-any-git-config.md)

## D46 · 2026-11-20 · The marketplace is named erezschatz

**Decision** — The marketplace's `name` is `erezschatz`, so the plugin is installed as
`unities@erezschatz`. Erez chose it.
**Rejected** — `unities`, which gives `unities@unities` and says nothing;
`unities-plugins`, which promises a collection where there is one plugin.
**Why** — The name is what is typed after the `@`. A user holds one marketplace per
name, and the owner's handle is the one least likely to meet another. A second plugin
of his can be listed under it without a rename, which would cost everyone a reinstall.

Source: [tasks/a-marketplace-file.md](../tasks/a-marketplace-file.md)

## D47 · 2026-11-20 · The plugin stays at the repository's root, and the entry says only where

**Decision** — The marketplace file sits beside `plugin.json`, with one entry, `unities`,
whose `source` is `"./"`. The entry has no `version` and no `description`. The file's
own `description` is "Plugins by Erez Schatz." and its `owner` is his name and GitHub
address.
**Rejected** — Moving the plugin into a subdirectory, as the documentation's examples
do; a description or version on the entry, a second place for what `plugin.json` says;
a marketplace description that describes the plugin, the same second place; no
marketplace description, which `claude plugin validate` warns about.
**Why** — For a relative-path entry Claude Code reads `plugin.json` before the install,
so the entry needs nothing more. The repository is the plugin; a subdirectory would move
every path the runbook, the configuration and the decisions name.

Source: [tasks/a-marketplace-file.md](../tasks/a-marketplace-file.md)

## D48 · 2026-11-20 · No new version

**Decision** — The plugin stays 0.6.4.
**Rejected** — 0.6.5.
**Why** — A version is a change to the procedure (D9). Nothing an adoption runs
changed; how the plugin is fetched did.

Source: [tasks/a-marketplace-file.md](../tasks/a-marketplace-file.md)
