# Module 25 — Threat Intelligence, Watchlists and ASIM Enrichment

**Track:** Sentinel  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M22-M24  
**Level:** Advanced  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Apply external intelligence context carefully and avoid unsafe blanket blocking.

## 4 video-guided lessons

### 25.1 Indicators, confidence, expiration and provenance

- **Before watching:** identify one thing you already know and one question you want answered about indicators, confidence, expiration and provenance.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 25.2 Watchlists for assets and allowed services

- **Before watching:** identify one thing you already know and one question you want answered about watchlists for assets and allowed services.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 25.3 Entity enrichment in investigations

- **Before watching:** identify one thing you already know and one question you want answered about entity enrichment in investigations.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 25.4 ASIM-normalized detections

- **Before watching:** identify one thing you already know and one question you want answered about asim-normalized detections.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Sentinel for Beginners: Full Hands-on SIEM Masterclass — A Guide to Cloud & AI](https://www.youtube.com/watch?v=NJlaqBaqahc&t=2916s)** — Workspace, connectors, analytics, incidents, hunting, watchlists, intel; relevant chapter begins at ~48:36.
- **[Microsoft Security Community: Advanced SIEM Information Model (ASIM)](https://www.youtube.com/watch?v=Cf4wu_ujhG4)** — Linked from Microsoft Sentinel skill-up curriculum.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.

## Guided SOC lab

**Scenario:** One test indicator overlaps with a benign shared-hosting IP.

**Steps**

1. Build a synthetic allowlist and high-value asset watchlist.
2. Compare simulated indicator matches with observed network traffic.
3. Score credibility using provenance, recency and context.
4. Recommend verification before any blocking action.

**Submit as evidence:** Indicator evaluation table and watchlist schema.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why are indicator feeds noisy?
2. When should indicators expire?
3. How can shared IPs cause false positives?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
