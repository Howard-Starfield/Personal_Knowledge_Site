---
id: "6a2d142a-5153-40a3-ac08-32c92cd4690f"
title: "Generative AI in Fraud Operations: Automated Natural Language Alerts, Case Narratives & Fiduciary Governance: Question Bank"
description: "Practises the event pipeline and its latency budget, the six-tier incident report, audience-specific drafting, and the governance controls that keep a language model out of the decision."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - fraud-detection
  - study-guide
  - assessment
  - active-recall
courseId: "81b8076a-4b7c-4ab3-9320-4702482db781"
comments: false
---

These questions practise [[courses/ai-in-risk-management-and-fraud-detection/lessons/03-generative-ai-alerts-audit-reporting|Generative AI in Fraud Operations: Automated Natural Language Alerts, Case Narratives & Fiduciary Governance]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "7b76a5c3-2ab7-4e25-a644-b6ed3339cf3f"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson frames generative AI in fraud operations with a telemetry datalogger and a court stenographer. Which statement captures the division of labour it draws?"
    options:
      - id: llm-scores
        text: "The generative model produces the probability score, because only a language model can weigh thousands of features at once"
      - id: score-then-narrate
        text: "The discriminative models produce the score, and the language model turns the verified telemetry into a legal instrument"
      - id: averaged
        text: "The two systems run independently and their outputs are averaged, so the language model contributes half of the decision"
      - id: stenographer-audits
        text: "The court stenographer audits the telemetry datalogger, so the numeric features are checked against the narrative before the score is published"
    correctOptionIds: [score-then-narrate]
    explanation: "The lesson's synthesis is explicit: discriminative models such as Isolation Forests, XGBoost and neural networks are the telemetry dataloggers, and the language model is the sworn court stenographer that takes verified sensor readings and packages them into a coherent legal instrument with clear causal attribution. The datalogger cannot explain why the valve jammed or what liability follows, and the stenographer cannot detect the anomaly in the first place. The division of labour is the whole architectural argument, and it recurs in the SR 11-7 pillar on conceptual soundness."
  - id: "e1fd3738-091f-4600-83b3-60e817c260fa"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's event pipeline, what happens to a transaction whose calibrated fraud probability comes back at 0.90?"
    options:
      - id: to-ledger
        text: "It is written to the standard ledger, because the high-priority routing threshold is set at 0.95"
      - id: ledger-and-slack
        text: "It is written to the standard ledger and a Slack message is sent to the compliance channel, because the webhook fires on every scored transaction"
      - id: rescored-after-narrative
        text: "It is rewritten by the language model into an incident narrative and then scored again, because the narrative decides the final probability"
      - id: high-priority-path
        text: "It is routed to the high-priority path, because the gate sends transactions at or above 0.85 to fraud alerts"
    correctOptionIds: [high-priority-path]
    explanation: "The risk gate splits the stream on the calibrated score: anything below 0.85 goes to the standard ledger, and anything at or above 0.85 goes to the high-priority path, the fraud alerts topic that carries the case into tokenization, narrative generation and webhook dispatch. A score of 0.90 is above that gate. The language model never re-scores anything, and the webhook fires on the routed cases rather than on every transaction that was scored."
  - id: "b0f2adc2-374b-4603-9bbc-fab419c32b6b"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson gives every stage of the pipeline a latency budget and a failure mode. Which pairing does it give to the model inference step?"
    options:
      - id: twenty-five-heuristic
        text: "Under 25 milliseconds, with a fallback to heuristic rules"
      - id: eighteen-hundred-template
        text: "Under 1,800 milliseconds, with a fallback to a Jinja2 template"
      - id: fifty-decline
        text: "Under 50 milliseconds, with the transaction declined if the step fails"
      - id: fifteen-static-baseline
        text: "Under 15 milliseconds, defaulting to the static baseline features when Redis is unavailable"
    correctOptionIds: [twenty-five-heuristic]
    explanation: "Each row of the latency budget table pairs a budget with a degradation path. Ingestion and authentication run synchronously under 50 milliseconds and decline the transaction if they fail. Feature extraction runs under 15 milliseconds and defaults to the static baseline. Model inference runs under 25 milliseconds on a compiled ONNX Runtime or TensorRT engine and falls back to heuristic rules. Risk gate routing is asynchronous under 10 milliseconds with a dead-letter queue, tokenization is asynchronous under 30 milliseconds, and language-model synthesis is asynchronous under 1,800 milliseconds with a Jinja2 template fallback."
  - id: "cb663ffb-2839-451f-a4ac-524446f4824c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which layer of the six-tier incident report carries the customer's 90-day baseline deviation, the merchant category divergence and the geovelocity impossibility?"
    options:
      - id: tier-one
        text: "Tier 1, the case identifier and cryptographic header, because every figure in the report has to be bound to the case identifier"
      - id: tier-four
        text: "Tier 4, the quantitative machine learning evidence, because the z-score and the SHAP values are the baseline deviation figures"
      - id: tier-five
        text: "Tier 5, the customer baseline deviation layer"
      - id: tier-six
        text: "Tier 6, the recommended fiduciary disposition, because only that layer is allowed to quote the customer's history"
    correctOptionIds: [tier-five]
    explanation: "Tier 5 is the customer baseline deviation layer: the 90-day baseline mean, standard deviation and maximum, the merchant category code divergence, the geovelocity impossibility where the distance over the elapsed time exceeds subsonic flight speeds of more than 900 km/h, and any deviation in authentication protocol. Tier 4 holds the model's own quantitative evidence, the calibrated probability, the SHAP attributions and the z-scores against the global payment network. Tier 1 is the cryptographic header and Tier 6 is the recommended disposition and regulatory actions."
  - id: "40a099b9-7aec-49ac-b461-14433fb51d85"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked case an $18,000.00 wire is attempted on an account whose 90-day mean disbursement is $2,150.00. What does the lesson say the z-score is, and what does it say the amount represents?"
    options:
      - id: against-std-dev
        text: "7.41, because the amount is compared against the 90-day standard deviation rather than against the mean"
      - id: eight-point-three-seven
        text: "7.41, which is an 8.37 standard deviation increase over the 90-day mean"
      - id: shap-value
        text: "0.42, because that is the SHAP contribution the geolocation feature makes to the fraud score"
      - id: geovelocity
        text: "10420.5, because that is the implied travel speed in kilometres per hour between the two login locations"
    correctOptionIds: [eight-point-three-seven]
    explanation: "The regulatory narrative in the lesson states it plainly: the $18,000.00 transfer is an 8.37 standard deviation increase, a z-score of plus 7.41, over the account's 90-day historical mean of $2,150.00, and it exceeds the maximum historical disbursement of $4,500.00 by 400%. The 0.42 is the SHAP value for geovelocity, the single largest feature attribution, and 10,420.5 is the implied kilometres per hour, which is a different finding altogether."
  - id: "71540f47-4994-4ff7-ae1e-1409e097bf05"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson says the same case has to be written twice. What is the difference between the executive brief and the regulatory filing?"
    options:
      - id: swapped-citation
        text: "The executive brief cites the statutory codes in full, while the regulatory filing sticks to plain language for readability"
      - id: swapped-length
        text: "The executive brief runs to 400 to 1,200 words and the regulatory filing is capped at under 200 words"
      - id: one-canonical
        text: "There is no difference, because the regulation requires one canonical incident report that every recipient receives unchanged"
      - id: correct-shape
        text: "The executive brief runs under 200 words and cites policies, while the regulatory filing runs 400 to 1,200 words and cites statutes"
    correctOptionIds: [correct-shape]
    explanation: "The audience comparison table fixes both lengths and both citation styles. The executive brief is under 200 words, one to two screen views, strategic and action-oriented, leads with net profit and loss exposure and operational uptime, and cites at a high level such as a wire recall under UCC Article 4A with retention set by internal corporate policy. The regulatory filing runs 400 to 1,200 words as a comprehensive dossier, states exact UTC timestamps, IPs, ASNs and device hashes, cites explicit statutory codes such as 31 CFR 1020.320, and carries the mandatory five-year federal retention requirement."
  - id: "da374ed0-432d-4059-be8a-5d18ae026538"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's adversarial example a $49,850.00 wire carries a remittance memo that tries to override the system instructions. Which defence actually stops it?"
    options:
      - id: upstream-score
        text: "The upstream discriminative model sets the fraud probability, so a compromised narrative cannot alter the score or the hard lock"
      - id: prompt-guard
        text: "The narrative generator is told in the system prompt never to treat a memo field as an instruction, so the jailbreak never reaches the model"
      - id: signature-check
        text: "The webhook dispatcher verifies the narrative's cryptographic signature before sending it, so the injected briefing is dropped at the very last hop"
      - id: rescored
        text: "The fraud score is recalculated after the narrative is written, so the injected text is caught by the second pass"
    correctOptionIds: [upstream-score]
    explanation: "The lesson's second barrier is deterministic pre-LLM anomaly filtering: the language model never sets the fraud probability. That number comes from upstream discriminative models such as XGBoost and Isolation Forest, so even a fully compromised narrative cannot move the score away from 0.968 or disengage the automated hard-lock. A prompt guard alone is not a boundary and a signature only proves integrity, not truth; there is no second scoring pass, because the score was never the language model's to set."
  - id: "858f72b6-1d8a-4f1a-b451-936fc5c3a0e7"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two of these are part of the lesson's account of the three SR 11-7 pillars for model risk management? Select every correct answer."
    options:
      - id: conceptual-soundness
        text: "Conceptual soundness, which requires the decision boundary to stay in verified discriminative algorithms rather than in the language model"
      - id: monitoring-benchmarking
        text: "Ongoing monitoring and hallucination benchmarking, which measures factual fidelity, omission rate and semantic drift"
      - id: outsourced-hosting
        text: "Outsourced model hosting, which lets the institution delegate the hallucination benchmark suite to the model vendor"
      - id: federated-benchmarking
        text: "Federated benchmarking, which requires every bank in the consortium to train on one shared synthetic corpus"
    correctOptionIds: [conceptual-soundness, monitoring-benchmarking]
    explanation: "The three pillars are conceptual soundness, ongoing monitoring with hallucination benchmarking, and outcomes analysis with human-in-the-loop review. Conceptual soundness holds that because language models are probabilistic autoregressive sequence models they cannot be the sole authority deciding whether an account is fraudulent, so the decision boundary stays in verified discriminative algorithms and the model is restricted to deterministic summarisation of verified telemetry. The monitoring pillar measures factual fidelity, so that 100% of the numerical figures cited in a generated report match the input telemetry payload, plus omission rate and semantic drift as the vendor ships model updates. Neither outsourcing the benchmark suite nor training on a shared corpus is a pillar."
  - id: "dc19cdbb-17d9-4bb0-a50f-b52beef53e73"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three of these are among the lesson's controls for handling personally identifiable information in the alert path? Select every correct answer."
    options:
      - id: pci-req3
        text: "PCI DSS requirement 3, under which the cardholder number becomes an irreversible cryptographic token before the payload leaves the tokenization proxy"
      - id: vault-boundary
        text: "A zero-plaintext PII vault boundary, where re-hydration is possible only for an authorised Bank Secrecy Act analyst on an air-gapped terminal"
      - id: pci-req10
        text: "PCI DSS requirement 10, which calls for an immutable append-only log carrying a timestamp, a client identifier, a unique case nonce and the destination endpoint"
      - id: names-in-prompts
        text: "A rule permitting the account holder's legal name to travel inside the prompt when the narrative is an internal executive briefing"
    correctOptionIds: [pci-req3, vault-boundary, pci-req10]
    explanation: "Requirement 3 of PCI DSS 4.0 demands that the cardholder number be unreadable after authorization, and the lesson implements that as irreversible cryptographic tokens of the form token_pan followed by a digest prefix, with the social security number, legal name and street address stripped before the payload leaves the proxy. Requirement 10 demands an immutable, append-only security log with the timestamp, client identifier, unique case nonce and destination endpoint for every webhook. Between them sits the zero-plaintext vault boundary, where an AES-256-GCM vault lookup and SHA-256 token generation mean only an authorised analyst on an air-gapped terminal can re-hydrate an identity. The audience is not a licence to send personal data into a prompt."
  - id: "96697d25-e00d-43e3-a9fd-9f7fe6201a78"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that a generative model may file a Suspicious Activity Report with the regulator entirely on its own, because the narrative it produces is grounded in the verified telemetry."
    answer: false
    explanation: "Grounding does not remove the human from the loop. Under SR 11-7, fully automated regulatory filing is legally impermissible: the model may draft a Suspicious Activity Report, but a Bank Secrecy Act compliance officer must inspect it, verify it and electronically sign the submission before it is transmitted. And grounding reduces rather than eliminates the risk, because a filing that contains hallucinated facts carries federal liability under 18 U.S.C. 1001 for false statements to the federal government. That is why every natural-language claim has to map one to one to a verified database record."
  - id: "feae3e1d-5ae4-46be-ab66-7b7de9fa33b7"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the lesson's dual-speed transmission analogy for generative AI in fraud operations, and how it maps onto the two audiences the incident report is written for."
    sampleAnswer: "The analogy is a gearbox. The fast gear is the real-time operational channel: the pipeline scores the transaction in tens of milliseconds, and when the calibrated probability crosses the gate the narrative is dispatched straight to Slack, Teams or PagerDuty so a human can act before the money moves. The heavy gear is the regulatory channel: the same incident is written up as a formal Suspicious Activity Report with explicit statutory citations and a mandatory five-year retention period, because that document has to survive scrutiny rather than speed a response. So one case gets two renderings. The executive brief runs under 200 words and one or two screen views, leads with net exposure and containment status, and cites at a high level such as a wire recall under UCC Article 4A. The regulatory filing runs 400 to 1,200 words as a comprehensive dossier, states exact timestamps, IPs, ASNs and device hashes, cites statutes such as 31 CFR 1020.320, and is retained for five years."
    explanation: "A strong answer must use the gearbox to explain why one pipeline serves both a rapid operational alert and a slow formal filing, and then give the concrete differences in length, tone, emphasis and citation for both audiences: under 200 words for the executive brief against 400 to 1,200 words for the regulatory filing, high-level policy citations against explicit statutory citations, and internal policy against the mandatory five-year federal retention requirement. It should make clear that the split is about the reader's institutional role, not about running two separate detection systems."
  - id: "a9783d31-7550-40cb-a242-1b1415d538ed"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the three defensive barriers the lesson sets out against indirect prompt injection in a financial narrative pipeline, and the failure each one prevents."
    sampleAnswer: "First, strict contextual quarantining: untrusted inputs such as remittance memos, names and descriptions are wrapped in rigid XML or JSON tag boundaries and treated as unexecutable data literals, so a memo claiming to be in debug mode is a string inside a tag rather than an instruction the model can obey. Second, deterministic pre-LLM anomaly filtering: the language model never sets the fraud probability. That number is computed upstream by discriminative models such as XGBoost and Isolation Forest, so even a fully compromised narrative cannot move the score away from 0.968 or disengage the automated hard-lock. Third, dual-model verification: before the narrative reaches an executive or regulatory webhook, a secondary lightweight classifier inspects the generated output for policy violation, tone subversion or instruction drift. The first barrier stops the injected text being read as an instruction, the second stops the score being changed, and the third stops a bad narrative reaching a human being."
    explanation: "A strong answer must name all three barriers and tie each to the failure it prevents: tag sandboxing against the memo being read as an instruction, upstream deterministic scoring against the probability and the hard-lock being manipulated, and the adversarial critic against a drifted narrative reaching a human recipient. It should also describe the failure that motivates them, a $49,850.00 wire whose memo tries to put the model in debug mode and which a naive narrative dismisses as a routine executive payroll disbursement. Saying that prompt engineering alone prevents injection misses the point, because the lesson's design assumes the model can be compromised and takes the decision out of its hands anyway."
```
