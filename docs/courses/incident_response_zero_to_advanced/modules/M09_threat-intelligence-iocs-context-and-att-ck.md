# Module 09: Threat Intelligence, IOCs, Context and ATT&CK

**Phase:** 2 — Triage and SOC Operations  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M08 (relevant concepts)  
**Module mastery goal:** Provide evidence-qualified IOC/TTP reasoning rather than asserting attribution.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [SOC Process Framework: Analytical Processes — Microsoft Community](https://www.youtube.com/watch?v=pgcMsv39090)
2. **Secondary direct watch:** [Phishing in Action: Analyzing a Phishing Email — EvilSec](https://www.youtube.com/watch?v=C6t5Db-kSiQ)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Threat Intelligence, IOCs, Context and ATT&CK videos](https://www.youtube.com/results?search_query=Threat+Intelligence%2C+IOCs%2C+Context+and+ATT%26CK+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 09.1: IOC versus behavior-based TTP
**Learning objective:** Explain ioc versus behavior-based ttp in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 09.2: MITRE ATT&CK tactics and technique mapping
**Learning objective:** Explain mitre att&ck tactics and technique mapping in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 09.3: IP/domain/hash reputation limitations
**Learning objective:** Explain ip/domain/hash reputation limitations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 09.4: Confidence, provenance and expiry
**Learning objective:** Explain confidence, provenance and expiry in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 09.5: Safe enrichment without executing samples
**Learning objective:** Explain safe enrichment without executing samples in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. For three known harmless test indicators, annotate source and confidence
2. Map a phishing scenario to relevant ATT&CK techniques
3. List false-positive risks when using reputation sites
4. Create a simple IOC table without sharing private internal data

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Provide evidence-qualified IOC/TTP reasoning rather than asserting attribution.

## Free resources (official/free-to-read documentation or optional practice)

- [Mitre](https://attack.mitre.org/)
- [Virus Total](https://docs.virustotal.com/)

## Knowledge check (write answers in your notes)

1. Describe ioc versus behavior-based ttp with a concrete defensive example.
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

**Next:** Module 10
