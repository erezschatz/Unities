# Let the plugin be installed from this repository by name

## Context

Raised on 2026-11-19; deferred by Erez until after the adoption.

The plugin is installed today by uploading a package. Claude Code installs by name from a
marketplace: a file `.claude-plugin/marketplace.json` that lists plugins and where to
fetch each. It can sit beside `plugin.json` in this repository, with one entry whose
`source` is `"./"` and whose `name` equals the plugin's. People then run
`claude plugin marketplace add erezschatz/unities` and
`claude plugin install unities@<marketplace name>`, and `claude plugin update` fetches a
new version when the `version` in `plugin.json` has changed. Auto-update is off by
default. Source: https://code.claude.com/docs/en/plugins/publish, read on 2026-11-19.

Open: the marketplace's name, which Erez chooses.

**Promise** — Anyone can install the Unities with two commands, and gets a new version
by asking for it.

**Acceptance**

- [x] script: `claude plugin validate .` passes in this repository
- [ ] the assignee: on a machine without the plugin, the two commands install it and `/unities:unities-project` is listed
- [x] the assignee: the README's "Using it" section gives the two commands

## Decisions

### 2026-11-20 · The marketplace is named erezschatz

**Decision** — The marketplace's `name` is `erezschatz`, so the plugin is installed as
`unities@erezschatz`. Erez chose it.
**Rejected** — `unities`, which gives `unities@unities` and says nothing;
`unities-plugins`, which promises a collection where there is one plugin.
**Why** — The name is what is typed after the `@`. A user holds one marketplace per
name, and the owner's handle is the one least likely to meet another. A second plugin
of his can be listed under it without a rename, which would cost everyone a reinstall.

### 2026-11-20 · The plugin stays at the repository's root, and the entry says only where

**Decision** — The marketplace file sits beside `plugin.json`, with one entry, `unities`,
whose `source` is `"./"`. The entry has no `version` and no `description`. The file's
own `description` is "Plugins by Erez Schatz." and its `owner` is his name and GitHub
address.
**Rejected** — Moving the plugin into a subdirectory, as the documentation's examples
do; a description or version on the entry, a second place for what `plugin.json` says;
a marketplace description that describes the plugin, the same second place; no
marketplace description, which `claude plugin validate` warns about.
**Why** — For a relative-path entry Claude Code reads `plugin.json` before the install,
so the entry needs nothing more. The repository is the plugin; a subdirectory would move
every path the runbook, the configuration and the decisions name.

### 2026-11-20 · No new version

**Decision** — The plugin stays 0.6.4.
**Rejected** — 0.6.5.
**Why** — A version is a change to the procedure (D9). Nothing an adoption runs
changed; how the plugin is fetched did.

## What was done

`.claude-plugin/marketplace.json` names the marketplace `erezschatz` and lists one
plugin, `unities`, at the repository's root. The README's *Using it* gives the two
commands that install it and the two that fetch a new version. `docs/SPEC.md` describes
the file under Scope and no longer lists "not installable by name" among what the
plugin does not do.

Checked with Claude Code 2.1.329, on a copy of the plugin's files (`.claude-plugin/`,
`skills/`, `LICENSE`, `README.md`) in another machine's `/tmp`, not on this checkout:
`claude plugin validate` on the directory and on the marketplace file each end
"Validation passed"; `claude plugin marketplace add <that directory>` and
`claude plugin install unities@erezschatz` succeeded, and `claude plugin details unities`
showed version 0.6.4 with one skill, `unities-project`. The marketplace was then removed
there.

The first two acceptance boxes are open. `claude plugin validate .` has not been run at
the root of this repository, only on that copy. The install was from a directory, on a
machine that already had the plugin synced from claude.ai, and not from GitHub: the
README's commands, the two that update included, have not been run against
`erezschatz/Unities`.

Reviewed by: a read-only subagent that had not seen the work (its findings are the review below)

## Review · 2026-11-20

The reader's two findings, condensed by the agent that did the work. In that agent's
judgement neither would grow the gate.

### The first acceptance box was ticked for a run that did not happen here

**Found** — Box 1 read `[x] … passes in this repository`, and the record said the
validation ran on a copy of some of the files on another machine.

**Done when**

- [x] box 1 and the record read together → both say `claude plugin validate .` has not been run in this repository
- [x] box 2 → open, as the record says
- [x] box 3 → ticked; the README gives the two commands

**Not asked** — a new acceptance box, a test, or a script that runs `claude plugin validate`.

### The marketplace file described the plugin, and the record left out its description and owner

**Found** — The file's top-level `description` described the Unities in words
`plugin.json` does not use, while SPEC said the file carries no description of the
plugin and the second decision rejected a second place for what `plugin.json` says. The
record named neither the description nor the owner.

**Done when**

- [x] SPEC's sentence about what the marketplace file carries → true of the whole file
- [x] the file's `description` and `owner` → named in the second decision, and the description says nothing about the plugin
- [x] the entry (`name: unities`, `source: "./"`, no `version`, no `description`) → unchanged
- [x] the marketplace's name and the README's four commands → unchanged

**Not asked** — a version on the entry; a move of the plugin; a new plugin version.

## What was done

Answering the reading. The first acceptance box is open again and the record above says
why. The marketplace file's `description` is now "Plugins by Erez Schatz." and no longer
describes the plugin; the second decision names it and the owner and rejects the
alternatives, and SPEC says what the whole file carries. The marketplace file with this
description was not validated again.

Reviewed by: the same reader, which read these corrections against the working tree

## What was done

Nothing in the repository changed but this file. After the push, Erez ran both open
checks on his own machine and reported them on 2026-11-22.

`claude plugin validate .` at the root of his clone ended "Validation passed with
warnings". The two warnings: `CLAUDE.md` at the plugin root is not loaded as project
context, and the plugin has no icon (a plugin-directory check, which the output says
does not change the result). Neither is acted on. `CLAUDE.md` here is how to
work in this repository and is not meant to reach a repository that installs the plugin;
the warning appears because the repository and the plugin are one folder (the second
decision above). On the writer's reading of the output, the icon is asked for by the
catalog plugins are submitted to, and this plugin is not submitted there.

The two install commands of the README, against `erezschatz/Unities`: Erez reported that
they "worked without a hitch". He did not say whether that machine already held the copy
synced from claude.ai, nor whether `/unities:unities-project` was listed afterwards, and
the two update commands have still not been run.

The first box is ticked on his report. The second stays open: it asks for a machine
without the plugin and for the skill to be listed, and neither was reported. The reader
found it ticked in the first draft of this record.

Reviewed by: a read-only subagent that had not seen the work; it found the second box ticked for more than was reported and two statements about the icon that went past the output, both corrected above before the commit

## What was done

Nothing in the repository changed but this file. Asked on 2026-11-22, in chat, whether
the machine he installed on was without the plugin beforehand and whether
`/unities:unities-project` was listed afterwards, Erez answered: "it was my work
machine, so I guess no, but it did install correctly and shown as such."

So the install from GitHub succeeded on a machine that, by his own guess, already had
the plugin. The second box stays open: it asks for a machine without the plugin, which
is what shows that someone who has never had it can install it. It closes the first time
the two commands are run on such a machine and the skill is seen listed.

Reviewed by: a read-only subagent that had not seen this record; no findings
