# Production Deployment Checklist — Linux Zero to Advanced

## Database & Cloud State (Supabase)
- [x] Course record exists with UUID `d7a00000-0000-4000-8000-000000000001`.
- [x] Slug set to `linux-zero-to-advanced` with status = `published`.
- [x] Exactly 24 course modules inserted in sequential order (`order_index` 1 to 24).
- [x] Exactly 55 lessons inserted with valid foreign keys (`module_id`) and video IDs.
- [x] Row Level Security (RLS) active: public read allowed for published courses, modules, and lessons.
- [x] User progress tracking tables (`user_course_progress`, `user_lesson_progress`, `user_quiz_attempts`) guarded by auth RLS policies.

## Application & Codebase Integrity
- [x] Static course registered in `src/data/courses.ts` (`LINUX_ZERO_TO_ADVANCED_COURSE`).
- [x] Course slug unique across all catalog entries.
- [x] Dynamic route `/courses/linux-zero-to-advanced` resolves correctly via `getCourseBySlugWithDb`.
- [x] TypeScript compilation: `npx tsc --noEmit` exits with 0 errors.
- [x] Full test suite (`npm test`) passes 100% across all unit, integration, and security checks.
- [x] Dedicated test suite `test/windows-security-course.test.ts` and `test/study-library.test.ts` pass.

## Learner Experience & Edge Cases
- [x] Video Player: Embedded YouTube iframe with fallback link to YouTube.
- [x] Quiz Component: Interactive quiz with scoring, attempt recording, and explanations.
- [x] Practical Lab Component: Step-by-step collapsible tasks with completion checkboxes.
- [x] Capstone View: 100-point rubric breakdown and submission section prompts.
- [x] Mobile Responsiveness: Clean drawer navigation and fluid video container on narrow viewports.
