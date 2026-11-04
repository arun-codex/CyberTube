# CyberTube Phase 2: Security & RLS Specification

---

## 1. Row Level Security (RLS) Policy Matrix

Row Level Security is enabled across all public database tables. Separate policies govern `SELECT`, `INSERT`, `UPDATE`, and `DELETE` operations.

| Table | Operation | Target Role | Policy Condition |
| :--- | :---: | :---: | :--- |
| **`profiles`** | `SELECT` | `public` | `USING (true)` (Basic profiles are publicly viewable). |
| **`profiles`** | `INSERT` | `authenticated` | `WITH CHECK (auth.uid() = id)` (Users can only insert their own record). |
| **`profiles`** | `UPDATE` | `authenticated` | `USING (auth.uid() = id) WITH CHECK (auth.uid() = id)`. |
| **`resources`** | `SELECT` | `public` | `USING (publication_status = 'published')` (Drafts and archived items hidden). |
| **`resources`** | `INSERT/UPDATE/DELETE` | `service_role` | Disallowed for public/authenticated; handled server-only via `SUPABASE_SECRET_KEY`. |
| **`domains`** | `SELECT` | `public` | `USING (true)`. |
| **`tags`** | `SELECT` | `public` | `USING (true)`. |
| **`bookmarks`** | `SELECT` | `authenticated` | `USING (auth.uid() = user_id)`. |
| **`bookmarks`** | `INSERT` | `authenticated` | `WITH CHECK (auth.uid() = user_id)`. |
| **`bookmarks`** | `DELETE` | `authenticated` | `USING (auth.uid() = user_id)`. |
| **`collections`** | `SELECT` | `authenticated` | `USING (auth.uid() = user_id)`. |
| **`collections`** | `INSERT` | `authenticated` | `WITH CHECK (auth.uid() = user_id)`. |
| **`collections`** | `UPDATE` | `authenticated` | `USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)`. |
| **`collections`** | `DELETE` | `authenticated` | `USING (auth.uid() = user_id)`. |
| **`collection_resources`**| `ALL` | `authenticated` | Controlled via collection ownership subquery: `collections.user_id = auth.uid()`. |
| **`resource_submissions`**| `SELECT` | `authenticated` | `USING (auth.uid() = submitted_by)`. |
| **`resource_submissions`**| `INSERT` | `authenticated` | `WITH CHECK (auth.uid() = submitted_by AND review_status = 'pending')`. |

---

## 2. Administrative Security & Email Allowlist

1. **No Client Privilege Escalation**:
   - User roles or admin flags are never stored in `user_metadata` or client-editable profile fields.
2. **Server-Side Allowlist Enforcement**:
   - The environment variable `CYBERTUBE_ADMIN_EMAILS` holds a comma-separated list of approved admin emails.
   - `src/lib/supabase/admin.ts` provides `isAuthorizedAdminEmail(email)` which checks the verified `user.email` from `auth.getUser()`.
   - `middleware.ts` rejects any non-admin requesting `/admin/*` routes and redirects to `/`.
3. **Secret Key Isolation**:
   - The `SUPABASE_SECRET_KEY` is referenced strictly within `src/lib/supabase/admin.ts` and never prefixed with `NEXT_PUBLIC_`.
   - Client bundles cannot access the secret key under any circumstances.
