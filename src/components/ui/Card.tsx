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
    'rounded-xl border bg-[var(--card-bg)] border-[var(--border)] overflow-hidden transition-all duration-200';

  const variantClasses = {
    default: 'shadow-sm',
    interactive:
      'cursor-pointer hover:border-[var(--accent-cyan)]/60 hover:shadow-md hover:-translate-y-0.5',
    flat: 'bg-[var(--surface-subtle)] border-[var(--border)]',
  }[variant];

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
