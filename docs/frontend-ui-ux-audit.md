# CyberTube — Complete Frontend UI/UX Audit

**Date:** November 2026  
**Auditor:** Design System Architect, Frontend & Accessibility Engineer  
**Baseline Commit:** `6c62ab2`  
**Branch:** `feature/storytelling-video-lessons-quizzes`  
**Framework:** Next.js 15.5.29 / React 18.3.1 / Tailwind CSS 3.4.14 / Supabase SSR  

---

## 1. Executive Summary & Problem Diagnosis

CyberTube is a curated cybersecurity education platform with rich learning paths, course curricula, practical labs, and search cataloging. However, an in-depth audit of the interface across 32 viewports and both color themes reveals substantial design debt:

1. **Information Architecture Fragmentation**:
   - The desktop navigation bar contains 12 raw links in a single row (`/learning-paths`, `/library`, `/skills`, `/certifications`, `/careers`, `/labs`, `/cheat-sheets`, `/glossary`, `/courses`, `/discover`, `/domains`, `/saved`), with arbitrary `hidden xl:flex` hiding links on standard 1024–1280px laptop screens.
   - Destinations lack hierarchical grouping (e.g. *Learn*, *Explore*, *Practice*, *Reference*).
2. **Typography & Readability**:
   - Competing display font declarations (`font-orbitron`, `font-space-grotesk`, `font-rubik`, `font-rajdhani`, `font-mono`) lead to inconsistent header aesthetics across routes.
   - Overuse of 10–11px uppercase monospace labels with excessive letter spacing reduces legibility for critical technical metadata.
3. **Color World & Theme Cohesion**:
   - Global CSS relies on deep `.dark` specificity hacks (`!important` overrides) to catch legacy inline Tailwind classes like `bg-[#0e0e17]`, `border-[#E2E8F0]`, and `text-[#303055]`.
   - Primitive UI components (`Button`, `Card`, `Badge`) use hardcoded hex values (`#303055`, `#e8e8f2`, `#e4e4ed`) rather than semantic CSS tokens (`var(--surface)`, `var(--text-primary)`, `var(--border)`).
4. **Interactive States & Accessibility**:
   - Touch targets on several secondary mobile links fall below the 44×44px recommendation.
   - Mobile drawer is a plain block element rather than a focus-trapped, escape-closeable accessible overlay.
5. **Hero & Landing Experience**:
   - Fake terminal elements (`$ start-here` with blinking cyan bar) distract from the core value proposition.
   - Clear value hierarchy is needed: What is CyberTube, who is it for, and the single primary action to start learning.

---

## 2. Route-by-Route Findings

### A. Global Header & Shell (`src/components/Header.tsx`, `Footer.tsx`)
- **Nav Congestion**: 12 un-grouped items crammed into a 64px bar.
- **Responsive Jump**: Screen widths between 1024px and 1279px silently drop 5 navigation items (`Skills`, `Certs`, `Careers`, `Cheat Sheets`, `Glossary`) without any overflow indicator or dropdown.
- **Mobile Drawer**: Opens inline below the header, pushing page content down rather than acting as an intentional overlay or dialog. Missing Escape-key listener and focus restoration.
- **Footer**: 5 columns with tiny 11px text and repeated copyright notices. Needs clean semantic grouping.

### B. Homepage (`app/page.tsx`)
- **Hero Section**: Terminal prompt badge with arbitrary animated cursor. Dual CTAs lack visual contrast separation.
- **Content Hierarchy**: Stacks "Start-Here Path", "Value Cards", "Featured Courses", "Featured Paths", "Ethics Banner", and "Legal Labs" without clear section breathing room.
- **Cards**: Inconsistent border radiuses (some `rounded-2xl`, some `rounded-xl`, some `rounded-md`).

### C. Discover & Library (`app/discover/page.tsx`, `app/library/page.tsx`)
- **Facet Controls**: Category pills and domain filters lack consistent active-pill styling.
- **Search Empty State**: Needs a clearer reset action.
- **Card Metadata**: Difficulty, pricing, and provider badges use disparate styles between `ResourceCard` and `LibraryCard`.

### D. Courses & Learning Paths (`app/courses/page.tsx`, `app/learning-paths/page.tsx`)
- **Course Directory**: Cards use raw `<img>` tags triggering Next.js image optimization warnings.
- **Curriculum Sidebar**: Good progress persistence, but sticky header and lesson list borders need unified semantic border tokens.

### E. Labs, Skills, Certs, Glossary (`app/labs`, `app/skills`, `app/glossary`, `app/cheat-sheets`)
- **Layout Consistency**: Each page implements its own custom header banner rather than a standard PageHeader component.
- **Filter Bars**: Inconsistent search bar heights and border treatments.

---

## 3. Prioritized Action Plan

| Priority | Scope | Objective |
|---|---|---|
| **P0** | **Design System Tokens** | Unify `app/globals.css`, `tailwind.config.ts`, and primitive UI components (`Button`, `Card`, `Badge`, `Input`) to pure CSS variables. Eliminate hardcoded hex codes. |
| **P0** | **Global Header & Navigation** | Reorganize 12 raw links into 4 logical groups (*Learn*, *Explore*, *Practice*, *Reference*) with clean mobile drawer and 44px touch targets. |
| **P0** | **Homepage Redesign** | Clean, technical editorial aesthetic with clear value proposition, primary/secondary CTA, and structured cybersecurity roadmaps. |
| **P1** | **Global Page Header & Reusable Shell** | Create unified `PageHeader` component for all secondary routes (Courses, Paths, Labs, Skills, Certifications, Glossary). |
| **P1** | **Courses & Library Cards** | Standardize cards with consistent hover states, badges, and responsive metadata grids. |
| **P2** | **Footer & Secondary Pages** | Streamline 4-column footer with clear legal, ethics, and platform links. |
