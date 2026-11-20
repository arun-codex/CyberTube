# Module 03 — SOC Alert Triage and Investigation Workflow

**Track:** Foundation  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M02  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Perform consistent evidence-first triage while avoiding unjustified severity claims.

## 4 video-guided lessons

### 03.1 Alert queue and SLAs

- **Before watching:** identify one thing you already know and one question you want answered about alert queue and slas.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 03.2 True positive/false positive versus benign positive

- **Before watching:** identify one thing you already know and one question you want answered about true positive/false positive versus benign positive.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 03.3 Scope, impact, confidence and timelines

- **Before watching:** identify one thing you already know and one question you want answered about scope, impact, confidence and timelines.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 03.4 Escalation, note-taking and containment authorization

- **Before watching:** identify one thing you already know and one question you want answered about escalation, note-taking and containment authorization.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Microsoft Security Community: A Day in the SOC Analyst Life](https://www.youtube.com/watch?v=HloK6Ay4h1M)** — Linked from Microsoft Sentinel skill-up curriculum.
- **[Microsoft Sentinel for Beginners: Full Hands-on SIEM Masterclass — A Guide to Cloud & AI](https://www.youtube.com/watch?v=NJlaqBaqahc&t=1555s)** — Workspace, connectors, analytics, incidents, hunting, watchlists, intel; relevant chapter begins at ~25:55.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.
- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.

## Guided SOC lab

**Scenario:** An alert reports 12 failed logins and 1 success for a training account.

**Steps**

1. Write an initial alert summary and list evidence needed before deciding.
2. Identify the host, user, IP, timeframe, and any successful session.
3. Document two plausible non-malicious explanations and two threat hypotheses.
4. Choose close, monitor or escalate with confidence and reason.

**Submit as evidence:** Triage worksheet with timestamps and escalation decision.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. When is a suspicious login not an incident?
2. What evidence raises severity?
3. What information must be in an escalation?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
