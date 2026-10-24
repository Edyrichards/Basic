# AI-Powered Personal Productivity and Daily Work-Planning Apps: Landscape as of October 2026

Research date: 2026-10-24. Method note: WebSearch worked; direct WebFetch/curl of vendor sites (usemotion.com, risecalendar.com, sifted.eu, doodle.com) was blocked by the sandbox proxy (DNS/403), so pricing and feature claims below come from search-surfaced primary announcements, app-store listings, changelogs and (heavily) vendor-authored comparison blogs. Where a figure comes only from a competitor's blog or an SEO aggregator, it is flagged. Facts dated 2024 or earlier are explicitly dated.

## Key Question 1: Which products dominate "plan my day" / auto-scheduling, and what exactly does each AI feature do?

### Takeaway
Three products own the individual auto-scheduling niche in 2026: Motion (fully AI-managed calendar, now pivoting hard to "AI Employees" for SMBs, $550M valuation), Reclaim.ai (calendar defense for habits/tasks/focus time, owned by Dropbox since Aug 2024) and Morgen (AI Planner that drafts a plan into user-defined "Frames" for approval). Sunsama and Akiflow remain ritual/inbox-centric planners with lightweight AI assistants ("Sunny", "Aki"); the big to-do apps (Todoist, TickTick, Any.do) have bolted on LLM features (task breakdown, voice capture, MCP servers) rather than auto-scheduling; and the enterprise suites (Notion, ClickUp, Asana) sell AI for workspace Q&A and meeting notes, not personal time-blocking.

### Cited Findings

**Motion (usemotion.com)**
- Positioning: the most-cited "hands-off" auto-scheduler; uses priority and deadline to decide when to work on each item so deadlines are hit; no free plan, 7-day trial only — [Efficient.app (run by Motion's team, so vendor-biased)](https://efficient.app/best/daily-planner); [Lindy blog (competitor)](https://www.lindy.ai/blog/motion-app-pricing)
- Pricing (2026, per competitor Morgen's breakdown): Pro AI $49/mo or $29/mo annual with 7,500 AI credits/mo; Business AI $69/mo or $39/mo annual with 15,000 credits; overage $0.39 per 100 credits (Pro) / $0.26 (Business); team seats from $29/seat monthly or $19/seat/mo annual — [Morgen: Motion Pricing 2026](https://morgen.so/blog-posts/motion-pricing); [Morgen: Motion Review 2026](https://www.morgen.so/blog-posts/motion-review)
- Funding/scale: raised $60M at a $550M valuation (announced Sept 5, 2025), Series C led by Scale Venture Partners, framed as building an "agentic work suite" for SMBs — [BusinessWire press release](https://www.businesswire.com/news/home/20250905188051/en/Motion-Raises-$60M-at-$550M-Valuation-to-Build-the-Agentic-Work-Suite-for-Businesses); [SignalFire](https://signalfire.com/blog/motion-investor); one report splits it as a $38M Series C (5x oversubscribed) plus a C2 round — [iTiger/Pulse2](https://www.itiger.com/news/1139427305); [Pulse2](https://pulse2.com/motion-60-million-raised-at-550-million-valuation-for-scaling-agentic-work-suite/amp/)
- "AI Employees" launched May 2025; reported ~$10M ARR within 3-4 months and 10,000+ B2B customers, within "mid-8-figure" overall B2B ARR growing 3x YoY (company/interview figures, not audited) — [Reworked](https://www.reworked.co/the-wire/motion-raises-60m-at-550m-valuation-to-build-the-agentic-work-suite-for-businesses/); [Pulse2](https://pulse2.com/motion-60-million-raised-at-550-million-valuation-for-scaling-agentic-work-suite/amp/)
- Founded 2019 by Harry Qi, Omid Rooholfada, Ethan Yu; YC W20 — [YC directory](https://www.ycombinator.com/companies/motion)
- Behavioral critique: "fights you on short-notice changes," suits people who plan the week ahead — [Business Dive](https://thebusinessdive.com/category/daily-planners/page/2)

**Reclaim.ai (Dropbox)**
- Acquired by Dropbox, announced Aug 2024; founded 2019 by Henry Shapiro and Patrick Lightbody; ~25 staff joined Dropbox; terms undisclosed; at acquisition claimed 320,000+ users at 43,000+ companies; investors Index Ventures and Calendly; had raised ~$13M — [TechCrunch, Aug 22 2024](https://techcrunch.com/2024/08/22/dropbox-acquires-index-ventures-backed-ai-scheduling-tool-reclaim-ai/?rand=23331); [GeekWire](https://geekwire.com/2024/dropbox-acquires-reclaim-a-calendar-app-that-uses-ai-scheduling-to-boost-productivity/). One aggregator cites a $40.2M price, unconfirmed — [Hackceleration review](https://hackceleration.com/labs/review/reclaim)
- Positioned alongside Dropbox Dash (universal search) as the AI calendar assistant — [Reworked](https://www.reworked.co/digital-workplace/dropboxs-acquisition-of-reclaim-is-about-more-than-just-scheduling/)
- What the AI does: automatically protects calendar time for tasks, habits, deep work and breaks; "Smart Meetings" auto-find/move meeting slots — [Efficient.app](https://efficient.app/best/daily-planner); [Carly review (competitor)](https://www.usecarly.com/blog/reclaim-ai-review/)
- Pricing (2026, conflicting third-party figures): free "Lite" tier; Starter ~$8-12/user/mo; Business ~$12-18/user/mo; annual ~20% off — [Subger (aggregator, July 2026)](https://subger.com/en/service/reclaim-ai); [Costbench free-plan page](https://costbench.com/software/ai-productivity/reclaim-ai/free-plan/); [Marc Andrews UK pricing post](https://marcandrews.com/reclaim-ai-pricing-2026-is-it-worth-paying-for-in-the-uk/). Free-tier Smart Meeting limits reported variously as 1 or 3/week.
- Outlook support reported as live by one source, "still in beta" by another — [Costbench](https://costbench.com/software/ai-productivity/reclaim-ai/free-plan/); [Carly](https://www.usecarly.com/blog/reclaim-ai-review/)
- Became the designated landing spot for Clockwise refugees in March 2026, price-matching Clockwise — [TechRadar](https://www.techradar.com/pro/salesforce-recuits-team-behind-calendar-app-clockwise-into-agentforce)

**Morgen (morgen.so)**
- AI Planner schedules tasks into "Frames" (time templates for kinds of work) using task filters, a "Morgen Priority Factor" and availability; produces a plan in preview mode that the user reviews, adjusts and approves; without Frames it still suggests tasks but timing is "unlikely to be ideal" — [Morgen guide, Feb 20 2026 (vendor)](https://www.morgen.so/guides/plan-your-day-using-the-ai-planner)
- Vendor positioning vs Motion: Morgen "keeps you in control of AI-generated plans," Motion "opts for a fully AI-managed schedule" — [Morgen vs Motion page, Mar 2026 (vendor)](https://www.morgen.so/es/motion-vs-morgen)
- Exposes itself to LLMs/agents via a "for AI" page — [Morgen for AI & LLMs](https://www.morgen.so/for-ai)
- Pricing: ~$30/mo monthly or $15/mo annual individual; Team ~$10/user/mo annual (2-seat min); 14-day trial, no card — [Morgen Akiflow-pricing post (vendor)](https://www.morgen.so/blog-posts/akiflow-pricing); [Morgen Motion-pricing post](https://morgen.so/blog-posts/motion-pricing)

**Sunsama**
- AI deliberately lightweight: AI time estimates from past tasks/timer data, AI category suggestions, Daily Highlights summary at shutdown; chat assistant "Sunny" can create tasks, organize backlog and run the daily-planning routine; hosts an MCP server so ChatGPT/Claude can manage Sunsama data; does NOT auto-schedule or rebuild the calendar when priorities shift — [Releasebot Sunsama release notes, Apr 2026](https://releasebot.io/updates/sunsama); [Temporal.day comparison](https://temporal.day/blog/sunsama-vs-motion); [Alfred blog (competitor)](https://get-alfred.ai/blog/sunsama-vs-motion); one source says Sunsama "don't plan on leveraging AI" for daily planning — [Efficient.app](https://efficient.app/apps/sunsama)
- Pricing in flux: $20/mo annual or $25 monthly per Morgen's April 2026 post; newer sources show $17 annual / $22 monthly after a 14-day trial; no free tier — [Morgen Sunsama pricing (vendor)](https://www.morgen.so/blog-posts/sunsama-pricing); [Carly Sunsama review](https://www.usecarly.com/blog/sunsama-review/); [Selfmanager.ai](https://selfmanager.ai/articles/sunsama-pricing)

**Akiflow**
- Assistant "Aki": vendor-side sources say it automates routines, auto-schedules tasks, manages recurring events, sends overload alerts, handles voice commands and daily briefings; skeptical reviews call it a "capture assistant" with no cross-person coordination; Akiflow MCP reported live — [App Store listing](https://apps.apple.com/us/app/akiflow-ai-planner-calendar/id1621279084); [Catchagent review](https://www.catchagent.ai/blog/reviews/akiflow-review); [Carly review](https://www.usecarly.com/blog/akiflow-review/)
- Pricing: $34/mo monthly or $19/mo annual, 7-day trial; a cheaper "Believer" plan requires a 2-year commitment — [Morgen Akiflow pricing (vendor)](https://www.morgen.so/blog-posts/akiflow-pricing); [Saaspartout](https://saaspartout.com/marketplace/akiflow/)
- Scale (third-party estimates only): ~$1.6-1.9M raised ($130K seed Aug 2020, $1.8M in 2022), ~20 staff; GetLatka's $200K revenue / 200 customers estimate looks stale — [SeedTable](https://seedtable.com/startups/Akiflow-VWER4A9); [GetLatka](https://getlatka.com/companies/akiflow/vs/n)
- Pulls tasks from Asana, ClickUp, Notion etc. into one inbox — [Lindy blog](https://www.lindy.ai/blog/ai-task-management)

**Routine (routine.co)**
- Routine 3.0 released Oct 5, 2026 with native iOS and Android apps; "Routine AI" shipped July 21, 2026 "built on top of your existing workspace"; integrations with Gmail, Todoist, Asana, Microsoft To Do; $5/mo Personal plan — [Routine changelog](https://feedback.routine.co/changelog); [routine.co](https://routine.co/)
- Reviews mixed; one calls it "one of the buggiest tools"; Product Hunt page still mentions waitlist (likely stale) — [Efficient.app Routine review](https://efficient.app/apps/routine); [Product Hunt](https://www.producthunt.com/products/routine)

**Amie**
- Has shifted its homepage to lead with "AI Note Taker without a bot"; AI features: NLP event entry, AI chat for task scheduling, AI scheduling of unscheduled todos into gaps — [ClickUp Amie review](https://clickup.com/blog/amie-calendar-review/); [Lifestack Amie pricing (competitor)](https://lifestack.ai/blog/amie-app-pricing)
- Pricing conflicts badly: Pro $20/user/mo annual and Business $40 (no free plan) vs. $25/$20 with 7-day trial vs. free Personal + Pro $12.50 — [ClickUp](https://clickup.com/blog/amie-calendar-review/); [Lifestack](https://lifestack.ai/blog/amie-app-pricing); [Subger](https://subger.com/en/service/amie)
- Platform limits: Google accounts; Outlook only via Apple Calendar; no Android — [Nocal alternatives page (competitor)](https://nocal.app/alternatives/amie)
- No evidence of shutdown or acquisition as of Oct 2026 — search returned none.

**Vimcal**
- Keyboard-first fast calendar with "EA" scheduling tier; pricing conflicts: Individual $15/mo; Standard $20/mo or $16.67 annual; EA $75/mo or $62.50 annual; free tier iOS-only; 14-day trial — [Toolradar (updated Jan 27 2026)](https://toolradar.com/tools/vimcal-app/pricing); [Lifestack Vimcal pricing](https://lifestack.ai/blog/vimcal-pricing); [AISoTools review June 2026](https://aisotools.com/blog/vimcal-review-2026). No source gave a clear breakdown of Vimcal's AI specifically.

**Trevor AI**
- Predicts task durations, finds slots, suggests best time per task; Google Play update Oct 2, 2026 ("newer Android support") contradicts Morgen's "web only" listing; no routine/habit support — [Google Play](https://play.google.com/store/apps/details?id=com.trevordpk.trevorai&hl=en); [Morgen AI planning assistants post](https://www.morgen.so/blog-posts/best-ai-planning-assistants)

**Todoist**
- "Todoist Assist" launched across all paid tiers: breaks vague goals into subtasks, suggests labels/priorities, proposes due dates from past patterns, generates daily plans; "Ramble" voice-to-task powered by Google Gemini 2.5 Flash Live, 38 languages; official MCP server — [Toolszai Todoist AI review](https://toolszai.com/tool/todoist-ai/); [2sync comparison](https://2sync.com/blog/ticktick-vs-todoist); [Temporal.day](https://temporal.day/blog/ticktick-vs-todoist-2026)
- Pricing reported inconsistently ($60/yr Pro vs ~$4-5/mo) — [Max-productive review](https://max-productive.ai/ai-tools/todoist/)

**TickTick**
- MCP integration; "AI Mode" voice input arrived 2026; subtask generation and smart date parsing; reviews say AI "still trails Todoist"; bundles Pomodoro, habit tracker, Eisenhower matrix, full calendar — [TechHarry review Sept 2026](https://www.techharry.com/2026/09/tick-tick-review.html); [Temporal.day](https://temporal.day/blog/ticktick-vs-todoist-2026)

**Things 3 (Cultured Code)**
- No Things 4 release or announcement found; still one-time purchase with free sync; recent updates are platform support (iPadOS 26) — [iMore](https://www.imore.com/apps/things-3-is-the-king-of-productivity-apps-so-do-we-even-need-a-things-4); [Wikipedia](https://en.wikipedia.org/wiki/Things_(software)); [G2](https://www.g2.com/sellers/cultured-code). No AI features surfaced.

**Any.do**
- "Plan My Day" morning prompt reviews tasks + calendar, AI flags repeatedly deferred items; Any.do AI fills lists, breaks tasks into subtasks, builds board checklists; Voice Mode capture — [Any.do blog (vendor)](https://www.any.do/blog/the-best-ai-daily-planner-app-in-2026-why-any-do-stands-out/); [Any.do support article](https://support.any.do/en/articles/8637385-any-do-ai)
- Premium pricing conflicting: $2.99/mo annual vs $59.99/yr — [aiexpo listing](https://aiexpo.app/pages/tool?slug=any-do)

**Structured**
- Available iOS, Android, Mac; voice-driven AI to organize the day; recurring routine templates — [Morgen AI planning assistants post](https://www.morgen.so/blog-posts/best-ai-planning-assistants)

**Tiimo** (ADHD/neurodivergent visual planner)
- Runs on iPhone, Apple Watch, iPad, Android, Mac, browser; Android lacks widgets and AI assistant; free plan plus paid; prices conflict ($7.99/mo or $79.99/yr vs $5.99/mo or $47.99/yr vs ~$54.99/yr); App Store IAPs $11.99-$54 — [Lifestack Tiimo pricing](https://lifestack.ai/blog/tiimo-pricing); [Neurolaunch Android piece](https://neurolaunch.com/tiimo-android-availability/); [App Pricing Lab](https://apppricinglab.com/iap/apple/1480220328); [AISoTools](https://aisotools.com/blog/tiimo-review-2026)

**Superlist**
- v1.57.0 (Aug 16, 2026) added weekday-recurring tasks, activity log, multiselect drag; v1.56.0 (June 28) activity heatmap; AI Meeting Notes (summaries, action items) on higher tier; paid from $5/person/mo ($59/yr) — [Dupple Superlist review](https://dupple.com/reviews/superlist); [App Store](https://apps.apple.com/us/app/superlist-to-do-list-notes/id1547585270); [Google Play](https://play.google.com/store/apps/details?id=com.superlist.superlist&hl=en)

**Notion / Notion Calendar / Notion AI**
- Notion Calendar (ex-Cron, acquired June 2022) is drag-tasks-manually, free with Notion account, no auto-scheduling AI — [Lifestack Notion pricing](https://lifestack.ai/blog/notion-pricing); [Wikipedia](https://en.wikipedia.org/wiki/Notion_(productivity_software))
- Notion killed the standalone $10/mo AI add-on in May 2025 and bundled AI into the $20/user/mo Business plan; Custom Agents (scheduled/triggered) billed at $10 per 1,000 Notion credits; AI Meeting Notes auto-captures from calendar-linked meetings; Free/Plus get only a limited AI trial — [Firebear Studio](https://firebearstudio.com/blog/what-is-notion.html); [gptprompts.ai pricing explainer](https://gptprompts.ai/notion-ai-pricing); [Fast.io review](https://fast.io/resources/notion-ai-review-2026/). One source still lists Business at $18 and a $10 add-on (likely stale).
- Notion Calendar won a 2024 Golden Kitty (Personal Productivity) — [Product Hunt awards](https://www.producthunt.com/products/notion/awards)

**ClickUp Brain**
- AI add-on ~$9/user/mo (names vary: Brain, Brain MAX); "Everything AI" add-on $28/user/mo introduced Jan 2026 including notetaker; "Brain2" rebuilt AI platform launched June 2026 (no pricing found); base plans Free / Unlimited $7 / Business $12; strength is workspace Q&A, not personal time scheduling — [Eesel ClickUp Brain review](https://www.eesel.ai/blog/clickup-brain); [Agiled ClickUp pricing](https://agiled.app/blog/clickup-pricing); [ClickUp changelog](https://clickup.com/learn/topic/project-management/tools/clickup/news/); older $5/user figure — [Lindy blog](https://www.lindy.ai/blog/ai-task-management)

**Asana AI**
- AI bundled in Starter at $10.99/user/mo; builds project plans from briefs, priority suggestions, automated reporting; "assists but does not manage or schedule for you"; free Personal plan capped at 2 users since Nov 2025 (one source says 10) — [Agiled compare](https://agiled.app/compare/clickup-vs-asana); [Teamwork blog](https://www.teamwork.com/blog/ai-task-manager/); [Cut-the-SaaS](https://cut-the-saas.com/guides/clickup-vs-asana). Nothing found on "AI Teammates."

**Lindy (lindy.ai)** — agent builder marketed as AI assistant
- 2026 plans: Plus $29.99/user/mo (3,000 credits), Pro $99.99 (15,000), Max $199.99 (35,000), pooled credits, $10 per 1,000 top-up, month-to-month only; older guides list $49.99/$59.99 (outdated) — [Automatereal](https://automatereal.com/blog/lindy-ai/); [Nocode.mba](https://www.nocode.mba/articles/lindy-ai-pricing); [Getmacha](https://www.getmacha.com/blog/lindy-ai-pricing-explained)

**Fyxer AI** (email/calendar executive assistant)
- Series A $10M (Mar 2025); Series B $30M (~€25.5M, Sept 2025) led by Madrona with Lakestar; earlier backers 20VC, 20Growth, Marc Benioff; ARR from $1M to $17M in ~8 months; 180,000+ users; 90% 3-month retention; ~48 staff; next phase "natural language chat" — [Unite.AI](https://www.unite.ai/fyxer-ai-raises-30m-as-demand-surges-its-ai-powered-email-and-producttivity-assistant); [Startups Magazine](https://startupsmagazine.co.uk/article-fyxer-ai-secures-30m-expand-ai-executive-assistant-platform); [Silicon Canals (says $16M by Aug 2025)](https://siliconcanals.com/london-fyxer-secures-25-5m/); [Sifted](https://sifted.eu/articles/ai-exec-assistant-startup-fyxer-raises-30m-to-expand-to-the-us); [StartupIntros Series A](https://startupintros.com/news/2025-03-01-fyxer-ai-series-a). Valuation conflicts: $200M (Salestools) vs ~$60M estimate (Caplight/Premier Alts) — [Salestools](https://salestools.io/nl/report/frxer-ai-raises-30m-series-b); [Caplight](https://www.caplight.com/company/fyxer-ai)

**Shortwave** (AI Gmail client with "Tasklet" agents)
- Pricing most consistently Business $24/seat/mo annual ($30 monthly), Premier $36, Max $100; no permanent free tier, 14-day trial; one Sept 2026 review lists a $18 "Pro (individuals)" tier (conflict) — [Techvernia](https://techvernia.com/pages/reviews/productivity/shortwave.html); [AISoTools Sept 2026](https://aisotools.com/blog/shortwave-review-2026); [AIToolScoop](https://aitoolscoop.com/tool/shortwave/)

**Dola / Toki**
- Dola (chat-based AI calendar via messaging) rebranded as Toki (toki.com); free plan up to 3 synced calendars, paid $3.99 and $9.99/mo; heydola.com no longer resolves (checked Sept 28 2026) — [Agent Finder](https://agent-finder.co/reviews/dola); [AISoTools pricing page](https://aisotools.com/pricing/dola-ai)

**Platform players**
- Google: Gemini in Calendar suggests meeting times (Business Standard/Plus, Enterprise, AI Pro for Edu; desktop only); Gmail "Help me schedule" 1:1 only (Oct 2025); Gemini side panel in Calendar (Mar 2025); 2026 Android teardown found unreleased "Ask Gemini to schedule" — [TechCrunch Oct 14 2025](https://techcrunch.com/2025/10/14/googles-gemini-can-now-help-you-schedule-google-calendar-meetings); [TechCrunch Mar 7 2025](https://techcrunch.com/2025/03/07/google-adds-a-gemini-panel-to-calendar-to-help-you-manage-your-schedule/); [Gend.co](https://www.gend.co/blog/google-gemini-calendar-meeting-suggestions); [Jetstream teardown](https://jetstream.blog/en/google-calendar-ask-gemini-to-schedule-app-teardown/)
- Apple: iOS 26 Apple Intelligence suggests reminders from shared text/sites; Reminders Auto-Categorize; no AI planner — [Apple Support](https://support.apple.com/124025); Apple acquired Mayday Labs (AI auto-scheduler) April 2024 per EC filing, never explained why — [MacRumors May 9 2025](https://macrumors.com/2025/05/09/apple-acquired-mayday-labs)

### Inferences
- The field has bifurcated: "autopilot" (Motion, Reclaim, Trevor, Mayday-style) vs "copilot with approval step" (Morgen Frames preview, Sunsama Sunny, Akiflow Aki). Morgen and Sunsama explicitly market the human-in-the-loop stance as a feature, suggesting user backlash against fully automatic rescheduling is a real segment.
- Motion's $550M raise and "AI Employees" pivot mean the leading consumer auto-scheduler is now primarily an SMB agent suite; individual-plan pricing ($29-49/mo plus credits) reflects that shift.
- MCP servers (Todoist, TickTick, Sunsama, Akiflow, Morgen "for AI") have become table stakes in 2026: the apps are becoming data stores for external LLM agents rather than building their own.
- Most "AI" in to-do apps (Todoist Assist, Any.do AI, TickTick) is LLM text work: breakdown, categorization, due-date suggestion, voice capture. Genuine constraint-solving auto-scheduling remains limited to Motion, Reclaim, Morgen, Trevor, Akiflow (claimed).

### Gaps
- Could not load any vendor pricing page directly (proxy blocked); every price above is third-party and often conflicting (Sunsama, Amie, Vimcal, Tiimo, Reclaim, Shortwave, Any.do, Todoist all have 2+ divergent figures).
- No user-count or revenue data found for Sunsama, Morgen, Amie, Vimcal, Routine, Superlist, Structured, Trevor.
- No independent verification that Akiflow's "Aki" actually auto-schedules vs. captures.
- Vimcal's and Superlist's specific AI feature sets not surfaced beyond headlines.
- Reclaim's post-acquisition roadmap/Dash integration status not found in any primary Dropbox source.

## Key Question 2: Which new AI-native entrants launched in 2025-2026 and what is their angle?

### Takeaway
2025-26 entrants cluster around three angles: (a) biometric/energy-aware scheduling (Lifestack, YC), (b) assistant-in-your-messages "AI chief of staff" (Pally, Carly, Alfred, ReadyWhen, Bond), and (c) natural-language-prompt day builders and offline-first unifiers (KronoPrompt, Juno, nocal, Saner.ai). None has disclosed meaningful scale; Pally's $5.2M seed and Fyxer's $40M are the largest funding events in the individual-assistant space.

### Cited Findings
- **Lifestack** (DeMind Inc., YC): "first AI calendar to use health data" — reads sleep/recovery/activity from wearables to schedule tasks by energy; Product Hunt launch March 5, 2025 (page also says "launched 2024"); founders exited Japan's largest neurotech media outlet — [Product Hunt](https://www.producthunt.com/products/lifestack); [Startup to Follow](https://www.startuptofollow.com/article/lifestack-the-first-health-driven-ai-daily-planner); [Saner.ai review (competitor)](https://www.saner.ai/blogs/lifestack-review)
- **Pally** (YC): AI personal assistant over iMessage, Android RCS, Telegram, SMS; raised $5.2M seed led by Cyber Fund and YC with Pioneer Fund, Founders Inc., 468 Capital; valuation reported as $30M (company) vs $19.4M (Dealroom); made every feature free as of Oct 6, 2026 (previously from $25/mo) — [Dealroom](https://dealroom.co/news/143591-pally-raises-5-2m-seed-for-an-ai-assistant-that-lives-in-your-texts/); [RuntimeWire](https://runtimewire.com/article/pally-raised-5-2-million-ai-assistant-text-messages); [Arlo comparison](https://www.arlo.sh/compare/best-ai-assistants-you-can-text)
- **Bond** (YC X25/Spring 2025): "AI chief of staff for executives," morning Slack/email summary of progress, blockers, priorities; founded 2025 by Chloe Samaha, 3 employees, SF — [YC directory](https://www.ycombinator.com/companies/bond)
- **Carly** (usecarly.com): text/web/email AI assistant, nothing to install; free Zapier-style workflows, AI agents from $35/mo; launch date unconfirmed; publishes a large volume of competitor "review" SEO content — [Carly texting-assistants post (vendor)](https://www.usecarly.com/blog/best-ai-assistants-you-can-text/)
- **Alfred** (get-alfred.ai / "alfred_"): email triage plus morning brief, texting assistant for founders/lawyers/agents/accountants that asks approval before every send; also a heavy SEO-review publisher — [Arlo](https://www.arlo.sh/compare/best-ai-assistants-you-can-text); [Alfred blog](https://get-alfred.ai/blog/best-ai-chief-of-staff-tools)
- **ReadyWhen** (readywhen.ai): watches email, Slack, Notion and meetings for things you said you'd do and drafts follow-ups — [Carly chief-of-staff roundup](https://www.usecarly.com/blog/best-ai-chief-of-staff/); [ReadyWhen blog (vendor)](https://readywhen.ai/blog/best-ai-chief-of-staff-tools-2026)
- **KronoPrompt**: typed/spoken prompt becomes a 24-hour timeline; web + Android; free tier 3 AI uses/month; Premium $5.99/mo or $65.89/yr — [KronoPrompt site (vendor)](https://kronoprompt.it.com/); [How it works](https://kronoprompt.it.com/how-it-works)
- **Juno Digital Planner**: offline-first planner unifying tasks, calendar, email, routines; integrations Google Calendar, Gmail, Todoist, Linear, GitHub; dated 2025-11-15 by one listing; ranked #1 on Product Hunt launch day; featured in PH newsletter — [Feedbagel](https://feedbagel.com/post/juno-digital-planner-offline-first-productivity-hub-for-task-and-event-managemen); [ProductCool](https://www.productcool.com/product/juno-digital-planner); [PH newsletter](https://www.producthunt.com/newsletters/archive/27252-joyful-productivity)
- **nocal**: calendar merged with note-taking; 4.0 brings Mac, Windows, iOS, Android, web "this summer"; Zapier lists as Beta — [nocal mobile](https://nocal.app/mobile); [Product Hunt maker](https://www.producthunt.com/@brianmuse); [BetaList](https://betalist.com/startups/nocal)
- **Saner.ai**: AI workspace combining notes, email, tasks, calendar; assistant "Skai" extracts tasks from unstructured input; free tier, paid from ~$8/mo; launch year unconfirmed — [Saner.ai blog (vendor)](https://www.saner.ai/blogs/best-ai-planners)
- **Temporal.day, Ellie, Composed, Selfmanager.ai, Catchagent, MyTimeo, TaskCoach.ai, Sentra, Coommit, Adviserry**: all surfaced as 2026 planner/assistant vendors publishing comparison SEO; no scale data — [Temporal.day](https://temporal.day/blog/sunsama-vs-motion); [Ellie](https://ellieplanner.com/comparisons/routine-app-review); [Composed](https://staycomposed.app/best/ai-planner-apps/); [MyTimeo](https://mytimeo.com/blog/best-ai-planner-apps/); [TaskCoach](https://taskcoach.ai/blog/best-ai-planner-apps/); [Sentra](https://www.sentra.app/articles/ai-chief-of-staff)
- **Cluely** (meeting assistant, founded 2025) appears in AI-assistant lists but is not a planner — [Wikipedia](https://en.wikipedia.org/wiki/Cluely)
- Product Hunt retired the Golden Kitty Awards after ten years; replaced by quarterly traction-based "Orbit Awards," first edition Dec 1 starting with AI Dictation — [PH newsletter](https://www.producthunt.com/newsletters/archive/45536-rip-golden-kitty-awards); [PH forum](https://www.producthunt.com/p/producthunt/rip-golden-kitty-awards-long-live-orbit-awards)
- Product Hunt now has a dedicated "AI Chief of Staff" category page — [Product Hunt category](https://www.producthunt.com/categories/ai-chief-of-staff)

### Inferences
- The "AI chief of staff" label is largely a repositioning of email/Slack triage plus a morning brief; very few of these products do calendar auto-scheduling, which remains with the 2019-era incumbents.
- The new-entrant market is characterized by aggressive content-marketing: nearly every "best AI planner 2026" result is written by a competitor (Morgen, Lindy, Lifestack, Saner, Carly, Alfred, KronoPrompt, Efficient/Motion). Independent editorial coverage (TechCrunch, Verge) of this category in 2025-26 is almost absent except for funding rounds and platform moves.
- Pally going fully free in Oct 2026 and Dola rebranding/withdrawing suggest consumer messaging-assistants struggle to monetize.

### Gaps
- No Golden Kitty / Orbit winners exist for this category in 2025-26, so no PH-award signal; PH leaderboards not fetched.
- Could not confirm YC batch membership for Lifestack, Saner.ai, Cohesive, Docket, Nerve, Senchal (no search hits for the last two).
- No funding or user data for KronoPrompt, Juno, nocal, Saner, Carly, Alfred, ReadyWhen.
- App Store "AI planner" category rankings not accessible.

## Key Question 3: Which apps shut down, pivoted or were acquired in 2024-2026, and why?

### Takeaway
Four clear exits: Mayday (acquired by Apple, Apr 2024, shut May 2024), Reclaim.ai (acquired by Dropbox, Aug 2024, still operating), Rise (shut down Mar 31, 2025 for lack of traction/funding) and Clockwise (team acqui-hired into Salesforce Agentforce, product shut Mar 27, 2026 with one week's notice). Pivots: Motion to SMB "AI Employees," Amie toward AI meeting notes, Dola to Toki; Notion folded its AI add-on into Business.

### Cited Findings
- **Mayday** (Mayday Labs, Canada): announced acquisition early April 2024 without naming buyer; services ceased May 5, 2024 (ToolRadar says May 1); user data not transferred, "Flexible Tasks" data deleted; AI auto-scheduled events/tasks and learned preferences; Google + Microsoft 365 only — [AlternativeTo, Apr 2024](https://alternativeto.net/news/2024/4/mayday-calendar-app-announces-acquisition-and-upcoming-termination-of-all-services); [ToolRadar](https://www.toolradar.com/tools/mayday-calendar). Apple identified as acquirer via European Commission listing (IP + right to hire certain employees) — [MacRumors, May 9 2025](https://macrumors.com/2025/05/09/apple-acquired-mayday-labs); Apple job posting hints at Calendar refresh — [iPhone in Canada](https://www.iphoneincanada.ca/2025/05/23/apple-calendar-app-refresh)
- **Reclaim.ai**: acquired by Dropbox, announced Aug 20-22, 2024; continues as "Reclaim.ai from Dropbox" — [TechCrunch](https://techcrunch.com/2024/08/22/dropbox-acquires-index-ventures-backed-ai-scheduling-tool-reclaim-ai/?rand=23331); [Silicon Florist](https://siliconflorist.com/2024/08/20/early-ai-startup-reclaim-ai-acquired-by-dropbox/); competitor review flags "shutdown risk" under Dropbox — [Akiflow blog](https://akiflow.com/blog/calendar-task-management-integration-productivity)
- **Rise** (team calendar; raised $3M from Lachy Groom, Stewart Butterfield, Adriaan Mol, date unknown): announced Jan 27-28, 2025 that it was shutting down for insufficient traction and no funding to continue; kept running until Mar 31, 2025; users urged to export — [AlternativeTo Rise news](https://alternativeto.net/software/rise-calendar/news/); [Rise press page](https://risecal.notion.site/Rise-Press-2929bf50ee554aadb7907f96f89e250a). risecalendar.com no longer resolves (DNS failure Oct 24 2026). No founder post-mortem found.
- **Clockwise**: Salesforce hired the team into Agentforce (CEO Matt Martin LinkedIn post, ~Mar 20 2026); Salesforce spokesperson: "this was not an acquisition... Salesforce is not acquiring Clockwise or its technology"; product shut Mar 27, 2026 after notifying users Mar 20; all customer data deleted; unused subscriptions refunded; users directed to Reclaim, which price-matched; Clockwise had been used by 40,000+ organizations — [The Register, Mar 20 2026](https://theregister.com/2026/03/20/salesforce_clockwise_team); [TechRadar](https://www.techradar.com/pro/salesforce-recuits-team-behind-calendar-app-clockwise-into-agentforce); [Doodle](https://doodle.com/en/clockwise-is-shutting-down-what-to-do-next-in-2026/); [Carly](https://www.usecarly.com/blog/is-clockwise-shutting-down/)
- **Cron → Notion Calendar**: acquired June 2022, rebranded Jan 2024 (one 2026 review wrongly says acquired 2026) — [Wikipedia](https://en.wikipedia.org/wiki/Notion_(productivity_software))
- **Dola → Toki**: rebranded; heydola.com dead by Sept 2026 — [Agent Finder](https://agent-finder.co/reviews/dola); [AISoTools](https://aisotools.com/pricing/dola-ai)
- **Microsoft 365 Companion apps** (Calendar, People, Files taskbar mini-apps) being retired Dec 16, 2026 after about one year — [Windows Central](https://www.windowscentral.com/microsoft/microsoft-office/these-three-microsoft-365-apps-lasted-just-one-year-before-getting-axed); [TechRadar](https://www.techradar.com/pro/microsoft-is-retiring-some-key-365-companion-apps-calendar-people-and-files-services-all-set-to-be-cut)
- **Motion pivot**: "AI Employees" (May 2025) and "agentic work suite" framing — [BusinessWire](https://www.businesswire.com/news/home/20250905188051/en/Motion-Raises-$60M-at-$550M-Valuation-to-Build-the-Agentic-Work-Suite-for-Businesses)
- **Amie pivot** toward "AI Note Taker without a bot" homepage lead — [ClickUp review](https://clickup.com/blog/amie-calendar-review/)
- **Notion**: standalone AI add-on killed May 2025 — [Firebear Studio](https://firebearstudio.com/blog/what-is-notion.html)
- Historical precedent (2016): Microsoft shut Sunrise calendar after acquisition — [TechCrunch 2016](https://techcrunch.com/2016/08/31/sunrise-was-the-best-calendar-app-ever-and-now-i-feel-lost/)

### Inferences
- The exit pattern for AI calendar startups is acqui-hire-then-kill (Mayday/Apple, Clockwise/Salesforce, Sunrise/Microsoft 2016) rather than product continuation; Reclaim/Dropbox is the only continued product, and competitors already use "owned by Dropbox" as a FUD angle.
- Team-oriented calendar tools (Rise, Clockwise) died while individual-focused planners survived, suggesting the individual prosumer segment is more defensible than team meeting optimization, which platform vendors (Google Gemini, Microsoft) absorb.
- Clockwise's one-week notice and data deletion created a trust shock that incumbents (Reclaim, Doodle, Cal.com) monetized immediately with migration content.

### Gaps
- No founder post-mortem for Rise beyond the shutdown notice; funding date unknown.
- Reclaim acquisition price unconfirmed ($13M figure appears to be funding total; $40.2M from one aggregator).
- Could not confirm whether Mayday tech shipped in any Apple product (iOS 26 Calendar).
- No 2025 acquisitions of individual planner apps found besides those listed; absence may reflect search limits.

## Key Question 4: What feature clusters has everyone converged on vs. what is rare or missing?

### Takeaway
Converged: unified task+calendar view, natural-language/voice capture, LLM task breakdown and categorization, AI meeting notes, MCP servers for external agents, and credit-metered AI pricing. Rare: true constraint-based auto-scheduling (Motion, Reclaim, Morgen, Trevor), biometric/energy-aware planning (Lifestack), cross-person coordination by an individual's agent, and offline-first design (Juno). Missing in nearly all: Android parity, Outlook parity, and transparent AI-vs-rules disclosure.

### Cited Findings
- Unified task/calendar/notes is the stated goal of Routine ("One App for Tasks, Calendar & Notes, Powered by AI"), Saner.ai, Juno, nocal, Akiflow — [routine.co](https://routine.co/); [Saner.ai](https://www.saner.ai/blogs/best-ai-planners); [Feedbagel Juno](https://feedbagel.com/post/juno-digital-planner-offline-first-productivity-hub-for-task-and-event-managemen); [nocal](https://nocal.app/mobile)
- Voice capture everywhere: Todoist Ramble (Gemini 2.5 Flash Live, 38 languages), TickTick AI Mode, Any.do Voice Mode, Structured voice, Akiflow voice commands, KronoPrompt spoken prompts — [Toolszai](https://toolszai.com/tool/todoist-ai/); [TechHarry](https://www.techharry.com/2026/09/tick-tick-review.html); [Any.do support](https://support.any.do/en/articles/8637385-any-do-ai); [Morgen AI assistants post](https://www.morgen.so/blog-posts/best-ai-planning-assistants); [KronoPrompt](https://kronoprompt.it.com/how-it-works)
- MCP servers: Todoist, TickTick, Sunsama, Akiflow; Morgen publishes a "for AI & LLMs" page — [2sync](https://2sync.com/blog/ticktick-vs-todoist); [Releasebot Sunsama](https://releasebot.io/updates/sunsama); [Catchagent Akiflow](https://www.catchagent.ai/blog/reviews/akiflow-review); [Morgen for AI](https://www.morgen.so/for-ai)
- AI meeting notes as a planner feature: Amie, Superlist, Notion AI Meeting Notes, ClickUp "Everything AI" notetaker — [ClickUp Amie review](https://clickup.com/blog/amie-calendar-review/); [Dupple Superlist](https://dupple.com/reviews/superlist); [Fast.io Notion](https://fast.io/resources/notion-ai-review-2026/); [Agiled ClickUp](https://agiled.app/blog/clickup-pricing)
- Credit-metered AI: Motion (7,500/15,000 credits + overage), Lindy (3,000-35,000 credits + $10/1,000), Notion Custom Agents ($10/1,000 credits), Amie meeting-note credits — [Morgen Motion pricing](https://morgen.so/blog-posts/motion-pricing); [Automatereal Lindy](https://automatereal.com/blog/lindy-ai/); [gptprompts Notion](https://gptprompts.ai/notion-ai-pricing); [Lifestack Amie](https://lifestack.ai/blog/amie-app-pricing)
- AI time estimation from history: Sunsama (past tasks/timer data), Trevor (duration prediction), Todoist (due dates from patterns) — [Releasebot](https://releasebot.io/updates/sunsama); [Google Play Trevor](https://play.google.com/store/apps/details?id=com.trevordpk.trevorai&hl=en); [Toolszai](https://toolszai.com/tool/todoist-ai/)
- Rare: energy/biometric scheduling only Lifestack — [Product Hunt Lifestack](https://www.producthunt.com/products/lifestack)
- Rare: Akiflow's Aki "doesn't coordinate with other people"; Gmail Help-me-schedule is 1:1 only; Gemini suggestions desktop-only — [Carly Akiflow](https://www.usecarly.com/blog/akiflow-review/); [TechCrunch](https://techcrunch.com/2025/10/14/googles-gemini-can-now-help-you-schedule-google-calendar-meetings); [Gend.co](https://www.gend.co/blog/google-gemini-calendar-meeting-suggestions)
- Platform gaps: Amie no Android, Google-only (Outlook via Apple Calendar); Tiimo Android lacks widgets/AI; Vimcal free tier iOS-only; Reclaim Outlook "beta" per one source; Mayday never had iCloud/Android; Trevor listed web-only by Morgen — [Nocal Amie page](https://nocal.app/alternatives/amie); [Neurolaunch Tiimo](https://neurolaunch.com/tiimo-android-availability/); [Lifestack Vimcal](https://lifestack.ai/blog/vimcal-pricing); [Carly Reclaim](https://www.usecarly.com/blog/reclaim-ai-review/); [AlternativeTo Mayday](https://alternativeto.net/news/2024/4/mayday-calendar-app-announces-acquisition-and-upcoming-termination-of-all-services)
- Routine and Superlist only recently added basics: Routine native mobile apps in Oct 2026; Superlist weekday-recurring tasks in Aug 2026 — [Routine changelog](https://feedback.routine.co/changelog); [Dupple Superlist](https://dupple.com/reviews/superlist)
- Human-in-the-loop as a differentiator: Morgen preview/approve; Alfred approves every send; Sunsama refuses auto-planning — [Morgen guide](https://www.morgen.so/guides/plan-your-day-using-the-ai-planner); [Arlo](https://www.arlo.sh/compare/best-ai-assistants-you-can-text); [Efficient.app Sunsama](https://efficient.app/apps/sunsama)

### Inferences
- "AI" in this category spans three very different things: (1) rule/constraint solvers predating LLMs (Motion, Reclaim, Trevor, Clockwise, Mayday — all founded 2019-2021), (2) LLM text helpers (breakdown, categorize, summarize, voice), and (3) agentic assistants acting in email/Slack. Marketing rarely distinguishes them; only the first genuinely "plans your day."
- Because MCP adoption lets ChatGPT/Claude manipulate Todoist/TickTick/Sunsama/Akiflow directly, the planners' own in-app chat assistants risk commoditization; differentiation shifts to the scheduling engine and the data model.
- Still-missing territory: an individual-focused agent that negotiates time with other people's agents, cross-tool "commitment tracking" (ReadyWhen is the lone attempt), and transparent explanation of why a task was placed where it was.

### Gaps
- No systematic independent feature matrix exists; all 2026 matrices found are vendor-authored.
- Could not verify Android/Windows availability for several apps (Vimcal, Sunsama desktop, Akiflow Android quality).
- No data on how many users actually enable auto-scheduling vs. manual time-blocking in any product.

## Key Question 5: What do these apps charge, and what is the typical price ceiling for a consumer/prosumer planner?

### Takeaway
Prosumer planners cluster at $15-20/month on annual billing ($22-34 monthly): Morgen $15, Sunsama $17-20, Akiflow $19, Vimcal $15-20, Amie ~$20. Motion sits above the pack at $29-49/month plus AI-credit overages. Below $10 are the to-do incumbents and newcomers (Routine $5, Superlist $5, KronoPrompt $5.99, Tiimo $6-8, Toki $3.99-9.99, Any.do ~$3-5, Reclaim Starter $8-12). AI executive-assistant products command $25-100+/seat (Shortwave $24-100, Lindy $30-200, Carly agents $35). The practical ceiling for an individual planner appears to be ~$20/month annual; Motion is the outlier that tests $30-50.

### Cited Findings
- Motion: $29/mo annual ($49 monthly) Pro AI; $39/$69 Business AI; credits + overage — [Morgen Motion pricing](https://morgen.so/blog-posts/motion-pricing)
- Sunsama: $17 annual/$22 monthly (newer) vs $20/$25 (Morgen Apr 2026); no free tier — [Carly](https://www.usecarly.com/blog/sunsama-review/); [Morgen](https://www.morgen.so/blog-posts/sunsama-pricing)
- Akiflow: $19 annual/$34 monthly; Believer plan with 2-year lock-in — [Morgen](https://www.morgen.so/blog-posts/akiflow-pricing); [Carly](https://www.usecarly.com/blog/akiflow-review/)
- Morgen: $15 annual/$30 monthly; Team $10/user annual — [Morgen](https://www.morgen.so/blog-posts/akiflow-pricing)
- Reclaim: free Lite; Starter $8-12; Business $12-18; Enterprise $18 — [Subger](https://subger.com/en/service/reclaim-ai); [Marc Andrews](https://marcandrews.com/reclaim-ai-pricing-2026-is-it-worth-paying-for-in-the-uk/)
- Amie: $20 Pro / $40 Business annual (or $25/$20, or $12.50 — conflicting) — [ClickUp](https://clickup.com/blog/amie-calendar-review/); [Lifestack](https://lifestack.ai/blog/amie-app-pricing); [Subger](https://subger.com/en/service/amie)
- Vimcal: $15-20 individual; EA tier $62.50-75 — [Toolradar](https://toolradar.com/tools/vimcal-app/pricing); [Lifestack](https://lifestack.ai/blog/vimcal-pricing)
- Routine Personal $5/mo — [Routine changelog](https://feedback.routine.co/changelog)
- Superlist from $5/person/mo ($59/yr) — [Dupple](https://dupple.com/reviews/superlist)
- KronoPrompt $5.99/mo or $65.89/yr — [KronoPrompt](https://kronoprompt.it.com/)
- Tiimo ~$6-8/mo or $48-80/yr (conflicting) — [Lifestack](https://lifestack.ai/blog/tiimo-pricing); [AISoTools](https://aisotools.com/blog/tiimo-review-2026)
- Toki (ex-Dola) $3.99 / $9.99 — [Agent Finder](https://agent-finder.co/reviews/dola)
- Any.do Premium $2.99/mo annual or $59.99/yr (conflicting) — [aiexpo](https://aiexpo.app/pages/tool?slug=any-do)
- Todoist Pro ~$4-5/mo or $60/yr (conflicting) — [Max-productive](https://max-productive.ai/ai-tools/todoist/)
- Saner.ai from ~$8/mo — [Saner.ai](https://www.saner.ai/blogs/best-ai-planners)
- Notion AI: bundled in $20/user Business; Custom Agents $10/1,000 credits — [Firebear](https://firebearstudio.com/blog/what-is-notion.html); [gptprompts](https://gptprompts.ai/notion-ai-pricing)
- ClickUp AI add-on $9/user; Everything AI $28/user; Asana Starter $10.99 incl. AI — [Eesel](https://www.eesel.ai/blog/clickup-brain); [Agiled](https://agiled.app/compare/clickup-vs-asana)
- Shortwave $24/$36/$100 per seat annual — [Techvernia](https://techvernia.com/pages/reviews/productivity/shortwave.html)
- Lindy $29.99/$99.99/$199.99 per user, month-to-month — [Automatereal](https://automatereal.com/blog/lindy-ai/)
- Carly AI agents from $35/mo; Pally now free — [Carly](https://www.usecarly.com/blog/best-ai-assistants-you-can-text/); [Arlo](https://www.arlo.sh/compare/best-ai-assistants-you-can-text)
- Trial norms: 7 days (Motion, Akiflow, Amie, Tiimo-annual), 14 days (Sunsama, Morgen, Reclaim paid features, Shortwave, Vimcal) — sources as above.

### Inferences
- The $15-20 annualized band is the established "prosumer planner" price; apps charging monthly-only or above $25 (Motion, Akiflow monthly) lean on annual discounts of 40-45% to land in that band.
- AI credits are becoming a second price axis (Motion, Lindy, Notion, Amie), effectively raising the ceiling for heavy users without raising headline price.
- The sub-$10 tier is where new entrants (Routine, Superlist, KronoPrompt, Toki) compete, and where Pally's move to free suggests pressure toward zero for messaging-based assistants.

### Gaps
- No vendor pricing page could be fetched directly; nearly every price has at least one conflicting third-party figure.
- No data on conversion rates, churn, or willingness-to-pay studies for this category.
- Regional pricing (UK/EU) not captured beyond one UK Reclaim post.
