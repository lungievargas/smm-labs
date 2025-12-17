import React from "react";
import PageHeader from "../components/PageHeader";

const StepCard = ({ number, title, desc }) => (
  <div className="p-6 bg-white rounded-2xl border shadow-sm text-center">
    <div className="text-4xl font-extrabold text-green-700">{number}</div>
    <h3 className="mt-3 text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </div>
);

export default function Process() {
  return (
    <section id="process" className="py-16 bg-[#f3f7f4] rounded-3xl max-w-7xl mx-auto px-4">
      <PageHeader
        title="Our Testing Process"
        subtitle="A transparent and quality-assured workflow ensuring accurate results."
      />
      <div className="mt-10 grid md:grid-cols-4 gap-6">
        <StepCard number="1" title="Sample Collection" desc="Properly sealed and labeled by our trained team." />
        <StepCard number="2" title="Laboratory Analysis" desc="State-of-the-art instruments and validated methods." />
        <StepCard number="3" title="Quality Control" desc="Replicates, spikes, blanks to ensure reliability." />
        <StepCard number="4" title="Results & Reporting" desc="Clear reports delivered digitally and securely." />
      </div>
    </section>
  );
}
