# Module 12 — Splunk Dashboards and SOC Reporting

**Track:** Splunk  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M08-M11  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Build analyst-facing dashboards without misleading visualizations.

## 4 video-guided lessons

### 12.1 Panels for time-series, top sources, success/failure

- **Before watching:** identify one thing you already know and one question you want answered about panels for time-series, top sources, success/failure.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 12.2 Dashboard Studio and drilldowns

- **Before watching:** identify one thing you already know and one question you want answered about dashboard studio and drilldowns.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 12.3 Readable metrics and filter controls

- **Before watching:** identify one thing you already know and one question you want answered about readable metrics and filter controls.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 12.4 Dashboard QA and access boundaries

- **Before watching:** identify one thing you already know and one question you want answered about dashboard qa and access boundaries.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=3146s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~52:26.
- **[Grey’s Academy 201: Dashboard Studio — Splunk](https://www.youtube.com/watch?v=UXNdKTbHPVg)** — Publisher-linked dashboard tutorial.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Splunk documentation](https://help.splunk.com/) — Free documentation.

## Guided SOC lab

**Scenario:** A SOC lead needs daily visibility of suspicious activity.

**Steps**

1. Create panels for failed logins, source IPs and DNS anomalies.
2. Add time and host filters and verify their scope.
3. Display source timestamps and label data freshness.
4. Explain one limitation beside each KPI.

**Submit as evidence:** Screenshot or dashboard export and a short user guide.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why is zero activity not necessarily good?
2. Which visuals fit categories?
3. How do you validate drilldown filters?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
