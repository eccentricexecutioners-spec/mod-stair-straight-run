# SYNC-PROMPT.md — mod-stair-straight-run
# Run this at the start of every Claude Code session in this repo
# Version 1

---

## PART 1 — FULL SYSTEM READ (every session, no exceptions)

Read every file listed below completely before doing anything else.
Do not skim. Do not skip. Full system understanding prevents changes
from creating unexpected interactions between files.

**Always read:**
- `CLAUDE.md` at repo root (if it exists)
- `src/app/api/` — upload, session/process, session/status
- IRC 2021 compliance logic
- Stringer profile CSV generator

After reading, run:
`npm test` — report total / passing / failing
`npm run build` — report clean or errors

---

## PART 2 — SYSTEM MAP (write this out after reading)

After reading all files, write out answers to these before touching anything.

### A. Data flow
How does data move through this system?
- What are the main inputs and outputs?
- What shared state exists and which files read/write it?
- What external services are called and where?

### B. API and integration surface
List every API route, external call, or inter-module dependency.
For each: what does it do, what can go wrong, what does it depend on?

### C. Known fragile areas
- Auth middleware — was missing on all routes (HIGH security issue, resolved 2026-03-06). Verify auth is present on every route before any change.
- IRC 2021 compliance — code compliance values are regulatory. Do not change without source verification.
- CSV output format — pocketstairs.ca and mothership consume this. Format must stay stable.
- Not deployed to Vercel yet — do not deploy without explicit instruction.
For each fragile area: read the relevant code and confirm current state.

### D. Known working behaviour
List everything confirmed working based on CLAUDE.md or HANDOFF files.
This becomes your checklist — verify it still passes after any change.

---

## PART 3 — NARROW AUDIT (for the specific change this session)

After the system map, narrow to what's actually changing.

### For each file that will be modified:
1. Read it again with full system context in mind
2. Write the exact current behaviour relevant to the change
3. Write the exact intended new behaviour
4. Identify every other file that could be affected
5. What is the minimum change that achieves the goal?
6. What could go wrong, and how will you verify it didn't?

### Conflict checklist (answer before writing any code):
- Does the change touch an animation loop, job pipeline, or worker?
  → Write out the new sequence step by step before coding it
- Does the change involve declarative config AND imperative overrides
  of the same property?
  → Declarative config resets on re-render/restart. Confirm they agree.
- Does the change affect auth, RLS, JWT, or API keys?
  → Trace the full auth path. Confirm tokens/keys are correct at each step.
- Does the change affect a shared utility, type, or constant?
  → Confirm all consumers still work.
- Does the change add new state or shared variables?
  → Confirm no duplication of existing state.

---

## PART 4 — STATUS REPORT

After Parts 1-3, produce this report before starting any work:

---

## SESSION STATUS REPORT — mod-stair-straight-run
Date: [today]

### Tests
Total / passing / failing

### Build
Clean or errors

### System map summary
- Data flow: [1-2 sentences]
- API / integration surface: [count of routes/calls/dependencies]
- Fragile areas reviewed: [list, note any issues found]
- Known working behaviour: [list from CLAUDE.md / HANDOFF]

### This session
- Files changing: [list]
- Conflicts found in audit: yes/no — describe any
- Minimum change identified: [describe]
- Risk areas: [describe]

### Top issue to address
Based on the prompt file for this session

---

## PART 5 — WORK RULES

- Do not write any code until Parts 1-3 are complete and written out
- Read the prompt file provided and execute it
- If the audit found a conflict the prompt doesn't account for —
  flag it first, do not patch around it silently
- Contract-first: before changing any file, write the working checklist,
  change only what's stated, verify the checklist after
- Run tests after every individual fix — never batch then test at the end
- If a fix doesn't work after one attempt, stop and report back —
  do not keep patching the same problem
- After completing work, update CLAUDE.md or the relevant HANDOFF file
  with what changed
