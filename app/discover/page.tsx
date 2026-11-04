'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Compass,
  RotateCcw,
  Sparkles,
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
import { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } from '../../src/data/metadata';

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // All active resources
  const allResources = useMemo(() => getAllResources(), []);

  // Parse filters from URL
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

  // Sync state when URL search params change externally
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

  // Compute filtered results
  const filteredResults = useMemo(() => {
    return filterResources(allResources, filters);
  }, [allResources, filters]);

  // Facet counts computed against all resources
  const facetCounts = useMemo(() => {
    return getFacetCounts(allResources);
  }, [allResources]);

  // Update URL on filter changes
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

  const handleResetFilters = () => {
    const emptyFilters: ResourceFilterOptions = {
      query: '',
      types: [],
      domains: [],
      difficulty: [],
      pricing: [],
      durationRanges: [],
      sortBy: 'relevance',
    };
    setFilters(emptyFilters);
    updateUrl(emptyFilters);
  };

  const removeFilterItem = (category: keyof ResourceFilterOptions, value: string) => {
    if (category === 'query') {
      handleFilterChange({ ...filters, query: '' });
      return;
    }
    const currentList = (filters[category] as string[]) || [];
    const updated = currentList.filter((item) => item !== value);
    handleFilterChange({ ...filters, [category]: updated });
  };

  const activePillsCount =
    (filters.query ? 1 : 0) +
    (filters.types?.length || 0) +
    (filters.domains?.length || 0) +
    (filters.difficulty?.length || 0) +
    (filters.pricing?.length || 0) +
    (filters.durationRanges?.length || 0);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-cyan-400" />
              Resource Discovery Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Search and filter across {allResources.length} verified cybersecurity resources.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="sort-select" className="text-xs font-mono text-slate-400 shrink-0">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy || 'relevance'}
              onChange={(e) =>
                handleFilterChange({ ...filters, sortBy: e.target.value as SortOption })
              }
              className="text-xs font-mono py-1.5 px-3 rounded-lg bg-white dark:bg-[#111827] border border-slate-300 dark:border-[#1f293d] text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="relevance">Relevance</option>
              <option value="recently-added">Recently Added</option>
              <option value="title">Title (A–Z)</option>
              <option value="duration-asc">Shortest Duration</option>
            </select>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#1f293d] bg-white dark:bg-[#111827] text-xs font-mono text-slate-700 dark:text-slate-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Filters ({activePillsCount})</span>
            </button>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="search"
            value={filters.query || ''}
            onChange={(e) => handleFilterChange({ ...filters, query: e.target.value })}
            placeholder="Search keywords, tools (Nmap, Wireshark, Burp), protocols, CVEs, or authors..."
            className="w-full pl-11 pr-10 py-3 text-sm rounded-xl bg-white dark:bg-[#111827] border border-slate-300 dark:border-[#1f293d] text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans shadow-sm"
          />
          {filters.query && (
            <button
              onClick={() => handleFilterChange({ ...filters, query: '' })}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active Filter Pills Bar */}
        {activePillsCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-slate-400">Active filters:</span>

            {filters.query && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Search: &quot;{filters.query}&quot;
                <button
                  onClick={() => removeFilterItem('query', '')}
                  className="hover:text-cyan-200 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.types?.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-200 border border-slate-700"
              >
                Type: {type}
                <button
                  onClick={() => removeFilterItem('types', type)}
                  className="hover:text-rose-400 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.domains?.map((domain) => {
              const domMeta = CYBERSECURITY_DOMAINS.find((d) => d.id === domain);
              return (
                <span
                  key={domain}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-200 border border-slate-700"
                >
                  Domain: {domMeta ? domMeta.name : domain}
                  <button
                    onClick={() => removeFilterItem('domains', domain)}
                    className="hover:text-rose-400 ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}

            {filters.difficulty?.map((diff) => (
              <span
                key={diff}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-200 border border-slate-700"
              >
                Difficulty: {diff}
                <button
                  onClick={() => removeFilterItem('difficulty', diff)}
                  className="hover:text-rose-400 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.pricing?.map((price) => (
              <span
                key={price}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-200 border border-slate-700"
              >
                Price: {price}
                <button
                  onClick={() => removeFilterItem('pricing', price)}
                  className="hover:text-rose-400 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.durationRanges?.map((range) => (
              <span
                key={range}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-200 border border-slate-700"
              >
                Duration: {range}
                <button
                  onClick={() => removeFilterItem('durationRanges', range)}
                  className="hover:text-rose-400 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              onClick={handleResetFilters}
              className="text-xs font-mono text-cyan-500 hover:text-cyan-400 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar + Cards */}
      <div className="flex gap-8 items-start pt-2">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-72 shrink-0 p-4 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] shadow-sm">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            facetCounts={facetCounts}
          />
        </div>

        {/* Results Area */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-slate-200">{filteredResults.length}</strong> of{' '}
              {allResources.length} resources
            </span>
            {filteredResults.length === 0 && (
              <span className="text-amber-500">No matching records</span>
            )}
          </div>

          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResults.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            /* No Results Empty State */
            <div className="text-center py-16 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                  No resources matched your criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try broadening your search term or unchecking some of the active facet filters.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs font-mono transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70 backdrop-blur-sm">
          <div className="relative ml-auto w-full max-w-xs h-full bg-white dark:bg-[#111827] border-l border-slate-200 dark:border-[#1f293d] p-5 overflow-y-auto flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  Filter Catalog
                </h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                facetCounts={facetCounts}
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Show {filteredResults.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs font-mono text-slate-500">
          Loading discovery engine...
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}

