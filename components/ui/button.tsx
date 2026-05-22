import React from 'react';
import Link from 'next/link';
import { normalizeInternalHref } from '@/lib/internal-links';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg'| 'xl' | '2xl';
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  onClick,
}: ButtonProps) {
  const classes = `btn btn--${variant} btn--${size} ${className}`;

  const content = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
    </>
  );

  if (href) {
    const resolvedHref = normalizeInternalHref(href);
    const opensNewTab = resolvedHref.startsWith('http') || resolvedHref.startsWith('//');
    const shouldUseAnchor = resolvedHref.startsWith('#')
      || resolvedHref.startsWith('?')
      || /^[a-z][a-z0-9+.-]*:/i.test(resolvedHref)
      || resolvedHref.startsWith('//');

    if (shouldUseAnchor) {
      return (
        <a
          href={resolvedHref}
          className={classes}
          title={typeof children === 'string' ? children : ''}
          {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={resolvedHref} className={classes} title={typeof children === 'string' ? children : ''}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {content}
    </button>
  );
}
