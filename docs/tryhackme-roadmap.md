# TryHackMe Free Labs in CyberTube Practical Labs

## Public experience

- Main page: **/labs** — “Practical Labs & Wargames”, with the **TryHackMe Free Labs (Free)** explorer followed by other legal practical training platforms.
- Compatibility: `/tryhackme-roadmap` redirects to `/labs`, preserving room `?q=` and section `?section=` deep links.
- Navigation: “Practical Labs” in the site's More menu (no “Coming Soon” badge), the footer, and the Learning Paths page.
- Search: the global search index links to `/labs#tryhackme`, `/labs?section=<slug>`, and `/labs?q=<room title>`.
- Suggested Beginner through Expert learning levels, section navigation, room search, incomplete-only filter, and per-room completion.
- External room links open TryHackMe. Only practise in authorized labs.

## Source and free-status limits

- Source: https://github.com/Hunterdii/TryHackMe-Roadmap (CC0-1.0)
- Original snapshot: `src/data/tryhackme-roadmap.json` — **502 entries**, **482 unique rooms**, **28 source sections**.
- Free-labs view: **499 entries**, **479 unique room IDs**, **28 sections**, keeping duplicate placements.
- Excluded because source reports they are no longer free: `linuxfundamentalspart2`, `linuxfundamentalspart3`, `introtolan`.
- Remaining rooms are source-listed as free, **not independently confirmed free as of today**. TryHackMe can change access; do not promise every displayed room is currently free.
- Maintainer's checkboxes are *not* imported as learner progress.

## Secure cross-device lab progress

- Reuses existing RLS-enabled `public.user_generic_progress` table. No new schema or service-role keys.
- Authenticated endpoints at `/api/labs/tryhackme-progress`:
  - `GET` retrieves signed-in user's completed and known room IDs.
  - `POST {roomId, completed}` updates an explicitly allowed room's completion, including unchecking.
  - `PUT {completedIds}` imports older guest/browser completion **without overwriting any existing server record**, including intentionally unchecked records.
- Server validates room IDs against source-listed free rooms, derives user identity from authenticated cookies, and relies on per-user RLS. No client-supplied user ID or privileged keys.
- Each room is represented by `entity_type='lab'`, `entity_id='tryhackme:<room id>'`. Duplicate section placements share progress.
- Signed-in status is only marked “Server synced” after a successful response. Failed reads/writes display errors; controls do not silently claim sync.
- Guest checkmarks remain browser-local until the guest signs in and imports them. After a successful import the old local key is removed to prevent leaking checkmarks into a different account.
- Cloud progress syncs between CyberTube sessions/devices, **not with TryHackMe's own completion API**; the user self-reports completion.

## Verification

- Run `npm run test:labs`, `npm run test:search`, and `npm run build`.
- Check signed-in completion, reload, separate-device account sync, unchecking, duplicate-section checkmarks, guest-to-account import, sign-out isolation, rejected invalid/paid IDs, responsive layouts, and legacy route redirects.
- Postgres `user_generic_progress` has per-user SELECT, INSERT and UPDATE RLS policies with `auth.uid()=user_id`; no schema change was required.
