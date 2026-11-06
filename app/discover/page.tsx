'use client';

// app/discover/page.tsx
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  Compass,
  Sparkles,
  Clock,
  Flame,
  Cpu,
  Video,
  GitPullRequest,
  ShieldAlert,
  FileText,
  ExternalLink,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import { getAllResources, filterResources, getFacetCounts } from '@/lib/catalog';
import {
  CybersecurityDomain,
  DifficultyLevel,
  DurationRange,
  PricingModel,
  ResourceFilterOptions,
  ResourceType,
  SortOption,
} from '@/types/resource';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ResourceCard } from '@/components/ResourceCard';
import InterestSelector from '@/components/discovery/InterestSelector';
import { FeedItem, CategorySummary } from '@/lib/discovery/discovery-types';

type DiscoverTab =
  | 'for-you'
  | 'latest'
  | 'popular'
  | 'tech-updates'
  | 'videos'
  | 'open-source'
  | 'security-alerts'
  | 'research'
  | 'catalog';

function DiscoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active Tab
  const [activeTab, setActiveTab] = useState<DiscoverTab>(
    (searchParams.get('tab') as DiscoverTab) || 'latest'
  );

  // Discovery Feed state
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [discoveryQuery, setDiscoveryQuery] = useState<string>(
    searchParams.get('q') || ''
  );

  // Existing Resource Directory Catalog State
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

  // 1. Fetch Discovery Categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/discover/categories');
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      } catch (err) {
        // silent fail fallback
      }
    }
    loadCategories();
  }, []);

  // 2. Fetch Feed Items when tab / category / search query changes
  useEffect(() => {
    if (activeTab === 'catalog') return;

    let isMounted = true;
    async function loadFeed() {
      setFeedLoading(true);
      setFeedError(null);

      try {
        const params = new URLSearchParams();
        params.set('tab', activeTab);
        if (selectedCategory) params.set('category', selectedCategory);
        if (discoveryQuery.trim().length >= 2) {
          params.set('q', discoveryQuery.trim());
        }

        const endpoint = discoveryQuery.trim().length >= 2
          ? `/api/discover/search?${params.toString()}`
          : `/api/discover/feed?${params.toString()}`;

        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`Feed request returned HTTP ${res.status}`);
        }
        const data = await res.json();

        if (isMounted) {
          setFeedItems(Array.isArray(data.items) ? data.items : []);
        }
      } catch (err: any) {
        if (isMounted) {
          setFeedError(err.message || 'Failed to load discovery feed.');
        }
      } finally {
        if (isMounted) {
          setFeedLoading(false);
        }
      }
    }

    loadFeed();
    return () => {
      isMounted = false;
    };
  }, [activeTab, selectedCategory, discoveryQuery]);

  // Catalog filtered results
  const filteredResults = useMemo(() => {
    return filterResources(allResources, filters);
  }, [allResources, filters]);

  const facetCounts = useMemo(() => {
    return getFacetCounts(allResources);
  }, [allResources]);

  const handleTabChange = (tab: DiscoverTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`/discover?${params.toString()}`);
  };

  const handleCategorySelect = (categorySlug: string) => {
    const next = selectedCategory === categorySlug ? '' : categorySlug;
    setSelectedCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set('category', next);
    } else {
      params.delete('category');
    }
    router.replace(`/discover?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (discoveryQuery) {
      params.set('q', discoveryQuery);
    } else {
      params.delete('q');
    }
    router.replace(`/discover?${params.toString()}`);
  };

  const handleResetCatalog = () => {
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
    const params = new URLSearchParams();
    params.set('tab', 'catalog');
    router.replace(`/discover?${params.toString()}`);
  };

  const tabs: { id: DiscoverTab; label: string; icon: any }[] = [
    { id: 'for-you', label: 'For You', icon: Sparkles },
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'popular', label: 'Popular', icon: Flame },
    { id: 'tech-updates', label: 'Technology Updates', icon: Cpu },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'open-source', label: 'Open Source', icon: GitPullRequest },
    { id: 'security-alerts', label: 'Security Alerts', icon: ShieldAlert },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'catalog', label: 'Resource Directory', icon: FolderOpen },
  ];

  return (
    <div className="container-max py-8 space-y-6">
      {/* Header Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Compass className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
              <span>CyberTube Discover Engine</span>
            </div>
            <h1 className="font-rajdhani text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#E6EDF3] tracking-tight">
              Discover
            </h1>
            <p className="text-sm text-[#475569] dark:text-[#9BA8B7] max-w-2xl font-mono">
              Continuously curated technology developments, research papers, security advisories, and educational content.
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="pt-2">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#64748B] dark:text-[#9BA8B7]" />
            <input
              type="text"
              value={discoveryQuery}
              onChange={(e) => setDiscoveryQuery(e.target.value)}
              placeholder="Search cybersecurity advisories, AI agents, Linux kernels, architectures..."
              className="w-full pl-10 pr-24 py-2.5 rounded-[6px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-sm text-[#0F172A] dark:text-[#E6EDF3] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#0E7490] dark:focus:border-[#22D3EE] transition-colors"
            />
            {discoveryQuery && (
              <button
                type="button"
                onClick={() => setDiscoveryQuery('')}
                className="absolute right-12 p-1 text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 px-3 py-1.5 rounded-[4px] bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] text-xs font-mono font-medium hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </form>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-3 border-t border-[#e4e4ed] dark:border-[#243044]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] text-xs font-mono whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] border-[#0E7490] dark:border-[#22D3EE] font-medium shadow-xs'
                    : 'bg-white dark:bg-[#1A2433] text-[#475569] dark:text-[#9BA8B7] border-[#e4e4ed] dark:border-[#243044] hover:border-[#0E7490] dark:hover:border-[#22D3EE]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills Navigation */}
      {activeTab !== 'catalog' && categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7] shrink-0">
            Categories:
          </span>
          <button
            type="button"
            onClick={() => handleCategorySelect('')}
            className={`px-2.5 py-1 rounded-[4px] text-xs font-mono border transition-colors ${
              !selectedCategory
                ? 'bg-[#0F172A] dark:bg-[#E6EDF3] text-white dark:text-[#0B1018] border-[#0F172A] dark:border-[#E6EDF3]'
                : 'bg-white dark:bg-[#121A26] text-[#475569] dark:text-[#9BA8B7] border-[#e4e4ed] dark:border-[#243044] hover:border-[#0E7490]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-2.5 py-1 rounded-[4px] text-xs font-mono whitespace-nowrap border transition-colors ${
                  isSelected
                    ? 'bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] border-[#0E7490] dark:border-[#22D3EE]'
                    : 'bg-white dark:bg-[#121A26] text-[#475569] dark:text-[#9BA8B7] border-[#e4e4ed] dark:border-[#243044] hover:border-[#0E7490]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Interest Selector personalization panel */}
      {activeTab !== 'catalog' && (
        <InterestSelector
          onInterestsChange={() => {
            if (activeTab === 'for-you') {
              // Trigger reload
              setSelectedCategory((prev) => prev);
            }
          }}
        />
      )}

      {/* Tab: Catalog (Preserves original Resource Directory) */}
      {activeTab === 'catalog' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-3">
            <div className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetCatalog}
                facetCounts={facetCounts}
              />
            </div>
          </div>

          <div className="lg:col-span-9 space-y-4">
            {filteredResults.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
                <p className="text-sm text-[#475569] dark:text-[#9BA8B7]">
                  No resources match your active filter criteria.
                </p>
                <button
                  onClick={handleResetCatalog}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-[#0F172A] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] hover:bg-[#1E293B] transition-colors"
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
      ) : (
        /* Tab: Discovery Live Feed */
        <div className="space-y-4">
          {feedLoading ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#0E7490] dark:text-[#22D3EE]" />
              <p className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
                Fetching verified technology developments...
              </p>
            </div>
          ) : feedError ? (
            <div className="p-8 text-center rounded-[8px] border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 space-y-2">
              <p className="text-sm font-semibold">Feed Error</p>
              <p className="text-xs font-mono">{feedError}</p>
            </div>
          ) : feedItems.length === 0 ? (
            /* Clear, honest empty state */
            <div className="text-center py-20 px-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
              <Compass className="w-8 h-8 text-[#94A3B8] mx-auto stroke-1" />
              <h3 className="font-rajdhani text-lg font-bold text-[#0F172A] dark:text-[#E6EDF3]">
                {activeTab === 'for-you'
                  ? 'No personalized items yet'
                  : 'No developments found'}
              </h3>
              <p className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7] max-w-md mx-auto">
                {activeTab === 'for-you'
                  ? 'Follow technical topics above to curate your personal technology feed.'
                  : 'No published content currently matches your category or query filter.'}
              </p>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-mono bg-[#0E7490] text-white hover:bg-[#0891B2] transition-colors"
                >
                  Clear category filter
                </button>
              )}
            </div>
          ) : (
            /* Discovery Feed Results */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {feedItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] hover:border-[#0E7490] dark:hover:border-[#22D3EE] transition-colors space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                      <span className="px-2 py-0.5 rounded-[3px] bg-[#f1f5f9] dark:bg-[#1A2433] text-[#0E7490] dark:text-[#22D3EE] font-medium uppercase">
                        {item.content_type}
                      </span>
                      <span>{new Date(item.published_at).toLocaleDateString()}</span>
                    </div>

                    <h4 className="font-rajdhani text-base font-bold text-[#0F172A] dark:text-[#E6EDF3] leading-snug">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-start gap-1"
                      >
                        <span>{item.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1 opacity-60" />
                      </a>
                    </h4>

                    {item.description && (
                      <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#f1f5f9] dark:border-[#1A2433] flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                    <span>{item.source_name || 'Verified Source'}</span>
                    {item.category_name && <span>{item.category_name}</span>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="container-max py-8 space-y-6">
          <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#121A26] p-6 h-40" />
          <div className="h-96 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]" />
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
