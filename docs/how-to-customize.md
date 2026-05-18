# How to Customize the OASIS Template

A guided walkthrough for adapting the canonical SOSI to your specific project. Follow this order — it minimizes rework.

---

## Step 1 — Read DISCLAIMER and confirm you are the EOR

If you are not the licensed Engineer of Record for the project, stop. This template is intended to be customized and sealed by the project's EOR. Forwarding it to another engineer for them to seal is a fine use; using it without an EOR is not.

## Step 2 — Strip the template banner

The first-page yellow banner reading **"TEMPLATE — NOT FOR DIRECT USE"** is for the repository, not for your sealed deliverable. Delete the banner table and the cover-page disclaimer paragraph. Replace with your firm's letterhead, project info block, and revision history table per your office standards.

## Step 3 — Fill in the cover-page table

Every project-specific value lives in the cover-page table. Fill in every row:

| Cover-page field | Source of truth |
|---|---|
| Project Name | Your CDs |
| Project Address | Your CDs |
| Permit Number | AHJ-assigned (placeholder until issued) |
| AHJ | The Building Official's department |
| Owner | Owner's representative (name, contact) |
| Engineer of Record | You, your PE#, your COA# |
| Engineering Firm | Your firm |
| Special Inspector of Record | "To be identified by Owner" — do NOT name the SI on your sealed document; the Owner's notarized statement names the SI |
| General Contractor | Identified separately (often the Owner doesn't have a GC at permit-submittal time; leave as "To be identified" if so) |
| Risk Category | FBC Table 1604.5 — typically II for residential ADU, IV for emergency facilities |
| Vult | ASCE 7-22 contour for your site (find from FBC or BSEE wind map) |
| Wind Exposure | ASCE 7-22 § 26.7 — B for suburban, C for open, D for coastal |
| HVHZ Project? | YES only if Miami-Dade or Broward County |
| Seismic Design Category | "A (typical, FL)" works for almost all FL projects |
| Drawing Set Reference | Your S-sheets, revision and issue date |
| SOSI Document No. | Your office's document numbering |
| Date / Revision | Date of sealing |

## Step 4 — Customize § 2 (Project Description)

Replace the bracketed narrative paragraph with 1–2 sentences describing your specific containers, configuration, modifications, foundation type, and total area. Use the correct ISO designators:

- **1AAA** = 40-ft × 8'6" × 9'6" high cube
- **1AA** = 40-ft × 8'6" × 8'6" standard
- **1CCC** = 20-ft × 8'6" × 9'6" high cube
- **1CC** = 20-ft × 8'6" × 8'6" standard

If a container is field-shortened, describe it as *"field-shortened, finished length X ft, with new structural end-frame reconstructed at the cut termination per the structural details."*

The three assumption bullets below the narrative should stay unless your design genuinely deviates from them (e.g., you're using a damaged or non-ISO container that's been independently evaluated — in which case the SOSI needs much more revision than just this section).

## Step 5 — Verify code editions in § 15 and elsewhere

The template uses generic "AISC 360," "AWS D1.1," "ACI 318" references because the FBC-adopted edition changes over time. Before sealing, confirm with your AHJ which editions are currently adopted. If your AHJ accepts the latest editions:

- **AISC 360-22** (Clause N for QA/QC). If FBC-adopted edition is -16, swap citations accordingly; Chapter N structure is similar but a few table numbers differ.
- **AWS D1.1:2020** — Inspection is in **Clause 8**. If FBC-adopted edition is :2015, inspection is in **Clause 6**.
- **AWS D1.3:2018**
- **ACI 318-19** — Anchor installation is in **§ 17.10**. Earlier editions used § 17.8.2.
- **RCSC 2020**

Search the document for each citation and update where needed.

## Step 6 — Adjust hold points (§ 8) and schedule (§ 9) for project-specific items

The template covers the typical container project. If your project has unusual elements — for example, a vertically-stacked configuration, a moment-frame transfer beam, or post-tensioned anchors — add corresponding rows to the schedule and hold points to § 8. Use the same column structure (Item / Reference / Timing-Frequency / Verification).

If your project does NOT have certain elements — e.g., no post-installed anchors, or no concrete foundation — you may leave the corresponding rows in the schedule with the note "N/A — not applicable to this project" rather than deleting them. Keeping rows visible signals to the reviewer that you considered each inspection category.

## Step 7 — Review hold-point #5 and § 9 Item A5 (welding frequency)

The most-contested item in container SOSIs is welding frequency. The template references AISC 360 Table N5.4-2 for the C-vs-P call. Confirm this is the right frequency for your project. If you have welds that warrant upgrading from Periodic to Continuous, edit Item A5 to call that out, and add the rationale (e.g., "Continuous QA elected for all welds at primary container-to-foundation connections per EOR direction.").

## Step 8 — Customize § 17 (EOR Statement and Signature)

The template includes a brief EOR statement and signature lines with placeholders. Replace `[INSERT EOR NAME]` and `[INSERT]` with your name and PE number. Apply your seal here per FAC 61G15-23 conventions for your office (wet seal, digital seal, or embosser).

**Do not let other parties sign into the same sealed PDF.** If Owner, SIR, or GC need to acknowledge, they sign a separate Acknowledgments page that is NOT part of the sealed PDF. See the README and the discussion in the original project notes.

## Step 9 — Add attribution per CC BY 4.0

In your document footer or in a "Referenced Materials" section, include the attribution line specified in [NOTICE.md](../NOTICE.md). This satisfies the only requirement of the CC BY 4.0 license.

## Step 10 — Run the pre-flight checklist

Before sealing and submitting:

- [ ] All `[PLACEHOLDER]` strings replaced or affirmatively left as `"N/A"`
- [ ] Template banner deleted from first page
- [ ] Cover-page table fully populated
- [ ] § 2 project description matches the structural drawings
- [ ] § 3 pre-modification evaluation path identified (separate PE vs. SI)
- [ ] § 5.1 Owner bullet reflects who is providing the pre-mod letter
- [ ] § 15 code-edition references match your AHJ's adopted editions
- [ ] § 17 EOR name and license number filled in
- [ ] Attribution line added per CC BY 4.0
- [ ] Document header/footer updated to your firm's standard
- [ ] All cross-references (e.g., "see § 9 Item A5") still resolve to the correct section after any edits
- [ ] PDF generated and reviewed before stamping

## Step 11 — Stamp it. Ship it.

Apply your seal per FAC 61G15-23. Submit per the AHJ's procedures (typically PDF upload to the jurisdiction's permit portal; in Tampa, Accela).
