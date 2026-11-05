# CyberTube — Google OAuth Branding & Global Theme Consistency Remediation Report

**Date:** November 6, 2026  
**Repository:** `arun-codex/CyberTube`  
**Branch:** `feature/mern-full-stack-course-integration`  
**Base Commit:** `fb3f73d`  
**Target Pull Request:** #8 (Draft)  
**Production URL:** `https://cybertube-mu.vercel.app`

---

## 1. Executive Summary

This engineering effort resolves two critical product and platform blockers:
1. **Google OAuth Branding Verification Rejection:** Addressed Google Cloud Trust & Safety's rejection of project `cybertube-513811` ("The website of your homepage URL is not registered to you") by introducing verified domain ownership mechanics via Google Search Console HTML tag verification, documenting operator procedures, and eliminating invalid placeholder contact emails.
2. **Global Theme and Typography Inconsistency:** Resolved jarring light-mode flash, illegible text, and fragmented styling across the four primary content routes (`/courses`, `/discover`, `/domains`, `/saved`). Mapped Tailwind CSS tokens to semantic CSS custom properties, removed conflicting body styling, established consistent `font-rajdhani` typography hierarchies with category pills, and made cards, sidebars, drawers, badges, and filters fully theme-adaptive.

All changes strictly follow repository safety protocols: no production databases or environment variables were modified, no paid dependencies were added, all test suites passed (unit, Playwright E2E across desktop/tablet/mobile viewports, and production build), and PR #8 remains in **Draft** state.

---

## 2. Google OAuth Branding Status

### Root Cause Analysis
- **Google Cloud Project:** `cybertube-513811`
- **Configured Homepage URL:** `https://cybertube-mu.vercel.app/`
- **Rejection Finding:** *"The website of your homepage URL is not registered to you. Please register your website through Google Search Console by following the instructions here and then reply to this email once it is registered."*
- **Technical Context:** `vercel.app` is on the Public Suffix List (PSL). Domain-level DNS verification of `vercel.app` is impossible for individual tenants. Verification must occur at the **URL-prefix level** (`https://cybertube-mu.vercel.app/`) using HTML tag verification or HTML file upload. Previously, CyberTube lacked the meta tag hook in its root layout metadata.

### Implementation of Site Verification
- Updated `app/layout.tsx` to conditionally populate `metadata.verification.google` using the environment variable `GOOGLE_SITE_VERIFICATION`:
  ```typescript
  const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  export const metadata: Metadata = {
    // ...
    verification: googleSiteVerification
      ? {
          google: googleSiteVerification,
        }
      : undefined,
  };
  ```
- **Failsafe Design:** If `GOOGLE_SITE_VERIFICATION` is absent or empty, no `<meta name="google-site-verification">` tag is rendered. No hardcoded or dummy tokens are ever injected into HTML.
- Updated `.env.example` with clear documentation of the variable.

### Step-by-Step Operator Instructions
Full step-by-step instructions have been placed in [`docs/GOOGLE_OAUTH_BRANDING_VERIFICATION.md`](../GOOGLE_OAUTH_BRANDING_VERIFICATION.md):
1. Sign in to [Google Search Console](https://search.google.com/search-console) using the Google account associated with Google Cloud Project `cybertube-513811`.
2. Add Property -> select **URL prefix** -> enter `https://cybertube-mu.vercel.app/`.
3. Choose **HTML tag** verification -> copy the `content` token (e.g. `abc123xyz...`).
4. Add `GOOGLE_SITE_VERIFICATION=<token>` to Vercel Production Environment Variables.
5. Trigger a production redeploy.
6. Return to Google Search Console and click **Verify**.
7. In Google Cloud Console (OAuth consent screen), reply to the verification team / resubmit for verification.

### Support Contact Resolution
- Replaced placeholder `support@cybertube.local` in `app/privacy/page.tsx` and `app/terms/page.tsx` with authoritative channels:
  - Official Privacy & Compliance email: `privacy@cybertube.org`
  - Public Issue Tracker: `https://github.com/arun-codex/CyberTube`
- Maintained exact scope audit: `openid`, `email`, `profile` (all non-sensitive).

---

## 3. Global Theme Architecture

### Tailwind Configuration Changes (`tailwind.config.ts`)
Previously, semantic tokens (`canvas`, `surface`, `border`, `text`) were mapped to static hex values or mismatched color keys, forcing components to use hardcoded dark classes or default to light mode styles.

Updated `tailwind.config.ts` to map semantic utility classes directly to dynamic CSS variables:
```typescript
colors: {
  canvas: {
    DEFAULT: 'var(--canvas)',
    subtle: 'var(--surface-subtle)',
  },
  surface: {
    DEFAULT: 'var(--surface)',
    subtle: 'var(--surface-subtle)',
    muted: 'var(--surface-muted)',
    border: 'var(--border)',
    'border-strong': 'var(--border-strong)',
  },
  card: {
    DEFAULT: 'var(--card-bg)',
    hover: 'var(--card-hover)',
  },
  border: {
    DEFAULT: 'var(--border)',
    subtle: 'var(--border)',
    strong: 'var(--border-strong)',
  },
  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    muted: 'var(--text-muted)',
  },
  // Preserved cyber.* color palette for existing design system tokens
}
```

### Global Stylesheet Cleanup (`app/layout.tsx`)
- Removed conflicting body classes: `bg-white dark:bg-[#0e0e17] text-[#403f53] dark:text-[#c0c0d4]`.
- Replaced with semantic token classes: `bg-canvas text-text-secondary antialiased transition-colors duration-200`.
- Ensured `ThemeProvider` from `next-themes` configures `<html class="dark">` cleanly with attribute `class` and default theme `dark`.

### Theme Switching Mechanics
- Standardized toggle across desktop header and mobile menus using `ThemeToggle`.
- Preserves user preference in `localStorage` (`theme: dark | light | system`).
- Supports seamless client-side toggling without layout shift or hydration mismatch.

---

## 4. Route-by-Route Audit Results

### `/courses`
- **Issue:** Header banner used hardcoded light backgrounds; filter pills and catalog headers had mismatched typography and low-contrast borders.
- **Fix:** 
  - Standardized header banner with category pill (`font-mono text-xs uppercase tracking-widest text-[#0E7490] dark:text-[#22D3EE]`).
  - H1 styled with `font-rajdhani text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#E6EDF3]`.
  - Catalog tracks and filter counts styled with `bg-white dark:bg-[#121A26] border-[#e4e4ed] dark:border-[#243044]`.
  - Active tracks highlighted with cyan accent `dark:border-[#22D3EE] dark:text-[#22D3EE]`.

### `/discover`
- **Issue:** Used plain heading with hardcoded light filters; search input, select dropdowns, and mobile filter drawer were stark white in dark mode.
- **Fix:**
  - Added standardized category pill: `CYBERTUBE CURATED DIRECTORY`.
  - H1 updated to `font-rajdhani text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#E6EDF3]`.
  - Search inputs and filter selects styled with `bg-white dark:bg-[#121A26] border-[#e4e4ed] dark:border-[#243044] text-[#0F172A] dark:text-[#E6EDF3]`.
  - Empty state styled with dark-compatible iconography and text.
  - Mobile filter drawer panel updated to `bg-white dark:bg-[#121A26] border-[#e4e4ed] dark:border-[#243044]` with readable filter counts.

### `/domains`
- **Issue:** Domain grid cards had harsh light borders and low contrast in dark mode; icon backgrounds were unstyled.
- **Fix:**
  - Standardized banner with category pill: `CYBERSECURITY TRACKS & PATHWAYS`.
  - Domain cards styled with `bg-white dark:bg-[#121A26] border-[#e4e4ed] dark:border-[#243044] hover:border-[#303055] dark:hover:border-[#22D3EE]`.
  - Domain title: `font-rajdhani font-bold text-xl text-[#0F172A] dark:text-[#E6EDF3]`.
  - Explore buttons and counts adaptively themed.

### `/saved`
- **Issue:** Completely lacked banner hierarchy; white cards in dark mode; filter bars washed out.
- **Fix:**
  - Added standardized banner with category pill: `LEARNER LIBRARY & BOOKMARKS`.
  - H1 styled with `font-rajdhani text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#E6EDF3]`.
  - Filter and sort controls match `/discover` theme styling.
  - Empty bookmarks state styled with adaptive dark containers and actionable "Explore Courses" button.

---

## 5. Typography Hierarchy Standardization

| Element | Previous Inconsistency | Standardized Specification |
| :--- | :--- | :--- |
| **Page Title (H1)** | Mismatched font weights and sizing (`text-2xl` sans-serif on `/discover`, `/saved`) | `font-rajdhani text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#E6EDF3]` |
| **Category Pill** | Missing on `/discover` and `/saved`; inconsistent colors on `/courses` | `font-mono text-xs uppercase tracking-widest text-[#0E7490] dark:text-[#22D3EE] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 border border-[#0E7490]/20 dark:border-[#22D3EE]/20 px-2.5 py-0.5 rounded-full inline-block` |
| **Card Title (H2/H3)** | Varying font families and contrast | `font-rajdhani font-bold text-lg text-[#0F172A] dark:text-[#E6EDF3] group-hover:text-[#0E7490] dark:group-hover:text-[#22D3EE]` |
| **Metadata & Badges** | Unstyled text, invisible borders | `font-mono text-xs text-[#627282] dark:text-[#9BA8B7]` with semantic tag backgrounds |

---

## 6. Component Improvements

1. **`CourseCard` (`src/components/courses/CourseCard.tsx`):**
   - Converted card wrapper to `bg-white dark:bg-[#121A26] border-[#e4e4ed] dark:border-[#243044] hover:border-[#303055] dark:hover:border-[#22D3EE]`.
   - Card title standardized to `font-rajdhani font-bold text-lg text-[#0F172A] dark:text-[#E6EDF3]`.
   - Bottom metadata footer given top border: `border-t border-[#e4e4ed] dark:border-[#243044] text-[#627282] dark:text-[#9BA8B7]`.
2. **`ResourceCard` (`src/components/ResourceCard.tsx`):**
   - Converted article card wrapper to `bg-white dark:bg-[#121A26] border-[#e4e4ed] dark:border-[#243044] hover:border-[#303055] dark:hover:border-[#22D3EE]`.
   - Card title: `font-rajdhani font-bold text-lg text-[#0F172A] dark:text-[#E6EDF3]`.
   - Bookmark button styled with `bg-white/90 dark:bg-[#1A2433]/90 border-[#e4e4ed] dark:border-[#243044] text-[#627282] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3]`.
   - Tag badges given dark surface support: `bg-[#f4f4f9] dark:bg-[#1A2433] text-[#627282] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044]`.
3. **`FilterSidebar` (`src/components/FilterSidebar.tsx`):**
   - Section headers: `font-mono text-xs uppercase tracking-wider text-[#627282] dark:text-[#9BA8B7]`.
   - Checkbox labels: `text-[#303055] dark:text-[#E6EDF3]`.
   - Count badges: `text-[#627282] dark:text-[#9BA8B7]`.
   - Search bar: `bg-white dark:bg-[#121A26] border-[#e4e4ed] dark:border-[#243044] text-[#0F172A] dark:text-[#E6EDF3] placeholder:text-[#627282] dark:placeholder:text-[#9BA8B7]`.
4. **Mobile Filter Drawer (`app/discover/page.tsx`):**
   - Drawer container: `bg-white dark:bg-[#121A26] border-t border-[#e4e4ed] dark:border-[#243044] text-[#0F172A] dark:text-[#E6EDF3]`.
   - Close button and clear button themed for maximum legibility.
5. **`Badge` (`src/components/ui/Badge.tsx`):**
   - Default badge variant updated with `dark:bg-[#1A2433] dark:text-[#9BA8B7] dark:border-[#243044]`.

---

## 7. Automated Test Suite Results

### Playwright E2E Suite (`tests/26_google_oauth_and_theme_consistency.spec.ts`)
Created a dedicated comprehensive test suite with 15 test cases covering:
1. **Google Site Verification:**
   - Omits meta tag when `GOOGLE_SITE_VERIFICATION` is unset.
   - Accurately renders meta tag when configured.
2. **Contact Email Remediation:**
   - Validates `/privacy` and `/terms` contain `privacy@cybertube.org` and no `.local` placeholders.
3. **Route Dark Theme Verification:**
   - Tests `/courses`, `/discover`, `/domains`, and `/saved` for `dark` class on root HTML, correct H1 typography (`font-rajdhani`), and card dark surface styling.
4. **Responsive Viewport Testing:**
   - Mobile (375x667): Validates drawer open/close, mobile layout, and theme styling.
   - Tablet (768x1024): Validates grid scaling and navigation responsiveness.
   - Desktop (1440x900): Validates multi-column grid, sidebar, and hover states.
5. **Theme Switching & Persistence:**
   - Toggles light to dark via ThemeToggle UI.
   - Navigates across routes and asserts dark mode persistence in `localStorage`.
6. **Accessibility & Color Contrast:**
   - Asserts page titles, category pills, card titles, and badges maintain contrast against backgrounds.

**Execution Results:**
- `npx playwright test tests/26_google_oauth_and_theme_consistency.spec.ts`: **15 passed** (100% pass rate).
- `npx playwright test tests/20_privacy_and_terms.spec.ts`: **4 passed** (100% pass rate).
- `npx playwright test tests/25_wireshark_course_integration.spec.ts`: **16 passed** (100% pass rate).
- Full regression suites (`24`, `23`, `03`, `18`): **All passed**.

---

## 8. Regressions Prevented

- **Preservation of Existing Courses:** Wireshark, Networking for Hackers 2027, and MERN Full Stack courses display all lessons, modules, and video players without distortion.
- **Preservation of Authentication Flows:** SocialAuthButtons, OAuth callback routes, and canonical production URL redirects continue to function as specified in Phase 15.
- **Preservation of Dark Theme Baseline:** Existing dark mode tokens (`cyber.*`) remain backward-compatible; no custom classes were broken.

---

## 9. Production Environment Safety Verification

- [x] No production databases or tables were modified.
- [x] No remote Supabase migrations were applied.
- [x] No production environment variables or secrets were altered.
- [x] No credentials or tokens were hardcoded or committed.
- [x] PR #8 remains in **Draft** state.
- [x] No paid services or new external npm dependencies were introduced.

---

## 10. Verification Steps for Reviewers

1. **Verify TypeScript & Linting:**
   ```bash
   npx tsc --noEmit
   npm run lint
   ```
2. **Verify Playwright Suites:**
   ```bash
   npx playwright test tests/26_google_oauth_and_theme_consistency.spec.ts
   npx playwright test tests/20_privacy_and_terms.spec.ts
   ```
3. **Verify Production Build:**
   ```bash
   npm run build
   ```
4. **Visual Inspection:**
   - Launch dev server: `npm run dev`.
   - Open `http://localhost:3000/courses`, `/discover`, `/domains`, and `/saved`.
   - Toggle theme between Light and Dark mode using the header toggle.
   - Verify smooth transitions, high-contrast text, Rajdhani headings, and dark card surfaces.

---

## 11. Files Modified

| File | Changes Made | Rationale |
| :--- | :--- | :--- |
| `app/layout.tsx` | Added conditional `metadata.verification.google`; replaced hardcoded body colors with `bg-canvas text-text-secondary`. | Enables Google Search Console site verification; cleans up global dark mode background. |
| `.env.example` | Added `GOOGLE_SITE_VERIFICATION` documentation. | Guides operator setup for Google verification token. |
| `tailwind.config.ts` | Mapped `canvas`, `surface`, `card`, `border`, `text` tokens to CSS variables. | Unifies Tailwind utility classes with CSS variables across themes. |
| `src/components/courses/CoursesDirectoryView.tsx` | Added category pill, `font-rajdhani` H1, theme-adaptive track tabs. | Eliminates light mode bleed on `/courses`. |
| `src/components/courses/CourseCard.tsx` | Added dark background, border, title styling, and footer border. | Prevents washed-out course cards in dark theme. |
| `src/components/ResourceCard.tsx` | Replaced light backgrounds with `bg-white dark:bg-[#121A26]`; themed bookmark button and tags. | Prevents light cards on `/discover` and `/saved`. |
| `src/components/FilterSidebar.tsx` | Added dark text, borders, and input styling for categories and search. | Resolves illegible sidebar controls in dark theme. |
| `src/components/ui/Badge.tsx` | Added dark surface and border variants. | Prevents contrast failure on default badges. |
| `app/discover/page.tsx` | Standardized header banner, search bar, select dropdowns, empty state, and mobile drawer. | Unifies `/discover` with global theme and typography hierarchy. |
| `app/domains/page.tsx` | Standardized header banner, domain cards, icon containers, and action links. | Unifies `/domains` route styling. |
| `app/saved/page.tsx` | Added standardized header banner, themed filter bar, and empty bookmarks state. | Unifies `/saved` route styling. |
| `app/privacy/page.tsx` | Replaced `support@cybertube.local` with `privacy@cybertube.org` and GitHub repo link. | Resolves Google OAuth branding contact compliance. |
| `app/terms/page.tsx` | Replaced `support@cybertube.local` with `privacy@cybertube.org` and GitHub repo link. | Resolves Google OAuth branding contact compliance. |
| `tests/20_privacy_and_terms.spec.ts` | Updated assertion to expect valid repository issue tracker URL. | Aligns regression test with updated contact channels. |

---

## 12. Files Created

| File | Purpose |
| :--- | :--- |
| `docs/GOOGLE_OAUTH_BRANDING_VERIFICATION.md` | Comprehensive operational guide for Google Cloud Project `cybertube-513811` verification in Google Search Console. |
| `tests/26_google_oauth_and_theme_consistency.spec.ts` | End-to-end Playwright test suite for site verification, email remediation, 4 routes dark theme, viewports, theme persistence, and typography. |
| `docs/reports/GOOGLE_OAUTH_AND_THEME_CONSISTENCY_FIX.md` | Formal delivery report detailing all 13 required verification areas. |

---

## 13. Recommended Next Steps for PR #8 Maintainers

1. **Configure Google Search Console in Vercel:**
   - Follow instructions in `docs/GOOGLE_OAUTH_BRANDING_VERIFICATION.md` to acquire the Google Search Console verification token for `https://cybertube-mu.vercel.app/`.
   - Set `GOOGLE_SITE_VERIFICATION=<token>` in Vercel Production Environment Variables.
2. **Trigger Production Redeploy & Verify in Search Console:**
   - Once deployed, click **Verify** in Google Search Console to complete domain ownership.
3. **Resubmit Google OAuth Branding:**
   - Reply to the Google Cloud Trust & Safety team noting that Search Console domain ownership has been established.
4. **Maintain Draft PR State:**
   - PR #8 should remain in Draft until maintainers approve merging into `main`.
