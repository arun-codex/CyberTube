'use client';

import React from 'react';
import type { PublicChaiConfig } from '@/lib/chaikit/server-config';

export type ChaiKitHTMLElement = HTMLElement & {
  open: () => void;
  close: () => void;
  setAmount: (amountPaise: number) => void;
};

export const cyberTubeChaiStyles: React.CSSProperties = {
  // Inline host declarations override ChaiKit's warm default theme inside
  // the Shadow DOM and follow CyberTube's resolved light/dark tokens.
  ['--chai-bg' as string]: 'var(--card-bg)',
  ['--chai-card-bg' as string]: 'var(--card-bg)',
  ['--chai-surface' as string]: 'var(--surface-subtle)',
  ['--chai-surface-hover' as string]: 'var(--surface-elevated)',
  ['--chai-text' as string]: 'var(--text-primary)',
  ['--chai-text-muted' as string]: 'var(--text-secondary)',
  ['--chai-border' as string]: 'var(--border-strong)',
  ['--chai-border-hover' as string]: 'var(--accent-cyan)',
  ['--chai-accent' as string]: 'var(--accent-cyan)',
  ['--chai-accent-hover' as string]: 'var(--accent-cyan-hover)',
  ['--chai-accent-text' as string]: '#07121B',
  ['--chai-radius' as string]: '18px',
  ['--chai-radius-sm' as string]: '12px',
  ['--chai-qr-bg' as string]: '#FFFFFF',
  ['--chai-qr-fg' as string]: '#111827',
};

interface Props {
  config: PublicChaiConfig;
  display: 'inline'|'headless';
  theme: 'dark'|'cream';
  elementRef?: React.Ref<ChaiKitHTMLElement>;
}

/**
 * ChaiKit v1.0 pinned vendor bundle uses creator-name for both
 * dialog heading and the UPI pn parameter. For payment safety it MUST
 * receive the approved bank payee name (Arun Kumar), not CyberTube.
 * Brand the surrounding CyberTube button/page, not the payment recipient.
 *
 * No demo-mode attribute is included: this component MUST NOT be rendered
 * without an enabled config from /api/support/config.
 */
export function ChaiKitPaymentElement({config,display,theme,elementRef}:Props){
  if(!config.livePaymentsEnabled || config.mode!=='live' ||
     !config.paymentPayeeName || !config.upiId)return null;

  const attributes:Record<string,unknown>={
    ref: elementRef,
    'creator-name': config.paymentPayeeName,
    'upi-id': config.upiId,
    description: 'Supporting CyberTube free cybersecurity education. Verify the payee and amount inside your UPI app.',
    'button-text': config.buttonText,
    theme,
    position: display==='inline'?'inline':'bottom-right',
    ...(display==='headless'?{headless:''}:{}),
    'accent-color': 'var(--accent-cyan)',
    'default-tier':config.defaultTierId,
    'min-amount':String(config.minAmountRupees),
    'max-amount':String(config.maxAmountRupees),
    note:config.paymentNote,
    tiers:JSON.stringify(config.tiers),
    ...(config.enable3D?{'enable-3d':''}:{}),
    style:cyberTubeChaiStyles,
    'data-testid':display==='inline'?'chaikit-live-inline':'chaikit-live-headless',
  };
  return React.createElement('chai-support',attributes);
}
