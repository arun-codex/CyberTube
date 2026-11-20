'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BookOpen, Check, CircleHelp, Eye, EyeOff, Fingerprint,
  GraduationCap, LockKeyhole, Mail, ShieldCheck, Sparkles, Target, UserRound,
  type LucideIcon,
} from 'lucide-react';

type AuthMode = 'login' | 'register';

const inputClass = [
  'auth-field h-12 w-full rounded-xl border border-[var(--border-strong)]',
  'bg-[var(--surface-subtle)] pl-11 pr-12 text-sm text-[var(--text-primary)]',
  'placeholder:text-[var(--text-muted)] outline-none transition-[border-color,box-shadow,background-color]',
  'duration-200 focus:border-[var(--accent-cyan)] focus:bg-[var(--card-bg)]',
  'focus:ring-[3px] focus:ring-[var(--accent-cyan-subtle)]',
  'disabled:cursor-not-allowed disabled:opacity-60',
].join(' ');

const FIELD_ICONS = {
  email: Mail,
  name: UserRound,
} as const;

export function AuthExperience({
  mode,
  children,
}:{
  mode:AuthMode;
  children:React.ReactNode;
}) {
  const registering=mode==='register';
  return (
    <div className="auth-experience relative isolate flex w-full flex-1 items-center overflow-hidden bg-[var(--canvas)] px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div aria-hidden="true" className="auth-glow pointer-events-none absolute left-[-12%] top-[-25%] h-[530px] w-[530px] rounded-full" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 right-[-12%] h-[440px] w-[440px] rounded-full bg-[var(--accent-cyan-subtle)] blur-[110px]" />
      <div className="relative mx-auto grid w-full max-w-[1080px] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card-bg)] shadow-[0_28px_90px_-48px_rgba(5,13,32,0.35)] lg:min-h-[660px] lg:grid-cols-[0.92fr_1.08fr] dark:shadow-[0_35px_110px_-45px_rgba(0,0,0,0.7)]">
        <aside className="auth-enter relative hidden flex-col justify-between overflow-hidden bg-[#0B1625] px-9 py-10 text-white lg:flex xl:px-11 xl:py-12">
          <div aria-hidden="true" className="auth-orb pointer-events-none absolute -right-28 -top-24 h-72 w-72 rounded-full border border-cyan-300/15 bg-cyan-400/10 blur-[3px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[85px]" />
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-300">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              CyberTube <span className="font-mono text-[10px] font-semibold tracking-wider text-cyan-300">EDU</span>
            </Link>
            <p className="mt-12 font-mono text-[11px] font-semibold uppercase tracking-[0.23em] text-cyan-300/90">
              {registering?'Your next chapter begins here':'Your learning journey continues'}
            </p>
            <h2 className="mt-4 max-w-sm text-4xl font-extrabold leading-[1.16] tracking-tight !text-white xl:text-[43px]">
              {registering?'Learn with purpose. Build with confidence.':'Pick up where your progress left off.'}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Structured cybersecurity learning, real-world practice and a workspace that moves with you.
            </p>
          </div>

          <div className="relative mt-9">
            <div className="auth-visual-card rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.65)] backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.13em] text-slate-300">Your learning workspace</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/> Personal
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {label:'Learn',Icon:BookOpen,detail:'Courses'},
                  {label:'Practice',Icon:Target,detail:'Labs'},
                  {label:'Grow',Icon:GraduationCap,detail:'Skills'},
                ].map(({label,Icon,detail},index)=>(
                  <div key={label} className="auth-stage rounded-xl border border-white/10 bg-white/[0.06] px-2 py-4 text-center" style={{animationDelay:(index*90)+'ms'}}>
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                      <Icon className="h-4 w-4" aria-hidden="true"/>
                    </span>
                    <span className="mt-3 block text-xs font-semibold text-white">{label}</span>
                    <span className="mt-1 block text-[10px] text-slate-400">{detail}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] leading-5 text-slate-300">
                <Check className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true"/>
                Your courses, labs and notes in one place
              </div>
            </div>
            <div className="mt-7 flex items-center gap-2 text-xs text-slate-400">
              <Fingerprint className="h-4 w-4 text-cyan-300" aria-hidden="true"/>
              Your personal learning space
            </div>
          </div>
        </aside>

        <section className="auth-enter-delayed flex min-w-0 flex-col justify-center px-5 py-8 sm:px-9 sm:py-10 lg:px-10 xl:px-14">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-cyan)] lg:opacity-0 lg:pointer-events-none">
                <ArrowRight className="h-3.5 w-3.5 rotate-180" aria-hidden="true"/> Back to home
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent-cyan)]" aria-hidden="true"/>
                Free learning platform
              </span>
            </div>
            {children}
          </div>
          <div className="mx-auto mt-7 flex w-full max-w-[420px] items-center justify-center gap-1.5 text-center text-[11px] text-[var(--text-muted)]">
            <CircleHelp className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/>
            Need help? <Link href="/contact" className="font-semibold text-[var(--accent-cyan)] hover:underline">Contact CyberTube</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export function AuthHeading({mode}: {mode:AuthMode}) {
  return <div className="mb-6">
    <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.19em] text-[var(--accent-cyan)]">
      {mode==='login'?'Welcome back':'Create your account'}
    </p>
    <h1 id="auth-heading" className="text-[27px] font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-[30px]">
      {mode==='login'?'Sign in to CyberTube':'Join CyberTube'}
    </h1>
    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
      {mode==='login'
        ?'Continue your courses, labs, skill progress and saved resources.'
        :'Create your free account and build a personal cybersecurity learning space.'}
    </p>
  </div>;
}

export function AuthDivider({mode}:{mode:AuthMode}) {
  return <div className="flex items-center gap-3 py-1" aria-hidden="true">
    <span className="h-px flex-1 bg-[var(--border)]"/>
    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
      {mode==='login'?'or continue with email':'or register with email'}
    </span>
    <span className="h-px flex-1 bg-[var(--border)]"/>
  </div>;
}

export function AuthTextField({
  id, name, label, type='text', placeholder, autoComplete, Icon, disabled, value, onChange,
  maxLength, minLength, describedBy,
}:{
  id:string;name:string;label:string;type?:'text'|'email';placeholder:string;
  autoComplete?:string;Icon?:LucideIcon;disabled?:boolean;value?:string;
  onChange?:(event:React.ChangeEvent<HTMLInputElement>)=>void;
  maxLength?:number;minLength?:number;describedBy?:string;
}) {
  const FieldIcon=Icon || FIELD_ICONS.email;
  return <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-semibold text-[var(--text-primary)]">{label}</label>
    <div className="relative">
      <FieldIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true"/>
      <input id={id} name={name} type={type} required
        placeholder={placeholder} autoComplete={autoComplete} disabled={disabled}
        value={value} onChange={onChange} maxLength={maxLength} minLength={minLength}
        aria-describedby={describedBy} className={inputClass+' pr-4'}/>
    </div>
  </div>;
}

export function AuthPasswordField({
  id,name,label,autoComplete,disabled,value,onChange,minLength,describedBy,
}:{
  id:string;name:string;label:string;autoComplete:string;disabled?:boolean;
  value?:string;onChange?:(event:React.ChangeEvent<HTMLInputElement>)=>void;
  minLength?:number;describedBy?:string;
}) {
  const [visible,setVisible]=useState(false);
  return <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-semibold text-[var(--text-primary)]">{label}</label>
    <div className="relative">
      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true"/>
      <input id={id} name={name} type={visible?'text':'password'} required
        autoComplete={autoComplete} minLength={minLength} disabled={disabled}
        value={value} onChange={onChange} aria-describedby={describedBy}
        placeholder="Enter your password" className={inputClass}/>
      <button type="button" onClick={()=>setVisible(current=>!current)}
        disabled={disabled} aria-label={(visible?'Hide':'Show')+' '+label.toLowerCase()}
        aria-pressed={visible}
        className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] outline-none transition-colors hover:bg-[var(--accent-cyan-subtle)] hover:text-[var(--accent-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] disabled:opacity-50">
        {visible?<EyeOff className="h-4 w-4" aria-hidden="true"/>:<Eye className="h-4 w-4" aria-hidden="true"/>}
      </button>
    </div>
  </div>;
}

export function AuthLegal({registering=false}:{registering?:boolean}){
  return <p className="text-center text-[11px] leading-5 text-[var(--text-muted)]">
    {registering?'By creating an account':'By continuing'}, you agree to our{' '}
    <Link href="/terms" className="font-semibold text-[var(--text-secondary)] underline underline-offset-2 hover:text-[var(--accent-cyan)]">Terms</Link>{' '}
    and{' '}
    <Link href="/privacy" className="font-semibold text-[var(--text-secondary)] underline underline-offset-2 hover:text-[var(--accent-cyan)]">Privacy Policy</Link>.
  </p>;
}

export const authSubmitClass=[
  'group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl',
  'bg-[var(--accent-cyan)] px-4 py-3 text-sm font-bold text-[#06141D]',
  'shadow-[0_10px_24px_-15px_rgba(8,145,178,0.8)]',
  'outline-none transition-[transform,box-shadow,background-color] duration-200',
  'hover:-translate-y-0.5 hover:bg-[var(--accent-cyan-hover)]',
  'focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2',
  'focus-visible:ring-offset-[var(--card-bg)] active:translate-y-0',
  'disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0',
].join(' ');
