# Manage Subscriptions

> Complete subscription administration — list, search, create, edit, and manage every subscription from a powerful admin interface with full lifecycle control and detailed audit trails.

**Tier**: Free (Core Management) + Pro (Gateway Info, Checkout Fields, Shipping, Feature Log)

---

## All Subscriptions List (Free)

The central admin hub for viewing and managing every subscription in the store.

### 5 Columns

| Column | Description |
|--------|-------------|
| Subscription | Subscription ID + product name |
| Customer | Customer name linked to their profile |
| Recurring Amount | Price per billing cycle |
| Next Payment | Next scheduled payment date |
| Start Date | When the subscription was created |

### 7 Status Tabs

| Tab | Description |
|-----|-------------|
| All | Every subscription regardless of status |
| Active | Currently active and billing |
| Trial | In trial period, not yet billing |
| On-Hold | Paused due to non-payment or admin action |
| Cancelled | Cancelled by customer, admin, or system |
| Expired | Reached end date or subscription length |
| Pending | Awaiting initial payment or activation |

### Search & Export

- **Search** by subscription ID, customer name/email, or product name
- **CSV Export** with 15 fields covering all subscription data
- **JSON export** endpoint for programmatic access

---

## Create & Edit Subscription (Free)

Admins can create subscriptions manually and edit any subscription field.

### Admin-Created Subscriptions

Create a subscription directly from the admin without going through checkout:

- Customer selection
- Product selection
- Status assignment
- Date configuration (start, next payment, end, trial end)
- Billing configuration (amount, period, interval)

### Edit Subscription

Every subscription field is editable from the admin detail screen, including status, dates, billing configuration, customer, and product assignment.

---

## Subscription Detail Screen (Free + Pro)

A comprehensive admin view of a single subscription with all related data.

### Header

- Status badge with color coding
- 4 action buttons: Edit, Renew Now, Cancel, Trash

### 17 Information Cards

| Card | Description |
|------|-------------|
| Subscription Overview | ID, status, product, recurring amount, billing cycle |
| Customer Details | Name, email, link to customer profile |
| Product Details | Product name, variation, linked product info |
| Billing Schedule | Period, interval, next payment date, sync status |
| Dates | Start date, end date, trial end date, last updated |
| Related Orders | All linked WooCommerce orders (original, renewals, switches) |
| Refund History | All refunds with date, amount, and type |
| Subscription Notes | Timeline with author badges (Customer, Admin, System, Gateway) |
| Subscription Logs | Detailed activity log for this subscription |

### 7 Conditional Cards

These cards appear only when the relevant feature or data is present:

| Card | Condition | Tier |
|------|-----------|------|
| Cancellation Details | Subscription is cancelled or pending cancellation | Free |
| Sync Details | Renewal sync is active for this subscription | Free |
| Skip & Pause Info | Subscription has skip or pause history | Free |
| Coupon Discount | A coupon is applied to the subscription | Free |
| Payment Gateway | A payment gateway is connected | Pro |
| Checkout Builder Fields | Custom checkout fields exist on the subscription | Pro |
| Subscription Shipping | Shipping configuration is present | Pro |

---

## Lifecycle Management (Free)

### 6 Subscription Statuses

| Status | Color | Description |
|--------|-------|-------------|
| Active | Green | Subscription is active and billing normally |
| Trial | Blue | In free trial period, not yet billing |
| On-Hold | Yellow | Paused — typically from non-payment grace period |
| Cancelled | Red | Cancelled by customer, admin, or system |
| Expired | Gray | Reached fixed end date or subscription length |
| Pending | Orange | Awaiting initial payment or activation |

### Two-Phase Grace Period Timeline

When a renewal payment is missed:

```
Payment Due Date
       │
       ├── ACTIVE (3 days grace) ──► ON-HOLD (7 days grace) ──► CANCELLED
       │
    Day 0                        Day 3                        Day 10
```

Payment at any point during the grace period restores the subscription to Active.

### Cancellation Modes

- **Immediate cancellation** — subscription cancelled and access revoked right away
- **End-of-period cancellation** — subscription marked as "pending cancellation" and remains active until the end of the current billing period

### Expiration

- **Fixed end-date** — subscription expires on a specific date
- **Subscription length** — subscription expires after a set number of billing periods

### Automated Lifecycle

- **5 scheduled background jobs** handle lifecycle transitions automatically
- **16 email triggers** mapped to lifecycle events (13 customer + 3 admin)
- **Trial-to-paid conversion** via daily batch processing job

---

## Admin Tools (Free + Pro)

### Subscription Notes

Notes provide a complete audit trail of everything that happens to a subscription.

**4 Author Types:**

| Author | Description |
|--------|-------------|
| Customer | Actions taken by the customer (cancel, pause, skip, reactivate) |
| Admin | Actions taken by store administrators |
| System | Automated events (renewal, trial conversion, expiration, grace period) |
| Gateway | Payment gateway events (payment confirmed, dispute opened, webhook received) |

**21 Automated Note Events:**

| # | Event |
|---|-------|
| 1 | Subscription created |
| 2 | Status changed (any transition) |
| 3 | Subscription reactivated |
| 4 | Subscription put on hold |
| 5 | Waiting for cancellation (end-of-period) |
| 6 | Payment completed |
| 7 | Payment failed — manual payment |
| 8 | Payment failed — renewal attempt |
| 9 | Payment failed — gateway-initiated |
| 10 | Renewal invoice created |
| 11 | Trial started |
| 12 | Trial converted to paid |
| 13 | Product changed |
| 14 | Payment method changed |
| 15 | Next payment date changed |
| 16 | Quantity changed |
| 17 | Recurring amount changed |
| 18 | Subscription synced |
| 19 | Subscription unsynced |
| 20 | Plan switch completed |
| 21 | Coupon applied/removed |

### Feature Log (Pro)

When the Feature Manager module is active, the subscription detail screen shows a log of all entitlement changes — features added, removed, or modified over the subscription's lifetime.

### Order History

Related orders table with:

- Original purchase order
- All renewal orders
- Plan switch orders
- Refund sub-rows nested under their parent orders

### Export

- **CSV Export**: 15 fields covering subscription ID, customer, product, status, dates, billing, payment info, and more
- **JSON Export**: REST API endpoint for programmatic access to subscription data

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Subscriptions List (5 columns, 7 status tabs) | ✅ | ✅ |
| Search (ID, Customer, Product) | ✅ | ✅ |
| CSV & JSON Export | ✅ | ✅ |
| Create Subscription (Admin) | ✅ | ✅ |
| Edit Subscription | ✅ | ✅ |
| Subscription Detail (17 info cards) | ✅ | ✅ |
| 6 Lifecycle Statuses | ✅ | ✅ |
| Two-Phase Grace Period | ✅ | ✅ |
| Cancellation Modes (Immediate + End-of-Period) | ✅ | ✅ |
| 5 Background Lifecycle Jobs | ✅ | ✅ |
| Subscription Notes (4 author types, 21 events) | ✅ | ✅ |
| Related Orders & Refund History | ✅ | ✅ |
| Cancellation Details Card | ✅ | ✅ |
| Sync Details Card | ✅ | ✅ |
| Skip & Pause Info Card | ✅ | ✅ |
| Coupon Discount Card | ✅ | ✅ |
| Payment Gateway Card | — | ✅ |
| Checkout Builder Fields Card | — | ✅ |
| Subscription Shipping Card | — | ✅ |
| Feature Log | — | ✅ |
