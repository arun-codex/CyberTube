# Assessment, Feedback and Portfolio Rubric

## Recommended assessment structure (course design recommendation, not an institutional grading policy)

- Module knowledge checks: **20%** (short written responses, 5 per module).
- Safe lab artifacts: **40%** (30 submissions).
- Mid-course triage simulation: **10%** (after M12).
- Capstone incident case: **30%** (M30).

**Suggested learner progression rule:** ≥80/100 overall, all critical evidence-integrity/authorization checks passed, and completion of capstone. This is a recommendation only, not external certification.

## Analytic rubric (100 raw points per substantial lab/capstone)

| Criterion | Points | Excellent evidence | Needs improvement |
|---|---:|---|---|
| Triage & impact decisions | 20 | Correct scope, priority, confidence and business context | Unjustified severity or premature declaration |
| Technical investigation | 25 | Multi-source corroboration, repeatable query/filter steps | Isolated observations or missing query context |
| Evidence handling | 20 | Clear provenance, UTC, hashes where applicable, non-destructive collection | Missing sources, altered original or timestamp confusion |
| Communication & escalation | 15 | Concise status, owners, approvals, next steps and unknowns | Missing owner or unsupported recommendation |
| Response & recovery planning | 10 | Authorized, reversible containment, verification plan | Destructive/unapproved actions or weak validation |
| Reporting & reflection | 10 | Clear facts/inferences, corrections and lessons learned | Ambiguous statements and no improvement actions |
| **Total** | **100** | | |

## Critical fails

- Unauthorized action against a live system.
- Uploading sensitive data or private credentials to public analysis services.
- Treating guessed facts as confirmed evidence.
- Claiming a simulation was a real incident.

## Authenticity

Learner may use video, documentation, automated tools, and AI for brainstorming or checking grammar. For the capstone the learner must personally explain investigative decisions, cite evidence IDs and reproduce one chosen analysis from source data without AI assistance. Do not score polished AI prose as proof of incident-response competence.

## Capstone files required

1. `TRIAGE.md`: initial alert, uncertainty, decision and priority.
2. `TIMELINE.md`: UTC evidence timeline with sources.
3. `EVIDENCE.md`: chain of custody and integrity register.
4. `ESCALATION.md`: audience, impact, actions, approvals, open questions.
5. `RESPONSE_PLAN.md`: containment, eradication, recovery and monitoring.
6. `POST_INCIDENT_REPORT.md`: executive summary, root cause hypothesis, remediation and lessons learned.
