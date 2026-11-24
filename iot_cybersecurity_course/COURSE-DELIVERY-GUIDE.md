# Instructor / Self-Study Delivery Guide

## Intended audience
Beginners with basic computer literacy, cybersecurity learners, aspiring SOC L1 analysts, blue-team practitioners and authorized IoT security researchers. No software/hardware purchase is required for the introductory modules.

## Learning principles
Video-first, hands-on and evidence-based. Each module has **four sequential lessons**; each links one or more IoT-related videos. Videos explain demonstrations or concepts, but the instructor must bridge topics not covered verbatim. Use descriptions rather than quiz gates.

## Reusable lesson schedule (60–90 min example)
- 0–10 min: revisit preceding context, scope and security risks.
- 10–30 min: watch selected IoT video with pauses, record three facts and two open questions.
- 30–45 min: guided explanation, attack surface and relevant defense controls.
- 45–75 min: safe practical exercise or an accessible static-analysis alternative.
- 75–90 min: save a sanitized artifact and compare against acceptance criteria.

## Outcomes/activities/evidence alignment
- Understand IoT attacks → identify risks in architecture → submit threat model.
- Analyze traffic → inspect supplied PCAP → submit packet annotations and triage notes.
- Analyze firmware → inspect isolated sample → submit evidence and remediation matrix.
- Defend device/cloud lifecycle → compare standards to configuration → submit hardening checklist.
- Investigate incident → correlate logs and timelines → submit incident report.
- Communicate to security team → present capstone → submit executive and technical handoff.

## Milestones
- Foundation: modules 1–6. Build a safe isolated lab, asset inventory and threat model.
- Core: modules 7–17. Demonstrate defensible packet/protocol/hardware/firmware analysis.
- Advanced: modules 18–29. Demonstrate safe reverse engineering, security engineering, DFIR, incident detection and standards mapping.
- Capstone: module 30. Submit a reproducible, safe end-to-end IoT security assessment.

## Accessibility and inclusion
- Provide captions or transcripts only when creator/platform permits; add your own original notes, not copied transcripts.
- Explain acronyms before use; use searchable text, descriptive links and a logical heading structure.
- Offer static evidence alternatives where learners lack a test board, radio hardware, Linux machine or GPU.
- Do not use flashing animations or rely on color alone to signal severity; test at normal screen zoom and on mobile.

## Feedback rather than quizzes
No auto-scored quizzes, graded quiz gates or unlock dependencies. Give feedback on the learner's evidence: accuracy (35%), safe methodology (20%), threat-and-control mapping (25%), reproducible communication (20%). These are **suggested portfolio review weights**, not official grading rules. Module acceptance criteria are formative checklists.

## Release QA
- Verify **every YouTube video** manually for title, content, geography, captions and embedded playback.
- Recheck source URLs, legal scope and creator attribution.
- Review four lessons per module for order, content overlap, difficulty and safe learning tasks.
- Test at least one lab from each phase, including a no-hardware alternative.
- Security-review any exercises involving wireless testing, exploitation, secrets or hardware access.
- Review for accessibility and current NIST/OWASP guidance before declaring production readiness.

## Example per-module report structure
Scope, authorized assets, objective, baseline, steps, observations E1–E3, interpretation, risk, detection opportunity, mitigation, retest, citations, known limitations.
