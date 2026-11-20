# Module 23 — Sentinel Analytics Rules and Detection Validation

**Track:** Sentinel  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M21-M22  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Create a detection specification with measured false-positive controls.

## 4 video-guided lessons

### 23.1 Scheduled query rules and prerequisites

- **Before watching:** identify one thing you already know and one question you want answered about scheduled query rules and prerequisites.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 23.2 Entity mapping, severity, tactics, grouping

- **Before watching:** identify one thing you already know and one question you want answered about entity mapping, severity, tactics, grouping.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 23.3 Rule test cases and delayed events

- **Before watching:** identify one thing you already know and one question you want answered about rule test cases and delayed events.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 23.4 Rule ownership, suppression and review

- **Before watching:** identify one thing you already know and one question you want answered about rule ownership, suppression and review.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Security Community: Writing Sentinel Analytics Rules](https://www.youtube.com/watch?v=pJjljBT4ipQ)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Getting Started with Sentinel: Deployment — Cloud 360 Training](https://www.youtube.com/watch?v=PDvQKFubLjY&t=1508s)** — Workspace, connectors, KQL, rules, incidents; relevant chapter begins at ~25:08.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.

## Guided SOC lab

**Scenario:** Design a suspicious login rule based on test data.

**Steps**

1. Write a KQL detection search and expected conditions.
2. Specify rule schedule, lookback, threshold and entity mapping.
3. Simulate positive, negative and noisy cases using generated data.
4. Write a concise runbook and limitations.

**Submit as evidence:** Detection YAML-style specification inside Markdown and test results.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What if source logs arrive late?
2. Why is entity mapping important?
3. How is an analytics rule different from a query?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
