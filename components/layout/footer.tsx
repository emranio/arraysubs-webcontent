import React from 'react';
import Link from 'next/link';
import { APP_HOME_PATH, normalizeInternalHref } from '@/lib/internal-links';
import siteConfig from '@/site.config.json';

export function Footer() {
  const year = new Date().getFullYear();
  const copyright = siteConfig.footer.copyright.replace('{year}', String(year));

  return (
    <footer className="footer">
      {/* CTA Strip */}
      <div className="footer__cta">
        <div className="container">
          <div className="footer__cta-card">
            <div className="footer__cta-content">
              <h2 className="footer__cta-title">
                Start accepting subscriptions{' '}
                <span className="footer__cta-highlight">today</span>
              </h2>
              <p className="footer__cta-desc">
                Free WooCommerce plugin. No monthly fees. No lock-in. Ships with billing, memberships &amp; analytics.
              </p>
            </div>
            <div className="footer__cta-actions">
              <Link href={normalizeInternalHref('/download/')} className="btn btn--primary btn--lg" title="Download ArraySubs Free">
                Download Free
              </Link>
              <Link href={normalizeInternalHref('/plans/')} className="btn btn--secondary btn--lg" title="View Pricing Plans">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <Link href={APP_HOME_PATH} className="footer__logo" title={siteConfig.siteName}>
                <span className="footer__logo-text">{siteConfig.siteName}</span>
              </Link>
              <p className="footer__description">{siteConfig.siteDescription}</p>
            </div>

            {siteConfig.footer.columns.map((column) => (
              <div key={column.title} className="footer__column">
                <h4 className="footer__column-title">{column.title}</h4>
                <ul className="footer__links">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}-${link.href}`}>
                      <Link href={normalizeInternalHref(link.href)} className="footer__link" title={link.label}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">{copyright}</p>
            <nav className="footer__legal" aria-label="Legal links">
              <Link href="/privacy-policy/" className="footer__legal-link" title="Privacy Policy">Privacy</Link>
              <Link href="/terms-of-service/" className="footer__legal-link" title="Terms of Service">Terms</Link>
              <Link href="/refund-policy/" className="footer__legal-link" title="Refund Policy">Refund Policy</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
