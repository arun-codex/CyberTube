import { test, expect, devices } from '@playwright/test';

test.describe('English Communication Course Browser Verification Suite', () => {
  test('Desktop: Course catalog and course detail page render with zero quizzes', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // 1. Visit Courses catalog
    await page.goto('http://localhost:3000/courses', { waitUntil: 'domcontentloaded' });
    const courseCard = page.locator('text=English Communication for Cybersecurity: Zero to Advanced').first();
    await expect(courseCard).toBeVisible();

    // Verify badges and metrics on catalog
    const catalogHtml = await page.content();
    expect(catalogHtml.toLowerCase()).toContain('120 lessons');
    expect(catalogHtml).toContain('beginner');
    expect(catalogHtml).not.toContain('Module Quizzes');

    // 2. Navigate to course detail page
    await page.goto('http://localhost:3000/courses/english-communication-for-cybersecurity-zero-to-advanced', {
      waitUntil: 'domcontentloaded',
    });

    // Check course header
    await expect(page.locator('h1').first()).toContainText('English Communication for Cybersecurity: Zero to Advanced');

    // Verify 30 modules are listed in curriculum
    const pageText = await page.textContent('body');
    expect(pageText).toContain('Module 01: Sound Foundations for Security Terms');
    expect(pageText).toContain('Module 30: Integrated SOC Communication Capstone');

    // Strict requirement: NO quiz tabs, quiz buttons, or quiz gates
    expect(pageText).not.toContain('Module Quiz');
    expect(pageText).not.toContain('Start Assessment Quiz');
    expect(pageText).not.toContain('Take Module Quiz');
    expect(pageText).not.toContain('locked-lesson-overlay');

    // Check YouTube video player is present
    const iframe = page.locator('iframe[src*="youtube.com"]');
    await expect(iframe).toBeVisible();

    // Check Practical Workshop tab/section exists
    const labButton = page.locator('button:has-text("Practical Lab"), button:has-text("Lab"), button:has-text("Workshop")').first();
    if (await labButton.isVisible()) {
      await labButton.click();
      await page.waitForTimeout(300);
      const updatedText = await page.textContent('body');
      expect(updatedText).toContain('Practical Communication Workshop');
    }

    // Check Capstone tab exists
    const capstoneTab = page.locator('button:has-text("Capstone")').first();
    if (await capstoneTab.isVisible()) {
      await capstoneTab.click();
      await page.waitForTimeout(300);
      const capstoneContent = await page.textContent('body');
      expect(capstoneContent).toContain('Capstone: Full Lifecycle SOC Incident Communication');
    }
  });

  test('Mobile (iPhone 13 / 390x844): Responsive layout, navigation, and player with zero quizzes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // 1. Visit Course page directly on mobile
    await page.goto('http://localhost:3000/courses/english-communication-for-cybersecurity-zero-to-advanced', {
      waitUntil: 'domcontentloaded',
    });

    // Verify mobile header
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('English Communication');

    // Verify YouTube iframe is responsively embedded
    const iframe = page.locator('iframe[src*="youtube.com"]');
    await expect(iframe).toBeVisible();

    // Verify no horizontal overflow causing body blowout
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // Verify strict absence of quizzes on mobile
    const mobileContent = await page.content();
    expect(mobileContent).not.toContain('Module Quiz');
    expect(mobileContent).not.toContain('Start Assessment Quiz');
    expect(mobileContent).not.toContain('Take Module Quiz');
  });
});
