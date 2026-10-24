---
id: "05f20d01-951a-4091-8f38-73c82acbd28c"
title: "Multimodal AI, OCR, Audio, and Document Intelligence"
description: "Build an ingestion pipeline that turns scanned PDFs, audio, and screenshots into cited, confidence-scored chunks your chatbot can use."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 16
estimatedMinutes: 55
---

## Why this matters

Real customers do not hand you clean Markdown. They send scanned contracts, meeting recordings, and screenshots of error dialogs. If your pipeline only reads text files, most of a client's archive is invisible to your chatbot, and the answer they need may sit on page 3 of a coffee-stained scan.

Pointing one vision model at everything makes a good demo and a poor business tool, because you lose structure, citations, and any way to tell which extractions to trust. PDFs and screenshots are also a common route for indirect prompt injection, so how you ingest them is a safety decision as well as a quality one.

## What you'll be able to do

- Decide whether a PDF takes the born-digital or the scanned path, and justify the choice.
- Explain why layout detection comes before OCR, and diagnose a scrambled reading order.
- Design a chunk record that carries provenance and confidence, and write a citation that lands on the exact page region or audio second.
- Decide which chunks go to a human review queue and which extractor is the source of truth for verbatim text.
- Diagnose missing word timestamps and missing speaker labels in an audio pipeline.

## Before you start

- In the retrieval chapters, what made a retrieved passage "citable" rather than just relevant? (Refer back to [[courses/ai-agent-crash-course/lessons/15-evals-observability|Previous lesson]] if you need the evaluation habits.)
- Why should a guardrail layer treat text from outside sources as data rather than instructions?
- What would you measure to know whether an ingestion step is working, beyond "the chatbot answered"?

## Step 1 — Route each file to the right specialist

**In plain language.** Think of an intake desk at an accounting practice. Paper invoices go to a scanner, voice memos go to a transcriber, and each kind of file gets the person best equipped to read it. One door, several specialists, one common output format.

**The rule.** A single `POST /ingest` endpoint sniffs the file type and dispatches to an audio, PDF, image, or plain-text pipeline. Each pipeline normalizes its output into the same `Chunk` schema before embedding and storing it. Type sniffing combines the extension with a header check: a PDF starts with `%PDF-`, a WAV file with `RIFF`, and an M4A is an MP4 container.

**PDFs have two kinds.** A born-digital PDF has a real text layer that a library such as pypdf can extract. A scanned PDF is only images of pages and needs OCR. The chapter's pipeline tries text extraction first and treats the file as scanned if the yield is too low. Its sketch uses about 200 characters per page as the cutoff, which is a teaching heuristic you should tune on your own files.

**Worked example.** A 12-page vendor agreement returns 380 characters from text extraction in total, roughly 32 per page. That is far below 200 per page, so the pipeline renders each page to an image at 300 DPI and runs layout detection and OCR. A 12-page annual report that returns 30,000 characters takes the born-digital path, though you still run layout detection to find its tables.

> [!warning] Common mistake
> Seeing garbled output on a clean-looking PDF and blaming the OCR engine. If extraction returns nothing, the file is scanned, so switch to the OCR branch instead of tuning the text extractor.

## Step 2 — Detect layout first, then OCR, then merge with vision

**In plain language.** Reading a newspaper, you finish one article's column before jumping to the next. An OCR pass over the whole page with no region detection may not know that. If it sweeps left to right, top to bottom, it glues line one of column one onto line one of column two.

**The rule.** Layout-aware tools such as docling, Marker, or Unstructured detect regions first (heading, paragraph, table, figure, caption, footer), OCR each region, then concatenate in the publication's reading order. Tables should go to a table-capable mode, because Tesseract's own documentation warns that it has trouble with tables unless you add custom layout analysis. Reading order is half the OCR problem.

**OCR versus vision.** OCR engines are deterministic and give verbatim strings, bounding boxes, and per-character confidence. Vision models are better at describing layout and inferring which box is the total, but they can hallucinate text that is not in the image. The strong default for documents is both: use OCR as the source of truth for exact strings such as amounts and error codes, and use the vision model for description and entity inference, then merge.

**Worked example.** On an invoice region, OCR reads `$1,284.00` at confidence 0.62 while a vision model reports `$1,234`. The pipeline keeps the OCR string as the verbatim value, flags it because 0.62 is below the 0.80 review threshold, and shows a human the cropped region. The mismatch itself is a useful signal.

> [!warning] Common mistake
> Assuming a smarter model can skip layout work. Sending a whole newspaper page to a vision model spends tokens on ads, threads columns together fluently, and gives you nothing finer than "page 7" to cite.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "4e0e497a-ef96-49bd-9c8f-d311d8de0ade"
title: "Checkpoint: layout and OCR"
questionBankId: "d58b5281-f342-4ebb-b206-3b9179a32ed2"
questionIds:
  - "98c72796-c8f0-4db2-894d-7ac2fb812494"
  - "aa5fd7a6-724e-4d7d-98f5-ff752f937bb5"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-agent-crash-course/question-banks/16-multimodal-ocr|Multimodal AI, OCR, Audio, and Document Intelligence Question Bank]].

## Step 3 — Transcribe audio with timestamps, then add speakers

**In plain language.** A voice memo needs two separate jobs. Transcription turns sound into words. Diarization works out who spoke when. You also want a time for each word so a citation can play the eight seconds around a quote.

**The rule.** For long files, split on silence into segments (the chapter's sketch uses segments of up to about 300 seconds for files over 10 minutes), transcribe each, and merge. Word-level times come from the API's verbose JSON response format combined with a request for word granularity. When more than one voice is present, run a diarization pipeline such as pyannote-audio and align the words to the speaker turns. Chunk by speaker change first, then long silences, then sentence punctuation, so you never cut a sentence in half.

**Worked example.** A 25-minute sales call is cut into segments, and each is transcribed with word times. A diarization pass finds two speakers. The word at 272 seconds is labelled as the bookkeeper's, so the chunk can be cited as audio `call.m4a` at 04:32 and played from there. If you already know there are exactly two speakers, passing that hint to the diarizer helps avoid over- or under-clustering.

**Check the model before you rely on it.** OpenAI's documentation says the `timestamp_granularities` parameter is supported only for `whisper-1`, so word times from the hosted API mean choosing `whisper-1`. The gpt-4o transcription models are documented with plain `json` responses in the API reference examples, and OpenAI offers a separate `gpt-4o-transcribe-diarize` model that returns speaker-labelled segments through the `diarized_json` format. Model capabilities change, so confirm in the current documentation for the model you choose. For local pipelines, use Whisper with word timestamps enabled.

> [!warning] Common mistake
> Splitting audio into fixed wall-clock windows. That cuts sentences in half and breaks speaker turns, which makes both the citation and the chunk meaning worse.

## Step 4 — Give every chunk provenance and confidence

**In plain language.** A chunk that is only a string cannot be cited, audited, or fixed. Provenance is its birth certificate: where it came from, which page or second, which region, which engine. Confidence is a label saying how much to trust it.

**The rule.** Make these fields mandatory before embedding anything: `source_uri`, `modality`, `page` or `timestamp_s`, `bbox`, `layout_role`, `ocr_confidence` or `transcription_confidence`, `speaker`, `extractor`, and `extracted_at`. Citations use the smallest unit of evidence a user can re-verify in one click, for example a PDF page and region, or an audio start and end second. Confidence drives the review queue, not the answer. In the chapter, chunks with OCR confidence below 0.80, transcription confidence below 0.75, or a table or footnote role get flagged for human correction and re-embedded after the fix. Those thresholds are the chapter's starting values, so tune them to your risk.

**Worked example.** A scanned contract chunk is stored with `page=4`, `bbox=(0.10, 0.30, 0.90, 0.45)` as fractions of the page, and `ocr_confidence=0.91`. The chatbot answer cites that page and region, and clicking it opens page 4 with the clause highlighted. Normalizing the box to fractions avoids drift between the 300 DPI image coordinates and the PDF's own units of 1/72 inch.

> [!warning] Common mistake
> Citing only the filename, or treating OCR output as ground truth. A per-token confidence must also be aggregated into a per-chunk score (mean or minimum), and you should write down which rule you used, or the low-confidence flag may never fire.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "a29d3716-79a4-4e0c-a9d9-be287451a70c"
title: "Checkpoint: audio, provenance, and review"
questionBankId: "d58b5281-f342-4ebb-b206-3b9179a32ed2"
questionIds:
  - "a01c00e7-e7b1-4872-b13f-2d5b58466816"
  - "407faa83-09e4-4804-a206-77a7148201eb"
```

## Step 5 — Secure and operate the pipeline

**In plain language.** Ingestion is where untrusted files enter your system. A white-on-white line in a PDF that says to ignore all instructions is invisible to a person but not to OCR or a vision model.

**The rules.**

- Treat all extracted text as data, never as instructions, and never let a tool act on it without an approval gate. Strip or quarantine hidden, zero-size, or out-of-bounds text.
- Store consent metadata for recordings, since some jurisdictions require all parties to consent to recording. Speaker embeddings can count as biometric data when used to identify a person, so treat them as sensitive.
- Redact personal data at ingest rather than at query time, because a string already embedded in a vector is hard to remove.
- Hash each file with SHA-256. If the same hash arrives twice, return the earlier result instead of paying to reprocess it.
- When a document is replaced under the same `source_uri`, delete its old chunks before writing new ones so citations do not point at obsolete pages.
- A delete request must remove the original file, transcript, chunks, vectors, cached summaries, and any audit-log payload, or it is a privacy bug.
- Process large or long files in a background job and return a job id, and set per-tenant cost ceilings.

**Worked example.** A client re-sends a corrected contract under the same name. The pipeline hashes it, sees a new hash, deletes the old chunks for that `source_uri`, re-ingests, and records the extractor version on each new chunk. A hidden line of white text asking the bot to email the database is extracted, flagged as out-of-bounds, and quarantined rather than embedded.

> [!warning] Common mistake
> Trusting extracted text because the OCR confidence is high. Confidence measures whether characters were read correctly, not whether the content is safe to obey.

### Checkpoint 3

```knowledge-quiz
schemaVersion: 1
quizId: "34401300-84ae-48b1-8c75-d05c48e1235d"
title: "Checkpoint: security and routing"
questionBankId: "d58b5281-f342-4ebb-b206-3b9179a32ed2"
questionIds:
  - "a05218c8-6dd2-4f40-8e41-b82c02938f67"
  - "8951da4b-f49f-4abe-b968-3bfe5d6879e4"
```

## Try it

Design (on paper or as a short spec) the ingestion path for a scanned two-page supplier invoice that has a two-column header and a line-item table, plus a 60-second voice memo from the supplier about it. Write down: the route chosen for each file, the order of steps for the invoice, the fields stored on one table chunk and one audio chunk, one example citation for each, and which chunks you would send to review.

> [!example]- Sample solution
> Invoice: text extraction returns almost nothing, so take the scanned path. Render pages at 300 DPI, detect layout regions, sort them into reading order, OCR each text region, and send the table region to table mode. Run a vision model on the page for a description and entities, but keep the OCR string as the verbatim value.
>
> Table chunk fields: `source_uri=vault/pdfs/invoice.pdf`, `modality=pdf`, `page=1`, `bbox` as fractions, `layout_role=table`, `ocr_confidence`, `extractor` with its version, `extracted_at`. Example citation: invoice.pdf, page 1, table region 2.
>
> Audio: transcribe with word times, skip diarization if only one voice is detected, and chunk on sentence boundaries. Audio chunk fields: `source_uri`, `modality=audio`, `timestamp_s`, `end_timestamp_s`, `transcription_confidence`, `extractor`. Example citation: memo.m4a at 00:23 to 00:31.
>
> Review: every table chunk (table role is flagged by default), any chunk with OCR confidence below 0.80, and any transcript chunk below 0.75, especially if it contains amounts. Check that table totals equal the column sums before trusting them.

## Key takeaways

- Multimodal ingestion is a pipeline of specialists behind one endpoint, not one model reading everything.
- Try text extraction first; very low yield means a scanned PDF that needs layout detection and OCR.
- Detect layout before OCR so reading order and tables survive, and use OCR as the source of truth for verbatim strings.
- Transcription, word timestamps, and diarization are separate capabilities, so check which model supports which.
- Every chunk carries provenance and confidence, which enable region-level citations and a human review queue.
- Treat extracted text as untrusted data, redact early, hash for idempotency, and make deletes propagate everywhere.

## Explain it back

In your own words, explain why a multimodal ingestion layer should be a pipeline of specialists that attaches provenance and confidence to every chunk, rather than one model reading every file.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "cf04890d-9b19-4bf8-b68b-7fea90370052"
title: "Chapter quiz: multimodal ingestion"
questionBankId: "d58b5281-f342-4ebb-b206-3b9179a32ed2"
questionIds:
  - "b3416393-67b2-4342-b380-454394b813b5"
  - "bd2da225-87e6-47da-88ef-e4ec28b35a96"
  - "f3bd7777-7092-4b29-a0b4-e0f7ac7498d7"
  - "21843e86-967b-4af7-8da6-3a4db1bfb45c"
  - "75fd6f63-7e9d-4e09-a153-289ae3ab7043"
  - "c338d6ac-728d-4059-ad7d-b2e30b38aee5"
```

Next: [[courses/ai-agent-crash-course/lessons/17-deployment-product-ops|Next lesson]]
