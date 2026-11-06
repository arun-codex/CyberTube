import { Course, CourseModule, Lesson } from '../types/course';
import {
  CourseLearningViewModel,
  NormalizedLesson,
  NormalizedLessonVideo,
  NormalizedModule,
} from '../types/learning-view-model';
import { getLessonVideoResources } from './video-manifest';

/**
 * Normalizes any CyberTube course into a unified CourseLearningViewModel.
 * Bridges single-video courses, multi-video topic-mapped masterclasses,
 * and theory-only lessons without altering original course definitions.
 */
export function toCourseLearningViewModel(course: Course): CourseLearningViewModel {
  const categoryLabel =
    course.track === 'web-development'
      ? 'Web Development'
      : course.track === 'general-technology'
      ? 'General Technology'
      : 'Cybersecurity';

  const normalizedModules: NormalizedModule[] = course.modules.map(
    (module: CourseModule): NormalizedModule => {
      const normalizedLessons: NormalizedLesson[] = module.lessons.map(
        (lesson: Lesson): NormalizedLesson => {
          // 1. Check for topic-mapped video resources from manifests (e.g. Forensics Masterclass)
          const manifestVideos = getLessonVideoResources(course.id, lesson.id);

          let videos: NormalizedLessonVideo[] = [];

          if (manifestVideos && manifestVideos.length > 0) {
            videos = manifestVideos.map((r, idx) => ({
              videoId: r.videoId,
              title: r.title,
              creator: r.creator,
              durationSeconds: r.durationSeconds,
              difficulty: r.difficulty,
              description: r.description,
              isPrimary: idx === 0,
            }));
          } else if (lesson.youtubeVideoId) {
            // 2. Standard single-video lesson (e.g. Networking for Hackers, Wireshark)
            videos = [
              {
                videoId: lesson.youtubeVideoId,
                title: lesson.title,
                creator: course.instructor.name,
                durationSeconds: (lesson.durationMinutes || 10) * 60,
                difficulty: course.difficulty,
                description: lesson.description,
                isPrimary: true,
              },
            ];
          }

          return {
            id: lesson.id,
            slug: lesson.slug,
            title: lesson.title,
            description: lesson.description,
            order: lesson.order,
            durationMinutes: lesson.durationMinutes,
            moduleId: module.id,
            moduleTitle: lesson.moduleTitle || module.title,
            videos,
            objectives: lesson.objectives || [],
            skillsTaught: lesson.skillsTaught || [],
            tags: lesson.tags || [],
            richContent: lesson.richContent,
            practicalLab: module.practicalLab,
            quiz: module.quiz,
          };
        }
      );

      return {
        id: module.id,
        title: module.title,
        description: module.description,
        order: module.order,
        lessons: normalizedLessons,
        practicalLab: module.practicalLab,
        quiz: module.quiz,
      };
    }
  );

  const allLessons: NormalizedLesson[] = normalizedModules.flatMap((m) => m.lessons);

  return {
    courseId: course.id,
    slug: course.slug,
    title: course.title,
    shortDescription: course.shortDescription,
    description: course.description,
    category: categoryLabel,
    difficulty: course.difficulty,
    instructor: {
      name: course.instructor.name,
      title: course.instructor.title,
      organization: course.instructor.organization,
    },
    estimatedDuration: course.estimatedDuration,
    totalDurationMinutes: course.totalDurationMinutes,
    totalModules: normalizedModules.length,
    totalLessons: allLessons.length,
    modules: normalizedModules,
    allLessons,
    sourcePlaylistUrl: course.sourcePlaylistUrl,
    sourcePlaylistId: course.sourcePlaylistId,
    capstone: course.capstone,
    pcapResources: course.pcapResources,
    prerequisites: course.prerequisites,
    domains: course.domains || [],
    track: course.track,
  };
}
