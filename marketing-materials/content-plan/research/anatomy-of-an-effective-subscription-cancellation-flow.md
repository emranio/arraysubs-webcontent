# Research packet — A073: Anatomy of an Effective Subscription Cancellation Flow

Research completed: 2026-07-22  
Status: research only; not an article draft and not a browser-tested product review

## Editorial boundary and evidence labels

- **External fact** means a claim supported by a linked primary or official source.
- **ArraySubs code finding** means a finding from static inspection of the current `arraysubs` and `arraysubspro` worktrees. It is not a claim about every deployed version.
- **Recommendation** means an editorial or product-design judgment. It should not be presented as proven performance.
- Do not imply that a retention step is inherently effective, that ArraySubs is the only provider with the capability, or that making cancellation harder reduces churn.

## Direct answer the article should support

An effective cancellation flow lets a customer find cancellation, understand when billing and access end, state a reason without unnecessary burden, consider a genuinely relevant alternative, decline that alternative without obstruction, and receive an unambiguous result. Its quality should be measured by completion, support burden, complaints, and durable post-offer outcomes—not by raw offer clicks alone.

## External evidence ledger

### Cancellation timing and state

- WooCommerce Subscriptions documents `pending-cancel` as the state used when a prepaid customer has cancelled but retains access until the end of the prepaid term. This is a useful industry comparison for end-of-period semantics, not evidence about ArraySubs itself. Source: https://woocommerce.com/document/subscriptions/statuses/
- WooCommerce also tells customers that an end-of-term cancellation preserves benefits until the prepaid term ends, and that available customer actions can depend on gateway capabilities. Source: https://woocommerce.com/document/subscriptions/customers-view/suspend-cancel-or-remove-an-item/
- Stripe documents both immediate cancellation and end-of-period cancellation through `cancel_at_period_end`. It also notes that invoice, proration, and refund consequences depend on how cancellation is performed. This supports explicitly disclosing each consequence rather than using a generic “cancelled” message. Source: https://docs.stripe.com/billing/subscriptions/cancel

### Existing market patterns

- WooCommerce’s official Cancellation Surveys & Offers extension documentation describes configurable cancellation reasons, optional detail collection, reason-targeted offers, limited-duration discounts, skip-next-renewal offers, and analytics. These are vendor-described capabilities, not independent evidence that they improve retention. Source: https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/
- SureCart’s official Subscription Saver documentation describes reason collection and reason-triggered percentage or fixed renewal discounts with duration and usage limits. Treat this as vendor self-description. Source: https://surecart.com/docs/subscription-saver/
- Sublium’s official documentation describes a multi-step cancellation-flow builder. Its product page describes discount, free-product, pause, and skip offers. Treat these as competitor capability claims, not comparative performance evidence. Sources: https://sublium.com/docs/cancellation-flow/ and https://sublium.com/woocommerce-subscription-cancellation-flow/

### Survey and form design

- Pew Research Center’s questionnaire guidance says answer options and question order can change results, closed choices should be exhaustive and mutually exclusive where possible, questions should ask one concept at a time, and wording should be simple and concrete. Source: https://www.pewresearch.org/writing-survey-questions/
- GOV.UK’s service guidance recommends asking only necessary questions, using clear short wording, and explaining why information is requested and what will happen with it. Sources: https://www.gov.uk/service-manual/design/designing-good-questions and https://www.gov.uk/service-manual/design/form-structure

### Ethics, law, privacy, and accessibility

- The FTC identifies difficult-to-cancel interfaces, buried terms, and interfaces that trick people into giving up data as dark-pattern risks. Source: https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers
- The FTC’s 2024 amended negative-option rule must **not** be described as currently operative: a federal court vacated it on July 8, 2025, and the FTC opened a new rulemaking inquiry in 2026. The 1973 rule remains in place while the agency seeks comment. Source: https://www.ftc.gov/system/files/ftc_gov/pdf/p064202negativeoptionruleanprm.pdf and current rule page: https://www.ftc.gov/legal-library/browse/rules/negative-option-rule
- California Business and Professions Code §17602 contains current, jurisdiction-specific online cancellation requirements. For covered online enrollments, cancellation must be available online without obstruction. A business may present a save offer only while simultaneously displaying a prominent, continuously available, proximate direct cancellation control. Amendments apply to covered contracts entered into, amended, or extended on or after July 1, 2025. This is not universal legal advice; merchants need counsel for their jurisdictions. Source: https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=
- WCAG 2.2 criteria relevant to this flow include keyboard access, logical focus order, visible and unobscured focus, labels and instructions, error identification, programmatic name/role/value, status messages, target size, and error prevention for legal, financial, or data actions. Source: https://www.w3.org/TR/WCAG22/
- The WAI-ARIA modal-dialog pattern says focus should move into a modal, Tab and Shift+Tab should remain within it, Escape should close it, and focus should ordinarily return to the invoking control. Source: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- The ICO’s data-minimisation and storage-limitation guidance supports collecting only adequate, relevant, necessary cancellation data and retaining it no longer than needed. Sources: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/ and https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/

## Verified ArraySubs behavior from the current code

### Ownership and configuration

- **Free/core:** `arraysubs/src/Boot.php` loads `CancellationFlow` and `RetentionAnalytics`. The core plugin owns cancellation settings, customer cancellation, retention offers, retention event logging, and the core retention analytics screen.
- **Pro:** `arraysubspro/src/Boot.php` adds automatic-payment gateway services and the broader Pro Analytics feature. Pro does not replace the core cancellation flow.
- Core defaults in `arraysubs/src/functions/settings-helpers.php` enable customer cancellation, require a reason, and define seven reasons: too expensive, not using, found an alternative, missing features, technical issues, temporary pause, and other.
- The same defaults enable retention, discount, pause, and downgrade offers. Skip and contact are disabled by default.

### Current customer path

Static inspection of `arraysubs/src/Features/CustomerPortal/views/view-subscription.php` and `arraysubs/src/resources/customerPortal.js` shows this sequence:

1. The customer invokes cancellation from the subscription view.
2. A cancellation dialog explains whether the configured outcome is immediate loss of access or end-of-period access.
3. The customer chooses one configured primary reason. Choosing “Other” reveals an additional text field.
4. Continuing can open a “Before You Go” retention dialog with reason-eligible offers.
5. The customer can accept an offer, keep the subscription, or choose “No thanks, continue to cancel.”
6. Declining the retention dialog sends the cancellation request. There is not a separate final confirmation dialog after that decline; the initial reason dialog supplies the warning/confirmation context.
7. A successful action displays a portal toast and then reloads the page.

This is a reason-first, offer-second flow. It should not be described as a configurable multi-question survey builder: `form_builder_enabled` and `form_config` are stored and exposed by the controller, but no current customer-portal consumer was found.

### Immediate versus end-of-period cancellation

- `arraysubs_cancel_subscription()` in `arraysubs/src/functions/cancellation-helpers.php` selects immediate or scheduled behavior from the cancellation setting.
- Scheduled cancellation keeps the subscription active, records `_waiting_cancellation`, uses the next payment date or an earlier end date as the effective end, schedules the cancellation action, records reason/details/actor, and clears a pending plan switch.
- Immediate cancellation records the end/cancel date, changes status to cancelled, clears pending retries and plan-switch state, and removes future scheduled subscription actions.
- Undoing a scheduled cancellation clears the cancellation metadata and reschedules the subscription through the centralized scheduler.
- The cancellation architecture also includes renewal guards and cancellation emails. See `documentations/architecture/cancellation-flow.md` and `arraysubs/src/Features/CancellationFlow/`.

### Retention offers and gateway boundary

- The current default offer builder in `arraysubs/src/Features/CancellationFlow/Services/Hooks.php` creates discount, pause, downgrade, and contact-support offers.
- The offer processor contains a `skip` handler, but the live Retention Flow admin page does not currently create/configure a skip offer. Standalone “skip renewal” exists elsewhere in core. Therefore do not market skip as a currently configurable cancellation offer without a product change.
- Manual subscriptions are eligible for core retention offers. For automatic subscriptions, `arraysubs_subscription_supports_retention_offers()` defaults to unsupported unless a gateway opts into the `retention_amount_update` capability.
- Current Pro code opts Stripe into this capability and leaves PayPal and Paddle automatic subscriptions unsupported for retention offers. See `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`.
- Pro cancellation synchronization differs by gateway: the architecture documents local handling for Stripe, remote scheduled cancellation for PayPal/Paddle, and a PayPal undo caveat because a remotely cancelled billing agreement can require reauthorization. Source in repository: `documentations/architecture/cancellation-flow.md`.

### Important current limitations

- **Downgrade acceptance is incomplete in the portal:** the processor can return eligible target products when no target is configured, but the customer portal renders no target-selection step and treats the acceptance response generically. A downgrade card without a configured `target_product_id` therefore does not complete a plan change through the current portal path. This is a static code finding, not a browser reproduction.
- **No arbitrary live survey builder:** the current portal asks one primary reason plus conditional “Other” details.
- **Skip is not a configurable retention card:** core has standalone skip and an offer-processor branch, but the current admin offer factory/UI does not expose it.
- **Gateway support is not universal:** automatic PayPal/Paddle subscriptions do not currently receive amount-changing retention offers through the Pro capability matrix.
- **Accessibility is partly implemented, not certified:** the cancellation dialog has dialog semantics, moves focus to the reason field, closes on Escape, and restores focus. Static inspection did not find a Tab/Shift+Tab focus trap or page inerting. The retention modal does not explicitly move focus inside or restore it on close. Do not claim WCAG conformance without real keyboard and assistive-technology testing.

## Observable flow contract table (original)

Use this table as the article’s practical centerpiece. It separates what the customer needs to know from what the system must do.

| Stage | Customer-visible contract | System/state contract | Evidence to retain for QA |
|---|---|---|---|
| Entry | Cancellation control is findable and clearly named | Authorization and subscription ownership are checked | Route, role, customer ID, subscription ID |
| Consequence disclosure | Exact access end date, last/next charge consequence, refund rule, and what stops | No state changes before an affirmative cancellation action | Screenshot/copy plus subscription dates |
| Reason | One neutral primary-reason question; optional details | Stable reason key is stored separately from editable label | Submitted key, label version, optional details |
| Save option | Relevant offer with amount, duration, timing, eligibility, and future price | Server rechecks eligibility and records the exact accepted terms | Offer ID/type/config and eligibility result |
| Decline | A plain, equally understandable path to continue cancellation | Declining cannot silently change billing or access | Decline event and next state |
| Confirmation/result | Clear immediate or scheduled result with effective date | Cancellation is idempotent; renewal work is unscheduled/guarded as applicable | Status/meta/scheduled actions/email log |
| Undo | If allowed, deadline and effect are explicit | Pending cancellation is cleared and renewal scheduling is restored | Undo event and new scheduled actions |
| Follow-up | Email repeats status, date, access, and support path | Email reflects committed state rather than optimistic UI state | Message type and timestamp |

## Recommended flow anatomy

These are recommendations, not claims of proven conversion lift.

1. Put a plainly labelled cancellation control in the customer’s normal subscription-management area.
2. Before collecting a reason, state the material consequence: immediate versus end-of-period, exact date, access, next charge, refund/proration rule, and any item/service already committed.
3. Ask one neutral primary-reason question. Make free text optional and warn against entering passwords, payment-card data, health information, or other sensitive data.
4. If retention is enabled, show at most one well-matched offer first. Disclose duration, renewal price after the offer, when the change takes effect, and limitations.
5. Keep the direct cancellation route visible, especially where law requires it. Do not use guilt, false urgency, visual misdirection, repeated dialogs, or forced support contact.
6. Confirm the committed state in the interface and email. Use exact dates, not “soon” or “at the end of your plan” alone.
7. Instrument each state transition and measure durable outcomes. Keep an immutable offer-terms snapshot so future edits do not rewrite historical meaning.

## Measurement model

Avoid treating offer acceptance as equivalent to a saved subscription.

- **Cancellation-flow completion rate** = completed cancellations ÷ customers who entered the flow.
- **Offer display rate** = eligible offer impressions ÷ flow entrants.
- **Offer acceptance rate** = processed offer acceptances ÷ eligible offer impressions.
- **Durable save rate at one renewal** = accepted-offer subscriptions with a subsequent paid renewal ÷ processed offer acceptances eligible to renew during the observation window.
- **Net retained contribution** = contribution collected during the observation window − discount cost − incremental servicing/fulfilment cost − refunds/credits.
- **Friction guardrails:** median completion time, abandonment, repeated attempts, cancellation-related contacts, complaints, refunds, chargebacks, and accessibility failures.

ArraySubs currently logs `cancelled`, `scheduled_cancel`, `cancel_undone`, `offer_shown`, `offer_accepted`, and `offer_declined` events in the core retention log table through `RetentionLogger`. The core dashboard’s “retained revenue” is based on recurring-amount snapshots for accepted offers whose subscriptions are currently live. It is not realized revenue, incremental revenue, or proof of causality. Label this metric carefully.

## Screenshot and UI evidence opportunities

### Production screenshot pass — 2026-07-22

The confirmed local staging site was exercised with a synthetic subscription. The customer subscription actions, primary-reason dialog, configured save-offer dialog, and a synthetic Retention Analytics event view were captured and published. The flow was closed without accepting an offer or completing cancellation.

- `screenshots/live-ui/a073-customer-subscription-actions-original.png` → `customer-subscription-actions.png`
- `screenshots/live-ui/a075-cancellation-survey-modal-original.png` → `customer-reason-dialog.png`
- `screenshots/live-ui/a074-customer-save-offers-original.png` → `customer-save-offers.png`
- `screenshots/live-ui/a070-retention-analytics-original.png` → `retention-analytics.png`

The annotation helper could not reliably locate the requested retention targets, so clean originals were used without callouts. Captions state that these are configuration and instrumentation checks, not accessibility certification, legal compliance, save lift, or realized revenue.

No screenshots were captured for this research task. If the article later enters the screenshot stage, useful original captures are:

1. Customer subscription view with the cancellation entry point in context.
2. Reason dialog showing immediate/end-of-period consequence copy and the “Other” field.
3. “Before You Go” offer card beside the direct decline path.
4. Pending-cancellation banner with effective date and undo control.
5. Retention Flow admin screen showing reason-to-offer triggers and gateway warning.
6. Retention Analytics with fake/test data, accompanied by a caption explaining that acceptance is not a causal save.

Use synthetic customer names, emails, order IDs, and subscription IDs. Crop or redact personal data, API keys, payment details, and site-identifying information.

## QA checklist for a later hands-on test

- Verify findability for customer and administrator roles and ownership denial for another customer’s subscription.
- Test immediate and end-of-period paths, exact dates, status/meta, emails, scheduled actions, renewal guards, and undo.
- Test no-offer, accepted-offer, declined-offer, ineligible-offer, duplicate-click, slow-network, REST error, and session-expiry paths.
- Test manual, Stripe, PayPal, and Paddle subscription behavior separately; do not extrapolate from one gateway.
- Test keyboard-only use, focus entry/containment/return, Escape behavior, zoom/reflow, screen-reader labels, error announcements, toast/status announcements, and reduced motion.
- Confirm a decline cannot be obscured, repeatedly deferred, or converted into a support-only path.
- Confirm collected reason/details data has a documented purpose, access policy, retention period, and deletion/export handling.

## Internal-link recommendations

- Feature anchor: `/features/subscription-retention/`
- Recipe: `/recipes/add-cancellation-surveys-to-subscriptions/`
- Recipe: `/recipes/offer-discounts-during-subscription-cancellation/`
- Recipe: `/recipes/let-customers-pause-or-skip-a-subscription/`
- Prerequisite explainer: `/retention-and-churn/subscription-churn-voluntary-vs-involuntary-and-why-it-matters/` (A072)
- Offer comparison: `/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/` (A074)
- Survey design: `/retention-and-churn/cancellation-survey-questions-that-produce-useful-data/` (A075)

Place the feature/recipe link only after the reader has the complete flow and limitations. A074 belongs beside the offer-selection section; A075 belongs beside the reason-question section.

## Claims to avoid

- “ArraySubs prevents churn” or “this flow will save X% of cancellations.”
- “Customers can always skip, pause, discount, or downgrade during cancellation.” Eligibility, configuration, and gateway boundaries apply; skip and downgrade have the current limitations above.
- “The FTC Click-to-Cancel rule is in force.” It was vacated in 2025; new federal rulemaking is underway.
- “WCAG compliant” based on component markup or static review alone.
- “Retained revenue” as realized or incremental revenue.
- “Anonymous survey data.” Current ArraySubs logs associate cancellation data with subscription/customer/product context.
