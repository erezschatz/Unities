# tasks/

How to work on a task here is `CLAUDE.md` (this repository has one developer and no
separate developer's guide; see `tasks/adopt-unities.md`). This file is the format.

One file per task. Task files are the record; everything else (docs/DECISIONS.md,
docs/PLAN.md, CHANGELOG.md, boards, status) is compiled from them and never edited by
hand. A task file belongs to one scene — one piece of work, on one branch, by one
developer with whatever agents, reviewers and hooks act for them — and everyone acting in
that scene writes in it. Two scenes never write the same file, which is why nothing here
needs a merge by hand.

A task file is named `<work item id>-<task description>.md`: the tracker's id for the
work it belongs to, then a short kebab-case description. Several tasks under one item
share the prefix. A task with no work item yet is named by its description alone and gets
the prefix when one is assigned; renaming it then is fine, because the changelog compiler
follows renames.

A task file has:

- a title (H1);
- `## Context`: what was asked, by whom, where it came from — written when it arrived.
  It carries the **promise** (what the user gets, in the user's words, never
  implementation; it may be unverifiable) and the **acceptance** boxes. An acceptance box
  is a check: it names an actor who is the assignee of the task (or a script), a check
  that actor can perform, and a moment before the task closes. A box about the user,
  customers, adoption or production ("the user replaced the old app", "schema is running
  in production") is an outcome, not a check; it belongs in the promise or in
  `docs/PLAN.md` under *Milestones*, and the gate refuses it. So is a box that waits on
  anything that is not the project ("the other repositories run the new version"), though
  the gate does not catch every wording of it; a box that runs what the project ships
  somewhere else (another operating system, a clean machine) is a check;
- `## What was done`: appended in the same unit (commit or pull request, by the repo's
  staging) as the change it describes, once. Once merged it may be corrected, a mistake
  fixed, but a correction is not a record: new work gets a new section. A task
  may accumulate several such sections over several units; each is a separate entry in
  the compiled changelog. Its last line is `Reviewed by: <who>`: the reader that had not
  seen the work and read the diff against this section before it was committed. The gate
  refuses a record without it;
- `## Decisions`, when the work chose one thing over another: one entry per choice,
  appended in the same unit, never edited or removed once merged.

      ### 2026-11-11 · <title: the choice, in a few words>

      **Decision** — <what was chosen>
      **Rejected** — <what was not, by name>
      **Why** — <the reason a newcomer would need>

  No number: `docs/DECISIONS.md` is compiled from these entries after the merge and the
  compiler numbers them (`D<n>`). Until then, refer to a decision by its task file and
  title. Optional lines at the end of an entry, each on its own line:
  `Supersedes: D7` (the only way a compiled decision is reversed);
  `Milestone: After 05: <outcome>` and `Not in scope: <thing>` (the only way a line gets
  into `docs/PLAN.md` — and it leaves when a later decision supersedes this one). A
  decision that comes from outside the work, a meeting or a request, gets a small task
  file of its own, written by whoever brought it in.

- `## Review · <date>`, when the work is reviewed: written by the reviewer (a person or
  a verifying agent) into this file, on the work's own branch. One `###` item per
  finding:

      ### <the finding, in a few words>

      **Found** — <where, and what happens now>

      **Done when**

      - [ ] <case> → <outcome>
      - [ ] <every other case of the same thing, including those that must not change> → <outcome>

      **Not asked** — <what the fix must not add: a schema change, an endpoint, a refactor>

  A *Done when* line is a state of the running program, never an instruction ("keep
  only…", "use them", "refresh while untouched" are instructions, and each has more than
  one reading). The gate refuses an item without the three parts or a line without `→`,
  and a pull request with an open box. The answer to a round is a further
  `## What was done` section; anything the fix needed beyond the item is first a
  `## Decisions` entry.

The plan's steps are the task files themselves: adding a step is adding a file here.

Status is derived: no "what was done" → open; present, with a box in the file still
open → recorded, and the plan says how many boxes are open; present and every box
ticked → done; included in a compiled release → shipped. There is no status field to
keep in sync.

Outside input enters here and nowhere else. If it is not a task file, it did not arrive.
