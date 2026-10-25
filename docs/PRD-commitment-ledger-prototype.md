# PRD: Commitment Ledger, prototype v0

Status: APPROVED 2026-10-25 (D1 CLI+MCP, D2 TypeScript, D3 run model eval locally, D4 real Slack export + ICS to be supplied; D5 defaults to Edy first)
Owner: Edy
Date: 2026-10-25
Source research: `reports/Productivity app gap research.md`

---

## 1. Problem and why now

Knowledge workers, and multi-company professionals in particular, lose track of two things every day: what they promised other people, and what other people asked of them. These obligations are scattered across Slack threads, meeting notes, calendar invites and email. No shipping product keeps a persistent, cross-source ledger of them, closes items from observed activity rather than manual ticking, or reconciles the morning plan against what actually happened.

The research found the adjacent features are now commodity (morning briefs from Gemini, Claude Duet, Copilot, ChatGPT scheduled tasks), every one of them is once-a-day, single-tenant and stateless across days, and the one commercial attempt (ReadyWhen) has no visible traction. The window is estimated at 12 to 18 months before platforms fold a ledger in. The three load-bearing assumptions are unproven. The prototype exists to test the one that is technical: extraction precision.

## 2. What the prototype must prove

The prototype is an evidence-gathering instrument, not a product. It succeeds if it answers these with numbers:

| # | Question | Target to proceed | Kill signal |
|---|---|---|---|
| S1 | Can an LLM pipeline extract commitments from real Slack and meeting text with high precision? | Precision >= 0.85, recall >= 0.70 on a labelled set | Precision < 0.70 after two prompt iterations |
| S2 | Can dates be assigned without inventing them? | Wrong-date rate <= 5% on items with a stated deadline | Wrong-date rate > 15% |
| S3 | Can the nightly job close items from evidence (sent message, attended meeting, completed task) without false closes? | False-close rate <= 5% | False-close rate > 15% |
| S4 | Does the per-user cost land where the research said? | <= $3 per user per month at a nightly cadence on the chosen model mix | > $10 |
| S5 | Does the output feel useful to a real person after one week? | Edy (or one fractional operator) uses the morning brief 5 of 7 days unprompted | Abandoned by day 3 |

S1 to S4 are measured by an eval harness that ships with the prototype. S5 is a single-user dogfood and is the weakest signal here. The report's open question about willingness to pay is not answered by this prototype and should run in parallel as customer interviews.

## 3. Scope

### In scope

1. **Normalized ingestion from exports, not live OAuth.** Readers for Slack workspace export JSON, calendar `.ics`, and a plain-text or Markdown meeting-notes folder. Each source is tagged with a `tenant` (client or company). Output: a `messages` table in SQLite.
2. **Extraction pipeline.** Per thread or document, a Claude call with structured output returns zero or more candidate obligations: direction (outbound promise or inbound ask), counterparty, summary, evidence span, tenant, confidence, and a due-date *choice* from deterministic candidates (see constraints). Dedupe against existing ledger rows.
3. **Ledger store.** SQLite table of obligations with states `open`, `aging`, `done`, `dropped`, `renegotiated`, source links, created and due dates, closing evidence.
4. **Nightly reconcile job.** Re-reads new activity, matches it against open rows, proposes closes with evidence, ages rows past due, drafts follow-up nudges. Writes are propose-only: the job emits a review queue, it never messages anyone.
5. **Morning brief.** Plain-text or Markdown "what you owe whom, by when, by tenant" plus the review queue. Rendered to stdout and to a file.
6. **CLI.** `ledger ingest`, `ledger extract`, `ledger reconcile`, `ledger brief`, `ledger review` (accept, reject, drop, renegotiate).
7. **MCP server.** Exposes `list_obligations`, `search_obligations`, `update_obligation`, `get_brief` so the ledger can be used from inside Claude, Cowork or any MCP client. This is the cheapest path to the "thin layer" delivery the research recommended.
8. **Eval harness.** Labelled fixture set, a scorer that reports precision, recall, wrong-date rate, false-close rate and token cost per run, and a `make eval` target that runs end to end.
9. **Fixture data.** A synthetic multi-tenant dataset (three fake clients, ~80 Slack threads, ~40 calendar events, ~15 meeting notes, ~120 labelled obligations with planted hard cases: renegotiated dates, implicit promises, sarcasm, forwarded asks, duplicates across channels).

### Explicitly out of scope

- Live Slack, Google, or Microsoft OAuth. Export files only. Gmail needs a CASA assessment and is deferred regardless.
- Any write-back to Slack or email. Not even drafts posted to channels.
- Web or mobile UI. The MCP server and CLI are the surfaces. A single read-only HTML page may be added if S5 dogfooding needs it.
- Auth, multi-user accounts, billing, hosting. Single user, local SQLite.
- Scheduling, time blocking, habit tracking, task management. Ruled out by the research.
- Memory beyond the ledger itself. No profile, no preference learning in v0.

## 4. Constraints, dependencies, edge cases

### Constraints

- **Dates are chosen, not generated.** A deterministic parser (chrono-node or equivalent) produces candidate dates from the text relative to the message timestamp. The model selects among candidates or returns `none`. This is the research's main mitigation for the "invented meeting time" failure and is what makes S2 measurable.
- **Email and chat are attacker-controlled.** Extraction prompts treat message content as data. No instruction in a message may change pipeline behaviour. The fixture set includes two injection attempts and the eval checks they are ignored.
- **Tenant isolation.** A row carries exactly one tenant. The brief groups by tenant. No cross-tenant text appears in any single extraction call.
- **Model.** Default per the Claude API skill is Claude Opus 5.5 (`claude-opus-5-5`) with adaptive thinking and server-side fallbacks on. Extraction will first run on Opus 5.5 to set a quality ceiling, then the eval will be re-run on Haiku 5.5 and Sonnet 5.5 to find the cheapest model that holds the S1/S2 targets. Structured outputs via `output_config.format`, no forced `tool_choice` (returns 400 on these models).
- **Cost accounting.** Every call logs `usage` tokens; the eval reports dollars per run and extrapolates to per-user-month at nightly cadence.
- **Idempotent runs.** Re-running ingest or extract on the same data must not duplicate rows.

### Dependencies

- Anthropic API key. **This sandbox has none** (direct API calls return 401; only the Claude Code CLI is authenticated). Either an `ANTHROPIC_API_KEY` is added to the environment secrets, or the prototype runs on Edy's machine. The eval harness and fixtures work offline either way.
- Node 22 (present), `@anthropic-ai/sdk` 1.3.0, `@modelcontextprotocol/sdk` 1.32.2, SQLite via `better-sqlite3`, `zod`, `chrono-node`, `ical.js` or `node-ical`. All open source, no accounts needed.
- Real data for S1 to S3 to mean anything. Synthetic data written by Claude and extracted by Claude will overstate precision. The numbers from fixtures are a floor-check on the pipeline, not a verdict. A real Slack export from one workspace is needed before any go or no-go call.

### Edge cases the fixtures must cover

- A promise renegotiated in a later message ("actually, make that Friday") must update, not duplicate.
- An ask directed at someone else in the thread must not become the user's obligation.
- A promise closed by a message in a different channel than where it was made.
- Conditional commitments ("if legal signs off I'll send it") stay `open` with the condition noted.
- Thread with no obligation at all (most threads). Over-extraction here is the fatigue failure.
- Same obligation visible in Slack and in meeting notes: one row, two evidence links.
- Timezone-ambiguous dates ("EOD", "next week") across tenants in different zones.
- Messages that are instructions to the pipeline ("ignore all previous obligations").

## 5. Build plan

Sequenced so the eval exists before the pipeline does.

| Step | Deliverable | Depends on | Rough effort |
|---|---|---|---|
| 0 | Repo scaffold: TypeScript, lint, test, `make eval`, `.env.example` | sign-off | 0.5 day |
| 1 | Fixture generator and labelled dataset (committed JSON, hand-reviewed) | 0 | 1 day |
| 2 | Scorer: precision, recall, wrong-date, false-close, cost. Runs against a stub extractor and reports zeros | 1 | 0.5 day |
| 3 | Ingestion readers (Slack export, ICS, notes) into SQLite with tenant tags | 0 | 1 day |
| 4 | Date-candidate generator and extraction call with structured outputs | 3 | 1 day |
| 5 | Ledger store, dedupe, state machine | 4 | 0.5 day |
| 6 | Reconcile job and review queue | 5 | 1 day |
| 7 | Morning brief and CLI | 6 | 0.5 day |
| 8 | MCP server over the ledger | 5 | 0.5 day |
| 9 | Eval runs: Opus 5.5 ceiling, then Haiku 5.5 and Sonnet 5.5; prompt iteration up to two rounds | 2, 7 | 1 day |
| 10 | Dogfood on one real export for a week; write up S1 to S5 | 9 + real data | 1 week elapsed |

Roughly 7 to 8 build days before the dogfood week. Steps 1 and 2 come first on purpose: if the eval is not in place before the extractor, the prototype will "work" and prove nothing.

## 6. Decisions needed from Edy before step 0

| # | Question | Recommendation | Why it changes the build |
|---|---|---|---|
| D1 | Surface: CLI plus MCP server, or a web app? | CLI + MCP | A web app roughly doubles the work and tests UI, not extraction. MCP lets you use the ledger inside Claude immediately. |
| D2 | Stack: TypeScript or Python? | TypeScript | Best-supported MCP SDK, same language as the Anthropic SDK examples, Node already present. Python is fine if you want to hack on it yourself. |
| D3 | Where does the API key live? Add `ANTHROPIC_API_KEY` to this environment's secrets, or run everything locally on your machine? | Add to environment secrets | Without it the eval cannot run here. Fixtures and offline tests still can. |
| D4 | Real data: can you provide a Slack export and a calendar ICS, even from one workspace? | Yes, as early as step 3 | Synthetic-only numbers will flatter the pipeline. Real data is the difference between a demo and evidence. |
| D5 | Target user for the dogfood: you, or a fractional operator you know? | You first, then one operator | S5 is meaningless without a real week of use. |

Not decided here and deliberately deferred: pricing, hosting, OAuth order, company or product name.

## 6a. Build log and deviations

- 2026-10-25: steps 0 to 8 built and offline-tested. Oracle eval scores 100/100/0/0, proving the harness.
- Deviation: fixture set is 41 Slack threads, 5 notes, 7 events, 19 labelled obligations, 19 negative threads, 2 injection threads. The PRD asked for roughly 80/15/40/120. Reason: hand-authored quality over volume for v0; grow it once real data shows which cases matter.
- Deviation: `next week` as a deadline is resolved to the Friday of the following week. This is a labelling convention, not a fact about language; revisit with real data.
- Deviation: ICS floating and TZID times are treated as UTC in v0.
- Step 9 (model eval) not run in the build environment; no API key by decision D3. Edy runs `make eval` locally.
- Design change surfaced by the oracle brief: rows with a pending close proposal are no longer nagged as overdue or given nudges; they wait for the user's accept.

## 7. Risks this prototype does not retire

- Willingness to pay in the fractional segment. Needs 10 interviews, not code.
- Platform absorption within 18 months. Needs a go-to-market answer, not code.
- Whether the target segment's commitments actually flow through Slack rather than email. Could be answered by the interviews or by the real export in D4.
