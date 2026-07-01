import { normalizeActivatedDomain, validatePluginActivation } from "@/lib/licenses";
import {
  normalizePluginSlug,
  PRO_PLUGIN_SLUG,
  readProPluginManifest,
} from "@/lib/pro-plugins";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UpdatePayload = {
  pluginSlug?: unknown;
  currentVersion?: unknown;
  activationKey?: unknown;
  activatedDomain?: unknown;
};

function readString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function readPayload(request: Request): Promise<UpdatePayload> {
  if (request.method === "GET") {
    const url = new URL(request.url);

    return {
      pluginSlug: url.searchParams.get("pluginSlug"),
      currentVersion: url.searchParams.get("currentVersion"),
      activationKey: url.searchParams.get("activationKey"),
      activatedDomain: url.searchParams.get("activatedDomain"),
    };
  }

  try {
    return (await request.json()) as UpdatePayload;
  } catch {
    return {};
  }
}

function buildDownloadUrl(
  requestUrl: string,
  pluginSlug: string,
  activationKey: string,
  activatedDomain: string,
) {
  const url = new URL("/api/plugins/download", requestUrl);

  url.searchParams.set("pluginSlug", pluginSlug);

  if (activationKey) {
    url.searchParams.set("activationKey", activationKey);
  }

  if (activatedDomain) {
    url.searchParams.set("activatedDomain", activatedDomain);
  }

  return url.toString();
}

async function buildUpdateResponse(request: Request) {
  const payload = await readPayload(request);
  const pluginSlug = normalizePluginSlug(payload.pluginSlug || PRO_PLUGIN_SLUG);

  if (!pluginSlug) {
    return Response.json(
      {
        ok: false,
        error: "Unsupported plugin slug. This update endpoint only supports ArraySubs Pro.",
      },
      { status: 400 },
    );
  }

  let manifest;

  try {
    manifest = await readProPluginManifest(pluginSlug);
  } catch (error) {
    console.error("Pro plugin update manifest failed", error);

    return Response.json(
      {
        ok: false,
        error: "ArraySubs Pro update metadata is not configured correctly.",
      },
      { status: 503 },
    );
  }

  const activationKey = readString(payload.activationKey, 64).toLowerCase();
  const activatedDomain = normalizeActivatedDomain(payload.activatedDomain);
  const license = activationKey
    ? await validatePluginActivation(pluginSlug, activationKey, activatedDomain)
    : {
        ok: false as const,
        status: 401,
        error:
          "ArraySubs Pro is not activated on this site. Activate your license before downloading the update.",
      };

  return Response.json({
    ok: true,
    plugin: {
      pluginSlug,
      name: manifest.name,
      latestVersion: manifest.latestVersion,
      releaseDate: manifest.releaseDate,
      requires: manifest.requires,
      tested: manifest.tested,
      homepage: manifest.homepage,
      changelog: manifest.changelog,
      packageUrl: buildDownloadUrl(
        request.url,
        pluginSlug,
        activationKey,
        activatedDomain,
      ),
    },
    license: license.ok
      ? {
          active: true,
          activatedDomain: license.activation.activatedDomain,
          expireDateUtc: license.license.expireDateUtc,
        }
      : {
          active: false,
          message: license.error,
        },
  });
}

export async function GET(request: Request) {
  return buildUpdateResponse(request);
}

export async function POST(request: Request) {
  return buildUpdateResponse(request);
}
