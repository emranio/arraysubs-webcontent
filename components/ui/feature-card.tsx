import React from 'react';
import { Card } from './card';

interface FeatureCardProps {
  title: string;
  badge?: string;
  href?: string;
  icon?: string;
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export function FeatureCard({
  title,
  badge,
  href,
  icon,
  className = '',
  description,
  children,
}: FeatureCardProps) {
  const content = description ? <p>{description}</p> : children;

  return (
    <Card
      title={title}
      badge={badge}
      href={href}
      icon={icon}
      className={`feature-card ${className}`.trim()}
    >
      {content}
    </Card>
  );
}
