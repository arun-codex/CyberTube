# GitHub OAuth Account-Linking Remediation

**Status:** Code remediation implemented on a feature branch. Production Auth configuration still requires the manual-linking option to be enabled before the recovery action can complete.

## Incident

The GitHub provider authorization reached the Supabase Auth callback, which returned:

`Multiple accounts with the same email address in the same linking domain detected: default`

The failure occurs inside Supabase Auth before CyberTube's `/auth/callback` route receives an authorization code. This is an identity-linking decision, not a Next.js redirect or PKCE callback failure.

## Read-only production investigation

Read-only queries against the linked production Supabase project found:

- The existing CyberTube account had one `auth.users` row for the current Google/email account.
- Its email, Google and GitHub identities were attached to that same user ID.
- The stored GitHub identity was username `arun-codex`, provider ID `66496814`.
- The GitHub identity's stored email differed from the account's primary email.
- No duplicate groups were found for the stored `auth.users.email` or `auth.identities.email` values inspected.

These results do **not** prove that GitHub's live OAuth response contains only one verified email. Supabase can evaluate multiple verified provider emails during automatic linking. We cannot read the complete email list returned by GitHub from the stored identity row.

No production records were modified. No Auth users or identities were deleted, unlinked, or merged.

## Code remediation

1. Added `src/components/auth/ConnectedAccounts.tsx`.
   - Shows identities already connected to the signed-in CyberTube user.
   - Offers an explicit GitHub `linkIdentity({ provider: 'github' })` action while a user is already authenticated.
   - Uses a same-origin `/auth/callback` URL and returns to Account Settings.
   - Explains disabled manual linking and already-linked identity responses without exposing raw Auth internals.
   - Does not mutate users or identities outside the authenticated Supabase Auth linking flow.

2. Updated `app/account/page.tsx` to expose Connected sign-in accounts and show the current provider identities.

3. Updated `app/auth/callback/route.ts` to map Supabase's known multiple-account linking error to a safe recovery reason rather than displaying the raw provider error.

4. Updated `app/login/page.tsx` to instruct users to sign in with their existing Google/email account first, then connect GitHub from Account Settings. It explicitly warns against creating a second CyberTube account.

5. Added `tests/22_github_identity_linking_recovery.spec.ts` covering the recovery message, callback mapping and explicit account-linking contract.

## Required Supabase setting

Supabase documents manual identity linking as an opt-in feature. It must be enabled in the hosted project's Authentication configuration before `linkIdentity()` can complete:

[Supabase Identity Linking documentation](https://supabase.com/docs/guides/auth/auth-identity-linking)

For production project `iwcbuvutqhwxgovkecfa`:

1. Open **Authentication → Settings** (or the Auth configuration options in the Dashboard).
2. Enable **Allow manual linking**.
3. Save the setting.
4. Sign in to CyberTube using the existing working Google/email account.
5. Open **Account Settings → Connected sign-in accounts** and link the intended GitHub account.

If Supabase reports that this identity is already linked, do not delete it. That means the candidate identity is already attached somewhere; further diagnosis is required before any identity changes.

## Safety boundaries

- No migration or SQL DDL.
- No writes to `auth.users` or `auth.identities`.
- No service-role usage in the browser.
- No automatic account merging.
- No unlink/delete operation.
- Existing profile, course progress and bookmarks remain associated with the original user ID.

## Git and verification

- Branch: `fix/github-oauth-manual-identity-linking`
- Feature scope: Account Settings recovery + safe callback messaging.
- Test file: `tests/22_github_identity_linking_recovery.spec.ts`
- Automated test execution and Vercel Preview build results are recorded separately after the branch deployment check completes.

**Important:** Shipping the application code alone does not turn on Supabase manual linking. The Dashboard setting is a necessary hosted Auth configuration step, not a Git change.
