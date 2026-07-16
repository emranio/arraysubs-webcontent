# Research brief: Involuntary Churn Recovery Checklist

## Research record

- **Article:** A039 — Involuntary Churn Recovery Checklist
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `involuntary churn recovery checklist`
- **Search intent:** Subscription operators want an end-to-end audit list for preventing and recovering payment-driven churn across gateway setup, token health, retries, messaging, access, support, reconciliation, and measurement.
- **Evidence scope:** A039 brief; publishing standard; ArraySubs 1.8.11 and Pro 1.1.2 source/docs; current official WooCommerce, Stripe, PayPal, Paddle, Gmail, and PCI SSC material.
- **Boundary:** This article covers payment-driven involuntary churn. Voluntary cancellation/save-offer tactics belong in C06 and should be linked, not blended.
- **Test limitation:** Source/UI behavior was inspected. No statistically valid recovery cohort or live gateway matrix was run; do not publish benchmark or lift claims.

## 40–60-word direct answer

> An involuntary-churn recovery checklist must cover more than retries: verify gateway and token health, prevent avoidable expiration failures, classify declines, coordinate retries and customer messages, define grace and access rules, reconcile webhooks and renewal orders, give support safe recovery tools, and measure closed cohorts only after every eligible invoice reaches a final state.

This is 51 words.

## Answer-first editorial thesis

Use a control-loop model:

```text
prevent → detect → classify → recover → reconcile → learn
                          ↘ final policy ↗
```

A recovery program fails when any handoff is missing. A successful retry is not enough if access stays blocked; a polished email is not enough if the token is invalid; an “active” gateway subscription is not enough if the local renewal order is unpaid.

## Key takeaways

- Separate preventable method/token problems, customer-fixable declines, technical failures, and provider-owned recovery.
- Coordinate the local retry schedule with gateway retries and the two grace boundaries.
- Make support verify status before manually retrying or promising restoration.
- Treat “Mark Resolved” as an audit action, not evidence of payment.
- Measure failed-invoice cohorts to a final state; do not use a point-in-time revenue-at-risk card as the recovered-revenue denominator.

## Verified primary sources

All web sources accessed 2026-07-16.

| Claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce provides a failed-payment retry system and a structured troubleshooting framework spanning scheduled actions, orders, gateways, and subscriptions. | [WooCommerce: Failed-payment retry](https://woocommerce.com/document/subscriptions/failed-payment-retry/), [WooCommerce: Troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/) | Ground retry and diagnostic sections. |
| WooCommerce's subscription health check includes scheduled-action and plugin/environment checks relevant to recurring payments. | [WooCommerce: Subscriptions health check](https://woocommerce.com/document/woocommerce-subscriptions-health-check/) | Support readiness audits. |
| Stripe Revenue Recovery combines retries, customer emails, and payment-method recovery; Smart Retries are Stripe-owned behavior. | [Stripe: Revenue Recovery](https://docs.stripe.com/billing/revenue-recovery), [Stripe: Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries) | Separate provider features from ArraySubs local behavior. |
| Stripe documents decline codes and webhook-based subscription monitoring. | [Stripe: Card declines](https://docs.stripe.com/declines/card), [Stripe: Subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks) | Build classification and reconciliation controls. |
| PayPal can retry failures, carry balances, and suspend under provider rules. | [PayPal: Payment failure retry](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/) | Align remote failure threshold with local grace/final state. |
| Paddle can mark automatically collected transactions/subscriptions past due and run provider recovery. | [Paddle: Payment recovery](https://developer.paddle.com/concepts/retain/payment-recovery-dunning/), [Paddle: Transaction payment failed](https://developer.paddle.com/webhooks/transactions/transaction-payment-failed/) | Include provider-owned dunning and webhook evidence. |
| PCI rules prohibit storing card verification codes after authorization. | [PCI SSC FAQ 1533](https://www.pcisecuritystandards.org/faqs/1533/) | Define safe support/log/screenshot practice. |

## Current ArraySubs product truth

### Recovery controls verified

- Core two-phase grace defaults are three days active after due and seven additional days on-hold before overdue cancellation; settings are configurable and checks run hourly.
- Current local Stripe failure handling schedules a fixed cadence of up to three retries, roughly 24 hours apart. It is not decline-adaptive Smart Retry logic.
- The payment-failure classifier normalizes common reasons, but it does not set the retry cadence.
- Customer payment-failed/admin emails, on-hold/cancelled emails, card-expiring event email, and auto-downgrade email exist as lifecycle messages.
- Pro gateway integrations coordinate remote Stripe, PayPal, and Paddle states, with gateway-specific differences.
- Pro exposes a Renewal Failures audit route at `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/renewal-failures`.

### Renewal Failures audit semantics

The current UI can show unresolved failure records with customer, category/reason, failed/last/next retry times, attempt count, and renewal order. It exposes **Retry** and **Mark Resolved** actions.

Important editorial caveat:

- **Retry** is an active collection action and must be checked for duplicate/in-flight attempts.
- **Mark Resolved** is an administrative record action. It does not itself collect payment or prove the order is paid.

### Analytics caveat

Current revenue-at-risk analytics normalize MRR for subscriptions in on-hold and pending-cancellation states. That is a useful exposure estimate, but it is not a closed failed-invoice cohort, not a recovery-rate denominator, and not proof of recovered revenue.

## Publishable end-to-end checklist

### 1. Gateway and token hygiene

- [ ] Use supported current gateway/plugin versions and HTTPS.
- [ ] Test initial signup, off-session renewal, webhook delivery, duplicate events, delayed events, and authentication-required recovery.
- [ ] Verify scheduled actions run on time and the store clock/timezone is understood.
- [ ] Store gateway tokens only; never collect PAN/CVC in tickets, email, notes, or screenshots.
- [ ] Confirm live/test keys, webhook secrets, endpoints, and event subscriptions without exposing them in captures.
- [ ] Verify local subscription, remote agreement/subscription, parent order, renewal order, token/customer ID, and currency correspond.

### 2. Pre-renewal prevention

- [ ] Decide whether upcoming-renewal reminders are useful for the product and legally/operationally appropriate.
- [ ] Enable pre-expiry notices only where a gateway actually supplies expiration evidence.
- [ ] Provide a gateway-hosted payment-method update/reauthorization path.
- [ ] Make billing/contact details easy to update.
- [ ] Monitor token/webhook failures and scheduled-action backlog before renewal dates.
- [ ] Do not claim ArraySubs has its own network account updater.

### 3. Failure detection and classification

- [ ] Record first failure timestamp, provider event/transaction, renewal order, subscription, safe reason/code, and gateway.
- [ ] Deduplicate webhook/event processing and check whether payment already succeeded before retrying.
- [ ] Classify into: retry later, customer update, authenticate, stop/escalate, or technical/reconcile.
- [ ] Keep provider raw evidence safely for support while showing customer-friendly language.
- [ ] Escalate fraud, lost/stolen, invalid account, or revoked authorization instead of blind retrying.

### 4. Retry policy

- [ ] Know whether the local site or provider owns retries for each gateway.
- [ ] Avoid overlapping local and remote retry engines that can create duplicate attempts or confusing notices.
- [ ] Match retry timing to decline type where supported; acknowledge ArraySubs current local Stripe cadence is fixed.
- [ ] Cap attempts and define stop rules.
- [ ] Test the boundary where the last retry and hourly overdue check can occur near the same time.
- [ ] Never manually retry without checking the provider/order for an in-flight or recently successful attempt.

### 5. Customer communication

- [ ] Send an immediate, calm, recognizable notice after a verified failure.
- [ ] Include the subscription, safe reason, actual status/consequence, secure action, deadline, and support route.
- [ ] Coordinate ArraySubs, WooCommerce, and gateway-generated emails.
- [ ] Add reminders only when they introduce a retry, deadline, or changed state.
- [ ] Stop on payment, cancellation, downgrade, dispute, or manual resolution.
- [ ] Authenticate the sending domain and monitor bounces/complaints.

### 6. Grace, access, and fulfillment

- [ ] Define payment, access, fulfillment, and lifecycle clocks separately.
- [ ] Decide what remains available during active grace and what changes on-hold.
- [ ] Explicitly configure membership role/access behavior; do not assume every on-hold subscription loses access automatically.
- [ ] Stop physical shipment or human-delivered service at the correct operational cutoff.
- [ ] Document cancellation versus fallback-downgrade behavior and customer data retention.
- [ ] Align the local final state with PayPal/Paddle/Stripe remote recovery or cancellation.

### 7. Support operations

- [ ] Give agents a safe verification script and least-privilege access.
- [ ] Confirm identity without asking for full card details or CVC.
- [ ] Show exact order/subscription/gateway state, attempts, next retry, and last event.
- [ ] Use a secure Pay Now/update/reauthorization link rather than taking card details.
- [ ] Distinguish “method updated,” “retry requested,” “payment received,” and “fully restored.”
- [ ] Record manual actions and customer promises in an audit trail.

### 8. Reconciliation and restoration

- [ ] Verify one successful charge and one paid renewal order—no duplicate collection.
- [ ] Verify local status, remote status, entitlement/role, fulfillment, failure metadata, and next date.
- [ ] Confirm retry actions are unscheduled/closed and messages stop.
- [ ] Verify recovery confirmation/receipt and customer-visible portal state.
- [ ] Reconcile delayed/out-of-order webhooks idempotently.
- [ ] Investigate any local/remote disagreement before marking the failure record resolved.

### 9. Measurement and postmortem

- [ ] Define an eligible failed-invoice cohort and follow every invoice to a final outcome.
- [ ] Track first failure, recovery, final loss, amount, gateway, category, attempts, channel, and elapsed time.
- [ ] Separate retry-only, customer-assisted, support-assisted, and account-updater recoveries when evidence allows.
- [ ] Exclude voluntary cancellation and unrelated refund/chargeback events.
- [ ] Review by gateway, decline category, plan, renewal number, cohort, and country only where sample/privacy permit.
- [ ] Turn repeat technical causes into owner-assigned fixes.

## Measurement formulas

```text
invoice recovery rate
= recovered eligible failed renewal invoices / eligible failed renewal invoices at final observation

gross revenue recovery rate
= successfully collected failed-renewal amount / eligible failed-renewal amount at final observation

median time to recovery
= median(success timestamp − first verified failure timestamp)
```

Use a cohort window long enough to include the whole retry/grace policy. Report unresolved invoices separately; do not silently count them as recovered or lost.

## Screenshot opportunities on mirror-help.arrayhash.com

Use test records, numbered markers, redaction, and current version/date captions.

1. **Renewal Failures:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/renewal-failures`; mark reason/category, attempts, next retry, order, Retry, and Mark Resolved.
2. **General grace settings:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/general`; mark active/on-hold days.
3. **Subscription detail:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions/detail/{id}`; mark current status, gateway, next date, and renewal order.
4. **Gateway settings/logs:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways`; mark diagnostic/log location, never credentials.
5. **Activity Audits:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/activity-audits`; mark failure → retry → recovery/final-state trail.
6. **Customer portal:** `/my-account/subscriptions/`; mark Pay Now, payment method, update/reauthorization, and customer-visible status if present.
7. **Woo email settings/logs:** show payment-failed email and `transactional-emails` log source where available, with all identities redacted.

## Varied non-chart visual ideas

- **Recovery control-room scene:** support, finance, and engineering watch different parts of one renewal journey.
- **Leaky pipeline illustration:** token, gateway, webhook, order, status, access, and email as joints where recovery can leak.
- **Checklist clipboard on a subscription storefront:** physical boxes, digital access, and service bookings each receive different fulfillment flags.
- **Provider coordination orbit:** WooCommerce/ArraySubs in the center with Stripe, PayPal, and Paddle on distinct event/retry paths.
- **Privacy-safe support desk:** allowed last-four/token identifiers shown, prohibited PAN/CVC crossed out.
- **Before/after incident board:** unresolved failure evidence becomes one paid order, restored access, correct next date, and closed audit.

## Recommended outline

1. Direct answer and how to use the checklist.
2. Prevent: gateway, token, webhook, schedule, and pre-renewal controls.
3. Detect/classify: evidence and decision categories.
4. Recover: retries, email, grace, access, fulfillment, and fallback.
5. Support and privacy.
6. Reconcile and prove restoration.
7. Measure a closed cohort and run a postmortem.
8. Screenshot-backed ArraySubs observations, limitations, and CTA.

## Internal links

- `/deals/arraysubs/features/#subscription-operations`
- Lenient/strict dunning-grace and auto-downgrade recipes.
- A031 recovery pillar; A032 lifecycle; A033 dunning; A034 retries.
- A035 grace, A036 expired cards, A037 email, A038 fallback, A040 failure-code triage.
- Link to C06 voluntary churn content only as a separate intent.

## Claims to avoid

- Any invented recovery benchmark or claim that a point-in-time risk card equals recovered revenue.
- “Mark Resolved collects payment.”
- “ArraySubs current retry cadence is decline-aware.”
- “Every gateway uses the same retry/update process.”
- “On-hold always removes every kind of access.”
- Combining involuntary payment failure with voluntary cancellation as one metric.

## Refresh triggers

- Changes to retry cadence, grace state logic, audit actions, revenue-at-risk calculation, or emails.
- Changes to gateway/provider dunning ownership and webhook states.
- New recovery analytics or cohort reporting.
- Quarterly gateway, WooCommerce, PCI, and sender-guideline review.
