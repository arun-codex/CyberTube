/**
 * SERVER-ONLY activation policy. A donor's UPI address is necessarily public
 * once payment is enabled, but it is never sent to the browser in demo mode.
 *
 * Live mode requires all four variables to agree with the owner's
 * explicitly approved, owner-reported verified payee. Misconfiguration fails closed.
 */
import { CYBERTUBE_SUPPORT_TIERS } from './config';

const APPROVED_UPI_ID = 'aruninzone@ptaxis';
const APPROVED_PAYEE_NAME = 'Arun Kumar';

export interface PublicChaiConfig {
  livePaymentsEnabled: boolean;
  mode: 'preview'|'live';
  creatorName: string;
  buttonText: string;
  description: string;
  paymentNote: string;
  paymentPayeeName?: string;
  upiId?: string;
  tiers: typeof CYBERTUBE_SUPPORT_TIERS;
  defaultTierId: string;
  allowCustomAmount: boolean;
  minAmountRupees: number;
  maxAmountRupees: number;
  enable3D: boolean;
  verificationNotice: string;
}

export function getPublicChaiConfig(env: Record<string,string|undefined> = process.env): PublicChaiConfig {
  const approved = env.CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED === 'true';
  const verified = env.CYBERTUBE_SUPPORT_PAYEE_VERIFIED === 'true';
  const configuredVpa = (env.CYBERTUBE_SUPPORT_UPI_ID || '').trim();
  const configuredPayee = (env.CYBERTUBE_SUPPORT_EXPECTED_PAYEE || '').trim();

  const live = approved && verified
    && configuredVpa === APPROVED_UPI_ID
    && configuredPayee === APPROVED_PAYEE_NAME;

  return {
    livePaymentsEnabled: live,
    mode: live ? 'live' : 'preview',
    creatorName: 'CyberTube',
    buttonText: 'Support CyberTube ☕',
    description: 'Support free cybersecurity education. Buy us a chai!',
    paymentNote: 'Support CyberTube',
    ...(live ? { paymentPayeeName: APPROVED_PAYEE_NAME, upiId: APPROVED_UPI_ID } : {}),
    tiers: CYBERTUBE_SUPPORT_TIERS,
    defaultTierId: 'kadak',
    allowCustomAmount: true,
    minAmountRupees: 10,
    maxAmountRupees: 10000,
    enable3D: true,
    verificationNotice: live
      ? 'The CyberTube owner reports verifying this receiving account. Verify the payee and amount again inside your UPI app before payment.'
      : 'Live payments are disabled. No payable QR or UPI handoff is available.',
  };
}
