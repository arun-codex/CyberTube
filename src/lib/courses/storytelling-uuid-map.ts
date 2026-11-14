// src/lib/courses/storytelling-uuid-map.ts
/**
 * Canonical Deterministic UUID Mapping for the Storytelling Masterclass.
 * Shared between Supabase database migrations and the TypeScript application.
 */

export const STORYTELLING_COURSE_UUID = 'c0000000-0000-4000-8000-000000000001';
export const STORYTELLING_COURSE_ID = 'course-free-storytelling-masterclass';
export const STORYTELLING_COURSE_SLUG = 'free-storytelling-masterclass';

/**
 * Deterministic Module UUID generator:
 * c0000000-0000-4000-8000-000000000101 to c0000000-0000-4000-8000-000000000120
 */
export function getStorytellingModuleUuid(weekNum: number): string {
  const hexNum = weekNum.toString(16).padStart(4, '0');
  return `c0000000-0000-4000-8000-0000000001${hexNum.slice(-2)}`;
}

/**
 * Deterministic Lesson UUID generator:
 * c0000000-0000-4000-8000-00000000WWLL
 * WW: Week number in hex (01 to 14)
 * LL: Lesson number in hex (01 to 05)
 */
export function getStorytellingLessonUuid(weekNum: number, lessonNum: number): string {
  const ww = weekNum.toString(16).padStart(2, '0');
  const ll = lessonNum.toString(16).padStart(2, '0');
  return `c0000000-0000-4000-8000-00000000${ww}${ll}`;
}

// Precomputed lookups
export const STORYTELLING_MODULE_ID_TO_UUID: Record<string, string> = {};
export const STORYTELLING_MODULE_UUID_TO_ID: Record<string, string> = {};

for (let w = 1; w <= 20; w++) {
  const modId = `mod-storytelling-w${String(w).padStart(2, '0')}`;
  const uuid = getStorytellingModuleUuid(w);
  STORYTELLING_MODULE_ID_TO_UUID[modId] = uuid;
  STORYTELLING_MODULE_UUID_TO_ID[uuid] = modId;
}

export const STORYTELLING_LESSON_ID_TO_UUID: Record<string, string> = {};
export const STORYTELLING_LESSON_SLUG_TO_UUID: Record<string, string> = {};
export const STORYTELLING_LESSON_UUID_TO_ID: Record<string, string> = {};

// We populate lesson lookups from the course definition
import { STORYTELLING_MASTERCLASS_COURSE } from '@/data/storytelling-masterclass-course';

STORYTELLING_MASTERCLASS_COURSE.modules.forEach((mod, mIdx) => {
  const weekNum = mIdx + 1;
  const modUuid = getStorytellingModuleUuid(weekNum);
  STORYTELLING_MODULE_ID_TO_UUID[mod.id] = modUuid;
  STORYTELLING_MODULE_UUID_TO_ID[modUuid] = mod.id;

  mod.lessons.forEach((les, lIdx) => {
    const lessonNum = lIdx + 1;
    const uuid = getStorytellingLessonUuid(weekNum, lessonNum);
    STORYTELLING_LESSON_ID_TO_UUID[les.id] = uuid;
    STORYTELLING_LESSON_SLUG_TO_UUID[les.slug] = uuid;
    STORYTELLING_LESSON_UUID_TO_ID[uuid] = les.id;
  });
});

export function resolveStorytellingLessonUuid(identifier: string): string | null {
  if (!identifier) return null;
  // If it's already a valid UUID
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier)) {
    return identifier;
  }
  return (
    STORYTELLING_LESSON_ID_TO_UUID[identifier] ||
    STORYTELLING_LESSON_SLUG_TO_UUID[identifier] ||
    null
  );
}

export function resolveStorytellingCourseUuid(): string {
  return STORYTELLING_COURSE_UUID;
}

export function resolveStorytellingModuleUuid(identifier: string): string | null {
  if (!identifier) return null;
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier)) {
    return identifier;
  }
  return STORYTELLING_MODULE_ID_TO_UUID[identifier] || null;
}

export function resolveApplicationLessonId(uuid: string): string | null {
  if (!uuid) return null;
  return STORYTELLING_LESSON_UUID_TO_ID[uuid.toLowerCase()] || null;
}

