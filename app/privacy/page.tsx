import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  Key,
  Database,
  Server,
  Cookie,
  UserCheck,
  Trash2,
  FileCheck,
  AlertCircle,
  Mail,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | CyberTube',
  description:
    'Comprehensive Privacy Policy for CyberTube detailing Google OAuth data practices, Supabase data handling, user rights, and transparent data processing.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-max py-10 space-y-10 max-w-4xl">
      {/* Page Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE]">
          <Shield className="w-4 h-4" />
          <span>Transparency & Data Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          CyberTube Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Last Modified: November 5, 2026 • Version 1.1
        </p>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          At CyberTube, we believe that education in cybersecurity must begin with exemplary security and privacy standards. This Privacy Policy details the exact data we collect, how your identity is authenticated, how third-party services process your information, and how you can exercise full control over your personal data.
        </p>
      </header>

      {/* Quick Summary Card */}
      <div className="rounded-xl border border-[#0E7490]/30 dark:border-[#22D3EE]/30 bg-[#F0FDF4]/50 dark:bg-[#064E3B]/10 p-6 space-y-3">
        <h2 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3] flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-[#047857] dark:text-[#34D399]" />
          <span>Summary of Core Privacy Principles</span>
        </h2>
        <ul className="text-xs sm:text-sm text-[#334155] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
          <li><strong>Zero Data Selling:</strong> We do not sell, rent, monetize, or trade your personal data or email address to anyone.</li>
          <li><strong>Google OAuth Minimal Scope:</strong> When signing in with Google, we request strictly basic identity scopes (<code>openid</code>, <code>email</code>, <code>profile</code>) to authenticate your account and initialize your display name and avatar. We do not request, access, or inspect your Gmail, Drive, Calendar, YouTube account, or any other Google service data.</li>
          <li><strong>Zero Tracking Ads:</strong> We run no behavioral tracking ads, marketing pixels, or third-party audience trackers.</li>
          <li><strong>Transparent Infrastructure:</strong> Data is hosted securely on Supabase (PostgreSQL with Row Level Security) and delivered via Vercel edge networks.</li>
          <li><strong>Full User Control:</strong> You can edit your profile, delete your custom uploaded avatar, or request full account deletion at any time.</li>
        </ul>
      </div>

      <article className="space-y-8">
        {/* Section 1: Who We Are & Contact Information */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              1. Platform Operator & Contact Information
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            CyberTube is an open educational platform focused on structured cybersecurity learning roadmaps, curated high-quality free video courses, and legal practice labs.
          </p>
          <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433] space-y-2 text-xs sm:text-sm">
            <p className="text-[#0F172A] dark:text-[#E6EDF3] font-medium">Data Controller / Operator:</p>
            <p className="text-[#475569] dark:text-[#9BA8B7]">CyberTube Open Education Project</p>
            <p className="text-[#475569] dark:text-[#9BA8B7]">
              Privacy & Legal Contact: <a href="mailto:privacy@cybertube.org" className="text-[#0E7490] dark:text-[#22D3EE] underline hover:opacity-80">privacy@cybertube.org</a>
            </p>
            <p className="text-[#475569] dark:text-[#9BA8B7]">
              Technical Support: <a href="mailto:privacy@cybertube.org" className="text-[#0E7490] dark:text-[#22D3EE] underline hover:opacity-80">privacy@cybertube.org</a>
            </p>
            <p className="text-[#475569] dark:text-[#9BA8B7]">
              Source Code & Issues: <a href="https://github.com/arun-codex/CyberTube" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] dark:text-[#22D3EE] underline hover:opacity-80">github.com/arun-codex/CyberTube</a>
            </p>
          </div>
        </section>

        {/* Section 2: Information Collected Directly */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Database className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              2. Information Collected Directly from You
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            When you register an account or use CyberTube, you may provide certain personal and academic progress data:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li><strong>Profile Information:</strong> Optional username, display name, biographical text (&ldquo;bio&rdquo;), experience level (e.g., beginner, intermediate, advanced, professional), preferred learning language, country code, primary learning goal, and technical interest tags.</li>
            <li><strong>Custom Profile Avatars:</strong> If you upload a custom profile picture, the image file (JPEG, PNG, or WebP up to 5 MB) is stored in our private storage infrastructure and associated with your user identifier.</li>
            <li><strong>Learning Progress & Bookmarks:</strong> Lessons completed, courses started, module completion statuses, and bookmarked learning resources.</li>
            <li><strong>Visitor Data (Unauthenticated):</strong> If you browse without logging in, your course bookmarks and module progress are stored strictly in your browser&apos;s <code>localStorage</code> and are not transmitted to our servers until you authenticate.</li>
          </ul>
        </section>

        {/* Section 3: Google OAuth Identity & Data Scope */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Key className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              3. Google OAuth Identity Information & Limited Use
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            CyberTube offers single sign-on (SSO) via Google OAuth. We intentionally maintain the absolute minimal footprint when interacting with Google APIs:
          </p>

          <div className="space-y-3 p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433] text-xs sm:text-sm">
            <h3 className="font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
              Google OAuth Scopes Requested:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-[#475569] dark:text-[#9BA8B7] font-mono text-xs">
              <li><code>openid</code> — To verify your identity using standard OpenID Connect tokens.</li>
              <li><code>email</code> — To retrieve your primary Google account email address for account association.</li>
              <li><code>profile</code> — To retrieve your basic public profile details (name and profile image URL).</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            <h3 className="font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
              Specific Google Data Received:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Google User ID:</strong> A unique numeric identifier provided by Google to bind your session to your CyberTube account.</li>
              <li><strong>Email Address:</strong> Used solely for account identification, login validation, and essential security notices.</li>
              <li><strong>Full Name / Display Name:</strong> Used to initialize your default display name on CyberTube (which you can customize at any time).</li>
              <li><strong>Google Avatar URL:</strong> A public image link hosted on <code>lh3.googleusercontent.com</code> used to render your avatar until or unless you upload a custom picture.</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-[#0E7490]/20 bg-[#F0F9FF] dark:bg-[#0C2D48]/30 space-y-2 text-xs sm:text-sm">
            <h3 className="font-bold text-[#0E7490] dark:text-[#22D3EE] flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>Strict Scope Boundaries & Google Limited Use Compliance</span>
            </h3>
            <p className="text-[#334155] dark:text-[#9BA8B7] leading-relaxed">
              <strong>Zero Extended Access:</strong> CyberTube does <em>not</em> request, read, or process data from Gmail, Google Drive, Google Calendar, Google Contacts, YouTube channels, or any restricted Google API.
            </p>
            <p className="text-[#334155] dark:text-[#9BA8B7] leading-relaxed">
              <strong>Google Limited Use Requirements:</strong> CyberTube&apos;s use and transfer to any other app of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="underline text-[#0E7490] dark:text-[#22D3EE]">Google API Services User Data Policy</a>, including the Limited Use requirements. Google user data is never used for serving advertisements or transferred to third-party ad networks.
            </p>
          </div>
        </section>

        {/* Section 4: GitHub OAuth Identity */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Key className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              4. GitHub OAuth Identity Information
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            When you sign in using GitHub OAuth, CyberTube receives your GitHub numeric user identifier, public username/handle, verified primary email address, display name, and avatar image URL (hosted on <code>avatars.githubusercontent.com</code>). This data is utilized solely to authenticate your identity, initialize your CyberTube account profile, and allow seamless login. We do not request permissions to access your private repositories, organizations, or personal settings.
          </p>
        </section>

        {/* Section 5: How Information Is Used */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Eye className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              5. How We Use Collected Information
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We use collected information solely for legitimate educational and platform operations:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li><strong>Service Delivery:</strong> Maintaining your logged-in session, displaying your profile, and tracking your lesson and course progress.</li>
            <li><strong>Personalization:</strong> Remembering your custom interests, learning goals, and bookmarked tutorials.</li>
            <li><strong>Security & Authentication:</strong> Verifying authenticated requests, preventing brute-force attacks, protecting API endpoints, and enforcing rate limits.</li>
            <li><strong>Platform Integrity:</strong> Ensuring that uploaded avatar files conform to size, format, and safety specifications to prevent cross-site scripting (XSS) or malicious payloads.</li>
          </ul>
        </section>

        {/* Section 6: Supabase Processing & Storage */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Database className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              6. Supabase Processing & Data Storage Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            CyberTube utilizes <strong>Supabase Inc.</strong> for managed database, authentication, and object storage services. The primary database cluster is hosted in secure Amazon Web Services (AWS) data centers (region: us-east-1).
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7]">
            <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433]">
              <h3 className="font-semibold text-[#0F172A] dark:text-[#E6EDF3] mb-1">
                Row Level Security (RLS) Isolation
              </h3>
              <p className="leading-relaxed">
                All application tables (including <code>profiles</code>, <code>user_course_progress</code>, and <code>user_bookmarks</code>) are enforced by PostgreSQL Row Level Security. Database policies ensure that write and update operations can strictly be performed only by the authenticated owner (where <code>auth.uid() = id</code>).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433]">
              <h3 className="font-semibold text-[#0F172A] dark:text-[#E6EDF3] mb-1">
                Private Storage Bucket & Time-Limited Signed URLs
              </h3>
              <p className="leading-relaxed">
                Custom avatar images are stored in a private Supabase Storage bucket (<code>avatars</code>, configured with <code>public = false</code>). Avatar files are stored in scoped directory paths (<code>user_id/filename</code>) and are served exclusively through time-limited cryptographic signed URLs (3600-second TTL) requested on-demand through authenticated API endpoints.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Vercel Hosting & Edge Network */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Server className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              7. Vercel Hosting & Edge Network Processing
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            CyberTube is deployed on <strong>Vercel Inc.</strong> Vercel acts as our edge content delivery network (CDN) and serverless runtime provider. When you access CyberTube, Vercel edge routers process standard HTTP request headers, IP addresses, and user-agent strings solely for the purpose of transmitting content, optimizing load speed, and safeguarding against denial-of-service (DDoS) traffic.
          </p>
        </section>

        {/* Section 8: Cookies & Session Management */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Cookie className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              8. Cookies & Session Storage
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We maintain an uncompromising approach to cookies. We use <strong>only strictly necessary functional cookies</strong>:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li><strong>Authentication Cookies:</strong> Managed securely via <code>@supabase/ssr</code> (e.g. <code>sb-*-auth-token</code>). These cookies are configured with <code>HttpOnly</code>, <code>Secure</code> (on HTTPS), and <code>SameSite=Lax</code> to prevent cross-site request forgery (CSRF) and script interception.</li>
            <li><strong>Theme Preference:</strong> Stored in local browser memory (e.g., dark or light mode preference).</li>
            <li><strong>Zero Advertising Cookies:</strong> CyberTube contains <strong>no</strong> tracking pixels, Google Ads cookies, Facebook pixels, or third-party marketing tags.</li>
          </ul>
        </section>

        {/* Section 9: Third-Party Disclosures & Embedded Media */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Shield className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              9. Third-Party Disclosures & Embedded Video Media
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We do not sell, rent, trade, or share user personal information with third parties for commercial or marketing purposes. Disclosures are limited to:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li><strong>Infrastructure Sub-processors:</strong> Supabase Inc. (Database/Auth/Storage) and Vercel Inc. (Hosting/CDN).</li>
            <li><strong>Embedded YouTube Videos:</strong> CyberTube curates free cybersecurity lectures published on YouTube. To protect learner privacy, video players are embedded using privacy-friendly, click-to-load mechanics. No user profile data or CyberTube account information is ever transmitted to YouTube. When you choose to play a video, YouTube (Google LLC) may receive your IP address and set cookies in accordance with YouTube&apos;s own Privacy Policy.</li>
            <li><strong>Legal Requirements:</strong> If required by valid court order, subpoena, or binding legal process, we will disclose only the specific data strictly required by law.</li>
          </ul>
        </section>

        {/* Section 10: Data Retention & Account Deletion */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Trash2 className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              10. Data Retention & Permanent Account Deletion
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We retain personal information only for as long as your account is active and needed to provide you with learning progress tracking.
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7]">
            <p className="leading-relaxed">
              <strong>Avatar Removal:</strong> You can delete your custom uploaded avatar at any time in your <Link href="/account" className="text-[#0E7490] dark:text-[#22D3EE] underline hover:opacity-80">Account Settings</Link>. The image object is permanently purged from the private storage bucket.
            </p>
            <p className="leading-relaxed">
              <strong>Account Deletion:</strong> You can request full, permanent deletion of your CyberTube account and all associated records at any time by contacting us at <a href="mailto:privacy@cybertube.org?subject=Account%20Deletion%20Request" className="text-[#0E7490] dark:text-[#22D3EE] underline hover:opacity-80">privacy@cybertube.org</a>. Upon processing:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Your record in <code>auth.users</code> is permanently deleted.</li>
              <li>PostgreSQL cascading foreign key constraints immediately purge all corresponding records in <code>profiles</code>, <code>user_course_progress</code>, and <code>user_bookmarks</code>.</li>
              <li>Any remaining files in your private storage folder are irreversibly destroyed.</li>
            </ul>
          </div>
        </section>

        {/* Section 11: Your Rights */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              11. Your Privacy Rights (GDPR, CCPA & Global Rights)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            Depending on your jurisdiction (such as the European Union under GDPR, California under CCPA/CPRA, or other privacy regimes), you have the following rights:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li><strong>Right of Access & Portability:</strong> You may request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> You can edit your profile information, display name, and bio directly in Account Settings at any time.</li>
            <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You may request permanent deletion of your account and data.</li>
            <li><strong>Right to Revoke OAuth Access:</strong> You can revoke CyberTube&apos;s authorization at any moment through your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] dark:text-[#22D3EE] underline">Google Security Permissions</a> or your GitHub Authorized OAuth Apps settings.</li>
            <li><strong>Right to Non-Discrimination:</strong> We do not discriminate against any user for exercising their privacy rights.</li>
          </ul>
        </section>

        {/* Section 12: Security Safeguards & Limitations */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              12. Security Safeguards & Inherent Limitations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We implement robust technical and architectural controls to safeguard user information:
          </p>
          <ul className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] space-y-2 list-disc list-inside">
            <li><strong>Encryption in Transit:</strong> All web traffic and API communications are encrypted via modern TLS (HTTPS) protocols.</li>
            <li><strong>Strict Hostname Validation:</strong> External avatar URLs are validated against rigorous hostname allowlists (e.g. <code>lh3.googleusercontent.com</code>, <code>avatars.githubusercontent.com</code>, and project Supabase domains) using exact boundary matching to prevent server-side request forgery (SSRF) and malicious redirects.</li>
            <li><strong>Row Level Security:</strong> Database queries are executed with database-enforced row filtering.</li>
            <li><strong>Storage Access Control:</strong> Custom avatars are kept in private, non-public storage containers requiring cryptographically signed access tokens.</li>
          </ul>
          <p className="text-xs text-[#64748B] dark:text-[#9BA8B7] pt-2">
            Please note: While we follow rigorous defensive cybersecurity engineering practices, no method of transmission over the Internet or electronic storage can be guaranteed 100% secure.
          </p>
        </section>

        {/* Section 13: Children's Privacy */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <AlertCircle className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              13. Children&apos;s Privacy
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            CyberTube is intended for students and learners aged 13 and older (or aged 16 where required by regional law). We do not knowingly solicit or collect personal information from children under 13. If you become aware that a child under 13 has registered or provided personal data without parental consent, please contact us immediately at <a href="mailto:privacy@cybertube.org" className="text-[#0E7490] dark:text-[#22D3EE] underline">privacy@cybertube.org</a> so we can take immediate steps to remove the account and delete all associated records.
          </p>
        </section>

        {/* Section 14: Updates to This Policy */}
        <section className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#0E7490] dark:text-[#22D3EE]">
            <FileCheck className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              14. Changes to This Privacy Policy
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            We may update this Privacy Policy from time to time to reflect operational changes, security enhancements, or legal compliance requirements. The date of the most recent revision will always be displayed at the top of this document. We encourage users to periodically review this page to stay informed about how we are protecting their information.
          </p>
        </section>
      </article>

      {/* Footer Navigation Backlink */}
      <div className="pt-4 flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#243044] text-xs font-mono">
        <Link href="/" className="text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1">
          ← Return to CyberTube Home
        </Link>
        <Link href="/terms" className="text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1">
          Terms of Service →
        </Link>
      </div>
    </div>
  );
}
