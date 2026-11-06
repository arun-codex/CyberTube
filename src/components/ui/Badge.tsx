import React from 'react';
import { DifficultyLevel, PricingModel, ResourceType } from '../../types/resource';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'type' | 'domain' | 'difficulty' | 'pricing' | 'outline';
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
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  const colorClasses = 'bg-[#f4f4f9] dark:bg-[#1A2433] text-[#475569] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044] font-mono';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-[4px] leading-tight ${sizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
};
