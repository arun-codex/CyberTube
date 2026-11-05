'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Github, Link2, Loader2, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ConnectedIdentity {
  provider: string;
  label: string;
}

interface ConnectedAccountsProps {
  identities: ConnectedIdentity[];
}

function getLinkErrorMessage(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('manual linking') && normalized.includes('disabled')) {
    return 'GitHub account linking is not enabled in Supabase yet. In Supabase, open Authentication → Settings and enable “Allow manual linking”, then try again.';
  }

  if (normalized.includes('already linked') || normalized.includes('identity is already linked')) {
    return 'This GitHub identity is already attached to an account. Sign out of GitHub in your browser, choose the intended GitHub account, and retry. No account or learning data was changed.';
  }

  if (normalized.includes('not authenticated') || normalized.includes('session')) {
    return 'Your CyberTube session expired. Sign in with Google or email first, then return here to connect GitHub.';
  }

  return 'CyberTube could not link this GitHub identity. Your existing account was not changed. Check that you are signed in to the intended GitHub account and try again.';
}

export function ConnectedAccounts({ identities }: ConnectedAccountsProps) {
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const githubIdentities = identities.filter((identity) => identity.provider === 'github');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('identity_linked') === 'github') {
      setSuccess('GitHub was linked to this CyberTube account.');
      params.delete('identity_linked');
      const query = params.toString();
      const cleanUrl = query
        ? `${window.location.pathname}?${query}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, []);

  async function linkGitHubIdentity() {
    setError(null);
    setSuccess(null);
    setLinking(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Supabase is not configured in this environment.');
      }

      const callbackUrl = new URL('/auth/callback', window.location.origin);
      callbackUrl.searchParams.set('next', '/account?identity_linked=github');

      // This uses Supabase's explicit identity-linking flow while the user is
      // already authenticated. It avoids relying on email-based auto-linking.
      // Supabase redirects the browser to GitHub and back to this callback.
      const { error: linkError } = await supabase.auth.linkIdentity({
        provider: 'github',
        options: {
          redirectTo: callbackUrl.toString(),
        },
      });

      if (linkError) {
        throw linkError;
      }
      // In a browser, supabase-js performs the provider redirect automatically.
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      setError(getLinkErrorMessage(message));
      setLinking(false);
    }
  }

  return (
    <section
      aria-labelledby="connected-accounts-heading"
      className="rounded-[8px] border border-[#e4e4ed] dark:border-[#26263b] bg-[#f8f8fb] dark:bg-[#141422] p-5 sm:p-6 space-y-4"
    >
      <div className="flex items-start gap-3">
        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-white dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#30304a]">
          <ShieldCheck className="h-4 w-4 text-[#303055] dark:text-[#a5a6ff]" />
        </div>
        <div className="min-w-0">
          <h3 id="connected-accounts-heading" className="text-sm font-semibold text-[#303055] dark:text-[#f0f0f8]">
            Connected sign-in accounts
          </h3>
          <p className="mt-1 text-xs text-[#6b6b7b] dark:text-[#a0a0b8]">
            Link GitHub while signed in to your existing CyberTube account. This preserves your current profile, progress and bookmarks.
          </p>
        </div>
      </div>

      <div className="rounded-[6px] border border-[#e4e4ed] dark:border-[#30304a] bg-white dark:bg-[#10101b] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Github className="h-4 w-4 shrink-0 text-[#24292f] dark:text-white" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#303055] dark:text-[#f0f0f8]">GitHub</p>
              {githubIdentities.length > 0 ? (
                <p className="truncate text-[11px] text-[#6b6b7b] dark:text-[#a0a0b8]">
                  Connected: {githubIdentities.map((identity) => identity.label).join(', ')}
                </p>
              ) : (
                <p className="text-[11px] text-[#6b6b7b] dark:text-[#a0a0b8]">No GitHub identity linked yet</p>
              )}
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-mono uppercase tracking-wide text-[#6b6b7b] dark:text-[#a0a0b8]">
            {githubIdentities.length > 0 ? 'Linked' : 'Not linked'}
          </span>
        </div>
      </div>

      {success && (
        <div role="status" className="flex items-start gap-2 rounded-[4px] border border-[#a5d6a7] bg-[#e8f5e9] p-3 text-xs text-[#2e7d32]">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-[4px] border border-[#e8b5b5] bg-[#fbeaea] p-3 text-xs text-[#984e4d]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-[11px] leading-5 text-[#6b6b7b] dark:text-[#a0a0b8]">
          To connect a different GitHub account, sign out of GitHub in the browser first or use a private window before continuing.
        </p>
        <button
          type="button"
          onClick={linkGitHubIdentity}
          disabled={linking}
          className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-2 rounded-[4px] border border-[#303055] dark:border-[#6366f1] bg-[#303055] dark:bg-[#6366f1] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#252542] dark:hover:bg-[#4f46e5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {linking ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Link2 className="h-3.5 w-3.5" />}
          {linking ? 'Connecting GitHub…' : githubIdentities.length > 0 ? 'Link another GitHub account' : 'Connect GitHub'}
        </button>
      </div>
    </section>
  );
}
