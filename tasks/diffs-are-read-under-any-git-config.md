# The release check and the changelog compiler read diffs under any git configuration

## Context

Found on 2026-11-19 by the cold reader of `tasks/new-records-are-found-by-heading-text.md`,
outside that scene's diff; the same on 0.6.1.

The gate's release check (`git diff <base> HEAD -- CHANGELOG.md`) and
`compile-changelog.mjs` (`git log -p`, looking for `+++ b/`) read git's output as git
prints it by default. Run with `GIT_CONFIG_GLOBAL` pointing at each of these, tests fail:

- `color.ui=always`: "a release pull request whose changelog equals the compiler's output
  passes" and "the compiler leaves the Reviewed by line out of the changelog";
- `diff.noprefix=true`: the same two;
- `diff.external`: the release test, and "a pull request editing the compiled changelog by
  hand is refused" (found on 2026-11-19 in the same scene, the same on 0.6.1);
- `core.autocrlf=true`: "the compile after a merge…".

Both also drop every `+++` line, including a changelog or record line that begins with
`++`.

**Promise** — A developer's own git configuration never changes what the gate or the
compiler decides.

**Acceptance**

- [ ] script: the release-PR test and the compiler tests pass under `color.ui=always`, `diff.noprefix`, `diff.mnemonicPrefix` and `diff.external`
- [ ] script: a changelog entry with a line beginning `++` is compared and compiled, not dropped
- [ ] script: "the compile after a merge…" passes under `core.autocrlf=true`
- [ ] script: the same suites with no special configuration pass unchanged

## Decisions

### 2026-11-20 · Not admitted: the release check and the compiler under unusual git configuration

**Decision** — Not built. The gate and `compile-changelog.mjs` keep reading git's output
as git prints it by default. Erez ruled: it is handled when it comes to be an issue.
This task stays open and is not worked until then.
**Rejected** — Building it now, on the reader's constructed configurations.
**Why** — None of the four configurations has met the gate in a repository (D41). The
one to watch is `core.autocrlf=true`, the default of Git for Windows, wherever the gate
runs outside WSL.
