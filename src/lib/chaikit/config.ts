import { ChaiTier, CyberTubeSupportConfig } from './types';

export type { CyberTubeSupportConfig, ChaiTier };

export const CYBERTUBE_SUPPORT_TIERS: ChaiTier[] = [
  {
    id: 'cutting',
    name: 'Cutting Chai',
    amountPaise: 1000, // ₹10
    description: 'A small gesture of appreciation for free lessons',
    icon: 'cutting',
  },
  {
    id: 'kadak',
    name: 'Kadak Chai',
    amountPaise: 2500, // ₹25 (default)
    description: 'A stronger cup to support ongoing platform development',
    icon: 'kadak',
  },
  {
    id: 'tandoori',
    name: 'Tandoori Chai',
    amountPaise: 5000, // ₹50
    description: 'A warm contribution to free cybersecurity resources',
    icon: 'tandoori',
  },
  {
    id: 'premium',
    name: 'Premium Chai',
    amountPaise: 10000, // ₹100
    description: 'A generous chai to keep education accessible to all',
    icon: 'premium',
  },
];

/**
 * Browser-safe defaults. Never infer live payment authorization from a
 * NEXT_PUBLIC_* flag or a value included in a client-side bundle.
 * Live recipient information is returned only by /api/support/config
 * after the server verifies the approved payee and release flags.
 */
export const defaultSupportConfig: CyberTubeSupportConfig = {
  enabled: true,
  demoMode: true,
  livePaymentsEnabled: false,
  creatorName: 'CyberTube',
  paymentPayeeName: 'CyberTube (demo only)',
  upiId: 'demo@upi',
  description: 'Support free cybersecurity education. Buy us a chai!',
  buttonText: 'Support CyberTube ☕',
  paymentNote: 'Support CyberTube',
  theme: 'dark',
  position: 'inline',
  defaultTierId: 'kadak',
  tiers: CYBERTUBE_SUPPORT_TIERS,
  allowCustomAmount: true,
  enable3D: true,
};

export function getSupportConfig(): CyberTubeSupportConfig {
  return { ...defaultSupportConfig, tiers: [...CYBERTUBE_SUPPORT_TIERS] };
}
