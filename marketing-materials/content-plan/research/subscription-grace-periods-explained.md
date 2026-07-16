# Research brief: Subscription Grace Periods Explained

## Research record

- **Article:** A035 — Subscription Grace Periods Explained
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `subscription grace period explained`
- **Long-tail intent:** `WooCommerce subscription grace period`, `access during failed payment recovery`, `two phase subscription grace period`
- **Search intent:** Informational. Operators need to decide how long an unpaid subscriber stays active, what happens after access is restricted, and how the payment, access, fulfillment, and cancellation clocks fit together.
- **Evidence scope:** A035 brief; `plan/07-seo-geo-publishing-standard.md`; current ArraySubs 1.8.11 and ArraySubs Pro 1.1.2 source; recurring-billing, membership-access, email, retry, and lifecycle architecture; current official WooCommerce, Stripe, PayPal, and Paddle documentation.
- **Test limitation:** Source and UI implementation were inspected, but no live overdue renewal was advanced across both ArraySubs grace boundaries. Any screenshots must be labeled as current first-party UI observations, not proof that a time-based transition executed.

## 40–60-word direct answer

> A subscription grace period is the defined time after payment becomes due when a customer can still recover the renewal before the subscription reaches its final unpaid state. A two-phase policy separates temporary active access from an on-hold recovery window, so payment retries, customer notices, access, fulfillment, and cancellation do not change at the same moment.

This is 57 words. Put it in the first 150 words and name WooCommerce and ArraySubs immediately afterward.

## Answer-first editorial thesis

A grace period is not one number. It is a state policy with at least four clocks:

1. **Payment clock:** when the invoice became due and when collection may be retried.
2. **Access clock:** how long digital/service entitlements remain usable.
3. **Fulfillment clock:** whether a physical shipment, booked service, or costly operation proceeds.
4. **Lifecycle clock:** when the subscription becomes on-hold and when it is finally cancelled or downgraded.

The article should own the policy explanation and decision framework. The lenient and strict recipes own exact ArraySubs setup steps.

## Key takeaways

- Define payment grace and access grace separately; they may share dates but solve different problems.
- A two-phase policy normally means active/recoverable first, on-hold/restricted second, then a final outcome.
- Tie every retry and email to a visible state and timestamp; a hidden grace clock creates support disputes.
- Apply different fulfillment controls to digital access, physical goods, and scheduled services.
- Test the exact boundary where retry jobs and overdue status checks can execute near the same time.

## Verified primary-source claims

All web sources accessed 2026-07-16.

| Verified claim | Primary source | Editorial use |
| --- | --- | --- |
| WooCommerce Subscriptions defines `On-Hold` as awaiting payment or manual suspension; on-hold can remove subscriber-role/access benefits, while payment can reactivate a payment-held subscription. | [WooCommerce: Subscription status guide](https://woocommerce.com/document/subscriptions/statuses/) | Establish that status and access are connected, but do not apply Woo behavior automatically to ArraySubs. |
| WooCommerce's failed-payment rules can control retry interval, customer/store email, renewal-order status, and subscription status. | [WooCommerce: Failed Recurring Payment Retry System](https://woocommerce.com/document/subscriptions/failed-payment-retry/) | Show why grace, retry, and messaging must be designed as one policy. |
| Stripe uses `past_due`, `unpaid`, and `canceled` as distinct subscription outcomes and advises notifying the customer, collecting a new method, and monitoring payment events. | [Stripe: How subscriptions work](https://docs.stripe.com/billing/subscriptions/overview) | Demonstrate that provider states do not map one-to-one to local ArraySubs states. |
| PayPal can retry failed subscription payments, carry an outstanding balance, and suspend after a configured failure threshold. | [PayPal: Payment failures and recovering balances](https://developer.paypal.com/docs/multiparty/subscriptions/customize/payment-failure-retry/) | Support remote-owner alignment; provider recovery may outlast a local grace window. |
| Paddle marks failed automatically collected renewals `past_due`, retries them, and returns the subscription to active after recovery. | [Paddle: Payment recovery](https://developer.paddle.com/concepts/retain/payment-recovery-dunning/) | Support the requirement to align remote recovery and local access policy. |

Provider timing is time-sensitive. Cite live docs and date the verification; do not prescribe a provider's default as the merchant's ideal policy.

## Definitions to establish

- **Due date:** when the renewal obligation becomes payable.
- **Payment grace:** time during which the unpaid obligation can still be recovered before the final policy action.
- **Access grace:** time during which the customer continues receiving an entitlement or service despite nonpayment.
- **Active grace:** ArraySubs phase in which the subscription remains active after the due date.
- **On-hold grace:** ArraySubs phase after active grace and before overdue cancellation.
- **Final state:** cancellation, expiration, manual resolution, or configured fallback downgrade.
- **Recovery:** verified payment plus correct restoration/reconciliation of order, subscription, access, fulfillment, and next renewal state.

## Current ArraySubs product truth

### Default two-phase timeline

Current core defaults in `arraysubs/src/functions/settings-helpers.php` are:

```text
renewals.grace_days_before_on_hold = 3
renewals.grace_days_before_cancel  = 7
```

Current admin fields in `GeneralSettings.jsx` allow:

```text
Days Active After Due:       0–30
Days On-Hold Before Cancel:  1–60
```

The UI itself states: `Payment Due Date → ACTIVE (X days) → ON-HOLD (Y days) → CANCELLED`, with customer access retained during active but not during on-hold.

### How transitions run

- `HOOK_CHECK_OVERDUE_RENEWALS` runs hourly.
- Phase 1 queries active/trial subscriptions whose `_next_payment_date` is older than the active-grace cutoff and confirms an unpaid renewal order exists.
- If no unpaid renewal order exists, ArraySubs creates one and gives the customer time rather than immediately holding the subscription.
- Phase 1 sets `arraysubs-on-hold`, records `_on_hold_date`, and sends the on-hold lifecycle action/email.
- Phase 2 identifies on-hold subscriptions older than the combined grace and additionally checks `_on_hold_date + on-hold grace` before cancellation.
- Overdue cancellation records system/nonpayment metadata, cancels unpaid renewal orders, and unschedules future renewals.

Because the checker is hourly and comparisons are strict `<`, settings are thresholds, not second-perfect guarantees. A `0` active-grace setting still depends on the next overdue check and evidence of an unpaid renewal.

### Access behavior needs precise wording

- Default “has active subscription” access checks include only `arraysubs-active` and `arraysubs-trial`, not on-hold.
- The condition builder can explicitly evaluate `subscription_status` including `on-hold`, so a custom rule could intentionally preserve some access.
- Role mappings have an `on_hold_behavior` that can keep or remove mapped roles.
- Therefore, do not claim every ArraySubs entitlement is automatically removed on hold. Say the default active-subscription path no longer qualifies, while explicit status/role rules can vary and must be tested.

### Retry boundary caveat

Current local Stripe retries are fixed at up to three 24-hour retries, while default active grace is three days. Retry 3 and the active→on-hold overdue check can meet around the same timestamp. The article should flag this boundary and link to A034 rather than repeat the entire retry architecture.

### Core/Pro distinction

- Two-phase grace, lifecycle statuses, general settings, renewal invoices, notes, and membership access rules are core behavior.
- Automatic off-session gateway collection/retry is Pro behavior.
- Auto-downgrade is marketed as Pro and is a possible final outcome, but its strategy/setup belongs in A038 and the dedicated recipe.

## Grace-policy decision framework

Use an extractable table:

| Business model | Active grace question | On-hold action | Fulfillment guard | Typical final path |
| --- | --- | --- | --- | --- |
| Digital SaaS/member access | Can low-cost access safely remain live while payment is corrected? | Reduce/revoke gated capability; preserve account/data | Block paid feature use, not login/support | cancel or fallback tier |
| Physical subscription box | Has the warehouse cutoff passed? | Stop pick/pack/ship before cost is incurred | Separate billing grace from shipment release | cancel/skip/manual review |
| Professional service | Is work already booked or staffed? | Pause new work while preserving records and communication | Require paid status before next deliverable | manual resolution/cancel |
| Education/community | Would immediate lockout harm progress disproportionately? | Preserve identity/progress, restrict premium access | Avoid deleting progress or content history | downgrade/cancel |
| Essential/high-risk service | What legal/contract continuity applies? | Qualified policy and manual escalation | Never rely on generic plugin defaults alone | specialist review |

No durations in this table should be called benchmarks.

### Timeline formula

```text
Active-grace end = due timestamp + active-grace duration
On-hold target   = first overdue-check after active-grace end
Final target     = max(due + active grace + on-hold grace,
                       actual on-hold timestamp + on-hold grace)
```

The actual transition can be later because the checker is hourly, the site scheduler must run, and missing unpaid-order evidence can cause invoice creation before hold.

### Worked example

Illustrative current defaults, not a recommendation:

```text
Due: July 16 at 09:00 UTC
Active-grace threshold: July 19 at 09:00 UTC
On-hold transition: first successful hourly overdue check after threshold
On-hold grace: 7 days from recorded on-hold time
Final cancellation: first eligible overdue check after that point
```

For a box shipment with a July 18 warehouse cutoff, fulfillment must stop at the cutoff even though access/lifecycle may remain active until July 19.

## Policy checklist

1. Name the due-date source and timezone.
2. Define active and on-hold durations.
3. Define what customers can do in each phase.
4. Separate digital access, physical fulfillment, and booked service rules.
5. Align provider-owned retries with the local final cutoff.
6. State which messages are sent at failure, retry, hold, and final outcome.
7. Preserve a safe pay/update/authentication route throughout eligible recovery.
8. Prevent duplicate charges and duplicate fulfillment.
9. Define how late payment reactivates and restores access.
10. Record timestamps, actor, payment/order IDs, and final resolution.

## Live screenshot opportunities on mirror-help.arrayhash.com

Use real UI screenshots with numbered markers, short captions, and privacy-safe crops. Recommended captures:

1. **General Settings → Grace Period**
   - URL: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/general`
   - Marker 1: “Days Active After Due.”
   - Marker 2: “Days On-Hold Before Cancel.”
   - Marker 3: the visible “Grace Period Timeline” warning.
   - Best use: A035 primary procedural screenshot.
2. **Subscription detail → status and Payment & Activity Timeline**
   - URL pattern: `.../admin.php?page=arraysubs-mainadmin#/subscriptions/detail/{id}`
   - Use an actual test subscription only; mark status, next payment, unpaid renewal, and on-hold/retry event.
   - Redact customer email, address, payment IDs, and any gateway secret.
3. **Members Access rule editor**
   - URL: `...#/members-access` (open a status-based rule).
   - Mark the status condition and show why `active` versus explicit `on-hold` changes access.
4. **WooCommerce email settings → Subscription On Hold**
   - URL through WooCommerce → Settings → Emails; open the ArraySubs on-hold email.
   - Mark enable state, subject, and additional content; do not expose a real recipient.

Screenshot QA: browser zoom 100%, desktop width, current ArraySubs/Pro versions recorded, no hover tooltips covering values, annotation markers outside form text where possible.

## Varied non-chart visual ideas

Avoid repeating dashboard cards and number funnels.

1. **Editorial scene:** store operator at a desk looking at one overdue invoice while a customer still uses an app; calendar pages bridge them.
2. **Two-door concept:** an “Active recovery” doorway leading to an “On hold” waiting area, then a final fork to “Recovered,” “Fallback,” or “Cancelled.”
3. **Layered clock illustration:** payment, access, fulfillment, and lifecycle clocks with visibly different hands.
4. **Physical/digital split scene:** server access on one side and a warehouse box on the other, showing why one grace policy cannot control both blindly.
5. **ArraySubs-branded timeline ribbon:** use the ArraySubs logo only as publisher identity, with statuses shown as distinct shapes rather than a bar chart.

## SEO/GEO outline (target 2,300–3,000 words)

1. **Subscription Grace Periods Explained** — direct answer and key takeaways.
2. **What is a subscription grace period?** — definitions and four clocks.
3. **What is the difference between payment grace and access grace?** — extractable table.
4. **How does a two-phase grace period work?** — state sequence and formula.
5. **What does current ArraySubs do?** — defaults, ranges, hourly transitions, access caveats, core/Pro split.
6. **How long should a grace period be?** — decision factors, no invented benchmark.
7. **How should digital, physical, and service subscriptions differ?** — scenario table.
8. **How do retries, emails, and gateway ownership fit the grace window?** — link to A034/A037.
9. **What should happen after a late successful payment?** — reconciliation/access restoration checklist.
10. **Policy checklist and worked example.**
11. **Limitations / not a fit.**
12. **FAQ, conclusion, then pricing CTA.**

## FAQ candidates

- Does a subscription grace period mean the customer keeps access?
- What is a two-phase subscription grace period?
- What is the difference between active and on-hold in ArraySubs?
- What are ArraySubs' default grace periods?
- Does a zero-day grace period cancel immediately?
- Can customers pay while a subscription is on hold?
- Should physical orders ship during payment grace?
- Who controls grace for Stripe, PayPal, and Paddle?
- What happens when the grace period ends?
- Can an on-hold customer retain limited access?

## Internal-link plan

- Commercial pillar: `/deals/arraysubs/features/#subscription-operations`
- Primary recipes: `/deals/arraysubs/use-cases/recipes/lenient-dunning-grace/` and `/deals/arraysubs/use-cases/recipes/strict-dunning-grace/`
- Final-state recipe: `/deals/arraysubs/use-cases/recipes/auto-downgrade-on-failed-payment/`
- Siblings: A034 automatic retry, A036 expired cards, A037 failed-payment email sequence.
- Cluster context: A031 recovery pillar, A032 failure lifecycle, A033 dunning strategy.
- CTA after the policy/checklist answer: `/deals/arraysubs/pricing/`

## Claims and caveats to avoid

- Do not call 3+7 days universally optimal.
- Do not say “two-phase grace” means access remains live in both phases.
- Do not promise second-perfect transitions; overdue checks are hourly and depend on scheduler execution.
- Do not say `0` days means an immediate synchronous hold at the due instant.
- Do not assume provider `past_due`/suspended states equal ArraySubs on-hold.
- Do not claim physical fulfillment is automatically stopped by changing subscription status without a current test.
- Do not claim every on-hold access rule revokes access; role/status rules can vary.
- Do not duplicate the recipes' click-by-click configuration.

## Refresh triggers

- Changes to grace defaults/ranges, overdue-check frequency, cutoff comparisons, `_on_hold_date`, or cancellation behavior.
- Changes to Members Access active/on-hold qualification or role `on_hold_behavior`.
- Changes to the local Stripe retry cadence near the three-day boundary.
- PayPal/Paddle recovery-status changes.
- Any new product type or fulfillment integration that changes access/ship behavior.
- Quarterly source review and review after relevant ArraySubs, WooCommerce, gateway, or WordPress releases.
