# Research packet — A075: Cancellation Survey Questions That Produce Useful Data

Research completed: 2026-07-22  
Status: research only; not an article draft or a publishable downloadable template

## Editorial boundary

- Distinguish **survey-method evidence**, **ArraySubs code findings**, and **recommendations**.
- The question bank below is an original working taxonomy. It requires merchant-specific privacy, legal, accessibility, product, and data-governance review before publication or download.
- Do not promise that a survey reveals a customer’s “true” cause. It records a response in a particular exit context, under a particular wording/order/requirement.
- Do not collect sensitive data merely because an open-text box makes it possible.

## Direct answer the article should support

A useful cancellation survey asks one neutral primary-reason question with stable, mutually exclusive choices and an optional, tightly scoped follow-up only where the answer changes a decision. It includes “Other” and “Prefer not to say,” stores stable keys separately from labels, preserves question/version context, and measures missingness and “Other” usage alongside reason share. Free text should be optional, purpose-limited, access-controlled, and governed by a deletion schedule.

## Survey-method evidence ledger

### Wording, choices, and order

- Pew Research Center advises pretesting; notes that open and closed questions can yield different answers; says answer options and their order can influence results; recommends exhaustive, mutually exclusive categories where possible; and cautions against double-barrelled or complex wording. Source: https://www.pewresearch.org/writing-survey-questions/
- Pew reports that open-ended questions can have higher item nonresponse because they demand more effort, with response affected by the prompt and placement. Source: https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/
- GOV.UK’s service guidance recommends short, clear questions, closed questions when they reduce effort, and help text that explains what will happen with the information. Source: https://www.gov.uk/service-manual/design/designing-good-questions
- GOV.UK’s form-structure guidance recommends documenting why data is needed, how it will be used, who needs it, how it will be validated, and how it will be kept secure. It also recommends asking only questions relevant to the user. Source: https://www.gov.uk/service-manual/design/form-structure
- The UK Office for National Statistics design system generally recommends one question per page to reduce cognitive load and improve focus. Source: https://service-manual.ons.gov.uk/design-system/patterns/question

### Privacy and retention

- The ICO’s data-minimisation guidance says personal data should be adequate, relevant, and limited to what is necessary for the purpose. Source: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/
- The ICO’s storage-limitation guidance says personal data should not be kept longer than necessary and recommends documented retention periods and periodic review/deletion. Source: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/

### Accessibility and cancellation ethics

- WCAG 2.2 criteria relevant to survey dialogs include keyboard access, logical and visible focus, labels/instructions, error identification, programmatic name/role/value, and status-message announcements. Source: https://www.w3.org/TR/WCAG22/
- The WAI-ARIA modal-dialog pattern specifies focus entry, contained Tab navigation, Escape, and focus return. Source: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- The FTC identifies cancellation obstruction and interfaces that trick people into giving up data as dark patterns. Survey completion should not become an unnecessary cancellation barrier. Source: https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers
- California’s current statute is relevant for covered online cancellation flows: cancellation must remain available without obstruction, and save-offer prompts require a prominent, continuously available, proximate direct-cancel control. Merchants need jurisdiction-specific counsel. Source: https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=

## Current market patterns

- WooCommerce’s official extension documentation describes unlimited/custom cancellation reasons, optional reason details, and analytics, with offers targetable by reason. Treat this as vendor-described functionality rather than a validated survey methodology. Source: https://woocommerce.com/document/cancellation-surveys-offers-woocommerce-subscriptions/
- SureCart’s official documentation describes reason options, optional comments by reason, and a survey dashboard. Treat it as vendor self-description. Source: https://surecart.com/docs/subscription-saver/
- Sublium’s documentation describes cancellation-flow steps that may include reasons, benefits, and other components. Treat this as a product-pattern example. Source: https://sublium.com/docs/cancellation-flow/

## Verified ArraySubs behavior from current code

### What the customer is currently asked

- The core cancellation flow is loaded from `arraysubs/src/Boot.php`; Pro does not replace the survey step.
- Default reasons in `arraysubs/src/functions/settings-helpers.php` are: too expensive, not using, found an alternative, missing features, technical issues, temporary pause, and other.
- The live Retention Flow admin page can enable/disable the reason requirement and edit/reorder reason keys and labels. See `arraysubs/src/resources/pages/RetentionFlow/index.jsx`.
- The customer portal currently asks one primary reason in a select. Choosing the key `other` displays a free-text “Other reason” field. See `arraysubs/src/Features/CustomerPortal/views/view-subscription.php` and the `CancelModal` code in `arraysubs/src/resources/customerPortal.js`.
- The cancellation controller validates the customer’s subscription ownership and stores reason/details through the cancellation helpers.
- `form_builder_enabled` and `form_config` exist in settings/controller code, but no current customer-portal consumer was found. Do not describe the current product as a live arbitrary multi-question cancellation survey builder.

### What is stored and reported

- Cancellation reason/details are stored on the subscription. `RetentionLogger` also writes events with customer ID, subscription ID, product ID, reason, details, tenure/payment snapshots, and recurring amount to the core `arraysubs_retention_logs` table.
- This is linked customer/subscription data, not anonymous survey data. No native cancellation-response retention/anonymisation policy was found in the inspected flow. The merchant needs a stated purpose, access controls, retention/deletion schedule, and export/deletion handling appropriate to applicable law.
- Core Retention Analytics groups `cancelled` and `scheduled_cancel` event rows for reason reporting. A scheduled end-of-period cancellation can generate both event types over its lifecycle, and the inspected reason query does not deduplicate by subscription. Therefore the current chart should be described as a distribution of logged cancellation events, not necessarily unique cancelled subscriptions.
- Editing a label while retaining a stable key helps continuity, but changing a key, merging categories, or changing the question/order creates a measurement break unless a versioned mapping is maintained.

### Accessibility code finding

- The current cancellation modal has dialog labelling, focuses the reason select when opened, shows an inline validation error, closes on Escape, and attempts to restore focus.
- Static inspection did not find Tab/Shift+Tab focus containment or inerting of the page behind the dialog. The adjacent retention modal also lacks explicit focus entry/return handling. Do not claim conformance without browser, keyboard, and assistive-technology testing.

## Original primary-reason taxonomy

Question stem: **“What is the main reason you’re cancelling?”**

Ask for one answer. The labels should be adapted to the merchant’s product and pretested. The stable keys should not be casually renamed after launch.

| Stable key | Customer-facing answer | Include when | Exclude / routing note |
|---|---|---|---|
| `value_mismatch` | The subscription costs more than the value I get | The customer still has budget but judges the value insufficient | Keep separate from a temporary budget shock; may inform pricing/positioning or downgrade research |
| `budget_change` | My budget changed | Affordability changed independently of product quality | Avoid asking for income, debt, employment, or other unnecessary financial details |
| `temporary_no_need` | I do not need it for a while | Need may resume after a temporary interruption, overstock, travel, or seasonality | Candidate for pause/skip only if operationally suitable |
| `no_longer_need` | I no longer need this type of subscription | The underlying job/need ended | Do not treat as a product defect automatically |
| `poor_outcome_or_quality` | It did not deliver the results or quality I expected | Outcome/quality fell short | Keep separate from missing capability and technical failure |
| `missing_capability_or_fit` | It is missing something I need | A required feature, product option, service, or tier fit is absent | Optional follow-up can identify the blocked job; avoid promising roadmap delivery |
| `technical_or_service_problem` | I had a technical, delivery, billing, or support problem | A service failure drove cancellation | A merchant with enough volume should split this broad operational category into pretested subcategories |
| `switched_alternative` | I switched to another option | A competitor, substitute, in-house solution, or manual process displaced it | Naming the alternative should be optional |
| `other` | Another reason | None of the defined categories fits | Trigger an optional scoped text field; monitor this rate to find taxonomy gaps |
| `prefer_not_to_say` | Prefer not to say | The customer does not want to disclose a reason | Must not trigger pressure, penalty, or an offer inferred from missing data |

The `technical_or_service_problem` option is intentionally marked for vertical-specific refinement. A physical-goods subscription may need delivery, inventory, quality, and customer-service categories; software may need reliability, usability, integrations, security, and support. Do not force one universal list across unlike products.

## Optional follow-up question bank

Only ask a follow-up if it changes a defined decision. Keep it optional unless there is a documented necessity.

| Trigger | Follow-up | Suggested answer form | Decision it can support | Privacy/bias caution |
|---|---|---|---|---|
| `value_mismatch` | “Which best describes the value issue?” | Price is too high; I use too little; results are too small; benefits are unclear; other; prefer not to say | Pricing, onboarding, tier design, or positioning | Do not lead with a discount or ask what the customer can afford |
| `budget_change` | “Is this change likely to be temporary?” | Yes; no; not sure; prefer not to say | Pause/skip eligibility or win-back timing | Do not request income, employer, debt, or hardship details |
| `temporary_no_need` | “When might you need it again?” | Next cycle; 2–3 cycles; later; not sure; prefer not to say | Pause/skip length or permission-based reminder | Avoid precise life-event questions |
| `poor_outcome_or_quality` | “What fell short?” | Product quality; promised result; consistency; fulfilment/delivery; other; prefer not to say | Quality and operations review | Keep claims neutral; do not imply customer fault |
| `missing_capability_or_fit` | “What did you need to do that you could not?” | Optional short text with a character limit | Product discovery and tier design | Warn against personal/sensitive data; never promise a feature in exchange for not cancelling |
| `technical_or_service_problem` | “Which area caused the most difficulty?” | Billing; access/login; reliability; delivery; support; other; prefer not to say | Ownership and incident categorisation | Never ask for passwords, authentication codes, full card data, medical data, or secrets |
| `switched_alternative` | “What mattered most in your choice?” | Price; feature/fit; quality; ease of use; reliability; support; availability; other; prefer not to say | Competitive research | Asking for the alternative’s name should be a separate optional field, not required |
| `other` | “In a sentence, what was the main reason?” | Optional short text | Discover unrepresented categories | Add: “Do not include passwords, payment-card details, or sensitive personal information.” |

Optional final item: **“What one change would most increase the chance that you return?”** Use a short optional text field. This is exploratory, not a promise or a reason to delay cancellation.

Separate consent item if follow-up is genuinely offered: **“May our support team contact you about this feedback?”** with an unchecked opt-in. Contact permission is not consent for unrelated marketing.

## Taxonomy worksheet for editors and analysts

For every answer choice, record:

| Field | Purpose |
|---|---|
| Stable key | Joins events over time without relying on editable copy |
| Display label and locale | Shows the exact language the respondent saw |
| Survey version | Identifies wording/order/taxonomy changes |
| Inclusion and exclusion rule | Makes coding consistent and keeps categories distinct |
| Follow-up and skip logic | Prevents irrelevant questions |
| Decision owner | Identifies who can act on the answer |
| Minimum reporting threshold | Reduces disclosure risk for small groups |
| Sensitivity flag | Triggers additional privacy/security review |
| Retention period | Defines when raw text and structured response are deleted or anonymised |
| Historical mapping | Preserves comparability when keys are split, merged, or retired |

## What to measure

- **Flow-entry count:** customers who opened the cancellation flow.
- **Reason response rate:** valid primary-reason responses ÷ eligible flow entrants. If the reason is required, also report flow abandonment; a near-100% item response can be mechanically forced.
- **Prefer-not-to-say rate:** this is a valid answer, not missing data.
- **Other rate:** a high or rising rate can indicate taxonomy gaps or confusing labels.
- **Optional-text completion rate and median length:** monitor burden; do not celebrate more personal data by default.
- **Reason distribution:** report denominator, date range, survey version, product/gateway scope, and whether rows are events or unique subscriptions.
- **Edit/backtrack rate:** frequent changes can identify overlap or ambiguous labels if instrumented.
- **Outcome by reason:** cancellation type, accepted offer, later paid renewal, refund, support contact, complaint, and return. Treat associations as descriptive unless the design supports causal inference.

### Bias and interpretation cautions

- Exit-survey respondents are not all subscribers; they are people who reached a cancellation context and continued far enough to answer.
- A required reason can trade item completeness for arbitrary choice, abandonment, or frustration.
- Fixed option order can create order effects. Randomisation can help some lists, but should not scramble meaningful logical order or accessibility; pretest before changing.
- An offer shown immediately after a reason can influence future answer behavior if customers learn which response unlocks a benefit.
- Taxonomy/wording/order changes can create artificial trends. Version the instrument and annotate breaks.
- A reason is often a compressed account of several causes. Asking for the **main** reason supports routing, but it does not prove root cause.
- Small subgroup tables can expose individuals or create unstable narratives. Set minimum reporting thresholds and suppress overly granular cuts.

## Survey review protocol

1. Write the decision each question supports. Remove questions without a decision or legal/operational need.
2. Define every category’s inclusion/exclusion rule and confirm that “Other” and “Prefer not to say” are available.
3. Run cognitive interviews with people resembling customers: ask them to explain what each option means and how they selected it.
4. Pilot the flow and inspect missingness, abandonment, “Other,” answer changes, support contacts, and free-text risk.
5. Test translations separately; translated categories can overlap even when the source language does not.
6. Test keyboard, screen reader, zoom/reflow, error/status announcements, and focus behavior.
7. Approve purpose, lawful basis where applicable, access, security, retention, deletion/export, and incident handling before collecting text.
8. Freeze a version for a reporting period. Version and map any later changes.

## Screenshot and UI evidence opportunities

### Production screenshot pass — 2026-07-22

The confirmed local staging site was exercised with a synthetic subscription. The current reason configuration, one customer primary-reason dialog, the configured save-offer dialog, and one synthetic Retention Analytics event were captured and published. No real customer text, offer acceptance, or cancellation was used.

- `screenshots/live-ui/a072-cancellation-reasons-original.png` → `cancellation-reasons.png`
- `screenshots/live-ui/a075-cancellation-survey-modal-original.png` → `customer-reason-dialog.png`
- `screenshots/live-ui/a074-customer-save-offers-original.png` → `customer-save-offers.png`
- `screenshots/live-ui/a070-retention-analytics-original.png` → `retention-analytics.png`

The annotation helper could not reliably locate the requested retention targets, so clean originals were published without callouts. Captions emphasize that operational records are not anonymous survey responses and that offer exposure can bias reason interpretation.

No screenshots were captured for this research task. Later original captures could show:

1. Retention Flow reason editor with stable keys and editable/reorderable labels.
2. Customer cancellation dialog with the primary-reason select.
3. Conditional “Other reason” field and its inline validation state.
4. Retention offer triggered by a chosen reason, with a caption warning that answer-linked incentives can alter responses.
5. Core reason chart and activity log using synthetic data, with an explicit “logged events, not necessarily unique subscriptions” caption.
6. A proposed reporting worksheet showing survey version, denominator, missingness, “Other,” and prefer-not-to-say rates.

Use fake names, emails, customer IDs, order/subscription IDs, text responses, and economics. Free text is especially likely to contain personal information and should be redacted rather than merely cropped.

## Internal-link recommendations

- Save-offer selection: `/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/` (A074)
- Experiment design: `/retention-and-churn/how-to-ab-test-subscription-retention-offers-without-hurting-cx/` (A076)
- Segmentation: `/retention-and-churn/retention-segmentation-by-tenure-plan-payment-method-and-engagement/` (A077)
- Flow foundation: `/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/` (A073)
- Churn foundation: `/retention-and-churn/subscription-churn-voluntary-vs-involuntary-and-why-it-matters/` (A072)
- Feature anchor: `/features/subscription-retention/`
- Recipe: `/recipes/add-cancellation-surveys-to-subscriptions/`

Link A073 near the unobstructed-flow discussion, A074 beside reason-to-offer routing, A076 beside causal measurement, and A077 beside subgroup reporting. Put the recipe CTA after the full question/privacy protocol, not before it.

## Claims to avoid

- “These are the best cancellation questions” without merchant-specific pretesting.
- “Survey answers reveal why customers churn” without acknowledging context, nonresponse, wording, and selection bias.
- “Anonymous” or “unlinked” for current ArraySubs cancellation logs.
- “ArraySubs has a multi-question cancellation survey builder” based only on stored `form_config` settings.
- “100% response rate” when a required field simply blocked nonresponse; report abandonment and prefer-not-to-say.
- Reason-chart counts as unique cancellations without deduplication.
- Publishing a downloadable template before privacy, legal, accessibility, and domain review.
