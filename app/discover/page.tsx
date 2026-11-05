'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  Compass,
} from 'lucide-react';
import { getAllResources, filterResources, getFacetCounts } from '../../src/lib/catalog';
import {
  CybersecurityDomain,
  DifficultyLevel,
  DurationRange,
  PricingModel,
  ResourceFilterOptions,
  ResourceType,
  SortOption,
} from '../../src/types/resource';
import { FilterSidebar } from '../../src/components/FilterSidebar';
import { ResourceCard } from '../../src/components/ResourceCard';

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allResources = useMemo(() => getAllResources(), []);

  const [filters, setFilters] = useState<ResourceFilterOptions>({
    query: searchParams.get('q') || '',
    types: (searchParams.getAll('type') as ResourceType[]) || [],
    domains: (searchParams.getAll('domain') as CybersecurityDomain[]) || [],
    difficulty: (searchParams.getAll('difficulty') as DifficultyLevel[]) || [],
    pricing: (searchParams.getAll('pricing') as PricingModel[]) || [],
    durationRanges: (searchParams.getAll('duration') as DurationRange[]) || [],
    sortBy: (searchParams.get('sort') as SortOption) || 'relevance',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setFilters({
      query: searchParams.get('q') || '',
      types: (searchParams.getAll('type') as ResourceType[]) || [],
      domains: (searchParams.getAll('domain') as CybersecurityDomain[]) || [],
      difficulty: (searchParams.getAll('difficulty') as DifficultyLevel[]) || [],
      pricing: (searchParams.getAll('pricing') as PricingModel[]) || [],
      durationRanges: (searchParams.getAll('duration') as DurationRange[]) || [],
      sortBy: (searchParams.get('sort') as SortOption) || 'relevance',
    });
  }, [searchParams]);

  const filteredResults = useMemo(() => {
    return filterResources(allResources, filters);
  }, [allResources, filters]);

  const facetCounts = useMemo(() => {
    return getFacetCounts(allResources);
  }, [allResources]);

  const updateUrl = (newFilters: ResourceFilterOptions) => {
    const params = new URLSearchParams();
    if (newFilters.query) params.set('q', newFilters.query);
    if (newFilters.types && newFilters.types.length > 0) {
      newFilters.types.forEach((t) => params.append('type', t));
    }
    if (newFilters.domains && newFilters.domains.length > 0) {
      newFilters.domains.forEach((d) => params.append('domain', d));
    }
    if (newFilters.difficulty && newFilters.difficulty.length > 0) {
      newFilters.difficulty.forEach((d) => params.append('difficulty', d));
    }
    if (newFilters.pricing && newFilters.pricing.length > 0) {
      newFilters.pricing.forEach((p) => params.append('pricing', p));
    }
    if (newFilters.durationRanges && newFilters.durationRanges.length > 0) {
      newFilters.durationRanges.forEach((dur) => params.append('duration', dur));
    }
    if (newFilters.sortBy && newFilters.sortBy !== 'relevance') {
      params.set('sort', newFilters.sortBy);
    }

    const queryString = params.toString();
    router.replace(queryString ? `/discover?${queryString}` : '/discover');
  };

  const handleFilterChange = (newFilters: ResourceFilterOptions) => {
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(filters);
  };

  const handleReset = () => {
    const resetFilters: ResourceFilterOptions = {
      query: '',
      types: [],
      domains: [],
      difficulty: [],
      pricing: [],
      durationRanges: [],
      sortBy: 'relevance',
    };
    setFilters(resetFilters);
    updateUrl(resetFilters);
  };

  return (
    <div className="container-max py-8 space-y-6">
      {/* Search Header */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Compass className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
              <span>Discovery Engine</span>
            </div>
            <h1 className="font-rajdhani text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#E6EDF3] tracking-tight">
              Resource Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed max-w-2xl">
              Filter through verified technical cybersecurity publications, practice labs, and references.
            </p>
          </div>
          <span className="font-mono text-xs text-[#64748B] dark:text-[#9BA8B7] self-start sm:self-auto px-2.5 py-1 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044]">
            {filteredResults.length} / {allResources.length} items
          </span>
        </div>

        {/* Search input & Sort */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] dark:text-[#9BA8B7] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="Search by vulnerability, tool, protocol, or provider..."
              className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-[#0F172A] dark:text-[#E6EDF3] placeholder:text-[#64748B] dark:placeholder:text-[#9BA8B7] focus:outline-none focus:border-[#0E7490] dark:focus:border-[#22D3EE] min-h-[38px] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              aria-label="Sort resources"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value as SortOption })}
              className="px-3 py-2 text-xs font-mono rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] focus:outline-none focus:border-[#0E7490] dark:focus:border-[#22D3EE] min-h-[38px] transition-colors"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="newest">Sort: Newest</option>
              <option value="popular">Sort: Popular</option>
            </select>

            {/* Mobile Filter toggle button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0F172A] dark:text-[#E6EDF3] min-h-[38px] hover:border-[#0E7490] dark:hover:border-[#22D3EE] transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
              <span>Filters</span>
            </button>
          </div>
        </form>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Desktop 3): Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              facetCounts={facetCounts}
            />
          </div>
        </div>

        {/* Right Column (Desktop 9 / Mobile full): Results Grid */}
        <div className="lg:col-span-9 space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
              <p className="text-sm text-[#475569] dark:text-[#9BA8B7]">
                No resources match your active filter criteria.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-[#0F172A] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] hover:bg-[#1E293B] dark:hover:bg-[#06b6d4] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredResults.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="relative w-full max-w-xs bg-white dark:bg-[#121A26] border-l border-[#e4e4ed] dark:border-[#243044] h-full ml-auto p-5 overflow-y-auto space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e4ed] dark:border-[#243044]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0F172A] dark:text-[#E6EDF3] font-semibold">
                Filter Catalog
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded text-[#64748B] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onFilterChange={(f) => {
                handleFilterChange(f);
              }}
              onReset={handleReset}
              facetCounts={facetCounts}
            />

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 rounded-[4px] bg-[#0F172A] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] text-xs font-medium hover:bg-[#1E293B] dark:hover:bg-[#06b6d4] transition-colors"
            >
              Apply & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={
      <div className="container-max py-8 space-y-6">
        <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#121A26] p-5 sm:p-6 h-36" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-3 h-96 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]" />
          <div className="lg:col-span-9 h-96 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]" />
        </div>
      </div>
    }>
      <DiscoverContent />
    </Suspense>
  );
}
