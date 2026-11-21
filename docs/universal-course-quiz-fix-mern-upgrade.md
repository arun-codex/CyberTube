# Universal Course Quiz Fix + MERN Playlist Upgrade (2026-11-21)

## Root cause and fix

Previously, \`ModuleQuizView\` **always** POSTed every course's answers to \`/api/courses/storytelling/quiz/submit\`. The Storytelling endpoint correctly refuses unrelated course IDs and has strict prerequisite checks. Linux, Windows, Cybersecurity, SIEM, Incident Response, and other ordinary course quizzes therefore received **400 Invalid course-id** instead of grades.

**Correction:**
- The shared quiz chooses its endpoint by \`courseSlug\`:
  - Protected Storytelling Masterclass -> **existing** \`/api/courses/storytelling/quiz/submit\`. Its prerequisite enforcement, trusted keys, idempotency and verification are unchanged.
  - Other courses -> **new** \`/api/courses/quiz/submit\`, which loads authoritative, published course/module questions, validates every answer and grades on the server. Client scores are never trusted.
- Missing or malformed answer keys give a meaningful 422, not a fabricated passing mark.
- Network/server failure leaves selected answers intact and displays an explicit error. No offline/client-side grade is silently substituted.
- Existing client-side attempt display and best quiz scores continue to work for guests.
- For signed-in users, general-course best scores are now saved in the existing owner-scoped, RLS-protected \`user_generic_progress\` table and reloaded on other devices. This is a **self-assessed learning record**, not a cryptographically tamper-proof certificate; the table is writable by the authenticated user under its current policy.
- No new database table or privileged service-role key is required.
- The general endpoint never accepts Storytelling requests.

### Navigation improvements

- Clicking **Start Quiz** in the curriculum changes to the right lesson/module's quiz tab, updates the URL \`?lesson=...&tab=quiz\`, hides the video above the assessment, scrolls the quiz into view, and focuses it for keyboard users.
- Direct quiz URLs and prerequisite **Go to Required Quiz** links use the same tab behavior.
- Curriculum quiz entry rows are native accessible buttons, not clickable \`div\` elements.
- Reduced-motion preference suppresses smooth scrolling on quiz opening.
- The passing-score message no longer says all courses have sequential locking. Only Storytelling currently enforces sequential prerequisites.

## Supplied MERN playlist: catalog enhancement

The supplied link \`https://www.youtube.com/playlist?list=PLQl7ZDyS2qk8\` was **already stored** on the MERN course in \`src/data/courses.ts\`.

The live YouTube playlist feed could not be independently fetched or validated through the available sources, and there is no active \`course_playlist_sources\` record for this ID in the connected Supabase project. The course intentionally retains only the **three existing cataloged video IDs**:

1. \`fFVZ9xbyBlc\`: course overview (24 min)
2. \`aqtA2zHURbg\`: developer foundations (26 min)
3. \`PNQiabb5ZjY\`: web basics (119 min)

The three IDs are existing repo metadata, **not newly verified YouTube playlist contents**. Do not claim an exhaustive playlist import or change these IDs without checking the source.

### Upgraded MERN course structure

| Module | Content | Assessment |
| --- | --- | --- |
| 1. MERN architecture and developer foundations | Two source catalog videos, key concepts, project structure and environment exercises | 3 questions |
| 2. Browser-to-API web foundations | One source catalog video, HTTP and semantic web exercises | 3 questions |
| 3. Guided MERN build, security and portfolio | Three **CyberTube-authored self-guided lessons without YouTube video**: React forms, Express/MongoDB CRUD API, security/AI capstone | 3 questions |

All guided lessons include introductions, key terminology, testable steps, practical exercises, security guidance and checklists. The content clearly differentiates source videos from CyberTube activities.

If the owner provides a working full playlist URL, validate the exact playlist via the YouTube Data API before activating playlist-sync. Existing \`/api/cron/sync-youtube-playlists\` requires \`YOUTUBE_API_KEY\`, \`CRON_SECRET\`, server credentials and an enabled Supabase playlist-source mapping. Do not seed an unverified playlist ID or silently deactivate lessons on a failed fetch.

## Safety and quality verification

- \`npm run test:course-quizzes\`: check Linux server grading, MERN grading, cross-course ID rejection, incomplete answers, Storytelling isolation, and quiz focus.
- \`npx tsx --test test/phase22-storytelling-quiz-security.test.ts\`: protect existing anti-forgery and prerequisite tests.
- \`npx tsc --noEmit\` and \`npm run build\`: compile and lint all Next.js routes.
- \`npx playwright test tests/38_universal_course_quiz.spec.ts\`: browser click-through and Linux real submission.
- Two-account cross-device score verification is a follow-up live environment check; do not label it verified by the unit tests alone.

## Branch review and production release

The old feature branches are mostly historical ancestors or were integrated using squash merges. A \`git merge\` of an old diverged branch can reintroduce old versions even if its feature is already on \`main\`. Check tip-to-tip differences, merged PRs, test status and security before merging anything. Do **not** indiscriminately merge unreviewed generated vendor bundles.

Production delivery requires:
1. Latest PR checks pass.
2. Merge PR into \`main\`.
3. Deploy the merged commit to the intended Vercel project.
4. Verify the production deployment is **READY** and serving the exact new commit.
5. Test a real signed-in Linux quiz, MERN quiz, and Storytelling prerequisite on the live domain.

GitHub merge or deployment request acceptance is not evidence that the site is live until READY is confirmed.
