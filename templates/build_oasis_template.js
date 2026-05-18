// OASIS — Open Accessible Special Inspections for Shipping containers
// Redacted reference template. Apply your own seal; you are the EOR.
//
// All "[PLACEHOLDER]" values must be filled in for any project use.
// Distributed under CC BY 4.0. Attribution required.

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  TabStopType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak
} = require("docx");

// ---------- styling helpers ----------
const border = { style: BorderStyle.SINGLE, size: 4, color: "808080" };
const cellBorders = { top: border, bottom: border, left: border, right: border };
const headerShade = { fill: "1F3864", type: ShadingType.CLEAR, color: "auto" };
const subShade    = { fill: "D9E2F3", type: ShadingType.CLEAR, color: "auto" };
const altShade    = { fill: "F2F2F2", type: ShadingType.CLEAR, color: "auto" };
const warnShade   = { fill: "FFF2CC", type: ShadingType.CLEAR, color: "auto" };

function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 80, ...(opts.spacing || {}) },
    alignment: opts.alignment,
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italics, size: opts.size || 22, color: opts.color, font: "Arial" })]
  });
}
function R(text, opts = {}) {
  return new TextRun({ text, bold: opts.bold, italics: opts.italics, size: opts.size || 22, color: opts.color, font: "Arial", underline: opts.underline });
}
function H1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, size: 30, color: "1F3864", font: "Arial" })] });
}
function H2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 220, after: 100 },
    children: [new TextRun({ text, bold: true, size: 26, color: "1F3864", font: "Arial" })] });
}
function H3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 180, after: 80 },
    children: [new TextRun({ text, bold: true, size: 22, color: "2E5496", font: "Arial" })] });
}
function bullet(text, level = 0) {
  return new Paragraph({ numbering: { reference: "bullets", level }, spacing: { after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })] });
}
function bulletR(runs, level = 0) {
  return new Paragraph({ numbering: { reference: "bullets", level }, spacing: { after: 60 }, children: runs });
}
function num(text, level = 0) {
  return new Paragraph({ numbering: { reference: "numbers", level }, spacing: { after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })] });
}
function cell(content, opts = {}) {
  const para = Array.isArray(content) ? content
    : (typeof content === "string"
        ? [new Paragraph({ children: [new TextRun({ text: content, size: opts.size || 20, bold: opts.bold, color: opts.color || "000000", font: "Arial" })], alignment: opts.alignment })]
        : [content]);
  return new TableCell({
    borders: cellBorders, width: { size: opts.width, type: WidthType.DXA },
    shading: opts.shading,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER, children: para,
    columnSpan: opts.columnSpan
  });
}

// ---------- page setup ----------
const PAGE_W = 12240, PAGE_H = 15840;
const MARGIN = 1080;
const CONTENT_W = PAGE_W - 2 * MARGIN;

// ---------- COVER / TEMPLATE BANNER ----------
const coverChildren = [
  // Template banner — bright yellow box at top
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 12, color: "BF8F00" },
                 bottom: { style: BorderStyle.SINGLE, size: 12, color: "BF8F00" },
                 left: { style: BorderStyle.SINGLE, size: 12, color: "BF8F00" },
                 right: { style: BorderStyle.SINGLE, size: 12, color: "BF8F00" } },
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: warnShade,
      margins: { top: 160, bottom: 160, left: 200, right: 200 },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: "TEMPLATE — NOT FOR DIRECT USE", bold: true, size: 28, color: "7F6000", font: "Arial" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 },
          children: [new TextRun({ text: "Any document derived from this template must be reviewed, customized, sealed, and signed by the licensed Engineer of Record (EOR) of the project for which it is used. The EOR assumes full and exclusive professional responsibility for the technical content and code applicability of the sealed document. The original author of this template disclaims all liability arising from third-party use. See DISCLAIMER below.", size: 18, italics: true, color: "595959", font: "Arial" })] })
      ]
    })] })]
  }),

  new Paragraph({ spacing: { before: 800, after: 240 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "STATEMENT OF SPECIAL INSPECTIONS", bold: true, size: 44, color: "1F3864", font: "Arial" })] }),
  new Paragraph({ spacing: { after: 240 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Shipping Container Structural System", bold: true, size: 32, color: "2E5496", font: "Arial" })] }),
  new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "OASIS — Open Accepted Special Inspections for Shipping containers", italics: true, size: 22, color: "595959", font: "Arial" })] }),
  new Paragraph({ spacing: { after: 600 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Prepared in accordance with the Florida Building Code, 2023 Edition, Chapter 17", size: 20, italics: true, font: "Arial" })] }),
];

const infoRow = (label, value) => new TableRow({ children: [
  cell(label, { width: 3200, shading: subShade, bold: true }),
  cell(value, { width: 6880 })
] });

const projectTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [3200, 6880],
  rows: [
    infoRow("Project Name", "[INSERT PROJECT NAME]"),
    infoRow("Project Address", "[INSERT STREET, CITY, COUNTY, FL ZIP]"),
    infoRow("Permit Number", "[INSERT PERMIT # — AHJ to assign]"),
    infoRow("Authority Having Jurisdiction (AHJ)", "[INSERT BUILDING DEPARTMENT NAME]"),
    infoRow("Owner", "[INSERT OWNER NAME / CONTACT]"),
    infoRow("Engineer of Record (EOR)", "[INSERT EOR NAME, P.E.] — FL P.E. No. [INSERT]"),
    infoRow("Engineering Firm", "[INSERT FIRM] — FL Certificate of Authorization No. [INSERT]"),
    infoRow("Special Inspector of Record (SIR)", "[OWNER TO IDENTIFY — third-party, NOT the EOR]"),
    infoRow("General Contractor", "[INSERT GC NAME / FL LICENSE #]"),
    infoRow("Risk Category (FBC Table 1604.5)", "[I / II / III / IV]"),
    infoRow("Ultimate Design Wind Speed, Vult (ASCE 7-22)", "[INSERT mph]"),
    infoRow("Wind Exposure Category", "[B / C / D]"),
    infoRow("HVHZ Project? (FBC § 1620)", "[YES — Miami-Dade or Broward / NO]"),
    infoRow("Seismic Design Category", "A (typical, FL)"),
    infoRow("Structural Drawing Set Reference", "[INSERT DRAWING TITLE, SHEETS, REV / DATE]"),
    infoRow("SOSI Document No.", "[FIRM #-YYYY-SOSI-Rev 0]"),
    infoRow("Date Issued / Revision", "[INSERT DATE / REV 0 — ISSUED FOR PERMIT]"),
  ]
});
coverChildren.push(projectTable);

coverChildren.push(new Paragraph({ spacing: { before: 400, after: 80 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "DISCLAIMER (Mandatory — keep on first page of derived documents)", bold: true, size: 20, color: "C00000", font: "Arial" })] }));
coverChildren.push(new Paragraph({ spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({ text: "This template is reference material only. It is not a substitute for independent professional engineering judgment. Each licensee of this template is the sole Engineer of Record for any document they prepare and bears full and exclusive professional responsibility for the technical content, code applicability, and project-specific correctness of any document they sign and seal. The original author of this template disclaims any and all liability arising from any use, modification, or reliance upon this template by any third party. Use of this template does not create a contractual, professional, or agency relationship between the original author and any other party. The original author's seal shall not appear on any document derived from this template. Distributed under Creative Commons Attribution 4.0 International (CC BY 4.0); attribution to the OASIS project is required.", size: 16, italics: true, color: "595959", font: "Arial" })] }));

coverChildren.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- TOC ----------
const tocChildren = [
  H1("Table of Contents"),
  P("1.  Purpose, Authority, and Scope"),
  P("2.  Project Description and Structural System"),
  P("3.  Pre-Modification Container Evaluation and Scope Boundary"),
  P("4.  Definitions and Inspection Frequency Designations"),
  P("5.  Roles and Responsibilities"),
  P("6.  Special Inspector Qualifications"),
  P("7.  Pre-Construction Conference"),
  P("8.  Required Hold Points"),
  P("9.  Schedule of Special Inspections"),
  P("10. Inspection Procedures by Item"),
  P("11. Non-Destructive Testing (NDT) Requirements"),
  P("12. Post-Installed Anchor Special Inspection"),
  P("13. Reporting Protocol and Discrepancy Resolution"),
  P("14. Final Report of Special Inspections"),
  P("15. Referenced Codes and Standards"),
  P("16. Assumptions, Exclusions, and Limitations"),
  P("17. Engineer of Record Statement and Signature"),
  P("Appendix A — Inspector Daily Report (Reference Template)"),
  P("Appendix B — Discrepancy / Non-Conformance Report (Reference Template)"),
  new Paragraph({ children: [new PageBreak()] })
];

// ---------- SECTION 1 ----------
const sec1 = [
  H1("1. Purpose, Authority, and Scope"),
  H2("1.1 Purpose"),
  P("This Statement of Special Inspections (SOSI) identifies the structural special inspections and tests required to verify that the as-built shipping container structural system conforms to the approved construction documents (CDs) and to the applicable provisions of the Florida Building Code, 2023 Edition (FBC), Chapter 17."),
  H2("1.2 Statutory Authority"),
  P("Prepared pursuant to FBC § 107.2.1 (information on construction documents) and § 1704.3 (Statement of Special Inspections). The Owner is required by § 1704.3.1 to engage an Approved Agency to perform the inspections listed herein. Building Official approval of this SOSI is required prior to commencement of the work it governs (§ 1704.2.5)."),
  H2("1.3 Scope"),
  P("Applies to the structural elements of the shipping container structural system, including container modifications, reinforcement of openings, structural steel framing, field welding, bolted connections, container-to-foundation anchorage, and post-installed anchors."),
  H2("1.4 Not a Substitute For"),
  P("This SOSI is not a substitute for the Contractor's Statement of Responsibility (§ 1704.4) or the Final Report of Special Inspections (§ 1704.2.4) required prior to issuance of a Certificate of Occupancy. See § 3 for the separate Pre-Modification Container Evaluation."),
];

// ---------- SECTION 2 ----------
const sec2 = [
  H1("2. Project Description and Structural System"),
  P("[INSERT 1–2 PARAGRAPH NARRATIVE: number, type, and configuration of containers (e.g., 'Two (2) ISO 1AAA 40-ft high-cube and one (1) field-shortened ISO Series 1 high-cube to 16-ft finished length with reconstructed end-frame'), modifications, foundation type, primary lateral system, total enclosed area.]"),
  P("Design assumptions referenced in this SOSI (taken from the approved CDs):"),
  bullet("Containers are new, undamaged ISO Series 1 freight containers in full conformance with ISO 668, ISO 1496-1, ISO 1161, ISO 6346, and CSC certification (verified by the Pre-Modification Evaluation referenced in § 3)."),
  bullet("Corten-equivalent corrugated wall and roof panels are treated as cold-formed sheet steel members for inspection of welding (AWS D1.3) and connection of cold-formed members (AISI S100 / S202)."),
  bullet("Corner castings, corner posts, and bottom/top side rails are treated as structural steel for inspection of welding (AWS D1.1) and high-strength bolting (AISC 360 Ch. N)."),
];

// ---------- SECTION 3 ----------
const sec3 = [
  H1("3. Pre-Modification Container Evaluation and Scope Boundary"),
  P("The construction documents require a shipping container pre-modification structural evaluation before container modification work begins. This evaluation shall be performed and signed/sealed by a Florida-licensed Professional Engineer retained by the Owner or Contractor. At the Owner's election, this evaluation may be performed by the same Florida-licensed Professional Engineer retained as the Special Inspector of Record, provided that engineer is independently qualified to evaluate structural and cold-formed steel members, performs the evaluation under a distinct pre-construction scope, and signs and seals the evaluation letter separately from the special inspection reports. The evaluation shall identify each actual container by CSC data plate / container number and shall document as-delivered condition, visible damage, corrosion, prior modifications, structural frame condition, corner posts, top rails, bottom rails, roof members, floor frame members, side walls, and suitability for the proposed modifications."),
  P("The EOR's preparation of this plan does not include inspection, observation, testing, or acceptance of the actual containers. The Special Inspector's Chapter 17 role is to verify that the accepted evaluation documents correspond to the actual containers and to report discrepancies or observed conditions that conflict with the accepted evaluation. Any container that does not meet the design assumptions or accepted evaluation shall not be modified or installed until reviewed and accepted by the Building Official and, where structural design is affected, the EOR."),
];

// ---------- SECTION 4: Definitions ----------
const sec4 = [
  H1("4. Definitions and Inspection Frequency Designations"),
];
const defsRows = [
  ["Continuous (C)", "Special Inspector physically present in the area where the work is being performed and observing the work at all times the work is in progress (FBC § 202)."],
  ["Periodic (P)", "Special Inspector intermittently present in the area where the work is being performed. Frequency sufficient to verify conformance, including observation of representative samples and the start, middle, and end of each operation (FBC § 202)."],
  ["Approved Agency", "Established and recognized agency, regularly engaged in conducting tests or furnishing inspection services, approved by the Building Official (FBC § 1703.1)."],
  ["CD", "Construction Documents."],
  ["Special Inspector (SI)", "Qualified person employed by an Approved Agency, engaged by the Owner, to perform special inspections (FBC § 1704.2.1)."],
  ["SIR", "Special Inspector of Record — lead Special Inspector / Approved Agency representative responsible for coordinating reports and submitting the Final Report under FBC Chapter 17."],
  ["EOR / RDP", "Engineer of Record / Registered Design Professional in Responsible Charge for the structural design."],
  ["NDT", "Non-Destructive Testing (UT, MT, PT, RT, VT) per the methods referenced in AWS D1.1 / D1.3 and AISC 360 Ch. N."],
  ["MPII", "Manufacturer's Printed Installation Instructions, required by ACI 318 § 17.10 for post-installed anchors."],
];
sec4.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [2400, 7680],
  rows: defsRows.map(([k, v]) => new TableRow({ children: [
    cell(k, { width: 2400, shading: subShade, bold: true }),
    cell(v, { width: 7680 })
  ]}))
}));

// ---------- SECTION 5: Roles ----------
const sec5 = [
  H1("5. Roles and Responsibilities"),

  H2("5.1 Owner (FBC § 1704.3.1)"),
  bullet("Retain the qualified third-party Approved Agency / Special Inspector and any supporting testing agencies."),
  bullet("Submit a notarized Owner's Statement identifying the Special Inspector to the Building Official prior to issuance of the permit."),
  bullet("Retain a Florida-licensed PE — who may be the Special Inspector of Record where qualified — for the Pre-Modification Container Structural Evaluation per § 3."),
  bullet("Retain any separate third-party structural reviewer required by the AHJ."),
  bullet("Ensure all parties have copies of the approved CDs and this SOSI prior to commencement of work."),

  H2("5.2 Engineer of Record (FBC § 1704.2)"),
  bullet("Prepare and seal this SOSI and the structural construction documents."),
  bullet("The EOR is not retained to perform, coordinate, administer, supervise, or close out the special inspection program, and does not perform, direct, or supervise field inspection services, drilling, opening, destructive testing, shoring, temporary support, means and methods, safety, repair, or restoration work."),
  bullet("Copies of special inspection reports may be transmitted to the EOR for project records only; receipt does not constitute review or acceptance of the inspected work. Review of reports, response to non-conformances or RFIs, preparation of corrective details, attendance at site meetings, and final inspection documentation are additional services requiring separate written authorization in advance."),
  bullet("Nothing above limits the EOR's obligations under Chapter 471, F.S., or FAC 61G15-19; if the EOR identifies a condition presenting a risk to public safety, the EOR may notify the Owner, Contractor, and Building Official, without thereby assuming an ongoing duty of report review."),
  bullet("The EOR's services in preparing this plan are performed consistent with the standard of care for structural engineers practicing in Florida at the time and location of performance, and rely upon information furnished by others — including the separate pre-modification container evaluation, geotechnical data where applicable, manufacturer evaluation reports, and contractor-prepared submittals — without independent verification. No warranty, express or implied, is created by this plan, and no third party is intended as a beneficiary of the EOR's services hereunder."),

  H2("5.3 Special Inspector of Record (FBC § 1704.2)"),
  bullet("Perform all inspections enumerated in § 9 at the indicated frequency."),
  bullet("Verify materials, fabricators, installation methods, and workmanship conform to the approved CDs and referenced standards."),
  bullet("Confirm that the accepted pre-modification evaluation letter and container identification records correspond to each actual container before structural modification work proceeds."),
  bullet("Immediately notify the Contractor, EOR, and Building Official upon discovery of any item that does not conform (see § 13)."),
  bullet("Submit reports per § 13 and the Final Report of Special Inspections per § 14."),
  bullet("Attend the Pre-Construction Conference (§ 7)."),

  H2("5.4 Contractor (FBC § 1704.4 — Statement of Responsibility)"),
  bullet("Submit a written Statement of Responsibility to the Building Official and Owner prior to commencement of work."),
  bullet("Keep approved CDs, this SOSI, the accepted pre-modification evaluation letters, shop drawings, product data, and evaluation reports available at the project site and any fabrication location."),
  bullet("Do not cut, weld, reinforce, install, load, or structurally modify any shipping container until the accepted Pre-Modification Evaluation letter for that specific container is on file with the Building Official."),
  bullet("Provide the Special Inspector access, lighting, safe means of approach, and reasonable advance notice (typically 24–48 hours) of operations requiring inspection."),
  bullet("Do not cover or proceed beyond an inspection hold-point without the SI's written acceptance."),

  H2("5.5 Building Official (AHJ)"),
  bullet("Approve this SOSI and the Approved Agencies prior to issuance of the permit."),
  bullet("Receive all special inspection reports."),
  bullet("Receive and accept the Final Report of Special Inspections prior to issuance of a Certificate of Occupancy."),
];

// ---------- SECTION 6: Qualifications ----------
const sec6 = [
  H1("6. Special Inspector Qualifications"),
  P("All special inspections shall be performed by, or under the direct supervision of, individuals meeting the qualifications below. Qualifications shall be submitted to the Building Official prior to the start of work for each discipline."),
];
const qualRows = [
  ["Discipline", "Minimum Qualification", "Standard"],
  ["Structural Steel Welding", "AWS Certified Welding Inspector (CWI) per AWS QC1, or Senior CWI (SCWI). Florida-licensed PE acceptable when acting in responsible charge.", "AWS D1.1 § 6 / 8; AISC 360 § N5.4"],
  ["Cold-Formed Sheet Steel Welding (container shells)", "AWS CWI with documented sheet steel experience, or AWS Certified Welding Inspector — Sheet Metal (CWI-SM) where used.", "AWS D1.3 Clause 6"],
  ["NDT Personnel (UT, MT, PT, RT)", "ASNT Level II minimum (per SNT-TC-1A or CP-189), under technical direction of a Level III.", "AISC 360 § N5.5; AWS D1.1"],
  ["High-Strength Bolting", "Inspector trained in RCSC pre-installation verification, calibrated wrench / DTI / TC bolt verification.", "AISC 360 § N5.6; RCSC § 9"],
  ["Post-Installed Anchors", "ICC-ES ESR-listed installer training credential or equivalent, plus inspector trained in the specific MPII for each anchor system.", "ACI 318-19 § 17.10; FBC § 1705.1.1"],
  ["Cast-in-Place Concrete (foundations, if applicable)", "ACI Concrete Construction Special Inspector (ACI-CCSI) and ACI Concrete Field Testing Technician — Grade I.", "FBC § 1705.3; ACI 318 Ch. 26"],
  ["Soils Special Inspection (if applicable)", "Florida-licensed PE (Geotechnical), or geotechnical technician under PE supervision.", "FBC § 1705.6"],
  ["Lead Special Inspector of Record (SIR)", "Florida-licensed Professional Engineer (P.E.) qualified in the applicable disciplines, distinct from the EOR.", "FBC § 1704.2.1; AHJ requirement"],
];
const qW = [2600, 5080, 2400];
sec6.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: qW,
  rows: qualRows.map((row, i) => new TableRow({ tableHeader: i === 0,
    children: row.map((c, j) => cell(c, {
      width: qW[j], shading: i === 0 ? headerShade : (i % 2 === 0 ? altShade : undefined),
      color: i === 0 ? "FFFFFF" : "000000", bold: i === 0,
      size: i === 0 ? 20 : 18,
    }))
  }))
}));

// ---------- SECTION 7: Pre-Con ----------
const sec7 = [
  H1("7. Pre-Construction Conference"),
  P("Prior to commencement of any work requiring special inspection, a Pre-Construction Conference shall be convened. Required attendees:"),
  bullet("Owner or Owner's representative"),
  bullet("Engineer of Record (EOR)"),
  bullet("Special Inspector of Record (SIR) and lead inspectors from each discipline"),
  bullet("General Contractor's project manager and superintendent"),
  bullet("Steel fabricator / erector representatives"),
  bullet("Container modification subcontractor"),
  bullet("Building Official representative (invited; attendance at AHJ discretion)"),
  P("Agenda: review of this SOSI and approved CDs; identification of inspection hold-points; notification procedures and lead-times; report distribution; format for Discrepancy / Non-Conformance Report; Pre-Modification Container Evaluation status; welding procedure specifications (WPS) and welder qualification records (WPQ); post-installed anchor MPIIs and ESR reports; procedure for resolving conflicts between CDs, field conditions, and as-delivered container condition."),
];

// ---------- SECTION 8: Hold Points ----------
const sec8 = [
  H1("8. Required Hold Points"),
  P("The following hold points shall be included in the Contractor's schedule and shall not be bypassed without written acceptance by the Special Inspector and AHJ where required:"),
  num("AHJ approval of the Owner-retained Special Inspector / Approved Agency before structural work requiring special inspection."),
  num("Accepted Pre-Modification Structural Evaluation letter for each specific shipping container before cutting, welding, reinforcing, or structural modification."),
  num("Container identity and visible condition check before layout/cutting and again if a container is damaged, substituted, or stored in a manner that may affect condition."),
  num("Fit-up inspection of HSS frames, stiffener plates, reinforcement, mateline beams, embedded plates, and bolted connection components before final welding, bolting, concealment, or coating that obstructs inspection."),
  num("Special inspection of structural field welding at the frequency specified in Schedule Item A5."),
  num("Foundation, embedded item, anchor bolt, and container-to-foundation connection inspection before concrete placement, before loading, and before concealment."),
  num("Post-installed adhesive or mechanical anchor inspection during installation and before loading or concealment."),
  num("Wind load path component inspection before covering or concealment, including shear wall, diaphragm, hold-down, roof/deck, and collector/drag connection components where required."),
  num("Final Report of Special Inspections accepted before permit closeout or final structural acceptance, as required by the AHJ."),
];

// ---------- SECTION 9: Schedule ----------
const sec9Intro = [
  H1("9. Schedule of Special Inspections"),
  P("Master schedule of structural special inspections. Where the approved drawings, manufacturer instructions, approved evaluation reports, or AHJ requirements are more stringent, the more stringent requirement governs."),
  P("Frequency: C = Continuous; P = Periodic.", { italics: true }),
];

const schedHeader = ["#", "Inspection Item", "Reference", "Timing / Frequency", "Minimum Verification and Records"];
const W = [520, 2800, 1640, 2360, 2760]; // sum = 10080

const schedRows = [
  ["A", "SHIPPING CONTAINER AND STRUCTURAL STEEL SPECIAL INSPECTIONS", "", "", ""],
  ["A1", "Pre-modification container documentation and condition prerequisite",
    "FBC § 107.2.1, FBC Ch. 17; approved CDs; ISO/CSC assumptions",
    "Before any cutting, welding, reinforcing, installation, or structural modification",
    "Verify each container has an accepted PE evaluation letter identifying the CSC data plate/container number; confirm container ID on site matches the accepted letter; review as-delivered photo record; visually check for obvious damage, corrosion, distortion, prior modifications, missing components, or conditions inconsistent with the accepted letter. This plan does not perform or include the pre-modification suitability evaluation."],
  ["A2", "Container cutting, opening layout, and protection of primary container members",
    "FBC Ch. 17; approved structural drawings",
    "Periodic hold-point inspection before cutting and before concealment",
    "Verify proposed cuts and opening limits match the approved drawings; verify no unapproved cutting of corner posts, top rails, bottom rails, roof/floor frame members, or other load path members."],
  ["A3", "Reinforcement around openings and modified members",
    "FBC Ch. 17; AISC 360; AISI S100 where applicable",
    "Periodic before final welding/bolting and before concealment",
    "Verify HSS sizes, wall thicknesses, stiffener plates, mateline beams, headers, jamb columns, sill angles, bearing/fit-up, continuity, and connection configuration match the approved details."],
  ["A4", "Structural steel framing, HSS frames, columns, beams, plates, and steel attachments",
    "FBC Ch. 17; AISC 360",
    "Periodic during erection and before concealment",
    "Verify member sizes, grades where available, locations, orientation, bearing, alignment, connection plates/clips, fastener quantity/type, and conformance with approved structural details."],
  ["A5", "Field welding of container modifications and structural steel connections",
    "FBC Ch. 17; AISC 360 Ch. N; AWS D1.1; AWS D1.3 where applicable",
    "Continuous QA per AISC 360 Table N5.4-2 for CJP groove welds, PJP groove welds, multipass fillet welds, and single-pass fillets > 5/16″. Periodic QA permitted for single-pass fillets ≤ 5/16″ and tack welds left in place per the same table.",
    "Before welding: verify welder qualifications, WPS availability, base metal condition, joint preparation, fit-up, backing/access, and environmental conditions. During/after welding: verify weld size, length, location, continuity, cleaning, profile, visible discontinuities, repair of rejected welds, corrosion protection after acceptance. CJP welds shall receive NDT in accordance with AISC 360 Table N5.4-2 (UT or RT) at the frequency required by that table; frequency increased on cyclically-loaded members or specific welds where indicated on approved drawings or by EOR."],
  ["A6", "Bolted, through-bolted, and high-strength bolted structural connections",
    "FBC Ch. 17; AISC 360; RCSC Specification",
    "Periodic during installation and before concealment; Continuous during pretensioning of pretensioned/slip-critical joints",
    "Verify bolt type, diameter, grade, washer/nut configuration, hole condition, edge distance, spacing, snug-tight or pretension requirements, DTI/calibrated wrench/TC records where applicable, installation per approved details."],
  ["A7", "Off-site shop fabrication or pre-installation container modification",
    "FBC Ch. 17 fabricated item provisions; AISC 360",
    "Inspection at fabrication location unless performed by an approved fabricator with accepted QC documentation",
    "If container cutting, reinforcement, welding, or structural fabrication occurs off site, provide SI access or approved fabricator documentation. Submit shop/fabricator certificates, welding records, material records, and inspection reports before delivery/installation."],

  ["B", "ANCHORAGE, FOUNDATION, WIND LOAD PATH", "", "", ""],
  ["B1", "Container-to-foundation anchorage, embedded plates, anchor bolts, corner-casting/plate connections",
    "FBC Ch. 17; approved CDs; AISC 360",
    "Before concrete placement, during welding/bolting, and before concealment/loading",
    "Verify pier/footing layout, plate size/thickness, anchor type/diameter/grade, embedment, projection, spacing, edge distance, nut/washer configuration, welds/bolts to corner castings or rails, and final load path continuity."],
  ["B2", "Post-installed adhesive or mechanical anchors",
    "FBC Ch. 17; ACI 318-19 § 17.10; current ICC-ES ESR; MPII",
    "Continuous for adhesive anchors installed horizontally or upwardly-inclined and resisting sustained tension (ACI 318 § 17.10.2). Periodic for all other post-installed anchors per ESR and MPII.",
    "Verify anchor product, diameter, embedment, spacing, edge distance, substrate, drilled hole diameter/depth, cleaning method (brush/blow cycles), adhesive lot and expiration, gel/cure time within ambient temperature range, installation torque per MPII, installer qualifications where required, and proof loading where required."],
  ["B3", "Cast-in-place concrete piers/footings, reinforcing steel, embedded items supporting container loads",
    "FBC Ch. 17; ACI 318",
    "Periodic before concrete placement; Continuous during sampling and placement where required",
    "Verify excavation/bearing, pier/footing size and location, reinforcing size/quantity/spacing/laps/cover, embedded anchors and plates, mix info, placement, consolidation, curing, sampling and testing."],
  ["B4", "Soils, bearing, fill, and compaction supporting structural foundations",
    "FBC § 1705.6; approved CDs; geotechnical report",
    "Where required by approved documents, geotechnical recommendations, or AHJ",
    "Verify bearing consistent with design assumptions, unsuitable material removed, required fill placed and compacted as specified, drainage/grade preparation."],
  ["B5", "Wind-force-resisting system (FBC § 1705.11) — required where Vult ≥ 130 mph or HVHZ",
    "FBC § 1705.11; ASCE 7-22; approved CDs",
    "Periodic before covering/concealment",
    "Verify components designated in the CDs as part of the MWFRS — shear wall, diaphragm, hold-downs, collectors, drag connections, container-to-container connections of the LFRS — for conformance to approved CDs and manufacturer instructions."],
  ["B6", "Cold-formed steel, sheet steel shear elements, self-drilling screws, and light-gauge components",
    "FBC Ch. 17; AISI S100; AWS D1.3",
    "Periodic for mechanical fastening and bracing; welding per Item A5",
    "Verify member designation/thickness, screw type/diameter/spacing, edge distances, connection pattern, bracing, bearing, conformance with approved details."],
  ["B7", "Proprietary hangers, connectors, product approvals, and structural hardware",
    "Approved product data; ICC-ES / Florida Product Approval; MPII",
    "Periodic before concealment where part of the structural load path",
    "Verify product model, coating, fastener type/size/quantity, required fillers/blocking, orientation, substrate, substitution approval. Unapproved substitutions submitted to EOR/AHJ before installation."],

  ["C", "REPORTING, DEFICIENCIES, CLOSEOUT", "", "", ""],
  ["C1", "Routine inspection reports",
    "FBC Ch. 17; AHJ procedures",
    "After each site or fabrication inspection",
    "Report inspected work, drawing/detail references, inspection frequency, observed compliance, deficiencies, corrective actions, photographs, and whether work is accepted for continuation."],
  ["C2", "Deficiency notices and corrective work",
    "FBC Ch. 17; approved CDs; AHJ procedures",
    "Immediate notice for structural discrepancies; reinspect after correction",
    "Identify nonconforming work, notify required parties, require correction before continuation/concealment, document final disposition. Corrective work affecting design intent submitted to EOR/AHJ for acceptance."],
  ["C3", "Final Special Inspection Compliance Report",
    "FBC § 1704.2.4; AHJ procedures",
    "At completion of work requiring special inspection and before permit closeout",
    "Submit final signed report summarizing inspections performed, unresolved items, accepted corrective actions, referenced test/NDT reports, and statement that inspected work is complete and in conformance with the approved construction documents, subject to stated limitations."],
];

const schedTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: W,
  rows: [
    new TableRow({ tableHeader: true, children: schedHeader.map((h, i) =>
      cell(h, { width: W[i], shading: headerShade, color: "FFFFFF", bold: true, size: 18, alignment: AlignmentType.CENTER })
    )}),
    ...schedRows.map(row => {
      const isGroup = row[2] === "" && row[3] === "" && row[4] === "";
      if (isGroup) {
        return new TableRow({ children: [
          cell(row[0], { width: W[0], shading: subShade, bold: true, size: 18 }),
          new TableCell({
            borders: cellBorders, columnSpan: 4,
            width: { size: W[1] + W[2] + W[3] + W[4], type: WidthType.DXA },
            shading: subShade,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: row[1], bold: true, size: 20, color: "1F3864", font: "Arial" })] })]
          })
        ]});
      }
      return new TableRow({ children: row.map((c, i) =>
        cell(c, { width: W[i], size: 16, alignment: i === 0 ? AlignmentType.CENTER : undefined })
      )});
    })
  ]
});

// ---------- SECTION 10: Inspection Procedures ----------
const sec10 = [
  H1("10. Inspection Procedures by Item"),
  P("The following sub-sections expand the master schedule and define inspection method, acceptance criteria, hold-points, and documentation for each item. The Special Inspector shall reject and require correction of any work not meeting the criteria below or the approved CDs."),

  H2("10.1 Pre-Modification Container Verification (Item A1)"),
  P("Prior to the start of any cutting or welding on a container, the SIR shall verify that the separate PE-sealed Pre-Modification Container Structural Evaluation letter is on file with the AHJ for each container by serial number (ISO 6346). Cutting shall not commence on any container for which this letter has not been accepted by the Building Official. Hold-point."),

  H2("10.2 Container Structural Modifications (Items A2–A4)"),
  bullet("Method: Visual inspection (VT per AWS D1.1 Clause 8.9) supplemented by tape/laser measurement of opening dimensions, location, and squareness."),
  bullet("Hold-points: (i) prior to first cut on each container; (ii) after rough cutting and before installation of reinforcement; (iii) after installation of reinforcement and before any architectural cladding or insulation."),
  bullet("Acceptance: Locations and sizes within tolerance of approved CDs (±1/4 in. or as noted). No cuts beyond those shown. Reinforcement members, plate sizes, weld sizes, and orientations match CDs."),

  H2("10.3 Structural Steel Welding (Item A5)"),
  bullet("Method: VT of 100% of welds; NDT per § 11 for CJP and as required by CDs."),
  bullet("Hold-points: (i) WPS / WPQ review prior to first weld; (ii) fit-up inspection prior to root pass for groove welds in tension; (iii) NDT prior to coating or concealment."),
  bullet("Acceptance: AWS D1.1 Clause 8 (statically loaded) or Clause 9 (cyclically loaded) as governed by design loading. Reject undercut > 1/32 in., crater cracks, lack of fusion, slag inclusions exceeding allowable, welds smaller than CD-required size."),

  H2("10.4 Cold-Formed Sheet Steel Welding (Item A5, sheet steel)"),
  bullet("Method: VT of 100% of welds per AWS D1.3 Clause 6. Attention to burn-through, penetration into supporting member, and effective throat for arc-spot welds."),
  bullet("Acceptance: AWS D1.3 Clause 6; weld sizes and effective throats per AISI S100 § E2."),

  H2("10.5 High-Strength Bolting (Item A6)"),
  bullet("Method: Pre-installation verification per RCSC § 9 in calibrated Skidmore-Wilhelm or equivalent."),
  bullet("Hold-points: PIV at start of each shift and whenever lot, diameter, length, grade, or installation crew changes."),
  bullet("Acceptance: RCSC § 8 for the specified pretensioning method. Faying surfaces clean and free of mill scale, paint (unless qualified slip-critical coating), oil, dirt."),

  H2("10.6 Anchorage and Foundation (Items B1, B3)"),
  bullet("Method: Survey of anchor rod layout prior to concrete placement; visual and dimensional verification of weld plates; VT and NDT of field welds; verification of hold-down bolt grade and torque/pretension."),
  bullet("Hold-points: (i) prior to concrete placement around cast-in-place anchors; (ii) prior to setting first container on foundation; (iii) prior to concealment of any uplift hardware."),
  bullet("Acceptance: Anchor rod layout within AISC Code of Standard Practice § 7.5 tolerances."),

  H2("10.7 Post-Installed Anchors (Item B2) — see § 12"),
];

// ---------- SECTION 11: NDT ----------
const sec11 = [
  H1("11. Non-Destructive Testing (NDT) Requirements"),
  H2("11.1 Required NDT Methods"),
  bullet("CJP groove welds in tension or reversal — UT per AWS D1.1 Clause 8.13 or RT per Clause 8.12. Acceptance per AWS D1.1 Table 8.2 (statically loaded) or 8.3 (cyclically loaded)."),
  bullet("CJP welds in compression — UT per AWS D1.1 at the frequency in the CDs (typically 10% if not otherwise stated)."),
  bullet("Fillet welds in tension at critical members — MT per AWS D1.1 Clause 8.10 or PT Clause 8.11, where designated in the CDs."),
  H2("11.2 NDT Frequency"),
  P("Unless the CDs require a higher frequency, NDT of CJP groove welds shall be 100% for statically loaded structures, and 100% of tension/reversal welds plus 25% sampling of compression welds for cyclically loaded structures, consistent with AISC 360 Table N5.4-2."),
  H2("11.3 Re-Inspection of Rejected Welds"),
  P("Welds rejected by NDT shall be repaired per a qualified Weld Repair Procedure and re-inspected by the same NDT method. If two repairs fail on the same weld, the EOR shall be notified for evaluation prior to a third repair attempt."),
];

// ---------- SECTION 12: PIA ----------
const sec12 = [
  H1("12. Post-Installed Anchor Special Inspection"),
  P("Per ACI 318-19 § 17.10, current ICC-ES Evaluation Service Report (ESR), and the manufacturer's printed installation instructions (MPII)."),
  H2("12.1 Items to Verify"),
  bullet("Substrate material, condition, and compressive strength meet ESR assumptions."),
  bullet("Drill bit diameter and type per MPII."),
  bullet("Hole depth, including any over-drill, per ESR."),
  bullet("Hole cleaning — number of brush/blow cycles per MPII; tools used; substrate moisture condition."),
  bullet("Anchor type, diameter, length, embedment per CDs and ESR."),
  bullet("Adhesive lot number, expiration date, mixing/dispensing equipment, ambient temperature within ESR range."),
  bullet("Curing/working time observed prior to applying load or torque."),
  bullet("Installation torque or set indicator (mechanical) within ESR range."),
  H2("12.2 Adhesive Anchor Continuous QA"),
  P("Per ACI 318 § 17.10.2, Continuous inspection is required during installation of adhesive anchors in a horizontal or upwardly-inclined orientation resisting sustained tension. This is a code-mandated frequency, not subject to the discretion of the SOSI or the CDs."),
  H2("12.3 Installer Qualification"),
  P("Installers of adhesive anchors in horizontal or upwardly-inclined orientations resisting sustained tension shall be certified per ACI/CRSI Adhesive Anchor Installer Certification."),
  H2("12.4 Proof Loading"),
  P("Where required by CDs, ESR, or AHJ, anchors shall be tested per ASTM E488 to the specified proof load. The SI shall witness the test and record date, anchor location, applied load, displacement, and result."),
];

// ---------- SECTION 13: Reporting ----------
const sec13 = [
  H1("13. Reporting Protocol and Discrepancy Resolution"),
  H2("13.1 Daily Reports"),
  bullet("A Special Inspection Daily Report shall be prepared for each day on which inspections are performed. See Appendix A."),
  bullet("Each report: project name and permit number; date; weather; SI name and credential numbers; trades present; CD references inspected; results (Accepted / Rejected / Held); photographs; RFIs or non-conformances."),
  bullet("Distribute to Building Official, Owner, EOR, and General Contractor within five (5) business days of inspection date."),
  H2("13.2 Non-Conformance / Discrepancy Notice"),
  P("Upon identification of any work that does not conform to the approved CDs or this SOSI, the SI shall:"),
  num("Immediately notify the Contractor in writing (Discrepancy / Non-Conformance Report — Appendix B)."),
  num("Within twenty-four (24) hours, notify the EOR and Building Official in writing."),
  num("Identify whether the work shall be (a) corrected, (b) accepted with a CCD/ASI from the EOR, or (c) reviewed for redesign."),
  num("Verify corrective action upon completion and document in Daily Report and Non-Conformance Closure Notice."),
  bullet("Work shall not be concealed and subsequent operations shall not proceed past an open non-conformance without written acceptance from the SIR (and EOR where structural)."),
];

// ---------- SECTION 14: Final ----------
const sec14 = [
  H1("14. Final Report of Special Inspections"),
  P("Prior to issuance of a Certificate of Occupancy or Certificate of Completion, the SIR shall submit a Final Report to the Building Official with copies to Owner and EOR (FBC § 1704.2.4). The Final Report shall:"),
  num("State that all required special inspections and tests were performed."),
  num("State that, to the best of the SIR's knowledge, the inspected work is complete and in conformance with the approved CDs and the applicable workmanship provisions of the referenced standards."),
  num("List discrepancies identified, corrective actions taken, and date each was resolved."),
  num("Identify any unresolved items with explanation."),
  num("Bear the SIR's seal and signature (Florida-licensed PE)."),
];

// ---------- SECTION 15: Standards ----------
const sec15 = [
  H1("15. Referenced Codes and Standards"),
  P("Where editions of referenced standards are not stated, the edition adopted by the FBC 2023 (see FBC Chapter 35) shall govern."),
];
const stdRows = [
  ["FBC 2023", "Florida Building Code, Building, 2023 Edition — Chapter 17, Chapter 16, § 1620 (HVHZ)"],
  ["IBC 2021", "International Building Code, 2021 Edition (as adopted by FBC 2023)"],
  ["ASCE 7-22", "Minimum Design Loads and Associated Criteria for Buildings and Other Structures"],
  ["AISC 360", "Specification for Structural Steel Buildings — Chapter N (Quality Control and Quality Assurance) — verify FBC-adopted edition (typically 360-16)"],
  ["AISC Code of Standard Practice", "Erection tolerances (§ 7.5)"],
  ["AISI S100", "North American Specification for the Design of Cold-Formed Steel Structural Members"],
  ["AISI S202", "Code of Standard Practice for Cold-Formed Steel Structural Framing"],
  ["AWS D1.1", "Structural Welding Code — Steel — verify FBC-adopted edition"],
  ["AWS D1.3", "Structural Welding Code — Sheet Steel"],
  ["AWS QC1", "Standard for AWS Certification of Welding Inspectors"],
  ["ACI 318-19", "Building Code Requirements for Structural Concrete — Ch. 17 (Anchoring to Concrete), Ch. 26"],
  ["RCSC 2020", "Specification for Structural Joints Using High-Strength Bolts"],
  ["ASNT SNT-TC-1A / CP-189", "Personnel Qualification and Certification in Nondestructive Testing"],
  ["ASTM E488 / C31 / C39 / C172 / D6938 / D1557", "Anchor testing; concrete sampling/casting/strength; soil density/compaction"],
  ["ISO 668, 1496-1, 1161, 6346", "Series 1 freight container classification, specification, corner fittings, marking — design assumptions; verification by separate Pre-Modification Evaluation"],
  ["CSC 1972 (as amended)", "International Convention for Safe Containers"],
];
sec15.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [3200, 6880],
  rows: stdRows.map((r, i) => new TableRow({ children: [
    cell(r[0], { width: 3200, shading: i % 2 === 0 ? altShade : undefined, bold: true, size: 18 }),
    cell(r[1], { width: 6880, shading: i % 2 === 0 ? altShade : undefined, size: 18 })
  ]}))
}));

// ---------- SECTION 16: Exclusions ----------
const sec16 = [
  H1("16. Assumptions, Exclusions, and Limitations"),
  H2("16.1 Assumptions"),
  bullet("This SOSI is based on the structural drawings under permit review identified on the cover sheet."),
  bullet("Design changes, field substitutions, container substitutions, unanticipated damage, or AHJ comments outside the current scope may require revision under separate change order."),
  bullet("Structural design assumes new, undamaged ISO Series 1 freight containers in full conformance with ISO 668, ISO 1496-1, ISO 1161, ISO 6346, and CSC certification."),
  bullet("The EOR has not inspected, observed, or evaluated the actual containers as part of this plan. Verification of container identity, condition, and suitability is the responsibility of others (see § 3)."),

  H2("16.2 Excluded From This Document"),
  bullet("Third-party structural engineer review or approval of this SOSI — to be retained by Owner if required by AHJ."),
  bullet("Field special inspection services, site visits, or inspection reports — provided by the SIR retained by Owner."),
  bullet("Notarized Owner's Statement identifying the SI — to be prepared and submitted by Owner."),
  bullet("Threshold building inspector services under FBC § 110.7 / FS 553.79, if applicable."),
  bullet("Construction means, methods, sequencing, temporary shoring, safety, or contractor compliance."),
  bullet("Structural redesign, additional calculations, or revisions beyond current permit scope."),
  bullet("Shipping Container Pre-Modification Structural Evaluation — see § 3."),
];

// ---------- SECTION 17: Signatures ----------
const sigLine = (label) => new Paragraph({ spacing: { after: 60 }, children: [
  new TextRun({ text: label, size: 22, font: "Arial" }),
  new TextRun({ text: "________________________________________________", size: 22, font: "Arial" })
]});

const sec17 = [
  H1("17. Engineer of Record Statement and Signature"),
  P("I, [INSERT EOR NAME], P.E., Florida P.E. License No. [INSERT], affirm that this Statement of Special Inspections has been prepared by me or under my direct supervision in accordance with the Florida Building Code 2023 § 107.2.1 and Chapter 17, and is intended to be coordinated with the approved structural construction documents for the project identified on the cover sheet."),
  P("[EOR SEAL TO BE AFFIXED HERE — Florida PE seal and signature per FAC 61G15-23]", { italics: true, color: "595959" }),
  sigLine("Name:  "),
  sigLine("Title:  "),
  sigLine("FL P.E. License No.:  "),
  new Paragraph({ spacing: { after: 60 }, children: [
    new TextRun({ text: "Signature:  ", size: 22, font: "Arial" }),
    new TextRun({ text: "________________________________________  ", size: 22, font: "Arial" }),
    new TextRun({ text: "Date:  ", size: 22, font: "Arial" }),
    new TextRun({ text: "______________", size: 22, font: "Arial" })
  ]}),
];

// ---------- APPENDICES ----------
const appA = [
  new Paragraph({ children: [new PageBreak()] }),
  H1("Appendix A — Special Inspector Daily Report (Reference Template)"),
  P("Template only; the SIR may use any equivalent form capturing the required information."),
];
const dailyRows = [
  ["Field", "Entry"],
  ["Project / Permit No.", ""],
  ["Date / Weather", ""],
  ["Special Inspector / Credential No.", ""],
  ["Trades on site", ""],
  ["CD reference (sheet / detail) inspected", ""],
  ["Item from SOSI § 9", ""],
  ["Method (VT / UT / MT / PT / Survey / etc.)", ""],
  ["Result (Accepted / Rejected / Held for Re-inspection)", ""],
  ["Photographs attached (Y/N)", ""],
  ["Discrepancies — DNCR No. issued?", ""],
  ["Signature", ""],
];
appA.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [4040, 6040],
  rows: dailyRows.map((r, i) => new TableRow({ children: [
    cell(r[0], { width: 4040, shading: i === 0 ? headerShade : subShade, color: i === 0 ? "FFFFFF" : "000000", bold: true }),
    cell(r[1], { width: 6040 })
  ]}))
}));

const appB = [
  new Paragraph({ children: [new PageBreak()] }),
  H1("Appendix B — Discrepancy / Non-Conformance Report (Reference Template)"),
];
const dncrRows = [
  ["DNCR No.", ""],
  ["Date Identified", ""],
  ["Project / Permit No.", ""],
  ["Location (sheet, detail, gridline)", ""],
  ["SOSI Item Reference (§ 9)", ""],
  ["Description of Non-Conformance", ""],
  ["Referenced CD / Standard Requirement", ""],
  ["Proposed Corrective Action", ""],
  ["Responsible Party", ""],
  ["EOR Disposition (Correct / CCD-Accept / Redesign)", ""],
  ["Date Corrected and Verified", ""],
  ["SIR Closure Signature / Date", ""],
];
appB.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [4040, 6040],
  rows: dncrRows.map((r, i) => new TableRow({ children: [
    cell(r[0], { width: 4040, shading: subShade, bold: true }),
    cell(r[1], { width: 6040 })
  ]}))
}));

// ---------- ASSEMBLE ----------
const doc = new Document({
  creator: "OASIS Project",
  title: "OASIS — Statement of Special Inspections — Shipping Container Structural System (Template)",
  description: "Open Accepted Special Inspections for Shipping containers. FBC 2023 Ch. 17 reference template. CC BY 4.0.",
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: "1F3864" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "1F3864" },
        paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: "2E5496" },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 270 } } } },
      ] },
      { reference: "numbers", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
      ] },
    ]
  },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: PAGE_H },
      margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
    headers: {
      default: new Header({ children: [new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
        children: [
          new TextRun({ text: "OASIS — Statement of Special Inspections (Template)", size: 18, color: "595959", font: "Arial" }),
          new TextRun({ text: "\t[Project Name] / [Permit #]", size: 18, color: "595959", font: "Arial" }),
        ]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
        children: [
          new TextRun({ text: "OASIS Project — github.com/[OWNER]/oasis-container-sosi — CC BY 4.0", size: 16, color: "595959", font: "Arial" }),
          new TextRun({ text: "\tPage ", size: 16, color: "595959", font: "Arial" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "595959", font: "Arial" }),
          new TextRun({ text: " of ", size: 16, color: "595959", font: "Arial" }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: "595959", font: "Arial" }),
        ]
      })] })
    },
    children: [
      ...coverChildren,
      ...tocChildren,
      ...sec1, ...sec2, ...sec3, ...sec4, ...sec5, ...sec6, ...sec7, ...sec8,
      ...sec9Intro, schedTable,
      ...sec10, ...sec11, ...sec12, ...sec13, ...sec14, ...sec15, ...sec16, ...sec17,
      ...appA, ...appB,
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const out = process.argv[2] || "OASIS_SOSI_Template.docx";
  fs.writeFileSync(out, buffer);
  console.log("Wrote:", out);
});
