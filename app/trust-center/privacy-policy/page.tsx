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
  REVIEWED_DATE,
  TrustContactCta,
  TrustCrossLinks,
} from "../_components";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "ArrayHash privacy policy for ArraySubs, including website forms, GA4 analytics, Stripe, Freemius, cookies, privacy rights, and the no plugin telemetry commitment.",
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
        subtitle="This policy explains what ArrayHash collects on the ArraySubs website, how GA4, Stripe and Freemius are used, and what data ArraySubs does not collect from WordPress stores."
        highlights={[
          "No plugin telemetry",
          "No sale of personal data",
          "Consent-gated analytics disclosed",
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
          { label: "Last reviewed", value: REVIEWED_DATE },
        ]}
      />

      <PolicyBody>
        <PolicySection
          title="Scope"
          subtitle="This policy covers the ArrayHash website and ArraySubs marketing, signup, newsletter, support, contact, payment and licensing flows."
        >
          <p>
            ArrayHash operates the ArraySubs marketing website at arrayhash.com.
            This policy applies when you visit the website, submit a signup,
            newsletter, support or contact form, buy or manage an ArraySubs Pro
            license, request a refund, or contact us about privacy rights.
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
                "GA4 website analytics",
                "Page views, sessions, referral source, approximate location, browser and device information",
                "Understand aggregate website usage and improve pages.",
              ],
              [
                "Stripe and Freemius",
                "Checkout, transaction, tax, invoice, license and account records needed to process purchases",
                "Complete payments, handle licenses, issue refunds, prevent fraud and meet legal obligations.",
              ],
            ]}
          />
          <p>
            ArrayHash does not store card numbers, CVC codes or full payment
            credentials. Card handling is performed by Stripe and Freemius.
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
              "Advertising pixel, retargeting, heatmap or session recording data.",
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
                "Consent",
                "Analytics scripts and cookies load only after the visitor accepts analytics in the consent manager.",
              ],
              [
                "Payments, licenses, tax and refunds",
                "Contract and legal obligation",
                "Stripe and Freemius process checkout, license and transaction records needed for the purchase.",
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
          subtitle="Analytics scripts and cookies are optional and load only after analytics consent is accepted."
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
                "Only after analytics consent.",
              ],
              [
                "_ga_*",
                "Analytics",
                "Google Analytics session and measurement cookie.",
                "Up to 2 years",
                "Only after analytics consent.",
              ],
              [
                "cc_cookie",
                "Functional",
                "Stores the visitor's consent preference for strictly necessary and analytics categories.",
                "6 months",
                "Always active to remember the privacy choice.",
              ],
            ]}
          />
          <p>
            Visitors can accept analytics, reject analytics, or customize
            choices from the banner. Choices can be changed later from the
            footer Privacy choices control. Rejecting or withdrawing analytics
            consent clears first-party Google Analytics cookies that are visible
            to this site.
          </p>
          <p>
            ArrayHash does not use advertising cookies, retargeting pixels,
            heatmaps or session recordings. If a browser sends Global Privacy
            Control, ArrayHash treats that as a privacy signal and does not sell
            or share personal data for cross-context behavioral advertising. For
            more detail, read{" "}
            <InlineLink href="/trust-center/data-safety/">
              Data Safety
            </InlineLink>
            .
          </p>
        </PolicySection>

        <PolicySection title="Third-party providers">
          <PolicyTable
            caption="Third-party providers"
            headers={["Provider", "Purpose", "Notes"]}
            rows={[
              [
                "Google Analytics 4",
                "Consent-gated aggregate website analytics",
                "Loaded through the site consent manager only after analytics is accepted.",
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
                "Freemius",
                "Checkout, licensing, account and transaction management",
                <>
                  Used for payment and licensing workflows, not ArraySubs plugin
                  telemetry. See the{" "}
                  <ExternalLink href="https://freemius.com/privacy/">
                    Freemius privacy policy
                  </ExternalLink>
                  .
                </>,
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
                "Collected only after analytics consent and retained according to the active GA4 property settings.",
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
