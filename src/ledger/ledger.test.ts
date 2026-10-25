import { describe, expect, it } from "vitest";
import { Db } from "../db.js";
import { applyExtraction, similarity } from "./apply.js";
import { acceptProposal, rejectProposal, dropObligation } from "./review.js";
import { reconcile } from "../reconcile/index.js";
import { renderBrief } from "../brief/index.js";
import type { ExtractionInput } from "../extract/prompt.js";
import type { Message, Thread } from "../types.js";

const m = (i: number, text: string, ts = `2026-10-0${i + 1}T10:00:00Z`): Message => ({ id: `slack:acme:c:${i}`, source: "slack", tenant: "acme", threadId: "th", channel: "c", ts, authorId: null, authorName: "Priya", text, participants: [], meta: {} });
const thread = (...texts: string[]): Thread => ({ key: "acme|slack|th", tenant: "acme", source: "slack", threadId: "th", channel: "c", messages: texts.map((t, i) => m(i, t)) });
const input = (t: Thread, db: Db, candidates: ExtractionInput["candidates"] = []): ExtractionInput => ({ thread: t, candidates, existing: db.listObligations({ tenant: "acme", states: ["open", "aging", "renegotiated"] }), meNames: ["Edy"], meSlackId: "U_ME" });

describe("similarity", () => {
  it("is high for restatements and low for different items", () => {
    expect(similarity("Send Q4 pricing deck to Priya", "Send the Q4 pricing deck to Priya by Friday")).toBeGreaterThan(0.6);
    expect(similarity("Send Q4 pricing deck to Priya", "Review Tom's PR on margin model")).toBeLessThan(0.2);
  });
});

describe("applyExtraction", () => {
  it("inserts new obligations with evidence and resolved due date; drops low confidence; merges duplicates", () => {
    const db = new Db(":memory:");
    const t = thread("Can you send the deck by Thursday?", "Yes, Thursday.");
    const cands = [{ id: "d1", messageIndex: 0, text: "Thursday", date: "2026-10-08", certainDay: true }];
    const s1 = applyExtraction(db, input(t, db, cands), { new_obligations: [
      { direction: "outbound", counterparty: "Priya", summary: "Send Q4 deck to Priya", source_message_index: 1, evidence_quote: "Yes, Thursday.", due_candidate_id: "d1", conditional: null, confidence: 0.9 },
      { direction: "inbound", counterparty: "Priya", summary: "Something vague", source_message_index: 0, evidence_quote: "x", due_candidate_id: null, conditional: null, confidence: 0.2 },
      { direction: "outbound", counterparty: "Priya", summary: "Bad index", source_message_index: 9, evidence_quote: "x", due_candidate_id: null, conditional: null, confidence: 0.9 },
    ], updates: [], closes: [], notes: null });
    expect(s1).toMatchObject({ inserted: 1, lowConfidenceDropped: 1, invalidRefs: 1 });
    const [o] = db.listObligations({});
    expect(o!.dueDate).toBe("2026-10-08");
    expect(o!.reviewed).toBe(false);
    expect(db.listEvidence(o!.id)).toHaveLength(1);
    // Restatement in another thread merges rather than duplicating.
    const t2 = { ...thread("Reminder: deck Thursday"), key: "acme|slack|th2", threadId: "th2" };
    const s2 = applyExtraction(db, input(t2, db), { new_obligations: [{ direction: "outbound", counterparty: "Priya", summary: "Send the Q4 deck to Priya", source_message_index: 0, evidence_quote: "deck Thursday", due_candidate_id: null, conditional: null, confidence: 0.8 }], updates: [], closes: [], notes: null });
    expect(s2.duplicatesMerged).toBe(1);
    expect(db.listObligations({})).toHaveLength(1);
    expect(db.listEvidence(o!.id)).toHaveLength(2);
  });

  it("applies renegotiation and drop updates; closes become proposals, never direct state changes", () => {
    const db = new Db(":memory:");
    const t = thread("deck by Thursday?", "yes");
    applyExtraction(db, input(t, db, [{ id: "d1", messageIndex: 0, text: "Thursday", date: "2026-10-08", certainDay: true }]), { new_obligations: [{ direction: "outbound", counterparty: "Priya", summary: "Send deck", source_message_index: 1, evidence_quote: "yes", due_candidate_id: "d1", conditional: null, confidence: 0.9 }], updates: [], closes: [], notes: null });
    const o = db.listObligations({})[0]!;
    const t2 = { ...thread("can I make that Friday?", "fine"), key: "k2" };
    applyExtraction(db, input(t2, db, [{ id: "d1", messageIndex: 0, text: "Friday", date: "2026-10-09", certainDay: true }]), { new_obligations: [], updates: [{ obligation_id: o.id, change: "renegotiated_due", due_candidate_id: "d1", new_summary: null, source_message_index: 0, evidence_quote: "make that Friday" }], closes: [], notes: null });
    expect(db.getObligation(o.id)).toMatchObject({ dueDate: "2026-10-09", state: "renegotiated" });
    const t3 = { ...thread("deck is in the drive"), key: "k3" };
    const s = applyExtraction(db, input(t3, db), { new_obligations: [], updates: [], closes: [{ obligation_id: o.id, source_message_index: 0, evidence_quote: "deck is in the drive", confidence: 0.95 }], notes: null });
    expect(s.closesProposed).toBe(1);
    expect(db.getObligation(o.id)!.state).toBe("renegotiated"); // not done yet
    const [p] = db.listProposals("pending");
    acceptProposal(db, p!.id);
    expect(db.getObligation(o.id)!.state).toBe("done");
    // duplicate close proposals are suppressed; wrong tenant refs are rejected
    const s2 = applyExtraction(db, input(t3, db), { new_obligations: [], updates: [], closes: [{ obligation_id: o.id, source_message_index: 0, evidence_quote: "x", confidence: 1 }, { obligation_id: "nope", source_message_index: 0, evidence_quote: "x", confidence: 1 }], notes: null });
    expect(s2).toMatchObject({ closesProposed: 0, invalidRefs: 1 });
  });
});

describe("reconcile + brief + review", () => {
  it("ages overdue rows, drafts one nudge each, and renders a brief grouped by tenant", () => {
    const db = new Db(":memory:");
    const t = thread("x", "y");
    applyExtraction(db, input(t, db, [{ id: "d1", messageIndex: 0, text: "Thursday", date: "2026-10-08", certainDay: true }]), { new_obligations: [
      { direction: "outbound", counterparty: "Priya", summary: "Send deck", source_message_index: 1, evidence_quote: "y", due_candidate_id: "d1", conditional: null, confidence: 0.9 },
      { direction: "inbound", counterparty: "Tom", summary: "Review PR", source_message_index: 0, evidence_quote: "x", due_candidate_id: null, conditional: "if legal signs off", confidence: 0.9 },
    ], updates: [], closes: [], notes: null });
    const r1 = reconcile(db, new Date("2026-10-10T08:00:00Z"));
    expect(r1).toEqual({ aged: 1, nudgesDrafted: 1 });
    expect(reconcile(db, new Date("2026-10-11T08:00:00Z"))).toEqual({ aged: 0, nudgesDrafted: 0 }); // idempotent
    const brief = renderBrief(db, new Date("2026-10-10T08:00:00Z"));
    expect(brief).toContain("## acme  (2 open)");
    expect(brief).toContain("### Overdue");
    expect(brief).toContain("Send deck [you → Priya] · due 2026-10-08 (overdue) · unconfirmed");
    expect(brief).toContain("if: if legal signs off");
    expect(brief).toContain("Drafted nudges (1)");
    const nudge = db.listProposals("pending")[0]!;
    rejectProposal(db, nudge.id);
    expect(db.listProposals("pending")).toHaveLength(0);
    const inbound = db.listObligations({ search: "Review" })[0]!;
    dropObligation(db, inbound.id);
    expect(db.getObligation(inbound.id)!.state).toBe("dropped");
    expect(renderBrief(db, new Date("2026-10-10T08:00:00Z"))).toContain("(1 open)");
  });
});
