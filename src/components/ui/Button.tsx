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
    'inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303055] disabled:opacity-50 disabled:pointer-events-none rounded-[4px] min-h-[36px]';

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-3.5 py-2 gap-2 min-h-[38px]',
    lg: 'text-base px-5 py-2.5 gap-2.5 min-h-[44px]',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#303055] hover:bg-[#252542] text-white active:bg-[#1c1c32]',
    secondary:
      'bg-[#e8e8f2] hover:bg-[#d5d5e2] text-[#303055] border border-[#d2d2dc] active:bg-[#b0b0c6]',
    outline:
      'border border-[#e4e4ed] hover:border-[#303055] text-[#403f53] hover:text-[#303055] bg-white',
    ghost:
      'text-[#403f53] hover:text-[#303055] hover:bg-[#f4f4f9] bg-transparent',
    danger:
      'bg-[#fbeaea] hover:bg-[#f8d5d5] text-[#984e4d] border border-[#e8b5b5]',
  }[variant];

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
