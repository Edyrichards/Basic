import type { Db } from "../db.js";
import type { Obligation } from "../types.js";

/** Morning brief: what I owe whom, by when, grouped by tenant. Plus the review queue. Markdown. */
export function renderBrief(db: Db, now = new Date()): string {
  const today = now.toISOString().slice(0, 10);
  const weekOut = new Date(now.getTime() + 7 * 86400000).toISOString().slice(0, 10);
  const live = db.listObligations({ states: ["open", "aging", "renegotiated"] });
  const closePending = new Set(db.listProposals("pending").filter((p) => p.type === "close").map((p) => p.obligationId));
  const tenants = [...new Set(live.map((o) => o.tenant))].sort();
  const out: string[] = [`# Commitment brief for ${today}`, ""];
  if (!live.length) out.push("Nothing open. Either the ledger is empty or you are unusually caught up.", "");

  for (const t of tenants) {
    const rows = live.filter((o) => o.tenant === t);
    const overdue = rows.filter((o) => o.dueDate && o.dueDate < today);
    const thisWeek = rows.filter((o) => o.dueDate && o.dueDate >= today && o.dueDate <= weekOut);
    const later = rows.filter((o) => o.dueDate && o.dueDate > weekOut);
    const undated = rows.filter((o) => !o.dueDate);
    out.push(`## ${t}  (${rows.length} open)`);
    section(out, "Overdue", overdue, today, closePending);
    section(out, "Due this week", thisWeek, today, closePending);
    section(out, "Later", later, today, closePending);
    section(out, "No deadline stated", undated, today, closePending);
    out.push("");
  }

  const pending = db.listProposals("pending");
  const closes = pending.filter((p) => p.type === "close");
  const nudges = pending.filter((p) => p.type === "nudge");
  const unreviewed = live.filter((o) => !o.reviewed);
  if (closes.length || nudges.length || unreviewed.length) {
    out.push("## Review queue");
    if (closes.length) {
      out.push(`### Proposed closes (${closes.length}) — accept with \`ledger review accept <id>\``);
      for (const p of closes) {
        const o = db.getObligation(p.obligationId);
        out.push(`- ${p.id}: close **${o?.summary ?? p.obligationId}** (${o?.tenant}) — evidence: "${p.body}"`);
      }
    }
    if (unreviewed.length) {
      out.push(`### New, not yet confirmed by you (${unreviewed.length}) — \`ledger review ok <id>\` or \`ledger review reject <id>\``);
      for (const o of unreviewed) out.push(`- ${o.id}: ${fmt(o)}`);
    }
    if (nudges.length) {
      out.push(`### Drafted nudges (${nudges.length}) — nothing has been sent`);
      for (const p of nudges) out.push(`- ${p.id}: ${p.body}`);
    }
    out.push("");
  }
  return out.join("\n");
}

function section(out: string[], title: string, rows: Obligation[], today: string, closePending: Set<string>): void {
  if (!rows.length) return;
  out.push(`### ${title}`);
  for (const o of rows) out.push(`- ${o.id}: ${fmt(o, today)}${closePending.has(o.id) ? " · **close proposed, confirm in review queue**" : ""}`);
}

function fmt(o: Obligation, today?: string): string {
  const arrow = o.direction === "outbound" ? `you → ${o.counterparty}` : `${o.counterparty} → you`;
  const due = o.dueDate ? ` · due ${o.dueDate}${today && o.dueDate < today ? " (overdue)" : ""}` : "";
  const cond = o.conditional ? ` · if: ${o.conditional}` : "";
  const flag = o.reviewed ? "" : " · unconfirmed";
  return `${o.summary} [${arrow}]${due}${cond}${flag}`;
}
