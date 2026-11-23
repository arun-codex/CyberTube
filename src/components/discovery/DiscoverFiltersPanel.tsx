'use client';

import React from 'react';
import { Filter, RotateCcw, X, Check } from 'lucide-react';
import type { MediaFormat, EditorialKind, Subject } from '@/lib/discovery/content-taxonomy';

export interface DiscoverFilterState {
  type: string;
  kind: string;
  subject: string;
  sort: string;
}

interface DiscoverFiltersPanelProps {
  filters: DiscoverFilterState;
  onChange: (updated: Partial<DiscoverFilterState>) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const mediaFormats: Array<{ id: string; label: string }> = [
  { id: '', label: 'All Formats' },
  { id: 'video', label: 'Videos' },
  { id: 'article', label: 'Articles' },
  { id: 'resource', label: 'Resources & Tools' },
];

const editorialKinds: Array<{ id: string; label: string }> = [
  { id: '', label: 'All Kinds' },
  { id: 'news', label: 'News' },
  { id: 'security_advisory', label: 'Advisories & CVEs' },
  { id: 'tutorial', label: 'Tutorials' },
  { id: 'research', label: 'Research' },
  { id: 'career_guide', label: 'Career Guides' },
  { id: 'tool', label: 'Tools & Utilities' },
  { id: 'learning_resource', label: 'Curated Learning' },
];

const sortOptions = [
  { id: '', label: 'Default Ranking' },
  { id: 'latest', label: 'Latest Published' },
  { id: 'relevant', label: 'Most Relevant' },
];

export function DiscoverFiltersPanel({
  filters,
  onChange,
  onReset,
  isOpen,
  onToggle,
}: DiscoverFiltersPanelProps) {
  const activeCount = [
    filters.type,
    filters.kind,
    filters.sort,
  ].filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden transition-all">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[var(--border)] bg-[var(--surface-subtle)]">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)] hover:text-[var(--accent-cyan)]"
          aria-expanded={isOpen}
        >
          <Filter className="h-4 w-4 text-[var(--accent-cyan)]" />
          <span>Advanced Discovery Filters</span>
          {activeCount > 0 && (
            <span className="rounded-full bg-[var(--accent-cyan)] px-2 py-0.5 text-[10px] font-bold text-[#090D14]">
              {activeCount} active
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--accent-cyan)]"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label={isOpen ? 'Collapse filters' : 'Expand filters'}
          >
            {isOpen ? 'Collapse' : 'Filter feed'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Format Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Media Format
              </label>
              <div className="flex flex-wrap gap-1.5">
                {mediaFormats.map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => onChange({ type: fmt.id })}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors border ${
                      filters.type === fmt.id
                        ? 'bg-[var(--accent-cyan)] text-[#090D14] border-[var(--accent-cyan)] font-semibold'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Kind Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Content Kind
              </label>
              <div className="flex flex-wrap gap-1.5">
                {editorialKinds.map((kind) => (
                  <button
                    key={kind.id}
                    type="button"
                    onClick={() => onChange({ kind: kind.id })}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors border ${
                      filters.kind === kind.id
                        ? 'bg-[var(--accent-cyan)] text-[#090D14] border-[var(--accent-cyan)] font-semibold'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]'
                    }`}
                  >
                    {kind.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Sort Order
              </label>
              <div className="flex flex-wrap gap-1.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange({ sort: opt.id })}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors border ${
                      filters.sort === opt.id
                        ? 'bg-[var(--accent-cyan)] text-[#090D14] border-[var(--accent-cyan)] font-semibold'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
