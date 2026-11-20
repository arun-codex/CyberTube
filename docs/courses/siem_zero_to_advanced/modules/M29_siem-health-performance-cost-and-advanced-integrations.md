# Module 29 — SIEM Health, Performance, Cost and Advanced Integrations

**Track:** Advanced  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M07-M27  
**Level:** Advanced  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Manage SIEM reliability, query performance and operational cost.

## 4 video-guided lessons

### 29.1 Ingest delay, dropped events, connector health

- **Before watching:** identify one thing you already know and one question you want answered about ingest delay, dropped events, connector health.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 29.2 Query optimization and retention

- **Before watching:** identify one thing you already know and one question you want answered about query optimization and retention.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 29.3 Cost budget, usage monitoring and cleanup

- **Before watching:** identify one thing you already know and one question you want answered about cost budget, usage monitoring and cleanup.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 29.4 Read-only APIs and audit-safe integrations

- **Before watching:** identify one thing you already know and one question you want answered about read-only apis and audit-safe integrations.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Security Community: Connector Health Workbook](https://www.youtube.com/watch?v=T6Vyo7gZYds)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Microsoft Security Community: Sentinel API Integrations](https://www.youtube.com/watch?v=Cu4dc88GH1k)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Microsoft Security Community: Build-Your-Own ML for Sentinel](https://www.youtube.com/watch?v=QDIuvZbmUmc)** — Linked from Microsoft Sentinel skill-up curriculum.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel billing and free trial](https://learn.microsoft.com/en-us/azure/sentinel/billing) — Check free trial eligibility and exclusions before provisioning.
- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.

## Guided SOC lab

**Scenario:** A monitoring dashboard shows a sudden drop in security-event volume.

**Steps**

1. Prepare health checks for source-to-index latency and count anomalies.
2. Identify three causes of absent logs and how to verify them.
3. Create a monthly monitoring SOP and budget controls.
4. Draft a read-only API integration plan with authorization and rate limiting.

**Submit as evidence:** Operational runbook, KPI matrix and cost checklist.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why can missing data be more dangerous than no alerts?
2. What are ingestion tiers?
3. Why use API least privilege?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
