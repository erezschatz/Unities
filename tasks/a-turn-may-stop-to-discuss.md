# A turn may stop to discuss

## Context

Raised 2026-11-23 by Mandy's session, while upgrading Mandy to 0.6.8, in
`~/dev/erez/mandy/tasks/unities-plugin-asks.md` (its first ask): a turn there often stops
mid-change on purpose, to argue a design before it is built or to hand over a browser
recipe, and 0.6.8's strict `Stop` sends such a turn back once. Mandy asked for a value,
for example `"stop": "advise"`, under which the strict `Stop` only reports.

Erez, the same day, in chat: "There's nothing wrong with stopping a process to discuss
and I don't see any issue with it in Unities [...] the unity is of start to end process
being a single motion, not that it has to be done in a single, uninterrupted motion."

The plugin says otherwise today, so Mandy's reading is the plugin's. The strict `Stop`
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

- [ ] the assignee: the runbook says, in one place, what ends a scene and that a turn which stops to discuss does not, and the other places point to it
- [ ] the assignee: what the strict `Stop` does on an incomplete turn is ruled by Erez and recorded as a decision here before it is built
- [ ] script: the strict `Stop` behaves as that decision says, and `--staged` still refuses an incomplete scene
- [ ] script: `node --test` at the root passes with the manifest at the new version

## Decisions

### 2026-11-23 · No setting keeps the old --tree Stop

**Decision** — The strict staging gets no configuration value that turns its `Stop` into a
report. The procedure itself says that a turn may stop to discuss, and the gate follows
it in every repository.
**Rejected** — Mandy's `"stop": "advise"`, which keeps a repository's old `--tree` mode
alive under a new name.
**Why** — Erez: asks of this kind are attempts to keep what was over what is, and the
plugin is there to replace what was with what is. A repository whose reading differs
needs the procedure clarified, not a switch.
