# Security Boundary Design

## Zero Exposure Rule

The CyberTube web application NEVER:
- Exposes REA MCP tools or CLI commands
- Serves raw binary artifacts or executable payloads
- Provides shell execution or process spawning
- Reveals local filesystem paths

## Data Flow

```
LOCAL REA LAB (private)
  → Evidence Sanitization Pipeline
  → Sanitized JSON + Clean-Room Code
  → PUBLIC CYBERTUBE WEB (read-only)
```

## Lab Directory (git-ignored)

- `lab/targets/` — Test binaries, never committed
- `lab/raw_evidence/` — Raw REA outputs, never served publicly

## Published Cases (version-controlled)

- `cases/*/evidence/` — Sanitized evidence JSON only
- `cases/*/reconstruction/` — Independent clean-room code
