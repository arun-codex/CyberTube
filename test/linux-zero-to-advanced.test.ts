import { describe, it } from 'node:test';
import assert from 'node:assert';
import { COURSES } from '../src/data/courses';
import { LINUX_ZERO_TO_ADVANCED_COURSE } from '../src/data/linux-zero-to-advanced-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';

describe('Linux Zero to Advanced Course Verification Suite', () => {
  it('1. Course registration in courses catalog', () => {
    const course = COURSES.find((c) => c.slug === 'linux-zero-to-advanced');
    assert.ok(course, 'Course must be present in COURSES catalog');
    assert.strictEqual(course.slug, 'linux-zero-to-advanced');
    assert.ok(course.totalDurationMinutes > 0);
    assert.ok(course.learningObjectives && course.learningObjectives.length > 0);
  });

  it('2. Slug uniqueness in COURSES catalog', () => {
    const slugs = COURSES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    assert.strictEqual(slugs.length, uniqueSlugs.size, 'All course slugs must be unique');
  });

  it('3. Exactly 24 modules numbered sequentially 1 to 24', () => {
    assert.strictEqual(LINUX_ZERO_TO_ADVANCED_COURSE.modules.length, 24);
    LINUX_ZERO_TO_ADVANCED_COURSE.modules.forEach((mod, idx) => {
      assert.strictEqual(mod.order, idx + 1, `Module order index mismatch at index ${idx}`);
      assert.ok(mod.title.length > 0, `Module ${idx} missing title`);
      assert.ok(mod.description.length > 0, `Module ${idx} missing description`);
      assert.ok(mod.lessons.length > 0, `Module ${idx} has no lessons`);
    });
  });

  it('4. Exactly 55 lessons across the 24 modules', () => {
    const lessons = getCourseLessons(LINUX_ZERO_TO_ADVANCED_COURSE);
    assert.strictEqual(lessons.length, 55, 'Course must contain exactly 55 lessons');
    
    // Verify each lesson has valid youtubeVideoId, title, and order
    lessons.forEach((les, idx) => {
      assert.ok(les.id, `Lesson ${idx} missing id`);
      assert.ok(les.title, `Lesson ${idx} missing title`);
      assert.ok(les.youtubeVideoId, `Lesson ${idx} missing youtubeVideoId`);
      assert.match(les.youtubeVideoId, /^[a-zA-Z0-9_-]{11}$/, `Lesson ${idx} (${les.title}) has invalid video ID: ${les.youtubeVideoId}`);
      assert.ok(les.durationMinutes > 0, `Lesson ${idx} duration must be positive`);
    });
  });

  it('5. All 24 modules contain rich practical labs', () => {
    LINUX_ZERO_TO_ADVANCED_COURSE.modules.forEach((mod, idx) => {
      assert.ok(mod.practicalLab, `Module ${idx} must contain practicalLab`);
      assert.ok(mod.practicalLab.title, `Module ${idx} practicalLab missing title`);
      assert.ok(mod.practicalLab.tasks.length > 0, `Module ${idx} practicalLab must have tasks`);
      assert.ok(mod.practicalLab.completionCriteria.length > 0, `Module ${idx} practicalLab must have completion criteria`);
      assert.ok(mod.practicalLab.estimatedMinutes > 0, `Module ${idx} practicalLab must have positive duration`);
    });
  });

  it('6. All 24 modules contain knowledge-check quizzes with explanations', () => {
    LINUX_ZERO_TO_ADVANCED_COURSE.modules.forEach((mod, idx) => {
      assert.ok(mod.quiz, `Module ${idx} must contain quiz`);
      assert.strictEqual(mod.quiz.questions.length, 3, `Module ${idx} quiz must have exactly 3 scenario questions`);
      mod.quiz.questions.forEach((q: any, qIdx: number) => {
        assert.ok(q.question.length > 15, `Module ${idx} Q${qIdx} question too short`);
        assert.strictEqual(q.options.length, 4, `Module ${idx} Q${qIdx} must have 4 options`);
        assert.ok(q.correctAnswerIndex >= 0 && q.correctAnswerIndex < 4, `Module ${idx} Q${qIdx} correctAnswerIndex out of range`);
        assert.ok(q.explanation.length > 20, `Module ${idx} Q${qIdx} explanation missing or too short`);
      });
    });
  });

  it('7. Comprehensive Capstone Assessment in Module 24', () => {
    const capstone = (LINUX_ZERO_TO_ADVANCED_COURSE.capstone || LINUX_ZERO_TO_ADVANCED_COURSE.modules[23]?.capstoneAssessment) as any;
    assert.ok(capstone, 'Course must have capstone assessment');
    assert.ok(capstone.title, 'Capstone missing title');
    assert.ok(capstone.scenario, 'Capstone missing scenario');
    assert.ok(capstone.totalMarks === 100, 'Capstone totalMarks must equal 100');
    assert.ok(capstone.submissionSections.length >= 4, 'Capstone must have submission sections');
    assert.ok(capstone.rubric.length >= 4, 'Capstone must have rubric');
  });

  it('8. Rich content verification on lessons', () => {
    const lessons = getCourseLessons(LINUX_ZERO_TO_ADVANCED_COURSE);
    lessons.forEach((les, idx) => {
      assert.ok(les.richContent, `Lesson ${idx} (${les.title}) missing richContent`);
      assert.ok(les.richContent.summary && les.richContent.summary.length > 10, `Lesson ${idx} summary missing`);
      assert.ok(les.richContent.stepByStepProcedures && les.richContent.stepByStepProcedures.length > 0, `Lesson ${idx} stepByStepProcedures missing`);
      assert.ok(les.richContent.expectedObservations && les.richContent.expectedObservations.length > 0, `Lesson ${idx} expectedObservations missing`);
      assert.ok(les.richContent.commonMistakes && les.richContent.commonMistakes.length > 0, `Lesson ${idx} commonMistakes missing`);
      assert.ok(les.richContent.securityRelevance && les.richContent.securityRelevance.length > 10, `Lesson ${idx} securityRelevance missing`);
    });
  });

  it('9. getCourseBySlug utility lookup', () => {
    const found = getCourseBySlug('linux-zero-to-advanced');
    assert.ok(found, 'Lookup by slug must return course');
    assert.strictEqual(found.modules.length, 24);
  });
});
