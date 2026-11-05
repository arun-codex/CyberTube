import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('GitHub OAuth account-linking recovery', () => {
  test('identity-link conflict gives a safe recovery path without exposing the raw Auth error', async ({ page }) => {
    await page.goto('/login?reason=identity_link_conflict');

    await expect(page.locator('body')).toContainText(
      'could not safely match the returned verified email addresses'
    );
    await expect(page.locator('body')).toContainText(
      'First sign in with your working Google or email account'
    );
    await expect(page.locator('body')).toContainText(
      'Do not create a second CyberTube account'
    );

    await expect(page.locator('button[aria-label="Continue with Google"]')).toBeVisible();
    await expect(page.locator('button[aria-label="Continue with GitHub"]')).toBeVisible();
  });

  test('account settings exposes the explicit authenticated GitHub linking flow', () => {
    const root = process.cwd();
    const accountPage = fs.readFileSync(path.join(root, 'app/account/page.tsx'), 'utf8');
    const component = fs.readFileSync(
      path.join(root, 'src/components/auth/ConnectedAccounts.tsx'),
      'utf8'
    );

    expect(accountPage).toContain('<ConnectedAccounts identities={connectedIdentities} />');
    expect(component).toContain('supabase.auth.linkIdentity');
    expect(component).toContain("provider: 'github'");
    expect(component).toContain("next', '/account?identity_linked=github'");
    expect(component).toContain('Allow manual linking');
  });

  test('OAuth callback maps Supabase automatic-linking conflicts to the recovery route', async ({ page }) => {
    await page.goto(
      '/auth/callback?error_description=500%3A%20Multiple%20accounts%20with%20the%20same%20email%20address%20in%20the%20same%20linking%20domain%20detected%3A%20default'
    );

    await expect(page).toHaveURL(/\/login\?reason=identity_link_conflict/);
    await expect(page.locator('body')).toContainText(
      'could not safely match the returned verified email addresses'
    );
  });
});
