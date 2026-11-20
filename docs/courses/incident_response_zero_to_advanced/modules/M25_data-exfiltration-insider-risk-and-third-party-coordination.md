# Module 25: Data Exfiltration, Insider Risk and Third-Party Coordination

**Phase:** 4 — Containment, Eradication and Recovery  
**Target level:** Advanced  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M24 (relevant concepts)  
**Module mastery goal:** Produce an exfiltration risk summary with defensible unknowns and next steps.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [TheHive Incident Response Case Management — Motasem Hamdan](https://www.youtube.com/watch?v=niuf8nGTzBw)
2. **Secondary direct watch:** [Incident Response Network Forensics: Wireshark PCAP — BlackPerl](https://www.youtube.com/watch?v=ygtTDz3X8BQ)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Data Exfiltration, Insider Risk and Third-Party Coordination videos](https://www.youtube.com/results?search_query=Data+Exfiltration%2C+Insider+Risk+and+Third-Party+Coordination+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 25.1: Exfiltration indications and normal transfers
**Learning objective:** Explain exfiltration indications and normal transfers in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 25.2: Network, identity, DLP and cloud logs
**Learning objective:** Explain network, identity, dlp and cloud logs in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 25.3: Data sensitivity and impact scoping
**Learning objective:** Explain data sensitivity and impact scoping in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 25.4: Vendor, legal/privacy and leadership workflows
**Learning objective:** Explain vendor, legal/privacy and leadership workflows in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 25.5: Preservation and uncertainty when content visibility is missing
**Learning objective:** Explain preservation and uncertainty when content visibility is missing in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use synthetic proxy and download logs for fictional employee account
2. Flag unusual transfer patterns while noting legitimate export workflows
3. Create data-impact questions for owner/privacy lead
4. Draft incident notification decision tree without asserting a legal deadline

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Produce an exfiltration risk summary with defensible unknowns and next steps.

## Free resources (official/free-to-read documentation or optional practice)

- [Microsoft Ir](https://learn.microsoft.com/en-us/security/operations/incident-response-overview)
- [Nist](https://csrc.nist.gov/pubs/sp/800/61/r3/final)

## Knowledge check (write answers in your notes)

1. Describe exfiltration indications and normal transfers with a concrete defensive example.
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

**Next:** Module 26
