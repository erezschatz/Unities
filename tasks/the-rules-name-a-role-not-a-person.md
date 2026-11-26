# The rules name a role, not a person

## Context

Asked by the developer on 2026-11-26, in chat: "I really hate seeing my name in all those
decisions 'Erez runs the compiler and commits the release from his shell', So now if Joe
wants to use this project, does he need for an 'Erez' to do stuff? [...] Most of it can be
replaced by 'the developer' I think, no?" The developer agreed to the scope put to them the same day.

What the plugin ships names no one in a role: the runbook, the skill and the README give
no person anything to do. The name is there as copyright in the scripts, as author and
owner in the plugin and marketplace files, and in the marketplace's description; the
handle `erezschatz` is the marketplace's and the repository's identifier in the README,
the runbook, SPEC and the marketplace file. The name is in this repository's own rules,
`CLAUDE.md` and `docs/SPEC.md`, where it stands for the one developer's roles, and
throughout the task files and the compiled decisions, which are the history.

**Promise** — Anyone who picks this repository up reads its rules as theirs to follow,
not as one person's habits.

**Acceptance**

- [x] the assignee: `CLAUDE.md` and `docs/SPEC.md` name a role, the developer, wherever they said who does a thing, and the name is left only in the essay rule, as its author and the one whose request allows a change to it

## Decisions

### 2026-11-26 · The rules say "the developer"; the history keeps its names

**Decision** — In `CLAUDE.md` and `docs/SPEC.md`, every sentence that said the developer, by name, does,
decides or rules on something says the developer, with "they" for the pronoun. The
ruling title in `CLAUDE.md` becomes `Left unchecked, by the developer: <the case>`.
Records written from now on say "the developer" too, in a quote's attribution as
anywhere else; a quote's words stay as they were said, the name among them
if the speaker used it. The essay rule keeps the name, both as the essay's author and
as the one whose request allows a change to it, as the copyright lines and the plugin's
author and owner keep it; the developer's roles no longer include owning the essay. The
handle `erezschatz` in the marketplace's and the repository's names is an identifier,
not a role, and stays.
**Rejected** — Rewriting the task files and `docs/DECISIONS.md`, which would edit
decisions and Context that are not edited and break the rule that a decision is reversed
only by a new entry; "the maintainer", which says less than the word the runbook already
uses for the person in a scene; keeping the name in the rules as the developer's, which
is what made the project read as needing one person; replacing the name inside a quote,
since a quote is the speaker's words and the history keeps its names.
**Why** — The developer: the rules read as if the project needs one named person to
work. A role is
something anyone can take; the history is a record of who did what, and stays true as
written.

## What was done

`CLAUDE.md`: the release, the ask when unsure, who says a build is green, ticking boxes,
the boxes handed over, the task that opens a new form version, the ruling on a check,
the *Division of labour* entry and the machine the tests ran on all say the developer.
The ruling title is `Left unchecked, by the developer:`. *Division of labour* says the
essay is its author's and points to *Code rules*, whose essay rule keeps the name as the
author and as the one whose request allows a change. `docs/SPEC.md`: *How the gate
grows*, *The form's version*, *Releases* and the Stack table say the developer. A
case-sensitive search of both files for "Erez" as a word and for "he", "his" and "him"
finds only the essay rule; the handle `erezschatz` stays in SPEC as the marketplace's
identifier.

No runbook, skill or script changed, so the version stays at 0.6.18. Runbook 4.11 still
finds every ruled case, since its title begins `Left unchecked`. `node --test` at the
root: 106 tests, 106 pass.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`; it read the staged diff cold and ran the record compiler, the gate and
`node --test` in a throwaway clone. Its three findings are the review below, answered
before commit.

## Review · 2026-11-26

The reader's findings, condensed by the agent that did the work. None would change what
the gate refuses.

### The record broke its own rule for quotes

**Found** — The decision said new records say "the developer", a quote included, and
this record quoted the name and put it in the decision's *Why*.

**Done when**

- [x] the Context's quotes → the decision says plainly that a quote's words stay as said and only its attribution is the developer
- [x] the decision's *Why* → names no one
- [x] D96 in `docs/DECISIONS.md` after compiling → matches the task file
- [x] task files and decisions written before 2026-11-26 → unchanged
- [x] the gate → unchanged

**Not asked** — rewriting earlier records; a gate check for names.

### The essay rule gives the author more than authorship

**Found** — "The essay is Erez's" also makes his request the only way to change the
essay; the box and the record described only authorship.

**Done when**

- [x] the acceptance box and the record → say the essay rule keeps the name as its author and as the one whose request allows a change
- [x] the essay rule in `CLAUDE.md` → unchanged
- [x] every other sentence in `CLAUDE.md` and `docs/SPEC.md` → says the developer
- [x] the gate → unchanged

**Not asked** — giving the developer the essay; editing `docs/the-unities.md`.

### The record's search and "never name a person" were looser than the files

**Found** — The handle `erezschatz` is in SPEC, the README, the runbook and the
marketplace file, and the marketplace's description names the author.

**Done when**

- [x] the record → says the search was case-sensitive for "Erez" as a word and the pronouns, and that the handle stays in SPEC as an identifier
- [x] the Context → says where the name and the handle are in what the plugin ships, and that none gives anyone a role
- [x] `README.md`, `UNITIES.md`, `docs/SPEC.md`'s handle and `.claude-plugin/marketplace.json` → unchanged
- [x] the gate → unchanged

**Not asked** — renaming the marketplace or the repository; any shipped file.

## What was done

Answering the reading. The decision says a quote is attributed to the developer and its
words stay as said, and that the handle `erezschatz` is an identifier and stays; its
*Why* names no one. The essay rule is described, in the box, the decision and the first
record, as keeping the name both as author and as the one whose request allows a change.
The Context says where the name and the handle are in what the plugin ships, and that
none of them gives anyone a role. The first record says what its search was.
`docs/DECISIONS.md` was regenerated from HEAD and recompiled.

Reviewed by: the same reader, on a second reading; it ran the record compiler and the
gate in a throwaway clone outside the repository, found every *Done when* line above to
hold, and found the two points below

## Review · 2026-11-26

The second reading's findings, condensed by the agent that did the work. Neither would
change what the gate refuses.

### The Context's own sentence used "he" and "him" for the developer

**Found** — The sentence after the quote, the record's own prose, said "He agreed to
the scope put to him".

**Done when**

- [x] the sentence after the quote → says the developer and "them"
- [x] the words inside the quote → unchanged
- [x] the review item saying "makes his request" of the essay's author → unchanged, since it speaks of the named author
- [x] task files written before 2026-11-26 → unchanged
- [x] the gate → unchanged

**Not asked** — a check for pronouns or names; rewriting earlier records.

### The quote choice had no rejected alternative

**Found** — Replacing the name inside a quote was considered and not taken, and the
decision's **Rejected** did not say so.

**Done when**

- [x] the decision's **Rejected** → names replacing the name inside a quote, and why not
- [x] D96 after compiling → matches the task file
- [x] the gate → unchanged

**Not asked** — a superseding entry; any change to the quote.

## What was done

Answering the second reading. The Context's sentence after the quote says the developer
and "them". The decision's **Rejected** names replacing the name inside a quote, since a
quote is the speaker's words and the history keeps its names, and its first sentence
now says the developer is named in a quote's attribution, with the quote's words kept.
`docs/DECISIONS.md` was regenerated from HEAD and recompiled.

Reviewed by: the same reader, on a third reading; it ran the record compiler and the gate
in a throwaway clone outside the repository and found every line of the second review to
hold.
