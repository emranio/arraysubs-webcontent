# Research brief: One-Time Purchase and Subscription on One Product: When to Offer Both

## Research record

- **Article:** A009
- **Research date:** 2026-07-13
- **Focus keyword:** `one time purchase and subscription same product`
- **Long-tail intent:** `buy once or subscribe WooCommerce`, `one time purchase plus recurring option`, and `subscribe and save product page strategy`
- **Audience:** First-time WooCommerce subscription operators, implementers, and product managers deciding whether to place a buy-once offer beside a recurring offer.
- **Evidence scope:** Current official WooCommerce documentation, current ArraySubs and ArraySubs Pro source, current first-party ArraySubs documentation/product content, W3C form guidance, FTC ROSCA guidance, and NIST experiment-design guidance.
- **No invented benchmarks:** No conversion, subscription-selection, churn, repeat-purchase, return, discount, or retention benchmark is presented. Every number below is either documented product behavior or clearly labeled hypothetical arithmetic.
- **No live checkout test was run for this research task.** ArraySubs findings are source/manual findings. WooCommerce findings are documentation findings. Publication must add a dated browser test if screenshots or exact current UI copy are used.

## Editorial thesis

Offering buy once and subscribe on one product is a **customer-choice and operating-model decision**, not merely a merchandising widget. It fits when the item is genuinely replenishable, repeat timing is predictable enough to automate, the subscription discount leaves a safe contribution margin, and the store can reserve inventory and support cancellation without friction.

The article should make one important distinction immediately:

1. **One product, two purchase modes:** the shopper selects one-time or recurring for the same product identity/SKU.
2. **Two linked products:** a regular WooCommerce product and a separate subscription product are compared on one landing page or linked from each other.

Those models can look similar to a shopper, but their implementation, stock, reporting, cart, and plugin requirements differ.

Current official WooCommerce Subscriptions documentation supports the first model through subscription plans on ordinary product types and a **“Customers can buy this product without subscribing”** option. Current ArraySubs source does **not** expose a comparable same-product purchase-mode selector: `_is_subscription` is a binary product flag, and a variable parent synchronizes that flag to every variation. ArraySubs can support a store containing both ordinary and subscription products, including mixed checkout when the selected gateway allows it, but that is not the same as letting one product line be purchased either way.

That limitation is strategically useful, not something to obscure. A009 should identify where ArraySubs is not the best fit. If a literal same-product/SKU chooser is non-negotiable, current WooCommerce Subscriptions' plan model is the directly documented route. If a merchant can accept two linked product records, ArraySubs may still fit, subject to stock synchronization, gateway, analytics, and storefront work.

## Direct-answer fact pattern

> Offer one-time and subscription choices together when customers repeatedly need the same product on a reasonably predictable schedule and the recurring price still clears your contribution floor. Show both prices, delivery cadence, savings basis, renewal terms, and cancellation path clearly. Current ArraySubs requires separate regular and subscription products; it does not provide a verified same-product chooser.

This is 54 words and resolves the query without delaying the ArraySubs limitation. House voice can be applied, but do not weaken “current ArraySubs requires separate” or replace it with an implied native feature claim.

## Key takeaways for the article

1. A dual offer works best for replenishable products with observable repeat behavior, not merely products a seller hopes customers will reorder.
2. “Same product” must be defined: a single product/SKU with purchase plans is technically different from two products compared on one page.
3. A subscription discount is viable only when each completed recurring delivery still clears a defined contribution floor.
4. The product page should treat buy once versus subscribe as an explicit, accessible choice and restate recurring terms at checkout.
5. Stock must cover current one-time demand and future renewal commitments. In WooCommerce Subscriptions, renewal orders reduce stock by default and can continue when stock reaches zero.
6. Returns/refunds and subscription cancellation are separate workflows. Cancelling a renewal order does not automatically cancel the subscription in WooCommerce Subscriptions.
7. Measure net contribution per eligible visitor over a declared horizon, with conversion, early cancellation, returns, payment failures, support, and stockouts as guardrails.
8. Current ArraySubs has a binary product-level subscription flag. Its mixed-cart feature concerns separate products in one order; it does not create a buy-once/subscribe selector for one product.

## Scope and definitions

### One-time purchase

A transaction that charges for the current order without creating an agreement to place or bill future renewal orders for that item. This is different from a subscription signup fee: a signup fee is a one-time amount attached to a recurring subscription, not a standalone buy-once mode.

### Subscription purchase

A transaction that creates a subscription and schedules or authorizes future renewal transactions according to the disclosed cadence and term. The initial order and later renewal orders are related but distinct records.

### Dual offer on one product

One product detail page lets the shopper choose:

- **Buy once** at a stated price; or
- **Subscribe** at a stated price and cadence.

In a literal same-product implementation, both modes use the same underlying product identity and often the same SKU/stock pool. Current [WooCommerce Subscriptions product-creation documentation](https://woocommerce.com/document/subscriptions/creating-subscription-products/) describes this through subscription plans added to simple, variable, bundle, and composite products, with an optional one-time purchase checkbox.

### Two linked products presented as one decision

A regular product and a subscription product have separate product IDs and potentially separate SKUs/stock records, but the theme or landing page compares them. This can satisfy the shopper's decision task, yet it is not technically the same product. It requires an explicit approach to:

- stock synchronization or shared inventory;
- canonical URLs and duplicate content;
- cart behavior;
- analytics attribution;
- price updates;
- reviews and merchandising;
- product feeds and marketplace integrations.

### Subscribe and save

A subscription offer whose recurring price is lower than the comparable one-time price. The saving must be calculated against a real, currently available comparison price. “Subscribe” does not inherently require a discount; convenience, availability, service, or access can be the value. Do not call an offer “save” if the displayed arithmetic does not support it.

## Search-result and intent observations

The four target queries currently return three broad result classes:

1. **WooCommerce product/documentation pages** explaining same-product one-time and recurring purchase plans.
2. **Plugin/add-on pages** selling a buy-once-or-subscribe widget or plan layer.
3. **General subscribe-and-save strategy content** that often repeats unsupported conversion or retention claims.

The article can differentiate by answering both questions that most results separate:

- *Should the business offer both?*
- *Can the current selected WooCommerce subscription system implement it truthfully?*

Important current documentation tension: the WooCommerce Marketplace page for the separate [Buy Once or Subscribe extension](https://woocommerce.com/products/buy-once-or-subscribe-for-woocommerce-subscriptions/) describes the add-on as enabling side-by-side modes, while the newer core [WooCommerce Subscriptions 9.0 product-plan documentation](https://woocommerce.com/document/subscriptions/creating-subscription-products/) also documents one-time plus subscription plans. The article must not infer that the add-on is universally required. Treat it as an optional source of extra behavior—such as cart plan changes or a configurable default—only after a compatibility test against the merchant's current WooCommerce Subscriptions version.

Do not use marketplace statements such as “increase conversion rates” as evidence. They are vendor marketing claims, not controlled results.

## Current platform truth

### WooCommerce Subscriptions: current documented same-product route

The current [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) guide says:

- subscription plans can be attached to simple, variable, bundle, and composite products;
- the Purchase options control can sell on subscription, one time, or both;
- storewide or product-specific custom plans can be used;
- the “Customers can buy this product without subscribing” checkbox adds one-time purchase beside subscription plans;
- plan prices can discount the product price or use a custom recurring price;
- with a custom price, the subscription price is independent of the one-time product price;
- as of WooCommerce Subscriptions 9.0, this plan model is recommended for new configurations, while dedicated Simple/Variable Subscription types remain available for older or unsupported use cases.

This is direct documentation evidence that the focus query is feasible in current WooCommerce Subscriptions. It is not evidence that every older theme, checkout block, extension, gateway, or catalog integration renders the selector correctly. Publication still needs a representative product-page/cart/checkout test.

The current [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) also states that the plugin can offer one-time and subscription options for the same product.

### Optional WooCommerce “Buy Once or Subscribe” add-on

The [extension documentation](https://woocommerce.com/document/Buy-Once-or-Subscribe-for-WooCommerce-Subscriptions/) documents capabilities beyond the basic concept:

- product- and variation-specific plans;
- percentage or fixed-value subscription discounts;
- switching the purchase plan in the cart for simple and variable products;
- setting the default purchase option to one-time or subscription;
- customizable storefront labels;
- adding eligible products to an existing subscription in supported cases.

The same documentation lists material limitations. Examples include cart plan selection being limited to simple and variable products, bundle/composite products showing only the selected price in cart, and capability-specific constraints for existing-subscription additions. Publication must recheck the current version and its compatibility with WooCommerce Subscriptions' native plan model before recommending it.

Editorial rule: describe this as an **optional extension for additional controls**, not as the only way to sell both modes.

### ArraySubs: verified current product behavior

Current ArraySubs core uses a binary `_is_subscription` product flag:

- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php:374-382` adds one **Subscription** checkbox with the description “Enable subscription for this product.”
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php:473-489` normalizes and saves that checkbox.
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php:498-509` synchronizes the parent `_is_subscription` value to every variation of a variable product.
- `arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php:33-52` shows the per-variation subscription checkbox as disabled and controlled by the product-level setting.
- `user-manual/markdowns/subscription-products/create-and-configure.md:200` says individual variations cannot be made non-subscription while the parent is a subscription product.
- The same manual's edge-case section at lines 262-269 says a variable product cannot mix subscription and non-subscription variations.

Therefore, current ArraySubs has **no verified native same-product one-time-plus-subscription selector**. A variable product cannot be used as a hidden workaround with one buy-once variation and one recurring variation because the product-level subscription flag is synchronized to all variations.

### What ArraySubs can do instead

Current ArraySubs can support a catalog containing both:

- regular WooCommerce one-time products; and
- separate ArraySubs subscription products.

The default settings in `arraysubs/src/functions/settings-helpers.php:27-32` allow multiple subscriptions, mixed carts, and different billing cycles. The current manual explains **Allow Mixed Checkout** at `user-manual/markdowns/settings/general-settings.md:97-118`: ordinary and subscription items may share an order when enabled, but automatic gateways can add restrictions.

Gateway capability matters:

- Stripe delegate: `mixed_cart => true` in `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`.
- Paddle gateway: `mixed_cart => true` in `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`.
- PayPal gateway: `mixed_cart => false` in `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`.
- `user-manual/markdowns/checkout-and-payments/automatic-payments/paypal.md:129` says PayPal restrictions are enforced even when general settings allow mixed carts.

This permits a possible **two-product workaround**, not the literal same-product behavior. The article should say that a theme, block, custom landing page, or other presentation layer must make those two product records feel like one choice. No current ArraySubs source reviewed here provides that combined selector, shared-stock abstraction, or automatic paired-product synchronization.

### ArraySubs Lifetime Deal is not the missing buy-once choice

ArraySubs' Lifetime Deal billing period is one-time only and has no renewals. The manual says this at `user-manual/markdowns/subscription-products/create-and-configure.md:68-79` and `:262-267`. It does not put a one-time alternative beside a recurring alternative on the same product. Do not recommend “Lifetime Deal” as proof of a native dual offer.

### A signup fee is not a one-time purchase

ArraySubs can attach a one-time signup fee to the initial subscription order, but the customer is still entering a recurring plan. The manual describes the fee at `user-manual/markdowns/subscription-products/create-and-configure.md:138-145`. A009 should link to the signup-fee article where relevant but must not conflate fee structure with purchase-mode choice.

## Decision framework: should this product offer both?

Use a gate-based decision rather than an arbitrary score threshold. A high score cannot compensate for a failed consent, fulfillment, or margin gate.

### Gate 1: recurring customer value

Ask whether receiving the same product again solves a real recurring problem.

Strong signals:

- the product is consumed, depleted, renewed, or used up;
- customers already reorder the same SKU without heavy prompting;
- running out creates meaningful inconvenience;
- the customer benefits from scheduled availability;
- the quantity can be reasonably matched to a cadence.

Weak signals:

- it is durable or usually bought once;
- the next need depends on a rare event;
- customers want discovery and variety rather than the same item;
- repeated purchases are driven by gifts, seasonal events, or unrelated buyers;
- the seller wants recurring revenue but the customer receives no recurring value.

Decision: if recurring value cannot be described in one customer-centered sentence, do not add a subscription selector yet.

### Gate 2: cadence predictability

Use first-party order history, not a generic “monthly is normal” assumption. Calculate:

- share of purchasers who buy the same SKU again;
- days from first to second purchase;
- distribution of gaps between repeat orders;
- quantity per purchase;
- whether repeat intervals differ by size, household, or use case;
- whether customers alternate between related SKUs.

Do not rely on only the average reorder gap. A mean of 30 days could hide one group reordering after 10 days and another after 50. Show the median and distribution or percentiles. If timing is dispersed, offer a small set of frequencies, a customer-adjustable cadence, or keep buy once as the primary path.

Decision: pass when at least one offered cadence is supported by a meaningful cluster in the store's own data and operations can handle changes, skips, or cancellations. No universal percentage is justified.

### Gate 3: contribution margin after the recurring discount

The discounted recurring delivery must cover its own product, fulfillment, payment, expected service, and policy costs. Projected future renewals cannot rescue a first delivery that violates the store's cash or contribution constraints unless the business has explicitly approved that acquisition investment.

Decision: pass only after a written per-delivery contribution floor and downside case exist.

### Gate 4: inventory and fulfillment reliability

Subscribers create forward delivery expectations. A store that frequently stocks out, substitutes products, changes formulations, or misses dispatch windows should solve those problems before encouraging automated renewals.

Decision: pass when the store can forecast committed units, define subscriber allocation, handle stockouts, and communicate substitutions/delays.

### Gate 5: explicit choice and cancellation readiness

The [FTC's ROSCA recap](https://www.ftc.gov/business-guidance/blog/2018/07/time-rosca-recap-ftc-says-risk-free-trial-was-risky-not-free) summarizes U.S. requirements for online negative-option offers: disclose material terms before billing information, obtain express informed consent before charging, and provide a simple mechanism to stop recurring charges. This is U.S. federal guidance, not global legal advice.

Decision: pass only when recurring price, cadence, future charges, term, cancellation, and material shipping/return conditions are visible before purchase and the customer can stop future charges through a documented path.

### Gate 6: data separation

The store must be able to distinguish:

- eligible product-page visitors;
- one-time selection and completed purchases;
- subscription selection and initial purchases;
- first and later completed renewals;
- cancellations, skips, pauses, failed payments, refunds, returns, support contacts, and stockouts by mode.

Decision: if the implementation cannot attribute these events, the store cannot know whether the dual offer improved customer value or merely shifted orders between modes.

### Gate 7: implementation truth

Ask whether the chosen plugin actually supports the promised experience.

- **Literal one product/SKU:** current WooCommerce Subscriptions plan model is documented for it.
- **Current ArraySubs:** use two separate product records and a clearly tested comparison/presentation layer, or choose a different system when one product identity is mandatory.
- **Variable-product workaround in ArraySubs:** not valid; all variations inherit the subscription flag.

Decision: do not publish “buy once or subscribe on one product with ArraySubs” until a current product control exists and is verified.

## Customer-demand research plan

### Baseline cohort

Use purchasers of the exact product or stable SKU family before the dual offer existed. Exclude orders whose behavior cannot represent normal replenishment, such as internal/test orders, replacements, fraud, bulk wholesale orders, and obvious gift campaigns. Document exclusions.

### Useful first-party measures

| Measure | Definition | What it answers | Caution |
| --- | --- | --- | --- |
| Same-SKU repeat rate | Customers with another completed order for the same SKU ÷ eligible first-time buyers | Is repeat demand already present? | Choose and disclose a time horizon. |
| Time to second purchase | Days from first completed order to next completed same-SKU order | Which cadence clusters are plausible? | Survivorship and observation-window censoring matter. |
| Repeat-gap dispersion | Distribution of days between repeat orders | Is one cadence enough? | Do not summarize with the mean alone. |
| Repeat quantity | Units in repeat order | What quantity should a recurring delivery offer? | Household/use-case differences may dominate. |
| Return/refund rate by order number | Returns/refunds after first, second, and later purchases | Does repeated delivery create dissatisfaction? | Policy changes can confound periods. |
| Stockout encounters | Sessions/orders blocked or delayed for insufficient stock | Can the store fulfill future commitments? | Track lost demand and delayed fulfillment separately. |
| Support themes | Contacts about running out, reorder reminders, frequency, cancellation, excess stock | Which control matters to customers? | Qualitative coding needs consistent categories. |

### Customer interviews

Ask behavior-first questions:

- “Tell me about the last time you ran out and reordered.”
- “How long does one unit normally last?”
- “What would make an automatic delivery arrive too early or too late?”
- “Would you want to change quantity, skip, or swap?”
- “What information would you need before agreeing to repeat billing?”

Avoid asking only “Would you subscribe?” Hypothetical willingness is weaker than observed repeat orders and concrete past behavior.

### Fit examples

Good candidates can include consumables, replacement filters, routine supplies, recurring services, or access that customers genuinely continue using. These are examples, not categories guaranteed to succeed.

Poor candidates can include durable goods, unpredictable repair parts, highly seasonal gifts, products with unstable availability, high-return fit-sensitive items, or goods whose use rate varies too widely for the available controls.

## Price and discount architecture

### Core variables

Let:

- `Pₒ` = one-time selling price per delivery;
- `Pₛ` = subscription selling price per delivery;
- `V` = direct product and fulfillment cost per delivery;
- `Oₒ` = incremental one-time order operations/payment/support cost;
- `Oₛ` = incremental subscription delivery operations/payment/support cost;
- `Cₒ` = one-time contribution per completed order;
- `Cₛ` = subscription contribution per completed delivery;
- `K` = required subscription contribution floor per completed delivery;
- `qₜ` = probability that a subscription reaches and completes delivery `t` for the defined cohort;
- `H` = evaluation horizon in deliveries or time.

```text
Cₒ = Pₒ − V − Oₒ
Cₛ = Pₛ − V − Oₛ

Subscription discount dollars = Pₒ − Pₛ
Subscription discount rate = (Pₒ − Pₛ) ÷ Pₒ

Minimum viable subscription price = V + Oₛ + K
Maximum discount dollars at the contribution floor = Pₒ − (V + Oₛ + K)

Expected subscription contribution through H
= Σ from t=1 to H of (qₜ × Cₛ,ₜ)
```

If product cost, shipping, tax handling, or support changes by cycle, use a cycle-specific `Cₛ,ₜ`. Do not multiply the first-delivery margin by a guessed “average lifetime.”

### What belongs in direct costs

The exact accounting classification belongs to the business and its accountant, but the decision model should at least consider:

- product/ingredient/manufacturing cost;
- pick, pack, and packaging;
- shipping subsidy and recurring shipping behavior;
- payment and gateway costs;
- expected returns, refunds, credits, and replacements;
- incremental subscription support;
- inventory carrying or spoilage exposure;
- discounts and recurring coupons;
- taxes that are seller-borne;
- customer-acquisition cost when comparing acquisition strategies.

Do not assume subscriptions lower acquisition cost or support cost. Test those claims.

### Worked example: transparent arithmetic, not a benchmark

Assume a hypothetical replenishment product with no tax. The costs are invented for illustration and are not observed ArraySubs, WooCommerce, or industry data.

| Input | Buy once | Subscribe per completed delivery |
| --- | ---: | ---: |
| Selling price | `$45` | `$40` |
| Product + fulfillment cost | `$25` | `$25` |
| Incremental recurring operations/refund reserve | `$0` | `$2` |
| Direct contribution | `$20` | `$13` |

Calculations:

```text
Subscription discount = ($45 − $40) ÷ $45 = 11.1%

Buy-once direct contribution = $45 − $25 = $20

Subscription contribution per completed delivery
= $40 − $25 − $2
= $13

Three completed subscription deliveries:
Revenue = 3 × $40 = $120
Direct contribution = 3 × $13 = $39

Gross completed-delivery contribution crossover
= $20 ÷ $13
= 1.54 deliveries, therefore 2 completed deliveries in whole-delivery terms
```

Interpretation:

- One completed subscription delivery produces `$13`, less than the `$20` one-time contribution in this scenario.
- Two completed subscription deliveries produce `$26`, more than one one-time order's `$20` contribution.
- Three completed subscription deliveries produce `$39` direct contribution on `$120` revenue.
- This does **not** prove the subscription is better. It excludes acquisition cost, probability of each renewal, timing, failures, refunds, tax, working capital, and the chance that a one-time buyer would have reordered anyway.

The existing `worked-model-bars.svg` concept should not show `$120` alone as if it were profit. If retained, label separate revenue and contribution bars or annotate the chart: buy once `$45 revenue / $20 contribution`; subscription first delivery `$40 / $13`; three completed deliveries `$120 / $39`.

### Compare against organic repeat purchases

The correct counterfactual is not “one subscription versus one one-time order” when many one-time customers would reorder. Compare cohorts:

```text
Incremental contribution from dual offer through H
= contribution per eligible visitor in dual-offer variant
− contribution per eligible visitor in buy-once-only control
```

This captures:

- lost contribution when an existing repeat buyer takes a discount;
- new conversion from shoppers who prefer a subscription;
- retained one-time buyers who reject commitment;
- renewal contribution;
- early cancellation and refund effects.

Calling every subscription order “incremental recurring revenue” overstates the result when the same customer would have reordered at full price.

### Discount decision rule

Do not ask “What percentage do other stores use?” Ask:

1. What one-time price is actually available today?
2. What is the per-delivery contribution floor?
3. Which costs change under recurring fulfillment?
4. What completed-delivery behavior would justify the discount?
5. How much full-price repeat demand might be cannibalized?
6. Does the customer receive enough convenience/value without a discount?

Start with the smallest offer that communicates meaningful value and clears the floor, then test. “No discount” is a valid hypothesis when the value is availability, convenience, or access.

### Price-display requirements

Show at least:

- one-time amount charged now;
- subscription amount charged now;
- recurring cadence;
- exact dollar and percentage saving, if claimed;
- the price used as the comparison base;
- shipping difference, if any;
- minimum term/number of charges, if any;
- when the next charge occurs;
- what cancellation stops.

Because WooCommerce Subscriptions custom plan prices can be independent of the ordinary product price, price updates can make an old “save” label false. Add a regression check when regular, sale, or subscription-plan prices change.

## Product-page comparison and default selection

### Recommended information hierarchy

1. Product value and variant/quantity selection.
2. A short legend such as **Choose how to buy**.
3. Buy-once and subscription option cards with complete labels.
4. Frequency selector if more than one recurring cadence exists.
5. Quantity, delivery, shipping, and stock information.
6. Add-to-cart button with mode-aware label.
7. Concise cancellation/returns summary and link to full terms.
8. Cart/checkout restatement of the chosen mode.

### Example option copy

| Buy once | Subscribe |
| --- | --- |
| **Buy once — $45** | **Subscribe — $40 every 30 days** |
| One delivery | Save `$5` per scheduled delivery (`11.1%`) |
| Standard shipping policy | Next charge 30 days after checkout; shipping charged each delivery if applicable |
| No future renewal | Skip, change, or cancel future deliveries according to the displayed policy |

Do not copy the hypothetical price into the actual article as a recommendation. Use it only in the worked example.

### Accessible control structure

The [W3C WAI form grouping guidance](https://www.w3.org/WAI/tutorials/forms/grouping/) says related controls should be grouped visually and in code, and radio groups should use a `fieldset` with a concise `legend`. It also recommends self-explanatory individual labels.

Implementation checklist:

- use real radio inputs when the choices are mutually exclusive;
- wrap them in `fieldset`/`legend` or an equivalent correctly implemented group;
- associate every control and frequency selector with a label;
- make the full card clickable without removing keyboard behavior;
- show focus, selected, error, and disabled states without relying on color alone;
- announce price/cadence changes to assistive technology when the mode changes;
- do not hide subscription details in a tooltip that is difficult to reach;
- keep add-to-cart text consistent with the selected mode.

### Which option should be selected by default?

There is no evidence-backed universal default.

Recommended editorial position:

- **Neutral/no preselection** is the cleanest way to require an explicit choice when the implementation supports it without creating avoidable friction.
- **One-time as the conservative default** can make sense for broad, low-intent catalog traffic when the platform requires a preselection and recurring consequences could be missed.
- **Subscription as the default** should be reserved for contexts where the shopper's prior action clearly signals subscription intent, such as a dedicated “subscribe and save” campaign, while recurring terms remain prominent and the final action still represents express consent.

This is a risk-aware UX recommendation, not a statement that ROSCA universally prohibits a preselected subscription radio button. Legal requirements vary by jurisdiction and offer. The FTC source supports clear terms and express informed consent; it does not establish a global UI default rule.

Do not add “Most popular,” “Best value,” or subscriber counts without current, auditable data and a defined calculation.

### Cart and checkout confirmation

The cart and checkout should restate:

- selected purchase mode;
- price charged now;
- recurring price/cadence if subscribed;
- quantity;
- shipping behavior;
- trial, signup fee, or minimum charges when applicable;
- cancellation link/policy summary.

If the mode can change in cart, every dependent price, shipping, coupon, tax, and renewal line must update together. Test browser back/forward, quantity changes, variation changes, coupons, saved carts, and checkout blocks.

## Inventory and fulfillment

### Shared-stock implication in WooCommerce Subscriptions

The [WooCommerce Subscriptions stock guide](https://woocommerce.com/document/subscriptions/creating-subscription-products/stock-management/) says each renewal order contains the subscription product and reduces its stock by default. Its example starts with 100 units, reduces one at signup, then reduces one for every renewal.

The same guide warns that automatic renewals do not pause when stock reaches zero; stock can become negative. Manual or early renewals can instead be blocked by out-of-stock checks. This is a critical operating limitation for physical dual offers: one-time demand can consume stock that subscribers expect to receive, while renewals can continue creating orders after available stock is exhausted.

### Forward inventory view

For a planning horizon `H`:

```text
Gross scheduled subscription units through H
= Σ active subscriptions × scheduled quantity for each renewal in H

Expected subscription units through H
= Σ scheduled units × probability the renewal remains due and completes

Available-to-promise for discretionary one-time demand
= on-hand inventory
+ confirmed inbound inventory
− safety stock
− protected subscription commitment
```

The probability-adjusted forecast is useful for procurement, but the customer promise may require a more conservative protected quantity. Do not use the Woo upcoming-revenue forecast as an inventory promise.

### Policy decisions before launch

- Are subscriber units reserved ahead of one-time demand?
- What happens when stock is insufficient: delay, substitute, skip, refund, pause, or cancel?
- Who approves substitutions?
- Does the customer receive advance notice?
- Can the subscription cadence or quantity be changed?
- How are perishable or dated goods handled?
- Does one-time promotion inventory reduce renewal availability?
- How do backorders affect automatic and manual renewal routes?

### Two-product ArraySubs workaround and stock

A regular product and a separate subscription product will normally have separate product records. Do not assume they share stock merely because names, images, or SKUs look related. Before publishing a workaround:

1. define the authoritative inventory record;
2. implement or select a tested synchronization approach if necessary;
3. test simultaneous orders and renewal processing;
4. verify refunds/restocks and manual edits;
5. verify product feeds and warehouse integrations;
6. document the behavior when synchronization fails.

No native paired-product inventory sync was verified in current ArraySubs source for this research.

### Shipping

Distinguish purchase mode from shipping-charge cadence. ArraySubs Pro can control subscription shipping behavior, but “charge shipping once” does not turn the recurring product into a one-time purchase. For a physical subscribe-and-save offer, state whether shipping is charged at signup, every renewal, included in price, or calculated by address/order.

## Returns, refunds, and cancellation

### Three separate customer actions

1. **Return/refund a delivered order:** addresses an already purchased shipment.
2. **Cancel a renewal order:** addresses a specific order record.
3. **Cancel the subscription:** stops future recurring charges/deliveries according to the applicable term and policy.

The [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/) states that a subscription is not automatically cancelled when a renewal order is cancelled. This supports an explicit warning in the article: do not promise that refunding or cancelling one shipment automatically stops future renewals unless the implemented workflow is tested to do so.

### Policy matrix to publish internally

| Scenario | Delivered order action | Subscription action | Customer communication |
| --- | --- | --- | --- |
| Customer dislikes first shipment | Return/refund per policy | Offer cancellation separately; do not assume | State whether future renewal remains scheduled. |
| Renewal shipped damaged | Replace/refund that renewal | Usually remains active unless customer cancels | Confirm next renewal date. |
| Customer has excess stock | No return necessarily | Skip/change cadence/pause/cancel if supported | Confirm effect on next charge. |
| Stockout before renewal | Delay/refund/substitute per policy | Decide whether to pause or keep schedule | Give revised fulfillment and charge status. |
| Subscription cancelled after current term paid | Apply access/fulfillment policy for paid term | Stop future renewals according to policy | State end date and final included delivery. |

Legal, tax, refund, and cancellation obligations differ by jurisdiction and product. The article must recommend qualified review, not provide legal advice.

## Reporting and analytics

### WooCommerce Subscriptions reports

The official [Subscription Reports guide](https://woocommerce.com/document/subscriptions/store-manager-guide/reports/) separates signup and renewal revenue and provides product and customer subscription views. Its **Subscriptions by Product** report uses initial and renewal order product line totals and excludes shipping and fees from that product-level figure.

The guide also states that upcoming recurring revenue is only a basic forecast. It uses currently active subscriptions and assumes scheduled payments succeed and subscriptions are not cancelled or suspended. It should be treated as guidance, not a basis for important business decisions.

Implication: the subscription report does not by itself answer whether a dual offer beat a buy-once-only counterfactual. Use ordinary WooCommerce order/product analytics plus subscription reports and experiment attribution.

### ArraySubs analytics truth

Current ArraySubs Pro analytics can classify orders:

- **Subs Purchase** for initial subscription checkout;
- **Subs Trial**;
- **Subs Renew**;
- **Subs Upgrade**;
- **Credit Purchase**;
- **Other** for regular WooCommerce orders.

The current manual documents this at `user-manual/markdowns/analytics/woocommerce-analytics-extension.md:51-83`. It also provides a “Subscription Only” product filter using `_is_subscription` and says one-time products are excluded (`:125-159`). Renewal revenue cards are described at `:103-121`.

This can help compare separate regular and subscription product records in an ArraySubs workaround. It does not provide native same-product purchase-mode attribution because current ArraySubs does not have that mode. If two product IDs are presented as one offer, build a reporting map that joins them to the same merchandising experiment.

### Minimum event taxonomy

Use stable product and experiment identifiers on these events:

```text
dual_offer_view
purchase_mode_selected (one_time | subscription)
frequency_selected
add_to_cart
checkout_started
purchase_completed (initial)
renewal_due
renewal_completed
renewal_failed
subscription_skipped
subscription_paused
subscription_cancelled
order_refunded
item_returned
support_contact
stockout_or_backorder
shipment_dispatched
shipment_delayed
```

At minimum, include product/paired-product ID, variation, quantity, displayed prices, discount, cadence, traffic source, experiment assignment, order/subscription IDs where appropriate, and timestamp. Follow the site's privacy and consent requirements.

## Experiment and measurement plan

### Hypotheses

Primary business hypothesis:

> For eligible product-page visitors, showing an explicit buy-once/subscribe choice increases net contribution through horizon `H` without an unacceptable decline in completed purchases, fulfillment reliability, or customer outcomes.

Secondary hypotheses can test:

- whether a dual offer converts more visitors than subscription-only;
- whether neutral selection produces different outcomes from a one-time default;
- whether a smaller discount clears the same customer-value need;
- whether cadence choice reduces early skips/cancellations;
- whether subscribers generate fewer or more support contacts per completed delivery.

### Primary metric

```text
Net contribution per eligible product-page visitor through H
= (cash collected
− refunds/chargebacks
− direct product and fulfillment costs
− payment costs
− incremental support/operations costs)
÷ eligible product-page visitors
```

Declare `H` before launch. A short horizon can favor upfront cash and miss renewals; a long horizon delays decisions and introduces product/traffic changes. Report both cash collected and contribution.

### Guardrail metrics

- completed purchase rate;
- one-time selection and completion;
- subscription selection and initial completion;
- first- and second-renewal completion;
- cancellation before first renewal;
- refund/return by mode and cycle;
- payment failures;
- support contacts per purchaser or completed delivery;
- stockouts/backorders and shipment delays;
- gross margin/contribution per completed delivery;
- accessibility or checkout-error rate;
- customer complaints about unexpected recurring charges.

Do not use subscription selection rate as the sole success metric. A design can increase subscription clicks by making one-time purchase hard to see while damaging informed choice and downstream outcomes.

### Experimental design rules

The [NIST definition of experimental design](https://www.itl.nist.gov/div898/handbook/pri/section1/pri11.htm) emphasizes defining objectives, factors, and responses before the experiment. Apply that discipline:

1. randomize eligible visitors or another defensible acquisition unit;
2. keep product, traffic, price, and promotion stable unless they are explicit factors;
3. avoid changing selector layout, discount, default, and shipping at once;
4. define exclusions before reading results;
5. retain assignment across sessions where appropriate;
6. use qualified statistical review for sample size and inference.

NIST's [sample-size guidance](https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm) explains why there is no correct sample size without assumptions about error risks, variability, and the effect to detect. Do not tell readers to “run for 1,000 visitors” or any other universal number.

### Decision rules

Before launch, specify:

- minimum economically meaningful improvement;
- maximum acceptable conversion decline;
- contribution floor by mode;
- maximum early cancellation/refund/support/stockout impact;
- the horizon and follow-up window;
- what triggers pause, rollback, or further testing.

If the dual offer mostly discounts purchases that would have repeated at full price, keep buy once or reduce the discount. If the subscription improves contribution but creates stockouts or unexpected-charge complaints, fix operations/consent before scaling.

## Implementation paths and tradeoffs

| Requirement | Current documented route | Advantages | Risks/limitations |
| --- | --- | --- | --- |
| Literal one product with one-time + recurring plans | WooCommerce Subscriptions 9.0 plan model | Shared product identity; native documented checkbox; plan discounts/custom prices | Version/theme/cart/gateway compatibility still needs testing. |
| Extra plan widget/default/cart switching | Optional Buy Once or Subscribe add-on for WooCommerce Subscriptions | Configurable default and labels; cart plan changes in documented cases | Extra dependency; overlap with new plan model; limitations by product type; reverify compatibility. |
| Current ArraySubs with two choices | Separate ordinary WooCommerce product + separate ArraySubs subscription product, presented together through custom/theme/landing-page work | Uses current ArraySubs subscription engine; honest product ownership | Not the same product; stock, reviews, feeds, analytics, canonical URLs, and cart behavior need design. |
| Buy-once and subscription variations under one ArraySubs variable product | **Not supported by verified current source** | None | Product-level `_is_subscription` is synchronized to all variations. |
| ArraySubs Lifetime Deal beside recurring on same product | **Not a verified dual-mode route** | Lifetime can model one-time lifetime access as its own subscription configuration | Does not add a buy-once alternative beside recurring on the same product. |

### Honest ArraySubs positioning paragraph

Suggested fact pattern for the article, not final marketing copy:

> ArraySubs currently treats a WooCommerce product as either a subscription product or a regular product. A variable parent also applies subscription status to all its variations, so it does not currently create a buy-once/subscribe selector on one product. Stores can present a regular product beside a separate ArraySubs subscription product, but they must plan stock, cart, reporting, and gateway behavior. If one SKU with both purchase modes is mandatory, use a system that documents that model.

This is the clearest way to satisfy the content plan's instruction to identify where ArraySubs is not the best fit.

## Internal-link opportunities

### Required links

| Destination | Suggested anchor/context | Placement |
| --- | --- | --- |
| `/deals/arraysubs/` | “ArraySubs subscription platform” or “see what ArraySubs supports” | In the implementation-options section, after the limitation is clear. |
| `/deals/arraysubs/features/#products-checkout` | “subscription product and checkout features” | In a paragraph about separate subscription products and checkout controls. |
| `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/` | “configure monthly and annual subscription variations” | Where multiple recurring cadences are distinguished from one-time vs recurring mode. |
| `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/` | “prepaid or fixed-cycle recipe” | When the buyer wants a defined number of deliveries rather than indefinite renewal. |
| `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/` | “lifetime deal one-time recipe” | When the real offer is permanent access, not buy once versus recurring replenishment. |
| `/deals/arraysubs/resources/subscription-foundations/monthly-and-annual-subscription-plans-packaging-without-cannibalization/` | “monthly versus annual packaging” | Do not repeat annual discount/cadence strategy. |
| `/deals/arraysubs/resources/subscription-foundations/fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows/` | “fixed-date subscriptions” | Where a shared season/cohort end date is the actual requirement. |
| `/deals/arraysubs/resources/subscription-foundations/customer-chosen-subscription-duration-use-cases-ux-and-risk-controls/` | “customer-chosen subscription duration” | Where shoppers need to choose a term rather than choose one-time vs recurring. |
| `/deals/arraysubs/pricing/` | “View Pro Pricing” | After the core educational answer and implementation boundary, never in the opening. |

### Optional relevant links if published

- A007 on subscription signup fees when distinguishing an initial fee from a buy-once option.
- A012 on lifetime deals versus recurring subscriptions when the product is access rather than replenishment.
- ArraySubs subscription-box use case for physical recurring fulfillment, if it contains current operational detail.
- ArraySubs manual pages only where readers need verified implementation behavior; do not turn the article into duplicate setup steps.

## FAQ candidates

### 1. Can WooCommerce sell one product as both a one-time purchase and a subscription?

Yes, current WooCommerce Subscriptions documentation describes subscription plans on ordinary product types and a checkbox that lets customers buy the product without subscribing. This can place one-time and recurring choices on the same product. Theme, cart, checkout, gateway, and extension compatibility still need a current test.

### 2. Does ArraySubs support buy once or subscribe on the same product?

Not in the current source reviewed for this brief. ArraySubs uses a binary subscription flag at product level, and all variations under a variable subscription parent inherit subscription status. A store can present a separate regular product beside a separate ArraySubs subscription product, but that is a two-product workaround, not a native same-product selector.

### 3. How much should a subscribe-and-save discount be?

There is no universal percentage. Calculate the recurring price from direct product, fulfillment, payment, return/refund, and support costs plus a required contribution floor. Then test whether the discount creates incremental value rather than moving existing full-price repeat buyers to a lower price.

### 4. Should buy once or subscribe be selected by default?

There is no universal winner. Neutral selection supports an explicit choice. If a default is required for broad catalog traffic, one-time is the more conservative recurring-billing choice. Subscription emphasis can fit clearly subscription-intent traffic, but material recurring terms and cancellation must remain prominent and the customer must affirm the choice.

### 5. Does refunding or cancelling a renewal order stop the subscription?

Do not assume so. WooCommerce Subscriptions documents that cancelling a renewal order does not automatically cancel its subscription. Treat the delivered-order refund/return and the subscription's future-renewal status as separate actions, and confirm both to the customer.

## Flat visual and image plan

The user requested a large number of aesthetic visuals. Use a coherent flat editorial system: solid colors, warm off-white background, navy/slate text, restrained teal/blue/terracotta accents, thin dark outlines, no gradients, no neon, no glassmorphism, no pseudo-3D chrome. Human figures should be simple, inclusive silhouettes with natural proportions rather than cartoon mascots.

### 1. Hero: two ways to buy

- **Purpose:** Resolve the topic before reading.
- **Composition:** Center product pack; left card “Buy once”; right card “Subscribe”; one shopper hand or human silhouette choosing.
- **Labels:** One delivery versus repeating delivery; avoid using an unsupported savings percentage.
- **Format:** 16:9 flat illustration with title-safe negative space.
- **Alt concept:** “A shopper compares buy-once and recurring delivery cards for the same product.”

### 2. Decision flowchart: should we offer both?

- **Flow:** Repeated need? → predictable cadence? → margin floor? → reliable fulfillment? → explicit consent/cancellation? → measurable implementation?
- **Outcomes:** Offer both; start buy-once only; subscription only; or fix operations first.
- **Style:** Rounded rectangular nodes, solid fill, arrows, no gradient.
- **Editorial value:** Extractable decision framework for AI summaries and featured snippets.

### 3. Worked economics bar chart

- **Series:** Revenue and direct contribution as separate paired bars.
- **Categories:** Buy once (`$45/$20`); first subscription delivery (`$40/$13`); three completed subscription deliveries (`$120/$39`).
- **Footnote:** “Hypothetical arithmetic; excludes acquisition, tax, timing, failures, and later refunds.”
- **Do not:** Label `$120` as value/profit or imply three deliveries are typical.

### 4. Contribution waterfall

- **Start:** subscription price per delivery.
- **Subtract:** product + fulfillment; recurring operations/refund reserve.
- **End:** direct contribution.
- **Use:** Explain why the discount percentage alone is not the decision.

### 5. Product-page anatomy wireframe

- Product image/title on left; “Choose how to buy” `fieldset` on right.
- Two radio cards with price/cadence, then frequency, quantity, shipping, add-to-cart, cancellation summary.
- Include visible keyboard focus and selected state.
- Flat grayscale base with one accent color; not a literal screenshot unless live-tested.

### 6. Shared-stock operating model

- **Inputs:** on-hand + confirmed inbound.
- **Branches:** one-time orders, initial subscription orders, renewal orders.
- **Reservation layer:** protected subscriber inventory and safety stock.
- **Risk flag:** Woo renewals can continue at stock zero by default.
- **Human/warehouse shapes:** picker, package, calendar.

### 7. Return versus cancellation flow

- Delivered order issue → refund/replace that order.
- Separate decision → keep, skip, pause, or cancel future subscription.
- Make it visually impossible to infer that one automatically triggers the other.

### 8. Measurement funnel

- Eligible view → mode selection → add to cart → initial completion → first renewal → second renewal.
- Side exits for return/refund, cancellation, failed payment, support, and stockout.
- Label denominators at each stage; no fake percentages.

### 9. Implementation comparison diagram

- Panel A: WooCommerce Subscriptions plan model—one product record, two purchase modes.
- Panel B: ArraySubs workaround—regular product + subscription product → one comparison page.
- Add warning icons for stock sync, reporting join, and gateway checks in Panel B.

### 10. Product-fit matrix

- Axes: repeat-need strength and cadence predictability.
- Quadrants: offer both; offer flexible subscription; buy once first; operations/research needed.
- Use neutral example icons rather than named industries with implied performance.

### Visual production rules

- Use vector-native SVG for charts, flows, matrices, and wireframes so text stays sharp.
- Use a generated flat raster only for hero/editorial human scenes; charts should be deterministic SVG, not image-generated numerical graphics.
- Minimum body text size should remain readable at the rendered web width.
- Add descriptive alt text for informational images; use empty alt only for decorative duplicates.
- Include every numerical assumption in the surrounding article text, not only inside the graphic.
- No gradients, fluorescent colors, or decorative complexity that competes with labels.

## Recommended article structure

### Opening: direct answer and key-takeaways box (150-220 words)

- Give the direct answer in 40-60 words.
- Define one product/two modes versus two linked products.
- State the current ArraySubs limitation before the first CTA.
- Add 3-5 concise takeaways.

### H2: When does one-time plus subscription fit? (350-450 words)

- Recurring value and cadence.
- First-party data signals.
- Good- and poor-fit patterns.
- Decision flowchart.

### H2: How should the two prices work? (450-600 words)

- Contribution formulas.
- Discount floor.
- Worked `$45/$40` example clearly labeled hypothetical.
- Organic reorder cannibalization.
- Bar chart and waterfall.

### H2: How should the product page present the choice? (350-500 words)

- Radio-card anatomy.
- Default selection reasoning.
- FTC recurring-term context.
- W3C grouping/accessibility.
- Cart/checkout confirmation.

### H2: What changes in inventory, fulfillment, returns, and reporting? (550-700 words)

- Shared-stock renewal behavior and stock-zero limitation.
- Reservation policy.
- Return/refund versus subscription cancellation.
- Woo and ArraySubs reporting.
- Measurement funnel.

### H2: Which implementation fits WooCommerce and ArraySubs? (350-450 words)

- WooCommerce Subscriptions plan model.
- Optional add-on extras and compatibility caveat.
- Current ArraySubs binary product truth.
- Two-product workaround with explicit limitations.
- Link to relevant recipes instead of duplicating setup.

### H2: Launch checklist and measurement plan (250-350 words)

- Seven gates.
- Experiment metric and guardrails.
- Rollback conditions.
- Place **View Pro Pricing** only after the educational answer.

### FAQ (250-350 words)

Use the five questions above. Keep answers factual. Do not promise FAQ rich results.

## Claims to avoid

- “Offering both increases conversion.” No first-party controlled evidence is available.
- “Subscriptions always increase LTV.” The outcome depends on completed deliveries, discount, costs, refunds, and organic reorder behavior.
- “The industry-standard discount is X%.” No universal benchmark is justified.
- “Subscription should be preselected.” No universal default is supported.
- “ArraySubs supports buy once or subscribe on one product.” False for the current source reviewed.
- “Use a buy-once variation and a subscription variation in ArraySubs.” Current source synchronizes subscription status to all variations.
- “ArraySubs mixed checkout enables same-product purchase modes.” Mixed checkout applies to separate products/items.
- “Lifetime Deal adds the one-time option beside recurring.” It is its own non-renewing subscription configuration.
- “Refunding a renewal cancels future billing.” Woo documentation explicitly separates cancelled renewal orders from subscription cancellation.
- “WooCommerce stops renewals when stock reaches zero.” Current stock documentation says automatic renewal processing can continue and stock can go negative.
- “Woo's upcoming recurring revenue is a reliable forecast.” Official documentation calls it a basic guide with strong assumptions.
- “The Buy Once or Subscribe add-on is always required.” Current WooCommerce Subscriptions 9.0 documentation also describes native one-time plus subscription plans.

## Source register

### Official WooCommerce sources

1. [Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/)  
   Use for current subscription plan model, one-time purchase checkbox, custom/discount price behavior, supported ordinary product types, plan expiration, signup fee/trial context, and the “as of 9.0” recommendation.

2. [Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/)  
   Use for explicit same-product one-time/subscription capability and for the distinction between cancelling a renewal order and cancelling a subscription.

3. [How Subscriptions Manages Stock](https://woocommerce.com/document/subscriptions/creating-subscription-products/stock-management/)  
   Use for stock reduction on initial and renewal orders, automatic renewals continuing at stock zero, negative stock, and the manual/early renewal caveat.

4. [Subscription Reports](https://woocommerce.com/document/subscriptions/store-manager-guide/reports/)  
   Use for signup/renewal revenue definitions, Subscriptions by Product methodology, and limitations of upcoming recurring revenue forecasts.

5. [Buy Once or Subscribe product page](https://woocommerce.com/products/buy-once-or-subscribe-for-woocommerce-subscriptions/)  
   Use only for current marketplace existence, listed version/capabilities if reverified, and vendor positioning. Do not use marketing outcome claims as evidence.

6. [Buy Once or Subscribe documentation](https://woocommerce.com/document/Buy-Once-or-Subscribe-for-WooCommerce-Subscriptions/)  
   Use for documented extra capabilities, settings, default option, cart plan selection, and limitations. Reverify version and interoperability before publication.

### ArraySubs first-party web sources

7. [ArraySubs product page](https://arrayhash.com/deals/arraysubs/)  
   Use for current public positioning and feature availability. It lists simple/variable subscription products and Lifetime Deals but does not document a native same-product buy-once/subscribe control.

8. [Create and Configure Subscription Products](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html)  
   Use for the current product-level subscription checkbox, variable-product behavior, pricing, Lifetime Deal, and edge cases. Because public documentation can lag source, verify both at publication.

### ArraySubs local source/manual evidence

9. `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php:374-382, 473-509`  
   Binary product checkbox and synchronization to variations.

10. `arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php:33-52`  
    Disabled per-variation subscription control.

11. `user-manual/markdowns/subscription-products/create-and-configure.md:39-43, 47-79, 200, 262-269`  
    Product pricing model, Lifetime Deal behavior, and no mixed subscription/non-subscription variations.

12. `arraysubs/src/functions/settings-helpers.php:27-32` and `user-manual/markdowns/settings/general-settings.md:97-118`  
    Default mixed-cart and billing-cycle settings, plus gateway caveat.

13. `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`, `PayPal/PayPalGateway.php`, and `Paddle/PaddleGateway.php`  
    Current mixed-cart capability declarations.

14. `user-manual/markdowns/checkout-and-payments/automatic-payments/paypal.md:120-129`  
    PayPal mixed-cart restriction even when the general setting permits it.

15. `user-manual/markdowns/analytics/woocommerce-analytics-extension.md:25-45, 51-83, 103-159, 197-203`  
    ArraySubs Pro order-type classification, revenue cards, and subscription-only product/variation filters.

### Standards, regulator, and research-method sources

16. [FTC: Time for a ROSCA recap](https://www.ftc.gov/business-guidance/blog/2018/07/time-rosca-recap-ftc-says-risk-free-trial-was-risky-not-free)  
    Use for U.S. online negative-option requirements: material-term disclosure, express informed consent, and a simple stop mechanism. The page notes a December 2, 2025 language update. Do not extrapolate it into global legal advice.

17. [W3C WAI: Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/)  
    Use for visually and programmatically grouping radio choices with `fieldset`/`legend` and self-explanatory labels.

18. [NIST: What is experimental design?](https://www.itl.nist.gov/div898/handbook/pri/section1/pri11.htm)  
    Use for defining experimental objectives, factors, and responses in advance.

19. [NIST: Sample sizes required](https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm)  
    Use to explain why sample size depends on assumptions and cannot be a universal traffic number.

## Limitations and publication gates

### Platform/version limitations

- WooCommerce Subscriptions' plan model is time-sensitive. The source currently says “as of 9.0”; reverify current docs and installed version on publication day.
- Test simple and variable products separately. If bundles/composites are discussed, test their product-page and cart behavior rather than generalizing.
- Test classic and block-based cart/checkout if both are supported by the site.
- Test the active theme, price display, tax mode, coupons, sale prices, variation changes, quantity changes, and account requirements.
- Do not assume the optional Buy Once or Subscribe add-on is required or compatible with every new native plan behavior.

### ArraySubs limitations

- Current ArraySubs does not have a verified native same-product one-time/subscription chooser.
- A variable parent cannot mix one-time and subscription variations because `_is_subscription` is synchronized.
- Mixed cart means separate one-time and subscription products can coexist in a checkout when allowed; it does not change product type per selection.
- PayPal currently declares mixed cart unsupported; Stripe and Paddle declare it supported. Reverify all enabled gateways because restrictions can change.
- The two-product workaround has no verified native stock synchronization or combined comparison component in the reviewed source.
- Lifetime Deal and signup fee are adjacent concepts, not substitutes for the requested dual purchase mode.
- ArraySubs Pro analytics can separate order types and subscription products, but a paired-product experiment still needs a shared reporting identifier.

### Operational limitations

- WooCommerce Subscriptions renewals reduce stock and can continue at zero, so a physical-product launch needs an explicit subscription inventory policy.
- Return/refund and cancellation workflows are distinct. Test exact admin/customer actions and messages.
- Taxes, shipping, coupons, gateways, currency, saved payment methods, fraud/SCA, and renewal failures can change the economics.
- Shared-SKU implementations can simplify stock identity but increase competition between one-time demand and committed renewals.
- Separate-product implementations can duplicate reviews, feeds, URLs, and stock unless deliberately reconciled.

### Evidence limitations

- No ArraySubs or WooCommerce customer-performance dataset was available.
- No conversion, churn, repeat-purchase, or discount benchmark is supported.
- The worked example is deterministic arithmetic, not a forecast.
- No live browser test or screenshot capture was performed.
- No legal opinion was obtained. FTC guidance is U.S.-specific context; the publisher must review all selling jurisdictions and product-specific rules.
- No accessibility audit was performed. W3C guidance informs the design, but the final implementation needs keyboard, screen-reader, zoom, contrast, and error-state testing.

### Required pre-publication checklist

- [ ] Confirm author and technical reviewer names/credentials.
- [ ] Add visible publication date and **Last verified: YYYY-MM-DD**.
- [ ] Record WordPress, WooCommerce, WooCommerce Subscriptions or ArraySubs/Pro, theme, cart/checkout, PHP, and gateway versions used in testing.
- [ ] If describing Woo's one-product flow, create a real test product and capture product, cart, checkout, order, subscription, stock, refund, and cancellation states.
- [ ] If describing an ArraySubs workaround, create paired regular/subscription products and test stock, mixed cart, PayPal restriction, reporting, and customer navigation.
- [ ] Confirm every savings label against current regular/sale/subscription prices.
- [ ] Confirm the selected mode and terms remain visible at cart and checkout.
- [ ] Confirm renewal-stock behavior and stockout communication.
- [ ] Confirm return/refund does not silently leave future renewals in an unexpected state.
- [ ] Test keyboard and assistive-technology behavior of the mode selector.
- [ ] Validate experiment attribution from page view through renewal/refund.
- [ ] Check all required internal links and place CTA only after the core answer.
- [ ] Refresh quarterly or after a relevant WooCommerce, WooCommerce Subscriptions, ArraySubs, gateway, or consumer-rule change.

