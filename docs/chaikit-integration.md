# CyberTube × ChaiKit Integration Guide

This guide documents the integration of the **ChaiKit** universal supporter widget into **CyberTube**.

---

## 1. Architectural Overview & Philosophy

CyberTube is a strictly free, community-first cybersecurity educational platform providing video courses, hands-on packet analysis, bug bounty study resources, and practical lab roadmaps.

To support the server hosting, continuous curriculum updates, and open learning infrastructure without introducing paywalls, advertisements, or tracking cookies, CyberTube integrates **ChaiKit** for voluntary supporter contributions.

- **Non-commercial learning guarantee:** All courses, labs, and tools remain 100% free. No feature, badge, certificate, or learning material is gated behind contributions.
- **Independent repositories:** CyberTube (`https://github.com/arun-codex/CyberTube`) and ChaiKit (`https://github.com/arun-codex/chaikit`) remain completely independent open-source projects. CyberTube is not turned into a fundraising SaaS.
- **Direct UPI architecture:** Live contributions route directly via standard NPCI Unified Payments Interface (`upi://pay`), eliminating intermediary merchant cuts.

---

## 2. Pinned Vendor Artifact & Checksum

Because `@chaikit/core`, `@chaikit/widget`, and `@chaikit/react` are not yet published to the public npm registry, CyberTube vendors the self-contained IIFE browser bundle built directly from a verified ChaiKit source commit.

| Attribute | Verified Value |
|---|---|
| **Source Repository** | `https://github.com/arun-codex/chaikit` |
| **Verified Source Commit** | `c9280de843f2d4cf6d8333664ad5a16db2b04001` |
| **Local Vendor File** | `public/vendor/chaikit/chaikit.iife.js` |
| **Artifact SHA-256 Checksum** | `2B7AA0E95539D39F305976894DF1A1018E9A6DCA2BCBAA5381221F7CD0A761FA` |
| **Bundle Size** | 80,950 bytes (~23 KB gzipped) |
| **License** | MIT License (Copyright ChaiKit Contributors) |

### Reproducible Update Procedure

When updating the ChaiKit vendor bundle in the future:
1. Clone `https://github.com/arun-codex/chaikit.git` at the target commit.
2. Run `npm install` and `npm run build`.
3. Verify the generated bundle: `packages/widget/dist/chaikit.iife.js`.
4. Copy the bundle to `public/vendor/chaikit/chaikit.iife.js`.
5. Compute and update the SHA-256 checksum using `Get-FileHash -Algorithm SHA256`.
6. Run `npm test` and `npx tsc --noEmit` to verify regression safety.

When ChaiKit is published to npm, CyberTube can seamlessly migrate to the pinned `@chaikit/react` package.

---

## 3. Owner Configuration

All configuration is centralized in `src/lib/chaikit/config.ts`.

| Setting | Value | Notes |
|---|---|---|
| **Public Creator Name** | `CyberTube` | Displayed on the supporter popup and page header |
| **Receiving UPI ID** | `aruninzone@ptaxis` | Intended owner recipient |
| **Expected Bank Payee** | `Arun Kumar` | Resolved payee name for banking verification |
| **Payment Note** | `Support CyberTube` | UPI transaction note parameter |
| **Support Message** | `Support free cybersecurity education. Buy us a chai!` | Subtitle on modal and support page |
| **Button Text** | `Support CyberTube ☕` | Floating launcher label |
| **Widget Theme** | `dark` (with `cream` for light mode) | Styled to match CyberTube theme |
| **Widget Position** | `bottom-right` | Floats safely above navigation controls |
| **3D Chai Animation** | `enabled` (lazy WebGL) | Procedural 3D stage initialized on demand |
| **Custom Amount** | `enabled` | Allows arbitrary supporter contribution |
| **Demo Mode** | `true` | **Safe non-payable preview active** |
| **Live Payments** | `false` | **STRICTLY DISABLED pending owner approval** |

---

## 4. Contribution Tiers

ChaiKit uses exact integer paise representation internally to prevent floating-point arithmetic errors.

| Tier ID | Tier Name | Rupees | Paise | Description |
|---|---|---|---|---|
| `cutting` | Cutting Chai | ₹10 | 1,000 | A small gesture of appreciation for free lessons |
| `kadak` | Kadak Chai *(Default)* | ₹25 | 2,500 | A stronger cup to support ongoing platform development |
| `tandoori` | Tandoori Chai | ₹50 | 5,000 | A warm contribution to free cybersecurity resources |
| `premium` | Premium Chai | ₹100 | 10,000 | A generous chai to keep education accessible to all |

---

## 5. Security & Payment Safety Architecture

### Distinction Between Creator Name and Bank Payee Name
- `creatorName` (`CyberTube`) is displayed in UI modals and headers.
- `paymentPayeeName` (`Arun Kumar`) is passed to the UPI `pn` parameter so banking apps correctly show the account holder's name.
- Supporter banking apps independently resolve `aruninzone@ptaxis` to the verified bank account holder.

### Safe Demonstration Mode (Default)
In demo mode:
- The QR code encodes an educational preview payload (`https://arun-codex.github.io/chaikit/#demo-preview-non-payable`).
- No `upi://pay` deep link is generated.
- No real recipient VPA is copied.
- No bank apps are launched.
- Clear `DEMO ONLY • NON-PAYABLE` badges are rendered over the QR code.

### Activation Checklist for Live Payments
Live payments must **NEVER** be enabled until the following conditions are met:
1. Owner explicitly approves enabling live payments in production.
2. Physical banking app test verifies that `aruninzone@ptaxis` resolves to `Arun Kumar`.
3. Set environment variables on Vercel:
   ```dotenv
   CYBERTUBE_SUPPORT_UPI_ID=aruninzone@ptaxis
   CYBERTUBE_SUPPORT_EXPECTED_PAYEE=Arun Kumar
   CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED=true
   ```
4. Verify non-payable demo indicator disappears and scannable QR routes to verified payee.

---

## 6. Layout & Route Integration

1. **Root Layout (`app/layout.tsx`):**
   - Mounts `<CyberTubeChaiSupport />` globally.
   - Suppresses the floating launcher on `/support` to avoid duplicate UI.
   - Positioned at `bottom-right` with `z-index: 50`, respecting safe areas.

2. **Dedicated Support Page (`app/support/page.tsx`):**
   - Accessible via `/support`.
   - Embeds the genuine ChaiKit Web Component in inline mode: `<chai-support position="inline" ... />`.
   - Displays all four chai tiers, custom amount input, lazy-loaded 3D cup visualizer, and payment safety guidelines.

3. **Header (`src/components/Header.tsx`):**
   - Added **Support ☕** link in desktop primary navigation.
   - Added in mobile navigation drawer.

4. **Footer (`src/components/Footer.tsx`):**
   - Added **Support CyberTube ☕** link in Governance & Integrity section.
   - Added in bottom legal navigation row.

5. **Global Search (`src/lib/search.ts`):**
   - Indexed `/support` so users typing "support", "chai", or "donate" in `Ctrl+K` find the support page immediately.

---

## 7. How to Disable ChaiKit Safely

To completely disable ChaiKit without code changes:
Set the environment variable:
```dotenv
NEXT_PUBLIC_CHAIKIT_WIDGET_ENABLED=false
```
The client component will immediately return `null` and defer script loading entirely.
