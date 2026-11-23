# A broken configuration is refused, not crashed on

## Context

Found by a design reader in the multi-developer repository in the adapted staging, at its
upgrade to 0.6.8, and owed to the plugin (`tasks/convert-the-adopted-repositories.md`).
Brought in by Erez on 2026-11-23, in chat. That repository's own `unities.json` is valid,
so nothing fails there today.

Runbook 4.11 says a missing or broken configuration is not silent: the gate refuses a
commit and sends a turn back once, naming the file. `readConfig` in `check-unit.mjs`
checks that each key is present, that each rule is a string, that `scene` is `commit` or
`pr`, that `plan` is a boolean when given, and the shape of `required` and the roles it
names. A key that is present but `null` passes the presence check, and `releaseFiles` and
`base` are not checked further. Read against the master on 2026-11-23:

- a file holding `null`, or `"rules": null`, throws a `TypeError` inside `readConfig`;
- a rule that is a string but not a valid regular expression passes `readConfig` and
  throws where the rules are compiled;
- `"releaseFiles": null` passes, since only `undefined` is checked, and becomes the
  pattern `/null/`;
- `compile-changelog.mjs` checks that the file exists, but its parse is unguarded: a file
  that is not valid JSON, or holds `null`, throws.

A throw exits 1 with a stack trace. Claude Code takes exit 1 from a `PreToolUse` hook as a
non-blocking error, so a gate that crashes there may let the commit through, which is
the opposite of what 4.11 says. That is read from Claude Code's hook contract, not run.

This is a finding that would have the gate handle a case it does not handle, so it is
Erez's to admit (`CLAUDE.md`, *A check enters the gate because something happened*).
What Claude would rule: admit it, because 4.11 already says a broken configuration is
refused, and the gate crashing instead breaks what the runbook promises.

**Promise** — A broken configuration is named and refused, never a stack trace.

**Acceptance**

- [ ] the assignee: Erez's ruling on this finding is recorded here as a decision that supersedes the one below, or the one below stands
- [ ] script, once admitted: a file holding `null`, a `rules` that is not an object, a rule that is not a valid regular expression and a `releaseFiles` that is not a string are each refused with a message naming the file and the key, at a commit and at a `Stop`
- [ ] script, once admitted: `compile-changelog.mjs` given a broken file stops with a message naming it
- [ ] script: `node --test` at the root passes with the manifest at the new version

## Review · 2026-11-23

### A broken configuration crashes the gate

**Found** — `readConfig` checks presence and string type only; the cases listed in
*Context* throw instead of being refused.

**Done when**

- [x] a configuration with any of the cases in *Context* → the gate is unchanged

**Not asked** — validating keys the gate does not read; a schema file.

## Decisions

### 2026-11-23 · Not admitted: a broken configuration crashes the gate

**Decision** — Not built until Erez rules. The gate keeps its present checks of
`unities.json`.
**Rejected** — Building the refusals on the reader's word.
**Why** — No broken configuration has met the gate in a repository, and until Erez
admits a finding of this kind it is not admitted. The case for admitting it is in
*Context*.
