# CyberTube 🛡️

> **Discover. Learn. Practice. Secure.**  
> An all-in-one cybersecurity learning ecosystem and resource discovery engine for students, independent researchers, and industry professionals.

CyberTube combines the rapid discovery patterns of reference directory platforms with a dedicated, taxonomy-rich cybersecurity catalog.

---

## 🚀 Key Features (Phase 1)

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
   - Dedicated `/saved` page with search-within-saved and instant removal.
6. **Dark/Light Theme**:
   - Engineered with high-contrast, cybersecurity-inspired dark theme (`cyber-dark`) by default, with instant light mode toggle.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Static Site Generation)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: Node.js Test Runner + `tsx` (Unit + Route Integration tests)
- **Linting**: ESLint (Next.js Core Web Vitals)

---

## 📁 Project Structure

```text
├── app/                           # Next.js App Router
│   ├── discover/                  # Multi-facet search and filter catalog
│   ├── domains/                   # Cybersecurity domains taxonomy directory
│   ├── resources/[slug]/          # Static pre-rendered detailed resource views
│   ├── saved/                     # Local browser bookmark manager
│   ├── favicon.ico
│   ├── globals.css                # Base styles, dark theme, and scrollbars
│   ├── layout.tsx                 # Root layout with Header, Footer, and theme init
│   ├── not-found.tsx              # Styled 404 page
│   └── page.tsx                   # Homepage (Hero, Featured, Domain Grid, Quick Filters)
├── docs/                          # Architecture, Reference, and Testing docs
│   ├── phase-1-architecture.md
│   ├── phase-1-implementation-plan.md
│   ├── phase-1-reference-analysis.md
│   └── phase-1-testing-report.md
├── src/
│   ├── components/                # Reusable UI & layout components
│   │   ├── ui/                    # Badge, Button, Card atomic components
│   │   ├── FilterSidebar.tsx      # Multi-facet filter controls
│   │   ├── Footer.tsx             # Global footer with taxonomy links & disclaimer
│   │   ├── Header.tsx             # Navigation, theme toggle, mobile drawer
│   │   └── ResourceCard.tsx       # Standard resource card
│   ├── data/                      # Core verified data
│   │   ├── metadata.ts            # Taxonomy labels, icons, and descriptions
│   │   └── resources.ts           # 22 verified cybersecurity resources
│   ├── lib/                       # Pure utility and business logic
│   │   ├── catalog.ts             # Search, filter, facet count, and sort engine
│   │   ├── saved.ts               # LocalStorage bookmark management service
│   │   └── theme.ts               # Dark/light theme script & toggle helper
│   └── types/
│       └── resource.ts            # TypeScript definitions for resources and filters
└── test/                          # Unit and integration test suites
    ├── catalog.test.js            # Catalog data & filtering logic tests
    └── http-check.js              # Production HTTP route validation script
```

---

## 🏃 Getting Started

### Prerequisites

- Node.js 18.x or 20.x installed.
- npm installed.

### Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd REA_Project
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests & Linting

Run the test suite (both unit tests and HTTP route verification):

```bash
npm test
```

Run ESLint:

```bash
npm run lint
```

### Production Build

Create an optimized static production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🔒 Security & Privacy Notice

- **No User Tracking**: CyberTube Phase 1 requires no user account, transmits zero telemetry, and stores bookmarks strictly within the user's browser `localStorage`.
- **External Outbound Links**: All external learning platforms and resources open securely with `rel="noopener noreferrer" target="_blank"`.
- **Ethical Use**: All educational materials are intended strictly for defensive, authorized research, and academic learning purposes.

---

## 📄 License

MIT
