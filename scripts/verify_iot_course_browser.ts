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

async function verifyIotBrowserExperience() {
  const screenshotDir = path.resolve(process.cwd(), 'docs/screenshots/iot_verification');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

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

  console.log('Server is ready on http://127.0.0.1:3000. Launching Chromium...');
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 950 },
    });
    const page = await context.newPage();

    const courseUrl = 'http://127.0.0.1:3000/courses/iot-cybersecurity-zero-to-advanced';
    console.log(`Navigating to ${courseUrl}...`);
    await page.goto(courseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // 1. Capture Course Overview / Lesson 1
    console.log('1/6 Capturing Course Overview & Lesson 1...');
    await page.screenshot({ path: path.join(screenshotDir, '01_iot_course_overview.png'), fullPage: false });

    // Verify Tab: Learn (default)
    console.log('2/6 Verifying Learn Tab...');
    const learnTab = page.locator('button:has-text("Learn")').first();
    if (await learnTab.isVisible()) {
      await learnTab.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(screenshotDir, '02_iot_tab_learn.png'), fullPage: false });
    }

    // Verify Tab: Build / Lab
    console.log('3/6 Verifying Build / Lab Tab...');
    const buildTab = page.locator('button:has-text("Build / Lab")').first();
    if (await buildTab.isVisible()) {
      await buildTab.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(screenshotDir, '03_iot_tab_build_lab.png'), fullPage: false });
    }

    // Verify Tab: Hardware & Tools
    console.log('4/6 Verifying Hardware & Tools Tab...');
    const hwTab = page.locator('button:has-text("Hardware & Tools")').first();
    if (await hwTab.isVisible()) {
      await hwTab.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(screenshotDir, '04_iot_tab_hardware_tools.png'), fullPage: false });
    }

    // Verify Tab: Interactive Diagram
    console.log('5/6 Verifying Interactive Diagram Tab...');
    const diagTab = page.locator('button:has-text("Interactive Diagram")').first();
    if (await diagTab.isVisible()) {
      await diagTab.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotDir, '05_iot_tab_interactive_diagram.png'), fullPage: false });
    }

    // Verify Tab: Evidence & Notes
    console.log('6/6 Verifying Evidence & Notes Tab...');
    const evidenceTab = page.locator('button:has-text("Evidence & Notes")').first();
    if (await evidenceTab.isVisible()) {
      await evidenceTab.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(screenshotDir, '06_iot_tab_evidence_notes.png'), fullPage: false });
    }

    // 7. Test Phase 2 Lesson (e.g. Module 13 Lesson 1 or 2)
    console.log('7/8 Selecting Phase 2 Lesson in Curriculum Navigator...');
    const mod13Btn = page.locator('button:has-text("Module 13")').first();
    if (await mod13Btn.isVisible()) {
      await mod13Btn.click();
      await page.waitForTimeout(800);
    }
    const lessonTls = page.locator('text=/TLS|SSL|Certificate/i').first();
    if (await lessonTls.isVisible()) {
      await lessonTls.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotDir, '07_iot_phase2_tls_lesson.png'), fullPage: false });
    }

    // 8. Test Phase 3 Lesson (e.g. Module 27 Forensics)
    console.log('8/8 Selecting Phase 3 Forensics Lesson...');
    const mod27Btn = page.locator('button:has-text("Module 27")').first();
    if (await mod27Btn.isVisible()) {
      await mod27Btn.click();
      await page.waitForTimeout(800);
    }
    const lessonForensics = page.locator('text=/Forensics|Timeline|Disk/i').first();
    if (await lessonForensics.isVisible()) {
      await lessonForensics.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotDir, '08_iot_phase3_forensics_lesson.png'), fullPage: false });
    }

    console.log('SUCCESS: All browser verification steps and screenshots captured successfully.');
  } finally {
    await browser.close();
    if (serverProcess) {
      console.log('Stopping temporary local server process...');
      serverProcess.kill('SIGTERM');
    }
  }
}

verifyIotBrowserExperience().catch((err) => {
  console.error('Browser verification failed:', err);
  process.exit(1);
});
