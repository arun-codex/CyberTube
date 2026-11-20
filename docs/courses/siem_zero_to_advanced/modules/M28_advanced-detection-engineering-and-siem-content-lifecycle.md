# Module 28 — Advanced Detection Engineering and SIEM Content Lifecycle

**Track:** Advanced  
**Estimated learner time:** 6 hours (video + guided practice, approximate)  
**Prerequisites:** M13-M26  
**Level:** Advanced  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Review detection rules as testable, versioned security content.

## 4 video-guided lessons

### 28.1 Detection-as-code concept

- **Before watching:** identify one thing you already know and one question you want answered about detection-as-code concept.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 28.2 Sigma to SPL/KQL translation validation

- **Before watching:** identify one thing you already know and one question you want answered about sigma to spl/kql translation validation.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 28.3 Schema drift and test fixtures

- **Before watching:** identify one thing you already know and one question you want answered about schema drift and test fixtures.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 28.4 Peer reviews, coverage, change control

- **Before watching:** identify one thing you already know and one question you want answered about peer reviews, coverage, change control.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Security Community: Writing Sentinel Analytics Rules](https://www.youtube.com/watch?v=pJjljBT4ipQ)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Microsoft Security Community: Sentinel API Integrations](https://www.youtube.com/watch?v=Cu4dc88GH1k)** — Linked from Microsoft Sentinel skill-up curriculum.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Sigma detection rules](https://github.com/SigmaHQ/sigma) — Community rule format and examples; validate against your schema.
- [Splunk Security Content](https://github.com/splunk/security_content) — Detection examples, tests and analytics.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.

## Guided SOC lab

**Scenario:** A detection breaks after a vendor changes field names.

**Steps**

1. Write rule metadata: goal, data dependency, owner and severity.
2. Create one positive and two negative synthetic tests.
3. Compare SPL and KQL implementations for equivalence.
4. Create a rollback plan and a review checklist.

**Submit as evidence:** Versioned detection spec, cross-platform mapping and tests.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why does a syntactically valid detection still fail?
2. What makes content portable?
3. Why is rollback important?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
