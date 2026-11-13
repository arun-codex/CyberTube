import { test, expect } from '@playwright/test';
import { STORYTELLING_MASTERCLASS_COURSE } from '../src/data/storytelling-masterclass-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';

test.describe('Storytelling Masterclass Course Integration', () => {
  const courseSlug = 'free-storytelling-masterclass';

  test('1. Course model integrity: 5 levels and 100 lessons', async () => {
    expect(STORYTELLING_MASTERCLASS_COURSE.slug).toBe(courseSlug);
    expect(STORYTELLING_MASTERCLASS_COURSE.modules.length).toBe(5);

    const lessons = getCourseLessons(STORYTELLING_MASTERCLASS_COURSE);
    expect(lessons.length).toBe(100);

    const course = getCourseBySlug(courseSlug);
    expect(course).toBeDefined();
    expect(course?.modules.length).toBe(5);
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

  test('3. /courses/free-storytelling-masterclass loads all 5 levels and first lesson', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toHaveText('Free Storytelling Masterclass (20-Week Comprehensive Plan)');
    await expect(page.locator('text=100 lessons').first()).toBeVisible();

    await expect(page.locator('text=Level 1: Foundations (Weeks 1–4)').first()).toBeVisible();
    await expect(page.locator('text=Level 2: Character and Narrative Development (Weeks 5–8)').first()).toBeVisible();
    await expect(page.locator('text=Level 3: Emotion, Tension and Narrative Control (Weeks 9–12)').first()).toBeVisible();
    await expect(page.locator('text=Level 4: Real-life, Oral, Visual and Persuasive Formats (Weeks 13–16)').first()).toBeVisible();
    await expect(page.locator('text=Level 5: Advanced Narrative Craft and Capstone (Weeks 17–20)').first()).toBeVisible();

    await expect(page.locator('h2').first()).toContainText('Week 01 • Lesson 1: Story versus information');
  });

  test('4. Lesson navigation works across lessons', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const nextBtn = page.locator('a:has-text("Next:"), button:has-text("Next:")').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(page).toHaveURL(/w01-l2-the-audience/);
    await expect(page.locator('h2').first()).toContainText('Week 01 • Lesson 2: The audience');
  });
});
