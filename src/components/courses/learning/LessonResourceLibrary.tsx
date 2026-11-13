'use client';

import React from 'react';
import { Film, Play, CheckCircle2, Clock, Video } from 'lucide-react';
import { NormalizedLessonVideo } from '../../../types/learning-view-model';
import { UserVideoProgress } from '../../../types/course';

interface LessonResourceLibraryProps {
  videos: NormalizedLessonVideo[];
  selectedVideoId: string;
  onSelectVideo: (videoId: string) => void;
  videoProgressMap: Record<string, UserVideoProgress>;
  onToggleWatched: (video: NormalizedLessonVideo) => void;
  lessonTitle: string;
  moduleTitle?: string;
}

export const LessonResourceLibrary: React.FC<LessonResourceLibraryProps> = ({
  videos,
  selectedVideoId,
  onSelectVideo,
  videoProgressMap,
  onToggleWatched,
  lessonTitle,
  moduleTitle,
}) => {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section
      data-testid="lesson-resource-library"
      className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f8fafc] dark:bg-[#0B1320] p-5 sm:p-6 space-y-4"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#243044] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#0E7490] dark:text-[#22D3EE]">
              Learning Resources
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
            {lessonTitle}
          </h3>
          {moduleTitle && (
            <p className="text-xs text-[#64748B] dark:text-[#9BA8B7]">{moduleTitle}</p>
          )}
        </div>

        <span className="rounded-[4px] border border-[#bae6fd] dark:border-[#155e75] bg-[#e0f2fe] dark:bg-[#0c3445] px-2.5 py-1 text-[11px] font-mono text-[#075985] dark:text-[#67e8f9]">
          {videos.length} {videos.length === 1 ? 'video' : 'videos'} available
        </span>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {videos.map((video, idx) => {
          const isSelected = video.videoId === selectedVideoId;
          const progress = videoProgressMap[video.videoId];
          const isWatched = progress?.isCompleted;

          return (
            <div
              key={video.videoId}
              data-testid={`topic-video-item-${video.videoId}`}
              onClick={() => onSelectVideo(video.videoId)}
              className={`p-3.5 rounded-[6px] border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                isSelected
                  ? 'border-[#0E7490] dark:border-[#22D3EE] bg-white dark:bg-[#121A26] shadow-sm ring-1 ring-[#0E7490]/20 dark:ring-[#22D3EE]/20'
                  : 'border-[#e2e8f0] dark:border-[#243044] bg-white dark:bg-[#121A26] hover:border-[#cbd5e1] dark:hover:border-[#334155]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#64748B] dark:text-[#9BA8B7]">
                      #{idx + 1}
                    </span>
                    {isSelected && (
                      <span className="px-1.5 py-0.2 rounded-[3px] text-[10px] font-mono font-semibold bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018]">
                        Active Video
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                    <Clock className="w-3 h-3" />
                    {Math.round(video.durationSeconds / 60)}m
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] line-clamp-2">
                  {video.title}
                </h4>

                <p className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7] truncate">
                  By {video.creator}
                </p>

                {video.description && (
                  <p className="text-[11px] text-[#475569] dark:text-[#9BA8B7] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>

              {/* Card Footer: Status & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9] dark:border-[#1E293B]">
                <div className="flex items-center gap-1.5">
                  {video.difficulty && (
                    <span className="px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono uppercase bg-[#f0fdf4] dark:bg-[#14532d]/30 text-[#15803d] dark:text-[#4ade80] border border-[#bbf7d0] dark:border-[#166534]">
                      {video.difficulty}
                    </span>
                  )}
                  {isWatched && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Watched
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-testid={`topic-card-toggle-watched-${video.videoId}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatched(video);
                    }}
                    className={`p-1 rounded-[3px] text-[10px] font-mono transition-colors ${
                      isWatched
                        ? 'text-green-600 dark:text-green-400 hover:text-green-700'
                        : 'text-[#64748B] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3]'
                    }`}
                    title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video.videoId);
                    }}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-[4px] text-[11px] font-mono font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018]'
                        : 'bg-[#f4f4f9] dark:bg-[#1A2638] text-[#0F172A] dark:text-[#E6EDF3] hover:bg-[#e2e8f0] dark:hover:bg-[#223249]'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isSelected ? 'Playing' : 'Play'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

