# CyberTube × ChaiKit — Direct UPI Production Integration

## Owner authorization (21 November 2026)

The CyberTube owner explicitly authorized **direct UPI QR / app handoff** with four contribution tiers, **custom amount enabled**, and stated that the UPI recipient account was verified as:

- Receiving UPI ID: aruninzone@ptaxis
- Expected banking-app payee name: Arun Kumar
- Creator/project being supported: CyberTube
- Default tier: Kadak Chai ₹25; alternatives ₹10, ₹50 and ₹100
- Custom amount: enabled (ChaiKit accepts ₹10–₹10,000 in the current interface)
- Location: Home/footer inline support button and /support page; no global floating launcher
- Theme: CyberTube dark/light, with cyan accent
- Payment confirmation: **not available** from ordinary direct UPI handoff

**Verification boundary:** The account verification was **reported by the owner**. ChatGPT and the browser cannot independently verify receipt of a bank transfer. Verify the account and exact recipient/amount in a bank UPI app before public launch. Do not present the owner statement as a bank-issued certification.

## Release activation guards

The browser cannot enable payments by setting a NEXT_PUBLIC environment value. An uncached server endpoint, GET /api/support/config, checks **all** of:

1. CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED=true
2. CYBERTUBE_SUPPORT_PAYEE_VERIFIED=true
3. CYBERTUBE_SUPPORT_UPI_ID matches the *approved exact* ID
4. CYBERTUBE_SUPPORT_EXPECTED_PAYEE matches the *approved exact* payee name

All four must pass. Otherwise the endpoint returns demoMode=true and upiId=demo@upi, so only a **non-payable demo QR** is generated. Browser-side client validation provides a second fail-closed guard.

For production set these four **server-only**, encrypted Vercel environment variables:

    CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED=true
    CYBERTUBE_SUPPORT_PAYEE_VERIFIED=true
    CYBERTUBE_SUPPORT_UPI_ID=aruninzone@ptaxis
    CYBERTUBE_SUPPORT_EXPECTED_PAYEE=Arun Kumar

Changes to Vercel environment variables require a new production deployment. Keep preview and development values unset unless conducting a separate approved test. Never put a UPI PIN, banking password, OTP, sensitive gateway key, or user bank credential in the app. This direct UPI solution does not require merchant gateway keys.

**Emergency kill switch:** Set CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED=false and redeploy. Even if the widget were to load with cached JavaScript, the config fetch will be non-payable. The current runtime also responds no-store. For already-open pages, ask users to reload.

## Payee correctness: important ChaiKit implementation detail

The vendored ChaiKit core creates UPI URLs with:
    upi://pay?pa={UPI_ID}&pn={CREATOR_NAME}&am={rupees}&cu=INR&tn={note}

The ChaiKit custom element ignores the separate payment-payee-name HTML attribute. Its UPI pn value instead comes from **creator-name**. Therefore the widget must receive creator-name="Arun Kumar" in live mode. The surrounding CyberTube heading and descriptions retain creator/project branding as CyberTube. Do not pass creator-name="CyberTube" in live mode or the bank payee text would be misleading.

ChaiKit itself generates QR SVG locally and attempts the installed-app handoff only from a real click. The client does not log or store payment credentials and never claims a handoff means a successful transfer. No automatic payment receipt, donor ledger, webhook, confirmed supporter counter or transaction-success message exists.

## ChaiKit vendor integrity

CyberTube uses a pinned original ChaiKit source bundle rather than an unverified npm package.

- Source: https://github.com/arun-codex/chaikit
- Pinned source commit: c9280de843f2d4cf6d8333664ad5a16db2b04001
- Bundle: public/vendor/chaikit/chaikit.iife.js
- Expected SHA-256: 2B7AA0E95539D39F305976894DF1A1018E9A6DCA2BCBAA5381221F7CD0A761FA

The test:chaikit integrity check must pass. Do not replace the bundle or bypass checksum verification to activate payment.

## Surfaces and UI

- src/components/support/SupportCyberTubeButton.tsx: accessible Home/footer button and dialog.
- src/components/support/ChaiKitPaymentPanel.tsx: shared inline widget used by the dialog and the /support page.
- app/support/page.tsx: dedicated support and transparency page.
- app/api/support/config/route.ts: no-store server release gate and exact recipient allowlist.
- src/lib/chaikit/config.ts: **non-payable defaults only**.
- src/lib/chaikit/loader.ts: idempotent load of vendored original script.
- CSS custom properties on the widget host map to CyberTube semantic tokens in both themes; fixed QR background retains high contrast.

### Tests

Run:
    npm run test:chaikit
    npm run test:chaikit-live
    npm run test:support
    npx tsc --noEmit
    npm run build
    npx playwright test tests/35_support_placement_and_theme.spec.ts tests/36_support_page_chaikit.spec.ts tests/39_chaikit_live_direct_upi.spec.ts --project=chromium

The live-mode UI browser test intercepts the config endpoint with the exact approved recipient and confirms the ChaiKit component receives it; **it never opens a UPI app or sends real money**.

## Final bank-side validation before declaring complete

1. Confirm production /api/support/config reports livePaymentsEnabled=true, demoMode=false and the exact approved payee.
2. Inspect /support and Home/footer dialog in light and dark modes; confirm the new QR is payable and custom amounts update it.
3. Open a UPI app from an actual mobile device or scan the QR from a second device. **Before authorizing** any transaction confirm the UPI app displays Arun Kumar and the intended amount.
4. Complete a small authorized test payment. Check the receiver's own bank statement for the funds and record the bank reference **privately**. The assistant cannot perform this real-bank step.
5. Validate the live production deployment is READY with the merged commit. If steps 3–4 have not been completed, label the launch **code live, bank-side verification pending**.

A UPI intent being attempted or a QR being rendered proves only that payment instructions were generated. It never proves the transfer settled.
