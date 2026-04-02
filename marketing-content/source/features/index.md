# ArraySubs Feature Documentation — Master Outline

> Source of truth for all marketing content: copywriting, landing pages, email campaigns, comparison charts, and sales materials. Each section below maps to a dedicated feature markdown file.

---

## 1. Advanced Analytics (`advanced-analytics.md`)

### 1.1 Reports Hub (Free)
- Central dashboard with 40+ report links across 12 categories
- Summary bar with total counts for each report area
- Quick-navigation category grid
- Deep links into every analytics sub-page

### 1.2 Subscription Performance Dashboard (Pro)
- 10 KPI cards: Active Subscriptions, MRR, New Subscriptions, Churned Subscriptions, Churn Rate, Trial Conversions, Renewal Revenue, Revenue at Risk, ARPU, Retention Saves
- 6 time-series charts: Subscription Growth, Revenue Trend, Churn Trend, Trial Conversion Trend, Retention Trend, Net Growth
- 5 leaderboards: Top Products by Active Subs, Top Products by Revenue, Top Churning Products, Recent Subscriptions, Recent Cancellations
- Date range selector (7d / 30d / 90d / 12m / Custom) with automatic interval (daily/weekly/monthly)
- 1-hour server-side cache for performance

### 1.3 WooCommerce Analytics Extension (Pro)
- Type column added to WooCommerce Orders analytics
- Quick filter dropdown + advanced Report Filters for order types
- 3 Revenue report cards: Subscription Revenue, Non-Subscription Revenue, Subscription Revenue %
- "Subscription Products Only" toggle in Products report
- Member details link for each customer row
- HPOS + legacy post-type support

### 1.4 Order List Enhancements (Pro)
- Type column and Coupon column added to WooCommerce Orders list
- 3 filter dropdowns: Order Type, Subscription Product, Coupon Used
- Embedded statistics report panel with date range
- Order Type Backfill Tool (200 orders/batch) for historical data

### 1.5 Retention Analytics (Free)
- 8 KPI cards: Total Cancellations, Retention Offers Shown, Offers Accepted, Save Rate, Discounts Given, Pauses Given, Downgrades Given, Support Redirects
- Churn Reasons pie chart, Retention Offer Distribution pie chart
- Trend line chart (cancellations vs saves over time)
- Activity Logs table with per-entry details
- Product filter for per-product breakdown
- Auto-backfill for missing historical data

### 1.6 Order Type Classification
- 6 order types: Credit Purchase, Subscription Trial, Subscription Renewal, Subscription Upgrade, Subscription Purchase, Other
- Priority-based classification engine
- Auto-assigned at order creation; Backfill tool for pre-existing orders

---

## 2. Audits & Logs (`audits-and-logs.md`)

### 2.1 Activity Audits (Pro)
- Centralized timeline for all subscription, member, and store credit changes
- 4 author-role indicators: Customer, Admin, System, Gateway
- 8 entity types tracked: Subscription, Order, Customer, Payment, Store Credit, Refund, Settings, Feature Entitlement
- Structured change diff with old → new value display
- 5 filters: Date range, Entity type, Author role, Subscription ID, Customer
- Configurable logging (enable per entity type, retention period)
- 30 entries per page with pagination

### 2.2 Scheduled-Job Logs (Pro)
- Full Action Scheduler history for 20+ job types across 6 categories: Renewals, Billing, Emails, Status, Retry, Maintenance
- Job status tracking: Pending, In-Progress, Complete, Failed, Cancelled
- Filter by job group and status
- Direct link to Action Scheduler admin for advanced debugging

### 2.3 Gateway Health Dashboard (Pro)
- Status cards for Stripe, PayPal, Paddle with connection state, subscription count, last webhook timestamp
- Expanded details: webhook URL (copy-ready), capability badges, direct settings link
- 5 gateway states: Connected, Connected (Test Mode), Needs Setup, Disabled, Unavailable
- Webhook Event Log: paginated table (50/page), gateway + event type filters, 30-day retention
- Signature verification status per event

### 2.4 Troubleshooting Guides
- Renewal Failures diagnosis
- Portal Action Failures
- Access-Rule Conflicts (AND/OR logic, nested groups, rule priority)
- Payment and Shipping Issues

---

## 3. Billing, Renewals & Refunds (`billing-renewals-and-refunds.md`)

### 3.1 Renewal Operations (Free + Pro)
- 3 background jobs: Generate Upcoming Renewals, Check Overdue Renewals, Process Trial Conversions
- Invoice generation 6 hours before due date
- Manual vs automatic payment routing (Core creates invoice → Pro charges gateway)
- Renewal Sync: Monthly / Weekly / Yearly alignment with configurable sync day
- Sync is a global system-level setting (applies to all subscription products, not per-product)
- First-payment proration options: Prorate first payment or Extend billing period
- Different Renewal Price support (override recurring price)
- Subscription Length / Fixed End-Date for automatic expiration

### 3.2 Trial Management (Free + Pro)
- Trial period configuration per product (days)
- Daily 2AM batch conversion job
- Sign-up fee support during trial
- One Trial Per Customer enforcement
- Require Payment Method for Trials setting
- Auto-Downgrade on Trial Expiry (Pro): downgrade to a cheaper plan instead of cancel

### 3.3 Grace Period & Recovery (Free)
- Two-phase grace period: Active Grace (default 3 days) → On-Hold Grace (default 7 days) → Cancelled
- Configurable: Generate Invoice Before Due (hours), Active Days, On-Hold Days
- Timeline visualization: Day 0 (due date) → Day 3 (on-hold) → Day 10 (cancelled)
- Payment at any point restores subscription to Active

### 3.4 Skip & Pause (Free)
- Skip Next Renewal: max 3 consecutive skips, 2-day cutoff before due date
- Undo Skip or modify skip cycle count at any time before the skipped renewal
- Pause / Vacation Mode: max 30-day pause, max 2 pauses per subscription, 30-day cooldown
- Auto-resume after pause duration
- Pause eligibility rules and cooldown enforcement

### 3.5 Refund Management (Free + Pro)
- 3 refund-on-cancellation options: Allow Immediate, Refund at End of Period, No Automatic
- Automatic Gateway Refund toggle
- Prorated Refunds: daily rate calculation for partial period
- Minimum Refund Amount threshold
- Refund processing flow (5 steps with two-way sync guard)
- 3 refund types: Prorated (via REST with preview), Full Order, Partial Order
- Refund History display on subscription detail
- Refund-to-Store-Credit (Pro): "As Store Credit" refund method on WooCommerce order screen, balance preview, no WC refund record created, guest orders ineligible

### 3.6 Renewal Communication (Free)
- 6 billing-related email triggers mapped to lifecycle events: Renewal Reminder, Renewal Invoice, Payment Successful, Payment Failed, Subscription On-Hold, Subscription Cancelled

---

## 4. Payment Gateways & Checkout (`payment-gateways-and-checkout.md`)

### 4.1 Subscription Checkout (Free)
- 3-phase checkout: Cart Validation → Payment Processing → Subscription Creation
- 5 cart validation rules: mixed cart control, one-per-customer, one-per-product, billing cycle compatibility, gateway capability
- One-Click Checkout (3 modes): Default product only, Subscription products only, All products
- Disable Cart Page option (straight to checkout)
- Trial handling: $0 total orders, sign-up fee + trial combos
- Plan Switching at Checkout: 6 eligibility conditions, 3 proration methods (Prorate Immediately, Apply at Renewal, No Proration), normalized daily rate comparison with 5% tolerance
- Block Checkout (Store API) + Classic Checkout (shortcode) support
- Auto-create customer account at checkout

### 4.2 Automatic Payments Overview (Pro)
- 2 billing models: ArraySubs-managed (Stripe) vs Gateway-managed (PayPal, Paddle)
- 19-capability gateway comparison matrix
- 10+ payment meta keys stored per subscription
- 9 normalized webhook event types
- Admin detach/reconnect gateway capability

### 4.3 Stripe Gateway (Pro)
- PaymentIntents for renewals, SetupIntents for $0 trials, Checkout Sessions for initial purchase
- SCA / 3D Secure compliance (automatic at checkout and during off-session renewals)
- Card auto-update via Visa Account Updater / Mastercard ABU
- Card expiry notices
- Dispute handling (webhook-driven logging)
- Payment method update via SetupIntent + Stripe Elements
- 13 webhook events
- Test mode support

### 4.4 PayPal Gateway (Pro)
- Gateway-managed billing via Billing Agreements
- Smart Payment Buttons (PayPal, PayPal Credit, Venmo where available)
- Trial support via Billing Plan trial cycle
- Payment method update via new Billing Agreement
- Dispute handling
- Limitations: no mixed carts, no multiple subscriptions, no different billing cycles, no pause/resume, no card auto-update, no retention amount update
- 8 webhook events with API-based signature verification

### 4.5 Paddle Gateway (Pro)
- Merchant of Record model: Paddle handles tax/VAT, compliance, invoicing across 200+ countries
- Paddle.js overlay checkout (cards, PayPal, Apple Pay, Google Pay, local methods)
- Product catalog sync (auto-creates Paddle Products/Prices)
- Native pause/resume at gateway level
- Trial support via Paddle Price trial phase
- Limitations: no different billing cycles, no card expiry notices, no retention amount update
- 8 webhook events with SHA-256 signature verification

### 4.6 Auto-Renew & Manual Fallback (Pro)
- Customer-facing auto-renew toggle on View Subscription page
- Global enable/disable in settings
- Toggle requirements: eligible status, connected gateway, valid payment method
- Manual invoice collection flow: invoice created → email with Pay Now link → customer pays via any WooCommerce payment method → subscription extended
- Grace period applies to unpaid manual invoices
- Stored payment method preserved when auto-renew is off

### 4.7 Gateway Health Dashboard (Pro)
- Gateway status cards with subscription counts and last webhook
- Webhook URL display for easy copy to gateway dashboards
- Capability badges per gateway
- Webhook Event Log with 50/page pagination and 30-day retention
- Post-setup verification workflow

---

## 5. Checkout Builder (`checkout-builder.md`)

### 5.1 Builder Interface (Pro)
- Full-screen visual drag-and-drop editor
- Left sidebar: Elements palette (27 types in 3 categories) + Design panel
- Right panel: Step tabs + field grid
- Toolbar: Save, Discard, Reset
- Field settings panel (label, key, placeholder, required, type-specific options, visibility rules)

### 5.2 Field Types — 27 Total
- **9 Standard**: Text, Number, Email, Phone, Select, Multi-Select, Textarea, Checkbox, Toggle
- **9 Advanced**: Upload, Image Select, Grid Select, Color Picker, Calendar, Date, DateTime, Time, Date Range
- **9 Layout**: Heading, Section (1-3 columns), Paragraph, Alert (info/success/warning/error), Billing Address, Shipping Address, Order Notes, Coupon/Notices, Order Info/Payment (mandatory)

### 5.3 Multi-Step Checkout
- Unlimited steps with custom step labels
- Step navigation: numbered tabs or progress bar
- Fields assigned to steps via drag-and-drop
- Validation at submission (not per-step)

### 5.4 Conditional Visibility
- Show/hide fields based on other field values
- 5 operators: is, is not, contains, starts with, ends with
- Conditionally hidden fields skip validation

### 5.5 Section-Based Layouts
- 1, 2, or 3 column sections
- Fields within a column stack vertically
- Per-field column width: full, 1/2, 1/3

### 5.6 Design Panel
- Color customization (primary, backgrounds, borders, text)
- Spacing and border radius controls
- Step navigation style selection
- Brand-consistent checkout appearance

### 5.7 Data Flow
- All custom fields stored as order meta with `_arraysubs_cf_` prefix
- Copy to Subscription toggle (persist data on subscription)
- Copy to Renewal Orders toggle (include in every renewal invoice)
- Show on Order Admin / Show on Order Customer / Show on Subscription Detail toggles
- File uploads stored in `wp-content/uploads/arraysubs-checkout-uploads/{order_id}/`

### 5.8 Upload Settings
- Global uploads enable/disable toggle
- Max file size (global cap)
- Per-field allowed types and size limits
- Multiple file support per field

### 5.9 4 Locked Fields
- Billing Address, Shipping Address, Order Notes, Order Info/Payment cannot be removed (auto-restored if missing)

---

## 6. Profile Builder (`profile-builder.md`)

### 6.1 Custom Profile Fields (Free)
- Enable/disable toggle for custom fields
- 6 field types: Text, Textarea, Select, Date, Checkbox, File Upload
- Field properties: Label, Key (auto-generated, `arraysubs_pf_` prefix), Placeholder, Help Text, Required
- Drag-and-drop reordering, enable/disable per field, delete
- Fields appear on: WooCommerce My Account → Account Details, WordPress Admin → Users → Edit User, WordPress Admin → Users → Add New
- Data stored as WordPress user meta (`arraysubs_pf_{key}`)
- File Upload: configurable allowed types (safe whitelist), max size 1-100 MB, files in `wp-uploads/arraysubs-profiles/{user_id}/` with `.htaccess` protection
- Audit logging of all profile field changes

### 6.2 Avatar Upload (Free)
- Enable/disable toggle
- Max file size: 1-20 MB; configurable allowed file types (default: jpg, jpeg, png, gif, webp)
- Customer-facing: preview, upload/change, remove buttons with instant REST API upload
- Admin-facing: 96×96 preview, file input, remove checkbox
- Stored in `wp-uploads/arraysubs-avatars/{user_id}-{random}.{ext}` with `.htaccess` protection
- Replaces Gravatar site-wide via `get_avatar()`
- Gravatar fallback when no custom avatar

### 6.3 My Account Editor (Free)
- Enable/disable menu customization toggle
- Drag-and-drop reorder of all My Account menu items
- Rename any menu item (custom label with original shown as reference)
- Show/hide menu items (visibility only, endpoints still accessible)
- Custom Endpoint Pages: link any WordPress page/post inside My Account with clean URLs
- Endpoint slug validation (no conflicts with WooCommerce endpoints)
- Prevent Direct Access option (302 redirect from original page URL to My Account endpoint)
- Page builder content renders inside My Account wrapper (Gutenberg, Elementor, Bricks)
- Pro feature menu items auto-managed: My Features, Store Credit, Subscriptions
- New plugin items auto-append to saved config
- Priority 99 ensures editor always wins

### 6.4 Shortcodes (Free + Pro)
- **Account Shortcodes**:
  - `[arraysubs_login]` — Login link (auto-hidden for logged-in users); attrs: text, url, redirect, class
  - `[arraysubs_logout]` — Logout link (auto-hidden for logged-out users); attrs: text, redirect, class
  - `[arraysubs_user]` — Current user name; attrs: field (display_name/username/first_name/last_name/full_name), fallback
- **Visibility Shortcode**:
  - `[arraysubs_visibility]` — Show/hide content by login state; attrs: show (logged_in/logged_out), fallback (supports nested shortcodes)
  - Extensible via `arraysubs_visibility_shortcode_show` filter
- **Restriction Shortcode**:
  - `[arraysubs_restrict]` — Gate content by subscription status, products, variations, purchased products, lifetime spending, feature entitlements, roles; 15 attributes
  - AND/OR condition logic
  - Feature Manager entitlement checks (Pro): feature key, min value, comparison operator, aggregation (sum/max/any)
  - Custom unauthorized message or redirect URL
  - Admin bypass (show_to_admins)
- **Store Credit Shortcode** (Pro):
  - `[arraysubs_buy_credits]` — Embeddable purchase form for store credit products
- Admin shortcode catalog page at ArraySubs → Shortcodes with copy-ready examples

---

## 7. Self-Managed Customer Portal (`customer-portal.md`)

### 7.1 My Subscriptions List (Free)
- 6 columns: Status (color-coded badge), Subscription (ID + product name), Recurring Amount (with discount/coupon display), Next Payment Date, Start Date, Actions (View Details button)
- Pagination (10 per page)
- Each row links to the subscription detail page

### 7.2 View Subscription Detail Page (Free)
- 9-row overview table: Status, Product, Recurring Amount (with discount math shown), Billing Cycle, Start Date, End Date, Next Payment Date, Trial End Date, Last Updated
- Related Orders section with Pay link for pending invoices
- Refund History with date + amount
- Subscription Notes timeline with author badges (Customer/Admin/System/Gateway)

### 7.3 Self-Service Actions (Free + Pro)
- **Cancel Subscription**: Immediate or end-of-period (per settings), modal with reason selector
- **Undo Scheduled Cancellation**: Reverts pending cancellation
- **Retention Offers** (Free): 4 types — Discount, Pause, Downgrade, Contact Support (shown during cancellation flow)
- **Change Plan** (Free): Modal with Upgrade/Downgrade/Crossgrade tabs, proration preview before confirmation
- **Skip Next Renewal** (Free): Skip button with max-skip limit and cutoff enforcement, undo skip or modify skip count
- **Pause / Vacation Mode** (Free): Pause with duration, max pauses, and cooldown rules
- **Reactivate** (Free): Re-enable cancelled/expired subscriptions

### 7.4 Payment & Shipping (Pro)
- Card on File Details: card brand, last 4 digits, expiry date
- Auto-Renew Toggle: enable/disable automatic billing
- Update Payment Method: gateway-specific flow (Stripe Elements form, PayPal/Paddle re-auth)
- Update Shipping Address: editable form with 3-day cutoff before next renewal

### 7.5 My Features Page (Pro)
- Per-subscription or combined view of all feature entitlements
- Feature aggregation modes: Union (any active subscription grants feature) or Intersection
- Feature name, type, value, and usage tracking display
- Appears as My Account menu item when Feature Manager is enabled

### 7.6 Store Credit Page (Pro)
- Current balance display
- Credits Expiring Soon section (next 30 days)
- Purchase Credits section with `[arraysubs_buy_credits]` form
- Full Transaction History table

---

## 8. Emails (`emails.md`)

### 8.1 Customer Emails — 13 Total (Free)
1. New Subscription — triggered when subscription status becomes active (from pending/trial/auto-draft)
2. Trial Started — triggered when trial begins
3. Trial Converted — triggered when trial converts to active paid subscription
4. Renewal Reminder — reminder N days before next payment
5. Renewal Invoice — invoice for upcoming/overdue payment
6. Payment Successful — triggered on successful renewal payment
7. Payment Failed — triggered on payment failure (manual, renewal, or gateway)
8. Subscription On-Hold — triggered on status change to on-hold
9. Subscription Cancelled — triggered on cancellation
10. Subscription Expired — triggered on expiration
11. Subscription Reactivated — triggered when a cancelled/expired subscription is reactivated
12. Auto-Downgrade — triggered when a subscription is auto-downgraded to a cheaper plan
13. Retention Discount Accepted — triggered when customer accepts a retention discount offer

### 8.2 Admin Emails — 3 Total (Free)
1. Admin — New Subscription — notifies admin of new subscription
2. Admin — Subscription Cancelled — notifies admin of cancellation
3. Admin — Payment Failed — notifies admin of payment failure

### 8.3 Store Credit Emails — 4 Total (Pro)
1. Store Credit Added — triggered on credit addition (admin adjustment, refund, downgrade, promotional, purchase)
2. Store Credit Used — triggered when credit applied to order
3. Store Credit Expiring — 7-day advance warning before expiration
4. Store Credit Expired — notification after credit expires

### 8.4 Email Features
- Full WooCommerce email framework integration (inherits template styling)
- Configurable subject, heading, additional content, email type (HTML/Plain/Multipart)
- Rich placeholder system per email (50+ unique placeholders across all emails)
- Email Reminder Schedule: configurable timer for Renewal Reminder (default 3 days before next payment)
- Planned/Stub reminders: Trial Ending Reminder and Expiring Soon Reminder settings exist but email classes are not yet implemented
- Template override support via theme/child theme
- Each email has unique WooCommerce email ID for developer hooks

---

## 9. Manage Members (`manage-members.md`)

### 9.1 Member Insight Dashboard (Pro)
- Centralized member lookup by name, username, or email
- Profile Card: avatar, display name, username, email, phone, joined date, role badges
- Quick actions: Login as Customer, Edit User, Clear

### 9.2 Member Statistics (Pro)
- 6 stat cards: Total Spent, Total Orders, Active Subscriptions, Total Subscriptions, Store Credit Balance, Total Refunds
- Data pulled from WooCommerce + ArraySubs records

### 9.3 Commerce Overview (Pro)
- Subscriptions table: 8 columns (ID, Product, Status badge, Recurring Amount, Billing Cycle, Start Date, Next Payment, Actions with View link)
- Purchased Products (Non-Subscription): deduplicated, aggregated purchase display
- Addresses: billing + shipping (read-only display)
- Store Credit balance shown in stats grid + addresses area

### 9.4 Login as Customer (Pro)
- Session impersonation with secure cookie stack
- Nested impersonation support (admin → user A → switch to user B)
- Notification bar with "Return to your account" link
- Security: admin-only, non-admin targets only, impersonated sessions exempt from login limits
- Available from: Users list, User profile, WooCommerce order detail, ArraySubs subscription detail

### 9.5 Member Operations (Pro)
- 3 quick-link cards: View Orders, Manage Store Credit, Show Features
- 5 admin shortcut integrations across WordPress/WooCommerce admin screens

---

## 10. Manage Subscriptions (`manage-subscriptions.md`)

### 10.1 All Subscriptions List (Free)
- 5 columns: Subscription (ID + product), Customer, Recurring Amount, Next Payment, Start Date
- 7 status tabs: All, Active, Trial, On-Hold, Cancelled, Expired, Pending
- Search by subscription ID, customer name/email, product name
- CSV Export: 15 fields + JSON export endpoint

### 10.2 Create & Edit Subscription (Free)
- Admin-created subscriptions with customer, product, status, dates, billing config
- Edit any subscription field from admin

### 10.3 Subscription Detail Screen (Free + Pro)
- Header with status badge + 4 action buttons (Edit, Renew Now, Cancel, Trash)
- 17 information cards: Subscription Overview, Customer Details, Product Details, Billing Schedule, Dates, Related Orders, Refund History, Subscription Notes, Subscription Logs
- 7 conditional cards: Cancellation Details, Sync Details, Skip & Pause Info, Coupon Discount, Payment Gateway (Pro), Checkout Builder Fields (Pro), Subscription Shipping (Pro)

### 10.4 Lifecycle Management (Free)
- 6 statuses: Active, Trial, On-Hold, Cancelled, Expired, Pending
- Two-phase renewal and grace period timeline
- Cancellation modes: Immediate + End-of-Period
- Expiration triggers: Fixed end-date, subscription length
- Trial management and trial-to-paid conversion
- 16 email triggers mapped to lifecycle events (13 customer + 3 admin)
- 5 scheduled jobs for automated lifecycle transitions

### 10.5 Admin Tools (Free + Pro)
- Subscription Notes: 4 author types (Customer, Admin, System, Gateway), 21 auto-note event types
- 21 automated note events: subscription created, status changes, reactivated, on-hold, waiting cancellation, payment complete, payment failed (3 sources), renewal invoice created, trial started, trial converted, product changed, payment method changed, next payment date changed, quantity changed, recurring amount changed, subscription synced/unsynced, plan switch completed
- Feature Log (Pro): entitlement change history
- Order History with refund sub-rows
- CSV/JSON export with 15 fields

---

## 11. Member Access Control (`member-access-control.md`)

### 11.1 Rule System Architecture (Free)
- 7 rule tabs: Role Mapping, Discount, Ecommerce, URL, Post Types, Downloads, Login Limit (Pro)
- Common rule structure with 10 condition types: Subscription Status, Has Active Subscription, Subscription Variation, Purchased Product, Purchased Variation, Purchased from Category/Taxonomy, Lifetime Spend, Feature Value (Pro), User Role, Nested Group (AND/OR logic)
- 12 comparison operators: =, !=, >, >=, <, <=, contains, not_contains, in, not_in, empty, not_empty
- AND/OR + recursive nested condition groups
- Content dripping / scheduled access support

### 11.2 Role Mapping Rules (Free)
- Assign WordPress roles based on subscription status
- 7 status behaviors: Active, Trial, On-Hold, Cancelled, Expired, Pending, None (no matching subscription)
- Add role vs Replace role modes
- Role removal on subscription end

### 11.3 Discount Rules (Free)
- Percentage or Fixed discount type
- Per-item or Per-cart scope
- "Best discount wins" when multiple rules match
- Product/category targeting options

### 11.4 Ecommerce Restriction Rules (Free)
- Deep WooCommerce integration
- 4 actions: Allow purchasing, Block purchasing, Hide products, Modify pricing
- Product/category-level targeting

### 11.5 URL Restriction Rules (Free)
- 4 pattern types: Exact URL, URL prefix (starts with), URL contains, Regex pattern
- Priority system (1-100) for conflict resolution
- 4 actions: Redirect to URL, Show 404, Show access denied message, Show login form

### 11.6 Post Type / Content Restriction Rules (Free)
- 3 targeting modes: All posts of type, Specific posts, Taxonomy-based
- 3 archive behaviors: Hide from archives, Show teaser, Show normally
- Per-post restriction override (3 meta fields)
- Content dripping with date-based scheduling
- Merge tags for dynamic restriction messages

### 11.7 Download Restriction Rules (Free)
- Control access to WooCommerce downloadable files
- Signed URL delivery for security
- Download usage tracking (count + last access timestamp)

### 11.8 Login Limit / Session Control Rules (Pro)
- Per-rule concurrent session cap (overrides global toolkit setting)
- FIFO eviction: oldest session terminated on new login
- Per-subscription or per-role session limits

### 11.9 Content Restriction Shortcodes (Free + Pro)
- `[arraysubs_restrict]`: 15 attributes for fine-grained content gating (status, products, variations, purchased, lifetime_spent, feature, roles, condition logic, redirect, message)
- `[arraysubs_visibility]`: Login-state-based show/hide with fallback content
- 17+ real-world use cases documented

---

## 12. Retention Flow Builder (`retention-flow-builder.md`)

### 12.1 Cancellation Flow (Free)
- Customer clicks Cancel → Reason Capture → Retention Offers → Outcome
- Immediate vs End-of-Period cancellation modes
- 7 default cancellation reasons: too_expensive, not_using, found_alternative, missing_features, technical_issues, temporary_pause, other
- Custom reasons with configurable key/label
- "Other" reason with free-text textarea
- Undo Scheduled Cancellation capability

### 12.2 Retention Offers (Free)
- **Discount Offer**: Percentage off for N renewal cycles, one discount per subscription, gateway limitations for PayPal/Paddle noted
- **Pause Offer**: Fixed-duration pause with auto-resume, configurable duration
- **Downgrade Offer**: Redirects to plan switching flow, requires pre-configured downgrade paths on product
- **Contact Support Offer**: External URL link to support page/chat
- Per-offer configuration: Enable toggle, trigger reasons (multi-select), custom headline/description with placeholders
- Trigger reason targeting strategy (map specific reasons to specific offers)
- Eligibility conditions: subscription value, customer total spend, remaining days, already-used check

### 12.3 Cancellation Modal (Free)
- 3-step flow: Step 1 (Select Reason) → Step 2 (Retention Offers) → Step 3 (Confirm Cancellation)
- Responsive modal with reason selector and offer cards
- Customer can accept an offer or proceed to cancel

### 12.4 Retention Analytics Integration (Free)
- 8 KPI cards tracking cancellation attempts and saves
- Churn reasons breakdown, offer acceptance rates
- Trend analysis over time

### 12.5 Refund-on-Cancellation Options (Free + Pro)
- Allow Immediate refund, Refund at End of Period, No Automatic refund
- Prorated refund calculation (daily rate)
- Minimum refund amount threshold
- Automatic Gateway Refund toggle
- Refund-to-Store-Credit option (Pro)

### 12.6 18 Real-World Use Cases
- Price-sensitive subscriber, seasonal member, overwhelmed user downgrading, tech problem resolution, newsletter pause, post-price-increase exodus, annual subscriber alternatives, subscription box burnout, free trial conversion rescue, entrepreneur downsizing, holiday season pause, B2B ROI review, competitor counter-offer, first-month risk, content consumer habit break, budget reset subscriber, parent seasonal subscription, multi-subscription consolidation
- Retention math: 40% save rate example recovering $7,200/year

---

## 13. Store Credit (`store-credit.md`)

### 13.1 Store Credit System Overview (Pro)
- Virtual wallet per customer
- 2 credit levels: Subscription-level (from downgrades) + Customer-level (from refunds, purchases, admin adjustments, promotions)
- Subscription credit consumed first, then customer credit
- 8 credit source types: Plan Downgrade, Refund, Admin Adjustment, Promotional, Credit Purchase, Applied to Renewal, Applied to Order, Expired

### 13.2 Store Credit Management (Pro)
- Admin page with customer search
- Balance view with add/deduct (with notes)
- Transaction History table: Date, Description, Amount (+/- color coded), Balance After
- 10 entries per page with pagination

### 13.3 Store Credit Settings (Pro)
- **General**: Master enable toggle
- **Credit Application**: Auto-Apply to Renewals (default On), Allow at Checkout (default Off), Minimum Order Amount
- **Credit Expiration**: Configurable expiration period (days), daily 3AM batch job, 7-day advance warning email, only affects new credits
- **Credit Purchase**: Enable toggle, Min/Max/Default purchase amounts

### 13.4 Credit Purchase Product (Pro)
- Special `arraysubs_store_credit` product type
- Fixed vs Custom amount types
- Bonus Percentage calculation (e.g., buy $50 get 10% bonus = $55 credit)
- `[arraysubs_buy_credits]` shortcode for embedding anywhere
- Virtual, sold individually
- Processing on order completed/processing status
- One-time processing flag prevents duplicate credit

### 13.5 Refund to Store Credit (Pro)
- "As Store Credit" refund method on WooCommerce order screen
- Balance preview before processing
- Tracked in `_refunded_as_credit` order meta
- Does NOT create WooCommerce refund record (credit-only operation)
- Guest orders ineligible
- Can mix gateway + credit refunds on same order

### 13.6 Credit History (Pro)
- Global transaction log across all customers
- Filter by Source (9 source types) + Filter by Type (Credit Added / Debit Deducted)
- Table columns: ID, Date, Customer, Description (with subscription links), Amount (+/- color), Actions (delete)
- 20 entries per page
- Delete removes log record only (does not reverse transaction)
- REST API endpoint for programmatic access

### 13.7 Store Credit Emails — 4 (Pro)
- Credit Added: subject, heading, amount, new balance, source label, My Account link
- Credit Used: amount applied, remaining balance, order link
- Credit Expiring: 7-day warning, expiring amount, expiration date, days remaining, "Shop Now" CTA
- Credit Expired: expired amount (strikethrough), "Visit Our Shop" CTA
- Full placeholder system per email

### 13.8 Customer Portal — Store Credit Page (Pro)
- Balance display, expiring credits, purchase form, transaction history
- Accessible via My Account → Store Credit menu item

---

## 14. Subscriptions & Recurring Products (`subscriptions-and-recurring-products.md`)

### 14.1 Simple Subscription Products (Free)
- Subscription tab in WooCommerce product editor
- Billing Period: Daily, Weekly, Monthly, Yearly, Custom Days
- Billing Interval: 1-12
- Subscription Length: 0 (unlimited / lifetime) to 365 periods
- Lifetime subscription support: subscriptions with length 0 never expire
- Free Trial: configurable days
- Sign-up Fee: one-time charge at checkout
- Different Renewal Price: separate recurring price after initial
- Price locked at purchase (product edits don't affect existing subs)

### 14.2 Variable Subscription Products (Free)
- Parent "Subscription product" checkbox enables subscription tab on all variations
- Each variation gets independent subscription config (period, interval, length, trial, sign-up fee, renewal price)
- Variation-level pricing and configuration

### 14.3 Plan Switching (Free)
- Linked Products tab: Upgrade to, Downgrade to, Crossgrade to, Auto-downgrade to
- Normalized daily rate comparison with 5% tolerance for direction classification
- 3 proration types: Prorate Immediately (charge/credit at switch), Apply at Renewal (adjust next renewal), No Proration
- Switch fees per direction (upgrade fee, downgrade fee, crossgrade fee)
- Rounding methods for proration calculations
- Customer portal: Change Plan modal with Upgrade/Downgrade/Crossgrade tabs and proration preview

### 14.4 Auto-Downgrade (Pro)
- 3 timing options: On expire, On cancel, On trial expire
- Reuses existing subscription (doesn't create new one)
- Email suppression during auto-downgrade (prevents double notifications)
- Configured via Linked Products tab → Auto-downgrade to field

### 14.5 Fixed Period Membership (Pro)
- Absolute date end or Recurring annual cutoff
- Enrollment Window: open/close dates limiting when customers can purchase
- Period End Behavior: Expire or Renew
- Invoice blocking: renewal invoices blocked past end date
- Variation support: variations inherit product-level settings if not explicitly set
- Frontend display of remaining days and membership period

### 14.6 Product Experience & Frontend Display (Free + Pro)
- Pricing display: product page, cart, mini-cart, checkout, order confirmation
- Fully formatted recurring price strings with trial/sign-up fee info
- **Redirect Product Page** (Pro): 301 redirect or 404 for subscription products, SEO integration with Yoast/Rank Math canonical management
- **Feature Manager** (Pro): Define product features (toggle/number/text types), feature templates, storefront "What's Included" display, customer My Features page
- **Subscription Shipping** (Pro): Recurring vs one-time shipping, initial/renewal shipping overrides, cart display of shipping type, shipping address inherited on plan switch

### 14.7 Coupon Integration (Free)
- "Apply to subscriptions" checkbox on WooCommerce coupons
- One-time vs Recurring coupon duration
- Cycle counting with/without initial checkout
- One coupon per subscription enforcement
- Stored coupon values locked at capture (immune to coupon edits)
- Discount caps and renewal application logic
- Full coupon audit logging: tracks coupon create, update (field-level change tracking), delete, and trash events
- Tracked coupon fields: discount amount, expiry date, discount type, description, individual use, product/category inclusions/exclusions, usage limits, shipping, spending thresholds, email restrictions

### 14.8 Product Lifecycle (Free)
- Cached product data at subscription creation (price, period, trial, fees all locked in)
- 30+ property change tracking with audit trail: price, name, slug, status, description, SKU, stock, dimensions, weight, tax, shipping class, media, attributes, and more
- Pre-save snapshot engine: captures old state before DB write, diff engine compares old vs new, batches multiple edits per request into single audit note
- Admin warnings for products with active subscriptions (affected subscription count shown on product edit)
- Product deletion/trashing behavior: subscriptions continue working with cached data, link restored on untrash
- Test links: Direct add-to-cart URL + One-click checkout URL

---

## 15. Toolkits (`toolkits.md`)

### 15.1 Admin Bar Control (Free)
- Hide admin bar for all non-admin users on the frontend
- Cosmetic only — doesn't restrict capabilities
- Administrators always see admin bar

### 15.2 Admin Dashboard Access Restriction (Free)
- Block non-authorized roles from `/wp-admin`
- Redirect to: WooCommerce My Account page or 404
- Configurable Allowed Roles (multi-select from installed roles)
- AJAX, REST API, and WP-Cron never blocked
- Administrators always allowed

### 15.3 WordPress Login Page Redirect (Free)
- Redirect `/wp-login.php` to WooCommerce My Account page or 404
- Branded login experience through WooCommerce
- Password reset, email verification, and logout links continue working
- All third-party login URL helpers affected

### 15.4 Login as User / Admin Impersonation (Free)
- Session impersonation from multiple admin screens (Users list, User profile/edit, Order detail, Subscription detail, Member profile)
- 6 admin UI placements total across WordPress and ArraySubs admin screens
- Notification bar with return-to-admin link
- Admin-only; non-admin targets only; admin-to-admin impersonation blocked
- Impersonated sessions exempt from Multi-Login Prevention limits

### 15.5 Multi-Login Prevention (Pro)
- Global concurrent session limit per user (default: 1)
- FIFO eviction: oldest session terminated on new login
- Apply to Administrators toggle (default: Off, admins exempt)
- Per-subscription/per-role overrides via Login Limit rules in Members Access
- Impersonated sessions never counted

### 15.6 Settings Reference
- 10 toolkit settings across 5 sections (Admin Bar, Admin Dashboard Access, WordPress Login Page, Login as User, Multi-Login Prevention)

---

## Feature Tier Summary

### Free Features (Core — `arraysubs`)
- Subscription Products (Simple + Variable)
- Plan Switching (Upgrade/Downgrade/Crossgrade with proration)
- Coupon Integration (with audit logging)
- Subscription Checkout (Classic + Block, One-Click, Cart validation)
- Recurring Billing & Renewal Engine
- Trial Management
- Grace Period (Two-Phase Recovery)
- Skip Next Renewal & Pause/Vacation Mode
- Refund Management (Prorated/Full/Partial)
- 6 Subscription Lifecycle Statuses
- Manage Subscriptions (List, Detail, Create/Edit, CSV/JSON Export)
- Customer Portal (My Subscriptions, View Subscription, Self-Service Actions)
- Cancellation Flow & Retention Offers (Discount, Pause, Downgrade, Contact Support)
- Retention Analytics
- Member Access Control (Role Mapping, Discount, Ecommerce, URL, Post Types, Downloads)
- Content Restriction & Visibility Shortcodes
- Profile Builder (Custom Fields, Avatar Upload)
- My Account Editor
- Reports Hub
- 13 Customer Emails + 3 Admin Emails
- Email Reminder Schedule (Renewal Reminder)
- Product Lifecycle Tracking (30+ property change audit trail)
- Subscription Notes (21 auto-note events)
- Login As User (6 admin placements)
- Toolkit Settings (Admin Bar, Dashboard Access, Login Page, Login as User)
- General Settings (30+ configurable options)

### Pro Features (Addon — `arraysubspro`)
- Subscription Performance Dashboard (10 KPIs, Charts, Leaderboards)
- WooCommerce Analytics Extension
- Order List Enhancements + Backfill Tool
- Activity Audits
- Scheduled-Job Logs
- Gateway Health Dashboard
- Automatic Payments (Stripe, PayPal, Paddle)
- Auto-Renew Toggle & Manual Fallback
- Checkout Builder (27 field types, multi-step, conditional, design panel)
- Auto-Downgrade on Trial/Cancel/Expire
- Fixed Period Membership (Enrollment Windows)
- Redirect Product Page
- Feature Manager (Product Feature Entitlements)
- Subscription Shipping
- Store Credit System (Management, Purchase Product, Refund-to-Credit, Credit History, 4 Emails)
- Manage Members (Member Insight Dashboard, Login as Customer, Commerce Overview)
- Login Limit / Multi-Login Prevention
- 4 Store Credit Emails

---

*Each section above will become a dedicated markdown file in `source/features/`. Files are named in the parentheses after each heading.*