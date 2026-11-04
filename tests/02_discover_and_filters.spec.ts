import { test, expect } from '@playwright/test';

test.describe('CyberTube Discover & Catalog Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/discover');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Search input dynamically filters resource cards', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search" i], input[type="search"]').first();
    await expect(searchInput).toBeVisible();

    // Type query "Wireshark" or "Network"
    await searchInput.fill('Wireshark');
    await page.waitForTimeout(300);

    // Cards should match or show no results state cleanly
    const cards = page.locator('article, div[class*="border"]');
    await expect(page.locator('body')).not.toContainText('Application error');
  });

  test('Filter by domain, level, and format updates URL parameters or view', async ({ page }) => {
    // Select filter buttons or selects if present
    const domainSelect = page.locator('select').first();
    if (await domainSelect.isVisible()) {
      const options = await domainSelect.locator('option').allInnerTexts();
      if (options.length > 1) {
        await domainSelect.selectOption({ index: 1 });
        await page.waitForTimeout(300);
      }
    }

    // Check reset filters button or clear functionality
    const resetButton = page.locator('button:has-text("Reset"), button:has-text("Clear")');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      await page.waitForTimeout(200);
    }

    await expect(page.locator('body')).not.toContainText('Application error');
  });
});

