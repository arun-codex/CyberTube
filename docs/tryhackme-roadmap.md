# TryHackMe Roadmap integration

## Source

- Repository: https://github.com/Hunterdii/TryHackMe-Roadmap
- License: CC0-1.0 (maintainer attribution retained in the user interface)
- Snapshot/revision: see src/data/tryhackme-roadmap.json -> source.revision
- As imported: 2026-11-20

The imported snapshot preserves all **502 section entries** from the source README across **28 ordered categories**, with **482 distinct room URLs**. The same room may occur in several sections; do not deduplicate those placements. The source author's checked boxes are **not** an indication of the CyberTube learner's progress and were not imported.

## Pages

- Main catalog: /tryhackme-roadmap
- Discoverable through the header More menu, footer, Practice Labs page, and Learning Paths page.
- All external room links open https://tryhackme.com/room/... in a new tab.
- Search, suggested-level filter, section navigation, and Incomplete-only filter.
- Completion state is per-browser using localStorage (cybertube:tryhackme-roadmap:completed:v1), shared by repeated room IDs. It does not sync to CyberTube account data or TryHackMe.
- Suggested level buckets are CyberTube editorial groupings. The source does not provide official TryHackMe difficulty ratings for each topic section.

## Access & accuracy

The source describes its list as free, but marks three rooms as potentially no longer free. These warnings are preserved in the catalog. Do not claim that every room is presently accessible without a subscription, or that all 502 links were individually live-checked. To update the snapshot, review the source README and re-run the import logic, preserving section order, source URLs, warnings, and provenance.

## Verification

Run: node --test test/tryhackme-roadmap.test.js

Then run the normal Next.js type/build checks and manually verify navigation, mobile layouts, search, level filters, browser progress, duplicate completion, and external links.
