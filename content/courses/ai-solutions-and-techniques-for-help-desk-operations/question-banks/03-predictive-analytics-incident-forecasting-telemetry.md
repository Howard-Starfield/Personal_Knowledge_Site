---
id: "74356d27-766f-4cf1-8cff-024c180de8b6"
title: "Predictive Analytics & Telemetry: Time-Series Forecasting, Queuing Theory & Silent Failure Detection: Question Bank"
description: "Practice questions for the predictive analytics and telemetry lesson, covering seasonal decomposition, Erlang C queue sizing, preemptive endpoint remediation and silent failure detection."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - help-desk
  - study-guide
  - assessment
  - active-recall
courseId: "9f06e4da-f651-4857-95d5-df8a6fde9aa5"
comments: false
---

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/03-predictive-analytics-incident-forecasting-telemetry|Predictive Analytics & Telemetry: Time-Series Forecasting, Queuing Theory & Silent Failure Detection]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "e04d5dad-2add-4f59-90a9-3ad77c228aba"
    revision: 1
    status: active
    type: single-choice
    prompt: "A desk receives 30 tickets an hour, each taking 15 minutes to resolve. The lesson says the naive calculation of 30 divided by 4, which gives 7.5 agents and a roster of 8, is catastrophically flawed. Why?"
    options:
      - id: naive-mean
        text: "The average is right on paper, but arrivals and handling times are stochastic, so Erlang C is required"
      - id: naive-ok
        text: "It is correct, because 30 tickets at four an hour needs 7.5 agents, so eight technicians covers it"
      - id: naive-team
        text: "It undercounts, because each ticket needs several technicians working on it at the same time"
      - id: naive-arrival
        text: "It only fails when the ticket arrival rate changes, because handling time is perfectly predictable"
    correctOptionIds: [naive-mean]
    explanation: "Ticket arrivals follow a stochastic Poisson distribution and resolution times vary, so the average hides the variance. With eight agents the lesson computes an average queue wait of 24.2 minutes and a 80.7% probability that an incoming ticket has to wait at all, which is why Erlang C is needed to size the queue. The other options misstate the model: handling time is not perfectly predictable, the work is not done in parallel, and the naive figure is not correct even in expectation."
  - id: "a3f55a07-0422-4507-9d71-0fa5e088131f"
    revision: 1
    status: active
    type: single-choice
    prompt: "With an arrival rate of 30 tickets an hour, a 15-minute handle time and therefore an offered load of 7.5 Erlangs, what does the lesson's Erlang C table give for a team of 10 agents?"
    options:
      - id: erl-9
        text: "Utilisation 83.33%, P(wait) 0.5091 and an average wait of 5.09 minutes"
      - id: erl-10b
        text: "Utilisation 75.00%, P(wait) 0.5091 and an average wait of 5.09 minutes"
      - id: erl-10
        text: "Utilisation 75.00%, P(wait) 0.3066 and an average wait of 1.84 minutes"
      - id: erl-12
        text: "Utilisation 62.50%, P(wait) 0.0958 and an average wait of 0.32 minutes"
    correctOptionIds: [erl-10]
    explanation: "At ten agents the utilisation is 7.5 over 10, which is 75.00%, the Erlang C probability of waiting is 0.3066, the clearing margin is 10 x 4 - 30 = 10 tickets an hour, and the average wait is 0.3066 over 10 hours, which is 1.84 minutes. The 83.33% and 5.09-minute figures belong to nine agents, and 62.50% with 0.32 minutes belongs to twelve, so each distractor mixes rows of the sensitivity table."
  - id: "c90a7643-2513-468f-b4e0-8c8c80f7c73e"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson mean by the non-linear queuing cliff in Erlang C?"
    options:
      - id: cliff-linear
        text: "An extra agent always buys a proportional cut in wait time, because the queue scales linearly"
      - id: cliff-nonlinear
        text: "A 25% staffing increase can cut wait time by 92.4%, because the queue collapses non-linearly"
      - id: cliff-90
        text: "Wait time only falls once the desk passes 90% utilisation, because that is where the cliff is"
      - id: cliff-none
        text: "The queue is unaffected by headcount, because arrivals and handling times are the only variables"
    correctOptionIds: [cliff-nonlinear]
    explanation: "Going from 8 agents to 10 is a 25% staffing increase, yet the average wait collapses from 24.2 minutes to 1.84 minutes, a 92.4% reduction, because the Erlang C wait time is proportional to the probability of waiting divided by the clearing margin rather than to headcount. That is why the lesson adds the operational rule: never staff an enterprise support desk above 85% planned utilisation, because past that point tiny swings in arrival volume cause exponential surges in backlog."
  - id: "5a674160-9edb-4228-a9c9-88df52966b45"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson translates the deep-sea acoustic buoy analogy into ITSM terms. How much warning does predictive telemetry give before a database deadlock affects transactional throughput?"
    options:
      - id: buoy-4h
        text: "About 4 hours, which is the time a reactive desk needs to notice and escalate the fault"
      - id: buoy-45m
        text: "About 45 minutes, which is the time the wave takes to reach the harbour wall"
      - id: buoy-4s
        text: "About 4 seconds, because a sub-millisecond inference loop fires the moment the metric moves"
      - id: buoy-40m
        text: "About 40 minutes, which is long enough to run an automated volume expansion"
    correctOptionIds: [buoy-40m]
    explanation: "In the analogy a seafloor sensor detects a wave-height delta of just 1.5 centimetres and the buoy's satellite packet gives coastal systems 45 minutes of warning. The ITSM translation is that predictive telemetry intercepts the database deadlock 40 minutes before it affects transactional throughput, which is enough time to run an automated volume expansion or vacuum routine with no end-user disruption. The 45-minute figure belongs to the ocean scenario, not to the service desk."
  - id: "bb5bc96e-3762-4101-9b73-a8f083bcb39f"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's preemptive telemetry analyzer fires on a disk rule before any user reports a problem. What is the threshold that triggers the proactive hardware replacement?"
    options:
      - id: disk-10
        text: "10 pending sectors, because more than 10 in 24 hours means failure probability above 85%"
      - id: disk-18
        text: "18 reallocated sectors, because the reallocated count is the reliable predictor of imminent failure"
      - id: disk-5
        text: "5 pending sectors, because LAPTOP-DEV-8891's 12 pending sectors breach that threshold"
      - id: disk-1
        text: "1 pending sector, because any sign of sector reallocation should trigger an immediate replacement"
    correctOptionIds: [disk-5]
    explanation: "The analyzer is constructed with a pending_sector_threshold of 5, and Rule 1 fires PROACTIVE_HARDWARE_REPLACE as soon as a frame reports pending sectors at or above that value. The lesson's own demo device, LAPTOP-DEV-8891, carries 12 pending sectors, which is why the rule trips on it. Ten is the descriptive threshold the telemetry section uses for predicting failure probability, and neither the reallocated count nor a single pending sector is the code's trigger."
  - id: "f7190fe7-310d-48b2-8cb7-78ed9e2fad2b"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson define as a rage click, the first behavioural telemetry tripwire?"
    options:
      - id: rage-4
        text: "More than 4 clicks on one element within 1.5 seconds with no DOM state mutation"
      - id: rage-15
        text: "More than 4 clicks on one element within 15 seconds with a visible DOM state mutation"
      - id: rage-3
        text: "More than 3 clicks on one element within 1.5 seconds with no DOM state mutation"
      - id: rage-any
        text: "Any click sequence on one element lasting more than 1.5 seconds, however many clicks it takes"
    correctOptionIds: [rage-4]
    explanation: "A rage click is more than 4 clicks on a single UI element within a 1.5-second interval with zero DOM state mutation, which points to a broken event listener, a JavaScript crash or a dead submit button. The threshold is more than 4 clicks and the window is 1.5 seconds; the 3-refresh count belongs to the rapid reload loop tripwire instead."
  - id: "b2c55d8a-9c00-464d-b3db-6a786c74d61d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the ITSM 1:10:100 cost escalation rule charge for each of its three stages?"
    options:
      - id: rule-a
        text: "$0.15 for the preemptive self-healing stage, $150 for proactive intake and $1,500 for a reactive outage"
      - id: rule-b
        text: "$0.15 for the preemptive stage, $15 for proactive intake and $1,500 or more for a reactive outage"
      - id: rule-c
        text: "$15 for the preemptive stage, $150 for proactive intake and $1,500 for the reactive war room"
      - id: rule-d
        text: "$1.50 for the preemptive stage, $15 for proactive intake and $150 for the reactive war room"
    correctOptionIds: [rule-b]
    explanation: "Stage 1, preemptive self-healing with zero touch, costs $0.15 an event; Stage 2, proactive Tier-1 intake with diagnostic logs attached, costs $15.00; and Stage 3, the reactive escalated outage with a manual war room and Tier-3 engineers swarming, costs $1,500.00 or more. Each step is a tenfold escalation, which is the whole argument for moving failures left rather than answering tickets faster."
  - id: "6d3ff815-3280-48f9-abb7-5be854be7073"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are among the lesson's four operational planes of predictive ITSM? Select every correct answer."
    options:
      - id: plane-surge
        text: "Inbound Surge Forecasting"
      - id: plane-queue
        text: "Workforce Queue Sizing"
      - id: plane-hardware
        text: "Hardware and Asset Degradation"
      - id: plane-marketing
        text: "Marketing Campaign Response Analysis"
    correctOptionIds: [plane-surge, plane-queue, plane-hardware]
    explanation: "The four planes are Inbound Surge Forecasting, which predicts daily and hourly ticket volume from time-series decomposition and calendar regressors; Workforce Queue Sizing, which computes exact technician headcount through Erlang C; Hardware and Asset Degradation, which tracks component failure curves through continuous endpoint telemetry; and User Behavioral Friction, which surfaces silent application failures before anyone files a ticket. Marketing response analysis is not one of them."
  - id: "524cbc97-4d42-43ff-b487-fc701f21715b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are behavioural telemetry tripwires the lesson lists for detecting silent failures? Select every correct answer."
    options:
      - id: trip-rage
        text: "Rage clicks: more than 4 clicks on one element within 1.5 seconds with zero DOM state mutation"
      - id: trip-reload
        text: "Rapid reload loops: more than 3 refreshes of the same URL within 45 seconds after an HTTP code of 400 or above"
      - id: trip-dropoff
        text: "Session drop-off: more than 120 seconds in a multi-step workflow, then the browser tab is closed"
      - id: trip-tickets
        text: "Inbound ticket growth: a 15% rise in submissions over a rolling 14-day window"
    correctOptionIds: [trip-rage, trip-reload, trip-dropoff]
    explanation: "The taxonomy lists rage clicks, rapid reload loops and session drop-off, each defined by a specific click count, refresh count and time window. The fourth option is not a tripwire at all: a rise in submissions is the visible tip of the iceberg, and the lesson's whole argument is that the absence of tickets is what fails to indicate the absence of failure."
  - id: "69cbcb50-ceeb-4aa3-b413-c975c00c95ce"
    revision: 1
    status: active
    type: true-false
    prompt: "A 15% drop in total ticket volume is evidence that system stability in the enterprise has improved."
    answer: false
    explanation: "The claim is false, and the lesson's iceberg of digital workplace friction is the refutation. Only 1 in 6 broken events is ever reported, with 80% to 90% of dark defects submerged below the waterline, so a drop in ticket volume can equally mean that users have stopped bothering. That is why the lesson defines the Silent Failure Ratio, SFR = (U_telemetry - U_ticketed) / U_telemetry, which routinely exceeds 0.85, meaning that for every 100 employees whose productivity is interrupted by IT defects only 15 file a ticket."
  - id: "9fbce870-06fe-4d9b-9dfb-73e3b1617ae9"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the lesson's Erlang C example, work out the queue performance for a team of 10 agents and explain why the lesson calls staffing past 85% utilisation dangerous."
    sampleAnswer: "With 30 tickets an hour arriving, a 15-minute handle time and a per-technician rate of 4 tickets an hour, the offered load is a = 30 over 4 = 7.5 Erlangs. At c = 10 agents the utilisation is 7.5 over 10, which is 75.00%, the probability that an arrival must wait is C(10, 7.5) = 0.3066, and the clearing margin is 10 x 4 - 30 = 10 tickets an hour, so the average wait is 0.3066 over 10 hours, which is 1.84 minutes. The lesson's warning follows from the shape of the curve rather than from one number: going from 8 agents to 10, a 25% staffing increase, collapses the average wait from 24.22 minutes to 1.84 minutes, a 92.4% reduction. Above 85% planned utilisation the system is hyper-sensitive, so a small rise in arrivals produces an exponential surge in backlog and cascading SLA breaches, which is why it says never to staff an enterprise support desk above that level."
    explanation: "A strong answer states the offered load, the utilisation, the Erlang C probability, the clearing margin and the resulting wait, and then explains the cliff as a property of the nonlinear curve rather than quoting the 92.4% figure on its own. It should also connect the 85% rule to the consequence the lesson cares about, which is SLA breach cascades rather than waiting time in the abstract."
  - id: "c088f003-9625-4dac-965b-91e3d4d68ba2"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the silent failure problem as the lesson describes it: the size of the iceberg, the metric that measures it, and the tripwires that detect it."
    sampleAnswer: "The lesson says that in traditional ITSM, leadership reads a fall in ticket volume as improved stability, but the absence of a ticket does not mean the absence of a failure. Only 1 in 6 broken events is ever reported, with 80% to 90% of the dark defects submerged below the waterline, so the metric that captures this is the Silent Failure Ratio, SFR = (U_telemetry - U_ticketed) / U_telemetry, which routinely exceeds 0.85 in standard enterprise environments, meaning that for every 100 employees whose productivity is interrupted by IT defects only 15 file a ticket. The detection layer is a set of behavioural tripwires on the enterprise web portals: rage clicks, which are more than 4 clicks on one element within 1.5 seconds with zero DOM state mutation; rapid reload loops, which are more than 3 refreshes of the same URL within 45 seconds after an HTTP response code of 400 or above; and session drop-off, where a user spends more than 120 seconds in a multi-step workflow, hits a client-side validation error and closes the tab."
    explanation: "A strong answer gives the 1-in-6 reporting rate and the 80% to 90% submerged figure, states the SFR formula and its 0.85 typical value with the 100-workers-15-tickets reading, and names all three tripwires with their thresholds. The point it should draw is that ticket metrics are the wrong instrument for measuring digital workplace health, which is why the lesson asks for behavioural tripwires and in-context assistance prompts instead."
```
