import Link from "next/link";

const navItems = [
  { label: "Features", href: "/features/" },
  { label: "Docs", href: "/docs/" },
  { label: "Early Access", href: "/early-access/" },
];

export default function Header() {
  return (
    <header className="site-header" aria-label="Site header">
      <div className="site-shell site-header__inner">
        <Link
          className="site-header__brand"
          href="/"
          aria-label="ArraySubs home"
        >
          <span className="site-header__brand-mark" aria-hidden="true">
            A
          </span>
          <span className="site-header__brand-text">ArraySubs</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          <ul className="site-header__nav-list">
            {navItems.map((item) => (
              <li key={item.href} className="site-header__nav-item">
                <Link className="site-header__nav-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="site-header__cta" href="/download/">
          Download Free
        </Link>
      </div>
    </header>
  );
}
