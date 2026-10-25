---
id: "8884d56a-eb3e-4ff6-ac4b-ae4831e4d315"
title: "Chapter 8: Model Post-Training: Question Bank"
description: "Practice questions for the Model Post-Training chapter: mid-training, SFT and RL, reward design, credit assignment, distillation, and the bottlenecks that limit reinforcement learning today."
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

These questions practise [[courses/ai-agents-in-depth/lessons/08-model-post-training|Chapter 8: Model Post-Training]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "9c01dd56-ac2f-4c1b-b5d6-513d6e879eb5"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter gives a rule for deciding whether to reach for mid-training, SFT or RL. Which rule is it?"
    options:
      - id: rl-first
        text: "If the model already solves the task occasionally but its output format is unstable, reach for RL first, because RL will pull the format into line"
      - id: demonstrations-for-knowledge
        text: "If the model never solves the task however many samples are drawn, add demonstrations, because demonstration data will teach it the missing knowledge"
      - id: staged-rule
        text: "If pass@k stays near zero use mid-training for the missing knowledge, if the format is unparseable use SFT, and use RL once the policy produces scoreable trajectories"
      - id: rl-whenever-possible
        text: "Use RL whenever a reward environment exists at all, since RL is the only stage that can repair a gap in the foundation as well as a gap in behaviour, so it should always come first"
    correctOptionIds: [staged-rule]
    explanation: "staged-rule is correct: the chapter's decision rule is that a near-zero pass@k under reasonable sampling means the foundation is missing something and mid-training is the answer, an occasionally successful model that emits unparseable output needs SFT to stabilise the format, and RL can only reallocate probability efficiently once the current policy actually generates scoreable trajectories with reward variation. rl-first reverses the order, demonstrations-for-knowledge mistakes a knowledge gap for a protocol gap, and rl-whenever-possible overstates what RL can repair. Lesson section: when to choose mid-training, SFT and RL."
  - id: "55a9e652-f165-4ca5-9724-11be891732a2"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the chapter's card-game experiment, the scoring rule was changed so that the face cards counted as 11, 12 and 13 instead of 10. What happened?"
    options:
      - id: sft-down-rl-up
        text: "The SFT model fell from 11.5 to 3.4 percent while the RL model rose from 11.5 to 15.0 percent"
      - id: both-down
        text: "Both models fell slightly, because neither had seen a card game with those values at any point during either stage of training"
      - id: both-up
        text: "Both models rose, because the changed rule acted as a fresh training signal for the two approaches at the same time"
      - id: sft-flat-rl-down
        text: "The SFT model held steady while the RL model fell, because the RL policy had latched onto the card names rather than the procedure"
    correctOptionIds: [sft-down-rl-up]
    explanation: "sft-down-rl-up is correct: the SFT model's accuracy dropped from 11.5 to 3.4 percent while the RL model's rose from 11.5 to 15.0 percent, and the chapter reads the divergence through the objectives — SFT maximises likelihood over fixed demonstrations and so mass-covers the surface tokens that hard-code the old rule, while RL maximises expected reward over its own rollouts and so reinforces a procedure that survives the change of values. both-down and both-up do not match the experiment, and sft-flat-rl-down reverses the directions. Lesson section: the essential difference between SFT and RL, and the card-game experiment."
  - id: "0de72536-4a27-4f94-b89d-cfa88b0e9b3f"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why is loss masking enforced on user prompts and tool responses during SFT?"
    options:
      - id: token-balance
        text: "Because the token counts of prompts and tool results would otherwise dominate the gradient and unbalance the update towards them"
      - id: inverted
        text: "Because the model's own tokens are the ones masked, and only the environment's tokens are trained on, which is the reverse of what most people assume"
      - id: unpredictable-outputs
        text: "Because masking the environment tokens stops the model from learning to predict tool outputs that it had no way of knowing in advance"
      - id: learn-to-act
        text: "Because the Agent should learn to produce its own reasoning and arguments, not to imitate the user or the environment"
    correctOptionIds: [learn-to-act]
    explanation: "learn-to-act is correct: an SFT sample is a prompt, environment tool outputs and assistant actions, and the loss is computed only on the assistant tokens, so the model learns how to think and act rather than how to simulate the user or the environment. token-balance is a real effect but not the reason for the rule, inverted misdescribes what is masked, and unpredictable-outputs gives the opposite rationale. Lesson section: the essence of SFT."
  - id: "62d1a7f4-0fb9-4b42-bff5-247864034939"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does GRPO compute an advantage without a Critic network?"
    options:
      - id: baseline-copy
        text: "It fits a second copy of the model as a baseline and subtracts that copy's predicted return from the actual reward on each rollout"
      - id: group-normalisation
        text: "It samples a group of candidate responses, scores them all, and normalises each score against the mean and spread of that group"
      - id: reuse-reward-model
        text: "It reuses the reward model as a value function, so the same network supplies both the scalar reward and the baseline for it"
      - id: known-values
        text: "It derives the baseline from the discount factor alone, since the value of every state in these tasks can be worked out in advance"
    correctOptionIds: [group-normalisation]
    explanation: "group-normalisation is correct: GRPO samples a group of G candidates for each prompt, scores them with verifiers, and computes each advantage as the score minus the group mean divided by the group standard deviation, which removes the need for a value network of the Actor's size and with it the VRAM cost and the instability of value-function optimisation. baseline-copy is essentially PPO's arrangement, reuse-reward-model changes what the reward model is for, and known-values assumes away the problem. Lesson section: RL algorithms, from sixteen rollouts to one parameter update."
  - id: "a3d72dc8-4eab-4a80-84ea-1a6ef72dd438"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the structural difference between an outcome reward model and a process reward model, and what does the difference cost?"
    options:
      - id: reversed-names
        text: "The outcome model scores every step and the process model scores only the last one, which is the reverse of what the names suggest to most readers"
      - id: state-vs-claim
        text: "The process model checks the final environment state, while the outcome model reads the Agent's own claim about what it has done"
      - id: terminal-vs-dense
        text: "The outcome model gives one terminal scalar, which frees exploration but makes credit assignment diffuse; the process model scores steps densely"
      - id: rubric-vs-labels
        text: "The outcome model requires a human-written rubric for every task, while the process model can be trained from outcome labels alone"
    correctOptionIds: [terminal-vs-dense]
    explanation: "terminal-vs-dense is correct: an outcome reward model asks whether the episode ended in success, which gives the Agent complete freedom to discover unusual strategies but leaves a multi-turn run with a delayed signal and no way to tell which turn deserved the blame, while a process reward model scores intermediate steps and tool calls, giving dense credit that speeds convergence at the risk of steering the Agent down human-designed and possibly sub-optimal paths. reversed-names, state-vs-claim and rubric-vs-labels misdescribe the two. Lesson section: when the reward is given, outcome or process."
  - id: "0ff9a501-ac6b-40b5-ae42-9fa6755a2468"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the robotics experiment, the Agent discovered a push-cut motion that appears nowhere in the human demonstrations. Why would a dense process reward have prevented that?"
    options:
      - id: imitation-penalty
        text: "Because a process reward trained on standard demonstrations would treat the unfamiliar manoeuvre as an error and reward imitation instead"
      - id: no-goal-gradient
        text: "Because a dense reward is paid at every step, so the Agent would have had no gradient signal left for the final goal of the episode"
      - id: invalid-grip
        text: "Because the push-cut motion changes the robot's grip in a way the simulator cannot represent faithfully, which would invalidate the whole run"
      - id: outcome-only
        text: "Because outcome rewards are the only form the simulator can score, so a dense process reward would have to be invented by hand"
    correctOptionIds: [imitation-penalty]
    explanation: "imitation-penalty is correct: the robot found the push-cut manoeuvre because the training used a sparse binary outcome reward, so any physical strategy that verifiably achieved the goal was rewarded, whereas a process reward model trained to imitate standard human trajectories would have marked the unfamiliar sweep as an error and steered the policy back towards the demonstrations. no-goal-gradient, invalid-grip and outcome-only each invent reasons the experiment does not support. Lesson section: reward design, and the open exploration under outcome rewards experiment."
  - id: "c1760f01-82aa-4d55-9521-0252e280edf9"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does on-policy distillation do that ordinary distillation does not?"
    options:
      - id: weak-teacher
        text: "It distils from a weaker teacher to a stronger student, using the fact that verification is easier than generation to unlock latent capability"
      - id: compression
        text: "It compresses a large teacher into a small student by post-training the student on the teacher's outputs over a fixed corpus"
      - id: teacher-learns
        text: "It trains the teacher on the student's own rollouts, so that the teacher improves alongside the student during the run"
      - id: visited-states
        text: "It supervises the student on the states the student actually visits, turning one rollout into token-level supervision"
    correctOptionIds: [visited-states]
    explanation: "visited-states is correct: on-policy distillation expands the terminal scalar of a rollout into supervision at every token the student actually produced, on states it actually reached, which is dense and sample-efficient in a way ordinary distillation is not. weak-teacher describes the weak-to-strong research, which the chapter treats as a separate finding, compression is ordinary distillation, and teacher-learns inverts the direction of the knowledge flow. Lesson section: distillation, and on-policy distillation."
  - id: "cb22db2c-5f92-4452-ae45-a5f486508db7"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are among the dimensions the chapter uses when it talks about reward design? Select every correct answer."
    options:
      - id: source
        text: "Where the reward comes from — rules, human preference, or model judgement"
      - id: timing
        text: "When the reward is given — at the outcome or along the process"
      - id: information
        text: "How much information the reward has to express — a scalar, a vector, or a generative diagnosis"
      - id: hosting
        text: "Which vendor hosts the reward model that produces the signal"
    correctOptionIds: [source, timing, information]
    explanation: "source, timing and information are correct: the chapter works through where a reward comes from, when it is paid, and how much it has to say, and it ends that sequence with the observation that a correct outcome is not enough because path constraints matter too. hosting is not one of the chapter's dimensions. Lesson section: reward design, turning task goals into learning signals."
  - id: "435e600a-cb24-4444-8862-e21b4d402ba1"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list as ways of mitigating catastrophic forgetting when adapting an Agent to a new task? Select every correct answer."
    options:
      - id: mix-general-data
        text: "Blend in roughly twenty percent general data, so the new task's share does not crush the old capability"
      - id: early-stop
        text: "Stop the fine-tuning as soon as the format is stable, rather than running it until the training loss bottoms out"
      - id: small-rank-kl
        text: "Keep a small LoRA rank and hold the policy near the reference model with a KL penalty"
      - id: full-finetune
        text: "Replace the LoRA adapter with a full fine-tune, so the new capability is written permanently into the base weights"
    correctOptionIds: [mix-general-data, early-stop, small-rank-kl]
    explanation: "mix-general-data, early-stop and small-rank-kl are correct: the chapter's list is data mixing at roughly twenty percent general data, restrained training volume that stops once the format is stable, a small rank for RL with the policy held near the reference by a KL penalty, freezing key components, attaching separate adapters per task, and regression-testing on general benchmarks. full-finetune is wrong, because replacing the adapter with a full fine-tune is exactly the change that raises the risk of forgetting rather than reducing it. Lesson section: post-training practical takeaways."
  - id: "e4d7d07b-a143-4d09-8cfa-27875d964d2e"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter says that when a real environment cannot be built, letting a model play the environment is a viable substitute, because the simulator's bias then becomes the ceiling on the training rather than an obstacle to it. Is that what the chapter says?"
    answer: false
    explanation: "False — using a model to simulate the environment is viable, but the chapter is explicit that the simulator's bias remains the ceiling on what the training can achieve. The simulator's bias is still the ceiling; it is not neutralised by using it. The chapter adds that the reward must stay anchored to programmatically verifiable real state, with simulator or judge scores treated as auxiliary signals whose correlation with real outcomes is audited periodically. Lesson section: RL environments, from evaluation to simulation."
  - id: "68b16cb0-11e6-414f-9cc8-5ec00778423d"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter says two judgments are worth remembering more than any algorithm. What are they, and what does each one say?"
    sampleAnswer: "The first is that data and environment matter more than algorithms: the mid-training corpus decides which gaps in the foundation get repaired, the SFT demonstrations decide whether the protocol is stable, and the environment and reward decide what RL can explore. The second is that RL's main bottlenecks today are sample efficiency and distribution consistency. On-policy distillation expands one rollout's terminal scalar into token-level supervision on the states the student actually visits, and RLVP turns otherwise wasted environment feedback into a learnable signal, while genuinely on-policy rollouts reduce the bias and variance of importance correction."
    explanation: "A strong answer names both judgments, says what each one rests on — the first on the data and the environment rather than the method, the second on the cost of samples and on the consistency of the rollouts — and brings in the two techniques the chapter offers against them. An answer that gives only the first has missed the judgment the chapter says is the more operational one. Lesson section: chapter summary."
  - id: "8d769d66-e5b3-432b-8c7d-7ab36369a6f3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the chapter insists that a correct final outcome is not a sufficient reward signal, and describe the remedy it proposes."
    sampleAnswer: "An outcome-only signal says the episode ended well and nothing about how, so a policy that reached the goal by breaking the rules is rewarded exactly as much as one that reached it properly — which is how rule-breaking shortcuts inflate an apparent success rate and become the breeding ground for reward hacking. The remedy the chapter takes from RLVP is to reward the outcome and penalise the path: individual wrong actions such as tool calls are easy to verify and can be docked per action, while a correct outcome still earns the reward. The chapter also warns against making path constraints too dense, because the superior push-cut strategy was only discoverable because outcome rewards had left the exploration space open."
    explanation: "A strong answer states the failure the outcome-only signal permits, gives the shape of the remedy — reward the outcome, penalise the verifiable wrong steps, add process rewards where the steps are judgeable — and includes the caution about over-constraining the path. An answer that only says the reward should be richer has not explained why the path matters. Lesson section: a correct outcome is not enough, path constraints and RLVP."
```
