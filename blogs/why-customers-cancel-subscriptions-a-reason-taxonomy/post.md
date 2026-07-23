---
title: "Why Customers Cancel Subscriptions: A Reason Taxonomy"
meta_title: "Why Customers Cancel Subscriptions: Reason Taxonomy"
meta_description: "Build a useful subscription cancellation-reason taxonomy across price, value, usage, experience, technical, and life-event causes without confusing stated answers with root cause."
focus_keyphrase: "why customers cancel subscriptions"
published: "2026-03-08"
updated: "2026-07-09"
last_verified: "2026-07-09"
author: "Emran"
---

# Why Customers Cancel Subscriptions: A Reason Taxonomy

Customers cancel subscriptions for reasons that usually fit six broad families: price or affordability, value or plan fit, usage or timing, experience or service, technical reliability, and external life events. Those families are a starting codebook, not a universal ranking. The correct “top reason” for a store can only come from that store's defined sample, time period, response coverage, and coding method.

> **Direct answer:** collect one neutral primary reason and optional detail, preserve the raw answer, map it to a stable versioned code, and treat root cause as a hypothesis that needs product, usage, support, billing, fulfillment, or interview evidence. Keep terminal payment failure, merchant-policy cancellation, and operational loss outside a chart titled “why customers chose to cancel.”

That last distinction matters. “Too expensive” can mean absolute affordability, a price increase, weak perceived value, low use, the wrong tier, an unexpected fee, or temporary cash-flow pressure. The selected answer is valid customer evidence. It is not permission to assume the cause or send the same discount to everyone.

## Key takeaways

- Preserve three layers: raw response, stable analytic code, and evidence-based root-cause hypothesis.
- Use customer-facing options that are short, concrete, and reasonably distinct.
- Keep “Other” and “not provided” visible; they are different quality signals.
- Make free text optional and access controlled because it can contain personal information.
- Version reason sets and maintain a crosswalk instead of rewriting history.
- Deduplicate scheduled and final cancellation events before calculating reason shares.
- Match an intervention to the underlying problem and eligibility—not merely the selected label.
- Measure later paid renewals and margin; offer acceptance is not proof of incremental retention.
- Never publish a reason distribution without the sample, date range, denominator, missingness, and method.

![A respectful cancellation form organizing customer answers into six reason families and supporting evidence](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/featured-image.png)

## Three layers of cancellation evidence

![A three-stage evidence model from raw response to stable code to root-cause hypothesis](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/three-layers-of-evidence.png)

### 1. Raw response

The raw response is what the customer actually saw and selected, plus optional text. Preserve:

- the stable option ID or key;
- the display label shown at the time;
- optional text exactly as submitted, subject to privacy and security controls;
- timestamp and cancellation journey;
- form or reason-set version;
- option order if it changes;
- initiator and immediate/end-of-period type.

Do not normalize the raw record in place. Labels can change, analysts can disagree, and the same visible wording can be interpreted differently later. The original evidence is the audit trail.

### 2. Stable analytic code

The analytic code groups responses consistently enough for trend reporting. It might map “Costs too much,” “The new price is too high,” and a reviewed free-text response into a broad `price_affordability` family with different subcodes.

A useful code is durable, documented, and actionable. Never reuse an old key for a new meaning. When categories change, create a new reason-set version and a crosswalk. Trend only within comparable versions or state how the crosswalk changed the counts.

### 3. Root-cause hypothesis

Root cause is the team's evidence-based explanation. It can join:

- plan, price, discount, and price-change history;
- usage, activation, or outcome signals;
- support contacts and resolution evidence;
- fulfillment, delivery, or inventory context;
- billing and gateway evidence;
- incident, version, or integration history;
- customer interviews or follow-up research with appropriate consent.

Call it a hypothesis until evidence supports it. A customer saying “not using it” does not tell you whether activation failed, cadence is wrong, the need ended, inventory accumulated, or the product never fit.

## A six-family reason taxonomy

![Six voluntary reason families separated from payment failure, policy, and operational loss](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/six-reason-families.png)

This original framework is a practical starting point, not an ArraySubs default and not an industry standard. Validate the labels with your own open text, support conversations, observed behavior, and interviews.

### 1. Price and affordability

**Customer-facing concept:** “It costs too much right now.”

Possible analytic subcodes:

- absolute price;
- price increase;
- temporary cash-flow pressure;
- unexpected fee or billing surprise;
- billing frequency mismatch;
- discount ending.

Evidence to join includes plan and price history, notices, tenure, discounts, billing cadence, and appropriate customer context. Avoid invasive inference about financial circumstances.

Useful hypotheses might be the wrong tier, a temporary constraint, surprise rather than price itself, or insufficient demonstrated value. A transparent configured downgrade or pause may fit some cases. A blanket permanent discount may reward strategic cancellation and damage margin without solving the actual problem.

### 2. Value and fit

**Customer-facing concept:** “It isn't valuable or right for me.”

Possible subcodes:

- desired outcome not met;
- missing capability;
- wrong plan;
- competitor change;
- quality or catalog fit;
- promise mismatch.

Join usage or outcome signals, plan, onboarding, support, feature requests, and customer text. The correct response can be the right plan, accurate education, a genuine fix, or respectful cancellation. Do not promise an uncommitted feature to stop a cancellation.

### 3. Usage and timing

**Customer-facing concept:** “I don't use or need it right now.”

Possible subcodes:

- low usage;
- overstock;
- seasonal need;
- cadence too frequent;
- project ended;
- temporary timing issue;
- recipient or household need changed.

Join product activity, shipment/order cadence, pause or skip history, tenure, and activation milestones. Pause, skip, or lower frequency can be relevant when the need is temporary. A discount does not solve unopened boxes or a service that is not being used.

### 4. Experience and service

**Customer-facing concept:** “The experience or service was poor.”

Possible subcodes:

- support;
- fulfillment or delivery;
- product quality;
- usability;
- communication;
- unresolved complaint.

Join support cases, delivery incidents, order outcomes, refunds, and product evidence. Fix the failure before adding an incentive. “Stay for 20% off” can make a bad experience worse when the underlying service problem remains.

### 5. Technical reliability

**Customer-facing concept:** “Something did not work.”

Possible subcodes:

- login or access;
- integration;
- checkout or billing;
- payment-method update;
- product bug;
- performance;
- data or synchronization failure.

Join logs, incident timeline, gateway context, application version, support evidence, and device/browser only when relevant and handled appropriately. Route the cluster to engineering or billing operations. Repeated retries and generic coupons are not substitutes for diagnosis.

### 6. Life event or external change

**Customer-facing concept:** “My circumstances changed.”

Possible subcodes:

- relocation;
- job or business change;
- health or family circumstance;
- gift or recipient change;
- organization closed;
- project ended;
- other external event.

Minimize sensitive-data collection. Respectful cancellation may be the best response. A pause or consented later win-back can fit some temporary cases, but an exit survey should not pressure customers to disclose private circumstances.

## Keep non-voluntary loss outside the chart

If a chart is titled “Why customers chose to cancel,” exclude journeys where no customer choice was established:

| Class | Example | Why separate |
|---|---|---|
| Terminal payment failure | Renewal recovery exhausted | It is an involuntary outcome, not a stated cancellation reason |
| Merchant policy | Fraud, abuse, eligibility, safety, compliance | The merchant or policy initiated the end |
| Operational/technical loss | Scheduler, gateway, integration, or data failure causes termination | It requires incident remediation |
| Unknown initiator | Actor and first trigger unavailable | A clean guess would create false precision |

Keep these classes in the overall churn system. Just do not mix them into a voluntary-reason distribution. See [voluntary vs involuntary churn](/retention-and-churn/voluntary-vs-involuntary-churn/) for the journey-level classification.

## Design the question before interpreting the answer

[Pew Research Center's survey-question guidance](https://www.pewresearch.org/writing-survey-questions/) explains that open and closed questions can produce different responses, response options should be reasonably exhaustive and mutually exclusive, and wording or order can affect answers. Those are method principles, not evidence about which cancellation reason is most common.

A practical cancellation sequence is:

1. Ask one primary reason with short, neutral options.
2. Provide “Other” with a text opportunity.
3. Offer optional detail: “Anything else you want us to know?”
4. If the reason and other evidence support a genuinely relevant, eligible alternative, present it.
5. Keep a clear decline-and-continue path.
6. Confirm what cancellation changes, when billing ends, and what happens to access or fulfillment.

Avoid double-barreled choices such as “price and quality.” The customer may agree with one half. Avoid leading copy such as “I don't understand the value yet,” which blames the customer. Avoid a long list designed to make cancellation tiring.

[Pew's research on open-ended nonresponse](https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/) supports treating free text as cognitively demanding in some contexts. Make it optional, track missingness, and do not force an essay to create friction. [GOV.UK's user-research guidance](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) also supports starting from user needs rather than treating internal beliefs as facts.

## What the current ArraySubs reason controls prove

The current Retention Flow lets an administrator require a cancellation reason and configure reason entries. The tested staging configuration showed seven defaults: Too expensive, Not using it enough, Found a better alternative, Missing features I need, Technical issues, Just need a temporary break, and Other.

![The ArraySubs cancellation-reason configuration showing editable defaults and a required-reason control](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/cancellation-reasons.png)

Those defaults are examples, not a measured distribution and not a complete universal taxonomy. They map reasonably to several families above, but a merchant should validate wording, stable keys, coverage, and actionability with its own evidence.

The customer portal tested on local staging presented one primary reason and conditional detail for Other before continuing. It did not ask an arbitrary multi-question survey.

![The customer cancellation dialog presenting one primary reason in a safe staging account](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/customer-reason-dialog.png)

The source review also confirmed that cancellation processing can store reason, detail, actor/initiator, type, and timing context, while Retention Analytics event rows can carry reason, offer, product, amount, subscription age, and other operational evidence. That is a useful base for a derived taxonomy, not an automatic root-cause engine.

## Version the reason set

A minimum record should preserve:

| Field | Purpose |
|---|---|
| Cancellation journey ID | Deduplicate request, offer, scheduled, final, and undo events |
| Subscription/customer internal ID | Join context internally; redact from publication |
| Captured and effective-cancel timestamps | Separate intent from terminal outcome |
| Initiator | Customer, administrator, system, gateway, or unknown |
| Reason-set version | Preserve trend comparability |
| Raw code and displayed label | Keep exactly what the customer selected |
| Raw optional text | Qualitative evidence with restricted access |
| Normalized family and subcode | Stable analysis |
| Cancellation type | Immediate or end of period |
| Offer eligibility, shown, accepted | Explain exposure without claiming lift |
| Later retained and paid-renewal outcome | Measure durability |
| Product, plan, tenure, gateway | Segment the result |

Never change the meaning of a stable key. When “not using enough” is split into low usage, cadence, and overstock, create a new reason-set version. Preserve the old label and map it to a broad historic family in a crosswalk. Do not pretend the older data contained distinctions the customer was never offered.

Record `not_provided` separately from `other`. Other is an answer. Not provided is missing response. If the UI requires a reason, still monitor abandoned flows and alternate cancellation routes rather than assuming capture is complete.

## Code optional text responsibly

Free text helps discover missing categories and nuance. It can also contain names, health information, financial details, support accusations, credentials, or other sensitive material. Limit access, establish retention rules, and exclude raw text from public screenshots and broadly distributed exports.

A repeatable coding process:

1. Select a bounded sample with dates, products, and inclusion rules.
2. Remove unnecessary identifiers from the coding view.
3. Have two reviewers independently code an initial subset.
4. Discuss disagreements and refine definitions and examples.
5. Preserve one primary code plus optional contributors.
6. Use “cannot determine” instead of guessing.
7. Monitor Other, not-provided, and uncodable rates.
8. Freeze and version the codebook before comparing trends.

If you claim reviewer agreement, name the statistic, sample, and result. “The coding was consistent” is not a measurement.

### Invented coding examples

| Raw response | Primary family | Possible subcode | Hypothesis | Next evidence |
|---|---|---|---|---|
| “Too much now that the annual price changed” | Price/affordability | Price increase | Notice or value mismatch | Price history, notice timing, use, alternatives |
| “I still have three boxes unopened” | Usage/timing | Overstock | Cadence too frequent | Shipment cadence, skip history, lower frequency |
| “Could never connect it to our CRM” | Technical reliability | Integration | Setup problem or product defect | Support thread, logs, version |
| “My project ended” | Life event/external | Project ended | Need ended temporarily or permanently | Avoid invasive inference; optional pause/win-back |
| “Found another service with the report we need” | Value/fit | Competitor/capability | Product capability gap | Feature need, segment, plan, product evidence |

These examples illustrate method. They are not customer quotes or market prevalence.

## Match reason to evidence and response

![A reason-to-response matrix that routes different problems to different evidence and interventions](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/reason-to-response.png)

| Family | Potentially relevant response | Usually poor response | Outcome to measure |
|---|---|---|---|
| Price/affordability | Configured downgrade, lower frequency, transparent temporary discount, pause | Blanket permanent discount | Later paid renewal and incremental margin |
| Value/fit | Correct plan, honest education, product evidence, respectful exit | Promise an uncommitted feature | Retention plus product signal |
| Usage/timing | Pause, skip, cadence change, activation help | Price cut without solving low use/overstock | Usage/cadence and later renewal |
| Experience/service | Resolve support, delivery, quality, or usability failure | Coupon while the defect remains | Resolution, recurrence, retained cohort |
| Technical | Diagnose and fix; supported workaround or escalation | Generic coupon or blind retries | Defect closure and affected-cohort outcome |
| Life event/external | Respectful cancellation; optional useful pause | Invasive questioning or urgency | Low complaints and consented reactivation |

Reason-targeted offers are hypotheses. Eligibility can also depend on tenure, recurring value, customer history, remaining days, product restrictions, pause limits, configured downgrade targets, and gateway capability.

In the inspected ArraySubs implementation, manual and automatic Stripe subscriptions can enter the current retention-offer flow subject to other rules. Automatic PayPal and Paddle subscriptions fail the current capability check before offers are assembled. Comparing save rates across gateways without accounting for exposure would confuse system eligibility with customer intent.

## Measure reason shares without double counting

```text
deduplicated reason share
= unique eligible cancellation journeys assigned a primary reason
  / unique eligible cancellation journeys with a coded primary reason
```

Also publish:

```text
missing-reason rate
= journeys with no provided reason / all eligible journeys

Other rate
= journeys selecting Other / all reason-provided journeys

uncodable free-text rate
= free-text responses analysts cannot code / free-text responses reviewed
```

The denominator must say whether Other and missing responses are included. A reason share can rise because another reason fell, not because its count increased. Show counts and shares.

### Illustrative distribution-quality example

This is invented data, not a benchmark. Suppose 120 unique voluntary cancellation journeys occur in a month. One hundred have a specific coded reason, 12 select Other, and eight have no reason. The operational reason chart contains 150 rows because some end-of-period journeys have scheduled and final events.

```text
reason-provided rate = 112 / 120 = 93.3%
missing rate = 8 / 120 = 6.7%
Other share among provided reasons = 12 / 112 = 10.7%
```

Deduplicate 150 event rows to 120 journeys before calculating shares. If the category chart uses only 100 specifically coded non-Other answers, disclose that restricted denominator.

### Current analytics boundary

The current Retention Analytics view is useful for operational visibility, but the inspected reasons query can combine `scheduled_cancel` and `cancelled` rows. Empty event reasons can also fall back to current subscription metadata. Event counts are therefore not guaranteed unique journeys or immutable event-time answers.

![Retention Analytics showing operational retention events that require journey deduplication for publication-quality reason shares](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/retention-analytics.png)

The current summary filters by date and product but does not expose a native taxonomy-version, gateway, initiator, subcode, or root-cause analysis layer. Build a version-aware export before publishing a “why customers cancel” report.

## Measure interventions beyond acceptance

The observation ladder is:

```text
reason selected
→ offer eligible
→ offer shown
→ offer accepted
→ cancellation stopped or undone
→ retained after a defined window
→ paid renewal realized
→ incremental contribution margin versus a valid comparison
```

An observed retained rate by reason is descriptive:

```text
observed retained rate for reason r
= eligible reason-r cancellation journeys retained after the window
  / eligible reason-r cancellation journeys
```

It is not causal. Different reasons receive different offers and have different baseline willingness to stay. A causal claim needs a credible control or experimental design:

```text
incremental retained lift
= treatment retained rate - valid control retained rate
```

ArraySubs currently logs operational shown, accepted, cancellation, and undo events. Later paid-renewal, causal, and contribution-margin analysis requires additional work.

## Run a feedback loop

![A weekly, monthly, and quarterly feedback loop for triage, evidence review, and versioned codebook changes](/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/taxonomy-feedback-loop.png)

### Weekly operational triage

- Review new free text needing urgent support, safety, or defect action.
- Look for technical, fulfillment, gateway, product, or version clusters.
- Monitor sudden increases in missing, Other, or abandoned flows.
- Check reason-targeted offers for errors or inappropriate eligibility.

### Monthly product review

- Report deduplicated counts and shares by product, plan, tenure, and renewal number.
- Join usage, support, billing, fulfillment, and price evidence.
- Use privacy-reviewed, de-identified examples only when appropriate.
- Assign the top hypotheses to named owners.
- Review counterexamples and the outcomes of earlier changes.

### Quarterly codebook review

- Merge or split only when actionability and coding reliability justify it.
- Version changes and publish the crosswalk.
- Recode a sample to check consistency.
- Retire unused options without deleting historical meaning.
- Review access and retention for raw text.

Do not change categories every month simply to make the current chart tidier. Stable history is more valuable than cosmetic precision.

## Test the reason form before rollout

A taxonomy can be analytically elegant and still fail in the customer interface. Test the complete cancellation journey with representative products, devices, account states, gateways, and accessibility needs.

First, run comprehension sessions or structured reviews with a small, relevant sample. Ask participants to explain what each option means in their own words, then describe which one they would choose for realistic scenarios. Watch for labels that overlap, blame the customer, contain two ideas, or require knowledge they may not have. “It costs too much” and “I don't get enough value” may be distinct to the team but indistinguishable to some customers; the evidence should decide whether both earn their place.

Next, test coverage. Give reviewers examples drawn from privacy-reviewed open text and support themes. Every example should have a plausible primary option, Other, or a deliberate non-voluntary route. A high Other rate after rollout can mean the list misses an important concept, but a very low rate does not prove quality if customers are forced into the least-wrong choice.

Test the mechanics as well:

- keyboard navigation, visible focus, label association, error messaging, and screen-reader announcement;
- mobile viewport, zoom, long translations, and right-to-left layout where supported;
- required-reason behavior and a clear path after validation errors;
- conditional Other detail without losing the selected reason;
- immediate and end-of-period consequences in plain language;
- direct continuation after declining every offer;
- duplicate-click protection and visible loading for network actions;
- safe recovery from API errors without submitting twice;
- analytics events and stored metadata using the expected stable key and version;
- privacy treatment of optional text in logs, exports, support tools, and screenshots.

Do not infer legal compliance from a usability check. Cancellation requirements vary by jurisdiction and channel. Have qualified counsel review the live flow, disclosures, consent, record retention, and any incentive or survey practice relevant to the business.

### Establish rollout guardrails

Before enabling a new reason set, record:

- effective date and time;
- included products, locales, and customer segments;
- old and new reason-set versions;
- crosswalk owner;
- expected event and journey counts;
- rollback condition;
- support escalation route;
- analytics validation query;
- date of the first quality review.

For the first week, compare cancellation starts, completed cancellations, abandonment, errors, Other, missing data, and support contacts with the previous experience. A sudden decrease in completed cancellation can be a tracking failure or obstructive UX, not a retention success. A sudden increase in one reason can reflect its position or wording rather than a real market change.

## Protect analysis from common interpretation errors

Reason data is observational and selected at a stressful decision point. Use it as a prioritization signal with explicit limits.

**Selection bias:** only customers who reach and complete the form can answer. People who contact support, dispute a charge, let payment fail, or leave through another route may differ.

**Availability and recency:** a recent outage, delivery problem, or price email can dominate the answer even when several factors contributed.

**Option effects:** customers can only select concepts the form offers. Adding a competitor option can make competitor responses rise without any underlying change.

**Incentive effects:** if customers learn that one answer reveals a discount, the selected reason can become strategic. Keep the form honest and consider how offer rules affect measurement.

**Survivorship and maturity:** newer products and cohorts may not have had time to reach the same renewal or cancellation moments.

**Small segments:** a 50% share based on two journeys is not equivalent to a 30% share based on hundreds. Always publish counts and suppress or combine segments when privacy or stability requires it.

**Joined-data overreach:** usage, ticket, and billing correlations do not prove that one caused the cancellation. Document hypotheses and test changes prospectively where feasible.

Use a short interpretation note under every chart: what population it covers, what it excludes, how journeys were deduplicated, which reason-set version applies, and how missing or Other responses were handled. That note often prevents more bad decisions than another layer of visual polish.

## Publication checklist

- [ ] The population, products, date range, and cancellation state are named.
- [ ] Customer-initiated journeys are separated from payment failure, policy, technical, and unknown loss.
- [ ] Scheduled, final, and undo events are deduplicated.
- [ ] Raw answer, analytic code, and root-cause hypothesis remain separate.
- [ ] Reason-set version and historical crosswalk are available.
- [ ] Other, missing, and uncodable rates are visible.
- [ ] Counts accompany shares and small segments are protected.
- [ ] Free text is optional, restricted, and removed from public evidence.
- [ ] Reason-to-offer eligibility differences are documented.
- [ ] Later paid renewals and margin are separated from offer acceptance.
- [ ] No “top reason” claim is made without a named sample and method.
- [ ] Customer cancellation remains clear and unobstructed.

## Frequently asked questions

### What is the most common reason customers cancel subscriptions?

This guide does not claim a universal winner. Determine it from your own deduplicated customer-initiated journeys with a defined period, denominator, missingness, and codebook.

### Is “too expensive” a root cause?

It is a valid stated reason. Root cause might involve affordability, value, low use, the wrong tier, surprise, or temporary cash flow. Join evidence before selecting an intervention.

### Should cancellation reasons be required?

A required single reason can improve completeness, but it does not guarantee accuracy. Keep the list neutral and brief, include Other with text, track abandonment and alternate routes, and obtain legal and UX review.

### Should free text be required?

Usually no. It adds burden and can collect sensitive information. Make it optional, explain its use where appropriate, control access, and monitor response quality.

### Can I compare reasons before and after changing the list?

Only with a documented version and crosswalk. Preserve old codes and labels. Do not imply that historical responses contained distinctions that were unavailable then.

### Does ArraySubs automatically identify root cause?

No. It can capture reasons and useful lifecycle/retention evidence. A merchant still needs a deduplicated, versioned analytic layer and joined operational evidence.

## Verification environment and limits

This guide was verified during its latest update against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, the current cancellation and Retention Analytics source, and a safe local staging cancellation sequence. The staging flow showed configured reasons, one primary selection, optional Other detail behavior, relevant save offers, and one synthetic `offer_shown` analytics event.

No real-customer dataset, interview, reason distribution, controlled experiment, offer acceptance, or cancellation was used. The six-family taxonomy and codebook practices are original editorial recommendations and require validation, privacy review, and appropriate legal review in the merchant's context.

Next, review the [effective cancellation flow guide](/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/), compare [subscription save offers](/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/), or explore [reason-targeted retention features](/deals/arraysubs/features/#retention-revenue).

## Primary sources

- [Pew Research Center: Writing survey questions](https://www.pewresearch.org/writing-survey-questions/)
- [Pew Research Center: Why some open-ended questions get higher nonresponse](https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/)
- [GOV.UK Service Manual: Start by learning user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)
- [WooCommerce cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/)
- [FTC report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers)

## Verification and update log

- **2026-07-22:** Verified ArraySubs reason controls, customer staging flow, analytics behavior, offer-eligibility boundary, and current source evidence.
- **2026-07-09:** Editorial update date assigned for the initial publication package.
