import type { Db } from "../db.js";
import type { Obligation, Proposal } from "../types.js";

/** User actions. These are the only paths that move a row to done. */
export function acceptProposal(db: Db, id: string): Proposal {
  const p = db.setProposalStatus(id, "accepted");
  if (!p) throw new Error(`No proposal ${id}`);
  if (p.type === "close") db.updateObligation(p.obligationId, { state: "done", closeReason: `closed on evidence: ${p.body}`, reviewed: true });
  return p;
}
export function rejectProposal(db: Db, id: string): Proposal {
  const p = db.setProposalStatus(id, "rejected");
  if (!p) throw new Error(`No proposal ${id}`);
  return p;
}
export function markReviewed(db: Db, obligationId: string): void {
  db.updateObligation(obligationId, { reviewed: true });
}
export function dropObligation(db: Db, id: string, reason = "dropped by user"): void {
  db.updateObligation(id, { state: "dropped", closeReason: reason, reviewed: true });
}
export function completeObligation(db: Db, id: string, reason = "marked done by user"): void {
  db.updateObligation(id, { state: "done", closeReason: reason, reviewed: true });
}
export function renegotiate(db: Db, id: string, dueDate: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) throw new Error("dueDate must be YYYY-MM-DD");
  db.updateObligation(id, { dueDate, dueText: "set by user", state: "renegotiated", reviewed: true });
}
export function deleteObligation(db: Db, id: string): void {
  // Reject rather than hard-delete: keeps the audit trail and lets the eval see false positives.
  db.updateObligation(id, { state: "dropped", closeReason: "rejected by user as not an obligation", reviewed: true });
}
export function liveObligations(db: Db, tenant?: string): Obligation[] {
  const o: { tenant?: string; states: string[] } = { states: ["open", "aging", "renegotiated"] };
  if (tenant) o.tenant = tenant;
  return db.listObligations(o);
}
