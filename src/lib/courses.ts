import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { COURSES } from '../data/courses';
import { Course, Lesson } from '../types/course';
import { getAllResources } from './catalog';
import { Resource } from '../types/resource';

let testPublicSupabaseClient: any = null;

export function setPublicSupabaseClientForTesting(client: any) {
  testPublicSupabaseClient = client;
}

function getPublicSupabaseClient() {
  if (testPublicSupabaseClient) return testPublicSupabaseClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createSupabaseClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

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
  const lessonTags = new Set((lesson.tags || []).map((t) => t.toLowerCase()));
  const courseDomains = new Set(course.domains || []);

  const scored = allResources.map((res) => {
    let score = 0;
    res.domains.forEach((d) => {
      if (courseDomains.has(d)) score += 3;
    });
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

/**
 * Returns a course by its unique slug, merging with Supabase database state
 * for database-backed courses to ensure newly synced modules and lessons appear dynamically.
 * Inactive or unavailable playlist items are excluded from active curriculum presentation.
 */
export async function getCourseBySlugWithDb(slug: string): Promise<Course | undefined> {
  const staticCourse = getCourseBySlug(slug);

  // If not a playlist-managed or database-backed course, return static course directly
  if (staticCourse && !staticCourse.sourcePlaylistId && !staticCourse.id.includes('-')) {
    return staticCourse;
  }

  const supabase = getPublicSupabaseClient();
  if (!supabase) {
    return staticCourse;
  }

  try {
    const { data: dbCourse, error: courseError } = await (supabase as any)
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (courseError) {
      console.error(`[courses] Database error querying course by slug "${slug}":`, courseError.message || courseError);
      return staticCourse;
    }

    if (!dbCourse) {
      return staticCourse;
    }

    const { data: dbModules, error: modError } = await (supabase as any)
      .from('course_modules')
      .select('*')
      .eq('course_id', dbCourse.id)
      .order('order_index', { ascending: true });

    if (modError) {
      console.error(`[courses] Database error querying modules for course "${slug}":`, modError.message || modError);
      return staticCourse;
    }

    if (!dbModules || dbModules.length === 0) {
      return staticCourse;
    }

    const { data: dbLessons, error: lessonError } = await (supabase as any)
      .from('lessons')
      .select('*')
      .eq('course_id', dbCourse.id)
      .order('order_index', { ascending: true });

    if (lessonError) {
      console.error(`[courses] Database error querying lessons for course "${slug}":`, lessonError.message || lessonError);
      return staticCourse;
    }

    if (!dbLessons || dbLessons.length === 0) {
      return staticCourse;
    }

    // Query playlist items to identify any deactivated or unavailable items
    const { data: dbPlaylistItems, error: playlistItemsError } = await (supabase as any)
      .from('course_playlist_items')
      .select('lesson_id, is_active, is_embeddable, availability_status')
      .eq('course_id', dbCourse.id);

    if (playlistItemsError) {
      console.warn(`[courses] Warning querying playlist items for course "${slug}":`, playlistItemsError.message || playlistItemsError);
    }

    const inactiveLessonIds = new Set<string>();
    if (Array.isArray(dbPlaylistItems)) {
      for (const item of dbPlaylistItems) {
        if (
          item.lesson_id &&
          (item.is_active === false || item.is_embeddable === false || item.availability_status !== 'available')
        ) {
          inactiveLessonIds.add(item.lesson_id);
        }
      }
    }

    const dynamicModules = dbModules.map((m: any) => {
      const moduleLessons: Lesson[] = dbLessons
        .filter((l: any) => l.module_id === m.id && !inactiveLessonIds.has(l.id))
        .map((l: any) => ({
          id: l.id,
          slug: l.slug,
          title: l.title,
          description: l.description,
          youtubeVideoId: l.youtube_video_id,
          durationMinutes: l.duration_minutes,
          order: Math.max(1, l.order_index || 1),
          moduleTitle: m.title,
          objectives: Array.isArray(l.objectives) ? l.objectives : [],
          tags: Array.isArray(l.tags) ? l.tags : [],
          skillsTaught: Array.isArray(l.skills_taught) ? l.skills_taught : [],
        }));

      return {
        id: m.id,
        title: m.title,
        description: m.description,
        order: Math.max(1, m.order_index || 1),
        lessons: moduleLessons,
      };
    });

    const allDynamicLessons = dynamicModules.flatMap((m: any) => m.lessons);
    const totalMinutes = allDynamicLessons.reduce((acc: number, l: any) => acc + (l.durationMinutes || 0), 0);

    const mergedCourse: Course = {
      id: dbCourse.id,
      slug: dbCourse.slug,
      title: dbCourse.title || staticCourse?.title || '',
      shortDescription: dbCourse.short_description || staticCourse?.shortDescription || '',
      description: dbCourse.description || staticCourse?.description || '',
      difficulty: (dbCourse.difficulty || staticCourse?.difficulty || 'beginner') as any,
      estimatedDuration: dbCourse.estimated_duration || staticCourse?.estimatedDuration || '',
      totalDurationMinutes: totalMinutes || dbCourse.total_duration_minutes || staticCourse?.totalDurationMinutes || 0,
      thumbnailUrl: dbCourse.thumbnail_url || staticCourse?.thumbnailUrl || '',
      instructor: {
        name: dbCourse.instructor_name || staticCourse?.instructor?.name || 'CyberTube Instructor',
        title: dbCourse.instructor_title || staticCourse?.instructor?.title || 'Security Specialist',
        organization: dbCourse.instructor_org || dbCourse.instructor_organization || staticCourse?.instructor?.organization || 'CyberTube',
      },
      prerequisites: Array.isArray(dbCourse.prerequisites) ? dbCourse.prerequisites : staticCourse?.prerequisites || [],
      learningObjectives: Array.isArray(dbCourse.learning_objectives) ? dbCourse.learning_objectives : staticCourse?.learningObjectives || [],
      track: (dbCourse.track || staticCourse?.track || 'cybersecurity') as any,
      domains: Array.isArray(dbCourse.domains) ? dbCourse.domains : staticCourse?.domains || [],
      tags: Array.isArray(dbCourse.tags) ? dbCourse.tags : staticCourse?.tags || [],
      sourcePlatform: dbCourse.source_platform || staticCourse?.sourcePlatform,
      sourcePlaylistId: dbCourse.source_playlist_id || staticCourse?.sourcePlaylistId,
      sourcePlaylistUrl: dbCourse.source_playlist_url || staticCourse?.sourcePlaylistUrl,
      modules: dynamicModules,
    };

    return mergedCourse;
  } catch (err) {
    console.error('[courses] Failed to load dynamic course from Supabase, using fallback:', err);
    return staticCourse;
  }
}

/**
 * Returns all active courses, delivering database-backed courses with dynamic Supabase data,
 * with the static catalog serving as a deliberate fallback.
 */
export async function getAllCoursesWithDb(): Promise<Course[]> {
  const staticCourses = getAllCourses();
  const supabase = getPublicSupabaseClient();
  if (!supabase) return staticCourses;

  try {
    const { data: dbCourses, error: coursesError } = await (supabase as any)
      .from('courses')
      .select('slug')
      .eq('status', 'published');

    if (coursesError) {
      console.error('[courses] Database error querying published courses in getAllCoursesWithDb:', coursesError.message || coursesError);
      return staticCourses;
    }

    if (!dbCourses || dbCourses.length === 0) {
      return staticCourses;
    }

    const loadedSlugs = new Set<string>();
    const mergedCourses: Course[] = [];

    for (const c of dbCourses) {
      loadedSlugs.add(c.slug);
      const hydrated = await getCourseBySlugWithDb(c.slug);
      if (hydrated) {
        mergedCourses.push(hydrated);
      }
    }

    // Append any static courses not found in database published query
    for (const sc of staticCourses) {
      if (!loadedSlugs.has(sc.slug)) {
        mergedCourses.push(sc);
      }
    }

    return mergedCourses;
  } catch (err) {
    console.error('[courses] Unexpected failure in getAllCoursesWithDb, falling back to static catalog:', err);
    return staticCourses;
  }
}
