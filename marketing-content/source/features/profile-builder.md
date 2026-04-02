# Profile Builder

> Custom profile fields, avatar upload, My Account editor, and a library of shortcodes — everything needed to create a polished member experience.

**Tier**: Free (Profile Fields, Avatar Upload, My Account Editor, Shortcodes) + Pro (Store Credit Shortcode, Feature Manager Shortcode Attributes)

---

## Custom Profile Fields (Free)

Add custom fields to customer profiles that appear on the WooCommerce My Account page and in the WordPress admin.

### Field Types

| Type | Description |
|------|-------------|
| Text | Single-line text input |
| Textarea | Multi-line text area |
| Select | Dropdown with predefined options |
| Date | Date picker |
| Checkbox | Single checkbox with label |
| File Upload | File attachment with type and size restrictions |

### Field Properties

| Property | Description |
|----------|-------------|
| Label | Display name shown to the user |
| Key | Auto-generated unique identifier (prefixed with `arraysubs_pf_`) |
| Placeholder | Hint text shown inside the field |
| Help Text | Description shown below the field |
| Required | Whether the field must be filled in |
| Enable/Disable | Toggle individual fields on or off |

### Where Fields Appear

Custom profile fields are rendered in three locations:

1. **WooCommerce My Account → Account Details** — customers see and edit their fields
2. **WordPress Admin → Users → Edit User** — admins see and edit fields on user profiles
3. **WordPress Admin → Users → Add New** — admins can set field values when creating new users

### Data Storage

- All field data is stored as **WordPress user meta** with the key format `arraysubs_pf_{field_key}`
- Fully compatible with WordPress user meta APIs

### File Upload Security

| Setting | Description |
|---------|-------------|
| Allowed Types | Safe whitelist of permitted file extensions |
| Max File Size | Configurable limit from 1 to 100 MB |
| Storage Location | `wp-content/uploads/arraysubs-profile-fields/{user_id}/` |
| Access Protection | `.htaccess` protection to prevent direct URL access |

### Field Management

- **Drag-and-drop reordering** to control display order
- **Enable/disable** individual fields without deleting them
- **Delete** fields permanently
- **Audit logging** — all profile field changes are tracked with old/new values, the actor who made the change, and the timestamp

---

## Avatar Upload (Free)

Let customers upload a custom profile photo that replaces their Gravatar across the entire site.

### Customer Experience

- **Preview** — current avatar displayed at visible size
- **Upload / Change** — instant upload via REST API with progress indicator
- **Remove** — delete the custom avatar and fall back to Gravatar

### Admin Experience

- **96×96 preview** on the user edit screen
- **File input** for uploading a new avatar
- **Remove checkbox** to clear the custom avatar

### Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| Enable | On | Master toggle for avatar uploads |
| Max File Size | 5 MB | Adjustable from 1 to 20 MB |
| Allowed Types | jpg, jpeg, png, gif, webp | Configurable safe whitelist |

### Technical Details

- Stored in `wp-content/uploads/arraysubs-avatars/{user_id}-{random}.{ext}`
- `.htaccess` protection on the upload directory
- **Replaces Gravatar site-wide** via WordPress `get_avatar()` filter
- **Gravatar fallback** — when no custom avatar is set, the standard Gravatar loads

---

## My Account Editor (Free)

Take full control of the WooCommerce My Account navigation — reorder items, rename them, hide them, or add entirely new pages.

### Menu Customization

| Feature | Description |
|---------|-------------|
| Drag-and-drop reorder | Rearrange My Account menu items in any order |
| Rename items | Change the display label of any menu item (original label shown as reference) |
| Show/hide items | Toggle visibility of built-in menu items (endpoints remain accessible for direct links) |
| Enable/disable | Master toggle to turn menu customization on or off |

### Custom Endpoint Pages

Link any WordPress page or post as a new My Account menu item:

- Select a published page or custom post type
- The page content renders **inside the My Account wrapper** — maintaining consistent layout
- Clean URL rewrite endpoints (e.g., `/my-account/custom-page/`)
- **Endpoint slug validation** prevents conflicts with existing WooCommerce endpoints

### Page Builder Compatibility

Custom endpoint pages work with:

- **Gutenberg** (WordPress block editor)
- **Elementor**
- **Bricks**

The page builder content renders inside the My Account template, so the sidebar navigation and wrapper stay intact.

### Prevent Direct Access

- Optional **302 redirect** from the original page URL → the My Account endpoint URL
- Ensures customers always see the page within the My Account context, never as a standalone page

### Automatic Management

- **Pro feature menu items** (My Features, Store Credit, Subscriptions) are auto-managed — they appear when their respective Pro modules are active
- **New plugin items** auto-append to the saved configuration — no need to manually add them after updates
- **Priority 99** ensures the My Account Editor's menu order always wins over other plugins

---

## Shortcodes (Free + Pro)

A library of shortcodes for displaying user information, controlling content visibility, and restricting access based on subscription status.

### Account Shortcodes

#### `[arraysubs_login]` — Login Link

Display a login link that automatically hides when the user is already logged in.

| Attribute | Default | Description |
|-----------|---------|-------------|
| text | "Login" | Link text |
| url | wp_login_url | Login page URL |
| redirect | current page | Where to redirect after login |
| class | — | CSS class for styling |

Supports content wrapping: `[arraysubs_login]Click here to log in[/arraysubs_login]`

#### `[arraysubs_logout]` — Logout Link

Display a logout link that automatically hides when the user is logged out.

| Attribute | Default | Description |
|-----------|---------|-------------|
| text | "Logout" | Link text |
| redirect | home | Where to redirect after logout |
| class | — | CSS class for styling |

Supports content wrapping: `[arraysubs_logout]Sign out[/arraysubs_logout]`

#### `[arraysubs_user]` — Current User Name

Display the current user's name or other profile field.

| Attribute | Default | Description |
|-----------|---------|-------------|
| field | display_name | Field to display: display_name, username, first_name, last_name, full_name |
| fallback | "Guest" | Text shown when no user is logged in |

### Visibility Shortcode

#### `[arraysubs_visibility]` — Login-Based Content Control

Show or hide content based on whether the user is logged in or out.

| Attribute | Default | Description |
|-----------|---------|-------------|
| show | logged_in | When to show: `logged_in` or `logged_out` |
| fallback | — | Alternative content shown when condition is not met (supports nested shortcodes) |

Extensible via `arraysubs_visibility_shortcode_show` filter for custom visibility logic.

### Restriction Shortcode

#### `[arraysubs_restrict]` — Content Gating

Gate content behind subscription status, product ownership, spending thresholds, feature entitlements, or roles. 15 attributes for fine-grained control.

| Attribute | Description |
|-----------|-------------|
| status | Required subscription statuses (comma-separated) |
| products | Required subscription product IDs |
| variations | Required subscription variation IDs |
| purchased | Required purchased product IDs |
| lifetime_spent | Minimum lifetime spending amount |
| feature | Feature key for entitlement check (Pro) |
| feature_min | Minimum feature value (Pro) |
| feature_comparison | Comparison operator for feature (Pro) |
| feature_aggregation | How to aggregate: sum, max, any (Pro) |
| roles | Required WordPress user roles |
| condition | Logic: `and` (all must match) or `or` (any match) |
| message | Custom unauthorized message |
| redirect | URL to redirect unauthorized users |
| show_to_admins | Whether admins bypass the restriction |

**AND/OR condition logic** — combine multiple conditions with AND (all must be true) or OR (any can be true).

### Store Credit Shortcode (Pro)

#### `[arraysubs_buy_credits]` — Credit Purchase Form

Embed a store credit purchase form anywhere on the site:

- Displays available credit products
- Customer selects amount and purchases
- Works on any page, post, or widget area

### Shortcode Catalog

An admin page at **ArraySubs → Shortcodes** provides:

- Complete list of all available shortcodes
- Tag, title, description, and availability (Free/Pro) for each
- Usage examples with copy-ready code
- Attribute documentation

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Custom Profile Fields (6 types) | ✅ | ✅ |
| File Upload Fields (with security) | ✅ | ✅ |
| Profile Field Audit Logging | ✅ | ✅ |
| Avatar Upload (replaces Gravatar) | ✅ | ✅ |
| My Account Editor (reorder, rename, hide) | ✅ | ✅ |
| Custom Endpoint Pages (page builder support) | ✅ | ✅ |
| `[arraysubs_login]` shortcode | ✅ | ✅ |
| `[arraysubs_logout]` shortcode | ✅ | ✅ |
| `[arraysubs_user]` shortcode | ✅ | ✅ |
| `[arraysubs_visibility]` shortcode | ✅ | ✅ |
| `[arraysubs_restrict]` shortcode (basic) | ✅ | ✅ |
| `[arraysubs_restrict]` feature entitlement attrs | — | ✅ |
| `[arraysubs_buy_credits]` shortcode | — | ✅ |
| Shortcode Catalog Page | ✅ | ✅ |
