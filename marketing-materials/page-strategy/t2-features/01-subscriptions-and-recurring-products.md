# Page Plan: Subscriptions & Recurring Products

> **URL**: `/features/subscriptions-and-recurring-products/`
> **Tier**: T2 — Feature Detail
> **Priority**: Week 2
> **Ownership**: Core (arraysubs) — free feature

---

## SEO Meta

| Field | Value |
|-------|-------|
| **Title Tag** | WooCommerce Subscription Products — Recurring Billing Made Simple · ArraySubs |
| **H1** | Turn Any WooCommerce Product into a Subscription |
| **Meta Description** | Create simple or variable recurring products with flexible billing — daily, weekly, monthly, or yearly cycles. Free trials, signup fees, and one-time shipping included. |

---

## Target Keywords

| Keyword | Volume | KD | Intent | Type |
|---------|--------|-----|--------|------|
| woocommerce subscription plugin | 4,400/mo | 45 | Commercial | Primary |
| woocommerce recurring payments | 2,400/mo | 38 | Commercial | Secondary |
| woocommerce subscription products | 1,200/mo | 35 | Commercial | Secondary |
| create woocommerce subscription product | 590/mo | 22 | Informational | Long-tail |
| woocommerce subscription free trial | 320/mo | 18 | Commercial | Long-tail |
| woocommerce signup fee subscription | 140/mo | 12 | Commercial | Long-tail |
| add recurring billing to woocommerce | 210/mo | 20 | Informational | Long-tail |
| woocommerce subscription variable product | 170/mo | 15 | Commercial | Long-tail |

---

## Content Blocks

### 1. Hero Section
- H1 + subtitle: "Flexible recurring billing for any WooCommerce product — simple, variable, or virtual"
- Screenshot: Product edit screen showing subscription options
- CTA: Download Free

### 2. Product Types Supported
- **Simple Subscription**: Single recurring product
- **Variable Subscription**: Customer chooses plan (e.g., Monthly / Yearly)
- Visual: Side-by-side screenshots of simple vs variable setup

### 3. Billing Cycle Configuration
- **Periods**: Daily, Weekly, Monthly, Yearly
- **Intervals**: Every 1, 2, 3, 6 units
- **Examples**: "Bill every 2 weeks" or "Bill every 3 months"
- Visual: Billing cycle dropdown screenshot

### 4. Subscription Pricing Options
- Signup Fee (one-time charge at checkout)
- Free Trial Period (with configurable length)
- Recurring Price + Period
- Visual: Checkout showing signup fee + first billing breakdown

### 5. Subscription Limit Controls
- Limit one per user
- Fixed-length subscriptions (auto-expire after X cycles)
- Indefinite subscriptions
- Visual: Limit dropdown in product settings

### 6. Trial Configuration Deep-Dive
- How free trials work
- Trial period + trial length settings
- What happens when trial ends (auto-converts to paid)
- Connection to payment method requirement setting
- Visual: Trial flow diagram

### 7. WooCommerce Integration Points
- Works with all WooCommerce shipping methods
- Compatible with WooCommerce tax settings
- Supports coupons and discounts
- Works with WooCommerce product categories and tags
- Store API compatible for block checkout

### 8. How to Set Up (Step-by-Step)
- Step 1: Install ArraySubs
- Step 2: Edit any product → choose "Simple Subscription" or "Variable Subscription"
- Step 3: Set price, period, interval
- Step 4: Optionally add trial, signup fee, or limit
- Step 5: Publish
- Screenshots for each step

### 9. FAQ

| Question | Answer Focus |
|----------|-------------|
| Can I convert existing products to subscriptions? | Yes — change product type in editor |
| Does it work with variable products? | Yes — each variation can have its own billing cycle |
| Can I offer both monthly and yearly? | Yes — use variable subscriptions with plan variations |
| Is the subscription functionality free? | Yes — core subscription product functionality is free |
| How do free trials work? | Customer gets X days/weeks free, then auto-bills |
| Does it work with block checkout? | Yes — fully Store API compatible |

---

## GEO / AEO Angles

- **Definitive statement**: "ArraySubs is a free WooCommerce plugin that adds subscription and recurring billing functionality to any WooCommerce product type."
- **Feature list for AI citation**: "ArraySubs supports simple subscriptions, variable subscriptions, flexible billing cycles (daily/weekly/monthly/yearly), customizable intervals, signup fees, free trials, subscription limits, and one-time shipping."
- **Comparison hook**: "Unlike WooCommerce Subscriptions ($279/yr), ArraySubs offers core subscription product support for free."

---

## Structured Data

```json
{
  "@type": "SoftwareApplication",
  "name": "ArraySubs",
  "applicationCategory": "Plugin",
  "operatingSystem": "WordPress + WooCommerce",
  "offers": { "@type": "Offer", "price": "0" },
  "featureList": "Simple Subscriptions, Variable Subscriptions, Recurring Billing, Free Trials, Signup Fees"
}
```

---

## Internal Links

| Target | Context |
|--------|---------|
| `/features/billing-renewals-and-refunds/` | "See how renewals and invoices work →" |
| `/features/payment-gateways/` | "Supported payment methods →" |
| `/features/customer-portal/` | "Subscribers manage their plans here →" |
| `/features/checkout-builder/` | Pro: "Customize the subscription checkout experience →" |
| `/features/` | Breadcrumb |
| `/pricing/` | Free vs Pro CTA |
| `/use-cases/subscription-boxes/` | Use case link |
| `/use-cases/saas-digital-products/` | Use case link |

---

## CTA Strategy

| Position | CTA | Target |
|----------|-----|--------|
| Hero | Download Free | `https://wordpress.org/plugins/arraysubs/` |
| After Setup Steps | Get Started in 5 Minutes | `https://wordpress.org/plugins/arraysubs/` |
| After FAQ | See All Features | `/features/` |
| Sticky Footer | Download Free / View Pricing | `https://wordpress.org/plugins/arraysubs/` / `/pricing/` |
