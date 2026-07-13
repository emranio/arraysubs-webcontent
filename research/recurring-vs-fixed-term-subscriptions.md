# Research brief: Recurring vs Fixed-Term Subscriptions: Choose the Right Billing Model

## Research record

- **Article:** A005
- **Research date:** 2026-07-13
- **Focus keyword:** `recurring vs fixed term subscriptions`
- **Intent:** Commercial investigation; help a first-time WooCommerce operator choose a duration and collection model without confusing a subscription with prepayment or installments.
- **Evidence scope:** Current official WooCommerce documentation, current ArraySubs/ArraySubs Pro source, and current first-party ArraySubs site data. No competitor blogs or unsourced benchmarks were used.
- **No fabricated metrics:** Cash examples below are labeled arithmetic scenarios, not forecasts or observed customer data.
- **No live ArraySubs checkout was run for this research task.** Local code observations are current-source findings, not browser-test results.

## Editorial thesis

The query contains a hidden category error: **recurring describes when money is collected; fixed-term describes when the relationship ends.** A plan can be both recurring and fixed-term. The most useful article will correct that error, then give readers a two-axis decision:

1. **Duration:** ongoing until cancellation, fixed number of cycles, or fixed calendar end.
2. **Collection:** periodic payments or full prepayment.

This produces four practical patterns instead of a false binary:

| Model | Duration rule | Collection rule | Plain-language promise |
| --- | --- | --- | --- |
| Evergreen recurring | No preset final cycle/date | Periodic | “Pay each period while you keep the service.” |
| Fixed-cycle recurring | A preset number of paid cycles | Periodic | “Pay each period for up to N payments, then the plan expires.” |
| Prepaid fixed-term | A preset duration or delivery count | One main upfront payment | “Pay the term now; receive access/deliveries over that term.” |
| Fixed-date term | A shared calendar cutoff; collection can be periodic or upfront | Periodic or upfront | “Everyone’s access reaches the same date.” |

Do not let A005 become A010's detailed fixed-date implementation guide. Here, fixed date is a decision category and a warning against misusing cycle counts; A010 owns cohorts, proration, enrollment windows, and configuration.

## Direct-answer fact pattern

> Choose an ongoing recurring subscription when value continues indefinitely and the customer should keep paying until cancellation. Choose a fixed-term model when delivery or access has a defined finish. Then distinguish rolling fixed cycles, which end after each customer's payment count, from fixed dates, where everyone reaches the same calendar cutoff.

This is 51 words. It answers the query while correcting the duration-versus-collection confusion.

## Definitions and verified behavior

### Ongoing / evergreen recurring subscription

An ongoing subscription charges on its configured cadence and has no preset final payment. WooCommerce's current subscription-plan documentation says subscriptions renew indefinitely by default until the subscriber or store manager cancels. This fits value that continues without a known completion milestone.

Examples: replenishment, hosted software, maintenance, an active community, ongoing support, and a continuing publication.

Primary source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

### Fixed-cycle recurring subscription

A fixed-cycle subscription still uses recurring payments, but stops after a configured payment count or duration. WooCommerce's current plan interface calls this expiration after a set number of payments. The total includes the initial purchase: 12 monthly payments means one signup payment and 11 later renewals. A plan billing every two months for six total payments lasts 12 months.

This model is **relative to each customer's start/payment schedule**. Two customers who begin on different dates normally finish on different dates.

Woo also states that a customer can cancel an expiring subscription before its scheduled expiration. Therefore fixed-cycle recurring billing is not automatically a non-cancellable installment obligation.

Primary source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

### Fixed-date term

A fixed-date term ends on a shared calendar date. A January joiner and a March joiner can both end on August 31. This is different from:

- **Fixed-cycle:** each customer completes N cycles from their own start.
- **Billing-date alignment:** renewals happen on a shared weekday/day/month, but alignment does not itself define a shared access end.

WooCommerce's billing-alignment guide explicitly describes alignment as a renewal-date control and says enabling it does not retroactively realign existing subscriptions. WooCommerce Memberships independently supports access between fixed dates, showing why access duration and subscription billing should be treated as separate concepts.

Primary sources: [Guide to Billing Date Alignment](https://woocommerce.com/document/subscriptions/billing-date-alignment/) and [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/).

### Prepaid fixed-term

Prepaid means the customer funds the defined term in advance. It is not synonymous with “a subscription that eventually expires.” A fixed-cycle plan charging six monthly payments is not prepaid merely because it ends after payment six.

Official Woo documentation shows two different prepaid implementations:

- The Subscriptions FAQ describes collecting the full amount as a sign-up fee with $0 recurring orders on the fulfillment cadence. Woo warns that customers see $0 renewal orders and that cancellation/suspension may stop future fulfillment even though the term was paid.
- The separate Prepaid for WooCommerce Subscriptions extension creates prepaid options for a regular subscription, charges the plan price for the prepaid period, and can continue creating $0 orders for later pieces/deliveries.

Primary sources: [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) and [Prepaid for WooCommerce Subscriptions](https://woocommerce.com/document/prepaid-for-woocommerce-subscriptions/).

### Installment plan is a separate commercial promise

An installment plan divides a fixed purchase obligation into scheduled payments. A fixed-cycle subscription may look similar on an order timeline, but Woo's documented ability to cancel an expiring subscription means the remaining balance is not inherently guaranteed. Do not call fixed-cycle billing “installments” unless the product, contract, cancellation rules, and tooling actually create and manage that obligation.

ArraySubs' current product surface lists **Installment / Split Payments** as Pro and **coming soon**. The article must not present it as shipped.

First-party sources: [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) and local `web-content/app/deals/arraysubs/features/page.tsx`.

## Fixed-cycle versus fixed-date: the non-negotiable distinction

| Question | Fixed-cycle | Fixed-date |
| --- | --- | --- |
| What ends the term? | Completion of N paid billing cycles/payments | Arrival of a calendar cutoff |
| Does join date change end date? | Normally yes | Not for a shared absolute cutoff |
| Best mental model | Rolling term | Cohort/season window |
| Typical example | Six monthly coaching payments from each signup | Every school-year membership ends August 31 |
| Main pricing risk | Cancellation or payment failure before all cycles complete | Late joiners receive less time unless pricing/access is adjusted |
| Main operational risk | Counting trials, $0 orders, pauses, and payment failures correctly | Time zone, cutoff, enrollment, proration, renewal-at-period-end policy |

Use a boxed statement in the article: **Fixed-cycle, fixed-date, billing-date alignment, prepayment, and installments are five different controls.**

## Cash, access, renewal, and cancellation behavior

### Cash collection

**Evergreen recurring:** cash arrives over time and continues only while the customer remains subscribed and payments succeed. It generally lowers the initial amount, but the final customer value is unknown at signup.

**Fixed-cycle recurring:** cash also arrives over time, but the scheduled maximum is capped by the payment count. The scheduled total is not guaranteed when customers can cancel or payments can fail.

**Prepaid fixed-term:** most term cash arrives upfront. This improves immediate cash timing but also concentrates refund, fulfillment, and accounting obligations. The writer should state that merchants need an explicit refund and delivery policy and qualified accounting/legal advice where relevant, not prescribe revenue recognition.

**Fixed-date:** cash timing depends on the chosen collection pattern and late-enrollment policy. Charging the same amount to every joiner is simple but gives late joiners less access. Proration, a later start, bonus access, or closing enrollment can make the promise clearer.

### Access

Access is not automatically identical to billing:

- An evergreen membership commonly follows the active subscription status.
- A fixed-cycle plan can remove access at expiration or decouple access from the completed payment schedule.
- A prepaid term should preserve the access/fulfillment already purchased, even if recurring $0 orders are used behind the scenes; Woo warns that a naive cancellation flow can interrupt those orders.
- A fixed-date plan ends access at the shared cutoff regardless of join date.

WooCommerce Memberships' official integration documentation demonstrates these choices. Subscription-tied access follows subscription status, while specific-length/fixed-date access can continue to its own end after the payment subscription has completed. That is strong evidence for telling readers to design billing and entitlement rules separately.

Primary source: [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/).

### Renewal and end state

- Ongoing subscriptions keep scheduling renewals until cancellation or another terminal event.
- Woo fixed-cycle plans move to **Expired** after the final configured payment; no later renewal is charged, and the subscriber must purchase again to restart.
- A cancellation during a paid-through period can move a Woo subscription to **Pending Cancellation** until the prepaid term ends. Associated Woo Memberships access can continue during that period.
- Expired and Cancelled are different outcomes: expiration reaches a planned end date/count; cancellation reflects a cancellation path.

Primary sources: [Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) and [WooCommerce Memberships Subscriptions Integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/).

### Cancellation

For the article's decision framework, ask three distinct questions:

1. Can the customer stop future charges at any time?
2. If they cancel, do they keep already-paid access/deliveries through the paid-through date?
3. Do they still owe a fixed remaining balance?

Those answers determine whether the product is a cancel-anytime subscription, a prepaid term, or a true installment agreement. Do not infer answer three from a subscription-length field.

## Use-case matrix

| Use case | Strong default | Why | When another model fits |
| --- | --- | --- | --- |
| Self-paced course library with ongoing new material | Evergreen recurring | Value continues while membership remains active | Use fixed-cycle if the curriculum has a defined completion package; fixed-date for live cohorts |
| Six-week cohort course | Fixed-date, often with enrollment window | Everyone starts/finishes around the teaching calendar | Fixed-cycle works for rolling evergreen enrollment |
| Coaching package with six sessions | Fixed-cycle recurring or prepaid fixed-term | Deliverable count is known | Evergreen fits open-ended advisory support |
| Website care / maintenance | Evergreen recurring | Service continues without a natural completion point | Fixed-term for a defined launch-support period |
| Replenishment box | Evergreen recurring | Need continues until customer stops | Fixed-cycle for a limited six-box collection; prepaid for gifts |
| Seasonal box or club | Fixed-date | Supply/season has a common close | Fixed-cycle if each buyer receives N boxes from their own signup |
| Community membership | Evergreen recurring | Community value continues | Fixed-date for an academic year or annual association window |
| Annual association dues | Evergreen annual or recurring-annual fixed period | Use evergreen annual when each joiner gets a rolling year; shared cutoff when everyone follows one membership year | Prepaid one-year access if no renewal relationship is desired |
| SaaS access | Evergreen recurring | Hosted value and costs continue | Fixed-term for a pilot, cohort license, or prepaid contract window |
| Gift subscription | Prepaid fixed-term | Buyer funds a clear delivery/access term | Fixed-cycle only if recipient/customer is expected to pay later renewals |

## Worked arithmetic example: the same six-month program

Assume the program's undiscounted price is $240 and ignore tax, gateway fees, refunds, failed payments, and discounts. These are examples, not performance claims.

| Model | Checkout cash | Later cash | Scheduled total | End behavior |
| --- | ---: | ---: | ---: | --- |
| Evergreen recurring at $40/month | $40 | $40 each month until cancellation | Unknown at signup; $240 after six successful payments, then it continues | Customer/merchant cancels |
| Fixed-cycle recurring, six payments | $40 | Five more scheduled $40 payments | $240 if all six payments complete | Expires after payment six |
| Prepaid six-month term | $240 | $0 for the covered term | $240 upfront | Access/fulfillment ends after six months unless repurchased/renewed |
| Fixed-date cohort ending December 31 | Depends on pricing policy | Depends on cadence | Must be disclosed for each enrollment date | Every participant reaches December 31 |

The key inference is that the same nominal $240 can create very different cash timing, cancellation exposure, access promises, and customer expectations.

For a fixed-date cohort, show two joiners rather than inventing a universal price:

- September 1 joiner: four months to December 31.
- November 1 joiner: two months to December 31.

The merchant must choose full price, proration, delayed enrollment, or a separate late-join offer. There is no evidence-based “best” answer without the business context.

## Decision framework

1. **Does customer value continue indefinitely?** If yes, start with evergreen recurring.
2. **Is there a defined completion milestone, quantity, or term?** If yes, use a fixed-term model.
3. **Should every customer receive N cycles from their own start?** Use fixed-cycle.
4. **Should everyone stop on the same date?** Use fixed-date; do not fake it with a cycle count.
5. **Should the full term be funded upfront?** Use a genuine prepaid design and preserve paid fulfillment/access.
6. **Does the customer owe a fixed balance even if access stops?** This is an installment/credit question, not ordinary subscription-length configuration.
7. **What happens on cancellation, failure, pause, refund, and final payment?** Write those states before launch.

## ArraySubs product truth gate

### Verified core behavior

Current ArraySubs core source exposes a **Subscription Length** field as a number of billing cycles, with `0 = never expires`, for simple products and subscription variations. Billing periods include day, week, month, year, and a separate Lifetime Deal option; billing interval is 1-12. The code stores the length on the customer subscription, counts paid initial/renewal orders with a positive total, clears the next payment and changes the subscription to `arraysubs-expired` when the configured count is reached.

Relevant code:

- `arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php`
- `arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/functions/date-calculations.php`

Editorial caution: do not generalize ArraySubs' positive-total payment counter to WooCommerce Subscriptions' implementation. Present it only as a current ArraySubs code observation if needed.

### Verified Pro fixed-date behavior

Fixed-Date Subscriptions live in `arraysubspro`, not core. Current code supports:

- an absolute calendar date;
- a recurring annual month/day cutoff;
- optional enrollment open/close dates;
- period-end Expire or Renew selection;
- product/cart/checkout display of the end date;
- blocking renewal invoices whose next payment is at or after the end;
- site-local end-of-day (`23:59:59`) converted to UTC;
- recurring-annual cutoffs rolling to next year when this year's cutoff has passed;
- automatic next-period renewal only for the recurring-annual type;
- fixed-date and cycle-count length being mutually exclusive (enabling fixed date clears `_subscription_length`).

Absolute-date products become unpurchasable after the end date. Enrollment-window checks also use the site's timezone.

Relevant code/data:

- `arraysubspro/src/Features/FixedPeriodMembership/Services/EndDateCalculator.php`
- `arraysubspro/src/Features/FixedPeriodMembership/Services/Hooks.php`
- `arraysubspro/src/Features/FixedPeriodMembership/views/simple-product-fields.php`
- `web-content/app/deals/arraysubs/features/_data.ts` (tier is Pro)
- [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) comparison table (Free not included; Pro included)

### Important recipe terminology issue

The required internal link `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/` is implemented as **$40 monthly for six cycles**. That is fixed-cycle recurring billing, not full upfront prepayment. Its current copy also calls it suitable for installments, while the ArraySubs feature inventory marks true Installment / Split Payments as coming soon.

Writer instruction:

- Link to it as the **fixed-cycle recipe**.
- Do not use its slug/name as the definition of prepaid.
- Do not claim it creates a fixed remaining-balance installment obligation.
- Do not repeat exact setup steps in A005; the recipe owns configuration.

## Limitations and “not a fit” guidance

- Ongoing recurring is not a fit when the merchant stops delivering value at a known milestone.
- Fixed-cycle is not a fit when all customers must share a term date or when the entire balance must remain due after cancellation.
- Fixed-date is not a fit for rolling access where every joiner should receive the same duration.
- Prepaid is not a fit when the merchant cannot manage the refund, accounting, and future-delivery liability created by taking full cash upfront.
- A subscription-length field is not enough to define installments, fulfillment, membership entitlements, or cancellation law.
- Access behavior depends on the entitlement/membership integration, not only the billing record.
- Billing-date alignment is not a substitute for a fixed end date.
- Trials, pauses, skipped renewals, zero-total orders, payment failures, and plan switches can affect counts/dates differently by engine; test the chosen plugin/gateway combination.
- Gateway capabilities and ArraySubs tiers are time-sensitive. Recheck at publication and after relevant releases.
- The article should provide general operational information, not legal/accounting advice about non-cancellable terms, refunds, consumer credit, or revenue recognition.

## Five FAQ candidates

1. **What is the difference between a recurring and fixed-term subscription?**
   - Recurring describes repeated collection; fixed-term describes a planned end. A subscription can be both.
2. **Is a fixed-term subscription the same as prepaid?**
   - No. Fixed-term can collect periodically; prepaid collects the covered term in advance.
3. **Is a fixed number of billing cycles the same as a fixed end date?**
   - No. Cycle counts normally roll from each signup; a fixed date is a shared calendar cutoff.
4. **Can customers cancel before a fixed-cycle WooCommerce subscription ends?**
   - Woo's current documentation says subscribers can cancel an expiring subscription before scheduled expiration; do not treat it as a guaranteed installment balance.
5. **What happens to access after the final subscription payment?**
   - The subscription can expire, but content/service access depends on the entitlement design; it may end with the subscription or continue to an independently defined access date.

These FAQs add information. Do not promise FAQ rich results.

## Flat visual, chart, and flow ideas

Use ArrayHash design tokens: white and `#F0E9FF`/`#EFE7FF` surfaces, `#873EFF` purple, `#18A554` success green, `#FE8218` accent orange, `#12002B` text, flat borders, no gradients, no neon, no shadows, no fake 3D.

1. **Hero — endless loop versus bounded calendar.** Left: recurring loop connecting customer, value, payment. Right: a straight timeline ending at a calendar flag. Add a small middle callout showing that a fixed term can still contain repeated payments.
2. **Two-axis model map.** Horizontal axis: ongoing -> fixed duration. Vertical axis: periodic -> upfront. Place evergreen recurring, fixed-cycle recurring, prepaid fixed-term, and fixed-date overlay in clear cards. This is the article's strongest extractable original diagram.
3. **Three timeline comparison.** Row one repeats indefinitely; row two shows six payment nodes then Expired; row three shows different signup points converging on one December 31 cutoff.
4. **Cash-timing bar chart.** Use the hypothetical $240 program: one $240 upfront bar versus six $40 monthly bars. Label it “illustrative arithmetic; excludes tax, fees, failures, refunds, and discounts.” Do not present it as market data.
5. **Decision flowchart.** Continuing value? Known finish? N cycles or shared date? Periodic or upfront? Fixed balance owed? End at the appropriate model and next policy question.
6. **Use-case matrix illustration.** Flat human/product shapes for course, service, box, membership, and SaaS, each connected to its strongest default model. Keep text primary and people secondary.
7. **Cancellation/access state flow.** Cancel request -> future charges stop -> paid-through access? -> fulfillment owed? -> final Cancelled/Expired state. Show where installment obligations require a different system.
8. **Fixed-cycle versus fixed-date mini-panel.** Two customer silhouettes starting on different dates: rolling terms end separately; cohort terms converge on one calendar flag.

Do not use a pie chart in A005: there is no primary dataset for model adoption or revenue share. The cash-timing bar chart and timeline diagrams satisfy the visual request without inventing percentages.

## Article execution notes

- The proposed H1 is useful but long. Suggested title tag under 60 characters: **Recurring vs Fixed-Term Subscriptions**.
- Place the 51-word answer in the first 150 words, followed by 3-5 key takeaways.
- Put the “two axes, four patterns” diagram before the detailed comparison.
- Use the use-case matrix, $240 worked example, and decision flow as extractable assets.
- Link to A004 for simple/variable catalog structure, A006 for trials, A007 for sign-up fees, and A010 for detailed fixed-date implementation.
- Required implementation links: monthly/annual recipe for evergreen packaging, `prepaid-fixed-cycles` as the fixed-cycle recipe, and lifetime recipe as the one-time boundary.
- Keep the pricing CTA after the reader has definitions, matrix, worked example, limitations, and decision path.
- Add real named author and technical reviewer bios. Existing team placeholders do not meet the publishing standard without editorial approval.
- Visible metadata: published date, last verified 2026-07-13, evidence environment (current official docs and current local ArraySubs code), update log, and update trigger.

## Source-to-claim register

| Primary source | Claims supported | Recheck trigger |
| --- | --- | --- |
| [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) | Evergreen default, fixed payment count, initial payment included, expiration, customer cancellation before expiration, trial impact | Woo Subscriptions product-plan/expiration change |
| [Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) | Active, Pending Cancellation, Cancelled, Expired and access implications | Status/lifecycle change |
| [Guide to Billing Date Alignment](https://woocommerce.com/document/subscriptions/billing-date-alignment/) | Alignment controls renewal date, not fixed term; existing subscriptions are not retroactively aligned | Alignment change |
| [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) | Upfront-signup-fee/$0-renewal workaround, fulfillment/cancellation risks, payment/shipping cadence | FAQ/fulfillment change |
| [Prepaid for WooCommerce Subscriptions](https://woocommerce.com/document/prepaid-for-woocommerce-subscriptions/) | Genuine prepaid plan pricing, $0 pieces/orders, cancellation and shipping behavior | Extension change |
| [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) | Unlimited, relative set-length, and fixed-date access models | Membership duration change |
| [Memberships + Subscriptions integration](https://woocommerce.com/document/woocommerce-memberships-subscriptions-integration/) | Billing/access decoupling, fixed-date access, paid-through cancellation behavior | Integration change |
| [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) | Fixed-date Pro in comparison table; Installment/Split Payments coming soon | Product release/tier change |
| Local ArraySubs core product/OrderIntegration code | Subscription length is cycles; 0 unlimited; paid-order counting; expiration | Core lifecycle change |
| Local ArraySubs Pro FixedPeriodMembership code | Absolute/annual cutoff, enrollment windows, timezone handling, renewal/expiration, mutual exclusivity | Pro fixed-period change |

## Research limitations

- No Search Console, analytics, paid keyword tool, customer dataset, or AI citation monitor was available.
- The worked example is deterministic arithmetic, not a churn, conversion, or cash-flow forecast.
- Official documentation can lag a release; version-specific product behavior should receive a final current UI/browser verification before publication.
- ArraySubs code was inspected in both core and Pro, but no live checkout, renewal, cancellation, or expiration was executed for this brief.
- No actual named author/reviewer identity was supplied.
