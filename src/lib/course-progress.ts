import {
  Course,
  CourseProgressState,
  QuizAttempt,
  PracticalLabProgress,
  CapstoneSubmissionState,
  ComprehensiveCourseCompletion,
  UserVideoProgress,
} from '../types/course';

/**
 * CyberTube — Course Progress Service
 *
 * Implements a clean client-side interface for tracking course, lesson,
 * practical lab, and capstone progress in browser localStorage.
 * Dispatches custom events for reactive UI state updates.
 */

const STORAGE_KEY_PREFIX = 'cybertube_course_progress_v1_';
const PROGRESS_EVENT_NAME = 'cybertube:course-progress-changed';

export const LEGACY_PACKET_ANALYSIS_LESSON_IDS = [
  'les-wireshark-deep-dive',
  'les-wireshark-troubleshooting',
];

export interface CourseProgressService {
  getProgress(courseId: string): CourseProgressState;
  isLessonCompleted(courseId: string, lessonId: string): boolean;
  toggleLessonCompletion(courseId: string, lessonId: string): boolean;
  setLessonCompleted(courseId: string, lessonId: string, completed: boolean): void;
  recordLessonAccess(courseId: string, lessonId: string): void;
  getCourseCompletionPercentage(course: Course): number;
  resetCourseProgress(courseId: string): void;
  recordQuizScore?(courseId: string, quizId: string, scorePercent: number): void;
  recordQuizAttempt?(courseId: string, moduleId: string, attempt: QuizAttempt): void;
  recordLabProgress?(courseId: string, labId: string, progress: PracticalLabProgress): void;
  recordCapstoneSubmission?(courseId: string, submission: CapstoneSubmissionState): void;
  recordCapstoneScore?(courseId: string, score: number): void;
  getComprehensiveCourseCompletion?(course: Course): ComprehensiveCourseCompletion;
  recordVideoProgress?(progress: UserVideoProgress): void;
  getVideoProgress?(courseId: string, videoId: string): UserVideoProgress | undefined;
  getAllVideoProgress?(courseId: string): Record<string, UserVideoProgress>;
}

function getStorageKey(courseId: string): string {
  return `${STORAGE_KEY_PREFIX}${courseId}`;
}

function loadState(courseId: string): CourseProgressState {
  if (typeof window === 'undefined') {
    return {
      courseId,
      completedLessonIds: [],
      lastAccessedAt: new Date().toISOString(),
    };
  }

  try {
    const raw = localStorage.getItem(getStorageKey(courseId));
    if (!raw) {
      return {
        courseId,
        completedLessonIds: [],
        lastAccessedAt: new Date().toISOString(),
      };
    }
    const parsed = JSON.parse(raw);
    const completedLessonIds: string[] = Array.isArray(parsed.completedLessonIds)
      ? parsed.completedLessonIds
      : [];

    let archivedLegacyLessonIds: string[] = Array.isArray(parsed.archivedLegacyLessonIds)
      ? parsed.archivedLegacyLessonIds
      : [];

    // Safe backwards-compatible migration for upgraded Network Packet Analysis masterclass
    if (courseId === 'course-packet-analysis-wireshark') {
      const foundLegacy = completedLessonIds.filter((id) =>
        LEGACY_PACKET_ANALYSIS_LESSON_IDS.includes(id)
      );
      if (foundLegacy.length > 0) {
        archivedLegacyLessonIds = Array.from(
          new Set([...archivedLegacyLessonIds, ...foundLegacy])
        );
        const filteredCompleted = completedLessonIds.filter(
          (id) => !LEGACY_PACKET_ANALYSIS_LESSON_IDS.includes(id)
        );

        const migratedState: CourseProgressState = {
          courseId,
          completedLessonIds: filteredCompleted,
          archivedLegacyLessonIds,
          lastCompletedLessonId: filteredCompleted.length > 0 ? filteredCompleted[filteredCompleted.length - 1] : undefined,
          lastActiveLessonId: parsed.lastActiveLessonId,
          lastAccessedAt: parsed.lastAccessedAt || new Date().toISOString(),
          quizScores: parsed.quizScores || {},
          quizAttempts: parsed.quizAttempts || {},
          labProgress: parsed.labProgress || {},
          capstoneSubmission: parsed.capstoneSubmission,
          capstoneScore: parsed.capstoneScore,
          videoProgress: parsed.videoProgress || {},
        };

        saveState(migratedState);
        return migratedState;
      }
    }

    return {
      courseId,
      completedLessonIds,
      archivedLegacyLessonIds,
      lastCompletedLessonId: parsed.lastCompletedLessonId,
      lastActiveLessonId: parsed.lastActiveLessonId,
      lastAccessedAt: parsed.lastAccessedAt || new Date().toISOString(),
      quizScores: parsed.quizScores || {},
      quizAttempts: parsed.quizAttempts || {},
      labProgress: parsed.labProgress || {},
      capstoneSubmission: parsed.capstoneSubmission,
      capstoneScore: parsed.capstoneScore,
      videoProgress: parsed.videoProgress || {},
    };
  } catch (err) {
    console.error('Failed to read course progress from localStorage:', err);
    return {
      courseId,
      completedLessonIds: [],
      lastAccessedAt: new Date().toISOString(),
    };
  }
}

function saveState(state: CourseProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(state.courseId), JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT_NAME, { detail: state }));
  } catch (err) {
    console.error('Failed to persist course progress to localStorage:', err);
  }
}

export function getComprehensiveCourseCompletion(course: Course): ComprehensiveCourseCompletion {
  const state = loadState(course.id);
  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const totalLessons = allLessonIds.length;
  const lessonsCompleted = allLessonIds.filter((id) => state.completedLessonIds.includes(id)).length;
  const lessonCompletionPercent = totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0;

  // Quizzes removed - reporting 0 / 100% for interface compatibility
  const totalQuizzes = 0;
  const quizzesPassed = 0;
  const quizCompletionPercent = 100;

  // Labs
  const modulesWithLab = course.modules.filter((m) => !!m.practicalLab);
  const totalLabs = modulesWithLab.length;
  const labsCompleted = modulesWithLab.filter((m) => {
    const labId = m.practicalLab?.id || m.id;
    return state.labProgress?.[labId]?.isCompleted;
  }).length;
  const labCompletionPercent = totalLabs > 0 ? Math.round((labsCompleted / totalLabs) * 100) : 100;

  // Capstone
  const hasCapstone = !!course.capstone;
  const capstoneSubmitted = !!state.capstoneSubmission?.completenessCheckPassed;
  const capstonePassed = hasCapstone
    ? (!!state.capstoneSubmission?.isSelfAssessedPassed && (state.capstoneScore ?? 0) >= (course.capstone?.passingScore || 75))
    : true;

  const hasAssessmentGates = totalLabs > 0 || hasCapstone;
  let isFullyCompleted = false;
  let overallProgressPercent = 0;

  if (hasAssessmentGates) {
    const allLessonsDone = lessonsCompleted === totalLessons;
    const allLabsDone = labsCompleted === totalLabs;
    isFullyCompleted = allLessonsDone && allLabsDone && capstonePassed;

    // Weighted progress dimensions (without quizzes):
    // Lessons: 50%, Labs: 25%, Capstone: 25% (or proportionally adjusted if lab/capstone absent)
    let weighted = 0;
    if (totalLabs > 0 && hasCapstone) {
      let capstoneProg = 0;
      if (capstoneSubmitted) capstoneProg += 50;
      if (capstonePassed) capstoneProg += 50;
      weighted = (lessonCompletionPercent * 0.5) + (labCompletionPercent * 0.25) + (capstoneProg * 0.25);
    } else if (totalLabs > 0) {
      weighted = (lessonCompletionPercent * 0.6) + (labCompletionPercent * 0.4);
    } else if (hasCapstone) {
      let capstoneProg = 0;
      if (capstoneSubmitted) capstoneProg += 50;
      if (capstonePassed) capstoneProg += 50;
      weighted = (lessonCompletionPercent * 0.6) + (capstoneProg * 0.4);
    } else {
      weighted = lessonCompletionPercent;
    }

    overallProgressPercent = Math.min(100, Math.round(weighted));
    if (isFullyCompleted) {
      overallProgressPercent = 100;
    } else if (overallProgressPercent === 100) {
      overallProgressPercent = 99; // Cap at 99% until required practical gates pass
    }
  } else {
    // Standard lesson-only course
    isFullyCompleted = lessonsCompleted === totalLessons;
    overallProgressPercent = lessonCompletionPercent;
  }

  const remainingRequirements: string[] = [];
  if (lessonsCompleted < totalLessons) {
    remainingRequirements.push(`${totalLessons - lessonsCompleted} lesson${totalLessons - lessonsCompleted === 1 ? '' : 's'}`);
  }
  if (totalLabs > 0 && labsCompleted < totalLabs) {
    remainingRequirements.push(`${totalLabs - labsCompleted} lab${totalLabs - labsCompleted === 1 ? '' : 's'}`);
  }
  if (hasCapstone && !capstonePassed) {
    remainingRequirements.push(capstoneSubmitted ? 'Capstone passing self-assessment (≥75)' : 'Capstone submission');
  }

  return {
    lessonCompletionPercent,
    lessonsCompleted,
    totalLessons,
    quizCompletionPercent,
    quizzesPassed,
    totalQuizzes,
    labCompletionPercent,
    labsCompleted,
    totalLabs,
    hasCapstone,
    capstoneSubmitted,
    capstonePassed,
    isFullyCompleted,
    overallProgressPercent,
    remainingRequirements,
  };
}

export const localCourseProgressService: CourseProgressService = {
  getProgress(courseId: string): CourseProgressState {
    return loadState(courseId);
  },

  isLessonCompleted(courseId: string, lessonId: string): boolean {
    const state = loadState(courseId);
    return state.completedLessonIds.includes(lessonId);
  },

  toggleLessonCompletion(courseId: string, lessonId: string): boolean {
    const state = loadState(courseId);
    const isCompleted = state.completedLessonIds.includes(lessonId);
    const nextCompletedIds = isCompleted
      ? state.completedLessonIds.filter((id) => id !== lessonId)
      : [...state.completedLessonIds, lessonId];

    saveState({
      ...state,
      completedLessonIds: nextCompletedIds,
      lastCompletedLessonId: !isCompleted ? lessonId : state.lastCompletedLessonId,
      lastActiveLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
    });

    return !isCompleted;
  },

  setLessonCompleted(courseId: string, lessonId: string, completed: boolean): void {
    const state = loadState(courseId);
    const isCompleted = state.completedLessonIds.includes(lessonId);
    if (isCompleted === completed) return;

    const nextCompletedIds = completed
      ? [...state.completedLessonIds, lessonId]
      : state.completedLessonIds.filter((id) => id !== lessonId);

    saveState({
      ...state,
      completedLessonIds: nextCompletedIds,
      lastCompletedLessonId: completed ? lessonId : state.lastCompletedLessonId,
      lastActiveLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  recordLessonAccess(courseId: string, lessonId: string): void {
    const state = loadState(courseId);
    saveState({
      ...state,
      lastActiveLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  getCourseCompletionPercentage(course: Course): number {
    const comp = getComprehensiveCourseCompletion(course);
    return comp.overallProgressPercent;
  },

  getComprehensiveCourseCompletion(course: Course): ComprehensiveCourseCompletion {
    return getComprehensiveCourseCompletion(course);
  },

  resetCourseProgress(courseId: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(getStorageKey(courseId));
      window.dispatchEvent(
        new CustomEvent(PROGRESS_EVENT_NAME, {
          detail: { courseId, completedLessonIds: [], lastAccessedAt: new Date().toISOString() },
        })
      );
    } catch (err) {
      console.error('Failed to clear course progress from localStorage:', err);
    }
  },

  // Retained as harmless no-ops for interface compatibility
  recordQuizScore(): void {},
  recordQuizAttempt(): void {},

  recordLabProgress(courseId: string, labId: string, progress: PracticalLabProgress): void {
    const state = loadState(courseId);
    const labProgress = { ...(state.labProgress || {}), [labId]: progress };
    saveState({
      ...state,
      labProgress,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  recordCapstoneSubmission(courseId: string, submission: CapstoneSubmissionState): void {
    const state = loadState(courseId);
    saveState({
      ...state,
      capstoneSubmission: submission,
      capstoneScore: submission.selfAssessmentTotal !== undefined ? submission.selfAssessmentTotal : state.capstoneScore,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  recordCapstoneScore(courseId: string, score: number): void {
    const state = loadState(courseId);
    saveState({
      ...state,
      capstoneScore: score,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  recordVideoProgress(progress: UserVideoProgress): void {
    const state = loadState(progress.courseId);
    const videoProgress = { ...(state.videoProgress || {}), [progress.videoId]: progress };
    saveState({
      ...state,
      videoProgress,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  getVideoProgress(courseId: string, videoId: string): UserVideoProgress | undefined {
    const state = loadState(courseId);
    return state.videoProgress?.[videoId];
  },

  getAllVideoProgress(courseId: string): Record<string, UserVideoProgress> {
    const state = loadState(courseId);
    return state.videoProgress || {};
  },
};

/**
 * React hook listener for course progress changes
 */
export function onCourseProgressChange(callback: (state: CourseProgressState) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<CourseProgressState>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };
  window.addEventListener(PROGRESS_EVENT_NAME, handler);
  return () => {
    window.removeEventListener(PROGRESS_EVENT_NAME, handler);
  };
}
