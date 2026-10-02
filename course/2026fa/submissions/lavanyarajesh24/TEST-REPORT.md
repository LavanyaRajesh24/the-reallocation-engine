# TEST-REPORT — network-targets-swe

## Executive summary

This report records how the network-targets prototype was tested.

- **Repo checks:** the repository's own checks pass before and after my changes, with
  identical results.
- **Tests:** the prototype's seven offline tests pass.
- **Failure cases:** each one I named fails clearly without inventing a value.
- **Scope:** my branch adds files only inside my own namespaces.

What still needs a human: reading the generated report before acting on it (gate H1), and
section 5 below, the clean-checkout re-run, which I do myself before submitting.

## 1. Toolchain baseline — before and after

**Before** = `main` at `015843d`, checked out in a separate temporary worktree.
**After** = my branch at `b8ebccb`. Node v22.11.0, Python 3.11.5.

```
== BEFORE (main @ 015843d)
PRIVACY (no personal data committed)
  ✓ no private/PII paths are tracked

RECIPES (33)
  with lifecycle frontmatter: 33   missing: 0
  by status: DRAFT 28 · RUNNABLE-SAMPLE 4 · RUNNABLE-LIVE  # DRAFT | SPECIFIED | RUNNABLE-SAMPLE | RUNNABLE-LIVE | VERIFIED 1
  open TODOs: 318 declared (in frontmatter) · 318 [TODO markers in bodies

SUMMARY
  environment: ✓ runnable
  recipes: 33/33 carry lifecycle frontmatter — all tracked
  next: continue
doctor exit=0

✓ manifest check passed (3 warnings)
== AFTER (branch @ b8ebccb)
PRIVACY (no personal data committed)
  ✓ no private/PII paths are tracked

RECIPES (33)
  with lifecycle frontmatter: 33   missing: 0
  by status: DRAFT 28 · RUNNABLE-SAMPLE 4 · RUNNABLE-LIVE  # DRAFT | SPECIFIED | RUNNABLE-SAMPLE | RUNNABLE-LIVE | VERIFIED 1
  open TODOs: 318 declared (in frontmatter) · 318 [TODO markers in bodies

SUMMARY
  environment: ✓ runnable
  recipes: 33/33 carry lifecycle frontmatter — all tracked
  next: continue

✓ manifest check passed (3 warnings)
```

Notes:
- **Doctor doesn't see my recipe.** Doctor's recipe dashboard counts only top-level
  `recipes/*.md`, so my recipe in `recipes/cases/2026fa/` (DRAFT, 3 TODOs) doesn't change
  its numbers.
- **Manifest warnings are pre-existing, and W2 is a false positive.** The three warnings
  appear on `main` too.
  - W2 says `private/` and `data/ats/` are not gitignored.
  - `git check-ignore -v private/x.md data/ats/pipeline.md` shows both are ignored via
    `/private/*` and `/data/ats/*` (`.gitignore` lines 37 and 40).

`npm run verify` on the branch:

```
$ npm run verify
MANIFEST CHECK — The Reallocation Engine
==========================================

WARN (3):
  W1 ignore path not in .gitignore: archive/
  W2 private path not gitignored (PII/secret risk): private/
  W2 private path not gitignored (PII/secret risk): data/ats/

✓ manifest check passed (3 warnings)
```

Conformance on my paths:

```
$ node scripts/conformance.mjs scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/ recipes/cases/2026fa/ course/2026fa/submissions/lavanyarajesh24/
conformance: 26 files (7 md · 4 js · 15 json)
✓ all conform (machine half of P4). Adequacy is still the human gate.
```

## 2. The sample run

```
$ node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --today 2026-10-02
✓ network-targets 2026-10-02: 133 candidates from 30369 CSV rows
  apply 8 · network 5 · check-board 120 · skip 0 · not-in-dataset 0
  scorer: scored 22 roles → Apply 15 · Consider 2 · Skip 5 (skip 23%)
  Form D sample match: 0/133 (200 sample filings)
  course/2026fa/submissions/lavanyarajesh24/runs/network-targets-log.json  +  course/2026fa/submissions/lavanyarajesh24/runs/network-targets-report.md
exit=0
```

Full outputs are in `runs/`. The first run, before the location/seniority fix, is kept in
`runs/first-pass/`.

## 3. Offline test suite

```
$ node --test scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.test.mjs
ok 1 - full fixture run routes every fictional company to the bucket it was built for
ok 2 - unchecked companies are never sent to the scorer, and the real scorer gated the no-posting ones
ok 3 - every emitted value carries one of the three source labels
ok 4 - break attempt: an OPT window that already ended halts the run with no decisions
ok 5 - break attempt: a CSV missing a required column fails clearly instead of guessing
ok 6 - single-file snapshot bundle gives the same routing; a corrupted bundle leaves everyone unchecked
ok 7 - refuses to write outside its own namespace inside the repo
# tests 7
# pass 7
# fail 0
```

How the tests stay honest:
- The fixtures are nine fictional companies, each built for one case.
- The tests run the real prototype as a subprocess, which runs the real
  `scripts/score/role-scorer.mjs`. Test 2 asserts the score file's `_scorer` field is
  the maintained scorer's.
- No network: board snapshots are files, and the corrupted one is generated at runtime.
- **Mutation check.** I temporarily reverted the location match to substring matching:

  ```
  not ok 1 - full fixture run routes every fictional company to the bucket it was built for
      +     'Manitoba, Canada'
  # pass 5
  # fail 1
  ```

  Restoring the fix → `# pass 7`, `# fail 0`.

## 4. Each named failure case, exercised

| CHANGE-BRIEF case | How exercised | Observed |
|---|---|---|
| 1. Company missing from the CSV | fixture persona names `ZULU NOT REAL INC` | bucket `not-in-dataset`; no approval count is shown for it (test 1) |
| 2. OPT window already past | real CLI with `fixtures/persona.past-opt.fixture.json` | output below; also test 4 |
| 3. Board missing / 404 / bad JSON | fixtures: Echo (saved 404), Delta (corrupted file), corrupted bundle; **and real**: 7 slugs returned 404 | all → `check-board` with reason `board-error` / `snapshot-unparseable` / `no-snapshot`; none sent to the scorer (tests 1, 2, 6; real run) |
| 4. Missing funding date | fixture Charlie has an empty `latest_funding_date` | recency `unknown`, network priority B, `latest_date: null` (test 1) |
| 5. Form D join finds nothing | real run | `Form D sample match: 0/133 (200 sample filings)`; the fixture proves the join works when a match exists (1/6, test 1) |
| (extra) CSV missing a column | test 5 renames `Total Approvals` | exit 2, `G1 csv-columns-missing … Total Approvals` |
| (extra) Overwriting a tracked repo file | real CLI | output below; also test 7 |

```
$ node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --persona scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/fixtures/persona.past-opt.fixture.json --out-dir /tmp/nt-break --today 2026-10-02
✗ G2 work-window-ended: work window ended 2025-06-14 (today 2026-10-02); nothing to decide
  halted — no decisions written. ../../../../tmp/nt-break/network-targets-log.json + ../../../../tmp/nt-break/network-targets-report.md
exit=3

$ node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --out-dir data/examples
✗ G0 unsafe-out-dir: --out-dir data/examples is inside the repo but outside this student's namespace; refusing to write
  nothing decided.
exit=2
```

## 5. Clean-checkout run (I run this myself before submitting)

> ⚠ **For Lavanya:** run these in a new terminal and paste the real output below,
> replacing this note.

```bash
cd ~/INFO7375 && rm -rf clean-check && git clone -b contrib/2026fa-lavanyarajesh24-network-targets-swe https://github.com/LavanyaRajesh24/the-reallocation-engine.git clean-check
```

```bash
cd ~/INFO7375/clean-check && node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --today 2026-10-02 && node --test scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.test.mjs
```

```
(paste output here)
```

## 6. Privacy scan

```
$ node scripts/pii-scan.mjs --diff main
pii-scan: clean ✓

$ node scripts/pii-scan.mjs
pii-scan: 1 finding(s) — see DATA_CONTRACT.md §Zero-Conditions

  [email] package-lock.json — <an npm package author's address; redacted here so this report does not repeat it>
```

- The branch-history scan, which is what CI runs on a PR, is clean.
- The one working-tree finding is **pre-existing on `main`**. `package-lock.json` is
  unchanged by my branch (`git diff --quiet main -- package-lock.json` succeeds) and was
  last touched in upstream commit `d08afdd`.
- `npm install` modifies `package-lock.json` locally. I reverted it before committing.

## 7. Scope — `git diff --stat main...HEAD`

```
 .../submissions/lavanyarajesh24/CHANGE-BRIEF.md    |   148 +
 .../runs/first-pass/network-targets-log.json       | 14429 +++++++++++++++++++
 .../runs/first-pass/network-targets-report.md      |   217 +
 .../lavanyarajesh24/runs/network-targets-log.json  | 13646 ++++++++++++++++++
 .../lavanyarajesh24/runs/network-targets-report.md |   217 +
 .../lavanyarajesh24/runs/role-scores.json          |   815 ++
 .../lavanyarajesh24/runs/role-scores.md            |    32 +
 .../submissions/lavanyarajesh24/runs/roles.json    |   442 +
 .../lavanyarajesh24-network-targets-swe.card.md    |   112 +
 .../2026fa/lavanyarajesh24-network-targets-swe.md  |   280 +
 .../lavanyarajesh24-network-targets-swe/README.md  |    89 +
 .../capture-boards.mjs                             |    53 +
 .../fixtures/boards/alphabackend.json              |     6 +
 .../fixtures/boards/bravoplatform.json             |     2 +
 .../fixtures/boards/charliedata.json               |     1 +
 .../fixtures/boards/echocloud.json                 |     1 +
 .../fixtures/boards/foxtrotapps.json               |     1 +
 .../fixtures/formd/fixture-2026q1-d.sample.json    |     3 +
 .../fixtures/persona.fixture.json                  |    82 +
 .../fixtures/persona.past-opt.fixture.json         |    82 +
 .../fixtures/targets.fixture.csv                   |     9 +
 .../inputs/boards-snapshot.json                    | 11227 +++++++++++++++
 .../inputs/boards.json                             |    22 +
 .../inputs/persona.json                            |    79 +
 .../lavanyarajesh24-network-targets-swe/lib.mjs    |    68 +
 .../network-targets.mjs                            |   453 +
 .../network-targets.test.mjs                       |   152 +
 27 files changed, 42668 insertions(+)
```

- **Only my namespaces:**
  - `course/2026fa/submissions/lavanyarajesh24/`
  - `recipes/cases/2026fa/lavanyarajesh24-*`
  - `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/`
  - `logs/runs/` — added after this stat
- **Untouched:** `logs/RUN_LOG.md`, `package.json`, `package-lock.json`, and every
  maintained file.
- **Large line counts are data, not code.** The two run logs and the board snapshot
  account for most of the 42,668 lines.

## 8. What the gate requires a human to judge (H1)

The prototype stops at a report. Before acting on any row, a person must:

- **Apply now:** open each listed posting and confirm it is still open and can start on or
  after 2027-01-15. Then rate fit, which the tool does not do.
- **Network first:**
  - check the company's own careers page, since a second board may exist (e.g. Cambridge
    Mobile Telematics' Greenhouse board lists only internships);
  - decide whom to contact;
  - remember that "Proven" counts have no dates.
- **Check the board first:** find the real board or ATS before concluding anything.
