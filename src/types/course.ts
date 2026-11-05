import { CybersecurityDomain, DifficultyLevel } from './resource';

export type CourseTrack =
  | 'cybersecurity'
  | 'web-development'
  | 'general-technology';

export interface KeyTerminologyItem {
  term: string;
  definition: string;
}

export interface TheorySectionItem {
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface ProtocolExplanationItem {
  protocol: string;
  port?: string | number;
  layer: string;
  details: string;
  headerFields?: string[];
}

export interface StepByStepProcedureItem {
  step: number;
  title: string;
  instruction: string;
  filter?: string;
  expectedOutcome?: string;
}

export interface DisplayFilterItem {
  filter: string;
  description: string;
  purpose: string;
}

export interface PracticalExerciseItem {
  title: string;
  objective: string;
  instructions: string[];
  pcapReference?: string;
}

export interface KnowledgeCheckQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  relatedLessonSlug?: string;
}

export interface LessonQuiz {
  title?: string;
  questions: KnowledgeCheckQuestion[];
  passingScorePercent?: number;
}

export interface LessonRichContent {
  introduction: string;
  prerequisites?: string[];
  keyTerminology?: KeyTerminologyItem[];
  theorySections?: TheorySectionItem[];
  protocolExplanations?: ProtocolExplanationItem[];
  stepByStepProcedures?: StepByStepProcedureItem[];
  displayFilters?: DisplayFilterItem[];
  expectedObservations?: string[];
  commonMistakes?: string[];
  securityRelevance?: string;
  practicalExercise?: PracticalExerciseItem;
  knowledgeCheck?: KnowledgeCheckQuestion;
  summary?: string;
  furtherReading?: { title: string; url: string; description?: string }[];
}

export interface PracticalLab {
  id: string;
  title: string;
  objective: string;
  toolsRequired: string[];
  pcapSource: {
    fileName: string;
    fileUrl: string;
    repositoryUrl?: string;
    sha256?: string;
  };
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  instructions: string[];
  tasks: {
    id: string;
    description: string;
    hint?: string;
    filterSuggestion?: string;
  }[];
  evidenceWorksheet: {
    field: string;
    prompt: string;
    expectedEvidenceType: string;
  }[];
  questions: KnowledgeCheckQuestion[];
  completionCriteria: string[];
}

export interface CapstoneAssessment {
  id: string;
  title: string;
  scenario: string;
  pcapSource: {
    fileName: string;
    fileUrl: string;
    sha256?: string;
  };
  totalMarks: 100;
  passingScore: 75;
  rubric: {
    category: string;
    marks: number;
    criteria: string[];
  }[];
  submissionSections: {
    id: string;
    title: string;
    prompt: string;
    maxMarks: number;
  }[];
}

export interface PCAPResource {
  id: string;
  title: string;
  fileName: string;
  downloadUrl: string;
  sourceRepository: string;
  fileFormat: 'pcap' | 'pcapng';
  intendedModule: string;
  learningPurpose: string;
  safetyGuidance: string;
  instructions: string[];
  sha256?: string;
}

export interface Lesson {
  id: string; // e.g., 'lesson-intro-wireshark'
  slug: string; // e.g., 'intro-to-wireshark'
  title: string;
  description: string;
  youtubeVideoId?: string; // Optional YouTube video ID (validated 11-char string when present)
  videoAttribution?: {
    creator: string;
    channelUrl?: string;
    platform: string;
    seriesTitle?: string;
    partNumber?: number;
  };
  durationMinutes: number;
  order: number; // 1-based order within the module or course
  objectives: string[];
  tags: string[];
  skillsTaught: string[];
  moduleTitle?: string;
  richContent?: LessonRichContent;
  quiz?: LessonQuiz;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  practicalLab?: PracticalLab;
  quiz?: LessonQuiz;
  capstoneAssessment?: CapstoneAssessment;
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
  track?: CourseTrack;
  sourcePlatform?: 'youtube' | string;
  sourcePlaylistId?: string;
  sourcePlaylistUrl?: string;
  pcapResources?: PCAPResource[];
  capstone?: CapstoneAssessment;
}

export interface CourseProgressState {
  courseId: string;
  completedLessonIds: string[];
  archivedLegacyLessonIds?: string[];
  lastCompletedLessonId?: string;
  lastActiveLessonId?: string;
  lastAccessedAt: string;
  quizScores?: Record<string, number>;
  capstoneScore?: number;
}
