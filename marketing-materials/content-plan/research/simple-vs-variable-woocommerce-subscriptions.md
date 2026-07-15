# Research dossier: Simple vs Variable WooCommerce Subscriptions (A004)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/004-simple-vs-variable-woocommerce-subscriptions-which-product-type-fits.md`  
**Publishing standard:** `web-content/content-plan/plan/07-seo-geo-publishing-standard.md`  
**Evidence policy:** current official WooCommerce documentation plus current ArraySubs code, architecture docs, and first-party product page. No third-party conversion claims, benchmarks, or invented usage data.

## Scope, current-version caveat, and test status

This article should answer a product-architecture question: should one sell a single subscription offer or present several closely related subscription options as variations under one parent product? It should not repeat the exact ArraySubs setup owned by the monthly/annual recipe.

A crucial 2026 caveat must appear near the top: **WooCommerce Subscriptions 9.0 now recommends adding subscription plans to standard Simple, Variable, Bundle, and Composite products.** Its older dedicated “Simple Subscription” and “Variable Subscription” product types remain supported, but new development is focused on plans. The article can still use “simple subscription” and “variable subscription” as clear product-model concepts, but screenshots and click paths must name the exact engine/version.

ArraySubs product truth was checked in the workspace on 2026-07-13:

- ArraySubs core **1.8.9** and ArraySubs Pro **1.1.0** were inspected.
- ArraySubs uses normal WooCommerce **Simple** and **Variable** products with a Subscription toggle and subscription fields. It does not use WooCommerce Subscriptions’ dedicated product-type classes.
- This pass inspected code and documentation; it did not execute an end-to-end signup, renewal, switch, or analytics import. Any published “observed” claims need a dated test environment and original screenshots.

Primary current-version sources:

- Woo subscription-product creation and 9.0 product-type guidance: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- Woo FAQ explanation of dedicated product-type deprecation: https://woocommerce.com/document/subscriptions/faq/
- Woo variable-product behavior: https://woocommerce.com/document/variable-product/

## Recommended direct answer (40–60 words)

> Choose a simple WooCommerce subscription when one product has one price, billing schedule, and entitlement. Choose a variable subscription when customers must select related options—such as tier, size, or monthly versus annual billing—on one product page. Variable products improve choice consolidation but multiply configuration, testing, switching, and reporting work.

The opening should make the verdict conditional rather than declaring variable “better.” Name **WooCommerce**, **simple product**, **variable product**, **variation**, and **billing schedule** within the first 150 words.

## Key conclusions

1. Use simple by default when one purchasable offer is enough; complexity should be earned by a real customer choice.
2. Use variable only when options share one buying context and customers benefit from selecting among them on the same page.
3. Variable products create a parent/variation hierarchy; each sellable variation may require its own price, schedule, trial, fee, stock, tax/shipping, switch rule, and QA case.
4. Product type does not determine gateway support. The exact renewal schedule and any later plan switch must be supported by the subscription engine and gateway integration.
5. Do not delete or repurpose a product/variation that active subscriptions still reference. Preserve it, hide it from new buyers, and migrate agreements deliberately.

## Definitions

### Simple subscription

A simple subscription is one purchasable configuration attached to one simple WooCommerce product: one default recurring price and schedule, with optional trial, sign-up fee, length/end, shipping, and entitlement rules as supported by the engine.

Best mental model: **one page → one purchasable plan → one product ID**.

Good fits:

- one monthly membership;
- one annual support plan;
- one fixed-term course;
- one subscription box with no buyer-selectable size/tier/cadence;
- separate offers that need distinct landing pages, positioning, or catalog visibility.

### Variable subscription

A variable subscription uses a variable WooCommerce parent product and one or more child variations. Attributes such as Billing, Tier, Size, Quantity, Flavor, or Format determine which variation the customer buys. A variation can have its own price, SKU, stock, image, tax/shipping data, and—when the subscription engine supports it—its own recurring schedule, trial, fee, or term.

Best mental model: **one page → attribute selection → one child variation ID**.

Good fits:

- Monthly versus Annual for the same service;
- Basic, Pro, and Business tiers sharing one value proposition;
- a physical subscription with sizes or formats whose prices and stock differ;
- plans customers are intended to switch between inside one coherent family.

Official Woo sources:

- Woo says variable products offer options with per-variation control over price, stock, image, and other data: https://woocommerce.com/document/variable-product/
- Woo Subscriptions describes variable subscriptions as variable products whose variations gain subscription options and calls them useful for related tiers/options: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- Product versus subscription agreement distinction: https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/

## Quick decision table

| Decision criterion | Simple subscription | Variable subscription |
|---|---|---|
| Customer choices on one page | None or one fixed offer | Two or more related options selected by attributes |
| Product records | One product | One parent plus a record for every sellable variation |
| Pricing/schedule maintenance | One set | Per variation when options differ |
| Catalog/landing-page control | Strong: each plan can have its own URL/content | Consolidated: choices share one parent page |
| Inventory/SKU needs | One SKU/stock context | Parent-level shared or per-variation SKU/stock |
| Monthly + annual | Two separate simple products, a group, or another selector | Natural one-page attribute use case |
| Switching | Possible if the engine links separate products | Often easier to present within a related variation family, but still requires engine/settings/gateway support |
| Reporting | Straight product-level view | Parent aggregate plus variation-level analysis and naming discipline |
| QA surface | One configuration | Every variation plus important cross-variation switch paths |
| Best default | One offer; distinct landing pages; low operational overhead | Closely related buyer choices that should remain together |
| Not a fit when | Buyer must compare tier/cadence/size in one flow | Options have different audiences, terms, fulfillment, or messaging and should be separate offers |

## Decision framework

```text
Does the buyer need to choose among related options before checkout?
├─ No → use a simple subscription
└─ Yes
   ├─ Do the options share one product promise and one landing page?
   │  ├─ No → use separate simple products (optionally grouped/compared)
   │  └─ Yes
   │     ├─ Do price, billing, stock, shipping, or entitlements differ?
   │     │  ├─ Yes → variable subscription is a strong fit
   │     │  └─ No → an ordinary attribute/add-on may be enough; avoid variations without a reason
   │     └─ Can the team maintain and test every valid combination?
   │        ├─ Yes → variable subscription
   │        └─ No → reduce options or split into simpler products
```

Secondary question: if each option needs a distinct audience, URL, SEO topic, sales narrative, or launch calendar, separate simple products may be operationally clearer even when the products could technically be variations.

## Catalog and pricing implications

### Simple products optimize independence

Separate simple subscription products give each plan its own product URL, merchandising copy, visibility, images, cross-sells, stock context, and lifecycle. That is valuable when “Monthly Starter” and “Annual Enterprise” are not merely two prices but materially different offers or audiences.

Tradeoff: buyers may need a separate pricing/comparison page or grouped presentation to understand choices. Woo’s FAQ says different billing periods can be offered with multiple simple subscription products inside a Grouped Product or through a variable product. This is a current Woo Subscriptions behavior, not a universal feature of every plugin.

Evidence: https://woocommerce.com/document/subscriptions/faq/

### Variable products optimize consolidation

Variable products keep related choices on one parent page. WooCommerce requires attributes and sellable variations; each enabled variation needs a price to appear. Variation records can override images, SKUs, stock, dimensions, shipping classes, and tax classes. Subscription engines can add billing fields to those same variation records.

Operational caveats from Woo’s official variable-product guide:

- if attributes change after variations are created, variations may need to be redefined;
- product-page dropdown behavior changes when a product has more than 30 variations;
- inventory can be managed at parent, variation, or mixed levels;
- missing variation prices make those variations unavailable.

Do not turn the “more than 30” note into a universal performance limit; Woo only states that dynamic dropdown behavior changes.

Evidence: https://woocommerce.com/document/variable-product/

### Variation-combination formula

Use this original, extractable formula to make operational complexity concrete:

> **Potential variation combinations = values in attribute 1 × values in attribute 2 × … × values in attribute N**

Examples:

- 2 billing cadences × 3 tiers = **6** possible variations.
- 2 cadences × 3 tiers × 4 box sizes = **24** possible variations.

Unused combinations may be omitted, but every enabled combination still needs coherent pricing, schedule disclosure, storefront selection, renewal behavior, and QA. This is arithmetic, not a benchmark.

### Worked example: monthly and annual

One service with Basic/Pro tiers and Monthly/Annual billing creates:

| Tier | Monthly | Annual |
|---|---:|---:|
| Basic | Variation 1 | Variation 2 |
| Pro | Variation 3 | Variation 4 |

The variable model is a good fit if all four share one product promise and the page can clearly display what changes. Four simple products may be better if each tier/cadence has separate sales copy, campaigns, or fulfillment rules.

Link to the ArraySubs monthly/annual recipe after this verdict rather than repeating its settings: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`.

## Operational complexity

### Configuration surface

For each sellable variation, record and verify:

- regular/sale and recurring price;
- billing period and interval;
- finite length/end behavior;
- free trial and sign-up fee;
- initial versus renewal disclosure;
- tax class;
- virtual/downloadable/physical status;
- stock and SKU ownership;
- initial and renewal shipping behavior;
- entitlements/features;
- upgrade, downgrade, or crossgrade targets;
- storefront default selection and unavailable-combination behavior.

Simple products do not eliminate these decisions, but they contain them in one configuration.

### QA surface

A transparent planning formula:

> **Minimum purchase QA cases = number of enabled variations × checkout modes tested**

If a six-variation product is tested with automatic and manual renewal modes, that is at least 12 purchase-mode cases before adding trials, failures, taxes, shipping, coupons, or switches. This is a planning count, not a prescription that every site must test all permutations equally; use risk-based coverage.

Critical variable-product tests:

1. each valid attribute combination resolves to the expected variation;
2. price, cadence, trial, fee, and term update when selection changes;
3. cart/order store the child variation and attributes;
4. renewal order keeps the intended variation and recurring terms;
5. disabled/out-of-stock variations cannot be newly purchased;
6. switches preserve price, dates, entitlement, stock/shipping, and reporting identity;
7. changes to parent/variation data do not silently alter existing subscribers unless intended.

### Customer-choice cost

Do not claim that variable products increase or decrease conversion without original data. The defensible guidance is qualitative:

- one page can reduce navigation when choices are directly comparable;
- too many attributes or poorly named combinations can make selection harder;
- default choices must not obscure price/cadence differences;
- the amount due today and future renewal amount/date should update and remain visible.

## Gateway implications

Simple versus variable is primarily catalog structure; it does **not** independently decide whether a gateway supports subscriptions. Gateway eligibility depends on the exact subscription engine, gateway extension, payment method, renewal mode, version, country/currency, and required management features.

The variable model can expose more gateway-sensitive paths because its variations may have different billing schedules and because switching can change recurring amount or next-payment date. Woo’s customer switching guide says a subscription can be switched when it uses manual renewals or an automatic gateway that supports recurring-amount and payment-date changes.

Gateway checklist for a variable family:

1. Can every variation’s interval be purchased with the intended automatic payment method?
2. Can the gateway update the recurring amount and next payment date for a switch?
3. Does switching monthly ↔ annual require a new agreement/authorization?
4. Does the engine, gateway, or remote billing agreement own the schedule?
5. What happens when an automatic switch charge requires SCA/customer action?
6. Can manual renewal serve as a safe fallback, and is that acceptable for the business?

Evidence:

- Woo gateway capability matrix and exact-extension caveats: https://woocommerce.com/document/subscriptions/payment-gateways/
- Woo switching customer requirements: https://woocommerce.com/document/subscriptions/customers-view/subscribers-view-switch/
- Gateway feature API (amount/date changes): https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/

## Switching implications

### WooCommerce Subscriptions example

Woo Subscriptions can switch customers between variations of one Variable Subscription product when switching is enabled. It can also switch between simple subscriptions inside a Grouped Product. Switching is off by default in its documented settings. Proration and schedule behavior are separate decisions.

Different schedules complicate history: Woo documents cases where a switch updates the existing subscription and other cases where it creates a new subscription. Switch orders and notes record the change, attributes, costs, and payment method.

Evidence:

- Switching eligibility and settings: https://woocommerce.com/document/subscriptions/switching-guide/
- Switching cost/schedule rules: https://woocommerce.com/document/subscriptions/switching-guide/switching-process-and-costs/
- Tracking switch orders and line-item changes: https://woocommerce.com/document/subscriptions/switching-guide/tracking-switches/

### Decision guidance

Variable products make a related plan family visible, but **grouping does not by itself define switch policy**. Merchants still need to decide:

- allowed upgrade/downgrade/crossgrade directions;
- immediate versus next-renewal effective date;
- proration/credit/fee treatment;
- trial and sign-up-fee treatment;
- whether access/fulfillment changes immediately;
- whether a failed switch leaves the old plan intact;
- reporting identity before and after the switch.

## Reporting implications

WooCommerce Analytics has a Variations report with variation title, SKU, items sold, net sales, order count, status, and stock. WooCommerce Subscriptions also documents a Subscriptions by Product report that includes subscription product variations and revenue from initial plus renewal order line items (excluding shipping and fees).

Evidence:

- Woo Variations report: https://woocommerce.com/document/woocommerce-analytics/variations-report/
- Woo Subscriptions reports: https://woocommerce.com/document/subscriptions/store-manager-guide/reports/

Practical data design:

- give every variation a stable, readable SKU and attribute name;
- decide which views aggregate at parent level and which compare variation performance;
- do not rename attributes casually if exports, BI, fulfillment, or support rely on them;
- validate that the selected subscription engine imports/classifies renewal and switch orders in Woo Analytics as expected;
- define MRR/churn/cohort methodology separately—simple versus variable does not make those metrics automatically comparable.

Never claim one model performs better without a defined dataset, date range, sample, formula, and exclusions.

## Migration and change-management path

### Before any subscribers exist

Changing catalog structure is relatively low risk: prototype the page, test each variation, and keep redirects/URLs in mind. Do not imply a one-click conversion will preserve all subscription plugin metadata without testing.

### After active subscriptions exist

Treat product structure as part of the recurring contract:

1. inventory active subscriptions by product/variation, gateway, schedule, price, next date, and entitlement;
2. keep the original product/variation published or hidden so renewals can resolve it;
3. create the new catalog structure for new sales;
4. decide whether existing subscribers remain on the legacy offer or use an explicit switch/migration;
5. test renewal and gateway behavior for both old and new cohorts;
6. preserve product/variation IDs in exports and audit logs;
7. remove old records only after no live agreement or related workflow depends on them.

Woo’s FAQ warns that deleting a subscription product or variation can cause renewal creation to fail because the line item no longer exists. Woo recommends hiding the product from the catalog rather than removing it. Its current deprecation guidance also explicitly avoids forced migration because product-type migrations can be risky for custom integrations.

Evidence: https://woocommerce.com/document/subscriptions/faq/

## Current ArraySubs truth (first-party, dated)

Recommended disclosure: “ArraySubs is the product discussed by this site. The following implementation details were checked against ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 on July 13, 2026.”

### Product model

- ArraySubs adds a Subscription toggle to WooCommerce standard Simple and Variable products (`arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`).
- On a variable product, the parent toggle synchronizes `_is_subscription` to all child variations. The current implementation does not support a parent where some variations are subscriptions and others are ordinary one-time variations.
- Each subscription variation stores its own billing period, interval, length, trial, sign-up fee, and different-renewal-price data and uses its own regular/sale price (`arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php`; `Services/Hooks.php`).
- Frontend variation JSON carries the selected variation’s schedule, trial, fee, term, price, and renewal-price data so the display can update on selection (`Services/Hooks.php`).
- Cart/checkout logic resolves the variation ID before the parent product ID when reading subscription terms, so the purchased child is the effective plan.

### Switching

- ArraySubs plan-switching settings support upgrades, downgrades, crossgrades, customer self-service, switch fees, and immediate/next-renewal/no-proration policy (`documentations/architecture/plan-switching.md`).
- Eligible targets are configured at simple-product or variation level; putting two variations under one parent does not automatically make them switchable.
- Plan switching accepts product or variation IDs. `PlanManager` stores the parent product ID and child variation ID separately after a switch (`arraysubs/src/Features/PlanSwitching/Services/PlanManager.php`).
- A deferred switch stores target product/variation, price, schedule, fee, and effective date, then applies after the renewal order is paid (`arraysubs/src/functions/pending-switch-helpers.php`; architecture doc).

### Reporting

- Core Retention Analytics treats a child variation as the effective product when `_variation_id` is present and can aggregate a variable parent across its subscription variations (`arraysubs/src/Features/RetentionAnalytics/REST/AnalyticsController.php`).
- Pro analytics queries use the variation ID when present for active-subscription, revenue, and churn product groupings; it also extends Woo Products and Variations analytics filters (`arraysubspro/src/Features/Analytics/REST/OverviewController.php`; `Services/WooAnalyticsHooks.php`).

### Gateway and renewal behavior

- The core renewal order stores both product and variation identity and uses the selected variation when creating the renewal line item (`arraysubs/src/Features/RecurringBilling/Services/OrderCreation.php`).
- Automatic versus manual routing is based on the subscription’s payment/gateway context, not whether the source catalog product was simple or variable (`arraysubs/src/Features/RecurringBilling/Services/PaymentProcessor.php`).
- Renewal pricing is captured on the subscription, protecting existing subscribers from silent catalog-price changes; however, the product/variation still must resolve when the renewal order is built. Do not delete live variations.

### ArraySubs limitations/not-fit guidance

ArraySubs may not be the best fit when:

- the catalog requires one-time and subscription variations mixed under the same variable parent in the current implementation;
- automatic renewal must use a gateway outside the currently implemented Pro Stripe, PayPal, or Paddle paths and manual renewal is unacceptable;
- the store is not WooCommerce/WordPress;
- the plan matrix is usage-metered or requires another model not demonstrated by current shipped code;
- migration risk from a mature subscription stack outweighs the benefit of reorganizing products.

Do not describe currently marked coming-soon ArraySubs features as shipped. The public page marks Customer-Chosen Subscription Duration and Installment/Split Payments as coming soon: https://arrayhash.com/deals/arraysubs/

## Recommendations by store type

| Store scenario | Recommendation | Why |
|---|---|---|
| One paid community tier | Simple | No buyer choice to justify variations |
| Monthly and annual for the same membership | Variable | Cadence is a clean one-page attribute |
| Basic/Pro/Business with shared promise | Variable | Related tier comparison and switch family |
| Basic and Enterprise with different audiences/sales processes | Separate simple products | Independent messaging, URLs, and operations |
| Coffee in 3 bag sizes, monthly only | Variable | Size changes price/stock/shipping within one offer |
| Six unrelated subscription boxes | Separate simple products | They are separate products, not variations of one promise |
| Legacy subscribers on a simple product; new multi-tier launch | Keep legacy simple + create new variable parent | Avoid mutating live renewal references; migrate explicitly if desired |

## Five FAQ candidates

### 1. Can one variable subscription offer monthly and annual billing?

Yes, when the selected subscription engine supports per-variation schedules. Use a Billing attribute with Monthly and Annual variations, then verify each variation’s amount due today, renewal cadence, gateway eligibility, and switch behavior. Link to the ArraySubs monthly/annual recipe for exact setup.

### 2. Do I need a variable subscription to sell multiple tiers?

No. Use variations when tiers belong on one product page and share a buying context. Use separate simple products when each tier needs its own URL, positioning, audience, or operational policy. Woo Subscriptions can also present simple subscriptions through a Grouped Product.

### 3. Can I mix one-time and subscription variations in the same product?

It depends on the subscription engine. WooCommerce Subscriptions 9.0’s plan model can offer one-time and subscription purchase options on supported standard products. ArraySubs 1.8.9 currently synchronizes its Subscription toggle to all variations under the parent, so it does not support mixing ordinary and subscription variations in one variable parent.

### 4. Does a variable subscription require a different payment gateway?

No. The catalog type does not by itself determine gateway compatibility. Verify the exact gateway extension and payment method for every billing cadence and for amount/date changes if customers will switch plans.

### 5. Can I convert a simple subscription to variable after customers subscribe?

Do not treat it as a cosmetic conversion. Existing agreements reference product IDs, prices, schedules, gateway context, and orders. Preserve the old product for renewals, create and test the new structure, then leave existing customers on the legacy offer or migrate them through an explicit, auditable switch plan.

## Visual, chart, flow, and screenshot opportunities

Use the site’s flat design tokens from `web-content/app/globals.css`: no shadows or gradients; #873EFF primary, #6F22E6 strong purple, #18A554 green, #FE8218 orange, #12002B ink, #F0E9FF surfaces, #DED2F4 borders. Avoid neon, glow, glassmorphism, 3D blobs, and AI-generated pseudo-text.

1. **Hero (16:9):** split flat composition. Left: one subscription card flowing directly to checkout. Right: one parent card branching into Monthly/Annual and Basic/Pro variation cards. Add one simple human choosing between options; no text in generated art.
2. **Quick-comparison infographic:** Simple = one product ID/one schedule; Variable = parent + variation IDs/per-option schedules. Prefer authored SVG/HTML for accurate labels.
3. **Decision-tree flow:** buyer choice → shared promise/page → differing price/schedule/stock → maintenance capacity.
4. **Variation matrix:** 3 tiers × 2 cadences = six cells, each with a compact price/schedule placeholder. This is an accurate structural visual, not performance data.
5. **Combinatorial bar chart:** bars for 1, 6, and 24 potential configurations from the disclosed formulas (simple; 2×3; 2×3×4). Title it “Configuration combinations,” not “complexity score.”
6. **QA workload bar chart:** if two renewal modes are in scope, show 1 variation × 2 modes = 2 baseline purchase cases versus 6 × 2 = 12. Label assumptions visibly and avoid implying a universal test minimum.
7. **Catalog hierarchy tree:** parent product → attribute terms → variations → subscription records → renewal orders. Useful for reporting explanation.
8. **Switching flow:** current variation → policy check → gateway capability → proration preview → immediate or next-renewal switch → audit record.
9. **Reporting split:** parent aggregate card above child variation rows, showing why readable SKUs matter; use no invented revenue numbers.
10. **Migration safety flow:** keep legacy product → create new variable offer → test → new sales → optional explicit subscriber migration → retire only when references are gone.
11. **Operational checklist illustration:** price, schedule, trial, stock, shipping, entitlement, switch, QA icons repeated per variation.
12. **“Do not delete” visual:** live subscription linked to a hidden legacy variation versus a broken link to a deleted variation.

Avoid a decorative pie chart here: simple versus variable is not a part-to-whole dataset, and a pie would imply invented proportions. If the production brief insists on a donut, use only a clearly labeled structural breakdown derived from a real disclosed catalog, not a market-share or conversion claim.

Recommended original screenshots after a controlled test:

- current ArraySubs simple product with Subscription toggle and fields;
- current ArraySubs variable parent and two variation panels;
- frontend Monthly/Annual selection before and after changing variation;
- cart/order line with variation attributes and subscription schedule;
- switch-target fields on a variation and customer switch preview;
- Woo/ArraySubs variation-level analytics filter;
- renewal order showing parent/variation identity, with customer data redacted.

## Limitations and editorial guardrails

- WooCommerce Subscriptions behavior is not universal to all subscription plugins. Prefix engine-specific claims.
- Dedicated Woo “Simple Subscription” and “Variable Subscription” types are no longer the recommended new-product workflow as of WooCommerce Subscriptions 9.0, though they remain supported.
- ArraySubs uses standard Woo product types plus a toggle; do not show Woo Subscriptions’ dedicated type UI as ArraySubs UI.
- Variable products do not automatically enable switching. Engine settings, target relationships, proration, and gateway capabilities still apply.
- Do not claim variable products convert better, reduce churn, or increase AOV without original methodology and data.
- Do not call the number of combinations a performance benchmark; it is only catalog arithmetic.
- Preserve live product/variation references. Hiding is not the same as deleting.
- Prices, gateways, plugin behavior, and current feature status require re-verification on publication/update.
- The “prepaid-fixed-cycles” internal recipe currently describes multiple recurring charges, not true full-upfront prepayment; refer to it as the fixed-cycle recipe in this article.
- Named author, technical reviewer, test environment, published date, last-verified date, disclosure, and update log must be visible. Do not invent bios or credentials.

## Internal-link placement

- After the neutral verdict: `/deals/arraysubs/`.
- In the ArraySubs product-model section: `/deals/arraysubs/features/#products-checkout`.
- Exact monthly/annual setup: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`.
- Fixed-cycle and lifetime alternatives only where the term/end model is discussed:
  - `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`
  - `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- Siblings:
  - A003 WooCommerce Subscription Product Types Explained
  - A005 Recurring vs Fixed-Term Subscriptions
  - A006 Free Trial, Paid Trial, or No Trial?
- Primary CTA after the complete decision and limitation sections: `/deals/arraysubs/pricing/`.

## Suggested metadata and freshness record

- Suggested SEO title: **Simple vs Variable WooCommerce Subscriptions** (44 characters).
- Focus keyword: **simple vs variable WooCommerce subscriptions**.
- Suggested meta description: **Compare simple and variable WooCommerce subscriptions by pricing, customer choice, switching, reporting, gateway needs, and maintenance.**
- Last verified for this research: **July 13, 2026**; update after controlled UI/renewal testing.
- Test environment should record WordPress, WooCommerce, ArraySubs/Pro, PHP, theme, checkout type, gateway extension/mode, country/currency, product IDs, and variation IDs.
- Suggested update log: “July 2026 — Initial comparison; WooCommerce Subscriptions 9.0 product-plan guidance and ArraySubs 1.8.9/Pro 1.1.0 implementation verified.”
- Refresh after relevant WooCommerce/Woo Subscriptions/ArraySubs changes; quarterly for gateway and product-status claims.

## Primary evidence map

| Claim area | Primary source |
|---|---|
| Woo Subscriptions 9.0 plan recommendation and dedicated types | https://woocommerce.com/document/subscriptions/creating-subscription-products/ |
| Dedicated-type deprecation/no forced migration; grouped/variable cadence options; deletion risk | https://woocommerce.com/document/subscriptions/faq/ |
| Variable attributes, pricing, SKU, stock, tax/shipping, 30+ behavior | https://woocommerce.com/document/variable-product/ |
| Product versus subscription agreement | https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/ |
| Switching eligibility and variation/grouped relationships | https://woocommerce.com/document/subscriptions/switching-guide/ |
| Switching cost and billing-schedule changes | https://woocommerce.com/document/subscriptions/switching-guide/switching-process-and-costs/ |
| Switch orders, notes, and existing/new subscription behavior | https://woocommerce.com/document/subscriptions/switching-guide/tracking-switches/ |
| Gateway features and current extension caveats | https://woocommerce.com/document/subscriptions/payment-gateways/ |
| Customer switch gateway requirements | https://woocommerce.com/document/subscriptions/customers-view/subscribers-view-switch/ |
| Woo variation analytics | https://woocommerce.com/document/woocommerce-analytics/variations-report/ |
| Woo subscription product/variation reporting | https://woocommerce.com/document/subscriptions/store-manager-guide/reports/ |
| ArraySubs public feature/status claims | https://arrayhash.com/deals/arraysubs/ |
