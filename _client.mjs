import { KrebsitiClient } from "krebsiti-ai";

export function requiredEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function createClient() {
  const apiKey = requiredEnv("KREBSITI_API_KEY");
  const baseURL = String(process.env.KREBSITI_BASE_URL || "").trim() || undefined;
  return new KrebsitiClient({ apiKey, baseURL });
}
