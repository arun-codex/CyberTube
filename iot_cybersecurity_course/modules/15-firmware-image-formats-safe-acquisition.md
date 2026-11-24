# Module 15 — Firmware Image Formats & Safe Acquisition

**Track:** Core  |  **Estimated effort:** 6 hours (including practical work)  |  **Focus:** firmware evidence integrity

**Prerequisite:** Module 14, with earlier foundations as needed

## Module aim

Build the ability to explain, safely assess and defend **firmware evidence integrity** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.

## Four lessons (ordered)

### 15.01 — Vendor firmware vs owned test firmware

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **vendor firmware vs owned test firmware** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 15.02 — Integrity hashes and chain of custody

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **integrity hashes and chain of custody** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 15.03 — Archive, compression and embedded filesystem signatures

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **archive, compression and embedded filesystem signatures** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 15.04 — Secure storage and provenance documentation

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **secure storage and provenance documentation** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

## Free YouTube lessons for this module

Each module includes directly identified IoT-focused videos. A video may support multiple lessons; video coverage is not asserted for every subtopic.

- [IP Camera Firmware Extraction Exposed Everything](https://www.youtube.com/watch?v=8IvCNbQOmxk) — Suit Up and Hack (topic-specific)
- [12. IoT Forensics: Firmware Extraction & Analysis with Binwalk](https://www.youtube.com/watch?v=LjkG-tSIEjU) — Atdhe Buja (topic-specific)

## Free reference resources

- [Binwalk project](https://github.com/ReFirmLabs/binwalk)
- [OWASP IoTGoat deliberately insecure firmware](https://github.com/OWASP/IoTGoat)

## Guided practical exercise

**Task:** Download official or intentionally vulnerable firmware; hash it and inspect file type without executing it.

**Procedure:**

1. Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.
2. Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.
3. Investigate the relevant **firmware evidence integrity** risk and record at least three concrete observations with evidence labels (E1, E2, E3).
4. Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.
5. Propose safer settings or design changes; verify them in the same safe environment when feasible.
6. Record one monitoring/detection idea and its most likely false-positive case.
7. Reset disposable lab state; remove test secrets and archive sanitized evidence.

**Deliverable:** Acquisition manifest, SHA-256 and evidence log.

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

- **Stable module key:** `iot-cybersecurity-m15`
- **Stable lesson keys:** `iot-cybersecurity-m15-l01`, `iot-cybersecurity-m15-l02`, `iot-cybersecurity-m15-l03`, `iot-cybersecurity-m15-l04`
- Use original lesson summaries, creator/source attribution and the verified URL string. YouTube embeds require independent availability checks.
- Keep lesson progression based on actual learning, not quiz pass/unlock gates.
- This is a *draft original course blueprint*, not formally approved coursework under the gated Agentic Course Redesign workflow.
