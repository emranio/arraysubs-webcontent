# Research dossier: Subscription Order vs Renewal Order vs Parent Order (A019)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/019-subscription-order-vs-renewal-order-vs-parent-order.md`  
**Primary keyword:** `subscription order vs renewal order`  
**Terminology guardrail:** in ArraySubs, the subscription record is **not** a WooCommerce order. Use “subscription record” or “agreement,” not “subscription order.”

## Direct-answer conclusion (40–60 words)

> The parent order records the customer’s original checkout. The subscription record stores the ongoing agreement, status, schedule, and related history. Each renewal order records one later billing transaction. Support, refunds, reporting, and integrations should identify the record that owns the question instead of treating all three as one order.

## Core definitions

| Record | Represents | Primary questions | ArraySubs type |
| --- | --- | --- | --- |
| Parent/initial order | Signup checkout transaction | What was paid/ordered at signup? | `WC_Order` |
| Subscription record | Ongoing agreement and state | What is active, due next, paused/cancelled, and linked? | `WP_Post` custom record (`arraysubs_data`) |
| Renewal order | One later cycle’s transaction | What was invoiced/paid/refunded for this renewal? | `WC_Order` |

WooCommerce Subscriptions uses different internal storage: its subscription object extends Woo’s order abstraction. That official documentation is authoritative for Woo’s extension, not for ArraySubs. The article should explain the conceptual roles, then show the ArraySubs implementation separately.

## Checkout and renewal sequence

```text
subscription product in checkout
  → parent order #500
  → subscription record #900 linked to #500
  → next renewal invoice/order #550 linked to #900
  → later renewal order #600 linked to #900
```

One parent checkout can create more than one subscription in current ArraySubs paths, so the parent order uses a plural subscription-ID collection. A renewal order represents one subscription/cycle and uses a singular subscription ID.

## Current ArraySubs linkage contract

`arraysubs/src/functions/order-subscription-link.php` documents and resolves:

| Link | Metadata |
| --- | --- |
| Parent order → subscriptions | `_subscription_ids` array on order meta |
| Parent line item → subscription | `_subscription_id` on line item |
| Subscription → parent order | `_parent_order_id` on subscription meta |
| Renewal order → subscription | `_subscription_id` singular |
| Renewal classification | `_is_renewal_order = yes` |
| Renewal scheduled due | `_renewal_scheduled_date` |
| Subscription → current unpaid renewal | `_pending_renewal_order_id` |
| Subscription → related order history | `_order_ids` stored history |
| Plan switch/migration compatibility | `_arraysubs_subscription_id` may appear |

Use `arraysubs_get_subscription_ids_for_order()` instead of checking one guessed metadata key. It handles parent, renewal, line-item, legacy, and reverse-link cases.

## What data belongs to each record

### Parent order

- initial products/variations, quantities, fee/discount, shipping, tax, totals;
- initial payment transaction/status and order notes;
- signup billing/shipping identity snapshot;
- IDs of subscriptions created from checkout.

### Subscription record

- customer and current subscription status;
- product/variation and current recurring price/quantity;
- start, next payment, trial/end/cancellation dates;
- payment gateway/remote context;
- parent and related order IDs;
- pending renewal, retry/grace, plan-switch, notes, and lifecycle metadata.

### Renewal order

- one cycle’s invoiced items/price/tax/shipping/discount;
- payment method, transaction, order status, notes, refund;
- scheduled renewal date and cycle metadata;
- singular link to its subscription.

The current product’s catalog price is not necessarily the price of an existing subscription or past order. Each transaction is evidence of what was billed then; the subscription is evidence of what is currently scheduled.

## Statuses are not interchangeable

WooCommerce’s core order status documentation says `processing` is paid but awaiting fulfillment, while `completed` is fulfilled. A subscription may be active while its paid order is processing. Conversely, a parent order can remain historically completed after the subscription is later cancelled.

Examples:

- **Parent order completed + subscription cancelled:** signup was fulfilled; future agreement ended.
- **Renewal order pending + subscription active during grace:** invoice is unpaid; access policy still permits a window.
- **Renewal order processing + subscription active:** renewal payment succeeded; physical fulfillment remains.
- **Renewal order refunded + subscription active/cancelled:** lifecycle result depends on refund policy and engine hook; the refund status alone does not define future billing.

## Refund and support decision map

### Which record should be refunded?

Refund the Woo order that contains the transaction being returned:

- signup charge → parent order;
- July renewal charge → July renewal order;
- plan-switch/proration transaction → its linked switch/proration order.

WooCommerce warns that a manual refund records the refund in Woo but does not itself return funds through the payment gateway. Gateway capability and the exact refund action matter. Separately decide whether future subscription billing continues, cancels, changes, or receives credit.

### Which record should support open first?

| Customer question | Start with | Then correlate |
| --- | --- | --- |
| “Why was I charged today?” | renewal/parent transaction order | subscription schedule + gateway event |
| “When will I be charged next?” | subscription record | scheduled action and sync policy |
| “My parcel has not arrived” | paid order for that cycle | fulfillment/tracking, then subscription cadence |
| “I canceled but got charged” | subscription notes/effective cancel date | renewal order scheduled date + gateway event |
| “My renewal is unpaid” | pending renewal order | email/pay link, gateway result, grace/actions |
| “Refund this month only” | that renewal order | confirm subscription should remain active |

Support should capture customer ID/email, subscription ID, parent order ID, renewal order ID, scheduled action ID, gateway event/transaction ID, and observed dates/timezones.

## Reporting and analytics

Current ArraySubs Pro order classification checks initial purchase links (`_subscription_ids`) separately from renewal metadata (`_is_renewal_order`). The order list can label subscription purchase/trial/renewal/upgrade contexts, while subscription analytics uses agreement/status/schedule data.

Reporting rules:

- revenue and refunds come from transaction orders, not from counting subscription records;
- active subscriber counts come from subscription records, not completed order counts;
- renewal revenue should exclude initial purchases and non-renewal transactions;
- one subscription can produce many renewal orders;
- one initial checkout can produce multiple subscription records;
- partially refunded orders remain transaction records and may not have `refunded` as their entire order status;
- gateway reconciliation needs transaction IDs and order IDs, not only subscription IDs.

### Worked example

Hypothetical IDs:

| Record | Amount/status | Meaning |
| --- | --- | --- |
| Parent order #500 | $50 processing | $40 first period + $10 fee paid; shipment pending |
| Subscription #900 | active, next Aug 1 | ongoing $40/month agreement |
| Renewal order #550 | $40 completed | July renewal paid/fulfilled |
| Renewal order #600 | $40 pending | August manual invoice awaiting payment |

Revenue is not `$50 + subscription #900 + $40 + $40`; the subscription is not a transaction. Collected transaction revenue before refunds is $90 if #600 is unpaid. Tax/shipping/accounting treatment is omitted; this is illustrative only.

## Original support timeline asset

Create an authored timeline with IDs and note classes:

```text
Jun 1  Parent #500 paid ── Subscription #900 activated
Jun 28 Invoice action ─── Renewal #550 created for Jul 1
Jul 1  Gateway event ───── Renewal #550 paid
Jul 1  Subscription #900 ─ Next payment Aug 1
Jul 28 Invoice action ──── Renewal #600 pending
```

Display transaction cards above the line and subscription status/date changes below it. This visually prevents the subscription from being mistaken for another order.

## ArraySubs code/manual evidence

- `arraysubs/src/functions/order-subscription-link.php`: canonical resolver and metadata relationships.
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`: documented parent/renewal/subscription storage contract and paid-renewal handling.
- `arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`: renewal-order metadata.
- `arraysubspro/src/Features/Analytics/` and order-list enhancement services: classification/reporting behavior; inspect exact current class before final implementation claims.
- `user-manual/markdowns/analytics/order-list-enhancements.md`: current order labels.
- `user-manual/markdowns/manage-subscriptions/admin-tools-and-records.md`: subscription detail/related records.
- `user-manual/markdowns/subscription-notes/README.md`: audit timeline.

## Limitations and unknowns

- No live checkout/refund/report query was run for this dossier.
- Third-party integrations that check only one metadata key can miss relationships; use the helper contract.
- HPOS and custom-order-table behavior should be verified with Woo APIs rather than direct `wp_posts` assumptions.
- WooCommerce Subscriptions and ArraySubs have different subscription storage implementations.
- Refund effect on future subscription lifecycle depends on policy, engine hooks, gateway, and admin action.
- Tax/accounting recognition is outside scope; transaction and agreement concepts are not accounting advice.
- Plan switch, migration, provider-managed renewal, and manual admin-created records can add relationship variants.

## Five FAQ answers

### Is a WooCommerce subscription an order?

Conceptually, no: it is an ongoing agreement and schedule, while orders record transactions. WooCommerce Subscriptions uses an order-derived implementation, but ArraySubs stores the subscription as a separate custom `WP_Post` record.

### What is the parent order of a subscription?

It is the initial checkout transaction that created the subscription. It records signup items, totals, payment, tax/shipping, and notes. One parent order can create multiple subscriptions where supported.

### What is a renewal order?

It is a separate WooCommerce order for one later billing cycle. It contains that cycle’s items, totals, payment status, notes, refund data, and a link to one subscription.

### Which order should I refund for a subscription?

Refund the order containing the charge: parent for signup, the relevant renewal order for that cycle, or the separate switch/proration order. Then separately apply the intended future subscription policy.

### Why is the order processing while the subscription is active?

WooCommerce `processing` generally means payment is received and fulfillment remains. The paid renewal can activate/continue the subscription even while a physical shipment awaits completion.

## Visual plan

Flat shapes and ArraySubs palette; no gradients, neon, glow, or 3D.

1. Hero: three labeled record cards connected to a human customer.
2. Parent → subscription → renewal-order relationship diagram, including one-to-many branches.
3. Above/below support timeline with IDs.
4. Record-ownership comparison table as HTML.
5. Status mismatch examples using four flat cards.
6. Refund decision flowchart.
7. Reporting formula diagram: transaction orders → revenue; subscription records → active agreements.
8. Hypothetical collected/unpaid bar chart using #500/#550/#600 example.
9. Dated screenshots of order-list labels, subscription record tools, and notes timeline.
10. Metadata map for technical readers, authored SVG with exact field names.

## Internal links

- Commercial overview: `/deals/arraysubs/`
- Billing operations: `/deals/arraysubs/features/#subscription-operations`
- Recipes: `/deals/arraysubs/use-cases/recipes/switch-at-renewal/`, `/deals/arraysubs/use-cases/recipes/downgrade-with-credit/`, `/deals/arraysubs/use-cases/recipes/subscription-notes-timeline/`
- Siblings: A018 manual/automatic, A020 sync, A021 proration.

## Primary sources (accessed 2026-07-13)

1. WooCommerce, “Subscription Product vs. Subscription”: https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/
2. WooCommerce, “Understanding the Subscription Renewal Process”: https://woocommerce.com/document/subscriptions/renewal-process/
3. WooCommerce, “Order Statuses”: https://woocommerce.com/document/managing-orders/order-statuses/
4. WooCommerce, “Refunding Orders in WooCommerce”: https://woocommerce.com/document/woocommerce-refunds/
5. WooCommerce, “Subscriptions Data Structure & Storage”: https://woocommerce.com/document/subscriptions/develop/data-structure/
6. ArraySubs linkage helper: `arraysubs/src/functions/order-subscription-link.php`
7. ArraySubs order integration: `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
8. ArraySubs renewal order creation: `arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`
9. ArraySubs manuals: `user-manual/markdowns/analytics/order-list-enhancements.md`, `user-manual/markdowns/manage-subscriptions/admin-tools-and-records.md`, `user-manual/markdowns/subscription-notes/README.md`

