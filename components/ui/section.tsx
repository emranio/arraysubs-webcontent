import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  background?: 'white' | 'light' | 'dark';
  fullWidth?: boolean;
  id?: string;
}

export function Section({
  children,
  className = '',
  label,
  title,
  subtitle,
  background = 'white',
  fullWidth = false,
  id,
}: SectionProps) {
  const bgClass = `section--${background}`;

  return (
    <section className={`section ${bgClass} ${className}`} id={id}>
      <div className={fullWidth ? 'section__inner section__inner--full' : 'section__inner container'}>
        {(label || title || subtitle) && (
          <div className="section__header">
            {label && <span className="section__label">{label}</span>}
            {title && <h2 className="section__title">{title}</h2>}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="section__body">
          {children}
        </div>
      </div>
    </section>
  );
}
