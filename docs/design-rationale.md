# Design Rationale — Why the Template Is Structured This Way

For engineers extending the OASIS template, or evaluating whether to adopt it. Each section's structure was a deliberate choice. This document explains the reasoning.

---

## Why a 17-section structure instead of just a schedule table

Most freely-available SOSI templates are a single schedule table — Item, Code, Frequency, Verification. They work for simple projects. They fall apart on container projects for two reasons:

1. **Container projects involve multiple parties with different roles.** Owner, EOR, SIR, separate pre-modification PE, GC, container modification subcontractor, AHJ. A single-table SOSI doesn't allocate responsibility — it just lists what gets inspected. The OASIS structure dedicates Section 5 to roles before the schedule even appears.
2. **Container projects have a unique pre-construction dependency.** The Pre-Modification Container Structural Evaluation is a separate sealed engineering letter that must precede modification. A generic SOSI treats inspection as starting when construction starts. Containers require an earlier gate. Section 3 of OASIS exists to make that gate visible.

The 17-section structure trades brevity for completeness. A reviewer can find each topic where they expect it, every responsibility is allocated, and the document survives the second round of comments without restructuring.

---

## Why Section 3 stands alone

The Pre-Modification Container Structural Evaluation is the single most-flubbed item on container projects. Many engineers fold it into the schedule as one inspection row. That under-weights it.

Section 3 stands alone because:

- It must happen *before* the SI's Chapter 17 role begins
- It is performed by a different sealed document (a letter, not an inspection report)
- It may be performed by a different engineer (separate PE) or, at Owner's election, by the SI wearing a separate hat
- It identifies containers by CSC plate number — an identification step that is often missed
- It is the document that converts the SOSI's "assumed new undamaged ISO container" into a verified specific container

By dedicating a section, we make this dependency visible to the reviewer, to the contractor, and to the SI — all of whom otherwise tend to assume the EOR has handled it.

---

## Why the EOR section in § 5.2 has four bullets

The EOR's role in a Chapter 17 program is *narrow*. The seal on the SOSI itself, period. Everything else — review of reports, response to non-conformances, attendance at meetings, final report preparation — is either someone else's role or a paid add-on. Four bullets:

1. **What the EOR does** (one bullet — prepare and seal the SOSI).
2. **What the EOR does NOT do** (one bullet — combining scope-limit and field-activity disclaimer).
3. **The reports-as-records-only clause** (one bullet — the critical liability-protection language: receipt ≠ review ≠ acceptance, additional services require written authorization in advance).
4. **The ethics carve-out** (one bullet — preserving FAC 61G15-19 public-safety obligation without creating a continuing duty to review).

These four bullets are the work product of years of professional liability claims against structural engineers who didn't make their role clear. Each bullet has a counterpart in case law somewhere.

The optional fifth bullet — standard of care and reliance on others — is in some forks of this template; we left it out of the canonical version to keep the section short, but engineers in litigation-prone jurisdictions may want to add it. See `frequency-decision-tree.md` and `how-to-customize.md` for guidance.

---

## Why the schedule uses three-letter prefixes (A, B, C)

The IBC/FBC structures Chapter 17 inspections into categories that map roughly to building systems. We adopt a similar structure:

- **Section A** — Container modifications + structural steel + welding + bolting (the bulk of the work)
- **Section B** — Anchorage + foundation + wind load path (the connections to ground and against lateral loads)
- **Section C** — Reporting + deficiencies + closeout (the process artifacts)

This makes the schedule readable as "the building, the connections, the paper trail." A reviewer can find any item quickly because they know the category structure.

The alternative — strict chronological order (pre-construction, during, post) — reads as a project schedule, which is not what the SOSI is. A reviewer asking "where do you cover field welding?" doesn't want to scroll through chronologically-ordered tasks looking for it. They want to look in Section A and find it.

---

## Why hold-point #5 points to the schedule instead of restating the welding frequency

The original draft of this template had hold-point #5 reading *"Continuous inspection during structural field welding..."* Then schedule Item A5 read *"Continuous for CJP/PJP/multipass; Periodic for small fillets per AISC Table N5.4-2."*

Those two statements contradicted each other. A reviewer comparing the two sections would see the conflict. The fix was to make the hold-point a pointer:

> *"Special inspection of structural field welding at the frequency specified in Schedule Item A5."*

One source of truth (the schedule), one cross-reference (the hold-point), zero contradictions. This is a small but important pattern — anywhere a single rule appears twice, the rule lives in one place and the other place points at it.

---

## Why post-installed anchors have their own section (§ 12)

The temptation is to fold post-installed anchors into the general schedule with one row. We resist that because:

- ACI 318-19 § 17.10 has *eight* distinct verification items (substrate, drill, hole-cleaning, anchor identification, adhesive characteristics, cure time, torque/set, proof load)
- The Continuous-for-sustained-tension carve-out is code-mandated and gets missed when buried in a single row
- Installer certification is required for some orientations and not others
- Each anchor product has its own ESR with its own MPII, and the inspection has to track that ESR

Section 12 makes all eight items visible, calls out the Continuous carve-out as its own subsection, and gives the SI a checklist they can actually use in the field.

---

## Why Section 15 (Standards) uses generic citations without edition years for some standards

Most engineers writing a SOSI either pin the citations to specific editions ("AISC 360-22") and date the document quickly, or omit the edition entirely and create ambiguity. We chose the middle path: cite the standard, but note that the FBC-adopted edition governs (because edition adoption shifts over time and the FBC's edition is the legally-binding one).

This means an OASIS-derived SOSI won't age out the moment FBC adopts a new edition of AISC 360. It does mean each user has to verify what edition is currently adopted before sealing — see `how-to-customize.md` Step 5.

---

## Why no third-party Special Inspector is named

We addressed this in the README, but to restate: the SI's identity is the Owner's notarized statement, not the SOSI. Naming the SI in the sealed SOSI creates two problems:

1. **Revision burden** — if the SI changes, the sealed document has to be revised and re-sealed.
2. **Implied vetting** — by naming the SI on a sealed document, the EOR implicitly endorses the SI. The EOR did not vet the SI's credentials; that's the AHJ's job upon receipt of the notarized statement.

Leaving the cover-page row as *"To be identified by Owner"* is both correct and protective.

---

## Why the appendices are reference templates only

The Daily Report and Discrepancy Report templates in Appendices A and B are not required forms — the SIR may use any equivalent. We include them because:

- New SIs often ask "what should my report look like?"
- AHJ reviewers like seeing a worked example
- It signals that the SOSI thought through reporting in detail

If your SIR uses a different reporting format, you don't need to enforce these templates. They're a starting point.

---

## Style choices

- **Arial 11/12 throughout** — universally available, plain, professional. No serifs because permit reviewers read fast.
- **Dark blue accent color (1F3864)** — corporate but not loud. Matches FBC and AISC document conventions.
- **Yellow warning banner for the template page** — visible at any zoom, immediately tells a downstream reader this is not a sealed document.
- **0.75″ margins** — fits more content on the page without looking cramped. Tighter than the default Word 1″ margins, looser than the 0.5″ that some firms use.
- **No emoji, no icons** — engineering documents do not age well with decorative graphics. The structure should carry the document.

---

## What we deliberately left out (and why)

- **Detailed welding procedure specifications (WPS / PQR / WPQ)** — those are the contractor's submittal documents. The SOSI verifies they exist; it does not contain them.
- **Specific anchor product names** — the SOSI is product-neutral. The contractor's submittal identifies the product; the ESR governs the inspection. If the contractor changes products mid-job, the SOSI doesn't need to be revised.
- **Sequenced construction phases** — that's means-and-methods territory. The SOSI identifies inspection points; the Contractor schedules the work.
- **Specific drawing detail references** — generic-by-category protection is stronger than enumerating specific details and risking exclusion-by-omission. See `how-to-customize.md` Step 6 for when to add an inspection-item-to-drawing-detail matrix.

---

## What we hope you take away

A Statement of Special Inspections is a contract between the EOR, the SI, the Contractor, the Owner, and the Building Official about what gets inspected, by whom, how often, and what the closeout looks like. It is also, increasingly, the document that determines liability allocation when something goes wrong. The OASIS template tries to make all of that explicit, defensible, and reusable.

If you fork it, improve it, or find a section that's weaker than it should be — open a pull request. This template gets stronger when more engineers contribute.
