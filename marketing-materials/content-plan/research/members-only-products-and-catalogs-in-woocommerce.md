# Research: Members-Only Products and Catalogs in WooCommerce

## Research record

- Brief: `articles/048-members-only-products-and-catalogs-in-woocommerce.md`
- Researched: 2026-07-16
- Intent: commercial investigation plus implementation guidance
- Primary query: `WooCommerce members only products`
- Product scope inspected: ArraySubs core Members Access, current workspace version `1.8.11`; ArraySubs Pro `1.1.2` only where feature-value conditions are relevant
- Evidence standard: current source code, read-only inspection of the authenticated mirror site, and primary Google/WooCommerce/WordPress documentation
- Caveat: source observations describe the current development workspace. Confirm the public release version and the live UI again before publication.

## Direct answer for the opening

> A WooCommerce members-only catalog can hide products completely, keep product pages discoverable while blocking purchase, or redirect unauthorized visitors to login or pricing. The right model depends on whether organic discovery or privacy matters more. ArraySubs enforces the rule across product pages, catalog queries, cart validation, checkout, Store API requests, and qualifying member conditions.

Keep this answer near the top, followed by a one-sentence recommendation: use purchase blocking for a discoverable public catalog and a 404-style rule for a genuinely private catalog.

## Key takeaways to surface

1. “Members only” is not one setting. Visibility, price presentation, direct-page access, and purchase permission are separate decisions.
2. ArraySubs has four denied actions in the inspected UI/code: block purchase, return 404, redirect to login, or redirect to a selected page.
3. The `404` action removes denied products from shop/search/category surfaces and common product feeds, while `block_purchase` leaves the product discoverable but removes the purchase path.
4. A front-end button restriction alone is not sufficient; add-to-cart, cart, checkout, REST, and Store API paths also need server-side validation.
5. Exclude the product used to buy or renew membership when a broad store rule would otherwise lock it.

## Verified ArraySubs behavior

### Rule scope and precedence

The Shop Access rule service supports:

- the entire store;
- selected products;
- selected product categories;
- product and category exclusions;
- a condition group, denied action, priority, and optional schedule.

Rules are sorted as configured. The first enabled rule whose target scope matches the product decides access. This is important: a later permissive rule cannot rescue a product already matched by an earlier restrictive rule. Exclusions are therefore the clearest way to protect membership checkout products from a broad “entire store” rule.

Code evidence:

- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/Features/MembersAccess/Services/ConditionEvaluator.php`
- `arraysubs/src/Features/MembersAccess/resources/components/EcommerceRulesTab.jsx`

### What each denied action actually does

| Action | Catalog/search listing | Direct product URL | Purchase path | SEO implication |
|---|---|---|---|---|
| Block purchase | Remains visible | Remains visible with restriction message | Add-to-cart is removed/blocked; cart and checkout are validated | Best fit when product discovery should remain public |
| Return 404 | Hidden from protected product queries and common widgets | Returns a real 404 response | Blocked | Best fit for a genuinely private catalog, with less indexable inventory |
| Redirect to login | Remains visible in archives | Redirects unauthorized visitor to login | Blocked/validated | Useful when access normally follows authentication |
| Redirect to page | Remains visible in archives | Redirects to the configured local destination | Blocked/validated | Useful for a pricing or membership explanation page |

Do not claim a separate “hide price only” mode. The inspected Shop Access rules do not expose one. `block_purchase` preserves the product page and price presentation while preventing purchase. Member discounts/pricing are separate ArraySubs rules, not a visibility substitute.

### Defense across WooCommerce paths

The current implementation does more than hide a button:

- filters the product loop and queried product collections for `404` rules;
- removes denied products from related products, upsells, cross-sells, widgets, and core/Yoast/Rank Math sitemap queries;
- intercepts direct product requests for 404 or redirect behavior;
- validates classic add-to-cart, cart, and checkout paths;
- filters standard product REST output and validates WooCommerce Store API cart additions;
- returns denial on a direct Store API product request for the stronger 404/redirect actions.

Mention that administrators and shop managers bypass restrictions for management. Editorial QA must therefore use a guest and a normal customer, not only an admin session.

### Access conditions available in the inspected builder

- lifetime spend;
- purchased product or variation;
- purchased from a category/tag/taxonomy;
- active subscription, optionally for selected products;
- active subscription variation;
- WordPress role;
- ArraySubs Pro feature-value condition when that feature is enabled.

“Has active subscription” resolves active/trial subscription state in the current evaluator. Avoid broad claims about every possible subscription status.

## Decision framework: visibility, price, and purchase

Use this as the article’s original decision table.

| Business goal | Product discoverability | Recommended control | Public page should explain | Main risk to test |
|---|---|---|---|---|
| Acquire new members through search | Public | Block purchase or redirect to pricing | Value, inclusions, member requirement, clear CTA | Add-to-cart/API bypass |
| Keep wholesale inventory private | Private | 404 for unauthorized users | A separate public wholesale landing page | Leaked URLs, feeds, sitemaps |
| Require login for an existing member base | Public catalog, gated detail | Redirect to login | Why login is required and recovery route | Redirect loops/caching |
| Sell a public product with a member benefit | Public | Keep access open; use separate member pricing | Public price and member benefit truthfully | Confusing price claims |

Add an explicit “not a fit” note: if every visitor needs to compare products before joining, an entirely hidden catalog makes acquisition and support harder. If the inventory itself is confidential, a public block-purchase page may disclose too much.

## Recommended article outline

1. Direct answer: the three catalog models
2. Define members-only product, members-only catalog, purchase restriction, and visibility restriction
3. Visibility versus price versus purchase: the decision matrix
4. How ArraySubs Shop Access rules work
5. Pattern 1: public product page, members-only purchase
6. Pattern 2: private catalog with real 404 responses
7. Pattern 3: login/pricing redirect
8. Exclude membership/signup products before enabling a store-wide rule
9. Bypass resistance: direct URL, add-to-cart URL, cart, checkout, REST, Store API, sitemap
10. SEO choices for a discoverable versus private catalog
11. Guest/member/admin test checklist
12. Limitations and when not to use each pattern
13. FAQ with short extractable answers

## Configuration recipe to research into prose

For a discoverable membership catalog:

1. Open ArraySubs → Member Access → Shop Access.
2. Create an entire-store or targeted-category rule.
3. Exclude the membership signup product and any public products.
4. Add the qualifying active-subscription/product condition.
5. Choose **Block purchase** or redirect to a pricing page.
6. Add a useful denial message with the next action.
7. Test as guest, logged-in non-member, active member, expired/cancelled member, and admin.

For a private catalog, replace step 5 with a 404 action and test archives, search, direct URLs, sitemaps, related products, REST/Store API, and cached pages.

## Original QA checklist

- [ ] Guest shop archive does what the selected action promises.
- [ ] Direct product URL has the expected status/redirect/message.
- [ ] Query-string add-to-cart and AJAX add-to-cart are denied.
- [ ] Store API cart-add request is denied for unauthorized users.
- [ ] A product added while allowed cannot survive cart/checkout after access is lost.
- [ ] Category, search, related products, upsells, cross-sells, and widgets match the visibility policy.
- [ ] Core, Yoast, and Rank Math sitemap behavior is checked when applicable.
- [ ] Signup/renewal products remain purchasable.
- [ ] Guest, non-member, active/trial member, lapsed member, and admin are tested separately.
- [ ] Full-page/cache/CDN variation by cookie or login state is verified.

## Official sources and claim map

- [WooCommerce Memberships: Restrict Content](https://woocommerce.com/document/woocommerce-memberships-restrict-content/) — primary comparator for distinguishing product viewing from product purchasing. Attribute this to WooCommerce Memberships, not ArraySubs.
- [WooCommerce Memberships Plans](https://woocommerce.com/document/woocommerce-memberships-plans/) — plan-based content/product restriction concepts and product-purchase access.
- [WooCommerce Memberships Settings](https://woocommerce.com/document/woocommerce-memberships-settings/) — restriction mode and excluded products in the Woo extension; useful evidence that signup products require deliberate handling.
- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — support clear firsthand configuration evidence and a genuinely useful decision framework.
- [Google: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — cite only if discussing duplicate public/member URLs; do not invent alternate canonicals by default.
- [Google: Robots meta tag and X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) — precise control over indexing/snippets when a public explanation page should not appear.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — server-side authorization on every request and deny-by-default testing.

## Internal-link plan

Use natural anchors and verify destinations exist before final publication:

- Pillar: `/guides/woocommerce-memberships/` — “plan a WooCommerce membership architecture”
- Commercial page: `/features/members-access/` — “ArraySubs Members Access”
- Recipe: `/recipes/members-only-store/` or the closest existing shop-access recipe
- Sibling A047: “How to create a WooCommerce membership site”
- Sibling A049: “SEO for gated WooCommerce content”
- Sibling A051: “WordPress roles vs membership levels vs feature entitlements”
- Sibling A052: “URL-based content restriction”

Do not create broken links; use the project’s actual content route map at writing time.

## Mirror screenshot opportunities

Mirror route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/ecommerce-rules`

Recommended real screenshot sequence, without saving anything:

1. Open Shop Access.
2. Click **Add New Rule**.
3. Capture the complete unsaved builder.
4. Place markers on: target scope, exclusions, condition builder, denied action, priority/schedule, and save button.
5. If a safe test product exists, capture a separate guest product page showing block-purchase or denial state, plus the authorized member version. Do not alter live rules merely to manufacture a screenshot.

Suggested captions:

- “A Shop Access rule separates product scope, membership conditions, and denied behavior.”
- “Exclusions keep membership signup products outside a broad store lock.”

Never expose customer names, email addresses, order IDs, nonces, or credentials. Crop the browser chrome if it adds no instructional value.

## Varied visual concepts

Avoid filling the article with dashboards and numeric charts. Use a deliberately varied set:

1. **Real UI screenshot:** annotated Shop Access rule builder.
2. **Scene illustration:** a public storefront window with a members’ checkout door—products are visible, purchase is controlled.
3. **Concept shapes:** four product cards traveling through visibility, direct URL, cart, and checkout checkpoints.
4. **Decision cards:** “Discoverable,” “Private,” and “Login-first” catalog modes, each with a distinct icon and color.
5. **Real front-end pair:** guest versus active-member product page, with markers on message and purchase control.
6. **Security-path visual:** product page, add-to-cart URL, Store API, cart, and checkout all converging on one server-side authorization gate.

Do not use third-party logos as decoration. WooCommerce and ArraySubs marks should appear only where contextually identifying the products, with correct brand presentation.

## Accuracy, reviewer, and update triggers

- Name the author and a technical reviewer familiar with WooCommerce product query and Store API behavior.
- Include published and last-reviewed dates.
- Recheck when ArraySubs changes Shop Access actions, WooCommerce Store API endpoints, sitemap integrations, or the current product versions.
- Do not promise rankings, foolproof privacy, “unhackable” catalogs, or hidden prices.
- Clearly separate verified ArraySubs behavior from WooCommerce Memberships comparisons.

