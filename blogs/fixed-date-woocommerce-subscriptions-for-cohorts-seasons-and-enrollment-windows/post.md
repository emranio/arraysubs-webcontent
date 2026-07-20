---
title: "Fixed-Date WooCommerce Subscriptions"
meta_description: "Use fixed-date WooCommerce subscriptions for cohorts and seasons with clear enrollment, late-join, billing, timezone, access, and expiration rules."
focus_keyword: "fixed date WooCommerce subscriptions"
published: "2026-04-01"
updated: "2026-06-07"
last_verified: "2026-07-13"
author: "Emran"
author_affiliation: "ArrayHash"
reviewer: "ArraySubs Engineering Team"
---

# Fixed-Date WooCommerce Subscriptions for Cohorts, Seasons, and Enrollment Windows

A fixed-date WooCommerce subscription ends every buyer's agreement on the same calendar cutoff, while a fixed-duration subscription gives each buyer the same number of cycles from their own start. Use fixed dates for cohorts, seasons, school years, or licenses, then define enrollment, late-join pricing, access, renewal, refunds, and timezone rules before launch.

A fixed date solves a calendar problem, not a billing-frequency problem. It does not automatically align renewals, prorate late entry, delay access, or create an installment obligation.

> **Key takeaways**
>
> - Shared end date and rolling duration are different customer promises.
> - Enrollment controls when a product can be bought, not necessarily when access begins.
> - Renewals before the cutoff may still charge a full period; at/after-cutoff renewal blocking is not proration.
> - The WordPress site timezone is part of the commercial contract.
> - Fixed-Date Subscriptions are currently ArraySubs Pro; use Expire as the safest default until recurring-annual continuation is tested end to end.

## Separate the calendar controls

| Control | Question | Example | Does not guarantee |
| --- | --- | --- | --- |
| Fixed date | When does everyone end? | August 31 | Equal duration or proration |
| Fixed duration | How many cycles from each start? | 12 payments | Shared calendar end |
| Billing alignment | When do renewals occur? | Monthly on the 1st | Shared end |
| Enrollment window | When may customers buy? | Aug 1–Sep 15 | Future access start |
| Access window | When may service/content be used? | Sep 1–Jun 30 | Matching payment dates |

![One shared calendar — a focused timeline for Fixed dates coordinate a shared calendar.](/blogs/fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows/decision-visual.png)

## When fixed date is the right model

| Use case | Strong model | Late-join choice | End behavior |
| --- | --- | --- | --- |
| Live course cohort | Absolute date | Prorate sessions, late offer, or close | Expire and sell next cohort |
| Academic year | Absolute or tested annual cutoff | Full, prorated, or closed admission | Usually expire/repurchase |
| Sports or club season | Absolute date | Remaining events or closed | Expire |
| Annual license window | Annual cutoff or contract date | Contract-specific | Explicit renewal or expire |
| Seasonal box | Absolute date | Remaining-box offer | Expire |
| Rolling 12-month membership | Fixed duration, not fixed date | Each buyer gets a full year | Expire or renew |
| Monthly membership on the 1st | Billing alignment | Gap policy | Evergreen |

Choose an **absolute date** for one known cohort or season. Choose a **recurring annual cutoff** only when the same month/day genuinely defines each commercial period. Use fixed duration when every joiner deserves the same number of months or payments.

## Design enrollment and late-join value

ArraySubs Pro can open and close enrollment by site-local dates, but that window does not delay subscription creation, schedule future access, calculate a late-join price, or align renewals.

Choose one explicit late-entry policy:

- same full price when value is not primarily time-based;
- prorate by remaining calendar time;
- prorate by remaining sessions, boxes, or service units;
- create a separate late-join product/variation;
- subsidize the gap to a separately aligned renewal;
- close enrollment;
- sell now but defer access through another tested entitlement system.

Useful formulas are:

> **Late-join price = full price × remaining eligible service units ÷ total eligible service units**

> **Billing-gap charge = recurring amount × eligible days remaining ÷ days in the full billing cycle**

These are policy models, not automatic ArraySubs calculations. Define endpoints, rounding, tax, coupons, cancelled units, and rescheduling.

![Late-entry policy — an illustrative numbers for Fixed dates coordinate a shared calendar.](/blogs/fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows/model-visual.png)

## Worked academic cohort

Consider a course running September 1, 2026 through June 30, 2027, with enrollment August 15–October 15 and a $120 monthly price. A customer joins September 18.

The fixed boundary can stop renewals at or after June 30, but it does not decide whether the September join is full price or prorated. Anniversary billing could still create a full June 18 renewal with only 12 days remaining. Separately aligning renewals to the 1st could create October 1 through June 1 charges, but the initial gap policy and gateway support must be tested.

The clearer alternatives are:

1. anniversary billing with an enrollment cutoff or late-join offer;
2. separately aligned billing with a tested full/prorated/no-charge gap;
3. one seasonal upfront price when recurring billing adds no real value.

The product, cart, checkout, receipt, account, and policy should state access start, access end and timezone, due-today amount, renewal schedule, late-join rule, cancellation effect, refund rule, and next-cohort path.

## Renewals before and at the boundary

Current ArraySubs Pro code suppresses a renewal whose next payment is at or after the fixed end. It can still allow an earlier full renewal. Therefore fixed date is a hard stop, not a final-period pricing engine.

![Cohort operating loop — a focused cycle system for Fixed dates coordinate a shared calendar.](/blogs/fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows/operating-visual.png)

At the cutoff, current expiration can move active, trial, or on-hold subscriptions to Expired and unschedule renewal actions. Verify the actual entitlement integration; not every third-party content system is proven to revoke access at the same instant.

Current recurring-annual **Renew** advances the end date in source, but the reviewed path did not prove that previously unscheduled invoice/payment actions are restored. Do not promise automatic next-year billing without a complete gateway test. Expire plus explicit repurchase is the clearer default.

The fixed-period code schedules expiration. It does not prove a pre-expiry reminder sequence. Build and test enrollment confirmation, upcoming cutoff, final charge, access ending, and next-cohort communication separately.

## Timezone is part of the promise

ArraySubs Pro interprets a fixed date in the WordPress site timezone at local 23:59:59, converts that instant to UTC, and stores it. Customers in other zones do not redefine the shared boundary.

State the business timezone near the date. Changing the site timezone after subscriptions exist is a migration decision because stored UTC dates and scheduled actions are not automatically rewritten.

Avoid invalid or ambiguous annual dates. Current source does not fully validate every month/day combination, and PHP can normalize February 29 or impossible dates into March. Use a real date valid every year unless the intended leap-day policy is implemented and tested.

## Launch edge cases

Test:

- purchase before, inside, at the close, and after enrollment;
- purchase on or close to the cutoff;
- trials that approach or cross the end;
- renewal exactly at the cutoff and just before it;
- active, trial, on-hold, cancelled, and failed states;
- plan switches into and away from fixed products;
- variable products at variation level;
- coupons, tax, shipping, manual and automatic payment;
- site-timezone and daylight-saving boundaries;
- access removal and other active plans granting the same entitlement.

## Current ArraySubs Pro scope

Fixed-Date Subscriptions are Pro in the current product. They support absolute dates or recurring annual month/day cutoffs, optional enrollment open/close dates, end-date display, selected-variation settings, scheduled expiration, and Expire or recurring-annual Renew configuration.

They do not themselves provide late-join proration, access-start scheduling, billing alignment, a pre-expiry communication sequence, or a proven automatic next-year renewal flow. Flexible Renewal Sync is a separate Pro feature with its own gateway boundaries and must be tested together with fixed end.

The [fixed-period membership recipe](/deals/arraysubs/use-cases/recipes/fixed-period-membership/) owns product-editor setup. For the conceptual distinction, read [Recurring vs Fixed-Term Subscriptions](/deals/arraysubs/resources/subscription-foundations/recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model/).

## Final recommendation

Use fixed date only when the shared cutoff is part of the value promise. Publish the enrollment, late-join, first/final payment, access, timezone, refund, and next-period policies before sales open. Prefer expiration and explicit next-cohort purchase until recurring-annual continuation is proven on the current gateway.

[Compare ArraySubs plans](/deals/arraysubs/pricing/) after the date, alignment, access, and gateway design is complete.

## Frequently asked questions

### What is a fixed-date WooCommerce subscription?

It is a subscription whose customers share one calendar cutoff regardless of join date. Billing can still be monthly, annual, or another supported cadence.

### How is fixed date different from subscription length?

Fixed date ends everyone together. Fixed length gives every customer a rolling number of cycles from their own start.

### Does a fixed end automatically prorate late enrollment?

No. Current ArraySubs Pro sets the boundary and optional purchase window; pricing and alignment are separate decisions.

### Which timezone controls the end?

Current ArraySubs Pro uses the WordPress site timezone at local end of day, then stores the resulting UTC instant. State that business timezone to customers.

### What should happen at the cutoff?

Expire, stop future renewal actions, verify access, send communications, and offer the next term explicitly. Use recurring-annual continuation only after end-to-end proof.

## Disclosure, verification, and update log

ArraySubs is the product discussed by this site. Current official WooCommerce/WordPress documentation and ArraySubs 1.8.9/Pro 1.1.0 source were reviewed July 13, 2026. No live clock, gateway, renewal, switch, or expiration test was run.

- **July 2026:** Initial publication; Pro ownership, timezone storage, enrollment boundaries, and renewal cutoff behavior verified in source.
