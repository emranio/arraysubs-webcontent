# Page Plan: Data Safety

> **URL**: `/data-safety/`
> **Tier**: T7 — Trust & Legal
> **Priority**: Week 1
> **Template**: `default`
> **Last Reviewed**: April 2026

---

## SEO Meta

| Field | Value |
|-------|-------|
| **Title Tag** | Data Safety & GDPR Compliance — ArrayHash / ArraySubs |
| **H1** | Data Safety |
| **Meta Description** | How ArrayHash protects your data. GDPR, UK GDPR, CCPA, LGPD, PIPEDA compliant. We use Google Analytics only — no other tracking. |
| **Canonical** | `https://arraysubs.com/data-safety/` |
| **Index** | Yes |

---

## Purpose

This page provides a plain-language summary of data safety for both:
1. **Visitors to this website** (arraysubs.com)
2. **Merchants using the ArraySubs plugin** on their own WooCommerce store

These are two distinct contexts with different data flows.

---

## Section 1: Website (arraysubs.com)

### What Data Is Collected

| Data | Collected? | Details |
|------|-----------|---------|
| Google Analytics (page views, sessions) | ✅ Yes | GA4 with IP anonymisation |
| Advertising / retargeting pixels | ❌ No | Not used |
| Heatmaps / session recordings | ❌ No | Not used |
| Email marketing lists | ❌ No | No newsletter or marketing automation |
| Social media tracking pixels | ❌ No | Not used |
| Form submissions (contact page) | ✅ Yes | Name, email, message — used to reply only |

### How Data Is Protected

- All traffic served over HTTPS (TLS 1.2+)
- No sensitive data stored in browser local storage or cookies beyond GA4 identifiers and consent preference
- Contact form data stored securely, deleted within 12 months of resolution

### Analytics Consent

Visitors in the EU/EEA, UK, and other jurisdictions where analytics consent is legally required are shown a consent banner before the GA4 script loads. Consent preference is stored in a cookie (`cc_cookie`) and respected on all subsequent visits.

---

## Section 2: ArraySubs Plugin (Merchant's WooCommerce Store)

### Important Distinction

ArraySubs runs entirely within the **merchant's own WordPress/WooCommerce installation**. ArrayHash does not:
- Receive customer data from your store
- Connect to ArrayHash servers for telemetry or tracking
- Store any of your customers' personally identifiable information (PII)

The plugin processes subscription and membership data **locally on your server**.

### Data the Plugin Handles (on Your Server)

| Data Type | Stored Where | Controlled By |
|-----------|-------------|---------------|
| Customer names, emails | Your WordPress database | You (the merchant) |
| Subscription status, billing dates | Your WordPress database | You (the merchant) |
| Payment tokens / method identifiers | Your payment gateway (Stripe, PayPal, etc.) | Your payment gateway |
| Membership access records | Your WordPress database | You (the merchant) |

### Merchant Responsibilities (GDPR)

If you operate a WooCommerce store using ArraySubs and serve EU/UK customers, **you are the Data Controller** under GDPR. You are responsible for:
- Maintaining a privacy policy on your store
- Obtaining lawful consent for data collection at checkout
- Responding to data subject access/erasure requests from your customers
- Ensuring your payment gateway and hosting provider are compliant

ArrayHash is not a data processor for your store's customer data.

---

## Applicable Regulations

| Law | Jurisdiction | ArrayHash Compliance |
|-----|-------------|---------------------|
| GDPR (General Data Protection Regulation) | EU / EEA | ✅ Compliant — consent banner, DPA on request, data rights |
| UK GDPR | United Kingdom | ✅ Compliant |
| CCPA / CPRA | California, USA | ✅ Compliant — no sale of personal data, rights honoured on request |
| LGPD | Brazil | ✅ Compliant — principle of minimal data, consent-based analytics |
| PIPEDA | Canada | ✅ Compliant — explicit consent, access on request |
| ePrivacy Directive (Cookie Law) | EU | ✅ Compliant — consent-gated analytics cookies |

---

## Third-Party Sub-processors (Website Only)

| Sub-processor | Purpose | Location | Data Transfer Mechanism |
|--------------|---------|----------|------------------------|
| Google LLC (GA4) | Website analytics | USA | EU Standard Contractual Clauses (SCCs) |
| Hosting provider | Web server infrastructure | Varies | Data Processing Agreement (DPA) in place |

No other sub-processors have access to personal data from this website.

---

## Data Subject Rights

You may exercise any of the following rights by emailing emran@arrayhash.com:

| Right | Description |
|-------|-------------|
| Access | Receive a copy of data held about you |
| Rectification | Correct inaccurate data |
| Erasure | Request deletion of your data |
| Restriction | Restrict processing while a dispute is resolved |
| Portability | Receive data in a machine-readable format |
| Object | Object to processing based on legitimate interests |
| Withdraw consent | Stop analytics tracking at any time via the consent banner or by emailing us |

We respond within **30 days**. For complex requests, we may extend by up to 60 days with notice.

---

## Security Measures

- HTTPS / TLS 1.2+ on all pages
- No unencrypted transmission of personal data
- Access to any personal data (contact form submissions) limited to the data controller (Emran / ArrayHash)
- No cloud databases or third-party CRMs storing personal data
- Regular dependency and security updates

---

## Data Breach Response

In the unlikely event of a personal data breach, ArrayHash will:
1. Contain and assess the breach within 24 hours of discovery
2. Notify affected individuals within 72 hours where required by GDPR
3. Report to the relevant supervisory authority within 72 hours if the breach poses a risk to rights and freedoms

---

## Cookies Reference

| Cookie | Type | Purpose | Duration | Consent Required |
|--------|------|---------|----------|-----------------|
| `_ga` | Analytics | GA4 client identifier | 2 years | Yes (EU/UK/CA) |
| `_ga_*` | Analytics | GA4 session counter | 1 year | Yes (EU/UK/CA) |
| `cc_cookie` | Functional | Consent preference storage | 6 months | No (functional) |

No advertising, retargeting, or cross-site tracking cookies are set.

---

## Updates

This page is reviewed whenever there is a change to data processing practices. The "Last Reviewed" date at the top reflects the most recent review.

---

## Contact

**ArrayHash**  
Email: emran@arrayhash.com  
Response time: within 30 days for data rights requests; typically much faster for general questions.

---

## Content Blocks (Page Layout)

1. **Intro / trust statement** — minimal data, GA4 only, nothing else
2. **Two-context explainer** — website visitors vs. plugin merchants (clear distinction)
3. **Website data table** — what is and is not collected, with ✅/❌ icons
4. **Consent & cookies** — banner behaviour, cookie table
5. **Plugin data section** — clarify ArrayHash does not receive store customer data
6. **Merchant responsibility box** — GDPR controller callout for merchants
7. **Regulations compliance table** — GDPR, UK GDPR, CCPA, LGPD, PIPEDA
8. **Sub-processors table** — Google + hosting only
9. **Your rights** — rights table with instructions to email
10. **Security measures** — HTTPS, access controls, no CRM
11. **Breach response** — 72-hour notification commitment
12. **Contact block** — emran@arrayhash.com

---

## Internal Links

| Target | Context |
|--------|---------|
| `/privacy-policy/` | Full privacy policy detail |
| `/terms-of-service/` | Footer cross-link |
| `/refund-policy/` | Footer cross-link |
| `/contact/` | Data rights requests |
