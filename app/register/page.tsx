'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowRight, Check, CheckCircle2, LoaderCircle, UserRound } from 'lucide-react';
import { registerAction } from '@/app/actions/auth';
import { getSafeRedirectPath } from '@/lib/canonicalUrl';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import {
  AuthDivider, AuthExperience, AuthHeading, AuthLegal, AuthPasswordField,
  AuthTextField, authSubmitClass,
} from '@/components/auth/AuthExperience';

function passwordGuide(value:string){
  if(value.length<8)return {level:0,label:'Use at least 8 characters'};
  const variety=[/[a-z]/.test(value),/[A-Z]/.test(value),/\d/.test(value),/[^A-Za-z0-9]/.test(value)].filter(Boolean).length;
  if(value.length>=12&&variety>=3)return {level:3,label:'Stronger password'};
  if(value.length>=10&&variety>=2)return {level:2,label:'Good start — make it longer or more varied'};
  return {level:1,label:'Try a longer, more varied password'};
}

function RegisterForm(){
  const searchParams=useSearchParams();
  const redirectPath=getSafeRedirectPath(searchParams.get('redirect')||searchParams.get('next'),'/');
  const [displayName,setDisplayName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [error,setError]=useState<string|null>(null);
  const [success,setSuccess]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const guidance=passwordGuide(password);
  const mismatch=confirm.length>0&&confirm!==password;

  async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(loading)return;
    setError(null);
    setSuccess(null);

    if(displayName.trim().length<2){
      setError('Enter a display name with at least two characters.');
      return;
    }
    if(password.length<8){
      setError('Your password must contain at least 8 characters.');
      return;
    }
    if(password!==confirm){
      setError('Passwords do not match. Please check both fields.');
      return;
    }

    const formData=new FormData(event.currentTarget);
    formData.set('displayName',displayName.trim());
    formData.delete('confirmPassword');
    setLoading(true);
    try{
      const result=await registerAction(formData);
      if(result?.error)setError(result.error);
      else if(result?.success)setSuccess(result.message);
      else setError('Unable to create your account. Please try again.');
    }catch(err:unknown){
      setError(err instanceof Error?err.message:'Unable to register. Please try again.');
    }finally{setLoading(false);}
  }

  return (
    <AuthExperience mode="register">
      <AuthHeading mode="register"/>
      {error&&<div role="alert" aria-live="assertive"
        className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/[0.07] p-3.5 text-xs leading-5 text-rose-700 dark:text-rose-300">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"/>
        <span>{error}</span>
      </div>}
      {success?<div role="status" aria-live="polite" className="auth-enter space-y-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6"/>
          </span>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Account request received</h2>
            <p className="text-xs text-[var(--text-secondary)]">Your next step</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-[var(--text-secondary)]">{success}</p>
        <p className="text-xs text-[var(--text-secondary)]">
          If an email verification link is required, follow it before signing in.
        </p>
        <Link href={'/login?redirect='+encodeURIComponent(redirectPath)}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--accent-cyan)] px-4 py-3 text-sm font-bold text-[#06141D] hover:bg-[var(--accent-cyan-hover)]">
          Proceed to sign in <ArrowRight className="h-4 w-4" aria-hidden="true"/>
        </Link>
      </div>:<div className="space-y-5">
        <SocialAuthButtons redirectPath={redirectPath} onError={msg=>setError(msg||null)} disabled={loading}/>
        <AuthDivider mode="register"/>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <AuthTextField id="register-name" name="displayName" label="Display name"
            Icon={UserRound} placeholder="Your name" autoComplete="nickname" minLength={2} maxLength={80}
            value={displayName} onChange={event=>setDisplayName(event.target.value)} disabled={loading}/>
          <AuthTextField id="register-email" name="email" label="Email address"
            type="email" placeholder="you@example.com" autoComplete="email" maxLength={254}
            value={email} onChange={event=>setEmail(event.target.value)} disabled={loading}/>
          <div className="space-y-2">
            <AuthPasswordField id="register-password" name="password" label="Create password"
              autoComplete="new-password" minLength={8} value={password}
              onChange={event=>setPassword(event.target.value)} disabled={loading}
              describedBy="password-guidance"/>
            <div id="password-guidance" className="space-y-2" aria-live="polite">
              <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
                {[1,2,3].map(segment=><span key={segment}
                  className={'h-1.5 rounded-full transition-colors duration-200 '+
                    (guidance.level>=segment
                      ?'bg-[var(--accent-emerald)]'
                      :'bg-[var(--border)]')}/>)}
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">{guidance.label}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <AuthPasswordField id="register-confirm" name="confirmPassword"
              label="Confirm password" autoComplete="new-password" minLength={8}
              value={confirm} onChange={event=>setConfirm(event.target.value)}
              disabled={loading} describedBy="confirm-password-hint"/>
            <p id="confirm-password-hint" role={mismatch?'alert':undefined}
              className={'flex min-h-4 items-center gap-1.5 text-[11px] '+
                (mismatch?'text-rose-600 dark:text-rose-400':'text-[var(--text-secondary)]')}>
              {mismatch?'Passwords do not match yet.':confirm.length>0&&password===confirm?<>
                <Check className="h-3.5 w-3.5 text-[var(--accent-emerald)]" aria-hidden="true"/>
                Passwords match.
              </>:'Use a unique password that you do not reuse elsewhere.'}
            </p>
          </div>
          <button type="submit" className={authSubmitClass} disabled={loading} aria-busy={loading}>
            {loading?<><LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true"/>Creating account…</>:<>
              Create free account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true"/>
            </>}
          </button>
        </form>
        <AuthLegal registering/>
        <p className="border-t border-[var(--border)] pt-5 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link href={'/login?redirect='+encodeURIComponent(redirectPath)}
            className="font-bold text-[var(--accent-cyan)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]">
            Sign in
          </Link>
        </p>
      </div>}
    </AuthExperience>
  );
}

export default function RegisterPage(){
  return <Suspense fallback={<div className="flex min-h-[70vh] w-full items-center justify-center text-sm text-[var(--text-secondary)]">Loading registration form…</div>}>
    <RegisterForm/>
  </Suspense>;
}
