import {
  Check,
  ClipboardCheck,
  Image as ImageIcon,
  SearchCheck,
  Settings2,
} from "lucide-react";
import {
  Container,
  Eyebrow,
  Section,
  SectionTitle,
} from "@/components/ui";
import type { Recipe, RecipeGroup } from "./_recipes";
import {
  DEFAULT_GUIDANCE,
  GROUP_GUIDANCE,
  screenshotForRecipe,
  uniqueLocations,
} from "./_recipeGuideContent";

export function RecipeLongFormGuide({
  recipe,
  group,
}: {
  recipe: Recipe;
  group?: RecipeGroup;
}) {
  const screenshot = screenshotForRecipe(recipe);
  const guidance = GROUP_GUIDANCE[recipe.group] ?? DEFAULT_GUIDANCE;
  const locations = uniqueLocations(recipe);
  const mainLocation = locations[0] ?? "the relevant ArraySubs admin screen";
  const groupLabel = group?.label ?? "ArraySubs configuration";
  const firstOutcome = recipe.outcomes[0] ?? "the intended customer outcome";

  return (
    <>
      <Section surface="default" spacing="md">
        <Container>
          <article data-recipe-long-form>
            <SectionTitle
              eyebrow="Complete implementation guide"
              title={`How to implement ${recipe.name}`}
              subtitle="Use the configuration as a complete operating workflow: plan it, enter it, test it, and monitor the result."
              align="center"
            />

            <div className="mx-auto mt-12 max-w-4xl space-y-6 text-lg leading-8 text-muted">
              <p>
                This {recipe.tier.toLowerCase()} recipe is a practical runbook
                for <strong className="text-foreground">{recipe.name}</strong>.
                It belongs to the {groupLabel.toLowerCase()} collection and
                connects the exact values above with the customer experience
                they are meant to create. The aim is not simply to make the
                fields save successfully. A complete implementation also makes
                the storefront promise, checkout behavior, subscription record,
                access state, emails, reports, and support process agree with
                one another.
              </p>
              <p>
                Start by defining success in one sentence. For this setup, the
                first expected result is:{" "}
                <strong className="text-foreground">{firstOutcome}</strong>{" "}
                Keep that result beside you while configuring the recipe. If a
                field, product relationship, rule, or customer action does not
                support that outcome, pause and resolve the mismatch before
                launch. This simple check prevents a collection of individually
                valid settings from producing a confusing overall workflow.
              </p>
              <p>{guidance.planning}</p>
              <p>
                The settings in this recipe are intentionally specific. Enter
                them as one coordinated baseline before changing individual
                values to suit your business. Most of the work begins in{" "}
                <strong className="text-foreground">{mainLocation}</strong>
                {locations.length > 1
                  ? ` and continues across ${locations
                      .slice(1)
                      .join(", ")}.`
                  : "."}{" "}
                Take a screenshot or configuration export for your internal
                record, note the date and responsible administrator, and record
                any deliberate deviation from the values shown here.
              </p>
            </div>

            <div className="mt-12 grid gap-[0.1875rem] lg:grid-cols-2">
              <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
                <Eyebrow>Before you begin</Eyebrow>
                <p className="mt-4 leading-7 text-muted">
                  Confirm that the required ArraySubs tier and modules are
                  active, the relevant products or rules already exist, and you
                  have an account that can safely run a real test. Use a
                  non-critical product or dedicated test customer when the
                  workflow can create orders, charge a gateway, change access,
                  send email, or alter a live subscription.
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {recipe.bestFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-primary"
                      />
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
                <Eyebrow>Define the finish line</Eyebrow>
                <p className="mt-4 leading-7 text-muted">
                  A saved form is only an intermediate result. The finish line
                  is observable behavior. Use these recipe outcomes as acceptance
                  criteria, then add any store-specific requirement such as tax,
                  shipping, role assignment, gateway, cache, or email-delivery
                  behavior that affects your implementation.
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {recipe.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5">
                      <SearchCheck
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-primary"
                      />
                      <span className="text-muted">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Captured on staging"
            title={screenshot.title}
            subtitle="Use this real ArraySubs administration screen as an orientation aid; the exact values for this recipe remain in the configuration table above."
            align="center"
          />
          <figure className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl bg-card">
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              width={1440}
              height={1000}
              loading="lazy"
              className="h-auto w-full"
            />
            <figcaption className="flex items-start gap-3 border-t border-border p-5 text-sm leading-6 text-muted sm:p-6">
              <ImageIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-primary"
              />
              <span>
                {screenshot.caption} Captured on the ArraySubs staging site on
                July 23, 2026. Interfaces can evolve, so follow the field names
                and values in this recipe if the visual arrangement changes.
              </span>
            </figcaption>
          </figure>
          <div className="mx-auto mt-8 max-w-4xl space-y-5 text-lg leading-8 text-muted">
            <p>
              Read the screenshot as a map, not as a substitute for the exact
              table. Find the named section first, then work through the recipe
              values in order. Some recipes span more than one screen because a
              store-wide policy, product-level option, customer-facing workflow,
              and reporting view can cooperate. Saving one screen does not
              automatically verify the others.
            </p>
            <p>
              Before changing a live configuration, compare the current state
              with the recipe and note anything that another workflow already
              depends on. If you are replacing an existing setup, change one
              coherent layer at a time and retest after each layer. That makes
              an unexpected result easier to trace and gives you a clear point
              to restore if the new policy is not ready for customers.
            </p>
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Field-by-field"
            title="Why each setting matters"
            subtitle="The values work together. Use the notes below to understand the responsibility of every row before adapting it."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] lg:grid-cols-2">
            {recipe.settings.map((row, index) => (
              <div
                key={`${row.setting}-${row.value}`}
                className="rounded-2xl bg-card p-6 text-foreground sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display font-semibold text-on-dark">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{row.setting}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {row.where ?? mainLocation}
                    </p>
                  </div>
                </div>
                <p className="mt-5 leading-7 text-muted">
                  Set this field to{" "}
                  <strong className="text-foreground">{row.value}</strong>. It
                  defines one part of the {recipe.name.toLowerCase()} contract
                  and should be reviewed alongside the rows before and after it.
                  After saving, confirm that the value remains selected, appears
                  in the expected customer or administrator flow, and produces
                  the matching record or state change. If you customize this
                  value, update your public explanation and test plan so the
                  business promise still matches the configured behavior.
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-4xl space-y-5 text-lg leading-8 text-muted">
            <p>
              Enter the fields in the displayed order even when the interface
              lets you jump around. Earlier choices can reveal, hide, enable, or
              constrain later controls. Re-read the complete table before
              saving, especially where two settings use similar language but
              apply at different scopes, such as a store-wide policy versus a
              product, variation, rule, offer, email, or customer-level option.
            </p>
            <p>
              Do not copy values from the screenshot when they differ from the
              recipe table. The screenshot documents the location and shape of
              the real staging interface; the table is the authoritative
              configuration for this use case. This distinction lets one
              staging screen explain several related recipes without pretending
              that a single saved staging record represents every possible
              business policy.
            </p>
          </div>
        </Container>
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Setup walkthrough"
            title="Complete the configuration in sequence"
            subtitle="Follow every step, then perform the verification pass before exposing the workflow to customers."
            align="center"
          />
          <ol className="mx-auto mt-12 flex max-w-4xl flex-col gap-[0.1875rem]">
            {recipe.steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl bg-card p-6 text-foreground sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display font-semibold text-on-dark">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{step.title}</h3>
                    <p className="mt-3 leading-7 text-muted">
                      {step.description}
                    </p>
                    <p className="mt-4 leading-7 text-muted">
                      Pause after this step and confirm that the screen reflects
                      the intended choice before moving on. If the control is
                      unavailable, check the active plugin tier, required module,
                      selected product type, earlier prerequisite, and your
                      administrator capability. Record any store-specific
                      variation so another operator can reproduce the same
                      result without guessing.
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-10 max-w-4xl space-y-5 text-lg leading-8 text-muted">
            <p>
              Save only after the sequence is internally consistent. Then leave
              the screen and reopen it to prove that the values persisted.
              Browser state can make an unsaved form look complete, so a fresh
              load is a useful first check. When the recipe affects scheduled or
              asynchronous work, also allow the relevant job, webhook, or email
              event to run instead of judging the workflow immediately after the
              button click.
            </p>
            <p>{guidance.operations}</p>
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Operational notes"
            title="Avoid the common failure points"
            subtitle="These details are part of the recipe, not optional fine print."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-[0.1875rem] md:grid-cols-2">
            {recipe.notes.map((note) => (
              <div
                key={note}
                className="rounded-2xl bg-card p-6 text-foreground sm:p-8"
              >
                <Settings2
                  aria-hidden="true"
                  className="size-6 text-primary"
                />
                <p className="mt-4 leading-7 text-muted">{note}</p>
                <p className="mt-4 leading-7 text-muted">
                  Include this condition in the launch checklist and support
                  documentation. Verify it with a counterexample as well as the
                  intended path, because many configuration mistakes are visible
                  only when an account, product, status, date, or rule does not
                  qualify.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="highlight" spacing="md">
        <Container>
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Launch checklist"
              title={`Verify ${recipe.name} end to end`}
              subtitle="Use a real browser session and inspect the resulting records before considering the recipe complete."
              align="center"
            />
            <div className="mt-12 grid gap-[0.1875rem] lg:grid-cols-2">
              <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
                <ClipboardCheck
                  aria-hidden="true"
                  className="size-7 text-primary"
                />
                <h3 className="mt-4 font-display text-2xl">
                  Positive-path verification
                </h3>
                <p className="mt-4 leading-7 text-muted">
                  Use an account that should qualify and complete the workflow
                  from the customer-facing entry point whenever one exists.
                  Confirm the visible copy, totals, dates, buttons, messages,
                  and next steps. Then inspect the corresponding subscription,
                  order, user, rule, credit, email, audit, job, or report record
                  in the administrator area. The frontend and stored state must
                  tell the same story.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
                <SearchCheck
                  aria-hidden="true"
                  className="size-7 text-primary"
                />
                <h3 className="mt-4 font-display text-2xl">
                  Boundary and negative checks
                </h3>
                <p className="mt-4 leading-7 text-muted">
                  Repeat the important step with an account that should not
                  qualify, a different status or plan, and a value near any date,
                  amount, usage, or cycle boundary. Confirm that the workflow
                  fails safely, explains what the person can do next, and does
                  not create a partial order or contradictory state. Test both
                  desktop and mobile when customers interact with the result.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-4xl space-y-5 text-lg leading-8 text-muted">
              <p>
                Keep the evidence needed to diagnose a later report: the recipe
                name, configuration date, test account, relevant product or
                subscription ID, expected outcome, actual outcome, and any
                screenshots or record values that demonstrate success. Avoid
                storing secrets or payment data in that note. A compact evidence
                trail is far more useful than a statement that the settings
                “looked right.”
              </p>
              <p>
                Finally, assign an owner and a review trigger. Revisit this
                configuration when its product, price, gateway, renewal policy,
                access rule, portal, email template, reporting definition, or
                related module changes. Also review it after a meaningful
                customer complaint or unexpected metric movement. Configuration
                is durable, but the assumptions around it are not.
              </p>
              <p>
                Once the positive, negative, and boundary checks pass, publish
                the customer-facing explanation and give support staff the same
                policy summary. The recipe is then more than a saved screen: it
                is a documented, testable workflow that can be operated
                consistently and improved with evidence.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
