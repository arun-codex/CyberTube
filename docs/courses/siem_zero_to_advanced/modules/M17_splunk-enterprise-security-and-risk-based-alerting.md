# Module 17 — Splunk Enterprise Security and Risk-Based Alerting

**Track:** Splunk  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M11-M16  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Explain ES finding/risk concepts and simulate risk scoring in a base Splunk lab.

## 4 video-guided lessons

### 17.1 Enterprise Security concepts and availability

- **Before watching:** identify one thing you already know and one question you want answered about enterprise security concepts and availability.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 17.2 Risk scores, notable events/findings

- **Before watching:** identify one thing you already know and one question you want answered about risk scores, notable events/findings.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 17.3 CIM/data models and normalized security content

- **Before watching:** identify one thing you already know and one question you want answered about cim/data models and normalized security content.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 17.4 Entity-based prioritization and investigation queues

- **Before watching:** identify one thing you already know and one question you want answered about entity-based prioritization and investigation queues.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=4927s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~82:07.
- **[How to Set Up SIEM with Splunk: Dashboard, SPL and Ransomware — IT Pro Academy](https://www.youtube.com/watch?v=wY3I4kC532U&t=3500s)** — 2026 walkthrough; dashboards, SPL, ransomware; relevant chapter begins at ~58:20.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Splunk Security Content](https://github.com/splunk/security_content) — Detection examples, tests and analytics.

## Guided SOC lab

**Scenario:** Two weak signals become stronger when they affect the same high-value user.

**Steps**

1. Study ES examples; use synthetic base Splunk logs if ES license unavailable.
2. Assign illustrative risk weights to failed-login burst and suspicious DNS activity.
3. Calculate grouped risk by user; explain that these are teaching values.
4. Prepare an analyst escalation showing contributing events.

**Submit as evidence:** Risk scoring worksheet and short prioritization rationale.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why is a risk score not certainty?
2. What is CIM for?
3. How does ES differ from core Splunk?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
