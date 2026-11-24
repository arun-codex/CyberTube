# Module 28 — Industrial IoT / ICS Security & Safety

**Track:** Advanced  |  **Estimated effort:** 7 hours (including practical work)  |  **Focus:** OT-aware defense

**Prerequisite:** Module 27, with earlier foundations as needed

## Module aim

Build the ability to explain, safely assess and defend **OT-aware defense** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.

## Four lessons (ordered)

### 28.01 — Distinguish consumer IoT vs industrial IoT safety goals

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **distinguish consumer iot vs industrial iot safety goals** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 28.02 — Gateway, sensors, SCADA and industrial DMZ

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **gateway, sensors, scada and industrial dmz** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 28.03 — Change management and passive monitoring first

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **change management and passive monitoring first** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 28.04 — Unsafe test boundaries and contingency planning

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **unsafe test boundaries and contingency planning** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

## Free YouTube lessons for this module

Each module includes directly identified IoT-focused videos. A video may support multiple lessons; video coverage is not asserted for every subtopic.

- [Cybersecurity in the Age of Industrial IoT (publisher-linked playlist)](https://www.youtube.com/playlist?list=PL9o2NmGT-COBTCFOuF8Pu_gBOfE16rdfX) — Atdhe Buja (publisher-linked playlist; individual entries not independently checked)
- [IoT Device Investigation – UART, JTAG, NVRAM, Modbus & SCADA](https://www.youtube.com/watch?v=Lg_H6wEhfdQ) — it-learn (topic-specific overview)

## Free reference resources

- [NIST 8259A Device Cybersecurity Capability Core Baseline](https://csrc.nist.gov/pubs/ir/8259/a/final)
- [IoT Security Foundation](https://www.iotsecurityfoundation.org/)

## Guided practical exercise

**Task:** Map an illustrative industrial sensor deployment and propose read-only monitoring controls; no active testing on live plants.

**Procedure:**

1. Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.
2. Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.
3. Investigate the relevant **OT-aware defense** risk and record at least three concrete observations with evidence labels (E1, E2, E3).
4. Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.
5. Propose safer settings or design changes; verify them in the same safe environment when feasible.
6. Record one monitoring/detection idea and its most likely false-positive case.
7. Reset disposable lab state; remove test secrets and archive sanitized evidence.

**Deliverable:** IIoT zones/conduits diagram and safety-oriented security memo.

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

- **Stable module key:** `iot-cybersecurity-m28`
- **Stable lesson keys:** `iot-cybersecurity-m28-l01`, `iot-cybersecurity-m28-l02`, `iot-cybersecurity-m28-l03`, `iot-cybersecurity-m28-l04`
- Use original lesson summaries, creator/source attribution and the verified URL string. YouTube embeds require independent availability checks.
- Keep lesson progression based on actual learning, not quiz pass/unlock gates.
- This is a *draft original course blueprint*, not formally approved coursework under the gated Agentic Course Redesign workflow.
