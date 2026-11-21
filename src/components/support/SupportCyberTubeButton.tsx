'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Coffee, X } from 'lucide-react';
import { ChaiKitPaymentPanel } from './ChaiKitPaymentPanel';

type Props={variant?:'primary'|'secondary';className?:string};

function getFocusable(dialog:HTMLElement):HTMLElement[]{
  const nodes:HTMLElement[]=[];
  const selector='button:not(:disabled), input:not(:disabled), a[href], textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])';
  function walk(root:HTMLElement|ShadowRoot){
    root.querySelectorAll<HTMLElement>(selector).forEach(el=>{
      if(el.getClientRects().length)nodes.push(el);
    });
    root.querySelectorAll<HTMLElement>('*').forEach(element=>{
      if(element.shadowRoot)walk(element.shadowRoot);
    });
  }
  walk(dialog);
  return nodes;
}

/** Inline Home/footer trigger. The only overlay is a user-invoked dialog;
 * ChaiKit itself runs position="inline" inside, never as a floating widget.
 */
export function SupportCyberTubeButton({variant='primary',className=''}:Props){
  const [open,setOpen]=useState(false);
  const titleId=useId();
  const dialogRef=useRef<HTMLDivElement>(null);
  const triggerRef=useRef<HTMLButtonElement>(null);
  const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closeRef.current?.focus();
    const trigger=triggerRef.current;
    function onKeydown(event:KeyboardEvent){
      if(event.key==='Escape'){
        event.preventDefault();setOpen(false);return;
      }
      if(event.key!=='Tab'||!dialogRef.current)return;
      const focusable=getFocusable(dialogRef.current);
      if(!focusable.length)return;
      const first=focusable[0];
      const last=focusable[focusable.length-1];
      const active=document.activeElement;
      const focused=active instanceof HTMLElement && active.shadowRoot
        ? active.shadowRoot.activeElement||active : active;
      if(event.shiftKey&&focused===first){
        event.preventDefault();last.focus();
      }else if(!event.shiftKey&&focused===last){
        event.preventDefault();first.focus();
      }
    }
    document.addEventListener('keydown',onKeydown);
    return()=>{
      document.body.style.overflow=oldOverflow;
      document.removeEventListener('keydown',onKeydown);
      trigger?.focus();
    };
  },[open]);

  return <>
    <button ref={triggerRef} type="button" onClick={()=>setOpen(true)}
      aria-haspopup="dialog"
      className={[
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-3',
        'text-sm font-semibold transition-colors duration-150 focus-visible:outline-2',
        'focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]',
        variant==='primary'
          ? 'bg-[var(--accent-cyan)] text-[#07121B] hover:bg-[var(--accent-cyan-hover)]'
          : 'border border-[var(--border-strong)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)]',
        className,
      ].join(' ')}>
      <Coffee className="h-4 w-4" aria-hidden="true"/> Support CyberTube ☕
    </button>
    {open&&typeof document!=='undefined'&&createPortal(
      <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#030813]/75 p-3 backdrop-blur-sm sm:p-6"
        onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false);}}>
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}
          className="my-auto w-full max-w-[600px] rounded-2xl border border-[var(--border-strong)] bg-[var(--card-bg)] text-[var(--text-primary)] shadow-2xl">
          <div className="flex items-center justify-between gap-4 rounded-t-2xl border-b border-[var(--border)] bg-[var(--surface-subtle)] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)]">
                <Coffee className="h-5 w-5" aria-hidden="true"/>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-cyan)]">CyberTube · Chai Support</p>
                <h2 id={titleId} className="text-xl font-bold">Buy us a chai ☕</h2>
              </div>
            </div>
            <button ref={closeRef} type="button" onClick={()=>setOpen(false)}
              aria-label="Close support dialog"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan)]">
              <X className="h-4 w-4" aria-hidden="true"/>
            </button>
          </div>
          <div className="space-y-4 p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Support free cybersecurity education. Buy us a chai!
              Courses and practical labs remain free for everyone.
            </p>
            <ChaiKitPaymentPanel/>
          </div>
        </div>
      </div>,document.body)}
  </>;
}
