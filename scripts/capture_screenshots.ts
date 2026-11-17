import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function waitForServer(url: string, maxAttempts = 50): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 200 || res.status === 304) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function capture() {
  const screenshotDir = path.resolve(process.cwd(), 'docs/screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Check if server is already running on 3000
  let serverProcess: any = null;
  const isRunning = await waitForServer('http://127.0.0.1:3000', 3);
  if (!isRunning) {
    console.log('Starting local Next.js server on port 3000...');
    serverProcess = spawn('npx', ['next', 'start', '-p', '3000', '-H', '127.0.0.1'], {
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const ready = await waitForServer('http://127.0.0.1:3000', 60);
    if (!ready) {
      if (serverProcess) serverProcess.kill('SIGTERM');
      throw new Error('Server failed to start on http://127.0.0.1:3000');
    }
  }

  console.log('Server is ready on http://127.0.0.1:3000. Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop 1440x900
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();

    console.log('1/6 Capturing Desktop Homepage...');
    await desktopPage.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: path.join(screenshotDir, '01_homepage_modern_redesign.png'), fullPage: true });

    console.log('2/6 Capturing Unified Library Hub (Study Library tab with PDF Search)...');
    await desktopPage.goto('http://127.0.0.1:3000/library', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: path.join(screenshotDir, '02_unified_library_study_tab.png'), fullPage: true });

    console.log('3/6 Capturing Unified Library Hub (Course Directory Coming Soon tab)...');
    await desktopPage.goto('http://127.0.0.1:3000/library?tab=courses', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: path.join(screenshotDir, '03_unified_library_courses_coming_soon.png'), fullPage: true });

    console.log('4/6 Capturing Learning Paths Coming Soon page...');
    await desktopPage.goto('http://127.0.0.1:3000/learning-paths', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: path.join(screenshotDir, '04_learning_paths_coming_soon.png'), fullPage: true });

    console.log('5/6 Capturing Saved Resources with Cloud Sync...');
    await desktopPage.goto('http://127.0.0.1:3000/saved', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: path.join(screenshotDir, '05_saved_resources_cloud_sync.png'), fullPage: true });

    await desktopContext.close();

    // 2. Mobile 375x667
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();

    console.log('6/6 Capturing Mobile Navigation Drawer...');
    await mobilePage.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(1000);
    const menuBtn = mobilePage.locator('button[aria-label="Toggle mobile navigation menu"]');
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await mobilePage.waitForTimeout(500);
    }
    await mobilePage.screenshot({ path: path.join(screenshotDir, '06_mobile_navigation_drawer.png'), fullPage: true });

    await mobileContext.close();
    console.log('All 6 screenshots captured successfully in docs/screenshots/!');
  } finally {
    await browser.close();
    if (serverProcess) {
      console.log('Terminating temporary server process...');
      serverProcess.kill('SIGTERM');
    }
  }
}

capture().catch((e) => {
  console.error('Screenshot capture failed:', e);
  process.exit(1);
});
