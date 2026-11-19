# Run the gate where the shell is `cmd.exe`

## Context

Left open on 2026-11-19 by `tasks/pr-measures-from-the-fork-point.md`.

The script runs git through the platform shell. A caret in one command would have broken
`--pr` under `cmd.exe`; it was removed by reasoning from the code, and neither the old
form nor the new one was run on Windows outside WSL. The Appendix J tests use `cat` and
do not run there either.

**Promise** — A developer on Windows without WSL is refused and passed by the gate for
the same reasons as everyone else.

**Acceptance**

- [ ] the assignee: on Windows outside WSL, `--pr`, `--staged` and `--branch` are each run on a complete scene and on an incomplete one, and the six results are written into this file
- [ ] the assignee: Appendix H says what was verified there and what was not
