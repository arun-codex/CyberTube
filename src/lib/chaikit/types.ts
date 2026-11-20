export type ChaiKitTheme = 'classic' | 'dark' | 'cream' | 'minimal' | 'auto';
export type ChaiKitPosition = 'bottom-right' | 'bottom-left' | 'inline';
export type ChaiKitAnimation = 'none' | 'subtle' | 'premium';

export interface ChaiTier {
  id: string;
  name: string;
  amountPaise: number; // Exact integer paise (e.g. 1000 = ₹10.00)
  description?: string;
  icon?: 'cutting' | 'kadak' | 'tandoori' | 'premium' | string;
}

export interface CyberTubeSupportConfig {
  enabled: boolean;
  demoMode: boolean;
  livePaymentsEnabled: boolean;

  creatorName: string;
  paymentPayeeName: string;
  upiId: string;

  description: string;
  buttonText: string;
  paymentNote: string;

  theme: ChaiKitTheme;
  position: ChaiKitPosition;

  defaultTierId: string;
  tiers: ChaiTier[];
  allowCustomAmount: boolean;

  enable3D: boolean;
}
