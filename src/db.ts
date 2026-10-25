import { DatabaseSync } from "node:sqlite";
import type { Evidence, Message, Obligation, Proposal, Source, Thread, Usage } from "./types.js";

export class Db {
  readonly raw: DatabaseSync;

  constructor(path: string) {
    this.raw = new DatabaseSync(path);
    this.raw.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
    this.migrate();
  }

  private migrate(): void {
    this.raw.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY, source TEXT NOT NULL, tenant TEXT NOT NULL, thread_id TEXT NOT NULL,
        channel TEXT NOT NULL, ts TEXT NOT NULL, author_id TEXT, author_name TEXT, text TEXT NOT NULL,
        participants TEXT NOT NULL, meta TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(tenant, source, thread_id, ts);
      CREATE TABLE IF NOT EXISTS obligations (
        id TEXT PRIMARY KEY, tenant TEXT NOT NULL, direction TEXT NOT NULL, counterparty TEXT NOT NULL,
        summary TEXT NOT NULL, due_date TEXT, due_text TEXT, conditional TEXT, state TEXT NOT NULL,
        confidence REAL NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
        reviewed INTEGER NOT NULL DEFAULT 0, close_reason TEXT, origin_thread_id TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS evidence (
        obligation_id TEXT NOT NULL REFERENCES obligations(id), message_id TEXT NOT NULL,
        kind TEXT NOT NULL, quote TEXT NOT NULL, ts TEXT NOT NULL,
        PRIMARY KEY (obligation_id, message_id, kind)
      );
      CREATE TABLE IF NOT EXISTS proposals (
        id TEXT PRIMARY KEY, obligation_id TEXT NOT NULL REFERENCES obligations(id), type TEXT NOT NULL,
        body TEXT NOT NULL, evidence_message_id TEXT, created_at TEXT NOT NULL, status TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS extracted_threads (
        thread_key TEXT PRIMARY KEY, content_hash TEXT NOT NULL, extracted_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS usage_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, model TEXT NOT NULL, purpose TEXT NOT NULL,
        input_tokens INTEGER NOT NULL, output_tokens INTEGER NOT NULL,
        cache_read_tokens INTEGER NOT NULL, cache_write_tokens INTEGER NOT NULL
      );
    `);
  }

  // ---- messages ----
  upsertMessages(msgs: Message[]): number {
    const stmt = this.raw.prepare(`INSERT INTO messages (id, source, tenant, thread_id, channel, ts, author_id, author_name, text, participants, meta)
      VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET text=excluded.text, participants=excluded.participants, meta=excluded.meta`);
    let n = 0;
    this.raw.exec("BEGIN");
    try {
      for (const m of msgs) {
        stmt.run(m.id, m.source, m.tenant, m.threadId, m.channel, m.ts, m.authorId, m.authorName, m.text, JSON.stringify(m.participants), JSON.stringify(m.meta));
        n++;
      }
      this.raw.exec("COMMIT");
    } catch (e) {
      this.raw.exec("ROLLBACK");
      throw e;
    }
    return n;
  }

  listThreads(opts: { tenant?: string; source?: Source; since?: string } = {}): Thread[] {
    const where: string[] = [];
    const args: (string | number)[] = [];
    if (opts.tenant) { where.push("tenant = ?"); args.push(opts.tenant); }
    if (opts.source) { where.push("source = ?"); args.push(opts.source); }
    if (opts.since) { where.push("ts >= ?"); args.push(opts.since); }
    const sql = `SELECT * FROM messages ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY ts ASC`;
    const rows = this.raw.prepare(sql).all(...args) as Record<string, unknown>[];
    const map = new Map<string, Thread>();
    for (const r of rows) {
      const m = rowToMessage(r);
      const key = `${m.tenant}|${m.source}|${m.threadId}`;
      let t = map.get(key);
      if (!t) {
        t = { key, tenant: m.tenant, source: m.source, threadId: m.threadId, channel: m.channel, messages: [] };
        map.set(key, t);
      }
      t.messages.push(m);
    }
    // Order threads by their first message so extraction runs chronologically.
    return [...map.values()].sort((a, b) => (a.messages[0]?.ts ?? "").localeCompare(b.messages[0]?.ts ?? ""));
  }

  getMessage(id: string): Message | null {
    const r = this.raw.prepare("SELECT * FROM messages WHERE id = ?").get(id) as Record<string, unknown> | undefined;
    return r ? rowToMessage(r) : null;
  }

  countMessages(): number {
    return (this.raw.prepare("SELECT COUNT(*) c FROM messages").get() as { c: number }).c;
  }

  // ---- idempotency ----
  threadHash(key: string): string | null {
    const r = this.raw.prepare("SELECT content_hash FROM extracted_threads WHERE thread_key = ?").get(key) as { content_hash: string } | undefined;
    return r?.content_hash ?? null;
  }
  markExtracted(key: string, hash: string): void {
    this.raw.prepare(`INSERT INTO extracted_threads (thread_key, content_hash, extracted_at) VALUES (?,?,?)
      ON CONFLICT(thread_key) DO UPDATE SET content_hash=excluded.content_hash, extracted_at=excluded.extracted_at`).run(key, hash, new Date().toISOString());
  }

  // ---- obligations ----
  insertObligation(o: Obligation, evidence: Evidence[]): void {
    this.raw.prepare(`INSERT INTO obligations (id, tenant, direction, counterparty, summary, due_date, due_text, conditional, state, confidence, created_at, updated_at, reviewed, close_reason, origin_thread_id)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(o.id, o.tenant, o.direction, o.counterparty, o.summary, o.dueDate, o.dueText, o.conditional, o.state, o.confidence, o.createdAt, o.updatedAt, o.reviewed ? 1 : 0, o.closeReason, o.originThreadId);
    for (const e of evidence) this.addEvidence(o.id, e);
  }

  updateObligation(id: string, patch: Partial<Obligation>): void {
    const cols: string[] = [];
    const args: (string | number | null)[] = [];
    const map: Record<string, string> = { direction: "direction", counterparty: "counterparty", summary: "summary", dueDate: "due_date", dueText: "due_text", conditional: "conditional", state: "state", confidence: "confidence", closeReason: "close_reason" };
    for (const [k, col] of Object.entries(map)) {
      if (k in patch) { cols.push(`${col} = ?`); args.push((patch as Record<string, string | number | null>)[k] ?? null); }
    }
    if ("reviewed" in patch) { cols.push("reviewed = ?"); args.push(patch.reviewed ? 1 : 0); }
    cols.push("updated_at = ?"); args.push(new Date().toISOString());
    args.push(id);
    this.raw.prepare(`UPDATE obligations SET ${cols.join(", ")} WHERE id = ?`).run(...args);
  }

  addEvidence(obligationId: string, e: Evidence): void {
    this.raw.prepare(`INSERT OR IGNORE INTO evidence (obligation_id, message_id, kind, quote, ts) VALUES (?,?,?,?,?)`).run(obligationId, e.messageId, e.kind, e.quote, e.ts);
  }

  getObligation(id: string): Obligation | null {
    const r = this.raw.prepare("SELECT * FROM obligations WHERE id = ?").get(id) as Record<string, unknown> | undefined;
    return r ? rowToObligation(r) : null;
  }

  listObligations(opts: { tenant?: string; states?: string[]; search?: string } = {}): Obligation[] {
    const where: string[] = [];
    const args: string[] = [];
    if (opts.tenant) { where.push("tenant = ?"); args.push(opts.tenant); }
    if (opts.states?.length) { where.push(`state IN (${opts.states.map(() => "?").join(",")})`); args.push(...opts.states); }
    if (opts.search) { where.push("(summary LIKE ? OR counterparty LIKE ?)"); args.push(`%${opts.search}%`, `%${opts.search}%`); }
    const rows = this.raw.prepare(`SELECT * FROM obligations ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY COALESCE(due_date, '9999') ASC, created_at ASC`).all(...args) as Record<string, unknown>[];
    return rows.map(rowToObligation);
  }

  listEvidence(obligationId: string): Evidence[] {
    const rows = this.raw.prepare("SELECT * FROM evidence WHERE obligation_id = ? ORDER BY ts").all(obligationId) as Record<string, unknown>[];
    return rows.map((r) => ({ messageId: r.message_id as string, kind: r.kind as Evidence["kind"], quote: r.quote as string, ts: r.ts as string }));
  }

  // ---- proposals ----
  insertProposal(p: Proposal): void {
    this.raw.prepare(`INSERT INTO proposals (id, obligation_id, type, body, evidence_message_id, created_at, status) VALUES (?,?,?,?,?,?,?)`).run(p.id, p.obligationId, p.type, p.body, p.evidenceMessageId, p.createdAt, p.status);
  }
  listProposals(status?: Proposal["status"]): Proposal[] {
    const rows = (status
      ? this.raw.prepare("SELECT * FROM proposals WHERE status = ? ORDER BY created_at").all(status)
      : this.raw.prepare("SELECT * FROM proposals ORDER BY created_at").all()) as Record<string, unknown>[];
    return rows.map((r) => ({ id: r.id as string, obligationId: r.obligation_id as string, type: r.type as Proposal["type"], body: r.body as string, evidenceMessageId: (r.evidence_message_id as string | null) ?? null, createdAt: r.created_at as string, status: r.status as Proposal["status"] }));
  }
  hasPendingProposal(obligationId: string, type: Proposal["type"]): boolean {
    const r = this.raw.prepare("SELECT 1 x FROM proposals WHERE obligation_id = ? AND type = ? AND status = 'pending' LIMIT 1").get(obligationId, type);
    return !!r;
  }
  setProposalStatus(id: string, status: Proposal["status"]): Proposal | null {
    this.raw.prepare("UPDATE proposals SET status = ? WHERE id = ?").run(status, id);
    const r = this.raw.prepare("SELECT * FROM proposals WHERE id = ?").get(id) as Record<string, unknown> | undefined;
    return r ? { id: r.id as string, obligationId: r.obligation_id as string, type: r.type as Proposal["type"], body: r.body as string, evidenceMessageId: (r.evidence_message_id as string | null) ?? null, createdAt: r.created_at as string, status: r.status as Proposal["status"] } : null;
  }

  // ---- usage ----
  logUsage(purpose: string, u: Usage): void {
    this.raw.prepare(`INSERT INTO usage_log (at, model, purpose, input_tokens, output_tokens, cache_read_tokens, cache_write_tokens) VALUES (?,?,?,?,?,?,?)`).run(new Date().toISOString(), u.model, purpose, u.inputTokens, u.outputTokens, u.cacheReadTokens, u.cacheWriteTokens);
  }
  usageTotals(): Usage & { calls: number } {
    const r = this.raw.prepare(`SELECT COUNT(*) calls, COALESCE(MAX(model),'') model, COALESCE(SUM(input_tokens),0) i, COALESCE(SUM(output_tokens),0) o, COALESCE(SUM(cache_read_tokens),0) cr, COALESCE(SUM(cache_write_tokens),0) cw FROM usage_log`).get() as { calls: number; model: string; i: number; o: number; cr: number; cw: number };
    return { calls: r.calls, model: r.model, inputTokens: r.i, outputTokens: r.o, cacheReadTokens: r.cr, cacheWriteTokens: r.cw };
  }

  close(): void { this.raw.close(); }
}

function rowToMessage(r: Record<string, unknown>): Message {
  return {
    id: r.id as string, source: r.source as Source, tenant: r.tenant as string, threadId: r.thread_id as string,
    channel: r.channel as string, ts: r.ts as string, authorId: (r.author_id as string | null) ?? null,
    authorName: (r.author_name as string | null) ?? null, text: r.text as string,
    participants: JSON.parse(r.participants as string) as string[], meta: JSON.parse(r.meta as string) as Record<string, unknown>,
  };
}

function rowToObligation(r: Record<string, unknown>): Obligation {
  return {
    id: r.id as string, tenant: r.tenant as string, direction: r.direction as Obligation["direction"], counterparty: r.counterparty as string,
    summary: r.summary as string, dueDate: (r.due_date as string | null) ?? null, dueText: (r.due_text as string | null) ?? null,
    conditional: (r.conditional as string | null) ?? null, state: r.state as Obligation["state"], confidence: r.confidence as number,
    createdAt: r.created_at as string, updatedAt: r.updated_at as string, reviewed: (r.reviewed as number) === 1,
    closeReason: (r.close_reason as string | null) ?? null, originThreadId: r.origin_thread_id as string,
  };
}
