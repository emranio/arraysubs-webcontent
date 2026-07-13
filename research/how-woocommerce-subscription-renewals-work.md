# Research dossier: How WooCommerce Subscription Renewals Work (A017)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/017-how-woocommerce-subscription-renewals-work.md`  
**Primary keyword:** `how WooCommerce subscription renewals work`  
**Evidence policy:** official WooCommerce Subscriptions documentation for shared terminology and that extension’s behavior; current ArraySubs core/Pro code and manuals for ArraySubs-specific behavior. Deviations are labeled.

## Direct-answer conclusion (40–60 words)

> A WooCommerce subscription renewal turns a due date into a new renewal order, then collects payment automatically through a compatible saved method or waits for the customer to pay manually. A successful payment updates the order and subscription, records the cycle, and schedules the next event; failure enters the engine’s retry, grace, notice, or hold policy.

## Key takeaways

1. The subscription is the continuing agreement and schedule; each renewal order is a transaction record for one cycle.
2. The scheduler creates or finds the due renewal order; the gateway/payment path settles it. These are separate stages.
3. Automatic renewal requires exact gateway/method capability and stored remote context; manual renewal sends the customer back to a pay flow.
4. Order payment success and subscription lifecycle state are related but not identical; a paid processing order can still await fulfillment while the subscription is active.
5. ArraySubs advances from the scheduled due date after a late payment; WooCommerce Subscriptions documents a different default for non-aligned subscriptions. Label the engine.

## Terminology

| Term | Meaning |
| --- | --- |
| Subscription product | Purchasable plan/default pricing and schedule rules |
| Subscription | Continuing customer agreement, status, next date, payment context, and history |
| Parent/initial order | Transaction created at signup checkout |
| Renewal order | Separate Woo order for a later billing cycle |
| Next payment date | Schedule point at which the next renewal is due |
| Automatic renewal | System/provider attempts payment without a new customer checkout action |
| Manual renewal | Customer must open the renewal order/pay URL and choose/confirm payment |
| Retry/grace | Engine-specific recovery window and future payment attempts after failure |

Official Woo terminology is useful but storage differs: WooCommerce Subscriptions implements its subscription object as an order-derived object; ArraySubs currently stores a subscription as a `WP_Post` custom record and uses Woo orders for transactions. Do not call the ArraySubs subscription record an order.

## Generic renewal lifecycle

```text
subscription reaches invoice/due window
  → scheduler creates or finds renewal order
  → order copies current renewal item/price/address/shipping/payment context
  → automatic path OR manual customer-pay path
  → success: paid order + subscription history/date/state update
  → failure: notes/notices/retry/grace/on-hold/cancel policy
  → next scheduled cycle or defined end
```

The exact timing, retry count, status names, address/tax snapshot, and next-date rule are product-specific.

## ArraySubs 1.8.9 renewal sequence, verified from code

### 1. Schedule state

The subscription stores `_next_payment_date` in UTC. `RenewalScheduler::schedule()` aligns two actions:

- `ActionScheduler::HOOK_GENERATE_RENEWAL_INVOICE` at the configured lead time before due;
- `ActionScheduler::HOOK_PROCESS_RENEWAL` at the due timestamp.

An hourly upcoming-renewals process acts as a recovery net for an invoice action that did not create its order.

### 2. Eligibility and duplicate prevention

`RenewalProcessor::createRenewalInvoice()` checks the subscription is in a billable active/trial state, not lifetime, not pending cancellation, and does not already have an equivalent pending renewal order. Scheduler/processor locks and the pending-order pointer provide idempotency protection.

### 3. Renewal-order creation

`OrderCreation::createRenewalOrder()` creates a pending `WC_Order` from the subscription’s current stored context, including product/variation, quantity, recurring price, addresses, shipping, payment method, and token/remote metadata where applicable. Pending plan-switch/retention changes can affect the invoice.

The order is stamped with:

```text
_is_renewal_order = yes
_subscription_id = one subscription ID
_subscription_renewal = renewal marker
_renewal_cycle_number = cycle number
_renewal_scheduled_date = due date
```

The subscription stores `_pending_renewal_order_id` until settlement/cleanup and tracks related order history.

### 4. Due-time processing

`RenewalProcessor::process()` finds or creates the due order. For retries it can perform a pre-retry charge verification, then passes the order to `PaymentProcessor`.

### 5. Payment routing

`PaymentProcessor` handles three cases:

1. **Already paid:** returns success without charging again.
2. **Zero total:** marks paid without a gateway charge.
3. **Positive total:** asks Pro filters whether an automatic gateway should handle it; otherwise adds a manual-payment note and returns the Woo order pay URL.

Current Pro automatic paths are Stripe, PayPal, and Paddle. They do not share one ownership model: current first-party docs describe Stripe as ArraySubs-scheduled/off-session, while PayPal and Paddle can be provider-scheduled/webhook-driven. The article must not imply the local due action always initiates every provider charge.

### 6. Successful payment

Woo order status transitions to `processing` or `completed` enter `OrderIntegration::processRenewalPayment()`. The handler:

- records last payment and positive payment count;
- adds the order to subscription history;
- clears pending order, retry, and on-hold markers;
- applies a deferred plan switch if relevant;
- calculates/schedules the next payment;
- activates a trial/on-hold subscription when applicable;
- adds notes and fires completion hooks.

### 7. Schedule after late payment: important deviation

ArraySubs calculates the next date from the **scheduled renewal due date**, not from the later settlement timestamp. Hypothetical monthly example:

```text
scheduled due: July 1
manual payment received: July 8
next scheduled due in ArraySubs: August 1
```

WooCommerce Subscriptions’ renewal-process documentation says its default non-synchronized behavior normally calculates from the last actual payment date; aligned subscriptions preserve the aligned schedule. The article must name the engine before stating either rule.

### 8. Failure, grace, and recovery

ArraySubs’ overdue process can retain active status for a configured active grace window, then move on hold, and cancel after an on-hold grace window. Paid renewal recovery clears relevant markers and restores state. Exact settings, gateway behavior, notices, and access policy must be verified on the store.

## Automatic-renewal path

```text
due renewal order
  → compatible automatic handler?
  → valid saved/remote payment context?
  → site-managed off-session attempt OR provider-managed billing event
  → immediate result and/or authenticated webhook
  → matching order paid/failed once
```

Critical controls:

- gateway/method capability checked at signup and renewal;
- valid remote customer/payment method/mandate/subscription ID;
- webhook signature verification and idempotency;
- handling of delayed, duplicate, and out-of-order events;
- SCA/3DS `requires_action` recovery;
- no local double charge when the provider owns timing;
- actionable notes/logs linked to order and subscription.

## Manual-renewal path

```text
invoice action → pending renewal order → email/My Account pay link
  → authenticated customer chooses supported checkout method
  → Woo order payment completion → subscription advances
```

Manual renewal can broaden payment choice and support approval/invoice workflows, but it adds action each period and delays collection until the customer returns. The renewal order should remain the transaction being paid; do not create an unrelated normal order as a workaround.

## What is copied and what can change

The broad model is a snapshot at each transaction, but implementation details vary:

- product/variation and quantity may come from the subscription’s current plan rather than today’s catalog default;
- recurring price may be a stored subscription value and can differ from the current product price;
- address, tax, coupon, and shipping behavior can vary between automatic and manual paths and by engine;
- a pending plan switch can change the next invoice;
- gateway-managed providers may be the source of truth for timing/amount in some paths.

Therefore support should compare the subscription, renewal order, scheduled action, gateway event, and notes rather than assuming the product page reflects an existing subscriber’s contract.

## Worked timeline

Hypothetical $40/month ArraySubs subscription, invoice lead time 3 days, no tax/shipping:

| Date | Event | Record/evidence |
| --- | --- | --- |
| Jun 1 | Signup paid | parent order #500, subscription #900, next date Jul 1 |
| Jun 28 | Invoice action | pending renewal order #550, scheduled date Jul 1 |
| Jul 1 | Due action | automatic attempt or manual-required result |
| Jul 1 | Automatic success | order #550 paid; history updated; next date Aug 1 |
| Jun 28–Jul 8 | Manual alternative | invoice stays pending until customer pays |
| Jul 8 | Late manual success | order #550 paid; ArraySubs next date remains Aug 1 |

The dates/IDs are illustrative. Tax, shipping, coupon, sync, gateway, grace, and provider ownership can change the path.

## Verification checklist

1. Record product, customer, parent order, subscription, scheduled actions, renewal order, and provider event IDs.
2. Confirm next date/time in UTC and the displayed site timezone.
3. Verify one invoice order appears before/on due according to lead-time settings.
4. Check items, quantities, price, tax, shipping, address, coupon, and payment context.
5. Execute the exact automatic or manual path.
6. Verify one charge, correct order status/notes, history, last/next date, email, portal, access, and fulfillment.
7. Test failure/retry/recovery and duplicate event/action protection.
8. Test cancellation/end behavior before the next cycle.

## Limitations and unknowns

- No live renewal was executed for this dossier.
- WooCommerce Subscriptions behavior must not be presented as universal WooCommerce behavior.
- Gateway availability and SCA/retry behavior vary by exact extension, method, country, currency, and version.
- Tax, shipping, address, coupon, stock, and refund effects require a representative store test.
- ArraySubs’ hourly recovery and grace behavior depend on a functioning scheduler and current settings.
- Provider-managed PayPal/Paddle and site-managed Stripe need separate diagrams or labels.
- Access policy is an application decision; payment state alone does not define every entitlement.

## Five FAQ answers

### What creates a WooCommerce renewal order?

The subscription engine’s scheduler or a gateway-managed event creates/finds the renewal transaction when a cycle is due. In ArraySubs core, scheduled invoice processing creates a pending Woo order before due and payment processing settles it.

### Is a renewal order the same as the subscription?

No. The subscription is the ongoing agreement and schedule. A renewal order records one billing-cycle transaction. ArraySubs stores the subscription as a custom `WP_Post` record and the renewal as a `WC_Order`.

### What happens when an automatic renewal fails?

The exact engine/gateway policy controls order status, notices, retries, grace, on-hold state, and eventual cancellation. The store should expose a customer recovery path and monitor the action and gateway logs.

### Can a customer pay a subscription renewal manually?

Yes when the engine supports manual renewal. It creates a pending renewal order and sends/exposes an authenticated pay URL so the customer can choose an allowed checkout payment method.

### Does a late renewal move every future date later?

It depends on the engine and synchronization policy. ArraySubs 1.8.9 advances from the scheduled due date, preserving cadence. WooCommerce Subscriptions documents a default based on actual payment for non-aligned subscriptions. Verify the installed system.

## Visual plan

Flat ArraySubs palette, no gradients/glow/3D.

1. Hero: human operator watching calendar → order → payment loop.
2. Full renewal lifecycle flowchart with automatic/manual branch and recovery loop.
3. Two-action timeline: invoice lead-time action versus due-time action.
4. Record relationship cards: subscription agreement, parent order, renewal order.
5. Automatic versus manual swimlane.
6. Site-managed Stripe versus provider-managed PayPal/Paddle ownership diagram.
7. Hypothetical timeline with order IDs.
8. Late-payment comparison bar/timeline: scheduled-date preservation versus actual-payment reset; label by engine.
9. Failure-state flow: active grace → on hold → cancellation/recovery.
10. Dated screenshots of renewal settings, jobs, detail, order classification, and communication logs.

## Internal links

- Commercial overview: `/deals/arraysubs/`
- Subscription operations: `/deals/arraysubs/features/#subscription-operations`
- Recipes: `/deals/arraysubs/use-cases/recipes/switch-at-renewal/`, `/deals/arraysubs/use-cases/recipes/downgrade-with-credit/`, `/deals/arraysubs/use-cases/recipes/subscription-notes-timeline/`
- Siblings: A018 manual vs automatic, A019 record types, A020 renewal synchronization.

## Primary sources (accessed 2026-07-13)

1. WooCommerce, “Understanding the Subscription Renewal Process”: https://woocommerce.com/document/subscriptions/renewal-process/
2. WooCommerce, “Subscription Payment Gateways”: https://woocommerce.com/document/subscriptions/payment-gateways/
3. WooCommerce, “Testing Subscription Renewal Payments”: https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/
4. WooCommerce, “Subscriptions Troubleshooting Framework”: https://woocommerce.com/document/subscriptions/troubleshooting-framework/
5. WooCommerce, “Subscription Status Guide”: https://woocommerce.com/document/subscriptions/statuses/
6. WooCommerce, “Subscriptions Data Structure & Storage”: https://woocommerce.com/document/subscriptions/develop/data-structure/
7. WooCommerce, “Subscription Product vs. Subscription”: https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/
8. ArraySubs scheduler: `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`
9. ArraySubs renewal processor: `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
10. ArraySubs order creation: `arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`
11. ArraySubs payment routing: `arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`
12. ArraySubs completion integration: `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
13. ArraySubs manuals: `user-manual/markdowns/billing-and-renewals/renewal-operations.md`, `user-manual/markdowns/billing-and-renewals/recovery-and-grace-flows.md`, `user-manual/markdowns/billing-and-renewals/renewal-communication.md`

