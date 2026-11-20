# Module 20 — Web Application Security and OWASP Top 10

**Track:** Security Engineering  
**Estimated study workload:** 18 hours  
**Level:** Intermediate  
**Prerequisite:** Module 19; revisit earlier gaps as needed  
**Delivery:** Free YouTube video + official free reference + bounded practical lab + knowledge check.  
**Completion evidence:** Web finding report.

## Learning outcomes
By the end of this module you should be able to:
- Explain or demonstrate **HTTP request/response security** in a security-investigation context.
- Explain or demonstrate **injection and access-control flaws** in a security-investigation context.
- Explain or demonstrate **authentication and session flaws** in a security-investigation context.
- Explain or demonstrate **secure coding guidance** in a security-investigation context.
- Explain or demonstrate **testing boundaries and reporting** in a security-investigation context.

## YouTube video course

1. **Confirmed direct YouTube resource:** [Professor Messer — Complete Security+ SY0-701 (121-video playlist)](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv). Use this as the main video foundation where the topic is covered.
2. **Module-targeted YouTube video discovery:** [Find videos: OWASP top 10 web application security beginners full course](https://www.youtube.com/results?search_query=OWASP%20top%2010%20web%20application%20security%20beginners%20full%20course). This is a **YouTube search**, not a verified curated playlist; select an appropriate current walkthrough and check creator, date, accuracy and safe lab scope before studying.
3. **Verified general security video backbone:** [Professor Messer Security+ full playlist](https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv) — use relevant sections rather than replaying unrelated lessons.

## Lesson-by-lesson syllabus

### Lesson 20.1 — Http Request/Response Security
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 20.2 — Injection And Access-Control Flaws
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 20.3 — Authentication And Session Flaws
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 20.4 — Secure Coding Guidance
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

### Lesson 20.5 — Testing Boundaries And Reporting
- **Watch:** Select the matching chapter in the linked video course, or a targeted video from the YouTube topic search.
- **Read:** Use the official references below to confirm terminology and current recommended practices.
- **Make notes:** Define the concept, show a benign example, identify attacker/defender implications, and explain at least one prevention or detection control.
- **Check your understanding:** What evidence would confirm this condition? What could create a false positive? What is the safe next analyst action?

## Free references and labs
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Guided hands-on lab (authorized environments only)

**Scenario:** Use deliberately vulnerable training apps on an isolated lab to observe an authorization mistake and document remediation; avoid public targets.

**Preparation:** Use a disposable virtual machine, synthetic logs, or the provider's sanctioned training environment. Take a VM snapshot first. Do not scan public systems, test accounts you do not own, deploy live malware, or use real credentials.

**Workflow:**
1. Write the objective and a brief scope statement, including owned hosts and permitted data.
2. Capture a clean baseline or load safe sample data; record time zone and source.
3. Complete the scenario using the relevant documented tools, recording each observation.
4. Separate facts from assumptions, benign explanations from malicious indicators, and confirmed from unconfirmed findings.
5. Recommend detection, mitigation, containment or escalation as appropriate; do not take destructive action.
6. Produce the required evidence artifact: **Web finding report**. Remove tokens, personal identifiers and secrets before sharing.

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
- Link onward to Module 21 after the learner passes.

## Exit checklist
- [ ] Watched relevant cybersecurity video lesson(s)
- [ ] Read at least one primary source
- [ ] Practiced all learning outcomes
- [ ] Completed lab within explicit scope
- [ ] Submitted web finding report
- [ ] Scored at least 80/100
