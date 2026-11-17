import React from 'react';

interface BugBountyLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function BugBountyLogo({ size = 36, className = '', showText = false }: BugBountyLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-label="Bug Bounty Study Library Logo"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#0E7490" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="cyberCyan" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="emeraldAccent" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hex-Shield Border */}
        <path
          d="M24 3L41 10V22C41 32.5 33.7 41.8 24 45C14.3 41.8 7 32.5 7 22V10L24 3Z"
          fill="url(#shieldGrad)"
          fillOpacity="0.18"
          stroke="url(#cyberCyan)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner Security Hex Geometry */}
        <path
          d="M24 7.5L37.5 13.5V22C37.5 30.5 31.8 38 24 40.5C16.2 38 10.5 30.5 10.5 22V13.5L24 7.5Z"
          stroke="url(#cyberCyan)"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="2 2"
        />

        {/* Target Reticle Radar Rings */}
        <circle cx="24" cy="23" r="10" stroke="url(#cyberCyan)" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="24" cy="23" r="5" stroke="url(#emeraldAccent)" strokeWidth="1" strokeOpacity="0.8" />
        <circle cx="24" cy="23" r="1.5" fill="#34D399" filter="url(#neonGlow)" />

        {/* Reticle Crosshair Ticks */}
        <line x1="24" y1="9" x2="24" y2="12" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="34" x2="24" y2="37" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="23" x2="13" y2="23" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="35" y1="23" x2="38" y2="23" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />

        {/* Stylized Bug Bounty Geometry (Beetle / Target Carapace) */}
        {/* Antennae */}
        <path d="M21 16L18 13.5" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M27 16L30 13.5" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />

        {/* Bug Legs */}
        <path d="M16 20L13 19" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M15 24L12 25" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M16 28L13 30" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" />
        
        <path d="M32 20L35 19" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M33 24L36 25" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M32 28L35 30" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" />

        {/* Central Core Shield Bug Body */}
        <path
          d="M24 17C21.5 17 20 18.5 20 21V25C20 27.5 21.8 29.5 24 29.5C26.2 29.5 28 27.5 28 25V21C28 18.5 26.5 17 24 17Z"
          fill="#090D14"
          stroke="url(#emeraldAccent)"
          strokeWidth="1.2"
        />
        <line x1="24" y1="18" x2="24" y2="28" stroke="#34D399" strokeWidth="1" strokeOpacity="0.7" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-space-grotesk font-bold text-sm tracking-tight text-[var(--text-primary)]">
              Bug Bounty
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] font-semibold uppercase tracking-wider border border-[var(--accent-cyan)]/30">
              34 Guides
            </span>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)] -mt-0.5">
            Study Library & Methodologies
          </span>
        </div>
      )}
    </div>
  );
}
