# Feature Manager

> Define per-plan entitlements — toggle features on/off, set numeric limits, and add text-based plan details per product or variation. Display them on the storefront, in the customer portal, and track usage across subscriptions.

**Tier**: Pro

---

## Feature Manager Overview (Pro)

Feature Manager lets merchants define named features (entitlements) on subscription products and communicate exactly what each plan includes. It bridges the gap between what a plan costs and what a plan delivers — critical for SaaS, membership, and tiered service businesses.

### 3 Feature Types

| Type | Description | Example |
|------|-------------|---------|
| Toggle | On/off entitlement — plan either includes it or doesn't | "Priority Support", "Custom Domain" |
| Number | Numeric limit or allocation per plan | "5 Team Seats", "100 API Calls", "50 GB Storage" |
| Text | Descriptive detail or plan-specific note | "Premium Theme", "Standard SLA", "Dedicated Account Manager" |

### Per-Product & Per-Variation Support

- **Simple Subscription Products**: Features defined directly on the product
- **Variable Subscription Products**: Features defined per variation, allowing plan differentiation (e.g., Basic variation: 5 seats, Pro variation: 25 seats, Enterprise variation: Unlimited)

### Feature Properties

| Property | Description |
|----------|-------------|
| Name | Display name shown to customers (e.g., "Team Seats") |
| Key | Unique machine identifier (e.g., `team_seats`) — auto-derived from name, editable |
| Type | Toggle, Number, or Text |
| Value | The feature's value for this product/variation (true/false for toggle, number for number, text for text) |

---

## Feature Templates (Pro)

Save and reuse common feature sets across products to maintain consistency and speed up product creation.

### How Templates Work

1. Define a set of features on one product
2. Save the set as a named template
3. Apply the template to other products — populates feature fields instantly
4. Edit per-product values after applying (template is a starting point, not a live link)

### Template Management

| Action | Description |
|--------|-------------|
| Save as Template | Save the current product's feature set with a custom name |
| Load Template | Apply a saved template to the current product |
| Delete Template | Remove a saved template from the list |

---

## Storefront Display — "What's Included" (Pro)

When enabled, a "What's Included" section appears on the product page, showing customers exactly what they get with each plan.

### Display Behavior

| Product Type | Display |
|-------------|---------|
| Simple Subscription | Single feature list on the product page |
| Variable Subscription | Feature list updates dynamically when the customer selects a different variation |

### Feature Rendering

| Feature Type | Display |
|-------------|---------|
| Toggle (enabled) | ✅ Feature Name |
| Toggle (disabled) | ❌ Feature Name |
| Number | Feature Name: **{value}** |
| Text | Feature Name: **{value}** |

### Settings

| Setting | Description |
|---------|-------------|
| Show on Product Page | Enable/disable the "What's Included" section on the storefront |
| Show Comparison | Show both enabled and disabled toggle features (comparison view) vs only enabled features |

---

## Customer Portal — "My Features" (Pro)

A dedicated My Account page where customers see all features they have access to across their active subscriptions.

### Feature Aggregation

When a customer has multiple active subscriptions, features are aggregated using one of two modes:

| Mode | Behavior | Best For |
|------|----------|----------|
| Per-Subscription | Features displayed separately for each active subscription | Service-specific entitlements (support level per plan) |
| Combined | Features merged across all subscriptions — toggles use logical OR, numbers are summed | Additive entitlements (total seats across all plans) |

### Aggregation Rules (Combined Mode)

| Feature Type | Aggregation |
|-------------|------------|
| Toggle | Logical OR — enabled if ANY subscription has it |
| Number | SUM across all active subscriptions |
| Text | Value from the first active subscription found |

### Display

- Feature name, type, and aggregated value
- Source subscription(s) shown in per-subscription mode
- Empty state message when no active subscriptions have features

### Settings

| Setting | Description |
|---------|-------------|
| Show in My Account | Enable/disable the My Features page |
| My Account Page Title | Custom title for the page (default: "My Features") |

---

## Usage Tracking (Pro)

Track how many times a feature entitlement has been consumed. Designed for metered or quota-based models (API calls, support tickets, downloads, etc.).

### How It Works

1. Merchant or external system records usage via helper functions
2. Usage stored as subscription-level meta
3. Customer sees current usage vs limit in My Features (when enabled)
4. Admin sees usage in the Feature Log

### Helper Functions

| Function | Purpose |
|----------|---------|
| `arraysubs_feature_record_usage($subscription_id, $feature_key, $amount)` | Add usage amount for a feature |
| `arraysubs_feature_reset_usage($subscription_id, $feature_key)` | Reset usage to zero |
| `arraysubs_feature_get_usage($subscription_id, $feature_key)` | Get current usage value |
| `arraysubs_feature_has_remaining($subscription_id, $feature_key)` | Check if usage is below the limit |
| `arraysubs_feature_get_remaining($subscription_id, $feature_key)` | Get remaining allocation |
| `arraysubs_feature_get_limit($subscription_id, $feature_key)` | Get the total limit for a feature |

### Usage Display

| Setting | Description |
|---------|-------------|
| Show Usage Count in My Account | Show "Used X of Y" in the customer portal |
| Show Usage Count in Admin | Show usage data in the admin Feature Log |

---

## Admin Feature Log (Pro)

A per-subscription log of all feature entitlements, visible in the subscription admin detail page.

### Log Columns

| Column | Description |
|--------|-------------|
| Feature Name | Display name of the feature |
| Type | Toggle, Number, or Text |
| Value | The entitlement value |
| Usage | Current usage / limit (when tracking is enabled) |

### Access

- Located on the individual subscription admin page (not a separate admin page)
- Shows features inherited from the subscription's product/variation
- Reflects current product configuration (updated when product features change)

---

## Feature Behavior by Subscription Status

| Status | Entitlement | Usage |
|--------|-------------|-------|
| Active | ✅ Full access | Tracked |
| On-Hold | ❌ Suspended | Frozen |
| Paused | ❌ Suspended | Frozen |
| Trial | ✅ Full access | Tracked |
| Cancelled | ❌ Revoked | Reset |
| Expired | ❌ Revoked | Reset |

---

## Plan Switching & Feature Manager

When a customer upgrades, downgrades, or crossgrades their plan via the customer portal:

1. New plan's features replace the old plan's features
2. Usage tracking is reset for the new plan period
3. My Features page reflects the new entitlements immediately
4. Feature Log on the admin subscription page updates accordingly

---

## Feature Manager Settings (Complete)

| Setting | Default | Description |
|---------|---------|-------------|
| Feature Manager Enabled | Off | Master toggle for the entire feature |
| Show on Product Page | On | Display "What's Included" on the storefront |
| Show in My Account | On | Display "My Features" page in customer portal |
| My Account Page Title | "My Features" | Custom title for the portal page |
| Show Usage Count in My Account | Off | Show usage counters to customers |
| Show Usage Count in Admin | Off | Show usage data in admin Feature Log |
| Show Comparison | Off | Show disabled toggle features alongside enabled ones |
| Aggregation Mode | per_subscription | How to combine features from multiple subscriptions |

---

## Integration Points

### Restriction Shortcode

The `[arraysubs_restrict]` shortcode supports feature-based gating:

```
[arraysubs_restrict feature="api_access" feature_value="1" feature_compare="gte"]
  Premium API documentation
[/arraysubs_restrict]
```

Attributes: `feature` (key), `feature_value`, `feature_compare` (eq/gt/gte/lt/lte), `feature_aggregation` (sum/max/any).

### Easy Setup Wizard

The setup wizard includes Feature Manager configuration when Pro is active — enabling/disabling the feature manager and its sub-settings.

### Manage Members (Pro)

The member insight page includes feature entitlement data for each customer's subscriptions.

---

## Business Use Cases

### SaaS Tiered Plans
Define API limits, team seats, storage quotas per plan. Customers see exactly what they get before subscribing. Usage tracking monitors consumption in real time.

### Membership Levels
Toggle premium content access, community features, download privileges. Comparison view shows what Basic misses vs Premium.

### Service Businesses
Text features describe service levels: "Standard Support", "24/7 Priority Support", "Dedicated Account Manager". Clear plan differentiation drives upgrades.

### Online Courses
Toggle access to bonus modules, track quiz attempt limits, communicate certification eligibility per plan level.
