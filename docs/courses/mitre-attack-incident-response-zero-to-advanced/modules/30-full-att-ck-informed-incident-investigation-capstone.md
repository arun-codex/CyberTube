---
course: MITRE ATT&CK for Incident Response — Zero to Advanced
version: draft-1.0
as_of: 2026-11-21
mitre_attack_baseline: Enterprise v20.1 (2026-11-05)
nist_baseline: SP 800-61 Revision 3 (2025)
module: 30
phase: "Capstone"
level: "Advanced"
estimated_total_hours: 14
video_status: "Indexed/official-link verified; playback not tested"
publication_status: "Planning draft — not formal gated-course approval"
---

# Module 30: Full ATT&CK-Informed Incident Investigation Capstone

**Stage:** Capstone | **Difficulty:** Advanced | **Estimated guided + independent time:** 14 hours  
**Specialization:** MITRE ATT&CK applied to defensive incident response.  
**Focus:** End-to-end incident response and ATT&CK evidence mapping

## Video first — required viewing

1. **Primary:** [Hunt and Investigation — MITRE](https://www.youtube.com/watch?v=jtBnbpi7q1s) — source: MITRE.
2. **Recommended reinforcement:** [Hunt and Investigation — MITRE](https://www.youtube.com/watch?v=jtBnbpi7q1s) — use for context; check which segments match the lesson.
3. **Incident response video library:** [CISA Incident Response official playlist](https://www.youtube.com/playlist?list=PL-BF3N9rHBLKfP00HodbpwPmnrH2LgRuW).

> Video note: This is a curated lesson, not a claim that the video teaches every lesson objective below. Supplement missing material with the original exercises and official resources. Video examples may predate ATT&CK v20.1. YouTube links are located via official MITRE/NIST-linked pages and indexed YouTube descriptions; availability, captions, regional access, playback, cost and alignment to the 2026 ATT&CK version must be rechecked before publication. Older instructional videos use older ATT&CK taxonomy.

## Learning outcomes (observable)

By the end, the learner can:
1. Explain the relevant attacker-behavior and incident-response concepts using accurate terminology.
2. Identify and separate **direct observations**, **hypotheses**, and **unknowns** in a case.
3. Select and cite relevant ATT&CK behavior categories using the current Enterprise matrix, where applicable.
4. Produce a reproducible incident-response artifact with evidence traceability and a defensible next action.
5. Explain how operational risk, scope, permissions, and false positives affect the decision.

## Five video-led lessons

### Lesson 30.1: Receive incident intake and define authority

- **Mode:** video-led lesson, pause-and-check discussion, then guided analysis of *synthetic or permission-cleared* evidence.
- **Before watching:** write one prediction or question about **receive incident intake and define authority**.
- **During watching:** take notes on the observed behavior, affected asset, timestamps, possible ATT&CK tactic/technique, and supporting evidence. Mark statements that are assumptions.
- **Apply:** demonstrate the lesson concept on a fictional case, public training artifact, or isolated virtual machine. Do not operate on third-party systems.
- **Evidence checkpoint:** produce one screenshot, table, or paragraph documenting what was observed, what remains unknown, and what action requires approval.
### Lesson 30.2: Analyze host, sign-in and network evidence

- **Mode:** video-led lesson, pause-and-check discussion, then guided analysis of *synthetic or permission-cleared* evidence.
- **Before watching:** write one prediction or question about **analyze host, sign-in and network evidence**.
- **During watching:** take notes on the observed behavior, affected asset, timestamps, possible ATT&CK tactic/technique, and supporting evidence. Mark statements that are assumptions.
- **Apply:** demonstrate the lesson concept on a fictional case, public training artifact, or isolated virtual machine. Do not operate on third-party systems.
- **Evidence checkpoint:** produce one screenshot, table, or paragraph documenting what was observed, what remains unknown, and what action requires approval.
### Lesson 30.3: Build a supported ATT&CK behavior timeline

- **Mode:** video-led lesson, pause-and-check discussion, then guided analysis of *synthetic or permission-cleared* evidence.
- **Before watching:** write one prediction or question about **build a supported att&ck behavior timeline**.
- **During watching:** take notes on the observed behavior, affected asset, timestamps, possible ATT&CK tactic/technique, and supporting evidence. Mark statements that are assumptions.
- **Apply:** demonstrate the lesson concept on a fictional case, public training artifact, or isolated virtual machine. Do not operate on third-party systems.
- **Evidence checkpoint:** produce one screenshot, table, or paragraph documenting what was observed, what remains unknown, and what action requires approval.
### Lesson 30.4: Choose containment, eradication and recovery steps

- **Mode:** video-led lesson, pause-and-check discussion, then guided analysis of *synthetic or permission-cleared* evidence.
- **Before watching:** write one prediction or question about **choose containment, eradication and recovery steps**.
- **During watching:** take notes on the observed behavior, affected asset, timestamps, possible ATT&CK tactic/technique, and supporting evidence. Mark statements that are assumptions.
- **Apply:** demonstrate the lesson concept on a fictional case, public training artifact, or isolated virtual machine. Do not operate on third-party systems.
- **Evidence checkpoint:** produce one screenshot, table, or paragraph documenting what was observed, what remains unknown, and what action requires approval.
### Lesson 30.5: Deliver analyst report, Navigator layer and executive briefing

- **Mode:** video-led lesson, pause-and-check discussion, then guided analysis of *synthetic or permission-cleared* evidence.
- **Before watching:** write one prediction or question about **deliver analyst report, navigator layer and executive briefing**.
- **During watching:** take notes on the observed behavior, affected asset, timestamps, possible ATT&CK tactic/technique, and supporting evidence. Mark statements that are assumptions.
- **Apply:** demonstrate the lesson concept on a fictional case, public training artifact, or isolated virtual machine. Do not operate on third-party systems.
- **Evidence checkpoint:** produce one screenshot, table, or paragraph documenting what was observed, what remains unknown, and what action requires approval.

## Hands-on case (defensive, permission-bounded)

**Case setup:** A fictitious phishing-origin intrusion includes authentication anomalies, unusual process behavior, remote access and attempted data transfer.

**Instructions:**
1. Create an incident case ID such as `TRAIN-IR-30-001`, use UTC in all timeline entries, and record your lab's data provenance.
2. Start from *read-only* supplied evidence; first identify all systems, accounts and time boundaries without presuming an intrusion.
3. Build a table with columns `timestamp_utc | source | host_or_account | observed_action | artifact_reference | possible_attack_id | confidence | alternative_explanation`.
4. Compare observable behaviors to the current [ATT&CK matrix](https://attack.mitre.org/matrices/); cite the technique page and record the version. If evidence is insufficient, leave the ATT&CK ID **unassigned**.
5. Define an appropriate triage/containment next step, responsible role, required approval, expected side effects, and evidence-preservation requirements.
6. Assemble the written outcome described below; review for unsupported claims before submission.

**Required submission:** Final report, cited evidence timeline, confidence-rated ATT&CK layer, detection proposal and executive briefing.

## Exercise prompts and checks

- **Concept check:** Explain one difference between an ATT&CK technique and proof that a particular threat actor executed it.
- **Evidence check:** Which record would most strongly validate the suspected behavior? Which alternative, benign explanation should you test?
- **Response decision:** What would you do first, what must wait for approval, and how would you preserve evidence?
- **Reflection:** What is your most important detection or response improvement after this case?

## Required video completion evidence

- The video(s) watched with date, URL, optional time-stamped notes, and a 5-bullet summary written in your own words.
- At least 3 concrete facts from the scenario with source references (not unsupported assumptions).
- One ATT&CK mapping or a justified statement that no mapping is warranted.
- One clear incident-response decision or escalation recommendation.

## Free references and exercises

- [NIST SP 800-61 Revision 3 final](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [MITRE ATT&CK Enterprise matrix (live)](https://attack.mitre.org/matrices/)
- [MITRE ATT&CK Navigator project](https://github.com/mitre-attack/attack-navigator)
- [OTRF Security Datasets (public sample telemetry)](https://github.com/OTRF/Security-Datasets)
- [Sigma detection rules repository](https://github.com/SigmaHQ/sigma)
- [OTRF Threat Hunter Playbook](https://github.com/OTRF/ThreatHunter-Playbook)

- [CISA Incident Response YouTube playlist](https://www.youtube.com/playlist?list=PL-BF3N9rHBLKfP00HodbpwPmnrH2LgRuW) — free recorded training.
- [MITRE official video training index](https://attack.mitre.org/resources/learn-more-about-attack/training/) — find more video-led lessons.

## Assessment: proposed rubric (20 points; not institution-approved)

| Criterion | Points | Observable evidence |
|---|---:|---|
| Technical accuracy | 5 | Correct explanation and handling of concepts/telemetry |
| Evidence and timeline | 5 | Verifiable artifact references, timestamps, uncertainty |
| ATT&CK mapping quality | 4 | Specific supported mapping and version; no forced labels |
| IR action and safety | 4 | Authorized, proportionate steps and escalation rationale |
| Communication | 2 | Clear concise ticket or report |

**Provisional completion:** 14/20, with no critical evidence-integrity or authorization violation. This threshold is a *draft proposal* and must be approved by the course owner before deployment. Offer alternative written, oral or accessible output routes with equivalent criteria.

## Facilitator / content author instructions

- Check the video title, URL, availability, caption access and alignment to each of the five lessons; replace weak coverage with a better **verified** video before release.
- Briefly explain ATT&CK Enterprise v20.1 changes when older media says "Defense Evasion" and does not distinguish Stealth from Defense Impairment.
- Provide redacted, synthetic, or explicitly licensed public sample data; never distribute real employee emails, credentials, case notes or malware.
- Use screenshots/tables only when authorized; link to third-party YouTube embeds without copying the videos into the course package.
- Do not describe technical suspicion as proof of attribution. Preserve learner uncertainty and reward evidence-supported 'insufficient evidence' conclusions.
- AI may act as an optional feedback critic, but the learner must independently validate and attribute all facts and final decisions.
- Before publishing, confirm employer/practice context, learner access, workload, accommodations, rights and assessment policy.

## Exit / progression criteria

The next module unlocks once the learner has watched the required video, submitted the case artifact, documented uncertainty and completed the concept/evidence/response checks. If a lab cannot run on their machine, allow analysis of supplied CSV, screenshots or sample narrative instead.
