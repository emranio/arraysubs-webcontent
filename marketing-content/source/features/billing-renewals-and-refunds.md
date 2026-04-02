# Billing, Renewals & Refunds

> Automated recurring billing with intelligent grace periods, flexible skip/pause controls, and merchant-friendly refund options — all running in the background.

**Tier**: Free (Renewal Engine, Trial Management, Grace Period, Skip & Pause, Refund Management) + Pro (Automatic Gateway Payments, Auto-Downgrade, Refund-to-Store-Credit)

---

## Renewal Operations

The renewal engine is the heartbeat of every subscription. It generates invoices, routes payments, handles overdue accounts, and keeps billing dates accurate — all automatically.

### 3 Background Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Generate Upcoming Renewals | Hourly | Finds subscriptions due within 6 hours and creates pending renewal orders |
| Check Overdue Renewals | Hourly | Enforces the two-phase grace period on unpaid invoices |
| Process Trial Conversions | Daily at 2 AM | Converts expired trials to active paid subscriptions |

### Invoice Generation

- Renewal invoices are created **6 hours before the due date** — giving customers advance notice and time to ensure payment methods are funded
- Each invoice is a standard WooCommerce order linked to the subscription
- Invoice uses **locked prices** from the subscription meta (not the current product price), so product price changes never affect existing subscribers

### Manual vs Automatic Payment Routing

Every renewal follows one of two paths:

| Path | How It Works |
|------|-------------|
| **Manual** (Free) | Invoice is created as a pending WooCommerce order → customer receives an email with a Pay Now link → customer pays via any available WooCommerce payment method → subscription is extended |
| **Automatic** (Pro) | Invoice is created → payment is automatically charged to the stored payment method via Stripe, PayPal, or Paddle → subscription is extended on successful payment |

The core plugin always creates the invoice. The Pro plugin handles automatic charging when a gateway is connected.

### Renewal Sync

Align all subscription renewals to a specific calendar date — useful for businesses that bill on the 1st of the month, every Monday, or a specific day each year.

- **3 sync types**: Monthly (specific day 1–28), Weekly (specific day), Yearly (specific day + month)
- **Global system-level setting** — applies to all subscription products, not per-product
- **2 first-payment proration methods**:
  - **Prorate first payment** — charge a partial amount for the days until the sync date
  - **Extend billing period** — extend the first cycle to the sync date at full price
- Optional display of sync details at checkout so customers understand their billing date

### Different Renewal Price

Override the recurring price after the initial billing cycle:

- Set a different amount that kicks in after a configurable number of cycles
- Use cases: introductory pricing, graduated pricing, loyalty discounts
- The price change is configured per product (or per variation) and locked at subscription creation

### Automatic Expiration

Subscriptions can expire automatically based on:

- **Subscription Length** — after a set number of billing cycles (e.g., 12 months)
- **Fixed End-Date** (Pro) — on a specific calendar date (for memberships with fixed terms)
- **Lifetime subscriptions** (length = 0) — never expire, no renewal invoices generated

---

## Trial Management

Let customers try before they buy — with full control over trial duration, conversion behavior, and one-trial enforcement.

### Trial Configuration

| Setting | Description |
|---------|-------------|
| Trial Period | Number of free trial days (per product or per variation) |
| Sign-up Fee | Optional one-time charge at checkout even during trial |
| One Trial Per Customer | Prevents the same customer from getting multiple free trials |
| Require Payment Method | Policy flag to require a payment method even for $0 trial orders |

### Trial-to-Paid Conversion

- **Daily batch job at 2 AM** processes all expired trials
- Converts trial status to active
- Recalculates the next payment date based on the **billing period** (not the trial period)
- Clears trial-specific metadata
- Sends the "Trial Converted" email to the customer

### Auto-Downgrade on Trial Expiry (Pro)

Instead of cancelling a subscription when the trial ends without payment, automatically downgrade to a cheaper plan:

- Configured per product via the Linked Products tab
- Preserves the customer relationship instead of losing them
- Email suppression during auto-downgrade prevents confusing double notifications

---

## Grace Period & Recovery

When a renewal payment fails or a manual invoice goes unpaid, the subscription doesn't immediately cancel. Instead, it enters a two-phase grace period designed to maximize payment recovery.

### Two-Phase Timeline

```
Payment Due Date
      │
      ├─── ACTIVE ────────────── ON-HOLD ──────────────── CANCELLED
      │   (default 3 days)       (default 7 days)
      │   Full customer access   Restricted access        No access
      │
    Day 0                      Day 3                     Day 10
```

### Configurable Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Generate Invoice Before Due | 6 hours | How early to create the renewal invoice |
| Active Grace Days | 3 days | How long the subscription stays fully active after the due date |
| On-Hold Grace Days | 7 days | How long the subscription stays on-hold before cancellation |

### Recovery Behavior

- **Payment at any point** during the grace period (active or on-hold phase) restores the subscription to Active status
- Customer receives email prompts at each status transition
- Grace period applies to both manual invoices and failed automatic payments

---

## Skip & Pause

Give subscribers flexibility without forcing them to cancel.

### Skip Next Renewal

Customers can skip one or more upcoming renewal cycles:

| Setting | Default | Description |
|---------|---------|-------------|
| Max Consecutive Skips | 3 | Maximum number of cycles a customer can skip in a row |
| Cutoff Days | 2 | Cannot skip within this many days of the renewal date |

- **Undo skip** — customer can reverse the skip at any time before the skipped renewal
- **Modify skip count** — change how many cycles to skip after the initial skip
- The next payment date is pushed forward by the number of skipped cycles
- No charge during skipped periods

### Pause / Vacation Mode

Temporarily freeze the subscription for a set duration:

| Setting | Default | Description |
|---------|---------|-------------|
| Max Pause Duration | 30 days | Maximum pause length in days |
| Max Pauses Per Subscription | 2 | Lifetime limit on how many times a subscription can be paused |
| Cooldown Period | 30 days | Minimum days between pauses |
| Require Reason | Optional | Ask the customer to provide a reason for pausing |
| Customer Can Pause | Toggle | Allow/disallow customer self-service pause |

- **Auto-resume** — subscription automatically resumes after the pause duration via Action Scheduler
- **Pause history** — full log of all pause/resume events per subscription
- **Cooldown enforcement** — prevents abuse by requiring a minimum gap between pauses
- **Eligibility rules** — subscription must be in an eligible status (active, not already paused, not within cutoff)

### Related Emails

- Subscription Paused
- Subscription Resumed
- Subscription Skipped
- Skip Undone

---

## Refund Management

Three refund types, prorated calculations, gateway integration, and configurable behavior on cancellation.

### Refund-on-Cancellation Options

| Option | Behavior |
|--------|----------|
| Allow Immediate | Refund is processed immediately when the customer cancels |
| Refund at End of Period | Refund is processed when the current billing period ends |
| No Automatic | No automatic refund — admin handles manually |

### Refund Configuration

| Setting | Description |
|---------|-------------|
| Automatic Gateway Refund | When enabled, refund is sent back through the original payment gateway |
| Minimum Refund Amount | Orders below this threshold are not eligible for automatic refund |

### 3 Refund Types

| Type | Description |
|------|-------------|
| **Prorated Refund** | Calculates the unused portion of the current billing period using a daily rate and refunds only that amount. Available via REST API with a preview endpoint that shows the calculation before processing. |
| **Full Order Refund** | Refunds the entire amount of a specific order |
| **Partial Order Refund** | Refunds a custom amount from a specific order |

### Prorated Refund Calculation

1. Find the most recent renewal order
2. Calculate the total days in the billing period
3. Calculate the days already used
4. Compute the daily rate (order total ÷ total days)
5. Refund = daily rate × remaining days

### Refund Processing Flow (5 Steps)

1. Validate refund eligibility (subscription status, minimum amount, order exists)
2. Calculate refund amount (prorated or specified)
3. Process through payment gateway (if automatic gateway refund is enabled)
4. Record refund metadata on the subscription (`_last_prorated_refund_date`, `_last_prorated_refund_amount`, `_last_prorated_refund_id`)
5. Trigger post-refund hooks for status changes and notifications

### Refund-to-Store-Credit (Pro)

Instead of returning money to the payment method, convert refunds to store credit:

- **"As Store Credit"** refund method appears on the WooCommerce order edit screen
- **Balance preview** — shows the customer's current credit balance and what it will be after
- **Does NOT create a WooCommerce refund record** — the credit is issued directly to the customer's store credit wallet
- Guest orders are ineligible (no customer account to attach credit to)
- Can mix gateway refund + store credit refund on the same order

### Refund Display

- **Refund History** section on the subscription detail screen (admin and customer portal)
- Shows date, amount, and type for every refund associated with the subscription

---

## Renewal Communication

Six billing-related emails are automatically sent at key lifecycle moments:

| Email | Trigger |
|-------|---------|
| Renewal Reminder | Sent N days before the next payment date (default: 3 days) |
| Renewal Invoice | Sent when a renewal invoice is generated |
| Payment Successful | Sent when a renewal payment is successfully processed |
| Payment Failed | Sent when a renewal payment fails (manual, automatic, or gateway-reported) |
| Subscription On-Hold | Sent when the subscription transitions to on-hold status |
| Subscription Cancelled | Sent when the subscription is cancelled |

All emails are configurable — subject, heading, and content can be customized per email.

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Renewal Engine (3 background jobs, invoice generation) | ✅ | ✅ |
| Manual Payment Collection (Pay Now link) | ✅ | ✅ |
| Automatic Gateway Payment (Stripe, PayPal, Paddle) | — | ✅ |
| Renewal Sync (Monthly, Weekly, Yearly) | ✅ | ✅ |
| Different Renewal Price | ✅ | ✅ |
| Subscription Length / Automatic Expiration | ✅ | ✅ |
| Trial Management (per-product, batch conversion) | ✅ | ✅ |
| Auto-Downgrade on Trial Expiry | — | ✅ |
| Grace Period (two-phase recovery) | ✅ | ✅ |
| Skip Next Renewal | ✅ | ✅ |
| Pause / Vacation Mode | ✅ | ✅ |
| Prorated Refund (with preview) | ✅ | ✅ |
| Full / Partial Order Refund | ✅ | ✅ |
| Automatic Gateway Refund | ✅ | ✅ |
| Refund-to-Store-Credit | — | ✅ |
| Billing Lifecycle Emails (6 triggers) | ✅ | ✅ |
