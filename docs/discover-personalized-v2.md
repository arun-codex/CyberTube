# CyberTube Discover v2: Personalized video + news + career feed

## User-facing features
- Live, cached source fetches: official YouTube channel Atom feeds, cybersecurity/technology RSS, and public GitHub Security Advisories. No YouTube Data API key is required for this predefined source list.
- Safe fallback: video metadata from existing **published CyberTube course content**, plus clearly labeled curated career/interview/communication videos and career resources. Fallback videos are **not marked as new releases**.
- Tabs: For You, Latest, Videos, Cyber News, Tech & AI, Careers & Internships, Growth & Communication, Watch History, and existing Resource Directory.
- Responsive video and news cards, live-source status, search, category filters, and incremental Load More.
- Personalized ranking combines signed-in user's followed interest topics and their own watch history; watches have higher weight after substantial progress, completed videos are demoted, and the initial feed mixes sources. Guests see a balanced public feed, never somebody else's history.
- Custom CyberTube video viewing layout uses the official YouTube IFrame Player API with native controls, speed choices where supported, theater sizing, progress position, and resume. YouTube selects streaming quality. The old iframe APIs for setting/getting quality are unsupported; no misleading app-side 1080p selection is offered.

## Video history, cloud sync and privacy
- Migration: \`supabase/migrations/20261120150000_discover_video_history.sql\`.
- New \`public.user_discover_video_progress\` stores a user-scoped record per YouTube video (latest resume position, max watched position/percent, duration, completion, last watch date, title, channel and category).
- \`public.save_discover_video_progress\` is **SECURITY INVOKER**; it checks the authenticated user and atomically merges progress without regression. RLS SELECT/INSERT/UPDATE/DELETE restrict every user to their own records. No service-role key is used by the public API.
- \`GET/POST/DELETE /api/discover/history\` is authenticated. POST checks video ID, duration, position, and title lengths. GET combines Discover playback history with existing \`user_lesson_video_progress\` course records, deduplicated by video. DELETE removes only a Discover playback record, not course completion.
- The profile page shows recent videos and progress, linking to \`/discover?video=<id>\` for playback. Discover's Watch History tab shows the full recent list and allows per-video deletion.
- Viewing only on CyberTube is counted; this is not YouTube account/watch-history sync. Only signed-in users have cross-device watch history.
- The UI does not store third-party video files, scrape video streams, bypass advertisements, or cover YouTube's required native player controls.

## Sources and reliability
- Read-only allowlisted sources are fetched on demand using Next.js cached server fetches (20-minute revalidation) and short timeouts. They are NOT scheduled per-user background jobs. Source feeds may return unavailable or rate limited.
- The YouTube feeds are public Atom feeds from identified channels, not arbitrary user-submitted URLs.
- The advisory feed is public GitHub Security Advisories, plus CISA and The Hacker News RSS.
- Four curated videos cover entry-level SOC interviews, internships, communication and speaking confidence, with attribution to their creators.
- Feed item URLs and dates come from source metadata; this app doesn't claim live availability of jobs or YouTube embeds without live provider verification.

## Developer verification
1. Apply migration to the intended Supabase project, check RLS policies and function permissions.
2. Run \`npm run build\` and the project's existing regression tests.
3. Check /discover as guest (nonempty fallback) and signed-in user, switch tabs/filters, and refresh.
4. Play a video, pause at 20 seconds, reload, resume, and confirm cross-device progress and profile history.
5. Confirm user A cannot see or modify user B's history. Confirm RLS rejects anonymous insert/select.
6. Confirm source-outage fallback stays available, and that history says unavailable rather than pretending sync succeeded.
7. Check native YouTube controls, speed where allowed, responsive 16:9 player, direct-link fallback for restricted videos.
