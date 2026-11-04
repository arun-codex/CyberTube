import React from 'react';
import Link from 'next/link';
import { Shield, ExternalLink, Heart } from 'lucide-react';
import { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } from '../data/metadata';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 dark:border-[#1f293d] bg-slate-50 dark:bg-[#0b0f17] text-slate-600 dark:text-slate-400 text-xs transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                Cyber<span className="text-cyan-400">Tube</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              A centralized discovery engine for cybersecurity students, researchers, and practitioners.
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 font-mono text-[11px] text-cyan-600 dark:text-cyan-400">
                Phase 1: Discovery Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Saved items are stored in your device&apos;s local browser storage.
            </p>
          </div>

          {/* Domains Column 1 */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-3">
              Core Domains
            </h3>
            <ul className="space-y-2">
              {CYBERSECURITY_DOMAINS.slice(0, 6).map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/discover?domain=${d.id}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domains Column 2 */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-3">
              Specialized Tracks
            </h3>
            <ul className="space-y-2">
              {CYBERSECURITY_DOMAINS.slice(6).map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/discover?domain=${d.id}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Types */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300 mb-3">
              Resource Formats
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {RESOURCE_TYPES.map((t) => (
                <Link
                  key={t.id}
                  href={`/discover?type=${t.id}`}
                  className="px-2 py-1 rounded bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[11px] font-mono hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CyberTube. Discover. Learn. Practice. Secure.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/domains" className="hover:text-cyan-400 transition-colors">
              Domain Directory
            </Link>
            <Link href="/discover" className="hover:text-cyan-400 transition-colors">
              Resource Index
            </Link>
            <Link href="/saved" className="hover:text-cyan-400 transition-colors">
              My Saved Items
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

