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
    <div className="container-max py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4e4ed] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[4px] bg-[#303055] text-white flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-white stroke-none" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-[#303055]">
              Saved Resources
            </h1>
          </div>
          <p className="text-xs text-[#6b6b7b] mt-1">
            Personal reading list and lab references saved on this device.
          </p>
        </div>

        {savedResources.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-[#e8b5b5] text-[#984e4d] bg-[#fbeaea] hover:bg-[#f8d5d5] text-xs font-mono transition-colors self-start sm:self-auto min-h-[36px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {!isLoaded ? (
        <div className="py-20 text-center font-mono text-xs text-[#6b6b7b]">
          Loading bookmarks...
        </div>
      ) : savedResources.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-[8px] border border-[#e4e4ed] bg-[#f4f4f9] space-y-3">
          <Bookmark className="w-8 h-8 text-[#6b6b7b] mx-auto stroke-1" />
          <h2 className="text-base font-semibold text-[#303055]">No saved resources yet</h2>
          <p className="text-xs text-[#6b6b7b] max-w-sm mx-auto">
            Browse the discovery engine or video courses to bookmark talks and labs for later study.
          </p>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#303055] text-white text-xs font-medium min-h-[44px]"
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
              <Search className="w-4 h-4 text-[#6b6b7b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search saved resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[38px]"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs font-mono rounded-[4px] bg-white border border-[#e4e4ed] text-[#403f53] focus:outline-none focus:border-[#303055] min-h-[38px]"
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
