# Module 09 — SPL Aggregation, Eval and Time-Series Analysis

**Track:** Splunk  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M08  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Identify patterns and baselines using SPL statistics and time windows.

## 4 video-guided lessons

### 09.1 stats count, dc, values, earliest, latest

- **Before watching:** identify one thing you already know and one question you want answered about stats count, dc, values, earliest, latest.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 09.2 eval, if, case and conditional comparisons

- **Before watching:** identify one thing you already know and one question you want answered about eval, if, case and conditional comparisons.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 09.3 timechart and bin

- **Before watching:** identify one thing you already know and one question you want answered about timechart and bin.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 09.4 Thresholds, rate and aggregation pitfalls

- **Before watching:** identify one thing you already know and one question you want answered about thresholds, rate and aggregation pitfalls.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[How to Set Up SIEM with Splunk: Dashboard, SPL and Ransomware — IT Pro Academy](https://www.youtube.com/watch?v=wY3I4kC532U&t=1250s)** — 2026 walkthrough; dashboards, SPL, ransomware; relevant chapter begins at ~20:50.
- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=2855s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~47:35.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Splunk documentation](https://help.splunk.com/) — Free documentation.

## Guided SOC lab

**Scenario:** Detect unusually high failed-login counts in synthetic data.

**Steps**

1. Count failures per user and 15-minute bin.
2. Calculate unique source IPs and failure-to-success ratios.
3. Design a baseline and note minimum data needed for validity.
4. State at least two causes of false positives.

**Submit as evidence:** Two saved queries and a chart with interpretation.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why can a fixed count threshold fail?
2. What does dc(src_ip) measure?
3. What is the danger of sparse baseline windows?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
