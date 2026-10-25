import { readFileSync, existsSync } from "node:fs";

/** Minimal .env loader so the prototype has no dotenv dependency. Real env wins over the file. */
export function loadEnv(path = ".env"): void {
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    const v = line.slice(eq + 1).trim().replace(/^"(.*)"$/, "$1");
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

export interface Config {
  model: string;
  dbPath: string;
  meSlackId: string | null;
  meNames: string[];
}

export function getConfig(): Config {
  loadEnv();
  return {
    model: process.env.LEDGER_MODEL ?? "claude-opus-5-5",
    dbPath: process.env.LEDGER_DB ?? "./ledger.db",
    meSlackId: process.env.LEDGER_ME_SLACK_ID || null,
    meNames: (process.env.LEDGER_ME_NAMES ?? "me")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

/** Prices per million tokens, Anthropic list, Oct 2026. Used only for eval cost reporting. */
export const PRICES_PER_MTOK: Record<string, { in: number; out: number; cacheRead: number; cacheWrite: number }> = {
  "claude-opus-5-5": { in: 4, out: 20, cacheRead: 0.2, cacheWrite: 5 },
  "claude-sonnet-5-5": { in: 2, out: 10, cacheRead: 0.2, cacheWrite: 2.5 },
  "claude-haiku-5-5": { in: 0.1, out: 0.5, cacheRead: 0.01, cacheWrite: 0.125 },
  "claude-fable-5-1": { in: 10, out: 50, cacheRead: 0.25, cacheWrite: 12.5 },
};
