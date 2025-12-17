// components/FAQs.jsx
import React, { useState } from "react";

const faqs = [
  {
    q: "What industries do you serve?",
    a: "We serve environmental, mining, agricultural, and food industries with a wide range of laboratory testing services.",
  },
  {
    q: "How long does it take to get results?",
    a: "Turnaround times vary depending on the type of analysis, but most results are available within 3–7 business days.",
  },
  {
    q: "Do you provide consultation after tests?",
    a: "Yes, our experts provide guidance and recommendations based on your test results.",
  },
  {
    q: "Where are you located?",
    a: "We are based in Palapye, Botswana. You can reach us at +267 72946 073 or info@smmlaboratories.com.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faqs" className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center">
          Frequently Asked <span style={{ color: "#2f7d32" }}>Questions</span>
        </h2>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="mb-3 border rounded p-3 shadow-sm bg-white"
            style={{ cursor: "pointer" }}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <h5>{faq.q}</h5>
            {openIndex === idx && <p className="mt-2 text-muted">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
