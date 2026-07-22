---
title: "How to Reduce WooCommerce Subscription Churn"
meta_title: "How to Reduce WooCommerce Subscription Churn"
meta_description: "A measurement-first WooCommerce subscription churn guide covering voluntary and involuntary churn, cohorts, failed-payment recovery, cancellation flows, offers, and a 90-day plan."
focus_keyphrase: "how to reduce WooCommerce subscription churn"
published: "2026-01-09"
updated: "2026-07-14"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# How to Reduce WooCommerce Subscription Churn

Reduce subscription churn by defining the metric, separating voluntary cancellation from terminal failed-payment loss, finding the affected cohort and moment, fixing root causes before adding incentives, and measuring durable paid-renewal outcomes against a credible comparison.

That order matters. A store can “improve” offer acceptance while losing the same number of customers later. It can report a high failed-payment recovery rate while recent unresolved cases have not finished their retry window. It can double-count one end-of-period cancellation when the customer schedules it and again when service ends. It can compare subscriber churn with revenue churn and reach opposite conclusions.

> **Direct answer:** use the operating sequence **define → diagnose → prevent → save → recover → win back → measure incrementality**. Treat each intervention as a hypothesis. A discount, pause, skip, downgrade, email, retry, product fix, or payment-update path is successful only when it improves the predeclared customer and business outcome at acceptable cost and harm.

There is no defensible universal “average WooCommerce subscription churn rate” in this guide. No ArraySubs churn-reduction percentage is claimed. Benchmarking without a named dataset, unit, period, denominator, product mix, and method creates false precision.

## Key takeaways

- Subscriber churn and recurring-revenue churn answer different questions.
- Voluntary and involuntary churn need separate triggers, owners, interventions, and metrics.
- A first payment failure is not terminal churn; it is a case in recovery until the policy outcome is known.
- An accepted save offer is an interaction event, not proof of incremental retained revenue.
- Segment by acquisition cohort, tenure/renewal number, product, gateway, amount, reason, and lifecycle event before acting.
- Fix billing defects, reliability, onboarding, product fit, and expectation gaps before using discounts to mask them.
- Keep cancellation clear and unobstructed. Relevant alternatives can be offered without making decline harder.
- Report unresolved cases, missing reasons, repeated events, and dashboard limitations—not only flattering outcomes.

![An operator diagnosing distinct cancellation, payment, usage, and plan-fit causes in a subscription system](/blogs/how-to-reduce-woocommerce-subscription-churn/featured-image.png)

## Start with a metric dictionary

![A churn metric dictionary separating subscriber, voluntary, involuntary, revenue, cohort, and offer metrics](/blogs/how-to-reduce-woocommerce-subscription-churn/churn-metric-dictionary.png)

Before creating a dashboard, document for every metric:

- name and business question;
- formula and unit;
- numerator and denominator;
- included and excluded statuses/events;
- event time versus effective-state time;
- customer versus subscription unit;
- source tables and deduplication key;
- reporting timezone and currency conversion;
- observation window;
- owner and known limitations.

Two teams can use the phrase “subscriber churn” while using different denominators. Stripe’s Billing analytics documentation, for example, supports configurable subscriber and revenue concepts. A valid Stripe convention may not numerically match an opening-base convention in your WooCommerce warehouse. The solution is disclosure and consistency, not pretending one formula is universal.

### Subscriber or logo churn

One defensible opening-base convention is:

```text
subscriber churn rate
= unique subscribers reaching the defined churn state during the period
  / subscribers active at the start of the period
```

Decide whether one customer with two subscriptions is one subscriber or two units. Decide whether trial cancellations count, whether end-of-period cancellations count when scheduled or when access ends, how policy/admin cancellations are classified, and whether a reactivation inside the period removes a churn event.

### Voluntary and involuntary churn

```text
voluntary churn rate
= unique customer-intent cancellations reaching the defined churn state
  / eligible opening subscriber base

involuntary terminal churn rate
= unique subscriptions lost after failed-payment recovery is exhausted
  / eligible opening subscriber base
```

Do not put every failed attempt in the involuntary-churn numerator. A retry, card update, manual payment, grace period, or provider event can still resolve it.

### Gross revenue churn

```text
gross revenue churn rate
= (churned recurring revenue + contraction recurring revenue)
  / recurring revenue at the start of the period
```

Exclude expansion from gross churn. Define whether recurring revenue means normalized MRR, ARR, or the renewal value due. State how annual, weekly, usage, tax, shipping, one-time fees, credits, and multiple currencies are treated.

### Net revenue churn and retention

```text
net revenue churn rate
= (churned MRR + contraction MRR - expansion MRR - reactivation MRR)
  / starting MRR

net revenue retention = 1 - net revenue churn rate
```

Reactivation treatment is a reporting choice. Publish it. A company can have positive subscriber churn and strong net revenue retention when expansion from remaining customers exceeds losses; that does not mean the customer-loss problem disappeared.

### Cohort retention

```text
cohort retention at renewal n
= starting-cohort subscriptions still in the retained state at renewal n
  / starting cohort size
```

Build cohorts by acquisition month, first paid renewal, product, plan, billing interval, initial gateway, or channel. Do not allow later acquisitions into an earlier cohort denominator.

### Failed-payment recovery

```text
first-failure incidence
= unique subscriptions with a first renewal failure during the period
  / renewal attempts during the period

closed-cohort recovery rate
= failed cases recovered inside the observation window
  / failed cases with a resolved outcome in the window

terminal loss rate among failed cases
= failed cases reaching terminal loss
  / resolved failed cases
```

Report unresolved cases separately. Recent cases still inside grace or retry are right-censored; excluding them from the denominator without disclosure can make recovery look better than it will be.

### Retention-offer funnel

```text
offer acceptance rate = accepted offer events / shown offer events

observed retained rate
= eligible cancellation entrants still retained after a defined window
  / eligible cancellation entrants

incremental retained lift
= retained rate in treatment - retained rate in a valid control
```

Shown and accepted are interaction events. “Still active” after a window is an observed outcome. A paid renewal and contribution margin are stronger business outcomes. Incremental lift requires a comparison that estimates what would have happened without the offer.

## Decompose the movement before choosing a tactic

![A churn waterfall separating voluntary loss, involuntary loss, contraction, expansion, and ending state](/blogs/how-to-reduce-woocommerce-subscription-churn/churn-decomposition.png)

Use a subscriber and recurring-revenue bridge:

```text
opening state
- voluntary terminal cancellations
- involuntary terminal losses
- policy/admin/technical losses
- contraction from downgrades
+ expansion
+ reactivation
= ending state
```

Run the bridge by product, tenure, billing interval, gateway, currency, country where lawful and useful, and acquisition cohort. Show counts beside rates. A 50% rate from two subscriptions should not compete visually with a 5% rate from two thousand without context.

## Voluntary and involuntary churn are different workstreams

Voluntary churn begins with customer intent: cancellation, non-renewal, a requested downgrade, or an explicit exit. It often points toward value, need, fit, price, onboarding, product quality, support, or changed circumstances.

Involuntary churn begins with a failed collection or billing-system problem and becomes churn only when the recovery lifecycle ends. It points toward issuer declines, expired/replaced credentials, missing methods, authentication, provider/API problems, scheduler failures, webhook lag, retry policy, customer notices, and payment-update access.

Read [Voluntary vs Involuntary Churn](/deals/arraysubs/resources/retention-and-churn/voluntary-vs-involuntary-churn/) for the full taxonomy. Keep owners separate even when they share a dashboard:

- product, customer success, pricing, and support usually own voluntary causes;
- billing operations, engineering, finance, and support usually own failed-payment recovery;
- data/analytics owns consistent definitions and deduplication;
- leadership owns trade-offs between retention, margin, customer experience, and risk.

An `on-hold` status alone does not classify involuntary churn. It can represent payment recovery, a deliberate pause, or manual administration depending on the system and context.

## Segment before acting

At minimum, cut the data by:

- acquisition month or first-paid-renewal cohort;
- tenure band and paid-renewal number;
- product, variation, plan, and billing interval;
- starting and ending recurring amount;
- gateway and billing-clock owner;
- customer cancellation, payment recovery, policy/admin, or technical/unknown trigger;
- stated cancellation reason and separately coded root-cause hypothesis;
- offer shown/accepted and paid-renewal outcome after 30/60/90 days or relevant cycles;
- geography and currency only where material, lawful, and adequately sized.

Ask:

1. Is the movement in first failures, terminal payment losses, intentional cancellation, policy cancellation, or duplicated events?
2. Did the opening base or acquisition mix change?
3. Does it concentrate after trial, first renewal, price change, plan change, or a specific tenure?
4. Does a gateway, product, currency, or cart shape dominate?
5. Did the reason survey wording, order, required status, or options change?
6. Do accepted offers survive one and several paid-renewal opportunities?
7. Did a retry, grace, cancellation, portal, or product release change the customer experience or the measurement itself?

## Diagnose reason and root cause separately

A cancellation answer is a customer’s stated main reason in a particular interface. It is valuable, but it is not a complete causal finding.

“Too expensive” can reflect a price increase, insufficient usage, unclear value, a wrong tier, temporary cash flow, a competitor, or a broader budget change. “Technical issues” can reflect a product defect, billing problem, support gap, device incompatibility, or an incident. Store the stable reason key and the text shown, then investigate operational evidence.

Use [Why Customers Cancel Subscriptions: A Reason Taxonomy](/deals/arraysubs/resources/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/) to keep actionable categories mutually understandable and to separate survey response from analyst hypothesis.

## Match interventions to evidence

![A signal-to-intervention matrix for price, low usage, product gaps, and payment failures](/blogs/how-to-reduce-woocommerce-subscription-churn/intervention-matrix.png)

| Signal | Investigate first | Intervention hypotheses | Outcome | Guardrail |
| --- | --- | --- | --- | --- |
| “Too expensive” among engaged customers | Price, usage, plan fit, competitor, timing | Downgrade, billing-frequency option, bounded targeted discount | Incremental retained contribution after the window | Do not discount everyone or hide future price |
| “Not using enough” | Activation, habit, consumption/stock, seasonality | Onboarding, usage reminder, pause, skip, lower frequency | Cohort usage and paid renewal | State access, shipping, resume, and next charge |
| Missing feature/poor fit | Product and support evidence | Correct tier, honest roadmap, direct cancel, later win-back | Relevant cohort outcome and repeated reason | Do not promise an uncommitted feature |
| Technical issue | Tickets, logs, version, gateway | Fix root cause, service recovery, targeted support | Incident recurrence and affected cohort | A discount does not fix reliability |
| First renewal failure | Gateway, method, code, scheduler, decline | Fix billing, review retry, notify, update-payment path | Closed-cohort recovery and terminal loss | Do not retry hard declines blindly |
| Cancels after terms/price change | Notice, expectations, consent, value | Clearer notice, plan choice, downgrade | Cohort revenue retention and complaints | Do not add cancellation friction |
| Acceptance rises, churn unchanged | Window, repeat offers, selection bias | Holdout, terms/eligibility redesign | Incremental paid renewal and margin | Acceptance is not the objective |

These are hypotheses. The same stated reason can need a different intervention by product, tenure, and customer economics.

## Prevent churn before the cancellation flow

### Set expectations at checkout

Make recurring amount, frequency, trial end, signup fee, renewal timing, cancellation mode, fulfillment, tax/shipping variability, and payment method clear. Surprise is a retention defect and a dispute risk.

### Improve activation and time to value

Segment early usage and first-renewal outcomes. Find the behavior that indicates the subscription’s intended job is working, then improve onboarding and support. Do not convert a correlation into a universal “aha moment” without testing.

### Design plans for real usage

Offer intervals, quantities, tiers, and entitlements that match customer need. A structurally oversized plan creates repeated pressure that a temporary discount cannot solve.

### Communicate material changes

Provide clear, timely notice of price, terms, delivery, access, and schedule changes. Include an understandable account path. Obtain legal review for applicable notice and consent requirements.

### Fix reliability and support ownership

Group cancellation reasons with incidents, tickets, refunds, disputes, and gateway events. A product or billing defect should receive a root-cause owner rather than a coupon budget.

## Build an ethical cancellation and save path

![ArraySubs Retention Flow configuration in the local test environment](/blogs/how-to-reduce-woocommerce-subscription-churn/retention-flow-overview.png)

The current core Retention Flow supports configurable reasons and reason-targeted discount, pause, downgrade, and support offer settings. An offer still has to pass subscription, customer, product, gateway, and offer-specific conditions.

An effective flow:

1. makes cancellation findable;
2. states immediate versus end-of-period effect and the relevant date;
3. asks a neutral, minimal reason question;
4. offers a relevant alternative with full terms;
5. keeps the direct cancellation route clear;
6. confirms the committed result;
7. records events for analysis without treating friction as retention.

The [anatomy of an effective subscription cancellation flow](/deals/arraysubs/resources/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/) covers the detailed customer contract.

### Offer eligibility is gateway-specific today

Manual subscriptions are eligible for the current core offer path by default. In the inspected Pro capability matrix, automatic Stripe subscriptions opt into retention amount updates; automatic PayPal and Paddle subscriptions do not. The current eligibility function exits before assembling any offers for an unsupported automatic gateway, so pause, downgrade, and contact offers are also hidden—not only discounts.

Do not promise that every configured offer appears to every subscription. Test manual, Stripe, PayPal, and Paddle separately.

![Customer save offers for a discount and pause in the local test subscription](/blogs/how-to-reduce-woocommerce-subscription-churn/customer-save-offers.png)

In the observed test flow, choosing “Too expensive” displayed a 20% discount for three cycles and a pause option. Those are current saved settings and a synthetic example, not recommended economics or proof of effectiveness.

## Failed-payment recovery needs a closed cohort

Core retry defaults in the inspected source are enabled with three retries 24 hours apart, while Pro adapters can override behavior. Renewal settings also default to three grace days before on-hold and seven additional days before cancellation. Stored merchant settings and provider-owned schedules can differ.

Use the [involuntary churn recovery checklist](/deals/arraysubs/resources/payment-recovery/involuntary-churn-recovery-checklist/) and [failed subscription payment recovery for WooCommerce](/deals/arraysubs/resources/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/) for the operational runbook.

For every first failure, retain:

- subscription, gateway, method type, due amount/currency, renewal number;
- provider result and decline/action classification;
- local order and scheduled action;
- retry/customer-action timeline;
- payment update and communications;
- recovered, unresolved, or terminal result;
- date of the next successful paid renewal where relevant.

Not every failure should be retried. Hard decline, missing method, authentication, revoked mandate, and provider/system errors need different actions. Before retrying an uncertain outcome, verify that the provider did not already charge it.

## Interpret Retention Analytics carefully

![ArraySubs Retention Analytics showing one synthetic offer impression and its activity event](/blogs/how-to-reduce-woocommerce-subscription-churn/retention-analytics.png)

The current core analytics page is useful for operational visibility, but its metrics have specific semantics:

| Dashboard item | Current meaning | Reporting caution |
| --- | --- | --- |
| Total cancellations | Count of `cancelled` event rows | Validate uniqueness before calling it customers |
| Opening base | Approximation from current live/cancelled post state and modification dates | Not a historical status snapshot ledger |
| Churn rate | Cancelled rows divided by approximate opening base | Not automatically comparable with other platforms |
| Reason chart | `cancelled` plus `scheduled_cancel` event rows | One journey can appear at scheduling and terminal end |
| Offers shown/accepted | Event-row counts | Repeated journeys can add events; no causal lift |
| Retained revenue | Accepted-offer recurring amounts for subscriptions currently live | Not cash collected, margin, or incremental revenue |

The screenshot was produced from a local synthetic cancellation flow. It shows one “Offer Shown” event, no accepted offers, and no cancellations. It demonstrates event instrumentation, not a performance result.

For editorial or executive reporting, export and deduplicate journeys by subscription and cancellation lifecycle. Build an opening-state snapshot or warehouse history if precise cohort rates matter.

## Prioritize with evidence, value, and customer harm

Use a transparent table:

| Problem cohort | Affected recurring value | Evidence quality | Customer harm | Intervention fit | Effort/risk | Owner |
| --- | ---: | --- | --- | --- | --- | --- |

Or use a ranking heuristic:

```text
opportunity score
= recurring value affected
  × evidence strength (0–1)
  × addressability assumption (0–1)
  × confidence in intervention (0–1)
  / relative effort and risk
```

The 0–1 values are judgments, not probabilities. Keep the raw inputs and rationale. Do not present the score as forecast revenue.

## A 90-day churn-reduction operating plan

![A 90-day roadmap moving from definitions to root-cause fixes and controlled tests](/blogs/how-to-reduce-woocommerce-subscription-churn/ninety-day-roadmap.png)

### Days 0–30: define and instrument

- Publish the metric dictionary and opening-base convention.
- Choose scheduled versus terminal cancellation counting and deduplicate journeys.
- Separate first failure, recovery, terminal involuntary loss, customer cancellation, and policy/admin cancellation.
- Audit reasons, missing values, “Other” text, survey versions, and offer events.
- Build product, tenure, gateway, and acquisition-cohort cuts.
- Audit retry, grace, cancellation, pause, skip, downgrade paths, and gateway eligibility.
- Capture a baseline without claiming causality.

### Days 31–60: fix the clearest causes

- Correct technical and billing defects before incentives.
- Improve eligible payment-update and failure communications.
- Route temporary/timing reasons to a safe pause or skip.
- Configure real downgrade paths for affordability/fit cohorts.
- Refine confusing or non-actionable reason labels.
- Define offer margin floors, durations, exclusions, and customer disclosures.

### Days 61–90: test and measure

- Use a holdout or staggered rollout where volume and ethics permit.
- Measure shown, accepted, retained status, paid renewals, margin, support, complaints, refunds, and chargebacks separately.
- Review at one and several renewal opportunities.
- Expand only interventions with plausible incremental value and acceptable customer impact.
- Feed the findings to product, support, pricing, lifecycle, and gateway owners.

ArraySubs does not currently include a built-in causal A/B-testing engine. Implement assignment and analysis with a reviewed experiment design or use a credible staggered comparison.

## Illustrative worked example

This is invented data, not an ArraySubs benchmark.

At the start of a month, 1,000 subscriptions are active. During the month, 35 reach the defined terminal state after customer cancellation. Twenty have a first renewal failure; 12 recover within the observation window, five reach terminal loss, and three remain unresolved.

```text
voluntary churn rate = 35 / 1,000 = 3.5%
involuntary terminal churn rate = 5 / 1,000 = 0.5%
combined terminal churn rate = (35 + 5) / 1,000 = 4.0%
closed-cohort recovery rate = 12 / (12 + 5) = 70.6%
unresolved failed cases = 3, reported separately
```

First-failure incidence uses renewal attempts as its denominator, not the opening base. If 40 customers see an offer and 14 accept, acceptance is 35%. That does not establish 14 incremental saves. Observe later paid renewals and compare with an eligible control.

## Verification environment and limits

## Build a churn analysis table you can trust

A useful churn program needs a dataset organized around customer journeys, not a loose export of status changes. Start with one row per subscription and cancellation or failed-payment journey. Give that journey a stable identifier so a scheduled cancellation, an offer event, a later terminal cancellation, and an undo do not become four different customers in the report.

At minimum, retain these fields:

| Field | Why it matters |
|---|---|
| Subscription and customer identifiers | Join lifecycle, order, support, and gateway evidence without exposing identifiers in published reporting. |
| Product, plan, price, and recurring amount | Separate customer-count churn from revenue impact and detect plan-specific problems. |
| Start date, tenure, and renewal number | Compare activation failures, early disappointment, and mature-account behavior. |
| First trigger and timestamp | Distinguish an explicit customer decision from a payment failure, admin action, or technical incident. |
| Initiator | Preserve customer, administrator, system, gateway, or unknown rather than inferring intent from status. |
| Stated reason and optional detail | Retain what the customer actually said without treating it as proven root cause. |
| Gateway and billing-clock owner | Route failure recovery to the system that actually controls the next charge. |
| Offer eligibility, shown, and accepted | Calculate the real exposure funnel instead of acceptance among only successful requests. |
| Terminal outcome and timestamp | Decide whether and when the journey belongs in realized churn. |
| Later paid-renewal outcome | Separate a momentary cancellation reversal from durable retained revenue. |

Create derived fields in a documented transformation rather than overwriting raw evidence. For example, `primary_churn_class` can classify voluntary, involuntary, policy, operational, and unknown outcomes while `contributing_factors` retains price, low use, payment-update friction, or an incident. A customer who clicks cancel after repeated billing errors should not automatically be filed as a pure product-choice loss. The timeline may show that operational failure was the first material trigger.

Use a consistent observation window. A cancellation scheduled for the end of a paid term may be forecast exposure today and realized churn only when access or billing actually ends. A failed renewal inside retry or grace is a recovery case, not terminal churn. A customer who accepts a three-cycle discount has not demonstrated durable retention until the relevant future renewals occur. Publish those conventions next to the metrics.

### Reconcile event counts before presenting a chart

The current Retention Analytics view is useful for operational visibility, but its event rows are not automatically unique cancellation journeys. A scheduled cancellation can later produce a terminal cancellation event, and an undo can add another event to the same history. Deduplicate by journey and choose the event that represents the numerator you named.

Also reconcile the opening base. A reliable historical opening base is a snapshot of eligible subscriptions at the start of the period. Reconstructing it later from current status and modified dates can be directionally useful, but status may have changed since then. If you lack historical snapshots, label the base as reconstructed and avoid false precision. Begin taking daily or period-opening snapshots so future comparisons improve.

Before a monthly review, run five checks:

1. Unique journeys equal the sum of mutually exclusive terminal primary classes plus unresolved journeys.
2. Scheduled, undone, and final events do not inflate the customer numerator.
3. Renewal failures that recovered are absent from terminal involuntary churn.
4. Offer acceptance has a matching eligibility and shown record, or the data gap is explicit.
5. Revenue totals reconcile to the recurring-amount convention and currency scope used in the report.

## Turn the dashboard into a decision log

Every churn initiative should have a short decision record: the observed segment, evidence, proposed mechanism, owner, eligibility rule, customer disclosure, success metric, guardrails, start date, and review date. This prevents a temporary idea—such as discounting every price objection—from silently becoming permanent policy.

A good decision record might say: “New annual-plan customers in their first 45 days show a cluster of low-use cancellations. Improve activation for the next cohort; do not change price. Primary outcome: activation milestone completion and paid second-term retention. Guardrails: support contacts, refunds, and complaints.” Another might say: “Customers with temporary inventory buildup may receive a clearly explained pause; compare later paid renewals with eligible customers who saw the standard cancellation path.”

Close or revise an intervention when the mechanism is contradicted. If a technical defect drives the segment, a coupon does not fix it. If pause acceptance is high but the cohort never resumes and renews, the offer may only delay recognition of churn. If a discount preserves customer count but destroys contribution margin, it is not a healthy retention win. This discipline keeps the program focused on durable customer value rather than attractive but incomplete dashboard numbers.

This guide was last verified on **July 22, 2026** against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, WordPress 7.0.2, WooCommerce 10.9.4, current cancellation/retry/analytics source, and a live local retention-flow sequence.

The test enabled configured retention offers, opened a synthetic customer cancellation, selected a reason, displayed discount and pause offers, and confirmed that an `offer_shown` event appeared in Retention Analytics. No offer was accepted and no subscription was cancelled. We did not analyze a merchant dataset or run a controlled retention experiment.

## Frequently asked questions

### What is a good WooCommerce subscription churn rate?

There is no universal number here. Define the unit, denominator, product, period, lifecycle state, and revenue convention, then compare your own cohorts and trend with consistent methods.

### Does ArraySubs reduce churn by a known percentage?

No percentage is supported by this review. ArraySubs provides cancellation, retention, recovery, and analytics building blocks; your outcomes depend on cause, implementation, customers, and measurement.

### Is every failed payment involuntary churn?

No. It is a recovery case until it reaches a defined terminal outcome. Report recovered, unresolved, and terminal cases separately.

### Is an accepted offer a saved customer?

Not yet. Measure whether the customer remains and completes relevant paid renewals, then estimate incremental lift and margin against a comparison.

### Should I offer a discount to everyone who cancels?

No. Match offers to stated reason and evidence, test unit economics, restrict repeat use, disclose the future price, and keep direct cancellation clear.

### Do PayPal and Paddle subscriptions receive the same current offers as Stripe?

No. In the inspected code, automatic PayPal and Paddle subscriptions fail the current retention-offer capability check, while manual and automatic Stripe subscriptions are eligible subject to other conditions.

## Final checklist

- [ ] Churn metric, unit, denominator, clock, and deduplication are published.
- [ ] Subscriber, gross revenue, net revenue, and cohort retention are separated.
- [ ] Voluntary, first failure, recovery, unresolved, and terminal involuntary states are separate.
- [ ] Product, tenure, renewal number, gateway, reason, and cohort cuts include counts.
- [ ] Technical, billing, product, and expectation defects have root-cause owners.
- [ ] Cancellation remains clear, and offers disclose terms without obstruction.
- [ ] Offer eligibility is tested for each real gateway and product path.
- [ ] Paid-renewal and margin outcomes are measured beyond acceptance.
- [ ] Dashboard event and opening-base limitations are documented.
- [ ] A 90-day plan sequences definitions, fixes, and controlled tests.

Explore the [subscription retention feature](/deals/arraysubs/features/#retention-revenue), [reason-targeted retention flow recipe](/deals/arraysubs/use-cases/recipes/require-reason-targeted-funnel/), [pause recipe](/deals/arraysubs/use-cases/recipes/pause-need-a-break/), [downgrade recipe](/deals/arraysubs/use-cases/recipes/downgrade-offer/), and [ArraySubs Pro pricing](/deals/arraysubs/pricing/) after defining the measurement and gateway boundaries.

## Primary sources

- [Stripe Billing analytics](https://docs.stripe.com/billing/subscriptions/analytics)
- [Stripe Billing revenue recovery](https://docs.stripe.com/billing/revenue-recovery)
- [Stripe Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries)
- [WooCommerce failed recurring payment retry](https://woocommerce.com/document/subscriptions/failed-payment-retry/)
- [WooCommerce subscription statuses](https://woocommerce.com/document/subscriptions/statuses/)
- [WooCommerce troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/)
- [WooCommerce cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/)
- [FTC report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers)

## Verification and update log

- **2026-07-22:** Verified current Retention Flow, eligibility, retry/grace defaults, Retention Analytics formulas, and a live local reason-to-offer-to-event sequence.
- **2026-07-14:** Editorial update date assigned for the initial publication package.
