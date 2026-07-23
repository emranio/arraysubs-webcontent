# Research brief: Automatic Retry for Failed Subscription Payments

## Research record

- **Article:** A034 — Automatic Retry for Failed Subscription Payments: What Good Looks Like
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `automatic retry failed subscription payments`
- **Long-tail intent:** `WooCommerce failed payment retry rules`, `smart retry recurring payments`, `how many times to retry a failed subscription`
- **Search intent:** Informational. Subscription operators, finance teams, customer-success teams, and WooCommerce implementers want to know which failed renewals should be retried, how often, who owns the attempt, and how to avoid duplicate charges or harmful retry loops.
- **Evidence scope:** Full A034 brief; `plan/07-seo-geo-publishing-standard.md`; ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 source; payment-retry, gateway-sync, email, lifecycle, and Action Scheduler architecture; current official WooCommerce, Stripe, PayPal, Paddle, and PCI SSC documentation.
- **Test limitation:** No live decline, webhook-loss, concurrency, or scheduler-boundary test was run. Product findings are current source observations, not live test results. The final article needs an original current-version test environment, screenshots/timeline, named author/reviewer, visible publication/verification dates, limitations, and update log.

## 40–60-word direct answer

> Good automatic retry does not repeat every failed charge on a fixed loop. It identifies who owns collection, separates retryable failures from customer-action and stop conditions, verifies that the order was not already paid, spaces a limited number of attempts inside the grace window, communicates clearly, and reconciles the order, subscription, gateway, and access state after recovery.

This is 55 words. Put it within the article's first 150 words and name WooCommerce, ArraySubs, Stripe, PayPal, and Paddle soon afterward.

## Answer-first editorial thesis

Automatic retry is a controlled payment-recovery workflow, not a cron job that submits the same credential repeatedly. A sound system passes four gates before each new attempt:

1. **Ownership:** Is collection local, manual/customer-owned, or remotely owned by PayPal/Paddle?
2. **Eligibility:** Does current provider/network evidence permit another attempt with the same payment context?
3. **Safety:** Is the exact renewal genuinely unpaid, still eligible, and protected against concurrent or missed-webhook duplication?
4. **Policy:** Does the attempt fit inside the disclosed grace, communication, access, and fulfillment policy?

The article should answer “how many retries?” with these constraints and original worked examples. It must not copy A033's broad dunning strategy or the exact settings steps owned by the lenient/strict ArraySubs recipes.

## Key takeaways for the article

- Retry only after determining the gateway/recovery owner and required remedy.
- A hard/soft label is insufficient; use the provider's current decline and advice codes where available.
- Transport/API idempotency and business reconciliation solve different risks; a retry must still verify whether the obligation was already paid.
- Retry timing, attempt count, grace, customer notices, and final access state form one policy.
- Measure recovered customers and recovered value in closed cohorts; do not judge success by jobs scheduled or attempts executed.

## Verified primary-source claims

All web sources accessed 2026-07-16.

| Verified claim | Primary authoritative source | Editorial use |
| --- | --- | --- |
| WooCommerce Subscriptions' optional failed-payment engine uses retry rules that define interval, emails, order status, and subscription status; its documented default is five rules over seven days. | [WooCommerce: Failed Recurring Payment Retry System](https://woocommerce.com/document/subscriptions/failed-payment-retry/) | Contrast with ArraySubs; never present WooCommerce Subscriptions' schedule as ArraySubs behavior. |
| WooCommerce says the retry engine applies to automatic recurring payments when the gateway does not control the billing schedule. | [WooCommerce: Failed Recurring Payment Retry System](https://woocommerce.com/document/subscriptions/failed-payment-retry/) | Support the ownership gate. |
| WooCommerce's troubleshooting framework is: understand subscription anatomy, determine expected behavior, and reconstruct the actual timeline. | [WooCommerce Subscriptions troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/) | Structure monitoring and incident response. |
| Stripe exposes a decline code and network `advice_code`; advice can indicate `do_not_try_again`, `try_again_later`, or `confirm_card_data`. | [Stripe: Card declines](https://docs.stripe.com/declines/card) and [Stripe: Decline codes](https://docs.stripe.com/declines/codes) | Build the eligibility/stop decision tree. |
| Stripe warns that card networks limit reattempts and that excessive retries can increase declines or appear fraudulent. | [Stripe: Card declines](https://docs.stripe.com/declines/card) | Reject unlimited retry loops. |
| Stripe Billing Smart Retries selects times for Stripe Billing invoices and lets merchants configure a count/duration. | [Stripe: Automate payment retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries) | Explain “smart retry,” while clarifying it does not control current ArraySubs-created WooCommerce renewal orders/PaymentIntents. |
| Stripe API idempotency keys allow a repeated API request to return the first result instead of creating an additional operation. | [Stripe: Idempotent requests](https://docs.stripe.com/api/idempotent_requests) | Define request-layer idempotency, not proof that local/gateway lifecycle state is reconciled. |
| PayPal Subscriptions can retry a failed payment every five days up to twice per billing cycle, add unresolved amounts to outstanding balance, and suspend after the configured failure threshold. | [PayPal: Payment failures and recovering balances](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/) | Show that PayPal owns a distinct remote policy. |
| Paddle marks a subscription with an unpaid transaction `past_due`, retries according to payment-recovery settings, returns it to active on success, and cancels after recovery is exhausted. | [Paddle: `subscription.past_due`](https://developer.paddle.com/webhooks/subscriptions/subscription-past-due/) | Show that Paddle owns remote recovery/status. |
| PCI DSS prohibits retaining sensitive authentication data such as CVC after authorization, even if encrypted. | [PCI SSC FAQ 1533](https://www.pcisecuritystandards.org/faqs/1533/) | Keep retry logs, screenshots, emails, and support examples free of sensitive card data. |

Time-sensitive PayPal/Paddle intervals describe provider behavior, not a recommended ArraySubs cadence. Link to the live provider docs and date the verification.

## Definitions to establish on first use

- **Initial attempt:** the first collection attempt for the due renewal; it is not “retry 1.”
- **Automatic retry:** a later system-triggered attempt against the unresolved renewal.
- **Manual retry:** an admin/customer-triggered supported attempt after preflight checks.
- **Hard decline:** provider evidence that the same unchanged payment context is unlikely or forbidden to succeed; exact codes vary.
- **Soft decline:** a temporary condition where a later attempt may succeed; still subject to advice/network limits.
- **Authentication-required failure:** customer must complete an action such as 3D Secure; blind off-session repetition is not authentication.
- **Idempotency:** protection against repeating the same API operation; it is distinct from checking whether a remote charge already succeeded after local state missed it.
- **Reconciliation:** making the renewal order, subscription, gateway transaction, retry jobs, next date, and access reflect the verified payment outcome.

## ArraySubs core/Pro truth check

### Current core responsibilities

Current ArraySubs core:

- creates/finds the pending renewal order;
- records failure time, raw reason, and a limited normalized category;
- calls the shared retry-config filter;
- increments retry state when scheduling and queues the centralized `HOOK_PROCESS_RENEWAL` action;
- applies pre-retry charge verification when the retry counter is positive;
- exposes shared admin/customer manual-retry processing with permission/ownership guards;
- rejects retry for pending cancellation and ineligible states;
- clears retry/failure state after verified success;
- coordinates grace, on-hold, cancellation, emails, notes, and next renewal scheduling.

Core provides the retry pipeline/contract, but automatic card collection requires a Pro gateway implementation. Do not market Free/core alone as automatic off-session retry.

### Current Stripe behavior in Pro

The inspected Stripe delegate publishes a fixed current configuration:

```text
enabled = true
maximum automatic retries after the initial failure = 3
interval = 24 hours
```

The current source does **not** expose the `retry_enabled`, `retry_max_attempts`, or `retry_interval_hours` merchant fields described in `documentations/architecture/payment-retry-system.md`. Treat that architecture “configuration” section as stale unless the packaged current UI proves otherwise. The filter contract is extensible, but the shipped Stripe delegate inspected here is fixed.

Before a retry, Stripe verification:

1. retrieves the PaymentIntent stored on the order when available;
2. otherwise searches up to 50 recent customer PaymentIntents in a seven-day window;
3. requires exact `order_id` and `subscription_id` metadata;
4. reconciles a `succeeded` intent instead of charging again.

The manual-retry method forces the counter to at least one so the same verification runs even if no automatic retry was previously queued.

### PayPal and Paddle behavior in Pro

- PayPal's `processRenewalPayment()` does not create a local charge; it waits for PayPal subscription payment webhooks.
- Paddle's `processRenewalPayment()` likewise leaves the local order pending and waits for Paddle's transaction/subscription webhooks.
- These remote gateways do not override the inspected recent-charge verification method; remote webhook/sync reconciliation is the operating model.
- Do not run a second local retry engine against a remotely owned PayPal/Paddle obligation.

### Failure classification caveat

Core normalizes a limited set of categories (`insufficient_funds`, `card_declined`, `expired_card`, `incorrect_cvc`, `invalid_card`, `authentication_required`, `processing_error`, `generic_decline`, `unknown`). This supports customer-safe copy, but inspected scheduling remains the same fixed Stripe cadence; it does not currently choose timing/stop rules from every provider advice code. Broad `card_declined` is not proof a retry is allowed.

### Current grace/retry boundary

ArraySubs defaults currently keep ordinary failed renewals active for three grace days, and the overdue checker runs hourly. Stripe retries queue approximately at due+1d, due+2d, and due+3d. The third attempt and active→on-hold transition can therefore meet at the same scheduler boundary. Exact Action Scheduler order may determine whether the third attempt runs while the subscription is still eligible. Say **“up to three retries”** and require a live boundary test.

## When retries help—and when they do not

| Evidence/category | Same-context retry stance | Required customer/merchant action | Stop/escalate condition |
| --- | --- | --- | --- |
| Processing/network error with retry advice | bounded delayed retry | monitor gateway/system health; offer alternate method if repeated | systemic outage, repeated error, or provider stop advice |
| Insufficient funds with retry permission | a later bounded retry may fit | add funds or use another method | limit reached or provider/network stop |
| Expired/invalid card | blind retry is not useful | secure payment-method update | no valid replacement before policy deadline |
| Incorrect CVC/card data | wait until corrected | customer re-enters details through secure route | repeated invalid data |
| Authentication required | do not loop off-session attempts | complete hosted authentication/pay flow | action expires/fails or customer declines |
| Lost/stolen/revoked/stop-recurring advice | do not retry that context | new method, issuer contact, support/fraud review | immediate stop on unchanged credential |
| Remote PayPal/Paddle past due | do not start local duplicate collection | provider recovery/update route; reconcile remote/local state | provider recovery exhausted or state mismatch |
| Already paid at gateway | never charge again | reconcile local order/subscription | investigate webhook/idempotency failure |
| Unknown | conservative review before attempt | safe update/pay/support path | escalate rather than repeatedly charge |

## Retry timing and attempt-count framework

There is no universal “best” retry count. Choose within these hard constraints:

- exact gateway/network advice and retry caps;
- whether failure can succeed without customer action;
- local versus remote ownership;
- time needed for method update/authentication;
- active and on-hold grace boundaries;
- product marginal cost and fulfillment cutoff;
- billing cadence/value/customer-service policy;
- communication frequency and support capacity;
- legal/contract notice requirements reviewed by qualified counsel.

### Timing formulas

```text
Retry 1 timestamp = first-failure timestamp + interval 1
Retry N timestamp = retry-(N−1)-failure timestamp + interval N

Latest eligible retry timestamp
= min(provider/network stop,
      local lifecycle stop,
      merchant policy stop)

Configured local cancellation threshold
= due timestamp + active grace + on-hold grace
```

For remote gateways, compare:

```text
T_local_stop < T_remote_stop  → local access can end while provider still retries
T_local_stop = T_remote_stop  → intentionally aligned recovery
T_local_stop > T_remote_stop  → local grace continues after provider stops
```

None is automatically correct; an accidental mismatch is a defect.

## Worked examples

### Example 1: current ArraySubs Stripe boundary

Illustrative timestamps using current defaults, not a recommendation:

- due/initial failure: July 16, 09:00 UTC;
- retry 1: around July 17, 09:00;
- retry 2: around July 18, 09:00;
- retry 3: around July 19, 09:00;
- active-grace cutoff: also around July 19;
- overdue checker: hourly.

The test must verify actual action ordering, not just scheduled timestamps. If the third retry and on-hold transition race, document the observed result and consider policy/code alignment.

### Example 2: missed webhook

Local renewal order is failed, but the stored Stripe PaymentIntent is `succeeded`. Correct outcome:

```text
retrieve/verify exact remote payment
→ mark local order paid with transaction reference
→ clear retry/failure state
→ restore/confirm active subscription and access
→ advance/schedule next renewal
→ do not submit a new charge
```

### Example 3: authentication required

An off-session attempt returns `authentication_required`. Correct outcome is a secure customer authentication/pay route and disclosed grace. Repeating the unchanged off-session request does not satisfy the bank's authentication requirement.

## Idempotency versus duplicate-charge prevention

Use a layered explanation:

| Layer | What it prevents | What it does not prove |
| --- | --- | --- |
| Scheduler lock/status gates | overlapping local handlers and ineligible-state processing | whether gateway charged before local response/webhook |
| API idempotency key | duplicate execution of the same retried API request | whether a later request represents the same renewal obligation correctly |
| Order/PaymentIntent metadata | correlates local renewal to remote payment | that local lifecycle has reconciled success |
| Pre-retry gateway verification | detects remote success after missed local event | behavior for gateways without implemented lookup |
| Webhook idempotency/reconciliation | processes remote events once and restores state | correctness if event mapping/signature/config is broken |

No explicit ArraySubs-level `Idempotency-Key` is visible in the inspected Stripe delegate call; it delegates requests to the official WooCommerce Stripe API class. Verify official gateway request behavior in the live test rather than claiming ArraySubs itself sets a key. The strongest observed ArraySubs guarantee is the Stripe pre-retry lookup/reconciliation.

## Customer communication and card-update path

Every failure/retry communication should answer:

1. Which subscription and renewal amount are affected?
2. What safe, customer-understandable reason is known?
3. What action is required: pay, update method, authenticate, contact issuer, or wait?
4. Is another attempt planned, and at what date/time/timezone?
5. What happens to access, shipment, or service if unresolved?
6. How can the customer reach support without sending card data?

Use one authenticated first-party/gateway route. Do not include raw processor payloads, full payment identifiers, PAN, or CVC. Stop failure messages once payment is verified/reconciled.

## Monitoring, reconciliation, and test checklist

### Evidence to monitor

- subscription ID/status/next date and pending-cancellation/auto-renew state;
- renewal order ID/status/amount/currency/payment method/transaction ID;
- first-failure time, raw provider code/advice, normalized category;
- retry count, last/next retry timestamps, Action Scheduler job state;
- gateway payment object/remote subscription status and webhook events;
- customer update/authentication/email events;
- access/fulfillment state;
- final paid/cancelled/fallback outcome and recovery time.

### Required test cases

1. retry-permitted temporary decline;
2. hard/stop advice;
3. expired/invalid method;
4. authentication required;
5. payment method updated before next retry;
6. missed webhook with successful remote charge;
7. webhook and retry worker overlap;
8. two local workers at the same retry time;
9. customer/admin manual retry;
10. pending cancellation during recovery;
11. customer turns auto-renew off;
12. retry limit reached;
13. retry/on-hold day-three boundary;
14. PayPal remote recovery without local duplicate charge;
15. Paddle remote recovery without local duplicate charge;
16. success restores order, subscription, access, next date/jobs, and communication.

Label resulting screenshots/test observations as first-party ArraySubs tests with plugin/gateway versions, date, timezone, environment, test IDs, and limitations.

## Measurement formulas

Use closed observation windows; a recent failure still in grace is not “unrecovered.”

```text
First-attempt failure rate
= failed initial renewal attempts
÷ eligible renewal attempts

Customer recovery rate
= affected customers whose renewal later paid
÷ affected customers whose recovery window has closed

Value recovery rate
= amount collected against affected renewals
÷ amount originally due on affected renewals with closed windows

Recovery by attempt N
= renewals first recovered on attempt N
÷ affected renewals eligible to reach attempt N

Time to recovery
= paid timestamp − first-failure timestamp
```

Illustrative closed cohort only:

- 100 eligible renewal attempts;
- 12 first attempts fail;
- 7 later pay within the defined window;
- `$1,600` failed value;
- `$900` recovered value.

```text
Failure rate = 12 ÷ 100 = 12%
Customer recovery rate = 7 ÷ 12 = 58.3%
Value recovery rate = $900 ÷ $1,600 = 56.25%
```

These numbers are arithmetic examples, not ArraySubs, WooCommerce, gateway, or industry benchmarks.

## Product fit and limitations

### ArraySubs is a fit when

- WooCommerce is the operational source for local Stripe renewals;
- the merchant wants an integrated renewal order, retry, grace, notes, emails, manual retry, and customer portal;
- PayPal/Paddle remote ownership can be reconciled intentionally;
- operators can test and govern access/fulfillment state.

### ArraySubs is not automatically the best fit when

- Stripe Billing itself owns subscription invoices and Smart Retries are the desired primary engine;
- a merchant needs fully decline-adaptive retry optimization that current ArraySubs source does not implement;
- another remote provider owns collection and the store cannot reliably reconcile local state;
- regulated/essential-service continuity needs specialist workflows/review beyond generic plugin settings;
- the business cannot test webhooks, scheduler reliability, duplicate-charge safety, and access restoration.

## Unsupported claims and caveats to avoid

- Do not call any retry count, delay, or grace length “optimal” without disclosed first-party experiment methodology.
- Do not quote Stripe Billing's retry recommendations as ArraySubs settings.
- Do not claim every soft decline should be retried or that every gateway uses the same hard/soft taxonomy.
- Do not claim current ArraySubs chooses retry timing from Stripe `advice_code`; inspected scheduling is fixed.
- Do not claim current Stripe retry settings are merchant-configurable unless a packaged UI test proves it.
- Do not claim all three retries always run before on-hold.
- Do not claim request idempotency alone proves the customer was not charged.
- Do not apply WooCommerce Subscriptions' five-rule default schedule to ArraySubs.
- Do not start local charging against a PayPal/Paddle-owned obligation without reconciliation.
- Do not expose full payment details or sensitive logs in examples/screenshots.
- Do not promise a recovery rate, saved revenue, customer outcome, or ROI.
- Do not repeat exact ArraySubs dunning-recipe setup; link to it.

## FAQ / People Also Ask questions

- How many times should a failed subscription payment be retried?
- Which failed subscription payments should never be retried?
- What is the difference between a hard and soft decline?
- What does `authentication_required` mean for a recurring payment?
- Can an automatic retry charge a customer twice after a missed webhook?
- Does WooCommerce automatically retry failed subscription payments?
- Does Stripe Smart Retries control ArraySubs renewals?
- Who retries PayPal and Paddle subscription payments?
- What happens after ArraySubs reaches its retry limit?
- Should customer access remain active during retries?
- Can an ArraySubs customer or admin retry payment manually?
- Does a late successful retry change the next billing date?
- How should failed-payment recovery be measured?

## Internal-link plan

- **Commercial pillar:** `/deals/arraysubs/features/#subscription-operations`
- **Primary narrow recipes:**
  - `/deals/arraysubs/use-cases/recipes/lenient-dunning-grace/`
  - `/deals/arraysubs/use-cases/recipes/strict-dunning-grace/`
- **Optional final-state recipe:** `/deals/arraysubs/use-cases/recipes/auto-downgrade-on-failed-payment/`
- **Sibling articles:** A033 dunning strategy, A035 grace periods, A036 expired cards.
- **Cluster context:** A031 failed-payment recovery pillar, A032 failure timeline, A040 failure-code triage.
- **CTA after the system-design answer and examples:** `/deals/arraysubs/pricing/`

Use contextual anchors such as “design the complete dunning policy,” “choose active and on-hold grace,” “recover an expired card,” and “triage provider failure codes.” Do not repeat recipe steps.

## Long-form SEO/GEO outline (target 2,600–3,200 words)

1. **Automatic Retry for Failed Subscription Payments: What Good Looks Like**
   - 40–60-word direct answer.
   - 4–5 key takeaways.
   - Define initial attempt, retry, idempotency, and reconciliation.
2. **When does automatic retry help—and when does it make things worse?**
   - Extractable retry/action/stop table.
   - “Not a fit” guidance.
3. **What is the difference between hard, soft, authentication, and technical failures?**
   - Provider-advice-first decision tree.
   - Customer-safe next action.
4. **Who owns the retry in WooCommerce, Stripe, PayPal, and Paddle?**
   - Local/manual/remote ownership matrix.
   - Explicit WooCommerce Subscriptions versus ArraySubs distinction.
5. **How many retry attempts should a subscription use?**
   - Constraint framework, timing formulas, grace alignment.
   - Current ArraySubs boundary worked example.
6. **How do idempotency and reconciliation prevent duplicate charges?**
   - Layered safety table.
   - Missed-webhook example.
7. **What should customers see after a failed payment?**
   - One-action message framework; update/authentication route.
8. **How should teams monitor and test automatic retries?**
   - Evidence checklist, 16-case test plan, screenshots/test-result requirements.
9. **How should retry recovery be measured?**
   - Closed-cohort formulas and illustrative arithmetic.
10. **What does current ArraySubs actually do?**
    - Clearly labeled source observation, core/Pro split, stale-doc caveat, limitations.
11. **FAQ**
12. **Conclusion and CTA**
    - Three takeaways maximum; contextual links; pricing CTA only after the complete answer.
13. **Publishing trust elements**
    - Named author and technical reviewer; test environment; published/last-verified dates; limitations; source-adjacent citations; meaningful update log; `Article`/`TechArticle` only if visible/current guidance supports it; visible and structured breadcrumb path `Home / Articles / Payment Recovery`, with the article title omitted from the UI and `BreadcrumbList`.

## Distinct inline-image teaching objectives

Each image should teach one idea and avoid repeating a dashboard/card-grid composition.

1. **Retry ownership fork — flow chart:** WooCommerce/ArraySubs Stripe local path versus manual customer payment versus PayPal/Paddle remote recovery.
2. **Four retry gates — step art:** ownership → eligibility → safety → policy.
3. **Failure routing — flow chart:** already paid/reconcile, retry later, request update/authentication, or stop/escalate.
4. **Retry/grace boundary — timeline:** due date, three 24-hour retry points, and the day-three on-hold checker collision, labeled “current ArraySubs defaults.”
5. **Duplicate-charge safety — process art:** local failed order → retrieve exact gateway payment → reconcile success or submit one permitted charge.
6. **Idempotency versus reconciliation — comparison art:** request replay protection on one side, lifecycle/payment-state verification on the other.
7. **Customer action path — flow chart:** reason → Pay Now / update method / authenticate / contact support.
8. **Closed-cohort measurement — number-led visual:** failed cohort → recovered customers → recovered value, using formulas rather than fabricated results.
9. **Recovery verification chain — process art:** payment → order paid → subscription active → access restored → next renewal job → confirmation email.

## Refresh triggers

- Any ArraySubs/Pro release changing `getRetryConfig()`, retry settings/UI, retry counter semantics, manual retry, pre-retry verification, classifier, or grace scheduling.
- A current packaged UI test reveals configurable Stripe retry fields described by the older architecture document.
- WooCommerce Stripe gateway changes its PaymentIntent/idempotency/request behavior.
- Stripe changes decline/advice codes, network retry rules, or Smart Retries guidance.
- PayPal changes retry cadence, outstanding-balance, or failure-threshold behavior.
- Paddle changes `past_due` recovery/status semantics.
- Action Scheduler or status hooks change the retry/on-hold ordering.
- PCI DSS guidance affecting logs/screenshots changes.
- Quarterly primary-source review because gateway behavior is time-sensitive, plus review after every relevant WordPress, WooCommerce, ArraySubs, or gateway release.
