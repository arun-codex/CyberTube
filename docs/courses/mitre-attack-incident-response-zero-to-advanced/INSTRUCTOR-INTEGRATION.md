# CyberTube / LMS / Cluelabs Content Studio Integration Guide

## Import model
Every `modules/NN-*.md` is a standalone module. Use the frontmatter to map title, level, course phase, estimated hours and status. `README.md` is the master sequence. `VIDEO-LIBRARY.md` is the canonical link register.

## Recommended LMS data model
- Course: `mitre-attack-incident-response-zero-to-advanced` (draft slug)
- Module: index, title, stage, prerequisites, outcomes, video references, lesson sections, lab, quiz, rubric.
- Lesson: lesson number, title, learning aim, one video anchor, reading, guided practice and evidence checkpoint.
- Video reference: link URL, curator, verified-on, provider, accessibility/captions, optional timecode, last-reviewed version.
- Activity: synthetic dataset URL/file licence, worksheet, expected independent evidence, hints.
- Assessment: editable rubric, attempt policy, manual review option, allowed AI, alternative evidence route.

## Cluelabs Content Studio storyboard plan (not automatically published)
1. **Done — draft storyboard project created:** `MITRE ATT&CK for Incident Response — Zero to Advanced (30 Modules)` (Content Studio project ID **2483**). It is separate from the existing Incident Response and SIEM projects; those were not modified.
2. **Done — 30 module-outline slides** with title, video-reference notes and screen text are saved and read-back verified. Full individual lesson/storyboard slide expansion, media creation, and video-link QA are still pending.
3. Use storyboard `notes` to reference the external YouTube video and free resources, not copied scripts/transcripts.
4. Record accessibility and licence checks before narration, graphics or captions are generated.
5. Avoid any billable narration/media generation until specifically approved. Publish only after course-owner review.

## Source rights
YouTube availability to watch does not authorize copying, extracting full transcripts or rehosting videos. Use legitimate links or embeds and separately written original instructional text. The original markdown course is not MITRE-endorsed, CISA-endorsed or NIST-endorsed. Follow MITRE trademark/branding terms.

## Pre-release QA gates
- All 30 module files exist, valid UTF-8, correct module numbers and nonempty lessons.
- Every module has >=1 actual video/playlist URL, no placeholders and an evidence-focused lab.
- Primary video independently reviewed for depth and relevant segments before published launch.
- AT&CK Enterprise version labels and 2026 taxonomy accurate; NIST SP 800-61r3 cited.
- Public lab data licences and external access, security, accessibility and assessment validated.
- Run local learner pilot for 2–3 modules, correct times and remove broken links.
- No production deploy/publish without the owner's explicit permission.

## Agentic Course Redesign boundary
This is an *independent original working draft*, not a completed run of the gated course-redesign system. Before using that framework to process a lecturer's existing protected materials or approve/release a course, finish its material/environment eligibility, approved-source manifest, run brief, research/design gates and exact-target permissions. No such approval or formal acceptance is claimed here.
