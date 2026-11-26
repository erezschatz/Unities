# A case the gate deliberately does not check is called "left unchecked"

## Context

Asked by Erez on 2026-11-26, in chat. He could not tell what "not admitted" meant, or
how a decision is recorded when it is not admitted. The term means that a case was put
forward as a new check for the gate and was not let in. It takes knowing the rule in
`CLAUDE.md`, *A check enters the gate because something happened*. He rejected "Not
gated" as worse and asked for a term the average user understands. Of the terms put to
him ("Left unchecked", "Known gap", "Won't check", "Considered and left out"), he chose
"Left unchecked".

In the live docs the term appears in three places: the runbook's 4.11, *Limits*, which
tells an adopting repository where such decisions are listed; `CLAUDE.md`'s rule; and
`docs/SPEC.md`, *How the gate grows*. In the record it is throughout: for example the
titles of decisions (`Not admitted:`, `Admitted:`), D41–D43, which made the rule, the
bodies of later decisions ("Admitted by Erez", "nobody admitted"), and *Done when* lines
in task files. No script reads it.

**Promise** — Someone reading the decisions can tell, without knowing the rule behind
it, that a case is known and deliberately not checked.

**Acceptance**

- [x] the assignee: runbook 4.11, `CLAUDE.md` and `docs/SPEC.md` call such a case left unchecked, 4.11 and `CLAUDE.md` name its decision's title, and none of them says a check is admitted or not admitted

## Decisions

### 2026-11-26 · "Left unchecked" replaces "Not admitted"

**Decision** — A decision recording a case that the gate deliberately does not check is
titled `Left unchecked: <the case>`. Erez's ruling to keep it so is titled
`Left unchecked, by Erez: <the case>`. The rule in `CLAUDE.md` says that he "lets it
into the gate" where it said "admits it". Decisions already compiled keep their titles,
since a decision is not edited; runbook 4.11 names the old title beside the new one so
that both are found. The title of the task that made the rule
(`tasks/a-check-is-admitted-from-what-happened.md`) stays as it is too. A case let into
the gate gets no set title: its decision says what the gate now checks, and supersedes
the `Left unchecked` or `Not admitted` entry if there is one. D41, D42 and D43 are
superseded for their wording only: D41's two grounds for letting a check in, D42's
ruling by Erez, with the gate unchanged until he rules and the agent saying what it
would rule, and D43's review item and decision in the
task file, with 4.11 saying once where they are listed, all stand.
**Rejected** — "Not gated", which Erez found worse; "Known gap", which suggests a hole
waiting to be fixed; "Won't check", which sounds final; "Considered and left out", too
long for a title repeated across entries; retitling the old decisions; renaming
`Admitted:` to a set opposite of "Left unchecked", a second new term no one asked for.
**Why** — "Not admitted" only makes sense to someone who knows the rule behind it. "Left
unchecked" says in plain words that nothing checks the case and that someone chose that.
Supersedes: D41, D42, D43

### 2026-11-26 · 0.6.18

**Decision** — The runbook changes, so the plugin is 0.6.18. The form is unchanged at 1.0.
**Rejected** — Leaving the runbook's 4.11 on the old term until another version.
**Why** — A change to the procedure is a version (`docs/SPEC.md`, *Versions*).

## What was done

The runbook's 4.11, *Limits*, says such a case is recorded as a decision whose title
begins `Left unchecked` (before 0.6.18, `Not admitted`). `CLAUDE.md`'s rule *A check enters the gate because something
happened* says that Erez lets a check into the gate and that until then the case is
left unchecked. It names both titles and says `docs/DECISIONS.md` lists what is known
and not checked. `docs/SPEC.md`, *How the gate grows*, says such a case is left
unchecked until Erez lets it into the gate, and points to `CLAUDE.md`. No script reads
the term, and none changed.

The plugin is 0.6.18: the runbook's first line, `.claude-plugin/plugin.json`, the
manifest (both copies) and SPEC's "as of". `node --test` at the root: 106 tests, 106
pass.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`; it read the staged diff cold against this file and ran the tests, the
record compiler and the gate in a throwaway clone. Its five findings are the review
below, answered before commit.

## Review · 2026-11-26

The reader's findings, condensed by the agent that did the work. None would change what
the gate refuses.

### Runbook 4.11 pointed to a title no decision has yet

**Found** — 4.11 said such a case is titled `Left unchecked: …`; every case recorded so
far is titled `Not admitted`, and the decisions keep their titles.

**Done when**

- [x] an adopter follows 4.11 to the plugin's `docs/DECISIONS.md` → finds every case recorded so far, including those titled `Not admitted`
- [x] someone reads one old decision (D45 … D93) on its own → nothing in the compiled record disagrees about what its title means, or the record says plainly that old titles are not explained where they stand
- [x] the compiled decisions before D94 → unchanged
- [x] a new case recorded after this change → titled `Left unchecked: <the case>`

**Not asked** — retitling compiled decisions; a line per case in 4.11; any gate change.

### The acceptance box claimed SPEC names the title

**Found** — SPEC says a case is left unchecked but names no title; the box and the
record said it did.

**Done when**

- [x] the acceptance box read beside SPEC → claims of SPEC only what SPEC says
- [x] *What was done* read beside SPEC → the same
- [x] 4.11 and `CLAUDE.md` → unchanged by the fix

**Not asked** — restating the `CLAUDE.md` rule in SPEC.

### D94 changed D43's title without superseding it

**Found** — D43 fixed the title as `Not admitted: <the case>`, and D41 and D42 state the
rule in the old term; D94 named none of them.

**Done when**

- [x] the compiled `docs/DECISIONS.md` read top to bottom → no standing decision fixes the title as `Not admitted: <the case>`
- [x] the parts of D41, D42 and D43 that D94 does not change → still stand, and D94 says so
- [x] `docs/PLAN.md` → the compiler's output, unchanged by this

**Not asked** — editing D41–D43; changing the rule's substance.

### 4.11's title did not reach the cases ruled on

**Found** — `Left unchecked, by Erez:` does not begin `Left unchecked:`, so a search for
4.11's title missed the settled cases.

**Done when**

- [x] an adopter searches for the title 4.11 gives → finds both the open cases and those ruled on
- [x] `CLAUDE.md`'s two titles → unchanged

**Not asked** — another version beyond 0.6.18; any gate change.

### Nothing said what a case let into the gate is titled

**Found** — Practice titles it `Admitted: …` (D62); renaming only the other side left
the next scene to write the old term.

**Done when**

- [x] the next scene records a case let into the gate → D94 says what its decision is titled
- [x] the Context's list of where the term appears → says it counts the live docs, and names the decision titles and D41–D43 apart
- [x] the compiled decisions titled `Admitted` → unchanged

**Not asked** — retitling D62 or any compiled decision; the let-in title in 4.11.

## What was done

Answering the reading. Runbook 4.11 names a decision whose title begins `Left unchecked`,
with `Not admitted` for those before 0.6.18, so a search finds open and ruled cases
under either term. D94 now says that a case let into the gate gets no set title, and
that its decision says what the gate checks and supersedes the `Left unchecked` entry.
It supersedes D41, D42 and D43 for their wording, and says which of their parts stand.
The acceptance box and the first record claim of SPEC only what it says. The Context
says the term is counted in the live docs, with the decision titles and D41–D43 named
apart. `docs/DECISIONS.md` was regenerated from HEAD and recompiled. `node --test` at the
root: 106 tests, 106 pass.

Reviewed by: the same reader, on a second reading; it checked each *Done when* line and
this record against the staged diff, reran the tests, the record compiler and the gate
in a throwaway clone, and found the four points below

## Review · 2026-11-26

The second reading's findings, condensed by the agent that did the work. None would
change what the gate refuses.

### A Done-when line was narrowed in condensing

**Found** — The first item's line about an old decision read on its own was condensed
to what D94 says, which that reader never sees.

**Done when**

- [x] the review item's lines read beside the reader's original → they name the same cases
- [x] the task's promise read beside D45 … D93 → the record says it holds from D94 on only
- [x] the compiled decisions D1–D93 → unchanged

**Not asked** — retitling or annotating old decisions.

### D94 restated D42 as making the agent's view the default

**Found** — D42 keeps the gate unchanged until Erez rules; the agent only says what it
would rule.

**Done when**

- [x] D94 read beside D42 and `CLAUDE.md` → the part of D42 that stands is the gate unchanged until Erez rules, with the agent saying what it would rule
- [x] D94 on D41 and D43 → unchanged

**Not asked** — changing the rule; editing D42.

### The Context undercounted the term in the record

**Found** — It named the decision titles and D41–D43 as if complete; the term is also
in later decisions' bodies and in *Done when* lines.

**Done when**

- [x] the Context's list read beside `git grep -i admit` → says it gives examples

**Not asked** — changing any of those places.

### A let-in case superseded only a Left unchecked entry

**Found** — Every open case so far is titled `Not admitted`, which D94's wording did not
name.

**Done when**

- [x] a case recorded as `Not admitted:` is let in → D94 says its decision supersedes that entry
- [x] a case recorded as `Left unchecked:` is let in → supersedes it, as now
- [x] a let-in case with no earlier entry → no `Supersedes:` line, as now

**Not asked** — a set title for let-in cases; any check of `Supersedes:`.

## What was done

Answering the second reading. The first review item's second line is restored to the
words the reader gave; it was narrowed in condensing. It holds by its second branch: the
promise holds for decisions from D94 on. A decision before D94, read on its own, still
says `Not admitted` or `Admitted` with nothing beside it to explain the term, because
decisions are not edited; D94 and runbook 4.11 are where the old title is explained.
D94 now says the part of D42 that stands is the gate unchanged until Erez rules, with the
agent saying what it would rule, as `CLAUDE.md` says. A case let in supersedes a
`Left unchecked` or a `Not admitted` entry. The Context gives the places the term is in
the record as examples. The second record also left out three changes of the second
pass: the first record's 4.11 sentence was rewritten, D94's **Rejected** gained the
clause about a set opposite for `Admitted:`, and the first record gained its
`Reviewed by:` line. `docs/DECISIONS.md` was regenerated from HEAD and recompiled.
`node --test` at the root: 106 tests, 106 pass.

Reviewed by: the same reader, on a third reading; it checked the second review's *Done
when* lines and this record against the staged diff, reran the tests, the record
compiler and the gate in a throwaway clone, and found every line to hold
