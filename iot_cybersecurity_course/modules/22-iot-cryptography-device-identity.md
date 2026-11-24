# Module 22 — IoT Cryptography & Device Identity

**Track:** Advanced  |  **Estimated effort:** 7 hours (including practical work)  |  **Focus:** device identity assurance

**Prerequisite:** Module 21, with earlier foundations as needed

## Module aim

Build the ability to explain, safely assess and defend **device identity assurance** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.

## Four lessons (ordered)

### 22.01 — Per-device identities and credential provisioning

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **per-device identities and credential provisioning** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 22.02 — Certificate validation, TLS and key storage

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **certificate validation, tls and key storage** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 22.03 — Threats from reused keys and insecure randomness

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **threats from reused keys and insecure randomness** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

### 22.04 — Key rotation, revocation and incident response

**Learning activity:** Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **key rotation, revocation and incident response** affects confidentiality, integrity, availability, safety or privacy.

**Practice & evidence:** Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.

**Completion check:** The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision.

## Free YouTube lessons for this module

Each module includes directly identified IoT-focused videos. A video may support multiple lessons; video coverage is not asserted for every subtopic.

- [Elements of IoT Security: Authentication, Access Control, Data Security](https://www.youtube.com/watch?v=qzre4NKO_LE) — Engineering Funda (topic-specific)
- [Ghidra Just Exposed a Critical IoT Vulnerability – CWE-321](https://www.youtube.com/watch?v=nrGNyvm_ocI) — Suit Up and Hack (topic-specific)

## Free reference resources

- [NIST 8259A Device Cybersecurity Capability Core Baseline](https://csrc.nist.gov/pubs/ir/8259/a/final)
- [OWASP IoT Security Verification Standard](https://owasp.org/projects/iot-security-verification-standard)

## Guided practical exercise

**Task:** Audit example configuration files for TLS validation, unique identifiers and secret lifecycle without exposing live credentials.

**Procedure:**

1. Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.
2. Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.
3. Investigate the relevant **device identity assurance** risk and record at least three concrete observations with evidence labels (E1, E2, E3).
4. Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.
5. Propose safer settings or design changes; verify them in the same safe environment when feasible.
6. Record one monitoring/detection idea and its most likely false-positive case.
7. Reset disposable lab state; remove test secrets and archive sanitized evidence.

**Deliverable:** Key-management policy and crypto-control checklist.

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

- **Stable module key:** `iot-cybersecurity-m22`
- **Stable lesson keys:** `iot-cybersecurity-m22-l01`, `iot-cybersecurity-m22-l02`, `iot-cybersecurity-m22-l03`, `iot-cybersecurity-m22-l04`
- Use original lesson summaries, creator/source attribution and the verified URL string. YouTube embeds require independent availability checks.
- Keep lesson progression based on actual learning, not quiz pass/unlock gates.
- This is a *draft original course blueprint*, not formally approved coursework under the gated Agentic Course Redesign workflow.
