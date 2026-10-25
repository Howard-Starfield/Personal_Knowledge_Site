---
id: "9e02ba14-8704-4c1c-8e82-5b86f3121d17"
title: "Chapter 3: Automating Account Cadence — Reminders, Rotten Timers & CRM Hygiene: Question Bank"
description: "Practice questions on milestone reminders, the rotten timer watchdog, the exponential decay model, CRM hygiene, and the zero-degradation handoff."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - account-management
  - study-guide
  - assessment
  - active-recall
courseId: "ddf6bbfc-4022-490b-833f-212b2ac5892f"
comments: false
---

These questions practise [[courses/account-management-maintaining-relationships/lessons/03-automating-account-cadence|Chapter 3: Automating Account Cadence — Reminders, Rotten Timers & CRM Hygiene]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "3feaf3e2-da24-4b06-b925-f4f1a781ff0b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the lesson's Relationship Resonance model with a relational decay coefficient of 0.033 per day, what is the relational half-life of an enterprise account?"
    options:
      - id: ten-days
        text: "About 10 days, because the decay coefficient applies directly to the elapsed interval"
      - id: thirty-days
        text: "About 30 days, because resonance only begins to decay once a full monthly reporting cycle has passed"
      - id: forty-five-days
        text: "About 45 days, because the warning threshold of 14 days must be added to the rotten threshold of 28 days"
      - id: correct-half-life
        text: "About 21 days, since the natural logarithm of 2 divided by 0.033 gives roughly 21.0 days"
    correctOptionIds: [correct-half-life]
    explanation: "The half-life solves for the point at which resonance falls to 50 out of 100, which gives 0.69315 divided by the 0.033 per day coefficient, or approximately 21.0 days. The ten-days option applies the coefficient directly rather than solving the exponential, the thirty-days option substitutes a reporting cycle the model does not contain, and the forty-five-days option adds two thresholds together when the model is continuous and has no steps."
  - id: "15098d6d-28ab-4055-823e-4c1c417fc60e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under the lesson's default watchdog, an account's elapsed time since the last logged touchpoint is 20 days. What state is that account in, and what does that state require?"
    options:
      - id: correct-amber
        text: "Warning Amber, because the account sits between the 14-day and 28-day thresholds and needs re-engagement"
      - id: fresh-green
        text: "Fresh Green, because any account contacted within the last month is still inside the active cadence band"
      - id: red-at-14
        text: "Decaying Red, because the 14-day threshold is the point at which an account is treated as rotten"
      - id: email-only
        text: "Decaying Red, because the timer measures the number of days since the last logged email only"
    correctOptionIds: [correct-amber]
    explanation: "The watchdog defines Fresh Green as elapsed time below 14 days, Warning Amber from 14 days up to but not including 28 days, and Decaying Red at 28 days or more. Twenty days therefore falls in Warning Amber, where the account manager receives an automated notification or Slack prompt to re-engage before the card escalates. The fresh-green option uses a month instead of the model's 14-day band, the red-at-14 option collapses the two thresholds into one, and the email-only option narrows the timer, which resets on any meaningful logged interaction including a completed call, an outbound email, a documented meeting summary, or a workshop note."
  - id: "8fdb1a3c-534b-45a8-9667-a1dbf28b8271"
    revision: 1
    status: active
    type: single-choice
    prompt: "An account is in an active contract renewal phase and its annual recurring revenue is 400,000 dollars. Which calibrated thresholds apply to it?"
    options:
      - id: tier-one
        text: "14 days to warning and 28 days to red, because the account is a Tier 1 strategic key account"
      - id: tier-two
        text: "21 days to warning and 45 days to red, because renewal accounts are treated as mid-market growth"
      - id: correct-renewal
        text: "7 days to warning and 14 days to red, because an in-flight renewal window demands the tightest cadence"
      - id: tier-three
        text: "30 days to warning and 60 days to red, because high-velocity commercial accounts are the most forgiving to leave alone"
    correctOptionIds: [correct-renewal]
    explanation: "The calibrated table has a separate row for an active contract renewal or expansion phase, with a warning threshold of 7 days and a rotten threshold of 14 days, because the deal is in flight and slips rapidly once daily momentum is lost. Its value alone would not place it in the tier rows. The tier-one option applies the 250,000 dollar strategic key row, the tier-two option applies the 50,000 to 250,000 dollar row, and the tier-three option applies the 10,000 to 50,000 dollar row, and each of those rows is overridden by the lifecycle stage when the account is mid-negotiation."
  - id: "f2ed4c58-8fd9-4aaf-8874-a09105143df6"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's worked decay table evaluates an enterprise relationship at day 60 of silence. What resonance score does it report, and what does that mean?"
    options:
      - id: amber-reading
        text: "About 13.8 out of 100, which places the account in the Warning Amber zone pending a re-engagement touch"
      - id: correct-indifference
        text: "About 13.8 out of 100, meaning the client perceives complete corporate indifference"
      - id: two-half-lives
        text: "About 50 out of 100, because 60 days is two full relational half-lives of 21 days each"
      - id: one-third
        text: "About 37.0 out of 100, because resonance falls by a third for every 20 days of silence"
    correctOptionIds: [correct-indifference]
    explanation: "The lesson evaluates 100 times the exponential of minus 0.033 times 60, which is about 13.81, and states that the client perceives complete corporate indifference, with the account in the Decaying Red and catastrophic churn zone. The amber-reading option attaches the wrong state to the right number, since 60 days is far past the 28-day rotten threshold. The two-half-lives option misapplies the half-life, because 60 days is nearly three half-lives rather than two. The one-third option invents a linear rule the lesson explicitly rejects, since decay is exponential rather than a stair-step."
  - id: "d69ef943-a2e6-402c-9626-0bcf8e6953ca"
    revision: 1
    status: active
    type: single-choice
    prompt: "A milestone reminder fires for a client's promotion. According to the lesson's Non-Commercial Outreach Protocol, what must that message contain?"
    options:
      - id: with-proposal
        text: "A congratulation, plus a short mention of the add-on proposal so the promotion is not wasted"
      - id: with-review
        text: "A congratulation, plus a reminder that the client's quarterly business review falls in the same month"
      - id: reusable-blast
        text: "A short congratulation only, so that the message can be reused across every client in the database"
      - id: correct-pure
        text: "A warm congratulation with absolutely no commercial solicitation attached to it whatsoever"
    correctOptionIds: [correct-pure]
    explanation: "The protocol's first rule is absolute commercial separation: the message contains no ask of any kind, because attaching a sales request to a birthday or promotion reveals the warmth to have been a Trojan horse and produces immediate psychological cynicism. The with-proposal option is the exact amateur behaviour the lesson condemns, the with-review option smuggles in a commercial reminder, and the reusable-blast option applies a generic blast to a milestone that was only worth sending because it was personal."
  - id: "6681edc7-2f79-4afd-94b6-85bcfd84ffec"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the lesson's portfolio analysis, what does an automated 14-day Rotten Timer cadence save an account manager who carries 20 accounts at 125,000 dollars of annual recurring revenue each?"
    options:
      - id: correct-savings
        text: "750,000 dollars of annual recurring revenue, by holding churn at 5% instead of letting it spike to 35%"
      - id: full-loss
        text: "875,000 dollars, because that is the loss from neglect that the automation entirely eliminates"
      - id: residual-loss
        text: "125,000 dollars, because that is the annual churn loss that remains even under the automated cadence"
      - id: whole-portfolio
        text: "2,500,000 dollars, because the automation protects the entire annual recurring revenue of the portfolio"
    correctOptionIds: [correct-savings]
    explanation: "The portfolio is worth 2,500,000 dollars of annual recurring revenue. Allowing accounts to drift past 60 days lifts annual churn probability from 5% to 35%, a loss of 875,000 dollars, while the automated cadence that resets resonance before it drops below 60 holds churn at 5%, a loss of 125,000 dollars, so the net annual capital saved is 750,000 dollars. The full-loss option reports the neglect loss without subtracting the residual, the residual-loss option reports the remaining churn cost rather than the saving, and the whole-portfolio option claims a result the model does not produce."
  - id: "47a9cf2d-8e93-40fe-b8d8-ebff1d18cc52"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's 14-Day Zero-Degradation Account Transfer Protocol, which phase covers days 4 to 7?"
    options:
      - id: phase-one
        text: "Phase 1, the Internal Intelligence Audit, when the outgoing and successor managers spend three hours reviewing the dossier"
      - id: phase-three
        text: "Phase 3, the Independent First Value Touch, when the successor delivers an answer to a lingering technical ticket"
      - id: correct-phase-two
        text: "Phase 2, the Warm Executive Pass-Off, with a joint 30-minute video huddle led by the outgoing manager"
      - id: same-day
        text: "There is no separate phase for those days, because the transfer must be completed inside a single working day"
    correctOptionIds: [correct-phase-two]
    explanation: "Phase 2, the Warm Executive Pass-Off, runs from days 4 to 7: the outgoing account manager contacts the client, explains the transition, and holds a joint 30-minute video huddle in which the outgoing manager leads the first 10 minutes and the successor demonstrates that they have already studied the account. Phase 1 is the internal audit on days 1 to 3 and Phase 3 is the independent first value touch on days 8 to 14, so the phase-one and phase-three options name the wrong windows, and the same-day option contradicts the protocol's entire 14-day span."
  - id: "28a42a9d-ed2f-4ece-b09b-2f1b2ad731ce"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are pillars of the lesson's 5-Pillar Contact Dossier? Select every correct answer."
    options:
      - id: pillar-hierarchy
        text: "Organizational hierarchy and reporting, covering champion, economic buyer, technical evaluator, and detractor roles"
      - id: pillar-passions
        text: "Personal passions and family or pets, including active hobbies, alma mater, and pet names"
      - id: pillar-objections
        text: "Historical objections and sensitivities, including scars left by previous vendor migrations"
      - id: pillar-entitlements
        text: "Contractual and pricing entitlements, covering the discount ladder and the renewal margin floors"
    correctOptionIds: [pillar-hierarchy, pillar-passions, pillar-objections]
    explanation: "The dossier architecture has five pillars: organizational hierarchy and reporting, personal passions and family or pets, communication preferences, historical objections and sensitivities, and inside jokes and conversational hooks. Three of the four items here name those pillars exactly. The entitlements item is not a pillar, because the dossier captures the human and political map of a stakeholder rather than the commercial terms of the account."
  - id: "f75ea503-ba93-4f07-84d8-ab2a96b85abe"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are correctly paired tier and threshold entries from the lesson's calibrated Rotten Timer table? Select every correct answer."
    options:
      - id: pair-tier-one
        text: "Tier 1 strategic key accounts at 250,000 dollars or more use 14 days to warning and 28 days to red"
      - id: pair-tier-two
        text: "Tier 2 mid-market growth accounts between 50,000 and 250,000 dollars use 21 days to warning and 45 days to red"
      - id: pair-tier-three
        text: "Tier 3 commercial accounts between 10,000 and 50,000 dollars use 14 days to warning and 28 days to red"
      - id: pair-renewal
        text: "Active contract renewal or expansion phases use 7 days to warning and 14 days to red"
    correctOptionIds: [pair-tier-one, pair-tier-two, pair-renewal]
    explanation: "The table calibrates Tier 1 strategic key accounts at 250,000 dollars and above to 14 and 28 days, Tier 2 mid-market growth accounts between 50,000 and 250,000 dollars to 21 and 45 days, Tier 3 commercial accounts between 10,000 and 50,000 dollars to 30 and 60 days, and an active renewal or expansion phase to 7 and 14 days. The tier-three item takes the Tier 1 thresholds and applies them to the lowest-value tier, which would generate constant noise on precisely the accounts that can be handled with digital touch."
  - id: "c9f59b2e-f998-4202-9404-928434a34da3"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson reports that 68% of customers who abandon a vendor do so because of perceived indifference, and that only 14% leave because of dissatisfaction with the product's functionality. Is client silence generally to be read as satisfaction?"
    answer: false
    explanation: "The answer is false, and the figures are the reason. The lesson's Inactivity Decay Trap states that silence in enterprise accounts is almost always a symptom of disengagement rather than satisfaction, because users who hit friction often stop logging in rather than complain, so a quiet account is a decaying account rather than a happy one. The 68% figure is the share of abandonments attributed to perceived indifference and the 14% figure is the share attributed to product dissatisfaction, which is why a Rotten Timer exists at all."
  - id: "b30fbc29-6ee3-4b35-869f-cb6cb8bfc2e1"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the lesson's decay model and portfolio analysis, explain what a 14-day cadence discipline is worth to an account manager carrying a portfolio of 20 accounts at 125,000 dollars each."
    sampleAnswer: "The portfolio is worth 2,500,000 dollars of annual recurring revenue. The resonance model shows why 14 days is the right reset point: at 14 days of silence the resonance score is 100 times the exponential of minus 0.033 times 14, about 63, still in the Warning Amber band, whereas at 60 days it has fallen to about 13.8 and the client perceives complete corporate indifference. Left unmonitored, accounts lingering below 20 for more than 30 consecutive days see annual churn probability spike from 5% to 35%, a loss of 875,000 dollars. A 14-day timer that resets resonance before it drops below 60 holds churn at 5%, a loss of 125,000 dollars, so the discipline protects 750,000 dollars of annual recurring revenue, which is why the lesson calls it a margin protector rather than a productivity hack."
    explanation: "A strong answer must carry the decay model and the portfolio arithmetic, so at least one resonance value such as 63 at day 14 or 13.8 at day 60, the 2,500,000 dollar portfolio figure, the 5% to 35% churn spike, and the resulting 750,000 dollar saving. It should also explain why 14 days is the intervention point rather than merely stating the number. An answer that says the timer saves money without any of the figures has not shown it follows from the lesson."
  - id: "d3e77a18-8926-4112-808d-4474dece5740"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the three phases of the lesson's 14-Day Zero-Degradation Account Transfer Protocol and say what makes the handover non-degrading."
    sampleAnswer: "Phase 1, the Internal Intelligence Audit, covers days 1 to 3: the outgoing and successor account managers spend three dedicated hours reviewing the CRM dossier, auditing open tickets, unfulfilled promises, roadmap commitments and contract terms, and reviewing the political landscape to identify champions versus dormant detractors while verifying that no Rotten Timer alerts are open. Phase 2, the Warm Executive Pass-Off, covers days 4 to 7: the outgoing manager contacts the client, explains the transition, and runs a joint 30-minute video huddle in which the outgoing manager leads the first 10 minutes and the successor shows they have already studied the account. Phase 3, the Independent First Value Touch, covers days 8 to 14, when the successor reaches out alone with a high-leverage non-commercial gesture such as answering a lingering technical ticket or sharing a report relevant to the client's Q3 goals. The handover is non-degrading because the client never has to re-educate their vendor, which is what separates it from the cognitive single point of failure that produces institutional amnesia."
    explanation: "A strong answer must give all three phases with their day ranges, so days 1 to 3, days 4 to 7, and days 8 to 14, and must include the distinguishing action in each, the three-hour audit, the joint huddle with the outgoing manager leading the first 10 minutes, and the solo value touch. It must also connect the protocol to the institutional amnesia it exists to prevent. An answer that lists two phases, or that omits the day ranges, has not given the reader the protocol in a form that could be executed."
```
