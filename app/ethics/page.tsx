import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle, Scale, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ethics & Legal Guidelines | CyberTube',
  description: 'CyberTube rules of engagement and ethical framework for cybersecurity students and practitioners.',
};

export default function EthicsPage() {
  return (
    <div className="container-max py-10 space-y-10 max-w-4xl">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE]">
          <Shield className="w-4 h-4" />
          <span>Rules of Engagement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          Ethics & Responsible Learning — Hack Legally & Responsibly
        </h1>
        <p className="text-sm sm:text-base text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Cybersecurity skills grant significant capability. With that power comes the strict legal and professional obligation to operate ethically, transparently, and only within authorized boundaries.
        </p>
      </div>

      {/* Core Rules */}
      <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3] flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#0E7490] dark:text-[#22D3EE]" />
          <span>Explicit Written Authorization & Responsible Disclosure Guidelines</span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433]">
            <CheckCircle className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                1. Only test systems you own or have explicit written permission to test
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] mt-1 leading-relaxed">
                Verbal permission is never sufficient. In professional engagements, written scopes of work and contracts define exact target IP ranges, time windows, and boundaries.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433]">
            <CheckCircle className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                2. Use the curated legal lab platforms for all practice
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] mt-1 leading-relaxed">
                Platforms such as PortSwigger Web Security Academy, TryHackMe, picoCTF, Hack The Box, OverTheWire, OWASP Juice Shop, and DVWA exist precisely to provide legal targets. Practise there.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433]">
            <CheckCircle className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                3. Never attack real websites, public services, or individuals
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] mt-1 leading-relaxed">
                Port-scanning, fuzzing, or sending automated requests to websites without a documented bug bounty scope or authorized penetration testing contract is illegal and unethical.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433]">
            <CheckCircle className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                4. Protect sensitive data and respect privacy
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] mt-1 leading-relaxed">
                If you legitimately discover sensitive information during an authorized engagement, halt immediately, protect the data, and report it to the system owner. Never download, share, or monetize user data.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433]">
            <CheckCircle className="w-5 h-5 text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                5. Follow responsible disclosure standards
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] mt-1 leading-relaxed">
                Give vendors reasonable time to patch vulnerabilities before public discussion. Coordinate through certified security contacts (`security.txt` or authorized vulnerability disclosure policies).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lab links callout */}
      <div className="p-6 rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#E6EDF3]">
            Ready to test hands-on legally?
          </h3>
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7]">
            Visit our legal lab directory to start practising in safe environments right away.
          </p>
        </div>
        <Link
          href="/labs"
          className="px-4 py-2 rounded-lg bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] font-semibold text-xs whitespace-nowrap"
        >
          Explore Legal Practice Labs →
        </Link>
      </div>
    </div>
  );
}
