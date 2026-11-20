# Module 20 — Sentinel Connectors: Windows, Linux, Syslog, Cloud

**Track:** Sentinel  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M19  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Select and validate data connectors for defensive telemetry.

## 4 video-guided lessons

### 20.1 Azure Monitor Agent and data collection rules

- **Before watching:** identify one thing you already know and one question you want answered about azure monitor agent and data collection rules.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 20.2 Windows event/Sysmon ingestion

- **Before watching:** identify one thing you already know and one question you want answered about windows event/sysmon ingestion.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 20.3 Linux Syslog and CEF

- **Before watching:** identify one thing you already know and one question you want answered about linux syslog and cef.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 20.4 Data freshness and connector health

- **Before watching:** identify one thing you already know and one question you want answered about data freshness and connector health.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[SC-200 Episode 8: Connect Logs to Sentinel — Microsoft Learn (2026)](https://www.youtube.com/watch?v=hOYpji940yw)** — Verified Microsoft Learn lesson on AMA, Sysmon, Syslog and connectors.
- **[Microsoft Security Community: Sentinel Data Collection Scenarios](https://www.youtube.com/watch?v=FStpHl0NRM8)** — Linked from Microsoft Sentinel skill-up curriculum.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.
- [Microsoft Sentinel official training lab](https://github.com/Azure/Azure-Sentinel/tree/master/Tools/Microsoft-Sentinel-Training-Lab) — Free instructions/source; Azure resources may cost money.

## Guided SOC lab

**Scenario:** An endpoint is absent from Sentinel after the logging agent is configured.

**Steps**

1. Map a connector to its source and required permissions.
2. Follow official lab instructions in a disposable subscription only if authorized.
3. Verify event arrival with a lightweight query or simulated table.
4. Troubleshoot missing host, timestamp, agent or DCR scope.

**Submit as evidence:** Connector matrix and root-cause checklist.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is a Data Collection Rule?
2. How do you prove a connector actually sends logs?
3. What is CEF used for?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
