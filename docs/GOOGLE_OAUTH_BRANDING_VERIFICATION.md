# Google Cloud OAuth Branding & Domain Verification Guide

**Application:** CyberTube  
**Google Cloud Project:** `cybertube-513811`  
**Configured Homepage:** `https://cybertube-mu.vercel.app/`  
**Privacy Policy:** `https://cybertube-mu.vercel.app/privacy`  
**Terms of Service:** `https://cybertube-mu.vercel.app/terms`  

---

## 1. Problem Diagnosis & Root Cause

Google OAuth Verification rejected the branding submission with the finding:
> **"The website of your homepage URL is not registered to you."**

### Root Cause Analysis
Google Cloud requires proof of ownership for any homepage, privacy policy, or terms domain configured in the OAuth Consent Screen. Because `cybertube-mu.vercel.app` is hosted on Vercel's public domain (`*.vercel.app`), Google cannot verify ownership automatically. Domain ownership must be explicitly established via **Google Search Console** using the Google account associated with the Google Cloud OAuth project (`cybertube-513811`).

---

## 2. Implementation: Google Search Console HTML-Tag Verification

CyberTube supports Google's official **HTML tag verification method** natively within the Next.js App Router root metadata configuration in `app/layout.tsx`.

### Code Architecture (`app/layout.tsx`)
```ts
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL('https://cybertube-mu.vercel.app'),
  title: 'CyberTube — Cybersecurity Learning Platform',
  description: '...',
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};
```

### Safety & Integrity Guards
- **Zero Placeholder Leakage:** When `GOOGLE_SITE_VERIFICATION` is unset or empty, Next.js renders **no** verification tag. No dummy or placeholder tokens are ever emitted to production HTML.
- **Fail-Safe Output:** Only the exact token provided by Google Search Console is rendered:
  ```html
  <meta name="google-site-verification" content="<OPERATOR_GOOGLE_VERIFICATION_TOKEN>" />
  ```
- **Environment Isolation:** `.env.example` documents `GOOGLE_SITE_VERIFICATION=` as an unconfigured template variable. Production tokens are managed exclusively via Vercel Production Environment Variables.

---

## 3. Operator Instructions: Establishing Domain Ownership

To resolve Google's finding, the project operator must perform the following steps:

### Step 1: Add Property in Google Search Console
1. Log in to [Google Search Console](https://search.google.com/search-console/) using the **same Google account** that owns or administers the Google Cloud Project (`cybertube-513811`).
2. Click **Add Property**.
3. Under **URL prefix**, enter the exact production URL:
   ```
   https://cybertube-mu.vercel.app/
   ```
4. Click **Continue**.

### Step 2: Select "HTML tag" Verification Method
1. In the verification dialog, expand **HTML tag** (do not select HTML file upload or Google Analytics).
2. Google will provide a meta tag structured as:
   ```html
   <meta name="google-site-verification" content="ABC123xyz_your_exact_token_here" />
   ```
3. Copy **only the content token value** (e.g., `ABC123xyz_your_exact_token_here`).

### Step 3: Configure Vercel Production Environment Variable
1. Open the [Vercel Dashboard](https://vercel.com/) $\rightarrow$ Project **CyberTube** $\rightarrow$ **Settings** $\rightarrow$ **Environment Variables**.
2. Add a new variable:
   - **Key:** `GOOGLE_SITE_VERIFICATION`
   - **Value:** `<your-exact-token-from-step-2>`
   - **Environment:** Select **Production** only.
3. Click **Save**.
4. Trigger a production redeployment so the updated environment variable is baked into the build:
   - Go to **Deployments** $\rightarrow$ Click the latest Production deployment $\rightarrow$ **Redeploy**.

### Step 4: Verify in Search Console
1. Return to Google Search Console.
2. Click **Verify**.
3. Google Search Console will inspect `https://cybertube-mu.vercel.app/` and confirm ownership.

---

## 4. How to Verify the Deployed Production HTML

Before re-submitting to Google Cloud OAuth Verification, confirm the tag is live:

1. In a private / incognito browser window, navigate to `https://cybertube-mu.vercel.app/` without logging in.
2. View the page source (right-click $\rightarrow$ **View Page Source** or `Ctrl+U` / `Cmd+Option+U`).
3. Search for `google-site-verification` inside the document `<head>`.
4. Confirm:
   - The `<meta name="google-site-verification" content="..." />` tag exists within `<head>`.
   - The `content` value matches the token from Google Search Console character-for-character.
   - The page returns HTTP 200 OK.
   - No authentication is required to access the homepage.

---

## 5. Domain & OAuth Configuration Audit

| Property | Value | Provider / Ownership |
| :--- | :--- | :--- |
| **Canonical Homepage** | `https://cybertube-mu.vercel.app/` | Vercel (Production deployment) |
| **Privacy Policy** | `https://cybertube-mu.vercel.app/privacy` | CyberTube (returns HTTP 200) |
| **Terms of Service** | `https://cybertube-mu.vercel.app/terms` | CyberTube (returns HTTP 200) |
| **OAuth Callback Handler** | `https://cybertube-mu.vercel.app/auth/callback` | Next.js Server Route Handler |
| **Supabase Project Auth URL** | `https://<supabase-ref>.supabase.co/auth/v1/callback` | Supabase Managed Cloud Auth |
| **Authorized JavaScript Origins** | `https://cybertube-mu.vercel.app` | Configured in Google Cloud Console |
| **Authorized Redirect URIs** | `https://<supabase-ref>.supabase.co/auth/v1/callback` | Configured in Google Cloud Console |

### Critical Domain Boundaries:
1. **Never Add Preview Domains to Production OAuth:**
   - URLs like `cybertube-*-codex-arun.vercel.app` are ephemeral test deployments. Adding them to production OAuth will trigger branding review failures and violate Google's Authorized Domains policy.
2. **Third-Party Domains vs. First-Party Domains:**
   - `*.supabase.co` is operated by Supabase Inc. CyberTube uses it strictly for Supabase Auth redirect negotiation. Google Cloud allows authorized redirect URIs on approved third-party auth platforms without requiring domain ownership of `supabase.co`.
   - `cybertube-mu.vercel.app` is the customer-facing application origin and requires domain ownership verification in Google Search Console.

### Custom Domain Alternative (If Vercel Subdomain is Disallowed)
If Google Trust & Safety determines that `*.vercel.app` subdomains cannot be verified for production OAuth consent (due to shared root domain policies across multi-tenant platforms):
- **Remedy:** Acquire a custom domain (e.g. `cybertube.dev`, `cybertube.org`, or `cybertube.app`).
- **Configuration:** Add DNS `TXT` verification record to the domain's DNS provider for Domain Property Search Console verification.
- **Update:** Update `NEXT_PUBLIC_SITE_URL` and Google Cloud OAuth Authorized Domains to the custom domain.

---

## 6. Public Legal & Contact Disclosures Audit

### OAuth Scope Disclosure
- CyberTube requests strictly basic identity scopes:
  - `openid` (User identification)
  - `email` (Account creation & progress sync)
  - `profile` (Display name & avatar initialization)
- CyberTube requests **zero extended or sensitive scopes** (no access to Gmail, Google Drive, Google Calendar, YouTube management, or contacts).
- Access can be revoked by the user at any time via [Google Account Permissions](https://myaccount.google.com/permissions).

### Contact Channels
- **Privacy & Legal Inquiries:** `privacy@cybertube.org`
- **Technical Support & Bug Reports:** [GitHub Issue Tracker](https://github.com/arun-codex/CyberTube/issues)
- **Account Deletion Requests:** Direct email to `privacy@cybertube.org` with subject `Account Deletion Request`. Deletion permanently purges user records from `auth.users`, `public.profiles`, `public.user_lesson_progress`, `public.user_bookmarks`, and private storage avatars.
- **Decommissioned:** All references to `.local` placeholder addresses (e.g., `support@cybertube.local`) have been permanently removed.

