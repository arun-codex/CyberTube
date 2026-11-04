import React from 'react';

/**
 * Reusable responsive YouTube embed player.
 * Accepts a validated YouTube video ID (11-character string).
 * Renders an iframe using the official embed URL.
 * 16:9 responsive wrapper with clean SST-inspired border.
 */
interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  channelName?: string;
}

const YT_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title, channelName }) => {
  if (!YT_ID_REGEX.test(videoId)) {
    return (
      <div className="p-4 bg-[#fbeaea] border border-[#e8b5b5] rounded-[4px] text-[#984e4d] text-xs font-mono">
        Invalid YouTube video identifier.
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
  const ariaTitle = title ? `${title} – YouTube video` : 'YouTube video player';

  return (
    <div className="w-full">
      <div className="relative w-full rounded-[8px] overflow-hidden border border-[#e4e4ed] bg-[#141424]" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={ariaTitle}
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
      {channelName && (
        <div className="mt-2 text-xs font-mono text-[#767682] flex items-center justify-between">
          <span>Source: <strong className="text-[#303055] font-medium">{channelName}</strong></span>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#303055] underline transition-colors"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};
