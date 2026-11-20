# Module 21 — KQL Basics for SOC Analysts

**Track:** Sentinel  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M19-M20  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Query security event tables with safe, correctly scoped KQL.

## 4 video-guided lessons

### 21.1 Tabular query operators and pipeline

- **Before watching:** identify one thing you already know and one question you want answered about tabular query operators and pipeline.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 21.2 where, project, take, order by

- **Before watching:** identify one thing you already know and one question you want answered about where, project, take, order by.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 21.3 Filtering timestamps and IPs

- **Before watching:** identify one thing you already know and one question you want answered about filtering timestamps and ips.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 21.4 Count and summarize by entity

- **Before watching:** identify one thing you already know and one question you want answered about count and summarize by entity.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[SC-200 Episode 6: Query Microsoft Sentinel Using KQL — Microsoft Learn (2026)](https://www.youtube.com/watch?v=3DHcnk9obfk)** — Verified Microsoft Learn lesson on KQL.
- **[Microsoft Security Community: Sentinel KQL Lab](https://www.youtube.com/watch?v=EDCBLULjtCM)** — Linked from Microsoft Sentinel skill-up curriculum.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Learn: KQL for Sentinel](https://learn.microsoft.com/en-us/training/paths/sc-200-utilize-kql-for-azure-sentinel/) — Free structured KQL lessons.
- [KQL documentation](https://learn.microsoft.com/en-us/kusto/query/) — Free query language reference.

## Guided SOC lab

**Scenario:** Investigate a spike in sample authentication failures.

**Steps**

1. Read the KQL syntax guide and identify columns for target table.
2. Filter a predefined time window and failed events.
3. Summarize by user and source IP; sort descending.
4. Document how to adapt if the lab uses a custom table name.

**Submit as evidence:** Four KQL queries and two-sentence output explanation.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. How does KQL filter rows?
2. Why use explicit time windows?
3. How is summarize different from project?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Optional query starter

Example (where table exists): `SecurityEvent | where TimeGenerated > ago(1d) | where EventID == 4625 | summarize Failures=count() by Account, Computer | order by Failures desc`.

Adjust field names to your actual sourcetype/table. Do not mistake a sample query for a production-ready detection.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
