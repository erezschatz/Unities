# The changelog compiler reads a long history

## Context

Owed to the plugin by the multi-developer repository in the adapted staging, found under
0.6.5 and still there at 0.6.8 (`tasks/convert-the-adopted-repositories.md`). Brought in
by Erez on 2026-11-23, in chat.

`compile-changelog.mjs` runs `git log -p` over `tasks/` since the last release through
`execSync` with Node's default `maxBuffer`, 1 MiB. In that repository the output was
larger and the compiler stopped with `ENOBUFS`. The gate already passes a large
`maxBuffer` where it reads every task file at the base; the compiler does not.

`tasks/the-gate-runs-under-deno-without-a-shell.md` replaces the same call; whichever is
built first carries the buffer.

**Promise** — The changelog compiles however much has changed since the last release.

**Acceptance**

- [ ] script: a test compiles a changelog whose `git log -p` output is larger than 1 MiB, and the compiler writes it instead of stopping
- [ ] script: `node --test` at the root passes with the manifest at the new version
