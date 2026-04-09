# Manage Members

> A centralized member insight dashboard that gives store owners a 360° view of every customer — subscriptions, spending, orders, store credit, and one-click impersonation.

**Tier**: Pro

---

## Member Insight Dashboard (Pro)

A single admin page for looking up any customer and seeing everything about them in one place.

### Customer Lookup

- Search by name, username, or email
- Instant results as you type
- Select a customer to load their full profile

### Profile Card

| Field | Description |
|-------|-------------|
| Avatar | Custom ArraySubs avatar or Gravatar fallback |
| Display Name | Full display name |
| Username | WordPress username |
| Email | Email address |
| Phone | Phone number (from billing info) |
| Joined Date | Account registration date |
| Role Badges | All WordPress roles shown as badges |

### Quick Actions

| Action | What It Does |
|--------|-------------|
| Login as Customer | Impersonate the customer in a new session (see Login as User) |
| Edit User | Jump to the WordPress user profile edit screen |
| Clear | Reset the dashboard to search for another customer |

---

## Member Statistics (Pro)

6 stat cards provide a financial and subscription summary at a glance.

| Stat Card | Description |
|-----------|-------------|
| Total Spent | Lifetime spending across all WooCommerce orders |
| Total Orders | Total number of WooCommerce orders |
| Active Subscriptions | Number of currently active subscriptions |
| Total Subscriptions | Total subscriptions across all statuses |
| Store Credit Balance | Current available store credit |
| Total Refunds | Lifetime refund amount |

Data is pulled from WooCommerce order records and ArraySubs subscription/store credit data.

---

## Commerce Overview (Pro)

### Subscriptions Table

| Column | Description |
|--------|-------------|
| ID | Subscription ID |
| Product | Subscription product name |
| Status | Color-coded status badge |
| Recurring Amount | Price per billing cycle |
| Billing Cycle | Period and interval (e.g., "Every 1 month") |
| Start Date | When the subscription started |
| Next Payment | Next scheduled payment date |
| Actions | View link to the subscription detail screen |

### Purchased Products (Non-Subscription)

- Deduplicated list of all non-subscription products the customer has purchased
- Aggregated purchase display (product name, quantity, total spent)
- Useful for understanding the customer's broader purchase history beyond subscriptions

### Addresses

- Billing address (read-only display)
- Shipping address (read-only display)
- Store Credit balance shown alongside the addresses area

---

## Login as Customer (Pro)

One-click session impersonation to see the store exactly as the customer sees it.

### How It Works

1. Admin clicks "Login as Customer" on the member profile
2. A secure cookie stack is created, preserving the admin's session
3. The admin is now browsing as the customer — same account, same permissions, same portal view
4. A notification bar stays visible at the top with a "Return to your account" link
5. Clicking "Return" restores the original admin session

### Nested Impersonation

Admins can switch from one impersonated customer to another without returning to the admin account first. The cookie stack preserves the chain and returns to the original admin session when done.

### Security

- Admin-only — only users with `manage_options` capability can impersonate
- Non-admin targets only — admin-to-admin impersonation is blocked
- Impersonated sessions are exempt from Multi-Login Prevention limits (so impersonation doesn't kick the customer out)
- Notification bar is always visible during impersonation

### Available From

Login as Customer is accessible from 6 locations across the admin:

| Location | Where |
|----------|-------|
| Users List | Row action on the WordPress Users table |
| User Profile | Button on the WordPress User Edit screen |
| Order Detail | Action on WooCommerce Order detail page |
| Subscription Detail | Action on the ArraySubs subscription detail screen |
| Member Profile | Button on the Manage Members dashboard |
| Additional Admin Screens | Quick-link integrations across WordPress/WooCommerce |

---

## Member Operations (Pro)

### Quick-Link Cards

3 cards provide fast navigation to related screens for the selected customer:

| Card | Destination |
|------|------------|
| View Orders | Jump to WooCommerce Orders filtered by customer |
| Manage Store Credit | Jump to Store Credit management for this customer |
| Show Features | Jump to Feature entitlements for this customer |

### Admin Shortcut Integrations

5 admin shortcut integrations add ArraySubs member links and context across standard WordPress and WooCommerce admin screens, making it easy to jump into the member dashboard from wherever you are.

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Member Insight Dashboard | — | ✅ |
| Customer Lookup (Name / Username / Email) | — | ✅ |
| Profile Card with Avatar & Role Badges | — | ✅ |
| 6-Card Member Statistics | — | ✅ |
| Subscriptions Table | — | ✅ |
| Purchased Products (Non-Subscription) | — | ✅ |
| Addresses Display | — | ✅ |
| Login as Customer (6 placements) | — | ✅ |
| Nested Impersonation | — | ✅ |
| Quick-Link Cards (Orders, Credit, Features) | — | ✅ |
| Admin Shortcut Integrations | — | ✅ |
