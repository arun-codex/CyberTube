# CyberTube Phase 2: Setup & Deployment Guide

---

## 1. Prerequisites

- **Node.js**: v18.x or v20.x+
- **npm**: v9+
- **Supabase Account**: Free or Pro tier at [https://supabase.com](https://supabase.com) (or local Supabase via Docker).

---

## 2. Environment Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your project keys from the Supabase Project Dashboard (`Settings -> API`):
   ```ini
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
   SUPABASE_SECRET_KEY=<your-service-role-key>
   CYBERTUBE_ADMIN_EMAILS=admin@yourorg.com,security@yourorg.com
   ```

---

## 3. Database Migration & Seeding

### Option A: Using the Supabase Web SQL Editor
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** tab.
3. Paste and run [`supabase/migrations/20261104000000_initial_schema.sql`](file:///c:/User/REA_Project/supabase/migrations/20261104000000_initial_schema.sql).
4. Paste and run [`supabase/seed.sql`](file:///c:/User/REA_Project/supabase/seed.sql) to import the 11 domains and 22 verified learning resources.

### Option B: Using the Supabase CLI
```bash
# Link project
supabase link --project-ref <your-project-ref>

# Apply migrations
supabase db push

# Apply seed data
supabase db reset
```

---

## 4. Running the Application

```bash
# Install dependencies
npm install

# Run automated test suites
npm test

# Run code linter
npm run lint

# Start local Next.js dev server
npm run dev

# Compile optimized static production build
npm run build
npm start
```
