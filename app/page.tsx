import { redirect } from "next/navigation";

/**
 * The ArraySubs landing page lives at `/deals/arraysubs/`. The site root
 * redirects there so `/` and the canonical product URL stay in sync.
 */
export default function RootPage() {
  redirect("/deals/arraysubs/");
}
