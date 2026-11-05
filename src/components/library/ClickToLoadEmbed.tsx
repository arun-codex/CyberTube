'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, ShieldAlert } from 'lucide-react';

interface ClickToLoadEmbedProps {
  embedUrl: string;
  directUrl: string;
  title: string;
  creator: string;
  type: 'playlist' | 'video' | 'external';
}

export function ClickToLoadEmbed({
  embedUrl,
  directUrl,
  title,
  creator,
  type,
}: ClickToLoadEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (type === 'external') {
    return (
      <div className="bg-[#121A26] border border-[#243044] rounded-xl p-8 text-center text-[#E6EDF3] space-y-4">
        <div className="inline-flex p-3 rounded-full bg-[#1A2433] text-[#22D3EE]">
          <ExternalLink className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold font-space-grotesk">{title}</h3>
        <p className="text-sm text-[#9BA8B7] max-w-md mx-auto">
          This is an interactive platform hosted externally by {creator}. Access hands-on exercises directly on their domain.
        </p>
        <div>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22D3EE] text-[#0B1018] font-semibold text-sm hover:bg-[#67e8f9] transition-colors focus:ring-2 focus:ring-[#22D3EE] focus:outline-none"
          >
            <span>Open {creator} Platform</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#0B1018] border border-[#243044] shadow-lg">
      {!isLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121A26] via-[#0B1018] to-[#1A2433] text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center mb-4 group cursor-pointer hover:scale-105 hover:bg-[#22D3EE]/20 transition-all duration-300"
            onClick={() => setIsLoaded(true)}
            role="button"
            tabIndex={0}
            aria-label={`Load video player for ${title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsLoaded(true);
              }
            }}
          >
            <Play className="w-8 h-8 text-[#22D3EE] fill-[#22D3EE] ml-1" />
          </div>
          <p className="text-xs uppercase font-mono tracking-wider text-[#22D3EE] mb-1">
            Click to load privacy-enhanced player
          </p>
          <h4 className="text-base font-semibold text-[#E6EDF3] max-w-lg mb-2">
            {title}
          </h4>
          <p className="text-xs text-[#9BA8B7] mb-4">
            Curated by <span className="text-[#E6EDF3] font-medium">{creator}</span> • No tracking cookies until activated
          </p>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#9BA8B7] hover:text-[#22D3EE] underline transition-colors"
          >
            <span>Watch directly on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#121A26] text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-[#F87171]" />
          <h4 className="text-base font-semibold text-[#E6EDF3]">Player could not be loaded</h4>
          <p className="text-xs text-[#9BA8B7] max-w-md">
            The video provider may restrict inline frame embedding or browser ad-blocking may have prevented the script.
          </p>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22D3EE] text-[#0B1018] font-semibold text-xs hover:bg-[#67e8f9] transition-colors"
          >
            <span>Open on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

