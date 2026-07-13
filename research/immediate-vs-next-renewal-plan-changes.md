# Research brief: Immediate vs Next-Renewal Plan Changes

## Research record

- **Article:** A022
- **Research date / last verified:** 2026-07-13
- **Focus keyword:** `immediate vs deferred subscription plan changes`
- **Intent:** Help operators choose when a subscription's product, access, price, and cadence should change.
- **Evidence scope:** ArraySubs 1.8.9 source, current ArraySubs manual, and official WooCommerce Subscriptions switching and renewal documentation. No live gateway or access-integration test was run.
- **No invented benchmarks:** Examples illustrate mechanics only.
- **Scope boundary:** This article owns policy and lifecycle timing. Link to plan-switching recipes for ArraySubs setup and to A021 for proration arithmetic.

## Direct-answer conclusion

> Make a plan change immediate when the customer needs the new entitlement now and the adjustment can be quoted, paid, and reversed safely. Defer it to renewal when the current paid term should finish unchanged. The chosen timing must align access, invoice amount, billing anchor, fulfillment, failure handling, credits, and customer-facing confirmation.

## Editorial thesis

“When does the plan change?” has at least four answers: when the request is accepted, when an adjustment order is created, when payment succeeds, and when entitlement is updated. A reliable policy chooses one authoritative effective event and makes billing, product metadata, access, operations, and notifications follow it.

## Key facts

- Current ArraySubs immediate switching changes the subscription only after a plan-switch order succeeds.
- Deferred switching stores one pending target and changes the product only after the target renewal succeeds.
- Same-cadence immediate proration preserves the next date; cadence changes and no-proration switches reset it.
- A pending cancellation blocks switching; canceling clears a pending switch.
- Timing is a global setting, so “upgrade now, downgrade later” is not a current no-code policy.
- Product-specific trials, signup fees, and different-renewal-price phases need extra verification when switching.

## Timing comparison

| Question | Immediate change | Change at next renewal |
| --- | --- | --- |
| Customer pays at request | Usually an adjustment or full replacement charge | Nothing at request |
| Product/access changes | After the switch payment succeeds | After the target renewal payment succeeds |
| Current paid entitlement | Replaced during the term | Preserved through its paid boundary |
| Billing anchor | May remain or reset, depending on proration/cadence | Existing renewal date remains |
| Failed payment | Old plan should remain until settlement | Old plan remains; normal renewal failure rules apply |
| Operational complexity | Higher: quote, payment, reversal, entitlement sync | Lower upfront; pending-state conflicts must be handled |
| Best fit | Urgent capacity/access upgrades | Downgrades, nonurgent changes, clean term boundaries |

## Verified ArraySubs state transitions

### Immediate path

1. An active or trial customer requests an allowed target plan.
2. ArraySubs classifies the move as upgrade, downgrade, or crossgrade using normalized daily price and checks direction permissions.
3. With **Prorate Immediately**, it calculates the remaining-period difference. With **No Proration**, it uses the full target recurring price.
4. It creates a WooCommerce plan-switch order, including any configured direction fee.
5. The customer completes the normal WooCommerce payment flow.
6. Only after successful payment does ArraySubs update product, quantity, recurring amount, cadence, and applicable next-payment date.

This is **payment-gated immediate**, not “change access before collecting money.” If payment is abandoned or fails, the original subscription should remain the source of truth.

For the same cadence, immediate proration keeps the current renewal date. If cadence changes, current code resets the next payment date by the new cadence. No proration also resets it by the target cadence.

### Deferred path

1. The request creates one `_pending_switch` record with target product/variation, quantity, price, cadence, direction fee, and effective date.
2. No adjustment order or entitlement change happens at request.
3. The next renewal order is built with the target product and stored switch fee.
4. The target product/access is applied only after that renewal is paid.

The existing product and access remain until successful renewal. Replacing an existing pending switch requires explicit confirmation. Cancellation removes the pending switch. This prevents a silent stack of future plan changes.

### Eligibility and policy settings

- Switching is currently limited to active and trial subscriptions.
- A subscription waiting for scheduled cancellation cannot switch.
- Upgrade, downgrade, and crossgrade permissions are separate toggles.
- Timing/proration is one global admin choice; it is not selectable by direction or individual request.
- Customer self-service and admin-initiated flows should be verified separately because permissions and copy can differ.

## Worked timeline — not a benchmark

Assume a customer paid $30 on July 1 for a monthly Basic plan. On July 16, with 15 of the modeled 30 days remaining, they request a $60 Pro plan. Ignore tax, fees, coupons, shipping, gateway fees, and rounding.

### Immediate proration

```text
unused Basic value = ($30 ÷ 30) × 15 = $15
remaining Pro value = ($60 ÷ 30) × 15 = $30
amount due July 16 = $15
next renewal = July 31 at $60
effective event = successful payment of July 16 plan-switch order
```

Timeline:

```text
July 1 Basic paid → July 16 request → $15 switch order paid
→ Pro access starts → July 31 renew Pro for $60
```

### Next-renewal change

```text
amount due July 16 = $0
Basic access remains through the renewal boundary
July 31 invoice uses Pro at $60
effective event = successful payment of July 31 renewal
```

Timeline:

```text
July 1 Basic paid → July 16 pending change recorded
→ Basic access remains → July 31 Pro renewal paid → Pro access starts
```

If the July 31 renewal fails, the pending target should not grant Pro. Subscription status, retries, grace period, and access behavior then follow the store's renewal-failure policy.

### Downgrade implication

For $60 Pro to $30 Basic halfway through the same modeled month, immediate proration produces a $15 unused-value surplus and a $0 switch charge; current ArraySubs stores the surplus as internal subscription credit. Deferred timing keeps Pro access through the paid term and charges $30 at the next successful renewal. The latter often produces a simpler customer narrative, but it is a policy choice, not a universal rule.

## Decision matrix

| Situation | Usually clearer timing | Reason | ArraySubs constraint |
| --- | --- | --- | --- |
| Customer needs a feature/capacity upgrade today | Immediate, payment-gated | New value starts now | Global timing affects downgrades too |
| Customer wants a lower tier after the paid month | Next renewal | Preserves paid access and avoids midterm credit | Supported as global deferred mode |
| Product cadence changes | Depends on anchor policy | Immediate may reset the date | Test notices and reporting |
| Physical fulfillment already allocated | Next renewal or an explicit cutoff | Avoids changing an in-process shipment | Base switch timing is not a warehouse cutoff system |
| Security/abuse restriction | Separate suspension/admin workflow | Billing switch should not be the security control | Do not overload plan switching |
| Enterprise approval required | Deferred with recorded approval | Clear audit and invoice boundary | One pending switch only |

### Policy ArraySubs cannot express without customization today

A common hybrid is “upgrade immediately with proration, downgrade at next renewal.” Current ArraySubs has one global proration mode, so a store cannot configure that split per direction using the existing setting. The article should not advertise the hybrid as a current no-code feature.

## Operational acceptance checklist

Before enabling either timing, verify:

1. the exact authoritative event for entitlement change;
2. the amount due now and on the next renewal;
3. whether the billing anchor stays or moves;
4. what access remains during pending and failed-payment states;
5. treatment of quantities, taxes, shipping, coupons, fees, trials, signup fees, and step-up prices;
6. replacement, cancellation, and undo behavior for pending changes;
7. messages shown before confirmation and after payment/failure;
8. webhook/idempotency behavior so one order cannot apply the switch twice;
9. audit data: previous plan, target plan, requester, quote, order, timestamp, and result;
10. support/admin recovery when payment succeeds but entitlement sync is interrupted.

## Metrics and diagnostics without invented targets

Track by direction and timing:

```text
switch completion rate = paid and applied switches ÷ initiated switches
switch payment failure rate = failed switch orders ÷ switch orders created
pending replacement rate = replaced pending switches ÷ deferred switch requests
post-switch refund rate = refunded switch orders ÷ paid switch orders
entitlement sync exceptions = mismatched plan/access records ÷ applied switches
```

Do not publish a “good” benchmark without first-party cohort data and a defined observation window.

## Limitations and unknowns

1. **No per-direction timing:** the biggest current fit gap for merchants wanting instant upgrades and deferred downgrades.
2. **Target pricing-phase metadata:** immediate updates do not clearly copy target trial, signup-fee, or different-renewal-price schedules; deferred application clears old different-price meta but does not clearly copy target values. Test before offering such switches.
3. **Minimum-charge and rounding controls:** current plan-switch calculator does not enforce the visible minimum-charge setting and hardcodes two-decimal rounding.
4. **Tax, shipping, and coupon interactions:** source inspection is insufficient to generalize every checkout and renewal result.
5. **External entitlement systems:** Member Access, license keys, communities, SaaS provisioning, and fulfillment integrations must consume the same effective event; no end-to-end integration matrix was run.
6. **Gateway recovery:** manual payment and automatic gateways can present different customer steps; test supported gateways, authentication, retries, and duplicate webhook delivery.
7. **Current manual claims should be verified against code:** crossgrades are still calculated under the global immediate method, so “no proration by default” is not a safe blanket statement.

## Five FAQ answers

### 1. Is an immediate subscription switch effective when the customer clicks confirm?

Not in current ArraySubs payment-gated flows. The request produces a plan-switch order; the product and entitlement update after the order is paid. This avoids granting higher access for an unpaid adjustment, but customer copy should distinguish “request accepted,” “payment required,” and “plan changed.”

### 2. What happens to access during a deferred plan change?

The current plan and access remain in place. The next renewal order uses the target product and price, and the actual subscription product changes after that renewal succeeds. If the renewal is unpaid, the target entitlement is not applied.

### 3. Does an immediate change always reset the renewal date?

No. In current ArraySubs behavior, a same-cadence immediate prorated switch preserves the existing next date. A cadence change, or the no-proration method, resets the next payment from the switch by the target cadence. State the date in the quote rather than relying on the word “immediate.”

### 4. Can ArraySubs make upgrades immediate and downgrades deferred?

Not through the current global timing setting. Upgrade/downgrade/crossgrade permission and fees can differ, but the proration timing is shared. That hybrid requires customization or a future product change.

### 5. Can a customer change or cancel a pending plan switch?

Current code supports replacing an existing pending switch only after explicit confirmation, and cancellation clears the pending switch. The customer experience and permissions should be verified in the intended portal/admin flow, and notices should say which future change is currently authoritative.

## Visual ideas

1. **Two-lane flat lifecycle flowchart:** immediate and deferred from request through payment and entitlement update. Highlight the authoritative event with a muted green ring.
2. **Timeline graphic:** July 1 payment, July 16 request, July 31 renewal; compare $15 immediate vs $0 now/$60 later.
3. **State machine:** current → switch order pending → paid/applied, and current → pending switch → renewal paid/applied; include failure branches.
4. **Decision matrix card:** urgency, paid entitlement, anchor, fulfillment, failure complexity.
5. **Human illustration:** customer choosing “Change now” versus “Change at renewal,” with plain amount/date summaries, no neon or gradients.
6. **Exception bar chart:** illustrative categories only—payment, entitlement sync, fulfillment, support—without fabricated values; for publication, populate only with first-party measurements.

## Internal-link suggestions

- Primary CTA: `/deals/arraysubs/pricing/`
- Switch at renewal recipe: `/deals/arraysubs/use-cases/recipes/switch-at-renewal/`
- Downgrade with credit recipe: `/deals/arraysubs/use-cases/recipes/downgrade-with-credit/`
- Upgrade path recipe: `/deals/arraysubs/use-cases/recipes/upgrade-path-tiers/`
- Customer self-service switch recipe: `/deals/arraysubs/use-cases/recipes/customer-self-serve-switch/`
- Switch fees recipe: `/deals/arraysubs/use-cases/recipes/switch-fees/`
- Subscription notes/timeline recipe: `/deals/arraysubs/use-cases/recipes/subscription-notes-timeline/`
- Proration comparison: `/deals/arraysubs/resources/billing-strategy/subscription-proration-methods-compared-charge-credit-or-defer/`

Do not duplicate recipe configuration steps.

## Primary and first-party sources

All sources accessed 2026-07-13.

- ArraySubs manual, Plan Switching and Relationships: `../../user-manual/markdowns/subscription-products/plan-switching-and-relationships.md`
- ArraySubs annotated settings screenshot: `../../user-manual/markdowns/subscription-products/plan-switching.ASSETS/05-plan-switching-settings-annotated.png`
- ArraySubs switch REST controller: `../../arraysubs/src/Features/PlanSwitching/REST/SwitchController.php`
- ArraySubs proration calculator: `../../arraysubs/src/Features/PlanSwitching/Services/ProrationCalculator.php`
- ArraySubs plan manager: `../../arraysubs/src/Features/PlanSwitching/Services/PlanManager.php`
- ArraySubs pending switch helpers: `../../arraysubs/src/functions/pending-switch-helpers.php`
- WooCommerce, Subscription Switching Guide: https://woocommerce.com/document/subscriptions/switching-guide/
- WooCommerce, Switching Process and Costs: https://woocommerce.com/document/subscriptions/switching-guide/switching-process-and-costs/
- WooCommerce, Subscription Renewal Process: https://woocommerce.com/document/subscriptions/renewal-process/
- WooCommerce, Pay for Renewal: https://woocommerce.com/document/subscriptions/customers-view/pay-for-renewal/

## Drafting cautions

- Treat “immediate” as payment-gated and name the exact effective event.
- Keep proration math concise here and link to A021 for the full comparison.
- Do not imply ArraySubs supports per-direction timing or that all target product metadata transfers.
- Do not invent a default policy; explain why different business models choose differently.
- Use real author/reviewer names and visible publish/update dates only.
