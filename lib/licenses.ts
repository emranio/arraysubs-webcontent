import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  normalizePluginSlug,
  PRO_PLUGIN_SLUG,
  type ProPluginSlug,
} from "@/lib/pro-plugins";

export const TRIAL_PACKAGE_NAME = "4mo-trial";
export const TRIAL_LICENSE_DURATION_MONTHS = 4;
export const LICENSE_KEY_LENGTH = 48;

export type LicenseSubmission = {
  kind: "pro-license";
  name: string;
  email: string;
  sourcePath: string;
  country: string;
  business?: string;
  consent?: boolean;
};

export type TrialLicenseRecord = {
  licenseKey: string;
  pluginSlug: ProPluginSlug;
  packageName: typeof TRIAL_PACKAGE_NAME;
  status: "trial";
  createdDateUtc: string;
  expireDateUtc: string;
  submission: LicenseSubmission;
  activations?: {
    count: number;
    log: LicenseActivationLogEntry[];
  };
};

export type LicenseActivationLogEntry = {
  activationKey: string;
  pluginSlug: ProPluginSlug;
  activatedDomain: string;
  createdDateUtc: string;
  fileName: string;
};

export type LicenseActivationRecord = LicenseActivationLogEntry & {
  licenseKey: string;
  packageName: typeof TRIAL_PACKAGE_NAME;
};

export type ActivationValidation = {
  ok: boolean;
  status?: number;
  activationDateUtc: string;
  error?: string;
};

const LICENSE_KEY_RE = /^[a-f0-9]{48}$/;
const ACTIVATION_KEY_RE = /^[a-f0-9]{16}$/;

export function generateLicenseKey(email: string) {
  return createHash("sha256").update(email).digest("hex").slice(0, LICENSE_KEY_LENGTH);
}

export function normalizeLicenseKey(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isValidLicenseKey(value: string) {
  return LICENSE_KEY_RE.test(value);
}

export function normalizeActivationKey(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isValidActivationKey(value: string) {
  return ACTIVATION_KEY_RE.test(value);
}

export function addUtcMonths(date: Date, months: number) {
  const next = new Date(date.getTime());
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
}

export function normalizeUtcIsoDate(value: unknown) {
  const date = value ? new Date(String(value)) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString();
}

function resolveLicenseBaseDir() {
  const configuredDir = process.env.LICENSE_DIR?.trim();

  if (!configuredDir) {
    throw new Error("LICENSE_DIR is not configured.");
  }

  const baseDir = path.isAbsolute(configuredDir)
    ? configuredDir
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), configuredDir);

  return baseDir;
}

function resolveLicenseKeysDir() {
  return path.join(resolveLicenseBaseDir(), "keys");
}

function resolveLicenseActivationsDir() {
  return path.join(resolveLicenseBaseDir(), "activations");
}

function getLicenseFilePath(licenseKey: string) {
  return path.join(resolveLicenseKeysDir(), `${licenseKey}.txt`);
}

function getActivationKey(
  licenseKey: string,
  activatedDomain: string,
  pluginSlug: ProPluginSlug,
) {
  return createHash("sha256")
    .update(`${pluginSlug}:${licenseKey}:${activatedDomain}`)
    .digest("hex")
    .slice(0, 16);
}

function getActivationFileName(
  licenseKey: string,
  activationKey: string,
) {
  return `${licenseKey}-${activationKey}.txt`;
}

async function writeJsonFileAtomic(
  filePath: string,
  value: unknown,
  tempDir: string,
) {
  const tempPath = path.join(tempDir, `.${path.basename(filePath)}.${randomUUID()}.tmp`);

  await writeFile(tempPath, `${JSON.stringify(value, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(tempPath, filePath);
}

export function normalizeActivatedDomain(value: unknown) {
  const rawValue = typeof value === "string" ? value.trim() : "";

  if (!rawValue) {
    return "";
  }

  try {
    const url = new URL(
      /^[a-z][a-z0-9+.-]*:\/\//i.test(rawValue)
        ? rawValue
        : `http://${rawValue}`,
    );
    const hostname = url.hostname.toLowerCase().replace(/\.$/, "");

    if (!hostname) {
      return "";
    }

    return url.port ? `${hostname}:${url.port}` : hostname;
  } catch {
    return "";
  }
}

export async function writeTrialLicense(submission: LicenseSubmission) {
  const createdDate = new Date();
  const licenseKey = generateLicenseKey(submission.email);
  const licenseDir = resolveLicenseKeysDir();
  const record: TrialLicenseRecord = {
    licenseKey,
    pluginSlug: PRO_PLUGIN_SLUG,
    packageName: TRIAL_PACKAGE_NAME,
    status: "trial",
    createdDateUtc: createdDate.toISOString(),
    expireDateUtc: addUtcMonths(
      createdDate,
      TRIAL_LICENSE_DURATION_MONTHS,
    ).toISOString(),
    submission,
    activations: {
      count: 0,
      log: [],
    },
  };
  const filePath = path.join(licenseDir, `${licenseKey}.txt`);

  await mkdir(licenseDir, { recursive: true });
  await writeJsonFileAtomic(filePath, record, licenseDir);

  return record;
}

export async function readTrialLicense(licenseKey: string) {
  const normalizedKey = normalizeLicenseKey(licenseKey);

  if (!isValidLicenseKey(normalizedKey)) {
    throw new Error("Invalid license key.");
  }

  const file = await readFile(getLicenseFilePath(normalizedKey), "utf8");
  const record = JSON.parse(file) as TrialLicenseRecord;

  if (
    record.licenseKey !== normalizedKey ||
    record.pluginSlug !== PRO_PLUGIN_SLUG ||
    record.packageName !== TRIAL_PACKAGE_NAME ||
    !record.createdDateUtc ||
    !record.expireDateUtc
  ) {
    throw new Error("Invalid license file.");
  }

  return record;
}

export async function createOrReuseActivation(
  record: TrialLicenseRecord,
  activatedDomainValue: unknown,
  pluginSlugValue: unknown = PRO_PLUGIN_SLUG,
) {
  const pluginSlug = normalizePluginSlug(pluginSlugValue);

  if (!pluginSlug || pluginSlug !== record.pluginSlug) {
    throw new Error("This license is not valid for the requested plugin.");
  }

  const activatedDomain = normalizeActivatedDomain(activatedDomainValue);

  if (!activatedDomain) {
    throw new Error("Invalid activation domain.");
  }

  const activationKey = getActivationKey(record.licenseKey, activatedDomain, pluginSlug);
  const activationsDir = resolveLicenseActivationsDir();
  const fileName = getActivationFileName(
    record.licenseKey,
    activationKey,
  );
  const filePath = path.join(activationsDir, fileName);

  await mkdir(activationsDir, { recursive: true });

  try {
    const existing = JSON.parse(
      await readFile(filePath, "utf8"),
    ) as LicenseActivationRecord;

    if (
      existing.licenseKey === record.licenseKey &&
      existing.pluginSlug === pluginSlug &&
      existing.activatedDomain === activatedDomain &&
      existing.activationKey === activationKey
    ) {
      return { activation: existing, created: false };
    }
  } catch {
    // Missing or unreadable activation files are recreated below.
  }

  const createdDateUtc = new Date().toISOString();
  const activation: LicenseActivationRecord = {
    activationKey,
    pluginSlug,
    licenseKey: record.licenseKey,
    packageName: TRIAL_PACKAGE_NAME,
    activatedDomain,
    createdDateUtc,
    fileName,
  };

  await writeJsonFileAtomic(filePath, activation, activationsDir);
  await appendActivationLog(record, activation);

  return { activation, created: true };
}

async function appendActivationLog(
  record: TrialLicenseRecord,
  activation: LicenseActivationRecord,
) {
  const licenseDir = resolveLicenseKeysDir();
  const filePath = getLicenseFilePath(record.licenseKey);
  const currentRecord = JSON.parse(
    await readFile(filePath, "utf8"),
  ) as TrialLicenseRecord;
  const existingLog = Array.isArray(currentRecord.activations?.log)
    ? currentRecord.activations.log
    : [];
  const hasExistingActivation = existingLog.some(
    (entry) =>
      entry.activationKey === activation.activationKey ||
      (
        entry.pluginSlug === activation.pluginSlug &&
        entry.activatedDomain === activation.activatedDomain
      ),
  );

  if (hasExistingActivation) {
    return;
  }

  const nextLog = [
    ...existingLog,
    {
      activationKey: activation.activationKey,
      pluginSlug: activation.pluginSlug,
      activatedDomain: activation.activatedDomain,
      createdDateUtc: activation.createdDateUtc,
      fileName: activation.fileName,
    },
  ];
  const nextRecord: TrialLicenseRecord = {
    ...currentRecord,
    activations: {
      count: nextLog.length,
      log: nextLog,
    },
  };

  await writeJsonFileAtomic(filePath, nextRecord, licenseDir);
}

export function validateActivationDate(
  record: TrialLicenseRecord,
  activationDateUtc?: unknown,
): ActivationValidation {
  const normalizedActivationDate = normalizeUtcIsoDate(activationDateUtc);

  if (!normalizedActivationDate) {
    return {
      ok: false,
      status: 400,
      activationDateUtc: "",
      error: "Invalid activation date.",
    };
  }

  const activationTime = new Date(normalizedActivationDate).getTime();
  const createdTime = new Date(record.createdDateUtc).getTime();
  const expireTime = new Date(record.expireDateUtc).getTime();

  if (
    Number.isNaN(activationTime) ||
    Number.isNaN(createdTime) ||
    Number.isNaN(expireTime)
  ) {
    return {
      ok: false,
      status: 500,
      activationDateUtc: normalizedActivationDate,
      error: "Invalid license date metadata.",
    };
  }

  if (activationTime < createdTime || activationTime > expireTime) {
    return {
      ok: false,
      status: 403,
      activationDateUtc: normalizedActivationDate,
      error: "This license is not active for the requested date.",
    };
  }

  return {
    ok: true,
    activationDateUtc: normalizedActivationDate,
  };
}

export async function findActivationByKey(
  pluginSlugValue: unknown,
  activationKeyValue: unknown,
) {
  const pluginSlug = normalizePluginSlug(pluginSlugValue);
  const activationKey = normalizeActivationKey(activationKeyValue);

  if (!pluginSlug || !isValidActivationKey(activationKey)) {
    return null;
  }

  const activationsDir = resolveLicenseActivationsDir();
  const fileNames = await readdir(activationsDir).catch(() => []);

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".txt")) {
      continue;
    }

    try {
      const record = JSON.parse(
        await readFile(path.join(activationsDir, fileName), "utf8"),
      ) as LicenseActivationRecord;

      if (
        record.pluginSlug === pluginSlug &&
        record.activationKey === activationKey &&
        record.fileName === fileName
      ) {
        return record;
      }
    } catch {
      // Ignore malformed activation records and keep searching valid files.
    }
  }

  return null;
}

export async function validatePluginActivation(
  pluginSlugValue: unknown,
  activationKeyValue: unknown,
  activatedDomainValue: unknown,
  validationDateUtc: unknown = new Date().toISOString(),
): Promise<
  | {
      ok: true;
      pluginSlug: ProPluginSlug;
      activation: LicenseActivationRecord;
      license: TrialLicenseRecord;
      validationDateUtc: string;
    }
  | {
      ok: false;
      status: number;
      error: string;
    }
> {
  const pluginSlug = normalizePluginSlug(pluginSlugValue);

  if (!pluginSlug) {
    return {
      ok: false,
      status: 400,
      error: "Unsupported plugin slug. This endpoint only supports ArraySubs Pro.",
    };
  }

  const activationKey = normalizeActivationKey(activationKeyValue);

  if (!isValidActivationKey(activationKey)) {
    return {
      ok: false,
      status: 401,
      error: "ArraySubs Pro is not activated on this site. Activate your license before downloading the update.",
    };
  }

  const activatedDomain = normalizeActivatedDomain(activatedDomainValue);

  if (!activatedDomain) {
    return {
      ok: false,
      status: 400,
      error: "The update request did not include a valid site domain.",
    };
  }

  const activation = await findActivationByKey(pluginSlug, activationKey);

  if (!activation) {
    return {
      ok: false,
      status: 403,
      error: "This activation key was not found. Reactivate the ArraySubs Pro license on this site and try again.",
    };
  }

  if (activation.activatedDomain !== activatedDomain) {
    return {
      ok: false,
      status: 403,
      error: "This activation key belongs to a different site domain.",
    };
  }

  let license: TrialLicenseRecord;

  try {
    license = await readTrialLicense(activation.licenseKey);
  } catch {
    return {
      ok: false,
      status: 403,
      error: "The license attached to this activation key could not be found.",
    };
  }

  if (license.pluginSlug !== pluginSlug || activation.pluginSlug !== pluginSlug) {
    return {
      ok: false,
      status: 403,
      error: "This activation key is not valid for ArraySubs Pro.",
    };
  }

  const validation = validateActivationDate(license, validationDateUtc);

  if (!validation.ok) {
    return {
      ok: false,
      status: validation.status ?? 403,
      error:
        validation.error ||
        "This license is expired or not active yet. Renew or reactivate the license before downloading the update.",
    };
  }

  return {
    ok: true,
    pluginSlug,
    activation,
    license,
    validationDateUtc: validation.activationDateUtc,
  };
}
