# Retention Flow Builder

> A cancellation interception system that captures reasons, presents targeted retention offers, and saves subscribers before they leave — with 4 offer types, analytics integration, and 18 real-world use cases.

**Tier**: Free (Cancellation Flow, Retention Offers, Analytics) + Pro (Refund-to-Store-Credit)

---

## Cancellation Flow (Free)

When a customer clicks "Cancel" in the customer portal, they enter a guided flow designed to understand why they're leaving and offer alternatives.

### Flow Sequence

```
Customer clicks Cancel
        │
        ▼
   Step 1: Select Reason
        │
        ▼
   Step 2: Retention Offers (matched to reason)
        │
        ├── Accept Offer → Subscription saved
        │
        ▼
   Step 3: Confirm Cancellation → Subscription cancelled
```

### Cancellation Modes

| Mode | Description |
|------|-------------|
| Immediate | Subscription cancelled and access revoked right away |
| End-of-Period | Subscription marked as "pending cancellation" — remains active until end of current billing period |

The mode is configurable in settings.

### 7 Default Cancellation Reasons

| Key | Label |
|-----|-------|
| `too_expensive` | Too expensive |
| `not_using` | Not using it enough |
| `found_alternative` | Found a better alternative |
| `missing_features` | Missing features I need |
| `technical_issues` | Technical issues |
| `temporary_pause` | Just need a temporary break |
| `other` | Other (with free-text textarea) |

### Custom Reasons

- Add unlimited custom reasons with configurable key and label
- The "Other" reason always includes a free-text textarea for detailed feedback
- Reasons can be enabled, disabled, reordered, or removed

### Undo Scheduled Cancellation

When a subscription is set to cancel at end-of-period, a "Keep My Subscription" button appears on the customer portal. Clicking it reverts the pending cancellation and returns the subscription to active.

---

## Retention Offers (Free)

4 types of retention offers can be presented to customers before they complete cancellation. Each offer can be targeted to specific cancellation reasons.

### Discount Offer

| Setting | Description |
|---------|-------------|
| Enable Toggle | Turn this offer on or off |
| Trigger Reasons | Which cancellation reasons show this offer (multi-select) |
| Discount Percentage | How much off (e.g., 20%) |
| Number of Cycles | How many renewal cycles the discount lasts |
| Custom Headline | Offer title with placeholder support |
| Custom Description | Offer body text with placeholder support |

**Rules:**
- One discount per subscription — if a retention discount is already active, this offer won't appear
- Gateway limitations: PayPal and Paddle don't support recurring amount changes mid-subscription, so discount behavior may vary

### Pause Offer

| Setting | Description |
|---------|-------------|
| Enable Toggle | Turn this offer on or off |
| Trigger Reasons | Which cancellation reasons show this offer |
| Pause Duration | How long the subscription pauses (days) |
| Custom Headline | Offer title |
| Custom Description | Offer body text |

After the pause duration, the subscription automatically resumes.

### Downgrade Offer

| Setting | Description |
|---------|-------------|
| Enable Toggle | Turn this offer on or off |
| Trigger Reasons | Which cancellation reasons show this offer |
| Custom Headline | Offer title |
| Custom Description | Offer body text |

Redirects the customer to the plan switching flow. Requires pre-configured downgrade paths on the subscription product (set in the Linked Products tab).

### Contact Support Offer

| Setting | Description |
|---------|-------------|
| Enable Toggle | Turn this offer on or off |
| Trigger Reasons | Which cancellation reasons show this offer |
| Support URL | External link to a support page or chat system |
| Custom Headline | Offer title |
| Custom Description | Offer body text |

### Trigger Reason Targeting

Each offer can be mapped to specific cancellation reasons:

- "Too expensive" → Show Discount and Downgrade offers
- "Not using it enough" → Show Pause and Downgrade offers
- "Technical issues" → Show Contact Support offer
- "Just need a break" → Show Pause offer

This allows precise targeting — different reasons surface different offers.

### Eligibility Conditions

Offers are evaluated for eligibility before being shown:

| Condition | Description |
|-----------|-------------|
| Subscription Value | Minimum recurring amount to qualify |
| Customer Total Spend | Minimum lifetime spend threshold |
| Remaining Days | Minimum days remaining in the billing period |
| Already Used | Check if this offer has already been used on this subscription |

---

## Cancellation Modal (Free)

The cancellation experience is presented as a responsive modal with 3 steps.

### Step 1 — Select Reason

- List of all enabled cancellation reasons as selectable options
- "Other" option with free-text textarea
- Continue button to proceed

### Step 2 — Retention Offers

- One or more offers matched to the selected reason, displayed as cards
- Each card shows the offer headline, description, and an accept button
- Customer can accept an offer (subscription saved) or skip to continue

### Step 3 — Confirm Cancellation

- Final confirmation screen with subscription details
- Confirm button completes the cancellation
- Cancel button returns to the subscription portal

---

## Retention Analytics Integration (Free)

The retention system feeds directly into the analytics dashboard.

### 8 KPI Cards

| KPI | Description |
|-----|-------------|
| Total Cancellations | Number of completed cancellations |
| Retention Offers Shown | How many times offers were displayed |
| Offers Accepted | How many offers were accepted by customers |
| Save Rate | Percentage of cancellation attempts saved |
| Discounts Given | Number of discount offers accepted |
| Pauses Given | Number of pause offers accepted |
| Downgrades Given | Number of downgrade redirects accepted |
| Support Redirects | Number of contact support clicks |

### Charts

- **Churn Reasons** pie chart — breakdown of why customers cancel
- **Retention Offer Distribution** pie chart — which offers are most accepted
- **Trend Line** — cancellations vs saves over time

### Activity Logs

Detailed per-entry logs for every cancellation attempt:

- Customer name
- Subscription ID
- Selected reason
- Offer shown (if any)
- Offer accepted or declined
- Final outcome

### Product Filter

Filter all retention analytics by product for per-product breakdowns. Auto-backfill ensures historical data is included.

---

## Refund-on-Cancellation Options (Free + Pro)

When a subscription is cancelled, configurable refund behavior controls what happens next.

### 3 Refund Modes

| Mode | Description |
|------|-------------|
| Allow Immediate | Full refund processed immediately on cancellation |
| Refund at End of Period | Prorated refund calculated for the unused portion |
| No Automatic Refund | No refund — manual refunds only |

### Prorated Refund Calculation

For partial-period cancellations:

```
Daily Rate = Recurring Amount ÷ Days in Billing Period
Unused Days = Days Remaining in Current Period
Prorated Refund = Daily Rate × Unused Days
```

### Settings

| Setting | Description |
|---------|-------------|
| Minimum Refund Amount | Refunds below this threshold are skipped |
| Automatic Gateway Refund | Toggle whether refunds are sent to the payment gateway automatically |
| Refund-to-Store-Credit | (Pro) Option to issue the refund as store credit instead of a gateway refund |

---

## 18 Real-World Use Cases

The retention system is designed to address a wide range of churn scenarios:

| # | Scenario | Recommended Offers |
|---|----------|-------------------|
| 1 | Price-sensitive subscriber | Discount, Downgrade |
| 2 | Seasonal member (summer/winter use) | Pause |
| 3 | Overwhelmed user wanting simpler plan | Downgrade |
| 4 | Technical problem preventing use | Contact Support |
| 5 | Newsletter subscriber wanting a break | Pause |
| 6 | Post-price-increase exodus | Discount |
| 7 | Annual subscriber exploring alternatives | Discount, Downgrade |
| 8 | Subscription box burnout | Pause, Downgrade |
| 9 | Free trial conversion rescue | Discount |
| 10 | Entrepreneur downsizing expenses | Downgrade, Discount |
| 11 | Holiday season pause request | Pause |
| 12 | B2B subscriber in ROI review | Contact Support, Discount |
| 13 | Competitor counter-offer | Discount |
| 14 | First-month buyer's remorse | Discount, Contact Support |
| 15 | Content consumer breaking a habit | Pause |
| 16 | Budget reset subscriber | Discount, Pause |
| 17 | Parent adjusting seasonal subscription | Pause, Downgrade |
| 18 | Multi-subscription consolidation | Downgrade, Contact Support |

### Retention Math

Example: A store with 100 cancellation attempts/month and a 40% save rate on a $30/month subscription saves 40 × $30 × 12 = **$14,400/year** in recurring revenue.

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Cancellation Flow (3-step modal) | ✅ | ✅ |
| 7 Default Cancellation Reasons | ✅ | ✅ |
| Custom Cancellation Reasons | ✅ | ✅ |
| Undo Scheduled Cancellation | ✅ | ✅ |
| Discount Retention Offer | ✅ | ✅ |
| Pause Retention Offer | ✅ | ✅ |
| Downgrade Retention Offer | ✅ | ✅ |
| Contact Support Offer | ✅ | ✅ |
| Per-Reason Offer Targeting | ✅ | ✅ |
| Retention Analytics (8 KPIs, Charts, Logs) | ✅ | ✅ |
| Refund-on-Cancellation (3 modes) | ✅ | ✅ |
| Prorated Refund Calculation | ✅ | ✅ |
| Refund-to-Store-Credit | — | ✅ |
