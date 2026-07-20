# Research Evidence Pack — A059: PayPal Recurring Payments for WooCommerce: Agreements, Renewals, and Limits

## Research scope and publication snapshot

- **Research date / last verified:** 2026-07-20 (Asia/Dhaka).
- **Article brief:** `web-content/marketing-materials/content-plan/articles/059-paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits.md`.
- **Intended article URL:** `/deals/arraysubs/resources/payments-and-compliance/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/`.
- **Focus keyword:** `PayPal recurring payments WooCommerce`.
- **Audience:** WooCommerce merchants, developers, operations teams, finance teams, and support teams evaluating or operating PayPal-backed subscriptions.
- **Research boundary:** This pack describes PayPal's current Subscriptions REST API and the current ArraySubs/ArraySubsPro PayPal adapter. It does **not** describe PayPal Standard, the legacy PayPal Billing Agreements API, PayPal Reference Transactions, WooPayments, or the official WooCommerce PayPal Payments extension unless explicitly labeled as ecosystem context.
- **Evidence labels:** “PayPal documentation” means current first-party PayPal documentation. “WooCommerce documentation” means first-party Woo documentation about the WooCommerce Subscriptions extension and is ecosystem context, not proof of ArraySubs behavior. “First-party source inspection” means direct inspection of the ArraySubs codebase. “Staging observation” means read-only inspection of the confirmed staging WordPress admin.

### Verified environment

| Component | Version / state | Evidence |
|---|---:|---|
| WordPress | 7.0.2 | Staging observation: WordPress admin footer/update screen, 2026-07-20. |
| WooCommerce | 10.9.4, active | Staging observation: Plugins screen, 2026-07-20. |
| ArraySubs | 1.8.11, active | Staging observation; also `arraysubs/arraysubs.php` plugin header. |
| ArraySubsPro | 1.1.2, active | Staging observation; also `arraysubspro/arraysubspro.php` plugin header. |
| ArraySubs compatibility declarations | WordPress tested to 7.0; PHP 8.1 required; WooCommerce minimum 8.0; WooCommerce tested to major 10 | First-party source inspection: `arraysubs/arraysubs.php`. |
| ArraySubsPro compatibility declarations | WordPress tested to 7.0; PHP 8.1 required | First-party source inspection: `arraysubspro/arraysubspro.php`. |

The staging inspection confirmed versions and activation only. It did not perform a live PayPal transaction, alter settings, create an order, or send a webhook. All transaction-level claims below are either implementation observations or PayPal-documented behavior and must be validated with the test matrix before being presented as proven staging behavior.

## Direct answer the article can safely lead with

PayPal recurring payments in the current ArraySubsPro integration use PayPal's **Subscriptions REST API**. Checkout creates a PayPal product, billing plan, and subscription, then redirects the buyer to PayPal for approval. PayPal controls later charges and retries; ArraySubs creates and reconciles WooCommerce renewal orders from scheduled jobs and verified webhooks. This division makes correct webhook delivery, amount alignment, and lifecycle testing essential.

That is an accurate short answer. Do not call the remote object a legacy “billing agreement.” “Recurring agreement” is acceptable as a plain-language concept if the article immediately explains that the actual API object is a PayPal Subscription with an `I-...` ID under `/v1/billing/subscriptions`.

## Key findings at a glance

1. **This is a PayPal Subscriptions REST API integration, not PayPal Standard or legacy Billing Agreements.** The remote chain is Product (`PROD-...`) → Plan (`P-...`) → Subscription (`I-...`) → Sale transaction.
2. **Approval is not settlement.** ArraySubs redirects the buyer to PayPal. A positive-value initial WooCommerce order is completed by a `PAYMENT.SALE.COMPLETED` sale event or a return-path transaction lookup, not by subscription activation alone.
3. **PayPal owns the recurring charge schedule.** ArraySubs' renewal scheduler creates/reconciles local WooCommerce orders but `processRenewalPayment()` does not initiate the PayPal debit.
4. **Webhooks are operationally mandatory.** Signature verification fails closed when the configured webhook ID is missing or invalid. A local-only hostname cannot receive PayPal's public webhook delivery; true end-to-end testing needs a public HTTPS URL or a secure tunnel.
5. **The plan is immutable for existing subscribers unless the integration explicitly revises it.** Current code creates rate-specific plans but does not revise an existing PayPal subscription after local price, tax, quantity, product, or plan changes.
6. **Current adapter gaps are material.** Customer payment-method replacement, plan migration, remote pause/resume synchronization, finite-term remote termination, scheduled cancellation at period end, and full external cancellation reconciliation are incomplete or unproven.
7. **Failure recovery is split across two state machines.** PayPal can retry failed payments while the local adapter marks the gateway state errored. A later successful sale currently does not visibly reset that gateway state. This requires sandbox proof before any seamless-recovery claim.
8. **Checkout Blocks support is not registered for PayPal by the current Pro hooks.** Classic checkout versus Checkout block compatibility must be tested and stated precisely.

## Terminology guardrail: what “agreement” means here

PayPal has used several overlapping payment products over time. The article should name the product/API before discussing behavior:

| Term | Use in this article | Why |
|---|---|---|
| PayPal Subscription | Preferred technical term | This is the `I-...` object created through the PayPal Subscriptions REST API. |
| Recurring-payment agreement | Acceptable plain-language phrase | It describes customer consent conceptually, but must not imply the legacy Billing Agreements API. |
| PayPal billing plan | Correct | This is the `P-...` plan that defines trial, interval, fixed amount, tax, setup fee, and failure preferences. |
| PayPal product | Correct | Catalog object (`PROD-...`) referenced by a plan. It is not the WooCommerce product itself. |
| Sale transaction | Correct for this adapter's captured payment IDs | `PAYMENT.SALE.COMPLETED` carries the sale ID that is recorded as the WooCommerce transaction ID and used by the current refund endpoint. |
| Billing Agreement / Reference Transaction token | Do not use for this implementation | Those names describe different or legacy PayPal architectures and would mislead readers. |
| Smart Payment Buttons | Do not claim | A stale class docblock mentions buttons, but the implemented flow creates a subscription server-side and returns a PayPal approval URL for redirect. |

**First-party source inspection:** `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`, class `ArraySubsPro\Features\AutomaticPayments\Gateways\PayPal\PayPalGateway`, especially `processSubscriptionPayment()` and the class header; `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalApiClient.php`, methods `createProduct()`, `createPlan()`, and `createSubscription()`.

## Exact object and data architecture

### Object map

| Layer | Object / identifier | Created or stored by | Purpose |
|---|---|---|---|
| WooCommerce | Product / variation | Merchant | Supplies the local subscription product, price, tax class, billing interval, trial, and signup-fee data. |
| PayPal Catalog | Product, normally `PROD-...` | `PayPalApiClient::createProduct()` | Remote catalog object used by one or more PayPal plans. |
| PayPal Billing | Plan, normally `P-...` | `PayPalApiClient::createPlan()` | Defines trial and regular billing cycles, fixed recurring price, tax, setup fee, and payment-failure preferences. |
| PayPal Billing | Subscription, normally `I-...` | `PayPalApiClient::createSubscription()` | Buyer-specific recurring consent and schedule; begins in an approval-related status and later becomes active. |
| WooCommerce | Initial order | ArraySubs checkout | Local commercial record. PayPal sale ID becomes the transaction ID when the money event is reconciled. |
| ArraySubs | Subscription custom post (`WP_Post`) | ArraySubs checkout | Local subscription lifecycle, dates, renewal scheduling, access, notes, and gateway metadata. |
| WooCommerce | Renewal order | `RenewalProcessor` / `OrderCreation`, or retroactive webhook path | Local invoice/accounting record for a PayPal-managed recurring sale. |
| ArraySubsPro | Webhook event row | `DatabaseMigration` / `WebhookRouter` | Event audit and duplicate suppression by gateway slug and PayPal event ID. |

### Important identifiers and metadata

- The PayPal plan ID is stored on the local subscription as `_gateway_paypal_plan_id`.
- The PayPal subscription ID is stored as `_gateway_paypal_subscription_id`.
- The initial WooCommerce order stores the PayPal subscription/session identifier in `_gateway_session_id`.
- The PayPal create-subscription payload puts a JSON value in `custom_id` containing the local `order_id` and `subscription_id`. This is a primary webhook correlation route.
- Product/plan reuse is local-cache based. A plan signature includes currency, recurring amount, signup fee, interval unit/count, trial length/period, and tax signature.

**First-party source inspection:** `PayPalGateway::processSubscriptionPayment()` and `PayPalGateway::buildPlanSignature()` in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`; normalization and identifier resolution paths in the same class and in `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMetaNormalizer.php`.

### Checkout and approval sequence

1. WooCommerce creates the local initial order and ArraySubs creates a local subscription `WP_Post`.
2. `PayPalGateway::processSubscriptionPayment()` reads the local product, billing schedule, amount, trial, signup fee, currency, tax, order, and customer data.
3. The adapter creates or reuses a PayPal Catalog Product.
4. It creates or reuses a PayPal Billing Plan that matches the calculated signature.
5. It creates a buyer-specific PayPal Subscription with:
   - the plan ID;
   - a `custom_id` that carries local order/subscription references;
   - subscriber name and email;
   - return and cancel URLs;
   - `shipping_preference: NO_SHIPPING`; and
   - `user_action: SUBSCRIBE_NOW`.
6. The adapter records PayPal identifiers locally and returns the PayPal HATEOAS `approve` URL.
7. WooCommerce redirects the buyer to PayPal to approve the subscription.
8. PayPal activates the subscription and produces payment/lifecycle webhooks. The buyer also returns to the merchant site.
9. ArraySubs reconciles the initial order only when it can identify a completed sale transaction for a positive initial charge.

PayPal's official integration documentation describes the same conceptual Product → Plan → Subscription → approval flow. It also makes clear that approval is a buyer action and that the subscription has its own lifecycle statuses. Primary sources:

- https://developer.paypal.com/platforms/subscriptions
- https://developer.paypal.com/docs/subscriptions/integrate/
- https://developer.paypal.com/docs/api/subscriptions/v1/

## Initial payment: approval, activation, and settlement are distinct

### Status semantics

PayPal documents subscription statuses including `APPROVAL_PENDING`, `APPROVED`, `ACTIVE`, `SUSPENDED`, `CANCELLED`, and `EXPIRED`. The article should not flatten these into a single “paid” status. An approved or active subscription object says something about the recurring agreement's lifecycle; it does not by itself provide the sale transaction ID needed to prove and refund a money movement.

### What current ArraySubs code does

- After create-subscription, the remote object can be `APPROVAL_PENDING` and the buyer is redirected to the approval link.
- `BILLING.SUBSCRIPTION.ACTIVATED` is treated as a lifecycle event. `PayPalGateway::handlePaymentSucceeded()` deliberately does **not** complete the WooCommerce order on activation alone.
- A positive-value order is completed on a `PAYMENT.SALE.COMPLETED` event whose PayPal sale ID can be recorded as the WooCommerce transaction ID.
- `PayPalGateway::confirmOrderOnReturn()` provides a recovery path if the browser returns before the webhook. It retrieves the PayPal subscription, checks its state/billing information, and queries recent transactions over a 35-day window. It completes the order only when it finds completed payment evidence with a usable sale ID.
- A zero-total initial order associated with a free trial follows the core trial/order flow and should be tested separately from a signup fee or immediate regular charge.

**First-party source inspection:** `PayPalGateway::processSubscriptionPayment()`, `PayPalGateway::confirmOrderOnReturn()`, and `PayPalGateway::handlePaymentSucceeded()` in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`; `PayPalApiClient::getSubscription()` and `PayPalApiClient::getSubscriptionTransactions()` in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalApiClient.php`.

### Operational consequence

Support playbooks should distinguish at least four conditions:

| PayPal condition | Local order implication | Operator question |
|---|---|---|
| Buyer never approved | Initial order should remain unpaid/pending or be abandoned | Did the customer leave PayPal or use the cancel URL? |
| Subscription approved but no completed sale yet | Do not claim payment succeeded | Is this a free trial, a pending funding event, or a webhook delay? |
| Subscription active and completed sale exists | Initial order can be completed with sale ID | Did webhook or return reconciliation record the transaction? |
| Subscription active but local order still pending | Reconciliation failure | Is webhook delivery verified, and does transaction lookup show the sale? |

## Plan construction and commercial limits

### Billing cycles

The adapter maps local billing periods to PayPal `DAY`, `WEEK`, `MONTH`, or `YEAR`, with an integer interval count. A free trial becomes one `TRIAL` cycle with a fixed price of zero and `total_cycles: 1`. The regular cycle is a fixed-price recurring cycle with `total_cycles: 0`, which PayPal uses for an infinite cycle.

PayPal's API schema constrains interval counts to maximums of 365 days, 52 weeks, 12 months, or 1 year, and permits up to two trial/tenure cycles plus one regular cycle. Current ArraySubs code creates at most one free trial cycle and one regular cycle, but it does not visibly validate every local interval/trial combination against PayPal's maxima before the API request.

Primary source: https://developer.paypal.com/docs/api/subscriptions/v1/

### Free trial and signup fee

- Current code models a trial as free (`0`) only. It does not model a discounted or paid trial phase.
- The code can put the local signup fee into PayPal's `payment_preferences.setup_fee`.
- The payload does not explicitly set `setup_fee_failure_action`. PayPal's documented plan schema/default behavior should be consulted and, more importantly, the failed-setup-fee path must be sandbox-tested. Do not promise that a subscription remains active after a failed signup fee without test evidence.

Primary sources:

- https://developer.paypal.com/docs/subscriptions/customize/billing-cycles/
- https://developer.paypal.com/docs/subscriptions/customize/trial-period/
- https://developer.paypal.com/docs/api/subscriptions/v1/

### Failure preferences

Current plan construction sets:

- `auto_bill_outstanding: true`; and
- `payment_failure_threshold: 3`.

PayPal documents its own failed-payment retry and outstanding-balance behavior. The documented model retries a failed payment every five days, up to twice per billing cycle; after the retry sequence, the failure contributes to the plan's failure threshold, and accumulated outstanding balances can be billed later. Suspension depends on the configured threshold. These are PayPal-side mechanics, not ArraySubs' local retry engine.

Primary source: https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/

### Finite subscription terms are not mirrored remotely

This is a high-risk limitation. The current PayPal regular billing cycle is infinite (`total_cycles: 0`). ArraySubs core can expire a local subscription based on payment count or end date, set `arraysubs-expired`, unschedule local actions, and fire `arraysubs_data_expired`. The PayPal bridge does not show a listener that cancels the remote `I-...` subscription on that expiration action.

Therefore, a locally finite subscription could expire in ArraySubs while the PayPal subscription remains able to bill. The article must not claim that fixed payment counts or local end dates automatically stop PayPal. This requires a release-blocking sandbox test or a product fix before marketing finite PayPal terms.

**First-party source inspection:** plan payload in `PayPalGateway::processSubscriptionPayment()`; `ArraySubs\Features\RecurringBilling\Services\ExpirationChecker::expire()` in `arraysubs/src/Features/RecurringBilling/Services/ExpirationChecker.php`, which updates `arraysubs-expired`, unschedules via `RenewalScheduler::unschedule()`, and fires `arraysubs_data_expired`; no matching listener found in `arraysubspro/src/Features/AutomaticPayments/` during source inspection.

## Amount, currency, tax, cart, and shipping behavior

### Amount precision and currency support

The adapter formats HUF, JPY, and TWD with zero decimal places and other currencies with two. This matches PayPal's current currency-code reference for those three zero-decimal currencies. However, “currency listed by PayPal” is not the same as “available for every merchant, country, payment method, or transaction type.” PayPal notes that availability varies and that a payment in a currency the merchant does not hold can remain pending for acceptance or conversion.

Primary sources:

- https://developer.paypal.com/api/rest/reference/currency-codes/
- https://developer.paypal.com/reference/country-codes/

Current source does not visibly enforce PayPal-specific minimum/maximum recurring amounts or merchant-country eligibility at checkout. Country, currency, account capability, and funding-source combinations belong in the prelaunch matrix.

### Tax is captured into the plan at signup

Current code calculates a PayPal plan tax percentage and inclusive/exclusive flag from WooCommerce product/address tax context and includes that tax configuration in the plan signature. That avoids reusing one cached plan across different calculated tax signatures. It does **not** dynamically update an existing subscriber's PayPal plan when:

- the customer changes billing or shipping address;
- the merchant changes a WooCommerce tax rate or tax class;
- the product price, quantity, discount, or recurring amount changes; or
- a legal tax treatment changes.

The remote PayPal subscription continues to reference the plan accepted at signup unless an explicit revise/replacement workflow changes it. The local renewal order can use current WooCommerce calculations, creating a possible mismatch between the amount PayPal actually collected and the amount WooCommerce expects.

**First-party source inspection:** tax calculation and plan payload paths plus `PayPalGateway::buildPlanSignature()` in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`; local renewal order construction in `arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`.

### Shipping and physical subscription products

The create-subscription payload uses `shipping_preference: NO_SHIPPING`, and the current plan/payment payload does not separately encode a PayPal shipping amount. That is a warning sign for physical recurring products and any model in which recurring shipping changes by address or carrier. The WooCommerce renewal order may add shipping locally, but the remote PayPal debit is governed by the accepted PayPal plan.

Do not claim physical subscription/cart parity without a full address, shipping, and renewal-amount test. PayPal also notes that subscription shipping callbacks are not compatible with its standard subscription test tooling in some flows.

Primary testing source: https://developer.paypal.com/docs/subscriptions/test-subscriptions/

### Cart restriction implications

The integration's cart restrictions should be described from observed behavior, not assumed from WooCommerce generally. A PayPal plan is assembled from subscription-specific terms, while one PayPal Subscription points to one plan. Mixed carts, multiple subscription products with different schedules, variable products, coupons, quantity changes, one-time products, shipping, and multiple tax classes can make one remote plan diverge from the WooCommerce order total.

**First-party source inspection:** `arraysubspro/src/Features/AutomaticPayments/Services/CartRestrictions.php`; PayPal plan construction in `PayPalGateway::processSubscriptionPayment()`. Before publication, run the matrix below and state the combinations actually accepted or rejected. Do not infer broad mixed-cart support from checkout availability alone.

### Critical reconciliation check missing from the success path

On `PAYMENT.SALE.COMPLETED`, the current adapter locates or creates a local order and calls WooCommerce payment completion, but source inspection did not find a strict comparison of webhook sale gross amount/currency against the pending renewal order's expected total/currency before completion. A retroactive order can be built using canonical local order creation, which may calculate a different present-day amount from the old PayPal plan.

The operator should reconcile at least: PayPal sale ID, gross amount, currency, PayPal subscription ID, local subscription ID, local renewal order total, tax, and refunds. The article should recommend an exception queue for mismatches rather than saying webhooks guarantee financial parity.

**First-party source inspection:** `PayPalGateway::handlePaymentSucceeded()`, the completed-sale helper around `handleCompletedSale()`, `findPendingRenewalOrder()`, and `createRetroactiveRenewalOrder()` in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`.

## Renewal flow: PayPal charges, ArraySubs books and reconciles

### Normal sequence

1. ArraySubs schedules an invoice-generation action ahead of the local due time (default lead time observed as six hours) and a due-time renewal processing action.
2. `RenewalProcessor` creates or reuses a pending WooCommerce renewal order. It checks for existing unpaid renewal orders to reduce duplicates.
3. The PayPal gateway's `processRenewalPayment()` does not make a capture API call. It returns a pending/success-style result explaining that PayPal manages billing and that the system is waiting for `PAYMENT.SALE.COMPLETED`.
4. PayPal charges the buyer according to the remote plan and sends `PAYMENT.SALE.COMPLETED`.
5. The verified webhook maps the sale to a local subscription and pending renewal order, records the PayPal sale ID, and completes the order.
6. The core completion flow advances local dates and schedules the next local bookkeeping actions.

**First-party source inspection:** `ArraySubs\Features\RecurringBilling\Services\RenewalScheduler` in `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`; `ArraySubs\Features\RecurringBilling\Services\RenewalProcessor` in `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`; `PayPalGateway::processRenewalPayment()` and `PayPalGateway::handlePaymentSucceeded()`.

### Race: PayPal sale arrives before the local invoice job

If PayPal's sale webhook arrives before ArraySubs creates the expected pending renewal order, the adapter tries to create a retroactive renewal order through the canonical `OrderCreation` service, with a smaller fallback path if needed. This is a useful resilience mechanism, but it is not proof of exact financial parity. The retroactive order still needs amount, currency, tax, coupon, shipping, sale-ID, and date reconciliation.

If the initial parent order is unresolved, current code avoids creating a retroactive renewal order because the sale may actually be the initial payment. It records a subscription-level note instead. That conservative behavior prevents one class of misclassification but leaves an operations task.

### Scheduler health is not payment health

A scheduled action can run successfully even when PayPal never charged, and PayPal can charge successfully before a local scheduled action runs. Monitor two distinct systems:

- **Remote payment truth:** PayPal subscription state, sale events, sale/refund/dispute IDs, gross amount, currency, and funding result.
- **Local accounting/lifecycle truth:** Action Scheduler jobs, WooCommerce order status and totals, ArraySubs next-payment/end dates, access status, gateway status, notes, and webhook event rows.

Internal support links suitable for this distinction:

- `/deals/arraysubs/resources/billing-strategy/how-woocommerce-subscription-renewals-work/`
- `/deals/arraysubs/resources/billing-strategy/manual-vs-automatic-subscription-renewals-in-woocommerce/`
- `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/`

## Webhook endpoint, verification, mapping, and duplicate handling

### Endpoint and verification

The effective PayPal webhook route is the ArraySubs REST webhook endpoint for the gateway slug, normally:

`/wp-json/arraysubs/v1/webhooks/arraysubs_paypal`

The adapter sends PayPal's transmission headers, raw body, and configured PayPal webhook ID to `/v1/notifications/verify-webhook-signature`. If the webhook ID is absent or PayPal verification does not return verified status, the request fails closed rather than processing an unsigned event.

PayPal's webhook documentation requires a publicly reachable HTTPS listener, successful `2xx` responses, and signature verification. PayPal retries failed deliveries on its delivery schedule; its documentation describes up to 25 retry attempts over three days for delivery failures. A developer laptop hostname such as `localhost` is not a public webhook target. Use an approved secure tunnel or public staging domain for live delivery tests.

Primary sources:

- https://developer.paypal.com/api/rest/webhooks/
- https://developer.paypal.com/api/rest/webhooks/rest/
- https://developer.paypal.com/api/rest/webhooks/simulator/

**Simulator caveat:** PayPal's simulator produces mock events and has special postback-verification behavior. It is useful for listener mechanics, not proof that real subscription creation, sale settlement, funding failure, tax, or dispute correlation works. Test both simulator and actual sandbox subscriptions.

**First-party source inspection:** `PayPalGateway::verifyWebhookSignature()` and event parsing in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`; `PayPalApiClient::verifyWebhookSignature()` in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalApiClient.php`; `arraysubspro/src/Features/AutomaticPayments/REST/WebhookController.php`.

### Current event map

| PayPal event | Current adapter route | Local consequence observed in source | Important qualification |
|---|---|---|---|
| `BILLING.SUBSCRIPTION.ACTIVATED` | Payment-success handler | Updates/captures lifecycle context | Does not complete a positive-value order by itself. |
| `BILLING.SUBSCRIPTION.CANCELLED` | Subscription-cancelled handler | Marks gateway state inactive, records gateway cancellation source/note/action | Source inspection did not prove local `WP_Post` status becomes cancelled. |
| `BILLING.SUBSCRIPTION.EXPIRED` | Subscription-cancelled handler | Same general remote-inactive path | Do not equate remote expiry with full local lifecycle reconciliation without testing. |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | Payment-failed handler | Finds pending order, fails it, marks gateway state errored, emits notes/actions | PayPal may still keep remote subscription active and retry. |
| `PAYMENT.SALE.COMPLETED` | Payment-success handler | Initial or renewal sale reconciliation, transaction ID, order completion | Amount/currency parity should be independently verified. |
| `PAYMENT.SALE.DENIED` | Payment-failed handler | Failure handling | Test how it differs from billing-subscription payment failure and avoid double operational alerts. |
| `PAYMENT.SALE.REFUNDED` | Refund handler | Adds local notes/action | Does not itself prove creation of a WooCommerce refund object. |
| `PAYMENT.SALE.REVERSED` | Refund handler | Treated similarly to refund | A reversal is not operationally identical to a voluntary refund; finance workflow should distinguish it. |
| `CUSTOMER.DISPUTE.CREATED` | Dispute-created handler | Adds notes/actions | No automatic evidence submission, access suspension, or cancellation observed. |
| `CUSTOMER.DISPUTE.RESOLVED` | Dispute-resolved handler | Adds notes/actions | Resolution outcome still requires financial/access reconciliation. |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Special custom handler | Marks gateway status paused and records context | It is not in the generic map but is explicitly intercepted. Current local pause/resume APIs remain unimplemented for PayPal. |

**First-party source inspection:** event constants and `getWebhookEventMap()`/mapping block near the top of `PayPalGateway.php`; `handlePaymentSucceeded()`, `handlePaymentFailed()`, `handleRefundCreated()`, `handleDisputeCreated()`, `handleDisputeResolved()`, `handleSubscriptionCancelled()`, and `handleBillingSubscriptionSuspended()` in that class; dispatch in `arraysubspro/src/Features/AutomaticPayments/Services/WebhookRouter.php`.

### Events that are not fully mapped

PayPal publishes more events than the adapter maps, including subscription created/updated events, sale pending events, plan events, and dispute updates. An unrecognized valid event can return an HTTP success response with `processed: false`; PayPal sees the `2xx` and will not redeliver merely because ArraySubs chose not to handle it. The article should recommend subscribing only to required events plus explicitly monitoring ignored-event counts during testing.

Primary event catalog:

- https://developer.paypal.com/docs/subscriptions/reference/webhooks/
- https://developer.paypal.com/api/rest/webhooks/event-names/

### Correlation order

Current resolution uses several clues:

1. `custom_id` JSON containing local order/subscription IDs;
2. PayPal `I-...` subscription ID stored in local metadata;
3. for disputes, seller transaction/sale ID matched to a WooCommerce order;
4. normalized gateway metadata and order/subscription relations.

Any event that lacks these references becomes a reconciliation exception. The staging test must include malformed/missing `custom_id`, a dispute whose transaction is known, and an event whose subscription ID is unknown.

### Duplicate protection and its limits

The database migration creates an ArraySubs webhook-event table with a unique key on `(gateway_slug, event_id)`. Successfully handled events are retained and periodically cleaned after roughly 30 days. This suppresses ordinary sequential redelivery of the same PayPal event ID.

There are still important boundaries:

- The router checks whether an event exists before handling it and records the event after side effects. It does not visibly reserve the unique row before handling. Two concurrent deliveries can both pass the first check, run side effects, and race at `INSERT IGNORE`.
- Empty/missing event IDs cannot receive meaningful event-ID deduplication.
- Two different PayPal event IDs that describe the same sale are not deduplicated by sale ID at this layer.
- After cleanup, a very old redelivery is no longer recognized by the event table.

Do not claim “exactly once.” The defensible phrase is “event-ID duplicate suppression for recorded events, supplemented by order-level checks; concurrency and entity-level idempotency still need testing.”

**First-party source inspection:** `arraysubspro/src/Features/AutomaticPayments/Services/DatabaseMigration.php` and `arraysubspro/src/Features/AutomaticPayments/Services/WebhookRouter.php`.

## API retry and idempotency behavior

`PayPalApiClient::request()` obtains an OAuth access token and has bounded retry behavior:

- transport-level `WP_Error`: retried twice after the original call (three attempts total);
- HTTP `429`: retried with `Retry-After`, bounded by the retry counter;
- HTTP `401`: token cache is cleared and the request is retried once with a new access token;
- general HTTP `5xx`: no general retry path was observed.

For POST requests with nonempty parameters, the client computes a stable SHA-256 value from the path and JSON parameters and sends it as `PayPal-Request-Id`. That is intended to make a repeated identical create/refund call safer. It has limits:

- PayPal idempotency support and retention are API-specific, so an old retry may no longer be protected.
- A full-refund call uses an empty body in the current code and therefore does not receive the same generated request ID path.
- Reusing a key for semantically different attempts is undesirable; stable body-derived keys need operational review when a merchant intentionally retries after changing remote state.
- Webhook idempotency and outbound request idempotency are separate controls.

PayPal's general idempotency reference says to send a unique `PayPal-Request-Id` on supported POST operations and warns against simultaneous requests with the same ID. The legacy sale-refund endpoint documents its own request-ID behavior/retention.

Primary sources:

- https://developer.paypal.com/api/rest/reference/idempotency/
- https://developer.paypal.com/docs/api/payments/v1/

**First-party source inspection:** `PayPalApiClient::request()` and the private request-ID generation logic in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalApiClient.php`.

## Failed, pending, and recovered payments

### PayPal and ArraySubs do not share one retry engine

PayPal plans manage the actual recurring debit and PayPal-side retry cadence. ArraySubs' generic automatic-payment pipeline has retry support for gateways that expose a retry configuration, but the PayPal adapter does not override the base retry configuration and does not implement a recent-charge verification method that can definitively prove a PayPal sale before retry. The PayPal renewal method also does not charge.

This architecture avoids intentionally double-charging from a local retry call, but it creates a state-coordination risk:

1. PayPal reports `BILLING.SUBSCRIPTION.PAYMENT.FAILED`.
2. ArraySubs fails a pending renewal order and marks `_gateway_status` as `errored`.
3. PayPal may keep the remote subscription `ACTIVE`, retry later, and eventually emit `PAYMENT.SALE.COMPLETED`.
4. The success handler completes a local order, but source inspection did not find a clear reset of the local gateway status back to active on the later sale.
5. Meanwhile, local logic seeing an errored gateway may treat the subscription as manual or surface a payment problem.

That can produce contradictory support signals or, if staff creates/collects a manual invoice while PayPal is still retrying, a duplicate-collection risk. The article should tell merchants to check PayPal retry/outstanding state before collecting by another method.

**First-party source inspection:** `PayPalGateway::processRenewalPayment()`, `PayPalGateway::handlePaymentFailed()`, `PayPalGateway::handlePaymentSucceeded()`, and inherited retry behavior from `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`; renewal failure processing in `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`.

### Pending is a real operational state

PayPal documents that some currency/account conditions can leave payments pending. Webhook delivery can also be delayed or temporarily fail. The merchant should not grant a “paid” result merely from approval, activation, or an order-return page. Define time-bounded states and escalation rules:

- approved / awaiting first sale;
- active / sale pending;
- sale completed / local order pending reconciliation;
- payment failed / PayPal retrying;
- payment failed / remote suspended;
- local errored / remote active;
- local paid / amount mismatch;
- remote sale / no local order.

Useful internal follow-up links:

- `/deals/arraysubs/resources/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/`
- `/deals/arraysubs/resources/payment-recovery/automatic-retry-for-failed-subscription-payments-what-good-looks-like/`
- `/deals/arraysubs/resources/payment-recovery/subscription-payment-failure-codes-a-practical-triage-guide/`

## Customer payment update, plan migration, quantity, and price changes

### PayPal can support revisions; this adapter does not yet implement the needed workflow

PayPal's Subscriptions API documents a revise-subscription operation. For plan changes, PayPal requires constraints such as the new plan belonging to the same product, and the payer may need to log in and re-consent. PayPal states that a new price takes effect in the next billing cycle and that the API does not automatically provide merchant-specific proration or one-time adjustment logic.

Primary source: https://developer.paypal.com/docs/subscriptions/customize/revise-subscriptions/

The current ArraySubs PayPal adapter advertises a reauthorization-style payment-method update capability, but `PayPalGateway::getPaymentMethodUpdateMechanism()` returns a success-shaped result with an empty URL and a message. The customer-portal JavaScript expects a `redirect_url` or `url`; without one, it displays an error. Source inspection did not find a workflow that:

- creates a replacement PayPal subscription;
- sends the customer through fresh PayPal consent;
- atomically swaps the local `I-...` ID;
- preserves the intended next billing date;
- cancels the old remote subscription after replacement; or
- rolls back safely if reauthorization fails.

Therefore, “customers can update their PayPal payment method from the ArraySubs portal” is not a supportable claim for the inspected version.

**First-party source inspection:** `PayPalGateway::getPaymentMethodUpdateMechanism()`; `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMethodCoordinator.php`; `arraysubspro/src/Features/AutomaticPayments/REST/PaymentMethodController.php`; portal response handling in `arraysubs/src/resources/customerPortal.js`.

### Local plan switching does not revise PayPal

ArraySubsPro listens to `arraysubs_plan_switch_completed`, but the current automatic-payment hook only recaptures gateway context/metadata; the PayPal API client has no revise-subscription method. Local product, quantity, recurring amount, or tax changes therefore can leave the remote PayPal plan unchanged.

The article should recommend this rule: **do not edit the economic terms of an active PayPal-backed ArraySubs subscription unless the workflow explicitly creates/revises the PayPal agreement and confirms customer consent.** If a migration is unavoidable, create a documented replace-and-cancel runbook with duplicate-billing and service-gap controls.

**First-party source inspection:** `ArraySubsPro\Features\AutomaticPayments\Services\Hooks::onPlanSwitchCompleted()` in `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`; `PayPalApiClient.php` method inventory; gateway capabilities in `PayPalGateway.php`.

### Detaching a gateway reference is not cancellation

The admin detach path can clear local gateway identifiers without cancelling the remote PayPal subscription. That can strand an active `I-...` agreement outside local control while PayPal continues billing. Any support operation that detaches or manually changes the gateway must first inspect and, when intended, cancel the exact remote PayPal subscription in PayPal.

**First-party source inspection:** `arraysubspro/src/Features/AutomaticPayments/REST/AutoRenewController.php` and the automatic-payment metadata/detach services.

## Cancellation, pause, resume, skip, and expiration

### Immediate cancellation

For an immediate local cancellation, the Pro bridge can call PayPal's cancel-subscription endpoint. PayPal cancellation is terminal; this is not the same as suspension. The two-way sync guard marks locally initiated actions for five minutes so the corresponding echo webhook can be recognized and skipped.

**First-party source inspection:** `PayPalGateway::cancelRemoteBillingContext()`; `PayPalApiClient::cancelSubscription()`; `ArraySubsPro\Features\AutomaticPayments\Services\TwoWaySyncGuard` in `arraysubspro/src/Features/AutomaticPayments/Services/TwoWaySyncGuard.php`, constant `GUARD_TTL = 300`, and methods `markInitiated()`, `wasInitiatedLocally()`, and `clear()`.

The guard is a short-lived echo-loop control, not durable financial idempotency. A delayed webhook after the five-minute transient or a separate event ID still needs safe handlers.

### Cancel at period end

The current Pro hook appears to cancel the PayPal subscription immediately even when the local subscription is scheduled to remain active until its end date. Locally, `_auto_renew` is turned off and access can continue until the scheduled local cancellation date. Remotely, PayPal is already terminal. This prevents another PayPal charge, but it means “cancel at period end” is implemented as **remote cancel now, local access until period end**, not a PayPal-scheduled future cancellation.

Undoing the local pending cancellation cannot reactivate a cancelled PayPal subscription. Any “undo cancellation” UI or message must require reauthorization/replacement for PayPal; the current adapter does not provide a complete reauthorization URL flow.

**First-party source inspection:** cancellation listeners in `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`; core customer/cancellation behavior in `arraysubs/src/Features/CustomerPortal/REST/CustomerController.php` and `arraysubs/src/Features/CancellationFlow/Services/Hooks.php`; PayPal gateway cancellation and capability methods.

### External PayPal cancellation does not prove local cancellation

`PayPalGateway::handleSubscriptionCancelled()` records gateway status inactive and sets gateway-origin context/notes/actions. The Pro cleanup listener recognizes that the event originated at the gateway and avoids echoing another cancel call. Source inspection did not find that this path updates the ArraySubs subscription post status to `arraysubs-cancelled`.

Result: a customer or merchant cancelling directly in PayPal can leave local access/lifecycle status active while the gateway state is inactive. This must be tested and either fixed or documented as a manual reconciliation requirement.

### PayPal supports suspend/activate, but the current adapter does not expose it

PayPal's API documents suspend and activate endpoints. The inspected ArraySubs PayPal API client does not expose wrapper methods for those endpoints; the gateway capabilities report pause/resume as unsupported, and the gateway inherits no-op pause/resume behavior. Core ArraySubs pause and skip features change local dates/status/schedules; they do not, by themselves, alter PayPal's remote billing schedule.

This distinction is essential:

- Do **not** say “PayPal cannot pause subscriptions.” PayPal can.
- Do say “the inspected ArraySubsPro PayPal adapter does not currently synchronize local pause/resume/skip actions with the remote PayPal subscription.”
- Treat local pause or skip as unsafe for PayPal-backed subscriptions until the UI blocks it or an end-to-end test proves the remote charge is suspended/rescheduled.

**First-party source inspection:** PayPal gateway capability declarations in `PayPalGateway.php`; `AbstractArraySubsGateway::pauseRemoteBillingContext()` and `resumeRemoteBillingContext()`; method inventory in `PayPalApiClient.php`; `arraysubs/src/Features/SkipRenewal/Services/PauseManager.php`; `arraysubs/src/Features/SkipRenewal/Services/SkipManager.php`; `Hooks::onSubscriptionPaused()` and the corresponding resume listener in `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`.

### Finite expiration repeats the same remote-control issue

Local expiration unschedules local renewal work but does not prove remote PayPal cancellation. This is distinct from “cancel at period end” because an expiration can be driven by configured payment count or end date. It belongs in the launch test matrix as its own case.

## Refunds, reversals, and disputes

### Merchant-initiated refunds

The adapter refunds a PayPal **sale transaction ID**, not the `I-...` subscription ID. It calls the legacy Payments v1 sale-refund route:

`POST /v1/payments/sale/{sale_id}/refund`

For a full refund it sends no amount body; for a partial refund it sends amount and currency. PayPal marks the Payments v1 API as deprecated for new integrations, although the endpoint remains documented. Refund results can be pending or fail, and time limits/eligibility apply. The article should not promise that every historical PayPal subscription payment can be refunded through WooCommerce.

Primary source: https://developer.paypal.com/docs/api/payments/v1/

If a legacy/imported order stores an `I-...` agreement ID as its transaction ID instead of a sale ID, the adapter declines the API refund and instructs the operator to use PayPal. That is safer than sending the wrong identifier.

**First-party source inspection:** `PayPalGateway` refund method and `PayPalApiClient::refundSale()`.

### External refunds and reversals

On `PAYMENT.SALE.REFUNDED` or `PAYMENT.SALE.REVERSED`, the current handler records notes/actions, but source inspection did not find creation of a corresponding `WC_Order_Refund` object or complete order/status/accounting reconciliation in that handler. Treat external PayPal refunds as reconciliation work, not as automatically mirrored WooCommerce refunds.

A reversal also has different risk meaning from a voluntary merchant refund. Reporting should preserve the PayPal event type and dispute/reversal reason rather than merging both into “refunded.”

### Disputes

`CUSTOMER.DISPUTE.CREATED` and `CUSTOMER.DISPUTE.RESOLVED` add local notes/actions. The bridge does not visibly submit evidence, change access, place the subscription on hold, cancel the remote subscription, or automatically adjust order/refund records. Merchants need a manual dispute runbook covering:

- evidence deadlines and PayPal case ownership;
- whether access should continue during the dispute;
- whether the agreement should be suspended or cancelled;
- order and accounting adjustments after resolution; and
- prevention of subsequent renewals when appropriate.

**First-party source inspection:** `PayPalGateway::handleRefundCreated()`, `handleDisputeCreated()`, and `handleDisputeResolved()`.

## Checkout UI compatibility and gateway availability

ArraySubsPro registers payment gateways and has a WooCommerce Blocks registration hook. In the inspected `Hooks::registerBlocksPaymentMethods()` implementation, only Paddle receives a Blocks integration registration. No PayPal Blocks payment-method integration was observed.

The article must therefore avoid a generic “works at WooCommerce checkout” claim. Test and report separately:

- classic shortcode checkout;
- WooCommerce Checkout block;
- guest and logged-in checkout;
- mobile browser and pop-up/redirect restrictions;
- returning from PayPal with the same session/cookies;
- buyer cancel and browser-back flows.

**First-party source inspection:** `ArraySubsPro\Features\AutomaticPayments\Services\Hooks::registerBlocksPaymentMethods()` in `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`.

## Gateway health and observability

The ArraySubsPro gateway-health area exposes useful operational context such as enabled/setup/availability/test-mode state, linked subscription counts, recent webhook data, webhook URL, declared capabilities, and webhook event logs. This should be mentioned as an observability feature, not as proof that a payment path works.

Observed limitation: the event-log UI dropdown is hardcoded around Stripe event names even though the underlying generic filter/API can represent other gateway events. Operators should still inspect PayPal-specific raw event types and IDs rather than rely only on a preset dropdown.

**First-party source inspection:** `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`; relevant gateway-health React resources under `arraysubspro/src/resources/`; webhook event storage services.

Recommended production monitors:

| Monitor | Alert condition | Why |
|---|---|---|
| Webhook delivery age | No PayPal event within the store's expected traffic window | Detects wrong webhook ID/URL, firewall, credentials, or listener failure. |
| Unprocessed event count | Verified events return `processed: false` above baseline | Detects event-map drift after PayPal changes or wrong subscriptions. |
| Remote sale without local order | Sale older than reconciliation SLA has no completed Woo order | Prevents missing revenue/order/access records. |
| Local pending order without sale | Renewal order remains pending past PayPal charge/retry window | Detects failed payment, pending funding, or webhook loss. |
| Amount/currency mismatch | PayPal gross differs from Woo expected total/currency | Detects stale plan, tax/address/price drift, or data mapping error. |
| Gateway/local lifecycle mismatch | Remote cancelled/suspended/active conflicts with local post/gateway status | Detects portal/direct-PayPal actions and failed sync. |
| Duplicate sale assignment | Same PayPal sale ID on multiple local orders | Detects race/idempotency failures. |
| Expired local / active remote | Local `arraysubs-expired` with active `I-...` | Prevents post-term billing. |

## Prioritized implementation gaps and risks

### P0 / release-blocking for broad PayPal marketing claims

1. **Local finite expiration may not stop remote PayPal billing.** Remote plan is infinite and no expiration-to-cancel listener was found.
2. **Local pause/skip may not stop or move PayPal billing.** PayPal has suspend/activate APIs, but the current gateway declares these actions unsupported and core local pause/skip can still alter only local state.
3. **Customer payment-method update is incomplete.** The advertised reauthorization mechanism returns no usable redirect URL and there is no replace/swap/cancel workflow.
4. **Local product/price/quantity/tax/plan switching does not revise the PayPal subscription.** Remote and local amounts can diverge.
5. **External PayPal cancellation may leave the local subscription status/access active.** Gateway status is marked inactive, but local post-status transition was not found.
6. **Renewal success does not strictly validate amount/currency before local completion.** Financial mismatch can be accepted silently.

### P1 / must be documented and tested

1. Checkout Blocks support is not registered for PayPal.
2. Failed-payment local gateway state can remain errored after a later PayPal retry succeeds.
3. Scheduled cancellation cancels PayPal immediately; undo cannot restore the cancelled remote agreement.
4. External refunds/reversals do not visibly create WooCommerce refund objects.
5. Webhook dedupe is not exactly-once under concurrency and is event-ID based rather than sale-ID based.
6. Product/plan cache reuse does not visibly validate that the remote cached object is still active/usable.
7. HTTP 5xx calls lack general retry handling; full-refund POST lacks the generated request ID because its body is empty.
8. Physical shipping/multi-tax/mixed-cart economics are not proven.

### P2 / messaging and operations

1. Stale Smart Payment Buttons wording in code comments can leak into inaccurate documentation; actual flow is redirect approval.
2. Gateway-health event filter UI is Stripe-centric.
3. PayPal simulator alone is insufficient; actual sandbox subscription events are required.
4. “PayPal supports currency X” needs merchant-country and account-capability qualification.

## Required staging and PayPal sandbox test matrix

Use a PayPal developer sandbox business account, sandbox buyer accounts/funding scenarios, and a **public HTTPS** test endpoint. The confirmed local staging site at `localhost` is suitable for admin/browser inspection but cannot receive PayPal's public webhooks without a tunnel. Record ArraySubs subscription ID, Woo order IDs, PayPal product/plan/subscription/sale/refund/dispute IDs, amounts, currencies, all timestamps, webhook IDs, and Action Scheduler action IDs for every case.

### A. Configuration and authentication

| ID | Test | Expected evidence |
|---|---|---|
| A1 | Correct sandbox client ID/secret and webhook ID | Gateway available in sandbox; token succeeds; signed real event verifies. |
| A2 | Wrong client secret | Clear admin/checkout failure; no local active subscription. |
| A3 | Missing/wrong webhook ID | Event rejected; no side effects; health UI shows failure or stale delivery. |
| A4 | Live/sandbox credential mismatch | Fail closed with actionable error; no live charge. |
| A5 | Public HTTPS endpoint blocked, redirected, WAF-challenged, or returning non-2xx | PayPal delivery attempts visible; local system does not falsely report success. |

### B. Checkout and first payment

| ID | Test | Verify |
|---|---|---|
| B1 | Classic checkout, immediate recurring amount, no trial/setup fee | Redirect approval, `I-...`, activation, completed sale, one completed initial Woo order with exact sale ID/amount/currency. |
| B2 | Buyer cancels on PayPal | No paid order; no active local subscription/access; cancel return is clear. |
| B3 | Buyer approves, webhook arrives before browser return | One completion only; return handler is idempotent. |
| B4 | Buyer approves, browser returns before webhook | Return lookup completes only with sale evidence; later webhook is harmless. |
| B5 | Buyer approves then closes browser before return | Webhook alone reconciles order and subscription. |
| B6 | Free trial, no setup fee | Zero initial order behavior, remote trial timing, first paid renewal, dates align. |
| B7 | Free trial plus setup fee | Setup-fee sale and trial state correctly classified; no duplicate initial/renewal order. |
| B8 | Setup-fee failure | Confirm PayPal subscription status/default action and local access/order state. |
| B9 | Checkout block | Either PayPal is correctly available and works, or is explicitly unavailable; no ambiguous claim. |
| B10 | Mobile and third-party-cookie-restricted browser | Approval/return correlation survives redirect; no stuck session-only dependency. |

### C. Schedule combinations

Test valid edge values and invalid values: every day/week/month/year, multi-interval plans, leap-day/month-end starts, trial maxima, and local schedules beyond PayPal interval maxima. Verify that invalid combinations are blocked before remote orphan objects are created. Confirm time zone/DST behavior even though PayPal timestamps are UTC.

### D. Amount, tax, shipping, and cart

| ID | Test | Verify |
|---|---|---|
| D1 | Standard two-decimal currency | Exact plan and sale amount/currency. |
| D2 | JPY, HUF, TWD | No fractional amount sent; local total matches. |
| D3 | Unsupported/unheld currency/account combination | Pending/rejection handled; no premature access. |
| D4 | Inclusive tax | Plan tax and sale gross match Woo order initial and renewal totals. |
| D5 | Exclusive tax | Same reconciliation. |
| D6 | Customer changes taxable address after signup | Document whether PayPal and local next renewal diverge; do not alter silently. |
| D7 | Merchant changes tax rate/class after signup | Same. |
| D8 | Physical recurring item with shipping | Remote debit includes intended economics or checkout is blocked. |
| D9 | Coupon/discount, quantity >1, signup fee, tax together | PayPal plan and Woo totals match. |
| D10 | Mixed cart and multiple subscription products/schedules | Explicitly supported/rejected combinations; no partial plan creation. |

### E. Renewal races and duplicates

| ID | Test | Verify |
|---|---|---|
| E1 | Local invoice job before PayPal sale | One pending order becomes completed from sale webhook. |
| E2 | PayPal sale before local invoice job | Exactly one correct retroactive renewal order; later scheduler does not duplicate. |
| E3 | Same webhook delivered sequentially twice | One order/payment side effect and duplicate audit result. |
| E4 | Same webhook delivered concurrently twice | No duplicate order/notes/date advancement; this specifically tests the check-then-insert race. |
| E5 | Two event IDs reference same sale | One sale is assigned once. |
| E6 | Event missing `custom_id` but known `I-...` | Correct metadata fallback. |
| E7 | Unknown `I-...` or sale ID | Safe unprocessed event and operator-visible exception. |
| E8 | Initial sale arrives with unresolved parent order | No mistaken renewal; support path identifies the orphan. |

### F. Failures, pending, and retries

| ID | Test | Verify |
|---|---|---|
| F1 | First recurring failure, PayPal remains active/retrying | Local failed order and gateway status are accurate without starting an independent charge retry. |
| F2 | Later PayPal retry succeeds | Correct order completed; local gateway status returns to usable state or documented gap is reproduced. |
| F3 | Failure threshold reached | PayPal suspended state and local status/access/action scheduler are reconciled. |
| F4 | Outstanding balance collected with a later cycle | Gross allocation and local renewal orders do not duplicate or under/overstate revenue. |
| F5 | Pending currency/payment | Access policy follows settlement policy; no activation-only completion. |
| F6 | Webhook delayed beyond normal SLA | Return lookup/manual reconciliation works without duplicate collection. |
| F7 | PayPal API `401`, `429`, transport error, `500` | Retry behavior matches code; no duplicate remote product/plan/subscription/refund. |

### G. Lifecycle controls

| ID | Test | Verify |
|---|---|---|
| G1 | Immediate local cancel | Remote is cancelled once; local cancelled; echo webhook harmless. |
| G2 | Cancel at period end | Remote cancellation timing and local access timing match documented behavior. |
| G3 | Undo pending cancellation | UI does not claim auto-renew restored unless a valid remote agreement is restored/replaced. |
| G4 | Customer cancels directly in PayPal | Local subscription/access updates or an alert is raised; reproduce current gap. |
| G5 | Merchant cancels directly in PayPal | Same. |
| G6 | Local pause | No remote charge during pause, or action is blocked as unsupported. |
| G7 | Local resume | Remote becomes billable with a known next date, or action is blocked. |
| G8 | Skip one/multiple cycles | Remote PayPal charge is skipped/moved, or action is blocked. |
| G9 | Local finite payment count reached | Remote PayPal subscription is stopped; reproduce current infinite-plan risk if not. |
| G10 | Local fixed end date reached | Same. |

### H. Customer update and migration

| ID | Test | Verify |
|---|---|---|
| H1 | Customer clicks update payment method | A usable PayPal consent path exists; current inspected version is expected to expose the missing-URL gap. |
| H2 | Local plan switch | PayPal plan/subscription amount changes with consent, or switch is blocked. |
| H3 | Quantity/price/product/tax edit | Remote and local amount remain aligned, or edit is blocked. |
| H4 | Replace-and-cancel migration | Old agreement cancelled only after new agreement activates; no double charge or service gap. |
| H5 | Admin detaches gateway | Remote agreement is cancelled first or UI gives an explicit high-risk warning. |

### I. Refunds, reversals, and disputes

| ID | Test | Verify |
|---|---|---|
| I1 | Full refund from Woo admin | Correct sale ID; PayPal refund state; one Woo refund; echo event harmless. |
| I2 | Partial refund | Amount/currency and remaining order balance match. |
| I3 | Refund pending/fails | Woo order is not falsely finalized; operator receives actionable status. |
| I4 | Refund directly in PayPal | Woo refund/accounting/access reconciliation or clear exception task. |
| I5 | Reversal | Preserved as reversal, not silently treated as ordinary refund in reporting. |
| I6 | Dispute opened/updated/resolved | Notes/events correlate to order; manual evidence/access/cancel runbook executes. |

Primary PayPal testing reference: https://developer.paypal.com/docs/subscriptions/test-subscriptions/

## Decision framework for merchants

The article can offer a compact “use, conditionally use, or do not use yet” framework based on proven behavior:

| Scenario | Current research conclusion |
|---|---|
| Simple fixed-price, indefinite digital subscription; classic checkout; no pause/skip/plan edits | Candidate for sandbox validation. The core create/approve/webhook renewal architecture is present. |
| Free trial plus later fixed recurring amount | Candidate, but test trial boundary, setup fee, initial-sale classification, and first renewal. |
| Finite number of payments or fixed end date | Do not market as safe until remote PayPal cancellation on local expiration is proven/fixed. |
| Customer self-service PayPal payment update | Do not claim supported in inspected version; current response lacks usable reauthorization URL/workflow. |
| Frequent upgrades/downgrades, quantity changes, dynamic pricing, or address-sensitive tax | Poor fit until explicit PayPal revise/re-consent and proration/reconciliation workflow exists. |
| Pause or skip cycles | Do not enable for PayPal-backed subscriptions until remote suspend/reschedule behavior is implemented and tested. |
| Physical recurring shipping or complex mixed carts | Treat as unsupported/unproven until amount/shipping/cart matrix passes. |
| Checkout block required | Test first; current Blocks registration does not include PayPal. |
| Team can monitor webhooks and reconcile PayPal-to-Woo daily | Operationally safer than an unattended setup, but monitoring does not fix contract gaps. |

The article should identify these poor-fit cases plainly. That satisfies the brief's requirement to explain when ArraySubs is not the best fit and makes the supported cases more credible.

## Primary sources and what each supports

All time-sensitive provider claims should cite the specific source beside the claim in the final article.

1. **PayPal Subscriptions overview** — Product/plan/subscription/approval conceptual flow and current platform positioning: https://developer.paypal.com/platforms/subscriptions
2. **PayPal integrate subscriptions** — Integration sequence and approval: https://developer.paypal.com/docs/subscriptions/integrate/
3. **Subscriptions API v1 reference** — status enum, billing-cycle constraints, plan fields, create/get/cancel/suspend/activate/revise/capture/list-transactions endpoints: https://developer.paypal.com/docs/api/subscriptions/v1/
4. **Billing cycles** — trial/regular cycle configuration: https://developer.paypal.com/docs/subscriptions/customize/billing-cycles/
5. **Trial periods** — trial modeling and validation context: https://developer.paypal.com/docs/subscriptions/customize/trial-period/
6. **Revise subscriptions** — same-product plan change, payer re-consent, next-cycle price behavior, no automatic proration/one-time adjustment: https://developer.paypal.com/docs/subscriptions/customize/revise-subscriptions/
7. **Payment failure retry** — five-day retry cadence, number of retries, outstanding balance, threshold/suspension behavior: https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/
8. **Subscription webhook reference** — subscription-related event families: https://developer.paypal.com/docs/subscriptions/reference/webhooks/
9. **All PayPal event names** — authoritative event catalog and drift check: https://developer.paypal.com/api/rest/webhooks/event-names/
10. **Webhook overview and REST integration** — listener, HTTPS/2xx, verification, delivery/retry behavior: https://developer.paypal.com/api/rest/webhooks/ and https://developer.paypal.com/api/rest/webhooks/rest/
11. **Webhook simulator** — simulator scope and limitations: https://developer.paypal.com/api/rest/webhooks/simulator/
12. **Subscription testing** — sandbox/test guidance: https://developer.paypal.com/docs/subscriptions/test-subscriptions/
13. **REST idempotency** — `PayPal-Request-Id` guidance: https://developer.paypal.com/api/rest/reference/idempotency/
14. **Payments v1** — deprecated sale-refund endpoint, full/partial payload behavior, refund states/limits: https://developer.paypal.com/docs/api/payments/v1/
15. **Currency codes** — decimal handling and merchant/account variability: https://developer.paypal.com/api/rest/reference/currency-codes/
16. **Country codes** — country references for account eligibility testing: https://developer.paypal.com/reference/country-codes/
17. **WooCommerce payment gateways for subscriptions** — ecosystem capability framing only; it describes WooCommerce Subscriptions, not ArraySubs: https://woocommerce.com/document/subscriptions/payment-gateways/
18. **WooCommerce enabling subscription gateways** — ecosystem setup/capability context only: https://woocommerce.com/document/subscriptions/payment-gateways/enabling-payment-gateways-for-subscriptions/
19. **WooCommerce renewal testing** — ecosystem testing ideas only; do not imply its helpers operate on ArraySubs: https://woocommerce.com/document/subscriptions/testing-subscription-renewal-payments/

## Internal-link candidates and placement purpose

Use natural anchor text; do not dump all links into one paragraph.

| Target | Suggested anchor / context |
|---|---|
| `/deals/arraysubs/features/#payment-gateways` | “ArraySubs payment gateway features” after the independent architecture explanation. |
| `/deals/arraysubs/use-cases/recipes/member-update-payment/` | Link when explaining payment-method update requirements; explicitly distinguish desired recipe/workflow from the inspected PayPal gap. |
| `/deals/arraysubs/use-cases/recipes/gateway-health-monitor/` | “monitor gateway and webhook health” in operations section. |
| `/deals/arraysubs/resources/payments-and-compliance/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/` | Compare gateway-owned recurring lifecycle after the reader understands PayPal. |
| `/deals/arraysubs/resources/payments-and-compliance/paddle-merchant-of-record-for-woocommerce-subscriptions/` | Alternative for merchants prioritizing Merchant of Record tax/compliance. Publish/link when A060 exists. |
| `/deals/arraysubs/resources/payments-and-compliance/automatic-vs-manual-gateway-support-for-subscriptions/` | Explain why automatic support means lifecycle synchronization, not simply checkout acceptance. Publish/link when A061 exists. |
| `/deals/arraysubs/resources/payments-and-compliance/best-payment-gateways-for-woocommerce-subscriptions/` | Broader gateway-selection context (A056 if published). |
| `/deals/arraysubs/resources/payments-and-compliance/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/` | Comparison intent (A057 if published). |
| `/deals/arraysubs/resources/billing-strategy/how-woocommerce-subscription-renewals-work/` | Local invoice/scheduler versus remote charge explanation. |
| `/deals/arraysubs/resources/billing-strategy/manual-vs-automatic-subscription-renewals-in-woocommerce/` | Manual fallback and duplicate-collection risk. |
| `/deals/arraysubs/resources/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/` | Failed-payment operations. |
| `/deals/arraysubs/resources/payment-recovery/automatic-retry-for-failed-subscription-payments-what-good-looks-like/` | Clarify PayPal-owned retries. |
| `/deals/arraysubs/resources/payment-recovery/subscription-payment-failure-codes-a-practical-triage-guide/` | Diagnostic handoff. |
| `/deals/arraysubs/resources/subscription-foundations/woocommerce-subscription-launch-readiness-checklist/` | Prelaunch matrix/checklist. |
| `/deals/arraysubs/pricing/` | Primary “View Pro Pricing” CTA only after the reader has received the answer, limitations, and test checklist. |

The A059 brief mentions `/deals/arraysubs/use-cases/recipes/stripe-automatic-billing-sca/`. That is Stripe-specific and should not be forced into the PayPal guide unless used in a clearly labeled comparison sentence. The PayPal article must not repeat a product setup recipe; it owns the broader architecture, constraints, decision, and testing intent.

## Claims the article must not make

1. “ArraySubs uses PayPal Billing Agreements” — inaccurate for the inspected current code; it uses PayPal Subscriptions REST API objects.
2. “PayPal Smart Payment Buttons are embedded at checkout” — current implementation returns a redirect approval URL; no current evidence for embedded buttons.
3. “Approval means the order is paid” — activation/approval is distinct from `PAYMENT.SALE.COMPLETED`.
4. “ArraySubs charges PayPal on each renewal” — PayPal charges from the remote plan; ArraySubs books/reconciles the renewal.
5. “PayPal renewals are exactly once” — event-ID dedupe and order checks exist, but concurrency/entity-level gaps remain.
6. “Every PayPal webhook is handled” — only a defined subset is mapped; others can return `processed: false` with HTTP 2xx.
7. “PayPal supports automatic retry through ArraySubs” — PayPal manages its retry sequence; the ArraySubs PayPal adapter does not initiate local charge retries.
8. “A later retry automatically restores every local state” — local `_gateway_status` recovery after a later sale is not proven in source.
9. “Customers can update their PayPal payment method in the ArraySubs portal” — current mechanism supplies no usable redirect URL or replacement workflow.
10. “Plan switches, quantity edits, tax changes, and price changes update PayPal automatically” — no revise-subscription implementation was found.
11. “Pause and skip are supported for PayPal subscriptions” — current local operations are not synchronized to remote PayPal billing.
12. “PayPal cannot pause subscriptions” — also false; PayPal provides suspend/activate APIs, but this adapter does not expose them.
13. “Fixed-term subscriptions stop automatically at PayPal” — remote regular cycle is infinite and expiration-to-cancel synchronization was not found.
14. “Cancel at period end schedules cancellation inside PayPal” — current bridge appears to cancel remote immediately while local access continues.
15. “Undo cancellation restores PayPal auto-renew” — PayPal cancellation is terminal; current reauthorization/replacement flow is incomplete.
16. “Direct PayPal cancellation always cancels local access” — local subscription post-status transition was not found.
17. “External refunds automatically create WooCommerce refunds” — current handler appears note/action oriented.
18. “Reversals and refunds are the same” — current code routes them similarly, but finance/risk meaning differs.
19. “PayPal handles tax dynamically on every ArraySubs renewal” — plan tax is captured at signup and existing plans are not revised by local changes.
20. “Physical shipping and complex mixed carts are supported” — `NO_SHIPPING` and plan economics make these unproven.
21. “Checkout Blocks are supported” — no PayPal Blocks registration was observed.
22. “All PayPal-supported currencies work for every seller” — country, account, payment type, and held-currency conditions vary.
23. “The webhook simulator proves the integration works” — it does not prove real subscription/sale/funding behavior.
24. “Gateway health means payments are healthy” — it is observability evidence, not transaction proof.
25. “WooCommerce Subscriptions documentation proves ArraySubs behavior” — it is ecosystem context for a different subscription engine.

## Recommended evidence assets for the eventual article

This research task does not create article assets, but the writing task should prioritize factual screenshots/diagrams:

1. **ArraySubsPro PayPal gateway settings screenshot:** sandbox mode, credential status, and webhook URL, with credentials redacted.
2. **Gateway health screenshot:** PayPal enabled/setup/test status plus most recent webhook timestamp.
3. **ArraySubs subscription detail screenshot:** gateway `arraysubs_paypal`, local status, next date, PayPal `I-...` reference (partially redacted), and renewal order relation.
4. **WooCommerce renewal order screenshot:** completed order with PayPal sale transaction ID, amount, currency, notes, and parent/local subscription linkage.
5. **Action Scheduler screenshot:** invoice-generation and due-time renewal actions for the same subscription.
6. **Webhook event log screenshot:** verified `PAYMENT.SALE.COMPLETED`, event ID, processed result, and correlated order/subscription.
7. **Context-specific architecture diagram:** Woo checkout → PayPal Product/Plan/Subscription → buyer approval → PayPal sale/webhook → Woo renewal order.
8. **Context-specific failure-state diagram:** PayPal active/retrying versus local failed/errored and the reconciliation checks required before manual collection.
9. **Context-specific lifecycle comparison:** provider supports suspend/activate; current adapter supports cancel but not synchronized pause/skip/update/migration.

Use 3–6 real plugin screenshots when the parent article workflow allows it, plus several context-specific visuals. Do not fabricate a PayPal success screen or populate screenshots with unsupported transaction evidence.

## Fact-check and editorial handoff

Before publication, the writer/reviewer should:

- Put the direct answer within the first 150 words.
- Name “PayPal Subscriptions REST API” and “ArraySubsPro 1.1.2 / ArraySubs 1.8.11” near the first implementation-specific claim.
- Label all code-derived behavior as first-party source inspection unless the sandbox matrix has reproduced it.
- Include a visible “Last verified July 20, 2026” line and the test environment.
- Cite PayPal primary docs immediately beside status, retry, revise, currency, webhook, and refund claims.
- Label WooCommerce Subscriptions sources as ecosystem context, not ArraySubs proof.
- Include an extractable object/flow table, a supported/unproven lifecycle table, and a prelaunch checklist.
- State the current high-risk gaps prominently; do not bury them after the CTA.
- Keep the pricing CTA after the core answer, constraints, and decision framework.
- Have a technical reviewer verify every current-code claim against the release being published, because gateway implementations and PayPal APIs can change.
- Re-run at minimum the P0 matrix after every ArraySubsPro PayPal change, WooCommerce major update, PayPal API/event change, or customer-portal lifecycle change.

## Bottom-line research conclusion

The inspected ArraySubsPro PayPal integration has a coherent base architecture for a narrow case: a classic-checkout, fixed-price, indefinite PayPal subscription whose remote sale events are reconciled into WooCommerce renewal orders. Its strongest implementation choices are sale-based order completion, signature verification, multiple webhook-correlation routes, return-path transaction recovery, and retroactive renewal-order creation.

It is not yet safe to present as universal PayPal recurring-payment lifecycle parity. Finite terms, local pause/skip, customer payment update, plan/price/tax migration, external cancellation, later-retry state recovery, physical/mixed-cart economics, Checkout Blocks, and external refund accounting require either implementation work or explicit sandbox proof. The article should make that boundary the differentiating insight rather than smoothing it over.
