# Research notes: Voluntary vs involuntary churn

## Research record

- Content-plan ID: A071
- Planned URL: `/retention-and-churn/voluntary-vs-involuntary-churn/`
- Research date: 2026-07-22
- Product source inspected: ArraySubs Free 1.8.11 and ArraySubs Pro 1.1.2 in the current working tree
- Scope: evidence and editorial inputs only; this is not an article draft
- Test boundary: source inspection and current primary-source research only. No live customer, gateway, or failure-recovery flow was run.
- Required article guardrail: cancellation operations and failed-payment recovery are separate systems. A first decline is not yet churn, and an `on-hold` status is not by itself proof of involuntary churn.

## Research conclusion

The article should classify churn by the **trigger and completed outcome**, not by the subscription’s current status alone.

- **Voluntary churn**: the customer intentionally ends the paid relationship. Evidence may include a customer cancellation action, reason, actor, and an end-of-period or immediate cancellation that reaches the reporting churn state.
- **Involuntary churn**: the paid relationship ends after an unintentional billing failure is not recovered within the defined retry/grace/observation policy.
- **Business/policy-initiated loss**: the merchant, fraud/risk policy, service eligibility, compliance process, or support team ends the relationship. Keep this separate rather than forcing it into “voluntary.”
- **Operational/technical loss**: gateway, integration, scheduler, webhook, or data failure is the primary trigger. This may become involuntary terminal churn, but the technical cause should remain available as a contributing code.
- **Recovery in progress**: a failed renewal is still being retried, awaiting payment-method update, or inside grace. It is not terminal churn.
- **Unknown/mixed**: evidence is insufficient or multiple causes contributed. Preserve a primary trigger plus contributing factors.

ArraySubs currently supplies useful evidence for these classes—cancellation reason/type/actor, status transitions, renewal/failure records, retries, grace periods, gateway context, and event logs—but its Retention Analytics summary does not natively produce a clean voluntary-versus-involuntary split. An accurate report needs a derived classification layer or export that links cancellation journeys with renewal orders, failure outcomes, initiator, and the terminal state.

## External evidence bank

Accessed 2026-07-22. Keep source links adjacent to claims in the eventual article.

| Claim supported | Primary source | Editorial use |
|---|---|---|
| Subscription metrics require explicit definitions; churn and subscriber metrics can use different configurable rules and denominators. | [Stripe Billing analytics](https://docs.stripe.com/billing/subscriptions/analytics) | Supports publishing a metric dictionary rather than presenting one universal formula. |
| Failed-payment recovery can involve retry logic, customer notifications, and payment-method updates. | [Stripe Billing revenue recovery](https://docs.stripe.com/billing/revenue-recovery) | Taxonomy support only; these are Stripe Billing features, not a statement of ArraySubs behavior. |
| Hard declines and missing payment methods do not become recoverable merely through repeated retries; some cases require customer action. | [Stripe Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries) | Supports separating failure classification from retry count. Do not import Stripe schedules into ArraySubs. |
| WooCommerce’s failed-payment retry feature is rule-based and applies to qualifying automatic-renewal gateway flows. | [WooCommerce: Failed recurring payment retry](https://woocommerce.com/document/subscriptions/failed-payment-retry/) | Recurring-payment architecture context, not ArraySubs-specific defaults. |
| “On hold” may mean awaiting payment or a manual suspension, so status alone is ambiguous. | [WooCommerce: Subscription statuses](https://woocommerce.com/document/subscriptions/statuses/) | Critical evidence for the article’s classification guardrail. |
| A renewal investigation should establish a timeline of expected and actual events and inspect gateway/scheduler evidence. | [WooCommerce: Subscriptions troubleshooting framework](https://woocommerce.com/document/subscriptions/troubleshooting-framework/); [WooCommerce Subscriptions health check](https://woocommerce.com/document/woocommerce-subscriptions-health-check/) | Supports evidence-based classification of technical versus customer-payment failures. |
| Cancellation surveys can collect reasons and target offers, while payment recovery is a separate workflow. | [WooCommerce: Cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/) | Use to keep cancellation intent and payment failure operationally distinct. |

### Source-use cautions

- Stripe and WooCommerce define behavior in their own products. Their pages establish concepts, not current ArraySubs implementation details.
- Do not cite decline-code prevalence or recovery percentages from a processor as a benchmark for WooCommerce merchants.
- Do not label a customer “voluntary churn” merely because they eventually cancelled after repeated technical/payment failures. Preserve the first trigger and contributing causes.

## Recommended classification model

This is an original framework for the article, not a built-in ArraySubs report.

### Required fields

| Field | Why it matters | Example values |
|---|---|---|
| `journey_id` | Deduplicates scheduled and terminal events in one cancellation journey | stable derived identifier |
| `subscription_id` | Joins lifecycle, orders, gateway, and cancellation evidence | internal ID; never expose publicly |
| `first_trigger_at` | Defines attribution timing | timestamp |
| `first_trigger` | Primary cause before later consequences | customer_cancel, renewal_failed, admin_cancel, technical_fault |
| `initiated_by` | Separates customer, admin, system, gateway | customer, admin, system, gateway, unknown |
| `cancellation_type` | Distinguishes immediate versus end of period | immediate, end_of_period |
| `stated_reason` | Customer-entered reason | too_expensive, not_using, other |
| `failure_class` | Records recovery path | soft_decline, hard_decline, missing_method, gateway_error, unknown |
| `recovery_state` | Prevents premature churn counting | in_progress, recovered, terminal, censored |
| `terminal_outcome_at` | Places terminal churn in the reporting period | timestamp/null |
| `primary_churn_class` | Final reporting class | voluntary, involuntary, policy, operational, unknown |
| `contributing_factors` | Preserves mixed causality | technical_issue, price, support, delivery |

### Decision tree

```text
Did the paid relationship reach the reporting churn state?
├─ No → not churn (may be pending cancel or recovery in progress)
└─ Yes
   ├─ Was the first trigger an explicit customer cancellation decision?
   │  └─ Yes → voluntary, with stated reason and contributing factors
   ├─ Was the first trigger a merchant/policy decision?
   │  └─ Yes → business/policy-initiated
   ├─ Was the first trigger a renewal payment failure?
   │  ├─ Recovered inside window → not churn; recovered failure
   │  ├─ Still unresolved → censored/in progress
   │  └─ Terminal after policy → involuntary terminal churn
   ├─ Was the first trigger a proven system/gateway/scheduler defect?
   │  └─ Operational/technical primary class; separately record whether terminal
   └─ Evidence insufficient → unknown
```

### Mixed-cause rule

Use the first material trigger as the primary class and retain later causes. Examples:

- A customer cancels after three unexplained payment errors: primary may be operational/technical with “customer cancellation” as the terminal action, depending on the evidence.
- A card expires, the update link fails, and grace expires: primary involuntary; technical update failure is a contributor.
- A customer explicitly cancels because price rose: voluntary; price/affordability is the reason.
- An admin cancels fraudulent access: policy-initiated, not voluntary.

Do not force every case into a binary if the operational distinction matters.

## Metric formulas

### Voluntary churn

```text
voluntary churn rate
= unique subscription/customer journeys classified voluntary
  / eligible opening base
```

State whether an end-of-period cancellation enters the numerator when requested or when access/billing ends. For operational forecasting, show pending-cancel value separately; for realized churn, use terminal outcome.

### Involuntary terminal churn

```text
involuntary terminal churn rate
= unique failed-payment journeys reaching terminal loss
  / eligible opening base
```

Do not use `first payment failures / opening base` as involuntary churn. That is failure incidence.

### First-failure incidence

```text
first-failure incidence
= unique subscriptions with a first failed renewal in period
  / renewal attempts in period
```

### Closed-cohort recovery

```text
closed-cohort recovery rate
= recovered failed-renewal journeys
  / (recovered + terminal failed-renewal journeys)
```

Keep unresolved/censored journeys outside this denominator and report them alongside it.

### Total terminal churn

```text
total terminal churn rate
= (voluntary + involuntary + policy + operational + unknown terminal journeys)
  / eligible opening base
```

The classes should be mutually exclusive at the primary-class level, even though contributing factors may overlap.

## Illustrative worked example

Invented data; not an ArraySubs or industry benchmark.

Opening base: 1,000 active paid subscriptions.

During the period:

- 35 customer-initiated journeys reach the chosen churn state.
- 20 renewals have a first failure.
- 12 recover inside the observation window.
- Five reach terminal cancellation after retry/grace.
- Three remain unresolved at report close.
- Two additional subscriptions are cancelled by a merchant policy process.

```text
voluntary churn = 35 / 1,000 = 3.5%
involuntary terminal churn = 5 / 1,000 = 0.5%
policy-initiated churn = 2 / 1,000 = 0.2%
classified terminal churn = 42 / 1,000 = 4.2%
closed-cohort recovery = 12 / (12 + 5) = 70.6%
unresolved failed-payment journeys = 3, reported separately
```

The 20 first failures should not be added to churn. Twelve explicitly recovered; three have no terminal outcome yet.

## Verified ArraySubs evidence and behavior

### Voluntary cancellation evidence in core/free

| Verified behavior | Product source | Classification consequence |
|---|---|---|
| Cancellation endpoints collect a selected reason and details and enforce login/ownership or admin capability. | `arraysubs/src/Features/CancellationFlow/REST/CancellationController.php` | Stronger evidence of customer/admin intent than a status alone. |
| Cancellation processing stores `_cancellation_reason`, details, actor/initiator information, and cancellation type. | `arraysubs/src/functions/cancellation-helpers.php`; `arraysubs/src/Features/CancellationFlow/REST/CancellationController.php` | These fields should feed a derived classification model. |
| Immediate and end-of-period cancellations are distinct. End-of-period cancellation sets waiting-cancellation state and blocks future renewal actions. | `arraysubs/src/functions/cancellation-helpers.php`; `arraysubs/src/Features/CancellationFlow/Services/Hooks.php`; `arraysubs/src/Features/RecurringBilling/Services/Hooks.php` | Pick one event for realized churn; show pending cancellations as forecast/exposure. |
| Retention Flow defaults require a reason and offer reason-targeted discount, pause, or downgrade paths. | `arraysubs/src/functions/settings-helpers.php`; `arraysubs/src/resources/pages/RetentionFlow/index.jsx` | Useful for diagnosis/intervention; default reasons are not empirical prevalence. |
| Undoing a pending cancellation generates a separate `cancel_undone` retention event. | `arraysubs/src/Features/RetentionAnalytics/Services/RetentionLogger.php` | A scheduled cancellation can be saved/undone; do not treat all scheduled cancels as final churn. |

### Involuntary recovery evidence in core/Pro

| Verified behavior | Product source | Classification consequence |
|---|---|---|
| Core default automatic retry configuration is three retries at 24-hour intervals; adapters can override. | `arraysubs/src/functions/gateway-helpers.php` | Define recovery eligibility by actual gateway/settings, not a universal fixed schedule. |
| Core renewal defaults allow three grace days before on-hold and seven more before cancellation. | `arraysubs/src/functions/settings-helpers.php`; lifecycle services | On-hold is an intermediate lifecycle state in many cases, not terminal churn. |
| Renewal processing has distinct invoice generation, due-time processing, payment attempt, failure, and retry actions. | `arraysubs/src/Supports/ActionScheduler.php`; `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php` | Store event timestamps and build a journey, not a single-status snapshot. |
| A pre-retry hook asks the current gateway to verify that a remote charge did not already succeed. | core renewal processor; `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php` | An apparent local failure can coexist with a remote success; reconcile before classifying or replaying. |
| Pro resolves a subscription’s stored current gateway and exposes current-gateway payment-method updates/sync. | `arraysubspro/src/Features/AutomaticPayments/Services/GatewayResolver.php`; `.../PaymentMethodCoordinator.php` | Gateway segment and billing-clock owner are necessary diagnostic dimensions. |
| Stripe is plugin-scheduled, while PayPal and Paddle can have remote provider-side billing contexts. | `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php` | Failure and recovery evidence differs by gateway; pausing WordPress actions does not define all provider outcomes. |

### Retention Analytics caveats

The core Retention Analytics logger records `cancelled` on any transition to the cancelled status and can include `initiated_by`. The summary dashboard counts cancelled rows but does not split customer-intent, payment-failure, policy, and technical loss.

Specific cautions from `arraysubs/src/Features/RetentionAnalytics/REST/AnalyticsController.php` and `.../Services/RetentionLogger.php`:

- The reasons chart includes both `scheduled_cancel` and `cancelled` events, so a single end-of-period journey can be counted twice.
- Total cancellations counts final `cancelled` event rows, including system/payment-driven cancellations unless classified later.
- Opening base is reconstructed from current statuses/post dates/post-modified dates; it is not a historical snapshot table.
- `initiated_by` exists on log records, but the summary does not transform it into a rigorous voluntary/involuntary taxonomy.
- On-hold subscriptions can include paused subscriptions as well as payment-related cases. Status alone is insufficient.

### Gateway retention-offer caveat

Current core eligibility shows retention offers for manual subscriptions and requires automatic adapters to declare `retention_amount_update`. Pro currently enables that for Stripe but not automatic PayPal/Paddle. Because `getAvailableOffers()` exits before assembling any offers, PayPal/Paddle automatic cancellation journeys currently bypass all offer types in that flow. Product sources: `arraysubs/src/functions/gateway-helpers.php`, `arraysubs/src/Features/CancellationFlow/Services/RetentionOfferProcessor.php`, and Pro gateway capability files.

This matters to comparison: a lower save rate on PayPal/Paddle might reflect offer ineligibility, not different customer intent.

## Separate operating playbooks

### Voluntary playbook

1. Preserve an easy, ethical cancellation path.
2. Capture a stable primary reason plus optional free text.
3. Distinguish stated reason from root-cause hypothesis.
4. Offer only a relevant, eligible alternative: pause for timing, downgrade for plan/price fit, support for a resolvable issue.
5. Measure shown → accepted → retained after observation window → paid renewal realized.
6. Feed patterns into product, pricing, onboarding, support, and fulfillment.

### Involuntary playbook

1. Record first failure and gateway/billing owner.
2. Classify retryable decline, hard decline, missing method, remote/local state mismatch, or technical failure.
3. Reconcile before a retry where duplicate-charge risk exists.
4. Execute gateway-appropriate retry/grace policy.
5. Send a clear payment-update or manual-payment path when customer action is required.
6. Mark recovered, terminal, or unresolved only after the chosen observation window.
7. Measure closed cohorts and time to recovery.

### Policy/operational playbook

- Require a named reason, actor, and evidence.
- Preserve customer-intent reasons separately if a customer also cancelled.
- Route technical causes into incident/problem management, not a discount experiment.
- Do not hide operational defects inside “involuntary churn.”

## Recommended original tables and visuals

1. **Binary-plus-exceptions decision tree**: use the decision tree above, including recovery-in-progress and policy/technical branches.
2. **Event timeline comparison**:
   - voluntary: reason submitted → offer shown/declined → pending cancel → terminal cancel/undo
   - involuntary: renewal due → attempt failed → retry/update → recovered or terminal
3. **Metric table**: failure incidence, closed-cohort recovery, voluntary terminal churn, involuntary terminal churn, unresolved cases.
4. **Status-is-not-cause table**: active, trial, on-hold, waiting cancellation, cancelled versus possible triggers.
5. **Ownership matrix**: product/pricing, customer success, billing operations, engineering, finance.

### Status-is-not-cause example

| Observed state | Possible interpretation | Evidence needed |
|---|---|---|
| On hold | failed renewal inside grace; customer pause; gateway remote pause; admin action | previous status, pause metadata, renewal order, gateway event, actor |
| Waiting cancellation | customer chose end of period; admin scheduled end; retention journey | cancellation actor/reason/type and scheduled date |
| Cancelled | voluntary; failed-payment terminal; policy/admin; technical cleanup | first trigger, order/failure history, actor, reason, timeline |
| Active after failure | recovered payment; manual override; remote/local mismatch | paid renewal/order, transaction ID, gateway sync evidence |

## Screenshot and UI opportunities

### Production screenshot pass — 2026-07-22

The existing annotated Renewal Failure Audit and on-hold subscription-detail captures were rechecked and published with captions that treat them as investigation evidence, not terminal churn proof. The clean synthetic Retention Analytics capture from the confirmed local staging pass was also published. No offer was accepted, payment failed, or subscription cancelled for this article.

- `screenshots/live-ui/13-on-hold-subscription-detail-annotated.png` → `on-hold-subscription-detail.png`
- `screenshots/live-ui/11-renewal-failure-audit-annotated.png` → `renewal-failure-audit.png`
- `screenshots/live-ui/a070-retention-analytics-original.png` → `retention-analytics.png`

The new retention screenshot annotation attempt failed to locate its requested targets, so the clean analytics original was used without callouts. It contains only synthetic staging evidence and is captioned with the event-count and classification limits documented here.

| Pair | Existing asset / route | Editorial use | Caveat |
|---|---|---|---|
| Cancellation controls | `screenshots/live-ui/a072-cancellation-reasons-original.png`; admin `#/retention-flow` | Voluntary-intent evidence and reason capture | Settings, not distribution or lift. |
| Renewal Failure Audit | existing assets containing `renewal-failure-audit` | Failed-payment journey evidence | First failure is not terminal churn. Redact IDs and customer data. |
| On-hold subscription detail | existing asset containing `on-hold-subscription-detail` | Demonstrate status ambiguity | Caption must explain that cause requires the timeline. |
| Retention Analytics activity log | Woo Analytics `/analytics/arraysubs-retention` | Scheduled/final/offer events | Explain event duplication and absence of native churn-class split. |
| Gateway billing context | `screenshots/live-ui/a063-subscription-billing-context-original.png` | Shows current gateway evidence | Gateway context is a dimension, not the cause by itself. |

## Internal-link plan

- Primary feature anchor: `/deals/arraysubs/features/#retention-revenue`
- Pillar: `/retention-and-churn/how-to-reduce-woocommerce-subscription-churn/` (A070)
- Companion: `/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/` (A072)
- Companion: `/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/` (A073)
- Cross-cluster recovery guide: `/payment-recovery/involuntary-churn-recovery-checklist/` (A039)
- Cross-cluster recovery guide: `/payment-recovery/failed-subscription-payment-recovery-for-woocommerce/` (A031)
- Recipe: `/deals/arraysubs/use-cases/recipes/require-reason-targeted-funnel/`
- Recipe: `/deals/arraysubs/use-cases/recipes/pause-need-a-break/`
- Recipe: `/deals/arraysubs/use-cases/recipes/downgrade-offer/`

## Claims to avoid

- “All cancellation is voluntary.”
- “All payment failure is churn.”
- “On hold means involuntary churn.”
- “Cancelled status tells you the cause.”
- “A recovered failed payment should still count as churn.”
- “Voluntary + involuntary are the only possible primary classes.”
- “The current ArraySubs dashboard automatically separates the classes.”
- “A customer cancellation reason is proven root cause.”
- “The same offer flow is available for every automatic gateway.”

## Claims requiring live or data verification

- Exact failure-audit fields and gateway filters visible in the current Pro UI.
- How first failure, retry, payment update, and terminal cancellation appear across Stripe, PayPal, Paddle, and manual modes.
- Whether actor/initiator is populated consistently for each cancellation route.
- Whether repeated schedule/undo/reschedule journeys create multiple rows beyond the known scheduled/final pair.
- How pause-created on-hold records can be cleanly separated in exports.

## Refresh triggers

Re-audit when any of these change:

- cancellation actor/reason/type metadata
- retry/grace lifecycle and failure audit
- Retention Analytics event types or deduplication
- explicit voluntary/involuntary reporting
- pause/on-hold status semantics
- gateway billing-clock ownership
- Free/Pro version at publication
