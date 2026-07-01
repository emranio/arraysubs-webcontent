import { readFile } from "node:fs/promises";
import path from "node:path";

export const PRO_PLUGIN_SLUG = "arraysubspro";

export type ProPluginSlug = typeof PRO_PLUGIN_SLUG;

export type ProPluginManifest = {
  pluginSlug: ProPluginSlug;
  latestVersion: string;
  releaseDate: string;
  zipPath: string;
  name: string;
  requires?: string;
  tested?: string;
  homepage?: string;
  changelog?: string;
};

type RawProPluginManifest = Partial<Omit<ProPluginManifest, "pluginSlug">> & {
  pluginSlug?: unknown;
};

export function normalizePluginSlug(value: unknown): ProPluginSlug | "" {
  const slug = typeof value === "string" ? value.trim().toLowerCase() : "";

  return slug === PRO_PLUGIN_SLUG ? PRO_PLUGIN_SLUG : "";
}

export function resolveProPluginsDir() {
  const configuredDir = process.env.PRO_PLUGINS_DIR?.trim();

  if (!configuredDir) {
    throw new Error("PRO_PLUGINS_DIR is not configured.");
  }

  return path.isAbsolute(configuredDir)
    ? configuredDir
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), configuredDir);
}

export async function readProPluginManifest(
  pluginSlugValue: unknown,
): Promise<ProPluginManifest> {
  const pluginSlug = normalizePluginSlug(pluginSlugValue);

  if (!pluginSlug) {
    throw new Error("Unsupported plugin slug.");
  }

  const pluginsDir = resolveProPluginsDir();
  const manifestPath = path.join(pluginsDir, `${pluginSlug}.json`);
  const raw = JSON.parse(await readFile(manifestPath, "utf8")) as RawProPluginManifest;
  const latestVersion =
    typeof raw.latestVersion === "string" ? raw.latestVersion.trim() : "";
  const releaseDate =
    typeof raw.releaseDate === "string" ? raw.releaseDate.trim() : "";
  const configuredZipPath =
    typeof raw.zipPath === "string" ? raw.zipPath.trim() : "";

  if (!latestVersion || !releaseDate || !configuredZipPath) {
    throw new Error("Invalid Pro plugin manifest.");
  }

  const manifestPluginSlug = normalizePluginSlug(raw.pluginSlug ?? pluginSlug);

  if (manifestPluginSlug !== pluginSlug) {
    throw new Error("Pro plugin manifest slug does not match the request.");
  }

  return {
    pluginSlug,
    latestVersion,
    releaseDate,
    zipPath: path.isAbsolute(configuredZipPath)
      ? configuredZipPath
      : path.join(pluginsDir, configuredZipPath),
    name: typeof raw.name === "string" && raw.name.trim()
      ? raw.name.trim()
      : "ArraySubs Pro",
    requires: typeof raw.requires === "string" ? raw.requires.trim() : undefined,
    tested: typeof raw.tested === "string" ? raw.tested.trim() : undefined,
    homepage: typeof raw.homepage === "string" ? raw.homepage.trim() : undefined,
    changelog: typeof raw.changelog === "string" ? raw.changelog.trim() : undefined,
  };
}
