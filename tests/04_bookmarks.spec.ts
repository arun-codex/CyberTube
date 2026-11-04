import { test, expect } from '@playwright/test';

test.describe('CyberTube Bookmarks / Saved Resources', () => {
  test('Save resource to bookmarks and inspect /saved list', async ({ page }) => {
    // Clear localStorage first
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Go to discover page
    await page.goto('/discover');
    await page.waitForLoadState('domcontentloaded');

    // Find bookmark button on a resource card
    const bookmarkButton = page.locator('button[aria-label*="Bookmark" i], button[aria-label*="Save" i]').first();
    if (await bookmarkButton.isVisible()) {
      await bookmarkButton.click();
      await page.waitForTimeout(300);

      // Verify localStorage was updated
      const savedStorage = await page.evaluate(() => localStorage.getItem('cybertube_saved_v1'));
      expect(savedStorage).toBeTruthy();

      // Navigate to /saved
      await page.goto('/saved');
      await expect(page.locator('body')).not.toContainText('Application error');
      // Should show the saved resource
      const savedCards = page.locator('article, div[class*="border"]');
      expect(await savedCards.count()).toBeGreaterThan(0);
    }
  });
});

