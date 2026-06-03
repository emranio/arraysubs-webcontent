import { COUNTRIES } from "@/lib/countries";

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 80;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = normalize(searchParams.get("q") ?? "");
  const requestedLimit = Number(searchParams.get("limit") ?? DEFAULT_LIMIT);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(1, requestedLimit), MAX_LIMIT)
    : DEFAULT_LIMIT;

  if (!query) {
    return Response.json({ countries: [] });
  }

  const countries = COUNTRIES.filter((country) => {
    return (
      normalize(country.label).includes(query) ||
      normalize(country.value).includes(query)
    );
  }).slice(0, limit);

  return Response.json({ countries });
}
