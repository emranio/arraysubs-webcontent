# Member Access Control

> A powerful rules engine that controls what subscribers can see, buy, download, and access — with 10 condition types, 12 comparison operators, nested AND/OR logic, and content dripping.

**Tier**: Free (7 Rule Types) + Pro (Login Limit Rules, Feature Value Condition)

---

## Rule System Architecture (Free)

Member Access is built around a flexible rules engine. Every rule has conditions (who it applies to) and actions (what happens).

### 7 Rule Tabs

| Tab | Purpose | Tier |
|-----|---------|------|
| Role Mapping | Assign WordPress roles based on subscription status | Free |
| Discount | Grant discounts to qualifying members | Free |
| Ecommerce | Control product purchasing and visibility | Free |
| URL | Restrict access to specific URLs | Free |
| Post Types | Restrict access to content by post type | Free |
| Downloads | Control access to downloadable files | Free |
| Login Limit | Per-rule session caps (overrides global toolkit setting) | Pro |

### 10 Condition Types

Every rule uses the same condition system. Conditions determine which customers the rule applies to.

| # | Condition Type | Description | Tier |
|---|---------------|-------------|------|
| 1 | Subscription Status | Match customers with a specific subscription status | Free |
| 2 | Has Active Subscription | Match customers with any active subscription | Free |
| 3 | Subscription Variation | Match customers subscribed to a specific product variation | Free |
| 4 | Purchased Product | Match customers who purchased a specific product | Free |
| 5 | Purchased Variation | Match customers who purchased a specific variation | Free |
| 6 | Purchased from Category/Taxonomy | Match by product category or taxonomy | Free |
| 7 | Lifetime Spend | Match by total lifetime spending amount | Free |
| 8 | Feature Value | Match by Feature Manager entitlement value | Pro |
| 9 | User Role | Match by WordPress user role | Free |
| 10 | Nested Group | AND/OR logic for combining multiple conditions recursively | Free |

### 12 Comparison Operators

| Operator | Description |
|----------|-------------|
| `=` | Equals |
| `!=` | Not equals |
| `>` | Greater than |
| `>=` | Greater than or equal |
| `<` | Less than |
| `<=` | Less than or equal |
| `contains` | Contains substring |
| `not_contains` | Does not contain substring |
| `in` | Is in list |
| `not_in` | Is not in list |
| `empty` | Has no value |
| `not_empty` | Has a value |

### AND/OR + Nested Groups

Conditions can be combined with AND (all must match) or OR (any must match). Nested groups allow recursive condition logic — a group inside a group — for complex eligibility rules like "Has Active Subscription AND (Lifetime Spend > $500 OR User Role = VIP)."

### Content Dripping / Scheduled Access

Rules support date-based scheduling for content dripping — restrict content until a specific date, then automatically grant access. Useful for courses, drip campaigns, and time-gated membership content.

---

## Role Mapping Rules (Free)

Automatically assign or replace WordPress roles based on a customer's subscription status.

### 7 Status Behaviors

| Status | Behavior |
|--------|----------|
| Active | Assign role when subscription is active |
| Trial | Assign role during trial period |
| On-Hold | Assign role when subscription is on hold |
| Cancelled | Assign role on cancellation |
| Expired | Assign role on expiration |
| Pending | Assign role while pending activation |
| None | Assign role when the customer has no matching subscription |

### Two Modes

| Mode | Description |
|------|-------------|
| Add Role | Adds the target role while keeping existing roles |
| Replace Role | Removes all existing roles and assigns only the target role |

Roles are automatically removed when the subscription leaves the matching status.

---

## Discount Rules (Free)

Grant automatic discounts to qualifying members.

| Setting | Description |
|---------|-------------|
| Discount Type | Percentage or Fixed amount |
| Discount Scope | Per-item or Per-cart |
| Product Targeting | Apply to specific products or categories |
| "Best discount wins" | When multiple rules match, the largest discount is applied |

---

## Ecommerce Restriction Rules (Free)

Control product purchasing and visibility based on membership status.

### 4 Actions

| Action | Description |
|--------|-------------|
| Allow Purchasing | Only matching members can buy the product |
| Block Purchasing | Matching members cannot buy the product |
| Hide Products | Products are invisible to non-matching members |
| Modify Pricing | Show different prices to matching members |

Rules can target specific products or entire product categories.

---

## URL Restriction Rules (Free)

Restrict access to any URL on the site based on membership conditions.

### 4 Pattern Types

| Pattern | Description |
|---------|-------------|
| Exact URL | Match a specific URL exactly |
| URL Prefix | Match URLs starting with a path (e.g., `/members/`) |
| URL Contains | Match URLs containing a substring |
| Regex | Match URLs using a regular expression pattern |

### Priority System

Rules have a priority value from 1-100 for conflict resolution. Higher priority rules override lower priority rules when multiple rules match the same URL.

### 4 Actions

| Action | Description |
|--------|-------------|
| Redirect to URL | Send non-matching visitors to a specific URL |
| Show 404 | Return a 404 Not Found page |
| Show Access Denied | Display an access denied message |
| Show Login Form | Display the login form so visitors can authenticate |

---

## Post Type / Content Restriction Rules (Free)

Restrict access to specific post types, individual posts, or taxonomy-based content.

### 3 Targeting Modes

| Mode | Description |
|------|-------------|
| All Posts of Type | Restrict every post of a specific post type |
| Specific Posts | Restrict individual posts by ID |
| Taxonomy-Based | Restrict posts in specific categories, tags, or custom taxonomies |

### 3 Archive Behaviors

| Behavior | Description |
|----------|-------------|
| Hide from Archives | Restricted posts are invisible in archive/listing pages |
| Show Teaser | Show a preview/excerpt with a restriction notice |
| Show Normally | Posts appear in archives but content is gated on the single page |

### Per-Post Override

3 meta fields available on individual posts for fine-grained control — override the rule-level behavior on specific posts without changing the rule itself.

### Content Dripping

Date-based scheduling allows content to be released over time. Set a start date, and content becomes accessible only after that date. Merge tags can display dynamic restriction messages with dates and countdowns.

---

## Download Restriction Rules (Free)

Control access to WooCommerce downloadable files.

| Feature | Description |
|---------|-------------|
| Access Control | Only qualifying members can access download links |
| Signed URL Delivery | Secure, time-limited download URLs for protected files |
| Usage Tracking | Download count and last access timestamp per file |

---

## Login Limit / Session Control Rules (Pro)

Per-rule concurrent session limits that override the global Multi-Login Prevention toolkit setting.

| Feature | Description |
|---------|-------------|
| Per-Rule Session Cap | Set a specific session limit for members matching this rule |
| FIFO Eviction | Oldest session is terminated when the limit is exceeded |
| Override Scope | Per-subscription or per-role session limits |

This allows different tiers to have different session limits — for example, Basic subscribers limited to 1 session, Premium subscribers allowed up to 3.

---

## Content Restriction Shortcodes (Free + Pro)

### `[arraysubs_restrict]` — Content Gating Shortcode

Gate any content block with 15 attributes for fine-grained control:

| Attribute | Description |
|-----------|-------------|
| `status` | Required subscription status(es) |
| `products` | Required product ID(s) |
| `variations` | Required variation ID(s) |
| `purchased` | Required previously purchased product(s) |
| `lifetime_spent` | Minimum lifetime spending threshold |
| `feature` | Feature Manager entitlement key (Pro) |
| `feature_value` | Minimum feature value |
| `feature_compare` | Comparison operator for feature check |
| `feature_aggregate` | Aggregation mode: sum, max, or any |
| `roles` | Required WordPress role(s) |
| `condition` | AND or OR logic for combining conditions |
| `message` | Custom unauthorized message |
| `redirect` | Redirect URL for unauthorized users |
| `show_to_admins` | Whether admins bypass the restriction |
| `fallback` | Fallback content for unauthorized users |

### `[arraysubs_visibility]` — Login State Shortcode

Show or hide content based on whether the user is logged in or logged out:

- `show="logged_in"` — content visible only to logged-in users
- `show="logged_out"` — content visible only to logged-out users
- `fallback` attribute for alternative content
- Supports nested shortcodes
- Extensible via `arraysubs_visibility_shortcode_show` filter

### 17+ Real-World Use Cases

Documented use cases cover patterns like member-only pricing tables, subscriber-only download links, tiered content access, course module dripping, premium feature previews, and more.

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Role Mapping Rules | ✅ | ✅ |
| Discount Rules | ✅ | ✅ |
| Ecommerce Restriction Rules | ✅ | ✅ |
| URL Restriction Rules (4 patterns, 4 actions) | ✅ | ✅ |
| Post Type Restriction Rules (3 modes, dripping) | ✅ | ✅ |
| Download Restriction Rules | ✅ | ✅ |
| 10 Condition Types | 9 Free | 10 with Pro |
| 12 Comparison Operators | ✅ | ✅ |
| AND/OR + Nested Groups | ✅ | ✅ |
| Content Dripping / Scheduled Access | ✅ | ✅ |
| `[arraysubs_restrict]` Shortcode (15 attributes) | ✅ | ✅ |
| `[arraysubs_visibility]` Shortcode | ✅ | ✅ |
| Per-Post Override (3 meta fields) | ✅ | ✅ |
| Feature Value Condition (condition type #8) | — | ✅ |
| Login Limit / Session Control Rules | — | ✅ |
