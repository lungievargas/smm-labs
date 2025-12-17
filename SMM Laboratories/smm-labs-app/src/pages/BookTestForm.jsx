// src/components/BookTestForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../App";

const BookTestForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract service name from URL if available
  const queryParams = new URLSearchParams(location.search);
  const prefilledService = queryParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: "",
    service: prefilledService,
    email: "",
    date: "",
  });

  // Update service if URL changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: prefilledService }));
  }, [prefilledService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = `New Test Booking from ${formData.name}`;
    const body = `
Name & Surname: ${formData.name}
Company Name: ${formData.company}
Contact Number: ${formData.contact}
Service Requested: ${formData.service}
Email: ${formData.email}
Date of Test: ${formData.date}
    `;

    // Updated company email here
    const mailtoLink = `mailto:cor7e3.762@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open Gmail/Outlook/etc with filled email
    window.location.href = mailtoLink;
  };

  return (
    <section className="py-5 bg-light">
      <div className="container" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4" style={{ color: COLORS.green }}>
          Book a Test
        </h2>
        <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
          <div className="mb-3">
            <label className="form-label fw-bold">Name & Surname</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Company Name</label>
            <input
              type="text"
              className="form-control"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contact Number</label>
            <input
              type="tel"
              className="form-control"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Service Requested</label>
            <input
              type="text"
              className="form-control"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              placeholder="e.g. Water Testing, Soil Analysis"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Date of Test</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success px-4"
              style={{ backgroundColor: COLORS.green, border: "none" }}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3 px-4"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookTestForm;
