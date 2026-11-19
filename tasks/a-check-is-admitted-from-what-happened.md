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

- [ ] the assignee: the rule for when a finding changes the gate, and who rules on it, are recorded under `## Decisions` in this file
- [ ] the assignee: `CLAUDE.md` states the rule, and runbook 4.11 says where a finding that is not admitted is written
- [ ] the assignee: the two findings of D35 are each ruled on by it, and the ruling is written into their task files
