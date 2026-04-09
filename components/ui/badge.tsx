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
  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  );
}
