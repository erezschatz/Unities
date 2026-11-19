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

- [ ] script: `claude plugin validate .` passes in this repository
- [ ] the assignee: on a machine without the plugin, the two commands install it and `/unities:unities-project` is listed
- [ ] the assignee: the README's "Using it" section gives the two commands
