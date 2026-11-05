import { test, expect } from '@playwright/test';

test.describe('Phase 12 — Learning Paths, Ethics, Dark Mode & Avatar Storage', () => {
  test('Learning paths index route (/learning-paths) renders all paths', async ({ page }) => {
    await page.goto('/learning-paths');
    await expect(page).toHaveURL('/learning-paths');

    const heading = page.locator('h1');
    await expect(heading).toContainText(/Learning Pathways/i);

    // Verify presence of the 3 primary pathways
    await expect(page.locator('text=Cybersecurity Practitioner Foundations')).toBeVisible();
    await expect(page.locator('text=Web & Application Security Specialist')).toBeVisible();
    await expect(page.locator('text=Ethical Hacking & Offensive Security Operations')).toBeVisible();
  });

  test('Learning path detail route (/learning-paths/[slug]) displays stages, playlists and exercises', async ({ page }) => {
    await page.goto('/learning-paths/cybersecurity-foundations');
    await expect(page).toHaveURL('/learning-paths/cybersecurity-foundations');

    const title = page.locator('h1');
    await expect(title).toContainText('Cybersecurity Practitioner Foundations');

    // Check Stage 01, exercises and verified playlist sections
    await expect(page.locator('text=Stage 01')).toBeVisible();
    await expect(page.locator('text=Networking Fundamentals')).toBeVisible();
    await expect(page.locator('text=Capture and Dissect a Three-Way Handshake')).toBeVisible();
    await expect(page.locator('text=CCNA 200-301 Networking Master Course')).toBeVisible();
  });

  test('Ethics and Responsible Learning page (/ethics) renders conduct policy', async ({ page }) => {
    await page.goto('/ethics');
    await expect(page).toHaveURL('/ethics');

    const heading = page.locator('h1');
    await expect(heading).toContainText(/Ethics & Responsible Learning/i);
    await expect(page.locator('text=Explicit Written Authorization')).toBeVisible();
    await expect(page.locator('text=Responsible Disclosure Guidelines')).toBeVisible();
  });

  test('Header includes Learning Paths in primary desktop navigation', async ({ page }) => {
    await page.goto('/');
    const navLink = page.locator('nav a[href="/learning-paths"]');
    await expect(navLink).toBeVisible();
    await expect(navLink).toContainText('Learning Paths');
  });

  test('Dark mode tokens render on homepage hero with dark theme', async ({ page }) => {
    await page.goto('/');

    // Toggle theme button to switch from light to dark
    const themeBtn = page.locator('button[aria-label^="Toggle theme"]').first();
    await themeBtn.click();
    await page.waitForTimeout(300);

    // Verify html tag has class 'dark'
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Hero section should have dark background class
    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveClass(/dark:bg-\[#121A26\]/);
  });

  test('Avatar API provides GET route for signed URL resolution', async ({ request }) => {
    // Unauthenticated GET request to /api/user/avatar returns 401
    const res = await request.get('/api/user/avatar');
    expect(res.status()).toBe(401);
  });
});
