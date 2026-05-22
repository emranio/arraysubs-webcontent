# Payment Gateways & Checkout

> Accept recurring payments through Stripe, PayPal, and Paddle — with a flexible checkout that supports both classic and block-based WooCommerce flows.

**Tier**: Free (Subscription Checkout) + Pro (Automatic Payments, Stripe, PayPal, Paddle, Auto-Renew Toggle, Gateway Health Dashboard)

---

## Subscription Checkout (Free)

The subscription checkout integrates directly into WooCommerce's native checkout flow — both the classic shortcode checkout and the newer block-based Store API checkout.

### 3-Phase Checkout Flow

```
Cart Validation → Payment Processing → Subscription Creation
```

1. **Cart Validation** — enforces subscription-specific rules before the customer can proceed
2. **Payment Processing** — routes the payment through the appropriate gateway (or processes $0 orders for trials)
3. **Subscription Creation** — creates the subscription record, links it to the order, starts the billing cycle

### 5 Cart Validation Rules

| Rule | What It Does |
|------|-------------|
| Mixed Cart Control | Allow or disallow mixing subscription products with regular products in the same cart |
| One Per Customer | Prevent a customer from purchasing a subscription product they already have an active subscription for |
| One Per Product | Limit one subscription per product in the cart |
| Billing Cycle Compatibility | When multiple subscriptions are in the cart, ensure they have compatible billing cycles |
| Gateway Capability | Verify the selected payment gateway supports subscription payments |

### One-Click Checkout

Skip the cart page entirely and send customers straight to checkout:

| Mode | Behavior |
|------|----------|
| Default Product Only | One-click checkout for the default/main product only |
| Subscription Products Only | One-click checkout for all subscription products |
| All Products | One-click checkout for every product on the store |

Additional option: **Disable Cart Page** — redirects all "Add to Cart" actions directly to checkout.

### Trial Handling

- **$0 total orders** — trial orders with no sign-up fee are processed as free orders (no payment gateway required)
- **Sign-up fee + trial combos** — charges the sign-up fee at checkout while the recurring amount starts after the trial ends
- **One Trial Per Customer** enforcement prevents repeat trial abuse

### Plan Switching at Checkout

Customers switching plans go through a special checkout flow:

- **6 eligibility conditions** checked before the switch is allowed
- **3 proration methods**: Prorate Immediately (charge/credit the difference now), Apply at Renewal (adjust the next renewal amount), No Proration (switch with no price adjustment)
- **Normalized daily rate comparison** with 5% tolerance for automatically determining switch direction (upgrade, downgrade, or crossgrade)

### Checkout Compatibility

| Checkout Type | Support |
|--------------|---------|
| Classic Checkout (shortcode) | ✅ Full support |
| Block Checkout (Store API) | ✅ Full support via `woocommerce_store_api_checkout_order_processed` |

### Account Creation

- **Auto-create customer account** at checkout when purchasing a subscription
- Guest checkout is not allowed for subscription purchases — a WordPress account is always created

---

## Automatic Payments Overview (Pro)

ArraySubs Pro supports three payment gateways for automatic recurring billing. Each gateway has a different integration model.

### 2 Billing Models

| Model | Gateway | How It Works |
|-------|---------|-------------|
| **ArraySubs-managed** | Stripe | ArraySubs controls the billing schedule and initiates each payment via the gateway's API |
| **Gateway-managed** | PayPal, Paddle | The gateway manages the billing cycle internally and reports back via webhooks |

### 19-Capability Gateway Comparison

| Capability | Stripe | PayPal | Paddle |
|-----------|--------|--------|--------|
| Automatic recurring payments | ✅ | ✅ | ✅ |
| SCA / 3D Secure | ✅ | — | ✅ |
| $0 trial support | ✅ | ✅ | ✅ |
| Sign-up fee | ✅ | ✅ | ✅ |
| Card auto-update | ✅ | — | — |
| Card expiry notices | ✅ | — | — |
| Payment method update | ✅ | ✅ | ✅ |
| Dispute handling | ✅ | ✅ | — |
| Refund via gateway | ✅ | ✅ | ✅ |
| Pause / Resume | ✅ | — | ✅ (native) |
| Multiple subscriptions in cart | ✅ | — | ✅ |
| Mixed cart (sub + regular) | ✅ | — | ✅ |
| Different billing cycles in cart | ✅ | — | — |
| Plan switching | ✅ | ✅ | ✅ |
| Auto-renew toggle | ✅ | ✅ | ✅ |
| Retention discount amount update | ✅ | — | — |
| Test mode | ✅ | ✅ | ✅ |
| Webhook verification | ✅ (Stripe signature) | ✅ (API-based) | ✅ (SHA-256) |
| Tax/VAT handling | — | — | ✅ (Merchant of Record) |

### Payment Meta

10+ payment-related meta keys are stored per subscription for gateway tracking, payment method details, and webhook correlation.

### 9 Normalized Webhook Event Types

All three gateways map their events into a common internal format for consistent handling across the system.

### Admin Gateway Controls

- **Detach gateway** from a subscription (switch to manual billing)
- **Reconnect gateway** to a subscription that was previously detached

---

## Stripe Gateway (Pro)

Full-featured Stripe integration with SCA compliance, automatic card updates, and off-session renewal payments.

### Payment Flows

| Scenario | Stripe API Used |
|----------|----------------|
| Initial purchase | Checkout Session → PaymentIntent |
| Renewal payment | PaymentIntent (off-session) |
| $0 trial sign-up | SetupIntent (saves card without charging) |
| Payment method update | SetupIntent + Stripe Elements |

### Key Capabilities

- **SCA / 3D Secure compliance** — automatic Strong Customer Authentication at checkout and during off-session renewal payments
- **Card auto-update** — Visa Account Updater and Mastercard ABU automatically update stored card details when banks issue replacement cards
- **Card expiry notices** — alerts when a stored card is approaching its expiration date
- **Dispute handling** — webhook-driven logging when a customer disputes a charge
- **Test mode** — full sandbox support for development and QA

### 13 Webhook Events

Stripe events are processed in real-time as they occur:

- Payment succeeded / failed / requires action
- Charge disputed / dispute closed
- Invoice paid / payment failed
- Customer subscription updated / deleted
- Setup intent succeeded
- Payment method attached / detached / updated

---

## PayPal Gateway (Pro)

Recurring billing through PayPal's Billing Agreements with Smart Payment Buttons integration.

### How It Works

PayPal uses **gateway-managed billing** — once the customer approves a Billing Agreement, PayPal handles the recurring schedule internally and notifies ArraySubs via webhooks.

### Payment Experience

- **Smart Payment Buttons** at checkout — PayPal, PayPal Credit, and Venmo (where available)
- Customer redirected to PayPal to approve the Billing Agreement
- Subsequent renewals happen automatically within PayPal

### Key Capabilities

- **Trial support** via PayPal Billing Plan trial cycle
- **Payment method update** via new Billing Agreement creation
- **Dispute handling** with webhook notifications
- **API-based signature verification** for all webhooks

### 8 Webhook Events

Payment completed, payment failed, billing agreement created, agreement cancelled, dispute created, dispute resolved, refund completed, subscription updated

### Known Limitations

| Limitation | Details |
|-----------|---------|
| No mixed carts | Subscription + regular products cannot be in the same cart |
| No multiple subscriptions | Only one subscription per cart/order |
| No different billing cycles | Cannot mix billing periods in the same transaction |
| No pause/resume | Pausing is not supported at the gateway level |
| No card auto-update | PayPal does not report card replacement events |
| No retention amount update | Discount adjustments to recurring amount are not sent to PayPal |

---

## Paddle Gateway (Pro)

Paddle operates as a **Merchant of Record** — meaning Paddle handles tax collection, VAT compliance, invoicing, and payment processing across 200+ countries. The store owner receives net payouts.

### Payment Experience

- **Paddle.js overlay checkout** — an in-page modal with support for cards, PayPal, Apple Pay, Google Pay, and local payment methods
- The checkout overlay appears on top of the WooCommerce checkout page (no redirect)

### Product Catalog Sync

- ArraySubs automatically creates matching Products and Prices in Paddle's catalog
- Prices are synced with the subscription product's billing configuration

### Key Capabilities

- **Native pause/resume** — Paddle supports pausing and resuming subscriptions at the gateway level
- **Trial support** via Paddle Price trial phase
- **Tax/VAT handling** — Paddle calculates and remits tax in all supported countries
- **SHA-256 signature verification** for all webhook events

### 8 Webhook Events

Transaction completed, transaction payment failed, subscription activated, subscription updated, subscription paused, subscription resumed, subscription canceled, adjustment created

### Known Limitations

| Limitation | Details |
|-----------|---------|
| No different billing cycles | Cannot mix billing periods |
| No card expiry notices | Paddle does not report card expiration |
| No retention amount update | Discount adjustments are not sent to Paddle |

---

## Auto-Renew & Manual Fallback (Pro)

Customers can control whether their subscription renews automatically or via manual invoices.

### Auto-Renew Toggle

- **Customer-facing toggle** on the View Subscription page in the customer portal
- Customers can disable auto-renew at any time — the subscription switches to manual invoice collection
- Customers can re-enable auto-renew as long as a valid payment method is on file

### Toggle Requirements

The auto-renew toggle is only available when:

- The subscription is in an eligible status (active, on-hold)
- A payment gateway is connected to the subscription
- A valid stored payment method exists

### Global Control

- **Global enable/disable** in settings — merchants can turn off the auto-renew toggle entirely
- When disabled, customers cannot change their renewal method

### Manual Invoice Collection Flow

When auto-renew is off:

1. Renewal invoice is created as a pending WooCommerce order (6 hours before due date)
2. Customer receives Renewal Invoice email with a **Pay Now link**
3. Customer clicks the link and pays using any available WooCommerce payment method
4. On successful payment, the subscription is extended to the next billing cycle

### Grace Period for Manual Invoices

- The same two-phase grace period applies: Active Grace → On-Hold → Cancelled
- Customer has the full grace window to pay the manual invoice

### Payment Method Preservation

- When a customer turns off auto-renew, the stored payment method is **preserved** (not deleted)
- If the customer re-enables auto-renew later, the same payment method is used

---

## Gateway Health Dashboard (Pro)

A unified monitoring screen for all payment gateways — see connection status, active subscription counts, and webhook activity at a glance.

### Status Cards

One card per gateway showing:

- Connection state (Connected, Test Mode, Needs Setup, Disabled, Unavailable)
- Number of active subscriptions using this gateway
- Timestamp of the last webhook received

### Webhook URL Display

- Copy-ready webhook URL for each gateway
- Paste directly into the Stripe Dashboard, PayPal Developer Portal, or Paddle Vendor Dashboard

### Capability Badges

Visual indicators per gateway showing which capabilities are supported (auto-renew, pause, refund, card update, trial, dispute handling, etc.)

### Webhook Event Log

- Paginated event log (50 events per page)
- Filter by gateway and event type
- 30-day retention with automatic cleanup
- Signature verification status shown per event

### Post-Setup Verification

Step-by-step workflow to verify gateway configuration:

1. Confirm connection state is green
2. Copy webhook URL to gateway dashboard
3. Process a test transaction
4. Check webhook event log for the test event
5. Review capability badges

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Subscription Checkout (classic + block) | ✅ | ✅ |
| Cart Validation Rules (5 rules) | ✅ | ✅ |
| One-Click Checkout (3 modes) | ✅ | ✅ |
| Trial Handling ($0 orders, sign-up fees) | ✅ | ✅ |
| Plan Switching at Checkout (3 proration methods) | ✅ | ✅ |
| Account Auto-Creation | ✅ | ✅ |
| Stripe Gateway (SCA, card auto-update, 13 webhooks) | — | ✅ |
| PayPal Gateway (Billing Agreements, Smart Buttons) | — | ✅ |
| Paddle Gateway (Merchant of Record, tax/VAT) | — | ✅ |
| Auto-Renew Toggle (customer self-service) | — | ✅ |
| Manual Invoice Fallback | ✅ | ✅ |
| Gateway Health Dashboard | — | ✅ |
| Admin Detach/Reconnect Gateway | — | ✅ |
