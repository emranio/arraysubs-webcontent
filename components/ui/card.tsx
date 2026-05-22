import React from 'react';
import Link from 'next/link';
import { Icon } from './icon';
import { normalizeInternalHref } from '@/lib/internal-links';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  title?: string;
  icon?: string;
  badge?: string;
}

export function Card({
  children,
  className = '',
  href,
  title,
  icon,
  badge,
}: CardProps) {
  const content = (
    <div className={`card ${className}`}>
      {(icon || badge) && (
        <div className="card__header">
          {icon && (
            <span className="card__icon">
              <Icon name={icon} size={20} />
            </span>
          )}
          {badge && <span className={`card__badge card__badge--${badge.toLowerCase().replace(/\s+/g, '-')}`}>{badge}</span>}
        </div>
      )}
      {title && <h3 className="card__title">{title}</h3>}
      <div className="card__body">
        {children}
      </div>
    </div>
  );

  if (href) {
    const resolvedHref = normalizeInternalHref(href);
    const shouldUseAnchor = resolvedHref.startsWith('#')
      || resolvedHref.startsWith('?')
      || /^[a-z][a-z0-9+.-]*:/i.test(resolvedHref)
      || resolvedHref.startsWith('//');

    if (shouldUseAnchor) {
      return (
        <a href={resolvedHref} className="card__link" title={title || ''}>
          {content}
        </a>
      );
    }

    return (
      <Link href={resolvedHref} className="card__link" title={title || ''}>
        {content}
      </Link>
    );
  }

  return content;
}
