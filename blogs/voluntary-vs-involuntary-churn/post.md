---
title: "Voluntary vs Involuntary Churn"
meta_title: "Voluntary vs Involuntary Churn: A Practical Guide"
meta_description: "Separate voluntary cancellation from terminal failed-payment churn with clear definitions, evidence, formulas, ownership, and WooCommerce operating playbooks."
focus_keyphrase: "voluntary vs involuntary churn"
published: "2026-04-23"
updated: "2026-06-11"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Voluntary vs Involuntary Churn

Voluntary churn happens when a customer intentionally ends the paid relationship. Involuntary churn happens when the relationship ends after an unintended billing failure is not recovered within the merchant's defined retry, grace, and observation policy. Those definitions look simple, but reliable reporting depends on the trigger, actor, timeline, and completed outcome—not the subscription's current status alone.

> **Direct answer:** classify a journey as voluntary when an explicit customer decision is the first material trigger and the relationship reaches your defined churn state. Classify it as involuntary only when a renewal-payment failure reaches a terminal loss after recovery work is complete. Keep merchant-policy and proven operational losses separate, and keep unresolved failures out of terminal churn.

That separation gives each problem the right owner. Product, pricing, onboarding, customer success, and fulfillment teams can work on voluntary churn. Billing operations can improve payment recovery. Engineering can fix scheduler, webhook, and integration failures. Risk or compliance teams can own policy-initiated endings. A single “cancelled” total hides these different mechanisms.

## Key takeaways

- A customer cancellation decision and a failed renewal are different events with different remedies.
- The first payment decline is failure incidence, not terminal involuntary churn.
- `On hold`, `waiting cancellation`, and `cancelled` describe lifecycle state, not root cause.
- Use one primary class per completed journey and retain contributing factors for mixed cases.
- Count scheduled cancellation separately from realized churn unless your metric explicitly measures intent.
- Exclude unresolved failed-payment cases from a closed recovery rate and report them as censored or in progress.
- Keep policy and operational/technical loss outside a forced voluntary-versus-involuntary binary.
- Measure recovery with later paid orders and reconcile remote gateway state before replaying a charge.

![A subscription lifecycle splitting into customer-intent, payment-recovery, policy, and technical paths](/blogs/voluntary-vs-involuntary-churn/featured-image.png)

## Definitions that survive an operational review

The word *churn* is often used for several different moments: a customer clicks Cancel, future renewal is disabled, access ends, a failed payment moves the subscription on hold, or a terminal status is set. Choose one reporting moment and name it.

### Voluntary churn

Voluntary churn is a completed loss whose first material trigger was an explicit customer decision. Useful evidence includes:

- customer or authorized user as the initiator;
- a cancellation request timestamp;
- immediate or end-of-period cancellation type;
- the reason and optional detail shown by the customer;
- a later terminal outcome, if the metric counts realized rather than requested churn.

An end-of-period request can belong in a *pending cancellation* forecast immediately while entering *realized voluntary churn* only when the paid relationship ends. If the customer undoes the request before then, the journey was an intent signal and a save, not realized churn under that convention.

### Involuntary churn

Involuntary churn is a completed loss whose first material trigger was a renewal-payment failure that did not recover. It normally requires evidence of:

- a renewal becoming due;
- an attempted or expected payment;
- a decline, missing method, authentication requirement, gateway error, or equivalent failure;
- the gateway-appropriate retry, customer-update, grace, and reconciliation path;
- a terminal outcome after that path or policy window finishes.

A failed payment that later succeeds is a recovered failure. A case still waiting for customer action or its next retry is unresolved. Neither belongs in terminal involuntary churn.

### Policy, operational, and unknown loss

A merchant may end service because of fraud, abuse, eligibility, safety, compliance, or a deliberate business policy. A system defect may fail to schedule a renewal, process a webhook, reconcile remote state, or preserve billing context. Evidence may be too weak to determine the first cause. These outcomes deserve separate classes:

| Primary class | First material trigger | Typical owner |
|---|---|---|
| Voluntary | Explicit customer decision | Product, pricing, customer success, fulfillment |
| Involuntary | Renewal-payment failure that becomes terminal | Billing operations, lifecycle operations |
| Merchant policy | Merchant, risk, compliance, or eligibility decision | Operations, risk, compliance |
| Operational/technical | Proven gateway, scheduler, webhook, integration, or data fault | Engineering, platform operations |
| Unknown | Evidence cannot support a defensible class | Data owner plus relevant operational team |

The classes should be mutually exclusive for the primary report. Contributing causes can overlap.

## Status is not cause

![A status-to-cause map showing why lifecycle labels do not establish churn intent](/blogs/voluntary-vs-involuntary-churn/status-is-not-cause.png)

A WordPress or WooCommerce status is a present-state label. It is not a causal history.

| Observed state | Plausible interpretations | Evidence still needed |
|---|---|---|
| On hold | Failed renewal inside recovery; customer pause; manual suspension; remote provider state | Previous state, pause metadata, renewal order, gateway event, actor, timestamps |
| Waiting cancellation | Customer chose end of period; administrator scheduled an end; policy action | Initiator, reason, cancellation type, effective date |
| Cancelled | Customer decision; failed-payment terminal loss; policy action; technical cleanup | First trigger, payment history, actor, reason, incident timeline |
| Active after failure | Successful retry; manual payment; remote success not yet synchronized; override | Paid order, transaction evidence, gateway state, sync history |

The distinction is visible in the tested subscription detail: an on-hold record can show lifecycle and order context, but an analyst still needs the preceding timeline to know why it arrived there.

![An on-hold subscription detail illustrating that current state needs surrounding order and lifecycle evidence](/blogs/voluntary-vs-involuntary-churn/on-hold-subscription-detail.png)

[WooCommerce's status documentation](https://woocommerce.com/document/subscriptions/statuses/) likewise describes on-hold scenarios that can include awaiting payment or manual suspension. The practical lesson is not to import another product's exact semantics; it is to stop using a snapshot as proof of cause.

## Build one journey from many events

![Two timelines comparing customer cancellation with failed-payment recovery](/blogs/voluntary-vs-involuntary-churn/two-churn-journeys.png)

Voluntary and involuntary journeys have different clocks.

```text
Voluntary
reason submitted → offer shown or skipped → immediate/pending cancellation → undo or terminal end

Involuntary
renewal due → payment failed → reconcile/retry/update method → recovered, unresolved, or terminal
```

Create a stable `journey_id` for analysis. One end-of-period cancellation can produce a request event today, an offer event, a pending state, an undo, or a terminal event later. One failed renewal can produce several attempts, customer notifications, method changes, orders, and gateway events. Counting rows instead of journeys inflates the numerator.

A practical analysis record includes:

| Field | Purpose |
|---|---|
| Subscription and customer identifiers | Join lifecycle, orders, gateway, and support evidence internally |
| Journey ID | Deduplicate related events |
| First trigger and time | Establish causal sequence |
| Initiator | Customer, administrator, system, gateway, or unknown |
| Cancellation type | Immediate or end of period |
| Stated reason and detail | Preserve customer evidence without calling it root cause |
| Renewal/order identifiers | Link due amount, attempts, and paid result |
| Gateway and billing owner | Interpret local versus remote scheduling and state |
| Failure class | Retryable decline, hard decline, missing method, authentication, technical error, unknown |
| Recovery state | In progress, recovered, terminal, or censored |
| Terminal outcome and time | Place realized churn in the correct period |
| Primary class | Voluntary, involuntary, policy, operational, unknown |
| Contributing factors | Price, low use, support, incident, update friction, delivery, other |

Preserve raw data and derive the class in a versioned transformation. Do not rewrite a customer's recorded answer after an analyst reaches a different hypothesis.

## A decision tree for classifying outcomes

![A decision tree that separates terminal customer decisions, payment failures, policy actions, technical faults, and unknown outcomes](/blogs/voluntary-vs-involuntary-churn/classify-the-outcome.png)

Use this sequence:

1. **Did the relationship reach the reporting churn state?** If no, it may be pending cancellation, paused, in recovery, or otherwise nonterminal.
2. **Was the first material trigger an explicit customer decision?** If yes, classify the terminal result as voluntary and retain its stated reason.
3. **Was it a merchant or policy decision?** If yes, classify it separately.
4. **Was it a renewal-payment failure?** If recovered, it is not churn. If unresolved, it is censored/in progress. If it reached terminal loss after the defined policy, it is involuntary terminal churn.
5. **Was a system or gateway defect proven as the primary trigger?** Use an operational/technical class and record whether the relationship eventually ended.
6. **Is the evidence insufficient?** Use unknown instead of guessing.

This is a reporting framework, not a built-in ArraySubs classifier.

### Mixed-cause examples

- A customer explicitly cancels after a price increase: voluntary primary class, price/affordability reason.
- A card expires, the payment-update path fails technically, and grace expires: involuntary primary class with technical update friction as a contributor.
- Three unexplained billing errors lead the customer to cancel: investigate whether a technical failure was the first material trigger, while preserving the later customer action.
- An administrator cancels fraudulent access: merchant-policy loss, not voluntary churn.
- A failed renewal succeeds on the next attempt: recovered failure, not churn.
- A cancellation is scheduled, then undone: pending-cancel intent and recovered relationship, not realized churn under an end-state definition.

Do not force every case into two buckets simply because a dashboard has room for two colors.

## Metric formulas and denominators

Publish the unit, eligible population, period, churn-state definition, deduplication rule, and observation window next to each metric. [Stripe Billing's analytics documentation](https://docs.stripe.com/billing/subscriptions/analytics) is a useful reminder that subscriber and churn metrics depend on configurable definitions; it does not make Stripe's definition universal for WooCommerce stores.

### Voluntary terminal churn rate

```text
voluntary terminal churn rate
= unique journeys classified voluntary that reached the chosen terminal state
  / eligible opening subscription or customer base
```

If you count a cancellation when requested, call the metric requested or pending cancellation rate. Do not compare it directly with another period counted at access end.

### Involuntary terminal churn rate

```text
involuntary terminal churn rate
= unique failed-payment journeys reaching terminal loss
  / eligible opening subscription or customer base
```

The numerator is not first declines, retry attempts, on-hold records, or unpaid orders.

### First-failure incidence

```text
first-failure incidence
= unique subscriptions with a first failed renewal in the period
  / eligible renewal attempts in the period
```

This measures billing friction entering the recovery system, not final customer loss.

### Closed-cohort recovery rate

```text
closed-cohort recovery rate
= recovered failed-renewal journeys
  / (recovered + terminal failed-renewal journeys)
```

Exclude unresolved cases from this denominator and publish their count and value beside the rate. Otherwise a recent cohort can look excellent merely because difficult cases have not had time to fail.

### Total classified terminal churn

```text
total terminal churn rate
= (voluntary + involuntary + policy + operational + unknown terminal journeys)
  / eligible opening base
```

Primary categories should add up to the terminal total. Contributing factors should not be summed as if they were mutually exclusive.

## Illustrative example

This example is invented and is not an ArraySubs or industry benchmark.

A store begins the month with 1,000 eligible paid subscriptions. Thirty-five customer-initiated journeys reach the chosen terminal state. Twenty renewals have a first failure; 12 recover inside the observation window, five reach terminal loss, and three remain unresolved. Two additional relationships end through a merchant-policy process.

```text
voluntary terminal churn = 35 / 1,000 = 3.5%
involuntary terminal churn = 5 / 1,000 = 0.5%
policy-initiated churn = 2 / 1,000 = 0.2%
classified terminal churn = 42 / 1,000 = 4.2%
closed-cohort recovery = 12 / (12 + 5) = 70.6%
unresolved failed-payment journeys = 3, reported separately
```

Adding all 20 first failures to churn would be wrong: 12 recovered and three are not final. Calling the five terminal cases “customers who chose to cancel” would also be wrong without evidence of an explicit choice.

## Separate operating playbooks

![An ownership matrix routing customer value, cancellation, billing recovery, and technical incidents to different teams](/blogs/voluntary-vs-involuntary-churn/different-causes-different-owners.png)

### Voluntary churn playbook

1. Keep cancellation easy to find and complete.
2. Capture one stable primary reason plus optional detail.
3. Separate the stated answer from the team's root-cause hypothesis.
4. Join product, plan, tenure, usage, support, delivery, and pricing evidence where appropriate and privacy reviewed.
5. Present only a relevant, eligible alternative, such as a pause for temporary timing, a configured downgrade for plan fit, or support for a resolvable problem.
6. Preserve a plain decline-and-continue path.
7. Measure offer eligibility, shown, accepted, cancellation stopped, later retained status, paid renewal, and margin.
8. Assign recurring cause clusters to product, pricing, onboarding, support, and fulfillment owners.

The [WooCommerce cancellation survey documentation](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/) shows how reasons and offers can be part of a cancellation flow. It describes that product, not ArraySubs, and it does not prove that a particular offer causes retention.

### Involuntary churn playbook

1. Record the first failure, amount, renewal order, gateway, and billing-clock owner.
2. Classify the path: retryable decline, hard decline, authentication/customer action, missing method, provider error, local processing error, or unknown.
3. Reconcile provider state before replaying a charge when a remote success could exist.
4. Follow the actual gateway's retry and grace capabilities rather than a generic schedule.
5. Provide a clear payment-update or manual-payment path when customer action is required.
6. Track each journey as recovered, unresolved, or terminal only after the observation policy.
7. Confirm recovery with a paid result and transaction evidence, not merely an active status.
8. Review closed cohorts by gateway, renewal number, plan, amount, and failure class.

[Stripe's revenue-recovery documentation](https://docs.stripe.com/billing/revenue-recovery) and [Smart Retries documentation](https://docs.stripe.com/billing/revenue-recovery/smart-retries) explain processor-specific recovery concepts such as retries, notifications, and customer action. Use them as conceptual references only; they do not describe ArraySubs behavior or make every decline recoverable. [WooCommerce's failed recurring payment retry guide](https://woocommerce.com/document/subscriptions/failed-payment-retry/) similarly applies to its qualifying automatic-renewal gateway architecture.

### Policy and operational playbook

- Require a named actor, reason, evidence, and approval where appropriate.
- Preserve customer-intent evidence separately if the customer also acted.
- Route technical clusters into incident and problem management rather than a coupon experiment.
- Reconcile scheduler, webhook, order, gateway, and subscription timelines.
- Add monitoring for missing scheduled actions, repeated processing, state mismatches, and failure spikes.
- Keep unknown visible until evidence supports reclassification.

[WooCommerce's troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/) recommends establishing expected and actual event timelines during renewal investigation. That discipline is valuable even when the store uses a different subscription implementation.

## How ArraySubs evidence maps to the model

ArraySubs cancellation processing can retain reason, optional details, initiator/actor, cancellation type, and immediate versus end-of-period behavior. An end-of-period cancellation can enter a waiting state, while an undo creates another retention event. Those fields form useful voluntary-intent evidence.

The renewal system has separate invoice-generation, due-time processing, payment-attempt, failure, and retry actions. Core defaults include a retry and grace framework, while actual gateway adapters can alter capabilities and billing ownership. A pre-retry verification step is important where remote success may not yet be reflected locally. These are pieces of an involuntary-recovery journey; none alone is a complete classifier.

![The Renewal Failure Audit providing operational evidence for failed-payment journeys rather than a terminal churn count](/blogs/voluntary-vs-involuntary-churn/renewal-failure-audit.png)

The tested Renewal Failure Audit is therefore an investigation surface, not a chart of involuntary churn. First failure, repeated attempts, gateway context, and final order state still need to be joined into a closed journey.

### Retention Analytics caveats

The current Retention Analytics activity log can show cancellation and offer events, amounts, age, product, and other context. It does not natively publish a rigorous voluntary-versus-involuntary split.

![Retention Analytics activity and summary cards used as operational evidence, not a native voluntary-versus-involuntary classifier](/blogs/voluntary-vs-involuntary-churn/retention-analytics.png)

In the inspected implementation:

- the reasons chart can draw from both scheduled and final cancellation event rows, so one journey may contribute more than once;
- total cancellations count final cancellation events regardless of whether customer intent, payment failure, policy, or another cause drove them;
- the opening base is reconstructed rather than sourced from a historical snapshot table;
- initiator may be present in log evidence, but the summary does not convert it into the classification model above;
- on-hold subscriptions can include pauses and payment-related cases.

Use the dashboard to locate and monitor evidence. Export or transform it into unique, versioned journeys before publishing cause shares.

### Current offer-eligibility boundary

In the inspected code, manual subscriptions and automatic Stripe subscriptions can be eligible for the current retention-offer flow subject to other rules. Automatic PayPal and Paddle subscriptions fail the current retention-offer capability check before offers are assembled. A lower observed save rate for one gateway can therefore reflect exposure differences, not stronger customer intent.

Test every live gateway, product, and cancellation type before comparing performance.

## Validate the classifier before trusting the split

A classification model is only as reliable as its evidence and review process. Start with a bounded sample of recent journeys that includes customer cancellations, first payment failures, recoveries, unresolved failures, terminal failed-payment losses, administrator actions, pauses, and known incidents. Have two reviewers independently assign the first trigger, terminal outcome, primary class, and contributing factors. Then compare disagreements.

Disagreement is useful. It exposes vague rules such as “the last actor determines the cause” or “cancelled after a decline is always involuntary.” Rewrite those rules with concrete examples and an evidence priority. A practical evidence order can be:

1. timestamped customer or administrator action with authenticated actor;
2. renewal order, transaction, and gateway event sequence;
3. scheduler and webhook evidence;
4. stored cancellation reason and type;
5. support or incident evidence tied to the journey;
6. current status only as supporting context.

The order is not absolute. A provider event may arrive late, a customer reason may be vague, or a support case may reveal a preceding outage. Record the source used and allow a reviewed reclassification while preserving the original class and audit trail.

Track a small set of classifier-quality measures:

| Quality measure | What it reveals |
|---|---|
| Unknown primary-class rate | Missing actors, missing timelines, or rules that demand unsupported precision |
| Unresolved failure rate | Recent cohorts that have not completed recovery |
| Journeys lacking a first trigger | Logging or join gaps |
| Duplicate events per journey | Risk of inflated cancellation or offer totals |
| Reviewer disagreement rate | Ambiguous class definitions or insufficient evidence |
| Reclassification rate | Late evidence, unstable rules, or operational data lag |

Do not optimize the unknown rate by guessing. A visible unknown category is safer than a clean but fictional split. Instead, fix the missing evidence: store the actor, link the renewal order, preserve the gateway, record the cancellation type, capture the first failure, and make scheduler or webhook diagnostics retrievable.

### Use cohorts with enough time to finish

Calendar-month reporting mixes journeys of different ages. A renewal that fails on the first day may complete retries and grace before month end; one that fails on the last day cannot. Comparing their apparent terminal rates creates maturity bias.

For recovery, group cases by first-failure week or month and close the cohort only after every case has either recovered, reached terminal loss, or passed the selected censoring rule. Show unresolved count and recurring value until then. For voluntary cancellation, choose whether the cohort begins at request time or effective end time. If end-of-period notice varies by billing cadence, report pending-cancel exposure separately from realized outcomes.

When comparing products or gateways, check exposure and mechanics:

- Did the same proportion receive automatic renewal attempts?
- Did each gateway support the same payment-update and retention paths?
- Were retry and grace policies equivalent?
- Were plan prices, billing intervals, and customer tenure comparable?
- Did one segment contain more remote-scheduled billing?
- Did a product change, outage, price update, or acquisition campaign affect only one cohort?

A raw “Gateway A has lower involuntary churn than Gateway B” statement is not useful when the populations, capabilities, and observation windows differ. Treat the comparison as diagnostic until those differences are controlled or disclosed.

## Connect the split to financial planning

Customer-count churn and recurring-value loss answer different questions. A store can lose many low-value subscribers voluntarily while a few high-value terminal payment failures create the larger revenue exposure. Report both unique journeys and recurring amount, with currency and tax conventions documented.

For pending voluntary cancellation, show expected recurring value at risk rather than calling it cash lost. For unresolved failures, show value in recovery. For recovered cases, confirm the actual paid renewal. For terminal loss, distinguish booked recurring value from contribution margin and recognize that a saved customer may receive a discount or lower-priced plan.

An operating table can use these columns:

| Segment | Unique journeys | Recurring value | State | Next owner action |
|---|---:|---:|---|---|
| Pending voluntary cancellation | count | value at risk | Not terminal | Relevant save path or respectful completion |
| Recovered failed payments | count | paid value | Recovered | Confirm order and monitor next renewal |
| Unresolved failed payments | count | value in recovery | Open/censored | Retry, update, reconcile, or customer action |
| Terminal voluntary | count | recurring value lost | Closed | Root-cause and product/pricing work |
| Terminal involuntary | count | recurring value lost | Closed | Recovery-policy and payment-path work |
| Policy/operational/unknown | count | value affected | Closed or under review | Risk, incident, or evidence remediation |

This table prevents a single churn percentage from becoming the entire plan. It also makes ownership explicit: value at risk is not realized revenue, recovery is not confirmed without payment evidence, and an accepted discount has different economics from a full-price renewal.

## Measurement review checklist

Before presenting voluntary and involuntary churn to leadership, verify:

- [ ] The exact churn state and clock are documented.
- [ ] Requested, pending, undone, and terminal cancellations are distinguishable.
- [ ] First failures, recovered cases, unresolved cases, and terminal failed-payment losses are separate.
- [ ] Every primary class is mutually exclusive and adds to terminal churn.
- [ ] Policy, technical, and unknown classes are visible.
- [ ] Journey deduplication prevents scheduled and final events from inflating counts.
- [ ] The opening base is a genuine snapshot or clearly labelled reconstruction.
- [ ] Gateway and billing owner are present in recovery analysis.
- [ ] Paid orders and transaction evidence confirm recovery.
- [ ] Offer eligibility and exposure differences are included in comparisons.
- [ ] Customer free text is access controlled and excluded from public screenshots.
- [ ] The observation window is long enough for retries, grace, scheduled cancellations, and later renewals to finish.

## Frequently asked questions

### Is a failed payment involuntary churn?

Not by itself. It is a failure entering recovery. Count it as terminal involuntary churn only if the paid relationship ends after the defined recovery and observation policy.

### Is an on-hold subscription involuntary churn?

No. On hold can represent payment recovery, a pause, or another manual or operational state. Inspect the trigger, actor, order, gateway, and timeline.

### Is every customer cancellation voluntary churn?

An explicit customer decision is strong evidence, but the reporting result still depends on your churn state. A scheduled cancellation that is later undone may be pending intent rather than realized churn. Preserve contributing technical or service causes where evidence supports them.

### When should end-of-period cancellation enter churn?

Choose and publish one convention. Operational forecasts often count the request as pending exposure, while realized churn is recorded when access or billing ends. Do not mix the two within one trend.

### What if a merchant cancels after repeated failed payments?

Use the first material trigger and completed journey. If renewal payment failure began the path and recovery exhausted, it can be involuntary terminal churn even if the system or administrator applies the final status. Preserve the final actor separately.

### Can the current ArraySubs dashboard split voluntary and involuntary churn automatically?

Not rigorously in the inspected implementation. It supplies useful cancellation, offer, status, and activity evidence, but a derived journey-level classification is still required.

## Verification environment and limits

This guide was verified on **July 22, 2026** against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, current cancellation, renewal, retry, gateway, and Retention Analytics source, plus safe local staging screens for cancellation controls, on-hold lifecycle evidence, renewal-failure audit, and retention activity.

No live charge, failed-payment recovery, offer acceptance, or customer cancellation was completed for this article. The formulas and classification framework are original editorial recommendations, not built-in reports or performance claims.

Continue with [how to reduce WooCommerce subscription churn](/retention-and-churn/how-to-reduce-woocommerce-subscription-churn/), build a [cancellation reason taxonomy](/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/), review the [involuntary churn recovery checklist](/payment-recovery/involuntary-churn-recovery-checklist/), or explore [subscription retention features](/deals/arraysubs/features/#retention-revenue).

## Primary sources

- [Stripe Billing analytics](https://docs.stripe.com/billing/subscriptions/analytics)
- [Stripe Billing revenue recovery](https://docs.stripe.com/billing/revenue-recovery)
- [Stripe Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries)
- [WooCommerce failed recurring payment retry](https://woocommerce.com/document/subscriptions/failed-payment-retry/)
- [WooCommerce subscription statuses](https://woocommerce.com/document/subscriptions/statuses/)
- [WooCommerce subscriptions troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/)
- [WooCommerce cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/)

## Verification and update log

- **2026-07-22:** Verified ArraySubs cancellation, recovery, gateway, and analytics evidence and local staging UI; added current classification and eligibility limits.
- **2026-06-11:** Editorial update date assigned for the initial publication package.
