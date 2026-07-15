# Research brief: Customer-Chosen Subscription Duration: Use Cases, UX, and Risk Controls

## Research record

- **Article:** A011
- **Research date:** 2026-07-13
- **Focus keyword:** `customer chosen subscription duration WooCommerce`
- **Intent:** Informational; help first-time WooCommerce subscription operators decide whether buyers should choose a finite term, design bounded choices, and understand the commercial and lifecycle risks.
- **Evidence scope:** Current official WooCommerce documentation, W3C accessibility guidance, current ArraySubs/ArraySubs Pro source, and current first-party ArraySubs site content.
- **Product-status guardrail:** ArraySubs Customer-Chosen Subscription Duration is a planned Pro workflow marked **coming soon**. It is not present in the current plugin code and must not be described as available.
- **No invented benchmarks:** No conversion, churn, optimal-choice-count, minimum-term, or discount benchmark is supplied. Numeric examples below are labeled arithmetic scenarios, not observed merchant performance.
- **No live checkout was run for this task.** Local ArraySubs observations are current-source findings, not browser-test results.

## Editorial thesis

Customer-chosen duration should mean a buyer selects **one merchant-approved finite term before checkout**, such as 3, 6, or 12 total billing cycles. It should not mean an unrestricted customer can rewrite price, cadence, payment dates, or legal obligations.

The strongest article will treat the feature as a controlled product-design system:

1. offer a small approved set of economically safe terms;
2. explain payments, duration, and end behavior in plain language;
3. validate the selection on the server and preserve it through cart, order, subscription, renewals, and account views;
4. define what failure, pause, skip, cancellation, refund, and switching do to the term;
5. compare cohorts without assuming longer choices are better.

This article is not a setup tutorial. Exact ArraySubs configuration belongs to the linked recipes after the feature ships. Until then, the article must remain a neutral strategy guide and clearly label current workarounds.

## Direct-answer fact pattern

> Customer-chosen subscription duration lets a buyer select a finite term—such as 3, 6, or 12 billing cycles—before checkout, within merchant-set limits. Use it when customers' needs genuinely vary and unit costs are predictable. Prefer approved choices to unrestricted numbers, disclose the payment count and scheduled total, and separate it from prepaid or installment promises.

This is 55 words. It defines the feature, gives a fit test, and introduces the core controls without implying that ArraySubs ships it today.

## Key takeaways for the article

1. Duration and billing cadence are different: six payments every two months cover twelve billing months.
2. Prefer explicit allowed choices such as 3, 6, and 12 cycles over a free-form 1-365 input.
3. Show the first charge, number of total payments, number of later renewals, per-cycle amount, scheduled total, and end behavior together.
4. A finite subscription is not automatically prepaid and not automatically a fixed installment obligation.
5. The selected duration must be authoritative on the server; never trust a hidden field or customer-supplied price.
6. Longer terms can increase scheduled revenue and service exposure at the same time. Compare realized net contribution, refunds, fulfillment, and support by chosen-duration cohort.
7. Current ArraySubs core ships merchant-defined subscription length. Customer selection of that length on one product is a planned Pro feature marked coming soon.

## Define customer-chosen duration precisely

Use this entity table early in the article so the strategy does not collapse several different controls into “length.”

| Control | Question it answers | Example | What it is not |
| --- | --- | --- | --- |
| **Billing period and interval** | How often is payment due? | Every 2 months | The number of payments or the final date |
| **Finite subscription length** | How many billing cycles/payments should occur before expiration? | 6 total payments | A shared calendar end |
| **Customer-chosen duration** | Which approved finite length does this buyer select before checkout? | 3, 6, or 12 total payments | Unrestricted control of the schedule |
| **Fixed date** | On what calendar date does access/billing stop? | August 31 | A rolling number of cycles from each signup |
| **Prepaid term** | Is the covered term funded upfront? | $300 now for six deliveries | Six periodic charges merely because they end |
| **Installment plan** | Is a fixed purchase obligation split into scheduled payments? | $600 owed as six $100 installments | A cancel-anytime finite subscription |
| **Lifetime deal** | Is access sold once without recurring renewals? | One payment for lifetime access | A one-cycle recurring subscription |
| **Quantity** | How many units are delivered per billing cycle? | Two boxes each month | How many cycles occur |
| **Pause or skip** | What happens to an existing schedule after purchase? | Skip next box | The term chosen at initial checkout |

Official WooCommerce documentation reinforces the cadence-versus-length distinction. Its current product guide says “total payments” includes the initial purchase; six total payments means the checkout payment plus five renewals. It also says six payments on a two-month billing interval cover twelve months. Use those examples only for WooCommerce Subscriptions behavior, not as a universal contract for every plugin.

### The end-state question comes first

Before adding a duration selector, define what happens after the chosen term:

- the subscription expires and the customer must repurchase;
- the customer can resubscribe to a new finite term;
- the store invites an extension before expiry;
- the finite plan converts to an open-ended plan after explicit consent;
- access ends while a separate membership or fulfillment promise continues.

Do not silently convert a finite choice into indefinite renewal. If the product is meant to continue until cancellation, duration may be the wrong control.

## Best-fit and poor-fit products

| Product/use case | Fit | Why | Primary risk/control |
| --- | --- | --- | --- |
| Limited subscription-box run | Strong | Buyer may know whether they want 3, 6, or 12 deliveries | Cap choices by inventory and shipping economics; state whether one payment equals one shipment |
| Rolling coaching program | Conditional | Buyer may choose a defined number of monthly sessions | Clarify cancellation and missed-session policy; do not call it an installment obligation unless it is one |
| Temporary software or content access | Strong | Project, campaign, or study periods can differ | Define whether access ends immediately after the final paid-through period |
| Rolling corporate license | Conditional | Teams may need 3-, 6-, or 12-month terms | Capacity, seats, support, procurement, and renewal/extension rules must be explicit |
| Consumable replenishment | Conditional | Some buyers know a fixed delivery count | Open-ended replenishment may be easier when the need has no known endpoint |
| Gift subscription | Usually prepaid instead | The purchaser normally wants a fixed gift cost and no recipient renewal obligation | Use a genuine prepaid term and preserve paid fulfillment/access |
| Cohort course or season | Poor | Everyone often needs the same start/end dates | Use fixed-date logic; link A010 |
| Lifetime access | Poor | There is no recurring finite cycle | Use the lifetime-deal model; link A012 and the lifetime recipe |
| Fixed-price purchase paid over time | Poor as an ordinary subscription | The buyer may owe a defined balance | Use an installment/split-payment workflow and legal review; ArraySubs' module is also coming soon |
| New offer with unknown cost to serve | Poor initially | Long selected terms can lock in underpriced obligations | Launch with one bounded term and collect cost/support data first |
| High-variance custom service | Poor without quoting | A numeric selector cannot capture scope differences | Quote or configure the service before payment |

### Fit test

Customer-chosen duration is a good candidate only if all five answers are “yes”:

1. Do buyers have a real reason to need different finite lengths?
2. Can the offer deliver the same core value across those lengths?
3. Can every allowed term be priced safely from known costs and capacity?
4. Can the renewal engine represent and enforce the selected term?
5. Can the store explain cancellation, failure, pause, refund, and end behavior before checkout?

If the answer to one is no, use a fixed merchant-defined term, separate products, a fixed date, a prepaid plan, or a quote instead.

## Bounded choice UX

### Prefer approved terms to arbitrary numbers

The safest first design is a radio-card or button group with approved values:

- 3 monthly payments;
- 6 monthly payments;
- 12 monthly payments.

Each option maps to a server-side term and price rule already approved by the merchant. A free-form number input creates more states to price, validate, support, and fulfill. It is only justified when the underlying product truly supports a wide continuous range.

If free-form entry is necessary, define and disclose:

- minimum;
- maximum;
- step/increment;
- valid billing unit;
- how price changes;
- whether the number means total payments or later renewals;
- an inline text error and correction suggestion for invalid values.

W3C's WCAG 2.2 guidance requires labels or instructions when content needs user input and requires detected input errors to be identified in text. Its error-suggestion guidance specifically covers values outside an allowed set. Do not rely on red borders or silently clamp `20` down to a maximum of `12`.

### Do not use a slider as the only control

A slider can hide exact allowed values, make keyboard entry slower, and make price changes harder to compare. If a slider is used, pair it with visible labeled stops, keyboard controls, and a text summary. For a small set such as 3/6/12, labeled radio cards are simpler.

### No universal default

Default selection is an experiment variable. Starting patterns include:

- no preselection, requiring an explicit choice;
- preselect the shortest term;
- preselect the most commonly chosen term after sufficient data;
- preselect a merchant-recommended term with a factual reason.

Do not label a term “most popular” before first-party data exists. Do not combine a new default, deeper discount, larger card, and “best value” badge into one test if the goal is to learn which intervention mattered.

## The term summary customers should see

For a six-payment monthly plan at $40 per payment and no trial or sign-up fee, a clear summary is:

> **6 monthly payments of $40**  
> $40 due today, then 5 scheduled monthly renewals.  
> Scheduled subtotal: $240 before applicable tax and shipping.  
> The subscription expires after the sixth successful payment under this plan's stated lifecycle rules.

If the plugin's lifecycle is based on elapsed time rather than successful payments, use that language instead. Do not promise an exact final date until the system's handling of late payments, retries, pauses, and skips is defined.

### Show the selection through the whole purchase path

The chosen duration should remain visible in:

1. the product selector;
2. the live price/term summary;
3. cart line-item metadata;
4. checkout order review;
5. order confirmation and email;
6. the created subscription record;
7. My Account subscription details;
8. admin order/subscription screens;
9. renewal reminders and final-cycle communication.

If cart editing changes quantity, variation, shipping, coupon, trial, or payment method, recalculate and show the term summary again.

### Use “payments,” “renewals,” and “months” accurately

For a plan billed every two months with six total payments:

- total payments: 6;
- payment at signup: 1;
- later scheduled renewals: 5;
- covered term: 12 billing months under the documented example.

“Six renewals” would overstate the later renewal count. “Six months” would understate the covered duration. This distinction should appear in the product page and FAQ.

## Economics without invented benchmarks

### Core planning variables

Let:

- `N` = selected total payment count;
- `I` = billing interval in the chosen period;
- `P_N` = recurring price per payment for duration `N`;
- `S` = one-time sign-up fee;
- `V_N` = variable service/fulfillment cost per paid cycle;
- `F_N` = payment-processing cost per successful transaction;
- `A` = acquisition plus one-time onboarding cost allocated to the customer.

Assuming payment at signup, no free trial, and a product whose total-payment semantics include checkout:

```text
Later scheduled renewals = N − 1
Covered billing periods = N × I
Scheduled gross = S + (N × P_N)
Scheduled contribution before fixed overhead
= S + N × (P_N − V_N − F_N) − A
```

“Scheduled” is essential. Cancellations, failed payments, refunds, pauses, credits, and fulfillment differences can change realized results.

### Minimum-term planning identity

If contribution per successful cycle is positive, a simple acquisition/onboarding payback estimate is:

```text
Contribution per paid cycle = P_N − V_N − F_N
Payback cycles = ceiling[(A − S) ÷ contribution per paid cycle]
```

This is not a recommended minimum and does not include target profit or fixed overhead. It only identifies when scheduled per-cycle contribution would recover the specified acquisition/onboarding amount under the assumptions.

### Illustrative example

Assume:

- $40 per monthly payment;
- $15 variable service cost per paid cycle;
- $60 acquisition/onboarding allocation;
- no sign-up fee, processing fee, tax, shipping, refund, or failure.

| Selected duration | Payment today | Later scheduled renewals | Scheduled gross | Scheduled contribution before fixed overhead |
| --- | ---: | ---: | ---: | ---: |
| 3 payments | $40 | 2 | $120 | `3 × ($40−$15)−$60 = $15` |
| 6 payments | $40 | 5 | $240 | `6 × ($40−$15)−$60 = $90` |
| 12 payments | $40 | 11 | $480 | `12 × ($40−$15)−$60 = $240` |

These are arithmetic schedules, not expected customer value. The 12-payment row creates a longer service obligation and more payment opportunities; it does not guarantee $480 or $240.

### Term discounts need their own model

If longer terms get a per-cycle discount:

```text
P_N = base per-cycle price × (1 − duration discount rate)
Scheduled discount cost = N × base per-cycle price × duration discount rate
```

Calculate the cost for each allowed term. Do not assume a longer selection justifies any particular percentage. A term can increase scheduled total while reducing contribution per cycle; both must be visible.

### Physical fulfillment capacity

For physical products, add:

```text
Scheduled units = selected cycles × units per cycle × quantity
Scheduled fulfillment cost
= scheduled units × unit cost
+ packing
+ expected shipping under the chosen shipping policy
```

The term selector should not promise inventory or delivery capacity the store has not reserved or forecast. Decide whether stock is checked only for the current shipment, reserved for the full term, or managed through another system, and disclose limits where relevant.

## Risk-control framework

### Layer 1: catalog controls

- Use an allowlist of durations per product.
- Set a minimum, maximum, and step only if free-form input is justified.
- Store price/cost rules server-side for every allowed value.
- Cap or remove terms that exceed inventory, service capacity, gateway, or policy limits.
- Decide whether duration affects price, trial, sign-up fee, shipping, entitlements, or only expiration.
- Define how variable product attributes combine; avoid a multiplication of untested combinations.

WooCommerce's official variable-product guide notes that front-end dropdown behavior changes above 30 variations and that undefined/duplicate combinations can create confusing price and stock behavior. A 3/6/12 length attribute is a practical interim model, but adding duration to many other attributes can quickly create operational complexity.

### Layer 2: request and checkout controls

- Treat the posted duration as untrusted input.
- Check product eligibility, allowlist membership, integer format, minimum/maximum, and step on the server.
- Resolve price from server configuration; never accept a submitted price.
- Revalidate on add to cart, cart restore, checkout, order creation, and subscription creation.
- Store a human-readable label plus a machine-readable value in cart/order metadata.
- Reject invalid input with a descriptive text error and a valid suggestion.
- Preserve the chosen value through cache, session, and payment return flows.
- Prevent changing the duration by editing a URL, hidden input, request payload, or stale cart.

### Layer 3: lifecycle controls

Answer these questions before launch:

| Event | Required policy decision |
| --- | --- |
| Free trial | Does trial time sit outside the paid duration? When does payment one occur? |
| $0 order/coupon/credit | Does a zero-total cycle count toward the selected length? |
| Failed payment | Does the term wait for successful payment, consume an elapsed cycle, or terminate after recovery rules? |
| Late manual renewal | Does the expected end move with the late payment? |
| Pause | Does the selected term extend, or does the paused time consume part of it? |
| Skip | Does the skipped cycle reduce deliveries/payments or push the end later? |
| Cancellation | Can the buyer stop future payments before the selected end? What access/fulfillment remains paid through? |
| Refund | Does a full/partial refund alter payment count, end date, entitlement, or remaining deliveries? |
| Plan switch | Does the remaining length carry over, reset, convert, or require a new duration choice? |
| Quantity change | Does the duration stay fixed while units per renewal change? |
| Extension | Can the customer append cycles, resubscribe, or buy a new finite plan? |

If the customer cannot stop the remaining scheduled payments, the commercial promise may be an installment or credit obligation rather than an ordinary cancelable subscription. Escalate for jurisdiction-specific legal review.

### Layer 4: operational controls

- Show selected term and remaining payments to support staff.
- Log who selected or changed the term and when.
- Send a final-payment/final-delivery reminder.
- Monitor out-of-stock, failed-payment, refund, and support events by duration cohort.
- Test each allowed duration with manual renewals and every supported automatic gateway.
- Test taxes, recurring shipping, coupons, trials, plan switching, pause/skip, cancellation, refund, renewal, and expiration.
- Create recovery instructions for a subscription whose term metadata is missing or invalid.
- Preserve the originally agreed term if product settings change later.

## Analytics and experiment plan

### Core cohort dimensions

Store these dimensions at purchase:

- selected duration;
- billing period/interval;
- per-cycle price and sign-up fee;
- planned payment count and scheduled total;
- trial/coupon/shipping configuration;
- gateway and manual/automatic renewal method;
- acquisition source and experiment variant;
- product/variation version or configuration snapshot.

Do not reconstruct the original agreement from today's product settings; the product may have changed.

### Scorecard

| Metric | Formula | Why it matters | Caveat |
| --- | --- | --- | --- |
| Duration selection mix | purchases for duration N ÷ all eligible purchases | Shows customer choice | Popularity is not profitability |
| Selector error rate | invalid duration submissions ÷ selector submissions | Finds UX/tampering issues | Separate user mistakes from hostile requests |
| Purchase conversion | purchases ÷ eligible visitors | Measures page outcome | Compare like acquisition traffic |
| Checkout completion | paid checkouts ÷ eligible checkout starts | Detects term-summary friction | Does not measure renewals |
| Scheduled gross per purchaser | scheduled gross ÷ purchasers | Describes contracted schedule | Not realized revenue |
| Realized cash by cycle position | cash collected at cycle k ÷ payments due at cycle k | Shows actual collection path | Mature cohorts only |
| Net contribution per eligible visitor | net contribution ÷ eligible visitors | Combines conversion and economics | Cost allocation must be consistent |
| Cancellation-before-end rate | subscriptions cancelled before selected completion ÷ eligible subscriptions | Tests term fit | Cancellation rules affect interpretation |
| Refund rate | refunded paid orders ÷ paid orders | Customer/economic guardrail | Split full and partial refunds |
| Fulfillment completion | promised fulfilled units ÷ promised due units | Physical/service delivery guardrail | Requires reliable delivery data |
| Support contacts per 100 purchasers | related contacts ÷ purchasers × 100 | Operational clarity/load | Count repeat contacts separately |
| Expiry-to-resubscribe rate | new resubscriptions ÷ eligible expired subscriptions | Measures post-term demand | Needs a defined attribution window |

### Experiment sequence

1. **Need validation:** one fixed merchant term versus a 3/6/12 bounded selector.
2. **Choice set:** 3/6 versus 3/6/12, with price logic stable.
3. **Summary clarity:** compact price string versus explicit today/renewals/total/end summary.
4. **Default:** explicit choice versus one preselected term.
5. **Discount:** no duration discount versus one modeled term discount.
6. **End journey:** resubscribe prompt versus alternative renewal/extension journey after expiry.

Predeclare the primary metric, guardrails, cohort maturity, and a business-relevant minimum effect. Use the store's own baseline and a qualified power calculation; there is no universal sample size. Do not call the longest term a winner from selection rate alone.

## Current ArraySubs product truth gate

### Status: planned Pro, coming soon, not shipped

Verified current first-party sources all mark **Customer-Chosen Subscription Duration** as planned:

- `web-content/app/deals/arraysubs/features/_data.ts` sets `tier: "Pro"` and `status: "coming-soon"` and describes merchant-approved duration choices.
- `web-content/app/deals/arraysubs/pricing/page.tsx` marks the module `coming-soon`.
- `web-content/app/deals/arraysubs/_components/freeVsProRows.ts` labels customer-chosen subscription length at checkout `Coming soon` and Pro-only.
- The public [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) says “Coming soon: let customers choose how many cycles or periods their subscription should run before checkout.”
- No `CustomerChosenSubscriptionDuration` feature directory, provider, REST controller, checkout field, or boot registration exists in current `arraysubs` or `arraysubspro` source.

Current local versions inspected:

- ArraySubs core `1.8.9`;
- ArraySubs Pro `1.1.0`.

Do not write “enable,” “configure,” “available in Pro,” “customers can now choose,” or any other shipped-language. “Planned for Pro” and “coming soon” are the only verified status statements.

### What ships today: merchant-defined finite length

Current ArraySubs core product fields let the merchant set **Subscription Length** on a simple product or each subscription variation:

- integer from `0` through `365`;
- expressed as number of billing cycles;
- `0` means never expires;
- billing interval is separately set from `1` through `12`;
- lifetime products force interval `1` and clear finite length to `0`.

At checkout, current core reads the product or selected variation's subscription data and copies its merchant-defined length into the created subscription. There is no customer-facing parameter that overrides that value.

Relevant source:

- `arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php`
- `arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php`
- `arraysubs/src/functions/product-helpers.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/SubscriptionCreationTrait.php`
- `arraysubs/src/functions/subscription-helpers.php`

### Interim workaround: merchant-approved variations or products

Today, a merchant can model a small set of choices as separate products or as a variable subscription whose **Length** attribute maps to variations with merchant-defined terms. This can approximate a 3/6/12 selector, but it is not the planned dynamic workflow.

Guardrails for the article:

- Label this as an interim catalog pattern.
- Link to `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/` for fixed-cycle setup concepts instead of reproducing step-by-step configuration.
- Do not call periodic fixed-cycle billing prepaid unless the term is actually funded upfront.
- Test price display. WooCommerce's official Subscriptions FAQ notes that variations with the same price and billing period but different lengths can be treated as identical for minimum-price display.
- Watch variation count and attribute combinations; WooCommerce's variable-product documentation notes changed dynamic-dropdown behavior above 30 variations.

### Current finite-length expiration behavior needs edge-case verification

Current ArraySubs source contains two relevant counting paths:

- `OrderIntegration::processInitialPayment()` and `processRenewalPayment()` increment `_completed_payments` only when the order total is greater than zero. `calculateAndSetNextPaymentDate()` expires when that counter reaches `_subscription_length`.
- `RecurringBilling\Services\ExpirationChecker::countCompletedPayments()` counts related orders in Processing or Completed status without an order-total check.

Those paths may differ for zero-total trial-end, coupon, or store-credit orders. The article should not promise how a future customer-selected term handles zero-value cycles until this is reconciled and verified in a current end-to-end test. The planned feature specification must explicitly define the counting rule.

### Fixed date, lifetime, and installment are separate status truths

- **Fixed-Date Subscriptions:** shipped in current ArraySubs Pro under `FixedPeriodMembership`; it is a calendar-end model and clears rolling subscription length when enabled.
- **Lifetime Deals:** shipped in current core; no recurring finite length.
- **Installment / Split Payments:** planned Pro and coming soon, separate from customer-chosen duration.
- **Early Renew:** planned Pro and coming soon; do not promise a pre-expiry extension button as part of A011.

### Gateway boundary

Current first-party ArraySubs content says core uses the wider WooCommerce gateway ecosystem for checkout and manual renewal invoices, while supported Stripe, PayPal, and Paddle automatic off-session renewals are Pro. A customer choosing 12 monthly payments is also choosing a schedule with up to 11 later renewal events after checkout; the customer-action burden depends heavily on manual versus automatic renewal.

Do not claim every gateway supports automatic collection or future schedule changes. Official WooCommerce Subscriptions documentation likewise warns that payment-gateway capabilities differ for recurring amount/date changes. Gateway claims must be engine-specific and current.

## FAQ candidates

### 1. What does customer-chosen subscription duration mean?

It means the buyer selects one approved finite term before checkout, such as 3, 6, or 12 total payments. The merchant still controls the allowed values, cadence, price, minimum/maximum, and lifecycle rules. It is different from letting the customer freely edit billing dates or price.

### 2. Is Customer-Chosen Subscription Duration available in ArraySubs now?

No. As verified on 2026-07-13, ArraySubs labels it as a planned Pro workflow and **coming soon**, and no implementation is present in the current core or Pro source. Merchant-defined subscription lengths ship today; separate products or variations can approximate a small choice set.

### 3. Should customers type any number of months they want?

Usually start with approved choices such as 3, 6, and 12 cycles. A free-form field requires safe pricing and lifecycle behavior for every number plus minimum, maximum, step, server validation, accessible errors, capacity checks, and clear billing-unit language. Use it only when the product genuinely supports that range.

### 4. How do I calculate the total for a chosen duration?

If the term uses `N` total payments, the price per payment is `P`, and the sign-up fee is `S`, the scheduled gross is `S + N × P`, before variable taxes or shipping. When checkout is payment one, later scheduled renewals equal `N − 1`. Label the result scheduled, not guaranteed revenue.

### 5. Can a customer cancel before the chosen duration ends?

That depends on the store's subscription contract, cancellation settings, and applicable law; duration alone does not create a fixed payment obligation. State whether cancellation stops future charges, preserves paid-through access or deliveries, and changes expiration. If remaining payments are legally owed, treat the product as an installment/credit question and obtain qualified review.

## Flat visual and image plan

Use the ArrayHash flat system: white and `#F0E9FF`/`#EFE7FF` surfaces; `#873EFF` primary; `#18A554` success; `#FE8218` accent; `#12002B` text; crisp borders rather than shadows; no gradients, neon, glass, fake 3D, or decorative dashboards with invented data. Human shapes should be simple, inclusive silhouettes used to explain choice or support flow.

1. **Hero — “Choose a term within safe rails.”** A buyer silhouette faces three large cards labeled 3, 6, and 12 cycles. The cards sit between two guardrail posts controlled by a merchant silhouette. A calendar/payment path continues behind the selected card. Alt: “A shopper chooses from three merchant-approved subscription durations inside clear limits.”
2. **Concept map.** Central “Customer chooses duration” node with separate surrounding nodes for cadence, fixed date, prepaid, installments, lifetime, quantity, and pause/skip. Red separator lines show what duration is not. Alt: “A concept map separates customer-chosen duration from billing cadence, fixed dates, prepayment, installments, lifetime access, quantity, and lifecycle actions.”
3. **Six-slice donut/pie chart.** One green segment labeled “payment today” and five purple segments labeled “later renewals.” Caption: “Six total payments = one at checkout + five renewals; arithmetic, not market data.” Alt: “A six-part donut shows one checkout payment and five later renewals.”
4. **Bounded selector anatomy.** Product card with accessible radio buttons for 3/6/12, visible per-payment price, scheduled total, end behavior, and inline error example. Alt: “A bounded duration selector labels approved choices, price per payment, total payments, scheduled total, and expiration.”
5. **Duration-versus-cadence timeline.** Six payment markers spaced every two months across a twelve-month bar. Callouts show payment count 6, renewals 5, covered billing months 12. Alt: “Six payments every two months cover twelve billing months.”
6. **Economics bar chart.** Three grouped flat bars for 3, 6, and 12 scheduled payments using the illustrative $40/$15/$60 model: scheduled gross versus scheduled contribution. Label assumptions prominently and do not show forecast language. Alt: “Illustrative bars compare scheduled gross and contribution for three, six, and twelve payment terms.”
7. **Four-layer risk-control diagram.** Catalog -> server/checkout -> lifecycle -> operations/analytics, with 3-4 icons inside each flat panel. Alt: “Four layers control allowed terms, validation, lifecycle events, and operational monitoring.”
8. **Lifecycle decision flow.** Selected term -> checkout payment -> renewals -> branch for success/failure/pause/skip/cancel -> expire -> resubscribe. Unresolved policy branches are orange question nodes. Alt: “A finite subscription lifecycle branches for payment failures, pauses, skips, cancellation, expiration, and resubscription.”
9. **Fit decision tree.** Real duration need? -> costs predictable? -> same value across terms? -> lifecycle defined? -> bounded selector; otherwise fixed term, fixed date, prepaid, lifetime, installment, or quote. Alt: “A decision tree identifies when customer-chosen duration fits and when another product model is safer.”
10. **Best-fit matrix illustration.** Four rows with flat icons: box, coaching, software access, cohort. Columns fit, why, guardrail. Keep full details in the HTML table. Alt: “A matrix compares duration choice for boxes, coaching, software access, and cohorts.”
11. **Analytics scorecard.** Empty/placeholder-value cards for selection mix, conversion, cash by cycle, cancellation before end, refunds, fulfillment, and support. Use dashes rather than invented percentages. Alt: “A duration experiment scorecard tracks selection, conversion, realized payments, cancellation, refunds, fulfillment, and support.”
12. **Status split — shipped versus coming soon.** Left green panel: merchant-defined length, variable subscription variations, fixed-date Pro, lifetime core. Right orange panel: Customer-Chosen Duration, Installment/Split Payments, Early Renew. Alt: “ArraySubs currently ships merchant-defined lengths while customer-chosen duration remains coming soon.”
13. **Interim implementation diagram.** One variable product branches to three merchant-configured 3/6/12 variations, with a clear “workaround today” label and a dashed “planned single-product workflow” box. Alt: “Merchant-configured duration variations approximate customer choice while the dedicated ArraySubs workflow remains planned.”

Do not generate empirical pie charts for preferred duration, conversion, or churn. No dataset supports them.

## Recommended article structure

1. Direct answer in 40-60 words.
2. Key-takeaways box.
3. Definition table: duration versus cadence, fixed date, prepaid, installment, lifetime, quantity.
4. Best-fit/poor-fit matrix and five-question fit test.
5. Bounded-choice product-page UX and explicit term summary.
6. Economics formulas and one labeled worked example.
7. Four-layer risk-control framework and lifecycle-event table.
8. Analytics scorecard and experiment sequence.
9. Clearly boxed **ArraySubs status: coming soon** section plus current merchant-defined-length workaround.
10. CTA after the framework: **View Pro Pricing**, linked to `/deals/arraysubs/pricing/`, while reiterating the feature's coming-soon status.
11. Five FAQs.
12. Methodology, visible last-verified date, test environment, and limitations.

Required internal links to include naturally:

- `/deals/arraysubs/`
- `/deals/arraysubs/features/#products-checkout`
- `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`
- `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`
- `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- A010 fixed-date article when published
- A012 lifetime-deal comparison when published
- A013 subscription-terms checklist when published

## Source register

| Source | What it supports | Recheck trigger |
| --- | --- | --- |
| [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) | Merchant-set expiration, total payments include checkout, six payments every two months cover twelve months, final expiration | WooCommerce Subscriptions product-plan/length change |
| [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) | Variable-length price-display nuance, custom-length/gateway caveat, prepaid-term behavior | FAQ or gateway behavior change |
| [Variable Products](https://woocommerce.com/document/variable-product/) | Approved attributes/variations, front-end selector behavior, >30 variation behavior, duplicate/undefined combination cautions | WooCommerce variation UI change |
| [Managing Expired Subscriptions](https://woocommerce.com/document/subscriptions/customers-extend-subscription-expiration-date/) | Fixed-length subscriptions, expiry, resubscribe/extension options, gateway support caveat for end-date changes | Expiry/resubscribe flow change |
| [Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) | Active, Pending Cancellation, Cancelled, and Expired meanings | Status lifecycle change |
| [Subscriptions Payment Methods & Gateways](https://woocommerce.com/document/subscriptions/payment-gateways/) | Automatic/manual renewal distinction and gateway-specific schedule/amount feature support | Gateway capability table change |
| [Subscriptions Data Structures & Storage](https://woocommerce.com/document/subscriptions/develop/data-structure/) | Product `_subscription_length` and customer subscription distinction | Storage or object API change |
| [WCAG 2.2: Labels or Instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html) | Visible labels/instructions for duration input | WCAG update |
| [WCAG 2.2: Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification) | Invalid values identified and described in text; silent clamping warning | WCAG update |
| [WCAG 2.2: Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html) | Suggested correction for values outside an allowed set | WCAG update |
| [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) | Current first-party coming-soon and Free/Pro surface claims | ArraySubs release/site update |
| `web-content/app/deals/arraysubs/features/_data.ts` | Planned Pro feature definition, status, intended bounded choices | Feature release/spec change |
| `web-content/app/deals/arraysubs/pricing/page.tsx` and `_components/freeVsProRows.ts` | Coming-soon presentation in pricing/comparison | Pricing/site update |
| `arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php` and `variation-fields.php` | Current merchant-defined length input, allowed range, per-variation support | Product editor change |
| `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/SubscriptionCreationTrait.php` | Current product length copied into created subscription | Checkout contract change |
| `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php` | Current positive-total `_completed_payments` counting and length expiration path | Lifecycle release |
| `arraysubs/src/Features/RecurringBilling/Services/ExpirationChecker.php` | Separate completed/processing-order expiration check and edge-case verification need | Expiration engine change |
| `arraysubspro/src/Boot.php` and `arraysubspro/src/Features/` | Absence of a registered customer-chosen-duration implementation in current Pro | Pro release |

## Limitations and publication gates

- The dedicated ArraySubs feature is not implemented, so its final UI, data model, allowed-value rules, price adjustment, analytics fields, compatibility, and lifecycle behavior are unknown. Planned marketing copy is not an API contract.
- No current-version browser checkout, renewal, pause, skip, cancel, refund, plan switch, or expiration test was run.
- Current ArraySubs source has two payment-count/expiration paths with different zero-total implications. Reconcile and test these paths before promising exact behavior for trials, coupons, or store-credit-zeroed orders.
- No merchant analytics, user research, support data, inventory forecast, gateway report, or paid keyword database was available.
- No evidence supports an optimal number of choices, universal minimum/maximum, recommended discount, conversion lift, or churn effect.
- Official WooCommerce Subscriptions behavior is useful comparative evidence but must not be attributed to ArraySubs unless separately verified.
- Gateway capabilities, taxes, recurring shipping, refunds, cancellations, and schedule changes vary by engine, integration, configuration, and jurisdiction.
- A customer-selected finite term is not automatically a legal obligation to complete all payments. This research is product strategy, not legal, tax, accounting, credit, or consumer-law advice.
- The current ArraySubs public comparison can show the Pro column as “Included” alongside a **Coming soon** hint. The article must prioritize the explicit status and say planned, not available.
- No named author or technical reviewer was supplied. Publication requires real identities with relevant WooCommerce/subscription experience; do not invent credentials.
- Publish with visible **Published**, **Last verified: 2026-07-13**, **Test environment**, and **Limitations** fields. Refresh quarterly while the feature is planned, immediately after its release, and after relevant WooCommerce, WordPress, ArraySubs, or gateway changes.
