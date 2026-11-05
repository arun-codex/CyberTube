# CyberTube Typography & Font Licensing Ledger

This ledger details the legal licensing, copyright ownership, upstream repository provenance, and distribution permissions for all self-hosted font assets in CyberTube.

---

## 1. Verified SIL Open Font License 1.1 Families

All web fonts deployed in CyberTube are strictly distributed under the terms of the **SIL Open Font License (OFL), Version 1.1**.

### 1.1 Orbitron
- **Font Family:** Orbitron
- **Upstream Author / Designer:** Matt McInerney
- **Copyright:** Copyright (c) 2009 Matt McInerney (matt@theleagueofmoveabletype.com)
- **Official Source Repository:** https://github.com/theleagueof/orbitron
- **Google Fonts Catalog:** https://fonts.google.com/specimen/Orbitron
- **License File:** `src/fonts/licenses/OFL-Orbitron.txt`
- **Included Files:**
  - `src/fonts/orbitron-600.woff2` (SemiBold 600)
  - `src/fonts/orbitron-700.woff2` (Bold 700)

### 1.2 Rajdhani
- **Font Family:** Rajdhani
- **Upstream Author / Designer:** Indian Type Foundry (ITF)
- **Copyright:** Copyright (c) 2014 Indian Type Foundry (info@indiantypefoundry.com)
- **Official Source Repository:** https://github.com/itfoundry/rajdhani
- **Google Fonts Catalog:** https://fonts.google.com/specimen/Rajdhani
- **License File:** `src/fonts/licenses/OFL-Rajdhani.txt`
- **Included Files:**
  - `src/fonts/rajdhani-600.woff2` (SemiBold 600)
  - `src/fonts/rajdhani-700.woff2` (Bold 700)

### 1.3 Rubik
- **Font Family:** Rubik
- **Upstream Authors / Designers:** Hubert & Fischer, Meir Sadan, Cyreal
- **Copyright:** Copyright (c) 2015 Hubert and Fischer, Meir Sadan, Cyreal (contact@cyreal.org)
- **Official Source Repository:** https://github.com/googlefonts/rubik
- **Google Fonts Catalog:** https://fonts.google.com/specimen/Rubik
- **License File:** `src/fonts/licenses/OFL-Rubik.txt`
- **Included Files:**
  - `src/fonts/rubik-400.woff2` (Regular 400)
  - `src/fonts/rubik-500.woff2` (Medium 500)
  - `src/fonts/rubik-600.woff2` (SemiBold 600)

### 1.4 IBM Plex Mono
- **Font Family:** IBM Plex Mono
- **Upstream Author / Designer:** Mike Abbink, Bold Monday
- **Copyright:** Copyright (c) 2017 IBM Corp. with Reserved Font Name "Plex"
- **Official Source Repository:** https://github.com/IBM/plex
- **Google Fonts Catalog:** https://fonts.google.com/specimen/IBM+Plex+Mono
- **License File:** `src/fonts/licenses/OFL-IBMPlexMono.txt`
- **Included Files:**
  - `src/fonts/ibm-plex-mono-400.woff2` (Regular 400)
  - `src/fonts/ibm-plex-mono-500.woff2` (Medium 500)

---

## 2. Cyberpunk-Regular.ttf Audit & Decommissioning

### 2.1 License Investigation
- **File Checked:** `src/fonts/Cyberpunk-Regular.ttf`
- **Inspection Method:** OpenType binary table `name` record extraction.
- **Findings:**
  - Copyright (Name ID 0): `undefined`
  - Manufacturer (Name ID 8): `undefined`
  - Designer (Name ID 9): `undefined`
  - License Description (Name ID 13): `undefined`
  - License URL (Name ID 14): `undefined`
- **Legal Risk:** The origin and distribution rights for `Cyberpunk-Regular.ttf` cannot be authoritatively established.

### 2.2 Remediation Decision
In strict compliance with Phase 13.9 requirements ("If its distribution license cannot be verified, remove it from the application font configuration or replace it with a clearly licensed alternative"):
- `Cyberpunk-Regular.ttf` has been **removed from the repository**.
- In `tailwind.config.ts` and `src/fonts/index.ts`, `cyberpunk` is safely aliased to `orbitron` (the verified OFL-licensed futuristic display face).
- `app/typography-preview/page.tsx` has been updated to reflect the verified OFL typography system without unverified assets.

