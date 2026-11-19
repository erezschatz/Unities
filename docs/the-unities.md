# The Unities

Erez Schatz · 14 October 2026

## Where this comes from

The Unities are three self-imposed constraints on how work is done, borrowed from the dramatic unities of place, time and action. They are not a methodology. They are a form: the play happens in one place, in real time, as one story, and the shape of the play follows from that.

The problem they answer is scatter. A developer today works across chat, mail, the tracker, the repo, the wiki and the code, and what falls between them is lost. Keeping everything under one vendor does not fix this: the task, the repo, the wiki and the code are four floors of the same house, and the stairs are where things drop.

The dramatic unities were never a solution to a dramatic problem. They were constraints adopted for aesthetic, cultural and practical reasons, and their value was that they forced structure: when you cannot add a location, you have to bring the action into the room. That is the posture here. These are not rules that fix things; they are constraints that force the work to take a better shape, and like any strict form they have costs, named at the end.

The three unities are not Aristotle's. He argues for one, the unity of action. He mentions time once, as something the tragedies of his day tended to keep, and he says nothing of place. The rule of three was made some nineteen centuries later, by Castelvetro in Italy and then by the French, and signed with his name. "This is what Aristotle meant" was false as history. What they made was a new and stricter thing, with borrowed authority.

The same temptation is here, so it is better to say it outright. Extreme Programming and the agile manifesto saw the problem these constraints answer: the work and the account of the work drift apart. Their answer was to keep the knowledge in people who sit together. A story card is a promise of a conversation, the customer is in the room, and working software counts for more than documentation. The Unities say the opposite: what is not written did not happen. So this is not what they meant. It is what their aim requires now, when some of those in the room are agents whose memory ends with the session. The aim is theirs. The rule is new, and it is not signed with their name.

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

That is the form, and it is the ideal. The form says what a scene is; it does not say how long one is, and that is where practice pushes back. Where the people working in a repository treat a commit as a save rather than a statement, the scene lengthens to the pull request: commits on the way are free, the unit that must be complete is the PR, and the gate that refuses an incomplete scene runs at merge. That staging gives up part of this unity — the record may be written at the end of the scene rather than beside each change, and the discard rule goes with it — and it is kept honest only because the gate has teeth and the warnings along the way keep pulling toward same-gesture. The runbook stages both. Get the strict one if you can.

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

The staging of this form with git, Node and Claude Code (the gate, the bindings, the
compilers) is the runbook, [`skills/unities-project/UNITIES.md`](../skills/unities-project/UNITIES.md).

© 2026 Erez Schatz. This essay is licensed under
[Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).
