import { describe, expect, it } from "vitest";
import { dateCandidates } from "./dates.js";
import type { Message } from "../types.js";

const msg = (text: string, ts = "2026-10-06T08:12:00Z"): Message => ({ id: "m", source: "slack", tenant: "t", threadId: "x", channel: "c", ts, authorId: null, authorName: null, text, participants: [], meta: {} });

describe("date candidates", () => {
  it("resolves weekday names forward from the message date", () => {
    const c = dateCandidates([msg("Can you get it to me by Thursday?")]); // Tue Oct 6 -> Thu Oct 8
    expect(c.map((x) => x.date)).toContain("2026-10-08");
  });
  it("handles EOD, EOW, 'by the 20th', 'next week'", () => {
    const c = dateCandidates([msg("Draft by the 20th please. Or EOD. Or EOW. Or next week.", "2026-10-12T09:20:00Z")]);
    const dates = c.map((x) => x.date);
    expect(dates).toContain("2026-10-20");
    expect(dates).toContain("2026-10-12"); // EOD
    expect(dates).toContain("2026-10-16"); // EOW: Mon -> Fri
    expect(c.some((x) => /next week/i.test(x.text))).toBe(true);
  });
  it("ignores pure times and gives sequential ids per thread", () => {
    const c = dateCandidates([msg("meet at 3pm?"), msg("ok Friday then", "2026-10-06T09:00:00Z")]);
    expect(c.every((x) => x.text !== "at 3pm")).toBe(true);
    expect(c.map((x) => x.id)).toEqual(c.map((_, i) => `d${i + 1}`));
    expect(c.find((x) => x.text === "Friday")!.messageIndex).toBe(1);
  });
  it("bare ordinals resolve to the next such day of month; 'next week' to the Friday of next week", () => {
    const c = dateCandidates([msg("commit to the 13th? and the 3rd. Sometime next week is fine.", "2026-10-06T09:00:00Z")]);
    const dates = c.map((x) => x.date);
    expect(dates).toContain("2026-10-13");
    expect(dates).toContain("2026-11-03");
    expect(dates).toContain("2026-10-16");
    expect(dateCandidates([msg("by the 5th of November", "2026-10-06T09:00:00Z")]).map((x) => x.date)).toContain("2026-11-05");
  });
  it("'EOD Friday' on a Thursday resolves to Friday, not Thursday", () => {
    const c = dateCandidates([msg("please submit by EOD Friday", "2026-10-22T11:45:00Z")]);
    expect(c.map((x) => x.date)).toContain("2026-10-23");
  });
});
