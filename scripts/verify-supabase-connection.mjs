import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_ENV_FILE = ".env.local";

function loadEnvFile(filePath) {
  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!existsSync(resolvedPath)) {
    return false;
  }

  const fileContents = readFileSync(resolvedPath, "utf8");

  for (const line of fileContents.split(/\r?\n/u)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();

    if (!key || process.env[key]) {
      continue;
    }

    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }

  return true;
}

function requireEnv(primaryName, fallbackName) {
  const value =
    process.env[primaryName]?.trim() ||
    (fallbackName ? process.env[fallbackName]?.trim() : "");

  if (!value) {
    const acceptedNames = fallbackName ? `${primaryName} or ${fallbackName}` : primaryName;
    throw new Error(`Missing required environment variable: ${acceptedNames}.`);
  }

  return value;
}

const envFile = process.env.SUPABASE_ENV_FILE || DEFAULT_ENV_FILE;
const loadedFromFile = loadEnvFile(envFile);
const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const publishableKey = requireEnv(
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
);
const secretKey = requireEnv("SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY");

let authEndpoint;
let restEndpoint;

try {
  authEndpoint = new URL("/auth/v1/settings", supabaseUrl);
  restEndpoint = new URL("/rest/v1/", supabaseUrl);
} catch {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a valid URL.");
}

const authResponse = await fetch(authEndpoint, {
  headers: {
    Accept: "application/json",
    apikey: publishableKey,
  },
});

if (!authResponse.ok) {
  const responseBody = (await authResponse.text()).slice(0, 300);
  throw new Error(
    `Supabase auth endpoint check failed with ${authResponse.status} ${authResponse.statusText}. Response: ${responseBody}`,
  );
}

const restResponse = await fetch(restEndpoint, {
  headers: {
    Accept: "application/openapi+json",
    apikey: secretKey,
  },
});

if (!restResponse.ok) {
  const responseBody = (await restResponse.text()).slice(0, 300);
  throw new Error(
    `Supabase Data API check failed with ${restResponse.status} ${restResponse.statusText}. Response: ${responseBody}`,
  );
}

const sourceLabel = loadedFromFile ? envFile : "process environment";
console.log(
  `Supabase auth and Data API connectivity verified via ${restEndpoint.origin} using values loaded from ${sourceLabel}.`,
);
