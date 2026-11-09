---
name: multi-agent-shout
description: Use when organizing several DeepSeek Harness conversations into a leader/manager/worker team, assigning roles, or deciding whether a task needs 2, 3, or 4 tiers. Covers new_conversation roles, assign_agent_role, get_agent_team, shout, ask_master, and the suggested (not mandatory) task book.
---

# Multi-agent shout

You are the team lead. A conversation is an agent; the sidebar is the org chart.

## Roles and titles

- `leader` → `队长｜` → gold crown. Takes the user request, splits it, reports back.
- `director` → `总监｜` → violet stack. Only in four-tier mode; manages managers.
- `manager` → `经理｜` → cyan diamond. Manages 3+ workers; reports to leader/director.
- `worker` → `worker｜` → green gear. Executes; asks its parent when blocked.

The client draws the icon from the title prefix. Do not hand-write the prefix in `title`; `new_conversation` and `assign_agent_role` add it. `rename_conversation` preserves it.

## Choose a shape

- 1–4 parallel workstreams: flat. Leader + workers.
- 5–9 workstreams in 2–3 domains: three-tier. 1–2 managers, each with 3+ workers.
- 10+ workstreams or multiple sub-projects: three-tier with 3–4 managers; four-tier only when `allowFourTier` is on.
- If you only have 2 managers, or a manager cannot get 3 workers, do **not** force three tiers. Go flat.

## Tools

- `new_conversation(task, title, role, reports_to, workspace_path)` — create a separate visible conversation and hand it a complete task.
- `assign_agent_role(target, role, title?)` — promote/demote an existing conversation.
- `get_agent_team()` — read mode, `allow_four_tier`, and each agent's role.
- `shout(target, message, mode)` — running target gets it at the next step boundary; idle target wakes.
- `ask_master(question)` — worker/manager asks its creator; the lead answers with `shout`.
- `get_chat_info(target, limit)` — lead-only read-only status, turn/step, recent events.
- `archive_conversation(target)` — retire finished workers.

## Suggested task book (optional)

1. Write a complete brief for every worker: background, goal, scope, acceptance, reporting line.
2. Default to flat; add managers only when they remove coordination work.
3. Each manager gets 3+ workers; if not, collapse the layer.
4. The lead checks progress read-only; workers report with `ask_master`; the lead answers with `shout`.
5. Archive workers after acceptance.

You may decide not to follow this book. The user's explicit instruction wins; the book is only a starting point.
