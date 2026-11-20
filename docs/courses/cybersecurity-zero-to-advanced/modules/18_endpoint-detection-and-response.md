# Module 18 — Endpoint Detection and Response

**Track:** SOC Core  
**Estimated study workload:** 15 hours  
**Level:** Intermediate  
**Prerequisite:** Module 17; revisit earlier gaps as needed  
**Delivery:** Free YouTube video + official free reference + bounded practical lab + knowledge check.  
**Completion evidence:** Endpoint process timeline.

## Learning outcomes
By the end of this module you should be able to:
- Explain or demonstrate **endpoint telemetry and process trees** in a security-investigation context.
- Explain or demonstrate **EDR alert triage** in a security-investigation context.
- Explain or demonstrate **file hashes and command-lines** in a security-investigation context.
- Explain or demonstrate **host isolation decisions** in a security-investigation context.
- Explain or demonstrate **endpoint containment documentation** in a security-investigation context.

## YouTube video course

1. **Confirmed direct YouTube resource:** [Professor Messer — Complete Security+ SY0-701 (121-video playlist)](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv). Use this as the main video foundation where the topic is covered.
2. **Module-targeted YouTube video discovery:** [Find videos: EDR investigation process tree SOC analyst tutorial](https://www.youtube.com/results?search_query=EDR%20investigation%20process%20tree%20SOC%20analyst%20tutorial). This is a **YouTube search**, not a verified curated playlist; select an appropriate current walkthrough and check creator, date, accuracy and safe lab scope before studying.
3. **Verified general security video backbone:** [Professor Messer Security+ full playlist](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv) — use relevant sections rather than replaying unrelated lessons.

## Lesson-by-lesson syllabus

### Lesson 18.1 — Endpoint Telemetry And Process Trees
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 18.2 — Edr Alert Triage
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 18.3 — File Hashes And Command-Lines
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 18.4 — Host Isolation Decisions
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 18.5 — Endpoint Containment Documentation
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

## Free references and labs
- [Microsoft Defender XDR Learn](https://learn.microsoft.com/en-us/defender-xdr/)
- [Sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)

## Guided hands-on lab (authorized environments only)

**Scenario:** Correlate a synthetic process tree with alert events; determine safe escalation and containment recommendations.

**Preparation:** Use a disposable virtual machine, synthetic logs, or the provider's sanctioned training environment. Take a VM snapshot first. Do not scan public systems, test accounts you do not own, deploy live malware, or use real credentials.

**Workflow:**
1. Write the objective and a brief scope statement, including owned hosts and permitted data.
2. Capture a clean baseline or load safe sample data; record time zone and source.
3. Complete the scenario using the relevant documented tools, recording each observation.
4. Separate facts from assumptions, benign explanations from malicious indicators, and confirmed from unconfirmed findings.
5. Recommend detection, mitigation, containment or escalation as appropriate; do not take destructive action.
6. Produce the required evidence artifact: **Endpoint process timeline**. Remove tokens, personal identifiers and secrets before sharing.

## Practice exercises
1. **Recall:** Write plain-English definitions for all five learning topics.
2. **Analyze:** From a sanitized event set, identify three likely indicators, two benign alternatives and the missing evidence.
3. **Explain:** Draft a 150-word SOC analyst note containing observations, confidence, impact and recommended next step.
4. **Extend:** Design one safe improvement to logging, detection, or a prevention control.

## Module assessment (100 points)
- Concepts and accuracy — **25**
- Practical analysis and reproducibility — **35**
- Evidence quality and uncertainty — **20**
- Mitigation and communication — **20**

**Pass standard:** Target 80/100; all safety/scope requirements must be met. Rework if below threshold. This is a course recommendation, not an external certification rule.

## Instructor / course builder instructions
- Teach all five lessons in order and pre-screen suggested videos.
- Begin with a 5-minute prior-knowledge diagnostic and one realistic but fictional alert.
- Pause for learner notes after each video segment. Use transcripts/captions when available.
- Demonstrate only defensive or consented lab activity. Avoid copying video transcripts into redistributed materials.
- Grade the stated evidence artifact with the four-part rubric; give specific feedback and a corrective exercise.
- Link onward to Module 19 after the learner passes.

## Exit checklist
- [ ] Watched relevant cybersecurity video lesson(s)
- [ ] Read at least one primary source
- [ ] Practiced all learning outcomes
- [ ] Completed lab within explicit scope
- [ ] Submitted endpoint process timeline
- [ ] Scored at least 80/100
