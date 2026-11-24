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

- [x] script: a test compiles a changelog whose `git log -p` output is larger than 1 MiB, and the compiler writes it instead of stopping
- [x] script: `node --test` at the root passes with the manifest at the new version

## What was done

The fix came first, in 0.6.12 (`tasks/the-gate-runs-under-deno-without-a-shell.md`):
`compile-changelog.mjs` starts git through `spawnSync` with a `maxBuffer` of 1 GiB. This
scene adds its test, "the compiler writes a changelog whose history since the release is
longer than 1 MiB": a record of 40,000 lines, about 1.06 MiB, whose `git log -p` is about
1.1 MiB (1,149,095 bytes, measured by the cold reader), committed since the tag, and
the compiler run for 1.0.0, which exits 0 and writes the changelog with the version
heading and the record's last line. Run against the compiler of `3314651`, from before
0.6.12, the same test fails with `spawnSync /bin/sh ENOBUFS`, the error the
multi-developer repository met.

Because a shipped file changed, the plugin is 0.6.14: the runbook's first line,
`.claude-plugin/plugin.json`, the manifest (both copies) and SPEC's "as of 0.6.14". No
script's behaviour changed, and the form is unchanged at 1.0. The planted copies here
equal the masters. `node --test` at the root, on Node 26.13.1 with Deno 2.9.8: 103 tests, 103
pass, none skipped.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. In a throwaway clone it ran the suite, ran the test against the
compiler of `3314651` (it fails with ENOBUFS) and measured the fixture; its finding is the
review below, answered before commit.

## Review · 2026-11-24

### The record and the test give the wrong size for the long record

**Found** — The record and the test comment said "about 1.4 MiB"; the record is 1,108,889
bytes, about 1.06 MiB, and the `git log -p` the compiler reads is 1,149,095 bytes, about
1.1 MiB.

**Done when**

- [x] The record → gives the size as about 1.1 MiB of `git log -p` (about 1.06 MiB of record)
- [x] The test comment, in the master and the planted copy → says the same, and the two copies stay equal and match the manifest
- [x] The test's 40,000 lines → unchanged, and the `git log -p` output stays over 1 MiB

**Not asked** — no change to the compiler, and no bigger fixture.
