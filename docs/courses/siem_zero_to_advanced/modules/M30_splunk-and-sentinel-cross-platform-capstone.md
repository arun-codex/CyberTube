# Module 30 — Splunk and Sentinel Cross-Platform Capstone

**Track:** Capstone  
**Estimated learner time:** 10 hours (video + guided practice, approximate)  
**Prerequisites:** M01-M29  
**Level:** Advanced  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Complete a documented SOC case in both SPL and KQL, demonstrating investigative competence.

## 4 video-guided lessons

### 30.1 Case intake and scope

- **Before watching:** identify one thing you already know and one question you want answered about case intake and scope.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 30.2 Telemetry normalization and evidence timeline

- **Before watching:** identify one thing you already know and one question you want answered about telemetry normalization and evidence timeline.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 30.3 Correlation, detection, false-positive review

- **Before watching:** identify one thing you already know and one question you want answered about correlation, detection, false-positive review.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 30.4 Executive and technical reporting with handoff

- **Before watching:** identify one thing you already know and one question you want answered about executive and technical reporting with handoff.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[How to Set Up SIEM with Splunk: Dashboard, SPL and Ransomware — IT Pro Academy](https://www.youtube.com/watch?v=wY3I4kC532U)** — 2026 walkthrough; dashboards, SPL, ransomware.
- **[SC-200 Episode 10: Hunt in Microsoft Sentinel — Microsoft Learn (2026)](https://www.youtube.com/watch?v=z6QbN4rpAvA)** — Verified Microsoft Learn lesson on hunting, bookmarks and notebooks.
- **[Conti Ransomware SOC Investigation with Splunk — TryHackMe](https://www.youtube.com/watch?v=fS2u97T05KQ)** — 2026 lab walkthrough; exercise may require separate platform access.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk Attack Data](https://github.com/splunk/attack_data) — Open attack-related log datasets; review file rights and safe handling.
- [Microsoft Sentinel official training lab](https://github.com/Azure/Azure-Sentinel/tree/master/Tools/Microsoft-Sentinel-Training-Lab) — Free instructions/source; Azure resources may cost money.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.
- [Sigma detection rules](https://github.com/SigmaHQ/sigma) — Community rule format and examples; validate against your schema.

## Guided SOC lab

**Scenario:** Fictional case: user login failures, unusual DNS cadence, web traffic and an abnormal process on a lab host.

**Steps**

1. Import or simulate the included datasets and write an initial evidence inventory.
2. Implement SPL and KQL (via datatable or live tables) to answer who/when/where.
3. Construct a timeline and a detection with positive/negative test cases.
4. Map relevant observed behaviors to ATT&CK, citing evidence.
5. Produce two outputs: concise L1 triage handoff and technical detection engineer appendix.
6. Score using the grading rubric; identify what data was unavailable.

**Submit as evidence:** 5–8 page Markdown capstone report, SPL/KQL queries, timeline and test matrix.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What evidence distinguishes an incident from noisy events?
2. How do you validate cross-platform query equivalence?
3. What would trigger escalation?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
