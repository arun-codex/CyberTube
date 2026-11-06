'use client';

import React, { useState } from 'react';
import { PCAPResource } from '../../types/course';
import {
  Download,
  FileCheck,
  ShieldAlert,
  Copy,
  Check,
  ExternalLink,
  HardDrive,
} from 'lucide-react';

interface PCAPResourceListProps {
  resources: PCAPResource[];
}

export const PCAPResourceList: React.FC<PCAPResourceListProps> = ({ resources }) => {
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);

  const handleCopyHash = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  if (!resources || resources.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#e4e4ed] dark:border-[#243044] pb-2">
        <div>
          <h3 className="font-rajdhani font-bold text-lg text-[#0F172A] dark:text-[#E6EDF3]">
            Official PCAP Evidence & Scenario Library
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#9BA8B7]">
            Verified forensic captures curated by Netsec Explained and the Wireshark Foundation.
          </p>
        </div>
        <span className="font-mono text-xs text-[#0E7490] dark:text-[#22D3EE] px-2 py-0.5 rounded-[4px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 border border-[#0E7490]/20 dark:border-[#22D3EE]/20">
          {resources.length} Captures
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((pcap) => (
          <div
            key={pcap.id}
            className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE] shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A] dark:text-[#E6EDF3] leading-snug">
                      {pcap.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7] truncate block">
                      {pcap.fileName}
                    </span>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded-[3px] bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] font-mono text-[10px] text-[#64748B] dark:text-[#9BA8B7] uppercase shrink-0">
                  {pcap.fileFormat}
                </span>
              </div>

              <div className="text-[11px] font-mono text-[#0E7490] dark:text-[#22D3EE]">
                {pcap.intendedModule}
              </div>

              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
                {pcap.learningPurpose}
              </p>

              {pcap.safetyGuidance && (
                <div className="p-2 rounded-[4px] bg-[#fffbeb] dark:bg-[#78350F]/20 border border-[#fde68a] dark:border-[#78350F]/40 text-[#92400e] dark:text-[#FCD34D] text-[11px] leading-relaxed flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#b45309] dark:text-[#F59E0B]" />
                  <span>{pcap.safetyGuidance}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-[#e4e4ed] dark:border-[#243044]">
              {pcap.sha256 && (
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-[#64748B] dark:text-[#9BA8B7] bg-[#f4f4f9] dark:bg-[#1A2433] p-1.5 rounded-[4px]">
                  <span className="truncate" title={pcap.sha256}>
                    SHA256: {pcap.sha256.substring(0, 16)}...
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(pcap.id, pcap.sha256!)}
                    className="hover:text-[#0F172A] dark:hover:text-[#E6EDF3] shrink-0 inline-flex items-center gap-1 cursor-pointer"
                    title="Copy full SHA-256 hash"
                  >
                    {copiedHashId === pcap.id ? (
                      <Check className="w-3 h-3 text-[#10B981]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <a
                  href={pcap.sourceRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#64748B] dark:text-[#9BA8B7] hover:text-[#0E7490] dark:hover:text-[#22D3EE] inline-flex items-center gap-1"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={pcap.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#0E7490] hover:bg-[#0891B2] text-white font-mono text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PCAP</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

