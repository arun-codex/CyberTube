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
        <div className="font-mono text-xs uppercase tracking-wider text-[#6b6b7b]">
          Design System & Spec
        </div>
        <h1 className="font-orbitron text-2xl sm:text-3xl font-bold text-[#303055]">
          CyberTube Multi-Font Typography System
        </h1>
        <p className="text-sm text-[#403f53] max-w-2xl leading-relaxed">
          Integrated font optimization showcase verifying Orbitron, Rajdhani, Rubik, IBM Plex Mono, and Cyberpunk display styling across sizes, weights, and SST tokens.
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
            <span className="font-mono text-xs uppercase text-[#6b6b7b]">Font 1 — Primary Display</span>
            <h2 className="font-orbitron text-xl font-bold text-[#303055]">Orbitron</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 600, 700 (OFL 1.1)
          </span>
        </div>
        <p className="text-xs text-[#6b6b7b]">
          Used for brand wordmarks, homepage hero title and selected major headings.
        </p>

        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">Bold 700</span>
            <div className="font-orbitron font-bold text-3xl sm:text-4xl text-[#303055]">
              CYBERTUBE // SECURITY INTELLIGENCE
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">SemiBold 600</span>
            <div className="font-orbitron font-semibold text-2xl sm:text-3xl text-[#303055]">
              ADVANCED PENETRATION TESTING & HARDWARE LABS
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">Display Heading (H2)</span>
            <div className="font-orbitron font-medium text-lg text-[#303055]">
              DEFENSIVE ARCHITECTURE & THREAT MODELLING
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rajdhani */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#6b6b7b]">Font 2 — Technical Headings</span>
            <h2 className="font-rajdhani text-2xl font-bold text-[#303055]">Rajdhani</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 600, 700 (OFL 1.1)
          </span>
        </div>
        <p className="text-xs text-[#6b6b7b]">
          Used for course titles, domain headings, dashboard metrics, technical labels and compact section headings.
        </p>

        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">Bold 700 — Course Title</span>
            <div className="font-rajdhani font-bold text-2xl sm:text-3xl text-[#303055] tracking-tight">
              Network Packet Analysis Masterclass: Wireshark & BPF
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">SemiBold 600 — Metric / Status</span>
            <div className="font-rajdhani font-semibold text-xl text-[#303055]">
              STATUS: 24/24 LESSONS COMPLETED [100% VERIFIED]
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">Compact Section Header</span>
            <div className="font-rajdhani font-medium text-lg text-[#403f53] uppercase tracking-wider">
              Cryptographic Primitives // Elliptic Curve Diffie-Hellman
            </div>
          </div>
        </div>
      </section>

      {/* 3. Rubik */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#6b6b7b]">Font 3 — Body & UI Font</span>
            <h2 className="font-sans text-xl font-bold text-[#303055]">Rubik (font-sans)</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 400, 500, 600 (OFL 1.1)
          </span>
        </div>
        <p className="text-xs text-[#6b6b7b]">
          Primary UI font for all body text, navigation items, buttons, form controls and descriptions.
        </p>

        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">Regular 400 — Body Text</span>
            <p className="font-sans text-sm sm:text-base text-[#403f53] leading-relaxed max-w-2xl">
              CyberTube curates high-signal cybersecurity education. Dive deep into x86 assembly, reverse engineering,
              protocol dissection, and active defense strategies designed for developers and security analysts.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#6b6b7b]">Medium 500 — Interactive / Button</span>
            <div className="flex items-center gap-3 pt-1">
              <button className="px-4 py-2 bg-[#303055] text-white rounded-[4px] font-sans font-medium text-sm">
                Explore Curriculum
              </button>
              <button className="px-4 py-2 border border-[#e4e4ed] text-[#303055] rounded-[4px] font-sans font-medium text-sm">
                Bookmark Module
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IBM Plex Mono */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#6b6b7b]">Font 4 — Code & Telemetry</span>
            <h2 className="font-mono text-xl font-bold text-[#303055]">IBM Plex Mono</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            Weights: 400, 500 (OFL 1.1)
          </span>
        </div>
        <p className="text-xs text-[#6b6b7b]">
          Used for terminal outputs, source code snippets, hash displays, memory addresses and telemetry metrics.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-[4px] bg-[#141424] text-[#b0b0c6] font-mono text-xs sm:text-sm space-y-1 border border-[#303055]">
            <div className="text-[#3b61b0]">$ tshark -i eth0 -Y &quot;tcp.port == 443&quot; -T fields -e ip.src -e ip.dst</div>
            <div className="text-emerald-400">192.168.1.105 -&gt; 104.244.42.1 [TLSv1.3 Application Data]</div>
            <div className="text-[#76769a]">SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
          </div>
        </div>
      </section>

      {/* 5. Cyberpunk Display Face */}
      <section className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-3">
          <div>
            <span className="font-mono text-xs uppercase text-[#6b6b7b]">Cyberpunk Display Face</span>
            <h2 className="font-cyberpunk text-2xl text-[#303055]">Cyberpunk Display (Orbitron OFL-1.1)</h2>
          </div>
          <span className="text-xs font-mono bg-[#f4f4f9] px-2 py-1 rounded text-[#303055] border border-[#e4e4ed]">
            OFL-1.1 Verified
          </span>
        </div>
        <p className="text-xs text-[#6b6b7b]">
          Verified self-hosted OFL-1.1 display face registered under <code>--font-orbitron</code> / <code>font-cyberpunk</code>.
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
