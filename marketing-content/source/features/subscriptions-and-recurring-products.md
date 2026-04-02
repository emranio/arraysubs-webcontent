# Subscriptions & Recurring Products

> Turn any WooCommerce product into a recurring subscription — with flexible billing, trials, sign-up fees, plan switching, auto-downgrade, fixed-period memberships, coupon integration, and full product lifecycle tracking.

**Tier**: Free (Core Products, Plan Switching, Coupons, Lifecycle) + Pro (Auto-Downgrade, Fixed Period Membership, Redirect, Feature Manager, Shipping)

---

## Simple Subscription Products (Free)

Any WooCommerce simple product can become a subscription by enabling the Subscription tab in the product editor.

### Billing Configuration

| Setting | Options | Description |
|---------|---------|-------------|
| Billing Period | Daily, Weekly, Monthly, Yearly, Custom Days | How often the customer is charged |
| Billing Interval | 1-12 | Multiple of the billing period (e.g., every 2 months) |
| Subscription Length | 0-365 periods | How many billing periods before automatic expiration. **0 = unlimited / lifetime** — the subscription never expires |
| Free Trial | Configurable days | Number of days before the first payment |
| Sign-up Fee | One-time amount | Charged at checkout alongside the first billing (or trial) |
| Different Renewal Price | Separate recurring amount | Override the recurring price after the initial payment |

### Price Locking

Product prices are locked at the time of purchase. If a store owner changes the product price later, existing subscriptions continue at the original price. Only new subscriptions use the updated price.

---

## Variable Subscription Products (Free)

Variable products support per-variation subscription configuration.

### Setup

1. Enable the "Subscription product" checkbox on the parent product
2. The subscription tab appears on every variation
3. Each variation gets independent configuration

### Per-Variation Configuration

Every variation can have its own:

- Billing period and interval
- Subscription length
- Free trial duration
- Sign-up fee
- Different renewal price
- Pricing

This enables tiered subscription products — for example, a "Basic" variation at $9/month and a "Premium" variation at $29/month with different trial periods.

---

## Plan Switching (Free)

Customers can upgrade, downgrade, or crossgrade between subscription products.

### Configuration (Linked Products Tab)

| Field | Description |
|-------|-------------|
| Upgrade To | Products the customer can upgrade to |
| Downgrade To | Products the customer can downgrade to |
| Crossgrade To | Products the customer can crossgrade to (similar value) |
| Auto-Downgrade To | Product for automatic downgrades on expire/cancel/trial end (Pro) |

### Direction Classification

Plan direction is determined by a normalized daily rate comparison with a 5% tolerance:

- If the new daily rate is more than 5% higher → **Upgrade**
- If the new daily rate is more than 5% lower → **Downgrade**
- If the difference is within 5% → **Crossgrade**

### 3 Proration Methods

| Method | Description |
|--------|-------------|
| Prorate Immediately | Calculate remaining value of current plan, charge or credit the difference immediately |
| Apply at Renewal | Adjust the first renewal amount after the switch to account for the difference |
| No Proration | No adjustment — customer pays the new price starting from the next renewal |

### Additional Settings

| Setting | Description |
|---------|-------------|
| Switch Fees | Per-direction fees (upgrade fee, downgrade fee, crossgrade fee) |
| Rounding Methods | Configurable rounding for proration calculations |

### Customer Portal Flow

In the customer portal, the "Change Plan" button opens a modal with three tabs:

- **Upgrade** — available upgrade products with pricing
- **Downgrade** — available downgrade products with pricing
- **Crossgrade** — available crossgrade products with pricing

Each option shows a proration preview before the customer confirms.

---

## Auto-Downgrade (Pro)

Automatically switch a customer to a cheaper plan instead of cancelling their subscription.

### 3 Timing Options

| Trigger | Description |
|---------|-------------|
| On Expire | When the subscription reaches its end date |
| On Cancel | When the subscription is cancelled (by customer or system) |
| On Trial Expire | When a trial period ends without payment |

### Behavior

- Reuses the existing subscription — does not create a new one
- Updates the product, pricing, and billing configuration in place
- Email suppression during auto-downgrade prevents double notifications (only the Auto-Downgrade email is sent)
- Configured via the **Linked Products** tab → "Auto-downgrade to" field

---

## Fixed Period Membership (Pro)

Time-boxed memberships with absolute date boundaries and enrollment windows.

### Configuration

| Setting | Description |
|---------|-------------|
| End Date | Absolute date end or recurring annual cutoff |
| Enrollment Window | Open and close dates limiting when customers can purchase |
| Period End Behavior | Expire (subscription ends) or Renew (subscription renews for the next period) |

### Key Behaviors

| Behavior | Description |
|----------|-------------|
| Invoice Blocking | Renewal invoices are blocked past the end date |
| Variation Support | Variations inherit product-level settings if not explicitly set |
| Frontend Display | Remaining days and membership period shown on the product page and portal |

---

## Product Experience & Frontend Display (Free + Pro)

### Pricing Display (Free)

Subscription pricing appears everywhere in the WooCommerce flow:

- Product page
- Cart
- Mini-cart
- Checkout
- Order confirmation

Fully formatted recurring price strings include trial info, sign-up fee, and billing cycle.

### Redirect Product Page (Pro)

| Setting | Description |
|---------|-------------|
| 301 Redirect | Redirect the WooCommerce product page to a selected WordPress page |
| 404 | Return a 404 Not Found instead of showing the product page |
| SEO Integration | Works with Yoast and Rank Math canonical management |

Direct add-to-cart requests, backend operations, and REST API responses continue to work regardless of the redirect setting.

### Feature Manager (Pro)

Define features that are included with a subscription product:

| Setting | Description |
|---------|-------------|
| Feature Types | Toggle (on/off), Number (numeric value), Text (string value) |
| Feature Templates | Reusable feature sets for consistent product configuration |
| Storefront Display | "What's Included" summary on the product page |
| My Features Page | Customer portal page showing all entitled features |

### Subscription Shipping (Pro)

| Setting | Description |
|---------|-------------|
| Shipping Type | Recurring (charged every billing cycle) or One-Time (charged at checkout only) |
| Initial Shipping | Override shipping cost for the first order |
| Renewal Shipping | Override shipping cost for renewal orders |
| Cart Display | Shipping type shown in cart alongside the product |
| Plan Switch | Shipping address inherited when switching plans |

---

## Coupon Integration (Free)

WooCommerce coupons fully support subscription products.

### Coupon Configuration

| Setting | Description |
|---------|-------------|
| Apply to Subscriptions | Checkbox on WooCommerce coupons to enable subscription support |
| Duration | One-time (initial purchase only) or Recurring (applies to renewal orders too) |
| Cycle Counting | Configure whether the initial checkout counts as a cycle |
| One Per Subscription | Only one coupon can be active per subscription |

### Value Locking

Coupon discount values are locked at the time of capture. If a store owner edits the coupon later, existing subscriptions continue using the original discount value.

### Discount Behavior

| Feature | Description |
|---------|-------------|
| Discount Cap | Maximum discount amount enforcement |
| Renewal Application | Recurring coupons automatically apply to each renewal order |

### Full Coupon Audit Logging

All coupon changes are tracked in the audit system:

| Event | Description |
|-------|-------------|
| Coupon Created | New coupon created |
| Coupon Updated | Field-level change tracking (which fields changed, old vs new values) |
| Coupon Deleted | Coupon permanently deleted |
| Coupon Trashed | Coupon moved to trash |

**Tracked Coupon Fields:** discount amount, expiry date, discount type, description, individual use, product/category inclusions and exclusions, usage limits, free shipping, spending thresholds, email restrictions.

---

## Product Lifecycle (Free)

Every subscription product has full lifecycle tracking from creation through modification and deletion.

### 30+ Property Change Tracking

When a product is edited, the audit system captures changes to:

- Price, sale price, regular price
- Product name, slug, permalink
- Status (published, draft, trashed)
- Description, short description
- SKU
- Stock status, stock quantity
- Dimensions (length, width, height), weight
- Tax status, tax class
- Shipping class
- Featured image, gallery images
- Attributes
- And more

### Pre-Save Snapshot Engine

| Step | Description |
|------|-------------|
| 1 | Before a product is saved, the system captures a complete snapshot of the current state |
| 2 | After save, a diff engine compares old state vs new state |
| 3 | Multiple edits within the same request are batched into a single audit note |
| 4 | Changes are logged with old → new value display |

### Admin Warnings

When a product with active subscriptions is edited, a warning banner appears on the product edit screen showing the number of affected active subscriptions. This prevents accidental changes that could impact live subscribers.

### Product Deletion/Trashing

| Scenario | Behavior |
|----------|----------|
| Product Trashed | Existing subscriptions continue working with cached product data |
| Product Deleted | Existing subscriptions continue working with cached product data |
| Product Untrashed | Link between subscriptions and product is restored |

### Test Links

Every subscription product provides:

- **Direct Add-to-Cart URL** — link that adds the product to cart immediately
- **One-Click Checkout URL** — link that adds to cart and redirects to checkout

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Simple Subscription Products | ✅ | ✅ |
| Variable Subscription Products | ✅ | ✅ |
| Billing Period / Interval / Length | ✅ | ✅ |
| Lifetime Subscriptions (Length = 0) | ✅ | ✅ |
| Free Trial (per product/variation) | ✅ | ✅ |
| Sign-up Fee | ✅ | ✅ |
| Different Renewal Price | ✅ | ✅ |
| Price Locking at Purchase | ✅ | ✅ |
| Plan Switching (Upgrade / Downgrade / Crossgrade) | ✅ | ✅ |
| 3 Proration Methods | ✅ | ✅ |
| Switch Fees | ✅ | ✅ |
| Coupon Integration (one-time + recurring) | ✅ | ✅ |
| Coupon Value Locking | ✅ | ✅ |
| Full Coupon Audit Logging | ✅ | ✅ |
| 30+ Property Change Tracking | ✅ | ✅ |
| Pre-Save Snapshot Engine | ✅ | ✅ |
| Admin Warnings for Active Subscriptions | ✅ | ✅ |
| Product Deletion/Trashing Safety | ✅ | ✅ |
| Test Links (Add-to-Cart + One-Click) | ✅ | ✅ |
| Auto-Downgrade (3 triggers) | — | ✅ |
| Fixed Period Membership (Enrollment Windows) | — | ✅ |
| Redirect Product Page (301 / 404) | — | ✅ |
| Feature Manager (Product Features) | — | ✅ |
| Subscription Shipping (Recurring / One-Time) | — | ✅ |
