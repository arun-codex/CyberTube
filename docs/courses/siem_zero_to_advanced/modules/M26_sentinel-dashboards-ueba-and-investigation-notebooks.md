# Module 26 — Sentinel Dashboards, UEBA and Investigation Notebooks

**Track:** Sentinel  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M24-M25  
**Level:** Advanced  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Interpret SOC workbooks and behavioral anomaly findings with proper uncertainty.

## 4 video-guided lessons

### 26.1 Workbooks for triage and visibility

- **Before watching:** identify one thing you already know and one question you want answered about workbooks for triage and visibility.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 26.2 UEBA concepts and limitations

- **Before watching:** identify one thing you already know and one question you want answered about ueba concepts and limitations.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 26.3 Notebooks for enrichment and visual analytics

- **Before watching:** identify one thing you already know and one question you want answered about notebooks for enrichment and visual analytics.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 26.4 Communicating data freshness and model caveats

- **Before watching:** identify one thing you already know and one question you want answered about communicating data freshness and model caveats.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Security Community: Sentinel Workbooks Webinar](https://www.youtube.com/watch?v=7eYNaYSsk1A)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Microsoft Security Community: Sentinel UEBA](https://www.youtube.com/watch?v=ixBotw9Qidg)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[SC-200 Episode 10: Hunt in Microsoft Sentinel — Microsoft Learn (2026)](https://www.youtube.com/watch?v=z6QbN4rpAvA)** — Verified Microsoft Learn lesson on hunting, bookmarks and notebooks.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.
- [KQL documentation](https://learn.microsoft.com/en-us/kusto/query/) — Free query language reference.

## Guided SOC lab

**Scenario:** A dashboard flags a rarely used account with unusual sign-in times.

**Steps**

1. Create a storyboard for failed logins and abnormal entities.
2. Explain what baseline data would be needed for a behavioral claim.
3. Use a provided notebook conceptually; avoid executing untrusted code.
4. Draft a SOC-ready narrative with confidence and limitations.

**Submit as evidence:** Workbook wireframe and interpretation memo.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why can rare behavior be legitimate?
2. What is UEBA?
3. What should notebooks not contain?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
