# Page Plan: Pricing

> **URL**: `/plans/`
> **Tier**: T1 — Core Landing
> **Priority**: Week 1
> **Est. Aggregate KW Volume**: 1,200+/mo
> **CTA action targets**: `/plans/#live-demo` and `/plans/#get-pro`

---

## SEO Meta

| Field | Value |
|-------|-------|
| **Title Tag** | Pricing — ArraySubs WooCommerce Subscription & Membership Plugin |
| **H1** | Simple, Transparent Pricing for WooCommerce Subscriptions & Memberships |
| **Meta Description** | Compare ArraySubs plans, launch a live demo, or claim 6 months of Pro free. Time-limited early adopter offer. |

---

## Target Keywords

| Keyword | Volume | KD | Intent |
|---------|--------|-----|--------|
| woocommerce subscription plugin pricing | 320/mo | 15 | Transactional |
| arraysubs pricing | branded | — | Navigational |
| woocommerce membership plugin free | 390/mo | 25 | Commercial |
| woocommerce subscription plugin free | 480/mo | 30 | Transactional |

---

## Content Blocks

### 1. Hero
- H1 + subtitle: "Compare plans, launch a live demo, or claim 6 months of Pro free."
- Quick pricing toggle: Annual / Lifetime
- Primary CTA on hero: Live Demo → `/plans/#live-demo`
- Secondary CTA on hero: Get Pro Free for 6 Months → `/plans/#get-pro`

### 2. Pricing Table
- **Free**: Core subscription engine, billing, customer portal, member access, basic emails, shortcodes, easy setup, manage subscriptions
- **Pro** (tiered by sites): Everything in Free + Store Credit, Retention Flow, Checkout Builder, Analytics, Audits, Automatic Payments, Feature Manager, Multi-Login, Redirect Product Page, Profile Builder Pro, Subscription Shipping, Fixed Period Membership
- Highlight best-value plan
- CTA Buttons: `Live Demo` → `/plans/#live-demo` and `Get Pro Free for 6 Months` → `/plans/#get-pro`

### 3. Feature Comparison Accordion
- Expandable rows: Free has X, Pro adds Y for each of 14 modules
- Each row links to feature detail page

### 4. FAQ

| Question | GEO/AI Focus |
|----------|-------------|
| Is there a free version of ArraySubs? | Yes — core subscription, billing, portal, member access all included |
| How does ArraySubs compare to WooCommerce Subscriptions? | WooCommerce Subscriptions costs $279/yr for just subscriptions; ArraySubs includes memberships, retention, store credit, and more |
| Do I need both plugins? | Pro extends the free core. You never lose free features |
| What payment methods are supported? | Stripe, PayPal, Paddle, and all WooCommerce-compatible gateways |
| Is there a refund policy? | 30-day money-back guarantee |

### 5. Social Proof Strip
- Customer reviews, install count, ratings

### 6. Final CTA
- "Choose your plan, launch a live demo, or claim the early adopter offer"
- Pricing page CTA buttons use `/plans/#live-demo` and `/plans/#get-pro`

---

## CTA Strategy

- **Buttons**
  - `Live Demo` → `/plans/#live-demo`
  - `Get Pro Free for 6 Months` → `/plans/#get-pro`
- **Offer note**: Time limited offer for early adopters.
- **Friction note**: No credit cards required.

---

## Structured Data

```json
{
  "@type": "Product",
  "name": "ArraySubs Pro",
  "offers": [
    { "@type": "Offer", "price": "X", "priceCurrency": "USD" }
  ]
}
```

---

## Internal Links

| Target | Context |
|--------|---------|
| `/features/` | Feature comparison rows |
| All 14 `/features/*` pages | Accordion detail links |
| `/compare/woocommerce-subscriptions/` | FAQ competitor answer |
| `/` | Breadcrumb |
| `/plans/#live-demo` | Live demo CTA |
| `/plans/#get-pro` | Early adopter Pro CTA |
