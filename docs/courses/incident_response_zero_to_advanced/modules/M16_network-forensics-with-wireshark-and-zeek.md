# Module 16: Network Forensics with Wireshark and Zeek

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M15 (relevant concepts)  
**Module mastery goal:** Find three network anomalies and articulate what the capture cannot tell you.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Incident Response Network Forensics: Wireshark PCAP — BlackPerl](https://www.youtube.com/watch?v=ygtTDz3X8BQ)
2. **Secondary direct watch:** [Everything Everywhere All at Once: Alert Triage — RSA Conference](https://www.youtube.com/watch?v=W7I-2Nv71PY)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Network Forensics with Wireshark and Zeek videos](https://www.youtube.com/results?search_query=Network+Forensics+with+Wireshark+and+Zeek+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 16.1: PCAP integrity and extraction safety
**Learning objective:** Explain pcap integrity and extraction safety in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 16.2: Display filters and stream reconstruction
**Learning objective:** Explain display filters and stream reconstruction in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 16.3: DNS, TLS metadata, HTTP and SMB
**Learning objective:** Explain dns, tls metadata, http and smb in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 16.4: Beaconing patterns and timing limits
**Learning objective:** Explain beaconing patterns and timing limits in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 16.5: Network evidence and endpoint correlation
**Learning objective:** Explain network evidence and endpoint correlation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use a safe PCAP in a disposable offline analysis VM; malicious captures may embed risky payloads
2. Calculate the capture SHA-256 and record provenance
3. List suspicious flows with start/end times and service
4. Cross-reference with fictitious endpoint events and note uncertainty

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Find three network anomalies and articulate what the capture cannot tell you.

## Free resources (official/free-to-read documentation or optional practice)

- [Wireshark](https://www.wireshark.org/docs/)
- [Zeek](https://docs.zeek.org/en/current/)

## Knowledge check (write answers in your notes)

1. Describe pcap integrity and extraction safety with a concrete defensive example.
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

**Next:** Module 17
