'use client';
import React from 'react';
import { usePublicChaiConfig } from '@/lib/chaikit/usePublicChaiConfig';

export function SupportStatusMessage(){
  const state=usePublicChaiConfig();
  const text=state.status==='loading'
    ?'Checking payment availability…'
    :state.status==='error'
      ?'Payments temporarily unavailable; no transfer can be started.'
      :state.config.livePaymentsEnabled
        ?'Live direct UPI enabled. Verify the recipient and amount in your payment app; transfers cannot be confirmed by CyberTube.'
        :'Support is in non-payable preview mode.';
  return <p className="text-xs text-[var(--text-muted)]" role="status" aria-live="polite">{text}</p>;
}
