import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  if (!label && !title && !subtitle) {
    return null;
  }

  return (
    <div className={`section__header ${className}`.trim()}>
      <div className='section__header--left-part'>
      {label && <span className="section__label">{label}</span>}
        {title && <h2 className="section__title">{title}</h2>}
      </div>
      <div className='section__header--right-part'>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
