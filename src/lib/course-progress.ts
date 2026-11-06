import {
  Course,
  CourseProgressState,
  QuizAttempt,
  PracticalLabProgress,
  CapstoneSubmissionState,
  ComprehensiveCourseCompletion,
} from '../types/course';

/**
 * CyberTube — Course Progress Service
 *
 * Implements a clean client-side interface for tracking course, lesson,
 * quiz, practical lab, and capstone progress in browser localStorage.
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

  // Quizzes
  const modulesWithQuiz = course.modules.filter((m) => !!m.quiz);
  const totalQuizzes = modulesWithQuiz.length;
  const quizzesPassed = modulesWithQuiz.filter((m) => {
    const passingScore = m.quiz?.passingScorePercent || 70;
    const score = state.quizScores?.[m.id] ?? 0;
    return score >= passingScore;
  }).length;
  const quizCompletionPercent = totalQuizzes > 0 ? Math.round((quizzesPassed / totalQuizzes) * 100) : 100;

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

  const hasAssessmentGates = totalQuizzes > 0 || totalLabs > 0 || hasCapstone;
  let isFullyCompleted = false;
  let overallProgressPercent = 0;

  if (hasAssessmentGates) {
    const allLessonsDone = lessonsCompleted === totalLessons;
    const allQuizzesDone = quizzesPassed === totalQuizzes;
    const allLabsDone = labsCompleted === totalLabs;
    isFullyCompleted = allLessonsDone && allQuizzesDone && allLabsDone && capstonePassed;

    // Weighted progress dimensions:
    // Lessons: 40%, Quizzes: 20%, Labs: 20%, Capstone: 20%
    let weighted = (lessonCompletionPercent * 0.4);
    if (totalQuizzes > 0) weighted += (quizCompletionPercent * 0.2); else weighted += (lessonCompletionPercent * 0.2);
    if (totalLabs > 0) weighted += (labCompletionPercent * 0.2); else weighted += (lessonCompletionPercent * 0.2);
    if (hasCapstone) {
      let capstoneProg = 0;
      if (capstoneSubmitted) capstoneProg += 50;
      if (capstonePassed) capstoneProg += 50;
      weighted += (capstoneProg * 0.2);
    } else {
      weighted += (lessonCompletionPercent * 0.2);
    }
    overallProgressPercent = Math.min(100, Math.round(weighted));
    if (isFullyCompleted) {
      overallProgressPercent = 100;
    } else if (overallProgressPercent === 100) {
      overallProgressPercent = 99; // Cap at 99% until all required assessment gates pass
    }
  } else {
    // Standard lesson-only course (e.g. MERN, Networking, Wireshark)
    isFullyCompleted = lessonsCompleted === totalLessons;
    overallProgressPercent = lessonCompletionPercent;
  }

  const remainingRequirements: string[] = [];
  if (lessonsCompleted < totalLessons) {
    remainingRequirements.push(`${totalLessons - lessonsCompleted} lesson${totalLessons - lessonsCompleted === 1 ? '' : 's'}`);
  }
  if (totalQuizzes > 0 && quizzesPassed < totalQuizzes) {
    remainingRequirements.push(`${totalQuizzes - quizzesPassed} quiz${totalQuizzes - quizzesPassed === 1 ? '' : 'zes'}`);
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
    let nextCompletedIds: string[];

    if (isCompleted) {
      nextCompletedIds = state.completedLessonIds.filter((id) => id !== lessonId);
    } else {
      nextCompletedIds = [...state.completedLessonIds, lessonId];
    }

    const nextState: CourseProgressState = {
      ...state,
      completedLessonIds: nextCompletedIds,
      lastCompletedLessonId: !isCompleted ? lessonId : state.lastCompletedLessonId,
      lastActiveLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
    };

    saveState(nextState);
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

  recordQuizScore(courseId: string, quizId: string, scorePercent: number): void {
    const state = loadState(courseId);
    const quizScores = { ...(state.quizScores || {}), [quizId]: scorePercent };
    saveState({
      ...state,
      quizScores,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  recordQuizAttempt(courseId: string, moduleId: string, attempt: QuizAttempt): void {
    const state = loadState(courseId);
    const existingAttempts = state.quizAttempts?.[moduleId] || [];
    const nextAttempts = [...existingAttempts, attempt];
    
    // Update quizScores with highest score achieved across attempts
    const highestScore = Math.max(...nextAttempts.map((a) => a.score), 0);
    const quizScores = { ...(state.quizScores || {}), [moduleId]: highestScore };
    const quizAttempts = { ...(state.quizAttempts || {}), [moduleId]: nextAttempts };

    saveState({
      ...state,
      quizScores,
      quizAttempts,
      lastAccessedAt: new Date().toISOString(),
    });
  },

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
