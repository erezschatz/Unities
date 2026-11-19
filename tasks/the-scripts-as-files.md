# Ship the scripts as files, not as listings

## Context

Proposed on 2026-11-19 and agreed in principle by Erez; when it is done is a kickoff
question for this repository's adoption.

The gate, its tests and the two compilers exist only as code blocks inside
`skills/unities-project/UNITIES.md`. An agent copies each into a repository and edits the
per-repo block by hand. Copies have drifted that way more than once, one repository
carries a fix this master lacks, and the tests here can only be run by cutting the
listings out of the runbook into a throwaway directory.

The shape proposed: each script is a file in this repository, identical in every
repository it is planted in, and reads a small per-repo configuration file for what is
now the per-repo block. An upgrade is then a copy, and a planted script that differs
from the master is a mismatch the gate can refuse. Each shipped file keeps its licence
line.

**Promise** — The gate in any repository is the gate in this one, and anyone can run its
tests here with one command.

**Acceptance**

- [ ] script: `node --test` in this repository runs the gate's tests from files, with nothing extracted from the runbook
- [ ] script: the per-repo values are read from one configuration file, and a script planted in a throwaway repository is byte-identical to the master's
- [ ] script: a planted script that was edited is refused by the gate, with a message naming the file
- [ ] the assignee: one existing repository is re-run from the files, and its gate's results before and after are compared and written into this file
