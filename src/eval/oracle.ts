import type { Extractor } from "../extract/claude.js";
import type { ExtractionInput } from "../extract/prompt.js";
import type { Extraction } from "../extract/schema.js";
import { similarity } from "../ledger/apply.js";
import type { Labels } from "./generate_fixtures.js";

/**
 * Perfect extractor driven by the labels. Exists to prove the scorer and pipeline: an oracle run
 * must score 100% precision/recall, 0% wrong-date, 0% false-close. If it does not, the harness is broken.
 */
export class OracleExtractor implements Extractor {
  readonly name = "oracle";
  constructor(private readonly labels: Labels) {}
  async extract(input: ExtractionInput): Promise<{ result: Extraction; usage: null }> {
    const { thread, candidates, existing } = input;
    const result: Extraction = { new_obligations: [], updates: [], closes: [], notes: null };
    for (const l of this.labels.obligations.filter((x) => x.originThread === thread.key)) {
      // The oracle knows the FINAL due date; pick the candidate from this thread matching the ORIGINAL stated date if present, else final.
      const cand = candidates.find((c) => c.date === l.due) ?? null;
      result.new_obligations.push({ direction: l.direction, counterparty: l.counterparty, summary: l.summary, source_message_index: 0, evidence_quote: thread.messages[0]?.text.slice(0, 40) ?? "", due_candidate_id: cand?.id ?? null, conditional: null, confidence: 1 });
    }
    for (const l of this.labels.obligations.filter((x) => x.closedInThread === thread.key)) {
      const ex = existing.find((o) => similarity(o.summary, l.summary) >= 0.6);
      if (ex) result.closes.push({ obligation_id: ex.id, source_message_index: 0, evidence_quote: thread.messages[0]?.text.slice(0, 40) ?? "", confidence: 1 });
    }
    // Renegotiations: if a label's final due is a candidate in this thread but the obligation originated elsewhere and has a different due.
    for (const l of this.labels.obligations.filter((x) => x.originThread !== thread.key && x.due)) {
      const ex = existing.find((o) => similarity(o.summary, l.summary) >= 0.6 && o.dueDate !== l.due);
      const cand = candidates.find((c) => c.date === l.due);
      if (ex && cand && /instead|rather|make that|not the|moved|any chance|can i make/i.test(thread.messages.map((m) => m.text).join(" "))) {
        result.updates.push({ obligation_id: ex.id, change: "renegotiated_due", due_candidate_id: cand.id, new_summary: null, source_message_index: 0, evidence_quote: thread.messages[0]?.text.slice(0, 40) ?? "" });
      }
    }
    return { result, usage: null };
  }
}
