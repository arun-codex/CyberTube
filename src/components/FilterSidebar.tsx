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
import { RotateCcw } from 'lucide-react';

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
      <div className="flex items-center justify-between pb-3 border-b border-[#e4e4ed] dark:border-[#243044]">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#0F172A] dark:text-[#E6EDF3] font-semibold">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7] hover:text-[#0E7490] dark:hover:text-[#22D3EE] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-medium text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
          Difficulty
        </h3>
        <div className="space-y-1.5">
          {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((diff) => {
            const isChecked = filters.difficulty?.includes(diff);
            const count = facetCounts.difficultyCounts[diff] || 0;
            return (
              <label
                key={diff}
                className="flex items-center justify-between text-xs text-[#475569] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] cursor-pointer py-0.5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleDifficultyToggle(diff)}
                    className="rounded-[3px] border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#1A2433] text-[#0E7490] dark:text-[#22D3EE] focus:ring-0"
                  />
                  <span className="capitalize">{diff}</span>
                </div>
                <span className="font-mono text-[11px] text-[#64748B] dark:text-[#9BA8B7]">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Resource Types */}
      <div className="space-y-2 pt-2 border-t border-[#e4e4ed] dark:border-[#243044]">
        <h3 className="text-xs font-mono font-medium text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
          Format
        </h3>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {RESOURCE_TYPES.map((type) => {
            const isChecked = filters.types?.includes(type.id);
            const count = facetCounts.typeCounts[type.id] || 0;
            return (
              <label
                key={type.id}
                className="flex items-center justify-between text-xs text-[#475569] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] cursor-pointer py-0.5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleTypeToggle(type.id)}
                    className="rounded-[3px] border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#1A2433] text-[#0E7490] dark:text-[#22D3EE] focus:ring-0"
                  />
                  <span>{type.label}</span>
                </div>
                <span className="font-mono text-[11px] text-[#64748B] dark:text-[#9BA8B7]">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Domains */}
      <div className="space-y-2 pt-2 border-t border-[#e4e4ed] dark:border-[#243044]">
        <h3 className="text-xs font-mono font-medium text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
          Domain
        </h3>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {CYBERSECURITY_DOMAINS.map((domain) => {
            const isChecked = filters.domains?.includes(domain.id);
            const count = facetCounts.domainCounts[domain.id] || 0;
            return (
              <label
                key={domain.id}
                className="flex items-center justify-between text-xs text-[#475569] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] cursor-pointer py-0.5 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleDomainToggle(domain.id)}
                    className="rounded-[3px] border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#1A2433] text-[#0E7490] dark:text-[#22D3EE] focus:ring-0 shrink-0"
                  />
                  <span className="truncate">{domain.name}</span>
                </div>
                <span className="font-mono text-[11px] text-[#64748B] dark:text-[#9BA8B7] shrink-0">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-2 pt-2 border-t border-[#e4e4ed] dark:border-[#243044]">
        <h3 className="text-xs font-mono font-medium text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
          Pricing
        </h3>
        <div className="space-y-1.5">
          {(['free', 'freemium', 'paid'] as PricingModel[]).map((price) => {
            const isChecked = filters.pricing?.includes(price);
            const count = facetCounts.pricingCounts[price] || 0;
            return (
              <label
                key={price}
                className="flex items-center justify-between text-xs text-[#475569] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] cursor-pointer py-0.5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handlePricingToggle(price)}
                    className="rounded-[3px] border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#1A2433] text-[#0E7490] dark:text-[#22D3EE] focus:ring-0"
                  />
                  <span className="capitalize">{price}</span>
                </div>
                <span className="font-mono text-[11px] text-[#64748B] dark:text-[#9BA8B7]">{count}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
