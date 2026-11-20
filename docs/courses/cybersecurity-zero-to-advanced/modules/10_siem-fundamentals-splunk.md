# Module 10 — SIEM Fundamentals: Splunk

**Track:** SOC Core  
**Estimated study workload:** 16 hours  
**Level:** Intermediate  
**Prerequisite:** Module 09; revisit earlier gaps as needed  
**Delivery:** Free YouTube video + official free reference + bounded practical lab + knowledge check.  
**Completion evidence:** Splunk search notebook and detection spec.

## Learning outcomes
By the end of this module you should be able to:
- Explain or demonstrate **SPL search and filtering** in a security-investigation context.
- Explain or demonstrate **field extraction** in a security-investigation context.
- Explain or demonstrate **time bins and stats** in a security-investigation context.
- Explain or demonstrate **dashboards and alert logic** in a security-investigation context.
- Explain or demonstrate **investigation workflow** in a security-investigation context.

## YouTube video course

1. **Confirmed direct YouTube resource:** [Professor Messer — Complete Security+ SY0-701 (121-video playlist)](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv). Use this as the main video foundation where the topic is covered.
2. **Module-targeted YouTube video discovery:** [Find videos: Splunk beginner SIEM SOC analyst full course SPL](https://www.youtube.com/results?search_query=Splunk%20beginner%20SIEM%20SOC%20analyst%20full%20course%20SPL). This is a **YouTube search**, not a verified curated playlist; select an appropriate current walkthrough and check creator, date, accuracy and safe lab scope before studying.
3. **Verified general security video backbone:** [Professor Messer Security+ full playlist](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv) — use relevant sections rather than replaying unrelated lessons.

## Lesson-by-lesson syllabus

### Lesson 10.1 — Spl Search And Filtering
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 10.2 — Field Extraction
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 10.3 — Time Bins And Stats
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 10.4 — Dashboards And Alert Logic
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 10.5 — Investigation Workflow
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

## Free references and labs
- [Splunk Education](https://education.splunk.com/)
- [Splunk Search Manual](https://docs.splunk.com/Documentation/Splunk/latest/Search/GetstartedwithSearch)

## Guided hands-on lab (authorized environments only)

**Scenario:** Import synthetic failed-login CSV into a local evaluation/free setup where permitted; summarize users and source IPs and document a detection.

**Preparation:** Use a disposable virtual machine, synthetic logs, or the provider's sanctioned training environment. Take a VM snapshot first. Do not scan public systems, test accounts you do not own, deploy live malware, or use real credentials.

**Workflow:**
1. Write the objective and a brief scope statement, including owned hosts and permitted data.
2. Capture a clean baseline or load safe sample data; record time zone and source.
3. Complete the scenario using the relevant documented tools, recording each observation.
4. Separate facts from assumptions, benign explanations from malicious indicators, and confirmed from unconfirmed findings.
5. Recommend detection, mitigation, containment or escalation as appropriate; do not take destructive action.
6. Produce the required evidence artifact: **Splunk search notebook and detection spec**. Remove tokens, personal identifiers and secrets before sharing.

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
- Link onward to Module 11 after the learner passes.

## Exit checklist
- [ ] Watched relevant cybersecurity video lesson(s)
- [ ] Read at least one primary source
- [ ] Practiced all learning outcomes
- [ ] Completed lab within explicit scope
- [ ] Submitted splunk search notebook and detection spec
- [ ] Scored at least 80/100
