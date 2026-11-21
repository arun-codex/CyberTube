# Course Operations and Instructional Design

## Audience and non-negotiables
Absolute beginner through advanced defenders: SOC L1/L2, junior DFIR, and threat hunters. This is a video-first **incident response** course (not an offensive intrusion course). CyberTube can use the Markdown files as an original course-outline import after editorial, security, and accessibility QA.

## Curriculum alignment
Outcome O1: accurately interpret current ATT&CK concepts and version changes (modules 3–6, 17, 28). Outcome O2: prepare and operate incident response in line with NIST 800-61r3 (modules 1–2, 7–9, 20, 29). Outcome O3: collect and validate evidence across Windows, Linux, network, identity and memory (modules 10–15, 21–23). Outcome O4: recognize behavior by tactic and technique (modules 14–20). Outcome O5: tune detections and assess telemetry coverage (modules 24–28). Outcome O6: conduct an end-to-end incident investigation with defensible communication (module 30).

## Pacing and learner workload
The 30 modules total **234 planned hours**, including the selected video, analysis exercise, checking sources, and portfolio work. Suggested part-time schedule: 10–12 hours/week (~17–20 weeks); learners may need significantly longer. Video playback duration has *not* been independently measured. Phase checkpoints after modules 6, 13, 20, 27 and 30.

## Video-first pattern for EVERY module
1. Preview the case and knowledge check (5–10 min).
2. Watch required video (with pausing, transcription, captions and notes).
3. Read only necessary supplementary official primary sources; do not replace the video-led core.
4. Perform a guided lab using provided **synthetic or licensed training-only** evidence.
5. Complete a short quiz, submit evidence and write a response action.
6. Receive feedback, revise the investigation and capture one new generalizable lesson.

## Lab environment
Minimum: a normal computer and browser. Optional: offline Ubuntu/Windows VMs, Wireshark, locally hosted SIEM, Volatility, Navigator. Alternative no-install route uses example CSV/JSON logs, screenshots, PCAPs from trusted training datasets and case narratives. Use fake domains/IPs (RFC 5737 TEST-NET 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24), fake users, no personal identifiers. Never run suspicious samples, scanners or emulation tests on third-party networks.

## Scope and authorization controls
All activities stay in isolated labs or use public datasets with rights to process. Response actions such as isolate host, block IP, disable user, reset credentials, delete file or restore backups are *simulated decision exercises* unless authorized by the system owner. Never destroy evidence to finish a lab. Do not publish live indicators that expose protected case details.

## Independent evidence requirements
Each module must record video viewing, source URL, facts vs hypotheses, timestamps and ATT&CK version. Capstone requires an evidence-traceable ATT&CK layer, incident narrative, containment and recovery decision record, detection improvement and executive summary. A correct “insufficient evidence” is accepted if explained.

## Accessibility and fairness
Provide caption/transcript-dependent alternatives, readable tables, glossary, color-independent Navigator labels, text-only case evidence, pace adjustment and accommodation equivalent to the learning objective. Account-based/free-tier labs must have a no-sign-in substitute; do not lock completion behind a paid service.

## Evaluation boundaries (draft, not locally approved)
Each module proposes a 20-point analytic rubric. Final competence threshold and grading scheme require owner approval. For self-study, aim to complete every module with documented evidence, not merely watch a video. AI may critique but cannot substitute for the learner's individual verified analysis. Do not auto-grade unique incident conclusions using brittle keyword matching.

## Required updates
A maintainer should check ATT&CK version at each release, all videos at least before publish, lab availability, licensing and links. Archive course mapping/version; avoid silent taxonomy drift. Update NIST guidance references if later superseded.
