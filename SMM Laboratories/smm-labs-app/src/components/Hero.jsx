import React from "react";

const COLORS = {
  green: "#2f7d32",
};

export default function Hero() {
  return (
    <section className="py-5 bg-success bg-opacity-10">
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-3">
          Reliable Testing for a <span style={{ color: COLORS.green }}>Cleaner Tomorrow</span>
        </h1>
        <p className="lead mb-4 text-muted">
          SMM Laboratories provides trusted environmental, mineral, and agricultural testing services
          to drive sustainable solutions for industries and communities.
        </p>
        <a
          href="#contact"
          className="btn"
          style={{ backgroundColor: COLORS.green, color: "#fff" }}
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
