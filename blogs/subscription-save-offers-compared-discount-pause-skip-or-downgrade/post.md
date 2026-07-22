---
title: "Subscription Save Offers Compared: Discount, Pause, Skip, or Downgrade"
meta_title: "Subscription Save Offers: Discount, Pause, Skip, Downgrade"
meta_description: "Compare subscription discount, pause, skip, and downgrade offers by customer problem, eligibility, lifecycle impact, margin, gateway support, and durable renewal outcomes."
focus_keyphrase: "subscription save offers"
published: "2026-01-26"
updated: "2026-06-30"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Subscription Save Offers Compared: Discount, Pause, Skip, or Downgrade

Discount, pause, skip, and downgrade offers solve different subscription problems. A short discount can address temporary affordability when margin permits. Pause fits a temporary need interruption. Skip fits one unwanted renewal or shipment. Downgrade fits a lasting mismatch between price, usage, or plan. If none solves the problem, the right outcome is an easy cancellation.

> **Direct answer:** match the offer to the customer's problem and the subscription system's verified capability. Then measure whether the customer completes later paid renewals at acceptable contribution margin—not whether they clicked Accept in the cancellation dialog.

The comparison is not a ranking. A pause can be excellent for a seasonal need and harmful for a service that never delivered value. A discount can save a high-margin customer or train customers to threaten cancellation. A downgrade can preserve fit or quietly reduce revenue without fixing product weakness. A skip can relieve one difficult cycle or only postpone inevitable churn.

## Key takeaways

- Discount solves price pressure; pause and skip solve timing; downgrade solves plan fit.
- Match the intervention to stated reason plus product, billing, usage, support, and eligibility evidence.
- Disclose amount, duration, effective date, next price, access, fulfillment, and renewal consequences.
- Keep a direct cancellation control visible and easy to use.
- Verify the current gateway and billing owner can honor the offer.
- Align invoice-generation and due-time payment scheduling when dates change.
- Treat acceptance as an event, not realized or incremental retained revenue.
- Measure paid renewal, margin, repeat cancellation, support, refunds, and customer harm.
- Use a holdout or credible comparison for causal claims where feasible.

![A customer comparing discount, pause, skip, downgrade, and a visible direct cancellation path](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/featured-image.png)

## The four-offer comparison

![A four-column comparison of subscription discounts, pauses, skips, and downgrades](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/four-save-offers.png)

| Offer | Best fit | Main risk | System proof needed | Durable outcome |
|---|---|---|---|---|
| Discount | Temporary affordability or price objection with viable margin | Trains strategic cancellation; masks weak value; destroys margin | Correct amount, cycle count, future price, gateway billing effect | Paid renewals during and after discount plus contribution margin |
| Pause | Temporary interruption, seasonality, inventory buildup, short cash constraint | Becomes deferred churn; access/fulfillment/billing drift | Pause state, resume date, billing and entitlement consequences | Correct resume and paid renewal |
| Skip | One unwanted cycle, shipment, or renewal | Next date wrong; only delays persistent mismatch | Exact skipped renewal and aligned schedules | No unintended charge; next cycle succeeds |
| Downgrade | Lasting plan, price, quantity, or feature mismatch | Wrong target, proration surprise, entitlement loss | Configured target, price, effective date, proration, entitlements | Renewal on appropriate plan at sustainable margin |

## Discount: useful when price is the problem

A discount reduces one or more renewal amounts. It can fit a temporary cash constraint, a transition after a price increase, or a segment where a lower introductory period remains economically sustainable.

### Terms to define

- percentage or fixed amount;
- affected renewal price and taxable basis;
- start date;
- number of cycles or end date;
- regular price afterward;
- product and plan eligibility;
- customer-value or tenure limits;
- repeat-use limits;
- interaction with existing coupons, credits, taxes, currency, upgrades, and downgrades;
- automatic-gateway capability and remote amount synchronization.

A button labelled “Save 20%” is incomplete. Better copy says: “Save 20% on your next three renewals. Your regular price returns after the third discounted renewal.” Show the actual amount when the system can calculate it reliably.

### When discount is a poor fit

Do not use it as the default response to low usage, overstock, missing features, delivery failure, technical defects, or a need that ended. It can hide the real issue and reward only customers who enter cancellation.

Segment repeat discount seekers. A customer who repeatedly accepts a three-cycle discount and starts cancelling as it expires may have a permanent price/plan mismatch. A configured downgrade can be more honest than an endless promotional loop.

### Current ArraySubs behavior

The inspected Retention Flow admin page exposes a percentage discount and a cycle count, with additional reason and eligibility controls. It does not establish arbitrary fixed, one-time, or lifetime discount behavior in the current interface.

![ArraySubs retention-offer controls for discount, pause, downgrade, reasons, and eligibility](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/retention-offer-controls.png)

For automatic subscriptions, changing a renewal amount requires gateway support. The current inspected capability allows automatic Stripe subscriptions and manual subscriptions into the offer flow, subject to other rules. Automatic PayPal and Paddle subscriptions currently fail that capability check before all offers are assembled.

## Pause: useful when the need is temporary

Pause temporarily stops or shifts recurring behavior while preserving the relationship. It can fit seasonality, travel, inventory buildup, a short project gap, temporary financial pressure, or time to resolve a service issue.

### Terms to define

- pause start and duration;
- exact resume date;
- whether access continues;
- whether fulfillment stops;
- whether usage or credits accumulate;
- what happens to already-created orders;
- whether the renewal calendar shifts or a fixed term remains;
- whether remote provider billing is paused;
- resume-early and cancel-during-pause behavior;
- maximum duration and repeat-use limits.

“Pause 30 days” can mean several things: delay the next renewal 30 days, suspend service until a date, keep the original cadence but skip charges, or stop fulfillment only. Choose one system behavior and disclose it.

### Main risk: deferred churn

Pause acceptance is not a save. Some customers never resume, resume but never pay, or cancel at the next renewal. Measure:

- scheduled versus actual resume;
- status and entitlement correctness during pause;
- first paid renewal after resume;
- second paid renewal where the interval permits;
- support contacts and unintended fulfillment;
- repeat pause and later cancellation.

### Current ArraySubs behavior

Current source supports pause settings and lifecycle metadata, and the staging cancellation flow displayed a configured 30-day pause beside a discount. That proves the safe local path could surface the option; it does not prove every gateway or state will honor it identically.

![A staging customer save-offer dialog presenting configured discount and pause choices with a continuation path](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/customer-save-offers.png)

## Skip: useful for exactly one cycle

Skip moves past a specific upcoming renewal without ending the relationship. It can fit one unwanted shipment, a temporary budget week, excess inventory, or a customer who needs a single-cycle adjustment rather than a longer pause.

### Terms to define

- the renewal or shipment being skipped;
- whether access or credits continue;
- the next expected renewal date;
- how billing interval and term boundaries behave;
- whether skip is available during recovery or an already-generated order;
- maximum skips and minimum days before renewal;
- gateway and fulfillment coordination.

The interface should say: “Skip the August 31 renewal; your next expected renewal is September 30,” not merely “Skip once.”

### Scheduling correctness

ArraySubs renewal timing uses both a precise per-subscription invoice-generation action and a due-time payment-processing action. When a renewal date moves, both must align. Leaving one at the old date can create an invoice, attempt, or misleading failure.

For remotely scheduled gateways, the provider's billing clock also matters. A local date change that does not update the provider can result in an unexpected remote charge. Test provider and local state together.

### Current ArraySubs boundary

Skip exists as a standalone subscription action and lifecycle branch in the current source. The inspected Retention Flow admin controls do not expose skip as a cancellation offer. Therefore this article compares the intervention conceptually, but does not claim the current customer cancellation-offer UI shows it.

## Downgrade: useful for lasting plan mismatch

Downgrade moves the customer to a lower-priced, lower-quantity, lower-frequency, or reduced-feature plan. It can preserve a relationship when the current tier exceeds ongoing need.

### Terms to define

- exact destination product/variation/plan;
- new recurring price and interval;
- effective date;
- immediate versus next-renewal transition;
- proration, credit, and tax behavior;
- feature, quota, access, inventory, or fulfillment changes;
- what happens to add-ons or bundled entitlements;
- future upgrade path;
- gateway compatibility;
- scheduled-action and order implications.

[Stripe's subscription-change documentation](https://docs.stripe.com/billing/subscriptions/change) describes how price changes in Stripe Billing can create proration and recommends previewing financial effects. Treat that as provider-specific context, not a statement that ArraySubs performs the same proration.

### Current ArraySubs boundary

The current retention settings can enable a downgrade offer, and plan-switching settings provide related product-change controls. A complete portal path still needs a real configured target. The inspected flow can fall short when downgrade is enabled without a target selection that the customer can actually accept.

![The plan-switching settings that provide product-change context for a configured downgrade path](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/plan-switching-settings.png)

Do not advertise a generic downgrade if the merchant has not mapped a valid destination and tested price, schedule, entitlements, and later renewal.

## Match the problem, not the button

![A reason-to-offer decision tree that includes fixing technical issues and allowing direct cancellation](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/match-the-problem.png)

| Observed reason | Evidence to check | Candidate | Prefer cancellation or another action when… |
|---|---|---|---|
| “Too expensive” | Price history, plan fit, use, margin, temporary vs lasting | Short discount or configured downgrade | Need ended, value absent, margin negative, repeated strategic use |
| “Not using enough” | Activation, cadence, inventory, seasonality | Pause, skip, lower-frequency downgrade | Product never fit or customer clearly wants to leave |
| “Need a break” | Expected return date, entitlement/fulfillment effects | Pause | Pause mechanics cannot honor the promise |
| “One renewal is bad timing” | Upcoming order, date, gateway, schedule | Skip | Order already committed or remote billing cannot be moved safely |
| “Missing features” | Exact capability, plan availability, roadmap certainty | Existing suitable plan/downgrade or support | Capability does not exist; do not promise future work |
| “Technical issue” | Logs, incident, version, support | Fix/support, perhaps goodwill after resolution | The system remains broken; coupon is not remediation |
| “Poor service or delivery” | Order/support evidence, recurrence | Resolution and operational fix | Customer prefers exit or trust is lost |
| “No longer need it” | None beyond respectful clarification | Possibly pause only if temporary and invited | Customer declines; continue cancellation |

### Do not infer too much from one answer

A stated reason is evidence, not diagnosis. “Too expensive” can hide wrong plan, low use, weak outcomes, price surprise, or temporary constraint. Use the least invasive relevant evidence and make the offer optional.

## Promise-to-system proof

![Four offer lanes connecting customer terms to stored state, scheduled actions, and paid outcomes](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/promise-to-system-proof.png)

Every offer should pass four layers:

1. **Customer terms:** what changes, when, for how long, and what follows.
2. **Stored state:** durable metadata or lifecycle state representing that promise.
3. **Scheduled and remote actions:** renewal, invoice, payment, fulfillment, entitlement, gateway, and notification behavior.
4. **Paid outcome:** the later order and transaction match the disclosed terms.

Build a test record:

| Offer | Stored proof | Schedule/provider proof | Customer-facing later proof |
|---|---|---|---|
| Discount | Type, amount, cycles remaining, eligibility use | Correct renewal amount locally/remotely | Paid invoice/order and remaining duration |
| Pause | Start, end, previous state, resume rules | Future actions shifted/blocked correctly | Account shows pause and resume date |
| Skip | Skipped date/cycle and new next date | Invoice and payment actions aligned; remote state aligned | No charge for skipped cycle; new date visible |
| Downgrade | Source/target and effective timing | Product/price/order transition scheduled | Plan, price, benefits, and renewal correct |

If any layer cannot prove the promise, do not expose the offer to that subscription.

## Economics before rollout

Define the decision using contribution margin, not gross recurring value alone.

For a discount:

```text
discounted contribution per renewal
= discounted collected revenue
  - payment fees
  - variable fulfillment/service cost
  - incremental support and offer cost
```

For a downgrade, include lower revenue and lower variable cost. For pause or skip, include avoided fulfillment/service cost, delayed cash, reactivation cost, and the probability of never resuming. Do not count paused or skipped recurring value as collected revenue.

Useful inputs:

- baseline paid-renewal probability for comparable eligible customers;
- offer-exposed and control cohort sizes;
- average recurring amount and currency;
- product gross/contribution margin;
- discount depth and duration;
- payment fees, fulfillment, support, and credit/refund cost;
- later churn and repeat-offer behavior;
- complaint, chargeback, and service-failure guardrails.

An accepted 20% discount can preserve customer count while reducing profit more than the saved relationship contributes. A downgrade can improve lifetime economics when it aligns recurring cost with real use. A pause can reduce costly unwanted fulfillment even if recognized revenue is delayed. Compare the mechanism, not only the immediate top-line value.

## Measure beyond acceptance

![A measurement ladder from eligibility through paid renewal and incremental margin](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/beyond-acceptance.png)

Track:

```text
eligible
→ shown
→ accepted
→ cancellation stopped or undone
→ retained after defined window
→ paid renewal realized
→ incremental contribution margin
```

Core rates:

```text
offer exposure rate
= shown / eligible

acceptance rate
= accepted / shown

observed paid-renewal rate
= customers with qualifying paid renewal / accepted customers reaching observation point

incremental retained lift
= treatment retained rate - valid control retained rate
```

Report unresolved cohorts. A customer accepting a three-cycle discount today cannot have proven post-discount retention tomorrow.

### Current analytics caveat

The current Retention Analytics view can log offer shown and accepted events plus cancellation and undo activity. The staging verification created one synthetic `offer_shown` row and no acceptance.

![Retention Analytics showing one synthetic offer-shown event without acceptance or realized revenue](/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/retention-analytics.png)

The dashboard's operational retained-value figures are not automatically cash collected, incremental lift, or contribution margin. Current event counts can also include multiple events in one journey. Deduplicate and join later paid orders.

ArraySubs does not currently provide a built-in causal holdout engine in the inspected implementation. Use a reviewed randomized or staggered design where feasible. When it is not, document the comparison and avoid causal language.

## Ethical, legal, accessibility, and privacy guardrails

Keep the direct cancellation control prominent and easy to activate. The [FTC's dark-pattern report](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers) identifies obstruction and buried terms as risks. The FTC's 2024 amended negative-option rule was vacated in 2025; use current [FTC materials](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule) and legal counsel rather than citing it as operative.

California's [Business and Professions Code §17602](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=) contains specific requirements for covered online cancellations and conditions for save offers alongside a prominent, continuously available direct-cancel control. Applicability is jurisdiction-specific; obtain counsel.

For accessibility, offer cards and dialogs need programmatic names, terms, selection states, errors, loading/status announcements, keyboard navigation, visible focus, and predictable modal focus. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and the [WAI-ARIA modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) are useful implementation references, not a conformance certificate.

Eligibility rules can expose sensitive inferences about spend or customer value. Apply data minimization, restrict raw cancellation text and value data, and do not display why another customer would receive a different offer.

## Test plan for every offer

## Build an offer policy, not a pile of buttons

An offer portfolio needs a shared policy so two customers in the same situation are treated consistently and the system can explain why an option appeared.

For each offer, maintain a policy record with:

- purpose and target problem;
- eligible products, plans, gateways, statuses, currencies, and countries;
- reason families and additional evidence used;
- minimum tenure, renewal number, recurring value, and remaining days;
- maximum uses per customer/subscription and cooling-off period;
- margin floor and approval owner;
- effective dates and version;
- customer-facing copy and disclosures;
- fallback when the offer cannot be applied;
- event schema and observation window;
- operational, financial, accessibility, privacy, and complaint guardrails.

Version the policy. If a 20%-for-three-cycles discount becomes 10%-for-two, historical outcomes must remain tied to the original terms. If a pause changes from moving the renewal date to simply suspending access, that is a contract change requiring new customer copy and a new test pass.

Do not encode sensitive or discriminatory eligibility without qualified review. Customer value can be a legitimate economic input, but exposing it carelessly can create unfair or confusing treatment. Document which fields are used, who can see them, and how the direct-cancel path remains identical.

### Order offers by problem fit

When more than one offer is eligible, avoid an unbounded menu. Rank by the customer's stated problem and the least disruptive mechanism:

1. Fix a confirmed technical, billing, delivery, or support defect.
2. For temporary timing, offer skip for one cycle or pause for a defined period.
3. For lasting plan mismatch, offer a configured downgrade.
4. For temporary price pressure with positive margin, offer a short transparent discount.
5. If no option fits or the customer declines, continue cancellation immediately.

This order is not universal. A digital service without fulfillment may treat pause differently from a physical subscription. A business-critical product may prioritize support resolution. The principle is to solve the cause with the smallest honest change.

## Watch for adverse selection and gaming

Save offers change customer behavior. If the same discount always appears after “Too expensive,” customers can learn to select that option even when it is not their primary reason. That weakens both margin and reason data.

Monitor:

- repeat cancellation starts by the same subscription/customer;
- offer acceptance near discount expiry;
- repeated use across related subscriptions where policy permits analysis;
- reason changes across repeated journeys;
- customers who accept but cancel before the next paid renewal;
- gateway/product segments that are systematically ineligible;
- support contacts reporting inconsistent treatment;
- paid acquisition campaigns that attract offer-sensitive cohorts.

Countermeasures should remain customer-respectful. Use transparent eligibility and repeat-use limits, develop appropriately priced plans, and improve value rather than making cancellation harder. Do not accuse customers of gaming or hide terms. A pattern can indicate that standard pricing or packaging is misaligned.

### Cannibalization matters

Some customers who accept an offer would have stayed without it. Their discount is not incremental retention; it is cannibalized revenue. A high acceptance rate can therefore coexist with negative incremental margin.

Suppose 100 eligible customers see a three-cycle discount and 40 accept. If 28 would have stayed anyway and only 12 are incremental, applying the full discount cost to all 40 matters. The correct evaluation compares paid renewal and contribution margin with a valid control, including the cost of discounting non-incremental customers. This example is conceptual, not a benchmark.

Pause, skip, and downgrade have analogous effects. A customer might have renewed at full price but accepts a pause offered too aggressively. A downgrade might move a satisfied customer to a cheaper tier. Offer relevance and experiment design protect against giving away value without solving churn.

## Use closed cohorts and maturity dates

Define the observation point before launch. For monthly subscriptions, one paid renewal may show immediate implementation success, while two or three may better indicate durability. For annual plans, waiting a full year may be impractical, so publish intermediate states without calling them final.

For each accepted offer, calculate a maturity date:

- discount: after the relevant discounted cycles and at least the first regular-price renewal;
- pause: after resume and the first paid renewal;
- skip: after the next non-skipped paid renewal;
- downgrade: after the plan change and first paid renewal at the new terms.

Then report cohorts as:

| Cohort state | Meaning | Reporting treatment |
|---|---|---|
| Accepted, not mature | Offer accepted but qualifying outcome cannot yet occur | Open; exclude from closed outcome rate |
| Implementation failed | Offer could not be applied or state diverged | Operational failure, not customer rejection |
| Cancelled before maturity | Relationship ended before qualifying renewal | Closed negative outcome with cause |
| Mature, paid | Qualifying paid renewal occurred | Observed retained outcome |
| Mature, unpaid/terminal | Observation passed without qualifying payment | Closed negative outcome |
| Unknown/data gap | Evidence missing or inconsistent | Report separately; do not assume success |

This prevents recent offers from inflating results. It also separates system reliability from customer response.

## Roll out in stages

Start with one problem, one offer, a narrow eligible population, and a clear rollback condition. For example, a physical-goods merchant might test a one-cycle skip for customers selecting overstock, only where no fulfillment order has been committed and both local and remote billing dates can be changed safely.

Before launch:

1. Freeze the policy and copy version.
2. Verify eligibility on every supported gateway/state combination.
3. Rehearse the customer flow, errors, and direct cancellation.
4. Confirm stored metadata, scheduler actions, provider state, entitlement, fulfillment, email, and analytics.
5. Establish baseline paid renewal, margin, support, refund, and complaint metrics.
6. Define assignment and control or the best credible comparison.
7. Set stop conditions for duplicate charges, incorrect price, missed fulfillment, inaccessible exit, or elevated complaints.

During rollout, review operational proof daily before interpreting retention. An offer with a 60% acceptance rate and a wrong next renewal date is a defect, not a success. Once implementation is stable, wait for cohort maturity and review financial and customer outcomes. Expand only when the mechanism is plausible, terms are honored, and guardrails remain acceptable.

After retirement, leave historical policy metadata intact. Disable future eligibility without erasing which customers received the old terms or how their later renewals should behave.

### Configuration

- disabled/enabled;
- missing and valid reason targets;
- product, value, tenure, remaining-day, and repeat-use boundaries;
- missing and configured downgrade target;
- minimum/maximum duration and amount;
- translations and long labels.

### Subscription/gateway

- manual, Stripe, PayPal, and Paddle as actually configured;
- active, trial, on-hold/paused, waiting cancellation, and failed-payment states;
- local versus remote billing ownership;
- upcoming renewal close to cutoff;
- already-created order or in-flight payment.

### Customer flow

- offer eligible/not eligible;
- accept, decline, close, Back, Escape, refresh;
- keyboard and screen-reader pass;
- mobile, zoom, slow network, error, and double click;
- direct cancellation remains available;
- specific success and failure messages.

### State and later outcome

- metadata and event written once;
- renewal actions aligned;
- remote provider state reconciled;
- entitlement/fulfillment correct;
- notification accurate;
- later paid order uses disclosed terms;
- expiry/resume/next date correct;
- cancellation and repeat-use behavior measured.

## Decision checklist

- [ ] The customer's problem is plausibly addressable by this offer.
- [ ] The offer terms are complete and understandable.
- [ ] A direct cancellation control remains prominent.
- [ ] The gateway and billing owner support the mutation.
- [ ] Stored state and scheduled actions represent the promise.
- [ ] Entitlement, fulfillment, credit, tax, and order effects are defined.
- [ ] Margin floors and repeat-use limits are approved.
- [ ] Errors fall back to clear cancellation rather than blocking it.
- [ ] Accessibility, mobile, translation, and slow-network states are tested.
- [ ] Paid renewals and contribution margin are measured beyond acceptance.
- [ ] Exposure differences by gateway and product are reported.
- [ ] Legal and privacy review covers the live jurisdictions and data.

## Frequently asked questions

### Which subscription save offer works best?

There is no universal winner. Match the problem: temporary price pressure may fit a short discount, temporary timing a pause, one cycle a skip, lasting plan mismatch a downgrade, and no fit a direct cancellation.

### Should every cancelling customer see an offer?

No. Show only relevant, eligible offers. Some customers have clearly decided to leave, some problems need a fix rather than an incentive, and some gateways cannot safely honor the mutation.

### Is a pause the same as a skip?

No. Pause covers a period and can change access, fulfillment, and renewal timing. Skip targets one specific upcoming cycle. The exact system behavior must be defined.

### Is a downgrade just a discount?

No. A discount temporarily changes price while the plan may remain the same. A downgrade changes the product, tier, quantity, frequency, benefits, or other plan terms.

### Does ArraySubs currently offer skip in the cancellation dialog?

Not in the inspected retention-offer admin UI. Skip exists as a standalone subscription action/lifecycle branch, so this comparison treats it as a distinct intervention without claiming current cancellation-offer exposure.

### Do automatic PayPal and Paddle subscriptions currently see the same offers?

No. The inspected capability check currently allows automatic Stripe and manual subscriptions into the offer flow subject to other rules, while automatic PayPal and Paddle exit before offers are assembled.

## Verification environment and limits

This guide was verified on **July 22, 2026** against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, current retention-offer, pause, skip, plan-switching, scheduling, gateway, and analytics source, plus a safe local staging reason-to-offer sequence.

The staging flow showed configured discount and pause options and created one synthetic offer-shown event. No offer was accepted, no subscription changed, no renewal was skipped, no downgrade was completed, and no payment was attempted. No save-rate or revenue-lift claim is made.

Next, review the [effective cancellation flow](/deals/arraysubs/resources/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/), [reason taxonomy](/deals/arraysubs/resources/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/), [pause recipe](/deals/arraysubs/use-cases/recipes/pause-need-a-break/), and [downgrade recipe](/deals/arraysubs/use-cases/recipes/downgrade-offer/).

## Primary sources

- [WooCommerce cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/)
- [Stripe subscription changes](https://docs.stripe.com/billing/subscriptions/change)
- [WooCommerce customer subscription actions](https://woocommerce.com/document/subscriptions/customers-view/suspend-cancel-or-remove-an-item/)
- [WooCommerce subscription statuses](https://woocommerce.com/document/subscriptions/statuses/)
- [FTC report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers)
- [FTC Negative Option Rule](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule)
- [California Business and Professions Code §17602](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## Verification and update log

- **2026-07-22:** Verified current ArraySubs offer controls, gateway boundary, skip/downgrade limitations, scheduling contract, analytics semantics, and safe staging evidence.
- **2026-06-30:** Editorial update date assigned for the initial publication package.
