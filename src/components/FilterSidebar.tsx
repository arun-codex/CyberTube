'use client';

import React from 'react';
import {
  CybersecurityDomain,
  DifficultyLevel,
  DurationRange,
  PricingModel,
  ResourceFilterOptions,
  ResourceType,
} from '../types/resource';
import { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } from '../data/metadata';
import { RotateCcw, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  filters: ResourceFilterOptions;
  onFilterChange: (newFilters: ResourceFilterOptions) => void;
  onReset: () => void;
  facetCounts: {
    typeCounts: Record<string, number>;
    domainCounts: Record<string, number>;
    difficultyCounts: Record<string, number>;
    pricingCounts: Record<string, number>;
    totalCount: number;
  };
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  facetCounts,
}) => {
  const toggleArrayItem = <T extends string>(list: T[] = [], item: T): T[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const handleTypeToggle = (type: ResourceType) => {
    onFilterChange({
      ...filters,
      types: toggleArrayItem(filters.types, type),
    });
  };

  const handleDomainToggle = (domain: CybersecurityDomain) => {
    onFilterChange({
      ...filters,
      domains: toggleArrayItem(filters.domains, domain),
    });
  };

  const handleDifficultyToggle = (diff: DifficultyLevel) => {
    onFilterChange({
      ...filters,
      difficulty: toggleArrayItem(filters.difficulty, diff),
    });
  };

  const handlePricingToggle = (price: PricingModel) => {
    onFilterChange({
      ...filters,
      pricing: toggleArrayItem(filters.pricing, price),
    });
  };

  const handleDurationToggle = (range: DurationRange) => {
    onFilterChange({
      ...filters,
      durationRanges: toggleArrayItem(filters.durationRanges, range),
    });
  };

  const hasActiveFilters = Boolean(
    (filters.types && filters.types.length > 0) ||
      (filters.domains && filters.domains.length > 0) ||
      (filters.difficulty && filters.difficulty.length > 0) ||
      (filters.pricing && filters.pricing.length > 0) ||
      (filters.durationRanges && filters.durationRanges.length > 0) ||
      filters.query
  );

  return (
    <aside className="w-full space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Filter Catalog
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-[11px] font-mono text-cyan-500 hover:text-cyan-400 flex items-center gap-1 hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* 1. Resource Types */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Resource Types
        </h3>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {RESOURCE_TYPES.map((type) => {
            const count = facetCounts.typeCounts[type.id] || 0;
            const checked = filters.types?.includes(type.id) || false;
            return (
              <label
                key={type.id}
                className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-xs cursor-pointer select-none transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleTypeToggle(type.id)}
                    className="rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5"
                  />
                  <span
                    className={
                      checked
                        ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300'
                    }
                  >
                    {type.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Cybersecurity Domains */}
      <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Domains
        </h3>
        <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
          {CYBERSECURITY_DOMAINS.map((domain) => {
            const count = facetCounts.domainCounts[domain.id] || 0;
            const checked = filters.domains?.includes(domain.id) || false;
            return (
              <label
                key={domain.id}
                className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-xs cursor-pointer select-none transition-colors"
              >
                <div className="flex items-center gap-2 truncate max-w-[190px]">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleDomainToggle(domain.id)}
                    className="rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5 shrink-0"
                  />
                  <span
                    className={`truncate ${
                      checked
                        ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {domain.name}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 shrink-0">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Difficulty */}
      <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Difficulty
        </h3>
        <div className="space-y-1">
          {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((diff) => {
            const count = facetCounts.difficultyCounts[diff] || 0;
            const checked = filters.difficulty?.includes(diff) || false;
            return (
              <label
                key={diff}
                className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-xs cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleDifficultyToggle(diff)}
                    className="rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5"
                  />
                  <span
                    className={`capitalize ${
                      checked
                        ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {diff}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Pricing */}
      <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Pricing
        </h3>
        <div className="space-y-1">
          {(['free', 'freemium', 'paid'] as PricingModel[]).map((price) => {
            const count = facetCounts.pricingCounts[price] || 0;
            const checked = filters.pricing?.includes(price) || false;
            return (
              <label
                key={price}
                className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-xs cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handlePricingToggle(price)}
                    className="rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5"
                  />
                  <span
                    className={`capitalize ${
                      checked
                        ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {price}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Duration */}
      <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Duration
        </h3>
        <div className="space-y-1 text-xs">
          {[
            { id: 'under-20', label: '< 20 minutes' },
            { id: '20-60', label: '20 – 60 minutes' },
            { id: 'over-60', label: '> 60 minutes' },
            { id: 'unknown', label: 'Self-paced / Docs' },
          ].map((item) => {
            const checked =
              filters.durationRanges?.includes(item.id as DurationRange) || false;
            return (
              <label
                key={item.id}
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleDurationToggle(item.id as DurationRange)}
                  className="rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5"
                />
                <span
                  className={
                    checked
                      ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300'
                  }
                >
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

