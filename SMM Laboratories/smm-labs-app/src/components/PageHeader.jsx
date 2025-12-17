import React from "react";
import logoSMM from "../assets/logoSMM.jpg"; // ✅ Corrected file extension

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-5">
      <img
        src={logoSMM}
        alt="SMM Laboratories Logo"
        className="mb-3 rounded"
        style={{ height: "64px" }}
      />
      <h2 className="fw-bold">{title}</h2>
      {subtitle && (
        <p className="text-muted mt-2 mx-auto" style={{ maxWidth: "32rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
