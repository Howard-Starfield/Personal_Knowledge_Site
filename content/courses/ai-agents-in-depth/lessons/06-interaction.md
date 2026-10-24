---
id: "d33a2223-7cca-49f0-823f-56d472c79b71"
title: "Chapter 6: Interaction: Expanding the Observation and Action Spaces"
description: "Async & event-driven processing, millisecond-scale voice, Computer Use (GUI), and physical robotics (VLA)."
type: lesson
publish: true
status: active
created: "2026-09-14"
tags:
  - ai-agents
  - interaction
  - voice-agents
  - computer-use
  - robotics
  - vla
courseId: "e6e1418a-c0a0-4902-a7d4-b4983a207446"
lessonOrder: 7
estimatedMinutes: 50
comments: false
---

# Chapter 6: Interaction: Expanding the Observation and Action Spaces

Chapter 1 made a claim: when the underlying model is fixed, the most effective system-engineering lever for improving an Agent's task performance is usually to redefine or expand its **observation space** and **action space**. Chapters 2 through 5 have been cashing that claim out—context engineering decides what goes into the observation, memory and knowledge bases stretch the observation across sessions, tools define what the Agent can do, and code generation lets it create new actions of its own.

But all of these expansions happened under one shared premise: **the Agent and the world take turns speaking**. The user finishes a sentence, the Agent thinks for a while, calls a few tools, and replies; while it is thinking, the world is assumed to stand still. The premise is so natural that it is rarely written down as an assumption at all.

This chapter removes exactly that premise.

## Two Axes: Modality and Timing

Lay the observation space and the action space out flat and each turns out to have two directions in which it can be expanded.

- **Modality** decides the **form** of observation and action: does the Agent only read text, or can it also hear sound, see the screen, and sense torque; can it only emit tokens, or also speak, click, and drive joints.
- **Timing** decides the **rhythm** of observation and action: does the Agent go and fetch an observation, or does the world push it; must an action finish within one turn, or may it span turns, be interrupted midway, and be preempted by something more urgent.

The previous chapters expanded the **content** of these two spaces; this chapter expands their **modality** and **timing**:

|                             | Expanding the observation space                 | Expanding the action space               |
| --------------------------- | ----------------------------------------------- | ---------------------------------------- |
| **Content** (Chapters 2–5)  | Context engineering, memory and knowledge bases | Tools, code generation                   |
| **Modality** (this chapter) | Voice, screen, physical sensors                 | Speaking, clicking, joint motion         |
| **Timing** (this chapter)   | The world pushes, continuous streams            | Across turns, interruptible, preemptible |

**Turn-taking is an interaction convention of the model and its interface, not a property of the environment.** Early tool-calling interfaces generally organized messages into synchronous rounds: a question was followed by an answer, and tool results had to be supplied before reasoning continued. The real environment does not wait for the model to react: mail arrives while it is thinking, the user cuts in mid-sentence, a page changes between screenshots, and a cup is knocked over while the arm reaches for it. This convention is changing too: as of September 2026, GPT-6 Astra offers native asynchronous tool calling and the ability to add user instructions mid-turn. This chapter therefore covers both native support and compatibility with existing synchronous interfaces.[^ch6-22][^ch6-23]

| Scale                | Scenario               | Change on the observation side                             | Change on the action side                                   |
| -------------------- | ---------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Seconds — days       | Async and event-driven | The world wakes the Agent (mail, timers, callbacks)        | Actions span turns: start now, finish later on an event     |
| 10 ms — 1 s          | Voice                  | Listen while speaking, without waiting for a full sentence | Think while speaking, interruptible, revisable midway       |
| Sub-second — seconds | Computer Use           | The screen keeps changing between frames                   | After acting, reality must be re-confirmed against the plan |
| Milliseconds         | Robotics               | Sensors stream back continuously                           | Actions are chunked: plan a little at a time, preemptible   |

## Async and Event-Driven: When the World Comes Looking for You

The perception, execution, and collaboration tools discussed in Chapter 4 are all invoked proactively by the Agent. How should an Agent respond to external events that may arrive at any time? This requires an event-driven asynchronous architecture. The two remaining tool classes from Chapter 1—event-trigger tools and user-communication tools—depend on this architecture, so they are discussed here as well.

The modality does not change in this section—it is still text; only the timing changes. This is the first step out of the turn-based world of the previous five chapters.

### Why Asynchrony is Needed

Let's start with an analogy to explain why asynchrony is needed. Synchronous means "do one thing before you can do the next," while asynchronous means "multiple things can happen concurrently." A traditional synchronous Agent architecture is like a single checkout counter at a store—it can only handle one customer at a time, and only calls the next number after finishing with the current one. A truly intelligent assistant is more like a flexible secretary—with multiple pending items on the desk (emails, phone calls, visitors), the secretary decides which to handle first based on urgency, and can pause and switch to a more urgent task mid-way. In synchronous mode, the Agent either has to wait for a background task to complete before talking to the user, or wait for the conversation to end before processing a newly arrived event. It cannot deliver the core capabilities a real assistant scenario requires:

- **Asynchronous execution is the norm**—Many tasks require long runtimes and should not block user interaction.
- **Dynamic judgment of event priority**—Not all events are equally important. The Agent needs to intelligently choose a handling strategy: cancel the current operation (urgent), add it to a queue (routine), or process in parallel (independent lightweight query).
- **Fluency in interruption and resumption**—An interrupted conversation or task should be able to resume naturally.

When applying the asynchronous paradigm to an LLM, first check whether the model and API support this message timing. Some interfaces require all tool results before work can continue; others already allow tools to remain pending while the model keeps working and accepts user updates during generation. The former need event queues, task handles, and a compatibility layer; the latter can use native asynchronous protocols directly. Both still require the application to manage event sources, tool lifecycles, and result ownership. Using `asyncio` in the code alone does not establish that the model has native asynchronous capabilities.

To solve this, we need an **event-driven asynchronous Agent architecture**. Technically, this means the system no longer actively and repeatedly checks for "new messages" (this is polling, which is inefficient), but instead automatically triggers processing logic when a new message arrives. All inputs, outputs, thought processes, and external interactions are uniformly modeled as an event stream—a sequence of event records arranged on a timeline. Figure 6-1 shows the overall architecture of an event-driven asynchronous Agent, illustrating the relationship between event sources, the event queue, and the Agent processing flow.

![Figure 6-1: Event-Driven Asynchronous Agent Architecture](images/fig6-1.svg)

### Implementing Event-Driven Mechanisms in OpenClaw

The open-source framework OpenClaw receives multi-channel messages through a Gateway control plane and routes them to the Agent runtime. It provides three built-in event-driven mechanisms:

- **Hooks**: Respond to events in the Agent's lifecycle, such as session creation and reset, similar to event triggers in GitHub Actions
- **Cron (scheduled-task scheduler)**: Execute periodic tasks according to cron expressions (a widely used syntax for scheduled tasks in Unix systems, e.g., `0 9 * * 5` means 9 AM every Friday)
- **Heartbeat (Heartbeat Daemon)**: Wakes up the Agent every N minutes to check whether anything requires attention

These three mechanisms give OpenClaw Agents the appearance of autonomy—even with the user offline, the Agent can generate reports on schedule, check system status, and handle routine chores. The Gateway already handles messages from built-in channels such as IM and the web interface in **push** fashion. Of the three mechanisms, only Cron and Heartbeat let the Agent act without a user message, and both are **time-driven**: Heartbeat checks at fixed intervals, Cron fires at preset times, and Hooks originate inside the OpenClaw framework rather than outside it.

The real gap is third-party event sources beyond the built-in channels: a new email, an external API callback, or an urgent notification. OpenClaw has no immediate ingress path for them, so the Agent cannot respond immediately and may only notice at the next Cron or Heartbeat tick.

This delay is unacceptable in many scenarios. Take **PineClaw** (Pine AI's OpenClaw plugin) as an example: Pine AI is an AI assistant that makes real phone calls on behalf of the user, with typical scenarios including negotiating bills, canceling subscriptions, and handling insurance claims. When a user initiates a Pine phone task through an OpenClaw Agent, Pine's voice AI will make the call on behalf of the user, but the user may need to intervene at any time during the call:

- **Real-time Identity Verification**: The customer service representative asks to verify the account holder's identity, and Pine needs the user to immediately provide a security code or one-time password (OTP)
- **Three-Way Call Confirmation**: The customer service representative asks to speak directly with the account holder, and Pine needs the user to answer the phone within seconds
- **Progress Sync and Decision Confirmation**: At a critical point in the negotiation (e.g., the other party proposes a price reduction), Pine needs the user to confirm whether to accept

With Heartbeat's periodic polling, the user might not get the notification while the representative is still waiting for the verification code; the representative hangs up and the call fails.

PineClaw's solution is a **Channel mechanism** that establishes a real-time event path between OpenClaw's Gateway and the Pine API. When a call connects, needs user input, or ends, the message is pushed immediately to the OpenClaw Agent, which handles it and notifies the user.

This case reveals the core value of an event-driven architecture for Agent frameworks: **true "proactive service" requires not only that the Agent can periodically check for events, but also that events can actively notify the Agent.** Unifying all inputs—user messages, tool returns, external callbacks, scheduled triggers—into an event stream, and driving the Agent's thinking and actions through an event loop, is the architectural foundation for achieving this goal. Under this architecture, we will first introduce the two tool categories directly related to events, as well as the virtual identity and isolated execution environment that support the Agent's independent actions, before discussing the specific design of the event handling mechanism.

### Event-Triggered Tools

Event-triggered tools are the entry points through which external events drive an Agent's actions. Without them, an Agent can only operate in a continuous loop of thinking, calling tools, and finally outputting a result, then waiting for the user's next input. To translate changes in the world into events an Agent can process, there are three common types of event-triggered tools.

**Timers** (`set_timer`) handle events tied to physical time. If an email goes unanswered, the Agent should follow up after a while to ask about progress; if a call is placed outside the recipient's business hours, it should retry during the next business window. Tools like OpenClaw and Claude Code therefore let an Agent wake itself at a specified time. **One-shot timers** handle tasks with a specific time: if a user asks on Saturday to “call the bank's mortgage department for a status update,” the Agent sets “call the bank next Monday at 10:00 AM,” and the timer triggers the call. **Recurring timers** handle periodic tasks, such as checking server health every hour. Some external services cannot push progress updates and must be polled; the recurring timer provides that polling. OpenClaw's Heartbeat is a systematized version of this mechanism and the basis of its “proactive service” capability.

**Background Task Monitoring** (`monitor_shell`) handles events from asynchronously executing tools or command-line tasks. Some command-line tasks run in the background for a long time, and the Agent needs to track their progress. If the Agent "stares at the command line," repeatedly calling a tool to poll for progress, it burns tokens; if it waits until the task has fully finished before thinking again, it misses critical problems as they unfold—and if the command hangs, it cannot intervene at all, stalling the whole task. Claude Code solves this by introducing a `monitor` tool, allowing the Agent to monitor new command-line output, including output that contains specific keywords.

**External Event Channels** (`connect_channel`) push external events like new emails, API callbacks, or IM messages to the Agent in real time. The Channel mechanism in PineClaw from the previous section is a typical implementation.

From a design perspective, event-triggered tools should define clear trigger conditions and filtering rules to prevent irrelevant events from waking the Agent and wasting computational resources. The event payload should contain sufficient context information to minimize the number of additional queries the Agent needs to make after being woken up.

### User Communication Tools

User communication tools arise as communication channels between Agents and users diversify. Many Agents, such as Claude Code and Manus, use a native ReAct loop: everything the Agent “says” (an assistant message) is sent directly to the user, who must open a specific session in the app to converse with it. The session often exposes the Agent's tool-call process.

OpenClaw breaks this pattern. Users need not perceive sessions or follow the details of tool calls; both user and Agent can send messages at any time instead of alternating one request with one response. This gives OpenClaw what many describe as a **“human-like presence”**, communicating asynchronously like a secretary. Rather than sending raw assistant messages, OpenClaw uses dedicated messaging tools whose messages can include images and files and can trigger push notifications based on urgency.

Beyond communicating with users through text, a growing number of Agents have **multimodal communication capabilities**, such as sending structured card messages or reminder emails. Some Agents have begun experimenting with **Generative UI**—using HTML and similar means to generate interactive interfaces that present information to the user in a friendlier way. At the design level, user communication tools should support asynchronous messaging (the user may not be online), provide read/unread status tracking, and keep messages consistent across channels.

**Multi-channel User Communication and Re-engagement.**

**An Agent's response should not be limited to a single channel; the notification mechanism also serves as a user re-engagement mechanism.** Message sending extends to instant messaging, SMS, email, phone calls, push notifications, and other channels. The Agent decides on the channel based on a combination of urgency, user status, content nature, and user preferences, ensuring important messages are not missed while avoiding redundant interruptions.

For long-running tasks, the Agent needs to proactively notify the user upon completion to bring the user's attention back. For periodic tasks (like daily summaries or weekly reports), notifications can help users develop a regular interaction habit.

User communication tools solve the problem of "how to reach the user." However, the identity the Agent assumes on these channels and the environment in which it performs actions on behalf of the user require a layer of identity and execution-environment infrastructure, which is the topic of the next section.

### Virtual Identity and Isolated Execution Environment

Chapter 4 opens with Samantha in _Her_ as an example, illustrating how an Agent uses tools to interact with the real digital world. Achieving such a general-purpose assistant forces a key architectural choice: should the Agent manage the user's personal accounts directly, or hold a virtual identity of its own? Direct management looks convenient, but one Agent error or compromise exposes the user's entire digital identity. The safer approach is to give the Agent an independent virtual identity—the way a secretary has their own office phone and mailbox—comprising dedicated communication accounts, storage, and computing environments, so the Agent can work on the user's behalf under a transparent, clearly declared identity. This transparency does not weaken trust; it can make communication more authentic.

Virtual identities need isolated execution environments. **Virtual computers** (VMs/containers) and **virtual phones** (Android emulators) give the Agent operating-system isolation and full desktop or mobile capabilities. First, a virtual computer can run around the clock regardless of whether the user's device is online and without disrupting the apps the user is operating. Second, an Agent error can at worst crash the virtual environment rather than the user's real device. Finally, isolation prevents the Agent from freely accessing the user's local files.

An independent identity also presents two practical challenges. First, there are **anti-bot mechanisms**: many websites use CAPTCHAs and IP reputation checks to block automated access. Virtual environments using data center IPs are easily identified; in practice, normal access often requires configuring a residential proxy network (which uses real household IPs). Second, **access to the user's real accounts**: when a task must log in as the user, use Human-in-the-Loop authentication—a VNC/RDP remote desktop where the user logs in personally, sees the full interface the Agent is operating, and understands why authentication is needed. The session token is then reused within its validity period to avoid interrupting the user repeatedly, balancing autonomy and security.

Data exchange between the Agent and virtual environments uses a **shared file system**: volume mounts such as `/workspace/shared` connect the Agent, virtual computer, and virtual phone. Data is passed by file-path reference rather than copied into context. For example, a user uploads a CSV to the shared directory; the Agent in the virtual computer analyzes it and saves a chart there; the Agent returns only the chart's path. Every handoff remains a lightweight path string.

Event-triggered tools allow the world to wake the Agent, user communication tools allow the Agent to reach the user, and virtual identities with isolated execution environments allow the Agent to act independently and auditably. The remaining question is: when multiple events converge on the same Agent instance simultaneously, how should they be handled?

### Event Handling Mechanism

A single Agent instance may face multiple events concurrently: a new message from the user, a result from a tool, a timer expiring, a collaboration request from another Agent. How these events are handled efficiently and correctly directly impacts performance and user experience.

The skeleton of this mechanism is the **event loop** from concurrent programming. Think of an asynchronous Agent as a long-running loop: each round takes a batch of events off the input queue, appends them to the trajectory, invokes the LLM once, executes the tools it decides to call, then returns to the top of the loop to wait for the next batch of events—the same structure as a Go goroutine reading messages from a channel and processing them round by round inside a `for { select { ... } }`.

In a traditional synchronous-interface implementation, **events are consumed at the boundaries of each round**. While the LLM is reasoning or a tool is executing, new events wait in a queue until the round reaches a **safe point**—the end of a stretch of reasoning or the return of a tool call. Native asynchrony allows new requirements to arrive while the model is still thinking or producing output, with the system choosing an appropriate moment to continue processing. Both have boundaries, managed by different layers. Cancelling a tool still requires its executor to respond to a cancellation signal, much like checking `ctx.Done()` in Go; receiving a “stop” message does not itself undo actions that have already occurred.

With this distinction in mind, we first use an event loop compatible with synchronous interfaces to explain three strategies: let events wait for the next natural safe point (queuing), create a safe point early (cancellation), or start another loop without waiting for the main loop's safe point (parallel processing). We return to native steering later.

**Structured Event Modeling.**

Handling requires understanding. A general-purpose Agent's input doesn't come only from the user—a third-party message is not sent by the user to the Agent, yet the Agent must understand it, weigh its importance, and decide whether to step in. This requires modeling each input as a **structured event** rich with semantics:

- **Source (who)**: The user themselves, a contact, a stranger, a system notification
- **Channel (how)**: Phone call, SMS, instant message, email, social media, timer trigger, asynchronous tool call result, command-line monitoring status update
- **Content (what)**: Message text, emotional tone, urgency, whether a reply is needed
- **Context (background)**: Whether it's a reply to a previous conversation or a new communication, its relevance to the current task

Taking a customer refund request email as an example, the structured event looks like this:

```json
{
  "source": { "type": "email", "sender": "client@example.com" },
  "channel": "gmail_webhook",
  "content": { "subject": "Refund Request", "body": "Order #12345, requesting a refund..." },
  "context": { "priority": "high", "customer_tier": "vip", "related_orders": ["#12345"] }
}
```

Only when these dimensions are clearly modeled as structured events can the Agent maintain a clear understanding in multi-party communication, avoiding mistaking user input for a tool result, or mistaking a tool result containing hidden instructions for a user command (prompt injection). The complexity of multi-threaded context management also requires the Agent to understand the relationships between multiple conversation threads—how a message from a third party affects the user's mood, the user's role transitions across different conversations, and when to synthesize information from different threads to provide advice.

The trigger ecosystem of workflow platforms such as n8n makes the point: webhooks, timers, email, database changes, file watchers—each trigger is one of the Agent's "senses" for perceiving the world. Once these heterogeneous events are modeled uniformly in a structured format, the Agent can handle stimuli from different sources in a consistent way; the urgency determination and processing strategies discussed below all rest on this unified modeling.

**Dynamic Processing Strategy Based on Urgency.**

Humans juggling multiple tasks adapt their strategy to urgency: an emergency makes them drop what they're doing; a routine to-do goes on the list for later. An Agent's event handling should show the same intelligence.

![Figure 6-2: Three Strategies for Asynchronous Event Processing](images/fig6-2.svg)

**Cancellation-Based Processing** is used for urgent events; its essence is **forcing a safe point early** for the urgent event: proactively interrupting the current step to turn this instant into a boundary at which the new event can be consumed. When an urgent event arrives (e.g., the user clicks "stop" or a supervisory system sends a high-priority instruction): (1) Stop the current operation—if the LLM is reasoning, immediately cancel the streaming response; if a synchronous tool is executing, send a cancel signal; (2) Drain the pending queue by removing all pending events; (3) Append those events together with the urgent event to the end of the trajectory; (4) Immediately re-invoke the LLM with the updated complete trajectory as input to assess the situation. For example, if the user inputs "Stop! I said the wrong thing" while the Agent is about to perform a potentially erroneous operation, the Agent will immediately see this new input, re-understand the true intent, and thus avoid executing the wrong action.

**Queued Processing** is used for routine events. When a non-urgent event arrives (e.g., an asynchronous tool returns a result or the user sends supplementary information): (1) Add the event to the end of the queue without interrupting the current operation; (2) Wait for the current operation to complete—let the LLM finish reasoning, let the synchronous tool finish executing; (3) When any tool call completes and returns a `tool.result`, check the queue. If the queue is non-empty, append all events to the trajectory at once; (4) The LLM processes the updated trajectory comprehensively. This enables batch processing, improving efficiency—for example, while the Agent is waiting for a search tool result, the user adds "only show results from the last month." This supplementary information enters the queue, and when the search results return, both events are presented to the LLM together, avoiding unnecessary round trips.

**Parallel Processing** is used for independent, lightweight queries. For example, while the Agent is analyzing a large amount of data, the user suddenly asks, "What's the weather like today?" Such queries have three characteristics: they are unrelated to the main task, require a quick response, and have low execution cost. Neither cancellation-based (would interrupt the important main task) nor queued processing (would make the user wait too long) is suitable. The system first assesses the query's independence and complexity, then executes it independently in a parallel reasoning session, calling necessary tools to generate a response and returning it immediately. The query and response are appended to the main task's trajectory, clearly marked as "executed in parallel with the main task" to avoid confusing the LLM.

**Urgency Determination.**

Urgent events: User interrupt (`user.interrupt`), supervisor instruction (`supervisor.instruction`), inter-Agent interrupt (`agent.interrupt`), external triggers marked as urgent (e.g., system alerts, payment failures).

Non-urgent events: Regular user input (`user.input`), Agent input (`agent.input`), tool results (`tool.result`), timer triggers (`timer.trigger`), regular external triggers.

Hardcoded rules have limitations; the semantics of the event dictate the handling method—"Stop immediately!" uses cancellation-based processing, "What's the weather like today?" uses parallel processing, "Send the report in Chinese" uses queued processing. **It is recommended to use a lightweight classification LLM as an event router**, quickly determining which strategy to adopt when an event arrives.

A cancellation point must be a position where the tool or the reasoning can wind down safely; an unfinished tool result is represented by an explicit placeholder and must never be faked as a success.

The following experiment, an event-driven email processing Agent, implements the event handling strategies discussed above into a runnable implementation.

> **Experiment 6-1 ★★★: Event-Driven Email Processing Agent**
>
> ![Figure 6-3: Experiment 6-1 Event-Driven Agent Architecture](images/fig6-3.svg)
>
> This experiment builds the simplest event-driven Agent: an **Automated Email Processing Assistant**. The Agent monitors the email inbox, and whenever a new email arrives, it automatically triggers a processing workflow—classification, summarization, draft reply, and notifying the user if necessary. This is the most intuitive introductory scenario for an event-driven Agent: an external event (new email arrival) triggers a complete Agent thinking cycle.
>
> **Experiment Objective**: to understand the core idea of event-driven architecture—the Agent no longer waits passively for user input but acts on its own in response to external events. Through this experiment, readers will master the basic closed loop of event source registration, the event queue, and "event arrives → Agent processes → result delivered".
>
> **Event Sources and Event Queue.**
>
> The system supports unified access for multiple event sources:
>
> - **Email Events** (`on_email_received`): Triggered when a new email arrives, either by periodically checking the inbox or receiving push notifications.
> - **IM/SMS Messages** (`on_im_message`, `on_sms_message`): Triggered by instant messages or SMS messages.
> - **GitHub Events** (`on_github_pr_update`, `on_github_issue_update`): Triggered by PR review comments or status changes.
> - **Timer Triggers** (`on_timer_expire`): Triggered by scheduled tasks (e.g., daily summaries, weekly report generation).
> - **Webhooks** (`on_webhook_received`): Generic callbacks from external systems.
> - **System Events** (`on_user_inactive`, `on_process_timeout`, `on_resource_alert`): Triggered by internal state changes.
>
> All events enter a unified **event queue** and are processed sequentially in order of arrival. Each event triggers an independent Agent thinking loop: the Agent reads the event content, calls relevant tools (e.g., querying the knowledge base, reading attachments, searching related email history), generates a processing result (classification labels, summaries, draft replies), and finally either notifies the user via notification tools or directly executes an action.
>
> **Validation Scenario**: Configure the Agent to monitor a test mailbox. Simulate receiving three emails—a meeting invitation, a customer complaint, and a marketing advertisement. The Agent processes them sequentially: for the meeting invitation, it automatically checks for calendar conflicts and drafts an accept/decline reply; for the customer complaint, it extracts key information, marks it as high priority, and notifies the user to handle it; for the marketing advertisement, it automatically archives it. The entire process requires no user intervention.

Experiment 6-1 demonstrates the simplest event-driven pattern—events enter a queue, and the Agent processes them sequentially. However, when the Agent needs to respond to interruptions during long-running tool executions, or manage multiple concurrent tasks simultaneously, a simple event queue is insufficient. Next, we discuss deeper engineering challenges.

### Compatibility When Native Asynchrony Is Unavailable

Experiment 6-1 handles only serial events: events enter the queue, and the Agent processes them one after another. If the chosen model or interface does not support native asynchrony, a user interruption before a tool returns must be expressed within a synchronous format. We introduce a compatibility approach here, then discuss GPT-6 Astra's native interface later.

Suppose the Agent is helping a user draft an email and has called a tool to search for contact information. Before the search returns, the user says, “Wait, first check tomorrow's weather for me.” If the interface requires outstanding tool calls to receive their corresponding results first, the Agent cannot directly process this new message with a call still pending. This restriction comes from the chosen combination of protocol and model; it is not a rule every LLM must follow.

**An Asynchronous Implementation Compatible with a Synchronous Format.**

The core idea is: **Under normal conditions without interruptions, let the LLM see a standard synchronous trajectory; only when an interruption occurs, insert placeholders to fix the format**. Here are five key rules:

**Rule 1**: Promptly record completed assistant messages and tool-call items from the API. Preserve server-managed reasoning state according to the provider's continuation protocol; do not assemble invisible reasoning text yourself.

**Rule 2**: Record the tool result only when the tool call is complete. The trajectory is in a "partially completed" state during execution.

**Rule 3**: Interruptions during tool execution require placeholders. Generate a placeholder response for the unfinished tool (e.g., "The tool is executing in the background, please prioritize the new event"), append the interruption event, and re-invoke the LLM. From the LLM's perspective, the assistant message still has a paired tool result.

**Rule 4**: Without native steering or a supported mid-turn continuation interface, cancel unfinished generation, retain confirmed completed messages and tool state, append the new event, and send a new request. Do not assume that partial output or hidden reasoning can be freely fed back as a valid prefix.

**Rule 5**: Non-interrupting events enter the queue for batch processing. They are appended all at once only after the current cycle is complete.

Using the example of the Agent drafting an email when the user interrupts to ask about the weather, the operation of these five rules is as follows:

1. The Agent calls `search_contacts` to search for contact information, and the assistant message is immediately written to the trajectory (Rule 1).
2. Before the search tool returns results, the user sends "First check tomorrow's weather for me." Since this is a user interruption, the system generates a placeholder tool result for the unfinished `search_contacts` ("The tool is executing in the background, please prioritize the new event", Rule 3), then appends the user's weather query to the trajectory and re-invokes the LLM. At this point, the trajectory format seen by the LLM is completely valid—the assistant message and tool result are perfectly paired.
3. After the Agent answers the weather query, the original `search_contacts` result arrives and is appended to the trajectory as a new event (Rule 2). The Agent reads the contact information and continues drafting the email.

This approach maintains the tool/result pairing required by a synchronous interface. A placeholder explicitly marked “unfinished” is introduced only when an interruption is needed. When the real background result arrives, it enters the trajectory as an event with a source and task ID. For models that already support native asynchrony, the system can retain the task's pending state and pass the real result to the model when it arrives.

Placeholders also carry a semantic risk: the model may confuse “task started” with “task completed” and make a decision that depends on a result before that result arrives. Clear task state and result validation should prevent this confusion, and evaluation should check for fabricated data that has not yet arrived. A single failure does not justify attributing the cause to an undisclosed training process.

**Expressing Asynchronous Semantics Through Task Handles.**

Whether or not a native asynchronous protocol is used, **tool-interface design can make asynchronous semantics explicit**. One approach especially useful for synchronous interfaces is to make “start task” a complete call with a real return value.

Traditional tool design implies a "call equals completion" semantics. For example, the name `phone_call` suggests "calling will dial the phone and wait for the call to end, returning the call log." Under the asynchronous paradigm, "initiation" and "completion" should be decoupled:

- `initiate_phone_call`: Initiates a phone call, immediately returning a task identifier and initial status (e.g., "Call initiated, dialing...")
- Call progress is communicated via event notifications (`phone_call_connected`, `phone_call_ended`)

The key is that the tool's name and description themselves should convey asynchronous semantics. When the model sees `initiate_phone_call`, its language understanding capabilities will naturally infer this is "initiating" rather than "completing." The tool description should further reinforce this: "This tool initiates a phone call task handled by a sub-agent. It returns the task ID immediately upon successful initiation, allowing you to continue with other matters. A separate notification event will be sent when the call ends."

**Attention Dispersion in Queue-Based Processing.**

When processing events in a batch, a model may respond only to the last event and overlook earlier requirements. Native asynchrony addresses whether messages can arrive during execution; we must still check whether the model incorporates all updates.

Intervention can be applied at two levels:

**Prompt Level**: Inform the model, "When you receive multiple consecutive events, please ensure you comprehensively consider all the information."

**Agent Status Bar Markers**: Add explicit markers before each event:

```text
[Unprocessed Event 1/4] Tool result from database_query: ...
[Unprocessed Event 2/4] User supplementary note: Only look at Beijing data
[Unprocessed Event 3/4] System reminder: Report deadline is in 30 minutes
[Unprocessed Event 4/4] User asks: What's the progress?
```

Add a summary at the end: "There are 4 unprocessed events above, including 1 tool result, 2 user messages, and 1 system reminder. Please ensure your response covers all the information."

> **Experiment 6-2 ★★★: Asynchronous Agent with Parallel Execution and Interruption Capabilities**
>
> ![Figure 6-4: Experiment 6-2 Asynchronous Agent Interruption and Recovery](images/fig6-4.svg)
>
> Building on the simple event queue in Experiment 6-1, this experiment uses a runtime compatible with synchronous interfaces to implement **parallel tool execution, execution cancellation, and state management**. The Agent must manage several concurrent tasks, handle interruptions and recovery, and make dynamic decisions from current state. See Experiment 6-3 for the native Astra comparison.
>
> **1. Asynchronous Tool Execution**: Supports asynchronous execution of time-consuming tools (at least 3-5 seconds), returning a placeholder immediately upon initiation. **Validation Scenario**: The Agent executes a long-running terminal command. During this time, the user asks, "What time is it now?" The Agent responds immediately, then presents the analysis result when the long-running command completes.
>
> **2. Event Queue and Batch Processing**: Accumulates non-urgent events and appends them to the trajectory in a batch. **Validation Scenario**: The Agent is executing a long task. The user sends consecutive messages: "Remember to reply in Japanese" and "Format it as a webpage." When the task completes, the Agent processes all events at once, generating a Japanese webpage.
>
> **3. Interruption Mechanism**: A user's "stop" command immediately terminates the execution flow and cancels the asynchronous tool. **Validation Scenario**: The Agent is executing a long task. The user sends "Cancel." The Agent stops immediately, and the trajectory records the interruption event and the cancellation operation.
>
> **4. Cancellation and Status Query for Parallel Tools**: After an asynchronous tool completes, the real result is injected into the conversation via a new event. Supports cancellation or progress query via task ID. **Validation Scenario**: The user requests, "Run these three scripts simultaneously for me. Whichever finishes first, check the progress of the remaining scripts. If any hasn't exceeded 50%, cancel it." The three scripts simulate analysis processes, outputting progress continuously at speeds of 3%, 2%, and 1% per second, respectively. The Agent starts three asynchronous terminal commands simultaneously. When the script at 3% per second finishes in about 33 seconds, the Agent queries the status of the remaining two terminals, finding one at about 66% and the other at about 33%. It then cancels the one that hasn't exceeded 50%. After both terminals complete, it integrates the results to generate a complete report.

### Model-Native Asynchrony: GPT-6 Astra

In the compatibility approach above, the runtime orders incoming events so that a model with a synchronous interface can participate in asynchronous tasks. Another approach lets the model understand this interaction rhythm natively: it can do other work while a tool runs and adjust subsequent work when the user adds requirements midway. GPT-6 Astra already supports Async tool calling and Mid-turn steering, illustrating this change (Figure 6-5).[^ch6-22][^ch6-23]

![Figure 6-5: Synchronous-Interface Compatibility and Model-Native Asynchrony](images/fig6-5.svg)

**Asynchronous tool calling separates “starting an action” from “obtaining its result.”** After starting a slow query, an Agent can continue reasoning, call other tools, or handle parts that do not depend on the query result. While looking up meeting venues, for example, it can prepare the agenda and checklist, then compare options when venue information arrives. The key is to distinguish dependencies: keep independent work moving, and defer decisions that require the result until it arrives.

**Mid-turn steering lets the user correct the direction while a task is underway.** While the Agent is still thinking or composing its answer, the user can add requirements such as “the budget has decreased” or “the number of attendees has changed.” The system retains completed work and brings the new constraints into subsequent processing, allowing the Agent to adjust its plan within the same task. There may still be a delay between receiving an update and acting on it, but the user need not wait for an entire answer to finish before expressing the change.

These capabilities extend the timing of interaction: tool results and user requirements can both arrive as a task progresses. The system must still distinguish their sources and remember which work is complete and which remains pending. Changing a plan does not itself stop running tools or undo actions already taken; actual execution, cancellation, and state management remain the runtime's responsibility.

Not every model has native asynchronous capabilities. When building an Agent, choose native interaction or a compatibility approach according to the model's support, then check whether the whole system correctly handles delayed results, mid-task changes, and task resumption. Asynchronous training can improve these capabilities further, but developers can already build this kind of interaction using existing models.

### From Receiving Asynchronous Messages to Handling Asynchronous Tasks Reliably

Native asynchrony addresses whether messages can arrive during execution. Reliability in complex tasks also depends on how the model uses those messages. At least three things need checking:

1. **Result ownership and pending state**: Can the model associate a delayed result with the correct task and avoid inventing data when the result is absent?
2. **Task resumption and action control**: Can it return to the original task after handling new requirements and distinguish changing a plan from stopping execution?
3. **Integrating multiple updates**: Can it respect both budget and attendance constraints, rather than remembering only the last message?

These issues can be addressed through model training in asynchronous environments and through clearer task state, event sources, and execution feedback in the system. Evaluation must cover both layers: whether the model understood the change and whether the system executed accordingly.

> **Experiment 6-3 ★★★: Model-Native Asynchrony and Mid-Turn Steering**
>
> Choose a venue for a meeting: after starting a slow query, the Agent completes preparation that does not depend on the result. Meanwhile, the user adds budget and attendance requirements. Once the query finishes, the Agent selects a venue according to all constraints.
>
> Call the GPT-6 Astra API to compare synchronous tools, native asynchronous tools, and mid-turn steering. Observe whether waiting blocks other work, whether new requirements enter subsequent plans, and whether the original task resumes when results arrive. Then use a model without native support as a control to understand what model capabilities and runtime orchestration each address.

Asynchrony and event-driven execution let the world wake an Agent while a task is underway; native steering also lets the user submit updates before a full answer finishes. The next three sections compress the timescale further: when the environment changes as fast as or faster than the model generates, receiving updates is not enough—the system must also react in time.

## Voice: The Most Natural Human-Machine Interface

Voice is not merely text turned into sound. Speaking is roughly four times faster than typing and leaves the hands and eyes free, so it naturally places an Agent in a continuous input-output loop where the user may interrupt at any moment. Dictation converts speech into text; a voice Agent lets the user collaborate with the Agent directly. Both support the whisper-coding workflow introduced earlier.

This section covers two directions: the user speaking to an Agent, and an Agent speaking to the outside world on the user's behalf. The voice model determines what the Agent can answer; the interaction architecture determines whether it can hear clearly, respond in time, hand over naturally, and complete confirmations and tool calls during a call. We first examine interaction timing, then cognitive timing and expressive quality.

### Interaction timing: from cascaded to full-duplex

OpenAI's GPT-Live introduction describes three voice-interaction paradigms—cascaded, turn-based, and full-duplex[^ch6-12]. They are not a simple old-to-new replacement; they trade latency, cost, and observability in different ways:

| Paradigm        | Core structure                                                                         | Main advantage                                                            | Main limitation                                                          |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Cascaded        | VAD → ASR → LLM → TTS                                                                  | Clear modules that are easy to replace and debug                          | Latency accumulates and paralinguistic information is lost at interfaces |
| End-to-end Omni | Native audio input and output with turn-based interaction                              | Lower latency and better preservation of tone, emotion, and ambient sound | Still turn-based; training and debugging cost more                       |
| Full-duplex     | Native audio input and output with continuous listening, speaking, and decision-making | Overlapping speech, natural interruption, and continuous streams          | Training, control, and evaluation are more complex                       |

The common thread is escaping the assumption that people must speak one at a time, and escaping VAD's guess about who has the floor. Cascaded and Omni systems still divide interaction into turns; full-duplex makes turn ownership a continuous model decision.

[^ch6-12]: OpenAI. _Introducing GPT-Live._ 2026-07-08. https://openai.com/index/introducing-gpt-live/ The cascaded / turn-based / full-duplex taxonomy comes from the article's summary of three generations of ChatGPT Voice; its “end-to-end omnimodal (Omni)” term corresponds to the “turn-based voice models” category.

### Paradigm 1 · Cascaded pipeline

Most commercial voice assistants still use a serial pipeline (Figure 6-6): VAD decides when the user has finished, ASR converts audio to text, the LLM understands and generates a reply, and TTS speaks it. Modularity lets each component be optimized independently, but every boundary can add waiting time.

![Figure 6-6: Serial voice Agent pipeline](images/fig6-6.svg)

| Module | Role                             | Typical bottleneck                                         |
| ------ | -------------------------------- | ---------------------------------------------------------- |
| VAD    | Decide whether speech has ended  | Silence thresholds add waiting and split turns incorrectly |
| ASR    | Convert audio to text            | Recognition latency and loss of context                    |
| LLM    | Understand, reason, and generate | Time to first token; reasoning adds more waiting           |
| TTS    | Convert text to speech           | First-packet synthesis and playback buffering              |

For a short reply without reasoning, VAD, ASR, LLM, and TTS waiting time accumulates serially (Figure 6-7). The real value depends on input length, model, hardware, network, and load.

![Figure 6-7: Latency waterfall for a serial response](images/fig6-7.svg)

Production queueing amplifies idle latency further (Figure 6-8), but capacity planning is outside this chapter's scope.

![Figure 6-8: Queueing latency curve](images/fig6-8.svg)

> **Experiment 6-4 ★: Build a traditional voice Agent**
>
> Connect a microphone, Silero VAD, local Whisper, a streaming LLM, and Fish S1 TTS over WebSocket to establish the cascaded baseline.

#### From serial to streaming perception

Figure 6-7 describes the fully serial case: VAD, ASR, LLM, and TTS run one after another. This serial perception approach has three problems:

1. **Accumulated latency:** it must wait through silence before confirming the end.
2. **Lost information:** a voiced/unvoiced bit cannot express hesitation, emotion, backchannels, or ambient sound.
3. **Broken context:** email addresses, names, and proper nouns may be split across chunks and misrecognized.

To address this while keeping the modular split, one optimization is **streaming perception**, which lets each stage produce incremental results as early as possible:

- **Streaming ASR:** once VAD detects that the user has started speaking, the ASR model is called at fixed intervals to produce a provisional transcript in a streaming fashion; once VAD detects that the user has finished, the final text is confirmed.
- **LLM speculative execution:** the provisional transcript is sent to the LLM as soon as it exists. If the final text matches the provisional transcript, the LLM is not called again; otherwise the earlier speculative thinking is cancelled and the LLM is called again.
- **Segmented LLM output:** the first speakable sentence goes to TTS without waiting for the full reply.
- **Incremental TTS:** audio chunks are returned continuously so later generation, synthesis, and playback overlap.

A truly streaming ASR needs model-level support. Whisper's decoder is autoregressive, but its encoder expects a complete audio segment, so it cannot simply be equated with a streaming model. An LLM-based streaming-audio model can emit text and semantic events from continuous audio, placing recognition and part of understanding in one model. It keeps the conversation context from the beginning up to the present moment and can use world knowledge for brands, names, and proper nouns.

If the only goal is deciding whether the user has finished, endpointing can be built into the streaming recognizer. The model combines semantics and silence to judge whether an utterance is complete. Training labels must contain only information visible at decision time, or hindsight will produce a judgment that cannot be reproduced online.

The model can emit acoustic-event markers as well as words:

- **speak_start/end, interrupt:** speech boundaries and interruption intent;
- **emotion:** emotion and hesitation;
- **laugh, sigh, noise:** paralinguistic and environmental sound.

Together with text tokens, these markers form one event stream. The Agent can detect hesitation, interruption, and environmental changes without compressing every sound into plain text.

> **Experiment 6-5 ★: Simulate streaming voice perception with Qwen2-Audio**
>
> Qwen2-Audio is not itself a streaming model. This experiment simulates continuous perception with increasing audio prefixes and compares it with 600 ms VAD + Whisper.

### Paradigm 2 · End-to-end omnimodal models (Omni)

Even with streaming perception, a cascade passes listening, thinking, and speaking through discrete interfaces; emotion, intonation, and ambient sound may be lost when audio becomes plain text. The Omni approach uses one model to listen to audio, generate a reply, and speak it, which can preserve those signals, though at a higher training cost (Figure 6-9). Compared with the cascaded pipeline of Paradigm 1, Omni's advantage shows up mainly in latency and in understanding and generating non-text information.

On the understanding side, Omni models can pick up on pauses in the voice. On the generation side, Omni models can convey richer paralinguistic information—singing, or delivering a line in a distinctive tone.

Omni models still assume turn-taking and generally use VAD to assign the floor. A mid-utterance pause while the user reads out a string of digits can therefore still be mistaken for the end of the turn.

![Figure 6-9: End-to-end omnimodal speech-model comparison](images/fig6-9.svg)

> **Experiment 6-6 ★★: Run MiniCPM-o 4.5 locally—end-to-end versus self-cascade**
>
> Run MiniCPM-o 4.5 locally with thinking mode disabled, comparing direct answers from audio against a self-cascade that first transcribes and then answers with the same model. This measures whether audio information is preserved, **not** the “thinking while speaking” discussed later.

### Paradigm 3 · Full-duplex interactive models

Omni still divides conversation into “the user speaks” and “the model speaks,” but simultaneous interpreting and similar tasks require overlap. A full-duplex model therefore does not presuppose turns: it listens and speaks continuously and repeatedly decides whether to continue, pause, interrupt, or call a tool.

Kyutai's **Moshi** (2024) was an early research example. It models the user's and the model's audio streams in parallel, so overlapping speech and interruption can be natural behaviors.

Thinking Machines Lab calls this an **Interaction Model**[^ch6-14]: interaction is built into the model instead of assembled around it with VAD and other external harnesses. Its micro-turn mechanism advances in short audio blocks, preserving silence, overlap, and interruption as continuous context. It can delegate the full conversation to a background reasoning model while it keeps the conversation alive, then incorporate the result at a suitable moment.

[^ch6-14]: Thinking Machines Lab, “Interaction Models: A Scalable Approach to Human-AI Collaboration,” 2026-05. https://thinkingmachines.ai/blog/interaction-models/

OpenAI's GPT-Live brings the full-duplex path to production scale: it continuously processes input and generates output, can wait, backchannel, be interrupted, and handle realtime translation. Like the Interaction Model, it delegates complex work to a background model while the foreground model maintains the conversation.

### Cognitive timing: realtime interaction and deep thinking

Interaction quality and intelligence ceiling are different dimensions. The foreground model must respond while the user is still engaged; the background model can spend longer thinking. The following three designs are trade-offs, not a linear progression. The first two can wrap a cascade or Omni model; the third instead unifies deep reasoning and realtime expression within the same model.

#### Solution 1: Fast thinking for fillers, slow thinking for answers

Fast thinking can give a holding response within a few hundred milliseconds while slow thinking performs a deeper derivation in the background. Simple questions may be processed twice, while hard questions can produce contradictions: the fast model recommends a purchase, then the slow model discovers that a key feature is missing. The root cause is two independent instances thinking separately.

![Figure 6-10: Fast/slow thinking architecture and design alternatives](images/fig6-10.svg)

#### Solution 2: Fast thinking for interaction, slow thinking for advice

The background model can send advice through a status bar or dedicated interface while the foreground model keeps the conversation alive and decides how to phrase it. This is more stable than Solution 1, but communication is still indirect: the foreground can misunderstand the advice and cannot see the background's intermediate reasoning. Before the background finishes, follow-up questions still rely on the foreground model. It can naturally wait for a result, but it cannot truly think while speaking.

#### Solution 3: End-to-end unification of thinking and expression

This design internalizes reasoning directly in an end-to-end audio model. Step-Audio R1 uses two complementary mechanisms: **Modality-Grounded Reasoning Distillation (MGRD)** grounds thinking in acoustic features, while the **MPS dual-brain architecture** lets planning and expression proceed in parallel. The first helps the model think correctly; the second helps it speak in time.

Ideally, the model infers emotion from pitch, rhythm, and intonation rather than only from the transcript. MGRD selects reasoning traces that actually cite acoustic features, trains on them, and uses reinforcement learning to prevent guessing without thinking. MPS lets the planning brain continuously emit thought segments; the expression brain combines each segment with the partial reply and immediately generates speech. The pipeline runs in parallel, so the listener need not wait for the entire chain of reasoning before hearing the first sentence.

#### The trade-off between separated fast/slow thinking and end-to-end reasoning

A unified model implements “thinking while speaking” most directly, but thinking and realtime expression must be retrained together. A decoupled design makes it easier to swap the background brain. These are trade-offs, not simple substitutes.

As frontier reasoning models advance rapidly, separating fast and slow thinking offers an important engineering advantage: it captures the gains from each new generation of slow models directly. The fast foreground model only needs to listen, respond, and sustain the conversation with low latency, while the slow background model handles reasoning, planning, and tool use. When a stronger reasoning model arrives, only the background model needs to be replaced; the entire realtime voice system need not be retrained. A unified design binds reasoning and interaction to the same training cycle, so every upgrade must rebalance intelligence, response latency, and natural expression. Fast/slow separation is therefore not merely a compromise on latency, but a modular choice that lets interaction capability and the intelligence ceiling evolve independently.

This separation does not necessarily sacrifice task performance. As of August 2026, Pine AI's voice Agent, which uses a separated fast/slow architecture, ranked first on the τ³-Voice Leaderboard, ahead of realtime voice systems including Grok Voice and GPT-Realtime-2. At minimum, this result shows that a decoupled architecture is not inherently inferior to end-to-end models on tasks that jointly test deep reasoning and realtime conversation.[^ch6-17]

[^ch6-17]: Pine AI. “The Most Natural Human-Computer Interface Is Your Voice.” 2026-06-23 (updated 2026-08-06). https://www.19pine.ai/blog/pine-ai-the-most-natural-human-computer-interface-is-your-voice

The term “end-to-end model” needs one further clarification because it is commonly used in two senses. The first is **an end-to-end speech path**, discussed in the preceding section: the model receives audio and produces audio directly instead of connecting multiple models through discrete text. Both Omni and Interaction Models are end-to-end in this sense, but Omni models usually remain turn-based, whereas Interaction Models can listen and speak at the same time; their architectures differ substantially. The second is **an end-to-end cognitive architecture**, discussed in this section: realtime interaction and deep reasoning either share state and are trained together within one model, or are split between a fast foreground model and a slow background model. The two axes are independent. A system can have an end-to-end speech path while retaining fast/slow separation in its cognitive architecture; Thinking Machines Lab's delegation of complex tasks to a background reasoner is one such combination.

### More human-like speech synthesis

Traditional TTS can expose its machine identity by being too smooth and pausing too little. Pauses, filler words, and occasional repetition signal uncertainty and thought in human speech.

The main LLM can emit control markers in addition to text, such as **THINKING**, **EMO:happy**, and **SPEED:0.8x**; TTS maps them to pauses, prosody, speaking rate, laughter, sighs, and other nonverbal audio. The implementation can be a TTS trained to understand control markers, or voice cloning with reference clips for different emotions and styles.

> **Experiment 6-7 ★★: Control token-driven TTS with Fish Audio**
>
> Use Fish Audio S1 to build a multi-reference voice library and compare three configurations: no control markers, one reference clip, and multiple reference clips. The execution layer selects matching emotion, speaking rate, and style from the markers.

## Computer Use: GUI Automation Agents

Voice pushed the timing axis down to the millisecond, but its observation is still a one-dimensional stream of sound. Computer Use moves the same problem onto a two-dimensional screen: observation becomes continuously changing pixels, and action becomes clicks and keystrokes at coordinates. Voice scenarios emphasize _when to speak_; Computer Use emphasizes _where to click next_—plus a question that does not exist in voice interaction at all: after an action executes, is reality still consistent with the plan?

Computer Use, also known as GUI automation, allows AI to use software like a human by observing the screen and operating the mouse and keyboard—for example, opening a browser to search for information, filling in data in a spreadsheet application, or adjusting configurations in system settings. Its core is a **Perceive-Think-Act** loop (Figure 6-11):

1.  The Agent takes a screenshot of the current screen.
2.  A multimodal model receives the screenshot and task instruction, and outputs a thought and a specific action.
3.  The execution layer performs the action in the real environment (moving the mouse, clicking, typing text, etc.).
4.  It waits for the interface to respond, takes another screenshot, and enters the next loop iteration.

It is important to distinguish **understanding the interface** from **completing the task**. The former is closer to multimodal understanding and can be measured with one-shot screenshot question answering. The latter requires the model to put understanding and action generation into a closed loop that handles page loading, state changes, mistakes, and irreversible consequences. The challenge of Computer Use is therefore not merely answering correctly about a screenshot, but reconfirming after every step that reality still matches the plan.

![Figure 6-11: Computer Use Agent's Perceive-Think-Act Loop](images/fig6-11.svg)

There are three key design dimensions in this loop: **Action Space** (what operations the Agent can perform), **Visual Grounding** (how to find the target element in the screenshot), and **Model Architecture** (how to generate the correct action from the screenshot).

### Action Space Design

Anthropic's reference implementation divides a complete interaction capability into three types of tools (Figure 6-12). This is a clear action-space design, but not a private protocol that model providers must follow: as long as the Harness can translate the same screenshots, action constraints, and execution results into messages and structured outputs supported by the target model, Claude, open-weight vision models, and self-hosted endpoints can all drive the same Perceive-Think-Act loop.

![Figure 6-12: Computer Use Action Space](images/fig6-12.svg)

**GUI Operation Tool** (`computer` tool): Mouse operations include moving (`mouse_move`), left/right/middle clicks, double-clicking or triple-clicking, dragging (`left_click_drag`), and more precise press/release actions (`left_mouse_down` and `left_mouse_up`). Scrolling (`scroll`) supports four directions and can be combined with modifier keys. Keyboard operations include typing character by character (`type`, with a 12ms interval between characters to simulate real typing), key combinations (`key`, e.g., `Ctrl+C`), and holding a key (`hold_key`). Perception actions include taking a screenshot, retrieving the cursor position (`cursor_position`), and waiting (`wait`).

**Command Execution Tool** (bash tool): Provides a persistent bash terminal session with a 120-second timeout. It uses a sentinel string to detect command completion and maintains environment state across multiple calls (e.g., after `cd` to a directory, the next call remains in that directory).

**File Editing Tool** (`str_replace_editor`): Enables safe editing through string matching and supports view, create, replace, insert, and undo operations. It is more precise than overwriting an entire file and less likely to modify unrelated content accidentally.

> **Experiment 6-8 ★: Running Computer Use (Anthropic Reference Path or Open-Model Path)**
>
> Path A uses the Anthropic Computer Use Demo. Its container packages a complete Ubuntu desktop environment, including a browser, terminal, and other common tools. The frontend receives a task, while the backend sends the instructions and screenshots to Claude and then executes the mouse, keyboard, terminal, or editing actions returned by the model.
>
> Path B uses the example code in [`chapter6/computer-use-open-model`](https://github.com/bojieli/ai-agent-book/tree/main/chapter6/computer-use-open-model). By default, it drives browser-use with the open-weight Qwen3-VL 32B Instruct model through the hosted OpenRouter API, or through self-hosted vLLM/SGLang and similar systems.

### Visual Grounding

In each iteration of the loop, the model needs to accurately locate the target element in the screenshot—"Where is the search box?" "What are the coordinates of the submit button?" This is the visual grounding problem. Currently, there are **two main approaches**: one is to turn localization into a **multiple-choice problem**—first annotate the interface elements with numbers, and the model only needs to select one; the other is **pure coordinate prediction**—letting the model "look" at the screenshot and report coordinates directly, just like a human. The multiple-choice approach has two implementation methods: **pure visual annotation** (the original Set-of-Mark, using a segmentation model to segment candidate regions in the image) and **structured element indexing** (DOM/Accessibility Tree, directly reading the interface's inherent structure). The common advantage of the multiple-choice approach is that it transforms the open-ended problem of "find the button in the screenshot and predict its coordinates" into a closed-ended one of "choose one from the already annotated elements." Just as multiple-choice questions are easier to answer correctly than fill-in-the-blank questions in an exam, the model only needs to say "click [123]" instead of "click the button at screen coordinates (350, 464)." Predicting coordinates directly is especially hard for a model—it takes extensive training to get right, and it is prone to error across different screen resolutions.

**Set-of-Mark: Visual Annotation Method.**

The original Set-of-Mark (SoM) was proposed by Microsoft Research in 2023, initially to unlock the visual grounding capabilities of GPT-4V. It is a **purely visual** method: it uses image segmentation models (SAM, SEEM, etc.) to automatically segment candidate regions in the screenshot, overlays a numbered marker on each region, and the model sees an image with numbers. The model only needs to report the number, and the system converts it into the center coordinates of the corresponding region. The entire process does not require a DOM or any internal interface structure, so it is equally applicable to native desktop software and game interfaces—as long as the segmentation model can identify the candidate regions.

**Structured Element Indexing: A Structured Implementation of the SoM Idea on the Web.**

When the interface itself provides structured information, annotation can be more precise. Before rendering, modern web pages define a complete element structure (the DOM tree) and semantic roles that identify buttons, input fields, and other controls. Accessibility trees provide similar information for many desktop applications. Web Agent systems such as `browser-use` take exactly this route: they enumerate and number interactive elements from the DOM. This is a structured implementation of the SoM idea for the web (Figure 6-13). The process has four steps:

1. Obtain the structured representation (DOM tree) and accessibility information for the page through the browser's debugging interface (CDP, Chrome DevTools Protocol)
2. Automatically detect which elements are interactive (buttons, input boxes, links, etc.)
3. Annotate each interactive element with a unique ID and draw bounding boxes on the screenshot
4. Simultaneously generate a text list describing the element corresponding to each ID

```text
Screenshot: [Key elements in the image are annotated with IDs like [1], [2], [3], [4]]

Elements:
[1] <input type="text" placeholder="Search" aria-label="Search" />
[2] <button id="submit-btn" aria-label="Submit form" />
[3] <input type="text" placeholder="Enter your name" value="" />
[4] <a href="/docs" aria-label="Documentation" />
```

The model only needs to output an ID, and the system automatically clicks the center of the corresponding element. This approach does not save tokens because all annotation data must still be sent to the model, but it provides accurate, stable localization while avoiding the missed detections and false positives that segmentation models can introduce.

![Figure 6-13: Set-of-Mark vs. Structured Element Indexing (browser-use implementation)](images/fig6-13.svg)

**Pure Coordinate Prediction.**

The third route skips annotation and asks the model to output coordinates directly. Systems such as **SeeClick** and Claude's computer use rely on vision models trained on massive datasets of GUI screenshots paired with element positions. These models learn to map natural-language descriptions (e.g., "click the submit button") directly to precise screenshot coordinates, relying on visual perception much like a human user.

In coordinate prediction schemes, the model's understanding of coordinates is highly dependent on the resolution used during training (Figure 6-14). Claude was trained using XGA (1024×768), WXGA (1280×800), and FWXGA (1366×768). If the input screenshot resolution does not match, the model's predicted coordinates will systematically shift—like measuring a distance on a small map and then applying it directly to a large map. Therefore, a bidirectional coordinate scaling mechanism must be implemented at the tool layer, and the target resolution must be **selected based on the aspect ratio** to avoid non-uniform stretching that distorts the image and consequently biases coordinate judgment. For example, if the actual screen resolution is 2560×1440 (16:9), the most suitable target among Claude's three supported options is FWXGA (1366×768), which has an aspect ratio closest to 16:9. The screenshot is proportionally scaled to 1366×768 and fed to the model; after the model outputs the click coordinates (683, 384), they are inversely mapped to the real coordinates (683×2560/1366, 384×1440/768) ≈ (1280, 720). Conversely, if a 16:9 image is forcibly stretched into the 4:3 1024×768, the image will be horizontally compressed, causing the model's predicted coordinates to systematically shift.

![Figure 6-14: Resolution Matching and Bidirectional Coordinate Scaling](images/fig6-14.svg)

The choice among the three routes can be summarized as follows: **when structured information is available, prioritize DOM/accessibility-tree indexing** for the most accurate and stable localization. **When it is unavailable**—in native desktop software such as Photoshop, canvas/WebGL-rendered interfaces, or games—**use either visual annotation (the original SoM route) or coordinate prediction**. Visual annotation turns localization into a multiple-choice problem, making it friendlier to general-purpose models without specialized training. Coordinate prediction eliminates the annotation step and is more direct for models trained specifically on GUI localization. Both approaches still struggle with small elements and dense interfaces.

> **Experiment 6-9 ★: Using browser-use to Implement Automated Browser Operations**
>
> Use Playwright, a browser-automation framework, together with a multimodal model to implement natural-language-driven browser operations. Enable SoM visualization and save a screenshot with annotated bounding boxes before every decision.
>
> Test task “Open Google and query San Francisco weather”: after startup, the screenshot shows Google Search with numbered interactive elements. The model selects the search box, enters “San Francisco weather today,” submits it, and extracts the temperature and conditions from the results page.

### A Computer Use Agent That Can Watch Animations and Hear Sound

So far, Computer Use perception has rested on an implicit assumption: **the screen is static**—take a screenshot, reason one step, click, and take the next screenshot. Real screens play videos, flash short-lived notifications, and carry voices from meetings. An Agent that opens its eyes only once every 3–5 seconds and has no ears cannot see or hear what happens between two frames.

What needs redesign is not the action interface but the **observation interface**[^ch6-9]. An Agent–computer observation interface (AOI) converts continuous environmental observation into discrete events the model can handle. Its key techniques are: **screen keyframe capture**, which uses a small model to judge whether the screen has changed meaningfully and only takes a screenshot on a significant change—when changes are frequent, capturing once per second already works well; **volume-gated speech transcription**, which invokes recognition when sound is present and feeds the recognized text into the context so the Agent can hear; and **describing the screen as text**, so the model turns each captured screenshot into a one-sentence description that stays in the context after the original image leaves it, compressing multimodal interaction history.

[^ch6-9]: See Li, Bojie and Noah Shi. _Agent-Computer Observation Interfaces Enable Dynamic Computer Use._ arXiv:2606.29472, 2026.

### World Models for Computer Use

The observation interface of the previous section answers "what happened in between?": with keyframes, speech transcription and persistent text, the Agent no longer sees only two screenshots taken far apart. But an observation interface does not remove planning latency. The Agent is still running a serial "screenshot—think—click" loop, re-observing and reasoning about the next step after every single action. The **OSWorld-Human** efficiency study shows that even when a task eventually succeeds, the Agent takes markedly more steps and waits markedly longer than a person does; reaching human-level accuracy is not the same as being practical.

People do not start thinking about the next step only after clicking. They first predict what an action will do: if the actual change matches the expectation, they carry on with the existing plan; only when the page state departs from what was expected do they stop to observe and plan again. A world model lets the Agent predict what the desktop may turn into before it acts, giving it this human-like "speculative execution" and improving efficiency substantially.

Desktop state is more than a grid of pixels. It also includes windows, focus, scroll position, input-field contents, loading state, permissions and network responses; actions include clicking, typing, scrolling, dragging and waiting. A world model usable for Computer Use must at minimum encode the current state, predict the state change a candidate action would cause, and hand that prediction to the planner to decide the next step:

```text
desktop state + click/type/scroll/wait ──> representation of the next state
```

This lets the Agent compare the consequences of candidate actions before it actually clicks, prepare the next step while a page is loading, and recover from a dialog that flashed past by reasoning about the state difference. If the task is "create a new Python file in VS Code and write hello world", the model can first predict the key state of the file tree and editor on success, and only then choose the click, type and save actions; if the task is to delete a file, it can predict inside an isolated virtual desktop whether an irreversible confirmation dialog will appear, and ask the user to confirm when necessary. The point here is not to have the model generate a photorealistic future screenshot, but to predict the checkable state differences that completing the task requires.

In July 2026, **Photon-1** from Induction Labs demonstrated one implementation of this route, completing the pretraining of a computer use world model with only 30,000 hours of H200 GPU time. It compresses each frame into discrete latent tokens and autoregressively predicts the representation of the next state after an action, rather than generating screenshots pixel by pixel during pretraining; the image generator attached to it serves only to visualize the latent representations and is not a component required for inference. Given a seed screenshot and the actions that follow, the model can "imagine" desktop states continuously, and then learn to output computer-use actions through online training on virtual machines.[^ch6-20]

[^ch6-20]: David Li and Jonathan Li, Induction Labs, “Scaling Video Pretraining with Imagination Models,” 2026-07-23. https://www.inductionlabs.com/news/scaling-video-pretraining. The parameters, data scale, internal benchmarks and cost comparisons reported for Photon-1 are figures disclosed by the company.

### Mobile: Ecosystem Barriers Are Harder Than Technology

Computer Use is also expanding to mobile devices. Mobile and desktop systems do differ technically: instead of relying on mouse coordinates and keyboard input, the mobile action space typically uses the system's accessibility-service API (e.g., Android's `AccessibilityService`) to read interface elements and issue clicks or enter text. Interaction also shifts from a mouse pointer to touch gestures, changing the meaning of coordinates. The same `(x, y)` position might indicate a tap, a long press, or the starting point of a swipe, so the action must also specify a gesture type. Mobile benchmarks such as AndroidWorld, introduced in Chapter 7, evaluate an Agent's ability to complete tasks in real applications within this action space.

However, what truly hinders mobile Computer Use is often not these technical differences, but ecosystem barriers. Some phone manufacturers have attempted to integrate AI assistants into consumer-grade phones so that the assistants can automatically operate everyday apps like WeChat, Taobao, and Alipay, but they quickly encountered platform restrictions.

This reveals a unique challenge for Computer Use: **ecosystem barriers**. The fundamental reason behind these restrictions is a conflict of business models. The core monetization logic of traditional internet applications is **traffic and attention**: users see ads while scrolling through feeds, are guided by recommendation algorithms when searching for products, and make impulse purchases while browsing pages. When an Agent operates on the user's behalf, that monetization chain is bypassed entirely: the AI ignores ads, makes no impulse purchases, heads straight for the goal, finishes the task, and leaves. For platforms that live on advertising and traffic, every Agent operation erodes the foundation of the business model.

This means that Computer Use faces not only technical countermeasures such as CAPTCHAs, but also a **structural conflict of interest**. This conflict will be difficult to resolve in the short term and poses a greater obstacle to consumer adoption than purely technical problems.

## Robot Manipulation: Tidying a Desk with XLeRobot

> **Reading note**: This section uses one task throughout—"put the red cup in the tray, put the yellow scrap paper in the bin, then observe again and confirm the state of the desk." Experiments 6-10 and 6-12 run on real XLeRobot hardware and need an arm, calibration, an emergency stop and an on-site observer; experiments 6-11, 6-13 and 6-14 are the corresponding local-GPU experiments. Hardware and simulation are reported separately, but the task goal, the action semantics and the success conditions stay the same.

Robot manipulation is much harder than answering questions about a picture. The model has to understand the scene and then take actions continuously in the real world, where every action changes what the next moment looks like. XLeRobot makes that difference concrete: the same arm can be teleoperated by a person through a keyboard, a gamepad or a VR device, or it can hand camera observations and a constrained set of action tools to an Agent to call on its own. The hardware and the task stay fixed; only the operator changes—in the first case a human observes and corrects continuously, in the second the model and the control system must do the same work.

This section runs five experiments on "tidy the desk." First a human teleoperates the real XLeRobot, measuring what the hardware can do under a sufficiently capable operator; then a simulator establishes the ideal control ceiling for the same task. Next an Agent controls the real XLeRobot autonomously, showing how perception, planning and failure recovery affect the result; then the same tool contract goes into the simulator so that open-loop execution, step-by-step checking and world models can be compared in bulk. Finally the background, object appearance, lighting and visual noise change, to see whether a visual policy learned in simulation adapts to a new environment.

The bottleneck here is usually not one more static question-answering benchmark, but whether the model can keep closing the loop under limited perception and control bandwidth. A usable robot system has to answer at least four questions:

1. What task does the person want done?
2. Which subtask comes next?
3. What actions does the current skill actually emit?
4. After the action executes, does reality still match the plan?

This section places those four questions inside one XLeRobot control loop and shows what each of four techniques is responsible for: long-horizon planning decides whether the cup or the paper is handled first, a VLA or action primitive performs the grasp and the placement, a world model estimates the consequences of an action, and sim-to-real transfer handles the differences between training footage and the real camera and actuators. Even when the high-level model already has enough knowledge and planning ability, losing any one of these feedback links can still leave the task unfinished.

### The Division of Labour Between Hardware and Algorithms

The first question XLeRobot is best suited to answer is this: when autonomous desk tidying fails, is it the arm that cannot do it, or the algorithm that is not using the arm well? There is a fact here that should not be softened: **an arm costing only a few hundred dollars, like XLeRobot, can already complete the kind of continuous multi-step desk task in this section through teleoperation**—a person watches the camera feed, picks up the red cup and puts it in the tray, then puts the yellow scrap paper in the bin and confirms the state again. That result is not merely "the hardware is barely feasible"; it is a clear piece of diagnostic evidence: **for this task the hardware itself is not the bottleneck, the algorithm is.**

The diagnostic method is direct: keep the camera, the arm, the gripper, the desk layout and the success conditions fixed, and let a human take over the loop. A human continuously corrects object localization, action choice and timing, and handles failed grasps; the gap between an autonomous system and a person lies precisely in those closed-loop abilities. The scope of the claim is of course this section's desk task: it shows the hardware has cleared the payload, precision and workspace thresholds this task requires, not that a few-hundred-dollar arm can handle every open environment or harder manipulation.

XLeRobot supports keyboard, Xbox controller, Switch Joy-Con and VR teleoperation. A human operator naturally does many things an algorithm has to implement explicitly: slowing the gripper as it nears the cup, correcting the grasp point when the cup slides, observing again after failing to pinch the paper the first time, and checking the outcome once an object is in the target area. Teleoperation is therefore not only a way to collect demonstrations but also a "fix the hardware, swap the operator" diagnostic experiment.[^ch6-1]

> **Experiment 6-10 ★: Teleoperating a real XLeRobot to tidy a desk**
>
> Place a red cup, a tray, yellow scrap paper and a bin in the real XLeRobot workspace. Using one calibrated teleoperation method, the operator performs the fixed task: "put the red cup in the tray, put the yellow scrap paper in the bin, then observe again and confirm the state of the desk." Repeat for several rounds at minimum, recording the camera feed, operator input, arm state, action timing, failed grasps, retry counts and the final state.
>
> Acceptance cannot rest on "the desk looks tidy at the end." The red cup must be inside the tray, the yellow paper inside the bin, the arm back in a safe pose, with no collision, no out-of-bounds motion and no unconfirmed manual intervention along the way.

Teleoperation on real hardware gives the most convincing ceiling for the task, but it is not suited to varying object counts and positions in bulk. To obtain a repeatable, statistically meaningful control, the next step moves the same "put objects where they belong" problem into a 2D desktop simulator, using an ideal controller to stand in for a strong operator who never misperceives and never picks the wrong action.

> **Experiment 6-11 ★: Measuring the ideal control ceiling for the same task in simulation**
>
> In a 2D desktop simulator, randomly place the red cup, the yellow paper and their target areas, and let an ideal controller approach each object in turn, grasp it and move it to the right place. It does not need to recognise images and never picks the wrong action, so it represents "what this task can at least achieve when perception and decision-making are both correct."
>
> The experiment tracks task success rate, number of steps and path length, and varies initial object positions and task scale to see whether the ideal ceiling stays stable. It uses the same success conditions as experiment 6-10, but measures a non-actuated simulation and does not imply the real XLeRobot has been run. Together the two establish the reference lines for the autonomous control that follows: experiment 6-10 is a human loop on real hardware, experiment 6-11 an ideal loop in simulation.

### The Basic Structure of Robot Control

Robot systems usually separate work by timescale:

| Layer                        | Core question                      | Output                                                          | Typical timescale       |
| ---------------------------- | ---------------------------------- | --------------------------------------------------------------- | ----------------------- |
| Task goal                    | What does the person want done     | "Put the cup and the paper away"                                | Minutes                 |
| Long-horizon planning        | What comes first, what comes after | Handle the cup, then the paper, then check                      | Seconds to minutes      |
| Basic skills                 | Which state change to achieve now  | `pick(red_cup)`, `place(red_cup, tray)`                         | About 1–3 s             |
| VLA / skill policy           | How this skill actually moves      | A short motion or continuous trajectory of the XLeRobot gripper | About 1–10 Hz inference |
| Low-level control and safety | How to execute stably and in time  | Joint or end-effector commands, speed limits and emergency stop | About 50–1000 Hz        |

This is a common engineering split, not the only model architecture. A VLA can take on part of the high-level judgement, and the planner can be a rule-based program, a VLM or an optimiser. Whichever implementation you choose, "task order" and "the action right now" should stay separate; otherwise the high-level model's inference latency drags down low-level control, and high-frequency low-level control forces the high-level model to process a great deal of irrelevant detail. For XLeRobot the model should not emit arbitrary joint angles directly; it only selects bounded skills such as `pick`, `place`, `verify_state` or `stop`, and a calibrated, speed-limited executor with timeouts turns those skills into real arm motion.

### Long-Horizon Planning and Task Decomposition

When the user says "tidy up the desk," the system cannot hand that sentence straight to an action model. The planner first lists the objects and goals in the scene, then decides the order, and for each step writes down the start condition, the completion condition and the risk limits. For example:

```text
handle the red cup → clear the yellow paper → check the desk
```

"Handle the red cup" then decomposes further into two actions and one check:

```text
pick(red_cup) → place(red_cup, tray) → verify_state()
```

Every completed skill yields a checkable node. If a grasp fails, only that step is retried; if someone moves an object, or the user changes the goal, only the affected later steps need replanning—the old plan does not have to be redone from scratch. The tools given to the agent should be equally simple: one call does one thing, the range of motion is fixed, there is a timeout, and observation happens again immediately after execution.

> **Experiment 6-12 ★★: Driving XLeRobot to tidy a desk autonomously with Gemini Robotics-ER 1.5**
>
> Keep the real XLeRobot, the desk layout, the task instruction and the success conditions of experiment 6-10 unchanged, and replace the human operator with an Agent. An embodied reasoning model such as Gemini Robotics-ER 1.5 can handle observation and planning, exposing only five tools through a RoboCrew-style agent loop: `observe_scene`, `pick`, `place`, `verify_state` and `stop`.[^ch6-2]
>
> The model first observes the desk, decides the order, then calls the calibrated XLeRobot grasp and place actions. After every completed skill it must observe again and check the postcondition; on a failed grasp it may only retry the current skill, and it must call `stop` when the user says stop, when an object leaves the workspace, or when the state cannot be confirmed. The model cannot emit arbitrary joint angles, nor skip a real check merely because it previously said "done."
>
> The acceptance criteria are exactly those of experiment 6-10: cup in the tray, paper in the bin, arm back in a safe pose, no collision and no out-of-bounds motion. The difference is that in the autonomous experiment the task semantics must come from the model's own observation, the real actions must come from tool calls, and the final state must be confirmed by a fresh observation; the human may only start the run, hit the emergency stop and supervise safety, never complete an action on the Agent's behalf midway. Only then can experiments 6-10 and 6-12 be compared directly on "same hardware, same task—what is still missing between the human loop and the model loop."

Real-hardware experiments expose calibration error, camera occlusion and gripper failure, but they are poorly suited to repeating large numbers of faults safely and controllably. The simulation experiments that follow keep these five tools and exactly the same task state, replacing only the real actuator with a desktop environment into which failures can be injected, in order to separate what open-loop execution, step-by-step checking and action prediction each contribute.

### VLA Control

VLA stands for Vision-Language-Action. It takes the current frame and one skill instruction, then emits the action the robot should perform next:

```text
current observation + skill instruction → action
```

In the XLeRobot case the high-level planner only submits `pick(red_cup)`; the VLA or skill policy still has to decide, from the current frame, which direction to approach the cup from, when the gripper closes and along what trajectory the arm lifts. After the execution layer finishes that short motion it photographs the desk again, and only once the cup is confirmed to be held may the planner submit `place(red_cup, tray)`. A tool call therefore defines the desired state change, while the VLA defines how to realise that change through continuous motion.

RT-2 and OpenVLA cut continuous actions into discrete tokens and emit them one at a time, like generating text; π₀ represents the other route, producing continuous, smooth action trajectories directly. Neither is simply better: discrete tokens combine more easily with language models, while continuous trajectories usually express smooth motion better. The real trade-off is how the action should be represented, not merely model size.[^ch6-15]

A large model can usually run inference only 1–10 times per second, whereas a traditional controller may update tens to thousands of times per second. A common engineering answer is "action chunking": the model generates a short segment of future actions at once, a control thread executes that segment at a higher rate, and the model prepares the next segment in the background. This hides part of the inference wait inside the execution time. The cost is that the longer the segment, the smoother the motion but the fewer new frames the model sees during it; if the cup is knocked while XLeRobot reaches for it, the arm may still be executing actions generated from the old frame. Action chunking is therefore a trade-off between smoothness and reaction speed, not free acceleration.

### The Limits of VLAs

"Long-horizon planning + VLA" is a practical baseline, but several problems are easy to overlook:

- **Limited training data**: robot demonstrations are far scarcer than internet text and images. That a model has seen the word "cup" does not mean it has seen cups of every material and friction condition.
- **Imitation without consequence**: behaviour cloning mainly learns "what the demonstrator did next," and never explicitly requires the model to answer "what will this action cause."
- **Robots differ**: different robots have different degrees of freedom, coordinate frames, grippers and actuator latencies, so the same action does not necessarily transfer to another machine.
- **Observations go stale**: once an action chunk starts executing, an object may be moved, occluded or knocked over while the model is still deciding from the previous frame.

So a language model knowing what a "cup" is does not mean it knows how friction, contact, liquid sloshing and a power cable will change the future state. A VLA mainly answers "what should be done now"; another kind of model is needed to judge "what may happen afterwards."

### World Models

A world model can be understood as an "action-outcome predictor." What it learns is: given the current state and some action, how the next state may change.

```text
current state + candidate action
    → predict the next state or a future segment
    → compare candidate outcomes
    → choose an action, replan, or stop safely
```

A world model usable for robotics has to do at least three things well:

- understand the current state;
- predict the outcomes different actions may bring;
- pass those predictions to the planner or controller to help them choose.

A VLM that can only describe video, or a model that can only generate frames, does not automatically become a reliable robot world model. It must also know what the actions are and be able to predict their effect on objects and the environment. V-JEPA 2 represents the route of predicting the future in an internal state, while World-Action Models explicitly learn the "action–future observation" relationship. These models can work alongside a VLA; they need not replace it.[^ch6-16]

In practical systems a world model is typically used in three ways:

1. **Before acting**: compare candidates such as grasping, pushing or waiting, and prefer the lower-risk option;
2. **During execution**: compare the real observation against the prediction, and on divergence shorten the action, stop, or replan;
3. **During training**: learn state transitions from video, simulation data and failure trajectories, reducing trial and error on real hardware.

Back to the XLeRobot desk task: if the yellow paper is partly hidden under the red cup, the system can compare candidate skills such as "grab the paper first," "move the cup first" and "approach from another direction." The world model does not need to generate photorealistic robot video; predicting which candidates are more likely to make the paper graspable and which might knock the cup over is already enough to help the planner rank them. Once an action executes, the real camera observation remains the final truth; prediction can inform the choice but cannot replace acceptance.

What a world model gives is not a definite answer but a comparable prediction of "if I do this, what may happen." The further ahead it predicts, the larger the error usually grows, and a future frame that looks realistic may still violate real contact and friction. Practical systems therefore still need short-horizon prediction, real-time observation, an estimate of uncertainty, and an independent hardware safety controller. Generative world models can serve interactive simulation or visualisation, but "can generate video" must not be conflated with "can guide robot action."[^ch6-21]

> **Experiment 6-13 ★★: Comparing three autonomous desk-tidying loops in simulation**
>
> Put the task, object state, success conditions and five tools of experiment 6-12 into the desktop simulator unchanged, replacing only the real XLeRobot actuator with a controllable simulated one, and let grasps occasionally suffer recoverable transient failures. This allows three strategies to be compared without changing the problem.
>
> **Open-loop execution** generates the full action sequence once and never observes again midway; **step-by-step checking** re-reads the state after every `pick` and `place` and retries only the current skill on failure; **predictive execution** adds a short-horizon world model, comparing the expected outcomes of candidate skills before choosing the next step. The experiment compares task success rate, tool-call overhead and failure-recovery ability, and checks that every final success is confirmed by a fresh `verify_state` observation.
>
> The point is not to prove that a small simulated world model equals a real robot's physics model, but to verify a more basic relationship: an open-loop plan carries a single local failure all the way to the end of the task, step-by-step checking can recover, and action prediction can further help rank candidate skills. Whether the task is truly finished must still be decided by environment feedback.

### From Simulation to a Real Robot

Even if experiment 6-13 is stable in the simulator, that does not imply the real XLeRobot of experiment 6-12 will succeed the same way. Going from simulation to a real robot is not a matter of swapping in yet another controller, but of handling the differences between two environments. Training may use teleoperation data, video data or simulated interaction data; in real deployment the same red cup, yellow paper, tray and bin appear against different backgrounds, lighting, camera positions and occlusion relationships, and the arm additionally meets different friction, sensor noise and actuator latency. Once those differences are large enough, motions learned in simulation may fail in reality.

> **Experiment 6-14 ★★★: A cross-environment RGB test on the same desk task**
>
> Keep using the basic "move the object to its target" problem in simulation, treating each sample as one local decision within desk tidying: from the RGB frame, judge which direction to approach the object from, or whether it can already be grasped. Train four visual policies with identical structure: one sees only a fixed scene, one varies the background, one varies object appearance, and the last varies background, appearance, lighting and noise together.
>
> All policies are tested in the original environment and in the changed one, comparing action-decision accuracy before and after the visual conditions change. The question here is not "is the simulator already equal to the real XLeRobot," but a narrower one: does actively widening the range of visual variation during training help the same cup–tray, paper–bin task adapt to a new camera view? Even if the result improves, real deployment still requires real camera calibration, actuator testing and a complete safety loop.[^ch6-6]

## Chapter Summary

Viewed along the two axes of **modality** and **execution timing**, **asynchrony and event-driven execution** expand observation from “the Agent fetches it” to “the world pushes it,” and action from “finish within the turn” to “start now and finish through later events.” **Voice** compresses the scale to milliseconds, moving from turn-taking toward continuous listening and speaking while dividing realtime foreground interaction from deeper background thought. **Computer Use** moves the loop to the screen, where the bottlenecks include efficiency, continuous visual understanding, and state confirmation after actions. **Robotics** moves it into the physical world, where action chunking trades smoothness against responsiveness and completion must still be judged from a new observation.

The four sections share one control skeleton:

```text
keep perceiving
  → judge current state and timing
  → choose a reply or an action
  → let the output enter the environment
  → observe the feedback
  → continue, correct, retry, stop, or replan
```

They also share the same primitives—wake-up, safe points, cancellation, preemption, and fast/slow separation.

This chapter completes the last piece of the “building an Agent” part: the observation and action spaces have now been expanded in all three directions—content, modality, and timing. Next, Chapter 7 asks how to determine whether the system was built correctly; Chapter 8 explains how post-training updates model parameters; and Chapter 9 organizes runtime trajectories, evaluation, and multiple update carriers into a continual-evolution loop. Chapter 10 then moves from this complete single-Agent foundation to multi-Agent collaboration.

[^ch6-16]: Meta AI, “Introducing the V-JEPA 2 world model and new benchmarks for physical reasoning,” 2025-06-11. https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/; V-JEPA 2 technical report：arXiv:2506.09985, https://arxiv.org/abs/2506.09985

[^ch6-21]: Jack Parker-Holder and Shlomi Fruchter, Google DeepMind, “Genie 3: A new frontier for world models,” 2025-08-05. https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/; Zachary Lin et al. _Cosmos World Foundation Model Platform for Physical AI._ arXiv:2501.03575, 2025. https://arxiv.org/abs/2501.03575 。

[^ch6-1]: XLeRobot, "Teleop documentation". https://xlerobot.readthedocs.io/en/latest/software/getting_started/XLeRobot_teleop.html

[^ch6-2]: Google DeepMind, "Gemini Robotics-ER 1.5". https://deepmind.google/models/gemini-robotics/gemini-robotics-er/; XLeRobot, "LLM Agent control". https://xlerobot.readthedocs.io/en/latest/software/getting_started/LLM_agent.html. The upstream XLeRobot example shows how the model and tool calls are orchestrated; this section keeps the same orchestration principle but restricts the action tools to calibrated desktop grasp, place, check and stop primitives.

[^ch6-6]: LeRobot, "Sim2Real tutorial". https://github.com/StoneT2000/lerobot-sim2real/blob/87d6c1d969f6e0ca4dc5697940804e231118a63a/docs/zero_shot_rgb_sim2real.md

[^ch6-15]: Moo Jin Kim et al. _OpenVLA: An Open-Source Vision-Language-Action Model._ arXiv:2406.09246, 2024. https://arxiv.org/abs/2406.09246

[^ch6-22]: OpenAI, “[Async tool calling](https://developers.openai.com/api/docs/guides/async-tool-calling)”; “[Using GPT-6 Astra](https://developers.openai.com/api/docs/guides/latest-model)”, checked 2026-09-05.

[^ch6-23]: OpenAI, “[Mid-turn steering](https://developers.openai.com/api/docs/guides/steering)”, checked 2026-09-05.

## Thought Questions

1. ★★ In an asynchronous Agent architecture, the priority strategy for the event queue must be determined at design time. But if priority judgment itself requires semantic understanding (e.g., determining whether a new message is more urgent than the current task), who should make this judgment—a rules engine or another LLM call? What are the costs of each?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> A layered hybrid: events of clear type are hard-coded with rules—zero latency and strong determinism, but unable to understand the semantic difference between "stop right now" and "how is the weather today"; semantically ambiguous events go to a lightweight classification LLM acting as an event router, at the cost of hundreds of milliseconds of latency, extra fees, and possible misjudgment—and like the Sidecar, it must read only structured fields to guard against prompt injection.

</details>

2. ★★ In queue-based event processing, models tend to focus only on the last event. This chapter mitigates this through Agent status bar markers and summarization. But if the queue has 20 events backlogged (10 tool results + 5 user messages + 5 system alerts), how would you organize the presentation order and format of these events so that the model does not miss key information?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> First classify and deduplicate with rules and a lightweight LLM: urgent events (alerts, user interruptions) go through cancel-style handling separately and are not mixed into the batch. For the 10 overly long tool results, truncate and persist them to files, keeping only the head, tail, and path. Add a summary list to the system status bar at the end of the context (counts of each event type + a requirement to respond to each item).

</details>

3. ★★★ When an Agent interacts with the external world on behalf of a user, it essentially faces an identity choice: use an independent virtual identity (dedicated email and phone number) to act as a third party, or directly operate the user's personal accounts as the user? The former allows autonomous background operation, but third parties may not trust a non-human identity; the latter has more complete context and permissions but introduces authorization, trust, and security-boundary issues. In what scenarios do you think each mode should be chosen?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Default to a virtual identity: it can operate autonomously in the background and is auditable, and if it errs or is compromised it does not expose the user's entire digital identity—just as a secretary uses her own office email; you need to handle CAPTCHA/IP reputation issues (residential proxies). Scenarios that must use the user's own identity (account identity verification, three-way call confirmation—as when Pine calls customer service) use human-in-the-loop authentication: VNC/RDP lets the user log in personally and visually. The criteria: whether the counterparty requires the account holder in person, and the risk of the operation and the scope of the credentials.

</details>

4. ★★ The end-to-end model for voice Agents merges ASR-LLM-TTS into a single model, reducing latency but losing modularity. If the end-to-end model makes an error in a specific stage (e.g., speech recognition), debugging and fixing it is much harder than in a serial pipeline. How would you design an observability system for an end-to-end voice Agent?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Have the model emit readable intermediate representations alongside its output, such as Moshi's “inner monologue” text stream and acoustic event markers (`<emotion>`, `<noise>`). Use “self-cascading” to locate the error layer: the same model first transcribes and then reasons, and comparison with the end-to-end result shows whether the error lies in perception or thinking. Offline, run itemized regression tests along dimensions such as paralinguistic understanding and turn-taking judgment.

</details>

5. ★ Step-Audio R1 achieves "thinking while speaking" through the MPS dual-brain architecture. However, humans, when "thinking while speaking," often say things before they have fully thought them through, self-correct, or use filler words. Should an Agent's "thinking while speaking" mimic these human characteristics?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> It should mimic the “imperfections” that carry signal value: pauses and filler words externalize thinking and can mask latency, with the LLM deciding where to insert them. It should not mimic trust-destroying self-correction: the fast-slow contradiction in Solution 1 (“should I buy it or not?!”) collapses trust. MPS experiments show that the beginning of CoT mostly restates the question; opening early with groundwork is safe, with no need to misspeak and then correct.

</details>

6. ★★ SoM (Set-of-Mark) and its structured variants (DOM element indexing) convert Computer Use's visual localization from open-ended coordinate prediction to closed-set ID selection, but they all require detecting and annotating UI elements first—whether via a segmentation model or the DOM. If the interface contains non-standard controls or dynamically changing elements, the annotations may be incomplete or inaccurate. In such cases, should we fall back to coordinate prediction?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Coordinate prediction should be kept as a fallback: it is the only route that does not depend on annotation and applies to non-standard controls and dynamic elements. More practical is a hybrid action space in which elements that can be annotated still use ID selection. Coordinate prediction must perform resolution matching and proportional scaling, otherwise systematic offsets occur.

</details>

7. ★★ Thousand-dollar robot platforms like XLeRobot make teleoperation data collection inexpensive. However, the quality of teleoperation data depends heavily on the operator's skill. How would low-quality data from an unskilled operator affect the training of a VLA model? How can low-quality data be automatically filtered during the data collection phase?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> VLA relies mainly on imitation learning, so low-quality demonstrations teach it jitter, detours, hesitation, and failed motions as if they were correct strategy. This echoes Chapter 8's judgment: data matters more than architecture.

</details>

8. ★★★ This chapter covers three interaction modalities: voice, Computer Use, and robotics. A common trend across these modalities is the evolution from serial pipelines to end-to-end models. If this trend continues, what might the Agent interaction layer look like in five years?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> As Thinking Machines Lab argues, interactivity will be built into the model rather than bolted on as a harness, scaling together with intelligence. Computer Use will move from frame-by-frame screenshots to continuous observation. World models for embodied intelligence will be realized comprehensively, but fast-slow decoupling will not disappear because frontier reasoning models evolve rapidly; an architecture in which an interaction model and a SOTA thinking model collaborate as fast and slow thinkers may become a long-term architecture.

</details>

9. ★★ DOM/Accessibility Tree element indexing works well on standard web applications, but an increasing number of software interfaces (Canvas/WebGL rendering, cross-platform custom-drawn controls) do not provide accessible structured information, relying solely on visual annotation or coordinate prediction. Do you think Computer Use should bet on a purely visual approach, or maintain both structured and visual paths? What are the costs and benefits of maintaining both paths?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> In the short term, both paths coexist: when structured indexing is available, localization is most accurate and stable, free of segmentation false detections; pure vision is the only option for native software, Canvas, and games. When the model itself has strong grounding ability (clicking specified coordinates), structured indexing does not offer a significant advantage. In the long term, the purely visual route has the higher ceiling.

</details>

10. ★★ VLA models use action chunking—as mentioned in the text, π₀'s typical configuration generates 25-50 future actions at 50Hz—to hide inference latency within execution time. However, if the environment changes suddenly during execution (e.g., an object is moved), the pre-generated action sequence becomes invalid. How can we balance the efficiency advantage of action chunking with the need for responsiveness to environmental changes?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Chunking essentially trades reactivity for smoothness—the longer the chunk, the duller the response. Chunk length only needs to satisfy the lower bound “inference time < chunk execution time”; do not lengthen it blindly. Keep the perception model running during execution, and when it detects a sudden environmental change, discard the remaining actions and re-infer, the equivalent of “barge-in” in the voice scenario. Chunk length can be adjusted dynamically: long chunks save compute in static scenes, while short chunks preserve response latency in dynamic scenes.

</details>

11. ★★★ All three scenarios in this chapter (voice, Computer Use, robotics) face the latency problem of the "perceive-think-act" loop and are evolving toward parallelized fast and slow thinking. In voice, this manifests as "correcting after misspeaking"; in Computer Use, as "clicking first, then looking"; in robotics, as "taking a step, then looking." How can we ensure that these actions based on fast thinking do not lead to irreversible consequences?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Grade actions by reversibility. Fast thinking may execute only reversible actions; irreversible operations must be cleared by slow thinking. The fast model must not be allowed to make tool calls that cause irreversible consequences.

</details>

12. ★★★ The same set of primitives (wake-up, safe point, cancellation, preemption, fast/slow separation) recurs in this chapter at different time scales. Pick one and explain how its implementation differs between event-driven processing (seconds to days) and robot action chunking (milliseconds). What mainly determines that difference—the speed at which the environment changes, the reversibility of the action, or the cost of obtaining an observation?

<details class="thought-answer">
<summary>💡 Click to reveal reference answer</summary>

> Take **cancellation**. In event-driven processing, cancellation happens at a safe point between two tool calls: on receiving `terminate` the Agent cleans up resources, returns an acknowledgement, and exits; a latency measured in seconds is acceptable, because a single tool call already takes seconds to minutes. In action chunking, cancellation must take effect within milliseconds: the moment the control thread sees a safety event or a significant change in the observation, it must stop the current motion, discard the remaining chunk, and re-observe—one step late and it may hit an obstacle.
>
> Of the three candidate factors, **the cost of obtaining an observation** is actually the least decisive—both sides can re-observe cheaply. What really drives the difference is a combination of the other two: **the speed at which the environment changes** determines how dense the safe points must be (between tool calls is enough vs. one per control cycle), and **the reversibility of the action** determines the cost of missing one (an extra email can be followed by an apology; a knocked-over cup cannot be undone).
>
> From this a design rule falls out: the density of safe points should match the speed at which the environment changes; and how much extra protection is needed beyond the safe points (hardware emergency stop, an independent safety controller, secondary confirmation) depends on how irreversible the action is. This also explains why high-risk operations in Chapter 4 require prior approval while robots need a hardware safety layer independent of the model—both are the second line of defence added where safe points alone are not enough.

</details>

## Practice Multiple-Choice Questions

### Question 1: Expanding Observation and Action Spaces across Modality and Timing

Chapter 6 expands an agent's observation and action spaces along two primary axes: modality and timing. Why does the chapter emphasize that traditional synchronous turn-taking is merely an "interaction convention of the interface" rather than an inherent property of the external environment?

- A) In physical reality and asynchronous digital environments, external events (incoming emails, user interruptions, dynamic web page updates, shifting physical objects) occur continuously and independently of the model's inference cycle; assuming the world stands still while an LLM generates tokens is an artifact of early synchronous chat APIs.
- B) Turn-taking was mathematically proven by early cybernetics researchers to be the only optimal game-theoretic strategy for multi-agent coordination under zero-sum constraints.
- C) Modern transformer decoders can only attend to key-value cache prefixes if incoming context tokens arrive at strictly synchronized, discrete 1-second intervals.
- D) Asynchronous environments violate causal entropy laws, forcing all embodied agents to execute motor actions before receiving sensory observations.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 6.1 ("Two Axes: Modality and Timing") explicitly states: "Turn-taking is an interaction convention of the model and its interface, not a property of the environment." In the real world, mail arrives while the agent thinks, users cut in mid-sentence, web pages update between frames, and cups are knocked over while a robotic arm reaches. Early synchronous chat protocols forced a turn-based paradigm where the environment was assumed to pause during LLM reasoning. Expanding across **modality** (text to voice, screen pixels, joint torques) and **timing** (synchronous rounds to continuous, interruptible, preemptible streams) aligns the agent with real-world dynamics. Distractor B is fabricated game theory; C is false regarding transformer mechanics; D is scientifically nonsensical.
</details>

### Question 2: Event-Driven Mechanics and Safe Points in Synchronous APIs

When implementing an asynchronous event-driven agent on top of a model API that enforces a standard synchronous tool-calling format (requiring every assistant tool call to have a corresponding tool result before the next turn), how must the runtime handle a high-priority user cancellation event while a long-running tool is actively executing?

- A) The runtime must silently drop the user's cancellation message and wait for the long-running tool to complete, because injecting messages into an active tool cycle invalidates the model's KV cache.
- B) The runtime sends a cancellation signal to the tool executor, injects an explicit placeholder tool result (e.g., "The tool is executing in the background, please prioritize the new event") to satisfy API pairing invariants, appends the user cancellation event, and immediately re-invokes the LLM.
- C) The runtime synthesizes a fake successful tool execution return with dummy data so the LLM assumes the task finished normally and terminates without error.
- D) The runtime deletes the entire conversation trajectory and reboots the agent from the system prompt to purge the pending tool state.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.1.4 ("Compatibility When Native Asynchrony Is Unavailable") defines the five rules for running an asynchronous event loop over synchronous APIs. Rule 3 mandates that when an interruption arrives during tool execution, the system must generate a placeholder response for the unfinished tool ("The tool is executing in the background, please prioritize the new event"), append the interruption event, and re-invoke the LLM. This satisfies the strict API requirement that assistant tool calls and tool results remain paired, while establishing a safe point early. Faking a successful result (Distractor C) violates truthfulness and causes hallucinations; dropping the event (Distractor A) destroys responsiveness; wiping the trajectory (Distractor D) loses all context.
</details>

### Question 3: Event Routing and Security Triage

An enterprise agent receives heterogeneous incoming events from webhooks, user chat, system timers, and third-party email. To manage event urgency (cancellation, queued routine processing, parallel execution), Chapter 6 recommends a layered event router. What is the fundamental trade-off between deterministic rules and lightweight LLM classification, and how must prompt injection be mitigated at the routing layer?

- A) Deterministic rules offer zero latency and strict predictability but cannot discern semantic nuances (e.g., distinguishing "Stop immediately!" from "What's the weather?"); a lightweight LLM provides semantic classification at the cost of latency and compute, but must inspect only structured metadata fields rather than untrusted raw message bodies to prevent prompt injection.
- B) Deterministic rules can interpret arbitrary natural language semantics via regular expressions, whereas LLMs should only be used for calculating integer SHA-256 hashes.
- C) Lightweight LLMs must concatenate all untrusted email bodies directly into the system routing prompt with root administrative privileges so the router can detect hidden instructions.
- D) All incoming events must bypass routing and be executed via cancellation-based preemption to guarantee that the latest event is always processed first.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 6.1.3 ("Event Handling Mechanism: Urgency Determination") and Thought Question 1 detail the trade-offs of event routing: hardcoded rules have zero latency, zero token cost, and absolute determinism, but fail on semantic nuance (e.g., classifying whether an utterance is an urgent abort, a parallel lightweight query, or a routine instruction). A lightweight classification LLM acts as an effective event router for ambiguous events, but introduces hundreds of milliseconds of latency and token cost. Crucially, like the Sidecar pattern from Chapter 1, the router must read only structured fields (source, channel, priority tags) rather than untrusted raw payload text, preventing attackers from injecting adversarial instructions into event headers to hijack routing decisions. Distractors B, C, and D propose backwards or insecure architectures.
</details>

### Question 4: Event Queue Backlog Management and Attention Recency Bias

An autonomous agent experiences an event surge where 20 events accumulate in the queue (10 bloated tool execution results, 5 user messages, and 5 system alerts). According to Chapter 6, what architectural strategy prevents the LLM from succumbing to attention recency bias (focusing solely on the last event) or overflowing the context window?

- A) Reversing the queue so that the oldest event is always the last token in the prompt, while silently discarding all 10 tool execution results.
- B) Segregating urgent alerts for immediate cancellation handling, truncating oversized tool outputs to disk while keeping only summaries and file paths in context, and injecting an explicit Agent Status Bar with event counts and a mandatory response checklist.
- C) Concatenating all 20 events into a single unbroken string without delimiters and relying on the model's self-attention to automatically infer event boundaries.
- D) Dropping all user messages and processing only the 10 tool outputs, since tool results take legal precedence over user instructions in agent runtimes.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.1.4 ("Attention Dispersion in Queue-Based Processing") and Thought Question 2 specify the exact remedy for backlogged event queues: (1) Classify and deduplicate: urgent events (alerts, user stops) are handled via cancellation pathways rather than batched with routine items. (2) For oversized tool results, truncate and persist the full payload to local disk (Chapter 2 pattern), keeping only the head, tail, and file path in context. (3) Prepend explicit status bar markers (`[Unprocessed Event 1/4]`, `[Unprocessed Event 2/4]`) and append a summary to the system status bar (e.g., "There are 4 unprocessed events above... Please ensure your response covers all the information"), forcing the model to systematically address every item rather than exhibiting recency bias toward the final token. Distractors A, C, and D represent flawed context engineering practices.
</details>

### Question 5: Agent External Identity: Virtual Persona vs Direct Delegation

When an autonomous AI assistant interacts with third parties (e.g., calling customer service to negotiate a bill, sending emails, or booking services), why does Chapter 6 recommend provisioning an independent virtual identity (dedicated email, virtual phone number, isolated VM) as the default architecture instead of directly delegating the user's primary personal accounts?

- A) Personal accounts cannot send HTTP requests, whereas virtual identities have native access to TCP/IP network sockets.
- B) Independent virtual identities provide auditability, enable 24/7 background operation without hijacking the user's active session, and constrain the security blast radius if the agent makes an error or suffers prompt injection; sensitive operations requiring the true account holder are bridged via Human-in-the-Loop remote desktop (VNC/RDP) authentication.
- C) Modern web platforms grant higher API rate limits and lower subscription pricing to autonomous AI bots than to verified human users.
- D) Virtual personas completely eliminate the need for residential proxies, as data center IP addresses are inherently trusted by all anti-bot CAPTCHA systems.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.1.2 ("Virtual Identity and Isolated Execution Environment") and Thought Question 3 analyze the identity choice: direct delegation of a user's personal account introduces massive security risks—a single prompt injection or agent hallucination could expose or destroy the user's entire digital life (email, banking, cloud storage). An independent virtual identity (dedicated email, VoIP number, isolated VM/container) acts like an executive secretary: it operates autonomously 24/7, maintains an independent audit log, and strictly confines the blast radius of any compromise. When an external counterparty legally demands the actual account holder (e.g., OTP entry or three-way bank verification), Human-in-the-Loop remote desktop (VNC/RDP) allows the user to visually inspect the screen and authenticate personally. Distractors A, C, and D assert false technical premises.
</details>

### Question 6: Traditional Cascaded Voice Pipeline Bottlenecks

In traditional voice agent systems built on a serial cascaded pipeline (VAD → ASR → LLM → TTS), what architectural bottlenecks typically cause end-to-end response latency to exceed 1.5 seconds and degrade conversational quality?

- A) Audio waveforms cannot travel over WebSocket connections without being converted into 64-bit floating point matrix tensors.
- B) Latency accumulates serially across discrete stages (VAD silence threshold waits, ASR transcription, LLM time-to-first-token, TTS audio packet synthesis), while paralinguistic cues (intonation, emotion, hesitation, acoustic environment) are irreversibly lost when speech is converted into plain text.
- C) Text-to-Speech models require a minimum of 10,000 input tokens before they can synthesize the first audio phoneme.
- D) Automated Speech Recognition (ASR) models can only transcribe audio if the speaker uses a standardized 440 Hz musical pitch.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.2.2 ("Paradigm 1 · Cascaded Pipeline") explains the structural flaws of cascaded voice systems: (1) Serial latency accumulation: VAD must wait through a silence threshold (typically 400–800ms) to confirm the user finished speaking, ASR takes time to transcribe, the LLM takes time to generate the first token (TTFT), and TTS takes time to synthesize and buffer audio packets, easily pushing total latency past 1.5–2.5 seconds (Figures 6-7 and 6-8). (2) Paralinguistic information loss: converting speech into plain text discards pitch, prosody, emotional inflection, sighs, laughter, and ambient background noise. (3) Context fragmentation across audio chunk boundaries. Distractors A, C, and D are absurd technical distractions.
</details>

### Question 7: Evolution to Full-Duplex Interactive Voice Models

How do Full-Duplex interactive voice architectures (such as Kyutai's Moshi, Thinking Machines Lab's Interaction Models, and OpenAI's GPT-Live) fundamentally differ from End-to-End Omni models (such as MiniCPM-o 4.5 in standard turn-based mode)?

- A) Full-duplex models eliminate the concept of discrete conversational turns, modeling input and output audio as parallel continuous streams that enable simultaneous listening, speaking, backchanneling, and real-time interruption handling without external VAD floor-control.
- B) Omni models operate exclusively on text tokens, whereas full-duplex models operate exclusively on MIDI musical synthesizer files.
- C) Full-duplex models run only on quantum computers because classical GPUs cannot process bidirectional audio channels.
- D) Omni models support barge-in by default, whereas full-duplex models strictly forbid the user from speaking while the model's audio buffer is playing.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 6.2.1 and Section 6.2.4 explain the voice paradigms: End-to-end Omni models (Paradigm 2) unify audio perception and generation into a single neural network, lowering latency and preserving paralinguistic tone, but they still operate on a turn-based paradigm governed by external VAD floor-control. In contrast, Full-Duplex interactive models (Paradigm 3, e.g., Moshi, Thinking Machines Lab Interaction Models, GPT-Live) eliminate turn-taking assumptions entirely. They process continuous incoming audio frames while simultaneously streaming output audio, naturally handling overlapping speech, conversational backchannels ("uh-huh", "right"), and instantaneous interruption detection as emergent internal model decisions. Distractors B, C, and D state incorrect or inverted definitions.
</details>

### Question 8: Dual-Brain Voice Architectures: MPS, Filler Words, and Trust

In real-time voice agents implementing a fast-and-slow / dual-brain cognitive architecture (such as Step-Audio R1's MPS system or Pine AI's decoupled pipeline), how should the system balance conversational filler words against real-time self-correction?

- A) The agent should frequently change its mind and self-correct mid-sentence (e.g., saying "Yes, buy it... wait, definitely do not buy it!"), because human conversationalists exhibit high rates of contradictory speech.
- B) The agent should remain completely silent for 10 seconds until the slow reasoning model finishes its complete proof, since filler words violate audio bandwidth standards.
- C) The fast foreground system can use conversational filler words and preliminary framing (e.g., restating the question, confirming constraints) to mask reasoning latency, but must avoid contradictory self-corrections on substantive decisions that destroy user trust.
- D) The slow background model must be trained to speak at 5x playback speed to overwrite the foreground model's speech buffer during generation.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** C

**Explanation:** Section 6.2.5 ("Cognitive Timing: Realtime Interaction and Deep Thinking") and Thought Question 5 discuss the behavioral design of fast-and-slow voice agents. The fast model can mimic natural human "imperfections" that carry communication value—using brief pauses, conversational acknowledgments ("Let me check that for you..."), or problem restatements to signal active listening and mask background reasoning latency. However, it must NOT mimic erratic self-correction on core advice (e.g., Solution 1's contradiction: "Buy it now! Wait, actually don't buy it!"), as conflicting statements collapse user trust. Step-Audio R1's MPS shows that initial CoT tokens mostly lay groundwork and restate premises, making early opening statements safe without risking abrupt reversals. Distractors A, B, and D describe harmful or fictitious behaviors.
</details>

### Question 9: Acoustic Turn-Taking, Streaming Perception, and Barge-In

In an interactive streaming voice agent, when the user begins speaking while the agent is actively playing synthesized speech (a "barge-in" event), what sequence of operations must the audio runtime execute to maintain conversational fluency?

- A) Amplify the agent's speaker volume to drown out the user's voice until the current sentence ends.
- B) Detect acoustic interruption via streaming VAD or acoustic event markers, immediately discard downstream TTS playback buffers, cancel in-flight LLM generation, and route the newly captured user audio into context.
- C) Mute the microphone for 5 seconds to prevent acoustic feedback from entering the ASR model.
- D) Write the user's speech to an archival log file and schedule its playback after the agent finishes its multi-paragraph monologue.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.2.3 ("From Serial to Streaming Perception") and Thought Question 10 discuss barge-in mechanics: when the user cuts in, the system must detect speech onset immediately (via streaming VAD or acoustic event tokens like `<interrupt>`). It must instantly clear the downstream audio output buffer so the speaker stops talking within milliseconds, abort the active LLM streaming generation to conserve compute, and transition the model's state to listening. Failing to discard audio buffers causes the agent to keep talking over the user. Distractors A, C, and D describe completely broken, unnatural voice UX.
</details>

### Question 10: Computer Use Perception: DOM Indexing vs SoM vs Coordinate Prediction

An engineering team is designing a Computer Use agent capable of operating both web applications and legacy desktop software. What are the key operational differences and trade-offs between Structured Element Indexing (DOM/Accessibility tree), Set-of-Mark (SoM), and Pure Coordinate Prediction?

- A) Structured indexing requires no browser DevTools protocol, while SoM requires access to the website's backend SQL database.
- B) Structured indexing offers the highest stability and accuracy by extracting interactive elements from the DOM/Accessibility tree into numbered IDs, but is unavailable on Canvas/games/custom-drawn controls; SoM uses computer vision segmentation to overlay IDs on visual elements without needing underlying code, but can suffer segmentation errors; Pure Coordinate Prediction requires no annotations but depends heavily on resolution scaling and vision-language grounding.
- C) Pure Coordinate Prediction is immune to screen resolution changes, whereas DOM indexing fails whenever the browser window is resized.
- D) Set-of-Mark (SoM) reduces LLM prompt token consumption by 99% compared to coordinate prediction because marked images bypass the vision encoder.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.3.2 ("Visual Grounding") and Thought Questions 6 & 9 compare the three perception routes: (1) **Structured Element Indexing** (e.g., `browser-use` via CDP) reads DOM nodes and accessibility trees, assigning IDs to interactive controls. It provides deterministic, rock-solid grounding on standard web apps, but fails on Canvas, WebGL, or custom-drawn desktop UIs. (2) **Set-of-Mark (SoM)** uses segmentation models (SAM) to visually detect bounding boxes and overlay numerical tags on the screenshot, converting coordinate prediction into a closed-set multiple-choice selection on any visual surface, though segmentation models can miss small or low-contrast elements. (3) **Pure Coordinate Prediction** (e.g., Claude Computer Use, SeeClick) directly predicts $(x, y)$ pixels from raw screenshots; it requires no UI parsing or annotation pre-processing, but requires bidirectional coordinate resolution scaling and specialized grounding training. Distractors A, C, and D present false claims.
</details>

### Question 11: GUI Action Execution and Aspect-Ratio-Aware Coordinate Scaling

Claude 3.7 / 3.5 Sonnet Computer Use was trained on specific display resolutions: XGA ($1024 \times 768$, 4:3), WXGA ($1280 \times 800$, 16:10), and FWXGA ($1366 \times 768$, ~16:9). If an agent operates on a host monitor running at $2560 \times 1440$ (16:9), why must the runtime resize the screenshot to FWXGA ($1366 \times 768$) rather than XGA ($1024 \times 768$), and how are coordinates translated?

- A) Resizing to XGA would force non-uniform horizontal compression (distorting 16:9 into 4:3), causing the model's visual perception to suffer systematic horizontal coordinate offsets; matching aspect ratios preserves geometry, allowing coordinates $(x_m, y_m)$ to be mapped back via $(x_m \times \frac{2560}{1366}, y_m \times \frac{1440}{768})$.
- B) XGA uses 32-bit color while FWXGA uses 8-bit grayscale, so XGA would exceed the model's tensor memory limits.
- C) Modern operating systems cannot display resolutions below 1080p, so the desktop environment would crash if XGA were used.
- D) Coordinate scaling is unnecessary because transformer self-attention automatically translates normalized coordinates across non-uniform aspect ratio distortions.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 6.3.2 ("Pure Coordinate Prediction", Figure 6-14) explains that vision models predict coordinates based on the pixel geometries learned during pretraining. Forcing a 16:9 screenshot ($2560 \times 1440$) into a 4:3 canvas ($1024 \times 768$) compresses the image horizontally, distorting buttons and causing the model's predicted coordinates to suffer systematic offsets. To prevent distortion, the runtime must select the target resolution whose aspect ratio is closest to the screen (FWXGA $1366 \times 768$, which is 16:9). Click coordinates $(x_m, y_m)$ output by the model are then proportionally scaled to host coordinates: $X = x_m \times \frac{2560}{1366}$, $Y = y_m \times \frac{1440}{768}$. Distractors B, C, and D are technically absurd.
</details>

### Question 12: Dynamic Computer Use via Agent-Computer Observation Interfaces (AOI)

Standard Computer Use agents assume a static screen model (take screenshot → think → click → take next screenshot). Why does this paradigm fail in dynamic environments (e.g., attending video meetings, monitoring streaming dashboards, catching ephemeral toasts), and how does an Agent-Computer Observation Interface (AOI) solve this?

- A) Static screen models cause physical monitor burn-in; AOI rotates screen pixels continuously to protect hardware.
- B) Static screen agents are blind to changes occurring between infrequent screenshots (3–5s intervals); AOI introduces screen keyframe capture (triggered only by significant visual changes), volume-gated speech transcription, and textual state summarization to compress continuous visual-auditory streams into context.
- C) Dynamic web pages block all screenshots using DRM encryption; AOI bypasses DRM by extracting GPU assembly instructions.
- D) AOI replaces the LLM with a 1000 FPS ultra-high-speed camera that records uncompressed RAW video directly into the prompt context.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.3.3 ("A Computer Use Agent That Can Watch Animations and Hear Sound", citing Li & Shi, arXiv:2606.29472) addresses the limitation of traditional GUI agents that "open their eyes only once every 3–5 seconds and have no ears." If a toast notification flashes for 1.5 seconds, an animation plays, or a participant speaks in a meeting, a static screenshot agent misses it completely. An Agent-Computer Observation Interface (AOI) resolves this by: (1) Keyframe capture: a lightweight model continuously checks for meaningful visual deltas and triggers screenshots only when the screen changes (~1 frame/sec); (2) Volume-gated speech transcription: audio streams are transcribed and injected as text; (3) Textual screen summarization: past frames are converted into concise text descriptions, preserving temporal history without blowing up multimodal token limits. Distractors A, C, and D are fictitious.
</details>

### Question 13: World Models for GUI Speculative Execution

On the OSWorld-Human benchmark, autonomous agents take substantially more steps and incur much higher latencies than human users, even on successfully completed tasks. According to Chapter 6, how do desktop world models (such as Induction Labs' Photon-1) help bridge this efficiency gap?

- A) Desktop world models replace the operating system's kernel with an LLM-based microkernel that compiles GUI events into C++.
- B) Desktop world models generate photorealistic 4K video clips of future desktop screens to display in marketing presentations.
- C) Desktop world models learn the state-transition function $\text{desktop state} + \text{action} \to \text{next state representation}$, allowing the agent to mentally simulate action consequences, plan multi-step sequences speculatively without waiting for full UI redraws, and identify irreversible actions prior to execution.
- D) Desktop world models overclock the host CPU clock frequency whenever an agent clicks a button.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** C

**Explanation:** Section 6.3.4 ("World Models for Computer Use") discusses the OSWorld-Human efficiency study and Photon-1. Humans do not passively wait for the UI to settle before planning the next move; they anticipate what clicking a menu or typing a shortcut will do, executing actions speculatively and pausing only if reality diverges from expectation. A desktop world model encodes system state (windows, focus, input fields, loading spinners) and predicts the latent representation of the next state resulting from candidate actions (`click`, `type`, `scroll`, `wait`). This enables: (1) comparing candidate action paths, (2) preparing follow-up steps while a page loads, and (3) predicting whether a destructive action will trigger an irreversible dialog, prompting user confirmation. Distractors A, B, and D describe irrelevant or nonsensical capabilities.
</details>

### Question 14: Embodied AI: Bridging High-Level Goals to Continuous Robot Control

In robotic systems such as XLeRobot (performing tasks like "tidy the desk by placing the cup in the tray and scrap paper in the bin"), how is control structured across timescales to prevent high-level reasoning latency from destabilizing physical hardware?

- A) A monolithic 70B parameter LLM directly emits 1000 Hz pulse-width modulation (PWM) electrical current signals to the robot's servo motors.
- B) The architecture is hierarchically decomposed: high-level planners (VLM/Agent, operating at minutes/seconds) decompose goals into discrete skill primitives (`pick`, `place`, `verify_state`); a VLA policy (operating at 1–10 Hz) predicts short motion trajectories or discrete action tokens; and a low-level safety controller (operating at 50–1000 Hz) executes calibrated motor commands with hardware speed limits and emergency stops.
- C) Low-level robot joints run open-loop without sensor feedback, relying entirely on the high-level LLM's imagination.
- D) All motor control is performed by converting joint angles into natural language sentences sent over public cellular networks.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.4.2 ("The Basic Structure of Robot Control", Table) details the timescale decomposition in robotics: (1) Task goal (minutes), (2) Long-horizon planning (seconds to minutes, e.g., decomposing "tidy desk" into cup then paper), (3) Basic skills (1–3s, e.g., `pick(red_cup)`), (4) VLA/skill policy (1–10 Hz inference, e.g., RT-2, OpenVLA, $\pi_0$), and (5) Low-level control and safety (50–1000 Hz, joint motor execution, torque limits, hardware e-stop). If an LLM tried to directly control high-frequency joint currents (Distractor A), inference latency would cause the arm to collapse or collide. Hierarchical separation ensures that high-level planners only select bounded skills, while real-time controllers enforce physical safety invariants. Distractors C and D describe unworkable and hazardous designs.
</details>

### Question 15: Action Chunking in Robotics: Balancing Smoothness and Reactivity

Vision-Language-Action (VLA) models such as $\pi_0$ employ "Action Chunking" (e.g., predicting 25–50 future actions at 50 Hz in a single forward pass). What is the primary engineering rationale for action chunking, and what trade-off does it impose?

- A) It trades environmental reactivity for execution smoothness: generating an action chunk amortizes slow VLA inference latency (1–10 Hz) over smooth high-frequency execution (50 Hz), but the robot executes open-loop during the chunk, remaining blind to sudden environmental disturbances until the next observation.
- B) It prevents the robot from consuming electrical power during motor movement.
- C) It guarantees that the robotic arm can pass through solid physical barriers without colliding.
- D) It eliminates the need for cameras or visual sensors, as 50 actions are sufficient to navigate any arbitrary room blindly.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** A

**Explanation:** Section 6.4.4 ("VLA Control") and Thought Question 10 explain Action Chunking: because large VLA models run inference at only 1–10 Hz, requesting an action one step at a time results in jerky, stop-and-go motion. Action chunking enables the model to predict a sequence of 25–50 future motor actions in one inference step, which a low-level control thread executes smoothly at 50 Hz while the model computes the next chunk in the background. The fundamental trade-off is **smoothness versus reactivity**: the longer the chunk, the smoother the trajectory and lower the compute cost, but the duller the agent's responsiveness to dynamic changes (e.g., if a cup is nudged mid-reach, the arm executes stale actions). Dynamic chunk sizing and perceptual interruption ("barge-in" for robots) balance this trade-off. Distractors B, C, and D are absurd.
</details>

### Question 16: Teleoperation Data Quality and Imitation Learning Vulnerabilities

Low-cost platforms like XLeRobot make collecting robot teleoperation data accessible. However, why does low-quality demonstration data from unskilled human operators degrade a VLA model's autonomous policy much more severely than noisy text degrades an LLM?

- A) Robot hardware burns out if it receives training data with low framerates.
- B) VLAs rely primarily on imitation learning (behavior cloning); human hesitation, trajectory jitter, sub-optimal detours, and uncoordinated retries are directly learned as optimal policy paths, causing the robot to reproduce erratic motions and fail when encountering compounding drift.
- C) Human teleoperators emit electromagnetic interference that permanently demagnetizes the robot's magnetic encoders during data logging.
- D) Low-quality teleoperation data causes the loss function to become strictly zero, halting gradient descent.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.4.1 ("The Division of Labour Between Hardware and Algorithms"), Section 6.4.5 ("The Limits of VLAs"), and Thought Question 7 explain why teleoperation data quality is critical: VLAs learn via behavior cloning / imitation learning, which assumes demonstrations reflect an optimal policy $\pi^*(a|s)$. If an unskilled operator hesitates, jerks the controller, overcorrects, or makes sloppy contact, the model faithfully learns those flaws as normative behavior. Furthermore, compounding errors occur: when the robot drifts slightly off-distribution, poor demonstration data provides no corrective recovery signals. This reinforces the core thesis: in physical manipulation, data quality matters more than model architecture. Distractors A, C, and D are fictitious.
</details>

### Question 17: Closed-Loop Desktop Manipulation: Open-Loop vs Step-by-Step vs World Model

In Experiment 6-13 (comparing three autonomous desk-tidying loops in simulation: Open-loop execution, Step-by-step checking, and Predictive execution with a world model), what key finding emerged regarding transient grasp failures?

- A) Open-loop execution succeeded 100% of the time because visual perception is unnecessary once an initial plan is formulated.
- B) Step-by-step checking with `verify_state()` allowed the agent to detect when a grasp slipped and retry only the failed skill primitive locally, whereas open-loop execution propagated a single grasp failure into total task failure; predictive execution further improved efficiency by ranking candidate approach angles before acting.
- C) Predictive execution completely eliminated the need for camera observations, allowing the simulated arm to operate with sensors powered off.
- D) Step-by-step checking performed worse than open-loop execution because calling `verify_state()` erases the agent's memory of the task goal.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.4.6 (Experiment 6-13: "Comparing three autonomous desk-tidying loops in simulation") details the results: (1) **Open-loop execution** generates the entire sequence up front; when a transient grasp failure occurs (the cup slips), it blindly proceeds to execute `place()`, carrying the failure to the end. (2) **Step-by-step checking** calls `verify_state()` after each primitive (`pick`, `place`); if the cup was not secured, it retries only the failed `pick` action locally, achieving robust recovery. (3) **Predictive execution** adds a short-horizon world model to evaluate candidate skills (e.g., moving an occluding cup before grabbing paper), optimizing the execution path. In all cases, environment observation remains the ultimate ground truth. Distractors A, C, and D contradict the experimental findings.
</details>

### Question 18: Unified Safety Primitives Across Timescales: Density and Reversibility

Chapter 6 unifies interaction safety across timescales—from event loops (seconds/days), to voice dialogues (sub-seconds), to robot motor loops (milliseconds)—using shared primitives (safe points, cancellation, preemption, and fast/slow separation). What fundamental principles determine how these safety primitives must be deployed across disparate domains?

- A) Safety primitives should be identical across all domains: a robot joint motor loop should wait 24 hours for human email approval before completing an emergency stop.
- B) The required density of safe points is determined by the speed at which the environment changes (e.g., tool call boundaries for async tasks vs millisecond control cycles for robotics), while the necessity for independent non-model safety layers (hardware e-stops, human-in-the-loop gates) is determined by the irreversibility of the action.
- C) Fast thinking should be permitted to execute irreversible destructive actions, while slow thinking is restricted to non-binding conversational comments.
- D) Actions in physical environments are completely reversible via software undo commands, whereas sending an email cannot be undone under any circumstances.

<details class="quiz-answer">
<summary>Reveal Answer & Explanation</summary>

**Correct Answer:** B

**Explanation:** Section 6.5 ("Chapter Summary") and Thought Questions 11 & 12 analyze the unified safety primitives across time scales:

1. **Density of safe points**: Determined by the rate of environmental change. In async workflows (seconds to hours), pausing between discrete tool calls is sufficient. In physical robotics, the environment changes in milliseconds, so safe points and preemption checks must execute at 50–1000 Hz in the low-level loop.
2. **Reversibility determines protection**: Fast thinking should only execute reversible actions (conversational holding phrases, exploratory screen hovers). Irreversible actions (knocking over a fragile object, deleting user files, executing financial transactions) must be gated by slow thinking, secondary confirmation, or an independent hardware safety controller (e-stop) that bypasses the probabilistic model entirely. Distractors A, C, and D are dangerous or absurd anti-patterns.

</details>

<div class="chapter-navigation">
  <a href="/courses/ai-agents-in-depth/lessons/05-coding-agent-and-code-generation" class="chapter-nav-btn prev">← Previous: Chapter 5 — Coding Agent & Code Generation</a>
  <a href="/courses/ai-agents-in-depth/lessons/07-agent-evaluation" class="chapter-nav-btn next">Next: Chapter 7 — Agent Evaluation →</a>
</div>
