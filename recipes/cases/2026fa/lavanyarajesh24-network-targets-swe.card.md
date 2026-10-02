# network-targets-swe — human card

**Audience:** an international MS software-engineering student, still in school, who will
need H-1B sponsorship and can't start work for months. Also anyone checking whether to
trust this student's lists.
**Agent twin:** `recipes/cases/2026fa/lavanyarajesh24-network-targets-swe.md`
**Status:** DRAFT, v0.1.0. A sample run has completed; three typed TODOs are open.

## Executive summary

This tool takes employers in your target states that have H-1B approvals for software job
titles and checks each one's public job board once. It tells you:
- where to **apply now**;
- where to **network first** — strong sponsor, but nothing suitable open;
- which boards it **couldn't see** — so it decided nothing about them.

It sends nothing and applies nowhere. You read the report and decide.

## What it can verify

- The 80 Days row for each employer: approvals, denials, approval rate, sponsored-title
  list, latest funding stage and date.
- That a Greenhouse board listed (or didn't list) a matching posting at the moment it was
  captured. The timestamp is in the report.
- That a board fetch failed, and how. A failed fetch becomes "check the board first",
  never "no jobs".
- Whether an employer appears in the shipped Form D samples. In the 2026-10-02 run, 0 of
  133 did.
- The national BLS median wage for software developers: **$133,080** (OEWS 2024). It is
  context only and changes no decision.

## What it cannot verify

- **That the sponsored jobs were software-developer jobs.** The data has job titles, not
  occupation codes.
- **When** the approvals happened. There are no years in the data.
- That a listed posting is **real hiring**, or that it can **wait for your OPT start date**.
- That "no match on this board" means **no openings anywhere**. A company may use a second
  board.
- **E-Verify enrollment**, which you will need for a STEM extension.
- That the **funding columns are right.** They contain visible errors: a large
  professional-services firm shows a "Seed" round, and one company appears twice.

## Dependencies

- Node 20+. No `npm install` is needed for the offline steps.
- `data/80-days-to-stay/80-days-csv/mapped_student_employment_targets_v3.csv`
- `data/sec/form-d/processed/sample/*.sample.json` — samples only
- `data/bls/compact/soc_occupation_compact.csv`
- `scripts/score/role-scorer.mjs` — the engine's scorer, used unchanged
- `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/` — the fictional
  persona, the board slugs, the board snapshot

## Annotated commands

The sample run, offline:

```bash
node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --today 2026-10-02
```

Expected output:
- the line `133 candidates`;
- the counts `apply 8 · network 5 · check-board 120`;
- `Form D sample match: 0/133`.

The tests, offline, with fictional companies:

```bash
node --test scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.test.mjs
```

Expected: `# pass 7`, `# fail 0`.

Refreshing the job boards. This is the only network step; it contacts
`boards-api.greenhouse.io`, nothing else:

```bash
node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/capture-boards.mjs
```

## What it produces

- `course/2026fa/submissions/lavanyarajesh24/runs/network-targets-report.md`
  - **for you.** Four lists, each with its next action, plus what wasn't checked.
- `.../runs/network-targets-log.json`
  - **for the agent.** Every value labeled record / your-input / model-judgment.
- `.../runs/roles.json` → `role-scores.json` / `role-scores.md`
  - what was sent to the engine's scorer, and what it said.

## Named failure modes

1. **The persona filter quietly reshapes the lists.**
   - Title and location filters are your-input. The first pass matched "MA" inside
     "Manitoba" and let senior roles through, so foreign and senior postings landed on
     "apply".
   - Who struggles to catch it: the student. The list looks plausible, and you only see
     it by reading locations row by row.
   - Mitigation: whole-word matching; the first-pass run is kept; filter changes are
     dated revisions.
2. **"Network first" is really "we looked at the wrong board".**
   - A wrong or incomplete board slug makes a hiring company look quiet.
   - Who struggles to catch it: a student who trusts the list and doesn't open the
     company's careers page.
   - Mitigation: wrong slugs save as errors (unchecked), and the report shows jobs-on-board
     counts. A board listing 1 job is a warning sign.
3. **Treating sponsorship history as a promise.**
   - Approvals are totals with no years and no occupation codes. A Proven tier can be
     years stale, or come from non-engineering titles.
   - Who struggles to catch it: anyone reading "Proven" as current policy.
   - Mitigation: the tier is labeled your-input over record counts; the dataset gap is a
     typed TODO.
