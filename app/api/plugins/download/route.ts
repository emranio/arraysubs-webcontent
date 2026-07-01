import { readFile } from "node:fs/promises";
import path from "node:path";
import { normalizeActivatedDomain, validatePluginActivation } from "@/lib/licenses";
import { normalizePluginSlug, readProPluginManifest } from "@/lib/pro-plugins";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function textError(message: string, status: number) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function requestUserAgentMatchesDomain(userAgent: string | null, activatedDomain: string) {
  const match = /^WordPress\/[\d.]+;\s+(\S+)/iu.exec(userAgent ?? "");

  if (!match) {
    return false;
  }

  return normalizeActivatedDomain(match[1]) === activatedDomain;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pluginSlug = normalizePluginSlug(url.searchParams.get("pluginSlug"));
  const activationKey = url.searchParams.get("activationKey");
  const activatedDomain = url.searchParams.get("activatedDomain");

  if (!pluginSlug) {
    return textError(
      "Unsupported plugin slug. This download endpoint only supports ArraySubs Pro.",
      400,
    );
  }

  const validation = await validatePluginActivation(
    pluginSlug,
    activationKey,
    activatedDomain,
  );

  if (!validation.ok) {
    return textError(validation.error, validation.status);
  }

  if (
    !requestUserAgentMatchesDomain(
      request.headers.get("user-agent"),
      validation.activation.activatedDomain,
    )
  ) {
    return textError(
      "This update download must be requested by the activated WordPress site.",
      403,
    );
  }

  let manifest;

  try {
    manifest = await readProPluginManifest(pluginSlug);
  } catch (error) {
    console.error("Pro plugin download manifest failed", error);

    return textError(
      "ArraySubs Pro download metadata is not configured correctly.",
      503,
    );
  }

  try {
    const file = await readFile(manifest.zipPath);
    const fileName = path.basename(manifest.zipPath).replace(/[^A-Za-z0-9._-]/g, "");

    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName || "arraysubspro.zip"}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Pro plugin zip download failed", error);

    return textError(
      "ArraySubs Pro update file is missing on the license server.",
      503,
    );
  }
}
