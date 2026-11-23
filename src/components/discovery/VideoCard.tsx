/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { Play, ArrowRight, Video as VideoIcon } from 'lucide-react';
import type { ClassifiedItem } from '@/lib/discovery/live-feed';
import type { VideoWatchProgress } from './DiscoverVideoPlayer';
import { SUBJECT_DISPLAY_NAMES } from '@/lib/discovery/content-taxonomy';

interface VideoCardProps {
  item: ClassifiedItem;
  progress?: VideoWatchProgress;
  onPlay: (item: ClassifiedItem) => void;
}

function formatDate(dateStr?: string) {
  if (!dateStr || !Number.isFinite(Date.parse(dateStr))) {
    return null;
  }
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function VideoCard({ item, progress, onPlay }: VideoCardProps) {
  const percent = progress?.progress_percent || 0;
  const isCompleted = Boolean(progress?.is_completed);
  const formattedDate = formatDate(item.published_at);
  const topicLabel = SUBJECT_DISPLAY_NAMES[item.subject] || item.category_name || 'Cybersecurity';

  return (
    <article
      data-testid="feed-card-video"
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:border-[var(--accent-cyan)]/60 hover:shadow-lg"
    >
      {/* 16:9 Thumbnail Viewport */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0b1018]">
        <button
          type="button"
          onClick={() => onPlay(item)}
          aria-label={`Play ${item.title}`}
          className="relative h-full w-full block text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"
        >
          <img
            src={
              item.thumbnail_url ||
              (item.video_id ? `https://i.ytimg.com/vi/${item.video_id}/hqdefault.jpg` : '')
            }
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-90 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-[#111827]/85 text-white shadow-xl group-hover:scale-110 group-hover:bg-[#0E7490] transition-all">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </span>
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-[#0b1018]/90 px-2 py-0.5 text-[10px] font-mono font-medium text-white shadow">
            <VideoIcon className="h-3 w-3 text-red-500" />
            <span>Video</span>
          </span>
          {percent > 0 && (
            <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/70">
              <span
                className="block h-full bg-[#22D3EE] transition-all"
                style={{ width: `${percent}%` }}
              />
            </span>
          )}
        </button>
      </div>

      {/* Content Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 space-y-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)] font-mono">
            <span className="font-semibold text-[var(--accent-cyan)]">
              {topicLabel}
            </span>
            {formattedDate && (
              <>
                <span aria-hidden="true">·</span>
                <span>{formattedDate}</span>
              </>
            )}
          </div>

          <h3 className="font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
            <button
              type="button"
              onClick={() => onPlay(item)}
              className="text-left hover:text-[var(--accent-cyan)] focus:outline-none focus:underline"
            >
              {item.title}
            </button>
          </h3>

          {item.description && (
            <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3 text-xs text-[var(--text-secondary)]">
          <span className="truncate font-medium">{item.source_name || 'YouTube'}</span>
          <button
            type="button"
            onClick={() => onPlay(item)}
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-[var(--accent-cyan)] hover:underline"
          >
            <span>
              {percent > 0 && !isCompleted
                ? 'Resume'
                : isCompleted
                ? 'Watch again'
                : 'Play'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
