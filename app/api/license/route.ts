import {
  createOrReuseActivation,
  isValidLicenseKey,
  normalizeActivatedDomain,
  normalizeLicenseKey,
  readTrialLicense,
  validateActivationDate,
} from "@/lib/licenses";
import { normalizePluginSlug } from "@/lib/pro-plugins";

export const runtime = "nodejs";

type LicenseLookupPayload = {
  licenseKey?: unknown;
  pluginSlug?: unknown;
  activatedDomain?: unknown;
  activationDateUtc?: unknown;
};

export async function POST(request: Request) {
  let payload: LicenseLookupPayload;

  try {
    payload = (await request.json()) as LicenseLookupPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid license payload." },
      { status: 400 },
    );
  }

  const licenseKey = normalizeLicenseKey(payload.licenseKey);
  const pluginSlug = normalizePluginSlug(payload.pluginSlug);

  if (!isValidLicenseKey(licenseKey)) {
    return Response.json(
      { ok: false, error: "Invalid license key. Enter the 48-character key from your welcome email." },
      { status: 400 },
    );
  }

  if (!pluginSlug) {
    return Response.json(
      { ok: false, error: "Unsupported plugin slug. This endpoint only supports ArraySubs Pro." },
      { status: 400 },
    );
  }

  const activatedDomain = normalizeActivatedDomain(payload.activatedDomain);

  if (!activatedDomain) {
    return Response.json(
      { ok: false, error: "Invalid activation domain." },
      { status: 400 },
    );
  }

  try {
    const license = await readTrialLicense(licenseKey);

    if (license.pluginSlug !== pluginSlug) {
      return Response.json(
        { ok: false, error: "This license key is not valid for ArraySubs Pro." },
        { status: 403 },
      );
    }

    const activationValidation = validateActivationDate(
      license,
      payload.activationDateUtc,
    );

    if (!activationValidation.ok) {
      return Response.json(
        { ok: false, error: activationValidation.error },
        { status: 403 },
      );
    }

    const { activation, created } = await createOrReuseActivation(
      license,
      activatedDomain,
      pluginSlug,
    );

    return Response.json({
      ok: true,
      license: {
        ...license,
        activationDateUtc: activationValidation.activationDateUtc,
        activation,
        activationCreated: created,
      },
    });
  } catch (error) {
    console.error("License lookup failed", error);

    return Response.json(
      { ok: false, error: "License key was not found. Check the key from your welcome email and try again." },
      { status: 404 },
    );
  }
}
