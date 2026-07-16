# Research: Partial Content Restriction—SEO, Conversion, and Reader Experience

## Research record

- Brief: `articles/053-partial-content-restriction-seo-conversion-and-reader-experience.md`
- Researched: 2026-07-16
- Intent: editorial strategy plus implementation
- Primary query: `partial content restriction WordPress SEO`
- Product scope inspected: ArraySubs core Members Access `1.8.11`, Gutenberg and Elementor integrations
- Evidence: current source, read-only mirror inspection, primary Google documentation
- Caveat: default ArraySubs partial gating does not make omitted premium HTML indexable and is not a substitute for securing linked media/download files.

## Direct answer for the opening

> Partial content restriction can preserve organic usefulness and create a membership conversion moment by leaving a complete public answer above a server-side gate. ArraySubs can gate shortcode, Gutenberg block, or Elementor Container content while returning a message to denied visitors. Only the public response is crawlable by default, so gate depth should follow intent and measured reader behavior.

## Key takeaways

1. Give the reader a real answer before the gate; do not turn the search result into a bait-and-switch.
2. ArraySubs removes or replaces the protected fragment server-side for denied visitors—it does not merely hide it with CSS.
3. The shortcode, Gutenberg block, and Elementor Container converge on the same restriction handler but have surface-specific behavior.
4. Partial HTML gating does not secure images, PDFs, videos, or API endpoints linked from the protected section.
5. Test gate depth as a funnel with organic and member-experience guardrails rather than relying on a universal word count or percentage.

## Verified ArraySubs surfaces

### Shortcode

`[arraysubs_restrict]...[/arraysubs_restrict]` passes the enclosed content, conditions, operator, messages, and related settings through the content-gating handler. The current shortcode syntax supports a top-level AND/OR condition mode but not arbitrary nested condition-group syntax.

### Gutenberg

The dynamic `arraysubs/content-restricted` block is rendered on the server. Its render callback delegates to the shortcode/restriction behavior with the block’s pre-rendered inner content. Members Access settings appear in the block editor while the inner content remains editable.

### Elementor

ArraySubs adds restriction controls to an Elementor Container’s Advanced settings. The implementation buffers the container output and sends it through the restriction handler on the front end. A shutdown guard discards an unclosed protected buffer, favoring failure closed if rendering stops unexpectedly.

### PHP

The Content Gate help UI also documents PHP/API usage for developers. Present this as a developer integration surface, not the first recommendation for editors.

Evidence:

- `arraysubs/src/Features/MembersAccess/Services/ContentGating.php`
- `arraysubs/src/Features/MembersAccess/Integrations/Gutenberg/`
- `arraysubs/src/Features/MembersAccess/Integrations/Elementor/`
- `arraysubs/src/Features/MembersAccess/resources/components/ContentGateTab.jsx`

## Rendering and editor caveats

- In normal denied front-end rendering, the protected HTML is replaced/omitted server-side rather than shipped and hidden with CSS.
- Gutenberg/Elementor partial gates intentionally avoid redirecting the whole request after output has started. A denial message is the appropriate partial-section behavior.
- Administrators can see protected content by default. Use the “show to admin” control appropriately and QA with a normal denied account.
- A restriction with no actual condition behaves as unrestricted; this prevents an empty builder from silently gating everything but must be part of prepublish review.
- In editor/Elementor preview contexts, content remains editable and normal front-end gating is bypassed.
- The Gutenberg integration’s shortcode fallback can return raw content if the shortcode handler is unavailable. Test what happens when Members Access or the plugin is disabled, especially for confidential content. Use defense in depth for high-sensitivity material.

## SEO truth: what is actually crawlable

The guest response is the baseline for an ordinary crawler. ArraySubs does not grant Googlebot a membership entitlement in the inspected code. Therefore:

- the public introduction, headings, examples, links, and denial/CTA message can be crawled;
- the protected fragment omitted from the guest response ordinarily cannot be indexed;
- paywall schema does not reveal or unlock missing HTML;
- if the page should not be in search at all, use deliberate robots/indexing controls rather than an empty public shell;
- if the full paid article should be indexed under a publisher paywall policy, that requires a separate crawler-access and structured-data architecture.

Google’s paywall structured data can identify paid sections that Google can access and the publisher wants indexed. It is not an access-control feature.

## Gate-placement framework

Use an original **Resolve → Prove → Bridge → Gate** sequence:

1. **Resolve:** answer the primary query in a 40–60 word paragraph.
2. **Prove:** provide a real example, screenshot, definition, or original table that validates the answer.
3. **Bridge:** explain what deeper implementation/result the member section adds.
4. **Gate:** restrict the premium template, dataset, walkthrough, downloadable, or advanced procedure—not the basic answer.

This sequence is more defensible than stating that every article should gate after a fixed number of words.

### What belongs on each side

| Public side | Member side |
|---|---|
| Direct answer and key definitions | Full implementation walkthrough |
| Core decision framework | Downloadable template/workbook |
| One representative example | Complete case study/dataset |
| Limitations and trust signals | Advanced scenarios and member support |
| Clear description of membership value | Continuously updated premium material |

Avoid gating safety caveats, material limitations, or facts needed to assess whether a purchase is appropriate.

## Conversion and experience design

The denied message should:

- name what is protected;
- remind existing members to log in;
- state which plan/condition qualifies without exposing private account data;
- explain the value beyond the gate concretely;
- offer a pricing/membership CTA and a login CTA;
- preserve the reader’s place after authentication where possible;
- remain accessible with semantic headings, focus order, contrast, and keyboard operation.

Do not use false scarcity, obscure the price, or imply the public answer is complete if essential steps are hidden.

## Experiment design

Primary funnel:

`eligible page entrance → engaged public section → gate impression → pricing/login click → checkout start → membership purchase`

Example formulas:

- `gate click-through rate = unique pricing/login clicks ÷ unique gate impressions`
- `gate-to-member conversion = attributed new memberships ÷ unique gate impressions`

Compare gate variants only after ensuring comparable traffic and intent. Record the hypothesis, primary metric, guardrails, allocation, duration rationale, and stopping rule before launch.

Guardrails:

- organic clicks and indexed coverage;
- engagement/scroll to gate;
- return-to-SERP or bounce proxy;
- existing-member login completion;
- support contacts and authentication errors;
- refunds/cancellations;
- cache-related access incidents.

Do not publish made-up conversion lifts or universal “ideal gate depth.”

## Recommended article outline

1. Direct answer
2. What partial content restriction means
3. How server-side partial gating differs from CSS/JavaScript hiding
4. Shortcode, Gutenberg, Elementor, and PHP in ArraySubs
5. What Google can crawl in the guest response
6. Resolve → Prove → Bridge → Gate editorial method
7. Denial message and reader-experience checklist
8. Gate conditions and AND/OR logic
9. Experiment design and metrics
10. Cache, file, deactivation, and editor-preview caveats
11. Configuration examples for three content types
12. When partial gating is not a fit
13. FAQ

## Example applications

### Premium tutorial

Public: answer, prerequisites, architecture, representative screenshot, limitations.  
Member: exact configuration walkthrough, downloadable checklist, troubleshooting decision tree.

### Research report

Public: methodology, headline findings, one table, citations, limits.  
Member: full dataset, segments, workbook, update feed.

### Course lesson

Public: learning outcome and one useful concept.  
Member: lesson video, exercises, feedback, assessment. Protect media objects separately.

## Original QA checklist

- [ ] Guest page source does not contain the protected text.
- [ ] Logged-in denied user receives the correct message.
- [ ] Entitled member sees the complete fragment.
- [ ] Admin-preview behavior is understood and not mistaken for public behavior.
- [ ] No-condition state is deliberately open or fixed before publish.
- [ ] Logout/status change does not serve a stale member cache.
- [ ] Shortcode, Gutenberg, and Elementor output match where equivalent.
- [ ] Plugin/feature deactivation behavior is tested.
- [ ] Raw media/download/API URLs are separately authorized.
- [ ] Login and pricing links work and preserve context where possible.
- [ ] Google URL Inspection sees the intended guest response.
- [ ] Metadata and structured data accurately describe the public page.

## Official sources and claim map

- [Google: Subscription and paywalled content structured data](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) — markup, section selectors, crawler/access distinction, and server-side advice.
- [Google: Flexible Sampling](https://developers.google.com/search/docs/appearance/flexible-sampling) — lead-in/metering concepts and experimentation; avoid treating news-publisher examples as universal membership benchmarks.
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) — normal SEO requirements apply, indexed/snippet eligibility matters, and no special AI markup is required.
- [Google: Robots meta tag and data-nosnippet](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) — indexing and preview controls, not access control.
- [Google: Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — people-first usefulness, sourcing, and evidence.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — validate protected-resource authorization on every request.

## Internal-link plan

Verify routes:

- Feature: `/features/members-access/`
- Recipe: `/recipes/inline-content-gating/`
- Recipe: `/recipes/combined-conditions/`
- Sibling A049: SEO for gated content
- Sibling A050: protecting membership downloads
- Sibling A052: URL-based restriction
- Sibling A054: AND/OR rules

## Mirror screenshot opportunities

Primary route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/content-gate`

Capture plan:

1. Capture the Content Gate overview with markers on **Elementor**, **Gutenberg**, **Shortcode**, and **PHP**.
2. Capture a real Gutenberg Restricted Content block in a safe draft, marking the condition/operator controls and nested editable content; do not publish changes.
3. Alternatively capture an Elementor Container’s Advanced restriction settings in a safe draft.
4. If a preexisting front-end demo exists, capture a matched guest/member pair with markers on public answer, gate boundary, message/CTA, and member-only section.
5. Crop user data, post author information if sensitive, nonces, and credentials.

## Varied visual concepts

1. **Real app screenshot:** four Content Gate integration surfaces.
2. **Editorial scene:** a reader receives a useful field guide before a clearly labeled members’ workshop door.
3. **Server-response concept:** guest envelope contains intro + gate; member envelope contains intro + premium section.
4. **CTA wireframe:** denial card with value statement, member login, and plan comparison markers.
5. **Real editor screenshot:** annotated Gutenberg block or Elementor Container controls.
6. **Layered content shapes:** page HTML, protected media, and API data as separate objects requiring separate locks.
7. **Matched browser pair:** public and member pages at the same scroll point.

## Limitations, review, and update triggers

- Partial gating is not DRM or private file storage.
- High-sensitivity content may need a dedicated application with stronger fail-closed guarantees.
- Name an author plus editorial SEO and WordPress technical reviewers; include dates/change log.
- Recheck after ArraySubs shortcode/Gutenberg/Elementor behavior, Google paywall guidance, theme rendering, or cache architecture changes.
- Never promise rankings, AI citations, or guaranteed conversion gains.

