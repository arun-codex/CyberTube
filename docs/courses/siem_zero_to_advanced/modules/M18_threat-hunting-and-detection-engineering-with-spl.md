# Module 18 — Threat Hunting and Detection Engineering with SPL

**Track:** Splunk  
**Estimated learner time:** 6 hours (video + guided practice, approximate)  
**Prerequisites:** M13-M17  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Form and test a hypothesis-led hunt and turn findings into defensible detections.

## 4 video-guided lessons

### 18.1 Hypothesis-driven hunting workflow

- **Before watching:** identify one thing you already know and one question you want answered about hypothesis-driven hunting workflow.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 18.2 ATT&CK mapping and data requirements

- **Before watching:** identify one thing you already know and one question you want answered about att&ck mapping and data requirements.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 18.3 Pivot queries and evidence collection

- **Before watching:** identify one thing you already know and one question you want answered about pivot queries and evidence collection.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 18.4 Versioned detection tests and coverage

- **Before watching:** identify one thing you already know and one question you want answered about versioned detection tests and coverage.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[PowerSIEM: Analyzing Sysmon Events — IPPSec](https://www.youtube.com/watch?v=MvfhIydxFmw)** — Sysmon defensive event analysis; listed in community SIEM resource.
- **[Conti Ransomware SOC Investigation with Splunk — TryHackMe](https://www.youtube.com/watch?v=fS2u97T05KQ)** — 2026 lab walkthrough; exercise may require separate platform access.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk Security Content](https://github.com/splunk/security_content) — Detection examples, tests and analytics.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.
- [Sigma detection rules](https://github.com/SigmaHQ/sigma) — Community rule format and examples; validate against your schema.

## Guided SOC lab

**Scenario:** Hunt for a hypothetical account compromise followed by suspicious outbound activity.

**Steps**

1. Write one hypothesis with a falsifiable pattern.
2. Choose data sources and draft at least three pivots.
3. Test with synthetic logs and record data gaps.
4. Convert strong findings into a detection idea with positive and negative tests.

**Submit as evidence:** Hunt notebook and detection hypothesis.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What makes a hunt hypothesis falsifiable?
2. How can missing logs create false confidence?
3. Why are tests essential?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
