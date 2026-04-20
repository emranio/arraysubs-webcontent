import React from 'react';
import { SectionHeading } from './section-heading';

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
      <div className={fullWidth ? 'section__inner section__inner--full' : 'section__inner'}>
        {(label || title || subtitle) && (
          <SectionHeading label={label} title={title} subtitle={subtitle} />
        )}
        <div className="section__body">
          {children}
        </div>
      </div>
    </section>
  );
}
