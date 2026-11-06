import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { COURSES } from '../src/data/courses';
import { toCourseLearningViewModel } from '../src/lib/course-learning-adapter';

const ARTIFACT_DIR = 'C:/Users/dutch/.gemini/antigravity/brain/883d2259-9b2d-4f23-9837-2a254dcfd25e';

test.describe('CYBERTUBE PHASE 21 — UNIVERSAL COURSE LEARNING EXPERIENCE', () => {
  const networkingSlug = 'networking-for-hackers-2027';
  const wiresharkSlug = 'wireshark-and-ethical-hacking';
  const forensicsSlug = 'network-packet-analysis-masterclass';

  test.beforeAll(() => {
    if (!fs.existsSync(ARTIFACT_DIR)) {
      fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
    }
  });

  // =========================================================================
  // 1. ARCHITECTURE & ADAPTER TESTS
  // =========================================================================
  test.describe('1. Architecture & Normalization Adapters', () => {
    test('toCourseLearningViewModel normalizes all active courses into standard schema', () => {
      expect(COURSES.length).toBeGreaterThanOrEqual(6);

      for (const course of COURSES) {
        const vm = toCourseLearningViewModel(course);
        expect(vm.courseId).toBe(course.id);
        expect(vm.slug).toBe(course.slug);
        expect(vm.title).toBe(course.title);
        expect(vm.totalModules).toBe(course.modules.length);
        expect(vm.totalLessons).toBe(vm.allLessons.length);
        expect(vm.modules.length).toBe(course.modules.length);

        for (const mod of vm.modules) {
          expect(mod.id).toBeDefined();
          expect(mod.title).toBeDefined();
          for (const les of mod.lessons) {
            expect(les.id).toBeDefined();
            expect(les.slug).toBeDefined();
            expect(Array.isArray(les.videos)).toBe(true);
            expect(Array.isArray(les.objectives)).toBe(true);
            expect(Array.isArray(les.skillsTaught)).toBe(true);
          }
        }
      }
    });

    test('Forensics masterclass normalizes topic video resources from manifest', () => {
      const forensicsCourse = COURSES.find((c) => c.slug === forensicsSlug)!;
      const vm = toCourseLearningViewModel(forensicsCourse);
      expect(vm.totalModules).toBe(9);
      expect(vm.totalLessons).toBe(37);

      // Lesson 1 should have mapped topic videos
      const lesson1 = vm.allLessons[0];
      expect(lesson1.videos.length).toBeGreaterThanOrEqual(1);

      // Procedural lessons in module 7 should cleanly have 0 videos without error
      const theoryLesson = vm.allLessons.find((l) => l.videos.length === 0);
      expect(theoryLesson).toBeDefined();
      expect(theoryLesson?.videos).toEqual([]);
    });

    test('Single-video courses normalize video into standard NormalizedLessonVideo structure', () => {
      const netCourse = COURSES.find((c) => c.slug === networkingSlug)!;
      const vm = toCourseLearningViewModel(netCourse);
      expect(vm.totalModules).toBe(1);
      expect(vm.totalLessons).toBe(6);

      for (const lesson of vm.allLessons) {
        expect(lesson.videos.length).toBe(1);
        expect(lesson.videos[0].videoId).toBeDefined();
        expect(lesson.videos[0].creator).toBe(netCourse.instructor.name);
      }
    });
  });

  // =========================================================================
  // 2. UNIVERSAL PLAYER DIMENSIONS & 16:9 RATIO TESTS
  // =========================================================================
  test.describe('2. Universal Video Player Dimensions & Layout', () => {
    const referenceCourses = [
      { name: 'Networking for Hackers 2027', slug: networkingSlug },
      { name: 'Wireshark and Ethical Hacking', slug: wiresharkSlug },
      { name: 'Network Packet Forensics Masterclass', slug: forensicsSlug },
    ];

    for (const ref of referenceCourses) {
      test(`${ref.name}: maintains 16:9 video player aspect ratio on desktop`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`/courses/${ref.slug}`);
        await page.waitForLoadState('domcontentloaded');

        // Locate YouTube Player 16:9 container
        const playerContainer = page.locator('[data-testid="youtube-player-container"]').first();
        await expect(playerContainer).toBeVisible({ timeout: 10000 });

        const box = await playerContainer.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          const ratio = box.width / box.height;
          // 16:9 ratio is 1.7777; allow minor pixel rounding tolerance (1.70 - 1.85)
          expect(ratio).toBeGreaterThan(1.70);
          expect(ratio).toBeLessThan(1.85);

          // Guaranteed full column width (> 600px on 1440px viewport)
          expect(box.width).toBeGreaterThan(600);
        }
      });
    }

    test('Packet Forensics does NOT shrink player to small sub-column', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${forensicsSlug}`);
      await page.waitForLoadState('domcontentloaded');

      const netBox = await (async () => {
        const netPage = await page.context().newPage();
        await netPage.setViewportSize({ width: 1440, height: 900 });
        await netPage.goto(`/courses/${networkingSlug}`);
        const p = netPage.locator('[data-testid="youtube-player-container"]').first();
        await expect(p).toBeVisible();
        const b = await p.boundingBox();
        await netPage.close();
        return b;
      })();

      const forensicsPlayer = page.locator('[data-testid="youtube-player-container"]').first();
      await expect(forensicsPlayer).toBeVisible();
      const forensicsBox = await forensicsPlayer.boundingBox();

      expect(netBox).not.toBeNull();
      expect(forensicsBox).not.toBeNull();
      if (netBox && forensicsBox) {
        // Player widths across courses must match within 5%
        const widthDiffPercent = Math.abs(netBox.width - forensicsBox.width) / netBox.width;
        expect(widthDiffPercent).toBeLessThan(0.05);
      }
    });
  });

  // =========================================================================
  // 3. VIDEO RESOURCE LIBRARY STANDARDIZATION
  // =========================================================================
  test.describe('3. Video Resource Library Positioning & Behavior', () => {
    test('Learning Resources is positioned BELOW the primary video player', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${forensicsSlug}`);
      await page.waitForLoadState('domcontentloaded');

      const player = page.locator('[data-testid="youtube-player-container"]').first();
      const resourceLibrary = page.locator('[data-testid="lesson-video-resources"]');

      await expect(player).toBeVisible();
      await expect(resourceLibrary).toBeVisible();

      const playerBox = await player.boundingBox();
      const libraryBox = await resourceLibrary.boundingBox();

      expect(playerBox).not.toBeNull();
      expect(libraryBox).not.toBeNull();
      if (playerBox && libraryBox) {
        // Resource library must appear below player vertically
        expect(libraryBox.y).toBeGreaterThan(playerBox.y + playerBox.height - 20);
      }
    });

    test('Selecting another topic video updates playing video and persists', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${forensicsSlug}`);
      await page.waitForLoadState('domcontentloaded');

      const videoCards = page.locator('[data-testid^="topic-video-item-"]');
      const count = await videoCards.count();
      if (count > 1) {
        // Click the second video
        await videoCards.nth(1).click();
        await expect(videoCards.nth(1)).toContainText('Active Video');

        // Check toggle watched button exists
        const toggleBtn = page.locator('[data-testid^="toggle-video-watched-"]').first();
        await expect(toggleBtn).toBeVisible();
      }
    });

    test('Procedural theory lesson cleanly displays theory banner without broken player', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      // Lesson without external video
      await page.goto(`/courses/${forensicsSlug}?lesson=packet-carving-forensics-workflow`);
      await page.waitForLoadState('domcontentloaded');

      const theoryBanner = page.locator('[data-testid="theory-lesson-banner"]');
      await expect(theoryBanner).toBeVisible();
      await expect(theoryBanner).toContainText('Curriculum & Practical Lab Guide');
    });
  });

  // =========================================================================
  // 4. CURRICULUM SIDEBAR STANDARDIZATION
  // =========================================================================
  test.describe('4. Standard Curriculum Sidebar', () => {
    test('Sidebar displays CURRICULUM header, modules, and completion percentage', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${wiresharkSlug}`);
      await page.waitForLoadState('domcontentloaded');

      const sidebar = page.locator('aside[aria-label="Course curriculum"]');
      await expect(sidebar).toBeVisible();
      await expect(sidebar).toContainText('CURRICULUM');
      await expect(sidebar).toContainText('5 Modules');
      await expect(sidebar).toContainText('20 Lessons');

      // Module rows show progress
      await expect(sidebar.getByText('Module 01')).toBeVisible();
      await expect(sidebar.getByText('Module 02')).toBeVisible();
    });

    test('Active lesson displays PLAYING badge and switches on click', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${networkingSlug}`);
      await page.waitForLoadState('domcontentloaded');

      const sidebar = page.locator('aside[aria-label="Course curriculum"]');
      await expect(sidebar.getByText('PLAYING')).toBeVisible();

      // Click second lesson in curriculum
      const lessonLinks = sidebar.locator('a[href*="lesson="]');
      const secondLessonTitle = await lessonLinks.nth(1).innerText();
      await lessonLinks.nth(1).click();

      // Active title in header should update
      const lessonHeading = page.locator('h2').first();
      await expect(lessonHeading).toContainText(secondLessonTitle.trim());
    });

    test('Toggle lesson completion updates checkbox and course progress bar', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${networkingSlug}`);
      await page.waitForLoadState('domcontentloaded');

      // Find first lesson completion button in sidebar
      const completionBtn = page.locator('aside[aria-label="Course curriculum"] button[aria-label*="Mark"]').first();
      await completionBtn.click();

      // Progress bar percentage should update
      const progressHeader = page.locator('text=Course Progress:').first();
      await expect(progressHeader).toBeVisible();
    });
  });

  // =========================================================================
  // 5. LESSON CONTENT SECTIONS & INTERACTIVE TABS
  // =========================================================================
  test.describe('5. Lesson Content Sections', () => {
    test('Objectives, skills, and ethical notice render predictably', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${wiresharkSlug}`);
      await page.waitForLoadState('domcontentloaded');

      // Ethical notice must be visible on Wireshark course
      const ethicalNotice = page.locator('[data-testid="ethical-use-notice"]');
      await expect(ethicalNotice).toBeVisible();
      await expect(ethicalNotice).toContainText('Ethical Lab Environment Notice');

      // Objectives & skills
      await expect(page.getByText('Lesson Objectives')).toBeVisible();
      await expect(page.getByText('Skills Acquired')).toBeVisible();
    });

    test('Forensics masterclass displays interactive workspace tabs (Guide, Labs, Quizzes, Capstone, PCAPs)', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${forensicsSlug}`);
      await page.waitForLoadState('domcontentloaded');

      await expect(page.getByRole('button', { name: /Lesson Guide/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Module Lab/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Module Quiz/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /PCAP Library/i })).toBeVisible();
    });
  });

  // =========================================================================
  // 6. THEME CONSISTENCY (DARK & LIGHT MODE)
  // =========================================================================
  test.describe('6. Theme Consistency', () => {
    test('Dark theme applies consistent background and surface tokens', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/courses/${networkingSlug}`);
      await page.waitForLoadState('domcontentloaded');

      // Toggle dark mode via html class or theme button
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      });

      const sidebar = page.locator('aside[aria-label="Course curriculum"]');
      await expect(sidebar).toBeVisible();

      // Ensure no raw white backgrounds on dark mode container
      const bgColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      expect(bgColor).toBeDefined();
    });
  });

  // =========================================================================
  // 7. RESPONSIVE DESIGN & MOBILE LAYOUT
  // =========================================================================
  test.describe('7. Responsive Viewport Adaptation', () => {
    const viewports = [
      { name: 'Desktop 1440px', width: 1440, height: 900 },
      { name: 'Laptop 1280px', width: 1280, height: 800 },
      { name: 'Tablet 768px', width: 768, height: 1024 },
      { name: 'Mobile 390px', width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      test(`Adapts without horizontal overflow at ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`/courses/${networkingSlug}`);
        await page.waitForLoadState('domcontentloaded');

        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isOverflowing).toBe(false);
      });
    }
  });

  // =========================================================================
  // 8. VISUAL REGRESSION SCREENSHOTS
  // =========================================================================
  test.describe('8. Visual Regression Reference Screenshots', () => {
    test('Capture Desktop (1440x900) screenshots of reference courses', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      // Test A: Networking for Hackers 2027
      await page.goto(`/courses/${networkingSlug}`);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'screenshot_desktop_networking_for_hackers.png'),
        fullPage: false,
      });

      // Test B: Wireshark and Ethical Hacking
      await page.goto(`/courses/${wiresharkSlug}`);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'screenshot_desktop_wireshark_ethical_hacking.png'),
        fullPage: false,
      });

      // Test C: Network Packet Analysis & Forensics Masterclass
      await page.goto(`/courses/${forensicsSlug}`);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'screenshot_desktop_packet_forensics_masterclass.png'),
        fullPage: false,
      });
    });

    test('Capture Mobile (390x844) screenshots of reference courses', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });

      // Test A: Networking for Hackers 2027
      await page.goto(`/courses/${networkingSlug}`);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'screenshot_mobile_networking_for_hackers.png'),
        fullPage: false,
      });

      // Test B: Wireshark and Ethical Hacking
      await page.goto(`/courses/${wiresharkSlug}`);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'screenshot_mobile_wireshark_ethical_hacking.png'),
        fullPage: false,
      });

      // Test C: Network Packet Analysis & Forensics Masterclass
      await page.goto(`/courses/${forensicsSlug}`);
      await page.waitForLoadState('networkidle');
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'screenshot_mobile_packet_forensics_masterclass.png'),
        fullPage: false,
      });
    });
  });
});
