# The gate does not wait on an open stdin

## Context

Owed to the plugin by the multi-developer repository in the adapted staging, from its
conversion and its upgrade to 0.6.8 (`tasks/convert-the-adopted-repositories.md`). Brought
in by Erez on 2026-11-23, in chat.

Two things, both about stdin. The master gate skips reading stdin for `--pr` and for a
TTY (`check-unit.mjs`, where `input` is read), and nothing tests that: the test that did
was that repository's own, dropped at its conversion because the manifest refuses tests
beside the plugin's. And `--branch`, run by hand with stdin an open pipe (a script, an
agent's shell), waits forever, under 0.6.5 and 0.6.8, as measured there; `--staged`
reads stdin the same way, which is read from the code, not run. The hooks are not
affected: Claude Code and Codex write their JSON and close stdin.

**Promise** — Running the gate by hand never hangs it, whatever the caller does with stdin.

**Acceptance**

- [x] script: a test runs `--pr` with stdin an open pipe that is never written to, and the gate finishes with its answer
- [x] script: `--branch` and `--staged`, run with stdin an open pipe and nothing written, finish with their answer instead of waiting
- [x] script: the hook tests, which hand the gate its JSON on stdin, pass unchanged
- [x] script: `node --test` at the root passes with the manifest at the new version

## Decisions

### 2026-11-23 · The gate waits a second for a hook's JSON, then answers as a run by hand

**Decision** — In the hook modes, `--branch` and `--staged`, the gate reads stdin until
it closes, as before, but once stdin has been silent for a second, before the first byte
or between two, it stops reading and closes stdin. What it read is used if it is whole
JSON; otherwise it is dropped, the gate says so on stderr, and goes on with no hook
input, as a run by hand does. `--pr` and a TTY still
skip stdin.
**Rejected** — A `--hook` flag in the wiring (Appendix B, the Codex hooks), with stdin
read only under it: every adopted repository's `settings.json` would have to change with
the scripts, and a wiring left without the flag would lose `stop_hook_active`, so a
strict `Stop` would send every turn back without end. Telling a hook's pipe from an
agent's shell by `fstat`: both are pipes.
**Why** — A hook writes its JSON as it starts the gate, so a second of silence is far
more than a hook needs, and a run by hand pays at most that second. A hook so slow that
its input comes later loses it, and with it `stop_hook_active`. The stderr line says so
to whoever reads stderr: a terminal, and the agent when the gate then refuses with exit 2,
since Claude Code hands the agent a refusing hook's stderr. When the gate then exits 0,
Claude Code may show that line only in verbose mode or the transcript; that is not
verified here.

## What was done

The master gate (`skills/unities-project/files/check-unit.mjs`) reads stdin through
`readStdin`, which now gives up once stdin has been silent for a second, before the first
byte or between two. It then uses what it read if that is whole JSON, and otherwise
writes `check-unit: stdin stayed open with no (or an unfinished)
hook input for a second; going on as a run by hand.` to stderr, and destroys stdin, so an
open pipe does not keep the process alive after the answer. The wait is a constant
inside the function: the gate calls `readStdin` from the top of the file, before a
module-level `const` further down is initialised, and the first version, which had one,
crashed every hook-mode run with a TDZ error; the full suite caught it.

Before the fix, measured in WSL: with stdin held open by `{ sleep 15; } |`, `--branch`
was killed by `timeout 5` (exit 124); with `/dev/null` it answered. Git does not cause
this: a `pre-commit` hook gets `/dev/null` as stdin from git 2.56.1 even when git's
caller holds stdin open. So the hang comes from a hand run of the gate, an agent's
included. With the first version of the fix (the second-long wait before the first byte only), on
this repository with an incomplete tree: closed empty stdin 177 ms, `/dev/null` 143 ms,
a hook's JSON 145 ms, stdin held open 1136 ms with exit 2. Closed stdin and a hook's JSON
take the same path in the second version; the timings were not repeated.

The test file gains "with stdin held open and never written, every mode answers instead
of waiting": `--branch` and `--staged` in strict, `--branch main` and `--pr main` in
adapted, each with a pipe that is never written to or closed, killed after ten seconds;
each finishes with exit 0 on a clean tree, the hook modes saying on stderr that they went
on without hook input and `--pr` saying nothing; part of a JSON object written and then
held open finishes too, saying the input was unfinished; a whole `Stop` input with
`stop_hook_active` and stdin left open is read, so the second pass lets go; and `--staged`
on an incomplete tree is still refused. Runbook Appendix B says, after the hooks, that a hand run waits at
most a second of silence and says so, and that `--pr` reads no stdin. Under Deno and Bun the `destroy` call is not run here;
neither is installed.

Because a script changed, the plugin is 0.6.9: the runbook's first line,
`.claude-plugin/plugin.json`, the manifest (`make-manifest.mjs`, both copies) and
SPEC's "as of 0.6.9". The form is unchanged at 1.0. The planted copies here are the
masters. `node --test` at the root, on Node 26.13.1: 92 tests, 92 pass.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. It ran the suite in a throwaway clone (92 of 92), confirmed the new
test fails on the old gate, and probed the new one by hand; its two findings are the
review below, both answered before commit. It read the answer a second time, probed every
ticked line against the running gate, found they hold, and raised the third item, answered
in the decision's wording. It also noted that `s += d` joins chunks as
strings, so a multibyte character split across two chunks is corrupted; that was so
before this change and is left as it is.

## Review · 2026-11-23

### A hook's JSON that arrives after a second is silently dropped

**Found** — `readStdin` gave up after a second with nothing read and ran on `{}`; JSON
written after 1.5 s was ignored with exit 0 and no word, losing `stop_hook_active`.

**Done when**

- [x] hook JSON written after the wait → the gate either reads it, or says on stderr that it ran without hook input
- [x] hook JSON written within the wait, whole or in pieces → read whole, as now
- [x] stdin closed empty, `/dev/null`, or a TTY → answers at once, as now
- [x] `--pr` → stdin not read, as now

**Not asked** — a `--hook` flag, or any change to the wiring.

### A caller that writes part of the JSON and holds stdin open still hangs the gate

**Found** — The timer was cleared on the first byte, so `printf '{"cwd":'; sleep 8`
piped in was killed by `timeout 4`.

**Done when**

- [x] partial input, then stdin held open → the gate answers, or the Promise and D70 are narrowed to "stdin never written to"
- [x] full JSON with stdin held open afterwards → behaviour stated in a test or a decision

**Not asked** — new parsing of partial JSON.

### The late-input warning may not reach the person in the case it exists for

**Found** — Second reading. `giveUp` writes the warning to stderr and the gate may go on
to exit 0; Claude Code may not show a passing hook's stderr outside verbose mode, so the
decision's "seen rather than silent" may overclaim. The reader marked it low confidence.

**Done when**

- [x] hook input lost under a `Stop` hook → the person sees the warning in the session, or D70 says it is visible only in verbose mode
- [x] run by hand → the warning on stderr, as now

**Not asked** — a change to the wiring.
