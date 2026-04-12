import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'hero';
  className?: string;
}

export function Breadcrumb({
  items,
  variant = 'default',
  className = '',
}: BreadcrumbProps) {
  return (
    <nav
      className={`breadcrumb ${variant === 'hero' ? 'breadcrumb--hero' : ''} ${className}`.trim()}
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link href="/" className="breadcrumb__link" title="Home">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb__item">
            <span className="breadcrumb__separator" aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="breadcrumb__link" title={item.label}>
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
