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

## D49 · 2026-11-22 · One function in each script, and every file is read through it

**Decision** — Each of the three scripts has one function that drops a leading
byte-order mark and turns CRLF into LF, and reads every file through it: task files,
the compiled files, `CHANGELOG.md`, and what `git show` returns for the scene and for
its base. The changelog compiler does the same to each added line it takes from
`git log -p`. This is the team repository's fix of 2026-11-17, taken from the patch
against the 0.6.4 masters that its session wrote out on 2026-11-22 and Erez brought
here. Its tests were not in the patch; the tests here were written for this change.
**Rejected** — Normalising only where a pattern was seen to fail; a `.gitattributes`
rule in every repository instead, which fixes line endings and not the byte-order mark,
and which a planted script cannot check.
**Why** — It happened: on a Windows checkout a line such as `- [ ] box` ends in a
carriage return, and none of the gate's patterns that end in `(.+)$` match it, so
acceptance boxes and review items went unread.

Source: [tasks/the-compilers-read-crlf-and-a-bom.md](../tasks/the-compilers-read-crlf-and-a-bom.md)

## D50 · 2026-11-22 · The configuration and the manifest are read the same way

**Decision** — Beyond that patch, the gate's configuration is read through the same
function in all three scripts, and so is the manifest, since the gate reads it as it
reads any file of the scene.
**Rejected** — Leaving `JSON.parse` on the raw bytes, as the patch did.
**Why** — `JSON.parse` refuses a byte-order mark. The same editor that puts one on a
task file puts one on `unities.json`, and the gate would then stop on a configuration
that is fine. This case was not met in that repository; it is included because every
read going through one function is the fix's own shape, and leaving one read out is the
exception that would need explaining.

Source: [tasks/the-compilers-read-crlf-and-a-bom.md](../tasks/the-compilers-read-crlf-and-a-bom.md)

## D51 · 2026-11-22 · What follows from it, accepted

**Decision** — Three consequences stand. A planted script that differs from the master
only by a byte-order mark passes the manifest check, as one that differs only by CRLF
already did (D23). `compile-record.mjs --check` takes a compiled file checked out with
CRLF as up to date. `compile-changelog.mjs` writes `CHANGELOG.md` back with LF.
**Rejected** — Keeping the byte-order mark in the hash; writing files back in the line
endings they were read in.
**Why** — None of these is content. What git checks out or commits for line endings is
the repository's own setting, and the scripts no longer depend on it.

Source: [tasks/the-compilers-read-crlf-and-a-bom.md](../tasks/the-compilers-read-crlf-and-a-bom.md)

## D52 · 2026-11-22 · "plan": false in the configuration, read by the gate and the record compiler

**Decision** — A repository that keeps no compiled plan sets `"plan": false` in
`.claude/hooks/unities.json`. `compile-record.mjs` reads the configuration for it and
then writes and checks `docs/DECISIONS.md` alone; the gate leaves `docs/PLAN.md` out of
the compiled files. Absent or `true`, nothing changes. A value that is neither stops the
gate and the compiler, each naming the configuration; so does a configuration the
compiler cannot parse, and it exits 3, which until now meant only an invalid record. This reverses one sentence of D22, that
`compile-record.mjs` has no per-repo values; the rest of D22 stands.
**Rejected** — A `--no-plan` flag, which the gate and every caller would each have to
pass; taking a missing `docs/PLAN.md` to mean no plan, which lets a deleted plan stop
being asked for; a nested key such as `record.plan`, for one value; a new exit code for
the compiler, which the gate would have to learn.
**Why** — The team repository switched its plan off by editing its copy, which 0.6.0
ended. The configuration is where a repository's own values now live, and both scripts
must agree, so both read the one key. The two lines of that repository's change that let
the plan's path be empty are taken as they were shown in its patch.

Source: [tasks/the-plan-can-be-switched-off.md](../tasks/the-plan-can-be-switched-off.md)

## D53 · 2026-11-22 · With the plan off, docs/PLAN.md is an ordinary file and plan lines go nowhere

**Decision** — With `"plan": false` a `docs/PLAN.md`, if the repository has one, is a doc
like any other: written by hand, counted as a doc change, never compared with the
compiler. `Milestone:` and `Not in scope:` lines in decisions stay in the decisions and
are compiled into no plan. The runbook says so in one place, the `plan` row of Appendix
A, which also says that what the runbook, the standing paragraph and the gate's messages
say of `docs/PLAN.md` as a compiled file does not apply there. The gate's refusal of an
outcome box no longer points such a repository to a `PLAN.md` milestone, and the
Azure DevOps pipeline of Appendix I stages `docs/PLAN.md` only when it is compiled.
**Rejected** — Refusing a `docs/PLAN.md` where the plan is off; refusing or warning
about plan lines there; a second wording of every passage of the runbook that mentions
the plan.
**Why** — Neither has happened in a repository (D41). The repository that asked for this
wants no plan at all, and what it does with a file of that name is its own business.

Source: [tasks/the-plan-can-be-switched-off.md](../tasks/the-plan-can-be-switched-off.md)

## D54 · 2026-11-22 · 0.6.5, with the line-ending change

**Decision** — This and `tasks/the-compilers-read-crlf-and-a-bom.md` are one scene and
one version, 0.6.5.
**Rejected** — Two versions.
**Why** — One repository waits on both, they touch the same three scripts, and its
conversion is re-run once.

Source: [tasks/the-plan-can-be-switched-off.md](../tasks/the-plan-can-be-switched-off.md)

## D55 · 2026-11-22 · A box is ticked by whoever performed its check, the agent included

**Decision** — The agent ticks a box it checked by reading the code or by a command
whose output it reports, and a review box the reader found to hold. It does not ask a
person to tick those. A box that can only be checked by running the program stays open and is
handed to the person the division of labour names, those boxes alone, each with what to
do and what should be seen.
**Rejected** — Every tick is the person's, as the agent in that repository read its
rule: the person then confirms what they did not check, and the one check that is theirs
is lost among three that are not. The agent ticking every box, including those that need
the running program: it has not seen the program run.
**Why** — A tick says a check was performed. The scene's developer is one person with
the agents that act for them (Appendix D), so the one who performed the check is the one
who can say so. What stays a person's is what 3.2 already keeps for one: saying it works
where it runs.
Not in scope: changing that repository's `AGENTS.md`, D14 or `docs/working-on-a-task.md`; that is a scene in that repository.

Source: [tasks/whoever-checks-a-box-ticks-it.md](../tasks/whoever-checks-a-box-ticks-it.md)

## D56 · 2026-11-22 · The rule is prose in 4.7 and the standing paragraph; the gate and the brief do not change

**Decision** — 4.7 states the rule once, under *Acceptance boxes*. The standing
paragraphs of Appendix E carry it as an instruction to the agent, since that paragraph
is what an agent in a deployment reads. 4.8 tells the guide to say it. The gate, the
reader's brief and the form (1.0) are unchanged.
**Rejected** — A gate check on who ticked: a tick carries no author, and 4.7 already
says who ticks is not part of the form. Having the reader tick: its brief says "Change
nothing", and a reader that edits the file it reads is no longer reading cold.
**Why** — What went wrong was an instruction read wrongly, not a scene the gate let
through. The fix belongs where the instruction is.

Source: [tasks/whoever-checks-a-box-ticks-it.md](../tasks/whoever-checks-a-box-ticks-it.md)

## D57 · 2026-11-22 · 0.6.6

**Decision** — The plugin is 0.6.6: the runbook's first line,
`.claude-plugin/plugin.json` and both manifests.
**Rejected** — Holding the change for the next version that changes a script.
**Why** — A change to the procedure is a version (`CLAUDE.md`, *Code rules*).

Source: [tasks/whoever-checks-a-box-ticks-it.md](../tasks/whoever-checks-a-box-ticks-it.md)

## D58 · 2026-11-22 · Who writes the review section is left as the runbook has it

**Decision** — 4.7 *Review rounds*, Appendix D and `tasks/README.md` go on saying the
review section is written "by whoever reviews", while the brief says whoever asked the
reader writes its findings. Known, and not changed in this scene.
**Rejected** — Rewording the three places here.
**Why** — For a person who reviews, "whoever reviews" is right; only for a read-only
reader does someone else hold the pen, and the brief already says so to that reader.
The wording predates this task and nothing went wrong by it.

Source: [tasks/whoever-checks-a-box-ticks-it.md](../tasks/whoever-checks-a-box-ticks-it.md)

## D59 · 2026-11-22 · A recorded task is done only when no box in its file is open

**Decision** — `compile-record.mjs` counts the open boxes (`- [ ]`) in each task file.
A step with a `## What was done` section reads `done` when the count is zero and
`recorded, N boxes open` otherwise. A step with no record carries no status and no
count, as before. The gate is unchanged by this scene. It refuses nothing for an open
acceptance box; at the pull request it refuses a review item the scene adds while one of
its *Done when* boxes is open, as it did.
**Rejected** — Leaving `done` as it was and saying it only in the standing paragraph,
which 0.6.6 did and which does not show in the plan; having the gate also refuse a
record while an acceptance box is open, which would refuse every scene whose last check can only be made
after it is pushed, as the install from GitHub was; a count on steps with no record,
where every box is open and the number says nothing.
**Why** — It happened in two repositories. The plan is where Erez reads what is
finished, and it said so of tasks that still owed him a check.

Source: [tasks/the-plan-says-when-boxes-are-open.md](../tasks/the-plan-says-when-boxes-are-open.md)

## D60 · 2026-11-22 · Every box in the file counts, not only the acceptance boxes

**Decision** — The count is of every open box in the task file outside a fenced block:
the acceptance boxes and the *Done when* boxes of every review. A box is a line the gate
takes for one, written with `-` or with `*`.
**Rejected** — Counting acceptance boxes only; skipping the boxes of a review item that
became a task of its own.
**Why** — Erez's words were about boxes, not about a kind of box, and an unanswered
review item is owed as much as an unperformed check. An item that moved to its own task
file keeps its open boxes in the file where it was found, since a record is not edited;
that file then reads `recorded` until the other task closes and somebody ticks them.
In this repository that is `tasks/new-records-are-found-by-heading-text.md`, with seven.
A fenced block is skipped because a task file may quote a box, as a template does.

Source: [tasks/the-plan-says-when-boxes-are-open.md](../tasks/the-plan-says-when-boxes-are-open.md)

## D61 · 2026-11-22 · 0.6.7

**Decision** — The version is 0.6.7.
**Rejected** — No new version.
**Why** — A planted script changed, and with it what an adopted repository's compiled
plan says (D9).

Source: [tasks/the-plan-says-when-boxes-are-open.md](../tasks/the-plan-says-when-boxes-are-open.md)

## D62 · 2026-11-22 · Admitted: a change held to a task change must add a record

**Decision** — Erez admitted this on 2026-11-22, in chat: "yes, this has to be
enforced." The gate refuses a scene that changes a file in a role held to a task change
and adds no `## What was done` section to any task file.
**Rejected** — Leaving it as the known limit of runbook 4.11 until a pull request is
seen to pass without a record.
**Why** — It was not shown to have happened in a repository. Erez admitted it on what
the standing paragraph every adopted repository carries already says, that a change to
source also carries a `## What was done` section: the gate let through what the
instructions forbid. That is not one of the two grounds D41 lists; the ruling is his
(D42).

Source: [tasks/the-gate-does-not-require-a-record.md](../tasks/the-gate-does-not-require-a-record.md)

## D63 · 2026-11-22 · Owed by every role held to a task change, in every mode

**Decision** — The record is owed when the scene changes a file in any role whose
`required` list names `task`: source where its list names it, as the default and this
repository's do, and whatever else a repository holds to a task change, as this one
holds the runbook and the skill. A repository whose source list leaves `task` out owes
no record, as it owed no task change. A section counts as added by
the same test the reader's line uses: one the base did not hold word for word. The check
runs in every mode and is refused as every other finding is: at the commit and the end
of the turn in strict, at the pull request in adapted, where `--staged` and `--branch`
say it and let the commit stand. Where no task file changed at all, the older message
"no task change" stands alone.
**Rejected** — Source only, which would leave a procedure held to a task change open to
the same line-anywhere pass; a check in `--pr` alone in adapted with nothing said at the
commit, which is not how the gate treats any other finding there; asking that the record
be in the same task file that was touched.
**Why** — "Held to a task change" already means "must be recorded"; the check makes the
task change mean the record. This task's Context asked for strict at `--staged` and
`--branch` and adapted at `--pr`, and that a scene which only opens a task still passes;
both hold.

Source: [tasks/the-gate-does-not-require-a-record.md](../tasks/the-gate-does-not-require-a-record.md)

## D64 · 2026-11-22 · 0.6.8

**Decision** — The version is 0.6.8.
**Rejected** — Folding it into 0.6.7.
**Why** — 0.6.7 was committed as its own scene, and this changes what the gate refuses
(D9).

Source: [tasks/the-gate-does-not-require-a-record.md](../tasks/the-gate-does-not-require-a-record.md)

## D65 · 2026-11-22 · A scene that undoes a recorded scene owes a record of its own

**Decision** — A commit or pull request that takes a recorded change back out (source,
test and doc restored, the `## What was done` section removed) is refused as "no
record", since it changes a role held to a task change and adds no section. That is
left as it is. The undoing is recorded as any change is: the earlier section stays, and
a new one says what was taken out and why.
**Rejected** — An exemption for a scene that removes a section; saying nothing of it.
**Why** — Found by the reader; it has not happened in a repository. A record is not
edited once merged, so removing one was never the form, and taking a change out is a
change to source like any other. Erez may rule otherwise.

Source: [tasks/the-gate-does-not-require-a-record.md](../tasks/the-gate-does-not-require-a-record.md)

## D66 · 2026-11-23 · No setting keeps the old --tree Stop

**Decision** — The strict staging gets no configuration value that turns its `Stop` into a
report. The procedure itself says that a turn may stop to discuss, and the gate follows
it in every repository.
**Rejected** — The asked-for `"stop": "advise"`, which keeps a repository's old `--tree` mode
alive under a new name.
**Why** — Erez: asks of this kind are attempts to keep what was over what is, and the
plugin is there to replace what was with what is. A repository whose reading differs
needs the procedure clarified, not a switch.

Source: [tasks/a-turn-may-stop-to-discuss.md](../tasks/a-turn-may-stop-to-discuss.md)

## D67 · 2026-11-23 · No door for hand edits to the head; the upgrade replaces it

**Decision** — The head of a compiled file stays closed to ordinary scenes. A stale head
is replaced by the scene that installs a new version, as 4.7 already says.
**Rejected** — The ask for a scene that touches only the head and a task file whose
decision explains it, which keeps the old head and patches it by hand.
**Why** — Erez: the plugin replaces what was with what is; where that leaves an existing
file wrong, the file is replaced.

Source: [tasks/an-upgrade-may-rewrite-the-head.md](../tasks/an-upgrade-may-rewrite-the-head.md)

## D68 · 2026-11-23 · Not admitted: a broken configuration crashes the gate

**Decision** — Not built until Erez rules. The gate keeps its present checks of
`unities.json`.
**Rejected** — Building the refusals on the reader's word.
**Why** — No broken configuration has met the gate in a repository, and until Erez
admits a finding of this kind it is not admitted. The case for admitting it is in
*Context*.

Source: [tasks/a-broken-configuration-is-refused-not-crashed.md](../tasks/a-broken-configuration-is-refused-not-crashed.md)

## D69 · 2026-11-23 · Not admitted: an edited merged record passes as a new one

**Decision** — Not built. The gate keeps counting a section the scene edited as the
scene's, judged whole.
**Rejected** — Refusing an edited merged section, on the reader's constructed case.
**Why** — It has not happened in a repository, and until Erez admits a finding of this
kind it is not admitted.

Source: [tasks/an-edited-merged-record-passes.md](../tasks/an-edited-merged-record-passes.md)

## D70 · 2026-11-23 · The gate waits a second for a hook's JSON, then answers as a run by hand

**Decision** — In the hook modes, `--branch` and `--staged`, the gate reads stdin until
it closes, as before, but once stdin has been silent for a second, before the first byte
or between two, it stops reading and closes stdin. What it read is used if it is whole
JSON; otherwise it is dropped, the gate says so on stderr, and goes on with no hook
input, as a run by hand does. `--pr` and a TTY still
skip stdin.
**Rejected** — A `--hook` flag in the wiring (Appendix B, the Codex hooks), with stdin
read only under it: every adopted repository's `settings.json` would have to change with
the scripts, and a wiring left without the flag would lose `stop_hook_active`, so a
strict `Stop` would send every turn back without end. Telling a hook's pipe from an
agent's shell by `fstat`: both are pipes.
**Why** — A hook writes its JSON as it starts the gate, so a second of silence is far
more than a hook needs, and a run by hand pays at most that second. A hook so slow that
its input comes later loses it, and with it `stop_hook_active`. The stderr line says so
to whoever reads stderr: a terminal, and the agent when the gate then refuses with exit 2,
since Claude Code hands the agent a refusing hook's stderr. When the gate then exits 0,
Claude Code may show that line only in verbose mode or the transcript; that is not
verified here.

Source: [tasks/the-gate-does-not-wait-on-an-open-stdin.md](../tasks/the-gate-does-not-wait-on-an-open-stdin.md)

## D71 · 2026-11-23 · A broken configuration is refused by name

Supersedes: D68

**Decision** — Admitted by Erez, 2026-11-23, in chat ("Yes, admit and build"), because
runbook 4.11 already says a broken configuration is refused. `readConfig` refuses, by
name, a file that is not a JSON object, a `rules` that is not a map, a rule or
`releaseFiles` that is not a string or will not compile, and a `run` that is not a
non-empty string, through the same `fail` as a missing key, so a `Stop` lets go on its
second pass. Both compilers refuse a file that is not a JSON object, and
`compile-changelog.mjs` one that is not valid JSON and a `changelog.recorded` that is not
a string (`null` included, which used to fall back to the default line), by name.
**Rejected** — A schema file, or validating keys nothing reads; checking `base` and
`plugin` beyond their presence, which is the decision below.
**Why** — A crash is exit 1, which Claude Code takes from a `PreToolUse` hook as a
non-blocking error, so the commit the configuration was meant to hold could go through.

Source: [tasks/a-broken-configuration-is-refused-not-crashed.md](../tasks/a-broken-configuration-is-refused-not-crashed.md)

## D72 · 2026-11-23 · Not admitted: a record compiler that cannot be run passes

**Decision** — Not built. The gate takes 3 from the record compiler as a refusal and 1
as out of date, as before; any other exit, such as 127 when the runtime in `run` is not
installed, or a kill by a signal, passes as if the record had been checked.
**Rejected** — Refusing it, as the patch this task was built from did: Erez admitted the
cases in *Context*, which do not include it.
**Why** — It has not happened in a repository. What Claude would rule: admit it, since a
`run` naming a runtime that is not installed is what the Deno task
(`tasks/the-gate-runs-under-deno-without-a-shell.md`) can meet, and a gate that could not
check the record should not answer as if it had. The patch's check and test are kept in
the saved patch.

Source: [tasks/a-broken-configuration-is-refused-not-crashed.md](../tasks/a-broken-configuration-is-refused-not-crashed.md)

## D73 · 2026-11-23 · Not admitted: a wrong base or plugin passes silently

**Decision** — Not built. Under the adapted staging, `--branch` with a `base` that is
`null` or names no branch exits 0 without a word; `--pr` with a target that does not
exist stops with its own error, as before. In the plugin's repository a `plugin` that is
not a string skips the planted-copy check without a word.
**Rejected** — Refusing them by name with the other keys, which the cold reader of this
scene found and which nobody admitted.
**Why** — Neither has happened in a repository. A wrong `base` in a team repository would
silence the end-of-turn advice, not the pull request's gate, which names its target.

Source: [tasks/a-broken-configuration-is-refused-not-crashed.md](../tasks/a-broken-configuration-is-refused-not-crashed.md)

## D74 · 2026-11-23 · A correction to a record is allowed and is not a record

Supersedes: D69

**Decision** — Admitted by Erez, 2026-11-23, in chat. Fixing a record that is already
there, a mistake or something added by accident, is not part of the scene's action and
is never refused for it. It is not the scene's record either: "no record" is answered
only by a `## What was done` the scene adds, told from an edited one by the diff.
Records copied by hand from one task file into another are not designed for: the gate
does not try to tell a copy from new work.
**Rejected** — Keeping the gate as it is and changing runbook 4.7 and Appendix D to say a
correction counts as a record; refusing edits to merged records.
**Why** — Erez: "The idea was never to prevent updates and fixes", and "If someone starts
copy pasting stuff between tasks rather than using the available tools, then we shouldn't
validate this by trying to figure how to support it." The runbook already says a touched
task file is not a record; the gate is brought to it.

Source: [tasks/an-edited-merged-record-passes.md](../tasks/an-edited-merged-record-passes.md)

## D75 · 2026-11-24 · A changed record is a correction when half its words are a record the scene no longer holds

**Decision** — A `## What was done` the base did not hold word for word, in any task
file, is a correction when at least half the words below its heading, counted against the
longer of the two, are those of a record the base held more times than the scene still
does, across all task files. Each such base record corrects at most one section, and as
many changed records are paired with originals as can be; the closest records try first,
so where not all can be paired, the closest are. Task files are read in path order, so
every mode gives the same answer. Anything else is new: it is the scene's record and must name
its reader. Corrections are not asked for
a reader and do not answer "no record". Records that only moved, word for word, are still
the base's, as before.
**Rejected** — Counting `## What was done` sections per task file against its own
version at the base, the rule first proposed: it needs git's rename detection to find a
renamed file's base version, and it cannot say which of a file's changed sections is the
new one, so a correction in the same file as a new record would be asked for a reader.
Taking the changed sections least like the base as the new ones, up to the count: a
ranking, where a fixed share is one rule. Reading which lines git's diff marks as added:
the same heading line repeats in every record, and git may pair a new record's heading
with an old one's.
**Why** — It tells an edit from new work by the words, which is what the diff shows a
person, without pairing files or reading git's alignment. A long new record is judged on
its own words, not hidden by a short edited one. A new record written in place of a
deleted one is judged when it shares less than half that one's words; one that shares
more passes as its correction (the decision below).

Source: [tasks/an-edited-merged-record-passes.md](../tasks/an-edited-merged-record-passes.md)

## D76 · 2026-11-24 · Not admitted: a new record that reuses half the words of one it deletes passes as a correction

**Decision** — Not built. The cold reader of this scene deleted a read record of 15 words
and wrote new work sharing 9 of them, with no reader; it passed as a correction. Among
this repository's 42 records, two pairs from separate scenes score 0.50 and 0.51.
**Rejected** — Raising the share, or judging corrections by more than their words, on
the reader's constructed case.
**Why** — It has not happened in a repository, and it needs a record deleted, which is
not a correction. Erez has not ruled on this case. What Claude would rule: not admitted,
in the spirit of his ruling on records copied between task files.

Source: [tasks/an-edited-merged-record-passes.md](../tasks/an-edited-merged-record-passes.md)

## D77 · 2026-11-24 · Not admitted, by Erez: a new record that reuses half the words of one it deletes

Supersedes: D76

**Decision** — Not built, and not to be. Erez ruled on 2026-11-24, in chat, after the
case was put to him as it affects people using the plugin: an earlier record can be
overwritten in a task file without being flagged and without a reader named for the
rewrite, but a change to source still needs a new record.
**Rejected** — Raising the share, or judging an entry by its meaning, to catch it.
**Why** — Erez: "it feels like an edge case that is just dipping into heuristics that are
never going to fully pick up the 1% of cases that should be flagged, and even that 1% is
probably ok if you really think about it, we're working in a software project, not
proving a mathematical theorem here."

Source: [tasks/an-edited-merged-record-passes.md](../tasks/an-edited-merged-record-passes.md)

## D78 · 2026-11-24 · Programs by name, the environment whole

**Decision** — The gate and the changelog compiler start git, and the runtime named in
`run`, with `spawnSync` and a list of arguments, never a shell; `run` is split on spaces.
Under Deno, `--allow-run` names `git` (and `deno` for the gate); `--allow-env` is given
whole, to the gate and to the changelog compiler.
**Rejected** — Keeping `--allow-env=TF_BUILD,UNITIES_SCENE`, or adding `PATH` and `HOME`
to it: measured under Deno 2.9.8, spawning git without a shell still throws `NotCapable`
with either, because Deno gives a child the whole environment and asks leave to read all
of it. Handing each child a chosen environment instead: git needs what its caller set,
such as `GIT_INDEX_FILE` from a hook, and a chosen list would drop what nobody listed.
Allowing `/bin/sh`, which allows any program.
**Why** — Which programs the scripts may start is what a Deno permission protects;
reading the environment the scripts already run in gives nothing a shell would.

Source: [tasks/the-gate-runs-under-deno-without-a-shell.md](../tasks/the-gate-runs-under-deno-without-a-shell.md)

## D79 · 2026-11-24 · Not admitted: a release pull request with no tag at its base is refused

**Decision** — Not built. In the gate's release check, `git describe` throws where the
base has no tag, so the fallback to the root commit is never reached and a release pull
request is refused with "(compiler failed)". The old shell call did the same; this
scene's conversion kept it.
**Rejected** — Catching the throw so the fallback runs, as `compile-changelog.mjs` now
does, which the cold reader of this scene found and nobody admitted.
**Why** — It has not happened in a repository: every adopted one releases from a tag.
What Claude would rule: admit it, since the code's own fallback says what was meant.

Source: [tasks/the-gate-runs-under-deno-without-a-shell.md](../tasks/the-gate-runs-under-deno-without-a-shell.md)

## D80 · 2026-11-24 · A record compiler that cannot be run is refused

Supersedes: D72

**Decision** — Admitted by Erez, 2026-11-24, in chat ("Admit both"). The gate takes 0, 1
and 3 as the record compiler's answers; a compiler that does not start, is killed, or
exits with anything else is refused as an incomplete scene, "record compiler could not be
run", with the command, what happened, and `run` named as the thing to check.
**Rejected** — Ending the message with something other than the incomplete-scene advice
the gate gives every refusal: the `run` pointer inside the message says what to fix.
**Why** — Once the scripts ran under Deno without a shell (0.6.12), a repository on Deno
with `run` unset had its compilers started with `node`, which Deno does not allow, and
every uncompiled decision passed unchecked.

Source: [tasks/a-broken-configuration-is-refused-not-crashed.md](../tasks/a-broken-configuration-is-refused-not-crashed.md)

## D81 · 2026-11-24 · A release pull request with no tag at its base is compared from the first commit

Supersedes: D79

**Decision** — Admitted by Erez, 2026-11-24, in chat ("Admit both"). Where `git describe`
finds no tag at the base, the release check compares the changelog with the compiler's
output from the first commit, as `compile-changelog.mjs` does.
**Rejected** — Leaving it to refuse with "(compiler failed)".
**Why** — The fallback was always written there; it never ran.

Source: [tasks/the-gate-runs-under-deno-without-a-shell.md](../tasks/the-gate-runs-under-deno-without-a-shell.md)

## D82 · 2026-11-24 · Not admitted: a record compiler Deno will not let read answers as out of date

**Decision** — Not built. With `run` set to `deno run` or `deno` without `--allow-read`,
the record compiler starts, fails with `NotCapable` and exits 1, which is its "out of
date" answer: in the adapted staging the gate passes without a word, in strict it refuses
with "compiled record is out of date" and Deno's stack trace. The gate cannot tell that 1
from the real one without the compiler answering differently.
**Rejected** — Giving the compiler an exit code of its own for a failure, which the cold
reader of this scene found and nobody admitted.
**Why** — It has not happened in a repository; Appendix H's `run` carries `--allow-read`.

Source: [tasks/a-broken-configuration-is-refused-not-crashed.md](../tasks/a-broken-configuration-is-refused-not-crashed.md)

## D83 · 2026-11-24 · A scene ends at its commit; the strict Stop only advises

**Decision** — Ruled by Erez, 2026-11-24, in chat ("Yes, build it"). A scene ends when its
work is committed, or when the person decides to abandon it, and only an abandoned scene
is reverted. A turn that ends to ask or to discuss does not end the scene, and an agent
that is unsure stops and asks. In both stagings the `Stop` hook tells the agent once,
and the person, what the uncommitted change still lacks, and never refuses the turn or
says to revert; in strict the commit stays refused until the scene is complete. Under
Codex, whose one channel to the agent at `Stop` is to continue the turn, the note
continues it once, as the adapted staging already does, with a note that says stopping is
fine. The runbook says what ends a scene in §1, and the standing paragraphs carry the
stop-and-ask line.
**Rejected** — Keeping the one send-back with a note that does not say revert: being sent
back still reads to the agent as "you may not stop here", which argues against the
question it stopped to ask, and in strict the commit already refuses what the send-back
was there to catch.
**Why** — Erez: "If anything here is telling the llm 'don't stop no matter what' then we
are sailing down the wrong river." "The turn is not done just because a question is
raised. A turn is done once the commit is made." A stop-and-ask line only helps where the
agent sees something to ask about; it does not catch the agent that sees nothing to ask.

Source: [tasks/a-turn-may-stop-to-discuss.md](../tasks/a-turn-may-stop-to-discuss.md)

## D84 · 2026-11-24 · An upgrade is told by the manifest's version; the decisions before adoption stay closed

**Decision** — Ruled by Erez, 2026-11-24, in chat ("Use the manifest version, keep the
old decisions closed, build it"). A scene is an upgrade when the planted manifest
(`.claude/hooks/unities.manifest.json`) carries a different `version` at the scene than at
its base. An upgrade may change the head of either compiled file above the first decision
the head holds, the one recorded before adoption (5.4); from that decision to the marker
the head stays as it was, and one that is wrong is superseded by a new decision, as now.
In the adapted staging an upgrade may touch the compiled files for their head alone:
what is below the marker must be as the base had it, since it is compiled after the merge.
**Rejected** — Treating the whole head as the upgrade's, which would make the decisions
recorded before adoption editable once per version; telling an upgrade by the runbook's
first line in `docs/UNITIES.md`, which is a document any scene may edit, where the
manifest is checked by hash against the planted scripts.
**Why** — The head holds two things: words about the record, which a new version can make
wrong, and decisions, which are history and are reversed only by a new entry.

Source: [tasks/an-upgrade-may-rewrite-the-head.md](../tasks/an-upgrade-may-rewrite-the-head.md)

## D85 · 2026-11-24 · The closed part of a head starts at its first numbered entry or heading

**Decision** — In `docs/DECISIONS.md` the decisions recorded before adoption begin at the
head's first line that is a numbered entry (`D<n> ·`) or a heading below the title (`##`,
`###`), whichever comes first, and run to the marker; spaces and tabs before the entry
belong to it, blank lines before it to the introduction. A `docs/PLAN.md` head holds no
decisions (5.4 moves its milestones out), so an upgrade may rewrite all of it.
**Rejected** — Taking only `D<n> ·` entries, which left a decision written `## D1 — …` or
`### <date> · …` open to an upgrade, as the cold reader of this scene showed; applying the
same rule to `PLAN.md`, where a heading such as `## Phases` is the introduction 5.4 keeps.
**Why** — Runbook 5.4 keeps the old entries exactly as they were written, so their form
varies; a numbered line or a heading is what they usually start with, and an introduction
rarely has one. An entry written some other way, such as `**D1** — …` or a numbered list,
is not closed, and none is known to be written so.

Source: [tasks/an-upgrade-may-rewrite-the-head.md](../tasks/an-upgrade-may-rewrite-the-head.md)

## D86 · 2026-11-24 · Not admitted: a manifest whose version alone is changed passes as an upgrade

**Decision** — Not built. A scene that changes only the planted manifest's `version`,
installing nothing, counts as an upgrade and may rewrite the heads above their decisions.
**Rejected** — Requiring an upgrade to change a planted script as well, which the cold
reader of this scene suggested: an upgrade whose version changed only the runbook leaves
every hash the same and would be refused.
**Why** — It needs the manifest edited by hand, which nothing else in a repository does,
and what it can reach is the introduction of two files, never a decision. Erez chose the
manifest's version as the signal. What Claude would rule: not admitted.

Source: [tasks/an-upgrade-may-rewrite-the-head.md](../tasks/an-upgrade-may-rewrite-the-head.md)

## D87 · 2026-11-26 · A box runs what the project ships; it never waits on another thing's state

**Decision** — An acceptance box may exercise what the project ships wherever it runs:
another operating system, another agent, a clean machine, a week as someone's main app, a
client trying it on their side. A box may not wait on the state of anything that is not
the project: another repository taking a version, an old app removed, a client leaving a
tool, a third person installing it. Such a box is an outcome, moved to the promise or a
milestone as the runbook already says of users and production. Runbook 4.7 states it, and
Appendix D, the skill and `tasks/README.md` point to it. This reverses the clause of D6
that the plugin is verified in other repositories "which each open task names in its own
acceptance", and the last sentence of D5, that `tasks/verify-the-codex-binding.md` is run
in another repository: it is run in a repository set up for the check. The rest of D5 and
D6 stands: the bindings D5 left out stay out, and D6's plan still has no phases and no
final run.
**Rejected** — Refusing any box checked outside this repository, which would leave
Windows, Codex and a clean install, features of this project, untestable; keeping the
rule at users and production, which is what let the two boxes in.
**Why** — Erez's line, above. The work, its record and its place are one; a box closed
by another project's state closes this task somewhere else.
Supersedes: D5, D6

Source: [tasks/a-box-never-waits-on-another-project.md](../tasks/a-box-never-waits-on-another-project.md)

## D88 · 2026-11-26 · Not admitted: an acceptance box that waits on another repository

**Decision** — Not built. The gate's outcome pattern does not catch "the team
repository's conversion is re-run" or "runbook 5.5 is carried out in each", and is not
extended to.
**Rejected** — Adding repository words to `ACCEPTANCE_FORBIDDEN`, which would refuse boxes
this decision allows, such as "under Codex in one repository" in
`tasks/verify-the-codex-binding.md`.
**Why** — The case happened here, so it is admissible. It is judged by the rule's words
and at review instead, because any repository word added to the pattern also matches the
boxes this task allows. Erez has not ruled on it in words of his own. What Claude would
rule: not admitted.

Source: [tasks/a-box-never-waits-on-another-project.md](../tasks/a-box-never-waits-on-another-project.md)

## D89 · 2026-11-26 · A withdrawn box stays in Context as a plain line

**Decision** — A box this task withdraws loses its checkbox and keeps its words, as
`- Withdrawn (tasks/a-box-never-waits-on-another-project.md): <the box as it was>`. The
line is not a box, so the record compiler, unchanged, does not count it as open.
**Rejected** — Ticking it, when no one performed its check; deleting it, when Context is
the brief as it arrived; leaving it open, when no work here can close it.
**Why** — The record keeps what was asked and says why it no longer binds.

Source: [tasks/a-box-never-waits-on-another-project.md](../tasks/a-box-never-waits-on-another-project.md)

## D90 · 2026-11-26 · The conversion of the adopted repositories is withdrawn

**Decision** — All four boxes of `tasks/convert-the-adopted-repositories.md` are
withdrawn, and the task gains none. Its promise and its record stay; the compiled plan
will call it done, and this decision is why. A conversion is the work of the repository
converted, recorded in its own task file. What a conversion brings back to the plugin
arrives here as a task file of its own, as the four it brought already did.
**Rejected** — Replacing its boxes with checks here, when there is no work here to
check; deleting the file, which carries a record and its review.
**Why** — Every box waited on another repository's state.

Source: [tasks/a-box-never-waits-on-another-project.md](../tasks/a-box-never-waits-on-another-project.md)

## D91 · 2026-11-26 · The plan-off conversion is checked in a repository set up for it

**Decision** — The last box of `tasks/the-plan-can-be-switched-off.md`, which waited on
the team repository's conversion, is withdrawn and replaced by a box for the assignee:
runbook 5.5 carried out in a repository set up for the check, whose compiler had been
changed to compile no plan.
**Rejected** — Withdrawing it with nothing in its place: the three script boxes test the
compiler and the gate, not that 5.5 converts such a repository.
**Why** — What 5.5 does to a plan-off repository is a feature of this project, and a
repository set up for the check runs it without waiting on anyone's.

Source: [tasks/a-box-never-waits-on-another-project.md](../tasks/a-box-never-waits-on-another-project.md)

## D92 · 2026-11-26 · 0.6.17

**Decision** — The runbook and the skill change, so the plugin is 0.6.17. The form is
unchanged at 1.0.
**Rejected** — A form version: the form's four statements are unchanged; this says what
one of them already meant for an acceptance box.
**Why** — A change to the procedure is a version (`docs/SPEC.md`, *Versions*).

Source: [tasks/a-box-never-waits-on-another-project.md](../tasks/a-box-never-waits-on-another-project.md)

## D93 · 2026-11-26 · Not admitted, by Erez: an acceptance box that waits on another repository

Supersedes: D88

**Decision** — Not built. Erez ruled on 2026-11-26, in chat, after D88 was put to him: "Not
admitted, record it as the user's ruling".
**Rejected** — Adding repository words, or any other phrase, to `ACCEPTANCE_FORBIDDEN`.
**Why** — Erez: "we cannot, at this moment, gate for words as there is no single phrase
that can be qualified as 'correct' or incorrect. This isn't programming but prose and
design."

Source: [tasks/a-box-never-waits-on-another-project.md](../tasks/a-box-never-waits-on-another-project.md)

## D94 · 2026-11-26 · "Left unchecked" replaces "Not admitted"

**Decision** — A decision recording a case that the gate deliberately does not check is
titled `Left unchecked: <the case>`. Erez's ruling to keep it so is titled
`Left unchecked, by Erez: <the case>`. The rule in `CLAUDE.md` says that he "lets it
into the gate" where it said "admits it". Decisions already compiled keep their titles,
since a decision is not edited; runbook 4.11 names the old title beside the new one so
that both are found. The title of the task that made the rule
(`tasks/a-check-is-admitted-from-what-happened.md`) stays as it is too. A case let into
the gate gets no set title: its decision says what the gate now checks, and supersedes
the `Left unchecked` or `Not admitted` entry if there is one. D41, D42 and D43 are
superseded for their wording only: D41's two grounds for letting a check in, D42's
ruling by Erez, with the gate unchanged until he rules and the agent saying what it
would rule, and D43's review item and decision in the
task file, with 4.11 saying once where they are listed, all stand.
**Rejected** — "Not gated", which Erez found worse; "Known gap", which suggests a hole
waiting to be fixed; "Won't check", which sounds final; "Considered and left out", too
long for a title repeated across entries; retitling the old decisions; renaming
`Admitted:` to a set opposite of "Left unchecked", a second new term no one asked for.
**Why** — "Not admitted" only makes sense to someone who knows the rule behind it. "Left
unchecked" says in plain words that nothing checks the case and that someone chose that.
Supersedes: D41, D42, D43

Source: [tasks/left-unchecked-replaces-not-admitted.md](../tasks/left-unchecked-replaces-not-admitted.md)

## D95 · 2026-11-26 · 0.6.18

**Decision** — The runbook changes, so the plugin is 0.6.18. The form is unchanged at 1.0.
**Rejected** — Leaving the runbook's 4.11 on the old term until another version.
**Why** — A change to the procedure is a version (`docs/SPEC.md`, *Versions*).

Source: [tasks/left-unchecked-replaces-not-admitted.md](../tasks/left-unchecked-replaces-not-admitted.md)

## D96 · 2026-11-26 · The rules say "the developer"; the history keeps its names

**Decision** — In `CLAUDE.md` and `docs/SPEC.md`, every sentence that said the developer, by name, does,
decides or rules on something says the developer, with "they" for the pronoun. The
ruling title in `CLAUDE.md` becomes `Left unchecked, by the developer: <the case>`.
Records written from now on say "the developer" too, in a quote's attribution as
anywhere else; a quote's words stay as they were said, the name among them
if the speaker used it. The essay rule keeps the name, both as the essay's author and
as the one whose request allows a change to it, as the copyright lines and the plugin's
author and owner keep it; the developer's roles no longer include owning the essay. The
handle `erezschatz` in the marketplace's and the repository's names is an identifier,
not a role, and stays.
**Rejected** — Rewriting the task files and `docs/DECISIONS.md`, which would edit
decisions and Context that are not edited and break the rule that a decision is reversed
only by a new entry; "the maintainer", which says less than the word the runbook already
uses for the person in a scene; keeping the name in the rules as the developer's, which
is what made the project read as needing one person; replacing the name inside a quote,
since a quote is the speaker's words and the history keeps its names.
**Why** — The developer: the rules read as if the project needs one named person to
work. A role is
something anyone can take; the history is a record of who did what, and stays true as
written.

Source: [tasks/the-rules-name-a-role-not-a-person.md](../tasks/the-rules-name-a-role-not-a-person.md)
