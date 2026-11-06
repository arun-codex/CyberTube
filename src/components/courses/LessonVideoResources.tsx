import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Film,
  Sparkles,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { LessonVideoResource, UserVideoProgress } from '../../types/course';
import { YouTubePlayer } from '../YouTubePlayer';
import { cloudCourseProgressService } from '../../lib/cloud-course-progress';

interface LessonVideoResourcesProps {
  courseId: string;
  moduleId?: string;
  lessonId: string;
  lessonTitle: string;
  moduleTitle?: string;
  estimatedDurationMinutes?: number;
  availableResources: LessonVideoResource[];
  onSelectNextLesson?: () => void;
  nextLessonTitle?: string;
}

export const LessonVideoResources: React.FC<LessonVideoResourcesProps> = ({
  courseId,
  moduleId,
  lessonId,
  lessonTitle,
  moduleTitle,
  estimatedDurationMinutes = 30,
  availableResources,
  onSelectNextLesson,
  nextLessonTitle,
}) => {
  // Filter resources strictly matching the active lesson ID
  const lessonVideos = availableResources.filter((r) => r.lessonId === lessonId);

  const [selectedVideoId, setSelectedVideoId] = useState<string>(
    lessonVideos[0]?.videoId || ''
  );
  const [videoProgressMap, setVideoProgressMap] = useState<Record<string, UserVideoProgress>>({});

  // Reset or initialize selected video when lesson changes
  useEffect(() => {
    if (lessonVideos.length > 0) {
      // If previous selection isn't in new lesson, switch to first available
      if (!lessonVideos.some((v) => v.videoId === selectedVideoId)) {
        setSelectedVideoId(lessonVideos[0].videoId);
      }
    } else {
      setSelectedVideoId('');
    }
  }, [lessonId, lessonVideos, selectedVideoId]);

  // Load per-video progress
  useEffect(() => {
    const allProgress = cloudCourseProgressService.getAllVideoProgress?.(courseId) || {};
    setVideoProgressMap(allProgress);
  }, [courseId, lessonId, selectedVideoId]);

  const activeVideo =
    lessonVideos.find((v) => v.videoId === selectedVideoId) || lessonVideos[0];
  const activeVideoProgress = activeVideo
    ? videoProgressMap[activeVideo.videoId]
    : undefined;

  const handleSelectVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const currentIndex = lessonVideos.findIndex((v) => v.videoId === activeVideo?.videoId);
  const hasPrevVideo = currentIndex > 0;
  const hasNextVideo = currentIndex >= 0 && currentIndex < lessonVideos.length - 1;

  const handlePrevVideo = () => {
    if (hasPrevVideo) {
      setSelectedVideoId(lessonVideos[currentIndex - 1].videoId);
    }
  };

  const handleNextVideo = () => {
    if (hasNextVideo) {
      setSelectedVideoId(lessonVideos[currentIndex + 1].videoId);
    }
  };

  const handleToggleWatched = (video: LessonVideoResource) => {
    const current = videoProgressMap[video.videoId];
    const isNowCompleted = !current?.isCompleted;
    const progress: UserVideoProgress = {
      courseId,
      moduleId,
      lessonId,
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
  };

  // Case 1: No videos available for this lesson -> Render clean theory/lab banner fallback
  if (!lessonVideos || lessonVideos.length === 0) {
    return (
      <div
        data-testid="theory-lesson-banner"
        className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#0b1320] dark:to-[#162234] p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#243044] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[6px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE] font-semibold">
                Forensics Curriculum & Practical Lab Guide
              </span>
              <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                Estimated Duration: {estimatedDurationMinutes} mins
              </div>
            </div>
          </div>
          <span className="rounded-[4px] border border-[#bae6fd] dark:border-[#155e75] bg-[#e0f2fe] dark:bg-[#0c3445] px-2 py-1 text-[10px] font-mono text-[#075985] dark:text-[#67e8f9]">
            Theory + Practical Lab
          </span>
        </div>
        <div className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed space-y-2">
          <p>
            This lesson is centered on comprehensive forensics theory, evidentiary standards, and hands-on PCAP lab procedures.
          </p>
          <p className="text-xs text-[#64748B] dark:text-[#8899a6]">
            No public third-party video currently meets the strict evidentiary accuracy standards required for this topic. Follow the detailed step-by-step procedures, packet dissections, and lab worksheet below.
          </p>
        </div>
      </div>
    );
  }

  // Case 2: Lesson has topic-mapped videos
  return (
    <section
      data-testid="lesson-video-resources"
      className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f8fafc] dark:bg-[#0B1320] p-4 sm:p-6 space-y-5"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#243044] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#0E7490] dark:text-[#22D3EE]">
              Topic Video Learning Resources
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[#303055] dark:text-[#E6EDF3]">
            {lessonTitle}
          </h3>
          {moduleTitle && (
            <p className="text-xs text-[#64748B] dark:text-[#9BA8B7]">
              {moduleTitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-[4px] border border-[#bae6fd] dark:border-[#155e75] bg-[#e0f2fe] dark:bg-[#0c3445] px-2 py-1 text-[10px] font-mono text-[#075985] dark:text-[#67e8f9]">
            {lessonVideos.length} {lessonVideos.length === 1 ? 'video' : 'videos'} for this topic
          </span>
        </div>
      </div>

      {/* Main Grid: Player on left (desktop 8/12 or flex), Topic Video Selector on right */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.95fr)] gap-5 items-start">
        {/* Left: Video Player + Active Video Info */}
        <div className="space-y-3 min-w-0">
          <div className="relative">
            <YouTubePlayer
              videoId={activeVideo.videoId}
              title={activeVideo.title}
              channelName={activeVideo.creator}
              courseId={courseId}
              moduleId={moduleId}
              lessonId={lessonId}
            />
          </div>

          {/* Active Video Metadata Card */}
          <div className="p-4 rounded-[6px] border border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold text-[#303055] dark:text-[#E6EDF3]">
                {activeVideo.title}
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.round(activeVideo.durationSeconds / 60)} mins
                </span>
                <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase font-medium bg-[#f0fdf4] dark:bg-[#14532d]/30 text-[#15803d] dark:text-[#4ade80] border border-[#bbf7d0] dark:border-[#166534]">
                  {activeVideo.difficulty || 'intermediate'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              {activeVideo.description}
            </p>

            {/* Video Controls & Watch Progress */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#f1f5f9] dark:border-[#1E293B]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid={`toggle-video-watched-${activeVideo.videoId}`}
                  onClick={() => handleToggleWatched(activeVideo)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
                    activeVideoProgress?.isCompleted
                      ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-800'
                      : 'bg-white dark:bg-[#1A2638] text-[#303055] dark:text-[#E6EDF3] border border-[#e2e8f0] dark:border-[#243044] hover:bg-[#f8fafc] dark:hover:bg-[#223249]'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${activeVideoProgress?.isCompleted ? 'text-green-600 dark:text-green-400' : 'text-[#94a3b8]'}`} />
                  {activeVideoProgress?.isCompleted ? 'Watched' : 'Mark as Watched'}
                </button>
              </div>

              {/* Prev / Next video controls if multiple videos exist */}
              {lessonVideos.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={!hasPrevVideo}
                    onClick={handlePrevVideo}
                    data-testid="prev-topic-video-btn"
                    className="p-1.5 rounded-[4px] border border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#1A2638] text-[#303055] dark:text-[#E6EDF3] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f1f5f9] dark:hover:bg-[#223249]"
                    title="Previous video for this topic"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7] px-1">
                    {currentIndex + 1} of {lessonVideos.length}
                  </span>
                  <button
                    type="button"
                    disabled={!hasNextVideo}
                    onClick={handleNextVideo}
                    data-testid="next-topic-video-btn"
                    className="p-1.5 rounded-[4px] border border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#1A2638] text-[#303055] dark:text-[#E6EDF3] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f1f5f9] dark:hover:bg-[#223249]"
                    title="Next video for this topic"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Available Topic Videos List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] font-semibold flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
              Topic Playlist ({lessonVideos.length})
            </span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1" aria-label="Available topic videos">
            {lessonVideos.map((video, idx) => {
              const isSelected = activeVideo.videoId === video.videoId;
              const isWatched = !!videoProgressMap[video.videoId]?.isCompleted;

              return (
                <button
                  key={video.resourceId || video.videoId}
                  type="button"
                  data-testid={`topic-video-item-${video.videoId}`}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectVideo(video.videoId)}
                  className={`w-full rounded-[6px] border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-[#0E7490] dark:border-[#22D3EE] bg-[#e0f2fe] dark:bg-[#0c3445] shadow-sm'
                      : 'border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#121A26] hover:border-[#94a3b8] dark:hover:border-[#3b526e]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#0E7490] dark:text-[#22D3EE]">
                      Video {idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isWatched && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 px-1.5 py-0.5 rounded border border-green-200 dark:border-green-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Done
                        </span>
                      )}
                      {isSelected && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#0E7490] text-white dark:bg-[#22D3EE] dark:text-[#0b1320]">
                          Now Playing
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="block text-xs font-semibold text-[#303055] dark:text-[#E6EDF3] leading-snug line-clamp-2">
                    {video.title}
                  </span>

                  <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-[#f1f5f9] dark:border-[#1E293B] text-[10px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                    <span className="truncate max-w-[130px] font-medium text-[#475569] dark:text-[#CBD5E1]">
                      {video.creator}
                    </span>
                    <span>{Math.round(video.durationSeconds / 60)}m</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick next lesson prompt if available */}
          {onSelectNextLesson && nextLessonTitle && (
            <div className="pt-2 border-t border-[#e2e8f0] dark:border-[#243044]">
              <button
                type="button"
                data-testid="advance-to-next-lesson-btn"
                onClick={onSelectNextLesson}
                className="w-full flex items-center justify-between p-2.5 rounded-[6px] bg-[#f1f5f9] dark:bg-[#1A2638] hover:bg-[#e2e8f0] dark:hover:bg-[#24344d] border border-[#e2e8f0] dark:border-[#243044] text-xs transition-colors"
              >
                <div className="text-left">
                  <span className="block text-[10px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8]">
                    Suggested Next Lesson
                  </span>
                  <span className="font-semibold text-[#303055] dark:text-[#E6EDF3] truncate max-w-[200px] block">
                    {nextLessonTitle}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE] shrink-0" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
