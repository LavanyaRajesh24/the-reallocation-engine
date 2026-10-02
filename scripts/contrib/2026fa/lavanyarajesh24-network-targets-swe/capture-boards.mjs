#!/usr/bin/env node
// capture-boards.mjs — the ONLY network step of the network-targets recipe.
// Reads a hand-entered company → Greenhouse board slug list (your-input) and saves
// one timestamped snapshot per company, bundled in a single file, for
// network-targets.mjs to read offline.
//
// Network host contacted: boards-api.greenhouse.io only, via the maintained
// provider scripts/ats/providers/greenhouse.mjs (its hostname allowlist and
// redirect:'error' apply). Nothing else is fetched.
//
//   node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/capture-boards.mjs
//        [--slugs inputs/boards.json] [--out inputs/boards-snapshot.json]
//
// A failed fetch is saved as status:"error" — network-targets.mjs then reports the
// company as UNCHECKED. A failure is never written as "zero jobs".

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import greenhouse from '../../../ats/providers/greenhouse.mjs';
import { makeHttpCtx } from '../../../ats/providers/_http.mjs';
import { nameKey } from './lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? path.resolve(argv[i + 1]) : d; };
const slugsFile = opt('--slugs', path.join(HERE, 'inputs/boards.json'));
const outFile = opt('--out', path.join(HERE, 'inputs/boards-snapshot.json'));

const entries = JSON.parse(fs.readFileSync(slugsFile, 'utf8'));
const bundle = { captured_at: new Date().toISOString(), provider: 'greenhouse', slugs_from: path.basename(slugsFile), boards: {} };
const ctx = makeHttpCtx();
let ok = 0, err = 0;

for (const e of entries) {
  const key = nameKey(e.company);
  const snap = { company: e.company, provider: 'greenhouse', slug: e.greenhouse_slug, slug_source: 'your-input (hand-entered in boards.json)',
    api: `https://boards-api.greenhouse.io/v1/boards/${e.greenhouse_slug}/jobs`, fetched_at: new Date().toISOString() };
  try {
    const jobs = await greenhouse.fetch({ name: e.company, api: snap.api }, ctx); // sequential on purpose: polite to the API
    Object.assign(snap, { status: 'ok', jobs });
    ok++;
    console.log(`✓ ${e.company.padEnd(40)} ${String(jobs.length).padStart(4)} jobs  (${e.greenhouse_slug})`);
  } catch (x) {
    Object.assign(snap, { status: 'error', http_status: x.status ?? null, error: String(x.message).slice(0, 200), jobs: null });
    err++;
    console.log(`✗ ${e.company.padEnd(40)} error: ${snap.error.slice(0, 60)}  (${e.greenhouse_slug})`);
  }
  bundle.boards[key] = snap;
}
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(bundle, null, 2));
console.log(`\n${ok} board(s) saved, ${err} error(s) saved as status:"error" → ${path.relative(process.cwd(), outFile)}`);
