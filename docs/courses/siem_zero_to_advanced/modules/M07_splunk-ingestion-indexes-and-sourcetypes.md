# Module 07 — Splunk Ingestion, Indexes and Sourcetypes

**Track:** Splunk  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M06  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Ingest sample CSV/JSON logs accurately and validate timestamps, fields and counts.

## 4 video-guided lessons

### 07.1 File monitor versus upload

- **Before watching:** identify one thing you already know and one question you want answered about file monitor versus upload.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 07.2 index/source/sourcetype/host attributes

- **Before watching:** identify one thing you already know and one question you want answered about index/source/sourcetype/host attributes.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 07.3 Timestamp and field parsing validation

- **Before watching:** identify one thing you already know and one question you want answered about timestamp and field parsing validation.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 07.4 Ingest troubleshooting and data-quality checks

- **Before watching:** identify one thing you already know and one question you want answered about ingest troubleshooting and data-quality checks.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=1944s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~32:24.
- **[Grey’s Academy 101: Getting Started with Splunk — Splunk](https://www.youtube.com/watch?v=YM3UWuvIJyc)** — Publisher-linked introductory video.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk documentation](https://help.splunk.com/) — Free documentation.
- [Splunk Attack Data](https://github.com/splunk/attack_data) — Open attack-related log datasets; review file rights and safe handling.

## Guided SOC lab

**Scenario:** Import synthetic authentication, DNS, and HTTP datasets.

**Steps**

1. Create or reuse a dedicated soc_lab index.
2. Upload datasets/auth_events.csv, dns_events.csv and web_events.csv as separate sources.
3. Confirm the event count and time parsing for each sourcetype.
4. Document any failed parses and show how you repaired them.

**Submit as evidence:** Three ingestion screenshots and a validation table.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why is source_type naming important?
2. What happens when timestamps are parsed incorrectly?
3. How do you detect partial ingestion?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
