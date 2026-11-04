'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import { loginAction } from '@/app/actions/auth';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';

function LoginForm() {
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirect') || searchParams.get('next') || '/account';
  // Safely ensure redirect does not lead to external domain
  const redirectPath = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
    ? rawRedirect
    : '/account';
  const reason = searchParams.get('reason');
  const urlError = searchParams.get('error');

  const [error, setError] = useState<string | null>(
    urlError || (reason === 'auth_required' ? 'Authentication is required to view this area.' : null)
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('redirect', redirectPath);

    try {
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch (err: any) {
      if (err?.message?.includes('NEXT_REDIRECT')) {
        return;
      }
      setError(err?.message || 'Failed to sign in. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto space-y-6 bg-white border border-[#e4e4ed] rounded-[8px] p-6 sm:p-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] bg-[#303055] text-white mx-auto">
          <Shield className="w-5 h-5 fill-white stroke-none" />
        </div>
        <h2 className="text-xl font-semibold text-[#303055]">Sign in to CyberTube</h2>
        <p className="text-xs text-[#767682]">
          Access persistent course progress and synchronized bookmarks.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-[4px] bg-[#fbeaea] border border-[#e8b5b5] text-[#984e4d] text-xs flex items-start gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Social OAuth Buttons */}
      <SocialAuthButtons
        redirectPath={redirectPath}
        onError={(msg: string) => setError(msg || null)}
        disabled={loading}
      />

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-[#e4e4ed]"></div>
        <span className="flex-shrink mx-3 text-[11px] font-mono text-[#767682] uppercase">
          or continue with email
        </span>
        <div className="flex-grow border-t border-[#e4e4ed]"></div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767682]" />
            <input
              name="email"
              type="email"
              required
              placeholder="analyst@cybertube.local"
              className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] placeholder-[#767682] focus:outline-none focus:border-[#303055] min-h-[38px]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767682]" />
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] placeholder-[#767682] focus:outline-none focus:border-[#303055] min-h-[38px]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] text-white text-xs font-medium transition-colors disabled:opacity-50 min-h-[44px]"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="pt-3 border-t border-[#e4e4ed] text-center text-xs text-[#767682]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#303055] font-medium hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#ffffff]">
      <Suspense fallback={<div className="font-mono text-xs text-[#767682]">Loading session...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
