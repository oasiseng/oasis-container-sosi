# CHANGELOG

All notable changes to OASIS — Open Accessible Special Inspections for Shipping containers will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Version numbers follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] — 2026-05-18 — Initial release

### Added
- **Canonical SOSI template (`templates/OASIS_SOSI_Template.docx`)** — 17-section Statement of Special Inspections covering FBC 2023 Chapter 17 requirements for shipping container structural projects:
  - Cover page with project-info table (Risk Category, Vult, Exposure, HVHZ flag, etc.)
  - Purpose, authority, scope, and not-a-substitute-for clauses
  - Project description with ISO container assumptions
  - Pre-modification container evaluation framework (separate PE *or* the SI option)
  - Definitions and Continuous-vs-Periodic frequency designations
  - Roles and responsibilities (Owner / EOR / SIR / Contractor / Building Official)
  - EOR scope-limit and standard-of-care bullets, plus FAC 61G15-19 ethics carve-out
  - Special Inspector qualifications table by discipline
  - Pre-construction conference requirements
  - Required hold points (cross-referenced to schedule)
  - Master schedule of special inspections — 7 items in Section A (containers / welding / bolting), 7 items in Section B (anchorage / foundation / wind), 3 items in Section C (reporting / closeout)
  - Inspection procedures by item with method, hold-points, acceptance criteria
  - NDT requirements per AISC 360 Table N5.4-2
  - Post-installed anchor protocol per ACI 318-19 § 17.10, including the code-mandated Continuous QA for adhesive anchors in horizontal/upwardly-inclined sustained-tension orientations
  - Reporting protocol and discrepancy resolution
  - Final Report of Special Inspections per FBC § 1704.2.4
  - Referenced codes and standards table
  - Assumptions, exclusions, and limitations
  - EOR statement and signature block
  - Appendix A: Inspector Daily Report template
  - Appendix B: Discrepancy / Non-Conformance Report template

- **`README.md`** — project intent, structure, quick start, attribution guidance, link to commercial services
- **`LICENSE`** — Creative Commons Attribution 4.0 International (CC BY 4.0)
- **`NOTICE.md`** — copyright, attribution rules, trademark notice
- **`DISCLAIMER.md`** — full liability shield
- **`docs/how-to-customize.md`** — order of operations for adapting the template
- **`docs/frequency-decision-tree.md`** — C vs P logic with code references
- **`docs/design-rationale.md`** — section-by-section rationale for engineers extending the template

### Notes
- This is the initial public release. The template reflects the author's interpretation of FBC 2023 Chapter 17 as adopted on the publication date; users are responsible for verifying current code editions and AHJ-specific requirements.
- All project-specific values are bracketed `[PLACEHOLDER]` strings. The template intentionally contains no PE seal, license number, or firm name.

---

## Unreleased — planned

- Example redacted SOSIs from real projects (with permission, in `examples/`)
- Plain-text Markdown version of the template for easier diffing across forks
- Excel schedule matrix as separate spreadsheet
- AHJ-specific addenda for high-volume jurisdictions (Miami-Dade, Broward, Hillsborough, Orange)
- AISC 360-22 / AWS D1.1:2020 specific section-number adaptations (current template uses generic AISC 360 / AWS D1.1 references and notes the FBC-adopted edition governs)
