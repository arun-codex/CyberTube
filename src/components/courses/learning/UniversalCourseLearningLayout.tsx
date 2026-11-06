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
import { ComprehensiveCourseCompletion } from '../../../types/course';
import { cloudCourseProgressService } from '../../../lib/cloud-course-progress';
import { onCourseProgressChange } from '../../../lib/course-progress';

interface UniversalCourseLearningLayoutProps {
  course: CourseLearningViewModel;
  initialLessonSlug?: string;
  completionStats: ComprehensiveCourseCompletion;
  relatedResources?: Resource[];
}

export const UniversalCourseLearningLayout: React.FC<UniversalCourseLearningLayoutProps> = ({
  course,
  initialLessonSlug,
  completionStats: initialCompletionStats,
  relatedResources = [],
}) => {
  const allLessons = course.allLessons;

  const [activeLessonSlug, setActiveLessonSlug] = useState<string>(
    initialLessonSlug || allLessons[0]?.slug || ''
  );

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
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

  // Load progress and subscribe to updates
  useEffect(() => {
    const state = cloudCourseProgressService.getProgress(course.courseId);
    setCompletedLessonIds(state.completedLessonIds);
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
        setArchivedLegacyLessonIds(updatedState.archivedLegacyLessonIds || []);
      }
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.courseId]);

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
    (slug: string) => {
      setActiveLessonSlug(slug);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `/courses/${course.slug}?lesson=${slug}`);
      }
    },
    [course.slug]
  );

  const handleToggleLessonComplete = useCallback(
    (lessonId = activeLesson?.id) => {
      if (!lessonId) return;
      cloudCourseProgressService.toggleLessonCompletion(course.courseId, lessonId);
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
          />
        }
      >
        {/* 1 & 2. Main Video Player Area & Supplemental Resource Library */}
        {activeLesson.videos && activeLesson.videos.length > 0 ? (
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
        )}

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
          capstone={course.capstone}
          pcapResources={course.pcapResources}
          prerequisites={course.prerequisites}
        />
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
