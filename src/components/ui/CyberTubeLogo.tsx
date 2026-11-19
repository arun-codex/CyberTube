import React from 'react';

interface CyberTubeLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function CyberTubeLogo({
  size = 32,
  className = '',
  showText = false,
}: CyberTubeLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-label="CyberTube Official Logo"
      >
        <title>CyberTube</title>
        <defs>
          <linearGradient id="ctLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="45%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="ctLogoShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#090D14" />
          </linearGradient>
          <linearGradient id="ctLogoPlay" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>
          <filter id="ctLogoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* High-contrast vibrant cyan badge */}
        <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#ctLogoBg)" />
        <rect x="2" y="2" width="60" height="60" rx="15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

        {/* Cyber Defense Shield */}
        <path
          d="M32 9.5 L48 16.5 V29.5 C48 40.5 41.2 49 32 52.5 C22.8 49 16 40.5 16 29.5 V16.5 Z"
          fill="url(#ctLogoShield)"
          filter="url(#ctLogoShadow)"
        />

        {/* Shield inner border accent */}
        <path
          d="M32 12 L46 18 V29.5 C46 39.2 40 46.8 32 50 C24 46.8 18 39.2 18 29.5 V18 Z"
          fill="none"
          stroke="#22D3EE"
          strokeOpacity="0.4"
          strokeWidth="1"
        />

        {/* Tube Media / Play Triangle */}
        <path d="M28 23 L40.5 31.5 L28 40 Z" fill="url(#ctLogoPlay)" />
      </svg>

      {showText && (
        <div className="flex items-baseline gap-1.5">
          <span className="font-sans font-bold text-base tracking-tight text-[var(--text-primary)]">
            CyberTube
          </span>
          <span className="text-[10px] font-mono text-[var(--accent-cyan)] font-semibold uppercase tracking-wider">
            edu
          </span>
        </div>
      )}
    </div>
  );
}
