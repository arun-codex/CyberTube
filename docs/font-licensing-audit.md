# CYBERTUBE FONT LICENSING & ATTRIBUTION AUDIT

Date: November 2026
Project: CyberTube (Next.js 14)

---

## 1. Orbitron
- **Designer / Foundry:** Matt McInerney
- **License:** SIL Open Font License, Version 1.1 (OFL-1.1)
- **Redistribution & Commercial Use:** Permitted. Free for personal and commercial digital applications, web embeddings, and derivative software.
- **Hosted via:** Next.js Google Fonts optimizer (`next/font/google`). Self-hosted at build time.

## 2. Rajdhani
- **Designer / Foundry:** Indian Type Foundry (ITF)
- **License:** SIL Open Font License, Version 1.1 (OFL-1.1)
- **Redistribution & Commercial Use:** Permitted. Free for commercial web applications, SaaS dashboards, and digital distribution.
- **Hosted via:** Next.js Google Fonts optimizer (`next/font/google`). Self-hosted at build time.

## 3. Rubik
- **Designer / Foundry:** Hubert & Fischer, Meir Sadan, Cyreal
- **License:** SIL Open Font License, Version 1.1 (OFL-1.1)
- **Redistribution & Commercial Use:** Permitted. Unrestricted free commercial software license.
- **Hosted via:** Next.js Google Fonts optimizer (`next/font/google`). Self-hosted at build time.

## 4. IBM Plex Mono
- **Designer / Foundry:** Mike Abbink, Bold Monday (IBM)
- **License:** SIL Open Font License, Version 1.1 (OFL-1.1)
- **Redistribution & Commercial Use:** Permitted. Full open-source commercial distribution allowed under OFL.
- **Hosted via:** Next.js Google Fonts optimizer (`next/font/google`). Self-hosted at build time.

---

## 5. Cyberpunk (Cyberpunk-Regular.ttf)
- **Source:** User-uploaded TrueType font (`Cyberpunk-Regular.ttf`, 16.68 KB).
- **Classification:** Display decorative accent font.
- **Canonical Asset Location:** `src/fonts/Cyberpunk-Regular.ttf`.
- **Usage Policy in CyberTube:**
  1. Kept strictly optional / auxiliary via CSS variable `--font-cyberpunk`.
  2. Not bundled as a mandatory blocking resource on critical learning routes.
  3. Preload is disabled (`preload: false`), with automated fallback to `Orbitron, system-ui, sans-serif`.
  4. Restricted from all body prose, courses, forms, metadata, and lesson navigation.
- **Commercial Release Action Item:**
  Before deploying CyberTube to a paid commercial tier or redistributing standalone binaries, verify author attribution and license terms with the font author/foundry.

