import { redirect } from "next/navigation";

/**
 * The ArraySubs landing page lives at `/deals/arraysubs/`. The site root
 * redirects there so `/` and the canonical product URL stay in sync.
 *
 * The query string is forwarded because affiliate/campaign links often point
 * at the bare domain (e.g. `arrayhash.com/?ref=CODE`) — dropping it here would
 * strip the GoAffPro referral code before the tracker can read it.
 */
export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, item);
    } else if (value !== undefined) {
      params.set(key, value);
    }
  }

  const queryString = params.toString();

  redirect(queryString ? `/deals/arraysubs/?${queryString}` : "/deals/arraysubs/");
}
