# Platform landscape and technical feasibility for an LLM-based personal work-organization assistant (as of 24 October 2026)

Research method note: ~45 web searches and ~30 page fetches. Many official pages (openai.com, ai.google.dev, developers.google.com, learn.microsoft.com, linear.app, developers.notion.com, developer.todoist.com, arxiv.org, modelcontextprotocol.io) could not be fetched directly from this environment (DNS blocked by the proxy), so figures for those are taken from search-engine snippets of the official page or from clearly-labelled secondary sources. Where only a secondary source exists, it is marked "(secondary)". Anthropic's pricing page, Anthropic's release notes, Anthropic's Duet and Code-with-Claude blog posts, Apple's WWDC26 session page, and the MCP registry GitHub README were fetched in full.

Status vocabulary used throughout: **SHIPPED** = generally available to the stated plan; **PREVIEW** = shipped but gated (research preview / Frontier / waitlist / beta); **ANNOUNCED** = publicly dated commitment, not usable yet; **DEMOED/RUMOURED** = shown on stage or reported, no availability.

---

## Key Question 1: What do the first-party assistants (Claude, ChatGPT, Gemini, Copilot, Apple Intelligence) do today for planning a workday, triaging email, extracting tasks from meetings and scheduling, and what is the reviewer consensus?

### Takeaway
By October 2026 every major platform ships (at least in preview) a *proactive, background "daily brief + inbox/calendar watcher"*: Claude Duet (Oct 21, 2026, waitlist), Gemini Daily Brief (SHIPPED, May 2026) and Gemini Spark (Ultra beta), Copilot in Outlook agentic inbox/calendar (Frontier preview, Apr 2026), and ChatGPT scheduled tasks + connectors (Pulse itself was shut down June 2026). The "morning brief from your email and calendar" is therefore commoditized at the platform level; reviewer consensus is that these work for simple, repeatable workflows but still misjudge urgency, lose context on complex multi-step tasks, and require human approval gates.

### Cited Findings

**Anthropic / Claude**
- Cowork timeline (all SHIPPED unless noted): research preview for Max Jan 12, 2026 ("brings Claude Code's agentic capabilities to the Claude desktop app"); Pro on Jan 16; plugin marketplace + admin controls Feb 24; **scheduled tasks Feb 25, 2026** ("create and schedule both recurring and on-demand tasks in Cowork"); computer use research preview Mar 23; **Cowork GA Apr 9, 2026** on macOS and Windows; **Cowork on web and mobile Jul 7, 2026**, with scheduled tasks that "run with no device online"; Sept 16, 2026 "unified Cowork experience" making Cowork capabilities available from any conversation — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes)
- Microsoft 365 write tools (Jul 7, 2026): "With write tools enabled, Claude can draft, send, and organize email, manage calendar events" (requires admin and Entra consent) — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes)
- Memory: free for all users Mar 2, 2026; redesigned Jul 10, 2026 as "a set of individual, categorized entries"; Aug 25, 2026 "Memory now works across chat and Cowork in the cloud", editable under Settings > Memory, health excluded unless enabled; on by default for Free/Pro/Max, off by default for Team/Enterprise — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes)
- Slack: Jun 23, 2026, Team and Enterprise "can now tag Claude directly in Slack conversations" to delegate tasks — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes)
- **Claude Duet (PREVIEW, Oct 21, 2026)**: "a new app where Claude works as a proactive agent"; "Each morning, it sends you a short brief on the most important items across your connected apps"; checks connected accounts "every few hours" to conserve limits; waits for approval before "sending a message, making a payment, signing a document, or deleting anything"; built on Opus 5.5; waitlist "starting with US Pro and Max subscribers"; shares plan usage limits; can use "over 6,000 connectors and plugins in the Claude Marketplace"; stated limitation: "it still might misread a thread or miscalibrate what's urgent" and "it can't yet show you its browser" — [Anthropic: Introducing Claude Duet](https://claude.com/blog/claude-duet)
- Third-party coverage adds that Duet "can misjudge how urgent a message is, or miss an email that arrives between checks" — [iPhoneSoft (secondary, French)](https://iphonesoft.fr/2026/10/21/claude-duet-anthropic-agent-ia-toujours-actif); MacRumors coverage: Duet "does not see passwords or logins" and has "a dedicated classifier that checks each message for sensitive information leaks" — [MacRumors](https://macrumors.com/2026/10/21/anthropic-claude-duet/)
- Cowork MCP connectors cover Gmail, Google Drive, Google Calendar, Slack, Notion, Salesforce among others; Cowork activity is not captured in the Compliance API — [Fast.io overview (secondary)](https://fast.io/resources/claude-cowork-features-overview.md)
- Claude Code Routines (PREVIEW, Apr 14, 2026): a routine bundles a prompt, repositories and connectors; each run is a fresh isolated cloud session; triggers are cron schedule, API call, or GitHub event — [Makerkit guide (secondary)](https://makerkit.dev/blog/tutorials/claude-code-routines-guide); [Gigazine (secondary)](https://www.gigazine.net/gsc_news/en/20260416-claude-code-routine)

**OpenAI / ChatGPT**
- Gmail, Google Calendar and Contacts connectors launched Aug 14, 2025 alongside GPT-5, starting with Pro; ChatGPT "references these tools automatically when it judges them relevant" — [BetaNews](https://betanews.com/2025/08/14/chatgpt-now-integrates-with-gmail-google-calendar-and-contacts/)
- ChatGPT Pulse (daily proactive cards from chats, feedback and connected Gmail/Calendar) launched Sept 25, 2025 as a Pro mobile preview — [The Decoder](https://the-decoder.com/?p=27501); [Forklog](https://forklog.com/en/openai-introduces-pulse-mode-in-chatgpt-for-proactive-updates/amp)
- **Pulse is being shut down**: OpenAI announced June 18, 2026 that Pulse would shut down within 14 days, pointing users to **scheduled tasks** for daily briefings "tailored to their interests, past chats, and connected apps" — [Gigazine (secondary)](https://gigazine.net/gsc_news/en/20260619-chatgpt-scheduled-tasks/); [Pulse2 (secondary)](https://pulse2.com/openai-chatgpt-launches-new-scheduled-tasks-page/)
- Scheduled tasks can check connected apps on a timer; calendar write actions and Gmail sending require approval and, on workspace plans, admin enablement ("Admins must enable write actions for Gmail and Calendar, which are off by default") — [MindStudio (secondary)](https://www.mindstudio.ai/blog/how-to-use-chatgpt-work-mode-personal-assistant)
- **Workspace Agents (PREVIEW, Apr 22, 2026)**: research preview for Business, Enterprise, Edu, Teachers (not Plus); run in the cloud and keep working when users are inactive; admins control tools/data; sensitive actions can require approval; free until May 6, 2026 then credit-based billing; framed as successor to custom GPTs — [Decrypt](https://decrypt.co/365220/openai-workspace-agents-feature-chatgpt); [VentureBeat](https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more)
- Memory in 2026 "pulls context from your past chats, saved notes, uploaded files, and even your connected Gmail" with a view of which sources shaped a response (single tester) — [Digital Strategy AI substack (secondary)](https://digitalstrategyai.substack.com/p/what-i-learned-after-testing-every)

**Google / Gemini**
- Gemini scheduled actions (SHIPPED Jun 2025): run a prompt at a set time or recurring; example "waking up to a summary of your calendar and unread emails"; limited to AI Pro/Ultra and qualifying Workspace plans; one secondary source says up to 10 active scheduled actions — [GSMArena](https://www.gsmarena.com/googles_gemini_now_supports_scheduled_actions-news-68154.php); [Revolgy (secondary)](https://www.revolgy.com/insights/blog/automate-routine-tasks-in-google-workspace-with-gemini-scheduled-actions)
- Gemini Calendar side panel in Gmail (late 2024): creates events via natural language; limits at the time: "can't add or remove guests, extract event details from emails, or find the best time to meet" — [PhoneArena](https://www.phonearena.com/news/Gmails-Gemini-side-panel-can-now-help-Workspace-users-manage-their-schedule-more-efficiently_id164781)
- **Daily Brief (SHIPPED, Google I/O May 19, 2026)**: personalized morning digest built from Gmail, Calendar and Tasks, "rolling out to AI Plus, Pro, and Ultra subscribers in the US starting today"; also "suggests next steps, surfacing the most pressing items first"; 18+ only — [The Next Web](https://thenextweb.com/news/google-gemini-app-daily-brief-redesign-io-2026); [Android Central](https://androidcentral.com/apps-software/ai/5-important-gemini-updates-from-google-i-o-2026-that-could-genuinely-save-you-time)
- **Gemini Spark (PREVIEW, May 2026)**: background agent that "keeps working even when your phone is locked or your laptop is closed"; beta for US AI Ultra subscribers ($100/month); connects to Gmail, Docs, Workspace at launch, third-party apps "coming over the summer" — [TechCabal](https://techcabal.com/2026/05/19/everything-announced-at-the-google-i-o-2026/); [iTWire](https://itwire.com/business-it-news/data/the-gemini-app-becomes-more-agentic-delivering-proactive-24-7-help)
- Google tested a Gemini inbox section with a "Needs review" filter (test, not launch) — [TestingCatalog](https://www.testingcatalog.com/google-tests-new-gemini-inbox-section-for-workspace-triage.md)
- **Universal Gemini agent (PREVIEW, Gemini at Work Oct 8, 2026)**: works across Gmail, Calendar, Docs, Sheets, Slides, Drive, Chat, plus Microsoft 365 and Slack; each agent gets its own Workspace identity (@agents.company.com email, calendar, Drive); private preview for enterprise; GA expected late Oct / early Nov 2026 per Thomas Kurian; no extra charge where Gemini Enterprise is available (per VentureBeat, cited by aggregator) — [AI Weekly (secondary)](https://aiweekly.co/alerts/google-cloud-unveils-universal-gemini-agent-with-its-own-gmail-calendar-and); [Ecosistema Startup (secondary, Spanish)](https://ecosistemastartup.com/?p=116121)

**Microsoft / Copilot**
- **Copilot in Outlook agentic features (PREVIEW, Apr 27, 2026)** via Microsoft Frontier program: triages inboxes "by prioritising emails, drafting follow-up replies and setting sorting rules"; flags emails without a reply after 24 hours and drafts follow-ups; scans a week of missed messages after OOO; calendar: "spotting scheduling conflicts and resolving them automatically – rescheduling 1:1 meetings, rebooking rooms, and carving out focus time"; calendar tools initially Outlook for Windows and web only; "Users review each step before approval"; requires joining Frontier in the M365 admin center and Copilot for Business licenses — [Thurrott](https://www.thurrott.com/cloud/335438/copilot-in-outlook-can-now-proactively-manage-your-inbox-and-calendar); [IT Brief](https://itbrief.co.nz/story/microsoft-adds-agentic-copilot-tools-to-outlook-inbox); [UC Today](https://www.uctoday.com/project-management/the-end-of-inbox-overload-microsofts-copilot-update/)
- Official roadmap entry: "new agentic experiences for email and calendar, enabling AI to take action across scheduling, follow-ups, and inbox management" — [Microsoft 365 Roadmap](https://www.microsoft.com/microsoft-365/roadmap?Id=423047); auto-RSVP on your behalf from Copilot chat is an earlier roadmap item — [Microsoft 365 Roadmap](https://www.microsoft.com/microsoft-365/roadmap?id=314380)
- Gap in Copilot: the May 2026 M365 Copilot update "confirmed that Copilot still can't create tasks directly in Microsoft To Do" — [Collab365 (secondary)](https://spaces.collab365.com/posts/microsoft-copilot-automates-email-sorting-and-draf-eql9Zd)
- Reviewer consensus on Copilot agents (user-submitted reviews, small sample): strengths are security and M365 integration; weaknesses are "creates errors with complex workflows, and sometimes loses context", accuracy problems requiring validation, licensing cost; one Gartner reviewer rated 2/5; InfoTech usability score 57/100 (lowest), product strategy 71 — [SoftwareReviews](https://www.softwarereviews.com/products/microsoft-365-copilot-ai-agents?c_id=523); [Gartner Peer Insights](https://www.gartner.com/reviews/product/microsof-365-copilot-agents)

**Apple**
- Jan 2026 joint statement: "the next generation of Apple Foundation Models will be built on Gemini and Google cloud technology"; reported ~$1B/year; models run on device and Private Cloud Compute — [T3](https://www.t3.com/tech/ai/new-apple-intelligence-and-siri-confirmed-by-google); [Smartprix (secondary)](https://us.smartprix.com/bytes/siri-powered-by-google-apples-most-startling-ai-partnership-yet/)
- WWDC26 (Jun 8, 2026): "Siri AI" for iOS/iPadOS/macOS 27 with personal-context search across Messages, Mail and Photos, web-grounded answers, dedicated Siri app; GA fall 2026 — [ACS Information Age](https://ia.acs.org.au/article/2026/apple-reveals-the-ai-behind-siri-s-big-2026-upgrade.html)
- Reviewer consensus: Beebom three-month test says Siri "can understand the context of the conversation, answer open-ended questions"; MacStories' Viticci: "The new Siri is not an agentic product that is able to carry out long-running tasks to completion"; Siri AI launches in beta, English first, not in EU or China at first; conflicting reports on hardware floor (iPhone 11+ for iOS 27 vs iPhone 15 Pro+ for Siri AI) — [Beebom](https://gadgets.beebom.com/stories/ios-27-review); [iGeeksBlog](https://www.igeeksblog.com/apple-intelligence-features-ios-27/); [Tom's Guide](https://www.tomsguide.com/phones/iphones/ios-27-public-beta-hands-on-preview-the-new-siri-and-apple-intelligence-features-completely-changed-how-i-use-my-iphone)

**Hands-on reviewer consensus on the proactive agents**
- Gemini Spark: TechRadar reviewer had it fill a web form; it "stopped at the final submission page and waited for approval" — [TechRadar](https://techradar.com/ai-platforms-assistants/i-tried-gemini-spark-in-chrome-and-its-the-perfect-ai-for-handling-all-the-boring-bits-online); iTechPost: "occasionally struggled with context and sometimes required corrections before completing more complex tasks accurately" — [iTechPost](https://www.itechpost.com/articles/236197/20260602/gemini-spark-ai-agent-review-testing-features-capabilities-productivity-tools.htm); Xataka: not fast, "sometimes gets lost on shortcuts but almost always reaches the end" — [Xataka Móvil (Spanish)](https://www.xatakamovil.com/movil-y-sociedad/he-probado-futuro-gemini-como-agente-spark-robot-personal-que-hace-casi-cualquier-cosa-que-le-pidas); 9to5Mac: Spark "for the most part, can deliver on the promises made on stage" — [9to5Mac](https://9to5mac.com/?p=1054157); AI Agents Library ran 10 business tasks and found the best results were "the workflows they would realistically repeat every week" — [AI Agents Library (secondary)](https://www.aiagentslibrary.com/?p=8110)
- Copilot Outlook: no independent hands-on test found; all late-April coverage repeats Microsoft's description — see Thurrott/IT Brief above.

### Inferences
- The "daily brief from Gmail/Calendar" feature is now a free-or-included tier feature at Google (AI Plus), Anthropic (Pro/Max via Duet) and OpenAI (scheduled tasks). A standalone app whose headline is "morning brief" competes with bundled features that cost the user $0 incremental.
- The platform agents converge on the same safety posture: propose-then-approve for any send/delete/pay action, periodic (not real-time) polling ("every few hours" for Duet), and explicit disclaimers about urgency misjudgement. These are the areas where a focused product could still differentiate (real-time, higher-precision triage, task extraction into the user's actual task system).
- Nobody yet closes the loop into third-party task managers well: Copilot cannot create To Do tasks; Daily Brief reads Google Tasks only; Duet relies on marketplace connectors. "Extract tasks from meetings/email into Todoist/Linear/Notion with correct dates" remains a gap in the first-party stack.
- Reviewer sentiment on all of them is "impressive for routine, repeatable workflows; needs supervision for anything complex" — i.e. reliability, not capability, is the open problem.

### Gaps
- No Verge/Ars Technica hands-on of Gemini Spark, Copilot Outlook agentic mode, or Claude Duet was found (Duet is three days old).
- Could not confirm the "10 active scheduled actions" cap for Gemini or any numeric cap for ChatGPT scheduled tasks against official help pages.
- No independent evaluation of task-extraction accuracy (precision/recall of extracted to-dos, date errors) for any first-party assistant.
- Microsoft 365 Copilot per-seat price in 2026 was not re-verified (search budget exhausted).

---

## Key Question 2: What has each platform announced for 2026–2027 in this area?

### Takeaway
Announced roadmaps all point the same direction: always-on cloud agents with their own identity, memory that consolidates between runs, and approvals as the control plane. Concrete dated commitments are few; most "roadmap" is preview-to-GA promotion of what is already shown.

### Cited Findings
- Anthropic (Code with Claude, May 6–12, 2026): Managed Agents gained "Dreaming," "a scheduled process that reviews past agent sessions and curates memory so agents improve between runs"; multiagent orchestration ("A lead agent can delegate to specialist subagents working in parallel on a shared filesystem"); Outcomes (rubric grader, "lifted task success by up to 10 points on the hardest problems"); completion webhooks; doubled Claude Code rate limits and raised Opus API limits — [Anthropic recap, May 12, 2026](https://www.claude.com/blog/code-w-claude-sf-2026-sf)
- Anthropic Duet: "coming soon" sign-in to sites using logins saved in 1Password; more safety details "in the coming days"; Team/Enterprise not yet included — [Anthropic: Introducing Claude Duet](https://claude.com/blog/claude-duet)
- Google: universal Gemini agent GA "late October or early November 2026" (Kurian) — [Ecosistema Startup (secondary)](https://ecosistemastartup.com/?p=116121); Spark third-party app support "coming over the summer" 2026 — [TechCabal](https://techcabal.com/2026/05/19/everything-announced-at-the-google-i-o-2026/); Calendar API "per-project daily billing threshold... full billing details to be shared later in 2026 (with at least 90 days' notice before any changes take effect)" — [Google Calendar API usage limits](https://developers.google.com/calendar/pricing)
- Microsoft: roadmap item 423047 (agentic email/calendar) "subject to change"; no dated GA found — [Microsoft 365 Roadmap](https://www.microsoft.com/microsoft-365/roadmap?Id=423047)
- OpenAI: Workspace Agents moved to credit-based billing after May 6, 2026; Pulse retired in favour of scheduled tasks (June 2026) — [Decrypt](https://decrypt.co/365220/openai-workspace-agents-feature-chatgpt); [Gigazine (secondary)](https://gigazine.net/gsc_news/en/20260619-chatgpt-scheduled-tasks/)
- Apple: Siri AI GA fall 2026, English first, no EU/China at launch — [iGeeksBlog](https://www.igeeksblog.com/apple-intelligence-features-ios-27/); Foundation Models on-device model gets "twice a year, typically... a big update" and changes only with OS updates — [Apple WWDC26 Group Lab](https://developer.apple.com/videos/play/wwdc2026/8016/)
- An unofficial blog claims Anthropic previewed a future model hinting at "infinite" context — single unverified account — [mejba.me (secondary)](https://www.mejba.me/blog/code-with-claude-2026-agent-future-preview)

### Inferences
- Within 6–12 months the gated previews (Duet, Spark, Copilot Outlook agents, Workspace Agents, Gemini universal agent) will very likely be GA on paid consumer/business tiers; a builder should assume the bundled baseline in 2027 is "always-on agent with inbox+calendar read/write, approvals, memory".
- Platform-native memory consolidation ("Dreaming", Claude memory entries, ChatGPT memory with sources) means a third-party app cannot differentiate on "it remembers you" alone.

### Gaps
- No published 2027 roadmap documents from any vendor; everything above is preview-to-GA inference.
- Apple has not published developer pricing or a timeline for Private Cloud Compute model access beyond iOS 27.

---

## Key Question 3: State of the MCP ecosystem for calendar, email, Slack, Notion, Linear, Jira, Todoist; which connectors are production-grade?

### Takeaway
MCP is the de facto connector layer (Claude, ChatGPT, Gemini, Slack all consume it) and the official registry listed roughly 24k–39k servers by Sept–Oct 2026, but the registry is still formally a preview with a frozen v0.1 API and no quality gate. Vendor-run remote servers exist for Slack, Notion, Linear (and Anthropic's own Gmail/Calendar/M365 connectors inside Claude); there is **no official Google Calendar or Gmail MCP server** for third-party builders, only community ones.

### Cited Findings
- Registry status: "launched in preview" 2025-09-08; "breaking changes or data resets may occur"; API freeze at v0.1 announced 2025-10-24; GA planned but undated; publishing via `mcp-publisher` CLI; namespace ownership proven via GitHub OAuth/OIDC, DNS or HTTP challenge; no moderation policy described — [modelcontextprotocol/registry README](https://github.com/modelcontextprotocol/registry)
- Registry counts (all third-party tallies, methods differ): 39,238 servers as of 4 Oct 2026, +45% in 30 days, 62% remote HTTP endpoints — [Digital Applied (secondary)](https://digitalapplied.com/mcp-adoption-statistics-2026/); 24,240 distinct servers from 79,341 version records (late Aug 2026) — [jwatte.com (secondary)](https://jwatte.com/blog/mcp-servers-for-small-business.md); 30,375 unique latest-version servers, a third from ~50 accounts (early Sept 2026) — [Towards AI (secondary)](https://pub.towardsai.net/mcp-registries-in-mid-2026-one-upstream-won-2ce541b92036); "still formally a preview; API frozen at v0.1" (July 2026) — same source
- Slack: official hosted server at mcp.slack.com, ~15 tools, OAuth — [ChatForest (secondary)](https://chatforest.com/categories/communication-collaboration/); Slackbot MCP client lets users connect registry apps from the Slack Marketplace — [Reclaim.ai (secondary)](https://reclaim.ai/blog/slack-mcp-server)
- Notion: official `makenotion/notion-mcp-server` plus a hosted OAuth server — [ChatForest (secondary)](https://chatforest.com/categories/communication-collaboration/)
- Linear: official remote MCP server launched May 1, 2025; MCP access on every plan including Free — [Coworker.ai (secondary)](https://coworker.ai/blog/linear-mcp)
- Calendar: "no official calendar server"; main option is community `nspady/google-calendar-mcp` (13 tools, multi-account) — [ChatForest (secondary)](https://chatforest.com/categories/communication-collaboration/)
- Anthropic's own Claude connectors cover Gmail, Google Calendar, Google Drive, Slack, Notion, Salesforce, Microsoft 365 (incl. write tools since Jul 7, 2026) — [Fast.io (secondary)](https://fast.io/resources/claude-cowork-features-overview.md); [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes); Claude Marketplace claims "over 6,000 connectors and plugins" — [Anthropic Duet blog](https://claude.com/blog/claude-duet)
- Anthropic Code with Claude recap lists Connectors and Plugins as products but announced no new MCP spec items — [Anthropic recap](https://www.claude.com/blog/code-w-claude-sf-2026-sf)

### Inferences
- "Production-grade" in practice means vendor-hosted remote servers with OAuth: Slack, Notion, Linear qualify; Atlassian/Jira was not verified in this pass (see Gaps). Google and Microsoft email/calendar are production-grade only *inside* Claude/ChatGPT/Gemini/Copilot's own connector layers, not as reusable MCP servers a solo builder can point at — the builder still needs their own Google/Graph OAuth app (see KQ4).
- Registry growth (+12k servers in 30 days) with a third from 50 accounts implies heavy duplication/spam; the registry is a discovery index, not a trust signal. A builder shipping to end-users should pin specific vendor servers rather than letting users pick from the registry.
- For a solo developer, MCP is most valuable as the *distribution* surface (publish your own server so Claude/ChatGPT/Gemini users can add your assistant) rather than as a source of upstream connectors.

### Gaps
- Atlassian (Jira/Confluence) Rovo MCP server status, Todoist MCP (official vs community), and Asana were not verified (search budget exhausted).
- Could not fetch the MCP spec changelog (modelcontextprotocol.io blocked) to date OAuth/elicitation/tasks features.
- No independent data on MCP server reliability/uptime or security incident rates.

---

## Key Question 4: Realistic API constraints — Google Calendar/Gmail (scopes, CASA), Microsoft Graph, Slack app review, Apple EventKit/Reminders, Notion, Todoist, Linear. Where are the walls?

### Takeaway
The single biggest wall for a solo builder is Gmail: reading mail is a Google *restricted* scope that requires an annual CASA security assessment ($500–$4,500 assessor fee, 2–6 weeks) on top of brand verification; Calendar is a *sensitive* scope (verification, no CASA). Everything else (Graph, Slack, Notion, Linear, Todoist, EventKit) is a documented rate-limit or review-process constraint rather than a hard gate.

### Cited Findings

**Google OAuth / Gmail / Calendar**
- Google's restricted-scope page: apps using restricted scopes "must also complete an annual security assessment based on the Cloud App Security Assessment framework (CASA)"; "The security assessment can take 2-3 weeks for tier-2 applications and 4-6 weeks for tier-3 applications to complete and involves fees payable to the third-party assessor, ranging from $500 to $4,500 USD" (quoted via search snippet of the official page) — [Google: Restricted scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification?hl=ko)
- Vendor estimates are higher and conflict: "$540–$1k/yr via self-serve labs, up to $15k–$75k on the legacy track"; "$1,500–$6,000/year for CASA Tier 2 (2026 lab rates)"; "$15,000 to $75,000" (from a shared-OAuth sales page with a commercial incentive); overall verification "2 to 8 weeks" — [Unipile (secondary)](https://www.unipile.com/integrating-google-oauth-2-0-user-authentication-into-your-app/); [Truto (secondary)](https://truto.one/google.md); [singhamandeep.com (secondary, sales)](https://singhamandeep.com/google-api-verification-service/)
- Gmail push: "You must call the watch at least once every 7 days or you'll stop receiving updates for the user. We recommend calling watch once per day"; a successful watch triggers an immediate Pub/Sub notification; payload is `emailAddress` + `historyId`, then `users.history.list` — [Google Gmail API push guide](https://developers.google.com/workspace/gmail/api/guides/push?authuser=2); third-party figure: "15,000 quota units/minute per user; 1 Pub/Sub event/second per inbox" — [Unipile (secondary)](https://www.unipile.com/gmail-api-push-notifications/)
- Calendar API: "600 requests per minute per user per project, and 10,000 requests per minute per project"; sliding window; 403/429 `usageLimits` on excess; Google's own example: polling 5,000 users once a minute needs a per-minute quota of at least 5,000, hence push recommended; a per-project daily billing threshold exists with billing details "later in 2026" — [Google Calendar API usage limits](https://developers.google.com/calendar/pricing); [Google Calendar quota guide](https://developers.google.com/workspace/calendar/api/guides/quota?hl=fr)

**Microsoft Graph (Outlook mail/calendar)**
- Core Outlook limit: "10000 requests per 10-minute period, per user (or group), per app ID"; per mailbox — [Microsoft Exchange dev blog (archived)](https://learn.microsoft.com/id-id/archive/blogs/exchangedev/throttling-coming-to-outlook-api-and-microsoft-graph); concurrency "only 4 requests can be processed concurrently" (scope disputed: per tenant vs per mailbox) — [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/2258712/what-is-the-maximum-number-of-emails-that-can-be-s); [Nylas guide (secondary)](https://cli.nylas.com/guides/microsoft-graph-mailbox-agent-best-practices.md); 2019 beta limits "4 concurrent requests per app per mailbox", 429 with Retry-After — [Microsoft 365 Dev Blog, Feb 2019](https://devblogs.microsoft.com/microsoft365dev/throttling-changes-coming-to-beta-outlook-apis-and-outlook-related-apis-in-microsoft-graph/)
- Change notifications: "avoid frequently polling Microsoft Graph which might cause you to hit the throttling limits"; lifecycle events `reauthorizationRequired`, `subscriptionRemoved`, `missed` ("some change notifications were not delivered, for example due to throttling"); must set `lifecycleNotificationUrl`; renew via PATCH `expirationDateTime` or `/reauthorize` — [Microsoft Graph webhooks](https://learn.microsoft.com/en-us/graph/webhooks); [Graph lifecycle events](https://learn.microsoft.com/en-us/graph/webhooks-lifecycle?tabs=http); Outlook mail subscription max lifetime "10,080 minutes (under seven days)" — [Nylas (secondary, unverified)](https://cli.nylas.com/guides/microsoft-graph-change-notifications)
- Claude's own M365 write tools require "admin and Entra consent" — a hint that tenant-admin consent is the practical wall for any third-party app reading corporate mailboxes — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes)

**Slack**
- Marketplace review: reviewers "install and test the app, check TLS and request-signing behavior, and confirm the app asks only for the data it needs"; "moment-in-time review", no code review; changes to scopes/endpoints/listing require resubmission — [Slack: App Directory review process](https://slack.com/blog/developers/slack-app-directory-review-process)
- AI-specific requirements (per an approved vendor): disclosure of LLMs used, data retention/residency, statement that Slack data is not used to train models, AI accuracy disclaimers; "typical review process takes 2-3 months" though their own app was approved in ~2 weeks — [Viktor blog (secondary)](https://viktor.com/blog/slack-marketplace-ai-agent)
- Slack developer policy: "use of data to train an LLM is prohibited" — [Slack dev policy update, Dec 2024](https://docs.slack.dev/changelog/2024/12/10/dev-policy-update); June 2026 newsletter: new pre-submission checklist covering "external demand, multi-workspace support, and ongoing support readiness" — [Slack platform newsletter June 2026](https://slack.dev/newsletter/platform-newsletter-june-2026/); admins can require app approval per workspace — [Slack help: AI apps](https://slack.com/help/articles/33076000248851)

**Apple EventKit / Reminders**
- Reminders have **full access only**: "the app can't request read-only access to either events or reminders"; requires `NSRemindersFullAccessUsageDescription`; missing keys cause automatic denial on iOS 17+; events support `fullAccess` or `writeOnly` — [Apple: EKEventStore](https://developer.apple.com/documentation/eventkit/ekeventstore.md); [Apple: Accessing the event store](https://developer.apple.com/documentation/eventkit/accessing-the-event-store.md); [Create with Swift](https://www.createwithswift.com/getting-access-to-the-users-calendar/)
- No iOS 27-specific EventKit changes found.

**Notion / Linear / Todoist**
- Notion: "average of three requests per second per integration," bursts allowed, 429 + Retry-After; Notion "may set different limits for workspaces on different pricing plans"; Workers webhook ingress 600 req/hour, burst 60/min — [Notion rate limits](https://developers.notion.com/reference/rate-limits); [Notion Workers limits](https://developers.notion.com/workers/reference/limits)
- Linear: GraphQL leaky-bucket rate limiting, "limits may change"; third-party figures 1,500 req/hour (API key), 500 req/hour (OAuth app), 250,000 complexity points/hour; Linear "discourages polling"; webhooks with HMAC signatures — [Linear rate limiting](https://linear.app/developers/rate-limiting.md); [Rollout Linear guide (secondary)](https://rollout.com/integration-guides/linear/api-essentials)
- Todoist API v1 (merged REST+Sync): 1,000 requests per 15-minute window per user; 1,000 partial syncs and 100 full syncs per 15 minutes; webhooks for item add/update/complete and project changes, with possible duplicate/out-of-order delivery — [Rollout Todoist guide (secondary)](https://rollout.com/integration-guides/todoist/api-essentials); [apis.io (secondary)](https://apis.io/rate-limits/todoist/todoist-rate-limits/)

### Inferences
- Realistic budget line for Gmail read access: assessor fee $500–$4,500/yr (Google's figure) plus engineering time for remediation and the annual repeat; plan 1–2 months of calendar time before first external user beyond the test cohort. Calendar-only MVPs avoid CASA entirely, which argues for "calendar + task systems first, Gmail second".
- Microsoft tenant-admin consent, not Graph throttling, is the practical wall for corporate mailboxes; the 10k/10-min/mailbox limit is generous for a per-user assistant.
- Slack's 2–3 month marketplace review and no-training policy are manageable; the harder wall is workspace-admin app approval in enterprises.
- Apple's "full access only" for Reminders and no background entitlement for EventKit mean an iOS-native assistant can read everything but cannot run continuously; background work must come from BGTaskScheduler or a server.
- Notion's 3 rps and Linear's ~500 req/hour for OAuth apps are fine for one user but force caching/webhooks for anything that scans many pages or issues on a schedule.

### Gaps
- Could not verify the 100-user cap and 7-day refresh-token expiry for Google OAuth apps in "Testing" publishing status (search budget exhausted); treat as unconfirmed.
- Google Calendar push channel maximum TTL not found.
- Official Microsoft Graph throttling-limits page could not be fetched; concurrency scope (per tenant vs mailbox) remains contradictory between sources.
- Todoist official docs not fetched; limits are third-party.
- Unified-API middlemen (Nylas, Composio, Pipedream) pricing per connected account was not retrieved.

---

## Key Question 5: What does it cost per user per month to run the assistant through a frontier vs small model? Current token prices and realistic volumes.

### Takeaway
At October 2026 list prices the model bill for a once-a-day "read everything, write a brief + task list" run is roughly $0.40/user/month on Claude Haiku 5.5, ~$7.50 on Sonnet 5.5, ~$15 on Opus 5.5 and ~$37 on Fable 5.1; polling every few hours multiplies that 2–3x. Small/fast models from all three vendors now sit at $0.10–$0.50 per M input tokens, which makes the inference cost of a background assistant a rounding error compared with a $10–20/month subscription — unless frontier models are used for every check.

### Cited Findings

**Anthropic (official page, fetched Oct 24, 2026; USD per MTok, input / output; cache hit multiplier)**
- Claude Fable 5.1: $10 / $50; cache hits $0.25 (0.025x); Claude Mythos 5.1 same (limited availability) — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- Claude Opus 5.5: $4 / $20; cache hits $0.20 (0.05x). Claude Opus 5, 4.8, 4.7, 4.6, 4.5: $5 / $25 — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- Claude Sonnet 5.5: $2 / $10; cache hits $0.10. Claude Sonnet 5: $2 / $10 ("introductory pricing through August 31, 2026, is now the standard price. The previously scheduled increase to $3/$15... will not occur"). Sonnet 4.6/4.5: $3 / $15 — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- Claude Haiku 5.5: $0.10 / $0.50 for prompts up to 100,000 tokens; $0.50 / $2.50 for prompts over 100K. Claude Haiku 4.5: $1 / $5 — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- Batch API: "50 percent discount on both input and output tokens"; batch and caching discounts combine; "Claude 4.7 and later models... use a newer tokenizer... approximately 30% more tokens for the same text"; Claude 4.6+ (except Haiku 5.5) include 1M context at standard pricing; web search $10 per 1,000 searches; `inference_geo: "us"` adds 1.1x — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)

**OpenAI (official page unreachable; secondary, conflicting)**
- CloudZero (late 2026): GPT-6 Astra (Sept 3, 2026) $10 / $50; GPT-5.6 Sol $5 / $30; GPT-5.6 Terra $2 / $12; GPT-5.6 Luna $0.20 / $1.20 after a July 30, 2026 cut; cached input 10% of standard; Batch halves everything — [CloudZero (secondary)](https://www.cloudzero.com/blog/openai-api-pricing/)
- Morph (June 2026): GPT-5.5 $5 / $30; GPT-5.4 $2.50 / $15; GPT-5.4-mini $0.75 / $4.50; GPT-5.4-nano $0.20 / $1.25; GPT-5, GPT-5-mini, GPT-4o no longer listed — [Morph (secondary)](https://morphllm.com/openai-api-pricing)
- GPT-5.1: $1.25 / $10 as of Sept 15, 2026 — [anotherwrapper (secondary)](https://anotherwrapper.com/llm-pricing/gpt-5.1-high-2025-11-12)
- Plain "GPT-5" figures across tkmxai pages conflict ($5/$15, $12/$48, $15/$60) and should not be used — [IntuitionLabs (secondary)](https://intuitionlabs.ai/articles/chatgpt-api-pricing-2026-token-costs-limits)

**Google Gemini (official page unreachable; secondary, mostly consistent)**
- Gemini 3 Pro: $2.00 / $12.00 up to 200K prompt; $4 / $18 above 200K — [Puter tutorial (secondary)](https://developer.puter.com/tutorials/gemini-api-pricing/); [anotherwrapper (secondary)](https://anotherwrapper.com/llm-pricing/gemini-3-pro-preview)
- Gemini 3 Flash: $0.50 / $3.00 — [anotherwrapper (secondary)](https://anotherwrapper.com/llm-pricing/gemini-3-flash-preview)
- Gemini 3.1 Pro: conflicting $2.50 / $15 (Sept 15, 2026) vs $2 / $12 — [anotherwrapper (secondary)](https://anotherwrapper.com/llm-pricing/gemini-3.1-pro-preview); [mem0 (secondary)](https://mem0.ai/library/llms-and-models/gemini-api-pricing)
- Gemini 3.1 Flash-Lite: $0.25 / $1.50; batch 50% off — [anotherwrapper (secondary)](https://anotherwrapper.com/llm-pricing/gemini-3.1-flash-lite-preview)

**Volume anchors from the platforms themselves**
- Claude Duet "checks connected accounts every few hours to conserve limits" and "background checks count toward limits" — [Anthropic Duet blog](https://claude.com/blog/claude-duet)
- Apple's on-device model has a 4K context and the PCC model 32K — a hard ceiling on how much of a day's inbox can be processed locally in one pass — [Apple WWDC26 Group Lab](https://developer.apple.com/videos/play/wwdc2026/8016/)

### Inferences (cost model; assumptions are the researcher's, prices are from the sources above)
Assumptions (not sourced — no reliable 2026 email-volume statistic was retrievable before the search budget ran out): one knowledge worker generates ~100K tokens/day of triage-relevant text (email bodies trimmed, calendar JSON, Slack channels) and the assistant emits ~5K output tokens/day (brief + structured tasks). A ~5K-token system prompt is cached.

Scenario A — one consolidated morning run (3.0M input, 0.15M output per 30-day month):
- Haiku 5.5 (≤100K prompt tier): $0.30 + $0.08 ≈ **$0.38/user/month**; with Batch ≈ $0.19
- Haiku 4.5: $3.00 + $0.75 ≈ $3.75
- Sonnet 5.5 / Sonnet 5: $6.00 + $1.50 ≈ **$7.50**
- Opus 5.5: $12.00 + $3.00 ≈ **$15.00**
- Fable 5.1: $30.00 + $7.50 ≈ **$37.50**
- GPT-5.6 Luna (secondary price): $0.60 + $0.18 ≈ $0.78; GPT-5.6 Terra ≈ $7.80; GPT-5.5 ≈ $19.50
- Gemini 3.1 Flash-Lite (secondary): ≈ $0.98; Gemini 3 Flash ≈ $1.95; Gemini 3 Pro ≈ $7.80

Scenario B — Duet-style polling every ~3 hours with incremental deltas (≈2.5x input, 3x output: 7.5M in, 0.45M out):
- Haiku 5.5 ≈ **$0.98**; Sonnet 5.5 ≈ **$19.50**; Opus 5.5 ≈ **$39**; Fable 5.1 ≈ $97.50
- Add ~30% to input counts for Claude 4.7+ tokenizer when estimating from character counts.

Design implications: route the bulk read/classify pass to a $0.10–$0.50/M-input model and reserve a frontier model for the few items judged ambiguous or for the final brief; cache the system prompt and the day's running context (cache hits are 0.025–0.1x input price); use Batch for the overnight run. Under that routing, inference should stay under ~$1–3/user/month, leaving room under a $10–15 subscription. Running everything on Opus/Fable-class models makes a consumer price point impossible.

### Gaps
- OpenAI and Google official pricing pages could not be fetched; model names (GPT-5.6 "Luna/Terra/Sol", GPT-6 "Astra", Gemini 3.1 Pro at $2.50) appear in only one or two secondary sources each and conflict. Treat all OpenAI/Gemini numbers as indicative.
- No sourced statistic for emails/Slack messages per knowledge worker per day in 2025–26; the 100K tokens/day figure is an assumption.
- Platform subscription prices (Claude Pro/Max, ChatGPT Plus/Pro, Google AI Plus/Pro/Ultra beyond the $100 Ultra mention, M365 Copilot seat) were not re-verified this pass.

---

## Key Question 6: Privacy-preserving / local options (on-device models, Apple Foundation Models, local Llama/Gemma) — are they good enough?

### Takeaway
Apple's Foundation Models framework now gives iOS/macOS 27 apps a free on-device model (4K context, no image output, rate-limited under load on iOS) and, new this year, a switchable Private Cloud Compute server model with 32K context and reasoning — enough for per-message classification and extraction but not for whole-inbox reasoning. Open-weight Gemma 4 runs usefully on 8–16 GB laptops, but reviewers still place local output "a few steps below" frontier models; the realistic privacy architecture is hybrid: local for classification/PII scrubbing, cloud for synthesis.

### Cited Findings
- Apple WWDC26 Group Lab: "on device you have 4K"; "With the server model on private cloud you have 32 k"; switch between them "with a simple line of code... It could be an if statement"; PCC model supports settable reasoning levels; image input added this year for both; new "Language model protocol" lets any model (cloud or Core ML) sit behind the same Swift API for prompting and tool calling; new "dynamic profiles" API for multi-model handoffs; on iOS "requests may be rate-limited" under load, background requests deprioritized, "On macOS, rate limiting 'does not apply at all'"; on-device works offline, PCC needs network; on-device model changes only with OS updates ("twice a year, typically we have a big update"); no pricing stated; recommend bundled models stay "below two gigabytes" on iOS — [Apple WWDC26 session 8016](https://developer.apple.com/videos/play/wwdc2026/8016/)
- Earlier developer experience (iOS 26 era): on-device model is free to call but PCC had no published developer pricing; the model isn't fine-tunable, "black-box approach limits deep customization"; excludes devices that cannot run Apple Intelligence; limited language set at launch — [Etnetera Flow (secondary)](https://flow.etnetera.cz/blog/on-device-ai-with-apple-foundation-models-what-i-learned-building-with-it); [Infinum (secondary)](https://infinum.com/blog/apple-on-device-ai/); [PhoneArena](https://www.phonearena.com/news/apple-announces-foundation-models-framework-to-give-developers-direct-access-to-apple-intelligence_id171162)
- Apple's next-gen Foundation Models are "built on Gemini and Google cloud technology" but "not exposed as a raw Gemini API" — [T3](https://www.t3.com/tech/ai/new-apple-intelligence-and-siri-confirmed-by-google); [LetsDataScience (secondary)](https://letsdatascience.com/news/apple-adopts-google-gemini-for-foundation-models-0c25bad2)
- Gemma 4 (open weights, 2026): E4B variant "runs on 6-8 GB of VRAM and beats Gemma 3 27B"; Llama 4 Scout "needs 24 GB minimum even quantized" — [Codersera (secondary)](https://codersera.com/blog/gemma-4-vs-llama-4-local-deployment-2026/amp/); Gemma 4 12B runs text/image/audio/video on a 16 GB laptop and "nearly matches the twice-as-large 26B model" (Google claim via blog); ~21 tok/s on RTX 4060 quantized ("reportedly") — [Hongkiat (secondary)](https://www.hongkiat.com/blog/run-gemma-4-locally/); [NYU Shanghai RITS (secondary)](https://rits.shanghai.nyu.edu/ai/google-releases-gemma-4-12b-frontier-multimodal-ai-on-a-laptop/); Gemma 4 31B 85.2% MMLU-Pro vs ~82% Llama 4 Scout; 26B MoE 88.3% AIME 2026 with 3.8B active params (unverified against model card) — [BuildFastWithAI (secondary)](https://www.buildfastwithai.com/blogs/gemma-4-12b-guide)
- Italian reviewer: local responses are "generally a few steps below leading commercial models" — [Tech-Insider (secondary, Italian)](https://tech-insider.org/it/?p=572)
- Platform-side privacy posture for comparison: Claude memory excludes "sensitive topics like health" unless enabled and is off by default for Team/Enterprise; Duet shares health/personal-finance info "only when you explicitly instruct it to" and never sees passwords — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes); [Anthropic Duet blog](https://claude.com/blog/claude-duet)
- Anthropic offers `inference_geo: "us"` at 1.1x for data residency — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)

### Inferences
- A 4K on-device context fits one email or one meeting transcript chunk, not a day's inbox; the viable on-device pattern is per-item classification (urgent/not, has-action-item/not, extract date) with results aggregated client-side, then an optional cloud pass on a redacted summary. PCC's 32K is enough for a daily brief over pre-filtered items, and it inherits Apple's privacy branding at no API cost (pricing still unpublished — a risk).
- Mac is the easiest "fully local" target: no Foundation Models rate limiting on macOS, 16 GB machines run Gemma 4 12B, and EventKit/Mail data are already local. iPhone-only local processing is constrained by thermal rate limiting and background deprioritization.
- Enterprise buyers already have Copilot/Gemini/Claude with admin controls and residency; "privacy" as a differentiator for a third-party app lands mainly with privacy-sensitive individuals and small firms outside M365/Workspace enterprise tiers.

### Gaps
- No independent benchmark of on-device models specifically on email-triage or task-extraction tasks.
- Apple has not published Private Cloud Compute developer pricing or quotas; whether PCC access survives GA of iOS 27 unchanged is unknown.
- Gemma 4 benchmark numbers are from blogs and were not checked against Google's model card.

---

## Key Question 7: Architectural patterns for an "agent that watches your work" (polling vs webhooks, memory stores, scheduled runs, evals) and known failure modes (hallucinated tasks, wrong dates, over-notification)

### Takeaway
Practitioners and the platforms themselves converge on: poll or subscribe with a 7-day watch/subscription renewal loop; run on a schedule in isolated cloud sessions; keep memory as curated, editable entries with a consolidation job; gate every outbound action behind approval; and treat email content as attacker-controlled. The documented failure modes are hallucinated facts/meeting times, silent reasoning errors with no tool error, guessed parameters, memory that "degrades or dies quietly", prompt injection, and urgency misjudgement; no public precision/recall numbers for task extraction exist.

### Cited Findings

**Polling vs webhooks**
- Nylas recommends polling for support inboxes: "Polling every 5–15 minutes is simpler and the latency is acceptable"; webhook fan-out gets complicated with multiple recipients — [Nylas email agent cookbook](https://developer.nylas.com/docs/cookbook/agents/email-support-agent.md)
- Google: Gmail watch must be renewed at least every 7 days (daily recommended); Calendar: push preferred because per-user polling consumes per-minute quota linearly with users — [Gmail push guide](https://developers.google.com/workspace/gmail/api/guides/push?authuser=2); [Calendar quota](https://developers.google.com/workspace/calendar/api/guides/quota?hl=fr)
- Microsoft: subscriptions expire and emit `missed` lifecycle events under throttling; must handle `reauthorizationRequired` — [Graph lifecycle events](https://learn.microsoft.com/en-us/graph/webhooks-lifecycle?tabs=http)
- Linear discourages polling; Todoist webhooks may be duplicated or out of order — [Linear rate limiting](https://linear.app/developers/rate-limiting.md); [Rollout Todoist (secondary)](https://rollout.com/integration-guides/todoist/api-essentials)
- Claude Duet polls "every few hours" and admits it may "miss an email that arrives between checks" — [Anthropic Duet blog](https://claude.com/blog/claude-duet); [iPhoneSoft (secondary)](https://iphonesoft.fr/2026/10/21/claude-duet-anthropic-agent-ia-toujours-actif)

**Scheduled runs / isolation**
- Claude Code Routines: "Each run is a fresh, isolated cloud session"; triggers cron, API, GitHub event — [Makerkit (secondary)](https://makerkit.dev/blog/tutorials/claude-code-routines-guide); Cowork scheduled tasks "run with no device online" — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes); OpenAI Workspace Agents "run in the cloud and can keep working when users are inactive" — [Decrypt](https://decrypt.co/365220/openai-workspace-agents-feature-chatgpt); Anthropic Managed Agents emit "a webhook when it's done" — [Anthropic recap](https://www.claude.com/blog/code-w-claude-sf-2026-sf)

**Memory**
- Anthropic "Dreaming": scheduled consolidation that "reviews past agent sessions, surfaces patterns, and curates memory" — [Anthropic recap](https://www.claude.com/blog/code-w-claude-sf-2026-sf); consumer memory as "individual, categorized entries" the user can edit — [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes)
- Sept 2026 paper names four failure types in months-long agent memory: knowledge loss from compaction, repeated work, context degradation from over-injection, and "the memory system itself degrades or dies quietly, while everyone keeps trusting it" — [arXiv 2609.05510](https://arxiv.org/pdf/2609.05510)
- March 2026 survey flags write-path filtering, contradiction handling, latency budgets and privacy governance; evaluation has shifted to multi-session agentic tests — [arXiv 2603.07670](https://arxiv.org/pdf/2603.07670)
- Microsoft Research (May 2026) human-inspired memory with consolidation/forgetting matched raw retrieval on LongMemEval (70.1% vs 71.2%, overlapping CI) at 200K budget while exposing an accuracy/store-size tradeoff — [Microsoft Research](https://www.microsoft.com/en-us/research/?p=1172503)
- Benchmarks named for memory: RULER, LongBench v2, BABILong, τ-bench replay variants; check "that writes did not corrupt prior facts, and that stale entries do not silently poison new reasoning" — [FutureAGI glossary (secondary)](https://futureagi.com/glossary/agent-memory/)

**Evals / reliability**
- Anthropic Outcomes: rubric + separate grader "lifted task success by up to 10 points on the hardest problems" — [Anthropic recap](https://www.claude.com/blog/code-w-claude-sf-2026-sf)
- Apple recommends re-running evaluations because the PCC model "can change over time", and Xcode can compare on-device vs PCC side by side with synthetic test data — [Apple WWDC26 session 8016](https://developer.apple.com/videos/play/wwdc2026/8016/)
- Sentry: a run "can complete without a single tool error and still reach the wrong conclusion"; agents "guessing at parameters... instead of looking them up" is a distinct failure mode — [Sentry cookbook](https://sentry.io/cookbook/automate-ai-agent-triage-claude-routines/)

**Known failure modes**
- Hallucination: models "invent meeting times, reference documents that don't exist, or misquote prior messages in a thread"; context leaking between customers in batch processing — [Nylas human-in-loop guide](https://cli.nylas.com/guides/build-human-in-loop-email-agent) (its "15-25% factual error" statistic attributed to Stanford HAI could not be verified)
- Prompt injection: "email is attacker-controllable and prompt-injectable, so its triage runs propose-only" with proposal cards a human approves — [Vexa docs](https://docs.vexa.ai/how-to/email-triage.md); Anthropic Duet's defenses "draw on Anthropic's browser-use research", with red-team, external pentest and bug bounty — [Anthropic Duet blog](https://claude.com/blog/claude-duet)
- Urgency misjudgement: Duet "still might misread a thread or miscalibrate what's urgent" — [Anthropic Duet blog](https://claude.com/blog/claude-duet); Spark "occasionally struggled with context" — [iTechPost](https://www.itechpost.com/articles/236197/20260602/gemini-spark-ai-agent-review-testing-features-capabilities-productivity-tools.htm); Copilot agents "sometimes loses context" — [SoftwareReviews](https://www.softwarereviews.com/products/microsoft-365-copilot-ai-agents?c_id=523)
- Over-notification controls as a product feature: Duet lets you "choose what updates you receive and how often"; Claude added "break reminders and quiet hours" (Jul 9, 2026) — [Anthropic Duet blog](https://claude.com/blog/claude-duet); [Anthropic release notes](https://support.claude.com/en/articles/12138966-release-notes)
- Mitigation pattern: "separating parse, enrich, and act gives you control points to inject business rules"; ambiguous cases go to "escalation with a short uncertainty note" rather than a guess — [Rework blueprint (secondary, German)](https://resources.rework.com/de/libraries/ai-agents/ai-email-triage-agent); [Nylas human-in-loop guide](https://cli.nylas.com/guides/build-human-in-loop-email-agent)

### Inferences
- A solo builder's minimum viable architecture: (1) Gmail watch + Pub/Sub or Graph subscriptions with a daily renewal cron, falling back to 5–15 min polling for Slack/Todoist/Notion; (2) a scheduled "consolidation" job (morning brief) plus event-driven micro-classifications; (3) memory as a small, user-visible table of typed entries (people, projects, recurring commitments) with a nightly dedupe/contradiction pass; (4) a propose/approve queue for every write; (5) a regression eval set of real (consented) emails/meetings with labelled tasks and dates, re-run on every model/prompt change, since vendor server models change silently.
- Date/time correctness is the most under-measured failure: none of the sources quantify wrong-date rates, yet "invent meeting times" is explicitly listed. Deterministic date parsing (dateparser/rules) with the LLM only choosing among candidates is the obvious mitigation and a credible differentiator.
- Because every platform already throttles to "every few hours" to protect its own compute, a third-party app that uses cheap models to react within minutes has a real latency advantage — but must then manage over-notification more carefully than the platforms do.

### Gaps
- No public dataset or published precision/recall for action-item extraction from email/meeting transcripts in 2025–26 was found.
- No quantified user-complaint data on over-notification for Pulse, Daily Brief, Duet or Copilot.
- The "15–25% factual error" statistic (Nylas citing Stanford HAI) could not be verified and should not be cited as fact.
- EchoLeak-style zero-click injection incidents against Copilot/Gemini were not re-verified (search budget exhausted); the general injection risk is sourced via Vexa/Anthropic.
