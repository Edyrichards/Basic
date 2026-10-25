#!/usr/bin/env node
import { Command } from "commander";
import { writeFileSync } from "node:fs";
import { Db } from "./db.js";
import { getConfig } from "./config.js";
import { readIcsFile, readNotesDir, readSlackExport } from "./ingest/index.js";
import { ClaudeExtractor, NullExtractor } from "./extract/claude.js";
import { runExtraction } from "./extract/index.js";
import { reconcile } from "./reconcile/index.js";
import { renderBrief } from "./brief/index.js";
import { acceptProposal, completeObligation, deleteObligation, dropObligation, markReviewed, rejectProposal, renegotiate } from "./ledger/review.js";

const program = new Command();
program.name("ledger").description("Commitment ledger prototype").version("0.1.0")
  .option("--db <path>", "SQLite path (default from LEDGER_DB)");

function openDb(): Db {
  const cfg = getConfig();
  const opts = program.opts<{ db?: string }>();
  return new Db(opts.db ?? cfg.dbPath);
}

const ingest = program.command("ingest").description("Load exports into the message store (idempotent)");
ingest.command("slack <dir>").requiredOption("--tenant <name>", "client/company this workspace belongs to")
  .action((dir: string, o: { tenant: string }) => {
    const db = openDb();
    const n = db.upsertMessages(readSlackExport(dir, o.tenant));
    console.log(`slack: ${n} messages for tenant ${o.tenant} (store now ${db.countMessages()})`);
  });
ingest.command("ics <file>").requiredOption("--tenant <name>").option("--name <calendar>", "calendar label", "calendar")
  .action((file: string, o: { tenant: string; name: string }) => {
    const db = openDb();
    const n = db.upsertMessages(readIcsFile(file, o.tenant, o.name));
    console.log(`calendar: ${n} events for tenant ${o.tenant}`);
  });
ingest.command("notes <dir>").requiredOption("--tenant <name>", "default tenant; a note's frontmatter can override")
  .action((dir: string, o: { tenant: string }) => {
    const db = openDb();
    const n = db.upsertMessages(readNotesDir(dir, o.tenant));
    console.log(`notes: ${n} documents`);
  });

program.command("extract").description("Run the model over new or changed threads and update the ledger")
  .option("--tenant <name>").option("--since <iso>").option("--limit <n>", "", parseInt).option("--force", "re-extract unchanged threads")
  .option("--dry-run", "walk threads without calling the model").option("--model <id>", "override LEDGER_MODEL")
  .option("--effort <level>", "low|medium|high|xhigh|max")
  .action(async (o: { tenant?: string; since?: string; limit?: number; force?: boolean; dryRun?: boolean; model?: string; effort?: "low" | "medium" | "high" | "xhigh" | "max" }) => {
    const cfg = getConfig();
    const db = openDb();
    const extractor = o.dryRun ? new NullExtractor() : new ClaudeExtractor({ model: o.model ?? cfg.model, ...(o.effort ? { effort: o.effort } : {}) });
    const runOpts: Parameters<typeof runExtraction>[3] = { onThread: (t, i, n) => process.stderr.write(`[${i + 1}/${n}] ${t.key} (${t.messages.length} msgs)\n`) };
    if (o.tenant) runOpts.tenant = o.tenant;
    if (o.since) runOpts.since = o.since;
    if (o.limit) runOpts.limit = o.limit;
    if (o.force) runOpts.force = true;
    const s = await runExtraction(db, extractor, cfg, runOpts);
    console.log(JSON.stringify({ model: extractor.name, ...s, usage: db.usageTotals() }, null, 2));
  });

program.command("reconcile").description("Nightly: age overdue rows, draft nudges (no extraction; run `extract` first)")
  .action(() => {
    const db = openDb();
    console.log(JSON.stringify(reconcile(db), null, 2));
  });

program.command("brief").description("Print the morning brief").option("--out <file>", "also write to a file")
  .action((o: { out?: string }) => {
    const db = openDb();
    const md = renderBrief(db);
    if (o.out) writeFileSync(o.out, md);
    console.log(md);
  });

program.command("list").description("List obligations").option("--tenant <name>").option("--all", "include done/dropped").option("--search <text>")
  .action((o: { tenant?: string; all?: boolean; search?: string }) => {
    const db = openDb();
    const q: Parameters<Db["listObligations"]>[0] = {};
    if (o.tenant) q.tenant = o.tenant;
    if (!o.all) q.states = ["open", "aging", "renegotiated"];
    if (o.search) q.search = o.search;
    for (const ob of db.listObligations(q)) {
      console.log(`${ob.id}  ${ob.state.padEnd(12)} ${ob.tenant.padEnd(10)} ${ob.direction === "outbound" ? "→" : "←"} ${ob.counterparty.padEnd(14)} ${(ob.dueDate ?? "-").padEnd(10)} ${ob.summary}${ob.reviewed ? "" : "  [unconfirmed]"}`);
    }
  });

program.command("show <id>").description("Show one obligation with evidence")
  .action((id: string) => {
    const db = openDb();
    const o = db.getObligation(id);
    if (!o) { console.error("not found"); process.exit(1); }
    console.log(JSON.stringify({ ...o, evidence: db.listEvidence(id).map((e) => ({ ...e, message: db.getMessage(e.messageId)?.text.slice(0, 200) })) }, null, 2));
  });

const review = program.command("review").description("Act on proposals and unconfirmed rows. The only way rows become done.");
review.command("queue").description("List pending proposals").action(() => {
  const db = openDb();
  for (const p of db.listProposals("pending")) {
    const o = db.getObligation(p.obligationId);
    console.log(`${p.id}  ${p.type.padEnd(6)} ${o?.summary ?? p.obligationId}\n    ${p.body}`);
  }
});
review.command("accept <proposalId>").action((id: string) => { const db = openDb(); console.log(acceptProposal(db, id)); });
review.command("reject <proposalId>").action((id: string) => { const db = openDb(); console.log(rejectProposal(db, id)); });
review.command("ok <obligationId>").description("Confirm a model-proposed obligation is real").action((id: string) => { markReviewed(openDb(), id); console.log("confirmed"); });
review.command("not <obligationId>").description("This is not an obligation (false positive)").action((id: string) => { deleteObligation(openDb(), id); console.log("rejected"); });
review.command("done <obligationId>").action((id: string) => { completeObligation(openDb(), id); console.log("done"); });
review.command("drop <obligationId>").option("--reason <text>").action((id: string, o: { reason?: string }) => { dropObligation(openDb(), id, o.reason ?? "dropped by user"); console.log("dropped, no guilt attached"); });
review.command("due <obligationId> <yyyy-mm-dd>").action((id: string, d: string) => { renegotiate(openDb(), id, d); console.log("renegotiated"); });

program.parseAsync(process.argv).catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1); });
