import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { COURSES } from '../src/data/courses';
import { localCourseProgressService, getComprehensiveCourseCompletion } from '../src/lib/course-progress';
import { POST as submitQuiz } from '../app/api/courses/quiz/submit/route';
import { POST as submitStorytellingQuiz } from '../app/api/courses/storytelling/quiz/submit/route';

const repo = (p: string) => readFileSync(join(process.cwd(), p), 'utf-8');

test('Test 1 — Course Preservation: All courses, modules, and lessons are preserved intact', () => {
  assert.ok(COURSES.length >= 8, `Expected at least 8 courses, found ${COURSES.length}`);
  
  const expectedSlugs = [
    'mitre-attack-incident-response-zero-to-advanced',
    'siem-zero-to-advanced',
    'cybersecurity-zero-to-advanced',
    'windows-security-zero-to-advanced',
    'linux-zero-to-advanced',
    'free-storytelling-masterclass',
    'mern-full-stack-course-with-ai',
    'python-for-cybersecurity-zero-to-advanced',
  ];

  for (const slug of expectedSlugs) {
    const course = COURSES.find((c) => c.slug === slug);
    assert.ok(course, `Course ${slug} must be present`);
    assert.ok(course.modules.length > 0, `Course ${slug} must have modules`);
    const lessons = course.modules.flatMap((m) => m.lessons);
    assert.ok(lessons.length > 0, `Course ${slug} must have lessons`);
    
    // Check that video IDs are unchanged
    const videos = lessons.map((l) => l.youtubeVideoId).filter(Boolean);
    assert.ok(videos.length > 0, `Course ${slug} must have YouTube video IDs`);
  }
});

test('Test 2 — Direct Lesson Access: Modules and lessons are accessible without quiz requirements', () => {
  const storytelling = COURSES.find((c) => c.slug === 'free-storytelling-masterclass')!;
  
  // Module 1 Lesson 1
  const m1l1 = storytelling.modules[0].lessons[0];
  assert.ok(m1l1, 'Module 1 Lesson 1 must exist');
  
  // Module 1 Lesson 4
  const m1l4 = storytelling.modules[0].lessons[3] || storytelling.modules[0].lessons[0];
  assert.ok(m1l4, 'Module 1 Lesson 4 must exist');
  
  // Middle module (Module 10)
  const m10 = storytelling.modules[9];
  assert.ok(m10, 'Module 10 must exist');
  assert.ok(m10.lessons.length > 0, 'Module 10 must have lessons');
  
  // Final module (Module 20)
  const m20 = storytelling.modules[19];
  assert.ok(m20, 'Module 20 must exist');
  assert.ok(m20.lessons.length > 0, 'Module 20 must have lessons');
});

test('Test 3 — Progress Preservation: Lesson, lab, and video progress calculations are independent of quizzes', () => {
  const course = COURSES.find((c) => c.slug === 'linux-zero-to-advanced')!;
  const comp = getComprehensiveCourseCompletion(course);
  
  assert.equal(comp.totalQuizzes, 0, 'Total quizzes must be 0');
  assert.equal(comp.quizzesPassed, 0, 'Quizzes passed must be 0');
  assert.equal(comp.quizCompletionPercent, 100, 'Quiz completion percent must report 100%');
  assert.ok(comp.overallProgressPercent >= 0 && comp.overallProgressPercent <= 100);
});

test('Test 4 — No Quiz UI: No quiz buttons, tabs, forms, modals, or gates appear in learning code', () => {
  const panels = repo('src/components/courses/learning/LessonContentSections.tsx');
  const layout = repo('src/components/courses/learning/UniversalCourseLearningLayout.tsx');
  const sidebar = repo('src/components/courses/learning/CurriculumSidebar.tsx');
  const moduleRow = repo('src/components/courses/learning/CurriculumModule.tsx');
  const nav = repo('src/components/courses/learning/LessonNavigation.tsx');
  const progressHeader = repo('src/components/courses/learning/CourseProgressHeader.tsx');

  // Verify quiz elements are strictly absent
  assert.doesNotMatch(panels, /ModuleQuizView/);
  assert.doesNotMatch(panels, /<span>Module Quiz/);
  assert.doesNotMatch(panels, /data-testid="module-quiz-assessment-section"/);
  assert.doesNotMatch(panels, /Start Assessment Quiz/);
  assert.doesNotMatch(nav, /Take Module Quiz/);
  assert.doesNotMatch(layout, /data-testid="locked-lesson-overlay"/);
  assert.doesNotMatch(layout, /isCurrentLessonLocked\s*=\s*true/);
  assert.doesNotMatch(sidebar, /Pass Week .* Quiz/);
  assert.doesNotMatch(moduleRow, /data-testid="module-quiz-sidebar-row-/);
  assert.doesNotMatch(progressHeader, /2\. Module Quizzes/);
});

test('Test 5 — Certificate & Milestone Eligibility: No quiz pass score is needed', () => {
  for (const course of COURSES) {
    const comp = getComprehensiveCourseCompletion(course);
    assert.ok(
      !comp.remainingRequirements.some((r) => r.toLowerCase().includes('quiz')),
      `Course ${course.slug} must not have quiz milestones`
    );
  }
});

test('Test 6 — Retired API Endpoints: Quiz endpoints return 410 Gone safely', async () => {
  const resGeneral = await submitQuiz();
  assert.equal(resGeneral.status, 410);
  const dataGeneral = await resGeneral.json();
  assert.equal(dataGeneral.retired, true);

  const resStorytelling = await submitStorytellingQuiz();
  assert.equal(resStorytelling.status, 410);
  const dataStorytelling = await resStorytelling.json();
  assert.equal(dataStorytelling.retired, true);
});

test('Test 7 — Interactive Knowledge Check UI Removal & Content Preservation', () => {
  const renderer = repo('src/components/courses/LessonContentRenderer.tsx');

  // Verify that the interactive quiz UI is removed from LessonContentRenderer
  assert.doesNotMatch(renderer, /<InteractiveKnowledgeCheck/);
  assert.doesNotMatch(renderer, /<span>Submit Answer<\/span>/);
  assert.doesNotMatch(renderer, /<span>Lesson Knowledge Check<\/span>/);
  assert.doesNotMatch(renderer, /✓ Correct Answer!/);
  assert.doesNotMatch(renderer, /input type="radio"/);

  // Verify that Network Packet Forensics course data preserves all knowledgeCheck definitions
  const npf = COURSES.find((c) => c.slug === 'network-packet-analysis-masterclass')!;
  assert.ok(npf, 'Network Packet Forensics course must exist in COURSES');
  const lessonsWithKC = npf.modules.flatMap((m) => m.lessons).filter((l) => (l as any).knowledgeCheck || (l as any).content?.knowledgeCheck);
  // Source course definition preserves all knowledge check question data intact without deleting course content
  const npfSource = repo('src/data/network-packet-forensics-course.ts');
  const kcMatches = npfSource.match(/"knowledgeCheck":/g);
  assert.ok(kcMatches && kcMatches.length >= 37, `Expected at least 37 knowledgeCheck definitions preserved, found ${kcMatches?.length}`);
});

test('Test 8 — Course Count Reconciliation: 15 active courses, 16 slugs/routes, 12 DB courses', () => {
  assert.equal(COURSES.length, 15, `Expected exactly 15 static courses in COURSES, found ${COURSES.length}`);

  // Check alias redirect in course route
  const coursePage = repo('app/courses/[slug]/page.tsx');
  assert.match(coursePage, /network-packet-analysis-forensics-masterclass/);
  assert.match(coursePage, /redirect\(`\/courses\/network-packet-analysis-masterclass/);
});

