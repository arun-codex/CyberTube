'use client';

import React from 'react';
import { Clock, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { NormalizedLessonVideo } from '../../../types/learning-view-model';
import { UserVideoProgress } from '../../../types/course';
import { formatPlaybackRatio } from '../../../lib/progress/video-progress';

interface LessonVideoMetadataProps {
  activeVideo: NormalizedLessonVideo;
  totalVideosForLesson: number;
  currentIndex: number;
  videoProgress?: UserVideoProgress;
  onToggleWatched: (video: NormalizedLessonVideo) => void;
  onPrevVideo?: () => void;
  onNextVideo?: () => void;
  onRestartVideo?: () => void;
}

export const LessonVideoMetadata: React.FC<LessonVideoMetadataProps> = ({
  activeVideo,
  totalVideosForLesson,
  currentIndex,
  videoProgress,
  onToggleWatched,
  onPrevVideo,
  onNextVideo,
  onRestartVideo,
}) => {
  const isCompleted = videoProgress?.isCompleted;
  const currentSeconds = videoProgress?.lastWatchedSeconds || 0;
  const durationSeconds = videoProgress?.durationSeconds || activeVideo.durationSeconds;
  const completionPercentage = videoProgress?.completionPercentage || (isCompleted ? 100 : 0);

  const hasPrevVideo = currentIndex > 0;
  const hasNextVideo = currentIndex >= 0 && currentIndex < totalVideosForLesson - 1;

  return (
    <div className="p-4 sm:p-5 rounded-[6px] border border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
      {/* Title & Duration & Difficulty */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-mono text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3] leading-snug">
          {activeVideo.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
            <Clock className="w-3.5 h-3.5" />
            {Math.round(activeVideo.durationSeconds / 60)} mins
          </span>
          {activeVideo.difficulty && (
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase font-medium bg-[#f0fdf4] dark:bg-[#14532d]/30 text-[#15803d] dark:text-[#4ade80] border border-[#bbf7d0] dark:border-[#166534]">
              {activeVideo.difficulty}
            </span>
          )}
        </div>
      </div>

      {activeVideo.description && (
        <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          {activeVideo.description}
        </p>
      )}

      {/* Controls, Source, Watch Progress & YouTube fallback */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f1f5f9] dark:border-[#1E293B] text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
        <div className="flex flex-wrap items-center gap-3">
          <span>
            Source: <strong className="text-[#0F172A] dark:text-[#E6EDF3] font-medium">{activeVideo.creator}</strong>
          </span>

          {(currentSeconds > 0 || durationSeconds > 0) && (
            <span data-testid="video-playback-time" className="flex items-center gap-1 text-[#0E7490] dark:text-[#22D3EE]">
              <Clock className="w-3 h-3" />
              {formatPlaybackRatio(currentSeconds, durationSeconds)} ({completionPercentage}%)
            </span>
          )}

          <button
            type="button"
            data-testid={`toggle-video-watched-${activeVideo.videoId}`}
            onClick={() => onToggleWatched(activeVideo)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-medium transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-800'
                : 'bg-white dark:bg-[#1A2638] text-[#0F172A] dark:text-[#E6EDF3] border border-[#e2e8f0] dark:border-[#243044] hover:bg-[#f8fafc] dark:hover:bg-[#223249]'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                isCompleted ? 'text-green-600 dark:text-green-400' : 'text-[#94a3b8]'
              }`}
            />
            <span>{isCompleted ? 'Watched' : 'Mark as Watched'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Multi-video navigation if multiple videos exist for this lesson */}
          {totalVideosForLesson > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={!hasPrevVideo}
                onClick={onPrevVideo}
                data-testid="prev-topic-video-btn"
                className="p-1 rounded-[4px] border border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#1A2638] text-[#0F172A] dark:text-[#E6EDF3] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f1f5f9] dark:hover:bg-[#223249] transition-colors"
                title="Previous video for this topic"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7] px-1">
                {currentIndex + 1} of {totalVideosForLesson}
              </span>
              <button
                type="button"
                disabled={!hasNextVideo}
                onClick={onNextVideo}
                data-testid="next-topic-video-btn"
                className="p-1 rounded-[4px] border border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#1A2638] text-[#0F172A] dark:text-[#E6EDF3] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f1f5f9] dark:hover:bg-[#223249] transition-colors"
                title="Next video for this topic"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
