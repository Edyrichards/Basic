import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { AS_OF, EVENTS, ME, NOTES, PEOPLE, THREADS, type FixtureLabel } from "./fixture_data.js";

/**
 * Writes fixtures/synthetic/<tenant>/{slack/,calendar.ics,notes/} and fixtures/synthetic/labels.json
 * in the exact formats the ingest readers expect. Deterministic.
 */
export interface Labels {
  me: typeof ME;
  asOf: string;
  obligations: FixtureLabel[];
  negativeThreads: string[];
  injectionThreads: string[];
  counts: { slackThreads: number; notes: number; events: number; labels: number };
}

export function generateFixtures(outDir: string): Labels {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const labels: FixtureLabel[] = [];
  const negativeThreads: string[] = [];
  const injectionThreads: string[] = [];
  const closes = new Map<string, string>(); // label id -> thread key

  // ---- Slack ----
  const byTenantChannelDay = new Map<string, Map<string, Map<string, object[]>>>();
  for (const t of THREADS) {
    const people = PEOPLE[t.tenant]!;
    const rootTs = toSlackTs(new Date(t.start));
    const key = `${t.tenant}|slack|${rootTs}`;
    const day = t.start.slice(0, 10);
    const msgs: object[] = t.msgs.map(([who, text], i) => {
      const u = people[who]!;
      const ts = toSlackTs(new Date(new Date(t.start).getTime() + i * 7 * 60_000 + i * 13_000));
      const m: Record<string, unknown> = { type: "message", user: u.id, text, ts, user_profile: { real_name: u.name, display_name: u.name.split(" ")[0] } };
      if (i === 0) { m.reply_count = t.msgs.length - 1; if (t.msgs.length > 1) m.thread_ts = rootTs; }
      else m.thread_ts = rootTs;
      return m;
    });
    const chans = byTenantChannelDay.get(t.tenant) ?? new Map();
    const days = chans.get(t.channel) ?? new Map();
    days.set(day, [...(days.get(day) ?? []), ...msgs]);
    chans.set(t.channel, days);
    byTenantChannelDay.set(t.tenant, chans);
    for (const l of t.labels) labels.push({ ...l, tenant: t.tenant, originThread: key, closedInThread: null });
    for (const id of t.closes ?? []) closes.set(id, key);
    if (t.negative) negativeThreads.push(key);
    if (t.injection) injectionThreads.push(key);
  }
  for (const [tenant, chans] of byTenantChannelDay) {
    const sdir = join(outDir, tenant, "slack");
    mkdirSync(sdir, { recursive: true });
    writeFileSync(join(sdir, "users.json"), JSON.stringify(Object.values(PEOPLE[tenant]!).map((p) => ({ id: p.id, name: p.name.toLowerCase().replace(" ", "."), real_name: p.name, profile: { real_name: p.name, display_name: p.name.split(" ")[0] } })), null, 2));
    writeFileSync(join(sdir, "channels.json"), JSON.stringify([...chans.keys()].map((c) => ({ name: c })), null, 2));
    for (const [channel, days] of chans) {
      mkdirSync(join(sdir, channel), { recursive: true });
      for (const [day, msgs] of days) writeFileSync(join(sdir, channel, `${day}.json`), JSON.stringify(msgs, null, 2));
    }
  }

  // ---- Notes ----
  for (const n of NOTES) {
    const ndir = join(outDir, n.tenant, "notes");
    mkdirSync(ndir, { recursive: true });
    writeFileSync(join(ndir, n.file), `---\ndate: ${n.date}\ntenant: ${n.tenant}\ntitle: ${n.title}\nattendees: ${n.attendees.join(", ")}\n---\n${n.body}\n`);
    const key = `${n.tenant}|notes|${n.file}`;
    for (const l of n.labels) labels.push({ ...l, tenant: n.tenant, originThread: key, closedInThread: null });
    for (const id of n.closes ?? []) closes.set(id, key);
    if (n.negative) negativeThreads.push(key);
  }

  // ---- Calendar ----
  const byTenant = new Map<string, string[]>();
  for (const e of EVENTS) {
    const lines = ["BEGIN:VEVENT", `UID:${e.uid}`, `DTSTART:${e.start}`, `DTEND:${e.end}`, `SUMMARY:${esc(e.summary)}`, e.description ? `DESCRIPTION:${esc(e.description)}` : null, ...e.attendees.map((a) => `ATTENDEE;CN=${a}:mailto:${a.toLowerCase().replace(/ /g, ".")}@example.com`), "END:VEVENT"].filter((x): x is string => !!x);
    byTenant.set(e.tenant, [...(byTenant.get(e.tenant) ?? []), ...lines]);
    const key = `${e.tenant}|calendar|${e.uid}`;
    for (const l of e.labels) labels.push({ ...l, tenant: e.tenant, originThread: key, closedInThread: null });
    for (const id of e.closes ?? []) closes.set(id, key);
    if (e.negative) negativeThreads.push(key);
  }
  for (const [tenant, lines] of byTenant) {
    mkdirSync(join(outDir, tenant), { recursive: true });
    writeFileSync(join(outDir, tenant, "calendar.ics"), ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//commitment-ledger fixtures//EN", ...lines, "END:VCALENDAR"].join("\r\n") + "\r\n");
  }

  for (const l of labels) l.closedInThread = closes.get(l.id) ?? null;
  const out: Labels = { me: ME, asOf: AS_OF, obligations: labels, negativeThreads, injectionThreads, counts: { slackThreads: THREADS.length, notes: NOTES.length, events: EVENTS.length, labels: labels.length } };
  writeFileSync(join(outDir, "labels.json"), JSON.stringify(out, null, 2));
  return out;
}

function toSlackTs(d: Date): string { return `${Math.floor(d.getTime() / 1000)}.000100`; }
function esc(s: string): string { return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\;"); }

if (process.argv[1] && /generate_fixtures\.(ts|js)$/.test(process.argv[1])) {
  const out = process.argv[2] ?? "fixtures/synthetic";
  const l = generateFixtures(out);
  console.log(`wrote ${out}: ${JSON.stringify(l.counts)}, ${l.negativeThreads.length} negative threads, ${l.injectionThreads.length} injection threads`);
}
