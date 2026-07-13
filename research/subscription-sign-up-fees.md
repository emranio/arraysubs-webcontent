# Research dossier: Subscription Sign-Up Fees (A007)

**Research completed:** 2026-07-13  
**Article brief:** `web-content/content-plan/articles/007-subscription-sign-up-fees-unit-economics-ux-and-examples.md`  
**Publishing standard:** `web-content/content-plan/plan/07-seo-geo-publishing-standard.md`  
**Evidence policy:** current official WooCommerce documentation, current US/UK government guidance, and current ArraySubs code/docs/product pages. No third-party benchmarks, conversion claims, or fabricated market metrics.

## Scope, disclosure, and test status

This is the strategic pillar for deciding whether to charge a subscription sign-up fee, what the fee should fund, how to model it, and how to disclose and refund it. It should link to the ArraySubs setup recipes instead of repeating their product-editor steps.

ArraySubs product truth was checked in the workspace on 2026-07-13:

- ArraySubs core **1.8.9** and ArraySubs Pro **1.1.0** were inspected.
- This pass inspected code, architecture documentation, public product copy, and recipe data. It did not execute a live checkout, tax, coupon, gateway, refund, or analytics test.
- Any published first-party observation should name the exact WordPress, WooCommerce, ArraySubs/Pro, checkout type, tax setup, currency, gateway, product ID, and order ID used.
- The site sells ArraySubs. The article needs a visible commercial disclosure before the product-specific section and a real named author/technical reviewer; do not invent either identity or credentials.

Primary current-behavior sources:

- WooCommerce Subscriptions product creation and sign-up-fee timing: https://woocommerce.com/document/subscriptions/creating-subscription-products/
- WooCommerce refunds: https://woocommerce.com/document/woocommerce-refunds/
- US ROSCA text in effect in July 2026: https://uscode.house.gov/view.xhtml?req=%28title%3A15+section%3A8403+edition%3Aprelim%29
- UK distance-selling guidance: https://www.gov.uk/online-and-distance-selling-for-businesses/distance-selling
- ArraySubs public product page: https://arrayhash.com/deals/arraysubs/

## Recommended direct answer (40–60 words)

> Charge a subscription sign-up fee only when starting a customer creates a real, explainable one-time cost, such as migration, installation, onboarding labor, or a welcome kit. Base the amount on that cost minus any subsidy you choose to absorb. Show the fee, today’s total, renewal price, trial timing, and refund policy before checkout.

The first 150 words should name **subscription sign-up fee**, **setup fee**, **WooCommerce**, **initial payment**, and **recurring price**. Do not open with ArraySubs or a CTA.

## Key takeaways

1. A sign-up fee should recover a specific first-period cost, not disguise a higher subscription price or punish cancellation.
2. There is no evidence-based universal percentage of monthly price. Calculate from the merchant’s own labor, materials, provisioning, rework, and subsidy policy.
3. Display the one-time fee separately from the recurring price and show the exact total due today. A free trial with a sign-up fee is not a zero-cost checkout.
4. Cancellation and refund are different decisions. The refund policy must say what happens before work starts, during partial setup, after delivery, and when the merchant fails to deliver.
5. Measure contribution, refund/chargeback cost, support contacts, and qualified conversion by cohort. Do not optimize only for checkout conversion or gross sign-up revenue.

## What a subscription sign-up fee is

A sign-up fee is a one-time charge collected when a customer starts a subscription. It is separate from the recurring price. Depending on the subscription engine, it may appear as a product-level sign-up amount or as an initial-order fee line.

WooCommerce Subscriptions documents the basic arithmetic:

- without a trial: **initial payment = first recurring payment + sign-up fee**;
- with a free trial: **initial payment = sign-up fee**, while the recurring payment waits until the trial ends;
- later renewal payments exclude the one-time fee.

Source: https://woocommerce.com/document/subscriptions/creating-subscription-products/

The business label can be “setup fee,” “activation fee,” “onboarding fee,” “joining fee,” or “welcome-kit fee,” but the label should describe the funded work. “Administrative fee” is weak unless the store can explain the actual administration.

## What the fee should—and should not—fund

### Defensible one-time costs

| Cost | When it is defensible | Evidence to retain |
|---|---|---|
| Human onboarding | A person performs discovery, configuration, training, or account setup once | Standard operating procedure, expected minutes/hours, loaded labor cost |
| Data migration/import | Files are cleaned, mapped, imported, or validated for the new customer | Scope, volume assumptions, tool/vendor cost, acceptance criteria |
| Installation/activation | A technician installs equipment or activates an external service | Work order, travel/material inputs, completion definition |
| Hardware or welcome kit | A card, key, device, packaging, or starter inventory is supplied at the start | Unit cost, pick/pack cost, shipping, return ownership |
| Third-party provisioning | The merchant pays a per-account verification, licensing, domain, or vendor fee | Vendor invoice and whether it is refundable |
| Initial compliance work | A genuine first-use identity, safety, or regulatory check is required | Applicable rule, vendor/labor cost, data-retention policy |
| Custom kickoff deliverable | An audit, plan, design, or initial asset is created before recurring service begins | Deliverable, revision limit, acceptance and refund terms |

### Costs that usually belong elsewhere

- ordinary recurring service delivery belongs in the recurring price;
- customer acquisition and general advertising are not customer-specific setup work;
- a cancellation penalty is not a sign-up fee;
- a refundable security deposit should be labeled and accounted for as a deposit, not revenue disguised as a fee;
- physical goods requiring inventory, returns, or warranty tracking may be better as a WooCommerce product line than an undifferentiated fee;
- an arbitrary “commitment fee” needs a concrete customer benefit or cost basis;
- profit can be included in pricing, but calling pure margin “setup” creates a disclosure and trust problem.

The operational test is simple: **Can support explain in one sentence what happens after payment that would not happen for an existing subscriber?** If not, charge $0 or put the value in the recurring offer.

## Decision tree: should this offer have a sign-up fee?

```text
Does activation create a measurable, customer-specific one-time cost?
├─ No → use no sign-up fee
└─ Yes
   ├─ Is the cost already included in another product, shipping, or service line?
   │  ├─ Yes → do not charge it twice
   │  └─ No
   │     ├─ Can the customer understand the funded work before checkout?
   │     │  ├─ No → redesign the offer or include it in recurring price
   │     │  └─ Yes
   │     │     ├─ Are refund/cancellation/tax rules documented for the sales regions?
   │     │     │  ├─ No → resolve policy/compliance first
   │     │     │  └─ Yes → calculate a cost-based fee and test the full first-payment flow
```

Secondary packaging question: even when a fee is defensible, the merchant can subsidize some or all of it to reduce the initial charge. That is a pricing decision, not evidence that the cost disappeared.

## A defensible amount formula

### Step 1: calculate the one-time cost

> **One-time activation cost (C) = direct labor + materials/kit + per-customer vendor costs + expected rework/waste**

Use loaded labor cost, not the employee’s take-home wage. “Expected rework/waste” should come from the merchant’s own completed onboarding records; if no data exists, leave it out and start measuring rather than inventing a percentage.

### Step 2: choose the recovery and subsidy policy

> **Candidate sign-up fee (F) = max(0, C × recovery share − planned acquisition subsidy)**

Where:

- **C** is the merchant’s one-time cost;
- **recovery share** is the portion the merchant wants the customer to fund, from 0 to 1;
- **planned acquisition subsidy** is the amount intentionally absorbed and recovered, if ever, from future contribution.

This formula does not include sales tax because treatment depends on jurisdiction and configuration. It also does not automatically gross up payment processing. If a merchant allocates incremental processor cost to the fee, use the exact contracted rate and remember that the fee and first recurring payment may share one transaction.

### Step 3: check initial contribution

> **Initial contribution = sign-up fee + first recurring revenue − activation cost − first-period variable cost − incremental payment cost − expected refunds/chargebacks**

With a free trial, first recurring revenue at checkout is zero. “Expected refunds/chargebacks” must use the store’s own cohort data, with the date range and calculation disclosed.

The acceptable result may be negative if the merchant has deliberately approved an acquisition subsidy. Record the intended payback path; do not assume retention will cover it.

### Fictional worked example—not a benchmark

Assume a service business records these inputs for one onboarding:

- 2 hours of implementation labor at a loaded cost of $50/hour = **$100**;
- a per-customer provisioning charge = **$20**;
- an evidence-based rework allowance from its own data = **$10**;
- total one-time cost, C = **$130**;
- recovery share = **80%**, so targeted recovery = **$104**;
- planned subsidy = **$24**;
- candidate fee, F = **$80**.

If the recurring plan is $120/month and there is no trial, the disclosed initial subtotal is **$200 before tax/shipping**: $80 setup + $120 first month. If there is a free trial, the due-today subtotal is **$80 before tax**, and the first $120 recurring charge occurs after the trial.

Every number above is an illustration chosen to demonstrate the formula. It is not an industry price, conversion benchmark, or recommendation.

### Sanity checks before publishing the amount

1. Does the fee correspond to a named deliverable or process?
2. Is any cost already recovered through a product, shipping, or first recurring charge?
3. Does the first-payment total remain clear when tax, shipping, coupons, and a trial apply?
4. Can support identify whether setup has not started, is in progress, or is complete?
5. Can finance reconcile fee revenue and fee refunds separately from recurring revenue?
6. Does the refund policy comply in every sales region?

Avoid a rule like “charge one month” or “charge 25% of annual value” unless the merchant’s own cost model happens to support it.

## Conversion and customer-experience implications

A fee raises the initial amount due and adds another decision. It may filter out low-intent buyers, but it may also create abandonment or distrust. No direction or magnitude should be claimed without a controlled first-party study.

The UX goal is not to make the fee visually small. It is to make the transaction easy to predict:

- name the fee next to the recurring price on the product/pricing page;
- explain what it funds in one short sentence;
- show **Due today**, **Renews at**, **Renewal frequency**, and the expected first-renewal timing;
- display the fee as a distinct cart/checkout line;
- repeat the schedule and fee on the order confirmation/receipt;
- put refund and cancellation links next to the final consent, not only in a footer;
- if the trial has a fee, say “$X setup fee due today; recurring service is free for N days,” not simply “free trial.”

### Disclosure anatomy

```text
Assisted onboarding plan
$120 / month
+ $80 one-time implementation fee

Due today: $200 before tax
Renews: $120 monthly, first renewal [date]
Implementation fee covers: account configuration and data import
Cancellation: stops future renewals
Refund policy: [short rule] [link]
```

Use a real date once the checkout can calculate one. If timing depends on order acceptance or installation, explain the trigger.

### What to measure

| Measure | Definition needed | Why it matters |
|---|---|---|
| Qualified checkout conversion | Completed eligible orders / eligible checkout starts, by cohort and source | Tests initial-price friction without mixing audiences |
| Initial contribution | Use the formula above | Prevents a conversion-only decision from hiding onboarding loss |
| Fee cost coverage | Fee revenue net of fee refunds / one-time activation cost | Checks whether the stated purpose is financially true |
| Fee refund rate | Refunded fee amount / collected fee amount | Reveals policy, fit, or delivery problems |
| Fee-related support contacts | Coded contacts about purpose, trial, or refund | Detects unclear disclosure |
| Time to onboarding completion | Define start and accepted-complete events | Tests whether the funded work is delivered |
| Chargeback/dispute rate | Use processor records and a stated denominator | Detects surprise or non-delivery; no universal target claimed |

Compare cohorts with the same offer, acquisition source, country/currency, tax display, and period. Preserve disclosure in every variant. Valid tests can compare no fee versus cost-based fee, full recovery versus partial subsidy, or a separately itemized kit versus fee—not hidden versus disclosed pricing.

## Refund, cancellation, and disclosure policy

### Cancellation is not automatically a fee refund

Cancellation stops or schedules the end of future recurring charges according to the contract and system. A refund reverses some or all of money already paid. State both policies separately.

### Policy states to define

| State | Customer-friendly policy starting point | Merchant evidence |
|---|---|---|
| Payment taken; setup not started | Full fee refund, subject to mandatory local rules | Work-status timestamp |
| Setup partly completed | Proportionate refund only where lawful and disclosed | Completed tasks, accepted deliverables, real costs |
| Setup fully delivered | Apply the disclosed policy, while honoring statutory rights and merchant-fault remedies | Customer acceptance/completion record |
| Merchant cannot deliver | Full refund of the undelivered setup and any other required amount | Cancellation reason and refund record |
| Physical kit returned | Apply published return condition/timing and local law | Inventory/return record |
| Customer cancels future renewals | Stop future billing; assess past fee separately under policy/law | Cancellation and fee-work status |

Do not publish “non-refundable” as a universal rule. Consumer rights vary by country, customer type, goods/services/digital content, delivery status, and whether performance began with proper consent. Have qualified counsel review the actual policy.

Current official examples of why localization matters:

- US ROSCA requires clear and conspicuous material terms before billing information, express informed consent, and a simple mechanism to stop recurring charges: https://uscode.house.gov/view.xhtml?req=%28title%3A15+section%3A8403+edition%3Aprelim%29
- UK government distance-selling guidance requires price including taxes, contract/billing period, termination/cancellation information, and conditions for deposits/guarantees before the order; it also describes cancellation rights and service-cost treatment: https://www.gov.uk/online-and-distance-selling-for-businesses/distance-selling

These are examples, not a complete legal analysis or a substitute for advice in the merchant’s selling regions.

### WooCommerce refund mechanics

WooCommerce supports full and partial order refunds. An automatic refund depends on gateway support; a manual WooCommerce refund records the refund locally but does not itself return money through the gateway. Woo also notes that payment transaction fees may not be returned, depending on the payment service.

Source: https://woocommerce.com/document/woocommerce-refunds/

The business policy must map to the actual order lines. When a sign-up fee is a generic fee line, decide whether staff refund the fee, the recurring product line, tax, shipping, or a precise partial amount. Use reason codes so analytics can distinguish merchant failure, cooling-off, duplicate payment, goodwill, and customer cancellation.

## Examples by subscription business type

All amounts below are deliberately hypothetical formula demonstrations, not market rates.

| Business | Defensible funded work | Illustrative inputs | Candidate treatment | Important warning |
|---|---|---|---|---|
| Self-serve SaaS | None when activation is automated and marginal cost is negligible | C = $0 | $0 sign-up fee | Do not invent “activation” work merely to front-load revenue |
| Assisted SaaS | Data mapping, migration, configuration, administrator training | 1.5 hours × $60 + $30 import tool = C $120; 75% recovery | $90 implementation fee | Define import volume, revision limit, and acceptance |
| Service retainer | Discovery, audit, portal configuration, initial plan | 2 hours × $50 + $25 provisioning = C $125; $25 subsidy | $100 onboarding fee | Do not include normal monthly account management |
| Subscription box | Starter container, welcome kit, special first-pack labor | $18 kit + $7 packing = C $25; full recovery | $25 welcome-kit charge | If the item needs stock, returns, warranty, or quantity tracking, sell it as a product line instead |
| Membership | Orientation, access card/key, one-time assessment | 0.5 hour × $40 + $10 card = C $30; 50% recovery | $15 joining fee | Pure digital access with no real setup may justify $0 |

### SaaS

Use a fee for a clearly scoped assisted implementation, not for creating an automated account. State included data volume, integrations, meetings, training seats, turnaround, and what counts as completion. Enterprise onboarding may be a separate service product if it has its own scope, taxes, procurement, or refunds.

### Services

Setup fees fit retainers when the merchant must perform discovery, audit, account setup, or an initial deliverable before recurring work. Keep the recurring deliverables out of the fee. If the project can start only after the intake form or customer assets arrive, define refund timing around that dependency.

### Subscription boxes

A welcome kit or reusable container can be genuinely one-time. A separate product line is often operationally clearer when stock, shipping class, returns, warranty, or multiple quantities matter. Do not call a refundable container deposit a sign-up fee.

### Memberships

A joining fee can fund an orientation, access credential, assessment, or starter pack. If access is automatically granted and no material setup occurs, the article should recommend no fee or transparent inclusion in dues. Associations, gyms, clubs, and regulated memberships may have sector-specific rules beyond normal ecommerce guidance.

## Current ArraySubs truth (first-party, dated)

Recommended disclosure: “ArraySubs is the product discussed by this site. These implementation details were checked against ArraySubs 1.8.9 and ArraySubs Pro 1.1.0 on July 13, 2026.”

### Configuration and storage

- Sign-up fees ship in the free core and can be configured on standard WooCommerce simple products and individual variations.
- The product/variation field is a non-negative decimal input with a 0.01 step and is stored in `_signup_fee` (`views/simple-product-fields.php`, `views/variation-fields.php`, `SubscriptionProducts/Services/Hooks.php`).
- The selected product or variation’s fee is copied to `_signup_fee` on the subscription record at checkout (`SubscriptionCheckout/Services/Traits/SubscriptionCreationTrait.php`; `src/functions/subscription-helpers.php`).
- The product editor describes it as a one-time fee independent of a trial.

### Storefront and checkout display

- Simple-product price information shows the fee separately from the schedule.
- A variable parent can show a fee range or “signup fee (some variations),” and selected variation data contains its exact fee.
- Cart item metadata labels the fee “one-time.” Checkout summaries show the sign-up fee, amount due today, renewal schedule/amount, trial, and duration (`SubscriptionProducts/Services/Hooks.php`; `SubscriptionCheckout/views/checkout-subscription-summary.php`).
- The actual charge is added through WooCommerce as one taxable cart fee named **Subscription Signup Fee**. Tax class is passed as an empty string, so stores must verify the result with their Woo/tax configuration and jurisdiction.

### Charge behavior

- Without a trial, ArraySubs charges the first recurring line amount plus the sign-up fee at checkout.
- With a free trial, the recurring line is set to zero but the sign-up fee remains. A cart containing a sign-up fee always requires payment even if the no-card trial setting would otherwise skip payment (`TrialCheckoutTrait.php`).
- If flexible renewal synchronization prorates the first recurring line, the full sign-up fee is still added to that initial total.
- Renewal-order creation explicitly excludes the fee; `OrderCreation::calculateRenewalTotal()` uses recurring amount × quantity.
- Pro’s current PayPal plan builder passes `_signup_fee` as the PayPal `setup_fee` and includes the fee in its plan signature (`arraysubspro/.../PayPalGateway.php`). Exact gateway and tax behavior still requires a real transaction test.

### Quantity and multi-product limitation

- Current code adds the fee **once per subscription cart line, not per quantity**. A quantity of five on one subscription line still contributes one fee.
- Fees from multiple subscription cart lines are summed into one WooCommerce fee line named “Subscription Signup Fee.” Individual cart metadata can show each product’s configured fee, but the order-level fee is aggregated.
- Therefore, use a separate product/kit line when the upfront charge must multiply by quantity, manage stock, or remain separately refundable/reportable.

### Refund behavior

- ArraySubs uses WooCommerce refund records and supports full/partial refund workflows. Gateway refunds are attempted only when the configured payment gateway reports refund support; otherwise the operation can remain manual (`Refunds/Services/RefundProcessor.php`).
- A full refund of an order linked to a subscription triggers the canonical immediate-cancellation path. A partial refund is logged but does not automatically cancel solely because it is partial (`Refunds/Services/Hooks.php`; `Subscriptions/Services/OrderIntegration.php`).
- There is no sign-up-fee-specific refund policy engine. Staff must choose the correct refund amount/lines according to the store’s published policy.
- ArraySubs Pro Store Credit can record a Woo refund as credit, but that is a refund method, not evidence that store credit satisfies every customer’s legal refund right.

### Coupons and reporting caveats

- WooCommerce Subscriptions has dedicated sign-up-fee coupon types: https://woocommerce.com/document/subscriptions/subscriptions-coupons/. Do **not** imply ArraySubs has those dedicated coupon types. ArraySubs implements its sign-up fee as a Woo cart fee; the current ArraySubs recipe says ordinary coupons apply to the recurring product price rather than the fee. Verify exact coupon/tax combinations before publishing a broad claim.
- Woo’s own Subscriptions by Product report excludes fees from product line revenue even while sign-up-order totals can include them: https://woocommerce.com/document/subscriptions/store-manager-guide/reports/. This is a useful warning, not a statement about every ArraySubs dashboard. Verify whether the chosen report attributes ArraySubs’ separate fee line to product, order, customer, or general fee revenue.

### Product-specific recipe links

Link strategy readers to the narrow procedures instead of duplicating them:

- base setup: `/deals/arraysubs/use-cases/recipes/signup-fee-plus-flat-monthly/`;
- trial plus fee: `/deals/arraysubs/use-cases/recipes/trial-with-signup-fee/`;
- high setup/low recurring: `/deals/arraysubs/use-cases/recipes/high-signup-low-monthly/`.

Do not repeat unsupported copy currently present in recipe data, including “most common subscription shape,” “dramatically improves trial quality and conversion,” or “low recurring price keeps you competitive.” Those require original data and methodology.

## When ArraySubs or its current fee model is not the best fit

- The merchant needs the fee multiplied by item quantity rather than once per subscription line.
- The upfront item needs inventory, shipping, warranty, deposit accounting, return status, or separate tax treatment; a product/bundle may be better.
- The business needs a fee to be collected only after a free trial ends. Current ArraySubs charges it at initial checkout.
- The business needs a dedicated sign-up-fee coupon type or advanced fee allocation without customization.
- The business needs fee-specific automated refund eligibility rather than staff applying a policy through order refunds.
- Automatic renewal must use a gateway outside the current supported Pro automatic paths and manual renewal is unacceptable.
- The store is not built on WordPress/WooCommerce.
- The merchant cannot lawfully or clearly define the fee/refund terms in its customer regions.

## Five FAQ candidates

### 1. When should a subscription charge a sign-up or setup fee?

Charge one when activation creates a real customer-specific one-time cost, such as implementation labor, migration, installation, provisioning, or a welcome kit. Avoid it when onboarding is automated, the cost already appears elsewhere, or the business cannot explain what the customer receives.

### 2. How do I calculate a fair subscription sign-up fee?

Add direct setup labor, materials, per-customer vendor costs, and measured rework. Multiply by the share you intend to recover, then subtract any planned acquisition subsidy. Use your own records; there is no defensible universal percentage of the monthly or annual price.

### 3. Is a subscription sign-up fee refundable if the customer cancels?

Cancellation and refund are separate. Publish what happens before setup starts, after partial work, and after delivery, while honoring mandatory consumer rights. WooCommerce can process full or partial order refunds, but the store’s policy and gateway determine the operational path.

### 4. Can a “free trial” still charge a sign-up fee?

Yes. WooCommerce Subscriptions and current ArraySubs charge the sign-up fee at checkout while delaying the recurring price. Disclose the exact amount due today next to the trial claim; do not present the entire checkout as free when money is collected.

### 5. Does the sign-up fee repeat on renewals or multiply by quantity in ArraySubs?

It does not repeat on renewals. In ArraySubs 1.8.9, it is also added once per subscription cart line rather than multiplied by quantity. Use separate product lines when an upfront kit or unit cost must scale with quantity.

## Flat visual, chart, and flow ideas

Use the site’s flat design tokens from `web-content/app/globals.css`: #873EFF primary, #6F22E6 strong purple, #18A554 green, #FE8218 orange, #12002B ink, #F0E9FF surface, and #DED2F4 borders. Use white/soft surfaces, crisp 2 px outlines, geometric shapes, and simple human silhouettes. No gradients, neon, glow, glass, shadows, 3D coins, fake dashboards, or generated text.

1. **Hero, 16:9:** flat human operator at a workbench. One-time onboarding tasks (migration, configuration, welcome kit) flow into a separate “setup” tile; a calendar loop represents renewals. Keep text out of generated art.
2. **Cost-basis donut:** use only the fictional worked example: labor $100, provisioning $20, measured rework $10. Label dollars and percentages derived from $130. Caption “Illustrative inputs—not market data.”
3. **Amount waterfall:** $130 one-time cost → 80% target recovery $104 → $24 planned subsidy → $80 candidate fee. This is more accurate than an unlabeled bar chart.
4. **First-payment bars:** no trial = $120 recurring + $80 fee; free trial = $0 recurring today + $80 fee; renewal = $120 recurring + $0 fee. State “fictional subtotal before tax.”
5. **Decision flow:** real one-time cost? already charged elsewhere? explainable? policy/tax ready? calculate/test.
6. **What it funds illustration:** four flat cards—human onboarding, data migration, installation, welcome kit—beside a red crossed-out “arbitrary admin fee.”
7. **Disclosure anatomy mock checkout:** plan price, fee line, Due today, first renewal date, purpose, cancellation, refund link. Author as SVG/HTML so every word is accurate.
8. **Refund-state flow:** not started → full; in progress → policy/proportionate where lawful; complete → disclosed rights; merchant failure → refund. Add “jurisdiction overrides policy.”
9. **Four-business comparison:** SaaS, services, boxes, memberships shown with flat human/physical icons and “fee / separate product / no fee” treatment.
10. **Measurement dashboard:** conversion, initial contribution, fee coverage, refund amount, support contacts, onboarding time—empty/template values only, never fake performance.
11. **ArraySubs lifecycle:** product `_signup_fee` → cart fee → initial order → stored subscription fee → renewal excludes fee → optional Woo refund.
12. **Quantity limitation visual:** one cart line × quantity 5 → one fee, versus five separately tracked kit products → five product units. This prevents an expensive configuration misunderstanding.
13. **Fee versus deposit card:** non-returned setup deliverable versus refundable held amount; show different accounting/refund paths without giving accounting advice.
14. **Operational checklist strip:** scope, calculate, disclose, consent, deliver, reconcile, refund, review.

Do not use a decorative market-share pie chart. The worked-example cost donut is defensible because every slice is disclosed arithmetic. Keep source/caption text in authored SVG rather than AI-generated raster text.

Recommended original screenshots after controlled testing:

- ArraySubs simple-product Sign-up Fee field;
- two variations with different fees;
- product price plus fee summary;
- cart item metadata and aggregated “Subscription Signup Fee” line;
- no-trial versus trial checkout summaries;
- paid initial order fee line and fee tax;
- first renewal order proving the fee is absent;
- partial fee refund and full initial-order refund/cancellation state;
- coupon test showing what was and was not discounted;
- quantity-two checkout proving the current per-line behavior.

## Internal-link placement

- After the neutral framework: `/deals/arraysubs/`.
- In the ArraySubs truth section: `/deals/arraysubs/features/#products-checkout`.
- Exact setup links: the three sign-up-fee recipes listed above.
- Use `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/` only when explaining per-variation fees.
- Link `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/` only as a different billing model; that recipe represents a finite series of recurring charges, not true full-upfront prepayment.
- Link `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/` only when explaining that a one-time product is not a recurring plan with an arbitrary fee.
- Siblings: A006 trial framework, A008 monthly/annual packaging, A009 one-time plus subscription.
- Primary CTA after the complete framework, limitations, and commercial disclosure: `/deals/arraysubs/pricing/`.

## Suggested metadata and freshness record

- Suggested SEO title: **Subscription Sign-Up Fees: Costs, UX, and Examples**.
- Focus keyword: **subscription sign up fee best practices**.
- Suggested meta description: **Calculate a defensible subscription sign-up fee, disclose the first payment, plan refunds, and compare SaaS, service, box, and membership examples.**
- Last verified for this research: **July 13, 2026**.
- Test environment should record WordPress, WooCommerce, ArraySubs/Pro, PHP, theme, classic/blocks checkout, gateway/mode, tax display, country/currency, coupons, product/variation IDs, order/subscription/refund IDs, and quantity.
- Suggested update log: “July 2026 — Initial strategy guide; Woo sign-up-fee/refund behavior, US/UK disclosure examples, and ArraySubs 1.8.9/Pro 1.1.0 implementation verified.”
- Refresh quarterly for legal/gateway/tax/product claims and after relevant WooCommerce or ArraySubs releases.

## Primary evidence map

| Claim area | Primary source |
|---|---|
| Woo sign-up-fee timing, free trials, and initial-payment arithmetic | https://woocommerce.com/document/subscriptions/creating-subscription-products/ |
| Woo sign-up-fee coupon types (Woo Subscriptions-specific) | https://woocommerce.com/document/subscriptions/subscriptions-coupons/ |
| Woo full/partial, automatic/manual refunds | https://woocommerce.com/document/woocommerce-refunds/ |
| Woo report inclusion/exclusion of fees | https://woocommerce.com/document/subscriptions/store-manager-guide/reports/ |
| Woo gateway access to initial/sign-up amounts | https://woocommerce.com/document/subscriptions/develop/payment-gateway-integration/ |
| Woo initial-only cart fee model | https://woocommerce.com/document/subscriptions/develop/recurring-cart-fees/ |
| US online negative-option disclosure, consent, cancellation | https://uscode.house.gov/view.xhtml?req=%28title%3A15+section%3A8403+edition%3Aprelim%29 |
| UK pre-order price, contract, cancellation, deposit information | https://www.gov.uk/online-and-distance-selling-for-businesses/distance-selling |
| ArraySubs public feature claims | https://arrayhash.com/deals/arraysubs/ |
| ArraySubs fee field, display, cart charge, and quantity logic | `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`; product/variation field views |
| ArraySubs trial and fee payment requirement | `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/TrialCheckoutTrait.php` |
| ArraySubs fee persistence and renewal exclusion | `SubscriptionCreationTrait.php`; `src/functions/subscription-helpers.php`; `RecurringBilling/Services/OrderCreation.php` |
| ArraySubs full/partial refund lifecycle | `arraysubs/src/Features/Refunds/Services/Hooks.php`; `RefundProcessor.php`; `Subscriptions/Services/OrderIntegration.php` |
| ArraySubs PayPal setup-fee handling | `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php` |
