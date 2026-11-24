# The gate runs under Deno without a shell

## Context

Raised 2026-11-23 from a single-developer repository in the strict staging, while it
was being upgraded to 0.6.8, in a task file of its own (the third of three asks). Erez,
the same day, in chat: "3 is a bug, it should be fixed."

Measured there under Deno 2.9.8 with Appendix H's invocation: with
`--allow-env=TF_BUILD,UNITIES_SCENE` every `execSync` throws
`NotCapable: Requires env access`, because Deno's `child_process` copies the whole
environment into the child. With full `--allow-env` it then throws
`Command failed: git …` and hides the reason, because `execSync` runs through `/bin/sh`,
which `--allow-run=git,deno` does not cover. That repository now runs the gate with
`--allow-run=git,deno,/bin/sh --allow-env`, and granting `/bin/sh` amounts to granting
any command. The tests here run under Node and cannot see it. Under `onFailure: "block"`
a gate that crashes refuses every commit; a `Stop` gate that crashes fails silently.

The scripts run git through a shell in more than one place (`execSync`, and
`spawnSync(..., { shell: true })` for the record compiler in `check-unit.mjs`).

**Promise** — The gate runs under Deno with the permissions Appendix H gives it, and a
repository does not have to grant a shell to run it.

**Acceptance**

- [x] script: no planted script starts a child through a shell; git and the runtime are spawned by name with an argument list
- [x] script: a test runs the gate under Deno with Appendix H's permissions, on a complete scene and an incomplete one, and is skipped, saying so, where Deno is not installed
- [x] the assignee: Appendix H gives the narrowest `--allow-run` and `--allow-env` the scripts need, and says why each is there
- [x] script: `node --test` at the root passes with the manifest at the new version

## Decisions

### 2026-11-24 · Programs by name, the environment whole

**Decision** — The gate and the changelog compiler start git, and the runtime named in
`run`, with `spawnSync` and a list of arguments, never a shell; `run` is split on spaces.
Under Deno, `--allow-run` names `git` (and `deno` for the gate); `--allow-env` is given
whole, to the gate and to the changelog compiler.
**Rejected** — Keeping `--allow-env=TF_BUILD,UNITIES_SCENE`, or adding `PATH` and `HOME`
to it: measured under Deno 2.9.8, spawning git without a shell still throws `NotCapable`
with either, because Deno gives a child the whole environment and asks leave to read all
of it. Handing each child a chosen environment instead: git needs what its caller set,
such as `GIT_INDEX_FILE` from a hook, and a chosen list would drop what nobody listed.
Allowing `/bin/sh`, which allows any program.
**Why** — Which programs the scripts may start is what a Deno permission protects;
reading the environment the scripts already run in gives nothing a shell would.

### 2026-11-24 · Not admitted: a release pull request with no tag at its base is refused

**Decision** — Not built. In the gate's release check, `git describe` throws where the
base has no tag, so the fallback to the root commit is never reached and a release pull
request is refused with "(compiler failed)". The old shell call did the same; this
scene's conversion kept it.
**Rejected** — Catching the throw so the fallback runs, as `compile-changelog.mjs` now
does, which the cold reader of this scene found and nobody admitted.
**Why** — It has not happened in a repository: every adopted one releases from a tag.
What Claude would rule: admit it, since the code's own fallback says what was meant.

## What was done

`skills/unities-project/files/check-unit.mjs` starts every program through `program`, a
`spawnSync` with a list of arguments and a large `maxBuffer` that throws on an error or a
non-zero exit as `execSync` did; `git` and `gitOk` take an array, and every call site
passes one, so a file name with a space in it is one argument. `run` is split on spaces
into the record compiler's and the changelog compiler's command. The batch read of every
task file at the base gives git its input as a Buffer, since the encoding option would
otherwise be applied to the input as well. `compile-changelog.mjs` has a `git` of the same
kind; the `2>/dev/null || true` around `git describe` became a `try`, and its `git log`
now has the large buffer that `tasks/the-changelog-compiler-reads-a-long-history.md`
asks for. That task's test is not written here, so it stays open. `compile-record.mjs`
starts no program and is unchanged.

Measured under Deno 2.9.8 in WSL, before writing Appendix H: the new gate with
`--allow-env` refuses an incomplete scene with exit 2; with
`--allow-env=TF_BUILD,UNITIES_SCENE`, or with `PATH,HOME` added, it throws `NotCapable:
Requires env access`. The changelog compiler with Appendix H's old line throws the same,
and with `--allow-env` added compiles. The record compiler's `--check` needs no
`--allow-env`.

Tests: "no planted script starts a program through a shell" reads the three scripts for
`execSync`, child_process's `exec` and a shell option. "under Deno, with Appendix H's
permissions, the gate refuses an incomplete scene and passes a complete one" runs the
gate with Appendix H's Deno line and `run` set to Deno, and also has it refuse a decision
not yet compiled, which shows the record compiler ran under Deno; it is skipped, saying
so, where `deno` cannot be started. On the previous commit's gate it fails. Appendix H
says how `run` is read and why each permission is there, and its Deno lines, the Codex
table's Deno line among them, carry the measured permissions.

Because a script changed, the plugin is 0.6.12: the runbook's first line,
`.claude-plugin/plugin.json`, the manifest (both copies) and SPEC's "as of 0.6.12". The
form is unchanged at 1.0. The planted copies here are the masters. `node --test` at the
root, on Node 26.13.1 with Deno 2.9.8 on the path: 100 tests, 100 pass, none skipped.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. It ran the suite and Appendix H's Deno lines, gate in every mode, the
Codex line, both compilers, in a throwaway clone, and confirmed the Deno test fails on the
previous gate. Its three findings are the review below: two are gate cases left as they
were, under D72 and the decision above, and the third, the wording of Appendix H's
`--allow-env` reason, is answered.

## Review · 2026-11-24

### A compiler that cannot be started passes the record check

**Found** — Under Deno with `run` unset, the gate starts the record compiler with `node`,
which `--allow-run` does not name; the status is `null`, neither 1 nor 3, so an
uncompiled decision passes. The old shell call let 127 through the same way.

**Done when**

- [x] `run` names a runtime that cannot be started (not installed, or not allowed by `--allow-run`) → the gate is unchanged, under D72, "Not admitted: a record compiler that cannot be run passes"
- [x] `run` starts and exits 0, 1 or 3 → unchanged

**Not asked** — changing the release-PR path, which already refuses with "(compiler failed)".

### The gate's git describe fallback never runs

**Found** — In a repository with no tag, a release pull request is refused with
"(compiler failed)": `git describe` throws before the fallback to the root commit.

**Done when**

- [x] release PR, no tag at base → the gate is unchanged, under "Not admitted: a release pull request with no tag at its base is refused"
- [x] release PR, tagged base → unchanged

**Not asked** — anything else in the release check.

### Appendix H's reason for --allow-env mixes two causes

**Found** — The paragraph gave git's needs as why a list of names fails; Deno's
whole-environment check is the cause, and git's needs are why the environment is not
chosen.

**Done when**

- [x] the paragraph → gives Deno's whole-environment check as the cause of `NotCapable`, and git's needs as the reason the environment is passed whole

**Not asked** — no change to the permissions.
