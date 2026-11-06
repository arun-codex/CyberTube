export interface NormalizedLessonVideo {
  videoId: string;
  title: string;
  creator: string;
  durationSeconds: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
  isPrimary?: boolean;
}

export interface NormalizedLesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  durationMinutes: number;
  moduleId: string;
  moduleTitle?: string;
  videos: NormalizedLessonVideo[];
  objectives: string[];
  skillsTaught: string[];
  tags: string[];
  richContent?: any;
  practicalLab?: any;
  quiz?: any;
}

export interface NormalizedModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: NormalizedLesson[];
  practicalLab?: any;
  quiz?: any;
}

export interface CourseLearningViewModel {
  courseId: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor: {
    name: string;
    title?: string;
    organization?: string;
  };
  estimatedDuration: string;
  totalDurationMinutes: number;
  totalModules: number;
  totalLessons: number;
  modules: NormalizedModule[];
  allLessons: NormalizedLesson[];
  sourcePlaylistUrl?: string;
  sourcePlaylistId?: string;
  capstone?: any;
  pcapResources?: any[];
  prerequisites?: string[];
  domains: string[];
  track?: string;
}

