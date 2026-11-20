# Module 04 — Windows Security and Sysmon Telemetry

**Track:** Foundation  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M02  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Identify useful Windows event IDs and explain enhanced endpoint event collection.

## 4 video-guided lessons

### 04.1 Windows authentication event IDs 4624, 4625, 4672

- **Before watching:** identify one thing you already know and one question you want answered about windows authentication event ids 4624, 4625, 4672.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 04.2 Process creation 4688; optional command-line logging

- **Before watching:** identify one thing you already know and one question you want answered about process creation 4688; optional command-line logging.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 04.3 Sysmon process and network telemetry

- **Before watching:** identify one thing you already know and one question you want answered about sysmon process and network telemetry.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 04.4 Privacy and collection-volume trade-offs

- **Before watching:** identify one thing you already know and one question you want answered about privacy and collection-volume trade-offs.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[PowerSIEM: Analyzing Sysmon Events — IPPSec](https://www.youtube.com/watch?v=MvfhIydxFmw)** — Sysmon defensive event analysis; listed in community SIEM resource.
- **[SC-200 Episode 8: Connect Logs to Sentinel — Microsoft Learn (2026)](https://www.youtube.com/watch?v=hOYpji940yw)** — Verified Microsoft Learn lesson on AMA, Sysmon, Syslog and connectors.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Sysmon documentation](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) — Free tool; configure only on owned endpoints.
- [Splunk Attack Data](https://github.com/splunk/attack_data) — Open attack-related log datasets; review file rights and safe handling.

## Guided SOC lab

**Scenario:** An endpoint has repeated login failures followed by unusual process activity.

**Steps**

1. Use only sample events; label login failure, login success and process creation.
2. Build a timeline joining user, host and time windows.
3. Inspect sample process command lines for normal versus suspicious context.
4. Write the missing telemetry you would request from IT.

**Submit as evidence:** Annotated timeline, Windows event glossary and data-gap list.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What does Event ID 4625 mean?
2. Why is Sysmon not a substitute for Windows Security logs?
3. Why can event IDs differ by provider?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
