---
id: "3bcf2e44-1729-4a94-9495-acce6468e99c"
title: "Chapter 4: Service Recovery & Retention — Owning Failures, Restitution & Preventing Recurrence: Question Bank"
description: "Practice questions on the net account equity model, radical ownership, decoupled restitution, and root-cause prevention engineering."
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

These questions practise [[courses/account-management-maintaining-relationships/lessons/04-service-recovery-and-retention|Chapter 4: Service Recovery & Retention — Owning Failures, Restitution & Preventing Recurrence]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "3925c092-a468-496b-a750-582ba71eeb65"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson models a client's relationship equity after an incident. Which expression does it use for the net post-incident equity?"
    options:
      - id: added-failure
        text: "Pre-incident equity plus the recovery regeneration factor, with the failure destruction factor added on top"
      - id: multiplied-ratio
        text: "Pre-incident equity multiplied by the recovery factor, divided by the destruction factor"
      - id: correct-equity
        text: "Pre-incident equity, minus the failure destruction factor, plus the recovery regeneration factor"
      - id: inverted-signs
        text: "Pre-incident equity plus the failure destruction factor, minus the recovery regeneration factor"
    correctOptionIds: [correct-equity]
    explanation: "The equation is net post-incident equity equals pre-incident equity minus the failure destruction factor plus the recovery regeneration factor, where the destruction factor is severity times criticality and the recovery factor is speed times ownership times restitution efficacy. The added-failure option adds the damage instead of subtracting it, which would make a serious outage raise the client's equity. The multiplied-ratio option substitutes a ratio for the additive structure the lesson uses, and the inverted-signs option reverses both signs."
  - id: "2aad8749-1cc5-417e-9960-d6acff8ae27b"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's Apex FinTech example, the two recovery scenarios share the same account, the same 75 of pre-incident equity, and the same failure. Why does one end at 91.2 of post-incident equity while the other ends at 3.6?"
    options:
      - id: faster-response
        text: "Scenario A moved faster because the client called the account manager, so its speed score was higher than Scenario B's"
      - id: correct-factors
        text: "Scenario B multiplied a speed of 1.4, an ownership of 1.4, and restitution of 45.0 into 88.2, while Scenario A's defensive factors produced only 0.6"
      - id: discovery-channel
        text: "Scenario A destroyed more equity because the client discovered the outage on social media rather than from a vendor alert"
      - id: baseline-difference
        text: "Scenario B ends higher because it started from a larger pre-incident baseline relationship equity, not because of anything done during the recovery"
    correctOptionIds: [correct-factors]
    explanation: "Both scenarios add their recovery factor to the same 75 minus 72.0 residual of 3.0, so the whole gap comes from the recovery factor. Scenario B scores 1.4 for speed because the vendor's own monitoring fired within 90 seconds and the account manager called the chief risk officer within 6 minutes, 1.4 for ownership because no finger was pointed, and 45 for restitution because the fix shipped with a blameless review, a completed corrective and preventive action roadmap, and a 25,000 dollar workshop, giving 88.2 and a net 91.2. Scenario A scores 0.3, 0.2, and 10, giving 0.6 and a net 3.6. The faster-response, discovery-channel, and baseline-difference options all claim a difference in something the lesson holds constant."
  - id: "8b575a20-2bd0-4756-9a02-3c9975b440bb"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the lesson's 4-Part Crisis Triage Script, which part commits the account manager to a fixed update interval?"
    options:
      - id: correct-clock
        text: "The fourth part, the Cadenced Clock Commitment, where the client receives a direct briefing every 30 minutes on the dot"
      - id: first-part
        text: "The first part, Emotional and Operational Validation, where the severity of the disruption is named"
      - id: second-part
        text: "The second part, Unconditional Embassy Ownership, where full personal ownership is accepted"
      - id: third-part
        text: "The third part, the Immediate Containment Roadmap, where the rollback to the last known stable checkpoint is announced"
    correctOptionIds: [correct-clock]
    explanation: "The script runs validation, ownership, containment roadmap, and finally the Cadenced Clock Commitment, in which the account manager promises a direct briefing on the line every 30 minutes on the dot, even when the update is only incremental diagnostic progress, so the client never has to chase. The first-part, second-part, and third-part options each name a real component of the script but answer a different question, since none of them commits to an update cadence."
  - id: "86723df1-e078-41cc-b4d9-d16d49c23ec2"
    revision: 1
    status: active
    type: single-choice
    prompt: "A vendor discounts an ongoing 100,000 dollar enterprise contract down to 75,000 to apologise for a four-hour glitch. According to the lesson, what does that do?"
    options:
      - id: recovers-margin
        text: "It recovers part of the margin lost during the outage, so the account returns to its original economics at renewal"
      - id: shows-remorse
        text: "It signals remorse, which strengthens the client's trust that the vendor takes the failure seriously"
      - id: keeps-list-price
        text: "It keeps the renewal conversation anchored on the original 100,000 dollar contract value, protecting list price"
      - id: correct-anchor
        text: "It permanently resets the client's reference price to 75,000, so renewal starts from a 25% lower baseline"
    correctOptionIds: [correct-anchor]
    explanation: "The lesson's Economic Anchor Trap shows that discounting from 100,000 to 75,000 permanently resets the client's reference price, so nine months later the client argues that 75,000 is the baseline and the ceiling. What began as a temporary three-hour hiccup becomes a permanent 25% gross margin penalty. The recovers-margin option claims the discount repairs the economics, the shows-remorse option mistakes a discount for a signal of accountability, and the keeps-list-price option reverses the anchoring effect, which is precisely what the discount destroys."
  - id: "087c4988-e198-47b2-a5c6-5ac6dce1ac48"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's 5-Whys analysis of a corrupted analytics dashboard traces back through four proximate causes. What does it identify as the root cause at Why 5?"
    options:
      - id: engineer-error
        text: "A software engineer who left the verbose debug logging mode switched on during an ad-hoc troubleshooting session two days earlier and never reverted it"
      - id: disk-full
        text: "A 200 GB uncompressed diagnostic log file that consumed all available disk allocation on the primary volume"
      - id: correct-gate
        text: "No automated CI/CD policy blocked debug logging in production, and no telemetry alerted on disk usage past 85%"
      - id: job-failure
        text: "A night-shift aggregation job that failed halfway and wrote incomplete summary tables"
    correctOptionIds: [correct-gate]
    explanation: "Why 5 is the systemic answer: there was no automated CI/CD deployment policy prohibiting debug logging in production and no automated telemetry alert when disk usage exceeded 85%, so a forgetful engineer could reach production unnoticed. The lesson contrasts this with the amateur answer of reprimanding the engineer, which does nothing to prevent recurrence, whereas deployment safeguards and disk-threshold monitors guarantee it cannot happen again. The engineer-error, disk-full, and job-failure options are genuine earlier steps in the chain, but they are proximate causes rather than the root."
  - id: "9726251f-744b-4c80-a303-c860444756ec"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the Protocol of Decoupled Restitution, when may the account manager reconnect with the client and deliver a goodwill gesture?"
    options:
      - id: correct-goodwill
        text: "Ten to fourteen days after the fix, as Stage 3, framing the gesture as a reward for loyalty rather than a bribe"
      - id: during-crisis
        text: "Immediately after the crisis starts, as Stage 1, so that the client sees an early sign of goodwill"
      - id: audit-window
        text: "Twenty-four to seventy-two hours after the fix, as Stage 2, where the blameless post-incident review and the corrective and preventive action plan are delivered"
      - id: renewal-only
        text: "Only at the renewal negotiation nine months later, when the price concession can be traded for a longer term"
    correctOptionIds: [correct-goodwill]
    explanation: "Stage 1, Tactical Triage, is for the crisis itself and permits zero commercial discussion; Stage 2, the Operational Audit, runs 24 to 72 hours after the fix and delivers the blameless review and corrective plan; Stage 3, Intentional Goodwill, runs 10 to 14 days after the fix and reconnects only once the dust has settled, framed as a reward for loyalty and patience and delivering non-price value such as advisory work or training. The during-crisis option smuggles a commercial gesture into the fire, the audit-window option names the wrong stage for a goodwill gesture, and the renewal-only option inverts the lesson's instruction to reward the customer after the problem is gone."
  - id: "1d47aa82-46c7-4780-a8ec-a09065b02933"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which element belongs in the lesson's 5-Pillar Post-Incident Review document?"
    options:
      - id: personal-performance
        text: "A technical deep dive into the engineer's personal performance during the incident window"
      - id: correct-timeline
        text: "A high-resolution timeline in UTC, from the anomaly through containment to verified health"
      - id: competitor-outages
        text: "A summary of comparable outages at competitor vendors to reassure the client of industry norms"
      - id: internal-appendix
        text: "An appendix listing every internal team member involved, for internal accountability purposes"
    correctOptionIds: [correct-timeline]
    explanation: "The five pillars are the executive summary, a high-resolution timeline in UTC down to the minute, the forensic root-cause analysis using the 5-Whys, the immediate remediation completed, and the systemic preventative commitments with delivery dates and owners. The timeline pillar is what makes the document credible, because it shows minute by minute when the anomaly appeared, when the internal telemetry fired, when the client was notified, when root cause was identified, when the containment patch shipped, and when the system was verified healthy. The personal-performance option reintroduces the blame the blameless format exists to remove, and the competitor-outages and internal-appendix options are material the lesson's format does not include."
  - id: "55eaf6d6-7c66-4e99-be9d-aeecb09f031a"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are among the lesson's Three Diagnostic Questions of Failure Recovery? Select every correct answer."
    options:
      - id: diag-why
        text: "Why did it fail, including whether the cause was training, testing, or a third-party vulnerability?"
      - id: diag-where
        text: "Where in the pipeline did it break, from early sales scoping through to routine maintenance?"
      - id: diag-who
        text: "Who or what was the true root cause, avoiding superficial human scapegoating?"
      - id: diag-accountability
        text: "Who should be held accountable for the failure, and what sanction will they receive?"
    correctOptionIds: [diag-why, diag-where, diag-who]
    explanation: "The three questions are why the failure happened, where along the end-to-end lifecycle it broke, and who or what was the true systemic root cause, with the third explicitly requiring the absence of superficial human scapegoating. The accountability question is not one of the three, and pursuing it is the amateur path the lesson rejects, since the point of the diagnostic is to find the missing validation gate rather than to name a person to reprimand."
  - id: "f714dc15-2e79-4981-9aec-69cb8032fc88"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are named in the lesson as high-leverage structural restitution options? Select every correct answer."
    options:
      - id: high-audit
        text: "A complimentary architecture and security audit, delivered as a two-day on-site workshop worth 15,000 dollars"
      - id: high-sandbox
        text: "Six months of complimentary access to the premium high-throughput enterprise developer sandbox"
      - id: high-rate-cut
        text: "A 20% recurring contract rate cut applied to the next renewal"
      - id: high-dinner
        text: "An executive dinner for the client champion and their executive sponsors, framed as a thank you"
    correctOptionIds: [high-audit, high-sandbox, high-dinner]
    explanation: "The high-leverage column of the restitution menu is made of gestures that expand the vendor's footprint and deliver strategic value: the two-day architecture and security audit, the six-month sandbox and API tier upgrade, the executive mastermind dinner, and executive sponsor alignment. The rate-cut item belongs to the low-leverage column of unstructured concessions, alongside grovelling gift baskets sent to receptionists and unbounded free scope creep, all of which erode gross margin rather than build a moat."
  - id: "74fa20ba-6fdf-405c-9a67-58e8ac3fbe7e"
    revision: 1
    status: active
    type: true-false
    prompt: "In the lesson's Scenario A, the account manager's first response to the outage was to explain that the cloud provider had an availability zone networking spike and that a junior engineer had run a script without staging it. Is that behaviour what the lesson's radical ownership doctrine prescribes?"
    answer: false
    explanation: "The answer is false. That posture is the blame-shift reflex the lesson calls catastrophic commercial cowardice: the client hears that the vendor's company is fractured by toxic internal silos, that it hires bottom-dollar suppliers, and that the account manager only cares about cashing a commission. Radical ownership means saying we made this mistake, never undermining your own team, absorbing the client's frustration, and presenting yourself as the client's internal fighter. The lesson's response to Scenario A is not to correct the presentation but to reverse the posture entirely."
  - id: "a4a29c09-2b40-40f5-8710-b20f792078a9"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the lesson's worked numbers, explain how the same Apex FinTech outage produces two completely different commercial outcomes under the two recovery postures."
    sampleAnswer: "The account is a 1,000,000 dollar annual recurring value contract with 75 of pre-incident equity. A Friday afternoon migration script deadlocks the primary transaction cluster and the mobile payments gateway is offline for three hours at peak dinner trading, so severity is 9 and criticality is 8, giving a destruction factor of 72.0 and leaving only 3.0 of residual equity. Under Scenario A the account manager is reactive and evasive, scoring 0.3 for speed, 0.2 for ownership and 10 for restitution because the response is a 15,000 dollar panic discount and no corrective plan, so recovery is 0.6 and net equity is 3.6, which ends in an immediate request for proposals and cancellation of the 1,000,000 dollar contract. Under Scenario B the internal monitoring fires within 90 seconds and the account manager calls the chief risk officer within 6 minutes with updates every 20 minutes, the system is stabilised within 45 minutes, and the response adds a 12-page blameless review, a completed corrective and preventive action roadmap and a 25,000 dollar hardening workshop, scoring 1.4, 1.4 and 45, so recovery is 88.2 and net equity is 91.2, a gain of 16.2 points or 21.6% over baseline, ending in a three-year 1,400,000 dollar renewal and a public case study."
    explanation: "A strong answer must carry the shared inputs, the 75 baseline, the severity of 9 and criticality of 8 giving 72.0, and the residual 3.0, then both scenario parameter sets, the 0.3, 0.2 and 10 of Scenario A giving 0.6 and 3.6, and the 1.4, 1.4 and 45 of Scenario B giving 88.2 and 91.2. It must close each with the commercial consequence, cancellation against an expanded three-year renewal. An answer that describes the two postures qualitatively without the arithmetic has not shown how the lesson's model produces the divergence."
  - id: "4768ecac-2abf-4a10-8f7b-ce85dcf195e5"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the lesson's Protocol of Decoupled Restitution, and say why an unprompted price cut is treated as dangerous rather than generous."
    sampleAnswer: "The protocol has three stages. Stage 1, Tactical Triage, focuses 100% on technical containment with zero commercial discussion, because command is earned through flawless updates rather than money. Stage 2, the Operational Audit, runs 24 to 72 hours after the fix and delivers a transparent blameless post-incident review and corrective and preventive action plan that proves the root cause has been engineered away. Stage 3, Intentional Goodwill, runs 10 to 14 days after the fix, reconnects only once the dust has settled, frames the gesture as a reward for loyalty and patience rather than a desperate bribe, and delivers non-price value such as advisory work, training, or a two-day architecture and security audit worth 15,000 dollars. A knee-jerk price cut is dangerous because it projects weakness and desperation, because a client who can win 30,000 dollars of discount in a ten-second call concludes that normal pricing is inflated, and because it resets the reference price: discounting 100,000 dollars to 75,000 turns a four-hour glitch into a permanent 25% gross margin penalty for every renewal that follows."
    explanation: "A strong answer must give all three stages with their timing, which is during the crisis, then 24 to 72 hours after the fix, then 10 to 14 days after the fix, and must state the three stages' distinct purposes, containment, proof of prevention, and a goodwill reward framed as a thank you. It must explain the danger of the discount through the lesson's three mechanisms, projected weakness, the signal that baseline pricing is inflated, and the Economic Anchor Trap, ideally with the 100,000 to 75,000 example and its 25% penalty. An answer that only says discounts are bad, without the anchor mechanism, has not answered the question asked."
```
