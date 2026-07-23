---
title: "PayPal Recurring Payments for WooCommerce: Agreements, Renewals, and Limits"
meta_description: "Learn how PayPal recurring payments work with WooCommerce and ArraySubs, including approval, plans, webhooks, renewals, refunds, and current limits."
focus_keyword: "PayPal recurring payments WooCommerce"
published: "2026-04-04"
updated: "2026-07-03"
last_verified: "2026-07-22"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# PayPal Recurring Payments for WooCommerce: Agreements, Renewals, and Limits

PayPal recurring payments in the current ArraySubs Pro integration use PayPal’s **Subscriptions REST API**. Checkout creates a PayPal Product, Billing Plan, and Subscription, then redirects the buyer to PayPal for approval. PayPal controls later charges and retries; ArraySubs creates and reconciles WooCommerce renewal orders from scheduled jobs and verified webhooks.

That division makes PayPal different from a site-initiated Stripe renewal. It also creates a narrow truth boundary: a simple fixed-price, indefinite subscription can be a good candidate for sandbox validation, but local price changes, finite terms, pause/skip, payment-method replacement, complex carts, and external lifecycle actions are not automatically synchronized in the ArraySubs Pro 1.1.2 implementation inspected for this guide.

> **Key takeaways**
>
> - This integration uses PayPal Subscriptions REST API objects, not PayPal Standard, legacy Billing Agreements, Reference Transactions, or the official WooCommerce PayPal Payments extension.
> - Product → Plan → Subscription → sale transaction is the provider object chain. The buyer’s recurring object normally has an `I-...` identifier.
> - Approval and activation are not proof of a settled payment. A positive WooCommerce order should complete only after a `PAYMENT.SALE.COMPLETED` sale or equivalent return-path transaction evidence.
> - PayPal owns the recurring debit schedule and its own failure retries. ArraySubs schedules local invoice/accounting work and waits for signed PayPal events.
> - The current PayPal route is intentionally restrictive: one subscription plan per checkout, with no regular-item mix, multiple subscriptions, or different billing cycles.
> - Existing PayPal agreements are not automatically revised when local price, quantity, tax, product, or schedule changes.
> - Local finite expiration, pause, skip, undo cancellation, payment-method update, Checkout Blocks, and direct-PayPal cancellation require explicit proof or implementation work before they should be offered.

## First, use the right PayPal terminology

“PayPal billing agreement” is a common search phrase, but it can describe several old and new architectures. Precision matters because those products have different tokens, endpoints, lifecycle events, and recovery rules.

| Term | Meaning in this guide | Safe to use? |
| --- | --- | --- |
| PayPal Subscription | Buyer-specific `I-...` object under PayPal’s Subscriptions API | Yes; preferred technical term |
| Recurring-payment agreement | Plain-language description of the buyer’s consent | Yes, if immediately tied to PayPal Subscription |
| PayPal Billing Plan | `P-...` definition of recurring amount, cadence, trial, tax, setup fee, and failure preferences | Yes |
| PayPal Product | `PROD-...` catalog parent for one or more plans | Yes |
| Sale transaction | Money-movement record from a completed payment; used as the Woo transaction/refund reference | Yes |
| Legacy Billing Agreement | Older/different API architecture | No, not for this adapter |
| Reference Transaction token | Different merchant/payment capability | No |
| Smart Payment Buttons | Embedded checkout UI pattern | Do not claim for this implementation; it returns an approval URL |

PayPal’s current [Subscriptions platform overview](https://developer.paypal.com/platforms/subscriptions) and [integration guide](https://developer.paypal.com/docs/subscriptions/integrate/) describe the Product, Plan, Subscription, and buyer-approval concepts. The implementation statements in this article were verified by first-party source inspection of ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 on July 20, 2026.

## The actual object chain

The remote object is not a copy of the local WooCommerce product. Each layer has a separate job.

![A physical object chain represents the PayPal Product, Billing Plan, Subscription agreement, and settled sale.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-product-plan-subscription-sale.png)

| Layer | Object | Purpose | Critical identifier |
| --- | --- | --- | --- |
| WooCommerce | Product or variation | Defines the local offer, tax class, interval, amount, trial, and signup fee | Local product/variation ID |
| PayPal Catalog | Product | Remote catalog parent reused by PayPal plans | `PROD-...` |
| PayPal Billing | Plan | Fixed remote commercial schedule accepted by buyers | `P-...` |
| PayPal Billing | Subscription | Buyer-specific approval and recurring schedule | `I-...` |
| WooCommerce | Initial order | Checkout and first-money record | Woo order ID |
| ArraySubs | Subscription `WP_Post` | Local dates, status, access, notes, gateway metadata, and renewal bookkeeping | ArraySubs subscription ID |
| WooCommerce | Renewal order | One local accounting/fulfillment record for a later PayPal sale | Woo renewal order ID |
| PayPal Payments | Sale | Settled/captured payment reference used as transaction ID and refund target | PayPal sale ID |

ArraySubs stores the PayPal plan ID in `_gateway_paypal_plan_id` and the buyer’s PayPal subscription ID in `_gateway_paypal_subscription_id`. The create-subscription payload also puts local order and subscription IDs in a JSON `custom_id`, giving signed webhooks a correlation route back into WordPress.

The plan can be locally cached and reused when its pricing signature matches. That signature includes currency, recurring amount, signup fee, interval, trial, and tax context. Reuse reduces unnecessary remote objects, but it does not prove that a cached remote plan remains active, correct, or suitable forever. Your health checks should detect a deleted or deactivated remote object before checkout does.

## What happens at checkout

The current flow is a server-created subscription followed by buyer redirect and approval:

1. WooCommerce creates the initial order and ArraySubs creates the local subscription.
2. ArraySubs Pro reads the product, amount, cadence, trial, signup fee, currency, tax, customer, and return URLs.
3. It creates or reuses a PayPal Product.
4. It creates or reuses a matching PayPal Billing Plan.
5. It creates a buyer-specific PayPal Subscription with local IDs in `custom_id`.
6. It stores the remote plan and subscription identifiers locally.
7. It returns PayPal’s HATEOAS approval URL and redirects the buyer.
8. The buyer logs in or otherwise approves with PayPal.
9. PayPal sends lifecycle and payment webhooks; the customer may also return to the store.
10. ArraySubs completes a positive order only when it can identify a settled sale.

![A secure approval handoff separates customer authorization from the stronger settled-payment evidence returned to the store.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-approval-vs-settlement.png)

The create-subscription request uses `user_action: SUBSCRIBE_NOW` and `shipping_preference: NO_SHIPPING`. Those details reinforce two limits: this is an explicit subscription approval, and physical-shipping economics are not proven merely because WooCommerce can put a shippable product in a cart.

### Configure sandbox before enabling the gateway

The staged PayPal settings screen keeps credentials blank while showing the three controls operators must distinguish: gateway availability, sandbox mode, and credential entry.

![Annotated ArraySubs PayPal settings showing Sandbox mode, API credential fields, and the PayPal webhook ID field without exposing credentials.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-sandbox-settings-verified.png)

Use separate PayPal sandbox business and buyer accounts. A correct sandbox setup needs:

- sandbox client ID and secret from the same PayPal app;
- the ArraySubs PayPal webhook endpoint registered in that app;
- the exact PayPal webhook ID saved in ArraySubs;
- a publicly reachable HTTPS endpoint;
- event subscriptions matching the adapter’s mapped events; and
- a clean separation between sandbox and live credentials, objects, and event history.

A local hostname is fine for examining WordPress admin screens, but PayPal cannot deliver an internet-originated webhook to `localhost`. Use a public staging domain or an approved secure tunnel for transaction testing.

### Enablement is not capability proof

WooCommerce lists PayPal (ArraySubs) as a distinct provider. The Manage action opens the adapter’s settings; it does not mean every Woo checkout configuration is compatible.

![Annotated WooCommerce payment-provider screen highlighting the PayPal (ArraySubs) row with its Enable and Manage actions.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/woocommerce-paypal-payment-method-verified.png)

Automatic gateway support means the subscription engine understands approval, the remote object, renewal events, failure states, refunds, cancellation, and local reconciliation—not just that a button can collect the first payment. Read [Automatic vs Manual Gateway Support for Subscriptions](/payments-and-compliance/automatic-vs-manual-gateway-support-for-subscriptions/) for that distinction.

## Approval, activation, and settlement are three different facts

PayPal documents subscription states such as `APPROVAL_PENDING`, `APPROVED`, `ACTIVE`, `SUSPENDED`, `CANCELLED`, and `EXPIRED` in its [Subscriptions API reference](https://developer.paypal.com/docs/api/subscriptions/v1/). None should be flattened into a generic “paid” state.

| Provider condition | What it proves | What it does not prove |
| --- | --- | --- |
| `APPROVAL_PENDING` | A remote subscription object exists | Buyer consent or money |
| `APPROVED` | Buyer approved the recurring relationship | A positive first charge settled |
| `ACTIVE` | PayPal considers the remote subscription active | Exact Woo order total was collected |
| `PAYMENT.SALE.COMPLETED` | A sale transaction completed | That the correct local order has reconciled |
| `SUSPENDED` | PayPal has suspended the subscription | Local ArraySubs post status/access is aligned |
| `CANCELLED` | Remote subscription is terminal | Local subscription and entitlements are cancelled |

ArraySubs deliberately does not complete a positive Woo order from `BILLING.SUBSCRIPTION.ACTIVATED` alone. It waits for `PAYMENT.SALE.COMPLETED`, records the PayPal sale ID, and completes the order. This is one of the adapter’s strongest design decisions because an agreement lifecycle event and money movement are not interchangeable.

### The return path is a recovery mechanism

The browser can return before the webhook. `confirmOrderOnReturn()` retrieves the remote subscription and searches recent transactions over a bounded window. It completes the order only when it finds completed payment evidence with a usable sale ID.

Test all three races:

1. webhook first, browser return later;
2. browser return first, webhook later; and
3. webhook succeeds while the browser never returns.

All must produce one completion, one transaction ID, and no duplicate customer notification. A free trial or zero-total initial order needs a separate test because it can legitimately start without a first sale.

## How PayPal renewals differ from Stripe renewals

With the ArraySubs Stripe integration, WordPress initiates an off-session PaymentIntent when the local due time arrives. With PayPal, the remote PayPal Plan owns the charge clock. ArraySubs does not send a debit/capture request in `processRenewalPayment()`.

![A remote blue PayPal-like clock sends settled, failed, or suspended event tokens to a local ArraySubs renewal desk.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-managed-renewal-webhooks.png)

The normal PayPal renewal sequence is:

```text
local invoice job
→ creates pending renewal order

PayPal plan reaches due time
→ PayPal attempts the charge
→ PayPal sends signed sale event
→ ArraySubs finds pending order
→ records PayPal sale ID
→ completes the order
→ advances local dates
```

ArraySubs schedules invoice generation before the local due time and also runs a due-time renewal processor. For PayPal, that processor returns a waiting result because provider-managed billing is pending; it does not independently charge the customer.

This creates two truths to monitor:

- **remote payment truth:** PayPal Subscription status, sale ID, amount, currency, retry/outstanding balance, refund/reversal/dispute, and provider timestamp;
- **local lifecycle truth:** scheduled actions, renewal order, expected total, subscription status, next date, access, notes, and gateway state.

A successful scheduled job does not prove PayPal collected. A PayPal sale can also arrive before the local invoice job.

### When the sale event arrives first

If PayPal’s completed-sale webhook arrives before ArraySubs has created the pending renewal order, the adapter attempts a retroactive renewal order through the canonical order-creation service. This is useful resilience. It still needs financial reconciliation because the current local product, tax, shipping, or price can differ from the old PayPal Plan.

If the initial parent order cannot be resolved, the code avoids manufacturing a renewal order because the sale might be the first payment. It records a subscription note for investigation. That conservative exception is preferable to silently classifying money against the wrong period.

## The current cart rule is deliberately narrow

The PayPal adapter represents one buyer subscription to one remote plan. Its current ArraySubs capability flags reject mixed regular/subscription carts, multiple subscriptions in one checkout, and different billing cycles.

![A cart laboratory shows one subscription plan passing while mixed items and two different clocks are diverted.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-cart-limitations.png)

| Cart shape | Current PayPal adapter result | Why |
| --- | --- | --- |
| One fixed-price subscription plan | Candidate | Maps cleanly to one remote plan/subscription |
| One subscription plus regular product | Rejected by adapter | One remote plan cannot safely represent arbitrary one-time economics |
| Two subscription products | Rejected | Current implementation uses one subscription/plan context |
| Two different billing cycles | Rejected | Cannot encode multiple remote clocks in one PayPal Subscription |
| Customer-defined term | Not exposed/proven | Remote plan requires fixed accepted terms |
| Paid trial | Not represented | Current code models a zero-price trial phase |
| Physical renewal with changing shipping | Unproven/high risk | `NO_SHIPPING` plus a fixed remote plan can diverge from Woo renewal totals |

When Stripe and PayPal are enabled together, ArraySubs Pro currently applies the most restrictive enabled-gateway policy to shared cart permissions before validating the selected gateway. Enabling PayPal can therefore narrow cart composition even if a buyer intends to select Stripe. The [Stripe vs PayPal vs Paddle comparison](/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/) explains that cross-gateway effect.

## Plan construction: cadence, trials, setup fee, and failure preferences

The adapter maps local periods to PayPal `DAY`, `WEEK`, `MONTH`, or `YEAR` with an integer interval. The [PayPal API schema](https://developer.paypal.com/docs/api/subscriptions/v1/) constrains interval counts—for example, up to 365 days, 52 weeks, 12 months, or one year per frequency interval.

Current code creates at most:

- one zero-price `TRIAL` cycle with `total_cycles: 1`; and
- one fixed-price regular cycle with `total_cycles: 0`, meaning indefinite.

A local signup fee becomes `payment_preferences.setup_fee`. The payload does not visibly set every setup-fee failure preference explicitly, so test a failed setup fee before deciding whether access or the remote subscription should continue.

The plan also sets:

- `auto_bill_outstanding: true`; and
- `payment_failure_threshold: 3`.

PayPal’s [payment failure retry documentation](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/) describes provider-side retries every five days, up to two retries per billing cycle, outstanding-balance behavior, and failure-threshold suspension. Those are PayPal-side rules; they are not ArraySubs issuing three new charge API calls.

## Tax and amount drift are the central commercial risk

At signup, ArraySubs calculates a PayPal plan tax percentage and inclusive/exclusive setting from WooCommerce context. Tax is also included in the plan cache signature, which prevents obvious reuse across different tax calculations.

But the buyer accepts a fixed remote plan. Existing subscribers are not automatically revised when:

- a customer changes their taxable address;
- the merchant changes a tax rate or product tax class;
- product price or quantity changes;
- a coupon/discount changes;
- recurring shipping changes;
- a local plan switch occurs; or
- a legal tax treatment changes.

The local renewal order can calculate today’s WooCommerce amount while PayPal collects the old accepted plan. Source inspection also did not find a strict gross amount/currency comparison before a completed sale finalizes the local order.

Build an exception rule:

```text
PayPal sale amount + currency
must equal
Woo renewal total + currency

otherwise
→ do not silently accept parity
→ create reconciliation task
```

Compare sale ID, gross, currency, remote subscription, local subscription, renewal order, tax, shipping, refunds, and payout. This is not optional bookkeeping; it is the control that detects stale-plan drift.

### Currency support is account-specific

The adapter formats JPY, HUF, and TWD without decimals and other currencies with two. PayPal’s [currency reference](https://developer.paypal.com/api/rest/reference/currency-codes/) also warns that support varies by country, account, and payment context. A listed currency can remain pending if the merchant does not hold or automatically accept it.

Test seller country, buyer country, funding source, presentment currency, balance currency, conversion, minimums, and settlement. Do not publish “PayPal supports currency X” as a universal merchant guarantee.

## Signed webhooks are the operating backbone

The ArraySubs endpoint is normally:

```text
/wp-json/arraysubs/v1/webhooks/
arraysubs_paypal
```

The adapter submits PayPal transmission headers, the raw event body, and the configured webhook ID to PayPal’s verification endpoint. Missing/invalid webhook ID or a non-verified response fails closed.

PayPal requires a public HTTPS listener and successful `2xx` responses; failed deliveries can be retried. Read PayPal’s [webhook overview](https://developer.paypal.com/api/rest/webhooks/) and [REST webhook guide](https://developer.paypal.com/api/rest/webhooks/rest/). The simulator is useful for listener mechanics but does not prove a real sandbox Subscription, sale, funding failure, tax calculation, or dispute correlation.

![Annotated ArraySubs Gateway Health view identifying the PayPal health card, webhook endpoint, and shared event-evidence log.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-gateway-health-verified.png)

Gateway Health helps expose setup/availability/test-mode state, linked-subscription counts, webhook URL, recent event context, and logs. Treat it as observability, not proof of successful billing. A green setup still needs real subscription tests.

### Events mapped by the current adapter

| Event | Local intent | Qualification |
| --- | --- | --- |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Capture lifecycle context | Does not complete a positive order |
| `PAYMENT.SALE.COMPLETED` | Reconcile initial/renewal sale | Independently verify amount/currency |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Fail pending order, mark gateway errored | PayPal may remain active and retry |
| `PAYMENT.SALE.DENIED` | Record payment failure | Avoid duplicate alerts with related events |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Mark gateway paused/context | Local post/access parity still needs proof |
| `BILLING.SUBSCRIPTION.CANCELLED` / `EXPIRED` | Mark remote gateway inactive/context | Local subscription cancellation was not proven |
| `PAYMENT.SALE.REFUNDED` / `REVERSED` | Record notes/actions | Woo refund-object creation was not observed |
| `CUSTOMER.DISPUTE.CREATED` / `RESOLVED` | Record notes/actions | Evidence, access, and finance remain manual workflows |

PayPal publishes additional event types. A valid but unmapped event can receive HTTP success with `processed: false`, after which PayPal will not retry simply because ArraySubs ignored it. Subscribe intentionally and monitor ignored/unprocessed counts.

### Duplicate suppression is not exactly-once processing

ArraySubs Pro stores webhook events with a unique key on gateway slug plus PayPal event ID. This suppresses normal sequential redelivery. Order-level checks add another guard.

Limitations remain:

- the router checks before side effects and records afterward, so concurrent duplicates can race;
- an event with no ID cannot be meaningfully deduplicated;
- two different event IDs can reference the same sale;
- very old retained-event cleanup removes historical event-ID memory; and
- a repeated local side effect can still happen unless its own transition is idempotent.

Say “event-ID duplicate suppression” rather than “exactly once.” Test the same webhook sequentially, concurrently, and as two IDs for one sale.

## Failure and retry: two state machines can disagree

PayPal owns debit retries. ArraySubs records local failure and gateway state. A difficult sequence is:

```text
PayPal reports payment failure
→ local renewal order fails
→ local gateway becomes errored
→ remote agreement may retry
→ later PayPal sale succeeds
→ local order completes
→ gateway-state recovery
  remains unproven
```

That can display contradictory states. It also creates duplicate-collection risk if support sees a local failure, sends a manual invoice, and collects it while PayPal is still retrying.

Before asking for manual payment, check:

- PayPal Subscription status;
- outstanding balance and next retry;
- recent sale and failure events;
- local renewal order(s);
- gateway status and notes;
- whether an external/manual collection already exists; and
- whether access/fulfillment has changed.

The broader [failed subscription payment recovery guide](/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/) helps coordinate customer messages and access, but PayPal’s remote retry clock remains authoritative for money movement.

## Customer payment updates and plan migration are not complete

PayPal provides a revise-subscription capability with product and re-consent rules. Its [revision documentation](https://developer.paypal.com/docs/subscriptions/customize/revise-subscriptions/) explains that a new price generally applies at the next cycle and that merchant-specific proration or one-time adjustments are not automatic.

The inspected ArraySubs PayPal adapter does not implement that workflow. Its advertised reauthorization-style update method returns a success-shaped response without a usable redirect URL. The customer portal expects a URL and therefore cannot complete a replace-and-swap flow.

There is also no verified operation that:

- creates a replacement PayPal Subscription;
- sends the customer through fresh consent;
- atomically swaps the local `I-...` reference;
- preserves the intended date;
- cancels the old agreement only after success; and
- rolls back cleanly after abandonment.

![A migration control room waits for proof from a new recurring agreement before retiring the old one and blocks parallel collection.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-agreement-migration.png)

Use this rule: **do not change the economics of an active PayPal-backed subscription unless the workflow explicitly revises or replaces the PayPal Subscription with informed buyer consent.**

If migration is unavoidable:

1. freeze local edits that could create a second untracked amount;
2. record the old plan, agreement, next date, and last sale;
3. create the reviewed replacement offer;
4. obtain customer consent;
5. confirm the new remote subscription and intended first charge date;
6. swap the local reference once;
7. cancel the old remote subscription;
8. verify no overlapping scheduled charge; and
9. monitor the first new renewal and reconciliation.

Detaching the local gateway reference is not cancellation. Clearing `_gateway_paypal_subscription_id` while the remote `I-...` remains active can strand a billing agreement outside local control.

## Cancellation, pause, skip, and finite terms

These lifecycle actions look similar in a portal but are different remote commands.

| Action | PayPal platform capability | Current inspected adapter behavior |
| --- | --- | --- |
| Immediate cancellation | PayPal cancel endpoint | Remote cancellation call is implemented |
| Cancel at period end | Can be modeled operationally | Adapter appears to cancel remote now while local access continues to period end |
| Undo scheduled cancellation | Cancelled PayPal subscription is terminal | Current replacement/reauthorization flow is incomplete |
| Suspend/activate | PayPal provides endpoints | Adapter does not expose synchronized pause/resume |
| Skip a cycle | Requires remote schedule/control change | Local skip does not prove PayPal charge moved |
| Finite payment count/end date | Remote plan must stop/cancel | Current plan is infinite; expiration-to-remote-cancel listener was not found |
| Direct PayPal cancellation | Provider becomes cancelled | Gateway context changes, but local post-status/access cancellation was not proven |

The most serious risk is finite terms. ArraySubs can expire a local subscription after a payment count/end date and unschedule local work. The PayPal regular plan is created with `total_cycles: 0`—indefinite—and no expiration listener was found to cancel it. A locally expired subscription could therefore remain remotely billable.

Do not sell finite PayPal terms until a sandbox test proves remote termination or the implementation is fixed. The same rule applies to pause and skip: block the action if the remote schedule cannot be synchronized.

For cancel-at-period-end, be transparent: remote auto-renew is cancelled immediately, while local access may continue through the paid period. “Undo” cannot simply switch the terminal PayPal agreement back on.

## Refund the sale, not the agreement

The adapter’s Woo admin refund path targets a PayPal **sale transaction ID**, not the `I-...` Subscription ID. It currently uses the documented but deprecated-for-new-integrations Payments v1 sale-refund route.

![A finance operator selects one renewal sale for refund while a guard prevents the recurring agreement itself from entering the refund path.](/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/paypal-sale-refund-mapping.png)

For a partial refund, the adapter sends amount and currency. For a full refund it sends no amount body. Refunds can remain pending or fail, and historical sale eligibility is not universal. Review PayPal’s [Payments v1 reference](https://developer.paypal.com/docs/api/payments/v1/) for current endpoint behavior.

If an imported/legacy Woo order stores only an `I-...` identifier as its transaction ID, ArraySubs refuses to send it as a sale refund target and directs the operator to PayPal. That failure is safer than refunding the wrong object.

External `PAYMENT.SALE.REFUNDED` and `PAYMENT.SALE.REVERSED` events currently add notes/actions; source inspection did not show a complete `WC_Order_Refund` mirror. A reversal is also not the same business event as a voluntary merchant refund. Preserve the exact event type, reason, amount, currency, fee effect, and settlement adjustment.

Disputes are event-aware but not automated case management. Teams still need deadlines, evidence ownership, access policy, cancellation decision, accounting adjustment, and later-renewal prevention.

## Checkout Blocks are not proven

ArraySubs Pro has a WooCommerce Blocks payment registration hook, but the inspected implementation registers Paddle rather than PayPal. Do not claim that PayPal works in Checkout Blocks based on classic checkout success.

Test separately:

- classic shortcode checkout;
- WooCommerce Checkout block;
- guest and logged-in checkout;
- desktop and mobile approval;
- browser back and PayPal cancel return;
- return with limited cookies/session continuity; and
- popup/redirect restrictions.

If PayPal is absent from the Checkout block, present that as a known compatibility boundary rather than allowing customers to reach a dead end.

## A prelaunch matrix that can catch the real failures

### Configuration

- [ ] Correct sandbox client ID, secret, and webhook ID.
- [ ] Wrong secret and wrong webhook ID fail closed.
- [ ] Public HTTPS listener receives a real sandbox event.
- [ ] WAF/CDN permits signed webhook POSTs without browser challenge.
- [ ] Sandbox and live environments cannot be confused.

### First checkout

- [ ] Immediate paid subscription creates one `I-...` and one initial sale/order completion.
- [ ] Buyer cancellation does not grant access.
- [ ] Webhook-first and return-first races complete exactly one local order.
- [ ] Browser never returns; webhook still reconciles.
- [ ] Free trial with no setup fee reaches the first paid renewal.
- [ ] Free trial plus setup fee classifies setup money correctly.
- [ ] Failed setup fee produces the intended access and remote status.
- [ ] Classic and Checkout Block behavior is stated separately.

### Commercial terms

- [ ] Every supported cadence stays within PayPal interval limits.
- [ ] JPY, HUF, TWD, and a two-decimal currency reconcile exactly.
- [ ] Inclusive/exclusive tax equals the remote plan and local order.
- [ ] Address or tax-rate change creates a visible mismatch task or supported revision.
- [ ] Shipping and physical renewal amount are either proven or blocked.
- [ ] Mixed carts, multiple subscriptions, and different cycles are rejected clearly.

### Renewal and event races

- [ ] Local invoice exists before sale event.
- [ ] Sale arrives before local invoice and creates one correct retroactive order.
- [ ] Same event ID delivered sequentially and concurrently is harmless.
- [ ] Two event IDs for one sale do not create two orders.
- [ ] Unknown/malformed correlation produces an operator-visible exception.
- [ ] Sale gross/currency is compared with the local expected renewal.

### Failure and lifecycle

- [ ] PayPal payment failure marks the correct local order.
- [ ] Later provider retry success restores a coherent local gateway/lifecycle state.
- [ ] PayPal suspension aligns with local access policy.
- [ ] Immediate cancel is reflected once in both systems.
- [ ] Cancel-at-period-end language matches remote-cancel-now behavior.
- [ ] Direct PayPal cancellation creates local reconciliation/action.
- [ ] Pause, resume, and skip are blocked unless remote behavior is implemented.
- [ ] Local finite expiration stops remote billing.

### Update, refund, and disputes

- [ ] Payment-update link produces usable consent or is disabled with honest guidance.
- [ ] Plan/price/quantity/tax changes are blocked or revise the remote agreement.
- [ ] Replace-and-cancel migration creates no overlap or service gap.
- [ ] Full/partial refund uses the sale ID and correct amount/currency.
- [ ] External refund/reversal reconciles accounting.
- [ ] Dispute creation and resolution run a documented manual process.

## Production monitoring

Monitor mismatches, not only event count.

| Monitor | Alert when | Owner |
| --- | --- | --- |
| PayPal webhook age | No event in the store’s expected activity window | Engineering |
| Verified but unprocessed events | Count exceeds tested baseline | Engineering/support |
| Remote sale without local order | Sale exceeds reconciliation SLA | Finance/operations |
| Local pending order without sale | Pending exceeds PayPal payment/retry window | Support/finance |
| Amount or currency mismatch | Any nonzero difference | Finance |
| Remote/local lifecycle mismatch | Active, suspended, cancelled, or expired states disagree | Support/engineering |
| Duplicate sale assignment | One sale ID appears on multiple orders | Engineering/finance |
| Local expired, remote active | Any occurrence | Engineering/finance—urgent |
| Gateway errored, later sale completed | State did not recover | Support/engineering |

The ArraySubs [gateway-health monitor recipe](/deals/arraysubs/use-cases/recipes/gateway-health-monitor/) helps operators inspect provider connectivity and events. It cannot replace PayPal-to-Woo financial reconciliation.

## When PayPal is a good fit—and when it is not

### Candidate after sandbox proof

PayPal can be a defensible choice when:

- customers strongly prefer PayPal;
- the offer is one fixed-price, indefinite subscription;
- checkout uses the classic flow proven in staging;
- tax, amount, and schedule are expected to remain stable;
- pause, skip, plan switch, and self-service method replacement are not promised; and
- the team monitors signed webhooks and reconciles sales to Woo orders.

### Do not offer yet without a fix or explicit proof

- fixed number of payments or hard local end date;
- customer-driven PayPal payment-method update;
- upgrades/downgrades, quantity edits, or dynamic recurring price;
- address-sensitive recurring tax or shipping;
- local pause, resume, or skip;
- physical recurring delivery with changing shipping economics;
- complex/mixed checkout;
- mandatory Checkout Blocks; or
- operations that cannot review remote/local mismatches.

If those workflows are essential, Stripe’s site-initiated model may fit better; read [Stripe Recurring Payments for WooCommerce](/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/). If the goal is Merchant-of-Record tax/compliance ownership for eligible software, consider [Paddle Merchant of Record for WooCommerce Subscriptions](/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/).

## Final recommendation

Use PayPal because customers want a PayPal-controlled recurring agreement and your offer fits its verified boundary—not simply because PayPal appears in WooCommerce’s payment list.

The reliable mental model is:

```text
ArraySubs owns local subscription
and Woo renewal records

PayPal owns remote plan,
approval, charge, and retry

signed sale events connect them

reconciliation proves agreement
```

ArraySubs Pro’s current PayPal foundation gets several important things right: it uses the current Subscriptions REST object model, keeps approval separate from settlement, verifies webhook signatures, correlates events through multiple identifiers, recovers from return/webhook races, and can create a retroactive renewal order when a sale arrives early.

Its limits are equally important. Do not promise synchronized finite terms, pause/skip, customer payment updates, plan/tax/price edits, Checkout Blocks, direct-provider cancellation, external refund accounting, or seamless retry-state recovery until the exact installed versions pass those tests.

That honest boundary protects customers from duplicate collection and merchants from invisible amount or lifecycle drift. Once the test matrix passes for the intended offer, [ArraySubs payment gateway features](/deals/arraysubs/features/#payment-gateways) provide the shared subscription, renewal-order, customer-portal, audit, and gateway-health operating surface around the provider-owned PayPal schedule.

[View ArraySubs Pro pricing](/deals/arraysubs/pricing/) when the verified PayPal boundary matches your offer and you are ready to add provider-owned automatic renewals to ArraySubs.

## Verification scope, limitations, and update log

This guide was last reverified on July 22, 2026, by Emran at ArrayHash and reviewed by the ArraySubs Engineering Team. The review combined ArraySubs Free and Pro source inspection, current PayPal and WooCommerce documentation, and fresh staging captures of the PayPal settings, WooCommerce provider list, and ArraySubs Gateway Health screen.

The staging pass verified configuration surfaces, installed versions, gateway visibility, capability labels, the webhook URL display, and the event-log interface. It did **not** enter PayPal credentials, enable the gateway, create a sandbox subscription, approve a buyer agreement, receive a PayPal-originated webhook, force a retry, revise a plan, refund a sale, open a dispute, or prove Checkout Blocks compatibility. The article treats those as launch tests and does not convert source-level implementation observations into claims of completed payment behavior.

Update history:

- **July 22, 2026:** Recaptured and strictly annotated three real plugin screenshots from staging, recorded their provenance and marker plans, mirrored accepted bytes into the source and public asset trees, refreshed the verification disclosure, and added the Pro pricing CTA.
- **July 3, 2026:** Updated the article’s operational guidance and metadata.
- **April 4, 2026:** Original publication.

Reverify after changes to ArraySubs PayPal checkout, local renewal reconciliation, webhook routing, cancellation, refund mapping, or gateway health; after PayPal changes Subscription APIs, retry rules, event contracts, or refund endpoints; and after WooCommerce changes payment-provider or Checkout Block integration behavior.
