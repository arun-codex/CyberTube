import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('Phase 13.9.1 — Typography Alias Hotfix Verification', () => {
  const rootDir = process.cwd();

  test('Static audit: Cyberpunk-Regular.ttf is completely decommissioned and unlicensed assets are absent', () => {
    const legacyTtfPath = path.join(rootDir, 'src/fonts/Cyberpunk-Regular.ttf');
    expect(fs.existsSync(legacyTtfPath)).toBe(false);

    // Verify all active font files in src/fonts are licensed WOFF2
    const fontFiles = fs.readdirSync(path.join(rootDir, 'src/fonts')).filter((f) => f.endsWith('.woff2') || f.endsWith('.ttf'));
    for (const file of fontFiles) {
      expect(file.endsWith('.woff2')).toBe(true);
      // Ensure only orbitron, rajdhani, rubik, and ibm-plex-mono exist
      expect(file).toMatch(/^(orbitron|rajdhani|rubik|ibm-plex-mono)-/);
    }
  });

  test('Tailwind configuration: cyberpunk font family references --font-orbitron directly', () => {
    const tailwindPath = path.join(rootDir, 'tailwind.config.ts');
    const tailwindContent = fs.readFileSync(tailwindPath, 'utf-8');

    expect(tailwindContent).toContain("cyberpunk: ['var(--font-orbitron)', 'Orbitron', 'system-ui', 'sans-serif']");
    expect(tailwindContent).not.toContain('var(--font-cyberpunk)');
  });

  test('src/fonts/index.ts: cyberpunk is aliased to orbitron without registering --font-cyberpunk', () => {
    const fontsPath = path.join(rootDir, 'src/fonts/index.ts');
    const fontsContent = fs.readFileSync(fontsPath, 'utf-8');

    expect(fontsContent).toContain('export const cyberpunk = orbitron');
    expect(fontsContent).not.toContain('--font-cyberpunk');
    expect(fontsContent).not.toContain('Cyberpunk-Regular.ttf');
  });

  test('/typography-preview loads and Cyberpunk elements compute to Orbitron font family', async ({ page }) => {
    const response = await page.goto('/typography-preview');
    expect(response?.status()).toBe(200);

    // Verify main header
    await expect(page.locator('h1')).toContainText('CyberTube Multi-Font Typography System');

    // Verify Cyberpunk display section renders
    const cyberpunkHeading = page.locator('h2.font-cyberpunk');
    await expect(cyberpunkHeading).toBeVisible();
    await expect(cyberpunkHeading).toContainText('Cyberpunk Display');

    const cyberpunkDisplay = page.locator('.font-cyberpunk').filter({ hasText: 'CYBERTUBE SYSTEM CORE 2026' });
    await expect(cyberpunkDisplay).toBeVisible();

    // Verify computed font-family resolves to Orbitron
    const computedFont = await cyberpunkDisplay.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(computedFont.toLowerCase()).toContain('orbitron');

    // Verify no missing --font-cyberpunk variable is required on root
    const rootHasCyberpunkVar = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-cyberpunk');
    });
    expect(rootHasCyberpunkVar).toBe('');
  });
});

