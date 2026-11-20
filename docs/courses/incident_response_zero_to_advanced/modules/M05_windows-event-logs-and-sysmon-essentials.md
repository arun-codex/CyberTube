# Module 05: Windows Event Logs and Sysmon Essentials

**Phase:** 1 — Foundations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M04 (relevant concepts)  
**Module mastery goal:** Build a correct five-event authentication/process timeline with cited event fields.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Windows Event Logs: The 7 Things a SOC Analyst Reads — Infosec Wizard](https://www.youtube.com/watch?v=5FVjQhjj80s)
2. **Secondary direct watch:** [Introduction to Windows Forensics — 13Cubed](https://www.youtube.com/watch?v=VYROU-ZwZX8)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Windows Event Logs and Sysmon Essentials videos](https://www.youtube.com/results?search_query=Windows+Event+Logs+and+Sysmon+Essentials+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 05.1: Security, System, Application and PowerShell channels
**Learning objective:** Explain security, system, application and powershell channels in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 05.2: Event IDs 4624, 4625, 4688, 4720, 4728
**Learning objective:** Explain event ids 4624, 4625, 4688, 4720, 4728 in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 05.3: Sysmon 1, 3, 7, 11 and 22 (configuration-dependent)
**Learning objective:** Explain sysmon 1, 3, 7, 11 and 22 (configuration-dependent) in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 05.4: Parent-child process relationships
**Learning objective:** Explain parent-child process relationships in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 05.5: Event collection limitations and baselines
**Learning objective:** Explain event collection limitations and baselines in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. On an owned Windows VM, open Event Viewer and document logging channels
2. Use generated/authorized sample events for a failed-login timeline
3. Identify account, Logon Type, host, and source if present
4. Write which fields alone cannot confirm malicious activity

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Build a correct five-event authentication/process timeline with cited event fields.

## Free resources (official/free-to-read documentation or optional practice)

- [Sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)
- [Microsoft Windows](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/basic-audit-logon-events)

## Knowledge check (write answers in your notes)

1. Describe security, system, application and powershell channels with a concrete defensive example.
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

**Next:** Module 06
