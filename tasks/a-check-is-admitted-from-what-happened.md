# A check enters the gate because something happened

## Context

Proposed by Claude on 2026-11-19, in chat, and agreed by Erez the same day.

The gate grows one check at a time, each after a finding. Through 0.5 the findings came
from repositories: something went wrong once and a check was added. On 2026-11-19, in
0.6.0 to 0.6.2, most came from the cold reader constructing a case (a task file renamed,
copied, split, changed only in whitespace). One of them was a regression. The rest were
cases nobody had met, and one question, which sections are a scene's own, took three
decisions, each superseding the last (D33, D34, D36). A reader asked to find what is
wrong always finds something, so this has no end of its own. Each check is also one more
wording an agent can satisfy without doing the thing, which the review rounds of 0.4.0
were written against.

The rule proposed: a finding changes the gate when it happened in a repository, or when
it breaks something a task file already promised. Any other finding is still written
into the task file, and is answered by a line in runbook 4.11, which already holds what
the bindings cannot enforce.

To decide before anything is written: who rules on a finding; whether `docs/reviewer.md`
changes or only what is done with what the reader returns; whether the rule is this
repository's alone or goes into the runbook for every repository.

**Promise** — The gate changes because of something that happened, not because of
something that might.

**Acceptance**

- [x] the assignee: the rule for when a finding changes the gate, and who rules on it, are recorded under `## Decisions` in this file
- [x] the assignee: `CLAUDE.md` states the rule, and runbook 4.11 says where a finding that is not admitted is written
- [ ] the assignee: the two findings of D35 are each ruled on by it, and the ruling is written into their task files

## Decisions

### 2026-11-19 · A finding that would grow the gate waits for what happened

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

### 2026-11-19 · Erez rules, and until he does a finding is not admitted

**Decision** — The agent writes the finding into the task file, tells Erez what it would
rule, and Erez rules. Until he admits it, it is not admitted. Erez chose to rule
himself.
**Rejected** — The agent ruling and Erez reversing by a superseding decision; holding
the scene uncommitted until he rules, which leaves a change unrecorded when he is away.
**Why** — The cost of a check is paid by everyone the gate runs for, and he is the one
who knows what happened in their repositories. A default keeps the scene whole in one
sitting.

### 2026-11-19 · A finding not admitted is a review item and a decision, not a new file

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

### 2026-11-19 · The rule is this repository's, and the reader's brief does not change

**Decision** — The rule is written in this repository's `CLAUDE.md`, with a paragraph in
`docs/SPEC.md`. `docs/reviewer.md` and the runbook's Appendix G are unchanged.
**Rejected** — Putting the rule into the runbook for every repository; telling the
reader to hold back constructed cases.
**Why** — The gate is changed only here, so only here can a finding grow it; in any
other repository the reader's findings are about that repository's own work. A reader
that filters is a reader that decides, and the ruling is Erez's.

## What was done

`CLAUDE.md` has the rule under *Code rules*: which findings it covers, when one is
admitted, that Erez rules and that a finding is not admitted until he does, and how one
that is not admitted is written (a review item and a `Not admitted:` decision).
`docs/SPEC.md` gains *How the gate grows*, which points there. Runbook 4.11's *Limits*
now opens by saying its list is what a person adopting should know, and that cases
constructed by a reader and not built against are `Not admitted` decisions in the
plugin's repository. Because the runbook changed, the plugin is 0.6.4 (the runbook's
first line, `.claude-plugin/plugin.json`, both manifests, and SPEC's "as of 0.6.4").
The form is unchanged at 1.0. No script changed.

The third acceptance box is open. The two findings of D35 are Erez's to rule on; the
agent's proposal was given to him in the session and is not written here as a ruling.

`node --test` at the root: 75 tests, 75 pass, on Node 22.23.5.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

Written by the reader. None of the three would grow the gate; they are about this
record.

### Runbook 4.11 points to a list that holds nothing yet

**Found** — 4.11 says a constructed case not built against is a `Not admitted: …`
decision in the plugin's `docs/DECISIONS.md`. At 0.6.4 no decision has that title: the
two known cases (D35) are open task files, not yet ruled on. The record did not say so.

**Done when**

- [x] a reader of 0.6.4 follows 4.11 to `docs/DECISIONS.md` → the record below says the list is empty until the D35 findings are ruled on
- [x] the other *Limits* bullets → unchanged

**Not asked** — a ruling on the D35 findings by the agent; a line per finding in 4.11.

### The third decision said of D35's tasks what D35 does not

**Found** — Its **Rejected** said a task file per finding "leaves tasks open that nobody
means to work". D35 says the two tasks are worked after the six of D7.

**Done when**

- [x] the third decision's rejected clause read beside D35 → the two do not disagree about whether D35's tasks are meant to be worked
- [x] D35 and its two task files → unchanged by this scene

**Not asked** — closing or deleting the two task files; ruling on them.

### The plan marks the task done with a box open

**Found** — `docs/PLAN.md` lists this task as done, because the compiler marks a task
done once it has a `## What was done`. The third acceptance box is open.

**Done when**

- [x] the record read beside `docs/PLAN.md` → the record says the plan lists this task as done while the third box waits on Erez
- [x] `docs/PLAN.md` → the compiler's output, not edited by hand

**Not asked** — a change to the compiler's rule for "done"; a new check in the gate.

## What was done

Answering the reading; only this file's wording changed, and the compiled D43 with it. At 0.6.4 the list that runbook
4.11 points to is empty: no decision is titled `Not admitted:` yet, and the two cases
known (D35) stay open task files until Erez rules on them, which is this task's third
box. `docs/PLAN.md` lists this task as done while that box is open, because the compiler
goes by the record and not by the boxes. The third decision's rejected clause now says
what a task file per finding does, and no longer that nobody means to work D35's tasks.

Reviewed by: the same reader, which read these corrections against the working tree
