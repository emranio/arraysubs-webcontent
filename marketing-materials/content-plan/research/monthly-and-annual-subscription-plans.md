# Research brief: Monthly and Annual Subscription Plans: Packaging Without Cannibalization

## Research record

- **Article:** A008
- **Research date:** 2026-07-13
- **Focus keyword:** `monthly vs annual subscription plans WooCommerce`
- **Intent:** Informational/consideration; help a first-time WooCommerce subscription operator decide whether to offer monthly, annual, or both, then price and test the choice without hiding the full charge or assuming an industry benchmark applies.
- **Evidence scope:** Current official WooCommerce documentation, current ArraySubs/ArraySubs Pro source, current first-party ArraySubs product content, and a US FTC staff report used only as interface-risk context.
- **No invented benchmarks:** No churn, conversion, annual-plan adoption, refund, or discount benchmark is supplied. All numbers below are transparent arithmetic scenarios, not forecasts or observed ArraySubs customer data.
- **No live checkout test was run for this research task.** ArraySubs statements below are current-source findings, not browser-test results.

## Editorial thesis

Monthly and annual are **billing cadences**, not automatically different product tiers. Offering both is useful when the same buyer population contains two real preferences:

- lower upfront commitment and more frequent exit points;
- a larger upfront payment in exchange for a clearly stated price advantage or convenience.

The decision should be made from first-party economics and customer behavior. An annual price can improve cash timing and reduce the number of payment events during the first paid year, but it also concentrates refund exposure, service obligations, and the eventual renewal decision. It is not automatically more profitable, lower-churn, or better-converting.

The article's differentiating idea should be **cannibalization as a testable cohort question**, not a slogan. An annual option is harmful when the discount and associated costs produce less net contribution than the monthly behavior it replaces, without enough incremental purchases or operational benefit to compensate. Only the store's own cohorts can answer that.

Do not let A008 duplicate the exact ArraySubs product configuration in the [monthly-and-annual variable recipe](/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/). A008 owns pricing logic, disclosure, choice architecture, operational tradeoffs, packaging, and experiment design. The recipe owns clicks and settings.

## Direct-answer fact pattern

> Offer monthly and annual plans together when customers value both a lower-commitment entry and an upfront annual option. Set the annual price from your own retention, refund, support, and cash data—not an industry benchmark. Show the full annual charge, effective monthly cost, exact savings, and let experiments decide which option deserves emphasis.

This is 52 words. It contains the focus entity, gives a decision rule, and prevents the most common pricing-display error. It can be revised for house voice without weakening “full annual charge” or “your own data.”

## Key takeaways for the article

1. Monthly and annual can be two variations of the same subscription offer; they do not need different features.
2. Annual billing changes both price and cash timing, so compare **net contribution by cohort**, not sticker revenue alone.
3. Display the amount charged now, billing cadence, effective monthly equivalent, and exact savings together.
4. A monthly plan has up to 12 payment events in the first year when charged at signup and then monthly; an annual plan has one payment for that first annual term. This is arithmetic, not proof of lower churn or fewer failures.
5. Do not declare annual “lower churn” until an annual cohort has actually reached its renewal opportunity.
6. Default selection and visual emphasis are experiment variables. There is no evidence-backed universal default.
7. In current ArraySubs core, variable variations can have separate price/cycle/trial terms, and core plan switching supports monthly-to-annual crossgrades with configurable proration. Pro is relevant to supported automatic payment gateways and related premium behavior, not required for the core switch engine.

## Why offer monthly, annual, or both?

### Monthly only

Monthly-only is a defensible starting point when:

- the offer is new and the store needs early retention, cancellation, support, and payment data;
- customer value is still being validated;
- service capacity or fulfillment cost makes a year-long obligation risky;
- customers need a low upfront price more than a nominal long-term discount;
- refund policy, annual renewal communication, or accounting treatment is not ready.

Monthly is not “low value.” It is a smaller initial commitment with more frequent payment and cancellation decisions. It can also reveal product problems sooner because the customer encounters renewal decisions earlier.

### Annual only

Annual-only can fit when:

- the product promise naturally covers a year, such as annual access, licensing, or dues;
- delivery or onboarding costs require a longer paid-through term;
- buyers already expect annual procurement;
- the store can carry the full-year service, support, refund, tax, and fulfillment obligation;
- monthly billing would create disproportionate collection or administrative work.

Do not use “annual” as a substitute for a fixed calendar membership year. A rolling yearly subscription gives each customer a year from their own start date. A shared December 31 cutoff is a fixed-date design and belongs in A010's detailed treatment.

### Monthly and annual together

Offer both when the same value can reasonably be bought with two commitment levels and the business can support both cash/refund profiles. This choice often works cleanly as one variable product with a **Billing** attribute, because the customer can compare alternatives without comparing unrelated product pages.

Official WooCommerce Subscriptions documentation supports variable billing periods through a variable or grouped product. Current ArraySubs core source likewise provides subscription settings per variation. This proves configuration feasibility; it does not prove a conversion effect.

### When not to frame the choice as monthly versus annual

- **Defined delivery count or term:** Consider a fixed-cycle or genuinely prepaid design; link to `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`.
- **One-time permanent access:** Compare a one-time lifetime product instead; link to `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`.
- **Same calendar end for everyone:** Use fixed-date logic, not a rolling annual variation.
- **One-time product plus replenishment:** A009 owns one-time purchase versus subscription packaging.
- **Large onboarding cost:** A007 owns sign-up fee economics. Do not bury a real setup cost inside an arbitrary annual discount.
- **Different benefits:** If annual customers receive different entitlements, the test changes two variables—cadence and package. Treat it as a tier experiment, not a pure billing-cadence test.

## Annual discount and cash-flow math

### The transparent formulas

Let:

- `M` = monthly list price;
- `A` = annual price charged for one year;
- `U` = undiscounted annual equivalent;
- `E` = effective monthly price of the annual plan;
- `S` = dollar savings versus 12 monthly payments;
- `d` = annual discount rate;
- `F` = “months free” equivalent;
- `B` = gross-billing break-even month count.

Then:

```text
U = 12 × M
E = A ÷ 12
S = (12 × M) − A
d = 1 − [A ÷ (12 × M)]
F = 12 − (A ÷ M)
B = A ÷ M
```

Interpretation:

- `d` is the percentage reduction from twelve successful monthly payments.
- `F` converts the same reduction into “months free” language.
- `B` is the number of successful monthly charges whose gross total equals the annual price. It is **not** a retention forecast or profit break-even.

### Worked example: $30 monthly versus $300 annual

Assume no tax, fees, refunds, discounts, or failed payments. These are illustrative prices, not a recommended discount.

| Measure | Calculation | Result |
| --- | --- | ---: |
| Undiscounted annual equivalent | `12 × $30` | `$360` |
| Annual price | Given | `$300` |
| Exact dollar savings | `$360 − $300` | `$60` |
| Annual discount | `$60 ÷ $360` | `16.7%` |
| Effective monthly equivalent | `$300 ÷ 12` | `$25` |
| Months-free equivalent | `12 − ($300 ÷ $30)` | `2 months` |
| Gross-billing break-even | `$300 ÷ $30` | `10 successful monthly payments` |

A customer on monthly pays less in gross cash than the annual buyer if they stop before ten successful monthly payments. At ten payments, gross billed cash is equal. After ten, gross monthly billed cash exceeds the annual price. That statement ignores refunds and costs and must be labeled accordingly.

### Cash timing in the same example

Assume payment at signup and no trial:

- **Annual:** `$300` at signup covers the first annual term; the next scheduled subscription charge is at the anniversary.
- **Monthly:** `$30` at signup plus up to eleven `$30` renewals during the first twelve paid months.

Annual provides more cash at signup. Monthly preserves future price and collection opportunities. Neither pattern is automatically more profitable because cash timing, gateway fees, refunds, cost to serve, taxes, and payment success differ.

### A practical annual-price floor

Do not choose the annual price by copying another company's percentage. Build a floor from the costs and contribution the business must protect:

```text
Minimum viable annual price
= expected variable service or fulfillment cost for the covered year
+ expected support cost
+ expected payment/refund/chargeback cost allowance
+ required contribution
```

This is a planning identity, not an accounting standard. Tax treatment, revenue recognition, consumer obligations, and local rules require qualified advice.

For a physical subscription, include expected product, packing, and shipping costs for every promised delivery. For a service, include capacity committed across the term. For software/content, include support and infrastructure that scale with usage. “Digital” does not mean costless.

### The cannibalization comparison

Use comparable acquisition cohorts and calculate the result after refunds and direct costs:

```text
Net annual contribution
= annual cash collected
− refunds and chargebacks
− gateway/payment costs
− variable service or fulfillment cost
− support cost

Net monthly cohort contribution through month 12
= sum of successful monthly cash collected
− refunds and chargebacks
− gateway/payment costs
− variable service or fulfillment cost
− support cost
```

Then normalize by an acquisition unit such as eligible visitor, checkout starter, or new purchaser. Comparing only annual purchasers with monthly purchasers can create selection bias: customers self-selecting annual may have been more committed before seeing the page.

Useful outcome:

```text
Net contribution per eligible visitor
= (cash collected − refunds − variable costs − support costs) ÷ eligible visitors
```

This captures both conversion and economics. An annual variant can have a lower checkout rate yet still produce more near-term cash; another can produce more annual selections but less net contribution because the discount is too deep. The scorecard must show both.

## Plan-page UX: anchoring, defaults, and honest comparison

### Show four facts together

For each option, show:

1. the amount charged at checkout;
2. the billing cadence;
3. the effective monthly equivalent when useful;
4. the exact annual savings, calculated from the visible monthly price.

Example:

| Monthly | Annual |
| --- | --- |
| **$30 billed monthly** | **$300 billed annually** |
| Cancel future renewals according to the stated policy | Equivalent to $25/month |
| — | Save $60 versus 12 monthly payments (16.7%) |

The `$300 billed annually` line must remain visually prominent. `$25/month` is a comparison aid, not the amount charged at checkout. Do not make the effective monthly number large and hide the annual total in a tooltip or footnote.

The FTC staff report on dark patterns describes hidden costs, drip pricing, and false hierarchy as interface patterns that can impair informed choice. Use it as design-risk context, not as a statement that a specific presentation is unlawful in every jurisdiction.

### Use the same value statement when testing cadence

If the monthly and annual plans include the same benefits, keep the feature list identical and place the cadence/price difference in the selector. This lets the test isolate commitment and economics.

If annual includes an onboarding session, bonus report, or priority support, disclose it as a package difference. Do not attribute the result only to annual billing. A clean sequence is:

1. test cadence with equivalent benefits;
2. test annual emphasis/default;
3. test an annual-only bonus;
4. retest price after enough renewal/refund data exists.

### Anchoring without fake scarcity

The monthly price naturally supplies the reference for twelve-month savings. Use arithmetic, not a crossed-out number that was never the real monthly price. Avoid countdowns or “limited annual deal” language unless the offer and deadline are genuine.

If taxes or mandatory fees change the final charge, make that treatment clear before checkout to the extent the store's locale and tax setup allow. Do not promise a single universal tax-display rule.

### There is no universal best default

Possible starting variants:

- **Neutral:** neither cadence visually favored; customer chooses.
- **Monthly highlighted:** useful as a lower-upfront starting hypothesis, not a conclusion.
- **Annual highlighted:** useful as an upfront-value starting hypothesis, not a conclusion.
- **Preselected option:** the strongest intervention; test separately from badge and copy.

Do not combine “annual preselected,” a larger annual card, a “best value” badge, and a new discount in one variant if the goal is to learn which factor works. Change one main variable at a time or use a factorial design with enough traffic and statistical support.

### Cancellation and refund summary belongs near the choice

State, in plain language:

- whether cancellation stops only future renewal or also current access;
- the paid-through date for an annual cancellation;
- whether the store offers full or partial refunds and under what published policy;
- how physical deliveries or service commitments continue after cancellation;
- who to contact for exceptions.

WooCommerce's official status guide explains that cancellation during a prepaid term can move a subscription to Pending Cancellation, with benefits continuing until the paid-through end. The generic WooCommerce refund guide distinguishes automatic gateway refunds from manual refunds and notes that gateway transaction fees are usually not returned. The store still needs a published policy and jurisdiction-specific advice.

## Churn, refund, payment, and support tradeoffs

### Churn timing is not directly comparable at first

Monthly buyers encounter a renewal decision quickly. Annual buyers do not face the next scheduled subscription charge until the anniversary. Therefore:

- early monthly cancellation or failed-payment data is observable sooner;
- annual “churn” cannot be judged fairly before the cohort reaches annual renewal;
- an annual cohort appearing active for ten months is not evidence that it will renew;
- a monthly cohort's month-12 retained share and an annual cohort's first-renewal success answer related but different questions.

Use cohort labels such as “started in July 2026,” and compare outcomes over equivalent observation windows. Do not mix mature monthly cohorts with immature annual cohorts.

### Payment events

Assuming payment at signup and no trial:

- monthly has up to 12 payment events during the first twelve paid months;
- annual has one payment event for the first annual term;
- at the first anniversary, annual has its first subscription renewal event.

This means annual has fewer payment events during the first term. It does **not** mean “12× fewer failures,” because failure probability is not established, annual charges are larger, gateways and cards differ, and annual renewal behavior is observed later.

### Refund and chargeback exposure

Annual concentrates more money in one order. Operational consequences can include:

- a larger refund amount when the store approves a refund;
- more complicated partial-service or partial-fulfillment calculations;
- stronger customer concern if the annual total was not prominent;
- a larger dispute amount;
- a need to preserve paid-through access or deliveries after future renewal is canceled.

Monthly reduces the amount attached to each payment but creates more orders and potential payment/support events. Neither cadence eliminates the need for clear refund and cancellation workflows.

WooCommerce's official refund documentation confirms that automatic refunds depend on gateway support; manual refunds require the merchant to return money outside WooCommerce. Gateway transaction fees are usually not returned. Treat this as an operational cost input, not a universal fee rule for every provider.

### Support workload

Do not assume annual reduces support. It may reduce billing-frequency questions while increasing onboarding, refund, entitlement, and anniversary-renewal questions. Measure:

```text
Support contacts per 100 purchasers
= relevant support contacts ÷ purchasers × 100
```

Also break contacts down by reason:

- price/charge confusion;
- cancellation/refund;
- payment failure;
- onboarding/activation;
- access/entitlement;
- fulfillment/shipping;
- monthly-to-annual or annual-to-monthly switching.

Count unique tickets and repeat contacts separately. A low ticket count with many follow-ups can hide workload.

## Packaging examples and guardrails

| Offer | Monthly role | Annual role | Key guardrail |
| --- | --- | --- | --- |
| Software or content membership | Low upfront entry; frequent renewal signal | Upfront year with transparent discount | Do not call an immature annual cohort “retained”; compare renewal after anniversary. |
| Community membership | Flexible ongoing access | Rolling year of access | If every member year ends together, use fixed-date rules instead. |
| Service retainer | Lower commitment and easier capacity adjustment | Funds a longer service period | Annual price must cover capacity and support; a deep discount can create a year of underpriced work. |
| Physical subscription box | Smaller payment per shipment/month | Upfront funding for a year of deliveries | Include inventory, packing, shipping, damage, and refund exposure; do not equate annual billing with one annual shipment. |
| High-onboarding service | Recurring service plus explicit signup fee | Annual can reduce collection events | Use a signup fee when onboarding is a real separate cost; do not disguise it in cadence. |
| Cohort course or season | Usually a poor fit if every learner shares dates | Rolling annual may also be wrong | Use a fixed-date or fixed-term model and link A010/A005. |
| Gift plan | Recipient should not be responsible for renewals | Genuine prepaid term can fit | Preserve paid fulfillment/access if buyer disables future renewal. |
| Unvalidated new offer | Useful first learning cadence | Add after retention/support economics emerge | Do not lock in a deep annual price before cost-to-serve is known. |

### Packaging pattern 1: same benefits, two cadences

- Monthly: `$30 billed monthly`.
- Annual: `$300 billed annually`, equivalent to `$25/month`, save `$60` versus twelve monthly payments.
- Same access and features.

This is the cleanest cadence test.

### Packaging pattern 2: annual commitment bonus

- Monthly and annual have the same ongoing service.
- Annual includes a clearly named low-marginal-cost bonus, such as one onboarding workshop or an annual planning review.
- The page reports cadence selection and bonus utilization separately.

If utilization is high and costly, it is a package-cost change, not “free value.”

### Packaging pattern 3: start monthly, switch later

- The customer starts monthly while evaluating the service.
- The account area offers an eligible switch to annual after the customer has experienced value.
- The merchant defines whether the switch is prorated immediately, charged without proration, or applied at renewal.

This is supported by current ArraySubs core plan switching, but exact setup belongs in the recipe/feature documentation. The article should warn that a switch can create an immediate payment or a future pending change depending on the configured method.

## Experiment design and scorecard

### Write the hypothesis before launch

Example:

> Among eligible new product-page visitors, highlighting the annual option will increase net cash per eligible visitor without increasing refund, chargeback, or support-contact guardrails beyond the store's predeclared limits.

The business must supply the limits. Do not invent them.

### Isolate the variable

Recommended sequence:

1. **Choice test:** monthly only versus monthly + annual.
2. **Presentation test:** neutral selector versus annual highlighted.
3. **Default test:** no preselection versus a selected cadence.
4. **Discount test:** two annual prices, with benefits/display held constant.
5. **Package test:** cadence-only annual versus annual plus bonus.

Do not run every change at once unless traffic supports a properly designed multivariate experiment.

### Define the population and unit

- Randomize by eligible visitor or logged-in customer, not individual pageview.
- Keep assignment sticky across repeat visits.
- Exclude existing subscribers when the question is new-customer packaging, or analyze them separately.
- Predefine segments such as acquisition source, device, country/currency, and new/returning visitor.
- Do not slice until a preferred result appears.

### Scorecard

| Metric | Formula | Why it matters | Timing caveat |
| --- | --- | --- | --- |
| Checkout completion | purchases ÷ eligible checkout starts | Detects checkout friction | Early; does not measure downstream value |
| Purchase conversion | purchases ÷ eligible visitors | Measures whole-page outcome | Requires stable exposure definition |
| Annual selection rate | annual purchases ÷ monthly + annual purchases | Shows plan mix | A higher rate is not automatically a business win |
| Gross cash per eligible visitor | cash collected ÷ eligible visitors | Captures upfront cash timing | Ignores refunds and costs |
| Net contribution per eligible visitor | net contribution ÷ eligible visitors | Combines conversion and economics | Cost allocation must be consistent |
| Refund rate | refunded paid orders ÷ paid orders | Customer/operational guardrail | Compare full and partial refunds separately |
| Chargeback rate | disputed paid orders ÷ paid orders | Payment-risk guardrail | Reporting lag varies by gateway |
| Support contacts per 100 purchasers | related contacts ÷ purchasers × 100 | Operational clarity/load | Also count repeat contacts and reason |
| Monthly successful payment count | successful paid monthly orders per cohort | Realized monthly revenue path | Mature cohorts only |
| Annual first-renewal success | successful first annual renewals ÷ annual renewals due | Actual annual renewal behavior | Unavailable until anniversary |
| Cancellation request rate | cancellation requests ÷ active eligible subscriptions | Measures intent, not only final status | Respect paid-through/pending cancellation |

### Decision rule

Before launch, define:

- primary metric;
- guardrails;
- minimum detectable effect or business-relevant difference;
- required observation window;
- treatment of refunds, taxes, fees, and incomplete cohorts;
- whether a result must hold for priority segments;
- who can stop the test for customer harm or operational overload.

Use a qualified analyst or power calculation based on the store's own baseline. There is no universal minimum sample size. Do not declare the annual option a retention winner before annual renewal data exists.

## Current ArraySubs product truth gate

### Verified current versions and source scope

- Local ArraySubs core header/version constant: `1.8.9`.
- Local ArraySubs Pro header/version constant: `1.1.0`.
- Source inspected on 2026-07-13; no browser checkout or renewal run was part of this task.

### Variable monthly and annual variations are core product behavior

Current ArraySubs core source lets an existing variable product carry subscription settings per variation. Each variation can define:

- regular/sale price used for recurring billing;
- billing period: day, week, month, year, or Lifetime Deal;
- billing interval from 1 through 12;
- subscription length;
- trial length/period;
- sign-up fee;
- optional different renewal price.

Therefore a **Billing: Monthly / Annual** attribute with separate variation price/cycle terms is supported in the core product engine. The current first-party product page also labels Subscription Products as Free + Pro and describes simple and variable subscriptions.

Relevant source:

- `arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php`
- `web-content/app/deals/arraysubs/features/_data.ts` (`subscription-products`)
- [ArraySubs product page](https://arrayhash.com/deals/arraysubs/)

Do not claim the article's selector design exists automatically. Product variations supply the terms; theme/product-page presentation still needs current UI verification.

### Core plan switching supports cadence changes

Current ArraySubs core plan-switching code and architecture support upgrade, downgrade, and crossgrade paths. The feature data explicitly uses monthly-to-annual as a crossgrade example. Supported proration policies are:

1. **Prorate immediately:** credit unused old-plan time and charge for the new plan according to current calculator behavior; a cycle change charges the new cycle price minus old-plan credit.
2. **Apply at renewal:** store a pending switch; build the next renewal using the target plan, then update the subscription after payment.
3. **No proration:** charge the configured new price without unused-time credit in the immediate switch flow.

An immediate switch may create an order and require checkout/payment before the subscription changes. A deferred switch stays pending until the relevant renewal order is paid.

Relevant source:

- `documentations/architecture/plan-switching.md`
- `documentations/user-guides/subscription-lifecycle-and-plan-switching.md`
- `arraysubs/src/Features/PlanSwitching/Services/ProrationCalculator.php`
- `web-content/app/deals/arraysubs/features/_data.ts` (`plan-switching`, `proration-methods`)

### Important stale-copy warning

The current public recipe data for `monthly-vs-annual-variable` contains lines calling plan switching “Pro plan switching.” That conflicts with the newer shared lifecycle guide, the core source location, and the feature data, all of which say core switching/proration are shared behavior and Pro adds related premium behavior. **Do not repeat the Pro-only wording in A008.** Link to the recipe for configuration, but use the verified current feature boundary above.

### Renewal and gateway boundary

Current first-party ArraySubs content says:

- the free core supports checkout and manual renewal invoices through the wider WooCommerce gateway ecosystem;
- Pro supports automatic off-session renewals for ArraySubs' Stripe, PayPal, and Paddle integrations;
- automatic retry is Pro.

This affects monthly-versus-annual operations. Monthly manual renewal produces much more frequent customer payment action than annual manual renewal. Do not say every WooCommerce gateway charges ArraySubs subscriptions automatically.

Relevant source:

- [ArraySubs product page](https://arrayhash.com/deals/arraysubs/)
- `web-content/app/deals/arraysubs/features/_data.ts` (`woocommerce-manual-payments`, gateway features)

### Refund behavior

Current ArraySubs core source exposes full, partial, and prorated subscription refund paths through WooCommerce's native refund mechanism. The prorated path can optionally cancel the subscription after refund. Gateway refund execution depends on the setting and whether the payment gateway advertises refund support.

Relevant source:

- `arraysubs/src/Features/Refunds/REST/RefundController.php`
- `arraysubs/src/Features/Refunds/Services/RefundProcessor.php`

Editorial boundary: this source proves capability, not a universal refund entitlement or recommended annual refund policy. The article should tell merchants to publish their own compliant policy and test the current workflow.

## FAQ candidates

### 1. How much should I discount an annual subscription?

There is no universal evidence-backed percentage. Start with `12 × monthly price`, model annual cost-to-serve, refunds, gateway costs, support, and required contribution, then test an annual price whose full charge and exact savings are clear. Use first-party cohort results to change it; do not copy a competitor's discount.

### 2. Is annual billing always more profitable than monthly billing?

No. Annual billing provides more cash upfront and fewer payment events during the first term, but the discount, refunds, support, service/fulfillment cost, and annual-renewal outcome can erase that advantage. Compare net contribution per eligible visitor and per acquired customer over matched observation windows.

### 3. Should monthly or annual be the default option?

Treat the default as an experiment. A neutral selector, monthly emphasis, annual emphasis, and preselection are different interventions. Pick a primary outcome and refund/support guardrails, keep the rest of the page stable, and use your own result. There is no defensible universal default in the evidence reviewed.

### 4. How should annual savings appear on a WooCommerce product page?

Show the full annual amount and “billed annually” prominently. Add the effective monthly equivalent and exact savings versus twelve visible monthly payments as secondary context. For example: `$300 billed annually · equivalent to $25/month · save $60 versus monthly`. Do not display only `$25/month` when checkout charges `$300`.

### 5. Can ArraySubs customers switch from monthly to annual?

Current ArraySubs core supports eligible monthly-to-annual crossgrades through plan switching. The merchant configures allowed paths and one of three proration methods. Depending on that setting, the switch can require an immediate paid order or remain pending until renewal. Pro is used for related premium gateway/shipping behavior, not the core switch engine.

## Flat visual and image plan

Use the ArrayHash flat visual system: white and `#F0E9FF`/`#EFE7FF` surfaces; `#873EFF` primary; `#18A554` success; `#FE8218` accent; `#12002B` text; borders instead of shadows; no gradients, neon, glass effects, or fake 3D. Use simple human silhouettes only where they explain buyer choice or support workload. Keep all chart values labeled as illustrative arithmetic when they are not first-party observations.

1. **Hero — “Two ways into the same value.”** One central product/value card branches to a monthly calendar with smaller coins and an annual calendar with one larger payment. Two calm human silhouettes choose paths; identical benefit icons rejoin after the selector. Minimal text: “Monthly” and “Annual.” Alt: “A subscription offer branches into monthly and annual billing paths while delivering the same customer value.”
2. **Formula board — annual-price math.** Flat white board with `M`, `A`, `12M`, `A/12`, savings, discount, and break-even formulas. Use the `$30 / $300` example in large legible labels. Alt: “Formulas calculate annual savings, effective monthly cost, discount rate, and gross-billing break-even.”
3. **Twelve-slice donut/pie chart — “Ten paid month equivalents + two free.”** Twelve equal segments: ten purple paid segments and two orange savings segments. Caption must say “Illustrative $30/month versus $300/year price math—not customer data.” This satisfies a pie-style visual without inventing adoption percentages. Alt: “A twelve-part donut shows an annual price equal to ten monthly payments, with two monthly-payment equivalents saved.”
4. **Cash-timing bar chart.** Horizontal month labels 1-12. Annual has one `$300` bar at signup; monthly has twelve `$30` bars if all payments succeed. No cumulative-performance claim. Alt: “Annual collects $300 at signup while monthly collects twelve possible $30 payments across the year in the worked example.”
5. **Gross-billed break-even line chart.** X-axis successful monthly payments 0-12; Y-axis gross billed cash. Monthly rises by `$30`; annual is flat at `$300`; lines meet at payment ten. Label “ignores cost/refunds.” Alt: “Monthly cumulative gross billing meets the $300 annual price after ten successful $30 payments.”
6. **Disclosure anatomy card.** Magnified annual option card with callouts to full charge, cadence, effective monthly equivalent, exact savings, and cancellation/refund link. Include a small crossed-out anti-pattern card where `$25/month` hides the `$300` charge. Alt: “An annual pricing card labels the amount charged, billing cadence, effective monthly cost, savings, and policy information.”
7. **Cadence decision flowchart.** Same value? -> year-long obligation supportable? -> enough retention/cost data? -> monthly only, annual only, both, or fixed-term/fixed-date alternative. Rectangular flat nodes, accessible arrows, no gradients. Alt: “A decision flow routes subscription offers toward monthly, annual, both cadences, or another term model.”
8. **Tradeoff balance illustration.** Human operator at center with four cards on each side: upfront cash/payment events versus refunds/service obligation/renewal cliff. Avoid implying one side wins. Alt: “A store operator balances annual cash timing against refund, service, support, and renewal risks.”
9. **Packaging matrix.** Four illustrated rows: software, service, physical box, cohort. Columns monthly role, annual role, guardrail. Use icons and short labels; full detail stays in HTML table. Alt: “A matrix compares monthly and annual packaging for software, services, physical boxes, and cohorts.”
10. **Experiment stages flowchart.** Hypothesis -> randomize -> expose -> checkout -> refund/support observation -> monthly cohort maturation -> annual anniversary -> decision. The annual lane visibly extends farther to prevent premature conclusions. Alt: “An experiment timeline waits for annual renewal before judging long-term retention.”
11. **Scorecard dashboard.** Flat mini bar charts for purchase conversion, net cash, plan mix, refunds, support, and renewal maturity; all values use placeholder dashes, not invented numbers. Alt: “A subscription pricing scorecard tracks conversion, contribution, refunds, support, and cohort maturity.”
12. **ArraySubs implementation diagram.** One variable product -> Monthly variation / Annual variation -> optional core plan-switching arrows -> manual-renewal core or supported Pro automatic-payment paths. This is a product-behavior diagram, not a setup screenshot. Alt: “ArraySubs connects monthly and annual variations with plan switching and manual or supported automatic renewal paths.”

Do not create an empirical market-share pie chart, churn chart, or “annual converts X% better” graphic. No such dataset was provided.

## Recommended article structure

1. Direct answer (40-60 words).
2. Key-takeaways box.
3. Explain monthly/annual as cadences and when to offer one or both.
4. Worked annual discount and cash-timing math.
5. Cannibalization framework: net contribution by comparable cohort.
6. Plan-page UX: total charge, equivalent monthly, exact savings, policy, default test.
7. Churn/refund/payment/support tradeoff table.
8. Packaging examples and “not this model” links.
9. Experiment sequence and scorecard.
10. Short ArraySubs implementation truth note linking to the exact recipe rather than repeating setup.
11. CTA: **View Pro Pricing** after the reader has the full framework, linked to `/deals/arraysubs/pricing/`.
12. Five evidence-based FAQs.
13. Methodology, last verified date, test environment, and limitations.

Required internal links to include naturally:

- `/deals/arraysubs/`
- `/deals/arraysubs/features/#products-checkout`
- `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`
- `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`
- `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- A007 sign-up fee article when published
- A009 one-time purchase and subscription article when published
- A010 fixed-date subscriptions article when published

## Source register

| Source | What it supports | Recheck trigger |
| --- | --- | --- |
| [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) | Variable/grouped products for billing-period choice; current minimum-price nuance; monthly versus upfront examples | WooCommerce Subscriptions product/variation UX change |
| [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) | Subscription price is charged at signup and beginning of each billing period; current billing schedules and product-plan behavior | Subscription-plan editor or billing rule change |
| [Subscription Products vs Subscriptions](https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/) | Product billing terms versus the live customer subscription schedule | Data/schedule contract change |
| [Subscriptions Status Guide](https://woocommerce.com/document/subscriptions/statuses/) | Pending Cancellation during paid-through term; Cancelled and Expired behavior | Status lifecycle change |
| [Refunding Orders in WooCommerce](https://woocommerce.com/document/woocommerce-refunds/) | Automatic versus manual refund handling; gateway support; partial refunds; normally lost gateway fees; publishing a refund policy | WooCommerce refund UI/API change |
| [Subscribers' Guide to Switching Subscriptions](https://woocommerce.com/document/subscriptions/customers-view/subscribers-view-switch/) | General WooCommerce Subscriptions switch flow and gateway/active-status conditions; use only when discussing that product, not ArraySubs | Switching UI or gateway capability change |
| [FTC staff report: Bringing Dark Patterns to Light](https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf) | Design-risk context for hidden costs, drip pricing, and false visual hierarchy; not a universal legal conclusion | New FTC rule/guidance or jurisdiction-specific legal review |
| [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) | Current first-party public feature/tier statements for variable products, manual/automatic renewals, plan switching, refunds | ArraySubs release or site-content update |
| `arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php` | Current per-variation billing, trial, sign-up fee, and renewal-price fields | ArraySubs product editor change |
| `arraysubs/src/Features/PlanSwitching/Services/ProrationCalculator.php` | Current cross-cycle proration behavior | Plan-switching calculation change |
| `documentations/architecture/plan-switching.md` | Current proration methods, pending-switch lifecycle, server-side enforcement | Plan-switching release |
| `documentations/user-guides/subscription-lifecycle-and-plan-switching.md` | Core-versus-Pro plan-switching boundary and customer/admin lifecycle behavior | Lifecycle release |
| `arraysubs/src/Features/Refunds/REST/RefundController.php` and `Services/RefundProcessor.php` | Current full/partial/prorated refund capability and optional cancel-after behavior | Refund module change |

## Limitations and publication gates

- No Google Search Console, store analytics, payment-gateway reports, support desk data, or paid keyword database was available.
- No first-party ArraySubs merchant cohort data supports a recommended annual discount, default selection, conversion claim, churn claim, refund benchmark, or support benchmark.
- Search and documentation state can change. Reverify WooCommerce, FTC, and ArraySubs behavior at publication and after relevant releases.
- Current local ArraySubs code was inspected but not exercised through a browser checkout, switch, refund, or renewal flow. UI and gateway-specific claims require a reproducible current-version test before being described as observed behavior.
- The public `monthly-vs-annual-variable` recipe contains stale Pro-only wording for plan switching. Either correct that source separately or ensure A008 uses the current core boundary documented here.
- Automatic renewal, refund, and switch behavior varies by gateway and configuration. Do not hard-code broad compatibility promises.
- The arithmetic ignores tax, foreign exchange, gateway pricing, refunds, disputes, cost of capital, service/fulfillment timing, and accounting treatment unless a section explicitly adds them.
- Annual renewal outcomes cannot be known for a cohort that has not reached its anniversary. Publication should label experiment maturity.
- Cancellation, refund, automatic-renewal disclosure, tax, and consumer rules vary by jurisdiction. This article is product strategy, not legal, tax, or accounting advice.
- No named author or technical reviewer was provided. Publication readiness requires real identities with relevant WooCommerce/subscription experience; do not invent credentials.
- Use visible **Published**, **Last verified: 2026-07-13**, **Test environment**, and **Limitations** fields. Refresh quarterly for pricing/gateway/regulatory claims and after relevant WooCommerce, WordPress, or ArraySubs releases.
