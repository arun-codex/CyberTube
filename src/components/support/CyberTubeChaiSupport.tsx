'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { loadChaiKitScript } from '../../lib/chaikit/loader';
import { defaultSupportConfig, CyberTubeSupportConfig } from '../../lib/chaikit/config';

interface CyberTubeChaiSupportProps {
  config?: Partial<CyberTubeSupportConfig>;
  hideOnRoutes?: string[];
}

export function CyberTubeChaiSupport({
  config: customConfig,
  hideOnRoutes = ['/support'],
}: CyberTubeChaiSupportProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isScriptReady, setIsScriptReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = {
    ...defaultSupportConfig,
    ...customConfig,
  };

  // Determine if widget should be suppressed on the current route
  const isHiddenRoute = hideOnRoutes.includes(pathname);

  useEffect(() => {
    let mounted = true;

    // Load ChaiKit Web Component script safely
    loadChaiKitScript()
      .then(() => {
        if (mounted) {
          setIsScriptReady(true);
        }
      })
      .catch((err) => {
        console.warn('ChaiKit supporter widget script deferred or failed:', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!config.enabled || isHiddenRoute || !isScriptReady) {
    return null;
  }

  // Map CyberTube theme to ChaiKit theme
  const resolvedWidgetTheme = theme === 'light' ? 'cream' : (config.theme || 'dark');

  return (
    <div
      ref={containerRef}
      className="chaikit-widget-container pointer-events-auto"
      data-testid="cybertube-chaikit-container"
      style={{
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* @ts-expect-error Custom Web Component registered by ChaiKit bundle */}
      <chai-support
        creator-name={config.creatorName}
        payment-payee-name={config.paymentPayeeName}
        upi-id={config.upiId}
        description={config.description}
        button-text={config.buttonText}
        theme={resolvedWidgetTheme}
        position={config.position}
        default-tier={config.defaultTierId}
        note={config.paymentNote}
        tiers={JSON.stringify(config.tiers)}
        enable-3d={config.enable3D ? '' : undefined}
        demo-mode={config.demoMode ? '' : undefined}
      />
    </div>
  );
}
