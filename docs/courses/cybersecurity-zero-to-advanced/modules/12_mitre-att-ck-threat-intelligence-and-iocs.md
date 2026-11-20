# Module 12 — MITRE ATT&CK, Threat Intelligence and IOCs

**Track:** SOC Core  
**Estimated study workload:** 13 hours  
**Level:** Intermediate  
**Prerequisite:** Module 11; revisit earlier gaps as needed  
**Delivery:** Free YouTube video + official free reference + bounded practical lab + knowledge check.  
**Completion evidence:** ATT&CK technique map.

## Learning outcomes
By the end of this module you should be able to:
- Explain or demonstrate **tactics techniques subtechniques** in a security-investigation context.
- Explain or demonstrate **IOC reliability and expiry** in a security-investigation context.
- Explain or demonstrate **intel source confidence** in a security-investigation context.
- Explain or demonstrate **campaign mapping** in a security-investigation context.
- Explain or demonstrate **ATT&CK-guided detection gaps** in a security-investigation context.

## YouTube video course

1. **Confirmed direct YouTube resource:** [Professor Messer — Complete Security+ SY0-701 (121-video playlist)](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv). Use this as the main video foundation where the topic is covered.
2. **Module-targeted YouTube video discovery:** [Find videos: MITRE ATTACK framework SOC analyst threat intelligence tutorial](https://www.youtube.com/results?search_query=MITRE%20ATTACK%20framework%20SOC%20analyst%20threat%20intelligence%20tutorial). This is a **YouTube search**, not a verified curated playlist; select an appropriate current walkthrough and check creator, date, accuracy and safe lab scope before studying.
3. **Verified general security video backbone:** [Professor Messer Security+ full playlist](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv) — use relevant sections rather than replaying unrelated lessons.

## Lesson-by-lesson syllabus

### Lesson 12.1 — Tactics Techniques Subtechniques
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 12.2 — Ioc Reliability And Expiry
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 12.3 — Intel Source Confidence
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 12.4 — Campaign Mapping
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 12.5 — Att&Ck-Guided Detection Gaps
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

## Free references and labs
- [MITRE ATT&CK](https://attack.mitre.org/)
- [MISP Project](https://www.misp-project.org/)

## Guided hands-on lab (authorized environments only)

**Scenario:** Map a public incident report to ATT&CK and record 8 IOCs with confidence and expiration notes.

**Preparation:** Use a disposable virtual machine, synthetic logs, or the provider's sanctioned training environment. Take a VM snapshot first. Do not scan public systems, test accounts you do not own, deploy live malware, or use real credentials.

**Workflow:**
1. Write the objective and a brief scope statement, including owned hosts and permitted data.
2. Capture a clean baseline or load safe sample data; record time zone and source.
3. Complete the scenario using the relevant documented tools, recording each observation.
4. Separate facts from assumptions, benign explanations from malicious indicators, and confirmed from unconfirmed findings.
5. Recommend detection, mitigation, containment or escalation as appropriate; do not take destructive action.
6. Produce the required evidence artifact: **ATT&CK technique map**. Remove tokens, personal identifiers and secrets before sharing.

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
- Link onward to Module 13 after the learner passes.

## Exit checklist
- [ ] Watched relevant cybersecurity video lesson(s)
- [ ] Read at least one primary source
- [ ] Practiced all learning outcomes
- [ ] Completed lab within explicit scope
- [ ] Submitted att&ck technique map
- [ ] Scored at least 80/100
