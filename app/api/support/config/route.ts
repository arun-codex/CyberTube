import { NextResponse } from 'next/server';
import { CYBERTUBE_SUPPORT_TIERS, defaultSupportConfig } from '@/lib/chaikit/config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Approved owner details. An environment variable alone cannot silently
 * redirect contributors to another payee without a reviewed code change.
 * The owner stated they verified the account and authorized the switch on
 * 2026-11-21. This is NOT independent bank-side payment confirmation.
 */
const APPROVED_UPI_ID = 'aruninzone@ptaxis';
const APPROVED_PAYEE_NAME = 'Arun Kumar';

function liveSupportConfig(){
  const upiId = process.env.CYBERTUBE_SUPPORT_UPI_ID?.trim();
  const payeeName = process.env.CYBERTUBE_SUPPORT_EXPECTED_PAYEE?.trim();
  const approved = process.env.CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED === 'true'
    && process.env.CYBERTUBE_SUPPORT_PAYEE_VERIFIED === 'true';
  // Exact recipient match: fail closed on missing/changed configuration.
  const live = approved
    && upiId === APPROVED_UPI_ID
    && payeeName === APPROVED_PAYEE_NAME;

  return {
    ...defaultSupportConfig,
    enabled: true,
    demoMode: !live,
    livePaymentsEnabled: live,
    creatorName: 'CyberTube',
    // IMPORTANT: ChaiKit's built-in UPI builder uses creator-name as its
    // pn value, so the widget must receive paymentPayeeName as creator-name.
    paymentPayeeName: live ? APPROVED_PAYEE_NAME : 'CyberTube (demo only)',
    upiId: live ? APPROVED_UPI_ID : 'demo@upi',
    tiers: CYBERTUBE_SUPPORT_TIERS,
  };
}

export async function GET(){
  return NextResponse.json(liveSupportConfig(),{
    headers:{
      'Cache-Control':'private, no-store, max-age=0, must-revalidate',
      'X-Content-Type-Options':'nosniff',
    },
  });
}
