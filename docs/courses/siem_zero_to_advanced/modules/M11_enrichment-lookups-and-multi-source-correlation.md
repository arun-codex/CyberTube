# Module 11 — Enrichment, Lookups and Multi-Source Correlation

**Track:** Splunk  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M10  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Connect related log sources using normalized keys and temporal context.

## 4 video-guided lessons

### 11.1 Static CSV lookup fundamentals

- **Before watching:** identify one thing you already know and one question you want answered about static csv lookup fundamentals.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 11.2 join vs stats and transaction: trade-offs

- **Before watching:** identify one thing you already know and one question you want answered about join vs stats and transaction: trade-offs.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 11.3 correlation by host/user/IP/time

- **Before watching:** identify one thing you already know and one question you want answered about correlation by host/user/ip/time.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 11.4 Threat context versus assertions of compromise

- **Before watching:** identify one thing you already know and one question you want answered about threat context versus assertions of compromise.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[How to Set Up SIEM with Splunk: Dashboard, SPL and Ransomware — IT Pro Academy](https://www.youtube.com/watch?v=wY3I4kC532U&t=1250s)** — 2026 walkthrough; dashboards, SPL, ransomware; relevant chapter begins at ~20:50.
- **[PowerSIEM: Analyzing Sysmon Events — IPPSec](https://www.youtube.com/watch?v=MvfhIydxFmw)** — Sysmon defensive event analysis; listed in community SIEM resource.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Splunk Security Content](https://github.com/splunk/security_content) — Detection examples, tests and analytics.

## Guided SOC lab

**Scenario:** Identify a user whose login failures precede suspicious web requests.

**Steps**

1. Create a safe lab lookup from a sample asset inventory.
2. Enrich authentication events with asset criticality.
3. Correlate related DNS or web requests within an explicit time window.
4. Record assumptions and cases where IP reassignment breaks joins.

**Submit as evidence:** Correlation diagram and enriched event table.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. When is IP-only correlation unreliable?
2. Why not always use join?
3. What is enrichment?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
