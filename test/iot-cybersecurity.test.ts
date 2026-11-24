import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { COURSES } from '../src/data/courses';
import { IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE as course } from '../src/data/iot-cybersecurity-course';
import { IOT_VIDEO_MANIFEST } from '../src/data/iot/video-manifest';
import { HARDWARE_CATALOG } from '../src/data/iot/hardware-catalog';
import { IOT_DIAGRAMS } from '../src/data/iot/diagrams';
import { IOT_PROJECTS } from '../src/data/iot/projects';

const allLessons = course.modules.flatMap((m) => m.lessons);

describe('IoT Cybersecurity Zero to Advanced Course – Comprehensive Release Verification', () => {
  it('is registered exactly once in catalog and has unique slug', () => {
    assert.equal(course.id, 'course-iot-cybersecurity-zero-to-advanced');
    assert.equal(course.slug, 'iot-cybersecurity-zero-to-advanced');
    assert.equal(COURSES.filter((c) => c.slug === course.slug).length, 1);
    const slugs = COURSES.map((c) => c.slug);
    assert.equal(slugs.length, new Set(slugs).size);
  });

  it('retains exactly 30 ordered modules with exactly four lessons and one practical lab each', () => {
    assert.equal(course.modules.length, 30);
    course.modules.forEach((m, i) => {
      assert.equal(m.order, i + 1);
      assert.equal(m.lessons.length, 4);
      assert.ok(m.description && m.title && m.practicalLab);
      assert.ok(m.practicalLab?.instructions.length && m.practicalLab?.completionCriteria.length);
      assert.equal(m.practicalLab?.evidenceWorksheet.length, 3);
    });
  });

  it('delivers exactly 120 distinct verified primary YouTube IDs with zero repeats', () => {
    assert.equal(allLessons.length, 120);
    assert.equal(new Set(allLessons.map((l) => l.id)).size, 120);
    assert.equal(new Set(allLessons.map((l) => l.slug)).size, 120);

    // ZERO DUPLICATES GATE
    const videoIds = allLessons.map((l) => l.youtubeVideoId || '');
    assert.equal(videoIds.length, 120);
    assert.equal(new Set(videoIds).size, 120, 'Generated list of duplicate IDs must be strictly empty');

    // Manifest match check
    assert.equal(IOT_VIDEO_MANIFEST.length, 120);
    assert.equal(new Set(IOT_VIDEO_MANIFEST.map((v) => v.videoId)).size, 120);

    allLessons.forEach((l, i) => {
      assert.match(l.youtubeVideoId || '', /^[a-zA-Z0-9_-]{11}$/);
      assert.equal(l.order, (i % 4) + 1);
      assert.ok(l.durationMinutes > 0, 'Real video duration must be positive minutes');
      assert.ok((l as any).estimatedStudyMinutes >= 35, 'Study & lab time allocated');
      assert.ok(l.videoAttribution?.creator);
      assert.ok(l.richContent?.introduction);
      assert.ok(l.richContent?.theorySections?.length);
      assert.ok(l.richContent?.stepByStepProcedures?.length);
      assert.ok(l.richContent?.securityRelevance);
    });
  });

  it('has zero quizzes, zero quiz questions, and zero quiz lock gates', () => {
    assert.ok(!('quiz' in course));
    for (const m of course.modules) {
      assert.ok(!m.quiz);
      assert.deepEqual(m.practicalLab?.questions, []);
      for (const l of m.lessons) {
        assert.ok(!l.quiz && !l.richContent?.knowledgeCheck);
      }
    }
  });

  it('has a 100-mark practical capstone with 7 rubric categories and zero quiz dependency', () => {
    assert.ok(course.modules[29].capstoneAssessment);
    const c = course.modules[29].capstoneAssessment!;
    assert.equal(c.totalMarks, 100);
    assert.equal(c.passingScore, 75);
    assert.equal(c.rubric.reduce((sum, r) => sum + r.marks, 0), 100);
    assert.equal(c.submissionSections.reduce((sum, r) => sum + r.maxMarks, 0), 100);
    assert.equal(c.rubric.length, 7);
    assert.equal(c.submissionSections.length, 7);
    assert.equal(course.modules.slice(0, 29).filter((m) => m.capstoneAssessment).length, 0);
  });

  it('includes complete hardware catalog, diagram registry, and 30 practical projects', () => {
    assert.ok(HARDWARE_CATALOG.length >= 15, 'Hardware catalog populated with 15+ components');
    assert.ok(HARDWARE_CATALOG.every((p) => p.partId && p.name && p.voltageMin >= 0));
    assert.equal(IOT_DIAGRAMS.length, 6, 'Contains 6 core code-rendered interactive diagrams');
    assert.equal(IOT_PROJECTS.length, 30, 'Contains 30 practical projects');
    const portfolioProjects = IOT_PROJECTS.filter((p) => p.isPortfolioProject);
    assert.equal(portfolioProjects.length, 6, 'Contains 6 major portfolio milestone projects');
  });

  it('separates real video duration from hands-on study hours in course metadata', () => {
    assert.ok(course.totalDurationMinutes > 1800, 'Sum of actual video runtimes (> 30 hours)');
    assert.match(course.estimatedDuration, /hours of video tutorials/i);
    assert.match(course.estimatedDuration, /hands-on study/i);
  });
});
