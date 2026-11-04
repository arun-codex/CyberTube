# CyberTube Evidence Specification

## Canonical Evidence Envelope

Every evidence record follows REA's canonical structure:

| Field | Type | Description |
|---|---|---|
| evidence_id | string | Deterministic hash: "ev_" + sha256 |
| case_id | string | Parent CyberTube case ID |
| subject | SubjectIdentity | Target file identity (name, sha256, format, arch) |
| provider | ProviderMetadata | REA provider that produced the evidence |
| rea_version | string | REA version used (e.g. "6.8.0") |
| operation | string | REA tool name (e.g. "inspect_pe_imports") |
| parameters | object | Tool parameters used |
| normalized_result | object | Structured observations |
| confidence | enum | "observed" / "inferred" / "hypothesis" / "unknown" |
| authority | enum | "shipped-artifact" / "runtime-observation" / "documentation" |
| coverage | object | Completeness status and counts |
| limitations | string[] | Explicit boundaries of what analysis cannot prove |
| residual_unknowns | string[] | Open questions requiring further evidence |
| evidence_links | string[] | Parent/child evidence references |
| created_at | string | ISO 8601 timestamp |

## Sanitization Rules

Before publishing evidence to the web application:
1. Strip absolute local filesystem paths (replace with relative identifiers)
2. Remove any PII, authorization tokens, or internal hostnames
3. Verify clean-room non-infringing reconstructions
4. Never include raw binary payloads
