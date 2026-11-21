import { expect, test } from '@playwright/test';

test.describe('Dedicated Support Page (/support) & ChaiKit Integration', () => {
  test('renders dedicated support page with genuine ChaiKit inline component', async ({ page }) => {
    await page.goto('/support');

    // Page title and hero
    await expect(page).toHaveTitle(/Support CyberTube/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Help Keep Cybersecurity Education Free');

    // Neutral notice applies to both active UPI and preview-only configurations.
    await expect(page.getByText('Direct UPI • Verify before paying')).toBeVisible();

    // Genuine ChaiKit mounting container
    const widgetContainer = page.locator('[data-testid="support-page-inline-widget"]');
    await expect(widgetContainer).toBeVisible();

    // Custom Web Component
    const chaiSupport = widgetContainer.locator('chai-support');
    await expect(chaiSupport).toBeVisible();
    await expect(chaiSupport).toHaveAttribute('position', 'inline');
    await expect(chaiSupport).toHaveAttribute('creator-name', 'CyberTube');
    // ChaiKit defaults to Kadak ₹25 even if React normalizes the custom-element attribute.
    await expect(chaiSupport.locator('.chai-payment-amount')).toContainText('25');

    // Trust and transparency sections
    await expect(page.getByRole('heading', { name: /What Your Contribution Supports/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Payment Transparency & Safety/i })).toBeVisible();
    await expect(page.getByText(/Direct Bank Routing/i)).toBeVisible();
    await expect(page.getByText(/Completely Voluntary/i)).toBeVisible();

    // Quick navigation back to courses and labs
    await expect(page.getByRole('main').getByRole('link', { name: /Explore Free Courses/i })).toBeVisible();
    await expect(page.getByRole('main').getByRole('link', { name: /Practical Labs/i })).toBeVisible();
  });

  test('header and footer link correctly to support destinations', async ({ page }) => {
    await page.goto('/');

    // Header support link
    const headerSupport = page.locator('header a[href*="support"]');
    await expect(headerSupport.first()).toBeVisible();

    // Footer support link
    const footerSupport = page.locator('footer a[href="/support"]');
    await expect(footerSupport.first()).toBeVisible();
  });

  test('responsive mobile viewport layout on /support', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/support');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('[data-testid="support-page-inline-widget"]')).toBeVisible();

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});
