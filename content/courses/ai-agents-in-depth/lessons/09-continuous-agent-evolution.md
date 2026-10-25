---
id: "b467273f-2fc2-4824-bd53-25b7b433829e"
title: "Chapter 9: Continuous Agent Evolution"
description: "Transforming runtime experience into capabilities: learning signals, update carriers, candidate validation, canary releases, and rollback."
type: lesson
publish: true
status: active
created: "2026-09-14"
tags:
  - ai-agents
  - continuous-evolution
  - learning-signals
  - canary-deployment
  - self-improvement
courseId: "e6e1418a-c0a0-4902-a7d4-b4983a207446"
lessonOrder: 10
estimatedMinutes: 45
comments: false
---

# Chapter 9: Continuous Agent Evolution

Today’s Agents face a striking capability paradox: they can solve previously unseen complex tasks zero-shot, yet after handling ten thousand similar tasks, they may still repeat tomorrow the mistakes they made on the first day. Once a model is on the job, can it keep getting better at that job the way a new hire does? **The ability to learn autonomously from experience**—what is now called **continual learning**—is becoming essential for Agents to progress from “being able to complete tasks” to “being able to work reliably,” and it is also a central research topic for the next generation of models. Today’s notion of “continual learning” is not the same problem as the earlier line of research on “learn a new task and forget the old one”: forgetting is only one sub-problem, and the harder part is that no one tells the model which parts of today’s experience it got right and which it got wrong. For now, models remain far from capable of continual learning on their own.

A deployed model does not automatically change its parameters after an inference. The in-context learning, state maintenance, and compression discussed in Chapter 2 allow an Agent to adapt **within the current task**; once the context ends, however, these changes do not naturally carry over to the next task. Storing conversations in memory is not equivalent to learning new behavior. Raw trajectories may be lengthy and contain effective strategies alongside accidental successes, incorrect attributions, and untrusted inputs.

An important distinction is easy to miss here: **preserving experience is not the same as learning from it**. Placing a hundred trajectories in a long context or vector store may help the model retrieve a case when needed, but it does not automatically compare cases: which steps recur across successful trajectories, which practices work only with an older interface, or whether a success came from a sound strategy rather than environmental chance. Learning occurs only after the system actively evaluates, compares, generalizes, and validates the evidence—not when a log is written to disk. User memory in Chapter 3 primarily captures “what the user and the world are like”; experience learning in this chapter goes further, capturing “what to do under which conditions.” The former helps an Agent remember more; the latter helps it become more proficient rather than merely more knowledgeable.

Why not let the model train itself directly after every task? Because production environments rarely provide clean learning signals. User satisfaction does not imply compliance; local parameter updates can also cause capability forgetting, policy drift, or safety degradation. If a running model is allowed to modify its own parameters directly based on unverified feedback, erroneous experience and Prompt injection may become entrenched and continue to amplify across later tasks. On the other hand, periodic training of foundation models can improve general capabilities, but it cannot promptly absorb the private rules, tool changes, and local experience encountered daily by each Agent.

Therefore, while models themselves cannot yet learn continually and reliably, “learning” must first be constructed as an autonomous system around the model—what this book calls **continual evolution**, as distinct from continual learning at the level of model weights: record operational evidence, verify outcomes and processes, extract common patterns from multiple trajectories, and then decide whether to update knowledge, instructions, programs, or model parameters. Every modification must first become a candidate version and may alter the next round of operation only after regression testing and safety checks.

The preceding chapters have already introduced the principal components required by this system. Chapter 2 addresses within-task state, Chapter 3 provides knowledge infrastructure, Chapter 5 gives Agents the meta-capability to create tools and modify systems, Chapter 7 establishes evaluation and verification, and Chapter 8 explains how to update model parameters. The task of Chapter 9 is to organize these components into the continual evolution loop shown in Figure 9-1.

![Figure 9-1 Overall loop of continual Agent evolution](images/fig9-1.svg)

Continual evolution must arise from traceable operational experience, change subsequent behavior, and be verified not to cause significant degradation. This chapter first discusses how to determine what exactly went well or wrong in a run; it then compares four update methods and their applicable boundaries; finally, it examines how these updates are verified, released, revised, and retired during long-term operation.

## Deriving Learning Signals from Operational Trajectories

The starting point of continual evolution is the evaluation described in Chapter 7. If the system does not know whether a task was completed or which step caused success or failure, reflections generated by a language model can only be guesses.

Evaluating a trajectory amounts to answering three questions in order: **was the task completed, was it completed in an allowed manner, and was the user well served?** Figure 9-2 organizes them into a three-layer verification structure.

![Figure 9-2 Three-layer trajectory verification from environmental outcomes to an LLM Rubric](images/fig9-2.svg)

**The bottom-layer outcome verifier answers, “Was the task actually completed?”** It reads test results, database states, and tool returns: a Coding Agent can run tests, type checks, and performance benchmarks; an Agent processing a refund for a user can query the order status and actual refund amount. Such signals come from real environmental states and are generally more reliable than the model’s descriptions of its own behavior, which makes this the layer to establish first.

**The middle-layer process verifier answers, “Was it completed in an allowed manner?”** A correct outcome does not imply a correct process: deleting failing test cases can also make tests pass, and telling a user, “We will issue your refund within seven days; please be patient,” may produce temporary satisfaction. This layer checks business rules, permissions, and action sequences, distinguishing an outcome that has been achieved from one achieved by an allowed path. Policy stores, permission tables, and action traces can all be stated precisely, so this layer too can be judged by code.

**The upper-layer quality verifier answers, “Was the user well served?”** Examples include whether customer service was patient, whether it offered compliant alternatives, whether a research report identified the key evidence, and whether the generated text is natural and concise. These dimensions do not decide whether the task was completed, but they do affect the user’s experience. LLM-as-a-Judge, introduced in Chapter 7, can be used here: define a Rubric in advance and require the verifier to score each item and cite trajectory evidence.

For a customer-service Agent, Table 9-1 expands the three layers into seven dimensions that can be scored item by item: task outcome belongs to the outcome layer; rule compliance, privacy boundaries, and promise-action consistency belong to the process layer; expression quality and compliant alternatives belong to the quality layer; factual reliability spans two layers, in that whatever can be matched against tool returns is verified by code while the remainder is judged by the Rubric.

Table 9-1 Trajectory evaluation dimensions for a customer-service Agent

| Dimension                  | Verification question                                                          | Primary evidence                            |
| -------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| Task outcome               | Was the user’s core request resolved?                                          | Final environmental state, tool results     |
| Rule compliance            | Were any policies, permissions, or required procedures violated?               | Policy repository, action trajectory        |
| Privacy boundaries         | Was any information disclosed that should not have been provided?              | Response text, data-access records          |
| Factual reliability        | Are statements supported by knowledge or tool results?                         | Cited sources, tool returns                 |
| Promise–action consistency | Did the actions claimed as completed actually occur?                           | Comparison of responses and tool logs       |
| Expression quality         | Is the language natural and concise, without repetition or templated phrasing? | Full conversation, language Rubric          |
| Compliant alternatives     | When the original plan was infeasible, was an allowed alternative found?       | User goal, policies, and subsequent actions |

**The form of the verifier’s output determines whether it can serve as a learning signal.** A single overall score reflects only how well one run went; it cannot indicate what should be changed. An evaluation that later stages can learn from must contain at least four elements: whether the task succeeded, partially succeeded, or failed; a separate verdict for each dimension; the evidence location behind each verdict (which conversation turn, which tool call); and a failure-type label. The verifier should also be permitted to decline to score when evidence is insufficient. Rather than hardening a low-confidence verdict into a fact, the case should be excluded from the learning set. Only with these four elements can the four update methods discussed in the next section determine whether to update knowledge, the Prompt, a program, or model parameters.

> **Experiment 9-1 ★★: Build a Trajectory Verifier for a Customer-Service Agent**
>
> **Objective:** Convert a customer-service trajectory into a structured diagnosis that can support subsequent learning, and test whether “multidimensional conclusions with evidence” identify root causes better than a single overall score.
>
> **Experiment description:** Compare “one overall score” with “a conclusion, evidence, and confidence for every dimension,” and observe which better distinguishes task failure, rule violations, false promises, and expression problems. Continual evolution cannot rely only on success rate or one score. Only by retaining what went wrong, why, and where the evidence is can later modules determine whether to update knowledge, the Prompt, a program, or model parameters; low-confidence cases should not enter the learning set automatically.

## Four Methods for Continual Agent Evolution

Learning signals indicate that an Agent should change, but not where that change should occur. The primary basis for choosing an update method is not how long an experience has persisted, but whether the target capability can be naturally represented by a particular medium. Facts and experience are suited to knowledge documents; strategies that can be clearly expressed in language belong in Prompts or Skills; precisely executable procedures and constraints should be encoded as programs; and high-dimensional capabilities such as perception, language style, and implicit strategies must enter model parameters. Figure 9-3 shows these four methods and their relationships.

![Figure 9-3 Four update methods for continual evolution](images/fig9-3.svg)

Table 9-2 provides a concise comparison. The four methods are not mutually exclusive: a medical-imaging Agent relies on parameters to identify lesions, uses a knowledge base to provide current guidelines, and employs code to calculate risk indicators. A customer-service model derives its natural tone from post-training, obtains enterprise-specific policies from knowledge and Skills, and relies on server-side code to enforce critical compliance requirements.

Table 9-2 Applicable boundaries of four continual evolution methods

| Update method             | Suitable content                                                        | Primary advantages                              | Primary limitations                                |
| ------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| Experience knowledge base | Facts, experiential patterns, exceptions, and sources                   | Fast updates, traceability, on-demand retrieval | Depends on retrieval and correct model application |
| Prompt and Skill          | Linguistically expressible judgment principles and operating procedures | Interpretable, controllable scope               | Prone to bloat, conflict, or being ignored         |
| Programs and Harness      | Deterministic procedures, tools, and hard constraints                   | Testable, stable execution, low cost            | Higher development and maintenance costs           |
| Model parameters          | High-dimensional perception, generation style, and implicit strategies  | Strong generalization, low inference overhead   | High update and regression costs                   |

A single capability can be split across several carriers: facts go into the knowledge base, the principles that explain exceptions go into a Skill, permissions that must not be bypassed stay gated by the program, and high-dimensional recognition goes into the parameters. The routing result is only an update proposal; it has not yet earned the right to be released.

### Consolidating Experience into Knowledge

The most lightweight form of evolution is to organize recurring experience from multiple runs into retrievable knowledge documents. The “experience knowledge base” described here shares storage, indexing, and retrieval technologies with Chapter 3, but differs in its knowledge sources and verification objectives. Chapter 3 primarily extracts “what the user and the world are like” from user conversations, documents, and datasets; this chapter extracts “what should be done under which conditions” from Agent action trajectories and outcomes. For example, “This airline requires special meals to be reserved twenty-four hours in advance” is domain knowledge, whereas “Check the special-meal deadline before booking to avoid discovering only after payment that the request cannot be fulfilled” is action experience.

Raw trajectories are unsuitable as formal knowledge units. They are lengthy and noisy, containing raw tool output, incidental detours, and environmental details. A more robust system retains three layers of data: immutable raw trajectories for auditing; per-run analyses recording the outcome and candidate lessons; and comparisons, clustering, and induction across multiple similar trajectories to produce future-oriented Markdown knowledge documents. A formal document typically specifies applicable scenarios, recommended strategies, prohibited practices, exceptions, evidence sources, and the latest verification time rather than retelling the complete course of a single task.

This design shares the same two-stage principle as User-as-Code in Chapter 3. User-as-Code first appends conversational facts to an immutable log and then periodically rebuilds a structured user model. Experience learning should likewise preserve evidence first and generate mutable knowledge offline afterward. Figure 9-4 illustrates this process. Separating recording from organization prevents a single accidental success or network failure from immediately changing the Agent, while allowing the system to identify common patterns only after observing multiple successes and failures.

![Figure 9-4 From evaluated trajectories to experience knowledge documents](images/fig9-4.svg)

Experience documents are not simple trajectory summaries. Transferable content emerges from comparison: what successful trajectories of the same type did, what failed trajectories lacked, in which environment versions a strategy was effective, and under which prerequisites it failed. Chapter 3 has already introduced knowledge extraction, clustering, and retrieval, so this chapter does not repeat those algorithms. Instead, it focuses on how trajectory evaluation becomes a condition for extraction and whether the extracted knowledge improves performance on subsequent tasks.

A complete knowledge-distillation pipeline can be divided into five steps. First, preserve immutable trajectories and environmental outcomes. Next, produce a structured analysis for each run, listing the task type, required capabilities, observed strategies, errors, and exceptions. Then aggregate runs by task family and build an evidence table showing which trajectories support or contradict each candidate pattern. Only candidates that meet the support threshold enter formal documents. Finally, evaluate transfer on new tasks that were not used during distillation. Keeping formal knowledge separate from candidate analyses allows the system to generalize again without altering the original evidence and to revoke a conclusion precisely when the environment changes.

GAIA experience learning provides an intuitive example. GAIA[^gaia-2023] contains multistep problems that combine search, web reading, file processing, and computation, while AWorld[^aworld-2025] provides the environment for running Agents, invoking those tools, and recording trajectories: the former is like the exam, and the latter is the exam room and laboratory record system. A simplistic approach generates a strategy summary and immediately vectorizes it after one successful run. A stricter implementation first uses a GAIA answer verifier or another environmental verifier to label runs as successful, partially successful, or failed, and then compares multiple paths within the same task family. Successful trajectories contribute candidate strategies, failures contribute exclusionary knowledge, and partial successes reveal which segment worked and which still failed. The natural-language reflection proposed by Reflexion[^reflexion-2023] can help generate candidate lessons, but reflection itself is not evidence. Only content consistent with environmental outcomes, supported across trajectories, and showing positive transfer on new tasks should enter formal experience documents.

[^reflexion-2023]: Shinn, N., et al. _Reflexion: Language Agents with Verbal Reinforcement Learning._ arXiv:2303.11366, 2023.

[^gaia-2023]: Mialon, G., et al. _GAIA: a benchmark for General AI Assistants._ arXiv:2311.12983, 2023.

[^aworld-2025]: Yu, C., et al. _AWorld: Orchestrating the Training Recipe for Agentic AI._ arXiv:2508.20404, 2025.

### Encoding Experience as Instructions

An experience knowledge base gives an Agent "material it can consult"; Prompts and Skills prescribe "how it should act." Only when many similar trajectories repeatedly expose the same strategic error, and that error can be stated clearly in words, is it worth promoting experience into an instruction. Three concepts should be kept apart here: the **system Prompt** applies to every task, a **Skill** is loaded on demand only when a domain or tool matches, and the **program/Harness** enforces permissions and other hard constraints.

Andrej Karpathy calls this practice **System Prompt Learning**[^karpathy-system-prompt-learning]: after running into a problem, the model leaves one clear sentence to remind its future self. DSPy[^dspy-2023] searches over instructions and examples on a development set; OPRO[^opro-2023] proposes new prompts from a history of prompts and their scores; GEPA[^gepa-2025] generates and filters prompt proposals from natural-language reflections on failed trajectories. These methods suit offline batch optimization; production settings are better served by auditable minimal update proposals with a fast rollback path.

System prompt learning is not the same thing as the prompt engineering of Chapter 2. Chapter 2 discusses how to organize a good Prompt; this section discusses what feedback is sufficient to trigger a change, and how an update proposal is released safely. A change should be a minimal diff with provenance, not a full rewrite of the Prompt on every pass—precisely the minimal-diff-plus-rollback pattern named in Chapter 1. A candidate version must be tested both on the **boundary set that triggered the failure** and on a **retention set that already works**: the former must improve, the latter must not regress.

#### Example 1: Turning the Escalation Boundary into Rules

In the telecom policy of τ²-bench, escalation to a human agent is governed by only two statements of principle: escalate only when the request falls outside the Agent's scope of action, and try your best to resolve the issue before escalating. When Chapter 7 dissected this environment the two lines revealed no problem; run the same environment with a weaker model and the deficiency surfaces at once—after a tool returns an error the Agent retries repeatedly and ends by escalating to a human, which is how 19 of the 20 tasks in the derivation set finished.

Hand those 19 failed trajectories to a model and let it induce, on its own, a handful of executable rules to append to the end of the policy; then rerun on a set of tasks that took no part in the derivation. The pass rate rises from 12.3% to 19.3%, and not one task that had passed before is broken.

**What the deriver is given determines what it can induce.** From the same 19 trajectories, supplying only failure summaries and error text yields "do not keep calling a tool that repeatedly returns the same error"; adding an inventory of which tools belong to the Agent and which to the user turns the result into "network status, SIM card, and APN checks belong to the user's device and should be performed by the user under guidance rather than called directly." The first records a lesson; the second grasps where responsibility lies.

**A model treats observed behavior as the behavior that ought to occur.** Two of the first-version rules read "escalate to a human after three consecutive failed calls" and "escalate to a human if the user does not supply a number after two requests"—escalation is what appears most often in the trajectories, so the model took it for a reasonable fallback. But in this evaluation escalation always counts as failure, so those two rules write failure into the specification. Derived artifacts therefore cannot be released directly; they must pass verification independent of whatever produced them.

**What gets repaired is often something extremely plain.** One typical baseline trajectory: the Agent needs the user's phone number, so it calls the lookup tool with "Please provide your phone number" filled into the parameter—five times in a row, five errors, then escalation. It had already worked out that it should ask the user; it merely addressed the sentence to the tool. Once the rules took effect it first made the request in the conversation, obtained the number, and then queried; later, when an attempt to check SIM card status was refused at the tool layer, it switched to guiding the user through reseating the SIM card, and the task passed.

> **Experiment 9-2 ★★: Deriving Escalation and Tool-Use Rules from τ²-bench Failure Trajectories**
>
> Reuse the τ²-bench telecom environment from Chapter 7. The derivation set and the transfer set are two disjoint task sets in the upstream repository to begin with, so the derivation process never touches the transfer set.
>
> First run the derivation set with a weak model and keep the failed trajectories; have the rules induced by a model rather than written by hand, and append them to the end of the original policy; then compare the original policy against the two evolved versions on the transfer set. Only the policy file differs across the three arms; the user simulator is held fixed.
>
> Besides the pass rate, record three behavioral metrics that correspond directly to the rules: the escalation rate, the number of times the Agent oversteps and calls a user-side tool, and the number of calls issued with a missing parameter. Both of the latter fall by roughly 80% in the evolved versions, which shows that the gain in pass rate comes from rules repairing specific actions.

The same approach transfers to other domains. A typical bad case for an airline customer-service Agent is this: the user objects to a refund fee, a change fee, or a baggage policy, and the Agent calls `transfer_to_human` without looking up the policy, explaining the rule, or seeking a compliant alternative. An ordinary policy dispute needs no escalation; **only an explicit request for a human, or a situation involving safety, makes escalation mandatory**. The diagnosis again points to an escalation boundary that was never made explicit, and the fix is again to turn it into a single minimal rule with a recorded source.

> **Experiment 9-3 ★★: Optimizing an Airline Customer-Service System Prompt from Failure Trajectories**
>
> **Objective:** Have the airline customer-service Agent fix its habit of escalating to a human too early in ordinary policy disputes, while retaining the ability to transfer on an explicit request for a human and on safety incidents.
>
> **Description:** Extract three dimensions from the failure trajectories—rule compliance, task resolution, and compliant workarounds—and generate one minimal Prompt patch with provenance; then compare it against the initial version and a hand-tuned version under identical conditions. An update proposal enters staged rollout only after the boundary cases improve, the old tasks do not regress, and the release gate is passed.
>
> **What it shows:** The point of automatic Prompt optimization is not to let the model freely rewrite a large block of text, but to turn an attributable failure into a local rule with a clear scope that can be rolled back and verified.

#### Example 2: Requirement Clarification Skill—From Direct Execution to Confirm First

Chapter 2 explained how to write a Skill. Here we assume the system already has a first version of a requirement-clarification Skill, and focus on something else: as the Agent keeps receiving user feedback in production, how does it decide automatically whether "when to ask first, what to ask, and when to simply begin" needs updating?

This is a classic procedural problem. A user says "change the login page to support enterprise sign-in." If the Agent starts immediately, it may make choices on the user's behalf—identity provider, fallback path, compatibility with existing users, rollout scope—that the user has not yet considered. If it instead lists a dozen questions regardless of task size, a simple change turns into an interview. **Asking too little causes rework; asking too much causes interruption.** What the Skill needs to express is not "every task must be confirmed" but a scoped decision path.

A first version of the procedure might read: judge the task's ambiguity, risk, and cost of rework; for low-risk, easily reversible small changes, state the assumptions and proceed; when architecture, data, permissions, public interfaces, or wide-reaching changes are involved, ask a small number of questions that would genuinely change the plan; once answered, produce a short Spec or Plan listing goals, non-goals, key trade-offs, assumptions, and acceptance criteria, and hand it to the user for confirmation; execute after confirmation, and pause to re-confirm whenever the original Spec turns out not to hold.

Continual evolution starts from operational evidence. The system should record tasks, clarifying questions, Spec versions, user edits, execution results, and post-delivery rework together. Negative feedback may be "this isn't what I imagined," but it may equally be "you asked too many questions"; positive feedback includes a smooth delivery after a single confirmation, less rework after the user amended the Spec, and low-risk tasks that were not interrupted by superfluous questions. Storing an isolated complaint is not enough to trigger an update: feedback must be tied to a specific trajectory, task type, and outcome.

When many trajectories point repeatedly at the same gap, the Agent can propose a minimal Skill update. For instance, if several tasks touching authentication architecture only discovered after delivery that legacy sign-in had to keep working, a draft rule can require confirming "identity provider, fallback path, and compatibility scope" before execution; conversely, if a large number of typo fixes were each preceded by a round of questions, the draft rule should narrow the trigger to high-risk and highly ambiguous cases.

This procedure must be validated by controlled experiment. One can compare three strategies—"execute directly," "ask first, then execute," and "ask, produce a Spec, confirm, then execute"—stratified by task complexity. The metrics should include at least requirement-deviation rate, post-delivery rework count, number of clarification rounds, time to first useful output, user abandonment rate, the proportion of Specs that were edited, and the error rate on high-risk operations. An update proposal reaches staged rollout only if it reduces requirement deviation without significantly increasing interruption, and passes regression on tasks that were not used to distill it.

This example also illustrates the boundary between Skill and Harness. The Skill understands context and takes the initiative to ask questions, assemble the Spec, and explain trade-offs; the Harness vetoes high-risk writes, direct operations on `main`, or bypassing the release process when confirmation is missing. A veto gate in the Harness cannot decide for the model how a PR should be described, nor choose the requirement design on its behalf. As experience accumulates, stable conversational trajectories can further yield the SFT or RL training data needed in Chapter 8.

> **Experiment 9-4 ★★: Evolving a Requirement-Clarification and Spec-Confirmation Skill from User Feedback**
>
> **Objective:** Test whether the Agent can find a better clarification strategy between "requirement deviation" and "interaction interruption," and write verified improvements back into the Skill.
>
> **Description:** Prepare one set of low-risk, low-ambiguity tasks and one set of high-risk tasks involving architecture, permissions, data, or public interfaces, and compare three procedures: execute directly, ask then execute, and ask then confirm a Spec. Record user answers, Spec edits, delivery outcomes, and rework feedback, and let the Agent generate a Skill update proposal; the proposal must pass regression on held-out tasks, an interruption-cost check, and validation of the high-risk veto gate.
>
> **What it shows:** Continual evolution is not appending every complaint to the Prompt, but identifying the scope from outcomes and feedback, proposing a minimal instruction update, and letting an independent evaluator decide whether to release it.

[^dspy-2023]: Khattab, O., et al. _DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines._ arXiv:2310.03714, 2023.

[^opro-2023]: Yang, C., et al. _Large Language Models as Optimizers._ arXiv:2309.03409, 2023.

[^gepa-2025]: Agrawal, L., et al. _GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning._ arXiv:2507.19457, 2025.

[^karpathy-system-prompt-learning]: Karpathy, A. “We’re missing (at least one) major paradigm for LLM learning … system prompt learning?” X, May 11, 2025. https://x.com/karpathy/status/1921368644069765486

### Encoding Experience as Programs

When experience describes operations that are stable, repetitive, and verifiable, it is inefficient to have the model reread documentation and reason through them each time. A more appropriate approach is to compile the experience into workflows, tools, or Harness code, turning a one-time exploration into a repeatedly executable program. Chapter 5 explained how Coding Agents read and write files, run tests, and generate systems; this section focuses not on general code generation, but on how an Agent modifies future versions of itself based on its own trajectories.

The modifiable objects extend far beyond new tools. At the operation layer, browser trajectories can be compiled into parameterized workflows, or adapters can be generated for changing APIs. At the control layer, tool routing, retries, circuit breakers, and context compression strategies can be modified. At the validation layer, parameter checks, state validators, and regression tests can be added in response to production failures. At the architecture layer, a Reviewer Agent can be added or the information flow between planning and execution can be changed.

Browser workflows illustrate the value of programmatic experience. They are analogous to recording a spreadsheet macro. The first time an email is sent, a multimodal Agent uses an observe–reason–act loop to find the compose, recipient, subject, body, and send controls. For another email, the process is unchanged; only the recipient and content differ, so there is no need to call the model again to rediscover the entire path from pixels and the DOM. The system compiles the first exploratory trajectory into a small program containing parameters, state checks, and version information.

In the browser setting, the knowledge-distillation process shown in Figure 9-4 becomes a more concrete lifecycle:

1. **Capture the trajectory:** Record navigation, clicks, text entry, and drop-down selection, together with action parameters, the current URL, and element-locator evidence such as XPath, CSS, `id`, `role`, `aria-label`, and `data-testid`. Locator evidence only helps find an element again; it does not prove that the task was completed.
2. **Parameterize:** Replace literals from the first run with template variables—for example, convert `test@example.com`, the subject, and the body into `{recipient}`, `{subject}`, and `{content}`—while leaving stable actions unchanged. The teaching implementation uses regular expressions and template replacement; a production system may use structured task input or a constrained extraction model.
3. **Define state checks:** Add checks before and after actions, such as “the send button is visible” and “the URL after navigation belongs to the target site.” Add a final-state check for the workflow as a whole, such as “the sent-mail list contains the new message” or “the test page’s state value changed as expected.” Successfully executing an action is not the same as successfully completing the task; the final check must read the real page or backend state.
4. **Validate the candidate:** A first success produces only a `candidate`. The system must reset the sandbox account or test site to an independent initial state and replay the candidate in full. It can be published as `validated` only if all before-action, after-action, and final-state checks pass. If a side-effecting task such as sending mail or placing an order has no safe reset callback, the workflow may be retained as an auditable candidate but must not be validated by repeating the action in a production account.
5. **Match and replay:** When a new task arrives, search the formal capability library for a workflow by intent and keywords, extract the current parameters, and execute it directly with Playwright. Replay requires no step-by-step LLM calls, but it must still wait for elements to become available and complete every state check.
6. **Invalidate and relearn:** If the target element cannot be found, a state check fails, the API Schema changes, or the final state is wrong, stop subsequent actions immediately, move the old version from the searchable library to the `invalid` area, and fall back to the full Agent for fresh exploration. Retain the old file for audit and comparison, but never let it continue to match silently.

For an email workflow, the compiled result is not merely “click these buttons in order,” but a small program parameterized by recipient, subject, and body: it checks the compose window and fields before sending, checks the success indicator afterward, and finally confirms that the corresponding message appears in the sent list. In PreAct[^preact], such programs delivered an 8.5–13× end-to-end speedup on repeated tasks and required no step-by-step language-model calls during replay. More importantly, process memory needs **before-action validation, after-action validation, and independent pre-storage validation**. Otherwise, the system can produce a dangerous illusion: replay coverage is 100 percent and every button was clicked, yet one field was empty and the task was never actually completed.

> **Experiment 9-5 ★★★: Generating Verifiable Workflows from Browser Trajectories**
>
> **Objective:** Determine whether a web Agent can turn one expensive exploration into a reusable workflow and reject an incorrect replay when the page changes, rather than reporting success merely because every action ran.
>
> **Four-stage scenario:** In the first stage, run “send a message with the subject ‘Test Email’ to `test@example.com`” on a test mail site or simulated messaging page. The full Agent explores, while a wrapper captures actions, parameters, and page states and produces a `candidate`. In the second stage, call `validation_reset` to restore the sandbox and independently replay the entire workflow; the candidate enters the formal capability library only if all before-action, after-action, and final-state checks pass. In the third stage, perform the same kind of task with a different recipient, subject, and body. The system should match the validated workflow, fill the new parameters, and replay it through Playwright without entering the step-by-step LLM loop. In the fourth stage, change a button locator, page text, or final state and verify that the old workflow immediately becomes `invalid` and returns `fallback_required=True`.
>
> **Control design:** A simplified baseline records only whether clicks, text entry, and other actions complete without exceptions. The experimental condition also validates the page before each action, the page after each action, and the final task state. Both conditions use the same trajectories and page changes. Compare their false-positive rates on cases such as “the send button was clicked while a field was empty” and “Save was clicked but the data was not persisted.”
>
> **Metrics and acceptance:** Record end-to-end time for initial exploration and replay, number of LLM calls, success rate, false-success rate, workflow match rate, page-change detection rate, and number of fallbacks to relearning. Without a reset callback, a workflow must remain a candidate; a version that fails validation must not be retrievable; parameterized replay must not reuse the first run’s recipient or content; and after a page change, dangerous subsequent actions must stop. Acceleration matters only if all these conditions are satisfied.
>
> The accompanying implementation is available at [`browser-use-rpa`](https://github.com/bojieli/ai-agent-book/tree/main/chapter9/browser-use-rpa), which provides both a deterministic state-machine demonstration and an execution path that invokes a real browser Agent.

An Agent modifying its own code does not mean that the running process directly overwrites itself. A production system should create a candidate branch from the current stable version, have a Coding Agent generate a minimal patch, and then sequentially run static checks, unit tests, security scans, failure-trajectory replay, and regression tests on old tasks before producing a new version eligible for canary deployment. This turns “self-modification” into an auditable software release process and defines the boundary between Chapters 9 and 5: Chapter 5 provides the capability to modify systems, while this chapter provides a method for self-modification that is triggered by experience and constrained by a validation loop.

Making the patch small is not enough for reliable attribution. Each modification request should also be a **falsifiable change contract** that records the failure evidence, inferred root cause, responsible Harness component, candidate change, behavior expected to improve, existing behavior that may regress, and tests for both. Agentic Harness Engineering describes this in terms of component-, experience-, and decision-level observability: every editable component has a file-level representation; large collections of trajectories are distilled into evidence that can be inspected at increasing levels of detail; and every edit declares an impact prediction before execution, which the next round of results then tests[^ahe-2026]. A higher score can then be connected to a specific mechanism rather than remaining an uninterpretable trial.

The candidate generator should not receive only failed cases. Self-Harness also supplies successful behavior that must be preserved and records of previously rejected modifications[^self-harness-2026]. The former tells the Agent what the repair must not break; the latter prevents it from resubmitting the same failed idea in different words. Failure evidence, success constraints, and prior attempts together define a bounded candidate space and are more useful than indiscriminately loading all source code and raw logs into the modifying Agent.

Tool creation follows the same protocol. Alita[^alita-2025] presents a case in which an Agent must identify the number mentioned immediately after dinosaurs first appear in a YouTube 360 VR video narrated by the voice actor for Gollum in _The Lord of the Rings_. After recognizing that it lacks subtitle-reading capability, the Agent finds and tests `youtube-transcript-api`, wraps it as a new subtitle tool, and extracts the answer `100000000` from the transcript. A new tool enters the capability library only after safety scanning, functional tests, and successful reuse on later tasks. Chapter 4’s proactive tool discovery asks which existing tool fits; Chapter 5 asks how to write a tool; this chapter asks what operational evidence should trigger creation and how a new tool becomes a validated long-term capability.

> **Experiment 9-6 ★★★: Triggering Agent Self-Modification from Failure Trajectories**
>
> **Objective:** Given multiple trajectories in which errors marked `retryable=false` are still called repeatedly, determine whether the system can locate the root cause in retry and circuit-breaker code and produce a candidate fix without breaking recovery from transient failures.
>
> **Procedure:** The diagnosis module first aggregates the same fault across different tasks. It creates a modification request only after the cross-trajectory support threshold is met and targets `retry_policy.py` in the stable version. The candidate generator reads the failure diagnosis, the transient-failure recovery behavior that must be preserved, previously rejected changes, and the stable source. Before emitting a minimal code diff, it predicts that calls after non-retryable errors should fall while transient-timeout recovery should not. Whether the generator is deterministic or a real LLM Coding Agent, it may write only to an isolated candidate directory. The validation Harness then compiles the candidate, replays the original failure trajectories, verifies that a non-retryable error stops immediately and opens the circuit breaker, and retests that transient timeouts still retry according to the original threshold.
>
> **Diagnostic control and metrics:** Treat “add one sentence to the Prompt telling the Agent not to repeat the call” as a conceptual example of choosing the wrong modification layer, demonstrating why a deterministically enforceable retry constraint belongs in code. The executable experiment compares deterministic and LLM patch generators under the same release gate. Record the number of calls after non-retryable errors, transient-error recovery rate, regressions on old tasks, patch size, and candidate acceptance rate.
>
> **Acceptance criteria:** Passing every check produces only `release_to_canary`. Failure of any static check, failure replay, or old-task regression returns `reject_candidate`. `release_manifest.json` must record the failure cluster, source trajectories, inferred root cause, target component and file, code diff, expected repair, possible regressions, check results, candidate version, and rollback version. Rejected candidates must retain their failure reasons for the next generation round. The patch-generating Agent must not modify stable code, validators, audit logs, or the gate that approves its own release.
>
> The accompanying implementation is available at [`self-modifying-agent`](https://github.com/bojieli/ai-agent-book/tree/main/chapter9/self-modifying-agent). It supports either a deterministic candidate generator or a real LLM Coding Agent, with both paths sharing the same release gate.

Experiment 9-7 applies the same protocol to the verification layer. Only repeated user corrections, downvotes, and audits pointing to an unconfirmed high-risk operation create a change request; the candidate is written to an isolated directory. Classify dangerous deletions and `git push --force` from tool names and arguments, and bind a one-time confirmation token to the concrete operation. A candidate must pass AST/static checks, boundary replay (including forged and reused tokens), and holdout replay before canary release.

> **Experiment 9-7 ★★: A User-Feedback-Triggered Confirmation Gate for High-Risk Operations**
>
> Use the three signal types and control trajectories in `failure_trajectories.json`. The real `gpt-4o-mini` candidate failed unfinished-task replay, normal-operation replay, and one-time-token checks, so the safety gate rejected it. The deterministic candidate passed all checks and received `release_to_canary`; record checks, the release decision, and the stable-directory hash. Implementation: [`harness-safety-gate`](https://github.com/bojieli/ai-agent-book/tree/main/chapter9/harness-safety-gate).

[^preact]: Li, Bojie. _PreAct: Computer-Using Agents that Get Faster on Repeated Tasks._ arXiv:2606.17929, 2026.

[^alita-2025]: Qiu, J., et al. _Alita: Generalist Agent Enabling Scalable Agentic Reasoning with Minimal Predefinition and Maximal Self-Evolution._ arXiv:2505.20286, 2025.

#### Case: DeepSeek Harness—Self-Evolution Where Everything Is a Plugin

Chapter 1's comparison table classifies DeepSeek Harness (`dsh`) as an “Agent self-evolution framework”[^dsh-2026]. Its foundation paper, Cordis, observes that conventional composition is **static**: function calls, module imports, and class inheritance are fixed at compile time and do not change at runtime. Plugin systems and self-evolving Harnesses instead require **dynamic composition**, with components loaded, unloaded, and reconfigured while running[^cordis-2026]. Every Agent self-modification is, in essence, a dynamic composition.

The paper separates dynamic composition into two orthogonal dimensions. **Temporal composability** asks whether all changes a component made to the shared environment can be undone completely and safely when it is removed; the runtime must track every resource allocation, event registration, and state change. **Spatial composability** asks whether components can declare, discover, and resolve dependencies in a structured, verifiable way and coordinate their lifecycles when those dependencies change. The former concerns **what changed**; the latter, **what is depended on**.

A self-evolving Harness is the sharpest version of this problem. The side effects to undo are long-lived and stateful, while dependencies can appear, disappear, or change identity at runtime. Without temporal composability, every self-modification requires a full restart, discarding accumulated in-process state and repeatedly interrupting active tasks. Without spatial composability, each module must improvise its own detection of dependency changes, and a simple code replacement can silently break dependents or introduce a cycle.

Cordis lifts two concepts normally confined to compile time into the runtime. Effect systems, originally used to reason about how computation changes its environment, become **reversible effects**: every context transformation carries an explicit inverse tracked by the runtime, so removing a component restores the context. Coeffect systems, originally used to reason about what a computation requires from its environment, become **reactive coeffects**: a component declares its dependencies as a specification, and every context change tells it whether to activate, deactivate, or remain unaffected. A dynamic-composition calculus extends this property from one component to interleaved component systems—composability must be transitive.

**The ceiling of self-evolution depends not on how well the model writes code, but on how composable its host system is.** That is why `dsh` makes model adapters, tool registries, session logs, and even the Agent's main loop plugins: **there is no privileged kernel maintainable only by humans**.

Composability answers whether a component can be installed and removed safely, not whether it should be installed. Model-written plugins live only in process memory and disappear on restart. They **cannot be promoted automatically to official plugins**; persistence requires the slower worktree-plus-Pull-Request route described earlier.

Evolution also has a cost. A runtime plugin changes the tools and Prompt fragments visible to the model. Once the request prefix changes, the KV Cache discussed in Chapter 2 is invalid from that point onward. A `dsh` plugin's documentation therefore needs to describe its impact on context and KV Cache.

[^dsh-2026]: DeepSeek AI, _DeepSeek Harness: Everything is a Plugin_, 2026. https://github.com/deepseek-ai/deepseek-harness. Plugin layers and patching are documented in `docs/architecture.md`; lifecycle, sandbox semantics, and trust declarations for model self-modification tools appear in `docs/subsystems/extensions.md` and `packages/extensions/README.md`. Released in August 2026, the project was in developer preview at the time discussed here.

[^cordis-2026]: Shi, Yifan, Wei Zhang, and Tianyi Cui. _A Programming Paradigm for Spatiotemporal Composability._ Preprint draft, 13 August 2026. https://github.com/cordiverse/paper

### Encoding Experience in Parameters

Knowledge, instructions, and programs all rest on one premise: the target capability can be expressed relatively completely through external symbols. Yet capabilities such as medical-image understanding, natural speech prosody, removing a formulaic “AI feel” from text, and long-horizon planning are difficult to compress into a few rules or workflows. Such capabilities must be written into model parameters through post-training.

Whether a capability should be parameterized is not determined solely by whether the task is stable over the long term. Domain shifts caused by new imaging equipment may still require LoRA or continual fine-tuning; rapidly changing linguistic styles can also be accommodated through periodic preference training. Stability affects update frequency and cost, but the representational nature of the capability determines its primary medium. Conversely, a long-stable rule for approving transfers should not rely solely on parametric memory; server-side code must still provide deterministic guarantees.

Chapter 8 provided a complete discussion of SFT, distillation, and RL, so this section does not repeat it. For continual evolution, the key is to transform evaluated production trajectories into training data: high-quality demonstrations can be used for SFT, explicit preferences can form paired data, and interactions with reliable environmental rewards can be used for RL. Before training, private information must still be removed, erroneous trajectories filtered out, and an independent regression set retained. After training, the system must check whether general capabilities or safety alignment have been forgotten.

### From Updating Artifacts to Updating the “Update Method”

The preceding four methods ask **where experience is written**, but continual evolution has another, orthogonal axis: is the system optimizing the contents of an artifact, or the method used to produce, manage, and validate artifacts? Along this axis, the optimization target can expand from **an individual rule or memory → structured context → workflow → Harness code → optimizer code that generates candidate solutions**[^weng-harness-2026]. These are not five new update carriers but five search scales; knowledge, Prompts, Skills, and programs may appear at several of them.

The innermost level changes only artifact content—for example, adding a local rule to a system Prompt after a failed trajectory or adding an exception to an experience document. Such changes have a small blast radius and are easier to attribute and roll back, so they should be the default. Repeatedly asking a model to rewrite an entire Prompt or memory, however, introduces another form of degradation: successive attempts at brevity can gradually erase rare but important details, and interacting constraints can be collapsed into an overgeneral principle. Agentic Context Engineering (ACE) maintains context as a collection of entries with stable identifiers. Generation, reflection, and curation modules propose incremental updates, which deterministic logic merges and deduplicates instead of rewriting an ever-shorter text block each round[^ace-2026]. It is a concrete research example of this chapter's earlier principles of minimal diffs and retained provenance.

At the next level, the optimization target is no longer merely what context contains but how context is constructed. Meta Context Engineering (MCE) separates the two into inner and outer loops: the inner loop optimizes the context artifact for the current task under a given management method, while the outer loop uses results from multiple executions and validations to modify the context operations themselves—search, selection, filtering, and formatting[^mce-2026]. The distinction matters. Editing a retrieval rule changes a content-management mechanism; comparing several retrieval and curation mechanisms and retaining the one with better transfer is learning how to manage context.

The same idea extends to workflows and the entire Harness. AFlow represents workflows composed of multiple LLM calls as code graphs and searches over combinations of nodes and control flow using execution feedback[^aflow-2025]. Meta-Harness has a Coding Agent inspect candidate Harness source, scores, and trajectories to search the code that determines how information is stored, retrieved, and presented[^meta-harness-2026]. Chapter 5 established code as a general language for expressing Agent system structure. The additional point here is that code, together with its evaluation history, can itself become the object of continual search rather than a one-time output.

> **Experiment 9-8 ★★★: Give Hermes This Book: Can It Upgrade Itself?**
>
> **Objective:** Test whether an Agent can turn external knowledge into an update to its own capabilities. The experiment supplies no problem statement and no feature checklist. Hermes receives all ten chapters and its own source, then must understand the principles, inspect its implementation, and choose a worthwhile improvement itself.
>
> **Design:** The book and source are readable context, while the stable version, independent Reviewer, and acceptance tests remain outside Hermes' editable scope. Hermes must complete **read → compare → choose → change → verify**. If a candidate is rejected, the review becomes input to the next learning round; Hermes cannot bypass the gate and declare success.
>
> **Real run:** After reading the book, Hermes independently noticed that its saved trajectories lacked structured evidence that later learning could use directly. It chose to turn execution outcomes into conservative learning signals, then edited its own source and added tests. The first three independent reviews found mismatches with real data formats, persistence paths, and counting semantics. Each finding went back to the original Hermes session for another correction; the fourth review accepted the candidate. Rejection was not the end of the experiment, but part of the improvement loop.
>
> **Claim boundary:** This run shows that an Agent can extract principles from long-form knowledge, map them onto its own code, and complete a self-update under external verification. It does not show that the update already improves downstream task success; that requires a separate ablation experiment. Reader Grace contributed the experiment idea.

## Building a Continual-Evolution Closed Loop for Long-Term Operation

The four update methods become continual evolution rather than one-off optimization only when incorporated into the same autonomous loop. Figure 9-5 shows a more robust dual-loop architecture for production systems: the online execution loop only completes tasks and records evidence, without directly rewriting the production Agent; the offline evolution loop aggregates trajectories, diagnoses root causes, generates candidate modifications, and releases new versions only after they pass validation gates. The two loops are connected through versioned experience repositories and evaluation sets.

![Figure 9-5 Dual loops for online execution and offline evolution](images/fig9-5.svg)

Voyager[^voyager-2023] demonstrates a relatively complete continual-evolution loop. In Minecraft, it selects new goals based on its current capabilities, iteratively refines programs using environmental feedback, stores successfully validated code in a skill library, and then combines existing skills to solve harder tasks. An automatic curriculum, executable skills, and environmental validation are all indispensable: with a skill library but no curriculum, the Agent does not know what to learn next; with self-reflection but no environmental validation, the skill library accumulates errors; with exploration but no persistence, every task must still begin from scratch. Although the knowledge, Prompt, tools, and parameters of real-world Agents are more complex, the basic learning process is similar.

More specifically, Voyager has three interlocking mechanisms. The **automatic curriculum generator** proposes a suitably challenging next goal from current inventory, environment, and acquired skills, preventing random wandering. The **skill library** stores successful programs as retrievable, composable code—for example, an advanced gathering skill can invoke basic movement and crafting skills. The **iterative prompting mechanism** returns environmental observations, execution errors, and self-verification results to the next round of code generation until the task actually passes.

**Discovery loop: hypothesis, experiment, evaluation, feedback.** Agent self-evolution systems such as Voyager follow a discovery loop made of hypothesis, experiment, evaluation, and feedback—the scientific method refined over centuries. Discovery Loop, founded recently by Jeff Dean and colleagues, proposes automating that loop: propose an experiment, implement it, evaluate it, take the result, and feed it into the next round[^ch1-discovery-loop]. This is self-evolving Agents applied to science. To avoid self-confirming stories and self-awarded success, the evolution described in this chapter must follow the scientific method.

[^ch1-discovery-loop]: Discovery Loop was announced on 5 August 2026 by Jeff Dean, Sanjay Ghemawat, Quoc Le, and Oriol Vinyals as a public-benefit corporation. Its public description is to automate complete experimental loops and parallelize at scale experiments that previously ran serially.

In continual Agent evolution, two capabilities that are often conflated must be separated. **Harness updating** produces valuable persistent changes from trajectories; **Harness benefit** is the task Agent's ability to find, activate, and correctly use those changes later. A Skill may be perfectly written, yet a weaker task model may fail to load it in the right situation or to follow it over a long horizon, making the final score look as if nothing evolved. End-to-end score alone therefore cannot diagnose the updater. Model-swap experiments by Lin et al. show that these abilities relate differently to base-model capability[^harness-benefit-2026].

Table 9-3 Layered evaluation metrics for continual evolution

| Metric                    | Question answered                                                                         | Primary evidence                                   |
| ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Candidate-change validity | Does the updater propose useful changes?                                                  | Acceptance rate and gain in independent validation |
| Artifact activation rate  | Does the task Agent load the new Skill, memory, or tool in the right situation?           | Retrieval, routing, and tool-call traces           |
| Successful adherence rate | After activation, does the Agent follow the new rule or process?                          | Action sequences and process verifiers             |
| Retention-set gain        | Does the overall system improve on tasks excluded from evolution, and does it generalize? | Retention-set success rate, quality, and cost      |

Evaluation is not an examination performed after learning ends, but an indispensable part of self-evolution. Long-term evaluation should observe at least five types of outcomes simultaneously:

- Regression, namely whether new experience conflicts with other existing experience and whether previously successful cases begin to fail;
- Generalization, namely the improvements produced by new experience in scenarios not yet covered by the test set;
- Token efficiency, namely the token cost of completing tasks;
- Safety, namely whether rules, privacy protections, and refusal boundaries drift during evolution;
- Long-term engineering quality, namely whether maintenance complexity, architectural consistency, ownership boundaries, backward compatibility, and future migration and debugging costs deteriorate.

Fixing only the current failed case while degrading performance on other existing cases or in new domains does not constitute successful continual evolution.

> **Experiment 9-9 ★★★: Evaluating Whether an Agent Is Continually Evolving**
>
> **Objective:** Distinguish among three long-term behaviors—saving one piece of feedback, merely appending forever, and genuinely updating, transferring, and retaining capabilities—so that repeatedly running the same tasks is not mistaken for continual evolution.
>
> **Four-stage task stream:** The learning stage presents refund, identity-verification, and baggage-policy tasks that share latent patterns. The transfer stage changes the phrasing, user, and local environment to test whether old experience applies to new tasks. The rule-change stage updates the baggage limit from 20 kg to 23 kg and requires the system to replace or retire obsolete knowledge. The retention stage retests unchanged capabilities and currently valid rules to measure forgetting. External memory may be updated only after each feedback-bearing task ends; the expected action for the current task must never be leaked to the Agent in advance.
>
> **Control groups:** `static` persists no feedback. `append_only` remembers the first version of a rule but cannot resolve conflicts or retire it. `evolving` stores versions and replaces old rules with new evidence. The reference implementation verifies that the evaluation Harness can distinguish these behaviors. A real experiment can put an LLM through the same ordered stream of 14 tasks, but outcomes must be computed by a Harness outside the model.
>
> **Metrics and acceptance:** Report accuracy and the learning curve for each stage, and separately calculate transfer accuracy, tasks needed to recover after a new rule, old-capability retention, negative-transfer rate, safety-Rubric pass rate, and Token, latency, and storage costs. For real systems that update Prompts, Skills, or a Harness, also record candidate-change validity, artifact activation rate, and successful adherence rate, so that “the update was correct but never loaded” is not misclassified as a failed update. Even an Agent with high final accuracy does not qualify as continually evolving if it still cites retired rules, succeeds through unsafe shortcuts, or forgets existing capabilities after an update.
>
> The accompanying implementation is available at [`self-evolution-eval`](https://github.com/bojieli/ai-agent-book/tree/main/chapter9/self-evolution-eval). By default, it compares three reference Agents: updatable, append-only, and static. Use `--profile llm` to have a real LLM undergo the same long-term task stream.

### The Boundary of a Verifiable Loop: When “Done” Does Not Mean “Progress”

The preceding loop works most naturally for Coding, tool use, and business-state changes, where tests, environment state, or deterministic rules can provide rapid feedback. Open-ended research, strategic planning, and complex product design are different: feedback is delayed, there may be no unique correct answer, and the objectives that matter most—research taste, long-term value, and maintainability—are difficult to turn into an immediate score. A Harness can then execute the process flawlessly while merely producing things that look like results rather than advancing the real objective.

Autonomous research is a useful stress test. Trehan and Chopra documented four end-to-end attempts to turn research ideas into papers. Three failed during implementation or evaluation, and only one completed the full pipeline[^llm-scientists-2026]. The failures fall into three groups. First, **implementation drift**: once the proposed method becomes difficult, the Agent retreats toward a familiar implementation from its training distribution that no longer tests the original hypothesis. Second, **epistemic over-optimism**: while the signal may still be noise, the system begins explaining it, patching the method, and announcing a finding, while failures and negative results are more easily ignored. Third, **missing tacit judgment**: an Agent may be able to run experiments without knowing which baseline matters, which anomaly deserves investigation, or when a hypothesis should be abandoned.

These tasks require changes to the evidence and supervision structure, not merely a model that writes better papers:

- **Separate claims from evidence:** Record provenance separately for citations, numbers, methods, and conclusions; the final document is only one rendering of the evidence graph. ScientistOne's Chain-of-Evidence design links each class of claim to auditable sources. This improves traceability but does not by itself make the research question valuable[^scientistone-2026].
- **Retain negative results:** Write failed experiments, rejected candidates, and stopping reasons to an immutable log with the same retrieval status as successes. Otherwise the evolution module sees only survivors, revisits disproved paths, and learns to interpret ambiguous results as success.
- **Preserve search diversity:** Open-ended search should not retain only the currently highest-scoring chain. The candidate pool should also preserve some lower-scoring but meaningfully different branches by mechanism, code novelty, or hypothesis type, so that every solution does not converge on the same easy-to-score template.
- **Move human involvement upward:** Human input is not limited to approving dangerous tool calls. It also includes defining problems, reviewing evaluation criteria, interpreting anomalous results, and deciding when to stop. With ambiguous feedback, these high-level judgments are harder to automate—and more valuable—than taking over individual execution steps.

### Safety Boundaries for Continual Evolution

An Agent’s self-evolution capability can turn a single error into a long-term risk. **If Prompt injection in web pages, email, or tool output is summarized as experience**, it may take effect repeatedly across sessions. If a malicious package found through automated search is wrapped as a tool, its impact can spread from one sandbox run to every subsequent task. A defective verifier may also continue approving candidates that appear to improve but actually regress. An Agent self-evolution system must therefore ask not only whether a candidate is stronger, but also who may modify what and what evidence justifies the change.

The first boundary is **separating evidence from instructions**. Raw web pages, tool output, and any LLM summaries of them are untrusted evidence: they must not be executed as instructions or promoted directly into a Skill or similar long-term capability. LLM summarization is a transformation for readability and processing, not a sanitization step that makes the input harmless. The system should extract claims, source locations, and collection times into a fixed schema while preserving the raw content and provenance; extracted strings must never be executed as instructions. Model-produced confidence is likewise an unverified estimate, not an approval gate. Candidates must also pass deterministic schema, allowlist, and provenance checks before being submitted as version-controlled pull requests. A reviewer independent of the generator should compare the change with the original evidence, with human approval added for high-risk Skill promotion.

The second boundary is **separating candidate capabilities from production capabilities**. New knowledge, Prompts, Skills, programs, and parameters first enter a candidate area that cannot serve real traffic. Newly generated code and external dependencies must also pass security checks such as sandbox execution, permission review, supply-chain scanning, and behavioral testing. Only after security checks and regression tests pass may a candidate serve real traffic as a production capability.

The third boundary is that **safety mechanisms must not be self-modifiable**. A business Agent may modify Prompts, Skills, the knowledge base, and tools, but it must not modify the validators, test cases, release thresholds, audit logs, or stable-version backups that approve its own updates. Otherwise, an Agent can disguise regression as progress simply by lowering a test threshold or deleting failing cases.

### Sleep Learning: Consolidation, Forgetting, and Capability Maintenance

“Sleep learning” is a cognitive analogy for offline consolidation; it does not require the process to run literally at night. The online Agent’s primary responsibility is to complete the current task and append immutable evidence. A background learning process reads a batch of new experience during idle periods or when gating conditions are met, compares old and new conclusions, merges duplicates, resolves conflicts, proposes candidate updates, and runs regressions. Separating collection from organization prevents an accidental success, network failure, or malicious input from immediately rewriting long-term capabilities, and it allows consolidation to use larger batches and cheaper models.

A typical sleep-learning cycle has five steps:

1. **Trigger:** Reach a threshold for elapsed time, number of new trajectories, storage use, or error frequency, while confirming that no high-priority online task is running.
2. **Orient:** Read the production knowledge, Prompt, and Skill directories and their versions to understand existing capabilities and immutable boundaries.
3. **Collect and consolidate:** Find new signals in recently evaluated trajectories, merge duplicates, mark conflicts and applicability conditions, and prefer local patches.
4. **Validate and approve:** Evaluate candidates on transfer, retention, and safety sets; high-risk writes wait for human approval.
5. **Prune and index:** Update retrieval indexes and mark capabilities that are long unused or contradicted by new evidence as expired, archived, or deleted, while retaining provenance and rollback versions.

User memory is the most intuitive example, but it must be distinguished from action experience. Claude Code’s auto memory maintains a `MEMORY.md` index and topic-specific detail files for each project. At session startup it loads only a bounded prefix of the index and reads the remaining content on demand; when the index approaches its limit, the Agent is instructed to merge or move details elsewhere. This shows that even plain-text memory requires capacity limits, layered loading, and active organization. The currently documented mechanism primarily writes memory during sessions and should not simply be equated with a fixed nightly background task[^claude-code-memory].

Hermes provides a more complete example of background memory evolution. It separates long-term information into bounded `MEMORY.md` and `USER.md` files, SQLite/FTS5 search over prior sessions, on-demand Skills, and optional external memory providers such as Honcho. Session search returns original messages rather than first summarizing them with an LLM, keeping retrieval distinct from generation and auditable. When a task contains many tool calls, recovers from an error or dead end, receives a user correction, or discovers a non-obvious workflow, a background review can create or locally revise a Skill; memory and Skill writes can also pass through an approval gate. A separate Curator tracks Skill usage, staleness, and archival status, performs deterministic pruning while idle, and may optionally invoke an LLM to merge content. It snapshots changes first so that incorrect consolidation can be rolled back[^hermes-memory].

Continual evolution does not mean allowing knowledge, Prompts, and tools to grow without limit. The context corruption discussed in Chapter 2 reappears over longer timescales: experience documents conflict with one another, Prompts become overwhelmed by boundary rules, Skill libraries accumulate duplicate capabilities, and repeated fine-tuning causes catastrophic forgetting. The system therefore requires periodic offline consolidation:

- Merge duplicate experience while retaining provenance and version information;
- Move local rules from the global Prompt into domain-specific Skills to keep the global Prompt clean;
- Keep Prompts and Skills clearly structured, like a handbook for new employees, and avoid enumerations resembling “99 ironclad rules.”
- Revalidate tools that have not been used for a long time;
- Delete knowledge invalidated by new evidence;
- Retrain LoRA from the original base model. The reasoning is the same as for the data layer in Chapter 1: a real guarantee must come from a layer the modifier cannot reach.

[^claude-code-memory]: Anthropic, “How Claude remembers your project”, 2026. https://code.claude.com/docs/en/memory

[^hermes-memory]: Nous Research, _Hermes Agent Documentation: Persistent Memory, Skills System, and Curator_, 2026. https://hermes-agent.nousresearch.com/docs/user-guide/features/memory ; https://hermes-agent.nousresearch.com/docs/user-guide/features/skills ; https://hermes-agent.nousresearch.com/docs/user-guide/features/curator

[^voyager-2023]: Wang, G., et al. _Voyager: An Open-Ended Embodied Agent with Large Language Models._ arXiv:2305.16291, 2023.

[^weng-harness-2026]: Weng, Lilian. “Harness Engineering for Self-Improvement.” _Lil’Log_, 2026. https://lilianweng.github.io/posts/2026-07-04-harness/

[^ace-2026]: Zhang, Qizheng, et al. _Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models._ ICLR 2026. arXiv:2510.04618.

[^mce-2026]: Ye, Haoran, et al. _Meta Context Engineering via Agentic Skill Evolution._ arXiv:2601.21557, 2026.

[^aflow-2025]: Zhang, Jiayi, et al. _AFlow: Automating Agentic Workflow Generation._ ICLR 2025. arXiv:2410.10762.

[^meta-harness-2026]: Lee, Yoonho, et al. _Meta-Harness: End-to-End Optimization of Model Harnesses._ arXiv:2603.28052, 2026.

[^ahe-2026]: Lin, Jiahang, et al. _Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses._ arXiv:2604.25850, 2026.

[^self-harness-2026]: Zhang, Hangfan, et al. _Self-Harness: Harnesses That Improve Themselves._ arXiv:2606.09498, 2026.

[^harness-benefit-2026]: Lin, Minhua, et al. _Harness Updating Is Not Harness Benefit: Disentangling Evolution Capabilities in Self-Evolving LLM Agents._ arXiv:2605.30621, 2026.

[^llm-scientists-2026]: Trehan, Dhruv and Paras Chopra. _Why LLMs Aren't Scientists Yet: Lessons from Four Autonomous Research Attempts._ arXiv:2601.03315, 2026.

[^scientistone-2026]: Meng, et al. _ScientistOne: Towards Human-Level Autonomous Research via Chain-of-Evidence._ arXiv:2605.26340, 2026.

## Chapter Summary

Continual evolution is becoming one of the most important capabilities of Agents, but today's models still cannot perform it reliably on their own. Contextual adaptation during inference does not persist automatically, while unvalidated online parameter updates amplify noise, attacks, and capability drift. The more practical approach today is therefore to build a verifiable learning system around the model.

In terms of the book's larger structure, this chapter builds the **experiment and feedback** segment of Chapter 1's discovery loop: the proposal already exists, and the question becomes how one experiment grounded in real observation can tell whether it actually improved the system, and how the result is carried into the next round.

An Agent obtains learning signals from interaction and evaluation, then updates knowledge, Prompts, Skills, programs, or model parameters according to how the capability is represented. The system can also optimize the methods used to manage and generate these artifacts, but it should prefer local changes that are attributable, verifiable, and reversible.

Continual evolution should separate online execution from offline learning: record evidence online; generate and validate candidate updates offline; then release, consolidate, or roll them back gradually. This loop is most reliable when outcomes are automatically verifiable. For open-ended tasks with ambiguous objectives and delayed feedback, people must still participate in problem definition and the design of evaluation criteria.

## Questions for Reflection

1. ★★ An experience document is supported by three successful trajectories and one failed trajectory. The failure occurred with a newer API version. How should the system determine whether the experience has been invalidated or its applicability conditions have changed?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> First stratify the four pieces of evidence by API version, task conditions, and environment state rather than voting by count. If the old policy succeeds only on the old version and fails consistently on the new one, narrow the experience's scope of applicability and generate a candidate for the new version. If it also fails under the same version and prerequisites, lower its confidence or revoke it.

</details>

2. ★★ A customer-service Agent’s user satisfaction increases, but its rate of rule violations also rises. Why can satisfaction not serve as the sole learning signal? How would you design guardrail metrics?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Satisfaction may reward unauthorized refunds, information leakage, or excessive promises, so it can only be a quality metric and cannot override safety baselines. Guardrails should cover at least rule violations, privacy leakage, unsupported claims, promise-action inconsistency, and unauthorized operations. These metrics should have hard thresholds that cannot be canceled out by an average score. Resolution rate, compliant workarounds, concision, and satisfaction should be compared only among compliant candidates.

</details>

3. ★★★ The same “false promise” problem can be mitigated through a Prompt, Harness checks, or parameter training. What evidence would you use to choose where to make the modification?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Begin by locating the root cause. If the model knows that a tool has not executed but still uses completion language, a minimal Prompt rule may correct it. If the promise can be compared deterministically against response text and tool state, a Harness check is more reliable and should remain the final defense in high-risk scenarios. If the problem spans many forms of expression and reflects a broad language-action alignment capability, consider parameter training. Prefer the smallest modification that is easiest to validate and roll back, and compare it on both a failure set and a retained set of old tasks.

</details>

4. ★★★ An Agent may modify tools and validators, but it should not be allowed to modify the trusted root that approves its own updates. How would you separate the permissions and code boundaries of these two parts?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Place evolvable code in a low-privilege sandbox that can only generate patches and tests. The permission system, API keys, release-controller configuration, and update validators are security mechanisms; the Agent in the sandbox has no read or write access to them. Code changes generated by the Agent must be reproduced and regression-tested by the security mechanisms in an isolated environment before release.

</details>

5. ★★ As the experience knowledge base grows, retrieval errors and knowledge conflicts may offset the benefits of learning. How should versioning, freshness, and retirement mechanisms be designed?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Each experience should retain its source trajectories, applicability conditions, environment version, validation time, and confidence. Conflicting entries should not silently overwrite one another; they should branch by condition or be marked. Periodically run “sleep learning” to merge duplicate entries.

</details>

6. ★★★ Parameter learning is effective for natural-language style but struggles to guarantee strict business rules. Design a continual-evolution scheme for medical customer service that coordinates parameters, knowledge, Skills, and code-level constraints.

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Parameters (a post-trained model) handle medical-language understanding, natural and empathetic expression, and complex intent recognition. The knowledge base stores the latest guidelines, drug information, and institutional policies, with answers required to cite sources. A Skill describes the workflow for collecting consultation information, risk stratification, escalation to humans, and follow-up. Server-side code enforces identity verification, privacy minimization, contraindication checks, emergency-risk escalation, and permission boundaries. Production trajectories are first evaluated for medical safety, factual reliability, promise-action consistency, and quality of expression, then used to generate four classes of candidate updates. Any parameter or workflow change must pass a retained medical-safety set and human review before canary release.

</details>

## Practice Multiple-Choice Questions

### Question 1: The Continuous Evolution Paradigm — In-Context Adaptation vs. Continual Evolution

In Chapter 9's introduction, the authors identify a striking "capability paradox": modern agents can solve novel, complex tasks zero-shot, yet repeat the exact same errors after executing thousands of identical tasks. Why does simply persisting raw conversation transcripts in long-term memory or a vector database fail to achieve true "continual evolution"?

- A) Vector databases lack the token throughput needed to store conversational embeddings exceeding 8,192 tokens.
- B) Preserving raw operational trajectories is merely passive logging; true learning requires active multidimensional evaluation, cross-trajectory comparison, pattern induction, and independent validation against regressions.
- C) In-context learning permanently modifies the model's KV Cache across different operating system processes, leading to memory leaks.
- D) Storing historical conversations triggers automatic LoRA fine-tuning on unverified tokens, which immediately causes catastrophic forgetting of base tool-calling capabilities.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** As established in Section 9.1 ("Continuous Agent Evolution"), preserving experience is fundamentally different from learning from it. Storing raw trajectories in a vector database allows an agent to retrieve past text, but it does not evaluate whether a run succeeded, distinguish sound strategies from environmental luck, or detect whether an interface has changed. Continual evolution requires constructing an autonomous verification and learning system around the model: recording evidence, diagnosing outcomes and processes across multiple trajectories, synthesizing candidate updates, and validating them against regression suites before release. Distractor A is technically incorrect regarding vector databases. Distractor C misstates in-context learning and KV caches (context ends when the session terminates). Distractor D falsely claims that saving conversations triggers automatic fine-tuning.
</details>

### Question 2: Trajectory Verification Architecture — The Three-Layer Evaluation Hierarchy

Figure 9-2 and Table 9-1 organize trajectory evaluation into a three-layer verification structure: the bottom-layer Outcome Verifier, middle-layer Process Verifier, and upper-layer Quality Verifier. Why must the system establish the Outcome and Process Verifiers programmatically before relying on the upper-layer Quality Verifier?

- A) The upper-layer Quality Verifier requires GPU floating-point emulation, which cannot initialize without database triggers from the bottom layer.
- B) The Quality Verifier (LLM-as-a-Judge) cannot evaluate grammar or sentiment unless the trajectory has zero tool calls.
- C) Relying on quality or outcome alone creates severe blind spots: an agent can achieve a passing outcome through forbidden shortcuts (e.g., deleting test assertions), or achieve high quality/satisfaction scores through deceptive promises (e.g., promising unauthorized refunds); deterministic programmatic checks on real environment states and compliance policies must anchor the evaluation.
- D) The Process Verifier is an offline reinforcement learning policy that trains the Outcome Verifier's neural weights.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** C

**Explanation:** In Section 9.2 ("Deriving Learning Signals from Operational Trajectories"), the three layers have distinct, non-overlapping duties: the bottom layer reads objective environmental state (database rows, unit test exits, API returns) to verify whether the core task actually finished; the middle layer verifies whether it was completed via compliant procedures (policy repositories, permission checks, promise-action consistency); and the upper layer evaluates subjective service quality (natural tone, patience, compliant alternatives). If an evaluation relies only on outcome, an agent that deletes test cases or circumvents security controls appears successful. If it relies only on user satisfaction or quality scores, an agent that makes false promises or issues unauthorized refunds scores high. Distractors A, B, and D invent false mechanisms.
</details>

### Question 3: Structured Learning Signals — Diagnostic Verdicts vs. Scalar Feedback

Experiment 9-1 demonstrates that converting operational trajectories into structured diagnoses is essential for continual evolution. According to Chapter 9, why is a single scalar score (such as an overall rating of 8/10 or a binary success/failure flag) insufficient to drive automated agent updates, and what four components must a valid learning signal contain?

- A) A scalar score fails to indicate what went wrong, which component failed, or where the evidence is located; a usable learning signal must contain: (1) task completion status, (2) independent verdicts for each evaluation dimension, (3) precise trajectory evidence locations (turn and tool call), and (4) a failure-type classification label.
- B) A scalar score cannot be converted into backpropagation gradients unless it is normalized between -1.0 and +1.0 using softmax.
- C) Language models refuse to process numerical digits in system prompts unless they are expressed as Roman numerals.
- D) Single scalar scores automatically trigger git reverts in the deployment harness without human approval.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 9.2 notes that a single overall score reflects only how well a specific run went in the aggregate; it cannot tell subsequent modules what should be changed. An actionable learning signal must contain at least four elements: (1) whether the task succeeded, partially succeeded, or failed; (2) a separate verdict for each dimension (e.g., outcome, rule compliance, promise-action consistency); (3) the exact evidence location (which conversation turn, which tool invocation); and (4) a failure-type label. Furthermore, when evidence is ambiguous, the verifier must decline to score rather than injecting low-confidence noise into the learning pipeline. Distractors B, C, and D are fabricated distractions.
</details>

### Question 4: Update Carriers — Mapping Capabilities to Representation Media

Table 9-2 and Figure 9-3 categorize continual evolution into four update carriers: (1) Experience Knowledge Base, (2) Prompts and Skills, (3) Programs and Harness, and (4) Model Parameters. According to Chapter 9, what is the primary criterion for assigning a learned capability to a specific carrier?

- A) The timestamp of when the error occurred; errors occurring during peak traffic must always update model parameters via immediate online backpropagation.
- B) The natural representational medium of the capability: retrievable facts and past exceptions belong in Knowledge; linguistically expressible SOPs and routing heuristics belong in Prompts/Skills; deterministic procedures, tools, and hard security constraints belong in Programs/Harness; and high-dimensional perception, prosody, and implicit strategies belong in Model Parameters.
- C) Cost minimization: 100% of all learned behaviors must be compressed into the system prompt to eliminate the need for databases, code testing, or model training.
- D) Agent preference: the agent votes on which file to modify during live inference using an internal Monte Carlo simulation.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.3 ("Four Methods for Continual Agent Evolution") explains that the primary basis for selecting an update method is not how long an experience has persisted or when it occurred, but whether the target capability can be naturally represented by a particular medium. Retrievable facts, exception records, and API quirks belong in the experience knowledge base; strategies and operating principles that can be articulated in language belong in Prompts or Skills; deterministic constraints, verification gates, retry logic, and tool implementations belong in programs/Harness code; and high-dimensional perceptual capabilities, natural voice prosody, and implicit long-horizon intuition belong in model parameters. Table 9-2 explicitly warns against using parameters for hard business rules or using prompts for deterministic constraints. Distractors A, C, and D are invalid.
</details>

### Question 5: Experience Knowledge Bases — Multi-Trajectory Distillation Pipeline

Section 9.3.1 describes the five-step knowledge-distillation pipeline for turning operational experience into formal knowledge documents (Figure 9-4). Why does the pipeline prohibit storing raw, single-run execution trajectories directly into the formal knowledge base as retrievable units?

- A) Raw trajectories contain noisy tool outputs, incidental detours, and environmental quirks that may reflect accidental success rather than sound generalizable strategy; valid knowledge requires comparing multiple trajectories across a task family, isolating common patterns, and evaluating transfer on unseen tasks.
- B) Raw trajectories are formatted in JSON, which cannot be indexed by modern vector retrieval databases.
- C) Recording raw trajectories violates the W3C semantic web standard for agent communication.
- D) Single trajectories automatically trigger model fine-tuning if stored in plaintext Markdown.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 9.3.1 ("Consolidating Experience into Knowledge") emphasizes that raw trajectories are lengthy, noisy, and contain incidental detours or environmental chance. Storing a single trajectory immediately upon success risks canonizing an accidental workaround or brittle path. The robust pipeline maintains three layers: (1) immutable raw logs for auditing, (2) structured per-run diagnostic analyses, and (3) cross-trajectory clustering and induction that extracts Markdown knowledge specifying applicable scenarios, recommended strategies, prohibited actions, and environment prerequisites. Only candidate patterns meeting a multi-trajectory support threshold and demonstrating positive transfer on held-out tasks become formal knowledge. Distractors B, C, and D are fictitious.
</details>

### Question 6: Prompts & Skills Evolution — System Prompt Learning and the "Normative Trap"

In Experiment 9-2 (deriving escalation and tool-use rules from τ²-bench telecom failure trajectories), a weak model analyzed 19 failed trajectories and initially synthesized rules such as "escalate to a human after three consecutive failed calls." Why did this initial candidate rule represent a critical failure in automated rule induction?

- A) The rule was too short and failed to meet the minimum prompt length requirement of 1,000 tokens.
- B) Language models tend to treat observed frequent behavior as normative (what ought to happen); because 19 of 20 failed tasks ended in escalation, the model mistook the failure symptom for a valid policy, effectively encoding failure into the specification.
- C) τ²-bench prohibits using the English word "escalate" in prompt definitions.
- D) System prompts can only be updated if the change is verified by an external human telecom agent in real time.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** As highlighted in Section 9.3.2 under "Example 1: Turning the Escalation Boundary into Rules", a foundational hazard of automated prompt learning is that "a model treats observed behavior as the behavior that ought to occur." In the τ²-bench baseline, the agent repeatedly failed tools and escalated, which was recorded as the termination state of 19/20 trajectories. When asked to induce rules, the LLM saw frequent escalations and concluded that escalating after repeated tool failures was the standard procedure. However, in the benchmark evaluation, escalating to a human is counted as a task failure. Thus, the model literally codified the failure mode as a requirement. This demonstrates why candidate prompt patches must undergo independent validation on held-out test sets. Distractors A, C, and D are incorrect.
</details>

### Question 7: Skill Evolution — Calibrating Requirement Clarification and Spec Confirmation

Experiment 9-4 explores evolving a requirement-clarification Skill (e.g., handling requests like "change the login page to support enterprise sign-in"). What core trade-off governs requirement clarification, and how does a mature evolved Skill resolve it?

- A) Asking too little causes requirement deviation and expensive rework, while asking too much causes interaction friction and user abandonment; the Skill resolves this by executing low-risk, easily reversible tasks directly with stated assumptions, while requiring structured Spec confirmation only for high-risk operations (architecture, permissions, data schemas).
- B) The agent must always ask exactly 10 questions before any action to ensure legal compliance under GDPR.
- C) The agent should never ask clarifying questions because user intent can always be mathematically derived from past session cookies.
- D) The agent delegates all clarifying questions to an unconstrained subagent running in a separate thread.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 9.3.2 ("Example 2: Requirement Clarification Skill") analyzes the procedural dilemma: "Asking too little causes rework; asking too much causes interruption." If an agent immediately executes an ambiguous, high-impact task, it makes unverified architectural assumptions; if it interrogates the user with extensive questions for trivial typo fixes, it creates immense friction. The evolved Skill establishes a scoped decision path: for low-risk, reversible changes, proceed with explicit assumptions; for high-risk changes (architecture, permissions, database schemas, public APIs), ask targeted clarifying questions, produce a concise Spec/Plan, obtain confirmation, and rely on the Harness to veto unconfirmed high-risk writes. Distractors B, C, and D represent extreme or false statements.
</details>

### Question 8: Programmatic Workflows — Browser Automation and State-Verified Replay

In Experiment 9-5 (and PreAct), exploratory browser trajectories (e.g., sending an email) are compiled into parameterized Playwright code rather than re-explored by an LLM each time. What safety and verification mechanism is mandatory to prevent the "illusion of successful replay"?

- A) Re-running the LLM on every single click to confirm the mouse coordinate trajectory.
- B) Incorporating before-action checks (e.g., button visible), after-action checks (e.g., success banner displayed), and an independent final-state check on real environment state (e.g., verifying the sent-mail folder contains the message) before and during replay.
- C) Storing all web credentials directly in the client-side JavaScript DOM storage.
- D) Disabling all network timeouts so the browser process never reports an error.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.3.3 ("Encoding Experience as Programs", Experiment 9-5) details the compilation of browser trajectories into deterministic workflows. The authors warn against the dangerous illusion where "replay coverage is 100% and every button was clicked, yet one field was empty and the task was never actually completed." To prevent false successes, compiled workflows must incorporate before-action validation (preconditions), after-action validation (postconditions), and an independent final-state check querying real system/backend state. If page structure changes or state checks fail, the workflow must invalidate itself and fall back to full agent exploration. Distractors A, C, and D are incorrect or dangerous practices.
</details>

### Question 9: Self-Modifying Agents — Falsifiable Change Contracts and Candidate Constraints

In Experiment 9-6 and Agentic Harness Engineering (AHE), when an agent modifies its own harness code (such as `retry_policy.py` to stop retrying non-retryable errors), what is a "falsifiable change contract," and what information must be provided to the candidate patch generator?

- A) A contract signed by human legal counsel granting the agent ownership of its source repository.
- B) A structured specification declaring the failure evidence, inferred root cause, target component, expected behavioral improvement, and potential regression risks; the generator must be supplied with failure evidence, preserved success behaviors, and historically rejected patches.
- C) A JSON file containing the LLM API private keys and administrator credentials needed to deploy directly to production.
- D) An automated prompt that instructs the compiler to ignore syntax errors and unit test failures.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.3.3 and Experiment 9-6 define a falsifiable change contract: each proposed modification must record the failure evidence, inferred root cause, responsible component, expected fix, and potential regressions. Furthermore, citing Self-Harness and AHE, the candidate generator should not receive only failed trajectories—it must also be provided with successful behaviors that must be preserved (to prevent breaking working features) and records of previously rejected candidates (to prevent repeating already-disproved ideas). Distractors A, C, and D are absurd or insecure.
</details>

### Question 10: Dynamic Composition in Self-Evolving Harnesses — Cordis and DeepSeek Harness (`dsh`)

In the Cordis framework and DeepSeek Harness (`dsh`), self-evolution is formalized as dynamic composition rather than static compilation. What do "temporal composability" and "spatial composability" require in a self-evolving agent architecture?

- A) Temporal composability requires that all actions run in under 10 milliseconds; spatial composability requires that the agent runs across multiple AWS geographic regions.
- B) Temporal composability guarantees that all state modifications, event handlers, and resources introduced by a component can be completely and reversibly undone upon removal; spatial composability ensures components declare explicit dependencies and coordinate their lifecycles reactively when dependencies change.
- C) Temporal composability synchronizes GPU clocks across distributed clusters; spatial composability measures vector distances in latent embedding space.
- D) Temporal composability allows an agent to travel back in time to overwrite historical log files; spatial composability restricts the agent to a single CPU socket.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.3.3 (Case: DeepSeek Harness, citing Cordis) explains that dynamic composition requires two orthogonal properties: (1) Temporal composability ("what changed"), which ensures every resource allocation, event hook, and state transformation has an explicit reversible inverse so removing a plugin cleanly restores the environment without requiring a process restart; and (2) Spatial composability ("what is depended on"), which enables components to declare reactive coeffects (dependencies) and coordinate activation/deactivation cleanly when dependencies change. Distractors A, C, and D misrepresent these formal systems engineering concepts.
</details>

### Question 11: Parameterized Evolution — Post-Training Safeguards and Data Hygiene

Section 9.3.4 addresses encoding experience directly into model parameters via SFT, preference optimization (DPO), or RL. When production interaction trajectories are transformed into training datasets, what critical safety and data hygiene measures must be enforced?

- A) All prompt tokens must be duplicated three times to ensure maximum cross-entropy loss.
- B) All runtime errors must be converted into synthetic 5-star reviews before calculating gradients.
- C) Trajectories must be sanitized to strip private user information, unverified or erroneous trajectories must be filtered out, potential prompt-injection payloads must be neutralized, and training must be gated against a held-out retention set to detect catastrophic forgetting and safety alignment drift.
- D) Parameter updates must be applied directly to the live inference server's GPU weights using unquantized FP64 precision during active user sessions.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** C

**Explanation:** Section 9.3.4 ("Encoding Experience in Parameters") and Section 9.4.2 ("Safety Boundaries for Continual Evolution") emphasize that production traces contain noisy, private, and potentially adversarial content (such as prompt injections in scraped web pages or user inputs). Before post-training, private data must be scrubbed, failed or low-confidence trajectories filtered, and adversarial payloads eliminated. After training, the model must be rigorously evaluated on retained benchmark sets to verify that base reasoning, tool calling, and safety guardrails have not degraded due to catastrophic forgetting. Distractors A, B, and D describe destructive or nonsensical procedures.
</details>

### Question 12: Hierarchy of Optimization Targets — From ACE to Meta-Harness and AFlow

Section 9.3.5 explains that continual evolution operates across an orthogonal axis of search scales: from individual artifact content up to meta-optimizers. How do Agentic Context Engineering (ACE), Meta Context Engineering (MCE), and AFlow differ in their optimization targets?

- A) ACE optimizes raw silicon chip manufacturing; MCE trains transformer attention heads; AFlow manages cloud server cooling fans.
- B) ACE optimizes the content of context entries using atomic IDs and deterministic deduplication; MCE optimizes the operational methods that search, filter, and format context; AFlow optimizes the workflow structure (representing multi-LLM workflows as code graphs and searching over node topologies).
- C) ACE deletes all system prompts; MCE replaces python code with bash scripts; AFlow restricts models to single-turn conversations.
- D) ACE, MCE, and AFlow are identical algorithms that only differ in their GitHub repository licensing.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.3.5 ("From Updating Artifacts to Updating the 'Update Method'") articulates the hierarchy of search scales. ACE operates at the context artifact level: maintaining modular entries with stable identifiers, proposing incremental updates, and using deterministic logic to merge and deduplicate without iterative rewriting. MCE moves to the meta-level: its inner loop optimizes context artifacts, while its outer loop uses multi-run validation to optimize the retrieval, curation, and formatting operations themselves. AFlow (and Meta-Harness) expands the search space to workflow code graphs and harness implementations, searching over node combinations and control flow. Distractors A, C, and D are incorrect.
</details>

### Question 13: Dual-Loop Architecture — Decoupling Online Execution from Offline Evolution

Figure 9-5 illustrates the dual-loop architecture for long-term production operations. Why is it an architectural non-negotiable that the online execution loop is decoupled from the offline evolution loop, prohibiting agents from modifying their own production parameters, prompts, or tools in the live request path?

- A) Online self-modification in the live request path would introduce latency spikes, expose the system to immediate prompt-injection persistence, amplify single-run noise or accidental errors across all users, and eliminate the opportunity for offline regression testing and human approval gates.
- B) Online self-modification requires restarting the physical server hardware on every incoming user query.
- C) Modern web browsers block HTTP traffic from agents that have self-modification permissions.
- D) Cloudflare Workers and AWS Lambda strictly prohibit writing to memory during inference.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 9.1, Section 9.4, and Figure 9-5 describe the dual-loop architecture. The online loop's sole responsibility is serving requests reliably and appending immutable execution evidence. If an agent modified its own production prompts, tools, or weights online during live execution: (1) a prompt injection encountered in one query could immediately corrupt global agent behavior; (2) accidental successes or transient network glitches would trigger ill-conceived updates; (3) unvalidated changes would immediately affect other users without regression testing. Decoupling ensures that candidate generation, aggregation across trajectory clusters, and safety gating happen offline. Distractors B, C, and D are false.
</details>

### Question 14: Guardrails vs. Optimization Metrics — Goodhart's Law and Perverse Incentives

In Section 9.2 and Reflection Question 2, the authors examine a scenario where a customer-service agent's user satisfaction rating rises while its rule violation rate also increases. Why can user satisfaction or task resolution rate never serve as the sole optimization signal for continual evolution?

- A) User satisfaction surveys have a fixed 30-day cookie expiration that prevents real-time streaming.
- B) Optimizing solely for user satisfaction or resolution creates perverse incentives (Goodhart's law), rewarding unauthorized refunds, policy violations, leaking confidential data, and sycophantic false promises; safety baselines and compliance rules must be enforced as hard invariant thresholds that cannot be compensated by high satisfaction scores.
- C) Users always provide negative feedback when interacting with AI agents regardless of outcome.
- D) Customer service agents are legally prohibited from tracking user satisfaction under ISO 9001.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.2 (Table 9-1) and Reflection Question 2 explain why user satisfaction cannot serve as the sole learning signal. An agent optimizing purely for user satisfaction can easily achieve top scores by granting unauthorized refunds, waiving legitimate fees, leaking restricted information, or promising actions it cannot perform. These behaviors maximize immediate user happiness while destroying business rules and legal compliance. Therefore, compliance, privacy, and promise-action consistency must be enforced as non-negotiable hard guardrail thresholds. Only candidates that meet 100% of the hard safety gates are permitted to compete on quality, resolution rate, or user satisfaction. Distractors A, C, and D are spurious.
</details>

### Question 15: Root of Trust — Sandbox Isolation and Controller Integrity

In Section 9.4.2 ("Safety Boundaries for Continual Evolution") and Reflection Question 4, how must the permission and code boundaries be structured between the evolvable agent and the deployment controller to maintain the system's "Root of Trust"?

- A) The evolvable agent must be given root access to the deployment server so it can reboot the operating system when tests fail.
- B) The evolvable agent operates in a low-privilege sandbox capable only of generating candidate patches and tests; the release controller, validation test suites, release gate thresholds, audit logs, and deployment credentials reside in an immutable, read-only boundary that the agent cannot access or modify.
- C) The agent and the release controller share a single global Python dictionary containing all master API keys.
- D) Security boundaries are unnecessary if the agent uses a 70B parameter model or larger.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.4.2 establishes that "safety mechanisms must not be self-modifiable." An evolvable agent running in a low-privilege sandbox can generate candidate code diffs, propose prompt updates, or generate unit tests. However, the release controller, acceptance test suites, gate thresholds, stable backups, audit logs, and production deployment credentials must be strictly separated. If the agent had write access to the release controller or test suites, it could disguise regressions as progress simply by deleting failing test cases or lowering accuracy thresholds. All proposed patches must be independently reproduced and verified by the external controller before release. Distractors A, C, and D describe critical security vulnerabilities.
</details>

### Question 16: Safe Deployment Mechanics — Canary Rollouts, Telemetry, and Circuit Breakers

When a candidate update (such as an evolved prompt, new tool, or harness patch) passes offline validation, how should it be released into production, and how does the deployment harness mitigate runtime regressions?

- A) The candidate is immediately pushed to 100% of production traffic, and any failed sessions are deleted from the database to maintain clean uptime metrics.
- B) The candidate is deployed via progressive canary traffic shifting (e.g., 1% → 5% → 25% → 100%) paired with continuous telemetry monitoring (error rates, escalation rates, latency, rule violations); automated circuit breakers trigger deterministic, instantaneous rollback to the stable commit hash if anomalies are detected.
- C) The candidate is deployed only on weekends when users are offline, without automated telemetry.
- D) The candidate is compiled into an immutable hardware FPGA chip that cannot be rolled back under any circumstances.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.3.3 (Experiment 9-6, Experiment 9-7) and Section 9.4 describe the safe deployment lifecycle. Passing offline regression tests grants only `release_to_canary`, never an instant global rollout. Production traffic is shifted incrementally (e.g., 1% -> 5% -> 25% -> 100%) while live telemetry tracks error spikes, non-retryable call frequencies, abnormal escalations, and rule violations. If any anomaly breaches predefined safety thresholds, automated circuit breakers immediately trip, executing a deterministic, one-click rollback to the known stable version recorded in `release_manifest.json`. Distractors A, C, and D violate basic deployment safety principles.
</details>

### Question 17: Long-Term Experience Management — "Sleep Learning" and Garbage Collection

Section 9.4.3 describes "Sleep Learning" as an offline consolidation process (exemplified by Hermes Curator and Claude Code memory). Why is continuous, unpruned appending of experience harmful over long operational horizons, and how does sleep learning counter it?

- A) Appending text causes hard drives to run out of physical disk space within 24 hours.
- B) Without consolidation, experience bases suffer from long-term "context corruption": contradictory rules accumulate, outdated policies override new standards, prompt bloat degrades instruction adherence, and tool libraries gather obsolete entries; sleep learning runs during idle periods to merge duplicates, resolve version conflicts, archive stale tools, and prune contradicted knowledge.
- C) Sleep learning requires putting the server into physical sleep mode (S3 ACPI state) to cool down the GPU transistors.
- D) Appending experience causes SQLite databases to encrypt themselves automatically.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.4.3 ("Sleep Learning: Consolidation, Forgetting, and Capability Maintenance") explains that continual evolution is not unconstrained, infinite appending. Over months of operation, uncurated repositories suffer from long-term context corruption: mutually conflicting rules from different environment eras coexist, prompts become overwhelmed by ad-hoc edge cases ("99 ironclad rules"), and inactive tools clutter the tool registry. Sleep learning executes a structured 5-step maintenance cycle during idle periods: orienting against valid baselines, merging duplicate experiences, resolving conflicts by condition/version, archiving obsolete tools, and updating retrieval indexes. Distractors A, C, and D are inaccurate or nonsensical.
</details>

### Question 18: Disentangling Evolution Capabilities — Harness Updating vs. Harness Benefit

In Section 9.4, Table 9-3, and recent research (Lin et al., 2026), why is it critical to decouple the evaluation of "Harness Updating" from "Harness Benefit"?

- A) "Harness Updating" measures network bandwidth, while "Harness Benefit" measures electricity consumption.
- B) "Harness Updating" evaluates whether the updater synthesizes valid, high-quality persistent artifacts (Skills, prompts, code), whereas "Harness Benefit" evaluates whether the downstream task model can successfully retrieve, activate, and adhere to those artifacts; measuring only end-to-end task scores can falsely penalize a superior updater if the task model is too weak to follow the updated instructions.
- C) "Harness Updating" applies only to Python agents, whereas "Harness Benefit" applies only to TypeScript agents.
- D) "Harness Updating" is performed by human software engineers, while "Harness Benefit" is calculated by legal auditors.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 9.4 ("Building a Continual-Evolution Closed Loop for Long-Term Operation", Table 9-3) and Lin et al. (2026) make a fundamental distinction: "Harness updating produces valuable persistent changes from trajectories; Harness benefit is the task Agent's ability to find, activate, and correctly use those changes later." If a developer evaluates evolution solely by end-to-end task pass rates, a flawed conclusion can occur: an updater might produce a brilliant, mathematically sound Skill, but if the downstream task agent fails to load the Skill or drifts off track during execution, the pass rate does not improve. Layered metrics (candidate validity, artifact activation rate, adherence rate, and retention-set gain) allow engineers to pinpoint whether the bottleneck lies in the evolution engine or the runtime execution model. Distractors A, C, and D misrepresent these concepts.
</details>

```knowledge-quiz
schemaVersion: 1
quizId: "182e9990-449e-46c5-b52a-7bd90afa19bf"
title: "Checkpoint: Chapter 9 — Continuous Agent Evolution"
questionBankId: "f8690f3d-3afe-41ff-b0af-d8c20e263801"
questionIds:
  - "982d3030-928c-4f13-b7e0-3d6eb79c5731"
  - "bd057e30-e43f-4340-9f02-9a54a9b55a14"
  - "5438ba41-66ff-4624-84cc-50be5f4031dc"
  - "e6c8aaf5-d5db-424e-ad89-ce99cfd5ec92"
  - "ddf70ab6-9c02-4046-a25b-3dd638b6ef95"
  - "30096326-3263-478f-b598-71e048bcac10"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-agents-in-depth/question-banks/09-continuous-agent-evolution|Chapter 9: Continuous Agent Evolution: Question Bank]].

<div class="chapter-navigation">
  <a href="/courses/ai-agents-in-depth/lessons/08-model-post-training" class="chapter-nav-btn prev">← Previous: Chapter 8 — Model Post-Training</a>
  <a href="/courses/ai-agents-in-depth/lessons/10-multi-agent-collaboration" class="chapter-nav-btn next">Next: Chapter 10 — Multi-Agent Collaboration →</a>
</div>
