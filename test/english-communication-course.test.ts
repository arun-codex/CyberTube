import { describe, it } from 'node:test';
import assert from 'node:assert';
import { COURSES } from '../src/data/courses';
import { ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE } from '../src/data/english-communication-for-cybersecurity-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';
import { getComprehensiveCourseCompletion } from '../src/lib/course-progress';

describe('English Communication for Cybersecurity Zero to Advanced Course Verification Suite', () => {
  it('1. Course registration in courses catalog', () => {
    const course = COURSES.find((c) => c.slug === 'english-communication-for-cybersecurity-zero-to-advanced');
    assert.ok(course, 'Course must be present in COURSES catalog');
    assert.strictEqual(course.id, 'course-english-communication-zero-to-advanced');
    assert.strictEqual(course.slug, 'english-communication-for-cybersecurity-zero-to-advanced');
    assert.strictEqual(course.difficulty, 'beginner');
    assert.strictEqual(course.track, 'cybersecurity');
    assert.strictEqual(course.totalDurationMinutes, 4800);
    assert.ok(course.learningObjectives && course.learningObjectives.length >= 5);
    assert.ok(course.tags && course.tags.includes('english-communication'));
    assert.ok(course.tags.includes('soc-analyst'));
    assert.ok(course.domains && course.domains.includes('fundamentals'));
    assert.ok(course.domains.includes('soc-blue-team'));
  });

  it('2. Slug uniqueness in COURSES catalog', () => {
    const slugs = COURSES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    assert.strictEqual(slugs.length, uniqueSlugs.size, 'All course slugs must be unique');
  });

  it('3. Exactly 30 modules numbered sequentially 1 to 30 with rich practical communication workshops', () => {
    assert.strictEqual(ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE.modules.length, 30);
    ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE.modules.forEach((mod, idx) => {
      assert.strictEqual(mod.order, idx + 1, `Module order index mismatch at index ${idx}`);
      assert.ok(mod.title.length > 0, `Module ${idx + 1} missing title`);
      assert.ok(mod.description.length > 0, `Module ${idx + 1} missing description`);
      assert.strictEqual(mod.lessons.length, 4, `Module ${idx + 1} must have exactly 4 lessons`);
      assert.ok(mod.practicalLab, `Module ${idx + 1} missing practicalLab`);
      assert.ok(mod.practicalLab.instructions && mod.practicalLab.instructions.length > 0, `Module ${idx + 1} lab missing instructions`);
      assert.ok(mod.practicalLab.tasks && mod.practicalLab.tasks.length > 0, `Module ${idx + 1} lab missing tasks`);
      assert.ok(mod.practicalLab.evidenceWorksheet && mod.practicalLab.evidenceWorksheet.length > 0, `Module ${idx + 1} lab missing evidenceWorksheet`);
      assert.ok(mod.practicalLab.completionCriteria && mod.practicalLab.completionCriteria.length > 0, `Module ${idx + 1} lab missing completionCriteria`);
      
      // Strict site-wide rule: ZERO module quizzes
      assert.strictEqual((mod as any).quiz, undefined, `Module ${idx + 1} must NOT have a quiz`);
    });
  });

  it('4. Exactly 120 lessons across the 30 modules (4 lessons per module) with verified YouTube IDs', () => {
    const lessons = getCourseLessons(ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE);
    assert.strictEqual(lessons.length, 120, 'Course must contain exactly 120 lessons');
    
    // Verify each lesson has valid youtubeVideoId, title, order, richContent and NO quizzes
    lessons.forEach((les, idx) => {
      assert.ok(les.id, `Lesson ${idx} missing id`);
      assert.ok(les.title, `Lesson ${idx} missing title`);
      assert.ok(les.youtubeVideoId, `Lesson ${idx} missing youtubeVideoId`);
      assert.match(
        les.youtubeVideoId,
        /^[a-zA-Z0-9_-]{11}$/,
        `Lesson ${idx} (${les.title}) has invalid video ID: ${les.youtubeVideoId}`
      );
      assert.strictEqual(les.durationMinutes, 40, `Lesson ${idx} duration must be 40 minutes`);
      assert.ok(les.richContent, `Lesson ${idx} missing richContent`);
      assert.ok(les.richContent?.introduction, `Lesson ${idx} missing introduction`);
      assert.ok(les.richContent?.theorySections?.length, `Lesson ${idx} missing theorySections`);
      assert.ok(les.richContent?.stepByStepProcedures?.length, `Lesson ${idx} missing stepByStepProcedures`);
      assert.ok(les.richContent?.securityRelevance, `Lesson ${idx} missing securityRelevance`);
      
      // Strict site-wide rule: ZERO lesson quizzes
      assert.strictEqual((les as any).quiz, undefined, `Lesson ${idx} must NOT have a quiz`);
    });
  });

  it('5. Capstone assessment is complete with scenario, rubric and non-quiz submission sections', () => {
    const capstone = ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE.capstone;
    assert.ok(capstone, 'Course must have a capstone assessment');
    assert.strictEqual(capstone.totalMarks, 100);
    assert.strictEqual(capstone.passingScore, 75);
    assert.strictEqual(capstone.rubric.length, 4);
    assert.strictEqual(capstone.submissionSections.length, 5);
  });

  it('6. Progress calculation is 100% quiz-free with zero quiz dependencies', () => {
    const comp = getComprehensiveCourseCompletion(ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE);
    assert.strictEqual(comp.totalQuizzes, 0, 'Total quizzes must be 0');
    assert.strictEqual(comp.quizzesPassed, 0, 'Quizzes passed must be 0');
    assert.strictEqual(comp.quizCompletionPercent, 100, 'Quiz completion percent must report 100%');
    assert.ok(
      !comp.remainingRequirements.some((r) => r.toLowerCase().includes('quiz')),
      'Course must not have quiz milestones'
    );
  });

  it('7. getCourseBySlug retrieves English Communication course correctly', () => {
    const course = getCourseBySlug('english-communication-for-cybersecurity-zero-to-advanced');
    assert.ok(course, 'getCourseBySlug should find english-communication-for-cybersecurity-zero-to-advanced');
    assert.strictEqual(course?.id, 'course-english-communication-zero-to-advanced');
    assert.strictEqual(course?.modules.length, 30);
    assert.strictEqual(getCourseLessons(course!).length, 120);
  });
});
