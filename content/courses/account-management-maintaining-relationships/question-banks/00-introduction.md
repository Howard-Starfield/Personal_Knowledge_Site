---
id: "09326ae0-d9cb-4a76-bc60-7eb52ac297b6"
title: "Introduction: Shifting from Hunting to Farming — The Foundation of Account Management: Question Bank"
description: "Practice questions on the hunter-to-farmer shift, the lifetime value equation, the four pillars of post-sale leverage, and the traps that break accounts."
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

These questions practise [[courses/account-management-maintaining-relationships/lessons/00-introduction|Introduction: Shifting from Hunting to Farming — The Foundation of Account Management]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "0f6b33a5-38fa-4d0c-a080-89526134074a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the Lifetime Value Equation from this lesson, which expression correctly calculates the Customer Lifetime Value of a recurring enterprise contract?"
    options:
      - id: wrong-denominator
        text: "Annual Contract Value divided by the annual churn rate, with the gross margin percentage then subtracted from the resulting lifespan"
      - id: correct-formula
        text: "Annual Contract Value multiplied by the gross margin percentage, all divided by the annual churn rate"
      - id: margin-cancels
        text: "Annual Contract Value multiplied by the gross margin percentage, all divided by the gross margin percentage"
      - id: added-margin
        text: "Annual Contract Value plus the gross margin percentage, all divided by the annual churn rate"
    correctOptionIds: [correct-formula]
    explanation: "The lesson defines lifetime value as annual contract value multiplied by gross margin percentage, divided by the annual churn rate, and the Company A walkthrough applies it as 20,000 times 0.80 divided by 0.20 to reach 80,000. The wrong denominator option puts the churn rate in the wrong place and then subtracts margin, the margin-cancels option divides by the gross margin percentage a second time so the margin cancels out entirely, and the added-margin option adds the margin to revenue instead of multiplying revenue by it."
  - id: "a8729b3c-9498-4ed5-a7e3-8d2c49d40c0c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Company A loses 20% of its customer base each year and Company B loses 5%, with everything else identical. According to the lesson's worked comparison, what is the difference in Customer Lifetime Value between the two firms?"
    options:
      - id: marginal-gain
        text: "Company B's lifetime value is higher, but only marginally, because a fifteen-point churn gap changes the result only slightly"
      - id: same-value
        text: "Both firms land on the same lifetime value of 80,000 dollars, since the contract value and gross margin are identical"
      - id: short-life-wins
        text: "Company A's lifetime value is higher, because a shorter average customer lifespan concentrates the acquisition cost sooner"
      - id: correct-fourfold
        text: "Company B's lifetime value of 320,000 dollars is four times Company A's 80,000 dollars"
    correctOptionIds: [correct-fourfold]
    explanation: "Both firms bill 20,000 a year at 80% gross margin, giving 16,000 of gross profit per customer per year. Company A divides that by 0.20 for a 5.0 year lifespan and 80,000 of lifetime value; Company B divides it by 0.05 for a 20.0 year lifespan and 320,000. The marginal-gain option understates a four-fold gap, the same-value option ignores the churn term sitting in the denominator, and the short-life-wins option reverses the direction of the effect, when a shorter lifespan actually means the acquisition cost is recovered over fewer paying years."
  - id: "fd3332bf-e06c-49f0-b4c6-dca97faea334"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson cites Frederick Reichheld's research on the power of retention. What does it say happens to company profits when customer retention rates rise by five percent?"
    options:
      - id: correct-reichheld
        text: "Profits expand by between 25% and 95%, because the acquisition cost is amortized across a longer horizon"
      - id: linear-five
        text: "Profits expand by exactly 5%, because each retained customer simply adds one more year of revenue"
      - id: no-effect
        text: "Profits are unchanged, because the five percent is a retention figure rather than a profit figure"
      - id: smaller-range
        text: "Profits expand by between 5% and 25%, because the same five percent of retained customers produces a smaller and more marginal margin effect"
    correctOptionIds: [correct-reichheld]
    explanation: "The lesson quotes Bain and Company research published with the Harvard Business Review: a 5% increase in customer retention expands company profits by 25% to 95%. The linear-five option treats the relationship as one-for-one, the no-effect option denies the cited finding outright, and the smaller-range option invents a band the lesson never states. The mechanism the lesson gives is amortized acquisition cost, lower cost to serve, price inelasticity, and expansion velocity, all of which compound once the customer stays longer."
  - id: "1c594ae4-0a27-4e50-9f4f-a67b3cd609bc"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the lesson's four pillars of post-sale account leverage, which mechanism explains why expansion revenue can be added to an existing account with very little friction?"
    options:
      - id: denial-moat
        text: "The competitor denial moat, because deeply embedded workflow integration makes switching expensive for the client"
      - id: remorse
        text: "Neutralizing buyer's remorse, because rapid early milestone victories inside the first two weeks settle the buyer's doubts after signing"
      - id: correct-expansion
        text: "Expansion velocity, because the vendor is already an approved entity inside the client's own procurement system"
      - id: flywheel
        text: "The compounding referral flywheel, because an executive champion recommends the firm in private peer networks"
    correctOptionIds: [correct-expansion]
    explanation: "The expansion velocity pillar works because the master service agreement, security review, data privacy addendum, and procurement negotiation were all cleared during the new-logo sale. Adding seats, upgrading an API tier, or commissioning adjacent consulting therefore needs only a single-page order form or statement of work, which drops the sales cycle from 180 days to 14. The denial-moat and remorse options are real pillars but describe retention of the existing footprint rather than the removal of expansion friction, and the flywheel option describes where new logos come from rather than how the current account grows."
  - id: "bad217f2-a0db-4e53-a9bc-35e24ef7239a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which trap does the lesson describe as the organizational failure mode in which representatives treat the signed contract as the finish line and then stop talking to the client?"
    options:
      - id: remorse-abyss
        text: "The Buyer's Remorse Abyss, where the champion doubts whether the integration will work during the first fortnight after signature"
      - id: correct-commission
        text: "The Commission Check Trap, where the representative collects the commission and then abandons the account"
      - id: decay-trap
        text: "The Inactivity Decay Trap, where silence from the client is mistaken for satisfaction"
      - id: shear-pin
        text: "The Single-Thread Fragility Trap, where one champion departure can shear off the whole account"
    correctOptionIds: [correct-commission]
    explanation: "The Commission Check Trap is the pattern where commercial incentives treat the signature as the finish line, so the representative celebrates, takes the commission, and abruptly stops communicating to chase the next cold lead. The remorse-abyss option names a different trap, the buyer's psychological doubt in the first 14 days after signature. The decay-trap and shear-pin options describe later operational failures rather than the post-signature abandonment the question asks about."
  - id: "1b15f356-a8cc-456b-8f64-23cf4a022907"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's opening analogy, what separates the apple orchard cultivator from the timber logger?"
    options:
      - id: logger-plots
        text: "The logger harvests the visible trees quickly, while the cultivator waits many years for the orchard to mature before taking anything"
      - id: logger-price
        text: "The logger sells the timber at the highest local price, while the cultivator diversifies across several different tree species"
      - id: logger-solo
        text: "The logger works alone on a single plot, while the cultivator employs a large seasonal workforce at harvest time"
      - id: correct-tending
        text: "The cultivator tends each tree continuously, while the logger only returns when there is more timber to cut"
    correctOptionIds: [correct-tending]
    explanation: "The timber logger evaluates an asset only by what can be stripped away today, so the landscape is depleted and new acreage, access roads, and deeper equipment must be found to repeat the revenue, while competition compresses margins. The cultivator pays an upfront planting cost and then prunes, irrigates, and pest-controls so the root system matures and yields season after season without replanting. The logger-plots, logger-price, and logger-solo options all invent distinctions the analogy never draws; the analogy is about continuous tending versus extractive harvesting."
  - id: "5edef992-0503-46f3-a26b-155976293db7"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's fourth pillar describes a compounding referral flywheel. According to it, what happens when a satisfied executive champion moves to a new company?"
    options:
      - id: correct-alumni
        text: "They often terminate the ineffective legacy vendor at the new company and bring your firm in with them"
      - id: no-carry
        text: "They rarely recommend you, because their new company has no relationship with your product and the champion carries no authority there"
      - id: rfp-first
        text: "They recommend you only after a fresh request for proposals, because procurement rules bar informal referrals"
      - id: formal-filing
        text: "They file a formal referral request through your account team before their first board meeting"
    correctOptionIds: [correct-alumni]
    explanation: "Corporate executives switch companies every 2 to 4 years, and the lesson's Champion Alumni Effect says that when a champion who loves the partnership transitions, their first act is often to terminate the ineffective legacy vendor at the new company and bring your firm in. The no-carry option denies the alumni effect the pillar describes, the rfp-first option adds a procurement gate the lesson never mentions, and the formal-filing option describes a process that the lesson explicitly argues against, since referrals are treated as organic and zero-cost rather than paperwork."
  - id: "ece90335-cfdd-499a-80f9-a7b50da4e9e3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are named in this lesson as the four pillars of post-sale account leverage? Select every correct answer."
    options:
      - id: pillar-expansion
        text: "Expansion velocity, because the vendor is already an approved entity and extra seats need only a single-page order form"
      - id: pillar-moat
        text: "The competitor denial moat, because embedded workflow integration and a champion's personal trust raise switching costs"
      - id: pillar-flywheel
        text: "The compounding referral flywheel, because happy enterprise clients are the highest-converting lead source at zero advertising cost"
      - id: pillar-tiering
        text: "Account tiering by annual recurring revenue, which decides how often a representative is allowed to phone the client"
    correctOptionIds: [pillar-expansion, pillar-moat, pillar-flywheel]
    explanation: "The lesson lists exactly four pillars: expansion velocity, the competitor denial moat, neutralizing buyer's remorse, and the compounding referral flywheel. Expansion velocity removes the new-logo friction, the denial moat protects the installed base from displacement, and the referral flywheel produces organic zero-cost demand. The pillar-tiering option is a distractor borrowed from a different part of the course: tiering by value does appear in the material, but it calibrates contact frequency, and it is not one of the four leverage pillars named here."
  - id: "2910995e-f107-468d-be97-a673b7fc9f4d"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are described in this lesson as traps where hunter-centric organizations fail? Select every correct answer."
    options:
      - id: trap-commission
        text: "The Commission Check Trap, where the signed contract is treated as the finish line and the account is abandoned"
      - id: trap-remorse
        text: "The Buyer's Remorse Abyss, where the champion doubts the purchase during the first fourteen days"
      - id: trap-anchor
        text: "The Economic Anchor Trap, where a discounted price becomes the client's permanent reference point"
      - id: trap-shear
        text: "The Single-Shear Pin, where an entire account hangs on one champion's goodwill"
    correctOptionIds: [trap-commission, trap-remorse]
    explanation: "This lesson names two lethal organizational failure modes: the Commission Check Trap, where incentives treat the signature as the finish line, and the Buyer's Remorse Abyss, the psychological trough in the first 14 days after execution that minor implementation hiccups magnify into existential crises. The Economic Anchor Trap and the Single-Shear Pin are real failure modes elsewhere in the course, but they belong to other lessons; this lesson introduces them only as forward references, so a reader answering from this lesson alone should not select them."
  - id: "c59461b0-132c-4a87-a7b2-68fa9f52549c"
    revision: 1
    status: active
    type: true-false
    prompt: "In the lesson's worked churn comparison the two firms share the same annual contract value and the same gross margin, and only the annual churn rate differs. Is a customer worth more to the firm with the lower churn rate under the Lifetime Value Equation?"
    answer: true
    explanation: "The churn rate sits in the denominator of the equation, so lowering it lengthens the average customer lifespan and multiplies lifetime value. Company A at 20% churn yields a 5.0 year lifespan and 80,000 of lifetime value; Company B at 5% churn yields a 20.0 year lifespan and 320,000, with the ratio to acquisition cost rising from 3.2 to 12.8 and net gross profit per account rising from 55,000 to 295,000. The answer is true because the churn rate is the only term that differs, and it multiplies the value of every other term."
  - id: "edf45600-5192-4172-ae94-a6ba1bcfebb0"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the lesson's own figures, explain why a firm that cuts annual churn from 20% to 5% creates more value than one that spends the same money buying replacement logos at the same acquisition cost."
    sampleAnswer: "With the same 20,000 annual contract value and 80% gross margin, each customer contributes 16,000 of gross profit a year, so the churn rate is the only variable. At 20% churn the average lifespan is 1 divided by 0.20, or 5.0 years, giving a lifetime value of 80,000 against a 25,000 acquisition cost, a 3.2 to 1 ratio and 55,000 of net gross profit per account. At 5% churn the lifespan is 20.0 years, the lifetime value is 320,000, the ratio is 12.8 to 1, and net gross profit per account is 295,000, so the same retention effort is worth roughly five times more than the acquisition effort it replaces."
    explanation: "A strong answer must use the equation itself, so that the churn rate's position in the denominator is visible, and must quote the lesson's figures: 20,000 contract value, 80% margin, 25,000 acquisition cost, and the resulting 5.0 against 20.0 year lifespans, 80,000 against 320,000 of lifetime value, and 3.2 to 1 against 12.8 to 1. It should also connect this to the lesson's stated reasons the retention effect is so large: amortized acquisition cost, lower cost to serve, price inelasticity, and expansion velocity. An answer that asserts retention is better without doing the arithmetic has not shown that it follows from the lesson."
  - id: "8573b0d3-1bc7-450b-9ff5-008eed1d0164"
    revision: 1
    status: active
    type: free-recall
    prompt: "Name the four pillars of post-sale account leverage in this lesson and give one concrete mechanism from the lesson for each."
    sampleAnswer: "Expansion velocity: in an active satisfied account the master service agreement, security review, and procurement negotiation are already done, so extra seats or an API tier upgrade needs only a single-page order form and the cycle falls from 180 days to 14. Competitor denial moat: the champion's personal trust and deep workflow integration make a cold approach from a rival meet the line that an established partner already handles it seamlessly. Neutralizing buyer's remorse: an immediate post-signature reassurance touchpoint, an explicit onboarding roadmap, and an early quick win inside the first two weeks prevent implementation hiccups from festering. Compounding referral flywheel: exceptional value turns the champion into a private advocate whose referrals close at over 50% with zero advertising cost, and whose next job brings the firm with them."
    explanation: "A strong answer must name all four pillars exactly as the lesson names them and attach a mechanism drawn from the lesson rather than a generic benefit. It should contain at least one of the lesson's concrete figures, such as the 180 day to 14 day cycle compression, the 14-day survival window, or the referral close rate above 50%. Answers that list three pillars, or that describe generic benefits without the lesson's mechanics, are missing the substance the lesson is teaching."
```
