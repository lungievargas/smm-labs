// Navbar.js
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link as ScrollLink, Events } from "react-scroll";
import logoSMM from "../assets/logoSMM.jpg";

const COLORS = {
  green: "#2f7d32",
};

const Navbar = () => {
  const [active, setActive] = useState("services");

  useEffect(() => {
    // Track which section is active while scrolling
    Events.scrollEvent.register("begin", (to) => setActive(to));
    return () => Events.scrollEvent.remove("begin");
  }, []);

  const navItems = [
    { name: "Services", to: "services" },
    { name: "Who we serve", to: "clients" },
    { name: "Process", to: "process" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{ backgroundColor: "#ffffffcc" }}
    >
      <div className="container">
        {/* Logo + Brand */}
        <a className="navbar-brand d-flex align-items-center" href="#hero">
          <img
            src={logoSMM}
            alt="SMM Laboratories Logo"
            className="me-2"
            style={{ height: "48px", borderRadius: "8px" }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold" style={{ color: COLORS.green }}>
              SMM LABORATORIES
            </span>
            <small className="text-muted">Science for a greener tomorrow</small>
          </div>
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item mx-1">
                <ScrollLink
                  to={item.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-70}
                  onSetActive={() => setActive(item.to)}
                  className={`nav-link ${
                    active === item.to
                      ? "fw-bold text-primary"
                      : "text-secondary"
                  }`}
                  style={{
                    cursor: "pointer",
                    borderBottom:
                      active === item.to ? "2px solid blue" : "none",
                    boxShadow:
                      active === item.to
                        ? "0px 2px 10px rgba(0, 0, 255, 0.5)"
                        : "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    transition: "0.3s ease",
                  }}
                >
                  {item.name}
                </ScrollLink>
              </li>
            ))}
          </ul>

          {/* Button */}
          <a
            href="#contact"
            className="btn text-white ms-lg-3"
            style={{ backgroundColor: COLORS.green }}
          >
            Book a Test <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
