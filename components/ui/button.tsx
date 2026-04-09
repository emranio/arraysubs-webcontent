import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
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
    const isExternal = href.startsWith('http') || href.startsWith('//');
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" title={typeof children === 'string' ? children : ''}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} title={typeof children === 'string' ? children : ''}>
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
