import type { Metadata } from "next";
import { Database, Mail, Server, ShieldCheck } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Button, PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import {
  EFFECTIVE_DATE,
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
  title: "Data Safety",
  description:
    "How ArrayHash handles data safety for ArraySubs, including website forms, GA4, Stripe, Freemius, and the no plugin telemetry commitment.",
  path: "/trust-center/data-safety/",
});

export default function DataSafetyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Data Safety", href: "/trust-center/data-safety/" },
        ]}
        title="Data Safety"
        subtitle="ArrayHash separates website, analytics, payment and licensing data from merchant WordPress and WooCommerce data. ArraySubs does not transmit store metrics to ArrayHash."
        highlights={[
          "Website forms collect name, country and email",
          "Plugin data stays on the merchant site",
          "Stripe and Freemius handle payment and licensing flows",
        ]}
        actions={
          <Button
            href="/trust-center/privacy-policy/"
            size="lg"
            magnetic
            iconLeft={<ShieldCheck className="size-5" />}
          >
            Read privacy policy
          </Button>
        }
      />

      <PolicyIntro
        facts={[
          { label: "Effective date", value: EFFECTIVE_DATE },
          { label: "Last reviewed", value: REVIEWED_DATE },
          { label: "Analytics", value: "Consent-gated GA4/GTM" },
          { label: "Payment providers", value: "Stripe and Freemius" },
        ]}
      />

      <PolicyBody>
        <PolicySection
          title="Two data contexts"
          subtitle="ArrayHash website data and merchant WordPress store data are not the same thing."
        >
          <div className="grid gap-[0.1875rem] md:grid-cols-2">
            <PolicyNote title="ArrayHash website">
              <p>
                The website collects the fields needed for signup, license
                request, newsletter, support and contact forms. GA4/GTM
                analytics loads only after analytics consent. Stripe and
                Freemius process payment, checkout, license and transaction
                workflows.
              </p>
            </PolicyNote>
            <PolicyNote title="Merchant WordPress site">
              <p>
                ArraySubs runs inside the merchant&apos;s own WordPress and
                WooCommerce installation. Store customer data, order data,
                subscription data, user accounts, logs and business metrics stay
                in the merchant&apos;s environment unless the merchant sends
                information to ArrayHash manually.
              </p>
            </PolicyNote>
          </div>
        </PolicySection>

        <PolicySection title="Website data map">
          <PolicyTable
            caption="ArrayHash website data map"
            headers={["Data", "Collected", "Purpose"]}
            rows={[
              [
                "Name, email, country, business type, subject, message body and optional product-update consent",
                "Yes",
                "Signup, license request, newsletter, support and contact workflows.",
              ],
              [
                "GA4 page and session analytics",
                "Only after analytics consent",
                "Aggregate website performance and content measurement.",
              ],
              [
                "Payment, invoice, tax and license records",
                "Yes, through Stripe and Freemius",
                "Checkout, payment processing, licensing, refunds and compliance.",
              ],
              [
                "Advertising pixels and retargeting",
                "No",
                "ArrayHash does not use advertising or retargeting pixels.",
              ],
              [
                "Heatmaps and session recordings",
                "No",
                "ArrayHash does not use heatmap or session recording tools.",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection title="Plugin data map">
          <PolicyTable
            caption="ArraySubs plugin data map"
            headers={["WordPress or WooCommerce data", "Sent to ArrayHash?", "Where it stays"]}
            rows={[
              [
                "Plugin or theme installation and activation events",
                "No",
                "Not collected by ArrayHash.",
              ],
              [
                "Feature usage telemetry",
                "No",
                "Not collected by ArrayHash.",
              ],
              [
                "WooCommerce store revenue, orders, products and subscription metrics",
                "No",
                "Merchant WordPress and WooCommerce environment.",
              ],
              [
                "WordPress admin emails, user emails and customer emails",
                "No",
                "Merchant WordPress database and merchant systems.",
              ],
              [
                "WordPress, WooCommerce, PHP or plugin logs",
                "No",
                "Merchant server and hosting environment.",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection
          title="Merchant responsibilities"
          subtitle="Merchants control the customer data processed by their own WooCommerce stores."
        >
          <p>
            If you operate a WooCommerce store with ArraySubs, you are
            responsible for your own customer privacy notices, checkout consent,
            lawful basis, payment gateway configuration, hosting controls,
            backups and data-subject request handling for your store data.
          </p>
          <PolicyList
            items={[
              "Maintain a store privacy policy that describes your WooCommerce checkout and subscription workflows.",
              "Handle customer access, correction and deletion requests for data in your own WordPress database.",
              "Review your hosting, payment gateway, email and analytics providers for your own store.",
              "Do not send secrets, full card numbers, passwords or unnecessary customer exports to ArrayHash support.",
            ]}
          />
        </PolicySection>

        <PolicySection title="Security measures">
          <div className="grid gap-[0.1875rem] md:grid-cols-3">
            <PolicyNote title="Transport">
              <Server aria-hidden="true" className="mb-4 size-7 text-primary" />
              <p>
                ArrayHash serves website traffic over HTTPS and uses provider
                controls for payment, license and account workflows.
              </p>
            </PolicyNote>
            <PolicyNote title="Access">
              <ShieldCheck
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                Personal data access is limited to people and providers who need
                it for support, billing, licensing, analytics or legal purposes.
              </p>
            </PolicyNote>
            <PolicyNote title="Storage">
              <Database
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                ArrayHash does not store card details and does not store
                WooCommerce store data from merchant WordPress sites.
              </p>
            </PolicyNote>
          </div>
        </PolicySection>

        <PolicySection title="Sub-processors and providers">
          <PolicyTable
            caption="Sub-processors and providers"
            headers={["Provider", "Purpose", "Data involved"]}
            rows={[
              [
                "Google Analytics 4",
                "Consent-gated aggregate website analytics",
                "Website usage, device, browser and approximate location signals after analytics consent.",
              ],
              [
                "Stripe",
                "Payment processing and card handling",
                "Checkout and transaction data required to complete payment.",
              ],
              [
                "Freemius",
                "Checkout, licensing, accounts, tax and transaction support",
                "License, account, invoice, refund and payment-related records.",
              ],
              [
                "Hosting provider",
                "Website hosting and security",
                "Server logs and operational security data.",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection title="Breach response">
          <p>
            If ArrayHash becomes aware of a personal data breach affecting data
            under ArrayHash control, we will investigate, contain the issue,
            notify affected people where required, and notify supervisory
            authorities where required by law.
          </p>
          <p>
            Merchants remain responsible for breach assessment and notification
            obligations related to their own WordPress, WooCommerce, hosting,
            payment and customer systems.
          </p>
        </PolicySection>

        <PolicySection title="Contact">
          <p>
            Data safety questions can be sent to{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
            . For privacy rights, include the email address connected to your
            ArrayHash signup, newsletter, support, checkout or license record.
          </p>
          <Button
            href={`mailto:${site.email}`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Email data safety question
          </Button>
        </PolicySection>
      </PolicyBody>

      <TrustCrossLinks currentPath="/trust-center/data-safety/" />
      <TrustContactCta />
    </>
  );
}
