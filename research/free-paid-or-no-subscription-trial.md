# Research brief: A006 — Free Trial, Paid Trial, or No Trial?

**Research date:** 2026-07-13  
**Target brief:** `content-plan/articles/006-free-trial-paid-trial-or-no-trial-a-subscription-decision-framework.md`  
**Focus keyword:** `subscription free trial vs paid trial`  
**Source policy:** Current first-party vendor documentation, regulator/card-network material, standards guidance, and the current ArraySubs repository only. No secondary conversion benchmarks are used.  
**Confidence convention:** “Verified” means visible in a current primary source or current repository on the research date. “Editorial framework” means original analysis derived from those facts; it is not a measured benchmark or vendor promise.

## Executive finding

The useful decision is not simply “free versus paid.” A store must choose across four separate dimensions:

1. **Amount due for the evaluation period:** $0, a reduced trial price, or the normal subscription price.
2. **Payment method timing:** collected at signup or added later.
3. **Access and cost exposure:** what the customer can consume, copy, ship, or ask support to deliver before durable revenue exists.
4. **Exit mechanics:** what happens at the end—automatic charge, request for payment, pause/on-hold, cancellation, refund, or ordinary renewal.

The recommendation should follow contribution economics and time-to-value, not a generic conversion-rate claim. A free trial is strongest when customers can reach a representative first value quickly and cheaply. A paid trial or reduced first period is more defensible when trial delivery has meaningful variable cost, support load, or abuse exposure. No trial is often clearest when value is immediate, irreversible, expensive to deliver, or already easy to demonstrate through a demo, sample, guarantee, or proof-of-concept.

**ArraySubs truth gate:** ArraySubs has a shipped, documented free-trial system. It does **not** expose a dedicated “paid trial” field or paid-trial lifecycle. Its Different Renewal Price feature can create a reduced first paid period, but the subscription is active and billing from day one; describe that as introductory pricing, not as a shipped paid-trial capability.

## Suggested direct answer for the writer (58 words)

Choose a free trial when customers can reach meaningful value quickly and your trial cost and abuse risk are low. Use a paid evaluation or reduced first period when delivery or support costs need commitment. Skip the trial when value is immediate or expensive to reverse. Decide card timing separately, then test retained contribution—not signup rate alone.

This is a drafting aid, not the article itself.

## Definitions the article should lock down

### Free trial

**Editorial definition:** a time-limited evaluation period in which the subscription’s recurring value is provided without charging the recurring subscription price. A free trial may be card-required or no-card.

Paddle’s current documentation separates trial design along two axes: whether payment details are required and whether the evaluation period is charged. It describes card-required free trials as collecting payment details at signup while waiting to charge until the trial ends, and cardless trials as free trials with no payment method on file. Source: [Paddle Billing trial documentation](https://developer.paddle.com/concepts/subscriptions/trials/).

Important language nuance:

- **“Free trial” does not always mean a $0 checkout.** WooCommerce and ArraySubs both document that a separate sign-up fee may still be due during a free trial; only the recurring charge is delayed.
- Write **“14-day free trial plus a $5 sign-up fee”**, not merely “free trial,” when money is due at enrollment.
- Shipping, deposits, taxes, or usage overages can also make “free” ambiguous. Disclose every amount and date plainly.

Sources: [WooCommerce Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) and [ArraySubs Create and Configure Subscription Products](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html).

### Paid trial

**Editorial definition:** a time-limited evaluation period charged at a reduced amount, followed by the standard recurring price if the subscription continues.

Paddle provides a concrete current implementation: it defines a paid trial as a reduced charge for the trial period followed by the base recurring price, with a real transaction at signup and the normal refund implications of that transaction. Source: [Paddle Billing trial documentation](https://developer.paddle.com/concepts/subscriptions/trials/).

A paid trial is not automatically the same as any low first payment:

- A platform may implement a true **trial state** with its own start/end events and trial terms.
- A store may instead sell a **discounted first billing period** while the subscription is active from checkout.
- The customer experience can look similar, but lifecycle status, entitlement rules, invoices, refunds, cancellation, analytics, and gateway events can differ.

The article should use “paid trial” for the market model and “introductory first period” for ArraySubs’ current implementation.

### No trial

**Editorial definition:** the normal subscription charge begins at signup or the normal contractual start date, without a separate evaluation period.

No trial does not mean “no risk reversal.” A store can use a product tour, live demo, free sample, limited sandbox, consultation, cancel-anytime first month, or clearly scoped refund guarantee. Those mechanisms should not be relabeled as a free trial if the customer pays the normal price first.

### Sign-up fee

A sign-up fee is a separate one-time checkout amount, not a paid trial. Woo says it is added to the first purchase and remains due even when the recurring plan has a free trial. ArraySubs likewise documents its sign-up fee as independent of the trial and never applied to renewal orders. Sources: [WooCommerce Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) and [ArraySubs product setup documentation](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html).

### Introductory pricing

Introductory pricing charges a stated amount for one or more initial billing cycles and then changes to a different renewal price. It may be marketed as an introductory offer, but it is not necessarily a trial lifecycle.

ArraySubs’ current public setup guide documents Different Renewal Price for introductory, promotional, or graduated pricing. Its example is $19.99/month for three months and then $29.99/month. The current repository also contains a `$1 first period, then full price` recipe that explicitly says it is “a real payment, not a trial.” Source: [ArraySubs product setup documentation](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html) and repository file `web-content/app/deals/arraysubs/use-cases/_recipes.ts`.

## The four-axis framework

This is the article’s strongest original extractable asset.

| Axis | Questions to answer | Why it matters |
|---|---|---|
| Evaluation price | $0, reduced amount, or normal price? | Controls immediate commitment, cash, refund exposure, and how “free” can be advertised |
| Payment method timing | Required now or collected later? | Changes checkout steps, future automatic collection readiness, trust, and abuse surface |
| Value/cost exposure | What can be consumed, shipped, copied, or supported before durable revenue? | Determines the economic downside of non-converting or fraudulent trials |
| End behavior | Auto-charge, payment request, pause/on-hold, cancel, downgrade, or refund window? | Determines the actual customer journey and operational failure modes |

Do not collapse these choices. “Free trial” does not answer whether a card is required. “No card” does not answer whether the customer needs an account. “Paid trial” does not answer whether the platform records a trial state or an active discounted subscription.

## Free, paid, and no-trial comparison

| Model | Amount at evaluation start | Payment method | Main advantage | Main exposure | Best first metric |
|---|---:|---|---|---|---|
| Card-required free trial | $0 recurring amount | Collected at signup | Automatic billing can be ready when the trial ends | More checkout friction; consent, reminder, and unexpected-charge complaints must be controlled | Net contribution per eligible visitor at a fixed post-trial horizon |
| No-card free trial | $0 recurring amount | Added later | Lowest payment-form barrier | Spam, fake accounts, service consumption, and a second conversion event to collect payment | Activated trials and first successful paid invoice per eligible visitor, with abuse cost |
| Paid trial / paid evaluation | Reduced real charge | Collected at signup | Offsets some trial cost and verifies a working payment path | Refunds, disputes, and price-step disclosure | Net contribution after refunds, fees, support, and first standard-price renewal |
| No trial | Normal charge | Collected at signup | Immediate revenue and simplest billing state | Fewer people may evaluate; refund/support risk shifts after purchase | Net retained contribution per eligible visitor/customer |

The “advantage” and “exposure” columns are strategic hypotheses. They are not universal conversion outcomes.

## Card-required versus no-card free trial

### What card-required really means

In a card-required free trial, the store collects a payment method without collecting the normal recurring amount. Depending on the gateway, this can involve a setup/mandate flow rather than a monetary charge. Stripe documents SetupIntents for deferred-payment subscriptions: they can collect and authenticate payment information without charging it, which prepares for a future off-session payment. Source: [Stripe deferred-payment subscriptions](https://docs.stripe.com/billing/subscriptions/deferred-payment).

Operational implications:

- The customer completes payment authentication at signup.
- The future charge path may be ready, but the store must still handle expired cards, mandate/SCA requirements, and failed payments.
- The enrollment page and confirmation must state the trial end, post-trial amount, frequency, and cancellation path.
- A stored payment method is not proof that the customer activated or received value.

### What no-card really means

In a no-card trial, the trial can start without a payment method. Stripe says this can make signup easier but can also allow spammers to create fake customers, usage, and subscriptions. Stripe recommends controls such as requiring an account and CAPTCHA; it also supports end behaviors such as cancel, pause, or create an invoice when a payment method is missing. Source: [Stripe trial-period documentation](https://docs.stripe.com/billing/subscriptions/trials?locale=en-GB).

Operational implications:

- Payment collection becomes a second funnel after activation.
- A customer account, email verification, CAPTCHA, rate limit, device/IP controls, usage cap, or manual qualification may still be appropriate.
- The product must surface a clear, accessible payment-method workflow before access changes.
- The end state must be explicit: pause, on-hold, cancel, downgrade, or manual invoice—not “something happens automatically.”

### Card decision checklist

Prefer testing **card-required** first when most of these are true:

- Trial delivery has meaningful variable cost or scarce capacity.
- Fraud or automated consumption can cause real loss.
- The customer already understands the product before checkout.
- Trial activation requires onboarding or human support.
- Automatic off-session collection is essential to the model.
- The brand can explain future billing and cancellation with very high clarity.

Prefer testing **no-card** first when most of these are true:

- Marginal trial cost is low.
- Value can be experienced before payment information is relevant.
- The audience has high trust/privacy sensitivity around cards.
- Product-led activation is self-service and measurable.
- Abuse can be limited with entitlements, quotas, accounts, and rate controls.
- The payment-collection step can be surfaced reliably before trial end.

Neither list proves the winner. It selects the safer starting hypothesis.

## Unit economics framework

### Use contribution, not raw conversion

A fair comparison uses the same eligibility denominator and a horizon long enough to include the trial, first standard-price payment, refunds, and at least one meaningful retention checkpoint.

**Primary formula:**

```text
Net contribution at horizon H
= collected subscription and trial revenue through H
− product/service COGS through H
− payment processing fees
− refunds and chargeback losses
− trial provisioning/fulfilment cost
− trial onboarding and support cost
− fraud and abuse loss
```

```text
Net contribution per eligible visitor
= net contribution at horizon H ÷ eligible visitors assigned to the model
```

Why eligible visitor is the better denominator:

- A card-required trial may create fewer starts but a different mix of starters.
- A no-card trial may create many starts but also more unactivated or abusive accounts.
- Comparing only `paid customers ÷ trial starts` rewards a model for filtering people before the denominator begins.
- Comparing only signup rate ignores payment success, refunds, support, and retained margin.

### Cost inventory

Track these separately rather than hiding them inside CAC:

| Cost or loss | Examples | Measurement unit |
|---|---|---|
| Product COGS | API calls, compute, storage, licensed seats, downloads, consumables | Cost per trial and per activated trial |
| Fulfilment | Pick/pack, postage, sample inventory, returns | Cost per shipped evaluation |
| Human onboarding | Demo, setup call, data migration, training | Staff minutes × loaded hourly cost |
| Support | Tickets, chat, refund handling, cancellation questions | Tickets/minutes and loaded cost |
| Fraud/abuse | Bot accounts, duplicate trials, credential sharing, copied assets | Direct loss + service cost + review time |
| Payment | Authorization, transaction fee, cross-border cost, failed-payment attempts | Actual gateway fees |
| Refund/dispute | Refunded revenue, non-refundable fees, chargeback fees, goods not recovered | Actual loss per cohort |
| Opportunity cost | Capacity consumed by low-intent trials | Qualified capacity displaced; state assumptions |

### Break-even decision aid

```text
Incremental retained payers required
= incremental cost of the trial model
÷ expected contribution per retained payer at horizon H
```

Use actual store cohort data for every input. Do not publish a universal break-even conversion percentage.

### Worked cash-timing example for a chart

This example is deterministic and not a performance benchmark. Assume a stated $30/month normal plan and a 30-day evaluation comparison:

| Model | Enrollment amount | Next stated amount | Lifecycle label |
|---|---:|---:|---|
| Free trial | $0 | $30 | Trial, then paid plan |
| Paid evaluation | $5 | $30 | Platform-dependent trial or introductory period |
| No trial | $30 | $30 renewal | Active paid plan from signup |

Caption: “Illustrative price timing only. Excludes tax, fees, refunds, support, fulfilment, payment failure, and retention. It does not show which model converts better.”

Use this for a clean grouped bar chart, with the exact amounts visible as text outside the bars.

## Product, fraud, and support tradeoffs

### Digital software and self-service tools

Free trials are plausible when activation is quick, variable usage is bounded, and the product can revoke access cleanly. Cardless trials should have usage caps, account verification, and automation-abuse controls. Card-required trials are more defensible when compute/API value is costly or easily harvested.

### Membership and content libraries

The main question is reversibility. If customers can download or copy most of the library during a short trial, a free unrestricted trial gives away irreversible value. Use limited sample content, staged access, streaming controls, a paid first period, or no trial. If value comes from an ongoing community or fresh monthly content, a trial can be more representative and less extractable.

### Services, coaching, and onboarding-heavy B2B

Human time is the variable cost. A free trial with calls, migrations, custom setup, or consulting can fill capacity without durable revenue. A paid evaluation, paid discovery phase, refundable deposit, or no-trial proof-of-concept may align commitment better. Keep the scope and refund terms explicit.

### Physical subscription boxes and consumables

Physical goods create COGS, shipping, tax, returns, and fraud exposure before renewal. A free box is not economically analogous to temporary software access. Consider a paid sample box, discounted first shipment, or no trial. If a free trial is used, define whether any sign-up/shipping fee is charged and do not advertise the checkout as $0 when it is not.

Woo documents that a free trial normally means no initial shipping amount for the trial period when nothing else is purchased, and suggests a sign-up fee when upfront shipping must be recovered. Source: [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/).

### High-value downloads, reports, and one-time outcomes

When the value is fully delivered once—a downloadable dataset, custom report, audit, certificate, or generated asset—a time-based trial may be structurally wrong. Use a preview, redacted sample, limited export, watermarked output, milestone payment, or no trial.

## Recommendation matrix by product and risk

| Product/risk profile | Recommended starting hypothesis | Card stance | Why | Guardrail |
|---|---|---|---|---|
| Low-cost self-serve SaaS with fast activation | Free trial | Test cardless first if abuse is bounded | Customer can reach value before purchase | Account verification, usage quota, activation event |
| Compute/API/AI product with meaningful unit cost | Free trial with limits or paid first period | Card-required is safer starting point | Consumption and bot abuse can create direct loss | Credit cap, rate limit, duplicate detection |
| Community or ongoing content membership | Free trial if value is ongoing and non-extractable | Either; test separately | Trial can show participation and cadence | Limit downloads/archive access; clear end reminder |
| Download library or high-value static content | Paid first period or no trial | Required | Value can be copied irreversibly | Preview/sample, staged access, download limits |
| Coaching, consulting, migration, managed service | Paid evaluation or no trial | Required | Human capacity is the trial COGS | Fixed scope, qualification, scheduling, refund terms |
| Physical subscription box | Discounted paid first shipment or no trial | Required | Product, shipping, and return costs occur immediately | Address verification, quantity limits, explicit shipping |
| High-ticket B2B with long evaluation | Paid pilot or scoped proof-of-concept | Contract/payment method per sales process | Evaluation needs success criteria and support | Written acceptance criteria and decision date |
| Familiar commodity/replenishment subscription | No trial or discounted first order | Required | Product value is already understood | Cancel/refund policy and delivery expectations |
| New product with unknown activation path | Short instrumented test, not a default forever policy | Choose based on loss ceiling | Need evidence before scaling exposure | Small eligible cohort, cap total cost, predefine stop rules |

This matrix is editorial strategy, not a claim that one model universally converts better.

## Trial-length experiment design

### Do not publish a “best” number

No defensible universal 7-, 14-, or 30-day winner was found in the primary sources reviewed. Trial length should cover the realistic path to first representative value, including natural product cadence. A weekly reporting product may need a full reporting cycle; a setup tool that produces value in ten minutes may not need a month.

### Pre-register the test

Before sending traffic, record:

1. **Question:** for example, “Does requiring payment details improve retained contribution per eligible visitor without unacceptable complaints?”
2. **Eligibility:** which products, geographies, devices, acquisition sources, new/returning customers, and account types can enter.
3. **Variants:** change one decision at a time where practical—price, card requirement, or length.
4. **Primary metric:** net contribution per eligible visitor at a fixed horizon.
5. **Guardrails:** refunds, chargebacks, failed payments, support minutes, complaint rate, abuse loss, resource use, and cancellation/access incidents.
6. **Activation event:** the observable behavior that represents first value; define it before the test.
7. **Sample-size plan:** minimum detectable effect, baseline variance/rate, significance and power assumptions, plus expected eligibility volume.
8. **End date and analysis window:** long enough to include the full trial, first standard-price payment, relevant refund window, and a retention checkpoint.
9. **Stop rules:** only safety, fraud, legal, or severe-customer-harm conditions—not “the chart looks good today.”
10. **Segment plan:** predefine material segments; do not mine dozens of subgroups after the result.

NIST describes experimental design as planning objectives, factors, and responses in advance, and its completely randomized design guidance assigns factor levels randomly. NIST also notes that sample size has no single correct answer without assumptions such as error rates, effect size, and variance. Sources: [NIST experimental design](https://itl.nist.gov/div898/handbook/pri/section1/pri11.htm), [NIST completely randomized designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm), and [NIST sample-size guidance](https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm).

### Recommended event funnel

```text
Eligible visitor
→ checkout or enrollment started
→ trial/paid plan started
→ first-value activation reached
→ payment method present (when applicable)
→ first standard-price invoice attempted
→ first standard-price invoice succeeded
→ refund/dispute window passed
→ retained and contributing at horizon H
```

Keep the eligibility denominator attached to every variant. Add money and support cost to the event data rather than treating the funnel as percentages only.

### Practical sequencing

1. Validate instrumentation with an A/A or internal test.
2. Compare free versus no trial **or** card-required versus no-card—not all dimensions simultaneously unless traffic supports a factorial design and qualified statistical review.
3. Run concurrent randomized variants where possible to reduce seasonality and campaign-mix bias.
4. Do not stop at trial-to-paid. Wait for the predeclared contribution horizon.
5. Repeat after material price, acquisition-source, product, or onboarding changes.

If traffic is too low for a credible randomized result, use qualitative activation research plus a capped pilot. Describe the result as directional, not as a benchmark.

## Current ArraySubs truth

### Verified shipped behavior

- The public ArraySubs page lists **Free Trials** in both Free and Pro and says trials occur before billing starts, with payment details collected when needed.
- Product configuration includes Trial Length and Trial Period (day, week, month, or year).
- During a trial, the recurring line-item amount is $0 at checkout; a configured sign-up fee remains due.
- Current general settings expose **Require Payment Method for Trials** and **One Trial Per Customer**, both defaulting to on in the current repository.
- When payment method requirement is off and the cart is a free-trial-only subscription cart with no sign-up fee, current checkout code skips the payment gateway entirely.
- When the requirement is on, current checkout code forces a payment-needed path so a compatible gateway can collect a card/mandate even though the monetary total is $0.
- A sign-up fee always forces payment regardless of the trial payment-method setting.
- Current logged-in-customer validation can block repeat trials when a past subscription carries trial history. Guest history cannot be checked before account creation.
- Automatic Stripe, PayPal, and Paddle billing is Pro; the free core uses manual renewal invoices across WooCommerce gateways.

Public sources: [ArraySubs product page](https://arrayhash.com/deals/arraysubs/) and [ArraySubs product setup documentation](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html).

Repository verification points:

- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/TrialCheckoutTrait.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php`
- `arraysubs/src/functions/settings-helpers.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CartValidationTrait.php`
- `user-manual/markdowns/settings/general-settings.md`
- `user-manual/markdowns/checkout-and-payments/subscription-checkout.md`

### Paid trial is not a shipped ArraySubs trial type

The product editor has free-trial length/period fields, but no paid-trial price field. Repository search shows free-trial naming throughout the trial lifecycle. Therefore:

- Do not say “ArraySubs supports paid trials.”
- Do say “Paid trials are a market model; ArraySubs currently supports free trials and introductory pricing.”
- If describing a $1 first period, state that the subscription is active and paid immediately, with the price changing on a later billing cycle.

The Different Renewal Price feature is a legitimate adjacent option. It can implement $1 for the first billing period and $49 later, but it is not a trial state and should not be counted in “trial conversion” analytics as though it were one.

### Important timing inconsistency to resolve before publication

Current ArraySubs sources do not tell one fully consistent story about the exact first post-trial charge:

- Public product setup documentation says normal billing begins when the trial ends.
- Checkout/manual copy and customer email text suggest the payment method is charged when the trial ends.
- Current `TrialConverter.php` changes the subscription from Trial to Active at the trial boundary, then calculates `_next_payment_date` as one full billing interval from the conversion time.

That code path implies the trial ends, the subscription becomes active, and the next renewal is scheduled one billing cycle later—not an immediate standard-price charge at the trial boundary. This must be verified with a current end-to-end Stripe, manual-payment, and ideally PayPal/Paddle test before the article makes an exact ArraySubs timing claim. Until then, write only that the trial controls when the paid billing lifecycle begins and advise testing the chosen gateway.

This is a research limitation, not an authorization to change product code or documentation.

## WooCommerce platform truth useful for comparison

WooCommerce Subscriptions documents these behaviors:

- A free trial delays the recurring charge.
- A sign-up fee remains due at checkout during the trial.
- If the store permits a $0 initial checkout without a payment method and there is no sign-up fee, the subscription moves On Hold at trial end while awaiting the first renewal payment.
- A free trial adds to the calendar length of a limited subscription rather than consuming a paid cycle.

Sources: [WooCommerce Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/) and [WooCommerce Subscriptions General Settings](https://woocommerce.com/document/subscriptions/store-manager-guide/).

Do not transfer Woo’s end-state behavior to ArraySubs by assumption. They are separate products and require separate tests.

## Disclosure, consent, reminder, and cancellation boundaries

This section is general information, not legal advice. Requirements vary by jurisdiction, payment method, card network, product, and agreement. The final article should advise stores to confirm requirements with qualified counsel, their gateway, and their acquirer.

### United States baseline

The FTC’s current ROSCA business guidance says online negative-option sellers must clearly disclose material terms before obtaining billing information, obtain express informed consent before charging, and provide a simple way to stop recurring charges. Source: [FTC ROSCA recap, updated December 2, 2025](https://www.ftc.gov/business-guidance/blog/2018/07/time-rosca-recap-ftc-says-risk-free-trial-was-risky-not-free).

Do not cite the FTC’s 2024 “click-to-cancel” announcement as though that entire amendment is the settled current nationwide rule. The FTC’s current Negative Option Rule page lists a February 2026 conformity action and a March 2026 advance notice/request for comment. Use the current ROSCA baseline above and get qualified review for current federal and state obligations. Source: [FTC Negative Option Rule docket page](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule).

### Card-network requirements

Visa’s published subscription-trial policy says merchants offering free trials or introductory promotions that roll into recurring billing must provide enrollment terms, the start date, goods/services, ongoing amount and frequency/date, and an online cancellation mechanism. It also describes an electronic reminder at least seven days before the recurring transaction when a trial or introductory period is about to expire, with special initial-confirmation handling for trials shorter than seven days. Source: [Visa trial subscription policy](https://usa.visa.com/dam/VCOM/global/support-legal/documents/subscription-policy-vbn-visa-public.pdf).

Treat this as Visa-specific network material dated 2020, not a universal legal summary. Confirm the current rules and implementation with the merchant’s acquirer/gateway before launch.

### Minimum copy checklist

At enrollment, visibly state:

- What is free or discounted and what is not.
- Every amount due today, including sign-up fee, shipping, tax, or deposit.
- Trial/evaluation start and end dates or how they are calculated.
- The exact post-trial amount and billing frequency.
- Whether a payment method is collected now.
- What happens if no payment method is present at the end.
- How and when to cancel, with a working online path where required.
- Refund, return, and access-revocation terms.
- When reminder/confirmation messages are sent.

## Visual and image opportunities

All visuals should use the ArraySubs editorial system: flat vector shapes, solid fills, restrained purple/lavender/cream/charcoal with muted green and amber, no gradients, no neon, no glossy 3D, and no unsupported percentages. Render critical labels as SVG/HTML text and include descriptive alt text.

### 1. Hero: three evaluation paths

Flat editorial scene with a store owner and customer facing three clear doors/cards:

- **Free:** $0 evaluation ticket, clock, optional card icon.
- **Paid evaluation:** small coin, clock, price-step arrow.
- **No trial:** standard-price receipt, immediate access key.

Use simple human silhouettes and generous negative space. The emotional tone should be considered decision-making, not “growth hack.”

### 2. Two-axis model map

Accessible SVG/HTML matrix:

```text
                          Payment method now       Payment method later
$0 evaluation            Card-required free       No-card free trial
Reduced evaluation       Paid trial/intro offer   Usually not viable for auto-renew
Normal price             No trial                 Manual invoice/credit terms
```

Add a note below: “Amount and payment-method timing are separate decisions.”

### 3. Decision flowchart

Flat flow logic:

1. Can the customer reach representative value before paying?
   - No → no trial; use demo/sample/guarantee.
2. Is the trial value reversible and cheap to provide?
   - No → paid evaluation or restricted sample.
3. Is abuse/consumption risk material?
   - Yes → card-required plus limits, or paid evaluation.
4. Is payment trust/friction the main barrier and abuse bounded?
   - Yes → test no-card free trial.
5. Can the store measure activation and retained contribution?
   - No → instrument first, then test.

End nodes: No trial, Paid evaluation, Card-required free, No-card free.

### 4. Grouped bar chart: price timing

Use the deterministic $30/$5 worked example above. Two grouped bars per model:

- Enrollment: Free $0, Paid evaluation $5, No trial $30.
- Next stated amount: $30, $30, $30.

Caption must say illustrative, not a conversion or profitability comparison.

### 5. Unit-economics balance illustration

A flat scale with “Revenue through horizon H” on one side and COGS, support, fraud, fees, refunds on the other. Add the net-contribution formula below as real text. This is more honest than a pie chart with invented proportions.

### 6. Funnel without benchmark percentages

Use seven solid stages: eligible → start → activate → payment ready → first standard-price success → refund window passed → retained contribution. Show count and dollar placeholders such as `{cohort count}` rather than fabricated values. The production team can populate it from an actual first-party cohort later.

### 7. Trial experiment timeline

Horizontal flow:

```text
Instrument → Randomize → Full trial → First standard payment → Refund window → Retention horizon → Decide
```

Add “Do not stop at signup rate” beneath the first half.

### 8. Product-risk recommendation cards

Four flat illustrated cards with small human/product shapes:

- Self-serve software → bounded free trial.
- High-cost API → card + quota.
- Coaching/service → paid pilot.
- Physical box → paid first shipment/no trial.

Use the HTML matrix for the actual recommendation detail.

### 9. Enrollment disclosure anatomy

Annotated checkout card showing due today, trial end, next amount/date, renewal frequency, cancellation link, and reminder. Use it as a compliance-aware UX illustration, not legal certification.

### 10. ArraySubs capability boundary graphic

Three solid columns:

- **Shipped free trial:** trial length/period, card required toggle, one trial per customer.
- **Shipped intro pricing:** active from day one, different renewal price after N cycles.
- **Not a dedicated capability:** paid-trial status/price/lifecycle.

This visual is important because it prevents product overclaiming.

## Limitations section the article should publish

- No universal conversion benchmark or “best trial length” is used. Primary sources reviewed did not supply a transparent cross-product dataset that could support one.
- Vendor descriptions of “higher intent,” “lower friction,” or “better conversion” are hypotheses unless supported by the store’s own randomized cohorts.
- Card-required and no-card outcomes vary with product maturity, acquisition source, trust, price, geography, payment methods, onboarding, and abuse controls.
- A sign-up fee can coexist with a free recurring trial; the checkout is not fully free and must be described precisely.
- Paid trial, discounted first period, sign-up fee, refundable deposit, and money-back guarantee are different commercial and lifecycle structures.
- Payment gateway support varies. A $0 checkout does not prove that a payment mandate was stored successfully.
- No-card end behavior varies by platform and configuration: cancel, pause, on-hold, invoice, downgrade, or manual collection.
- Physical trials include shipping, returns, inventory, tax, and fraud costs that digital-product comparisons often omit.
- Trial access to downloadable or copyable assets may be irreversible.
- US law, state law, other jurisdictions, card-network rules, and gateway/acquirer requirements change. Get qualified review; do not call a flow “compliant” solely because a gateway renders it.
- Current FTC negative-option rulemaking status changed in 2026; do not rely on older click-to-cancel summaries.
- ArraySubs free trials are documented and shipped. A dedicated paid-trial type is not.
- ArraySubs introductory pricing is active billing, not trial status.
- Current ArraySubs code and copy conflict on exact first post-trial charge timing. Publish only a tested statement or keep the claim general.
- The current one-trial-per-customer repository check relies on logged-in purchase history; guest abuse needs additional controls.
- Automatic renewals through ArraySubs Stripe, PayPal, and Paddle integrations require Pro; free core renewals are manual-payment flows.

## Five FAQ candidates

### 1. Is a paid trial the same as a subscription sign-up fee?

No. A paid trial charges a reduced amount for a time-limited evaluation and then moves to the standard price. A sign-up fee is a separate one-time amount due at enrollment. A free recurring trial can still have a sign-up fee, so disclose the checkout amount explicitly.

### 2. Should a free trial require a credit card?

There is no universal winner. Requiring payment details can prepare automatic billing and filter some abuse, but it adds a payment step before value. No-card trials remove that step but require a second payment-conversion flow and stronger account, usage, and fraud controls. Test retained contribution per eligible visitor.

### 3. What is the best subscription trial length?

Use the shortest period that still lets a typical customer reach representative first value under normal product cadence. Then test a predefined alternative through the first standard-price payment and retention horizon. Do not choose 7, 14, or 30 days from an unsourced industry average.

### 4. Does ArraySubs support paid trials?

ArraySubs currently documents and ships free trials, not a dedicated paid-trial state or trial-price field. It does support introductory pricing through Different Renewal Price, such as a low first paid period followed by a standard renewal price. That subscription is active and paid from day one, so call it introductory pricing.

### 5. What happens when a no-card free trial ends?

It depends on the subscription engine and configuration. Stripe supports cancel, pause, or invoice behaviors when payment is missing; WooCommerce Subscriptions documents On Hold while awaiting payment in its $0 checkout flow. ArraySubs can skip payment collection at signup, but its exact post-trial billing timing should be tested with the selected gateway before promising a customer outcome.

## Claims the writer should not make

- “No-card trials convert more visitors.”
- “Card-required trials always produce higher-quality customers.”
- “Paid trials have the highest conversion rate.”
- “A $1 trial dramatically improves conversion.”
- “Seven/14/30 days is the best trial length.”
- “Free trials reduce churn.”
- “Collecting a card guarantees the first renewal.”
- “ArraySubs supports paid trials.”
- “ArraySubs charges the standard price immediately at trial end” until the current code/docs mismatch is tested.
- “This checkout is legally compliant” without jurisdictional and acquirer review.

The current ArraySubs recipe data contains unsourced marketing phrases such as “highest-conversion” for no-card trials, “dramatically improves trial quality and conversion” for sign-up fees, and “higher conversion than a free trial” for a $1 first period. Do not repeat those statements in A006 without a transparent first-party experiment. A195 owns benchmark intent and should only publish metrics backed by a current, inspectable dataset.

## SERP and intent snapshot

Queries rerun on 2026-07-13:

- `free trial vs paid trial subscription card required no card`
- `subscription free trial vs paid trial`
- `best subscription trial length card required no card`
- `WooCommerce subscription free trial payment method`

Observed result pattern:

- WooCommerce dominates the Woo-specific behavior query with free-trial, sign-up-fee, and $0 checkout documentation.
- Paddle’s primary documentation provides unusually clear free/paid/cardless definitions.
- Stripe’s primary documentation is strongest for no-card lifecycle and abuse warnings.
- The broader result set contains SaaS blogs, forum anecdotes, vendor claims, and unsupported conversion percentages.
- Search intent is best served by a decision framework and unit-economics worksheet, not by repeating a percentage roundup.

No Search Console export, analytics cohort, paid keyword database, or ArraySubs trial experiment dataset was available in the workspace context. Search volume, ranking difficulty, and first-party conversion behavior remain unverified.

## Suggested article structure based on the evidence

1. Direct 40–60 word answer.
2. Key takeaways: separate evaluation price, payment method, cost exposure, and end behavior.
3. Define free trial, paid trial, introductory pricing, sign-up fee, and no trial.
4. Four-axis comparison table.
5. Card-required versus no-card decision.
6. Unit economics formula and cost inventory.
7. Recommendation matrix by product/risk.
8. Trial-length experiment plan and funnel.
9. Disclosure/reminder/cancellation checklist with legal caveat.
10. ArraySubs capability boundary and current limitations.
11. Five concise FAQs.
12. CTA after the answer is complete: **View Pro Pricing**.

Suggested word budget for a 2,600-word article:

| Section | Approximate words |
|---|---:|
| Direct answer + takeaways | 170 |
| Definitions | 400 |
| Card-required vs no-card | 400 |
| Economics + product tradeoffs | 550 |
| Recommendation matrix | 250 |
| Experiment design | 450 |
| Compliance/limitations/ArraySubs boundary | 250 |
| FAQs + conclusion | 130 |

## Internal links required by the brief

- Commercial pillar: `/deals/arraysubs/`
- Products and checkout feature hub: `/deals/arraysubs/features/#products-checkout`
- Monthly versus annual variable recipe: `/deals/arraysubs/use-cases/recipes/monthly-vs-annual-variable/`
- Prepaid fixed cycles recipe: `/deals/arraysubs/use-cases/recipes/prepaid-fixed-cycles/`
- Lifetime deal recipe: `/deals/arraysubs/use-cases/recipes/lifetime-deal-one-time/`
- Relevant existing narrow recipes if available in navigation:
  - no-card trial then monthly
  - card-required trial
  - free trial plus sign-up fee
  - `$1 first period, then full price`
- A005 — Recurring vs Fixed-Term Subscriptions
- A007 — Subscription Sign-Up Fees
- A008 — Monthly and Annual Subscription Plans
- A091 — Trial Conversion Rate Measurement and Optimization
- A105 — Card-Required vs No-Card Trial Checkout
- A195 — Subscription Trial Benchmarks

Keep A006 strategic. Link to the narrow recipes and A105 rather than reproducing product setup steps. Link to A091 for deep measurement. Do not steal benchmark intent from A195.

## Author, review, and verification block

The final article should visibly include:

- Named author with subscription/WooCommerce strategy experience.
- Named technical reviewer familiar with ArraySubs checkout, recurring billing, and gateway behavior.
- Published date and **Last verified: 2026-07-13** or the actual final test date.
- Test environment:
  - ArraySubs repository/current build identifier.
  - WooCommerce, WordPress, PHP versions.
  - Gateway and sandbox mode for each trial checkout tested.
  - Card-required and no-card product settings.
- Limitations: no cross-market benchmark dataset; legal information is general; exact gateway behavior was tested only in listed environments.

## Source register and claim use

### Trial model and payment-platform primary sources

1. [Paddle Billing — Trials](https://developer.paddle.com/concepts/subscriptions/trials/)  
   Use for the clean two-axis definition, paid-trial mechanics, card-required versus cardless terminology, and the fact that a paid trial is a real charge. Do not use Paddle’s unquantified conversion language as evidence.
2. [Stripe Billing — Use trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials?locale=en-GB)  
   Use for no-card trial availability, fake/spam account risk, account/CAPTCHA mitigation, reminder events, and configurable missing-payment-method outcomes.
3. [Stripe Billing — Handle subscriptions with deferred payment](https://docs.stripe.com/billing/subscriptions/deferred-payment)  
   Use for SetupIntent/payment-method collection and authentication without an immediate charge.

### WooCommerce primary sources

4. [WooCommerce — Creating a Subscription Product](https://woocommerce.com/document/subscriptions/creating-subscription-products/)  
   Use for free trial behavior, sign-up-fee interaction, trial addition to limited subscription length, and On Hold behavior after $0 no-payment-method checkout.
5. [WooCommerce Subscriptions — General Settings](https://woocommerce.com/document/subscriptions/store-manager-guide/)  
   Use for the `$0 Initial Checkout` payment-method option and the need to add a method before continuation.
6. [WooCommerce Subscriptions FAQ](https://woocommerce.com/document/subscriptions/faq/)  
   Use for physical-product shipping/trial implications and gateway-specific caveats where directly relevant.

### Consumer-protection and card-network primary sources

7. [FTC — ROSCA recap, updated December 2, 2025](https://www.ftc.gov/business-guidance/blog/2018/07/time-rosca-recap-ftc-says-risk-free-trial-was-risky-not-free)  
   Use for the US online negative-option baseline: material disclosure, express informed consent, and simple recurring-charge cancellation.
8. [FTC — Negative Option Rule](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule)  
   Use to verify the current 2026 rulemaking/docket status and avoid stale click-to-cancel claims.
9. [Visa — Subscription trial/introductory promotion policy](https://usa.visa.com/dam/VCOM/global/support-legal/documents/subscription-policy-vbn-visa-public.pdf)  
   Use for Visa-specific enrollment disclosures, reminders, cancellation, and statement descriptor expectations. Label the document’s date and confirm current application with the acquirer.

### Experiment-design primary sources

10. [NIST — What is experimental design?](https://itl.nist.gov/div898/handbook/pri/section1/pri11.htm)  
    Use for planning objectives, factors, and response variables before the experiment.
11. [NIST — Completely randomized designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm)  
    Use for random assignment and balanced replication principles.
12. [NIST — Sample sizes required](https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm)  
    Use to explain why sample size requires explicit statistical assumptions rather than a universal number.

### ArraySubs primary sources and repository observations

13. [ArraySubs product page](https://arrayhash.com/deals/arraysubs/)  
    Use for shipped Free Trials, free/pro scope, automatic gateway scope, manual renewals, Different Renewal Price positioning, and the CTA destination.
14. [ArraySubs — Create and Configure Subscription Products](https://support.arrayhash.com/arraysubs/subscription-products/create-and-configure.html)  
    Use for trial fields, sign-up-fee independence, Different Renewal Price, and product configuration boundaries.
15. Current repository files listed in “Current ArraySubs truth.”  
    Label claims from these as first-party repository observations verified 2026-07-13. They require a live test before being presented as cross-gateway guarantees.

## Final research QA checklist

- [x] Free, paid, and no-trial definitions separated.
- [x] Card-required and no-card treated as a separate axis.
- [x] Sign-up fee and introductory pricing distinguished from paid trial.
- [x] Unit economics includes COGS, support, fraud, payment, refund, and fulfilment.
- [x] No invented conversion benchmark or “best length” claim.
- [x] Experiment design uses eligible-visitor denominator and a fixed post-trial contribution horizon.
- [x] Current ArraySubs free-trial code/docs inspected.
- [x] Dedicated paid-trial capability explicitly not claimed.
- [x] Different Renewal Price accurately framed as active introductory pricing.
- [x] ArraySubs post-trial timing inconsistency documented for testing.
- [x] FTC current status checked rather than relying on stale 2024 summaries.
- [x] Visa material qualified as card-network guidance, not universal law.
- [x] Five FAQ candidates supplied.
- [x] Flat hero, chart, flow, funnel, UX, and capability-boundary visuals proposed.
