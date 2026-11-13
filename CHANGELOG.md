# Changelog

All notable changes to the High Grade Montessori Report Card Generator
will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned (Phase 1–3)
- Vite + TypeScript migration (strangler-fig at `/v2/`)
- IndexedDB + WAL to replace localStorage
- Vector PDF pipeline (`pdf-lib`) to replace html2canvas + jsPDF
- WCAG 2.2 AA remediation (shape+letter grade coding, focus rings, 24px targets)
- Undo for destructive actions (delete report, clear database)
- Attestation record + audit trail
- Vendor all CDN libraries locally (offline-first)
- Supabase adapter (optional, Phase 3)

## [0.1.0] - 2026-11-13

### Changed
- Renamed `index (1).html` → `index.html` (deployability; no internal references required updating).
- Fixed broken glyph in "Download Batch PDF" button (replacement character `�` → `🗂️`).
- Added `.gitignore` with explicit "do not ignore" list for `Picture3.png`, `app.js`, `index.html`.
- Added `CHANGELOG.md` (this file), `SECURITY.md`, `CODE_OF_CONDUCT.md`.

### Verified
Browser verification in Chromium against `http://localhost:3000/index.html`:
- Page loads, school header + logo render, no console errors.
- Teacher's Class dropdown: 9 options (Primary 1–6, JHS 1–3).
- Subject rows: 9 Primary / 10 JHS; class switch toggles correctly.
- All five CDN libraries load: JSZip, FileSaver (saveAs), html2canvas, jsPDF, XLSX.
- Student info entry, report generation, save, reload persistence — all pass.
- PDF download — works (single report).

### Known issues (unchanged from pre-0.1.0; scheduled for Phase 2+)
- PDF pipeline (html2canvas + jsPDF) rasterizes text — blurry, unselectable, large files.
- All data in `localStorage` (5 MB cap, no WAL, no crash recovery, synchronous blocking).
- Color-only grade coding (WCAG 2.2 SC 1.4.1 violation).
- No undo for destructive actions (delete report, clear database).
- No attestation record; no audit trail.
- Six CDN dependencies (jszip, FileSaver, html2canvas, jsPDF, xlsx) — app breaks if CDN blocked.
- No automated tests, no accessibility gate, no CI.
- No multi-user support, no login, no central database.
- Excel import evaluates formula cells (CSV injection risk).

[Unreleased]: https://github.com/OWNER/REPO/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/OWNER/REPO/releases/tag/v0.1.0