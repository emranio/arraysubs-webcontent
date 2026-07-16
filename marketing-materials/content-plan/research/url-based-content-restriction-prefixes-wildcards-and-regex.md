# Research: URL-Based Content Restriction—Prefixes, Wildcards, and Regex

## Research record

- Brief: `articles/052-url-based-content-restriction-prefixes-wildcards-and-regex.md`
- Researched: 2026-07-16
- Intent: technical implementation/troubleshooting
- Primary query: `WordPress restrict URL by pattern`
- Product scope inspected: ArraySubs core Members Access URL rules, version `1.8.11`
- Evidence: current PHP/React source, read-only authenticated mirror inspection, official PHP/WordPress/OWASP/Google sources
- Caveat: behavior below is code-specific, not a universal definition of “wildcard.” Recheck whenever ArraySubs URL matching or validation changes.

## Direct answer for the opening

> ArraySubs URL rules compare the request path—without its query string—using exact, starts-with, contains, or case-insensitive regex matching. Exact/prefix/contains comparisons are case-sensitive, exclusions are prefix checks, and lower priority numbers run first. The first matching non-excluded rule decides access, so test overlaps and denied actions before applying broad patterns.

This is deliberately precise and extractable. Follow it with a warning that the visible `*` in a prefix is not a general glob engine.

## Key takeaways

1. ArraySubs evaluates only the request path; query parameters are stripped before matching.
2. Exact, prefix, and contains are case-sensitive in the current PHP code. Regex is wrapped with the `i` modifier and is case-insensitive.
3. Prefix matching removes a trailing `*`; it does not implement arbitrary `*` or `?` glob syntax.
4. Exclusion entries are always prefix matches, even if the main rule uses exact, contains, or regex.
5. Lower numeric priority runs first, and the first matching non-excluded URL rule decides whether to allow or deny.

## Verified request normalization

`UrlRestrictor::getCurrentUrl()` reads `REQUEST_URI`, removes the query string using `parse_url(..., PHP_URL_PATH)`, and ensures a leading slash.

Examples:

- `/academy/lesson-1?preview=true` becomes `/academy/lesson-1`.
- `/academy/lesson-1/` remains distinct from `/academy/lesson-1` unless the chosen pattern covers both.
- Hostname and scheme are not part of the pattern.
- Percent-encoding, WordPress rewrites, multilingual prefixes, and trailing-slash canonicalization need tests in the actual stack.

Evidence:

- `arraysubs/src/Features/MembersAccess/Services/UrlRestrictor.php`
- `arraysubs/src/Features/MembersAccess/resources/components/UrlRulesTab.jsx`

## Exact matching semantics

| Mode in article | Current code behavior | Case behavior | Example that matches | Important non-match |
|---|---|---|---|---|
| Exact | `$current_url === $pattern` | Case-sensitive | `/academy` matches `/academy` | `/academy/`, `/Academy`, `/academy/lesson` |
| Starts with / prefix | Remove trailing `*`, then `strpos(path, prefix) === 0` | Case-sensitive | `/academy*` matches `/academy` and `/academy/lesson` | `/Academy/lesson` |
| Contains | `strpos(path, pattern) !== false` | Case-sensitive | `members` matches `/pro/members/library` | `Members` with different case |
| Regex | Pattern wrapped as `~PATTERN~i`; `~` is escaped | Case-insensitive | `^/academy/(lesson|course)-[0-9]+/?$` | Invalid PCRE returns no match and may emit a warning |

### The wildcard caveat

In prefix mode, a final `*` is syntactic sugar that is removed before a normal starts-with comparison. `/academy*` works like `/academy`. A star in the middle is not a glob wildcard: `/academy/*/video` is treated literally except for a final star, if present.

Avoid describing prefix rules as a glob system. If arbitrary patterns are required, use a carefully reviewed regex.

### Regex caveats

- The implementation wraps the stored value in a PHP PCRE delimiter and adds `i`, making it case-insensitive.
- The current UI/backend inspection did not reveal a dedicated invalid-regex validator or timeout.
- `preg_match()` returns `false` for an error; the current matcher treats that as no match, and PHP can emit a warning.
- Complex, ambiguous, nested-quantifier expressions can create excessive backtracking and denial-of-service risk.
- Use anchored, narrow patterns; prefer exact/prefix when possible.

Good bounded example: `^/academy/(lesson|course)-[0-9]+/?$`

Risky style: nested repetition such as `(a+)+` against uncontrolled long strings. Do not publish a copy-paste “universal” pattern without tests.

## Exclusions, priority, and access decision

Rules are sorted by ascending numeric priority. For each enabled rule:

1. Does its main pattern match the normalized path?
2. Does any exclusion prefix match? If yes, skip the rule.
3. If no exclusion matches, evaluate schedule/conditions.
4. If access passes, allow the request and stop processing later URL rules.
5. If access fails, apply the denied action and stop.

This means a broad priority-5 rule can shadow a specific priority-20 rule. Put the more specific exception first or encode the path as an exclusion.

Do not generalize this precedence to every Member Access subsystem. Shop, CPT, discount, and inline rules can have different combination behavior.

## Denied actions verified in current code

- redirect to a configured URL with `wp_safe_redirect()` and a 302 status;
- redirect to WordPress login;
- return HTTP 403;
- replace page content with a restriction message.

A global “require login” setting can send guests to login before a rule’s specific denied action. URL rules run on front-end `template_redirect`, not WordPress admin requests.

The configured redirect is constrained through WordPress safe redirect behavior. Still test loops—for example, do not redirect `/premium` to `/pricing` if `/pricing` is caught by the same denied rule.

## Pattern-selection guide

| Need | Prefer | Reason |
|---|---|---|
| One known canonical path | Exact | Lowest surprise |
| An entire directory-like route tree | Prefix | Easy to audit and efficient |
| A stable token anywhere in several paths | Contains, cautiously | Simple but can overmatch unrelated slugs |
| Several structured variants | Anchored regex | Expressive when exact/prefix cannot represent the set |
| Exceptions inside a broad prefix | Exclusion prefix or higher-priority exact rule | Makes precedence explicit |

Recommended rule-design principle: choose the least expressive matcher that fully represents the requirement.

## Recommended article outline

1. Direct answer with exact semantics
2. How ArraySubs normalizes the request URL
3. Exact, prefix, contains, and regex comparison table
4. Why trailing `*` is not a general wildcard
5. Exclusions and lower-number-first priority
6. AND/OR membership conditions within a URL rule
7. Denied actions, safe redirects, and redirect loops
8. Regex safety and validation limitations
9. Real examples for academy, account, and premium libraries
10. Prelaunch URL test matrix
11. SEO, status codes, and canonical URL considerations
12. Debugging unexpected matches
13. FAQ

## Example rule set

Use an original example with an explicit outcome table:

- Rule 1, priority 5: exact `/academy/free-preview`, condition none/open or the intended public policy.
- Rule 2, priority 10: prefix `/academy*`, active Academy subscription, redirect to `/pricing` when denied.
- Exclusion alternative: exclude `/academy/free-preview` from Rule 2 instead of Rule 1.

| Request | Rule encountered | Expected result |
|---|---|---|
| `/academy/free-preview` | Exact exception first | Public/allowed |
| `/academy/lesson-1` | Prefix membership rule | Member allowed; denied visitor redirected |
| `/academy/lesson-1?utm_source=email` | Same normalized prefix path | Same as above |
| `/Academy/lesson-1` | No prefix match in current code | Falls through unless another rule covers case |
| `/academyplus` | Prefix `/academy` also matches | Potential overmatch; use `/academy/` and explicit base rule if needed |

The `/academyplus` example is important because plain prefix matching is not segment-aware.

## Original URL-rule QA matrix

Test these dimensions, keeping an expected-results sheet:

- base path with and without trailing slash;
- uppercase/lowercase variants;
- encoded path characters;
- query strings and tracking parameters;
- child routes and similarly prefixed unrelated routes;
- multilingual/site-subdirectory prefixes;
- excluded path and an excluded path’s children;
- priorities with both broad and specific matches;
- guest, non-member, active/trial member, on-hold/cancelled member, administrator;
- redirect destination, redirect loop, 403 body/status, content-message state;
- cached response after login/logout/status change;
- invalid regex and an intentionally long adversarial path in a staging environment.

## Official sources and claim map

- [PHP `preg_match`](https://www.php.net/manual/en/function.preg-match.php) — PCRE matching behavior and error return.
- [PHP PCRE pattern syntax](https://www.php.net/manual/en/reference.pcre.pattern.syntax.php) — authoritative syntax reference.
- [PHP PCRE pattern modifiers](https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php) — meaning of the `i` modifier.
- [WordPress `wp_safe_redirect()`](https://developer.wordpress.org/reference/functions/wp_safe_redirect/) — validates redirect hosts and requires termination by caller.
- [OWASP: Regular expression Denial of Service](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) — catastrophic-backtracking risk and evil-regex patterns.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — server-side enforcement and authorization test cases.
- [Google URL structure best practices](https://developers.google.com/search/docs/crawling-indexing/url-structure) — readable, consistent URL structures and parameter considerations.
- [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) — meaningful HTTP status behavior, including 404/401 context; use only for status-code guidance, not ArraySubs matching claims.

## Internal-link plan

Verify exact routes:

- Feature: `/features/members-access/`
- Recipe: `/recipes/url-prefix-lockdown/`
- Recipe: `/recipes/combined-conditions/`
- Sibling A048: members-only catalogs
- Sibling A049: SEO for gated content
- Sibling A051: roles versus levels versus entitlements
- Sibling A054: AND/OR membership access rules

## Mirror screenshot opportunities

Route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/url-rules`

The mirror currently contains four real example rules:

1. **Premium Content URL gate** — `/premium-content`, starts-with, priority 10, active subscription product 233, redirect `/pricing`.
2. **Standard Weekly** — `/standard-weekly-content`, priority 5, product 200, message denial.
3. **Fixed Period** — `/fixed-period-content`, priority 5, product 1683, message denial.
4. **Manual Screenshot Conflict** — `/manual-screenshot-conflict`, priority 20, Subscriber role, redirect `/pricing`.

Capture one or two cards without editing. Mark:

- pattern type;
- path/pattern;
- numeric priority;
- condition;
- denied action/destination.

A second screenshot can open an unsaved rule builder to show the mode selector and exclusion control, provided nothing is saved. Do not display user data or credentials.

## Varied visual concepts

1. **Real UI screenshot:** annotated Premium Content URL gate.
2. **Street-map scene:** exact address, neighborhood prefix, sign containing a word, and a carefully drawn route pattern symbolize the four modes.
3. **Path tiles:** `/academy`, slash, child segment, query tag; query tag visibly drops away before matching.
4. **Priority cards:** a narrow exception card placed before a broad directory card, using shape/layering instead of a numeric chart.
5. **Regex workbench:** pattern, sample matching paths, and red warning on ambiguous nested repetition.
6. **Redirect loop concept:** two browser doors pointing at each other, then a corrected public pricing exit.

## Limitations and update triggers

- URL rules are route-level controls, not file-object protection.
- Prefix matching is not segment-aware and can overmatch similarly named paths.
- Current regex validation/timeout limitations deserve a plain-language warning.
- Name a PHP/WordPress technical reviewer; include dates and an update log.
- Recheck after changes to `UrlRestrictor`, WordPress redirects, permalink/multilingual routing, or cache behavior.

