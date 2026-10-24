---
id: "6b892240-c620-4090-ad87-66e175d33724"
title: "How Machines Learn: Rules, Data, Filters, and Bias"
description: "Step by step: how machine learning finds rules from examples, what training and a model are, how a network turns pixels into a decision, why using AI is cheaper than building it, and where bias comes from."
type: lesson
publish: true
status: active
created: "2026-09-30"
updated: "2026-10-18"
tags:
  - machine-learning
  - neural-networks
  - computer-vision
  - algorithmic-bias
courseId: "bc47c0e7-30d1-4561-b517-a587dc37c06a"
lessonOrder: 2
estimatedMinutes: 25
comments: false
---

# How Machines Learn: Rules, Data, Filters, and Bias

> [!note] Study notes based on the LinkedIn Learning course "AI Basics: What Every Professional Needs to Know". Original explanations; not affiliated with or endorsed by LinkedIn or the course author.

## What you will be able to do

- Explain how machine learning differs from traditional, rule-based programming.
- Describe training as a loop of guessing, checking, and adjusting, and say what a "model" is.
- Explain how a computer receives an image as numbers and how a network's layers work like filters.
- Tell training apart from inference and explain why most organizations use existing models.
- Explain how flawed or unrepresentative data produces a biased model.

## Before you start

This chapter moves from the hype around AI to the mechanics: how it actually works under the hood. None of it needs advanced math.

## Step 1: From writing rules to learning from examples

For most of computing history, getting a computer to do something meant writing the rule yourself. A game needs "if the ball hits the wall, bounce." A payroll system needs "if income is over a threshold, apply this tax rate." This is **traditional programming**: you supply the rules and the data, and the computer produces the answers.

That works only when you can describe the task as clear rules. Many useful tasks resist that. Try writing rules that recognize a cat in a photo and you run out of road quickly.

**Machine learning** flips the arrangement. You supply the data _and_ the answers, and the computer works out the rules. Show it thousands of photos labelled "cat" and thousands labelled "dog", and it searches the pixels for patterns that separate the two. Programming by instruction becomes **teaching by example**.

### Worked example

Compare two tasks.

1. _Apply a tax rate._ The rule is easy to state: "if income is above the threshold, use rate R." You write it once and you are done. Traditional programming fits.
2. _Recognize a cat._ First attempt: "it has ears and whiskers." A dog has those too. Second attempt: "it meows." A photo makes no sound. Every rule you add has exceptions.
3. Switch approaches: collect many labelled photos of cats and of dogs, and let a learning algorithm find the pattern that separates them. You never write the cat rule; the computer derives its own version from the examples.

The test for which approach fits: _can you write the rule down completely?_ If yes, write it. If not, and you have plenty of labelled examples, machine learning is a candidate.

### Check yourself

```knowledge-quiz
schemaVersion: 1
quizId: "b473c144-0c5c-4ae1-a73b-3f4ca0cc16eb"
title: "Check yourself: rules or learning?"
questionBankId: "07be516c-493d-4171-9ed7-c4bbc34a0358"
questionIds:
  - "774aefbf-3b76-4267-934d-22a399f13430"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-basics-what-every-professional-needs-to-know/question-banks/01-mechanics-of-machine-learning|How Machines Learn: Question Bank]].

## Step 2: Training is guess, check, adjust

Here is machine learning at its smallest. Look at these pairs and find the pattern:

| x   | y   |
| --- | --- |
| −1  | −3  |
| 0   | −1  |
| 1   | 1   |
| 2   | 3   |

What is y when x is 10? Most people answer 19, because each y is two times x, minus one: **y = 2x − 1**. You took data (the x values) and answers (the y values), found the rule, and used it to predict a case you had not seen. That is the whole idea of machine learning, done in your head.

A computer gets there by **training**: it makes a guess at the formula, checks the guess against the known answers, and when the guess is wrong it adjusts and tries again, many times over, until it is right most of the time. The adjustable numbers in the formula are called **parameters**. The finished set of parameters, the thing that turns a new x into a predicted y, is the **model**.

Real systems use the same loop at a much larger scale: instead of one input there may be a million numbers (the pixels of an image), and instead of two adjustable numbers there may be billions.

### Worked example

Watch a guess-check-adjust loop find y = 2x − 1. The formula has two parameters, the multiplier and the number added.

1. **Guess:** y = 1x + 0. **Check:** for x = 2 it predicts 2, but the answer is 3; for x = −1 it predicts −1, but the answer is −3. Wrong. **Adjust:** the predictions are too high for small x and too low for large x, so the multiplier is too small. Raise it.
2. **Guess:** y = 2x + 0. **Check:** it predicts −2, 0, 2, 4 against answers −3, −1, 1, 3. Every prediction is exactly 1 too high. **Adjust:** lower the added number by 1.
3. **Guess:** y = 2x − 1. **Check:** predictions −3, −1, 1, 3 match every answer. Stop.
4. **Use the model:** for x = 10, predict 2 × 10 − 1 = 19.

A training algorithm automates the same idea: measure how wrong the guess is, nudge the parameters in the direction that reduces the error, repeat. Real systems adjust all their parameters together rather than one at a time.

### Check yourself

```knowledge-quiz
schemaVersion: 1
quizId: "5468d356-ec5d-40a4-8a30-4cfb3b1be050"
title: "Check yourself: find the pattern"
questionBankId: "07be516c-493d-4171-9ed7-c4bbc34a0358"
questionIds:
  - "3c2042b7-e905-4396-abc4-ba7751b95c40"
```

## Step 3: How a network sees, one filter at a time

**What the computer receives.** To a computer, an image is a grid of numbers, like a spreadsheet. Take a small grayscale picture of a shirt, 28 pixels wide and 28 pixels tall. That is 28 × 28 = 784 pixels, and each pixel is a single number from 0 (black) to 255 (white), with shades of gray in between. When the picture goes into a neural network, the network does not get a "picture" at all; it gets a list of 784 numbers.

**What the network does with them.** The name "neural network" comes from biology, but a better mental picture is a stack of sieves. Sifting sand for gold, you might use a coarse mesh to catch rocks, a finer one for pebbles, and a very fine one for gold dust; each layer keeps something different. A network's layers work the same way. To recognize a shoe, an early layer might respond to straight lines, the next to curves built from those lines, the next to shapes such as a sole or a lace, and the last puts them together: "sneaker."

**What training changes.** The filters are set by the network's parameters. When the network calls a shoe a boot, training marks the answer wrong and nudges the parameters slightly, then repeats many times. Training a network means tuning its filters.

This is also why vision was hard for so long. Shadows, angles, and lighting change the pixel numbers completely: a shirt in dim light produces very different numbers from the same shirt in bright light. Layered filters let a trained network respond to the shape rather than the exact values.

### Worked example

Follow one image through the pipeline.

1. **Count the inputs.** A 28 × 28 grayscale image gives 28 × 28 = 784 numbers.
2. **Read a few values.** A pixel of 0 is black, 255 is white, and 128 is a mid gray. A dark item on a light background shows up as low numbers where the item is and high numbers around it.
3. **Spot a pattern.** If a band of low numbers runs down the middle with high numbers on either side, that layout of values is the kind of pattern a network can learn to associate with "trousers".
4. **Change the lighting.** Darken the whole photo and every number drops, yet the layout (dark band, lighter sides) is still there. Filters that respond to the layout, not the raw values, still recognize trousers.

### Check yourself

```knowledge-quiz
schemaVersion: 1
quizId: "da0b1b37-25a9-4da3-8777-63d18ca7f800"
title: "Check yourself: images and filters"
questionBankId: "07be516c-493d-4171-9ed7-c4bbc34a0358"
questionIds:
  - "6181ad95-5b5a-4b42-841d-78573e78c5a4"
  - "bfd66a1f-0cc9-4292-b1b1-f6f22b46e2fd"
```

## Step 4: Two lives of a model: training and inference

A model has two very different phases, and mixing them up causes a lot of confusion.

**Training** is like medical school. It takes a long time, costs a great deal, needs huge amounts of study material (data) and big facilities (computing power), and burns a lot of energy. The student keeps making mistakes and being corrected. For the largest AI models, developers can spend billions of dollars and months of computing time on this phase.

**Inference** is the doctor at work. The graduate no longer needs the library; they apply what they learned and reach a diagnosis quickly. Every time you ask a chatbot a question, the model is doing inference: applying what it learned during training to your input. Compared with training, each use is fast and cheap.

Why it matters: building a capable model is hard and expensive, while using one is cheap and widely available. Most people and organizations do not need to train a model from scratch; they can "hire the graduate" and use an existing one. But a model, like a doctor, can only be as good as its training.

### Worked example

A team wants AI to draft summaries of its support tickets. Decide what it needs.

1. **Name the phase.** Summarizing a ticket is applying a skill, so the daily work is inference.
2. **Ask whether a capable model already exists.** General-purpose language models can already summarize text, so the team can use one instead of training its own.
3. **Compare effort.** Training its own would mean collecting large amounts of data and paying for long, expensive computing runs. Using an existing model costs far less than training one.
4. **Keep the caveat.** The model's quality depends on what it learned in training, so it makes sense to try it on the team's own tickets before relying on it.

### Check yourself

```knowledge-quiz
schemaVersion: 1
quizId: "4f26db3c-8d13-4490-8354-ae8ab6b38b51"
title: "Check yourself: training or inference?"
questionBankId: "07be516c-493d-4171-9ed7-c4bbc34a0358"
questionIds:
  - "8fcb1e8a-68cd-4682-9af2-7c8f706cfcf1"
```

## Step 5: Bias comes from the data

A model is a pattern matcher: it learns whatever patterns the data contains, including ones you never intended. If the data is flawed, the model learns the flaw.

### Worked example

An example from the course shows how this happens.

1. **The data.** A training set held 500 images of horses and 500 images of humans. The human images were computer-generated (CGI) characters, because hiring photographers was not affordable.
2. **The result.** The trained model reached about 99% accuracy. Then it was shown a photo of a real person, and it answered "horse."
3. **Find the shortcut.** Ask: _apart from the label, what else differs between the two groups?_ Every human in the data was a polished, computer-generated figure. A real person, with messy hair and imperfections, probably looked more like the noisy texture of the horse images than like those figures. The model had learned to recognize the computer-generated humans, not people.
4. **The lesson.** The model did exactly what it was trained to do. Nothing malicious happened; the data taught the wrong pattern.

The same mechanism has serious consequences. A hiring model trained on decades-old résumés can learn that successful managers are mostly men, because that is what the old records show. A medical model trained on data from a single hospital may not work for patients in another city or country. Bias often starts in the data: garbage in, garbage out. That is why understanding, cleaning, and preparing the data in your own field is such a valuable skill.

### Check yourself

```knowledge-quiz
schemaVersion: 1
quizId: "51beb931-51ea-4f25-9be8-4fe6bf54cda6"
title: "Check yourself: where bias comes from"
questionBankId: "07be516c-493d-4171-9ed7-c4bbc34a0358"
questionIds:
  - "ed4ada4d-4ace-412b-8e42-add8529e0edc"
```

## Common mistakes

> [!warning] "A neural network is an artificial brain"
> The name comes from biology, but the mechanism is layers of adjustable mathematical filters. Picture a stack of sieves, not a mind.

> [!warning] "The computer sees the picture the way I do"
> It receives a grid of numbers. Change the lighting and every number changes, which is why vision was hard until layered filters could learn shapes.

> [!warning] "High accuracy means the model learned the right thing"
> The horse-and-human model scored about 99% and had learned to recognize the computer-generated humans, not people. Always ask what else differs between the groups in your data.

> [!warning] "Bias means someone programmed prejudice"
> Bias often starts in the data: old records, one location, unrepresentative samples. It is math, not malice.

> [!warning] "To use AI we must build our own model"
> Training is the expensive phase. Most needs are met by using an existing model and testing it on your own data.

## Say it in one breath

Traditional programs follow rules people write; machine learning finds the rules itself from examples and their answers. It does this by training: guess, check against the answers, adjust, repeat, until the parameters, the model, turn inputs into the right outputs. A neural network is a stack of adjustable filters that turns raw numbers, such as the 784 pixel values of a small image, into a decision. Training is slow and expensive, while using a trained model is fast and cheap, so most people use existing models. And because a model learns whatever patterns its data contains, flawed data produces a biased model.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "b5a889fc-d38f-4bd3-8ceb-d6c162c04a6e"
title: "Chapter quiz: how machines learn"
questionBankId: "07be516c-493d-4171-9ed7-c4bbc34a0358"
questionIds:
  - "5daec666-0e17-4181-a23b-29a0de44a6b1"
  - "1b771b87-0b9d-49c9-ac37-26947de2d72a"
  - "84dfa8bf-364f-44bd-903c-9a9af003367f"
  - "6e23d279-7ca8-4dee-ad7e-a1439225ded6"
  - "5a0c011e-4e96-4aef-bdf0-ee790221735c"
  - "0618ad79-7a12-41dd-b2c1-7be8ab4e9411"
  - "da273fe2-4a8d-4050-ad69-0ddac825a43f"
```
