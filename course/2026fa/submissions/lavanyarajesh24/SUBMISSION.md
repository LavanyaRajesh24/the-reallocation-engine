# SUBMISSION

## Executive summary

This is the Canvas cover sheet for my Reallocation Engine recipe assignment. It names
where everything is, the exact commit submitted, how to run it, and what it can't do.

- **Assignment:** The Reallocation Engine — Recipe Design Assignment
- **Student:** Lavanya Rajesh
- **GitHub handle:** LavanyaRajesh24
- **Domain / situation:**
  - International MS Software Engineering student in Boston, graduating December 2026,
    F-1, OPT from 2027-01-15.
  - Needs H-1B sponsorship.
  - Targeting entry-level backend SWE (SOC 15-1252) in MA/NY.
  - Recipe: which sponsor-history employers to apply to now, and which to network into
    first.
- **Recipe path:** `recipes/cases/2026fa/lavanyarajesh24-network-targets-swe.md` (card:
  `recipes/cases/2026fa/lavanyarajesh24-network-targets-swe.card.md`)
- **Prototype command:**
  `node scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.mjs --today 2026-10-02`
  - test: `node --test scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/network-targets.test.mjs`
- **GitHub repository / branch / PR URL:**
  `https://github.com/LavanyaRajesh24/the-reallocation-engine` /
  `contrib/2026fa-lavanyarajesh24-network-targets-swe` / ⚠ *PR URL*
- **Submitted commit SHA:** ⚠ *fill in after the final commit (`git rev-parse HEAD`)*
- **Lifecycle stage claimed:** DRAFT. A full sample run completed, but 3 typed TODOs are
  open, and the constitution allows SPECIFIED or later only with zero open TODOs.

## Summary of my changes

All changes are inside my namespaces. Nothing maintained was edited.

- **Offline prototype** — reads:
  - the 80 Days CSV;
  - the Form D samples;
  - the BLS table;
  - a dated Greenhouse board snapshot.
- **What it does:**
  - sends only liveness-checked companies to the existing `role-scorer.mjs`;
  - routes liveness-gated skips with strong sponsorship into a "network first" list;
  - labels every value record / your-input / model-judgment.
- **Network capture script:** the only network step, using the maintained Greenhouse
  provider.
- **Tests:** 7 offline tests with fictional fixtures, including break attempts.
- **Recipe + card:** with gates, a can't-verify table, and an output contract.
- **Write-ups:** CHANGE-BRIEF (with revisions), domain justification, worked run with
  attestation, TEST-REPORT, FRICTIONAL, this file.
- **Run log:** `logs/runs/2026fa-lavanyarajesh24-1.md`.

## Known limitations

- **Coverage:** 120 of 133 candidates are unchecked (no known Greenhouse board); board slugs
  are hand-entered, and 7 of 20 returned 404.
- **Sponsorship evidence:** the 80 Days CSV has no SOC codes and no years, so sponsorship
  is a title-text match and may be stale.
- **What "liveness" means:** "listed on the board API". `npm run ats:liveness` (Playwright)
  was not run. Ghost postings and start-date fit are not verified.
- **Funding:**
  - Form D samples matched 0 of 133.
  - The CSV funding columns contain errors.
  - Funding only orders the network list.
- **Mislabeled term:** the scorer labels the sponsorship term `record`, though its value
  (0.9) comes from my tier rule.
- **No fit rating:** with no fit rating, "Apply" means "Proven sponsor + a matching
  posting".
- **Not tested:** Lever, Ashby and Workday boards; E-Verify (needed for STEM OPT).
