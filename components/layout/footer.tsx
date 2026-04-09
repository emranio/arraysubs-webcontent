import React from 'react';
import Link from 'next/link';
import siteConfig from '@/site.config.json';

export function Footer() {
  const year = new Date().getFullYear();
  const copyright = siteConfig.footer.copyright.replace('{year}', String(year));

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" title={siteConfig.siteName}>
              <span className="footer__logo-text">{siteConfig.siteName}</span>
            </Link>
            <p className="footer__description">{siteConfig.siteDescription}</p>
          </div>

          {siteConfig.footer.columns.map((column) => (
            <div key={column.title} className="footer__column">
              <h4 className="footer__column-title">{column.title}</h4>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer__link" title={link.label}>
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
        </div>
      </div>
    </footer>
  );
}
