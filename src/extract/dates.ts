import * as chrono from "chrono-node";
import type { Message } from "../types.js";

/**
 * Deterministic date candidates. The model chooses among these (or none); it never writes a date.
 * All resolution is UTC for the prototype.
 */
export interface DateCandidate {
  id: string;
  messageIndex: number;
  text: string;
  /** YYYY-MM-DD */
  date: string;
  /** chrono reported the day as explicitly stated rather than implied */
  certainDay: boolean;
}

export function dateCandidates(messages: Message[]): DateCandidate[] {
  const out: DateCandidate[] = [];
  let n = 0;
  for (const [i, m] of messages.entries()) {
    const ref = new Date(m.ts);
    const seen = new Set<string>();
    const push = (text: string, d: Date, certainDay: boolean) => {
      const date = d.toISOString().slice(0, 10);
      const key = `${text.toLowerCase()}|${date}`;
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ id: `d${++n}`, messageIndex: i, text, date, certainDay });
    };
    for (const r of chrono.parse(m.text, ref, { forwardDate: true })) {
      // Skip pure time-of-day mentions with no date component ("at 3pm").
      const hasDate = r.start.isCertain("day") || r.start.isCertain("weekday") || r.start.isCertain("month") || /\b(today|tomorrow|tonight|week|month|mon|tue|wed|thu|fri|sat|sun)/i.test(r.text);
      if (!hasDate) continue;
      push(r.text, r.start.date(), r.start.isCertain("day") || r.start.isCertain("weekday"));
    }
    // Idioms chrono does not cover.
    // Bare ordinals: "by the 20th", "commit to the 13th" -> next occurrence of that day of month.
    for (const om of m.text.matchAll(/\b(?:the\s+)?(\d{1,2})(?:st|nd|rd|th)\b(?!\s+(?:of\s+)?(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*)/gi)) {
      const day = parseInt(om[1]!, 10);
      if (day < 1 || day > 31) continue;
      push(om[0], nextDayOfMonth(ref, day), true);
    }
    if (/\bnext week\b/i.test(m.text)) push("next week", endOfWeek(new Date(ref.getTime() + 7 * 86400000)), true);
    if (/\b(EOD|COB|end of (the )?day|by tonight)\b/i.test(m.text)) push("EOD", ref, true);
    if (/\b(EOW|end of (the )?week)\b/i.test(m.text)) push("EOW", endOfWeek(ref), true);
    if (/\b(EOM|end of (the )?month)\b/i.test(m.text)) push("EOM", endOfMonth(ref), true);
  }
  return out;
}

function nextDayOfMonth(ref: Date, day: number): Date {
  const y = ref.getUTCFullYear(), mo = ref.getUTCMonth();
  const thisMonth = new Date(Date.UTC(y, mo, Math.min(day, new Date(Date.UTC(y, mo + 1, 0)).getUTCDate())));
  if (thisMonth.getUTCDate() === day && thisMonth.toISOString().slice(0, 10) >= ref.toISOString().slice(0, 10)) return thisMonth;
  return new Date(Date.UTC(y, mo + 1, Math.min(day, new Date(Date.UTC(y, mo + 2, 0)).getUTCDate())));
}

function endOfWeek(d: Date): Date {
  const x = new Date(d);
  const dow = x.getUTCDay(); // 0 Sun .. 6 Sat
  const toFri = dow <= 5 ? 5 - dow : 6; // Sat -> next Fri
  x.setUTCDate(x.getUTCDate() + toFri);
  return x;
}
function endOfMonth(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0));
}
