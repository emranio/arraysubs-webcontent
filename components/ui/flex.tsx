import React from 'react';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
  className?: string;
}

export function Flex({
  children,
  direction = 'row',
  align = 'center',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className = '',
}: FlexProps) {
  return (
    <div
      className={`flex flex--${direction} flex--align-${align} flex--justify-${justify} flex--gap-${gap} ${wrap ? 'flex--wrap' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
