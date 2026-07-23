# Research notes: How to reduce WooCommerce subscription churn

## Research record

- Content-plan ID: A070
- Planned URL: `/retention-and-churn/how-to-reduce-woocommerce-subscription-churn/`
- Research date: 2026-07-22
- Product source inspected: ArraySubs Free 1.8.11 and ArraySubs Pro 1.1.2 in the current working tree
- Scope: evidence, calculation rules, product truth, and editorial inputs only; this is not an article draft
- Test boundary: source inspection and primary-source research only. No live browser flow, controlled retention experiment, or merchant dataset was analyzed.
- Required article guardrail: do not publish an “average churn rate,” cancellation-reason distribution, or ArraySubs retention lift without a named dataset, sample, period, and method.

### Evidence labels used here

- **Verified product fact**: confirmed in current ArraySubs source.
- **Verified external fact**: supported by a current first-party or institutional source linked at the claim.
- **Recommended framework**: original editorial/operating recommendation, not a product feature.
- **Illustrative example**: invented arithmetic, never a benchmark.
- **Hypothesis**: a testable explanation or intervention, not an established result.

## Research conclusion

The strongest article is a measurement-and-operations guide, not a list of tactics. Its central sequence should be:

```text
define → diagnose → prevent → save → recover → win back → measure incrementality
```

Three distinctions prevent most bad churn advice:

1. **Subscriber-count churn and revenue churn are different.** Losing one high-value subscriber can matter more than several low-value subscribers.
2. **Voluntary and involuntary churn have different triggers and owners.** Cancellation research belongs to product/value/experience work; failed-payment recovery belongs to billing operations.
3. **Offer acceptance is not proven saved revenue.** A customer can accept a pause or discount and still churn before a defined observation window. Incremental lift requires a counterfactual or controlled comparison.

ArraySubs has useful current building blocks in core: configurable cancellation reasons, reason-targeted retention offers, pause, skip, plan switching/downgrade paths, end-of-period cancellation, payment retry/grace lifecycle, and a Retention Analytics event log/dashboard. Pro adds automatic gateway integrations, provider-specific payment updates/sync, failure-audit surfaces, Gateway Health, and wider revenue analytics. The current retention dashboard is operationally useful but must not be treated as a perfect cohort system: its opening-base calculation is a status-history approximation, its reason chart combines scheduled and final cancellation events, and “retained revenue” is recurring value attached to currently live subscriptions after an accepted offer rather than realized incremental revenue.

## External evidence bank

Accessed 2026-07-22. Attach URLs to the claims they support in the eventual article.

| Claim supported | Primary source | Publication note |
|---|---|---|
| Churn definitions vary by product and reporting configuration; the denominator and treatment of new subscribers need to be explicit. Stripe documents configurable subscriber, MRR, and revenue-retention concepts. | [Stripe Billing analytics](https://docs.stripe.com/billing/subscriptions/analytics) | Use for definition discipline, not for an industry benchmark. |
| Failed-payment recovery can combine retries, customer emails, automatic card updates, and analytics. | [Stripe Billing revenue recovery](https://docs.stripe.com/billing/revenue-recovery) | These are Stripe Billing capabilities. Present them as a recovery toolkit taxonomy, not as ArraySubs behavior. |
| Not every decline is retryable. Hard declines or missing payment methods require a payment-method/customer-action path, and event-driven systems should act on the final payment outcome. | [Stripe Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries) | Do not copy Stripe retry counts or schedules into ArraySubs guidance. |
| WooCommerce Subscriptions’ automatic retry system applies to qualifying automatic-renewal gateways and is rule-based. | [WooCommerce: Failed recurring payment retry](https://woocommerce.com/document/subscriptions/failed-payment-retry/) | External architecture reference; ArraySubs has its own defaults and gateway overrides. |
| Subscription status such as “on hold” can have more than one operational cause, including awaiting payment and manual suspension. | [WooCommerce: Subscription statuses](https://woocommerce.com/document/subscriptions/statuses/) | Supports the warning not to classify churn from current status alone. |
| Troubleshooting should begin with a timeline of what was expected and what actually happened. | [WooCommerce: Subscriptions troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/) | Useful for involuntary-churn diagnosis and renewal incidents. |
| Cancellation flows can collect custom reasons, optional details, and reason-targeted offers, while offer outcomes and cancellation responses can be analyzed. | [WooCommerce: Cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/) | This describes a Woo extension. Use it as corroboration for the workflow category, not for ArraySubs specifics or lift. |
| Difficult, confusing, or unnecessarily lengthy cancellation can be a dark pattern. | [US FTC: Report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers) | Ethical design support only; obtain legal review for jurisdiction-specific compliance claims. |

### Evidence boundaries

- No current primary source reviewed here establishes a universal “good” churn rate for WooCommerce subscriptions.
- Stripe metrics are product-specific definitions and may include assumptions unlike ArraySubs’ dashboard. Never combine the two without reconciling formulas.
- A vendor claiming that an offer “reduces churn” is not causal evidence. Require sample, assignment method, observation window, and confidence interval before repeating a percentage.
- The article may recommend experiments, but it must not imply ArraySubs includes an A/B-testing engine.

## Metric dictionary

Choose and publish one convention per report. All examples below use unique subscriptions/customers unless explicitly labelled as events.

### Subscriber or logo churn

Recommended opening-base convention:

```text
subscriber churn rate
= unique subscribers that reached the defined churn state during period
  / subscribers active at the start of period
```

Decisions to disclose:

- Customer versus subscription as the unit.
- Whether trial cancellations count.
- Whether end-of-period cancellation counts when scheduled or when service ends.
- Whether policy/admin cancellations count with voluntary customer cancellation.
- How reactivation within the period is treated.
- Time zone and boundary timestamps.

Stripe documents another subscriber-churn denominator that can include new subscribers during the comparison interval. That is valid if used consistently, but it will not numerically match an opening-base convention. Source: [Stripe Billing analytics](https://docs.stripe.com/billing/subscriptions/analytics).

### Voluntary and involuntary rates

```text
voluntary churn rate
= unique customer-intent cancellations reaching churn state
  / eligible opening subscriber base

involuntary terminal churn rate
= unique subscriptions lost after failed-payment recovery is exhausted
  / eligible opening subscriber base
```

Do not count every first payment failure as churn. It is an incident entering recovery until the terminal policy state or observation window is reached.

### Gross revenue churn

```text
gross revenue churn rate
= (churned recurring revenue + contraction recurring revenue)
  / recurring revenue at start of period
```

Exclude expansion from gross revenue churn. Define whether “recurring revenue” is MRR, normalized ARR, or the actual renewal value due in the period.

### Net revenue churn / net revenue retention

One defensible convention:

```text
net revenue churn rate
= (churned MRR + contraction MRR - expansion MRR - reactivation MRR)
  / starting MRR

net revenue retention
= 1 - net revenue churn rate
```

The reactivation term is a reporting choice. If excluded, say so. Keep tax, shipping, one-time fees, and currency conversion rules explicit.

### Cohort retention

```text
cohort retention at interval n
= starting-cohort subscriptions still in the defined retained state at interval n
  / starting cohort size
```

Build cohorts by acquisition month, first paid renewal, product/plan, initial gateway, or channel. Do not let later acquisitions enter an earlier cohort denominator.

### Failed-payment recovery

```text
first-failure incidence
= unique subscriptions with a first renewal failure during period
  / renewal attempts during period

closed-cohort recovery rate
= failed-renewal cases recovered within the observation window
  / failed-renewal cases with a resolved outcome in that window

terminal loss rate among failed cases
= failed-renewal cases reaching terminal cancellation/loss
  / resolved failed-renewal cases
```

Report unresolved cases separately. A recovery rate calculated while many recent failures are still inside grace/retry time is right-censored and optimistic or unstable.

### Retention-offer funnel

```text
offer acceptance rate = accepted offer events / shown offer events

observed retained rate
= eligible cancellation attempts still retained after a defined window
  / eligible cancellation attempts

incremental retained lift
= retained rate in treatment - retained rate in valid control
```

Offer acceptance is an interaction metric. Observed retained rate is an outcome metric. Incremental retained lift is the causal metric. Do not use these labels interchangeably.

## Verified ArraySubs behavior

### Cancellation and retention controls in core/free

| Verified behavior | Product source | Important limit |
|---|---|---|
| Default cancellation reasons are “Too expensive,” “Not using it enough,” “Found a better alternative,” “Missing features I need,” “Technical issues,” “Just need a temporary break,” and “Other.” The reason is required by default. | `arraysubs/src/functions/settings-helpers.php` | Defaults are a starting codebook, not evidence that these are a merchant’s actual top reasons. |
| The Retention Flow admin page supports custom cancellation reasons and reason-targeted discount, pause, downgrade, and contact-support offer settings. | `arraysubs/src/resources/pages/RetentionFlow/index.jsx`; admin route `#/retention-flow` | A configured offer still must pass subscription, product, customer, gateway, and offer-specific eligibility. |
| Default settings enable retention offers, with discount (20% for three cycles), pause (30 days), and downgrade enabled; skip and contact are disabled. | `arraysubs/src/functions/settings-helpers.php` | These are software defaults, not recommended universal economics. Review margin, product fit, and support capacity before use. |
| Offer conditions can consider subscription age, recurring value, customer total value, remaining days, product restrictions, and selected reason. | `arraysubs/src/Features/CancellationFlow/Services/Hooks.php`; `.../RetentionOfferProcessor.php` | Conditions support targeting; they do not estimate incremental lift. |
| A downgrade offer appears only when the current product/variation has configured downgrade products. It creates a pending switch for application at renewal. | `arraysubs/src/Features/CancellationFlow/Services/RetentionOfferProcessor.php`; plan-switching services | “Enable downgrade” alone is insufficient; the product path must exist. |
| Pause eligibility checks status, maximum pauses, cooldown, and feature settings. Core defaults are 30 days, two lifetime pauses, 30-day cooldown, and customer self-pause off in stored default settings. | `arraysubs/src/functions/settings-helpers.php`; `arraysubs/src/Features/SkipRenewal/Services/PauseManager.php` | The manager has defensive defaults, but public wording should use the settings-store defaults and tell readers to check their saved values. |
| Skip moves the next payment date, keeps the subscription active, reschedules renewal, and records history; defaults are enabled, up to three cycles, two-day cutoff, and customer self-skip on. | `arraysubs/src/Features/SkipRenewal/Services/SkipManager.php`; `.../REST/SkipController.php` | The cancellation-flow skip offer is disabled by default and is separate from the general skip feature. Do not imply the Retention Flow UI exposes every skip setting. |
| Cancellation supports immediate or end-of-period behavior and stores reason, details, actor, and cancellation type. Pending cancellation blocks renewal invoice/payment work. | `arraysubs/src/functions/cancellation-helpers.php`; `arraysubs/src/Features/CancellationFlow/REST/CancellationController.php`; `.../Services/Hooks.php`; `arraysubs/src/Features/RecurringBilling/Services/Hooks.php` | The measurement date must choose “scheduled” or “became cancelled”; counting both double counts one journey. |
| Plan switching supports configured upgrade, downgrade, and crossgrade paths, including at-renewal changes. | `arraysubs/src/Features/PlanSwitching/` | Product links and eligibility must be configured and tested. A generic “downgrade any subscription” claim is false. |

### Gateway-specific retention limits

Core shows offers for manual-renewal subscriptions by default. Automatic subscriptions must opt in through the gateway capability filter. The current Pro matrix enables that flow only where the adapter declares `retention_amount_update`:

| Billing mode | Retention offers shown by current eligibility function | Source |
|---|---|---|
| Manual renewal | Yes | `arraysubs/src/functions/gateway-helpers.php` |
| Stripe automatic | Yes | `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`; `.../Services/Hooks.php` |
| PayPal automatic | No | `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`; `.../Services/Hooks.php` |
| Paddle automatic | No | `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`; `.../Services/Hooks.php` |

Important nuance: current `getAvailableOffers()` exits before assembling **any** offers if the automatic gateway fails this capability check. Therefore the current code hides pause/downgrade/contact offers too, not merely amount-changing discounts, for automatic PayPal/Paddle subscriptions. Do not promise reason-targeted saves uniformly across gateways.

### Failed-payment and recovery behavior

| Verified behavior | Product source | Important limit |
|---|---|---|
| Core retry defaults are enabled, three retries, 24 hours apart; Pro adapters can override. | `arraysubs/src/functions/gateway-helpers.php` | Provider-controlled schedules and hard declines may not follow these defaults. Always check the installed gateway. |
| Core renewal defaults provide three grace days before on-hold and seven more before cancellation. | `arraysubs/src/functions/settings-helpers.php`; lifecycle services | Stored merchant settings can differ. Do not equate on-hold with final churn. |
| Automatic renewal processing includes a pre-retry verification hook intended to detect a successful remote charge before retrying. | `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`; Pro gateway hooks | This reduces duplicate-charge risk but is not a substitute for reconciliation during an incident. |
| Pro coordinates current-gateway payment-method updates and provides gateway-specific mechanisms. | `arraysubspro/src/Features/AutomaticPayments/Services/PaymentMethodCoordinator.php` | It does not migrate a subscriber to another provider. |

### Retention Analytics: what it measures now

The current core feature creates an `arraysubs_retention_logs` table, a WooCommerce Analytics page at `/analytics/arraysubs-retention`, and REST summary/log endpoints.

| Dashboard concept | Current implementation | Interpretation limit |
|---|---|---|
| Total cancellations | Count of `cancelled` event rows in the selected range | Event count; confirm duplicate/event integrity before calling it unique subscribers. |
| Opening base | Current live-status posts created by period start, plus currently cancelled posts whose `post_modified` is after start | Approximation reconstructed from current post status/modified time, not a status snapshot ledger. Reactivations and later modifications can affect it. |
| Churn rate | `cancelled event rows / opening_base` | Operational dashboard metric; not automatically comparable with Stripe or an opening-snapshot warehouse metric. |
| Reason chart | Both `cancelled` and `scheduled_cancel` event rows | One end-of-period cancellation can contribute at schedule time and again at terminal cancellation. Deduplicate by journey/subscription for editorial analysis. |
| Offers shown / accepted | Counts of event rows; acceptance rate is accepted/shown | Repeated journeys can create multiple events. This is not incremental lift. |
| “Retained revenue” | Sum of the recurring amount logged on `offer_accepted` events whose subscriptions are currently active, trial, or on-hold | Current recurring value attached to accepted-offer records, not realized collections, margin, or causal revenue saved. |
| Initiator | Logger can persist an `initiated_by` value | Summary UI does not provide a clean voluntary-versus-involuntary split. |

Product sources: `arraysubs/src/Features/RetentionAnalytics/REST/AnalyticsController.php`, `.../Services/RetentionLogger.php`, and `.../Migrations/CreateRetentionLogsTable.php`.

The feature files contain `@since 1.9.0` annotations while the inspected plugin header is 1.8.11. Treat the working tree as current development source and re-verify the shipped version before publishing availability claims.

## Diagnosis framework

### Segment before acting

Minimum useful cuts:

- acquisition month or first-paid-renewal cohort
- tenure band and renewal number
- product, variation, plan, and billing interval
- starting and ending recurring value
- gateway and billing-clock owner
- voluntary, failed-payment recovery, policy/admin, or technical/unknown trigger
- stated cancellation reason and coded root-cause hypothesis
- offer shown/accepted and 30/60/90-day outcome
- customer geography/currency where material and lawful

Avoid high-cardinality cuts with tiny samples. Report counts alongside rates.

### Diagnostic questions

1. Is the increase in first failures, terminal failed-payment losses, intentional cancellations, policy cancellations, or event/data duplication?
2. Did the opening base or cohort mix change?
3. Is the issue concentrated after trial, at first paid renewal, after a price/plan change, or at a specific tenure?
4. Does a gateway, product, currency, or cart shape dominate?
5. Are reason responses missing or changing because the survey changed?
6. Is an accepted save still active after one and three renewal opportunities?
7. Did a recovery or cancellation-flow change affect customer experience or measurement?

## Intervention matrix

This is a recommended decision framework. Each row contains hypotheses to test, not guaranteed fixes.

| Signal | First investigation | Possible intervention | Success measure | Guardrail |
|---|---|---|---|---|
| “Too expensive” concentrated in otherwise engaged users | Price change, usage, plan fit, competitor, cash-flow timing | Downgrade, billing-frequency alternative, short targeted discount | Incremental retained contribution margin after observation window | Do not discount everyone or obscure future price. |
| “Not using enough” | Activation, product habit, inventory/consumption mismatch | Onboarding, pause, skip, usage reminder, lower-frequency plan | Cohort retention plus usage/renewal outcome | Pause/skip must not silently change entitlement or shipping expectations. |
| Missing feature / poor fit | Product and support evidence | Roadmap communication, correct plan, honest cancel, later win-back | Reduced repeat reason in relevant cohort | Do not promise an uncommitted feature. |
| Technical issues | Support tickets, logs, affected version/gateway | Fix root cause, service recovery, targeted support | Incident recurrence and retained affected cohort | A discount does not repair reliability. |
| First renewal failures rise | Gateway, payment method, decline category, schedule | Retry policy review, update-payment flow, notices, gateway fix | Closed-cohort recovery and terminal-loss rate | Avoid retrying hard declines blindly. |
| End-of-period cancels rise after price/term change | Notice timing, value communication, consent/expectation | Clearer pre-renewal communication, plan choice, downgrade | Cohort revenue retention | Do not add cancellation friction. |
| Offer acceptance rises but churn does not fall | Outcome window, repeated offers, selection bias | Holdout/control, offer redesign, eligibility change | Incremental lift and margin | Acceptance is not the objective. |

## Prioritization model

Use a transparent ranking heuristic, not false precision:

```text
opportunity score
= recurring value affected
  × evidence strength (0–1)
  × addressability assumption (0–1)
  × confidence in intervention (0–1)
  / relative effort and risk
```

The 0–1 inputs are team judgments. Preserve the raw value and written rationale; do not present the resulting score as a financial forecast.

A simpler original table may be better:

| Problem cohort | Affected recurring value | Evidence quality | Customer harm | Intervention fit | Effort/risk | Owner |
|---|---:|---|---|---|---|---|

## 90-day roadmap

### Days 0–30: define and instrument

- Publish the metric dictionary and opening-base convention.
- Choose scheduled-cancel versus terminal-cancel counting and deduplicate journeys.
- Separate first failure, recovery in progress, terminal involuntary loss, customer cancellation, and policy/admin cancellation.
- Audit current cancellation reasons, missing values, “Other” free text, and survey changes.
- Build product/tenure/gateway/cohort cuts.
- Audit saved settings for retry, grace, cancellation, pause, skip, downgrade paths, and gateway eligibility.
- Capture baseline counts and recurring value without making a causal claim.

### Days 31–60: fix the highest-confidence causes

- Correct technical/billing defects before testing incentives.
- Improve payment-update and failed-payment communications for eligible cohorts.
- Map temporary/timing reasons to pause or skip where operationally safe.
- Configure real downgrade products for affordability/fit cohorts.
- Remove misleading or non-actionable reason labels.
- Define ethical offer eligibility, margin floor, duration, and exclusion rules.

### Days 61–90: run measured interventions

- Introduce a holdout or staggered rollout where volume permits.
- Measure offer acceptance, retained status, realized renewals, contribution margin, and support burden separately.
- Review at one and several renewal opportunities, not only immediately after acceptance.
- Promote only interventions with plausible incremental value and acceptable customer impact.
- Feed reason and failure patterns into product, support, pricing, and gateway workstreams.

## Illustrative worked example

Invented data; never label it as an ArraySubs benchmark.

At the start of a month, 1,000 subscriptions are active. During the month:

- 35 reach the defined terminal state after a customer-initiated cancellation.
- 20 have a first renewal failure.
- Of those failed-payment cases, 12 recover within the observation window, five reach terminal loss, and three remain unresolved.

```text
voluntary churn rate = 35 / 1,000 = 3.5%
involuntary terminal churn rate = 5 / 1,000 = 0.5%
combined terminal churn rate = (35 + 5) / 1,000 = 4.0%
first-failure incidence = 20 / renewal attempts (not / opening base)
closed-cohort recovery rate = 12 / (12 + 5) = 70.6%
unresolved failed cases = 3, reported separately
```

If 40 customers saw an offer and 14 accepted:

```text
offer acceptance rate = 14 / 40 = 35%
```

That does not establish 14 incremental saves. Measure their later renewals and compare with an eligible control or credible counterfactual.

## Suggested original tables and examples

1. **Metric dictionary**: name, formula, unit, inclusion/exclusion, source table, reporting clock, owner.
2. **Churn decomposition waterfall**: opening subscribers/MRR → voluntary loss → involuntary terminal loss → contraction → expansion/reactivation → ending state.
3. **Cohort heatmap**: acquisition month by paid-renewal number; use original illustrative data if merchant data cannot be published.
4. **Reason × intervention matrix**: use the matrix above without implying guaranteed effectiveness.
5. **Failed-payment state funnel**: first failure → retry/customer action → recovered/unresolved/terminal.
6. **Offer measurement ladder**: shown → accepted → still active after window → paid renewal realized → incremental margin.
7. **90-day operating plan**: phase, owner, deliverable, metric, risk.

## Screenshot and UI opportunities

### Production screenshot pass — 2026-07-22

The confirmed local staging site was exercised with a synthetic customer/subscription context. Retention Offers were enabled, a cancellation reason was selected, the configured discount and pause alternatives were displayed, and one synthetic `offer_shown` event was recorded in Retention Analytics. No offer was accepted and no subscription was cancelled. The following clean captures were inspected and published in A070:

- `screenshots/live-ui/a070-retention-flow-overview-original.png` → `retention-flow-overview.png`
- `screenshots/live-ui/a074-customer-save-offers-original.png` → `customer-save-offers.png`
- `screenshots/live-ui/a070-retention-analytics-original.png` → `retention-analytics.png`

The screenshot annotation helper could not reliably locate the requested analytics targets, so the clean originals were used without callouts. Captions explicitly limit them to configuration and operational-event evidence; they do not claim causal lift, realized revenue, or a merchant benchmark. The staging records were synthetic and contained no publishable real-customer free text.

| UI | Route / existing asset | What it supports | Caption caveat |
|---|---|---|---|
| Retention Flow overview | ArraySubs admin `#/retention-flow`; `screenshots/live-ui/a070-retention-flow-overview-original.png` | Reasons, requirement setting, and retention-offer configuration | Settings prove availability, not effectiveness. |
| Cancellation reasons section | `screenshots/live-ui/a072-cancellation-reasons-original.png` | Editable reason codebook | Defaults are not a benchmark. |
| Retention Analytics | WooCommerce Analytics path `/analytics/arraysubs-retention` | Operational cancellation and offer event reporting | Dashboard formulas/event semantics need the caveats in this note. |
| Renewal Failure Audit | Existing live UI assets containing `renewal-failure-audit` | Involuntary recovery workstream | A first failure is not terminal churn. Redact customer/order/subscription identifiers. |
| Pause/skip settings or portal action | Current ArraySubs settings/customer portal | Alternatives to cancellation | Eligibility and downstream entitlement/fulfillment effects must be tested. |
| Downgrade product mapping | Product configuration / plan switching UI | Downgrade requires a configured path | Do not imply any arbitrary product can be selected. |

## ArraySubs Free/Pro positioning

### Core/free contribution

- cancellation reason capture and immediate/end-of-period flow
- reason-targeted retention framework
- pause, skip, plan switching, and downgrade scheduling
- retry/grace lifecycle and renewal scheduling
- retention event logs and dashboard

### Pro contribution

- automatic Stripe, PayPal, and Paddle integrations
- gateway-specific payment-method update and remote sync behavior
- Gateway Health and processed webhook evidence
- additional analytics/failure-audit surfaces

### Limits to state

- No built-in causal experimentation/holdout engine was identified.
- Current Retention Analytics does not natively provide a clean voluntary/involuntary split.
- Offer availability is not uniform across automatic gateways.
- “Retained revenue” is not realized incremental revenue.
- Saved merchant settings can differ from code defaults.
- No churn-reduction percentage is supported by this source review.

## Internal-link plan

- Primary feature anchor: `/deals/arraysubs/features/#retention-revenue`
- Companion: `/retention-and-churn/voluntary-vs-involuntary-churn/` (A071)
- Companion: `/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/` (A072)
- Companion: `/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/` (A073)
- Cross-cluster recovery guide: `/payment-recovery/involuntary-churn-recovery-checklist/` (A039)
- Cross-cluster recovery guide: `/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/` (A031)
- Recipe: `/deals/arraysubs/use-cases/recipes/require-reason-targeted-funnel/`
- Recipe: `/deals/arraysubs/use-cases/recipes/pause-need-a-break/`
- Recipe: `/deals/arraysubs/use-cases/recipes/downgrade-offer/`

Do not invent internal slugs. Reconcile against the content plan and published inventory at drafting time.

## Claims to avoid

- “The average WooCommerce subscription churn rate is X%.”
- “ArraySubs reduces churn by X%.”
- “Every accepted offer is a saved customer.”
- “On-hold means involuntary churn.”
- “Every failed payment should be retried.”
- “Discounts are the best retention tactic.”
- “PayPal and Paddle subscribers see the same current retention offers as Stripe/manual subscribers.”
- “The dashboard’s retained revenue is cash collected or incremental revenue.”
- “Cancellation friction improves retention.”

## Refresh triggers

Re-audit when any of these change:

- cancellation and Retention Flow settings/defaults
- gateway `retention_amount_update` eligibility logic
- pause/skip/plan-switching behavior
- retry/grace settings or provider-owned billing behavior
- `RetentionAnalytics/REST/AnalyticsController.php` formulas
- event deduplication or status-history storage
- experimentation/holdout functionality
- Free/Pro version at publication
