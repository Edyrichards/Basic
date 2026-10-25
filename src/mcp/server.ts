import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Db } from "../db.js";
import { getConfig } from "../config.js";
import { renderBrief } from "../brief/index.js";
import { acceptProposal, completeObligation, deleteObligation, dropObligation, markReviewed, rejectProposal, renegotiate } from "../ledger/review.js";
import { reconcile } from "../reconcile/index.js";

/**
 * Read-mostly MCP server over the ledger so Claude, Cowork or any MCP client can answer
 * "what do I owe whom" and let the user act on proposals. It never calls the model itself and
 * never sends anything to Slack or email.
 */
export function buildServer(db: Db): McpServer {
  const server = new McpServer({ name: "commitment-ledger", version: "0.1.0" });
  const text = (s: string) => ({ content: [{ type: "text" as const, text: s }] });

  server.registerTool("get_brief", { description: "Morning brief: open obligations grouped by tenant, overdue first, plus the review queue. Markdown.", inputSchema: {} }, async () => text(renderBrief(db)));

  server.registerTool("list_obligations", {
    description: "List obligations. Default: live rows (open, aging, renegotiated).",
    inputSchema: { tenant: z.string().optional(), include_closed: z.boolean().optional(), direction: z.enum(["outbound", "inbound"]).optional() },
  }, async ({ tenant, include_closed, direction }) => {
    const q: Parameters<Db["listObligations"]>[0] = {};
    if (tenant) q.tenant = tenant;
    if (!include_closed) q.states = ["open", "aging", "renegotiated"];
    const rows = db.listObligations(q).filter((o) => !direction || o.direction === direction);
    return text(JSON.stringify(rows, null, 2));
  });

  server.registerTool("search_obligations", { description: "Substring search over summary and counterparty.", inputSchema: { query: z.string(), tenant: z.string().optional() } },
    async ({ query, tenant }) => { const q: Parameters<Db["listObligations"]>[0] = { search: query }; if (tenant) q.tenant = tenant; return text(JSON.stringify(db.listObligations(q), null, 2)); });

  server.registerTool("get_obligation", { description: "One obligation with its evidence trail and source message excerpts.", inputSchema: { id: z.string() } },
    async ({ id }) => {
      const o = db.getObligation(id);
      if (!o) return text(`No obligation ${id}`);
      const evidence = db.listEvidence(id).map((e) => ({ ...e, message_excerpt: db.getMessage(e.messageId)?.text.slice(0, 400) ?? null }));
      return text(JSON.stringify({ ...o, evidence }, null, 2));
    });

  server.registerTool("list_proposals", { description: "Pending proposals: model-proposed closes (need your accept) and drafted nudges (never sent).", inputSchema: {} },
    async () => text(JSON.stringify(db.listProposals("pending").map((p) => ({ ...p, obligation: db.getObligation(p.obligationId)?.summary ?? null })), null, 2)));

  server.registerTool("update_obligation", {
    description: "User action on an obligation. action: confirm (it is real), reject (not an obligation), done, drop, due (set new due_date YYYY-MM-DD).",
    inputSchema: { id: z.string(), action: z.enum(["confirm", "reject", "done", "drop", "due"]), due_date: z.string().optional(), reason: z.string().optional() },
  }, async ({ id, action, due_date, reason }) => {
    if (!db.getObligation(id)) return text(`No obligation ${id}`);
    switch (action) {
      case "confirm": markReviewed(db, id); break;
      case "reject": deleteObligation(db, id); break;
      case "done": completeObligation(db, id, reason ?? "marked done by user"); break;
      case "drop": dropObligation(db, id, reason ?? "dropped by user"); break;
      case "due": if (!due_date) return text("due_date required"); renegotiate(db, id, due_date); break;
    }
    return text(JSON.stringify(db.getObligation(id), null, 2));
  });

  server.registerTool("resolve_proposal", { description: "Accept or reject a proposal by id. Accepting a close marks the obligation done.", inputSchema: { id: z.string(), decision: z.enum(["accept", "reject"]) } },
    async ({ id, decision }) => text(JSON.stringify(decision === "accept" ? acceptProposal(db, id) : rejectProposal(db, id), null, 2)));

  server.registerTool("run_reconcile", { description: "Age overdue rows and draft nudges. Deterministic, no model call.", inputSchema: {} },
    async () => text(JSON.stringify(reconcile(db))));

  return server;
}

async function main(): Promise<void> {
  const cfg = getConfig();
  const db = new Db(process.env.LEDGER_DB ?? cfg.dbPath);
  const server = buildServer(db);
  await server.connect(new StdioServerTransport());
}

if (process.argv[1] && /server\.(ts|js)$/.test(process.argv[1])) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
