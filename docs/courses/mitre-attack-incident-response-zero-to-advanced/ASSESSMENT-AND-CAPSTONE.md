# Proposed Assessment and Final Capstone

> Draft design for self-study or instructor approval; scores, pass rule, workload and AI-use policy are **not yet institutionally approved**.

## Continuous module assessment
Each module: technical accuracy 5; evidence and chronology 5; ATT&CK map quality 4; authorized IR decisions and safety 4; communication 2 = 20 points. Suggested formative target 14/20 and no serious safety or evidence-integrity violation. Remediate weak dimensions through annotated resubmission; do not penalize responsible uncertainty.

## Stage checkpoints
- Modules 1–6: ATT&CK terminology quiz and short evidence mapping; explain why mapping ≠ attribution.
- Modules 7–13: prepare an incident runbook and a Windows/Linux/network multi-log timeline.
- Modules 14–20: analyze a simulated intrusion through multiple tactic categories and propose safe containment.
- Modules 21–27: build investigation case notes, forensic artifact summaries, a detection hypothesis and coverage gap matrix.
- Modules 28–30: submit an ATT&CK Navigator layer, recommendations and a final response case.

## Capstone: synthetic incident `TRAIN-CAPSTONE-001`
A fictitious enterprise receives a suspicious email report. Provided training-only artifacts show possible sign-in abuse, user execution, scheduled-task changes, unusual remote access and outbound data movement. The learner must determine **what is actually supported**, not invent definitive actor attribution.

### Required artifact pack
1. Case intake (incident ID, scope, business owner, response authorization and initial hypotheses).
2. Evidence register (source, collection method, UTC time, hash if file present, retained location and analyst).
3. Timeline with linked source references, uncertain events marked, and normalized UTC.
4. ATT&CK mapping table with version `Enterprise v20.1`, mapping confidence, alternative explanation and analytic/detection ideas.
5. Triage report with severity rationale and affected-system inventory.
6. Written options for isolate/disable/reset/block with approval requirements and potential operational impact.
7. Recovery acceptance checklist and post-incident improvement backlog.
8. Navigator layer JSON and a 1-page executive communication.

### Capstone scoring (100 points, proposed)
| Criterion | Points |
|---|---:|
| Technical identification and explanation | 20 |
| Evidence integrity, traceability and time correlation | 20 |
| Specific and defensible ATT&CK mapping | 15 |
| IR decisions including business impacts and authorization | 20 |
| Detection coverage and practical improvements | 15 |
| Clarity, transparency and audience-appropriate report | 10 |

**Proposed completion benchmark:** at least 70/100 and no serious unauthorized action or fabricated evidence. Not a certification or guarantee of job readiness. Learners who cannot run VMs may analyze provided data tables and screenshots with equivalent evaluation.

## AI and authorship
If used, AI is limited to optional coaching/critique, not an authoritative source, autonomous incident responder or evidence generator. Require learner-authored claims with primary source references, a simple AI-use declaration and an oral follow-up where necessary. Never expose real customer data to external tools without policy authorization.

## Instructor validation checklist
Confirm assessment rules locally; run sample grading on two different but defensible conclusions; verify content accessibility; review security and data rights; test module workload; audit every video and online lab before release.
