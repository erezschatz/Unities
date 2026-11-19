# `--pr` measures a pull request from where it forked

## Context

Brought in by Erez on 2026-11-19, from the agent session of a team repository that runs
the adapted staging.

There, five task branches were cut from the target branch. Later the record was
recompiled on the target, which rewrote `docs/DECISIONS.md` there. After that,
`check-unit.mjs --pr <target>` refused all five branches with "compiled record edited in
this scene: docs/DECISIONS.md", though none of them touches that file. Checked against
each branch's fork point, all five passed. Merging the target into each branch made them
pass too, but any branch that falls behind its target fails the same way.

The cause: `--pr <target>` took the scene as `git diff <target> HEAD`, the difference
from the target's current tip. Every file the target changed after the fork counted as
the branch's change.

The intake came with a patch for Appendix A and asked for the plugin version to be bumped.

**Promise** — A branch that has fallen behind its target is judged on its own changes
only.

**Acceptance**

- [x] script: an Appendix J test in which the target recompiles the record after the branch forked passes `--pr <target>`
- [x] script: that test fails against the 0.5.2 script
- [x] script: in the same test, the branch's own edit to `docs/DECISIONS.md` is still refused
- [x] script: `--pr` with a target name git does not know exits 2 and names it
- [x] script: all Appendix J tests pass

## Decisions

### 2026-11-19 · The script finds the fork point, not the caller

**Decision** — `--pr <target>` computes `git merge-base <target> HEAD` itself and measures
the scene from there.
**Rejected** — Leaving it to the caller, as 4.7 did (`--pr $(git merge-base <target> HEAD)`).
**Why** — The caller got it wrong in practice and nothing said so: the check ran and
gave a wrong answer. `--branch` already finds the merge base itself. A caller that still
passes the fork point gets the same result, so nothing that follows the old 4.7 breaks.

### 2026-11-19 · Adoption is judged on the target's tip

**Decision** — Whether the record is required is decided by whether the target, as it is
now, carries `check-unit.mjs`.
**Rejected** — Deciding it at the fork point.
**Why** — What matters is the branch being merged into. The script judges adoption on
whatever name it is handed. A caller that passes the target, as 4.7 now says, has a
branch cut before the target adopted the Unities checked. A caller that still passes the
fork point is still judged there, and such a branch is still skipped.

### 2026-11-19 · A target git does not know is an error

**Decision** — `--pr <name>` exits 2 when `<name>` is not a commit in the checkout.
**Rejected** — Treating it as a target that has not adopted yet, which is what happened:
the check printed one line and exited 0.
**Why** — A typo in the caller, or a target branch that was never fetched, passed every
pull request unchecked. Only a target that exists and has no `check-unit.mjs` has not
adopted. A caller that passed for this reason now fails until its checkout fetches the
target.

### 2026-11-19 · No fork point is an error

**Decision** — When git finds no merge base between the target and `HEAD`, the script
exits 2 and says the checkout lacks the history.
**Rejected** — Falling back to the difference from the target's tip; letting the git
call throw.
**Why** — The fallback is the bug this task removes. A stack trace does not tell the
person reading a CI log that the clone is shallow.

### 2026-11-19 · The essay keeps its October wording

**Decision** — `docs/the-unities.md` is left as written on 14 October 2026, including
its `--pr <base>` row.
**Rejected** — Updating the essay's Part II with each change to the script.
**Why** — Part II describes the staging as it stood then, and the README says the
runbook is the current one. Keeping two descriptions of the script in step is a second
account of it.

## What was done

`check-unit.mjs --pr <target>` (runbook Appendix A) now measures the pull request from
the merge base of the target and `HEAD`. It first refuses a target name that is not a
commit in the checkout, then skips a target that has no `check-unit.mjs`, then refuses
when there is no merge base. The usage text and the header comment say `<target>`, not
`<base>`.

Section 4.7 no longer tells the merging tool to compute the merge base; it says to pass
the target, that the checkout needs the history back to the fork point, and that an
unknown target is an error. The Azure DevOps example in Appendix I keeps `--pr HEAD^1` on
the merge commit, where the merge base is the target itself; its note for rebase or
squash builds now says to pass the target branch with `fetchDepth: 0`.

Appendix J has three new tests: the target moved on after the fork (the reported case,
with the fork point passed by hand giving the same answer, and the branch's own edit to
the compiled record still refused); a branch with no history in common with its target;
a target name git does not know. The first two fail against the 0.5.2 script and the
third against the script without the unknown-target check. All 41 tests pass. They were
run by extracting Appendices A, F, J and K from the runbook into a throwaway directory,
because the scripts exist only as listings in the runbook.

The runbook's first line is dated 2026-11-19 and versioned 0.5.3, and the plugin version
is 0.5.3.

Not done: the reporting repository's own copy of the script carries a local fix
("sections are new by heading line number") that is not in this master. It has to come
in as its own task, or each re-run there has to keep it by hand.

Reviewed by: a read-only subagent that had not seen the work (first reading; its findings are the review below)

## Review · 2026-11-19

Written from the reader's report on the staged diff.

### Old `--pr <base>` wording left in two places

**Found** — `docs/the-unities.md`, the mode table, and `UNITIES.md` Phase 6 step 7 still
said `--pr <base>`; the record said only that the usage text and header comment changed.

**Done when**

- [x] `UNITIES.md` Phase 6 step 7 → reads `--pr <target>`
- [x] `docs/the-unities.md` mode table → unchanged, and a decision in this file says why

**Not asked** — Any other rewording of `docs/the-unities.md` or Phase 6.

### Decision 2 misstated what changes for a caller of the old 4.7

**Found** — "Adoption is judged on the target's tip" said a branch cut before adoption
"is now checked" for a caller that followed the old 4.7. The script judges adoption on
the name it is handed, so a caller still passing the fork point is still judged there.

**Done when**

- [x] Decision 2's **Why** → says adoption is judged on the tip only when the caller passes the target
- [x] Decisions 1 and 2 read together → agree about a caller that passes the fork point

**Not asked** — A change to the script's behaviour; a new test for adoption timing.

### `^{commit}` in a shell-run git command

**Found** — `UNITIES.md` Appendix A verified the target with
`rev-parse -q --verify ${target}^{commit}`. The command goes through the platform shell,
and under `cmd.exe` the caret is the escape character, so every target would have been
refused there. Reasoned from the code, not run on Windows.

**Done when**

- [x] the target check in Appendix A → contains no caret
- [x] `--pr` with a name git does not know → still exits 2 and names it (Appendix J)

**Not asked** — Rewriting the other `git(...)` calls; Windows support for the Appendix J
tests.

### Without `^{commit}`, a commit id the checkout lacks passed unchecked

**Found** — Second reading. `rev-parse -q --verify ${target}` accepts any full 40-hex id
without checking that the object exists, and accepts names of blobs and trees. Such a
target then failed the adoption check and was skipped with exit 0, the outcome the
decision "A target git does not know is an error" removes.

**Done when**

- [x] `--pr <full id of an object not in the checkout>` → exits 2 and names it
- [x] `--pr <name of a blob>` → exits 2
- [x] an Appendix J test covers both → it fails against the `rev-parse` form
- [x] the target check in Appendix A → still contains no caret

**Not asked** — Bringing `^{commit}` back; changing the `--branch` check, which uses the
`rev-parse` form and exits 0 by design; running under `cmd.exe`.

## What was done

Answering the review above. Phase 6 step 7 of the runbook says `--pr <target>`. The
target check in Appendix A is `git cat-file commit ${target}`: it has no caret, follows a
tag to its commit, and refuses a name that is not a commit or an id the checkout does
not have. The unknown-target test tries a mistyped branch, an unfetched commit id and a
blob's name. The test for a target that moved on now also asserts exit
status 1 when the branch's own edit to the compiled record is refused. Decision 2 was
reworded, and a decision was added that the essay keeps its October wording. All 41
tests pass.

The runbook and the plugin are now 0.5.4. The 0.5.3 described in the first section was
installed from a package before this review, so the review's changes could not go out
under the same number.

Not verified: the script has still not been run under `cmd.exe`.

Reviewed by: the same read-only subagent, second reading; the answer to its last finding was checked by the Appendix J tests, not read a third time
