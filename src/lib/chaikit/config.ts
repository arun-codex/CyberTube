import { ChaiTier, CyberTubeSupportConfig } from './types';

export type { CyberTubeSupportConfig, ChaiTier };

export const CYBERTUBE_SUPPORT_TIERS: ChaiTier[] = [
  {
    id: 'cutting',
    name: 'Cutting Chai',
    amountPaise: 1000, // ₹10
    description: 'A little thank-you for learning',
    icon: 'cutting',
  },
  {
    id: 'kadak',
    name: 'Kadak Chai',
    amountPaise: 2500, // ₹25 (default)
    description: 'Fuel the next free lesson',
    icon: 'kadak',
  },
  {
    id: 'tandoori',
    name: 'Tandoori Chai',
    amountPaise: 5000, // ₹50
    description: 'Power more hands-on labs',
    icon: 'tandoori',
  },
  {
    id: 'premium',
    name: 'Premium Chai',
    amountPaise: 10000, // ₹100
    description: 'Help keep learning free',
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
