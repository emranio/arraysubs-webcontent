# Research brief: Subscription Payment Failure Codes — A Practical Triage Guide

## Research record

- **Article:** A040 — Subscription Payment Failure Codes: A Practical Triage Guide
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `subscription payment failure codes`
- **Search intent:** Operators and support teams need to translate gateway-specific payment errors into safe customer language and the next operational action without over-retrying, leaking payment data, or confusing technical failure with a decline.
- **Evidence scope:** A040 brief; publishing standard; ArraySubs 1.8.11 and Pro 1.1.2 classifier, gateway, retry, logging, audit, and email source; current official Stripe, PayPal, Paddle, WooCommerce, and PCI SSC documentation.
- **Test limitation:** Source mappings and UI were inspected. Not every gateway error was generated live, and provider code taxonomies change. Date every gateway table and cite the live official page.

## 40–60-word direct answer

> Subscription payment failure codes are gateway evidence, not universal instructions. Translate each code into one merchant action: retry later, ask the customer to update payment details, complete authentication, stop and escalate, or investigate a technical/reconciliation fault. Preserve the raw provider evidence privately, show customers safe language, and verify payment before changing access or retrying manually.

This is 54 words.

## Answer-first editorial thesis

Use two layers:

1. **Provider evidence layer:** raw Stripe/PayPal/Paddle event, code, transaction, and status retained safely for diagnosis.
2. **Merchant decision layer:** a stable action category and customer-safe explanation.

Do not force every error into “hard decline” or “soft decline.” Authentication, configuration, processor availability, webhook delay, duplicate-event, and reconciliation faults need their own paths.

## Key takeaways

- Provider codes differ and can change; never infer one gateway's semantics from another.
- A “do not retry” or fraud/lost-card signal should not enter a blind retry loop.
- An authentication-required result needs customer action, not another identical off-session attempt.
- Technical/event failures should be reconciled before asking the customer to change a valid card.
- Logs and screenshots must exclude full card numbers, security codes, secrets, and unnecessary personal data.

## Verified primary sources

All web sources accessed 2026-07-16.

| Claim | Primary source | Editorial use |
| --- | --- | --- |
| Stripe publishes decline codes with different recommended actions; `generic_decline` may intentionally hide detail, and issuer declines can require customer contact or another method. | [Stripe: Decline codes](https://docs.stripe.com/declines/codes), [Stripe: Card declines](https://docs.stripe.com/declines/card) | Build the Stripe examples and avoid overexplaining to customers. |
| Stripe subscription recovery relies on PaymentIntent/invoice events and webhook state monitoring; authentication can require customer action. | [Stripe: Subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks), [Stripe: Subscription overview](https://docs.stripe.com/billing/subscriptions/overview) | Separate authentication and delayed-event cases from issuer decline. |
| PayPal documents funding failures, Orders API errors, and `UNPROCESSABLE_ENTITY` details that require issue-specific handling. | [PayPal: Handle funding failures](https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/), [PayPal: Orders API troubleshooting](https://developer.paypal.com/api/rest/integration/orders-api/troubleshooting/), [PayPal: Unprocessable entity](https://developer.paypal.com/api/rest/troubleshooting/rest_unprocessable_entity/) | Support PayPal-specific evidence and technical/configuration branches. |
| Paddle emits transaction payment-failed/past-due events and exposes provider error information; Paddle may own dunning for automatically collected subscriptions. | [Paddle: Transaction payment failed](https://developer.paddle.com/webhooks/transactions/transaction-payment-failed/), [Paddle: Transaction past due](https://developer.paddle.com/webhooks/transactions/transaction-past-due/), [Paddle: Payment recovery](https://developer.paddle.com/concepts/retain/payment-recovery-dunning/) | Build Paddle-specific triage without pretending its codes equal Stripe's. |
| WooCommerce recommends tracing scheduled actions, renewal order, gateway, subscription, and logs as one troubleshooting chain. | [WooCommerce: Troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/) | Support end-to-end evidence collection. |
| Card verification codes cannot be stored after authorization. | [PCI SSC FAQ 1533](https://www.pcisecuritystandards.org/faqs/1533/) | Set non-negotiable privacy limits. |

## Definitions

- **Issuer decline:** the issuing bank does not approve the payment; detail may be intentionally limited.
- **Hard decline:** merchant shorthand for a condition unlikely to improve through unchanged retry, such as invalid/revoked credentials. It is not a universal provider type.
- **Soft decline:** merchant shorthand for a potentially temporary or recoverable result. It does not guarantee a later attempt will succeed.
- **Authentication required:** customer must complete a step such as 3DS/SCA or reauthorization.
- **Technical failure:** gateway/API/configuration/connectivity/idempotency/scheduled-action error rather than a funding decision.
- **Reconciliation fault:** provider and local order/subscription states disagree or an event is delayed/out of order.

## Current ArraySubs product truth

### Normalized failure categories

Core currently normalizes common evidence into:

```text
insufficient_funds
card_declined
expired_card
incorrect_cvc
invalid_card
authentication_required
processing_error
generic_decline
unknown
```

The direct code map is intentionally limited and falls back to matching known phrases in messages. Therefore the category is a useful operational label, not a guaranteed full representation of every provider code.

### Classification does not control retry timing

The classifier currently labels failures. It does **not** choose a code-specific retry schedule. Current local Stripe retries follow the product's fixed cadence. Avoid saying ArraySubs already suppresses or optimizes every retry based on these categories.

### Stripe evidence

Current Stripe paths can capture/log the PaymentIntent `last_payment_error.code` or related error code and normalize it. This provides the richest current card-decline evidence of the three Pro integrations, subject to Stripe's own redaction and semantics.

### PayPal evidence caveat

Current PayPal subscription/sale failure events map to ArraySubs failure handling, but the stored failure reason can be a `status_change_note` with a generic `payment_failed` fallback. Do not promise the same detailed card-code taxonomy as Stripe.

### Paddle evidence caveat

Current Paddle handling can inspect transaction payment evidence such as `payments[0].error_code` and `method_details.error.type`. Paddle's event/status model and provider-owned recovery remain distinct from Stripe's.

### Logging and audit behavior

- `PaymentLoggingService` writes WooCommerce logger evidence and subscription/order notes.
- Identical subscription notes are deduplicated within roughly 60 seconds.
- Pro Renewal Failures audit can expose category/reason, first/last failure, attempts, next retry, renewal order, and customer email.
- `Mark Resolved` is an administrative action and does not mean payment succeeded.

Screenshots must redact customer email, order/customer identifiers where unnecessary, payment IDs/tokens, addresses, and any secrets.

## Merchant decision taxonomy

| Merchant action | Typical evidence | Retry posture | Customer-safe direction |
| --- | --- | --- | --- |
| Retry later | `insufficient_funds`, transient processor issue, provider explicitly says retryable | Retry within policy; cap attempts; check provider ownership. | “The payment was not completed. You can pay now or ensure funds are available.” |
| Update payment method | expired, invalid/revoked, issuer/card decline where another method is appropriate | Do not repeatedly use an evidently unusable credential. | “Please update your payment method securely.” |
| Authenticate/reauthorize | `authentication_required`, mandate/agreement approval needed | Identical off-session retry is not the solution. | “Complete the secure verification/authorization step.” |
| Stop and escalate | lost/stolen, fraud, do-not-honor patterns, revoked permission, chargeback risk | Suppress blind retries; follow gateway/risk policy. | Keep detail minimal; offer secure alternate method/support. |
| Technical/reconcile | API/config error, missing/late webhook, duplicate event, state disagreement | Do not blame card or collect again until current payment state is known. | “We are checking a processing issue; no card details are needed by email.” |

Provider documentation—not this shorthand table—must decide the exact handling of a specific code.

## Practical triage decision tree

```text
1. Does the provider show a successful or in-flight payment?
   yes → reconcile; do not retry
   no  → continue

2. Is this a technical/configuration/event error?
   yes → fix/replay/reconcile idempotently
   no  → continue

3. Does it require customer authentication or a new authorization?
   yes → send secure action; pause identical retries
   no  → continue

4. Is the credential invalid, expired, revoked, lost/stolen, or explicitly non-retryable?
   yes → request safe update or stop/escalate
   no  → retry only within gateway/store attempt policy

5. After any success, do order, subscription, access, gateway, and next date agree?
   no → reconcile
   yes → close failure evidence and stop messages/retries
```

## Gateway-specific examples to research beside live docs

### Stripe

- `insufficient_funds`: may be retried, but offer Pay Now/update and cap attempts.
- `expired_card`: request a new/updated method; a network update may help but is not guaranteed.
- `authentication_required`: provide a customer authentication path.
- `incorrect_cvc`: use a secure payment update/re-entry path; never request CVC via support.
- `lost_card`, `stolen_card`, or fraudulent signals: do not describe the sensitive issuer reason in customer copy or blindly retry.
- `generic_decline` / `do_not_honor`: detail may be intentionally unavailable; recommend bank contact or another method without pretending to know more.

### PayPal

- Preserve the `details[].issue`, debug/request evidence, subscription/agreement state, and webhook event privately.
- Funding-source errors and agreement/authorization errors are not the same as merchant integration errors.
- Do not map a generic status-change note to a precise issuer/card cause.

### Paddle

- Preserve transaction/subscription IDs, event, `error_code`, method error type, and collection mode.
- First determine whether Paddle owns dunning and whether the subscription is `past_due` before initiating local/manual action.
- Do not translate Paddle's taxonomy as if it were a Stripe decline code.

## Safe logging and escalation checklist

- Record gateway, environment, UTC timestamp, event/request ID, local subscription and renewal order, safe code/category, attempt number, and current provider/local state.
- Redact API keys, webhook secrets, bearer tokens, full payment tokens where unnecessary, PAN, CVC, personal address, and customer email in published evidence.
- Log idempotency/deduplication context and whether an attempt is in flight.
- Preserve raw provider wording privately; show a concise customer-safe message.
- Escalate with a minimal reproducible timeline, not a screenshot containing secrets.
- Before manual retry, query the provider and renewal order for recent success.
- After resolution, record whether the fix was payment, method update, authentication, technical replay, manual reconciliation, cancellation, or downgrade.

## Worked triage examples

1. **Expired Stripe card:** classify `expired_card`; customer uses hosted update; verify whether the unpaid invoice then succeeds; restore local status/access only after payment evidence.
2. **Stripe authentication required:** stop identical off-session attempts; send the secure authentication/Pay Now action; reconcile the successful PaymentIntent/webhook.
3. **PayPal generic failure note:** do not tell the customer “insufficient funds”; inspect agreement state and provider details, then choose reauthorization, retry, or technical escalation.
4. **Paddle past due:** confirm Paddle's dunning state and next provider action before a local retry; reconcile incoming transaction/subscription webhooks.
5. **Provider paid, site on-hold:** treat as reconciliation fault, not a new decline; replay/fix the missing event idempotently and prevent a duplicate charge.

## Screenshot opportunities on mirror-help.arrayhash.com

Use test records, numbered markers, heavy redaction, and version/date captions.

1. **Renewal Failures audit:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/renewal-failures`; mark category/reason, attempts, timestamps, next retry, renewal order, Retry, and Mark Resolved.
2. **Subscription detail:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions/detail/{id}`; mark local status, gateway, renewal order, and next date used in reconciliation.
3. **Gateway logs:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways`; mark diagnostic/log area without revealing credentials or payload secrets.
4. **Activity Audits:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/activity-audits`; mark failure, retry, recovery, or final-state trail.
5. **Renewal order notes:** WooCommerce order screen with a test renewal; mark safe failure note and later payment/reconciliation evidence. Redact customer data and transaction IDs.
6. **Customer failed-payment email:** show safe reason wording and secure Pay Now/Manage actions—never a raw sensitive provider payload.

## Varied non-chart visual ideas

- **Triage desk scene:** support agent sorts error cards into retry, update, authenticate, stop, and technical trays.
- **Bilingual translator concept:** raw gateway code enters one side; customer-safe message and operator action exit the other.
- **Provider logo constellation:** Stripe, PayPal, and Paddle orbit separate taxonomies around one stable merchant decision layer.
- **Authentication doorway:** customer must unlock a 3DS/authorization door; repeated background retry bounces off it.
- **Reconciliation mirror:** provider says paid while WooCommerce says on-hold, with a webhook bridge missing between them.
- **Privacy shield illustration:** safe brand/last four/code outside; PAN/CVC/secrets locked inside.

## Recommended long-form outline

1. Direct answer and why codes are evidence, not instructions.
2. Definitions: hard/soft shorthand, authentication, technical, and reconciliation errors.
3. Stable five-action merchant taxonomy.
4. Decision tree.
5. Stripe, PayPal, and Paddle evidence with dated official links.
6. Current ArraySubs categories, retry limitation, and audit/log behavior.
7. Customer-safe wording, privacy, and escalation.
8. Worked cases and proof of resolution.
9. Screenshot-backed observations, limitations, and CTA.

## Internal links

- `/deals/arraysubs/features/#subscription-operations`
- Lenient/strict grace and auto-downgrade recipes.
- A031 recovery pillar; A032 lifecycle; A033 dunning; A034 retries.
- A036 expired-card update flow; A037 email copy; A039 operational checklist.
- Later A062 SCA/3DS and A063 tokens articles when published.

## Claims to avoid

- A universal hard/soft list that applies identically to all gateways.
- “ArraySubs automatically chooses retry timing from the normalized category.”
- A precise PayPal card-decline diagnosis when only a generic status note exists.
- Showing raw logs, customer email, IDs, secrets, PAN, or CVC in article images.
- “Mark Resolved means paid.”
- Retrying when provider state is successful, in-flight, fraudulent, revoked, or authentication-blocked.

## Refresh triggers

- ArraySubs classifier mapping, retry scheduler, gateway extraction, logging, or audit UI changes.
- Stripe, PayPal, or Paddle code/event taxonomy changes.
- New decline-adaptive retry behavior.
- PCI guidance changes and quarterly provider-doc review.
