import React from "react";
import { Pickaxe, Sprout, Building2, Factory } from "lucide-react";
import PageHeader from "../components/PageHeader";

const ClientCard = ({ icon, title, description }) => (
  <div className="card shadow-sm rounded-3 mb-4">
    <div className="card-body text-center">
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
        style={{ backgroundColor: "#e6f4ea", color: "#2f7d32", width: "50px", height: "50px" }}
      >
        {icon}
      </div>
      <h5 className="card-title fw-bold">{title}</h5>
      <p className="card-text text-muted">{description}</p>
    </div>
  </div>
);

export default function Clients() {
  const clients = [
    { icon: <Pickaxe />, title: "Mining", description: "Ore grade control, exploration, QA/QC protocols." },
    { icon: <Sprout />, title: "Agriculture", description: "Soil fertility, crop nutrition, water quality." },
    { icon: <Building2 />, title: "Municipalities", description: "Potable water, effluent compliance, waste monitoring." },
    { icon: <Factory />, title: "Industry", description: "Environmental monitoring & occupational safety." },
  ];

  return (
    <section id="clients" className="py-5 bg-white">
      <div className="container">
        <PageHeader
          title="Who We Serve"
          subtitle="We support a broad spectrum of stakeholders with reliable laboratory analysis tailored to their needs."
        />
        <div className="row">
          {clients.map((client, idx) => (
            <div key={idx} className="col-md-3">
              <ClientCard {...client} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
