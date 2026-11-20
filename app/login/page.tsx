'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowRight, LoaderCircle, LockKeyhole } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { getSafeRedirectPath } from '@/lib/canonicalUrl';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import {
  AuthDivider, AuthExperience, AuthHeading, AuthLegal, AuthPasswordField,
  AuthTextField, authSubmitClass,
} from '@/components/auth/AuthExperience';

function LoginForm() {
  const router=useRouter();
  const searchParams=useSearchParams();
  const {signInWithPassword,isSigningIn}=useAuth();
  const redirectPath=getSafeRedirectPath(searchParams.get('redirect')||searchParams.get('next'),'/');
  const reason=searchParams.get('reason');
  const urlError=searchParams.get('error');

  const initialError=reason==='identity_link_conflict'
    ?'GitHub authorization completed, but your verified email addresses could not be safely matched to one CyberTube account. Your existing account and learning data have not been changed.'
    :reason==='auth_required'
      ?'Sign in to continue to this page.'
      :urlError;

  const [error,setError]=useState<string|null>(initialError);
  const [loading,setLoading]=useState(false);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  async function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(loading||isSigningIn)return;
    setError(null);

    if(!email.trim()||!password){
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try{
      const result=await signInWithPassword(email.trim(),password);
      if(!result.success){
        setError(result.error||'Sign in failed. Please check your credentials.');
        setLoading(false);
        return;
      }
      // The AuthProvider updates account state. Keep the existing safe redirect.
      router.replace(redirectPath);
      router.refresh();
    }catch(err:unknown){
      setError(err instanceof Error?err.message:'Unable to sign in. Please try again.');
      setLoading(false);
    }
  }

  const busy=loading||isSigningIn;
  return (
    <AuthExperience mode="login">
      <AuthHeading mode="login"/>
      {error&&<div role="alert" aria-live="assertive"
        className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/[0.07] p-3.5 text-xs leading-5 text-rose-700 dark:text-rose-300">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"/>
        <span>{error}</span>
      </div>}
      {reason==='identity_link_conflict'&&<div className="mb-5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3.5 text-xs leading-5 text-[var(--text-secondary)]">
        Sign in with your existing Google or email account first. Then visit Account Settings and connect GitHub under your sign-in accounts. If manual linking is disabled in Supabase, the project owner must enable it. Do not create a duplicate account.
      </div>}

      <div className="space-y-5">
        <SocialAuthButtons redirectPath={redirectPath} onError={msg=>setError(msg||null)} disabled={busy}/>
        <AuthDivider mode="login"/>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthTextField id="login-email" name="email" label="Email address"
            type="email" placeholder="you@example.com" autoComplete="email"
            maxLength={254} value={email} onChange={event=>setEmail(event.target.value)} disabled={busy}/>
          <div className="space-y-2">
            <AuthPasswordField id="login-password" name="password" label="Password"
              autoComplete="current-password" value={password}
              onChange={event=>setPassword(event.target.value)} disabled={busy}/>
            <div className="flex justify-end">
              <Link href="/forgot-password"
                className="rounded-sm text-xs font-semibold text-[var(--accent-cyan)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]">
                Forgot password?
              </Link>
            </div>
          </div>
          <button type="submit" disabled={busy} aria-busy={busy} className={authSubmitClass}>
            {busy?<>
              <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true"/>
              Signing you in…
            </>:<>
              Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true"/>
            </>}
          </button>
        </form>
        <AuthLegal/>
        <p className="border-t border-[var(--border)] pt-5 text-center text-sm text-[var(--text-secondary)]">
          New to CyberTube?{' '}
          <Link href={'/register?redirect='+encodeURIComponent(redirectPath)}
            className="font-bold text-[var(--accent-cyan)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]">
            Create an account
          </Link>
        </p>
      </div>
    </AuthExperience>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div className="flex min-h-[70vh] w-full items-center justify-center text-sm text-[var(--text-secondary)]">Loading sign-in form…</div>}>
    <LoginForm/>
  </Suspense>;
}
