'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type RecoveryStatus = 'checking' | 'ready' | 'expired' | 'invalid' | 'unavailable' | 'success';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<RecoveryStatus>('checking');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // 1. Inspect URL parameters and hash fragments for errors or tokens
    const queryErrorCode = searchParams.get('error_code');
    const queryError = searchParams.get('error') || searchParams.get('error_description');

    let hashErrorCode: string | null = null;
    let hashError: string | null = null;
    let hashHasRecovery = false;

    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      hashErrorCode = hashParams.get('error_code');
      hashError = hashParams.get('error_description') || hashParams.get('error');
      if (hashParams.get('type') === 'recovery' || hash.includes('type=recovery')) {
        hashHasRecovery = true;
      }
    }

    const effectiveErrorCode = queryErrorCode || hashErrorCode;
    const effectiveError = queryError || hashError;

    if (effectiveErrorCode === 'otp_expired' || /otp.*expired/i.test(effectiveError || '')) {
      setStatus('expired');
      setErrorMessage(
        'Your password reset link has expired. Password reset links are valid for a single use and expire after a limited time.'
      );
      return;
    }

    if (effectiveErrorCode || effectiveError) {
      setStatus('invalid');
      setErrorMessage(
        effectiveError || 'This password reset link is invalid or has already been used.'
      );
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setStatus('unavailable');
      return;
    }

    // 2. Legitimate recovery session verification
    // Must have cybertube_recovery_session cookie/flag, PASSWORD_RECOVERY event, or recovery hash
    const hasCookieMarker =
      typeof document !== 'undefined' &&
      document.cookie.includes('cybertube_recovery_session=1');
    const hasStorageMarker =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem('cybertube_recovery_session') === '1';
    const isExplicitRecovery = hasCookieMarker || hasStorageMarker || hashHasRecovery;

    if (isExplicitRecovery && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('cybertube_recovery_session', '1');
    }

    let active = true;

    // Listen for PASSWORD_RECOVERY event from Supabase client
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === 'PASSWORD_RECOVERY') {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('cybertube_recovery_session', '1');
        }
        setStatus('ready');
      } else if (session && isExplicitRecovery) {
        setStatus('ready');
      }
    });

    // Check user session
    void supabase.auth
      .getUser()
      .then(({ data, error: authError }) => {
        if (!active) return;
        if (data?.user && !authError) {
          // If a user session exists, only treat as 'ready' if recovery intent was verified.
          // Ordinary authenticated users navigating to /reset-password directly cannot masquerade.
          if (isExplicitRecovery) {
            setStatus('ready');
          } else {
            setStatus('invalid');
            setErrorMessage(
              'This reset link is invalid or has already been used. If you need to reset your password, please request a new link.'
            );
          }
        } else {
          // No user session found
          if (isExplicitRecovery) {
            // Might be waiting on hash fragment token processing by Supabase
            // If hash has access token, give Supabase a moment
            if (hashHasRecovery) {
              return;
            }
          }
          setStatus('invalid');
          setErrorMessage(
            'This reset link is invalid or has already been used. If you need to reset your password, please request a new link.'
          );
        }
      })
      .catch(() => {
        if (active) {
          setStatus('invalid');
          setErrorMessage(
            'This reset link is invalid or has already been used. If you need to reset your password, please request a new link.'
          );
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [searchParams]);

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
        if (
          updateError.message.includes('expired') ||
          updateError.message.includes('invalid') ||
          (updateError as any).status === 401
        ) {
          setStatus('expired');
          setErrorMessage(
            'Your password reset session has expired. Please request a new link.'
          );
          return;
        }
        setError(updateError.message);
        return;
      }

      // Clear recovery cookies and storage flags
      if (typeof document !== 'undefined') {
        document.cookie =
          'cybertube_recovery_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('cybertube_recovery_session');
      }

      // Clear local recovery session so user explicitly signs in with new password
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
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#ffffff] dark:bg-[#0B1018]">
      <section className="max-w-md w-full mx-auto space-y-6 bg-white dark:bg-[#121A26] border border-[#e4e4ed] dark:border-[#243044] rounded-[8px] p-6 sm:p-8 shadow-sm">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] bg-[#303055] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] mx-auto">
            <Shield className="w-5 h-5 fill-white dark:fill-[#0B1018] stroke-none" />
          </div>
          <h1 className="text-xl font-semibold text-[#303055] dark:text-[#E6EDF3]">
            {status === 'success'
              ? 'Password updated'
              : status === 'expired'
                ? 'Reset link expired'
                : status === 'invalid'
                  ? 'Invalid reset link'
                  : 'Set a new password'}
          </h1>
          <p className="text-xs text-[#6b6b7b] dark:text-[#9BA8B7] leading-relaxed">
            {status === 'success'
              ? 'Your CyberTube password has been changed. Sign in using your new credentials.'
              : status === 'expired'
                ? 'Your password reset link has expired.'
                : status === 'invalid'
                  ? 'This reset link is invalid or has already been used.'
                  : 'Choose a strong password with at least 8 characters.'}
          </p>
        </div>

        {status === 'checking' && (
          <div
            role="status"
            className="rounded-[4px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#1A2433] p-4 text-xs text-[#403f53] dark:text-[#9BA8B7] text-center"
          >
            Verifying your password reset link...
          </div>
        )}

        {status === 'ready' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                role="alert"
                className="p-3 rounded-[4px] bg-[#fbeaea] dark:bg-[#3d1a1a] border border-[#e8b5b5] dark:border-[#7a2e2e] text-[#984e4d] dark:text-[#f87171] text-xs flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="new-password"
                className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#9BA8B7]"
              >
                New password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b] dark:text-[#9BA8B7]" />
                <input
                  id="new-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] rounded-[4px] pl-9 pr-10 py-2 text-xs font-mono text-[#303055] dark:text-[#E6EDF3] focus:outline-none focus:border-[#303055] dark:focus:border-[#22D3EE] min-h-[42px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide new password' : 'Show new password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b7b] dark:text-[#9BA8B7] hover:text-[#303055] dark:hover:text-[#E6EDF3]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="confirm-password"
                className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#9BA8B7]"
              >
                Confirm new password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b] dark:text-[#9BA8B7]" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] rounded-[4px] pl-9 pr-10 py-2 text-xs font-mono text-[#303055] dark:text-[#E6EDF3] focus:outline-none focus:border-[#303055] dark:focus:border-[#22D3EE] min-h-[42px]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={
                    showConfirmPassword
                      ? 'Hide confirmation password'
                      : 'Show confirmation password'
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b7b] dark:text-[#9BA8B7] hover:text-[#303055] dark:hover:text-[#E6EDF3]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] dark:bg-[#22D3EE] dark:hover:bg-[#06B6D4] text-white dark:text-[#0B1018] text-xs font-semibold transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Updating password...' : 'Update password'}
            </button>
          </form>
        )}

        {status === 'expired' && (
          <div
            data-testid="password-reset-unavailable"
            className="rounded-[4px] border border-[#e8b5b5] dark:border-[#7a2e2e] bg-[#fbeaea] dark:bg-[#3d1a1a] p-4 space-y-3 text-xs text-[#984e4d] dark:text-[#f87171]"
          >
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Your password reset link has expired</span>
            </div>
            <p className="leading-relaxed">
              Password reset links are valid for a single use and expire after a limited time. Please
              request a new reset link to continue.
            </p>
            <div>
              <Link
                href="/forgot-password"
                className="inline-block font-semibold underline underline-offset-2 hover:opacity-80"
              >
                Request another reset link
              </Link>
            </div>
          </div>
        )}

        {(status === 'invalid' || status === 'unavailable') && (
          <div
            data-testid="password-reset-unavailable"
            className="rounded-[4px] border border-[#e8b5b5] dark:border-[#7a2e2e] bg-[#fbeaea] dark:bg-[#3d1a1a] p-4 space-y-3 text-xs text-[#984e4d] dark:text-[#f87171]"
          >
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {status === 'invalid' ? 'Reset link invalid or expired' : 'Password reset unavailable'}
              </span>
            </div>
            <p className="leading-relaxed">
              {errorMessage ||
                (status === 'invalid'
                  ? 'This reset link is invalid or has already been used. If you need to reset your password, please request a new link.'
                  : 'Supabase authentication is not configured in this environment.')}
            </p>
            <div>
              <Link
                href="/forgot-password"
                className="inline-block font-semibold underline underline-offset-2 hover:opacity-80"
              >
                Request another reset link
              </Link>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div
            role="status"
            className="rounded-[4px] border border-[#a7f3d0] dark:border-[#065f46] bg-[#ecfdf5] dark:bg-[#064e3b]/30 p-4 space-y-3 text-sm text-[#065f46] dark:text-[#34d399]"
          >
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Password updated successfully</span>
            </div>
            <p className="text-xs leading-relaxed text-[#047857] dark:text-[#a7f3d0]">
              Your password has been changed. You can now sign in with your new credentials.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold underline underline-offset-2 hover:opacity-80"
            >
              Continue to Sign In
            </Link>
          </div>
        )}

        <div className="pt-3 border-t border-[#e4e4ed] dark:border-[#243044] text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#303055] dark:text-[#22D3EE] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#ffffff] dark:bg-[#0B1018]">
          <section className="max-w-md w-full mx-auto p-6 text-center text-xs font-mono text-[#6b6b7b]">
            Loading...
          </section>
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
