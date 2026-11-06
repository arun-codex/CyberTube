'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { YouTubePlayer } from '../../YouTubePlayer';
import { NormalizedLesson, NormalizedLessonVideo } from '../../../types/learning-view-model';
import { UserVideoProgress } from '../../../types/course';
import { LessonVideoMetadata } from './LessonVideoMetadata';

interface LessonVideoSectionProps {
  courseId: string;
  activeLesson: NormalizedLesson;
  activeVideo: NormalizedLessonVideo | undefined;
  currentIndex: number;
  videoProgress?: UserVideoProgress;
  onToggleWatched: (video: NormalizedLessonVideo) => void;
  onPrevVideo?: () => void;
  onNextVideo?: () => void;
}

export const LessonVideoSection: React.FC<LessonVideoSectionProps> = ({
  courseId,
  activeLesson,
  activeVideo,
  currentIndex,
  videoProgress,
  onToggleWatched,
  onPrevVideo,
  onNextVideo,
}) => {
  // Case 1: Theory & practical lab lesson with no video stream
  if (!activeVideo || activeLesson.videos.length === 0) {
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
                Curriculum & Practical Lab Guide
              </span>
              <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                Estimated Duration: {activeLesson.durationMinutes} mins
              </div>
            </div>
          </div>
          <span className="rounded-[4px] border border-[#bae6fd] dark:border-[#155e75] bg-[#e0f2fe] dark:bg-[#0c3445] px-2 py-1 text-[10px] font-mono text-[#075985] dark:text-[#67e8f9]">
            Theory + practical lesson
          </span>
        </div>
        <div className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed space-y-2">
          <p>
            This lesson is centered on core protocol theory, packet disassembly, and practical exercises. Follow the step-by-step curriculum guide below.
          </p>
        </div>
      </div>
    );
  }

  // Case 2: Lesson has a video stream (single or multi-video topic)
  return (
    <div className="space-y-4">
      <YouTubePlayer
        videoId={activeVideo.videoId}
        title={activeVideo.title}
        channelName={activeVideo.creator}
        courseId={courseId}
        moduleId={activeLesson.moduleId}
        lessonId={activeLesson.id}
      />

      {/* Standard Video Metadata Bar */}
      <LessonVideoMetadata
        activeVideo={activeVideo}
        totalVideosForLesson={activeLesson.videos.length}
        currentIndex={currentIndex}
        videoProgress={videoProgress}
        onToggleWatched={onToggleWatched}
        onPrevVideo={onPrevVideo}
        onNextVideo={onNextVideo}
      />
    </div>
  );
};
