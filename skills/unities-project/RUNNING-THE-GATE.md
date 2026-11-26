# Running the gate and the record compiler — on request

This file is not part of an adoption: the runbook names it (4.7, Appendix I) only for when
the person asks for something to run the gate or the record compiler. Read it then, when
the person asks for something to run the gate at a pull request, or the record
compiler after a merge: "set up an Azure pipeline for the gate", "make our merge bot run
the compile", a GitHub Actions or GitLab or AWS job. What those two must do is the
runbook's (`UNITIES.md`, 4.7 and 4.5); what runs them is the person's choice. Build what
they ask for, in their repository, from what is here, and nothing they did not ask for.

## What the two must do

The runbook says it: the gate in 4.7 (before a pull request merges into the branch in
`base`, `check-unit.mjs --pr <target>` in a checkout of the source tip reaching the fork
point, with the target's tags, the merge going ahead only on exit 0), the merge man in
4.5 (after each merge, `compile-record.mjs` on that branch, its output committed there
under an identity allowed to push to it). Anything built from this file meets those.

## Making the gate binding

Whatever runs the gate, the merge must wait on it: a required check or branch policy on
the gated branch, or the merging tool refusing to merge on a non-zero exit. That setting
lives outside the repository, so `git diff` cannot show it; it is the first thing to look
at when the gate seems to have stopped working.

If pull requests are merged by a tool through the hosting service's API rather than by
its merge button, run the check in that tool, before it merges, instead of as a CI job. A
required CI policy applies to the tool's API merges too, so the two gates would collide.

## The merge man, where a job does it

A job triggered by a push to the gated branch compiles the record and pushes the result,
under an identity allowed to push to that branch and nothing more. It must not trigger
itself again with its own push. Where the tool that merges runs the compiler itself as
its next step, no such job is needed. Two merges close together can make the second
push fail; the compiler is idempotent, so a later run picks both up. Until something
does this, the compiled files are compiled by a person, through a
pull request of only those files, which the gate passes only if they equal the
compiler's output.

## Azure DevOps

Azure Repos ignores `pr:` triggers in YAML. Register this pipeline as a Build Validation
policy on the gated branch (Project settings → Repositories → Policies → the branch),
required, so it runs on every pull request into it.

```yaml
trigger: none

pool:
  vmImage: ubuntu-latest

steps:
  # A PR build checks out the merge of the PR into its target: HEAD^1 is the target,
  # so HEAD^1..HEAD is exactly what the PR would change. Depth 2 reaches it.
  # This relies on the policy's default merge-commit checkout. If the policy is ever
  # switched to a rebase or squash build, HEAD^1 is no longer the target; pass the
  # target branch instead (`--pr origin/<target>`) with `fetchDepth: 0`, so the script
  # can find where the branch forked (4.7).
  - checkout: self
    fetchDepth: 2
    clean: true

  - task: UseNode@1
    inputs:
      version: 22.x

  - bash: |
      set -euo pipefail
      if [ "$BUILD_REASON" != "PullRequest" ]; then exit 0; fi
      # The release check needs the last tag reachable from the target.
      git fetch --quiet --tags --depth=1 origin || true
      node .claude/hooks/check-unit.mjs --pr HEAD^1
    displayName: Check the change carries its record
```

**The merge man.** A second pipeline, triggered by pushes to the gated branch, compiles
the record after each merge and pushes the result. Its build identity needs *Contribute*
and *Bypass policies when pushing* on that branch (Project settings → Repositories →
Security), and nothing else does. `[skip ci]` keeps its own push from triggering it
again. Leave this pipeline out where the tool that merges runs the compiler itself.

```yaml
trigger:
  branches:
    include: [main]

pool:
  vmImage: ubuntu-latest

steps:
  - checkout: self
    persistCredentials: true
    clean: true

  - task: UseNode@1
    inputs:
      version: 22.x

  - bash: |
      set -euo pipefail
      node scripts/compile-record.mjs
      # docs/PLAN.md is named only while it carries the compiler's marker. With
      # "plan": false (Appendix A) the compiler leaves it alone, or it is not there.
      compiled="docs/DECISIONS.md"
      if grep -q "Compiled from tasks/" docs/PLAN.md 2>/dev/null; then compiled="$compiled docs/PLAN.md"; fi
      if git diff --quiet -- $compiled; then exit 0; fi
      git config user.name "merge man"
      git config user.email "merge-man@localhost"
      git add $compiled
      git commit -m "Compile the record [skip ci]"
      git push origin HEAD:$(Build.SourceBranchName)
    displayName: Compile decisions and plan from the task files
```

Two merges close together make two runs; the second push can be rejected because the
first moved the branch. The compiler is idempotent, so the fix is to run the pipeline
again, or to let the next merge's run pick both up.

## Other services

Nothing else has been written or run yet. For another service, translate the two
contracts above: a check required on pull requests into the gated branch, run on a
checkout deep enough to reach the fork point, with tags fetched; and a job on pushes to
that branch that compiles, commits under a narrow identity, and does not trigger itself.
Say in the person's task file that it was written from the service's documentation and
not yet run, until it has been.
