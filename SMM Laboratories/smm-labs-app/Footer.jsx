// Footer.js
import React from "react";
import logoSMM from "../assets/logoSMM.jpg";

const COLORS = {
  green: "#2f7d32",
};

const Footer = () => (
  <footer className="border-top mt-5 py-4">
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      <div className="d-flex align-items-center mb-2 mb-md-0">
        <img src={logoSMM} alt="SMM Logo" className="me-2" style={{ height: "32px", borderRadius: "6px" }} />
        <span className="fw-semibold" style={{ color: COLORS.green }}>SMM Laboratories</span>
      </div>
      <small className="text-muted">
        © {new Date().getFullYear()} SMM Laboratories. All rights reserved.
      </small>
    </div>
  </footer>
);

export default Footer;
