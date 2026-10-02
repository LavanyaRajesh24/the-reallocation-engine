# SOURCES — network-targets-swe

## Executive summary

This page credits everything my submission depends on: the repository and its governing
documents, the datasets, the code I reused, and the tools. It also says plainly what the
AI assistant did and what I decided, checked, changed or rejected.

## Repository and governing documents

- *The Reallocation Engine*, Nik Bear Brown — `github.com/nikbearbrown/the-reallocation-engine`.
  Forked to `github.com/LavanyaRajesh24/the-reallocation-engine` at upstream commit
  `015843d`.
- `SNICKERDOODLE.md` (constitution: provenance, gates, lifecycle, attestation format),
  `DOMAIN.md` (known gaps), `CONTRIBUTING.md` (namespaces, engine API),
  `DATA_CONTRACT.md` §Zero-Conditions (privacy), `recipes/_shared.md` (run-log template).
- Recipe style models: `recipes/local-wage-adjustment.md`,
  `recipes/local-wage-adjustment.card.md`, `recipes/scan.md`.
- Nik Bear Brown, *The 3-3-2 Split: Why Your Job Search Is Probably Backwards*. Used for
  the networking / credibility / applying framing only. I cite none of its figures.

## Data (all already in the repository; nothing new was added except one board snapshot)

| Data | Path | Notes |
|---|---|---|
| 80 Days to Stay company/sponsorship/funding CSV (Humanitarians AI) | `data/80-days-to-stay/80-days-csv/mapped_student_employment_targets_v3.csv` | Used columns listed in the recipe; phone and people-name columns never emitted |
| SEC Form D processed samples | `data/sec/form-d/processed/sample/*.sample.json` | Samples only (first 50 filings per quarter) |
| BLS OEWS / O*NET compact table | `data/bls/compact/soc_occupation_compact.csv` | Row 15-1252 only |
| Greenhouse public job-board API | `boards-api.greenhouse.io`, captured 2026-10-02 into `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/boards-snapshot.json` | Public listings; 20 companies; 7 returned HTTP 404 |

## Code reused (not copied)

- `scripts/score/role-scorer.mjs`: run as a subprocess; its output is read back.
- `scripts/ats/providers/greenhouse.mjs` and `scripts/ats/providers/_http.mjs`: imported
  by `capture-boards.mjs`.
- `scripts/conformance.mjs`, `scripts/doctor.mjs`, `scripts/manifest-check.mjs`,
  `scripts/pii-scan.mjs`: run as checks.
- `data/examples/ch11-roles.json`: the shape of my `roles.json`, and the Proven/Likely `p`
  values (0.9 / 0.6).

## Fictional data

"Meera Iyer (fictional)" and the fixture companies Alpha–Hotel and Zulu are invented. Meera
has my situation's shape — December 2026 graduation, OPT from 2027-01-15, MA/NY backend
SWE — but none of my personal details.

## Tools

- Node.js v22.11.0, Python 3.11.5, git, VS Code.
- **Claude Code (Anthropic), model Claude Opus 5.5**, in the Claude desktop app. Used
  throughout; the split is below. Commits it helped write carry a `Co-Authored-By: Claude`
  line.

## What the AI contributed vs. what I decided

| Area | AI (Claude) did | I decided / checked / changed / rejected |
|---|---|---|
| Understanding the assignment and repo | Read the governing docs and data. Explained forking, cloning, branches, pushing and PRs. Found engine defects (scorer `--profile` regex, missing-liveness default, 0 Form D overlap, data errors). | I asked to have each step explained before continuing, and slowed the process down when I was lost. ⚠ *Add your own words.* |
| Choice of recipe | Proposed four options and recommended network-targets | **I chose network-targets** for software-engineering roles |
| Repo setup | Cloned, created the branch, added remotes | **I forked** on GitHub. **I asked to restart from a clean clone of my fork** instead of the first clone of the upstream repo. **I pushed** the branch myself. |
| Persona | Drafted the fictional persona with a May 2027 graduation | **I rejected using an existing persona** (asked why, then chose a new one matching my situation). **I corrected the dates** to my real December 2026 graduation. |
| Privacy | Explained that a commit shows the author email | **I chose to keep my university email** as the commit author |
| Code (`network-targets.mjs`, `lib.mjs`, `capture-boards.mjs`, tests, fixtures) | Wrote all of it | ⚠ *Describe what you reviewed / can explain line by line.* |
| File count | — | **I questioned why the PR had 48 files.** Board snapshots were merged into one file and first-pass scorer copies dropped (47 → 24 code/data files). |
| First-pass bugs | Noticed the Manitoba/Madrid and senior-role problems by reading the output | ⚠ *Say whether you checked these rows yourself.* |
| Recipe status | Recommended DRAFT because 3 TODOs are open | ⚠ *Confirm you agree with DRAFT and why.* |
| Write-ups | Drafted every document from real outputs | ⚠ *Say what you edited.* |
