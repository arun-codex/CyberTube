'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Search,
  Trash2,
  Cloud,
  CheckCircle2,
  RefreshCw,
  FileText,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { getAllResources } from '../../src/lib/catalog';
import { localSavedService, onSavedChange, syncSavedWithCloud, getStudySavedItems, getSavedSyncState } from '../../src/lib/saved';
import { StudyBookmarkItem } from '../../src/lib/cloud-saved';
import { ResourceCard } from '../../src/components/ResourceCard';
import { RESOURCE_TYPES } from '../../src/data/metadata';

export default function SavedResourcesPage() {
  const [activeTab, setActiveTab] = useState<'resources' | 'study'>('resources');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [studyBookmarks, setStudyBookmarks] = useState<StudyBookmarkItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState<boolean | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const allResources = useMemo(() => getAllResources(), []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncSavedWithCloud();
    } catch {
      setIsCloudSynced(false);
      setSyncError('Unable to refresh cloud bookmarks. Your local changes are preserved.');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const update = () => {
      const state = getSavedSyncState();
      setSavedIds(state.savedIds);
      setStudyBookmarks(getStudySavedItems().map(item => ({
        ...item, id: `study:${item.documentId}:${item.pageNumber}`,
      })));
      setIsCloudSynced(state.authenticated && state.synced);
      setSyncError(state.error || null);
    };
    update();
    let mounted = true;
    const unsubscribe = onSavedChange(update);
    void syncSavedWithCloud().catch(() => {
      if (mounted) setSyncError('Could not refresh bookmarks. Retry sync to check again.');
    }).finally(() => { if (mounted) setIsLoaded(true); });
    return () => { mounted = false; unsubscribe(); };
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

  const displayedStudyBookmarks = useMemo(() => {
    if (!searchQuery.trim()) return studyBookmarks;
    const q = searchQuery.toLowerCase().trim();
    return studyBookmarks.filter((bm) => {
      const matchesTitle = bm.title?.toLowerCase().includes(q);
      const matchesPage = `page ${bm.pageNumber}`.includes(q);
      return matchesTitle || matchesPage;
    });
  }, [studyBookmarks, searchQuery]);

  const handleClearAll = () => {
    if (window.confirm('Remove all saved resources from this account and device?')) {
      if (typeof localSavedService.clearAll === 'function') {
        localSavedService.clearAll();
      } else {
        savedIds.forEach((id) => localSavedService.remove(id));
      }
      setSavedIds([]);
    }
  };

  return (
    <div className="container-max py-8 space-y-6">
      {syncError && <p role="status" className="text-sm text-amber-700 dark:text-amber-300">{syncError}</p>}
      {/* Header Banner */}
      <div className="rounded-xl border border-border/80 bg-gradient-to-r from-card via-card to-cyan-500/5 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-400">
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Reading List & Bookmarks</span>
              </div>

              {/* Cloud Sync Status Indicator */}
              {isCloudSynced === true ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Cloud Synced</span>
                </span>
              ) : isCloudSynced === false ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-700 dark:text-amber-400">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Saved on this device</span>
                </span>
              ) : null}
            </div>

            <h1 className="font-rajdhani text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Saved Resources
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Personal cybersecurity reading list, lab references, and bookmarked study guide pages synchronized across your devices.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              title="Sync bookmarks with cloud"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-cyan-500/30 bg-background text-xs font-mono text-foreground hover:text-cyan-600 dark:hover:text-cyan-400 min-h-[36px] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-500' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
            </button>

            {savedResources.length > 0 && activeTab === 'resources' && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-xs font-mono transition-colors min-h-[36px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear all ({savedResources.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher: Catalog vs PDF Study Bookmarks */}
        <div className="flex items-center gap-2 border-t border-border/60 pt-4">
          <button
            onClick={() => setActiveTab('resources')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'resources'
                ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Catalog Resources{isLoaded && ` (${savedResources.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('study')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'study'
                ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Study Guide Bookmarks{isLoaded && ` (${studyBookmarks.length})`}</span>
          </button>
        </div>
      </div>

      {!isLoaded ? (
        <div className="space-y-6 animate-pulse py-8" aria-busy="true" aria-label="Loading bookmarks">
          <div className="h-10 w-full max-w-sm rounded-lg bg-[var(--surface-subtle)]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)]" />
            ))}
          </div>
        </div>
      ) : activeTab === 'resources' ? (
        savedResources.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-xl border border-border bg-card space-y-3">
            <Bookmark className="w-8 h-8 text-muted-foreground mx-auto stroke-1" />
            <h2 className="text-base font-semibold font-rajdhani text-foreground">No saved resources yet</h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Browse the discovery engine, labs, or video courses to bookmark talks and references for later study.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent-cyan)] text-[#090D14] text-xs font-semibold min-h-[40px] hover:opacity-90 transition-opacity"
              >
                Browse courses
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium min-h-[40px] transition-colors"
              >
                Explore Discover Catalog
              </Link>
              <Link
                href="/library"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium min-h-[40px] transition-colors"
              >
                Bug Bounty Library
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search saved resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 min-h-[38px] transition-colors"
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 text-xs font-mono rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-cyan-500 min-h-[38px] transition-colors"
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
        )
      ) : (
        /* Study Guide PDF Bookmarks Tab */
        <div className="space-y-6">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search bookmarked pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 min-h-[38px] transition-colors"
            />
          </div>

          {displayedStudyBookmarks.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-xl border border-border bg-card space-y-3">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto stroke-1" />
              <h2 className="text-base font-semibold font-rajdhani text-foreground">No PDF guide bookmarks yet</h2>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                While reading any of the 34 Bug Bounty Study Library PDF documents, click the bookmark icon in the viewer header to save key pages for instant recall.
              </p>
              <div className="pt-2">
                <Link
                  href="/library"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium min-h-[40px] transition-colors"
                >
                  Open Bug Bounty Study Library
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedStudyBookmarks.map((bm) => (
                <Link
                  key={bm.id}
                  href={`/study-materials/bug-bounty/${bm.documentId}?page=${bm.pageNumber}`}
                  className="group block p-4 rounded-xl border border-border hover:border-cyan-500/40 bg-card hover:bg-cyan-500/5 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10">
                        <Bookmark className="w-3 h-3 fill-current" />
                        <span>Page {bm.pageNumber}</span>
                      </div>
                      <h3 className="font-rajdhani text-sm font-semibold text-foreground group-hover:text-cyan-500 transition-colors line-clamp-1">
                        {bm.title || `Document ${bm.documentId.slice(0, 8)}...`}
                      </h3>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        Bookmarked {new Date(bm.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-cyan-500 transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
