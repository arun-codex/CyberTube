import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'CyberTube Typography System Preview',
  description: 'Visual reference and multi-font typography verification for Orbitron, Rajdhani, Rubik, IBM Plex Mono, and Cyberpunk.',
};

export default function TypographyPreviewPage() {
  return (
    <div className="container-max py-12 space-y-12">
      {/* Overview Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] bg-[#f4f4f9] p-6 sm:p-8 space-y-3">
        <div className="font-mono text-xs uppercase tracking-wider text-[#767682]">
          Design System & Spec
        </div>
        <h1 className="font-orbitron text-2xl sm:text-3xl font-bold text-[#303055]">
          CyberTube Multi-Font Typography System
        </h1>
        <p className="text-sm text-[#403f53] max-w-2xl leading-relaxed">
          Integrated Next.js 14 font optimization showcase verifying Orbitron, Rajdhani, Rubik, IBM Plex Mono, and the local Cyberpunk font across sizes, weights, and SST tokens.
        </p>
        <Link
          href="/"
          className="inline-block text-xs font-mono text-[#303055] hover:underline pt-2"
        >
          ← Return to CyberTube Home
        </Link>
      </div>

      {/* 1. Orbitron */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#767682]">Font 1 — Primary Display</span>
            <h2 className="font-orbitron text-xl font-bold text-[#303055]">Orbitron</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 500, 600, 700
          </span>
        </div>
        <p className="text-xs text-[#767682]">
          Assigned to: Brand wordmark, homepage hero title, major milestones.
        </p>

        <div className="space-y-4">
          <div>
            <span className="font-mono text-[10px] text-[#767682]">42px Bold (700)</span>
            <div className="font-orbitron font-bold text-3xl sm:text-4xl text-[#303055]">
              CYBERTUBE SECURE PROTOCOL
            </div>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#767682]">28px SemiBold (600)</span>
            <div className="font-orbitron font-semibold text-2xl sm:text-3xl text-[#303055]">
              Threat Surface & Offensive Matrix
            </div>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#767682]">18px Medium (500)</span>
            <div className="font-orbitron font-medium text-lg text-[#303055]">
              Decentralized Intelligence Network Verification
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rajdhani */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#767682]">Font 2 — Technical Display</span>
            <h2 className="font-rajdhani text-2xl font-bold text-[#303055]">Rajdhani</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 500, 600, 700
          </span>
        </div>
        <p className="text-xs text-[#767682]">
          Assigned to: Course titles, domain headings, dashboard metrics, compact section titles.
        </p>

        <div className="space-y-4">
          <div>
            <span className="font-mono text-[10px] text-[#767682]">32px Bold (700)</span>
            <div className="font-rajdhani font-bold text-3xl text-[#303055]">
              Network Packet Analysis & Dissection Masterclass
            </div>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#767682]">24px SemiBold (600)</span>
            <div className="font-rajdhani font-semibold text-2xl text-[#303055]">
              Hardware Backdoors & CPU Ring-0 Kernel Internals
            </div>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#767682]">18px Medium (500)</span>
            <div className="font-rajdhani font-medium text-lg text-[#303055]">
              SOC Blue Team • Reverse Engineering • Cryptographic Hash Verification
            </div>
          </div>
        </div>
      </section>

      {/* 3. Rubik */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#767682]">Font 3 — Primary UI & Body</span>
            <h2 className="text-xl font-semibold text-[#303055]">Rubik</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 400, 500, 600, 700
          </span>
        </div>
        <p className="text-xs text-[#767682]">
          Assigned to: Body copy, navigation links, form inputs, buttons, instructional prose.
        </p>

        <div className="space-y-4">
          <div>
            <span className="font-mono text-[10px] text-[#767682]">16px Regular (400) Body Paragraph</span>
            <p className="text-base text-[#403f53] leading-relaxed max-w-3xl">
              CyberTube provides comprehensive, verifiable developer education. All concepts are demonstrated on live packet captures, real network traces, and open-source threat analysis frameworks with zero commercial obfuscation.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-4 py-2 rounded-[4px] bg-[#303055] text-white text-xs font-medium min-h-[38px]"
            >
              Rubik Medium (500) Button
            </button>
            <span className="text-xs font-semibold text-[#303055]">
              Rubik SemiBold (600) Status Text
            </span>
          </div>
        </div>
      </section>

      {/* 4. IBM Plex Mono */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#767682]">Font 4 — Code & Telemetry</span>
            <h2 className="font-mono text-lg font-bold text-[#303055]">IBM Plex Mono</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 400, 500, 600
          </span>
        </div>
        <p className="text-xs text-[#767682]">
          Assigned to: Terminal outputs, IP addresses, sha256 hashes, shell snippets.
        </p>

        <div className="p-4 rounded-[4px] bg-[#f4f4f9] border border-[#e4e4ed] font-mono text-xs space-y-1 text-[#303055]">
          <div>$ tcpdump -nnvv -i eth0 &apos;tcp[tcpflags] & (tcp-syn) != 0&apos;</div>
          <div className="text-[#767682]">192.168.1.105.49214 &gt; 10.0.0.1.443: Flags [S], seq 382910291</div>
          <div className="text-[#3b61b0]">SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
        </div>
      </section>

      {/* 5. Local Cyberpunk Accent */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#767682]">Optional Local Font</span>
            <h2 className="font-cyberpunk text-2xl text-[#303055]">Cyberpunk Regular</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Local Font: next/font/local (400)
          </span>
        </div>
        <p className="text-xs text-[#767682]">
          Verified self-hosted font via <code>next/font/local</code> registered under <code>--font-cyberpunk</code>.
        </p>

        <div className="p-4 rounded-[4px] bg-[#f4f4f9] border border-[#e4e4ed]">
          <div className="font-cyberpunk text-xl sm:text-2xl text-[#303055]">
            CYBERTUBE SYSTEM CORE 2026
          </div>
        </div>
      </section>
    </div>
  );
}

