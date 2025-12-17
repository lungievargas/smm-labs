// ServiceDetail.jsx
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { services } from "../App";
import { FlaskConical, Pickaxe, Leaf, Microscope } from "lucide-react";
import logoSMM from "../assets/logoSMM.jpg";
import { jsPDF } from "jspdf";

// ======================
// ORIGINAL WRITE UPS (MERGED)
// ======================
const writeUps = {
  "Water Quality Testing": `
Water quality testing is essential for ensuring that drinking, industrial, and wastewater meet
health and safety standards. At SMM Laboratories, we follow a structured procedure to give
clients reliable and compliant results.

1. **Sample Collection**  
   Clients may bring samples or request on-site sampling. We collect water in sterilized
   containers to avoid contamination.

2. **Physical Analysis**  
   We assess colour, odour, turbidity, pH, and conductivity to determine the basic water profile.

3. **Chemical Analysis**  
   Tests include nitrates, fluoride, hardness, heavy metals, and other chemical parameters,
   depending on the client’s needs and Botswana regulatory standards.

4. **Microbiological Screening**  
   We test for harmful organisms such as E.coli, coliforms, and pathogens using proven
   microbiological techniques.

5. **Report Generation**  
   All results are compiled into a certified laboratory report with recommendations for treatment
   or corrective action when necessary.
`,

  "Mineral & Geochemical Testing": `
Our mineral and geochemical testing services support exploration, mining operations, and soil
characterisation.

1. **Sample Preparation**  
   Samples are dried, crushed, milled, and homogenized to ensure consistency.

2. **Geochemical Profiling**  
   Techniques such as XRF and ICP are used to identify elemental composition.

3. **Mineral Identification**  
   We analyze mineral structures and chemical behaviour to classify ore grade and purity.

4. **Baseline Studies**  
   Ideal for mining feasibility and environmental compliance.

5. **Reporting**  
   Results include mineral content, concentration levels, and expert interpretation.
`,

  "Agricultural Testing": `
Agricultural testing helps farmers improve soil fertility, plant health, and crop productivity.

1. **Soil Testing**  
   We assess nutrient content, pH, organic matter, trace metals, and contamination.

2. **Fertilizer Analysis**  
   We verify NPK levels and quality standards for compliance and performance.

3. **Plant Tissue Analysis**  
   Helps diagnose nutrient deficiencies, toxicity, and diseases.

4. **Recommendations**  
   Reports include fertilization plans and corrective actions tailored to crop type.
`,

  "Microbiological Analysis": `
Our microbiological laboratory identifies harmful organisms in water, food, and environmental
samples.

1. **Sample Collection**  
   Sterile containers and controlled handling are used for accurate detection.

2. **Culture-Based Testing**  
   We isolate and grow organisms such as E.coli, Salmonella, and coliforms.

3. **Pathogen Identification**  
   Advanced microscopes and biochemical tests confirm the presence of harmful microbes.

4. **Safety Compliance**  
   Testing helps industries meet health regulations and prevent contamination outbreaks.
`,
};

// ======================
// TECHNICAL PDF STRUCTURES
// ======================
const detailData = {
  "Water Quality Testing": {
    icon: <FlaskConical size={36} />,
    testCategories: [
      "Physical: Colour, Odour, Turbidity, pH, Conductivity",
      "Chemical: Nitrates, Fluoride, Hardness, Heavy metals (Pb, Cd, As, Hg)",
      "Other: Total Dissolved Solids (TDS), Alkalinity",
    ],
    sampleRequirements:
      "Collect 500ml in a clean, sterilized bottle. Keep sample cooled and deliver within 24 hours. Label with site, date & time.",
    methodsUsed:
      "pH meter, Spectrophotometry, ICP-OES for metals, Turbidimeter, Titration methods for hardness.",
    complianceStandards: "WHO Guidelines, BOS national potable water standards, ISO/IEC 17025.",
  },

  "Mineral & Geochemical Testing": {
    icon: <Pickaxe size={36} />,
    testCategories: [
      "Elemental analysis: Major & trace element profiling",
      "Mineral identification: XRD, Petrographic microscopy",
      "Geochemical baseline studies",
    ],
    sampleRequirements:
      "Rock/soil samples: 1–2 kg, dry and sealed. Drill core: label intervals and preserve orientation.",
    methodsUsed: "XRF, ICP-MS/OES, XRD, and sample fusion techniques.",
    complianceStandards: "Industry QA/QC procedures, ISO methods.",
  },

  "Agricultural Testing": {
    icon: <Leaf size={36} />,
    testCategories: [
      "Soil nutrient analysis (N, P, K)",
      "Organic matter, pH, CEC, heavy metals",
      "Plant tissue & fertilizer quality analysis",
    ],
    sampleRequirements:
      "Soil: 500g composite sample from 10–15 field points. Plant tissue: newest mature leaf.",
    methodsUsed:
      "Colorimetric assays, Atomic Absorption (AAS), Kjeldahl nitrogen method.",
    complianceStandards: "Agronomic guidelines, ISO methods.",
  },

  "Microbiological Analysis": {
    icon: <Microscope size={36} />,
    testCategories: [
      "Indicator organisms: Total coliforms, E. coli",
      "Pathogen testing: Salmonella, Shigella",
      "Surface hygiene & food safety testing",
    ],
    sampleRequirements:
      "Collect samples in sterile containers, maintain cold chain, deliver within holding times.",
    methodsUsed:
      "Culture-based methods, membrane filtration, biochemical identification.",
    complianceStandards: "WHO microbiological limits, BOS & Public Health standards.",
  },
};

// ======================
// COMPONENT MERGED
// ======================
const ServiceDetail = () => {
  const { title } = useParams();
  const service = services.find((s) => s.title === title);

  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const lastDocRef = useRef(null);

  if (!service) return <h2 className="text-center mt-5">Service Not Found</h2>;

  const details = detailData[service.title] || {};

  // ======================
  // PDF GENERATOR
  // ======================
  const generatePdf = (forPreview = true) => {
    const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;

    try {
      doc.addImage(logoSMM, "JPEG", pageWidth - 150, 20, 100, 40);
    } catch {}

    doc.setFontSize(18);
    doc.text("SMM Laboratories", 40, y);
    y += 28;

    doc.setFontSize(14);
    doc.text(`${service.title} — Technical Laboratory Report`, 40, y);
    y += 24;

    doc.line(40, y, pageWidth - 40, y);
    y += 20;

    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 40, y);
    y += 20;

    doc.text("Client Details:", 40, y); y += 16;
    doc.text("Name: ____________________________", 40, y); y += 14;
    doc.text("Contact: __________________________", 40, y); y += 14;
    doc.text("Sample ID: ________________________", 40, y); y += 22;

    const introLines = doc.splitTextToSize(service.description, pageWidth - 80);
    doc.text(introLines, 40, y);
    y += introLines.length * 14;

    // New Page
    doc.addPage();
    y = 50;

    doc.setFontSize(13);
    doc.text("1. Test Categories", 40, y);
    y += 18;

    doc.setFontSize(10);
    details.testCategories?.forEach((t) => {
      const lines = doc.splitTextToSize("• " + t, pageWidth - 80);
      doc.text(lines, 50, y);
      y += lines.length * 12 + 6;
    });

    y += 10;
    doc.setFontSize(13);
    doc.text("2. Sample Requirements", 40, y);
    y += 18;

    doc.setFontSize(10);
    const sLines = doc.splitTextToSize(details.sampleRequirements, pageWidth - 80);
    doc.text(sLines, 50, y);
    y += sLines.length * 12 + 12;

    doc.setFontSize(13);
    doc.text("3. Methods Used", 40, y);
    y += 18;

    doc.setFontSize(10);
    const mLines = doc.splitTextToSize(details.methodsUsed, pageWidth - 80);
    doc.text(mLines, 50, y);
    y += mLines.length * 12 + 12;

    doc.setFontSize(13);
    doc.text("4. Compliance Standards", 40, y);
    y += 18;

    doc.setFontSize(10);
    const cLines = doc.splitTextToSize(details.complianceStandards, pageWidth - 80);
    doc.text(cLines, 50, y);

    // Footer + Sig
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const ph = doc.internal.pageSize.getHeight();
      doc.setFontSize(9);

      doc.text("© SMM Laboratories", 40, ph - 30);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 100, ph - 30);
    }

    lastDocRef.current = doc;

    if (forPreview) {
      const blobUrl = doc.output("bloburl");
      setPdfUrl(blobUrl);
      setShowModal(true);
    } else {
      doc.save(`${service.title.replace(/\s+/g, "_")}_Technical_Report.pdf`);
    }
  };

  const handleDownload = () => {
    if (lastDocRef.current) {
      lastDocRef.current.save(`${service.title.replace(/\s+/g, "_")}_Technical_Report.pdf`);
    } else {
      generatePdf(false);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">{service.title}</h2>

      <img
        src={service.image}
        alt={service.title}
        className="img-fluid rounded shadow mb-4"
        style={{ height: "350px", width: "100%", objectFit: "cover" }}
      />

      <p className="lead text-muted text-center mb-4">
        {service.description}
      </p>

      {/* Cards */}
      <div className="row gx-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 p-3">
            <div className="d-flex align-items-center gap-3 mb-2">
              <div style={{ color: "#2f7d32" }}>{details.icon}</div>
              <h5 className="mb-0">Overview</h5>
            </div>
            <p style={{ whiteSpace: "pre-line", fontSize: "0.95rem" }}>
              {service.description}
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 p-3">
            <h5>Key Tests</h5>
            <ul>
              {details.testCategories?.map((t, i) => (
                <li key={i} style={{ fontSize: "0.95rem" }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 p-3">
            <h5>Sample & Methods</h5>
            <p style={{ fontSize: "0.95rem" }}>{details.sampleRequirements}</p>
            <small className="text-muted">{details.methodsUsed}</small>
          </div>
        </div>
      </div>

      {/* FULL WRITE UP */}
      <div className="mt-4">
        <h4>Full Procedure</h4>
        <div
          style={{
            whiteSpace: "pre-line",
            fontSize: "1.05rem",
            lineHeight: "1.6",
          }}
        >
          {writeUps[service.title]}
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-outline-success" onClick={() => generatePdf(true)}>
          Preview & Download Technical Report
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => (window.location.href = "mailto:Smminvest24@gmail.com")}
        >
          Contact Lab
        </button>
      </div>

      {/* Centered Modal (PDF Preview) */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: 20,
          }}
          onClick={() => {
            setShowModal(false);
            if (pdfUrl?.startsWith("blob:")) URL.revokeObjectURL(pdfUrl);
            setPdfUrl(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "80%",
              maxWidth: "900px",
              height: "80vh",
              background: "#fff",
              borderRadius: 8,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <img src={logoSMM} alt="logo" style={{ height: 36 }} />
                <strong>{service.title} — Report Preview</strong>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                >
                  Download
                </button>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <div style={{ flex: 1 }}>
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  title="preview"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              ) : (
                <div className="p-3">Generating preview…</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
