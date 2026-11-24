# An upgrade may rewrite the compiled files' head

## Context

Raised 2026-11-23 from a single-developer repository in the strict staging, while it
was being upgraded to 0.6.8, in a task file of its own (the second of three asks). The gate refuses any
edit above the marker in `docs/DECISIONS.md` and `docs/PLAN.md` and says to change the
head through a new decision, but nothing in a decision reaches the head. That repository's
`docs/PLAN.md` head still says a task is done when its last record carries
`Status: done`, which stopped being true at 0.6.8. It asked for a way to edit the head
that the gate accepts.

Erez, the same day, in chat: the ask is an attempt "to keep what was over what is, and
the whole point of this plugin is to replace what was with what is. If this causes
issues with existing files, replace the files."

The runbook (4.7, *Shared files*) already says the scene that installs this, "a new
project's first, an adoption, an upgrade", is not held to the head rule. The gate holds
an upgrade to it: a file counts as compiled when its version at the scene's base carries
the marker, and at an upgrade it already does. So the upgrade cannot replace a stale
head, and the only way round is a commit that deletes the file and a later one that
writes it again.

**Promise** — When a repository takes a new version, a head that the new version makes
wrong is replaced in the same upgrade.

**Acceptance**

- [x] script: a scene that installs a new version of the procedure may change the head of either compiled file, and the gate passes it
- [x] script: any other scene that changes the head is refused, as before
- [x] the assignee: the runbook says how an upgrade checks the head against the new version and replaces what is stale, and 4.7 says the same as the gate
- [x] script: `node --test` at the root passes with the manifest at the new version

## Decisions

### 2026-11-23 · No door for hand edits to the head; the upgrade replaces it

**Decision** — The head of a compiled file stays closed to ordinary scenes. A stale head
is replaced by the scene that installs a new version, as 4.7 already says.
**Rejected** — The ask for a scene that touches only the head and a task file whose
decision explains it, which keeps the old head and patches it by hand.
**Why** — Erez: the plugin replaces what was with what is; where that leaves an existing
file wrong, the file is replaced.

### 2026-11-24 · An upgrade is told by the manifest's version; the decisions before adoption stay closed

**Decision** — Ruled by Erez, 2026-11-24, in chat ("Use the manifest version, keep the
old decisions closed, build it"). A scene is an upgrade when the planted manifest
(`.claude/hooks/unities.manifest.json`) carries a different `version` at the scene than at
its base. An upgrade may change the head of either compiled file above the first decision
the head holds, the one recorded before adoption (5.4); from that decision to the marker
the head stays as it was, and one that is wrong is superseded by a new decision, as now.
In the adapted staging an upgrade may touch the compiled files for their head alone:
what is below the marker must be as the base had it, since it is compiled after the merge.
**Rejected** — Treating the whole head as the upgrade's, which would make the decisions
recorded before adoption editable once per version; telling an upgrade by the runbook's
first line in `docs/UNITIES.md`, which is a document any scene may edit, where the
manifest is checked by hash against the planted scripts.
**Why** — The head holds two things: words about the record, which a new version can make
wrong, and decisions, which are history and are reversed only by a new entry.

### 2026-11-24 · The closed part of a head starts at its first numbered entry or heading

**Decision** — In `docs/DECISIONS.md` the decisions recorded before adoption begin at the
head's first line that is a numbered entry (`D<n> ·`) or a heading below the title (`##`,
`###`), whichever comes first, and run to the marker; spaces and tabs before the entry
belong to it, blank lines before it to the introduction. A `docs/PLAN.md` head holds no
decisions (5.4 moves its milestones out), so an upgrade may rewrite all of it.
**Rejected** — Taking only `D<n> ·` entries, which left a decision written `## D1 — …` or
`### <date> · …` open to an upgrade, as the cold reader of this scene showed; applying the
same rule to `PLAN.md`, where a heading such as `## Phases` is the introduction 5.4 keeps.
**Why** — Runbook 5.4 keeps the old entries exactly as they were written, so their form
varies; a numbered line or a heading is what they usually start with, and an introduction
rarely has one. An entry written some other way, such as `**D1** — …` or a numbered list,
is not closed, and none is known to be written so.

### 2026-11-24 · Not admitted: a manifest whose version alone is changed passes as an upgrade

**Decision** — Not built. A scene that changes only the planted manifest's `version`,
installing nothing, counts as an upgrade and may rewrite the heads above their decisions.
**Rejected** — Requiring an upgrade to change a planted script as well, which the cold
reader of this scene suggested: an upgrade whose version changed only the runbook leaves
every hash the same and would be refused.
**Why** — It needs the manifest edited by hand, which nothing else in a repository does,
and what it can reach is the introduction of two files, never a decision. Erez chose the
manifest's version as the signal. What Claude would rule: not admitted.

## What was done

`skills/unities-project/files/check-unit.mjs`: `upgrade` is true when the planted manifest's
`version` differs between the scene and its base, both readable. `headDecisions` takes a
`docs/DECISIONS.md` head from its first numbered entry or heading below the title to the
marker (the second decision above), and nothing of a `docs/PLAN.md` head; `headMayChange`
holds for an upgrade whose head's decisions are unchanged. In strict, and in the adapted
compile, a head change passes where `headMayChange` holds; where an upgrade changed the
decisions, the refusal names the file and says its decisions recorded before adoption
were edited. In adapted, an upgrade may
touch a compiled file when only its head changed in that way and `below`, the marker and
what the compiler wrote under it, is as the base had it; any other touch is refused as
before.

Tests: "strict: an upgrade may rewrite a compiled file's head above its old decisions; no
other scene may" (the same head edit refused without the version change, passed with it,
and refused again when the decision recorded before adoption is changed); "adapted: an
upgrade's pull request may rewrite the head and nothing below the marker" (passed; the
same edit without the version refused, as the compile alone or beside another file; an
upgrade that also writes below the marker refused). Both fail on the previous gate. From
the cold reader's findings: "an upgrade keeps old decisions closed from their first D<n> ·
line or heading, and only them" (a decision written `## D1 — …` or `### <date> · …` refused
when rewritten; a blank line added before the first decision passed; a `PLAN.md` head with
a `## Phases` heading rewritten by an upgrade passed).

Runbook 4.5 says an upgrade is the exception, pointing to 4.7; 4.7 says what an upgrade is
and what it may change, in both stagings, and no longer calls an upgrade exempt the way an
adoption is; 5.3 says the re-run reads both heads against the new version, rewrites a
sentence the version makes wrong, says which in the record, and leaves the decisions. In
this repository every version bump changes the planted manifest, so such a scene may also
rewrite these heads.

Because the gate and the procedure changed, the plugin is 0.6.16: the runbook's first
line, `.claude-plugin/plugin.json`, the manifest (both copies) and SPEC's "as of 0.6.16".
The form is unchanged at 1.0. The planted copies here equal the masters. `node --test` at
the root, on Node 26.13.1 with Deno 2.9.8: 106 tests, 106 pass, none skipped.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. In throwaway clones it ran the suite and probed upgrades and ordinary
scenes against heads in strict and adapted, over two readings; its findings are the review
below, answered before commit, the second reading's in its last item.

## Review · 2026-11-24

### A manifest version edit alone makes a scene an upgrade

**Found** — `upgrade` compares only the manifest's `version`, which the hash check does
not cover; a scene that sets it to anything and installs nothing may rewrite the heads.

**Done when**

- [x] a scene that changes only the manifest's `version`, plus the head → the gate is unchanged, under "Not admitted: a manifest whose version alone is changed passes as an upgrade"
- [x] a scene that installs the plugin's copy of a new version → passes as now
- [x] the plugin repository itself → refused as now, because the master and planted manifests differ

**Not asked** — no signing and no network lookup of versions.

### Old decisions not written as D<n> · are open to an upgrade

**Found** — `headDecisions` found old decisions only by a `D<n> ·` line; `## D1 — First`
rewritten in an upgrade passed.

**Done when**

- [x] an upgrade that edits a head decision written as `D1 —` or `### <date> ·` → refused
- [x] a head with no decisions, edited by an upgrade → passes
- [x] an intro line starting `D7 ·` → only the text below it is frozen, as now, or else excluded from the frozen decisions

**Not asked** — no parsing of each entry.

### Changing blank lines before the first decision is refused

**Found** — The pattern's `\s` took in the blank line before the first decision.

**Done when**

- [x] an upgrade that changes only the blank lines between the intro and the first decision → passes

**Not asked** — nothing further.

### Record overstates the refusal

**Found** — The record said the refusal names the decisions; it names the file.

**Done when**

- [x] `## What was done` → says what the refusal message actually names

**Not asked** — nothing further.

### Test name claims "in whatever form they were written"

**Found** — Second reading. Old decisions written `**D1** — …`, `1. 2026-01-01: …` or
`# D1 — …` are not closed, though the test's name, quoted in the record, said every form
was.

**Done when**

- [x] the test name and the record → say which forms are closed, or those forms are refused when an upgrade rewrites them

**Not asked** — no parsing of each entry.
