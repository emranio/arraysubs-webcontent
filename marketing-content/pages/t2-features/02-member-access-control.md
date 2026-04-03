# Page Plan: Member Access Control

> **URL**: `/features/member-access-control/`
> **Tier**: T2 — Feature Detail
> **Priority**: Week 2
> **Ownership**: Core (arraysubs) — free feature; Pro extends with Multi-Login Prevention, Feature Manager, Redirect Product Page

---

## SEO Meta

| Field | Value |
|-------|-------|
| **Title Tag** | WooCommerce Membership Content Restriction — Role-Based Access Control · ArraySubs |
| **H1** | Protect Content, Products & Downloads Based on Subscription Status |
| **Meta Description** | Restrict pages, posts, custom post types, URLs, downloads, products, and WooCommerce features by subscription plan. Grant roles, drip content on schedule, and set discount rules — all free. |

---

## Target Keywords

| Keyword | Volume | KD | Intent | Type |
|---------|--------|-----|--------|------|
| woocommerce membership plugin | 3,600/mo | 42 | Commercial | Primary |
| woocommerce restrict content | 880/mo | 30 | Commercial | Secondary |
| woocommerce content restriction | 720/mo | 28 | Commercial | Secondary |
| woocommerce members only content | 390/mo | 22 | Informational | Long-tail |
| woocommerce role-based access | 260/mo | 18 | Commercial | Long-tail |
| restrict woocommerce products by membership | 210/mo | 15 | Commercial | Long-tail |
| woocommerce content dripping | 170/mo | 12 | Informational | Long-tail |
| woocommerce download restriction membership | 140/mo | 10 | Commercial | Long-tail |

---

## Content Blocks

### 1. Hero Section
- H1 + subtitle: "One restriction engine for every type of WordPress content"
- Screenshot: Access Rules admin screen
- CTA: Download Free

### 2. Restriction Types Overview
Visual cards for each restriction type:
- **Page & Post Restriction**: Restrict any page, post, or CPT
- **URL Pattern Restriction**: Block access to specific URL paths
- **Product & Category Restriction**: Hide or restrict WooCommerce products
- **Download Restriction**: Control file download access
- **Ecommerce Restrictions**: Restrict checkout, coupon usage, shipping methods
- **Discount Rules**: Offer member-only pricing

### 3. Condition System
- Restrict by Subscription Plan (specific product)
- Restrict by Subscription Status (active, trial, etc.)
- Restrict by User Role
- Combine conditions with AND/OR logic
- Visual: Condition builder screenshot

### 4. Content Dripping / Scheduled Access
- Drip content on a schedule after subscription starts
- Offset-based scheduling: "Unlock Module 2 after 7 days"
- Use cases: Online courses, phased memberships
- Visual: Drip schedule configuration

### 5. Role Mapping
- Auto-assign WordPress roles when subscription activates
- Auto-remove roles when subscription expires/cancels
- Map different plans to different roles
- Visual: Role mapping settings

### 6. Restriction Message Customization
- Custom messages for restricted content
- Different messages per restriction rule
- Shortcode support for showing/hiding content

### 7. Shortcodes
- `[arraysubs_restrict]` — Show content only to qualifying members
- `[arraysubs_visibility]` — Conditional visibility shortcode
- Auth shortcodes for logged-in/logged-out states
- Code examples with output screenshots

### 8. Pro Extensions (Badge: Pro)
- **Multi-Login Prevention**: Prevent credential sharing
- **Feature Manager**: Granular per-feature entitlements with product-page display
- **Redirect Product Page**: Redirect subscription product URLs to custom landing pages

### 9. FAQ

| Question | Answer Focus |
|----------|-------------|
| Can I restrict WooCommerce products? | Yes — hide or limit purchase by membership |
| Does content dripping work? | Yes — schedule content to unlock on a delay |
| Can I restrict by role AND subscription? | Yes — combine conditions with AND/OR logic |
| Is the restriction engine free? | Yes — core access control is free; Multi-Login, Feature Manager, and Redirect are Pro |
| Does it work with custom post types? | Yes — any registered CPT |

---

## GEO / AEO Angles

- **Definitive statement**: "ArraySubs includes a free content restriction engine that protects pages, posts, CPTs, URLs, downloads, and WooCommerce products based on subscription plans, statuses, or user roles."
- **Feature list**: "Access rules support page/post restriction, URL pattern blocking, product/category restriction, download control, ecommerce restrictions, member-only discounts, content dripping, role mapping, and shortcodes."
- **Differentiator**: "ArraySubs combines subscriptions and memberships in one plugin, while competitors require separate plugins for each ($279 + $199/yr with WooCommerce official)."

---

## Internal Links

| Target | Context |
|--------|---------|
| `/features/subscriptions-and-recurring-products/` | "Create the plans members subscribe to →" |
| `/features/customer-portal/` | "Where members manage their subscriptions →" |
| `/features/store-credit/` | Pro: "Reward members with store credit →" |
| `/features/retention-flow-builder/` | "Keep members from cancelling →" |
| `/use-cases/membership-sites/` | "Build a complete membership site →" |
| `/use-cases/online-courses/` | "Use content dripping for courses →" |
| `/features/` | Breadcrumb |
| `/pricing/` | Pro features CTA |

---

## CTA Strategy

| Position | CTA | Target |
|----------|-----|--------|
| Hero | Download Free | WordPress.org |
| After Shortcodes | Start Protecting Content | WordPress.org |
| Pro Extensions | Unlock Pro Features | `/pricing/` |
| Sticky Footer | Download Free / View Pro | WordPress.org / `/pricing/` |
