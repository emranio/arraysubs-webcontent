# Easy Setup — Wizard, Export & Import

> One-page setup hub — configure your entire subscription engine in minutes with a guided wizard, export your settings as JSON for backup or migration, and import selectively across sites with section-level control.

**Tier**: Free (Setup Wizard, Export, Import — Pro-only wizard options appear when ArraySubs Pro is active)

---

## Setup Wizard

A 9-step guided interview that translates plain-language answers about your business into the correct plugin settings. Choose your business type, answer questions about billing, checkout, cancellation, access control, emails, and features — then apply everything in one click.

### 7 Business Type Profiles

The first question selects a business profile that preloads smart defaults for every subsequent step:

| Profile | Key Defaults |
|---------|--------------|
| SaaS / Digital Software | Multiple plans, trials with payment required, strict grace (1/3 days), one-per-customer, portal payment method, all-direction switching, immediate proration, access control, Feature Manager, Audit Logging |
| Physical Subscription Box | Lenient grace (5/14 days), skip + pause enabled, monthly renewal sync, contact-support retention, Store Credit |
| Membership / Community | Multiple plans, pause, one-per-customer, payment method in portal, access control, Feature Manager, Audit Logging, Multi-Login prevention |
| Digital Content | Multiple plans, trials, upgrade-only switching, end-of-period cancellation + refund, access control |
| Professional Services | Pause, contact-support retention, immediate prorated refund, custom profile fields |
| Nonprofit / Donations | Lenient grace, hide admin bar, minimal config |
| Other / Custom | Monthly billing, single plan, standard grace, manual renewals, minimal setup |

Defaults can be overridden on any step before applying.

### 9 Wizard Steps

| Step | Title | Covers |
|------|-------|--------|
| 1 | Your Business | Business type, billing cycle, plan structure, trial options |
| 2 | Billing & Renewal Rules | Grace period strictness, invoice timing, skip/pause limits, renewal sync |
| 3 | Checkout & Cart Rules | Multiple subscriptions, auto-migrate, mixed cart, one-click checkout, account creation |
| 4 | Customer Portal & Self-Service | Portal actions (cancel, reactivate, suspend, payment method), plan switching, proration |
| 5 | Cancellation & Retention | Cancel timing, reason capture, 4 retention offer types, discount/cycle config, refund policy |
| 6 | Access Control & Content Gating | Content restriction toggle, redirect behavior, redirect URL, require-login |
| 7 | Emails & Notifications | Email level (All/Essential/Minimal/Custom), 14 customer email toggles, renewal reminder timing, 3 admin email toggles |
| 8 | Additional Features & Tools | 8 optional modules, Store Credit auto-apply/expiration, Feature Manager display, Multi-Login sessions, dashboard redirect |
| 9 | Review & Apply | Full answer summary grouped by step, edit-in-place, manual setup notes, Apply Settings button |

### Conditional Question Visibility

Questions appear or hide based on earlier answers:

| Condition | Questions Shown |
|-----------|-----------------|
| Trials enabled | Payment method requirement + one-trial-per-customer |
| Custom grace period | Active grace days + on-hold grace days |
| Skip enabled | Max consecutive skips + cutoff days |
| Pause enabled | Max pause duration + max pauses per subscription |
| Renewal sync type selected | Sync day/weekday/month selection |
| One-per-customer selected | Auto-migrate toggle |
| One-click checkout enabled | Skip cart page toggle |
| Multiple plans selected | Plan switching mode + proration |
| Retention offers enabled | Offer type checkboxes + discount/cycle config |
| Access control enabled | Redirect behavior + redirect URL + require login |
| Custom email level | 14 individual email checkboxes |
| Store Credit enabled | Auto-apply + expiration period |
| Feature Manager enabled | Product page display toggle |
| Multi-Login enabled | Max concurrent sessions |
| Restrict Dashboard enabled | Dashboard redirect target |

### Step 8 — Optional Features

8 modules that can be toggled on from the wizard:

| Feature | Tier | Description |
|---------|------|-------------|
| Store Credit System | Pro | Refund to credit, credit balances, credit purchases |
| Feature Manager | Pro | Plan entitlements — seats, storage, usage caps |
| Activity Audit Log | Pro | Track subscription, payment, and settings changes |
| Multi-Login Prevention | Pro | Concurrent session limits per user |
| Custom Profile Fields | Free | Extra customer fields — company, phone, ID fields |
| My Account Page Editor | Free | Reorder, rename, and manage My Account menu items |
| Hide Admin Bar for Customers | Free | Clean frontend for non-admin users |
| Restrict WP Dashboard Access | Free | Block non-admin users from `/wp-admin` |

### Review Step Details

- All non-empty answers shown grouped by step in collapsible sections
- Edit button on each section jumps back to that step
- Answer count summary (e.g., "42 answers are ready to apply")
- Manual setup notes reminding the merchant what the wizard cannot automate:
  - Cancellation reason text and advanced retention copy
  - Detailed member access rules, role mappings, URL/CPT/download restrictions
  - Custom profile field definitions and My Account menu item structure
  - Checkout Builder field layouts and email subject/body content

### Navigation Controls

| Control | Behavior |
|---------|----------|
| Next | Validates visible questions, moves to next step |
| Back | Returns to previous step, preserves all answers |
| Skip with defaults | Fills current step with business-type defaults, moves forward |
| Apply Settings | Final step only — saves all answers as plugin settings |
| Close/Cancel | Confirmation dialog — discard answers or keep working |

### Settings Mapped

The wizard writes into `arraysubs_settings` across these scopes:

| Scope | Examples |
|-------|---------|
| `defaults.*` | Billing period, interval |
| `renewals.*` | Grace days, sync type, sync day, invoice hours |
| `multiple_subscriptions.*` | Allow multiple, one-per-customer, mixed cart |
| `checkout.*` | One-click mode, auto-create account |
| `portal.*` | Allow cancel, reactivate, suspend, payment method |
| `plan_switching.*` | Mode, proration |
| `cancellation.*` | Timing, require reason, retention offers |
| `refunds.*` | Default policy |
| `members_access.*` | Enabled, redirect behavior |
| `emails.*` | Per-email enabled/disabled toggles |
| Feature-specific | Store credit, audit logging, profile fields, admin bar, dashboard access, login prevention |

---

## Settings Export

One-click download of the entire ArraySubs configuration as a JSON file.

### What Gets Exported

| Option Key | Contents |
|------------|----------|
| `arraysubs_settings` | All core + Pro subscription settings (billing, renewals, checkout, trials, plan switching, proration, refunds, cancellation, access control, emails, and more) |
| `arraysubs_profile_fields_config` | Custom profile field definitions and validation rules |
| `arraysubs_avatar_settings` | Avatar upload configuration |
| `arraysubs_myaccount_menu_config` | My Account page menu structure, labels, positions |
| `wc_email_settings` | WooCommerce email template settings (subject, heading, content) for all 20+ ArraySubs email types |

### Sensitive Data Stripping

Payment gateway credentials are automatically removed before the file is written:

| Stripped Key | Gateway |
|-------------|---------|
| `stripe_secret_key` | Stripe |
| `stripe_publishable_key` | Stripe |
| `paypal_client_id` | PayPal |
| `paypal_client_secret` | PayPal |

### Export File Format

```json
{
  "meta": {
    "plugin_version": "1.8.0",
    "pro_version": "1.2.0",
    "module_version": "1.1.0",
    "export_date": "2026-04-04T12:34:56+00:00",
    "site_url": "https://example.com",
    "php_version": "8.1.0",
    "wp_version": "6.7.0",
    "wc_version": "9.0.0"
  },
  "options": { ... }
}
```

Metadata records source site URL, export date, and version numbers for compatibility verification before import.

### Export Flow

1. Click **Export Settings** on the Easy Setup page
2. JSON file downloads automatically: `arraysubs-settings-YYYY-MM-DD.json`
3. Nothing on the site changes — read-only operation

---

## Settings Import

Multi-step import with section-level control — choose exactly which parts of a configuration to apply.

### 8 Virtual Sections

The import system groups raw option keys into logical sections for user-friendly selection:

| Section ID | Label | Contents |
|------------|-------|----------|
| `subscription_settings` | Subscription & Others | Billing, renewals, checkout, trials, plan switching, proration, refunds, and all core/pro subscription settings |
| `retention_flow` | Retention Flow Builder | Cancellation reasons, retention offers, cancellation flow settings |
| `store_credit` | Store Credit | Store credit configuration and related settings |
| `myaccount_builder` | My Account Builder | My Account page menu items, labels, positions |
| `checkout_builder` | Checkout Builder | Custom checkout field layout and configuration |
| `members_access` | Member Access | Content restriction rules, role mapping, access control settings |
| `emails` | Emails | Email notification preferences + WooCommerce email template settings (subject, heading, content) |
| `profile_fields` | Profile Fields | Custom profile field definitions, validation rules, avatar settings |

Only sections with matching data in the import file appear in the selection list.

### Import Flow — 4 Steps

| Step | Action |
|------|--------|
| 1 — Provide data | Upload `.json` file or paste raw JSON text |
| 2 — Select sections | Check/uncheck individual sections, view source site + version metadata |
| 3 — Confirm | Confirmation modal warns that selected sections will be wiped and replaced |
| 4 — View results | Summary of imported sections, skipped sections, and warnings |

### Validation

| Check | Result on Failure |
|-------|-------------------|
| Missing `meta` or `options` keys | Rejected (400 error) |
| Options is not an object | Rejected |
| Module version incompatible (newer than current) | Rejected |
| Unknown section IDs in request | Ignored (only whitelisted sections processed) |
| No recognized settings in file | Rejected with message |
| Invalid JSON | Inline parse error |

### Pro Compatibility Detection

If the imported file contains Pro-specific settings (Store Credit, Feature Manager, Automatic Payments, Audit Logging) but the target site does not have ArraySubs Pro active:

- Import still succeeds — Pro settings are stored but dormant
- Warning shown in result summary
- Settings activate automatically when Pro is installed later

### Sanitization

Each section is sanitized through its dedicated pipeline:

| Section | Sanitizer |
|---------|-----------|
| Profile fields | `arraysubs_sanitize_profile_fields_config()` |
| Avatar settings | Type validation (jpg, jpeg, png, gif, webp) |
| My Account menu | `arraysubs_sanitize_myaccount_menu_config()` |
| WC email options | Per-field (enabled, subject, heading, content, type, recipient) |
| Main settings | `SettingsController::sanitizeSettings()` with recursive fallback |

### Import Behavior

- Selected sections are **deleted and replaced** — not merged field-by-field
- Unchecked sections remain completely untouched
- Existing subscriptions are unaffected — imported settings apply to future actions only
- Configuration cache refreshed automatically after import

---

## REST API Endpoints

| Method | Route | Purpose | Permission |
|--------|-------|---------|------------|
| `GET` | `/arraysubs/v1/easy-setup/export` | Download full settings JSON | `manage_options` |
| `POST` | `/arraysubs/v1/easy-setup/import` | Import settings with section selection | `manage_options` |
| `POST` | `/arraysubs/v1/easy-setup/wizard` | Apply wizard answers as plugin settings | `manage_options` |

---

## Use Cases

### 1. New Store Quick Start
Install ArraySubs, open Easy Setup, select your business type, answer 9 steps of guided questions, click Apply. The subscription engine is configured in under two minutes.

### 2. Staging-to-Production Migration
Finish configuring on staging. Export settings. Upload the JSON file on production, select all sections, import. Identical configuration without re-entering a single value.

### 3. Pre-Change Safety Backup
Before experimenting with new cancellation or retention settings, export the current config. If the experiment fails, import the backup and select only the affected section.

### 4. Multi-Store Consistency
One franchise, five stores. Configure one store, export, and import the same file on the other four. Every store shares the same billing rules, email templates, and access control.

### 5. Support & Troubleshooting
Share the exported JSON with support for debugging without exposing payment credentials (API keys are stripped automatically).

### 6. Business Model Pivot
Switching from a membership to a SaaS model? Re-run the wizard with the new business type. The wizard reconfigures only the settings it covers — existing products, subscriptions, and access rules stay intact.

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Setup Wizard (9 steps) | ✅ | ✅ |
| 7 Business Type Profiles | ✅ | ✅ |
| Conditional Question Visibility | ✅ | ✅ |
| Review & Edit Before Applying | ✅ | ✅ |
| Skip with Defaults | ✅ | ✅ |
| Wizard Pro Options (Payment Method Change, Store Credit, Feature Manager, Audit Log, Multi-Login) | — | ✅ |
| Settings Export (Full JSON Download) | ✅ | ✅ |
| Sensitive Data Stripping (API Keys) | ✅ | ✅ |
| Settings Import (Section-Level Control) | ✅ | ✅ |
| 8 Virtual Import Sections | ✅ | ✅ |
| Pro Setting Detection & Warnings | ✅ | ✅ |
| Module Version Compatibility Check | ✅ | ✅ |
| File Metadata (Source Site, Versions) | ✅ | ✅ |
| WooCommerce Email Template Export/Import | ✅ | ✅ |
