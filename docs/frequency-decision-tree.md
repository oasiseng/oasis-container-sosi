# Frequency Decision Tree — Continuous vs. Periodic

The single most-contested item in a SOSI is whether a given inspection task is Continuous or Periodic. This document maps each inspection category to the governing standard and table, so you can defend your frequency selection to an AHJ reviewer, a contractor pushing back on cost, or opposing counsel three years later.

The rule of thumb: **don't pick the frequency. The standard already did. Apply the table.**

---

## Welding — AISC 360 Table N5.4-2 (QA inspection tasks during welding)

| Weld type | QA frequency | Rationale |
|---|---|---|
| Complete Joint Penetration (CJP) groove welds | **Observe** (Continuous) | Strength-critical; defects compromise full section capacity |
| Partial Joint Penetration (PJP) groove welds | **Observe** (Continuous) | Reduced cross-section warrants verification of throat |
| Multipass fillet welds | **Observe** (Continuous) | Each pass affects the integrity of subsequent passes |
| Single-pass fillet welds > 5/16″ | **Observe** (Continuous) | Larger fillets carry more load |
| Single-pass fillet welds ≤ 5/16″ | **Perform** (Periodic) | Small fillets, single pass — less critical |
| Tack welds left in place | **Perform** (Periodic) | Become part of the final joint, but small |
| Plug / slot welds | **Observe** (Continuous) | Internal welds difficult to verify post-fab |

AISC 360 also has **Table N5.4-1** (tasks *prior to* welding) and **N5.4-3** (tasks *after* welding) — most of those are Observe-type by default.

**EOR upgrade authority:** The EOR may upgrade Periodic → Continuous for any specific weld at their discretion, and should document the rationale on the SOSI. The EOR cannot downgrade below the table.

---

## Cold-formed sheet steel welding — AWS D1.3 Clause 6

Container shells (corrugated wall and roof panels) are sheet steel < 1/8″. Welding inspection follows **AWS D1.3 Clause 6**, not D1.1. Inspection is primarily **Visual (VT)** of 100% of welds, with attention to:

- Burn-through
- Penetration into supporting member
- Effective throat for arc-spot welds (which are common at panel-to-frame connections)

The template defaults to **Periodic** for this work because it's typically batched and the visual inspection is straightforward. Continuous QA is rarely required unless the design specifically loads these welds in tension.

---

## High-strength bolting — AISC 360 § N5.6 + RCSC

Three task tables:

- **Table N5.6-1** — Tasks **prior to** bolting (pre-installation verification, fastener marking confirmation, faying surface prep)
- **Table N5.6-2** — Tasks **during** bolting (snug-tightened joints — Perform/Periodic)
- **Table N5.6-3** — Tasks **after** bolting (calibration verification for pretensioned/slip-critical — Observe/Continuous during pretensioning operation)

| Joint type | QA frequency during pretensioning |
|---|---|
| Snug-tightened | Periodic (verify pattern, full contact, sequence) |
| Pretensioned, turn-of-nut | **Continuous** during pretensioning |
| Pretensioned, calibrated wrench | **Continuous** during pretensioning |
| Pretensioned, DTI | Periodic (verify DTI compression) |
| Pretensioned, TC bolt | Periodic (verify twist-off and visual) |
| Slip-critical | **Continuous** during pretensioning + faying surface check |

Note: "Continuous during pretensioning" doesn't mean the SI is on site all day — it means the SI is present *while pretensioning is happening.* In practice, this is typically a focused 1–2 hour visit per work shift.

---

## Post-installed anchors — ACI 318-19 § 17.10

This is where the most frequently-missed Continuous requirement lives.

| Anchor type and orientation | QA frequency | Source |
|---|---|---|
| Adhesive anchor — horizontal or upwardly-inclined, **sustained tension** | **Continuous** — *code-mandated, not optional* | ACI 318-19 § 17.10.2 |
| Adhesive anchor — all other orientations | Periodic | ACI 318-19 § 17.10; ESR |
| Mechanical (expansion / undercut / screw) anchors | Periodic per ESR | ACI 318-19 § 17.10; ESR |
| Anchor proof loading where required | Continuous during test | ACI 318-19 § 17.10; ASTM E488 |

**Why the sustained-tension carve-out exists:** The 2017 Memorial Highway Bridge tunnel collapse in Boston (Big Dig ceiling collapse) was triggered by adhesive anchor failure in sustained tension. ACI added § 17.10.2 in response. This isn't EOR discretion — it's hard-coded in the model code that FBC adopts. Putting Continuous in the SOSI for this case is mandatory, not optional.

---

## Concrete construction — FBC Table 1705.3 + ACI 318 Ch. 26

Most concrete inspection tasks are Periodic. The exception is:

- **Concrete placement operations** — Continuous from start of placement through finish
- **Sampling of fresh concrete for strength specimens** — Continuous during sampling (i.e., the technician is at the truck while taking the sample)
- **Inspection of formwork for shape, location, dimensions** — Periodic before placement

---

## Soils — FBC Table 1705.6

Project-dependent. Density testing of compacted fill is typically Periodic, one test per defined area per lift. Excavation bearing verification at footing locations is Periodic, one visit per pour.

---

## When to upgrade Periodic → Continuous

The EOR may, and should, upgrade specific items to Continuous when:

1. **First-of-kind condition.** First time the contractor is performing a given operation on the project — even if the code allows Periodic.
2. **Critical-path connection.** A weld or anchor whose failure would propagate to multiple members.
3. **Concealed or inaccessible.** Once buried, the work cannot be re-inspected without destructive testing.
4. **Unusual sequencing.** Stacking, mating, or other field-fit operations where alignment is critical.
5. **Unusual materials or methods.** Anything outside the qualified WPS or standard practice.

Document the rationale on the SOSI — a one-sentence note in the Verification column explaining why is sufficient. This protects you against later questions about why you departed from the code table.

---

## When NOT to downgrade Continuous → Periodic

Never. The code tables establish minimums. The EOR cannot reduce frequency below the table by SOSI language. AHJs and reviewers can and do bounce SOSIs that try.

---

## Defending your frequency selection

If a contractor pushes back on Continuous welding QA, the conversation should be about **batching the work** — sequence all CJP welds into a single shift so the inspector visit is bounded — not about reducing frequency. The frequency is a code requirement; the schedule is a contractor choice.

Sample push-back language for your back pocket:

> *AISC 360 Table N5.4-2 requires Continuous QA during CJP welding. This is the code requirement the FBC adopts; it is not a discretionary call. If the cost of QA presence is a concern, the most effective response is to batch CJP welding into a focused schedule window — which the SI can accommodate with 24–48 hours notice — rather than to seek a frequency reduction the SOSI cannot grant.*
