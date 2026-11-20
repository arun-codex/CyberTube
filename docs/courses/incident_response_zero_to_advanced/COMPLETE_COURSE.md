# Complete Incident Response Course: 30 Modules

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.


---

# Module 01: Incident Response Fundamentals & SOC Analyst Roles

**Phase:** 1 — Foundations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** None  
**Module mastery goal:** Classify 3 alerts without confusing an unverified event for confirmed compromise.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [NIST Incident Response Plan Step by Step — Hired In IT](https://www.youtube.com/watch?v=ugRlyWj-9SI)
2. **Secondary direct watch:** [CISA Incident Response Playbook: Overview — Exterro](https://www.youtube.com/watch?v=gWXgChC9ANg)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Incident Response Fundamentals & SOC Analyst Roles videos](https://www.youtube.com/results?search_query=Incident+Response+Fundamentals+%26+SOC+Analyst+Roles+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 01.1: Security events versus incidents
**Learning objective:** Explain security events versus incidents in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 01.2: SOC L1/L2/L3 and CSIRT roles
**Learning objective:** Explain soc l1/l2/l3 and csirt roles in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 01.3: Alert → ticket → investigation → decision workflow
**Learning objective:** Explain alert → ticket → investigation → decision workflow in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 01.4: False positive/true positive/benign positive
**Learning objective:** Explain false positive/true positive/benign positive in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 01.5: Defensive authorization and reporting boundaries
**Learning objective:** Explain defensive authorization and reporting boundaries in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Draft one-page roles-and-responsibilities chart for a fictitious 50-user company
2. Create three mock alerts: suspicious login, malware detection, harmless admin activity
3. Categorize each and explain what evidence is still needed
4. Write one shift-handoff note with unresolved questions

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Classify 3 alerts without confusing an unverified event for confirmed compromise.

## Free resources (official/free-to-read documentation or optional practice)

- [Nist](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [Cisa Training](https://www.cisa.gov/resources-tools/programs/incident-response-training)

## Knowledge check (write answers in your notes)

1. Describe security events versus incidents with a concrete defensive example.
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

**Next:** Module 02


---

# Module 02: Modern IR Frameworks, NIST SP 800-61r3 and CISA

**Phase:** 1 — Foundations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M01 (relevant concepts)  
**Module mastery goal:** Explain the current NIST framework and map legacy phase labels without claiming they are the same publication.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Incident Response Strategy Blueprint — Nexiform](https://www.youtube.com/watch?v=yQA0Tr62K0k)
2. **Secondary direct watch:** [Incident Response, Forensics and Chain of Custody — it-learn](https://www.youtube.com/watch?v=TAqJ3LkVjyc)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Modern IR Frameworks, NIST SP 800-61r3 and CISA videos](https://www.youtube.com/results?search_query=Modern+IR+Frameworks%2C+NIST+SP+800-61r3+and+CISA+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 02.1: NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover
**Learning objective:** Explain nist csf 2.0: govern, identify, protect, detect, respond, recover in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 02.2: How 2025 Rev 3 differs from withdrawn Rev 2
**Learning objective:** Explain how 2025 rev 3 differs from withdrawn rev 2 in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 02.3: CISA operational playbook and PICERL as teaching models
**Learning objective:** Explain cisa operational playbook and picerl as teaching models in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 02.4: Business impact and evidence-based decisions
**Learning objective:** Explain business impact and evidence-based decisions in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 02.5: IR lifecycle feedback loops
**Learning objective:** Explain ir lifecycle feedback loops in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Draw Rev 3-to-PICERL mapping with different purposes clearly marked
2. Use a simulated phishing incident to list decisions at every phase
3. Find the authority/approval needed for containment
4. Explain why the older videos use Rev 2 terminology

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Explain the current NIST framework and map legacy phase labels without claiming they are the same publication.

## Free resources (official/free-to-read documentation or optional practice)

- [Nist](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [Cisa](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)

## Knowledge check (write answers in your notes)

1. Describe nist csf 2.0: govern, identify, protect, detect, respond, recover with a concrete defensive example.
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

**Next:** Module 03


---

# Module 03: Computer Networks and Evidence for Incident Responders

**Phase:** 1 — Foundations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M02 (relevant concepts)  
**Module mastery goal:** Extract five defensible network observations with timestamps and explain gaps.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Incident Response Network Forensics: Wireshark PCAP — BlackPerl](https://www.youtube.com/watch?v=ygtTDz3X8BQ)
2. **Secondary direct watch:** [Everything Everywhere All at Once: Alert Triage — RSA Conference](https://www.youtube.com/watch?v=W7I-2Nv71PY)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Computer Networks and Evidence for Incident Responders videos](https://www.youtube.com/results?search_query=Computer+Networks+and+Evidence+for+Incident+Responders+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 03.1: IP, ports, DNS, DHCP, HTTP(S), SMTP
**Learning objective:** Explain ip, ports, dns, dhcp, http(s), smtp in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 03.2: What routers/firewalls/proxies can and cannot prove
**Learning objective:** Explain what routers/firewalls/proxies can and cannot prove in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 03.3: Timestamp, timezone, source/destination fields
**Learning objective:** Explain timestamp, timezone, source/destination fields in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 03.4: Flows versus packet captures
**Learning objective:** Explain flows versus packet captures in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 03.5: Normal activity versus suspicious indicators
**Learning objective:** Explain normal activity versus suspicious indicators in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use a publicly provided training PCAP only (never live third-party capture)
2. Record 5-tuple, DNS query and HTTP host where available
3. Identify limitations introduced by encryption
4. Create a short network-evidence table and possible next pivots

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Extract five defensible network observations with timestamps and explain gaps.

## Free resources (official/free-to-read documentation or optional practice)

- [Wireshark](https://www.wireshark.org/docs/)
- [Zeek](https://docs.zeek.org/en/current/)

## Knowledge check (write answers in your notes)

1. Describe ip, ports, dns, dhcp, http(s), smtp with a concrete defensive example.
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

**Next:** Module 04


---

# Module 04: Linux Logs, Authentication and Live-Response Fundamentals

**Phase:** 1 — Foundations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M03 (relevant concepts)  
**Module mastery goal:** Differentiate normal sudo usage from a suspicious authentication cluster.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Linux Forensics Explained — Techonquer](https://www.youtube.com/watch?v=3xsIst5t23Y)
2. **Secondary direct watch:** [Linux Forensics / DFIR — Satendra Patel](https://www.youtube.com/watch?v=hMXMhArI8UM)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Linux Logs, Authentication and Live-Response Fundamentals videos](https://www.youtube.com/results?search_query=Linux+Logs%2C+Authentication+and+Live-Response+Fundamentals+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 04.1: Linux filesystem locations for evidence
**Learning objective:** Explain linux filesystem locations for evidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 04.2: journalctl, auth logs and auditd concepts
**Learning objective:** Explain journalctl, auth logs and auditd concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 04.3: Users, groups, sudo, SSH and sessions
**Learning objective:** Explain users, groups, sudo, ssh and sessions in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 04.4: Processes, services, timers and cron
**Learning objective:** Explain processes, services, timers and cron in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 04.5: Read-only triage commands and volatility concerns
**Learning objective:** Explain read-only triage commands and volatility concerns in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Inside your own Ubuntu VM, use journalctl and last to inspect login-related events
2. Generate a safe login failure to your own test account
3. Record UTC timestamps, service names and source fields
4. Describe how to preserve a log copy and calculate SHA-256

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Differentiate normal sudo usage from a suspicious authentication cluster.

## Free resources (official/free-to-read documentation or optional practice)

- [Linux Man](https://man7.org/linux/man-pages/)
- [Linux](https://ubuntu.com/tutorials)

## Knowledge check (write answers in your notes)

1. Describe linux filesystem locations for evidence with a concrete defensive example.
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

**Next:** Module 05


---

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


---

# Module 06: Preparation: People, Processes, Systems and Readiness

**Phase:** 1 — Foundations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M05 (relevant concepts)  
**Module mastery goal:** Produce a usable, role-based readiness checklist and approval matrix.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [CISA Incident Response Playbook: Preparation — Justin Tolman](https://www.youtube.com/watch?v=dQokmRh7430)
2. **Secondary direct watch:** [Incident Response Framework — Uplatz DFIR](https://www.youtube.com/watch?v=75y6fdUoIgE)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Preparation: People, Processes, Systems and Readiness videos](https://www.youtube.com/results?search_query=Preparation%3A+People%2C+Processes%2C+Systems+and+Readiness+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 06.1: Incident charter and on-call contacts
**Learning objective:** Explain incident charter and on-call contacts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 06.2: Asset and data classification
**Learning objective:** Explain asset and data classification in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 06.3: Evidence retention and time synchronization
**Learning objective:** Explain evidence retention and time synchronization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 06.4: Communication tree, approvals and access controls
**Learning objective:** Explain communication tree, approvals and access controls in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 06.5: Tabletop exercises and response readiness
**Learning objective:** Explain tabletop exercises and response readiness in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Create a mock contact tree with roles rather than real phone numbers
2. Draft a 1-page incident declaration and severity policy
3. Inventory five essential security data sources and owners
4. Test the plan with a 15-minute simulated lost-laptop scenario

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Produce a usable, role-based readiness checklist and approval matrix.

## Free resources (official/free-to-read documentation or optional practice)

- [Nist Prep](https://csrc.nist.gov/projects/incident-response/preparation-resources)
- [Cisa Tabletop](https://www.cisa.gov/resources-tools/services/cisa-tabletop-exercise-packages)

## Knowledge check (write answers in your notes)

1. Describe incident charter and on-call contacts with a concrete defensive example.
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

**Next:** Module 07


---

# Module 07: Alert Intake, Validation and Fast SOC L1 Triage

**Phase:** 2 — Triage and SOC Operations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M06 (relevant concepts)  
**Module mastery goal:** Complete 3 triage tickets with justifiable outcomes and no unsupported certainty.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Everything Everywhere All at Once: Alert Triage — RSA Conference](https://www.youtube.com/watch?v=W7I-2Nv71PY)
2. **Secondary direct watch:** [From Alert Triage to Incident Response with Microsoft Sentinel — Koenig Solutions](https://www.youtube.com/watch?v=5J1qLKbXGBo)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Alert Intake, Validation and Fast SOC L1 Triage videos](https://www.youtube.com/results?search_query=Alert+Intake%2C+Validation+and+Fast+SOC+L1+Triage+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 07.1: Alert source, rule logic and context
**Learning objective:** Explain alert source, rule logic and context in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 07.2: Validate duplicates, timestamps and host identity
**Learning objective:** Explain validate duplicates, timestamps and host identity in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 07.3: Hypothesis-first triage
**Learning objective:** Explain hypothesis-first triage in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 07.4: False positives and evidentiary confidence
**Learning objective:** Explain false positives and evidentiary confidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 07.5: Decide: close, investigate or escalate
**Learning objective:** Explain decide: close, investigate or escalate in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Open `scenarios/synthetic_alerts.json` and use its three mock alerts
2. List who, what, when, where, why suspicious, evidence missing
3. Enrich the source IP only with passive/approved sources
4. Record verdict with confidence and 3 supporting facts

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Complete 3 triage tickets with justifiable outcomes and no unsupported certainty.

## Free resources (official/free-to-read documentation or optional practice)

- [Cyberdefenders](https://cyberdefenders.org/tracks/soc-analyst-tier-1/)
- [Letsdefend](https://letsdefend.io/)

## Knowledge check (write answers in your notes)

1. Describe alert source, rule logic and context with a concrete defensive example.
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

**Next:** Module 08


---

# Module 08: Incident Severity, Priority, Escalation and SLAs

**Phase:** 2 — Triage and SOC Operations  
**Target level:** Beginner  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M07 (relevant concepts)  
**Module mastery goal:** Explain when an L1 analyst must escalate despite incomplete evidence.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [SOC Process Framework: Operational Escalation — Microsoft Community](https://www.youtube.com/watch?v=J1uUSQTWskU)
2. **Secondary direct watch:** [TheHive Incident Response Case Management — Motasem Hamdan](https://www.youtube.com/watch?v=niuf8nGTzBw)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Incident Severity, Priority, Escalation and SLAs videos](https://www.youtube.com/results?search_query=Incident+Severity%2C+Priority%2C+Escalation+and+SLAs+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 08.1: Priority is not identical to alert rule severity
**Learning objective:** Explain priority is not identical to alert rule severity in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 08.2: Asset criticality, blast radius and active exploitation
**Learning objective:** Explain asset criticality, blast radius and active exploitation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 08.3: Escalation trigger and incident command
**Learning objective:** Explain escalation trigger and incident command in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 08.4: Time-sensitive notifications and shift handoff
**Learning objective:** Explain time-sensitive notifications and shift handoff in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 08.5: Escalation without unauthorized disruption
**Learning objective:** Explain escalation without unauthorized disruption in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Create a 4x4 impact-versus-urgency matrix for a fictional company
2. Assign severity to three fictional events
3. Write an escalation for an administrator account compromise
4. Add the exact requested actions, business risk and approval owner

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Explain when an L1 analyst must escalate despite incomplete evidence.

## Free resources (official/free-to-read documentation or optional practice)

- [Nist](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [Hive](https://docs.strangebee.com/thehive/)

## Knowledge check (write answers in your notes)

1. Describe priority is not identical to alert rule severity with a concrete defensive example.
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

**Next:** Module 09


---

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


---

# Module 10: Case Management and Investigation Documentation

**Phase:** 2 — Triage and SOC Operations  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M09 (relevant concepts)  
**Module mastery goal:** A second analyst can understand what happened, what is unknown and what to do next.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [TheHive Incident Response Case Management — Motasem Hamdan](https://www.youtube.com/watch?v=niuf8nGTzBw)
2. **Secondary direct watch:** [TheHive Project for Beginners — WireDogSec](https://www.youtube.com/watch?v=6AVBPsTWd5A)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Case Management and Investigation Documentation videos](https://www.youtube.com/results?search_query=Case+Management+and+Investigation+Documentation+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 10.1: Incident IDs, timestamps and case ownership
**Learning objective:** Explain incident ids, timestamps and case ownership in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 10.2: Evidence links and artifact provenance
**Learning objective:** Explain evidence links and artifact provenance in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 10.3: Analyst notes versus confirmed facts
**Learning objective:** Explain analyst notes versus confirmed facts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 10.4: Task assignment and handoff etiquette
**Learning objective:** Explain task assignment and handoff etiquette in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 10.5: Final disposition and closure criteria
**Learning objective:** Explain final disposition and closure criteria in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Make a fictitious case using included markdown template
2. Add five timeline entries linked to fabricated evidence IDs
3. Record an open hypothesis and a rejected hypothesis
4. Write an L1-to-L2 handoff that a teammate can continue

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** A second analyst can understand what happened, what is unknown and what to do next.

## Free resources (official/free-to-read documentation or optional practice)

- [Hive](https://docs.strangebee.com/thehive/)
- [Nist Prep](https://csrc.nist.gov/projects/incident-response/preparation-resources)

## Knowledge check (write answers in your notes)

1. Describe incident ids, timestamps and case ownership with a concrete defensive example.
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

**Next:** Module 11


---

# Module 11: SIEM Incident Investigations with Splunk

**Phase:** 2 — Triage and SOC Operations  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M10 (relevant concepts)  
**Module mastery goal:** Write an incident verdict supported by an explicit SIEM search and time window.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [SOC Investigation with Splunk and Sysmon — TryHackMe Walkthrough](https://www.youtube.com/watch?v=CbK9m1MYz6c)
2. **Secondary direct watch:** [Everything Everywhere All at Once: Alert Triage — RSA Conference](https://www.youtube.com/watch?v=W7I-2Nv71PY)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more SIEM Incident Investigations with Splunk videos](https://www.youtube.com/results?search_query=SIEM+Incident+Investigations+with+Splunk+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 11.1: SPL search, indexes and event fields
**Learning objective:** Explain spl search, indexes and event fields in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 11.2: Filter, stats and grouping
**Learning objective:** Explain filter, stats and grouping in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 11.3: Authentication and endpoint correlation
**Learning objective:** Explain authentication and endpoint correlation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 11.4: Deconfliction with benign admin changes
**Learning objective:** Explain deconfliction with benign admin changes in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 11.5: Saved investigative queries and evidence exports
**Learning objective:** Explain saved investigative queries and evidence exports in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Load only synthetic training CSV/JSON or vendor sample data
2. Filter sample auth failures over a bounded time window
3. Group by user and source, then pivot to success events
4. Capture the query, filters, counts and false-positive explanation

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Write an incident verdict supported by an explicit SIEM search and time window.

## Free resources (official/free-to-read documentation or optional practice)

- [Splunk](https://education.splunk.com/)
- [Cyberdefenders](https://cyberdefenders.org/tracks/soc-analyst-tier-1/)

## Knowledge check (write answers in your notes)

1. Describe spl search, indexes and event fields with a concrete defensive example.
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

**Next:** Module 12


---

# Module 12: Microsoft Sentinel, KQL and Incident Operations

**Phase:** 2 — Triage and SOC Operations  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M11 (relevant concepts)  
**Module mastery goal:** Demonstrate correct query logic and a documented decision trail without requiring a paid cloud subscription.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [From Alert Triage to Incident Response with Microsoft Sentinel — Koenig Solutions](https://www.youtube.com/watch?v=5J1qLKbXGBo)
2. **Secondary direct watch:** [SOC Process Framework: Analytical Processes — Microsoft Community](https://www.youtube.com/watch?v=pgcMsv39090)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Microsoft Sentinel, KQL and Incident Operations videos](https://www.youtube.com/results?search_query=Microsoft+Sentinel%2C+KQL+and+Incident+Operations+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 12.1: Workspace and incident concepts
**Learning objective:** Explain workspace and incident concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 12.2: KQL where, summarize, project, join basics
**Learning objective:** Explain kql where, summarize, project, join basics in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 12.3: Incident entities, alerts and investigation graph
**Learning objective:** Explain incident entities, alerts and investigation graph in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 12.4: Evidence context and analyst comments
**Learning objective:** Explain evidence context and analyst comments in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 12.5: Automation rules, cost and access boundaries
**Learning objective:** Explain automation rules, cost and access boundaries in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use Microsoft Learn sandbox/sample tables if available; do not enable paid services unintentionally
2. Write a KQL query for suspicious failed sign-ins using sample schema
3. Summarize per IP/account; inspect baseline and duplicates
4. Draft a Sentinel incident comment and next-action note

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Demonstrate correct query logic and a documented decision trail without requiring a paid cloud subscription.

## Free resources (official/free-to-read documentation or optional practice)

- [Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/investigate-incidents)
- [Kql](https://learn.microsoft.com/en-us/kusto/query/)

## Knowledge check (write answers in your notes)

1. Describe workspace and incident concepts with a concrete defensive example.
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

**Next:** Module 13


---

# Module 13: Endpoint Detection, EDR and Sysmon Investigation

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M12 (relevant concepts)  
**Module mastery goal:** Reconstruct an endpoint story using at least two telemetry types.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Windows Event Logs: The 7 Things a SOC Analyst Reads — Infosec Wizard](https://www.youtube.com/watch?v=5FVjQhjj80s)
2. **Secondary direct watch:** [SOC Investigation with Splunk and Sysmon — TryHackMe Walkthrough](https://www.youtube.com/watch?v=CbK9m1MYz6c)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Endpoint Detection, EDR and Sysmon Investigation videos](https://www.youtube.com/results?search_query=Endpoint+Detection%2C+EDR+and+Sysmon+Investigation+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 13.1: EDR detection context and telemetry gaps
**Learning objective:** Explain edr detection context and telemetry gaps in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 13.2: Process tree and command-line context
**Learning objective:** Explain process tree and command-line context in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 13.3: File, registry, network and DNS events
**Learning objective:** Explain file, registry, network and dns events in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 13.4: Persistence indicators and benign administration
**Learning objective:** Explain persistence indicators and benign administration in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 13.5: Remote isolation decisions require authorization
**Learning objective:** Explain remote isolation decisions require authorization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Review synthetic Sysmon process/connection records
2. Identify the parent of a suspicious child process
3. Correlate network connections to the process
4. Write recommended containment with evidence preservation concerns

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Reconstruct an endpoint story using at least two telemetry types.

## Free resources (official/free-to-read documentation or optional practice)

- [Sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)
- [Chainsaw](https://github.com/WithSecureLabs/chainsaw)

## Knowledge check (write answers in your notes)

1. Describe edr detection context and telemetry gaps with a concrete defensive example.
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

**Next:** Module 14


---

# Module 14: Phishing and Email Incident Response

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M13 (relevant concepts)  
**Module mastery goal:** Classify suspicious email with a clear evidence ledger and no unsafe link opening.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Phishing in Action: Analyzing a Phishing Email — EvilSec](https://www.youtube.com/watch?v=C6t5Db-kSiQ)
2. **Secondary direct watch:** [Everything Everywhere All at Once: Alert Triage — RSA Conference](https://www.youtube.com/watch?v=W7I-2Nv71PY)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Phishing and Email Incident Response videos](https://www.youtube.com/results?search_query=Phishing+and+Email+Incident+Response+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 14.1: Sender, authentication and email headers
**Learning objective:** Explain sender, authentication and email headers in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 14.2: Links, redirects, attachment metadata
**Learning objective:** Explain links, redirects, attachment metadata in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 14.3: Safe URL analysis and reputation limits
**Learning objective:** Explain safe url analysis and reputation limits in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 14.4: Account risk and mailbox search scope
**Learning objective:** Explain account risk and mailbox search scope in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 14.5: User notification and containment playbook
**Learning objective:** Explain user notification and containment playbook in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Download only a benign .eml example or use provided synthetic header
2. Parse Received, Reply-To and authentication results
3. Extract URLs as defanged text without visiting suspicious domains
4. Write a user-safe triage decision and SOC ticket

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Classify suspicious email with a clear evidence ledger and no unsafe link opening.

## Free resources (official/free-to-read documentation or optional practice)

- [Cyberchef](https://gchq.github.io/CyberChef/)
- [Urlscan](https://urlscan.io/)

## Knowledge check (write answers in your notes)

1. Describe sender, authentication and email headers with a concrete defensive example.
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

**Next:** Module 15


---

# Module 15: Identity Compromise, Account Takeover and BEC

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M14 (relevant concepts)  
**Module mastery goal:** Separate strong and weak signs of account compromise and propose reversible actions.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [From Alert Triage to Incident Response with Microsoft Sentinel — Koenig Solutions](https://www.youtube.com/watch?v=5J1qLKbXGBo)
2. **Secondary direct watch:** [Phishing in Action: Analyzing a Phishing Email — EvilSec](https://www.youtube.com/watch?v=C6t5Db-kSiQ)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Identity Compromise, Account Takeover and BEC videos](https://www.youtube.com/results?search_query=Identity+Compromise%2C+Account+Takeover+and+BEC+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 15.1: Sign-in anomalies and impossible-travel pitfalls
**Learning objective:** Explain sign-in anomalies and impossible-travel pitfalls in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 15.2: MFA and session security concepts
**Learning objective:** Explain mfa and session security concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 15.3: Inbox rules, app consent and forwarding evidence
**Learning objective:** Explain inbox rules, app consent and forwarding evidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 15.4: Privilege changes and lateral identity impact
**Learning objective:** Explain privilege changes and lateral identity impact in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 15.5: Revocation/reset approvals and communications
**Learning objective:** Explain revocation/reset approvals and communications in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Analyze a fictional sign-in table containing 4 countries and multiple devices
2. Explain a plausible VPN false positive
3. Identify account/tenant evidence required before action
4. Prepare a containment recommendation for security/identity team approval

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Separate strong and weak signs of account compromise and propose reversible actions.

## Free resources (official/free-to-read documentation or optional practice)

- [Microsoft Ir](https://learn.microsoft.com/en-us/security/operations/incident-response-overview)
- [Mitre](https://attack.mitre.org/)

## Knowledge check (write answers in your notes)

1. Describe sign-in anomalies and impossible-travel pitfalls with a concrete defensive example.
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

**Next:** Module 16


---

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


---

# Module 17: Windows Forensic Artifacts and Timeline Reconstruction

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M16 (relevant concepts)  
**Module mastery goal:** Produce a UTC timeline with 6 artifact-backed entries.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Introduction to Windows Forensics — 13Cubed](https://www.youtube.com/watch?v=VYROU-ZwZX8)
2. **Secondary direct watch:** [Windows Event Logs: The 7 Things a SOC Analyst Reads — Infosec Wizard](https://www.youtube.com/watch?v=5FVjQhjj80s)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Windows Forensic Artifacts and Timeline Reconstruction videos](https://www.youtube.com/results?search_query=Windows+Forensic+Artifacts+and+Timeline+Reconstruction+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 17.1: Prefetch, Amcache, ShimCache overview
**Learning objective:** Explain prefetch, amcache, shimcache overview in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 17.2: LNK, Jump Lists and user activity
**Learning objective:** Explain lnk, jump lists and user activity in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 17.3: Registry persistence and startup locations
**Learning objective:** Explain registry persistence and startup locations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 17.4: Event logs, Sysmon and chronology
**Learning objective:** Explain event logs, sysmon and chronology in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 17.5: Artifact interpretation caveats
**Learning objective:** Explain artifact interpretation caveats in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use 13Cubed examples or an intentionally prepared Windows VM image
2. Extract training artifact timestamps and normalize to UTC
3. Correlate 3 independent artifacts for one hypothesis
4. Write what each artifact proves and does not prove

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Produce a UTC timeline with 6 artifact-backed entries.

## Free resources (official/free-to-read documentation or optional practice)

- [Forensic Cheats](https://training.13cubed.com/downloads)
- [Eric](https://ericzimmerman.github.io/)

## Knowledge check (write answers in your notes)

1. Describe prefetch, amcache, shimcache overview with a concrete defensive example.
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

**Next:** Module 18


---

# Module 18: Disk Imaging, Hashing and Autopsy

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M17 (relevant concepts)  
**Module mastery goal:** Verify evidence integrity and avoid modifying source media.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Digital Forensics with Autopsy: Practical Tutorial — Hackavis](https://www.youtube.com/watch?v=gWclBdzBzDM)
2. **Secondary direct watch:** [Incident Response, Forensics and Chain of Custody — it-learn](https://www.youtube.com/watch?v=TAqJ3LkVjyc)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Disk Imaging, Hashing and Autopsy videos](https://www.youtube.com/results?search_query=Disk+Imaging%2C+Hashing+and+Autopsy+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 18.1: Forensic copy versus working copy
**Learning objective:** Explain forensic copy versus working copy in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 18.2: Hash verification, write blockers and chain of custody
**Learning objective:** Explain hash verification, write blockers and chain of custody in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 18.3: Filesystem metadata and deleted-file caveats
**Learning objective:** Explain filesystem metadata and deleted-file caveats in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 18.4: Autopsy indexing and artifact review
**Learning objective:** Explain autopsy indexing and artifact review in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 18.5: Preserve originals and record transformations
**Learning objective:** Explain preserve originals and record transformations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use a course-generated test image or publicly released training image
2. Record acquisition source, time, SHA-256 and storage path
3. Open the verified copy read-only in Autopsy
4. Export an investigator findings summary with evidence IDs

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Verify evidence integrity and avoid modifying source media.

## Free resources (official/free-to-read documentation or optional practice)

- [Autopsy](https://www.autopsy.com/support/documentation/)
- [Sleuthkit](https://www.sleuthkit.org/)

## Knowledge check (write answers in your notes)

1. Describe forensic copy versus working copy with a concrete defensive example.
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

**Next:** Module 19


---

# Module 19: Memory Forensics and Volatility 3

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M18 (relevant concepts)  
**Module mastery goal:** Make a defensible finding without assuming every unfamiliar process is malicious.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Introduction to Memory Forensics with Volatility 3 — DFIRScience](https://www.youtube.com/watch?v=Uk3DEgY5Ue8)
2. **Secondary direct watch:** [Introduction to Windows Forensics — 13Cubed](https://www.youtube.com/watch?v=VYROU-ZwZX8)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Memory Forensics and Volatility 3 videos](https://www.youtube.com/results?search_query=Memory+Forensics+and+Volatility+3+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 19.1: Volatile evidence and collection authorization
**Learning objective:** Explain volatile evidence and collection authorization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 19.2: Process listing versus hidden process indicators
**Learning objective:** Explain process listing versus hidden process indicators in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 19.3: Connections, DLLs and command lines
**Learning objective:** Explain connections, dlls and command lines in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 19.4: Memory artifacts and limitations
**Learning objective:** Explain memory artifacts and limitations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 19.5: Interpretation and corroboration with logs
**Learning objective:** Explain interpretation and corroboration with logs in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use a legally distributed training memory image, not personal device RAM
2. Check its published and calculated hashes when available
3. Run Volatility 3 imageinfo-equivalent identification then pslist/pstree/netscan as supported
4. Create a short timeline of suspicious process relationships

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Make a defensible finding without assuming every unfamiliar process is malicious.

## Free resources (official/free-to-read documentation or optional practice)

- [Volatility](https://volatility3.readthedocs.io/en/latest/)
- [Sans](https://www.sans.org/mlp/start-in-dfir)

## Knowledge check (write answers in your notes)

1. Describe volatile evidence and collection authorization with a concrete defensive example.
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

**Next:** Module 20


---

# Module 20: Evidence Correlation, Root Cause and Case Timeline

**Phase:** 3 — Forensic Investigation  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M19 (relevant concepts)  
**Module mastery goal:** Show a corroborated timeline and separate observation from inference.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Incident Response, Forensics and Chain of Custody — it-learn](https://www.youtube.com/watch?v=TAqJ3LkVjyc)
2. **Secondary direct watch:** [Digital Forensics with Autopsy: Practical Tutorial — Hackavis](https://www.youtube.com/watch?v=gWclBdzBzDM)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Evidence Correlation, Root Cause and Case Timeline videos](https://www.youtube.com/results?search_query=Evidence+Correlation%2C+Root+Cause+and+Case+Timeline+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 20.1: UTC normalization and clock skew
**Learning objective:** Explain utc normalization and clock skew in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 20.2: Event-source confidence scoring
**Learning objective:** Explain event-source confidence scoring in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 20.3: Causal versus chronological relationships
**Learning objective:** Explain causal versus chronological relationships in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 20.4: Root-cause hypothesis and counterevidence
**Learning objective:** Explain root-cause hypothesis and counterevidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 20.5: Evidence citations and defensible reporting
**Learning objective:** Explain evidence citations and defensible reporting in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Merge supplied synthetic email, sign-in and endpoint data into one UTC sequence
2. Annotate each entry with evidence ID and reliability
3. Write two alternate explanations
4. Summarize likely initial access and remaining gaps

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Show a corroborated timeline and separate observation from inference.

## Free resources (official/free-to-read documentation or optional practice)

- [Plaso](https://plaso.readthedocs.io/en/latest/)
- [Nist](https://csrc.nist.gov/pubs/sp/800/61/r3/final)

## Knowledge check (write answers in your notes)

1. Describe utc normalization and clock skew with a concrete defensive example.
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

**Next:** Module 21


---

# Module 21: Containment: Scope, Approval, Reversibility and Preservation

**Phase:** 4 — Containment, Eradication and Recovery  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M20 (relevant concepts)  
**Module mastery goal:** Recommend least-disruptive, authorized containment matched to severity.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [CISA Incident Response Playbook: Containment — Exterro](https://www.youtube.com/watch?v=MNu4QhM3LJI)
2. **Secondary direct watch:** [From Alert Triage to Incident Response with Microsoft Sentinel — Koenig Solutions](https://www.youtube.com/watch?v=5J1qLKbXGBo)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Containment: Scope, Approval, Reversibility and Preservation videos](https://www.youtube.com/results?search_query=Containment%3A+Scope%2C+Approval%2C+Reversibility+and+Preservation+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 21.1: Containment goals and host/account/network options
**Learning objective:** Explain containment goals and host/account/network options in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 21.2: Emergency versus planned containment
**Learning objective:** Explain emergency versus planned containment in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 21.3: Operational risks and asset dependencies
**Learning objective:** Explain operational risks and asset dependencies in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 21.4: Evidence preservation before change
**Learning objective:** Explain evidence preservation before change in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 21.5: Reassessment and attacker persistence
**Learning objective:** Explain reassessment and attacker persistence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use a tabletop scenario with a suspected compromised finance workstation
2. Compare isolate host, restrict account, block IOC and monitor alternatives
3. Document owner approval and business consequences
4. Write a reversible 30-minute containment plan — simulation only

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Recommend least-disruptive, authorized containment matched to severity.

## Free resources (official/free-to-read documentation or optional practice)

- [Cisa](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)
- [D3Fend](https://d3fend.mitre.org/)

## Knowledge check (write answers in your notes)

1. Describe containment goals and host/account/network options with a concrete defensive example.
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

**Next:** Module 22


---

# Module 22: Eradication, Eviction and Closing Access Paths

**Phase:** 4 — Containment, Eradication and Recovery  
**Target level:** Intermediate  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M21 (relevant concepts)  
**Module mastery goal:** Propose an ordered eradication plan that addresses initial access and persistence.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [CISA Incident Response Playbook: Eradication and Recovery — Justin Tolman](https://www.youtube.com/watch?v=WCr8etx7MxA)
2. **Secondary direct watch:** [Incident Response Framework — Uplatz DFIR](https://www.youtube.com/watch?v=75y6fdUoIgE)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Eradication, Eviction and Closing Access Paths videos](https://www.youtube.com/results?search_query=Eradication%2C+Eviction+and+Closing+Access+Paths+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 22.1: Confirm scope before eradication
**Learning objective:** Explain confirm scope before eradication in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 22.2: Remove persistence and compromised credentials
**Learning objective:** Explain remove persistence and compromised credentials in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 22.3: Patch/configuration remediation as appropriate
**Learning objective:** Explain patch/configuration remediation as appropriate in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 22.4: Validate clean state and missed footholds
**Learning objective:** Explain validate clean state and missed footholds in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 22.5: Avoid premature closure
**Learning objective:** Explain avoid premature closure in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use a fictional malware+account persistence case
2. Create eradication task list assigned to roles (not real staff)
3. Define validation evidence for each change
4. Identify residual risk and monitoring plan

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Propose an ordered eradication plan that addresses initial access and persistence.

## Free resources (official/free-to-read documentation or optional practice)

- [Cisa](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)
- [Microsoft Playbook](https://learn.microsoft.com/en-us/security/operations/incident-response-playbooks)

## Knowledge check (write answers in your notes)

1. Describe confirm scope before eradication with a concrete defensive example.
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

**Next:** Module 23


---

# Module 23: Recovery, Rebuild, Backups and Post-Recovery Monitoring

**Phase:** 4 — Containment, Eradication and Recovery  
**Target level:** Advanced  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M22 (relevant concepts)  
**Module mastery goal:** Demonstrate recovery verification rather than equating availability with safety.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [CISA Incident Response Playbook: Eradication and Recovery — Justin Tolman](https://www.youtube.com/watch?v=WCr8etx7MxA)
2. **Secondary direct watch:** [CISA Incident Response Playbook: Post-Incident Activities — Justin Tolman](https://www.youtube.com/watch?v=ZORnotWe42A)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Recovery, Rebuild, Backups and Post-Recovery Monitoring videos](https://www.youtube.com/results?search_query=Recovery%2C+Rebuild%2C+Backups+and+Post-Recovery+Monitoring+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 23.1: Known-good restore points and trusted images
**Learning objective:** Explain known-good restore points and trusted images in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 23.2: Business acceptance and staged return
**Learning objective:** Explain business acceptance and staged return in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 23.3: Health/security validation and dependency checks
**Learning objective:** Explain health/security validation and dependency checks in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 23.4: Reinfection monitoring and rollback
**Learning objective:** Explain reinfection monitoring and rollback in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 23.5: Recovery communication and documentation
**Learning objective:** Explain recovery communication and documentation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Draft a restore checklist for a fictional affected file server
2. List indicators of successful system and business restoration
3. Design 24-hour and 7-day monitoring checks as a planning exercise
4. Create a sign-off table for technical owner and business owner

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Demonstrate recovery verification rather than equating availability with safety.

## Free resources (official/free-to-read documentation or optional practice)

- [Nist](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [Cisa](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)

## Knowledge check (write answers in your notes)

1. Describe known-good restore points and trusted images with a concrete defensive example.
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

**Next:** Module 24


---

# Module 24: Ransomware Incident Response and Tabletop Exercise

**Phase:** 4 — Containment, Eradication and Recovery  
**Target level:** Advanced  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M23 (relevant concepts)  
**Module mastery goal:** Handle ransomware decisions using approval boundaries and evidence preservation.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [CISA Incident Response Playbook: Containment — Exterro](https://www.youtube.com/watch?v=MNu4QhM3LJI)
2. **Secondary direct watch:** [CISA Incident Response Playbook: Eradication and Recovery — Justin Tolman](https://www.youtube.com/watch?v=WCr8etx7MxA)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Ransomware Incident Response and Tabletop Exercise videos](https://www.youtube.com/results?search_query=Ransomware+Incident+Response+and+Tabletop+Exercise+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 24.1: Recognizing encryption/extortion signals
**Learning objective:** Explain recognizing encryption/extortion signals in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 24.2: Crisis roles, isolation strategy and legal coordination
**Learning objective:** Explain crisis roles, isolation strategy and legal coordination in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 24.3: Impact estimation, scoping and backups
**Learning objective:** Explain impact estimation, scoping and backups in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 24.4: Recovery prioritization and stakeholder updates
**Learning objective:** Explain recovery prioritization and stakeholder updates in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 24.5: Evidence, after-action and detection improvements
**Learning objective:** Explain evidence, after-action and detection improvements in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Run a paper-only tabletop with timed injects from supplied capstone scenario
2. Draft first-15-minute decisions without triggering live disruption
3. Prepare a 120-word executive situation report
4. List follow-up tasks and unknowns for specialists

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Handle ransomware decisions using approval boundaries and evidence preservation.

## Free resources (official/free-to-read documentation or optional practice)

- [Cisa Ransomware](https://www.cisa.gov/stopransomware/ransomware-guide)
- [Cisa Tabletop](https://www.cisa.gov/resources-tools/services/cisa-tabletop-exercise-packages)

## Knowledge check (write answers in your notes)

1. Describe recognizing encryption/extortion signals with a concrete defensive example.
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

**Next:** Module 25


---

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


---

# Module 26: AWS Cloud Incident Response and CloudTrail Evidence

**Phase:** 5 — Advanced Cloud and Enterprise DFIR  
**Target level:** Advanced  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M25 (relevant concepts)  
**Module mastery goal:** Identify cloud principal and risk scope from sample audit events.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Incident Response on AWS: Contain, Eradicate, Recover — Network Intelligence](https://www.youtube.com/watch?v=z2oqdFV1S8Y)
2. **Secondary direct watch:** [Incident Response Planning Basics for AWS — Cybr](https://www.youtube.com/watch?v=jjXdwzEaMwo)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more AWS Cloud Incident Response and CloudTrail Evidence videos](https://www.youtube.com/results?search_query=AWS+Cloud+Incident+Response+and+CloudTrail+Evidence+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 26.1: Shared responsibility and blast radius
**Learning objective:** Explain shared responsibility and blast radius in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 26.2: CloudTrail/GuardDuty/Config log roles
**Learning objective:** Explain cloudtrail/guardduty/config log roles in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 26.3: IAM access-key and role misuse indicators
**Learning objective:** Explain iam access-key and role misuse indicators in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 26.4: Snapshot and isolation concepts
**Learning objective:** Explain snapshot and isolation concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 26.5: Multi-account coordination and cost awareness
**Learning objective:** Explain multi-account coordination and cost awareness in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Use public sanitized CloudTrail examples; no paid account required
2. Identify principal, API name, region, source IP and affected resource
3. Describe least-privilege scoping and key revocation approvals
4. Draft a cloud incident case with evidence and a recovery checklist

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Identify cloud principal and risk scope from sample audit events.

## Free resources (official/free-to-read documentation or optional practice)

- [Aws Ir](https://docs.aws.amazon.com/security-ir/latest/userguide/what-is-security-ir.html)
- [Aws Incident](https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html)

## Knowledge check (write answers in your notes)

1. Describe shared responsibility and blast radius with a concrete defensive example.
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

**Next:** Module 27


---

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


---

# Module 28: Enterprise DFIR with Velociraptor and Threat Hunting

**Phase:** 5 — Advanced Cloud and Enterprise DFIR  
**Target level:** Advanced  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M27 (relevant concepts)  
**Module mastery goal:** Design a scoped hunt that collects only necessary evidence.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [Starting with Velociraptor Incident Response — DFIRScience](https://www.youtube.com/watch?v=EA40rztSOd4)
2. **Secondary direct watch:** [Incident Response Framework — Uplatz DFIR](https://www.youtube.com/watch?v=75y6fdUoIgE)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Enterprise DFIR with Velociraptor and Threat Hunting videos](https://www.youtube.com/results?search_query=Enterprise+DFIR+with+Velociraptor+and+Threat+Hunting+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 28.1: Endpoint fleet visibility and authorization
**Learning objective:** Explain endpoint fleet visibility and authorization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 28.2: Targeted collection versus broad hunts
**Learning objective:** Explain targeted collection versus broad hunts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 28.3: Artifact selection, VQL and data minimization
**Learning objective:** Explain artifact selection, vql and data minimization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 28.4: Hypothesis-driven cross-host searches
**Learning objective:** Explain hypothesis-driven cross-host searches in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 28.5: Preservation, logging and response review
**Learning objective:** Explain preservation, logging and response review in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Run Velociraptor only in a local test VM with your own enrolled client
2. Collect a benign host inventory artifact and record export hashes
3. Define hunt scope, permissions and retention
4. Explain how you would scale to 50 hosts in a simulation

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Design a scoped hunt that collects only necessary evidence.

## Free resources (official/free-to-read documentation or optional practice)

- [Veloci](https://docs.velociraptor.app/)
- [Mitre](https://attack.mitre.org/)

## Knowledge check (write answers in your notes)

1. Describe endpoint fleet visibility and authorization with a concrete defensive example.
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

**Next:** Module 29


---

# Module 29: Playbooks, SOAR, Sigma and Detection Improvement

**Phase:** 5 — Advanced Cloud and Enterprise DFIR  
**Target level:** Advanced  
**Planned learner effort:** 3–5 hours, including research, video and practice  
**Prerequisite:** Modules M01–M28 (relevant concepts)  
**Module mastery goal:** Propose testable automation with approvals and explicit false-positive controls.

> **Defensive/authorized use only.** Work exclusively on owned or explicitly authorized systems, synthetic logs, and freely distributable training images. Do not execute live malware, run destructive actions, or upload sensitive enterprise evidence to public services. Security controls, response approvals and legal notification duties are organization/jurisdiction specific.

> **Current framework:** NIST SP 800-61 Revision 3 (final April 3, 2025) aligns IR with NIST CSF 2.0. Historical PICERL / four-phase terminology in older videos is taught for mapping only; Rev 2 is superseded.

## Required free YouTube video lessons

1. **Primary direct watch:** [SOC Process Framework: Analytical Processes — Microsoft Community](https://www.youtube.com/watch?v=pgcMsv39090)
2. **Secondary direct watch:** [TheHive Project for Beginners — WireDogSec](https://www.youtube.com/watch?v=6AVBPsTWd5A)
3. **Additional topic discovery (YouTube search, NOT a verified video):** [Find more Playbooks, SOAR, Sigma and Detection Improvement videos](https://www.youtube.com/results?search_query=Playbooks%2C+SOAR%2C+Sigma+and+Detection+Improvement+SOC+incident+response+tutorial)

**Video study instructions:** Open the primary watch URL; pause every 5–10 minutes; record the tool, evidence field or analyst judgment demonstrated. Watch the secondary lesson for reinforcement or the relevant chapter. Compare creator guidance to the current NIST reference. Do not attempt live destructive actions shown by others.

## Five detailed lessons

### Lesson 29.1: Playbook trigger, inputs and guardrails
**Learning objective:** Explain playbook trigger, inputs and guardrails in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 29.2: Automate enrichment before destructive actions
**Learning objective:** Explain automate enrichment before destructive actions in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 29.3: Sigma rule structure and tuning
**Learning objective:** Explain sigma rule structure and tuning in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 29.4: Human approval, auditability and rollback
**Learning objective:** Explain human approval, auditability and rollback in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

### Lesson 29.5: Metrics, false-positive rate and response quality
**Learning objective:** Explain metrics, false-positive rate and response quality in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.
**Before watching:** Write what a Tier-1 analyst already knows about this topic and what information would change the decision.
**During video:** Find and note at least one relevant moment, workflow, tool or example (include timestamp only if personally verified).
**After watching:** Write 3–5 sentences describing the source data, analysis method, likely false positive, and escalation trigger.
**Quick check:** What would you collect next, from whom, and what would you avoid assuming?

## Guided practical lab (safe/authorized)

**Scenario:** You are a SOC trainee at fictional **Harborlight Retail**, a company with Windows laptops, Ubuntu servers, Microsoft 365 and an AWS test account. You are allowed to use only synthetic exercise data and your personally owned sandbox.

1. Create a plain-language pseudo-playbook for failed login spikes
2. Write a minimal Sigma-style rule based on synthetic data
3. Add human approval gate before isolate/revoke actions
4. Create 3 negative tests to catch false positives

**Submission instructions:** Use `templates/INCIDENT_CASE_TICKET.md` or `templates/EVIDENCE_REGISTER.md`. Include UTC timestamps where applicable, source filenames/IDs, screenshots or non-sensitive snippets, a justified verdict, unknowns, and recommended next action. Redact personal data.

**Pass standard:** Propose testable automation with approvals and explicit false-positive controls.

## Free resources (official/free-to-read documentation or optional practice)

- [Sigma](https://github.com/SigmaHQ/sigma)
- [Microsoft Playbook](https://learn.microsoft.com/en-us/security/operations/incident-response-playbooks)

## Knowledge check (write answers in your notes)

1. Describe playbook trigger, inputs and guardrails with a concrete defensive example.
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

**Next:** Module 30


---

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

