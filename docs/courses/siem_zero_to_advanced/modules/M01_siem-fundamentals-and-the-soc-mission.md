# Module 01 — SIEM Fundamentals and the SOC Mission

**Track:** Foundation  
**Estimated learner time:** 3 hours (video + guided practice, approximate)  
**Prerequisites:** None  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Explain what a SIEM does and distinguish raw events, alerts, and incidents.

## 4 video-guided lessons

### 01.1 What SIEM collects and why

- **Before watching:** identify one thing you already know and one question you want answered about what siem collects and why.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 01.2 Collection > parsing > search > detection > response

- **Before watching:** identify one thing you already know and one question you want answered about collection > parsing > search > detection > response.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 01.3 SOC L1/L2/L3 and escalation

- **Before watching:** identify one thing you already know and one question you want answered about soc l1/l2/l3 and escalation.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 01.4 SIEM versus XDR, EDR and SOAR

- **Before watching:** identify one thing you already know and one question you want answered about siem versus xdr, edr and soar.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[What Is SIEM? — Jose Bravo series (community-curated YouTube playlist)](https://www.youtube.com/watch?v=MtqFMe4zSpQ&list=PLHh9jhztlMyp8lyKXt9orVM57ygW_ihPS)** — Concept introduction; verify episode order on YouTube.
- **[Splunk SIEM Introduction — Soft Mania (2026)](https://www.youtube.com/watch?v=gbjbE15b8r4)** — What is SIEM, SOC roles, event versus incident, Splunk components.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.

## Guided SOC lab

**Scenario:** You join a SOC monitoring a retail business. Multiple events arrive from firewalls and laptops.

**Steps**

1. Draw a block diagram with endpoint/firewall/cloud sources, collection, indexing, detection and ticketing.
2. Classify five invented security records as event, alert or incident, noting evidence required.
3. Write a short analyst handoff (what happened, affected host/user, next check).

**Submit as evidence:** Architecture diagram, 5-item classification, 150-word handoff.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. How is an event different from an incident?
2. Why does a SIEM need source timestamps?
3. What should L1 escalate?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
