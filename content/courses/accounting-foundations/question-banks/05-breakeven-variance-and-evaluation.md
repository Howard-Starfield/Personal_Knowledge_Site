---
id: "5934f89e-c6d9-4fab-a881-aab26bd3a9c1"
title: "Chapter 5: Breakeven Analysis, Variance & Performance Evaluation: Question Bank"
description: "Practice questions on contribution margin and cost-volume-profit analysis, standard costing and variance decomposition, random versus systematic variance, and designing performance metrics that cannot be gamed."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - accounting
  - study-guide
  - assessment
  - active-recall
courseId: "ba0aaa71-2556-4246-8c74-ab63aad30ffe"
comments: false
---

These questions practise [[courses/accounting-foundations/lessons/05-breakeven-variance-and-evaluation|Chapter 5: Breakeven Analysis, Variance & Performance Evaluation]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "4c8b4aa9-7ff2-419a-b0ed-9631b70fc54e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Third Wave Roasters has $12,000 of monthly fixed cost, sells each cup for $5.00 and pays $1.50 in variable cost. What is the monthly breakeven volume and the contribution margin ratio behind it?"
    options:
      - id: "breakeven-3429"
        text: "3,429 cups, at a $3.50 unit contribution margin and a 70% contribution margin ratio"
      - id: "breakeven-4000"
        text: "4,000 cups, at a $3.00 unit contribution margin and a 60% contribution margin ratio"
      - id: "breakeven-2400"
        text: "2,400 cups, at a $5.00 unit contribution margin and a 100% contribution margin ratio"
      - id: "breakeven-3200"
        text: "3,200 cups, at a $3.75 unit contribution margin and a 75% contribution margin ratio per cup sold"
    correctOptionIds: ["breakeven-3429"]
    explanation: "Unit contribution margin is $5.00 minus $1.50, which is $3.50, and the contribution margin ratio is $3.50 over $5.00, or 70.0%. Breakeven volume is $12,000 divided by $3.50, which is 3,428.57, rounded up to 3,429 cups a month. The 4,000 cup figure belongs to Shock A after variable costs rise to $2.00, and the 3,200 cup figure belongs to Shock B after the price rises to $5.75."
  - id: "cda8d838-187d-4cbe-9504-e0cc3b4cd6c8"
    revision: 1
    status: active
    type: single-choice
    prompt: "Coffee bean shortages lift Third Wave Roasters' variable cost from $1.50 to $2.00 a cup while the $5.00 price holds. What happens to the breakeven volume?"
    options:
      - id: "price-countermove"
        text: "3,200 cups, because raising price by $0.75 more than offset the $0.50 cost increase"
      - id: "four-thousand-cups"
        text: "4,000 cups, and the owner needs 571 more cups a month, a 16.65% volume increase"
      - id: "unchanged"
        text: "3,429 cups, because the contribution margin ratio is unaffected by a change in variable cost per unit"
      - id: "add-one-cup"
        text: "4,571 cups, because every $0.50 of cost increase must be recovered one cup at a time"
    correctOptionIds: ["four-thousand-cups"]
    explanation: "The unit contribution margin falls from $3.50 to $3.00, so breakeven rises to $12,000 divided by $3.00, which is 4,000 cups a month. That is 571 cups more than the 3,429 cup baseline, a 16.65% increase in the volume the barista must sell every month just to avoid bleeding cash. The 3,200 cup figure is the Shock B answer after the price rises to $5.75."
  - id: "47c45f7d-9729-46a0-bc77-cb224a57ef80"
    revision: 1
    status: active
    type: single-choice
    prompt: "An endodontist budgeted 60 minutes per root canal at a fixed $1,200 fee. Actual time across 300 procedures averaged 70 minutes, the clinic fell from 15 to 12 procedures a day, and the doctor still spent only 22 minutes of chair time per case. How should this variance be classified?"
    options:
      - id: "random-bad-tooth"
        text: "Random: a single unusually curved root explains the whole delay, and no intervention is warranted by one bad tooth"
      - id: "random-doctor-time"
        text: "Random, because the doctor still worked only 22 minutes per procedure, which is inside the 25-minute standard"
      - id: "systematic"
        text: "Systematic: a 10-minute average delay across 300 patients signals a workflow flaw, not a one-off bad tooth"
      - id: "materials"
        text: "Systematic, because the $150 standard materials allowance is now too low for the extra time consumed"
    correctOptionIds: ["systematic"]
    explanation: "A one-day delay from an unusually curved root is a random variance needing no intervention, but a month-long 10-minute average delay across 300 patients is a systematic variance pointing to training, equipment or workflow, and it should trigger immediate retraining of chair-side assistants. The doctor is not the constraint, since 22 minutes of chair time sits inside the 25-minute standard, and materials are not the issue either. The cost of not catching this was 60 lost procedures and $72,000 of monthly revenue."
  - id: "32c74623-f0b9-484e-8b9d-c736a0b915d6"
    revision: 1
    status: active
    type: single-choice
    prompt: "In 1995 in Hong Kong, Dr. Stice offered his two sons $3 each every Friday for taking the MTR subway instead of a private bus that cost the family $7 a day per boy. Why did the arrangement work so well?"
    options:
      - id: "bus-route"
        text: "The boys took the private bus and saved the family $6 a day each, with Dr. Stice keeping half of $12 a day"
      - id: "paid-to-bus"
        text: "The family paid the boys $15 a week to ride the bus, and saved $1,080 a year net of those payments"
      - id: "monitoring-cost"
        text: "The boys were given the bus fare as spending money, which raised parental monitoring costs sharply"
      - id: "mtr-route"
        text: "The boys took the MTR and saved the family $6 a day each, with Dr. Stice keeping half of $12 a day"
    correctOptionIds: ["mtr-route"]
    explanation: "The subway saves $6 a day for each of two boys, so $12 a day for the family, and Dr. Stice split it 50/50, paying each boy $3 a day or $15 a week. Over three full years the household saved $1,080 a year net of those payments, the boys learned independent navigation and financial responsibility, and the parental monitoring cost fell to exactly zero. Alignment with self-interest removed the management friction that a decree would have created."
  - id: "a03d9203-b05f-4c23-a047-a5b789387695"
    revision: 1
    status: active
    type: single-choice
    prompt: "Marcus bought 50,000 gyro-sensors at $18.00 against a $20.00 standard price, earning a $100,000 favorable materials price variance and a $20,000 bonus. The parts caused 9.0% scrap instead of 1.0%, $140,000 of emergency overtime rework, $85,000 of warranty claims and the loss of a $500,000 contract. What was the true economic result?"
    options:
      - id: "net-drain"
        text: "A $100,000 favorable price variance that became a $125,000 net cash drain once rework and warranty claims are counted"
      - id: "real-savings"
        text: "A $100,000 favorable price variance that also produced $100,000 of cash savings for the enterprise overall"
      - id: "unfavorable"
        text: "An unfavorable price variance, because the sensors were cheap and the standard cost of $20.00 was the fair market price"
      - id: "ledger-only"
        text: "A favorable price variance that should be judged only on the procurement ledger, since factory rework and field warranty costs belong to another department"
    correctOptionIds: ["net-drain"]
    explanation: "The $100,000 purchasing saving was outweighed by $140,000 of overtime rework and $85,000 of warranty claims, a net operating cash drain of $125,000 before counting the cancelled $500,000 contract. The root cause is evaluating a department on an unconstrained single metric without quality counterweights, so Marcus rationally pushed the cost of defects onto the factory floor and customer support. The fix is a total cost of ownership or quality-adjusted procurement scorecard."
  - id: "8216a031-c87d-4df4-8ada-3555b343a42d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Walmart reported donating 661 million pounds of food in 2024 against 696 million pounds in 2022. What is the managerial accounting reading?"
    options:
      - id: "increase"
        text: "A 35-million-pound increase from 661 million to 696 million, which is a variance that demands a cause"
      - id: "no-variance"
        text: "No variance at all, because donations are a charitable output rather than a controlled operating metric"
      - id: "decline"
        text: "A 35-million-pound decline from 696 million to 661 million, which is a variance that demands a cause"
      - id: "decline-no-explanation"
        text: "A 35-million-pound decline from 696 million to 661 million, which is a variance that no manager needs to explain"
    correctOptionIds: ["decline"]
    explanation: "Donations are a published, quantified metric, so the 35-million-pound fall between 2022 and 2024 is a variance that triggers an inquiry: did store managers box up less near-expiration produce, or did supply chain efficiency simply reduce the waste available to donate? A metric that is published and scrutinized keeps management accountable, and the answer to a variance is never that no explanation is needed."
  - id: "ac249843-9971-4b0c-b5e4-7c490cacb95b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Saudi Aramco tracks the share of its workforce that is Saudi national. The figure was 66.0% in 1987, 85.0% in 2016, 90.9% in 2022 and 90.3% in 2023. What does the 2023 reading show?"
    options:
      - id: "rise"
        text: "A 0.6% rise from 90.3% to 90.9%, which the company attributes to its new offshore ventures"
      - id: "small-drop"
        text: "A 0.6% drop from 90.9% to 90.3%, small enough that it still triggers an internal review"
      - id: "no-variance"
        text: "No variance at all, because the 2023 figure of 90.3% is still far above the 66.0% baseline of 1987"
      - id: "collapse"
        text: "A 19.9% collapse from the 66.0% of 1987 down to the 90.3% recorded in 2023"
    correctOptionIds: ["small-drop"]
    explanation: "The ratio dipped by 0.6% in 2023, from 90.9% to 90.3%, and even a fractional deviation keeps management accountable because the metric is published and audited. The immediate question is whether new complex offshore petrochemical ventures required specialized foreign engineering contractors. The 1987 figure is a baseline three decades earlier, and the direction from 2022 to 2023 is down, not up."
  - id: "1d90356b-45e5-4e15-bee8-841d101a173a"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about variance analysis are correct? Select every correct answer."
    options:
      - id: "price-variance"
        text: "The price variance, computed as actual quantity multiplied by the difference between actual and standard price, evaluates purchasing"
      - id: "quantity-variance"
        text: "The quantity variance, computed as the difference between actual and standard quantity times standard price, evaluates production"
      - id: "random-systematic"
        text: "A systematic variance across many observations points to training or equipment, while a one-off deviation is random noise"
      - id: "unfavorable-means-failure"
        text: "An unfavorable variance always means the manager failed, because variance analysis only measures individual performance"
    correctOptionIds: ["price-variance", "quantity-variance", "random-systematic"]
    explanation: "Variance analysis splits the gap between standard and actual into a purchasing signal and a production signal, and it only becomes useful when the variance is classified as random or systematic, because a month-long average delay calls for retraining while a single curved root calls for nothing. The last statement is wrong: variance analysis isolates where the difference arose, and an unfavorable variance can reflect a price the department could not control."
  - id: "efcbd68d-1c71-41a8-b958-b1f3b76717af"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about cost-volume-profit analysis are correct? Select every correct answer."
    options:
      - id: "cm-definition"
        text: "Contribution margin is selling price minus variable cost, so it is the cash each unit contributes toward fixed cost"
      - id: "cmr"
        text: "The contribution margin ratio is contribution margin divided by selling price, and the Ramona fundraiser's ratio is 84%"
      - id: "breakeven-units"
        text: "Breakeven volume is total fixed costs divided by the unit contribution margin, and Ramona's is 86 attendees"
      - id: "breakeven-sales"
        text: "Breakeven sales equals total fixed costs divided by the contribution margin ratio, so Ramona's is $18,000.00"
    correctOptionIds: ["cm-definition", "cmr", "breakeven-units"]
    explanation: "Contribution margin is the cash each unit throws toward fixed cost, and the Ramona fundraiser earns $210 of it on a $250 ticket, an 84% ratio, so $18,000 of fixed cost divided by $210 gives 85.714, rounded up to 86 attendees. The last statement has the wrong number: breakeven sales is $21,428.57, because 85.714 attendees times $250 of ticket revenue covers the $18,000 prize and the $3,428.57 of catering."
  - id: "b235d538-2027-41d3-a5f1-a32f07608e23"
    revision: 1
    status: active
    type: true-false
    prompt: "Paying call center agents a bonus for keeping every call under three minutes is a sound performance measure, and it is what caused agents to drop calls at around two minutes and fifty seconds, pushing customer satisfaction to 38%."
    answer: true
    explanation: "This is Goodhart's Law: when a measure becomes a target, it stops being a good measure. Management wanted efficient, high-quality problem resolution and measured the duration of the call, so agents rationally concluded that getting off the phone mattered more than solving the problem, and they hung up at two minutes and forty-five seconds, forcing customers to call back five or six times. The fix is a balanced scorecard of first-contact resolution at 50%, post-call satisfaction at 30% and adjusted handle time in a four to six minute band at 20%, with a callback inside ten minutes acting as the circuit breaker."
  - id: "4a19cdb2-06d9-44d4-af69-24ce9a25ae37"
    revision: 1
    status: active
    type: free-recall
    prompt: "Diagnose the endodontist's month: what was the standard, what actually happened, what it cost, and why the variance was systematic rather than random."
    sampleAnswer: "The standard was 15 root canals across three chairs in an 8-hour day at 60 minutes of patient time per procedure, $150 of sterile supplies per case and a $1,200 fixed fee, giving a daily operating contribution of 15 times $1,050, which is $15,750. Actual average time across 300 root canals was 70 minutes, the clinic managed only 12 procedures a day, and over a 20-day month it performed 240 against the budgeted 300, a shortfall of 60 procedures, which is 60 times $1,200, or $72,000 of lost monthly revenue. A single unusually curved root would be a random variance needing no intervention, but a 10-minute average delay across 300 patients is a systematic variance in training, equipment or workflow that demands immediate retraining of chair-side assistants. Without standard costing the clinic would have leaked $72,000 every month while the doctor blamed insurance reimbursement rates or patient tardiness."
    explanation: "A strong answer must state the 15-procedure, 60-minute, $150-materials standard and the $15,750 daily contribution, the 70-minute actual and 12-per-day result, the 240 against 300 shortfall and the $72,000 revenue loss, and then classify the variance as systematic because it persisted across 300 patients."
  - id: "e6db88e5-cf05-4029-92bf-67bf5d2ff4dd"
    revision: 1
    status: active
    type: free-recall
    prompt: "Work through Third Wave Roasters' baseline breakeven and then its two shocks, and explain why the pricing move beats the cost-cutting reflex."
    sampleAnswer: "The baseline is $12,000 of fixed cost, a $5.00 price and a $1.50 variable cost, so the unit contribution margin is $3.50, the contribution margin ratio is 70.0%, and breakeven volume is $12,000 divided by $3.50, which is 3,428.57, so 3,429 cups a month. Shock A raises variable cost to $2.00, so the contribution margin falls to $3.00 and breakeven rises to 4,000 cups, which is 571 more cups and a 16.65% increase in required volume. Shock B then lifts the price to $5.75 while variable cost settles at $2.00, so the contribution margin rises to $3.75 and breakeven falls to 3,200 cups, which is 229 cups below the original baseline. Because a $0.75 price rise outweighs a $0.50 cost rise, pricing power shrinks the number of cups that must be sold, which is why the pricing move beats the reflex of trying to cut costs or squeeze volume."
    explanation: "A strong answer must give the baseline $3.50 contribution margin, 70.0% ratio and 3,429 cup breakeven, the Shock A figures of $3.00 and 4,000 cups with the 571 cup and 16.65% increase, and the Shock B figures of $3.75 and 3,200 cups, then connect the 229 cup reduction to pricing power."
```
