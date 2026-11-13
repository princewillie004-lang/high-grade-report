# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | ✅ (current) |

## Reporting a Vulnerability

This is a school report-card tool handling student PII (names, guardian
contacts, grades). If you discover a security issue, **do not open a public
GitHub issue**. Instead, email the maintainer at the address listed in the
repository profile with:

- Description of the issue
- Steps to reproduce
- Potential impact (data exposure, integrity, availability)
- Suggested mitigation (if known)

You should receive a response within 5 business days. Please allow time for
a fix before public disclosure.

## Current Security Posture (v0.1.0)

**This version is a prototype, not a hardened system.** Known limitations:

### Data storage
- All data lives in browser `localStorage` on the teacher's device.
- No encryption at rest beyond the browser's default profile protection.
- Shared-device usage (e.g., a school laptop) exposes student data to any
  subsequent user who opens the same browser profile. Mitigation planned
  for Phase 2: "Clear all data on this device" button + per-teacher profile.
- No sync, no backup ritual. Loss of browser profile = loss of reports.

### Input handling
- User input (student name, comments) is inserted into the DOM via
  `innerHTML` in places. Mitigation planned for Phase 1: DOMPurify +
  text-node insertion.
- Excel import (`XLSX.read`) evaluates formula cells. Mitigation planned
  for Phase 2: `cellFormula: false`.

### PDF generation
- html2canvas + jsPDF rasterize page content. PDF metadata may retain
  browser/OS fingerprint. Mitigation planned for Phase 2: `pdf-lib` with
  explicit empty metadata.

### Dependencies
- Six CDN scripts loaded at runtime (jszip, FileSaver, html2canvas, jsPDF,
  xlsx). A compromised CDN = compromised app. Mitigation planned for
  Phase 1: vendor all libraries locally with SRI hashes.

### Authentication & authorization
- None. The app is a single-user browser tool. Multi-user auth is a Phase 3
  concern.

### Audit trail
- No attestation record, no immutable log. A report can be edited and
  re-printed with no trace. Mitigation planned for Phase 2: attestation
  hash (SHA-256 of report payload) + local audit log.

## Threat Model (STRIDE, current)

| Threat | Vector | Current state | Phase fix |
|--------|--------|---------------|-----------|
| Spoofing | Shared device → impersonation | No auth | Phase 3 |
| Tampering | Edit localStorage directly | No integrity check | Phase 2 (attestation hash) |
| Repudiation | No proof teacher attested | No audit log | Phase 2 |
| Information disclosure | Shared device / XSS | localStorage readable | Phase 2 |
| Denial of service | Clear site data | No backup | Phase 2 (export + ritual) |
| Elevation of privilege | N/A (single-user) | N/A | Phase 3 |

## Alignment

This policy is aligned with:
- OWASP ASVS Level 1 (target for v1.0)
- Ghana Data Protection Act, 2012 (Act 843) — PII retention policy in Phase 3
- GDPR principles (data minimization, storage limitation) — as a design target,
  not a compliance claim for the current prototype