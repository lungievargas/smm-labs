// Navbar.js
import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoSMM from "../assets/logoSMM.jpg";

const COLORS = {
  green: "#2f7d32",
  navy: "#002147",
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if a tab is active
  const isActive = (sectionId) => {
    if (location.pathname !== "/") return false; // Only highlight on homepage
    return window.location.hash === sectionId;
  };

  // Scroll helper
  const scrollToSection = (id) => {
    navigate("/"); // Ensure we are on homepage
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      window.location.hash = id; // update URL without reload
    }, 50);
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{ backgroundColor: "#ffffffcc" }}
    >
      <div className="container">
        <button
          onClick={() => navigate("/")}
          className="navbar-brand d-flex align-items-center"
          style={{ border: "none", background: "transparent" }}
        >
          <img
            src={logoSMM}
            alt="SMM Laboratories Logo"
            className="me-2"
            style={{ height: "48px", borderRadius: "8px", cursor: "pointer" }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold" style={{ color: COLORS.green }}>
              SMM LABORATORIES
            </span>
            <small className="text-muted">Science for a greener tomorrow</small>
          </div>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {/* ABOUT */}
            <li className="nav-item">
              <button
                className="nav-link"
                style={{
                  borderBottom: isActive("#about") ? `3px solid ${COLORS.navy}` : "none",
                  color: isActive("#about") ? COLORS.navy : "black",
                  background: "transparent",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
                onClick={() => scrollToSection("#about")}
              >
                About Us
              </button>
            </li>

            {/* SERVICES */}
            <li className="nav-item">
              <button
                className="nav-link"
                style={{
                  borderBottom: isActive("#services") ? `3px solid ${COLORS.navy}` : "none",
                  color: isActive("#services") ? COLORS.navy : "black",
                  background: "transparent",
                  border: "none",
                }}
                onClick={() => scrollToSection("#services")}
              >
                Services
              </button>
            </li>

            {/* WHO WE SERVE */}
            <li className="nav-item">
              <button
                className="nav-link"
                style={{
                  borderBottom: isActive("#whowe") ? `3px solid ${COLORS.navy}` : "none",
                  color: isActive("#whowe") ? COLORS.navy : "black",
                  background: "transparent",
                  border: "none",
                }}
                onClick={() => scrollToSection("#whowe")}
              >
                Who We Serve
              </button>
            </li>
          </ul>

          {/* BOOK TEST BUTTON */}
          <button
            onClick={() => navigate("/booktest")}
            className="btn text-white ms-lg-3"
            style={{ backgroundColor: COLORS.green }}
          >
            Book a Test <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
