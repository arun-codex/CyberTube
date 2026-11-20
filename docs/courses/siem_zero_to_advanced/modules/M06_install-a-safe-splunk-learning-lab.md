# Module 06 — Install a Safe Splunk Learning Lab

**Track:** Splunk  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M01-M05  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Deploy and validate a personal non-production Splunk instance for sample data.

## 4 video-guided lessons

### 06.1 Splunk Enterprise components: search, index, forward

- **Before watching:** identify one thing you already know and one question you want answered about splunk enterprise components: search, index, forward.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 06.2 Local VM versus workstation installation

- **Before watching:** identify one thing you already know and one question you want answered about local vm versus workstation installation.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 06.3 UI, indexes, users and least privilege

- **Before watching:** identify one thing you already know and one question you want answered about ui, indexes, users and least privilege.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 06.4 Cost/licensing, storage and lab cleanup

- **Before watching:** identify one thing you already know and one question you want answered about cost/licensing, storage and lab cleanup.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=994s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~16:34.
- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=1486s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~24:46.
- **[Grey’s Academy 101: Getting Started with Splunk — Splunk](https://www.youtube.com/watch?v=YM3UWuvIJyc)** — Publisher-linked introductory video.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk official free training](https://www.splunk.com/en_us/training/free-courses/overview.html) — Free self-paced training catalogue; account registration may apply.
- [Splunk documentation](https://help.splunk.com/) — Free documentation.

## Guided SOC lab

**Scenario:** Build a self-contained lab that accepts only the training datasets.

**Steps**

1. Choose a supported personal VM or host per vendor instructions.
2. Download Splunk only from its official website; choose an authorized trial/free path.
3. Keep network exposure limited to your machine and use a strong account password.
4. Create index soc_lab (if allowed), import one synthetic event, and verify it appears.

**Submit as evidence:** Screenshot of an indexed test event and topology/cleanup notes.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What is an indexer?
2. What is the risk of opening the web console to the Internet?
3. Why plan data retention?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
