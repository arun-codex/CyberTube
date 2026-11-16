'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  RotateCw,
  ArrowLeft,
  Loader2,
  AlertCircle,
  FileText,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface PdfReaderProps {
  documentId: string;
  initialTitle: string;
  initialPage?: number;
}

export function PdfReader({ documentId, initialTitle, initialPage = 1 }: PdfReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [fitToWidth, setFitToWidth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [pageInput, setPageInput] = useState<string>(String(initialPage));

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load PDF Document & Initial Progress
  useEffect(() => {
    let isCancelled = false;

    async function initPdf() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        // Fetch saved progress from Supabase
        let resumePage = initialPage;
        try {
          const res = await fetch(`/api/study-progress?documentId=${documentId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.progress?.last_page && !window.location.search.includes('page=')) {
              resumePage = data.progress.last_page;
            }
            if (Array.isArray(data.bookmarks)) {
              const hasBookmark = data.bookmarks.some((b: any) => b.page_number === resumePage);
              setIsBookmarked(hasBookmark);
            }
          }
        } catch (e) {
          console.warn('Could not fetch saved progress:', e);
        }

        // Dynamically import PDF.js
        const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadingTask = pdfjsLib.getDocument({
          url: `/api/study-materials/${documentId}/pdf`,
          withCredentials: true,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);

        const safePage = Math.min(Math.max(1, resumePage), doc.numPages);
        setCurrentPage(safePage);
        setPageInput(String(safePage));
        setIsLoading(false);
      } catch (err: any) {
        if (!isCancelled) {
          console.error('Failed to load PDF:', err);
          setErrorMessage(err?.message || 'Failed to load PDF document.');
          setIsLoading(false);
        }
      }
    }

    initPdf();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [documentId, initialPage]);

  // Render Current Page onto Canvas
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDocRef.current || !canvasRef.current) return;

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      setIsRendering(true);

      try {
        const page = await pdfDocRef.current.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas) return;

        let activeScale = scale;
        if (fitToWidth && containerRef.current) {
          const containerWidth = containerRef.current.clientWidth - 48; // padding
          const unscaledViewport = page.getViewport({ scale: 1.0 });
          activeScale = Math.max(0.6, containerWidth / unscaledViewport.width);
        }

        const viewport = page.getViewport({ scale: activeScale });
        const context = canvas.getContext('2d');
        if (!context) return;

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          transform: transform,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        setIsRendering(false);
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
        setIsRendering(false);
      }
    },
    [scale, fitToWidth]
  );

  useEffect(() => {
    if (!isLoading && pdfDocRef.current) {
      renderPage(currentPage);
    }
  }, [currentPage, renderPage, isLoading]);

  // Debounced Cloud Sync Progress
  const saveProgressToCloud = useCallback(
    (page: number) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      setSaveStatus('saving');

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch('/api/study-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ documentId, page }),
          });

          if (res.ok) {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);
          } else {
            setSaveStatus('idle');
          }
        } catch (e) {
          console.error('Failed to sync progress:', e);
          setSaveStatus('idle');
        }
      }, 800);
    },
    [documentId]
  );

  // Page Navigation Handlers
  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    setPageInput(String(newPage));
    saveProgressToCloud(newPage);

    // Update bookmark status for newly active page
    fetch(`/api/study-progress?documentId=${documentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.bookmarks)) {
          setIsBookmarked(data.bookmarks.some((b: any) => b.page_number === newPage));
        }
      })
      .catch(() => {});
  };

  const handleNextPage = () => goToPage(currentPage + 1);
  const handlePrevPage = () => goToPage(currentPage - 1);

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      goToPage(parsed);
    } else {
      setPageInput(String(currentPage));
    }
  };

  // Zoom Handlers
  const handleZoomIn = () => {
    setFitToWidth(false);
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setFitToWidth(false);
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleToggleFitToWidth = () => {
    setFitToWidth((prev) => !prev);
  };

  // Fullscreen Handler
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = async () => {
    try {
      const res = await fetch('/api/study-bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId, pageNumber: currentPage }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.bookmarked);
      }
    } catch (e) {
      console.error('Bookmark toggle failed:', e);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const progressPercent = totalPages > 0 ? Math.round((currentPage / totalPages) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-[var(--canvas)] select-none text-[var(--text-primary)] ${
        isFullscreen ? 'fixed inset-0 z-50 p-2 sm:p-4' : 'w-full rounded-xl border border-[var(--border)] overflow-hidden shadow-sm'
      }`}
    >
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[var(--card-bg)] border-b border-[var(--border)]">
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/study-materials"
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1.5 rounded-lg hover:bg-[var(--surface-subtle)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Library</span>
          </Link>
          <div className="h-4 w-px bg-[var(--border)]" />
          <h1 className="text-sm font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {initialTitle}
          </h1>
        </div>

        {/* Center: Page Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || isLoading}
            aria-label="Previous Page"
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1.5 text-xs font-mono">
            <input
              type="text"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={() => setPageInput(String(currentPage))}
              className="w-12 h-8 text-center rounded border border-[var(--border)] bg-[var(--canvas)] font-semibold text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
            />
            <span className="text-[var(--text-muted)]">/ {totalPages}</span>
          </form>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isLoading}
            aria-label="Next Page"
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Right: Zoom, Bookmark, Cloud Sync, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Cloud Sync Status */}
          {saveStatus === 'saving' && (
            <span className="hidden md:flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)]">
              <Loader2 className="w-3 h-3 animate-spin text-[var(--accent-cyan)]" /> Syncing...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="hidden md:flex items-center gap-1 text-[11px] font-mono text-emerald-500 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved to Cloud
            </span>
          )}

          {/* Bookmark Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleBookmark}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Page'}
            className={`h-8 px-2.5 gap-1.5 text-xs ${isBookmarked ? 'text-amber-500 border-amber-500/50' : ''}`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                <span className="hidden lg:inline">Bookmarked</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span className="hidden lg:inline">Bookmark</span>
              </>
            )}
          </Button>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] p-0.5">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              aria-label="Zoom Out"
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-40"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleToggleFitToWidth}
              className={`px-2 py-1 text-[11px] font-mono font-medium rounded ${
                fitToWidth ? 'bg-[var(--accent-cyan)] text-[#090D14]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {fitToWidth ? 'Fit' : `${Math.round(scale * 100)}%`}
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={scale >= 3.0}
              aria-label="Zoom In"
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-40"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="h-8 w-8 p-0"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Reading Progress Indicator Bar */}
      <div className="w-full bg-[var(--border)] h-1">
        <div
          className="bg-[var(--accent-cyan)] h-1 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Canvas PDF Viewer Body */}
      <div className="flex-1 overflow-auto bg-[#1a1d24] flex items-center justify-center p-4 min-h-[600px] relative">
        {isLoading && (
          <div className="flex flex-col items-center gap-3 text-white">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-cyan)]" />
            <p className="text-sm font-medium">Opening secure study material...</p>
          </div>
        )}

        {errorMessage && (
          <div className="flex flex-col items-center gap-3 text-center max-w-md p-6 bg-red-950/40 border border-red-800 rounded-xl text-red-200">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <h3 className="font-bold text-base">Unable to Display Document</h3>
            <p className="text-sm text-red-300">{errorMessage}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RotateCw className="w-4 h-4 mr-2" /> Retry
            </Button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`shadow-2xl rounded-sm transition-opacity duration-200 ${
            isLoading || errorMessage ? 'hidden' : 'block'
          } ${isRendering ? 'opacity-70' : 'opacity-100'}`}
        />
      </div>

      {/* Bottom Footer Information */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--card-bg)] border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span>Progress: <strong className="text-[var(--text-primary)]">{progressPercent}%</strong></span>
          <span>•</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="hidden sm:inline">Use Arrow keys or Page Up/Down to navigate</span>
          {saveStatus === 'saved' && (
            <span className="text-emerald-500 font-medium md:hidden">✓ Synced</span>
          )}
        </div>
      </div>
    </div>
  );
}
