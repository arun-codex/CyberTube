// src/lib/discovery/config.ts
// Discovery Engine Configuration & Compliance Guards

export const DISCOVERY_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_DISCOVERY !== 'false',
  automatedRefreshEnabled: process.env.ENABLE_AUTOMATED_DISCOVERY_REFRESH === 'true',
  automatedYouTubeDiscoveryEnabled: false, // Strict requirement: ENABLE_AUTOMATED_YOUTUBE_DISCOVERY=false
  allowPaidServices: false, // Strict requirement: ALLOW_PAID_SERVICES=false
  maxPageSize: 50,
  defaultPageSize: 20,
};
