# OASIS

**Open Accessible Special Inspections for Shipping containers**

A reference-quality, attorney-aware, FBC 2023 Chapter 17 compliant Statement of Special Inspections (SOSI) template for shipping container structural projects in Florida.

Free to use, fork, adapt, and incorporate into your firm's work product under **[CC BY 4.0](LICENSE)** — attribution required. Commercial use permitted; no royalty.

---

## Why this exists

Shipping container construction sits in a code gap. The FBC has no chapter specifically for it, AHJs are inconsistent about what they want, and every engineer who takes one of these projects ends up rebuilding the special inspection plan from scratch. The result is a lot of thin, generic SOSIs that don't anticipate the issues a reviewer will actually raise — and a lot of liability exposure for the engineer who seals them.

OASIS is the reference plan I wish I'd had on my first container project. It's structured around the categories of work that actually matter for containers (cold-formed welding, corner-casting connections, post-installed anchors in concrete piers, etc.), it cites the specific tables in AISC 360, AWS D1.1/D1.3, ACI 318, and FBC Ch. 17 that govern frequency, and it carries the protective language that keeps the EOR's seal one step removed from the inspections themselves.

If you're a Florida structural engineer doing your first container ADU and you want a defensible Ch. 17 plan in a day instead of a week — start here.

---

## What's in this repo

```
oasis-container-sosi/
├── README.md                              ← this file
├── LICENSE                                ← CC BY 4.0, verbatim
├── NOTICE.md                              ← copyright + attribution rules
├── DISCLAIMER.md                          ← liability shield (read first)
├── CHANGELOG.md                           ← version history
├── templates/
│   └── OASIS_SOSI_Template.docx           ← the canonical template
├── docs/
│   ├── how-to-customize.md                ← what to change, in what order
│   ├── frequency-decision-tree.md         ← C vs. P per AISC, ACI, FBC
│   └── design-rationale.md                ← why each section is structured this way
└── examples/                              ← (future) example redacted SOSIs from real projects
```

---

## Quick start

1. **Read [DISCLAIMER.md](DISCLAIMER.md) first.** This is reference material, not a substitute for your judgment as EOR. You are the engineer who seals the derived document and owns the technical content.

2. **Open [`templates/OASIS_SOSI_Template.docx`](templates/OASIS_SOSI_Template.docx)** in Word.

3. **Replace every `[PLACEHOLDER]`** with project-specific values. The cover page captures the full list; subsequent sections reference back to it. Don't ship a document with `[INSERT PROJECT NAME]` still in it (it has been done — a reviewer caught it).

4. **Read [`docs/how-to-customize.md`](docs/how-to-customize.md)** for the order of operations and the sections most likely to need project-specific edits.

5. **Verify all referenced code editions** match what your AHJ has adopted. The template uses generic references (e.g., "AISC 360") because the FBC-adopted edition shifts over time. Confirm with your local AHJ before sealing.

6. **Strip the OASIS template banner from the first page** before sealing your derived document. The banner is for the template repo; your sealed deliverable replaces it with your firm's letterhead, project info block, and seal.

7. **Apply your own seal.** The template intentionally contains no seal, no PE number, and no firm name. You provide all of those; you are the EOR of the work you sign.

---

## Attribution — required under CC BY 4.0

When you use this template in a project deliverable, please include the following attribution line in a discreet location (most engineers put it in the document footer or in the "Referenced Materials" section):

> *Structure adapted from the OASIS reference SOSI for shipping container projects (github.com/oasiseng/oasis-container-sosi), CC BY 4.0.*

That's it. No royalty, no commercial license fee, no permission required. Use it, fork it, build on it. Attribution helps other engineers find the project and contributes to a stronger reference for the whole industry.

---

## What's *not* in this template (intentionally)

This is a SOSI template, not a complete structural permit package. Out of scope:

- The structural drawings themselves
- The Pre-Modification Container Structural Evaluation letter (see § 3 of the template — that's a separate sealed document)
- The Owner's notarized statement identifying the Special Inspector
- The Contractor's Statement of Responsibility (FBC § 1704.4)
- Architectural, MEP, energy, fire, life-safety items
- AHJ-specific submittal forms

---

## Need help with the actual project?

If you're working on a shipping container project in Florida and want sealed engineering services (structural design, pre-modification container evaluation, project-specific SOSI customization, plan revision response), I run a small structural engineering practice that does exactly this work.

**Oasis Engineering, LLC** — Florida structural engineering for shipping container, modular, and small-scale residential projects.

→ **[oasisengineering.com/contact](https://oasisengineering.com/contact)**

I'm also happy to pair on a Ch. 17 plan via consulting if you'd rather keep the seal as your firm's. Reach out.

---

## Contributing

This is a single-author project today. If you have improvements — corrections to code references, additional inspection items, AHJ-specific notes from your jurisdiction — open an issue or a pull request. Constructive contributions welcomed; please follow the file structure and tone.

---

## License

[Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material
- **For any purpose, even commercially**

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

---

## Author

Initial template authored by **Enrique Lairet, P.E.**, Oasis Engineering, LLC. Released as OASIS under CC BY 4.0 in 2026.
