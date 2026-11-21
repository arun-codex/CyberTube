import { describe, it } from 'node:test';
import assert from 'node:assert';
import { COURSES } from '../src/data/courses';
import { PYTHON_FOR_CYBERSECURITY_COURSE } from '../src/data/python-for-cybersecurity-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';

describe('Python for Cybersecurity Zero to Advanced Course Verification Suite', () => {
  it('1. Course registration in courses catalog', () => {
    const course = COURSES.find((c) => c.slug === 'python-for-cybersecurity-zero-to-advanced');
    assert.ok(course, 'Course must be present in COURSES catalog');
    assert.strictEqual(course.id, 'course-python-for-cybersecurity-zero-to-advanced');
    assert.strictEqual(course.slug, 'python-for-cybersecurity-zero-to-advanced');
    assert.strictEqual(course.difficulty, 'intermediate');
    assert.strictEqual(course.totalDurationMinutes, 4200);
    assert.ok(course.estimatedDuration.includes('70 hours video'));
    assert.ok(course.learningObjectives && course.learningObjectives.length >= 6);
    assert.ok(course.tags && course.tags.includes('python'));
    assert.ok(course.tags && course.tags.includes('cybersecurity'));
    assert.ok(course.domains && course.domains.includes('soc-blue-team'));
  });

  it('2. Slug uniqueness in COURSES catalog', () => {
    const slugs = COURSES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    assert.strictEqual(slugs.length, uniqueSlugs.size, 'All course slugs must be unique');
  });

  it('3. Exactly 30 modules numbered sequentially 1 to 30', () => {
    assert.strictEqual(PYTHON_FOR_CYBERSECURITY_COURSE.modules.length, 30);
    PYTHON_FOR_CYBERSECURITY_COURSE.modules.forEach((mod, idx) => {
      assert.strictEqual(mod.order, idx + 1, `Module order index mismatch at index ${idx}`);
      assert.ok(mod.title.length > 0, `Module ${idx} missing title`);
      assert.ok(mod.description.length > 0, `Module ${idx} missing description`);
      assert.ok(mod.lessons.length > 0, `Module ${idx} has no lessons`);
      assert.ok(mod.practicalLab, `Module ${idx} missing practicalLab`);
    });
  });

  it('4. Exactly 120 lessons across the 30 modules (4 lessons per module)', () => {
    const lessons = getCourseLessons(PYTHON_FOR_CYBERSECURITY_COURSE);
    assert.strictEqual(lessons.length, 120, 'Course must contain exactly 120 lessons');

    // Verify each lesson has valid youtubeVideoId, title, order, and richContent
    lessons.forEach((les, idx) => {
      assert.ok(les.id, `Lesson ${idx} missing id`);
      assert.ok(les.title, `Lesson ${idx} missing title`);
      assert.ok(les.youtubeVideoId, `Lesson ${idx} missing youtubeVideoId`);
      assert.match(
        les.youtubeVideoId,
        /^[a-zA-Z0-9_-]{11}$/,
        `Lesson ${idx} (${les.title}) has invalid video ID: ${les.youtubeVideoId}`
      );
      assert.strictEqual(les.durationMinutes, 35, `Lesson ${idx} duration must be 35 minutes`);
      assert.ok(les.richContent, `Lesson ${idx} missing richContent`);
      assert.ok(les.richContent?.introduction, `Lesson ${idx} missing introduction`);
      assert.ok(les.richContent?.theorySections?.length, `Lesson ${idx} missing theorySections`);
      assert.ok(les.richContent?.stepByStepProcedures?.length, `Lesson ${idx} missing stepByStepProcedures`);
      assert.ok(les.richContent?.securityRelevance, `Lesson ${idx} missing securityRelevance`);
    });
  });

  it('5. Capstone assessment present on Module 30', () => {
    const mod30 = PYTHON_FOR_CYBERSECURITY_COURSE.modules[29];
    assert.ok(mod30.capstoneAssessment, 'Module 30 must have capstoneAssessment');
    assert.strictEqual(mod30.capstoneAssessment?.passingScore, 75);
    assert.strictEqual(mod30.capstoneAssessment?.totalMarks, 100);
    assert.ok(mod30.capstoneAssessment?.rubric && mod30.capstoneAssessment.rubric.length >= 6);
  });
});
