import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Button, PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import {
  InlineLink,
  PolicyBody,
  PolicyIntro,
  PolicyList,
  PolicyNote,
  PolicySection,
  TrustContactCta,
  TrustCrossLinks,
} from "../_components";

const EDITORIAL_EFFECTIVE_DATE = "July 23, 2026";
const EDITORIAL_REVIEWED_DATE = "July 23, 2026";

export const metadata: Metadata = createMetadata({
  title: "Editorial Standards",
  description:
    "How ArrayHash writes, fact-checks, corrects, updates, and responsibly uses AI assistance in technical content for ArraySubs and future WordPress products.",
  path: "/trust-center/editorial-standards/",
});

export default function EditorialStandardsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trust Center", href: "/trust-center/" },
          {
            name: "Editorial Standards",
            href: "/trust-center/editorial-standards/",
          },
        ]}
        title="Editorial Standards"
        subtitle="ArrayHash is a WordPress plugin company, not an independent news or magazine publisher. These standards explain how we create and maintain technical articles for ArraySubs today and future ArrayHash products."
        highlights={[
          "Every current article was written by Emran",
          "Primary sources and product evidence come first",
          "AI assists; humans remain accountable",
        ]}
        actions={
          <Button
            href={`mailto:${site.email}?subject=Editorial%20correction`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Report a correction
          </Button>
        }
      />

      <PolicyIntro
        facts={[
          { label: "Company", value: "ArrayHash" },
          { label: "Current product", value: "ArraySubs" },
          { label: "Current author", value: "Emran" },
          { label: "Last reviewed", value: EDITORIAL_REVIEWED_DATE },
        ]}
      />

      <PolicyBody>
        <PolicySection
          id="editorial-fact-checking"
          title="Editorial and fact-checking policy"
          subtitle="Technical accuracy, first-hand product knowledge, and clear source attribution guide every article."
        >
          <p>
            Emran, founder and lead engineer of ArrayHash, wrote and approved
            every article currently published on this site. ArraySubs is
            ArrayHash&apos;s current product, and future ArrayHash products may
            also be covered here.
          </p>
          <p>
            Before publication, the author checks factual and version-sensitive
            claims against the strongest available evidence. Depending on the
            subject, that can include official documentation, standards,
            product code, release notes, configured test environments, or
            direct product behavior. Sources are linked close to the claims
            they support whenever practical.
          </p>
          <PolicyList
            items={[
              "Distinguish WordPress and WooCommerce core behavior from extensions, payment providers, and ArraySubs behavior.",
              "State versions, test scope, limitations, and uncertainty when they materially affect a conclusion.",
              "Do not invent test results, customer outcomes, quotations, credentials, product behavior, or source citations.",
              "Separate verified facts from recommendations, estimates, and the author's interpretation.",
              "Prefer primary sources such as official documentation, product code, release notes, standards, and regulator guidance.",
              "Do not let a commercial preference override factual accuracy or a material limitation.",
            ]}
          />
          <PolicyNote title="Product and commercial context">
            <p>
              ArrayHash develops and sells WordPress plugins. Articles may
              discuss ArraySubs, link to product pages, or explain where it fits
              a workflow. Educational claims, product claims, and commercial
              calls to action should remain distinguishable so readers can
              evaluate the evidence and the business relationship.
            </p>
          </PolicyNote>
          <p>
            ArrayHash may invite additional authors in the future. Each invited
            author will publish under their own name and author profile and will
            be responsible for the accuracy of their work under these
            standards.
          </p>
          <PolicyNote title="Reviewer identity rule">
            <p>
              ArrayHash does not use generic or fictional team labels for
              reviewers. An article shows a reviewer only when a real,
              independent person completed that review. The reviewer must be
              named and linked to a profile that explains their relevant role
              and expertise.
            </p>
            <p>
              If no independent review occurred, the article makes no reviewer
              claim. When invited authors publish in the future, Emran may be
              named as reviewer only when he personally performed and accepted
              responsibility for that review.
            </p>
          </PolicyNote>
        </PolicySection>

        <PolicySection
          id="corrections"
          title="Corrections policy"
          subtitle="Readers can report a suspected error, and material corrections are verified before publication."
        >
          <p>
            To report an error, email{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>{" "}
            or use the <InlineLink href="/contact/">contact page</InlineLink>.
            Please include the article URL, the disputed statement, and
            supporting evidence when available.
          </p>
          <PolicyList
            items={[
              "Factual, technical, product, and source-attribution reports are reviewed by the responsible author or engineer.",
              "A confirmed material error is corrected promptly after verification and recorded in the article's disclosure or update note when the change affects meaning or conclusions.",
              "Minor spelling, grammar, formatting, or clarity fixes may be made without a correction note when they do not change meaning.",
              "ArrayHash does not remove fair criticism or change a supported conclusion solely because it is commercially inconvenient.",
            ]}
          />
        </PolicySection>

        <PolicySection
          id="content-updates"
          title="Content-update policy"
          subtitle="Dates have distinct meanings and are changed only when the corresponding editorial work occurs."
        >
          <PolicyList
            items={[
              "Published identifies the date an article first became public.",
              "Updated identifies a meaningful revision that includes a factual recheck. It is not changed solely to make an article appear fresh.",
              "Last verified identifies the factual recheck completed with the latest meaningful update. For current ArrayHash articles, Last verified is kept equal to Updated.",
              "Visible article metadata shows Written by, Published, Updated, and Last verified. Reviewed by appears only after a genuine independent review by a named person with a linked profile.",
              "Update reviews may be triggered by WordPress, WooCommerce, ArraySubs, gateway, legal, standards, or source changes; confirmed corrections; new test evidence; or credible reader reports.",
              "Version-sensitive product claims include relevant version or test scope when that context affects the result.",
              "Content may be merged, redirected, archived, or removed when it is obsolete, duplicative, unsafe, or no longer supportable; the goal is a useful reader path, not an artificial page count.",
            ]}
          />
          <PolicyNote title="Date integrity">
            <p>
              A copy edit alone does not justify changing the published date or
              presenting the article as newly verified. A meaningful update
              includes a factual recheck, so the Updated and Last verified
              dates move together after that work is completed.
            </p>
          </PolicyNote>
        </PolicySection>

        <PolicySection
          id="ai-assistance"
          title="AI-assistance policy"
          subtitle="AI can assist limited parts of the workflow, but it is not an author, reviewer, or source of experience."
        >
          <p>
            Every article currently published on this site was written and
            approved by Emran. ArrayHash uses AI only as an assistant. Human
            authorship, judgment, verification, and accountability remain
            primary throughout the process.
          </p>
          <PolicyList
            items={[
              "AI assistance is used during parts of research to organize questions, explore source leads, or identify points that require verification. Claims are checked against the cited or primary sources before publication.",
              "A small number of article images are generated with AI. A human selects and reviews them, and an AI-generated illustration is not presented as a real interface screenshot or test result.",
              "In a few articles, AI has assisted with formatting or rephrasing paragraphs after the underlying ideas and facts were written. The final wording is reviewed and approved by the human author.",
              "AI is not allowed to invent tests, data, quotations, credentials, customer outcomes, product behavior, or citations.",
              "AI is not credited as an author or reviewer and does not accept responsibility for published content.",
            ]}
          />
          <PolicyNote title="Human accountability">
            <p>
              The named human author owns the final article. If assisted text
              or imagery introduces an error, ArrayHash applies the same
              correction and update standards as it would to any other
              published error.
            </p>
          </PolicyNote>
        </PolicySection>

        <PolicySection title="Policy review and contact">
          <p>
            These standards took effect on {EDITORIAL_EFFECTIVE_DATE} and are
            reviewed when ArrayHash&apos;s authorship, products, research
            workflow, or use of assistance tools materially changes.
          </p>
          <p>
            Editorial and correction questions can be sent to{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>.
          </p>
        </PolicySection>
      </PolicyBody>

      <TrustCrossLinks currentPath="/trust-center/editorial-standards/" />
      <TrustContactCta
        title="Question an article or report a correction?"
        subtitle={`Email ${site.name} with the article URL, the claim, and any supporting evidence. A human will review it.`}
      />
    </>
  );
}
