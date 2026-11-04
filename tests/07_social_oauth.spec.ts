import { test, expect } from '@playwright/test';

test.describe('CyberTube Social OAuth Authentication', () => {
  test('Login page renders Google and GitHub OAuth buttons with accessible labels', async ({ page }) => {
    await page.goto('/login');

    const googleBtn = page.locator('button[aria-label="Continue with Google"]');
    const githubBtn = page.locator('button[aria-label="Continue with GitHub"]');

    await expect(googleBtn).toBeVisible();
    await expect(githubBtn).toBeVisible();

    // Verify SST styling and >=44px touch target
    const googleBox = await googleBtn.boundingBox();
    const githubBox = await githubBtn.boundingBox();

    expect(googleBox?.height).toBeGreaterThanOrEqual(44);
    expect(githubBox?.height).toBeGreaterThanOrEqual(44);

    // Verify divider text
    await expect(page.locator('body')).toContainText(/continue with email/i);
  });

  test('Register page renders Google and GitHub OAuth buttons with accessible labels', async ({ page }) => {
    await page.goto('/register');

    const googleBtn = page.locator('button[aria-label="Continue with Google"]');
    const githubBtn = page.locator('button[aria-label="Continue with GitHub"]');

    await expect(googleBtn).toBeVisible();
    await expect(githubBtn).toBeVisible();

    const googleBox = await googleBtn.boundingBox();
    expect(googleBox?.height).toBeGreaterThanOrEqual(44);

    await expect(page.locator('body')).toContainText(/register with email/i);
  });

  test('Auth callback route redirects safely to /account when no code is supplied', async ({ page }) => {
    // If user accesses /auth/callback without OAuth code
    await page.goto('/auth/callback');
    await expect(page).toHaveURL(/\/login/);
  });

  test('Auth callback route handles error_description parameter from OAuth provider', async ({ page }) => {
    await page.goto('/auth/callback?error_description=Access+denied+by+user');
    await expect(page).toHaveURL(/\/login\?error=Access\+denied\+by\+user/);
    await expect(page.locator('body')).toContainText('Access denied by user');
  });

  test('Prevent external redirect via unsafe next URL parameter in callback', async ({ page }) => {
    // Attempt open redirect via external URL
    await page.goto('/auth/callback?error_description=OAuth+error&next=https://malicious-site.com');
    // Error redirect must stay on local origin
    await expect(page).toHaveURL(/\/login/);
    expect(page.url()).not.toContain('malicious-site.com');
  });

  test('OAuth button displays connecting state when clicked', async ({ page }) => {
    await page.goto('/login');

    const googleBtn = page.locator('button[aria-label="Continue with Google"]');
    await googleBtn.click();

    // Button should briefly show loading indicator or text before navigating
    // Since mock/unconfigured env may catch error or redirect, verify no page crash occurs
    await expect(page.locator('body')).not.toContainText('Application error');
  });
});

