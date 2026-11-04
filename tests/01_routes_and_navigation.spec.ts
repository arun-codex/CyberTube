import { test, expect } from '@playwright/test';

test.describe('CyberTube Routes & Navigation', () => {
  test('Home page loads with terminal hero and core sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CyberTube/i);

    // Hero title check
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Navigation links in header
    const nav = page.locator('header nav');
    await expect(nav).toBeVisible();
    await expect(page.locator('header nav a:has-text("Courses")')).toBeVisible();
    await expect(page.locator('header nav a:has-text("Discover")')).toBeVisible();
    await expect(page.locator('header nav a:has-text("Domains")')).toBeVisible();
    await expect(page.locator('header nav a:has-text("Saved")')).toBeVisible();
  });

  test('Course directory and course detail navigation', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.locator('h1')).toContainText(/Courses/i);

    // Click on the first course card
    const firstCourseLink = page.locator('a[href^="/courses/"]').first();
    await expect(firstCourseLink).toBeVisible();
    const href = await firstCourseLink.getAttribute('href');
    await firstCourseLink.click();

    await expect(page).toHaveURL(new RegExp(href!));
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Discover catalog route and domain filter links', async ({ page }) => {
    await page.goto('/discover');
    await expect(page.locator('h1')).toBeVisible();

    // Verify search input is present
    const searchInput = page.locator('input[placeholder*="Search" i], input[type="search"]').first();
    await expect(searchInput).toBeVisible();

    // Verify domains page
    await page.goto('/domains');
    await expect(page.locator('h1')).toContainText(/Domain/i);
    const domainCards = page.locator('a[href*="/discover?domain="]');
    await expect(domainCards.first()).toBeVisible();
  });

  test('Bookmarks route loads empty state cleanly without crashing', async ({ page }) => {
    await page.goto('/saved');
    await expect(page.locator('h1')).toContainText(/Saved|Bookmark/i);
    await expect(page.locator('body')).not.toContainText('Application error');
  });

  test('Auth pages load with proper forms and titles', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    await page.goto('/register');
    await expect(page.locator('input[name="displayName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Mobile drawer menu opens and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.locator('button[aria-label="Toggle mobile navigation menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Mobile nav overlay visible
    const mobileCoursesLink = page.locator('header a[href="/courses"]').filter({ hasText: 'Courses' });
    await expect(mobileCoursesLink.last()).toBeVisible();
  });
});
