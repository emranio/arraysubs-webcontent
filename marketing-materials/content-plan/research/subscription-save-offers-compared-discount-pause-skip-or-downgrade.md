# Research packet — A074: Subscription Save Offers Compared: Discount, Pause, Skip, or Downgrade?

Research completed: 2026-07-22  
Status: research only; not an article draft and not a browser-tested product comparison

## Editorial boundary

- Separate **external facts**, **ArraySubs code findings**, and **recommendations**.
- A vendor’s capability page can establish what that vendor says its product does; it cannot establish effectiveness.
- Never equate a clicked or processed offer with an incremental retained customer.
- The useful question is not “Which offer saves the most?” It is “Which offer best resolves this reason at acceptable cost, risk, and customer effort?”

## Direct answer the article should support

- **Discount** fits a price/value objection when the problem is plausibly temporary or the lower price restores acceptable value.
- **Pause** fits a temporary need interruption when the customer expects to return and a longer billing/access break is useful.
- **Skip** fits a one-cycle timing, inventory, delivery, or cash-flow mismatch while preserving the existing plan.
- **Downgrade** fits a lasting mismatch between the current tier and the customer’s needs or budget.

No option is a universal save. Eligibility, gateway support, unit economics, abuse controls, timing, and the customer’s stated reason should determine whether an offer appears.

## External evidence ledger

### Current market behavior

- WooCommerce’s official Cancellation Surveys & Offers documentation describes reason-targeted percentage or fixed discounts, limited-renewal or lifetime discounts, eligibility conditions, skip-next-renewal offers, and multiple offers by reason. This establishes a market pattern, not an outcome benchmark. Source: https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/
- SureCart’s official Subscription Saver documentation describes reason-triggered percentage/fixed renewal discounts with once, multiple-month, or forever duration and usage limits. Its current feature page also advertises pause/custom-message choices by reason. Treat both as vendor self-description. Sources: https://surecart.com/docs/subscription-saver/ and https://surecart.com/features/subscriptions/
- SureCart’s subscription-management documentation distinguishes pausing until a date from immediate or end-of-period cancellation. Source: https://surecart.com/docs/managing-subscriptions/
- Sublium’s product page describes percentage/fixed discounts, a free product, pause, and skip as cancellation-flow offers. Treat this as a vendor capability claim. Source: https://sublium.com/woocommerce-subscription-cancellation-flow/
- Stripe documents that subscription price changes can create prorations and recommends previewing the financial effect. This supports disclosing timing and price impact for a downgrade. Source: https://docs.stripe.com/billing/subscriptions/change
- WooCommerce documents that customer actions may depend on the payment gateway and that a pending-cancellation subscription can preserve prepaid access. Sources: https://woocommerce.com/document/subscriptions/customers-view/suspend-cancel-or-remove-an-item/ and https://woocommerce.com/document/subscriptions/statuses/

### Ethical and legal guardrails

- The FTC identifies cancellation obstruction, buried terms, and interfaces that trick people into disclosing data as dark-pattern concerns. Source: https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers
- Do not cite the FTC’s vacated 2024 amended rule as current law. The FTC’s 2026 notice states that the rule was vacated on July 8, 2025 and that the agency is considering a new rule. Source: https://www.ftc.gov/system/files/ftc_gov/pdf/p064202negativeoptionruleanprm.pdf
- California’s current statute allows a save offer in a covered online cancellation flow only alongside a prominent, continuously available, proximate direct cancellation control. It applies in the circumstances and dates specified by the statute; this needs jurisdiction-specific legal review. Source: https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=

## Comparison matrix (original)

| Offer | Best-fit reason hypothesis | Billing/access change | Merchant cost and risk | Customer caveat | Durable-success signal |
|---|---|---|---|---|---|
| Discount | Price/value concern that a lower temporary price can actually resolve | Price falls for disclosed renewal(s); service usually continues | Immediate margin reduction; conditioning customers to threaten cancellation; coupon stacking or repeat use | State amount/percentage, eligible charges, duration, post-offer price, and timing | Paid renewal after the discount ends, with acceptable contribution margin |
| Pause | Temporary non-use, travel, seasonality, excess inventory, or short budget interruption | Billing and often access stop or defer until a stated resume date | Revenue delay; service/entitlement complexity; forgotten resumes; accumulated fulfilment commitments | State pause start/end, access, next charge, fulfilment effect, and auto-resume behavior | Successful resume followed by paid renewal, not merely entering on-hold |
| Skip | One-cycle timing, inventory, delivery, or cash-flow mismatch | Next renewal advances one or more cycles while plan terms remain | Short revenue delay; schedule edge cases; repeated skipping | State which charge/delivery is skipped and the new exact renewal date | Next scheduled renewal is paid after the skipped cycle |
| Downgrade | Ongoing overcapacity, feature mismatch, or persistent budget/value issue | Tier/price/entitlements change now or at next renewal | Lower recurring revenue; migration complexity; entitlement loss; proration/refund disputes | Compare lost/kept features, effective date, credit/proration, and future price | Paid renewal on the new tier with lower cancellation/support rate |

## ArraySubs product truth from current code

### Where the behavior lives

- Cancellation offers and the Retention Analytics screen are core/free features loaded from `arraysubs/src/Boot.php`.
- `arraysubspro` adds automatic-payment gateway handling and a broader Pro analytics overview. It does not own a separate save-offer engine.
- `arraysubs/src/Features/CancellationFlow/Services/Hooks.php` currently creates discount, pause, downgrade, and contact-support offer definitions.
- The live admin editor is `arraysubs/src/resources/pages/RetentionFlow/index.jsx`.

### Discount

- The live admin UI exposes a percentage discount from 1–100 and a duration of 1–12 billing cycles.
- The processor supports percentage and fixed discount logic internally, but current UI-authored default offers are percentage-based. Do not promise a fixed-amount cancellation discount through the current admin screen.
- A discount is limited to one use per subscription through retention history/meta checks.
- It can affect a pending renewal order and future renewals; remaining cycles decrement after a paid renewal.
- Automatic subscriptions require gateway support for retention amount updates. Current Pro code enables this for Stripe, but not PayPal or Paddle.

### Pause

- Pause is a configurable cancellation offer in core and delegates to `PauseManager`.
- Current pause eligibility includes active/trial status, feature enablement, maximum pauses, cooldown, and duration limits.
- The core implementation changes the subscription to on-hold, shifts the next payment and end date by the pause duration, schedules automatic resume, and removes renewal work during the pause.
- That schedule-shifting behavior should be described as ArraySubs behavior, not assumed to match every subscription platform.

### Skip

- Core has a standalone skip-renewal feature and the retention offer processor has a `skip` branch.
- However, the current default offer factory and live Retention Flow admin page do not create or configure a skip cancellation offer. Therefore the article must distinguish “ArraySubs can let eligible customers skip a renewal” from “skip is available as a current cancellation save card.” The latter is not supported by the inspected admin path.
- Standalone skip keeps the subscription active, advances the next payment by the chosen cycle count, and reschedules renewal actions. Eligibility includes status, enablement, cutoff, maximum cycles, and whether a skip is already pending.

### Downgrade

- The retention processor can schedule a switch to a target product for the next renewal.
- When no target product is configured, it returns eligible product IDs for selection. The current customer portal does not render that selection step and submits only the offer ID/type, then handles the response as a generic success.
- Consequently, a downgrade card without a configured `target_product_id` does not currently complete an actual downgrade in the inspected portal path. This is a static code limitation; it was not browser-reproduced in this research task.

### Eligibility and fallback

Current offer eligibility can filter by:

- selected cancellation reasons;
- products;
- minimum subscription age;
- minimum/maximum subscription value;
- minimum/maximum user total spend;
- minimum/maximum remaining days;
- prior discount usage;
- pause/skip manager eligibility;
- automatic-payment gateway capabilities.

If no offer is eligible, the portal displays a cancellation confirmation rather than requiring an offer. Contact support is a link, not an accepted monetary offer, and should not be counted as a save unless a later observable outcome justifies it.

## Reason-to-offer decision table (original recommendation)

| Primary reason | First option to test | Why it may fit | Do not show when | Honest fallback |
|---|---|---|---|---|
| “Too expensive for the value I get” | Downgrade, then bounded discount | A lasting lower tier is often a cleaner structural fit; a discount tests temporary price sensitivity | Lower tiers remove the customer’s essential job, or discounted contribution is negative | Direct cancellation plus win-back permission |
| “My budget changed temporarily” | Pause or one-cycle skip | Preserves relationship without permanently resetting price | Customer needs a permanent reduction or pause shifts commitments unfairly | End-of-period cancellation |
| “I have too much / do not need the next cycle” | Skip | Changes one renewal rather than the whole plan | The plan has no meaningful cycle to defer, inventory will not recover, or limits are exhausted | Pause or cancellation |
| “I use fewer features than expected” | Downgrade | Aligns tier with ongoing use | No suitable lower tier or migration loses required data/access | Cancellation with optional return path |
| “Missing capability / poor fit” | No generic discount; targeted alternative only if it solves the gap | Lower price does not create missing functionality | There is no product that solves the stated need | Direct cancellation and optional product feedback |
| “Technical or service problem” | Support recovery with explicit consent | The problem may be repairable | Support is being used as a mandatory cancellation gate | Direct cancellation remains available |
| “I found a better alternative” | Usually direct cancellation; optionally ask what mattered | A generic save offer can feel irrelevant | Always, unless a specific documented mismatch can be resolved | Respectful confirmation and return path |

## Economics and measurement worksheet

### Required inputs

- Current recurring price and contribution margin, not revenue alone.
- Offer price/duration or pause/skip deferral length.
- Probability and timing of fulfilment/service costs.
- Refund, credit, proration, support, gateway, and migration costs.
- Baseline probability of a later paid renewal among comparable eligible cancellation entrants.
- Treatment probability of a later paid renewal at a predeclared observation point.

### Useful calculations

- **Incremental durable save rate** = treatment paid-renewal rate − control paid-renewal rate.
- **Discount contribution during offer** = discounted collected revenue − variable fulfilment/service cost − processing/refund/support cost.
- **Incremental net contribution per eligible entrant** = treatment contribution − control contribution.
- **Pause/skip recovery rate** = entrants who later complete a paid renewal ÷ entrants who accepted pause/skip and reached the new due date.
- **Downgrade durability** = downgrade acceptors completing N paid renewals ÷ downgrade acceptors eligible to reach N renewals.

Do not compare a 12-cycle discount’s raw acceptance rate with a one-cycle skip’s raw acceptance rate. Their costs, exposure windows, and definitions of success differ.

## Experiment design checklist

1. Define the reason, eligibility set, offer terms, and observation window before launch.
2. Randomize only among customers for whom all compared options are operationally and legally valid.
3. Keep a direct cancellation route in every condition.
4. Record offer impression, full terms, acceptance, cancellation outcome, next due date, paid renewals, refunds, credits, support contacts, complaints, and chargebacks.
5. Use a durable primary outcome such as paid renewal at one or more relevant cycles. Keep acceptance as an intermediate event.
6. Monitor margin and customer-harm guardrails, not just retained recurring amount.
7. Avoid invented “industry benchmark” percentages. Estimate sample size from the business’s baseline, minimum meaningful effect, variance, and chosen error controls.
8. Segment or stratify by gateway, plan, tenure, and reason when those variables change eligibility or economics. Do not mine small subgroups for flattering winners.

## Current analytics caveat

Core `RetentionLogger` records offer impressions, acceptances, declines, cancellations, scheduled cancellations, and undo events with subscription/customer/product snapshots. Core Retention Analytics reports offer acceptance and a “retained revenue” value based on accepted offers whose subscription status is currently live. Pro’s overview also counts `offer_accepted` events as retention saves.

These are operational indicators, not causal proof. A customer may accept and cancel before the next paid renewal; a customer who would have stayed without the offer can also accept. Recommended editorial wording: “accepted offers” for the current metric, and “durable saves” only for a separately calculated, time-bounded post-renewal outcome.

## Disclosure checklist for every offer

- Exact price or percentage and the charges to which it applies.
- Number of cycles or exact end date.
- Exact post-offer recurring price.
- Effective date and proration/credit/refund behavior.
- Access, entitlement, delivery, and accumulated-balance changes.
- Automatic resume or renewal date for pause/skip.
- Usage limits and repeat eligibility.
- Gateway or payment-method restriction where relevant.
- Direct cancellation control with clear visual and keyboard access.
- Confirmation email or durable account record of the accepted terms.

## Accessibility and privacy cautions

- Offer cards must expose programmatic names, terms, selection state, errors, and loading/status changes; keyboard focus must enter, remain appropriately contained in, and return from a modal. Sources: https://www.w3.org/TR/WCAG22/ and https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- Avoid using color, visual weight, or repeated dialogs to make decline materially harder than acceptance.
- Offer eligibility can reveal sensitive inferences about value, spend, or customer status. Collect and expose only what is necessary, limit access, and set a retention schedule. Source: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/

## Screenshot and UI evidence opportunities

### Production screenshot pass — 2026-07-22

The confirmed local staging site was exercised with a synthetic subscription. Current retention-offer controls, the customer discount/pause dialog, related plan-switching settings, and one synthetic Retention Analytics offer event were captured and published. No offer was accepted and no subscription, payment, schedule, or product was changed.

- `screenshots/live-ui/a074-retention-offer-controls-original.png` → `retention-offer-controls.png`
- `screenshots/live-ui/a074-customer-save-offers-original.png` → `customer-save-offers.png`
- `screenshots/live-ui/10-plan-switching-settings-original.png` → `plan-switching-settings.png`
- `screenshots/live-ui/a070-retention-analytics-original.png` → `retention-analytics.png`

The annotation helper did not reliably find the new retention targets, so clean originals were used. Captions distinguish settings/exposure from effectiveness, gateway parity, realized revenue, or causal lift.

No screenshots were captured for this research task. Later, use synthetic data to capture:

1. Retention Flow offer editor with reason triggers and eligibility settings.
2. Discount card with percentage, duration, and post-offer renewal explanation.
3. Pause card and the exact calculated resume/next-payment date.
4. Standalone skip action, explicitly captioned as not currently exposed as a cancellation offer.
5. Downgrade setup with a configured target product; avoid implying an unconfigured card provides customer selection.
6. Automatic-payment gateway warning/support state.
7. Retention Analytics, captioned as accepted-offer reporting rather than proven incremental saves.

Redact customer identifiers, order/subscription IDs, email, payment data, API keys, and production economics.

## Internal-link recommendations

- Cancellation-flow foundation: `/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/` (A073)
- Survey/reason design: `/retention-and-churn/cancellation-survey-questions-that-produce-useful-data/` (A075)
- Experiment guide: `/retention-and-churn/how-to-ab-test-subscription-retention-offers-without-hurting-cx/` (A076)
- Feature anchor: `/features/subscription-retention/`
- Recipe: `/recipes/offer-discounts-during-subscription-cancellation/`
- Recipe: `/recipes/let-customers-pause-or-skip-a-subscription/`

Link A073 before the matrix to establish the unobstructed cancellation contract. Link A075 from the reason-matching section. Link A076 from the experiment section. Put product CTAs only after the reader has the eligibility, limitations, and measurement framework.

## Claims to avoid

- “Discounts are the best save offer” or any universal winner.
- “Accepted offer = retained customer” or “retained revenue = incremental revenue.”
- “ArraySubs offers skip during cancellation” without the current UI limitation.
- “Customers can select a downgrade plan during cancellation” without a verified target-selection implementation.
- “All gateways support these offers.”
- “Pause” as a standardized industry behavior; platforms differ on dates, billing, access, and fulfilment.
- Any fixed performance benchmark not supported by a transparent, comparable dataset.
