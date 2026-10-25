import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Db } from "../db.js";
import { getConfig } from "../config.js";
import { readIcsFile, readNotesDir, readSlackExport } from "../ingest/index.js";
import { ClaudeExtractor, NullExtractor, type Extractor } from "../extract/claude.js";
import { runExtraction } from "../extract/index.js";
import { reconcile } from "../reconcile/index.js";
import { renderBrief } from "../brief/index.js";
import { score, renderScoreMarkdown, type Score } from "./score.js";
import { OracleExtractor } from "./oracle.js";
import type { Labels } from "./generate_fixtures.js";

export interface EvalOptions { fixtures: string; mode: "model" | "oracle" | "dry"; model?: string; effort?: "low" | "medium" | "high" | "xhigh" | "max"; outDir: string; quiet?: boolean }

/** Ingest a fixture tree, run extraction chronologically, reconcile at the labelled as-of date, score. */
export async function runEval(opts: EvalOptions): Promise<{ score: Score; reportPath: string; briefPath: string }> {
  const labels = JSON.parse(readFileSync(join(opts.fixtures, "labels.json"), "utf8")) as Labels;
  mkdirSync(opts.outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dbPath = join(opts.outDir, `eval-${opts.mode}-${stamp}.db`);
  if (existsSync(dbPath)) rmSync(dbPath);
  const db = new Db(dbPath);
  const cfg = { ...getConfig(), meNames: labels.me.names, meSlackId: labels.me.slackId };
  if (opts.model) cfg.model = opts.model;

  for (const tenant of readdirSync(opts.fixtures).filter((d) => statSync(join(opts.fixtures, d)).isDirectory())) {
    const base = join(opts.fixtures, tenant);
    if (existsSync(join(base, "slack"))) db.upsertMessages(readSlackExport(join(base, "slack"), tenant));
    if (existsSync(join(base, "calendar.ics"))) db.upsertMessages(readIcsFile(join(base, "calendar.ics"), tenant));
    if (existsSync(join(base, "notes"))) db.upsertMessages(readNotesDir(join(base, "notes"), tenant));
  }

  const extractor: Extractor = opts.mode === "oracle" ? new OracleExtractor(labels) : opts.mode === "dry" ? new NullExtractor() : new ClaudeExtractor({ model: cfg.model, ...(opts.effort ? { effort: opts.effort } : {}) });
  const t0 = Date.now();
  const runOpts: Parameters<typeof runExtraction>[3] = {};
  if (!opts.quiet) runOpts.onThread = (t, i, n) => { process.stderr.write(`[${i + 1}/${n}] ${t.key}\n`); };
  const stats = await runExtraction(db, extractor, cfg, runOpts);
  const rec = reconcile(db, new Date(labels.asOf));
  const s = score(db, labels, opts.mode === "model" ? cfg.model : opts.mode, stats.threadsExtracted, stats.notes);
  const run = { mode: opts.mode, model: extractor.name, elapsedMs: Date.now() - t0, extraction: { ...stats, errors: stats.errors.slice(0, 20) }, reconcile: rec, db: dbPath, fixtureCounts: labels.counts };
  const reportPath = join(opts.outDir, `report-${opts.mode === "model" ? cfg.model : opts.mode}-${stamp}.md`);
  writeFileSync(reportPath, renderScoreMarkdown(s, run));
  writeFileSync(reportPath.replace(/\.md$/, ".json"), JSON.stringify({ score: s, run }, null, 2));
  const briefPath = join(opts.outDir, `brief-${opts.mode === "model" ? cfg.model : opts.mode}-${stamp}.md`);
  writeFileSync(briefPath, renderBrief(db, new Date(labels.asOf)));
  db.close();
  return { score: s, reportPath, briefPath };
}

function parseArgs(argv: string[]): EvalOptions {
  const o: EvalOptions = { fixtures: "fixtures/synthetic", mode: "model", outDir: "eval/out" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--fixtures") o.fixtures = argv[++i] ?? o.fixtures;
    else if (a === "--oracle") o.mode = "oracle";
    else if (a === "--dry-run") o.mode = "dry";
    else if (a === "--model") { const v = argv[++i]; if (v) o.model = v; }
    else if (a === "--effort") { const v = argv[++i] as EvalOptions["effort"]; if (v) o.effort = v; }
    else if (a === "--out") o.outDir = argv[++i] ?? o.outDir;
    else if (a === "--quiet") o.quiet = true;
  }
  return o;
}

if (process.argv[1] && /run\.(ts|js)$/.test(process.argv[1])) {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.mode === "model" && !process.env.ANTHROPIC_API_KEY) {
    getConfig(); // loads .env
    if (!process.env.ANTHROPIC_API_KEY) { console.error("ANTHROPIC_API_KEY is not set. Use --oracle or --dry-run for an offline run, or add the key to .env"); process.exit(2); }
  }
  runEval(opts).then(({ score: s, reportPath, briefPath }) => {
    const pct = (x: number) => (x * 100).toFixed(1) + "%";
    console.log(`\n${s.model}: precision ${pct(s.precision)}  recall ${pct(s.recall)}  wrong-date ${pct(s.dates.wrongDateRate)}  false-close ${pct(s.closes.falseCloseRate)}  $/user/mo ${s.cost.usdPerUserMonthAt20ThreadsPerDay.toFixed(2)}`);
    console.log(`targets: ${Object.entries(s.targets).map(([k, v]) => `${k}=${v ? "PASS" : "FAIL"}`).join("  ")}`);
    console.log(`report: ${reportPath}\nbrief:  ${briefPath}`);
  }).catch((e) => { console.error(e); process.exit(1); });
}
