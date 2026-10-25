# Commitment Ledger (prototype v0)

A background agent that keeps a persistent ledger of what you promised other people and what they asked of you, across every company you work with. It reads Slack exports, calendar files and meeting notes, extracts obligations with Claude, closes them on evidence (never on a checkbox), ages the overdue ones, drafts nudges it never sends, and renders a morning brief. It is also an MCP server so you can ask Claude "what do I owe whom" directly.

This is an evidence-gathering prototype, not a product. Read `docs/PRD-commitment-ledger-prototype.md` for what it must prove and `reports/Productivity app gap research.md` for why it exists.

## Status

| PRD step | State |
|---|---|
| 0 scaffold | done |
| 1 fixtures | done, smaller than planned: 41 Slack threads, 5 notes, 7 events, 19 labelled obligations, 19 negative threads, 2 injection threads (PRD asked for ~80/15/40/120). Enough to debug the pipeline, not enough to trust a number. |
| 2 scorer | done, verified by an oracle run that scores 100% |
| 3 ingestion | done (Slack export, ICS, notes folder) |
| 4 extraction | done (Opus 5.5 default, structured outputs, deterministic date candidates, server-side refusal fallbacks) |
| 5 ledger | done |
| 6 reconcile and review queue | done |
| 7 brief and CLI | done |
| 8 MCP server | done |
| 9 model eval | **not run.** Needs `ANTHROPIC_API_KEY`. Run it locally, see below. |
| 10 dogfood on real data | not started. Needs your Slack export and .ics. |

## Requirements

Node 22.13 or newer (uses the built-in `node:sqlite`). No native modules.

```bash
npm install
cp .env.example .env     # add ANTHROPIC_API_KEY, set LEDGER_ME_NAMES and LEDGER_ME_SLACK_ID
npm test                 # offline, no key needed
```

## Run the eval (needs the key)

```bash
make eval                # Opus 5.5, the quality ceiling
make eval-sonnet         # claude-sonnet-5-5
make eval-haiku          # claude-haiku-5-5
npm run eval -- --oracle # offline: proves the harness, must print 100% / 0% / 0%
```

Each run writes `eval/out/report-<model>-<stamp>.md` (metrics, per-label table, false positives), a `.json` twin, the brief the user would have seen on the as-of date, and the SQLite db for inspection. Targets from the PRD: precision >= 85%, recall >= 70%, wrong-date <= 5%, false-close <= 5%, <= $3 per user per month. The cost extrapolation assumes 20 extracted threads per user per day; change that assumption in `src/eval/score.ts` if your real data says otherwise.

What the fixture eval cannot tell you: anything about real Slack. The threads were written by a model and are cleaner than reality. Treat fixture scores as "the pipeline is not broken", then run on a real export.

## Run on your own data

Export a Slack workspace (Workspace settings, Import/Export Data, Export). Export a calendar as `.ics`. Put meeting notes in a folder as `.md` or `.txt` with a `YYYY-MM-DD-` filename prefix or a `date:` frontmatter line.

```bash
npm run ledger -- ingest slack ./data/acme-slack-export --tenant acme
npm run ledger -- ingest ics   ./data/acme.ics --tenant acme
npm run ledger -- ingest notes ./data/acme-notes --tenant acme
npm run ledger -- extract                 # calls the model on new or changed threads
npm run ledger -- reconcile               # ages overdue rows, drafts nudges
npm run ledger -- brief                   # the morning brief
npm run ledger -- review queue            # proposed closes and nudges
npm run ledger -- review accept pr_xxxx   # the only way a row becomes done
npm run ledger -- review ok ob_xxxx       # confirm a model-proposed obligation is real
npm run ledger -- review not ob_xxxx      # false positive
npm run ledger -- review drop ob_xxxx     # dropping is a first-class action, no red counter
npm run ledger -- show ob_xxxx            # evidence trail
```

Repeat `ingest` with a second `--tenant` for another company. Nothing crosses tenants.

## MCP server

```json
{
  "mcpServers": {
    "commitment-ledger": {
      "command": "node",
      "args": ["--no-warnings", "--import", "tsx", "/absolute/path/to/Basic/src/mcp/server.ts"],
      "env": { "LEDGER_DB": "/absolute/path/to/ledger.db" }
    }
  }
}
```

Tools: `get_brief`, `list_obligations`, `search_obligations`, `get_obligation`, `list_proposals`, `update_obligation`, `resolve_proposal`, `run_reconcile`. The server never calls the model and never writes to Slack or email.

## Design decisions that matter

- **Dates are chosen, not generated.** `chrono-node` produces candidates from each message relative to its timestamp. The model picks an id or null. The wrong-date metric is measurable because of this.
- **Closes are proposals.** The model can say "this looks done, here is the quote". Only `review accept` moves a row to done. False-close rate is measured on the proposals.
- **One tenant per call.** The existing-obligations list passed to the model is filtered by tenant, so Client A's context never appears while extracting Client B's thread.
- **Thread text is untrusted.** The system prompt says so, the fixture set plants two injection attempts, the eval reports whether they produced wrongful drops or closes.
- **Idempotent.** Threads are hashed; unchanged threads are not re-sent. Re-running `ingest` upserts.
- **Model choice is a flag.** Opus 5.5 by default to find the ceiling. The eval exists so you can prove whether Haiku 5.5 or Sonnet 5.5 holds the targets at a fraction of the cost.

## Known gaps in v0

- ICS: floating and TZID times are treated as UTC; recurrence rules are not expanded.
- Slack: top-level messages without replies are grouped per channel per day, which can mix unrelated conversations into one extraction call.
- No Gmail. Deliberate; see the PRD.
- No web UI. The brief is Markdown, the MCP server is the interactive surface.
- `vitest` is pinned to 3.x because 4.x trips an npm resolver bug in this environment. It is a dev dependency only.
