# Research notes: Why customers cancel subscriptions — a reason taxonomy

## Research record

- Content-plan ID: A072
- Planned URL: `/deals/arraysubs/resources/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/`
- Research date: 2026-07-22
- Product source inspected: ArraySubs Free 1.8.11 and ArraySubs Pro 1.1.2 in the current working tree
- Scope: evidence, taxonomy, coding method, product truth, and editorial inputs only; this is not an article draft
- Test boundary: source inspection and primary-source research only. No merchant cancellation dataset, customer interview, or live form test was conducted.
- Required article guardrail: do not publish a reason distribution or “top cancellation reason” without a named sample, date range, missing-response rate, and coding method.

## Research conclusion

A useful cancellation taxonomy needs three layers:

1. **Raw response**: the exact selected option and optional customer text at the time of cancellation.
2. **Stable analytic code**: a versioned, durable category/subcategory used for trend reporting.
3. **Root-cause hypothesis**: the team’s evidence-based explanation after joining product usage, support, billing, fulfillment, gateway, and tenure context.

These layers must not overwrite one another. “Too expensive” is a valid stated reason, but the underlying cause could be affordability, weak perceived value, wrong plan, low usage, a competitor, an unexpected fee, or a temporary cash-flow issue. The appropriate intervention changes with that context.

The planned article should use six broad customer-facing families from the brief—price, value, usage, experience, technical, and life event—then show optional subcodes. It should also keep business/policy cancellations and payment-failure terminal loss outside the customer voluntary-reason distribution. “Other” and “not provided” must remain visible quality categories, not be silently discarded.

ArraySubs core already provides a practical base: editable cancellation reasons, required-reason control, optional details, reason-targeted retention offers, stored cancellation metadata, and Retention Analytics. Current defaults are examples, not benchmark evidence. The current reason chart counts both scheduled and terminal cancellation events, so article-grade distributions should deduplicate one cancellation journey before calculating shares.

## External evidence bank

Accessed 2026-07-22. Keep source links adjacent to the claims they support.

| Claim supported | Primary/institutional source | Editorial use |
|---|---|---|
| Open- and closed-ended questions can produce different responses. Pilot open-ended questions when building response choices; closed response sets should be reasonably exhaustive and mutually exclusive. | [Pew Research Center: Writing survey questions](https://www.pewresearch.org/writing-survey-questions/) | Strong support for discovering categories before freezing the codebook. |
| Response-option order, wording, and asking more than one concept can bias answers. Questions should use simple, concrete language and one idea at a time. | [Pew Research Center: Writing survey questions](https://www.pewresearch.org/writing-survey-questions/) | Supports short labels, randomized/rotated options where technically feasible, and avoiding “price and quality” in one option. |
| Open-ended questions can have higher nonresponse depending on cognitive burden and placement. | [Pew Research Center: Why some open-ended questions get higher nonresponse](https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/) | Supports making free text optional and tracking missingness rather than forcing an essay. |
| User research should start with user problems/needs; unvalidated team beliefs should be treated as assumptions. | [GOV.UK Service Manual: Start by learning user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) | Supports the distinction between stated reason and root-cause hypothesis. |
| Cancellation flows can expose custom reason choices, optional details, reason-targeted offers, and analytics. | [WooCommerce: Cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/) | Workflow corroboration only; it describes a Woo extension, not ArraySubs behavior. |
| Making cancellation difficult, confusing, or unnecessarily lengthy is associated with dark-pattern risk. | [US FTC: Report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers) | Ethical design support. Obtain legal review for jurisdiction-specific requirements. |

### Source-use cautions

- Survey-method sources support instrument design; they do not establish the prevalence of any cancellation reason.
- WooCommerce’s extension page is a first-party product description, not evidence that a particular offer saves a particular percentage of customers.
- Do not treat a customer’s selected option as a diagnosis. Use it to prioritize follow-up evidence.
- Do not force free text or additional questions solely to create friction in cancellation.

## Recommended taxonomy

This is an original codebook proposal for the article. It is not an ArraySubs default or an industry standard. Merchant teams should validate labels with their own open text, support conversations, product behavior, and customer interviews.

### Six customer-facing families

| Stable family code | Customer-facing concept | Suggested subcodes | Evidence to join | Common but unproven hypotheses |
|---|---|---|---|---|
| `price_affordability` | “It costs too much right now” | absolute_price, price_increase, cash_flow, unexpected_fee, billing_frequency | plan price/history, notices, tenure, discounts, household/business context only when ethically available | Wrong tier, temporary cash constraint, surprise rather than price itself |
| `value_fit` | “It is not valuable/right for me” | outcome_not_met, missing_capability, wrong_plan, competitor, quality_fit | usage/outcome signals, product/plan, support, feature requests, competitor free text | Onboarding failure, promise mismatch, product gap |
| `usage_timing` | “I am not using or need it now” | low_usage, overstock, seasonal, timing, frequency, project_ended | usage or fulfillment cadence, order history, pause/skip history, tenure | Wrong cadence, activation gap, temporary pause need |
| `experience_service` | “The experience/service was poor” | support, fulfillment, delivery, quality, usability, communication | tickets, delivery/order incidents, CSAT if methodologically valid, UI journey | Repeated friction, unresolved service failure |
| `technical_reliability` | “Something did not work” | login_access, integration, checkout_billing, bugs, performance, payment_update | logs, incident timeline, gateway context, version, device/browser where appropriate | Product defect, gateway/scheduler issue, failed remediation |
| `life_event_external` | “My circumstances changed” | relocation, health, job_change, business_closed, gift_ended, recipient_change, other_external | usually customer text/interview; minimize sensitive data | Non-addressable now but possibly eligible for pause/win-back |

### Analytic subcodes worth retaining

The customer need not see every subcode. Analysts may code optional free text into:

- `competitor_change`
- `billing_trust_surprise`
- `plan_term_mismatch`
- `fulfillment_inventory`
- `support_resolution`
- `privacy_trust`
- `content_catalog_exhausted`
- `not_authorized_or_duplicate`

Only add a subcode when it is actionable, can be applied consistently, and has enough volume to justify maintenance.

### Non-voluntary classes outside the distribution

Keep these in the overall churn system but outside a chart titled “why customers chose to cancel”:

| Class | Example | Why separate |
|---|---|---|
| `payment_failure_terminal` | recovery exhausted after failed renewal | No customer cancellation choice is established. |
| `merchant_policy` | fraud, abuse, service eligibility, compliance | Merchant/system initiated. |
| `operational_technical_loss` | scheduler/gateway/data failure leads to termination | Needs incident remediation, not a reason-targeted offer. |
| `unknown_initiator` | actor and first trigger unavailable | Prevents false precision. |

## Survey and capture design

### Recommended cancellation form sequence

1. Ask one primary reason using short, concrete, mutually distinguishable options.
2. Offer optional free text: “Anything else you want us to know?”
3. If the selected reason maps to a genuinely relevant eligible alternative, present one or a small number of offers.
4. Preserve a clear “continue cancellation” path.
5. Confirm immediate versus end-of-period effect and what happens to access, billing, or fulfillment.

Do not ask price **and** quality in one response option. Do not present “Other” without a free-text opportunity. Do not turn the survey into a support intake form or lengthy exit interview.

### Code stability rules

- Store a stable machine code separately from the display label.
- Never reuse an old code for a different meaning.
- Version the reason set with effective timestamps.
- Preserve the raw selected code/label and raw free text as captured.
- Map old codes to the new taxonomy in a separate crosswalk; do not rewrite historical responses.
- Record `not_provided` separately from `other`.
- Record survey/form version and option order if it changes.
- Limit access to raw free text because it may contain sensitive personal data.

### Minimal record schema

| Field | Purpose |
|---|---|
| cancellation journey ID | deduplicate schedule/final/undo events |
| subscription/customer internal ID | join context; redact from publication |
| captured at / effective cancel at | distinguish intent from terminal outcome |
| initiator | customer, admin, system, gateway, unknown |
| reason-set version | trend comparability |
| raw reason code and label | preserve what was shown/selected |
| raw optional text | qualitative evidence; access controlled |
| normalized family/subcode | stable analysis |
| cancellation type | immediate/end of period |
| offer shown/accepted | funnel analysis, not proof of lift |
| 30/60/90-day or renewal outcome | whether relationship remained/recovered |
| product, plan, tenure, gateway | segmentation |

## Coding open text

Recommended method:

1. Pull a bounded sample for a defined period and product scope.
2. Remove unnecessary personal identifiers from the coding view.
3. Two reviewers independently code an initial subset using the draft codebook.
4. Discuss disagreements and clarify definitions/examples.
5. Preserve one primary code and optional contributing codes.
6. Track “cannot determine” rather than guessing.
7. Review `other`, `not_provided`, and uncodable rates monthly while iterating.
8. Freeze/version the codebook before trend comparison.

If reporting inter-rater agreement, state the statistic and sample. Do not claim “high agreement” without measuring it.

### Example coding table

All examples are invented.

| Raw response | Primary family | Subcode | Root-cause hypothesis | Next evidence |
|---|---|---|---|---|
| “Too much now that the annual price changed” | price_affordability | price_increase | notice/value mismatch | price history, notice timing, usage, plan alternatives |
| “I still have three boxes unopened” | usage_timing | overstock | cadence too frequent | shipment cadence, skip history, lower-frequency plan |
| “Could never connect it to our CRM” | technical_reliability | integration | integration defect or setup failure | support thread, logs, product version |
| “My project ended” | life_event_external | project_ended | temporary or permanent need ended | no invasive inference; optionally offer pause/win-back consent |
| “Found X and it has the report we need” | value_fit | competitor | capability gap | requested feature, segment, plan used |

## Verified ArraySubs behavior

### Reason capture and storage

| Verified behavior | Product source | Editorial consequence |
|---|---|---|
| Current default reasons are “Too expensive,” “Not using it enough,” “Found a better alternative,” “Missing features I need,” “Technical issues,” “Just need a temporary break,” and “Other.” | `arraysubs/src/functions/settings-helpers.php` | These map reasonably to the proposed families but are software defaults, not a measured taxonomy. |
| Default cancellation settings require a reason and allow reasons to be configured as objects containing `id`, `key`, and `label`. | `arraysubs/src/functions/settings-helpers.php`; `arraysubs/src/resources/pages/RetentionFlow/index.jsx` | Preserve stable IDs/keys while refining labels. Verify UI behavior before changing existing production codes. |
| Cancellation REST routes expose reasons and cancellation configuration and accept cancellation reason/details subject to authentication/ownership or admin permissions. | `arraysubs/src/Features/CancellationFlow/REST/CancellationController.php` | Supports customer/admin capture, but the public article should not expose endpoint or internal-ID details unnecessarily. |
| Cancellation processing stores reason and details with the subscription and tracks cancellation actor/type. | `arraysubs/src/functions/cancellation-helpers.php`; `arraysubs/src/Features/CancellationFlow/REST/CancellationController.php` | This is the base for raw evidence and journey classification. |
| Retention logger stores reason, optional reason details, initiator, product, recurring amount, age, payments, and offer context in event rows. | `arraysubs/src/Features/RetentionAnalytics/Services/RetentionLogger.php`; `arraysubs/src/Features/RetentionAnalytics/Migrations/CreateRetentionLogsTable.php` | This can support segmentation, but event rows need deduplication and privacy controls. |

### Reason-targeted offers

| Verified behavior | Product source | Limit |
|---|---|---|
| Discount, pause, downgrade, and contact-support settings can target selected reasons. | `arraysubs/src/resources/pages/RetentionFlow/index.jsx`; `arraysubs/src/Features/CancellationFlow/Services/Hooks.php` | Matching a reason to an offer does not prove relevance or effectiveness. |
| Offer eligibility can also consider age, recurring value, customer value, remaining days, product restrictions, pause limits, and configured downgrade products. | `arraysubs/src/Features/CancellationFlow/Services/RetentionOfferProcessor.php` | The article should explain “reason is one input,” not “reason alone selects the offer.” |
| Default stored settings enable discount, pause, and downgrade; skip/contact are disabled. | `arraysubs/src/functions/settings-helpers.php` | Defaults are not recommended economics. |
| Automatic gateway eligibility currently allows the retention flow for Stripe but not automatic PayPal/Paddle; manual subscriptions are supported. | core `gateway-helpers.php`; Pro `AutomaticPayments/Services/Hooks.php` and gateway capability files | Reason-to-offer performance cannot be compared across gateways without accounting for exposure/eligibility. |

### Current analytics caveats

From `arraysubs/src/Features/RetentionAnalytics/REST/AnalyticsController.php`:

- The reason chart selects both `scheduled_cancel` and `cancelled` rows. One end-of-period journey can appear twice.
- Empty event reasons fall back to current subscription metadata, which can differ from immutable event-time evidence if later changed.
- Missing reasons are labelled `not_provided`.
- Counts are event-row counts, not guaranteed unique cancellation journeys.
- Summary filters support date and product, but no native taxonomy version, gateway, initiator, subcode, or root-cause filter is exposed in this controller.

Therefore an article screenshot can demonstrate operational visibility, but any published distribution should be created from a deduplicated, version-aware export. Do not reproduce live customer free text.

The feature files carry `@since 1.9.0` annotations while the inspected plugin header is 1.8.11. Re-verify release packaging/version before describing public availability.

## Reason-to-intervention mapping

This is a hypothesis matrix for editorial use. Each intervention needs eligibility, customer clarity, an observation window, and margin/operational review.

| Family | Useful response | Usually poor response | Outcome to measure |
|---|---|---|---|
| Price/affordability | configured downgrade, lower frequency, short transparent discount, pause for temporary cash flow | blanket permanent discount | incremental retained margin and later paid renewals |
| Value/fit | correct plan, relevant feature education, honest support, cancellation and later win-back | promise uncommitted features | cohort retention plus product/support signal |
| Usage/timing | pause, skip, cadence change, onboarding/usage help | discount without solving overstock/low use | usage/cadence outcome and later renewal |
| Experience/service | resolve support, delivery, quality, or usability defect | “stay for 20% off” while defect persists | incident recurrence, satisfaction evidence, retained cohort |
| Technical/reliability | diagnose/fix; provide supported workaround or support escalation | repeated retries or generic coupon | defect closure and affected-cohort outcome |
| Life event/external | respectful cancellation, pause when genuinely useful, consented win-back timing | invasive questioning or urgency | low complaint rate, optional reactivation later |

### Offer measurement ladder

```text
reason selected
→ offer eligible
→ offer shown
→ offer accepted
→ cancellation stopped/undone
→ subscription retained after defined window
→ paid renewal realized
→ incremental contribution margin versus control
```

ArraySubs currently logs shown/accepted/cancel/undo events. The later causal and margin steps require additional analysis.

## Reason distribution formulas

### Deduplicated reason share

```text
reason share
= unique eligible cancellation journeys assigned primary reason
  / unique eligible cancellation journeys with a coded primary reason
```

Also publish:

```text
missing-reason rate
= journeys with no provided reason / all eligible journeys

other rate
= journeys selecting Other / all reason-provided journeys

uncodable free-text rate
= free-text responses analysts cannot code / free-text responses coded
```

Do not silently remove “Other” or missing responses from a chart. If the denominator excludes them, say so.

### Save outcome by reason

```text
observed retained rate for reason r
= eligible reason-r cancellation journeys still retained after window
  / eligible reason-r cancellation journeys
```

This is observational. Different reasons receive different offers and have different baseline propensity. For causal claims:

```text
incremental retained lift for reason r
= treatment retained rate - valid control retained rate
```

### Trend comparison

Compare only within a stable taxonomy version or publish a documented crosswalk. Show counts, shares, missingness, and reason-set changes. A share can rise merely because another reason falls.

## Illustrative distribution example

Invented data; do not call it a benchmark.

Suppose 120 unique voluntary cancellation journeys occur in a month:

- 100 have a coded reason.
- 12 select Other.
- Eight provide no reason.
- The reason chart contains 150 event rows because some end-of-period journeys have both scheduled and final events.

Correct reporting:

```text
reason-provided rate = 112 / 120 = 93.3%  (includes Other)
missing rate = 8 / 120 = 6.7%
Other share among provided reasons = 12 / 112 = 10.7%
```

Before calculating category shares, deduplicate the 150 event rows to 120 journeys. If only the 100 specifically coded non-Other responses are used as the chart denominator, state that exclusion prominently.

## Feedback loop

### Weekly operational review

- new free text needing urgent support or defect triage
- technical/fulfillment clusters by product/version/gateway
- sudden missing/Other increase indicating survey problems
- reason-targeted offers with errors or inappropriate eligibility

### Monthly product review

- deduplicated counts/shares by product, tenure, and plan
- example verbatims with identifiers removed and consent/privacy policy respected
- joined support/usage/billing evidence
- top hypotheses and owners
- outcome of prior changes, including counterexamples

### Quarterly codebook review

- merge/split only when actionability and coding reliability justify it
- version changes and publish crosswalk
- re-code a sample for consistency
- retire unused options without deleting history
- review data minimization and retention for raw text

## Suggested original tables and visuals

1. **Three-layer evidence diagram**: raw response → stable code → root-cause hypothesis/evidence.
2. **Six-family taxonomy table**: use the proposed table above.
3. **Reason-to-intervention matrix**: include “usually poor response” so it does not read like automatic coupon routing.
4. **Reason record schema**: shows why code/version/initiator/outcome matter.
5. **Coding example table**: invented responses mapped to primary/subcode and next evidence.
6. **Distribution quality panel**: unique journeys, event rows, response rate, Other rate, uncodable rate, taxonomy version.
7. **Feedback loop**: weekly operations → monthly product review → quarterly codebook change.

## Screenshot and UI opportunities

No new screenshot was captured. Verify the current UI and remove customer data before reusing repository assets.

| UI | Route / existing asset | What it proves | Caption caveat |
|---|---|---|---|
| Cancellation reasons | ArraySubs `#/retention-flow`; `screenshots/live-ui/a072-cancellation-reasons-original.png` | Reasons are editable and can be required | Defaults are configuration, not empirical prevalence. |
| Retention offer controls | `screenshots/live-ui/a074-retention-offer-controls-original.png` | Offers can target selected reasons | Eligibility and gateway support vary; settings do not prove lift. |
| Retention Analytics reason chart | Woo Analytics `/analytics/arraysubs-retention` | Reason events can be summarized | Current chart combines scheduled and final events; deduplicate for publication. |
| Subscription cancellation detail | Subscription detail page | Stored reason/type/actor context | Redact IDs, names, email, free text, and payment details. |
| Cancellation portal flow | Customer portal | Customer-facing wording/order | Only capture in a safe test account; preserve an unobstructed cancel path. |

## Internal-link plan

- Primary feature anchor: `/deals/arraysubs/features/#retention-revenue`
- Pillar: `/deals/arraysubs/resources/retention-and-churn/how-to-reduce-woocommerce-subscription-churn/` (A070)
- Explainer: `/deals/arraysubs/resources/retention-and-churn/voluntary-vs-involuntary-churn/` (A071)
- Related: `/deals/arraysubs/resources/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/` (A073)
- Related: `/deals/arraysubs/resources/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/` (A074)
- Recipe: `/deals/arraysubs/use-cases/recipes/require-reason-targeted-funnel/`
- Recipe: `/deals/arraysubs/use-cases/recipes/pause-need-a-break/`
- Recipe: `/deals/arraysubs/use-cases/recipes/downgrade-offer/`

## Claims to avoid

- “Most customers cancel because of price.”
- “The seven ArraySubs defaults are the universal cancellation taxonomy.”
- “A selected reason is the root cause.”
- “Other responses are noise.”
- “Required reason means every response is high quality.”
- “The current reason chart equals unique customers.”
- “Reason-targeted offers are available equally to every gateway.”
- “A discount is the correct response to every price reason.”
- “This intervention reduces churn by X%” without a valid study.
- Any live customer quote or free text without privacy review and appropriate permission.

## Claims requiring live/data verification

- Current customer-facing order and wording of reason options.
- How custom reason IDs/keys behave when edited, reordered, or removed in the current UI.
- Whether optional detail text is requested for every reason or conditionally.
- Exact reason/offer UI shown for manual, Stripe, PayPal, and Paddle subscriptions.
- Repeated cancellation/undo/reschedule event behavior in Retention Analytics.
- Privacy/data-retention handling for cancellation free text in the deployed environment.

## Refresh triggers

Re-audit this note when any of these change:

- default reason set or Retention Flow form
- reason IDs/keys/versioning behavior
- cancellation metadata and retention log schema
- reason chart deduplication/filter logic
- gateway retention-offer eligibility
- a built-in survey version/codebook feature
- ArraySubs Free/Pro version at publication
- material survey-method guidance used in the draft
