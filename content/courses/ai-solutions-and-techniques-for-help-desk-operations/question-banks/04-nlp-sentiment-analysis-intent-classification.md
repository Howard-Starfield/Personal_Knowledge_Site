---
id: "12375442-f21e-4a48-a4b4-f3854416c3c2"
title: "Natural Language Processing in Support: Emotion Intensity, Named Entity Extraction & Intent Vectors: Question Bank"
description: "Practice questions for the support NLP lesson, covering the Customer Distress Score, CRF entity extraction, intent confidence gating, sarcasm detection and the discriminative versus generative trade-off."
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

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/04-nlp-sentiment-analysis-intent-classification|Natural Language Processing in Support: Emotion Intensity, Named Entity Extraction & Intent Vectors]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "b4c18068-4a86-47cb-86a5-79001093c871"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson builds the triage layer on a discriminative transformer rather than on a generative large language model. What is the decisive reason?"
    options:
      - id: why-disc
        text: "It is 100 times cheaper and 100 times faster on CPU, and its output is schema-guaranteed"
      - id: why-vocab
        text: "It understands free text better, because a large language model has a far richer vocabulary than a classifier"
      - id: why-data
        text: "It needs no training data, because a generative model can be prompted with the ticket text"
      - id: why-act
        text: "It can act on the ticket, because a generative model can call the ITSM API directly"
    correctOptionIds: [why-disc]
    explanation: "The discriminative path runs in 5 to 25 milliseconds on CPU or at the edge, costs $0.00002 a ticket, returns calibrated probabilities with mathematical guarantees, and adheres to a strict JSON schema 100% of the time, while the generative path takes 800 to 3,500 milliseconds on a GPU cluster, costs $0.005 to $0.03 a ticket and produces stochastic output with a hallucination risk. The other three options are claims the lesson does not make: the discriminative model is the one that needs training data, and the lesson's governance rules stop a generative model calling the ITSM API on its own."
  - id: "62b93358-c33c-4913-8bcc-7c8dcbf9e16d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Scenario B is a ticket that reads 'Locked out of SAP during payroll close, cannot submit!', with valence -0.90, arousal 0.95 and dominance -0.75. What Customer Distress Score does the lesson compute for it?"
    options:
      - id: cds-a
        text: "0.2075, because Scenario B's valence and dominance are both mild"
      - id: cds-b
        text: "0.4275, because only the arousal term contributes to the score in that scenario"
      - id: cds-c
        text: "0.8925, because arousal, negative valence and negative dominance all contribute"
      - id: cds-d
        text: "0.7275, because the dominance term is dropped when the dominance score is negative"
    correctOptionIds: [cds-c]
    explanation: "The score is 0.45 times arousal plus 0.35 times the positive part of negative valence plus 0.20 times the positive part of negative dominance, so 0.4275 plus 0.3150 plus 0.1500 gives 0.8925, which the lesson labels Critical. Both negative valence and negative dominance fall inside their positive parts, so all three terms contribute. The 0.2075 figure is Scenario A's score, where a dominance of +0.20 zeroed the dominance term entirely."
  - id: "4ff28c89-cb10-4301-b7e4-af801adad7a3"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's conditional random field for entity extraction, how is an illegal tag transition such as O to I-APP prevented at runtime?"
    options:
      - id: crf-zero
        text: "The transition parameter is set to zero, so an I- tag can start an entity as easily as a B- tag"
      - id: crf-inf
        text: "The transition parameter is set to plus infinity, so the path is the most attractive one available"
      - id: crf-none
        text: "No transition parameter exists, because the tag set itself prevents a sequence violation"
      - id: crf-neginf
        text: "The transition parameter is set to negative infinity, so the path can never be taken"
    correctOptionIds: [crf-neginf]
    explanation: "The lesson guarantees the constraint by initialising illegal transitions such as O to I-APP with A = negative infinity, so that path contributes zero probability to every sequence it appears in and a violation is impossible at runtime. Zero would leave the path merely unattractive rather than impossible, and the tag set alone does not constrain how tags may be chained."
  - id: "ec995ee8-4579-4541-92d9-78b2b63a0c29"
    revision: 1
    status: active
    type: single-choice
    prompt: "The intent vectoriser compares a ticket embedding against the ITIL canonical action centroids. What happens when the top candidate's probability falls below the operational confidence threshold?"
    options:
      - id: thr-080
        text: "0.80, below which the ticket is returned to the sender asking for more detail"
      - id: thr-095
        text: "0.95, above which the ticket is routed to a senior engineer rather than a supervisor"
      - id: thr-050
        text: "0.50, above which the system asks the user to confirm the intent it inferred"
      - id: thr-085
        text: "0.85, below which the ticket goes to human triage with the top three intents"
    correctOptionIds: [thr-085]
    explanation: "The threshold is typically set at 0.85, and below it the system rejects automated execution rather than guessing: the ticket is routed to human triage with the top three candidate intents offered as clickable suggestions on the technician's console. The distribution is sharpened by a learned temperature of 0.07, and the same 0.85 gate appears in the dispatch gateway, where confidence above 0.85 triggers zero-touch RPA and confidence below 0.85 triggers augmented human triage."
  - id: "78589b8c-be23-418f-af60-928e3cc2ac8b"
    revision: 1
    status: active
    type: single-choice
    prompt: "A ticket complains, 'Great job breaking payroll!' A naive bag-of-words model reads the positive adjectives and scores a valence of +0.82. How does the lesson's pipeline handle this?"
    options:
      - id: sar-drop
        text: "The pipeline drops the ticket, because sarcasm proves the text cannot be trusted at all"
      - id: sar-human
        text: "The pipeline routes the ticket to a human without scoring it, because sarcasm is undecidable"
      - id: sar-head
        text: "A discrepancy head negates the lexical polarity and multiplies the arousal score by 1.5"
      - id: sar-flip
        text: "The pipeline flips the valence sign but leaves the arousal score untouched by the sarcasm"
    correctOptionIds: [sar-head]
    explanation: "Cross-Attention Discrepancy Heads compare the polarity of evaluative adjectives such as fantastic, love and stellar against the semantic class of the technical nouns they modify, such as paperweight and black screen. When positive adjectives attach to known hardware failure nouns, the Sarcasm Inversion Flag fires, negating the lexical polarity and multiplying the calculated arousal by 1.5. The lesson's own metric table shows why it matters: a naive keyword CRM misclassifies 38.0% of sarcasm, and the cross-attention head brings that down to 4.2%."
  - id: "25b104a9-1187-4665-9d46-17d0930a864d"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson handle a support ticket written in German without a separate translation step?"
    options:
      - id: xl-direct
        text: "Multilingual encoders map equivalent sentences to within 0.03 cosine distance in one space"
      - id: xl-mt
        text: "Machine translation runs first, which keeps the classifier's training data in a single language"
      - id: xl-route
        text: "The pipeline detects the ticket language and routes it to a native-speaking support team"
      - id: xl-en
        text: "Only English tickets are automated, because no classifier can be trained on fifty languages"
    correctOptionIds: [xl-direct]
    explanation: "Multilingual transformer encoders such as multilingual-e5-large and xlm-roberta-base are trained by cross-lingual contrastive learning so that semantically equivalent sentences in more than 50 languages land within 0.03 cosine distance of one another in the shared vector space, and the same intent centroids and routing logic then work in every language. The lesson rejects the translation-first architecture because it adds 600 to 1,800 milliseconds a ticket, costs third-party token fees, and mangles technical jargon."
  - id: "51cd0321-5aa9-4b03-b803-c2de359425a6"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which algorithm does the lesson name for computing the CRF's denominator sum, and at what complexity?"
    options:
      - id: crf-viterbi
        text: "Viterbi decoding, at O(nK), because the optimal path can be found greedily one token at a time"
      - id: crf-fb
        text: "The Forward-Backward algorithm, at O(nK squared), with Viterbi reserved for inference"
      - id: crf-brute
        text: "Brute-force enumeration of every tag sequence, at O(2 to the n), which is exact but impractical"
      - id: crf-pass
        text: "A single forward pass of the transformer, at O(n), because the CRF layer is only a regulariser"
    correctOptionIds: [crf-fb]
    explanation: "The denominator sum over all candidate tag sequences is computed efficiently in O(nK squared) time with the Forward-Backward dynamic programming algorithm, and the globally optimal tag sequence is then decoded with the Viterbi algorithm at inference. Viterbi is the inference step rather than the training step, brute-force enumeration is what the dynamic programming algorithm exists to avoid, and the CRF is the model rather than a regulariser attached to the transformer."
  - id: "6ef7998d-a485-427d-a918-60bad7ce8992"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these production NLP pitfalls does the lesson name, paired with the mitigation it proposes? Select every correct answer."
    options:
      - id: pit-sarcasm
        text: "Sarcasm inversion, handled by Cross-Attention Discrepancy Heads comparing adjectives against failure nouns"
      - id: pit-slang
        text: "IT slang and out-of-vocabulary colloquialisms, handled by domain-adapted masked language model pre-training"
      - id: pit-pii
        text: "PII and confidential data, handled by typed redaction masks for names, tokens and identifiers"
      - id: pit-mt
        text: "Non-English tickets, handled by passing every ticket through a machine translation API first"
    correctOptionIds: [pit-sarcasm, pit-slang, pit-pii]
    explanation: "The lesson names sarcasm inversion, IT slang and out-of-vocabulary colloquialisms, and PII leakage, and gives a specific mitigation for each: discrepancy heads, domain-adapted masked language model pre-training on 500,000 historical enterprise tickets, and typed redaction before anything reaches a vector store or an external API. The fourth option is the opposite of the lesson's position, which is that machine translation in front of the classifier is what causes the failure, not the cure."
  - id: "f60468de-ea5e-43bc-b29c-8dd6b99697e4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson's dispatch gateway actually do? Select every correct answer."
    options:
      - id: gw-distress
        text: "Distress above 0.82 raises a supervisor flash alert and promotes the ticket to P1 priority"
      - id: gw-autonomous
        text: "Intent confidence above 0.85 triggers the zero-touch RPA autonomous execution path"
      - id: gw-human
        text: "Intent confidence below 0.85 sends the ticket to augmented human triage with pre-extracted entities"
      - id: gw-guess
        text: "Intent confidence below 0.85 causes the system to take the highest-scoring intent and automate anyway"
    correctOptionIds: [gw-distress, gw-autonomous, gw-human]
    explanation: "The gateway has exactly three branches: distress above 0.82 pushes a supervisor flash alert and promotes the ticket to P1, confidence at or above 0.85 triggers zero-touch RPA, and confidence below 0.85 sends the ticket to augmented human triage carrying the pre-extracted entities. The fourth option describes exactly the false-positive automation the threshold exists to prevent, which is why the ticket is handed to a person with the top three candidate intents attached instead."
  - id: "34d4aefc-db9d-41c7-974c-f73949a3f610"
    revision: 1
    status: active
    type: true-false
    prompt: "A naive bag-of-words sentiment model can safely label the complaint 'Great job breaking payroll!' as a positive review."
    answer: false
    explanation: "The claim is false, and it is the lesson's sarcasm inversion trap. The naive model analyses tokens such as fantastic, love and stellar, computes a net positive valence of +0.82 and files the ticket as a glowing compliment, while the true emotion is pure fury. The defence is the Sarcasm Inversion Flag from the Cross-Attention Discrepancy Head, which compares the adjective polarity against the co-occurring hardware failure nouns and negates the lexical polarity while multiplying the arousal score by 1.5."
  - id: "77829873-ff4e-477f-a3eb-1a374a6e144e"
    revision: 1
    status: active
    type: free-recall
    prompt: "Work out the Customer Distress Score for Scenario B, the ticket that reads 'Locked out of SAP during payroll close, cannot submit!', and explain what the score causes the pipeline to do."
    sampleAnswer: "Scenario B has valence -0.90, arousal 0.95 and dominance -0.75. The Customer Distress Score is 0.45 times arousal plus 0.35 times the positive part of negative valence plus 0.20 times the positive part of negative dominance, so 0.45 x 0.95 is 0.4275, 0.35 x 0.90 is 0.3150 and 0.20 x 0.75 is 0.1500, giving a total of 0.8925, which the lesson labels Critical. Unlike Scenario A, where a dominance of +0.20 zeroed the third term, both the negative valence and the negative dominance sit inside their positive parts, so all three terms contribute. A score of 0.8925 is above the 0.80 level that triggers real-time intervention and above the 0.85 supervisor flash tripwire, so the on-duty shift supervisor is alerted through a WebSocket, the ticket is dynamically promoted to P1, and the engineer who picks it up is shown de-escalation coaching for a high-arousal, low-dominance user."
    explanation: "A strong answer shows the three weighted terms and their arithmetic, and contrasts Scenario A with Scenario B to show why the dominance term behaves differently. It should also connect the resulting number to the two thresholds, since 0.8925 clears both the 0.80 real-time intervention level and the 0.85 supervisor tripwire, and mention the coaching prompt the interface would show."
  - id: "0fd3d338-fe5d-4f48-ab2f-207019ebb934"
    revision: 1
    status: active
    type: free-recall
    prompt: "Contrast the discriminative and generative approaches the lesson compares for the triage layer, using its figures, and say which one it selects and why."
    sampleAnswer: "The lesson compares BERT and RoBERTa style discriminative models with Llama-3, Claude and GPT-4 style generative models. The discriminative route runs in 5 to 25 milliseconds on CPU or at the edge, costs $0.00002 a ticket, gives mathematical guarantees with calibrated probabilities, adheres to a strict JSON schema 100% of the time, and can be deployed air-gapped on premises or in a local container. The generative route takes 800 to 3,500 milliseconds on a GPU cluster, costs $0.005 to $0.03 a ticket, which is 100 to 1000 times more, produces stochastic token generation with a hallucination risk, needs grammar-constrained decoding to reach a usable schema, and depends on a cloud API. For the triage layer the lesson selects the discriminative route, because triage runs on every one of the enterprise's 60,000 monthly tickets and has to emit a schema-valid decision fast enough to act on, whereas the generative model is reserved for the tasks where its fluency is the advantage."
    explanation: "A strong answer gives all four dimensions of the comparison with the lesson's own numbers, and then argues the selection from the workload rather than from accuracy: 60,000 tickets a month, a hard schema contract, latency that has to fit inside an interactive console, and a cost per ticket of $0.00002 against $12.50 of human triage labour. It should also note the deployment benefit, that the discriminative model can run air-gapped on premises."
```
