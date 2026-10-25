import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readSlackExport, resolveMentions } from "./slack.js";
import { parseIcs, parseIcsDate, readIcsFile } from "./ics.js";
import { readNotesDir, splitFrontmatter } from "./notes.js";

describe("slack export reader", () => {
  it("groups replies into threads, resolves mentions, skips joins", () => {
    const dir = mkdtempSync(join(tmpdir(), "slack-"));
    writeFileSync(join(dir, "users.json"), JSON.stringify([{ id: "U1", name: "priya", profile: { real_name: "Priya Nair", display_name: "Priya" } }, { id: "U_ME", real_name: "Edy R" }]));
    mkdirSync(join(dir, "pricing"));
    writeFileSync(join(dir, "pricing", "2026-10-06.json"), JSON.stringify([
      { type: "message", user: "U1", text: "Hi <@U_ME>, deck by Thu?", ts: "1791281520.000100", thread_ts: "1791281520.000100", reply_count: 1 },
      { type: "message", user: "U_ME", text: "Yes &amp; done", ts: "1791281600.000100", thread_ts: "1791281520.000100" },
      { type: "message", subtype: "channel_join", user: "U1", text: "joined", ts: "1791281700.000100" },
      { type: "message", user: "U1", text: "standalone", ts: "1791281800.000100" },
    ]));
    const msgs = readSlackExport(dir, "acme");
    expect(msgs).toHaveLength(3);
    expect(msgs[0]!.text).toBe("Hi @Edy R, deck by Thu?");
    expect(msgs[0]!.authorName).toBe("Priya");
    expect(msgs[1]!.text).toBe("Yes & done");
    expect(msgs[1]!.threadId).toBe("1791281520.000100");
    expect(msgs[2]!.threadId).toBe("pricing/2026-10-06");
    expect(msgs[0]!.participants.sort()).toEqual(["Edy R", "Priya"]);
    expect(msgs[0]!.tenant).toBe("acme");
  });
  it("resolves links and channels", () => {
    expect(resolveMentions("see <#C1|general> and <https://x.y|the doc> or <https://z>", new Map())).toBe("see #general and the doc (https://x.y) or https://z");
  });
});

describe("ics reader", () => {
  const ics = "BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nUID:e1\r\nDTSTART:20261009T130000Z\r\nDTEND:20261009T140000Z\r\nSUMMARY:Trading call\\, weekly\r\nDESCRIPTION:Line one\\nLine\r\n  two folded\r\nATTENDEE;CN=Priya Nair:mailto:p@x.com\r\nORGANIZER;CN=Edy:mailto:e@x.com\r\nEND:VEVENT\r\nBEGIN:VEVENT\r\nUID:e2\r\nDTSTART;VALUE=DATE:20261010\r\nSUMMARY:Holiday\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n";
  it("parses events, unfolds, unescapes, all-day", () => {
    const ev = parseIcs(ics);
    expect(ev).toHaveLength(2);
    expect(ev[0]!.summary).toBe("Trading call, weekly");
    expect(ev[0]!.description).toBe("Line one\nLine two folded");
    expect(ev[0]!.attendees).toEqual(["Priya Nair"]);
    expect(ev[0]!.organizer).toBe("Edy");
    expect(ev[1]!.allDay).toBe(true);
    expect(parseIcsDate("20261009T130000Z").iso).toBe("2026-10-09T13:00:00.000Z");
  });
  it("produces messages with attendees as participants", () => {
    const dir = mkdtempSync(join(tmpdir(), "ics-"));
    writeFileSync(join(dir, "c.ics"), ics);
    const m = readIcsFile(join(dir, "c.ics"), "acme");
    expect(m[0]!.id).toBe("calendar:acme:e1");
    expect(m[0]!.participants.sort()).toEqual(["Edy", "Priya Nair"]);
    expect(m[0]!.text).toContain("Meeting: Trading call, weekly");
  });
});

describe("notes reader", () => {
  it("reads frontmatter and dates from filename", () => {
    const dir = mkdtempSync(join(tmpdir(), "notes-"));
    writeFileSync(join(dir, "2026-10-09-call.md"), "---\ntenant: beacon\nattendees: A, B\n---\nbody here");
    writeFileSync(join(dir, "undated.md"), "no date");
    writeFileSync(join(dir, "2026-10-10-plain.txt"), "plain");
    const m = readNotesDir(dir, "acme");
    expect(m).toHaveLength(2);
    expect(m[0]!.tenant).toBe("beacon");
    expect(m[0]!.participants).toEqual(["A", "B"]);
    expect(m[0]!.ts).toBe("2026-10-09T09:00:00.000Z");
    expect(m[1]!.tenant).toBe("acme");
    expect(splitFrontmatter("no front").front).toEqual({});
  });
});
