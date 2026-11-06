'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, CheckCircle2, Mail, Shield } from 'lucide-react';
import { forgotPasswordAction } from '@/app/actions/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData();
    formData.set('email', email);

    try {
      const result = await forgotPasswordAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.message);
      }
    } catch {
      setError('We could not process your request. Please try again in a moment.');
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
          <h1 className="text-xl font-semibold text-[#303055]">Forgot your password?</h1>
          <p className="text-xs text-[#6b6b7b] leading-relaxed">
            Enter the email address associated with your CyberTube account. We&apos;ll send you a secure reset link.
          </p>
        </div>

        {error && (
          <div role="alert" className="p-3 rounded-[4px] bg-[#fbeaea] border border-[#e8b5b5] text-[#984e4d] text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div role="status" data-testid="password-reset-email-sent" className="p-4 rounded-[4px] bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-sm space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Check your inbox</span>
            </div>
            <p className="text-xs leading-relaxed">
              {success} Check your spam or junk folder too. For security, this page does not reveal whether an account exists for that address.
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccess(null);
                setEmail('');
              }}
              className="text-xs font-semibold underline underline-offset-2"
            >
              Send another link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="recovery-email" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b]">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                <input
                  id="recovery-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] pl-9 pr-3 py-2 text-xs font-mono text-[#303055] placeholder-[#6b6b7b] focus:outline-none focus:border-[#303055] min-h-[42px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] text-white text-xs font-medium transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Sending reset link...' : 'Send password reset link'}
            </button>
          </form>
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
