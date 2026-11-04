'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { registerAction } from '@/app/actions/auth';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const res = await registerAction(formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#ffffff]">
      <div className="max-w-md w-full mx-auto space-y-6 bg-white border border-[#e4e4ed] rounded-[8px] p-6 sm:p-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] bg-[#303055] text-white mx-auto">
            <Shield className="w-5 h-5 fill-white stroke-none" />
          </div>
          <h2 className="text-xl font-semibold text-[#303055]">Join CyberTube</h2>
          <p className="text-xs text-[#6b6b7b]">
            Create a practitioner profile to sync courses, bookmarks, and learning roadmaps.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-[4px] bg-[#fbeaea] border border-[#e8b5b5] text-[#984e4d] text-xs flex items-start gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-[4px] bg-[#f4f4f9] border border-[#e4e4ed] text-[#303055] text-xs space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#303055]" />
              <span>Registration Successful</span>
            </div>
            <p className="text-[#403f53]">{success}</p>
            <Link
              href="/login"
              className="inline-block mt-2 font-mono text-xs text-[#303055] font-semibold underline"
            >
              Proceed to Sign In →
            </Link>
          </div>
        )}

        {!success && (
          <>
            {/* Social OAuth Buttons */}
            <SocialAuthButtons
              redirectPath="/account"
              onError={(msg: string) => setError(msg || null)}
              disabled={loading}
            />

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#e4e4ed]"></div>
              <span className="flex-shrink mx-3 text-[11px] font-mono text-[#6b6b7b] uppercase">
                or register with email
              </span>
              <div className="flex-grow border-t border-[#e4e4ed]"></div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b]">
                  Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                  <input
                    name="displayName"
                    type="text"
                    required
                    placeholder="Practitioner / Analyst"
                    className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] placeholder-[#6b6b7b] focus:outline-none focus:border-[#303055] min-h-[38px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="analyst@cybertube.local"
                    className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] placeholder-[#6b6b7b] focus:outline-none focus:border-[#303055] min-h-[38px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] placeholder-[#6b6b7b] focus:outline-none focus:border-[#303055] min-h-[38px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] placeholder-[#6b6b7b] focus:outline-none focus:border-[#303055] min-h-[38px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] text-white text-xs font-medium transition-colors disabled:opacity-50 min-h-[44px]"
              >
                {loading ? 'Creating Account...' : 'Register Profile'}
              </button>
            </form>
          </>
        )}

        <div className="pt-3 border-t border-[#e4e4ed] text-center text-xs text-[#6b6b7b]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#303055] font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
