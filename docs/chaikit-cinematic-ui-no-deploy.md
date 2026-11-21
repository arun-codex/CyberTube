# Chai Studio — CyberTube × ChaiKit design upgrade (no deployment)

**Status:** design branch only, no merge or deployment approved.  
**Branch:** `feat/chaikit-cinematic-ui-no-deploy`  
**Based on:** `c457d472` (`main` at start).  
**Upstream:** https://github.com/arun-codex/chaikit  
**ChaiKit bundle:** existing pinned `public/vendor/chaikit/chaikit.iife.js`, with SHA-256 verified by `test/chaikit-integration.test.ts`. No vendor bundle edits and no unverified CDN dependencies.

## Design direction

The provided screenshots highlighted a mismatch: CyberTube's bright, utility-style preview wrapper versus ChaiKit's warm, creator-centric dark palette. This update intentionally combines:
- ChaiKit's **real** four-tier selector and optional WebGL chai scene; keep its QR/custom amount/payment logic inside the vetted custom element;
- friendly Buy Me a Coffee–style voluntary support messaging and clear tier amounts, without copying copyrighted artwork, proprietary assets, or UI source;
- CyberTube's self-hosted **Rajdhani** headings, **Rubik** text, and **IBM Plex Mono** labels;
- dark espresso, amber/terracotta and restrained cyan, with a warm cream appearance under the site's light theme;
- an independent CSS-3D cup with floating motion, steam, highlight glints, gradient depth and a functional pause control, so there is a visual fallback when WebGL is unsupported;
- keyboard-accessible, scrollable mobile modal; visible close control; escape handling and focus return; OS reduced-motion support.

## Files

- `src/components/support/ChaiExperienceScene.tsx`: decorative CSS-3D scene with explicit pause button, no network or payment side effects.
- `src/components/support/SupportCyberTubeButton.tsx`: premium dialog wrapper, accessible focus/escape, one inline ChaiKit instance only when opened.
- `src/components/support/ChaiKitPaymentPanel.tsx`: warm vendor-documented CSS variables; retains validated payee logic, custom amount and `enable-3d`.
- `app/support/page.tsx`: cohesive hero, illustrations, safety notice and payment panel.
- `app/globals.css`: scoped, responsive visual system; reduced-motion and manual pause; no new runtime animation package.
- `vercel.json`: explicit `git.deploymentEnabled` false for this branch.
- `test/chaikit-studio-ui.test.ts`, `tests/40_chaikit_studio_ui.spec.ts`: render/motion/mobile/demo regressions.
- `.github/workflows/chaikit-studio-no-deploy.yml`: local build and automated tests only; **no deploy job**.

## Safety invariants

1. **Not a payment activation.** This branch does not edit `app/api/support/config/route.ts`, environment variables, database records, payment beneficiary, UPI deep links, or QR generation. A client cannot enable live payments by itself.
2. Server remains the authority: both `CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED` and `CYBERTUBE_SUPPORT_PAYEE_VERIFIED` plus an exact allowlisted payee are required in existing logic. Failing config stays demo-only/non-payable.
3. Existing owner payee identifier is **unchanged**. No new recipient is set by this design work.
4. ChaiKit's custom element remains responsible for amount validation, demo QR safety, UPI app handoff and optional WebGL 3D. The new CSS cup is strictly decorative.
5. App-to-bank handoff is **never** presented as successful receipt; no live transfer is executed by tests.
6. ChaiKit's vendored SHA is unmodified. If an upstream upgrade is later considered, rebuild, re-audit and re-pin it in a separate reviewed change.

## Screenshot-driven correction: clipped 3D and duplicate cards

The 21 November mobile screenshot revealed that the upstream inline ChaiKit component rendered its own card, headline, and WebGL cup *inside* CyberTube's already-branded overlay. In the constrained viewport the WebGL geometry looked like a clipped brown cone, while nested borders, margins, independent scroll and long tier descriptions overwhelmed the menu.

**Fix:** the CyberTube integration now mounts ChaiKit as a compact, single-level tier-and-payment widget. A small `adaptChaiKitInline` presentation adapter injects scoped CSS into its **open shadow root** after registration, hides the duplicate vendor header, removes the inner card margin and border, removes second-dialog semantics while keeping an accessible labelled group, and keeps one scrollbar controlled by the outer dialog. The vendor's built-in 3D stage is **not mounted in this integration**; the accessible lightweight CSS-3D cup in CyberTube's hero remains the visible animation, with its working pause button and OS reduced-motion support. The original ChaiKit vendor bundle and WebGL capability for other host applications are unchanged. Tier names and amounts are unchanged; descriptions have been shortened for narrow screens.

**Acceptance:** verify ChaiKit's duplicate header is hidden, no `.chai-3d-stage` is mounted, the outer CSS cup remains visible, four tier cards are usable at 375 px, no horizontal overflow, nonpayable demo QR overlay remains intact, and live-payment activation still requires pre-existing dual server-side checks. QA for these conditions is included in `tests/40_chaikit_studio_ui.spec.ts`.

## QA gates

- `npm ci`
- `npm run test:chaikit`
- `npm run test:chaikit-live`
- `npm run test:support`
- `npm run test:chai-studio`
- `npx tsc --noEmit`
- `npm run build`
- `npx playwright install --with-deps chromium`
- `npx playwright test tests/35_support_placement_and_theme.spec.ts tests/36_support_page_chaikit.spec.ts tests/39_chaikit_live_direct_upi.spec.ts tests/40_chaikit_studio_ui.spec.ts --project=chromium`

All browser tests use a local Next.js server; mocked support API checks must not be construed as authorization to make live bank transfers. Verify manually in both themes at 375, 768 and 1440 widths, 200% zoom, reduced-motion, tab/shift-tab, Escape, screen reader, WebGL-disabled fallback, and touch.

## Release policy

**Do not merge or deploy.** The branch-specific Vercel Git deployment exclusion was committed first, before UI files. Creating a GitHub draft PR runs repository CI but does not authorize an app deployment. Verify that the connected Vercel project reports zero deployments for this branch before and after creating the PR.

Future release requires explicit sign-off and test evidence, especially because `main` contains a separately controlled live UPI activation path that is **not** being modified here.
