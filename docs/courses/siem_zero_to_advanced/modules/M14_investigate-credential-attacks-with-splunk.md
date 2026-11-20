# Module 14 — Investigate Credential Attacks with Splunk

**Track:** Splunk  
**Estimated learner time:** 5 hours (video + guided practice, approximate)  
**Prerequisites:** M13  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Triage password spraying and brute-force hypotheses from event records.

## 4 video-guided lessons

### 14.1 Brute force versus spraying

- **Before watching:** identify one thing you already know and one question you want answered about brute force versus spraying.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 14.2 Unique users vs unique source IPs

- **Before watching:** identify one thing you already know and one question you want answered about unique users vs unique source ips.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 14.3 Success-after-failure sequences

- **Before watching:** identify one thing you already know and one question you want answered about success-after-failure sequences.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 14.4 Identity context and escalation boundaries

- **Before watching:** identify one thing you already know and one question you want answered about identity context and escalation boundaries.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=2555s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~42:35.
- **[Microsoft Security Community: A Day in the SOC Analyst Life](https://www.youtube.com/watch?v=HloK6Ay4h1M)** — Linked from Microsoft Sentinel skill-up curriculum.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.
- [Splunk Attack Data](https://github.com/splunk/attack_data) — Open attack-related log datasets; review file rights and safe handling.

## Guided SOC lab

**Scenario:** A single source IP fails many username attempts; a few later succeed.

**Steps**

1. Create counts by source IP and user.
2. Identify whether failures are concentrated in one user or spread across many.
3. Check successful logins and local business context.
4. Write an evidence-based escalation recommendation.

**Submit as evidence:** Query file, timeline and analyst case note.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What pattern suggests password spraying?
2. Why do service accounts need special handling?
3. What evidence would you obtain before resetting credentials?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
