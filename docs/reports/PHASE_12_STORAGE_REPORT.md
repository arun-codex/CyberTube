# CyberTube Phase 12 — Supabase Storage & Migration Repair Report

**Date:** 2026-11-05  
**Branch:** `feature/phase-12-platform-upgrade`  
**Target Environment:** Supabase Preview & Local Development  
**Status:** RESOLVED & VERIFIED

---

## 1. Root Cause Analysis: Supabase Preview Failure

### Reported Error
- **PostgreSQL Error Code:** `SQLSTATE 42501`
- **Error Message:** `ERROR: must be owner of table objects (SQLSTATE 42501)`
- **Offending Statement:**
  ```sql
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
  ```

### Technical Investigation
In Supabase managed PostgreSQL instances, the `storage.objects` table belongs to the internal system user `supabase_storage_admin`. Migration runners executing via GitHub Actions or the Supabase CLI authenticate as `postgres` or `anon`/`service_role`. Standard roles do not hold table ownership on `storage.objects` and are forbidden from altering table-level security definitions.

Furthermore, Supabase pre-enables Row Level Security on `storage.objects` by default upon project initialization. The redundant `ALTER TABLE` statement triggers an unrecoverable privilege violation in non-superuser preview deployment pipelines.

---

## 2. Migration Correction & Policy Architecture

### File: `supabase/migrations/20261105000000_add_avatar_path_and_storage_policy.sql`

1. **Removed Owner-Privileged Statement:**
   Removed `ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;`.
2. **Preserved Schema Integrity:**
   Maintained safe column addition on `public.profiles`:
   ```sql
   ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_path TEXT;
   ```
3. **Multi-Tenant Storage RLS Isolation:**
   Implemented clean, user-scoped storage policies on the `avatars` bucket:
   - **Upload / Insert:**
     ```sql
     CREATE POLICY "Users can upload their own avatar"
     ON storage.objects FOR INSERT
     WITH CHECK (
       bucket_id = 'avatars'
       AND (storage.foldername(name))[1] = auth.uid()::text
     );
     ```
   - **Read / Select:**
     ```sql
     CREATE POLICY "Users can view their own avatar object"
     ON storage.objects FOR SELECT
     USING (
       bucket_id = 'avatars'
       AND (storage.foldername(name))[1] = auth.uid()::text
     );
     ```
   - **Update / Overwrite:**
     ```sql
     CREATE POLICY "Users can update their own avatar"
     ON storage.objects FOR UPDATE
     USING (
       bucket_id = 'avatars'
       AND (storage.foldername(name))[1] = auth.uid()::text
     );
     ```
   - **Delete / Purge:**
     ```sql
     CREATE POLICY "Users can delete their own avatar"
     ON storage.objects FOR DELETE
     USING (
       bucket_id = 'avatars'
       AND (storage.foldername(name))[1] = auth.uid()::text
     );
     ```

---

## 3. Storage Configuration Specification (`supabase/config.toml`)

Defined bucket declaration for deterministic local CLI tests and preview environments:
```toml
[storage]
enabled = true
file_size_limit = "5242880" # 5MiB

[storage.buckets.avatars]
public = false
file_size_limit = "5242880"
allowed_mime_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
```

---

## 4. Account Avatar Upload Flow & Graceful Degradation

### API Enhancement (`app/api/user/avatar/route.ts`)
- Added `GET` endpoint for authenticated users to generate fresh signed URLs (`supabase.storage.from('avatars').createSignedUrl(...)`) with 1-hour expiry.
- Enforced strict magic number validation (`image/jpeg`, `image/png`, `image/webp`, `image/gif`) and 5MB payload limit.
- Returned HTTP 503 (`storage_bucket_unavailable`) with actionable advice if the cloud bucket is absent.

### Client UI Robustness (`src/components/profile/AvatarUploadControl.tsx`)
- Intercepted 503 responses and displayed a non-blocking toast: *"Storage service is initializing in this environment. Your profile remains active."*
- Maintained fallback initials generator so users are never blocked from account navigation.

---

## 5. Verification Matrix
- **Preview Syntax Validation:** Migration tested clean without ownership errors.
- **API Security Tests:** `tests/10_avatar_system.spec.ts` and `tests/12_phase12_platform.spec.ts` passed (GET returns 401 unauthenticated, rejects invalid magic numbers).
