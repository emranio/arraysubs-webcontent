---
title: "Anatomy of an Effective Subscription Cancellation Flow"
meta_title: "Anatomy of an Effective Subscription Cancellation Flow"
meta_description: "Design a clear subscription cancellation flow with visible actions, plain consequences, one neutral reason, relevant alternatives, confirmed outcomes, accessibility, and reliable measurement."
focus_keyphrase: "subscription cancellation flow"
published: "2026-05-02"
updated: "2026-07-16"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Anatomy of an Effective Subscription Cancellation Flow

An effective subscription cancellation flow makes the action easy to find, explains timing and consequences before commitment, asks only necessary neutral questions, presents at most a few relevant and eligible alternatives, preserves a plain route to cancel, and confirms exactly what changed. It earns retention through fit and trust, not friction.

> **Direct answer:** design the journey as **find → understand → answer once → review a relevant option → cancel or stay → verify the committed result**. The customer should never need to hunt for the exit, decode billing consequences, decline the same offer repeatedly, or wonder whether the request succeeded.

This article focuses on product and operational design. Legal duties vary by jurisdiction, enrollment channel, and contract. Obtain qualified legal review for the live experience rather than treating a general checklist as compliance advice.

## Key takeaways

- Put cancellation where a customer reasonably manages the subscription.
- Explain immediate versus end-of-period timing, access, billing, credits, refunds, discounts, and scheduled orders before commitment.
- Ask one neutral primary reason and optional detail; do not turn cancellation into an exit interview.
- Match alternatives to the stated reason, operational evidence, product, plan, and gateway eligibility.
- Keep a prominent decline-and-continue control visible beside any save offer.
- Show loading, prevent duplicate submission, handle errors safely, and return a committed final state.
- Measure unique journeys and later paid renewals, not clicks or accepted offers alone.
- Test keyboard, focus, screen-reader, mobile, zoom, translation, error, and slow-network behavior.
- Preserve an ethical direct-cancel path even when a save offer exists.

![A clear subscription cancellation journey with visible checkpoints and a continuously available direct exit](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/featured-image.png)

## The five parts of a fair flow

![Five connected parts of a fair cancellation flow with a direct cancellation lane beneath them](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/five-parts-of-a-fair-flow.png)

### 1. Findability

The customer should find cancellation in the same account area where they can see renewal date, price, payment method, plan, and other subscription actions. Use direct language such as **Cancel subscription**. Do not hide it behind support-only contact, an unrelated menu label, or several screens of account settings.

Findability does not require a destructive-looking primary button. It requires a predictable location, accurate label, and accessible control. The tested ArraySubs portal placed Cancel with other actions on the subscription detail page.

![The customer subscription detail page showing cancellation alongside other subscription actions](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/customer-subscription-actions.png)

The surrounding state matters. If a subscription is paused, already waiting for cancellation, in failed-payment recovery, or controlled remotely by a provider, show the action that actually applies. Do not display an active-looking cancel path that will fail only after the final click.

### 2. Consequences

Before the customer commits, explain:

- whether cancellation is immediate or effective at the paid term's end;
- the last service, fulfillment, or access date;
- whether another renewal, shipment, or order is already committed;
- whether an existing discount or credit is lost;
- what happens to stored data, benefits, or entitlements;
- whether any refund or proration occurs;
- how to undo an end-of-period request, if supported.

Avoid a generic “Are you sure?” without the consequences. [Stripe's subscription-cancellation documentation](https://docs.stripe.com/billing/subscriptions/cancel) distinguishes immediate and end-of-period behavior and notes that invoice, proration, and refund outcomes depend on how cancellation is performed. That page describes Stripe Billing, not the ArraySubs gateway implementation, but it illustrates why the interface must state the actual result.

[WooCommerce's subscription-status documentation](https://woocommerce.com/document/subscriptions/statuses/) describes a pending-cancel state where prepaid access continues until term end. Again, use that as industry context rather than assuming identical internal semantics.

### 3. One necessary, neutral reason

Ask one primary reason using short, distinguishable options. Offer optional text for Other or nuance. Explain why the information is being collected when it is not obvious.

The staging ArraySubs flow showed a single reason step before offers:

![The customer cancellation dialog asking for one primary reason before continuing](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/customer-reason-dialog.png)

[Pew Research Center's questionnaire guidance](https://www.pewresearch.org/writing-survey-questions/) warns that option wording, order, and question form can change results. [GOV.UK's guidance on good questions](https://www.gov.uk/service-manual/design/designing-good-questions) recommends asking only what is necessary with clear, short wording. Those principles support a compact reason step, not a mandatory multi-page survey.

Do not make the selected reason a moral judgment. “I don't understand the value” assumes customer fault. “It costs too much right now” is more neutral. Preserve Other and an easy continuation when none fits.

### 4. A relevant option, not an obstacle

A cancellation flow can offer an alternative when it plausibly solves the stated problem:

- temporary timing or inventory buildup → pause or skip;
- affordability or wrong tier → configured downgrade or transparent temporary discount;
- service or technical issue → real support resolution or escalation;
- no longer needed → respectful cancellation;
- payment failure → a separate payment-update or recovery path, not a voluntary save-offer funnel.

The safe staging flow displayed configured discount and pause offers after “Too expensive” was selected:

![A customer save-offer dialog displaying configured discount and pause alternatives with a continuation path](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/customer-save-offers.png)

The caption is deliberately modest: the screenshot proves configured options can be displayed. It does not prove relevance, customer benefit, retention lift, or realized revenue.

### 5. A committed, inspectable result

After the final action, show:

- whether the request succeeded;
- the new status;
- effective date;
- next billing or access consequence;
- accepted offer terms, including amount and duration;
- a reference or link back to the subscription;
- how to undo, resume, pay, or contact support where applicable.

Persist the result before showing success. A toast that disappears while the status remains unchanged is not confirmation. For end-of-period cancellation, the account page should reflect the pending state. For immediate cancellation, access and order handling should align with the disclosed policy. For an accepted offer, the next renewal should use the stated terms.

## Clear versus obstructive design

![A side-by-side comparison of a clear direct flow and an obstructive loop with hidden exits](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/clear-vs-obstructive.png)

| Clear pattern | Obstructive pattern |
|---|---|
| Cancel appears in subscription actions | Cancellation is hidden behind unrelated menus or support contact |
| Consequences are stated before commitment | Timing, billing, or refund effects are vague |
| One neutral reason with optional detail | Long mandatory survey or guilt-inducing wording |
| Relevant offer with visible decline | Repeated offers, hidden decline, or changing button hierarchy |
| Same result across mouse, keyboard, and mobile | Keyboard trap, focus loss, inaccessible custom controls |
| Loading and duplicate-click prevention | Multiple submissions or silent network wait |
| Specific final status and date | Generic success message without state change |
| Errors preserve the customer's choices | Failure restarts the entire flow or submits anyway |

The [FTC's report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers) identifies difficult-to-cancel interfaces, buried terms, and interfaces that trick people into giving up information as risks. A merchant should treat obstruction as a customer-harm and trust problem even before legal analysis.

## Map the observable flow contract

Write a contract for each step so product, engineering, support, analytics, and QA review the same behavior.

| Step | Customer sees | System must prove | Failure behavior |
|---|---|---|---|
| Entry | Current plan, price, dates, status, Cancel action | Ownership and action eligibility | Explain unavailable action accurately |
| Reason | Neutral options and optional detail | Stable reason key, version, actor | Preserve choice and show accessible error |
| Offer | Relevant terms and visible decline | Eligibility, gateway support, amount, duration | Continue cancellation if offers fail safely |
| Confirmation | Timing and consequences | Intended immediate/end-of-period request | No mutation before explicit commitment |
| Submission | Disabled/loading action | One idempotent or duplicate-protected request | Recoverable error, no false success |
| Result | New status, effective date, next action | Stored state and auditable event | Clear support/retry route |

Include both frontend and backend authorization. The interface should not be the only ownership check. Customer endpoints should require authentication and verify the subscription belongs to the user; administrator routes should enforce the appropriate capability.

## Immediate, end-of-period, undo, and error outcomes

![A state diagram separating immediate cancellation, end-of-period cancellation, undo, and recoverable errors](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/cancellation-outcomes.png)

### Immediate cancellation

Use exact language about what stops now. Confirm future renewal actions are removed or blocked according to the product's lifecycle design. Decide how access, fulfillment, credits, and already-created orders behave. Never imply a refund unless one is actually created.

### End-of-period cancellation

Show the paid-through date and that no future renewal should occur after it. The account should visibly change to a waiting or pending state. Scheduled invoice-generation and due-time payment actions must remain aligned with the new renewal/cancellation timeline so a precise invoice job does not survive after future billing is meant to stop.

### Undo or resume

If the customer can undo a pending cancellation, disclose whether billing simply resumes on the original schedule, whether dates change, and whether any saved terms continue. Treat undo as a separate committed operation with its own loading, error, success, and audit event.

### Error and retry

If the network or endpoint fails, keep the dialog open, retain the selected reason, restore the button, and show a user-visible error. Before encouraging another attempt, determine whether the first request may have succeeded. A status refresh or request identifier can prevent a duplicate mutation.

## Match offers to eligibility and consequences

An offer has two tests: does it fit the customer problem, and can the system honor it for this subscription?

For every offer define:

- target reason and optional evidence;
- minimum/maximum tenure or remaining days;
- product/plan restrictions;
- customer or recurring-value limits;
- repeat-use limit;
- gateway capability;
- effective date and billing owner;
- what happens to future renewals and scheduled actions;
- entitlement/fulfillment impact;
- customer-visible terms;
- success, guardrail, and observation metrics.

### Current ArraySubs boundary

The inspected implementation can assemble discount, pause, downgrade, and contact-support configurations, subject to settings and eligibility. Manual subscriptions and automatic Stripe subscriptions can enter the current offer flow. Automatic PayPal and Paddle subscriptions fail the current retention-amount-update capability check before all offers are assembled. That means current offer exposure is not uniform by gateway.

Skip exists as a standalone subscription action and lifecycle branch, but the inspected admin retention-offer controls do not currently expose skip as a cancellation offer. A downgrade also needs a real configured target; an unconfigured target is not a complete customer path.

Do not write “all cancelling customers receive discount, pause, skip, or downgrade.” Test each live gateway, product, status, plan mapping, and billing owner.

## Accessible interaction is part of correctness

[WCAG 2.2](https://www.w3.org/TR/WCAG22/) includes criteria relevant to cancellation: keyboard access, logical and visible focus, labels and instructions, error identification, name/role/value, status messages, target size, and error prevention for consequential actions. This article does not certify ArraySubs or any merchant implementation against WCAG.

For a modal flow, test:

- focus moves to a sensible element when the modal opens;
- Tab and Shift+Tab behave predictably;
- the title and description are programmatically associated;
- radio/select choices have names and selected states;
- errors are announced and linked to the relevant control;
- loading state is announced without moving focus unexpectedly;
- Escape behavior is deliberate and does not mutate state;
- closing returns focus to the invoking control when appropriate;
- the visible decline control is in a logical reading and focus order;
- success status is announced and available after the toast disappears.

The [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) describes focus moving into the dialog, containment while it is open, Escape behavior, and focus return. Use the pattern as implementation guidance and test with real browsers and assistive technology.

## Data minimization and privacy

Cancellation text can contain sensitive personal or business information. Ask only what the merchant can use, restrict access, set retention periods, and remove customer identifiers and text from screenshots or public reports.

The UK's [ICO data-minimisation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/) and [storage-limitation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/) support collecting relevant necessary data and retaining it no longer than needed. They are UK data-protection references, not universal legal advice.

Operational safeguards include:

- optional rather than mandatory free text;
- no payment credentials or secrets in the field;
- restricted export and analytics access;
- redaction before support sharing;
- documented retention and deletion;
- avoidance of real customer data in staging;
- separation of identifiers from published aggregates.

## Current legal context needs careful wording

Do not cite the FTC's 2024 amended negative-option rule as currently operative. A federal court vacated it on July 8, 2025, and the FTC began a new rulemaking inquiry in 2026; check the [FTC's current Negative Option Rule page](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule) and obtain current counsel.

California has jurisdiction-specific requirements in [Business and Professions Code §17602](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=). For covered online enrollments, its text includes online cancellation without obstruction and conditions around presenting a save offer while a prominent direct-cancellation control remains available. The applicability and effective amendments require legal review; do not generalize California's rule to every customer or territory.

A globally used WooCommerce store may face different rules by country, state, enrollment channel, product, and payment arrangement. Maintain a jurisdiction matrix with legal counsel and keep product behavior configurable without creating misleading inconsistency.

## Measure the journey without rewarding friction

Track unique cancellation journeys through:

```text
cancellation entry
→ reason submitted or skipped
→ offer eligible
→ offer shown
→ accepted or declined
→ immediate/pending cancellation or undo
→ retained after observation window
→ paid renewal realized
```

Useful operational metrics:

- cancellation-action error rate;
- flow completion time and steps;
- abandonment by step, interpreted carefully;
- reason-provided, Other, and missing rates;
- offer eligibility and shown rate;
- acceptance rate among shown;
- duplicate request rate;
- scheduled cancellation undo rate;
- later paid renewal by offer and reason;
- refunds, complaints, support contacts, and chargebacks;
- contribution margin versus a valid comparison.

Do not call increased abandonment a save. It can mean an error, confusion, or obstruction. Do not call accepted recurring-value terms “retained revenue” as if cash were collected. Confirm the later paid order and estimate incremental contribution margin.

The tested Retention Analytics view recorded one synthetic offer-shown event:

![Retention Analytics showing a synthetic offer event used to verify instrumentation, not performance](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/retention-analytics.png)

In the inspected implementation, the reason chart can include both scheduled and final cancellation event rows, so one journey may appear more than once. Deduplicate before publishing reason or cancellation counts. The opening-base calculation is also reconstructed rather than a historical snapshot, and the dashboard does not provide a built-in causal holdout engine.

## Define the offer terms as a contract

Every save action changes a subscription contract or lifecycle expectation. Treat its displayed terms, stored state, scheduled actions, gateway behavior, and later order as one testable contract.

For a discount, specify whether it is percentage or fixed, which renewal amounts it affects, when it starts, how many cycles it lasts, the post-discount price, taxes, currency, and what happens after plan changes or reactivation. The tested ArraySubs retention setting currently exposes a percentage discount with a cycle count. Do not generalize that UI into arbitrary fixed, permanent, or one-time discount behavior without verification.

For a pause, state the pause start, planned resume date, what happens to access or fulfillment, whether renewal dates move, whether remote billing is paused, and how the customer resumes early. “Pause for 30 days” is incomplete if a shipment is already being prepared or a provider-owned billing schedule continues.

For a skip, identify the exact renewal being skipped and show the next expected date. Ensure the precise invoice-generation action and the due-time payment action move together. Skipping only the visible charge while leaving another scheduled action behind can create an invoice, attempt, or state mismatch.

For a downgrade, name the destination product or plan, new price, billing interval, feature/entitlement changes, effective date, credits or proration, and reversal path. A generic “downgrade” button without a configured target is not a complete offer.

For support, set a realistic expectation. A contact option should not silently postpone cancellation while a customer waits. If support is asynchronous, let the customer continue cancelling and disclose whether the request remains pending.

Use a contract table in implementation and QA:

| Offer | Customer promise | Stored/scheduled proof | Later proof |
|---|---|---|---|
| Discount | Amount, duration, future price | Discount metadata and correct renewal calculation | Paid renewal at disclosed amount; expiry on schedule |
| Pause | Duration, access/fulfillment, resume date | Pause state and aligned renewal actions | No unintended billing; correct resume |
| Skip | Exact skipped cycle and next date | Both invoice and payment schedules moved | No charge for skipped cycle; next cycle correct |
| Downgrade | Target plan, price, entitlements, effective date | Target mapping and lifecycle transition | Correct product/price/benefits on later renewal |
| Support | Response expectation without blocking exit | Support record plus unchanged cancellation control | Issue resolution or respectful cancellation |

## Design for edge cases, not only the happy path

Subscription state can change while the dialog is open. A renewal can complete, an administrator can alter the plan, a remote provider can update status, or a scheduled action can run. Revalidate ownership, current status, dates, amount, and offer eligibility when the customer commits. If the terms changed, explain the new state and require a fresh explicit decision rather than applying stale information.

Common edge cases include:

### Already cancelled or waiting cancellation

Replace the active cancellation action with the committed state and, where supported, an Undo control. A second cancellation request should not generate duplicate events or shift the effective date unexpectedly.

### Renewal is processing

Say whether the in-flight renewal can still complete and what happens to its order. Cancellation should not claim to stop a charge that has already succeeded or cannot safely be interrupted.

### Failed-payment recovery is active

Separate customer intent from payment recovery. A customer may want to pay, update the method, cancel, or ask for help. Do not route every on-hold record through the same voluntary retention offer. Reconcile the provider before retrying or cancelling where remote success is possible.

### Offer becomes ineligible

If a repeat-use limit, product rule, gateway capability, or remaining-days check changes, continue to a clear cancellation path. An offer error must not block the exit.

### Session expires

Preserve non-sensitive local choices where safe, ask the customer to sign in again, and return to the relevant subscription. Do not submit against an unverified account context.

### Request times out after mutation

Before repeating, reload the subscription or query the operation result. If the first request committed, render that status. If not, allow a deliberate retry. This is why duplicate-protected backend handling and observable request identifiers matter.

### JavaScript or asset failure

Provide an accessible server-rendered or support-assisted fallback consistent with applicable legal and product requirements. At minimum, the account must not advertise cancellation while leaving a permanently broken control.

## Review copy as operational data

Microcopy is part of the contract. Keep a reviewed inventory of entry labels, consequence summaries, reason options, offer terms, button labels, loading messages, errors, success messages, and notification emails. Record the product state each string assumes.

Prefer specific language:

- “Cancel at the end of your current term on August 31” instead of “Cancel later.”
- “Your next three renewals will be 20% lower; the regular price returns afterward” instead of “Get 20% off.”
- “Pause renewals for 30 days; your next expected renewal is September 30” instead of “Take a break.”
- “We couldn't confirm the request. Your current status is still Active. Try again or contact support.” instead of “Something went wrong.”

Avoid urgency, guilt, and ambiguous reversals. “Keep my benefits” versus “Lose everything” creates emotional asymmetry. Use parallel controls such as “Accept discount” and “Continue cancellation,” then ensure their visual and focus treatment does not hide the latter.

Translate meaning, not just words. Date format, currency, pluralization, offer duration, sentence length, and button width can alter comprehension. Re-run layout and interaction tests for supported locales rather than assuming the English flow scales.

## Establish operational ownership

Assign a named owner to each part:

- account navigation and entry visibility: customer-experience/product owner;
- cancellation and lifecycle state: subscription engineering/operations;
- billing and gateway consequences: payments owner;
- reason codebook and qualitative data: research or product analytics;
- offer economics and eligibility: retention/pricing owner with finance review;
- entitlements and fulfillment: service/product operations;
- accessibility: accountable product and engineering owners with specialist review;
- privacy and retention: privacy/data owner;
- jurisdiction-specific requirements: legal counsel;
- events, deduplication, and outcome reporting: analytics/data owner;
- support escalation and incident response: customer support/operations.

Run a periodic journey review with evidence from errors, support, abandonment, offer exposure, later renewals, refunds, complaints, and gateway incidents. A flow can degrade when products, payment methods, provider APIs, legal requirements, or translations change even if its frontend code is untouched.

## QA the complete journey

![A QA checklist covering viewports, accessibility, gateway eligibility, and committed event/status proof](/blogs/anatomy-of-an-effective-subscription-cancellation-flow/test-the-complete-journey.png)

Test at least:

### Customer and subscription states

- manual and every automatic gateway;
- active, trial, paused/on-hold, waiting cancellation, and recovery states;
- immediate and end-of-period choices;
- eligible and ineligible offers;
- configured and missing downgrade targets;
- repeat-pause/discount limits;
- customer-owned versus unowned subscription.

### Interaction states

- desktop and mobile viewport;
- keyboard-only and screen-reader pass;
- 200% zoom and long translated copy;
- slow request, endpoint error, timeout, and possible succeeded-then-disconnected state;
- double click/tap;
- Back, Escape, close, refresh, and session expiry;
- offer accept, decline, and no eligible offer;
- Other with blank and entered detail.

### System proof

- stored reason, type, initiator, and dates;
- final subscription status;
- Action Scheduler jobs added/removed as intended;
- order, credit, entitlement, and fulfillment state;
- gateway remote/local state where applicable;
- one analytics journey rather than inflated event totals;
- email or notification content and timing;
- accepted offer effect on the next paid renewal.

Use synthetic accounts and provider sandboxes. A real charge is unnecessary for most flow, state, scheduling, and accessibility verification.

## Implementation checklist

- [ ] Cancel is clearly named and easy to find.
- [ ] Ownership/capability is enforced server-side.
- [ ] Current status, renewal date, and plan context are correct.
- [ ] Immediate and end-of-period consequences are explicit.
- [ ] The reason step is short, neutral, and necessary.
- [ ] Free text is optional, minimized, and protected.
- [ ] Offers are relevant, eligible, and fully disclosed.
- [ ] A prominent decline-and-cancel path remains available.
- [ ] Buttons show loading and block duplicate submission.
- [ ] Errors preserve state and never produce false success.
- [ ] The committed result is visible and auditable.
- [ ] Keyboard, focus, screen-reader, mobile, zoom, and translation are tested.
- [ ] Journey events are deduplicated before reporting.
- [ ] Later paid renewal and margin are separated from offer acceptance.
- [ ] Current legal and privacy review covers the live jurisdictions.

## Frequently asked questions

### How many steps should a cancellation flow have?

Use the fewest steps needed to communicate consequences, collect necessary information, present a genuinely relevant option, and confirm the result. Step count matters less than clarity and lack of obstruction.

### Should I require a cancellation reason?

A single neutral reason can support diagnosis, but it does not prove root cause. Keep it brief, provide Other, avoid mandatory essays, monitor abandonment, and obtain UX/legal review.

### Can I show a discount before cancellation?

Only when it is eligible, clearly disclosed, relevant, and easy to decline. Measure later renewals and margin. Do not hide or weaken the direct cancellation control.

### Is pause always better than cancellation?

No. It fits temporary timing for some customers. It can merely delay churn for others and can affect fulfillment, entitlements, billing, and revenue recognition.

### Does an accepted offer mean the customer was retained?

It means an offer was accepted. Verify that cancellation stopped, the subscription remained in the intended state, the offer applied correctly, and later paid renewals occurred.

### Is this article legal advice?

No. It provides design, implementation, and testing guidance. Have qualified counsel review the applicable laws, contract, enrollment channel, disclosures, data handling, and cancellation mechanism.

## Verification environment and limits

This guide was verified on **July 22, 2026** against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, current cancellation, retention-offer, lifecycle, gateway, and analytics source, plus a safe local staging journey using a synthetic subscription.

The staging pass opened the customer subscription actions, selected a reason, displayed configured discount and pause offers, and produced one synthetic `offer_shown` event. No offer was accepted, no subscription was cancelled, and no charge was created. Accessibility observations are design/test requirements, not a conformance certification.

Continue with the [cancellation reason taxonomy](/deals/arraysubs/resources/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/), [save-offer comparison](/deals/arraysubs/resources/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/), and [retention feature overview](/deals/arraysubs/features/#retention-revenue).

## Primary sources

- [WooCommerce subscription statuses](https://woocommerce.com/document/subscriptions/statuses/)
- [Stripe subscription cancellation](https://docs.stripe.com/billing/subscriptions/cancel)
- [WooCommerce cancellation surveys and offers](https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/)
- [Pew Research Center: Writing survey questions](https://www.pewresearch.org/writing-survey-questions/)
- [GOV.UK: Designing good questions](https://www.gov.uk/service-manual/design/designing-good-questions)
- [FTC report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers)
- [FTC Negative Option Rule](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule)
- [California Business and Professions Code §17602](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [ICO data minimisation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/)

## Verification and update log

- **2026-07-22:** Verified the current ArraySubs cancellation, offer, gateway, state, analytics, and staging customer-flow evidence; updated current FTC/California cautions.
- **2026-07-16:** Editorial update date assigned for the initial publication package.
