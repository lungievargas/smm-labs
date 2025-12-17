import React from "react";
import { FlaskConical, Droplets, Leaf, Pickaxe } from "lucide-react";
import PageHeader from "../components/PageHeader";

const COLORS = {
  green: "#2f7d32",
};

const steps = [
  {
    icon: <FlaskConical size={32} />,
    title: "Sample Collection",
    description: "We collect representative samples from soil, water, or materials with strict quality protocols.",
  },
  {
    icon: <Droplets size={32} />,
    title: "Laboratory Analysis",
    description: "Accredited tests are conducted using modern instrumentation and QA/QC standards.",
  },
  {
    icon: <Leaf size={32} />,
    title: "Data Interpretation",
    description: "Results are analyzed by experts to provide actionable insights for decision-making.",
  },
  {
    icon: <Pickaxe size={32} />,
    title: "Report Delivery",
    description: "Clients receive comprehensive reports with recommendations and certifications if required.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-5 bg-light">
      <div className="container text-center">
        <PageHeader
          title="Our Process"
          subtitle="A step-by-step approach to ensure precise and reliable laboratory testing."
        />

        <div className="row mt-4">
          {steps.map((step, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div
                  className="card-body d-flex flex-column align-items-center text-center"
                  style={{ color: COLORS.green }}
                >
                  <div className="mb-3">{step.icon}</div>
                  <h5 className="card-title">{step.title}</h5>
                  <p className="card-text text-muted">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
