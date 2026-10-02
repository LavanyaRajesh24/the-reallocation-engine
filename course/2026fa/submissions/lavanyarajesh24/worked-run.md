# Worked run — network-targets-swe, 2026-10-02

## Executive summary

This is one real run of my network-targets prototype, for a fictional student in my own
situation: an MS software-engineering student in Boston, graduating December 2026, OPT
from 15 January 2027, who needs H-1B sponsorship.

It used the repository's sponsorship data plus one job-board snapshot taken the same day.

**Result:**
- 133 Massachusetts / New York employers with H-1B approvals for software titles;
- **8** with a suitable entry-level posting (apply);
- **5** strong sponsors with nothing suitable open (network first);
- **120** I could not check (no board) — the tool decided nothing about them.

Below are the exact commands and output, a line-by-line split of what is a record versus
my own input, how I checked the output against the raw data, and what went wrong.

## Inputs

| Input | Path | Label |
|---|---|---|
| Persona (fictional "Meera Iyer") | `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/persona.json` | your-input |
| Sponsorship + funding | `data/80-days-to-stay/80-days-csv/mapped_student_employment_targets_v3.csv` (30,369 rows) | record |
| Form D | `data/sec/form-d/processed/sample/*.sample.json` (4 files, 200 filings; **samples only**) | record |
| BLS | `data/bls/compact/soc_occupation_compact.csv`, row 15-1252 | record |
| Board slugs | `.../inputs/boards.json` (20 hand-entered Greenhouse slugs) | your-input |
| Board snapshot | `.../inputs/boards-snapshot.json`, captured 2026-10-02 ≈ 18:19 UTC | record |
| Date | `--today 2026-10-02` | your-input |

Persona values that drive the run (all your-input):

| Value | Setting |
|---|---|
| Target states | MA, NY |
| Sponsored-title pattern | `software` |
| OPT | 2027-01-15 → 2028-01-14 |
| Unemployment days | 90, none used |
| Hiring lag | 60 days |
| "Recent" funding | ≤ 36 months |
| Tier thresholds | Proven ≥10 approvals and ≥90 %; Likely ≥3; Possible ≥1 |
| Title include | software engineer, backend, platform engineer, software developer |
| Title exclude | senior, sr, lead, staff, principal, manager, intern, embedded, android, ios, mobile, frontend, … |
| Locations | whole-word MA / NY / Boston / Cambridge / Somerville / New York / United States / USA / US |

## Commands and real output

Board capture, the only network step. This was run once at about 18:19 UTC; the output
below is copied from my terminal. It was the first capture, which wrote one file per
company; the output was later merged into `boards-snapshot.json` without re-fetching.

```
$ node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/capture-boards.mjs
✓ MONGODB INC                               393 jobs  (mongodb)
✓ DATADOG INC                               443 jobs  (datadog)
✗ ETSY INC                                 error: HTTP 404: {"status":404,"error":"Job not found"}  (etsy)
✓ KLAVIYO INC                               134 jobs  (klaviyo)
✓ TOAST INC                                 329 jobs  (toast)
✓ COHERE HEALTH INC                          76 jobs  (coherehealth)
✓ FLATIRON HEALTH INC                        29 jobs  (flatironhealth)
✓ ATTENTIVE MOBILE INC                       31 jobs  (attentive)
✓ SQUARESPACE INC                            33 jobs  (squarespace)
✗ SOCURE INC                               error: HTTP 404: {"status":404,"error":"Job not found"}  (socure)
✓ JUSTWORKS INC                              95 jobs  (justworks)
✓ PATHAI INC                                 17 jobs  (pathai)
✓ CAMBRIDGE MOBILE TELEMATICS INC             1 jobs  (cmt)
✓ FORMLABS INC                              229 jobs  (formlabs)
✗ CHAINALYSIS INC                          error: HTTP 404: {"status":404,"error":"Job not found"}  (chainalysis)
✗ DATAMINR INC                             error: HTTP 404: {"status":404,"error":"Job not found"}  (dataminr)
✓ YEXT INC                                   22 jobs  (yext)
✗ LENDBUZZ INC                             error: HTTP 404: {"status":404,"error":"Job not found"}  (lendbuzz)
✗ OVERJET INC                              error: HTTP 404: {"status":404,"error":"Job not found"}  (overjet)
✗ BLUECORE INC                             error: HTTP 404: {"status":404,"error":"Job not found"}  (bluecore)

13 board(s) saved, 7 error(s) saved as status:"error" → scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/boards
```

The recipe run (offline):

```
$ node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --today 2026-10-02
✓ network-targets 2026-10-02: 133 candidates from 30369 CSV rows
  apply 8 · network 5 · check-board 120 · skip 0 · not-in-dataset 0
  scorer: scored 22 roles → Apply 15 · Consider 2 · Skip 5 (skip 23%)
  Form D sample match: 0/133 (200 sample filings)
  course/2026fa/submissions/lavanyarajesh24/runs/network-targets-log.json  +  course/2026fa/submissions/lavanyarajesh24/runs/network-targets-report.md
exit=0
```

The "network first" section of the generated report (`runs/network-targets-report.md`),
pasted:

```
| Priority | Company | Location | Sponsorship | Latest funding [record] | Board checked [record] |
|---|---|---|---|---|---|
| B | TOAST INC | BOSTON, MA | 150 approved / 4 denied → **Proven** | Series B 2015-12-23 (old) | 329 jobs, 0 matching, 2026-10-02T18:19:20.278Z |
| B | ATTENTIVE MOBILE INC | NEW YORK, NY | 96 approved / 0 denied → **Proven** | Series D+ 2020-09-09 (old) | 31 jobs, 0 matching, 2026-10-02T18:19:20.456Z |
| B | SQUARESPACE INC | New York, NY | 94 approved / 2 denied → **Proven** | Series D+ 2021-03-31 (old) | 33 jobs, 0 matching, 2026-10-02T18:19:20.516Z |
| B | CAMBRIDGE MOBILE TELEMATICS INC | CAMBRIDGE, MA | 72 approved / 0 denied → **Proven** | Seed 2014-08-11 (old) | 1 jobs, 0 matching, 2026-10-02T18:19:21.024Z |
| B | YEXT INC | NEW YORK, NY | 68 approved / 0 denied → **Proven** | Series C 2014-05-28 (old) | 22 jobs, 0 matching, 2026-10-02T18:19:21.208Z |
```

The scorer's own trace for one apply role and one network role, from
`runs/role-scores.json` (written by `scripts/score/role-scorer.mjs`, not by my code):

```
KLAVIYO INC  Software Engineer II - Recommendations  Apply  (0.9·0.35) × 1 × 1 = 0.315
TOAST INC    (no matching posting on board)          Skip   (0.9·0.35) × 0 × 1 = 0.000   reason: gated: liveness ≈ 0.000
```

## Verified vs. inferred — line by line (Klaviyo, an "apply" row, and Toast, a "network" row)

| Value | Label | Where it came from |
|---|---|---|
| KLAVIYO INC, BOSTON, MA | **record** | CSV line 14495 |
| 154 approvals, 4 denials, 97.47 % approval rate | **record** | CSV `Total Approvals`, `Total Denials`, `Approval_Rate` |
| Sponsored titles include "Software" | **record** (the match is your-input) | CSV `top_job_titles_sponsored`, pattern `software` |
| Tier "Proven" | **your-input** | my rule (≥10 approvals, ≥90 %) applied to the records above |
| Sponsorship p = 0.9 | **your-input** | my tier→p mapping, copied from the scorer's Ch.11 example. ⚠ The scorer prints this term as `[record]` — see Reflection. |
| Latest funding Series C, 2022-07-26 → "old" | record → **your-input** | CSV `latest_funding_*`; "old" = more than 36 months, my threshold |
| Form D sample match: none | **record** | exact name-key join; 0 of 133 candidates matched any of the 200 sample filings |
| 134 jobs on board; "Software Engineer II - Recommendations, Boston, MA" listed | **record** | Greenhouse board API, fetched 2026-10-02T18:19:20Z |
| That posting counts as a match | **your-input** | my title/location filters |
| Liveness factor 1.0 | **record** | listed at fetch time. It does **not** mean "actively hiring". |
| Timeline factor 1.0 | **your-input** | window ends 2027-04-15; earliest start 2027-01-15; slack 90 days ÷ 60-day lag, capped at 1 |
| Fit | — | not rated; no fit term was sent |
| Composite 0.315 → Apply | **scorer output** | (0.9 × 0.35) × 1 × 1. With no fit rating, "Apply" means "Proven sponsor + one matching posting". |
| Toast: 329 jobs on board, 0 matching | **record** + **your-input** filter | Every software title on Toast's board was Senior, Principal, Manager or Android |
| Toast → "network first", priority B | **your-input** routing | scorer Skip with a closed liveness gate, plus tier Proven; funding 2015 → B |
| BLS median $133,080 (15-1252, OEWS 2024) | **record** | context only; role quality has weight 0 in the scorer |
| model-judgment | — | **none in this run**. No language model produced any value. |

## Verification — how I know the output is real

1. **Hand cross-check against the source CSV.** I read Klaviyo's row directly with
   Python's `csv` module, independently of the prototype:

   | Field | Raw CSV | Output |
   |---|---|---|
   | Total Approvals | 154.0 | 154 |
   | Total Denials | 4.0 | 4 |
   | Approval_Rate | 97.468… | 97.468… |
   | median_salary_offered | 126000.0 | 126000 |
   | Funding | Series C 2022-07-26 | Series C 2022-07-26 |
   | BLS 15-1252 median | 133080.0 | $133,080 |

   All match.
2. **The test suite** (offline, fictional fixtures, real scorer): `# pass 7`, `# fail 0`.
   Full output is in `TEST-REPORT.md`.
3. **Deliberate break attempts** (see the Attestation):
   - re-introducing the substring bug makes test 1 fail on "Manitoba, Canada";
   - a past OPT window halts with exit 3;
   - writing into `data/examples` is refused;
   - a corrupted snapshot leaves everyone unchecked.
4. **Toast spot-check.** I listed every title on Toast's saved board containing "oftware".
   All were Android, Manager, Principal or Senior roles, so "0 matching" is correct for an
   entry-level persona.

## Reflection

**What worked**
- Keeping the network call in a separate script meant the decision code could be tested
  offline and re-run identically.
- Routing unchecked companies away from the scorer prevented the scorer's
  missing-liveness default (×1) from turning "we didn't look" into "it's live".

**What the prototype got wrong or missed**
- **Location and seniority filtering (fixed).** The first run, kept in `runs/first-pass/`,
  matched "MA" inside "Manitoba"/"Madrid" and let senior roles through. The scorer's skip
  rate was 3 %, and the apply list held French, Canadian and senior roles. I would not
  have caught this without reading the locations row by row.
- **A mislabeled term (not fixed).** The scorer accepts one source label per term, so the
  sponsorship term shows `[record]` even though its value, 0.9, comes from my
  tier-to-probability rule. The record is the approval count. A reader of
  `role-scores.md` would think 0.9 is data.
- **The funding signal did no work.** None of the 13 checked companies had funding within
  36 months, so every network target is priority B. The funding column also has visible
  errors: a large professional-services firm shows a 2024 "Seed" round, and Peloton
  appears twice.
- **Coverage is thin.** 120 of 133 candidates are unchecked, and 7 of my 20 slug guesses
  were wrong. This is what I predicted in the CHANGE-BRIEF.
- **One network target may be false.** Cambridge Mobile Telematics' Greenhouse board
  lists only an internships page, so "no openings" may just mean "a different board".
- **The skip rate is still 23 %,** below the ~50 % a healthy run skips. That is partly
  because only strong sponsors were sent, and partly because without a fit rating every
  Proven sponsor with one matching posting clears 0.3 by 0.015.

**Next concrete improvement**
- Send the sponsorship term to the scorer labeled `your-input`, carrying the approval
  count as a separate `record` field. Or propose a two-label term to the maintainers.
- After that: replace hand-entered slugs with `scripts/ats/detect-ats.py` (the recipe's
  `[TODO: DEV]`), which would shrink the unchecked bucket.

## Attestation

> ⚠ **For Lavanya to complete:** run each command in the table yourself from a clean
> checkout (see TEST-REPORT §5) before signing. Change any row that doesn't match what you
> saw.

- Recipe: network-targets-swe v0.1.0
- By: Lavanya Rajesh · 2026-10-__

### Tested

| Ran | Saw | Expected |
|---|---|---|
| `node .../network-targets.mjs --today 2026-10-02` | exit 0; 133 candidates → apply 8 · network 5 · check-board 120; Form D 0/133 | both outputs written; every company in exactly one bucket |
| `node --test .../network-targets.test.mjs` | `# pass 7`, `# fail 0` | all pass, no network |
| Klaviyo's raw CSV row read independently | 154 / 4 / 97.47 % / $126,000 / Series C 2022-07-26 — identical to the log | identical |
| **Break:** re-introduced substring location matching | test 1 failed on `'Manitoba, Canada'`; restored → 7/7 | the test catches the first-pass bug |
| **Break:** `--persona fixtures/persona.past-opt.fixture.json` | `✗ G2 work-window-ended …`, exit 3, `status: "halted"`, no `roles.json` | halt with no decisions |
| **Break:** `--out-dir data/examples` | `✗ G0 unsafe-out-dir`, exit 2 | refuse to overwrite a tracked repo file |
| **Break:** corrupted snapshot bundle (in test 6) | all 6 fixture companies → check-board, `snapshot-unparseable`; no scorer output | nothing decided; never "no jobs" |
| 7 wrong slugs in the real capture | saved as `status: "error"` → check-board (`board-error`) | unchecked, not "no openings" |

### Did not test

- `npm run ats:liveness` on any posting URL. Playwright's Chromium was not installed, and
  I chose not to download it. Liveness here means "listed on the board API", not
  "the posting page renders an apply button".
- Whether any listed posting is a ghost, or accepts a January 2027 start.
- Lever, Ashby or Workday boards — Greenhouse only.
- The full Form D quarters (gitignored); samples only.
- `fit_ratings`: no role was fit-rated, so the scorer's fit term never ran in the real run.
- Any persona other than Meera's (e.g. a STEM-OPT persona).
- The scorer's `--profile` path; it is deliberately not used. Its "authorized" regex bug
  was observed by running the scorer directly, not through my prototype.

### Broke during testing, fixed

- **Substring location matching** ("MA" ⊂ "Manitoba") → whole-word regex in `liveness()`
  in `network-targets.mjs`. The persona's excludes gained senior / sr / lead / embedded /
  android / ios / mobile / frontend.
- **A deliberately invalid fixture JSON would have failed repo conformance** → the test now
  generates it in a temp dir at runtime.
- **`node --test <dir>` does not work on Node 22** → the README uses the test file path.
- **Persona dates assumed a May 2027 graduation** → corrected to December 2026 (OPT
  2027-01-15). Logged as a CHANGE-BRIEF revision.
