'use client';

import React from 'react';
import { ShieldAlert, ExternalLink, Calendar, AlertTriangle } from 'lucide-react';
import type { ClassifiedItem } from '@/lib/discovery/live-feed';
import { SUBJECT_DISPLAY_NAMES } from '@/lib/discovery/content-taxonomy';

interface AdvisoryCardProps {
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

export function AdvisoryCard({ item }: AdvisoryCardProps) {
  const formattedDate = formatDate(item.published_at);
  const topicLabel = SUBJECT_DISPLAY_NAMES[item.subject] || 'Threat Intelligence';

  return (
    <article
      data-testid="feed-card-advisory"
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:border-red-500/50 hover:shadow-lg"
    >
      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-red-500/10 px-4 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-red-500 dark:text-red-400">
            <ShieldAlert className="h-4 w-4" />
            <span>Security Advisory</span>
          </span>
          {formattedDate && (
            <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-mono">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Identifier Badges (CVE / GHSA) */}
          <div className="flex flex-wrap items-center gap-2">
            {item.ghsa_id && (
              <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[11px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                {item.ghsa_id}
              </span>
            )}
            {item.cve_id && (
              <span className="rounded-md bg-red-500/15 border border-red-500/30 px-2 py-0.5 text-[11px] font-mono font-semibold text-red-600 dark:text-red-400">
                {item.cve_id}
              </span>
            )}
            <span className="rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
              {topicLabel}
            </span>
          </div>

          <h3 className="font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 focus:underline"
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
        <span className="truncate font-medium">{item.source_name || 'Security Advisory'}</span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-red-500 dark:text-red-400 hover:underline"
        >
          <span>Read Advisory</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
