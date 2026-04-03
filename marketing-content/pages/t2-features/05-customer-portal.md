# Page Plan: Customer Portal

> **URL**: `/features/customer-portal/`
> **Tier**: T2 — Feature Detail
> **Priority**: Week 2
> **Ownership**: Core (arraysubs) — free feature; Pro extends with payment method management toggle

---

## SEO Meta

| Field | Value |
|-------|-------|
| **Title Tag** | WooCommerce Subscription Customer Portal — Self-Service Management · ArraySubs |
| **H1** | Give Subscribers a Self-Service Portal to Manage Everything |
| **Meta Description** | Customers can view, pause, resume, cancel, upgrade, change payment methods, and manage their subscriptions — all from their WooCommerce My Account page. Free. |

---

## Target Keywords

| Keyword | Volume | KD | Intent | Type |
|---------|--------|-----|--------|------|
| woocommerce subscription management | 880/mo | 30 | Commercial | Primary |
| woocommerce my account subscriptions | 480/mo | 20 | Commercial | Secondary |
| woocommerce subscription customer portal | 260/mo | 12 | Commercial | Secondary |
| woocommerce self-service subscription | 170/mo | 8 | Commercial | Long-tail |
| woocommerce subscription pause resume | 210/mo | 10 | Commercial | Long-tail |
| manage subscription woocommerce frontend | 140/mo | 8 | Informational | Long-tail |

---

## Content Blocks

### 1. Hero Section
- H1 + subtitle: "Reduce support tickets — let subscribers manage their own plans"
- Screenshot: Customer portal My Account → Subscriptions tab
- CTA: Download Free

### 2. Portal Capabilities
- **View Subscriptions**: List of active, paused, cancelled subscriptions
- **Subscription Details**: Plan name, status, next payment date, billing cycle
- **Status Actions**: Pause, Resume, Cancel (with retention flow intercept)
- **Payment Method Management** (Pro): Update saved payment method
- **Renewal Invoice Access**: View and pay pending renewal invoices
- **Subscription History**: Past payments and status changes
- Visual: Annotated screenshots of each capability

### 3. Actions Available to Customers
Table of actions and when they appear:
| Action | When Available | Status Required |
|--------|---------------|-----------------|
| View Details | Always | Any |
| Pause | Active subscriptions | Active |
| Resume | Paused subscriptions | Paused/On-Hold |
| Cancel | Active/Paused | Active, Paused |
| Pay Invoice | Pending renewal | Any with pending invoice |
| Update Payment | Pro — saved method exists | Active, Paused |

### 4. Integration with WooCommerce My Account
- Adds "Subscriptions" tab to existing My Account page
- Follows WooCommerce design patterns
- Responsive design for mobile
- Works with both classic and block-based My Account
- Visual: My Account navigation showing Subscriptions tab

### 5. Retention Flow Integration
- Cancel action triggers the retention flow (if configured)
- Customer sees offers before completing cancellation
- Link to Retention Flow Builder feature page
- Visual: Screenshot of retention flow appearing after cancel click

### 6. Portal Customization
- WooCommerce template overrides for portal templates
- Action hooks for extending portal functionality
- Shortcode for embedding portal components

### 7. FAQ

| Question | Answer Focus |
|----------|-------------|
| Can customers cancel their own subscriptions? | Yes — with optional retention flow intercept |
| Can customers upgrade or downgrade? | Pause and resume are supported; retention flow offers downgrades |
| Is the customer portal free? | Yes — core portal is free |
| Does it work with block checkout themes? | Yes — compatible with WooCommerce My Account blocks |
| Can I customize what customers see? | Yes — via template overrides and hooks |

---

## GEO / AEO Angles

- **Definitive statement**: "ArraySubs adds a Subscriptions tab to the WooCommerce My Account page where customers can view, pause, resume, cancel, and pay renewal invoices for their subscriptions."
- **Support reduction angle**: "Subscription self-service portals reduce support tickets by 40-60% for common actions like pausing, resuming, and updating payment methods."

---

## Internal Links

| Target | Context |
|--------|---------|
| `/features/retention-flow-builder/` | "Retention flows intercept cancellations →" |
| `/features/subscriptions-and-recurring-products/` | "Create the subscription plans →" |
| `/features/billing-renewals-and-refunds/` | "How renewal invoices work →" |
| `/features/payment-gateways/` | "Supported payment methods →" |
| `/features/profile-builder/` | Pro: "Customize My Account pages →" |
| `/features/` | Breadcrumb |

---

## CTA Strategy

| Position | CTA | Target |
|----------|-----|--------|
| Hero | Download Free | WordPress.org |
| After Capabilities | Empower Your Subscribers | WordPress.org |
| After FAQ | See All Features | `/features/` |
| Sticky Footer | Download Free / View Pricing | WordPress.org / `/pricing/` |
