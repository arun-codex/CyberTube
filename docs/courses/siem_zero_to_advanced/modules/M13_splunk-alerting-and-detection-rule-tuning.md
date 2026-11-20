# Module 13 — Splunk Alerting and Detection Rule Tuning

**Track:** Splunk  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M09-M12  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Turn a defensible investigation hypothesis into a tested alert.

## 4 video-guided lessons

### 13.1 Scheduled searches and alert triggers

- **Before watching:** identify one thing you already know and one question you want answered about scheduled searches and alert triggers.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 13.2 Severity, frequency, suppression and ownership

- **Before watching:** identify one thing you already know and one question you want answered about severity, frequency, suppression and ownership.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 13.3 False positive / false negative test design

- **Before watching:** identify one thing you already know and one question you want answered about false positive / false negative test design.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 13.4 MITRE ATT&CK technique mapping

- **Before watching:** identify one thing you already know and one question you want answered about mitre att&ck technique mapping.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[How to Set Up SIEM with Splunk: Dashboard, SPL and Ransomware — IT Pro Academy](https://www.youtube.com/watch?v=wY3I4kC532U&t=3430s)** — 2026 walkthrough; dashboards, SPL, ransomware; relevant chapter begins at ~57:10.
- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=2555s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~42:35.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.
- [Sigma detection rules](https://github.com/SigmaHQ/sigma) — Community rule format and examples; validate against your schema.

## Guided SOC lab

**Scenario:** A fixed brute-force threshold floods the team with alerts.

**Steps**

1. Define a detection story: objective, event type, prerequisites.
2. Write a search for repeated failed logins followed by a success in a reasonable window.
3. Test positive, negative, missing-field and delayed-event cases.
4. Tune threshold and document the resulting trade-off.

**Submit as evidence:** Rule specification, test table, and an analyst runbook.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is alert fatigue?
2. What does a false negative mean?
3. Why must each alert have a runbook?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
