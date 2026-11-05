import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  UserCheck,
  Video,
  Lock,
  Mail,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | CyberTube',
  description:
    'CyberTube Terms of Service: rules of engagement, authorized cybersecurity lab practice, user responsibilities, and intellectual property.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="container-max py-10 space-y-10 max-w-4xl">
      {/* Page Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE]">
          <Scale className="w-4 h-4" />
          <span>Terms of Use & Legal Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          CyberTube Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Effective Date: November 5, 2026 • Version 1.0
        </p>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Welcome to CyberTube. By creating an account, browsing courses, or using any part of the CyberTube platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
        </p>
      </header>

      {/* Mandatory Rules of Engagement Highlight Box */}
      <div className="rounded-xl border border-[#EF4444]/30 dark:border-[#EF4444]/40 bg-[#FEF2F2] dark:bg-[#7F1D1D]/10 p-6 sm:p-8 space-y-4">
        <h2 className="text-base sm:text-lg font-bold font-space-grotesk text-[#991B1B] dark:text-[#F87171] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Mandatory Cybersecurity Rules of Engagement & Ethics</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#7F1D1D] dark:text-[#FCA5A5] leading-relaxed">
          CyberTube provides instruction in computer security concepts, vulnerability assessment, and offensive/defensive methodologies. You acknowledge and agree that <strong>all techniques, commands, tools, and scripts learned on this platform must be used strictly within legal boundaries</strong>:
        </p>
        <ul className="text-xs sm:text-sm text-[#7F1D1D] dark:text-[#FCA5A5] space-y-2 list-disc list-inside">
          <li><strong>Authorized Targets Only:</strong> Practice must take place solely on systems you personally own, in private local virtual machines, on our curated <Link href="/labs" className="underline font-semibold">Legal Practice Labs</Link> (such as PortSwigger Web Security Academy, TryHackMe, picoCTF, Hack The Box, OWASP Juice Shop), or on targets where you have received prior, explicit, written authorization from the system owner.</li>
          <li><strong>Zero Tolerance for Unauthorized Attacks:</strong> You may not perform port-scanning, vulnerability scanning, automated exploitation, credential brute-forcing, denial-of-service, or interception against any individual, organization, educational institution, government agency, or infrastructure without verifiable written scope of engagement.</li>
          <li><strong>Immediate Revocation:</strong> Using knowledge gained from CyberTube to violate computer crime laws (including the US CFAA, UK Computer Misuse Act, or applicable international cybersecurity statutes) will result in immediate and permanent account termination.</li>
        </ul>
        <div className="pt-2 text-xs font-mono text-[#991B1B] dark:text-[#FCA5A5]">
          Review our comprehensive guidelines: <Link href="/ethics" className="underline font-semibold hover:opacity-80">Rules of Engagement & Ethics Policy →</Link>
        </div>
      </div>

      <article className="space-y-8">
        {/* Section 1: Educational Scope & Platform Purpose */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              1. Educational Purpose & Mission
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            CyberTube is an educational aggregator designed to guide students, career-switchers, and cybersecurity professionals through structured, sequential learning roadmaps. All materials, roadmaps, cheat sheets, and checklists are intended strictly for educational, defensive, and authorized research purposes.
          </p>
        </section>

        {/* Section 2: Account Responsibilities */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              2. User Accounts & Security
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            When you register an account via Google OAuth, GitHub OAuth, or email:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li>You agree to provide accurate and truthful profile information.</li>
            <li>You are responsible for maintaining the confidentiality of your session credentials and connected OAuth accounts.</li>
            <li>You accept responsibility for all actions that occur under your account.</li>
            <li>You agree to notify us immediately at <a href="mailto:privacy@cybertube.org" className="text-[#0E7490] dark:text-[#22D3EE] underline">privacy@cybertube.org</a> if you suspect any unauthorized access or security breach involving your account.</li>
          </ul>
        </section>

        {/* Section 3: Intellectual Property & Creator Attribution */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Video className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              3. Intellectual Property & Creator Attribution
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7]">
            <p className="leading-relaxed">
              <strong>Third-Party Content:</strong> All course videos, tutorials, and external lecture media curated on CyberTube remain the sole intellectual property of their respective creators and publishers. CyberTube does not host, duplicate, re-encode, or monetize creator videos. Videos are presented via standard, privacy-conscious click-to-load embeds that link directly to official channels.
            </p>
            <p className="leading-relaxed">
              <strong>Platform Intellectual Property:</strong> The CyberTube brand, logo, curriculum sequence design, custom icons, source code, interactive user interfaces, and documentation are protected by copyright and intellectual property laws. You may not copy, reverse engineer, or exploit the platform for unauthorized commercial gain.
            </p>
          </div>
        </section>

        {/* Section 4: Acceptable Use of the Platform */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              4. Acceptable Platform Use
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            In accessing CyberTube, you agree <strong>NOT</strong> to:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li>Interfere with, bypass, or tamper with security controls, rate limiters, or Row Level Security policies.</li>
            <li>Upload malicious files, polyglot payloads, SVG scripts, or executables disguised as avatar images.</li>
            <li>Scrape or harvest user data, profiles, or emails through automated scripts or bots.</li>
            <li>Attempt to perform denial of service attacks against CyberTube, its database, or edge infrastructure.</li>
          </ul>
        </section>

        {/* Section 5: Disclaimers of Warranties */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Shield className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              5. Disclaimer of Warranties
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed uppercase tracking-wider font-mono text-[11px]">
            CYBERTUBE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT COURSE CONTENT WILL BE ERROR-FREE, UNINTERRUPTED, OR COMPATIBLE WITH EVERY SYSTEM ENVIRONMENT.
          </p>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Scale className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              6. Limitation of Liability
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CYBERTUBE, ITS OPERATORS, CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE PLATFORM, OR FROM ANY UNLAWFUL OR MISDIRECTED USE OF THE TECHNICAL CONCEPTS DISCUSSED IN CURATED COURSES.
          </p>
        </section>

        {/* Section 7: Termination & Account Suspension */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              7. Termination & Suspension
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We reserve the right, without prior notice or liability, to suspend or terminate your account and access to the platform if we determine, in our sole discretion, that you have violated these Terms of Service, the <Link href="/ethics" className="text-[#0E7490] dark:text-[#22D3EE] underline">Rules of Engagement</Link>, or applicable law.
          </p>
        </section>

        {/* Section 8: Governing Law & Updates */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              8. Modifications & Contact Information
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Changes become effective upon posting to this page. Your continued use of the platform following the posting of revised Terms constitutes your agreement to the changes.
          </p>
          <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433] space-y-1 text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7]">
            <p className="text-[#0F172A] dark:text-[#E6EDF3] font-medium">Questions regarding these Terms:</p>
            <p>Email: <a href="mailto:privacy@cybertube.org" className="text-[#0E7490] dark:text-[#22D3EE] underline">privacy@cybertube.org</a></p>
            <p>GitHub Repository: <a href="https://github.com/arun-codex/CyberTube" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] dark:text-[#22D3EE] underline">github.com/arun-codex/CyberTube</a></p>
          </div>
        </section>
      </article>

      {/* Footer Navigation Backlink */}
      <div className="pt-4 flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#243044] text-xs font-mono">
        <Link href="/" className="text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1">
          ← Return to CyberTube Home
        </Link>
        <Link href="/privacy" className="text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1">
          Privacy Policy →
        </Link>
      </div>
    </div>
  );
}
