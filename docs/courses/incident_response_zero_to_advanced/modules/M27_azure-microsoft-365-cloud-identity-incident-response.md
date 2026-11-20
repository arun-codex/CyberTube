# Module 27: Azure / Microsoft 365 Cloud & Identity Incident Response

**Phase:** 5 — Advanced Cloud and Enterprise DFIR  
**Target level:** Advanced  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M26 (relevant concepts)  
**Module mastery goal:** Correlate a cloud-account takeover across at least two audit sources.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [From Alert Triage to Incident Response with Microsoft Sentinel — Koenig Solutions](https://www.youtube.com/watch?v=5J1qLKbXGBo)
2. **Secondary direct watch:** [SOC Process Framework: Analytical Processes — Microsoft Community](https://www.youtube.com/watch?v=pgcMsv39090)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Azure / Microsoft 365 Cloud & Identity Incident Response videos](https://www.youtube.com/results?search_query=Azure+%2F+Microsoft+365+Cloud+%26+Identity+Incident+Response+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 27.1: Entra sign-ins and audit trails
**Learning objective:** Explain entra sign-ins and audit trails in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 27.2: Microsoft Defender XDR and Sentinel incident context
**Learning objective:** Explain microsoft defender xdr and sentinel incident context in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 27.3: Mailbox and application access investigations
**Learning objective:** Explain mailbox and application access investigations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 27.4: Cross-service evidence retention
**Learning objective:** Explain cross-service evidence retention in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 27.5: Tenant-level containment approvals
**Learning objective:** Explain tenant-level containment approvals in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use hypothetical Entra sign-in and mailbox-audit tables
2. Find unusual consent, new forwarding and sign-in anomalies
3. Draft entity-based Sentinel/KQL search ideas
4. Build a rollback-aware containment/escalation plan

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Correlate a cloud-account takeover across at least two audit sources.

## Free resources (official/free-to-read documentation or optional practice)

- [Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/investigate-incidents)
- [Microsoft Ir](https://learn.microsoft.com/en-us/security/operations/incident-response-overview)

## Knowledge check (write answers in your notes)

1. Describe entra sign-ins and audit trails with a concrete defensive example.
2. What evidence distinguishes a likely attack from a legitimate administrative action in this module?
3. What additional data would you request and why?
4. Under what conditions would you escalate, and to which role?
5. How would you preserve evidence and record uncertainty?

## Reviewer checklist

- [ ] Watched and summarized both direct videos or relevant chapters.
- [ ] Completed all five lesson prompts with original explanations.
- [ ] Executed only safe/authorized activity.
- [ ] Submitted a reproducible lab artifact and evidence/source references.
- [ ] Assigned an evidence-based verdict with limitations and escalation reasoning.
- [ ] Checked content against current NIST Rev 3 guidance.

**Next:** Module 28
