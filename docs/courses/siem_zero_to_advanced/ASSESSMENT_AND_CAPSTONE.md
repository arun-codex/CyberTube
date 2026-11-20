# Assessment Design — Practical SOC Competency

## What counts as course completion

- Module completion: all 4 lesson notes, watched assigned video demonstrations, submitted module lab evidence and a knowledge check (2/3 correct).
- Midterm (after Module 15): use supplied synthetic auth, DNS and HTTP logs to propose a correlating Splunk search and write a 1-page L1 triage report.
- Final (Module 30): complete cross-platform investigation and detection validation. No real attacks are necessary.
- **Pass rule:** completion of at least 24/30 modules including Modules 1–5, 8–9, 13–14, 19–24 and 30; at least 70/100 on final; minimum 12/20 for the safety/evidence subcriterion. A learner aiming at a job should target all 30 and 85+/100.

## Module performance rubric (20 points)

| Criterion | Points | Scoring expectation |
|---|---:|---|
| Evidence quality | 5 | Screenshots/saved query, timestamps, source, documented gaps |
| Query/analysis correctness | 5 | Correct filters, aggregation, explicit schema/time context |
| Triage reasoning | 4 | Supports conclusion with observed evidence; considers alternative explanations |
| Communication | 3 | Clear finding, impact, scope, action, follow-up |
| Safety and reproducibility | 3 | Authorized data only, no real-world attack, repeatable process |

Recommended module pass: 14/20 and no critical safety failure.

## Final capstone rubric (100 points)

| Dimension | Points |
|---|---:|
| Telemetry inventory, parsing and time handling | 15 |
| SPL and KQL analytical correctness (at least 2 queries each) | 20 |
| Multi-source incident timeline and confidence statements | 15 |
| Detection logic, positive/negative test cases and false positives | 20 |
| MITRE ATT&CK mapping linked to observed evidence | 10 |
| Safety, reproducibility, data handling and limits | 10 |
| L1 handoff, reporting clarity and prioritized actions | 10 |

**Final submission**: `capstone-report.md` with Executive Summary, Data Sources, Findings, Timeline, SPL Queries, KQL Queries, Detection Tests, False Positives, ATT&CK Mapping, Limitations, Recommended Escalation, and Sources.

## Academic integrity and AI assistance

- Learners may use AI for explanation or debugging but must verify the output on actual provided logs, explain each query and declare AI help in the report.
- Do not invent screenshots, tool output, incident indicators or evidence.
- Student-facing tasks contain **no secret answer key**. Reviewers should grade claims by checking that queries and data support them.
- Video length alone does not establish competency; assess actual investigations.

## Suggested interview readiness checkpoint

Answer: difference between alert and incident; typical Windows authentication IDs; SPL `stats` vs `timechart`; KQL `summarize` and `join`; triage false positives; data ingestion and failed connector; risk scoring; MITRE mapping; how to escalate an incident. Demonstrate two capstone queries from memory and explain their limitations.
