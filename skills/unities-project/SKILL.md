---
name: unities-project
description: Start a new Claude Code project under the Unities, or migrate an existing repo to them. Use when kicking off a repo, writing CLAUDE.md, when a project lacks SPEC/DECISIONS/PLAN/tasks, or when the user says "unities", "/unities-project", "set this repo up under the Unities" or "plant the runbook".
---

# The Unities — project front door

The discipline, extrapolated from the dramatic unities:

- **Place.** Everything about the project lives in the repo — spec, decisions, plan, tasks, code, tests, changelog. Not in chat, not in a wiki, not in anyone's memory. The test that makes the files appear: **a fresh session — human or Claude — must be able to pick up from the repo alone.** If something needed to continue the work is not in the repo, the previous session failed the discipline. Fix the gap before doing anything else.
- **Time.** The test, the doc update and the task record are written *in the same scene* as the code they describe, and the record is read cold against the diff in that same scene: code, test, document, review are one unit, and a pull request arrives with all four done. Never "later". Whatever is unwritten at the end of a session is lost.
- **Action.** One record, and it is the task files. A task file says what was asked, what was done (`## What was done`) and what was chosen and rejected on the way (`## Decisions`). A task file belongs to one scene (one piece of work, one branch, one developer with whatever agents, reviewers and hooks act for them), and everyone acting in that scene writes in it; two scenes never write the same file. Everything several scenes would otherwise write is *compiled* from the task files and never edited by hand: `docs/DECISIONS.md` and `docs/PLAN.md` at every merge, by the merge man (a script); `CHANGELOG.md` at release. Nothing else claims to be the status.

This skill is the front door. It decides the staging, runs the kickoff, and writes the files that answer the fresh-session test (`CLAUDE.md`, `docs/SPEC.md`, and the task files from which `docs/DECISIONS.md` and `docs/PLAN.md` are compiled). The record, the gates and the two compilers are installed by the runbook, `UNITIES.md`, **which lives in this skill's folder next to this file** (`${CLAUDE_PLUGIN_ROOT}/skills/unities-project/UNITIES.md`). The skill plants it as `docs/UNITIES.md` and carries it out. Do not re-implement the runbook here; if the two disagree, the runbook wins and this skill is updated.

## The runbook is the master copy

`UNITIES.md` in this skill's directory is the only master. Every `docs/UNITIES.md` in a repo is a deployment of it and carries the master's date on its first line. When this skill runs on a repo that already has `docs/UNITIES.md`:

1. compare the date and version on its first line with the one in this folder (a copy with a date and no version is older than one with the same date and a version);
2. if the repo's copy is older, replace it with this folder's copy, and say so;
3. then carry the runbook out — it is idempotent, so a re-run installs only what the newer version adds (and the adoption task records what that was).

Never edit `docs/UNITIES.md` inside a repo. A change to the procedure is a change to the master, a new date on its first line, a new plugin version, then a re-run.

The scripts the runbook plants are masters too: the files in this skill's `files/` folder, with `manifest.json` holding their hashes. A repository gets them by copy and keeps its own values in `.claude/hooks/unities.json`; the gate refuses a planted copy that differs from the manifest. A fix to a script is made here, never in the copy.

## How long is a scene

The form says what a scene is, not how long. There are two stagings, and the choice is the **first decision** of any project, before any file is written — the runbook's §1 lays out exactly what follows from it, in a table. Ask it once, here, as kickoff question 7; the runbook's discovery does not ask again, it only checks the answer against the repository.

- **Strict — the commit is the scene.** `git commit` refuses an incomplete scene; the end of an agent turn only says what is missing, since a turn may end to ask; an abandoned scene is reverted. The ideal. One developer, or a team that already commits complete units.
- **Adapted — the pull request is the scene.** Commits on the branch are the developer's own. The PR must be complete and a required check refuses it otherwise; commit and end-of-turn only warn. Squash-merge is recommended (one commit per scene lands on `main`, so its history reads as strict) but the gate does not depend on it.

Default: strict for one developer, adapted for a team. The answer and its reason are the first decision of the project: the first entry under `## Decisions` in task 00 (in a migration, in the adoption task), compiled into `docs/DECISIONS.md` as D1.

## Promise, acceptance, milestone — three different things

This distinction is the one that drifts most, so it is stated once here and applied everywhere below.

- A **promise** is what the user gets, in the user's words. It may be unverifiable ("you no longer need the old app"). It is the top of a task file and is never a gate.
- An **acceptance box** is a check. It must name an actor who is the assignee of the task (or a script), a check that actor can perform, and a moment *before the task closes*. Anything whose subject is the user, users, production, or adoption, or whose verb is a continuing state ("is running", "are using", "has replaced", "started to use"), is not an acceptance box, however true the sentence is. "The user replaced the old app", "new schema is running in production", "feature replaced old by active users" all fail this test and are rejected at review and by the runbook's gate.
- A **milestone** is the outcome the plan is for — for a rewrite, the predecessor retired. It appears in `docs/PLAN.md` under *Milestones* ("After NN: …"), put there by a `Milestone:` line in a decision, never by editing the plan. It is read, not ticked. What the builder can *do* about it ("uninstall the old app", "sit with her for the first real order") is a task with its own acceptance boxes; whether use then continues is a lagging signal for the next phase's priorities, not a condition of this one.

When a draft acceptance line fails the test, do not delete the intent: move it up to the promise or out to the milestone, and replace it with the checks it decomposes into (for a rewrite: records exported and verified, each predecessor feature marked ported / dropped on purpose, the ported workflows run end to end by the programmer).

## Mode 1 — new project

### Step A: kickoff interview (ask before writing anything)

Ask these, briefly, in one message. Do not scaffold until answered.

1. **One sentence: what is it, for whom.** Usually one user, one device.
2. **What is cut.** Push for the narrowest phase 1. Name candidates to drop explicitly (platforms, themes, offline, store, tablet, integrations). Everything cut gets a decision carrying a `Not in scope:` line, which is what puts it in `PLAN.md` under *Not in scope*.
3. **The verification loop.** Who builds, where it runs, who says it works. Claude never claims a build is green or a feature works on the device; the programmer does. Write this into CLAUDE.md as *Division of labour*. Ask in the same breath for the **final run** that closes phase 1 (see *Closing a phase* below): who runs it, over which workflows, for how long, producing what. It becomes the last task of phase 1.
4. **Predecessor or reference.** Is there an earlier version, a PWA, a spec, an API already learned? There is always reference material; it is just not always a whole app. If yes, it gets its own `docs/<NAME>.md` describing how the old thing did it, and the spec says what is and is not ported. For a predecessor app this list — each feature marked *ported* or *dropped on purpose* — is also the scope of the final run.
5. **The one milestone that proves or disproves the project.** The step after which "nothing later is worth building if this fails". It goes early in the plan (usually step 03–05). For a rewrite the proving milestone and the retirement of the predecessor are usually the same event; both are `Milestone:` lines in a kickoff decision, never acceptance boxes.
6. **Urgency.** Usually none. Say so in the spec; it changes how steps are sized.
7. **Who works here, how do they commit, and with which agent.** One developer or a team; commits as statements or as saves; does merging go through a PR policy. This chooses the staging (runbook §1). Claude Code only, or does anyone work with another agent (Codex)? This decides whether the runbook's 4.10 is installed: the instructions in `AGENTS.md`, the Codex bindings and the Codex reader. Both are asked here and nowhere else.
8. **Work-item tracker.** If tasks will map to tracker items (ADO, Jira, GitHub issues), the id format; task files are named `<id>-<slug>.md`.

### Step B: the skeleton

Create, in this order, with real content (not placeholders):

- `CLAUDE.md` — how to work here (where another agent works here too, write it as `AGENTS.md` and make `CLAUDE.md` the one-line import `@AGENTS.md`; runbook 4.10). Sections: *Read first, in this order* (SPEC, DECISIONS, PLAN, tasks/README); *The Unities* (the runbook's Appendix E paragraph for the chosen staging — it replaces any per-commit checklist, because the gates enforce what a checklist only requests); *Code rules*; *Division of labour*. Code rules must include: readable to the programmer ("if a construct would be unreadable to a strong <their language> developer in week one of <this language>, write it the plain way"); a fixed package/folder budget; one file per unit, split at ~400 lines; comments explain *why*; no new dependency without a row in the spec's stack table.
- `docs/SPEC.md` — the *what* and *how*. Opens with *Why this project exists*, then *Scope* (phase 1, explicitly not phase 1), architecture, stack table (dependency → what it replaces → why it is rote). "When this file and the code disagree, fix one of them in the same scene."
- `docs/DECISIONS.md` and `docs/PLAN.md` — **do not write these.** They are compiled from the task files by `scripts/compile-record.mjs` (runbook 4.5 and Appendix K), which is run as the last act of the skeleton. What you write instead:
  - *Decisions* go under `## Decisions` in task 00, each as `### YYYY-MM-DD · title` → **Decision** / **Rejected** / **Why**, with no number (the compiler assigns `D<n>` and never changes it). The staging first, so it compiles as D1; then every other answer from the kickoff interview that rejected an alternative. A decision is reversed only by a later entry with a `Supersedes: D<n>` line.
  - *The plan's steps* are the task files themselves, in file-name order: the compiled plan lists one line per task file with its derived status (a `## What was done` section and every box in the file ticked → done; a section and a box still open → `recorded, N boxes open`). There is no hand-kept list and no hand-kept status; adding a step is adding a task file.
  - *Milestones* and *Not in scope* are lines inside decisions: `Milestone: After NN: …` (the proving milestone and, for a rewrite, the predecessor's retirement) and `Not in scope: …` (everything cut from phase 1, saying so). They leave the plan when a later decision supersedes the one that carries them.
- `tasks/NN-name.md` — one per step, from the runbook's template: a title, `## Context` (the **Promise**, from the user's point of view, never implementation, plus **Acceptance** checkboxes that pass the test in *Promise, acceptance, milestone* above), and later the `## What was done` sections. Step 00 is always *Skeleton and documentation* with the promise: "A repository that a fresh session — human or Claude — can open and understand without this conversation." Step 01 is always *Toolchain green*: build, test and install proven on the programmer's machine before any feature. The last step of phase 1 is always the *Final run* (below).
- `docs/SETUP.md` — machines, toolchain, pinned versions. Read only for toolchain problems.
- `docs/UNITIES.md` — copied from this skill's folder, byte for byte. Then carry it out with the staging already chosen: it copies the check script, its tests and the two compilers from this skill's `files/` folder and writes their one configuration file (with `rules.retired` matching nothing, since a new project has no files to retire), the Claude Code bindings, the git binding where commits happen outside the agent, the CI gate for adapted, `tasks/README.md`, `docs/reviewer.md` (the cold reader's brief), and, where another agent works here, `.codex/hooks.json` and `.codex/agents/unities-reader.toml` (4.10). `CHANGELOG.md` is created by the compiler at the first release, not by hand. Then run the record compiler: it creates `docs/DECISIONS.md` and `docs/PLAN.md` from the task files just written. Read both back; if the plan or the decisions are not what the kickoff said, fix the task files and compile again.

### Working the plan

- Steps strictly in order unless a decision says otherwise.
- A step is done when every acceptance box in its task file is ticked, its `## What was done` section is written, **and** the programmer has run it where it runs (not just compiled). Record the verification in that section ("verified 2026-10-24, 1.7 on phone").
- Size steps so each one ends with something the programmer can run the same day. If a step cannot, split it.
- Before committing a record, have a reader that has not seen the work (a read-only subagent, given `docs/reviewer.md` as its brief) check that the `## What was done` section describes the diff. Gates test presence; this tests truth. The section's last line names that reader (`Reviewed by: <who>`), and the gate refuses a record without it.
- A review is part of the scene it reviews and is written into that scene's task file as `## Review · <date>`, never into a separate file or a chat. When writing one, for the person or as the verifier, every item has **Found**, **Done when** and **Not asked** (runbook 4.7, Appendix D). Write each *Done when* line as `case → outcome`, a state of the running program, and name every case of the thing the item touches, including the cases that must stay as they are. Never hand over an instruction with more than one reading ("keep only X", "use them", "while untouched"): ask which outcome is meant for each case, or enumerate the cases and have the person confirm. Draft the items in the person's name only with their eyes on the *Done when* lines.
- When answering a review item, the item is done when every *Done when* line holds for the running program. Test the behaviour, not the wording. Anything the fix needs beyond the item is a `## Decisions` entry before it is built. After the last item, read the whole diff of the round once for what the fixes themselves added or broke, then have the cold reader answer the three questions of the runbook's Appendix G.
- When something misbehaves, read the project's own log/diagnostics first; do not add defensive code in the wrong layer.
- Any choice with a rejected alternative gets a dated entry under `## Decisions` in the task file of the step being worked, in the same scene. Never write in `docs/DECISIONS.md` or `docs/PLAN.md`. Do not re-open a listed decision without saying so; propose a new entry that supersedes it instead of quietly doing it differently.
- Who compiles follows from the staging. Strict: run the record compiler before each commit; the commit carries its output and the gate refuses a stale one. Adapted: no branch or pull request touches the compiled files; the merge man compiles on the target after each merge, so on a branch the newest decisions are in the task files, not yet in `docs/DECISIONS.md`.
- A decision that arrives from outside the step in hand (a meeting, a request, a change of scope) enters as a small task file of its own carrying the decision; a new step enters as a new task file. Neither is ever an edit to a shared file.
- `docs/SPEC.md` is edited in the same scene whenever behaviour or architecture changed; the version is bumped when the scene is meant to be installed.

### Closing a phase

A phase has a fixed price, not a condition on the world. It closes by one pass, in this order, and the plan states each part up front:

1. **All tasks of the phase are done** by the rule above.
2. **The final run** is executed as the phase's last task. Its spec is written at kickoff (question 3), never improvised at the end: the actor (the programmer, or the named user with the programmer present), the workflows (for a rewrite, the *ported* list from the predecessor doc), the period (a week of regular use, one real order end to end — whatever the project's own unit is), and the artifact each session produces (a session report with the full log). "A final run was done" with none of these specified is not a final run.
3. **One tally.** When the period ends, every item from the reports is listed once and sorted once: *defect* → fixed in this phase; *request* → next phase, by a dated decision entry. The sort happens at the tally and not later, so the reports cannot grow the phase from inside.
4. **Fix and verify.** Every defect from the tally is fixed, and each fix is verified by re-running the session that produced it, logged the same way. Verification is scoped to the fixed items; it is not a second full run and does not produce a second tally.
5. **Done.** Anything that surfaces after the tally belongs to the next phase. The compartment is the tally; there is no second window.

Retiring a predecessor is a task that follows the close ("uninstall the old app"), with the programmer as actor. It is not a condition of the close, and whether the user keeps using the new thing afterwards is never one.

## Mode 2 — migrate an existing repo

Ask kickoff question 7 first; it is the runbook's §1 and the runbook will not ask it again. Then plant `docs/UNITIES.md` from this skill's folder and carry it out; it is the migration. Its discovery phase checks the staging against the repo, inventories the roles, existing enforcement, changelog and release conventions, the TODO/ROADMAP files to convert into `tasks/` (these become the retired tombstones the gate protects), and the fresh-session gap (which of spec, decisions, plan are missing and where that knowledge lives today). It stops for approval, then installs the gates and the record, converts the old task files without deleting anything, and creates `docs/SPEC.md` from the code and history as they are, and `docs/DECISIONS.md` and `docs/PLAN.md` by compiling them from the task files (its 4.9 and 5.4), marking gaps as gaps and seeding the adoption task's `## Decisions` with the choices already baked in that a newcomer would question.

**Upgrading a repo adopted before 2026-11-11.** Those repos have a hand-appended `docs/DECISIONS.md` and a hand-written `docs/PLAN.md`. The runbook's 5.4 converts them once: existing decisions stay where they are and keep their numbers, the plan's step table gives way to the compiled one, its milestones and not-in-scope lines move into one decision in the adoption task. Before running it on a team repo, ask who the merge man will be (the merging tool, a CI job, or a person by pull request) and list the open pull requests that edit either file, because they will be refused once the upgrade merges.

**Upgrading a repo adopted before 0.6.0.** Its scripts were cut from listings in the runbook, with its values written into them. The runbook's 5.5 moves the values into the configuration file and replaces the copies with the files. Before it runs, say that any local change in the old copies will be listed, and that each is either brought to the plugin as a task or dropped, by the person's decision; none is carried into the new copy.

**Upgrading a repo adopted before 0.5.0 (2026-11-15).** Nobody was asked which agents work there. Ask the second half of kickoff question 7 once, and record the answer as a decision in the adoption task. The re-run writes `docs/reviewer.md` either way; on a yes it also moves the instructions to `AGENTS.md`, installs the Codex files and the git binding if it was left out (runbook 4.10). The Codex files were written from Codex's documentation and are verified under Codex by the runbook's Phase 6, step 8; if no Codex is installed where the skill runs, say that the binding is unverified and who will verify it.

What this skill adds before the runbook runs: ask kickoff question 3 (verification loop and final run) if the runbook's discovery cannot answer it from the repo, and write *Division of labour* into `CLAUDE.md`. While converting old task files, apply the acceptance test from *Promise, acceptance, milestone*: a converted box that names user behaviour, adoption or a production state is moved to the promise or to a `Milestone:` line in a decision and replaced with the checks it decomposes into, and the conversion task records each such move. Do not back-fill history into task files; the compiled changelog starts at the migration.

## What this skill is not

Not a template to copy. The files are the cheapest way to satisfy the fresh-session test; if a file would be empty or ceremonial for this project, leave it out and say why in a decision. Not a second copy of the runbook: the procedure and its per-repo decisions live in `UNITIES.md`, the scripts in `files/` beside it, and each repository's values in its `.claude/hooks/unities.json`; this skill points at them rather than restating them.
