'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Coffee, Heart, X } from 'lucide-react';
import { ChaiKitPaymentPanel } from './ChaiKitPaymentPanel';
import { ChaiExperienceScene } from './ChaiExperienceScene';

type Props = { variant?: 'primary' | 'secondary'; className?: string };

function getFocusable(dialog: HTMLElement): HTMLElement[] {
  const nodes: HTMLElement[] = [];
  const selector = 'button:not(:disabled), input:not(:disabled), a[href], textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])';
  function walk(root: HTMLElement | ShadowRoot) {
    root.querySelectorAll<HTMLElement>(selector).forEach(el => {
      if (el.getClientRects().length) nodes.push(el);
    });
    root.querySelectorAll<HTMLElement>('*').forEach(element => {
      if (element.shadowRoot) walk(element.shadowRoot);
    });
  }
  walk(dialog);
  return nodes;
}

/** Only one ChaiKit instance is created, on demand, in an accessible dialog.
 * No floating widget, background payment setup, or new UPI flow is introduced.
 */
export function SupportCyberTubeButton({ variant = 'primary', className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const trigger = triggerRef.current;

    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = getFocusable(dialogRef.current);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const focused = active instanceof HTMLElement && active.shadowRoot
        ? active.shadowRoot.activeElement || active : active;
      if (event.shiftKey && focused === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && focused === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeydown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', onKeydown);
      trigger?.focus();
    };
  }, [open]);

  return <>
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(true)}
      aria-haspopup="dialog"
      className={[
        'chai-support-trigger inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-3',
        'text-sm font-semibold transition-colors duration-150 focus-visible:outline-2',
        'focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]',
        variant === 'primary'
          ? 'bg-[var(--accent-cyan)] text-[#07121B] hover:bg-[var(--accent-cyan-hover)]'
          : 'border border-[var(--border-strong)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[#d7a268]',
        className,
      ].join(' ')}
    >
      <Coffee className="h-4 w-4" aria-hidden="true" />
      Support CyberTube ☕
    </button>

    {open && typeof document !== 'undefined' && createPortal(
      <div
        className="chai-dialog-backdrop fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto px-0 pt-2 sm:items-center sm:p-5"
        onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="chai-dialog my-auto max-h-[calc(100dvh-8px)] w-full max-w-[680px] overflow-x-hidden overflow-y-auto overscroll-contain sm:max-h-[calc(100dvh-40px)]"
          data-testid="chai-studio-dialog"
        >
          <div className="chai-dialog__hero">
            <div className="chai-dialog__heading">
              <div className="chai-dialog__eyebrow">
                <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                An open-source thank you
              </div>
              <h2 id={titleId} className="chai-dialog__title">
                Buy us a chai ☕
              </h2>
              <p id={descriptionId} className="chai-dialog__intro">
                Fuel free cybersecurity lessons, practical labs and the next great idea.
              </p>
              <div className="chai-dialog__pills" aria-label="Support details">
                <span>One-time support</span>
                <span>Always optional</span>
                <span>Learning stays free</span>
              </div>
            </div>
            <ChaiExperienceScene size="compact" className="relative z-[1] justify-self-center" />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close support dialog"
              className="chai-dialog__close"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="chai-dialog__body">
            <div className="chai-dialog__body-heading">
              <span className="chai-dialog__step">01 / Choose your chai</span>
              <span className="chai-dialog__subtext">₹10 · ₹25 · ₹50 · ₹100 · Custom</span>
            </div>
            <ChaiKitPaymentPanel />
          </div>
          <div className="chai-dialog__footer">
            <strong>Made for supporters, not paywalls.</strong>{' '}
            Every lesson remains accessible whether you contribute or not.
          </div>
        </div>
      </div>,
      document.body
    )}
  </>;
}
