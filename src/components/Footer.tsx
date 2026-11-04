import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } from '../data/metadata';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#e4e4ed] bg-[#f4f4f9] text-[#767682] text-xs mt-auto">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[4px] bg-[#303055] flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5 fill-white stroke-none" />
              </div>
              <span className="font-semibold text-sm text-[#303055]">
                CyberTube
              </span>
            </Link>
            <p className="text-xs text-[#403f53] leading-relaxed">
              Curated cybersecurity video courses, packet inspection, and hardware security education.
            </p>
            <p className="text-[11px] font-mono text-[#767682] pt-1">
              Synchronized with verified technical channels.
            </p>
          </div>

          {/* Domains Column 1 */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#303055] mb-3">
              Core Tracks
            </h3>
            <ul className="space-y-2">
              {CYBERSECURITY_DOMAINS.slice(0, 5).map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/discover?domain=${d.id}`}
                    className="hover:text-[#303055] transition-colors"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domains Column 2 */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#303055] mb-3">
              Specialized Labs
            </h3>
            <ul className="space-y-2">
              {CYBERSECURITY_DOMAINS.slice(5, 10).map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/discover?domain=${d.id}`}
                    className="hover:text-[#303055] transition-colors"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Formats */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#303055] mb-3">
              Formats
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {RESOURCE_TYPES.slice(0, 8).map((t) => (
                <Link
                  key={t.id}
                  href={`/discover?type=${t.id}`}
                  className="px-2 py-1 rounded-[4px] bg-white border border-[#e4e4ed] text-[11px] font-mono text-[#403f53] hover:border-[#303055] hover:text-[#303055] transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#e4e4ed] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#767682]">
          <div>
            © {new Date().getFullYear()} CyberTube. Open Developer & Security Education.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/courses" className="hover:text-[#303055] transition-colors">
              Courses
            </Link>
            <Link href="/domains" className="hover:text-[#303055] transition-colors">
              Domains
            </Link>
            <Link href="/discover" className="hover:text-[#303055] transition-colors">
              Discover
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
