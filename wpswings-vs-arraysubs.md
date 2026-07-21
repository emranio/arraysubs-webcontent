# WP Swings *Subscriptions for WooCommerce Pro* vs. ArraySubs (Free + Pro)

**Purpose:** Competitive feature comparison and — the headline deliverable — a **complete list of features WP Swings has that ArraySubs (free core + Pro) is currently missing or only partially covers.**

**Compared products**
- **Them:** WP Swings — *Subscriptions for WooCommerce Pro* v2.7.0 (last updated Jun 22, 2026). $129/yr (1 site). Free version: *Subscriptions for WooCommerce* on wordpress.org.
- **Us:** ArraySubs (free) v1.8.11 + ArraySubsPro v1.1.2.

**Sources:** WP Swings product page (full text), [wordpress.org free listing](https://wordpress.org/plugins/subscriptions-for-woocommerce/), [WP Swings docs](https://docs.wpswings.com/subscriptions-for-woocommerce/), third-party reviews ([wployalty](https://wployalty.net/best-woocommerce-subscription-plugins/)), plus a code-level audit of `arraysubs/src` and `arraysubspro/src`.

**Verdict at a glance:** ArraySubs is broader and deeper on *membership/content-restriction, retention, customer self-service, checkout building, and store operations*. WP Swings leads in exactly five areas: **(1) AI features, (2) the Subscription Box product builder, (3) breadth of payment gateways, (4) named third-party plugin integrations, and (5) marketed WPML/multisite/mobile-API compatibility.** Those five areas are the entirety of the real gap.

---

## 🔴 MISSING FEATURES — the complete gap list

Legend: **❌ Missing** = no equivalent in ArraySubs free or Pro. **⚠️ Partial** = we have something adjacent but not what WP Swings markets.

### A. AI features (highest-visibility gap — WP Swings' current flagship differentiators)

| # | WP Swings feature | Status | Notes |
|---|---|---|---|
| 1 | **AI Revenue Forecasting** — predicts monthly/annual recurring revenue with risk, growth-opportunity, and assumption insights + visual charts | ❌ Missing | We have MRR/ARR reporting but no *predictive* forecast. |
| 2 | **AI Churn Prediction Score** — flags subscriptions at high risk of cancellation, explains likely reasons, recommends retention actions | ❌ Missing | We have *reactive* Retention Analytics (why people cancelled), not *predictive* per-subscription scoring. |
| 3 | **AI Subscription Health Dashboard Widget** — at-a-glance AI insights on subscription status (shipped in their **free** version) | ❌ Missing | No AI health widget on our dashboard. |

### B. Subscription Box builder

| # | WP Swings feature | Status | Notes |
|---|---|---|---|
| 4 | **Subscription Box** — customer handpicks their own products into a curated recurring box, with **dynamic box pricing** and scheduled delivery | ❌ Missing | We sell simple/variable subscription products, but there is no customer-facing "build-a-box" product type. This is their most-marketed standout feature. |

### C. Payment gateways for automatic recurring billing

ArraySubs Pro automates **Stripe, PayPal, and Paddle only** (confirmed in `arraysubspro/src/Features/AutomaticPayments/Gateways/`). WP Swings advertises a much wider recurring-capable gateway list:

| # | Gateway WP Swings supports | Status |
|---|---|---|
| 5 | **Mollie Payments** | ❌ Missing |
| 6 | **Authorize.Net** (AIM/legacy) | ❌ Missing |
| 7 | **Braintree** (credit card) | ❌ Missing |
| 8 | **WooCommerce Eway** | ❌ Missing |
| 9 | **PayHere** | ❌ Missing |
| 10 | **MultiSafepay** | ❌ Missing |
| 11 | **PayFast** | ❌ Missing |
| 12 | **Amazon Pay** | ❌ Missing |
| 13 | **WooCommerce Payments** (Credit/Debit) | ❌ Missing |
| 14 | **SEPA Direct Debit** (via Stripe) | ⚠️ Partial | Stripe is integrated; SEPA isn't explicitly surfaced. |

> Note in our favor: **ArraySubs supports Paddle, which WP Swings does not.** For manual renewals, our free core also works with the *entire* WooCommerce gateway ecosystem (incl. offline BACS/COD/cheque).

### D. Named third-party plugin integrations (WP Swings markets these compatibilities; we ship self-contained equivalents but don't integrate/advertise them)

| # | WP Swings compatibility | Status | Notes |
|---|---|---|---|
| 15 | **LearnPress** (course enrolment via subscription) | ❌ Missing | We restrict content generically but have no LMS-specific enrolment hook. |
| 16 | **Affiliate / Affiliates Manager** | ❌ Missing | |
| 17 | **WooCommerce Product Bundles** (subscribe to bundles) | ❌ Missing | |
| 18 | **CartFlows** (Checkout & Funnel Builder) | ❌ Missing | We have our own Checkout Page Builder instead. |
| 19 | **Points and Rewards for WooCommerce** | ❌ Missing | |
| 20 | **Ultimate Gift Cards for WooCommerce** | ❌ Missing | |
| 21 | **PDF Generator for WordPress Pro** | ❌ Missing | |
| 22 | **WCFM Frontend Manager** (multi-vendor) | ❌ Missing | |
| 23 | **Wallet System for WooCommerce** | ⚠️ Partial | We ship our own **Store Credit** wallet instead of integrating theirs. |
| 24 | **Membership for WooCommerce** | ⚠️ Partial | We ship our own membership/access engine instead of integrating theirs. |

### E. Platform / compatibility positioning

| # | WP Swings feature | Status | Notes |
|---|---|---|---|
| 25 | **WPML multilingual compatibility** | ❌ Missing | No WPML/Polylang integration in source. |
| 26 | **Multisite compatibility** (marketed & tested) | ⚠️ Partial | Only incidental multisite awareness in code (super-admin checks, `get_current_blog_id`); not positioned or tested as a feature. |
| 27 | **REST API for subscription data + "API for Mobile App"** | ⚠️ Partial | We register an internal `arraysubs/v1` REST namespace, but it isn't documented/positioned as a public data/mobile API. |
| 28 | **Shortcode to display a subscriptions table** on any page | ❌ Missing | Our shortcodes cover restriction/login/user/visibility/buy-credits, but not a subscriptions-table render. |

### F. Admin / billing mechanics (small, genuine differences)

| # | WP Swings feature | Status | Notes |
|---|---|---|---|
| 29 | **Admin can change/extend the next payment date manually** | ⚠️ Partial | We deliberately removed manual next-date editing (v1.7.6) and auto-calculate it from the schedule. WP Swings exposes manual editing + "extend next payment date for prorated amount." |
| 30 | **Manage proration amount as wallet credit** — route the upgrade/downgrade proration difference into store credit | ⚠️ Partial | We have Store Credit and refund-to-credit, but proration-difference → credit isn't a wired path. |
| 31 | **Custom teaser templates** for restricted content (per-content preview) | ⚠️ Partial | We show access-denied messages / partial restriction, but not configurable per-content "teaser" templates. |
| 32 | **Time-limited cancellation window** (allow cancel only within N days) | ⚠️ Partial | We have cancellation on/off + retention flow, but not a day-bounded cancellation window. |

---

## 🟢 Where ArraySubs is AHEAD (so the comparison is honest — do not "fix" by copying WP Swings)

These are ours to keep marketing; WP Swings has no equivalent:

- **Retention Flow Builder** (3-step save flow: reason capture → targeted offer → confirm) with **4 offer types** (discount / pause / downgrade / contact support) + **Retention Analytics** (saved revenue, product churn, offer acceptance).
- **Deep content restriction**: URL rules (exact/prefix/contains/**regex**), **Elementor container** restriction, **content dripping**, downloadable-file gating, lifetime-spend & nested AND/OR conditions — far beyond WP Swings' access rules.
- **Skip Next Renewal** (WP Swings has no skip), **2-phase grace period**, **auto-downgrade fallback** on failure, **trial conversion** flow.
- **Flexible Renewal Sync** (full / prorated / next-cycle first charge) and **Flexible Subscriptions** (customer chooses their own length + billing period).
- **Store operations toolkit**: Easy Setup wizard (9-step, import/export), **Checkout Page Builder**, **My Account Page Builder**, **Profile Builder**, **Feature Manager** (per-plan entitlements), **Login as User**, admin-bar/login-page controls, **Gateway Health**, **Activity Audits**, **scheduled-job logs**.
- **Export to CSV *and* JSON** (WP Swings is CSV only); richer notes/timeline.
- **Block checkout (Store API)** first-class support; **Paddle** gateway (merchant-of-record VAT).
- **Membership + subscriptions + retention + store credit unified in one plugin** — WP Swings leans on separate WP Swings add-ons (Membership for WooCommerce, Wallet System) for parity.

---

## 📊 Full side-by-side (category summary)

| Category | WP Swings Pro | ArraySubs Free+Pro | Winner |
|---|---|---|---|
| Simple / variable / virtual / downloadable subs | ✅ (variable is Pro) | ✅ (variable in **free**) | ArraySubs |
| Free trial / signup fee / expiry / one-time | ✅ | ✅ (+ Lifetime Deal, intro pricing) | ArraySubs |
| **Subscription Box (build-a-box)** | ✅ | ❌ | **WP Swings** |
| Automatic recurring billing | ✅ (many gateways) | ✅ (Stripe/PayPal/Paddle) | WP Swings (breadth) |
| Manual renewal invoices | ✅ | ✅ (whole Woo gateway set) | Tie |
| Failed-payment retry + threshold | ✅ | ✅ | Tie |
| Pause / Resume | ✅ | ✅ (+ Vacation, + **Skip**) | ArraySubs |
| Upgrade / downgrade + proration | ✅ | ✅ (3 proration methods, crossgrade) | Tie/ArraySubs |
| Update payment card (Stripe) | ✅ | ✅ | Tie |
| Renewal date sync | ✅ | ✅ (Flexible Renewal Sync) | Tie |
| Customer portal (My Account) | ✅ | ✅ (richer) | ArraySubs |
| Admin-created subscriptions | ✅ | ✅ | Tie |
| Change next payment date (admin) | ✅ | ⚠️ auto-only | WP Swings |
| Coupons (signup/recurring, flat/%) | ✅ | ✅ (+ cycle limits) | ArraySubs |
| Emails (cancel/expire/pause/resume/reminders/invoice) | ✅ | ✅ (+ retention/store-credit) | ArraySubs |
| Reports (sales, churn, ARR, top products) | ✅ | ✅ (Reports Hub + Woo Analytics) | Tie |
| **AI forecasting / churn / health widget** | ✅ | ❌ | **WP Swings** |
| Membership & content restriction | ✅ (+ Gutenberg, roles) | ✅ (+ Elementor, URL regex, dripping, downloads) | ArraySubs |
| Member discounts | ✅ | ✅ | Tie |
| Retention save-flow & analytics | ❌ | ✅ | ArraySubs |
| Store credit / wallet | via add-on | ✅ built-in | ArraySubs |
| Checkout / My-Account / Profile builders | ❌ | ✅ | ArraySubs |
| Export | CSV | CSV + JSON | ArraySubs |
| HPOS | ✅ | ✅ | Tie |
| **WPML** | ✅ | ❌ | **WP Swings** |
| **Multisite (marketed)** | ✅ | ⚠️ incidental | WP Swings |
| **REST/Mobile-app API (public)** | ✅ | ⚠️ internal only | WP Swings |
| **Subscription-table shortcode** | ✅ | ❌ | WP Swings |
| **Named 3rd-party integrations** (LearnPress, CartFlows, Bundles, Points&Rewards, Gift Cards, PDF Gen, WCFM, Affiliates) | ✅ | ❌ | **WP Swings** |

---

## ✅ Recommended priority if closing the gap

1. **AI Revenue Forecasting + Churn Prediction + Health widget** (#1–3) — their current headline; highest marketing impact, and you already hold the underlying MRR/churn/retention data to power it.
2. **Subscription Box builder** (#4) — a distinct product type + selling motion they lead on.
3. **Gateway breadth** (#5–14) — Authorize.Net, Mollie, Braintree first (most-requested recurring gateways).
4. **Named integrations** (#15–24) — LearnPress, Product Bundles, CartFlows, Points & Rewards deliver marketplace "compatible with" badges cheaply.
5. **Compatibility positioning** (#25–28) — WPML, marketed multisite, a documented public/mobile REST API, and a subscriptions-table shortcode.
6. **Billing mechanics** (#29–32) — manual next-date edit, proration→credit, teaser templates, cancellation window.

*Items #1–4 and #15–22 are true feature gaps. Items #23–24, #26–27, #29–32 are positioning/partial gaps where ArraySubs already ships an adjacent or superior capability.*
