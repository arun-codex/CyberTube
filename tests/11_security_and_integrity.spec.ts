import { test, expect } from '@playwright/test';

test.describe('Phase 7 — Security, Authorization & Data Integrity Verification', () => {
  test('Protected routes enforce authentication redirect', async ({ page }) => {
    // Attempt to access /account unauthenticated
    await page.goto('/account');
    await expect(page).toHaveURL(/.*login.*/);

    // Attempt to access /profile unauthenticated
    await page.goto('/profile');
    await expect(page).toHaveURL(/.*login.*/);

    // Attempt to access /admin unauthenticated
    await page.goto('/admin');
    await expect(page).toHaveURL(/.*login.*/);
  });

  test('Public routes allow anonymous access without credentials', async ({ page }) => {
    const publicRoutes = [
      '/',
      '/courses',
      '/courses/network-packet-analysis-masterclass',
      '/discover',
      '/resources/portswigger-sql-injection-lab',
      '/login',
      '/register'
    ];

    for (const route of publicRoutes) {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator('header')).toBeVisible();
    }
  });

  test('Avatar API rejects unauthenticated mutation attempts', async ({ request }) => {
    const response = await request.post('/api/user/avatar', {
      multipart: {
        file: {
          name: 'shell.php',
          mimeType: 'application/x-php',
          buffer: Buffer.from('<?php echo "exploit"; ?>'),
        },
      },
    });

    expect(response.status()).toBe(401);
  });

  test('OAuth callback route safely handles invalid / missing authorization code', async ({ page }) => {
    // Attempt callback with missing or bogus code
    const response = await page.goto('/auth/callback?code=invalid_bogus_token_signature');
    // Should gracefully redirect to /login?error=... without 500 server crash
    await expect(page).toHaveURL(/.*login.*/);
  });
});

