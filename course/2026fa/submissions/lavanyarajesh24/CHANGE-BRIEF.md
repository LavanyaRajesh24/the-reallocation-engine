# CHANGE-BRIEF — network-targets for F-1 software-engineering students (pre-OPT)

## Executive summary

This is the plan I wrote **before** building anything. It covers who the tool is for, what
data it reuses, where a person has to stop and decide, and what I expect to break.

The tool is for a master's student in software engineering who is still in school, will
need H-1B sponsorship, and has months before their OPT starts. For that student, the
best use of time now is meeting people at the right companies, not mass-applying.

The tool finds companies that have sponsored software roles and raised money. It then
splits them into:
- **apply now** — there is a live software posting;
- **network first** — no live posting yet;
- **unchecked** — the tool could not see the job board, so it decides nothing about that
  company.

The predictions below are kept as written; later corrections go in **Revisions** at the
bottom.

*Written 2026-10-02. Drafted with Claude (AI) from my answers and the repo's data, then
reviewed and edited by me. See FRICTIONAL.md for who did what.*

---

## 1. The situation

- **Who:** an international MS Software Engineering student in Boston on an F-1 visa.
  - Graduating May 2027; post-completion OPT expected to start mid-2027; STEM-OPT
    eligible later.
  - Targeting backend / platform software-engineer roles (BLS SOC 15-1252, Software
    Developers) in Massachusetts and New York.
  - Will need H-1B sponsorship.
- **Why this is not generic:** a student on OPT today is racing a 90-day unemployment
  clock and should apply. A student *before* OPT has the opposite problem. Most live
  postings will be filled long before they can start, but the companies that sponsor are
  worth getting to know now.
- **Demo persona:** the committed demo uses a fictional persona, "Meera Iyer (fictional)",
  with the same shape. No real personal data is used.
- **Engine layers used:**
  - 80 Days to Stay — sponsorship history and funding columns;
  - Job-Ops — ATS board liveness;
  - The Cognitive Pivot — BLS wage for SOC 15-1252, as context only.

## 2. What I reuse (exact paths) and what I add

**Reused, unchanged:**

| What | Path |
|---|---|
| Sponsorship + funding records | `data/80-days-to-stay/80-days-csv/mapped_student_employment_targets_v3.csv` |
| Form D funding samples | `data/sec/form-d/processed/sample/*.sample.json` |
| BLS national wage, SOC 15-1252 | `data/bls/compact/soc_occupation_compact.csv` |
| Greenhouse board fetcher | `scripts/ats/providers/greenhouse.mjs` + `scripts/ats/providers/_http.mjs` |
| The scorer (votes × gates → Apply/Consider/Skip) | `scripts/score/role-scorer.mjs`, run as-is, never copied |

**Added, all inside my namespaces:**

| What | Path | Why it belongs |
|---|---|---|
| Main prototype (offline) | `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs` | Joins the layers, applies the gates, writes `roles.json`, calls the scorer, and routes gated skips into a networking list. No current recipe does that. |
| Board capture (the only network step) | `.../capture-boards.mjs` | Keeps the network out of the decision code. It saves a timestamped snapshot that the offline step reads. |
| Offline test + fictional fixtures | `.../network-targets.test.mjs`, `.../fixtures/` | Required. Proves the failure cases behave. |
| Recipe + card | `recipes/cases/2026fa/lavanyarajesh24-network-targets-swe{.md,.card.md}` | Required. |

**Proposed, not built** (they will be typed `[TODO]`s in the recipe):
- SOC-coded H-1B (LCA) data, so "sponsors software roles" isn't a job-title text match;
- E-Verify enrollment, which matters for the later STEM extension;
- a company → ATS-board lookup, so board slugs aren't hand-entered.

## 3. Gates — where it stops and what a human must see

| Gate | Testable condition | What the human sees to clear it |
|---|---|---|
| G0 Input | Persona file parses; OPT dates present and in order; the work window hasn't already ended | The persona values echoed back, each labeled your-input |
| G1 Data | The CSV exists with the required columns | Row count + list of columns used |
| G2 Timeline (hard gate) | Days left in the work window minus hiring lag > 0. Otherwise, **stop the whole run** | The arithmetic: window end, earliest start, lag |
| G3 Liveness (hard gate) | A readable board snapshot exists for the company. No snapshot means **unchecked**, never sent to the scorer | Snapshot time, number of matching postings, the titles |
| H1 Human release | Before any outreach or application, the person reviews the report. The tool writes no messages and applies nowhere | The report: apply list, network list, unchecked list, with sources |

## 4. Predicted failure cases and how I'll check each

1. **Company not in the CSV.** The tool must say `not-in-dataset`, never "0 approvals".
   *Check:* a fixture target company that doesn't exist in the fixture CSV.
2. **OPT / work window already past.** The run must halt with a clear message and write no
   decisions. *Check:* run with a past `opt_end_date` (also my deliberate break attempt).
3. **Job board is missing, 404s, or returns bad JSON.** Liveness must be `unchecked`, not
   "no posting". If I got this wrong, a company would wrongly land on the "network first"
   list. *Check:* a corrupted fixture snapshot and a snapshot with `status: error`.
4. **Missing funding date in the CSV.** Funding recency must be `unknown`, not "old".
   *Check:* a fixture row with an empty `latest_funding_date`.
5. **Form D sample join finds nothing.** Known before building, not a prediction: while
   exploring the data I found that 0 of the 200 sample filings match the CSV. The tool
   must report the count, not hide it.

## 5. What I predict the first version will get wrong

- **Title matching will be wrong in both directions.**
  - Too loose: "Software Engineer in Test" or "Software Sales Engineer" counted as backend
    SWE.
  - Too strict: a "Member of Technical Staff" posting missed.
- **Most target companies won't have a Greenhouse board** (or I won't know their slug).
  So the "unchecked" bucket will be bigger than both real lists. The tool will be honest
  but not very useful until a board lookup exists.

## 6. Known engine facts this design has to respect

- **Role quality has weight 0 in the scorer.** I use the BLS wage only as context next to
  each company's H-1B median salary, outside the scorer. I do not propose a weight.
- **Only Form D samples ship.** I ran on the samples and say so.
- **The scorer treats a missing liveness value as open (×1).** That's why unchecked
  companies are never sent to it.
- **The scorer's `--profile` regex** reads "F-1 STEM OPT — work authorized (EAD)" as "no
  sponsorship needed". I confirmed this on the example roles. My prototype does not pass
  `--profile`; the scorer's default assumes sponsorship is needed, which is correct for me.
- **`data/raw/`, `data/verified/`, `logs/gate-decisions/` don't exist.** My gates point
  only at paths that do.
- **The 80 Days funding columns have visible matching errors.** For example, a
  large professional-services firm is listed with a 2024 "Seed" round. Funding recency is
  a hint, not a fact about the company.

---

## Revisions

*(append dated entries here; do not edit the predictions above)*
