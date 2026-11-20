# Module 08 — Splunk Search Interface and Basic SPL

**Track:** Splunk  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M07  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Use SPL to filter, transform and examine security events.

## 4 video-guided lessons

### 08.1 search app, time picker, events versus statistics

- **Before watching:** identify one thing you already know and one question you want answered about search app, time picker, events versus statistics.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 08.2 index=, sourcetype=, fields and keywords

- **Before watching:** identify one thing you already know and one question you want answered about index=, sourcetype=, fields and keywords.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 08.3 Boolean filters and comparison operators

- **Before watching:** identify one thing you already know and one question you want answered about boolean filters and comparison operators.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 08.4 table, fields, sort and head

- **Before watching:** identify one thing you already know and one question you want answered about table, fields, sort and head.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=2555s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~42:35.
- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=2855s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~47:35.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Splunk documentation](https://help.splunk.com/) — Free documentation.

## Guided SOC lab

**Scenario:** Find authentication failures for a single host.

**Steps**

1. Search index=soc_lab with appropriate time range.
2. Filter action=failure then group by user and src_ip.
3. Create table with _time, user, src_ip, host and action.
4. Export only synthetic results to Markdown for your case report.

**Submit as evidence:** Five reusable SPL queries and screenshots of nonempty results.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is the effect of time range in Splunk?
2. Why does index selection matter?
3. How is table different from stats?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Optional query starter

Example: `index=soc_lab action=failure | stats count by user src_ip | sort - count`. Adjust field names to ingested data.

Adjust field names to your actual sourcetype/table. Do not mistake a sample query for a production-ready detection.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
