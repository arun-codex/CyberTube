# Module 01 — IoT Security Orientation & Legal Lab Boundaries

**Track:** Foundation  |  **Estimated effort:** 4 hours (including practical work)  |  **Focus:** scope and authorization

**Prerequisite:** None: beginner entry

## Module aim

Build the ability to explain, safely assess and defend **scope and authorization** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.

## Four lessons (ordered)

### 01.01 — How an IoT system differs from conventional IT

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **how an iot system differs from conventional it** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 01.02 — Identify device, gateway, broker, app and cloud attack surfaces

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify device, gateway, broker, app and cloud attack surfaces** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 01.03 — CIA, safety, privacy and physical impact

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **cia, safety, privacy and physical impact** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 01.04 — Rules of engagement, evidence and responsible disclosure

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **rules of engagement, evidence and responsible disclosure** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

## Free YouTube lessons for this module

Each module includes directly identified IoT-focused videos. A video may support multiple lessons; video coverage is not asserted for every subtopic.

- [Introduction to IoT Hacking – 1.1 Getting Started](https://www.youtube.com/watch?v=jY51TKyOq7U) — LufSec (topic-specific introductory video)
- [IoT Security Problems](https://www.youtube.com/watch?v=ijhU66n5Po8) — Engineering Funda (topic-specific)

## Free reference resources

- [OWASP Internet of Things Project](https://owasp.org/projects/internet-of-things)
- [OWASP IoT Security Testing Guide](https://owasp.org/owasp-istg/01_introduction/index.html)

## Guided practical exercise

**Task:** Draw an attack-surface map for a fictional smart camera; label allowed vs forbidden targets.

**Procedure:**

1. Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.
2. Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.
3. Investigate the relevant **scope and authorization** risk and record at least three concrete observations with evidence labels (E1, E2, E3).
4. Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.
5. Propose safer settings or design changes; verify them in the same safe environment when feasible.
6. Record one monitoring/detection idea and its most likely false-positive case.
7. Reset disposable lab state; remove test secrets and archive sanitized evidence.

**Deliverable:** One-page architecture + written lab authorization boundaries.

## Practical acceptance criteria

- [ ] At least one module video watched and accurately credited.
- [ ] All four lesson topics are addressed in written notes.
- [ ] Clear device/data-flow/attack-surface identification.
- [ ] An in-scope, non-destructive or isolated practical exercise completed.
- [ ] Three traceable observations and one limitation documented.
- [ ] One preventive, one detective and one response control proposed.
- [ ] Sensitive data redacted and lab reset or evidence safely archived.

## Mandatory study sequence

1. **Watch** the listed YouTube video(s). Pause at unfamiliar IoT-specific terms and capture a concise note in your own words.
2. **Explain** the attack surface and security objective before touching any device or tool.
3. **Practice** only on a personally owned device with explicit authorization, an isolated lab, an intentionally vulnerable training image, or synthetic captures. Never scan public IPs, nearby radios, industrial devices or other people's infrastructure.
4. **Collect evidence** (sanitized screenshots, commands that were run, hashes, excerpts, timestamps, observations). Exclude passwords, real tokens, private keys and personal information.
5. **Defend**: propose a preventive control, a detection idea, an operational response and a validation step.
6. **Publish** a short learner-authored lab report. No quiz or quiz-linked unlocking is required.

### Written lab report template

- Objective and in-scope environment (authorization evidence)
- Assets, assumptions and threat model
- Steps performed, commands/tools and sanitized outputs
- Observed facts (separate from hypotheses)
- Risk impact and limitations
- Detection opportunity and safe remediation
- Retest method, result and open questions
- Links to original references and video creator credit

### Safety and licensing

Videos are **linked**, not downloaded, reuploaded, transcoded or claimed as owned. Verify current playback and embedding permissions before publishing in any third-party LMS. Do not represent the videos as a single creator-produced complete course: this is an original, curated learning path. Some videos provide conceptual context rather than direct coverage of every lesson; those are labeled accordingly. Avoid credential use against live systems, mass scanning and RF transmissions. Keep all labs isolated.


## Notes for the CyberTube author

- **Stable module key:** `iot-cybersecurity-m01`
- **Stable lesson keys:** `iot-cybersecurity-m01-l01`, `iot-cybersecurity-m01-l02`, `iot-cybersecurity-m01-l03`, `iot-cybersecurity-m01-l04`
- Use original lesson summaries, creator/source attribution and the verified URL string. YouTube embeds require independent availability checks.
- Keep lesson progression based on actual learning, not quiz pass/unlock gates.
- This is a *draft original course blueprint*, not formally approved coursework under the gated Agentic Course Redesign workflow.
