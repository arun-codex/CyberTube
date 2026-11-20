# CyberTube authentication experience v2

## Scope

Professional, responsive redesign of the **Sign in** (\`/login\`) and **Join CyberTube** (\`/register\`) pages. This release improves presentation and accessibility, but **does not replace existing authentication providers, callback logic, or the Supabase session model**.

### Page layout

- Shared split-panel layout on desktop with subtle cybersecurity learning visual, product identity and a learning workflow.
- On small screens, show a single, compact card with a mobile-friendly form; decorative visual panel is hidden.
- Both dark and light themes use the same semantic CyberTube design tokens used by the rest of the site.
- Labels, buttons, inputs and help links have generous target size, clear focus states and readable typography.
- Entry reveal is about half a second; subtle ambient ornament is slow and unobtrusive. All motion is disabled with \`prefers-reduced-motion: reduce\`. No content requires motion to function.

### Login UX

- Existing Google/GitHub OAuth buttons retain \`getAuthCallbackUrl(getSafeRedirectPath(...))\` and current Supabase client flow.
- Email/password form retains \`AuthProvider.signInWithPassword\` and safe relative \`router.replace\` navigation.
- Password visibility toggle, autocomplete attributes, accessible errors, loading status and links to registration/forgot password.
- Existing \`identity_link_conflict\` guidance continues to explain account linking without creating duplicate accounts.
- Do not hardcode example production/local email addresses, passwords or credentials in placeholders.

### Registration UX

- Existing \`registerAction\` and Supabase email-verification workflow retained.
- Display name and email input with browser validation.
- Password show/hide, at least eight characters, visual length/variety guidance and confirm-password match message. Guidance is indicative, **not a security strength guarantee**.
- Uses existing terms/privacy links and success message; does not claim successful verification when the user still needs to check email.
- Carries safe \`redirect\` query through sign-in link and social sign-in; email confirmation retains the server's existing callback destination.

### Security and privacy non-goals

- No auto-login or silent account linking.
- No changed RLS or Supabase schema.
- No password analytics, credential caching, persistence in localStorage or browser logs.
- No OAuth client secrets added.
- All password checks on the client are convenience UX; the server's existing password-length check remains authoritative.
- Continue to validate and allowlist OAuth redirect URLs in Supabase settings; no extra domains are added by this PR.

### Verification

- \`npm run test:auth-ui\` — source-level regression checks for auth wiring, reduced motion, accessibility and themes.
- \`npx tsc --noEmit\`, \`npm run build\`.
- \`npx playwright test tests/37_auth_experience_v2.spec.ts --project=chromium\` — password visibility, registration feedback, mobile viewport, both themes, reduced-motion behavior, and preservation of redirect links.
- Before production, separately validate real Google/GitHub sign-in and the email-verification link with test accounts on the **correct canonical domain**.
- Verify error states, focus order, 200% zoom and color contrast manually in browser. A static test or screenshots cannot prove end-to-end OAuth connectivity.

## Files

- \`app/login/page.tsx\`
- \`app/register/page.tsx\`
- \`src/components/auth/AuthExperience.tsx\`
- \`src/components/auth/SocialAuthButtons.tsx\`
- \`app/globals.css\` (scoped animation styles)
- \`test/auth-experience-v2.test.ts\`
- \`tests/37_auth_experience_v2.spec.ts\`

## Deployment

GitHub code, preview builds and the live Vercel production site are separate release states. Confirm the production deployment SHA matches the merged commit before reporting the site live. Any provider or site URL configuration still belongs in the existing Supabase and Vercel settings.
