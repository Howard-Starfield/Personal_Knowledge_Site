---
id: "c188212e-7015-4df8-af5c-3d2936b5a46f"
title: "Authenticating a Caller"
description: "How a representative proves who is on the line before anything is released: the consent rules for a recorded call, finding the case in CalHEERS, identifying the caller's role, the authentication standard and its blank-field rule, the relationship check that follows it, and what happens when authentication fails."
type: lesson
publish: true
status: active
created: "2026-10-22"
tags:
  - study-guide
  - active-recall
  - assessment
courseId: "6e01a17c-f82f-4614-8f77-11b78d55fa81"
lessonOrder: 17
estimatedMinutes: 20
comments: false
---

# Authenticating a Caller

> [!note] Study notes based on the owner's Covered California training recordings. Original explanations; not affiliated with or endorsed by any organisation.

## What you will be able to do

- Apply the consent rules for a recorded call, and recognise the three situations where the automated greeting is not enough.
- Locate a consumer's case and the primary contact inside CalHEERS before you ask a single identity question.
- Tell a caller who is on the line apart from the primary contact, and check that the relationship the caller claims is the one the case actually records.
- Run the authentication standard correctly, including what a blank field on the case means and what to do with a wrong answer.
- Hold the line for a caller who has fewer rights than the primary, and stop cleanly when authentication fails.

Two recordings cover this lesson, both from **8 October 2026**. **A** is the 30-minute session
recorded at 09:01, and **B** is the 46-minute follow-up recorded at 09:31. Timestamps are
given as `A 00:14:09` and `B 00:05:39`.

## Stage 1: Consent to the call being recorded

Nothing about a call can be shared until the call itself is legitimate, and that
starts with whether the consumer agreed to it being recorded at all.

On an inbound call the automated greeting tells the consumer that the call is being
recorded, and staying on the line counts as their agreement to that (A 00:00:08). The
ordinary case therefore needs no separate consent script.

Three situations break that pattern, and in each one you need the consumer's express
agreement before you go further (A 00:00:17):

| Situation                                                                                      | What you do                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| More than one person is on the line when the call starts                                       | Get consent to the recording before you discuss anything with the second person                                              |
| Someone who does not work for Covered California or for the call centre joins part-way through | Get that person's own consent: the consumer, a spouse, a delegate, someone on the language line, a county eligibility worker |
| The call arrives transferred from the chat assistant                                           | Get consent to the recording                                                                                                 |

Asking when you did not strictly need to is not a fault. The training's own position
was that if you are in doubt, go ahead and obtain consent, and that a representative
who did so would get a friendly reminder rather than anything worse (A 00:01:43). Being
the other way round is the error that matters.

> **The trap.** Staying on the line is consent to the recording. It is not consent to
> everything that follows, and it is certainly not consent from anyone who joins after
> that point. Each person who joins needs their own.

**A planned change, flagged as such.** The training noted that the chat assistant was
not to be available on the redesigned coveredca.com site when it relaunched on
**1 October 2026**, and was careful to add that this covered the website relaunch and
did not confirm the chat service was being withdrawn permanently (A 00:00:44). Treat
it as a change that was planned at the time of the recording, not as a settled
permanent fact.

## Stage 2: Finding the case and the primary contact

Authentication starts with a case, because the answers you are about to check have to
be checked against something.

In CalHEERS, run a consumer information search (A 00:02:07). The three core fields are
the legal first name, the last name and the date of birth that the case is filed
under. You may add further consumer information such as a social security number or
the email on the account, and you may enter a unique identifier for the case instead,
such as a case ID, an application ID or a user name.

The more criteria you add, the fewer results you get. The fewer you add — a phonetic
name search, a name-like search, a date-of-birth range — the more results you get
(A 00:02:50). From the results, pick the right case and find the primary contact on it
(A 00:03:13).

> **The trap.** A name and a date of birth are the minimum you should be working with.
> Common names return a very large list, and a list that large is read aloud to the
> consumer and slows the whole call (B 00:14:06). If nothing comes up after two or
> three attempts on the spelling, drop the criteria you have used and ask for the full
> social security number: that always settles whether the person is in the system. If
> there is still nothing, the person is a new applicant (B 00:27:36).

**The analogy.** Finding a case is like finding a name in a phone book. Every detail you
can add is one less name you have to read out and one less chance of reading out the
wrong household.

## Stage 3: Who is on the line

When the caller is somebody other than the primary contact, they have to be able to
give the primary contact's legal first and last name (A 00:03:28). Note what that means: **you
authenticate the primary, not the caller.** Whatever role the caller has, the answers
they give are about the primary contact, and the relationship is what decides how much
you may then do (B 00:03:30).

The caller types that continue into authentication in CalHEERS are the primary contact,
a spouse or domestic partner, a non-primary adult enrollee, an authorised
representative, a delegate, an enrolment counselor and an agent of record
(A 00:03:51).

**Household means the tax household**, not the set of people who happen to live
together. A boyfriend, girlfriend or fiance listed on the application is a non-primary
adult enrollee and not a spouse, and a non-primary adult enrollee does not have the
same rights as a spouse (A 00:04:41). So check the marital status recorded on the case
rather than assuming it: if it reads "single" or "never married", the caller is a
non-primary adult enrollee, not a spouse (A 00:10:41).

**The primary need not be on the call at all.** If the caller can authenticate the
primary's details, the call continues without them (A 00:09:44).

| Caller                                                                             | Whose details they give   | What they may do                                                                     |
| ---------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| Primary contact                                                                    | Their own, as the primary | Everything the primary can do                                                        |
| Spouse or domestic partner                                                         | The primary's             | The same broad rights as the primary                                                 |
| Non-primary adult enrollee                                                         | The primary's             | End their own coverage, and nothing else                                             |
| Authorised representative                                                          | The primary's             | The same broad rights as the primary **on the case** — but never the primary's login |
| Delegate, such as an insurance agent or an enrolment counselor acting for a client | The primary's             | The same broad rights as the primary **on the case** — but never the primary's login |
| Agent of record                                                                    | The primary's             | The same broad rights as the primary **on the case** — but never the primary's login |

> **A later session narrows the last three rows, and the two do not quite
> agree.** The session on regaining account access says the primary's password
> may only be reset by the primary, the spouse or a registered domestic
> partner, and that an authorised representative is given a **delegation access
> code** so they can register their own username and password and reach the
> primary's information from their own account. Read the broad rights above as
> rights on the case, not as the primary's login. The two sessions differ on
> this point, and it is listed for the owner in `incorrect-items.md` §1F.

**The non-primary adult enrollee is the case to get right.** You continue the call.
What that caller may not do is cancel the primary's coverage or the spouse's coverage,
report a change, have the primary's password reset, or be given the primary's user
name (A 00:05:55). Do not turn the call away — the training was explicit that you do
not stop assisting them (A 00:08:50).

> **The trap.** The caller who knows the primary's date of birth is not thereby the
> primary. Knowing the answers proves knowledge; it does not create authority.

## Stage 4: The authentication standard

In CalHEERS, open the Case Overview section, use the ellipsis under Action, and choose
the **Case Overview Hub** (A 00:14:09). Check the caller's answers there. Do not use
the application PDF on the Application History page to confirm them: it may not reflect
the latest information (A 00:14:23).

The standard is the primary's legal first and last name, which counts as one item, plus
**three correct answers** from this list about the primary:

| Approved item                                            | Note                                      |
| -------------------------------------------------------- | ----------------------------------------- |
| Date of birth                                            | One of the preferred items                |
| Full mailing or physical address                         | One of the preferred items                |
| Phone number                                             | One of the preferred items                |
| The final four digits of the social security number      |                                           |
| Email address                                            | A blank field has its own rule, below     |
| The names of every household member recorded on the case | The last resort when nothing else will do |

That is **four items in total**, and the training put it in two ways that agree. One
formulation was the name, and then at least three further items, with the date of
birth, the phone number and the mailing address the preferred ones (B 00:10:31); the
other was the primary's first and last name, their date of birth, and at least two
further pieces of information (A 00:26:08).
Asked directly how many more pieces were needed once the name and date of birth were
in hand, the answer given was two (A 00:20:10). The follow-up made the arithmetic
explicit: three, plus the first and last name, equals four in total (B 00:22:53).

**A blank field has its own rule.** If the case shows no email address and the caller
tells you that no email address is held on the account, that item is authenticated
(A 00:15:00). The same applies to a phone number (A 00:15:07). But if the case shows
no email address and the caller offers an address that is not on the account, that is
not a pass (A 00:16:18).

**The order to work in** is phone number, then mailing address, then email address,
then the last four digits of the social security number, then the household member
names (A 00:15:19).

**When an answer is wrong, do not say so.** Carry on to the next item instead, and once
the caller is authenticated, correct the record (A 00:21:25). There are six items on
the list, so a wrong answer does not end the attempt; ask a different one (B 00:20:06).

> **The trap.** "Three" is not the whole answer. Three is the number of correct items
> from the list. The primary's name is a fourth thing the caller has to produce, and
> the date of birth only counts once, inside those three.

**The analogy.** The name opens the locker. The three answers are the combination.

## Stage 5: The relationship check that comes after

Authentication proves the caller knows the primary's details. It does not by itself
make the caller the primary, so a second check follows: is the relationship the caller
claims the one the case records?

| Caller's claim             | Where you check                                                                                   | What has to agree                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Spouse or domestic partner | Review Application page, then the Individual Information tab                                      | The primary's marital status and the household relationship must agree with the consumer's own |
| Authorised representative  | The account's authorised representative page, reached from Account Home, then Account Information | The caller must be listed on it                                                                |
| Delegate                   | The Manage Delegates page, reached from the Case Overview Hub                                     | The caller must be listed on it                                                                |

For the spouse check, the primary's basic information gives the marital status and the
household relationship section gives the relationship to the consumer, and both have to
line up (B 00:02:02). If the case reads "single" or "never married", the caller is a
non-primary adult enrollee and the call is handled at the lower level of rights
(A 00:10:41). An authorised representative has to be found on the account before the
caller is treated as one (B 00:03:42), and a delegate on the Manage Delegates page
(B 00:04:29).

The training was clear that the spouse, the authorised representative, the delegate,
the enrolment counselor and the agent of record carry the same broad privileges as the
primary — ending coverage, reporting a change, resetting passwords — while the
non-primary adult enrollee does not (A 00:13:04).

> **The trap.** "Household" on the application is the tax household. A partner who
> lives at the same address but is not on the same tax return is a non-primary adult
> enrollee, and the whole call is then handled at that lower level.

## Stage 6: When authentication fails

If the answers are wrong, or the extra criteria for the caller's relationship are not
met, authentication has failed (B 00:05:39). At that point you do not release
information to the consumer, you do not make account or case changes, you do not
provide login information, and you do not reset the account password.

What you may do instead (B 00:06:03):

1. Ask the caller for the details as they appear on their application or on other official documents, and check whether an official document matches what they gave you.
2. If the caller can be authenticated from that, offer to correct the application so it matches the official documents.
3. If it does not match, say plainly that the information they have given is not enough to authenticate them, and offer to help with general questions.
4. Point them at coveredca.com so that they can sign in and correct their own information.
5. Suggest that the primary contact calls the service centre on **800-300-1506** and adds the caller as an authorised representative (B 00:06:39).

If the caller is a sales agent who is not on the agency roster, point them to the
agent contracts address on coveredca.gov (B 00:06:56).

Two things you never do, whatever the caller says: confirm that an online account
exists, and read out the user name (A 00:23:41).

> **The trap.** Failing authentication is not failing the consumer. You cannot release
> the case, and you also cannot leave the caller with nothing. The application
> correction offer is the step that turns a dead end into a route forward — it is the
> part that gets skipped.

### Check yourself

```knowledge-quiz
schemaVersion: 1
quizId: "7b6f6ac5-d167-442a-bd75-1362e6df42c8"
title: "Check yourself: authenticating a caller"
questionBankId: "4ecaae2a-66f1-4482-97bc-3caca383fc9c"
questionIds:
  - "f8292af0-7b8c-427f-9285-89349b963162"
  - "3cabb7ac-705e-48f6-bb30-81a6d3ec5ac1"
  - "32d7b943-4680-4ced-acbd-8939ac06324d"
  - "b4ae6d1f-5289-4753-8b58-acc8db1f7c10"
  - "8e0bd8ee-b48b-4dec-8021-c66728043ff5"
  - "c59aa61a-9a03-4fe1-acb7-96bd0b2bdff6"
  - "a54606a6-9f47-485e-9eea-2e9872c229e1"
  - "26c08ce1-4070-4e49-ab0d-c2ee238f1d70"
  - "0b1130f3-e41d-494c-888f-2140a7a9409b"
  - "15adfae1-ce57-4424-8e6a-3a71feb84d78"
  - "a74385f8-b58b-4503-9d31-bcd8969c3909"
```

## Review

Close the lesson and write the answer to each of these from memory:

1. Name the three situations in which the automated greeting is not enough consent, and say what the training said about asking when you did not have to.
2. What do you enter into a consumer information search, what happens to the number of results as you add or remove criteria, and what do you do when nothing comes up?
3. Whose details does a non-primary caller authenticate, and what do you check before the call continues?
4. How many items in total does the authentication standard take, and which of them is the name?
5. What happens to an email item when the case has no email address on it?
6. What do you do when an answer comes back wrong?
7. Where do you check that a caller really is the primary's spouse, an authorised representative, or a delegate?
8. What may a non-primary adult enrollee do, and what may they not do?
9. Name the four things you must not do when authentication fails, and the five things you may do instead.

Then do the thing that makes this lesson work: for each of the traps above, write the
**trigger** — the wording in a question that would have pulled you into the wrong
answer — next to the correction. A trap you can only correct after seeing the right
answer is not yet learned; a trap you can correct because you noticed the trigger is.
