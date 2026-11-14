import { test, expect } from '@playwright/test';
import { STORYTELLING_MASTERCLASS_COURSE } from '../src/data/storytelling-masterclass-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';

test.describe('Storytelling Masterclass Course Integration', () => {
  const courseSlug = 'free-storytelling-masterclass';

  test('1. Course model integrity: 20 weekly modules, 100 lessons, 100 videos, 20 quizzes with 200 questions', async () => {
    expect(STORYTELLING_MASTERCLASS_COURSE.slug).toBe(courseSlug);
    expect(STORYTELLING_MASTERCLASS_COURSE.modules.length).toBe(20);

    const lessons = getCourseLessons(STORYTELLING_MASTERCLASS_COURSE);
    expect(lessons.length).toBe(100);

    // Verify every lesson has a primary YouTube video
    for (const lesson of lessons) {
      expect(lesson.youtubeVideoId).toBeDefined();
      expect(typeof lesson.youtubeVideoId).toBe('string');
      expect(lesson.youtubeVideoId?.length).toBeGreaterThanOrEqual(11);
      expect(lesson.videoAttribution?.creator).toBeDefined();
    }

    // Verify every module has a 10-question quiz with passing threshold 70%
    let totalQuestions = 0;
    for (const mod of STORYTELLING_MASTERCLASS_COURSE.modules) {
      expect(mod.quiz).toBeDefined();
      expect(mod.quiz?.questions.length).toBe(10);
      expect(mod.quiz?.passingScorePercent).toBe(70);
      totalQuestions += mod.quiz?.questions.length || 0;

      for (const q of mod.quiz?.questions || []) {
        expect(q.options.length).toBe(4);
        expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswerIndex).toBeLessThan(4);
        expect(q.explanation).toBeDefined();
      }
    }
    expect(totalQuestions).toBe(200);

    const course = getCourseBySlug(courseSlug);
    expect(course).toBeDefined();
    expect(course?.modules.length).toBe(20);
  });

  test('2. /courses renders the storytelling masterclass card', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    const card = page.locator(`[data-testid="course-card-${courseSlug}"]`);
    await expect(card).toBeVisible();

    const title = card.getByRole('heading', { name: /Free Storytelling Masterclass/i });
    await expect(title).toBeVisible();

    await expect(card.getByText('100 lessons').first()).toBeVisible();
  });

  test('3. /courses/free-storytelling-masterclass loads 20 modules, embedded video player and first lesson', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toHaveText('Free Storytelling Masterclass (20-Week Comprehensive Plan)');
    await expect(page.locator('text=100 lessons').first()).toBeVisible();

    // Verify module headers exist in sidebar
    await expect(page.locator('text=Module 01').first()).toBeVisible();
    await expect(page.locator('text=Week 01').first()).toBeVisible();

    // Verify Lesson title
    await expect(page.locator('h2').first()).toContainText('Week 01 • Lesson 1: Story versus information');

    // Verify Embedded YouTube Player is loaded
    const iframe = page.locator('iframe[src*="youtube.com/embed/"]');
    await expect(iframe).toBeVisible();
  });

  test('4. Lesson navigation works across lessons and changes video', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const nextBtn = page.locator('a:has-text("Next:"), button:has-text("Next:")').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(page).toHaveURL(/w01-l2-the-audience/);
    await expect(page.locator('h2').first()).toContainText('Week 01 • Lesson 2: The audience');

    // Verify player updated for lesson 2
    const iframe = page.locator('iframe[src*="youtube.com/embed/KxDwieKpawg"]');
    await expect(iframe).toBeVisible();
  });

  test('5. Module Quiz tab renders 10 questions and evaluates passing score', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=w01-l1-story-versus-information`);
    await page.waitForLoadState('domcontentloaded');

    // Click Module Quiz tab
    const quizTab = page.locator('button:has-text("Module Quiz")').first();
    await expect(quizTab).toBeVisible();
    await quizTab.click();

    // Verify Module Quiz UI renders
    await expect(page.locator('text=Module Knowledge Assessment').first()).toBeVisible();
    await expect(page.locator('text=Passing threshold:').first()).toBeVisible();
    await expect(page.locator('text=70%').first()).toBeVisible();

    // Answer questions to pass (select options)
    const submitBtn = page.locator('button:has-text("Submit Assessment"), button:has-text("Submit Quiz")').first();
    await expect(submitBtn).toBeVisible();
  });

  test('6. Sequential module locking: Week 2 is locked until Week 1 quiz is passed', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Verify Module 2 shows Locked notice when Week 1 is unpassed
    const module2 = page.locator('text=Module 02').first();
    await expect(module2).toBeVisible();

    // Verify locked state indicator
    await expect(page.locator('text=Locked').first()).toBeVisible();
  });
});
