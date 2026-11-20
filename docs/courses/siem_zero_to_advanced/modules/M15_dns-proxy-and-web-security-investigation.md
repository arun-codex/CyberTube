# Module 15 — DNS, Proxy and Web Security Investigation

**Track:** Splunk  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M11-M14  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Analyze web telemetry to discover suspicious patterns without overcalling attacks.

## 4 video-guided lessons

### 15.1 High-frequency DNS and rare domain investigation

- **Before watching:** identify one thing you already know and one question you want answered about high-frequency dns and rare domain investigation.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 15.2 HTTP methods, paths, response status

- **Before watching:** identify one thing you already know and one question you want answered about http methods, paths, response status.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 15.3 Beacon-like intervals and false positives

- **Before watching:** identify one thing you already know and one question you want answered about beacon-like intervals and false positives.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 15.4 Cross-source temporal pivots

- **Before watching:** identify one thing you already know and one question you want answered about cross-source temporal pivots.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=3355s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~55:55.
- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=4170s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~69:30.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk Attack Data](https://github.com/splunk/attack_data) — Open attack-related log datasets; review file rights and safe handling.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.

## Guided SOC lab

**Scenario:** A lab host repeatedly requests a fake example domain.

**Steps**

1. Count DNS queries by client and domain; calculate cadence.
2. Filter HTTP traffic for elevated error rates or unusual POST volumes.
3. Join events on host plus time window.
4. Write both a suspicious-activity and a normal-explanation hypothesis.

**Submit as evidence:** DNS/HTTP findings table and a 1-page case report.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. How can normal software resemble a beacon?
2. Why can high 404 rates be harmless?
3. Why are TLDs weak indicators alone?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
