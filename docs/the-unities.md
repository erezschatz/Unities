# The Unities

Erez Schatz · 14 October 2026

## Where this comes from

The Unities are three self-imposed constraints on how work is done, borrowed from the dramatic unities of place, time and action. They are not a methodology. They are a form: the play happens in one place, in real time, as one story, and the shape of the play follows from that.

The problem they answer is scatter. A developer today works across chat, mail, the tracker, the repo, the wiki and the code, and what falls between them is lost. Keeping everything under one vendor does not fix this: the task, the repo, the wiki and the code are four floors of the same house, and the stairs are where things drop.

The dramatic unities were never a solution to a dramatic problem. They were constraints adopted for aesthetic, cultural and practical reasons, and their value was that they forced structure: when you cannot add a location, you have to bring the action into the room. That is the posture here. These are not rules that fix things; they are constraints that force the work to take a better shape, and like any strict form they have costs, named at the end.

## Unity of place

The stage is the medium, not the window. Everything the work consists of lives in the repository as files: the spec, the task, the code, the test, the documentation, the changelog entry. The test for whether something is on stage is whether `git diff` can see it. If it cannot, it is not a prop in this play; it is a different theatre.

This is stronger than "keep everything in the project." Containment puts everything in one house; the unity says the scene never changes. You do not leave the medium to do a different part of the work. An IDE, or ten editor sessions and two git terminals, are both one place, because they all act on the same files with the same kind of tools. The window layout is staging.

Actors may exit and return. Oedipus does not stand still, and neither do you: the shell, the browser, the debugger are the wings. What matters is that nothing the play depends on is stored in the wings.

The outside world enters through one door. Greek tragedy kept violence offstage and brought it on through the messenger's speech. The customer's demand, the manager's priority, the production incident all happen elsewhere and enter the stage only as a file, written by whoever received them, at the moment they arrive. Anything that did not come through the door did not happen, as far as the play is concerned.

## Unity of time

The record of the work and the work itself happen in the same moment. In the theatre, represented time equals elapsed time: no "the next day." Here, nothing about the work is recorded at a different time than the work is done. The test, the doc line, the task note and the changelog entry are not steps after the change. They are part of the same gesture, the way a stage direction is part of the scene.

This is not a Definition of Done. A Definition of Done is a gate at the end, a checklist walked through once the real work is finished, and "finished" is exactly the moment attention leaves. Every team has written that checklist and it fails everywhere for the same reason. The unity of time says there is no end gate, because there is no "after." One atomic unit, a commit or a session, is the only thing that exists.

Most of what falls through the cracks is a violation of this unity, not of place. Lore stays oral because knowledge was to be written down "later." The shift sheet breaks because it was edited after the shift changed, not as it changed. A task closed on Thursday for work finished on Sunday, a doc describing last month's code, a ticket that is a lagging summary of a chat thread: all of these are "the next day" jumps.

The uncomfortable corollary: a change without its record is not a change with missing paperwork. It is a scene that did not happen. If you are interrupted before the record exists, the honest move under the constraint is to discard the change, not to leave it for tomorrow. Anything that would be recorded later is treated as already lost.

That is the form, and it is the ideal. The form says what a scene is; it does not say how long one is, and that is where practice pushes back. Where the people working in a repository treat a commit as a save rather than a statement, the scene lengthens to the pull request: commits on the way are free, the unit that must be complete is the PR, and the gate that refuses an incomplete scene runs at merge. That staging gives up part of this unity — the record may be written at the end of the scene rather than beside each change, and the discard rule goes with it — and it is kept honest only because the gate has teeth and the warnings along the way keep pulling toward same-gesture. Part II stages both. Get the strict one if you can.

Working with a language model makes this sharper. A session ends and everything unrecorded is gone, so the discipline is forced whether you adopt it or not. Whatever was not written down did not, for all practical purposes, take place.

## Unity of action

There is one account of what is happening. In the theatre: one action from start to finish, no B plot. At the small scale programming already has this under other names (one change per commit, single responsibility, WIP limits), and that part is not new.

The new part is at the level of narrative. The tracker tells one story of the work, the git log tells a second, the chat thread a third, and they diverge. That is a play with three plots about the same events. The multi-tool problem is usually described as four places; it is really four plots. Unity of action says there is one record, and anything else is derived from it, never kept in parallel.

The language model trap sits here. If the model writes the commit message, the doc update and the task note at the moment of the change, unity of time is satisfied, but there may now be two plots: what the code does and what the model says it does. A simultaneous record that is wrong is not a record. So the check belongs in the same gesture as the writing, or the oral lore has merely been automated.

## What the unities force

The three unities collapse into one principle: the work, its record and its location are the same thing at the same time. Applied together they force a few structural decisions.

**Metadata is written per change, never into a shared document.** A single `CHANGELOG.md` that everyone edits is a chat channel with extra steps, and it conflicts on every merge. Each change writes its record into its own task file, as a "what was done" section that is appended once and never edited afterwards (the pattern exists elsewhere as changesets or towncrier fragments). The same holds for tasks: one file per task, not one `TASKS.md` with sections.

**Shared documents are derived, never edited.** The changelog is compiled at release from the task files' "what was done" sections, read from git history between two release tags. The task board is a view over the same files. Status (open, done, shipped) is derived too. The task files are the record (unity of action: one plot); changelog and board are views of it, the way a binary is a projection of its sources: the moment the project becomes a product, the record is compiled into a blob, and the blob is never edited by hand.

**No who-writes-what rules.** The obvious mitigation for conflicts is a convention about who may touch which file. A convention passed around the team is oral lore, which is the thing this whole discipline exists to escape. Conflicts are a structural problem and get a structural answer: if two people can collide on a file, the file is shaped wrong.

**One door.** External input enters as a file, written on arrival, by whoever received it. There is no second route.

## What it looks like in practice

One change, start to finish, without leaving the stage:

1. The demand arrives (a message, a meeting, an incident). Whoever received it writes it as a file in the repo, now. That file is the only form in which the demand exists.
2. The spec and the task are read from files in the repo.
3. The code is written.
4. The test that guards it is written in the same sitting.
5. The documentation line that describes it is written in the same sitting.
6. The task file gets its "what was done" section, in the same sitting. There is no separate changelog entry.
7. The commit carries all of the above as one unit. There is nothing left to do tomorrow, at the end of the sprint, or at release, except assemble the views.

If the sitting ends before step 7, steps 3 to 6 are discarded, not stashed for later. The play is not resumed the next day; it is restaged. In the adapted staging, where the pull request is the scene, step 7 reads "the pull request carries all of the above" and an interrupted scene sits as an open PR that the gate refuses; the repo has to say what becomes of such a PR, because the form's answer (revert) was traded away.

## Known costs

Strict forms produce stilted work when obeyed mechanically. French neoclassical tragedy followed the unities to the letter and is mostly forgotten; Shakespeare ignored all three. The unities are worth keeping only as long as they force a better shape, not as a scorecard.

| Cost | What it buys |
| --- | --- |
| Merge conflicts on shared metafiles | Forces per-task records and derived views, which remove the conflict structurally |
| Discarding half-done work when a sitting ends early | Nothing exists in a half-recorded state; the repo is always a complete account. (Strict staging only; the adapted staging gives this up and must name a replacement, even if it is "nothing.") |
| Every piece of outside input must be transcribed on arrival | One door; no second source of truth in chat or memory |
| Slower per change, since the record is part of the change | No catch-up work at sprint end or release; no oral lore to reconstruct |
| Time and action pull against each other (record everything now vs. keep one plot) | Resolved by shape: task records now, one compiled changelog at release |

The last row is the real tension. When the two conflict, time wins at the moment of writing and action wins at the moment of reading: write the task record immediately, compile the single account from the records at release.

---

# Part II: two stagings

Part I is the form; it names no tools. This part stages it with git, Node and Claude Code, in two ways that share one script, one record and one compiler and differ in how long a scene is.

**Strict: the commit is the scene.** `git commit` refuses an incomplete scene; the agent cannot end a turn with one; an interrupted scene is reverted. The ideal, for one developer or a team that already commits complete units.

**Adapted: the pull request is the scene.** Commits are the developer's own. The PR is what must be complete, and a required check at merge refuses it otherwise. Commit and end-of-turn only warn, naming what the PR will still fail on. This is what a multi-developer repository with a PR policy actually accepts, and it was learned by trying the strict one on such a repository.

The switch between them is one constant in the script (`SCENE`) and one settings entry. `UNITIES.md`, the adoption runbook, carries the current script, tests, compiler and the per-repo decisions; what follows is the shape, not the listing.

Two pieces of writing carry the staging, and they divide the work. The skill `unities-project` is the front door: it chooses the mode (new project or existing repo), runs the kickoff interview — what it is and for whom, what is cut, who verifies, the milestone that could disprove the project, who commits and how — and writes the files that let a fresh session pick up from the repo alone: `CLAUDE.md`, `docs/SPEC.md`, `docs/DECISIONS.md` (append-only, a decision reversed only by a new entry naming the old one) and `docs/PLAN.md` (the ordered steps, with no status column, because status is derived from the task files). The runbook `docs/UNITIES.md` is what the skill then carries out: the record, the gates, the compiler and the per-repo decisions. The fresh-session test is the plainest statement of unity of place; the decisions file is unity of action applied to choices rather than changes.

One observation from the adapted staging softens its cost: with squash-merge, each pull request lands on `main` as one commit, so the history reads as strict — one commit per scene, each complete — even though the branch was free. The branch is the rehearsal; `main` is the performance.

## The stage

Everything the play depends on is a file in the repo. Each folder plays one role, and the roles are what the check script tests for.

| Path | Role | Written when |
| --- | --- | --- |
| `src/` | the code | during the change |
| `tests/` | the test that guards it | same sitting |
| `docs/`, `README.md` | the documentation | same sitting |
| `tasks/<name>.md` | one file per task; its "what was done" section is the change record | same sitting, appended once |
| `CHANGELOG.md` | compiled at release from task records; never edited | at release, by the compiler only |
| `.claude/hooks/check-unit.mjs` | the scene-completeness test | once; it is the rule, in code |
| `.claude/settings.json` | binds the test to Claude Code events; committed | once |
| `.git/hooks/pre-commit` (or husky) | binds the same test to human commits; refuses (strict) or warns (adapted) | once |

The one door: anything from outside (a request, an incident, a decision made in a meeting) becomes a `tasks/` file on arrival, by whoever received it.

## The check script

One script answers one question: is this change set a complete scene? It has three modes, and `SCENE` decides which refuse and which warn:

| Mode | What it looks at | Strict | Adapted |
| --- | --- | --- | --- |
| `--pr <base>` | what the PR changes against its target | refuses (backstop) | refuses (the gate) |
| `--staged` | what `git commit` is about to record | refuses | warns |
| `--branch` | strict: the uncommitted tree; adapted: the branch since it forked, committed or not | refuses the turn's end | advises the agent once |

A clean tree passes, so reverting is always a way out. A target branch that has not yet adopted the script is not held to it, so the adoption PR itself gets through.

```js
// .claude/hooks/check-unit.mjs — the shape; the full listing is UNITIES.md, Appendix A
const SCENE = "pr";                    // "commit" for the strict staging
const RULES = { source: /^src\//, test: /^tests?\//, doc: /^docs\//,
                task: /^tasks\/(?!README\.md$)[^/_][^/]*\.md$/,
                shared: /^(CHANGELOG\.md|TODO\.md)$/ };   // compiled or retired; never edited
const REQUIRED = ["test", "doc", "task"];
const RELEASE_FILES = /^(CHANGELOG\.md|package\.json)$/;  // what a release PR may touch

// 1. collect the files the scene touches, by mode (diff vs base, staged, or branch+tree)
// 2. if any is source, every REQUIRED role must appear      → "no test change" ...
// 3. a shared file may not be edited directly               → "shared file edited directly"
//    except: a PR confined to RELEASE_FILES whose added CHANGELOG lines equal
//    `compile-changelog --dry-run` on the target's history   → a release, by construction
// 4. report: --pr exits 1 (CI fails). Strict: exit 2 (refuse); Stop second pass lets go
//    and tells the person. Adapted: exit 0; Stop sends additionalContext to the agent once.
```

The `RULES` table is the whole per-repo definition of "done," and it is deliberately a presence test: a file in each role, nothing about whether `tests/parser.test.ts` really exercises `parser.ts`. Presence already catches the failure this discipline exists for, the record not being written at all. A later tightening is to check the staged diff of `tasks/*.md` for an added `## What was done` heading, so "touched the task" becomes "recorded the scene."

## Wiring

The same script is bound in up to three places: to git, so a person committing from any editor sees it; to Claude Code, so a session cannot end around it; and, in the adapted staging, to CI as a required check on the pull request. The git binding is installed only where commits can happen outside the agent; the `Stop` binding always; the `PreToolUse` binding on `git commit` in the strict staging only (its `if` filter is best-effort, so the script itself confirms the command is a commit).

`.git/hooks/pre-commit` (or the equivalent husky entry):

```sh
#!/bin/sh
exec node "$(git rev-parse --show-toplevel)/.claude/hooks/check-unit.mjs" --staged
```

`.claude/settings.json`, committed with the repo:

```json
{
  "hooks": {
    "Stop": [{ "hooks": [{ "type": "command", "command": "node",
      "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/check-unit.mjs", "--branch"] }] }],
    "PreToolUse": [{ "matcher": "Bash", "hooks": [{ "type": "command",
      "if": "Bash(git commit *)", "command": "node",
      "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/check-unit.mjs", "--staged"],
      "onFailure": "block" }] }]   // strict staging only
  }
}
```

Each binding enforces a different unity (S = strict, A = adapted):

| Binding | Fires when | What it does | Unity |
| --- | --- | --- | --- |
| `Stop` hook | the agent finishes a turn | S: refuses to end on a half-recorded change, sends the agent back once, then lets go and tells the person. A: tells the agent once, in its own context, what the PR will still fail on | time |
| `PreToolUse` on `git commit` (S) | the agent is about to commit | refuses a commit that is not a complete scene | time |
| `pre-commit` | a person commits | S: refuses. A: warns | time, place |
| CI check on the PR (A; backstop in S) | a pull request is opened or updated | refuses the merge of an incomplete scene; the one gate with teeth in the adapted staging | time |
| `shared` rule in the script | any mode | refuses a direct edit to `CHANGELOG.md` or a retired `TODO.md`; a release PR passes only if its changelog equals the compiler's output | action |
| `onFailure: "block"` (S) | the script is missing or crashes | blocks the commit; a policy that fails open is not a policy | time |

The `stop_hook_active` branch is the loop breaker in both stagings. Strict: the agent was sent back once; on the second pass the turn ends and the missing parts are printed to the person, whose decision the revert is. Adapted: the advice is given once per turn and not repeated, so a turn can always end.

CLAUDE.md gets one paragraph stating the form. A skill, if any, holds procedure only: how task files are named here, what the "what was done" heading is. The skill says how; the hooks make sure.

## What hooks cannot do

Two pieces sit outside the check script, because a hook can test presence but not truth, and can gate a change but not build a release.

**The release compiler.** The only writer `CHANGELOG.md` ever has. It runs at release and reads the record out of git history rather than out of the tree (following renames, since task files get a tracker id late), so archiving or deleting finished task files cannot lose the trail. In the strict staging the release commit is made from a shell with `--no-verify`, the one documented bypass. In the adapted staging there is no bypass and none is needed: the gate verifies the blob against its sources. A PR confined to the release files passes if the changelog lines it adds equal what the compiler produces from the target's history, and fails with a diff otherwise. That is unity of action enforced literally — the compiled file must equal compile(record) — and it is the reason the compiler's output has to be deterministic.

```sh
# the shape: every "what was done" section added since the last release, grouped by task
node scripts/compile-changelog.mjs 1.4.0            # writes CHANGELOG.md
node scripts/compile-changelog.mjs --dry-run         # what the gate compares a release PR against
```

The point is its shape: it is the compile step from sources to blob, it runs once per release, and nobody edits its output. The release tag is the one thing in the system that is not a file, and it is the right thing not to be.

**The reviewer.** The script passes a task record that says the wrong thing. A fluent, simultaneous, inaccurate record satisfies unity of time and breaks unity of action, and that is the specific trap of working with a language model. The check for truth is a second reader that has not seen the work: a reviewer subagent, invoked before commit, that reads the staged diff cold against the task file and says whether the record describes the change. Claude Code can also spawn such a reviewer from a hook (an agent-type `Stop` hook), but that feature is marked experimental; an explicitly invoked subagent is the stable form.

## Limits of this staging

- Presence is not truth. The script checks that files in each role changed, not that they are right. The reviewer covers truth; nothing covers it for free.
- The `Stop` hook judges one session's tree or branch. Two sessions in one repo each see only their own. The commit gate (strict) or the PR gate (adapted) is what holds across sessions.
- `onFailure: "block"` has no effect on `Stop` hooks, so a missing script silently lets turns end; the next gate catches the change. Keep the script in the repo and the path in `settings.json` correct.
- Hooks in `.claude/settings.json` run only after the person has trusted the folder, and cloud sessions do not read a machine's user settings. Committing the project settings is what makes the staging travel with the repo.
- The adapted staging weakens unity of time by design. The record may be written at the end of the scene, and an interrupted scene is an open PR rather than a revert. Each repo that adopts it has to say what becomes of a PR that keeps failing the gate.
- The PR gate's required-ness lives outside the repository (a branch policy, or the merging tool's step). It is the one part of the staging that `git diff` cannot see, and the first thing to check when the gate seems to have stopped working.
- The discard is not automated anywhere. The form says an interrupted scene is abandoned; the strict staging says so, loudly, and leaves the `git checkout` to a person.
