import { describe, expect, it } from "vitest";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateFixtures } from "./generate_fixtures.js";
import { runEval } from "./run.js";
import { Db } from "../db.js";
import { getConfig } from "../config.js";
import { readSlackExport } from "../ingest/slack.js";
import { runExtraction } from "../extract/index.js";
import { NullExtractor } from "../extract/claude.js";

describe("eval harness", () => {
  it("oracle run scores perfectly, which proves scorer + pipeline wiring", async () => {
    const dir = mkdtempSync(join(tmpdir(), "fx-"));
    const labels = generateFixtures(dir);
    expect(labels.obligations.length).toBeGreaterThan(10);
    const { score } = await runEval({ fixtures: dir, mode: "oracle", outDir: join(dir, "out"), quiet: true });
    expect(score.precision).toBe(1);
    expect(score.recall).toBe(1);
    expect(score.dates.wrongDateRate).toBe(0);
    expect(score.dates.missing).toBe(0);
    expect(score.closes.falseCloseRate).toBe(0);
    expect(score.closes.closeRecall).toBe(1);
    expect(score.negatives.threadsWithFalsePositive).toBe(0);
    expect(score.cost.usd).toBe(0);
  }, 60000);

  it("dry run scores zero and extraction is idempotent on unchanged threads", async () => {
    const dir = mkdtempSync(join(tmpdir(), "fx-"));
    generateFixtures(dir);
    const { score } = await runEval({ fixtures: dir, mode: "dry", outDir: join(dir, "out"), quiet: true });
    expect(score.counts.predictions).toBe(0);
    expect(score.recall).toBe(0);
    const db = new Db(":memory:");
    db.upsertMessages(readSlackExport(join(dir, "acme", "slack"), "acme"));
    const cfg = getConfig();
    const s1 = await runExtraction(db, new NullExtractor(), cfg);
    const s2 = await runExtraction(db, new NullExtractor(), cfg);
    expect(s1.threadsExtracted).toBeGreaterThan(0);
    expect(s2.threadsExtracted).toBe(0);
    expect(s2.threadsSkipped).toBe(s1.threadsExtracted);
  }, 60000);
});
