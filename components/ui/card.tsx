import React from 'react';

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
          {icon && <span className="card__icon">{icon}</span>}
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
    return (
      <a href={href} className="card__link" title={title || ''}>
        {content}
      </a>
    );
  }

  return content;
}
