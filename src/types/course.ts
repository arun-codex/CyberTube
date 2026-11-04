import { CybersecurityDomain, DifficultyLevel } from './resource';

export interface Lesson {
  id: string; // e.g., 'lesson-intro-wireshark'
  slug: string; // e.g., 'intro-to-wireshark'
  title: string;
  description: string;
  youtubeVideoId: string; // Validated 11-character YouTube video ID
  durationMinutes: number;
  order: number; // 1-based order within the module or course
  objectives: string[];
  tags: string[];
  skillsTaught: string[];
  moduleTitle?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string; // e.g., 'course-packet-analysis-mastery'
  slug: string; // e.g., 'packet-analysis-mastery'
  title: string;
  shortDescription: string;
  description: string;
  domains: CybersecurityDomain[];
  tags: string[];
  difficulty: DifficultyLevel;
  thumbnailUrl: string;
  estimatedDuration: string; // e.g., '2.5 hours'
  totalDurationMinutes: number;
  instructor: {
    name: string;
    title: string;
    organization?: string;
  };
  prerequisites: string[];
  learningObjectives: string[];
  modules: CourseModule[];
  featured?: boolean;
}

export interface CourseProgressState {
  courseId: string;
  completedLessonIds: string[];
  lastCompletedLessonId?: string;
  lastActiveLessonId?: string;
  lastAccessedAt: string;
}

