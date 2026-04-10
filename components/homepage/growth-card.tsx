import React from 'react';
import { Icon } from '@/components/ui/icon';

interface GrowthCardProps {
  icon: string;
  title: string;
  outcome: string;
  children: React.ReactNode;
}

export function GrowthCard({ icon, title, outcome, children }: GrowthCardProps) {
  return (
    <div className="growth-card">
      <div className="growth-card__icon">
        <Icon name={icon} size={24} />
      </div>
      <h3 className="growth-card__title">{title}</h3>
      <div className="growth-card__body">{children}</div>
      <p className="growth-card__outcome">{outcome}</p>
    </div>
  );
}
