# Research dossier: Fixed-Date WooCommerce Subscriptions for Cohorts, Seasons, and Enrollment Windows

## Research record

- **Article:** A010
- **Research date:** 2026-07-13
- **Focus keyword:** `fixed date WooCommerce subscriptions`
- **Intent:** Commercial investigation and implementation planning for merchants whose customers must share a calendar cutoff.
- **Article brief:** `web-content/content-plan/articles/010-fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows.md`
- **Evidence scope:** Current official WooCommerce and WordPress documentation, current ArraySubs core 1.8.9 source, ArraySubs Pro 1.1.0 source, and current first-party ArraySubs website data.
- **Evidence limits:** No live checkout, renewal, gateway, timezone-change, plan-switch, trial, or expiration test was run for this research task. Local implementation notes are code-review findings, not browser-tested outcomes.
- **No fabricated metrics:** All prices and dates below are labeled worked examples. They are not benchmarks, forecasts, or customer results.

## Editorial thesis

A fixed-date subscription solves a **calendar problem**, not a billing-frequency problem. It is appropriate when a cohort, season, academic year, license window, or event must end for everyone on the same date. It is not interchangeable with a fixed number of billing cycles, renewal-date alignment, an enrollment window, or a fixed-date membership-access plan.

The article should lead readers through five separate decisions:

1. **End rule:** shared date or rolling duration?
2. **Sales rule:** when can customers enroll?
3. **Late-join value:** full price, prorated price, a separate late-join offer, or no late enrollment?
4. **Money and access:** when do payments stop, and when does entitlement end?
5. **End-state rule:** expire, invite a new purchase, or continue into another annual period?

The main commercial risk is not configuring the date incorrectly. It is leaving the adjacent policies undefined and giving a late joiner less value, a surprise final charge, early access, or an unclear renewal promise.

## Recommended direct answer (40–60 words)

> A fixed-date WooCommerce subscription ends every buyer's agreement on the same calendar cutoff, while a fixed-duration subscription gives each buyer the same number of cycles from their own start date. Use fixed dates for cohorts, seasons, school years, or licenses, then define enrollment, late-join pricing, access, renewal, refunds, and timezone rules before launch.

This is 52 words and should appear near the top, before product-specific instructions.

## Key takeaways

1. **Fixed date and fixed duration are different promises.** A shared August 31 end is fixed date; 12 months from each buyer's signup is fixed duration.
2. **Enrollment is a purchase window, not an access schedule.** Opening sales early can also start billing and status-based access early unless another system controls entitlement.
3. **The fixed-date feature does not itself prorate late joins or align renewals.** Price policy and billing alignment are separate design choices.
4. **Site timezone is part of the product contract.** ArraySubs computes the local calendar boundary at 23:59:59 and stores the resulting instant in UTC.
5. **Current ArraySubs Pro code has material behaviors that need live verification before strong claims.** In particular, automatic recurring-annual continuation and pre-expiry reminders should not be described as proven end-to-end flows without test evidence.

## The terminology readers must not conflate

| Control | What it answers | Example | What it does **not** guarantee |
| --- | --- | --- | --- |
| **Fixed date** | On what shared calendar date does the term end? | Everyone ends August 31 | Equal duration for every joiner, proration, aligned renewal dates |
| **Fixed duration / cycle count** | How much time or how many payments does each customer get from their own start? | 12 monthly payments from signup | A shared school-year or season cutoff |
| **Billing-date alignment** | On what shared weekday/day/month do renewals occur? | All monthly renewals on the 1st | A shared end date |
| **Enrollment window** | When may customers buy? | Sales open August 1–September 15 | A future access start or a price adjustment |
| **Access window** | When can the member use the product/service? | Course access September 1–June 30 | Matching payment dates unless integrated |
| **Prepayment** | When is the term funded? | Entire season paid at checkout | A subscription relationship or aligned fulfillment |
| **Installments** | Is a fixed obligation divided into payments? | Four payments toward one course balance | Cancel-anytime subscription behavior |

### Fixed date versus fixed duration

WooCommerce's official subscription-product documentation describes a subscription length as expiration after a set number of payments. The initial purchase is included in that count. This is a rolling rule: two people who start on different dates normally finish on different dates.

ArraySubs Pro's fixed-period feature instead calculates one of two calendar boundaries:

- **Absolute date:** one specific `Y-m-d` end date.
- **Recurring annual cutoff:** a month and day, with this year's cutoff used when still ahead and next year's cutoff used after it has passed.

The ArraySubs Pro product editor treats fixed date and cycle-count length as mutually exclusive: enabling fixed end date clears the product's subscription length to zero. That is the correct model because a product should not have two competing end rules.

Primary reference: [WooCommerce — Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

Local implementation references:

- `arraysubspro/src/Features/FixedPeriodMembership/Services/EndDateCalculator.php`
- `arraysubspro/src/Features/FixedPeriodMembership/views/simple-product-fields.php`
- `arraysubspro/src/Features/FixedPeriodMembership/views/variation-fields.php`

### Fixed date versus billing-date alignment

WooCommerce's billing-date alignment documentation is explicit that alignment controls the **renewal date**. It can align weekly, monthly, or yearly renewal schedules and define whether the first gap is charged in full, charged proportionally, or not charged. It does not by itself create a shared subscription end date.

This distinction matters for a late join. A fixed end can stop the subscription on June 30, but anniversary billing may still charge a monthly renewal on June 18. Alignment could move monthly renewals to the 1st, but that is a second configuration and must be tested with the fixed-end rule and selected gateway.

Primary references:

- [WooCommerce — Guide to Billing Date Alignment](https://woocommerce.com/document/subscriptions/billing-date-alignment/)
- [WooCommerce — Creating an Aligned Subscription Product](https://woocommerce.com/document/subscriptions/billing-date-alignment/creating-an-aligned-subscription-product/)
- [WooCommerce — Renewal Process](https://woocommerce.com/document/subscriptions/renewal-process/)

### Fixed-date billing versus fixed-date membership access

WooCommerce Memberships can place membership access on fixed dates separately from the billing subscription. That is useful evidence for the article's broader rule: **billing and entitlement are related but separate state machines.** Do not use Woo Memberships terminology as if it documents ArraySubs Pro's fixed-period implementation.

Primary reference: [WooCommerce — Memberships and Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/).

## When a fixed date is the right model

### Use-case matrix

| Use case | Strong default | Enrollment approach | Late-join approach | End approach | Important caveat |
| --- | --- | --- | --- | --- | --- |
| One-time live course cohort | Absolute date | Open before start; close after an explicit late-join threshold | Prorate by remaining sessions, create a late-join variation, or defer to next cohort | Expire and sell the next cohort separately | Purchase date may start access before teaching begins unless entitlement is scheduled separately |
| School or academic year | Absolute date for a known year; recurring annual only if the commercial term truly repeats | Bounded admission window | Full-price deadline followed by prorated/closed admission | Expire/repurchase is safer to explain; test any automatic annual continuation | Site timezone, leap dates, and final-month billing need explicit tests |
| Sports or club season | Absolute date | Close when meaningful participation is no longer possible | Price by remaining games/sessions or close enrollment | Expire | Match schedule, playoffs, cancellations, and make-up dates may not fit a simple calendar day |
| Annual license or accreditation window | Recurring annual cutoff or absolute contract date | Defined application/approval window | Prorate only if contract and access rules permit | Expire or execute an explicit annual renewal | Legal/contract obligations may require an invoice/acceptance process rather than silent continuation |
| Event-to-date community/program | Absolute date | Open until the value threshold | Full price, time-based proration, or no late join | Expire | If there is only one payment and no recurring service, a normal product plus access rule may be clearer than a subscription |
| Seasonal subscription box | Absolute date | Open before fulfillment lock dates | Sell remaining boxes as a separate offer | Expire | Billing end and fulfillment/shipping cutoffs are different schedules |
| Association with one membership year | Recurring annual cutoff | Annual enrollment plus an explicit late-join policy | Full annual dues, prorated dues, or next-year start | Expire/repurchase or tested annual continuation | Customer-facing renewal consent and grace policy must be clear |
| Rolling 12-month membership | **Fixed duration, not fixed date** | Ongoing | Not applicable; each buyer receives a full year | Expire after 12 months or renew annually | A shared cutoff would shorten late joiners' terms |
| Monthly membership billed on the 1st | **Billing alignment, not fixed date** | Ongoing | First-gap proration/full/no-charge | Evergreen until cancellation | A billing day does not define an access end |
| Open-ended SaaS or replenishment | **Evergreen recurring** | Ongoing | Not applicable | Cancel/end on status rules | Fixed date adds an artificial cutoff |

### Simple decision tree

```text
Must every customer reach the same calendar cutoff?
├─ No
│  ├─ Should every customer get N cycles or X months? → fixed duration
│  └─ Should the relationship continue until cancellation? → evergreen recurring
└─ Yes → fixed date
   ├─ Is this a one-time known season/cohort? → absolute date
   └─ Is the same month/day genuinely reused each year? → recurring annual cutoff
      ├─ May customers join late? → define enrollment + late-join pricing
      └─ Must payments share a cycle day? → separately design billing alignment
         └─ At the cutoff: expire, repurchase, or tested annual continuation?
```

## Enrollment, proration, and late-join policy

### What ArraySubs Pro currently does

The fixed-period feature can store optional enrollment-open and enrollment-close dates and make the product or variation not purchasable outside the window. The checks use the WordPress site timezone:

- opening becomes effective at local `00:00:00`;
- closing remains effective through local `23:59:59`;
- an absolute product whose end date has passed is not purchasable.

The feature does **not** itself:

- delay subscription creation until a future cohort start;
- prorate the product price for a late join;
- align recurring billing dates;
- enforce a minimum amount of time remaining;
- validate that the enrollment start precedes the enrollment close;
- validate that a trial ends before the fixed cutoff.

Local implementation reference: `arraysubspro/src/Features/FixedPeriodMembership/Services/Hooks.php`.

### Late-join policy matrix

| Policy | Best when | Customer promise | Operational risk |
| --- | --- | --- | --- |
| Same full price | Most value is delivered immediately or dues fund shared benefits, not equal time | “The fee is the same regardless of join date and access ends on [date].” | Feels unfair if the product is primarily time-based |
| Prorate by remaining calendar time | Value accrues approximately evenly with time | “You pay for the remaining portion through [date].” | Calendar days may not match sessions, fulfillment, or support cost |
| Prorate by remaining service units | Courses, games, boxes, lessons, or scheduled deliverables | “You pay for the X remaining included units.” | Needs an authoritative remaining-unit count and refund rule for cancellations |
| Separate late-join product/variation | Late joiners receive a materially different package | “This late-entry option includes [scope].” | More catalog and reporting complexity |
| Subsidize the gap to the next aligned renewal | Merchant wants a common renewal day and accepts acquisition subsidy | “Access begins now; the first recurring charge is [date].” | Cash gap, abuse, tax/coupon interactions, and gateway support |
| Close enrollment | Late participation would not deliver a good outcome | “Enrollment is closed; join the next cohort.” | Fewer sales, but often the cleanest customer experience |
| Defer access to the next cohort | Demand can be captured without forcing a late start | “Purchase now; access begins [date].” | Requires separate future access/provisioning logic and clear refund handling |

### Two different proration questions

The article should distinguish:

1. **Access/value proration:** How much of the cohort or season remains?
2. **Payment-gap proration:** How much time remains until the next aligned billing boundary?

They can produce different prices. A course may have 70% of calendar time remaining but only 40% of live sessions remaining.

Transparent arithmetic options:

> **Late-join price = full-period price × remaining eligible service units ÷ total eligible service units**

> **Initial billing-gap charge = recurring amount × eligible days remaining in the billing cycle ÷ eligible days in the full billing cycle**

These are editorial models, not claims about ArraySubs' automatic calculations. The merchant must define whether endpoints are inclusive, how amounts are rounded, how taxes/coupons apply, and what happens when a unit is cancelled or rescheduled.

### Relationship to ArraySubs Pro renewal synchronization

ArraySubs Pro has a separate Flexible Renewal Sync implementation. Current source indicates that it can align supported daily/weekly/monthly/yearly cycles and apply a full, prorated, or no-charge initial gap. It is not part of the Fixed Period Membership feature.

Code-review constraints that must be disclosed or tested before publication:

- renewal synchronization is not applied to trials;
- current gateway support code includes ArraySubs manual/offline handling and Stripe integration;
- PayPal and Paddle are explicitly treated as unsupported for renewal synchronization unless extended through filters;
- combining synchronization with fixed end date needs an end-to-end checkout and final-renewal test.

Do not promise that enabling fixed date will automatically create fair final-period billing.

Local implementation references:

- `arraysubspro/src/Features/FlexibleRenewalSync/`
- `arraysubspro/src/Features/FixedPeriodMembership/`

## Worked example: an academic cohort

The following is a design scenario, not a tested configuration or recommended price.

### Offer

- Access/teaching period: **September 1, 2026 through June 30, 2027**
- Enrollment window: **August 15 through October 15, 2026**
- Recurring price: **$120/month**
- Fixed end: **June 30, 2027**
- End behavior: **Expire**
- WordPress site timezone: **America/New_York**
- Example late join: **September 18, 2026**

### What the fixed-period feature contributes

For an absolute end date, current ArraySubs Pro code builds June 30, 2027 at `23:59:59` in the WordPress site timezone, converts that instant to UTC, stores it on the subscription, and schedules the expiration action. On June 30, New York observes daylight saving time, so this example boundary corresponds to **July 1, 2027 at 03:59:59 UTC**.

That UTC conversion is arithmetic based on the timezone rule, not proof from a live subscription record.

### What it does not decide

- If a customer buys on August 20, the purchase and subscription can start then. The enrollment-open date does not hold access until September 1.
- If the September 18 joiner retains anniversary billing, a renewal can occur on June 18 even though only 12 days remain before June 30.
- The fixed-date feature blocks a renewal whose next-payment instant is **at or after** the fixed end. It does not reduce a June 18 renewal simply because the remaining period is short.
- A pre-expiry reminder is not proven by the fixed-date code path inspected for this dossier.

### Better design choices

The merchant can choose one of these explicitly:

**Option A — anniversary billing plus a late-join product policy**

- Keep renewals on the customer's signup day.
- Close enrollment early enough that the final full renewal still represents acceptable value, or use a separate late-join price/variation.
- Show the fixed end and the expected first/last renewal schedule before purchase.

**Option B — align monthly renewals separately**

- Align supported monthly renewals to the 1st.
- Decide whether August 20–September 1 is prorated, fully charged, or subsidized.
- Then renew October 1 through June 1; a July 1 renewal would be at/after the June 30 end and should be blocked by the fixed-date gate.
- Test the exact gateway, tax, coupon, checkout, and schedule combination. Do not infer support from the presence of both features.

**Option C — one seasonal price**

- Collect an upfront course/season amount rather than creating monthly recurring ambiguity.
- If enrollment is late, calculate a transparent late-join amount by remaining sessions or keep one disclosed dues price.
- Use a subscription only if ongoing status, scheduled orders, or another recurring relationship is genuinely needed.

### Expected access/end communication

The product, cart, checkout, receipt, account page, and policy should consistently answer:

- access begins: [date/event];
- access ends: June 30, 2027 at 11:59:59 p.m. in the stated site/business timezone;
- amount due today: [calculated amount];
- renewal amount and dates: [calculated schedule];
- late-join treatment: [full/prorated/separate offer];
- cancellation effect: future payments versus paid-through access;
- refund rule: before start, partial delivery, merchant cancellation, and after completion;
- next cohort/season: requires new purchase or follows a separately disclosed continuation rule.

## Access, email, renewal, expiration, and refund design

### Access

ArraySubs core's MembersAccess role manager removes subscription-linked roles when a subscription becomes expired or cancelled, provided the user has no other active subscription that grants the same role. This supports status-linked access, but it is not proof that every third-party content restriction or integration will revoke access at exactly the same instant.

Article instruction: say **“verify the entitlement integration”**, not “all access automatically stops.”

Local reference: `arraysubs/src/Features/MembersAccess/Services/RoleManager.php`.

### Expiration lifecycle

Current fixed-period code schedules the centralized ArraySubs expiration action for future end timestamps. Core expiration changes eligible active/trial/on-hold subscriptions to `arraysubs-expired`, unschedules renewal actions, and fires the expired lifecycle hook. Fixed date can therefore override a trial or on-hold state at the calendar boundary.

Local references:

- `arraysubspro/src/Features/FixedPeriodMembership/Services/Hooks.php`
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
- `arraysubs/src/Features/RecurringBilling/Services/ExpirationChecker.php`

### Renewal boundary

Current code prevents a renewal invoice when:

- the current instant is at/after the fixed end; or
- the subscription's next payment is at/after the fixed end.

After a successful renewal, if the next scheduled payment is at/after the end, it unschedules invoice generation, payment processing, and renewal reminders. The boundary is `>=`: a payment exactly at the end is blocked.

This is the useful customer-facing rule: **renewals before the boundary may still be full renewals; renewals at or after the boundary are suppressed.** It is not a proration rule.

### Recurring-annual “Renew” behavior: publication warning

The product editor offers an end behavior of **Expire** or **Renew**, and `Renew` is available for recurring annual cutoff products. At expiration, current code calculates the next annual boundary, updates `_end_date`, reschedules expiration, and prevents the expired status change.

However, code review did not find an explicit call in that path to restore renewal invoice/payment actions that may previously have been unscheduled at the old boundary. The hourly renewal-recovery path may interact with an overdue date, but this dossier did not prove that a successful automatic charge schedule is restored. Therefore:

- do not publish “ArraySubs automatically bills the next annual period” as a verified fact;
- use **Expire** in the main worked example;
- require an end-to-end test of invoice generation, automatic payment, end-date advance, status, access, and next renewal before recommending recurring-annual `Renew`;
- if not tested, frame renewal into the next cohort as an explicit repurchase or manual/business process.

This is a current-source limitation and should be escalated to product engineering, not hidden in marketing copy.

### Emails

ArraySubs core contains an expired-subscription email path. An expiring-soon hook/handler is also present in source, but repository inspection did not find the fixed-period feature scheduling the expiring-soon action. The fixed-period feature directly schedules expiration only.

Article instruction:

- describe the expired notification only after a real test if a user-facing guarantee is needed;
- do not claim automatic pre-expiry reminders for fixed-date subscriptions based solely on the current code;
- recommend scheduling and testing a separate customer-communication sequence: enrollment confirmation, upcoming cutoff, final renewal/charge, access ending, and next-cohort offer.

### Refunds and cancellations

A fixed date does not answer the refund question. The policy should separately define:

- cancellation of future renewals;
- access through the already-paid period;
- refund before service/access starts;
- partial refund after some sessions/deliveries;
- merchant-cancelled sessions or shortened seasons;
- late-join price refunds;
- failed final payment and grace treatment;
- rescheduling or extending the cohort end.

Do not give universal legal/accounting advice. Consumer rules depend on location, offer type, and when performance begins. The article should tell readers to get qualified review for their actual regions and terms.

## ArraySubs product truth gate

### Ownership and availability

Fixed-Date Subscriptions are **ArraySubs Pro**, not core/free, in the current workspace:

- `arraysubspro/src/Boot.php` loads `Features\FixedPeriodMembership\Provider`;
- `web-content/app/deals/arraysubs/features/_data.ts` marks the feature Pro;
- the free-versus-pro comparison and `arraysubs/readme.txt` align with Pro ownership.

This resolves an older-data conflict mentioned in the article brief. A010 should use the current Pro ownership and include a normal commercial disclosure before the ArraySubs-specific section.

### Verified current fields and behavior

Current source exposes fixed-period settings for simple subscription products and subscription variations:

- enable fixed end date;
- choose recurring annual cutoff or absolute date;
- choose month/day or calendar date;
- optionally set enrollment open/close;
- choose Expire or, for recurring annual, Renew;
- show end/enrollment information on product, cart, and checkout surfaces;
- use the selected variation's values for a variable product;
- clear cycle-count subscription length when fixed end is enabled.

On subscription creation, the implementation reads the subscription's stored start date, calculates the boundary, stores the end in UTC, saves fixed-period metadata, and schedules expiration if the calculated instant is still in the future.

### Required internal recipe link

The existing narrow recipe is:

`/deals/arraysubs/use-cases/recipes/fixed-period-membership/`

Link to it for product-editor setup instead of reproducing the recipe step by step. The article should own decision strategy, policies, examples, and edge cases.

### No-backward-compatibility editorial note

The workspace is in development and the canonical instructions say backward compatibility is not required for code changes. That does not change the article's accuracy burden: describe the current release/source only, include a reviewed-on date, and retest behavior after fixes or release changes.

## Timezone behavior and calendar edge cases

### Timezone model

ArraySubs uses the WordPress **site timezone** to interpret the calendar date, then converts the end-of-day instant to UTC for storage and scheduling. It does not use each customer's timezone.

Example:

- cutoff: August 31, 2026 at 23:59:59;
- site timezone: Asia/Dhaka (UTC+6 at this date);
- stored instant: August 31, 2026 at 17:59:59 UTC.

This follows WordPress' site-timezone model. WordPress provides `wp_timezone()` for the configured timezone and distinguishes localized display time from UTC storage.

Primary references:

- [WordPress Developer Reference — `wp_timezone()`](https://developer.wordpress.org/reference/functions/wp_timezone/)
- [WordPress Developer Reference — `current_time()`](https://developer.wordpress.org/reference/functions/current_time/)
- [WooCommerce Subscriptions — Data Structure](https://woocommerce.com/document/subscriptions/develop/data-structure/)

### Edge-case matrix

| Edge case | Current code behavior / risk | Launch treatment |
| --- | --- | --- |
| Customer is in another timezone | Shared boundary is based on the WordPress site timezone | State the business timezone near the end date; avoid ambiguous “midnight” wording |
| Daylight-saving transition | The local cutoff remains 23:59:59, while its UTC offset may change by season/year | Test dates in the actual IANA timezone, especially annual cutoffs |
| Site timezone changed after sales | Existing subscriptions already store UTC end instants and scheduled actions; changing the site setting does not automatically rewrite those records | Freeze timezone after launch or plan an audited migration/recalculation |
| Recurring annual date after this year's cutoff | Code rolls to next year's month/day | Confirm that a post-cutoff purchase should receive almost a full year rather than be blocked until next enrollment |
| Purchase on cutoff day | A purchase earlier that day can end that same day; only a join instant at/after 23:59:59 rolls recurring annual to next year | Close enrollment before the cutoff or test precise boundary behavior |
| February 29 recurring annual | PHP normalization can move a non-leap next-year result into March; code does not define a February 28 policy | Avoid Feb 29 annual cutoffs until product behavior is explicitly validated and tested |
| Impossible date such as February 31 | Current UI can offer days 1–31 for every month and calculator validation does not use `checkdate()`; PHP may normalize into March | Use only real calendar dates and treat stronger validation as a product fix |
| Enrollment start is after close | No current cross-field validation was found; the product can effectively remain unpurchasable | Validate operationally and add product validation before relying on it |
| Absolute end is in the past | Product becomes not purchasable | Also verify cached pages, variations, API/cart entry, and plan-switch paths |
| Absolute end is very near | Product remains purchasable until it passes; full-price/renewal rules can still create poor value | Close enrollment or provide a late-join policy |
| Trial extends beyond end | Expiration can occur during trial before a paid renewal | Require `trial end < fixed end` or explicitly support a zero-paid cohort |
| Subscription is on hold at cutoff | Core fixed-date expiration can still move it to expired | Explain the calendar override and test gateway/retry communications |
| Plan switch into fixed product | Current code recalculates from switch time; a past absolute date may store a past end without scheduling a future expiration | Block invalid switches or test and fix this path before publication |
| Plan switch away from fixed product | Current code clears fixed metadata and end date | Test renewal rescheduling and access after switch |
| Variable product | Variation configuration overrides product-level source because selected variation is evaluated first | Test every sold variation, not only the parent product |
| Renewal exactly equals cutoff | Current comparison blocks when next payment is `>=` end | Make the schedule visible so the customer is not expecting a charge at the boundary |

### Calendar normalization evidence

PHP's date parser normalizes invalid dates rather than necessarily rejecting them. For example, a constructed `2026-02-31` can become March 3, and advancing `2024-02-29` by one year can become March 1, 2025. Because the current recurring-annual calculator bounds the day to 1–31 without a complete month/day validity check, the article should recommend ordinary dates valid every year and the product should add validation before marketing unusual cutoff dates.

## Launch checklist for the article

### Product model

- [ ] Confirm every participant really should share one cutoff.
- [ ] Choose absolute date versus recurring annual month/day.
- [ ] Confirm fixed date is preferable to rolling cycles, aligned billing alone, or evergreen renewal.
- [ ] Define the business/site timezone in plain language.
- [ ] Use a real calendar date valid for the chosen annual pattern.

### Enrollment and value

- [ ] Set sales open and close dates and verify their inclusive local-day behavior.
- [ ] Define whether purchase starts access immediately or another system starts it later.
- [ ] Decide full price, time-based proration, service-unit proration, separate late-join offer, or closed enrollment.
- [ ] Define a minimum remaining term/value threshold.
- [ ] Check trial length against the cutoff.

### Billing

- [ ] List the exact amount due today, renewal price, first renewal date, final possible renewal date, and end date.
- [ ] Decide whether anniversary billing is acceptable.
- [ ] If using renewal synchronization, verify gateway support and test the combination with fixed end.
- [ ] Test coupons, taxes, shipping, zero-total first orders, failed renewals, retries, and manual/offline payments.
- [ ] Confirm renewals at/after the boundary are suppressed and earlier renewals are commercially fair.

### End state and access

- [ ] Prefer Expire unless recurring-annual Renew has been proven end to end for the release.
- [ ] Test the actual access/membership integration at expiration.
- [ ] Test active, trial, on-hold, cancelled/pending-cancellation, and failed-payment cases.
- [ ] Define repurchase, next-cohort invitation, grace access, and re-enrollment.
- [ ] Decide what happens when a customer also has another active plan granting the same role/access.

### Communications and policy

- [ ] Show date/timezone, billing schedule, and late-join rule before checkout.
- [ ] Test product, variation, cart, checkout, receipt, account, admin, and email copy.
- [ ] Build explicit upcoming-cutoff communications; do not assume the fixed feature schedules them.
- [ ] Publish cancellation, refund, reschedule, shortened-season, and merchant-failure policies.
- [ ] Obtain legal/accounting review where contract, tax, installment, or consumer-law treatment matters.

### Operations and proof

- [ ] Run a clock-controlled test before enrollment, inside the window, at close/end boundaries, and after end.
- [ ] Inspect stored UTC dates and site-local display.
- [ ] Inspect Action Scheduler for expiration, invoice, payment, and reminder actions.
- [ ] Test at least one complete short-cycle renewal/expiration in the actual gateway.
- [ ] Record WordPress, WooCommerce, ArraySubs/Pro, PHP, timezone, checkout type, gateway, tax, coupon, product, order, and subscription identifiers.
- [ ] Retest after timezone, gateway, scheduler, fixed-period, renewal-sync, or email changes.

## Limitations and “not a fit” guidance

- Fixed date is not a fit when every customer deserves the same rolling duration from signup.
- A shared billing day alone is not a reason to set a shared end.
- An enrollment window alone is not an access scheduler.
- ArraySubs fixed-period configuration is not a late-join pricing engine.
- A fixed end does not automatically make final-period charges proportionate.
- A fixed end does not create a non-cancellable installment obligation.
- A fixed end does not guarantee that every membership/content integration revokes access correctly.
- Very short terms or one-payment events may be clearer as normal products plus scheduled access/fulfillment.
- Automatic recurring-annual continuation is not publication-safe as an automatic-billing claim until tested against the current source behavior described above.
- Pre-expiry reminder scheduling is not proven from the fixed-period code path reviewed here.
- Changing the WordPress site timezone after launch is a migration decision, not a harmless display preference.
- Calendar rules, payment gateway support, plugin tiers, and code paths are time-sensitive; add a “reviewed on” date and retest at publication.

## Five FAQ candidates

### 1. What is a fixed-date WooCommerce subscription?

A fixed-date subscription gives customers a shared calendar cutoff, such as June 30 or August 31, regardless of when each customer joined. The billing frequency can still be monthly, annual, or another supported cadence; the fixed date defines the end, not the payment interval.

### 2. What is the difference between a fixed date and a fixed subscription length?

A fixed date ends everyone on the same calendar day. A fixed subscription length gives each customer the same number of cycles or amount of time from their own start, so customers who join on different days usually end on different days.

### 3. Does a fixed end date automatically prorate late enrollment?

No. Current ArraySubs Pro fixed-period code sets the end boundary and optional purchase window; it does not calculate a lower late-join price. Merchants must define full-price, prorated, separate-offer, subsidized, deferred, or closed-enrollment rules and test any billing-alignment feature separately.

### 4. Which timezone controls a fixed-date subscription?

Current ArraySubs Pro code uses the WordPress site timezone, interprets the calendar end at local 23:59:59, and stores the resulting instant in UTC. The customer timezone does not change the shared boundary, so the customer-facing date should name the business timezone.

### 5. What should happen when the fixed date arrives?

The clearest default is to expire the subscription, stop future renewal actions, verify access removal, send the promised communications, and offer the next cohort or season separately. Use recurring-annual continuation only after testing end-date advancement, invoice creation, automatic payment, status, access, and the next schedule end to end.

## Visual research and art direction

The article can support many images without becoming decorative. Use clean flat editorial illustration, off-white backgrounds, navy/charcoal text, muted blue/teal/ochre/coral accents, crisp 1–2 px outlines, and consistent geometric/human figures. Avoid gradients, neon, glassmorphism, 3D chrome, random blobs, and fake analytics.

### 1. Hero: “one shared finish line”

- **Format:** Flat editorial illustration, 16:9.
- **Composition:** Three customers joining a calendar track at different points but reaching one bold August 31 finish line. Small storefront/calendar cues; generous title-safe negative space.
- **Purpose:** Makes fixed date understandable before the first paragraph.

### 2. Three-lane comparison timeline

- Lane A: fixed duration, with equal-length bars starting on different signup dates.
- Lane B: fixed date, with different-length bars ending on the same date.
- Lane C: aligned billing, with recurring markers on the same day but open ends.
- This should be a code/SVG-like editorial diagram, not an AI-generated text-heavy raster image.

### 3. Use-case decision matrix

- Horizontal categories: rolling membership, cohort, season, annual license, billing-day alignment.
- Vertical choices: evergreen, fixed cycles, absolute date, recurring annual cutoff, alignment.
- Use checkmarks and one-line fit statements; no invented scores.

### 4. Late-join price bars

- Four equal-width flat bars representing Full Price, Calendar Proration, Service-Unit Proration, and Closed Enrollment.
- Show formulas/labels, not claimed conversion or revenue results.
- A pie chart is not recommended here because the policies are alternatives, not parts of one whole.

### 5. Academic cohort worked-example timeline

- Enrollment opens August 15, teaching starts September 1, sample join September 18, enrollment closes October 15, aligned monthly markers, final June 1 renewal, June 30 end.
- Pair billing and access as two parallel tracks.

### 6. Site-local to UTC illustration

- Split clock/calendar: “Business/site time: Aug 31, 11:59:59 p.m.” flows through an arrow to “Stored UTC instant.”
- Include a small globe with two customer silhouettes to show that customer location does not redefine the cutoff.

### 7. Renewal boundary diagram

- A horizontal bar ending at cutoff.
- Mark renewal before end as “may run at full amount.”
- Mark renewal at/after end as “blocked by fixed-date gate.”
- This is critical because it visualizes why fixed end is not proration.

### 8. Annual cutoff flowchart

- “Has this year's local cutoff passed?”
- No → use this year's cutoff.
- Yes → use next year's cutoff.
- Add warning card: cutoff-day sale can produce a same-day term; invalid Feb dates need validation.

### 9. Billing, access, email swimlane

- Payment lane: initial charge → renewals → no renewal at/after end.
- Access lane: activate → remain active → revoke/transition at expired status.
- Email lane: confirmation → explicit scheduled reminders → expired/next-cohort message.
- Use a dashed treatment for reminder automation because current fixed-period scheduling is not proven.

### 10. Edge-case card set

- Trial runs past end.
- Enrollment opens after it closes.
- February 29/31 recurring cutoff.
- Timezone changed after launch.
- Switch into a past absolute end.
- Same access role also granted by another active subscription.

### 11. Launch checklist board

- Five columns/icons: Product, Enrollment, Billing, Access, Communication.
- Use human shapes where useful: merchant, customer, support reviewer.
- Keep text short enough to remain legible on mobile.

### 12. Current ArraySubs lifecycle diagram

```text
Product/variation fixed-date settings
        ↓
Subscription created from start date
        ↓
Local calendar end (23:59:59) → UTC _end_date
        ↓
Expiration action scheduled
        ↓
Renewal whose next payment is at/after end is suppressed
        ↓
At end: expire OR advance recurring-annual end (requires renewal E2E proof)
```

Keep this factual and label untested behavior as such.

## Internal-link plan

- Primary commercial pillar: `/deals/arraysubs/`
- Fixed-period setup recipe: `/deals/arraysubs/use-cases/recipes/fixed-period-membership/`
- Related conceptual article A005: recurring versus fixed term.
- Related article A009: prepaid/fixed-cycle subscriptions; use it to distinguish rolling cycles from shared dates.
- Related article A011: lifetime access; clarify that lifetime is neither fixed date nor renewable term.
- Related article A012: refunds/cancellation/end-state design if published.
- Products/checkout hub and monthly-versus-annual article where they exist in the current route map.

Use descriptive anchor text such as “fixed-period membership setup,” “rolling fixed-cycle subscriptions,” and “monthly versus annual billing.” Verify every route before publication.

## Suggested article structure

1. Hook: two customers join the same season but must finish on one date.
2. Direct answer and six-term comparison.
3. When fixed date fits—and when fixed duration or alignment fits better.
4. Absolute versus recurring annual cutoff.
5. Enrollment and late-join strategy.
6. Worked academic cohort: access, billing, and final-period problem.
7. Timezone, cutoff, trial, switch, and invalid-date edge cases.
8. ArraySubs Pro truth: what it currently provides and what requires separate configuration/testing.
9. Launch checklist.
10. Five FAQs, limitations, commercial disclosure, and CTA to the setup recipe/product page.

Do not turn the article into a product-editor walkthrough; the recipe owns that intent.

## Publication metadata and proof requirements

- Add a real named author and a technical reviewer; do not invent identities or credentials.
- Show “Reviewed on July 13, 2026” or the actual final review date.
- Place a visible disclosure before the ArraySubs-specific section: the publisher develops/sells ArraySubs and may benefit from purchases.
- If an E2E test is completed, publish the environment: WordPress, WooCommerce, ArraySubs core/Pro, PHP, timezone, checkout type, gateway, tax mode, coupons, product/variation ID, order ID, subscription ID, and Action Scheduler evidence.
- If no E2E test is completed, say the implementation discussion is based on current source review and official documentation.
- Re-review after any FixedPeriodMembership, FlexibleRenewalSync, ActionScheduler, RecurringBilling, email, plan-switching, or gateway release.

## Source ledger

### Official WooCommerce and WordPress sources

1. [WooCommerce — Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) — fixed payment-count length and recurring product schedule.
2. [WooCommerce — Guide to Billing Date Alignment](https://woocommerce.com/document/subscriptions/billing-date-alignment/) — renewal-date alignment, first-payment choices, site timezone caveat.
3. [WooCommerce — Creating an Aligned Subscription Product](https://woocommerce.com/document/subscriptions/billing-date-alignment/creating-an-aligned-subscription-product/) — alignment behavior and trial/interval details.
4. [WooCommerce — Renewal Process](https://woocommerce.com/document/subscriptions/renewal-process/) — how renewal scheduling and aligned renewals are handled.
5. [WooCommerce — Subscription Status Guide](https://woocommerce.com/document/subscriptions/statuses/) — active, pending cancellation, cancelled, and expired concepts in WooCommerce Subscriptions.
6. [WooCommerce — Add or Modify a Subscription](https://woocommerce.com/document/subscriptions/add-or-modify-a-subscription/) — manual schedule editing and timezone considerations in WooCommerce Subscriptions; do not generalize this UI behavior to ArraySubs product dates.
7. [WooCommerce — Subscription Data Structure](https://woocommerce.com/document/subscriptions/develop/data-structure/) — schedule storage and UTC model.
8. [WooCommerce — Subscription Product versus Subscription](https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/) — product template versus customer subscription record.
9. [WooCommerce — Customers Extend a Subscription Expiration Date](https://woocommerce.com/document/subscriptions/customers-extend-subscription-expiration-date/) — set-length expiration changes and gateway limitations.
10. [WooCommerce — Memberships and Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) — separation of subscription billing and fixed/specific membership access.
11. [WordPress Developer Reference — `wp_timezone()`](https://developer.wordpress.org/reference/functions/wp_timezone/) — configured site timezone object.
12. [WordPress Developer Reference — `current_time()`](https://developer.wordpress.org/reference/functions/current_time/) — site-local versus UTC time handling.

### First-party ArraySubs sources

1. `arraysubspro/src/Boot.php`
2. `arraysubspro/src/Features/FixedPeriodMembership/Provider.php`
3. `arraysubspro/src/Features/FixedPeriodMembership/Services/EndDateCalculator.php`
4. `arraysubspro/src/Features/FixedPeriodMembership/Services/Hooks.php`
5. `arraysubspro/src/Features/FixedPeriodMembership/views/simple-product-fields.php`
6. `arraysubspro/src/Features/FixedPeriodMembership/views/variation-fields.php`
7. `arraysubspro/src/Features/FlexibleRenewalSync/`
8. `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
9. `arraysubs/src/Features/RecurringBilling/Services/ExpirationChecker.php`
10. `arraysubs/src/Features/RecurringBilling/Services/RenewalScheduler.php`
11. `arraysubs/src/Features/MembersAccess/Services/RoleManager.php`
12. `arraysubs/src/Supports/ActionScheduler.php`
13. `web-content/app/deals/arraysubs/features/_data.ts`
14. `web-content/app/deals/arraysubs/use-cases/_recipes.ts`
15. `arraysubs/readme.txt`

## Writer handoff: claims to avoid without new proof

- “Fixed date automatically prorates late joiners.”
- “Enrollment open date schedules a future access start.”
- “All gateways support synchronized billing with fixed date.”
- “Every content/membership integration revokes access automatically.”
- “Customers receive an automatic expiring-soon reminder.”
- “Recurring annual Renew automatically bills the next annual period.”
- “A fixed-date subscription is the same as a fixed number of cycles.”
- “Billing on the 1st creates a shared term end.”
- “A fixed end creates installments or guarantees the remaining balance.”
- “Changing the WordPress timezone only changes display.”
- “February 29 or impossible month/day cutoffs follow an obvious business rule.”

