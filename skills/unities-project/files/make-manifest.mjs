#!/usr/bin/env node
// Copyright (c) 2026 Erez Schatz, https://github.com/erezschatz/unities. SPDX-License-Identifier: MIT
// make-manifest: writes manifest.json beside this file, with the sha256 of each script the
// plugin ships, under the path it is planted at, and the plugin's version. Run it in the
// plugin after changing a script; the tests fail until it has been run. Not planted.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const PLANTED_AT = {
  "check-unit.mjs": ".claude/hooks/check-unit.mjs",
  "check-unit.test.mjs": ".claude/hooks/check-unit.test.mjs",
  "compile-changelog.mjs": "scripts/compile-changelog.mjs",
  "compile-record.mjs": "scripts/compile-record.mjs",
};
// Line endings are left out, as the gate leaves them out (check-unit.mjs, sha256).
const sha256 = text => createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex");
const { version } = JSON.parse(readFileSync(join(here, "../../../.claude-plugin/plugin.json"), "utf8"));
const files = {};
for (const [name, path] of Object.entries(PLANTED_AT)) files[path] = sha256(readFileSync(join(here, name), "utf8"));
writeFileSync(join(here, "manifest.json"), JSON.stringify({ version, files }, null, 2) + "\n");
console.log(`manifest.json: ${Object.keys(files).length} files, version ${version}`);
