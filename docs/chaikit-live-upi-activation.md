# CyberTube Direct UPI activation (November 21, 2026)

## Authorized setup

The owner explicitly approved enabling **direct UPI QR + app handoff** in CyberTube production, after reporting that the receiving UPI address had been checked in a banking app against **Arun Kumar**. This is an owner-reported verification, **not** a bank/NPCI attestation obtained by CyberTube.

- Public brand: **CyberTube**
- Receiving VPA: **aruninzone@ptaxis**
- Expected bank/UPI payee: **Arun Kumar**
- Default amount: ₹25 (Kadak Chai)
- Tiers: ₹10, ₹25, ₹50, ₹100, plus custom ₹10–₹10,000
- Payment note: **Support CyberTube**
- Button placement: Home and footer, not floating
- UI: CyberTube dark/light theme tokens; optional 3D ChaiKit artwork
- Future payment gateway: **not integrated**. No webhooks, gateway credentials or bank-confirmed receipts

## Safety-critical deployment gate

The server endpoint \`GET /api/support/config\` reads the following **production-only** Vercel environment variables:

\`\`\`dotenv
CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED=true
CYBERTUBE_SUPPORT_PAYEE_VERIFIED=true
CYBERTUBE_SUPPORT_UPI_ID=aruninzone@ptaxis
CYBERTUBE_SUPPORT_EXPECTED_PAYEE=Arun Kumar
\`\`\`

All four must match the approved values exactly. Missing, incorrect or false values return **non-payable preview mode** with **no recipient address**. The endpoint is dynamic and sends \`Cache-Control: no-store\`. Client-side flags alone cannot activate payment. Preview/development environments should **not** receive production activation variables.

**Stop payment initiation immediately:** Set \`CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED=false\` on the production Vercel project and redeploy. Do not assume editing an environment variable instantly changes already-running deployments.

## How the interface works

- Home/footer: existing CyberTube button dynamically loads the pinned ChaiKit Web Component in **headless mode**, then calls its \`open()\` method. No floating launcher is created.
- Support page: displays ChaiKit's **inline** Web Component. Both modes use the same payment configuration.
- In live mode the ChaiKit element's \`creator-name\` attribute is set to **Arun Kumar**, because this pinned ChaiKit version uses that attribute as both the dialog heading **and the UPI pn parameter**. Passing **CyberTube** there would generate a misleading payment recipient. The surrounding CyberTube page/button remains branded CyberTube.
- Local SVG QR generation and mobile \`upi://pay\` handoff are supplied by the pinned ChaiKit bundle \`public/vendor/chaikit/chaikit.iife.js\` with its existing SHA-256 integrity regression test.
- The amount selection and custom amounts are handled by ChaiKit in integer paise. Correct recipient, exact amount and INR currency are crucial.
- Browser-only handoff does not verify that money moved, that the receiver is bank-verified, or that a contribution was successful. No fake "success" page, receipts, transaction table or supporter statistics.

## Quality and finance release gates

1. Confirm owner approval and **owner-reported** recipient bank check are current (both confirmed in chat Nov 21).
2. Run \`npm run test:upi && npm run test:chaikit && npm run test:support\`.
3. Run \`npx tsc --noEmit && npm run build\`.
4. Run \`npx playwright test tests/39_chaikit_direct_upi.spec.ts --project=chromium\`. Browser tests simulate a live config for QR and UPI UI **without sending real money**.
5. Verify preview still has demo-only QR, does not leak a UPI ID, and shows no live UPI handoff.
6. Set the four vars **only** on Vercel production, after checks have passed.
7. Deploy exact reviewed \`main\` commit, then verify the production deploy is READY, public \`/api/support/config\` reports \`mode: live\`, and the payment UI displays the expected VPA and payee.
8. Make a **real** ₹10 test transfer through a UPI app from a separately controlled payer and confirm receipt using the receiving bank/account statement. This final banking action is **not automatable** from ChatGPT or the website, and should not be claimed as completed without the owner's confirmation.
9. Verify the recipient and amount again in Google Pay, PhonePe, BHIM or whichever UPI app the visitor uses.

## Payment gateway later (future work)

When needed, design a separate payment-gateway flow (e.g., a provider-supported merchant checkout) with account onboarding, server-side order creation, webhook signature validation, reconciliation, user receipts and legal/privacy disclosures. Do **not** claim gateway payments or automatic confirmation today.

## Relevant files

- \`src/lib/chaikit/server-config.ts\` — fail-closed approved payee policy
- \`app/api/support/config/route.ts\` — no-store public configuration
- \`src/lib/chaikit/usePublicChaiConfig.ts\` — runtime client loader
- \`src/components/support/ChaiKitPaymentElement.tsx\` — correct bank payee, theme tokens, inline/headless rendering
- \`src/components/support/SupportCyberTubeButton.tsx\` — branded trigger and non-payable fallback
- \`app/support/page.tsx\` — live/preview support page
- \`src/components/support/SupportStatusMessage.tsx\` — accurate footer label
- \`test/direct-upi-activation.test.ts\` — policy and payee regression
- \`tests/39_chaikit_direct_upi.spec.ts\` — non-transaction browser verification
