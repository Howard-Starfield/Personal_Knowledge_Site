---
id: "aac3576a-a0dc-4f6b-bf6c-2322ced773cb"
title: "Salesforce: Case Documentation, Quick Sort, and Escalation: Question Bank"
description: "Questions on the fields on a case, the description and the closing notes, the knowledge library and the daily review, running a quick sort from Salesforce, reading its two results, and escalating a case."
type: question-bank
publish: true
status: active
created: "2026-10-22"
tags:
  - study-guide
  - active-recall
  - assessment
courseId: "6e01a17c-f82f-4614-8f77-11b78d55fa81"
---

# Salesforce: Case Documentation, Quick Sort, and Escalation: Question Bank

> Study notes based on a Covered California enroller training programme. These questions practise the lesson "Salesforce: Case Documentation, Quick Sort, and Escalation".

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "73c380a3-3379-4870-82fd-6ac8c96cf4c6"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what goes in a case description, what goes in the closing notes, and what you do if you have already closed the case before finishing your documentation."
    sampleAnswer: "The description is a brief one or two sentence account of what is happening, and it is the one field you cannot edit once the case has been created, which is why the detail goes elsewhere. The closing notes carry the facts: the request as completed, the CalHEERS case number, what you did and the effect of it, the effective date, the plan the consumer is on, and anything else you did - such as reminding the consumer they will receive tax forms, verifying their communication preference, or advising them to ask the carrier to remove auto-pay. If you realise you closed the case too early, go to the Feed tab, use Post, and add the extra notes there. Those notes do not show in the case view, but they are visible in the feed and they are part of what the quality review looks at."
    explanation: "A complete answer says the description is fixed once the case exists, gives the closing notes the substance, and says that a closed case is put right by posting in the Feed. An answer that says the description can be edited has missed the one field that cannot be changed, and an answer that says a closed case cannot be documented has missed the post the review looks for. Lesson section: Stage 2: Description, closing notes, and the record"
  - id: "eb2df9a7-df21-463e-9824-4790ab79988c"
    revision: 1
    status: active
    type: free-recall
    prompt: "Say when a quick sort is required, what it collects, and what the two results mean for what you do next."
    sampleAnswer: "A quick sort is the only thing the service centre does that reaches the county, and it is required on every call about a new application for coverage where the consumer has no CalHEERS case yet and nobody in their household is already on Medi-Cal, whatever their projected income. It runs from Salesforce, either from a CRM contact or from a CRM case, and it collects six answers: how many people are in the family, how many children are under 19, whether any family member is pregnant, whether any is 65 or older, whether any is disabled, and the annual income. The result is one of two. A transfer means the consumer is connected to a county eligibility worker inside the call, and the CRM case closes itself with a status of Closed and a case reason of Medi-Cal. A no transfer means the county is not called, the case stays in progress with a case reason of New customer, and your job is to help the consumer submit an application through CalHEERS, after which the ten-digit CalHEERS case number attaches to the case."
    explanation: "A correct answer gives the trigger for a quick sort, all six questions, and then the two outcomes with the different next step attached to each. An answer that lists the six questions without the trigger has not said when it is required, and an answer that treats a no transfer as the end of the case has the wrong status and the wrong next step. Lesson section: Stage 4: When a quick sort is required"
  - id: "5c818a63-2da2-4daa-a5c9-a52564737eb0"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the knowledge library, say how you search it, and say what kinds of article it holds."
    sampleAnswer: "The knowledge library is a database of approved information that exists to help process and resolve consumer inquiries; it is updated frequently and is searchable, so answers can be found quickly. There are three ways in: from a CRM case, the search-knowledge filter surfaces suggested articles based on the case's subject; the global search bar with Knowledge chosen in the dropdown; and the Knowledge tab itself, with the browser's find function used to search inside a document. The content is divided into topic articles, and the kinds of article are job aids, which walk a procedure step by step, task guides, policy and procedures for complicated tasks, a general summary of basic health-care information, and a category of short pinpoint articles the recording calls BAM articles - on what the documentation must contain, on handling appeals, or on the service centre's own steps for verifying global presence. Inside a topic article sit task guides and job aids, which are expanded overviews that link onwards to sibling and related articles. There is also a daily routine: each morning in production, 15 minutes before the first call, in a status called Daily Review, for new and newly updated articles."
    explanation: "A good answer describes what the library is for, gives at least two of the routes in, and names at least two kinds of article. An answer that says only that the articles are searchable has not told a colleague how to reach them, and an answer that leaves out the daily review has missed a routine that is part of the job. Lesson section: Stage 3: The knowledge library"
  - id: "e8dda713-3264-4b20-9c8e-42a5eb603a29"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain when a case is escalated rather than handled, say how the escalation is made, and say what remains your responsibility afterwards."
    sampleAnswer: "Some CRM cases cannot be handled at the service centre or at team-lead level and need to go to the priority support unit or out to external resolution - an access-to-care issue or a back-dated termination are the examples given. The steps are: use the Change Owner button to put the case into the queue it needs; go to the Feed tab and add a post to tag the person, which means typing the @ symbol, beginning to type their name and picking it from the list that pops up, because a tag that is typed but never picked raises no alert at all; and on a live call, post your notes first, put the consumer on hold, then click Lead line in Amazon Connect, where the next level of support picks the call up straight away and can see the notes. The consumer can be held for no more than four minutes. Before any of that, you do your own research in the knowledge articles. Afterwards your responsibility is assisting the consumer: you identify a valid escalation, you escalate it and you move on. You are not responsible for following up with the consumer, for giving them the escalation results, or for emailing them - there is a whole department for that."
    explanation: "A complete answer covers the condition for escalating, the change-owner step, the tagging rule and the order of the live-call steps, and ends with the boundary of your responsibility. An answer that leaves out the tagging rule misses the step that decides whether anybody is even notified, and an answer that keeps the follow-up with the consumer has taken on work that belongs to another department. Lesson section: Stage 7: Escalation"
  - id: "ba8911c2-46b6-4c81-b51f-bbc5d0089c4c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A quick sort has returned a transfer result and the CRM case closed itself before you wrote any notes. What do you do?"
    options:
      - id: a
        text: "Post your notes in the Feed"
      - id: b
        text: "Nothing, because the system closed the case and so the documentation has already been taken for you"
      - id: c
        text: "Ask your team lead to reopen the case, so that you can add the detail to the description field where the other notes sit"
      - id: d
        text: "Keep the notes in a separate tracker of your own, because notes posted to the Feed after a case closes are not part of the quality review"
    correctOptionIds: [a]
    explanation: "a is correct: a case that closes itself still has to be documented, and the place to do it is the Feed, where a post is visible to the reviewer even though it does not appear in the case view. b is wrong because the close was the system's doing rather than yours, and the documentation is still your job - a case showing only that the consumer called was judged not acceptable for a 30-minute call. c is wrong because the description cannot be edited once it has been created, and nothing needs reopening. d is wrong because posted notes are exactly what the quality review looks for. Lesson section: Stage 6: The auto-closed case still needs documenting"
  - id: "efd97897-7d37-4257-9ab3-6ec8d009aed9"
    revision: 1
    status: active
    type: single-choice
    prompt: "Two minutes before the end of the call the consumer says they also need a password reset, and the case description has already been saved. What can you still do?"
    options:
      - id: a
        text: "Edit the description so that it covers both the income change and the password reset"
      - id: b
        text: "Add the password reset to the closing notes"
      - id: c
        text: "Delete the case and start a new one, because a case may only ever cover one request from a consumer"
      - id: d
        text: "Edit the subject instead, because the subject field is the one that holds the detail of what you did on the call"
    correctOptionIds: [b]
    explanation: "b is correct: the description is a brief one or two sentence summary and cannot be changed once the case exists, so everything else goes in the closing notes, which is where the detail belongs in the first place. a is wrong because the description cannot be edited once created - the training was explicit that this is not the representative's fault, and the fix is more detail in the closing notes. c is wrong because a case may carry several things and there is no rule about one request per case. d is wrong because the subject says what the call is about and can be edited, while what you did belongs in the notes. Lesson section: Stage 2: Description, closing notes, and the record"
  - id: "7b976892-314e-4aed-a458-775b48913bd9"
    revision: 1
    status: active
    type: single-choice
    prompt: "A quick sort has come back with no transfer. What does the service centre do next?"
    options:
      - id: a
        text: "Call the county anyway, because the quick sort is only a screen and the county makes the final decision on Medi-Cal eligibility"
      - id: b
        text: "Close the case, because a no-transfer result means the consumer has been found ineligible and there is nothing left to do"
      - id: c
        text: "Help the consumer apply through CalHEERS"
      - id: d
        text: "Tell the consumer they have been found ineligible for Medi-Cal, and that they should look for a private plan on the site instead"
    correctOptionIds: [c]
    explanation: "c is correct: on a no transfer the case stays in progress and the work is helping the consumer submit an application through CalHEERS, after which the ten-digit CalHEERS case number attaches to the case. a is wrong because a no transfer means the county is not called - the household is most likely not eligible for Medi-Cal on the answers given - and the county only assists the service centre with warm transfers. b is wrong because the case stays open and in progress on a no transfer; it is the transfer case that closes itself. d is wrong because a no transfer is not a finding of ineligibility but the result of the six answers, and the consumer's next step is an application. Lesson section: Stage 5: The two results"
  - id: "c11c4319-304f-49b4-bbd2-58be1268b21b"
    revision: 1
    status: active
    type: single-choice
    prompt: "You cannot resolve a consumer's question from what you can see on the case. What does the training say to do first?"
    options:
      - id: a
        text: "Escalate the case straight away, because the knowledge library is only a reference for documentation and cannot answer a live question"
      - id: b
        text: "Put the consumer on hold and read your own notes again, because re-reading what you have written will usually surface the answer"
      - id: c
        text: "Ask the consumer to call back tomorrow, because a question you cannot answer in one call cannot be answered at all"
      - id: d
        text: "Research the knowledge articles yourself"
    correctOptionIds: [d]
    explanation: "d is correct: the expectation is that you do your own due diligence by researching the articles before you reach the lead queue, and the first step is always to try to self-service - the library exists so answers can be found quickly. a is wrong because the research comes before the escalation rather than after it. b is wrong because re-reading your own notes is not the self-service step the training describes. c is wrong because there is support on the call - the lead line picks up straight away once you have posted your notes. Lesson section: Stage 7: Escalation"
  - id: "1407efa0-fede-4414-9e83-669e548264a5"
    revision: 1
    status: active
    type: single-choice
    prompt: "A quick sort has produced a county phone number, a language code and a tracer ID. What may you give the consumer?"
    options:
      - id: a
        text: "None of those three"
      - id: b
        text: "The county phone number, because the consumer may need to ring the county themselves if the transfer falls through"
      - id: c
        text: "The tracer ID, because it is on the screen and the consumer may have to quote it back to you"
      - id: d
        text: "The language code and the tracer ID together, because the county's automated system needs both before it will connect the caller"
    correctOptionIds: [a]
    explanation: "a is correct: none of the three is given to the consumer - the county phone number is an internal number for the warm transfer, and the tracer ID is described in the recording as for your eyes only. b is wrong because the county only assists the service centre with warm transfers, and a consumer ringing that number directly is a red flag that the number has been handed out. c is wrong because the tracer ID is internal, and giving it to the consumer defeats the point of the tracking. d is wrong because the automated system asks the representative for a two-digit county code, a two-digit language code and the tracer ID; none of the three belongs with the consumer. Lesson section: Stage 5: The two results"
  - id: "8120a02e-a860-4f83-afd5-cf22d2dd54b0"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: once you have escalated a case and the person you escalated to has taken over the call, you remain responsible for following up with the consumer and telling them the outcome of the escalation."
    answer: false
    explanation: "False. The responsibility is assisting the consumer: you identify a valid escalation, you escalate it and you move on. You are not responsible for following up with the consumer, for giving them the escalation results, or for emailing them - there is a whole department for that. What stays with you is the work the case needed before it went across. Lesson section: Stage 7: Escalation"
  - id: "309365c2-59a8-4935-8d1e-6bce35e3a286"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: a quick sort that comes back with no transfer means the consumer has been found ineligible for Medi-Cal."
    answer: false
    explanation: "False. A no-transfer result is one of the two results the tool produces. It means the household is most likely not eligible for Medi-Cal on the six answers given, so the county is not called, and the case stays in progress - it does not close the case, and it does not put a finding of ineligibility in front of the consumer. Your next step is helping them submit an application through CalHEERS. Lesson section: Stage 5: The two results"
  - id: "4244c4c8-801a-40b3-a81f-83f34fefbf51"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the training state correctly? Select all that apply."
    options:
      - id: a
        text: "The description cannot be edited once the case has been created, so the detail goes in the closing notes"
      - id: b
        text: "A quick sort is required on a new-application call where the consumer has no CalHEERS case and nobody in the household is on Medi-Cal"
      - id: c
        text: "On a transfer result the CRM case closes itself, and the representative still has to post the notes"
      - id: d
        text: "The tracer ID and the county phone number should be given to the consumer, so they can ring the county back if the transfer drops"
      - id: e
        text: "A no-transfer result closes the case, because there is nothing for the service centre to do once the quick sort is done"
    correctOptionIds: [a, b, c]
    explanation: "a, b and c are correct: the description is fixed once the case exists, the quick sort's trigger is a new-application call with no CalHEERS case and nobody in the household on Medi-Cal, and a transfer case that closes itself still needs its notes posted. d is wrong because the tracer ID and the county number are internal - the county only assists with warm transfers. e is wrong because a no-transfer case stays in progress and the work continues with helping the consumer submit an application through CalHEERS. Lesson section: Stage 6: The auto-closed case still needs documenting"
```
