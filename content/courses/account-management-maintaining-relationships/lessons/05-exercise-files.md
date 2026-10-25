---
id: "42e64c7d-ab76-4b03-b646-1721eb0f28a4"
title: 'Exercise Files: Implementing CRM "Going Rotten" Timers & Pipeline SLAs'
description: "Hands-on implementation blueprint for configuring, calibrating, and automating decaying deal timers across Pipedrive, HubSpot, and Freshsales."
type: lesson
publish: true
status: active
created: "2026-09-29"
tags:
  - account-management
  - exercise-files
  - hands-on-lab
  - pipedrive
  - hubspot
  - freshsales
  - crm-automation
courseId: "ddf6bbfc-4022-490b-833f-212b2ac5892f"
lessonOrder: 6
estimatedMinutes: 22
comments: false
---

# Exercise Files: Implementing CRM "Going Rotten" Timers & Pipeline SLAs

In [[courses/account-management-maintaining-relationships/lessons/03-automating-account-cadence|Chapter 3: Automating Account Cadence]], we established the theoretical necessity of systematic touchpoint calendars, institutional memory, and decaying-deal timers. We proved that client relationships rarely disintegrate over dramatic conflicts; rather, they perish in **silent neglect** when account managers allow days and weeks of radio silence to accumulate.

However, an abstract organizational policy stating _"never let an account go cold for more than two weeks"_ is functionally useless without an **engineered technical enforcement engine**. When commercial teams scale, individual memory falters. Without automated visual degradation indicators and automated Service Level Agreement (SLA) alerts built directly into the operational Customer Relationship Management (CRM) platform, accounts inevitably slip through the cracks until contract renewal windows are irreversibly compromised.

This hands-on lab expands upon the core exercise files of the course (_Going Rotten Timer CRM Suggestions_). We transform high-level platform recommendations into an exhaustive, production-grade **7-Phase Implementation Blueprint**. Whether your organization runs on **Pipedrive**, **HubSpot Sales Hub**, or **Freshsales (Freshworks CRM)**, this lab guides you step-by-step through configuring stage-specific decay boundaries, building automated activity telemetry, deploying alerting workflows, executing daily triage rituals, and safeguarding against alert fatigue.

---

## Pedagogical Architecture: The Real-Time CRM Telemetry Pipeline

Before configuring vendor-specific settings, we must understand the end-to-end dataflow governing decaying deal timers. A decaying timer is not merely a static calendar counter; it is a **dynamic state machine** evaluated against continuous communication telemetry.

The following ASCII architecture diagram illustrates how modern CRM systems ingest multi-channel touchpoints, update inactivity deltas, evaluate stage-based SLA boundaries, and trigger programmatic alerts:

```
========================================================================================================================
                      REAL-TIME CRM TELEMETRY & DECAYING DEAL STATE ENGINE
========================================================================================================================

  TOUCHPOINT INGESTION LAYER
  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
  │ Outbound Email  │  │ Logged Call     │  │ Calendar Meeting│  │ Logged Note     │  │ Slack Connect   │
  │ (Synced Inbox)  │  │ (VoIP / Mobile) │  │ (GCal / Outlook)│  │ (CRM Manual)    │  │ (Webhook Event) │
  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘
           │                    │                    │                    │                    │
           └────────────────────┴──────────┬─────────┴────────────────────┴────────────────────┘
                                           ▼
                                ┌──────────────────────┐
                                │ CRM Telemetry Engine │
                                └──────────┬───────────┘
                                           ▼
                           ┌─────────────────────────────────┐
                           │ Inactivity Counter Reset Engine │
                           │  - Set Last_Touch = Timestamp   │
                           │  - Reset Delta_t  <-- 0 days    │
                           │  - Clear Amber/Red Alert Flags  │
                           └───────────────┬─────────────────┘
                                           │
 ══════════════════════════════════════════╪══════════════════════════════════════════════════════════════════════════
  TEMPORAL EVALUATION (Continuous or Daily Midnight Cron)
                                           ▼
                           ┌─────────────────────────────────┐
                           │ Scheduled Inactivity Evaluator  │
                           │ Compute: Delta_t = Today - Last │
                           └───────────────┬─────────────────┘
                                           ▼
                           ┌─────────────────────────────────┐
                           │ Stage SLA Boundary Comparator   │
                           │ Retrieve T_decay for Deal Stage │
                           └───────────────┬─────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         │                                 │                                 │
         ▼                                 ▼                                 ▼
   [ Condition 1 ]                   [ Condition 2 ]                   [ Condition 3 ]
   Delta_t < 0.75 * T_decay          0.75 * T_decay <= Delta_t         Delta_t >= T_decay
         │                                 │                                 │
         ▼                                 ▼                                 ▼
┌──────────────────────┐          ┌──────────────────────┐          ┌──────────────────────┐
│  ACTIVE / HEALTHY    │          │  WARNING / AT-RISK   │          │  ROTTEN / BREACHED   │
│  State: Green        │          │  State: Amber        │          │  State: Red Badge    │
│  Action: None        │          │  Action: Rep Digest  │          │  Action: SLA Trigger │
└──────────────────────┘          └──────────────────────┘          └──────────┬───────────┘
                                                                               │
 ══════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════════════
  DOWNSTREAM DISPATCH & TRIAGE
                                                                               ▼
                                                                 ┌───────────────────────────┐
                                                                 │ Idempotency & Rate Filter │
                                                                 │ Cooldown >= 7 Days Elapsed│
                                                                 └─────────────┬─────────────┘
                                                                               ▼
                                                     ┌─────────────────────────┴─────────────────────────┐
                                                     ▼                                                   ▼
                                         ┌───────────────────────┐                           ┌───────────────────────┐
                                         │ Rep Task & Webhook    │                           │ Morning Standup Queue │
                                         │  - High-Priority Task │                           │  - 8:45 AM Slack Bot  │
                                         │  - Direct Push Alert  │                           │  - Manager Escalation │
                                         └───────────────────────┘                           └───────────────────────┘
========================================================================================================================
```

### Telemetry Pipeline Breakdown

1. **Touchpoint Ingestion:** The CRM hooks into your primary communication channels (bidirectional email synchronization, VoIP call logs, connected calendars, and manual notes).
2. **Inactivity Reset:** Whenever any verified communication event occurs with an external domain contact, the deal's `Last Activity Date` timestamp updates to current time ($t_0$) and the inactivity delta resets ($\Delta t \leftarrow 0$).
3. **Temporal Inactivity Evaluation:** On a continuous or scheduled schedule (typically a midnight batch evaluator), the system computes the elapsed inactivity:
   $$\Delta t = t_{\text{current}} - t_{\text{last\_activity}}$$
4. **Stage SLA Boundary Comparison:** The evaluator looks up the customized decay threshold ($T_{\text{decay}}$) configured for the specific pipeline stage where the opportunity currently resides.
5. **State Transition Matrix:**
   - **Active (Green):** $\Delta t < 0.75 \times T_{\text{decay}}$. The account is on track; normal cadence applies.
   - **Warning (Amber):** $0.75 \times T_{\text{decay}} \le \Delta t < T_{\text{decay}}$. The opportunity is approaching SLA breach; flagged in individual rep queues.
   - **Rotten (Red):** $\Delta t \ge T_{\text{decay}}$. The relationship is officially decaying; cards are visually tinted red with an integer day counter, and automated escalation pathways activate.
6. **Idempotent Dispatch:** Automated webhooks dispatch to team collaboration tools (Slack/Teams) and generate high-priority CRM tasks for the account manager, subject to strict deduplication and cooldown rules to prevent notification fatigue.

---

## Phase 1: Environment & Pipeline Architecture

Before toggling timers in any software interface, you must configure your CRM's pipeline topology. A catastrophic mistake made by amateur sales operations teams is treating all commercial pipelines identically.

A high-velocity inbound sales cycle operates under vastly different time dynamics than an enterprise expansion or annual renewal cycle. Forcing both into a single pipeline destroys the accuracy of decay metrics.

```
========================================================================================================================
                     PIPELINE SEGMENTATION & ARCHITECTURAL SEPARATION
========================================================================================================================

  PIPELINE 1: NEW BUSINESS ACQUISITION
  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
  │ Inbound Lead  │ ──▶ │ Scoping & Demo│ ──▶ │ Solution Arch │ ──▶ │ Legal & Negot │ ──▶ │  Closed Won   │
  │ SLA: 3 Days   │     │ SLA: 7 Days   │     │ SLA: 10 Days  │     │ SLA: 14 Days  │     │ Handed Off    │
  └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘
  Temporal Velocity: Rapid, transactional, competitive pressure. Decays exponentially after 72 hours.

  PIPELINE 2: CLIENT IMPLEMENTATION & ONBOARDING
  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
  │ Kickoff Conf  │ ──▶ │ Data Migration│ ──▶ │ User Training │ ──▶ │ User UAT / QA │ ──▶ │ Go-Live Cutover│
  │ SLA: 7 Days   │     │ SLA: 14 Days  │     │ SLA: 14 Days  │     │ SLA: 7 Days   │     │ Active Prod   │
  └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘
  Temporal Velocity: Operational, milestones, deliverable-driven. Decays if client stalls on assets/approvals.

  PIPELINE 3: STRATEGIC ACCOUNT FARMING, RETENTION & EXPANSION
  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
  │ Account Health│ ──▶ │ Mid-Term Audit│ ──▶ │ Exec QBR Cycle│ ──▶ │ Renewal Negot │ ──▶ │ Retention Won │
  │ SLA: 60 Days  │     │ SLA: 45 Days  │     │ SLA: 30 Days  │     │ SLA: 14 Days  │     │ Contract Ext  │
  └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘
  Temporal Velocity: Relationship compounding, long cycles. Decays if executive silence exceeds 60 days.
========================================================================================================================
```

### Essential Custom Properties to Provision

To support full SLA governance and automated reporting across platforms, configure the following custom properties at the Deal / Opportunity entity level:

| Property Field Label           | Internal API Identifier      | Field Type                                                                                                            | Purpose & Operational Function                                                     |
| ------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Pipeline Health Status**     | `pipeline_health_status`     | Dropdown (`Healthy`, `At_Risk_Warning`, `Rotten_Breached`)                                                            | Programmatic tag evaluated by dashboards and automated filters.                    |
| **Days Since Last Touch**      | `days_since_last_touch`      | Integer / Calculated Number                                                                                           | Real-time integer count of calendar days since the most recent verified contact.   |
| **SLA Decay Threshold**        | `sla_decay_threshold`        | Integer (Days)                                                                                                        | The explicit operational SLA window defined for the deal's current stage.          |
| **Last Meaningful Touch Date** | `last_meaningful_touch_date` | Date Timestamp                                                                                                        | Verified date of substantive two-way dialogue (excluding automated system emails). |
| **SLA Alert Cooldown Date**    | `sla_alert_cooldown_date`    | Date Timestamp                                                                                                        | Timestamp of the most recent automated alert dispatched; prevents repeated spam.   |
| **Decay Root Cause Category**  | `decay_root_cause_category`  | Dropdown (`Unresponsive_Champion`, `Procurement_Delay`, `Internal_Resource_Bottleneck`, `Executive_Reprioritization`) | Required post-mortem field populated by rep during triage.                         |

---

## Phase 2: Stage-by-Stage SLA Threshold Calibration

Why does a deal go "rotten"? In commercial psychology, silence is rarely neutral. When an account goes silent, it indicates one of three structural pathologies:

1. **The Priority Paradox:** The project has slipped down the client's internal executive agenda, overtaken by competing operational fires.
2. **The Hidden Competitor Insertion:** A rival vendor has entered via another business unit and captured stakeholder attention.
3. **The Silent Departure:** Your internal champion or sponsor has resigned, transitioned roles, or been marginalized internally.

### The Mathematical Decay Model

Empirical sales analytics indicate that the hazard rate $\lambda$ of account churn or deal abandonment follows an exponential decay distribution. The cumulative probability of irreversible deal loss $P(\text{Loss})$ as a function of continuous silence $\Delta t$ is modeled as:

$$P(\text{Loss} \mid \text{Silence } \Delta t) = 1 - e^{-\lambda \Delta t}$$

Where:

- $\Delta t$ is the elapsed calendar days since the last verified communication touchpoint.
- $\lambda$ is the stage velocity coefficient. In early stages (inbound leads), $\lambda \approx 0.25$ (fast decay), meaning a 5-day silence yields:
  $$P(\text{Loss}) = 1 - e^{-0.25 \times 5} = 1 - e^{-1.25} \approx 1 - 0.2865 = 71.35\%$$
- In strategic account retention stages, $\lambda \approx 0.015$ (slow decay), meaning a 60-day silence yields:
  $$P(\text{Loss}) = 1 - e^{-0.015 \times 60} = 1 - e^{-0.90} \approx 1 - 0.4066 = 59.34\%$$

If you wait 90 days without contact in a strategic account ($\Delta t = 90$), the hazard escalates:
$$P(\text{Loss}) = 1 - e^{-0.015 \times 90} = 1 - e^{-1.35} \approx 1 - 0.2592 = 74.08\%$$

### Recommended Stage Decay Calibration Matrix

Use this authoritative calibration matrix when setting threshold integer parameters in your CRM:

| Pipeline         | Stage Name                       | SLA Window ($T_{\text{decay}}$) | Early Warning Window ($0.75 \times T_{\text{decay}}$) | Behavioral Rationale & Operational Risk                                                                                                              |
| ---------------- | -------------------------------- | ------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **New Business** | Inbound Lead / First Contact     | **3 Days**                      | 2 Days                                                | Commercial interest decays rapidly. If a prospect requests information, unresponsiveness after 72 hours correlates with an 80%+ drop in conversion.  |
| **New Business** | Scoping & Discovery Demo         | **7 Days**                      | 5 Days                                                | High cognitive engagement required. 7 days without calendar booking or follow-up notes signals lost momentum.                                        |
| **New Business** | Proposal & Solution Design       | **10 Days**                     | 7 Days                                                | Pricing proposals must be discussed live within 10 days before commercial conditions change or budgets freeze.                                       |
| **New Business** | Legal, Security & Procurement    | **14 Days**                     | 10 Days                                               | Redlines take time, but 14 days without an active procurement check-in indicates contracting paralysis or stalled compliance reviews.                |
| **Onboarding**   | Implementation & Training        | **14 Days**                     | 10 Days                                               | Technical implementations stall quickly. 14 days of inactive project boards signals missed milestones.                                               |
| **Onboarding**   | User Acceptance Testing (UAT)    | **7 Days**                      | 5 Days                                                | Critical path to go-live. Client testing teams must provide weekly feedback before deployment momentum dissolves.                                    |
| **Retention**    | Ongoing Account Health           | **60 Days**                     | 45 Days                                               | In existing accounts, 60 days of total silence guarantees blindness to organizational restructuring, executive turnover, or competitor encroachment. |
| **Retention**    | Scheduled QBR / Strategic Review | **30 Days**                     | 22 Days                                               | Preparing for an executive Quarterly Business Review requires active collaboration and agenda co-design across a 30-day window.                      |
| **Retention**    | Contract Renewal / Expansion     | **14 Days**                     | 10 Days                                               | Active commercial renewals require continuous bi-weekly alignment until signatures are executed.                                                     |

---

## Phase 3: Platform Blueprint 1 — Native Decaying Timers in Pipedrive

Pipedrive features one of the most elegant, native out-of-the-box implementations of decaying deal timers in modern sales software. As highlighted in the core exercise files, Pipedrive allows administrators to configure rotten deal thresholds independently for every individual pipeline stage. When a deal exceeds that threshold without logged activity, the platform dynamically applies a visual red tint and displays an exact integer day counter of how long the opportunity has been decaying past the SLA.

```
========================================================================================================================
                      PIPEDRIVE: NATIVE ROTTEN DEAL VISUAL DEGRADATION
========================================================================================================================

  KANBAN PIPELINE VIEW (Active Stage vs. Rotten Stage)

  [ Stage: Scoping (Rotten: 7d) ]        [ Stage: Proposal Sent (Rotten: 14d) ]
  ┌─────────────────────────────────┐    ┌─────────────────────────────────┐
  │ Deal: Acme Logistics Global     │    │ Deal: Apex Global Finance       │
  │ Value: \$48,000                  │    │ Value: \$125,000                 │
  │ Last Activity: Yesterday        │    │ Last Activity: 18 Days Ago      │
  │ Status: [ Green / Normal Card ] │    │ Status: [ ROTTEN / RED TINT ]   │
  │                                 │    │                                 │
  │ [✓ Meeting Completed]           │    │ [ ! ROTTEN BADGE: +4 DAYS ! ]   │
  └─────────────────────────────────┘    └─────────────────────────────────┘
                                                           │
                                                           ▼
                                         Card turns light pink/red;
                                         Prominent red circular badge: "+4"
                                         indicates deal is 4 days past SLA.
========================================================================================================================
```

### Step-by-Step Configuration Runbook for Pipedrive

#### Step 1: Accessing Pipeline Administration

1. Log in to Pipedrive with Administrator permissions.
2. In the top-right navigation header, click on your profile icon and select **Company Settings**.
3. In the left-hand settings sidebar, under _Tools and Integrations_, select **Pipelines**.
4. Click on the name of the pipeline you wish to configure (e.g., _Strategic Account Retention & Expansion_ or _Enterprise Acquisition_).

#### Step 2: Enabling and Calibrating Rotten Days Per Stage

1. You will see a horizontal diagram of all stages in the pipeline. Click on the **Pencil (Edit)** icon on the specific stage you want to calibrate (e.g., _Proposal Sent_).
2. Look for the toggle labeled **Rotten deals**:
   - Flip the toggle from _OFF_ to **ON**.
3. A numeric input field will appear labeled **Deals are rotten after (days)**.
4. Input the calibrated integer threshold established in our Phase 2 matrix (e.g., input `14` for _Proposal Sent_, or `60` for _Ongoing Account Health_).
5. Repeat this process for each successive stage in the pipeline, ensuring each stage reflects its specific SLA window.
6. Click **Save** in the top right to commit the changes.

#### Step 3: Verifying the Visual Decay Indicators

1. Navigate back to the main **Deals** view (Kanban board).
2. Examine the cards within the configured stage:
   - Deals whose `Last Activity Date` or deal creation date is within the configured window remain white/standard.
   - Any deal that has sat in that stage without a completed call, meeting, note, or email for longer than the threshold instantly transitions:
     - The background of the card shifts to a distinctive **red/pink tint**.
     - A prominent **red circular badge** appears in the top-right corner of the deal card displaying an integer such as `+3`, `+8`, or `+21`. This number informs the account manager exactly how many days the deal has breached its SLA.

#### Step 4: Building a Filtered Rotten Deals View

To ensure reps do not have to visually scan dozens of columns, create a dedicated triage filter:

1. In the top-right filter dropdown of Pipedrive's Deals view, click **Add new filter**.
2. Name the filter: `All Rotten Accounts (Action Required)`.
3. Set the condition:
   - `Deal` → `Rotten` → `is` → `Yes`.
   - `Deal` → `Status` → `is` → `Open`.
4. Check the box to make this filter visible to the entire team.
5. Account managers can now toggle this filter every morning to view a consolidated, zero-noise list of decayed relationships requiring immediate intervention.

---

## Phase 4: Platform Blueprint 2 — Calculated Properties & Workflows in HubSpot

As noted in the course exercise files, HubSpot Sales Hub does not feature a simple single-click checkbox labeled "Rotten Deals" in the same visual style as Pipedrive. However, HubSpot possesses an enterprise-grade calculated properties engine and programmable workflow automation system that allows you to engineer a far more sophisticated, multi-tiered alerting and escalation architecture.

Rather than relying purely on passive visual color cues on a board, HubSpot allows us to:

1. Leverage the native `Last Activity Date` property.
2. Build a custom calculated property named `Days Since Last Touch`.
3. Construct dynamic **Active Lists** that automatically segment at-risk and decayed accounts.
4. Execute automated workflows that assign escalation tasks, change deal status flags, and dispatch real-time notifications to team communication channels.

```
========================================================================================================================
                      HUBSPOT: CALCULATED PROPERTY & WORKFLOW ARCHITECTURE
========================================================================================================================

  NATIVE TELEMETRY                        CALCULATED PROPERTY                       AUTOMATED WORKFLOW DISPATCH
  ┌───────────────────────┐               ┌───────────────────────┐                 ┌───────────────────────────┐
  │ Last Activity Date    │               │ Days Since Last Touch │                 │ Trigger:                  │
  │ (Timestamp updated    │ ────────────▶ │ Type: Calculation     │ ──────────────▶ │ Days Since Touch >= 14    │
  │ by call/email/meeting)│               │ Today - Last_Activity │                 │ & Pipeline = Retention    │
  └───────────────────────┘               └───────────────────────┘                 └─────────────┬─────────────┘
                                                                                                  │
                                              ┌───────────────────────────────────────────────────┴─────────┐
                                              ▼                                                             ▼
                                  ┌───────────────────────────┐                                 ┌───────────────────────────┐
                                  │ Action 1: Mutate Record   │                                 │ Action 2: Notifications   │
                                  │ Set Pipeline Health Status│                                 │ Dispatch Slack Alert to   │
                                  │ = "Rotten / Breached"     │                                 │ #account-retention-alerts │
                                  │ Priority = "High"         │                                 │ Assign Task to Rep (24h)  │
                                  └───────────────────────────┘                                 └───────────────────────────┘
========================================================================================================================
```

### Step-by-Step Configuration Runbook for HubSpot

#### Step 1: Create the Custom Calculated Property

1. In your HubSpot portal, navigate to the top-right **Settings (Gear Icon)**.
2. In the left-hand navigation pane, under _Data Management_, select **Properties**.
3. In the _Select an object_ dropdown, choose **Deal properties**.
4. Click the orange **Create property** button in the upper right.
5. In the _Basic info_ tab:
   - **Object type:** Deal
   - **Group:** Deal Information
   - **Label:** `Days Since Last Touch`
   - **Internal Name:** `days_since_last_touch`
6. In the _Field type_ tab:
   - Select **Calculation**.
   - Click **Build calculation**.
7. In the calculation editor:
   - **Calculated property type:** Select **Time between**.
   - **Start date:** Select **Last Activity Date** (HubSpot native deal property).
   - **End date:** Select **Current date** (Today).
   - **Time unit:** Select **Days**.
8. Click **Create** to save the calculated property. HubSpot's background worker will now automatically calculate the integer number of elapsed days for every open deal in your database.

#### Step 2: Build the Dynamic "Rotten Deals" Active List

1. In HubSpot's top navigation, go to **CRM** → **Lists**.
2. Click **Create list** → choose **Deal-based** → select **Active list** (dynamic).
3. Name the list: `[SLA Alert] Rotten Deals - Proposal & Retention Stages`.
4. Configure the enrollment filter logic:
   - `Deal Stage` is any of _Proposal Sent_, _Contract Negotiation_, or _Ongoing Retention Health_.
   - **AND** `Deal Status` is equal to _Open_.
   - **AND** `Days Since Last Touch` is greater than or equal to `14` (or your calibrated stage SLA).
5. Click **Save list**. This list dynamically tracks every deal currently breaching SLA in real time.

#### Step 3: Construct the Automated Alert & Escalation Workflow

1. Navigate to **Automations** → **Workflows**.
2. Click **Create workflow** → **From scratch** → select **Deal-based workflow**.
3. Set the **Enrollment Triggers**:
   - Filter criteria: Deal meets the criteria of your dynamic Rotten list:
     - `Days Since Last Touch` $\ge 14$.
     - `Deal Status` = _Open_.
     - `SLA Alert Cooldown Date` is more than 7 days ago **OR** `SLA Alert Cooldown Date` is unknown.
4. Add Action 1: **Set property value**:
   - Target property: `Pipeline Health Status`
   - New value: `Rotten_Breached`
5. Add Action 2: **Create Task**:
   - **Title:** `⚠️ SLA BREACH: 14+ Days Inactive - [Deal Name]`
   - **Due Date:** In 1 business day
   - **Priority:** High
   - **Assigned to:** Existing Deal Owner
   - **Notes:** _"This account has exceeded the 14-day communication SLA threshold. Conduct a 15-minute value-first triage and execute non-commercial outreach immediately."_
6. Add Action 3: **Send Internal Notification / Slack Webhook**:
   - Select **Send Slack notification** (via official HubSpot-Slack app integration).
   - Target Channel: `#account-cadence-alerts`.
   - Message Body:
     > _"🚨 **Decaying Account Alert:** Deal `<{{deal.dealname}}>` owned by `<{{deal.hubspot_owner_id}}>` has had zero communication for `{{deal.days_since_last_touch}}` days. Stage: `{{deal.dealstage}}`. Value: `\${{deal.amount}}`. Please triage immediately."_
7. Add Action 4: **Set property value (Cooldown Timestamp)**:
   - Target property: `SLA Alert Cooldown Date`
   - New value: Set to **Date of step** (current timestamp).
8. Enable re-enrollment for: `Days Since Last Touch` when criteria are met, ensuring future breaches re-trigger after the cooldown window.
9. Click **Review and publish** → **Turn on**.

---

## Phase 5: Platform Blueprint 3 — Freshsales Rotten Deal Automation

Freshsales (Freshworks CRM) incorporates a dedicated, native **Deals Rot After** timer directly within its visual Kanban pipeline architecture. As highlighted in the exercise PDF, Freshsales allows users to specify an exact integer day limit for deals. Once an opportunity crosses that duration without activity, Freshsales highlights the entire Kanban card in bold red within the Open Deals view.

Furthermore, Freshsales provides an integrated automation workflow builder (Freshsales Workflows) that can listen directly for the system condition `Deal is rotten = True` to trigger immediate management escalations and SLA audits.

```
========================================================================================================================
                      FRESHSALES: PIPELINE CONFIGURATION & MANAGER ESCALATION
========================================================================================================================

  ADMIN SETTINGS                           KANBAN BOARD VISUALIZATION               AUTOMATED WORKFLOW RULE
  ┌─────────────────────────┐              ┌─────────────────────────┐              ┌─────────────────────────┐
  │ Pipeline Customization  │              │ Card Highlight Engine   │              │ Event: Deal Updated     │
  │  - Stage: Negotiation   │ ───────────▶ │  - Border turns Bold Red│ ───────────▶ │ Condition:              │
  │  - Deals Rot After: 14d │              │  - Red Clock Icon       │              │ Deal is Rotten = True   │
  │  - Checkbox: [✓] Enable │              │  - Days Overdue Counter │              │ & Deal Value >= \$50,000 │
  └─────────────────────────┘              └─────────────────────────┘              └────────────┬────────────┘
                                                                                                 │
                                                                                                 ▼
                                                                                    ┌─────────────────────────┐
                                                                                    │ Escalation Dispatch:    │
                                                                                    │ Notify Account Director │
                                                                                    │ & Schedule Priority 1:1 │
                                                                                    └─────────────────────────┘
========================================================================================================================
```

### Step-by-Step Configuration Runbook for Freshsales

#### Step 1: Navigating to Deal Pipelines

1. Log in to Freshsales as an Administrator.
2. Click on the **Admin Settings (Gear Icon)** in the left-hand navigation bar.
3. Under _CRM Customization_, select **Pipelines** (or _Deal Pipelines_).
4. Locate the pipeline you wish to calibrate (e.g., _Client Expansion & Renewals_) and click **Edit** (Pencil icon).

#### Step 2: Configuring the "Deals Rot After" Integer Parameter

1. Scroll down to the visual stage list of your selected pipeline.
2. Select the stage you want to configure (e.g., _Negotiation / Review_).
3. In the stage settings panel, locate the configuration field labeled **Deals rot after (in days)**.
4. Input the calibrated integer value from your SLA matrix (e.g., enter `14` for _Negotiation_, or `30` for _Onboarding_).
5. Ensure the checkbox **Enable Rotten Deals** is actively checked.
6. Click **Save** at the bottom of the page to commit the pipeline settings.

#### Step 3: Visual Inspection in the Deals Kanban View

1. Navigate to the **Deals** module from the primary navigation bar.
2. Switch your view mode to **Kanban (Pipeline View)**.
3. Open deals that have remained in that stage without logged activity for longer than your specified threshold will instantly exhibit the following visual states:
   - The card border illuminates in **prominent red**.
   - A **red clock icon** appears on the card header.
   - Freshsales displays the exact overdue duration (e.g., _"Rotten by 5 days"_).
   - Reps can click the card's quick-action icons to dial the customer or fire an email directly from the board view, immediately resetting the decay timer.

#### Step 4: Configuring Freshsales Automated Manager Escalation

For high-value enterprise accounts (e.g., contract value $\ge$ \$50,000), unresponsiveness should not remain an isolated issue between the individual rep and the CRM. Build an automated workflow rule to loop in account leadership:

1. Navigate to **Admin Settings** → **Workflows**.
2. Click **Create Workflow**.
3. **Workflow Name:** `[High-Value Escalation] Rotten Deal Executive Alert`.
4. **Execute on:** Choose **Deal** object → Select **When deal is updated**.
5. **Conditions:**
   - `Deal is rotten` → `is equal to` → `Yes`.
   - **AND** `Deal value` → `is greater than or equal to` → `\$50,000`.
   - **AND** `Deal status` → `is equal to` → `Open`.
6. **Actions:**
   - **Send Email Notification:**
     - To: `Sales Director / VP of Customer Success`.
     - Subject: `🚨 URGENT: \$50k+ Account Breached SLA — {{deal.name}}`
     - Body: _"Account {{deal.name}} (Value: \${{deal.value}}) has gone rotten in stage {{deal.stage_name}}. Zero touchpoints recorded for over the calibrated SLA window. An executive check-in is recommended."_
   - **Add Task:**
     - Title: `Execute Executive Outreach for Decaying Account`
     - Due date: `Within 24 hours`
     - Owner: `Account Director`
7. Click **Save and activate**.

---

## Phase 6: Daily Triage Runbook & Value-First Outreach Scripts

Having automated software flags is only half the battle. A CRM dashboard full of red badges is useless if reps ignore the red cards or, even worse, react by firing lazy, self-serving emails asking _"Just checking in to see where this stands!"_

In [[courses/account-management-maintaining-relationships/lessons/01-relationship-selling|Chapter 1]] and [[courses/account-management-maintaining-relationships/lessons/03-automating-account-cadence|Chapter 3]], we established that trust is built on **unsolicited commercial and operational value**. When an account goes rotten, your outreach must provide a compelling, non-transactional reason for the client to re-engage.

```
========================================================================================================================
                      THE 15-MINUTE DAILY ROTTEN STANDUP PROTOCOL
========================================================================================================================

  TIME: 8:45 AM - 9:00 AM (Monday through Friday)
  ATTENDEES: Account Managers + Team Lead

  STEP 1: OPEN FILTER
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │ Open Saved CRM View: "All Rotten Accounts (Action Required)"                    │
  │ Sort by: Days Overdue Descending                                                │
  └───────────────────────────────────────┬─────────────────────────────────────────┘
                                          │
                                          ▼
  STEP 2: RAPID TRIAGE DECISION (Under 60 seconds per account)
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │ For each red-badged deal, evaluate:                                             │
  │                                                                                 │
  │ [ Pathway A: Active Outreach ] ──▶ Rep selects tailored Value Script (1, 2, or 3)│
  │                                    and executes contact by 11:00 AM.            │
  │                                                                                 │
  │ [ Pathway B: Verified Wait ]   ──▶ Legitimate blocker confirmed (e.g., Client   │
  │                                    Board meeting next Tuesday). Rep logs note   │
  │                                    and schedules specific future task.          │
  │                                                                                 │
  │ [ Pathway C: Disqualification] ──▶ 3 consecutive value touches unanswered.      │
  │                                    Rep cleanses pipeline: Moves deal to         │
  │                                    "Closed Lost / Long-Term Nurture".           │
  └─────────────────────────────────────────────────────────────────────────────────┘
========================================================================================================================
```

### The 3 High-Impact Value-First Re-Engagement Scripts

When an account goes rotten, **never** send an email containing any of the following banned phrases:

- ❌ _"Just checking in!"_
- ❌ _"Wanted to bump this to the top of your inbox."_
- ❌ _"Touching base to see if you had any questions on my proposal."_
- ❌ _"Any update on this?"_

These phrases communicate pure self-interest. They tell the client: _"I need your signature to hit my quota, and I am putting the burden of work on you."_

Instead, deploy one of these three battle-tested, non-commercial value-first templates:

---

### Script 1: The Industry Benchmark & Proprietary Data Share

**When to use:** An enterprise account in the _Scoping_ or _Proposal Sent_ stage has gone quiet for 10–14 days. The champion is overwhelmed with internal operational tasks.

```email
Subject: Benchmark data: Q3 operational cost variances for [Client Industry] leaders

Hi [Client Champion First Name],

While analyzing our anonymized platform telemetry across [Client Industry] enterprises
last week, our data intelligence team uncovered a striking trend regarding [Specific
Operational Challenge, e.g., cloud infrastructure over-allocation / payment processing
failure rates].

Specifically, organizations in your peer tier are experiencing an average 18.4% variance
in operational costs between Q2 and Q3, driven primarily by [Industry Metric].

I put together a one-page comparative benchmark summary showing where top-quartile
firms are allocating capital to protect their margins ahead of next year's budget cycle.
I thought this might provide immediate value for your upcoming internal leadership briefing.

I've attached the PDF summary here for your team—no meeting or response required.

I hope you're having a productive week!

Best regards,

[Your Name]
Senior Account Director | [Your Company]
```

**Psychological Architecture:**

1. **Zero Demands:** Explicitly states _"no meeting or response required"_. This eliminates the cognitive burden of replying and immediately disarms the recipient's defensive guard.
2. **High Status:** Positions you as an industry peer and information broker who understands macro trends, rather than a hungry vendor begging for updates.
3. **Internal Ammunition:** The champion can take your benchmark data and present it directly to their CFO or executive committee, making _them_ look intelligent internally while keeping your solution top-of-mind.

---

### Script 2: The Technical Roadmap / Unannounced Sneak Peek

**When to use:** A technical buyer or operational stakeholder in _Solution Design_ or _Onboarding_ has stopped responding to routine implementation check-ins.

```email
Subject: Early sneak peek: [Specific Capability] arriving in next month's release

Hi [Client Champion First Name],

During our discovery session last month, you brought up an insightful point regarding
how your engineering team struggles with [Specific Pain Point, e.g., automated role-based
access control synchronization across legacy LDAP directories].

I was in our product architecture review yesterday, and our engineering leads finalized
the sprint specifications for our Q4 release. Based directly on feedback like yours, we are
introducing a dedicated native connector for [Specific Feature / Integration].

Because your architectural setup was the exact inspiration for this build, our VP of
Product offered to whitelist your engineering sandbox for early private beta access two weeks
before public deployment.

Here is a 45-second screen recording showing the schema mapper in action: [Link to Loom/Video].

If your team would like early API credentials to test this against your staging environment,
let me know and I'll have our solutions engineer provision your tenant.

Warmly,

[Your Name]
Account Manager | [Your Company]
```

**Psychological Architecture:**

1. **Validation of Past Dialogue:** Proves that you listened intently during previous meetings and advocated for their specific needs within your company's product organization.
2. **Exclusivity & Status:** Offers private beta access and VIP whitelisting, making the client feel valued as a design partner rather than a transactional customer.
3. **Low-Friction Demonstration:** A 45-second video conveys immediate visual proof of progress without requiring a 30-minute Zoom calendar commitment.

---

### Script 3: The Executive Peer-to-Peer Alignment Check-In

**When to use:** A strategic existing account in _Retention Health_ has crossed 45+ days of silence. The operational contact has gone unresponsive, or an upcoming contract renewal is at risk.

```email
Subject: Executive check-in: Supporting [Client Company]'s 2027 strategic priorities

Dear [Client C-Level / VP Executive Name],

I hope your fiscal quarter is off to an exceptional start.

As our executive teams look forward into the upcoming year, our Chief Executive Officer
and I are conducting our bi-annual alignment review of our top strategic enterprise partnerships.
[Client Company] remains one of our organization's most valued accounts.

Over the past 12 months, our shared initiatives have driven [Concrete Metric, e.g., a 24%
reduction in cycle times across 4 business units]. However, as your business continues to
scale, I want to ensure that our executive leadership remains entirely aligned with your
highest-priority operational mandates for the coming year.

Our VP of Enterprise Solutions, [Executive Name], and I will be in [Client City] on
[Date Window, e.g., October 14th–15th]. We would welcome the privilege of hosting you and
[Champion Name] for an executive breakfast or a brief 20-minute executive briefing at your
headquarters to share our long-term strategic investments and gather your unvarnished feedback
on where we can better support your team.

Does either [Date 1] at 8:30 AM or [Date 2] at 2:00 PM align with your calendar?

Sincerely,

[Your Name]
Strategic Account Director | [Your Company]
Direct: +1 (555) 019-2831
```

**Psychological Architecture:**

1. **Executive Parity:** Written peer-to-peer from a senior director or executive level, bypassing operational gatekeepers who may be swamped or disengaged.
2. **Focus on Future Strategic Mandates:** Centers the conversation on _their_ future strategic goals, rather than contract renewals or software utilization.
3. **Concrete Options:** Offers specific, polite calendar windows rather than open-ended, ambiguous requests.

---

> [!warning] Idempotency in State-Mutating Actions & Alert Fatigue
> One of the most catastrophic failures in CRM automation design is **alert fatigue**. If an automation workflow evaluates a rotten deal every morning and dispatches a Slack ping, an automated task, or an email every 24 hours, the sales floor will quickly drown in noise.
>
> Within 72 hours of receiving repetitive daily pings for the same unresponsive account, account managers will:
>
> 1. Mute or archive the notification channel.
> 2. Develop cognitive blindness to all automated warnings.
> 3. Reflexively mark urgent tasks as complete without taking meaningful outreach action.
>
> To safeguard your organization against alert fatigue, your automation engine **must enforce idempotency and rate limiting**:
>
> - **Mandatory Cooldown Windows:** Configure a minimum **7-day cooldown period** between automated task generation or team channel alerts for any individual record.
> - **State Deduplication Keys:** Store an atomic `Last_Alert_Dispatched_Timestamp`. The workflow trigger condition must explicitly require:
>   $$\text{Current Date} - \text{Last\_Alert\_Dispatched\_Timestamp} \ge 7 \text{ Days}$$
> - **Automated Activity State-Lock Clearance:** The moment an account manager logs a verified touchpoint (phone call, email, or meeting), the CRM engine must atomically reset `Pipeline Health Status` back to `Healthy`, clear the `At_Risk` flag, and update `Last Meaningful Touch Date`.

---

## Phase 7: Verification & Golden Path Testing

Never deploy deal decay automations directly to your production sales organization without executing rigorous test flights. A broken workflow can erroneously flag hundreds of healthy accounts as rotten overnight, panicking executive leadership, or conversely fail to fire entirely, allowing multi-million dollar accounts to rot in silence.

Execute the following **Three Golden Path Test Flights** in your sandbox or staging environment before production cutover:

```
========================================================================================================================
                          THE THREE GOLDEN PATH VERIFICATION FLIGHTS
========================================================================================================================

  TEST FLIGHT 1: ROUTINE ACTIVITY RESET VERIFICATION
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │ Setup: Create a test deal in stage "Proposal Sent" (SLA: 14 Days).              │
  │ Initial State: Backdate deal creation to 10 days ago (Near Decay / Warning).   │
  │ Action: Log a standard outbound phone call touchpoint with a contact.           │
  │ Expected Result: Days_Since_Last_Touch instantly resets to 0. Visual warning    │
  │ flags disappear. Next evaluation does not trigger Rotten state.                 │
  └─────────────────────────────────────────────────────────────────────────────────┘

  TEST FLIGHT 2: BOUNDARY CONDITION TRANSITION AT MIDNIGHT
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │ Setup: Create test deal. Backdate Last Activity to exactly 13 days, 23 hours.    │
  │ Action: Trigger the scheduled batch evaluator or advance system clock past       │
  │ the 14-day boundary threshold (Delta_t >= 14.0 days).                            │
  │ Expected Result: Pipeline Health Status transitions to "Rotten". Card turns red │
  │ in Kanban view. In Pipedrive, the "+1" badge displays. In HubSpot, list enrolls.│
  └─────────────────────────────────────────────────────────────────────────────────┘

  TEST FLIGHT 3: ESCALATION TRIGGER & IDEMPOTENCY COOLDOWN
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │ Setup: Test deal in Rotten state triggers initial Slack alert & high-priority task.│
  │ Action: Allow deal to sit in Rotten state for 48 consecutive hours without touch.│
  │ Re-run the batch workflow evaluator.                                            │
  │ Expected Result: Workflow recognizes Cooldown constraint (< 7 days elapsed).    │
  │ ZERO duplicate Slack alerts dispatched. ZERO duplicate tasks generated.          │
  └─────────────────────────────────────────────────────────────────────────────────┘
========================================================================================================================
```

### Detailed Execution Steps for Test Flight 1: Activity Reset Verification

1. Create a dummy opportunity titled `[TEST] Apex Solutions Pilot` assigned to yourself.
2. Manually override or backdate the creation timestamp so that `Days Since Last Touch` reads `12` days (approaching a 14-day threshold).
3. Observe that the deal displays normal or amber state.
4. Now, log a completed **Call** or send a live 1:1 test email through the CRM interface.
5. Inspect the deal record properties:
   - Verify that `Last Activity Date` immediately updates to current time.
   - Verify that `Days Since Last Touch` recalculates to `0`.
   - Verify that any pending warning badges clear.

### Detailed Execution Steps for Test Flight 2: Midnight Boundary Transition

1. Take the same test deal and backdate its `Last Activity Date` to exactly 15 days in the past (1 day past the 14-day SLA).
2. Trigger a manual sync or wait for the midnight cron evaluator.
3. Verify that:
   - In **Pipedrive**: The card shifts to pink/red background with a red `+1` badge in the Kanban view.
   - In **HubSpot**: The deal appears in the dynamic Active List `[SLA Alert] Rotten Deals`, its `Pipeline Health Status` flips to `Rotten_Breached`, and a high-priority task appears in your task queue.
   - In **Freshsales**: The card border glows bold red with the clock icon displaying `"Rotten by 1 day"`.

### Detailed Execution Steps for Test Flight 3: Idempotency & Cooldown Verification

1. Confirm that the initial breach from Test Flight 2 successfully dispatched exactly one alert to your designated test channel or email inbox.
2. Manually trigger the workflow engine again (simulating the next day's run while the deal remains untouched and rotten).
3. Inspect the workflow audit log:
   - The engine should evaluate the deal, inspect `SLA Alert Cooldown Date`, observe that fewer than 7 days have elapsed since the last alert, and gracefully exit without creating a duplicate task or dispatching a duplicate message.
4. This confirms that your account managers are fully protected from alert fatigue.

---

## Architectural Comparison Matrix

To assist sales engineering and CRM administrators in selecting and deploying the right platform mechanics, the following matrix summarizes how decaying deal timers operate across Pipedrive, HubSpot, and Freshsales:

| Feature / Architectural Attribute  | Pipedrive                                     | HubSpot Sales Hub                                        | Freshsales (Freshworks CRM)                   |
| ---------------------------------- | --------------------------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| **Primary Native Feature**         | Native "Rotten Deals" toggle per stage        | Calculated Properties (`Days Since Last Touch`)          | Native "Deals Rot After" parameter            |
| **Visual Board Highlight**         | Pink/Red card tint + Red integer badge (`+N`) | Custom Board Card Properties / Color Rules               | Bold red card border + Red clock icon         |
| **Configuration Granularity**      | Independent integer days per individual stage | Fully customizable via Workflows and List filters        | Independent integer days per individual stage |
| **Telemetry Trigger Source**       | Calls, Meetings, Notes, Synced 1:1 Emails     | Calls, Meetings, Tasks, Synced 1:1 Emails                | Calls, Meetings, Notes, Synced 1:1 Emails     |
| **Automated Slack/Teams Alerts**   | Requires Workflow Automation or Zapier        | Native via Workflow Builder (Professional/Enterprise)    | Native via Workflow Automation module         |
| **Cooldown / Idempotency Support** | Configurable in Workflow Automation logic     | Robust; native enrollment criteria & cooldown timestamps | Configurable via Workflow condition filters   |
| **Manager Escalation Routing**     | Yes, via custom workflow rule                 | Yes, dynamic assignment & manager notification           | Yes, native deal owner manager notification   |

---

## Summary & What's Next

Decaying deal timers and CRM pipeline SLAs bridge the dangerous chasm between abstract retention theory and daily operational execution. By transforming static databases into **dynamic visual alert engines**, you ensure that client accounts are never abandoned to silent neglect.

With your CRM telemetry architecture, SLA thresholds, platform workflows, daily triage standups, and golden path tests fully configured, you have completed the operational curriculum of this course.

Proceed to the final capstone unit: [[courses/account-management-maintaining-relationships/lessons/06-final-assessment|Final Assessment]], where you will test your mastery of commercial farming, client hospitality compliance, cadence automation, and high-stakes service recovery through 15 rigorous, real-world enterprise scenarios.

```knowledge-quiz
schemaVersion: 1
quizId: "281da1f6-bd1b-4062-8412-747b3ea4f311"
title: "Checkpoint: CRM Rotten Timers and Pipeline SLAs"
questionBankId: "d2135e07-d89e-4ebc-a9ce-a1db8e74660c"
questionIds:
  - "b6c57c97-b22c-4cee-b45a-bc67f4a8ab18"
  - "cee4e1a5-fc7a-48ff-95f9-cd7279275dd9"
  - "a8f3695b-342c-43f7-9433-ffd54c37c63a"
  - "89155718-c171-493c-a107-faafb9031902"
  - "d7463450-3ff4-4f86-8659-8328793a66b4"
  - "74354ed7-180a-4b63-9b4c-2c739077bfa4"
  - "1090b354-bf34-4fa6-8b21-40e7d44fcbda"
  - "eb48558c-f4f1-4ee3-b889-bc8500859e1c"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/account-management-maintaining-relationships/question-banks/05-exercise-files|Exercise Files: Implementing CRM "Going Rotten" Timers & Pipeline SLAs: Question Bank]].

<div class="chapter-navigation">
  <a href="/courses/account-management-maintaining-relationships/lessons/04-service-recovery-and-retention" class="chapter-nav-btn prev">← Previous: Chapter 4 — Service Recovery & Retention</a>
  <a href="/courses/account-management-maintaining-relationships/lessons/06-final-assessment" class="chapter-nav-btn next">Next: Final Assessment →</a>
</div>
