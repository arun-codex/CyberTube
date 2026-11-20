# Module 16 — Endpoint and Ransomware Investigation Using Splunk

**Track:** Splunk  
**Estimated learner time:** 6 hours (video + guided practice, approximate)  
**Prerequisites:** M04-M15  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Trace a multi-event endpoint incident in passive logs and report the evidence.

## 4 video-guided lessons

### 16.1 Suspicious process and file activity

- **Before watching:** identify one thing you already know and one question you want answered about suspicious process and file activity.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 16.2 Initial access versus execution indicators

- **Before watching:** identify one thing you already know and one question you want answered about initial access versus execution indicators.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 16.3 Timeline from endpoint to web log

- **Before watching:** identify one thing you already know and one question you want answered about timeline from endpoint to web log.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 16.4 Evidence confidence and containment authorization

- **Before watching:** identify one thing you already know and one question you want answered about evidence confidence and containment authorization.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Conti Ransomware SOC Investigation with Splunk — TryHackMe](https://www.youtube.com/watch?v=fS2u97T05KQ)** — 2026 lab walkthrough; exercise may require separate platform access.
- **[How to Set Up SIEM with Splunk: Dashboard, SPL and Ransomware — IT Pro Academy](https://www.youtube.com/watch?v=wY3I4kC532U&t=2300s)** — 2026 walkthrough; dashboards, SPL, ransomware; relevant chapter begins at ~38:20.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk Attack Data](https://github.com/splunk/attack_data) — Open attack-related log datasets; review file rights and safe handling.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.
- [Sysmon documentation](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) — Free tool; configure only on owned endpoints.

## Guided SOC lab

**Scenario:** Investigate provided ransomware training logs; do not execute malware.

**Steps**

1. Import or inspect a benign synthetic process/event sample.
2. Identify execution, account change and unusual process relationships.
3. Build a first-seen/last-seen timeline.
4. Propose safe containment steps requiring operator authorization.

**Submit as evidence:** Timeline, IoC table, mapped ATT&CK techniques and mitigation suggestions.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is the difference between observed and inferred behavior?
2. Why is a hash alone insufficient?
3. What should not be done on a production host without approval?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
