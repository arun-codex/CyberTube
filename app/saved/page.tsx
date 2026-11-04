'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Search,
  Trash2,
  Compass,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { getAllResources } from '../../src/lib/catalog';
import { localSavedService, onSavedChange } from '../../src/lib/saved';
import { Resource, ResourceType } from '../../src/types/resource';
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

  // Filter saved resources
  const savedResources = useMemo(() => {
    return allResources.filter((r) => savedIds.includes(r.id));
  }, [allResources, savedIds]);

  // Apply search and type filter to saved items
  const displayedResources = useMemo(() => {
    return savedResources.filter((r) => {
      // Type filter
      if (selectedType !== 'all' && r.resourceType !== selectedType) {
        return false;
      }
      // Search query
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
    if (window.confirm('Are you sure you want to remove all saved resources from this device?')) {
      savedIds.forEach((id) => localSavedService.remove(id));
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Saved Resources
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Your personal reading, practice, and reference library stored on this device.
          </p>
        </div>

        {savedResources.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 text-xs font-mono transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear all bookmarks</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {!isLoaded ? (
        <div className="py-20 text-center font-mono text-xs text-slate-500">
          Loading saved items...
        </div>
      ) : savedResources.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">
              No saved resources yet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              When exploring the directory or viewing a resource, click the bookmark icon to save
              talks, labs, CTF challenges, and documentation here for quick access.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Resource Catalog</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Populated Saved List */
        <div className="space-y-6">
          {/* Controls: Search & Type Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved items..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-white dark:bg-[#111827] border border-slate-300 dark:border-[#1f293d] text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Type Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedType === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All ({savedResources.length})
              </button>
              {RESOURCE_TYPES.map((t) => {
                const count = savedResources.filter((r) => r.resourceType === t.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      selectedType === t.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          {displayedResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedResources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-xs font-mono text-slate-500">
              No saved items matched your filter or search query.
            </div>
          )}

          {/* Device Local Notice */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-xs text-slate-500 text-center font-mono">
            ℹ Saved bookmarks are persisted in your local browser storage. They do not sync across devices in Phase 1.
          </div>
        </div>
      )}
    </div>
  );
}

