# Module 30: Final Capstone: End-to-End SOC Incident Response

**Phase:** 6 — Capstone and Job Readiness  
**Target level:** Capstone  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M29 (relevant concepts)  
**Module mastery goal:** Deliver the six capstone artifacts and defend key decisions in a 10-minute briefing.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Incident Response Framework — Uplatz DFIR](https://www.youtube.com/watch?v=75y6fdUoIgE)
2. **Secondary direct watch:** [CISA Incident Response Playbook: Post-Incident Activities — Justin Tolman](https://www.youtube.com/watch?v=ZORnotWe42A)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Final Capstone: End-to-End SOC Incident Response videos](https://www.youtube.com/results?search_query=Final+Capstone%3A+End-to-End+SOC+Incident+Response+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 30.1: Receive alerts and declare investigative scope
**Learning objective:** Explain receive alerts and declare investigative scope in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 30.2: Triage multiple telemetry sources and maintain case notes
**Learning objective:** Explain triage multiple telemetry sources and maintain case notes in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 30.3: Develop timeline, escalation and containment options
**Learning objective:** Explain develop timeline, escalation and containment options in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 30.4: Plan eradication, recovery and validation
**Learning objective:** Explain plan eradication, recovery and validation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 30.5: Report, lessons learned and brief leadership
**Learning objective:** Explain report, lessons learned and brief leadership in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Open the supplied fictional scenario in scenarios/ and the sample mock events
2. Produce an initial triage ticket in 20 simulated minutes
3. Correlate email, sign-ins, Sysmon and web traffic into UTC incident timeline
4. Submit escalation, evidence register, authorized-response proposal and final report

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Deliver the six capstone artifacts and defend key decisions in a 10-minute briefing.

## Free resources (official/free-to-read documentation or optional practice)

- [Nist](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [Cyberdefenders](https://cyberdefenders.org/tracks/soc-analyst-tier-1/)

## Knowledge check (write answers in your notes)

1. Describe receive alerts and declare investigative scope with a concrete defensive example.
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

**Next:** Final assessment and job portfolio.
