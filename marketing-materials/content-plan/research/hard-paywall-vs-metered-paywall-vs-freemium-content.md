# Research brief: Hard Paywall vs Metered Paywall vs Freemium Content

## Research record

- **Article:** A046 — Hard Paywall vs Metered Paywall vs Freemium Content
- **Research date / last verified:** 2026-07-16
- **Focus keyword:** `hard paywall vs metered paywall vs freemium`
- **Long-tail intent:** `best paywall model for WordPress`, `metered paywall vs membership`, `partial content vs full content restriction`
- **Search intent:** Commercial investigation. Publishers, educators, and membership businesses need a neutral choice based on content economics, discovery, conversion, abuse tolerance, implementation, and user experience.
- **Evidence scope:** A046 brief; SEO/GEO publishing standard; ArraySubs 1.8.11 / Pro 1.1.2 restriction source; current official Google Search paywall/flexible-sampling guidance; official WooCommerce Memberships and MemberPress restriction documentation.
- **Research limitation:** No ArraySubs conversion, paywall, search, or cohort dataset exists in scope. Do not invent performance benchmarks or claim one model ranks/converts best. ArraySubs source contains no native visitor view-count meter.

## 40–60-word direct answer

> Choose a hard paywall when nearly all premium value can sit behind membership, a meter when readers need several complete samples before conversion, and freemium when selected content should remain permanently public while premium resources stay gated. The best model depends on audience habit, content uniqueness, acquisition channels, implementation accuracy, and the value members receive after subscribing.

This is 55 words.

## Answer-first thesis

These are not merely three screen designs. They are three allocation policies for content value:

- **Hard paywall:** most or all designated premium content requires access before consumption.
- **Metered paywall:** the reader may consume a defined number of otherwise premium items during a measurement window before access is required.
- **Freemium content:** a deliberate set remains public, while another set is always premium.

A fourth useful pattern is **partial-content gating**: the same page contains meaningful public material and a premium section. Treat it as a presentation pattern that can coexist with hard or freemium models, not as a synonym for metering.

## Key takeaways

- Hard, metered, and freemium models differ in what is public and how entitlement is triggered—not just in message copy.
- A meter needs identity/counting/window/reset/anti-bypass behavior that ordinary role/subscription rules do not provide.
- Freemium needs a stable editorial rule for which content stays public; “old equals free” or “random articles free” is not a strategy.
- Search visibility depends on what the crawler can access/render and correct paywall implementation; no model guarantees rankings.
- Current ArraySubs can implement hard gates, freemium sets, partial gates, and scheduled access, but not a native per-reader article-view meter.

## Verified primary-source claims

All sources accessed 2026-07-16.

| Verified claim | Primary source | Editorial use |
| --- | --- | --- |
| Google documents `isAccessibleForFree` and `hasPart` markup for paywalled content intended to be crawled/indexed. | [Google: Subscription and paywalled content markup](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) | Explain crawlable paywalls without promising a rich result or ranking. |
| Google says paywall markup helps distinguish paywalled content from cloaking and advises server-side protection when content should not be delivered to the browser. | [Google: Paywalled content markup](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) | Support secure rendering and crawler-consistency guidance. |
| Google provides flexible-sampling guidance for sites exposing samples of paid content. | [Google: Flexible Sampling](https://developers.google.com/search/docs/appearance/flexible-sampling) | Use as current search implementation guidance, not an optimal sample-size recommendation. |
| WooCommerce Memberships restriction modes can hide content, show excerpts, or redirect and allow configurable messages. | [WooCommerce Memberships Settings](https://woocommerce.com/document/woocommerce-memberships-settings/) | Provide an official WordPress/Woo implementation reference. |
| Woo Memberships supports full content rules, Gutenberg member blocks, and restriction shortcodes. | [WooCommerce Memberships Restrict Content](https://woocommerce.com/document/woocommerce-memberships-restrict-content/) | Distinguish whole-resource and partial-content gating. |
| MemberPress rules can protect pages/posts/CPTs and redirect unauthorized users, with drip/expiration options. | [MemberPress Rules Overview](https://memberpress.com/docs/rules-overview/) | Give a neutral alternative implementation reference. |

## Model comparison matrix

| Dimension | Hard paywall | Metered paywall | Freemium | Partial gate |
| --- | --- | --- | --- | --- |
| Public value | low to moderate on premium items | several complete samples | a permanent public catalog | public portion on same page |
| Trigger | first protected request | count/window threshold | content classification | section entitlement |
| Identity need | login/access check | durable identity plus anonymous handling | content/access classification | current user/access condition |
| Implementation complexity | moderate | highest | moderate/editorial | moderate/rendering |
| Main strength | clear premium boundary | sampling before decision | discovery and trust through full public assets | demonstrates value in context |
| Main weakness | limited sampling | bypass/count/privacy complexity | free may satisfy the whole need | teaser can feel manipulative or leak content |
| Best-fit hypothesis | highly differentiated/essential premium library | habitual repeat reading with enough inventory | search/social-led acquisition and clear premium depth | guides/tools where advanced part is the benefit |
| Not a fit when | audience needs proof and public alternatives are abundant | low visit frequency or identity cannot be reliable | team cannot maintain editorial classification | public portion is thin or protected HTML is delivered anyway |

The “best fit” cells are decision hypotheses, not performance claims.

## Decision framework

Score the proposed model qualitatively on:

1. **Content uniqueness:** can a reader substitute a free source easily?
2. **Habit/frequency:** will a typical reader return enough for a meter to be meaningful?
3. **Public proof:** how much complete value is needed to establish trust?
4. **Acquisition mix:** search, social, referral, email, direct, partnerships, paid.
5. **Inventory depth:** is there enough premium breadth after the first conversion?
6. **Identity reliability:** login, cookie consent, cross-device behavior, privacy constraints.
7. **Implementation maturity:** server rendering, cache variation, entitlements, analytics, QA.
8. **Member-aftercare:** onboarding, discovery, ongoing release, portal, retention.
9. **Leak tolerance:** sharing, copied links, cached content, anonymous resets.
10. **Editorial operations:** can every item receive a stable public/premium classification?

## Current ArraySubs truth check

### What current ArraySubs can implement

- **Hard gates:** restrict entire posts/CPTs/taxonomies, URL paths, products, downloads, and page sections by conditions.
- **Freemium:** leave selected content public and apply rules only to premium classifications/paths/items.
- **Partial-content gating:** Gutenberg block, Elementor container, shortcode, or PHP helper.
- **Tiered paywalls:** conditions by subscription product/variation, purchase, role, or Pro feature value.
- **Delayed access:** schedules on CPT, URL, download, shop-access, and discount rules.
- **Denied experiences:** message, redirect, login, 403, and for shop rules 404/hide or purchase blocking.

### What current ArraySubs does not natively implement

No inspected core/Pro source implements a publisher-style meter such as “three full articles per anonymous/logged-in reader per 30 days.” A genuine meter still needs:

- countable event definition;
- user/browser identity strategy;
- counting window and reset;
- bot/internal/preview exclusions;
- cross-device/account merge behavior;
- privacy/consent/data-retention policy;
- cache-safe request-time evaluation;
- abuse/bypass tolerance;
- customer-visible remaining count;
- analytics and support override.

Do not market URL rules, lifetime-spend conditions, download limits, or content dripping as a view meter. Download limits are for protected file usage and are not article-view metering.

### Search/rendering caveats

- ArraySubs partial/whole gates must be tested in delivered HTML and network responses; hidden visual components are not enough.
- Current CPT archive behavior can hide, show a lock, or show normally; choose based on discovery and user experience.
- Shop 404 behavior filters products from several queries and common sitemap integrations, but this is product visibility—not generic article paywall structured data.
- ArraySubs does not automatically guarantee Google paywall markup for every custom gate. The final article should present markup as an implementation responsibility and validate visible/schema parity.

## Hard paywall design questions

- Is the landing/marketing layer strong enough to explain the premium promise without opening the resource?
- Will login restore access and return to the requested URL?
- Are headlines, descriptions, taxonomy pages, author expertise, samples, pricing, and account recovery public?
- Should the denied response be a message, login, comparison, or a true 403/404?
- Are corporate/library/team entitlements needed?
- Can support verify why access was denied?

Hard paywalls are not equivalent to returning 404 for everything. A public landing record with a protected body may be a more useful experience, depending on search/editorial policy.

## Meter design questions

Define the meter precisely:

```text
Meter state = identity + eligible content set + consumed events + window + reset policy
```

Decide:

- article open, meaningful read, or another event counts;
- repeat opens count once or every time;
- snippets, newsletters, bots, staff, previews, gifts, and referral unlocks count;
- window is rolling or calendar-based;
- anonymous usage merges after login;
- remaining count is shown;
- cookie clearing/private browsing/cross-device use is blocked, tolerated, or account-bound;
- data retention and consent are reviewed.

Meter bypass prevention can harm privacy/UX. Frame it as a tradeoff, not a promise of perfect enforcement.

## Freemium editorial policy

Classify content using a stable rule, for example:

- public: definitions, discovery guides, news/awareness, selected flagship examples;
- premium: datasets, templates, implementation playbooks, tools, complete archives, live sessions, expert review;
- member-earned: personal output, certificate, download, saved workspace;
- temporary preview: launch sample with explicit expiry/transition.

Avoid silently moving widely linked public content behind a paywall without redirect/index/customer communication planning.

## Partial-content quality test

The public section should independently answer a meaningful part of the query. The premium section should deepen execution rather than conceal the promised basic answer. Test:

- Does the title accurately describe what a non-member receives?
- Is the direct answer visible if the page targets informational search intent?
- Is protected HTML absent for denied visitors if security matters?
- Does the gate explain the specific premium benefit and eligibility?
- Can an entitled user access without layout shift, duplicate content, or cache leakage?

## Measurement plan without fabricated benchmarks

Use closed cohorts and define events:

```text
Paywall encounter rate = eligible sessions encountering gate ÷ eligible sessions
Login restoration rate = denied logged-out visitors who authenticate and gain access ÷ login-start visitors
Paywall conversion = new paid members attributed under defined model ÷ eligible nonmembers encountering gate
Free-to-premium path rate = public-content visitors reaching premium explanation ÷ public-content visitors
Member content activation = new members consuming a defined premium resource within window ÷ new members
```

Also measure search landing mix, returning frequency, support contacts, refunds, cancellation reasons, content consumption, cache/access incidents, and revenue contribution. Attribution definitions and observation windows must be disclosed.

## Migration path

Recommend reversible experiments:

1. build a content inventory and baseline;
2. start with freemium or a clearly bounded premium section;
3. add hard gates to high-value collections with public explanation pages;
4. implement a meter only if visit frequency and identity/data capability justify it;
5. preserve URLs, annotate changes, and compare closed cohorts;
6. maintain rollback rules and customer communication.

## Product fit and limitations

ArraySubs is a fit for subscription/purchase/role/feature-driven WordPress/Woo access. It is not automatically the best fit for:

- native anonymous/logged-in article meters;
- newsroom subscription analytics, offers, propensity, or household identity;
- strong DRM;
- off-WordPress app entitlements without integration;
- legal/privacy requirements needing specialized consent/identity controls.

## Unsupported claims and caveats

- Do not call any model universally best for SEO, conversion, or revenue.
- Do not invent recommended free-article counts.
- Do not call partial gating a meter.
- Do not claim structured data makes protected content rank.
- Do not serve different content only to crawlers and call it flexible sampling.
- Do not claim ArraySubs has native metering.
- Do not claim cookies/device fingerprinting perfectly prevents bypass.
- Do not imply a 404 is required for a hard paywall.
- Do not compare competitor feature absences without current verification.

## FAQ questions

- What is the difference between a hard and metered paywall?
- Is freemium the same as partial content restriction?
- Which paywall model is best for WordPress?
- How many free articles should a metered paywall allow?
- Can paywalled content appear in Google Search?
- Does paywall structured data improve ranking?
- Can ArraySubs create a metered paywall?
- Should logged-out users see excerpts or full samples?
- How do I stop paywall content leaking through cache or HTML?
- When should I migrate from freemium to a hard paywall?

## Internal-link plan

- **Commercial pillar:** `/deals/arraysubs/features/#member-experience`
- **Recipes:** inline content gating, URL prefix lockdown, combined conditions.
- **Siblings:** A045 restriction strategy, A047 dripping, A048 members-only catalog.
- **Supporting:** A049 SEO for gated content, A053 partial restriction, A153 publisher paywall blueprint, A159 paid newsletter blueprint.
- **CTA after neutral decision and ArraySubs limits:** `/deals/arraysubs/pricing/`

## Long-form SEO/GEO outline (target 3,300–4,200 words)

1. Direct answer and key takeaways.
2. Definitions: hard, metered, freemium, partial gate.
3. Neutral comparison matrix: reach, proof, identity, complexity, risk.
4. Decision framework by content, audience habit, inventory, acquisition, operations.
5. Hard paywall design and denied UX.
6. Meter architecture and privacy/bypass tradeoffs.
7. Freemium editorial classification and partial-content quality.
8. Search/crawl/rendering/markup guidance without ranking promises.
9. Measurement formulas and reversible migration path.
10. Current ArraySubs capabilities, no-native-meter limitation, fit/not fit.
11. FAQ, conclusion, CTA, test/disclosure/update elements.

## Mirror screenshot opportunities with marker plan

1. **Hard gate via URL rule** — `wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/url-rules`
   - markers: premium prefix, exclusions, eligibility condition, redirect/message action.
2. **Freemium classification via Post Types rule** — `#/members-access/cpt-rules`
   - markers: taxonomy/selected-post target, archive behavior, condition, denied message.
3. **Partial gate guide** — `#/members-access/content-gate`
   - markers: Gutenberg, Elementor, Shortcode; pair with real frontend page.
4. **Frontend triptych** — public article, same-page premium section, fully protected resource.
   - markers: complete public value, specific premium benefit, login/upgrade route.
5. **Shop Access 404 versus purchase block** — `#/members-access/ecommerce-rules`.
   - markers: two distinct denied actions and target scopes; explain product catalog use only.
6. **Evidence of no meter:** do not fabricate a screenshot. State in caption/body that view-count metering is absent from inspected ArraySubs UI/source.

## Varied non-chart visual ideas

1. **Three storefront scenes:** closed members club (hard), library punch card (meter), public gallery with premium vault (freemium).
2. **Magazine reader scene:** reader samples complete issues until a physical counter reaches its limit; conceptual metering without UI cards.
3. **Content iceberg:** public freemium layer above water, deep tools/data/archive below; avoid numeric labels.
4. **Same-page cutaway:** public guide on a desk, premium workbook in a locked drawer beneath it.
5. **Search crawler and reader at the same doorway:** illustrates consistent paywall treatment and markup.
6. **Identity footprints across phone/laptop/incognito:** depicts meter complexity and privacy tradeoffs.
7. **Real screenshot collage:** ArraySubs URL rule, content gate guide, and frontend denied state with hand-drawn markers/logos limited to actual product identity.

## Refresh triggers

- ArraySubs adds/removes metering, changes restriction rendering, archive modes, or schema integration.
- Google changes paywall/flexible-sampling guidance.
- Woo/MemberPress restriction modes change.
- Original paywall test data becomes available.
- Quarterly primary-source and screenshot review.
