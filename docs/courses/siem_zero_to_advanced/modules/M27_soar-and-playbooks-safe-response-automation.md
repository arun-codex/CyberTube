# Module 27 — SOAR and Playbooks: Safe Response Automation

**Track:** Advanced  
**Estimated learner time:** 6 hours (video + guided practice, approximate)  
**Prerequisites:** M23-M26  
**Level:** Advanced  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Design approval-aware security orchestration without causing unintended impacts.

## 4 video-guided lessons

### 27.1 Incident automation versus playbooks

- **Before watching:** identify one thing you already know and one question you want answered about incident automation versus playbooks.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 27.2 Logic Apps connector concepts

- **Before watching:** identify one thing you already know and one question you want answered about logic apps connector concepts.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 27.3 Human approvals, idempotence and failure handling

- **Before watching:** identify one thing you already know and one question you want answered about human approvals, idempotence and failure handling.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 27.4 Audit logging and secret management

- **Before watching:** identify one thing you already know and one question you want answered about audit logging and secret management.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Security Community: Logic Apps/Playbooks](https://www.youtube.com/watch?v=G6TIzJK8XBA)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Microsoft Sentinel for Beginners: Full Hands-on SIEM Masterclass — A Guide to Cloud & AI](https://www.youtube.com/watch?v=NJlaqBaqahc&t=245s)** — Workspace, connectors, analytics, incidents, hunting, watchlists, intel; relevant chapter begins at ~4:05.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.
- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.

## Guided SOC lab

**Scenario:** An alert needs a notification but must not automatically disable accounts.

**Steps**

1. Draw workflow: trigger > enrichment > human review > ticket > final status.
2. Define allowlisted benign training actions; do not call external APIs.
3. Plan retries, duplicate alert handling, secret storage and auditing.
4. Specify negative test for wrongly identified users.

**Submit as evidence:** Flowchart, authorization matrix and failure-mode test table.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. When should an action require human approval?
2. What is idempotence?
3. Why avoid hardcoded credentials?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
