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
    <div className="container-max py-10 space-y-8">
      {/* Header */}
      <div className="rounded-[8px] border border-[#e4e4ed] bg-[#f4f4f9] p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-white border border-[#e4e4ed] text-xs font-mono text-[#303055]">
          <Layers className="w-3.5 h-3.5 text-[#303055]" />
          <span>Taxonomy Architecture</span>
        </div>
        <h1 className="font-rajdhani text-3xl sm:text-4xl font-bold text-[#303055] tracking-tight">
          Cybersecurity Domain Directory
        </h1>
        <p className="text-sm text-[#403f53] max-w-2xl leading-relaxed">
          The 11 core sub-disciplines of computer security, organized with curated resources and technical breakdowns.
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
              className="p-5 sm:p-6 rounded-[8px] border border-[#e4e4ed] bg-white flex flex-col justify-between space-y-4 hover:border-[#303055] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-[4px] bg-[#f4f4f9] border border-[#e4e4ed] flex items-center justify-center text-[#303055]">
                    <Icon className="w-4 h-4 text-[#303055]" />
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#6b6b7b] border border-[#e4e4ed]">
                    {count} items
                  </span>
                </div>

                <div>
                  <h2 className="font-rajdhani font-bold text-lg text-[#303055]">
                    {domain.name}
                  </h2>
                  <p className="text-xs text-[#6b6b7b] mt-1">
                    {domain.shortDescription}
                  </p>
                </div>

                <p className="text-xs text-[#403f53] leading-relaxed pt-1">
                  {domain.longDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e4e4ed]">
                <Link
                  href={`/discover?domain=${domain.id}`}
                  className="w-full inline-flex items-center justify-between px-3 py-2 rounded-[4px] bg-[#f4f4f9] hover:bg-[#e8e8f2] text-xs font-mono text-[#303055] transition-colors"
                >
                  <span>Explore domain</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6b6b7b]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
