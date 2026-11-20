# Module 24 — Sentinel Incident Investigation and SOC Handoff

**Track:** Sentinel  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M23  
**Level:** Advanced  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Investigate an alert as a coherent multi-entity incident.

## 4 video-guided lessons

### 24.1 Alerts to incidents and entity graphs

- **Before watching:** identify one thing you already know and one question you want answered about alerts to incidents and entity graphs.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 24.2 Incident assignment, evidence and status

- **Before watching:** identify one thing you already know and one question you want answered about incident assignment, evidence and status.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 24.3 Case timeline and bookmarks

- **Before watching:** identify one thing you already know and one question you want answered about case timeline and bookmarks.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 24.4 Cross-product enrichment and L2 handoff

- **Before watching:** identify one thing you already know and one question you want answered about cross-product enrichment and l2 handoff.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Security Community: A Day in the SOC Analyst Life](https://www.youtube.com/watch?v=HloK6Ay4h1M)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Microsoft Sentinel for Beginners: Full Hands-on SIEM Masterclass — A Guide to Cloud & AI](https://www.youtube.com/watch?v=NJlaqBaqahc&t=1555s)** — Workspace, connectors, analytics, incidents, hunting, watchlists, intel; relevant chapter begins at ~25:55.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.

## Guided SOC lab

**Scenario:** Investigate a training incident with a user, host and suspicious destination.

**Steps**

1. Collect alert details without altering source data.
2. Pivot across affected users, devices and IPs; list contradictory signals.
3. Build a sequence of events and label levels of confidence.
4. Close as benign or escalate with written justification.

**Submit as evidence:** SOC incident report and handoff note.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is evidence of spread?
2. How should unrelated alerts be handled?
3. What must a complete SOC note include?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
