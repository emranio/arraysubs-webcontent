# Checkout Builder

> Design a custom checkout experience with 27 field types, multi-step layouts, conditional logic, and a visual drag-and-drop editor — no code required.

**Tier**: Pro

---

## Builder Interface

A full-screen visual editor for designing custom checkout pages.

### Layout

| Panel | Purpose |
|-------|---------|
| **Left Sidebar** | Elements palette (27 field types in 3 categories) + Design panel |
| **Right Panel** | Step tabs + field grid showing the current checkout layout |
| **Toolbar** | Save, Discard Changes, Reset to Default |
| **Field Settings** | Appears when a field is selected — configure label, key, placeholder, required, type-specific options, visibility rules |

### How It Works

1. Drag field types from the Elements palette onto the checkout grid
2. Arrange fields into sections and columns
3. Configure each field's settings (label, validation, visibility)
4. Add steps for multi-step checkout
5. Customize the design (colors, spacing, borders)
6. Save — the custom checkout replaces the default WooCommerce checkout

---

## Field Types — 27 Total

### 9 Standard Fields

| Field | Description |
|-------|-------------|
| Text | Single-line text input |
| Number | Numeric input with min/max |
| Email | Email address with validation |
| Phone | Phone number input |
| Select | Dropdown with predefined options |
| Multi-Select | Dropdown allowing multiple selections |
| Textarea | Multi-line text area |
| Checkbox | Single checkbox with label |
| Toggle | On/off toggle switch |

### 9 Advanced Fields

| Field | Description |
|-------|-------------|
| Upload | File upload with type/size restrictions |
| Image Select | Visual image-based option picker |
| Grid Select | Grid layout option selector |
| Color Picker | Color selection input |
| Calendar | Calendar date selector |
| Date | Date input field |
| DateTime | Combined date and time picker |
| Time | Time-only input |
| Date Range | Start and end date pair |

### 9 Layout Elements

| Element | Description |
|---------|-------------|
| Heading | Section heading text |
| Section | Container with 1, 2, or 3 column layout |
| Paragraph | Descriptive text block |
| Alert | Info / Success / Warning / Error message boxes |
| Billing Address | WooCommerce billing address fields |
| Shipping Address | WooCommerce shipping address fields |
| Order Notes | Customer order notes field |
| Coupon / Notices | Coupon code input and checkout notices |
| Order Info / Payment | Order summary and payment method selection (mandatory — cannot be removed) |

---

## Multi-Step Checkout

Break long checkout forms into manageable steps.

### Configuration

- **Unlimited steps** — add as many steps as needed
- **Custom step labels** — name each step (e.g., "Contact", "Shipping", "Payment")
- **Step navigation styles**: Numbered tabs or Progress bar
- **Field assignment** — drag fields between steps to organize the flow

### Validation

- Validation occurs at **form submission** (not per-step)
- All required fields across all steps must be completed before the order processes
- Invalid fields are highlighted with error messages

---

## Conditional Visibility

Show or hide checkout fields dynamically based on other field values.

### Visibility Rules

Each field can have one or more visibility conditions:

| Component | Options |
|-----------|---------|
| **Source field** | Any other field on the checkout |
| **Operator** | is, is not, contains, starts with, ends with |
| **Value** | The target value to compare against |

### Behavior

- Fields hidden by conditional logic are **excluded from validation** — hidden required fields don't block checkout
- Conditions are evaluated in real-time as the customer fills in the form
- Multiple conditions can be combined on a single field

---

## Section-Based Layouts

Organize fields into structured column layouts within each step.

### Column Options

| Layout | Description |
|--------|-------------|
| 1 Column | Full-width fields stacked vertically |
| 2 Columns | Side-by-side fields (50/50 split) |
| 3 Columns | Three fields per row (33/33/33 split) |

### Per-Field Width

Individual fields can be set to:

- **Full** — spans the entire section width
- **1/2** — takes half the section width
- **1/3** — takes one-third of the section width

---

## Design Panel

Customize the visual appearance of the checkout to match the store's brand.

### Customizable Properties

| Property | What It Controls |
|----------|-----------------|
| Primary Color | Buttons, active states, focus highlights |
| Background Colors | Checkout background, section backgrounds |
| Border Colors | Field borders, section dividers |
| Text Colors | Labels, input text, placeholder text |
| Spacing | Padding and margins between elements |
| Border Radius | Rounded corners on fields and sections |
| Step Navigation Style | Tab appearance and positioning |

The design panel provides brand-consistent checkout styling without CSS.

---

## Data Flow

Custom checkout field data follows a clear path from the checkout form through the subscription lifecycle.

### How Data Is Stored

- All custom field values are saved as **order meta** with the `_arraysubs_cf_` prefix
- File uploads are stored in `wp-content/uploads/arraysubs-checkout-uploads/{order_id}/`

### Data Propagation Toggles

Each custom field has toggles that control where its data appears:

| Toggle | What It Does |
|--------|-------------|
| **Copy to Subscription** | Persist the field value on the subscription record |
| **Copy to Renewal Orders** | Include the field value on every renewal invoice automatically |
| **Show on Order Admin** | Display the value on the admin order detail screen |
| **Show on Order Customer** | Display the value on the customer's order confirmation / My Account order view |
| **Show on Subscription Detail** | Display the value on the admin subscription detail screen |

This means custom checkout data can flow through the entire subscription lifecycle — from initial order to every renewal — without any manual intervention.

---

## Upload Settings

Global controls for file uploads at checkout.

| Setting | Description |
|---------|-------------|
| Enable Uploads | Master toggle for file upload fields |
| Max File Size | Global maximum file size cap |
| Per-Field Allowed Types | Each upload field can specify which file types are accepted |
| Per-Field Size Limits | Each upload field can have its own size limit (up to the global cap) |
| Multiple Files | Individual upload fields can accept multiple files |

---

## Locked Fields

4 fields cannot be removed from the checkout and are automatically restored if deleted:

1. **Billing Address** — required for WooCommerce order processing
2. **Shipping Address** — required for physical product shipping
3. **Order Notes** — standard WooCommerce order notes
4. **Order Info / Payment** — order summary and payment method selection

These fields ensure the checkout always contains the minimum required elements for WooCommerce to process an order.

---

## Server-Side Validation

The Checkout Builder includes server-side validation to ensure data integrity:

- **Required field validation** — all fields marked as required must have a value
- **Type-specific validation** — email fields must be valid emails, number fields must be numeric, etc.
- **Conditional visibility checks** — hidden fields are excluded from validation
- **File upload validation** — file type and size limits are enforced on the server

---

## Feature Availability

| Feature | Free | Pro |
|---------|------|-----|
| Visual Drag-and-Drop Editor | — | ✅ |
| 27 Field Types (Standard, Advanced, Layout) | — | ✅ |
| Multi-Step Checkout (unlimited steps) | — | ✅ |
| Conditional Visibility (5 operators) | — | ✅ |
| Section-Based Layouts (1-3 columns) | — | ✅ |
| Design Panel (colors, spacing, borders) | — | ✅ |
| Data Flow (subscription + renewal propagation) | — | ✅ |
| File Upload Support | — | ✅ |
| Server-Side Validation | — | ✅ |
| 4 Locked Fields (auto-restored) | — | ✅ |
