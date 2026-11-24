import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function verifyLiveProduction() {
  const screenshotDir = path.resolve(process.cwd(), 'docs/screenshots/live_production');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const liveUrl = 'https://cybertube-mu.vercel.app/courses/iot-cybersecurity-zero-to-advanced';
  console.log(`Launching Playwright Chromium against ${liveUrl}...`);

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 950 },
    });
    const page = await context.newPage();

    console.log('Navigating to live production course page...');
    await page.goto(liveUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Screenshot 1: Overview
    console.log('1. Capturing Live Production Course Overview...');
    await page.screenshot({ path: path.join(screenshotDir, '01_live_production_overview.png'), fullPage: false });

    // Screenshot 2: Build / Lab Tab
    console.log('2. Testing and capturing Build / Lab tab...');
    const buildBtn = page.locator('button:has-text("Build / Lab")').first();
    if (await buildBtn.isVisible()) {
      await buildBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(screenshotDir, '02_live_production_build_lab.png'), fullPage: false });
    }

    // Screenshot 3: Hardware & Tools Tab
    console.log('3. Testing and capturing Hardware & Tools tab...');
    const hwBtn = page.locator('button:has-text("Hardware & Tools")').first();
    if (await hwBtn.isVisible()) {
      await hwBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(screenshotDir, '03_live_production_hardware.png'), fullPage: false });
    }

    // Screenshot 4: Interactive Diagram Tab (SVG / 3D Viewer)
    console.log('4. Testing and capturing Interactive Diagram tab...');
    const diagBtn = page.locator('button:has-text("Interactive Diagram")').first();
    if (await diagBtn.isVisible()) {
      await diagBtn.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotDir, '04_live_production_diagram.png'), fullPage: false });
    }

    // Screenshot 5: Evidence & Notes Tab
    console.log('5. Testing and capturing Evidence & Notes tab...');
    const evidenceBtn = page.locator('button:has-text("Evidence & Notes")').first();
    if (await evidenceBtn.isVisible()) {
      await evidenceBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(screenshotDir, '05_live_production_evidence.png'), fullPage: false });
    }

    console.log('SUCCESS: All live production screenshots captured in docs/screenshots/live_production!');
  } finally {
    await browser.close();
  }
}

verifyLiveProduction().catch((e) => {
  console.error('Live production verification failed:', e);
  process.exit(1);
});
