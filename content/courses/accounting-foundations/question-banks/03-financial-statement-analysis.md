---
id: "7cd989c4-513e-4f10-bc4a-af30135b2a00"
title: "Chapter 3: Financial Statement Analysis: Common Size, Ratios & The DuPont Framework: Question Bank"
description: "Practice questions on vertical common-size analysis, asset intensity, the three DuPont pillars, liquidity and solvency ratios, and margin shock stress testing."
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

These questions practise [[courses/accounting-foundations/lessons/03-financial-statement-analysis|Chapter 3: Financial Statement Analysis: Common Size, Ratios & The DuPont Framework]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "f869ebe5-2d93-4f76-88f9-36ffa029bc73"
    revision: 1
    status: active
    type: single-choice
    prompt: "On a common-size income statement, Walmart keeps $24.40 of gross profit for every $100 of sales while Target keeps $27.60. Which line accounts for Target's $3.20 advantage?"
    options:
      - id: "cogs"
        text: "Cost of goods sold: Target spends $72.40 against Walmart's $75.60, a 3.2 point difference"
      - id: "sga"
        text: "Selling, general and administrative overhead: Target spends $22.30 against Walmart's $20.20, a 2.1 point difference"
      - id: "ito"
        text: "Interest, taxes and other net items: Target gives up $1.40 against Walmart's $1.70, a 0.3 point difference"
      - id: "same-margin"
        text: "Neither line explains it, because both companies convert the same $100 of sales into the same $2.40 of net profit"
    correctOptionIds: ["cogs"]
    explanation: "The common-size statement divides every line by sales, so Target's $3.20 gross-margin advantage traces directly to cost of goods sold: $72.40 against Walmart's $75.60, with more than half of Walmart's sales coming from grocery items that carry paper-thin markups. The overhead line actually runs the other way, since Walmart's 20.2% is 2.1 points thriftier than Target's 22.3%, and the interest and tax line is worth only 0.3 points."
  - id: "634fdd12-32c7-4336-8b85-99cda26d00ab"
    revision: 1
    status: active
    type: single-choice
    prompt: "Target's return on equity of 31.18% is far above Walmart's 18.00%. Why, on the DuPont decomposition?"
    options:
      - id: "turnover"
        text: "Target has the higher ROE mainly because its 2.57x asset turnover is far above Walmart's 1.94x asset turnover"
      - id: "leverage"
        text: "Target has the higher ROE mainly because its 4.12x equity multiplier is far above Walmart's 2.80x"
      - id: "roa"
        text: "Target has the higher ROE mainly because its 7.57% return on assets is far above Walmart's 6.43% return on assets"
      - id: "same"
        text: "Both companies have the same ROE because the DuPont framework always collapses to a single identical number for competitors"
    correctOptionIds: ["leverage"]
    explanation: "Target borrows $3.12 for every $1.00 of shareholder equity while Walmart borrows $1.80, and that 4.12x equity multiplier against 2.80x is what drives the 31.18% against 18.00% gap. Target actually turns its assets more slowly, 1.94x against Walmart's 2.57x, and its 7.57% return on assets beats Walmart's 6.43% by only 1.14 points. So the headline return on equity mostly reports borrowed money, not superior operating skill."
  - id: "4b954567-0fbd-41fc-a50a-9af20d2d0712"
    revision: 1
    status: active
    type: single-choice
    prompt: "On a common-size balance sheet, Walmart holds $38.90 of capital for every $100 of sales while Target holds $51.40. What does that gap tell you?"
    options:
      - id: "fifty-three-pct"
        text: "Walmart requires $38.90 per $100 of sales against Target's $51.40, so Walmart needs 53% less physical capital"
      - id: "target-less"
        text: "Target requires $51.40 per $100 of sales against Walmart's $38.90, so Target needs 24% less capital"
      - id: "twenty-four-pct"
        text: "Walmart requires $38.90 per $100 of sales against Target's $51.40, so Walmart needs 24% less capital"
      - id: "normalized"
        text: "Both companies require the same $38.90 per $100 of sales, because the common-size balance sheet normalizes away scale differences"
    correctOptionIds: ["twenty-four-pct"]
    explanation: "Asset intensity compares what each company must tie up to support a dollar of revenue, and Walmart's $38.90 against Target's $51.40 means Walmart needs 24% less capital per dollar of sales. The rows underneath explain it: $8.50 of inventory against $11.10 and $20.10 of property, plant and equipment against $30.80, which also gives Walmart 53% more revenue per square foot. The common-size balance sheet normalizes for size, not for capital efficiency."
  - id: "b0212776-8492-428b-845d-4270a86b0983"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pair of debt ratios matches the fiscal 2024 balance sheets, and how do they read against the 50% to 60% benchmark?"
    options:
      - id: "swapped"
        text: "Target 24.0% and Walmart 35.7%, both comfortably above the 50% to 60% benchmark"
      - id: "equity-as-debt"
        text: "Target 24.0% and Walmart 35.7%, both comfortably below the 50% to 60% benchmark"
      - id: "walmart-inside"
        text: "Walmart 64.3% comfortably inside the 50% to 60% benchmark, versus Target's 76.0%"
      - id: "target-high"
        text: "Target 76.0%, above the 50% to 60% benchmark, versus Walmart's 64.3%"
    correctOptionIds: ["target-high"]
    explanation: "Creditors financed $162.3 billion of Walmart's $252.4 billion of assets for a 64.3% debt ratio, and $41.8 billion of Target's $55.0 billion for 76.0%. Target's equity ratio of 24.0% against Walmart's 35.7% means shareholders own far less of the asset base, and Target sits well above the healthy 50% to 60% band while Walmart sits slightly above it. The 24.0% and 35.7% figures are equity ratios, not debt ratios."
  - id: "fffd7e1e-20ed-42c9-b302-7f402ebdfcf9"
    revision: 1
    status: active
    type: single-choice
    prompt: "Company Alpha and Company Beta both report a 20% return on equity. Alpha earns a 2.0% margin on 5.0x asset turnover; Beta earns a 10.0% margin on 1.0x asset turnover. Both carry a 2.0x equity multiplier. What happens if industry gross margins fall by 150 basis points?"
    options:
      - id: "alpha-collapses"
        text: "Alpha falls from 20% to 5%, because a 1.5 point margin cut lands on a margin of only 2.0%"
      - id: "beta-collapses"
        text: "Beta falls from 20% to 5%, because a 1.5 point margin cut lands on a margin of only 2.0%"
      - id: "same-fall"
        text: "Both fall from 20% to 17%, because a 1.5 point margin cut is proportionally identical at either starting margin"
      - id: "no-move"
        text: "Neither moves, because the equity multiplier of 2.0x holds return on equity constant when margins are squeezed"
    correctOptionIds: ["alpha-collapses"]
    explanation: "Alpha's margin falls from 2.0% to 0.5%, so its return on equity becomes 0.5% times 5.0 times 2.0, or 5.0%, a 75% collapse. Beta's margin falls from 10.0% to 8.5%, so its return on equity becomes 8.5% times 1.0 times 2.0, or 17.0%, only a 15% reduction. A high-margin business has a far thicker pricing cushion to absorb input cost inflation than a high-velocity, thin-margin retailer."
  - id: "d9f6dd3a-a952-4166-a7a7-8f1661c37c90"
    revision: 1
    status: active
    type: single-choice
    prompt: "Apex Apparel grew revenue from $500 million to $600 million. Cost of goods sold rose from 56.0% to 60.0% of sales while selling, general and administrative overhead fell from 32.0% to 26.5%. How did operating margin expand by 150 basis points?"
    options:
      - id: "gross-improved"
        text: "Gross margin rose 4.0 points while SG&A fell 5.5 points, a net gain of 1.5 points"
      - id: "both-improved"
        text: "Both gross margin and SG&A improved, so the operating margin gain came entirely from operating leverage"
      - id: "sga-bridge"
        text: "SG&A fell 5.5 points while gross margin fell 4.0 points, a net gain of 1.5 points"
      - id: "neither-changed"
        text: "Neither line changed materially, so the operating margin gain came from a change in the tax rate or interest expense"
    correctOptionIds: ["sga-bridge"]
    explanation: "Apex's gross margin fell 400 basis points, from 44.0% to 40.0%, as supply chain cost inflation and freight tariffs eroded direct product economics. A 550 basis point squeeze in SG&A, from 32.0% down to 26.5%, more than offset it, so operating margin went from 12.0% to 13.5%. Management protected profitability by consolidating store leases, automating the workforce and spreading fixed administrative cost over a larger revenue base."
  - id: "22554ab7-864f-422f-a4fc-24d03b82ed4c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A commercial bank must extend a 10-year senior term loan to one of two borrowers. Borrower X has a current ratio of 0.85x, a quick ratio of 0.45x, a 32.0% debt ratio, 9.50x interest coverage and a negative 12-day cash conversion cycle. Borrower Y has 2.20x, 1.60x, 84.0%, 1.40x and plus 115 days. Which loan should the bank approve?"
    options:
      - id: "borrower-y"
        text: "Borrower Y, whose 2.20x current ratio and 1.60x quick ratio give it ample short-term liquidity headroom in a downturn"
      - id: "borrower-x"
        text: "Borrower X, whose 32.0% debt ratio, 9.50x interest coverage and negative cash cycle absorb a downturn"
      - id: "x-default"
        text: "Borrower X, because its current ratio of 0.85x is below 1.0 and therefore signals imminent default"
      - id: "y-capitalized"
        text: "Borrower Y, because its 84.0% debt ratio and 115-day cash conversion cycle show a well-capitalized borrower"
    correctOptionIds: ["borrower-x"]
    explanation: "Borrower X collects cash from customers immediately while holding supplier terms, so it runs a negative cash conversion cycle and generates operating cash every day; its 32.0% debt ratio and 9.50x interest coverage give it the strength to survive a downturn. Borrower Y's 2.20x current ratio is an illusion built from slow-moving inventory, and its 84.0% debt ratio with 1.40x interest coverage means a 30% drop in operating income would put it into default."
  - id: "00f95824-f137-4cbf-9daf-5844a524e1d5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about the DuPont framework are correct? Select every correct answer."
    options:
      - id: "pillar-one"
        text: "Pillar 1 is profit margin, which is net income divided by sales"
      - id: "pillar-two"
        text: "Pillar 2 is asset turnover, which is sales divided by total assets"
      - id: "pillar-three"
        text: "Pillar 3 is the equity multiplier, which is total assets divided by equity"
      - id: "invented-at-gm"
        text: "The framework was invented in 1914 at General Motors by Alfred P. Sloan"
    correctOptionIds: ["pillar-one", "pillar-two", "pillar-three"]
    explanation: "Return on equity decomposes exactly into net income over sales, times sales over assets, times assets over equity. The framework was invented in 1914 by financial executive F. Donaldson Brown at the chemical company E.I. du Pont de Nemours and Company, and Alfred Sloan's General Motors work on standard costing and return on invested capital came later, in the 1920s."
  - id: "06c97fc8-288a-4145-a380-141653d0dbb1"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about Walmart and Target are correct? Select every correct answer."
    options:
      - id: "sub-one-ratios"
        text: "Target's current ratio of 0.91x and Walmart's 0.83x both sit below 1.0, which is sustainable when inventory turns fast and suppliers are paid late"
      - id: "debt-ratio"
        text: "Walmart's debt ratio of 64.3% sits slightly above the 50% to 60% benchmark, but its predictable cash flows and scale support the structure"
      - id: "leverage-spread"
        text: "Borrowing at a 4.0% after-tax rate to deploy into assets earning a 7.5% return on assets adds 3.5 points to return on equity"
      - id: "roe-proves-ops"
        text: "Target's 31.18% return on equity proves it runs better operations than Walmart's 18.00%, because the framework measures operating skill"
    correctOptionIds: ["sub-one-ratios", "debt-ratio", "leverage-spread"]
    explanation: "Both retailers run sub-1.0 current ratios on purpose, because they collect cash before paying for the merchandise that generated it. Walmart's 64.3% debt ratio sits just above the healthy band but its scale and predictable cash flows support it, and the 4.0% borrowing rate against a 7.5% return on assets leaves a 3.5 point spread for shareholders. Return on equity does not measure operating skill, since Target's advantage comes from leverage rather than from better operations."
  - id: "ab9c6c3d-2d87-4f49-8d09-77a17150c5fa"
    revision: 1
    status: active
    type: true-false
    prompt: "Target's much higher return on equity than Walmart's is driven mainly by financial leverage rather than by better operating performance."
    answer: true
    explanation: "Decomposed, Target beats Walmart on margin, 3.90% against 2.50%, and loses badly on asset turnover, 1.94x against 2.57x, yet it wins decisively on the equity multiplier, 4.12x against 2.80x. That is the whole gap: Target controls $4.12 of assets for every $1.00 of shareholder equity, so a modestly better operating margin is levered into a far higher headline return. Read the pillars, not the headline."
  - id: "fddf01e6-37f4-4d77-a3aa-4efe0ff2dcc3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Decompose Walmart's and Target's return on equity into the three DuPont pillars and say which pillar actually explains the difference between them."
    sampleAnswer: "Walmart's pillars are a 2.50% net profit margin, a 2.57x asset turnover and a 2.80x equity multiplier, which give a 6.43% return on assets and an 18.00% return on equity. Target's are a 3.90% margin, a 1.94x asset turnover and a 4.12x equity multiplier, giving a 7.57% return on assets and a 31.18% return on equity. Target wins on margin by 1.4 points and loses on turnover, because Walmart turns its assets 32.5% faster. The decisive pillar is leverage: Target controls $4.12 of assets for every $1.00 of equity, borrowing $3.12, against Walmart's $2.80 and $1.80. So the headline gap reports borrowed money, not superior operating skill."
    explanation: "A strong answer must give all three pillars for both companies, the 6.43% against 7.57% return on assets, the 18.00% against 31.18% return on equity, and then state that the equity multiplier, 2.80x against 4.12x, is the pillar that explains the gap."
  - id: "2b3648f9-be7b-49c7-ae32-7840912b0f84"
    revision: 1
    status: active
    type: free-recall
    prompt: "Company Alpha earns a 2.0% net margin on 5.0x asset turnover and Company Beta earns a 10.0% margin on 1.0x turnover, both with a 2.0x equity multiplier and both at 20% return on equity. Work out how each responds to a 150 basis point industry margin shock and say which is more resilient."
    sampleAnswer: "Alpha's margin falls from 2.0% to 0.5%, so its return on equity becomes 0.5% times 5.0 times 2.0, which is 5.0%, a 75% collapse from 20%. Beta's margin falls from 10.0% to 8.5%, so its return on equity becomes 8.5% times 1.0 times 2.0, which is 17.0%, only a 15% reduction. Alpha resembles a wholesale warehouse club or discount grocer earning $2.00 per $100 of sales, and Beta resembles a premium jeweler or luxury house earning $10.00 per $100 with inventory sitting in display cases. Beta is far more resilient, because a high margin carries a thick pricing cushion against input cost inflation."
    explanation: "A strong answer must recompute both returns on equity after the shock, 5.0% for Alpha and 17.0% for Beta, quantify the collapse of 75% against the 15% reduction, and explain that the cushion comes from the starting margin, 2.0% against 10.0%, not from the asset turnover or the shared equity multiplier."
```
