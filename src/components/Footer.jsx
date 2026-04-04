import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <strong>ArraySubs</strong>
          <p>
            One WooCommerce subscription system for billing, memberships,
            retention, analytics, and more.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="site-footer__links">
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </nav>

        <p className="site-footer__copy">&copy; {year} ArraySubs. All rights reserved.</p>
      </div>
    </footer>
  );
}
