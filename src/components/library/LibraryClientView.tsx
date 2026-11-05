'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, BookOpen, Layers } from 'lucide-react';
import { Resource } from '@/types/catalog';
import { LibraryCard } from '@/components/library/LibraryCard';

interface LibraryClientViewProps {
  initialResources: Resource[];
}

export function LibraryClientView({ initialResources }: LibraryClientViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [trackFilter, setTrackFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [costFilter, setCostFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'level' | 'creator'>('title');

  // Extract unique tracks
  const tracks = useMemo(() => {
    const list = Array.from(new Set(initialResources.map((r) => r.track)));
    return ['all', ...list];
  }, [initialResources]);

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    return initialResources
      .filter((resource) => {
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = resource.title.toLowerCase().includes(q);
          const matchesCreator = resource.creator.toLowerCase().includes(q);
          const matchesNotes = resource.notes.toLowerCase().includes(q);
          const matchesTrack = resource.track.toLowerCase().includes(q);
          if (!matchesTitle && !matchesCreator && !matchesNotes && !matchesTrack) {
            return false;
          }
        }

        // Level filter
        if (levelFilter !== 'all' && resource.level.toLowerCase() !== levelFilter.toLowerCase()) {
          return false;
        }

        // Track filter
        if (trackFilter !== 'all' && resource.track.toLowerCase() !== trackFilter.toLowerCase()) {
          return false;
        }

        // Type filter
        if (typeFilter !== 'all' && resource.type.toLowerCase() !== typeFilter.toLowerCase()) {
          return false;
        }

        // Cost filter
        if (costFilter !== 'all' && resource.cost.toLowerCase() !== costFilter.toLowerCase()) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'creator') {
          return a.creator.localeCompare(b.creator);
        }
        if (sortBy === 'level') {
          return a.level.localeCompare(b.level);
        }
        return 0;
      });
  }, [initialResources, searchQuery, levelFilter, trackFilter, typeFilter, costFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-4 sm:p-5 shadow-sm space-y-4">
        {/* Search row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#9BA8B7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, instructor, protocol, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] text-[#0F172A] dark:text-[#E6EDF3] placeholder-[#9BA8B7] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#475569] dark:text-[#9BA8B7] whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] text-[#0F172A] dark:text-[#E6EDF3] focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
            >
              <option value="title">Title (A–Z)</option>
              <option value="creator">Creator Name</option>
              <option value="level">Difficulty Level</option>
            </select>
          </div>
        </div>

        {/* Filter chips row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#E2E8F0] dark:border-[#243044]">
          {/* Level Filter */}
          <div>
            <label className="block text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7] mb-1">
              Difficulty
            </label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] text-[#0F172A] dark:text-[#E6EDF3] focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="beginner-intermediate">Beginner-Intermediate</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all levels">All Levels (Comprehensive)</option>
            </select>
          </div>

          {/* Track Filter */}
          <div>
            <label className="block text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7] mb-1">
              Topic Track
            </label>
            <select
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] text-[#0F172A] dark:text-[#E6EDF3] focus:outline-none focus:ring-1 focus:ring-[#22D3EE] capitalize"
            >
              {tracks.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Tracks' : t}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7] mb-1">
              Resource Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] text-[#0F172A] dark:text-[#E6EDF3] focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
            >
              <option value="all">All Types</option>
              <option value="playlist">YouTube Playlist</option>
              <option value="video">Single Video</option>
              <option value="lab">Interactive Lab</option>
            </select>
          </div>

          {/* Cost Filter */}
          <div>
            <label className="block text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7] mb-1">
              Pricing Model
            </label>
            <select
              value={costFilter}
              onChange={(e) => setCostFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] text-[#0F172A] dark:text-[#E6EDF3] focus:outline-none focus:ring-1 focus:ring-[#22D3EE]"
            >
              <option value="all">All Pricing</option>
              <option value="free">100% Free</option>
              <option value="free-and-paid">Free Tier + Paid Premium</option>
            </select>
          </div>
        </div>

        {/* Counter status */}
        <div className="flex items-center justify-between text-xs text-[#475569] dark:text-[#9BA8B7] pt-2">
          <span>
            Showing <strong className="text-[#0F172A] dark:text-[#E6EDF3]">{filteredResources.length}</strong> of{' '}
            <strong className="text-[#0F172A] dark:text-[#E6EDF3]">{initialResources.length}</strong> verified learning resources
          </span>
          {(searchQuery || levelFilter !== 'all' || trackFilter !== 'all' || typeFilter !== 'all' || costFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setLevelFilter('all');
                setTrackFilter('all');
                setTypeFilter('all');
                setCostFilter('all');
              }}
              className="text-[#0E7490] dark:text-[#22D3EE] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((resource) => (
            <LibraryCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-[#9BA8B7] mx-auto opacity-50" />
          <h4 className="text-base font-semibold text-[#0F172A] dark:text-[#E6EDF3]">No resources found</h4>
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7] max-w-sm mx-auto">
            Try adjusting your search query or loosening your difficulty and track filters.
          </p>
        </div>
      )}
    </div>
  );
}

