import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__logo"
          aria-label="ArraySubs — Home"
        >
          ArraySubs
        </Link>

        <nav aria-label="Main navigation">
          <ul className="site-header__nav">
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/docs">Docs</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
