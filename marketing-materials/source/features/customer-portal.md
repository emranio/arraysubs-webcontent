# Self-Managed Customer Portal

> A full-featured subscription management portal inside WooCommerce My Account — customers can view, change, skip, pause, cancel, and reactivate their subscriptions without contacting support.

**Tier**: Free (Subscription List, Detail Page, Self-Service Actions) + Pro (Payment & Shipping Management, My Features, Store Credit)

---

## My Subscriptions List (Free)

The subscription list page appears as a tab in the WooCommerce My Account area. Every customer sees their subscriptions at a glance.

### 6 Columns

| Column | Description |
|--------|-------------|
| Status | Color-coded badge (Active = green, Trial = blue, On-Hold = yellow, Cancelled = red, Expired = gray, Pending = orange) |
| Subscription | Subscription ID + product name |
| Recurring Amount | Price per billing cycle, with active discount or coupon reflected |
| Next Payment Date | When the next payment is due |
| Start Date | When the subscription was created |
| Actions | View Details button linking to the detail page |

### Navigation

- **10 subscriptions per page** with pagination
- Each row links to the full subscription detail page

---

## View Subscription Detail Page (Free)

The detail page gives customers complete visibility into a single subscription.

### 9-Row Overview Table

| Row | What It Shows |
|-----|---------------|
| Status | Current subscription status with color badge |
| Product | Subscription product name |
| Recurring Amount | Price per cycle — if a retention discount is active, shows the original amount, discount, and final amount |
| Billing Cycle | Period and interval (e.g., "Every 1 month") |
| Start Date | When the subscription started |
| End Date | When the subscription will expire (if applicable) |
| Next Payment Date | When the next payment is scheduled |
| Trial End Date | When the trial period ends (if applicable) |
| Last Updated | Timestamp of the most recent change |

### Related Orders

A table of all WooCommerce orders linked to this subscription:

- Original purchase order
- Renewal orders
- Plan switch orders
- **Pay link** for pending invoices — customers can click to pay an outstanding renewal invoice directly

### Refund History

List of all refunds associated with the subscription, showing:

- Refund date
- Refund amount

### Subscription Notes Timeline

Chronological notes with author badges:

| Author Badge | Source |
|-------------|--------|
| Customer | Actions taken by the customer (cancel, pause, skip) |
| Admin | Actions taken by store administrators |
| System | Automated events (renewal, trial conversion, expiration) |
| Gateway | Payment gateway events (payment confirmed, dispute opened) |

---

## Self-Service Actions (Free + Pro)

Customers can manage their subscriptions directly from the portal without contacting support.

### Cancel Subscription (Free)

- **Immediate cancellation** or **end-of-period cancellation** (based on store settings)
- Modal with reason selector shows configurable cancellation reasons
- Before cancellation completes, retention offers are displayed (see Retention Flow Builder)

### Undo Scheduled Cancellation (Free)

- When a subscription is set to cancel at the end of the period, a **"Keep My Subscription"** button appears
- Clicking it reverts the pending cancellation and returns the subscription to active

### Retention Offers (Free)

During the cancellation flow, 4 types of retention offers can appear:

| Offer Type | What It Does |
|-----------|-------------|
| Discount | Percentage off for a configurable number of renewal cycles |
| Pause | Temporary pause with automatic resume after a set duration |
| Downgrade | Switch to a cheaper plan (redirects to the plan switching flow) |
| Contact Support | Links to a configurable support page or chat |

Offers are targeted by cancellation reason — different reasons can trigger different offers.

### Change Plan (Free)

- **Modal interface** with three tabs: Upgrade, Downgrade, Crossgrade
- Each tab shows the available target products with pricing
- **Proration preview** — before confirming, the customer sees exactly how much they'll be charged or credited
- Plan switching follows the store's configured proration method

### Skip Next Renewal (Free)

- **Skip button** on subscriptions with upcoming renewals
- Configurable maximum consecutive skips (default: 3)
- **Cutoff enforcement** — cannot skip within a configurable number of days before the renewal date (default: 2 days)
- **Undo skip** — reverse the skip at any time before the skipped cycle
- **Modify skip count** — change how many cycles to skip after the initial skip

### Pause / Vacation Mode (Free)

- **Pause button** with duration input
- Configurable maximum pause duration (default: 30 days)
- Maximum pauses per subscription (default: 2)
- **Cooldown period** — minimum 30 days between pauses
- Subscription auto-resumes after the pause duration

### Reactivate (Free)

- **Reactivate button** appears on cancelled and expired subscriptions
- Returns the subscription to active status
- Re-enables billing and access

---

## Payment & Shipping (Pro)

Automatic payment subscribers can manage their payment method and shipping details.

### Card on File Details

The subscription detail page shows the stored payment method:

- Card brand (Visa, Mastercard, Amex, etc.)
- Last 4 digits
- Expiry date

### Auto-Renew Toggle

- **Toggle switch** to enable or disable automatic billing
- When disabled, the subscription switches to manual invoice collection
- When re-enabled, the stored payment method is used again
- Available only when a gateway is connected and the subscription is in an eligible status

### Update Payment Method

Gateway-specific flow for updating the stored card or payment method:

| Gateway | Update Flow |
|---------|------------|
| Stripe | Stripe Elements form appears in-page — enter new card details, 3D Secure if required |
| PayPal | Redirect to PayPal to create a new Billing Agreement |
| Paddle | Redirect to Paddle to re-authorize payment |

### Update Shipping Address

- Editable shipping address form on the subscription detail page
- **3-day cutoff** — address changes are blocked within 3 days of the next renewal date to prevent shipping conflicts
- Updated address is used on all future renewal orders

---

## My Features Page (Pro)

When the Feature Manager module is active, a **My Features** menu item appears in My Account.

### What It Shows

- **Per-subscription view** — features granted by each individual subscription
- **Combined view** — aggregated features across all active subscriptions
- **Feature aggregation modes**: Union (any active subscription grants the feature) or Intersection (all subscriptions must grant it)

### Feature Details

Each feature entry shows:

- Feature name
- Feature type (toggle, number, text)
- Feature value
- Usage tracking (if applicable)

---

## Store Credit Page (Pro)

When Store Credit is enabled, a **Store Credit** menu item appears in My Account.

### Page Sections

| Section | Description |
|---------|-------------|
| Current Balance | Total available store credit |
| Credits Expiring Soon | Credits that will expire within the next 30 days |
| Purchase Credits | Embedded `[arraysubs_buy_credits]` form for buying more credit |
| Transaction History | Full log of all credit additions and deductions |

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| My Subscriptions List | ✅ | ✅ |
| View Subscription Detail (overview, orders, notes) | ✅ | ✅ |
| Cancel Subscription | ✅ | ✅ |
| Undo Scheduled Cancellation | ✅ | ✅ |
| Retention Offers (Discount, Pause, Downgrade, Support) | ✅ | ✅ |
| Change Plan (Upgrade / Downgrade / Crossgrade) | ✅ | ✅ |
| Skip Next Renewal (with undo / modify) | ✅ | ✅ |
| Pause / Vacation Mode | ✅ | ✅ |
| Reactivate Subscription | ✅ | ✅ |
| Card on File Details | — | ✅ |
| Auto-Renew Toggle | — | ✅ |
| Update Payment Method | — | ✅ |
| Update Shipping Address | — | ✅ |
| My Features Page | — | ✅ |
| Store Credit Page | — | ✅ |
