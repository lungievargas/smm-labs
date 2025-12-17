import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";

const ContactCard = ({ icon, label, value }) => (
  <div className="card text-center mb-4 shadow-sm rounded-3 p-3">
    <div
      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
      style={{ backgroundColor: "#e6f4ea", color: "#2f7d32", width: "50px", height: "50px" }}
    >
      {icon}
    </div>
    <h5 className="card-title fw-bold">{label}</h5>
    <p className="card-text text-muted">{value}</p>
  </div>
);

export default function Contact() {
  const contacts = [
    { icon: <Phone />, label: "Phone", value: "+267 123 4567" },
    { icon: <Mail />, label: "Email", value: "info@smmlabs.co.bw" },
    { icon: <MapPin />, label: "Location", value: "Gaborone, Botswana" },
  ];

  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container">
        <PageHeader
          title="Get in Touch"
          subtitle="Reach out to us for quotes, bookings, or further information."
        />
        <div className="row">
          {contacts.map((contact, idx) => (
            <div key={idx} className="col-md-4">
              <ContactCard {...contact} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
