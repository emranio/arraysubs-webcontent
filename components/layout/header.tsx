'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import siteConfig from '@/site.config.json';

type NavigationLink = {
  label: string;
  href: string;
};

type NavigationSection = {
  title: string;
  links: NavigationLink[];
};

type NavigationItem = {
  label: string;
  href?: string | null;
  children?: NavigationLink[];
  sections?: NavigationSection[];
};

const DESKTOP_MEDIA_QUERY = '(min-width: 1025px)';

const navigationIconMap: Record<string, string> = {
  'Subscriptions & Recurring Products': 'repeat',
  'Billing, Renewals & Refunds': 'receipt',
  'Payment Gateways': 'credit-card',
  'Member Access Control': 'shield-check',
  'Customer Portal': 'circle-user',
  'Profile Builder': 'user-cog',
  'Retention Flow Builder': 'heart-handshake',
  'Store Credit': 'wallet',
  Emails: 'mail',
  Analytics: 'bar-chart-3',
  'Audits & Logs': 'clipboard-list',
  'Manage Subscriptions': 'list-checks',
  'Checkout Builder': 'layout-grid',
  'Easy Setup': 'wand-2',
  'Feature Manager': 'settings-2',
  Stripe: 'credit-card',
  PayPal: 'wallet',
  Paddle: 'rocket',
  'WooCommerce Subscriptions': 'repeat',
  'WooCommerce Memberships': 'shield-check',
  'YITH Subscription': 'rotate-ccw',
  'YITH Membership': 'user-check',
  'WP Swings': 'shuffle',
  'SUMO Subscriptions': 'package',
  WPSubscription: 'sparkles',
  'SaaS & Digital Products': 'monitor',
  'Membership Sites': 'users',
  'Subscription Boxes': 'package',
  'Online Courses': 'graduation-cap',
  'Content Publishers': 'newspaper',
  'Service Businesses': 'briefcase',
  Download: 'download',
  Changelog: 'rotate-ccw',
  'Data Safety': 'lock',
  'Privacy Policy': 'shield-check',
  'Refund Policy': 'wallet',
  'Terms of Service': 'list-checks',
  Contact: 'mail',
};

function getNavigationIcon(label: string) {
  return navigationIconMap[label] ?? 'sparkles';
}

function getSubmenuId(label: string) {
  return `header-submenu-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const navigation = siteConfig.navigation as {
    main: NavigationItem[];
    cta: Array<{ label: string; href: string; variant: string }>;
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const handleViewportChange = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) {
        setMobileMenuOpen(false);
        setOpenMobileSubmenu(null);
      }
    };

    handleViewportChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleViewportChange(event);
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  const closeMobileNavigation = () => {
    setMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((current) => {
      const next = !current;

      if (!next) {
        setOpenMobileSubmenu(null);
      }

      return next;
    });
  };

  const toggleMobileSubmenu = (label: string) => {
    setOpenMobileSubmenu((current) => (current === label ? null : label));
  };

  const renderSubmenuLink = (link: NavigationLink, variant: 'card' | 'compact' = 'compact') => (
    <li key={link.href} className="header__submenu-item">
      <Link
        href={link.href}
        className={`header__submenu-link header__submenu-link--${variant}`}
        title={link.label}
        onClick={closeMobileNavigation}
      >
        <span className="header__submenu-link-inner">
          <span className="header__submenu-icon" aria-hidden="true">
            <Icon name={getNavigationIcon(link.label)} size={18} />
          </span>
          <span className="header__submenu-label">{link.label}</span>
        </span>
        <span className="header__submenu-arrow" aria-hidden="true">
          <Icon name="arrow-right" size={16} />
        </span>
      </Link>
    </li>
  );

  return (
    <header className="header">
      <div className="header__inner container">
        <Link href="/" className="header__logo" title={siteConfig.siteName} onClick={closeMobileNavigation}>
          <span className="header__logo-text">{siteConfig.siteName}</span>
        </Link>

        <nav id="site-navigation" className={`header__nav ${mobileMenuOpen ? 'header__nav--open' : ''}`}>
          <div className="header__nav-header">
            <Link href="/" className="header__logo" title={siteConfig.siteName} onClick={closeMobileNavigation}>
              <span className="header__logo-text">{siteConfig.siteName}</span>
            </Link>
            <button
              type="button"
              className="header__close"
              aria-label="Close menu"
              onClick={closeMobileNavigation}
            >
              <Icon name="x" size={22} />
            </button>
          </div>
          <ul className="header__menu">
            {navigation.main.map((item) => {
              const sections = item.sections ?? [];
              const children = item.children ?? [];
              const hasSubmenu = sections.length > 0 || children.length > 0;
              const submenuId = getSubmenuId(item.label);
              const isMobileSubmenuOpen = openMobileSubmenu === item.label;

              return (
                <li
                  key={item.label}
                  className={`header__menu-item ${hasSubmenu ? 'header__menu-item--has-children' : ''} ${sections.length > 0 ? 'header__menu-item--mega' : ''} ${isMobileSubmenuOpen ? 'header__menu-item--mobile-open' : ''}`}
                >
                  <div className="header__menu-link-row">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="header__menu-link"
                        title={item.label}
                        onClick={closeMobileNavigation}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="header__menu-link header__menu-link--button"
                        title={item.label}
                        onClick={() => toggleMobileSubmenu(item.label)}
                        aria-expanded={hasSubmenu ? isMobileSubmenuOpen : undefined}
                        aria-controls={hasSubmenu ? submenuId : undefined}
                      >
                        {item.label}
                      </button>
                    )}

                    {hasSubmenu && <span className="header__menu-chevron" aria-hidden="true">▾</span>}

                    {hasSubmenu && (
                      <button
                        type="button"
                        className={`header__submenu-toggle ${isMobileSubmenuOpen ? 'header__submenu-toggle--open' : ''}`}
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={isMobileSubmenuOpen}
                        aria-controls={submenuId}
                        onClick={() => toggleMobileSubmenu(item.label)}
                      >
                        <span className="header__submenu-toggle-icon" aria-hidden="true">▾</span>
                      </button>
                    )}
                  </div>

                  {hasSubmenu && (
                    <div id={submenuId} className="header__submenu">
                      {sections.length > 0 ? (
                        <div className="header__submenu-grid">
                          {sections.map((section) => (
                            <div
                              key={section.title}
                              className={`header__submenu-section ${section.links.length > 6 ? 'header__submenu-section--wide' : ''}`}
                            >
                              <p className="header__submenu-title">{section.title}</p>
                              <ul
                                className={`header__submenu-list ${section.links.length > 6 ? 'header__submenu-list--feature-cards' : 'header__submenu-list--stacked'}`}
                              >
                                {section.links.map((link) => renderSubmenuLink(link, 'card'))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="header__submenu-list header__submenu-list--columns">
                          {children.map((link) => renderSubmenuLink(link, 'compact'))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="header__actions">
            {navigation.cta.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`btn btn--${item.variant} btn--sm`}
                title={item.label}
                onClick={closeMobileNavigation}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <button
          className="header__toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="site-navigation"
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          <span className={`header__hamburger ${mobileMenuOpen ? 'header__hamburger--open' : ''}`} />
        </button>
      </div>
    </header>
  );
}
