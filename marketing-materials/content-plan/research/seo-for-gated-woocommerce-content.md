# Research: SEO for Gated WooCommerce Content

## Research record

- Brief: `articles/049-seo-for-gated-woocommerce-content.md`
- Researched: 2026-07-16
- Intent: informational/strategic with ArraySubs implementation guidance
- Primary query: `SEO gated WooCommerce content`
- Product scope inspected: ArraySubs core Members Access `1.8.11`; Pro `1.1.2` only for feature-based conditions
- Evidence: current code, authenticated read-only mirror inspection, primary Google Search documentation
- Caveat: confirm public plugin version and live rendering before publication; the inspected code does not automatically emit paywall structured data, canonical tags, or `noindex` directives.

## Direct answer for the opening

> Gated WooCommerce content can rank only to the extent that search engines can crawl useful public material. With ArraySubs server-side gating, an unauthorized crawler receives the same teaser or denial output as a guest, not the protected body. Publish a substantial public answer, gate the premium section, keep metadata honest, and test the rendered guest response in Google Search Console.

This answer should appear in the first 150 words. Immediately distinguish “index the public teaser” from “index the complete paywalled article.”

## Key takeaways

1. Search engines index the response they can fetch. A premium body omitted server-side is not made indexable by adding schema.
2. ArraySubs does not inspect or whitelist Googlebot in the current implementation; a crawler without entitlement sees the guest response.
3. Partial gating is normally more search-friendly than replacing an entire page because the public introduction, evidence, and navigation remain available.
4. Google paywalled-content markup applies to paid content that Google can actually access and that the publisher wants indexed. It is not an access-control mechanism.
5. Validate guest, denied-user, entitled-user, cache, canonical, robots, structured data, and Search Console rendering independently.

## Verified ArraySubs rendering model

### Full-page/content-type gating

For denied visitors, ArraySubs can replace the main post content with the configured restriction message. Depending on rule settings, archive queries can also omit restricted items. The implementation is server-side in the WordPress request, not a CSS overlay.

Evidence:

- `arraysubs/src/Features/MembersAccess/Services/ContentGating.php`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`

The inspected service does not add Google paywall structured data, canonical tags, `noindex`, `nosnippet`, or a Googlebot entitlement exception. Those require a separate SEO/content strategy.

### Partial gates

ArraySubs supports inline restriction through:

- `[arraysubs_restrict]` shortcode;
- the server-rendered Gutenberg Restricted Content block;
- Elementor Container advanced controls;
- PHP helper/API usage.

The protected fragment is omitted or replaced for denied visitors while public content around it remains in the response. That public shell can be crawled. The protected fragment ordinarily cannot be indexed by a guest crawler because it is not present in that response.

Evidence:

- `arraysubs/src/Features/MembersAccess/Services/ContentGating.php`
- `arraysubs/src/Features/MembersAccess/Integrations/Gutenberg/`
- `arraysubs/src/Features/MembersAccess/Integrations/Elementor/`
- `arraysubs/src/Features/MembersAccess/resources/components/ContentGateTab.jsx`

### No crawler cloaking claim

Do not advise showing the full article only to a self-declared Googlebot. ArraySubs does not do so, and trusting a user agent would be weak access control. Google describes legitimate paywalled content as non-cloaking when Google can access it under the same publisher policy and the markup accurately identifies the gated sections. That is a different architecture from content that must never be delivered to an unauthorized response.

## Two valid SEO architectures

| Architecture | What a guest/crawler receives | What can rank | Best fit | Main caveat |
|---|---|---|---|---|
| Public answer + protected premium section | Useful intro, definitions, summary, proof, CTA; premium section omitted/replaced | Public portion and page topic | Courses, reports, member tutorials with an acquisition goal | Premium detail is not crawlable by default |
| Fully paywalled article with authorized crawler access | Full content under publisher’s controlled paywall policy plus matching markup | Potentially the full article | Publishers intentionally participating in Google paywall patterns | Requires a separate, carefully implemented access/crawler architecture; ArraySubs does not provide it automatically |

A third option is a fully private/noindex resource for customer value rather than acquisition. That page should not be assigned an organic traffic goal.

## Public-section framework

Recommend an original “ANSWER” framework rather than an arbitrary word count:

- **A — Answer:** directly resolve the query in 40–60 words.
- **N — Name the tradeoff:** state what remains gated and why.
- **S — Show evidence:** one original example, table, screenshot, or tested workflow.
- **W — Way forward:** give a useful public checklist.
- **E — Entitlement boundary:** mark exactly where premium material begins.
- **R — Relevant CTA:** offer login, plan comparison, or membership only after the public answer.

Do not invent a universal “best teaser percentage.” The right boundary depends on intent, query satisfaction, conversion economics, and whether the page is intended for search acquisition at all.

## Recommended article outline

1. Direct answer: what Google can and cannot index
2. Definitions: gated, paywalled, teaser, partial restriction, full restriction
3. How ArraySubs renders full and partial gates
4. Choose an SEO architecture before writing
5. Build a useful public section with the ANSWER framework
6. Metadata: title, description, canonical, robots, snippets, structured data
7. Paywall schema: when it applies and when it does not
8. Cache and logged-in variation hazards
9. Search Console and three-persona rendering test
10. Conversion measurement without starving search intent
11. Failure modes and “not a fit” situations
12. FAQ

## Metadata and technical guidance

- Title and description must describe material visible to the search visitor; avoid promising a complete guide when only a login wall is available.
- A canonical consolidates duplicate URLs; it does not make unavailable premium content indexable.
- `noindex` is appropriate for pages that should not appear in search, but Google must be allowed to crawl the page to see a robots meta tag.
- `nosnippet`, `max-snippet`, and `data-nosnippet` can limit search previews. They do not secure content.
- Google’s paywalled structured-data pattern uses `isAccessibleForFree: false` and `hasPart` with a CSS selector for gated sections. Structured data must match the page and cannot substitute for crawler access.
- If the premium body must not reach an unauthorized browser response, use server-side gating; Google explicitly notes this architectural choice in its paywall documentation.
- Keep structured data valid for guest rendering and avoid marking content that is not actually represented on the page.

## Original test matrix

| Test persona/tool | Expected public content | Expected protected content | SEO/access check |
|---|---|---|---|
| Logged-out guest | Public answer and navigation | Omitted or denial message | View source/rendered HTML; status 200/appropriate status |
| Logged-in non-member | Same public answer | Omitted or denial message | No stale entitled cache |
| Active member | Public answer | Full authorized section | No accidental `noindex` divergence unless intentional |
| Google URL Inspection live test | Same policy as guest unless a separately documented paywall architecture exists | Must not receive unauthorized secret content | Check rendered HTML, canonical, robots, screenshot |
| Social preview crawler | Accurate title/image/description | No protected excerpt in metadata | Inspect Open Graph/Twitter output |

Add cache tests after logout, entitlement activation, cancellation, expiration, and plan switch.

## Measurement plan

Use a funnel and guardrails instead of unsupported benchmarks:

`organic entrances → engaged public readers → gate/CTA views → pricing/login clicks → checkout starts → completed memberships`

Report conversion rate with an explicit denominator, for example:

`gate-to-membership conversion = attributed memberships ÷ unique visitors who viewed the gate`

Guardrails: organic clicks, indexed pages, scroll depth to gate, return-to-SERP behavior, login success, support tickets, cancellation/refund rate, and existing-member authentication failures.

## Official sources and claim map

- [Google: Subscription and paywalled content structured data](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) — required properties, section selectors, anti-cloaking framing, and server-side versus client-side access consideration.
- [Google: Flexible Sampling](https://developers.google.com/search/docs/appearance/flexible-sampling) — metering and lead-in models plus testing. Treat any publisher/news examples as context, not universal WooCommerce benchmarks.
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) — ordinary SEO fundamentals apply; no special AI file or schema is required; snippet controls remain relevant.
- [Google: Robots meta tag, data-nosnippet, and X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) — indexing and preview controls.
- [Google: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — duplicate URL consolidation only.
- [Google: Creating helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — people-first usefulness, clear sourcing, and evidence of expertise.
- [Google: Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) — avoid misleading or crawler-specific presentations.

## Internal-link plan

Verify actual routes before publication:

- Pillar: `/guides/woocommerce-memberships/`
- Feature: `/features/members-access/`
- Recipe: `/recipes/inline-content-gating/`
- Sibling A047: membership-site architecture
- Sibling A048: members-only products and catalogs
- Sibling A053: partial content restriction
- Sibling A054: AND/OR access rules

Suggested anchors: “partial server-side content gating,” “choose a membership architecture,” and “build explicit access conditions.”

## Mirror screenshot opportunities

Primary route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/content-gate`

Capture plan:

1. Capture the Content Gate overview showing Elementor, Gutenberg, shortcode, and PHP options.
2. Add markers to each surface, not only a generic box around the page.
3. In a safe draft post, capture the Gutenberg Restricted Content block settings, or use an existing safe draft without publishing changes.
4. Capture an actual front-end guest response and entitled response only if a preexisting test page exists. Use the same viewport and annotate the public answer, restriction boundary, denial message, and CTA.
5. Capture source/rendered HTML or Search Console only if sensitive account/project data can be cropped.

No customer data, tokens, email addresses, credentials, or nonces should appear.

## Varied visual concepts

1. **Real app screenshot:** Content Gate surface selector with four precise markers.
2. **Split browser concept:** “guest response” contains public answer and placeholder; “member response” contains the premium section.
3. **Editorial scene:** a writer placing a velvet rope after the useful introduction rather than before the first answer.
4. **Layered shapes:** metadata, public HTML, gated HTML, and access control as separate layers; schema visibly does not unlock the gate.
5. **Real front-end comparison:** identical public page at guest and member states, with matched annotations.
6. **Search-result concept:** accurate snippet leading to a useful public answer, with the premium boundary lower on the page.

Avoid repeating numeric dashboards. The rendering comparison and editorial boundary should carry the story visually.

## Limitations, review, and update triggers

- Partial gating is not file/media protection; raw asset URLs need their own authorization.
- Client/CDN/page caching can leak an entitled response or hide content from members if variation is wrong.
- An all-private page can be strategically valid but should not be expected to acquire organic traffic.
- Name the author and technical SEO reviewer; include first-published, last-reviewed, and a short change log.
- Recheck after Google paywall documentation changes, ArraySubs rendering/SEO integrations change, or the target theme/cache stack changes.
- Never promise SERP rankings, AI citations, or that schema causes indexing.

