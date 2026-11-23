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

- [ ] script: a test runs `--pr` with stdin an open pipe that is never written to, and the gate finishes with its answer
- [ ] script: `--branch` and `--staged`, run with stdin an open pipe and nothing written, finish with their answer instead of waiting
- [ ] script: the hook tests, which hand the gate its JSON on stdin, pass unchanged
- [ ] script: `node --test` at the root passes with the manifest at the new version
