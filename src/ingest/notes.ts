import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import type { Message } from "../types.js";

/**
 * Meeting notes folder: .md or .txt files. Date comes from YAML-ish frontmatter (`date:`) or a
 * YYYY-MM-DD filename prefix. Optional frontmatter: `tenant:`, `attendees:` (comma list), `title:`.
 * The --tenant flag on ingest wins unless the file states its own tenant.
 */
export function readNotesDir(dir: string, defaultTenant: string): Message[] {
  const out: Message[] = [];
  for (const f of readdirSync(dir).sort()) {
    const p = join(dir, f);
    if (!statSync(p).isFile() || !/\.(md|txt)$/i.test(f)) continue;
    const raw = readFileSync(p, "utf8");
    const { front, body } = splitFrontmatter(raw);
    const fromName = /^(\d{4}-\d{2}-\d{2})/.exec(f)?.[1];
    const dateStr = front.date ?? fromName;
    if (!dateStr) continue;
    const ts = /T/.test(dateStr) ? new Date(dateStr).toISOString() : `${dateStr}T09:00:00.000Z`;
    const tenant = front.tenant ?? defaultTenant;
    const attendees = (front.attendees ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    const title = front.title ?? basename(f).replace(/\.(md|txt)$/i, "");
    out.push({
      id: `notes:${tenant}:${f}`, source: "notes", tenant, threadId: f, channel: "notes", ts,
      authorId: null, authorName: null, text: `Meeting notes: ${title}\n\n${body.trim()}`, participants: attendees,
      meta: { file: f, title },
    });
  }
  return out.sort((a, b) => a.ts.localeCompare(b.ts));
}

export function splitFrontmatter(raw: string): { front: Record<string, string>; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!m) return { front: {}, body: raw };
  const front: Record<string, string> = {};
  for (const line of (m[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) front[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
  }
  return { front, body: raw.slice(m[0].length) };
}
