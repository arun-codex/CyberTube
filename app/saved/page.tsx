'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Search,
  Trash2,
} from 'lucide-react';
import { getAllResources } from '../../src/lib/catalog';
import { localSavedService, onSavedChange } from '../../src/lib/saved';
import { ResourceCard } from '../../src/components/ResourceCard';
import { RESOURCE_TYPES } from '../../src/data/metadata';

export default function SavedResourcesPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  const allResources = useMemo(() => getAllResources(), []);

  useEffect(() => {
    setSavedIds(localSavedService.getSavedIds());
    setIsLoaded(true);

    const unsub = onSavedChange((ids) => setSavedIds(ids));
    return unsub;
  }, []);

  const savedResources = useMemo(() => {
    return allResources.filter((r) => savedIds.includes(r.id));
  }, [allResources, savedIds]);

  const displayedResources = useMemo(() => {
    return savedResources.filter((r) => {
      if (selectedType !== 'all' && r.resourceType !== selectedType) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesProvider = r.provider.toLowerCase().includes(q);
        const matchesTag = r.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesProvider && !matchesTag) {
          return false;
        }
      }
      return true;
    });
  }, [savedResources, selectedType, searchQuery]);

  const handleClearAll = () => {
    if (window.confirm('Remove all saved resources from this device?')) {
      savedIds.forEach((id) => localSavedService.remove(id));
    }
  };

  return (
    <div className="container-max py-8 space-y-6">
      {/* Header Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Offline Bookmarks</span>
            </div>
            <h1 className="font-rajdhani text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#E6EDF3] tracking-tight">
              Saved Resources
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed max-w-2xl">
              Personal reading list and lab references saved locally on this device.
            </p>
          </div>

          {savedResources.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-[#e8b5b5] dark:border-[#7f1d1d] text-[#984e4d] dark:text-[#f87171] bg-[#fbeaea] dark:bg-[#450a0a]/30 hover:bg-[#f8d5d5] dark:hover:bg-[#7f1d1d]/40 text-xs font-mono transition-colors self-start sm:self-auto min-h-[36px]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all ({savedResources.length})</span>
            </button>
          )}
        </div>
      </div>

      {!isLoaded ? (
        <div className="py-20 text-center font-mono text-xs text-[#64748B] dark:text-[#9BA8B7]">
          Loading bookmarks...
        </div>
      ) : savedResources.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
          <Bookmark className="w-8 h-8 text-[#64748B] dark:text-[#9BA8B7] mx-auto stroke-1" />
          <h2 className="text-base font-semibold font-rajdhani text-[#0F172A] dark:text-[#E6EDF3]">No saved resources yet</h2>
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7] max-w-sm mx-auto">
            Browse the discovery engine or video courses to bookmark talks and labs for later study.
          </p>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#0F172A] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] text-xs font-medium hover:bg-[#1E293B] dark:hover:bg-[#06b6d4] min-h-[40px] transition-colors"
            >
              Explore Discover Catalog
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] dark:text-[#9BA8B7] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search saved resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#0F172A] dark:text-[#E6EDF3] placeholder:text-[#64748B] dark:placeholder:text-[#9BA8B7] focus:outline-none focus:border-[#0E7490] dark:focus:border-[#22D3EE] min-h-[38px] transition-colors"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs font-mono rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] focus:outline-none focus:border-[#0E7490] dark:focus:border-[#22D3EE] min-h-[38px] transition-colors"
            >
              <option value="all">All Formats ({savedResources.length})</option>
              {RESOURCE_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
