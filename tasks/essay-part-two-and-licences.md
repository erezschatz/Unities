# Cut the essay's second part; licence the prose and the scripts

## Context

Asked by Erez on 2026-11-19, after the repository was opened.

1. Cut Part II of `docs/the-unities.md` if it is an old version of the runbook, having
   made sure that it is, and that nothing in it is lost.
2. Add a one-line licence notice to the script files the runbook plants.
3. Put the prose under Creative Commons Attribution-ShareAlike 4.0 International.

**Promise** — The essay says what the form is and nothing else says it twice; a reader
of any file knows under which licence they hold it.

**Acceptance**

- [x] the assignee: every block of Part II is listed below with where the runbook or the skill already says it, or where it was carried to
- [x] script: the Appendix J tests pass with the licence line in the four listings
- [x] the assignee: the essay and the README each name the licence they are under

## Decisions

### 2026-11-19 · What Part II said and the runbook did not goes into the runbook

**Decision** — Part II is cut whole. What it said that the runbook and the skill did not
is carried into the runbook as a new section, 4.11.
**Rejected** — Keeping a shortened Part II in the essay; dropping the remainder.
**Why** — Part I names no tools, and everything left over is about git and Claude Code.
The runbook is where the staging is described, so a second place for it in the essay
would be a second account. The essay now points to the runbook in one sentence.

### 2026-11-19 · The carried statements about Claude Code are not re-verified

**Decision** — Three statements are carried as they stood on 14 October 2026, and 4.11
says so: that `onFailure: "block"` has no effect on `Stop` hooks, that cloud sessions do
not read a machine's user settings, and that an agent-type `Stop` hook is experimental.
**Rejected** — Dropping them; presenting them as current.
**Why** — The request was that nothing be lost. They are cautions, not steps; nothing in
the procedure acts on them.

### 2026-11-19 · The plugin is MIT, the essay and the README are CC BY-SA

**Decision** — "The prose" is the essay and the README. The skill and the runbook stay
under MIT with the scripts.
**Rejected** — Putting the runbook and the skill under CC BY-SA as well.
**Why** — The runbook is what an agent carries out, and its templates (the standing
paragraph, `tasks/README.md`, the reader's brief) are copied into every adopting
repository and adapted there. Share-alike on those would attach to files in other
people's repositories. Erez may reverse this; it is two sentences in the README.

### 2026-11-19 · The licence text of CC BY-SA is linked, not included

**Decision** — The essay and the README link to the licence's page.
**Rejected** — A copy of the legal code in the repository.
**Why** — The licence's site could not be reached from where this was written, and a
retyped legal text is worse than a link.

## What was done

**Part II, block by block.** Each block of the cut text, and where it is now.

| Part II | Where it is said |
| --- | --- |
| Introduction; the strict and adapted definitions; "one constant and one settings entry" | runbook §1, including its table. That adapted "was learned by trying the strict one on such a repository" is in `README.md` only |
| The division of work between the skill and the runbook; the files the skill writes | `SKILL.md`, opening sections. Its "`docs/DECISIONS.md` (append-only)" is superseded: the file is compiled, and the entries are append-only in the task file (runbook §0) |
| "No status column, because status is derived" | runbook Appendix D, "Status is derived" |
| The fresh-session test | runbook §0, *Place*. The sentence calling it "the plainest statement of unity of place", and the decisions file "unity of action applied to choices rather than changes", were only in Part II: carried to 4.11 |
| Squash-merge makes the history read as strict | runbook §1 table, *Merge strategy*. The sentence "the branch is the rehearsal; `main` is the performance" was only in Part II: carried to 4.11 |
| *The stage*: the table of paths and roles; the one door | runbook Appendix A (`RULES`), Appendix D, §0. Its single `shared` pattern for `CHANGELOG.md` and `TODO.md` is superseded by `RULES.shared` and `RULES.retired`. That the script "is the rule, in code" was only in Part II: carried to 4.11 |
| *The check script*: the three modes; an unadopted target is not held | runbook §1 table, Appendix A, 4.7. "A clean tree passes, so reverting is always a way out" was only in Part II: carried to 4.11, limited there to the strict commit and end of turn, where it is true |
| The script's shape, as a listing | runbook Appendix A, in full |
| `RULES` is deliberately a presence test, and why that is enough; the "later tightening" to an added `## What was done` heading | Appendix G says it of the record only. The rest was only in Part II: carried to 4.11, *Limits*. The tightening has not been made, and 4.11 says so |
| *Wiring*: where the script is bound; the `pre-commit` and `settings.json` listings | runbook 4.2, 4.3, 4.7, Appendices B and C. Part II's `.git/hooks/pre-commit` is superseded: 4.3 says not to use it, because it is not committed |
| The table of which binding enforces which unity | only in Part II: carried to 4.11 |
| The `stop_hook_active` loop breaker | runbook §1 table, Appendix A, Appendix B |
| "CLAUDE.md gets one paragraph" | runbook 4.6, Appendix E. That a repository's own skill "holds procedure only", and "The skill says how; the hooks make sure", were only in Part II: carried to 4.11, which says that procedure is now `tasks/README.md` |
| *The release compiler*: only writer, `--no-verify` in strict, the release PR in adapted, deterministic output | runbook §1 table, 4.7, Appendix F. That a hook "can gate a change but not build a release", the sentence on the compiler's shape, that it reads git history, and the sentence about the release tag, were only in Part II: carried to 4.11. "Deleting finished task files cannot lose the trail" is limited there to the changelog, because the record compiler reads the work tree |
| *The reviewer* | runbook Appendix G. The remark that an agent-type `Stop` hook is experimental was only in Part II: carried to 4.11 |
| Limit: presence is not truth; "the reviewer covers truth; nothing covers it for free" | carried to 4.11, *Limits* |
| Limit: the adapted staging weakens unity of time; the repo must say what becomes of a failing PR | runbook §1; 4.8, item 6 |
| Limits: one session's tree; `onFailure` on `Stop`; trusted folders and cloud sessions; the gate's being required lives outside the repository; the discard is not automated | only in Part II, or only in part elsewhere: carried to 4.11 |

So Part II was mostly an older copy of the runbook, and not only that. It is cut from the
essay. The essay's sentence "Part II stages both" now reads "The runbook stages both",
and the essay ends with one sentence pointing to the runbook and a licence notice.

**The runbook.** New section 4.11, "What each binding enforces, and what none of them
can", holds what was carried, and says where it came from and that its statements about
Claude Code date from October. Nothing in it is a step. The four script listings
(Appendices A, F, J and K) carry one licence line, after the shebang where there is one:
copyright, the repository's address and `SPDX-License-Identifier: MIT`. Appendix A's
instruction says the line is part of what is fixed. All 41 tests pass. The runbook's
first line and the plugin are 0.5.5.

**The README.** Its note about Part II is removed. Its licence section says which files
are MIT and which are CC BY-SA 4.0.

Not done: the two-line `pre-commit` hook, the settings files and the Codex files carry no
licence line. `SKILL.md` was not changed.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

Written from the reader's report on the staged diff. It went through the cut text
statement by statement and did not trust the table above.

### The "later tightening" was recorded as built, and it is not

**Found** — The table said the check for an added `## What was done` heading "has since
been built (Appendix A)". Appendix A checks the sections a scene adds and never requires
one: source, test, doc and a task file with one line added under `## Context` pass.

**Done when**

- [x] the table row for the tightening → names no place where it is built
- [x] runbook 4.11, *Limits* → says a touched task file without an added `## What was done` passes, and that requiring it is a tightening not made
- [x] Appendix A and Appendix J → unchanged apart from the licence line

**Not asked** — Building the tightening; a new test.

### "In every mode" was added to the clean-tree sentence, and is false for `--pr`

**Found** — 4.11 said "A clean tree passes in every mode". `--pr` and adapted `--branch`
read the commits since the fork, not the tree.

**Done when**

- [x] 4.11, the clean-tree sentence → claims it for the strict commit and end of turn only
- [x] the table's account of the sentence → agrees with 4.11

**Not asked** — A change to the script; a mode table in 4.11.

### Deleting task files does lose something

**Found** — 4.11 said deleting finished task files "cannot lose the trail". True of the
changelog compiler alone; the record compiler reads the work tree.

**Done when**

- [x] 4.11 → limits the sentence to changelog entries and says what deleting a task file does to `docs/PLAN.md` and `docs/DECISIONS.md`
- [x] that the changelog compiler reads git history → still stated
- [x] the release-tag sentence → unchanged

**Not asked** — A change to either compiler; an archiving procedure.

### "The skill says how" was carried without the sentence before it

**Found** — Part II said a repository's own skill, if any, "holds procedure only". 4.11
carried only "The skill says how; the hooks make sure", where "the skill" reads as
`unities-project`.

**Done when**

- [x] 4.11 → quotes both sentences as the essay's, and says the procedure is now `tasks/README.md` (4.4)
- [x] "CLAUDE.md gets one paragraph" → still pointed to 4.6 and Appendix E

**Not asked** — A skill template; changes to `SKILL.md`.

### The reason the gate is a presence test was lost

**Found** — The table sent it to Appendix G, which says "presence, not truth" of the
record only. That the test role is not checked against its source, why presence is
enough, and "nothing covers it for free" were nowhere.

**Done when**

- [x] 4.11, *Limits* → says the gate does not check that a test exercises its source
- [x] 4.11, *Limits* → says presence already catches the record not being written at all
- [x] the table rows → point there
- [x] Appendix G → unchanged

**Not asked** — A coverage check; rewriting Appendix G.

### Five formulations were in no row and nowhere

**Found** — The decisions file as "unity of action applied to choices rather than
changes"; the fresh-session test as "the plainest statement of unity of place"; a hook
"can gate a change but not build a release"; the script "is the rule, in code"; the
compiler's "point is its shape".

**Done when**

- [x] each of the five → present in 4.11
- [x] each of the five → named in a table row

**Not asked** — Restoring Part II's structure or its listings in the essay.

### Two pointers were overstated

**Found** — "Learned by trying the strict one" is in the README, not in §1. The wiring
row did not say `.git/hooks/pre-commit` is superseded by 4.3, nor the stage row that the
single `shared` pattern is superseded by `RULES.retired`.

**Done when**

- [x] the introduction row → names `README.md` for that clause
- [x] the wiring and stage rows → say what is superseded, and by what
- [x] the README's sentence → unchanged

**Not asked** — Copying the clause into the runbook.

### 4.11's table described the adapted `Stop` as Claude Code only

**Found** — Under a heading that covers the Codex binding of 4.10, the `Stop` row gave
only Claude Code's behaviour.

**Done when**

- [x] 4.11 → says the table describes the Claude Code bindings and where Codex differs
- [x] the six rows → unchanged

**Not asked** — A Codex column; changes to 4.10.

## What was done

Answering the review above. Section 4.11 of the runbook was corrected in three places
and extended. The clean-tree sentence is limited to the strict commit and end of turn.
The sentence on deleting task files is limited to changelog entries and says what the
record compiler does. The table is said to describe the Claude Code bindings. Carried in
addition: the skill sentence with the one before it, the five formulations, and two new
limits, that the gate is deliberately a presence test and that a touched task file
without an added `## What was done` section passes. Six rows of the table above were
corrected and one replaced.

The second of those limits is a finding about the gate, not only about the essay: the
gate does not require a record, it checks the ones it is given. Nothing was built for it
here.

All 41 tests pass; no listing changed in this round.

