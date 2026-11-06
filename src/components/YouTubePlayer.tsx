'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, CheckCircle2, Clock } from 'lucide-react';
import {
  getVideoProgressRecord,
  saveVideoProgressRecord,
} from '../lib/progress/progress-storage';
import {
  calculateVideoProgress,
  formatSecondsToTime,
  formatPlaybackRatio,
} from '../lib/progress/video-progress';
import { UserVideoProgress } from '../types/course';
import { cloudCourseProgressService } from '../lib/cloud-course-progress';

export interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  channelName?: string;
  courseId?: string;
  moduleId?: string;
  lessonId?: string;
  initialTimeSeconds?: number;
  onProgress?: (currentTime: number, duration: number, isCompleted: boolean) => void;
  onEnded?: () => void;
}

const YT_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

// Global singleton promise for YouTube IFrame API script loading
let ytApiPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).YT && (window as any).YT.Player) {
    return Promise.resolve();
  }

  if (ytApiPromise) {
    return ytApiPromise;
  }

  ytApiPromise = new Promise<void>((resolve) => {
    const existingScript = document.getElementById('youtube-iframe-api');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const previousCallback = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === 'function') {
        previousCallback();
      }
      resolve();
    };

    // Safety timeout in case API script fails to trigger callback
    setTimeout(() => {
      if ((window as any).YT && (window as any).YT.Player) {
        resolve();
      }
    }, 3000);
  });

  return ytApiPromise;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
  channelName,
  courseId,
  moduleId,
  lessonId,
  initialTimeSeconds,
  onProgress,
  onEnded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const playerIdRef = useRef<string>(`yt-player-${Math.random().toString(36).substring(2, 9)}`);

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [hasResumeOption, setHasResumeOption] = useState<boolean>(false);
  const [savedResumeSeconds, setSavedResumeSeconds] = useState<number>(0);

  // Active progress reference for unmount/exit flushing
  const latestProgressRef = useRef<{ current: number; duration: number; completed: boolean }>({
    current: 0,
    duration: 0,
    completed: false,
  });

  const isValidId = YT_ID_REGEX.test(videoId);

  // Load existing progress record
  useEffect(() => {
    if (!isValidId) return;

    let resumeTime = initialTimeSeconds || 0;
    if (courseId && lessonId) {
      const saved = getVideoProgressRecord(courseId, lessonId, videoId);
      if (saved) {
        resumeTime = Math.max(resumeTime, saved.lastWatchedSeconds || 0);
        setIsCompleted(saved.isCompleted || false);
        setCompletionPercentage(saved.completionPercentage || 0);
        if (saved.durationSeconds) {
          setDurationSeconds(saved.durationSeconds);
        }
      }
    }

    if (resumeTime > 5 && !isCompleted) {
      setSavedResumeSeconds(resumeTime);
      setHasResumeOption(true);
    } else {
      setHasResumeOption(false);
    }
  }, [videoId, courseId, lessonId, initialTimeSeconds, isValidId, isCompleted]);

  // Save progress helper
  const flushCurrentProgress = useCallback(
    (forceCompleted = false) => {
      if (!courseId || !lessonId || !isValidId) return;

      const player = playerRef.current;
      let curr = latestProgressRef.current.current;
      let dur = latestProgressRef.current.duration;

      if (player && typeof player.getCurrentTime === 'function') {
        try {
          const pt = player.getCurrentTime();
          const pd = player.getDuration();
          if (pt !== undefined && !isNaN(pt)) curr = pt;
          if (pd !== undefined && !isNaN(pd) && pd > 0) dur = pd;
        } catch {
          // Player destroyed or not ready
        }
      }

      if (dur <= 0) return;

      const existing = getVideoProgressRecord(courseId, lessonId, videoId);
      const updated = calculateVideoProgress(
        existing,
        courseId,
        lessonId,
        videoId,
        curr,
        dur,
        moduleId,
        forceCompleted
      );

      latestProgressRef.current = {
        current: updated.lastWatchedSeconds,
        duration: updated.durationSeconds,
        completed: updated.isCompleted,
      };

      setCurrentSeconds(updated.lastWatchedSeconds);
      setDurationSeconds(updated.durationSeconds);
      setIsCompleted(updated.isCompleted);
      setCompletionPercentage(updated.completionPercentage);

      // Persist to storage and Supabase
      saveVideoProgressRecord(updated);
      cloudCourseProgressService.recordVideoProgress?.(updated);

      onProgress?.(updated.lastWatchedSeconds, updated.durationSeconds, updated.isCompleted);
    },
    [courseId, lessonId, videoId, moduleId, isValidId, onProgress]
  );

  // Resume playback action
  const handleResume = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      try {
        playerRef.current.seekTo(savedResumeSeconds, true);
        playerRef.current.playVideo();
      } catch (err) {
        console.warn('Could not seek player:', err);
      }
    }
    setHasResumeOption(false);
  }, [savedResumeSeconds]);

  // Restart video from 0:00
  const handleRestart = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      try {
        playerRef.current.seekTo(0, true);
        playerRef.current.playVideo();
      } catch (err) {
        console.warn('Could not restart player:', err);
      }
    }
    setHasResumeOption(false);
    setCurrentSeconds(0);
    latestProgressRef.current.current = 0;
    flushCurrentProgress(false);
  }, [flushCurrentProgress]);

  // Initialize YouTube Player API
  useEffect(() => {
    if (!isValidId) return;

    let isMounted = true;
    let localPlayer: any = null;

    loadYouTubeIframeApi().then(() => {
      if (!isMounted || !containerRef.current) return;
      const YT = (window as any).YT;
      if (!YT || !YT.Player) return;

      try {
        localPlayer = new YT.Player(playerIdRef.current, {
          videoId,
          playerVars: {
            enablejsapi: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : undefined,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              playerRef.current = event.target;
              setIsPlayerReady(true);

              try {
                const dur = event.target.getDuration();
                if (dur && !isNaN(dur) && dur > 0) {
                  setDurationSeconds(dur);
                  latestProgressRef.current.duration = dur;
                }
              } catch {}
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              const state = event.data;

              // PLAYING (1)
              if (state === 1) {
                setHasResumeOption(false);
                if (timerRef.current) clearInterval(timerRef.current);
                timerRef.current = setInterval(() => {
                  try {
                    const pt = event.target.getCurrentTime();
                    const pd = event.target.getDuration();
                    if (pt !== undefined && !isNaN(pt)) {
                      setCurrentSeconds(pt);
                      latestProgressRef.current.current = pt;
                    }
                    if (pd !== undefined && !isNaN(pd) && pd > 0) {
                      setDurationSeconds(pd);
                      latestProgressRef.current.duration = pd;
                    }
                    // Autosave every interval
                    flushCurrentProgress(false);
                  } catch {}
                }, 5000);
              }
              // PAUSED (2)
              else if (state === 2) {
                if (timerRef.current) clearInterval(timerRef.current);
                flushCurrentProgress(false);
              }
              // ENDED (0)
              else if (state === 0) {
                if (timerRef.current) clearInterval(timerRef.current);
                flushCurrentProgress(true);
                onEnded?.();
              }
            },
          },
        });
      } catch (err) {
        console.warn('Failed to initialize YouTube IFrame Player API:', err);
      }
    });

    return () => {
      isMounted = false;
      if (timerRef.current) clearInterval(timerRef.current);
      flushCurrentProgress(false);
      try {
        if (localPlayer && typeof localPlayer.destroy === 'function') {
          localPlayer.destroy();
        }
      } catch {}
      playerRef.current = null;
    };
  }, [videoId, isValidId, flushCurrentProgress, onEnded]);

  // Lifecycle listeners: tab hidden (visibilitychange) and beforeunload
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushCurrentProgress(false);
      }
    };

    const handleBeforeUnload = () => {
      flushCurrentProgress(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [flushCurrentProgress]);

  if (!isValidId) {
    return (
      <div className="p-4 bg-[#fbeaea] dark:bg-[#7f1d1d]/20 border border-[#e8b5b5] dark:border-[#991b1b] rounded-[4px] text-[#984e4d] dark:text-[#f87171] text-xs font-mono">
        Invalid YouTube video identifier.
      </div>
    );
  }

  const ariaTitle = title ? `${title} – YouTube video` : 'YouTube video player';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0${
    typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : ''
  }`;

  return (
    <div className="w-full space-y-2.5" data-testid="youtube-player">
      {/* Resume Option Banner */}
      {hasResumeOption && savedResumeSeconds > 5 && (
        <div
          data-testid="resume-banner"
          className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-[6px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 border border-[#0E7490]/30 dark:border-[#22D3EE]/30 text-xs font-mono text-[#0E7490] dark:text-[#22D3EE]"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              Resume playback from <strong>{formatSecondsToTime(savedResumeSeconds)}</strong>?
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="resume-playback-btn"
              onClick={handleResume}
              className="px-2.5 py-1 rounded-[4px] bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] font-medium hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              Resume
            </button>
            <button
              type="button"
              data-testid="restart-playback-btn"
              onClick={handleRestart}
              className="px-2 py-1 rounded-[4px] bg-white dark:bg-[#121A26] border border-[#e4e4ed] dark:border-[#243044] text-[#64748B] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Start at 0:00
            </button>
          </div>
        </div>
      )}

      {/* 16:9 Responsive Player Wrapper */}
      <div
        ref={containerRef}
        className="relative w-full rounded-[8px] overflow-hidden border border-[#e4e4ed] dark:border-[#243044] bg-[#141424]"
        style={{ paddingBottom: '56.25%' }}
      >
        <div id={playerIdRef.current} className="absolute top-0 left-0 w-full h-full">
          <iframe
            src={embedUrl}
            title={ariaTitle}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* Watch Status & Controls Bar */}
      <div className="text-xs font-mono text-[#6b6b7b] dark:text-[#9BA8B7] flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#e4e4ed]/60 dark:border-[#243044]/60">
        <div className="flex items-center gap-3">
          {channelName ? (
            <span>
              Source: <strong className="text-[#303055] dark:text-[#E6EDF3] font-medium">{channelName}</strong>
            </span>
          ) : (
            <span>YouTube Video</span>
          )}

          {/* Time and Progress Details */}
          {(currentSeconds > 0 || durationSeconds > 0) && (
            <span data-testid="video-playback-time" className="flex items-center gap-1 text-[#0E7490] dark:text-[#22D3EE]">
              <Clock className="w-3 h-3" />
              {formatPlaybackRatio(currentSeconds, durationSeconds)} ({completionPercentage}%)
            </span>
          )}

          {isCompleted && (
            <span data-testid="video-watched-badge" className="inline-flex items-center gap-1 text-[#059669] dark:text-[#34D399] font-medium">
              <CheckCircle2 className="w-3 h-3" />
              Watched
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {currentSeconds > 5 && (
            <button
              type="button"
              onClick={handleRestart}
              className="hover:text-[#303055] dark:hover:text-[#E6EDF3] flex items-center gap-1 cursor-pointer transition-colors"
              title="Restart video from 0:00"
            >
              <RotateCcw className="w-3 h-3" />
              Restart
            </button>
          )}

          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#303055] dark:hover:text-[#22D3EE] underline transition-colors"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};
