# CyberTube 🛡️

> **Discover. Learn. Practice. Secure.**  
> An all-in-one cybersecurity learning ecosystem and resource discovery engine for students, independent researchers, and industry professionals.

CyberTube combines the rapid discovery patterns of reference directory platforms with a dedicated, taxonomy-rich cybersecurity catalog and cloud-synced learning paths.

---

## 🚀 Key Features

### Phase 1 (Product Foundation + Resource Discovery Engine)
1. **Curated Cybersecurity Catalog**:
   - 22 high-impact, verified learning resources across documentation, labs, books, videos, CTFs, podcasts, and cheat sheets.
   - Comprehensive metadata: duration, difficulty, cost (free/paid), prerequisites, skills acquired, and direct canonical outbound links.
2. **11 Cybersecurity Domains**:
   - Web Security, Network Security, Reverse Engineering, Binary Exploitation / Pwn, Cloud & Container Security, Digital Forensics & Incident Response (DFIR), Cryptography, Governance, Risk & Compliance (GRC), Red Teaming & Penetration Testing, Blue Teaming & SOC Operations, Threat Intelligence.
3. **11 Resource Formats**:
   - Video, Course, Article, Documentation, GitHub Repository, Lab, CTF, Podcast, Research Paper, Certification Resource, Exam Preparation.
4. **Deterministic Multi-Facet Discovery**:
   - Conjunction filtering (`AND` across facets, `OR` within facets).
   - Instant search tokenization across titles, descriptions, skills, and tags.
   - Live facet counts that update dynamically.
   - URL query parameter state synchronization for sharing and bookmarks.
5. **Private Local Bookmarking**:
   - Zero-server, client-side bookmarks via browser `localStorage`.
   - Reactive badge counter in navigation bar synchronized across tabs/components.

### Phase 2 (Backend Architecture + Supabase + Authentication + Admin CMS)
1. **Normalized PostgreSQL Schema**:
   - 10 tables covering `profiles`, `resources`, `domains`, `resource_domains`, `tags`, `resource_tags`, `bookmarks`, `collections`, `collection_resources`, and `resource_submissions`.
2. **Supabase Authentication via Next.js SSR**:
   - Cookie-based authentication using `@supabase/ssr` (replaces deprecated auth-helpers).
   - Routes: `/login`, `/register`, `/account`.
   - Automatic session refresh and path protection in Next.js Edge `middleware.ts`.
3. **Strict Row Level Security (RLS)**:
   - Separate policies for SELECT, INSERT, UPDATE, and DELETE.
   - User isolation on bookmarks, collections, and submissions via `auth.uid() = user_id`.
   - Draft and archived resources are hidden from public view.
4. **Personal Library Cloud Synchronization**:
   - Signed-in users sync bookmarks seamlessly to PostgreSQL.
   - Idempotent migration helper (`syncLocalBookmarksToCloud()`) that uploads local bookmarks to cloud upon login without duplicate records or data loss.
5. **Administrative CMS**:
   - Protected `/admin` dashboard verifying server-side email allowlist (`CYBERTUBE_ADMIN_EMAILS`).
   - Catalog management, KPI metrics, community submission queue, and domain oversight.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14.2.15](https://nextjs.org/) (App Router, Server Actions, Middleware & Static Site Generation)
- **Language**: TypeScript (Strict mode enabled)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Supabase Auth + RLS)
- **Integration**: `@supabase/supabase-js` + `@supabase/ssr`
- **Styling**: Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: Node.js Test Runner + `tsx` (Unit + Route Integration tests)
- **Linting**: ESLint (Next.js Core Web Vitals)

---

## 📁 Project Structure

```text
├── app/                           # Next.js App Router
│   ├── account/                   # User profile onboarding & learning goals
│   ├── actions/auth.ts            # Server Actions for authentication
│   ├── admin/                     # Protected administrative CMS dashboard
│   ├── discover/                  # Multi-facet search and filter catalog
│   ├── domains/                   # Cybersecurity domains taxonomy directory
│   ├── login/                     # Sign-in portal with Suspense boundary
│   ├── register/                  # Account registration portal
│   ├── resources/[slug]/          # Static pre-rendered detailed resource views
│   ├── saved/                     # Browser bookmark manager
│   ├── globals.css                # Base styles, dark theme, and scrollbars
│   ├── layout.tsx                 # Root layout with Header, Footer, and theme init
│   ├── not-found.tsx              # Styled 404 page
│   └── page.tsx                   # Homepage (Hero, Featured, Domain Grid, Quick Filters)
├── docs/                          # Architecture, Reference, and Testing docs
│   ├── phase-1-architecture.md
│   ├── phase-1-final-audit.md
│   ├── phase-2-architecture.md
│   ├── phase-2-database-schema.md
│   ├── phase-2-authentication.md
│   ├── phase-2-security.md
│   ├── phase-2-setup.md
│   ├── phase-2-testing-report.md
│   └── phase-2-implementation-report.md
├── middleware.ts                  # Edge session refresh & path guard
├── src/
│   ├── components/                # Reusable UI & layout components
│   │   ├── Header.tsx             # Navbar with Auth & Admin status
│   │   ├── Footer.tsx             # Global footer
│   │   └── ResourceCard.tsx       # Standard resource card
│   ├── data/                      # Core verified data
│   │   ├── metadata.ts            # Taxonomy labels, icons, and descriptions
│   │   └── resources.ts           # 22 verified cybersecurity resources
│   ├── lib/                       # Pure utility and business logic
│   │   ├── catalog.ts             # Search, filter, facet count, and sort engine
│   │   ├── cloud-saved.ts         # Supabase cloud bookmark & sync service
│   │   ├── saved.ts               # LocalStorage bookmark management service
│   │   ├── theme.ts               # Dark/light theme initialization
│   │   └── supabase/              # Supabase clients (client, server, admin)
│   └── types/
│       ├── database.ts            # Generated Supabase PostgreSQL database types
│       └── resource.ts            # Resource and filter domain models
├── supabase/
│   ├── config.toml                # Local Supabase CLI configuration
│   ├── migrations/                # Database migration scripts
│   │   └── 20261104000000_initial_schema.sql
│   └── seed.sql                   # SQL seed data (11 domains & 22 resources)
├── test/                          # Unit and integration test suites
│   ├── catalog.test.js            # Catalog unit tests
│   ├── phase2-auth-db.test.js     # Auth, RLS, and sync tests
│   ├── http-check.js              # Production HTTP route validation
│   ├── catalog-deep-audit.js      # Deep schema validator
│   └── security-audit.js          # Automated security & link audit
├── .env.example                   # Environment variable template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🏃 Getting Started

### Prerequisites

- Node.js 18.x or 20.x installed.
- npm installed.
- Supabase project credentials (see `.env.example`).

### Installation

```bash
git clone <repo-url>
cd REA_Project
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.example .env.local
```

### Database Migration & Seed

Run the SQL migration in [`supabase/migrations/20261104000000_initial_schema.sql`](supabase/migrations/20261104000000_initial_schema.sql) and seed data in [`supabase/seed.sql`](supabase/seed.sql) in your Supabase SQL Editor.

### Running Tests & Linting

```bash
# Run all tests (unit tests + production server HTTP checks)
npm test

# Run Phase 2 specific auth & database invariants test
npx tsx test/phase2-auth-db.test.js

# Run ESLint
npm run lint
```

### Production Build & Local Server

```bash
# Start local dev server
npm run dev

# Compile optimized static & server build
npm run build

# Start production server
npm start
```

---

## 🔒 Security & Privacy Notice

- **Zero Secret Leakage**: The Supabase service role secret is restricted exclusively to server-side code (`src/lib/supabase/admin.ts`) and is never prefixed with `NEXT_PUBLIC_`.
- **Public Guest Access**: Unauthenticated learners can browse and bookmark resources locally without tracking or forced sign-up.
- **External Outbound Links**: All external learning platforms and resources open securely with `rel="noopener noreferrer" target="_blank"`.

---

## 📄 License

MIT
