export default function HomeHero() {
  return (
    <section className="hero-showcase" aria-labelledby="hero-title">
      <div className="site-shell">
        <div className="hero-showcase__top">
          <div className="hero-showcase__panel hero-showcase__panel--content">
            <p className="hero-showcase__eyebrow">
              WooCommerce subscription growth platform
            </p>

            <h1 id="hero-title" className="hero-showcase__title">
              Grow recurring revenue with subscriptions, retention, analytics,
              and member access in one place.
            </h1>

            <p className="hero-showcase__description">
              Launch subscription products, reduce churn with the Retention Flow
              Builder, control member-only access, and monitor MRR from one
              unified WooCommerce plugin.
            </p>

            <div className="hero-showcase__actions">
              <a className="button button--primary" href="/download/">
                Download Free
              </a>
              <a className="button button--secondary" href="/early-access/">
                Get Pro Free for 4 Months
              </a>
            </div>

            <ul className="hero-showcase__trust" aria-label="Trust indicators">
              <li>Available on WordPress.org</li>
              <li>WooCommerce 8+ ready</li>
              <li>HPOS compatible</li>
            </ul>

            <div
              className="hero-showcase__metric-strip"
              aria-label="Key product stats"
            >
              <div className="hero-showcase__metric-item">
                <strong>40+</strong>
                <span>Reports & KPI views</span>
              </div>
              <div className="hero-showcase__metric-item">
                <strong>4</strong>
                <span>Retention offer types</span>
              </div>
              <div className="hero-showcase__metric-item">
                <strong>10</strong>
                <span>Content rule conditions</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase__panel hero-showcase__panel--visual">
            <div className="hero-visual" aria-label="Product interface preview">
              <div className="hero-visual__screen">
                <div className="hero-visual__screen-top">
                  <span className="hero-visual__pill">Analytics</span>
                  <span className="hero-visual__pill">Retention</span>
                  <span className="hero-visual__pill">Access Rules</span>
                </div>

                <div className="hero-visual__screen-body">
                  <div className="hero-visual__summary-card">
                    <span className="hero-visual__label">
                      Monthly recurring revenue
                    </span>
                    <strong className="hero-visual__value">$48,240</strong>
                    <span className="hero-visual__delta">
                      +18.4% this month
                    </span>
                  </div>

                  <div className="hero-visual__chart" aria-hidden="true">
                    <span className="hero-visual__bar hero-visual__bar--1"></span>
                    <span className="hero-visual__bar hero-visual__bar--2"></span>
                    <span className="hero-visual__bar hero-visual__bar--3"></span>
                    <span className="hero-visual__bar hero-visual__bar--4"></span>
                    <span className="hero-visual__bar hero-visual__bar--5"></span>
                    <span className="hero-visual__bar hero-visual__bar--6"></span>
                  </div>
                </div>
              </div>

              <div className="hero-visual__floating-card hero-visual__floating-card--retention">
                <p className="hero-visual__card-title">
                  Retention Flow Builder
                </p>
                <ul
                  className="hero-visual__steps"
                  aria-label="Retention flow steps"
                >
                  <li>Cancellation reason captured</li>
                  <li>Targeted pause or discount offer</li>
                  <li>Save rate trending upward</li>
                </ul>
              </div>

              <div className="hero-visual__floating-card hero-visual__floating-card--rules">
                <p className="hero-visual__card-title">
                  Content Restriction Builder
                </p>
                <div
                  className="hero-visual__rule-list"
                  aria-label="Access rule example"
                >
                  <span>Plan = Pro Annual</span>
                  <span>Status = Active</span>
                  <span>Unlock = Course Library</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-showcase__feature-grid">
          <article className="hero-feature-card">
            <p className="hero-feature-card__eyebrow">Analytics screenshot</p>
            <h2 className="hero-feature-card__title">
              Track MRR, churn, ARPU, and growth.
            </h2>
            <p className="hero-feature-card__text">
              Clean KPI cards and trend views help you see what is growing and
              what needs attention.
            </p>
          </article>

          <article className="hero-feature-card">
            <p className="hero-feature-card__eyebrow">Retention flow builder</p>
            <h2 className="hero-feature-card__title">
              Turn cancellations into saves.
            </h2>
            <p className="hero-feature-card__text">
              Show the right offer at the right moment with guided cancellation
              flows and save-focused actions.
            </p>
          </article>

          <article className="hero-feature-card">
            <p className="hero-feature-card__eyebrow">
              Content restriction builder
            </p>
            <h2 className="hero-feature-card__title">
              Control exactly who gets access.
            </h2>
            <p className="hero-feature-card__text">
              Restrict pages, products, downloads, and premium areas with clear,
              powerful rules.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
