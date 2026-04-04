# Feature Manager — Page Content

> **URL**: `/features/feature-manager/`
> **Status**: Draft
> **Source**: `source/features/feature-manager.md` + `page-strategy/t2-features/15-feature-manager.md`

---

<!-- SEO Head -->

**Title Tag**: WooCommerce Feature Manager — Per-Plan Entitlements for Subscriptions · ArraySubs Pro
**Meta Description**: Define toggle, numeric, and text entitlements per subscription plan. Show "What's Included" on product pages, track usage, and let customers compare plans. Pro feature.
**Canonical**: `https://arraysubs.com/features/feature-manager/`
**OG Image**: Screenshot of product page with "What's Included" section

---

<!-- Breadcrumb: Home → Features → Feature Manager -->

<!-- ========================================================= -->
<!-- SECTION 1 — HERO                                         -->
<!-- ========================================================= -->

## Section 1: Hero

**Layout**: Split — left text, right screenshot. Pro badge prominent. Background: white with subtle accent.

---

### Badge

PRO FEATURE · UNIQUE TO ARRAYSUBS

### Headline (H1)

Define What Each Subscription Plan Includes — Feature Manager

### Subheadline

The only WooCommerce subscription plugin that lets you define per-plan entitlements, display them on product pages, show them in the customer portal, and track usage — all built in, no external service needed.

### Hero Screenshot

Product page showing the "What's Included" section with a mix of toggle (✅/❌), number ("5 Team Seats"), and text ("Priority Support") features.

### CTA Row

| CTA | Style | Link |
|-----|-------|------|
| Get ArraySubs Pro | Primary | `/pricing/` |
| See All Features | Text link | `/features/` |

---

<!-- ========================================================= -->
<!-- SECTION 2 — THE PROBLEM                                   -->
<!-- ========================================================= -->

## Section 2: Every Plan Promises "More" — But Customers Can't See What

**Layout**: Two-column problem/solution. Background: light gray.

---

### Section Label

THE PROBLEM

### Headline (H2)

Your Pricing Page Says "Pro Gets More" — But Your Product Page Doesn't Prove It

### The Problem Column

Most subscription plugins let you set a price and a billing cycle. That's it. Customers land on a product page and see "$29/month" — but no breakdown of what they actually get. They can't compare plans side by side. They don't know if Basic includes 5 seats or 50. They don't know if Priority Support is included or an upsell.

The result: fewer upgrades, more support tickets asking "what do I get?", and higher churn when customers feel uncertain about their plan's value.

### The Solution Column — Feature Manager

Feature Manager makes plan value explicit. Define exactly what each plan includes — toggles, numeric limits, and descriptive details — and ArraySubs renders it on the product page, in the customer portal, and in admin logs. No custom code. No external entitlement system. Just define, display, and track.

---

<!-- ========================================================= -->
<!-- SECTION 3 — THREE FEATURE TYPES                          -->
<!-- ========================================================= -->

## Section 3: Three Feature Types — Every Entitlement Covered

**Layout**: 3-card horizontal grid. Each card: icon, type name, description, example screenshot. Background: white.

---

### Section Label

ENTITLEMENT TYPES

### Headline (H2)

Toggle, Number, Text — Three Types to Describe Any Plan

---

### Card 1: Toggle Features
- **Icon**: `toggle-left` (Lucide)
- **Description**: On/off entitlements. The plan either includes this feature or it doesn't. Perfect for binary access rights like Priority Support, Custom Domain, or API Access.
- **Example**: ✅ Priority Support, ❌ Custom Domain, ✅ API Access
- **Screenshot**: Product edit panel showing toggle feature rows

### Card 2: Number Features
- **Icon**: `hash` (Lucide)
- **Description**: Numeric limits and quotas. Set per-plan allocations that customers can see before subscribing and track after. Ideal for team seats, storage, API calls, or download limits.
- **Example**: Team Seats: **5**, Storage: **50 GB**, API Calls: **1,000/mo**
- **Screenshot**: Product edit panel showing number feature rows

### Card 3: Text Features
- **Icon**: `type` (Lucide)
- **Description**: Descriptive plan details. Communicate service levels, SLA terms, and qualitative differences between plans. Customers see exactly what each plan delivers in plain language.
- **Example**: Support Level: **Standard**, SLA: **24-hour response**, Account Manager: **Shared**
- **Screenshot**: Product edit panel showing text feature rows

---

<!-- ========================================================= -->
<!-- SECTION 4 — PRODUCT PAGE DISPLAY                         -->
<!-- ========================================================= -->

## Section 4: "What's Included" — Right on the Product Page

**Layout**: Full-width with large screenshot. Background: light gray.

---

### Section Label

STOREFRONT

### Headline (H2)

Customers See What They're Getting Before They Subscribe

### Body

When Feature Manager is enabled, ArraySubs automatically adds a "What's Included" section to your subscription product pages. Toggle features show ✅ or ❌ marks. Number features display the limit. Text features show the plan detail. For variable products, the feature list updates dynamically when customers select a different variation — so they can compare plans just by clicking through options.

### Comparison View

Enable comparison mode to show both included (✅) and excluded (❌) toggle features. This lets customers see what they're missing on lower plans — a natural upgrade driver without any pushy copy.

### Screenshot

Full product page showing "What's Included" with mixed feature types. Variation selector visible with one variation selected.

---

<!-- ========================================================= -->
<!-- SECTION 5 — CUSTOMER PORTAL                              -->
<!-- ========================================================= -->

## Section 5: My Features — The Customer's Entitlement Dashboard

**Layout**: Split — left text, right screenshot. Background: white.

---

### Section Label

CUSTOMER PORTAL

### Headline (H2)

Customers Always Know What They Have Access To

### Body

Feature Manager adds a "My Features" page inside the WooCommerce My Account area. Customers see every entitlement they have across their active subscriptions — toggles, limits, and details — in one view. No more "what do I get?" support tickets.

### Two Aggregation Modes

| Mode | How It Works | Best For |
|------|-------------|----------|
| Per-Subscription | Features listed separately for each subscription | Service-specific levels (support tier per plan) |
| Combined | Toggle features use OR, numbers are summed across subscriptions | Additive entitlements (total seats across all plans) |

### Screenshot

My Account → My Features page showing aggregated features from two active subscriptions.

---

<!-- ========================================================= -->
<!-- SECTION 6 — USAGE TRACKING                               -->
<!-- ========================================================= -->

## Section 6: Usage Tracking — Know How Much Customers Use

**Layout**: Split — left screenshot, right text. Background: light gray.

---

### Section Label

USAGE TRACKING

### Headline (H2)

Track Feature Consumption in Real Time

### Body

For metered entitlements — API calls, support tickets, downloads, team seat activations — Feature Manager includes a usage tracking system. Record consumption via simple helper functions, and both customers and admins see current usage vs. the plan limit.

### Customer View

"Used 847 of 1,000 API Calls" — shown directly in the My Features portal page.

### Admin View

The Feature Log on the subscription admin page shows entitlement values alongside current usage — giving support teams and account managers instant visibility into customer utilization.

### Developer-Friendly

Six PHP helper functions for recording, resetting, and querying usage. Integrate with any external system via WordPress hooks or REST API.

### Screenshot

Admin subscription detail page showing Feature Log with usage data.

---

<!-- ========================================================= -->
<!-- SECTION 7 — FEATURE TEMPLATES                            -->
<!-- ========================================================= -->

## Section 7: Feature Templates — Define Once, Apply Everywhere

**Layout**: 3-step horizontal flow. Background: white.

---

### Section Label

TEMPLATES

### Headline (H2)

Save Feature Sets as Templates and Apply Them Across Products

---

### Step 1: Define Features on Any Product
Set up toggle, number, and text features on a subscription product.

### Step 2: Save as Template
Click "Save as Template" and give it a name like "Pro Plan Features" or "Enterprise Tier".

### Step 3: Apply to Other Products
Select the template when editing another product — all feature fields populated instantly. Customize per-product values as needed.

---

<!-- ========================================================= -->
<!-- SECTION 8 — PLAN SWITCHING INTEGRATION                   -->
<!-- ========================================================= -->

## Section 8: Upgrade = Instant Feature Update

**Layout**: Two-panel before/after visual. Background: light gray.

---

### Section Label

PLAN SWITCHING

### Headline (H2)

When Customers Upgrade, Their Features Update Immediately

### Body

Feature Manager is fully integrated with ArraySubs' plan switching system. When a customer upgrades from Basic to Pro — whether through the customer portal, a plan switching link, or admin action — their entitlements update instantly. The old plan's features are replaced with the new plan's, usage tracking resets for the new period, and the customer's My Features page reflects the change immediately.

This makes plan switching tangible. Customers don't just pay more — they see more features unlocked, higher limits, and better plan details the moment they upgrade.

---

<!-- ========================================================= -->
<!-- SECTION 9 — CONTENT RESTRICTION                          -->
<!-- ========================================================= -->

## Section 9: Gate Content by Feature Entitlement

**Layout**: Code block + explanation. Background: white.

---

### Section Label

CONTENT GATING

### Headline (H2)

Restrict Content Based on Feature Entitlements

### Body

Use the `[arraysubs_restrict]` shortcode to gate content based on specific feature values. Show premium documentation only to customers with API Access enabled. Display advanced tutorials only to plans with 10+ team seats. Control visibility based on exact entitlement values — not just subscription status.

### Example

```
[arraysubs_restrict feature="api_access" feature_value="1"]
  Welcome to the API documentation. Your plan includes full API access.
[/arraysubs_restrict]
```

### Link

[Learn more about content restriction →](/features/member-access-control/)

---

<!-- ========================================================= -->
<!-- SECTION 10 — BUSINESS USE CASES                          -->
<!-- ========================================================= -->

## Section 10: How Businesses Use Feature Manager

**Layout**: 4-card grid. Each card: business type icon, headline, 3-4 bullet points. Background: light gray.

---

### Section Label

USE CASES

### Headline (H2)

From SaaS to Memberships — Feature Manager Fits Every Model

---

### Card 1: SaaS & Digital Products
- **Icon**: `cloud` (Lucide)
- Define API limits, team seats, and storage quotas per tier
- Track API call consumption with usage tracking
- Show feature comparison on pricing/product pages
- [SaaS use case →](/use-cases/saas-digital-products/)

### Card 2: Membership Sites
- **Icon**: `users` (Lucide)
- Toggle premium content access, community features, download rights
- Comparison view shows what Basic misses vs Premium
- Combined aggregation for members with multiple plans

### Card 3: Service Businesses
- **Icon**: `briefcase` (Lucide)
- Text features describe service levels: "Standard Support", "24/7 Priority", "Dedicated Account Manager"
- Number features set support ticket limits or consultation hours
- Make plan differentiation transparent to clients

### Card 4: Online Courses
- **Icon**: `graduation-cap` (Lucide)
- Toggle access to bonus modules and live sessions
- Number features limit quiz attempts or assignment submissions
- Text features show certification level per plan

---

### Below Cards CTA

| CTA | Style | Link |
|-----|-------|------|
| Unlock Feature Manager | Primary | `/pricing/` |
| See All Use Cases | Text link | `/use-cases/` |

---

<!-- ========================================================= -->
<!-- SECTION 11 — NO COMPETITOR HAS THIS                      -->
<!-- ========================================================= -->

## Section 11: No Other WooCommerce Subscription Plugin Has This

**Layout**: Comparison mini-table. Background: white.

---

### Section Label

UNIQUE TO ARRAYSUBS

### Headline (H2)

Feature Entitlements — Built In, Not Bolted On

### Body

WooCommerce Subscriptions doesn't have feature entitlements. Neither do YITH, WP Swings, or SUMO. Other subscription plugins let you set a price and a billing cycle — but they can't define what each plan includes, show it to customers, or track usage. Feature Manager is unique to ArraySubs Pro.

### Mini Comparison Table

| Capability | ArraySubs Pro | WooCommerce Subscriptions | YITH | Others |
|-----------|:---:|:---:|:---:|:---:|
| Per-plan feature definitions | ✅ | ❌ | ❌ | ❌ |
| Storefront "What's Included" | ✅ | ❌ | ❌ | ❌ |
| Customer portal entitlements | ✅ | ❌ | ❌ | ❌ |
| Usage tracking | ✅ | ❌ | ❌ | ❌ |
| Feature templates | ✅ | ❌ | ❌ | ❌ |
| Content gating by feature | ✅ | ❌ | ❌ | ❌ |

---

<!-- ========================================================= -->
<!-- SECTION 12 — FAQ                                          -->
<!-- ========================================================= -->

## Section 12: Frequently Asked Questions

**Layout**: Accordion-style FAQ. Apply `FAQPage` JSON-LD structured data.

---

### Section Label

FAQ

### Headline (H2)

Feature Manager — Got Questions?

---

**Q: Is Feature Manager a free feature?**

No. Feature Manager is a Pro feature included with ArraySubs Pro. The free core plugin includes subscriptions, memberships, billing, retention, customer portal, and more — but feature entitlement management requires Pro.

---

**Q: Can I define different features for each variation?**

Yes. On variable subscription products, each variation has its own feature set. This lets you define different entitlements for Basic, Pro, and Enterprise variations of the same product. The storefront display updates dynamically when customers select a variation.

---

**Q: Does Feature Manager work with plan switching?**

Yes. When a customer upgrades, downgrades, or crossgrades, their features update immediately. The old plan's entitlements are replaced with the new plan's, usage tracking resets, and the customer portal reflects the change instantly.

---

**Q: Can I track how much of a feature customers have used?**

Yes. Feature Manager includes a usage tracking system with PHP helper functions for recording, resetting, and querying usage. Customers see "Used X of Y" in their portal, and admins see usage data in the Feature Log on the subscription admin page.

---

**Q: Do other WooCommerce subscription plugins have this?**

No. ArraySubs is the only WooCommerce subscription plugin with a built-in feature entitlement system. Other plugins like WooCommerce Subscriptions, YITH, and WP Swings let you set prices and billing cycles, but they don't define what each plan includes or track feature usage.

---

**Q: Can I restrict content based on features?**

Yes. The `[arraysubs_restrict]` shortcode supports feature-based conditions. You can gate content based on specific feature keys, values, and comparison operators — allowing fine-grained content restriction beyond just subscription status.

---

### FAQ Structured Data (FAQPage JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Feature Manager a free feature?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Feature Manager is a Pro feature included with ArraySubs Pro. The free core plugin includes subscriptions, memberships, billing, retention, customer portal, and more — but feature entitlement management requires Pro."
      }
    },
    {
      "@type": "Question",
      "name": "Can I define different features for each variation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. On variable subscription products, each variation has its own feature set. This lets you define different entitlements for Basic, Pro, and Enterprise variations. The storefront display updates dynamically when customers select a variation."
      }
    },
    {
      "@type": "Question",
      "name": "Does Feature Manager work with plan switching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. When a customer upgrades, downgrades, or crossgrades, their features update immediately. The old plan's entitlements are replaced with the new plan's, usage tracking resets, and the customer portal reflects the change instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Can I track feature usage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Feature Manager includes usage tracking with helper functions for recording, resetting, and querying usage. Customers see 'Used X of Y' in their portal, and admins see usage in the Feature Log."
      }
    },
    {
      "@type": "Question",
      "name": "Do other WooCommerce subscription plugins have feature entitlements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. ArraySubs Pro is the only WooCommerce subscription plugin with built-in feature entitlement management — including per-plan definitions, storefront display, customer portal aggregation, and usage tracking."
      }
    },
    {
      "@type": "Question",
      "name": "Can I restrict content based on feature entitlements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The [arraysubs_restrict] shortcode supports feature-based conditions with key, value, and comparison operators for fine-grained content restriction."
      }
    }
  ]
}
```

---

<!-- ========================================================= -->
<!-- SECTION 13 — FINAL CTA                                    -->
<!-- ========================================================= -->

## Section 13: Final CTA

**Layout**: Full-width banner with brand gradient. Centered text. Background: brand accent.

---

### Headline (H2)

Show Customers What They're Paying For

### Subheadline

Define per-plan entitlements, display them on product pages, and track usage — all with Feature Manager in ArraySubs Pro.

### CTA Row

| CTA | Style | Link |
|-----|-------|------|
| Get ArraySubs Pro | Primary (white on brand) | `/pricing/` |
| Start with the Free Plugin | Text link | `/download/` |

### Micro-copy

The core plugin is free forever. Upgrade to Pro when you're ready for Feature Manager, Store Credit, Checkout Builder, Analytics, and more.

---

<!-- ========================================================= -->
<!-- DESIGN & DEVELOPMENT NOTES                                -->
<!-- ========================================================= -->

## Design & Development Reference

### Page Skeleton (section order)

| # | Section | Background | Priority |
|---|---------|------------|----------|
| 1 | Hero | White / subtle accent | Critical |
| 2 | The Problem | Light gray | Critical |
| 3 | Three Feature Types (3 cards) | White | Critical |
| 4 | Storefront Display | Light gray | Critical |
| 5 | Customer Portal | White | Critical |
| 6 | Usage Tracking | Light gray | High |
| 7 | Feature Templates | White | High |
| 8 | Plan Switching Integration | Light gray | High |
| 9 | Content Restriction | White | Medium |
| 10 | Business Use Cases (4 cards) | Light gray | Critical |
| 11 | Unique — No Competitor Has This | White | Critical |
| 12 | FAQ | White | Critical (GEO) |
| 13 | Final CTA | Brand gradient | Critical |

### Internal Links (outbound from this page)

| Target | Section |
|--------|---------|
| `/pricing/` | Hero, Use Cases, FAQ, Final CTA |
| `/features/` | Hero breadcrumb, Final CTA |
| `/download/` | Final CTA |
| `/features/subscriptions-and-recurring-products/` | Three Feature Types |
| `/features/customer-portal/` | Customer Portal section |
| `/features/member-access-control/` | Content Restriction section |
| `/features/retention-flow-builder/` | Use Cases |
| `/features/analytics/` | Usage Tracking |
| `/features/manage-subscriptions/` | Admin Feature Log |
| `/use-cases/saas-digital-products/` | SaaS Use Case card |
| `/use-cases/` | Use Cases section |

### Screenshot Requirements

| # | Screenshot | Resolution |
|---|-----------|-----------|
| 1 | Product page "What's Included" section (variable product, variation selected) | 1200×800 |
| 2 | Product edit screen — Feature Manager panel | 1200×600 |
| 3 | My Account → My Features (combined mode, multiple subscriptions) | 1200×600 |
| 4 | Admin subscription detail → Feature Log with usage | 1200×400 |
| 5 | Template save/load dialog | 800×500 |
