# The plan says when a recorded task still has boxes open

## Context

Asked by Erez on 2026-11-22, in chat. Found the same day, while his two runs were being
recorded in `tasks/a-marketplace-file.md`: boxes had stopped being ticked in a team
repository and here, "and yet everything was being pushed up".

The record compiler marks a step `done` in `docs/PLAN.md` as soon as its task file has a
`## What was done` section, whatever its boxes say. On 2026-11-22 this repository's plan
showed five steps as done whose task files each held at least one open box, one of them
the install of the plugin from GitHub on a machine without it. 0.6.6 settled who ticks a
box (`tasks/whoever-checks-a-box-ticks-it.md`); the plan still could not tell a task
whose checks were all performed from one that somebody still owes a check. Erez, asked
whether the plan should say so: "yes, if boxes are opened, they should say so."

**Promise** — When I read the plan, "done" means nothing is owed on that task.

**Acceptance**

- [x] script: a task file with a `## What was done` section and one open box is compiled as `recorded, 1 box open`, and with two as `recorded, 2 boxes open`
- [x] script: a task file with a record and every box ticked is compiled as `done`, and one with no record carries no status, as before
- [x] script: a box quoted inside a fenced block is not counted
- [x] script: `node --test` at the root passes with the manifest at the new version
- [x] the assignee: the runbook (4.9, and the task README of Appendix D), this repository's `tasks/README.md`, the skill and `docs/SPEC.md` say what `done` now means

## Decisions

### 2026-11-22 · A recorded task is done only when no box in its file is open

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

### 2026-11-22 · Every box in the file counts, not only the acceptance boxes

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

### 2026-11-22 · 0.6.7

**Decision** — The version is 0.6.7.
**Rejected** — No new version.
**Why** — A planted script changed, and with it what an adopted repository's compiled
plan says (D9).

## What was done

`compile-record.mjs` counts open boxes outside fenced blocks and writes a recorded
step as `done` or as `recorded, N boxes open` (`1 box open` for one). Two tests were
added to `check-unit.test.mjs`: one for the three statuses, singular and plural, a
review's box counted, and the change to `done` when the last box is ticked; one for a
box inside a fenced block. Run against the 0.6.6 compiler, the first fails and the
second passes, since that compiler said `done` whatever the boxes; both pass against
this one, as do the other tests. `node --test` at the root: 86 tests, 86 pass,
on Node 22.23.5.

The runbook's 4.9 and the task README it plants (Appendix D), this repository's
`tasks/README.md`, the skill's line on the plan's steps and `docs/SPEC.md` say what
`done` now means. The runbook's first line, `plugin.json` and the manifest carry 0.6.7,
and the planted copies here were replaced from the masters.

Compiled here, `docs/PLAN.md` now shows five steps as recorded with boxes open that it
showed as done: `a-check-is-admitted-from-what-happened` (1), `a-marketplace-file` (1),
`new-records-are-found-by-heading-text` (7), `the-essay-says-whose-idea-this-is` (1) and
`the-plan-can-be-switched-off` (1).

Not run in any other repository. A repository that takes 0.6.7 and has a recorded task
with an open box will find its `docs/PLAN.md` out of date until the record compiler is
run there; one with `"plan": false` sees no change.

Reviewed by: a read-only subagent that had not seen the work; it did not run the tests

## Review · 2026-11-22

The reader's two findings, condensed by the agent that did the work. Neither would make
the gate refuse anything it lets through.

### The decision said the gate does not look at whether a box is ticked

**Found** — The first decision said of the gate "it still does not look at whether a box
is ticked". At a pull request the gate refuses a review item the scene adds with an open
*Done when* box (`check-unit.mjs`, "is still open"; runbook 4.7), and the Rejected
clause read as though no such refusal existed.

**Done when**

- [x] the decision in the task file, and as compiled → says what the gate does about boxes as `check-unit.mjs` does it: unchanged by this scene, no refusal for an open acceptance box, a refusal at `--pr` for a review item the scene adds with an open box
- [x] `check-unit.mjs` → unchanged
- [x] `docs/DECISIONS.md` and `docs/PLAN.md` → equal the compiler's output

**Not asked** — any change to the gate or to the version.

### The compiler and the gate did not agree on what a box is

**Found** — `openBoxes` counted only lines beginning `- [ ]`. The gate takes `- [ ]` and
`* [ ]` both for a box, and the second decision says every open box counts. No task file
in this repository writes a box with `*`, so nothing was miscounted here.

**Done when**

- [x] a recorded task file whose only open box is written `* [ ]` → compiled as `recorded, 1 box open`
- [x] a recorded task file with `- [ ]` boxes → counted as before
- [x] a box in a fenced block → not counted, as before
- [x] every task file in this repository → the same status in `docs/PLAN.md` as before this review

**Not asked** — a change to the gate's box pattern, or new kinds of fence.

## What was done

Answering the reading. The first decision now says what the gate does about boxes, and
its Rejected clause says "also" and "acceptance box". `openBoxes` counts a box written
with `*` as it counts one written with `-`; the second decision says so, and the review
box in the first new test is now written `* [ ]`, so that test fails if the `*` form
stops being counted. The manifest and the planted copies were made again; `node --test`
at the root: 86 tests, 86 pass. The reader found the seven boxes above to hold and the agent ticked them; compiled
with them ticked, `docs/PLAN.md` is the same as before the review.

Reviewed by: the same reader, which read these corrections against the staged files
