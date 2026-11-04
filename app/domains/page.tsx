import React from 'react';
import Link from 'next/link';
import {
  Layers,
  ArrowRight,
  Shield,
  Network,
  Activity,
  Flame,
  Globe,
  Search,
  Cpu,
  Cloud,
  Target,
  Radio,
  Key,
} from 'lucide-react';
import { CYBERSECURITY_DOMAINS } from '../../src/data/metadata';
import { getAllResources, getFacetCounts } from '../../src/lib/catalog';

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  fundamentals: Shield,
  'network-security': Network,
  'soc-blue-team': Activity,
  'red-team-pentest': Flame,
  'web-app-security': Globe,
  dfir: Search,
  'malware-reverse-engineering': Cpu,
  'cloud-security': Cloud,
  'osint-threat-intel': Target,
  'iot-embedded-security': Radio,
  cryptography: Key,
};

export default function DomainsPage() {
  const allResources = getAllResources();
  const { domainCounts } = getFacetCounts(allResources);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Cybersecurity Knowledge Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Cybersecurity Domain Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The field of cybersecurity spans multiple distinct technical domains—from low-level binary
          reverse engineering and packet analysis to threat modeling, identity federation, and cloud architecture.
          Explore resources organized by domain.
        </p>
      </div>

      {/* Domain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CYBERSECURITY_DOMAINS.map((domain) => {
          const count = domainCounts[domain.id] || 0;
          const Icon = DOMAIN_ICONS[domain.id] || Shield;

          return (
            <div
              key={domain.id}
              className="p-6 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] flex flex-col justify-between space-y-4 shadow-sm hover:border-cyan-500/40 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {count} {count === 1 ? 'Resource' : 'Resources'}
                  </span>
                </div>

                <div>
                  <h2 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    {domain.name}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 leading-snug">
                    {domain.shortDescription}
                  </p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  {domain.longDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <Link
                  href={`/discover?domain=${domain.id}`}
                  className="w-full inline-flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/70 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 transition-all border border-transparent"
                >
                  <span>Explore domain resources</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

