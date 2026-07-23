---
title: "Cancellation Survey Questions That Produce Useful Data"
meta_title: "Cancellation Survey Questions That Produce Useful Data"
meta_description: "Use neutral cancellation survey questions, stable reason codes, optional detail, privacy controls, quality metrics, and evidence review to produce actionable subscription data."
focus_keyphrase: "cancellation survey questions"
published: "2026-06-07"
updated: "2026-07-20"
last_verified: "2026-07-22"
author: "ArraySubs Editorial Team"
reviewer: "ArraySubs Product Team"
---

# Cancellation Survey Questions That Produce Useful Data

The most useful cancellation survey asks one neutral primary question—“What is the main reason you're cancelling?”—with a short, tested set of options, Other, Prefer not to say, and optional detail. It preserves the raw answer, maps it to a stable versioned code, and joins operational evidence later. It does not turn cancellation into a mandatory research interview.

> **Direct answer:** ask the minimum needed to prioritize action. Use short single-concept choices across price, value, usage, service, technical reliability, and external change; provide Other and Prefer not to say; keep free text optional; and measure missing, Other, uncodable, duplicate, and version effects before trusting the chart.

Good data does not come from more required fields. It comes from clear wording, relevant coverage, stable identifiers, respectful capture, journey deduplication, privacy controls, and an honest distinction between what the customer said and what the team later infers.

## Key takeaways

- Ask one primary reason, not a long multi-page survey.
- Keep every option neutral, concrete, and about one idea.
- Include Other with optional text and Prefer not to say.
- Store stable keys separately from display labels and version every reason set.
- Preserve raw answers; never overwrite them with an analyst's hypothesis.
- Keep free text optional and restricted because it may contain sensitive information.
- Deduplicate scheduled and final cancellation events before reporting reason shares.
- Watch wording, option order, offer eligibility, and abandonment as sources of bias.
- Do not publish live customer quotes or free text without appropriate permission and privacy review.
- Keep direct cancellation clear even when a survey or save offer exists.

![A short cancellation survey feeding a privacy-protected versioned codebook and quality metrics](/blogs/cancellation-survey-questions-that-produce-useful-data/featured-image.png)

## The recommended primary question

![One primary cancellation question with seven reason families, Other, Prefer not to say, and optional detail](/blogs/cancellation-survey-questions-that-produce-useful-data/one-primary-question.png)

Use:

> **What is the main reason you're cancelling?**

Recommended starting options:

1. It costs too much right now.
2. It isn't valuable or the right plan for me.
3. I'm not using it or don't need it right now.
4. I had a poor service, delivery, or support experience.
5. Something technical didn't work.
6. My circumstances changed.
7. Other.
8. Prefer not to say.

Optional text:

> **Anything else you want us to know?** (Optional)

This is an original starting instrument, not a universal standard or an ArraySubs default. Pretest it with the real products, languages, customer vocabulary, and operational problems. A physical replenishment service may need an inventory/cadence choice. A B2B application may distinguish integration from missing capability. A membership may need content or community fit.

### Why “main reason”

Customers often have several contributing reasons. Asking for the main one creates one primary code for reporting while optional detail preserves nuance. It does not prove causality. Analysts can add reviewed contributing codes later without turning one customer journey into several numerator rows.

### Why Prefer not to say

It provides a truthful response when the customer does not want to disclose a reason. Do not combine it with Other or missing. The current ArraySubs default set inspected for this article includes Other but not Prefer not to say; merchants can consider adding it through configuration after testing stable-key and historical-reporting behavior.

### Why optional detail

Text discovers gaps and captures nuance but requires more effort and can contain sensitive data. [Pew Research Center's discussion of open-ended nonresponse](https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/) notes that effort, placement, and prompt can affect response. Optional detail preserves an exit without requiring an essay.

## Useful versus biased questions

![A comparison of neutral single-concept cancellation questions with leading, double-barrelled, forced, or incentive-biased alternatives](/blogs/cancellation-survey-questions-that-produce-useful-data/useful-vs-biased-questions.png)

| Use | Avoid | Why |
|---|---|---|
| What is the main reason you're cancelling? | Why don't you see the value? | The second assumes the cause and blames the respondent |
| It costs too much right now | The price and quality aren't good | The second asks two concepts in one option |
| Something technical didn't work | The app is buggy | The second presumes a product defect before diagnosis |
| I'm not using it or don't need it right now | I forgot to use all the great features | The second is promotional and leading |
| Anything else you want us to know? (Optional) | Explain why you are leaving (Required) | The second adds burden and can create cancellation friction |
| Prefer not to say | Select a reason to unlock cancellation | The second coerces disclosure |

[Pew's questionnaire guidance](https://www.pewresearch.org/writing-survey-questions/) recommends pretesting and explains that open versus closed format, option wording, and option order can influence results. It also recommends reasonably exhaustive, mutually exclusive choices and avoiding complex or double-barrelled wording. Those principles do not establish which reason is common in your customer base.

[GOV.UK's question-design guidance](https://www.gov.uk/service-manual/design/designing-good-questions) supports short clear questions and closed options when they reduce effort. Its [form-structure guidance](https://www.gov.uk/service-manual/design/form-structure) recommends documenting why information is needed, how it will be used, who needs it, validation, security, and relevance.

## A question bank for optional research

The primary cancellation transaction should remain short. Use the questions below selectively in follow-up research, optional conditional detail, support conversations, or a separately consented survey. Do not display all of them in every cancellation.

### Price and plan fit

- Was the current price unaffordable, unexpected, or not worth the value you received?
- Would a different billing frequency or smaller plan have fit better?
- Did a price or discount change affect your decision?
- Which part of the plan felt unnecessary for your needs?

### Value and outcomes

- What outcome did you expect when you subscribed?
- What prevented you from reaching that outcome?
- Was a specific capability missing?
- Did another product or approach fit better? What mattered about it?

### Usage and timing

- Did you need the subscription less often than expected?
- Was the renewal or delivery cadence too frequent?
- Is your need temporary, seasonal, or finished?
- Would a one-cycle skip or defined pause genuinely help?

### Service and fulfillment

- Was there a delivery, quality, support, or communication problem?
- Was the issue resolved when you contacted us?
- Did the same problem happen more than once?
- What would a fair resolution have looked like?

### Technical reliability

- What were you trying to do when the issue occurred?
- Which feature, integration, device, browser, or payment step was affected?
- Did you contact support or see an error message?
- Did the issue prevent a key outcome or merely add friction?

### External change

- Is the change temporary or permanent? (Only ask when this distinction serves a clear purpose.)
- Would you like an optional reminder when the service might be relevant again?

Do not probe for health, finances, family, employment, or other sensitive circumstances unless necessary, lawful, appropriately consented, and securely handled. “My circumstances changed” can be sufficient.

## What the current ArraySubs flow asks

The current Retention Flow admin page can require a cancellation reason and configure reason entries. The inspected staging setup showed seven defaults:

- Too expensive;
- Not using it enough;
- Found a better alternative;
- Missing features I need;
- Technical issues;
- Just need a temporary break;
- Other.

![The ArraySubs cancellation-reason configuration with editable reason entries and a required-reason setting](/blogs/cancellation-survey-questions-that-produce-useful-data/cancellation-reasons.png)

These are software defaults, not a benchmark or validated universal taxonomy. The current customer flow presented one primary selector and conditional Other detail:

![The staging customer cancellation dialog asking for one primary reason](/blogs/cancellation-survey-questions-that-produce-useful-data/customer-reason-dialog.png)

This is not an arbitrary multi-question survey builder in the inspected implementation. The article's optional question bank is editorial guidance for research design, not a claim that each question can be configured in the current portal.

The source review confirmed that cancellation processing can store reason and details with the subscription and record actor/type context. Retention log rows can include reason, detail, initiator, product, recurring amount, age, payment count, and offer context. Those logs are linked operational records, not anonymous survey responses.

## Store a versioned reason record

For each journey, preserve:

| Field | Purpose |
|---|---|
| Journey ID | Deduplicate request, offer, pending, final, and undo events |
| Subscription/customer internal IDs | Join context internally; redact from publication |
| Capture and effective-cancel timestamps | Separate intent from terminal outcome |
| Initiator | Customer, administrator, system, gateway, unknown |
| Reason-set and form version | Preserve comparability |
| Raw option key and label | Record exactly what was selected/shown |
| Raw optional text | Qualitative evidence with restricted access |
| Normalized family/subcode | Stable reporting layer |
| Cancellation type | Immediate or end of period |
| Offer eligibility, shown, accepted | Explain incentives and exposure |
| Later outcome | Undo, terminal cancellation, retained state, paid renewal |
| Product, plan, tenure, gateway | Segmentation context |

Never reuse an old stable key for a new meaning. If `not_using` becomes separate `low_usage` and `cadence_too_frequent` choices, create a new reason-set version. Preserve the old answer and use a documented crosswalk for broad trend comparison.

Record these separately:

- Other: the customer chose an available catch-all;
- Prefer not to say: the customer explicitly declined disclosure;
- Not provided: no response was captured;
- Uncodable: text exists but reviewers cannot assign a supported code;
- Unknown initiator: the journey source is not known.

Combining them hides different instrument and data-quality problems.

## Code text without inventing certainty

Use a repeatable review protocol:

1. Define a bounded sample, period, products, and inclusion rules.
2. Remove unnecessary identifiers from the coding view.
3. Create definitions, inclusion/exclusion rules, and examples for each code.
4. Have two reviewers independently code a subset.
5. Discuss disagreements and refine the codebook.
6. Retain one primary code and optional contributing codes.
7. Use Cannot determine instead of guessing.
8. Record codebook version and reviewer/date.
9. Review Other, missing, and uncodable cases on a schedule.
10. Restrict raw text and delete it according to the approved retention policy.

Do not claim high reviewer agreement without naming the statistic, sample, and result. Do not automatically feed raw personal text into an external model without an approved privacy, security, access, and retention assessment.

## Survey quality metrics

![Six survey-quality metrics covering completion, missing responses, Other, uncodable text, duplicate events, and reason-set version](/blogs/cancellation-survey-questions-that-produce-useful-data/survey-quality-metrics.png)

### Completion and missingness

```text
reason completion rate
= journeys with a valid provided primary response / eligible cancellation journeys

missing-reason rate
= journeys with no provided reason / eligible cancellation journeys
```

If the reason is technically required, completion can still be misleading. Customers may abandon, use alternate support routes, allow payment failure, or select the least-wrong option.

### Other and Prefer not to say

```text
Other rate
= journeys selecting Other / journeys with a provided response

Prefer-not-to-say rate
= journeys selecting Prefer not to say / journeys with a provided response
```

A rising Other rate may reveal missing categories, confusing labels, or a new problem. A high Prefer-not-to-say rate may suggest the question feels intrusive or irrelevant. Investigate without pressuring customers.

### Uncodable text

```text
uncodable rate
= free-text responses reviewers cannot code / free-text responses reviewed
```

Track disagreement separately. An uncodable response is not noise to delete; it can reveal an unclear codebook or insufficient context.

### Duplicate event rate

```text
duplicate event ratio
= cancellation-related event rows / unique cancellation journeys
```

This is a diagnostic, not a survey rate. If scheduled and final cancellation rows both carry the same reason, event counts can exceed unique journeys.

### Version coverage

Always show the reason-set version and effective date in quality reporting. A trend that crosses a wording or option change needs a crosswalk and a visible break marker.

## Current analytics needs journey deduplication

The current Retention Analytics reason chart can use both scheduled and final cancellation event rows. One end-of-period journey can therefore contribute more than once. Missing event reasons can also fall back to current subscription metadata, which may differ from immutable event-time evidence if later changed.

![Retention Analytics showing synthetic operational event evidence that needs deduplication before survey reporting](/blogs/cancellation-survey-questions-that-produce-useful-data/retention-analytics.png)

The current summary is operationally useful but does not expose a native survey-version, gateway, initiator, subcode, root-cause, or unique-journey analysis layer. Export or transform records into a versioned journey table before publishing reason shares.

### Illustrative quality example

This is invented data, not an ArraySubs benchmark. Suppose 120 unique voluntary cancellation journeys occur:

- 100 choose a specific coded reason;
- 12 choose Other;
- three choose Prefer not to say;
- five have no response;
- the event table contains 150 cancellation rows because some scheduled and final events repeat the journey.

```text
provided response rate = 115 / 120 = 95.8%
missing rate = 5 / 120 = 4.2%
Other share among provided = 12 / 115 = 10.4%
Prefer not to say share among provided = 3 / 115 = 2.6%
```

Deduplicate 150 rows to 120 journeys before calculating those values. If category shares exclude Other and Prefer not to say, disclose the restricted denominator.

## Biases to document

### Selection bias

Only customers who reach and complete the flow answer. Support cancellations, disputes, abandonment, and payment failures may represent different populations.

### Wording and order effects

Changing “Too expensive” to “Temporary budget issue” changes meaning. Placing an option first can affect selection. Store the version and option order where relevant.

### Incentive bias

If one answer reveals a discount or pause, customers can learn to choose it. Reason-targeted offers can therefore change the measurement instrument.

![A staging save-offer dialog illustrating how reason-triggered incentives can affect interpretation](/blogs/cancellation-survey-questions-that-produce-useful-data/customer-save-offers.png)

Track offer eligibility/shown by reason and avoid treating the selected answer as independent of the flow.

### Recall and recency

A recent incident, renewal reminder, shipment, or price message can dominate the answer. Preserve timing and join operational evidence.

### Social desirability

Customers may choose a less confrontational reason. Neutral labels, Other, Prefer not to say, and optional text reduce pressure.

### Small samples and privacy

Always publish counts beside percentages. Suppress or combine small segments where necessary to protect identity and avoid unstable conclusions.

## Question-to-decision governance

![A governance flow from asking through raw storage, coding, joined evidence, review, and versioned change](/blogs/cancellation-survey-questions-that-produce-useful-data/question-to-decision.png)

### Before launch

- Define the decision each question supports.
- Assign an owner and approved users.
- Pretest comprehension and coverage.
- Document stable keys, labels, order, version, and effective date.
- Define Other, Prefer not to say, missing, and invalid behavior.
- Approve privacy notice, access, retention, and deletion.
- Test accessibility, mobile, translation, errors, and direct cancellation.
- Verify analytics and deduplication.

### Weekly

- Review urgent safety, support, technical, delivery, or billing themes.
- Monitor missing, Other, uncodable, duplicate, and form-error changes.
- Check offer exposure and inappropriate reason-to-offer mappings.

### Monthly

- Report deduplicated counts and shares by product, plan, tenure, and renewal number.
- Join support, usage, fulfillment, pricing, and gateway evidence.
- Assign hypotheses and owners.
- Review changes made previously and counterexamples.

### Quarterly

- Review code coverage and reviewer consistency.
- Merge or split only when actionability and evidence justify it.
- Version every change and maintain a crosswalk.
- Reassess access and text-retention needs.
- Retire unused options without rewriting history.

## Pretest the survey before collecting trend data

Do not launch a reason set solely because the labels look sensible to the internal team. Run several forms of pretest.

### Comprehension review

Ask relevant participants to explain every option in their own words. Give them realistic cancellation situations and ask which choice fits best and why. Look for:

- two labels interpreted as the same thing;
- one label containing multiple concepts;
- internal terminology customers do not use;
- judgmental or promotional wording;
- scenarios with no plausible answer;
- sensitive questions participants would rather not answer;
- reasons that are clear but not actionable.

The objective is not perfect exclusivity. Real decisions have overlapping causes. The objective is a defensible primary answer with a safe Other path.

### Coverage review

Take a privacy-reviewed sample of earlier support contacts, cancellation text, product reviews, delivery incidents, and failed journeys. Map each to the draft options. Do not expose personal text to a larger team than necessary. When many examples fall into Other, determine whether one stable actionable concept is missing or whether the responses are legitimately rare and diverse.

### Interaction review

Test the actual dialog on desktop and mobile with keyboard, screen reader, zoom, long translations, slow network, errors, and session expiry. Confirm:

- the question and each option are programmatically labelled;
- selected state is announced;
- required/optional status and errors are clear;
- Other reveals detail without losing focus or selection;
- Prefer not to say continues normally;
- optional text accepts the expected length and characters safely;
- Continue shows loading and prevents duplicate submission;
- failure preserves answers and never claims success;
- declining an offer still reaches cancellation directly;
- closing returns focus appropriately.

### Data review

Use synthetic journeys to verify the stored key, displayed label, reason-set version, actor, timestamps, detail, cancellation type, offer event, and later status. Confirm the same end-of-period journey can be deduplicated when scheduled and terminal events exist. Check exports for formula injection, encoding, line breaks, access control, and accidental exposure of raw text.

### Pilot and freeze

Pilot the reason set for a defined period or product scope. Publish in advance:

- expected journey count;
- success and guardrail measures;
- minimum sample for review;
- date the codebook will freeze;
- rollback conditions for errors, abandonment, complaints, or obstructed cancellation;
- owner for urgent technical/support themes.

During the pilot, do not repeatedly edit labels. Every wording change alters the instrument. If a serious issue requires a change, increment the version and mark the break.

## Build a publication-quality reason report

A reliable monthly report begins with scope, not a pie chart.

### Scope panel

State:

- reporting date range and data extraction date;
- included products, plans, countries, currencies, and channels;
- customer-initiated cancellation definition;
- request-time or terminal-time clock;
- reason-set versions and crosswalk;
- deduplication key and rule;
- included/excluded statuses and initiators;
- total unique eligible journeys;
- missing, Other, Prefer not to say, and uncodable treatment.

### Quality panel

Show counts and rates for:

- completed primary responses;
- missing responses;
- Other;
- Prefer not to say;
- optional-text response;
- uncodable text;
- reviewer disagreement where measured;
- duplicate event rows per journey;
- abandoned or errored flows where observable;
- journeys with unknown initiator or version.

### Distribution panel

Show unique-journey counts and shares for each primary family. Do not silently remove Other, Prefer not to say, or missing from the visual. If the category chart uses a coded-response denominator, place the excluded counts beside it.

For every segment, display the count. Limit granular cross-tabs when small cells could identify a customer or produce unstable conclusions. A product with four cancellations should not be ranked against one with hundreds as if the uncertainty were equal.

### Evidence panel

For the largest or fastest-changing categories, add:

- joined product, plan, tenure, renewal, usage, support, fulfillment, price, or technical signals;
- privacy-reviewed paraphrased themes, not casual live quotes;
- competing hypotheses and counterexamples;
- prior action, owner, and measured outcome;
- what evidence would disconfirm the current hypothesis.

### Action panel

Turn each selected priority into a decision record:

| Field | Example content |
|---|---|
| Observed segment | New annual-plan customers in first renewal |
| Evidence | Low-use reason plus incomplete activation milestone |
| Hypothesis | Activation path does not demonstrate the core outcome |
| Action | Improve onboarding for the next cohort |
| Owner | Product/onboarding |
| Primary outcome | Activation completion and later paid renewal |
| Guardrails | Support contacts, refunds, complaints |
| Review date | After the cohort reaches the selected observation point |

Do not convert every large category into an offer. Price may need packaging analysis; technical needs an incident fix; low use may need onboarding or cadence; a life event may simply require respectful exit. The survey prioritizes investigation—it does not automate the answer.

## Handle high-risk text safely

Create a documented route for free text that mentions safety, fraud, legal threats, discrimination, health, self-harm, credentials, payment information, or a serious service incident. The coding team should not improvise. Define who is alerted, what information is shared, required response time, and how unnecessary personal data is minimized.

Do not put raw free text into ordinary product dashboards, chat channels, screenshots, or presentation decks. Use access-controlled tools, redact identifiers, and prefer aggregate themes. If a quote is necessary for research, obtain the permissions and review appropriate to the context, use the minimum excerpt, and avoid publishing details that make the person identifiable.

Automated coding can assist triage only after privacy, security, vendor, bias, accuracy, retention, and human-review controls are approved. Preserve the original answer, model/tool version, generated code, confidence or review state, and final human decision. Never silently replace raw evidence with an automated summary.

## Accessibility, ethics, and legal review

[WCAG 2.2](https://www.w3.org/TR/WCAG22/) criteria relevant to a survey dialog include keyboard access, logical/visible focus, labels, error identification, programmatic name/role/value, and status messages. The [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) provides focus guidance. These references do not certify the current product or a merchant's form.

Test that the question, required/optional state, choices, selected state, help, errors, loading, and success are perceivable and operable. Keep focus contained appropriately and restore it on close. Do not use survey validation to trap the customer.

The [FTC's dark-pattern report](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers) identifies cancellation obstruction and interfaces that trick people into giving up data as concerns. California's [Business and Professions Code §17602](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=9.&chapter=1.&division=7.&lawCode=BPC&part=3.&title=) has specific rules for covered online cancellation flows. Obtain jurisdiction-specific counsel; this article is not legal advice.

For privacy, the [ICO data-minimisation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/) supports limiting personal data to what is necessary, while its [storage-limitation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/) supports documented retention and deletion. Apply the requirements relevant to the merchant's jurisdiction with qualified review.

## Review checklist

- [ ] One neutral primary question is used.
- [ ] Every option contains one clear concept.
- [ ] Coverage was pretested with relevant customer language.
- [ ] Other includes optional detail.
- [ ] Prefer not to say is considered and separately coded.
- [ ] Free text is optional and protected.
- [ ] Stable keys and display labels are stored separately.
- [ ] The reason set has a version and effective date.
- [ ] Raw response and analytic/root-cause layers remain separate.
- [ ] Scheduled/final events are deduplicated into journeys.
- [ ] Missing, Other, uncodable, duplicate, and abandonment measures are visible.
- [ ] Offer exposure is treated as a source of bias.
- [ ] Direct cancellation remains clear and unobstructed.
- [ ] Accessibility, mobile, translation, slow-network, and error states are tested.
- [ ] Legal, privacy, access, retention, and publication rules are reviewed.

## Frequently asked questions

### How many cancellation survey questions should I ask?

Ask one primary reason in the cancellation transaction. Use optional detail or separate consented follow-up research only when it serves a defined decision.

### Should the reason be required?

A required primary choice can improve capture but not necessarily truth. Provide neutral coverage, Other, Prefer not to say, a clear exit, and track abandonment and alternate routes. Obtain UX and legal review.

### Should I ask an open-ended question?

Offer optional detail. It can discover missing concepts but requires more effort and privacy control. Do not require an essay to cancel.

### Can I publish customer comments?

Not by default. Free text may identify people or contain sensitive information. Obtain appropriate permission and privacy/legal review, minimize the excerpt, and remove unnecessary identifiers.

### Does ArraySubs provide a multi-question survey builder?

Not in the inspected cancellation flow. It supports configured primary reasons and details. The extended question bank here is a research resource, not a statement of current UI capability.

### Are Retention Analytics reason counts unique customers?

Not necessarily. The current implementation can count scheduled and terminal event rows from one journey. Deduplicate before publication.

## Verification environment and limits

This guide was verified on **July 22, 2026** against ArraySubs 1.8.11, ArraySubs Pro 1.1.2, current reason, cancellation, offer, and analytics source, plus a safe local staging cancellation flow with a synthetic subscription.

The staging pass confirmed the editable reason configuration, one primary reason selector, conditional Other detail, configured discount/pause offers, and one synthetic `offer_shown` event. No real customer data, offer acceptance, cancellation, controlled study, or published reason distribution was used. The recommended question set requires merchant-specific pretesting, accessibility/privacy review, and appropriate legal review.

Continue with the [cancellation reason taxonomy](/retention-and-churn/why-customers-cancel-subscriptions-a-reason-taxonomy/), [effective cancellation flow](/retention-and-churn/anatomy-of-an-effective-subscription-cancellation-flow/), and [subscription save-offer comparison](/retention-and-churn/subscription-save-offers-compared-discount-pause-skip-or-downgrade/).

## Primary sources

- [Pew Research Center: Writing survey questions](https://www.pewresearch.org/writing-survey-questions/)
- [Pew Research Center: Open-ended question nonresponse](https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/)
- [GOV.UK: Designing good questions](https://www.gov.uk/service-manual/design/designing-good-questions)
- [GOV.UK: Form structure](https://www.gov.uk/service-manual/design/form-structure)
- [ICO data minimisation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/)
- [ICO storage limitation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [FTC report on dark patterns](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers)

## Verification and update log

- **2026-07-22:** Verified current ArraySubs reason capture, customer flow, storage/analytics semantics, gateway/offer context, and safe staging evidence.
- **2026-07-20:** Editorial update date assigned for the initial publication package.
