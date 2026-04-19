import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  layout?: 'centered' | 'split';
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className = '',
  layout = 'split',
}: SectionHeadingProps) {
  if (!label && !title && !subtitle) {
    return null;
  }

  if (layout === 'split') {
    return (
      <div className={`section__header section__header--split ${className}`.trim()}>
        <div className="section__header-left">
          {label && <span className="section__label">{label}</span>}
          {title && <h2 className="section__title">{title}</h2>}
        </div>
        {subtitle && (
          <div className="section__header-right">
            <p className="section__subtitle">{subtitle}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`section__header ${className}`.trim()}>
      {label && <span className="section__label">{label}</span>}
      {title && <h2 className="section__title">{title}</h2>}
      {subtitle && <p className="section__subtitle">{subtitle}</p>}
    </div>
  );
}
