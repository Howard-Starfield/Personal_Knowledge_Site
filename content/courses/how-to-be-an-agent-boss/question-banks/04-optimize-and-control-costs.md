---
id: "c9410c77-3122-483d-a500-188219ca3eeb"
title: "Chapter 4: Optimize & Control Costs — Forecasting, Monitoring, and ROI: Question Bank"
description: "Practice questions on credit forecasting, consumption tripwires, portfolio tiering, net ROI and architectural cost optimisation."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - ai-agents
  - study-guide
  - assessment
  - active-recall
courseId: "fcc6b41f-6b81-4acb-9d11-99beb482fa0f"
comments: false
---

These questions practise [[courses/how-to-be-an-agent-boss/lessons/04-optimize-and-control-costs|Chapter 4: Optimize & Control Costs — Forecasting, Monitoring, and ROI]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "ba3b1460-1f16-4d14-98d6-a0e05524f1f6"
    revision: 1
    status: active
    type: single-choice
    prompt: "The worked Procurement Operations Agent forecast ends with a budgeted monthly burn of 26,376 credits. How does the chapter arrive at that figure?"
    options:
      - id: a
        text: "By adding the background sweep overhead to the base burn and then rounding the result up to the nearest capacity pack"
      - id: b
        text: "By taking the 21,980 credit base burn and adding the 20% Operational Safety Buffer the Agent Boss Rule requires"
      - id: c
        text: "By multiplying the 1,800 monthly sessions by the 12 sessions per user and the 2 credits per generative turn"
      - id: d
        text: "By adding the 10,080 knowledge credits, the 10,800 action credits and the 1,100 background credits together"
    correctOptionIds: [b]
    explanation: "The chapter's Agent Boss Buffer Rule says never to budget for the mathematical baseline, because in production users experiment, write verbose prompts and hit retry loops, so a 20% Operational Safety Buffer is added: 21,980 times 1.20 gives 26,376 credits a month. D adds the three components but produces the 21,980 base burn, before the buffer. C multiplies inputs that do not belong together, and A applies a rounding rule the chapter does not use."
  - id: "59f48cb8-18a2-47e2-9605-fb975342c3b6"
    revision: 1
    status: active
    type: single-choice
    prompt: "The forecast converts the budgeted burn into commercial capacity packs. What does the chapter decide?"
    options:
      - id: a
        text: "Procure one pack of 25,000 credits, because 26,376 credits is close enough to 25,000 to run the month"
      - id: b
        text: "Procure three packs, so there is enough headroom for a second agent launch early in the same month"
      - id: c
        text: "Procure no packs and set a hard ceiling on the agent instead, since the burn rate is only a forecast"
      - id: d
        text: "Procure two packs, giving 50,000 credits for $400 a month and leaving a 23,624 credit reserve"
    correctOptionIds: [d]
    explanation: "At 25,000 credits per pack at roughly $200 a month, 26,376 credits is 1.055 packs, and the chapter's decision is to procure two capacity packs, which gives 50,000 credits at $400 a month and leaves an ample 23,624 credit reserve to share with other departmental pilots. A under-provisions and would breach the ceiling, C ignores the procurement model entirely, and B overshoots without any stated reason."
  - id: "fcd0b89b-89bf-4aca-837b-88c56eee8df1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's consumption tripwires fire at three levels of monthly burn. What happens at the 75% tripwire?"
    options:
      - id: a
        text: "An early warning review, where you pull the top-burner attribution report and audit for session loops"
      - id: b
        text: "A critical action, where you enact the Tier-3 pausing protocol and protect the Tier-1 mission-critical workloads"
      - id: c
        text: "An informational check, where you validate the burndown velocity against the day of the month"
      - id: d
        text: "A hard platform freeze, where every agent in the tenant stops executing until the new billing cycle opens"
    correctOptionIds: [a]
    explanation: "The three tripwires are 50% informational, 75% early warning and 90% critical action. At 75% you pull the Top-Burner Attribution Report, review the top-burning agents, audit for session loops, and inspect the turn-to-resolution curve to see whether a prompt update pushed turns per session from 3.2 to 9.8. C is the 50% action and B is the 90% action. D is not a tripwire; the platform freeze is what the 90% action exists to prevent."
  - id: "a6e0923c-6932-4e7e-ad08-793d2993be1d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's Agent Tiering Governance Matrix says what to do with each tier of agent when the portfolio nears its ceiling?"
    options:
      - id: a
        text: "Tier 1 agents are throttled down to smaller models, and Tier 3 agents are left running until the ceiling is hit"
      - id: b
        text: "All three tiers are paused equally, so that no agent is treated as more important than another"
      - id: c
        text: "Tier 1 is protected and never paused, Tier 2 is throttled, and Tier 3 is paused until the next billing cycle"
      - id: d
        text: "Tier 1 is paused first because it burns the most credits, and Tier 3 is kept running as a morale measure for staff"
    correctOptionIds: [c]
    explanation: "Tier 1 is mission-critical and its action is PROTECT, never paused, with a guaranteed reserve pool; Tier 2 is operational core and its action is THROTTLE, downgrading to smaller models or rate-limiting session caps; Tier 3 is discretionary and its action is PAUSE, toggling the agent to Inactive until the next billing cycle opens. The Budget Ceiling Mitigation Rule exists because pausing Tier 3 reclaims 15% to 30% of credit velocity with zero operational disruption to Tier 1."
  - id: "98369c2a-44fa-412c-830f-9ff6823bbcda"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the AP Invoice Matching Agent case study, how many human hours a year does the agent unlock?"
    options:
      - id: a
        text: "Nine thousand six hundred hours, which is the whole baseline AP effort before the agent was introduced"
      - id: b
        text: "Eight thousand eight hundred hours, because human review falls to eight hundred hours a year"
      - id: c
        text: "Nine thousand six hundred hours less four thousand eight hundred hours of exception handling work"
      - id: d
        text: "Four thousand eight hundred hours, which is the seventy-five percent of invoices the agent resolves unaided"
    correctOptionIds: [b]
    explanation: "Baseline effort is 48,000 invoices times 0.20 hours, which is 9,600 hours a year. After the agent, the autonomous tier of 36,000 invoices costs zero minutes and the exception tier of 12,000 invoices costs four minutes each, which is 48,000 minutes or 800 hours, so the net hours unlocked are 9,600 minus 800, or 8,800 hours a year. A is the baseline rather than the saving, and D confuses the autonomous share with the saving."
  - id: "cf366671-4933-4c7e-b899-4c5683814cb1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The AP case study reports a Net ROI of 995.8% and a payback period of 1.09 months. How does the chapter get there?"
    options:
      - id: a
        text: "By dividing the gross benefit of $423,000 a year by the total cost of ownership of $38,600 a year"
      - id: b
        text: "By dividing the net annual value of $384,400 by the 48,000 invoices processed in a year to get a per-invoice figure"
      - id: c
        text: "By comparing the $45.00 hourly clerk cost against the number of credit capacity packs bought each month for the tenant"
      - id: d
        text: "By subtracting the $38,600 total cost of ownership from the $423,000 gross benefit, then dividing by that cost"
    correctOptionIds: [d]
    explanation: "Net ROI is gross benefit minus TCO, divided by TCO: $423,000 of gross benefit minus $38,600 of TCO gives $384,400, and $384,400 over $38,600 is 995.8%. The payback period is TCO over monthly gross savings, which is $38,600 over $35,250, giving 1.09 months, the 33 days the chapter quotes. A stops one step short and yields the gross benefit rather than the net return."
  - id: "af8ee692-0cdc-4eea-8125-8b373305e887"
    revision: 1
    status: active
    type: single-choice
    prompt: "Connector Payload Pruning is one of the chapter's four architectural optimizations. What does it achieve?"
    options:
      - id: a
        text: "It cuts a connector response from 4,200 tokens to 45 tokens by keeping only the three fields the agent needs"
      - id: b
        text: "It routes seventy to eighty percent of routine informational queries to a lightweight model instead of a frontier one"
      - id: c
        text: "It intercepts fixed navigation commands such as cancel and show main menu before they reach the generative engine"
      - id: d
        text: "It keeps role definitions and safety guardrails at the top of the prompt so the cached attention states can be reused"
    correctOptionIds: [a]
    explanation: "An ERP connector response can arrive as 4,200 tokens of metadata, GUIDs, timestamps and audit trails, and pruning it to the three fields the agent actually needs brings it to 45 tokens, a 99% reduction. B is multi-model routing arbitrage, C is deterministic shortcutting and D is prompt and context caching. The 90% figure the chapter gives for stripping bloated fields belongs to this same optimization."
  - id: "ec9c24e5-3db8-4e35-bed9-a25b24f10153"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are the chapter's four architectural cost optimizations? Select every correct answer."
    options:
      - id: a
        text: "Multi-model routing arbitrage, sending routine traffic to a lightweight model and reserving frontier models for hard reasoning"
      - id: b
        text: "Prompt and context caching, exploiting KV-cache reuse on the static system instructions"
      - id: c
        text: "Deterministic shortcutting, intercepting static navigation keywords before the generative engine runs"
      - id: d
        text: "Raising the sampling temperature, so that the model explores a more varied phrasing on each reply"
    correctOptionIds: [a, b, c]
    explanation: "The four parts are multi-model routing arbitrage, prompt and context caching, deterministic shortcutting and connector payload pruning. D is the opposite of what the chapter advises: a higher temperature is a creative choice, not a cost optimization, and the whole thrust of the chapter is to cut inference spend without any perceived loss of response quality."
  - id: "41b7e198-d978-4675-b4d1-7fce1cfc4690"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these agents does the chapter's Agent Tiering Governance Matrix put in Tier 3, the discretionary tier that is paused first? Select every correct answer."
    options:
      - id: a
        text: "The Internal Trivia and Social Lunch Bot"
      - id: b
        text: "The Company Swag Recommender"
      - id: c
        text: "The IT Helpdesk Reset Agent"
      - id: d
        text: "The AP Invoice Matching Agent"
    correctOptionIds: [a, b]
    explanation: "Tier 3 covers the Social Lunch Bot, the Trivia Bot, the Swag Recommender and sandbox hackathon prototypes, and its action is PAUSE, toggling the agent to Inactive until the next billing cycle opens. The IT Helpdesk Reset Agent is Tier 2 operational core, whose action is to throttle, and the AP Invoice Matching Agent is Tier 1 mission-critical, whose action is to protect and never pause."
  - id: "0ddb3910-eaaf-4872-ad64-553132c9701c"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter says that when a portfolio nears its credit ceiling, the right move is to pause whichever agent is burning the most credits."
    answer: false
    explanation: "That is Flawed Instinct 3, Kill the Top Burner, and the chapter shows it ending in a disastrous false economy: the top burner in the example was invoice matching, so killing it shuts accounting down and paralyzes the vendor supply chain. The Budget Ceiling Mitigation Rule is to immediately pause the non-critical Tier 3 agents, which reclaims 15% to 30% of portfolio credit velocity while guaranteeing zero operational disruption to Tier 1 mission-critical systems."
  - id: "e6b5e468-24ca-4420-bbff-ab5f2e1a581f"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter sets consumption tripwires at three levels of monthly burn. Name the three levels, what each one means, and what the Agent Boss does at each."
    sampleAnswer: "At 50% burn the tripwire is informational: you validate the burndown velocity against the day of the month, because hitting half the allocation on day fifteen of a thirty-day month is perfectly calibrated, while hitting it on day seven means you are running at more than double the forecast and need an investigation the next morning. At 75% burn it is an early warning: you pull the Top-Burner Attribution Report, review the top-burning agents, audit for session loops and inspect whether turns per session have spiked. At 90% burn it is critical action: passive observation is over, so you enact the Budget Ceiling Mitigation Protocol, pausing Tier 3 agents and protecting Tier 1 workloads."
    explanation: "A strong answer gives all three thresholds in order with the action attached to each, because a threshold without a response is only a number on a dashboard. The best answers also give the velocity test at the first level, since the same percentage means something different on day seven than on day fifteen."
  - id: "2f781042-7d01-4550-9f65-d79aaf55e6ec"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter's Enterprise Agent Net ROI formula has three terms. Name them and say what goes into each."
    sampleAnswer: "Direct Time Savings, S_t, is the annual volume of tasks multiplied by the hours saved per task, the fully loaded hourly wage and the adoption factor, and the chapter notes the fully loaded wage runs at about 1.25 to 1.35 times base salary because it carries benefits, payroll taxes and overhead. Quality and Error Savings, S_q, is the financial loss prevented by removing human data-entry mistakes, such as avoided late-payment penalties, reduced duplicate payments and audit recovery fees, and avoided compliance fines. Total Cost of Ownership, TCO, is platform creator licences plus annual Copilot credits plus connector and API costs plus maintenance labour. Net ROI is gross annual benefit minus TCO, divided by TCO, as a percentage."
    explanation: "A strong answer names all three terms and says what each contains, and states the formula as gross benefit minus TCO over TCO. The best answers note that the adoption factor and the fully loaded wage are what stop time savings from being overstated."
```
