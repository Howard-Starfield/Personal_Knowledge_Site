---
id: "d7931be6-428e-44e7-8833-65ffba86436c"
title: "Chapter 7: Agent Evaluation: Question Bank"
description: "Practice questions for the Agent Evaluation chapter: success metrics, evaluation datasets and verifiers, LLM-as-a-Judge, failure attribution, statistical rigor, and production evaluation infrastructure."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - ai-agents
  - study-guide
  - assessment
  - active-recall
courseId: "e6e1418a-c0a0-4902-a7d4-b4983a207446"
comments: false
---

These questions practise [[courses/ai-agents-in-depth/lessons/07-agent-evaluation|Chapter 7: Agent Evaluation]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "8f4b94e0-6eba-4f98-a551-f4f3e80a8f23"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter gives two different formulas for k runs of the same task. What distinguishes them?"
    options:
      - id: best-of
        text: "Pass@k asks whether at least one of the k runs succeeded, while Pass^k asks whether the best run beat the others"
      - id: at-least-one-vs-all
        text: "Pass@k asks whether at least one of the k runs succeeded, while Pass^k asks whether all k runs succeeded in a row"
      - id: tasks-vs-repeats
        text: "Pass@k is measured across k different tasks, while Pass^k is measured across k repeats of the same task with different prompts"
      - id: estimator-only
        text: "Pass@k is computed directly from the trial count, while Pass^k is meaningless unless the unbiased combinatorial estimator is applied"
    correctOptionIds: [at-least-one-vs-all]
    explanation: "at-least-one-vs-all is correct: with a per-trial success probability p, Pass@k is 1 minus (1 minus p) to the power k, the probability of at least one success, which measures a capability ceiling that a curator or a retry budget could exploit, while Pass^k is p to the power k, the probability of k consecutive successes with no failure or violation, which is business reliability. best-of misreads Pass^k as a comparison between runs, tasks-vs-repeats confuses the two axes, and estimator-only is about how Pass@k is estimated rather than what it measures. Lesson section: evaluation metrics, defining success."
  - id: "396a09d4-62ed-46f6-a2df-edbbc89b58f8"
    revision: 1
    status: active
    type: single-choice
    prompt: "An Agent succeeds on 60 percent of its single runs. What do the two metrics give over five runs?"
    options:
      - id: reversed
        text: "Pass@5 is about 7.8 percent and Pass^5 is about 99.0 percent, because the consecutive measure is the more forgiving of the two"
      - id: both-high
        text: "Both come out at about 99.0 percent, because five chances are enough to cover a failure rate of 40 percent comfortably"
      - id: first-run-only
        text: "Pass@5 comes out at about 92.2 percent and Pass^5 at about 60 percent, because only the first of the five runs counts towards the total"
      - id: order-of-magnitude
        text: "Pass@5 comes out at about 99.0 percent and Pass^5 at about 7.8 percent, a gap of more than an order of magnitude"
    correctOptionIds: [order-of-magnitude]
    explanation: "order-of-magnitude is correct: Pass@5 is 1 minus 0.4 to the fifth, which is about 99.0 percent, while Pass^5 is 0.6 to the fifth, which is about 7.8 percent. The chapter uses the pair to show that the same Agent can look nearly infallible or nearly useless depending on which number is reported, so an evaluation that quotes only the first badly overstates reliability. reversed has the two the wrong way round, both-high ignores the multiplication in the consecutive case, and first-run-only describes neither formula. Lesson section: business reliability, focus on Pass^k."
  - id: "0513e26c-7c2b-4aa9-9633-4aa67de9fcfb"
    revision: 1
    status: active
    type: single-choice
    prompt: "One Agent explores a codebase for vulnerabilities inside a local container; another executes live wire transfers and customer refunds. Which metric should gate each one?"
    options:
      - id: by-reversibility
        text: "Pass@k for the sandboxed explorer, with k set by the retry budget, and Pass^k for the one that moves money, with k set by the operational batch size"
      - id: both-consecutive
        text: "Pass^k for both, because the chapter holds that business reliability is the only metric worth gating a release on"
      - id: both-at-k
        text: "Pass@k for both, because the chapter holds that a capability ceiling is the more informative number for any comparison at all"
      - id: neither
        text: "Neither, because the chapter says only end-to-end regression tasks are a legitimate release gate for a production Agent going live in a real environment"
    correctOptionIds: [by-reversibility]
    explanation: "by-reversibility is correct: the choice follows the reversibility of the action and the blast radius. The sandboxed explorer is exploratory and fully reversible, so finding one valid result in five attempts is a success and Pass@k with k set by the retry budget is the right measure. The one that moves money cannot be rolled back, so a single mistake is a real loss and Pass^k with k set by how many such tasks run back to back in one shift is the right measure. both-consecutive and both-at-k ignore the distinction the chapter draws, and neither overstates the role of regression tasks. Lesson section: evaluation metrics, and the thought question on choosing a metric."
  - id: "f2ab48a5-7a33-4b74-89f3-6ca9dacbba28"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the standard unbiased estimator avoid having to run every k-sample subset separately?"
    options:
      - id: mean-with-ci
        text: "By running k times as many trials as needed and taking the mean success rate across them, with a confidence interval attached to the estimate"
      - id: resample-until-stable
        text: "By reusing a single pool of trajectories and drawing k of them at random until the estimate stops moving between two draws"
      - id: combinatorial
        text: "By sampling n candidates, counting the correct ones, and computing the chance that a random k-subset contains at least one of them"
      - id: fitted-curve
        text: "By fitting a smooth distribution to the per-trial success rate and reading the k-th percentile off the fitted curve instead"
    correctOptionIds: [combinatorial]
    explanation: "combinatorial is correct: the estimator draws n candidates per task, with n of 100 or 200, counts the correct ones as c, and evaluates the hyper-geometric probability that a random k-subset contains no correct sample at all — so it estimates the quantity directly instead of enumerating the subsets. mean-with-ci and resample-until-stable give estimates with the wrong or unbounded variance, and fitted-curve substitutes a model for the measurement. Lesson section: verifiers, and the unbiased estimation of Pass@k."
  - id: "ef8cd851-105a-47ac-a7f1-4a92cc476e9a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which defence against benchmark contamination does the chapter call the most fundamental?"
    options:
      - id: canary
        text: "Embedding canary strings throughout the benchmark, so that a leak into training data can afterwards be detected and attributed to the run that caused it"
      - id: open-generator
        text: "Publishing the parameterized generation mechanism while keeping each concrete instantiation private and verifying the final state"
      - id: licence
        text: "Holding the benchmark data under a restrictive licence, so that only a handful of approved models may run it at all"
      - id: rebuild-yearly
        text: "Rebuilding the benchmark from scratch every year, so that any leaked version is retired rather than reused"
    correctOptionIds: [open-generator]
    explanation: "open-generator is correct: the chapter's argument is that a static question bank has no endgame, because the data only has to leak once, whereas publishing the generation mechanism and keeping the instances ephemeral — parameterized templates instantiated afresh each time, with success checked against the final environment state rather than a fixed answer sequence — means there is nothing stable to memorise. canary only makes contamination detectable after the fact, licence restricts access but does not stop training scrapes, and rebuild-yearly chases the problem rather than ending it. Lesson section: preventing data contamination."
  - id: "e9d5d424-c5f0-4d77-b687-d1bba08c8baa"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does SWE-bench Verified require both a FAIL_TO_PASS and a PASS_TO_PASS test set for every task?"
    options:
      - id: coverage
        text: "Because the two sets are drawn from different repositories, so together they cover more languages and frameworks than one could"
      - id: independence
        text: "Because one set runs the Agent's own tests and the other runs the project's tests, so the two verdicts are independent of each other"
      - id: cost
        text: "Because FAIL_TO_PASS measures how long the fix takes and PASS_TO_PASS measures how much memory it needs, so together they bound the cost"
      - id: fixed-and-no-regression
        text: "Because one proves the reported defect was actually fixed and the other proves the fix did not break anything that used to work"
    correctOptionIds: [fixed-and-no-regression]
    explanation: "fixed-and-no-regression is correct: the chapter splits the single claim that the fix is complete into two propositions — failing before the patch and passing after it, which shows the problem was solved, and passing both before and after, which shows no new defect was introduced. Checking only the first lets an agent satisfy the failing tests by breaking something else. coverage, independence and cost misdescribe what the two sets are for. Lesson section: verifiers, and quality control and long-term maintenance."
  - id: "53121f3a-44bb-4ead-b6c1-cbe2e7c32a62"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pairing of judge bias and mitigation is the one the chapter gives for an LLM used as a judge?"
    options:
      - id: standard-pairings
        text: "Length bias with an explicit penalty on verbosity, position bias with judging each pair in both orders, same-family bias with judges from rival families"
      - id: normalise-and-fix
        text: "Length bias with normalising every score, position bias with fixing the order once per prompt, same-family bias with scoring only the stronger model and ignoring the weaker one"
      - id: drop-and-swap
        text: "Length bias with dropping long answers from the set, position bias with using a different judge, same-family bias with a larger context window"
      - id: truncate-and-average
        text: "Length bias with truncating both answers equally, position bias with averaging over more judges, same-family bias with the same judge used twice"
    correctOptionIds: [standard-pairings]
    explanation: "standard-pairings is correct: the chapter pairs length bias with penalising verbosity in the rubric, capping length and auditing the correlation between score and length; position bias with evaluating every pair twice in swapped order; and same-family self-enhancement with deploying heterogeneous judges from rival model families. normalise-and-fix, drop-and-swap and truncate-and-average each invent mitigations the chapter does not describe. Lesson section: LLM-as-a-Judge, and pairwise comparison and model ranking."
  - id: "d28e7d9c-f0c9-4201-8991-7d6515ccb6e1"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are stages in the evaluation chain the chapter lays out? Select every correct answer."
    options:
      - id: define-success
        text: "Pinning down what counts as success, including the different bases of Pass@k, Best@k and Pass consecutive@k"
      - id: source-tasks
        text: "Deciding where the tasks come from, across public benchmarks, a self-built business set and production feedback"
      - id: verification
        text: "Choosing how verification is done, from deterministic verifiers through checklists and rubric-plus-judge to pairwise comparison"
      - id: persona
        text: "Choosing the Agent's persona and voice, so that the answers read consistently across the whole evaluation set"
    correctOptionIds: [define-success, source-tasks, verification]
    explanation: "define-success, source-tasks and verification are correct: the chapter's chain has four stages — what counts as success, where the tasks come from, how verification is done, and finally how the scores are turned into decisions through statistical significance, failure attribution, regression tasks and model selection. persona is not one of the stages; it is an output of the system being evaluated rather than a link in the chain. Lesson section: chapter summary."
  - id: "bca68050-66c5-4eca-8c3b-6c2735f6e94e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list among the three sources of an evaluation set? Select every correct answer."
    options:
      - id: public-benchmarks
        text: "Public benchmark tasks, which give comparability with published results at the cost of being open to contamination"
      - id: business-set
        text: "A set built from the business's own cases, which matches the work the Agent will actually be asked to do"
      - id: production-feedback
        text: "Feedback harvested from production trajectories, which supplies the cases that nobody thought to write down"
      - id: pretraining-corpus
        text: "The model's own pretraining corpus, sampled to show what the Agent already knows before it is prompted"
    correctOptionIds: [public-benchmarks, business-set, production-feedback]
    explanation: "public-benchmarks, business-set and production-feedback are correct: the chapter's three sources are public benchmarks for comparability, a self-built set from the business's own cases for realism, and production trajectory feedback for coverage of the cases nobody wrote down. pretraining-corpus is not an evaluation source in the chapter's sense, since it measures what the model already contains rather than what the Agent can do. Lesson section: three sources of an evaluation set."
  - id: "29d9cee5-71ec-4eb2-93a5-8e45690cb901"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter says the Bradley-Terry model assumes that preferences are transitive, and that an agent set where one model is accurate but slow, another fast but terse, and a third thorough but expensive can produce rankings that drift with the task distribution. Is that what the chapter says?"
    answer: true
    explanation: "True — that is the chapter's account. Bradley-Terry compresses each model into a single scalar strength, which implies that if A beats B and B beats C then A beats C, but real agents sit on several dimensions at once, so the pairwise results can form intransitive loops and the resulting ratings drift with the mix of tasks that happened to be played. The chapter's mitigation is to rank separately by capability dimension and report the pairwise win-rate matrix instead of one number. Lesson section: pairwise comparison and model ranking."
  - id: "81a2724c-83ca-4be7-a537-d69d9c47eb23"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the evaluation loop the chapter builds, from the environment that provides the test infrastructure all the way round to the next iteration of the system."
    sampleAnswer: "The loop has five moving parts that feed one another. The evaluation environment provides the automated testing infrastructure — the container, the simulators, the tool stubs and the user simulator. The evaluation dataset defines the test cases, drawn from three sources and kept clean by verifiers, stratification and contamination defences. The evaluation methods score the runs, using deterministic verifiers where the outcome can be checked and rubric-plus-judge where it cannot. Benchmark analysis then reveals where the improvement should go, by clustering failures and locating the first error in a trajectory. The improvements that follow feed back into the environment and the dataset, and the next iteration starts again."
    explanation: "A strong answer names each of the five parts in the order the chapter gives them, says that the analysis step is what turns scores into a direction for improvement, and closes the loop by saying the environment and dataset are updated too. An answer that lists the parts without saying what feeds back into what has described a pipeline rather than a loop. Lesson section: chapter summary, and the evaluation system as a closed loop."
  - id: "418c79b0-565e-45b4-9b53-7b9a4afb3dd6"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the distinction the chapter draws between obtaining a piece of information and correctly applying it to the current decision, and say how the trajectory-prefix boundary evaluation set checks the second of the two."
    sampleAnswer: "The two are different capabilities. An Agent can retrieve the right fact and still fail to apply it to the decision in front of it — because it acts on stale context, overrides a current instruction, proceeds without asking for a missing detail, or takes an action the retrieved fact should have blocked. End-to-end regression cannot separate them: a correct ending means both happened, and a wrong ending could be either. The trajectory-prefix boundary set therefore cuts a trajectory at a chosen point and asks what the Agent should do next given everything already in its context, which checks scope judgement, whether a current instruction overrides an earlier one, and whether the Agent confirms before a dangerous action."
    explanation: "A strong answer states the distinction, explains why the end-to-end view cannot separate the two capabilities, and then gives the mechanism of the boundary set — cutting a trajectory at a point and asking what the Agent should do next — together with the specific judgements it checks. An answer that gives only the distinction has not shown how it is measured. Lesson section: end-to-end and trajectory-prefix regression tasks."
```
