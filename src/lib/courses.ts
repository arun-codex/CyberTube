import { COURSES } from '../data/courses';
import { Course, Lesson } from '../types/course';
import { getAllResources } from './catalog';
import { Resource } from '../types/resource';

/**
 * Returns all active courses in the CyberTube curriculum.
 */
export function getAllCourses(): Course[] {
  return COURSES;
}

/**
 * Returns a single course by its unique slug.
 */
export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

/**
 * Returns a course by its ID.
 */
export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

/**
 * Flattens all ordered lessons within a course.
 */
export function getCourseLessons(course: Course): Lesson[] {
  return course.modules
    .slice()
    .sort((a, b) => a.order - b.order)
    .flatMap((m) => m.lessons.slice().sort((a, b) => a.order - b.order));
}

/**
 * Finds adjacent lessons (previous and next) in a course given the current lesson ID.
 */
export function getAdjacentLessons(
  course: Course,
  currentLessonId: string
): { prevLesson?: Lesson; nextLesson?: Lesson; currentIndex: number; totalLessons: number } {
  const lessons = getCourseLessons(course);
  const currentIndex = lessons.findIndex((l) => l.id === currentLessonId);

  if (currentIndex === -1) {
    return { currentIndex: -1, totalLessons: lessons.length };
  }

  return {
    prevLesson: currentIndex > 0 ? lessons[currentIndex - 1] : undefined,
    nextLesson: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined,
    currentIndex,
    totalLessons: lessons.length,
  };
}

/**
 * Recommends related resources (videos, labs, articles, tools) for a lesson
 * matching on cybersecurity domains and granular tags.
 */
export function getRelatedResourcesForLesson(lesson: Lesson, course: Course, limit = 4): Resource[] {
  const allResources = getAllResources();
  const lessonTags = new Set(lesson.tags.map((t) => t.toLowerCase()));
  const courseDomains = new Set(course.domains);

  const scored = allResources.map((res) => {
    let score = 0;
    // Domain match
    res.domains.forEach((d) => {
      if (courseDomains.has(d)) score += 3;
    });
    // Tag match
    res.tags.forEach((t) => {
      if (lessonTags.has(t.toLowerCase())) score += 2;
    });
    return { resource: res, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.resource);
}

