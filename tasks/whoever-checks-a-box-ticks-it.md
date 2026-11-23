# Whoever checks a box ticks it

## Context

Brought by Erez on 2026-11-22, in chat, from a multi-developer repository in the adapted staging
(deployment 0.5.2).

A review there left four *Done when* boxes open. Three were checks on the code. The
agent had checked them by reading the code, and two readers had found them to hold. The
fourth needed the application running. The agent did not tick the three. It gave all four
to the developer as "tell me which hold, and I'll tick them", citing its `AGENTS.md`:
"The developer ticks each acceptance box". Erez: "if something has been written, checked,
reviewed and verified by claude, having me tell it to tick the boxes is silly", and "'The
Developer' here is not me, it's claude."

That sentence is that repository's own (its D14, 2026-11-09: "The developer ticks each acceptance box
as they perform its check"). It is not in the master and never was. The master is silent
at the same place. 4.7 says who ticks is not part of the form, and Appendix G that the
reader ticks what it found to hold, but nothing tells the agent that a box it checked is
its own to tick, or which boxes go to a person. An adoption fills that silence, and the
agent then reads "the developer" as the person.

**Promise** — I am asked only for what only I can check.

**Acceptance**

- [x] the assignee: runbook 4.7 says who ticks a box, for a check on the code and for a check that needs the running program
- [x] the assignee: both standing paragraphs of Appendix E tell the agent which boxes it ticks and which it hands over, and this repository's `CLAUDE.md` says the same
- [x] the assignee: the developer's guide (4.8) is told to say who ticks
- [x] a script: `node --test` at the root passes with the manifest at the new version

## Decisions

### 2026-11-22 · A box is ticked by whoever performed its check, the agent included

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

### 2026-11-22 · The rule is prose in 4.7 and the standing paragraph; the gate and the brief do not change

**Decision** — 4.7 states the rule once, under *Acceptance boxes*. The standing
paragraphs of Appendix E carry it as an instruction to the agent, since that paragraph
is what an agent in a deployment reads. 4.8 tells the guide to say it. The gate, the
reader's brief and the form (1.0) are unchanged.
**Rejected** — A gate check on who ticked: a tick carries no author, and 4.7 already
says who ticks is not part of the form. Having the reader tick: its brief says "Change
nothing", and a reader that edits the file it reads is no longer reading cold.
**Why** — What went wrong was an instruction read wrongly, not a scene the gate let
through. The fix belongs where the instruction is.

### 2026-11-22 · 0.6.6

**Decision** — The plugin is 0.6.6: the runbook's first line,
`.claude-plugin/plugin.json` and both manifests.
**Rejected** — Holding the change for the next version that changes a script.
**Why** — A change to the procedure is a version (`CLAUDE.md`, *Code rules*).

### 2026-11-22 · Who writes the review section is left as the runbook has it

**Decision** — 4.7 *Review rounds*, Appendix D and `tasks/README.md` go on saying the
review section is written "by whoever reviews", while the brief says whoever asked the
reader writes its findings. Known, and not changed in this scene.
**Rejected** — Rewording the three places here.
**Why** — For a person who reviews, "whoever reviews" is right; only for a read-only
reader does someone else hold the pen, and the brief already says so to that reader.
The wording predates this task and nothing went wrong by it.

## What was done

Runbook 4.7 gains a paragraph under *Acceptance boxes*, for acceptance and review boxes
alike: a box is ticked by whoever performed its check, the agent included; the agent
ticks what it checked by reading the code or by a command whose output it reports, and
what the reader found to hold, and does not ask a person to tick those; a box that needs
the running program stays open and is handed over, those boxes alone, each with what to
do and what should be seen. The *Review rounds* sentence that says who ticks is not part
of the form now points there. Both standing paragraphs of Appendix E carry the rule as
an instruction to the agent, and item 3 of the developer's guide (4.8) is told to say
it. This repository's `CLAUDE.md` has the same instruction, with Erez named.

Because the runbook changed, the plugin is 0.6.6: the runbook's first line,
`.claude-plugin/plugin.json`, both manifests, and SPEC's "as of 0.6.6". The form is
unchanged at 1.0. No script, test or reader's brief changed.

That repository is unchanged and still carries its own sentence; the rule reaches it
when Erez converts it to this version or supersedes its D14 there.

`node --test` at the root: 84 tests, 84 pass, on Node 26.13.1.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-22

Written from the reader's report. None of the three would grow the gate; they are about
the runbook's wording and this record. The reader also found the four acceptance boxes
to hold against the staged files; it did not run the tests.

### Appendix G still says the reader ticks, against the new 4.7 rule

**Found** — Appendix G, after the three questions, said the reader "ticks the boxes it
found to hold". The new 4.7 paragraph says the agent ticks them, and this file's second
decision rejects a reader that ticks. 4.7 and Appendix E also said the agent ticks "a
box the reader found to hold" of any box, but the brief asks the reader only about
review boxes. Separately, and from before this change: 4.7 *Review rounds*, Appendix D
and `tasks/README.md` say the review section is written by whoever reviews; the brief
says whoever asked the reader writes it.

**Done when**

- [x] a reader runs under the master runbook → nowhere does the runbook say the reader ticks a box
- [x] a review *Done when* box the reader found to hold → 4.7 and Appendix G name one ticker for it, whoever asked for the reading
- [x] an acceptance box → 4.7, Appendix E and `CLAUDE.md` say "the reader found to hold" only of review boxes
- [x] a box the reader did not find to hold → it stays open, as before
- [x] `docs/reviewer.md` and the brief in Appendix G → unchanged
- [x] who writes the `## Review` section → left as it is and recorded as known, in a decision

**Not asked** — a gate check on who ticked; a change to the form (1.0).

### "Holds for the running program" and "needs the running program" are not told apart

**Found** — A *Done when* line is by definition a state of the running program, and
`CLAUDE.md`, Appendix E and 4.8 say an item is done when each line "holds for the
running program". The new rule handed to the person every box "that needs the running
program". Read as the same thing, every review box goes to the person, which is what
happened in that repository.

**Done when**

- [x] a review *Done when* box verified by reading the code path or by a reported command → the wording leaves it the agent's to tick, though the line describes the running program
- [x] a box that can only be checked by running the program where it runs → handed to the named person, with what to do and what should be seen
- [x] an acceptance box checked by reading or by a script → the agent's to tick, as before
- [x] the "holds for the running program" sentence in `CLAUDE.md`, Appendix E and 4.8 item 5 → unchanged

**Not asked** — a box syntax or marker for "needs the running program"; a gate check.

### The out-of-scope line sits under the version decision

**Found** — The `Not in scope:` line about that repository was attached to the 0.6.6
decision, so `docs/PLAN.md` cited a decision about a version number for it. It had no
full stop.

**Done when**

- [x] the out-of-scope line → attached to the first decision, and `docs/PLAN.md` cites that decision
- [x] the 0.6.6 decision → records only the version
- [x] `docs/DECISIONS.md` and `docs/PLAN.md` → equal the compiler's output

**Not asked** — a change to how `compile-record.mjs` reads `Not in scope:` lines.

## What was done

Answering the reading. Appendix G now says the reader says which boxes it found to hold
and whoever asked for the reading ticks them. 4.7, both Appendix E paragraphs and
`CLAUDE.md` say "a review box the reader found to hold", and the first decision's
wording follows. 4.7 gains a sentence: a *Done when* line describes the running program
and is still checked by reading the code path; that does not make it a person's. The
box that goes to a person is now, in 4.7, Appendix E, 4.8 item 3 and `CLAUDE.md`, one
"that can only be checked by running the program". The out-of-scope line moved to the
first decision. A fourth decision records that who writes the review section is left as
the runbook has it. The brief, the gate and the scripts are unchanged.

The reader read these corrections and found twelve of the thirteen boxes to hold; the
agent ticked those. The first box as first written also said the reader never edits the
task file, which the fourth decision leaves otherwise; it now says only what was fixed,
that the reader ticks no box. The last box the reader could not run; it is ticked on
`node scripts/compile-record.mjs --check`, run by the agent after this section was
written.

Reviewed by: the same reader, which read these corrections against the staged files
