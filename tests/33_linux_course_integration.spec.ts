import { test, expect } from '@playwright/test';
import { LINUX_ZERO_TO_ADVANCED_COURSE } from '../src/data/linux-zero-to-advanced-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';

test.describe('Linux Zero to Advanced Course Integration', () => {
  const courseSlug = 'linux-zero-to-advanced';

  test('1. Course model integrity: 24 modules, 55 lessons, 55 valid YouTube videos, 24 labs, 24 quizzes and capstone', async () => {
    expect(LINUX_ZERO_TO_ADVANCED_COURSE.slug).toBe(courseSlug);
    expect(LINUX_ZERO_TO_ADVANCED_COURSE.modules.length).toBe(24);
    expect(LINUX_ZERO_TO_ADVANCED_COURSE.track).toBe('cybersecurity');
    expect(LINUX_ZERO_TO_ADVANCED_COURSE.domains).toContain('fundamentals');

    const lessons = getCourseLessons(LINUX_ZERO_TO_ADVANCED_COURSE);
    expect(lessons.length).toBe(55);

    // Verify every lesson has a valid 11-char YouTube video ID and attribution
    const ytIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    for (const lesson of lessons) {
      expect(lesson.youtubeVideoId).toBeDefined();
      expect(lesson.youtubeVideoId).toMatch(ytIdRegex);
      expect(lesson.videoAttribution?.creator).toBeDefined();
      expect(lesson.objectives.length).toBeGreaterThan(0);
      expect(lesson.richContent).toBeDefined();
      expect(lesson.richContent?.stepByStepProcedures?.length).toBeGreaterThan(0);
    }

    // Verify all 24 modules have quizzes and practical labs
    let totalQuizQuestions = 0;
    for (const mod of LINUX_ZERO_TO_ADVANCED_COURSE.modules) {
      expect(mod.quiz).toBeDefined();
      expect(mod.quiz?.questions.length).toBe(3);
      expect(mod.quiz?.passingScorePercent).toBe(70);
      totalQuizQuestions += mod.quiz?.questions.length || 0;

      for (const q of mod.quiz?.questions || []) {
        expect(q.options.length).toBe(4);
        expect(q.correctAnswerIndex).toBeDefined();
        expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswerIndex).toBeLessThan(4);
        expect(q.explanation).toBeDefined();
      }

      expect(mod.practicalLab).toBeDefined();
      expect(mod.practicalLab?.tasks.length).toBeGreaterThan(0);
      expect(mod.practicalLab?.instructions.length).toBeGreaterThan(0);
    }
    expect(totalQuizQuestions).toBe(72);

    // Verify Module 24 has the capstone assessment
    const mod24 = LINUX_ZERO_TO_ADVANCED_COURSE.modules[23];
    expect(mod24.capstoneAssessment).toBeDefined();
    expect(mod24.capstoneAssessment?.rubric.length).toBe(5);
    expect(mod24.capstoneAssessment?.submissionSections.length).toBe(5);
    expect(mod24.capstoneAssessment?.totalMarks).toBe(100);
    expect(mod24.capstoneAssessment?.passingScore).toBe(75);

    // Verify getCourseBySlug retrieves the course
    const course = getCourseBySlug(courseSlug);
    expect(course).toBeDefined();
    expect(course?.modules.length).toBe(24);
  });

  test('2. /courses directory renders the Linux Zero to Advanced card', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    const card = page.locator(`[data-testid="course-card-${courseSlug}"]`);
    await expect(card).toBeVisible();

    const heading = card.getByRole('heading', { name: /Linux Zero/i });
    await expect(heading).toBeVisible();
  });

  test('3. /courses/linux-zero-to-advanced loads the universal course learning experience', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Header check
    await expect(page.locator('h1').first()).toContainText('Linux Zero');

    // Verify module navigation contains modules
    await expect(page.locator('text=Module 01: Linux basics').first()).toBeVisible();
    await expect(page.locator('text=Module 24: Final Linux').first()).toBeVisible();
  });
});
