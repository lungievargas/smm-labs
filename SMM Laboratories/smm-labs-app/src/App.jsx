// App.jsx
import React, { useState, useEffect } from "react";
import { FlaskConical, Leaf, Pickaxe, Microscope } from "lucide-react";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaEnvelope, FaArrowUp, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import BookTestForm from "./pages/BookTestForm";

// Components
import Navbar from "./components/Navbar";
import ServiceDetail from "./components/ServiceDetail";
import WhoWeServe from "./components/WhoWeServe";

// Assets
import smmBackground from "./assets/smm background.jpg";
import feedTesting from "./assets/feedtesting.jpg";
import geochemical from "./assets/geochemical.jpg";
import stockFeed from "./assets/stockfeedtest.jpg";
import waterTest from "./assets/watertest.jpg";
import logoSMM from "./assets/logoSMM.jpg";

// Colors
export const COLORS = {
  green: "#2f7d32",
  babyBlue: "#89CFF0",
};

// ---------------- Hero Section ----------------
const Hero = () => (
  <section
    className="d-flex align-items-center justify-content-center vh-100 text-white text-center"
    style={{
      backgroundImage: `url(${smmBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div
      className="px-3"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
    >
      <h1 className="display-4 fw-bold mb-3">
        Reliable Testing for a <span style={{ color: COLORS.green }}>Cleaner Tomorrow</span>
      </h1>
      <p className="lead mb-4">
        SMM Laboratories provides trusted environmental, mineral, and agricultural
        testing services to drive sustainable solutions for industries and communities.
      </p>
      <a href="#contact" className="btn btn-light btn-lg">
        Get Started
      </a>
    </div>
  </section>
);

// ---------------- Services Section ----------------
export const services = [
  { icon: <FlaskConical />, title: "Water Quality Testing", description: "Comprehensive analysis of drinking, industrial, and wastewater to ensure safety and compliance.", image: waterTest },
  { icon: <Pickaxe />, title: "Mineral & Geochemical Testing", description: "Accurate identification and quantification of minerals and baseline geochemistry studies.", image: geochemical },
  { icon: <Leaf />, title: "Agricultural Testing", description: "Soil, fertilizer, and plant analysis for better crop yields and sustainable farming.", image: stockFeed },
  { icon: <Microscope />, title: "Microbiological Analysis", description: "Detection of harmful microorganisms in water, food, and environmental samples.", image: feedTesting },
];

const Services = () => {
  const navigate = useNavigate();
  return (
    <section id="services" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-5">Our <span style={{ color: COLORS.green }}>Services</span></h2>
        <div className="row g-4">
          {services.map((service, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3">
              <div
                className="card h-100 shadow-sm cursor-pointer"
                onClick={() => navigate(`/service/${service.title}`)}
              >
                <img
                  src={service.image}
                  className="card-img-top"
                  alt={service.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="mb-3 text-success fs-1">{service.icon}</div>
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------- About Us Section ----------------
const AboutUs = () => (
  <section id="about" className="py-5 bg-white">
    <div className="container">
      <h2 className="mb-4 text-center">About <span style={{ color: COLORS.green }}>Us</span></h2>
      <p className="lead text-center mb-4">
        SMM Laboratories is dedicated to delivering reliable, accurate, and timely
        environmental, mineral, and agricultural testing services.
      </p>
      <p>
        Our mission is to support industries and communities in achieving
        sustainable growth while safeguarding health and the environment. With a
        team of skilled scientists and technicians, we combine cutting-edge
        technology with a customer-focused approach to provide actionable
        insights for better decision-making.
      </p>
    </div>
  </section>
);

// ---------------- Vision & Mission Section ----------------
const VisionMission = () => (
  <section id="vision-mission" className="py-5 bg-light">
    <div className="container">
      <h2 className="mb-4 text-center">Vision & Mission</h2>
      <p>
        Our vision is to provide sustainable testing solutions for a cleaner tomorrow.
        <br />
        Our mission is to support industries and communities with accurate, timely, and reliable laboratory services.
      </p>
    </div>
  </section>
);

// ---------------- Contact Section ----------------
const Contact = () => (
  <section id="contact" className="py-5">
    <div className="container text-center">
      <h2>Contact Us</h2>
      <p>
        <strong>Palapye:</strong> +267 72946 073 | Smminvest24@gmail.com
      </p>
    </div>
  </section>
);

// ---------------- Find Us Section ----------------
const FindUs = () => (
  <section id="find-us" className="py-5 bg-white">
    <div className="container">
      <div className="row text-start">
        <div className="col-md-6 mb-3">
          <h5>About Us</h5>
          <ul className="list-unstyled">
            <li>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); document.querySelector("#about").scrollIntoView({ behavior: "smooth" }); }}
                className="text-decoration-none"
              >
                Click here for more
              </a>
            </li>
            <li>
              <a
                href="#vision-mission"
                onClick={(e) => { e.preventDefault(); document.querySelector("#vision-mission").scrollIntoView({ behavior: "smooth" }); }}
                className="text-decoration-none"
              >
                Vision & Mission
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps/place/Palapye" target="_blank" rel="noreferrer" className="text-decoration-none">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-6 mb-3">
          <h5>Contact Info</h5>
          <ul className="list-unstyled">
            <li><FaPhone /> +267 72946 073</li>
            <li><FaEnvelope /> Smminvest24@gmail.com</li>
            <li><FaMapMarkerAlt /> Palapye, Botswana</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ---------------- Footer ----------------
const Footer = () => (
  <footer className="bg-dark text-light py-4">
    <div className="container text-center">
      <p>© 2025 SMM Laboratories. All rights reserved.</p>
      <div className="d-flex justify-content-center gap-3 fs-4">
        <a href="https://www.linkedin.com/company/smm-laboratories" target="_blank" rel="noreferrer" className="text-light"><FaLinkedin /></a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-light"><FaFacebook /></a>
        <a href="https://wa.me/26772946073" target="_blank" rel="noreferrer" className="text-light"><FaWhatsapp /></a>
      </div>
    </div>
  </footer>
);

// ---------------- Floating Buttons ----------------
const FloatingButtons = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a
        href="mailto:Smminvest24@gmail.com"
        className="position-fixed"
        style={{
          bottom: "20px",
          left: "20px",
          backgroundColor: COLORS.babyBlue,
          padding: "12px",
          borderRadius: "50%",
          color: "white",
          boxShadow: "0 0 15px rgba(137, 207, 240, 0.9)",
          zIndex: 1000,
        }}
      >
        <FaEnvelope size={20} />
      </a>
      {showArrow && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="position-fixed"
          style={{
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: COLORS.babyBlue,
            padding: "12px",
            borderRadius: "50%",
            color: "white",
            border: "none",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

// ---------------- Chatbot Component ----------------
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleUserMessage = (text) => {
    setMessages(prev => [...prev, { text, sender: "user" }]);
    const lowerText = text.toLowerCase();
    let response = "";

    if (lowerText.includes("water")) {
      response = "We provide comprehensive Water Quality Testing including drinking and wastewater analysis.";
    } else if (lowerText.includes("mineral") || lowerText.includes("geochemical")) {
      response = "Our Mineral & Geochemical Testing identifies and quantifies minerals accurately.";
    } else if (lowerText.includes("agricultural") || lowerText.includes("soil")) {
      response = "Agricultural Testing includes soil, fertilizer, and plant analysis for better crop yields.";
    } else if (lowerText.includes("microbiological")) {
      response = "We detect harmful microorganisms in water, food, and environmental samples.";
    } else if (lowerText.includes("book test")) {
      window.location.href = "/booktest";
      return;
    } else {
      const whatsappLink = "https://wa.me/26772946073?text=Hello,%20I%20need%20assistance";
      window.open(whatsappLink, "_blank", "noopener");
      response = "I couldn't find an exact answer. I've opened WhatsApp to connect you with a human agent.";
    }

    setMessages(prev => [...prev, { text: response, sender: "bot" }]);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            backgroundColor: COLORS.babyBlue,
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            cursor: "pointer",
            zIndex: 10000,
          }}
        >
          Chat
        </button>
      )}

      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          width: "350px",
          height: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          zIndex: 10000,
          backgroundColor: "#fff"
        }}>
          <div style={{
            backgroundColor: COLORS.green,
            color: "#fff",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={logoSMM} alt="SMM Logo" style={{ height: "30px", marginRight: "10px" }} />
              <span>SMM Chatbot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "transparent", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, padding: "10px", overflowY: "auto", background: "#f9f9f9" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                margin: "5px 0",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%"
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              style={{ flex: 1, padding: "10px", border: "none", outline: "none", fontSize: "14px" }}
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => { if (e.key === "Enter" && input.trim()) { handleUserMessage(input.trim()); setInput(""); } }}
            />
            <button
              style={{ backgroundColor: COLORS.green, color: "#fff", border: "none", padding: "0 16px", cursor: "pointer" }}
              onClick={() => { if (input.trim()) { handleUserMessage(input.trim()); setInput(""); } }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ---------------- Main App ----------------
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <AboutUs />
          <VisionMission />
          <Services />
          <WhoWeServe />
          <FindUs />
          <Contact />
        </>
      } />
      <Route path="/service/:title" element={<ServiceDetail />} />
      <Route path="/serve/:type" element={<ServiceDetail />} />
      <Route path="/booktest" element={<BookTestForm />} />
    </Routes>
    <Footer />
    <FloatingButtons />
    <Chatbot />
  </Router>
);

export default App;
