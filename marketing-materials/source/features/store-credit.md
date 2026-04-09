# Store Credit

> A virtual wallet system for WooCommerce — customers earn, purchase, and spend credit across subscriptions and orders, with automatic renewal application, expiration management, and 4 dedicated emails.

**Tier**: Pro

---

## Store Credit System Overview (Pro)

Store Credit adds a virtual currency balance to every customer account. Credits can be earned from multiple sources and spent on orders and renewals.

### 2 Credit Levels

| Level | Source | Consumed |
|-------|--------|----------|
| Subscription-Level Credit | Generated from plan downgrades (prorated credit for the remaining period) | Used first when credit is applied |
| Customer-Level Credit | From refunds, admin adjustments, promotions, credit purchases | Used after subscription-level credit is exhausted |

Subscription credit is always consumed before customer credit, ensuring downgrade credits are used on the subscription they came from.

### 8 Credit Source Types

| # | Source | Description |
|---|--------|-------------|
| 1 | Plan Downgrade | Prorated credit when switching to a cheaper plan |
| 2 | Refund | Refund-to-store-credit instead of gateway refund |
| 3 | Admin Adjustment | Manual add/deduct by store administrator |
| 4 | Promotional | Promotional credit added by admin or automation |
| 5 | Credit Purchase | Customer buys credit through the credit purchase product |
| 6 | Applied to Renewal | Credit deducted when applied to a subscription renewal |
| 7 | Applied to Order | Credit deducted when applied at checkout |
| 8 | Expired | Credit removed by the expiration system |

---

## Store Credit Management (Pro)

The admin management page for viewing and adjusting customer credit balances.

### Customer Search

- Search by customer name, username, or email
- Select a customer to view their credit details

### Balance Operations

| Operation | Description |
|-----------|-------------|
| Add Credit | Add a credit amount with a note explaining the reason |
| Deduct Credit | Remove a credit amount with a note |
| View Balance | See the current available balance |

### Transaction History

| Column | Description |
|--------|-------------|
| Date | When the transaction occurred |
| Description | What caused the credit change (with subscription/order links when applicable) |
| Amount | Credit added (+, green) or deducted (-, red) |
| Balance After | Running balance after this transaction |

- 10 entries per page with pagination

---

## Store Credit Settings (Pro)

### General

| Setting | Description |
|---------|-------------|
| Master Enable Toggle | Turn the entire store credit system on or off |

### Credit Application

| Setting | Default | Description |
|---------|---------|-------------|
| Auto-Apply to Renewals | On | Automatically apply available credit to renewal invoices |
| Allow at Checkout | Off | Allow customers to apply credit during checkout |
| Minimum Order Amount | — | Minimum order total required before credit can be applied |

### Credit Expiration

| Setting | Description |
|---------|-------------|
| Expiration Period | Number of days after which credits expire (0 = never) |
| Batch Job | Daily 3AM batch job checks for expired credits |
| Advance Warning | 7-day warning email before expiration |
| Scope | Only affects new credits — existing credits at the time the setting is enabled are not retroactively expired |

### Credit Purchase

| Setting | Description |
|---------|-------------|
| Enable Toggle | Allow customers to purchase store credit |
| Minimum Amount | Minimum credit purchase amount |
| Maximum Amount | Maximum credit purchase amount |
| Default Amount | Pre-filled amount on the purchase form |

---

## Credit Purchase Product (Pro)

A special WooCommerce product type (`arraysubs_store_credit`) that allows customers to buy store credit.

### Product Configuration

| Setting | Description |
|---------|-------------|
| Amount Type | Fixed (preset amount) or Custom (customer chooses amount) |
| Bonus Percentage | Incentive bonus — e.g., buy $50, get 10% bonus = $55 credit |
| Virtual | Always virtual — no shipping required |
| Sold Individually | Only one credit purchase per cart |

### Purchase Flow

1. Customer selects or enters the credit amount
2. Product added to cart (bonus preview shown if applicable)
3. Order completed via normal WooCommerce checkout
4. On order status `completed` or `processing`, credit is added to the customer's balance
5. One-time processing flag prevents duplicate credit on status changes

### Embeddable Shortcode

`[arraysubs_buy_credits]` — Embed the credit purchase form anywhere on the site. Works on pages, posts, and in the customer portal.

---

## Refund to Store Credit (Pro)

An alternative refund method that credits the customer's store balance instead of refunding to the payment gateway.

### How It Works

1. Admin opens the WooCommerce order
2. In the refund interface, selects "As Store Credit" method
3. Balance preview shows the customer's current credit and what it will be after the refund
4. Refund processed — credit added to customer balance

### Key Behaviors

| Behavior | Description |
|----------|-------------|
| No WC Refund Record | This is a credit-only operation — no WooCommerce refund record is created |
| Order Meta | Tracked in `_refunded_as_credit` order meta |
| Guest Orders | Ineligible — customers must have an account |
| Mixed Refunds | Gateway refunds and credit refunds can be used on the same order |

---

## Credit History (Pro)

A global transaction log across all customers — the admin's view of every credit movement in the system.

### Filters

| Filter | Options |
|--------|---------|
| Source | 9 source types (Plan Downgrade, Refund, Admin Adjustment, Promotional, Credit Purchase, Applied to Renewal, Applied to Order, Expired, and more) |
| Type | Credit Added / Debit Deducted |

### Table Columns

| Column | Description |
|--------|-------------|
| ID | Transaction ID |
| Date | Transaction timestamp |
| Customer | Customer name linked to their profile |
| Description | What happened (with subscription/order links when applicable) |
| Amount | Credit (+ green) or Debit (- red) |
| Actions | Delete button (removes log record only — does not reverse the transaction) |

- 20 entries per page with pagination
- REST API endpoint available for programmatic access

---

## Store Credit Emails — 4 (Pro)

### 1. Store Credit Added

Triggered when credit is added from any source: admin adjustment, refund-to-credit, plan downgrade, promotional, or credit purchase.

| Placeholder | Description |
|-------------|-------------|
| `{credit_amount}` | Amount added |
| `{new_balance}` | Balance after addition |
| `{source_label}` | Source type (e.g., "Refund", "Admin Adjustment") |
| `{my_account_link}` | Link to My Account |

### 2. Store Credit Used

Triggered when credit is applied to an order or renewal.

| Placeholder | Description |
|-------------|-------------|
| `{credit_amount}` | Amount applied |
| `{remaining_balance}` | Balance after application |
| `{order_link}` | Link to the order |

### 3. Store Credit Expiring

7-day advance warning before credits expire.

| Placeholder | Description |
|-------------|-------------|
| `{expiring_amount}` | Amount about to expire |
| `{expiration_date}` | Date credits will expire |
| `{days_remaining}` | Days until expiration |

Includes a "Shop Now" call-to-action encouraging the customer to use their credit.

### 4. Store Credit Expired

Notification after credits have expired.

| Placeholder | Description |
|-------------|-------------|
| `{expired_amount}` | Amount expired (shown with strikethrough) |

Includes a "Visit Our Shop" call-to-action.

---

## Customer Portal — Store Credit Page (Pro)

When Store Credit is enabled, a **Store Credit** menu item appears in WooCommerce My Account.

### Page Sections

| Section | Description |
|---------|-------------|
| Current Balance | Total available store credit |
| Credits Expiring Soon | Credits expiring within the next 30 days |
| Purchase Credits | `[arraysubs_buy_credits]` form for buying more credit |
| Transaction History | Full log of all credit additions and deductions for this customer |

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Store Credit System (2 credit levels) | — | ✅ |
| Admin Credit Management (Add / Deduct) | — | ✅ |
| Transaction History (per-customer) | — | ✅ |
| Auto-Apply to Renewals | — | ✅ |
| Allow at Checkout | — | ✅ |
| Credit Expiration (with batch job) | — | ✅ |
| Credit Purchase Product (Fixed / Custom) | — | ✅ |
| Bonus Percentage on Purchases | — | ✅ |
| `[arraysubs_buy_credits]` Shortcode | — | ✅ |
| Refund-to-Store-Credit | — | ✅ |
| Global Credit History Log | — | ✅ |
| Store Credit Added Email | — | ✅ |
| Store Credit Used Email | — | ✅ |
| Store Credit Expiring Email | — | ✅ |
| Store Credit Expired Email | — | ✅ |
| Customer Portal — Store Credit Page | — | ✅ |
