# Studio Occasus - Autonomous Weekly Runbook

## Purpose

This runbook makes Mode F executable as a real operating rhythm.
Use it to run a full weekly cycle with daily autonomous improvements and a manager-led reunion.

## Inputs Required At Start Of Week

- Last weekly reunion summary
- Current top product risks
- Current top conversion and trust frictions
- Open high-severity review findings
- Active deployment constraints

## Weekly Outcome Targets

- Ship at least 3 validated low-risk improvements
- Resolve or explicitly defer all high-severity findings
- Improve at least 1 key metric proxy (activation, repeat usage, upgrade intent, trust)
- End week with a clear sprint commitment for next cycle

## Daily Cadence (Monday To Friday)

### Daily Micro-Cycle (30-60 min)

1. Agent 11 collects signals from:
- user friction reports
- review findings
- localization quality issues
- recent deploy issues

2. Agent 12 triages opportunities using this scoring grid:
- Impact (1-5)
- Trust risk if ignored (1-5)
- Conversion effect (1-5)
- Complexity (1-5, inverse)

3. Agent 12 routes each item:
- Auto-apply lane (low risk)
- Gated lane (Mode E)
- Backlog lane (defer)

4. Specialists execute in smallest team format.

5. Agent 6 runs focused review.

6. Agent 5 validates smoke checks if shipped.

7. Agent 11 writes daily memory summary.

## Weekly Timeline

### Monday - Prioritization And Setup

- Build the opportunity board for the week
- Select top 5 items by score
- Lock owners, done criteria, and validation path

### Tuesday - Execution Wave 1

- Ship 1-2 low-risk items
- Validate user-visible effect
- Capture evidence and learnings

### Wednesday - Midweek Review

- Re-check shipped changes for regressions
- Reprioritize based on new signals
- Escalate medium/high-risk items to Mode E

### Thursday - Execution Wave 2

- Ship remaining low-risk items
- Close high-priority quality debt where possible

### Friday - Reunion And Reset

- Run weekly reunion format
- Decide next sprint priorities
- Publish action summary and owner commitments

## Auto-Apply Decision Checklist

Only auto-apply if all are true:

- No auth, billing, security, Firestore rules, or deploy routing changes
- No destructive operation
- Rollback path is clear
- Validation path is explicit
- User-facing intent is clear

If one is false, route to Mode E.

## Validation Checklist (Per Shipped Item)

- No editor errors in touched files
- Primary scenario works
- No obvious regression in adjacent flow
- FR and EN text quality acceptable when visible
- Result documented with before/after note

## Weekly Reunion Report Template

```
Reunion Type: Autonomous Improvement Review
Week: YYYY-MM-DD -> YYYY-MM-DD

1) Shipped Improvements
- item:
- owner:
- expected effect:
- observed result:
- evidence:

2) Missed Issues
- issue:
- why missed:
- prompt/checklist/test update applied:

3) Metric Signals
- activation:
- repeat usage:
- upgrade intent:
- trust:

4) Next Sprint Top 5
- item:
- owner:
- mode (auto-apply or gated):
- done criteria:

5) Risks And Blockers
- blocker:
- impact:
- mitigation owner:
```

## Manager Kickoff Script (Weekly)

```
Mode: F - Autonomous Improvement Loop
Objective: Ship the highest-impact safe improvements this week.

Today:
1) Build and score opportunity shortlist.
2) Auto-apply only low-risk items.
3) Escalate medium/high-risk items to Mode E.
4) Require review evidence before close.
5) Publish daily summary and Friday reunion report.
```

## Exit Conditions For The Week

- Weekly reunion report published
- Next sprint commitments assigned
- High-severity open items have explicit owner and due mode
- Team memory updated with repeatable lessons
