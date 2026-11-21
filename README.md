# CyberTube 🛡️

**Discover. Learn. Practice. Secure.**

CyberTube is a cybersecurity education platform bringing together guided courses, practical labs, a searchable study library, certifications and career resources, and a personalized cybersecurity/technology discovery feed.

**Website:** https://cybertube-mu.vercel.app · **Repository:** https://github.com/arun-codex/CyberTube

> **Release note:** The default branch contains the latest implemented features. A successful merge or build does **not** guarantee that the production deployment has caught up. Check your Vercel deployment status before treating a feature as live.

## Explore CyberTube

| Area | What you can do | Route |
| --- | --- | --- |
| Home | Explore the learning platform and featured content | [Home](https://cybertube-mu.vercel.app/) |
| Courses | Learn cybersecurity through structured, multi-module courses and videos | [Courses](https://cybertube-mu.vercel.app/courses) |
| Practical Labs | Browse hands-on training platforms and source-listed TryHackMe free rooms | [Labs](https://cybertube-mu.vercel.app/labs) |
| Discover | Browse video, security news, tech, interview, internship and personal-growth content | [Discover](https://cybertube-mu.vercel.app/discover) |
| Library | Access learning resources, study material and saved items | [Library](https://cybertube-mu.vercel.app/library) |
| Global Search | Search public pages, lessons, resources and TryHackMe rooms | [Search](https://cybertube-mu.vercel.app/search) |
| Learning Paths | Follow structured routes through cybersecurity topics | [Learning Paths](https://cybertube-mu.vercel.app/learning-paths) |
| Skills | Explore relevant cybersecurity skills | [Skills](https://cybertube-mu.vercel.app/skills) |
| Certifications | Browse certification information and learning resources | [Certifications](https://cybertube-mu.vercel.app/certifications) |
| Careers | Explore career resources and guidance | [Careers](https://cybertube-mu.vercel.app/careers) |
| Profile | View your learning progress and watch history after signing in | [Profile](https://cybertube-mu.vercel.app/profile) |

Other sections include [Study Materials](https://cybertube-mu.vercel.app/study-materials), [Cheat Sheets](https://cybertube-mu.vercel.app/cheat-sheets), [Glossary](https://cybertube-mu.vercel.app/glossary), and [Domains](https://cybertube-mu.vercel.app/domains).

## Features

### Cybersecurity courses and learning progress

- Structured lessons, modules, learning objectives, quizzes and hands-on exercises.
- Curricula covering **Cybersecurity: Zero to Advanced**, **SOC/SIEM**, **Incident Response**, **Linux**, **Windows Security**, and **Network Packet Forensics**, alongside additional educational tracks.
- YouTube-supported course videos with playback/resume and progress tracking where available.
- Signed-in learner progress synchronized through Supabase; relevant guest features may use browser-local storage.

Course content is managed in `src/data/courses.ts`, dedicated course data modules, and Supabase course/lesson tables. Course visibility and available content depend on the published state and associated source metadata.

### Course quizzes and MERN playlist learning path

- Every course now uses the correct quiz grading flow: **general-course server grading** or **protected Storytelling assessment** with its existing prerequisite checks.
- **Start Quiz** in the curriculum opens the assessment directly, scrolls to the questions and skips the lesson video while quiz mode is selected.
- Signed-in users' general-course best scores are stored with RLS in Supabase; guests can still complete locally graded-after-server-response quizzes. Quiz results remain self-assessed learning indicators, not formal certificates.
- The existing [MERN Full Stack course](/courses/mern-full-stack-course-with-ai) includes three cataloged source videos, plus original guided React, Express/MongoDB and secure capstone exercises with module quizzes.
- The provided YouTube playlist ID has **not been independently validated** and an automatic complete import is not claimed. No new videos were invented.

See [quiz fix and MERN upgrade notes](docs/universal-course-quiz-fix-mern-upgrade.md).

### Practical Labs: TryHackMe Free Labs

- 28 source-roadmap sections, organized section-by-section and level-by-level with searchable room links.
- A **source-listed free** view of **499 entries / 479 unique rooms**; some rooms occur in multiple sections.
- Suggested learning levels, room search, incomplete-only filtering, and completion checkboxes.
- Signed-in completion saved per user to Supabase. Older browser-only checkmarks can be imported without overwriting existing cloud records.
- The former `/tryhackme-roadmap` route redirects to the explorer in `/labs`.

**Important:** The underlying [Hunterdii TryHackMe-Roadmap](https://github.com/Hunterdii/TryHackMe-Roadmap) snapshot contains **502 entries / 482 unique rooms**. Three rooms flagged by the source as no longer free are excluded from the free-labs view. Other rooms are **not independently live-verified as free** and may change access. Completion is self-reported in CyberTube; it does **not** update completion inside TryHackMe.

See [TryHackMe integration notes](docs/tryhackme-roadmap.md).

### Personalized Discover feed

The current codebase includes a redesigned `/discover` experience with:

- Feed sections for **For You**, **Latest**, **Videos**, **Cyber News**, **Tech & AI**, **Careers & Internships**, **Growth & Communication**, **Watch History**, and the original **Resource Directory**.
- Allowlisted public YouTube Atom feeds, cybersecurity/technology RSS sources, GitHub Security Advisories, and a curated CyberTube course-video fallback.
- Search, topical filters, content cards, pagination, and selected-interest preferences.
- Personalized ranking for signed-in users based on followed interests and CyberTube viewing behavior. Guests receive a general feed.
- An in-site viewing interface using the **official YouTube IFrame Player**, with resume, viewing progress, theater layout and playback-speed controls where supported.
- Private, account-scoped cloud watch history, video progress bars, and a recent-history section on the profile.

**Playback and source limitations:** CyberTube does not download, rehost, or independently stream YouTube videos. Video quality, captions and other provider-specific controls depend on the **native YouTube player**; the IFrame API cannot force a chosen resolution. External feeds may be unavailable or delayed. Live source items are distinguished from evergreen course/resource content. The platform does not sync viewing activity to your YouTube account.

The predefined Discover source feeds do **not** require a YouTube Data API key. Separately, the course-playlist synchronization job **does** require one when enabled.

See [Discover architecture, privacy and verification](docs/discover-personalized-v2.md).

### Global search and study library

- Sitewide public-content search: pages, courses, lessons, paths, skills, glossary, certificates, resources and TryHackMe room metadata.
- Dedicated `/search` results with type filters, pagination, relevance ranking and roadmap deep links.
- Search shortcuts: `Ctrl/Cmd + K` or `/` outside input fields.
- Study documents, reader/progress tracking, bookmarks, and saved content with signed-in account synchronization where supported.
- Public search does not intentionally index private learner records or unpublished documents.

### Optional Chai support — direct UPI

- Optional **Support CyberTube ☕** controls on Home and at the bottom of every page, with a dedicated [Support page](https://cybertube-mu.vercel.app/support).
- Real **direct UPI QR / UPI app handoff** is enabled only when the production server's approved-payee, owner-confirmation and live-payment environment settings all match. Otherwise the site remains in **non-payable demo mode**.
- Supports Cutting ₹10, Kadak ₹25, Tandoori ₹50, Premium ₹100 and custom ₹10–₹10,000 contributions.
- The actual UPI payee must be **Arun Kumar**, not the CyberTube display brand; supporters must check the recipient and amount in their UPI app.
- No floating support launcher, no gateway, no automatic bank payment verification, and no pretend payment receipts or success status.
- Site-wide light/dark theme integration and a pinned ChaiKit vendor bundle with integrity checks.

For approved production environment settings, rollback, payment transparency and eventual gateway migration, see [Direct UPI activation and safety guide](docs/chaikit-live-upi-activation.md).


### Accounts and security

- Supabase Authentication with Next.js SSR cookie sessions.
- Profile and account settings, bookmarks, interests, course/lab progress and private watch history.
- Row Level Security (RLS) on user-owned records, with user identity derived from authenticated sessions rather than client-provided user IDs.
- Server-side administrative functionality and guarded background jobs.

## Technology

| Layer | Technology |
| --- | --- |
| Application | **Next.js 15** App Router, **React 18**, **TypeScript** |
| UI | Tailwind CSS, Lucide React, light/dark themes |
| Database & authentication | Supabase PostgreSQL, Supabase Auth, `@supabase/ssr`, RLS |
| Video playback | Official YouTube IFrame Player API |
| External discovery | Allowlisted YouTube Atom feeds, RSS and GitHub advisory API |
| Deployment | Vercel (Next.js app and configured cron job) |
| Validation | ESLint, Node.js test runner, `tsx`, Python study-inventory tests, Playwright tooling |

For precise dependency versions, consult [`package.json`](package.json).

## Local development

### Requirements

- **Node.js 22** recommended (the repository currently uses Next.js 15).
- npm.
- A Supabase project for authentication and synchronized user data.
- Supabase CLI / Docker if you want to run a local Supabase instance.

### 1. Clone and install

```bash
git clone https://github.com/arun-codex/CyberTube.git
cd CyberTube
npm ci
```

### 2. Configure the environment

```bash
cp .env.example .env.local
```

If you're using Windows without a Unix-compatible shell, copy `.env.example` to `.env.local` using your file manager or PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Fill in the values for **your own** Supabase instance; do not paste real credentials into issues, commits or screenshots.

| Variable | Purpose | Exposure |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Site origin for links/callbacks | Public |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Public |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase browser/API publishable key | Public |
| `SUPABASE_SECRET_KEY` | Privileged server-side Supabase actions (alternative legacy name: `SUPABASE_SERVICE_ROLE_KEY`) | **Server only** |
| `CYBERTUBE_ADMIN_EMAILS` | Comma-separated server-side admin email allowlist | **Server only** |
| `YOUTUBE_API_KEY` | Optional YouTube Data API access for course playlist synchronization (not required for Discover's public feeds) | **Server only** |
| `CRON_SECRET` | Authenticates protected cron jobs such as playlist sync | **Server only** |
| `GOOGLE_SITE_VERIFICATION` | Optional site ownership verification | Server configuration |

Use [`.env.example`](.env.example) as the starting point. Never prefix secret values with `NEXT_PUBLIC_`.

### 3. Database setup

The schema is versioned under [`supabase/migrations/`](supabase/migrations/). In particular:

- Course/lesson/progress and authentication-adjacent data have their own migrations.
- TryHackMe progress reuses the RLS-protected `user_generic_progress` table.
- Discover watch history uses `20261120150000_discover_video_history.sql` with owner-scoped RLS and the `save_discover_video_progress` RPC.

For a linked **development** Supabase project, review pending changes and then run:

```bash
npx supabase login
npx supabase link --project-ref YOUR_DEV_PROJECT_REF
npx supabase db push
```

**Do not blindly run migrations or seeds against production.** Check the target project, applied migration history, RLS policies, and any data-migration/rollback instructions first. Initial catalog seed data is in `supabase/seed.sql`; it is not required for every update.

### 4. Run the app

```bash
npm run dev
```

Open http://localhost:3000.

### 5. Build and test

```bash
npm run build
npm run lint
npm run test:search
npm run test:labs
npm run test:study
```

`npm test` runs a broader suite, including an HTTP check that may require a running/configured website or test environment. See [`package.json`](package.json) and the [`test/`](test/) directory for the full commands.

## Project layout

```text
app/
  api/                  # Public search, Discover, history, labs, study, admin and cron routes
  courses/              # Course discovery and lessons
  discover/             # Personalized content feed
  labs/                 # Practical Labs and TryHackMe Free Labs
  library/              # Learning library
  search/               # Sitewide search
  study-materials/      # Study documents and reader
  profile/              # Learning and watch-history profile
  account/              # User settings
src/
  components/           # Shared UI, course and discovery/player components
  data/                 # Course definitions, learning paths and TryHackMe snapshot
  lib/
    discovery/          # Live feed retrieval, classification and personalization
    progress/           # Progress helpers
    supabase/           # Browser, SSR and privileged server clients
    search.ts           # Public global search index
supabase/
  migrations/           # Versioned SQL schema, security policies and data updates
docs/                   # Architecture, operational and integration notes
test/                   # Unit, integration and regression tests
vercel.json             # Hosting configuration and scheduled playlist synchronization
```

## Deployment and operations

CyberTube is configured for Vercel. Configure the same required environment variables on Vercel, deploy the intended `main` commit, and inspect build/runtime logs.

- The playlist synchronization cron is configured in [`vercel.json`](vercel.json) and requires `CRON_SECRET`, `YOUTUBE_API_KEY` and the appropriate server-side Supabase credentials.
- Automatic **Discover** source retrieval is cached server-side; the predefined feeds are fetched on request rather than requiring a per-user scheduled task.
- Keep schema migrations and application code compatible when releasing new cloud-progress features.
- Verify **both** the GitHub build and the **production deployment commit**. A merged PR alone does not update the live site when deployment limits or build errors block Vercel.

Useful documentation: [Discover](docs/discover-personalized-v2.md) · [TryHackMe Labs](docs/tryhackme-roadmap.md) · [Migration/deployment guidance](docs/phase-3b2-migration-deployment-and-rollback.md).

## Privacy and responsible use

- Account-scoped viewing and learning activity is stored in Supabase with relevant RLS policies. Anonymous visitors are not given another user's watch history.
- CyberTube viewing progress is separate from YouTube's account history and TryHackMe room completion.
- Third-party content, feeds, course videos and linked lab platforms remain owned and governed by their respective providers.
- Use security tools and labs **only** on systems you own or are explicitly authorized to test. CyberTube does not grant permission to assess unrelated systems.
- Report vulnerabilities responsibly; do not include API keys, access tokens, passwords or other private data in public issues.

## Attribution and licensing

- The TryHackMe room roadmap incorporates a snapshot of [Hunterdii/TryHackMe-Roadmap](https://github.com/Hunterdii/TryHackMe-Roadmap), which identifies its content as **CC0-1.0**. CyberTube is not affiliated with or endorsed by TryHackMe.
- YouTube video metadata and playback are attributed to their original creators. Embedded media remains subject to provider terms.
- **Repository code license:** There is currently **no top-level `LICENSE` file** in this repository. Do not assume the project code is MIT-licensed based on an older README; contact the maintainer for reuse permissions until a license is explicitly published.

---

**CyberTube — Discover. Learn. Practice. Secure.**
