# Module 10 — Field Extraction, Parsing and Normalization in Splunk

**Track:** Splunk  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M07-M09  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Build consistent fields for heterogeneous source logs.

## 4 video-guided lessons

### 10.1 Automatic extractions versus explicit field mappings

- **Before watching:** identify one thing you already know and one question you want answered about automatic extractions versus explicit field mappings.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 10.2 rex and safe regex basics

- **Before watching:** identify one thing you already know and one question you want answered about rex and safe regex basics.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 10.3 eval coalesce for normalization

- **Before watching:** identify one thing you already know and one question you want answered about eval coalesce for normalization.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 10.4 Data quality and schema contracts

- **Before watching:** identify one thing you already know and one question you want answered about data quality and schema contracts.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=1944s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~32:24.
- **[How to Set Up SIEM with Splunk: Dashboard, SPL and Ransomware — IT Pro Academy](https://www.youtube.com/watch?v=wY3I4kC532U&t=1250s)** — 2026 walkthrough; dashboards, SPL, ransomware; relevant chapter begins at ~20:50.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Splunk documentation](https://help.splunk.com/) — Free documentation.

## Guided SOC lab

**Scenario:** Two event sources disagree on the source IP field name.

**Steps**

1. Compare src_ip versus client_ip fields from lab examples.
2. Normalize to one search-time field with coalesce and test null handling.
3. Add a lookup table of expected lab hosts.
4. Document regex boundaries and edge cases using at least five test records.

**Submit as evidence:** Before/after schema matrix, two SPL queries and test cases.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why use coalesce?
2. What are risks of permissive regex?
3. Why should source data remain unchanged?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Optional query starter

Example: `... | eval source_ip=coalesce(src_ip,client_ip) | table _time source_ip host action`.

Adjust field names to your actual sourcetype/table. Do not mistake a sample query for a production-ready detection.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
