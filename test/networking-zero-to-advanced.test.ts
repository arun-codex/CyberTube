import { describe, it } from 'node:test';
import assert from 'node:assert';
import { COURSES } from '../src/data/courses';
import { NETWORKING_FOR_CYBERSECURITY_COURSE } from '../src/data/networking-for-cybersecurity-course';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';
import { getComprehensiveCourseCompletion } from '../src/lib/course-progress';

describe('Networking for Cybersecurity: Zero to Advanced Test Suite', () => {
  it('1. Course registration and coexistence with existing networking course', () => {
    const course = COURSES.find((c) => c.slug === 'networking-for-cybersecurity-zero-to-advanced');
    assert.ok(course, 'New networking course must be present in COURSES catalog');
    assert.strictEqual(course.slug, 'networking-for-cybersecurity-zero-to-advanced');
    assert.strictEqual(course.id, 'e0000000-0000-4000-8000-000000000001');

    const legacyCourse = COURSES.find((c) => c.slug === 'networking-for-hackers-2027');
    assert.ok(legacyCourse, 'Legacy networking course (networking-for-hackers-2027) must remain in COURSES');
    assert.strictEqual(legacyCourse.id, 'e7b9e001-4000-4000-a000-000000000001');

    // Slug uniqueness across all catalog courses
    const slugs = COURSES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    assert.strictEqual(slugs.length, uniqueSlugs.size, 'All course slugs must be unique');
  });

  it('2. Exactly 30 modules numbered sequentially 1 to 30', () => {
    assert.strictEqual(NETWORKING_FOR_CYBERSECURITY_COURSE.modules.length, 30);
    NETWORKING_FOR_CYBERSECURITY_COURSE.modules.forEach((mod, idx) => {
      assert.strictEqual(mod.order, idx + 1, `Module order index mismatch at index ${idx}`);
      assert.ok(mod.title.length > 0, `Module ${idx + 1} missing title`);
      assert.ok(mod.description.length > 0, `Module ${idx + 1} missing description`);
      assert.strictEqual(mod.lessons.length, 4, `Module ${idx + 1} must contain exactly 4 lessons`);
    });
  });

  it('3. Exactly 120 lessons, exactly 4 per module with order 1..4', () => {
    const lessons = getCourseLessons(NETWORKING_FOR_CYBERSECURITY_COURSE);
    assert.strictEqual(lessons.length, 120, 'Course must contain exactly 120 lessons');

    const lessonIds = new Set<string>();
    const lessonSlugs = new Set<string>();

    NETWORKING_FOR_CYBERSECURITY_COURSE.modules.forEach((mod, modIdx) => {
      assert.strictEqual(mod.lessons.length, 4, `Module ${modIdx + 1} must have 4 lessons`);
      mod.lessons.forEach((les, lesIdx) => {
        assert.strictEqual(les.order, lesIdx + 1, `Lesson order mismatch in module ${modIdx + 1}`);
        assert.ok(les.id, `Lesson ${les.slug} missing id`);
        assert.ok(les.title, `Lesson ${les.id} missing title`);
        assert.ok(les.slug, `Lesson ${les.id} missing slug`);
        assert.ok(les.youtubeVideoId, `Lesson ${les.id} missing youtubeVideoId`);
        assert.match(les.youtubeVideoId, /^[a-zA-Z0-9_-]{11}$/, `Lesson ${les.slug} has invalid video ID: ${les.youtubeVideoId}`);
        assert.ok(les.durationMinutes > 0, `Lesson ${les.slug} duration must be positive`);

        // Check uniqueness
        assert.ok(!lessonIds.has(les.id), `Duplicate lesson ID detected: ${les.id}`);
        assert.ok(!lessonSlugs.has(les.slug), `Duplicate lesson slug detected: ${les.slug}`);
        lessonIds.add(les.id);
        lessonSlugs.add(les.slug);
      });
    });

    assert.strictEqual(lessonIds.size, 120);
    assert.strictEqual(lessonSlugs.size, 120);
  });

  it('4. Video attribution and creator metadata is present', () => {
    const lessons = getCourseLessons(NETWORKING_FOR_CYBERSECURITY_COURSE);
    lessons.forEach((les) => {
      assert.ok(les.youtubeVideoId, `Lesson ${les.slug} must have youtubeVideoId`);
      assert.ok(les.description, `Lesson ${les.slug} must have description`);
      assert.ok(les.videoAttribution, `Lesson ${les.slug} must have videoAttribution`);
      assert.ok(les.videoAttribution.creator, `Lesson ${les.slug} missing creator`);
      if (les.richContent?.theorySections) {
        assert.ok(les.richContent.introduction, `Lesson ${les.slug} rich content missing intro`);
        assert.ok(les.richContent.theorySections.length > 0, `Lesson ${les.slug} rich content missing theory`);
      }
    });
  });

  it('5. STRICT NO QUIZ constraint: no quizzes, no quiz questions, no knowledge checks', () => {
    NETWORKING_FOR_CYBERSECURITY_COURSE.modules.forEach((mod, modIdx) => {
      // mod.quiz should be undefined
      assert.strictEqual((mod as any).quiz, undefined, `Module ${modIdx + 1} must not define quiz`);
      
      // If practicalLab is present, questions array must be empty
      if (mod.practicalLab) {
        assert.strictEqual(
          mod.practicalLab.questions.length,
          0,
          `Module ${modIdx + 1} practicalLab must not contain quiz questions`
        );
      }

      // Check lessons richContent
      mod.lessons.forEach((les) => {
        if (les.richContent) {
          assert.strictEqual(
            (les.richContent as any).knowledgeCheck,
            undefined,
            `Lesson ${les.slug} must not have knowledgeCheck`
          );
        }
      });
    });

    // Check course progress stats: totalQuizzes must be 0
    const stats = getComprehensiveCourseCompletion(NETWORKING_FOR_CYBERSECURITY_COURSE);
    assert.strictEqual(stats.totalLessons, 120);
    assert.strictEqual(stats.totalQuizzes, 0, 'totalQuizzes must be 0 for this course');
  });

  it('6. All 30 modules contain practical labs with tasks and completion criteria', () => {
    NETWORKING_FOR_CYBERSECURITY_COURSE.modules.forEach((mod, idx) => {
      assert.ok(mod.practicalLab, `Module ${idx + 1} must contain practicalLab`);
      assert.ok(mod.practicalLab.title, `Module ${idx + 1} practicalLab missing title`);
      assert.ok(mod.practicalLab.tasks.length > 0, `Module ${idx + 1} practicalLab must have tasks`);
      assert.ok(mod.practicalLab.completionCriteria.length > 0, `Module ${idx + 1} practicalLab must have completion criteria`);
      assert.ok(mod.practicalLab.estimatedMinutes > 0, `Module ${idx + 1} practicalLab must have positive duration`);
    });
  });

  it('7. Course resolver helpers work as expected', () => {
    const course = getCourseBySlug('networking-for-cybersecurity-zero-to-advanced');
    assert.ok(course, 'getCourseBySlug must resolve networking-for-cybersecurity-zero-to-advanced');
    assert.strictEqual(course.modules.length, 30);

    const legacyCourse = getCourseBySlug('networking-for-hackers-2027');
    assert.ok(legacyCourse, 'getCourseBySlug must resolve networking-for-hackers-2027');
    assert.strictEqual(legacyCourse.modules.length, 1);
  });

  it('8. EXACTLY 120 UNIQUE YouTube video IDs across all 120 lessons (0 duplicates across course)', () => {
    const lessons = getCourseLessons(NETWORKING_FOR_CYBERSECURITY_COURSE);
    assert.strictEqual(lessons.length, 120, 'Course must contain 120 lessons');

    const videoIds = lessons.map((l) => l.youtubeVideoId);
    const uniqueVideoIds = new Set(videoIds);

    // Verify format of all video IDs
    videoIds.forEach((vid, i) => {
      assert.ok(vid, `Lesson index ${i} missing video ID`);
      assert.match(vid, /^[a-zA-Z0-9_-]{11}$/, `Invalid video ID at index ${i}: ${vid}`);
    });

    // Zero cross-course duplication
    assert.strictEqual(
      uniqueVideoIds.size,
      120,
      `Expected exactly 120 unique YouTube video IDs, but found ${uniqueVideoIds.size} (${120 - uniqueVideoIds.size} duplicates)`
    );
  });

  it('9. ZERO intra-module duplicate videos (each module has 4 distinct videos)', () => {
    NETWORKING_FOR_CYBERSECURITY_COURSE.modules.forEach((mod, modIdx) => {
      const modVideos = mod.lessons.map((l) => l.youtubeVideoId);
      const uniqueModVideos = new Set(modVideos);
      assert.strictEqual(
        uniqueModVideos.size,
        4,
        `Module ${modIdx + 1} (${mod.title}) has duplicate videos: ${modVideos.join(', ')}`
      );
    });
  });

  it('10. Semantic quality verification for priority review flags', () => {
    const lessons = getCourseLessons(NETWORKING_FOR_CYBERSECURITY_COURSE);
    const getLesson = (modNum: number, lesOrder: number) => {
      const mod = NETWORKING_FOR_CYBERSECURITY_COURSE.modules[modNum - 1];
      return mod.lessons[lesOrder - 1];
    };

    // M11-L01: TCP versus UDP -> LIEACBqlntY (Jeremy's IT Lab CCNA Day 30: "Free CCNA | TCP & UDP")
    const m11l01 = getLesson(11, 1);
    assert.strictEqual(m11l01.youtubeVideoId, 'LIEACBqlntY');
    assert.ok(m11l01.videoAttribution);
    assert.match(m11l01.videoAttribution.creator, /Jeremy's IT Lab/i);

    // M11-L02: Port ranges -> jX1pobYmZdE (Professor Messer Common Ports)
    const m11l02 = getLesson(11, 2);
    assert.strictEqual(m11l02.youtubeVideoId, 'jX1pobYmZdE');
    assert.ok(m11l02.videoAttribution);
    assert.match(m11l02.videoAttribution.creator, /Professor Messer/i);

    // M12-L01: Resolver workflow -> 4C6eeQes4cs (Jeremy's IT Lab CCNA Day 38: DNS)
    const m12l01 = getLesson(12, 1);
    assert.strictEqual(m12l01.youtubeVideoId, '4C6eeQes4cs');

    // M12-L04: Security cases -> 2QijB5GtNE4 (Professor Messer ARP and DNS Poisoning)
    const m12l04 = getLesson(12, 4);
    assert.strictEqual(m12l04.youtubeVideoId, '2QijB5GtNE4');

    // M13-L03: Rogue configuration -> qYYeg2kz1yE (Jeremy's IT Lab CCNA Day 50: DHCP Snooping)
    const m13l03 = getLesson(13, 3);
    assert.strictEqual(m13l03.youtubeVideoId, 'qYYeg2kz1yE');

    // M15-L03: HTTP/2 and HTTP/3 -> GriONb4EfPY (Hussein Nasser HTTP/2 Critical Limitation that led to HTTP/3 & QUIC)
    const m15l03 = getLesson(15, 3);
    assert.strictEqual(m15l03.youtubeVideoId, 'GriONb4EfPY');

    // M29-L01: Virtual networks -> 7_NNlnH7sAg (Tiny Technical Tutorials AWS VPC Basics)
    const m29l01 = getLesson(29, 1);
    assert.strictEqual(m29l01.youtubeVideoId, '7_NNlnH7sAg');

    // M29-L02: Ingress and egress -> ksJWwkG_p4M (KnoDAX AWS VPC Routing)
    const m29l02 = getLesson(29, 2);
    assert.strictEqual(m29l02.youtubeVideoId, 'ksJWwkG_p4M');

    // M30-L04: Communication and defense -> GVkyFvQVlPY (Motasem Hamdan DFIR Incident Report)
    const m30l04 = getLesson(30, 4);
    assert.strictEqual(m30l04.youtubeVideoId, 'GVkyFvQVlPY');
  });
});
