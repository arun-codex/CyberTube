import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { COURSES } from '../src/data/courses';
import { POST as submitQuiz, GET as getQuiz } from '../app/api/courses/quiz/submit/route';
import { POST as submitStorytellingQuiz, GET as getStorytellingQuiz } from '../app/api/courses/storytelling/quiz/submit/route';
import { getComprehensiveCourseCompletion } from '../src/lib/course-progress';

const repo = (p: string) => readFileSync(join(process.cwd(), p), 'utf-8');
const linux = COURSES.find((c) => c.slug === 'linux-zero-to-advanced')!;
const mern = COURSES.find((c) => c.slug === 'mern-full-stack-course-with-ai')!;
const storytelling = COURSES.find((c) => c.slug === 'free-storytelling-masterclass')!;

test('Course Preservation — MERN playlist contains all 34 source videos across 5 modules', () => {
  assert.equal(mern.sourcePlaylistId, 'PLQl7ZDyS2qk8');
  assert.equal(mern.modules.length, 5);
  assert.equal(mern.modules.flatMap((m) => m.lessons).length, 34);
  const videoIds = mern.modules.flatMap((m) => m.lessons).map((l) => l.youtubeVideoId);
  assert.equal(videoIds.filter(Boolean).length, 34);
  assert.equal(videoIds[0], 'fFVZ9xbyBlc');
  assert.equal(videoIds[1], 'aqtA2zHURbg');
  assert.equal(videoIds[2], 'PNQiabb5ZjY');
});

test('Course Preservation — all courses and modules remain intact', () => {
  assert.ok(COURSES.length >= 8, 'Expected at least 8 courses in COURSES catalog');
  for (const course of COURSES) {
    assert.ok(course.id, `Course ${course.slug} missing id`);
    assert.ok(course.slug, `Course ${course.id} missing slug`);
    assert.ok(course.title, `Course ${course.slug} missing title`);
    assert.ok(course.modules.length > 0, `Course ${course.slug} has no modules`);
    const lessons = course.modules.flatMap((m) => m.lessons);
    assert.ok(lessons.length > 0, `Course ${course.slug} has no lessons`);
    for (const lesson of lessons) {
      assert.ok(lesson.id, `Lesson missing id in ${course.slug}`);
      assert.ok(lesson.title, `Lesson missing title in ${course.slug}`);
    }
  }
});

test('Direct Lesson Access — Storytelling Masterclass modules are directly accessible without quiz gates', () => {
  assert.ok(storytelling, 'Storytelling course must exist');
  assert.equal(storytelling.modules.length, 20);
  // Verify first, middle, and last modules exist and have valid lessons
  const mod1 = storytelling.modules[0];
  const mod10 = storytelling.modules[9];
  const mod20 = storytelling.modules[19];
  assert.ok(mod1.lessons.length > 0);
  assert.ok(mod10.lessons.length > 0);
  assert.ok(mod20.lessons.length > 0);
});

test('Quiz API Retirement — general quiz submit route returns HTTP 410 Gone', async () => {
  const postRes = await submitQuiz();
  assert.equal(postRes.status, 410);
  const postBody = await postRes.json();
  assert.equal(postBody.retired, true);
  assert.match(postBody.error, /retired/i);

  const getRes = await getQuiz();
  assert.equal(getRes.status, 410);
  const getBody = await getRes.json();
  assert.equal(getBody.retired, true);
});

test('Quiz API Retirement — storytelling quiz submit route returns HTTP 410 Gone', async () => {
  const postRes = await submitStorytellingQuiz();
  assert.equal(postRes.status, 410);
  const postBody = await postRes.json();
  assert.equal(postBody.retired, true);
  assert.match(postBody.error, /retired/i);

  const getRes = await getStorytellingQuiz();
  assert.equal(getRes.status, 410);
  const getBody = await getRes.json();
  assert.equal(getBody.retired, true);
});

test('UI Cleanliness — no quiz tabs, gates, or buttons in learning workspace components', () => {
  const panels = repo('src/components/courses/learning/LessonContentSections.tsx');
  const layout = repo('src/components/courses/learning/UniversalCourseLearningLayout.tsx');
  const sidebar = repo('src/components/courses/learning/CurriculumSidebar.tsx');
  const moduleRow = repo('src/components/courses/learning/CurriculumModule.tsx');
  const nav = repo('src/components/courses/learning/LessonNavigation.tsx');
  const progressHeader = repo('src/components/courses/learning/CourseProgressHeader.tsx');

  // No active quiz components or tabs
  assert.doesNotMatch(panels, /<ModuleQuizView/);
  assert.doesNotMatch(panels, /<span>Module Quiz/);
  assert.doesNotMatch(panels, /data-testid="module-quiz-assessment-section"/);
  assert.doesNotMatch(panels, /Start Assessment Quiz/);
  assert.doesNotMatch(panels, /Retake Assessment Quiz/);

  // No quiz buttons in navigation
  assert.doesNotMatch(nav, /Take Module Quiz/);

  // No quiz lock overlays in layout
  assert.doesNotMatch(layout, /data-testid="locked-lesson-overlay"/);
  assert.doesNotMatch(layout, /Go to Required Quiz/);
  assert.doesNotMatch(layout, /isCurrentLessonLocked\s*=\s*true/);

  // No quiz locking in sidebar or module
  assert.doesNotMatch(sidebar, /isSequentialQuizCourse\s*=\s*true/);
  assert.doesNotMatch(sidebar, /Pass Week .* Quiz/);
  assert.doesNotMatch(moduleRow, /data-testid="module-quiz-sidebar-row-/);
  assert.doesNotMatch(moduleRow, /Start Quiz →/);
  assert.doesNotMatch(moduleRow, /Go to Required Quiz/);

  // No quiz progress dimension in CourseProgressHeader
  assert.doesNotMatch(progressHeader, /2\. Module Quizzes/);
});

test('Progress Calculation — completion percentage is independent of quizzes', () => {
  for (const course of [linux, mern, storytelling]) {
    const comp = getComprehensiveCourseCompletion(course);
    assert.equal(comp.totalQuizzes, 0, 'Total quizzes must be 0');
    assert.equal(comp.quizzesPassed, 0, 'Quizzes passed must be 0');
    assert.equal(comp.quizCompletionPercent, 100, 'Quiz completion percent must report 100%');
    assert.ok(comp.overallProgressPercent >= 0 && comp.overallProgressPercent <= 100);
    assert.ok(!comp.remainingRequirements.some((r) => r.toLowerCase().includes('quiz')),
      'Remaining requirements must not mention quizzes');
  }
});
