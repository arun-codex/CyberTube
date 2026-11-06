import { LessonVideoResource } from '../types/course';
import forensicsVideoManifest from '../data/manifests/network-packet-forensics-video-manifest.json';

export interface CourseVideoManifestData {
  courseId: string;
  courseSlug: string;
  totalLessons: number;
  lessonsWithVideos: number;
  lessonsWithTheoryGuideFallback: number;
  totalVideoResources: number;
  uniqueVideoCount: number;
  resources: LessonVideoResource[];
}

const typedForensicsManifest = forensicsVideoManifest as unknown as CourseVideoManifestData;

/**
 * Returns all video resources configured for a specific lesson in a course.
 */
export function getLessonVideoResources(
  courseId: string,
  lessonId: string
): LessonVideoResource[] {
  if (
    courseId === 'course-packet-analysis-wireshark' ||
    courseId === 'network-packet-analysis-masterclass'
  ) {
    return typedForensicsManifest.resources.filter((r) => r.lessonId === lessonId);
  }
  return [];
}

/**
 * Returns all video resources configured for an entire course.
 */
export function getAllCourseVideoResources(courseId: string): LessonVideoResource[] {
  if (
    courseId === 'course-packet-analysis-wireshark' ||
    courseId === 'network-packet-analysis-masterclass'
  ) {
    return typedForensicsManifest.resources;
  }
  return [];
}

/**
 * Retrieves a single video resource by its unique resourceId.
 */
export function getVideoResourceById(resourceId: string): LessonVideoResource | undefined {
  return typedForensicsManifest.resources.find((r) => r.resourceId === resourceId);
}

/**
 * Retrieves the first video resource matching a YouTube video ID.
 */
export function getVideoResourceByVideoId(videoId: string): LessonVideoResource | undefined {
  return typedForensicsManifest.resources.find((r) => r.videoId === videoId);
}

/**
 * Returns summary statistics for video coverage across the course.
 */
export function getForensicsVideoManifestSummary() {
  return {
    totalLessons: typedForensicsManifest.totalLessons,
    lessonsWithVideos: typedForensicsManifest.lessonsWithVideos,
    lessonsWithTheoryGuideFallback: typedForensicsManifest.lessonsWithTheoryGuideFallback,
    totalVideoResources: typedForensicsManifest.totalVideoResources,
    uniqueVideoCount: typedForensicsManifest.uniqueVideoCount,
  };
}
