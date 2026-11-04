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
  difficulty,
  pricing,
  className = '',
  size = 'sm',
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';

  if (variant === 'difficulty' && difficulty) {
    switch (difficulty) {
      case 'beginner':
        colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
        break;
      case 'intermediate':
        colorClasses = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
        break;
      case 'advanced':
        colorClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        break;
    }
  } else if (variant === 'pricing' && pricing) {
    switch (pricing) {
      case 'free':
        colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
        break;
      case 'freemium':
        colorClasses = 'bg-blue-500/10 text-blue-400 border-blue-500/30';
        break;
      case 'paid':
        colorClasses = 'bg-purple-500/10 text-purple-400 border-purple-500/30';
        break;
    }
  } else if (variant === 'type') {
    colorClasses = 'bg-cyber-500/10 text-cyber-400 border-cyber-500/30';
  } else if (variant === 'domain') {
    colorClasses = 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:border-slate-600';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-medium rounded-md border ${sizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
};

