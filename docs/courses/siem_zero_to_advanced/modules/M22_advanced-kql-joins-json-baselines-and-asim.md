# Module 22 — Advanced KQL: Joins, JSON, Baselines and ASIM

**Track:** Sentinel  
**Estimated learner time:** 6 hours (video + guided practice, approximate)  
**Prerequisites:** M21  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Combine data and engineer more reliable KQL detections.

## 4 video-guided lessons

### 22.1 join and lookup patterns

- **Before watching:** identify one thing you already know and one question you want answered about join and lookup patterns.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 22.2 extend, parse_json, mv-expand

- **Before watching:** identify one thing you already know and one question you want answered about extend, parse_json, mv-expand.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 22.3 make-series and anomaly patterns

- **Before watching:** identify one thing you already know and one question you want answered about make-series and anomaly patterns.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 22.4 ASIM field normalization and query performance

- **Before watching:** identify one thing you already know and one question you want answered about asim field normalization and query performance.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[SC-200 Episode 6: Query Microsoft Sentinel Using KQL — Microsoft Learn (2026)](https://www.youtube.com/watch?v=3DHcnk9obfk)** — Verified Microsoft Learn lesson on KQL.
- **[Microsoft Security Community: Advanced SIEM Information Model (ASIM)](https://www.youtube.com/watch?v=Cf4wu_ujhG4)** — Linked from Microsoft Sentinel skill-up curriculum.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [KQL documentation](https://learn.microsoft.com/en-us/kusto/query/) — Free query language reference.
- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.

## Guided SOC lab

**Scenario:** Correlate two synthetic tables with shared host identities.

**Steps**

1. Construct mock tabular records with datatable() when no cloud instance exists.
2. Normalize entity keys and define a sensible time window.
3. Join events and explain duplicate/missing-row behavior.
4. Compare query output before/after deduplication.

**Submit as evidence:** Correlated KQL query and performance/correctness note.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is a join key?
2. When can inner join drop evidence?
3. Why is normalization valuable?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
