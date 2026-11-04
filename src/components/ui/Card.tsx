import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses =
    'rounded-xl border bg-slate-900/60 dark:bg-[#111827] border-slate-800 dark:border-[#1f293d] overflow-hidden';

  const variantClasses = {
    default: 'shadow-sm',
    interactive:
      'transition-all duration-200 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer',
    flat: 'border-slate-800/60 bg-slate-900/40',
  }[variant];

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

