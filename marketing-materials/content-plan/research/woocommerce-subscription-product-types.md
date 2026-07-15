# Research brief: A003 — WooCommerce Subscription Product Types Explained

**Research date:** 2026-07-13  
**Target brief:** `content-plan/articles/003-woocommerce-subscription-product-types-explained.md`  
**Focus keyword:** `WooCommerce subscription product types`  
**Source policy:** Current first-party or official sources only. No secondary publisher claims are used as evidence.  
**Confidence convention:** “Verified” means visible in a current official vendor document/product page on the research date. “Editorial framework” means an original categorization derived from those facts, not a vendor taxonomy.

## Executive finding

“WooCommerce subscription product types” is ambiguous. A useful article should not publish one flat list. It should separate three independent decisions:

1. **Catalog structure:** simple, variable, bundle, or composite product.
2. **Payment and duration model:** ongoing recurring, fixed-cycle recurring, prepaid fixed-term, installment/split payment, or one-time lifetime access.
3. **What is delivered:** physical goods, a virtual service, downloadable files, or membership/access rights.

This three-axis model is the article’s strongest original contribution. A “monthly coffee box” is not a distinct WooCommerce product type in the technical sense; it is usually a physical simple or variable product, sold on an ongoing or fixed-cycle billing schedule. Similarly, “lifetime” describes payment and access duration, not the product’s catalog structure.

## Suggested direct answer for the writer (52 words)

WooCommerce subscription products are best classified on three axes: product structure, billing model, and fulfilment. Choose a simple product for one offer or a variable product for customer-selectable tiers. Then choose ongoing, fixed-cycle, prepaid, installment, or lifetime payment terms, and define whether the customer receives goods, downloads, services, or access.

This is a drafting aid, not the article itself.

## Current-version and native/platform truth

### What WooCommerce core includes

WooCommerce core’s default catalog types are Simple, Grouped, External/Affiliate, and Variable. “Virtual” and “Downloadable” are product flags/options, not separate recurring-billing engines. A virtual product disables shipping; a downloadable product exposes file fields and download delivery. Source: [WooCommerce Product Editor settings](https://woocommerce.com/document/managing-products/product-editor-settings/).

**Do not say WooCommerce core includes subscription billing.** WooCommerce’s own product page describes WooCommerce Subscriptions as an extension that must be downloaded, installed, and activated. On 2026-07-13 the official product page displayed version **9.0.1**. Sources: [WooCommerce Subscriptions product page](https://woocommerce.com/products/woocommerce-subscriptions/) and [WooCommerce Subscriptions documentation hub](https://woocommerce.com/document/subscriptions/).

### What WooCommerce Subscriptions 9.0.x adds

Verified current behavior:

- WooCommerce Subscriptions can add subscription plans to **simple, variable, bundle, and composite products**.
- A product may use storewide plans or custom product-level plans.
- The current purchase options support subscription-only, one-time-only, or both one-time and subscription purchase choices.
- As of WooCommerce Subscriptions 9.0, Woo recommends subscription plans on normal simple, variable, bundle, and composite products for new setups.
- The older dedicated **Simple Subscription** and **Variable Subscription** product types remain supported. They can be hidden for new products, but existing products continue to work. Woo says there is no fixed removal date and no forced migration.

Source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) and the deprecation explanation in the [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/).

This change is time-sensitive and materially different from older tutorials. The article should mention it near the simple/variable explanation, with a visible “verified with WooCommerce Subscriptions 9.0.1 on 2026-07-13” note. Recheck the product page and creation guide immediately before publication.

### “Native to WooCommerce” versus “built on WooCommerce-native data”

Use these terms carefully:

- **Core-native:** shipped by WooCommerce itself without a subscription extension. Recurring subscription billing is not core-native.
- **WooCommerce Subscriptions:** Woo’s paid extension. It uses WooCommerce products and adds subscription plans, dedicated legacy product types, subscription agreements, billing schedules, renewal orders, and related behavior.
- **WooCommerce-native architecture:** an extension may use normal WooCommerce products, checkout, orders, coupons, tax, and HPOS. This does not mean its features ship in WooCommerce core.
- **ArraySubs:** a separate ArrayHash plugin built around WooCommerce. Its public product page says it uses WooCommerce products, checkout, coupons, tax, and HPOS; its own extension supplies the subscription and membership functionality. Sources: [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) and [ArraySubs product setup documentation](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html).

### Product versus subscription agreement

A subscription product is what is offered in the catalog. A subscription is the agreement/record governing future transactions. Woo’s official guide says the product carries purchasable terms, while the subscription contains the actual billing schedule, dates, payment method, addresses, line items, status, and related orders. An order records a transaction in the past; a subscription governs transactions in the future. Source: [Subscription Products vs Subscriptions](https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/).

This distinction belongs in a short callout, not a long detour, because A002 owns the deeper products/orders/renewals explanation.

## Axis 1: catalog structure

### Simple product / simple subscription

**Definition:** one purchasable configuration without customer-selected variations. Woo calls a core Simple Product the most straightforward product type: a single item without variations. With WooCommerce Subscriptions, a subscription plan can be attached to a simple product; the older dedicated Simple Subscription type also remains supported. Sources: [Adding and Managing Products](https://woocommerce.com/document/managing-products/) and [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

**Best fit:** one service retainer, one downloadable plan, one membership tier, or one fixed box size with one price and schedule.

**Operational benefit:** fewer SKUs, simpler merchandising, clearer reporting, and less plan-switching logic.

**Limitation:** if customers must choose materially different tiers, quantities, sizes, billing intervals, trial terms, or prices on one product page, a simple structure becomes a catalog of separate products rather than a single choice set.

### Variable product / variable subscription

**Definition:** a product with customer-selectable variations. Core WooCommerce lets each variation carry its own price, SKU, stock, and other attributes. In the dedicated Variable Subscription model, each variation also has subscription options; Woo positions it for different options or tiers and switching. Sources: [Variable Products](https://woocommerce.com/document/variable-product/) and [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

**Best fit:** Basic/Pro tiers, monthly/annual choices, small/large boxes, or plans whose price or schedule genuinely differs.

**Important current nuance:** WooCommerce Subscriptions 9.0 recommends subscription plans on standard variable products, while still supporting the dedicated Variable Subscription type. Do not write as if “Variable Subscription” is the only modern path.

**Variable-product edge cases:**

- Woo warns that all attributes of all variations should be defined when unexpected variation data appears in the cart.
- Core WooCommerce changes dynamic dropdown behavior on products with more than 30 variations, so do not recommend a combinatorial variation explosion without testing.
- In the older dedicated variable-subscription price display, Woo’s FAQ says the catalog “From” price is based on the lowest initial price for the longest period. Different lengths with the same price and billing period can produce a price string that omits the length. This is a merchandising reason to keep the comparison table explicit. Sources: [Variable Products](https://woocommerce.com/document/variable-product/) and [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/).

### Bundle and composite products

WooCommerce Subscriptions 9.0 documentation says subscription plans can be attached to Product Bundle and Composite products as well as simple and variable products. These product structures depend on their corresponding Woo extensions and are for combined/configurable product assemblies; they are not WooCommerce core’s simple/variable types. Source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

Keep this to a concise “advanced structure” note. The target query is first-time product-model selection, and the brief’s principal comparison is simple versus variable.

### Grouped products

Woo’s FAQ documents grouped products as one way to present multiple simple subscription products with different billing periods on one page. In the modern 9.0 plan model, a standard product can also expose multiple subscription plans. Do not frame grouped products as the default modern approach; explain it as another catalog presentation method, especially relevant to older/dedicated setups. Source: [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/).

## Axis 2: billing and duration model

### Ongoing recurring / evergreen

**Definition:** a repeating charge with no preset final payment. Woo’s current subscription-plan docs say plans renew indefinitely by default until the customer or store manager cancels. Source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

**Best fit:** value continues until cancellation: replenishment, SaaS, maintenance, support, publications, communities, or membership benefits.

**Decision check:** if the business stops delivering value at a known milestone, an ongoing plan is probably the wrong customer promise.

### Fixed-cycle recurring / limited subscription

**Definition:** recurring charges stop after a preset count or duration. Woo’s current subscription-plan interface can expire a plan after a set number of payments. The documented count includes the initial purchase: a monthly plan with 12 total payments charges once at signup and 11 more times. Woo’s dedicated product-type interface describes this as “Stop renewing after,” for example a six-week fitness course billed weekly for six weeks. Source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

**Best fit:** a six-week course, a 12-box series, a time-boxed coaching program, or a service package delivered over a known number of cycles.

**Key distinction:** this is a **fixed number of billing cycles**, not a shared calendar end date. A customer who starts later normally ends later unless a separate fixed-date/cohort system applies.

**Cancellation limitation:** Woo’s current plan docs say a subscriber can still cancel an expiring subscription before its scheduled expiration. Therefore a fixed-cycle subscription should not automatically be described as a legally binding installment obligation. Source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

### Fixed date or aligned renewal is different

Billing date alignment makes subscribers renew on a shared weekday, day of month, or month of year. It changes **when renewals occur**, not necessarily when access ends. Woo’s documentation says daily plans cannot be aligned, existing subscriptions are not retroactively changed when alignment is enabled, and future payment times can drift based on when a queued renewal actually processes. Source: [Guide to Billing Date Alignment](https://woocommerce.com/document/subscriptions/billing-date-alignment/).

ArraySubs separately markets **Fixed-Date Subscriptions** for enrollment windows, cutoffs, and period-end renewal/expiration, and lists that capability as Pro. Source: [ArraySubs product page](https://arrayhash.com/deals/arraysubs/).

Use a boxed warning: **Fixed-cycle, fixed-date, and billing-date alignment are three different controls.**

### Prepaid fixed-term

**Definition:** the customer pays the full term up front, while access or fulfilment continues for a defined period.

Woo’s FAQ documents two ways to collect the entire amount up front:

1. Charge one price for one billing period, such as $120 for six months, which Woo says is suitable for access over a period.
2. Set a $0 recurring amount and collect the total as a sign-up fee, while recurring $0 orders continue on the fulfilment schedule; Woo says this is more suitable when monthly shipment orders are needed.

Woo also documents a separate **Prepaid for WooCommerce Subscriptions** extension that adds prepaid plan choices to regular subscription products. Sources: [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) and [Prepaid for WooCommerce Subscriptions](https://woocommerce.com/document/prepaid-for-woocommerce-subscriptions/).

**Do not claim prepaid is a clean native product type.** In Woo’s FAQ it can be a one-period configuration or a $0-renewal workaround; the dedicated prepaid-plan UI comes from another extension.

**Prepaid edge cases from Woo:**

- The $0-renewal/sign-up-fee method exposes $0 renewal orders to customers and may send renewal emails.
- If a customer cancels or suspends, future fulfilment orders may stop even though the term was prepaid.
- Woo recommends matching billing and shipping schedules when possible.
- Older PayPal Standard has limitations with a $0 recurring total and can display confusing behavior for one-period subscriptions or sign-up fees.

Source: [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/).

### Installment / split-payment plan

**Editorial definition:** a fixed total purchase price is divided into scheduled payments. The economic promise is “pay the known balance over time,” not “keep receiving value until you cancel.”

Official marketplace evidence shows that installment behavior is supplied by separate payment-plan/deposit extensions, such as Woo’s marketplace documentation for Deposit and Partial Payment Plan, which tracks an upfront deposit, remaining balance, installment due dates, reminders, and auto-charge attempts. Source: [Deposit and Partial Payment Plan](https://woocommerce.com/document/deposit-and-partial-payment-plan/).

**ArraySubs truth gate:** the public ArraySubs page marks **Installment / Split Payments** as **Pro — Coming soon** and describes it as splitting a fixed-price product across multiple installments. It must not be presented as a shipped ArraySubs capability. Source: [ArraySubs product page](https://arrayhash.com/deals/arraysubs/).

**Writer guidance:** a fixed-cycle subscription can resemble installments because it creates several charges, but cancellation, fulfillment, accounting, and remaining-balance semantics differ. If the customer owes a fixed balance regardless of continued access, recommend a genuine payment-plan tool and qualified accounting/legal review rather than relabeling it as a cancel-anytime subscription.

### Lifetime / one-time access

**Definition:** one payment with no recurring renewal invoices and access that does not expire under the advertised terms.

This is not recurring billing. Woo’s own Subscriptions product page says the extension is not the right tool when a store only needs one-time purchases. For gated access, WooCommerce Memberships can grant unlimited membership from a product purchase, while recurring membership requires WooCommerce Subscriptions alongside it. Sources: [WooCommerce Subscriptions product page](https://woocommerce.com/products/woocommerce-subscriptions/), [WooCommerce Memberships](https://woocommerce.com/document/woocommerce-memberships/), and [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/).

ArraySubs explicitly ships a **Lifetime Deal** billing-period option: its setup guide says the customer pays once and no renewal occurs, while the product page describes one-time lifetime access through the subscription-aware setup. Sources: [ArraySubs product setup documentation](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html) and [ArraySubs product page](https://arrayhash.com/deals/arraysubs/).

**Limitations to state:** “lifetime” must define whose or what lifetime and what is included—access, updates, support, storage, or future features. Do not imply lifetime access is an ordinary recurring WooCommerce subscription type across all plugins.

### Trials and sign-up fees are modifiers, not product types

Woo defines a sign-up fee as a one-time amount paid at signup in addition to the recurring charge. Without a trial, the initial total is sign-up fee plus the first recurring payment. With a free trial, the customer pays the sign-up fee at checkout but not the recurring amount. Woo also says a free trial increases the total calendar length of a limited subscription; its example is six paid months plus a one-month trial, expiring after seven months. Source: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

Important operational edge cases:

- A free-trial product with no sign-up fee can have a $0 checkout. Woo has a setting that permits $0 initial checkout without collecting a payment method; when the trial ends, the subscription moves On Hold while waiting for the customer’s first payment.
- A free trial plus physical product normally yields no initial shipping charge when nothing else is bought. Woo suggests a sign-up fee if an upfront shipping charge is required.
- One-time shipping is disabled for a free-trial or future-aligned product in Woo’s documented dedicated-product behavior because the required three-tier price is not built in.

Sources: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/), [Subscriptions General Settings](https://woocommerce.com/document/subscriptions/store-manager-guide/), and [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/).

## Axis 3: what is delivered

### Physical goods

- The subscription’s renewal order normally drives both the recurring payment and recurring shipment.
- Woo recommends matching the payment schedule to the intended shipping schedule; a monthly shipment should normally have a monthly billing/order schedule.
- Shipping is normally charged on the initial order and renewals. Woo’s One Time Shipping option is for products that ship only once, such as hardware bundled with an ongoing service.
- Inventory generally reduces on each renewal for subscription products.

Sources: [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) and [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/).

**Implication:** choose the billing model only after mapping the fulfilment cadence. Annual prepayment with monthly delivery is operationally different from annual delivery, even if the total price is identical.

### Downloadable/digital products

Woo’s FAQ says downloadable files attached to a subscription remain accessible while the subscription is Active or Pending Cancellation, and are unavailable when Expired, On Hold, or Cancelled. The general settings guide says added files can become available immediately to existing active subscribers or after the next renewal when dripping is enabled. Sources: [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) and [Subscriptions General Settings](https://woocommerce.com/document/subscriptions/store-manager-guide/).

**Implication:** decide whether the customer is buying continuing access to a changing library, temporary access, or a permanent copy. A permanent file purchase is not necessarily a subscription; a recurring digital library is.

### Services

Woo’s official product page explicitly lists weekly service subscriptions and yearly software billing among supported use cases. Core WooCommerce’s Virtual flag removes shipping. Source: [WooCommerce Subscriptions product page](https://woocommerce.com/products/woocommerce-subscriptions/) and [WooCommerce Product Editor settings](https://woocommerce.com/document/managing-products/product-editor-settings/).

**Implication:** for a service, product structure should mirror the sellable promise, not internal staffing. Use simple for one retainer; variable for customer-selectable service levels or cadences. Use fixed-cycle for a defined program and ongoing for continuously delivered support.

### Membership/access

WooCommerce Subscriptions supplies recurring billing; WooCommerce Memberships supplies access control. Woo’s official page says the two are separate and often integrated. Memberships can grant unlimited or fixed-length access from a product purchase and can become recurring when used with Subscriptions. Sources: [WooCommerce Subscriptions product page](https://woocommerce.com/products/woocommerce-subscriptions/) and [WooCommerce Memberships](https://woocommerce.com/document/woocommerce-memberships/).

ArraySubs publicly states that it combines subscriptions and member access in its own plugin and that membership access can operate independently of billing. Source: [ArraySubs product page](https://arrayhash.com/deals/arraysubs/).

**Implication:** billing status and entitlement status are related but not identical concepts. The article should avoid saying “a subscription is a membership” or “a membership must recur.” Link to A002/A042 for deeper treatment.

## Original decision table for the article

This table is an editorial synthesis of the verified behavior above. It can be published as an original ArraySubs framework.

| Reader’s actual need | Catalog structure | Payment/duration model | Typical delivery | Best starting point | Main caution |
|---|---|---|---|---|---|
| One offer, one price, same cadence | Simple | Ongoing recurring | Service, download, membership, one physical SKU | Simple product + one subscription plan | Do not create variations with no meaningful customer choice |
| Customer chooses tier, size, or cadence on one page | Variable | Ongoing or fixed-cycle | SaaS tier, box size, monthly/annual | Variable product + clearly named options/plans | Variation count, ambiguous “From” price, switching/reporting complexity |
| Program or delivery series ends after a known count | Simple or variable | Fixed-cycle recurring | Course, coaching program, 6/12-box series | Expire after a set number of payments/cycles | Fixed-cycle is not a shared calendar end date or guaranteed installment debt |
| Customer pays the term up front, receives access | Simple or variable | Prepaid fixed-term | Course library, membership access | One-period term or a dedicated prepaid-plan feature | State access end date and cancellation/refund rules |
| Customer pays the term up front, receives repeated shipments | Simple or variable | Prepaid with recurring fulfilment orders | Monthly physical box | Dedicated prepaid feature or carefully tested $0-renewal structure | $0 orders, emails, cancellation stopping already-paid fulfilment, shipping cadence |
| Buyer owes a fixed total spread over time | Usually simple or variable | Installment/split payment | High-ticket product/service | Genuine deposit/payment-plan tool | Not equivalent to a cancel-anytime subscription; ArraySubs feature is coming soon |
| Buyer pays once for non-expiring access | Simple or variable | Lifetime/one-time | Membership, software access, digital library | One-time product + unlimited access, or ArraySubs Lifetime Deal | Define “lifetime,” support, updates, transfer, refunds |
| All customers renew on the same day | Any supported structure | Ongoing or fixed-cycle + alignment | Boxes, annual membership | Billing date alignment | Alignment changes renewal timing, not necessarily termination date |
| Cohort/season ends on a shared date | Any supported structure | Fixed-date term | Cohort course, seasonal club | A true fixed-date feature | Do not substitute billing-date alignment or fixed-cycle count without testing |

## Original choose-a-model flowchart logic

The writer/designer can render this as a flat flow diagram:

1. **Is there a repeating payment or repeating fulfillment/access event?**
   - No → one-time product. If access never expires, use a lifetime/unlimited-access model.
   - Yes → continue.
2. **Does the customer choose among materially different tiers, sizes, or schedules on one product page?**
   - No → simple product.
   - Yes → variable product (or multiple plans under the current Woo Subscriptions 9.0 model).
3. **Does value continue until the customer cancels?**
   - Yes → ongoing recurring.
   - No → fixed-cycle or fixed-date.
4. **Does everyone end on a shared calendar date?**
   - Yes → fixed-date/cohort system.
   - No → fixed-cycle count/duration.
5. **Is the full term paid at checkout?**
   - Yes → prepaid; separately map how access or shipments continue.
   - No → pay each cycle.
6. **Is there a fixed total balance the buyer owes regardless of continuing access?**
   - Yes → installment/payment-plan tool, not an ordinary subscription.
7. **For physical goods, does each payment correspond to a shipment?**
   - Yes → align billing/order and fulfillment cadence.
   - No → document and test the separate schedules, shipping charges, cancellations, and $0 orders.

## Worked examples for the article

These are deterministic examples, not benchmarks or claims about customer behavior.

### Example 1: one service versus variable service tiers

- Care Plan: $49/month, one scope → simple ongoing subscription.
- Care Plan with Essential $49/month and Growth $99/month → variable ongoing subscription, if the customer selects the tier on the same page.

The variation is justified by the customer-visible choice, not by the fact that the business has two internal service teams.

### Example 2: fixed-cycle versus installment

- Six-week class, $25 each week, access/lessons stop after week six → fixed-cycle subscription.
- $1,200 equipment purchase, $300 now plus three $300 balances → installment plan with a fixed total. Use a payment-plan/deposit product, not a cancel-anytime subscription label.

### Example 3: prepaid access versus recurring delivery

- $120 for six months of content access → one prepaid term can be clear because access is time-based.
- $120 up front for six monthly boxes → needs six fulfilment events. The system must create/track each shipment even though the merchandise was prepaid.

### Example 4: trial plus sign-up fee

- $75/month + $200 sign-up fee, no trial → $275 at checkout, then $75/month.
- Same plan + 30-day free trial → $200 at checkout, then $75 after the trial.

This mirrors Woo’s official example and should be cited directly to [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/).

## Recommended visual and image opportunities

All visuals should use ArraySubs’ flat editorial palette, solid colors, no gradients, no neon, and no unsupported statistical claims.

### 1. Hero: “Three decisions make a subscription product”

Flat editorial illustration with three connected panels:

- **Structure:** one product card versus stacked tier cards.
- **Money:** circular renewal arrows, a finite row of six payment dots, and a single lifetime coin.
- **Delivery:** box, laptop/file, service person, and key/access badge.

Use restrained purple, lavender, cream, charcoal, muted green, and soft amber. Include simple human silhouettes choosing between cards. Leave clean title space; no chart labels in the generated bitmap unless they can be rendered separately in HTML for accessibility.

### 2. Taxonomy diagram: three-axis model

An HTML/CSS diagram is preferable to bitmap text:

```text
Catalog shape          Payment promise              What customer receives
Simple / Variable  ×   Ongoing / Fixed-cycle   ×   Goods / Files
Bundle / Composite     Prepaid / Installment        Service / Access
                        Lifetime
```

This diagram is the article’s original extractable asset.

### 3. Decision table

Render the original table above in accessible HTML. On mobile, turn each row into a card, not a horizontally clipped screenshot.

### 4. Choose-a-model flowchart

Use the seven-step logic above. Flat rounded rectangles and arrows; human silhouette at the starting question and four destination cards: Ongoing, Fixed, Prepaid, Lifetime/Installment. Ensure every arrow label is visible as HTML or SVG text and include a prose equivalent below it.

### 5. Bar chart: six-month cash timing (illustrative, not benchmark data)

Grouped bars using a deterministic $150 total example:

| Month | Pay-as-you-go $25 × 6 | Prepaid $150 |
|---|---:|---:|
| Checkout / month 1 | $25 | $150 |
| Month 2 | $25 | $0 |
| Month 3 | $25 | $0 |
| Month 4 | $25 | $0 |
| Month 5 | $25 | $0 |
| Month 6 | $25 | $0 |

Caption: “Illustrative cash timing for the same $150 stated price; excludes tax, fees, refunds, and time value of money.” Do not label one model “more profitable.”

### 6. Pie/donut chart: initial checkout components

Use the official-style worked example of a $75 recurring charge plus $200 sign-up fee:

- Without trial: checkout total $275 → $200 sign-up fee (72.7%) and $75 first period (27.3%).
- With trial: checkout total $200 → 100% sign-up fee; the $75 recurring charge is delayed.

Better as two side-by-side donuts. Label it “worked example,” not user behavior. Include the exact dollar labels next to the chart; do not rely on area/color alone.

### 7. Timeline: trial + fixed term

Flat seven-block timeline based on Woo’s documented example: one free-trial month followed by six paid monthly periods. Visually distinguish “access before billing” from the paid cycles and show the expiration point. Caption with the Woo source.

### 8. Physical subscription workflow

Flow: product choice → checkout → subscription agreement → renewal order → payment → shipment → next date. Add a fork showing prepaid payment at checkout but repeated fulfilment events. This makes the billing/fulfilment distinction concrete.

### 9. Ecosystem-layer illustration

Three stacked solid-color layers:

- WooCommerce core: products, cart/checkout, orders, tax, shipping.
- Subscription engine: plans, agreements, renewal schedule, renewal orders.
- Optional access/fulfilment layer: membership rules, downloads, services, shipping operations.

Add callouts: WooCommerce Subscriptions and ArraySubs are extensions; “WooCommerce-native” does not mean “included in core.”

### 10. Simple versus variable card illustration

One offer card on the left; three selectable tier cards on the right, with a human silhouette pointing. Keep detailed comparison for A004; this illustration should only establish the concept.

## Edge cases and limitations checklist

The final article should include a visible limitations section covering at least these points:

- WooCommerce Subscriptions 9.0.1 is an extension, not WooCommerce core.
- Woo 9.0 recommends subscription plans on standard supported products; dedicated Simple/Variable Subscription types remain supported without a fixed removal date.
- “Simple versus variable” is a catalog decision, not the same as “ongoing versus fixed-term.”
- Fixed-cycle does not equal fixed-date; billing-date alignment does not define a shared end date.
- Current Woo plan payment counts include the initial purchase; describe examples precisely.
- A free trial delays the recurring charge but does not automatically delay the sign-up fee.
- Woo says a trial adds to the total calendar length of a limited subscription.
- Variable-product “From” pricing can obscure differences in length or initial price; show full terms visibly.
- Physical subscriptions need billing/order cadence mapped to shipment cadence.
- Prepaid physical fulfilment can produce $0 renewal orders and cancellation problems if implemented as a sign-up-fee workaround.
- Download access can depend on subscription status; do not promise permanent ownership from an active-only subscription.
- Automatic versus manual renewal support depends on the payment gateway and its supported features. Source: [Subscriptions Payment Methods & Gateways](https://woocommerce.com/document/subscriptions/payment-gateways/).
- Installment obligations are not ordinary cancel-anytime subscriptions; ArraySubs installment/split payments are currently marked coming soon.
- Lifetime access is one-time, not recurring. Define the entitlement scope and duration.
- ArraySubs public setup documentation covers simple and variable products. Do not claim bundle/composite behavior for ArraySubs without a first-party test.
- ArraySubs’ public setup guide says enabling subscription behavior on a variable parent marks all variations as subscriptions; do not promise a mix of subscription and non-subscription variations in one ArraySubs variable product without current product testing.
- ArraySubs automatic Stripe/PayPal/Paddle renewals are Pro; the free core uses manual renewal invoices with WooCommerce gateways, per the public product page.

## Where ArraySubs is and is not the fit

Verified shipped/current public claims:

- Simple subscription products and variable subscriptions with per-plan price, cycle, and trial are included in Free and Pro.
- Free trials and one-time sign-up fees are included.
- The product setup guide supports billing periods of day, week, month, year, and Lifetime Deal, with a 1–12 interval and 0–365 subscription length.
- Lifetime Deal collects once and does not renew.
- Fixed-Date Subscriptions are Pro.
- Automatic renewals through Stripe, PayPal, and Paddle are Pro; manual renewal invoices work through the free core.

Sources: [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) and [Create and Configure Subscription Products](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html).

Visible “not a fit / not yet” guidance:

- **Do not choose ArraySubs for a shipped installment workflow today.** Installment/Split Payments is marked coming soon.
- If the immediate requirement is a documented Woo subscription plan on Product Bundles or Composite Products, WooCommerce Subscriptions 9.0 documents that path; ArraySubs’ current public setup guide only documents simple and variable products. Require a direct ArraySubs test before claiming support.
- If the store only needs an ordinary one-time product with no subscription-aware access/lifecycle, WooCommerce core may be simpler than adding a subscription engine.
- If recurring billing and member access are separate architectural concerns, explain that Woo’s official stack uses WooCommerce Subscriptions plus WooCommerce Memberships, whereas ArraySubs combines these areas in its own system. Avoid pretending the products are structurally identical.

## SERP and intent snapshot

Queries rerun on 2026-07-13:

- `WooCommerce subscription product types`
- `types of WooCommerce subscription products`
- `simple variable fixed term subscription types WooCommerce`

Observed result pattern: the exact-intent results heavily surface Woo’s “Creating a Subscription Product,” product-versus-subscription, data-structure, FAQ, and product pages, followed by plugin pages and broad Woo product-type explainers. Many results still use the older dedicated Simple/Variable Subscription framing. The editorial opportunity is to publish the updated WooCommerce Subscriptions 9.0 model while giving beginners a plugin-neutral three-axis decision framework. No non-primary result was used as evidence in this brief.

No Search Console or paid keyword database was available in the provided workspace context, so volume, difficulty, and site-specific query demand remain unverified.

## Suggested article structure based on the evidence

1. 40–60 word direct answer using the three-axis model.
2. Key takeaways: simple versus variable; ongoing versus fixed/prepaid; delivery/access is separate; subscriptions require an extension.
3. “First, know what product type means” — taxonomy diagram and native/platform distinction.
4. Decision table of the main models.
5. Simple versus variable, including the Woo Subscriptions 9.0 update.
6. Ongoing, fixed-cycle, prepaid, installment, lifetime.
7. Physical, digital, service, and membership implications.
8. Choose-a-model flowchart.
9. Limitations and not-a-fit guidance.
10. CTA after the answer: View Pro Pricing.

Avoid detailed ArraySubs configuration steps; link to the recipes instead. A004 owns the deep simple-versus-variable comparison, and A005 owns the recurring-versus-fixed-term comparison.

## Internal links required by the brief

- Commercial pillar: `/deals/arraysubs/`
- Products/checkout feature hub: `/deals/arraysubs/features/#products-checkout`
- Monthly versus annual variable recipe: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`
- Prepaid fixed cycles recipe: `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`
- Lifetime deal recipe: `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- A002: What Is a WooCommerce Subscription? Products, Orders, and Renewals Explained
- A004: Simple vs Variable WooCommerce Subscriptions: Which Product Type Fits?
- A005: Recurring vs Fixed-Term Subscriptions: Choose the Right Billing Model

## Source register and claim use

### WooCommerce/Woo primary sources

1. [WooCommerce Subscriptions product page](https://woocommerce.com/products/woocommerce-subscriptions/)  
   Use for current version 9.0.1, extension status, recurring billing purpose, physical/virtual/downloadable/service examples, trials/sign-up fees, gateway and product-page positioning, and “not for one-time only” guidance.
2. [Introduction to WooCommerce Subscriptions](https://woocommerce.com/document/subscriptions/)  
   Use for premium-extension description, documentation map, and current requirements/compatibility context.
3. [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/)  
   Primary behavior source for current plans, simple/variable legacy types, payment schedules, expiration/payment count, trials, sign-up fees, one-time purchase option, shipping, inventory, and limitations.
4. [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/)  
   Use for dedicated-type deprecation/no forced migration, grouped/variable options, variable price strings, prepaid workarounds, physical billing-versus-shipping, downloadable access, custom interval/length limits, PayPal caveats, and product deletion/type-change behavior.
5. [Subscription Products vs Subscriptions](https://woocommerce.com/document/subscriptions/subscription-product-vs-subscription/)  
   Use for catalog product versus future-transaction agreement and billing-schedule distinctions.
6. [Subscriptions Data Structures & Storage](https://woocommerce.com/document/subscriptions/develop/data-structure/)  
   Use only if technical detail is needed: legacy dedicated types extend simple/variable Woo product classes and store price, interval, length, trial, and fee metadata.
7. [WooCommerce Product Editor settings](https://woocommerce.com/document/managing-products/product-editor-settings/)  
   Use for core product types and Virtual/Downloadable behavior.
8. [Variable Products](https://woocommerce.com/document/variable-product/)  
   Use for core variation definition, per-variation price/SKU/stock, attribute setup, and more-than-30-variation dropdown caveat.
9. [Guide to Billing Date Alignment](https://woocommerce.com/document/subscriptions/billing-date-alignment/)  
   Use for fixed-cycle versus alignment distinctions, first-charge behavior, existing-subscription limitation, time-zone/queue behavior, and proration examples if needed.
10. [Subscriptions Payment Methods & Gateways](https://woocommerce.com/document/subscriptions/payment-gateways/)  
    Use for automatic/manual renewal distinction and gateway-feature dependency.
11. [Subscriptions General Settings](https://woocommerce.com/document/subscriptions/store-manager-guide/)  
    Use for storewide plans, $0 initial checkout, downloadable-content dripping, and scheduled-action context.
12. [Prepaid for WooCommerce Subscriptions](https://woocommerce.com/document/prepaid-for-woocommerce-subscriptions/)  
    Use to establish that a dedicated prepaid-plan experience comes from an additional marketplace extension.
13. [Deposit and Partial Payment Plan](https://woocommerce.com/document/deposit-and-partial-payment-plan/)  
    Use only to illustrate that installments track deposits, balances, due dates, reminders, and auto-charge attempts in a separate payment-plan system.
14. [WooCommerce Memberships](https://woocommerce.com/document/woocommerce-memberships/) and [Membership Plans](https://woocommerce.com/document/woocommerce-memberships-plans/)  
    Use for billing-versus-access separation and unlimited/fixed/recurring membership distinctions.

### ArrayHash primary sources

15. [ArraySubs product page](https://arrayhash.com/deals/arraysubs/)  
    Use for current public feature/tier claims, WooCommerce-native architecture wording, fixed-date Pro, lifetime deals, manual versus automatic renewals, and installment coming-soon status.
16. [Create and Configure Subscription Products](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html)  
    Use for the ArraySubs checkbox/UI model, simple/variable behavior, billing period/interval/length ranges, per-variation fields, trial and sign-up fee behavior, lifetime behavior, and documented limitations.

## Revalidation checklist before publication

- Confirm the live WooCommerce Subscriptions version still matches 9.0.1.
- Re-read the Woo creation guide for changes to subscription plans and dedicated product-type status.
- Verify all ArraySubs tier labels against live product/features pages and current code.
- Run a first-party ArraySubs test for simple, variable, fixed-cycle, trial, sign-up fee, lifetime, and physical shipping behavior before calling anything “tested.”
- Do not test or claim installment behavior as shipped while it remains marked coming soon.
- Capture current-version screenshots of the Woo product-plan editor and ArraySubs Subscription tab only if licensing/usage permits; otherwise create original diagrams.
- Record WordPress, WooCommerce, WooCommerce Subscriptions/ArraySubs, PHP, theme, gateway, and checkout type in the visible test-environment box.
- Add named author and technical reviewer, published date, last verified date, limitations, and update log.
- Keep the CTA after the decision framework and core answer.
