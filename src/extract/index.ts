import { createHash } from "node:crypto";
import type { Db } from "../db.js";
import type { Config } from "../config.js";
import type { Thread } from "../types.js";
import { dateCandidates } from "./dates.js";
import type { Extractor } from "./claude.js";
import { applyExtraction, type ApplyStats } from "../ledger/apply.js";
import type { ExtractionInput } from "./prompt.js";

export const LIVE_STATES = ["open", "aging", "renegotiated"];

export interface ExtractRunStats extends ApplyStats {
  threadsSeen: number;
  threadsExtracted: number;
  threadsSkipped: number;
  errors: { thread: string; error: string }[];
  notes: { thread: string; note: string }[];
}

export function threadHash(t: Thread): string {
  const h = createHash("sha1");
  for (const m of t.messages) h.update(m.id).update("\u0000").update(m.text).update("\u0000");
  return h.digest("hex");
}

export function buildInput(db: Db, t: Thread, cfg: Config): ExtractionInput {
  return {
    thread: t,
    candidates: dateCandidates(t.messages),
    existing: db.listObligations({ tenant: t.tenant, states: LIVE_STATES }),
    meNames: cfg.meNames,
    meSlackId: cfg.meSlackId,
  };
}

export interface ExtractOptions {
  tenant?: string;
  since?: string;
  /** Re-extract even if the thread hash is unchanged. */
  force?: boolean;
  limit?: number;
  onThread?: (t: Thread, i: number, total: number) => void;
}

/** Walks threads chronologically, calls the extractor once per changed thread, applies results to the ledger. */
export async function runExtraction(db: Db, extractor: Extractor, cfg: Config, opts: ExtractOptions = {}): Promise<ExtractRunStats> {
  const stats: ExtractRunStats = { threadsSeen: 0, threadsExtracted: 0, threadsSkipped: 0, errors: [], notes: [], inserted: 0, updated: 0, closesProposed: 0, duplicatesMerged: 0, lowConfidenceDropped: 0, invalidRefs: 0 };
  const listOpts: { tenant?: string; since?: string } = {};
  if (opts.tenant) listOpts.tenant = opts.tenant;
  if (opts.since) listOpts.since = opts.since;
  let threads = db.listThreads(listOpts);
  if (opts.limit) threads = threads.slice(0, opts.limit);
  for (const [i, t] of threads.entries()) {
    stats.threadsSeen++;
    const hash = threadHash(t);
    if (!opts.force && db.threadHash(t.key) === hash) { stats.threadsSkipped++; continue; }
    opts.onThread?.(t, i, threads.length);
    const input = buildInput(db, t, cfg);
    try {
      const { result, usage } = await extractor.extract(input);
      if (usage) db.logUsage("extract", usage);
      const a = applyExtraction(db, input, result);
      stats.inserted += a.inserted; stats.updated += a.updated; stats.closesProposed += a.closesProposed;
      stats.duplicatesMerged += a.duplicatesMerged; stats.lowConfidenceDropped += a.lowConfidenceDropped; stats.invalidRefs += a.invalidRefs;
      if (result.notes) stats.notes.push({ thread: t.key, note: result.notes });
      db.markExtracted(t.key, hash);
      stats.threadsExtracted++;
    } catch (err) {
      stats.errors.push({ thread: t.key, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return stats;
}
