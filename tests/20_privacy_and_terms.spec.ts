import { test, expect } from '@playwright/test';

test.describe('Privacy Policy & Terms of Service Compliance', () => {
  test('public access to /privacy without authentication', async ({ page }) => {
    const response = await page.goto('/privacy');
    expect(response?.status()).toBe(200);

    // Verify URL remains on /privacy and is not redirected to /login
    expect(page.url()).toContain('/privacy');

    // Title and Core Headings
    await expect(page.locator('h1')).toContainText(/CyberTube Privacy Policy/i);
    await expect(page.getByText(/Platform Operator & Contact Information/i)).toBeVisible();
    await expect(page.getByText(/Google OAuth Identity Information/i)).toBeVisible();

    // Operator and contact info
    await expect(page.getByText('privacy@cybertube.org').first()).toBeVisible();
    await expect(page.getByText('support@cybertube.local').first()).toBeVisible();
    await expect(page.getByText(/CyberTube Open Education Project/i).first()).toBeVisible();

    // Google OAuth Scopes & Limited Use assertions
    await expect(page.locator('code:has-text("openid")').first()).toBeVisible();
    await expect(page.locator('code:has-text("email")').first()).toBeVisible();
    await expect(page.locator('code:has-text("profile")').first()).toBeVisible();
    await expect(page.getByText(/Google API Services User Data Policy/i)).toBeVisible();
    await expect(page.getByText(/Limited Use requirements/i).first()).toBeVisible();
    await expect(page.getByText(/Zero Extended Access/i)).toBeVisible();

    // Data storage and processor transparency
    await expect(page.getByText(/Supabase/i).first()).toBeVisible();
    await expect(page.getByText(/Row Level Security/i).first()).toBeVisible();
    await expect(page.getByText(/Vercel/i).first()).toBeVisible();
    await expect(page.getByText(/Zero Advertising Cookies/i)).toBeVisible();

    // User Rights and Account Deletion
    await expect(page.getByText(/Data Retention & Permanent Account Deletion/i)).toBeVisible();
    await expect(page.getByText(/Your Privacy Rights/i)).toBeVisible();
    await expect(page.getByText(/Children's Privacy/i)).toBeVisible();
  });

  test('public access to /terms without authentication', async ({ page }) => {
    const response = await page.goto('/terms');
    expect(response?.status()).toBe(200);

    // Verify URL remains on /terms and is not redirected to /login
    expect(page.url()).toContain('/terms');

    // Title and Rules of Engagement
    await expect(page.locator('h1')).toContainText(/CyberTube Terms of Service/i);
    await expect(page.getByText(/Mandatory Cybersecurity Rules of Engagement/i)).toBeVisible();

    // Legal lab boundaries
    await expect(page.getByText(/Authorized Targets Only/i)).toBeVisible();
    await expect(page.getByText(/Zero Tolerance for Unauthorized Attacks/i)).toBeVisible();
    await expect(page.getByText(/PortSwigger Web Security Academy/i).first()).toBeVisible();

    // Third-party creator intellectual property
    await expect(page.getByText(/Intellectual Property & Creator Attribution/i)).toBeVisible();
    await expect(page.getByText(/Third-Party Content/i)).toBeVisible();

    // Disclaimers and contact
    await expect(page.getByText(/Disclaimer of Warranties/i)).toBeVisible();
    await expect(page.getByText(/Limitation of Liability/i)).toBeVisible();
  });

  test('footer contains accessible links to Privacy Policy and Terms of Service', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check governance column links
    const privacyPolicyLink = footer.locator('a[href="/privacy"]').first();
    const termsOfServiceLink = footer.locator('a[href="/terms"]').first();

    await expect(privacyPolicyLink).toBeVisible();
    await expect(termsOfServiceLink).toBeVisible();

    // Navigate to privacy from footer
    await privacyPolicyLink.click();
    await expect(page).toHaveURL(/\/privacy$/);

    // Navigate to terms from privacy page bottom backlink
    const termsNav = page.getByRole('link', { name: 'Terms of Service →' });
    await termsNav.click();
    await expect(page).toHaveURL(/\/terms$/);
  });

  test('login and registration pages link to terms and privacy', async ({ page }) => {
    // Login page
    await page.goto('/login');
    const loginCard = page.locator('form').locator('..');
    const loginTerms = loginCard.locator('a[href="/terms"]').first();
    const loginPrivacy = loginCard.locator('a[href="/privacy"]').first();
    await expect(loginTerms).toBeVisible();
    await expect(loginPrivacy).toBeVisible();

    // Register page
    await page.goto('/register');
    const registerCard = page.locator('form').locator('..');
    const regTerms = registerCard.locator('a[href="/terms"]').first();
    const regPrivacy = registerCard.locator('a[href="/privacy"]').first();
    await expect(regTerms).toBeVisible();
    await expect(regPrivacy).toBeVisible();
  });
});
