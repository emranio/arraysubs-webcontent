# Audits & Logs

> Full visibility into every change, every scheduled job, and every gateway interaction — so nothing happens in the dark.

**Tier**: Pro (Activity Audits, Scheduled-Job Logs, Gateway Health Dashboard) + Troubleshooting Guides

---

## Activity Audits (Pro)

A centralized audit timeline that records every meaningful action across subscriptions, members, orders, payments, store credit, and settings.

### What Gets Tracked

Every audit entry captures: who did it, what changed, the old value, the new value, and when it happened.

#### 8 Entity Types

| Entity | Examples of Tracked Events |
|--------|---------------------------|
| Subscription | Status changes, cancellations, reactivations, plan switches, pause/resume, skip/undo |
| Order | Renewal invoice creation, payment completion, refund processing |
| Customer | Profile updates, role changes, account creation |
| Payment | Payment attempts, successes, failures, method changes |
| Store Credit | Credit issued, applied, expired, admin adjustments |
| Refund | Refund initiated, processed, refund-to-credit conversion |
| Settings | Plugin setting changes with old/new values |
| Feature Entitlement | Feature access granted, revoked, or modified |

#### 4 Author Role Indicators

Each log entry is attributed to one of four actor types:

| Role | Description |
|------|-------------|
| Customer | Action initiated by the subscriber (cancel, pause, update payment method) |
| Admin | Action taken by a store administrator |
| System | Automated action from scheduled jobs (renewal processing, trial conversion, expiration) |
| Gateway | Action triggered by payment gateway webhook (payment confirmation, dispute, refund) |

### Filtering & Navigation

- **Date range** picker for time-bounded searches
- **Entity type** filter — show only subscription events, payment events, etc.
- **Author role** filter — isolate customer actions vs system automation vs admin changes
- **Subscription ID** search — see the full audit trail for a single subscription
- **Customer** search — see everything related to a specific member
- **30 entries per page** with pagination

### Configuration

- Enable/disable logging per entity type
- Configurable retention period for log cleanup

---

## Scheduled-Job Logs (Pro)

Complete visibility into the Action Scheduler jobs that power ArraySubs automation — renewals, trial conversions, email reminders, status transitions, and maintenance tasks.

### 20+ Job Types Across 6 Categories

| Category | Jobs |
|----------|------|
| Renewals | Generate Upcoming Renewals, Process Renewal |
| Billing | Check Overdue Renewals, Process Trial Conversions |
| Emails | Send Renewal Reminder, Send Payment Failed, Send Expiring Soon |
| Status | Cancel Subscription, Hold Subscription, Expire Subscription |
| Retry | Retry Payment |
| Maintenance | Cleanup Old Data |

### Job Status Tracking

Every scheduled job is logged with its execution result:

| Status | Meaning |
|--------|---------|
| Pending | Job is scheduled but hasn't run yet |
| In-Progress | Job is currently executing |
| Complete | Job finished successfully |
| Failed | Job encountered an error (with error message captured) |
| Cancelled | Job was cancelled before execution |

### Additional Details Per Job

- **Hook name** — the Action Scheduler hook that fired
- **Arguments** — subscription ID or other parameters passed to the job
- **Group** — which job category it belongs to
- **Execution duration** — how long the job took to complete
- **Error message** — captured on failure for debugging
- **Human-readable labels** — technical hook names are translated to friendly labels (e.g., `HOOK_PROCESS_RENEWAL` → "Process Renewal")

### Filtering

- Filter by **job group** (Renewals, Billing, Emails, Status, Retry, Maintenance)
- Filter by **status** (Complete, Failed, Pending)
- **Direct link** to the WordPress Action Scheduler admin page for advanced debugging

---

## Gateway Health Dashboard (Pro)

Monitor the connection status, capabilities, and webhook activity of every configured payment gateway from a single screen.

### Gateway Status Cards

One card per gateway (Stripe, PayPal, Paddle) showing:

| Field | Description |
|-------|-------------|
| Connection State | Current gateway status |
| Active Subscriptions | Number of subscriptions using this gateway |
| Last Webhook | Timestamp of the most recent webhook received |

### 5 Gateway States

| State | Meaning |
|-------|---------|
| Connected | Gateway is active and processing payments |
| Connected (Test Mode) | Gateway is connected but in sandbox/test mode |
| Needs Setup | Gateway credentials are missing or incomplete |
| Disabled | Gateway is installed but manually disabled |
| Unavailable | Gateway module is not installed or detected |

### Expanded Details

Click any gateway card to see:

- **Webhook URL** — copy-ready URL to paste into the gateway's dashboard
- **Capability badges** — visual indicators of what the gateway supports (auto-renew, pause, refund, card update, etc.)
- **Direct settings link** — jump to the gateway configuration page

### Webhook Event Log

- Paginated table showing every webhook received (50 events per page)
- **Gateway filter** — show events from a specific gateway only
- **Event type filter** — filter by webhook event type (payment success, dispute, refund, etc.)
- **30-day retention** — older events are automatically cleaned up
- **Signature verification status** — each event shows whether its cryptographic signature was valid

### Post-Setup Verification

After configuring a gateway, the dashboard helps verify everything is working:

1. Check the connection state turns green
2. Verify the webhook URL is configured in the gateway dashboard
3. Process a test transaction and confirm the webhook appears in the event log
4. Review capability badges to understand what the gateway can and cannot do

---

## Troubleshooting Guides

Built-in diagnostic guidance for common operational issues.

### Renewal Failures

- Diagnose why a renewal payment failed
- Check gateway logs, payment method status, subscription state
- Identify whether the issue is gateway-side, customer-side, or configuration-side

### Portal Action Failures

- Troubleshoot customer portal actions that don't work as expected
- Check permission settings, subscription eligibility, and cooldown rules

### Access-Rule Conflicts

- Debug member access rules that overlap or conflict
- Understand AND/OR logic evaluation order
- Resolve nested group priority issues
- Identify which rule takes precedence

### Payment and Shipping Issues

- Diagnose payment processing errors
- Troubleshoot shipping address update failures
- Verify gateway webhook connectivity

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Activity Audits (8 entity types, 4 roles, filters) | — | ✅ |
| Scheduled-Job Logs (20+ job types, 6 categories) | — | ✅ |
| Gateway Health Dashboard (status, webhooks, capabilities) | — | ✅ |
| Troubleshooting Guides | — | ✅ |
