# CyberTube Chai Support — Location, Theme & Live Payment Safety

For the canonical payment architecture, flags, recipient safety, activation and bank-side verification, see [ChaiKit production integration](chaikit-integration.md).

## Interface

- A support button is available on Home and as an inline section at the end of every page, with a Support navigation link.
- The button opens a keyboard-accessible dialog containing the real ChaiKit web component in inline mode.
- The dedicated /support page also uses the same component and configuration endpoint.
- It is not a floating bottom-right launcher.
- Dark and light modes inherit CyberTube semantic colors and cyan accent. The ChaiKit QR itself uses a high-contrast white background.
- The four preset contributions are ₹10/₹25/₹50/₹100, with custom amounts supported.

## Approved owner details (21 November 2026)

The owner explicitly chose direct UPI, custom amounts and authorized real payments after stating that the receiving account had been verified as Arun Kumar. The exact UPI ID is set in the production server environment and checked against a reviewed allowlist, not accepted from user-supplied browser inputs.

This attestation does not constitute independent bank-side verification by CyberTube or ChatGPT.

## Deployment gates and truthfulness

Live payments require the server flags and exact approved payee described in [the integration guide](chaikit-integration.md). Without them the UI shows a demo-only, non-payable ChaiKit QR. If configuration cannot load, the UI displays an unavailable state, **not** a payable fallback.

In live mode, ChaiKit's creator-name is set to the verified **bank payee name** so the generated UPI pn field is correct. The CyberTube identity remains displayed in the surrounding interface.

A QR code or UPI app handoff does not confirm payment, and the site must never show fabricated success, receipts, donor counts or transfer verification. Bank account owners should perform an independent small test and check the actual receiving bank statement before declaring funds received.

## Files

- src/components/support/SupportCyberTubeButton.tsx
- src/components/support/ChaiKitPaymentPanel.tsx
- src/lib/chaikit/config.ts
- app/api/support/config/route.ts
- app/support/page.tsx
- tests/39_chaikit_live_direct_upi.spec.ts
