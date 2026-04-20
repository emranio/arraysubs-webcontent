import React from 'react';
import { Card } from './card';

interface FeatureCardProps {
  title: string;
  badge?: string;
  href?: string;
  icon?: string;
  className?: string;
  description?: string;
  variant?: 'highlight' | 'primary';
  children?: React.ReactNode;
}

export function FeatureCard({
  title,
  badge,
  href,
  icon,
  className = '',
  description,
  variant,
  children,
}: FeatureCardProps) {
  const content = description ? <p>{description}</p> : children;

  return (
    <Card
      title={title}
      badge={badge}
      href={href}
      icon={icon}
      className={`feature-card ${variant ? `card--${variant}` : ''} ${className}`.trim()}
    >
      {content}
    </Card>
  );
}
