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
    'rounded-[8px] border bg-white border-[#e4e4ed] overflow-hidden';

  const variantClasses = {
    default: '',
    interactive:
      'transition-colors duration-150 hover:border-[#303055] cursor-pointer',
    flat: 'bg-[#f4f4f9] border-[#e4e4ed]',
  }[variant];

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
