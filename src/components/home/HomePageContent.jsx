import Link from "next/link";
import {
  comparisonRows,
  differentiators,
  faqItems,
  featureCategories,
  growthBenefits,
  integrationGroups,
  stats,
  testimonials,
  useCases,
} from "@/components/home/homepageData";

function SectionHeader({ label, title, description, center = false }) {
  return (
    <header className={`section-header${center ? " section-header--center" : ""}`}>
      {label ? <p className="section-header__label">{label}</p> : null}
      <h2 className="section-header__title">{title}</h2>
      {description ? <p className="section-header__description">{description}</p> : null}
    </header>
  );
}

function TierBadge({ children }) {
  const tone = children.toLowerCase().includes("pro")
    ? children.toLowerCase().includes("free")
      ? "mixed"
      : "pro"
    : "free";

  return <span className={`tier-badge tier-badge--${tone}`}>{children}</span>;
}

export default function HomePageContent() {
  return (
    <>
      <section className="home-section home-section--intro">
        <div className="site-shell">
          <a className="announce-banner" href="/early-access/">
            <span className="announce-banner__tag">Early Access</span>
            <span className="announce-banner__text">
              ArraySubs Pro is here — sign up now and get 4 months of Pro free.
            </span>
            <span className="announce-banner__link">Claim your free license →</span>
          </a>

          <div className="intro-grid">
            <div className="intro-copy">
              <SectionHeader
                label="Trusted by WooCommerce Store Owners"
                title="The only WooCommerce plugin that brings subscriptions, memberships, retention, and analytics together."
                description="Create subscription products, restrict member-only content, automate recurring billing, reduce churn with smart retention flows, and track MRR — all from one plugin."
              />

              <div className="intro-copy__actions">
                <Link className="button button--primary" href="/download/">
                  Download Free
                </Link>
                <Link className="button button--secondary" href="/early-access/">
                  Get Pro Free for 4 Months
                </Link>
              </div>

              <ul className="trust-list" aria-label="Trust badges">
                <li>Available on WordPress.org</li>
                <li>Works with WooCommerce 8+</li>
                <li>Stripe · PayPal · Paddle</li>
                <li>HPOS Compatible</li>
              </ul>
            </div>

            <aside className="intro-preview" aria-label="Product preview">
              <div className="intro-preview__frame">
                <div className="intro-preview__row">
                  <span className="intro-preview__chip">Analytics</span>
                  <span className="intro-preview__chip">Portal</span>
                  <span className="intro-preview__chip">Retention</span>
                </div>

                <div className="intro-preview__dashboard">
                  <div className="intro-preview__kpi">
                    <small>MRR</small>
                    <strong>$48,240</strong>
                    <span>+18.4%</span>
                  </div>
                  <div className="intro-preview__kpi">
                    <small>Churn save rate</small>
                    <strong>32%</strong>
                    <span>Retention flow active</span>
                  </div>
                </div>

                <div className="intro-preview__timeline">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="home-section home-section--features">
        <div className="site-shell">
          <SectionHeader
            center
            label="Features"
            title="Everything you need to run a subscription business"
            description="15 integrated modules. Zero plugin conflicts. From free trials to MRR dashboards — built for WooCommerce store owners who want power without complexity."
          />

          <div className="feature-category-grid">
            {featureCategories.map((category) => (
              <section key={category.title} className="feature-category">
                <h3 className="feature-category__title">{category.title}</h3>
                <div className="feature-card-grid">
                  {category.cards.map((card) => (
                    <article key={card.title} className="feature-card">
                      <div className="feature-card__meta">
                        <TierBadge>{card.badge}</TierBadge>
                      </div>
                      <h4 className="feature-card__title">{card.title}</h4>
                      <p className="feature-card__description">{card.description}</p>
                      <Link className="feature-card__link" href={card.href}>
                        Learn more →
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="section-actions">
            <Link className="button button--primary" href="/features/">
              Explore All Features
            </Link>
            <Link className="button button--secondary" href="/download/">
              Download Free
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-section--why">
        <div className="site-shell">
          <SectionHeader
            label="Why ArraySubs"
            title="Built different. Built complete."
          />

          <div className="why-grid">
            {differentiators.map((item) => (
              <article key={item.title} className="why-card">
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__body">{item.body}</p>
                <p className="why-card__proof">{item.proof}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--growth">
        <div className="site-shell">
          <SectionHeader
            label="Growth Engine"
            title="Built to grow your business at max"
            description="Every feature in ArraySubs exists for one reason — to grow your subscription revenue, protect it from churn, and free you from busywork."
          />

          <div className="benefit-grid">
            {growthBenefits.map((item, index) => (
              <article key={item.title} className="benefit-card">
                <span className="benefit-card__number">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="benefit-card__title">{item.title}</h3>
                <p className="benefit-card__body">{item.body}</p>
                <p className="benefit-card__outcome">Outcome: {item.outcome}</p>
              </article>
            ))}
          </div>

          <div className="section-actions">
            <Link className="button button--primary" href="/download/">
              Download Free & Start Now
            </Link>
            <Link className="button button--secondary" href="/early-access/">
              Get Pro Free for 4 Months
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-section--comparison">
        <div className="site-shell">
          <SectionHeader
            label="Comparison"
            title="The all-in-one alternative to the multi-plugin stack"
            description="See how ArraySubs compares to buying separate subscription and membership solutions."
          />

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>ArraySubs Free</th>
                  <th>ArraySubs Pro</th>
                  <th>Woo Subscriptions + Memberships</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-actions">
            <Link className="button button--primary" href="/download/">
              Switch to ArraySubs — It’s Free
            </Link>
            <Link className="button button--secondary" href="/compare/woocommerce-subscriptions/">
              See Detailed Comparison
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-section--use-cases">
        <div className="site-shell">
          <SectionHeader
            label="Use Cases"
            title="Whatever you sell, ArraySubs powers it"
            description="From SaaS to subscription boxes, ArraySubs supports different business models without extra plugin sprawl."
          />

          <div className="use-case-grid">
            {useCases.map((item) => (
              <article key={item.title} className="use-case-card">
                <h3 className="use-case-card__title">{item.title}</h3>
                <p className="use-case-card__body">{item.description}</p>
                <p className="use-case-card__example">{item.example}</p>
                <Link className="feature-card__link" href={item.href}>
                  Explore use case →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--social-proof">
        <div className="site-shell">
          <SectionHeader
            center
            label="Early Adopters"
            title="What early adopters are saying"
          />

          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <blockquote key={`${item.name}-${index}`} className="testimonial-card">
                <p className="testimonial-card__quote">“{item.quote}”</p>
                <footer className="testimonial-card__footer">
                  <strong>{item.name}</strong>
                  <span>{item.context}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="stats-strip" aria-label="Key stats">
            {stats.map((item) => (
              <div key={item[1]} className="stats-strip__item">
                <strong>{item[0]}</strong>
                <span>{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--early-access">
        <div className="site-shell">
          <div className="lead-box">
            <div className="lead-box__copy">
              <SectionHeader
                label="Early Access"
                title="Get Pro free for 4 months — no strings attached"
                description="Sign up now and get the full Pro toolkit — store credit, checkout builder, analytics, audits, automatic payments, and more — without a credit card."
              />

              <ul className="lead-box__list">
                <li>Store Credit with 8 credit sources</li>
                <li>Checkout Builder with 27 field types</li>
                <li>Advanced Analytics with MRR, churn, and ARPU</li>
                <li>Audits, logs, and gateway health monitoring</li>
              </ul>
            </div>

            <form className="lead-form" action="/early-access/" method="get">
              <label className="sr-only" htmlFor="lead-email">
                Email address
              </label>
              <input
                id="lead-email"
                className="lead-form__input"
                type="email"
                name="email"
                placeholder="Your email address"
                autoComplete="email"
                required
              />
              <button className="button button--primary lead-form__button" type="submit">
                Claim My Free Pro License
              </button>
              <p className="lead-form__note">
                We’ll send your license key immediately. No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="home-section home-section--steps">
        <div className="site-shell">
          <SectionHeader
            center
            label="How It Works"
            title="From install to first subscription in under 10 minutes"
          />

          <div className="step-grid">
            {[
              ["1", "Install & run the wizard", "Install ArraySubs and let the guided setup configure billing, access, and retention defaults."],
              ["2", "Create your first subscription product", "Open any WooCommerce product, enable subscriptions, define pricing, and publish."],
              ["3", "Watch your business grow", "Let renewals, retention, and analytics work together as customers subscribe."],
            ].map((step) => (
              <article key={step[0]} className="step-card">
                <span className="step-card__number">{step[0]}</span>
                <h3 className="step-card__title">{step[1]}</h3>
                <p className="step-card__body">{step[2]}</p>
              </article>
            ))}
          </div>

          <div className="section-actions">
            <Link className="button button--primary" href="/download/">
              Download Free & Start Now
            </Link>
            <Link className="button button--secondary" href="/docs/">
              Read the Documentation
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-section--integrations">
        <div className="site-shell">
          <SectionHeader
            center
            label="Integrations"
            title="WooCommerce-first. Your existing stack already works."
            description="Your gateway, CRM, funnel builder, affiliate tools, and page builder stay compatible because ArraySubs is built on WooCommerce foundations."
          />

          <div className="integration-grid">
            {integrationGroups.map((group) => (
              <article key={group.title} className="integration-card">
                <h3 className="integration-card__title">{group.title}</h3>
                <ul className="integration-card__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="integration-note">
            Compatible with WooCommerce HPOS. Built for the classic checkout flow, which is required for the Checkout Builder’s drag-and-drop editing experience.
          </p>
        </div>
      </section>

      <section className="home-section home-section--faq">
        <div className="site-shell">
          <SectionHeader
            center
            label="FAQ"
            title="Got questions? We’ve got answers."
          />

          <div className="faq-grid">
            {faqItems.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-item__question">{item.question}</summary>
                <p className="faq-item__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--problem">
        <div className="site-shell">
          <SectionHeader
            label="The Problem"
            title="You shouldn’t need six plugins to sell subscriptions and memberships"
            description="Most stores end up stacking a subscription plugin, a membership plugin, a retention tool, a store credit add-on, a checkout customizer, and an analytics dashboard just to build one recurring business."
          />

          <div className="problem-grid">
            <article className="problem-card problem-card--old">
              <h3 className="problem-card__title">The old way</h3>
              <ul className="problem-card__list">
                <li>Subscriptions & recurring billing</li>
                <li>Memberships & access control</li>
                <li>Retention / churn prevention</li>
                <li>Store credit / wallet</li>
                <li>Checkout customization</li>
                <li>Analytics & MRR tracking</li>
              </ul>
              <p className="problem-card__result">Six plugins. Six update cycles. Six places for conflicts.</p>
            </article>

            <article className="problem-card problem-card--new">
              <h3 className="problem-card__title">The ArraySubs way</h3>
              <ul className="problem-card__list">
                <li>Subscriptions + memberships + billing in core</li>
                <li>Customer portal, retention flow, and setup wizard included</li>
                <li>Store credit, analytics, audits, and automation in Pro</li>
              </ul>
              <p className="problem-card__result">One plugin. One data layer. Zero duct-taping.</p>
            </article>
          </div>

          <blockquote className="problem-quote">
            “Replace your entire WooCommerce subscription and membership plugin stack with one free solution.”
          </blockquote>
        </div>
      </section>

      <section className="home-section home-section--final-cta">
        <div className="site-shell">
          <div className="final-cta">
            <h2 className="final-cta__title">Start building your subscription business today</h2>
            <p className="final-cta__body">
              The free core plugin is already on WordPress.org. Install it, run the wizard, and have your first subscription product live in minutes.
            </p>
            <div className="section-actions section-actions--center">
              <Link className="button button--primary" href="/download/">
                Download Free Plugin
              </Link>
              <Link className="button button--secondary" href="/early-access/">
                Get Pro Free for 4 Months
              </Link>
            </div>
            <p className="final-cta__note">Free forever. No credit card required. Installs in 2 minutes.</p>
          </div>
        </div>
      </section>
    </>
  );
}
