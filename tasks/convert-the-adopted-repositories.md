# Convert the repositories adopted before 0.6.0

## Context

Asked by Erez on 2026-11-19, in chat, after reading what 0.6.0 did.

Since 0.6.0 the scripts are files, the same in every repository, checked against a
manifest (`tasks/the-scripts-as-files.md`). The conversion of a repository adopted
earlier is runbook 5.5. It has been carried out once, on this repository, which was
adopted the same day and carried no local change. Every other repository under the
Unities still holds copies cut from the old listings, and one team repository carries a
local fix (`tasks/new-records-are-found-by-heading-text.md`). The manifest check fires
only when a scene touches a planted file (D23), so a repository that was never converted
says nothing.

Erez runs the conversion in the repositories; that is where the plugin runs and is
verified. This file is where the results come back to.

**Promise** — Every repository under the Unities runs the same gate as this one.

**Acceptance**

- Withdrawn (tasks/a-box-never-waits-on-another-project.md): the assignee: the repositories adopted before 0.6.0 are listed in this file, without the names of those that are not public
- Withdrawn (tasks/a-box-never-waits-on-another-project.md): the assignee: runbook 5.5 is carried out in each, and for each the version it was on, its local changes and what was decided for each change are written into this file
- Withdrawn (tasks/a-box-never-waits-on-another-project.md): the assignee: in each, the planted copies are compared with this repository's `manifest.json` and the result is written into this file
- Withdrawn (tasks/a-box-never-waits-on-another-project.md): the assignee: every local change that is brought to the plugin is a task file here before this task closes

## Decisions

### 2026-11-19 · The conversion is worked first

**Decision** — This task is worked ahead of the open tasks ordered by D7 and D35.
**Rejected** — Taking it after them.
**Why** — Erez runs it next, from Sunday 2026-11-22, when the team repository is at hand. Until the repositories are converted, each fix
to the gate reaches them by retyping, which is what 0.6.0 was made to end, and the only
proof that the conversion works is the plugin's own repository.

## What was done

The team repository, a multi-developer repository in the adapted staging, is converted.
Erez said so in chat on 2026-11-23; what follows is read from its adoption task and its
checkout that day. No repository is named here (Erez, 2026-11-23).

It was on deployment 0.5.2, with scripts cut from the listings. Runbook 5.5 was carried
out at 0.6.5 and the same pull request then took it to 0.6.8, on one branch, after its
target was merged in. That branch had not reached the target in the checkout's refs on
2026-11-23; whether the pull request has merged since is Erez's to say.

Its local changes against the 0.5.2 listings, and what was decided for each there:

- CRLF and byte-order-mark reading, and new records found by heading text (here,
  `tasks/new-records-are-found-by-heading-text.md`): both already in 0.6.5, so dropped.
- The changelog compiler reading a file instead of checking that it exists: dropped by
  Erez, as a fix for a race nobody has met.
- Its own tests: dropped, since a manifest refuses tests beside the plugin's. Three of
  them guarded values that are now settings in `unities.json`, which the plugin's tests
  cover in general form. The fourth, `--pr` with stdin
  left open, guards a fix the master gate carries without a test; that test is owed to the
  plugin (`tasks/the-gate-does-not-wait-on-an-open-stdin.md`).

The planted copies against this repository's 0.6.8 `manifest.json`, measured with
`sha256sum` on its checkout at `8042bb7d0`: `check-unit.mjs`, `check-unit.test.mjs`,
`compile-record.mjs` and `compile-changelog.mjs` each equal the manifest's hash, and its
`unities.manifest.json` is byte for byte this repository's `manifest.json`. Its gate,
`--branch HEAD`, printed nothing and exited 0.

Its upgrade record also lists what it found and left to the plugin. Each is a task file
here: `tasks/the-gate-does-not-wait-on-an-open-stdin.md`,
`tasks/a-broken-configuration-is-refused-not-crashed.md`,
`tasks/the-changelog-compiler-reads-a-long-history.md`, and
`tasks/an-edited-merged-record-passes.md`. The last two are findings that would change
what the gate handles, so each carries a `Not admitted:` decision (D68, D69) until Erez
rules on it.

The single-developer repository in the strict staging also runs 0.6.8 as the plugin's
files, by its own account; its conversion is not recorded here yet, and the list of
repositories adopted before 0.6.0 is still owed. No box is ticked: each covers every
repository.

Reviewed by: a read-only Claude Code subagent (Explore) that had not seen the work, given
`docs/reviewer.md`. It checked the hashes and the other repository's record against this
section and the four task files' claims against the scripts; its three findings are the
review below, all answered before commit.

## Review · 2026-11-23

### readConfig's checks are understated

**Found** — `tasks/a-broken-configuration-is-refused-not-crashed.md` said `readConfig`
checks presence and string rules "and nothing more"; it also checks `scene`, `plan` and
`required`.

**Done when**

- [x] *Context*'s description of `readConfig` → names every check it makes, and says that `null` is not rejected for `releaseFiles` or `base`
- [x] the four listed cases → unchanged

**Not asked** — any change to the code.

### The changelog compiler's guard is overstated

**Found** — The same file said `compile-changelog.mjs` parses the configuration "with no
guard at all"; it checks that the file exists.

**Done when**

- [x] the sentence → says the parse is unguarded, not that the file is unchecked

**Not asked** — any change to the code.

### The record has a fragment and an omission

**Found** — The *Its own tests* bullet above had a sentence with no verb, and the record
did not say that two of the new task files are not admitted.

**Done when**

- [x] the bullet → a full sentence saying the three tests guarded values that are now settings, which the plugin's tests cover in general form
- [x] the paragraph listing the task files → says two are not admitted (D68, D69) and are waiting on Erez's ruling

**Not asked** — ticking any acceptance box above.
