'use client';

import React from 'react';
import { BriefcaseBusiness, ExternalLink, MapPin, Calendar } from 'lucide-react';
import type { ClassifiedItem } from '@/lib/discovery/live-feed';
import { SUBJECT_DISPLAY_NAMES } from '@/lib/discovery/content-taxonomy';

interface JobCardProps {
  item: ClassifiedItem;
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

export function JobCard({ item }: JobCardProps) {
  const formattedDate = formatDate(item.published_at);
  const topicLabel = SUBJECT_DISPLAY_NAMES[item.subject] || 'Career Development';
  const isGuide = item.editorial_kind === 'career_guide';

  return (
    <article
      data-testid="feed-card-job"
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:border-[var(--accent-amber)]/60 hover:shadow-lg"
    >
      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--accent-amber)]">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            <span>{isGuide ? 'Career Guide' : 'Opportunity Portal'}</span>
          </span>
          {formattedDate ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-mono">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Verified Portal</span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)] font-mono">
            <span className="rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 font-medium text-[var(--text-secondary)]">
              {topicLabel}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {item.location}
              </span>
            )}
          </div>

          <h3 className="font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-amber)] focus:underline"
            >
              {item.title}
            </a>
          </h3>

          {item.description && (
            <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-3">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-4 sm:px-5 py-3 text-xs text-[var(--text-secondary)]">
        <span className="truncate font-medium">{item.employer || item.source_name || 'External'}</span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-[var(--accent-amber)] hover:underline"
        >
          <span>{isGuide ? 'Read Guide' : 'Open Official Site'}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
