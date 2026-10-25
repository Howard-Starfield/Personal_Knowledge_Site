---
id: "221a5d26-95a1-453d-aaa1-4c5e498081ff"
title: "Hands-On Implementation Lab: Production AI Help Desk Triage & Deflection Engine in Python: Question Bank"
description: "Practice questions for the hands-on lab lesson, covering the deflection gate, the composite priority engine, the dispatch and idempotency behaviour, and the lab's worked execution output."
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

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/08-hands-on-help-desk-triage-lab|Hands-On Implementation Lab: Production AI Help Desk Triage & Deflection Engine in Python]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "cbbdac10-32ff-42cc-ae90-55543d0e3f7c"
    revision: 1
    status: active
    type: single-choice
    prompt: "What must all three conditions hold for the lab's engine to deflect a ticket at Tier 0?"
    options:
      - id: gate-three
        text: "Confidence at or above 0.88, a priority below P1 and a category that is not security phishing"
      - id: gate-conf
        text: "Confidence at or above 0.88 on its own, because a high similarity always makes a safe deflection"
      - id: gate-050
        text: "Any similarity above 0.50, because the calibrated projection multiplies the raw similarity by 1.30"
      - id: gate-none
        text: "There is no gate, because the PII sanitization step already removes the risk of a wrong runbook"
    correctOptionIds: [gate-three]
    explanation: "The gating logic is a conjunction: the calibrated confidence, which is min(1.0, cosine similarity times 1.30), must reach at least 0.88, and the ticket must not be P1_CRITICAL, and its category must not be SECURITY_PHISHING. The other three options each drop one of the fences. Sanitization protects credentials, not correctness of the runbook, and the two lockouts exist because a confident match on a security incident or on a critical incident is exactly when an autonomous answer is most dangerous."
  - id: "1efa6997-eda0-4c92-a344-2f2f79253093"
    revision: 1
    status: active
    type: single-choice
    prompt: "On what composite score does the lab's priority engine set the boundary for P1_CRITICAL?"
    options:
      - id: p1-250
        text: "2.5, the point at which a ticket becomes P2_HIGH and is routed to a human technician"
      - id: p1-180
        text: "1.8, the point at which a ticket stops being P4_LOW and becomes P3_MEDIUM"
      - id: p1-330
        text: "3.3, or an impact and urgency pair of at least 3.5, whichever is reached first"
      - id: p1-400
        text: "4.0, which is the maximum the composite score can take before the engine gives up"
    correctOptionIds: [p1-330]
    explanation: "The classification is a cascade: P1_CRITICAL when the composite score reaches 3.3 or when impact and urgency both reach 3.5, P2_HIGH from 2.5 up to 3.3, P3_MEDIUM from 1.8 up to 2.5, and P4_LOW below 1.8. The impact and urgency shortcut matters because a production outage or a security incident is set to 3.5 on both axes by construction, so it lands in P1 whatever the other terms do. The other two thresholds are the P2 and P3 boundaries, and 4.0 is simply the top of the scale."
  - id: "03bac17a-66dc-48a7-9799-5e440b959dc7"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lab's worked run, Scenario 1 is Alice Smith's Okta MFA reset on a new company iPhone, submitted as a standard user. What did the engine decide?"
    options:
      - id: s1-network
        text: "NETWORK_VPN, P2_HIGH, deflected at confidence 0.90 against the KB-NET-045 runbook"
      - id: s1-iam
        text: "IDENTITY_ACCESS, P4_LOW, deflected at confidence 0.90 against KB-IAM-101"
      - id: s1-p3
        text: "IDENTITY_ACCESS, P3_MEDIUM, deflected at confidence 0.90 against KB-IAM-101"
      - id: s1-sec
        text: "SECURITY_PHISHING, P4_LOW, deflected at confidence 0.90 against KB-SEC-202"
    correctOptionIds: [s1-iam]
    explanation: "The recorded output is Category IDENTITY_ACCESS, Priority P4_LOW, Deflected True at confidence 0.90, matched runbook KB-IAM-101, the Self-Service Okta Multi-Factor Authentication Reset Runbook, at an execution latency of 2.14 ms. A standard user's lockout of their own authenticator has low impact and low urgency, so it lands in P4_LOW, and a confidence of 0.90 clears the 0.88 threshold. The security category is ruled out by the lockout and the network category by the ticket's actual content."
  - id: "d24ac238-ee00-48c6-82c4-283ff03915b0"
    revision: 1
    status: active
    type: single-choice
    prompt: "Scenario 2 is a VIP board member's production Kubernetes outage. Which technician does the engine dispatch it to, and why?"
    options:
      - id: s2-sarah
        text: "Sarah Lin (Tier 1 Support), because she has the most free concurrency headroom of the four"
      - id: s2-marcus
        text: "Marcus Vance (Tier 2 NetOps), because a Kubernetes cluster incident is really a network incident"
      - id: s2-devon
        text: "Devon Reed (Lead SecOps Incident Responder), because the ticket mentions revenue impact"
      - id: s2-elena
        text: "Elena Rostova (AGT-303), because CLOUD_DEVOPS is her only skill and she is not at capacity"
    correctOptionIds: [s2-elena]
    explanation: "The ticket classifies as CLOUD_DEVOPS and P1_CRITICAL, so it bypasses deflection and goes to the dispatcher. Elena Rostova, AGT-303, is the only technician in the pool whose skills include CLOUD_DEVOPS, and the dispatcher gives a full skill score of 1.0 to a match against 0.2 otherwise, so the recorded rationale reads Active 2/4, CognitiveLoad 5.5, SkillMatch True. Marcus Vance holds NETWORK_VPN and HARDWARE, Sarah Lin holds IDENTITY_ACCESS and SOFTWARE, and Devon Reed holds SECURITY_PHISHING."
  - id: "92431cd1-b31b-48ea-b26c-0ad118c320e3"
    revision: 1
    status: active
    type: single-choice
    prompt: "Scenario 3 is Bob Williams's phishing report. What did the engine do with it?"
    options:
      - id: s3-deflect
        text: "It was deflected, because the phishing runbook matches the wording almost exactly"
      - id: s3-p1
        text: "It was deflected, because a P1 incident only needs a higher confidence bar to pass"
      - id: s3-human
        text: "It was not deflected, because the security lockout sends it to Devon Reed (AGT-404) by hand"
      - id: s3-wait
        text: "It was queued for a technician, but only after the confidence threshold of 0.88 had been met"
    correctOptionIds: [s3-human]
    explanation: "The output reads SECURITY_PHISHING, P1_CRITICAL, Deflected False with the note Security Lockout Enforced, assigned to Devon Reed, AGT-404, at 1.65 ms. The lockout is unconditional, so the ticket never reaches the deflection gate however well the wording matches, and the P1 classification independently bypasses deflection as well. That is the point of the eligibility invariants: the categories where a wrong autonomous answer is most damaging are the ones the engine refuses to answer at all."
  - id: "5b0600bd-5f49-4e2e-8b8a-10614cc4ade2"
    revision: 1
    status: active
    type: single-choice
    prompt: "What key does the lab's idempotency ledger use to recognise a replayed ticket?"
    options:
      - id: idem-key
        text: "The submitter email and the SHA-256 content hash of the sanitized text, so a replay returns instantly"
      - id: idem-body
        text: "The raw ticket body and the current timestamp, so every submission is treated as a new request"
      - id: idem-uuid
        text: "The ticket UUID and the ITSM category, so any repeat of a category is suppressed as a duplicate"
      - id: idem-conf
        text: "The submitter email and the classification confidence, so that near-identical matches collapse together"
    correctOptionIds: [idem-key]
    explanation: "The cache key is the submitter email joined to the SHA-256 content hash computed over the sanitized title and description, so a byte-identical resubmission by the same person replays instantly while a different ticket from the same person does not. Scenario 4 shows the replay of ticket 2 returning CacheHit True at 0.50 ms with the rationale naming hash 8f9b4c12, and the ticket still enters the idempotency cache only after the full decision has been made."
  - id: "1bf998fe-f877-4c83-ab5f-55b91c495059"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lab's priority engine predict a ticket's resolution time?"
    options:
      - id: tcat
        text: "From the category baseline alone, because the category fixes the duration regardless of the ticket text"
      - id: tformula
        text: "From the category baseline, a word-count complexity term and a sentiment multiplier, capped at 300 words"
      - id: tqueue
        text: "From the queue depth of the target technician's team, because concurrency headroom dominates duration"
      - id: tconf
        text: "From the calibrated deflection confidence, because a low similarity always means a longer resolution"
    correctOptionIds: [tformula]
    explanation: "The estimate is the category base time multiplied by a complexity term of one plus 0.15 times min(word count, 300) raised to 0.4, and then by a sentiment term of one plus 0.35 times the sentiment score, and it is compared against the SLA target for the priority, which is 60 minutes for P1, 240 for P2, 480 for P3 and 1,440 for P4. The category baseline alone cannot explain duration because a short but furious ticket and a long but calm one in the same category resolve very differently."
  - id: "84402ac8-28e0-4c70-b0b6-f4fb305e824b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are the lab's deflection eligibility invariants? Select every correct answer."
    options:
      - id: inv-cat
        text: "Category lockout: SECURITY_PHISHING tickets are never deflected autonomously"
      - id: inv-pri
        text: "Priority lockout: any P1_CRITICAL ticket bypasses deflection entirely"
      - id: inv-conf
        text: "Calibrated confidence: only matches at or above 0.88 after the 1.30 projection trigger deflection"
      - id: inv-iam
        text: "Category lockout: IDENTITY_ACCESS tickets may never be deflected, whatever the similarity"
    correctOptionIds: [inv-cat, inv-pri, inv-conf]
    explanation: "The three invariants are the security category lockout, the P1_CRITICAL priority lockout and the calibrated semantic confidence gate at 0.88, where the confidence is min(1.0, cosine similarity times 1.30). IDENTITY_ACCESS is not locked out, and the lab's own Scenario 1 proves it: an identity ticket with confidence 0.90 is deflected at Tier 0 through KB-IAM-101. That asymmetry is deliberate, because an MFA reset is a reversible self-service action while a phishing report is an incident with a chain of custody."
  - id: "ded6c364-42ef-4006-8427-e6efdb0e29af"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these appear in the lab's production deployment and hardening checklist? Select every correct answer."
    options:
      - id: chk-secrets
        text: "Store the HMAC signing secret in HashiCorp Vault or AWS Secrets Manager, with 90-day key rotation"
      - id: chk-async
        text: "Wrap process_ticket() in an asynchronous worker pool with a 250 ms execution timeout ceiling"
      - id: chk-dlq
        text: "Keep a dead-letter queue for malformed payloads that fail Pydantic validation"
      - id: chk-root
        text: "Run the telemetry agent as root on every endpoint so remediation scripts always have full access"
    correctOptionIds: [chk-secrets, chk-async, chk-dlq]
    explanation: "The checklist asks for the HMAC signing secret to live in HashiCorp Vault or AWS Secrets Manager with automated 90-day rotation and dual-verification grace periods, for process_ticket() to be wrapped in an asynchronous worker pool such as Celery or FastAPI with a 250 millisecond timeout ceiling and a dead-letter queue for payloads that fail Pydantic validation, and for OpenTelemetry metrics, a 500-ticket golden regression dataset and an emergency kill-switch to be in place. Running the agent as root is the opposite of the posture the checklist sets."
  - id: "307c024a-435a-4edd-a1c0-8a326c817152"
    revision: 1
    status: active
    type: true-false
    prompt: "A ticket classified as SECURITY_PHISHING that matches a security runbook very closely should be deflected automatically, because the confidence is high."
    answer: false
    explanation: "The claim is false, and the lab's Scenario 3 is the proof. SECURITY_PHISHING is listed in the engine's NON_DEFLECTABLE_CATEGORIES, so the check returns before any similarity is even computed, and the recorded output reads Deflected False with the note Security Lockout Enforced and a hand-off to Devon Reed, AGT-404. Phishing reports need immediate human containment and chain-of-custody logging, and a P1_CRITICAL classification independently bypasses deflection as well."
  - id: "ff7ea18c-4f1f-4778-a065-b7e0334a84da"
    revision: 1
    status: active
    type: free-recall
    prompt: "Walk through the lab's Scenario 1 end to end: the Okta MFA reset with an embedded plaintext password and phone number, from sanitization through to the recorded routing decision."
    sampleAnswer: "The ticket comes from Alice Smith, a standard user, asking for an Okta MFA token reset after switching to a new company iPhone, and the raw description contains a plaintext password, password=Summer2026!, and a phone number, (415) 555-0199. Phase 1 sanitizes both before anything downstream sees them, replacing each with a salted reversible pseudonymization token of the form [REDACTED_{TYPE}_{HMAC12}], built from a keyed HMAC-SHA256 digest truncated to 12 hex characters, so that investigators can still correlate the exposure without the secret reaching a vector store or a log. The classifier then places the ticket in IDENTITY_ACCESS, and the priority engine, where a standard user with no outage gives low impact and low urgency, assigns P4_LOW. The deflection engine compares the sanitized query against the indexed runbooks, matches KB-IAM-101, the Self-Service Okta Multi-Factor Authentication Reset Runbook, and computes the calibrated confidence as min(1.0, cosine similarity times 1.30), which comes out at 0.90 and clears the 0.88 threshold, so the ticket is deflected at Tier 0 with no technician labour. The recorded execution latency is 2.14 milliseconds and the routing rationale states the runbook id and the 0.90 against 0.88 comparison."
    explanation: "A strong answer follows the seven phases in order and gives the recorded numbers, which are 0.90, KB-IAM-101, P4_LOW, IDENTITY_ACCESS and 2.14 ms. It should explain why the sanitization step is reversible pseudonymization rather than a flat mask, since the flat mask would destroy the forensic correlation the lab's design is trying to preserve."
  - id: "5af794d8-294f-4327-961c-1e622f01f075"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the lab's load balancer chooses a technician, what the resulting RoutingDecision carries, and which safety gates make the assignment safe."
    sampleAnswer: "The dispatcher scores every technician in the pool as skill score plus concurrency score minus load penalty. A technician whose skills list contains the ticket's category scores 1.0 on skill and one who does not scores 0.2, the concurrency term rewards headroom below the max_concurrency ceiling, and the load penalty scales the technician's cognitive_load_score by a tenth and by the load weight, with a hard penalty applied to anyone already sitting at the concurrency ceiling. The winning decision is written into a frozen RoutingDecision carrying the ticket id, the category, the priority, the full DeflectionResult with its matched article id, article title, resolution steps and citations, the assigned agent id and name, a routing rationale, an execution latency and a cache-hit flag. Three gates make this safe: SECURITY_PHISHING sits in NON_DEFLECTABLE_CATEGORIES so it always reaches a human responder, any P1_CRITICAL ticket bypasses deflection entirely, and every outbound webhook is signed with an HMAC-SHA256 signature so the downstream ITSM can verify the event came from this pipeline. In the lab's own run, Scenario 2 goes to Elena Rostova, AGT-303, on the strength of her CLOUD_DEVOPS skill and her free concurrency, and Scenario 3 goes to Devon Reed, AGT-404, because the security lockout bypasses deflection entirely."
    explanation: "A strong answer gives the scoring formula and the skill values of 1.0 against 0.2, explains that the dispatcher minimises fleet variance rather than picking whoever is free, and lists the fields of the RoutingDecision. It should also make the connection to the run's output, where the two routed scenarios land with their different agents, and to the three webhook events, one deflection and two routings, each carrying an HMAC-SHA256 signature."
```
