# Research dossier: WooCommerce Subscription Launch Readiness Checklist (A015)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/015-woocommerce-subscription-launch-readiness-checklist.md`  
**Primary keyword:** `WooCommerce subscription launch checklist`  
**Evidence standard:** official WooCommerce and WordPress operational documentation plus current ArraySubs code/manual evidence. No live launch-readiness claim is made without a dated transaction test.

## Direct-answer conclusion (40–60 words)

> A WooCommerce subscription launch is ready only when the team has proved the complete loop: clear product and policy terms, initial checkout, subscription and order records, scheduled renewal, automatic or manual collection, failure recovery, emails, portal controls, fulfillment or access, monitoring, and rollback. A successful first order alone does not prove recurring billing is safe.

## Verification scope

Repository inspection on 2026-07-13 confirmed ArraySubs core 1.8.9 and Pro 1.1.0. The code/manual pass verified core scheduling, renewal-order creation, manual invoice fallback, grace handling, portal and notes, plus Pro automatic-payment paths for Stripe, PayPal, and Paddle and the Gateway Health UI.

This dossier did **not** execute a live signup, automatic charge, webhook, manual payment, decline, retry, cancellation, refund, shipment, tax, or access-control test. Therefore the article must present a repeatable readiness protocol, not say that a particular store has passed it. Before publication, add a current controlled test record if the article includes observed screenshots or results.

## Key takeaways

1. Launch readiness is evidence, not configuration: retain order IDs, subscription IDs, action IDs, gateway event IDs, emails, and screenshots.
2. Test the exact production combination of product model, checkout, gateway extension, payment method, country, currency, tax, shipping, and customer state.
3. WP-Cron is traffic-triggered and may run late; scheduled renewal operations need a reliable runner and overdue-action monitoring.
4. Automatic and manual renewals are different customer journeys and require separate tests.
5. Rollback must stop new risk without corrupting existing agreements, gateway schedules, tokens, webhooks, or queued actions.

## Seven launch gates

| Gate | Must be true | Proof artifact |
| --- | --- | --- |
| 1. Offer and policy | Price today, renewal amount/date/cadence, trial, fee, duration, cancellation, refund, shipping/access are coherent | Approved product page, checkout, policy, and email copy |
| 2. Catalog and checkout | Every product/variation produces the intended cart and checkout totals | Screenshots and test order for each representative model |
| 3. Gateway and payment | Exact payment method works for signup and its intended renewal mode | Sandbox transaction, stored method/remote ID, gateway event/log |
| 4. Scheduling | Renewal invoice/payment/end actions exist and execute at the right time | Action Scheduler before/after evidence and order notes |
| 5. Lifecycle and records | Parent order, subscription, renewal order, statuses, dates, and totals remain linked | ID map and lifecycle timeline |
| 6. Experience and operations | Emails, portal, access, fulfillment, tax, shipping, and support handoff work | Customer/admin screenshots and fulfillment/access evidence |
| 7. Monitoring and rollback | Named owner sees failures and can safely pause sales/automation and restore | Runbook, alerts, dashboard, backup/restore result |

## Gate 1: product, pricing, and policy checklist

- Define the model: open-ended recurring, finite recurring, prepaid, lifetime, or an actual installment agreement.
- Confirm product/variation price, recurring cadence, length, trial, sign-up fee, different renewal price, coupons, quantities, and taxes.
- Show amount today and later amount/cadence consistently on product, cart, checkout, confirmation, account, and email screens.
- State whether payment is automatic or requires a manual invoice.
- Define when access or delivery begins, continues during grace, and ends after cancellation, expiry, refund, or failure.
- Publish cancellation effective time, refund eligibility, renewal reminder policy, shipping cutoff, address-change effect, and support contact.
- Obtain appropriate legal, tax, accounting, and privacy review. A checklist is not jurisdiction-specific advice.

## Gate 2: catalog and checkout matrix

At minimum, test each applicable case:

| Scenario | Today | Later | Critical assertion |
| --- | --- | --- | --- |
| Standard recurring | Full recurring amount | Same recurring amount | Date and cadence match product |
| Free trial | Fee/shipping/tax only or $0 | Recurring amount after trial | Payment method and conversion path work |
| Sign-up fee | Fee + first period | Recurring amount | Fee appears only as intended |
| Different renewal price | Initial price | Explicit later price | Every screen distinguishes them |
| Finite term | First charge | Remaining fixed count | Expiry and total-count semantics are correct |
| Manual renewal | Initial checkout | Customer-paid renewal order | Pay URL, email, and account action work |
| Automatic renewal | Initial checkout | Off-session/provider charge | Saved context, webhook/result, and status work |
| Synced renewal | Full/prorated first charge | Shared boundary | Gateway eligibility and boundary math are correct |
| Physical recurring | Product + shipping + tax | Renewal shipment/order | address, stock, tax, and fulfillment work |

Also test variable selection, mixed carts, multiple subscriptions, $0/coupon cases, guest restrictions, duplicate submit, mobile, keyboard, and localization where supported by the exact stack.

## Gate 3: gateway, token, and webhook checklist

- Confirm the exact extension and payment method support automatic renewal; a gateway brand alone is insufficient.
- Use sandbox/test credentials and a real supported test method.
- Verify checkout creates the expected gateway customer/payment method/mandate or remote subscription context.
- Confirm customers can update or replace payment details when supported.
- Execute a renewal through the documented scheduled path, not only an admin status change.
- Verify gateway result or webhook updates the matching Woo order and subscription once.
- Replay or duplicate a webhook safely; expect idempotent handling, not a second order/charge.
- Test invalid signature, delayed delivery, out-of-order event, network timeout, and recovery where tooling permits.
- Confirm logs omit secrets and payment data while retaining usable event and order references.
- Document who owns the billing clock: the site or the provider. PayPal/Paddle gateway-managed behavior must not be treated as ArraySubs-managed Stripe behavior.

Current ArraySubs boundary: core can create manual renewal invoices and pay URLs. Pro supplies current automatic-payment implementations for Stripe, PayPal, and Paddle. Gateway capability varies by method and feature; test the exact path.

## Gate 4: scheduling and cron

WordPress officially describes WP-Cron as a page-load-triggered scheduler, not a continuously running system cron. Low-traffic sites may execute due work late. For production, use the host’s supported system scheduler or equivalent reliable trigger and monitor the queue; the appropriate frequency depends on the store’s service requirement and infrastructure.

ArraySubs core uses centralized Action Scheduler hooks, including an invoice-generation action before the due date and a payment-processing action at the due time. The test should prove:

1. `_next_payment_date` is correct in UTC and displayed correctly in the site timezone.
2. invoice and payment actions are scheduled with the expected arguments/group.
3. the invoice action creates one pending renewal order and records its ID.
4. the due action processes that order rather than duplicating it.
5. a missed invoice can be recovered by the periodic safety net.
6. cancellation, pending cancellation, lifetime, expired, and paid states do not create inappropriate future charges.
7. an overdue or failed action appears in the operational view with enough context to investigate.

Do not claim that the staging protections documented for WooCommerce Subscriptions automatically exist in ArraySubs. Prove the selected engine’s behavior before cloning production data.

## Gate 5: lifecycle and record assertions

Record this ID map for every test:

```text
Customer ID/email:
Product/variation ID:
Parent order ID:
Subscription ID:
Renewal order ID(s):
Action Scheduler action ID(s):
Gateway customer/payment/remote subscription ID (redacted):
Webhook/event ID:
```

Expected record path:

```text
checkout → parent order → subscription → scheduled invoice/payment actions
         → renewal order → automatic charge OR customer pay link
         → paid/failure state → next date/retry/grace/end
```

Assert that:

- one initial order can link to multiple subscriptions where supported;
- each renewal order links to one subscription/cycle;
- subscription status is not inferred solely from order fulfillment status;
- positive paid renewals advance the schedule once;
- late/manual payment uses the engine’s documented schedule policy;
- failure does not grant or remove access earlier/later than policy;
- refunding the correct transaction has the intended lifecycle effect;
- cancellation at period end differs from immediate cancellation and expiry.

## Gate 6: customer and operational experience

### Customer portal

Test visibility and permission for: status, next payment, amount, related orders, pay/retry, payment-method change, billing/shipping address, cancellation, pause/skip, plan switch, auto-renew toggle, and notes. Available actions must match product, gateway, settings, and state.

### Emails

Capture initial order, activation, trial, upcoming renewal, manual invoice, successful renewal, failure/retry, grace/on-hold, cancellation, and expiration emails that apply. Verify recipient, subject, amounts, dates, pay/account links, branding, localization, and deduplication.

### Access, shipping, inventory, and tax

- Test entitlement in every state and after recovery.
- Verify one-time versus recurring shipping and the renewal address source.
- Confirm renewal order stock and fulfillment behavior for physical goods.
- Test representative taxable locations and both initial and renewal totals.
- Have qualified advisers confirm policy/tax treatment; software behavior is not legal or tax advice.

## End-to-end test scripts

### Script A: successful automatic renewal

1. Create a clean customer and place a sandbox signup with the exact production method.
2. Record totals, records, payment metadata, next date, actions, emails, access, and portal state.
3. Trigger/wait for the documented renewal action.
4. Verify one renewal order, one provider charge/event, correct order status/notes, and correct subscription history.
5. Confirm next actions/dates, email, access, shipping, tax, and analytics classification.

### Script B: manual renewal

1. Create a manual-renewal subscription.
2. Let the invoice action generate a pending renewal order.
3. Confirm email and My Account expose the authenticated pay path.
4. Pay with an allowed checkout method.
5. Verify the same completion assertions and that a second payment cannot be made.

### Script C: decline and recovery

1. Use an official failing test method or controlled failure.
2. Verify failed/pending status, notes, notification, retry action, access/grace state, and customer recovery path.
3. Replace/fix payment and retry.
4. Verify one successful order/charge, cleanup of pending/retry markers, restored status/access, and next date.

### Script D: cancellation and rollback-safe end

Test both immediate and period-end cancellation if supported. Confirm queued actions are adjusted, no new charge occurs after effective end, access ends at policy time, customer/admin displays agree, and history remains auditable.

## Launch-day monitoring board

| Signal | Owner | First response |
| --- | --- | --- |
| Past-due/failed scheduled actions | Engineering/ops | inspect action, subscription, order notes, cron runner |
| Renewal orders awaiting manual payment | Support/finance | confirm invoice delivery and valid pay link |
| Gateway/webhook failures | Payments owner | compare provider event to local order/subscription |
| Duplicate/missing renewal orders | Engineering | stop unsafe retries, preserve IDs/logs, inspect idempotency |
| Email delivery failure | Marketing/ops | verify mail logs/provider and use alternate customer notice if approved |
| Access/fulfillment mismatch | Support/operations | preserve customer service while reconciling lifecycle state |
| Unexpected refund/cancellation contacts | Product/legal | inspect page/checkout disclosure and affected cohort |

Do not invent alert thresholds before baseline data exists. Start with zero-tolerance alerts for duplicate charges and unsigned/invalid webhook processing, then set queue/failure thresholds from tested SLAs and volume.

## Rollback runbook principles

- Name the person authorized to stop new subscription sales.
- Separate “disable new checkout” from “disable renewals”; existing customer obligations may require renewals to continue.
- Know whether the gateway or the site owns future billing before disabling a plugin or webhook.
- Take and test recoverable backups, but remember that restoring old order/subscription data can conflict with live gateway transactions.
- Preserve queued actions, provider events, order/subscription IDs, and logs before intervention.
- Have a customer communication and refund/remediation plan.
- Document re-enable criteria and a reconciliation query/report.
- Never bulk cancel, delete orders, clear schedules, rotate webhook secrets, or restore a production database as a casual first response.

## Limitations and unknowns

- This research contains no live pass/fail result for the local or production store.
- WooCommerce Subscriptions official guides describe that product; use them as methodology and terminology, not proof of ArraySubs behavior.
- Exact gateway, SCA, tax, shipping, email, retry, and portal behavior changes by version, country, method, and configuration.
- A test-mode success does not prove production bank behavior, but it is the minimum reproducible prelaunch evidence.
- Staging clones can be dangerous when provider schedules/webhooks remain live.
- Cron frequency advice must follow hosting and workload constraints; “every minute” is not a universal requirement.
- Rollback may create contractual, accounting, and customer-service obligations. Obtain qualified review.

## Five FAQ answers

### Is one successful subscription checkout enough to launch?

No. It proves only the initial transaction. You must also prove the scheduled renewal, automatic or manual payment path, failure recovery, emails, records, customer controls, access/fulfillment, monitoring, and cancellation.

### How should I test a WooCommerce subscription renewal?

Use the gateway’s sandbox and the subscription engine’s documented scheduled-action path. Record the subscription, renewal order, scheduled action, gateway event, notes, next date, email, and customer access before and after.

### Does WP-Cron run exactly on time?

No. WordPress explains that WP-Cron is triggered by page loads, so due events can run late on low-traffic sites. Use a reliable host/system scheduler where appropriate and monitor overdue Action Scheduler jobs.

### What is the most dangerous staging mistake?

Allowing a production clone to retain live gateway credentials, webhooks, or scheduled renewals without proven safeguards. That can create duplicate customer communication or charges. Isolate credentials and prove the engine’s staging behavior.

### What should a subscription rollback stop first?

It depends on the incident. Usually stop the narrowest new risk—such as new signups or a failing payment path—while preserving existing records and obligations. First determine whether the site or gateway owns future billing.

## Visual plan

Flat ArraySubs palette; no gradients, neon, shadows, glass, or generated text.

1. Hero: launch-control desk with human operator, storefront, calendar, payment, email, parcel, and portal icons.
2. Seven-gate horizontal stage flow with evidence checkmarks.
3. Readiness radar is **not** recommended because unweighted scores can imply false precision; use a binary evidence matrix instead.
4. Test-coverage bar chart: scenarios planned/passed/blocked from a real test record only—no invented values.
5. Renewal evidence flowchart: action → order → gateway/manual pay → state → next action.
6. Automatic/manual split flow.
7. Failure/recovery swimlane across customer, site, gateway, and support.
8. Cron diagram: traffic/system trigger → WP-Cron → Action Scheduler → renewal action.
9. Launch-day monitoring board with four flat status cards.
10. Rollback decision flow: new sales, site-scheduled renewals, gateway-managed billing, customer communication.
11. Dated ArraySubs screenshots: global settings, product tab, portal, Gateway Health, Scheduled Job Logs, renewal detail.

## Internal links

- Commercial context after the readiness framework: `/deals/arraysubs/`
- Product/checkout feature context: `/deals/arraysubs/features/#products-checkout`
- Representative setup recipes: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`, `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`, `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- Siblings: A001 complete guide, A002 concepts, A003 product types.

## Primary sources (accessed 2026-07-13)

1. WooCommerce, “Testing Subscription Renewal Payments”: https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/
2. WooCommerce, “Scheduled Action Errors”: https://woocommerce.com/document/subscriptions/scheduled-action-errors/
3. WooCommerce, “How Subscriptions Handles Staging Sites”: https://woocommerce.com/document/subscriptions/subscriptions-handles-staging-sites/
4. WooCommerce, “Subscriptions Troubleshooting Framework”: https://woocommerce.com/document/subscriptions/troubleshooting-framework/
5. WooCommerce, “Understanding the WooCommerce System Status Report”: https://woocommerce.com/document/understanding-the-woocommerce-system-status-report/
6. WooCommerce, “Webhooks”: https://woocommerce.com/document/webhooks/
7. WordPress Developer Resources, “Cron”: https://developer.wordpress.org/plugins/cron/
8. WordPress Developer Resources, “Hooking WP-Cron Into the System Task Scheduler”: https://developer.wordpress.org/plugins/cron/hooking-wp-cron-into-the-system-task-scheduler/
9. WP-CLI, “wp cron”: https://developer.wordpress.org/cli/commands/cron/
10. ArraySubs renewal scheduler: `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`
11. ArraySubs renewal processor: `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
12. ArraySubs payment processor: `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`
13. ArraySubs manuals: `user-manual/markdowns/getting-started/cron-job-setup.md`, `user-manual/markdowns/gateway-health/README.md`, `user-manual/markdowns/audits-and-logs/scheduled-job-logs.md`

