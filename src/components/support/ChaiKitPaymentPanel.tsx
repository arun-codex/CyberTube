'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AlertTriangle, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react';
import { defaultSupportConfig } from '@/lib/chaikit/config';
import { loadChaiKitScript } from '@/lib/chaikit/loader';
import type { CyberTubeSupportConfig } from '@/lib/chaikit/types';

const EXPECTED_UPI_ID='aruninzone@ptaxis';
const EXPECTED_PAYEE='Arun Kumar';

type Status='loading'|'ready'|'error';

function validatedConfig(remote:unknown):CyberTubeSupportConfig {
  if(!remote||typeof remote!=='object')return defaultSupportConfig;
  const input=remote as Partial<CyberTubeSupportConfig>;
  const live=input.livePaymentsEnabled===true && input.demoMode===false
    && input.upiId===EXPECTED_UPI_ID
    && input.paymentPayeeName===EXPECTED_PAYEE;
  // Browser-side second safety guard (the server checks these independently).
  return {
    ...defaultSupportConfig,
    upiId:live?EXPECTED_UPI_ID:'demo@upi',
    paymentPayeeName:live?EXPECTED_PAYEE:'CyberTube (demo only)',
    livePaymentsEnabled:live,
    demoMode:!live,
  };
}

/**
 * Reusable ChaiKit widget in normal document flow.
 * Live VPA is retrieved from a no-store server endpoint only after both
 * approval flags and the exact recipient allowlist validate.
 * This uses the same verified vendor bundle for the QR and UPI app handoff.
 */
export function ChaiKitPaymentPanel({className=''}:{className?:string}){
  const {resolvedTheme,theme}=useTheme();
  const [config,setConfig]=useState<CyberTubeSupportConfig>(defaultSupportConfig);
  const [status,setStatus]=useState<Status>('loading');
  const [retry,setRetry]=useState(0);

  useEffect(()=>{
    let cancelled=false;
    const controller=new AbortController();
    setStatus('loading');
    Promise.all([
      fetch('/api/support/config',{
        credentials:'same-origin',cache:'no-store',signal:controller.signal,
      }).then(async res=>{
        if(!res.ok)throw Error('Payment configuration is unavailable');
        return res.json();
      }),
      loadChaiKitScript(),
    ]).then(([remote])=>{
      if(cancelled)return;
      setConfig(validatedConfig(remote));
      setStatus('ready');
    }).catch(()=>{
      if(!cancelled){
        setConfig(defaultSupportConfig);
        // Fail closed: never display a payable QR when config/bundle fails.
        setStatus('error');
      }
    });
    return()=>{cancelled=true;controller.abort();};
  },[retry]);

  const light=(resolvedTheme||theme)==='light';
  const widgetTheme=light?'cream':'dark';
  // Inline custom properties override the bundled chai-brown palette while
  // preserving ChaiKit's accessible contrast and QR's required white background.
  const themeTokens={
    '--chai-bg':'var(--card-bg)',
    '--chai-card-bg':'var(--card-bg)',
    '--chai-surface':'var(--surface-subtle)',
    '--chai-surface-hover':'var(--surface-elevated)',
    '--chai-text':'var(--text-primary)',
    '--chai-text-muted':'var(--text-secondary)',
    '--chai-border':'var(--border)',
    '--chai-border-hover':'var(--accent-cyan)',
    '--chai-accent':'var(--accent-cyan)',
    '--chai-accent-hover':'var(--accent-cyan-hover)',
    '--chai-accent-text':'#06141D',
    '--chai-qr-bg':'#FFFFFF',
    '--chai-qr-fg':'#131C28',
    '--chai-shadow':'none',
  } as React.CSSProperties;

  if(status==='loading')return <div className={'flex min-h-[200px] items-center justify-center gap-3 text-sm text-[var(--text-secondary)] '+className}
    role="status" aria-live="polite">
    <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true"/>
    Loading secure support options…
  </div>;

  if(status==='error')return <div className={'space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-5 '+className}
    role="alert">
    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
      <AlertTriangle className="h-4 w-4 text-[var(--accent-cyan)]"/>
      UPI support is temporarily unavailable
    </div>
    <p className="text-xs leading-5 text-[var(--text-secondary)]">
      No payment instructions were generated. Please retry when the support widget is available.
    </p>
    <button type="button" onClick={()=>setRetry(n=>n+1)}
      className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-cyan)]">
      Retry loading
    </button>
  </div>;

  return <div className={'space-y-3 '+className} data-testid="chaikit-payment-panel">
    {config.livePaymentsEnabled?
      <div className="rounded-xl border border-[var(--accent-cyan)]/35 bg-[var(--accent-cyan-subtle)] px-4 py-3 text-xs leading-relaxed text-[var(--text-primary)]" role="note">
        <span className="inline-flex items-center gap-2 font-semibold">
          <ShieldCheck className="h-4 w-4 text-[var(--accent-cyan)]" aria-hidden="true"/>
          Direct UPI contribution to CyberTube
        </span>
        <p className="mt-1 text-[var(--text-secondary)]">
          Bank recipient: <strong className="text-[var(--text-primary)]">{config.paymentPayeeName}</strong>.
          {' '}UPI ID: <span className="font-mono text-[var(--text-primary)]">{config.upiId}</span>.
          {' '}Check the payee and amount in your banking app before approving.
        </p>
      </div>:
      <div className="rounded-xl border border-[var(--accent-cyan)]/35 bg-[var(--accent-cyan-subtle)] px-4 py-3 text-xs leading-relaxed" role="note">
        <span className="inline-flex items-center gap-2 font-semibold text-[var(--text-primary)]">
          <ShieldCheck className="h-4 w-4 text-[var(--accent-cyan)]"/> Preview only — real UPI payments are disabled
        </span>
        <p className="mt-1 text-[var(--text-secondary)]">
          This QR is intentionally non-payable. No bank transfer can be started from this preview.
        </p>
      </div>}

    <div className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
      data-testid="support-payment-inline-widget">
      {/* ChaiKit's UPI pn field comes from creator-name, not payment-payee-name.
          Supplying the verified bank account name prevents a false payee label.
          The surrounding CyberTube UI supplies the project branding. */}
      {/* @ts-expect-error chai-support is registered by the vetted ChaiKit vendor script */}
      <chai-support
        key={config.livePaymentsEnabled?'live':'demo'}
        creator-name={config.livePaymentsEnabled?config.paymentPayeeName:config.creatorName}
        upi-id={config.upiId}
        description={config.description}
        theme={widgetTheme}
        position="inline"
        button-text={config.buttonText}
        default-tier={config.defaultTierId}
        tiers={JSON.stringify(config.tiers)}
        note={config.paymentNote}
        min-amount="10"
        max-amount="10000"
        enable-3d={config.enable3D?'':undefined}
        demo-mode={config.livePaymentsEnabled?undefined:''}
        style={themeTokens}
      />
    </div>
    <p className="flex items-start gap-2 text-[11px] leading-relaxed text-[var(--text-secondary)]">
      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true"/>
      ChaiKit generates the QR on this device. Opening a UPI app does not confirm a payment.
      Check the transfer in your banking app; CyberTube does not receive a payment confirmation.
    </p>
  </div>;
}
