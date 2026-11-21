> **Updated 2026-11-21:** This file describes an earlier preview/floating integration and contains outdated implementation details. Current approved direct UPI behavior, correct payee mapping, server-side activation and non-floating layout are documented in [Direct UPI activation and safety guide](chaikit-live-upi-activation.md). Follow that newer guide instead.

# CyberTube Chai Support — Inline Placement, Theme & Activation

## Implementation status (20 November 2026)

The public CyberTube repository contains an **inline support preview**, not a live payment gateway.

- **Home page:** a support trigger next to the existing learning actions.
- **All pages:** a single full-width support section inside the regular footer, below page content, before legal links.
- **Header:** Support menu item navigates to the footer section.
- **No fixed or floating support launcher** is mounted by the committed code.
- **Colors:** all controls and the modal use CyberTube semantic CSS variables (`--card-bg`, `--surface-subtle`, `--border`, `--text-primary`, `--text-secondary`, `--accent-cyan`). The site's theme toggle controls the appearance in both modes.
- **Preview:** selectable Cutting ₹10, Kadak ₹25, Tandoori ₹50 and Premium ₹100 tiers, plus accurate “not activated” messaging; all payment actions disabled.
- **Safety:** no receiving UPI address, payable QR or UPI intent is committed or displayed.

### Localhost warning

A screenshot from a developer's local `localhost:3000` environment showed a floating ChaiKit launcher and a separately styled footer link, **neither of which existed in the GitHub `main` branch when this change began**. They are almost certainly from unpublished/local code or a different worktree. Pulling the updated repository does not remove additional untracked code from your local folder. Check your own local changes and remove the original floating mounting point, or replace its `position="bottom-right"` with ChaiKit's supported `position="inline"` or `headless` mode. Render one support control per intended placement, not an old floating launcher plus a new footer trigger. Do not delete unrelated local work.

## Owner configuration already supplied privately

The owner previously supplied these details for a future live integration:

| Setting | Known choice |
| --- | --- |
| Creator display name | CyberTube |
| Support description | Support free cybersecurity education. Buy us a chai! |
| Button text | Support CyberTube ☕ |
| Currency | INR |
| Chai tiers | ₹10, ₹25, ₹50, ₹100 |
| Preferred placement | Inline at the bottom of the page and an entry on Home, **not floating** |
| Themes | Match CyberTube light/dark |
| Optional 3D | Enabled when live ChaiKit is integrated |

A receiving UPI ID and expected bank/UPI payee name were supplied previously. **Do not publish those values, copy them into the client code, or activate any payment handoff without the owner's explicit approval.**

## Requirements to activate actual UPI support

1. Get **explicit payment activation approval** from the owner. Existing configuration is not authorization.
2. Independently validate that the provided UPI ID belongs to the intended recipient. Send a small actual test contribution from a separate UPI app/account and verify the **displayed payee name**, correct recipient and real receipt in the bank/UPI statement. Do not take the browser's word for it.
3. Confirm live mode should use direct UPI QR / intent, whether the amounts should remain ₹10/₹25/₹50/₹100, and whether to allow a custom amount. These defaults can be retained unless explicitly changed.
4. Verify the `@chaikit/widget` or `@chaikit/react` **v1.0.0** release actually exists and is installable before adding a dependency and lockfile change. Do not install an unverified similarly named npm package. See [ChaiKit](https://github.com/arun-codex/chaikit).
5. Integrate the original ChaiKit **in inline/headless mode**, not as a floating widget; adapt its `theme` to the website's resolved `next-themes` theme, and override its Shadow DOM CSS variables on `<chai-support>` to match CyberTube's semantic palette.
6. Make a fresh test on **mobile and desktop**, **light and dark**, including the correct amount and QR/UPI handoff. Verify this with the receiving bank/account, not by displaying a fake “payment success” screen.
7. Enable live mode **only in a separate reviewed commit after approval and verified test**. Do not alter `NEXT_PUBLIC_*` variables or introduce payment deeplinks while still in preview.

### Payment verification boundaries

ChaiKit is a direct-URL/QR handoff, not an acquiring bank or payment processor. A web browser **cannot authoritatively verify a UPI transfer**. Never display a fake confirmation, automatic support count, verified-payee badge, receipt, or “payment successful” status. Bank-side verification or a properly integrated gateway would be needed for authenticated server-side payment status.

### Security and user experience

- Never send the UPI address to analytics or commit credentials.
- No payments are accepted by the preview and no donor data is collected.
- A future production support widget must be optional, clearly identified, keyboard/screen-reader accessible, and must not block education content.
- Respect the site's light/dark toggle instead of merely checking operating-system color preference.

## Implementation references

- Site preview: `src/components/support/SupportCyberTubeButton.tsx`
- Home: `app/page.tsx`
- Header: `src/components/Header.tsx`
- Footer: `src/components/Footer.tsx`
- UI smoke checks: `test/support-layout.test.ts`
- Upstream component API: [ChaiKit configuration](https://github.com/arun-codex/chaikit/blob/main/docs/configuration.md) and [headless triggers](https://github.com/arun-codex/chaikit/blob/main/docs/customization.md).
