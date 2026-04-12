import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'free' | 'pro' | 'new' | 'default';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  if (className.includes('landing-hero__badge')) {
    return null;
  }

  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  );
}
