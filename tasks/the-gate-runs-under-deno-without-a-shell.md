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

- [ ] script: no planted script starts a child through a shell; git and the runtime are spawned by name with an argument list
- [ ] script: a test runs the gate under Deno with Appendix H's permissions, on a complete scene and an incomplete one, and is skipped, saying so, where Deno is not installed
- [ ] the assignee: Appendix H gives the narrowest `--allow-run` and `--allow-env` the scripts need, and says why each is there
- [ ] script: `node --test` at the root passes with the manifest at the new version
