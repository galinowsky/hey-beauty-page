# gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools directly.

Available gstack skills:
- `/office-hours` — structured problem-solving session
- `/plan-ceo-review` — prepare a plan for CEO review
- `/plan-eng-review` — prepare a plan for engineering review
- `/plan-design-review` — prepare a plan for design review
- `/design-consultation` — get design feedback and guidance
- `/review` — code review
- `/ship` — ship a feature end-to-end
- `/land-and-deploy` — land and deploy changes
- `/canary` — canary deploy
- `/benchmark` — run benchmarks
- `/browse` — web browsing (use this for all web browsing tasks)
- `/qa` — QA testing
- `/qa-only` — QA without code changes
- `/design-review` — design review
- `/setup-browser-cookies` — set up browser cookies
- `/setup-deploy` — set up deployment
- `/retro` — run a retrospective
- `/investigate` — investigate an issue
- `/document-release` — document a release
- `/codex` — use Codex
- `/cso` — chief of staff operations
- `/careful` — careful mode for high-risk changes
- `/freeze` — freeze the codebase
- `/guard` — guard mode
- `/unfreeze` — unfreeze the codebase
- `/gstack-upgrade` — upgrade gstack to the latest version

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

# currentDate
Today's date is 2026-03-27.
