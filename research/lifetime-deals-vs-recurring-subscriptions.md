# Research brief: Lifetime Deals vs Recurring Subscriptions: Revenue, Support, and Risk

## Research record

- **Article:** A012
- **Research date:** 2026-07-13
- **Last verified:** 2026-07-13
- **Focus keyword:** `lifetime deal vs subscription`
- **Intent:** Commercial investigation; help WooCommerce operators choose a defensible commercial model and understand its cash, service, support, update, and disclosure obligations.
- **Evidence scope:** Current first-party ArraySubs/ArraySubs Pro source and site content; current ArraySubs documentation; current official WooCommerce documentation; and FTC staff guidance on hidden charges and interface manipulation.
- **Test environment inspected:** Local repository, ArraySubs 1.8.9 and ArraySubs Pro 1.1.0. No live checkout or refund test was run for this research task.
- **No invented benchmarks:** No conversion, churn, refund, support-ticket, lifetime-value, retention, discount, or pricing benchmark is supplied. All numeric examples below are explicitly labeled arithmetic scenarios.
- **Product-status guardrail:** ArraySubs lifetime billing is present in the free core. It creates a managed subscription with no recurring payment date. This is separate from the commercial annual/lifetime licensing options for ArraySubs Pro itself.
- **Accounting/legal guardrail:** The proposed “reserve” is an internal planning amount, not an accounting provision or revenue-recognition conclusion. A qualified accountant and local lawyer must determine financial reporting, tax, consumer-law, refund, and contract treatment.

## Editorial thesis

A lifetime deal is financially sound only when one upfront payment can cover the acquisition and delivery costs incurred now **and** the long-tail costs the seller promises to carry later. Recurring billing is generally better aligned with products whose value or cost continues over time. Compare the models using realized contribution and matched service obligations—not headline revenue alone.

The article should make four distinctions unusually clear:

1. **Cash is not contribution.** A lifetime cohort can create strong launch cash and still become unprofitable after years of support, infrastructure, updates, refunds, or third-party costs.
2. **No renewal is not the same as no future cost.** Lifetime buyers can remain active users and support requesters without generating another payment.
3. **“Lifetime” is incomplete without scope.** The offer must identify whose lifetime, which version/content/service is included, whether updates and support continue, and what happens if the product or business ends.
4. **A lifetime billing period is not an immutable access promise.** In ArraySubs, no renewal invoice is scheduled and payment-count expiration is bypassed, but access can still depend on subscription status and merchant terms.

This is a strategy comparison, not a configuration tutorial. Link to the ArraySubs lifetime recipe for setup and keep implementation details to a concise, verified behavior note.

## Direct-answer fact pattern

> Choose a lifetime deal when one upfront price can fund the buyer's expected long-term support, infrastructure, updates, refunds, and risk reserve. Choose recurring billing when value and costs continue over time. Compare lifetime price with realized recurring contribution—not revenue alone—and define exactly whose lifetime, which benefits, usage limits, updates, support, and termination rights are included.

This is 55 words. It directly answers the query and introduces the financial and disclosure tests without claiming a universal winner.

## Key takeaways for the article

1. A lifetime deal is one payment for a defined ongoing entitlement; a recurring subscription requires successive payments for continuing access, service, or fulfillment.
2. `Lifetime price ÷ recurring price` calculates only gross-payment equivalence. It is not a profit break-even point.
3. Price lifetime offers from an internal support/infrastructure reserve plus immediate costs and target contribution; do not price from a competitor's multiple.
4. Recurring revenue is earned one successful payment at a time. Cancellation, failed payments, refunds, credits, and cost-to-serve determine realized contribution.
5. Lifetime deals fit bounded, low-variable-cost entitlements better than hosted, usage-heavy, support-intensive, or continuously updated services.
6. Hybrid offers can isolate the durable entitlement from recurring services: lifetime self-hosted software plus annual cloud service, or lifetime current content plus recurring future releases.
7. Grandfathering should preserve a recorded cohort's promised scope. It does not require extending old terms to new customers.
8. ArraySubs Free supports a lifetime billing period: one checkout payment, no renewal date, no recurring renewal invoice, and no payment-count expiration.
9. The article should say “no scheduled recurring charge” rather than “access can never end.” Cancellation, refund, breach, or an administrative status change can affect the entitlement.
10. The checkout page must show the full one-time price and lifetime scope near the purchase action; avoid hidden charges, fake discounts, and unexplained recurring add-ons.

## Definitions and entity boundaries

| Model | Customer payment pattern | Merchant obligation | Primary planning risk | Do not confuse it with |
| --- | --- | --- | --- | --- |
| **Lifetime deal** | One payment | Defined ongoing entitlement under stated terms | Future support, hosting, update, and discontinuation cost without another payment | “Everything forever,” unless the contract explicitly says that |
| **Open-ended recurring subscription** | Payment each period until cancellation | Continue access/service while the subscription remains eligible | Failed renewals, churn, cancellation, and recurring delivery cost | A guaranteed stream of future revenue |
| **Fixed-cycle subscription** | A stated number of total periodic payments | Deliver each paid cycle, then expire under the lifecycle rules | Collection and fulfillment across the finite schedule | One prepaid payment |
| **Prepaid fixed term** | One payment covers a stated finite term | Deliver the entire paid term | Refund and unfulfilled-obligation exposure | Lifetime access |
| **Ordinary one-time product** | One payment | Deliver the purchased file/item/license scope | Product/refund/support scope | A managed subscription record |
| **Perpetual license** | Usually one payment for continued use of a version | Permit use under the license terms | Compatibility, activation, transfer, and update ambiguity | Perpetual support or every future version |
| **Installment plan** | Several payments toward a fixed purchase obligation | Deliver according to the purchase contract | Default and consumer-credit/contract treatment | A cancel-anytime subscription |

### The language test for “lifetime”

Every lifetime offer should complete this sentence:

> One payment grants **[buyer/account/license]** access to **[specific product/version/content/service]** for **[defined lifetime/end condition]**, including **[updates/support/cloud/usage scope]**, subject to **[limits, refund, suspension, and discontinuation terms]**.

If the seller cannot complete the sentence in plain language, the commercial model is not ready for a product page.

### Lifetime access is not automatically lifetime support or updates

These can be separate promises:

- right to keep using the downloaded version;
- access to future minor updates;
- access to all future major versions;
- compatibility/security maintenance;
- human support through a ticket channel;
- a service-level target;
- hosted activation, API, AI, storage, video, email, or community access;
- access to new content released after purchase.

The article must not combine them into the word “lifetime.” A low-cost perpetual version license can be viable while unlimited human support and hosted usage at the same price are not.

## Quick financial-model comparison

### Variables

Let:

- `L` = lifetime purchase price;
- `R_k` = the recurring payment successfully collected in period `k`;
- `A` = allocated acquisition cost;
- `O` = onboarding or immediate service cost;
- `G_0` = payment/gateway cost on the initial transaction;
- `G_k` = payment/gateway cost in recurring period `k`;
- `Q` = internal refund/chargeback allowance for the modeled cohort;
- `C_t` = expected support, infrastructure, third-party, and update cost in year `t`;
- `H` = the internal planning horizon in years;
- `r` = the merchant's internal discount rate, if a present-value scenario is used;
- `T` = target contribution after the specified modeled costs.

Do not copy a horizon, allowance, or discount rate from this article. Set them from the merchant's own cost history, product roadmap, terms, and risk tolerance.

### Lifetime cash and contribution

```text
Cash after immediate costs
= L − A − O − G_0 − actual refunds/chargebacks

Undiscounted support/service reserve over H years
= Σ C_t, for t = 1 through H

Present-value reserve scenario
= Σ [C_t ÷ (1 + r)^t], for t = 1 through H

Illustrative lifetime price floor
= A + O + G_0 + Q + reserve_H + T
```

The “price floor” is a management model, not a generally accepted accounting measure. It deliberately makes the otherwise hidden future obligation visible.

### What belongs in annual cost `C_t`

```text
C_t
= (support tickets_t × cost per ticket_t)
+ hosting/storage/API/email/AI cost_t
+ third-party license cost_t
+ security and compatibility allocation_t
+ update/content-production allocation_t
+ moderation or community cost_t
```

Use actual first-party data where available. If history does not exist, model low/base/high scenarios and cap the initial lifetime cohort.

### Recurring contribution

```text
Recurring contribution through n successful periods
= Σ [R_k − G_k − variable service cost_k]
− A − O − refunds/chargebacks through n
```

The phrase **successful periods** matters. A future renewal is not revenue or cash until it is collected, and a collected payment can still be refunded.

### Lifetime contribution through a matched horizon

```text
Lifetime contribution through year H
= L − A − O − G_0
− actual refunds/chargebacks
− Σ C_t, for t = 1 through H
```

Only compare the two models after matching the included product scope, support, updates, usage, and observation horizon.

### Gross-payment equivalence is not break-even

```text
Gross recurring-payment equivalence = L ÷ recurring price per period
```

For a $300 lifetime price and $120 annual price, gross equivalence is `300 ÷ 120 = 2.5` annual payments. This does not account for gateway costs, acquisition, refunds, support, hosting, updates, or whether years two and three are paid. Label it “gross-payment equivalence,” never “profit break-even.”

### Contribution crossover

The useful comparison is the first successfully paid recurring period where cumulative recurring contribution is at least the lifetime cohort's contribution over the same elapsed service horizon:

```text
Crossover period
= smallest n where recurring contribution_n ≥ lifetime contribution_n
```

There may be no crossover if recurring customers do not renew long enough. Conversely, the lifetime model can cross below zero if future cost continues after its one payment.

## Worked arithmetic scenario — not a benchmark

Compare two offers for the same entitlement:

- lifetime: $300 once;
- recurring: $120 per year, if renewed and successfully paid;
- immediate acquisition, payment, and onboarding allocation: $60 in year one for either model;
- support plus infrastructure: $36 per active customer per year;
- no tax, refund, chargeback, discounting, price increase, other fee, or fixed-overhead allocation.

### Lifetime scenario

```text
Year 1 contribution = $300 − $60 − $36 = $204
Year 2 cumulative contribution = $204 − $36 = $168
Year 3 cumulative contribution = $168 − $36 = $132
Year 5 cumulative contribution = $300 − $60 − (5 × $36) = $60
Year 7 cumulative contribution = $300 − $60 − (7 × $36) = −$12
```

Five-year internal allocation of the $300 receipt:

| Allocation | Amount | Purpose |
| --- | ---: | --- |
| Immediate acquisition/payment/onboarding | $60 | Cost incurred now |
| Five years of modeled support/infrastructure | $180 | `5 × $36`; internal reserve scenario |
| Remaining contribution before omitted costs/overhead | $60 | Not “profit” after every business cost |

### Recurring scenario, only if each annual payment succeeds

```text
Year 1 contribution = $120 − $60 − $36 = $24
Each later paid year adds = $120 − $36 = $84
Year 2 cumulative contribution = $24 + $84 = $108
Year 3 cumulative contribution = $108 + $84 = $192
Year 5 cumulative contribution = $360
```

| Elapsed service year | Lifetime cumulative contribution | Recurring cumulative contribution if paid each year |
| ---: | ---: | ---: |
| 1 | $204 | $24 |
| 2 | $168 | $108 |
| 3 | $132 | $192 |
| 4 | $96 | $276 |
| 5 | $60 | $360 |
| 6 | $24 | $444 |
| 7 | -$12 | $528 |

Under these assumptions, recurring cumulative contribution first exceeds lifetime contribution in year three. That does **not** mean the recurring model universally wins in year three; it only describes this scenario if all shown annual payments succeed.

### What the arithmetic teaches

- Lifetime creates more cash and modeled contribution immediately.
- The same lifetime contribution declines as service cost continues.
- Recurring contribution begins lower because it does not collect future years at signup.
- Every successful later recurring payment funds another service period.
- A launch-revenue comparison would favor lifetime while hiding future service liability.
- A mature-cohort comparison needs active usage, support, refund, renewal-success, and infrastructure data.

## Cash timing, renewal risk, and long-tail liability

| Decision factor | Lifetime deal | Recurring subscription | Measurement that matters |
| --- | --- | --- | --- |
| Cash timing | Large receipt at signup | Cash arrives period by period | Net cash after fees/refunds, by cohort |
| Renewal/churn exposure | No renewal decision for the covered entitlement | Each period can fail, cancel, or renew | Successful renewal rate and realized contribution |
| Support exposure | Can continue without another payment | Later payments can fund later support | Annual support cost per active customer |
| Infrastructure exposure | Dangerous when usage creates ongoing variable cost | Price can remain aligned with continued service | Cost per active user/account/usage unit |
| Update obligation | Must be funded from original price if included | Continuing payments can fund compatibility and security work | Update/security allocation by active cohort |
| Price changes | Existing lifetime receipt cannot be repriced | New and, subject to terms/law, existing pricing may evolve | Contribution after price and cost changes |
| Customer simplicity | One payment; no renewal failure | Smaller entry price; continued payment decision | Conversion, refunds, support questions, cancellation |
| Forecasting | Cohort cost tail is uncertain | Future payments and retention are uncertain | Low/base/high cohort scenarios |
| Discontinuation | High sensitivity to unclear “lifetime” wording | Service can usually end with cancellation/term rules | Complaints, refunds, legal review, end-of-life plan |

### Support-capacity formula

For a lifetime cohort:

```text
Expected annual tickets
= active lifetime customers × observed tickets per active lifetime customer per year

Support labor cost
= expected annual tickets × observed loaded cost per resolved ticket

Capacity-limited cohort size
= floor(annual support capacity allocated to lifetime buyers
        ÷ expected tickets per lifetime buyer)
```

This is a reason to start with a capped cohort when the product has no mature support history. The article must not supply a universal ticket rate.

### Reserve-coverage check

```text
Modeled reserve coverage ratio
= remaining lifetime reserve ÷ modeled next-12-month lifetime-cohort cost
```

This is an internal risk indicator, not an accounting ratio. A ratio below `1` in the merchant's own model means the earmarked amount does not cover the next modeled year; it does not by itself determine legal solvency or recognized liabilities.

## Use-case decision matrix

| Product/use case | Better starting model | Why | Lifetime-safe boundary or alternative |
| --- | --- | --- | --- |
| Static downloadable archive | Ordinary one-time or lifetime | Delivery cost can be bounded | Define the files/version and support scope |
| Self-hosted plugin/theme with compatibility and security work | Recurring or hybrid | Ongoing ecosystem changes create update/support cost | Perpetual current-version use; annual updates/support |
| Hosted SaaS | Recurring | Hosting, monitoring, support, and development continue | Lifetime base entitlement with separately metered/recurring hosted service |
| API, AI, storage, email, or compute service | Recurring/usage-based | Variable cost scales with use | One-time credit pack with explicit units/expiry, not vague unlimited lifetime |
| Moderated community or membership | Recurring | Moderation, programming, and platform cost continue | Capped founding lifetime cohort with reserve and fair-use rules |
| Stable self-paced course | Lifetime or hybrid | Existing content can be bounded | Lifetime current course; paid coaching, community, or future library releases |
| Continuously expanding course/library | Recurring or hybrid | New production creates continuing value/cost | Lifetime content available at purchase; recurring new releases |
| Template/asset pack | One-time/lifetime or hybrid | A fixed library can be defined | Separate current pack from future drops/support |
| Physical replenishment box | Recurring | Each cycle has product, shipping, and handling cost | Use prepaid fixed cycles for gifts, not lifetime fulfillment |
| Consulting/agency support | Fixed package or recurring retainer | Human capacity is finite | Sell hours/deliverables, never undefined lifetime help |
| Association/club | Annual/fixed-date | Benefits, administration, and events recur | Founding recognition can be lifetime; operating benefits remain annual |
| Founding launch cohort | Capped lifetime or hybrid | Can accelerate cash and adoption | Cap units, create reserve, record terms, and stop sales at the cap |
| Product with unknown cost to serve | Recurring pilot | Lifetime price cannot be modeled responsibly yet | Collect cost/support data before any capped lifetime experiment |

### Five-question fit test

A lifetime deal is a candidate only when the operator can answer “yes” to all five:

1. Can the entitlement be described without using “everything forever”?
2. Can expected long-term support, infrastructure, updates, refunds, and third-party costs be modeled from defensible inputs?
3. Can usage or support be bounded without undermining the promise?
4. Can the business fund a reserve and survive a low/base/high cost scenario?
5. Can the checkout, receipt, account area, and legal terms show the same scope and end conditions?

If one answer is no, start with recurring, a fixed term, prepaid cycles, a one-time versioned product, or a capped credit pack.

## Hybrid launch and grandfathering options

| Hybrid structure | One-time component | Recurring/paid-later component | Best fit |
| --- | --- | --- | --- |
| Perpetual version + maintenance | Continued use of purchased major version | Future major versions, updates, or support | Self-hosted software |
| Lifetime core + hosted service | Local/core capability | Cloud sync, API, AI, storage, email, monitoring | Software with variable infrastructure |
| Lifetime current library + new-release pass | Content available at purchase | Future content drops | Courses, templates, media |
| Lifetime access + defined support window | Product access | Support after 12 months, for example | Low-touch digital product; exact term must be disclosed |
| Founding cohort | Capped buyers receive recorded lifetime terms | New buyers use recurring terms | Early launch with controlled liability |
| Locked recurring price | No lifetime promise | Recurring price remains fixed for eligible cohort | Products that still need ongoing funding |
| One-time credit pack | Defined amount of usage | Top-ups or subscription after credits | APIs/AI/services where “unlimited lifetime” is unsafe |

### Grandfathering checklist

When changing future sales from lifetime to recurring:

- identify the exact eligible purchase dates, SKUs, versions, tiers, and receipts;
- preserve the terms actually presented to that cohort;
- store the entitlement scope independently from mutable current product copy;
- say whether support, updates, cloud features, site limits, and major versions are included;
- do not silently convert a one-time cohort into auto-renewal;
- give support staff a cohort lookup and approved explanation;
- disclose any voluntary migration offer separately from the existing entitlement;
- obtain legal/accounting review before changing a material promise.

WooCommerce's current public FAQ provides a vendor-specific example: it says customers with qualifying older purchases that were sold lifetime support and updates were grandfathered. Use this only as an example of recording and honoring an earlier cohort, not as a rule that every software seller must copy.

## Acquisition, price anchoring, and checkout disclosure

### Honest comparison copy

- Show the complete one-time amount, currency, applicable taxes/fees treatment, and “no scheduled recurring charge.”
- If comparing with annual billing, label `lifetime price ÷ annual price` as gross-payment equivalence.
- State when the options differ in support, updates, hosting, usage, site limits, or versions; otherwise the comparison is not like-for-like.
- Put support/update scope close to price and the purchase button, not only in a distant policy page.
- Do not say “save $X forever” unless the time horizon, future price, renewal, and inclusion assumptions are visible.
- Do not label a crossed-out price as a former price unless it is factually supportable in the relevant market.
- Avoid fake scarcity, fake countdowns, hidden mandatory fees, preselected recurring add-ons, or a small one-time charge that unexpectedly enrolls a customer into continuity billing.

The FTC staff report on dark patterns identifies hidden costs, drip pricing, hidden subscription/forced continuity, misdirection, and false hierarchy as manipulative interface patterns. Use it to support transparent-interface guidance, not as a claim that every listed pattern is automatically illegal in every jurisdiction.

### Required disclosure checklist

| Disclosure | Question the product page must answer |
| --- | --- |
| Charge | What exactly is due today? Is there any auto-renewal? |
| Lifetime definition | Whose lifetime or which product/business/version life is meant? |
| Included entitlement | Which files, features, content, sites, seats, devices, or domains are covered? |
| Updates | Minor updates, major versions, security fixes, and compatibility for how long? |
| Support | Channel, duration, response target, exclusions, and whether support can be purchased later? |
| Hosted/variable services | Are cloud, API, AI, email, storage, bandwidth, activation, or community services included and limited? |
| Usage and fair use | What measurable limit applies and what happens after it? |
| Transfer | Can the license/account be transferred, resold, or shared? |
| Refunds | Eligibility, method, timing, and effect on access? |
| Suspension/termination | What breach, abuse, refund, chargeback, or administrative action can end access? |
| Discontinuation | What happens if the product, hosted service, or business ends? |
| Taxes/third parties | What is excluded from the displayed price or controlled by another provider? |
| Proof and account | Where can the customer see the receipt, entitlement, scope, and current status? |

Link to A013 for the deeper terms treatment and A014 for product-page anatomy. Keep the A012 treatment at decision-framework depth.

## How to compare a pilot without fooling yourself

### Early signals

- eligible product-page visitors;
- selection mix between lifetime and recurring;
- checkout conversion by clearly disclosed option;
- cash collected net of payment fees;
- refunds and chargebacks;
- onboarding/support contacts per buyer;
- activation and first-use rate;
- reason-coded sales/support objections.

### Mature signals

- cumulative net contribution by purchase cohort;
- annual support and infrastructure cost per active lifetime customer;
- successful recurring payments by eligible period;
- active usage by cohort;
- compatibility, security, content, and third-party cost allocations;
- remaining modeled lifetime reserve and next-year coverage;
- cancellation, refund, and access-status outcomes;
- support backlog and capacity consumed by legacy cohorts.

Do not declare lifetime the winner from launch cash or recurring the winner from scheduled renewal value. Compare realized cash and matched costs over time. No universal experiment duration or sample size is supplied because traffic, price, variance, refund window, and renewal interval differ.

### Safer pilot controls

1. Cap the number of lifetime units before launch.
2. Record low/base/high cost scenarios and the stop condition.
3. Keep lifetime and recurring scope explicitly comparable or label differences.
4. Preserve the terms and checkout evidence shown to each cohort.
5. Review support and infrastructure cost before releasing another cohort.
6. Stop sales when capacity or reserve triggers are reached; do not rely on artificial urgency.

## Verified ArraySubs behavior and truth gate

### What current first-party material supports

- ArraySubs 1.8.9 exposes **Lifetime Deal** as a billing-period option for simple and variable subscription products.
- Product normalization forces the lifetime interval to `1`, length to `0`, and disables a separate renewal price.
- Checkout displays **“Lifetime Deal — No recurring charges.”**
- The created order still produces a managed ArraySubs subscription record. This enables subscription-aware account, status, and access workflows rather than treating the purchase as an unrelated ordinary product.
- `arraysubs_calculate_next_payment_date()` returns an empty date for `lifetime`.
- The renewal processor rejects lifetime renewal-invoice creation.
- The expiration checker bypasses payment-count expiration for lifetime subscriptions.
- Manual subscription actions leave the next-payment field empty for lifetime and reject skip-payment because no recurring payments exist.
- Current public ArraySubs documentation describes Lifetime Deal as one-time purchase, no renewals, and its subscription operations guide displays “No recurring payment” for lifetime records.
- Current first-party feature content lists Lifetime Deals in the free tier. ArraySubs Pro is not required merely to use the lifetime billing period.

### Important caveats the article must preserve

1. **Do not promise immutable “permanent” access from billing behavior alone.** The customer-cancellation helper currently permits active/trial/pending records without excluding lifetime. The default cancellation setting is immediate. Immediate cancellation changes the subscription to `arraysubs-cancelled`.
2. **Status can affect access.** The current Members Access role manager treats `arraysubs-active` and `arraysubs-trial` as access-active and removes mapped roles when an active subscription changes to cancelled or expired, absent another qualifying subscription.
3. **End-of-period cancellation is not naturally defined for lifetime.** Scheduled cancellation requires a future next-payment or end date, while lifetime has no recurring payment date. This edge was read from code, not browser-tested.
4. **Refund/access behavior must be tested for the configured store.** WooCommerce supports automatic or manual refunds depending on the gateway, but refund recording and entitlement revocation are separate lifecycle questions. Do not say a refund automatically ends ArraySubs lifetime access without a current end-to-end test.
5. **Trials need explicit verification.** Current checkout display suppresses trial display for lifetime, but this research did not run a product-save and checkout test covering stored trial metadata. Do not discuss lifetime trials as supported or impossible.
6. **The ArraySubs recipe currently uses stronger “permanent access” language.** For this strategy article, use “ongoing access under the stated entitlement and status terms” until cancellation, refund, and discontinuation behavior is tested and documented end to end.
7. **Separate product capability from ArrayHash's own Pro license offer.** If ArrayHash sells annual and lifetime Pro licenses, those commercial terms are its specific promise; they do not define all lifetime deals created with ArraySubs.

### Concise product behavior copy approved for the article

> ArraySubs Free includes a Lifetime Deal billing period. The buyer pays once, the checkout identifies that there are no recurring charges, and ArraySubs keeps a managed subscription record without scheduling a renewal date or payment-count expiration. Define access, updates, support, refunds, cancellation, and end-of-life terms separately; “no renewal” does not make those promises automatic.

### Do not duplicate the recipe

The article may link to `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/` as the setup example. Do not repeat field-by-field steps. It can link to monthly/annual and prepaid fixed-cycle recipes to show alternatives:

- `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`
- `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`

## Recommended article structure

1. Direct answer (40–60 words) and key-takeaways box.
2. Definition table: lifetime, recurring, fixed-cycle, prepaid, one-time product, perpetual license.
3. Quick financial model and gross-equivalence warning.
4. Worked $300 vs $120/year scenario with matched support cost.
5. Cash timing, renewal risk, support liability, updates, and infrastructure.
6. Use-case decision matrix and five-question fit test.
7. Acquisition/anchoring and required checkout disclosures.
8. Hybrid and grandfathering structures.
9. Pilot measurement and stop controls.
10. Concise verified ArraySubs behavior with link to recipe.
11. Decision tree, five FAQs, limitations, and CTA.

The CTA **View Pro Pricing** should appear after the main decision framework. It can explain that core lifetime billing is free while Pro adds other workflows, but it must not imply Pro is required for Lifetime Deal mode.

## Decision tree copy

```text
Does value or variable cost continue over time?
├─ Yes
│  ├─ Can the ongoing part be separated?
│  │  ├─ Yes → Hybrid: lifetime bounded asset + recurring service
│  │  └─ No  → Recurring subscription
│  └─ Is the lifetime cohort capped and fully reserved?
│     ├─ Yes → Consider a limited, recorded pilot
│     └─ No  → Recurring subscription
└─ No
   ├─ Is the entitlement finite and versionable?
   │  ├─ Yes → One-time product or carefully scoped lifetime deal
   │  └─ No  → Define the entitlement before pricing
   └─ Can the seller state lifetime, updates, support, and end conditions?
      ├─ Yes → Price from modeled cost + reserve + target contribution
      └─ No  → Do not launch as “lifetime”
```

## Visual and image plan

All generated assets should be flat editorial illustrations: solid fills, generous whitespace, restrained shadows only if needed, no gradients, no neon/funky color effects, no fake UI screenshots, and no invented statistical labels. Suggested palette: purple `#873EFF`, green `#18A554`, orange `#FE8218`, ink `#12002B`, pale lavender `#F0E9FF`, off-white `#FBFAFD`.

1. **Hero — one payment vs recurring timeline**
   - Split flat illustration: left, one large coin/receipt feeding a long support path; right, annual payment markers funding successive service stages.
   - Include calm human figures evaluating two routes.
   - Alt: “Lifetime deal pays once while recurring subscription payments fund successive service periods.”

2. **Formula board — price floor anatomy**
   - Text-and-shape equation: immediate costs + refund allowance + long-term reserve + target contribution = modeled lifetime price floor.
   - No decorative numbers.
   - Alt: “Lifetime price floor combines immediate costs, refund allowance, long-term reserve, and target contribution.”

3. **Donut chart — illustrative $300 five-year allocation**
   - Solid-color donut: $60 immediate costs, $180 modeled five-year support/infrastructure reserve, $60 remaining before omitted costs.
   - Label “illustrative scenario, not benchmark.”
   - Alt: “Illustrative $300 lifetime receipt allocates $60 to immediate costs, $180 to five-year service reserve, and $60 remaining.”

4. **Line chart — contribution crossover**
   - Two clean lines across years 1–7 using the exact table above: lifetime `[204,168,132,96,60,24,-12]`; recurring-if-paid `[24,108,192,276,360,444,528]`.
   - Annotate crossover at year 3 and “all shown recurring payments succeed.”
   - Alt: “Illustrative cumulative contribution shows recurring exceeding lifetime in year three under stated assumptions.”

5. **Bar chart — cash now vs later funding**
   - Year-one and year-five bars for the same scenario; separate cash timing from cumulative contribution.
   - Do not add percentages.
   - Alt: “Lifetime produces more first-year cash while recurring funding accumulates over successful renewal years.”

6. **Decision matrix**
   - Four-quadrant flat matrix: low/high variable cost against bounded/continuous value; place static download, course, self-hosted plugin, SaaS/API/community examples.
   - Alt: “Product-model matrix maps bounded low-cost products toward lifetime and ongoing variable-cost services toward recurring.”

7. **Decision flowchart**
   - Turn the decision-tree copy into a compact solid-color flow with yes/no branches and human operator at the start.
   - Alt: “Decision flow for choosing lifetime, recurring, hybrid, or one-time pricing.”

8. **Disclosure anatomy**
   - Flat product-card diagram with callouts for price, no-renewal statement, lifetime definition, updates, support, usage limits, refund, and discontinuation.
   - Alt: “Lifetime offer product card highlights the terms customers should see before paying.”

9. **Hybrid model ladder**
   - Three stacked bands: lifetime bounded asset, recurring service, metered usage; examples beside each.
   - Alt: “Hybrid offer separates a bounded lifetime asset from recurring service and metered usage.”

10. **Support-capacity illustration**
    - Flat bar or human/support-desk shapes showing active lifetime cohort → annual tickets → support hours/cost.
    - Use variables, not invented rates.
    - Alt: “Support-capacity model links active lifetime customers to annual tickets and service cost.”

11. **ArraySubs lifecycle diagram**
    - Product set to Lifetime Deal → one checkout payment → managed subscription active → no next payment/no renewal invoice → status-based entitlement.
    - Add a small caveat branch for refund/cancellation/admin status change.
    - Alt: “ArraySubs lifetime billing creates a managed subscription without a recurring payment date while access remains status- and terms-dependent.”

12. **Risk balance illustration**
    - Scale with launch cash on one side and future support/infrastructure/update obligations on the other; human team reviewing a reserve ledger.
    - Alt: “A lifetime deal balances upfront cash against long-term support, infrastructure, and update obligations.”

### Chart accessibility rules

- Put the worked values in an HTML table next to the chart.
- Do not rely on color alone; use direct labels, line patterns, and markers.
- Keep chart titles explicit about “illustrative” and “if paid.”
- Use meaningful alt text and visible captions.
- Avoid text baked into images when equivalent HTML can be placed beside the asset.

## Five FAQ answers

### 1. What is the difference between a lifetime deal and a subscription?

A lifetime deal takes one payment for a defined ongoing entitlement and schedules no recurring renewal for that entitlement. A subscription charges on a stated cadence while access, service, or fulfillment continues. “Lifetime” must still define included versions, updates, support, hosted services, limits, refunds, suspension, and end-of-life conditions.

### 2. How should I price a lifetime deal?

Add immediate acquisition, payment, onboarding, and refund allowances to a low/base/high model of future support, infrastructure, third-party, security, and update costs. Add the contribution your business requires. Treat any reserve as an internal planning model, not accounting or legal advice, and cap the first cohort when cost history is weak.

### 3. How many recurring payments equal a lifetime price?

Divide lifetime price by the recurring price to find gross-payment equivalence. For example, `$300 ÷ $120 = 2.5` annual payments. That is not profit break-even because it omits fees, support, hosting, updates, refunds, failed renewals, and scope differences. Compare cumulative realized contribution over the same service horizon instead.

### 4. Does lifetime access include support and updates forever?

Not automatically. Lifetime access, future versions, compatibility/security updates, human support, cloud services, and new content are separate promises. The seller should state each one. The customer should not need to infer them from a “lifetime” badge or from the absence of a renewal charge.

### 5. Can ArraySubs sell both lifetime and recurring products?

Yes. Current ArraySubs Free supports regular recurring periods and a Lifetime Deal billing period. Lifetime checkout is labeled as having no recurring charges and creates a managed subscription without a next-payment date or renewal invoice. Use separate products or variations as appropriate, and define entitlement, support, cancellation, refund, and update terms independently.

## Internal-link map

- Commercial pillar: `/deals/arraysubs/`
- Feature hub: `/deals/arraysubs/features/#products-checkout`
- Monthly vs annual recipe: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`
- Prepaid fixed-cycle alternative: `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`
- Lifetime setup example: `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- A011: Customer-Chosen Subscription Duration: Use Cases, UX, and Risk Controls
- A013: Subscription Terms Customers Must See Before They Pay
- A014: Anatomy of a High-Converting WooCommerce Subscription Product Page

Avoid reproducing lifetime setup steps. The related recipe owns product-specific configuration intent.

## Source notes

### First-party ArraySubs sources

1. **ArraySubs product page** — current feature/tier claims and commercial context.  
   https://arrayhash.com/deals/arraysubs/
2. **ArraySubs: Create and Configure Subscription Products** — billing-period table describes Lifetime Deal as one-time purchase/no renewals and says interval becomes fixed.  
   https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html
3. **ArraySubs: Subscription Operations** — documents “No recurring payment” for lifetime next-payment display.  
   https://support.arrayhash.com/arraysubs/manage-subscriptions/subscription-operations.html
4. **ArraySubs: Billing and Renewals** — current recurring lifecycle explanation.  
   https://support.arrayhash.com/arraysubs/billing-and-renewals/
5. **Repository feature data** — `web-content/app/deals/arraysubs/features/_data.ts`, `lifetime-deals` block; current tier and copy.
6. **Repository recipe** — `web-content/app/deals/arraysubs/use-cases/_recipes.ts`, `lifetime-deal-one-time`; linked setup example and copy that needs entitlement caveats in the strategy article.
7. **ArraySubs product helpers and save normalization** — `arraysubs/src/functions/product-helpers.php`; `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`; lifetime interval/length/renewal-price behavior.
8. **ArraySubs checkout display and creation path** — `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CheckoutDisplayTrait.php`; `arraysubs/src/Features/SubscriptionCheckout/views/checkout-subscription-summary.php`; managed record and no-recurring-charge presentation.
9. **ArraySubs subscription helpers** — `arraysubs/src/functions/subscription-helpers.php`; empty lifetime next-payment date and lifetime detection.
10. **ArraySubs renewal/expiration/manual-action code** — `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`; `ExpirationChecker.php`; `arraysubs/src/Features/SubscriptionAdmin/REST/ManualController.php`.
11. **ArraySubs cancellation/access caveat** — `arraysubs/src/functions/cancellation-helpers.php`; `arraysubs/src/functions/settings-helpers.php`; `arraysubs/src/Features/CustomerPortal/REST/CustomerController.php`; `arraysubs/src/Features/MembersAccess/Services/RoleManager.php`.

### Official external sources

12. **WooCommerce: Creating a Subscription Product** — distinguishes recurring cadence and finite total payments and explains that recurring schedules generate renewal orders.  
    https://woocommerce.com/document/subscriptions/creating-subscription-products/
13. **WooCommerce: Edit an Existing Subscription** — describes subscriptions as agreements for future payments and the renewal process.  
    https://woocommerce.com/document/subscriptions/add-or-modify-a-subscription/update-an-existing-subscription/
14. **WooCommerce: Subscription Status Guide** — status represents subscription lifecycle state and activation calculates the next payment when applicable.  
    https://woocommerce.com/document/subscriptions/statuses/
15. **WooCommerce: Subscriptions FAQ** — operational renewal behavior and the vendor-specific grandfathering example for qualifying older lifetime support/update purchases.  
    https://woocommerce.com/document/subscriptions/faq/
16. **WooCommerce: Refunding Orders** — automatic versus manual refund processing and gateway dependence; supports the need to test refund workflows rather than infer them.  
    https://woocommerce.com/document/woocommerce-refunds/
17. **WooCommerce: Refund and Return Policy Guidelines** — recommends clear eligibility, method, timing, and locally compliant policy.  
    https://woocommerce.com/document/refund-policy-page-guidelines/
18. **FTC staff report: Bringing Dark Patterns to Light** — hidden costs, drip pricing, hidden subscriptions/forced continuity, misdirection, and false hierarchy.  
    https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf

## Evidence-to-claim boundaries

- WooCommerce documentation describes WooCommerce/WooCommerce Subscriptions behavior; do not present it as every subscription system's universal lifecycle.
- ArraySubs repository observations are first-party source findings from versions 1.8.9/1.1.0; they are not a live end-to-end test.
- The FTC document is a United States staff report and interface-risk source, not a jurisdiction-neutral legal opinion.
- The arithmetic scenario demonstrates relationships only. It predicts no merchant's renewal, support, refund, or profit outcome.
- No external benchmark is required to choose a model; first-party costs, scope, and cohort behavior are the decision inputs.

## Limitations and refresh triggers

- No merchant ledger, cohort, support-ticket, hosting, refund, or renewal dataset was supplied.
- No live checkout, cancellation, refund, reactivation, role-removal, or trial test was run.
- Customer cancellation of lifetime records, refund-to-entitlement behavior, and stored trial metadata need browser plus order/subscription-state verification before procedural claims.
- Future support, compatibility, security, infrastructure, content, and third-party costs are uncertain; low/base/high scenarios are necessary.
- The reserve examples are internal planning constructs and exclude accounting, tax, recognized-liability, solvency, and legal analysis.
- Consumer, cancellation, refund, warranty, tax, and digital-content rules vary by country/state and product type.
- Named author and technical reviewer credentials were not available in research. Publishing must add both; do not invent identities or experience.
- Refresh after ArraySubs lifetime, cancellation, access, refund, trial, or pricing changes; after material WooCommerce subscription/refund documentation changes; and at least quarterly for commercial comparison claims.

## Editorial red flags

Do not publish any of these without changing or substantiating them:

- “Lifetime deals are pure profit after checkout.”
- “Recurring revenue is guaranteed.”
- “A $300 lifetime deal breaks even after 2.5 annual renewals.”
- “Lifetime automatically includes every future version and support forever.”
- “ArraySubs lifetime access can never be cancelled or revoked.”
- “Refunding the order always removes lifetime access.”
- “Every SaaS should avoid lifetime deals.”
- “Lifetime deals always improve conversion.”
- “This discount is best practice” without first-party data.
- “Only X lifetime seats remain” unless a real, enforced capacity limit exists.
