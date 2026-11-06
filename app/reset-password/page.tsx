'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type RecoveryStatus = 'checking' | 'ready' | 'invalid' | 'unavailable' | 'success';

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<RecoveryStatus>('checking');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setStatus('unavailable');
      return;
    }

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === 'PASSWORD_RECOVERY' && session) {
        setStatus('ready');
      }
    });

    void supabase.auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;
      if (data.user && !authError) {
        setStatus((current) => current === 'ready' ? current : 'ready');
      } else {
        setStatus((current) => current === 'ready' ? current : 'invalid');
      }
    }).catch(() => {
      if (active) setStatus((current) => current === 'ready' ? current : 'invalid');
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Your new password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError('Password reset is unavailable because Supabase is not configured.');
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }

      // Clear this browser's recovery session so the user signs in with the new password.
      await supabase.auth.signOut({ scope: 'local' });
      setPassword('');
      setConfirmPassword('');
      setStatus('success');
    } catch {
      setError('We could not update your password. Request a new reset link and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#ffffff]">
      <section className="max-w-md w-full mx-auto space-y-6 bg-white border border-[#e4e4ed] rounded-[8px] p-6 sm:p-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] bg-[#303055] text-white mx-auto">
            <Shield className="w-5 h-5 fill-white stroke-none" />
          </div>
          <h1 className="text-xl font-semibold text-[#303055]">
            {status === 'success' ? 'Password updated' : 'Set a new password'}
          </h1>
          <p className="text-xs text-[#6b6b7b] leading-relaxed">
            {status === 'success'
              ? 'Your CyberTube password has been changed. Sign in using your new password.'
              : 'Choose a strong password with at least 8 characters.'}
          </p>
        </div>

        {status === 'checking' && (
          <div role="status" className="rounded-[4px] border border-[#e4e4ed] bg-[#f4f4f9] p-4 text-xs text-[#403f53] text-center">
            Verifying your password reset link...
          </div>
        )}

        {status === 'ready' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div role="alert" className="p-3 rounded-[4px] bg-[#fbeaea] border border-[#e8b5b5] text-[#984e4d] text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="new-password" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b]">
                New password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                <input
                  id="new-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-10 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[42px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide new password' : 'Show new password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b7b] hover:text-[#303055]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirm-password" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b]">
                Confirm new password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-10 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[42px]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b7b] hover:text-[#303055]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] text-white text-xs font-medium transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Updating password...' : 'Update password'}
            </button>
          </form>
        )}

        {(status === 'invalid' || status === 'unavailable') && (
          <div data-testid="password-reset-unavailable" className="rounded-[4px] border border-[#e8b5b5] bg-[#fbeaea] p-4 space-y-2 text-xs text-[#984e4d]">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>{status === 'invalid' ? 'Reset link expired or invalid' : 'Password reset unavailable'}</span>
            </div>
            <p className="leading-relaxed">
              {status === 'invalid'
                ? 'This reset link may have already been used or expired. Request a new reset link to continue.'
                : 'Supabase authentication is not configured in this environment. Please try again on the CyberTube production site.'}
            </p>
            <Link href="/forgot-password" className="inline-block font-semibold underline underline-offset-2">
              Request another reset link
            </Link>
          </div>
        )}

        {status === 'success' && (
          <div role="status" className="rounded-[4px] border border-[#a7f3d0] bg-[#ecfdf5] p-4 space-y-3 text-sm text-[#065f46]">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Password changed successfully</span>
            </div>
            <p className="text-xs leading-relaxed">
              Your password is updated. You can now sign in with your new credentials.
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold underline underline-offset-2">
              Go to sign in
            </Link>
          </div>
        )}

        <div className="pt-3 border-t border-[#e4e4ed] text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-xs font-medium text-[#303055] hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
