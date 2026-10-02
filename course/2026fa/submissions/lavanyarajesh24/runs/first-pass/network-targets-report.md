# Network targets — Meera Iyer (fictional) — 2026-10-02

## Executive summary

This report sorts software-engineering employers in MA and NY that have sponsored H-1B visas for software job titles into four groups, for a student who cannot start work until 2027-06-15.

- **Apply now: 11** — a matching software posting was listed on the company's job board when it was checked, and the engine's scorer said Apply or Consider.
- **Network first: 2** — strong sponsorship history but no matching opening on the board. These are people to meet before a role opens, not applications.
- **Check the job board first: 120** — no readable job-board snapshot, so nothing is decided about them.
- **Skip: 0**.

Every number below is labeled: **record** (read from a dataset or a saved job board), **your-input** (an assumption or rule you set), or **model-judgment** (none in this run). Nothing here has been sent anywhere. A person must read this before any outreach or application.

## Run record

| Item | Value | Source |
|---|---|---|
| persona | `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/persona.json` | — |
| csv | `data/80-days-to-stay/80-days-csv/mapped_student_employment_targets_v3.csv` | — |
| formd_dir | `data/sec/form-d/processed/sample` | — |
| bls | `data/bls/compact/soc_occupation_compact.csv` | — |
| boards | `scripts/contrib/2026fa/lavanyarajesh24-network-targets-swe/inputs/boards` | — |
| scorer | `scripts/score/role-scorer.mjs` | — |
| out_dir | `course/2026fa/submissions/lavanyarajesh24/runs` | — |
| timeline.today | 2026-10-02 | your-input |
| timeline.opt_start_date | 2027-06-15 | your-input |
| timeline.opt_end_date | 2028-06-14 | your-input |
| timeline.unemployment_days_remaining | 90 | your-input |
| timeline.hiring_lag_days | 60 | your-input |
| timeline.work_window_end | 2027-09-13 | your-input |
| timeline.earliest_start | 2027-06-15 | your-input |
| timeline.slack_days | 90 | your-input |
| timeline.start_wait_days | 256 | your-input |
| timeline.factor | 1 | your-input |
| CSV rows read | 30369 | record |
| candidates after state + sponsored-title filter | 133 | record (filter is your-input) |
| Form D sample filings checked | 200 in 4 file(s) | record |
| candidates matched to a Form D sample filing | 0 of 133 | record |
| scorer skip rate (scored roles only) | scored 75 roles → Apply 69 · Consider 4 · Skip 2 (skip 3%) | scorer output |

## Apply now

*Next action:* Tailor an application (2-hour research-and-apply block). First confirm the role can start on or after your OPT start date.

| Company | Location | Sponsorship [record → your-input tier] | Matching postings [record] | Why |
|---|---|---|---|---|
| ATTENTIVE MOBILE INC | NEW YORK, NY | 96 approved / 0 denied → **Proven** | Senior Software Engineer, Identity (United States)<br>Senior Software Engineer, Streaming (United States) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| COHERE HEALTH INC | BOSTON, MA | 104 approved / 2 denied → **Proven** | Lead Software Engineer - Integrations  (United States)<br>Software Engineer II (United States)<br>Sr. Software Engineer, Data Platform (United States) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| DATADOG INC | NEW YORK, NY | 340 approved / 0 denied → **Proven** | Senior Software Engineer  (Boston, Massachusetts, USA; New York, New York, USA)<br>Senior Software Engineer - Bazel Tools (Atlanta, Georgia, USA; Boston, Massachusetts, USA; New York, New York, USA)<br>Senior Software Engineer - CI/CD Security (New York, New York, USA)<br>Senior Software Engineer - Distributed Systems (Bordeaux, France; Grenoble, France; Lyon, France; Madrid, Spain; Montpellier, France; Nantes, France; Paris, France; Sophia Antipolis, France)<br>Senior Software Engineer - Distributed Systems (Boston, Massachusetts, USA; New York, New York, USA)<br>Senior Software Engineer - Incident Insights & Readiness (Boston, Massachusetts, USA; New York, New York, USA)<br>Senior Software Engineer - REDAPL Graph Engine (Dublin, Ireland; Madrid, Spain; Paris, France)<br>Senior Software Engineer - REDAPL Graph Engine (France, Remote; Germany, Remote; Italy, Remote; Spain, Remote; Switzerland, Remote; United Kingdom, Remote)<br>Senior Software Engineer - Streaming Platform  (New York, New York, USA)<br>Senior Software Engineer - Streaming Platform Client (New York, New York, USA)<br>Software Engineer with Systems Depth (New York, New York, USA) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| FLATIRON HEALTH INC | NEW YORK, NY | 98 approved / 0 denied → **Proven** | Senior Software Engineer, Data Engineering (NY office)<br>Software Engineer (NY office ) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| FORMLABS INC | Somerville, MA | 70 approved / 10 denied → **Likely** | Embedded Software Engineer  (Somerville, MA)<br>Senior Embedded Software Engineer  (Somerville, MA)<br>Software Engineer, E-commerce  (Somerville, MA)<br>Software Engineer - Print Pipeline (Somerville, MA) | scorer: Consider — composite 0.210 in the Consider band [0.2, 0.3) |
| JUSTWORKS INC | NEW YORK, NY | 80 approved / 2 denied → **Proven** | Senior Software Engineer, Applied AI  (Netherlands) (Remote - International )<br>Senior Software Engineer, Applied AI  (Spain) (Remote - International )<br>Senior Software Engineer, Applied AI  (United Kingdom)  (Remote - International )<br>Senior Software Engineer, Benefits  (New York, New York)<br>Senior Software Engineer, Onboarding (New York, New York)<br>Senior Software Engineer, Time (New York, New York)<br>Senior Software Engineer, Workforce Payments (New York, New York)<br>Software Engineer (New York, New York) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| KLAVIYO INC | BOSTON, MA | 154 approved / 4 denied → **Proven** | Full Stack Software Engineer - People Systems (Boston, MA)<br>Lead Software Engineer, CICD (Boston, MA)<br>Senior Lead Software Engineer - Data Platform (Boston, MA)<br>Senior Software Engineer - Customer Agent (Boston, MA)<br>Senior Software Engineer, Customer Agent (Boston, MA)<br>Senior Software Engineer - Data Platform (Boston, MA)<br>Senior Software Engineer - Developer Infrastructure (Boston, MA)<br>Senior Software Engineer - Growth (Boston, MA)<br>Senior Software Engineer - Infrastructure Security (Boston, MA)<br>Senior Software Engineer, Platform Engineering (Boston, MA)<br>Senior Software Engineer - Profiles, Lists and Segments (Boston, MA)<br>Software Engineer II - Recommendations (Boston, MA)<br>Software Engineer II, Test Frameworks & Tooling (Boston, MA)<br>Sr. Software Engineer, AI Enablement (Boston, MA) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| MONGODB INC | NEW YORK, NY | 462 approved / 4 denied → **Proven** | Senior Software Engineer, Cluster Scalability (United States)<br>Senior Software Engineer, Identity & Access Management (FedRamp) (Austin; Boston; Chicago; New York City; Palo Alto; Philadelphia; San Francisco)<br>Senior Software Engineer, Identity & Access Management (FedRAMP) (New York City)<br>Senior Software Engineer, Query Optimization (Austin; New York City; United States)<br>Senior Software Engineer, SQL Engines (United States)<br>Senior Software Engineer, Storage Layer Services (New York City; United States)<br>Software Engineer (United States)<br>Software Engineer 3 (Alberta; British Columbia; Manitoba; Nova Scotia; Ontario; Quebec)<br>Software Engineer 3 (New York City)<br>Software Engineer 3 (United States)<br>Software Engineer 3, Atlas Clusters Platform (New York City)<br>Software Engineer 3, Atlas Identity and Access Management (New York City)<br>Software Engineer 3, Networking & Observability (New York City; United States)<br>Software Engineer 3, Storage Execution (New York City) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| PATHAI INC | CAMBRIDGE, MA | 78 approved / 2 denied → **Proven** | Senior Software Engineer, Backend (Boston, MA (Hybrid))<br>Senior Software Engineer, Fullstack (Boston, MA (Hybrid))<br>Senior Software Engineer, ML Ops (Boston, MA)<br>Software Engineer I, Fullstack (Boston, MA (Hybrid)) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| SQUARESPACE INC | New York, NY | 94 approved / 2 denied → **Proven** | Senior Software Engineer - Java (Media Platform) (New York City)<br>Software Engineer, Frontend  (New York City) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |
| TOAST INC | BOSTON, MA | 150 approved / 4 denied → **Proven** | Senior Software Engineer (Remote, USA)<br>Senior Software Engineer (Remote, US )<br>Senior Software Engineer, Care Automation (Remote, USA)<br>Senior Software Engineer, Enterprise (Remote, Canada)<br>Senior Software Engineer (Fullstack), Digital Storefront (Remote, US)<br>Senior Software Engineer, Release Engineering (Remote, US)<br>Senior Software Engineer, Retail (Remote, US)<br>Senior Software Engineer, Toast Delivery Services  (Remote, US )<br>Software Engineer II, Android  (Remote, US ) | scorer: Apply — composite 0.315 ≥ 0.3, gates healthy |

## Network first

*Next action:* Informational-interview target (3-hour networking block). No live opening to apply to yet.

| Priority | Company | Location | Sponsorship | Latest funding [record] | Board checked [record] |
|---|---|---|---|---|---|
| B | CAMBRIDGE MOBILE TELEMATICS INC | CAMBRIDGE, MA | 72 approved / 0 denied → **Proven** | Seed 2014-08-11 (old) | 1 jobs, 0 matching, 2026-10-02T18:19:21.024Z |
| B | YEXT INC | NEW YORK, NY | 68 approved / 0 denied → **Proven** | Series C 2014-05-28 (old) | 22 jobs, 0 matching, 2026-10-02T18:19:21.208Z |

## Check the job board first

*Next action:* Find this company's job board, add it to boards.json, run capture-boards.mjs, re-run. Decide nothing until then.

| Company | Location | Sponsorship | Latest funding | Why unchecked |
|---|---|---|---|---|
| 1UPHEALTH INC | BOSTON, MA | 12 approved / 0 denied → **Proven** | Series C 2023-04-03 (old) | liveness unchecked (no-snapshot) |
| ABACUS INSIGHTS INC | BOSTON, MA | 22 approved / 0 denied → **Proven** | Series A 2024-10-01 (recent) | liveness unchecked (no-snapshot) |
| ACQUIA INC | BURLINGTON, MA | 18 approved / 0 denied → **Proven** | Series C 2015-09-22 (old) | liveness unchecked (no-snapshot) |
| ACTIONIQ INC | NEW YORK, NY | 16 approved / 0 denied → **Proven** | Series C 2021-03-08 (old) | liveness unchecked (no-snapshot) |
| ACUITYMD INC | SOMMERVILLE, MA | 16 approved / 0 denied → **Proven** | Series B 2022-03-09 (old) | liveness unchecked (no-snapshot) |
| AFFICIENCY INC | New York, NY | 20 approved / 2 denied → **Proven** | Series A 2022-03-21 (old) | liveness unchecked (no-snapshot) |
| AGENT TECHNOLOGIES INC | BROOKLYN, NY | 216 approved / 4 denied → **Proven** | Seed 2022-03-02 (old) | liveness unchecked (no-snapshot) |
| AION BIOSYSTEMS INC | LOWELL, MA | 2 approved / 0 denied → **Possible** | Seed 2024-04-01 (recent) | liveness unchecked (no-snapshot) |
| ALCOVE LABS INC | New York, NY | 2 approved / 0 denied → **Possible** | Seed 2022-08-24 (old) | liveness unchecked (no-snapshot) |
| AMPION PBC | BOSTON, MA | 18 approved / 0 denied → **Proven** | Series A 2020-12-11 (old) | liveness unchecked (no-snapshot) |
| APPLAUSE APP QUALITY INC | FRAMINGHAM, MA | 38 approved / 0 denied → **Proven** | Series B 2016-08-24 (old) | liveness unchecked (no-snapshot) |
| AUGMENTED REALITY CONCEPTS INC | SYRACUSE, NY | 10 approved / 0 denied → **Proven** | Series D+ 2022-12-19 (old) | liveness unchecked (no-snapshot) |
| AVA ROBOTICS INC | CAMBRIDGE, MA | 2 approved / 0 denied → **Possible** | Seed 2019-04-08 (old) | liveness unchecked (no-snapshot) |
| BARKING LABS CORP | BROOKLYN, NY | 2 approved / 0 denied → **Possible** | Series B 2021-02-05 (old) | liveness unchecked (no-snapshot) |
| BELFRY SOFTWARE INC | NEW YORK, NY | 2 approved / 0 denied → **Possible** | Series B 2024-10-28 (recent) | liveness unchecked (no-snapshot) |
| BENEFITS SCIENCE LLC | WALTHAM, MA | 18 approved / 0 denied → **Proven** | Seed 2018-07-16 (old) | liveness unchecked (no-snapshot) |
| BILT TECHNOLOGIES INC | NEW YORK, NY | 12 approved / 0 denied → **Proven** | Series D+ 2024-01-22 (recent) | liveness unchecked (no-snapshot) |
| BITSIGHT TECHNOLOGIES INC | CAMBRIDGE, MA | 30 approved / 0 denied → **Proven** | Series C 2018-06-26 (old) | liveness unchecked (no-snapshot) |
| BLUECORE INC | NEW YORK, NY | 20 approved / 0 denied → **Proven** | Series B 2024-10-29 (recent) | liveness unchecked (board-error) |
| BOZBURUN INC | BROOKLYN, NY | 2 approved / 0 denied → **Possible** | Seed 2019-03-25 (old) | liveness unchecked (no-snapshot) |
| BRIDGE IT INC | NEW YORK, NY | 26 approved / 0 denied → **Proven** | Pre-Seed 2019-02-12 (old) | liveness unchecked (no-snapshot) |
| CADENCE GROUP INC | NEW YORK, NY | 2 approved / 0 denied → **Possible** | Series A 2021-03-29 (old) | liveness unchecked (no-snapshot) |
| CARDFLIGHT INC | NEW YORK, NY | 10 approved / 0 denied → **Proven** | Pre-Seed 2014-09-09 (old) | liveness unchecked (no-snapshot) |
| CATCHPOINT SYSTEMS INC | NEW YORK, NY | 16 approved / 0 denied → **Proven** | Series B 2016-10-17 (old) | liveness unchecked (no-snapshot) |
| CELERO SYSTEMS INC | BROOKLINE, MA | 100 approved / 4 denied → **Proven** | Seed 2019-06-19 (old) | liveness unchecked (no-snapshot) |
| CENTAGE CORP | NATICK, MA | 2 approved / 0 denied → **Possible** | Series A 2019-01-24 (old) | liveness unchecked (no-snapshot) |
| CHAINALYSIS INC | NEW YORK, NY | 62 approved / 0 denied → **Proven** | Series C 2021-03-23 (old) | liveness unchecked (board-error) |
| CINCH TECHNOLOGIES INC | NEW YORK, NY | 94 approved / 8 denied → **Proven** | Seed 2019-03-07 (old) | liveness unchecked (no-snapshot) |
| CINDER TECHNOLOGIES INC | New York, NY | 2 approved / 0 denied → **Possible** | Series A 2022-11-18 (old) | liveness unchecked (no-snapshot) |
| CLARAPATH INC | Hawthorne, NY | 6 approved / 0 denied → **Likely** | Series B 2023-03-20 (old) | liveness unchecked (no-snapshot) |
| DATAMINR INC | NEW YORK, NY | 58 approved / 2 denied → **Proven** | Series D+ 2021-03-22 (old) | liveness unchecked (board-error) |
| DEEPFRAUD TECHNOLOGIES INC | NEW YORK, NY | 40 approved / 0 denied → **Proven** | Series A 2023-06-02 (old) | liveness unchecked (no-snapshot) |
| DELOITTE TAX LLP | NEW YORK, NY | 2176 approved / 16 denied → **Proven** | Series B 2022-01-07 (old) | liveness unchecked (no-snapshot) |
| DELOITTE TOUCHE TOHMATSU SERVICES INC | NEW YORK, NY | 242 approved / 2 denied → **Proven** | Pre-Seed 2018-01-12 (old) | liveness unchecked (no-snapshot) |
| DELOITTE TOUCHE TOHMATSU SERVICES LLC | NEW YORK, NY | 242 approved / 2 denied → **Proven** | Seed 2024-01-12 (recent) | liveness unchecked (no-snapshot) |
| DENVER TECHNOLOGIES INC | NEW YORK, NY | 4 approved / 0 denied → **Likely** | Series A 2020-06-02 (old) | liveness unchecked (no-snapshot) |
| DIMENSION TECHNOLOGIES INC | ROCHESTER, NY | 36 approved / 0 denied → **Proven** | — no date (unknown) | liveness unchecked (no-snapshot) |
| DYNOCARDIA INC | NEWTON CENTRE, MA | 2 approved / 0 denied → **Possible** | Pre-Seed 2025-03-04 (recent) | liveness unchecked (no-snapshot) |
| ELION THERAPEUTICS INC | NEW YORK, NY | 68 approved / 0 denied → **Proven** | Series B 2024-06-11 (recent) | liveness unchecked (no-snapshot) |
| ETSY INC | BROOKLYN, NY | 222 approved / 2 denied → **Proven** | Series A 2014-04-29 (old) | liveness unchecked (board-error) |
| EXAMITY INC | Natick, MA | 6 approved / 0 denied → **Likely** | Seed 2018-04-17 (old) | liveness unchecked (no-snapshot) |
| EXTREME REACH INC | NEEDHAM, MA | 18 approved / 0 denied → **Proven** | Series C 2015-06-15 (old) | liveness unchecked (no-snapshot) |
| FAIRMARKIT INC | Malden, MA | 2 approved / 0 denied → **Possible** | Series B 2020-11-19 (old) | liveness unchecked (no-snapshot) |
| FIRST HELP FINANCIAL LLC | NEWTON, MA | 30 approved / 0 denied → **Proven** | Series C 2021-11-03 (old) | liveness unchecked (no-snapshot) |
| FOURSQUARE LABS INC | New York, NY | 56 approved / 0 denied → **Proven** | Seed 2025-04-07 (recent) | liveness unchecked (no-snapshot) |
| GENEVA TECHNOLOGIES INC | NEW YORK, NY | 4 approved / 0 denied → **Likely** | Series B 2022-09-02 (old) | liveness unchecked (no-snapshot) |
| GINKGO BIOWORKS INC | BOSTON, MA | 122 approved / 12 denied → **Proven** | Series C 2015-07-08 (old) | liveness unchecked (no-snapshot) |
| GLIA TECHNOLOGIES INC | NEW YORK, NY | 30 approved / 0 denied → **Proven** | Series B 2022-06-22 (old) | liveness unchecked (no-snapshot) |
| GREENLIGHT BIOSCIENCES INC | Medford, MA | 16 approved / 0 denied → **Proven** | Series D+ 2020-06-15 (old) | liveness unchecked (no-snapshot) |
| GRO INTELLIGENCE INC | New York, NY | 12 approved / 0 denied → **Proven** | Series C 2020-12-22 (old) | liveness unchecked (no-snapshot) |
| HEALTHEDGE SOFTWARE INC | BURLINGTON, MA | 156 approved / 4 denied → **Proven** | Series B 2014-09-08 (old) | liveness unchecked (no-snapshot) |
| IMAGEN TECHNOLOGIES INC | NEW YORK, NY | 12 approved / 0 denied → **Proven** | Series A 2017-03-03 (old) | liveness unchecked (no-snapshot) |
| IMPRINT PAYMENTS INC | NEW YORK, NY | 52 approved / 0 denied → **Proven** | Series A 2021-01-06 (old) | liveness unchecked (no-snapshot) |
| INSIGHTFINDER INC | BROOKLYN, NY | 4 approved / 0 denied → **Likely** | Seed 2019-12-16 (old) | liveness unchecked (no-snapshot) |
| INVISIONAPP INC | NEW YORK, NY | 2 approved / 0 denied → **Possible** | Series C 2015-06-25 (old) | liveness unchecked (no-snapshot) |
| ISEE INC | CAMBRIDGE, MA | 8 approved / 0 denied → **Likely** | Seed 2017-09-01 (old) | liveness unchecked (no-snapshot) |
| ITERATIVE SCOPES INC | Cambridge, MA | 18 approved / 0 denied → **Proven** | Series D+ 2021-12-06 (old) | liveness unchecked (no-snapshot) |
| KONEKSA HEALTH INC | NEW YORK, NY | 4 approved / 0 denied → **Likely** | Series A 2020-03-25 (old) | liveness unchecked (no-snapshot) |
| LEARNING MACHINE TECHNOLOGIES INC | NEW YORK, NY | 16 approved / 2 denied → **Likely** | Seed 2018-04-06 (old) | liveness unchecked (no-snapshot) |
| LENDBUZZ INC | BOSTON, MA | 60 approved / 0 denied → **Proven** | Series C 2021-05-13 (old) | liveness unchecked (board-error) |
| LOOKOUT INC | BOSTON, MA | 38 approved / 0 denied → **Proven** | Series B 2021-03-15 (old) | liveness unchecked (no-snapshot) |
| MAIN TECHNOLOGIES INC | NEW YORK, NY | 6 approved / 0 denied → **Likely** | — no date (unknown) | liveness unchecked (no-snapshot) |
| MAVEN CLINIC CO | NEW YORK, NY | 32 approved / 0 denied → **Proven** | Series A 2017-06-13 (old) | liveness unchecked (no-snapshot) |
| MOTIVEMETRICS INC | STONEHAM, MA | 2 approved / 0 denied → **Possible** | Series A 2021-07-08 (old) | liveness unchecked (no-snapshot) |
| MULTIPLIER INC | NEW YORK, NY | 2 approved / 0 denied → **Possible** | Series B 2023-12-05 (recent) | liveness unchecked (no-snapshot) |
| NETBRAIN TECHNOLOGIES INC | BURLINGTON, MA | 36 approved / 4 denied → **Proven** | Series B 2014-04-07 (old) | liveness unchecked (no-snapshot) |
| NEXTUPLE INC | ANDOVER, MA | 18 approved / 0 denied → **Proven** | Pre-Seed 2021-12-07 (old) | liveness unchecked (no-snapshot) |
| NODAR INC | Somerville, MA | 2 approved / 0 denied → **Possible** | Series A 2022-04-05 (old) | liveness unchecked (no-snapshot) |
| NUANCE COMMUNICATIONS INC | BURLINGTON, MA | 60 approved / 4 denied → **Proven** | Series C 2016-08-16 (old) | liveness unchecked (no-snapshot) |
| ONEVISION RESOURCES INC | BOSTON, MA | 14 approved / 0 denied → **Proven** | Seed 2020-01-31 (old) | liveness unchecked (no-snapshot) |
| OVERJET INC | BOSTON, MA | 48 approved / 2 denied → **Proven** | Series C 2024-02-16 (recent) | liveness unchecked (board-error) |
| PALLET LABS INC | New York, NY | 2 approved / 0 denied → **Possible** | Seed 2021-07-02 (old) | liveness unchecked (no-snapshot) |
| PARADIGM CONNECT INC | NEW YORK, NY | 6 approved / 0 denied → **Likely** | Seed 2020-05-22 (old) | liveness unchecked (no-snapshot) |
| PEGASYSTEMS INC | CAMBRIDGE, MA | 180 approved / 2 denied → **Proven** | Pre-Seed 2019-05-10 (old) | liveness unchecked (no-snapshot) |
| PELOTON INTERACTIVE INC | NEW YORK, NY | 310 approved / 8 denied → **Proven** | Series C 2015-11-30 (old) | liveness unchecked (no-snapshot) |
| PELOTON INTERACTIVE LLC | NEW YORK, NY | 310 approved / 8 denied → **Proven** | Seed 2014-11-25 (old) | liveness unchecked (no-snapshot) |
| PETAL CARD INC | NEW YORK, NY | 10 approved / 0 denied → **Proven** | Pre-Seed 2016-12-15 (old) | liveness unchecked (no-snapshot) |
| PINECONE SYSTEMS INC | New York, NY | 22 approved / 0 denied → **Proven** | Series C 2023-04-10 (old) | liveness unchecked (no-snapshot) |
| PIONEAR TECHNOLOGIES INC | Allston, MA | 10 approved / 0 denied → **Proven** | Pre-Seed 2020-11-11 (old) | liveness unchecked (no-snapshot) |
| PRIME CONSULTING GROUP LLC | HOLDEN, MA | 46 approved / 2 denied → **Proven** | Series A 2015-06-12 (old) | liveness unchecked (no-snapshot) |
| PUBMARK INC | CAMBRIDGE, MA | 4 approved / 0 denied → **Likely** | Seed 2015-05-07 (old) | liveness unchecked (no-snapshot) |
| REGENT CRAFT INC | BURLINGTON, MA | 18 approved / 0 denied → **Proven** | Series B 2021-12-29 (old) | liveness unchecked (no-snapshot) |
| RESURETY INC | BOSTON, MA | 14 approved / 2 denied → **Likely** | Series B 2021-10-14 (old) | liveness unchecked (no-snapshot) |
| RIBBON HEALTH INC | NEW YORK, NY | 4 approved / 0 denied → **Likely** | Seed 2021-02-19 (old) | liveness unchecked (no-snapshot) |
| ROCKPORT VAL LLC | NEW YORK, NY | 2 approved / 0 denied → **Possible** | Series A 2017-10-10 (old) | liveness unchecked (no-snapshot) |
| RODO INC | New York, NY | 2 approved / 0 denied → **Possible** | Series B 2021-06-25 (old) | liveness unchecked (no-snapshot) |
| RUBIK INC | New York, NY | 490 approved / 14 denied → **Proven** | Seed 2022-04-22 (old) | liveness unchecked (no-snapshot) |
| SEATGEEK INC | NEW YORK, NY | 54 approved / 0 denied → **Proven** | Series C 2017-04-05 (old) | liveness unchecked (no-snapshot) |
| SECEON INC | WESTFORD, MA | 12 approved / 0 denied → **Proven** | Pre-Seed 2015-09-25 (old) | liveness unchecked (no-snapshot) |
| SILVERRAIL TECHNOLOGIES INC | WOBURN, MA | 4 approved / 0 denied → **Likely** | Series B 2014-04-08 (old) | liveness unchecked (no-snapshot) |
| SOCURE INC | NEW YORK, NY | 82 approved / 0 denied → **Proven** | Series C 2021-03-05 (old) | liveness unchecked (board-error) |
| SOFAR SOUNDS LTD | SOMERVILLE, MA | 2 approved / 0 denied → **Possible** | Seed 2021-02-09 (old) | liveness unchecked (no-snapshot) |
| SPARK NEURO INC | NEW YORK, NY | 2 approved / 0 denied → **Possible** | Series A 2018-07-06 (old) | liveness unchecked (no-snapshot) |
| SPOTNANA TECHNOLOGY INC | NEW YORK, NY | 58 approved / 0 denied → **Proven** | Series B 2021-07-28 (old) | liveness unchecked (no-snapshot) |
| SYNACOR INC | BUFFALO, NY | 4 approved / 0 denied → **Likely** | Seed 2015-09-14 (old) | liveness unchecked (no-snapshot) |
| TALENT INC | NEW YORK, NY | 72 approved / 0 denied → **Proven** | Pre-Seed 2014-09-24 (old) | liveness unchecked (no-snapshot) |
| TEACHABLE INC | NEW YORK, NY | 6 approved / 0 denied → **Likely** | Seed 2018-04-09 (old) | liveness unchecked (no-snapshot) |
| TELADOC HEALTH INC | PURCHASE, NY | 510 approved / 16 denied → **Proven** | Series D+ 2020-07-01 (old) | liveness unchecked (no-snapshot) |
| TETRASCIENCE INC | BOSTON, MA | 10 approved / 0 denied → **Proven** | Series C 2021-03-26 (old) | liveness unchecked (no-snapshot) |
| THERMO FISHER SCIENTIFIC INC | WALTHAM, MA | 1096 approved / 22 denied → **Proven** | Series D+ 2014-02-03 (old) | liveness unchecked (no-snapshot) |
| THIRTY MADISON INC | New York, NY | 14 approved / 0 denied → **Proven** | Series D+ 2022-03-14 (old) | liveness unchecked (no-snapshot) |
| TODYL INC | BROOKLYN, NY | 6 approved / 0 denied → **Likely** | Seed 2020-05-14 (old) | liveness unchecked (no-snapshot) |
| TRACELINK INC | WAKEFIELD, MA | 112 approved / 4 denied → **Proven** | Series C 2018-05-25 (old) | liveness unchecked (no-snapshot) |
| TULIP INTERFACES INC | SOMERVILLE, MA | 18 approved / 0 denied → **Proven** | Series C 2021-07-19 (old) | liveness unchecked (no-snapshot) |
| UFA INC | BURLINGTON, MA | 2 approved / 0 denied → **Possible** | Series A 2021-04-29 (old) | liveness unchecked (no-snapshot) |
| UIPATH INC | NEW YORK, NY | 158 approved / 4 denied → **Proven** | Series D+ 2021-02-01 (old) | liveness unchecked (no-snapshot) |
| UNITE USA INC | New York, NY | 22 approved / 0 denied → **Proven** | Series D+ 2021-03-12 (old) | liveness unchecked (no-snapshot) |
| UNIVERSAL NAVIGATION INC | MONSEY, NY | 6 approved / 0 denied → **Likely** | Series A 2020-06-05 (old) | liveness unchecked (no-snapshot) |
| UNQORK INC | NEW YORK, NY | 38 approved / 0 denied → **Proven** | Series D+ 2020-09-18 (old) | liveness unchecked (no-snapshot) |
| VERINT SYSTEMS INC | Melville, NY | 22 approved / 0 denied → **Proven** | Series D+ 2021-04-06 (old) | liveness unchecked (no-snapshot) |
| VESTMARK INC | WAKEFIELD, MA | 52 approved / 0 denied → **Proven** | Series A 2017-09-27 (old) | liveness unchecked (no-snapshot) |
| VIDEAHEALTH INC | Boston, MA | 14 approved / 2 denied → **Likely** | Series B 2022-03-04 (old) | liveness unchecked (no-snapshot) |
| VIDMOB INC | NEW YORK, NY | 22 approved / 0 denied → **Proven** | Series A 2025-04-24 (recent) | liveness unchecked (no-snapshot) |
| VIEW THE SPACE INC | NEW YORK, NY | 10 approved / 0 denied → **Proven** | Series C 2019-05-03 (old) | liveness unchecked (no-snapshot) |
| VIRALGAINS INC | BOSTON, MA | 6 approved / 0 denied → **Likely** | Series A 2015-12-22 (old) | liveness unchecked (no-snapshot) |
| WHEELS UP PARTNERS HOLDINGS LLC | NEW YORK, NY | 38 approved / 0 denied → **Proven** | Series D+ 2019-05-17 (old) | liveness unchecked (no-snapshot) |
| WW INTERNATIONAL INC | NEW YORK, NY | 74 approved / 0 denied → **Proven** | Series B 2023-04-10 (old) | liveness unchecked (no-snapshot) |
| YIELDMO INC | NEW YORK, NY | 22 approved / 0 denied → **Proven** | Series A 2017-06-09 (old) | liveness unchecked (no-snapshot) |
| ZAKIPOINT HEALTH INC | CAMBRIDGE, MA | 14 approved / 2 denied → **Likely** | Pre-Seed 2023-08-29 (old) | liveness unchecked (no-snapshot) |
| ZOCDOC INC | New York, NY | 32 approved / 2 denied → **Proven** | Series C 2015-07-23 (old) | liveness unchecked (no-snapshot) |

## Skip

*Next action:* No action this cycle.

*None.*

## Wage context (outside the scorer)

BLS national median for Software Developers (SOC 15-1252, OEWS 2024): **$133,080** [record]. Each company's H-1B median salary above covers *all* its sponsored titles, not just software roles, so compare loosely. The engine's scorer gives role quality a weight of 0, so this number changes no decision.

## What this run could not check

- Whether a company sponsored **software** roles specifically: the CSV has no SOC codes, only a title text list, matched with a simple pattern.
- When the sponsorship happened: the CSV has approval totals but no years, so a sponsor from years ago looks the same as one from last year.
- Whether a listed posting is real hiring (a "ghost" posting can stay listed on a board API).
- Whether a posting can wait for a start date months away (new-grad / next-summer roles can; most cannot).
- E-Verify enrollment, which a later STEM OPT extension requires.
- Funding accuracy: the 80 Days funding columns contain visible mismatches (e.g. a large professional-services firm listed with a "Seed" round).
- Companies whose job board is not on Greenhouse, or whose board address was not supplied: they stay unchecked.

## Human gate (H1)

Before acting on any row: open each "Apply now" posting and confirm it is still open and can start after your OPT start date; for "Network first", decide whom to contact yourself. This tool sends nothing and applies nowhere.
