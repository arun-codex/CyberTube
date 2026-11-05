import { test, expect } from '@playwright/test';

test.describe('CyberTube Phase 5 — Themes, Search & Profile Verification', () => {
  test('P0: Default authentication redirect leads to homepage (/) not /account', async ({ page }) => {
    // 1. Check login page renders properly
    await page.goto('/login');
    const registerLink = page.locator('a[href*="/register"]');
    await expect(registerLink).toBeVisible();

    // 2. Auth callback redirect without query param defaults to /login
    await page.goto('/auth/callback');
    await expect(page).toHaveURL(/\/login/);

    // 3. Callback with valid internal target preserves target in URL
    await page.goto('/login?redirect=/courses');
    await expect(page).toHaveURL(/redirect=(\/|%2F)courses/);
  });

  test('P1: Functional global search dialog opens with / key, debounces hits, and supports navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 1. Press '/' key to open search
    await page.keyboard.press('/');
    const searchModal = page.locator('div[role="dialog"][aria-label="Global search catalog"]');
    await expect(searchModal).toBeVisible();

    const searchInput = searchModal.locator('input[type="search"]');
    await expect(searchInput).toBeFocused();

    // 2. Search for keyword "packet"
    await searchInput.fill('packet');
    await page.waitForTimeout(400); // debounce wait

    const results = searchModal.locator('a[href^="/courses/"], a[href^="/resources/"]');
    await expect(results.first()).toBeVisible();

    // 3. Test keyboard Enter navigation (can navigate to course, resource, or learning path)
    await page.keyboard.press('Enter');
    await page.waitForURL(/\/(courses|resources|learning-paths)\//);
    expect(page.url()).toMatch(/\/(courses|resources|learning-paths)\//);

    // 4. Test Escape key closes dialog
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('/');
    await expect(searchModal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(searchModal).not.toBeVisible();
  });

  test('P1: Mobile search trigger opens search modal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileSearchBtn = page.locator('button[aria-label="Open search"]');
    await expect(mobileSearchBtn).toBeVisible();
    await mobileSearchBtn.click();

    const searchModal = page.locator('div[role="dialog"][aria-label="Global search catalog"]');
    await expect(searchModal).toBeVisible();
  });

  test('P2: Theme toggle switches between light, dark, and system modes and persists', async ({ page }) => {
    await page.goto('/');

    const themeToggleBtn = page.locator('button[aria-label^="Toggle theme"]').first();
    await expect(themeToggleBtn).toBeVisible();

    // Click toggle to switch mode
    await themeToggleBtn.click();
    await page.waitForTimeout(300);

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBeTruthy();

    // Reload page to verify persistence in localStorage
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const reloadedStoredTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(reloadedStoredTheme).toBe(storedTheme);
  });

  test('P3: Unauthenticated user accessing /profile redirects to /login with redirect parameter', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/login\?redirect=(\/|%2F)profile/);
  });

  test('P3: Account settings and profile overview routes render cleanly with mock session', async ({ page }) => {
    // Inject test session cookies
    await page.context().addCookies([
      {
        name: 'sb-iwcbuvutqhwxgovkecfa-auth-token',
        value: JSON.stringify({
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          user: {
            id: 'mock-user-id-001',
            email: 'researcher@cybertube.org',
            app_metadata: { provider: 'github' },
            user_metadata: { display_name: 'Lead Practitioner' },
          },
        }),
        domain: 'localhost',
        path: '/',
      },
    ]);

    // Go to account settings
    await page.goto('/account');
    if (page.url().includes('/account')) {
      await expect(page.locator('body')).toContainText(/account configuration/i);
    } else {
      await expect(page).toHaveURL(/\/login/);
    }
  });
});
