# Research brief: Immediate Cancellation vs Cancel at Period End

## Research record

- **Article:** A026
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `immediate vs end of period cancellation`
- **Intent:** Help operators choose when access and future billing should stop, without conflating cancellation with refunds.
- **Evidence scope:** ArraySubs 1.8.9 cancellation/lifecycle source, current manual and annotated screenshot, official WooCommerce status/refund documentation, current FTC negative-option materials, and ROSCA primary legislative record. No live gateway refund or member-access integration test was run.
- **No invented benchmarks:** Dates and refund arithmetic are illustrations, not policy or legal outcomes.
- **Legal guardrail:** There is no universal lawful default for every product and jurisdiction. The FTC's 2024 Negative Option Rule was vacated; current federal sources still identify Section 5, ROSCA, TSR, and the older prenotification rule. State and international rules vary. Require qualified legal review.
- **Product guardrail:** ArraySubs supports immediate cancellation and scheduled end-of-period cancellation in Free. Cancellation timing and refund behavior are separate settings/workflows.

## Direct-answer conclusion

> Cancel immediately when service or access must stop now and the store has a clear refund, fulfillment, and data policy. Cancel at period end when the customer should retain what they already paid for while preventing the next renewal. In either case, show the exact access end date, next-charge result, refund result, and undo availability.

## Editorial thesis

A cancellation has three independent decisions:

1. stop future renewal attempts;
2. end entitlement/service;
3. refund some or all of a prior payment.

Treating those as one button creates surprises. The article should model each state transition and use customer-facing dates/amounts rather than vague “canceled” labels.

## Key facts

- Immediate cancellation ends the ArraySubs subscription now, clears related pending state, and unschedules future actions.
- End-of-period cancellation records a waiting state and executes on the earlier valid future end or next-payment date.
- Current scheduled cancellation can be undone before execution.
- If no valid future date exists, current code fails safely instead of silently canceling immediately.
- Cancellation timing and refund behavior are separate; neither automatically proves the other occurred.
- Legal, refund, access, data, and fulfillment obligations vary by product and jurisdiction.

## Comparison

| Question | Immediate cancellation | Cancel at period end |
| --- | --- | --- |
| Future renewal | Unschedule now | Unschedule/replace now so no renewal at boundary |
| Subscription status | Canceled now | Remains current status with waiting-cancellation marker |
| Access | Can end now if entitlement follows status | Continues until scheduled cancellation executes |
| Refund | Separate policy/action | Separate policy/action |
| Undo | Usually requires restoration/new subscription | Can be undone before execution in current ArraySubs |
| Best fit | Security/abuse, explicit immediate-refund flow, service stop | Prepaid digital access, memberships, ordinary opt-out |
| Main risk | Taking away paid value or disrupting fulfillment | Failing to stop renewal or showing ambiguous status |

## Verified ArraySubs behavior

### Customer eligibility and global timing

The customer cancellation flow supports subscriptions in active, trial, or pending status; current code does not allow customer cancellation from on-hold in the same eligibility list. Global setting `cancellation.cancel_immediately` defaults to true and determines customer timing.

Admin lifecycle tools can expose explicit timing choices; do not assume the customer-facing global default and admin action always present identical controls/copy.

### Immediate cancellation

Current cancellation helpers:

- set canceled/end time to now;
- move status to `arraysubs-cancelled`;
- clear waiting-cancellation data;
- clear retry state and a pending plan switch;
- unschedule related actions.

Entitlement integrations that grant access only for active/trial statuses can therefore remove access immediately. Confirm actual Member Access, license, SaaS, community, download, or fulfillment behavior in the intended stack.

### End-of-period cancellation

ArraySubs chooses the earlier valid future `_end_date` or `_next_payment_date` as the scheduled cancellation date. It records a waiting flag, effective date, reason, and cancellation type; keeps the existing status/access until that date; and removes conflicting renewal/cancellation actions. The request can be undone before execution.

If there is no valid future date, current code fails safely rather than silently converting the request into an immediate cancellation. Lifetime/no-next-date and malformed-schedule cases therefore need an explicit admin policy.

### Cancellation is not a refund

ArraySubs has separate refund-related behavior. A refund can trigger immediate cancellation, end-of-period cancellation, or no cancellation depending on `refunds.cancellation_behavior`. Conversely, asking to cancel does not by itself prove a gateway refund was issued.

The article must keep both directions distinct:

```text
cancellation → access/billing state decision; refund may or may not follow
refund → payment reversal; cancellation may be immediate, scheduled, or absent
```

## Worked timeline — not a legal/refund rule

Assume:

- $30 monthly payment on July 1;
- customer requests cancellation July 10;
- next payment date July 31;
- modeled 30-day service period with 21 unused days;
- ignore tax, fees, usage, physical goods, trial, credit, refund cost, and local law.

### Immediate cancellation

```text
access end = July 10
next July 31 renewal = unscheduled
illustrative unused-service value = $30 × (21 ÷ 30) = $21
refund actually due = determined by disclosed policy and applicable law, not this formula
```

### Cancel at period end

```text
request recorded = July 10
access end = July 31
next renewal = prevented
customer retains the paid period
refund = separate decision; often no unused digital-service interval remains in this simple model
```

Timeline:

```text
July 1 paid ───── July 10 cancel request ───── July 31 paid-term boundary
Immediate:        access/status ends now; no next charge
End of period:    waiting cancellation; access remains; ends July 31; no next charge
```

Do not use a simple day fraction for physical goods, usage-based billing, annual licenses with front-loaded costs, taxes, bundles, consumed credits, or jurisdictions that specify another remedy.

## Decision framework by product model

| Product model | Usually clearer starting policy | Questions that can override it |
| --- | --- | --- |
| Prepaid digital membership/content | End of period | Is there fraud, security, abuse, or a requested refund? |
| SaaS/license capacity | End of period for billing opt-out | Must data export, seat removal, API access, or security suspension happen earlier? |
| Physical recurring box | Stop future cycles at a cutoff | Is the next box paid, allocated, packed, labeled, or shipped? |
| Usage-based/postpaid service | Immediate stop of new usage may fit | How are accrued charges finalized and disputed? |
| Trial | Either, with exact trial-end and charge disclosure | Does cancel now remove trial access or only prevent first charge? |
| Fixed-payment plan | Contract-specific | Is it cancelable service or installments on an owed purchase? |
| Lifetime/no-next-date | Explicit admin/policy workflow | Scheduled end-of-period needs a valid future date |
| Regulated/high-risk service | Counsel-approved policy | Consumer, health, finance, telecom, and local rules vary |

### Access, data, and fulfillment checklist

For each cancellation mode define:

- last renewal attempt and how scheduled actions are removed;
- exact access end timestamp and timezone;
- license/API/member role behavior;
- download, export, deletion, and retention timeline;
- physical fulfillment cutoff and address/warehouse state;
- unused credits, bookings, appointments, or prepaid shipments;
- refund amount/method/timing and nonrefundable portions;
- pending plan switches, retries, pauses, and grace periods;
- email/portal wording and proof of cancellation;
- undo/reactivation eligibility and audit log.

## Current legal-source framing

ROSCA's statutory summary for covered online negative-option transactions requires clear disclosure of material terms before billing, express informed consent, and a simple mechanism to stop recurring charges. FTC materials in March 2026 explicitly state that the 2024 amended Negative Option Rule was vacated and announce a new rulemaking process.

Safe editorial wording:

> Cancellation design is subject to the merchant's product terms and applicable federal, state, and international law. Requirements can govern disclosure, consent, cancellation mechanisms, access, refunds, timing, and records. Have qualified counsel review the actual offer and jurisdictions served.

Unsafe wording:

- “Cancel at period end is always legal.”
- “Immediate cancellation always requires a prorated refund.”
- “The FTC click-to-cancel rule currently requires this exact UI.”
- “One policy works in every state and country.”

## Metrics without invented targets

```text
renewal-after-cancel exception rate = cancellation requests followed by an unintended charge ÷ cancellation requests
effective-date mismatch rate = cancellations whose actual access end differs from confirmed date ÷ cancellations
undo rate = scheduled cancellations undone ÷ scheduled cancellations
refund completion time = refund completed timestamp − refund approved timestamp
cancellation contact rate = cancellation-related support contacts ÷ cancellation requests
fulfillment exception rate = canceled subscriptions with unintended/missed fulfillment ÷ physical cancellations
```

Segment immediate/end-period, product type, channel, status, refund path, gateway, and jurisdiction. Do not infer customer satisfaction from a single rate.

## Limitations and unknowns

1. **On-hold eligibility:** the customer cancellation status list does not currently include on-hold; confirm intended policy and provide support/admin handling.
2. **No valid future date:** scheduled cancellation fails instead of falling back; lifetime and corrupted/missing dates need clear recovery.
3. **External entitlement timing:** no end-to-end Member Access, licensing, SaaS provisioning, community, or warehouse test was run.
4. **Refund semantics:** gateway capability, partial refunds, tax, shipping, consumed goods, and chargeback state are not resolved by cancellation mode.
5. **Timezone/cutoff:** exact end timestamps and warehouse cutoffs need live verification around daylight-saving/calendar edges.
6. **Pending operations:** plan switch is cleared on cancellation; other third-party jobs and webhook consumers may need explicit cleanup.
7. **Legal volatility:** revalidate FTC and jurisdictional sources at drafting/publication; use qualified reviewer details, not generic legal assurances.
8. **Manual recommendations/metrics:** current documentation includes qualitative speed/recommendation claims without primary evidence; do not reuse them as facts.

## Five FAQ answers

### 1. Does canceling a subscription immediately automatically refund it?

No. In ArraySubs, cancellation state and refund behavior are separate. An immediate cancellation can end access and future billing without proving any payment was returned. The portal should show the cancellation result and refund result as separate fields/actions.

### 2. What does “cancel at period end” mean?

It means record the opt-out now, prevent the next renewal, keep the current subscription/access through its valid future end or next-payment boundary, then execute cancellation on that date. The confirmation should name the date, timezone, access outcome, and refund outcome.

### 3. Can a customer undo an end-of-period cancellation in ArraySubs?

Current ArraySubs helpers support undoing a waiting cancellation before it executes. The store should show that option only while the request remains reversible and should log who restored the subscription and which future renewal action was rescheduled.

### 4. What happens if a subscription has no next payment date?

Current scheduled-cancellation logic requires a valid future `_end_date` or `_next_payment_date` and fails safely if neither exists. Lifetime subscriptions and malformed schedules need an explicit immediate/admin policy; do not claim end-of-period scheduling will invent a date.

### 5. Is end-of-period cancellation always the best policy?

No. It often matches prepaid digital access, while immediate cancellation can fit security, abuse, a requested immediate refund, or usage shutoff. Physical goods, installments, regulated services, and jurisdictional rules need model-specific analysis and qualified legal review.

## Visual ideas

1. **Two-lane cancellation timeline:** July 1 payment, July 10 request, July 31 boundary; access and charge state on each lane.
2. **Three-decision flowchart:** stop renewals, stop access, issue refund—separate nodes with independent outcomes.
3. **Flat pie chart:** illustrative $30 period split into $9 used and $21 unused service value; label “arithmetic only, not refund rule.”
4. **Decision table graphic:** digital, SaaS, physical, usage-based, trial, lifetime.
5. **State diagram:** active → waiting cancellation → undone or canceled; active → canceled now.
6. **Human illustration:** customer reading exact “Access until July 31 / No further charge / Refund $0 or pending” summary.
7. **Compliance checklist card:** terms, consent, simple stop, confirmation, records, jurisdiction review.

## Internal-link suggestions

- Primary CTA: `/deals/arraysubs/pricing/`
- End-of-period cancellation/undo recipe: `/deals/arraysubs/use-cases/recipes/end-of-period-cancel-undo/`
- Refund-on-cancellation recipe: `/deals/arraysubs/use-cases/recipes/refund-on-cancellation/`
- Prorated-refund recipe: `/deals/arraysubs/use-cases/recipes/prorated-refund/`
- Subscription notes/timeline recipe: `/deals/arraysubs/use-cases/recipes/subscription-notes-timeline/`
- Plan-change timing: `/billing-strategy/immediate-vs-next-renewal-plan-changes/`
- Billing versus shipping: `/billing-strategy/subscription-billing-schedule-vs-shipping-schedule/`
- Use the canonical grace-period and cancellation-flow article URLs from the registry where relevant.

Verify canonical recipe URLs and keep click-by-click configuration in recipes.

## Primary and first-party sources

All sources accessed 2026-07-13.

- ArraySubs manual, Cancellation Setup: `../../user-manual/markdowns/retention-and-refunds/cancellation-setup.md`
- ArraySubs manual, Lifecycle Management: `../../user-manual/markdowns/manage-subscriptions/lifecycle-management.md`
- ArraySubs annotated cancellation screenshot: `../../user-manual/markdowns/manage-subscriptions/lifecycle-management.ASSETS/01-cancel-subscription-modal-annotated.png`
- ArraySubs cancellation helpers: `../../arraysubs/src/functions/cancellation-helpers.php`
- ArraySubs settings helpers: `../../arraysubs/src/functions/settings-helpers.php`
- WooCommerce, Subscription Status Guide: https://woocommerce.com/document/subscriptions/statuses/
- WooCommerce, Refund Policy Page Guidelines: https://woocommerce.com/document/refund-policy-page-guidelines/
- WooCommerce, Refunds: https://woocommerce.com/document/woocommerce-refunds/
- FTC, Negative Option Rule: https://www.ftc.gov/legal-library/browse/rules/negative-option-rule
- FTC, March 2026 negative-option ANPRM business guidance: https://www.ftc.gov/business-guidance/blog/2026/03/do-you-have-thoughts-negative-option-related-regulations-share-them-ftc
- FTC, March 2026 ANPRM announcement: https://www.ftc.gov/news-events/news/press-releases/2026/03/ftc-seeks-public-comment-response-advance-notice-proposed-rulemaking-regarding-negative-option
- U.S. Congress, Restore Online Shoppers' Confidence Act, S.3386: https://www.congress.gov/bill/111th-congress/senate-bill/3386

## Drafting cautions

- Never equate cancellation timing with refund outcome.
- Say current federal context accurately; do not cite the vacated 2024 FTC rule as current law.
- State exact dates/timezones and whether access, renewals, fulfillment, and refund change.
- Do not present day-based unused-value arithmetic as a legal entitlement.
- Require real legal/editorial reviewers rather than inventing credentials.
