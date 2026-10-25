---
id: "d2135e07-d89e-4ebc-a9ce-a1db8e74660c"
title: 'Exercise Files: Implementing CRM "Going Rotten" Timers & Pipeline SLAs: Question Bank'
description: "Practice questions on the decaying deal timer telemetry pipeline, SLA calibration, platform blueprints, daily triage, and golden path testing."
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

These questions practise [[courses/account-management-maintaining-relationships/lessons/05-exercise-files|Exercise Files: Implementing CRM "Going Rotten" Timers & Pipeline SLAs]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "b6c57c97-b22c-4cee-b45a-bc67f4a8ab18"
    revision: 1
    status: active
    type: single-choice
    prompt: "The exercise files model the cumulative probability of irreversible deal loss as a function of silence. Which expression do they use?"
    options:
      - id: linear-scaled
        text: "The elapsed days of silence divided by the decay window, capped at one, as a linear scale"
      - id: correct-exponential
        text: "One minus the exponential of the stage velocity coefficient multiplied by the elapsed days of silence"
      - id: added-coefficient
        text: "The probability that a deal is lost equals the stage velocity coefficient multiplied directly by the elapsed days of silence"
      - id: logarithmic
        text: "The natural logarithm of the elapsed days of silence, divided by the stage velocity coefficient"
    correctOptionIds: [correct-exponential]
    explanation: "The model is the probability of loss given silence equals one minus the exponential of the stage velocity coefficient multiplied by the elapsed days, which is the standard cumulative hazard form. The linear-scaled option substitutes a straight line for the exponential the files use, and the added-coefficient option multiplies the coefficient by the days instead of exponentiating it, which would exceed one well before the first day is out. The logarithmic option uses a form the files never introduce."
  - id: "cee4e1a5-fc7a-48ff-95f9-cd7279275dd9"
    revision: 1
    status: active
    type: single-choice
    prompt: "A deal sits in a stage whose decay window is 30 days, and it has been 24 days since the last logged touchpoint. What state does the telemetry engine assign it?"
    options:
      - id: active-healthy
        text: "Active and healthy, because the elapsed time is still below the decay window"
      - id: rotten-early
        text: "Rotten and breached, because the elapsed time is within a day of the decay window"
      - id: still-healthy
        text: "Healthy and on track, because the early warning window opens at 22.5 days and the elapsed time has not yet crossed into it"
      - id: correct-at-risk
        text: "Warning and at risk, because 24 days is at or past 22.5 days but still short of the 30-day decay window"
    correctOptionIds: [correct-at-risk]
    explanation: "The state machine has three bands: active and healthy while elapsed time is below 0.75 times the decay window, warning and at risk from 0.75 times the window up to the window itself, and rotten and breached once elapsed time reaches the window. For a 30-day window the early warning opens at 22.5 days, so 24 days falls inside the warning band and the card is flagged in the individual rep queues. The active-healthy and rotten-early options each sit on the wrong side of a boundary, and the still-healthy option asserts the opposite of the arithmetic it quotes."
  - id: "a8f3695b-342c-43f7-9433-ffd54c37c63a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the exercise files' stage velocity coefficients, what is the cumulative probability of loss after a five-day silence on an inbound lead?"
    options:
      - id: correct-loss
        text: "About 71.35%, from one minus the exponential of minus 0.25 times 5"
      - id: survival-figure
        text: "About 28.65%, because the remaining exponential term is the probability the deal survives"
      - id: summed-coefficient
        text: "About 15%, because the inbound stage velocity of 0.25 per day applied five times is simply added"
      - id: wrong-coefficient
        text: "About 59.34%, because a five-day silence is treated with the slower strategic retention coefficient of 0.015"
    correctOptionIds: [correct-loss]
    explanation: "Early stage inbound leads carry a stage velocity coefficient of about 0.25 per day, so one minus the exponential of minus 0.25 times 5 gives about 71.35% cumulative loss, which is why unresponsiveness after 72 hours correlates with a drop of more than 80% in conversion. The survival-figure option quotes the complementary term, 0.2865, and reads it as the loss. The summed-coefficient option adds instead of exponentiating. The wrong-coefficient option applies the strategic retention coefficient of 0.015, whose 59.34% figure belongs to a 60-day silence in a retention account, not to a five-day silence on a lead."
  - id: "89155718-c171-493c-a107-faafb9031902"
    revision: 1
    status: active
    type: single-choice
    prompt: "A deal in your rotten filter has already had three consecutive value touches go unanswered. According to the exercise files' daily triage runbook, what does Pathway C call for?"
    options:
      - id: escalate-now
        text: "Escalating the deal to the account director immediately and raising a high-priority task"
      - id: verified-wait
        text: "Scheduling a verified wait and logging a note until the client's board meeting has finished"
      - id: correct-disqualify
        text: "Cleansing the pipeline by moving the deal to Closed Lost or Long-Term Nurture"
      - id: sort-first
        text: "Sorting the deal to the top of the list, since it is now the most overdue account on the board"
    correctOptionIds: [correct-disqualify]
    explanation: "The triage decision splits three ways: Pathway A is active outreach with a tailored value script executed by 11:00 AM, Pathway B is a verified wait when a legitimate blocker is confirmed and a note plus a specific future task are logged, and Pathway C is disqualification once three consecutive value touches have gone unanswered, at which point the rep cleanses the pipeline into Closed Lost or Long-Term Nurture. The escalate-now option describes the software escalation path rather than a triage pathway, the verified-wait option is Pathway B and requires a confirmed blocker rather than three unanswered touches, and the sort-first option describes the ordering of the list, not a decision about any single deal."
  - id: "d7463450-3ff4-4f86-8659-8328793a66b4"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the exercise files' warning on idempotency and alert fatigue, what must the automation engine enforce so that the sales floor does not drown in noise?"
    options:
      - id: daily-cooldown
        text: "A 24-hour cooldown between automated alerts, so that each record is reviewed every working day"
      - id: digest-instead
        text: "A digest email rather than direct Slack pings, so that the alerts reach managers rather than flooding individual account managers"
      - id: one-batch
        text: "A single daily batch, because alert fatigue comes from evaluating a deal more than once per day"
      - id: correct-cooldown
        text: "A minimum 7-day cooldown between automated alerts for any record, enforced with a stored dispatch timestamp"
    correctOptionIds: [correct-cooldown]
    explanation: "The files require a mandatory 7-day cooldown period between automated task generation or channel alerts for any individual record, enforced by storing an atomic last-alert-dispatched timestamp and requiring the trigger condition that the current date minus that timestamp is at least 7 days. They also require an automated activity state-lock, so that the moment a verified touchpoint is logged the health status returns to healthy, the at-risk flag clears, and the last meaningful touch date updates. The daily-cooldown and one-batch options both use a far shorter window, and the digest-instead option changes the channel rather than the rate."
  - id: "74354ed7-180a-4b63-9b4c-2c739077bfa4"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the exercise files' verification phase, what does Test Flight 2 check?"
    options:
      - id: flight-one
        text: "That a logged phone call resets the days-since-last-touch counter to zero and clears any pending warning badges"
      - id: correct-flight-two
        text: "That a deal backdated to just under the boundary transitions to Rotten once the evaluator passes it"
      - id: flight-three
        text: "That a rotten deal left untouched for 48 hours produces no duplicate alerts or tasks"
      - id: escalation-check
        text: "That a 50,000 dollar deal escalates to the account director and the customer success vice president"
    correctOptionIds: [correct-flight-two]
    explanation: "Test Flight 2 is the boundary condition transition: a test deal is backdated to just under the threshold, the scheduled batch evaluator or system clock is advanced past it, and the expected result is that the pipeline health status flips to rotten, the card turns red, the Pipedrive badge shows the overdue day count, and the HubSpot list enrolls the deal. The flight-one option describes Test Flight 1, the activity reset verification. The flight-three option describes Test Flight 3, the idempotency and cooldown check. The escalation-check option describes a Freshsales workflow rule rather than any of the three test flights."
  - id: "1090b354-bf34-4fa6-8b21-40e7d44fcbda"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pair of platform and native feature does the exercise files' architectural comparison matrix give correctly?"
    options:
      - id: correct-pair
        text: "Pipedrive with a native Rotten Deals toggle per stage, and Freshsales with a native Deals Rot After parameter"
      - id: swapped-pair
        text: "HubSpot with a native Rotten Deals toggle per stage, and Pipedrive with a native Deals Rot After integer parameter"
      - id: hubspot-pipedrive
        text: "Pipedrive with calculated properties, and HubSpot with a native Rotten Deals toggle per stage"
      - id: freshsales-hubspot
        text: "Freshsales with custom board card colour rules, and HubSpot with a native Deals Rot After parameter"
    correctOptionIds: [correct-pair]
    explanation: "The matrix gives Pipedrive a native Rotten Deals toggle per stage and Freshsales a native Deals Rot After parameter, both of which set independent integer days per individual stage. HubSpot's primary native feature is instead a calculated property for days since last touch, driven through workflow automation and list filters, because it has no single-click toggle labelled with that name. The swapped-pair and hubspot-pipedrive options assign HubSpot the Pipedrive feature, and the freshsales-hubspot option assigns HubSpot the Freshsales feature."
  - id: "e779c56e-e2fc-4ca4-9e86-366bee02988c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are pathways in the exercise files' daily triage decision for a red-badged deal? Select every correct answer."
    options:
      - id: path-outreach
        text: "Active Outreach, where a tailored value script is selected and contact is executed by 11:00 AM"
      - id: path-wait
        text: "Verified Wait, where a legitimate blocker is confirmed, a note is logged, and a specific future task is scheduled"
      - id: path-disqualify
        text: "Disqualification, where three consecutive unanswered value touches move the deal to Closed Lost or Long-Term Nurture"
      - id: path-escalate
        text: "Escalation, where the account director is paged the moment a card turns red"
    correctOptionIds: [path-outreach, path-wait, path-disqualify]
    explanation: "The 15-minute daily rotten standup sorts the saved view by days overdue descending and then makes a rapid triage decision in under 60 seconds per account, with exactly three pathways: active outreach, verified wait, and disqualification. The escalation option is a downstream software behaviour rather than a human triage decision, and paging a director on every red card would defeat the idempotency and cooldown rules the files set out to protect attention."
  - id: "dea1a9da-adc6-4330-a346-e2b2437109ad"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are correctly paired stage and SLA decay windows from the exercise files' recommended calibration matrix? Select every correct answer."
    options:
      - id: matrix-inbound
        text: "Inbound Lead or First Contact uses a 3-day window with a 2-day early warning"
      - id: matrix-qbr
        text: "Scheduled QBR or Strategic Review uses a 30-day window with a 22-day early warning"
      - id: matrix-health
        text: "Ongoing Account Health uses a 45-day window with a 33-day early warning"
      - id: matrix-renewal
        text: "Contract Renewal or Expansion uses a 14-day window with a 10-day early warning"
    correctOptionIds: [matrix-inbound, matrix-qbr, matrix-renewal]
    explanation: "The calibration matrix sets Inbound Lead or First Contact at 3 days with a 2-day early warning, Scoping and Discovery Demo at 7 and 5, Proposal and Solution Design at 10 and 7, Legal, Security and Procurement at 14 and 10, Implementation and Training at 14 and 10, User Acceptance Testing at 7 and 5, Scheduled QBR or Strategic Review at 30 and 22, Contract Renewal or Expansion at 14 and 10, and Ongoing Account Health at 60 days with a 45-day early warning. The matrix-health item takes the early warning window and invents a 45-day decay window for it, which would flag a healthy account as rotting a full fortnight too early."
  - id: "eb48558c-f4f1-4ee3-b889-bc8500859e1c"
    revision: 1
    status: active
    type: true-false
    prompt: "The exercise files' Pipeline 3, Strategic Account Farming, Retention and Expansion, gives the Account Health stage a 60-day decay window. Is that the same window the files assign to the Inbound Lead stage in the New Business pipeline?"
    answer: false
    explanation: "The answer is false. The Inbound Lead stage of Pipeline 1 carries a 3-day decay window with a 2-day early warning, because commercial interest in a new prospect decays rapidly and unresponsiveness after 72 hours correlates with a drop of more than 80% in conversion. The Account Health stage of Pipeline 3 carries the 60-day window with a 45-day early warning, because a long silence in an existing account blinds the vendor to restructuring, executive turnover, or competitor encroachment. Separating the pipelines is what makes decay metrics meaningful, since forcing both into one pipeline destroys their accuracy."
  - id: "b3339441-b060-49b6-9054-b04a97662048"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the exercise files' stage velocity coefficients, explain why the same stretch of silence is far more dangerous on an inbound lead than on a strategic retention account, and quote the figures."
    sampleAnswer: "The files model cumulative loss as one minus the exponential of the stage velocity coefficient multiplied by the elapsed days of silence, and the coefficient differs sharply by stage. An inbound lead carries a coefficient of about 0.25 per day, so five days of silence gives one minus the exponential of minus 1.25, about 71.35% cumulative loss, which is why unresponsiveness after 72 hours is correlated with a drop of more than 80% in conversion. A strategic retention stage carries a coefficient of about 0.015 per day, so 60 days of silence gives about 59.34% and 90 days gives about 74.08%. The reason is structural rather than arbitrary: a lead's interest decays with the speed of the buying cycle, while an established account decays only with the slow accumulation of organizational change, so the same 60 days costs a lead almost everything and costs a retained account a fraction of its value."
    explanation: "A strong answer must use the model itself, one minus the exponential of the coefficient times the elapsed days, and must quote both coefficients and all three worked figures, 0.25, 71.35%, 0.015, 59.34% and 74.08%. It must also explain the reason in terms of cycle velocity rather than simply asserting that one is riskier. An answer that reports the two probabilities without the coefficients and the exponential form has not explained where they come from."
  - id: "cad9504c-3033-4a3f-b4f0-e6fa441767ef"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the exercise files' three golden path test flights and say what each one protects against."
    sampleAnswer: "Test Flight 1, the routine activity reset verification, creates a test deal in a stage with a 14-day SLA, backdates it to just inside the warning band, logs a call touchpoint, and confirms that days since last touch resets to zero and the warning flags clear, which protects against a timer that never resets and condemns healthy, actively worked accounts. Test Flight 2, the boundary condition transition at midnight, backdates the last activity to just under the threshold, advances the clock past the boundary, and confirms the deal flips to rotten, the card turns red, the Pipedrive badge shows the overdue day count and the HubSpot list enrolls, which protects against an off-by-one comparator that either misses a genuine breach or fires one prematurely. Test Flight 3, the escalation trigger and idempotency cooldown, leaves a rotten deal untouched for 48 consecutive hours, re-runs the evaluator, and confirms that zero duplicate Slack alerts and zero duplicate tasks are dispatched, which protects against alert fatigue, where account managers mute channels, develop cognitive blindness, and mark urgent tasks complete without acting."
    explanation: "A strong answer must name all three flights with their names, the routine activity reset, the boundary condition transition at midnight, and the escalation trigger and idempotency cooldown, and must attach a distinct protection to each. It should include the concrete details such as the 14-day SLA stage, the 48-hour untouched window, and the expectation of zero duplicates. An answer that lists three flights without saying what each catches has not given the reader a verification plan."
```
