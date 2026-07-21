import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  CircleDollarSign,
  KeyRound,
  Layers3,
  LockKeyhole,
  Repeat2,
  ShieldCheck,
  ShoppingBag,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  ArticleCard,
  Badge,
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  MediaFeature,
  PageHero,
  ProductScreenshot,
  Section,
  SectionTitle,
  StepCard,
  TagCard,
} from "@/components/ui";
import {
  createMetadata,
  faqSchema,
  howToSchema,
  softwareApplicationSchema,
} from "@/lib/seo";
import { getPillar, pillarPath } from "../_pillars";
import { USE_CASES } from "../../use-cases/_data";
import {
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
  formatArticleDate,
  getArticlePath,
} from "../../resources/_data";
import {
  DIRECT_ANSWER,
  FAQ_ITEMS,
  FREE_MEMBERSHIP_FEATURES,
  MEMBERSHIP_MODELS,
  PRO_MEMBERSHIP_FEATURES,
  SETUP_STEPS,
} from "./_content";

const PATH = "/deals/arraysubs/features/woocommerce-membership/";
const PRICING = "/deals/arraysubs/pricing/";
const MEMBER_ACCESS = "/deals/arraysubs/features/member-access-control/";
const MEMBERSHIP_USE_CASE = "/deals/arraysubs/use-cases/membership-sites/";

export const metadata: Metadata = createMetadata({
  title: "WooCommerce Membership Plugin — Free Content & Billing",
  description:
    "Build free, paid, recurring, or lifetime WooCommerce memberships. Restrict content and products, drip access, protect downloads, and give members self-service.",
  path: PATH,
});

const FEATURE_SLUGS = [
  "subscriptions-and-recurring-products",
  "member-access-control",
  "customer-portal",
  "retention-flow-builder",
  "profile-builder",
  "manage-subscriptions",
];

const USE_CASE_SLUGS = [
  "membership-sites",
  "online-courses",
  "content-publishers",
  "b2b-wholesale-memberships",
];

const ARTICLE_SLUGS = [
  "how-to-create-a-woocommerce-membership-site-architecture-before-configuration",
  "woocommerce-membership-vs-subscription-what-is-the-difference",
  "partial-content-restriction-seo-conversion-and-reader-experience",
];

const relatedFeatures = FEATURE_SLUGS.map((slug) => getPillar(slug)).filter(
  (item): item is NonNullable<typeof item> => Boolean(item),
);

const relatedUseCases = USE_CASE_SLUGS.map((slug) =>
  USE_CASES.find((item) => item.slug === slug),
).filter((item): item is NonNullable<typeof item> => Boolean(item));

const relatedArticles = ARTICLE_SLUGS.map((slug) =>
  RESOURCE_ARTICLES.find((item) => item.slug === slug),
).filter((item): item is NonNullable<typeof item> => Boolean(item));

const ACCESS_CAPABILITIES = [
  {
    icon: ShoppingBag,
    title: "Members-only shop",
    description:
      "Restrict the whole shop, products, or categories—or keep products visible while reserving purchase for members.",
  },
  {
    icon: CalendarClock,
    title: "Content dripping",
    description:
      "Release pages, custom post types, partial sections, and files by days since joining or on a fixed date.",
  },
  {
    icon: LockKeyhole,
    title: "Protected downloads",
    description:
      "Give qualifying members verified download links inside WooCommerce My Account, with optional release schedules.",
  },
  {
    icon: CircleDollarSign,
    title: "Automatic member pricing",
    description:
      "Apply member-only discounts to products or categories without distributing coupon codes.",
  },
  {
    icon: UserRoundCheck,
    title: "Role mapping",
    description:
      "Assign or remove WordPress roles as membership conditions change so permissions stay aligned with access.",
  },
  {
    icon: KeyRound,
    title: "Clear denial paths",
    description:
      "Redirect to login or another page, show a message or teaser, or return a 404 when a visitor does not qualify.",
  },
];

const PORTAL_ACTIONS = [
  "Cancel with undo",
  "Reactivate",
  "Pause and resume",
  "Skip next renewal",
  "Switch plans",
  "Pay pending invoices",
  "Review terms and orders",
  "Update payment method · Pro",
];

export default function WooCommerceMembershipPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Features", href: "/deals/arraysubs/features/" },
          { name: "WooCommerce Membership", href: PATH },
        ]}
        layout="showcase"
        title="Build WooCommerce memberships without stitching plugins together"
        subtitle="Sell free, paid, recurring, fixed-term, or lifetime access. Protect content and products, release member value over time, and let customers manage their membership from WooCommerce My Account."
        highlights={[
          "Free membership rule engine",
          "Recurring billing in the same system",
          "Gutenberg + Elementor controls",
        ]}
        actions={
          <>
            <Button
              href={PRICING}
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              View Pro Pricing
            </Button>
            <Button href="#membership-features" variant="outline" size="lg">
              Explore membership features
            </Button>
          </>
        }
        trust="Free core includes the access engine · No credit card required"
        visual={<MembershipSystemVisual />}
      />

      <Section surface="default" spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
            <div>
              <Eyebrow>Quick answer</Eyebrow>
              <p className="mt-4 text-xl leading-9 text-muted text-pretty sm:text-2xl sm:leading-10">
                {DIRECT_ANSWER}
              </p>
              <p className="mt-6 text-sm font-medium text-faint">
                Product scope verified against the current ArraySubs build · July
                22, 2026
              </p>
            </div>

            <aside className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <Eyebrow>Membership vs subscription</Eyebrow>
              <div className="mt-5 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-xl bg-background p-5">
                  <Repeat2 aria-hidden="true" className="size-6 text-primary" />
                  <h2 className="mt-4 text-xl">Subscription</h2>
                  <p className="mt-2 leading-7 text-muted">
                    Controls billing, renewal dates, and lifecycle state.
                  </p>
                </div>
                <div className="rounded-xl bg-background p-5">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-6 text-primary"
                  />
                  <h2 className="mt-4 text-xl">Membership</h2>
                  <p className="mt-2 leading-7 text-muted">
                    Controls access, benefits, and what the customer can use.
                  </p>
                </div>
              </div>
              <p className="mt-5 leading-7 text-muted">
                ArraySubs connects both while still supporting one-time and
                lifetime access.
              </p>
              <div className="mt-6">
                <Button
                  href="/deals/arraysubs/resources/membership-strategy/woocommerce-membership-vs-subscription-what-is-the-difference/"
                  variant="ghost"
                  size="sm"
                  iconRight={<ArrowRight className="size-4" />}
                >
                  Read the full distinction
                </Button>
              </div>
            </aside>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-[0.1875rem] lg:grid-cols-4">
            {[
              ["8", "Free access conditions"],
              ["2", "Native builder controls"],
              ["4", "URL match modes"],
              ["Free", "Core rule engine"],
            ].map(([value, label]) => (
              <li
                key={label}
                className="rounded-xl bg-card p-5 text-center sm:p-6"
              >
                <span className="block font-display text-3xl font-bold text-primary sm:text-4xl">
                  {value}
                </span>
                <span className="mt-2 block text-sm text-muted">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="membership-features" surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Membership models"
            title="Choose the membership that matches your promise"
            subtitle="Start with the customer outcome, then choose the billing and access model that can sustain it."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-5">
            {MEMBERSHIP_MODELS.map((model, index) => (
              <TagCard
                key={model.title}
                tag={model.label}
                title={model.title}
                description={model.description}
                active={index === 1}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              href="/deals/arraysubs/features/subscriptions-and-recurring-products/"
              variant="outline"
              size="sm"
              iconRight={<ArrowRight className="size-4" />}
            >
              Explore subscription products
            </Button>
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <MediaFeature
            eyebrow="Access rules"
            title="Decide exactly who gets access"
            description={
              <p>
                Build one readable policy from subscription state, selected
                products or variations, purchases, product groups, lifetime
                spend, and WordPress roles. Nested AND/OR groups model real tiers
                without duplicating rules across every protected surface.
              </p>
            }
            points={[
              "Eight condition types and nested rule groups ship in the free core.",
              "The same conditions drive content, URL, shop, discount, download, and role rules.",
              "Pro adds feature-entitlement checks, including numeric allowance comparisons.",
            ]}
            actions={
              <Button
                href={MEMBER_ACCESS}
                variant="outline"
                size="sm"
                iconRight={<ArrowRight className="size-4" />}
              >
                Explore Member Access Control
              </Button>
            }
            media={
              <ProductScreenshot
                src="/pages/woocommerce-membership/member-access-role-mapping-content.png"
                alt="ArraySubs role mapping rule that grants a Pro Member role when a customer has an active subscription"
                width={1440}
                height={900}
                caption="Current staging build: an active subscription condition grants the Pro Member WordPress role."
              />
            }
          />
        </Container>
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Partial content"
            title="Protect a whole page—or only the premium part"
            subtitle="Keep useful public context and the upgrade path visible, then place the membership boundary exactly where the premium value begins."
            align="center"
          />

          <MediaFeature
            className="mt-14"
            eyebrow="Gutenberg"
            headingLevel={3}
            title="Gate individual blocks with the WordPress editor"
            description={
              <p>
                Apply subscription, purchase, role, spend, or Pro feature
                conditions to a block without wrapping the whole page. Choose
                ALL or ANY matching, write the denial message, and keep admin
                visibility available while the page is assembled.
              </p>
            }
            points={[
              "Protect nested block content without changing the public URL.",
              "Show a teaser or login message where the premium section would appear.",
              "Use the same membership policy as full-page and shop rules.",
            ]}
            media={
              <ProductScreenshot
                src="/pages/gutenberg-content-restriction.webp"
                alt="ArraySubs Gutenberg block controls for subscription, role, purchase, spend, and feature-based content restriction"
                width={1620}
                height={717}
                caption="Gutenberg block restriction with plan, purchase, role, spend, and Pro feature conditions."
              />
            }
          />

          <MediaFeature
            className="mt-16 border-t border-border pt-16"
            reverse
            eyebrow="Elementor"
            headingLevel={3}
            title="Protect Elementor Containers without shortcode wrappers"
            description={
              <p>
                Add the rule directly to a Flexbox or Grid Container in the
                Elementor Advanced tab. The container can require a qualifying
                plan or feature, combine multiple plan values, and show a custom
                message when access is denied.
              </p>
            }
            points={[
              "Works at the Container level, so design and access stay together.",
              "Supports on/off features and numeric feature allowances with Pro.",
              "Leaves the rest of the landing page public and indexable.",
            ]}
            actions={
              <Button
                href="/deals/arraysubs/resources/membership-strategy/partial-content-restriction-seo-conversion-and-reader-experience/"
                variant="outline"
                size="sm"
                iconRight={<ArrowRight className="size-4" />}
              >
                Plan the content boundary
              </Button>
            }
            media={
              <ProductScreenshot
                src="/pages/elementor-content-restriction.webp"
                alt="ArraySubs Elementor Container controls for subscription and feature-based membership restriction"
                width={1460}
                height={717}
                caption="Elementor Container restriction using subscription plans, roles, purchases, spend, and Pro feature values."
              />
            }
          />
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="One access system"
            title="Give members more than locked pages"
            subtitle="The same qualification rules can protect commerce, release resources, grant benefits, and keep WordPress permissions aligned."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {ACCESS_CAPABILITIES.map((capability) => (
              <IconCard
                key={capability.title}
                icon={<capability.icon className="size-6" />}
                title={capability.title}
                description={capability.description}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              href="/deals/arraysubs/resources/membership-strategy/members-only-products-and-catalogs-in-woocommerce/"
              variant="outline"
              size="sm"
              iconRight={<ArrowRight className="size-4" />}
            >
              Plan a members-only catalog
            </Button>
            <Button
              href="/deals/arraysubs/resources/membership-strategy/protecting-membership-downloads-in-wordpress/"
              variant="ghost"
              size="sm"
              iconRight={<ArrowRight className="size-4" />}
            >
              Protect member downloads
            </Button>
          </div>
        </Container>
      </Section>

      <Section surface="highlight" spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <Eyebrow>Member self-service</Eyebrow>
              <h2 className="mt-4 font-display text-4xl text-dark text-balance sm:text-display-sm">
                Give members a real home inside WooCommerce My Account
              </h2>
              <p className="mt-6 text-lg leading-8 text-dark/80 text-pretty">
                Customers can see their membership terms, related orders, and
                invoices, then handle the lifecycle actions your policy allows.
                The membership record stays continuous through a pause, switch,
                cancellation undo, or renewal payment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="/deals/arraysubs/features/customer-portal/"
                  variant="dark"
                  size="sm"
                  iconRight={<ArrowRight className="size-4" />}
                >
                  Explore the Customer Portal
                </Button>
                <Button
                  href="/deals/arraysubs/features/profile-builder/"
                  variant="outline"
                  size="sm"
                >
                  Shape the member profile
                </Button>
              </div>
            </div>
            <ul className="grid gap-[0.1875rem] sm:grid-cols-2">
              {PORTAL_ACTIONS.map((action, index) => (
                <li
                  key={action}
                  className="flex min-h-24 items-center gap-4 rounded-xl bg-background p-5 text-dark"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-on-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-semibold">
                    {action}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <MediaFeature
            eyebrow="Membership operations"
            title="Manage every member relationship from WooCommerce"
            description={
              <p>
                Search and filter subscriptions, create a membership record for
                an assisted sale or migration, open the lifecycle detail, and
                export the filtered data. Permanent notes keep automated events
                and staff context on the same timeline.
              </p>
            }
            points={[
              "Search and filter by customer, status, plan, and gateway.",
              "Create and edit supported subscription details from wp-admin.",
              "Export CSV or JSON, with Pro Member Insight for a unified customer view.",
            ]}
            actions={
              <Button
                href="/deals/arraysubs/features/manage-subscriptions/"
                variant="outline"
                size="sm"
                iconRight={<ArrowRight className="size-4" />}
              >
                Explore subscription management
              </Button>
            }
            media={<MembershipOperationsVisual />}
          />
        </Container>
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <MediaFeature
            reverse
            eyebrow="Retention"
            title="Keep the relationship when the current plan stops fitting"
            description={
              <p>
                A cancellation can capture the real reason, show one relevant
                save path, and still let the customer leave clearly. Offer a
                temporary discount, pause, downgrade, or support conversation;
                then use grace handling when a payment problem—not product
                value—is the issue.
              </p>
            }
            points={[
              "Target retention offers to the cancellation reason instead of showing every option.",
              "Use pause or downgrade when the member needs a smaller commitment.",
              "Pro can retry supported automatic payments and downgrade after recovery fails.",
            ]}
            actions={
              <Button
                href="/deals/arraysubs/features/retention-flow-builder/"
                variant="outline"
                size="sm"
                iconRight={<ArrowRight className="size-4" />}
              >
                Explore the Retention Flow
              </Button>
            }
            media={
              <ProductScreenshot
                src="/pages/woocommerce-membership/retention-discount-offer-content.png"
                alt="ArraySubs Retention Flow controls for targeted cancellation reasons and a temporary discount offer"
                width={1440}
                height={650}
                caption="Current staging build: a targeted discount offer can be limited to selected cancellation reasons and billing cycles."
              />
            }
          />
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Free vs Pro"
            title="Start with a real membership system, then automate the revenue layer"
            subtitle="The free core is not a timed demo. Pro adds automatic collection, advanced entitlements, member insight, and deeper recovery controls."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-[0.1875rem] md:grid-cols-2">
            <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl">In the free core</h3>
                <Badge tone="highlight">Free</Badge>
              </div>
              <ul className="mt-7 flex flex-col gap-3">
                {FREE_MEMBERSHIP_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ShieldCheck
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-muted text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-dark p-6 text-on-dark sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl">Pro adds</h3>
                <Badge tone="primary">Pro</Badge>
              </div>
              <ul className="mt-7 flex flex-col gap-3">
                {PRO_MEMBERSHIP_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <WalletCards
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-highlight"
                    />
                    <span className="text-on-dark-muted text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href={PRICING}
                  variant="highlight"
                  size="md"
                  iconRight={<ArrowRight className="size-4" />}
                >
                  View Pro Pricing
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-[0.1875rem] md:grid-cols-2">
            <div className="rounded-xl border border-border p-6 sm:p-7">
              <h3 className="font-display text-xl">A strong fit when</h3>
              <p className="mt-3 leading-7 text-muted">
                WooCommerce owns the catalog, checkout, customer, and account
                experience, and membership access should follow products,
                subscriptions, purchases, roles, or plan features.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6 sm:p-7">
              <h3 className="font-display text-xl">Use a specialist alongside it when</h3>
              <p className="mt-3 leading-7 text-muted">
                You need a full LMS gradebook, social-community layer, or
                association CRM. Let that specialist own its workflow while
                ArraySubs owns WooCommerce billing and membership access.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Use cases"
            title="What can you build with ArraySubs memberships?"
            subtitle="Start from the business model, then follow the linked playbook into the right billing, access, portal, and retention setup."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4">
            {relatedUseCases.map((useCase) => (
              <IconCard
                key={useCase.slug}
                icon={<useCase.icon className="size-6" />}
                title={useCase.name}
                description={useCase.cardDescription}
                href={`/deals/arraysubs/use-cases/${useCase.slug}/`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Launch path"
            title="Launch your first membership in four steps"
            subtitle="The configuration stays simple when the member promise, billing terms, access policy, and lifecycle tests are decided in that order."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4">
            {SETUP_STEPS.map((step, index) => (
              <StepCard
                key={step.title}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              href="/deals/arraysubs/resources/membership-strategy/how-to-create-a-woocommerce-membership-site-architecture-before-configuration/"
              variant="outline"
              size="sm"
              iconRight={<ArrowRight className="size-4" />}
            >
              Plan the membership architecture
            </Button>
          </div>
        </Container>
        <JsonLd
          data={howToSchema(
            "How to launch a WooCommerce membership with ArraySubs",
            SETUP_STEPS.map((step) => ({
              name: step.title,
              text: step.description,
            })),
          )}
        />
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Feature guides"
            title="Explore the system behind the membership"
            subtitle="Go deeper on the product engine, access rules, member portal, retention, profiles, and day-to-day operations."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {relatedFeatures.map((feature) => (
              <IconCard
                key={feature.slug}
                icon={<feature.icon className="size-6" />}
                title={feature.name}
                description={feature.cardDescription}
                href={pillarPath(feature.slug)}
                badge={<Badge tone="outline">{feature.tier}</Badge>}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Membership strategy"
            title="Make the access policy before you configure the rule"
            subtitle="These field guides cover the decisions that protect conversion, customer trust, and long-term maintainability."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] lg:grid-cols-3">
            {relatedArticles.map((article) => {
              const category = RESOURCE_CATEGORIES.find(
                (item) => item.slug === article.categorySlug,
              );

              return (
                <ArticleCard
                  key={article.slug}
                  href={getArticlePath(article)}
                  category={category?.name ?? "Membership strategy"}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={formatArticleDate(article.updatedAt)}
                  dateTime={article.updatedAt}
                  readTime={article.readTime}
                  coverLabel={article.cover.label}
                  coverImage={article.cover.image}
                  coverTone={article.cover.tone}
                  headingLevel="h3"
                />
              );
            })}
          </div>
        </Container>
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="WooCommerce membership questions, answered"
            subtitle="Clear scope for billing, access, builders, products, downloads, self-service, recovery, and account sharing."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <Accordion items={[...FAQ_ITEMS]} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema([...FAQ_ITEMS], PATH)} />
      </Section>

      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Membership, billing, and retention"
            title="Build one member journey from checkout to renewal"
            subtitle="Start with the free access engine and manual renewals, then add Pro automation when the membership needs automatic collection, entitlements, insight, and recovery."
            microcopy="No credit card required · Annual and lifetime Pro options available"
            actions={
              <>
                <Button
                  href={PRICING}
                  variant="dark"
                  size="lg"
                  layers="2layer"
                  magnetic
                  iconRight={<ArrowRight className="size-5" />}
                >
                  View Pro Pricing
                </Button>
                <Button
                  href={MEMBERSHIP_USE_CASE}
                  variant="highlight"
                  size="lg"
                  layers="2layer"
                >
                  Explore the membership playbook
                </Button>
              </>
            }
          />
        </Container>
      </Section>

      <JsonLd data={softwareApplicationSchema()} />
    </>
  );
}

function MembershipSystemVisual() {
  const flow = [
    {
      icon: WalletCards,
      label: "Offer",
      title: "Plan",
      detail: "Recurring, fixed, or lifetime",
    },
    {
      icon: Repeat2,
      label: "Commerce",
      title: "Bill",
      detail: "Checkout, renewal, lifecycle",
    },
    {
      icon: LockKeyhole,
      label: "Entitlement",
      title: "Protect",
      detail: "Content, products, files",
    },
    {
      icon: UserRoundCheck,
      label: "Experience",
      title: "Serve",
      detail: "Portal, benefits, retention",
    },
  ];

  return (
    <div
      role="img"
      aria-label="ArraySubs connects the membership plan, billing, protected access, and member experience in one WooCommerce record"
      className="rounded-2xl border border-border bg-background p-4 sm:p-5"
    >
      <div aria-hidden="true">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              One membership record
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-foreground">
              Plan → payment → access → member
            </p>
          </div>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-on-dark">
            <Layers3 className="size-5" />
          </span>
        </div>

        <ol className="mt-4 grid grid-cols-2 gap-[0.1875rem]">
          {flow.map((item, index) => (
            <li key={item.title} className="rounded-xl bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <item.icon className="size-5 text-primary" />
                <span className="font-display text-xs font-bold text-faint">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-5 text-xs font-semibold tracking-[0.1em] text-faint uppercase">
                {item.label}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-[0.1875rem] flex items-center gap-3 rounded-xl bg-dark p-4 text-on-dark">
          <BookOpenCheck className="size-5 shrink-0 text-highlight" />
          <p className="text-sm text-on-dark-muted">
            One policy follows the customer through the complete lifecycle.
          </p>
        </div>
      </div>
    </div>
  );
}

function MembershipOperationsVisual() {
  const rows = [
    ["Gold annual", "Active", "Aug 01"],
    ["Course monthly", "Paused", "—"],
    ["Founding lifetime", "Active", "—"],
  ];

  return (
    <div
      role="img"
      aria-label="Example ArraySubs membership operations view with active and paused plans and their next renewal dates"
      className="rounded-2xl border border-border bg-card p-3 sm:p-4"
    >
      <div aria-hidden="true" className="rounded-xl bg-background p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              Membership operations
            </p>
            <p className="mt-1 font-display text-2xl font-semibold">
              All subscriptions
            </p>
          </div>
          <span className="rounded-pill bg-primary px-4 py-2 text-sm font-semibold text-on-dark">
            Add membership
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-[0.1875rem]">
          {[
            ["24", "Active"],
            ["3", "Pending"],
            ["2", "On hold"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg bg-card p-3 text-center">
              <span className="block font-display text-2xl font-bold text-primary">
                {value}
              </span>
              <span className="mt-1 block text-xs text-muted">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-[0.1875rem] overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-card px-4 py-3 text-xs font-semibold tracking-[0.08em] text-faint uppercase">
            <span>Plan</span>
            <span>Status</span>
            <span>Next</span>
          </div>
          {rows.map(([plan, status, next]) => (
            <div
              key={plan}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-border px-4 py-4 text-sm"
            >
              <span className="font-semibold text-foreground">{plan}</span>
              <span
                className={
                  status === "Active"
                    ? "rounded-pill bg-highlight px-3 py-1 text-xs font-semibold text-primary"
                    : "rounded-pill bg-surface px-3 py-1 text-xs font-semibold text-muted"
                }
              >
                {status}
              </span>
              <span className="min-w-12 text-right text-muted">{next}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
