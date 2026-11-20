# Module 02 — Security Log Types and Event Anatomy

**Track:** Foundation  
**Estimated learner time:** 3 hours (video + guided practice, approximate)  
**Prerequisites:** M01  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Interpret timestamps, user, host, source IP, action and severity in sample records.

## 4 video-guided lessons

### 02.1 Windows, Linux, network, DNS and proxy event sources

- **Before watching:** identify one thing you already know and one question you want answered about windows, linux, network, dns and proxy event sources.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 02.2 Fields, types, timestamps and time zones

- **Before watching:** identify one thing you already know and one question you want answered about fields, types, timestamps and time zones.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 02.3 Authentication success/failure and baselines

- **Before watching:** identify one thing you already know and one question you want answered about authentication success/failure and baselines.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 02.4 Structured JSON, CSV and syslog formats

- **Before watching:** identify one thing you already know and one question you want answered about structured json, csv and syslog formats.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=1944s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~32:24.
- **[SC-200 Episode 8: Connect Logs to Sentinel — Microsoft Learn (2026)](https://www.youtube.com/watch?v=hOYpji940yw)** — Verified Microsoft Learn lesson on AMA, Sysmon, Syslog and connectors.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk documentation](https://help.splunk.com/) — Free documentation.
- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.

## Guided SOC lab

**Scenario:** You receive mixed CSV records from a test domain and network gateway.

**Steps**

1. Open datasets/auth_events.csv and identify each column.
2. Normalize time to UTC in your notes; keep original local time separately.
3. Identify top users and failed-login events with a spreadsheet or text editor.
4. Create a source-to-field dictionary noting missing fields.

**Submit as evidence:** Annotated five-event sample and a field dictionary.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is the difference between event time and ingestion time?
2. Why must source IP and user be interpreted together?
3. What is a sourcetype?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
