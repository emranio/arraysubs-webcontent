import { readFile } from "node:fs/promises";
import path from "node:path";
import { PRO_PLUGIN_SLUG, readProPluginManifest } from "@/lib/pro-plugins";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function textError(message: string, status: number) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function GET() {
  let manifest;

  try {
    manifest = await readProPluginManifest(PRO_PLUGIN_SLUG);
  } catch (error) {
    console.error("Temporary Pro plugin download manifest failed", error);

    return textError("ArraySubs Pro download is not configured right now.", 503);
  }

  try {
    const file = await readFile(manifest.zipPath);
    const fileName = path.basename(manifest.zipPath).replace(/[^A-Za-z0-9._-]/g, "");

    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName || "arraysubspro.zip"}"`,
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("Temporary Pro plugin zip download failed", error);

    return textError("ArraySubs Pro download file is missing right now.", 503);
  }
}
