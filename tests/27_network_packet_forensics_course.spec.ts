import { test, expect } from '@playwright/test';
import { COURSES } from '../src/data/courses';
import manifest from '../src/data/manifests/network-packet-forensics-manifest.json';
import {
  getCourseLessons,
  getAdjacentLessons,
} from '../src/lib/courses';
import {
  localCourseProgressService,
  LEGACY_PACKET_ANALYSIS_LESSON_IDS,
} from '../src/lib/course-progress';

test.describe('Phase 18 — Network Packet Forensics Masterclass Integration', () => {
  const courseSlug = 'network-packet-analysis-masterclass';
  const courseId = 'course-packet-analysis-wireshark';

  test('1. Course identity stable: id is course-packet-analysis-wireshark and canonical slug is preserved', async () => {
    const course = COURSES.find((c) => c.id === courseId);
    expect(course).toBeDefined();
    expect(course?.slug).toBe(courseSlug);
    expect(course?.title).toBe('Network Packet Analysis & Forensics Masterclass');
    expect(course?.instructor.name).toBe('Netsec Explained');
    expect(course?.instructor.title).toContain('Network Security & Forensics Researcher');
  });

  test('2. Exactly 1 catalog entry exists in COURSES without duplicate cards', async () => {
    const matchingCourses = COURSES.filter(
      (c) => c.id === courseId || c.slug === courseSlug || c.slug === 'network-packet-analysis-forensics-masterclass'
    );
    expect(matchingCourses.length).toBe(1);
  });

  test('3. Catalog placement: categorized under cybersecurity track with network-security, soc-blue-team, dfir domains', async () => {
    const course = COURSES.find((c) => c.id === courseId)!;
    expect(course.track).toBe('cybersecurity');
    expect(course.domains).toContain('network-security');
    expect(course.domains).toContain('soc-blue-team');
    expect(course.domains).toContain('dfir');
  });

  test('4. Curriculum structure: exactly 9 modules in correct sequential order (0 to 8)', async () => {
    const course = COURSES.find((c) => c.id === courseId)!;
    expect(course.modules.length).toBe(9);

    const expectedModuleIds = [
      'mod-00-networking-prerequisites',
      'mod-01-wireshark-mastery',
      'mod-02-packet-analysis-protocols',
      'mod-03-advanced-investigation-workflow',
      'mod-04-malware-traffic-analysis',
      'mod-05-dos-recon-ftp-forensics',
      'mod-06-command-line-network-forensics',
      'mod-07-digital-forensics-evidence-reporting',
      'mod-08-soc-forensics-capstone',
    ];

    course.modules.forEach((mod, idx) => {
      expect(mod.id).toBe(expectedModuleIds[idx]);
      expect(mod.order).toBe(idx + 1);
    });
  });

  test('5. Exactly 36 regular lessons across modules 0 through 7', async () => {
    const course = COURSES.find((c) => c.id === courseId)!;
    const regularLessons = course.modules
      .slice(0, 8)
      .flatMap((m) => m.lessons);
    expect(regularLessons.length).toBe(36);
  });

  test('6. Capstone module: Module 8 is capstone with 1 capstone lesson (37 lessons total)', async () => {
    const course = COURSES.find((c) => c.id === courseId)!;
    const allLessons = getCourseLessons(course);
    expect(allLessons.length).toBe(37);

    const capstoneModule = course.modules[8];
    expect(capstoneModule.id).toBe('mod-08-soc-forensics-capstone');
    expect(capstoneModule.lessons.length).toBe(1);
    expect(capstoneModule.lessons[0].id).toBe('les-08-1-capstone-investigation');
    expect(capstoneModule.lessons[0].slug).toBe('operation-blackout-beacon-capstone');
    expect(course.capstone).toBeDefined();
    expect(course.capstone?.title).toContain('Operation Blackout Beacon');
    expect(course.capstone?.passingScore).toBe(75);
  });

  test('7. Total duration: ~23.5 hours (1410 min)', async () => {
    const course = COURSES.find((c) => c.id === courseId)!;
    const allLessons = getCourseLessons(course);
    const totalMinutes = allLessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
    expect(totalMinutes).toBe(1410); // 23h 30m
    expect(course.estimatedDuration).toBe('23 hours 30 mins');
  });

  test('8. Video allocation: exactly 3 video IDs assigned (Part 1, 2, 3), others have no youtubeVideoId', async () => {
    const course = COURSES.find((c) => c.id === courseId)!;
    const allLessons = getCourseLessons(course);
    const lessonsWithVideo = allLessons.filter((l) => !!l.youtubeVideoId);

    expect(lessonsWithVideo.length).toBe(3);

    const part1 = allLessons.find((l) => l.youtubeVideoId === 'e_dsGhvq9CU');
    const part2 = allLessons.find((l) => l.youtubeVideoId === 'ZJZlRGLN2_s');
    const part3 = allLessons.find((l) => l.youtubeVideoId === 'HR_sLcW4xz0');

    expect(part1).toBeDefined();
    expect(part1?.id).toBe('les-03-2-video-part1');
    expect(part2).toBeDefined();
    expect(part2?.id).toBe('les-04-2-video-part2');
    expect(part3).toBeDefined();
    expect(part3?.id).toBe('les-05-2-video-part3');

    const lessonsWithoutVideo = allLessons.filter((l) => !l.youtubeVideoId);
    expect(lessonsWithoutVideo.length).toBe(34);
  });

  test('9. Video-less lessons keep the official masterclass series playable inside CyberTube', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const theoryBanner = page.locator('[data-testid="theory-lesson-banner"]');
    await expect(theoryBanner).toBeVisible();
    await expect(theoryBanner).toContainText('Forensics Curriculum & Practical Lab Guide');

    const videoLibrary = page.locator('[data-testid="course-video-library"]');
    await expect(videoLibrary).toBeVisible();
    await expect(videoLibrary).toContainText('Official Netsec Explained Masterclasses');

    // The lesson page must embed a real video instead of sending learners to the channel.
    const iframe = videoLibrary.locator('iframe[src*="youtube.com/embed"]');
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute('src', /e_dsGhvq9CU/);
    await expect(theoryBanner.locator('a[href*="youtube.com/@NetsecExplained"]')).toHaveCount(0);

    // Switching masterclasses must update the embedded player without navigating away.
    await videoLibrary.locator('[data-testid="masterclass-video-option-ZJZlRGLN2_s"]').click();
    await expect(iframe).toHaveAttribute('src', /ZJZlRGLN2_s/);
    await expect(page).toHaveURL(/lesson=osi-vs-tcpip-encapsulation/);
  });

  test('10. PCAP links: official repository links & SHA256 hashes present', async ({ page }) => {
    const course = COURSES.find((c) => c.id === courseId)!;
    expect(course.pcapResources).toBeDefined();
    expect(course.pcapResources?.length).toBeGreaterThan(0);

    const samplePcap = course.pcapResources![0];
    expect(samplePcap.sourceRepository).toBe('https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics');
    expect(samplePcap.sha256).toBeDefined();

    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    // Click PCAP Library tab
    const pcapTab = page.locator('button:has-text("PCAP Library")');
    await expect(pcapTab).toBeVisible();
    await pcapTab.click();

    await expect(page.locator('h3:has-text("Official PCAP Evidence & Scenario Library")')).toBeVisible();
    await expect(page.locator('text=Hackers on the Network.pcapng')).toBeVisible();
  });

  test('11. Lesson navigation: prev/next buttons navigate across lessons smoothly', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const nextBtn = page.locator('button:has-text("Next:"), a:has-text("Next:")').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await page.waitForTimeout(500);

    // Verify URL changed to second lesson
    expect(page.url()).toContain('lesson=ethernet-mac-arp-operations');
  });

  test('12. Lesson completion toggle: updates completion state and persists', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const completeBtn = page.locator('button:has-text("Mark as Completed"), button:has-text("Completed")').first();
    await expect(completeBtn).toBeVisible();

    const initialText = await completeBtn.innerText();
    await completeBtn.click();
    await page.waitForTimeout(400);

    const updatedText = await completeBtn.innerText();
    expect(updatedText).not.toEqual(initialText);

    // Click again to toggle back
    await completeBtn.click();
    await page.waitForTimeout(400);
    const revertedText = await completeBtn.innerText();
    expect(revertedText).toEqual(initialText);
  });

  test('13. Progress persistence in localStorage under prefixed key', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const storedData = await page.evaluate((cid) => {
      const storageKey = `cybertube_course_progress_v1_${cid}`;
      return localStorage.getItem(storageKey);
    }, courseId);

    expect(storedData).not.toBeNull();
  });

  test('14. Legacy progress migration: legacy completed IDs are archived into archivedLegacyLessonIds and not falsely counted', async ({ page }) => {
    // Inject legacy completed lessons directly into localStorage before page visit
    await page.goto('/courses');
    await page.evaluate(({ cid, legacyIds }) => {
      const storageKey = `cybertube_course_progress_v1_${cid}`;
      const state = {
        courseId: cid,
        completedLessonIds: [...legacyIds],
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(state));
    }, { cid: courseId, legacyIds: LEGACY_PACKET_ANALYSIS_LESSON_IDS });

    // Navigate to course
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Inspect localStorage to verify migration
    const stateAfterMigration = await page.evaluate((cid) => {
      const raw = localStorage.getItem(`cybertube_course_progress_v1_${cid}`);
      return raw ? JSON.parse(raw) : null;
    }, courseId);

    expect(stateAfterMigration).not.toBeNull();
    // Legacy IDs should NOT be in active completedLessonIds
    expect(stateAfterMigration.completedLessonIds.length).toBe(0);
    // Legacy IDs should be in archivedLegacyLessonIds
    expect(stateAfterMigration.archivedLegacyLessonIds).toEqual(
      expect.arrayContaining(LEGACY_PACKET_ANALYSIS_LESSON_IDS)
    );
  });

  test('15. Legacy progress banner renders when legacy progress exists', async ({ page }) => {
    await page.goto('/courses');
    await page.evaluate(({ cid, legacyIds }) => {
      const storageKey = `cybertube_course_progress_v1_${cid}`;
      const state = {
        courseId: cid,
        completedLessonIds: [],
        archivedLegacyLessonIds: [...legacyIds],
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(state));
    }, { cid: courseId, legacyIds: LEGACY_PACKET_ANALYSIS_LESSON_IDS });

    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const banner = page.locator('[data-testid="legacy-progress-banner"]');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Legacy Course Progress Archived');
  });

  test('16. Interactive knowledge check: allows selecting answers and reset', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const knowledgeCheck = page.locator('text=Lesson Knowledge Check').first();
    await expect(knowledgeCheck).toBeVisible();

    const radioOption = page.locator('input[type="radio"]').first();
    await expect(radioOption).toBeVisible();
    await radioOption.click();

    const submitBtn = page.locator('button:has-text("Submit Answer")').first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    await expect(page.locator('text=Correct Answer!').or(page.locator('text=Incorrect')).first()).toBeVisible();
  });

  test('17. Assessed module lab: displays tasks and evidence worksheet', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const labTab = page.locator('button:has-text("Module Lab")').first();
    await expect(labTab).toBeVisible();
    await labTab.click();

    await expect(page.locator('h3:has-text("Lab 0")')).toBeVisible();
    await expect(page.locator('text=Lab Investigation Tasks')).toBeVisible();
    await expect(page.locator('text=Evidence Documentation Worksheet')).toBeVisible();
  });

  test('18. Module quiz: displays questions, evaluates answers, and records quiz score', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const quizTab = page.locator('button:has-text("Module Quiz")').first();
    await expect(quizTab).toBeVisible();
    await quizTab.click();

    await expect(page.locator('h3:has-text("Module 00 Assessment")')).toBeVisible();
    const submitBtn = page.locator('button:has-text("Submit Quiz")');
    await expect(submitBtn).toBeVisible();
  });

  test('19. SOC Capstone assessment: displays 100-mark rubric and submission sections', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=operation-blackout-beacon-capstone`);
    await page.waitForLoadState('domcontentloaded');

    // On capstone lesson, Capstone Assessment should be visible
    await expect(page.locator('h3:has-text("Operation Blackout Beacon")').first()).toBeVisible();
    await expect(page.locator('text=Assessment Rubric & Grading Criteria (100 Marks)')).toBeVisible();
    await expect(page.locator('text=Pass: 75/100')).toBeVisible();
    await expect(page.locator('button:has-text("Submit Capstone for Evaluation")')).toBeVisible();
  });

  test('20. Canonical slug redirect: /courses/network-packet-analysis-forensics-masterclass redirects to canonical slug', async ({ page }) => {
    await page.goto('/courses/network-packet-analysis-forensics-masterclass?lesson=osi-vs-tcpip-encapsulation');
    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('/courses/network-packet-analysis-masterclass');
    expect(page.url()).toContain('lesson=osi-vs-tcpip-encapsulation');
  });
});

test.describe('Phase 18.1 — Assessment Integrity, Evidence Provenance & Progress Gates', () => {
  const courseSlug = 'network-packet-analysis-masterclass';
  const courseId = 'course-packet-analysis-wireshark';

  test('Behavior 1: Capstone submission cannot pass using meaningless short/shallow text', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=operation-blackout-beacon-capstone`);
    await page.waitForLoadState('domcontentloaded');

    const firstTextarea = page.locator('textarea').first();
    await expect(firstTextarea).toBeVisible();
    const textareas = page.locator('textarea');
    const count = await textareas.count();
    expect(count).toBeGreaterThanOrEqual(6);

    // Enter short text without required technical packet analysis terms in first textarea
    await firstTextarea.fill('short irrelevant text not meeting twenty words requirement');

    const submitBtn = page.locator('button:has-text("Submit Capstone for Evaluation")');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Completeness check should report failures or warnings, not award a passing grade
    await expect(page.locator('text=Structural Verification Incomplete').first()).toBeVisible();
  });

  test('Behavior 2: Capstone assessment state survives page refresh', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=operation-blackout-beacon-capstone`);
    await page.waitForLoadState('domcontentloaded');

    // Fill in section 1 with detailed findings
    const firstTextarea = page.locator('textarea').first();
    const testNotes = 'Executive forensic analysis of threat actor intrusion across compromised workstation 10.0.0.45. Identified suspicious beaconing over TCP port 443 with TLS anomalies and outbound data exfiltration via FTP.';
    await firstTextarea.fill(testNotes);

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify text survived refresh
    await expect(page.locator('textarea').first()).toHaveValue(testNotes);
  });

  test('Behavior 3: Module quizzes contain 5 questions and calculate score', async ({ page }) => {
    const course = COURSES.find((c) => c.id === courseId)!;
    // Check all 8 regular modules have 5 questions each
    course.modules.slice(0, 8).forEach((mod) => {
      expect(mod.quiz).toBeDefined();
      expect(mod.quiz?.questions.length).toBe(5);
    });

    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const quizTab = page.locator('button:has-text("Module Quiz")');
    await expect(quizTab).toContainText('5 Qs');
    await quizTab.click();

    // Verify 5 questions rendered
    const questions = page.locator('h4').filter({ hasText: /^\d+\./ });
    await expect(questions).toHaveCount(5);
  });

  test('Behavior 4: Failed quiz attempts are retained in history', async ({ page }) => {
    await page.goto('/courses');
    const testAttempt = {
      attemptNumber: 1,
      selectedAnswers: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 0 },
      score: 40,
      passed: false,
      submittedAt: new Date().toISOString(),
    };

    await page.evaluate(({ cid, attempt }) => {
      const storageKey = `cybertube_course_progress_v1_${cid}`;
      const state = {
        courseId: cid,
        completedLessonIds: [],
        quizScores: { 'mod-00-networking-prerequisites': 40 },
        quizAttempts: { 'mod-00-networking-prerequisites': [attempt] },
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(state));
    }, { cid: courseId, attempt: testAttempt });

    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const quizTab = page.locator('button:has-text("Module Quiz")');
    await quizTab.click();

    // Verify Attempt History displays attempt #1 with 40% — Failed
    await expect(page.locator('text=Recorded Attempt History')).toBeVisible();
    await expect(page.locator('text=Attempt #1')).toBeVisible();
    await expect(page.locator('text=40% — Failed')).toBeVisible();
  });

  test('Behavior 5: Passing quiz status survives refresh', async ({ page }) => {
    await page.goto('/courses');
    const passAttempt = {
      attemptNumber: 1,
      selectedAnswers: { 0: 1, 1: 1, 2: 2, 3: 0, 4: 2 },
      score: 80,
      passed: true,
      submittedAt: new Date().toISOString(),
    };

    await page.evaluate(({ cid, attempt }) => {
      const storageKey = `cybertube_course_progress_v1_${cid}`;
      const state = {
        courseId: cid,
        completedLessonIds: [],
        quizScores: { 'mod-00-networking-prerequisites': 80 },
        quizAttempts: { 'mod-00-networking-prerequisites': [attempt] },
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(state));
    }, { cid: courseId, attempt: passAttempt });

    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const quizTab = page.locator('button:has-text("Module Quiz")');
    await quizTab.click();

    await expect(page.locator('text=Attempt #1')).toBeVisible();
    await expect(page.locator('text=80% — Passed')).toBeVisible();
    await expect(page.locator('text=✓ Passed').first()).toBeVisible();

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await quizTab.click();
    await expect(page.locator('text=Attempt #1')).toBeVisible();
    await expect(page.locator('text=80% — Passed')).toBeVisible();
  });

  test('Behavior 6: Course is not marked complete before all required gates (lessons, quizzes, labs, capstone)', async ({ page }) => {
    await page.goto('/courses');
    const course = COURSES.find((c) => c.id === courseId)!;
    const allLessons = getCourseLessons(course);

    // Mock progress where all 37 lessons are checked complete, but 0 quizzes, labs, or capstone passed
    const partialState = {
      courseId,
      completedLessonIds: allLessons.map((l) => l.id),
      quizScores: {},
      quizAttempts: {},
      labProgress: {},
      capstoneSubmission: undefined,
      capstoneScore: undefined,
      lastAccessedAt: new Date().toISOString(),
    };

    await page.evaluate(({ cid, state }) => {
      localStorage.setItem(`cybertube_course_progress_v1_${cid}`, JSON.stringify(state));
    }, { cid: courseId, state: partialState });

    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Certification Gates card should show In Progress, not Fully Completed
    const progressCard = page.locator('[data-testid="masterclass-assessment-progress"]');
    await expect(progressCard).toBeVisible();
    await expect(progressCard).toContainText('In Progress');
    await expect(progressCard).toContainText('Remaining certification gates:');
  });

  test('Behavior 7: Practical lab task completion is persisted across refresh', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const labTab = page.locator('button:has-text("Module Lab")');
    await labTab.click();

    // Check the first task checkbox
    const taskCheckbox = page.locator('input[type="checkbox"]').first();
    await taskCheckbox.check();
    await page.waitForTimeout(300);

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await labTab.click();

    // Verify checkbox is still checked
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
  });

  test('Behavior 8: Practical lab worksheet values survive refresh', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}?lesson=osi-vs-tcpip-encapsulation`);
    await page.waitForLoadState('domcontentloaded');

    const labTab = page.locator('button:has-text("Module Lab")');
    await labTab.click();

    const worksheetInput = page.locator('input[type="text"][placeholder^="e.g."]').first();
    const testObservation = '192.168.1.105 communicated with external DNS 8.8.8.8';
    await worksheetInput.fill(testObservation);
    await page.waitForTimeout(300);

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await labTab.click();

    await expect(page.locator('input[type="text"][placeholder^="e.g."]').first()).toHaveValue(testObservation);
  });

  test('Behavior 9: PCAP hashes match verified upstream digests', async () => {
    const course = COURSES.find((c) => c.id === courseId)!;
    expect(course.pcapResources).toBeDefined();

    const hackersPcap = course.pcapResources?.find((p) => p.fileName === 'Hackers on the Network.pcapng');
    expect(hackersPcap?.sha256).toBe('b2bd9a8b484f4ded72a4ce7de1335198d5ae6e81ace89fe6e6d5a071e1391cd9');
    expect(hackersPcap?.verificationMethod?.toLowerCase()).toContain('sha-256');

    const scenario1 = course.pcapResources?.find((p) => p.fileName === 'Scenario 1.pcapng');
    expect(scenario1?.sha256).toBe('3d15daea9d46ee8aa6a3a111a3ee37e2e5be009d509d57a249dd850d510b07d8');

    const scenario2 = course.pcapResources?.find((p) => p.fileName === 'Scenario 2.pcap');
    expect(scenario2?.sha256).toBe('f664404d592d4fd647ebdf8117eb91b91a868fad1b54888e2117d1b271ba5b11');
  });

  test('Behavior 10: Lesson progress remains backward-compatible', async () => {
    expect(typeof localCourseProgressService.getProgress).toBe('function');
    expect(typeof localCourseProgressService.toggleLessonCompletion).toBe('function');
    expect(typeof localCourseProgressService.setLessonCompleted).toBe('function');
  });

  test('Behavior 11: Legacy progress archival remains intact', async ({ page }) => {
    await page.goto('/courses');
    await page.evaluate(({ cid, legacyIds }) => {
      const storageKey = `cybertube_course_progress_v1_${cid}`;
      const state = {
        courseId: cid,
        completedLessonIds: [...legacyIds],
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(state));
    }, { cid: courseId, legacyIds: LEGACY_PACKET_ANALYSIS_LESSON_IDS });

    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const state = await page.evaluate((cid) => {
      return JSON.parse(localStorage.getItem(`cybertube_course_progress_v1_${cid}`) || '{}');
    }, courseId);

    expect(state.archivedLegacyLessonIds).toEqual(LEGACY_PACKET_ANALYSIS_LESSON_IDS);
    expect(state.completedLessonIds.length).toBe(0);
  });

  test('Behavior 12: Existing MERN, Networking, and Wireshark courses remain unaffected', async () => {
    const mernCourse = COURSES.find((c) => c.slug === 'mern-full-stack-course-with-ai')!;
    const netCourse = COURSES.find((c) => c.slug === 'networking-for-hackers-2027')!;
    const wiresharkCourse = COURSES.find((c) => c.slug === 'wireshark-and-ethical-hacking')!;

    expect(mernCourse).toBeDefined();
    expect(netCourse).toBeDefined();
    expect(wiresharkCourse).toBeDefined();

    const mernLessons = getCourseLessons(mernCourse);
    expect(mernLessons.length).toBeGreaterThan(0);
    expect(mernCourse.capstone).toBeUndefined();
    expect(netCourse.capstone).toBeUndefined();
    expect(wiresharkCourse.capstone).toBeUndefined();
  });
});
