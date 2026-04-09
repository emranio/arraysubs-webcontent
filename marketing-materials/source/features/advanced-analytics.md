# Advanced Analytics

> Track every metric that matters — from monthly recurring revenue to churn patterns — with dashboards built directly into WooCommerce.

**Tier**: Free (Reports Hub, Retention Analytics) + Pro (Performance Dashboard, WooCommerce Analytics Extension, Order List Enhancements)

---

## Reports Hub (Free)

The Reports Hub is the central command center for all ArraySubs analytics. It provides a single page with organized links to every report and data view available across the plugin.

### What It Includes

- **40+ report links** organized across 12 categories
- **Summary bar** at the top showing total counts for each report area (active subscriptions, total members, pending renewals, etc.)
- **Quick-navigation category grid** — click any category to jump to its section
- **Deep links** into every analytics sub-page — subscription lists by status, retention dashboards, billing reports, member overviews, audit logs, and more

### Why It Matters

Instead of hunting through menus, store owners get a single bird's-eye view of every available report with one-click access.

---

## Subscription Performance Dashboard (Pro)

A real-time analytics dashboard purpose-built for subscription businesses. Understand growth, revenue, churn, and retention at a glance.

### 10 KPI Cards

| KPI | What It Measures |
|-----|------------------|
| Active Subscriptions | Total currently active subscriptions |
| MRR (Monthly Recurring Revenue) | Normalized monthly revenue from all active subscriptions |
| New Subscriptions | Subscriptions created in the selected period |
| Churned Subscriptions | Subscriptions cancelled in the selected period |
| Churn Rate | Percentage of subscriptions lost vs. total active |
| Trial Conversions | Trials that converted to paid subscriptions |
| Renewal Revenue | Revenue collected from renewal payments |
| Revenue at Risk | MRR from subscriptions showing churn signals (on-hold, pending cancellation) |
| ARPU | Average Revenue Per User across all active subscribers |
| Retention Saves | Subscriptions retained through cancellation flow offers |

### 6 Time-Series Charts

1. **Subscription Growth** — new vs churned over time
2. **Revenue Trend** — recurring revenue trajectory
3. **Churn Trend** — cancellation rate over time
4. **Trial Conversion Trend** — trial-to-paid conversion rate
5. **Retention Trend** — retention offer effectiveness
6. **Net Growth** — net subscriber gain/loss

### 5 Leaderboards

1. Top Products by Active Subscriptions
2. Top Products by Revenue
3. Top Churning Products
4. Recent Subscriptions
5. Recent Cancellations

### Date Range & Performance

- **5 preset ranges**: 7 days, 30 days, 90 days, 12 months, Custom
- **Automatic interval selection**: daily granularity for shorter ranges, weekly/monthly for longer ranges
- **1-hour server-side cache** for fast page loads without hitting the database on every view

---

## WooCommerce Analytics Extension (Pro)

Extends the native WooCommerce Analytics screens with subscription-specific intelligence. No separate dashboard to learn — the data appears right where store owners already work.

### Orders Analytics Enhancements

- **Type column** added to the WooCommerce Orders analytics table
- **Quick filter dropdown** for order types (Subscription Purchase, Renewal, Trial, Upgrade, Credit Purchase, Other)
- **Advanced Report Filters** for order types in WooCommerce's built-in filter bar

### Revenue Report Cards

Three new summary cards appear at the top of the Orders analytics page:

| Card | Description |
|------|-------------|
| Subscription Revenue | Total revenue from subscription-related orders in the selected period |
| Non-Subscription Revenue | Revenue from regular (non-subscription) orders |
| Subscription Revenue % | Percentage of total revenue coming from subscriptions |

### Products Report

- **"Subscription Products Only" toggle** — filter the WooCommerce Products report to show only subscription products and their performance

### Customers Report

- **Member details link** for each customer row — click to open the full ArraySubs member profile

### Compatibility

- Works with both **HPOS (High-Performance Order Storage)** and **legacy post-type** order storage

---

## Order List Enhancements (Pro)

Adds subscription intelligence directly to the WooCommerce Orders list table — the screen most store owners visit daily.

### Added Columns

| Column | Description |
|--------|-------------|
| Type | Color-coded order type badge (Subscription Purchase, Renewal, Trial, Upgrade, Credit Purchase, Other) |
| Coupon | Coupon code used on the order (if any) |

### 3 Filter Dropdowns

1. **Order Type** — filter by subscription purchase, renewal, trial, upgrade, credit purchase, or other
2. **Subscription Product** — filter orders related to a specific subscription product
3. **Coupon Used** — filter orders that used a specific coupon code

### Embedded Statistics Panel

- Collapsible statistics report panel built into the orders list page
- Shows revenue breakdown, order counts, and averages for the selected date range
- No need to navigate away from the orders screen

### Order Type Backfill Tool

- **Batch processes 200 orders at a time** to classify historical orders that existed before the analytics module was installed
- Progress indicator shows completion percentage
- Runs once; can be re-triggered from settings if needed

---

## Retention Analytics (Free)

A dedicated analytics dashboard focused entirely on cancellation patterns and retention performance.

### 8 KPI Cards

| KPI | Description |
|-----|-------------|
| Total Cancellations | Total cancellations in the selected period |
| Retention Offers Shown | Number of times a retention offer was displayed |
| Offers Accepted | Number of accepted retention offers |
| Save Rate | Percentage of cancellation attempts that were saved |
| Discounts Given | Number of discount retention offers accepted |
| Pauses Given | Number of pause retention offers accepted |
| Downgrades Given | Number of downgrade retention offers accepted |
| Support Redirects | Number of times customers were redirected to support |

### Visual Charts

- **Churn Reasons** pie chart — breakdown of why customers cancel
- **Retention Offer Distribution** pie chart — which offer types are most accepted
- **Trend line chart** — cancellations vs saves plotted over time

### Activity Logs

- Paginated table of all retention events
- Each entry includes: subscription ID, customer, product, event type, reason, offer shown, offer outcome, timestamp
- Click any entry to expand full metadata

### Product Filter

- Filter all retention analytics by specific product IDs
- Compare retention performance across different subscription products
- Custom date range selection

### Auto-Backfill

- Automatically processes historical cancellation data from before the module was installed
- Scans existing cancelled subscriptions and populates the retention analytics database
- One-time batch operation, processes 50 records per batch

---

## Order Type Classification

The foundation that powers all analytics. Every WooCommerce order is automatically classified into one of six subscription-relevant types.

### 6 Order Types

| Type | Description |
|------|-------------|
| Credit Purchase | Store credit purchase order |
| Subscription Trial | Trial sign-up order ($0 or sign-up fee only) |
| Subscription Renewal | Recurring renewal payment |
| Subscription Upgrade | Plan switch/upgrade order |
| Subscription Purchase | Initial subscription purchase |
| Other | Non-subscription order |

### How It Works

- **Priority-based classification engine** — checks order type from highest to lowest priority to resolve ambiguity
- **Auto-assigned at order creation** — no manual tagging required
- **Backfill tool** for pre-existing orders that were created before ArraySubs was installed

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Reports Hub (40+ links, 12 categories) | ✅ | ✅ |
| Retention Analytics (8 KPIs, charts, logs) | ✅ | ✅ |
| Order Type Classification | ✅ | ✅ |
| Subscription Performance Dashboard (10 KPIs, 6 charts, 5 leaderboards) | — | ✅ |
| WooCommerce Analytics Extension (type column, revenue cards, filters) | — | ✅ |
| Order List Enhancements (columns, filters, statistics panel) | — | ✅ |
| Order Type Backfill Tool | — | ✅ |
