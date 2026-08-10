import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Restore the site's canonical trailing-slash policy after
 * `skipTrailingSlashRedirect` gives legacy redirects first priority.
 *
 * Redirect rules from `next.config.ts` run before Proxy, so both slashless and
 * trailing-slash `/deals/**` URLs resolve directly to their final destination.
 * All other extensionless page paths retain the permanent 308 normalization
 * Next.js previously supplied automatically.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname.endsWith("/")) {
    return NextResponse.next();
  }

  const destination = new URL(request.url);
  destination.pathname = `${pathname}/`;

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!_next|\\.well-known|.*\\.[^/]+$).*)"],
};
