---
id: "d58b5281-f342-4ebb-b206-3b9179a32ed2"
title: "Multimodal AI, OCR, Audio, and Document Intelligence Question Bank"
description: "Practice questions for Multimodal AI, OCR, Audio, and Document Intelligence."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

These questions check whether you can route files, preserve provenance, and handle confidence and security in a multimodal ingestion pipeline.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "8951da4b-f49f-4abe-b968-3bfe5d6879e4"
    revision: 1
    status: active
    type: single-choice
    prompt: "A 20-page PDF looks full of text on screen, but text extraction returns only a few characters per page. What should the pipeline do next?"
    options:
      - id: retry
        text: "Retry the text extractor with new settings until text appears"
      - id: embed
        text: "Embed the sparse text because a text layer clearly exists"
      - id: ocr
        text: "Treat it as scanned, then render pages for layout and OCR"
      - id: reject
        text: "Reject it because an image-only PDF cannot be searched"
    correctOptionIds: [ocr]
    explanation: "Very little extractable text means the pages are probably images, so the file belongs on the scanned path: render pages, detect layout, then OCR. Retrying the extractor is the tempting move, but a scanned PDF has no text layer for it to find."
  - id: "98c72796-c8f0-4db2-894d-7ac2fb812494"
    revision: 2
    status: active
    type: single-choice
    prompt: "A two-column scanned page was OCR'd as one whole page with no region detection, and the output joins line one of column one to line one of column two. What is the most likely cause?"
    options:
      - id: raster
        text: "Words were read in raster order before regions were detected"
      - id: language
        text: "The engine mixed up the language of the second column"
      - id: embedder
        text: "The embedder shuffled the sentences while building vectors"
      - id: resolution
        text: "The scan resolution was too high for the engine to cope"
    correctOptionIds: [raster]
    explanation: "Whole-page OCR without region detection can read left to right and top to bottom across the page, so lines from neighbouring columns get glued together. Layout detection first, then OCR per region, restores the publication's reading order. Embedding happens after extraction and cannot reorder text that was already mixed."
  - id: "aa5fd7a6-724e-4d7d-98f5-ff752f937bb5"
    revision: 1
    status: active
    type: single-choice
    prompt: "On an invoice region, a vision model reports a total of $1,234 while the OCR engine reads $1,284 at confidence 0.62. How should the pipeline treat the amount?"
    options:
      - id: vision
        text: "Accept the vision value because it understands the context"
      - id: average
        text: "Store the average of the two so neither source dominates"
      - id: both
        text: "Keep both values unflagged and let retrieval choose between them"
      - id: ocr
        text: "Use the OCR text as the verbatim source and flag it for review"
    correctOptionIds: [ocr]
    explanation: "The chapter treats OCR output as the source of truth for verbatim strings such as amounts, and uses the vision model for layout and entity inference. Confidence 0.62 is below the 0.80 review threshold, so a person should confirm it. Trusting the vision model is tempting, but vision models can invent text that is not in the image."
  - id: "f3bd7777-7092-4b29-a0b4-e0f7ac7498d7"
    revision: 1
    status: active
    type: single-choice
    prompt: "A transcript of a three-person call has accurate words and timestamps but no indication of who said what. Which step adds speaker labels?"
    options:
      - id: bigger
        text: "Switch to a larger transcription model with the same settings"
      - id: diarize
        text: "Run diarization, then align the words to the speaker turns"
      - id: windows
        text: "Cut the audio into equal fixed windows and label each one"
      - id: embed
        text: "Embed the transcript text using a multimodal embedding model"
    correctOptionIds: [diarize]
    explanation: "Diarization answers who spoke when, and it is a separate job from transcription. Aligning word timestamps to the speaker turns gives each word a label. A larger transcription model improves word accuracy but still does not identify speakers."
  - id: "a01c00e7-e7b1-4872-b13f-2d5b58466816"
    revision: 1
    status: active
    type: single-choice
    prompt: "You need word-level times so a citation can open an audio clip at the right second. Which settings on OpenAI's whisper-1 transcription endpoint expose them?"
    options:
      - id: plain
        text: "Plain JSON response format with default granularity"
      - id: segment
        text: "Segment granularity alone, since segments contain words"
      - id: verbose
        text: "Verbose JSON response format with word granularity requested"
      - id: speakers
        text: "A num_speakers hint passed to the transcription request"
    correctOptionIds: [verbose]
    explanation: "Word timestamps require the verbose JSON response format together with a request for word granularity. Segment granularity gives phrase-level times, not per-word times, and a speaker-count hint belongs to diarization rather than transcription."
  - id: "21843e86-967b-4af7-8da6-3a4db1bfb45c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A chatbot answer cites only invoice.pdf, and a reviewer cannot quickly find the supporting figure. What should the citation carry?"
    options:
      - id: unit
        text: "The page and region, so one click lands on the evidence"
      - id: engine
        text: "The OCR engine name so the reviewer can re-run the page"
      - id: model
        text: "The embedding model version used for the chunk"
      - id: date
        text: "The ingest date so the reviewer can judge how fresh it is"
    correctOptionIds: [unit]
    explanation: "A good citation names the smallest unit of evidence a user can re-verify in one click, such as a page, a bounding box, or a timestamp range. Engine, model, and date are useful audit metadata but they do not tell the reviewer where to look."
  - id: "407faa83-09e4-4804-a206-77a7148201eb"
    revision: 1
    status: active
    type: single-choice
    prompt: "An invoice chunk has ocr_confidence 0.41 on a dollar amount, and the review threshold is 0.80. What should happen to it?"
    options:
      - id: embed
        text: "Embed it now and rely on retrieval to rank it low"
      - id: queue
        text: "Flag it for human correction, then re-embed the fix"
      - id: drop
        text: "Drop the chunk quietly so no wrong figure is stored"
      - id: note
        text: "Pass it to the chatbot with a note that it may be wrong"
    correctOptionIds: [queue]
    explanation: "Low-confidence extractions go to a human review queue, and the chunk is re-embedded after correction. Embedding it unchecked lets a wrong amount reach answers, and silently dropping it loses evidence the reviewer could have fixed in seconds."
  - id: "b3416393-67b2-4342-b380-454394b813b5"
    revision: 1
    status: active
    type: true-false
    prompt: "Because vision-capable models can read PDFs directly, a separate layout and OCR stage no longer adds structure, citations, or confidence scores."
    answer: false
    explanation: "A single vision model tends to lose structure, provenance, and per-chunk confidence, and it makes cheap re-runs of one bad chunk hard. A pipeline of specialists returns structured output that can be indexed, cited, and audited. Vision models are a good complement, not a foundation."
  - id: "a05218c8-6dd2-4f40-8e41-b82c02938f67"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which defenses reduce indirect prompt injection from ingested PDFs and screenshots? Select every correct answer."
    options:
      - id: quarantine
        text: "Strip or quarantine hidden or out-of-bounds text found in PDFs"
      - id: data
        text: "Treat extracted text as data and never as instructions"
      - id: trust
        text: "Trust extracted text whose OCR confidence is above the threshold"
      - id: gate
        text: "Require an approval gate before any tool acts on extracted text"
    correctOptionIds: [quarantine, data, gate]
    explanation: "Hidden text must be stripped or quarantined, extracted text must be treated as data, and tools need an approval gate before acting on it. High OCR confidence only says the characters were read accurately; it says nothing about whether the text is safe to obey."
  - id: "bd2da225-87e6-47da-88ef-e4ec28b35a96"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which are reasons to detect layout before running OCR on a multi-column page? Select every correct answer."
    options:
      - id: skip
        text: "Confidence scores become unnecessary once regions are found"
      - id: order
        text: "Regions can be read in the publication's real reading order"
      - id: engines
        text: "Tables and text regions can each go to a suitable engine"
      - id: born
        text: "Born-digital PDFs no longer need a text layer"
      - id: cite
        text: "Citations can point to a specific region, not just a page"
    correctOptionIds: [order, engines, cite]
    explanation: "Detecting regions first fixes reading order, lets each region type use a suitable engine such as table mode, and makes region-level citations possible. It does not remove the need for confidence scores, which still drive the review queue."
  - id: "75fd6f63-7e9d-4e09-a153-289ae3ab7043"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why a multimodal ingestion layer should be a pipeline of specialists that attaches provenance and confidence to every chunk, rather than one model reading every file."
    sampleAnswer: "Different files need different specialists: a transcriber for audio, layout detection and OCR for scans, a vision model for descriptions. Each returns structured output, so every chunk can carry its source, page or timestamp, bounding box, and confidence. That lets the chatbot cite the exact page or second, lets low-confidence chunks go to human review, and lets one bad chunk be re-run cheaply. One giant model hides all of that."
    explanation: "A strong answer names specialists, structured output, provenance for citation, and confidence for review. Mentioning cheap re-runs of a single chunk shows you understand the operational benefit."
  - id: "c338d6ac-728d-4059-ad7d-b2e30b38aee5"
    revision: 1
    status: active
    type: free-recall
    prompt: "A scanned two-column vendor contract contains a table and one badly stained page. Describe the steps from upload to a cited answer, including where human review fits."
    sampleAnswer: "Sniff the file type, find that text extraction yields almost nothing, and take the scanned path. Render pages as images, detect layout regions, sort them into reading order, and OCR each region, sending the table to table mode. Store each chunk with source, page, bounding box, role, and confidence. Flag the stained page and low-confidence table cells for human correction, re-embed the fixes, then answer with page and region citations."
    explanation: "Look for the order: route, layout before OCR, reading order, provenance on each chunk, confidence-based review, then region-level citations. Treating extracted text as data rather than instructions is a good extra."
```
