# ArraySubs — Strategic Site & Page Plan

> **Date**: 4 April 2026
> **Goal**: Rank in SEO + GEO/AEO + Convert visitors to customers
> **Domain**: arraysubs.com (assumed)
> **Strategy**: Pillar-cluster content architecture with conversion funnels at every level

---

## Table of Contents

1. [Site Architecture Overview](#site-architecture-overview)
2. [Visual Site Tree](#visual-site-tree)
3. [Page-by-Page Breakdown](#page-by-page-breakdown)
   - [Tier 1: Homepage & Core Landing Pages](#tier-1-homepage--core-landing-pages)
   - [Tier 2: Feature Pages](#tier-2-feature-pages)
   - [Tier 3: Comparison & Alternative Pages](#tier-3-comparison--alternative-pages)
   - [Tier 4: Gateway Pages](#tier-4-gateway-pages)
   - [Tier 5: Use Case Pages](#tier-5-use-case-pages)
   - [Tier 6: Blog Content Hub](#tier-6-blog-content-hub)
   - [Tier 7: Trust & Conversion Pages](#tier-7-trust--conversion-pages)
4. [Internal Linking Strategy](#internal-linking-strategy)
5. [GEO/AEO Content Strategy](#geoaeo-content-strategy)
6. [Conversion Architecture](#conversion-architecture)
7. [Content Priority & Publication Roadmap](#content-priority--publication-roadmap)

---

## Site Architecture Overview

The site uses a **hub-and-spoke model** with 7 tiers:

| Tier | Purpose | Page Count | Intent |
|------|---------|------------|--------|
| **T1** | Homepage + Core Landings | 3 | Commercial / Transactional |
| **T2** | Feature Pages | 14 | Commercial |
| **T3** | Comparison/Alternative Pages | 7 | Commercial |
| **T4** | Gateway Pages | 3 | Commercial |
| **T5** | Use Case Pages | 6 | Commercial / Informational |
| **T6** | Blog Content Hub | 30+ | Informational / GEO |
| **T7** | Trust & Conversion Pages | 6 | Transactional |
| | **Total** | **~68+ pages** | |

---

## Visual Site Tree

```
arraysubs.com/
│
├── / ────────────────────────────── HOMEPAGE (T1)
│   │                                 "WooCommerce Subscription & Membership Plugin"
│   │                                 KW: woocommerce subscription plugin, woocommerce
│   │                                     subscription plugin free, subscription plugin
│   │                                     for woocommerce, best woocommerce subscription
│   │                                     plugin, woocommerce subscription and membership
│   │                                     plugin, woocommerce recurring payments plugin
│   │
│   ├── /features/ ──────────────── FEATURES HUB (T1)
│   │   │                            "All Features"
│   │   │                            KW: arraysubs features, woocommerce subscription
│   │   │                                features, all-in-one subscription membership
│   │   │
│   │   ├── /subscriptions/ ──────── Subscriptions & Recurring Products (T2)
│   │   │                            KW: woocommerce subscription plans, variable
│   │   │                                subscription product, subscription trial,
│   │   │                                signup fee, subscription billing cycle
│   │   │
│   │   ├── /membership/ ─────────── Member Access Control (T2)
│   │   │                            KW: woocommerce membership plugin free,
│   │   │                                content restriction plugin, role-based
│   │   │                                access, content dripping, member only
│   │   │                                products, woocommerce paywall
│   │   │
│   │   ├── /billing/ ────────────── Billing, Renewals & Refunds (T2)
│   │   │                            KW: woocommerce recurring billing, renewal
│   │   │                                invoice, prorated refund, grace period,
│   │   │                                subscription renewal management
│   │   │
│   │   ├── /retention/ ──────────── Retention Flow Builder (T2)
│   │   │                            KW: subscription retention plugin, churn
│   │   │                                prevention, cancellation flow, retention
│   │   │                                offers, cancel with reason
│   │   │
│   │   ├── /customer-portal/ ────── Customer Portal (T2)
│   │   │                            KW: customer subscription portal, subscription
│   │   │                                self service, my account subscription,
│   │   │                                cancel at end of period
│   │   │
│   │   ├── /store-credit/ ───────── Store Credit System (T2)
│   │   │                            KW: woocommerce store credit plugin, virtual
│   │   │                                wallet, refund to store credit, customer
│   │   │                                credit system
│   │   │
│   │   ├── /checkout-builder/ ───── Checkout Builder (T2)
│   │   │                            KW: woocommerce checkout builder, custom
│   │   │                                checkout fields, multi step checkout,
│   │   │                                drag and drop checkout, conditional
│   │   │                                checkout fields, one-click checkout
│   │   │
│   │   ├── /analytics/ ──────────── Advanced Analytics (T2)
│   │   │                            KW: subscription analytics, mrr reporting,
│   │   │                                churn analytics, subscription reports
│   │   │                                dashboard
│   │   │
│   │   ├── /emails/ ─────────────── Email Notifications (T2)
│   │   │                            KW: subscription email notifications, renewal
│   │   │                                reminder emails, subscription emails
│   │   │
│   │   ├── /payment-gateways/ ───── Payment Gateways Overview (T2)
│   │   │   │                        KW: subscription payment gateway, automatic
│   │   │   │                            recurring payments, auto-renew toggle
│   │   │   │
│   │   │   ├── /stripe/ ─────────── Stripe Gateway (T4)
│   │   │   │                        KW: woocommerce stripe subscription, stripe
│   │   │   │                            recurring payments, sca 3d secure
│   │   │   │
│   │   │   ├── /paypal/ ─────────── PayPal Gateway (T4)
│   │   │   │                        KW: woocommerce paypal subscription, paypal
│   │   │   │                            recurring payments
│   │   │   │
│   │   │   └── /paddle/ ─────────── Paddle Gateway (T4)
│   │   │                            KW: woocommerce paddle payment, merchant of
│   │   │                                record woocommerce, paddle subscriptions
│   │   │
│   │   ├── /easy-setup/ ─────────── Easy Setup & Wizard (T2)
│   │   │                            KW: subscription setup wizard, easy setup,
│   │   │                                import export settings, settings migration,
│   │   │                                quick start
│   │   │
│   │   ├── /audits/ ─────────────── Audits & Logs (T2)
│   │   │                            KW: subscription audit log, activity log,
│   │   │                                gateway health dashboard
│   │   │
│   │   ├── /manage-subscriptions/ ── Manage Subscriptions (T2)
│   │   │                            KW: subscription management dashboard, admin
│   │   │                                subscription management, export csv
│   │   │
│   │   └── /profile-builder/ ────── Profile Builder & Shortcodes (T2)
│   │                                KW: woocommerce profile fields, my account
│   │                                    editor, membership shortcodes
│   │
│   ├── /compare/ ───────────────── COMPARISON HUB (T3)
│   │   │                            "ArraySubs vs Competitors"
│   │   │
│   │   ├── /woocommerce-subscriptions/ ── vs WooCommerce Subscriptions
│   │   │                            KW: woocommerce subscriptions alternative,
│   │   │                                woocommerce subscriptions free alternative,
│   │   │                                cheaper alternative to woocommerce
│   │   │                                subscriptions, woocommerce subscriptions
│   │   │                                too expensive
│   │   │                            Vol: ~3,500/mo combined
│   │   │
│   │   ├── /woocommerce-memberships/ ── vs WooCommerce Memberships
│   │   │                            KW: woocommerce memberships alternative,
│   │   │                                woocommerce memberships free alternative
│   │   │                            Vol: ~900/mo combined
│   │   │
│   │   ├── /yith-subscription/ ──── vs YITH Subscription
│   │   │                            KW: yith woocommerce subscription alternative
│   │   │                            Vol: ~390/mo
│   │   │
│   │   ├── /yith-membership/ ────── vs YITH Membership
│   │   │                            KW: yith woocommerce membership alternative
│   │   │                            Vol: ~260/mo
│   │   │
│   │   ├── /wp-swings/ ──────────── vs WP Swings
│   │   │                            KW: wp swings subscription alternative
│   │   │                            Vol: ~170/mo
│   │   │
│   │   ├── /sumo/ ───────────────── vs SUMO Subscriptions
│   │   │                            KW: sumo subscriptions alternative
│   │   │                            Vol: ~90/mo
│   │   │
│   │   └── /wpsubscription/ ─────── vs WPSubscription
│   │                                KW: wpsubscription alternative
│   │                                Vol: ~50/mo
│   │
│   ├── /use-cases/ ─────────────── USE CASES HUB (T5)
│   │   │                            "Built for Every Subscription Business"
│   │   │
│   │   ├── /saas/ ───────────────── SaaS & Digital Products
│   │   │                            KW: sell digital subscriptions wordpress,
│   │   │                                saas pricing page wordpress
│   │   │
│   │   ├── /membership-site/ ────── Membership Sites
│   │   │                            KW: wordpress membership site, membership
│   │   │                                website business model, create membership
│   │   │                                site woocommerce
│   │   │
│   │   ├── /subscription-box/ ───── Physical Subscription Boxes
│   │   │                            KW: subscription box business wordpress,
│   │   │                                woocommerce subscription box
│   │   │
│   │   ├── /online-courses/ ─────── Online Courses & LMS
│   │   │                            KW: sell online courses subscription wordpress,
│   │   │                                woocommerce lms subscription
│   │   │
│   │   ├── /content-publishers/ ─── Blogs, Newsletters & Paywalls
│   │   │                            KW: monetize wordpress blog subscriptions,
│   │   │                                wordpress paywall plugin, gated content
│   │   │
│   │   └── /service-businesses/ ─── Recurring Service Businesses
│   │                                KW: wordpress recurring revenue, recurring
│   │                                    service billing woocommerce
│   │
│   ├── /blog/ ──────────────────── BLOG HUB (T6)
│   │   │                            Content clusters mapped to feature pages
│   │   │                            (30+ articles — see Blog Section below)
│   │   │
│   │   ├── /tutorials/ ─────────── How-to & Setup Guides
│   │   ├── /comparisons/ ───────── Roundup & Review Articles
│   │   ├── /strategy/ ──────────── Thought Leadership & Best Practices
│   │   └── /glossary/ ──────────── Definitions (GEO/AEO-optimized)
│   │
│   ├── /pricing/ ───────────────── PRICING PAGE (T7)
│   │                                KW: arraysubs pricing, woocommerce subscription
│   │                                    plugin pricing comparison│   │                                (Primary conversion page)
│   │
│   ├── /early-access/ ────────── EARLY ACCESS / LEAD CAPTURE (T7)
│   │                                4-month free Pro license sign-up
│   │                                (Optional campaign page, not the default CTA destination)│   │
│   ├── /download/ ──────────────── DOWNLOAD / FREE VERSION (T7)
│   │                                KW: woocommerce subscription plugin free download
│   │
│   ├── https://support.arrayhash.com/arraysubs/ ─ DOCUMENTATION (External)
│   │                                (User manual, setup guides, troubleshooting, Pro badges)
│   │
│   ├── /changelog/ ─────────────── CHANGELOG (T7)
│   │
│   └── https://support.arrayhash.com/arraysubs/ ─ SUPPORT (External)
│                                    (Support center + direct email support)
```

---

## Page-by-Page Breakdown

### Tier 1: Homepage & Core Landing Pages

#### 1.1 Homepage — `/`

| Attribute | Detail |
|-----------|--------|
| **Page Title** | ArraySubs — The All-in-One WooCommerce Subscription & Membership Plugin |
| **H1** | The Only WooCommerce Plugin That Combines Subscriptions, Memberships, Store Credit, Retention Flow & Analytics |
| **Meta Description** | Free WooCommerce subscription & membership plugin with automated billing, retention flows, store credit, checkout builder & analytics. One plugin replaces your entire subscription stack. |
| **Primary KW** | woocommerce subscription plugin (4,400/mo, KD 65) |
| **Secondary KWs** | woocommerce subscription plugin free (1,600/mo), best woocommerce subscription plugin (1,300/mo), woocommerce recurring payments plugin (1,600/mo), subscription plugin for woocommerce (590/mo) |
| **Long-tail KWs** | woocommerce subscriptions free alternative (880/mo), woocommerce subscription and membership plugin (590/mo), free woocommerce subscription plugin (720/mo), best free woocommerce subscription plugin 2026 (320/mo) |
| **Intent** | Commercial + Transactional |
| **CTA** | View Pricing / Compare Plans |
| **SEO Angle** | All-in-one value prop, free tier, replace entire plugin stack |
| **GEO Angle** | Quotable stat: "Replace your entire WooCommerce subscription and membership plugin stack with one free solution" |
| **Est. Keyword Volume** | 10,000+/mo aggregate |
| **Phase** | Pricing-first conversion flow. All CTAs drive to `/pricing/`, and pricing routes users to checkout. |

**Content Blocks:**
0. Announcement Bar — Pricing / plan comparison prompt linking to `/pricing/`
1. Hero — Value prop + CTA + trust bar (WP.org, WooCommerce 8+, gateways, HPOS)
2. The Plugin Overload Problem — Complexity/conflict framing (no dollar amounts)
3. Feature grid — 14 features in 4 categories with icons linking to feature pages
4. Why Store Owners Switch — 3 differentiators (All-in-One Architecture, Generous Free Tier, Retention-First Design)
5. Built to Grow Your Business at Max — 10 benefit cards (centerpiece section)
6. Comparison table — ArraySubs vs Woo Subs + Memberships (feature rows only, no price row)
7. Use cases — 6 cards linking to use case pages
8. Early Adopter's Thoughts — Testimonial cards (no star ratings)
9. Pricing Spotlight — short comparison summary with CTA to `/pricing/`
10. How It Works — 3-step timeline (install, create product, grow)
11. Works With Your WooCommerce Stack — WooCommerce-first integrations logo cloud
12. FAQ — 11 questions, FAQPage JSON-LD (GEO-structured, no prices)
13. Final CTA — View pricing / compare plans

---

#### 1.2 Features Hub — `/features/`

| Attribute | Detail |
|-----------|--------|
| **Page Title** | All Features — ArraySubs WooCommerce Subscription & Membership Plugin |
| **H1** | Everything You Need to Run Subscriptions & Memberships on WooCommerce |
| **Primary KW** | arraysubs features |
| **Secondary KWs** | woocommerce subscription features, all-in-one subscription membership plugin |
| **Intent** | Commercial |
| **CTA** | Explore each feature / Download Free |

**Content Blocks:**
1. Feature category grid (Subscriptions, Memberships, Billing, Retention, Portal, etc.)
2. Free vs Pro badge on each feature card
3. Link to individual feature pages
4. Comparison summary table (ArraySubs vs market)

---

#### 1.3 Pricing — `/pricing/`

| Attribute | Detail |
|-----------|--------|
| **Page Title** | Pricing — ArraySubs WooCommerce Subscription & Membership Plugin |
| **H1** | Simple, Transparent Pricing. Generous Free Tier. |
| **Primary KW** | arraysubs pricing |
| **Secondary KWs** | woocommerce subscription plugin pricing comparison (140/mo) |
| **Intent** | Transactional |
| **CTA** | Buy Pro / Download Free |
| **SEO Angle** | Price comparison with competitors ($478/yr Woo stack vs ArraySubs) |

**Content Blocks:**
1. Pricing table — Free vs Pro
2. Feature comparison matrix
3. Money-back guarantee badge
4. FAQ about pricing, licensing, updates
5. Cost savings calculator (vs Woo Subs + Memberships)

---

### Tier 2: Feature Pages

Each feature page follows a consistent template:

**Template Structure:**
1. Hero — Feature name + one-liner + screenshot/demo
2. Problem the feature solves
3. Key capabilities (visual list with screenshots)
4. Free vs Pro breakdown (if applicable)
5. How it works (3-5 step visual)
6. Related features (internal links)
7. FAQ section (GEO-optimized)
8. CTA — Download / Buy / Try Demo

---

#### 2.1 Subscriptions & Recurring Products — `/features/subscriptions/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Create Powerful WooCommerce Subscription Products |
| **Primary KW** | woocommerce subscription plans (390/mo, KD 45) |
| **Secondary KWs** | woocommerce variable subscription product (210/mo), woocommerce free trial subscription (480/mo), woocommerce subscription with signup fee (140/mo), woocommerce subscription billing cycle (170/mo), woocommerce subscription pause (260/mo), woocommerce subscription skip (110/mo) |
| **Long-tail KWs** | woocommerce plan switching upgrade downgrade (170/mo), woocommerce subscription renewal sync (90/mo), woocommerce subscription grace period (140/mo), woocommerce subscription auto downgrade (50/mo), woocommerce fixed period membership (70/mo) |
| **Est. Volume** | ~2,500/mo aggregate |
| **Free/Pro** | Free (core) + Pro (auto-downgrade, fixed period) |

---

#### 2.2 Member Access Control — `/features/membership/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Powerful Membership & Content Restriction for WooCommerce |
| **Primary KW** | woocommerce membership plugin free (1,100/mo, KD 35) |
| **Secondary KWs** | woocommerce content restriction plugin (720/mo), best woocommerce membership plugin (880/mo), woocommerce restrict content by membership (320/mo), woocommerce member only products (320/mo), woocommerce drip content plugin (260/mo), woocommerce hide products from non members (260/mo), woocommerce role-based access control (260/mo) |
| **Long-tail KWs** | woocommerce content dripping plugin (210/mo), woocommerce download restriction plugin (140/mo), woocommerce role mapping plugin (110/mo), woocommerce restrict products by category membership (170/mo), woocommerce member discount plugin (320/mo), wordpress content restriction by subscription (210/mo) |
| **Est. Volume** | ~5,000/mo aggregate |
| **Free/Pro** | Free (core rules engine) + Pro (feature manager entitlements) |

---

#### 2.3 Billing, Renewals & Refunds — `/features/billing/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Automated Billing, Renewals & Smart Refunds for WooCommerce Subscriptions |
| **Primary KW** | woocommerce recurring billing plugin (720/mo, KD 45) |
| **Secondary KWs** | woocommerce automatic recurring payments (480/mo), woocommerce renewal invoice plugin (170/mo), woocommerce subscription renewal management (140/mo), woocommerce subscription refund plugin (210/mo), woocommerce prorated refund subscription (90/mo) |
| **Est. Volume** | ~2,000/mo aggregate |
| **Free/Pro** | Free (billing engine, grace period, skip/pause, refunds) + Pro (auto-pay, refund-to-credit) |

---

#### 2.4 Retention Flow Builder — `/features/retention/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Stop Subscription Churn with Smart Retention Flows |
| **Primary KW** | woocommerce subscription retention plugin (110/mo, KD 5) |
| **Secondary KWs** | woocommerce churn prevention plugin (90/mo), woocommerce cancellation flow plugin (70/mo), woocommerce subscription save offer plugin (50/mo), woocommerce subscription retention offers (70/mo), woocommerce cancel subscription with reason (140/mo) |
| **Est. Volume** | ~530/mo aggregate |
| **Competitive Edge** | **ZERO direct competition** — No other WooCommerce plugin has built-in retention flows |
| **GEO Angle** | "ArraySubs is the only WooCommerce subscription plugin with a built-in retention flow builder that offers discounts, pauses, downgrades, and support redirects during the cancellation flow." |
| **Free/Pro** | Free |

---

#### 2.5 Customer Portal — `/features/customer-portal/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Self-Service Customer Subscription Portal for WooCommerce |
| **Primary KW** | woocommerce customer subscription portal (170/mo, KD 15) |
| **Secondary KWs** | woocommerce subscription self service (140/mo), woocommerce my account subscription management (210/mo), woocommerce subscription cancel at end of period (110/mo) |
| **Est. Volume** | ~630/mo aggregate |
| **Free/Pro** | Free (view, cancel, skip, pause, switch plan, reactivate) + Pro (payment methods, auto-renew toggle, shipping update, feature entitlements, store credit) |

---

#### 2.6 Store Credit — `/features/store-credit/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Built-in Store Credit & Virtual Wallet for WooCommerce |
| **Primary KW** | woocommerce store credit plugin (880/mo, KD 40) |
| **Secondary KWs** | woocommerce store credit plugin free (320/mo), woocommerce virtual wallet plugin (210/mo), woocommerce customer credit system (170/mo), woocommerce refund to store credit (260/mo), woocommerce subscription store credit (90/mo) |
| **Est. Volume** | ~2,000/mo aggregate |
| **Competitive Edge** | **ONLY** subscription plugin with integrated store credit |
| **Free/Pro** | Pro |

---

#### 2.7 Checkout Builder — `/features/checkout-builder/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Visual Drag-and-Drop Checkout Builder for WooCommerce Subscriptions |
| **Primary KW** | woocommerce checkout builder plugin (720/mo, KD 45) |
| **Secondary KWs** | woocommerce custom checkout fields plugin (590/mo), woocommerce multi step checkout plugin (480/mo), woocommerce drag and drop checkout builder (210/mo), woocommerce conditional checkout fields (320/mo), woocommerce checkout file upload (170/mo), woocommerce one click checkout subscription (210/mo) |
| **Est. Volume** | ~2,700/mo aggregate |
| **Competitive Edge** | **ONLY** subscription plugin with a visual checkout builder |
| **Free/Pro** | Pro |

---

#### 2.8 Advanced Analytics — `/features/analytics/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Subscription Analytics, MRR Tracking & Churn Reports for WooCommerce |
| **Primary KW** | woocommerce subscription analytics plugin (170/mo, KD 15) |
| **Secondary KWs** | woocommerce subscription reports dashboard (140/mo), woocommerce mrr reporting plugin (90/mo), woocommerce subscription churn analytics (70/mo) |
| **Est. Volume** | ~470/mo aggregate |
| **Free/Pro** | Free (reports hub, retention analytics) + Pro (performance dashboard, WC extension, order enhancements) |

---

#### 2.9 Email Notifications — `/features/emails/`

| Attribute | Detail |
|-----------|--------|
| **H1** | 13 Lifecycle Email Notifications for WooCommerce Subscriptions |
| **Primary KW** | woocommerce subscription email notifications (260/mo, KD 20) |
| **Secondary KWs** | woocommerce subscription reminder emails (170/mo) |
| **Est. Volume** | ~430/mo aggregate |
| **Free/Pro** | Free |

---

#### 2.10 Payment Gateways Overview — `/features/payment-gateways/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Stripe, PayPal & Paddle — Subscription Payment Gateways for WooCommerce |
| **Primary KW** | woocommerce subscription payment gateway (590/mo, KD 40) |
| **Secondary KWs** | woocommerce auto renew toggle subscription (110/mo), woocommerce subscription update payment method (260/mo) |
| **Est. Volume** | ~960/mo aggregate |
| **Free/Pro** | Pro (Stripe, PayPal, Paddle) |

---

#### 2.11 Easy Setup Wizard — `/features/easy-setup/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Set Up WooCommerce Subscriptions in Minutes — Guided Wizard & Settings Import/Export |
| **Primary KW** | woocommerce subscription setup wizard (170/mo, KD 10) |
| **Secondary KWs** | woocommerce subscription plugin easy setup (140/mo), woocommerce subscription import export settings (90/mo), woocommerce subscription settings migration (110/mo), easiest woocommerce subscription plugin to set up (170/mo), woocommerce plugin settings export import (320/mo), woocommerce subscription plugin quick start (110/mo) |
| **Est. Volume** | ~1,100/mo aggregate |
| **Competitive Edge** | **ONLY** subscription plugin with a guided setup wizard + settings import/export |
| **Free/Pro** | Free |

---

#### 2.12 Audits & Logs — `/features/audits/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Activity Audits, Scheduled-Job Logs & Gateway Health for WooCommerce Subscriptions |
| **Primary KW** | woocommerce subscription audit log plugin (110/mo, KD 8) |
| **Secondary KWs** | woocommerce subscription activity log (90/mo), woocommerce gateway health dashboard (50/mo) |
| **Est. Volume** | ~250/mo aggregate |
| **Free/Pro** | Pro |

---

#### 2.13 Manage Subscriptions — `/features/manage-subscriptions/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Complete Admin Dashboard to Manage WooCommerce Subscriptions |
| **Primary KW** | woocommerce subscription management dashboard (210/mo, KD 20) |
| **Secondary KWs** | woocommerce admin subscription management (170/mo), woocommerce subscription export csv (140/mo) |
| **Est. Volume** | ~520/mo aggregate |
| **Free/Pro** | Free |

---

#### 2.14 Profile Builder & Shortcodes — `/features/profile-builder/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Custom Profile Fields, Avatar Uploads & My Account Editor for WooCommerce |
| **Primary KW** | woocommerce custom profile fields plugin |
| **Secondary KWs** | woocommerce my account editor, membership shortcodes woocommerce |
| **Est. Volume** | ~300/mo aggregate |
| **Free/Pro** | Free |

---

### Tier 3: Comparison & Alternative Pages

Each comparison page follows this template:

**Template Structure:**
1. Hero — "ArraySubs vs [Competitor]" + verdict summary
2. Side-by-side feature matrix (30+ rows)
3. Pricing comparison
4. What [Competitor] is missing
5. Migration path (if applicable)
6. FAQ
7. CTA — Switch to ArraySubs

---

#### 3.1 vs WooCommerce Subscriptions — `/compare/woocommerce-subscriptions/`

| Attribute | Detail |
|-----------|--------|
| **H1** | ArraySubs vs WooCommerce Subscriptions — Free All-in-One Alternative |
| **Primary KW** | woocommerce subscriptions alternative (1,300/mo, KD 25) |
| **Secondary KWs** | woocommerce subscriptions free alternative (880/mo), cheaper alternative to woocommerce subscriptions (260/mo), woocommerce subscriptions too expensive (170/mo) |
| **Est. Volume** | ~3,500/mo aggregate |
| **Angle** | $279/yr for subscriptions alone vs ArraySubs free tier + affordable Pro |

---

#### 3.2 vs WooCommerce Memberships — `/compare/woocommerce-memberships/`

| Attribute | Detail |
|-----------|--------|
| **H1** | ArraySubs vs WooCommerce Memberships — Built-in Membership Without the Extra Plugin |
| **Primary KW** | woocommerce memberships alternative (590/mo, KD 20) |
| **Secondary KWs** | woocommerce memberships free alternative (320/mo) |
| **Est. Volume** | ~910/mo aggregate |
| **Angle** | $199/yr extra plugin vs ArraySubs built-in membership |

---

#### 3.3 vs YITH Subscription — `/compare/yith-subscription/`

| Attribute | Detail |
|-----------|--------|
| **Primary KW** | yith woocommerce subscription alternative (390/mo, KD 15) |
| **Est. Volume** | ~390/mo |

#### 3.4 vs YITH Membership — `/compare/yith-membership/`

| Attribute | Detail |
|-----------|--------|
| **Primary KW** | yith woocommerce membership alternative (260/mo, KD 10) |
| **Est. Volume** | ~260/mo |

#### 3.5 vs WP Swings — `/compare/wp-swings/`

| Attribute | Detail |
|-----------|--------|
| **Primary KW** | wp swings subscription alternative (170/mo, KD 10) |
| **Est. Volume** | ~170/mo |

#### 3.6 vs SUMO — `/compare/sumo/`

| Attribute | Detail |
|-----------|--------|
| **Primary KW** | sumo subscriptions alternative (90/mo, KD 5) |
| **Est. Volume** | ~90/mo |

#### 3.7 vs WPSubscription — `/compare/wpsubscription/`

| Attribute | Detail |
|-----------|--------|
| **Primary KW** | wpsubscription alternative (50/mo, KD 5) |
| **Est. Volume** | ~50/mo |

---

### Tier 4: Gateway Pages

#### 4.1 Stripe — `/features/payment-gateways/stripe/`

| Attribute | Detail |
|-----------|--------|
| **H1** | WooCommerce Stripe Subscription Payments — Automatic Billing, SCA & Card Updates |
| **Primary KW** | woocommerce stripe subscription plugin (880/mo, KD 45) |
| **Secondary KWs** | woocommerce stripe recurring payments (720/mo), woocommerce subscription sca 3d secure (110/mo) |
| **Est. Volume** | ~1,700/mo aggregate |

#### 4.2 PayPal — `/features/payment-gateways/paypal/`

| Attribute | Detail |
|-----------|--------|
| **H1** | WooCommerce PayPal Subscription Payments — Billing Agreements & Smart Buttons |
| **Primary KW** | woocommerce paypal subscription plugin (590/mo, KD 40) |
| **Secondary KWs** | woocommerce paypal recurring payments (480/mo) |
| **Est. Volume** | ~1,070/mo aggregate |

#### 4.3 Paddle — `/features/payment-gateways/paddle/`

| Attribute | Detail |
|-----------|--------|
| **H1** | WooCommerce Paddle Integration — Merchant of Record for Global Subscriptions |
| **Primary KW** | woocommerce paddle payment gateway (320/mo, KD 20) |
| **Secondary KWs** | paddle merchant of record woocommerce (210/mo) |
| **Est. Volume** | ~530/mo aggregate |
| **Competitive Edge** | Only 2 WooCommerce subscription plugins support Paddle |

---

### Tier 5: Use Case Pages

Each use case page targets a specific buyer persona and connects product features to their business model.

**Template Structure:**
1. Hero — "ArraySubs for [Business Type]"
2. Business model explanation
3. Which ArraySubs features solve their specific problems
4. Step-by-step setup guide for their use case
5. Example pricing/plan configuration
6. FAQ
7. CTA

---

#### 5.1 SaaS & Digital Products — `/use-cases/saas/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Sell SaaS & Digital Subscriptions on WooCommerce |
| **Primary KW** | sell digital subscriptions wordpress (480/mo, KD 25) |
| **Secondary KWs** | saas pricing page best practices wordpress (260/mo), configure woocommerce subscriptions for saas (170/mo) |
| **Key Features** | Subscription products, feature manager, plan switching, trials, auto-downgrade, analytics |

#### 5.2 Membership Sites — `/use-cases/membership-site/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Build a Complete Membership Site with WooCommerce |
| **Primary KW** | wordpress membership site plugin (2,400/mo, KD 60) |
| **Secondary KWs** | membership website business model (720/mo), how to create a membership site on wordpress (5,400/mo info overlap) |
| **Key Features** | Membership access, content dripping, roles, profile builder, customer portal |

#### 5.3 Subscription Boxes — `/use-cases/subscription-box/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Launch a Subscription Box Business with WooCommerce |
| **Primary KW** | subscription box business wordpress (390/mo, KD 20) |
| **Key Features** | Variable subscriptions, skip/pause, shipping address updates, renewal management |

#### 5.4 Online Courses — `/use-cases/online-courses/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Sell Online Courses with Subscription Access on WooCommerce |
| **Primary KW** | sell online courses subscription wordpress (480/mo, KD 30) |
| **Key Features** | Content dripping, content restriction, membership tiers, feature manager |

#### 5.5 Content Publishers — `/use-cases/content-publishers/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Monetize Your Content with WooCommerce Subscription Paywalls |
| **Primary KW** | monetize wordpress blog subscriptions (390/mo, KD 25) |
| **Secondary KWs** | wordpress paywall plugin, gated content woocommerce |
| **Key Features** | Content restriction, visibility shortcodes, member-only content, drip content |

#### 5.6 Service Businesses — `/use-cases/service-businesses/`

| Attribute | Detail |
|-----------|--------|
| **H1** | Recurring Billing for Service Businesses on WooCommerce |
| **Primary KW** | wordpress recurring revenue plugin (210/mo, KD 20) |
| **Key Features** | Recurring billing, custom checkout fields, profile builder, invoicing |

---

### Tier 6: Blog Content Hub

#### Blog Categories & Article Plan

##### Category A: Tutorials (`/blog/tutorials/`)

| # | Article Title | Primary KW | Vol | KD | Priority |
|---|--------------|------------|-----|-----|----------|
| 1 | How to Add Subscriptions to WooCommerce (Complete Guide) | how to add subscriptions to woocommerce | 1,300 | 45 | P1 |
| 2 | How to Create a Membership Site with WooCommerce | how to create a membership site with woocommerce | 1,600 | 45 | P1 |
| 3 | How to Set Up Recurring Payments in WooCommerce | how to set up recurring payments in woocommerce | 1,300 | 40 | P1 |
| 4 | How to Set Up Stripe Subscriptions in WooCommerce | how to add stripe subscriptions to woocommerce | 720 | 35 | P1 |
| 5 | How to Restrict Content in WooCommerce by Subscription | how to restrict content in wordpress by subscription | 590 | 30 | P2 |
| 6 | How to Add Store Credit to WooCommerce | how to add store credit to woocommerce | 590 | 30 | P2 |
| 7 | How to Customize WooCommerce Checkout Page for Subscriptions | how to customize woocommerce checkout page | 2,400 | 55 | P2 |
| 8 | How to Accept PayPal Recurring Payments in WooCommerce | how to accept paypal recurring payments woocommerce | 390 | 25 | P2 |
| 9 | How to Offer Free Trials for WooCommerce Subscriptions | how to offer free trial woocommerce subscription | 320 | 20 | P2 |
| 10 | How to Let Customers Switch Subscription Plans | how to let customers switch subscription plans woocommerce | 140 | 10 | P3 |
| 11 | How to Pause WooCommerce Subscriptions | how to pause woocommerce subscriptions | 210 | 15 | P3 |
| 12 | How to Use Paddle with WooCommerce Subscriptions | how to use paddle with woocommerce subscriptions | 170 | 10 | P3 |
| 13 | How to Handle Failed Subscription Payments in WooCommerce | how to handle failed subscription payments woocommerce | 260 | 15 | P3 |
| 14 | How to Set Up Content Dripping in WooCommerce | content dripping woocommerce tutorial | 170 | 10 | P3 |
| 15 | How to Calculate MRR for WooCommerce Subscriptions | how to calculate mrr woocommerce subscriptions | 210 | 10 | P3 |
| 16 | How to Set Up WooCommerce Subscriptions in Minutes | how to set up woocommerce subscriptions in minutes | 260 | 15 | P2 |
| 17 | How to Migrate WooCommerce Subscription Settings Between Sites | how to migrate woocommerce subscription settings between sites | 170 | 8 | P3 |
| 18 | WooCommerce Subscription Setup Guide for Beginners | woocommerce subscription plugin setup guide for beginners | 320 | 20 | P2 |

##### Category B: Comparisons (`/blog/comparisons/`)

| # | Article Title | Primary KW | Vol | KD | Priority |
|---|--------------|------------|-----|-----|----------|
| 1 | Best WooCommerce Subscription Plugins Compared (2026) | best woocommerce subscription plugins compared 2026 | 720 | 40 | P1 |
| 2 | Best WooCommerce Membership Plugins Compared (2026) | best woocommerce membership plugins compared 2026 | 480 | 35 | P1 |
| 3 | Best Payment Gateway for WooCommerce Subscriptions | best payment gateway for woocommerce subscriptions | 590 | 35 | P1 |
| 4 | The True Cost of WooCommerce Subscriptions + Memberships | true cost of woocommerce subscriptions plus memberships | 110 | 8 | P2 |
| 5 | Stripe vs PayPal for WooCommerce Recurring Billing | stripe vs paypal for woocommerce recurring billing | 320 | 20 | P2 |
| 6 | Paddle vs Stripe for WooCommerce Subscriptions | paddle vs stripe for woocommerce subscriptions | 140 | 10 | P3 |
| 7 | Membership vs Subscription: Which Business Model to Choose | membership vs subscription which business model to choose | 590 | 25 | P2 |
| 8 | Store Credit vs Refund: Which Is Better for Ecommerce? | store credit vs refund which is better for ecommerce | 320 | 20 | P2 |

##### Category C: Strategy & Thought Leadership (`/blog/strategy/`)

| # | Article Title | Primary KW | Vol | KD | Priority |
|---|--------------|------------|-----|-----|----------|
| 1 | How to Reduce Subscription Churn in WooCommerce | how to reduce subscription churn woocommerce | 320 | 15 | P1 |
| 2 | Why Customers Cancel Subscriptions & How to Stop Them | why customers cancel subscriptions and how to stop them | 480 | 25 | P1 |
| 3 | Subscription Metrics Every Store Should Track | subscription metrics every store should track | 480 | 25 | P1 |
| 4 | Subscription Churn Rate Best Practices for Ecommerce | subscription churn rate best practices ecommerce | 590 | 30 | P2 |
| 5 | Subscription Retention Strategies for WooCommerce | subscription retention strategies for woocommerce | 110 | 8 | P2 |
| 6 | How to Start a Subscription Box Business with WordPress | how to start a subscription box business wordpress | 390 | 20 | P2 |
| 7 | How to Build a Subscription Business with WordPress | how to build a subscription business with wordpress | 1,100 | 35 | P2 |
| 8 | How to Increase Subscription Conversions at WooCommerce Checkout | how to increase subscription conversions woocommerce checkout | 140 | 10 | P3 |

##### Category D: Glossary — GEO/AEO Optimized (`/blog/glossary/`)

| # | Term | Primary KW | Vol | AI Likelihood |
|---|------|------------|-----|---------------|
| 1 | What Is a WooCommerce Subscription? | what is a woocommerce subscription | 1,100 | Very High |
| 2 | What Is MRR (Monthly Recurring Revenue)? | what is mrr monthly recurring revenue | 2,400 | Very High |
| 3 | What Is Churn Rate? | what is churn rate in subscription business | 880 | Very High |
| 4 | What Is a Grace Period for Subscriptions? | what is a grace period for subscriptions | 320 | Very High |
| 5 | Subscription vs Membership: What's the Difference? | subscription vs membership difference | 590 | Very High |
| 6 | What Is Content Dripping? | what is content dripping | 390 | Very High |
| 7 | What Is Prorated Billing? | what is prorated billing for subscriptions | 260 | Very High |
| 8 | What Is a Merchant of Record? | what is merchant of record model | 480 | Very High |
| 9 | How Does Stripe Subscription Billing Work? | how does stripe subscription billing work | 720 | High |
| 10 | What Is SCA (Strong Customer Authentication)? | what is sca strong customer authentication | 390 | Very High |

---

### Tier 7: Trust & Conversion Pages

#### 7.1 Early Access — `/early-access/`
- Optional campaign or promotional landing page
- Not the default CTA destination in the current pricing-first funnel
- Any global/sitewide CTA should still route to `/pricing/`

#### 7.2 Download — `/download/`
- Direct link to WordPress.org listing: `https://wordpress.org/plugins/arraysubs/`
- Feature summary of free tier
- Primary conversion CTA from this page still routes to `/pricing/`

#### 7.3 Pricing — `/pricing/`
- **Phase**: Primary conversion page for the site
- All site CTAs route here
- Pricing page CTA buttons route to placeholder checkout URL: `https://checkout.arraysubs.com/placeholder`
- Includes Free vs Pro pricing table, feature comparison matrix, FAQ about pricing/licensing

#### 7.4 Documentation — External Support Center
- Canonical documentation URL: `https://support.arrayhash.com/arraysubs/`
- Use one unified manual tree in the support center
- Clearly label premium-only topics with visible **Pro** badges/callouts
- No separate on-site `/docs/` section planned for the marketing site

#### 7.5 Changelog — `/changelog/`
- Version history for both Free and Pro
- Builds trust and shows active development

#### 7.6 Support — External Support Center
- Canonical support URL: `https://support.arrayhash.com/arraysubs/`
- Direct support email: `emran@arraysubs.com`
- Documentation and support share the same support center
- No separate on-site `/contact/` or `/support/` page planned for the current marketing site

---

## Internal Linking Strategy

```
                    ┌─────────────┐
                    │  HOMEPAGE   │
                    │   (T1)      │
                    └──────┬──────┘
            ┌──────────────┼───────────────┐
            ▼              ▼               ▼
     ┌──────────┐   ┌──────────┐    ┌──────────┐
     │ FEATURES │   │ COMPARE  │    │ USE CASE │
     │  HUB     │   │  HUB     │    │  HUB     │
     └────┬─────┘   └────┬─────┘    └────┬─────┘
          │               │               │
    ┌─────┼─────┐   ┌─────┼─────┐   ┌─────┼─────┐
    ▼     ▼     ▼   ▼     ▼     ▼   ▼     ▼     ▼
  [T2]  [T2]  [T2] [T3]  [T3]  [T3] [T5] [T5]  [T5]
  Feature pages  │  Comparison    │  Use case pages
          │      │  pages         │        │
          └──────┼────────────────┼────────┘
                 ▼                ▼
          ┌──────────┐    ┌──────────┐
          │   BLOG   │    │ PRICING  │
          │  (T6)    │    │  (T7)    │
          └──────────┘    └──────────┘
```

**Linking Rules:**

| From | To | Relationship |
|------|----|-------------|
| Homepage | All T2 feature pages | Feature grid cards |
| Homepage | Top T3 comparison pages | "vs Competitors" section |
| Homepage | All T5 use case pages | "Use Cases" section |
| Homepage | `/pricing/` | CTA buttons |
| Feature pages (T2) | Related feature pages | "Related Features" sidebar |
| Feature pages (T2) | Related blog tutorials | "Learn More" links |
| Feature pages (T2) | Pricing | CTA buttons |
| Comparison pages (T3) | Feature pages they reference | Feature claims linked |
| Comparison pages (T3) | Pricing | CTA buttons |
| Use case pages (T5) | Relevant feature pages | Feature recommendations |
| Use case pages (T5) | Relevant blog tutorials | "Setup Guide" links |
| Blog articles (T6) | Feature pages | Contextual product mentions |
| Blog articles (T6) | Comparison pages | "How we compare" CTA |
| Blog articles (T6) | Pricing | End-of-article CTA |
| Blog glossary (T6) | Feature pages + related articles | Definition→Product link |
| All pages | Pricing | Sticky header and page-level CTA destination |

---

## GEO/AEO Content Strategy

To rank in AI-generated answers (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude):

### Structure Rules for Every Page

1. **Direct-Answer Opening**: Start key sections with a concise 1-2 sentence answer before expanding
2. **Quotable Statements**: Include standalone sentences with statistics or definitive claims
3. **Structured Data**: Use FAQ schema on every page, HowTo schema on tutorials, Product schema on feature pages
4. **Comparison Tables**: AI systems love structured tables — include at least one per feature/comparison page
5. **Definition Boxes**: "What is X?" callout boxes on feature pages
6. **Numbered Steps**: "How to" sections in numbered list format
7. **Entity Mentions**: Connect to established entities (WooCommerce, Stripe, PayPal, WordPress)
8. **Freshness Signals**: Include "Updated [Month] [Year]" on every page

### GEO Priority Content (Highest AI Citation Potential)

| Content | AI Citation Angle | Target AI |
|---------|------------------|-----------|
| Glossary terms | Direct definitions | All AI systems |
| Comparison tables | Structured feature comparisons | Google AIO, Perplexity |
| "Best plugins" roundups | Listicle with pros/cons | ChatGPT, Perplexity |
| Tutorial step lists | HowTo structured data | Google AIO |
| Retention strategies | Numbered strategy lists | All AI |
| MRR/Churn calculators | Formula + example output | ChatGPT, Claude |
| Gateway comparisons | Capability matrices | Perplexity, Claude |

### Brand Entity Building

1. **Consistent naming**: Always "ArraySubs" (not "Array Subs" or "array-subs")
2. **Brand + category pairing**: "ArraySubs WooCommerce subscription plugin" in meta, headings, image alt
3. **Unique differentiators as quotable phrases**:
   - "The only WooCommerce plugin combining subscriptions, memberships, store credit, retention flows, and analytics"
   - "Replace your entire WooCommerce subscription and membership plugin stack with one free solution"
   - "Built-in retention flow builder — a feature no other WooCommerce subscription plugin offers"

---

## Conversion Architecture

Every page tier has a specific role in the conversion funnel:

```
              AWARENESS                    CONSIDERATION                 DECISION
         ┌─────────────────┐         ┌─────────────────┐         ┌──────────────┐
         │  Blog articles  │         │  Feature pages   │         │   Pricing    │
         │  Glossary terms │ ──────► │  Comparison pgs  │ ──────► │   Download   │
         │  Use case pages │         │  Gateway pages   │         │   Checkout   │
         └─────────────────┘         └─────────────────┘         └──────────────┘
              (T5, T6)                    (T2, T3, T4)                  (T7)
```

### CTA Map

| Page Tier | Primary CTA | Secondary CTA |
|-----------|------------|---------------|
| Homepage | View Pricing | Compare Plans |
| Feature Pages | View Pricing | Compare Plans |
| Comparison Pages | View Pricing | Compare Plans |
| Use Case Pages | View Pricing | Compare Plans |
| Gateway Pages | View Pricing | Compare Plans |
| Blog Tutorials | View Pricing | Compare Plans |
| Blog Comparisons | View Pricing | Compare Plans |
| Blog Strategy | View Pricing | Compare Plans |
| Glossary | View Pricing | Compare Plans |
| Pricing | Continue to Checkout | |

### Email Capture Points (Lead Gen)

| Trigger | Offer | Placement |
|---------|-------|-----------|
| Strategy articles | "Subscription Business Checklist" PDF | In-content + exit intent |
| Comparison articles | "Migration Guide" PDF | Sidebar + end-of-article |
| Tutorial articles | "Quick-Start Configuration" download | In-content callout |
| Pricing page | "Free vs Pro Comparison Sheet" | Below pricing table |

---

## Content Priority & Publication Roadmap

### Phase 1: Foundation (Month 1-2) — 18 pages

Launch all landing pages and core feature pages first. These are the conversion backbone.

| Week | Pages | Type | Combined Est. Volume |
|------|-------|------|---------------------|
| 1 | Homepage, Features Hub, Pricing | T1/T7 | 12,000+ |
| 2 | Subscriptions, Membership, Billing | T2 | 9,500+ |
| 3 | Retention, Customer Portal, Store Credit | T2 | 3,200+ |
| 4 | Checkout Builder, Analytics, Emails | T2 | 3,600+ |
| 5 | Payment Gateways, Easy Setup, Audits, Manage Subs, Profile Builder | T2 | 3,000+ |
| 6 | vs Woo Subs, vs Woo Memberships | T3 | 4,400+ |
| 7 | Stripe, PayPal, Paddle | T4 | 3,300+ |
| 8 | vs YITH, vs WP Swings, Download page | T3/T7 | 800+ |

### Phase 2: Content Authority (Month 3-5) — 18 articles

Publish high-impact tutorials and comparison articles that drive organic traffic.

| Week | Article | Vol |
|------|---------|-----|
| 9 | How to Add Subscriptions to WooCommerce | 1,300 |
| 10 | How to Create a Membership Site with WooCommerce | 1,600 |
| 11 | Best WooCommerce Subscription Plugins Compared 2026 | 720 |
| 12 | How to Set Up Recurring Payments in WooCommerce | 1,300 |
| 13 | How to Reduce Subscription Churn | 320 |
| 14 | How to Set Up Stripe Subscriptions | 720 |
| 15 | Why Customers Cancel & How to Stop Them | 480 |
| 16 | Best Payment Gateway for WooCommerce Subscriptions | 590 |
| 17 | How to Restrict Content by Subscription | 590 |
| 18 | Subscription Metrics Every Store Should Track | 480 |
| 19 | How to Add Store Credit to WooCommerce | 590 |
| 20 | Membership vs Subscription Business Model | 590 |
| 21 | WooCommerce Subscription Setup Guide for Beginners | 320 |
| 22 | How to Set Up Subscriptions in Minutes (Wizard) | 260 |
| 23 | The True Cost of Woo Subscriptions + Memberships | 110 |
| 24 | Best WooCommerce Membership Plugins Compared 2026 | 480 |
| 25 | How to Build a Subscription Business with WordPress | 1,100 |
| 26 | How to Customize WooCommerce Checkout | 2,400 |

### Phase 3: Use Cases + Long-Tail (Month 6-8) — 20+ pages

Use case pages + deep tutorials + glossary.

| Week | Content | Vol |
|------|---------|-----|
| 27 | 6 Use Case Pages (SaaS, Membership, Box, Courses, Publishers, Services) | 4,000+ |
| 28-30 | 10 Glossary Terms (GEO-optimized) | 7,000+ |
| 31-36 | Remaining tutorials (free trials, plan switching, Paddle, failed payments, content dripping, MRR calculation, pause subscriptions, settings migration) | 2,000+ |

### Phase 4: Scale & Refresh (Month 9+)

- Publish remaining comparison pages (SUMO, WPSubscription)
- Add case studies / customer stories
- Refresh all "2026" content annually
- Expand blog with new long-tail topics
- Add video content embedded in tutorials
- A/B test CTAs and landing page elements

---

## Estimated Traffic Potential (at maturity)

| Tier | Pages | Combined KW Volume | Realistic Traffic (10-30% CTR) |
|------|-------|--------------------|-----------------------------|
| T1 Homepage + Hubs | 3 | 15,000/mo | 1,500–4,500/mo |
| T2 Feature Pages | 14 | 22,000/mo | 2,200–6,600/mo |
| T3 Comparison Pages | 7 | 5,400/mo | 800–1,600/mo |
| T4 Gateway Pages | 3 | 3,300/mo | 500–1,000/mo |
| T5 Use Case Pages | 6 | 5,000/mo | 500–1,500/mo |
| T6 Blog Articles | 30+ | 35,000/mo | 3,500–10,500/mo |
| T6 Glossary | 10 | 7,000/mo | 700–2,100/mo |
| T7 Trust Pages | 5 | 1,000/mo | 100–300/mo |
| **Total** | **~68+** | **~93,700/mo** | **~9,800–28,100/mo** |

---

## Key Takeaways

1. **Homepage is the #1 conversion page** — Optimize relentlessly for "woocommerce subscription plugin" cluster
2. **Comparison pages are the #1 quick-win** — Low KD, high commercial intent, 30% one-star reviews on the main competitor
3. **Retention and Store Credit are blue ocean** — Zero direct competition for these keywords
4. **Glossary terms are the #1 GEO play** — High AI citation probability, builds topical authority
5. **"Free" is the #1 differentiator** — Lean into it on every page against the multi-plugin stack competitors require
6. **Easy Setup wizard is a conversion differentiator** — No competitor offers guided setup or settings portability
7. **Use case pages bridge awareness to consideration** — Different buyer personas need different entry points
8. **Internal linking is multiplier** — Every blog article must link to at least 2 feature pages and pricing
