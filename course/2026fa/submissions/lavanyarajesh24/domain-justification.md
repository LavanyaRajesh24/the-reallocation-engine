# Domain justification — network-targets for pre-OPT F-1 software engineers

## Executive summary

This page explains who the network-targets recipe is for, what they can't see without it,
and how it changes the way they spend a job-search day.

In short: an international software-engineering student who is about three months from
OPT can't easily tell which employers have actually sponsored H-1B visas for software
roles, or which of those have a suitable opening right now. The recipe makes both visible
from records. Its main contribution is a short list of strong sponsors with nothing open
yet, which is where networking time should go.

## Who, in exactly what situation

- **Degree:** an international MS Software Engineering student in Boston, graduating
  December 2026.
- **Visa:** F-1. Post-completion OPT starts around 15 January 2027, with a 90-day
  unemployment allowance from that date. STEM-OPT eligible later.
- **Target:** entry-level backend / platform software-engineer roles (SOC 15-1252) in
  Massachusetts or New York. **Every offer must come with H-1B sponsorship.**
- **Timing:** today they are about 105 days from being allowed to start work.
  - Too early for most live postings, which want someone in weeks.
  - Late enough that the 90-day clock is close.
- **How it differs from other personas:** a student already on OPT should mostly apply. A
  first-year student has no deadline yet. This person is in between, and the recipe is
  built for that window.

## The information asymmetry

From outside, this student cannot easily see:

1. **Which employers have actually sponsored software roles, and how often.** A chatbot
   will confidently answer "does X sponsor?" with or without a record behind it. The 80
   Days CSV has approval and denial counts and the sponsored titles. The recipe shows
   those numbers, labeled as records.
2. **Which of those employers has a suitable opening today.** Answering this by hand means
   opening dozens of careers pages and filtering out senior, foreign and non-backend
   roles. The recipe reads each Greenhouse board once and applies the same whole-word
   filters to every company.
3. **What to do with a strong sponsor that has nothing open.** The engine's scorer
   correctly scores such a company as a Skip, because its liveness gate is closed. For
   someone three months out, that company is still valuable. Nobody tells the student
   "meet people here now". The recipe does.

## Engine layers it connects

| Layer | What the recipe takes from it |
|---|---|
| **80 Days to Stay** | Sponsorship counts, approval rate, sponsored titles and funding columns (`data/80-days-to-stay/80-days-csv/…v3.csv`). It also attempts the Form D sample join and reports the result, 0 of 133. |
| **Job-Ops** | Board liveness through the maintained Greenhouse provider (`scripts/ats/providers/greenhouse.mjs`) |
| **The Cognitive Pivot** | BLS national median wage for 15-1252 ($133,080, OEWS 2024), shown as context only. The scorer weights role quality at 0. |

All decisions go through the existing scorer, `scripts/score/role-scorer.mjs`. It is not
copied.

## Where it fits the 3-3-2 day

The recipe takes over the **research half of the "2" hours**: deciding *where* an
application is worth tailoring. It also **feeds the networking "3"** with a named list of
companies to contact.

- **Apply now.** Feeds the 2-hour block. For example, the sample run found entry-level
  postings at 8 Proven or Likely sponsors.
- **Network first.** Feeds the 3-hour block. In the sample run these were 5 Proven sponsors
  with no suitable opening: Attentive, Cambridge Mobile Telematics, Squarespace, Toast and
  Yext.
- **Check the board first.** A short research task, not a decision.

**Time saved — an estimate, not a measurement.** Doing this by hand for one company takes
about 15 minutes:
- about 10 minutes to look up its H-1B history;
- about 5 minutes to open its careers page and filter roles.

| | Effort per week |
|---|---|
| By hand, 20 companies | ≈ 5 hours |
| With the recipe | ≈ 2 minutes to re-capture and re-run, plus ≈ 30–45 minutes to read the report and open the shortlisted postings |
| **Saved** | **roughly 4 hours a week** |

I have not timed either path. The number comes from my own estimate of the manual steps.

The recipe and its tests are also a credibility-hours project in their own right: a
working, tested tool with an honest account of what it can't check.

## Domain-specific failure modes

1. **A persona filter that quietly reshapes the lists.**
   - What happens: the title and location filters are my own inputs. In the first run,
     "MA" matched "Manitoba" and "Madrid", and senior roles passed. The "apply" list then
     held Canadian, French and senior postings that looked plausible at a glance.
   - Who struggles to catch it: the student themselves. The company names are right; only
     reading the location and title of each row reveals the error.
   - Fixed with whole-word matching, with the first run kept as evidence.
2. **"Network first" that really means "we looked at the wrong board".**
   - What happens: a hand-entered slug can point at an incomplete board. The one I used for
     Cambridge Mobile Telematics lists only an internships page. The company then looks
     like it has no openings when it may post full-time roles elsewhere.
   - Who struggles to catch it: a student who trusts the list and skips the company's own
     careers page. A recruiter would catch it instantly.
   - The report shows jobs-on-board counts. A board with 1 listing is a warning sign.
3. **Reading "Proven" as current policy.**
   - What happens: approval counts in the CSV have no years and no SOC codes. A company can
     look Proven from approvals years ago, or for non-engineering titles.
   - Who struggles to catch it: the student, and anyone the student forwards the list to.
     Nothing in the number itself shows its age.
   - Mitigation: SOC-coded, dated LCA data is a typed TODO in the recipe.
