# Toolkits

> Essential site administration tools — hide the admin bar, restrict dashboard access, brand the login experience, impersonate customers, and prevent concurrent logins.

**Tier**: Free (Admin Bar, Dashboard Access, Login Redirect, Login as User) + Pro (Multi-Login Prevention)

---

## Admin Bar Control (Free)

Hide the WordPress admin bar from all non-admin users on the frontend.

| Setting | Description |
|---------|-------------|
| Enable Toggle | Turn admin bar hiding on or off |
| Scope | All non-admin users (subscribers, customers, etc.) |
| Admin Override | Administrators always see the admin bar |

This is a cosmetic change only — it does not restrict capabilities or prevent access to admin pages.

---

## Admin Dashboard Access Restriction (Free)

Block non-authorized roles from accessing `/wp-admin`.

### Configuration

| Setting | Description |
|---------|-------------|
| Enable Toggle | Turn dashboard restriction on or off |
| Redirect Target | WooCommerce My Account page or 404 |
| Allowed Roles | Multi-select from all installed WordPress roles |

### Safety Rules

| Rule | Description |
|------|-------------|
| Administrators | Always allowed, regardless of settings |
| AJAX Requests | Never blocked (plugins that use admin-ajax.php continue working) |
| REST API | Never blocked |
| WP-Cron | Never blocked |

---

## WordPress Login Page Redirect (Free)

Redirect the standard WordPress login page (`/wp-login.php`) to a branded experience.

### Configuration

| Setting | Description |
|---------|-------------|
| Enable Toggle | Turn login redirect on or off |
| Redirect Target | WooCommerce My Account page or 404 |

### What Still Works

Even with the redirect enabled, these flows continue working:

| Flow | Description |
|------|-------------|
| Password Reset | Password reset links and forms work normally |
| Email Verification | Email verification flow works normally |
| Logout Links | Logout links work and redirect to the configured target |
| Third-Party Login URLs | All plugins using `wp_login_url()` and similar helpers are affected by the redirect |

---

## Login as User / Admin Impersonation (Free)

One-click session impersonation that lets admins see the store exactly as any customer sees it.

### How It Works

1. Admin clicks "Login as User" from any of the 6 UI placements
2. A secure cookie stack preserves the admin's session
3. Admin is now browsing as the target user — same account, same permissions, same portal
4. A notification bar stays visible with a "Return to your account" link
5. Clicking "Return" restores the original admin session

### 6 Admin UI Placements

| # | Location | Description |
|---|----------|-------------|
| 1 | Users List | Row action on the WordPress Users table |
| 2 | User Profile | Button on the WordPress User Edit screen |
| 3 | WooCommerce Order Detail | Action on the order detail page |
| 4 | Subscription Detail | Action on the ArraySubs subscription detail screen |
| 5 | Member Profile | Button on the Manage Members dashboard |
| 6 | Additional Admin Screens | Quick-link integrations across WordPress/WooCommerce |

### Security

| Rule | Description |
|------|-------------|
| Admin Only | Only users with `manage_options` capability can impersonate |
| Non-Admin Targets | Admin-to-admin impersonation is blocked |
| Nested Impersonation | Admins can switch between users without returning to admin first |
| Login Limit Exempt | Impersonated sessions are exempt from Multi-Login Prevention (doesn't kick out the real user) |

---

## Multi-Login Prevention (Pro)

Prevent users from logging in on multiple devices or browsers at the same time.

### Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| Global Session Limit | 1 | Maximum concurrent sessions per user |
| Apply to Administrators | Off | Whether admins are subject to the limit (default: exempt) |

### FIFO Eviction

When a user exceeds the session limit, the **oldest** session is terminated automatically. The newest login always succeeds.

### Per-Subscription / Per-Role Overrides

The global limit can be overridden using **Login Limit rules** in the Member Access Control system (Pro). This allows different subscription tiers or roles to have different session limits:

| Example | Limit |
|---------|-------|
| Basic Subscriber | 1 session |
| Premium Subscriber | 3 sessions |
| Enterprise Subscriber | 5 sessions |

### Impersonation Compatibility

Sessions created by the Login as User feature are never counted toward the login limit. Admins can impersonate any user without triggering FIFO eviction on the user's real sessions.

---

## Settings Reference

10 toolkit settings across 5 sections:

| Section | Settings | Tier |
|---------|----------|------|
| Admin Bar | Enable toggle | Free |
| Admin Dashboard Access | Enable toggle, Redirect target, Allowed roles | Free |
| WordPress Login Page | Enable toggle, Redirect target | Free |
| Login as User | Enabled by default, available across 6 placements | Free |
| Multi-Login Prevention | Enable toggle, Session limit, Apply to admins | Pro |

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Admin Bar Control (hide for non-admins) | ✅ | ✅ |
| Admin Dashboard Access Restriction | ✅ | ✅ |
| WordPress Login Page Redirect | ✅ | ✅ |
| Login as User (6 placements) | ✅ | ✅ |
| Nested Impersonation | ✅ | ✅ |
| Multi-Login Prevention (Global Limit) | — | ✅ |
| Per-Subscription/Per-Role Session Overrides | — | ✅ |
| FIFO Eviction | — | ✅ |
| Apply to Administrators Toggle | — | ✅ |
