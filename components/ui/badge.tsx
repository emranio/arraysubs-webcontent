import React from 'react';
import {
  DEFAULT_BADGE_VARIANT,
  normalizeBadgeVariant,
  type BadgeVariant,
} from '@/lib/badge-variants';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = DEFAULT_BADGE_VARIANT,
  className = '',
}: BadgeProps) {
  const resolvedVariant = normalizeBadgeVariant(variant) ?? DEFAULT_BADGE_VARIANT;

  return (
    <span className={`badge badge--${resolvedVariant} ${className}`}>
      {children}
    </span>
  );
}
