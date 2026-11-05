'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Check, Bookmark, Youtube, Layers, ShieldCheck } from 'lucide-react';
import { Resource } from '@/types/catalog';
import { isItemCompleted, toggleCompletedItem } from '@/lib/progress';

interface LibraryCardProps {
  resource: Resource;
}

export function LibraryCard({ resource }: LibraryCardProps) {
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setCompleted(isItemCompleted('library_done', resource.id));
    setBookmarked(isItemCompleted('library_saved', resource.id));

    const handleUpdate = () => {
      setCompleted(isItemCompleted('library_done', resource.id));
      setBookmarked(isItemCompleted('library_saved', resource.id));
    };

    window.addEventListener('cybertube-progress-update', handleUpdate);
    return () => window.removeEventListener('cybertube-progress-update', handleUpdate);
  }, [resource.id]);

  const handleToggleDone = (e: React.MouseEvent) => {
    e.preventDefault();
    const updated = toggleCompletedItem('library_done', resource.id);
    setCompleted(updated);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    const updated = toggleCompletedItem('library_saved', resource.id);
    setBookmarked(updated);
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-[#34D399] border-[#34D399]/30 bg-[#34D399]/10';
      case 'beginner-intermediate':
        return 'text-[#22D3EE] border-[#22D3EE]/30 bg-[#22D3EE]/10';
      case 'intermediate':
        return 'text-[#FBBF24] border-[#FBBF24]/30 bg-[#FBBF24]/10';
      case 'advanced':
        return 'text-[#F87171] border-[#F87171]/30 bg-[#F87171]/10';
      default:
        return 'text-[#9BA8B7] border-[#9BA8B7]/30 bg-[#9BA8B7]/10';
    }
  };

  return (
    <div className="group rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] overflow-hidden flex flex-col justify-between hover:border-[#22D3EE]/50 hover:shadow-md transition-all duration-200">
      <div className="p-5 space-y-3.5">
        {/* Chips header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded-md border ${getLevelColor(resource.level)}`}>
              {resource.level}
            </span>
            <span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded-md bg-[#F1F5F9] dark:bg-[#1A2433] text-[#475569] dark:text-[#9BA8B7] border border-[#E2E8F0] dark:border-[#243044]">
              {resource.track}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleBookmark}
              className={`p-1.5 rounded-lg border transition-colors ${
                bookmarked
                  ? 'border-[#22D3EE] bg-[#22D3EE]/10 text-[#22D3EE]'
                  : 'border-[#E2E8F0] dark:border-[#243044] text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3]'
              }`}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <Link
            href={`/library/${resource.id}`}
            className="text-base font-semibold text-[#0F172A] dark:text-[#E6EDF3] group-hover:text-[#0E7490] dark:group-hover:text-[#22D3EE] transition-colors line-clamp-2"
          >
            {resource.title}
          </Link>
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7] mt-1">
            By <span className="font-medium text-[#0F172A] dark:text-[#E6EDF3]">{resource.creator}</span>
          </p>
        </div>

        {/* Notes */}
        <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-3 leading-relaxed">
          {resource.notes}
        </p>

        {/* HackerSploit specific inactive notice */}
        {resource.notes.includes('Channel inactive') && (
          <div className="p-2 rounded bg-[#FEF3C7] dark:bg-[#2A2000] border border-[#FDE68A] dark:border-[#78350F] text-[11px] text-[#92400E] dark:text-[#FBBF24]">
            Notice: Channel inactive since 2025. Verify commands against current tool documentation.
          </div>
        )}
      </div>

      {/* Footer metadata & actions */}
      <div className="p-4 bg-[#F8FAFC] dark:bg-[#1A2433]/50 border-t border-[#E2E8F0] dark:border-[#243044] flex items-center justify-between gap-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => {}}
            onClick={handleToggleDone}
            className="w-4 h-4 rounded border-[#CBD5E1] dark:border-[#334155] text-[#0E7490] dark:text-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] focus:outline-none"
          />
          <span className="text-[#475569] dark:text-[#9BA8B7]">
            {completed ? 'Completed' : 'Mark done'}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#9BA8B7] hidden sm:inline">
            Checked: {resource.lastChecked}
          </span>
          {resource.url.includes('youtube.com') ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#E2E8F0] dark:bg-[#243044] text-[#0F172A] dark:text-[#E6EDF3] hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors font-medium text-[11px]"
            >
              <Youtube className="w-3.5 h-3.5 text-[#F87171]" />
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          ) : (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#E2E8F0] dark:bg-[#243044] text-[#0F172A] dark:text-[#E6EDF3] hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors font-medium text-[11px]"
            >
              <Layers className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Lab</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

