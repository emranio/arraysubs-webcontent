import type { Metadata } from "next";
import { Mail, ShieldCheck } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Button, PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import {
  EFFECTIVE_DATE,
  ExternalLink,
  InlineLink,
  PolicyBody,
  PolicyIntro,
  PolicyList,
  PolicyNote,
  PolicySection,
  PolicyTable,
  TrustContactCta,
  TrustCrossLinks,
} from "../_components";

const PRIVACY_REVIEWED_DATE = "July 15, 2026";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "ArrayHash privacy policy for ArraySubs, including website forms, roadmap participation, GA4 analytics, payment providers, cookies, privacy rights, and the no plugin telemetry commitment.",
  path: "/trust-center/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/trust-center/privacy-policy/" },
        ]}
        title="Privacy Policy"
        subtitle="This policy explains what ArrayHash collects on the ArraySubs website, how GA4 and payment providers are used, and what data ArraySubs does not collect from WordPress stores."
        highlights={[
          "No plugin telemetry",
          "No sale of personal data",
          "Roadmap cookie only on demand",
        ]}
        actions={
          <Button
            href={`mailto:${site.email}`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Exercise privacy rights
          </Button>
        }
      />

      <PolicyIntro
        facts={[
          { label: "Controller", value: "ArrayHash" },
          { label: "Product", value: "All, sold on site" },
          { label: "Effective date", value: EFFECTIVE_DATE },
          { label: "Last reviewed", value: PRIVACY_REVIEWED_DATE },
        ]}
      />

      <PolicyBody>
        <PolicySection
          title="Scope"
          subtitle="This policy covers the ArrayHash website and ArraySubs marketing, roadmap, signup, newsletter, support, contact, payment and licensing flows."
        >
          <p>
            ArrayHash operates the ArraySubs marketing website at arrayhash.com.
            This policy applies when you visit the website, submit a signup,
            newsletter, support or contact form, submit or upvote a roadmap idea,
            buy or manage an ArraySubs Pro license, request a refund, or contact
            us about privacy rights.
          </p>
          <PolicyNote title="Important WordPress plugin distinction">
            <p>
              ArraySubs runs inside the merchant&apos;s own WordPress and
              WooCommerce installation. ArrayHash does not collect plugin or
              theme installation events, activation events, plugin usage
              telemetry, WooCommerce store metrics, WordPress admin emails,
              WordPress user emails or plugin logs from your store.
            </p>
          </PolicyNote>
        </PolicySection>

        <PolicySection
          title="Data we collect"
          subtitle="Website forms collect only the fields needed to contact you or manage your relationship with ArrayHash."
        >
          <PolicyTable
            caption="Personal data collected by ArrayHash"
            headers={["Source", "Data collected", "Purpose"]}
            rows={[
              [
                "Signup forms",
                "Name, email, country, business type and optional product-update consent",
                "Create or manage website signup and ArraySubs Pro license request workflows.",
              ],
              [
                "Newsletter forms",
                "Name, country and email",
                "Send product updates and allow unsubscribe management.",
              ],
              [
                "Support and contact forms",
                "Name, email, subject and message body",
                "Reply to questions, support requests and account inquiries.",
              ],
              [
                "Roadmap participation",
                "Feature title and description, timestamps, and one-way hashes derived from an anonymous browser identifier",
                "Publish requested ideas, count one upvote per card and browser, and limit repeated submissions.",
              ],
              [
                "GA4 website analytics",
                "Page views, sessions, referral source, approximate location, browser and device information",
                "Understand aggregate website usage and improve pages.",
              ],
              [
                "Payment and checkout providers",
                "Checkout, transaction, tax, invoice, license and account records needed to process purchases",
                "Complete payments, handle licenses, issue refunds, prevent fraud and meet legal obligations.",
              ],
            ]}
          />
          <p>
            ArrayHash does not store card numbers, CVC codes or full payment
            credentials. Card handling is performed by the provider used at checkout.
          </p>
        </PolicySection>

        <PolicySection title="What we do not collect">
          <PolicyList
            items={[
              "Plugin or theme installation events.",
              "Plugin or theme activation events.",
              "ArraySubs feature usage telemetry.",
              "WooCommerce store revenue, product, customer, subscription or order metrics.",
              "WordPress admin emails, WordPress user emails or customer emails from your store.",
              "WordPress, WooCommerce, PHP or plugin logs from your site.",
              "Names or email addresses for roadmap suggestions and votes.",
              "Heatmap or session recording data.",
            ]}
          />
        </PolicySection>

        <PolicySection
          title="Legal basis"
          subtitle="ArrayHash uses personal data only where there is a lawful reason to do so."
        >
          <PolicyTable
            caption="Legal basis for processing"
            headers={["Activity", "Legal basis", "Explanation"]}
            rows={[
              [
                "Signup, support and contact handling",
                "Contract or pre-contractual steps",
                "We use your details to respond, provide requested information or manage product access.",
              ],
              [
                "Newsletter",
                "Consent",
                "You can unsubscribe at any time from newsletter messages.",
              ],
              [
                "GA4 analytics",
                "Legitimate interests",
                "Aggregate measurement is treated as necessary to operate and improve the site, so GA4/GTM load on every visit.",
              ],
              [
                "Retargeting",
                "Consent",
                "Advertising and retargeting tags load only after the visitor opts in, and the choice can be withdrawn at any time.",
              ],
              [
                "Roadmap suggestions and upvotes",
                "Consent and legitimate interests",
                "The anonymous participation cookie is created only after an on-demand choice. Duplicate-vote and submission limits protect the public roadmap from ordinary abuse.",
              ],
              [
                "Payments, licenses, tax and refunds",
                "Contract and legal obligation",
                "Payment and checkout providers process license and transaction records needed for the purchase.",
              ],
              [
                "Security and abuse prevention",
                "Legitimate interests",
                "We use security logs and provider controls to protect the website and payment flows.",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection
          title="Cookies and analytics"
          subtitle="Analytics runs on every visit as a necessary measurement. Retargeting is optional and loads only after opt-in."
        >
          <PolicyTable
            caption="Cookie reference"
            headers={["Cookie", "Type", "Purpose", "Duration", "Control"]}
            rows={[
              [
                "_ga",
                "Analytics",
                "Google Analytics client identifier used for aggregate website analytics.",
                "Up to 2 years",
                "Loaded on every visit.",
              ],
              [
                "_ga_*",
                "Analytics",
                "Google Analytics session and measurement cookie.",
                "Up to 2 years",
                "Loaded on every visit.",
              ],
              [
                "array_hash_re_ok",
                "Retargeting",
                "Records that the visitor opted in to retargeting so advertising tags may load.",
                "6 months",
                "Only after retargeting opt-in.",
              ],
              [
                "cc_cookie",
                "Functional",
                "Stores the visitor's consent preference for the necessary, analytics and retargeting categories.",
                "6 months",
                "Always active to remember the privacy choice.",
              ],
              [
                "arraysubs_roadmap_visitor",
                "Functional",
                "Stores a random anonymous browser identifier used to prevent ordinary duplicate roadmap votes and repeated submissions.",
                "1 year",
                "Created only after the visitor chooses Allow and continue while submitting or voting.",
              ],
            ]}
          />
          <p>
            Analytics measurement (GA4 via Google Tag Manager) is treated as
            necessary and loads on every visit. Visitors can accept or reject
            retargeting from the banner, and can change that choice later from
            the footer Privacy choices control. Rejecting or withdrawing
            retargeting consent clears the first-party retargeting marker
            (array_hash_re_ok) that is visible to this site.
          </p>
          <p>
            ArrayHash uses advertising and retargeting tags only after a visitor
            opts in, and does not use heatmaps or session recordings. If a
            browser sends Global Privacy Control, ArrayHash treats that as a
            privacy signal, keeps retargeting off, and does not sell or share
            personal data for cross-context behavioral advertising. For more
            detail, read{" "}
            <InlineLink href="/trust-center/data-safety/">
              Data Safety
            </InlineLink>
            .
          </p>
        </PolicySection>

        <PolicySection
          id="roadmap-participation"
          title="Roadmap participation"
          subtitle="The public roadmap can be viewed without a roadmap cookie. A separate on-demand choice appears only when someone submits an idea or upvotes a card."
        >
          <p>
            If the visitor chooses Allow and continue, ArrayHash creates the
            first-party <strong>arraysubs_roadmap_visitor</strong> cookie with a
            random identifier. The cookie is HTTP-only, uses SameSite=Lax, and
            is sent only to this website. It is not added to the site-wide
            privacy banner because it is unnecessary until the visitor chooses
            to participate in the roadmap.
          </p>
          <p>
            The roadmap file stores the submitted feature title and description,
            creation and update timestamps, and one-way hashes derived from the
            random identifier. The public API exposes only the idea text, status,
            timestamps, whether it is a community request, the upvote count, and
            whether the current browser already voted. It never exposes the
            cookie value or stored hashes.
          </p>
          <p>
            The roadmap cookie expires automatically after one year. Visitors
            can remove it sooner through their browser&apos;s site-data controls.
            Previously recorded anonymous vote hashes may remain so published
            totals stay consistent.
          </p>
          <PolicyNote title="If you do not allow the cookie">
            <p>
              No roadmap participation cookie is created and the requested
              submission or upvote is cancelled. The rest of the site and the
              read-only roadmap remain available.
            </p>
          </PolicyNote>
        </PolicySection>

        <PolicySection title="Third-party providers">
          <PolicyTable
            caption="Third-party providers"
            headers={["Provider", "Purpose", "Notes"]}
            rows={[
              [
                "Google Analytics 4",
                "Aggregate website analytics",
                "Loaded on every visit through Google Tag Manager as necessary measurement.",
              ],
              [
                "Stripe",
                "Payment processing",
                <>
                  Handles payment details. See the{" "}
                  <ExternalLink href="https://stripe.com/privacy">
                    Stripe privacy policy
                  </ExternalLink>
                  .
                </>,
              ],
              [
                "Checkout and licensing provider",
                "Checkout, licensing, account and transaction management",
                "Used for payment and licensing workflows, not ArraySubs plugin telemetry.",
              ],
              [
                "Hosting provider",
                "Website hosting and security",
                "May process server logs for security, reliability and abuse prevention.",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection title="Data retention">
          <PolicyTable
            caption="Data retention summary"
            headers={["Data", "Retention"]}
            rows={[
              [
                "Signup, support and contact details",
                "Kept while needed to respond or manage the relationship, then deleted or minimized.",
              ],
              [
                "Newsletter data",
                "Kept until unsubscribe or deletion request.",
              ],
              [
                "Payment, invoice, tax, refund and license records",
                "Kept as required for tax, accounting, fraud prevention, legal and license-management obligations.",
              ],
              [
                "GA4 analytics",
                "Collected on every visit and retained according to the active GA4 property settings.",
              ],
              [
                "Roadmap ideas and vote records",
                "Kept while the public roadmap is maintained. The anonymous browser cookie expires after 1 year; stored vote hashes may remain so published counts stay consistent.",
              ],
              [
                "Security and server logs",
                "Kept only as long as needed for security, reliability and abuse prevention.",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection title="Your rights">
          <p>
            Depending on your location, you may have rights to access, correct,
            delete, restrict, port or object to processing of your personal data.
            California residents may also have rights under the CCPA/CPRA,
            including the right to know, delete, correct and opt out of sale or
            sharing. ArrayHash does not sell personal data.
          </p>
          <p>
            Email{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>{" "}
            to exercise your rights. We respond within 30 days unless a legally
            permitted extension applies. More details are available on the{" "}
            <InlineLink href="/trust-center/gdpr-ccpa-compliance/">
              GDPR and CCPA compliance page
            </InlineLink>
            .
          </p>
        </PolicySection>

        <PolicySection title="Children's privacy">
          <p>
            The ArrayHash website and ArraySubs product are intended for
            business users and store owners. They are not directed to children
            under 16, and ArrayHash does not knowingly collect personal data from
            children.
          </p>
        </PolicySection>

        <PolicySection title="Changes and contact">
          <p>
            ArrayHash may update this policy when data practices, providers,
            legal requirements or product workflows change. Material updates are
            reflected by the last reviewed date on this page.
          </p>
          <p>
            Contact: <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
          </p>
          <PolicyNote title="Policy owner">
            <p>
              <ShieldCheck
                aria-hidden="true"
                className="mr-2 inline size-5 text-primary"
              />
              ArrayHash is the controller for website, signup, newsletter,
              support, contact and commercial relationship data described in
              this policy.
            </p>
          </PolicyNote>
        </PolicySection>
      </PolicyBody>

      <TrustCrossLinks currentPath="/trust-center/privacy-policy/" />
      <TrustContactCta />
    </>
  );
}
