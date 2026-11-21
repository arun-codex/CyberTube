'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Coffee, Heart, ShieldCheck, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { loadChaiKitScript } from '@/lib/chaikit/loader';
import { usePublicChaiConfig } from '@/lib/chaikit/usePublicChaiConfig';
import { ChaiKitPaymentElement, type ChaiKitHTMLElement } from './ChaiKitPaymentElement';

type SupportButtonProps = {
  variant?: 'primary' | 'secondary';
  className?: string;
};

const tiers = [
  { amount: 10, name: 'Cutting Chai', detail: 'A small gesture of support' },
  { amount: 25, name: 'Kadak Chai', detail: 'Keep free lessons brewing' },
  { amount: 50, name: 'Tandoori Chai', detail: 'Help improve practical labs' },
  { amount: 100, name: 'Premium Chai', detail: 'Support more learning resources' },
] as const;

/**
 * Pre-activation CyberTube / ChaiKit support UI.
 *
 * IMPORTANT: Live UPI payments are intentionally NOT wired up.
 * Never introduce a UPI deeplink, QR code or receiving VPA in this
 * component until the creator explicitly approves payment activation
 * and independently verifies the intended bank/UPI recipient.
 *
 * This is an inline launcher with an accessible dialog, not a floating
 * widget. Uses CyberTube semantic CSS variables so both the light and
 * dark theme match the rest of the website.
 */
export function SupportCyberTubeButton({
  variant = 'primary',
  className = '',
}: SupportButtonProps) {
  const [open, setOpen] = useState(false);
  const configState = usePublicChaiConfig();
  const { resolvedTheme } = useTheme();
  const [vendorReady, setVendorReady] = useState(false);
  const [vendorError, setVendorError] = useState(false);
  const paymentWidgetRef = useRef<ChaiKitHTMLElement>(null);
  const activeConfig = configState.status==='ready' ? configState.config : null;
  const isLive = Boolean(activeConfig?.livePaymentsEnabled);
  const [amount, setAmount] = useState<number>(25);
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(!isLive)return;
    let current=true;
    loadChaiKitScript()
      .then(()=>{if(current)setVendorReady(true);})
      .catch(()=>{if(current)setVendorError(true);});
    return ()=>{current=false;};
  },[isLive]);

  useEffect(() => {
    // If the visitor opened the safe holding modal while the provider loaded,
    // switch to ChaiKit once mounted. This does not initiate a UPI payment.
    if(open&&isLive&&vendorReady&&paymentWidgetRef.current){
      setOpen(false);
      paymentWidgetRef.current.open();
    }
  },[open,isLive,vendorReady]);

  function handleSupportClick(){
    if(isLive && vendorReady && paymentWidgetRef.current){
      paymentWidgetRef.current.open();
    } else {
      setOpen(true);
    }
  }

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const triggerEl = triggerRef.current;
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
      triggerEl?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleSupportClick}
        aria-haspopup="dialog"
        className={[
          'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl',
          'px-5 py-3 text-sm font-semibold transition-colors duration-150',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--accent-cyan)]',
          variant === 'primary'
            ? 'bg-[var(--accent-cyan)] text-[#07121B] hover:bg-[var(--accent-cyan-hover)]'
            : 'border border-[var(--border-strong)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]',
          className,
        ].join(' ')}
      >
        <Coffee className="h-4 w-4" aria-hidden="true" />
        Support CyberTube ☕
      </button>

      {isLive && vendorReady && activeConfig &&
        <ChaiKitPaymentElement
          config={activeConfig}
          display="headless"
          theme={resolvedTheme==='light'?'cream':'dark'}
          elementRef={paymentWidgetRef}
        />
      }

      {open && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#030813]/75 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--card-bg)] text-[var(--text-primary)] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface-subtle)] px-5 py-5 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)]">
                  <Coffee className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                    CyberTube · Chai support
                  </p>
                  <h2 id={titleId} className="mt-0.5 text-xl font-bold text-[var(--text-primary)]">
                    Buy us a chai ☕
                  </h2>
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close support preview"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <p id={descriptionId} className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Support free cybersecurity education. Buy us a chai!
                Learning resources and practical labs remain free.
              </p>

              <div className="rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan-subtle)] px-3 py-3 text-xs text-[var(--text-primary)]">
                <span className="inline-flex items-center gap-2 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent-cyan)]" aria-hidden="true" />
                  {configState.status==='loading'
                    ?'Checking payment availability…'
                    :configState.status==='error'
                      ?'Payment service unavailable — no payment can be started'
                      :isLive
                        ?vendorError?'Payment interface could not load':'Preparing direct UPI payments…'
                        :'Preview only — real UPI payments are disabled'}
                </span>
                <p className="mt-1 text-[var(--text-secondary)]">
                  {isLive
                    ?'Only continue when the UPI interface loads. Verify Arun Kumar and the amount inside your banking app. CyberTube cannot confirm that a payment succeeded.'
                    :'These amounts are previews. No payable QR or UPI app handoff is available.'}
                </p>
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-[var(--text-primary)]">
                  Choose a chai tier
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {tiers.map(tier => (
                    <button
                      key={tier.amount}
                      type="button"
                      aria-pressed={tier.amount === amount}
                      onClick={() => setAmount(tier.amount)}
                      className={[
                        'relative min-h-[92px] rounded-xl border p-3 text-left',
                        'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                        'focus-visible:outline-[var(--accent-cyan)]',
                        tier.amount === amount
                          ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan-subtle)]'
                          : 'border-[var(--border)] bg-[var(--surface-subtle)] hover:border-[var(--accent-cyan)]/70',
                      ].join(' ')}
                    >
                      <span className="block text-lg font-bold text-[var(--text-primary)]">
                        ₹{tier.amount}
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-[var(--text-primary)]">
                        {tier.name}
                      </span>
                      <span className="mt-1 block text-[11px] text-[var(--text-secondary)]">
                        {tier.detail}
                      </span>
                      {tier.amount === amount && (
                        <Check className="absolute right-3 top-3 h-4 w-4 text-[var(--accent-cyan)]" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Selected preview amount
                </p>
                <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                  ₹{amount}
                </p>
                <button
                  disabled
                  type="button"
                  className="mt-3 w-full cursor-not-allowed rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-3 text-sm font-semibold text-[var(--text-muted)]"
                >
                  {isLive?'Payment interface unavailable':'UPI support is not activated'}
                </button>
                <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {isLive
                    ?'If this screen persists, reload or try the Support page. No transfer is initiated from this disabled preview.'
                    :'Live payments require an approved and verified bank recipient. Your current selection is not payable.'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <Heart className="h-4 w-4 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true" />
                Thank you for supporting free cybersecurity education.
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
