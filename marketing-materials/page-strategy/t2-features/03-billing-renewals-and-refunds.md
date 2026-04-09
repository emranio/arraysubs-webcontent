# Page Plan: Billing, Renewals & Refunds

> **URL**: `/features/billing-renewals-and-refunds/`
> **Tier**: T2 — Feature Detail
> **Priority**: Week 2
> **Ownership**: Core (arraysubs) — renewal engine, invoicing, grace periods; Pro — Automatic Payments

---

## SEO Meta

| Field | Value |
|-------|-------|
| **Title Tag** | WooCommerce Subscription Billing & Renewal Management · ArraySubs |
| **H1** | Automated Billing, Smart Renewals & Flexible Refund Policies |
| **Meta Description** | Automated renewal invoicing, configurable grace periods, two-phase overdue handling, refund policies (full, partial, prorated, store credit), and retry-on-failure — all built in. |

---

## Target Keywords

| Keyword | Volume | KD | Intent | Type |
|---------|--------|-----|--------|------|
| woocommerce recurring payments | 2,400/mo | 38 | Commercial | Primary |
| woocommerce subscription renewal | 720/mo | 25 | Commercial | Secondary |
| woocommerce subscription billing | 590/mo | 22 | Commercial | Secondary |
| woocommerce subscription refund | 320/mo | 15 | Informational | Long-tail |
| woocommerce grace period subscription | 170/mo | 8 | Informational | Long-tail |
| woocommerce automatic renewal payment | 260/mo | 20 | Commercial | Long-tail |
| woocommerce subscription invoice | 210/mo | 12 | Informational | Long-tail |

---

## Content Blocks

### 1. Hero Section
- H1 + subtitle: "Billing that runs itself — so you focus on growing"
- Visual: Billing lifecycle timeline graphic
- CTA: Download Free

### 2. Renewal Engine Overview
- Automatic invoice generation before due date (configurable hours)
- Renewal order creation linked to parent subscription
- Payment processing: manual invoice or automatic charge (Pro)
- Visual: Renewal flow diagram

### 3. Two-Phase Grace Period System
- **Phase 1 — Active Grace**: Subscription stays ACTIVE for X days after due date (default: 3)
- **Phase 2 — On-Hold Grace**: Moves to ON-HOLD for Y days (default: 7)
- **Cancellation**: Auto-cancels after total grace window
- **Payment at any time**: Paying the invoice at any point reactivates
- Visual: Timeline graphic showing phases

```
Payment Due → [Active 3 days] → [On-Hold 7 days] → Cancelled
                    ↑ Pay here = stays active
                                     ↑ Pay here = reactivates
```

### 4. Refund Policies
- **Full Refund**: Complete amount returned
- **Partial Refund**: Custom amount
- **Prorated Refund**: Based on remaining days in cycle
- **Store Credit Refund** (Pro): Convert to store credit balance
- **No Refund**: Configurable per-product or global
- Visual: Refund settings screenshot

### 5. Invoice System
- Renewal orders = WooCommerce orders (full compatibility)
- Pay-now links in emails and customer portal
- Invoice status tracking
- Linked to parent subscription for easy navigation

### 6. Payment Retry (Pro)
- Automatic retry on failed payments
- Configurable retry schedule
- Exponential backoff support
- Email notifications on each retry attempt

### 7. Automatic Payments (Pro Badge)
- Auto-charge saved payment methods on renewal
- Supported gateways: Stripe, PayPal (tokenized)
- Customer toggle: enable/disable auto-renew from portal
- Fallback to manual invoice when auto-renew is off

### 8. Billing Settings
- Hours before due date to generate invoice
- Grace days before on-hold
- Grace days before cancellation
- Default refund policy
- Per-product overrides

### 9. FAQ

| Question | Answer Focus |
|----------|-------------|
| How does renewal billing work? | Invoice generated before due date → payment collected → next renewal scheduled |
| What happens if payment fails? | Grace period keeps subscription active; optional auto-retry (Pro) |
| Can I offer prorated refunds? | Yes — calculated based on remaining cycle days |
| Is automatic billing free? | Manual invoicing is free; automatic card-on-file charging is Pro |
| How do grace periods work? | Two phases: Active grace → On-Hold grace → Cancel |

---

## GEO / AEO Angles

- **Definitive statement**: "ArraySubs uses a two-phase grace period system: subscriptions stay active for a configurable number of days after a missed payment, then move to on-hold before cancellation, giving customers maximum opportunity to pay."
- **Differentiator**: "ArraySubs separates invoice creation from payment processing, allowing both manual and automatic billing models from one unified system."

---

## Internal Links

| Target | Context |
|--------|---------|
| `/features/subscriptions-and-recurring-products/` | "Create subscription products →" |
| `/features/payment-gateways/` | "Supported payment methods →" |
| `/features/store-credit/` | Pro: "Refund to store credit →" |
| `/features/emails/` | "Renewal reminder emails →" |
| `/features/customer-portal/` | "Subscribers pay invoices here →" |
| `/features/retention-flow-builder/` | "Prevent cancellations before they happen →" |
| `/features/` | Breadcrumb |
| `/pricing/` | Pro features CTA |

---

## CTA Strategy

| Position | CTA | Target |
|----------|-----|--------|
| Hero | Download Free | WordPress.org |
| After Grace Period | Set Up Smart Billing | WordPress.org |
| Automatic Payments | Unlock Auto-Renewals | `/pricing/` |
| Sticky Footer | Download Free / View Pro | WordPress.org / `/pricing/` |
