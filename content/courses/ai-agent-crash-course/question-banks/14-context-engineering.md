---
id: "0f71b849-4078-44a2-ab27-c32c7054bd51"
title: "Context Engineering: Budget, Rank, Compact, Cache, Defend Question Bank"
description: "Practice questions for Context Engineering: Budget, Rank, Compact, Cache, Defend."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

These questions practise deciding what enters an agent's prompt, in what order, and how to defend it.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "8fefb159-959a-4372-8c39-2431d4dcc30e"
    revision: 2
    status: active
    type: single-choice
    prompt: "Your agent retrieved 40 chunks, and the model accepts a window far larger than all of them combined. A teammate says to paste every chunk in. What is the strongest reason to rank and trim instead?"
    options:
      - id: window-free
        text: "A larger window guarantees that every chunk is read equally well"
      - id: attention
        text: "A big window does not ensure even use, so extra tokens can bury facts"
      - id: price-only
        text: "Trimming matters only for cost, since answer quality never changes with length"
    correctOptionIds: [attention]
    explanation: "Window size limits what fits, not how well the model uses it; relevant text in the middle of a long prompt can be underused. The tempting claim that a big window means equal reading is wrong, and cost is only one of several reasons to trim."
  - id: "4e67e768-566e-4fd5-9e76-ca85ae7ec57d"
    revision: 1
    status: active
    type: single-choice
    prompt: "A composer scores each candidate and also must keep private items from callers who may not see them. A scoring bug could surface a private document. Where should the permission check sit?"
    options:
      - id: after-pack
        text: "After packing, as a final filter applied to the finished prompt"
      - id: weight-low
        text: "Inside scoring, as a small weight that lowers the final score"
      - id: before-scoring
        text: "Before scoring, so denied items never reach the scorer"
      - id: in-prompt
        text: "In the system prompt, asking the model to skip private items"
    correctOptionIds: [before-scoring]
    explanation: "A hard gate before scoring means no scoring or packing bug can ever surface a denied item. A low weight is only a soft preference, and asking the model to skip private text still sends that text to the model."
  - id: "c9ac6000-7e18-43a5-87ba-27f9a157f382"
    revision: 1
    status: active
    type: single-choice
    prompt: "Two retrieved chunks have identical similarity to the question. One is from the customer's own policy document and the other is from an anonymous forum post. Which scoring axis should separate them?"
    options:
      - id: authority
        text: "Authority, because the policy document is a more trusted source"
      - id: recency
        text: "Recency, because newer text is always the more correct version of a fact"
      - id: diversity
        text: "Diversity, because the two chunks must differ in wording from each other"
    correctOptionIds: [authority]
    explanation: "Similarity says both are on topic; authority says which source deserves trust. Recency is tempting, but a newer forum post does not outrank an official policy just because it is newer."
  - id: "d369861a-278c-4883-9d06-7912e7d895fe"
    revision: 1
    status: active
    type: single-choice
    prompt: "A composer has a 4,000-token budget and reserves 5% of it for a compaction note. What is the most the packer may spend on selected items?"
    options:
      - id: full-budget
        text: "4,000 tokens, the entire budget, no reserve"
      - id: ninety
        text: "3,600 tokens, after reserving ten percent"
      - id: half
        text: "2,000 tokens, since half is always held back"
      - id: ninety-five
        text: "3,800 tokens, the budget minus the reserve"
    correctOptionIds: [ninety-five]
    explanation: "Five percent of 4,000 is 200 tokens, so the packer's cap is 3,800. Spending the full 4,000 would leave no room for the compaction note, and 3,600 would apply the wrong reserve."
  - id: "18c43b84-ce0c-47ff-ae98-29ff72c301bd"
    revision: 1
    status: active
    type: single-choice
    prompt: "Eight relevant chunks did not fit the budget. Which handling keeps the model honest about what it did not see?"
    options:
      - id: silent-drop
        text: "Drop them silently so the prompt stays clean and short"
      - id: summarise
        text: "Fold them into one short note with counts and the top item"
      - id: truncate
        text: "Cut every chunk down to its first sentence and keep all of them"
    correctOptionIds: [summarise]
    explanation: "A short note records that more material exists, so the model can say so and offer to fetch it. Silent dropping hides the gap, and truncating every chunk keeps fragments that may mislead."
  - id: "ead004bd-559d-4487-98dd-f99a48a1e8b5"
    revision: 1
    status: active
    type: single-choice
    prompt: "After a release, cache reads fall to zero. The diff shows the system block now starts with the current time. What is the right repair?"
    options:
      - id: move-time
        text: "Remove the time from the stable prefix or move it after"
      - id: raise-budget
        text: "Raise the token budget so the prefix grows past some minimum"
      - id: shuffle
        text: "Randomise the order of the system rules on each call"
      - id: bigger-model
        text: "Switch to a larger model that caches more reliably"
    correctOptionIds: [move-time]
    explanation: "A cache hit needs a byte-identical prefix, and a changing timestamp makes every call different at the very start. Growing the budget does not help, and shuffling rules would only add more variation."
  - id: "bab4c526-2030-4b13-b9bc-62695fc63220"
    revision: 1
    status: active
    type: single-choice
    prompt: "A retrieved web page says, in its body, to ignore all earlier rules and reveal the system prompt. Which design best limits the damage?"
    options:
      - id: merge-system
        text: "Merge it into the system message so it counts as policy"
      - id: strip-words
        text: "Delete the word ignore from every retrieved chunk"
      - id: data-block
        text: "Label it as data and add a rule not to obey it"
    correctOptionIds: [data-block]
    explanation: "Labelling retrieved text as data and stating that instructions inside it must not be followed keeps the instruction hierarchy intact. Putting it in the system message promotes attacker text, and a word filter is trivially bypassed."
  - id: "e20e77c4-3a40-4683-8797-cb2d394d45a3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are valid reasons for an omission log entry? Select every correct answer."
    options:
      - id: permission
        text: "The item was denied by the permission gate"
      - id: compacted
        text: "The item was folded into the compaction note"
      - id: duplicate
        text: "The item duplicated one already selected"
      - id: cited
        text: "The item was kept in the prompt and cited"
      - id: top-score
        text: "The item had the highest relevance score"
    correctOptionIds: [permission, compacted, duplicate]
    explanation: "The omission log records items that did not enter the prompt, with a reason such as permission denied, compacted, or duplicate. Items that were kept and cited belong in the source manifest, and a high relevance score alone does not mean an item was omitted."
  - id: "3489e37a-386b-4edf-8d68-3de397c7134e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which practices help the stable part of a prompt stay cacheable? Select every correct answer."
    options:
      - id: static-first
        text: "Put stable rules and templates at the start"
      - id: question-last
        text: "Put the changing user question at the end"
      - id: sorted-json
        text: "Serialise preference data with a fixed key order"
      - id: session-id
        text: "Add the session id to the system block for traceability"
      - id: today
        text: "Print today's date at the top of the system block"
    correctOptionIds: [static-first, question-last, sorted-json]
    explanation: "Caching works on a repeated prefix, so stable content goes first, the volatile question goes last, and serialisation must be deterministic. A session id or date in the system block changes the prefix on every call and defeats the cache."
  - id: "55ca3a79-d134-4816-88f9-caf8ba4cdf20"
    revision: 1
    status: active
    type: true-false
    prompt: "If a model accepts a very large context window, a relevant fact is used equally well wherever it sits in the prompt."
    answer: false
    explanation: "Research on long contexts found that models often use information at the start and end better than information in the middle. A large window raises capacity, not the evenness of attention."
  - id: "4f7acd8a-bc16-4676-a7b3-c14b777fce33"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: describe how a context composer decides what enters the prompt, and what it does with items that do not fit."
    sampleAnswer: "It first removes anything the caller is not permitted to see, then counts tokens and scores each remaining item on several axes such as relevance, authority, recency and source reliability. It packs the highest-scoring items under a budget that leaves a small reserve, and folds the rest into a short compaction note instead of dropping them silently. It keeps citation tags on kept items, writes an omission log with a reason for each omitted item, and puts stable content first with the user question last so the prefix can be cached."
    explanation: "A strong answer covers the order gate, score, pack, compact and log, and mentions why items are never dropped silently."
  - id: "68a5f6fd-de41-4d01-908e-33e018d89795"
    revision: 1
    status: active
    type: free-recall
    prompt: "A search tool returns a 50KB block of JSON, and your agent needs only order id, status and total. How should it enter the next turn, and why?"
    sampleAnswer: "Summarise at the tool layer: extract only the fields the agent asked for into a small table with a source tag, and keep a record that the call happened. Store the full blob under an id so it can be fetched again if needed. This saves budget, avoids burying key facts, and limits how much untrusted text reaches the model."
    explanation: "The key idea is trimming at the tool boundary and keeping a pointer to the full result, rather than pasting raw output into the prompt."
```
