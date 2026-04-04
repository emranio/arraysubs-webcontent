import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-shell site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__title">ArraySubs</p>
          <p className="site-footer__text">
            Static-first marketing site built for speed, accessibility, and SEO.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <Link href="/features/">Features</Link>
          <Link href="/docs/">Docs</Link>
          <Link href="/support/">Support</Link>
        </nav>
      </div>
    </footer>
  );
}
