# Continue Last Batch Blog Writing Job

This is the canonical handoff for the user phrase:

> **continue last batch blog wringing job**

Treat “wringing” as “writing.” When the user sends that phrase, continue this job from the current filesystem state. Do not restart the batch, rewrite finished articles, or ask the user to repeat the requirements unless the filesystem is unavailable.

## First actions on the next machine

1. Confirm that the whole `web-content` worktree—not only this handoff file—was copied, synced, or checked out. At handoff time, the 20 article directories and their assets were untracked. If they are absent, this file alone cannot recover the written posts or image binaries.
2. Read `/Users/emran/Local Sites/wp-test2/app/public/wp-content/plugins/AGENTS.md` completely and follow it.
3. Read these skills completely before continuing:
   - Blog writing: `/Users/emran/.agents/skills/blog-post/SKILL.md`
   - Featured images: `/Users/emran/Local Sites/wp-test2/app/public/wp-content/plugins/.agents/skills/featured-image/SKILL.md`
   - Inline images: `/Users/emran/Local Sites/wp-test2/app/public/wp-content/plugins/.agents/skills/inner-blog-images/SKILL.md`
   - Browser automation when inspecting or capturing the live app: `/Users/emran/Local Sites/wp-test2/app/public/wp-content/plugins/.agents/skills/agent-browser/SKILL.md`
   - Screenshot capture/annotation if any screenshot must be redone: `take-screenshot` and `annotate-screenshots` in the same project skills directory.
4. Run the inventory commands in this document before generating or editing anything. Files may have changed after this handoff was written.

## User requirements and non-negotiable constraints

- Finish the next 20 planned articles, A035 through A054.
- Articles must be long, useful, properly researched, SERP-oriented, and GEO/AI-citation optimized.
- Use current primary sources for factual and time-sensitive claims. Research notes already exist under `marketing-materials/content-plan/research/`; inspect them before adding claims.
- Preserve direct-answer openings, descriptive question headings, extractable tables/checklists/frameworks, limitations, test-environment notes, internal links, and claim-adjacent citations.
- Use many relevant inline images, but do not repeat the same chart/dashboard treatment.
- Visuals must vary among human scenes, physical objects, editorial concepts, architectural cutaways, UI screenshots, app flows, shapes, and tactile metaphors.
- Use real ArraySubs app screenshots with visible annotation markers where they improve procedural understanding.
- Do not invent an ArraySubs “A” mark or substitute logo.
- The canonical official logo is:
  `public/arraysubs-logo-icon-256x256.png`
- When a generated image is branded, pass the canonical logo as the reference image and require faithful reproduction. Inline conceptual images should normally contain no logo at all.
- Do not touch unrelated code or either plugin product (`arraysubs` or `arraysubspro`). This content job belongs only in `web-content`.
- Do not edit `app/deals/arraysubs/resources/_data.ts` until all article text and assets are complete. The user previously objected because that file was changed prematurely. A final, tightly scoped registry edit is authorized only after the batch is ready.
- Do not run PHPCS. This is the Next.js content app, not plugin PHP work.
- Preserve all existing user changes. Do not reset or clean the worktree.

## Current progress at handoff

- Article drafts written: **20/20**
- Featured images present: **20/20**
- Generated inline images installed: **72**
- Annotated real-app screenshots present: **22**
- Articles with every currently referenced image present: **19/20**
- Missing referenced inline images: **3**
- A035-A054 entries added to the app registry: **0/20**
- A035-A054 briefs marked `Published`: **0/20**
- App routes verified for A035-A054: **0/20**

An interrupted eight-image generation request completed while this handoff was being written. Its reviewed outputs were copied into both source and public article directories. The filesystem inventory remains authoritative; at final handoff only the three A054 files below were missing.

## Article list and current word counts

All source posts are at `blogs/<slug>/post.md`. The public image copies are at `public/blogs/<slug>/`.

| ID | Slug | Current words | Brief target | Text action |
| --- | --- | ---: | ---: | --- |
| A035 | `subscription-grace-periods-explained` | 3,005 | 1,600–2,300 | Complete; do not shorten |
| A036 | `expired-cards-and-subscription-recovery` | 2,690 | 2,400–3,200 | Complete |
| A037 | `failed-payment-email-sequence-a-message-by-message-playbook` | 2,784 | 2,400–3,200 | Complete |
| A038 | `auto-downgrade-after-payment-failure-when-it-beats-cancellation` | 2,560 | 2,200–3,000 | Complete |
| A039 | `involuntary-churn-recovery-checklist` | 2,491 | 1,500–2,200 | Complete; do not shorten |
| A040 | `subscription-payment-failure-codes-a-practical-triage-guide` | 2,477 | 1,800–2,800 | Complete |
| A041 | `how-to-create-a-woocommerce-membership-site-architecture-before-configuration` | 3,173 | 3,500–4,500 | Add at least ~350 useful words |
| A042 | `woocommerce-membership-vs-subscription-what-is-the-difference` | 2,251 | 3,000–4,200 | Add at least ~750 useful words |
| A043 | `woocommerce-subscriptions-and-memberships-together-the-complete-architecture` | 2,454 | 2,400–3,200 | Complete |
| A044 | `membership-level-strategy-free-paid-lifetime-and-tiered-access` | 2,446 | 2,200–3,000 | Complete |
| A045 | `woocommerce-content-restriction-strategy` | 2,368 | 2,400–3,200 | Add at least ~100 useful words |
| A046 | `hard-paywall-vs-metered-paywall-vs-freemium-content` | 2,255 | 3,000–4,200 | Add at least ~750 useful words |
| A047 | `content-dripping-strategy-for-membership-sites` | 2,332 | 2,200–3,000 | Complete |
| A048 | `members-only-products-and-catalogs-in-woocommerce` | 2,137 | 2,400–3,200 | Add at least ~300 useful words |
| A049 | `seo-for-gated-woocommerce-content` | 2,296 | 2,400–3,200 | Add at least ~150 useful words |
| A050 | `protecting-membership-downloads-in-wordpress` | 2,347 | 2,400–3,200 | Add at least ~100 useful words |
| A051 | `wordpress-roles-vs-membership-levels-vs-feature-entitlements` | 2,325 | 3,000–4,200 | Add at least ~700 useful words |
| A052 | `url-based-content-restriction-prefixes-wildcards-and-regex` | 2,008 | 2,400–3,200 | Add at least ~450 useful words |
| A053 | `partial-content-restriction-seo-conversion-and-reader-experience` | 2,141 | 2,400–3,200 | Add at least ~300 useful words |
| A054 | `and-or-membership-access-rules-explained-with-examples` | 2,231 | 1,600–2,300 | Complete |

Expand with researched examples, failure modes, decision criteria, implementation cautions, and operator checklists—not filler. Recheck the relevant brief and research note before each expansion.

## Missing inline images

At handoff, these three image references existed in A054 but the source/public PNGs did not yet exist:

### A054

- `member-truth-tiles.png` — tactile member-condition tiles that resolve into open or closed access outcomes. Avoid turning this into a numeric chart.
- `policy-to-builder-strip.png` — a physical/editorial transition from plain-language policy objects to matching builder components.
- `required-and-alternative-chips.png` — interlocking required blocks combined with a set of alternative credential chips.

For every generated inline image:

- Use a wide article composition, normally 1536×1024.
- Require no words, letters, numbers, fake interface copy, logos, charts, or gradients unless the source section genuinely needs a UI-like concept.
- Keep ArraySubs-adjacent colors—deep navy, violet, mint, coral, warm cream—but vary materials, camera angle, people, setting, and visual language.
- Visually inspect every output before installation. Reject repeated compositions, stray text, generic “A” marks, or unrelated objects.
- Copy the approved file to both:
  - `blogs/<slug>/<filename>.png`
  - `public/blogs/<slug>/<filename>.png`

## Existing images and logo corrections

All 20 articles currently have `hero.png` in both source and public directories. Known invented logo marks were corrected in these heroes using the official logo reference:

- A039 `involuntary-churn-recovery-checklist`
- A044 `membership-level-strategy-free-paid-lifetime-and-tiered-access`
- A047 `content-dripping-strategy-for-membership-sites`

Heroes for A048-A054 were also generated with the exact official logo reference. Other inline conceptual images were intentionally created without branding.

Two hero widths still need normalization to exactly **1672×941** in both source and public copies:

- A043 hero is currently 1670×941.
- A046 hero is currently 1671×941.

Pad each once to 1672×941, then copy the exact normalized result to the corresponding public directory. Do not independently process source and public versions because their hashes should match.

## Real screenshots already captured

There are 22 annotated PNGs in:

`marketing-materials/content-plan/screenshots/live-ui/`

They cover grace settings, role mapping, content gates, URL/post-type/shop/download rules, dripping, AND/OR conditions, auto-downgrade, failure audit, on-hold states, payment timeline, email log, customer recovery actions, product editing, feature entitlements, and rule conflicts.

The screenshots were copied into relevant source/public article directories and referenced by the posts. They use purple markers. Do not replace them with generated fake UI.

If a screenshot must be redone:

- Follow `AGENTS.md` for the current live mirror host and credentials; do not rely on memory.
- The user specifically requested the mirror ArraySubs site and real app screenshots with markers.
- Use Vercel `agent-browser` first, load its current core guide, use isolated sessions, snapshot-and-ref navigation, and capture the real current UI.
- Use the screenshot and annotation project skills rather than manually inventing a UI screenshot.

## Research and truth boundaries

Research notes for all 20 posts already exist under:

`marketing-materials/content-plan/research/<slug>.md`

Important truth boundaries already reflected in the drafts must not be weakened during expansion:

- A protected-download nonce is not automatically a one-time signed URL.
- Public raw media/file URLs can bypass an HTML or page-level content gate.
- WordPress roles, membership levels, billing plans, and Pro feature entitlements are different concepts and should not be permanently conflated.
- A052 must accurately describe current ArraySubs URL behavior: query strings removed, exact/prefix/contains semantics, regex behavior, exclusions, priority, and first applicable rule.
- Partial content must be gated server-side; media/downloads need their own authorization.
- Current AND/OR UI behavior includes one nested group; an empty condition set is open; multi-select values inside one condition behave as alternatives.
- Separate education from promotion and explicitly state when ArraySubs is not the right fit.

## Content-plan status update

After an article is genuinely complete, add this line directly below its H1, matching A034 and earlier completed briefs:

```md
- **Status:** Published
```

Apply it to `marketing-materials/content-plan/articles/035-*.md` through `054-*.md` only after the text, assets, and app entry are complete.

## App registry work still required

Only after all 20 posts and images pass validation, edit:

`app/deals/arraysubs/resources/_data.ts`

Add exactly A035-A054, matching the `ResourceArticle` schema and the established A034 pattern. Do not rewrite existing entries.

Category mapping:

- A035-A040: `payment-recovery`
- A041-A054: `membership-strategy`

`membership-strategy` does not currently exist in `RESOURCE_CATEGORIES`; add one focused category object before registering those articles.

Use each post’s front matter and direct-answer opening for metadata. Use concise, non-duplicative excerpts and cover labels. Keep:

- author: `Emran`
- reviewer: `ArraySubs Engineering Team`
- current publication/verification date from the post front matter
- cover path: `/blogs/<slug>/hero.png`
- a reasonable calculated read time
- a content format consistent with the corresponding brief

Expected routes:

- A035-A040: `/deals/arraysubs/resources/payment-recovery/<slug>/`
- A041-A054: `/deals/arraysubs/resources/membership-strategy/<slug>/`

This is the only authorized application-code edit for the batch. Before finishing, inspect the `_data.ts` diff separately and confirm that it contains only the new category and A035-A054 entries.

## Exact inventory commands

Run from the `web-content` root.

### Find missing source image references

```zsh
missing=0
for f in marketing-materials/content-plan/articles/{035..054}-*.md; do
  slug=$(basename "$f" .md | sed 's/^[0-9][0-9][0-9]-//')
  while IFS= read -r img; do
    if [ ! -f "blogs/$slug/$img" ]; then
      printf '%s/%s\n' "$slug" "$img"
      missing=$((missing+1))
    fi
  done < <(perl -ne 'while (/\/blogs\/[^\/]+\/([^\)]+\.png)/g) { print "$1\n" }' "blogs/$slug/post.md" | sort -u)
done
printf 'MISSING_COUNT=%s\n' "$missing"
```

### Recheck word counts against briefs

```zsh
for f in marketing-materials/content-plan/articles/{035..054}-*.md; do
  slug=$(basename "$f" .md | sed 's/^[0-9][0-9][0-9]-//')
  size=$(rg -m1 '\*\*Estimated size:\*\*' "$f" | sed -E 's/.*\*\*Estimated size:\*\*[[:space:]]*//')
  words=$(wc -w < "blogs/$slug/post.md" | tr -d ' ')
  printf '%s\t%s\t%s\n' "$slug" "$words" "$size"
done
```

### Confirm source/public asset parity

```zsh
for f in marketing-materials/content-plan/articles/{035..054}-*.md; do
  slug=$(basename "$f" .md | sed 's/^[0-9][0-9][0-9]-//')
  for img in blogs/$slug/*.png; do
    public="public/$img"
    if [ ! -f "$public" ]; then
      printf 'MISSING_PUBLIC %s\n' "$public"
    elif ! cmp -s "$img" "$public"; then
      printf 'MISMATCH %s %s\n' "$img" "$public"
    fi
  done
done
```

### Confirm hero dimensions

```zsh
for f in marketing-materials/content-plan/articles/{035..054}-*.md; do
  slug=$(basename "$f" .md | sed 's/^[0-9][0-9][0-9]-//')
  printf '%s\t' "$slug"
  sips -g pixelWidth -g pixelHeight "blogs/$slug/hero.png" 2>/dev/null |
    awk '/pixelWidth|pixelHeight/{printf "%s%s", sep, $2; sep="x"} END{print ""}'
done
```

## Final verification checklist

1. `MISSING_COUNT=0` for source image references.
2. Every referenced image exists in the matching public article directory.
3. Source/public PNG pairs are byte-identical.
4. Every hero is exactly 1672×941.
5. Every article meets or exceeds its brief’s minimum length without filler.
6. Every article retains a direct answer in the first 150 words, useful headings, primary-source citations, internal links, key takeaways, limitations, test environment, and visible verification date.
7. No generated image contains an invented ArraySubs mark. Branded images use `public/arraysubs-logo-icon-256x256.png` exactly.
8. Exactly A035-A054 appear in `_data.ts`, and the new `membership-strategy` category exists.
9. Add `- **Status:** Published` to exactly the A035-A054 briefs.
10. Run `npm run typecheck` and `npm run build` from the `web-content` root.
11. Start the app with `npm run dev`; if needed use `npm run dev -- --hostname 0.0.0.0`.
12. Verify all 20 expected routes return HTTP 200 and visually inspect representative payment-recovery and membership-strategy articles with `agent-browser`.
13. Check responsive rendering, real screenshot clarity, marker visibility, image placement, tables, code blocks, citations, CTAs, and broken images.
14. Inspect `git status --short` and `git diff --stat`. Do not include unrelated changes.

## Current worktree caution

At handoff, `git status --short` showed all 20 new source article directories and all 20 public article directories as untracked. It also showed two tracked hidden screenshot-work files as deleted:

- `marketing-materials/content-plan/screenshots/live-ui/.22-feature-entitlements-annotated-steps-uh44tty_/candidate.png`
- `marketing-materials/content-plan/screenshots/live-ui/.22-feature-entitlements-original-crop-5af7uxv7/source.png`

Those hidden-file deletions are not part of the requested content deliverable. Preserve or restore them carefully without resetting unrelated work. The intended replacement/output screenshot is:

`marketing-materials/content-plan/screenshots/live-ui/22-feature-entitlements-annotated.png`

Do not use `git reset --hard`, `git clean`, or broad checkout commands.

## Definition of done

The job is complete only when all 20 articles are long and research-backed, all referenced assets are present in source and public directories, all branded visuals use the official ArraySubs logo, A035-A054 are registered in the app, their briefs are marked published, typecheck/build succeed, all routes work, and a final worktree review proves that no unrelated application or plugin files were changed.
