'use client';

import React, { useState } from 'react';
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

const navigationIconMap: Record<string, string> = {
  'Subscriptions & Recurring Products': 'repeat',
  'Billing, Renewals & Refunds': 'receipt',
  'Payment Gateways': 'credit-card',
  'Member Access Control': 'shield-check',
  'Customer Portal': 'circle-user',
  'Profile Builder': 'user-cog',
  'Retention Flow Builder': 'heart-handshake',
  'Store Credit': 'wallet',
  'Emails': 'mail',
  'Analytics': 'bar-chart-3',
  'Audits & Logs': 'clipboard-list',
  'Manage Subscriptions': 'list-checks',
  'Checkout Builder': 'layout-grid',
  'Easy Setup': 'wand-2',
  'Feature Manager': 'settings-2',
  'Stripe': 'credit-card',
  'PayPal': 'wallet',
  'Paddle': 'rocket',
  'WooCommerce Subscriptions': 'repeat',
  'WooCommerce Memberships': 'shield-check',
  'YITH Subscription': 'rotate-ccw',
  'YITH Membership': 'user-check',
  'WP Swings': 'shuffle',
  'SUMO Subscriptions': 'package',
  'WPSubscription': 'sparkles',
  'SaaS & Digital Products': 'monitor',
  'Membership Sites': 'users',
  'Subscription Boxes': 'package',
  'Online Courses': 'graduation-cap',
  'Content Publishers': 'newspaper',
  'Service Businesses': 'briefcase',
  'Download': 'download',
  'Changelog': 'rotate-ccw',
  'Data Safety': 'lock',
  'Privacy Policy': 'shield-check',
  'Refund Policy': 'wallet',
  'Terms of Service': 'list-checks',
  'Contact': 'mail',
};

function getNavigationIcon(label: string) {
  return navigationIconMap[label] ?? 'sparkles';
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = siteConfig.navigation as {
    main: NavigationItem[];
    cta: Array<{ label: string; href: string; variant: string }>;
  };

  const renderSubmenuLink = (link: NavigationLink, variant: 'card' | 'compact' = 'compact') => (
    <li key={link.href} className="header__submenu-item">
      <Link
        href={link.href}
        className={`header__submenu-link header__submenu-link--${variant}`}
        title={link.label}
        onClick={() => setMobileMenuOpen(false)}
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
        <Link href="/" className="header__logo" title={siteConfig.siteName}>
          <span className="header__logo-text">{siteConfig.siteName}</span>
        </Link>

        <nav className={`header__nav ${mobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__menu">
            {navigation.main.map((item) => {
              const sections = item.sections ?? [];
              const children = item.children ?? [];
              const hasSubmenu = sections.length > 0 || children.length > 0;

              return (
                <li
                  key={item.label}
                  className={`header__menu-item ${hasSubmenu ? 'header__menu-item--has-children' : ''} ${sections.length > 0 ? 'header__menu-item--mega' : ''}`}
                >
                  <div className="header__menu-link-row">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="header__menu-link"
                        title={item.label}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button type="button" className="header__menu-link header__menu-link--button" title={item.label}>
                        {item.label}
                      </button>
                    )}

                    {hasSubmenu && <span className="header__menu-chevron" aria-hidden="true">▾</span>}
                  </div>

                  {hasSubmenu && (
                    <div className="header__submenu">
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
