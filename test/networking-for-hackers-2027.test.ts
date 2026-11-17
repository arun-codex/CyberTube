import { describe, it } from 'node:test';
import assert from 'node:assert';
import manifest from '../src/data/manifests/networking-for-hackers-playlist-manifest.json';
import { COURSES } from '../src/data/courses';
import { getComprehensiveCourseCompletion } from '../src/lib/course-progress';

describe('Networking for Hackers 2027 Course Update Suite', () => {
  it('1. Playlist manifest contains verified 9 playable lessons and 1 unavailable entry', () => {
    assert.strictEqual(manifest.playlistId, 'PLITTDLtD8szA');
    assert.strictEqual(manifest.playableLessonsCount, 9);
    assert.strictEqual(manifest.unavailableEntriesCount, 1);
    assert.strictEqual(manifest.totalPlayableDurationSeconds, 29728);
    assert.strictEqual(manifest.totalPlayableDurationMinutes, 495);
    assert.strictEqual(manifest.estimatedDuration, '8 hours 15 mins');

    const playable = manifest.entries.filter((e) => e.status === 'playable');
    assert.strictEqual(playable.length, 9);

    // Verify learning order 1 to 9
    for (let i = 0; i < 9; i++) {
      assert.strictEqual(playable[i].learningSequence, i + 1);
    }

    // Verify video IDs
    const expectedIds = [
      '4hLax8DmQHY',
      '4-Ea5EI6LrM',
      'A31izTClLqs',
      'Yb48nfFBT0I',
      'e6tMigLffZc',
      'J_fUOMgl4CE',
      'BkB4Vtvwyc0',
      'aQCqgKIEpHA',
      '7ethLpR3mMY',
    ];
    playable.forEach((p, idx) => {
      assert.strictEqual(p.videoId, expectedIds[idx]);
      assert.strictEqual(p.embeddable, true);
      assert.strictEqual(p.availability, 'public');
    });
  });

  it('2. courses.ts definition matches verified manifest exactly', () => {
    const course = COURSES.find((c) => c.slug === 'networking-for-hackers-2027');
    assert.ok(course, 'Course must exist in courses.ts');

    assert.strictEqual(course.id, 'e7b9e001-4000-4000-a000-000000000001');
    assert.strictEqual(course.totalDurationMinutes, 495);
    assert.strictEqual(course.estimatedDuration, '8 hours 15 mins');

    const lessons = course.modules[0].lessons;
    assert.strictEqual(lessons.length, 9);

    // Verify lesson IDs preserve existing 6 and assign valid new 7..9
    assert.strictEqual(lessons[0].id, 'e7b9e003-4000-4000-a000-000000000001');
    assert.strictEqual(lessons[5].id, 'e7b9e003-4000-4000-a000-000000000006');
    assert.strictEqual(lessons[6].id, 'e7b9e003-4000-4000-a000-000000000007');
    assert.strictEqual(lessons[7].id, 'e7b9e003-4000-4000-a000-000000000008');
    assert.strictEqual(lessons[8].id, 'e7b9e003-4000-4000-a000-000000000009');

    // Verify ordering
    lessons.forEach((l, idx) => {
      assert.strictEqual(l.order, idx + 1);
    });
  });

  it('3. Assessment gate logic never falsely marks unconfigured quizzes/labs/capstone as passed', () => {
    const course = COURSES.find((c) => c.slug === 'networking-for-hackers-2027')!;
    const stats = getComprehensiveCourseCompletion(course);

    assert.strictEqual(stats.totalLessons, 9);
    assert.strictEqual(stats.totalQuizzes, 0);
    assert.strictEqual(stats.totalLabs, 0);
    assert.strictEqual(stats.hasCapstone, false);

    // Initial state: 0 lessons completed
    assert.strictEqual(stats.lessonsCompleted, 0);
    assert.strictEqual(stats.overallProgressPercent, 0);
    assert.strictEqual(stats.isFullyCompleted, false);
  });
});
