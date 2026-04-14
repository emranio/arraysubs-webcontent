import React from 'react';
import Link from 'next/link';
import { APP_HOME_PATH, normalizeInternalHref } from '@/lib/internal-links';

interface BreadcrumbItem {
  label: string;
  href?: string;
  className?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'hero';
  className?: string;
}

function BreadcrumbHomeIcon() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="breadcrumb__home-icon"
    >
      <path
        fill="currentColor"
        d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2 c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4 c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2 c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6 c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4 c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6 c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"
      />
    </svg>
  );
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
          <Link href={APP_HOME_PATH} className="breadcrumb__home-link" title="Home" aria-label="Home">
            <BreadcrumbHomeIcon />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb__item">
            {index > 0 && <span className="breadcrumb__separator" aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={normalizeInternalHref(item.href)}
                className={`breadcrumb__link${item.className ? ` ${item.className}` : ''}`}
                title={item.label}
              >
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
