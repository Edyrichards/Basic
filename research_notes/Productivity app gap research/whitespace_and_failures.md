# Whitespace and Failed Attempts in Personal Work-Organization Software (as of 24 Oct 2026)

Method note: all findings below come from web search result summaries gathered 24 Oct 2026. Direct page fetches (news.ycombinator.com, techcrunch.com, arxiv.org, behavioralscientist.org) were blocked by the sandbox proxy (HTTP 403 on CONNECT), so quotes and figures are as surfaced in search snippets, not full-text verified. Items marked "vendor" come from competitors' or the product's own marketing and should be weighted accordingly.

## KQ1. What recurring "I wish an app would..." ideas appear in 2025-2026 discussions about organizing a workday?

### Takeaway
The most-repeated wish is cross-source commitment capture (email + Slack/Teams + meetings into one list, including promises *I* made, not just asks of me), ideally local/private; nothing shipping does this end-to-end, and the pieces that exist cover one source each. Daily-shutdown/reconciliation and "what do I do right now" decision support exist as manual rituals in a few planners but not as automated plan-vs-reality reconciliation; ADHD-specific research and apps are converging on "one task at a time" and relational/social scaffolding rather than more planning UI.

### Cited Findings
**Automatic capture of commitments from email/Slack/meetings**
- A 2025 "Ask HN: Managing Tasks in Slack/Teams" thread asked for a *local* tool that processes email and chat across platforms and generates TODOs; a commenter's objection was that Slack/Teams are "not living documents, they are an ephemeral stream of async messages" — [Hacker News](https://news.ycombinator.com/item?id=44403821)
- A 2026 HN thread on managing AI "skills files" includes a commenter who built a personal "communications analysis" skill that tracks the commitments they make, follows up with people they might miss, and scores their communication against personal targets — i.e. users are hand-rolling promise-tracking with LLM agents rather than buying a product — [Hacker News](https://news.ycombinator.com/item?id=49589914)
- Microsoft holds a patent (EP3295394A1) on "Management of commitments and requests extracted from communications and content," showing the idea was formally articulated years before LLMs made it cheap — [Google Patents](https://patents.google.com/patent/EP3295394A1/en)
- An archived open-source Slack bot, `pledge`, tracked team commitments but required manual `/pledge` entries rather than extraction — [GitHub buildo/pledge](https://github.com/buildo/pledge)
- A task-extraction glossary (vendor) distinguishes inbound requests (things others asked you) from outbound commitments (things you said you'd do), and claims extraction should capture both — [get-alfred.ai](https://get-alfred.ai/glossary/task-extraction)
- A vendor-neutral-sounding guide on the trade-offs: "you are trusting software to judge what counts as a commitment, so it will create tasks you would not have and occasionally miss ones you would," and these tools need access to mail and chat — [thisandthat.chat](https://www.thisandthat.chat/blog/stop-work-slipping-through-the-cracks)
- Saner.AI (vendor) says it connects to Gmail, Outlook, Drive, Slack and calendar and pulls action items without prompting — [Saner.AI blog](https://blog.saner.ai/best-task-extractor/)
- Single-source precedents: Taskforce converts emails into tasks; "Paco for Slack" "sniffs out important asks hidden beneath heaps of Slack conversations and reminds you about them" — [StackShare Taskforce](https://stackshare.io/taskforce/vs/todobot); [StackShare Paco](https://stackshare.io/companies/paco-for-slack)

**"Plan my whole day" / re-planning when the day derails**
- Wirecutter published (April 2025) "AI Can't Plan Your Whole Day—Not Yet—But We Found One App That Gets Close" (title only seen, via Wikipedia's Todoist citation) — [Wikipedia: Todoist](https://en.wikipedia.org/wiki/Todoist)
- 2026 vendor roundups position Motion as "hand over the whole day" (places tasks, meetings, breaks by urgency/deadline), Reclaim as "protect focus time inside an existing calendar," and Morgen/Akiflow as "pull tasks from other apps into one planning view" — [Mastra](https://mastra.ai/articles/ai-calendar-assistants); [Morgen](https://www.morgen.so/blog-posts/best-ai-planning-assistants); [Morgen Motion vs Reclaim](https://www.morgen.so/blog-posts/motion-vs-reclaim)
- A 2025 developer blog claims Reclaim, Motion and Notion AI "adjust plans in real time when something changes" — this is an unverified generalization — [DEV Community](https://dev.to/mahi_dholpure_0b4a20eb4b5/how-ai-daily-planners-are-changing-productivity-in-2025-3j75)
- A 2026 personal-assistant roundup argues "the best AI personal assistant in 2026 is not one app, it is a stack of three: a general model, a scheduling tool, and an automation layer," and notes that scheduled tasks "run on a clock, not on something happening" (attribution to this specific page in the result set is uncertain) — [Carly roundup](https://www.usecarly.com/blog/best-ai-personal-assistants/)

**End-of-day reconciliation / shutdown rituals**
- Ellie added "Daily Planning and Daily Shutdown routines" in v4.0.14 (App Store release dated October 6) and a 3-day timebox view (Feb 1, 2026) — manual rituals, not automated plan-vs-actual comparison — [App Store: Ellie](https://apps.apple.com/us/app/ellie-daily-planner/id1602196200); [Ellie guide](https://guide.ellieplanner.com/features/daily-planning-shutdown-rituals)
- Sunsama is positioned (May 2026, competitor blog) around "guided daily planning and shutdown rituals"; its listed cons are "manual planning" and price hard to justify — [Morgen Sunsama vs Akiflow](https://www.morgen.so/pt/blog-posts/sunsama-vs-akiflow)
- End-of-day review exists mostly as prompt packs (a Gumroad pack of "5 structured prompts to review your wins, process challenges") and habit apps, not as an integrated reconciliation of calendar/inbox/tasks — [Gumroad prompt pack](https://sirprompt.gumroad.com/l/txafuy)

**"What should I do right now" decision support (ADHD-driven)**
- Focus One (ADHD AI Planner) shows one task at a time, uses AI to pick "what matters now," and has a "too hard right now" button to skip without penalty — [App Store: Focus One](https://apps.apple.com/app/apple-store/id6756778795)
- An ADHD-with-AI Substack advises asking AI for "a gentle starting point rather than a full plan," since open-ended "what should I do?" prompts can overwhelm — [adhdwithai.substack.com](https://adhdwithai.substack.com/p/use-ai-as-a-momentum-generator-not)
- Tiimo's March 2025 AI-planner launch post concedes "AI won't magically fix executive function challenges, but it can make planning easier, more intuitive, and more adaptive" — [Tiimo](https://tiimoapp.com/resource-hub/ai-planner)

**Managing work across many tools without copying data**
- Asana's Anatomy of Work Index 2022 (10,624 knowledge workers, 7 countries) found 58% of the day lost to "work about work" (coordination) — [BusinessWire](https://www.businesswire.com/news/home/20220405005399/en/5182748/Asana-Anatomy-of-Work-Index-2022-Work-About-Work-Hampering-Organizational-Agility)
- A Jan 2026 practitioner article describes the standard failure: action items "assigned verbally... by the time team members return to their desks, important details are scattered across notes, recordings, emails, and chat messages" — [Peerlist](https://peerlist.io/technologies/articles/meeting-task-management-in-asana)

### Inferences
- "Nobody has done it well": cross-source *outbound* commitment tracking (promises I made) with follow-up nudges. Evidence: HN users build it themselves with agent skills; the only open-source precedent was manual; vendor tools focus on inbound asks and single sources. Microsoft patented the concept in 2016-17 but has shipped it only as prompt-driven Copilot summaries (see KQ2).
- "Done badly / partially": whole-day auto-scheduling (Motion, Reclaim) exists but reviewers frame it as "not yet" and users complain about rigidity; re-planning after a derailed day is marketed but no source documents it working for reactive workers.
- "Exists as ritual, not automation": end-of-day shutdown (Sunsama, Ellie) is manual journaling; automated reconciliation of what *actually* happened (calendar + sent mail + completed tasks) vs. the morning plan is not found in any product in these results.
- Demand-side signal for "what do I do now" is strongest in ADHD communities, and the emergent design answer is radical simplification (one task, no penalty for skipping), not richer planning.

### Gaps
- Could not retrieve Reddit threads (site: filter returned nothing), so 2025-26 r/productivity and r/ADHD "I wish" quotes are missing; the HN threads were seen only via snippets.
- The Wirecutter article's recommended app and reasoning were not retrieved.
- No source found quantifying demand for "context re-entry after interruptions" as a stated product wish (research covers it; see KQ4).

## KQ2. Which of these exist as features in big tools, and how well do they work per hands-on reviews?

### Takeaway
Every major platform now offers prompt-driven action-item extraction and a morning recap/brief (Copilot in Outlook/Teams, Gemini in Gmail/Chat, Slack AI recaps, ChatGPT Tasks/Pulse, Notion Custom Agents), but independent hands-on evidence is thin and mixed: Gemini is rated "useful but unremarkable" and weak in Calendar; Copilot meeting notes draw hallucination complaints and do not work on external calls; ChatGPT Pulse was called "a solution in search of a problem" behind a $200/month paywall; Notion killed its own mail client and moved email handling to agents. None documented a closed loop of capture → plan → reconcile → re-plan.

### Cited Findings
**Microsoft 365 Copilot**
- Copilot in Outlook can create follow-up tasks, reminders, or calendar entries from an email "in a few clicks" (Microsoft community post, promotional) — [Microsoft Tech Community](https://techcommunity.microsoft.com/discussions/microsoft365copilot/create-follow-up-actions-directly-from-emails-using-copilot-a-smarter-way-to-sta/4515915)
- Action-item extraction from the inbox is prompt-driven ("Review my recent emails and create a concise list of actions I need to complete, including who the action is for and any suggested deadlines") rather than continuous — [cloudbuild.co.uk](https://cloudbuild.co.uk/microsoft-365-copilot-tasks-you-can-try-in-outlook/)
- July 2026: Microsoft added "Scout," an approval-first agent that asks before sending email, posting to Teams, or changing the calendar — [A Guide to Cloud, July 2026](https://www.aguidetocloud.com/blog/microsoft-365-copilot-july-2026-updates/)
- Microsoft also introduced "Copilot Tasks" to run autonomous multi-step work — [Windows Report](https://windowsreport.com/?p=1488885)
- A third-party roundup of Copilot-for-Teams meeting notes (~mid-2025) reports "frequent hallucinations," a confusing setup, no support for external calls, and a review tally where 71% of 104 reviews were 1-star (small, unscientific sample) — [tl;dv](https://tldv.io/blog/honest-review-of-ms-copilot-meeting-notes/)
- Microsoft Q&A forum users (2025) call Copilot "unreliable and inaccurate" — anecdotal — [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/2109622/why-new-copilot-suck)
- A positive May 2026 hands-on praises email thread summaries and draft replies but does no systematic accuracy testing — [TechHarry](https://www.techharry.com/2026/05/microsoft-copilot-review.html)
- Windows Recall (context re-entry via screen snapshots): announced for Copilot+ PCs in 2024, pulled to Insider-only after security researchers showed local data exposure, redesigned as opt-in with authentication, and postponed again to December 2024; a UK ICO inquiry began before launch — [ForkLog](https://forklog.com/en/microsoft-halts-release-of-ai-feature-recall-amid-criticism/); [heise](https://heise.de/-10002323); [TechTarget](https://www.techtarget.com/cybersecurity/podcast/Risk-Repeat-Microsoft-under-fire-again-over-Recall)

**Google Gemini in Workspace**
- A G2 reviewer (Feb 2026) had Gemini scan a cluttered Gmail inbox and return overlooked to-dos "in seconds," calling it useful but unremarkable, "no fireworks" — [G2 Learn](https://learn.g2.com/google-gemini-review)
- A May 2026 guide rates Gemini good in Gmail/Meet/Drive, mixed in Sheets/Slides, and *weak in Calendar* — [GPTPrompts](https://gptprompts.ai/how-to-use-gemini-in-google-workspace)
- Sept 2026: Gemini can create events and coordinate tasks from any Workspace app, showing a preview card for review before sending/scheduling; consumer Google AI Pro excludes scheduling — [Google Workspace Updates, Sept 2026](https://workspaceupdates.googleblog.com/2026/09/create-content-schedule-events-and-coordinate-tasks-across-Workspace-regardless-of-what-app-you-are-in.html)
- Gemini in Chat (rolling out from Aug 26, 2026) searches Gmail/Drive/Calendar and manages tasks or meetings from within Chat — [UC Today](https://uctoday.com/gemini-for-google-workspace-moves-from-copilot-to-action)

**Slack AI**
- Slack delivers a recap every morning covering what you missed; "More detail" reveals sources — [Slack Help](https://slack.com/help/articles/25076892548883-Slack-AI)
- A 2026 review claims <1% hallucination for Slack AI vs 3.2% Copilot and 4.1% Gemini in "2025 enterprise benchmarks" but names no benchmark; treat as unreliable — [fast.io](https://www.fast.io/resources/slack-ai-review-2026.md)
- Output quality is "tightly coupled to how the channel is used" (hypothesis, not measured) — [resumelens](https://www.resumelens.org/blog/slack/slack-ai-search-and-summaries)
- Pricing: $10/user/month add-on in 2024 reporting — [diginomica](https://diginomica.com/node/27378)

**ChatGPT Tasks / Agent / Pulse**
- ChatGPT Tasks lets users schedule prompts daily/weekly/custom and can read/write Gmail when connected; available on Plus/Pro/Team (and later Enterprise) — [GeeksforGeeks](https://geeksforgeeks.org/chatgpt-tasks)
- A vendor guide says Tasks "still has meaningful limits worth understanding before you build anything serious around it" (competitor, limits unspecified) — [MindStudio](https://www.mindstudio.ai/blog/chatgpt-scheduled-tasks-daily-briefings-email-automation/)
- OpenAI itself (Sept 2026) publishes a "morning brief" recipe for government chiefs of staff using scheduled tasks "with staff review built in" — [OpenAI Academy](https://academy.openai.com/public/clubs/government/blogs/before-the-first-meeting-a-morning-brief-for-government-chiefs-of-staff)
- ChatGPT Agent launched July 17, 2025 with Calendar/Gmail/Drive connectors; TechCrunch noted early agents "have proven to struggle with complex tasks" — [TechCrunch](https://techcrunch.com/2025/07/17/openai-launches-a-general-purpose-agent-in-chatgpt)
- ChatGPT Pulse (previewed Sept 25, 2025, Pro-only, mobile) scans past chats and linked Gmail/Calendar overnight and shows cards once a day; integrations off by default — [Axios](https://www.axios.com/2025/09/25/chatgpt-prompts-you-pulse-openai); [Ubergizmo](https://www.ubergizmo.com/2025/09/chatgpt-pulse/)
- Tom's Guide called Pulse "hands down the worst new AI tool of 2025... a solution in search of a problem, wrapped in a $200-per-month paywall"; a Substack writer found it "surfaced the right mix of updates, reminders, and follow-ups" — [Tom's Guide](https://www.tomsguide.com/ai/i-test-ai-for-a-living-and-this-is-hands-down-the-worst-new-ai-tool-of-2025); [Anchor Change](https://anchorchange.substack.com/p/the-next-phase-of-chatgpt-a-personalized)
- A Feb 2026 explainer still described Pulse as Pro-only; no 2026 source confirmed Plus rollout — [SentiSight](https://www.sentisight.ai/when-will-chatgpt-pulse-be-available-for-plus-and-free-users/)

**Notion AI / Notion Mail**
- Notion Custom Agents launched Feb 2026: persistent, scheduled or event-triggered, write back to databases, connect via MCP to Linear/HubSpot/Figma/Slack; moved to credits ($10 per 1,000 monthly credits, no rollover) on May 4, 2026 on top of the Business plan — [Airframe](https://www.airframe.ai/product/notion-com-product-agents/analysis); [eesel](https://www.eesel.ai/blog/notion-ai-review); [fast.io](https://www.fast.io/resources/notion-ai-review-2026.md)
- Reviewers attribute weaknesses to architecture ("retrieves pages rather than loading them into context") and say it is outperformed by Claude/ChatGPT for multi-step analysis — [beginnersinai](https://beginnersinai.org/notion-ai-review/)
- Notion Mail (GA April 15, 2025) shuts down Sept 22, 2026; Notion said >50% of users "already manage email without opening the inbox" and it is "going all in on using agents to run your inbox" — [Engadget](https://engadget.com/2201940/notion-mail-is-shutting-down); [TNW](https://thenextweb.com/news/notion-mail-shuts-down-ai-agents-email-productivity); [AlternativeTo, June 2026](https://alternativeto.net/news/2026/6/just-over-a-year-after-launch-notion-is-killing-notion-mail-as-it-shifts-to-ai-agents/)

### Inferences
- The incumbents have commoditized *single-shot* extraction and *once-a-day* briefs. What none of them documents is persistence across days (did yesterday's extracted commitment get done? who is waiting on me?) or reconciliation against the plan; everything is either prompt-on-demand or a daily push.
- The repeated "approval-first / preview card" designs (Copilot Scout, Gemini preview cards, Pulse off-by-default) indicate the platforms are constrained by trust and privacy, leaving room for a product that is conservative about *writing* but aggressive about *tracking*.
- Notion Mail's death is the clearest signal that users prefer agents acting on email over a new inbox UI — a cautionary note against building another surface rather than a layer.
- Recall's history shows "context re-entry via total capture" is technically done but socially rejected when it is OS-level and default-on; Rewind's shutdown (KQ3) reinforces this.

### Gaps
- No independent, systematic accuracy benchmark of action-item extraction in Copilot, Gemini or Slack AI was found; the only numbers are vendor-adjacent and unsourced.
- Claude's own task/calendar features were not covered by any result in this research and are not assessed here.
- Recall's 2026 adoption status was not confirmed.

## KQ3. Which AI productivity startups shut down, pivoted, or stalled in 2023-2026, and why?

### Takeaway
Confirmed exits in the personal-work-organization space are mostly acquihires or asset sales where the product died (Clockwise→Salesforce 2026, Rewind/Limitless→Meta 2025, Heyday→BetterUp 2024, Mayday 2024, Humane→HP 2025, Notion Mail 2026) plus two true failures with stated reasons (theGist 2025: no sustainable traction and commoditization by native Slack/Workspace/ChatGPT features; subtl.ai 2025: trials did not convert to paid). Mem survived only by rebuilding and rebranding from "notes" to "AI assistant." Many names on the watch list (Superlist, Amie, Ellie, Routine, Bardeen, Tana, Capacities, Rize, Timely, Sunsama, Akiflow, Motion, Reclaim-under-Dropbox) are alive as of 2026 with no reported distress.

### Cited Findings
**Shut down / acquihired (product discontinued)**
- *Clockwise* (AI calendar; ~40,000 orgs incl. Uber, Netflix, Atlassian): CEO Matt Martin announced on LinkedIn that Salesforce would hire the team for Agentforce; "because Salesforce is acquiring the workers and not the company," the product shut down March 27, 2026 with roughly a week's notice; all customer data deleted, unused subscriptions refunded, users pointed to Reclaim — [TechRadar](https://www.techradar.com/pro/salesforce-recuits-team-behind-calendar-app-clockwise-into-agentforce); [Cal.com (competitor)](https://cal.com/blog/clockwise-alternative); [Carly (competitor)](https://www.usecarly.com/blog/is-clockwise-shutting-down/)
- *Rewind → Limitless* (desktop "remember everything" recorder, pivoted 2024 to a $99 pendant): acquired by Meta Dec 5, 2025, terms undisclosed; pendant sales ended, Rewind desktop capture stopped Dec 19, 2025; team folded into Reality Labs wearables; support for existing owners for at least a year — [TechCrunch](https://www.techcrunch.com/2025/12/05/meta-acquires-ai-device-startup-limitless/); [9to5Mac](https://9to5mac.com/2025/12/05/rewind-limitless-meta-acquisition/); [BetaNews](https://betanews.com/2025/12/08/meta-has-acquired-limitless-a-startup-that-produces-ai-powered-wearables/)
- *Heyday* (AI memory assistant that resurfaced past content): acquired by BetterUp in 2024; co-founder said the standalone product would shut down; directory marked inactive Dec 3, 2024 — [The Rundown](https://www.therundown.ai/tools/heyday); [dang.ai](https://dang.ai/tool/ai-memory-assistant-heyday); background interview with CEO Samiur Rahman — [Sacra](https://sacra.com/research/samiur-rahman-heyday-production-grade-ai-stack/)
- *Mayday* (AI calendar with "Flexible Tasks"): announced an undisclosed acquisition in April 2024 with all services terminated May 5, 2024; user data deleted, Mayday-specific items lost; AlternativeTo noted it "joins several other productivity startups that have been closed or transformed shortly after being acquired" — [AlternativeTo](https://alternativeto.net/news/2024/4/mayday-calendar-app-announces-acquisition-and-upcoming-termination-of-all-services)
- *Notion Mail*: see KQ2 — shut down Sept 22, 2026 because users ran agents on the inbox instead of using the client — [Engadget](https://engadget.com/2201940/notion-mail-is-shutting-down)
- *Humane Ai Pin* (wearable assistant): discontinued Feb 2025; cloud service off Feb 28, 2025; HP bought IP, CosmOS and most staff for ~$116M, excluding hardware; early reviews, weak adoption and returns reportedly outpacing sales preceded the "shifted business priorities" statement — [Tom's Guide](https://www.tomsguide.com/ai/the-humane-ai-pin-is-officially-dead-and-hp-is-picking-up-humanes-leftovers); [Fortune](https://www.fortune.com/2025/02/19/hp-humane-deal-ai-pin-shutting-down)

**Outright failures with stated reasons**
- *theGist* (Israel, 2022; $7M; AI summaries across Slack, email, CRM, analytics): ceased Sept 2025 and returned remaining capital to investors. Calcalist: "never gained sustainable traction despite its founders' track records," a pivot toward sales-focused products "failed to build momentum," and extended military reserve duty by key developers slowed progress. A post-mortem site attributes the root cause to being "commoditized by native features in Slack, Google Workspace and ChatGPT" (opinion-grade) — [Calcalist Tech](https://www.calcalistech.com/ctechnews/article/jeyngl375); [IdeaProof](https://ideaproof.io/failure/thegist-ai); original 2022 launch coverage — [TechCrunch](https://techcrunch.com/2022/11/15/thegist-uses-ai-to-summarize-slack-channels-and-threads)
- *subtl.ai* (internal knowledge-query): shut down July 2025 after failing to raise; founders said many companies tested it but did not convert to paid plans — [Analytics India Magazine](https://analyticsindiamag.com/ai-trends/7-ai-startups-that-failed-in-2025)

**Pivots / rebuilds**
- *Mem*: in 2023 said "while notes have been the primary way to capture knowledge in Mem, we've aspired to be more than a note-taking app"; Feb 2025 transition guide dropped older 1.0 features "to focus on speed, simplicity, and long-term reliability"; Oct 1, 2025 relaunched as Mem 2.0, "a completely rebuilt product, a bold new brand," positioned as an AI assistant rather than a notes app — [Mem: the new mem](https://get.mem.ai/blog/the-new-mem); [Mem 2.0 transition guide](https://get.mem.ai/blog/mem-2-dot-0-transition-guide); [Mem 2.0](https://get.mem.ai/blog/mem-2-dot-0); [AlternativeTo, Oct 2025](https://alternativeto.net/news/2025/10/mem-2-0-relaunches-with-smarter-note-taking-tools-offline-support-and-a-new-agentic-chat)
- A power-user community (Paperless Movement) publicly stopped using Mem as its PKM, calling it a "shallow thinking tool" — [myICOR blog](https://blog.myicor.com/why-weve-stopped-using-mem-as-our-pkms-shallow-thinking-tool-at-the-paperless-movement)
- *Reclaim.ai*: acquired by Dropbox Aug 22, 2024 (terms undisclosed; 43,000 companies, 320,000 users at the time); said it would keep developing under Dropbox and support existing users; framed as complementing Dropbox Dash — [TechCrunch](https://techcrunch.com/2024/08/22/dropbox-acquires-index-ventures-backed-ai-scheduling-tool-reclaim-ai/); [Reworked](https://www.reworked.co/digital-workplace/dropboxs-acquisition-of-reclaim-is-about-more-than-just-scheduling/)
- *Bardeen*: not acquired or shut; May 2025 repositioned from static browser automations to a "Work Intelligence Platform" around AI agents; ~$25.3M raised incl. 2024 round from Dropbox Ventures and HubSpot Ventures; still reviewed as live July 2026 — [Airframe](https://www.airframe.ai/product/bardeen-ai/analysis); [Voiceflow](https://www.voiceflow.com/articles/bardeen-ai)

**Alive as of 2026 (no distress found)**
- *Superlist*: v1.52.0 shipped March 26, 2026 (themes, duplication, Spanish localization) — [Superlist updates](https://www.superlist.com/updates/new-themes-and-spanish-localization)
- *Amie*: active; Product Hunt complaints center on reliability and platform coverage — [Product Hunt](https://www.producthunt.com/posts/amie-4)
- *Ellie* and *Routine*: active with 2026 updates (Routine: cross-platform, email-based login, recurring tasks redesign) — [Ellie's Routine review](https://ellieplanner.com/comparisons/routine-app-review); [App Store: Ellie](https://apps.apple.com/us/app/ellie-daily-planner/id1602196200)
- *Tana*: launched publicly with $25M total incl. $14M Series A at $100M valuation (early 2025); no later distress reporting — [Techleap](https://finder.techleap.nl/news/feed/tana-launches-with-25m-funding)
- *Rize* and *Timely*: both active; Rize shipped a major update March 26, 2026 — [Rize changelog](https://rize.io/changelog/march-2026-product-update); [Rize vs Timely (vendor)](https://rize.io/blog/rize-vs-timely)
- *Akiflow*: added a $19/mo "AI Meeting Assistant" add-on and a pricing FAQ in late Sept 2026; Pro listed at $34/mo monthly or $19/mo yearly incl. "Aki AI assistant + MCP Connector" — [PricingSaaS](https://pricingsaas.com/companies/akiflow/diffs/2026W40); [PulseSignal](https://getpulsesignal.com/pricing/akiflow)
- *Sunsama*: active, ~$17/mo annual (Oct 2026) — [PulseSignal](https://getpulsesignal.com/compare/akiflow-vs-sunsama)
- *Dola* (chat-based calendar bot): still listed in a 2026 roundup, but the name now also refers to a rebranded general assistant (ex-Cici), so status is ambiguous — [Morgen](https://www.morgen.so/blog-posts/best-ai-planning-assistants); [webiano](https://webiano.digital/dola-com-ai-assistant-from-a-to-z/)
- Shutdown trackers exist for cross-checking: [TechCrunch AI graveyard (Sept 15, 2026)](https://techcrunch.com/2026/09/15/the-ai-graveyard-a-running-list-of-projects-and-startups-that-didnt-make-it/); [Killed by AI](https://killedbyai.net/); [gravity.fast tracker](https://gravity.fast/data/ai-tool-shutdown-tracker/)

### Inferences
- Classification for a builder:
  - *Done and nobody wanted it enough to pay*: cross-tool summarization as a standalone (theGist), internal knowledge query (subtl.ai), a new inbox UI (Notion Mail), wearable assistants (Humane). The common thread is a thin layer over data the platform owner can summarize natively.
  - *Done well enough to be bought, then killed*: single-player AI calendars (Clockwise, Mayday, Reclaim's independence). The talent was worth more than the product; customer bases of 40k orgs did not protect the product. Expect the same fate for any "smart calendar" without a moat beyond scheduling logic.
  - *Done, rejected on privacy*: total-capture memory (Rewind desktop, Recall, Heyday). The capability is real; the acceptable form factor is unresolved.
  - *Pivoted away from the core*: Mem (notes → assistant), Bardeen (automation → agents), Limitless (software → hardware → Meta). Each abandoned the original wedge, suggesting the "AI notes" and "AI browser automation" wedges did not sustain a business.
- No founder post-mortem was found for a *personal task manager* specifically; the failures cluster in calendars, memory/capture, and summarization, not in to-do apps, which mostly persist as small/indie businesses (Superlist, Ellie, Routine, Sunsama, Akiflow).

### Gaps
- Kosmik: a single low-quality page claims it shut down; unconfirmed — [flowerswinery (unreliable)](https://store.flowerswinery.com/more-apps-will-shut-down.html)
- Magical, Timing, Nat.app, Capacities: no 2025-26 status news found either way.
- Motion: no 2025-26 corporate status news found (only comparison content).
- The TechCrunch AI graveyard page could not be fetched, so its productivity-tool entries and stated reasons are not enumerated here.
- No direct founder statement for theGist was found; both explanations are secondhand.

## KQ4. What does research or expert commentary say about why planning tools fail and what would help?

### Takeaway
HCI research (Gloria Mark and collaborators, 2005-2024) establishes that knowledge work is fragmented into ~47-second screen attention spans, ~57% of working spheres are interrupted, nearly half of interruptions are self-initiated, and resumption typically happens only after two or more intervening activities — so plans break structurally, not from lack of discipline. A 2023 Microsoft/academic study of 40 workers found demand for assistants that manage time, tasks and information, varying by occupation. Expert commentary (Burkeman, Newport, Le Cunff) converges on the warning that AI tools that make it easier to do more "checklist" work amplify the efficiency trap; what helps is reflection, adaptive/circular goals, and protecting depth.

### Cited Findings
- Mark, Gonzalez & Harris (CHI 2005, "No Task Left Behind?"): observing 24 information workers, 57% of working spheres were interrupted; most interrupted work resumed the same day, but only after more than two intervening activities — [CHI 2005 PDF](https://www.interruptions.net/literature/Mark-CHI05-p321-mark.pdf)
- Dabbish, Mark & Gonzalez (CHI 2011): 889 hours of observed switching across 36 workers at three tech firms; self-interruptions are a large share — [CHI 2011 PDF](https://www.ics.uci.edu/~gmark/Home_page/Publications_files/CHI%202011%20Self-interruption.pdf)
- People interrupt themselves 44% of the time vs. 56% external interruptions — [UCI ISR Connector](https://isr.uci.edu/sites/isr.uci.edu/files/connectors/ISR-Connector-10-SS08_0.pdf)
- The widely quoted "23 minutes to regain focus" is a press-quoted figure from Mark, not a verified CHI result — [Fast Company](https://www.fastcompany.com/944128/amazons-secret-weapon)
- Average screen-attention span fell from ~2.5 minutes (2004, 14 workers, 477 hours of observation) to ~47 seconds (since ~2016, computer logging, replicated by others); median 40 seconds; not a biological limit — [UC Newsroom](https://www.universityofcalifornia.edu/news/how-sharpen-your-attention-and-meet-your-goals-2024); [Steelcase transcript](https://www.steelcase.com/research/articles/our-47-second-attention-span-with-gloria-mark-s5-ep3-transcript/)
- Iqbal & Horvitz (CHI 2007) studied disruption and recovery of computing tasks — [CHI 2007 PDF](https://www.erichorvitz.com/CHI_2007_Iqbal_Horvitz.pdf)
- Khaokaew, Holcombe-James et al., "Imagining future digital assistants at work: A study of task management needs," IJHCS vol. 168 (2023): 40 workers over four weeks; confirms a role for assistants in managing time, tasks and information, and finds "different occupation roles require DAs to take varied approaches to these domains" — [Microsoft Research](https://www.microsoft.com/en-us/research/?p=922797); [arXiv 2208.03443](https://arxiv.org/pdf/2208.03443)
- Microsoft Research (CHI 2025 work): using generative AI can lead knowledge workers "to produce a narrower range of ideas, put less effort into critical thinking, and retain less of what they write or read"; MSR proposes reframing AI from assistant to "tool for thought" — [Microsoft Research blog](https://www.microsoft.com/en-us/research/articles/rethinking-ai-in-knowledge-work-from-assistant-to-tool-for-thought/)
- A CSCW 2026 paper (22 interviews with ADHD adults) finds productivity tools "designed for neurotypical users often assume consistent self-regulation and linear time," that task management for ADHD adults is "relationally and affectively co-constructed," and tests "AI-augmented social scaffolds" — [arXiv 2603.17258](https://arxiv.org/pdf/2603.17258)
- Oliver Burkeman (Behavioral Scientist interview): names the "efficiency trap" — being more productive "doesn't mean more novel writing and marathon running. It usually just means more work"; frames AI's promises for productivity as partly false — [Behavioral Scientist](https://behavioralscientist.org/ai-productivity-and-human-finitude-a-conversation-with-oliver-burkeman/)
- Cal Newport, Deep Questions ep. 370 (Sept 2025, "Deep Work in the Age of AI"): discusses a study where programmers using AI were slower, attributing it to "cybernetic collaboration" reducing focus intensity — [Podwise listing](https://podwise.ai/podcasts/566?page=5); Newport's "Slow Productivity" rules (do fewer things, natural pace, obsess over quality) and AI's effect on the workday — [Two Percent podcast](https://omny.fm/shows/2-with-michael-easter/what-ai-is-actually-doing-to-your-workday-cal-newport)
- An AI-generated summary of a fall 2026 Newport episode describes his system (Things 3, time-block planner, Google Calendar, vision document) and his view that AI amplifies "checklist productivity," finishing superficial tasks while distracting from deep work — secondhand, aggregator-grade — [Summify](https://summify.io/discover/how-to-gain-control-of-your-time-BUjf7T)
- Anne-Laure Le Cunff (Microsoft WorkLab, March 2025; *Tiny Experiments*): argues for a "circular model of growth, in which goals are discovered, pursued, and adapted," not linear plans — [Microsoft WorkLab](https://microsoft.com/en-us/worklab/podcast/neuroscientist-anne-laure-le-cunff-says-we-all-need-to-rethink-how-we-set-goals); Ness Labs positioned as a counterweight to tool-centric advice, emphasizing weekly review and reflection — [Every](https://every.to/superorganizers/how-anne-laure-le-cunff-wrote-200-767818)
- Tiago Forte (workshop recap, secondhand): people already good at organizing their thinking get more from AI note tools; advises sticking with a tool rather than switching — [LivingOS Substack](https://livingos.substack.com/p/tiago-forte-on-navigating-bottlenecks)

### Inferences
- The research implies the correct unit for a planning tool is not "the plan" but "the resumption": with 47-second spans and >2 intervening activities before return, a tool that holds the thread (what was I doing, what did I promise, what changed) is addressing the measured problem, whereas auto-scheduling addresses an idealized one.
- The occupational-variance finding (IJHCS 2023) and the ADHD finding (CSCW 2026) both argue against one-size-fits-all planners and for role- or cognition-specific designs; this supports the niche strategy in KQ5.
- The expert critique is a product constraint, not a rejection: a tool that reduces total work (dropping, deferring, declining) rather than scheduling more of it is the version Burkeman/Newport would endorse; none of the shipping AI planners in KQ2/KQ3 is designed to shrink the list.
- MSR's cognitive-offloading result suggests reconciliation/weekly-review features should keep the human in the evaluative loop rather than auto-generating conclusions.

### Gaps
- Nir Eyal and Khe Hy: no 2025-26 essays on AI planning found in results.
- No HCI study found that directly measures the "plan vs. actual" gap in knowledge workers' daily plans or evaluates LLM re-planning; the closest are the 2023 IJHCS needs study and interruption literature.
- Full text of the IJHCS 2023 design recommendations and the CSCW 2026 ADHD design concepts was not retrieved.

## KQ5. Are there niches with strong, specific demand and weak supply?

### Takeaway
Two niches show clear, documented demand with thin or generic supply: adults with ADHD (peer-reviewed interviews plus a wave of "one task at a time" indie apps, but no evidence of a dominant product) and multi-company/fractional professionals (LinkedIn "fractional" mentions up ~55x in two years; supply is calendar-sync utilities and human EAs, not work-organization tools). Meeting-heavy managers have well-documented pain but incumbents' meeting-notes features partially serve them. Non-English markets could not be assessed from these results.

### Cited Findings
**ADHD professionals**
- 22-interview CSCW 2026 study: tools assume "consistent self-regulation and linear time"; recommends AI-augmented social scaffolds — [arXiv 2603.17258](https://arxiv.org/pdf/2603.17258)
- AP/CHADD report: people with ADHD are turning to AI apps for tasks; experts advise caution — [CHADD](https://chadd.org/?p=59731)
- Indie supply is fragmented across many small App Store entries (Focus One, "add Task Manager" with on-device AI and capture/decide/do stages, Splitti, Smart2Do) — [Focus One](https://apps.apple.com/app/apple-store/id6756778795); [add Task Manager](https://apps.apple.com/bf/app/add-task-manager/id1492487688); [Splitti](https://apps.apple.com/us/app/-/id6473397856)
- Vendor claim (marketing): Notion/Asana fail many ADHD users because "setting them up is the task executive function cannot reliably deliver" — [arahi.ai](https://www.arahi.ai/blog/best-adhd-organization-tools-ai)
- "App fatigue" from separate tasks/habits/calendar/focus apps is cited as a problem — [opper.ai roundup (AI-generated)](https://opper.ai/ai-roundtable/questions/what-is-the-best-android-app-for-adhd-this-is-not-personal-fa53c684)

**People working across 2-3 companies (fractional, advisors, portfolio careers)**
- LinkedIn profiles mentioning "fractional" leadership rose from ~2,000 (2022) to >110,000 two years later; the piece names "coordinating schedules, meetings and overlapping digital calendars across multiple organizations" as the downside (contributor opinion piece, June 2026) — [Digital Journal via mce.ca.gov](https://www.notices.mce.ca.gov/2026/06/the-multi-calendar-professional-is-the-new-normal/)
- Vendors describe the pain: "multiple calendars, which often means missed meetings and double bookings"; "each client calendar sits on its own domain and has no context for the others" — [OneCal](https://www.onecal.io/use-cases/fractional-executive); [CalendarBridge](https://calendarbridge.com/calendar-syncing-for-fractional-resources/)
- Supply consists of calendar-merge/sync utilities and fractional executive-assistant services (unsourced 15-20% productivity claims) — [Boldly](https://boldly.com/blog/fractional-executive-assistants); [BELAY](https://blog.belaysolutions.com/fractional-executive-assistant)

**Managers with heavy meeting loads**
- Asana's Work Innovation Lab (2024 data, published April 2025): "unproductive meetings surged across the org chart, clogging calendars and grinding real work to a halt" — [Asana](https://asana.com/inside-asana/unproductive-meetings.md)
- Copilot for Teams meeting follow-ups are "generally accurate" but hallucinate and do not work on external calls — [tl;dv](https://tldv.io/blog/honest-review-of-ms-copilot-meeting-notes/)
- Akiflow now sells a $19/mo AI Meeting Assistant add-on, indicating planners see meetings as the monetizable wedge — [PricingSaaS](https://pricingsaas.com/companies/akiflow/diffs/2026W40)

**Non-English markets**
- Superlist shipped full Spanish localization (March 2026) and earlier German, suggesting localization is still a differentiator for small to-do apps — [Superlist](https://www.superlist.com/updates/new-themes-and-spanish-localization)
- Limitless/Meta excluded pendant support in the EU, UK, Brazil, China, Israel, South Korea and Turkey, showing regulatory friction for capture-based assistants outside the US — [BetaNews](https://betanews.com/2025/12/08/meta-has-acquired-limitless-a-startup-that-produces-ai-powered-wearables/)
- Gemini scheduling is excluded from consumer AI Pro, and Pulse launched Pro-only — platform features gate by plan, not language, but the supply search for Japan/Germany/Brazil-specific AI planners returned nothing — [Google Workspace Updates](https://workspaceupdates.googleblog.com/2026/09/create-content-schedule-events-and-coordinate-tasks-across-Workspace-regardless-of-what-app-you-are-in.html)

### Inferences
- Multi-company workers are the strongest "nobody has done it" niche in this set: the measured need is *context separation plus unified tracking* (promises to Client A vs. Client B, each in a different Slack/Google tenant), and current supply only merges calendars. LLM capture across tenants (with per-tenant data boundaries) is newly feasible and unaddressed.
- ADHD is "done badly / fragmented": many tiny apps, no evidence of one at scale, and research-backed design principles (one task, relational accountability, non-linear time) that none of the incumbents implement.
- Meeting-heavy managers are "partially served": incumbents capture action items from meetings but not the cross-meeting ledger (what I owe whom across 20 meetings/week, aging, follow-up), which is the same commitment-ledger gap as KQ1.
- The EU exclusion for Limitless and Recall's ICO inquiry imply any capture-based product aimed at non-US markets needs a privacy-first (local or consent-scoped) architecture from day one.

### Gaps
- No Reddit evidence from r/ADHD or r/productivity was retrievable; demand quotes are from research and app listings.
- No independent study quantifying time lost by fractional executives to multi-calendar/multi-tenant coordination.
- No data found on operators/analysts with reactive workloads as a distinct segment, nor on non-English-market AI planner startups (Japan, Germany, Brazil searches returned only generic US tools).
- Asana's 2025 Anatomy of Work manager-specific figures were not surfaced.
