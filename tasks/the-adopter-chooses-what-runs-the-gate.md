# The adopter chooses what runs the gate

## Context

Raised by the developer on 2026-11-26, in chat, after an adoption in the adapted staging
came up with Azure CI pipelines: "The idea is that in 'Adapted' the gate is in the PR
merge. What does it? none of our concern! An azure pipeline, a dedicated app, a person
checking out the branch and running claude locally, or whatever, it's not something that
can be dedicated from within nor should it be. [...] we only give the means and if they
say 'create me a this and that for the gate' then that could be done from the project,
but we don't decide or dictate or create or make that part of the process."

Asked whether Appendix I, the Azure DevOps listing, should go or stay as a reference:
"(a), remove it, there current guide is way too restrictive. But I don't want to lose the
stuff that's there, it's very usable to anyone who does want to use this [...] Detach all
the parts about CI, Azure etc and rewrite them in another file that is not required
reading in the skill and so if I say 'run this and that so I'll have an Azure/AWS/whatever
CI' it will have that available".

Runbook 4.7 opened "Add a CI job that runs `check-unit.mjs --pr <target>` on every pull
request [...] and make it required", with Appendix I as the example; 4.5 ranked who runs
the record compiler after a merge, one choice a CI job from Appendix I; discovery and the
report had the agent settle where the gate runs; the skill listed "the CI gate for
adapted" among what an adoption installs.

**Promise** — An adoption says where the gate and the compile run and what they must do,
and leaves what runs them to the person, with what is known about running them there
when they ask for it.

**Acceptance**

- [x] the assignee: the runbook says, for adapted, that the gate runs before each merge into `base` and the record compiler after it, what each must do, and that what runs them is the person's choice; no passage tells the agent to build a CI job or pipeline
- [x] the assignee: what Appendix I held is in `skills/unities-project/RUNNING-THE-GATE.md`, its two listings and their prose word for word
- [x] the assignee: the skill names `RUNNING-THE-GATE.md` only for when the person asks for something to run the gate, and lists no CI gate among what an adoption installs
- [ ] the developer: in a repository set up for the check, asks for a pipeline to run the gate, and the agent builds it from `RUNNING-THE-GATE.md`; what was asked and what was built is written into this file

## Decisions

### 2026-11-26 · The runbook states the gate's place and contract; what runs it is the person's

**Decision** — Ruled by the developer, above. In adapted the runbook says the gate runs
before each merge into the branch in `base`, as `check-unit.mjs --pr <target>` in a
checkout of the source tip reaching the fork point, the merge going ahead only on exit 0;
and that after each merge the record compiler runs on that branch and its output is
committed there. What runs either is the person's choice; discovery notes how pull
requests are merged, the report asks what will run them, and the agent builds nothing for
them unless asked. Until something compiles after a merge, a person does it through a
pull request of only the compiled files.
**Rejected** — Keeping "Add a CI job" in 4.7, and the ranking of who compiles in 4.5,
which made an adoption build CI; keeping Appendix I as a reference in the runbook, read
by every adoption; deleting what Appendix I held.
**Why** — The developer: what does the gate "is none of our concern", and "we only give
the means".

### 2026-11-26 · What is known about running the gate is a file of its own, read on request

**Decision** — `skills/unities-project/RUNNING-THE-GATE.md` holds the two contracts in
brief, making the gate binding (a required check, or a merging tool that refuses on a
non-zero exit, and why the two collide), the merge man as a job, Appendix I's Azure
DevOps listings and their prose word for word, and how to approach another service. The
runbook does not send an adoption there; the skill reads it only when the person asks
for something to run the gate or the record compiler. Appendix I stays as a two-line
pointer, so the letters of J, K and L do not move. In this repository the file is in the
procedure role (`.claude/hooks/unities.json`), held to a doc and a task change.
**Rejected** — Putting it under `docs/`, which is this repository's and is not shipped
with the plugin; renumbering the appendices, which every reference to J, K and L would
have to follow; leaving the new file in no role, so a change to it is held to nothing.
**Why** — The developer: "I don't want to lose the stuff that's there", in "another file
that is not required reading in the skill".

### 2026-11-26 · 0.6.21

**Decision** — The runbook and the skill change, so the plugin is 0.6.21. The form is
unchanged at 1.0.
**Rejected** — Carrying it in 0.6.20, which is committed.
**Why** — A change to the procedure is a version (`docs/SPEC.md`, *Versions*).

## What was done

Runbook (0.6.21): the §1 table's row names the gate at the pull request, required in
adapted before each merge, what runs it the person's. Discovery's *Who merges* notes how
pull requests are merged and what already runs checks, and the report's item 7 asks what
the person says will run the gate and the compile, without proposing one. 4.5's merge man
says what must happen after a merge and that what does it is the person's, with a person
compiling by pull request until something does. 4.7 opens with the gate's place and
contract and says what runs it is the person's choice, with nothing built unless asked;
the paragraph on a merging tool's API colliding with a required CI policy moved out. The
strict paragraph no longer says "install it if there is CI". 4.11's table row and its
limit, and Phase 6 step 7, speak of whatever the person runs at the merge, and Appendix
E's paragraph of "whatever this repository runs there". Appendix I is a pointer.

`skills/unities-project/RUNNING-THE-GATE.md` is new: the two contracts, making the gate
binding, the merge man as a job, the Azure DevOps section, and other services. Its Azure
section is Appendix I as HEAD held it, byte for byte (compared with `diff`). The skill no
longer lists the CI gate among what an adoption installs, and *What this skill is not*
says it does not build what runs the gate and reads `RUNNING-THE-GATE.md` only on
request. README lists the new file; SPEC's scope gives it its own entry, the runbook's
bindings are B, C and L, and the procedure role names it, as does
`.claude/hooks/unities.json`.

The plugin is 0.6.21: the runbook's first line, `.claude-plugin/plugin.json`, the
manifest (both copies) and SPEC's "as of". No script changed. `node --test` at the root:
108 tests, 108 pass.

The last acceptance box is open: building a pipeline on request is checked by asking for
one in a repository set up for it.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`; it diffed the old Appendix I against the new file's Azure section,
ran the record check, the suite and the gate, and read both whole files against the
ruling. Its four findings are the review below, answered before commit.

## Review · 2026-11-26

The reader's findings, condensed by the agent that did the work. All are about the
procedure's prose; none changes the gate.

### The skill still assumed CI and offered the merge man's options

**Found** — The skill's *Adapted* bullet said a required check refuses an incomplete PR,
and its upgrade paragraph asked who the merge man will be from a list of three.

**Done when**

- [x] the skill's adapted bullet → says the PR does not merge unless `check-unit.mjs --pr` passes, run by whatever the person chooses
- [x] the skill's upgrade paragraph → asks what will compile after each merge, offers no candidates, and says a person compiles by pull request until something does
- [x] the skill's *Not the builder* paragraph and its installs list → unchanged
- [x] runbook 4.7, 4.5 and report item 7 → unchanged by this item

**Not asked** — a new section in the skill; a restatement of 4.7 there.

### The runbook's contract left out tags and the commit's identity

**Found** — The new file named the target's tags as part of the gate's contract and an
identity allowed to push as part of the merge man's; the runbook, now the only contract,
named neither, and report item 7 and Phase 6 step 7 asked different things.

**Done when**

- [x] runbook 4.7 → says the checkout needs the target's tags for the release check, and that without them it compares from the first commit
- [x] runbook 4.5 → says the compile is committed under an identity allowed to push to the branch in `base`
- [x] report item 7 and Phase 6 step 7 → both ask the identity
- [x] the new file's *What the two must do* → points to 4.7 and 4.5 and adds nothing they lack
- [x] the new file's Azure DevOps section → byte for byte as HEAD's Appendix I

**Not asked** — a service-specific instruction to fetch tags; a proposal of who the merge man is.

### Phase 7 pointed at a merge man 4.5 no longer names

**Found** — Phase 7 said "the merge man named in 4.5".

**Done when**

- [x] Phase 7's adapted half → names what the person said will compile after each merge (3.4, item 7), or a person by pull request where nothing does yet
- [x] Phase 7's strict half → unchanged

**Not asked** — any other change to Phase 7.

### The new file was hard to reach when the person asks

**Found** — The skill triggers on kickoff and migration, and Appendix I's pointer gave no
path; in an adopted repository, asked for a pipeline, an agent reading 4.7 found none.

**Done when**

- [x] a deployed `docs/UNITIES.md` → 4.7 says where the file is, by its full location, for when the person asks
- [x] Appendix I's pointer → gives the same location
- [x] an adoption that is not asked for a runner → reads none of it and builds nothing
- [x] the skill's *Not the builder* paragraph → unchanged in meaning

**Not asked** — a new skill or hook; making the file required reading.

## What was done

Answering the reading. The skill's *Adapted* bullet says the PR does not merge unless
`check-unit.mjs --pr` passes, run by whatever the person chooses, and its upgrade
paragraph asks what will compile after each merge, with a person by pull request until
something does. Runbook 4.7 says the release check needs the target's tags and gives the
new file's full location for when the person asks; 4.5 says the compile is committed
under an identity allowed to push; report item 7 asks that identity, as Phase 6 step 7
does; Phase 7 names what the person said will compile, or a person by pull request.
Appendix I's pointer gives the full location. The new file's *What the two must do*
points to 4.7 and 4.5 and states nothing they do not. README's runbook row no longer
names a CI example, and the moved paragraph on a merging tool says "hosting service"
where it said "CI service"; the first record left both out. `node --test` at the root: 108
tests, 108 pass.

Reviewed by: the same reader, on a second reading; it re-diffed the Azure section, ran
the record check, the suite and the gate, found every line of the review above to hold,
and found the two points below

## Review · 2026-11-26

### The new file said the runbook never points to it

**Found** — Second reading. Its first sentence said "nothing in the runbook sends you
here", and 4.7 and Appendix I now name it.

**Done when**

- [x] the file's opening → says it is not part of an adoption, and the runbook names it (4.7, Appendix I) only for when the person asks
- [x] runbook 4.7 and Appendix I → unchanged
- [x] an adoption that is not asked for a runner → reads none of the file

**Not asked** — any other change to the file.

### The push identity read as applying to the pull-request route too

**Found** — Second reading. 4.5 said the compile is committed under an identity allowed
to push, and the report asked it, though a person compiling by pull request pushes
nothing to `base`.

**Done when**

- [x] 4.5, where something pushes the compile straight to the branch → under an identity allowed to push there
- [x] 4.5, where a person compiles through a pull request → no push identity asked for
- [x] report item 7 and Phase 6 step 7 → ask the identity only where the compile is pushed to the branch itself, and take "a person, by pull request" otherwise

**Not asked** — a proposal of who the merge man is; service-specific permission names.

## What was done

Answering the second reading. The new file's opening says the runbook names it only for
when the person asks. 4.5 asks for a push identity only where something pushes the
compile to the branch itself; report item 7 and Phase 6 step 7 ask the same, and item 7
takes "a person, by pull request" as an answer. The Azure section is unchanged.

Reviewed by: the same reader, on a third reading; it re-diffed the Azure section, ran the
record check, the suite and the gate, and found every line of the second review to hold.
