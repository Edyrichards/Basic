import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Message } from "../types.js";

/**
 * Reads a standard Slack workspace export directory:
 *   users.json, channels.json, <channel>/<YYYY-MM-DD>.json
 * Thread grouping: messages with thread_ts share a thread; top-level messages without
 * replies are grouped per channel per day so the extractor sees context, not isolated lines.
 */
interface SlackUser { id: string; name?: string; real_name?: string; profile?: { real_name?: string; display_name?: string } }
interface SlackMsg { type?: string; subtype?: string; user?: string; text?: string; ts: string; thread_ts?: string; user_profile?: { real_name?: string; display_name?: string }; reply_users?: string[] }

export function readSlackExport(dir: string, tenant: string): Message[] {
  const users = new Map<string, string>();
  const usersPath = join(dir, "users.json");
  if (existsSync(usersPath)) {
    for (const u of JSON.parse(readFileSync(usersPath, "utf8")) as SlackUser[]) {
      users.set(u.id, u.profile?.display_name || u.profile?.real_name || u.real_name || u.name || u.id);
    }
  }
  const out: Message[] = [];
  for (const channel of readdirSync(dir)) {
    const cdir = join(dir, channel);
    if (!statSync(cdir).isDirectory()) continue;
    const files = readdirSync(cdir).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
    for (const f of files) {
      const day = f.replace(".json", "");
      const msgs = JSON.parse(readFileSync(join(cdir, f), "utf8")) as SlackMsg[];
      for (const m of msgs) {
        if (m.type && m.type !== "message") continue;
        if (m.subtype && !["thread_broadcast", "bot_message"].includes(m.subtype)) continue;
        const text = resolveMentions(m.text ?? "", users);
        if (!text.trim()) continue;
        const authorName = (m.user ? users.get(m.user) : undefined) ?? m.user_profile?.display_name ?? m.user_profile?.real_name ?? m.user ?? null;
        const threadId = m.thread_ts ?? `${channel}/${day}`;
        out.push({
          id: `slack:${tenant}:${channel}:${m.ts}`,
          source: "slack", tenant, threadId, channel,
          ts: new Date(parseFloat(m.ts) * 1000).toISOString(),
          authorId: m.user ?? null, authorName, text,
          participants: [], // filled below
          meta: { slackTs: m.ts, threadTs: m.thread_ts ?? null, day },
        });
      }
    }
  }
  // Participants per thread.
  const byThread = new Map<string, Set<string>>();
  for (const m of out) {
    const s = byThread.get(m.threadId) ?? new Set<string>();
    if (m.authorName) s.add(m.authorName);
    byThread.set(m.threadId, s);
  }
  for (const m of out) m.participants = [...(byThread.get(m.threadId) ?? [])];
  return out.sort((a, b) => a.ts.localeCompare(b.ts));
}

export function resolveMentions(text: string, users: Map<string, string>): string {
  return text
    .replace(/<@([A-Z0-9_]+)(?:\|[^>]*)?>/g, (_, id: string) => `@${users.get(id) ?? id}`)
    .replace(/<#[A-Z0-9]+\|([^>]+)>/g, "#$1")
    .replace(/<(https?:[^|>]+)\|([^>]+)>/g, "$2 ($1)")
    .replace(/<(https?:[^>]+)>/g, "$1")
    .replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
}
