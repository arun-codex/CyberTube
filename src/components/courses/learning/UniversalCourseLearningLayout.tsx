'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { CourseLearningViewModel, NormalizedLesson, NormalizedLessonVideo } from '../../../types/learning-view-model';
import { UserVideoProgress } from '../../../types/course';
import { CourseLearningHeader } from './CourseLearningHeader';
import { CourseProgressHeader } from './CourseProgressHeader';
import { CourseLearningWorkspace } from './CourseLearningWorkspace';
import { LessonVideoSection } from './LessonVideoSection';
import { LessonResourceLibrary } from './LessonResourceLibrary';
import { CurriculumSidebar } from './CurriculumSidebar';
import { LessonContentSections } from './LessonContentSections';
import { ResourceCard } from '../../ResourceCard';
import { Resource } from '../../../types/resource';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { ComprehensiveCourseCompletion } from '../../../types/course';
import { cloudCourseProgressService } from '../../../lib/cloud-course-progress';
import { onCourseProgressChange } from '../../../lib/course-progress';
import { useAuth } from '@/lib/auth';

interface UniversalCourseLearningLayoutProps {
  course: CourseLearningViewModel;
  initialLessonSlug?: string;
  initialTab?: 'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps';
  completionStats: ComprehensiveCourseCompletion;
  relatedResources?: Resource[];
}

export const UniversalCourseLearningLayout: React.FC<UniversalCourseLearningLayoutProps> = ({
  course,
  initialLessonSlug,
  initialTab,
  completionStats: initialCompletionStats,
  relatedResources = [],
}) => {
  const allLessons = course.allLessons;
  const { userId, isAuthLoading } = useAuth();

  const [activeLessonSlug, setActiveLessonSlug] = useState<string>(
    initialLessonSlug || allLessons[0]?.slug || ''
  );
  const [activeTabOverride, setActiveTabOverride] = useState<
    'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps' | undefined
  >(initialTab);

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [archivedLegacyLessonIds, setArchivedLegacyLessonIds] = useState<string[]>([]);
  const [completionStats, setCompletionStats] = useState<ComprehensiveCourseCompletion>(
    initialCompletionStats
  );
  const [selectedVideoId, setSelectedVideoId] = useState<string>('');
  const [videoProgressMap, setVideoProgressMap] = useState<Record<string, UserVideoProgress>>({});

  // Sync initial lesson slug if it changes from outside
  useEffect(() => {
    if (initialLessonSlug) {
      setActiveLessonSlug(initialLessonSlug);
    }
  }, [initialLessonSlug]);

  useEffect(() => {
    if (initialTab) {
      setActiveTabOverride(initialTab);
    }
  }, [initialTab]);

  // Load progress and subscribe to updates
  useEffect(() => {
    const state = cloudCourseProgressService.getProgress(course.courseId);
    setCompletedLessonIds(state.completedLessonIds);
    setQuizScores(state.quizScores || {});
    setArchivedLegacyLessonIds(state.archivedLegacyLessonIds || []);

    if (!initialLessonSlug && state.lastActiveLessonId) {
      const match = allLessons.find((l) => l.id === state.lastActiveLessonId);
      if (match) {
        setActiveLessonSlug(match.slug);
      }
    }

    const unsub = onCourseProgressChange((updatedState) => {
      if (updatedState.courseId === course.courseId) {
        setCompletedLessonIds(updatedState.completedLessonIds);
        setQuizScores(updatedState.quizScores || {});
        setArchivedLegacyLessonIds(updatedState.archivedLegacyLessonIds || []);
      }
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.courseId]);

  // General course quiz results are stored privately in Supabase. Restore the
  // best score on every signed-in device without replacing a higher local score.
  useEffect(() => {
    if(isAuthLoading || !userId || course.slug==='free-storytelling-masterclass') return;
    const controller=new AbortController();
    fetch('/api/courses/quiz/submit?courseSlug='+encodeURIComponent(course.slug),{
      cache:'no-store',credentials:'same-origin',signal:controller.signal,
    }).then(async res=>{
      if(!res.ok)throw Error('Cloud quiz history unavailable');
      return res.json();
    }).then(data=>{
      if(controller.signal.aborted||data.courseId!==course.courseId)return;
      for(const [moduleId,value] of Object.entries(data.scores||{})){
        const remote=Number(value);
        if(!Number.isFinite(remote)||remote<0||remote>100)continue;
        const current=cloudCourseProgressService.getProgress(course.courseId).quizScores?.[moduleId]||0;
        if(remote>current)cloudCourseProgressService.recordQuizScore?.(course.courseId,moduleId,remote);
      }
    }).catch(error=>{
      if(!controller.signal.aborted)console.warn('[course-quiz] Could not restore saved scores:',error);
    });
    return()=>controller.abort();
  },[course.courseId,course.slug,userId,isAuthLoading]);

  // Active lesson lookup
  const activeLesson: NormalizedLesson | undefined = useMemo(() => {
    return (
      allLessons.find((l) => l.slug === activeLessonSlug || l.id === activeLessonSlug) ||
      allLessons[0]
    );
  }, [allLessons, activeLessonSlug]);

  // Synchronize active lesson with cloud progress and reset selected video
  useEffect(() => {
    if (activeLesson) {
      cloudCourseProgressService.recordLessonAccess(course.courseId, activeLesson.id);

      if (activeLesson.videos && activeLesson.videos.length > 0) {
        // If current selected video is not in this lesson's videos, pick the first
        if (!activeLesson.videos.some((v) => v.videoId === selectedVideoId)) {
          setSelectedVideoId(activeLesson.videos[0].videoId);
        }
      } else {
        setSelectedVideoId('');
      }
    }
  }, [course.courseId, activeLesson, selectedVideoId]);

  // Load video progress records
  useEffect(() => {
    const allProgress =
      cloudCourseProgressService.getAllVideoProgress?.(course.courseId) || {};
    setVideoProgressMap(allProgress);
  }, [course.courseId, activeLesson?.id, selectedVideoId]);

  const activeVideo: NormalizedLessonVideo | undefined = useMemo(() => {
    if (!activeLesson?.videos || activeLesson.videos.length === 0) return undefined;
    return (
      activeLesson.videos.find((v) => v.videoId === selectedVideoId) ||
      activeLesson.videos[0]
    );
  }, [activeLesson, selectedVideoId]);

  const currentIndex = useMemo(() => {
    if (!activeLesson?.videos || !activeVideo) return -1;
    return activeLesson.videos.findIndex((v) => v.videoId === activeVideo.videoId);
  }, [activeLesson, activeVideo]);

  const handleSelectLesson = useCallback(
    (slug: string, tab?: 'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps') => {
      setActiveLessonSlug(slug);
      setActiveTabOverride(tab || 'content');
      if (typeof window !== 'undefined') {
        const tabQuery = tab && tab !== 'content' ? `&tab=${tab}` : '';
        window.history.pushState(null, '', `/courses/${course.slug}?lesson=${slug}${tabQuery}`);
      }
    },
    [course.slug]
  );

  const handleToggleLessonComplete = useCallback(
    (lessonId = activeLesson?.id) => {
      if (!lessonId) return;
      cloudCourseProgressService.toggleLessonCompletion(course.courseId, lessonId);
      const state = cloudCourseProgressService.getProgress(course.courseId);
      setCompletedLessonIds(state.completedLessonIds);
    },
    [course.courseId, activeLesson?.id]
  );

  const handleResetProgress = useCallback(async () => {
    cloudCourseProgressService.resetCourseProgress(course.courseId);
    const state = cloudCourseProgressService.getProgress(course.courseId);
    setCompletedLessonIds(state.completedLessonIds);
    setArchivedLegacyLessonIds(state.archivedLegacyLessonIds || []);
  }, [course.courseId]);

  const handleSelectVideo = useCallback((videoId: string) => {
    setSelectedVideoId(videoId);
  }, []);

  const handlePrevVideo = useCallback(() => {
    if (!activeLesson?.videos || currentIndex <= 0) return;
    setSelectedVideoId(activeLesson.videos[currentIndex - 1].videoId);
  }, [activeLesson, currentIndex]);

  const handleNextVideo = useCallback(() => {
    if (
      !activeLesson?.videos ||
      currentIndex < 0 ||
      currentIndex >= activeLesson.videos.length - 1
    )
      return;
    setSelectedVideoId(activeLesson.videos[currentIndex + 1].videoId);
  }, [activeLesson, currentIndex]);

  const handleToggleVideoWatched = useCallback(
    (video: NormalizedLessonVideo) => {
      const current = videoProgressMap[video.videoId];
      const isNowCompleted = !current?.isCompleted;
      const progress: UserVideoProgress = {
        courseId: course.courseId,
        moduleId: activeLesson?.moduleId,
        lessonId: activeLesson?.id,
        videoId: video.videoId,
        lastWatchedSeconds: isNowCompleted ? video.durationSeconds : 0,
        durationSeconds: video.durationSeconds,
        completionPercentage: isNowCompleted ? 100 : 0,
        isCompleted: isNowCompleted,
        lastWatchedAt: new Date().toISOString(),
      };

      cloudCourseProgressService.recordVideoProgress?.(progress);
      setVideoProgressMap((prev) => ({
        ...prev,
        [video.videoId]: progress,
      }));
    },
    [course.courseId, activeLesson, videoProgressMap]
  );

  if (!activeLesson) {
    return (
      <div className="container-max py-16 text-center text-[#64748B] dark:text-[#9BA8B7] font-mono">
        No lessons available in this course curriculum.
      </div>
    );
  }

  // Determine previous and next lessons
  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : undefined;
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : undefined;

  // No quiz-dependent unlocking: all course modules and lessons are accessible
  const isCurrentLessonLocked = false;
  const lockRequirementMessage = '';
  const prerequisiteModule: any = undefined;

  const isLessonCompleted = completedLessonIds.includes(activeLesson.id);
  const activeVideoProgress = activeVideo ? videoProgressMap[activeVideo.videoId] : undefined;

  return (
    <div className="container-max py-8 space-y-8">
      {/* SECTION A: Course Header */}
      <CourseLearningHeader course={course} />

      {/* Course Progress Summary */}
      <CourseProgressHeader
        courseId={course.courseId}
        totalLessons={course.totalLessons}
        completedLessonIds={completedLessonIds}
        onResetProgress={handleResetProgress}
        completionStats={completionStats}
        archivedLegacyLessonIds={archivedLegacyLessonIds}
      />

      {/* SECTION B: Main Learning Workspace (70% content, 30% sidebar) */}
      <CourseLearningWorkspace
        sidebar={
          <CurriculumSidebar
            modules={course.modules}
            activeLessonId={activeLesson.id}
            completedLessonIds={completedLessonIds}
            courseSlug={course.slug}
            totalLessons={course.totalLessons}
            onSelectLesson={handleSelectLesson}
            onToggleComplete={handleToggleLessonComplete}
            quizScores={quizScores}
          />
        }
      >
        {isCurrentLessonLocked ? (
          <div data-testid="locked-lesson-overlay" className="p-8 sm:p-12 rounded-[8px] border border-[#f59e0b]/30 bg-[#fffbeb] dark:bg-[#78350f]/20 text-[#0F172A] dark:text-[#E6EDF3] space-y-6 text-center max-w-2xl mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center mx-auto text-[#d97706] dark:text-[#fbbf24]">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-rajdhani font-bold text-2xl text-[#92400e] dark:text-[#fde68a]">
                Module Content Locked
              </h3>
              <p className="text-sm text-[#78350f] dark:text-[#fef3c7] leading-relaxed max-w-lg mx-auto">
                {lockRequirementMessage}
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {prerequisiteModule?.quiz && (
                <button
                  type="button"
                  onClick={() => {
                    const targetLesson =
                      prerequisiteModule.lessons?.[prerequisiteModule.lessons.length - 1] ||
                      prerequisiteModule.lessons?.[0];
                    if (targetLesson) {
                      handleSelectLesson(targetLesson.slug, 'quiz');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#0E7490] hover:bg-[#0891B2] text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer hover:shadow-md"
                >
                  <span>Go to Required Quiz ({prerequisiteModule.title})</span>
                </button>
              )}
              {prerequisiteModule?.lessons?.[0] && (
                <button
                  type="button"
                  onClick={() => handleSelectLesson(prerequisiteModule.lessons[0].slug)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-slate-200 hover:bg-slate-300 dark:bg-[#1E293B] dark:hover:bg-[#334155] text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to {prerequisiteModule.title}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* 1 & 2. Main Video Player Area & Supplemental Resource Library */}
            {activeTabOverride !== 'quiz' && (activeLesson.videos && activeLesson.videos.length > 0 ? (
              <div data-testid="lesson-video-resources" className="space-y-6">
                <LessonVideoSection
                  courseId={course.courseId}
                  activeLesson={activeLesson}
                  activeVideo={activeVideo}
                  currentIndex={currentIndex}
                  videoProgress={activeVideoProgress}
                  onToggleWatched={handleToggleVideoWatched}
                  onPrevVideo={handlePrevVideo}
                  onNextVideo={handleNextVideo}
                />
                {activeLesson.videos.length > 1 && (
                  <LessonResourceLibrary
                    videos={activeLesson.videos}
                    selectedVideoId={activeVideo?.videoId || ''}
                    onSelectVideo={handleSelectVideo}
                    videoProgressMap={videoProgressMap}
                    onToggleWatched={handleToggleVideoWatched}
                    lessonTitle={activeLesson.title}
                    moduleTitle={activeLesson.moduleTitle}
                  />
                )}
              </div>
            ) : (
              <LessonVideoSection
                courseId={course.courseId}
                activeLesson={activeLesson}
                activeVideo={activeVideo}
                currentIndex={currentIndex}
                videoProgress={activeVideoProgress}
                onToggleWatched={handleToggleVideoWatched}
                onPrevVideo={handlePrevVideo}
                onNextVideo={handleNextVideo}
              />
            ))}

            {/* 3. Standard Lesson Content Sections (Overview, Objectives, Skills, Tabs, Navigation) */}
            <LessonContentSections
              courseId={course.courseId}
              courseSlug={course.slug}
              domains={course.domains}
              activeLesson={activeLesson}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              isLessonCompleted={isLessonCompleted}
              onToggleComplete={() => handleToggleLessonComplete(activeLesson.id)}
              onSelectLesson={handleSelectLesson}
              activeTabOverride={activeTabOverride}
              onTabChange={setActiveTabOverride}
              completedLessonIds={completedLessonIds}
              quizScores={quizScores}
              currentModuleLessons={
                course.modules.find((m) => m.id === activeLesson.moduleId)?.lessons || []
              }
              capstone={course.capstone}
              pcapResources={course.pcapResources}
              prerequisites={course.prerequisites}
            />
          </>
        )}
      </CourseLearningWorkspace>

      {/* SECTION C: Connected Reference Documentation & Labs */}
      {relatedResources.length > 0 && (
        <div className="pt-8 border-t border-[#e4e4ed] dark:border-[#243044] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                Connected Labs & Reference Documentation
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#9BA8B7] mt-0.5">
                Extend this lesson with verified tools, packet captures, and specifications.
              </p>
            </div>
            <Link
              href="/discover"
              className="text-xs font-mono text-[#0E7490] dark:text-[#22D3EE] hover:underline"
            >
              Discover catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
