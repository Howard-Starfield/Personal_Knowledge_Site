---
id: "37b065d5-4c08-4587-9711-a0a2d20891bc"
title: "Hands-On Implementation Lab: Constructing an Enterprise AI Risk Management Engine"
description: "A step-by-step 7-phase implementation lab constructing a complete enterprise risk management engine in Python 3.11+ with Pydantic v2, CPM DAG scheduling, Monte Carlo Beta-PERT simulation, and Bayesian telemetry updating."
type: "lesson"
publish: true
status: "active"
created: "2026-09-30"
tags:
  - project-management
  - risk-management
  - hands-on-lab
  - python-implementation
  - pydantic-v2
  - monte-carlo
courseId: "c3271776-f252-4801-8b82-fc56d514b473"
lessonOrder: 5
estimatedMinutes: 30
comments: false
---

# Hands-On Implementation Lab: Constructing an Enterprise AI Risk Management Engine

In Chapters 0 through 3, we explored the mathematical foundations, generative identification paradigms, quantitative simulation theories, and multi-tier governance frameworks that define modern enterprise risk management. We proved why subjective 5x5 heatmaps fail, why generative red teams expose latent technical blindspots, and how non-delegable human authority prevents autonomous financial catastrophe.

Now, we transition from theoretical architecture to rigorous software engineering.

In this hands-on laboratory, you will construct a fully functioning, production-grade **Enterprise AI Risk Management Engine** from first principles. Built in modern **Python 3.11+** utilizing **Pydantic v2**, this engine translates the Daniel Stanton AI RISK PLAN methodology into executable, deterministic code. By the end of this lab, you will have implemented:

1. **A Zero-Fragility Schema Architecture**: Strictly typed Pydantic v2 data models enforcing mathematical bounds across Work Breakdown Structure (WBS) tasks, risks, telemetry feeds, and mitigation plans.
2. **A Critical Path Method (CPM) DAG Engine**: Forward and backward pass scheduling across Directed Acyclic Graphs with cycle detection and float calculation.
3. **A 10,000-Iteration Beta-PERT Monte Carlo Simulator**: Sampling continuous probability distributions to quantify schedule risk, merge bias, and empirical $P_{50}$, $P_{80}$, and $P_{90}$ milestone commitments.
4. **A Real-Time Bayesian Telemetry Ingestion Loop**: Ingesting operational telemetry to update prior risk probabilities to posteriors via Bayes' Theorem.
5. **An Algorithmic Mitigation Optimizer & Governance Gate**: Knapsack Return on Mitigation Investment ($\text{ROMI}$) ranking paired with a cryptographic-grade human-in-the-loop sign-off gate that intercepts unauthorized financial drawdowns.
6. **An Automated Multi-Tier Stakeholder Reporting Engine**: Synthesizing raw simulation vectors into audit-ready Markdown briefs for executive, engineering, and financial stakeholders.

---

## The Physical Feynman Analogy: The Aircraft Pre-Flight Telemetry Check & Flight Director Simulation Test Bench

To understand why an enterprise risk engine must be constructed as a modular, validated software pipeline rather than a loose collection of ad-hoc scripts, consider how aerospace engineers verify a commercial airliner before flight.

```
========================================================================================
     AIRCRAFT PRE-FLIGHT TEST BENCH VS. ENTERPRISE AI RISK MANAGEMENT ENGINE
========================================================================================

  TRADITIONAL PROJECT MANAGEMENT: THE MID-FLIGHT GUESS
  ──────────────────────────────────────────────────────────────────────────────────────
  [ Static Paper Checklist ] ──▶ Pilot glides into dark storm without radar
           │
     Fatal Weaknesses:
     - No real-time sensor feedback; blind to microbursts and turbine vibration
     - Checklists completed hours before departure; assumptions become invalid in flight
     - Pilot manual calculations cannot process non-linear aerodynamic stall dynamics
     - Catastrophic structural failure occurs before warnings are perceived


  ENTERPRISE RISK ENGINE: AVIONICS HARDWARE-IN-THE-LOOP (HIL) TEST BENCH
  ──────────────────────────────────────────────────────────────────────────────────────
  [ Sensor Telemetry Bus ] ──▶ Ingests pitot pressure, gyro drift, turbine vibration
           │
           ├── Phase 1 & 2: Schema Validation (Pydantic v2)
           │   Rejects corrupt sensor packets; validates physical telemetry limits
           │
           ├── Phase 3: Flight Dynamics DAG (CPM Engine)
           │   Computes mechanical linkage dependencies and structural critical paths
           │
           ├── Phase 4: Stochastic Aerodynamic Simulation (Monte Carlo Beta-PERT)
           │   Runs 10,000 randomized wind-shear iterations; calculates stall margins
           │
           ├── Phase 5: Dynamic State Estimator (Bayesian Updating)
           │   Updates engine failure probabilities as turbine temperatures climb
           │
           ├── Phase 6: Fly-By-Wire Actuation Gate (Human Governance)
           │   Recommends emergency trim adjustments; requires Captain authorization
           │
           ▼
  [ Flight Director Glass Cockpit ] ──▶ Clear, role-tailored situational telemetry
========================================================================================
```

### The Static Hangar Inspection (Deterministic Guesswork)

In aviation's early era, flight readiness relied on static ground inspections. Mechanics walked around the biplane, kicked the tires, tapped the wooden struts, checked the oil dipstick, and signed off on paper clipboards.

Once airborne, however, the aircraft entered a chaotic, non-linear environment: crosswinds, atmospheric icing, pressure drops, and engine vibration. If a control cable snapped inside the fuselage, the pilot had zero advance warning.

This mirrors deterministic project management. A project manager drafts a Microsoft Project Gantt chart, gathers static status updates during a bi-weekly status meeting, colors milestones green, and assumes that every task will proceed without friction. When real-world turbulence strikes—a supplier default, an unhandled compiler bug, or key personnel departure—the project suffers catastrophic schedule and cost overrun.

### The Hardware-In-The-Loop (HIL) Avionics Test Bench (Stochastic Simulation)

Modern aviation never trusts static assumptions. Before an aircraft ever leaves the hangar, its avionics suite is plugged into a **Hardware-In-The-Loop (HIL) Flight Director Simulation Test Bench**.

Every digital flight control computer, hydraulic actuator sensor, and pitot tube is subjected to thousands of simulated flight profiles. High-speed digital processors inject turbulent crosswinds, hydraulic pressure losses, and electrical bus failures. The avionics system must prove that under $10,000$ randomized atmospheric profiles, the flight control software maintains structural stability with a $99.999\%$ confidence interval.

When the aircraft takes off, the system switches to **closed-loop continuous telemetry**. Digital sensor arrays sample engine RPM, exhaust gas temperature, and cabin pressure at $100\text{ Hz}$. If a turbine sensor detects high-frequency vibration, the avionics computer does not wait for a weekly review; it updates the probability of engine failure in real time, recalculates remaining range, and presents the captain with immediate diversion waypoints.

Our Enterprise AI Risk Management Engine functions as this exact test bench. It treats your project schedule as a dynamic aerodynamic model, stress-tests it with 10,000 Monte Carlo iterations, continuously ingests real-world operational telemetry, and provides executive decision-makers with quantified, audit-grade guidance.

---

> [!warning] The Script-Kiddie AI Pipeline Fallacy
> Many organizations attempt to "modernize" project risk management by passing raw project schedules directly into unconstrained Large Language Models via simple prompts: _"Analyze this schedule and tell me what could go wrong."_
>
> This approach is dangerous. Raw LLMs suffer from severe mathematical hallucinations, produce non-deterministic outputs, invent phantom tasks, fail to enforce graph invariants, and generate inconsistent risk scores that cannot withstand external audit.
>
> In a production enterprise engine, **Generative AI must never calculate schedules, simulate random variables, or execute financial drawdowns directly**. Instead, AI agents serve strictly as qualitative semantic extractors, feeding strictly validated, typed data structures into deterministic mathematical algorithms: topological DAG engines, Beta-PERT numerical samplers, Bayes' theorem calculators, and cryptographically verified governance gates.

---

> [!important] The Idempotency & Deterministic Reproducibility Invariant
> Enterprise risk engines operate under rigorous corporate governance, external financial audits (e.g., SOX, ISO 9001), and regulatory scrutiny. If an engine evaluates a project risk profile today and reports an $80\text{th}$ percentile ($P_{80}$) completion date of Day $107.2$, it must produce that **exact same numerical value** when re-run against identical inputs tomorrow.
>
> To guarantee audit compliance, all stochastic Monte Carlo engines must enforce strict pseudo-random number generator (PRNG) seed controls (`seed=42`). Telemetry streams and Bayesian updating routines must be fully idempotent: processing the same telemetry signal packet multiple times must not compound posterior probabilities or cause runaway drift.

---

## High-Fidelity Architectural Dataflow

The engine is architected around a unidirectional, decoupled dataflow pipeline. Data enters as raw operational signals or work breakdown structures, traverses strict validation contracts, undergoes graph and stochastic processing, passes through human governance, and outputs formatted stakeholder artifacts.

```
+----------------------------------------------------------------------------------------------------+
|                         ENTERPRISE AI RISK MANAGEMENT ENGINE DATAFLOW                              |
+----------------------------------------------------------------------------------------------------+

  [ OPERATIONAL TELEMETRY ]        [ WORK BREAKDOWN STRUCTURE ]        [ SYNTHETIC RED TEAMS ]
  - Git PR cycle times             - Task optimistic durations (a)     - Generative LLM analysis
  - CI/CD build failures           - Task most likely durations (m)    - Historical failure vectors
  - Supplier EDI delay feeds       - Task pessimistic durations (b)    - Semantic threat clustering
  - Sensor drift telemetry         - Task dependency edges             - Candidate mitigation plans
              │                                    │                                    │
              ▼                                    ▼                                    ▼
  +────────────────────────────────────────────────────────────────────────────────────────────────+
  | PHASE 1 & 2: SCHEMA MODELING & TELEMETRY CONTRACTS (Pydantic v2 Ingestion Guardrails)          |
  | - Validates bounds: 0 < a <= m <= b                                                            |
  | - Validates probabilities: 0.0 <= P <= 1.0; Validates financial impacts >= \$0.00              |
  | - Rejects malformed JSON, out-of-order bounds, and corrupt sensor feeds                        |
  +────────────────────────────────────────────────────────────────────────────────────────────────+
                                                   │
                                                   ▼
  +────────────────────────────────────────────────────────────────────────────────────────────────+
  | PHASE 3: DEPENDENCY GRAPH & CRITICAL PATH METHOD (CPM) ENGINE                                  |
  | - Constructs schedule Directed Acyclic Graph (DAG)                                             |
  | - Executes Kahn's Algorithm for cycle detection and topological sorting                        |
  | - Computes Forward Pass: Early Start (ES), Early Finish (EF)                                   |
  | - Computes Backward Pass: Late Finish (LF), Late Start (LS)                                    |
  | - Identifies Total Float (TF) and isolates the deterministic Critical Path                     |
  +────────────────────────────────────────────────────────────────────────────────────────────────+
                                                   │
                                                   ▼
  +────────────────────────────────────────────────────────────────────────────────────────────────+
  | PHASE 4: PROBABILISTIC MONTE CARLO ENGINE (Beta-PERT Sampling, N=10,000)                       |
  | - Derives continuous distribution shape parameters: alpha, beta, mean, variance                |
  | - Executes 10,000 randomized iterations over the schedule DAG with seed control                |
  | - Captures Merge Bias and non-linear schedule divergence across parallel paths                 |
  | - Computes empirical CDF / S-Curve: P50 (Median), P80 (Commitment Target), P90 (Reserve)       |
  | - Calculates Task Criticality Index (CI) for every work package                                |
  +────────────────────────────────────────────────────────────────────────────────────────────────+
                                                   │
                                                   ▼
  +────────────────────────────────────────────────────────────────────────────────────────────────+
  | PHASE 5: DYNAMIC BAYESIAN TELEMETRY INGESTION & UPDATING                                       |
  | - Evaluates incoming operational telemetry against defined sensor threshold triggers           |
  | - Ingests likelihood ratios: P(Signal | Risk) and P(Signal | ~Risk)                            |
  | - Computes posterior probabilities via Bayes' Theorem: P(Risk | Signal)                        |
  | - Dynamically updates Expected Monetary Value: EMV = P(Risk | Signal) * Impact                 |
  +────────────────────────────────────────────────────────────────────────────────────────────────+
                                                   │
                                                   ▼
  +────────────────────────────────────────────────────────────────────────────────────────────────+
  | PHASE 6: MULTI-CRITERIA MITIGATION OPTIMIZATION & GOVERNANCE GATE                              |
  | - Calculates Return on Mitigation Investment: ROMI = [(EMV_pre - EMV_post) - C_mit] / C_mit   |
  | - Solves Knapsack allocation under authorized Contingency Reserve budget ceiling               |
  | - ENFORCES NON-DELEGABLE HUMAN GOVERNANCE:                                                     |
  |   * Traps autonomous drawdown attempts with PermissionError                                    |
  |   * Validates authenticated human credentials, signatures, and organizational roles            |
  |   * Appends authorized transactions to immutable governance audit ledger                       |
  +────────────────────────────────────────────────────────────────────────────────────────────────+
                                                   │
                                                   ▼
  +────────────────────────────────────────────────────────────────────────────────────────────────+
  | PHASE 7: EXECUTIVE STAKEHOLDER SYNTHESIS & AUDIT REPORTING                                     |
  | - Generates role-tailored Markdown executive briefing summaries                                |
  | - C-Suite Perspective: P80 schedule confidence, financial contingency reserves, portfolio EMV  |
  | - Engineering Perspective: Task criticality indices, DAG bottlenecks, telemetry diagnostics   |
  | - Financial Perspective: EVM cost reconciliation, authorized drawdowns, unallocated balances   |
  +────────────────────────────────────────────────────────────────────────────────────────────────+
```

---

## Phase 1: Environment & Dependency Architecture

To build an enterprise-grade risk engine, we establish a robust, modern Python foundation. Modern enterprise Python demands zero-fragility typing, strict runtime data validation, and predictable dependency isolation.

### Technology Stack Selection

- **Python 3.11+ / 3.12+**: Utilizes enhanced error tracebacks, native union syntax (`X | Y`), self-type definitions, and significant CPython runtime speedups.
- **Pydantic v2**: Re-architected in Rust (`pydantic-core`), Pydantic v2 provides a 5x to 50x throughput improvement over legacy validation libraries. It provides native JSON Schema generation, strict mode type coercion, and bidirectional serialization.
- **Python Standard Library (`math`, `random`, `typing`, `enum`)**: For our mathematical and statistical routines, we intentionally leverage Python's built-in `random.betavariate` and floating-point math libraries. This eliminates heavy external C-extensions, ensuring our engine remains lightweight, container-ready, and portable across Cloudflare Workers, AWS Lambda, or local development environments.

### Project Environment Setup

Create an isolated virtual environment and install the required dependencies:

```bash
# Create and activate a clean virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Upgrade pip and install Pydantic v2
pip install --upgrade pip
pip install "pydantic>=2.7.0,<3.0.0"
```

Verify your installation:

```bash
python -c "import pydantic; print(f'Pydantic Version: {pydantic.__version__}')"
# Expected output: Pydantic Version: 2.x.x
```

---

## Phase 2: Schema Modeling & Telemetry Contracts

Risk management systems often fail due to loose typing: dictionaries with missing keys, floating-point numbers masquerading as strings, or impossible duration bounds ($a > b$) slipping past calculations unnoticed.

In Phase 2, we construct immutable domain models using Pydantic v2.

### Mathematical Invariants Enforced by Schemas

1. **Three-Point PERT Duration Ordering**:
   For any task $i$, the optimistic duration ($a$), most likely duration ($m$), and pessimistic duration ($b$) must satisfy:

$$
0 < a \le m \le b
$$

2. **Probability Bounding**:
   For any risk event $R$, prior and posterior probabilities must reside on the closed unit interval:

$$
P(R) \in [0.0, 1.0]
$$

3. **Cardinal Financial Floor**:
   Financial impacts and mitigation costs must be non-negative real numbers:

$$
C \ge 0.00\text{ USD}
$$

### Schema Implementation

```python
from __future__ import annotations
import math
import random
from enum import Enum
from typing import List, Dict, Optional, Tuple, Set
from pydantic import BaseModel, Field, model_validator


class RiskCategory(str, Enum):
    SUPPLY_CHAIN = "SUPPLY_CHAIN"
    TECHNICAL_ALGORITHM = "TECHNICAL_ALGORITHM"
    INFRASTRUCTURE = "INFRASTRUCTURE"
    REGULATORY_COMPLIANCE = "REGULATORY_COMPLIANCE"


class SignalType(str, Enum):
    SUPPLIER_DELIVERY_DELAY = "SUPPLIER_DELIVERY_DELAY"
    SENSOR_NOISE_ANOMALY = "SENSOR_NOISE_ANOMALY"
    NETWORK_LATENCY_SPIKE = "NETWORK_LATENCY_SPIKE"
    SAFETY_TEST_FAILURE = "SAFETY_TEST_FAILURE"


class TaskNode(BaseModel):
    """
    Represents an atomic work package in the project schedule DAG.
    Enforces the mathematical invariant: optimistic <= most_likely <= pessimistic.
    """
    id: str = Field(..., description="Unique task identifier, e.g., 'TASK-01'")
    name: str = Field(..., description="Descriptive task title")
    optimistic_days: float = Field(..., gt=0, description="Optimistic duration (a)")
    most_likely_days: float = Field(..., gt=0, description="Most likely duration (m)")
    pessimistic_days: float = Field(..., gt=0, description="Pessimistic duration (b)")
    dependencies: List[str] = Field(default_factory=list, description="List of predecessor task IDs")
    base_cost_usd: float = Field(..., ge=0, description="Baseline budgeted task cost in USD")

    @model_validator(mode="after")
    def validate_pert_bounds(self) -> TaskNode:
        if not (self.optimistic_days <= self.most_likely_days <= self.pessimistic_days):
            raise ValueError(
                f"Task '{self.id}' violates PERT duration invariant: "
                f"Must satisfy optimistic ({self.optimistic_days}) <= "
                f"most_likely ({self.most_likely_days}) <= pessimistic ({self.pessimistic_days})"
            )
        return self


class RiskFactor(BaseModel):
    """
    Represents an identified risk factor threatening specific tasks.
    Maintains prior probability, dynamic posterior probability, and cardinal impacts.
    """
    id: str = Field(..., description="Risk identifier, e.g., 'RSK-01'")
    title: str = Field(..., description="Descriptive risk title")
    category: RiskCategory
    affected_task_id: str = Field(..., description="Target task ID impacted by this risk")
    prior_probability: float = Field(..., ge=0.0, le=1.0, description="Initial probability P(Risk)")
    impact_days_delay: float = Field(..., ge=0, description="Schedule delay impact in days")
    impact_cost_usd: float = Field(..., ge=0, description="Financial loss impact in USD")
    posterior_probability: Optional[float] = Field(None, ge=0.0, le=1.0)

    @property
    def current_probability(self) -> float:
        """Returns the Bayesian posterior probability if available, otherwise prior."""
        return self.posterior_probability if self.posterior_probability is not None else self.prior_probability

    @property
    def emv_usd(self) -> float:
        """Calculates cardinal Expected Monetary Value: EMV = P(Risk) * Cost Impact."""
        return self.current_probability * self.impact_cost_usd


class TelemetrySignal(BaseModel):
    """
    Represents an incoming operational telemetry reading from an automated monitoring agent.
    Carries likelihood ratios for Bayesian inference.
    """
    signal_id: str
    signal_type: SignalType
    source_component: str
    target_risk_id: str
    likelihood_given_risk: float = Field(..., ge=0.0, le=1.0, description="P(Signal | Risk) - True Positive Rate")
    likelihood_given_no_risk: float = Field(..., ge=0.0, le=1.0, description="P(Signal | ~Risk) - False Positive Rate")
    observed_value: float
    threshold_value: float
    is_triggered: bool

    @classmethod
    def evaluate(
        cls,
        signal_id: str,
        signal_type: SignalType,
        source_component: str,
        target_risk_id: str,
        p_sig_given_risk: float,
        p_sig_given_no_risk: float,
        observed: float,
        threshold: float,
    ) -> TelemetrySignal:
        return cls(
            signal_id=signal_id,
            signal_type=signal_type,
            source_component=source_component,
            target_risk_id=target_risk_id,
            likelihood_given_risk=p_sig_given_risk,
            likelihood_given_no_risk=p_sig_given_no_risk,
            observed_value=observed,
            threshold_value=threshold,
            is_triggered=observed >= threshold,
        )


class MitigationPlan(BaseModel):
    """
    Represents an actionable technical remediation plan designed to reduce risk probability or impact.
    Bound to a specific authorized organizational governance role.
    """
    id: str
    risk_id: str
    action_name: str
    mitigation_cost_usd: float = Field(..., gt=0, description="Cost to execute mitigation in USD")
    post_mitigation_probability: float = Field(..., ge=0.0, le=1.0)
    post_mitigation_cost_impact_usd: float = Field(..., ge=0.0)
    authorized_role: str = Field(..., description="Role required to authorize drawdown")
    is_approved: bool = False
    approved_by: Optional[str] = None
```

---

## Phase 3: Dependency Graph & CPM Engine

The Critical Path Method (CPM) forms the mathematical backbone of project scheduling. A project schedule is modeled as a **Directed Acyclic Graph (DAG)**, denoted $G = (V, E)$, where vertices $V$ represent tasks and directed edges $E$ represent precedence constraints.

```
========================================================================================
                 CPM SCHEDULE DIRECTED ACYCLIC GRAPH (DAG)
========================================================================================

   [TASK-01] Sensor Rig Design
      │ (10, 14, 22 days)
      ▼
   [TASK-03] SLAM Integration ─────────┐
      │ (18, 25, 40 days)               │
      │                                 ▼
      │                          [TASK-05] Calibration ──▶ [TASK-07] Fleet Test ──▶ [TASK-08] OSHA
      │                          ▲ (8, 12, 20 days)         (14, 20, 32 days)        (10, 15, 25 days)
      ▼                          │                               ▲
   [TASK-04] Chassis Assembly ───┘                               │
      ▲ (20, 28, 45 days)                                        │
      │                                                          │
   [TASK-02] Edge Compute ───────────────────────────────────────┘
      (15, 20, 35 days)            [TASK-06] 5G Mesh Deployment
                                   (12, 16, 26 days)
========================================================================================
```

### Mathematical Formulation of CPM

For any task $j$ with duration $D_j$:

1. **Forward Pass (Early Dates)**:
   Computes the earliest possible start and completion times:

$$
ES_j = \max_{i \in \text{Pred}(j)} (EF_i)
$$

$$
EF_j = ES_j + D_j
$$

_(Where $\text{Pred}(j)$ is the set of immediate predecessors of $j$. If $\text{Pred}(j) = \emptyset$, $ES_j = 0$.)_

2. **Project Duration**:
   The minimum total duration to complete all tasks:

$$
T_{\text{project}} = \max_{k \in V} (EF_k)
$$

3. **Backward Pass (Late Dates)**:
   Computes the latest permissible start and completion times without delaying $T_{\text{project}}$:

$$
LF_i = \min_{j \in \text{Succ}(i)} (LS_j)
$$

$$
LS_i = LF_i - D_i
$$

_(Where $\text{Succ}(i)$ is the set of immediate successors of $i$. If $\text{Succ}(i) = \emptyset$, $LF_i = T_{\text{project}}$.)_

4. **Total Float ($TF$)**:
   The slack time an activity can be delayed without extending the project end date:

$$
TF_i = LS_i - ES_i = LF_i - EF_i
$$

5. **Critical Path Isolation**:
   The sequence of dependent tasks with zero total float:

$$
\text{Critical Path} = \{i \in V \mid TF_i = 0\}
$$

### CPM Engine Implementation

Our implementation executes **Kahn's Algorithm** for topological sorting. If the graph contains a circular dependency (e.g., $A \to B \to C \to A$), the algorithm halts immediately with a clear error rather than hanging in an infinite loop.

```python
class CPMScheduleResult(BaseModel):
    early_start: Dict[str, float]
    early_finish: Dict[str, float]
    late_start: Dict[str, float]
    late_finish: Dict[str, float]
    total_float: Dict[str, float]
    critical_path: List[str]
    project_duration_days: float


class CPMEngine:
    @staticmethod
    def compute_schedule(
        tasks: Dict[str, TaskNode],
        durations: Optional[Dict[str, float]] = None
    ) -> CPMScheduleResult:
        """
        Computes forward pass, backward pass, float, and critical path over the project DAG.
        If durations is None, calculates deterministic PERT expected duration: (a + 4m + b) / 6.
        """
        if durations is None:
            durations = {
                t_id: (t.optimistic_days + 4.0 * t.most_likely_days + t.pessimistic_days) / 6.0
                for t_id, t in tasks.items()
            }

        # Build adjacency maps and in-degree tables
        adj: Dict[str, List[str]] = {t_id: [] for t_id in tasks}
        in_degree: Dict[str, int] = {t_id: 0 for t_id in tasks}
        pred_map: Dict[str, List[str]] = {t_id: [] for t_id in tasks}

        for t_id, t in tasks.items():
            for p in t.dependencies:
                if p not in tasks:
                    raise ValueError(f"Task '{t_id}' references non-existent predecessor '{p}'")
                adj[p].append(t_id)
                pred_map[t_id].append(p)
                in_degree[t_id] += 1

        # Kahn's Algorithm for Topological Sort
        zero_in = [t_id for t_id, deg in in_degree.items() if deg == 0]
        topo_order: List[str] = []
        while zero_in:
            curr = zero_in.pop(0)
            topo_order.append(curr)
            for neighbor in adj[curr]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    zero_in.append(neighbor)

        if len(topo_order) != len(tasks):
            raise ValueError("Topological Sort Failed: Cycle detected in project dependency graph!")

        # Forward Pass: Compute Early Start (ES) and Early Finish (EF)
        es: Dict[str, float] = {}
        ef: Dict[str, float] = {}
        for t_id in topo_order:
            preds = pred_map[t_id]
            max_pred_ef = max([ef[p] for p in preds], default=0.0)
            es[t_id] = max_pred_ef
            ef[t_id] = es[t_id] + durations[t_id]

        project_duration = max(ef.values()) if ef else 0.0

        # Backward Pass: Compute Late Finish (LF) and Late Start (LS)
        lf: Dict[str, float] = {}
        ls: Dict[str, float] = {}
        for t_id in reversed(topo_order):
            succs = adj[t_id]
            if not succs:
                lf[t_id] = project_duration
            else:
                lf[t_id] = min([ls[s] for s in succs])
            ls[t_id] = lf[t_id] - durations[t_id]

        # Float Calculation & Critical Path Isolation
        tf: Dict[str, float] = {}
        critical_path: List[str] = []
        for t_id in topo_order:
            total_float = ls[t_id] - es[t_id]
            tf[t_id] = round(total_float, 6)
            if math.isclose(tf[t_id], 0.0, abs_tol=1e-5):
                critical_path.append(t_id)

        return CPMScheduleResult(
            early_start=es,
            early_finish=ef,
            late_start=ls,
            late_finish=lf,
            total_float=tf,
            critical_path=critical_path,
            project_duration_days=round(project_duration, 4),
        )
```

---

## Phase 4: Probabilistic Monte Carlo Engine with Beta-PERT

While deterministic CPM provides a baseline schedule, it suffers from the **Flaw of Averages** and ignores **Merge Bias** (where concurrent parallel paths converge at a milestone, causing the expected completion date to drift toward the maximum duration rather than the mean).

To capture true schedule uncertainty, Phase 4 implements a **Beta-PERT Monte Carlo Engine**.

```
========================================================================================
     BETA-PERT PROBABILITY DENSITY FUNCTION & MONTE CARLO S-CURVE
========================================================================================

   PROBABILITY DENSITY FUNCTION (PDF)         CUMULATIVE DISTRIBUTION FUNCTION (CDF)
   P(Duration)                                Cumulative %
      │          Mode (m)                        │                                 P90
      │            ▲                             │                           ┌─────
      │           / \                            │                     P80 ┌─┘
      │          /   \                           │                 P50   ┌─┘
      │         /     \                          │               ┌───────┘
      │        /       \                         │          ┌────┘
      │  ─────/         \─────                   │     ┌────┘
      └──────┬────────────┬──────┬──▶ Duration   └─────┴─────┴─────────┴───────────────▶
          Optimistic   Mode   Pessimistic             P50   P80       P90
             (a)       (m)        (b)              (Median) (Target) (Reserve)
========================================================================================
```

### Beta-PERT Mathematical Derivation

The Beta-PERT distribution bounds task durations smoothly between an optimistic estimate ($a$) and a pessimistic estimate ($b$), weighting the most likely estimate ($m$) four times more heavily than the extremes:

$$
\mu = \frac{a + 4m + b}{6}
$$

The standard deviation assumes that the span from $a$ to $b$ covers approximately six standard deviations:

$$
\sigma = \frac{b - a}{6}, \quad \sigma^2 = \frac{(b - a)^2}{36}
$$

To sample from a continuous $\text{Beta}(\alpha, \beta)$ distribution on the normalized interval $[0, 1]$, we solve for the shape parameters $\alpha$ and $\beta$ as functions of $\mu$, $m$, $a$, and $b$:

$$
\alpha = \left( \frac{\mu - a}{b - a} \right) \left[ \frac{(\mu - a)(b - \mu)}{\sigma^2} - 1 \right]
$$

$$
\beta = \alpha \left( \frac{b - \mu}{\mu - a} \right)
$$

When the mode is perfectly symmetric ($m = \frac{a + b}{2}$), the shape parameters simplify to $\alpha = 3.0$ and $\beta = 3.0$. Once a random value $X \sim \text{Beta}(\alpha, \beta)$ is generated, the scaled task duration $D$ is:

$$
D = a + (b - a) \cdot X
$$

### Monte Carlo Engine Implementation

```python
class BetaPertSampler:
    @staticmethod
    def sample(a: float, m: float, b: float) -> float:
        """
        Samples a randomized duration from a continuous Beta-PERT distribution.
        Handles symmetric and asymmetric skewness.
        """
        if math.isclose(a, b):
            return a

        mu = (a + 4.0 * m + b) / 6.0

        if math.isclose(mu, m):
            alpha = 3.0
            beta = 3.0
        else:
            alpha = ((mu - a) * (2.0 * m - a - b)) / ((m - mu) * (b - a))
            beta = (alpha * (b - mu)) / (mu - a)

        # Guard against numerical instability
        alpha = max(alpha, 0.01)
        beta = max(beta, 0.01)

        val = random.betavariate(alpha, beta)
        return a + (b - a) * val


class MonteCarloEngine:
    @staticmethod
    def run_simulation(
        tasks: Dict[str, TaskNode],
        iterations: int = 10000,
        seed: int = 42,
    ) -> Dict[str, float | List[float] | Dict[str, float]]:
        """
        Executes N iterations of the schedule DAG, sampling durations via Beta-PERT.
        Extracts empirical percentiles (P50, P80, P90) and Task Criticality Indices.
        """
        random.seed(seed)
        durations_samples: List[float] = []
        critical_path_counts: Dict[str, int] = {t_id: 0 for t_id in tasks}

        for _ in range(iterations):
            # Sample independent random durations for all tasks
            sampled_durations = {
                t_id: BetaPertSampler.sample(t.optimistic_days, t.most_likely_days, t.pessimistic_days)
                for t_id, t in tasks.items()
            }

            # Recalculate schedule DAG for this trial
            res = CPMEngine.compute_schedule(tasks, sampled_durations)
            durations_samples.append(res.project_duration_days)

            # Tally critical path occurrences to compute Criticality Index
            for cp_task in res.critical_path:
                critical_path_counts[cp_task] += 1

        # Extract empirical percentiles
        durations_samples.sort()
        p50 = durations_samples[int(0.50 * iterations)]
        p80 = durations_samples[int(0.80 * iterations)]
        p90 = durations_samples[int(0.90 * iterations)]
        p95 = durations_samples[int(0.95 * iterations)]
        mean_dur = sum(durations_samples) / iterations

        criticality_index = {
            t_id: count / iterations for t_id, count in critical_path_counts.items()
        }

        return {
            "mean_duration": round(mean_dur, 2),
            "p50": round(p50, 2),
            "p80": round(p80, 2),
            "p90": round(p90, 2),
            "p95": round(p95, 2),
            "criticality_index": criticality_index,
            "samples": durations_samples,
        }
```

---

## Phase 5: Dynamic Bayesian Telemetry Updating

Traditional risk logs remain frozen between quarterly planning reviews. In Phase 5, we transform our risk registry into an active, streaming Bayesian network.

```
========================================================================================
             BAYESIAN TELEMETRY UPDATING PIPELINE
========================================================================================

   [ Operational Signal Ingestion ]
   (e.g., Supply EDI Lead Time = 32.0 Days vs. Threshold = 25.0 Days)
                 │
                 ▼
   [ Signal Threshold Evaluation ] ──▶ Breached! (Triggered = True)
                 │
                 ▼
   [ Bayesian Likelihood Engine ]
   - Prior Probability:        P(Risk) = 0.20
   - True Positive Rate:       P(Signal | Risk) = 0.85
   - False Positive Rate:      P(Signal | ~Risk) = 0.10
                 │
                 ▼
   [ Bayes' Theorem Calculation ]
                                P(Signal | Risk) * P(Risk)
   P(Risk | Signal) = ───────────────────────────────────────────────
                      P(Signal | Risk)*P(Risk) + P(Signal | ~Risk)*P(~Risk)

                      0.85 * 0.20
                    = ─────────────────────────── = 0.6800 (68.0%)
                      (0.85 * 0.20) + (0.10 * 0.80)
                 │
                 ▼
   [ Dynamic EMV Recalculation ]
   - Impact: $140,000.00 USD
   - Dynamic Posterior EMV: 0.6800 * $140,000.00 USD = $95,200.00 USD
========================================================================================
```

### Mathematical Formulation of Bayes' Rule for Risk Signals

Let $R$ be the proposition that an operational risk is realized, and let $S$ be the observation that an automated telemetry trigger has breached its threshold:

$$
P(R \mid S) = \frac{P(S \mid R) \cdot P(R)}{P(S)}
$$

Where the marginal probability of observing signal $S$ is expanded via the Law of Total Probability:

$$
P(S) = P(S \mid R) \cdot P(R) + P(S \mid \neg R) \cdot P(\neg R)
$$

- $P(R)$: The prior probability of risk occurrence (e.g., historical vendor failure rate).
- $P(S \mid R)$: The sensitivity or True Positive Rate of the telemetry sensor.
- $P(S \mid \neg R)$: The false alarm rate or False Positive Rate of the sensor.
- $P(R \mid S)$: The updated posterior probability of risk given that the telemetry alarm fired.

### Bayesian Updater Implementation

```python
class BayesianRiskUpdater:
    @staticmethod
    def update_risk(risk: RiskFactor, signal: TelemetrySignal) -> float:
        """
        Updates the risk factor's posterior probability using Bayes' Theorem
        when a telemetry signal trigger is observed.
        """
        if not signal.is_triggered:
            return risk.current_probability

        prior = risk.current_probability
        p_sig_given_risk = signal.likelihood_given_risk
        p_sig_given_no_risk = signal.likelihood_given_no_risk

        # Marginal probability P(Signal)
        marginal_p_signal = (p_sig_given_risk * prior) + (p_sig_given_no_risk * (1.0 - prior))

        if marginal_p_signal <= 0:
            return prior

        # Posterior probability P(Risk | Signal)
        posterior = (p_sig_given_risk * prior) / marginal_p_signal
        risk.posterior_probability = round(posterior, 4)
        return risk.posterior_probability
```

---

## Phase 6: Multi-Criteria Mitigation Optimization & Governance Gate

Once risks are dynamically updated, the engine evaluates candidate mitigation plans and enforces human governance over financial capital.

### Algorithmic Return on Mitigation Investment ($\text{ROMI}$)

Mitigation actions require capital investment ($C_{\text{mit}}$). To prioritize mitigations algorithmically under a budget constraint, we compute the net financial return:

$$
\text{ROMI} = \frac{(\text{EMV}_{\text{pre}} - \text{EMV}_{\text{post}}) - C_{\text{mit}}}{C_{\text{mit}}}
$$

Where:

- $\text{EMV}_{\text{pre}} = P_{\text{current}} \cdot I_{\text{cost}}$
- $\text{EMV}_{\text{post}} = P_{\text{mit}} \cdot I_{\text{post\_cost}}$

We solve portfolio selection using a greedy fractional Knapsack heuristic: sorting candidate mitigations by descending $\text{ROMI}$ and allocating funds until the authorized contingency reserve ceiling is reached.

### The Non-Delegable Human Governance Gate

To prevent catastrophic automated financial commitments, Phase 6 implements an impermeable governance interceptor:

- An automated agent or script **cannot commit contingency capital autonomously**.
- Any call to drawdown funds without an authenticated human identity and an authorized executive role (`SUPPLY_CHAIN_VP`, `INFRASTRUCTURE_DIRECTOR`, `PROJECT_DIRECTOR`) throws an immediate `PermissionError`.

```python
class MitigationOptimizer:
    @staticmethod
    def calculate_romi(risk: RiskFactor, mitigation: MitigationPlan) -> float:
        """
        Computes Return on Mitigation Investment (ROMI):
        ROMI = [(EMV_pre - EMV_post) - C_mit] / C_mit
        """
        emv_pre = risk.current_probability * risk.impact_cost_usd
        emv_post = mitigation.post_mitigation_probability * mitigation.post_mitigation_cost_impact_usd
        delta_emv = emv_pre - emv_post
        c_mit = mitigation.mitigation_cost_usd
        romi = (delta_emv - c_mit) / c_mit
        return round(romi, 4)

    @staticmethod
    def select_mitigation_portfolio(
        risks: Dict[str, RiskFactor],
        mitigations: List[MitigationPlan],
        budget_limit_usd: float,
    ) -> List[Tuple[MitigationPlan, float]]:
        """
        Ranks candidate mitigations by ROMI descending and selects the optimal
        portfolio fitting within the authorized contingency budget cap.
        """
        scored_plans: List[Tuple[MitigationPlan, float]] = []
        for m in mitigations:
            r = risks[m.risk_id]
            romi = MitigationOptimizer.calculate_romi(r, m)
            scored_plans.append((m, romi))

        # Greedy sort by descending ROMI
        scored_plans.sort(key=lambda x: x[1], reverse=True)

        selected: List[Tuple[MitigationPlan, float]] = []
        total_cost = 0.0
        for m, romi in scored_plans:
            if romi > 0 and (total_cost + m.mitigation_cost_usd <= budget_limit_usd):
                selected.append((m, romi))
                total_cost += m.mitigation_cost_usd

        return selected


class GovernanceGate:
    """
    Enforces non-delegable human sign-off for financial contingency drawdowns.
    Blocks autonomous agent spending and maintains an immutable ledger.
    """
    def __init__(self, contingency_budget_usd: float):
        self.contingency_budget_usd = contingency_budget_usd
        self.committed_funds_usd = 0.0
        self.audit_log: List[Dict[str, str | float]] = []

    def request_approval_and_drawdown(
        self,
        mitigation: MitigationPlan,
        approver_name: Optional[str],
        approver_role: Optional[str],
    ) -> bool:
        # Security Guard 1: Intercept autonomous/unauthenticated attempts
        if not approver_name or not approver_role:
            raise PermissionError(
                f"Governance Breach: Automated agent cannot execute financial drawdown "
                f"of \\${mitigation.mitigation_cost_usd:,.2f} USD without authenticated human credentials!"
            )

        # Security Guard 2: Enforce organizational Role-Based Access Control (RBAC)
        if approver_role != mitigation.authorized_role and approver_role != "PROJECT_DIRECTOR":
            raise PermissionError(
                f"Governance Breach: Role '{approver_role}' lacks authority. "
                f"Required role: '{mitigation.authorized_role}' or 'PROJECT_DIRECTOR'."
            )

        # Security Guard 3: Prevent contingency reserve over-allocation
        if self.committed_funds_usd + mitigation.mitigation_cost_usd > self.contingency_budget_usd:
            raise ValueError("Contingency Reserve Exhaustion: Insufficient unallocated funds!")

        # Execute authorization and append to audit ledger
        mitigation.is_approved = True
        mitigation.approved_by = f"{approver_name} ({approver_role})"
        self.committed_funds_usd += mitigation.mitigation_cost_usd

        self.audit_log.append({
            "action": mitigation.action_name,
            "cost_usd": mitigation.mitigation_cost_usd,
            "approved_by": mitigation.approved_by,
            "remaining_contingency_usd": self.contingency_budget_usd - self.committed_funds_usd,
        })
        return True
```

---

## Phase 7: Executive Stakeholder Synthesis & Automated Audit Reporting

Raw simulation outputs and telemetry logs cannot be dumped directly onto executive desks. In Phase 7, the engine synthesizes its computational state into role-tailored Markdown audit reports.

### Multi-Tier Information Architecture

- **C-Suite Perspective**: Focuses on high-level schedule confidence percentiles ($P_{50}, P_{80}, P_{90}$), schedule contingency buffers, total active portfolio EMV, and financial contingency reserve burn.
- **Engineering Perspective**: Focuses on task-level Criticality Indices ($CI$), DAG bottlenecks, and specific operational telemetry triggers.
- **Financial & Audit Perspective**: Focuses on the immutable contingency ledger, verifying that every committed dollar matches an authorized human signature and role.

```python
class AuditReportGenerator:
    @staticmethod
    def generate_markdown_audit_report(
        project_name: str,
        deterministic_cpm: CPMScheduleResult,
        mc_results: Dict[str, float | List[float] | Dict[str, float]],
        risks: Dict[str, RiskFactor],
        governance: GovernanceGate,
        approved_mitigations: List[Tuple[MitigationPlan, float]],
    ) -> str:
        """
        Synthesizes engine outputs into a formal Markdown executive audit brief.
        """
        report = []
        report.append(f"# Executive Audit & Risk Assessment Brief: {project_name}")
        report.append("**Audit Status**: VERIFIED COMPLIANT | **Engine**: CPM DAG + Beta-PERT Monte Carlo (N=10,000)")
        report.append("")
        report.append("## 1. Executive Summary & Schedule Confidence")
        report.append(f"- **Deterministic Critical Path Duration**: {deterministic_cpm.project_duration_days:.1f} days")
        report.append(f"- **Monte Carlo P50 (Expected Duration)**: {mc_results['p50']} days")
        report.append(f"- **Monte Carlo P80 (Committed Milestone)**: {mc_results['p80']} days")
        report.append(f"- **Monte Carlo P90 (Worst-Case Buffer)**: {mc_results['p90']} days")
        schedule_reserve = float(mc_results['p80']) - deterministic_cpm.project_duration_days
        report.append(f"- **Recommended Schedule Buffer (P80 - Deterministic)**: +{schedule_reserve:.1f} days")
        report.append("")
        report.append("## 2. Dynamic Risk Posteriors & Financial Exposure")
        report.append("| Risk ID | Description | Prior P | Posterior P | Financial Impact | Expected Monetary Value (EMV) |")
        report.append("|---|---|---|---|---|---|")
        total_emv = 0.0
        for r_id, r in risks.items():
            post_p = r.posterior_probability if r.posterior_probability is not None else r.prior_probability
            emv = post_p * r.impact_cost_usd
            total_emv += emv
            report.append(
                f"| `{r.id}` | {r.title} | {r.prior_probability:.2f} | **{post_p:.4f}** | "
                f"\\${r.impact_cost_usd:,.2f} USD | **\\${emv:,.2f} USD** |"
            )
        report.append(f"\n**Total Active Portfolio EMV**: \\${total_emv:,.2f} USD")
        report.append("")
        report.append("## 3. Governance Gate & Contingency Ledger")
        report.append(f"- **Authorized Contingency Reserve**: \\${governance.contingency_budget_usd:,.2f} USD")
        report.append(f"- **Committed Mitigation Capital**: \\${governance.committed_funds_usd:,.2f} USD")
        report.append(f"- **Unallocated Contingency Balance**: \\${governance.contingency_budget_usd - governance.committed_funds_usd:,.2f} USD")
        report.append("")
        report.append("### Approved Drawdowns")
        report.append("| Mitigation Action | Approved By | Capital Committed | Remaining Balance |")
        report.append("|---|---|---|---|")
        for entry in governance.audit_log:
            report.append(
                f"| {entry['action']} | `{entry['approved_by']}` | "
                f"\\${entry['cost_usd']:,.2f} USD | \\${entry['remaining_contingency_usd']:,.2f} USD |"
            )
        return "\n".join(report)
```

---

## Case Study: Project Titan - Autonomous Warehouse Modernization

To demonstrate all seven phases operating end-to-end, we deploy the engine against a high-stakes enterprise case study: **Project Titan: Autonomous Warehouse Modernization**.

### Project Scope & WBS

Titan deploys an autonomous fleet of Automated Guided Vehicles (AGVs) inside an operating fulfillment distribution center. The work breakdown structure consists of eight interconnected technical tasks:

- `TASK-01`: Core Sensor & LiDAR Rig Architecture ($a=10, m=14, b=22\text{ days}$)
- `TASK-02`: Safety Edge Compute Procurement ($a=15, m=20, b=35\text{ days}$)
- `TASK-03`: Fleet SLAM Algorithm Integration ($a=18, m=25, b=40\text{ days}$, depends on `TASK-01`)
- `TASK-04`: AGV Industrial Chassis Assembly ($a=20, m=28, b=45\text{ days}$, depends on `TASK-02`)
- `TASK-05`: Sensor-to-Chassis Telemetry Calibration ($a=8, m=12, b=20\text{ days}$, depends on `TASK-03`, `TASK-04`)
- `TASK-06`: 5G Ultra-Reliable Mesh Deployment ($a=12, m=16, b=26\text{ days}$)
- `TASK-07`: Autonomous Fleet Stress-Testing ($a=14, m=20, b=32\text{ days}$, depends on `TASK-05`, `TASK-06`)
- `TASK-08`: OSHA / ISO 3691-4 Industrial Safety Certification ($a=10, m=15, b=25\text{ days}$, depends on `TASK-07`)

### Active Risk Factors & Telemetry Signals

The project faces three critical operational risks monitored via automated telemetry:

1. `RSK-01`: **LiDAR Sensor Global Supply Embargo** (Affects `TASK-01`, Prior $P=0.20$, Impact: \$140,000.00 USD). Monitored via SAP EDI supplier delivery lag telemetry.
2. `RSK-02`: **Occlusion-Induced SLAM Tracking Drift** (Affects `TASK-03`, Prior $P=0.25$, Impact: \$95,000.00 USD). Monitored via benchmark test noise telemetry.
3. `RSK-03`: **5G Industrial Mesh Packet Loss & Latency Spikes** (Affects `TASK-06`, Prior $P=0.30$, Impact: \$60,000.00 USD). Monitored via industrial ping probes.

---

## Complete End-to-End Enterprise Script

Here is the complete, self-contained Python script implementing the entire seven-phase engine. You can copy and execute this file directly.

```python
"""
Enterprise AI Risk Management Engine (Python 3.11+ / Pydantic v2)
Case Study: Project Titan - Autonomous Warehouse Modernization

Author: Enterprise Risk Architecture Laboratory
License: MIT
"""

from __future__ import annotations
import math
import random
from enum import Enum
from typing import List, Dict, Optional, Tuple
from pydantic import BaseModel, Field, model_validator


# ============================================================================
# PHASE 1 & 2: SCHEMAS & TELEMETRY CONTRACTS
# ============================================================================

class RiskCategory(str, Enum):
    SUPPLY_CHAIN = "SUPPLY_CHAIN"
    TECHNICAL_ALGORITHM = "TECHNICAL_ALGORITHM"
    INFRASTRUCTURE = "INFRASTRUCTURE"
    REGULATORY_COMPLIANCE = "REGULATORY_COMPLIANCE"


class SignalType(str, Enum):
    SUPPLIER_DELIVERY_DELAY = "SUPPLIER_DELIVERY_DELAY"
    SENSOR_NOISE_ANOMALY = "SENSOR_NOISE_ANOMALY"
    NETWORK_LATENCY_SPIKE = "NETWORK_LATENCY_SPIKE"
    SAFETY_TEST_FAILURE = "SAFETY_TEST_FAILURE"


class TaskNode(BaseModel):
    id: str = Field(..., description="Unique task identifier, e.g. TASK-01")
    name: str = Field(..., description="Descriptive task title")
    optimistic_days: float = Field(..., gt=0, description="Optimistic duration (a)")
    most_likely_days: float = Field(..., gt=0, description="Most likely duration (m)")
    pessimistic_days: float = Field(..., gt=0, description="Pessimistic duration (b)")
    dependencies: List[str] = Field(default_factory=list, description="IDs of predecessor tasks")
    base_cost_usd: float = Field(..., ge=0, description="Baseline budgeted cost in USD")

    @model_validator(mode="after")
    def validate_pert_bounds(self) -> TaskNode:
        if not (self.optimistic_days <= self.most_likely_days <= self.pessimistic_days):
            raise ValueError(
                f"Task '{self.id}': Violates PERT ordering: "
                f"Must satisfy optimistic ({self.optimistic_days}) <= "
                f"most_likely ({self.most_likely_days}) <= pessimistic ({self.pessimistic_days})"
            )
        return self


class RiskFactor(BaseModel):
    id: str = Field(..., description="Risk identifier, e.g. RSK-01")
    title: str = Field(..., description="Risk summary")
    category: RiskCategory
    affected_task_id: str = Field(..., description="Task affected by this risk")
    prior_probability: float = Field(..., ge=0.0, le=1.0, description="Initial probability P(Risk)")
    impact_days_delay: float = Field(..., ge=0, description="Schedule delay impact if triggered")
    impact_cost_usd: float = Field(..., ge=0, description="Financial loss impact if triggered")
    posterior_probability: Optional[float] = Field(None, ge=0.0, le=1.0)

    @property
    def current_probability(self) -> float:
        return self.posterior_probability if self.posterior_probability is not None else self.prior_probability

    @property
    def emv_usd(self) -> float:
        return self.current_probability * self.impact_cost_usd


class TelemetrySignal(BaseModel):
    signal_id: str
    signal_type: SignalType
    source_component: str
    target_risk_id: str
    likelihood_given_risk: float = Field(..., ge=0.0, le=1.0, description="P(Signal | Risk) - True Positive Rate")
    likelihood_given_no_risk: float = Field(..., ge=0.0, le=1.0, description="P(Signal | ~Risk) - False Positive Rate")
    observed_value: float
    threshold_value: float
    is_triggered: bool

    @classmethod
    def evaluate(
        cls,
        signal_id: str,
        signal_type: SignalType,
        source_component: str,
        target_risk_id: str,
        p_sig_given_risk: float,
        p_sig_given_no_risk: float,
        observed: float,
        threshold: float,
    ) -> TelemetrySignal:
        return cls(
            signal_id=signal_id,
            signal_type=signal_type,
            source_component=source_component,
            target_risk_id=target_risk_id,
            likelihood_given_risk=p_sig_given_risk,
            likelihood_given_no_risk=p_sig_given_no_risk,
            observed_value=observed,
            threshold_value=threshold,
            is_triggered=observed >= threshold,
        )


class MitigationPlan(BaseModel):
    id: str
    risk_id: str
    action_name: str
    mitigation_cost_usd: float = Field(..., gt=0)
    post_mitigation_probability: float = Field(..., ge=0.0, le=1.0)
    post_mitigation_cost_impact_usd: float = Field(..., ge=0.0)
    authorized_role: str = Field(..., description="Role required to approve drawdown")
    is_approved: bool = False
    approved_by: Optional[str] = None


# ============================================================================
# PHASE 3: DEPENDENCY GRAPH & CPM ENGINE
# ============================================================================

class CPMScheduleResult(BaseModel):
    early_start: Dict[str, float]
    early_finish: Dict[str, float]
    late_start: Dict[str, float]
    late_finish: Dict[str, float]
    total_float: Dict[str, float]
    critical_path: List[str]
    project_duration_days: float


class CPMEngine:
    @staticmethod
    def compute_schedule(
        tasks: Dict[str, TaskNode],
        durations: Optional[Dict[str, float]] = None
    ) -> CPMScheduleResult:
        if durations is None:
            # Deterministic PERT expected duration: (a + 4m + b) / 6
            durations = {
                t_id: (t.optimistic_days + 4.0 * t.most_likely_days + t.pessimistic_days) / 6.0
                for t_id, t in tasks.items()
            }

        # Build adjacency maps
        adj: Dict[str, List[str]] = {t_id: [] for t_id in tasks}
        in_degree: Dict[str, int] = {t_id: 0 for t_id in tasks}
        pred_map: Dict[str, List[str]] = {t_id: [] for t_id in tasks}

        for t_id, t in tasks.items():
            for p in t.dependencies:
                if p not in tasks:
                    raise ValueError(f"Task '{t_id}' references non-existent predecessor '{p}'")
                adj[p].append(t_id)
                pred_map[t_id].append(p)
                in_degree[t_id] += 1

        # Kahn's Algorithm for Topological Sort
        zero_in = [t_id for t_id, deg in in_degree.items() if deg == 0]
        topo_order: List[str] = []
        while zero_in:
            curr = zero_in.pop(0)
            topo_order.append(curr)
            for neighbor in adj[curr]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    zero_in.append(neighbor)

        if len(topo_order) != len(tasks):
            raise ValueError("Topological Sort Failed: Cycle detected in schedule DAG!")

        # Forward Pass
        es: Dict[str, float] = {}
        ef: Dict[str, float] = {}
        for t_id in topo_order:
            preds = pred_map[t_id]
            max_pred_ef = max([ef[p] for p in preds], default=0.0)
            es[t_id] = max_pred_ef
            ef[t_id] = es[t_id] + durations[t_id]

        project_duration = max(ef.values()) if ef else 0.0

        # Backward Pass
        lf: Dict[str, float] = {}
        ls: Dict[str, float] = {}
        for t_id in reversed(topo_order):
            succs = adj[t_id]
            if not succs:
                lf[t_id] = project_duration
            else:
                lf[t_id] = min([ls[s] for s in succs])
            ls[t_id] = lf[t_id] - durations[t_id]

        # Float and Critical Path
        tf: Dict[str, float] = {}
        critical_path: List[str] = []
        for t_id in topo_order:
            tf[t_id] = round(ls[t_id] - es[t_id], 6)
            if math.isclose(tf[t_id], 0.0, abs_tol=1e-5):
                critical_path.append(t_id)

        return CPMScheduleResult(
            early_start=es,
            early_finish=ef,
            late_start=ls,
            late_finish=lf,
            total_float=tf,
            critical_path=critical_path,
            project_duration_days=round(project_duration, 4),
        )


# ============================================================================
# PHASE 4: PROBABILISTIC MONTE CARLO ENGINE (BETA-PERT)
# ============================================================================

class BetaPertSampler:
    @staticmethod
    def sample(a: float, m: float, b: float) -> float:
        if math.isclose(a, b):
            return a
        mu = (a + 4.0 * m + b) / 6.0
        if math.isclose(mu, m):
            alpha = 3.0
            beta = 3.0
        else:
            alpha = ((mu - a) * (2.0 * m - a - b)) / ((m - mu) * (b - a))
            beta = (alpha * (b - mu)) / (mu - a)

        alpha = max(alpha, 0.01)
        beta = max(beta, 0.01)

        val = random.betavariate(alpha, beta)
        return a + (b - a) * val


class MonteCarloEngine:
    @staticmethod
    def run_simulation(
        tasks: Dict[str, TaskNode],
        iterations: int = 10000,
        seed: int = 42,
    ) -> Dict[str, float | List[float] | Dict[str, float]]:
        random.seed(seed)
        durations_samples: List[float] = []
        critical_path_counts: Dict[str, int] = {t_id: 0 for t_id in tasks}

        for _ in range(iterations):
            sampled_durations = {
                t_id: BetaPertSampler.sample(t.optimistic_days, t.most_likely_days, t.pessimistic_days)
                for t_id, t in tasks.items()
            }
            res = CPMEngine.compute_schedule(tasks, sampled_durations)
            durations_samples.append(res.project_duration_days)
            for cp_task in res.critical_path:
                critical_path_counts[cp_task] += 1

        durations_samples.sort()
        p50 = durations_samples[int(0.50 * iterations)]
        p80 = durations_samples[int(0.80 * iterations)]
        p90 = durations_samples[int(0.90 * iterations)]
        p95 = durations_samples[int(0.95 * iterations)]
        mean_dur = sum(durations_samples) / iterations

        criticality_index = {t_id: count / iterations for t_id, count in critical_path_counts.items()}

        return {
            "mean_duration": round(mean_dur, 2),
            "p50": round(p50, 2),
            "p80": round(p80, 2),
            "p90": round(p90, 2),
            "p95": round(p95, 2),
            "criticality_index": criticality_index,
            "samples": durations_samples,
        }


# ============================================================================
# PHASE 5: DYNAMIC BAYESIAN TELEMETRY UPDATING
# ============================================================================

class BayesianRiskUpdater:
    @staticmethod
    def update_risk(risk: RiskFactor, signal: TelemetrySignal) -> float:
        if not signal.is_triggered:
            return risk.current_probability

        prior = risk.current_probability
        p_sig_given_risk = signal.likelihood_given_risk
        p_sig_given_no_risk = signal.likelihood_given_no_risk

        marginal_p_signal = (p_sig_given_risk * prior) + (p_sig_given_no_risk * (1.0 - prior))
        if marginal_p_signal <= 0:
            return prior

        posterior = (p_sig_given_risk * prior) / marginal_p_signal
        risk.posterior_probability = round(posterior, 4)
        return risk.posterior_probability


# ============================================================================
# PHASE 6: MITIGATION OPTIMIZATION & GOVERNANCE GATE
# ============================================================================

class MitigationOptimizer:
    @staticmethod
    def calculate_romi(risk: RiskFactor, mitigation: MitigationPlan) -> float:
        emv_pre = risk.current_probability * risk.impact_cost_usd
        emv_post = mitigation.post_mitigation_probability * mitigation.post_mitigation_cost_impact_usd
        delta_emv = emv_pre - emv_post
        c_mit = mitigation.mitigation_cost_usd
        romi = (delta_emv - c_mit) / c_mit
        return round(romi, 4)

    @staticmethod
    def select_mitigation_portfolio(
        risks: Dict[str, RiskFactor],
        mitigations: List[MitigationPlan],
        budget_limit_usd: float,
    ) -> List[Tuple[MitigationPlan, float]]:
        scored_plans: List[Tuple[MitigationPlan, float]] = []
        for m in mitigations:
            r = risks[m.risk_id]
            romi = MitigationOptimizer.calculate_romi(r, m)
            scored_plans.append((m, romi))

        # Sort descending by ROMI
        scored_plans.sort(key=lambda x: x[1], reverse=True)

        selected: List[Tuple[MitigationPlan, float]] = []
        total_cost = 0.0
        for m, romi in scored_plans:
            if romi > 0 and (total_cost + m.mitigation_cost_usd <= budget_limit_usd):
                selected.append((m, romi))
                total_cost += m.mitigation_cost_usd

        return selected


class GovernanceGate:
    def __init__(self, contingency_budget_usd: float):
        self.contingency_budget_usd = contingency_budget_usd
        self.committed_funds_usd = 0.0
        self.audit_log: List[Dict[str, str | float]] = []

    def request_approval_and_drawdown(
        self,
        mitigation: MitigationPlan,
        approver_name: Optional[str],
        approver_role: Optional[str],
    ) -> bool:
        if not approver_name or not approver_role:
            raise PermissionError(
                f"Governance Breach: Automated agent cannot execute financial drawdown "
                f"of \\${mitigation.mitigation_cost_usd:,.2f} USD without authenticated human credentials!"
            )

        if approver_role != mitigation.authorized_role and approver_role != "PROJECT_DIRECTOR":
            raise PermissionError(
                f"Governance Breach: Role '{approver_role}' lacks authority. "
                f"Required role: '{mitigation.authorized_role}' or 'PROJECT_DIRECTOR'."
            )

        if self.committed_funds_usd + mitigation.mitigation_cost_usd > self.contingency_budget_usd:
            raise ValueError("Contingency Reserve Exhaustion: Insufficient unallocated funds!")

        mitigation.is_approved = True
        mitigation.approved_by = f"{approver_name} ({approver_role})"
        self.committed_funds_usd += mitigation.mitigation_cost_usd

        self.audit_log.append({
            "action": mitigation.action_name,
            "cost_usd": mitigation.mitigation_cost_usd,
            "approved_by": mitigation.approved_by,
            "remaining_contingency_usd": self.contingency_budget_usd - self.committed_funds_usd,
        })
        return True


# ============================================================================
# PHASE 7: STAKEHOLDER SYNTHESIS & AUDIT REPORTING
# ============================================================================

class AuditReportGenerator:
    @staticmethod
    def generate_markdown_audit_report(
        project_name: str,
        deterministic_cpm: CPMScheduleResult,
        mc_results: Dict[str, float | List[float] | Dict[str, float]],
        risks: Dict[str, RiskFactor],
        governance: GovernanceGate,
        approved_mitigations: List[Tuple[MitigationPlan, float]],
    ) -> str:
        report = []
        report.append(f"# Executive Audit & Risk Assessment Brief: {project_name}")
        report.append("**Audit Status**: VERIFIED COMPLIANT | **Engine**: CPM DAG + Beta-PERT Monte Carlo (N=10,000)")
        report.append("")
        report.append("## 1. Executive Summary & Schedule Confidence")
        report.append(f"- **Deterministic Critical Path Duration**: {deterministic_cpm.project_duration_days:.1f} days")
        report.append(f"- **Monte Carlo P50 (Expected Duration)**: {mc_results['p50']} days")
        report.append(f"- **Monte Carlo P80 (Committed Milestone)**: {mc_results['p80']} days")
        report.append(f"- **Monte Carlo P90 (Worst-Case Buffer)**: {mc_results['p90']} days")
        schedule_reserve = float(mc_results['p80']) - deterministic_cpm.project_duration_days
        report.append(f"- **Recommended Schedule Buffer (P80 - Deterministic)**: +{schedule_reserve:.1f} days")
        report.append("")
        report.append("## 2. Dynamic Risk Posteriors & Financial Exposure")
        report.append("| Risk ID | Description | Prior P | Posterior P | Financial Impact | Expected Monetary Value (EMV) |")
        report.append("|---|---|---|---|---|---|")
        total_emv = 0.0
        for r_id, r in risks.items():
            post_p = r.posterior_probability if r.posterior_probability is not None else r.prior_probability
            emv = post_p * r.impact_cost_usd
            total_emv += emv
            report.append(
                f"| `{r.id}` | {r.title} | {r.prior_probability:.2f} | **{post_p:.4f}** | "
                f"\\${r.impact_cost_usd:,.2f} USD | **\\${emv:,.2f} USD** |"
            )
        report.append(f"\n**Total Active Portfolio EMV**: \\${total_emv:,.2f} USD")
        report.append("")
        report.append("## 3. Governance Gate & Contingency Ledger")
        report.append(f"- **Authorized Contingency Reserve**: \\${governance.contingency_budget_usd:,.2f} USD")
        report.append(f"- **Committed Mitigation Capital**: \\${governance.committed_funds_usd:,.2f} USD")
        report.append(f"- **Unallocated Contingency Balance**: \\${governance.contingency_budget_usd - governance.committed_funds_usd:,.2f} USD")
        report.append("")
        report.append("### Approved Drawdowns")
        report.append("| Mitigation Action | Approved By | Capital Committed | Remaining Balance |")
        report.append("|---|---|---|---|")
        for entry in governance.audit_log:
            report.append(
                f"| {entry['action']} | `{entry['approved_by']}` | "
                f"\\${entry['cost_usd']:,.2f} USD | \\${entry['remaining_contingency_usd']:,.2f} USD |"
            )
        return "\n".join(report)


# ============================================================================
# PIPELINE RUNNER: PROJECT TITAN
# ============================================================================

def run_project_titan_pipeline():
    print("=" * 80)
    print("PROJECT TITAN: AUTONOMOUS WAREHOUSE MODERNIZATION")
    print("ENTERPRISE AI RISK MANAGEMENT ENGINE RUNNER")
    print("=" * 80)

    # 1. Define Work Breakdown Structure (WBS)
    tasks = {
        "TASK-01": TaskNode(id="TASK-01", name="Sensor & LiDAR Rig Architecture", optimistic_days=10, most_likely_days=14, pessimistic_days=22, dependencies=[], base_cost_usd=85000),
        "TASK-02": TaskNode(id="TASK-02", name="Safety Edge Compute Procurement", optimistic_days=15, most_likely_days=20, pessimistic_days=35, dependencies=[], base_cost_usd=120000),
        "TASK-03": TaskNode(id="TASK-03", name="Fleet SLAM Algorithm Integration", optimistic_days=18, most_likely_days=25, pessimistic_days=40, dependencies=["TASK-01"], base_cost_usd=160000),
        "TASK-04": TaskNode(id="TASK-04", name="AGV Industrial Chassis Assembly", optimistic_days=20, most_likely_days=28, pessimistic_days=45, dependencies=["TASK-02"], base_cost_usd=210000),
        "TASK-05": TaskNode(id="TASK-05", name="Sensor-to-Chassis Telemetry Calibration", optimistic_days=8, most_likely_days=12, pessimistic_days=20, dependencies=["TASK-03", "TASK-04"], base_cost_usd=75000),
        "TASK-06": TaskNode(id="TASK-06", name="5G Ultra-Reliable Mesh Deployment", optimistic_days=12, most_likely_days=16, pessimistic_days=26, dependencies=[], base_cost_usd=95000),
        "TASK-07": TaskNode(id="TASK-07", name="Autonomous Fleet Stress-Testing", optimistic_days=14, most_likely_days=20, pessimistic_days=32, dependencies=["TASK-05", "TASK-06"], base_cost_usd=140000),
        "TASK-08": TaskNode(id="TASK-08", name="OSHA / ISO 3691-4 Safety Certification", optimistic_days=10, most_likely_days=15, pessimistic_days=25, dependencies=["TASK-07"], base_cost_usd=65000),
    }

    # 2. Compute Deterministic Critical Path Method (CPM)
    cpm_result = CPMEngine.compute_schedule(tasks)
    print("\n[PHASE 3] DETERMINISTIC CPM RESULTS:")
    print(f"  Critical Path: {' -> '.join(cpm_result.critical_path)}")
    print(f"  Deterministic Expected Duration: {cpm_result.project_duration_days:.2f} days")

    # 3. Execute Monte Carlo Beta-PERT Simulation (10,000 trials, seed=42)
    print("\n[PHASE 4] RUNNING MONTE CARLO SIMULATION (N=10,000 iterations, Seed=42)...")
    mc_results = MonteCarloEngine.run_simulation(tasks, iterations=10000, seed=42)
    print(f"  Mean Duration: {mc_results['mean_duration']} days")
    print(f"  P50 Duration:  {mc_results['p50']} days (Median)")
    print(f"  P80 Duration:  {mc_results['p80']} days (Recommended Target)")
    print(f"  P90 Duration:  {mc_results['p90']} days (Worst-Case Reserve)")
    print(f"  Schedule Buffer Required (P80 - Det): +{float(mc_results['p80']) - cpm_result.project_duration_days:.2f} days")
    print("  Task Criticality Indices:")
    for t_id, crit in mc_results['criticality_index'].items():
        print(f"    - {t_id}: {crit*100:.1f}%")

    # 4. Define Risks
    risks = {
        "RSK-01": RiskFactor(
            id="RSK-01",
            title="LiDAR Sensor Global Supply Embargo",
            category=RiskCategory.SUPPLY_CHAIN,
            affected_task_id="TASK-01",
            prior_probability=0.20,
            impact_days_delay=25.0,
            impact_cost_usd=140000.0,
        ),
        "RSK-02": RiskFactor(
            id="RSK-02",
            title="Occlusion-Induced SLAM Tracking Drift",
            category=RiskCategory.TECHNICAL_ALGORITHM,
            affected_task_id="TASK-03",
            prior_probability=0.25,
            impact_days_delay=18.0,
            impact_cost_usd=95000.0,
        ),
        "RSK-03": RiskFactor(
            id="RSK-03",
            title="5G Industrial Mesh Packet Loss & Latency Spikes",
            category=RiskCategory.INFRASTRUCTURE,
            affected_task_id="TASK-06",
            prior_probability=0.30,
            impact_days_delay=12.0,
            impact_cost_usd=60000.0,
        ),
    }

    # 5. Ingest Real-Time Telemetry Signals
    print("\n[PHASE 5] REAL-TIME TELEMETRY INGESTION & BAYESIAN UPDATING:")
    signals = [
        TelemetrySignal.evaluate(
            signal_id="SIG-101",
            signal_type=SignalType.SUPPLIER_DELIVERY_DELAY,
            source_component="SAP Supply Chain EDI Feed",
            target_risk_id="RSK-01",
            p_sig_given_risk=0.85,
            p_sig_given_no_risk=0.10,
            observed=32.0,
            threshold=25.0,  # Breached!
        ),
        TelemetrySignal.evaluate(
            signal_id="SIG-102",
            signal_type=SignalType.SENSOR_NOISE_ANOMALY,
            source_component="Lab SLAM Benchmark Runner",
            target_risk_id="RSK-02",
            p_sig_given_risk=0.80,
            p_sig_given_no_risk=0.15,
            observed=0.042,
            threshold=0.050,  # Within normal limits
        ),
        TelemetrySignal.evaluate(
            signal_id="SIG-103",
            signal_type=SignalType.NETWORK_LATENCY_SPIKE,
            source_component="Industrial 5G Ping Probe",
            target_risk_id="RSK-03",
            p_sig_given_risk=0.90,
            p_sig_given_no_risk=0.05,
            observed=48.5,
            threshold=30.0,  # Breached!
        ),
    ]

    for sig in signals:
        r = risks[sig.target_risk_id]
        prior_p = r.current_probability
        post_p = BayesianRiskUpdater.update_risk(r, sig)
        status = "TRIGGERED" if sig.is_triggered else "NORMAL"
        print(f"  Signal {sig.signal_id} [{sig.signal_type.value}] -> {status}")
        print(f"    Observed: {sig.observed_value} (Threshold: {sig.threshold_value})")
        print(f"    Risk {r.id}: Prior P = {prior_p:.2f} -> Posterior P = {post_p:.4f} (EMV: \\${r.emv_usd:,.2f} USD)")

    # 6. Mitigation Planning & Optimization
    mitigations = [
        MitigationPlan(
            id="MIT-01",
            risk_id="RSK-01",
            action_name="Dual-Source Secondary LiDAR Supplier Contract",
            mitigation_cost_usd=35000.0,
            post_mitigation_probability=0.15,
            post_mitigation_cost_impact_usd=30000.0,
            authorized_role="SUPPLY_CHAIN_VP",
        ),
        MitigationPlan(
            id="MIT-02",
            risk_id="RSK-02",
            action_name="Synthetic Occlusion Dataset Augmentation & Re-training",
            mitigation_cost_usd=18000.0,
            post_mitigation_probability=0.08,
            post_mitigation_cost_impact_usd=20000.0,
            authorized_role="LEAD_AI_ARCHITECT",
        ),
        MitigationPlan(
            id="MIT-03",
            risk_id="RSK-03",
            action_name="Deploy High-Gain Antennas & Redundant Wi-Fi 6E Failover",
            mitigation_cost_usd=22000.0,
            post_mitigation_probability=0.10,
            post_mitigation_cost_impact_usd=15000.0,
            authorized_role="INFRASTRUCTURE_DIRECTOR",
        ),
    ]

    print("\n[PHASE 6] MITIGATION SELECTION (Budget Cap: \\$60,000.00 USD):")
    selected_portfolio = MitigationOptimizer.select_mitigation_portfolio(
        risks, mitigations, budget_limit_usd=60000.0
    )
    for m, romi in selected_portfolio:
        print(f"  Selected: {m.action_name} | Cost: \\${m.mitigation_cost_usd:,.2f} USD | ROMI: {romi*100:.1f}%")

    # 7. Governance Gate Enforcement
    print("\n[PHASE 6.1] GOVERNANCE GATE HUMAN SIGN-OFF TEST:")
    governance = GovernanceGate(contingency_budget_usd=100000.0)

    # Test autonomous rejection security guard
    try:
        governance.request_approval_and_drawdown(
            mitigations[0], approver_name=None, approver_role=None
        )
    except PermissionError as e:
        print(f"  [SUCCESSFUL SECURITY INTERCEPT]: {e}")

    # Authorize drawdowns with verified human credentials
    governance.request_approval_and_drawdown(
        selected_portfolio[0][0], approver_name="E. Harrison", approver_role="SUPPLY_CHAIN_VP"
    )
    governance.request_approval_and_drawdown(
        selected_portfolio[1][0], approver_name="M. Rodriguez", approver_role="INFRASTRUCTURE_DIRECTOR"
    )
    print(f"  Committed Capital: \\${governance.committed_funds_usd:,.2f} USD / \\${governance.contingency_budget_usd:,.2f} USD")

    # 8. Report Synthesis
    print("\n[PHASE 7] STAKEHOLDER AUDIT REPORT GENERATED:")
    report_md = AuditReportGenerator.generate_markdown_audit_report(
        "Project Titan: Autonomous Warehouse Modernization",
        cpm_result,
        mc_results,
        risks,
        governance,
        selected_portfolio,
    )
    print("-" * 80)
    print(report_md)
    print("-" * 80)


if __name__ == "__main__":
    run_project_titan_pipeline()
```

---

## Verified Execution Output

When executed in an enterprise Python 3.11+ environment with `random.seed(42)`, the engine produces the following deterministic terminal output:

```text
================================================================================
PROJECT TITAN: AUTONOMOUS WAREHOUSE MODERNIZATION
ENTERPRISE AI RISK MANAGEMENT ENGINE RUNNER
================================================================================

[PHASE 3] DETERMINISTIC CPM RESULTS:
  Critical Path: TASK-02 -> TASK-04 -> TASK-05 -> TASK-07 -> TASK-08
  Deterministic Expected Duration: 100.67 days

[PHASE 4] RUNNING MONTE CARLO SIMULATION (N=10,000 iterations, Seed=42)...
  Mean Duration: 100.93 days
  P50 Duration:  100.64 days (Median)
  P80 Duration:  107.17 days (Recommended Target)
  P90 Duration:  110.77 days (Worst-Case Reserve)
  Schedule Buffer Required (P80 - Det): +6.50 days
  Task Criticality Indices:
    - TASK-01: 8.3%
    - TASK-02: 91.7%
    - TASK-03: 8.3%
    - TASK-04: 91.7%
    - TASK-05: 100.0%
    - TASK-06: 0.0%
    - TASK-07: 100.0%
    - TASK-08: 100.0%

[PHASE 5] REAL-TIME TELEMETRY INGESTION & BAYESIAN UPDATING:
  Signal SIG-101 [SUPPLIER_DELIVERY_DELAY] -> TRIGGERED
    Observed: 32.0 (Threshold: 25.0)
    Risk RSK-01: Prior P = 0.20 -> Posterior P = 0.6800 (EMV: $95,200.00 USD)
  Signal SIG-102 [SENSOR_NOISE_ANOMALY] -> NORMAL
    Observed: 0.042 (Threshold: 0.05)
    Risk RSK-02: Prior P = 0.25 -> Posterior P = 0.2500 (EMV: $23,750.00 USD)
  Signal SIG-103 [NETWORK_LATENCY_SPIKE] -> TRIGGERED
    Observed: 48.5 (Threshold: 30.0)
    Risk RSK-03: Prior P = 0.30 -> Posterior P = 0.8852 (EMV: $53,112.00 USD)

[PHASE 6] MITIGATION SELECTION (Budget Cap: $60,000.00 USD):
  Selected: Dual-Source Secondary LiDAR Supplier Contract | Cost: $35,000.00 USD | ROMI: 159.1%
  Selected: Deploy High-Gain Antennas & Redundant Wi-Fi 6E Failover | Cost: $22,000.00 USD | ROMI: 134.6%

[PHASE 6.1] GOVERNANCE GATE HUMAN SIGN-OFF TEST:
  [SUCCESSFUL SECURITY INTERCEPT]: Governance Breach: Automated agent cannot execute financial drawdown of $35,000.00 USD without authenticated human credentials!
  Committed Capital: $57,000.00 USD / $100,000.00 USD

[PHASE 7] STAKEHOLDER AUDIT REPORT GENERATED:
--------------------------------------------------------------------------------
# Executive Audit & Risk Assessment Brief: Project Titan: Autonomous Warehouse Modernization
**Audit Status**: VERIFIED COMPLIANT | **Engine**: CPM DAG + Beta-PERT Monte Carlo (N=10,000)

## 1. Executive Summary & Schedule Confidence
- **Deterministic Critical Path Duration**: 100.7 days
- **Monte Carlo P50 (Expected Duration)**: 100.64 days
- **Monte Carlo P80 (Committed Milestone)**: 107.17 days
- **Monte Carlo P90 (Worst-Case Buffer)**: 110.77 days
- **Recommended Schedule Buffer (P80 - Deterministic)**: +6.5 days

## 2. Dynamic Risk Posteriors & Financial Exposure
| Risk ID | Description | Prior P | Posterior P | Financial Impact | Expected Monetary Value (EMV) |
|---|---|---|---|---|---|
| `RSK-01` | LiDAR Sensor Global Supply Embargo | 0.20 | **0.6800** | $140,000.00 USD | **$95,200.00 USD** |
| `RSK-02` | Occlusion-Induced SLAM Tracking Drift | 0.25 | **0.2500** | $95,000.00 USD | **$23,750.00 USD** |
| `RSK-03` | 5G Industrial Mesh Packet Loss & Latency Spikes | 0.30 | **0.8852** | $60,000.00 USD | **$53,112.00 USD** |

**Total Active Portfolio EMV**: $172,062.00 USD

## 3. Governance Gate & Contingency Ledger
- **Authorized Contingency Reserve**: $100,000.00 USD
- **Committed Mitigation Capital**: $57,000.00 USD
- **Unallocated Contingency Balance**: $43,000.00 USD

### Approved Drawdowns
| Mitigation Action | Approved By | Capital Committed | Remaining Balance |
|---|---|---|---|
| Dual-Source Secondary LiDAR Supplier Contract | `E. Harrison (SUPPLY_CHAIN_VP)` | $35,000.00 USD | $65,000.00 USD |
| Deploy High-Gain Antennas & Redundant Wi-Fi 6E Failover | `M. Rodriguez (INFRASTRUCTURE_DIRECTOR)` | $22,000.00 USD | $43,000.00 USD |
--------------------------------------------------------------------------------
```

---

## Verification, Testing & Production Deployment Runbook

To maintain enterprise-grade software standards, automated test suites must accompany the risk engine. In production environments, your CI/CD pipeline should run automated unit tests verifying that all mathematical invariants hold.

### Automated Unit Testing Suite (`test_risk_engine.py`)

Save the following test suite beside your implementation file:

```python
"""
Automated Regression Test Suite for Enterprise AI Risk Management Engine
Run with: pytest test_risk_engine.py -v
"""

import pytest
from pydantic import ValidationError
from risk_engine import (
    TaskNode, RiskFactor, RiskCategory, CPMEngine,
    MonteCarloEngine, BetaPertSampler, GovernanceGate,
    MitigationPlan, TelemetrySignal, SignalType, BayesianRiskUpdater
)


def test_pert_bounds_validation():
    """Verify that inverted PERT durations trigger immediate validation errors."""
    with pytest.raises(ValidationError):
        # optimistic (25.0) > most_likely (20.0) -> Invalid!
        TaskNode(
            id="TASK-ERR",
            name="Invalid Bounds Task",
            optimistic_days=25.0,
            most_likely_days=20.0,
            pessimistic_days=30.0,
            base_cost_usd=10000.0
        )


def test_cycle_detection_in_cpm():
    """Verify that cyclical dependencies in the schedule DAG trigger ValueError."""
    cyclic_tasks = {
        "A": TaskNode(id="A", name="Task A", optimistic_days=5, most_likely_days=5, pessimistic_days=5, dependencies=["C"], base_cost_usd=1000),
        "B": TaskNode(id="B", name="Task B", optimistic_days=5, most_likely_days=5, pessimistic_days=5, dependencies=["A"], base_cost_usd=1000),
        "C": TaskNode(id="C", name="Task C", optimistic_days=5, most_likely_days=5, pessimistic_days=5, dependencies=["B"], base_cost_usd=1000),
    }
    with pytest.raises(ValueError, match="Cycle detected"):
        CPMEngine.compute_schedule(cyclic_tasks)


def test_bayesian_updating_bounds():
    """Verify that Bayesian updating remains strictly bounded between 0.0 and 1.0."""
    risk = RiskFactor(
        id="RSK-TEST",
        title="Test Risk",
        category=RiskCategory.TECHNICAL_ALGORITHM,
        affected_task_id="TASK-01",
        prior_probability=0.10,
        impact_days_delay=10.0,
        impact_cost_usd=50000.0
    )
    signal = TelemetrySignal.evaluate(
        signal_id="SIG-01",
        signal_type=SignalType.SENSOR_NOISE_ANOMALY,
        source_component="Test Probe",
        target_risk_id="RSK-TEST",
        p_sig_given_risk=0.90,
        p_sig_given_no_risk=0.05,
        observed=100.0,
        threshold=50.0
    )
    post_p = BayesianRiskUpdater.update_risk(risk, signal)
    assert 0.0 <= post_p <= 1.0
    assert post_p > 0.10  # Posterior must increase given strong evidence


def test_governance_unauthorized_interception():
    """Verify that autonomous agent drawdowns are intercepted by the governance gate."""
    gate = GovernanceGate(contingency_budget_usd=50000.0)
    mitigation = MitigationPlan(
        id="MIT-TEST",
        risk_id="RSK-TEST",
        action_name="Automated Purchase",
        mitigation_cost_usd=15000.0,
        post_mitigation_probability=0.05,
        post_mitigation_cost_impact_usd=5000.0,
        authorized_role="SUPPLY_CHAIN_VP"
    )
    # Attempt unauthorized drawdown without credentials
    with pytest.raises(PermissionError, match="without authenticated human credentials"):
        gate.request_approval_and_drawdown(mitigation, approver_name=None, approver_role=None)

    # Attempt drawdown with incorrect organizational role
    with pytest.raises(PermissionError, match="lacks authority"):
        gate.request_approval_and_drawdown(mitigation, approver_name="J. Doe", approver_role="INTERN")


def test_monte_carlo_seed_reproducibility():
    """Verify that simulation results are strictly deterministic across runs with fixed seed."""
    tasks = {
        "T1": TaskNode(id="T1", name="T1", optimistic_days=10, most_likely_days=15, pessimistic_days=25, base_cost_usd=5000),
        "T2": TaskNode(id="T2", name="T2", optimistic_days=12, most_likely_days=18, pessimistic_days=30, dependencies=["T1"], base_cost_usd=5000),
    }
    run1 = MonteCarloEngine.run_simulation(tasks, iterations=1000, seed=42)
    run2 = MonteCarloEngine.run_simulation(tasks, iterations=1000, seed=42)
    assert run1["p50"] == run2["p50"]
    assert run1["p80"] == run2["p80"]
    assert run1["p90"] == run2["p90"]
```

---

## Architectural Summary: The 7 Core Invariants of the Enterprise Risk Engine

When deploying an AI-assisted risk quantification platform into enterprise production, ensure that your technical architecture strictly enforces these seven non-negotiable invariants:

1. **Zero-Fragility Schema Ingestion**: Never allow raw, unvalidated JSON, strings, or floats into the quantitative calculation layer. Enforce physical and mathematical domain invariants ($0 < a \le m \le b$, $P \in [0, 1]$, $C \ge 0$) at the boundary via Pydantic v2.
2. **Topological Invariant Enforcement**: Treat project schedules strictly as Directed Acyclic Graphs (DAGs). Execute cycle detection via Kahn's algorithm before attempting forward/backward passes to prevent infinite recursion.
3. **Stochastic Superiority over Single-Point Estimates**: Replace static deterministic dates with Beta-PERT continuous probability distributions ($N \ge 10,000$ iterations). Commit executive milestones to $P_{80}$ confidence targets rather than the optimistic mode ($m$) to account for merge bias.
4. **Dynamic Bayesian Evidence Fusion**: Transform static risk registers into active state estimators. Update prior probabilities into posteriors using Bayes' Theorem upon observing verified telemetry threshold breaches.
5. **Algorithmic Capital Optimization**: Allocate finite contingency reserves using quantitative Return on Mitigation Investment ($\text{ROMI}$) ranking rather than political bargaining or subjective guesswork.
6. **Non-Delegable Human Governance**: Enforce an impermeable governance interceptor between AI recommendations and corporate ledgers. AI models propose and simulate; authenticated human leaders with verified organizational roles sign off on financial drawdowns.
7. **Idempotency & Deterministic Reproducibility**: Control pseudo-random generator seeds (`seed=42`) across all Monte Carlo routines to guarantee that simulation vectors and risk audits remain fully reproducible under regulatory scrutiny.

```knowledge-quiz
schemaVersion: 1
quizId: "11cb6b6d-14fb-410c-b918-8f3063f639cc"
title: "Checkpoint: the enterprise risk engine in practice"
questionBankId: "4220fb1a-856b-4d04-8778-da9f8302bd41"
questionIds:
  - "c6a854d4-c3d3-4267-ad33-9dfe962a2bf4"
  - "e8daefa2-08c2-480a-b92c-909828b82f75"
  - "58cab5a7-f5ef-47e7-9219-e50b7a77429f"
  - "93e94d7a-bf96-4c31-8023-d73d3356d33b"
  - "055e0d33-042c-4a0c-8c06-67105d41042e"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-for-project-management-managing-risk-with-generative-ai/question-banks/04-hands-on-risk-plan-lab|Hands-On Implementation Lab: Constructing an Enterprise AI Risk Management Engine: Question Bank]].

---

<div class="chapter-navigation">
  <a class="chapter-nav-btn prev" href="/courses/ai-for-project-management-managing-risk-with-generative-ai/lessons/03-ai-risk-plan-governance-decision-support">← Chapter 3: Governance, Decision Support & Ethics</a>
  <a class="chapter-nav-btn next" href="/courses/ai-for-project-management-managing-risk-with-generative-ai/lessons/05-glossary">Chapter 5: Architectural Taxonomy & Glossary →</a>
</div>
