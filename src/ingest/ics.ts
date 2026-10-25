import { readFileSync } from "node:fs";
import type { Message } from "../types.js";

/**
 * Minimal iCalendar reader: VEVENT with UID, DTSTART, DTEND, SUMMARY, DESCRIPTION, ATTENDEE, ORGANIZER.
 * Handles line unfolding, text unescaping, UTC (Z), floating, TZID (treated as UTC offset-less, see note) and all-day dates.
 * Recurrence rules are not expanded; the first instance is kept. Good enough for export files.
 */
interface VEvent { uid: string; start: string; end: string | null; summary: string; description: string; attendees: string[]; organizer: string | null; allDay: boolean }

export function parseIcs(text: string): VEvent[] {
  const lines = unfold(text);
  const events: VEvent[] = [];
  let cur: Partial<VEvent> & { attendees: string[] } | null = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") { cur = { attendees: [] }; continue; }
    if (line === "END:VEVENT") {
      if (cur?.uid && cur.start) {
        events.push({ uid: cur.uid, start: cur.start, end: cur.end ?? null, summary: cur.summary ?? "", description: cur.description ?? "", attendees: cur.attendees, organizer: cur.organizer ?? null, allDay: cur.allDay ?? false });
      }
      cur = null; continue;
    }
    if (!cur) continue;
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const head = line.slice(0, colon); const value = line.slice(colon + 1);
    const [name, ...paramParts] = head.split(";");
    const params = Object.fromEntries(paramParts.map((p) => { const i = p.indexOf("="); return [p.slice(0, i).toUpperCase(), p.slice(i + 1)]; }));
    switch ((name ?? "").toUpperCase()) {
      case "UID": cur.uid = value; break;
      case "SUMMARY": cur.summary = unescapeText(value); break;
      case "DESCRIPTION": cur.description = unescapeText(value); break;
      case "DTSTART": { const d = parseIcsDate(value); cur.start = d.iso; cur.allDay = d.allDay; break; }
      case "DTEND": cur.end = parseIcsDate(value).iso; break;
      case "ATTENDEE": cur.attendees.push(params.CN ?? value.replace(/^mailto:/i, "")); break;
      case "ORGANIZER": cur.organizer = params.CN ?? value.replace(/^mailto:/i, ""); break;
    }
  }
  return events;
}

function unfold(text: string): string[] {
  const raw = text.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  for (const l of raw) {
    if ((l.startsWith(" ") || l.startsWith("\t")) && out.length) out[out.length - 1] += l.slice(1);
    else out.push(l);
  }
  return out;
}

function unescapeText(v: string): string {
  return v.replace(/\\n/gi, "\n").replace(/\\,/g, ",").replace(/\;/g, ";").replace(/\\\\/g, "\\");
}

export function parseIcsDate(v: string): { iso: string; allDay: boolean } {
  const m = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/.exec(v.trim());
  if (!m) throw new Error(`Unparseable ICS date: ${v}`);
  const [, y, mo, d, h, mi, s, z] = m;
  if (!h) return { iso: `${y}-${mo}-${d}T00:00:00.000Z`, allDay: true };
  // Floating / TZID times are treated as UTC. Acceptable for a prototype; flagged in README.
  void z;
  return { iso: `${y}-${mo}-${d}T${h}:${mi}:${s}.000Z`, allDay: false };
}

export function readIcsFile(path: string, tenant: string, calendarName = "calendar"): Message[] {
  const events = parseIcs(readFileSync(path, "utf8"));
  return events.map((e) => {
    const people = [...new Set([e.organizer, ...e.attendees].filter((x): x is string => !!x))];
    const text = [`Meeting: ${e.summary}`, e.end ? `When: ${e.start} to ${e.end}` : `When: ${e.start}`, people.length ? `Attendees: ${people.join(", ")}` : null, e.description ? `Description:\n${e.description}` : null].filter(Boolean).join("\n");
    return {
      id: `calendar:${tenant}:${e.uid}`, source: "calendar" as const, tenant, threadId: e.uid, channel: calendarName,
      ts: e.start, authorId: null, authorName: e.organizer, text, participants: people,
      meta: { summary: e.summary, start: e.start, end: e.end, allDay: e.allDay },
    };
  }).sort((a, b) => a.ts.localeCompare(b.ts));
}
