---
title: "Subscription Payment Failure Codes: A Practical Triage Guide"
meta_description: "Translate Stripe, PayPal, and Paddle subscription payment failures into retry, update, authenticate, stop, or reconciliation actions safely."
focus_keyword: "subscription payment failure codes"
published: "2026-01-29"
updated: "2026-03-12"
last_verified: "2026-07-16"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Subscription Payment Failure Codes: A Practical Triage Guide

**Subscription payment failure codes** are gateway evidence, not universal instructions. Translate each code into one merchant action: retry later, ask the customer to update payment details, complete authentication, stop and escalate, or investigate a technical/reconciliation fault. Preserve the raw provider evidence privately, show customers safe language, and verify payment before changing access or retrying manually.

Stripe, PayPal, and Paddle expose different events and taxonomies. A stable merchant decision layer is more useful than forcing every response into “hard” or “soft” decline.

> **Key takeaways**
>
> - Provider codes differ and change; never borrow one gateway's meaning for another.
> - Do-not-retry, revoked, lost/stolen, and risk signals must not enter a blind loop.
> - Authentication-required needs customer action, not another identical off-session attempt.
> - Technical and webhook faults should be reconciled before blaming a valid card.
> - Logs, notes, screenshots, and support messages must exclude PAN, CVC, secrets, and unnecessary personal data.

## Why are payment failure codes evidence rather than instructions?

A provider code describes what that provider observed in a particular payment context. It may be intentionally vague, changed by the network, wrapped by the gateway, or delivered in an event that arrives before or after another state change.

Use two layers:

1. **Provider evidence layer:** raw event, payment/transaction, code, status, advice, and timestamps retained privately.
2. **Merchant decision layer:** one stable operational action and one customer-safe explanation.

![Raw gateway evidence enters a translator and exits as one operator action plus safe customer language.](/blogs/subscription-payment-failure-codes-a-practical-triage-guide/code-translator-desk.png)

This prevents an integration detail from becoming policy. A `generic_decline` should not be expanded into a story the provider never supplied. A PayPal status note should not be labeled “insufficient funds” without evidence. A Paddle `past_due` event should not automatically start a local Stripe-style retry loop.

## Hard decline versus soft decline: what do the terms miss?

“Hard” and “soft” are merchant shorthand, not a universal gateway standard.

- A **hard decline** usually means unchanged retry is unlikely to work, such as invalid, expired, revoked, lost, or stolen credentials.
- A **soft decline** usually means a later attempt might work, such as permitted insufficient funds or a temporary processor problem.

The binary model misses at least three important branches:

- **authentication required:** customer must complete 3D Secure, SCA, mandate approval, or reauthorization;
- **technical failure:** API, configuration, connectivity, idempotency, or scheduler problem—not a funding decision;
- **reconciliation fault:** provider and WooCommerce disagree because an event is late, missing, duplicated, or out of order.

![An authentication door cannot be opened by repeatedly pushing the same background retry against it.](/blogs/subscription-payment-failure-codes-a-practical-triage-guide/authentication-doorway.png)

The remedy—not the adjective—is what operations needs.

## Five merchant actions for subscription payment failures

| Merchant action | Typical evidence | Retry posture | Customer-safe direction |
| --- | --- | --- | --- |
| Retry later | permitted insufficient funds, transient processor issue, explicit retry advice | retry inside policy, cap attempts, respect ownership | “Payment was not completed. Pay now or ensure funds are available.” |
| Update payment method | expired, invalid, revoked, or another-method recommendation | do not repeatedly use a known unusable credential | “Please update your payment method securely.” |
| Authenticate or reauthorize | authentication-required, mandate/agreement approval | pause identical off-session retries | “Complete the secure verification or authorization step.” |
| Stop and escalate | lost/stolen, fraud, revoked permission, chargeback risk, provider stop advice | suppress blind retries and follow risk policy | keep detail minimal; offer secure support or another method |
| Technical or reconcile | API/config error, webhook delay, duplicate event, state disagreement | determine current payment state before collecting | “We are checking a processing issue; no card details are needed by email.” |

This table is a routing model. The live provider documentation and actual event decide the handling of a specific code.

## Subscription payment failure triage decision tree

```text
1. Does the provider show a successful or in-flight payment?
   yes → reconcile; do not retry
   no  → continue

2. Is this a technical, configuration, scheduler, or event error?
   yes → fix, replay, or reconcile idempotently
   no  → continue

3. Does the customer need to authenticate or authorize again?
   yes → send the secure action; pause identical retries
   no  → continue

4. Is the credential invalid, expired, revoked, lost/stolen,
   or explicitly non-retryable?
   yes → request a safe update or stop/escalate
   no  → retry only within provider and store policy

5. After success, do payment, order, subscription, access,
   messages, and next date agree?
   no  → reconcile
   yes → close failure evidence and stop recovery actions
```

Always begin with the current remote payment state. A stale local failure can coexist with a successful gateway payment after a missed webhook. Manually retrying first can create the duplicate charge the triage process is meant to prevent.

## How should common Stripe decline codes be handled?

Stripe publishes current decline-code meanings and recommended actions, and notes that `generic_decline` can intentionally provide limited detail ([Stripe decline codes](https://docs.stripe.com/declines/codes), [Stripe card declines](https://docs.stripe.com/declines/card)). Verify the live pages when a case is handled.

| Stripe evidence | Practical branch | Customer-safe next step |
| --- | --- | --- |
| `insufficient_funds` | retry later only when permitted and bounded | Pay Now, ensure funds, or use another method |
| `expired_card` | update method | open a hosted payment-method update, then collect the unpaid renewal |
| `incorrect_cvc` | secure re-entry/update | never request CVC through support |
| `authentication_required` | authenticate | open the hosted authentication or payment flow |
| `processing_error` | retry or technical diagnosis | explain a processing issue without blaming the card |
| `lost_card` / `stolen_card` / fraud signal | stop and risk escalation | keep issuer detail private; offer secure alternate method/support |
| `generic_decline` / `do_not_honor` | follow provider advice, often another method or issuer contact | do not pretend to know an undisclosed issuer reason |

Stripe subscription payment recovery also relies on PaymentIntent/invoice events and webhook state monitoring ([Stripe subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks), [Stripe subscription overview](https://docs.stripe.com/billing/subscriptions/overview)). The decline code is only one part of the timeline.

## How should PayPal subscription errors be triaged?

Keep PayPal evidence in PayPal's own vocabulary. Preserve `details[].issue`, request/debug evidence, subscription/agreement state, funding source result, and webhook event privately. PayPal documents funding failures, Orders API troubleshooting, and issue-specific `UNPROCESSABLE_ENTITY` errors ([PayPal funding failures](https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/), [PayPal Orders troubleshooting](https://developer.paypal.com/api/rest/integration/orders-api/troubleshooting/), [PayPal unprocessable entity](https://developer.paypal.com/api/rest/troubleshooting/rest_unprocessable_entity/)).

Separate:

- customer funding-source failure;
- billing-agreement or reauthorization requirement;
- merchant account/configuration problem;
- provider-owned retry or suspension;
- missing or delayed local webhook reconciliation.

Current ArraySubs PayPal failure handling may receive a general status-change note with a `payment_failed` fallback. Do not convert that generic evidence into a precise card diagnosis.

## How should Paddle payment failures be triaged?

Paddle exposes transaction and subscription events such as payment failed and past due, along with provider error information. It can own dunning for automatically collected subscriptions ([Paddle transaction payment failed](https://developer.paddle.com/webhooks/transactions/transaction-payment-failed/), [Paddle transaction past due](https://developer.paddle.com/webhooks/transactions/transaction-past-due/), [Paddle payment recovery](https://developer.paddle.com/concepts/retain/payment-recovery-dunning/)).

Preserve:

- transaction and subscription IDs;
- collection mode;
- event type and occurrence time;
- error code and payment-method error type;
- current remote status and next provider action.

Before initiating any local/manual action, determine whether Paddle is already recovering the obligation. Do not translate Paddle errors as if they were Stripe decline codes.

![Stripe, PayPal, and Paddle retain distinct evidence lanes while the merchant uses one stable five-action model.](/blogs/subscription-payment-failure-codes-a-practical-triage-guide/provider-taxonomy-constellation.png)

## What failure categories does current ArraySubs normalize?

Current ArraySubs core maps common evidence into these operational labels:

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

The direct map is deliberately limited and can fall back to known phrases in provider messages. A normalized category is useful for customer-safe copy and audit filtering, but it is not a complete, permanent representation of every gateway taxonomy.

Most importantly, classification currently does **not** select a different retry cadence. Inspected local Stripe retries follow the product's fixed schedule rather than code-specific timing. Do not claim ArraySubs already suppresses or optimizes every attempt according to the normalized category.

Current Stripe paths can capture PaymentIntent `last_payment_error.code` or related evidence. Current PayPal evidence can be more generic. Current Paddle handling can inspect transaction payment error code/type while continuing to respect Paddle's event and recovery model.

## How does the Renewal Failures audit help triage?

The current Pro Renewal Failures view can expose category/reason, first and last failure, attempts, next retry, renewal order, and customer context. It also provides **Retry** and **Mark Resolved** controls.

![The Renewal Failures audit marks failure evidence, retry state, and resolution controls separately.](/blogs/subscription-payment-failure-codes-a-practical-triage-guide/failure-code-audit.png)

Before **Retry**, verify no payment is in flight or recently succeeded. **Mark Resolved** is an administrative record action; it does not collect money and must not be used as proof that the order is paid.

ArraySubs payment logging also writes WooCommerce logger evidence and subscription/order notes. Identical subscription notes are currently deduplicated inside a short window, which reduces immediate repetition but does not replace event idempotency or a complete timeline.

## How should customers be told about failure codes?

Show the remedy, not the raw payload.

| Internal evidence | Better customer wording | Avoid |
| --- | --- | --- |
| permitted insufficient funds | “Payment was not completed. You can pay now or use another method.” | “Your bank account is empty.” |
| expired card | “Please update your payment method securely.” | publishing full gateway data |
| authentication required | “Complete the secure verification step to finish payment.” | “We will keep retrying automatically.” |
| generic issuer decline | “Your bank did not approve the payment. Try another method or contact the issuer.” | inventing a specific reason |
| technical/reconciliation fault | “We are checking a processing issue; no card details are needed by email.” | telling the customer to replace a valid card |
| risk/stop signal | “We could not complete this payment. Use a secure alternate method or contact support.” | disclosing fraud/lost-card detail unnecessarily |

Match the copy to the [failed-payment email sequence](/deals/arraysubs/resources/payment-recovery/failed-payment-email-sequence-a-message-by-message-playbook/) and the actual [expired-card recovery](/deals/arraysubs/resources/payment-recovery/expired-cards-and-subscription-recovery/) path.

## Safe logging, privacy, and escalation checklist

- [ ] Record gateway, environment, UTC time, request/event ID, subscription, renewal order, safe code/category, attempt, and local/remote state.
- [ ] Record whether an attempt is in flight and what idempotency/deduplication context applies.
- [ ] Keep raw provider wording private and customer wording concise.
- [ ] Redact API keys, webhook secrets, bearer tokens, unnecessary payment tokens, PAN, CVC, address, and customer email from published evidence.
- [ ] Escalate with a minimal reproducible timeline, not a secret-filled screenshot.
- [ ] Query provider and order state before any manual retry.
- [ ] Record whether resolution came from retry, customer payment, method update, authentication, webhook replay, reconciliation, cancellation, or downgrade.

The PCI Security Standards Council states that card verification codes cannot be retained after authorization ([PCI SSC FAQ 1533](https://www.pcisecuritystandards.org/faqs/1533/)). Encryption does not make post-authorization CVC storage acceptable.

## Five worked triage cases

### 1. Expired Stripe card

Classify `expired_card`, direct the customer to a Stripe-hosted method update, then determine whether the unpaid renewal needs Pay Now or an eligible retry. Restore local status/access only after verified payment.

### 2. Stripe authentication required

Pause identical off-session attempts. Send the hosted authentication/payment action. Reconcile the successful PaymentIntent and webhook with the exact renewal.

### 3. Generic PayPal failure note

Do not tell the customer “insufficient funds.” Inspect the agreement, PayPal details, provider recovery state, and webhook evidence; then choose reauthorization, provider wait, or technical escalation.

### 4. Paddle subscription is past due

Confirm Paddle's dunning state and next action before local collection. Reconcile Paddle transaction and subscription events into WooCommerce.

### 5. Provider says paid, WooCommerce says on hold

Treat it as a reconciliation fault, not a new decline. Verify the exact remote payment, replay or repair event processing idempotently, mark one renewal paid, restore access, and prevent another charge.

![A missing webhook bridge can leave the provider saying paid while WooCommerce remains on hold.](/blogs/subscription-payment-failure-codes-a-practical-triage-guide/reconciliation-mirror.png)

The live subscription payment timeline and notes help reconstruct this mismatch:

![The local payment timeline and audit trail must agree with provider evidence before a case is closed.](/blogs/subscription-payment-failure-codes-a-practical-triage-guide/reconciliation-timeline.png)

## Final recommendation

Keep provider evidence raw and private, but make the merchant response stable: retry, update, authenticate, stop, or reconcile. Begin with the current remote payment state, never infer a precise cause from generic evidence, and close the case only after the payment, renewal order, subscription, access, messages, and next date agree.

Use the complete [involuntary churn recovery checklist](/deals/arraysubs/resources/payment-recovery/involuntary-churn-recovery-checklist/) beside your triage runbook. After sandbox and support testing, [review ArraySubs Pro pricing](/deals/arraysubs/pricing/) or the wider [subscription operations features](/deals/arraysubs/features/#subscription-operations).

## Frequently asked questions

### Is every payment failure either hard or soft?

No. Authentication requirements, API/configuration errors, provider-owned recovery, webhook delays, duplicates, and reconciliation faults need separate branches.

### Should insufficient funds always be retried?

No. Retry only when provider advice and merchant policy permit it, cap attempts, and check who owns recovery. Offer a secure Pay Now or alternate-method route.

### What should happen after `authentication_required`?

The customer needs a hosted authentication or payment action. Repeating the same background attempt cannot complete the required step.

### Does ArraySubs use the failure category to choose retry timing?

Current source review found normalized categories but a fixed local Stripe retry cadence. Classification does not currently drive per-code scheduling.

### Does Mark Resolved mean the renewal was paid?

No. It is an audit/administrative action. Verify the successful transaction and paid renewal order separately.

### Can raw gateway errors be shown to customers?

Use a concise, safe explanation and the required action. Keep raw payloads and sensitive provider evidence private and never expose credentials or personal/payment data unnecessarily.

## Author, technical review, and verification environment

**Author:** Emran, ArrayHash — product and editorial work across WooCommerce subscription operations.

**Technical reviewer:** ArraySubs Engineering Team — review scope includes normalized categories, gateway evidence extraction, fixed retry behavior, audit semantics, logging, privacy, and reconciliation.

**Verification environment:** Source and UI review of ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 on July 16, 2026, plus current Stripe, PayPal, Paddle, WooCommerce, and PCI SSC documentation. Not every provider code was generated live.

## Disclosure, limitations, and update log

- **Commercial disclosure:** ArraySubs is an ArrayHash product. Provider-specific limitations and product boundaries are stated explicitly.
- **Limitations:** Gateway taxonomies, network advice, webhook models, and provider-owned recovery change. Recheck official documentation when handling a live code.
- **July 16, 2026:** First publication. Verified current normalized categories, fixed retry limitation, Stripe/PayPal/Paddle evidence differences, audit semantics, safe logging requirements, and reconciliation cases.
