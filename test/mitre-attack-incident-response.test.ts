import { describe, it } from 'node:test';
import assert from 'node:assert';
import { COURSES } from '../src/data/courses';
import { MITRE_ATTACK_INCIDENT_RESPONSE_COURSE } from '../src/data/mitre-attack-incident-response-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';

describe('MITRE ATT&CK Incident Response Zero to Advanced Course Verification Suite', () => {
  it('1. Course registration in courses catalog', () => {
    const course = COURSES.find((c) => c.slug === 'mitre-attack-incident-response-zero-to-advanced');
    assert.ok(course, 'Course must be present in COURSES catalog');
    assert.strictEqual(course.id, 'course-mitre-attack-incident-response');
    assert.strictEqual(course.slug, 'mitre-attack-incident-response-zero-to-advanced');
    assert.ok(['beginner', 'intermediate', 'advanced'].includes(course.difficulty));
    assert.ok(course.totalDurationMinutes > 0);
    assert.ok(course.learningObjectives && course.learningObjectives.length > 0);
    assert.ok(course.tags && course.tags.includes('mitre-attack'));
    assert.ok(course.domains && course.domains.includes('soc-blue-team'));
  });

  it('2. Slug uniqueness in COURSES catalog', () => {
    const slugs = COURSES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    assert.strictEqual(slugs.length, uniqueSlugs.size, 'All course slugs must be unique');
  });

  it('3. Exactly 30 modules numbered sequentially 1 to 30', () => {
    assert.strictEqual(MITRE_ATTACK_INCIDENT_RESPONSE_COURSE.modules.length, 30);
    MITRE_ATTACK_INCIDENT_RESPONSE_COURSE.modules.forEach((mod, idx) => {
      assert.strictEqual(mod.order, idx + 1, `Module order index mismatch at index ${idx}`);
      assert.ok(mod.title.length > 0, `Module ${idx} missing title`);
      assert.ok(mod.description.length > 0, `Module ${idx} missing description`);
      assert.ok(mod.lessons.length > 0, `Module ${idx} has no lessons`);
      assert.ok(mod.practicalLab, `Module ${idx} missing practicalLab`);
    });
  });

  it('4. Exactly 150 lessons across the 30 modules (5 lessons per module)', () => {
    const lessons = getCourseLessons(MITRE_ATTACK_INCIDENT_RESPONSE_COURSE);
    assert.strictEqual(lessons.length, 150, 'Course must contain exactly 150 lessons');
    
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
      assert.ok(les.durationMinutes > 0, `Lesson ${idx} duration must be positive`);
      assert.ok(les.richContent, `Lesson ${idx} missing richContent`);
      assert.ok(les.richContent?.introduction, `Lesson ${idx} missing introduction`);
      assert.ok(les.richContent?.theorySections?.length, `Lesson ${idx} missing theorySections`);
      assert.ok(les.richContent?.stepByStepProcedures?.length, `Lesson ${idx} missing stepByStepProcedures`);
      assert.ok(les.richContent?.securityRelevance, `Lesson ${idx} missing securityRelevance`);
    });
  });

  it('5. Each module has an assessment quiz with rigorous scenario-based questions', () => {
    MITRE_ATTACK_INCIDENT_RESPONSE_COURSE.modules.forEach((mod, idx) => {
      assert.ok(mod.quiz, `Module ${idx + 1} missing quiz`);
      assert.strictEqual(mod.quiz?.questions.length, 3, `Module ${idx + 1} quiz must have 3 questions`);
      mod.quiz?.questions.forEach((q, qIdx) => {
        assert.ok(q.question.length > 10, `Module ${idx + 1} Q${qIdx + 1} question too short`);
        assert.strictEqual(q.options.length, 4, `Module ${idx + 1} Q${qIdx + 1} must have 4 options`);
        assert.ok(
          typeof q.correctAnswerIndex === 'number' && q.correctAnswerIndex >= 0 && q.correctAnswerIndex < 4,
          `Module ${idx + 1} Q${qIdx + 1} invalid correctAnswerIndex`
        );
        assert.ok(q.explanation && q.explanation.length > 20, `Module ${idx + 1} Q${qIdx + 1} missing explanation`);
      });
    });
  });

  it('6. Capstone assessment is complete with scenario, rubric and submission sections', () => {
    const capstone = MITRE_ATTACK_INCIDENT_RESPONSE_COURSE.capstone;
    assert.ok(capstone, 'Course must have a capstone assessment');
    assert.strictEqual(capstone.totalMarks, 100);
    assert.strictEqual(capstone.passingScore, 75);
    assert.strictEqual(capstone.rubric.length, 4);
    assert.strictEqual(capstone.submissionSections.length, 4);
  });

  it('7. getCourseBySlug retrieves MITRE ATT&CK course correctly', () => {
    const fetched = getCourseBySlug('mitre-attack-incident-response-zero-to-advanced');
    assert.ok(fetched, 'getCourseBySlug should find course');
    assert.strictEqual(fetched?.id, 'course-mitre-attack-incident-response');
    assert.strictEqual(fetched?.modules.length, 30);
  });
});
