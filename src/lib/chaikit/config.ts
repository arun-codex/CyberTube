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

export const defaultSupportConfig: CyberTubeSupportConfig = {
  enabled: process.env.NEXT_PUBLIC_CHAIKIT_WIDGET_ENABLED !== 'false',
  
  // Safe public defaults. Actual activation is computed SERVER-SIDE in
  // server-config.ts and returned by /api/support/config only after both
  // owner approval and payee confirmation flags are present.
  demoMode: true,
  livePaymentsEnabled: false,

  creatorName: 'CyberTube',
  paymentPayeeName: '',
  upiId: '',

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
  return { ...defaultSupportConfig };
}
