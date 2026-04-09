# Emails

> Automated lifecycle emails that keep customers informed and admins in control — 13 customer emails, 3 admin emails, and 4 store credit emails, all built on the WooCommerce email framework.

**Tier**: Free (Customer & Admin Emails) + Pro (Store Credit Emails)

---

## Customer Emails — 13 Total (Free)

Every email is triggered automatically by a subscription lifecycle event. No manual sending required.

### 1. New Subscription

Triggered when a subscription status becomes active (from pending, trial, or auto-draft). Welcomes the customer and confirms their subscription details.

### 2. Trial Started

Triggered when a trial begins. Informs the customer about their trial period, duration, and what happens when it ends.

### 3. Trial Converted

Triggered when a trial converts to an active paid subscription. Confirms the customer's first payment has been processed and normal billing has begun.

### 4. Renewal Reminder

Sent N days before the next payment date (configurable, default 3 days). Gives customers advance notice before they are charged, with time to update payment methods or take action.

### 5. Renewal Invoice

Generated alongside the renewal order/invoice. Contains the invoice details and a Pay Now link for manual-pay subscriptions.

### 6. Payment Successful

Triggered on a successful renewal payment. Confirms the charge amount, payment method, and updated next payment date.

### 7. Payment Failed

Triggered on a payment failure — manual payment, renewal attempt, or gateway-initiated charge. Includes details about the failure and a link to update payment or pay manually.

### 8. Subscription On-Hold

Triggered when a subscription status changes to on-hold (typically from the grace period system after extended non-payment). Warns the customer their access may be restricted.

### 9. Subscription Cancelled

Triggered on cancellation — either immediate or when a scheduled end-of-period cancellation takes effect.

### 10. Subscription Expired

Triggered when a subscription reaches its fixed end date or subscription length and expires automatically.

### 11. Subscription Reactivated

Triggered when a cancelled or expired subscription is reactivated — either by the customer (self-service) or by an admin.

### 12. Auto-Downgrade

Triggered when a subscription is auto-downgraded to a cheaper plan (on expiry, cancellation, or trial end — Pro feature triggers the email, but the email itself is a core email).

### 13. Retention Discount Accepted

Triggered when a customer accepts a retention discount offer during the cancellation flow. Confirms the discount details: percentage off, number of cycles, and the new recurring amount.

---

## Admin Emails — 3 Total (Free)

Admin notification emails ensure the store owner is aware of key subscription events.

### 1. Admin — New Subscription

Notifies the admin when a new subscription is created. Includes customer name, product, and billing details.

### 2. Admin — Subscription Cancelled

Notifies the admin when a subscription is cancelled. Includes cancellation reason (when available), customer details, and subscription information.

### 3. Admin — Payment Failed

Notifies the admin when a payment fails. Includes failure details, customer info, and a link to the subscription for investigation.

---

## Store Credit Emails — 4 Total (Pro)

Dedicated emails for the Store Credit system, triggered by credit balance changes and expiration events.

### 1. Store Credit Added

Triggered when credit is added to a customer's account from any source: admin adjustment, refund-to-credit, plan downgrade credit, promotional credit, or credit purchase.

Includes: amount added, new balance, source label (e.g., "Refund" or "Admin Adjustment"), and a My Account link.

### 2. Store Credit Used

Triggered when store credit is applied to an order (manual payment, renewal, or checkout).

Includes: amount applied, remaining balance, and a link to the order.

### 3. Store Credit Expiring

A 7-day advance warning before credits expire. Gives customers time to use their balance.

Includes: expiring amount, expiration date, days remaining, and a "Shop Now" call-to-action.

### 4. Store Credit Expired

Notification after credits have expired and been removed from the balance.

Includes: expired amount (shown with strikethrough), and a "Visit Our Shop" call-to-action.

---

## Email Features

### WooCommerce Email Framework Integration

All emails are built on the standard WooCommerce email system:

- Inherits the store's email template styling and branding
- Each email has a unique WooCommerce email ID for developer hooks
- Template override support via `theme/woocommerce/emails/` or child theme
- HTML, Plain Text, and Multipart format support

### Configurable Per Email

| Setting | Description |
|---------|-------------|
| Enable/Disable | Toggle each email on or off |
| Subject Line | Customizable with placeholders |
| Heading | Email heading text with placeholders |
| Additional Content | Extra text appended to the email body |
| Email Type | HTML, Plain Text, or Multipart |

### Rich Placeholder System

50+ unique placeholders across all email types. Common placeholders include:

| Placeholder | Description |
|-------------|-------------|
| `{subscription_id}` | Subscription ID |
| `{product_name}` | Subscription product name |
| `{customer_name}` | Customer display name |
| `{recurring_amount}` | Recurring price per cycle |
| `{billing_cycle}` | Billing period and interval |
| `{next_payment_date}` | Next scheduled payment date |
| `{status}` | Current subscription status |
| `{site_name}` | Store/site name |

Store Credit emails have their own placeholders: `{credit_amount}`, `{new_balance}`, `{remaining_balance}`, `{expiration_date}`, `{days_remaining}`, `{source_label}`.

### Email Reminder Schedule

- **Renewal Reminder** timing is configurable: how many days before the next payment date to send the reminder (default: 3 days)
- **Planned/Stub reminders**: Trial Ending Reminder and Expiring Soon Reminder settings exist in the settings system but email classes are not yet implemented

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| New Subscription Email | ✅ | ✅ |
| Trial Started Email | ✅ | ✅ |
| Trial Converted Email | ✅ | ✅ |
| Renewal Reminder Email | ✅ | ✅ |
| Renewal Invoice Email | ✅ | ✅ |
| Payment Successful Email | ✅ | ✅ |
| Payment Failed Email | ✅ | ✅ |
| Subscription On-Hold Email | ✅ | ✅ |
| Subscription Cancelled Email | ✅ | ✅ |
| Subscription Expired Email | ✅ | ✅ |
| Subscription Reactivated Email | ✅ | ✅ |
| Auto-Downgrade Email | ✅ | ✅ |
| Retention Discount Accepted Email | ✅ | ✅ |
| Admin — New Subscription Email | ✅ | ✅ |
| Admin — Subscription Cancelled Email | ✅ | ✅ |
| Admin — Payment Failed Email | ✅ | ✅ |
| Configurable Subject / Heading / Content | ✅ | ✅ |
| Rich Placeholder System | ✅ | ✅ |
| Template Override via Theme | ✅ | ✅ |
| Email Reminder Schedule | ✅ | ✅ |
| Store Credit Added Email | — | ✅ |
| Store Credit Used Email | — | ✅ |
| Store Credit Expiring Email | — | ✅ |
| Store Credit Expired Email | — | ✅ |
