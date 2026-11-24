'use client';

import React from 'react';
import { Wrench, BookOpen, ExternalLink } from 'lucide-react';
import type { ClassifiedItem } from '@/lib/discovery/live-feed';
import { SUBJECT_DISPLAY_NAMES } from '@/lib/discovery/content-taxonomy';

interface ResourceToolCardProps {
  item: ClassifiedItem;
}

export function ResourceToolCard({ item }: ResourceToolCardProps) {
  const isTool = item.editorial_kind === 'tool';
  const topicLabel = SUBJECT_DISPLAY_NAMES[item.subject] || item.category_name || 'Resources';

  return (
    <article
      data-testid="feed-card-resource"
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:border-[var(--accent-emerald)]/60 hover:shadow-lg"
    >
      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--accent-emerald)]">
            {isTool ? <Wrench className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
            <span>{isTool ? 'Verified Tool' : 'Learning Resource'}</span>
          </span>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">Reference</span>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)] font-mono">
            <span className="rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 font-medium text-[var(--text-secondary)]">
              {topicLabel}
            </span>
          </div>

          <h3 className="font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-emerald)] focus:underline"
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
        <span className="truncate font-medium">{item.source_name || 'CyberTube Directory'}</span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-[var(--accent-emerald)] hover:underline"
        >
          <span>{isTool ? 'Open Tool' : 'Open Resource'}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
