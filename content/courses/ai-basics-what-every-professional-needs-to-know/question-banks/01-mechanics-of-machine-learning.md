---
id: "07be516c-493d-4171-9ed7-c4bbc34a0358"
title: "How Machines Learn: Question Bank"
description: "Practice questions for How Machines Learn: rules versus data, training, filters, inference, and bias."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - machine-learning
  - neural-networks
  - computer-vision
  - algorithmic-bias
courseId: "bc47c0e7-30d1-4561-b517-a587dc37c06a"
comments: false
---

Study notes based on the LinkedIn Learning course "AI Basics: What Every Professional Needs to Know". These questions practice the chapter "How Machines Learn: Rules, Data, Filters, and Bias".

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "5daec666-0e17-4181-a23b-29a0de44a6b1"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how machine learning flips the way traditional programming works."
    sampleAnswer: "In traditional programming a person writes the rules, and the computer applies them to data to produce answers. In machine learning you give the computer data together with the correct answers, and it works out the rules (the patterns) by itself."
    explanation: "A good answer names both directions: rules plus data in, answers out for traditional programming; data plus answers in, rules out for machine learning. Bonus: it says this suits tasks whose rules are hard to write down, such as recognizing a cat. Lesson section: Step 1: From writing rules to learning from examples."
  - id: "1b771b87-0b9d-49c9-ac37-26947de2d72a"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe what happens during training, and say what the word model means."
    sampleAnswer: "The computer guesses a formula, checks its outputs against the known answers, and when they are wrong it adjusts the formula's numbers and tries again, many times, until it is right most of the time. The model is the learned set of numbers (parameters) that turns an input into a prediction."
    explanation: "Look for the loop (guess, check, adjust, repeat) and for the model defined as the learned parameters, not as a program someone wrote by hand. Lesson section: Step 2: Training is guess, check, adjust."
  - id: "84dfa8bf-364f-44bd-903c-9a9af003367f"
    revision: 1
    status: active
    type: free-recall
    prompt: "A neural network is given a small 28 by 28 grayscale photo of a shirt. Explain what the network actually receives and how its layers turn that into the answer shirt."
    sampleAnswer: "It receives a grid of numbers, one per pixel, each a brightness from 0 for black to 255 for white; a 28 by 28 image is 784 numbers. The layers act like a stack of filters: early ones respond to simple features such as lines, later ones combine them into curves and shapes, and the last layer combines the shapes into a decision. Training tunes the parameters that set those filters."
    explanation: "A complete answer covers the input as numbers (with the 0 to 255 brightness range), the layered filters building simple features into complex ones, and training as tuning the filter parameters. Lesson section: Step 3: How a network sees, one filter at a time."
  - id: "6e23d279-7ca8-4dee-ad7e-a1439225ded6"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the difference between training and inference, and why it matters for a company deciding whether to build its own model."
    sampleAnswer: "Training is when the model learns: it is slow, needs lots of data and computing power, and can cost a great deal. Inference is using the trained model to answer new inputs, which is fast and cheap by comparison. Because building is the expensive part, most companies can use an existing model instead of training one, while remembering the model is only as good as what it learned."
    explanation: "Key ideas: training is the costly learning phase; inference is the cheap, quick use phase; so most organizations use existing models; and a model is limited by its training data. Lesson section: Step 4: Two lives of a model: training and inference."
  - id: "5a0c011e-4e96-4aef-bdf0-ee790221735c"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the horse-and-human example, explain how a model can score very high accuracy and still fail on real inputs."
    sampleAnswer: "All the human images in the training data were computer-generated figures. The model scored about 99 percent, yet it called a real person a horse: it had learned to recognize the computer-generated humans, not people. A model learns whatever pattern its data contains, so flawed data produced a flawed model."
    explanation: "A strong answer names the hidden feature of the data (every human was computer-generated), says the model learned to recognize that instead of the intended concept, and concludes that bias often starts in the data. Lesson section: Step 5: Bias comes from the data."
  - id: "774aefbf-3b76-4267-934d-22a399f13430"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which task is the best fit for machine learning rather than hand-written rules?"
    options:
      - id: a
        text: "Applying a fixed tax rate to every income above a stated threshold"
      - id: b
        text: "Telling cats from dogs in photos, given thousands of labelled examples"
      - id: c
        text: "Making a game ball bounce back whenever it touches the edge of the screen"
      - id: d
        text: "Adding up the invoice amounts in one column at the end of each month"
    correctOptionIds: [b]
    explanation: "b is correct: there is no complete rule for what a cat looks like, but labelled examples let a learning algorithm find the pattern. a: a tax threshold is a clear rule, so ordinary programming fits. c: bouncing on contact is a simple rule. d: summing a column is a fixed calculation. Lesson section: Step 1: From writing rules to learning from examples."
  - id: "3c2042b7-e905-4396-abc4-ba7751b95c40"
    revision: 1
    status: active
    type: single-choice
    prompt: "The pairs are x = -1, y = -3; x = 0, y = -1; x = 1, y = 1; x = 2, y = 3. What does the pattern predict when x = 10?"
    options:
      - id: a
        text: "y = 20, because each y is double its x"
      - id: b
        text: "y = 21, because each y is 2x + 1"
      - id: c
        text: "y = 9, because y rises by one each time x does"
      - id: d
        text: "y = 19, because each y is 2x - 1"
    correctOptionIds: [d]
    explanation: "d is correct: every pair fits y = 2x - 1, so x = 10 gives 2 times 10 minus 1, which is 19. a: y = 2x gives -2, 0, 2, 4, one too high each time. b: y = 2x + 1 is two too high each time. c: y rises by two, not one, for each step in x. Lesson section: Step 2: Training is guess, check, adjust."
  - id: "6181ad95-5b5a-4b42-841d-78573e78c5a4"
    revision: 1
    status: active
    type: single-choice
    prompt: "The same shirt is photographed once in dim light and once in bright light. Why is that hard for a fixed rule but manageable for a trained neural network?"
    options:
      - id: a
        text: "The pixel numbers change completely, but layered filters can learn to respond to the shape"
      - id: b
        text: "The camera stores dim photos in a different file format that ordinary programs cannot open"
      - id: c
        text: "A network sees colors the way a person does, so a change in lighting makes no difference to it"
      - id: d
        text: "The bright photo has more pixels than the dim one, so the network first resizes both images"
    correctOptionIds: [a]
    explanation: "a is correct: lighting changes every pixel value, so a rule written for one set of numbers breaks, while trained layers of filters can respond to the shape instead of the exact values. b: the difficulty is in the numbers, not the file format. c: a network receives numbers, not colors as a person sees them, and lighting does change those numbers. d: lighting changes the brightness values, not the number of pixels. Lesson section: Step 3: How a network sees, one filter at a time."
  - id: "8fcb1e8a-68cd-4682-9af2-7c8f706cfcf1"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team wants AI to draft summaries of its support tickets. Based on the difference between training and inference, what is the sensible first step?"
    options:
      - id: a
        text: "Train its own model first, because a model has to learn the team's style before it can summarize"
      - id: b
        text: "Retrain the model on each new batch of tickets, because every summary needs fresh training"
      - id: c
        text: "Use an existing trained model, because using a model costs far less than training one"
      - id: d
        text: "Build a model from scratch, because only a custom model can be tried out on its own tickets"
    correctOptionIds: [c]
    explanation: "c is correct: summarizing is inference, which is cheap compared with training, and capable models already exist, so the team can hire the graduate. a: training is the slow, expensive phase that most teams do not need. b: answering is inference and does not repeat training. d: an existing model can be tried on the team's tickets too; building one is the costly path. Lesson section: Step 4: Two lives of a model: training and inference."
  - id: "ed4ada4d-4ace-412b-8e42-add8529e0edc"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the horse-and-human example, the model reached about 99 percent accuracy but called a real person a horse. What had it learned?"
    options:
      - id: a
        text: "To spot background scenery, such as the fields behind the horses"
      - id: b
        text: "To recognize horses well, but to guess at random whenever it saw a person"
      - id: c
        text: "To memorize all 1,000 training images without finding any general pattern"
      - id: d
        text: "To recognize the computer-generated human figures, not real people"
    correctOptionIds: [d]
    explanation: "d is correct: every human in the data was computer-generated, and the model learned to recognize those figures rather than people. a: the example identifies the learned feature as the computer-generated look of the humans, not the background. b: half the images were humans, so guessing at random on every human image would put accuracy well below 99 percent. c: the example says it learned a pattern, the computer-generated look, which it then applied to a new photo. Lesson section: Step 5: Bias comes from the data."
  - id: "bfd66a1f-0cc9-4292-b1b1-f6f22b46e2fd"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: training a neural network changes the numbers, called parameters, that set what its filters respond to."
    answer: true
    explanation: "True. When the network gets an answer wrong, training nudges its parameters slightly and repeats many times; those parameters are what set the filters. Lesson section: Step 3: How a network sees, one filter at a time."
  - id: "0618ad79-7a12-41dd-b2c1-7be8ab4e9411"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: if a model reaches about 99 percent accuracy on its data, it must have learned the concept its labels describe."
    answer: false
    explanation: "False. The horse-and-human model reached about 99 percent and had learned to recognize the computer-generated humans, not people. High accuracy on flawed data can hide the wrong pattern. Lesson section: Step 5: Bias comes from the data."
  - id: "da273fe2-4a8d-4050-ad69-0ddac825a43f"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are warning signs that training data could produce a biased model? Select all that apply."
    options:
      - id: a
        text: "Every example of one group shares a feature unrelated to the label, such as being computer-generated"
      - id: b
        text: "The data was collected in one place, but the model will be used in many places"
      - id: c
        text: "The examples are historical records that reflect who was chosen in the past"
      - id: d
        text: "The dataset contains a very large number of examples in total"
      - id: e
        text: "Each group was photographed with the same cameras, settings, and backgrounds"
    correctOptionIds: [a, b, c]
    explanation: "a, b, and c are correct. a: a shared side feature gives the model a shortcut, as in the horse-and-human example. b: data from one place may not represent other places, as with the single-hospital model. c: old records can teach past patterns, as with the hiring model. d: a large dataset can still be skewed, so size alone is not a warning sign. e: capturing every group the same way does not by itself create a side difference between the groups. Lesson section: Step 5: Bias comes from the data."
```
