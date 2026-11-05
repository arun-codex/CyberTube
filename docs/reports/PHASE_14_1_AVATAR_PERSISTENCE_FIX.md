# CyberTube Phase 14.1 & 14.1.1 — Persistent Avatar Loading & Security Review

---

## 1. Executive Summary

Phase 14.1 resolves the issue where custom uploaded user avatars were stored in the private Supabase Storage `avatars` bucket and recorded in `profiles.avatar_path`, but failed to persist or resolve across page reloads, browser refreshes, and navigation.

Phase 14.1.1 further tightens avatar image security by replacing loose substring domain matching in `src/components/ui/UserAvatar.tsx` with strict exact-host and dot-boundary suffix validation, removing unnecessary `vercel.app` allowances, and confirming safe fallback behavior.

- **Branch:** `fix/phase-14-1-avatar-persistence`
- **Base:** `main` (`33738c1`)
- **Initial Phase 14.1 Commit SHA:** `9fa60e4`
- **Draft Pull Request:** [PR #4](https://github.com/arun-codex/CyberTube/pull/4) (Draft, open, never merged)
- **Status:** **PASS** (119/119 Playwright tests passed across 19 test suites, zero TypeScript errors, zero ESLint errors, successful production build).

---

## 2. Root Cause Analysis

Inspection of the codebase revealed several architectural gaps causing the persistence failure:

1. **Storage Schema vs UI Property Mismatch:**
   - The Supabase database stores the permanent reference in `profiles.avatar_path` (e.g. `usr-uid/uuid.webp`).
   - The `avatars` bucket is private (`public = false`), meaning direct public URLs cannot be stored in `profiles.avatar_url`.
   - `app/account/page.tsx` and `app/profile/page.tsx` directly passed `profile.avatar_url` (which is `null` for custom uploads) to `<UserAvatar>`, completely ignoring `profile.avatar_path`.
2. **Missing Server-Side Signed URL Generation:**
   - Neither Server Component (`/account` nor `/profile`) generated a signed URL for `profile.avatar_path`.
   - As a result, on every page reload, the component received `null` and immediately fell back to initials.
3. **Disconnected Header Navigation:**
   - `src/components/Header.tsx` only queried `display_name, avatar_url` from `profiles`.
   - The client-side header never invoked the authenticated `/api/user/avatar` endpoint, so the global navigation header and dropdown always fell back to initials or provider avatar.
4. **Missing Database Persistence Verification in API Route:**
   - `app/api/user/avatar/route.ts` did not check `updateError` or verify that the profile row was actually updated upon upload, nor did it clean up orphaned storage objects if database update failed.
5. **UI Error State Not Resetting on URL Changes:**
   - In `UserAvatar.tsx`, `imageError` was initialized to `false` but never reset when the `customAvatarUrl` prop changed, causing stale fallback states to linger even after new avatars loaded.
6. **Loose Hostname Validation (Addressed in Phase 14.1.1):**
   - Substring matching (`hostname.includes('supabase.co')` and `hostname.includes('vercel.app')`) previously allowed lookalikes (e.g. `supabase.co.attacker.example`).

---

## 3. Persistence & Resolution Strategy

To achieve deterministic persistence without storing expiring URLs in the database:

```
[User Upload (File)]
       │
       ▼
[POST /api/user/avatar]
  ├─> 1. Signature & MIME validation (JPEG, PNG, WebP)
  ├─> 2. Upload to private 'avatars' bucket: {user_id}/{uuid}.{ext}
  ├─> 3. Generate signed URL (60-minute duration)
  ├─> 4. UPDATE profiles SET avatar_path = filePath WHERE id = user.id
  └─> 5. Verify database update row count (or cleanup storage on failure)
       │
       ▼
[GET /api/user/avatar (Cache-Control: no-store)]
  ├─> Read profiles.avatar_path
  ├─> Generate fresh signed URL via authenticated client
  └─> Return fresh signed URL + provider avatar fallback
       │
       ▼
[Server Components: /account & /profile]
  └─> Call resolveProfileAvatarUrl(supabase, profile) server-side
       │
       ▼
[Client Components: Header & UserNavDropdown]
  ├─> Call /api/user/avatar on load/login
  └─> Listen to cybertube:avatar-updated custom event for instantaneous UI updates
```

---

## 4. Phase 14.1.1 — Strict Avatar URL Validation

In [src/components/ui/UserAvatar.tsx](file:///C:/User/REA_Project/src/components/ui/UserAvatar.tsx#L16-L50):

```typescript
const ALLOWED_EXACT_HOSTS = new Set([
  'avatars.githubusercontent.com',
  'lh3.googleusercontent.com',
  'github.com',
  'supabase.co',
]);

const ALLOWED_SUFFIX_DOMAINS = [
  '.supabase.co',
  '.googleusercontent.com',
];

export function isSafeHttpsUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    // Allow HTTP only for local development on localhost or 127.0.0.1
    if (parsed.protocol === 'http:') {
      return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    }
    // All remote URLs must be HTTPS
    if (parsed.protocol !== 'https:') {
      return false;
    }

    const host = parsed.hostname.toLowerCase();

    // 1. Exact match on approved hosts
    if (ALLOWED_EXACT_HOSTS.has(host)) {
      return true;
    }

    // 2. Strict dot-boundary suffix matching (e.g. `*.supabase.co`, `*.googleusercontent.com`)
    return ALLOWED_SUFFIX_DOMAINS.some((suffix) => host.endsWith(suffix));
  } catch {
    return false;
  }
}
```

### Validation Matrix:
- `https://iwcbuvutqhwxgovkecfa.supabase.co/...` → **ALLOWED** (dot-boundary suffix `.supabase.co`)
- `https://avatars.githubusercontent.com/...` → **ALLOWED** (exact match)
- `https://lh3.googleusercontent.com/...` → **ALLOWED** (exact match and dot-boundary suffix)
- `http://localhost:54321/...` → **ALLOWED** (explicit local development)
- `https://supabase.co.attacker.example/...` → **REJECTED**
- `https://attacker-supabase.co/...` → **REJECTED**
- `https://vercel.app.attacker.example/...` → **REJECTED**
- `https://cybertube.vercel.app/...` → **REJECTED** (unnecessary allowance removed)
- `http://iwcbuvutqhwxgovkecfa.supabase.co/...` → **REJECTED** (insecure HTTP remote)

---

## 5. All Avatar Locations Fixed

| Location | Component | Resolution Strategy |
| :--- | :--- | :--- |
| **Account Settings Header** | `app/account/page.tsx` | Resolves signed URL server-side via `resolveProfileAvatarUrl` |
| **Account Settings Form** | `app/account/AccountSettingsForm.tsx` | Receives `initialAvatarUrl` and passes to `AvatarUploadControl` |
| **Avatar Upload Control** | `src/components/profile/AvatarUploadControl.tsx` | Queries `/api/user/avatar` on mount; dispatches `cybertube:avatar-updated` on upload/reset |
| **Profile Page Header** | `app/profile/page.tsx` | Resolves signed URL server-side via `resolveProfileAvatarUrl` |
| **Global Navigation Header** | `src/components/Header.tsx` | Resolves signed URL on mount via `/api/user/avatar` and subscribes to avatar updates |
| **User Dropdown Menu** | `src/components/navigation/UserNavDropdown.tsx` | Renders `<UserAvatar>` directly with graceful fallback to initials |
| **Core Avatar Component** | `src/components/ui/UserAvatar.tsx` | Resets `imageError` whenever URL prop changes; strict URL validation |

---

## 6. Verification & Quality Gates

### Complete Gate Results:

1. **TypeScript (`npx tsc --noEmit`):**
   ```
   Exit code: 0
   Errors: 0
   ```
2. **ESLint (`npm run lint`):**
   ```
   Exit code: 0
   Errors: 0 (2 warnings in unrelated components)
   ```
3. **Production Build (`npm run build`):**
   ```
   Exit code: 0
   78 static and dynamic routes compiled successfully in 9.4s.
   ```
4. **Catalog & HTTP Route Checks (`npm test`):**
   ```
   ✔ Resource Catalog — Data Model Integrity (2.47ms)
   ✔ Taxonomy Coverage — All 11 Resource Types Represented (0.29ms)
   ✔ Taxonomy Coverage — All 11 Cybersecurity Domains Represented (0.28ms)
   ✔ Search Functionality — Keyword Matching Across Fields (1.63ms)
   ✔ Multi-Facet Filtering Conjunction (0.47ms)
   ✔ Sorting Determinism (15.19ms)
   ✔ Resource Lookup & Unknown Slug Handling (0.40ms)
   ✔ Live Facet Counts Calculation (0.51ms)
   Pass: 8/8 catalog tests + 7/7 HTTP live routes (Status 200/404 verified)
   ```
5. **Phase 14.1 / 14.1.1 Dedicated Test Suite (`tests/19_phase14_1_avatar_persistence.spec.ts`):**
   ```
   16 passed (5.3s)
   - Database types include avatar_path in Row, Insert, and Update
   - app/api/user/avatar/route.ts implements hardened persistence contracts
   - src/components/ui/UserAvatar.tsx resets imageError on URL changes
   - Server components resolve signed URLs server-side from avatar_path
   - Header and UserNavDropdown synchronize with avatar events
   - GET /api/user/avatar enforces authentication and returns no-store headers
   - POST /api/user/avatar enforces authentication gate
   - DELETE /api/user/avatar enforces authentication gate
   - resolveProfileAvatarUrl resolves signed URL when avatar_path is present
   - resolveProfileAvatarUrl falls back to avatar_url when avatar_path is null
   - resolveProfileAvatarUrl falls back to provider avatar if signed URL creation fails
   - resolveProfileAvatarUrl returns null when profile is undefined or null
   - isSafeHttpsUrl accepts valid Supabase Storage signed URLs
   - isSafeHttpsUrl accepts valid GitHub and Google avatar hosts
   - isSafeHttpsUrl accepts approved local development URLs
   - isSafeHttpsUrl rejects attacker-controlled and lookalike domains
   ```
6. **Full Playwright Suite (`npx playwright test`):**
   ```
   119 passed (2.3m) across 19 test suites
   0 failed, 0 flaky, 0 skipped
   ```

---

## 7. Preview Verification & Environment Findings

- **Vercel Preview Deployment:** [`dpl_GqRHU4aEfhaevadjGNd5drE2kDMm`](https://vercel.com/codex-arun/cybertube/GqRHU4aEfhaevadjGNd5drE2kDMm) — **● Ready**
- **Alias URL:** `https://cybertube-git-fix-phase-14-1-avatar-persistence-codex-arun.vercel.app`
- **Environment Audit:**
  - Inspection of Vercel project configuration (`vercel env ls --project cybertube`) confirmed that all database and Supabase environment variables are scoped to `environments: Production`.
  - No isolated preview database or storage bucket exists in the cloud integration.
  - The Supabase GitHub integration check-run on PR #4 was skipped with:  
    `"This git branch is not associated with any Supabase Branch. Creating a new preview branch per PR is disabled."`
- **Honest Integration Distinction:**
  - **Verified via Unit & Playwright Suites:** Persistence contract logic, server-side signed URL resolution, client-side event dispatching, avatar fallback hierarchy, error state resets, and strict URL security are 100% verified.
  - **Storage Safety Guarantee:** In accordance with instructions, no production avatars were uploaded, reset, or deleted during preview smoke tests, and no destructive migrations were executed against the live project.
  - **No Claim of Live Two-User Storage:** We explicitly **do not claim** live two-user storage verification in cloud preview because ephemeral Supabase branching remains disabled at the organizational settings level.
