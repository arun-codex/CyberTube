import React from 'react';

/**
 * Reusable responsive YouTube embed player.
 * Accepts a validated YouTube video ID (11‑character string).
 * Renders an iframe using the official embed URL.
 * No autoplay – controls are enabled, branding remains.
 * The iframe is accessible via a descriptive title.
 */
interface YouTubePlayerProps {
  /** 11‑character YouTube video identifier */
  videoId: string;
  /** Optional title displayed for screen‑readers */
  title?: string;
  /** Optional channel name for UI display (not required for the iframe) */
  channelName?: string;
}

/** Simple regex to validate a YouTube video ID (letters, numbers, hyphen, underscore). */
const YT_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title, channelName }) => {
  if (!YT_ID_REGEX.test(videoId)) {
    return (
      <div className="p-4 bg-amber-100 border border-amber-300 rounded text-amber-800 text-sm">
        Invalid YouTube video identifier.
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
  const ariaTitle = title ? `${title} – YouTube video` : 'YouTube video player';

  return (
    <div className="w-full">
      {/* 16:9 responsive wrapper */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={ariaTitle}
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
      {/* Optional credit line */}
      {channelName && (
        <div className="mt-2 text-xs text-slate-500">
          Video from <span className="font-medium">{channelName}</span>{' '}
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-cyan-600 hover:text-cyan-500"
          >
            View on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

