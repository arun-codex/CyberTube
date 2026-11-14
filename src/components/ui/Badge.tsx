import React from 'react';
import { DifficultyLevel, PricingModel, ResourceType } from '../../types/resource';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'type' | 'domain' | 'difficulty' | 'pricing' | 'outline' | 'success' | 'warning' | 'danger';
  type?: ResourceType;
  difficulty?: DifficultyLevel;
  pricing?: PricingModel;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  size = 'sm',
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';
  
  let colorClasses = 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border)]';

  if (variant === 'success') {
    colorClasses = 'bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30';
  } else if (variant === 'warning') {
    colorClasses = 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)] border border-[var(--accent-amber)]/30';
  } else if (variant === 'danger') {
    colorClasses = 'bg-[var(--accent-rose)]/10 text-[var(--accent-rose)] border border-[var(--accent-rose)]/30';
  } else if (variant === 'outline') {
    colorClasses = 'bg-transparent text-[var(--text-muted)] border border-[var(--border)]';
  }

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-md leading-tight ${sizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
};
