import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <Link
            href="/"
            className="site-header__logo"
            aria-label="ArraySubs — Home"
          >
            ArraySubs
          </Link>
          <span className="site-header__badge">for WooCommerce</span>
        </div>

        <nav aria-label="Main navigation">
          <ul className="site-header__nav">
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/pricing">Early access</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <Link href="/download/" className="site-header__action site-header__action--ghost">
            Download Free
          </Link>
          <Link href="/early-access/" className="site-header__action site-header__action--primary">
            Get Pro Free
          </Link>
        </div>
      </div>
    </header>
  );
}
