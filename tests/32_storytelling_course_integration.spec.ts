import { test, expect } from '@playwright/test';
import { STORYTELLING_MASTERCLASS_COURSE } from '../src/data/storytelling-masterclass-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';
import { STORYTELLING_QUIZ_KEYS } from '../src/lib/courses/storytelling-quiz-evaluator';

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
        // Client model omits correctAnswerIndex for security
        expect(q.correctAnswerIndex).toBeUndefined();
      }

      // Server answer keys exist for every module
      const serverKey = STORYTELLING_QUIZ_KEYS[mod.id];
      expect(serverKey).toBeDefined();
      expect(serverKey.questions.length).toBe(10);
      for (const sk of serverKey.questions) {
        expect(sk.correctAnswerIndex).toBeGreaterThanOrEqual(0);
        expect(sk.correctAnswerIndex).toBeLessThan(4);
        expect(sk.explanation).toBeDefined();
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
    const iframe = page.locator('iframe[src*="youtube.com/embed/"]');
    await expect(iframe).toBeVisible();
  });

  test('5. Module Quiz tab renders 10 questions and evaluates passing score via server API', async ({ page }) => {
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

    // Verify questions and radio buttons are rendered
    const radioInputs = page.locator('input[type="radio"]');
    await expect(radioInputs).toHaveCount(40); // 10 questions * 4 options

    // Submit button is visible
    const submitBtn = page.locator('button:has-text("Submit Quiz")').first();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeDisabled(); // disabled until all 10 answered
  });

  test('6. Server Quiz submission and unlocking: Week 2 unlocks when Week 1 passes', async ({ request, page }) => {
    // 1. Submit quiz to API with passing answers
    const mod1Key = STORYTELLING_QUIZ_KEYS['mod-storytelling-w01'];
    const passingAnswers: Record<number, number> = {};
    mod1Key.questions.forEach((q) => {
      passingAnswers[q.index] = q.correctAnswerIndex;
    });

    const res = await request.post('/api/courses/storytelling/quiz/submit', {
      data: {
        courseId: 'course-free-storytelling-masterclass',
        moduleId: 'mod-storytelling-w01',
        selectedAnswers: passingAnswers,
      },
    });

    expect(res.ok()).toBeTruthy();
    const result = await res.json();
    expect(result.success).toBe(true);
    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.questionResults.length).toBe(10);

    // 2. Load page with pre-seeded quiz pass in localStorage
    await page.addInitScript(() => {
      const state = {
        courseId: 'course-free-storytelling-masterclass',
        completedLessonIds: ['les-storytelling-w01-l1'],
        quizScores: { 'mod-storytelling-w01': 100 },
        quizAttempts: {
          'mod-storytelling-w01': [{
            attemptNumber: 1,
            selectedAnswers: {},
            score: 100,
            passed: true,
            submittedAt: new Date().toISOString()
          }]
        }
      };
      localStorage.setItem('cybertube_course_progress_v1_course-free-storytelling-masterclass', JSON.stringify(state));
    });

    await page.goto(`/courses/${courseSlug}?lesson=w02-l1-collect-observations`);
    await page.waitForLoadState('domcontentloaded');

    // Week 2 lesson should now be accessible and unlocked (no locked-lesson-overlay)
    const lockedOverlay = page.locator('[data-testid="locked-lesson-overlay"]');
    await expect(lockedOverlay).not.toBeVisible();

    // Embedded video for Week 2 Lesson 1 is visible
    const iframe = page.locator('iframe[src*="youtube.com/embed/"]');
    await expect(iframe).toBeVisible();
  });

  test('7. Direct URL navigation to locked lesson renders locked overlay', async ({ page }) => {
    // Clear localStorage to ensure user has 0 quiz scores
    await page.addInitScript(() => {
      localStorage.clear();
    });

    // Directly navigate to Week 2 lesson
    await page.goto(`/courses/${courseSlug}?lesson=w02-l1-collect-observations`);
    await page.waitForLoadState('domcontentloaded');

    // Locked overlay must be displayed
    const lockedOverlay = page.locator('[data-testid="locked-lesson-overlay"]');
    await expect(lockedOverlay).toBeVisible();
    await expect(lockedOverlay).toContainText('Module Content Locked');
    await expect(lockedOverlay).toContainText('Week 01 — What is a story?');

    // Video iframe must NOT be displayed
    const iframe = page.locator('iframe[src*="youtube.com/embed/"]');
    await expect(iframe).not.toBeVisible();
  });
});
