import { randomUUID } from "node:crypto";
import type { Db } from "../db.js";
import { liveObligations } from "../ledger/review.js";

export interface ReconcileStats { aged: number; nudgesDrafted: number }

/**
 * Deterministic nightly step. Runs after extraction.
 *  1. Rows past due move open -> aging (and renegotiated -> aging).
 *  2. Aging rows without a pending nudge or a pending close get a drafted nudge proposal. Nothing is sent.
 */
export function reconcile(db: Db, now = new Date()): ReconcileStats {
  const today = now.toISOString().slice(0, 10);
  const s: ReconcileStats = { aged: 0, nudgesDrafted: 0 };
  for (const o of liveObligations(db)) {
    if (o.dueDate && o.dueDate < today && o.state !== "aging") {
      db.updateObligation(o.id, { state: "aging" });
      s.aged++;
    }
    const overdue = o.dueDate && o.dueDate < today;
    // A row the model already thinks is done waits for the user's accept; nagging it is noise.
    if (overdue && !db.hasPendingProposal(o.id, "nudge") && !db.hasPendingProposal(o.id, "close")) {
      const days = Math.round((now.getTime() - new Date(`${o.dueDate}T00:00:00Z`).getTime()) / 86400000);
      const body = o.direction === "outbound"
        ? `You owe ${o.counterparty} (${o.tenant}): "${o.summary}", due ${o.dueDate}, ${days}d overdue. Draft: "Hi ${o.counterparty}, quick update on ${lower(o.summary)}: I'm running behind, new ETA is ____. Still needed?"`
        : `${o.counterparty} (${o.tenant}) asked you to "${o.summary}", due ${o.dueDate}, ${days}d overdue. Decide: do it today, renegotiate, or drop with a reply.`;
      db.insertProposal({ id: `pr_${randomUUID().slice(0, 8)}`, obligationId: o.id, type: "nudge", body, evidenceMessageId: null, createdAt: now.toISOString(), status: "pending" });
      s.nudgesDrafted++;
    }
  }
  return s;
}

function lower(s: string): string { return s.charAt(0).toLowerCase() + s.slice(1); }
