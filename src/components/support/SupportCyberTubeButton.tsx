'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee } from 'lucide-react';

interface SupportCyberTubeButtonProps {
  className?: string;
  variant?: 'primary' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function SupportCyberTubeButton({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
}: SupportCyberTubeButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold',
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0E0905] font-semibold shadow-md hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'border border-amber-500/40 hover:border-amber-500 text-amber-500 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20',
    subtle:
      'text-[var(--text-secondary)] hover:text-amber-400 hover:bg-amber-500/10',
  }[variant];

  return (
    <Link
      href="/support"
      className={`inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${sizeClasses} ${variantClasses} ${className}`}
      aria-label="Support CyberTube with a Chai"
    >
      <Coffee className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      <span>{children || 'Support CyberTube ☕'}</span>
    </Link>
  );
}
