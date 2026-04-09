'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import siteConfig from '@/site.config.json';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner container">
        <Link href="/" className="header__logo" title={siteConfig.siteName}>
          <span className="header__logo-text">{siteConfig.siteName}</span>
        </Link>

        <nav className={`header__nav ${mobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__menu">
            {siteConfig.navigation.main.map((item) => (
              <li key={item.href} className="header__menu-item">
                <Link href={item.href} className="header__menu-link" title={item.label}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="header__actions">
            {siteConfig.navigation.cta.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`btn btn--${item.variant} btn--sm`}
                title={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <button
          className="header__toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          <span className={`header__hamburger ${mobileMenuOpen ? 'header__hamburger--open' : ''}`} />
        </button>
      </div>
    </header>
  );
}
