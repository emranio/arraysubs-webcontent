import {
  renderSitemapIndex,
  sitemapPaths,
  xmlResponse,
} from "@/lib/sitemaps";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(renderSitemapIndex(Object.values(sitemapPaths)));
}
