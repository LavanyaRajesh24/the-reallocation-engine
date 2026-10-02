// network-targets.test.mjs — offline test (node --test). No network calls.
// Runs the real prototype as a subprocess against fictional fixtures; the
// prototype in turn runs the real maintained scorer (scripts/score/role-scorer.mjs).
// Expected buckets follow from how each fictional company was built (see fixtures/),
// not from the real dataset.
//
//   node --test scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FX = path.join(HERE, 'fixtures');
const TOOL = path.join(HERE, 'network-targets.mjs');
const TODAY = '2026-10-02';

function setup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'network-targets-'));
  const boards = path.join(dir, 'boards');
  fs.cpSync(path.join(FX, 'boards'), boards, { recursive: true });
  // Corrupted snapshot is written here, not committed (it would fail repo conformance).
  fs.writeFileSync(path.join(boards, 'deltasystems.json'), '{ "company": "DELTA SYSTEMS INC", "status": "ok", "jobs": [ { "title": "Softw');
  return { dir, boards, out: path.join(dir, 'out') };
}

function run(t, persona = 'persona.fixture.json', extra = []) {
  return spawnSync(process.execPath, [TOOL,
    '--persona', path.join(FX, persona), '--csv', path.join(FX, 'targets.fixture.csv'),
    '--formd-dir', path.join(FX, 'formd'), '--boards', t.boards, '--out-dir', t.out, '--today', TODAY, ...extra], { encoding: 'utf8' });
}

const names = (bucket) => bucket.map((d) => d.ev ? d.ev.company.value : d.name.value).sort();

test('full fixture run routes every fictional company to the bucket it was built for', () => {
  const t = setup();
  const r = run(t);
  assert.equal(r.status, 0, r.stderr);
  const log = JSON.parse(fs.readFileSync(path.join(t.out, 'network-targets-log.json'), 'utf8'));
  const b = log.buckets;
  assert.equal(log.status, 'ok');
  assert.equal(log.counts.candidates, 6, 'GOLF (CA) and HOTEL (non-software titles) are filtered out');
  assert.deepEqual(names(b.apply), ['ALPHA BACKEND INC']);
  assert.deepEqual(names(b.network), ['BRAVO PLATFORM INC', 'CHARLIE DATA LLC']);
  assert.deepEqual(names(b['check-board']), ['DELTA SYSTEMS INC', 'ECHO CLOUD INC']);
  assert.deepEqual(names(b.skip), ['FOXTROT APPS INC']);
  assert.deepEqual(names(b['not-in-dataset']), ['ZULU NOT REAL INC']);
  // network priority: recent funding → A; missing funding date → B with recency "unknown", never "old"
  const bravo = b.network.find((d) => d.ev.company.value === 'BRAVO PLATFORM INC');
  const charlie = b.network.find((d) => d.ev.company.value === 'CHARLIE DATA LLC');
  assert.equal(bravo.route.priority, 'A');
  assert.equal(charlie.route.priority, 'B');
  assert.equal(charlie.ev.funding.recency.value, 'unknown');
  assert.equal(charlie.ev.funding.latest_date.value, null);
  // failure reasons are specific, and a failed board is not "zero jobs"
  const why = Object.fromEntries(b['check-board'].map((d) => [d.ev.company.value, d.live.reason]));
  assert.deepEqual(why, { 'DELTA SYSTEMS INC': 'snapshot-unparseable', 'ECHO CLOUD INC': 'board-error' });
  // whole-word location/title matching: Alpha's Senior role and its Manitoba role do not match
  const alpha = b.apply[0];
  assert.deepEqual(alpha.live.matching_postings.map((m) => [m.title.value, m.location.value]), [['Software Engineer, Backend', 'Boston, MA']]);
  // Form D join is exact-name-key and reports what it found
  assert.equal(log.formd.matched, 1);
  assert.equal(bravo.ev.funding.formd_sample_match.value.date_filed, '15-JAN-2025');
});

test('unchecked companies are never sent to the scorer, and the real scorer gated the no-posting ones', () => {
  const t = setup();
  assert.equal(run(t).status, 0);
  const roles = JSON.parse(fs.readFileSync(path.join(t.out, 'roles.json'), 'utf8'));
  const sent = new Set(roles.map((r) => r.company));
  assert.ok(!sent.has('DELTA SYSTEMS INC') && !sent.has('ECHO CLOUD INC'));
  for (const r of roles) assert.ok(r.liveness && typeof r.liveness.factor === 'number', 'every role sent carries an explicit liveness factor');
  const scores = JSON.parse(fs.readFileSync(path.join(t.out, 'role-scores.json'), 'utf8'));
  assert.equal(scores._scorer, 'bayesian-role-scorer', 'output came from the maintained scorer');
  const bravo = scores.roles.find((s) => s.company === 'BRAVO PLATFORM INC');
  assert.equal(bravo.recommendation, 'Skip');
  assert.match(bravo.reason, /^gated: liveness/);
  assert.equal(bravo.composite, 0);
});

test('every emitted value carries one of the three source labels', () => {
  const t = setup();
  assert.equal(run(t).status, 0);
  const log = JSON.parse(fs.readFileSync(path.join(t.out, 'network-targets-log.json'), 'utf8'));
  const allowed = new Set(['record', 'model-judgment', 'your-input']);
  let n = 0;
  (function walk(x) {
    if (Array.isArray(x)) return x.forEach(walk);
    if (x && typeof x === 'object') {
      if ('value' in x && 'source' in x) { assert.ok(allowed.has(x.source), `bad label ${x.source}`); assert.ok(x.from, 'label has a from'); n++; }
      Object.values(x).forEach(walk);
    }
  })(log);
  assert.ok(n > 50, `expected many labeled values, saw ${n}`);
  assert.doesNotMatch(JSON.stringify(log), /executive_officers|board_directors|"phone"/, 'personal-contact columns are never emitted');
});

test('break attempt: an OPT window that already ended halts the run with no decisions', () => {
  const t = setup();
  const r = run(t, 'persona.past-opt.fixture.json');
  assert.equal(r.status, 3);
  assert.match(r.stderr, /G2 work-window-ended/);
  const log = JSON.parse(fs.readFileSync(path.join(t.out, 'network-targets-log.json'), 'utf8'));
  assert.equal(log.status, 'halted');
  assert.equal(log.buckets, null);
  assert.ok(!fs.existsSync(path.join(t.out, 'roles.json')), 'nothing was sent to the scorer');
  assert.match(fs.readFileSync(path.join(t.out, 'network-targets-report.md'), 'utf8'), /stopped before deciding anything/);
});

test('break attempt: a CSV missing a required column fails clearly instead of guessing', () => {
  const t = setup();
  const bad = path.join(t.dir, 'bad.csv');
  const [h, ...rest] = fs.readFileSync(path.join(FX, 'targets.fixture.csv'), 'utf8').split('\n');
  fs.writeFileSync(bad, [h.replace('Total Approvals', 'Approvals'), ...rest].join('\n'));
  const r = spawnSync(process.execPath, [TOOL, '--persona', path.join(FX, 'persona.fixture.json'), '--csv', bad,
    '--boards', t.boards, '--out-dir', t.out, '--today', TODAY], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /G1 csv-columns-missing.*Total Approvals/);
});

test('single-file snapshot bundle gives the same routing; a corrupted bundle leaves everyone unchecked', () => {
  const t = setup();
  const boards = {};
  for (const f of fs.readdirSync(path.join(FX, 'boards'))) boards[f.replace(/\.json$/, '')] = JSON.parse(fs.readFileSync(path.join(FX, 'boards', f), 'utf8'));
  const bundle = path.join(t.dir, 'bundle.json');
  fs.writeFileSync(bundle, JSON.stringify({ captured_at: '2026-10-01T12:00:00.000Z', provider: 'greenhouse', boards }));
  t.boards = bundle;
  assert.equal(run(t).status, 0);
  let b = JSON.parse(fs.readFileSync(path.join(t.out, 'network-targets-log.json'), 'utf8')).buckets;
  assert.deepEqual(names(b.apply), ['ALPHA BACKEND INC']);
  assert.deepEqual(names(b.network), ['BRAVO PLATFORM INC', 'CHARLIE DATA LLC']);
  assert.deepEqual(names(b['check-board']), ['DELTA SYSTEMS INC', 'ECHO CLOUD INC'], 'Delta has no entry in the bundle; Echo is a saved 404');

  fs.writeFileSync(bundle, '{ "boards": { "alphabackend": ');
  assert.equal(run(t).status, 0);
  b = JSON.parse(fs.readFileSync(path.join(t.out, 'network-targets-log.json'), 'utf8')).buckets;
  assert.equal(b.apply.length + b.network.length + b.skip.length, 0, 'an unreadable bundle decides nothing');
  assert.equal(b['check-board'].length, 6);
  assert.ok(b['check-board'].every((d) => d.live.reason === 'snapshot-unparseable'));
  assert.ok(!fs.existsSync(path.join(t.out, 'role-scores.json')), 'stale scorer output from the previous run is removed');
});

test('refuses to write outside its own namespace inside the repo', () => {
  const t = setup();
  const r = run(t, 'persona.fixture.json', ['--out-dir', path.join(HERE, '../../../../data/examples')]);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /unsafe-out-dir/);
});
