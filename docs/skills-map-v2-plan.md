# CyberTube Skills Map v2 — product plan and implementation

## Problem and intended outcome

The original Skills Map showed 17 competencies with browser-only checkboxes. Learners could mark a skill as mastered without distinguishing between understanding a topic, completing a lab or independently performing a task. There was no career-specific prioritization, server progress, evidence log or next-action workflow.

The new Skills Map is a self-assessment and practice-planning dashboard. It should make it easier to answer: **What can I do, what should I learn next, and what practice demonstrates the skill?**

The score is **self-reported coverage**, not a hiring score or a verified certificate.

## Implemented in v2

| Priority | Change | Outcome |
| --- | --- | --- |
| P0 | Expand skill inventory from 17 to 29 | Windows, networking, defensive, offensive, cloud and soft skills in the existing validated 7-domain schema |
| P0 | Four proficiency levels | 0 Not started, 1 Learning, 2 Practiced, 3 Confident |
| P0 | Account-scoped server progress | Signed-in skills saved via authenticated API and existing RLS-protected \`user_generic_progress\` |
| P0 | Legacy guest migration | Previous \`cybertube_skills_completed\` checkmarks can be imported explicitly, never overwriting a cloud row |
| P0 | Personal role focus | All-round Security, SOC Analyst, Ethical Hacker, DFIR, Cloud Security, AppSec, GRC |
| P0 | Role gaps and next five actions | Prioritization highlights practice-ready skills and role-relevant skill gaps |
| P1 | Practical evidence notes | Up to 400 characters per skill, stored with level and update timestamp |
| P1 | Category coverage | Weighted proficiency percentages across seven skill areas |
| P1 | Skill detail expansion | Evidence rubric and existing verified/active study resource links |
| P1 | Search + filters | Filter category, level and selected career competencies |
| P1 | Export CSV | User can export own skill statuses, notes and last updated timestamp |
| P1 | Theme and accessibility | Uses site semantic light/dark tokens; responsive controls, labels and progress bars |
| P1 | Error handling | Prevents editing before cloud history loads; failed writes do not claim success |

### Proficiency rubric

- **Not started (0%)**: unfamiliar or not yet practiced.
- **Learning (33%)**: can explain key ideas with guidance.
- **Practiced (67%)**: completed a relevant legal, hands-on exercise.
- **Confident (100%)**: independently repeatable skill with explanation/evidence.

These values are deliberately not collapsed into a yes/no completion checkbox. Users should revisit their self-assessment as evidence changes.

### Career role coverage

The career focus is an editorial mapping of a curated subset of competencies, not an official labor-market specification. Users can switch tracks; changing focus does not erase their skill progress. The account's selected role is stored separately as \`entity_type='skill-goal'\`, \`entity_id='target-role'\`.

### Progress persistence

**Existing table:** \`public.user_generic_progress\` (no schema migration required).

- Skill records: \`entity_type='skill'\`, \`entity_id=<validated skill ID>\`, \`state_data={level,evidence,selfReported:true}\`, \`progress_percent\` 0/33/67/100, \`is_completed=(level===3)\`.
- Role record: \`entity_type='skill-goal'\`, \`entity_id='target-role'\`, \`state_data={roleId}\`.
- GET \`/api/skills/progress\` requires a valid Supabase user session, returns only that user's progress.
- POST validates action, skill identifier, integer level, evidence length or role identifier; derives user ID from server auth.
- PUT accepts an allowlisted set of completed IDs. Uses \`ignoreDuplicates:true\` to avoid replacing any existing server record, including deliberately incomplete ones.
- Anonymous users do not receive access to the cloud API. Their browser-local progress is isolated from signed-in state and requires an explicit import.
- Cloud failures are visible and do not silently mark changes as synced. Account-switch responses are guarded against stale cross-user updates.
- Existing role and course completion tables are not modified.

## User journeys

1. **New guest** opens \`/skills\`; sees 29 skills, sets a role, rates proficiencies and records practice evidence locally. A sign-in prompt explains cross-device sync.
2. **Returning learner** signs in; server progress loads and reflects other devices, with a visible sync indicator. They review category strengths and the target role's five suggested gaps.
3. **Legacy user** who previously checked skills locally is prompted to import the legacy checkmarks; existing server values always win.
4. **Career changer** switches from General to SOC or DFIR; curated focus coverage changes without modifying stored skill history. They open suggested skill cards and follow source links.
5. **Practice log** user expands a skill, reviews three measurable “what good looks like” criteria, chooses Practiced, adds a short note and confirms server save.
6. **Progress portability** user downloads CSV for self-review and mentoring. No automatic public badges or inflated employment claims are generated.

## Release verification

1. Validate all 29 skill IDs and the 7 category assignments against the original schema; check existing \`linkedResourceIds\` resolve.
2. Validate role mapping IDs and score math via \`npm run test:skills\`.
3. Run \`npx tsc --noEmit\` and \`npm run build\`.
4. Manually check desktop/mobile responsive grid and both light and dark themes.
5. Test guest changes and browser reload, then signed-in cross-device save/reload.
6. Test two-account isolation and stale requests while logging out/in.
7. Test API rejection for unknown skill ID, oversized notes and unauthenticated requests.
8. Test import when a cloud record already exists as incomplete (must stay incomplete).
9. Confirm sign-in routes, search/filter, CSV, source study links and error recovery.
10. Verify the **actual Vercel production deployment's commit**, not just a merged PR.

## Follow-on roadmap (not implemented yet)

- **P2**: Verified optional project portfolio attachments, with user-controlled storage and access rules. Never expose confidential incident evidence.
- **P2**: Curated capability-linked lab tasks, using existing labs metadata without claiming their provider completion was auto-verified.
- **P2**: Weekly learning plans, reminders and spaced repetition for per-skill evidence reviews.
- **P3**: Optional quizzes and practical assessments with carefully authored criteria and rubric scores.
- **P3**: Career comparisons based on separately reviewed employer/job requirements, clearly distinguished from self-assessment.

Avoid implying third-party certifications, TryHackMe completion, or job-readiness verification based only on self-entered data.
