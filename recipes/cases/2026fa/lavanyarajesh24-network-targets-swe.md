---
status: DRAFT
todos_open: 3
last_gate: null
attestation: null
recipe_version: 0.1.0
---

# network-targets-swe — sponsor-history employers to apply to, or to network into first

## Executive summary

This recipe is for an international master's student in software engineering who is still
in school. They will need H-1B sponsorship and cannot legally start work for several
months.

It starts from employers in the student's target states that have had H-1B approvals for
software job titles. It checks each employer's public job board once and sorts them into:
- **apply now** — a suitable opening is listed and the engine's scorer agrees;
- **network first** — a strong sponsorship record, but no suitable opening right now;
- **check the job board first** — the board could not be read, so nothing is decided;
- **skip**.

The "network first" list is the point. These are companies the engine would normally just
skip, and for a student months away from a start date they are the best people to meet
now.

The recipe stops before any outreach or application. A person reads the report and
decides.

**Status.** A full sample run has completed on repository data plus one dated job-board
snapshot; its outputs and test results are in the submission folder. The recipe stays
**DRAFT** because three proposed additions remain open typed TODOs, and the constitution
does not allow SPECIFIED or later while any TODO is open.

Two customers: this file is for the agent; the card
(`recipes/cases/2026fa/lavanyarajesh24-network-targets-swe.card.md`) is for the person.

**Handoff condition (done when):**
- the prototype exits `0`;
- both outputs exist in the run folder;
- every company appears in exactly one bucket;
- no company with unchecked liveness appears in `roles.json`;
- the offline test prints `# pass 7` and `# fail 0`.

"The lists look reasonable" is not the condition.

## Purpose

Information asymmetry addressed: from outside, a student cannot easily see:
- which employers have actually had H-1B approvals for software titles, and how many;
- whether each one has a suitable opening *today*.

A student who is not yet on OPT also gets misleading advice to "apply everywhere", when
most live postings will be filled before they can start.

This recipe makes both signals visible from records. It turns the engine's liveness-gated
skips into a networking list for the 3 networking hours of a 3-3-2 day.

Engine layers:
- **80 Days to Stay** — sponsorship counts and funding columns;
- **Job-Ops** — board liveness through the Greenhouse provider;
- **The Cognitive Pivot** — BLS wage, as context only.

## Required reads

1. `SNICKERDOODLE.md` — gates, provenance, lifecycle.
2. `DOMAIN.md` — layout and known gaps (role-quality weight 0; sample-only Form D; missing
   `data/raw`, `data/verified`, `logs/gate-decisions`).
3. `scripts/score/role-scorer.mjs` — the combiner this recipe feeds. It is not copied or
   modified.
4. This recipe and its card.

## Source inventory

| Source | Exact path | Label | Used for |
|---|---|---|---|
| 80 Days CSV | `data/80-days-to-stay/80-days-csv/mapped_student_employment_targets_v3.csv` | record | `Total Approvals`, `Total Denials`, `Approval_Rate`, `top_job_titles_sponsored`, `latest_funding_*`, `median_salary_offered`, `city`, `state`. Phone, executive and board columns are **never read into outputs**. |
| Form D samples | `data/sec/form-d/processed/sample/*.sample.json` | record | Exact name-key join, reported as a count. Samples only: the first 50 filings per quarter, 200 total. |
| BLS compact | `data/bls/compact/soc_occupation_compact.csv` (row `bls_soc_code = 15-1252`) | record | National median wage, context only |
| Board snapshot | `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/boards-snapshot.json` | record | Jobs listed per company at `fetched_at` |
| Board slugs | `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/boards.json` | your-input | Which Greenhouse board belongs to which company (hand-entered) |
| Persona | `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/persona.json` | your-input | States, OPT dates, hiring lag, title/location filters, tier thresholds |
| Scorer | `scripts/score/role-scorer.mjs` | — | Composite + Apply/Consider/Skip, run as a subprocess |
| Greenhouse provider | `scripts/ats/providers/greenhouse.mjs`, `scripts/ats/providers/_http.mjs` | — | The only network code path, reused as-is |

## Commands (all from the repo root)

```bash
# 1. (network, optional) refresh the board snapshot — contacts boards-api.greenhouse.io only
node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/capture-boards.mjs

# 2. (offline) run the recipe; --today pins the date so a run is reproducible
node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --today 2026-10-02

# 3. (offline) test against fictional fixtures; runs the real scorer
node --test scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.test.mjs

# 4. conformance
node scripts/conformance.mjs scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/ recipes/cases/2026fa/
```

The `snickerdoodle` CLI is roadmap, not runtime; no command here uses it.

## Workflow

1. **G0 input.** Load the persona and validate dates and filters.
2. **G2 timeline.** Compute the work window. Halt the whole run if it is closed.
3. **G1 data.** Load the CSV and check the required columns.
4. **Filter.** Keep rows with `state` in the target states, `Total Approvals > 0`, and
   `top_job_titles_sponsored` matching the persona pattern (`software`). These are
   records; the filter is your-input.
5. **Sponsorship tier**, by a fixed rule over the record counts. The thresholds are
   your-input in `persona.assumptions.sponsorship_tiers`.

   | Tier | Rule | p |
   |---|---|---|
   | Proven | ≥ 10 approvals and ≥ 90 % approval rate | 0.9 |
   | Likely | ≥ 3 approvals | 0.6 |
   | Possible | ≥ 1 approval | 0.3 |

   The Proven and Likely `p` values match the scorer's Chapter 11 example
   (`data/examples/ch11-roles.json`).
6. **Funding recency.** Read `latest_funding_date`. It is `recent` if ≤ 36 months old
   (your-input), `old` otherwise, and `unknown` if missing — never "old". Also attempt the
   exact name-key join to the Form D samples and record the match count.
7. **G3 liveness.** For each company, look up its entry in the board snapshot. Match
   postings by whole-word title include/exclude and location include (your-input).
8. **Build `roles.json`** in the shape of `data/examples/ch11-roles.json`:
   - one role per matching posting, with liveness `1.0` (record);
   - one placeholder role with liveness `0.0` (record) for a checked board with no match;
   - unchecked companies are **not written**.

   Each role carries:
   - sponsorship `{p, tier, source: record}`;
   - timeline `{factor, source: your-input}`;
   - fit `{p, source: your-input}`, only if the person rated it in `persona.fit_ratings`.
9. **Score.** Run `node scripts/score/role-scorer.mjs <roles.json> --out-dir <run dir>` with
   **no** `--profile` (see the "Can't verify" table) and read `role-scores.json`.
10. **Route** each company:

    | Condition | Bucket |
    |---|---|
    | Any role Apply/Consider | `apply` |
    | Every role is a gated Skip (`reason` starts with `gated: liveness`) **and** tier Proven/Likely | `network` (priority **A** if funding is recent, else **B**) |
    | Liveness unchecked | `check-board` |
    | Otherwise | `skip` |
    | A name in `persona.target.named_companies` absent from the CSV | `not-in-dataset` |

11. **Write the two outputs**, then stop at H1.

## Phase gates

| Gate | Testable condition (paths that exist) | Pass | Fail |
|---|---|---|---|
| G0 input | `inputs/persona.json` parses; `opt_start_date < opt_end_date`; `states` non-empty; `hiring_lag_days > 0` | continue | exit `2`, `G0 persona-invalid`, nothing written to buckets |
| G1 data | CSV exists and has all 11 required columns | continue | exit `2`, `G1 csv-missing` / `csv-columns-missing` |
| G2 timeline (**gate, not a vote**) | `work_window_end > today` **and** `factor > 0.05`. Definitions: `work_window_end = min(opt_end, max(opt_start, today) + unemployment days left)`; `earliest_start = max(today + hiring_lag, opt_start)`; `factor = min(1, (work_window_end − earliest_start) / hiring_lag)` | the factor goes to every role | exit `3`; the log has `status: "halted"`; no `roles.json`; the report says it stopped |
| G3 liveness (**gate, not a vote**) | The company has a snapshot entry with `status: "ok"` and a `jobs` array | factor `1.0` (match) or `0.0` (no match), sent to the scorer | `check-board` with reason `no-snapshot` / `board-error` / `snapshot-unparseable`; **not sent to the scorer** |
| H1 human release | A named person has read `network-targets-report.md` | that person contacts or applies, outside this recipe | nothing happens; the recipe sends nothing |

**Why unchecked companies never reach the scorer.** `role-scorer.mjs` defaults a missing
`liveness.factor` to `1` (open). Sending an unchecked company would silently treat "we did
not look" as "the job is live".

## What it can verify

- The CSV row for each company: approval and denial counts, approval rate, sponsored-title
  list, latest funding stage, date and amount, exactly as the 80 Days mapping recorded
  them.
- That a Greenhouse board API listed, or did not list, a posting with a matching title and
  location at the snapshot's `fetched_at`.
- That a board fetch failed, and how (HTTP status saved).
- Whether a candidate's name key appears in the shipped Form D samples. In the 2026-10-02
  run, **0 of 133** did.
- The BLS national median wage for SOC 15-1252: **$133,080**, OEWS 2024.
- The scorer's arithmetic per role (its own trace in `role-scores.json`).

## What it cannot verify (the boundary)

| Can't verify | Why | What the recipe does instead |
|---|---|---|
| That the sponsored roles were software developer roles (SOC 15-1252) | The CSV has no SOC codes, only a title list; matched by the text pattern `software` | Labels the match a title filter (your-input); proposes SOC-coded data (Proposed addition 1) |
| When the approvals happened | The CSV has totals, no fiscal years | Says so in every report |
| That a listed posting is real hiring | A board API can keep listing a filled role ("ghost") | Liveness `1.0` means "listed at `fetched_at`", nothing more |
| That a posting can wait for a start months away | Postings rarely state it; this persona cannot start for 105 days (OPT start 2027-01-15) | The H1 gate tells the person to check before applying |
| That a company with no match has no openings anywhere | It may use a second board or another ATS (e.g. one checked board listed only internships) | "Network first" is a suggestion for a person to judge, not a fact |
| E-Verify enrollment, needed for a later STEM extension | Not in any shipped dataset | Proposed addition 2 |
| Funding accuracy | The 80 Days funding columns contain visible mismatches (e.g. a large professional-services firm with a 2024 "Seed" round) and a duplicate company row | Funding only orders the network list (priority A/B); it is not a scorer term |
| Role quality in the decision | The scorer's `role_quality` weight is `0.0` (`[VERIFY]` in the scorer) | BLS wage is shown as context beside each company's H-1B median salary, outside the scorer. No weight is proposed. |
| Whether the profile needs sponsorship, via `--profile` | `applyProfile` treats any status containing "authorized" as not needing sponsorship. Confirmed: `"F-1 STEM OPT — work authorized (EAD)"` sets `profile_needs_sponsorship: false`. | No `--profile` is passed, so the scorer's default (`needsSponsor = true`) applies; reported as an engine defect |
| Which Greenhouse slug belongs to which company | Hand-entered; 7 of 20 guesses returned HTTP 404 | Saved as `board-error` → `check-board` |

## Proposed additions

1. `[TODO: DATA SOURCE]` **SOC-coded H-1B (DOL LCA disclosure) data** at
   `data/dol/lca/` (does not exist yet). Replaces the title-text match with SOC 15-1252
   counts and fiscal years. Closed when the file exists with a provenance note.
2. `[TODO: DATA SOURCE]` **E-Verify enrollment** per employer. Required before this recipe
   is used by a STEM-OPT student. Closed when a file with a provenance note exists in the
   repo.
3. `[TODO: DEV]` **Company → ATS board lookup**, reusing `scripts/ats/detect-ats.py`, so
   slugs stop being hand-entered guesses. Closed when a script writes `boards.json` and a
   test covers a wrong-slug case.

## Output contract

Two files, two customers (P5). Both go to the run folder, default
`course/2026fa/submissions/lavanyarajesh24/runs/`. The prototype refuses any other
in-repo output path.

**Agent log — `network-targets-log.json`**

| Field | Contents |
|---|---|
| `status` | `ok` or `halted` |
| `halt` | gate, code, message (halted runs only) |
| `inputs` | every input path |
| `timeline` | every term as `{value, source, from}` |
| `counts` | `csv_rows`, `candidates`, and one count per bucket |
| `formd` | `files`, `filings`, `matched` |
| `bls` | the wage context row |
| `scorer` | `command`, `roles_sent`, `summary`, `not_sent`, `why_not_sent` |
| `buckets` | per company: evidence, liveness and route, with every value labeled `record` / `your-input` / `model-judgment` |
| `cannot_verify` | the boundary list above |

The raw scorer outputs `roles.json`, `role-scores.json` and `role-scores.md` sit beside
the log.

**Human report — `network-targets-report.md`**

- Executive summary first: the four counts in plain words.
- Run record.
- One section per bucket, each with its next action.
- Wage context.
- "What this run could not check".
- The H1 instruction.

## Next action per result (the 3-3-2 connection)

| Bucket | Next action | 3-3-2 block |
|---|---|---|
| apply | Confirm the posting can start after OPT start, then tailor one application | the 2 apply hours |
| network | Find one person on the team for an informational interview; no application | the 3 networking hours |
| check-board | Find the board, add the slug to `boards.json`, run capture, re-run | 5 minutes of research, then re-run |
| skip | Nothing this cycle | — |
| not-in-dataset | No record ≠ never sponsors. Check DOL data by hand if the company matters. | — |

## Stop conditions

Stop and decide nothing when:
- G0, G1 or G2 fails;
- the board snapshot is unreadable (every company → `check-board`);
- asked to pass `--profile` to the scorer with free-text authorization;
- asked to send an unchecked company to the scorer, or to count a failed fetch as "no
  jobs";
- asked to edit `persona.json` filters after seeing a result, just to move a company you
  like into "apply". Filter changes are allowed only as dated revisions with the before
  and after runs kept, as `runs/first-pass/` is.

## Logging

- Write a run entry to `logs/runs/2026fa-lavanyarajesh24-<n>.md`. Never edit
  `logs/RUN_LOG.md` (contrib rule).
- `logs/gate-decisions/` does not exist. H1 is recorded in the run entry's "Gate decisions"
  line, with the person's name and date.

### Run-log template (`logs/runs/2026fa-lavanyarajesh24-<n>.md`)

```markdown
## YYYY-MM-DD — network-targets-swe sample run <n>

- **Recipe:** recipes/cases/2026fa/lavanyarajesh24-network-targets-swe.md v0.1.0
- **Inputs:** persona <path>; CSV <path>; Form D <dir>; BLS <path>; boards snapshot <path> (captured <time>); --today <date>
- **Command:** <exact command>
- **Outputs:** <run dir>/network-targets-log.json, network-targets-report.md, roles.json, role-scores.{json,md}
- **Result:** candidates <n> → apply <n> · network <n> · check-board <n> · skip <n> · not-in-dataset <n>; scorer "<summary line>"; Form D match <n>/<n>
- **Gate decisions:** G0 <pass/fail> · G1 <pass/fail> · G2 factor <x> · G3 unchecked <n> · H1 read by <name> on <date>
- **Open issues:** <what did not work / what is still missing>
```
