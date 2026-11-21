'use client';

import React from 'react';

type ChaiExperienceSceneProps = {
  size?: 'compact' | 'hero';
  className?: string;
};

/**
 * Lightweight layered CSS-3D cup. It is decorative, is never a payment signal,
 * animates automatically, and respects system reduced-motion preferences.
 * No extra controls, toggles, WebGL, or payment state are required.
 */
export function ChaiExperienceScene({ size = 'hero', className = '' }: ChaiExperienceSceneProps) {
  return (
    <div
      className={['chai-scene', className].filter(Boolean).join(' ')}
      data-size={size}
      data-testid="chai-3d-scene"
    >
      <div className="chai-scene__glow" aria-hidden="true" />
      <div
        className="chai-scene__stage"
        role="img"
        aria-label="Decorative three-dimensional illustration of a steaming cup of chai"
      >
        <span className="chai-scene__orbit chai-scene__orbit--outer" aria-hidden="true" />
        <span className="chai-scene__orbit chai-scene__orbit--inner" aria-hidden="true" />
        <span className="chai-scene__spark chai-scene__spark--one" aria-hidden="true">✦</span>
        <span className="chai-scene__spark chai-scene__spark--two" aria-hidden="true">✦</span>
        <span className="chai-scene__spark chai-scene__spark--three" aria-hidden="true">✦</span>
        <div className="chai-scene__cup-wrap" aria-hidden="true">
          <div className="chai-scene__steam">
            <span /><span /><span />
          </div>
          <div className="chai-scene__cup">
            <div className="chai-scene__handle" />
            <div className="chai-scene__body">
              <span className="chai-scene__body-shine" />
              <span className="chai-scene__body-mark">CT</span>
            </div>
            <div className="chai-scene__rim" />
            <div className="chai-scene__tea" />
            <div className="chai-scene__base" />
          </div>
          <div className="chai-scene__saucer" />
        </div>
      </div>
    </div>
  );
}
