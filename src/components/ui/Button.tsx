import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-2.5 gap-2.5 min-h-[48px]',
  }[size];

  const variantClasses = {
    primary:
      'bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-hover)] text-white dark:text-[#090D14] font-semibold shadow-sm',
    secondary:
      'bg-[var(--surface-subtle)] hover:bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] active:opacity-90',
    outline:
      'border border-[var(--border)] hover:border-[var(--accent-cyan)] text-[var(--text-primary)] hover:text-[var(--accent-cyan)] bg-transparent',
    ghost:
      'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] bg-transparent',
    danger:
      'bg-[var(--accent-rose)]/10 hover:bg-[var(--accent-rose)]/20 text-[var(--accent-rose)] border border-[var(--accent-rose)]/30',
  }[variant];

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
