# A turn may stop to discuss

## Context

Raised 2026-11-23 from a single-developer repository in the strict staging, while it
was being upgraded to 0.6.8, in a task file of its own (the first of three asks): a turn
there often stops
mid-change on purpose, to argue a design before it is built or to hand over a browser
recipe, and 0.6.8's strict `Stop` sends such a turn back once. It asked for a value,
for example `"stop": "advise"`, under which the strict `Stop` only reports.

Erez, the same day, in chat: "There's nothing wrong with stopping a process to discuss
and I don't see any issue with it in Unities [...] the unity is of start to end process
being a single motion, not that it has to be done in a single, uninterrupted motion."

The plugin says otherwise today, so that repository's reading is the plugin's. The strict `Stop`
answers every incomplete turn end with "Complete the record in this same change, or
revert it. Do not leave it for later." (`check-unit.mjs`), and sends the turn back once.
The runbook says "an interrupted scene is abandoned" (4.11, what no binding can enforce) and the essay that if the sitting ends before step 7, steps 3 to 6 are
discarded. Nothing says that a turn's end is not the sitting's end. Whether "interrupted
scene is abandoned" is one of the form's four statements in §0 is not yet checked; if it
is, this task needs a decision that names the form's version, and the essay's wording is
Erez's to change.

What the strict `Stop` does instead (stop bouncing such a turn, or keep the one bounce
with a note that does not say revert) changes what the gate lets through, and is Erez's
to rule before it is built.

**Promise** — I can stop a turn in the middle of a change to talk it through, and the
Unities do not treat that as the scene being abandoned.

**Acceptance**

- [x] the assignee: the runbook says, in one place, what ends a scene and that a turn which stops to discuss does not, and the other places point to it
- [x] the assignee: what the strict `Stop` does on an incomplete turn is ruled by Erez and recorded as a decision here before it is built
- [x] script: the strict `Stop` behaves as that decision says, and `--staged` still refuses an incomplete scene
- [x] script: `node --test` at the root passes with the manifest at the new version

## Decisions

### 2026-11-23 · No setting keeps the old --tree Stop

**Decision** — The strict staging gets no configuration value that turns its `Stop` into a
report. The procedure itself says that a turn may stop to discuss, and the gate follows
it in every repository.
**Rejected** — The asked-for `"stop": "advise"`, which keeps a repository's old `--tree` mode
alive under a new name.
**Why** — Erez: asks of this kind are attempts to keep what was over what is, and the
plugin is there to replace what was with what is. A repository whose reading differs
needs the procedure clarified, not a switch.

### 2026-11-24 · A scene ends at its commit; the strict Stop only advises

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

## What was done

Checked first: the form's statements in §0 (Place, Time, Action, quoted from the essay)
do not include "an interrupted scene is abandoned"; that was the strict staging's, in
§1, which the runbook counts as tooling. So the form stays at 1.0. The essay speaks of the
*sitting* ending, not the turn, and is not changed.

`check-unit.mjs`: in the strict staging the gate refuses only outside a `Stop` (the
`PreToolUse` commit, pre-commit, a run by hand), with "Complete the record in this same
change before committing it."; the old message's "or revert it. Do not leave it for
later." is gone. At `Stop` both stagings now take the same path: Claude Code gets the note
once as `additionalContext`, Codex has the turn continued once with it, and the second
pass tells the person through `systemMessage`. The strict note reads "The commit will be
refused until the scene is complete. If you stopped to ask or to discuss, that is fine;
say what is still missing." A missing or broken configuration still sends a `Stop` back
once, as 4.11 says: that is an adoption left incomplete, not a scene.

Tests turned with the ruling: "strict: a commit with an incomplete scene is refused" now
asserts the new message and no "revert"; "strict: the Stop hook never sends the agent
back; it tells it once what is missing, then tells the person" (was: sends it back once);
"codex, strict: Stop continues the turn once with the note, as in adapted; PreToolUse
refuses the commit" (was: Stop refuses).

The runbook says what ends a scene in §1, in the strict staging's paragraph: its commit,
or the person abandoning it, and only then a revert; ending a turn to ask or discuss does
not, and an agent that is unsure stops and asks. §1's table, 4.2's `Stop` paragraph,
4.7's record paragraph, 4.10's account of the Codex binding (one continuation in both
stagings), 4.11's introduction, binding table, configuration line and discard line, Phase
6 step 8 (the Codex probe), Phase 7's list of what stays manual, Appendix B, Appendix G on
a reviewer whose report arrives after the turn, Appendix K's account of the tests, and
both standing paragraphs of Appendix E follow it, each pointing to §1 or saying it in a
line; the adapted paragraph gains the stop-and-ask line too. The skill's strict line,
`README.md`'s strict line, `readConfig`'s comment and this repository's `CLAUDE.md` say
the same.

Because the gate and the procedure changed, the plugin is 0.6.15: the runbook's first
line, `.claude-plugin/plugin.json`, the manifest (both copies) and SPEC's "as of 0.6.15".
The planted copies here equal the masters. `node --test` at the root, on Node 26.13.1
with Deno 2.9.8: 103 tests, 103 pass, none skipped.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. In a throwaway clone it ran the suite and every strict `Stop` and
commit path under Claude Code and Codex, and read the runbook, skill, README, SPEC,
reviewer brief and `CLAUDE.md` for anything that still says the strict end of a turn
refuses or that tells an agent not to stop; its two findings are the review below,
answered before commit without a second reading.

## Review · 2026-11-24

### Stale "strict refuses at Stop" left in the runbook, README and the gate's comment

**Found** — Runbook 4.2 ("strict refuses, adapted advises"), 4.10 (the Codex
continuation described as adapted only), the 4.11 introduction and Appendix K ("an
adapted `Stop`"), 4.11's configuration line ("as for an incomplete scene"), `README.md`'s
strict line and `readConfig`'s comment still described the old strict `Stop`.

**Done when**

- [x] 4.2 describes the strict `Stop` → it advises, as §1 and its table say
- [x] 4.10 describes the Codex `Stop` → one continuation in both stagings, strict's note saying stopping is fine
- [x] The 4.11 intro and Appendix K name the Codex `Stop` difference → for both stagings
- [x] 4.11 describes a broken configuration → sent back once, as an incomplete adoption, with no comparison to an incomplete scene
- [x] `README.md`'s strict line → the commit refuses; the end of a turn says what is missing
- [x] The `readConfig` comment → no longer says an incomplete scene is sent back
- [x] The strict commit (`PreToolUse`, pre-commit, `--staged` and `--branch` by hand) → still refuses (unchanged)

**Not asked** — no change to the essay, the form's version, or the config-error send-back.

### The record says the places now follow §1, but several do not

**Found** — The record's list of places left out 4.2, 4.10 and 4.11's configuration
line, and the README.

**Done when**

- [x] The record → names every place changed, and no place it lists still contradicts §1

**Not asked** — nothing further.
