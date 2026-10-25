import { randomUUID } from "node:crypto";
import type { Db } from "../db.js";
import type { Obligation } from "../types.js";
import type { Extraction } from "../extract/schema.js";
import type { ExtractionInput } from "../extract/prompt.js";

export interface ApplyStats {
  inserted: number;
  updated: number;
  closesProposed: number;
  duplicatesMerged: number;
  lowConfidenceDropped: number;
  invalidRefs: number;
}

export const MIN_CONFIDENCE = 0.5;
export const DUPLICATE_SIMILARITY = 0.6;

/**
 * Writes an extraction result into the ledger. New obligations are inserted as unreviewed rows.
 * Closes are never applied directly: they become pending proposals for the user to accept.
 */
export function applyExtraction(db: Db, input: ExtractionInput, x: Extraction): ApplyStats {
  const s: ApplyStats = { inserted: 0, updated: 0, closesProposed: 0, duplicatesMerged: 0, lowConfidenceDropped: 0, invalidRefs: 0 };
  const { thread, candidates } = input;
  const msgAt = (i: number) => thread.messages[i];
  const candidate = (id: string | null) => (id ? candidates.find((c) => c.id === id) ?? null : null);
  const live = () => db.listObligations({ tenant: thread.tenant, states: ["open", "aging", "renegotiated"] });

  for (const n of x.new_obligations) {
    const m = msgAt(n.source_message_index);
    if (!m) { s.invalidRefs++; continue; }
    if (n.confidence < MIN_CONFIDENCE) { s.lowConfidenceDropped++; continue; }
    const due = candidate(n.due_candidate_id);
    if (n.due_candidate_id && !due) s.invalidRefs++;
    // Dedupe against live rows with the same direction and a similar summary.
    const dup = live().find((o) => o.direction === n.direction && similarity(o.summary, n.summary) >= DUPLICATE_SIMILARITY);
    if (dup) {
      db.addEvidence(dup.id, { messageId: m.id, kind: "update", quote: n.evidence_quote, ts: m.ts });
      if (due && !dup.dueDate) db.updateObligation(dup.id, { dueDate: due.date, dueText: due.text });
      s.duplicatesMerged++;
      continue;
    }
    const now = new Date().toISOString();
    const o: Obligation = {
      id: `ob_${randomUUID().slice(0, 8)}`, tenant: thread.tenant, direction: n.direction, counterparty: n.counterparty.trim() || "unknown",
      summary: n.summary.trim(), dueDate: due?.date ?? null, dueText: due?.text ?? null, conditional: n.conditional, state: "open",
      confidence: n.confidence, createdAt: m.ts, updatedAt: now, reviewed: false, closeReason: null, originThreadId: thread.key,
    };
    db.insertObligation(o, [{ messageId: m.id, kind: "origin", quote: n.evidence_quote, ts: m.ts }]);
    s.inserted++;
  }

  for (const u of x.updates) {
    const o = db.getObligation(u.obligation_id);
    const m = msgAt(u.source_message_index);
    if (!o || !m || o.tenant !== thread.tenant) { s.invalidRefs++; continue; }
    const patch: Partial<Obligation> = {};
    if (u.change === "renegotiated_due") {
      const due = candidate(u.due_candidate_id);
      if (!due) { s.invalidRefs++; continue; }
      patch.dueDate = due.date; patch.dueText = due.text; patch.state = "renegotiated";
    } else if (u.change === "dropped") {
      patch.state = "dropped"; patch.closeReason = `dropped: ${u.evidence_quote}`;
    } else if (u.change === "clarified" && u.new_summary) {
      patch.summary = u.new_summary.trim();
    }
    db.updateObligation(o.id, patch);
    db.addEvidence(o.id, { messageId: m.id, kind: "update", quote: u.evidence_quote, ts: m.ts });
    s.updated++;
  }

  for (const c of x.closes) {
    const o = db.getObligation(c.obligation_id);
    const m = msgAt(c.source_message_index);
    if (!o || !m || o.tenant !== thread.tenant) { s.invalidRefs++; continue; }
    if (!["open", "aging", "renegotiated"].includes(o.state)) continue;
    if (db.hasPendingProposal(o.id, "close")) continue;
    db.insertProposal({ id: `pr_${randomUUID().slice(0, 8)}`, obligationId: o.id, type: "close", body: c.evidence_quote, evidenceMessageId: m.id, createdAt: m.ts, status: "pending" });
    db.addEvidence(o.id, { messageId: m.id, kind: "close", quote: c.evidence_quote, ts: m.ts });
    s.closesProposed++;
  }
  return s;
}

const STOP = new Set(["the", "a", "an", "to", "for", "of", "on", "in", "with", "and", "by", "send", "share", "get", "it", "this", "that", "me", "my", "our", "their", "them"]);
export function tokens(s: string): Set<string> {
  return new Set(s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t)));
}
/** Jaccard similarity on content tokens. */
export function similarity(a: string, b: string): number {
  const ta = tokens(a), tb = tokens(b);
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / (ta.size + tb.size - inter);
}
