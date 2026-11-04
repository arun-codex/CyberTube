# CyberTube Architecture

CyberTube is an evidence-driven reverse-engineering learning platform.

## System Components

- **REA (Reverse Engineer Anything)**: Local analysis engine (rea-agents@6.8.0, 229 MCP tools). Runs offline on the developer workstation. Never exposed publicly.
- **Antigravity**: Coding and reasoning agent that synthesizes evidence into educational materials.
- **CyberTube Web**: Read-only student-facing application serving sanitized case studies.

## Evidence Pipeline

1. **Investigate** — Define target, provenance, and scope
2. **Collect** — Execute bounded REA tools; capture normalized evidence JSON
3. **Explain** — Separate observed facts, inferences, and unknowns
4. **Reconstruct** — Write clean-room models (TypeScript/pseudocode)
5. **Verify** — Validate against ground-truth evidence
6. **Teach** — Publish interactive lessons and quizzes

## Security Boundary

The public web application has ZERO access to REA MCP tools, local binaries, or shell execution. All evidence is sanitized before publication.

