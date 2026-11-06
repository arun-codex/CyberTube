import { Course, CourseProgressState } from '../../types/course';
import { CourseCardProgress } from './progress-types';
import { getCourseLessons } from '../courses';
import { getComprehensiveCourseCompletion } from '../course-progress';

/**
 * Calculates accurate course card progress metrics.
 * Ensures consistent presentation across courses catalog and dashboard.
 */
export function calculateCourseCardProgress(
  course: Course,
  progressState: CourseProgressState | undefined,
  isGuest = false
): CourseCardProgress {
  const lessons = getCourseLessons(course);
  const totalLessons = lessons.length;
  const completedSet = new Set(progressState?.completedLessonIds || []);

  const completedCount = lessons.filter((l) => completedSet.has(l.id)).length;

  let percentage = 0;
  if (totalLessons > 0) {
    percentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));
  }

  // Check if course has special 4-dimensional completion gating (e.g. Masterclass)
  if (course.id === 'course-packet-analysis-wireshark') {
    const comp = getComprehensiveCourseCompletion(course);
    if (!comp.isFullyCompleted && percentage === 100) {
      // Gated by quizzes/labs/capstone
      percentage = Math.min(99, comp.overallProgressPercent || comp.lessonCompletionPercent);
    }
  }

  let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
  if (percentage >= 100 && completedCount === totalLessons) {
    status = 'completed';
  } else if (completedCount > 0 || percentage > 0) {
    status = 'in_progress';
  }

  // Resolve best resume lesson
  let lastActiveLessonId = progressState?.lastActiveLessonId;
  let lastActiveLessonSlug: string | undefined;

  if (lastActiveLessonId) {
    const match = lessons.find((l) => l.id === lastActiveLessonId);
    if (match) {
      lastActiveLessonSlug = match.slug;
    }
  }

  if (!lastActiveLessonSlug && status === 'in_progress') {
    // Pick first uncompleted lesson
    const firstUnfinished = lessons.find((l) => !completedSet.has(l.id));
    if (firstUnfinished) {
      lastActiveLessonId = firstUnfinished.id;
      lastActiveLessonSlug = firstUnfinished.slug;
    }
  }

  if (!lastActiveLessonSlug && lessons.length > 0) {
    lastActiveLessonId = lessons[0].id;
    lastActiveLessonSlug = lessons[0].slug;
  }

  return {
    courseId: course.id,
    courseSlug: course.slug,
    percentage,
    completedLessons: completedCount,
    totalLessons,
    status,
    lastActiveLessonId,
    lastActiveLessonSlug,
    isGuestLocal: isGuest && completedCount > 0,
  };
}
