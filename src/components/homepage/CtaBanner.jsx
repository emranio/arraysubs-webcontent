import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="hp-cta-banner">
      <h2 className="hp-cta-banner__title">
        Ready to Replace Your Plugin Stack?
      </h2>
      <p className="hp-cta-banner__subtitle">
        Download the free core from WordPress.org or claim your 4-month Pro
        license — no credit card required.
      </p>
      <div className="hp-cta-banner__actions">
        <Link href="/download/" className="btn btn--primary btn--large">
          Download Free Plugin
        </Link>
        <Link href="/early-access/" className="btn btn--secondary btn--large">
          Get Pro Free for 4 Months
        </Link>
      </div>
    </section>
  );
}
