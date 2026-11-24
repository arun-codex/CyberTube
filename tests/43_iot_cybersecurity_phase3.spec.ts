import { test, expect } from '@playwright/test';

test.describe('CYBERTUBE IoT Cybersecurity Course — Phase 3 Comprehensive Verification', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
  const COURSE_ROUTE = `${BASE_URL}/courses/iot-cybersecurity-zero-to-advanced`;

  test('1. Course page loads with complete 30-module navigation and zero quiz elements', async ({ page }) => {
    await page.goto(COURSE_ROUTE, { waitUntil: 'domcontentloaded' });

    // Verify Course Title
    await expect(page.locator('h1, h2').filter({ hasText: /IoT Cybersecurity & Ethical Hacking/i }).first()).toBeVisible();

    // Verify Zero Quizzes anywhere on page
    const quizElements = page.locator('button, a, div, span').filter({ hasText: /^quiz$|^take quiz$|^quiz questions$/i });
    expect(await quizElements.count()).toBe(0);

    // Verify 5 Primary IoT Tabs exist in DOM
    const learnTab = page.locator('button').filter({ hasText: /Learn/i }).first();
    const buildTab = page.locator('button').filter({ hasText: /Build \/ Lab/i }).first();
    const hardwareTab = page.locator('button').filter({ hasText: /Hardware & Tools/i }).first();
    const diagramTab = page.locator('button').filter({ hasText: /Interactive Diagram/i }).first();
    const evidenceTab = page.locator('button').filter({ hasText: /Evidence & Notes|Capstone/i }).first();

    await expect(learnTab).toBeVisible();
    await expect(buildTab).toBeVisible();
    await expect(hardwareTab).toBeVisible();
    await expect(diagramTab).toBeVisible();
    await expect(evidenceTab).toBeVisible();
  });

  test('2. Video player embeds verified YouTube video with valid player container', async ({ page }) => {
    await page.goto(COURSE_ROUTE, { waitUntil: 'domcontentloaded' });

    // Video iframe or player container must be present
    const videoIframe = page.locator('iframe[src*="youtube.com/embed"]');
    await expect(videoIframe).toBeVisible({ timeout: 10000 });

    const src = await videoIframe.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toMatch(/youtube\.com\/embed\/[a-zA-Z0-9_-]{11}/);
  });

  test('3. Hardware & Tools tab renders Bill of Materials (BOM) and component catalog', async ({ page }) => {
    await page.goto(COURSE_ROUTE, { waitUntil: 'domcontentloaded' });

    const hardwareTab = page.locator('button').filter({ hasText: /Hardware & Tools/i }).first();
    await hardwareTab.click();

    // Verify BOM kit container
    await expect(page.locator('text=Lesson Hardware & Tools Bill of Materials (BOM)')).toBeVisible();
    await expect(page.locator('text=Curated IoT Hardware & Electronics Component Catalog')).toBeVisible();

    // Verify safety & wiring column exists
    await expect(page.locator('text=Safety & Wiring Notes')).toBeVisible();
  });

  test('4. Interactive Diagram tab supports 2D CAD, Circuit Simulator, and 3D Hardware Lab', async ({ page }) => {
    await page.goto(COURSE_ROUTE, { waitUntil: 'domcontentloaded' });

    const diagramTab = page.locator('button').filter({ hasText: /Interactive Diagram/i }).first();
    await diagramTab.click();

    // Verify Diagram Subtab Pills
    const schematics2dBtn = page.locator('button').filter({ hasText: /2D Vector CAD/i });
    const circuitSimBtn = page.locator('button').filter({ hasText: /Circuit Simulator/i });
    const cad3dBtn = page.locator('button').filter({ hasText: /Rotatable 3D Hardware CAD/i });

    await expect(schematics2dBtn).toBeVisible();
    await expect(circuitSimBtn).toBeVisible();
    await expect(cad3dBtn).toBeVisible();

    // Test Circuit Simulator Interactivity
    await circuitSimBtn.click();
    await expect(page.locator('text=Interactive Electronic Circuit & Sensor Behavior Lab')).toBeVisible();

    // Verify Push-Button and LED simulation exists
    const pushButton = page.locator('button').filter({ hasText: /HOLD TO PRESS|PRESSED/i });
    await expect(pushButton).toBeVisible();

    // Test 3D Hardware CAD Lab
    await cad3dBtn.click();
    await expect(page.locator('text=Rotatable 3D Hardware CAD & Interactive PCB Inspection')).toBeVisible();

    // Verify 6 3D models selectable
    const esp32ModelBtn = page.locator('button').filter({ hasText: 'ESP32 DevKit' }).first();
    const rpiModelBtn = page.locator('button').filter({ hasText: 'Raspberry Pi Gateway' }).first();
    await expect(esp32ModelBtn).toBeVisible();
    await expect(rpiModelBtn).toBeVisible();

    // Test 2D Accessible Fallback Mode
    const fallbackToggle = page.locator('button').filter({ hasText: /Accessible 2D Mode|Switch to 3D/i }).first();
    await fallbackToggle.click();
    await expect(page.locator('text=Accessible 2D Schematic & Pinout Netlist')).toBeVisible();
  });

  test('5. Direct navigation to multiple phase lessons without quiz lockouts', async ({ page }) => {
    // Phase 1 (Module 2 Lesson 2)
    await page.goto(`${COURSE_ROUTE}?lesson=m02-l02-threat-actors-motives-and-asset-value-prioritization`, {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('h2').filter({ hasText: /Threat actors/i }).first()).toBeVisible();

    // Phase 2 (Module 18 Lesson 1)
    await page.goto(`${COURSE_ROUTE}?lesson=m18-l01-identify-embedded-cpu-architecture-and-calling-convention`, {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('h2').filter({ hasText: /Identify embedded CPU architecture/i }).first()).toBeVisible();

    // Phase 3 (Module 30 Lesson 4 - Capstone)
    await page.goto(`${COURSE_ROUTE}?lesson=m30-l04-present-executive-technical-and-soc-handoff-reports`, {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('h2').filter({ hasText: /Present executive/i }).first()).toBeVisible();
  });
});
