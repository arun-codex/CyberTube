import React from 'react';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Ethics & Responsible Learning Policy | CyberTube',
  description: 'CyberTube policy and code of ethics on legal, authorized, and responsible security research.',
};

export default function EthicsPage() {
  return (
    <div className="container-max py-12 max-w-4xl space-y-10">
      {/* Title Header */}
      <div className="space-y-3 border-b border-[#e4e4ed] dark:border-[#1E293B] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-xs font-mono text-[#303055] dark:text-[#22D3EE]">
          <Shield className="w-3.5 h-3.5 text-[#303055] dark:text-[#22D3EE]" />
          <span>Professional Code of Conduct</span>
        </div>
        <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#303055] dark:text-[#E6EDF3]">
          Ethics & Responsible Learning
        </h1>
        <p className="text-sm sm:text-base text-[#403f53] dark:text-[#94A3B8] leading-relaxed">
          CyberTube provides educational resources and curriculum for defensive security practitioners, forensic analysts, and ethical penetration testers. All technical concepts must be applied strictly within lawful boundaries.
        </p>
      </div>

      {/* Core Rules Section */}
      <div className="space-y-6">
        <div className="p-6 rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2e7d32] dark:text-[#34D399] shrink-0" />
            <h2 className="font-rajdhani text-xl font-bold text-[#303055] dark:text-[#E6EDF3]">
              1. Explicit Written Authorization
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#403f53] dark:text-[#94A3B8] leading-relaxed">
            Never perform port scans, network vulnerability assessments, penetration tests, or exploitation against any host, server, API, or network without unambiguous, written authorization from the system owner. Scoped rules of engagement must clearly define boundaries, target IP ranges, test timeframes, and emergency contact procedures.
          </p>
        </div>

        <div className="p-6 rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2e7d32] dark:text-[#34D399] shrink-0" />
            <h2 className="font-rajdhani text-xl font-bold text-[#303055] dark:text-[#E6EDF3]">
              2. Use Isolated Practice Environments
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#403f53] dark:text-[#94A3B8] leading-relaxed">
            Practice exclusively in legal, purpose-built environments such as PortSwigger Web Security Academy, TryHackMe, Hack The Box, or locally hosted virtual machines (e.g., OWASP Juice Shop, Metasploitable, DVWA). Never test payloads on production internet applications or services.
          </p>
        </div>

        <div className="p-6 rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2e7d32] dark:text-[#34D399] shrink-0" />
            <h2 className="font-rajdhani text-xl font-bold text-[#303055] dark:text-[#E6EDF3]">
              3. Responsible Disclosure Guidelines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#403f53] dark:text-[#94A3B8] leading-relaxed">
            If a security vulnerability or sensitive data exposure is discovered inadvertently during normal operations, notify the affected vendor or organization through their established vulnerability disclosure policy (VDP) or <code>security.txt</code> contact. Allow reasonable remediation time before public discussion.
          </p>
        </div>

        <div className="p-6 rounded-[8px] border border-[#e8b5b5] dark:border-[#6a2929] bg-[#fbeaea]/40 dark:bg-[#341818]/40 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#984e4d] dark:text-[#F87171] shrink-0" />
            <h2 className="font-rajdhani text-xl font-bold text-[#984e4d] dark:text-[#F87171]">
              4. Prohibition of Malicious Activity
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#403f53] dark:text-[#94A3B8] leading-relaxed">
            Unauthorized access, data exfiltration, service disruption (DoS/DDoS), deployment of malware, and credential harvesting are illegal under global cybercrime statutes (such as the CFAA in the United States and the Computer Misuse Act in the United Kingdom). CyberTube strictly forbids using platform materials for malicious objectives.
          </p>
        </div>
      </div>

      {/* Return Action */}
      <div className="pt-4 flex items-center justify-between">
        <Link
          href="/learning-paths"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#303055] dark:text-[#22D3EE] hover:underline"
        >
          <span>← Back to Learning Paths</span>
        </Link>
      </div>
    </div>
  );
}

