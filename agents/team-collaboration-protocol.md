# Studio Occasus - Team Collaboration Protocol

## Purpose

This protocol defines how the 12-agent Studio Occasus team works as one delivery system. Its goal is simple: keep collaboration relevant, efficient, and reliable across sessions.

## Core Principle

Use the smallest competent team for the current objective, with explicit handoffs and a visible finish line.

## Team Layers

### Layer 1 - Product specialists

- Agent 1: product scope and strategic direction
- Agent 2: UX structure and interface logic
- Agent 3: frontend implementation
- Agent 4: copy, narrative, microcopy, and showcase framing
- Agent 5: deploy, smoke test, submission readiness
- Agent 6: critique, regression detection, and fix prioritization
- Agent 7: editorial pipeline and research-to-content workflow
- Agent 8: Firebase, data model, auth, and backend architecture
- Agent 9: security, secrets, and release-blocking safeguards

### Layer 2 - Learning and memory

- Agent 10: user learning, onboarding, guided progression
- Agent 11: team memory, durable lessons, inter-agent transmission

### Layer 3 - Management

- Agent 12: selects the right sub-team, sequences work, and defines done

## Default Execution Loop

1. Agent 12 clarifies the actual outcome.
2. Agent 12 selects the smallest sub-team needed.
3. Upstream agents define decisions before downstream agents implement them.
4. Agent 6 reviews when usability, product trust, or regression risk is non-trivial.
5. Agent 5 validates deployability when release state changes.
6. Agent 11 records only durable lessons, stable decisions, and high-value handoffs.

## Delegation Order Rules

- Strategy before interface.
- Interface before frontend implementation.
- Backend and security only join when their involvement changes the actual outcome.
- Before any risky change touching deploy, auth, billing, or sensitive UX flow, create a local backup with `scripts/project-backup.ps1`.
- Review before release when a change touches UX, logic, auth, billing, or trust.
- Memory update happens after meaningful change, not after every micro-step.

## Routing Matrix

| Situation | Lead agent | Supporting agents |
| --- | --- | --- |
| Product scope or positioning shift | Agent 1 | Agent 4, Agent 12 |
| UX flow or tool guidance refinement | Agent 2 | Agent 10, Agent 3, Agent 6 |
| Frontend feature implementation | Agent 3 | Agent 2, Agent 4, Agent 6 |
| Copy or demo narrative work | Agent 4 | Agent 1, Agent 10 |
| Blog or research article production | Agent 7 | Agent 4, Agent 11 |
| Auth, Firestore, usage sync, backend path | Agent 8 | Agent 9, Agent 5 |
| Security-sensitive change | Agent 9 | Agent 8, Agent 5, Agent 6 |
| Session handoff or knowledge capture | Agent 11 | Agent 12 |
| Multi-step team orchestration | Agent 12 | only required specialists |

## Handoff Contract

Every agent handoff must include these four items:

1. What changed.
2. What remains uncertain.
3. What the next agent should do.
4. What counts as done for this step.

## Definitions Of Done

### For planning work

- clear objective
- named lead agent
- bounded supporting agents
- explicit artifact or decision expected

### For implementation work

- user-visible outcome is clear
- pre-risk backup exists when the change can break deploy, auth, billing, or sensitive UX
- no obvious editor errors
- impact on existing flows considered
- review requested if risk is material

### For release-ready work

- main scenario tested
- regressions checked in affected areas
- security concerns reviewed when relevant
- log and handoff state updated

## Memory Rules

- Agent 11 stores decisions, patterns, blockers, and verified fixes.
- Agent 11 does not store raw noise, drafts, or trivial commentary.
- If knowledge affects more than one agent, the impacted agents must be named.
- If a lesson changes future sequencing, Agent 12 should be referenced too.

## Anti-Patterns To Avoid

- Too many active agents on a small task.
- Frontend work starting before UX decisions are stable.
- Security review treated as optional on auth or billing changes.
- Session summaries that are long but operationally useless.
- Multiple agents solving the same problem in parallel without boundaries.

## Recommended Operating Modes

### Mode A - Fast product refinement

- Agent 12 -> Agent 2 -> Agent 3 -> Agent 6 -> Agent 11

### Mode B - Content expansion

- Agent 12 -> Agent 7 -> Agent 4 -> Agent 6 -> Agent 11

### Mode C - Backend or auth work

- Agent 12 -> Agent 8 -> Agent 9 -> Agent 5 -> Agent 11

### Mode D - Guided learning improvements

- Agent 12 -> Agent 10 -> Agent 2 -> Agent 3 -> Agent 6 -> Agent 11

### Mode E - New version deployment

- Agent 12 -> Agent 1/4 -> Agent 2/10 -> Agent 3/8 -> Agent 9 -> Agent 6 -> Agent 5 -> Agent 11

Mode E gate policy:
- Gate A: product/copy lock
- Gate B: UX/onboarding lock
- Gate C: implementation complete
- Gate D: security/review cleared
- Gate E: deploy validation passed

### Mode F - Autonomous improvement loop

- Agent 12 -> Agent 11 -> smallest specialist team -> Agent 6 -> Agent 5 -> Agent 11

Mode F policy:
- Purpose: continuous self-improvement without waiting for manual task creation.
- Frequency: daily micro-cycle + weekly reunion checkpoint.
- Auto-apply only low-risk improvements.
- Medium/high-risk items must be rerouted to gated flow (Mode E).
- Weekly execution script: `autonomous-weekly-runbook.md`.

Mode F required artifacts:
- Opportunity shortlist with impact/risk score.
- Auto-apply decision log (why allowed or blocked).
- Shipped changes with validation evidence.
- Weekly reunion summary with next sprint priorities.

## Autonomous Auto-Apply Guardrails

Auto-apply allowed when all are true:
- no auth, billing, security, or deploy pipeline change,
- no Firestore rules or backend permission change,
- easy rollback,
- explicit validation path exists.

Auto-apply forbidden without explicit approval:
- auth/identity behavior,
- payments/Stripe,
- security rules,
- infrastructure/deploy routing,
- destructive operations.

## Manager Review Trigger (Mode F)

Agent 12 must force a reunion review when one of these happens:
- same issue category recurs in 2 consecutive cycles,
- conversion/trust metric drops after a shipped change,
- unresolved high-severity finding remains open,
- localization quality regresses on user-facing paths.

## Session Start Rule

At the beginning of a new session:

1. Agent 12 identifies the immediate outcome.
2. Agent 11 checks what prior learning still matters.
3. Only then are specialist agents activated.

## Session End Rule

At the end of a meaningful session:

1. Agent 6 states whether important risks remain.
2. Agent 5 states whether the change is deploy-ready if release matters.
3. Agent 11 writes the durable handoff state.
4. Agent 12 names the most logical next mission.