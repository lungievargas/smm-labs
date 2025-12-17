// src/components/WhoWeServe.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import geochemical from "../assets/geochemical.jpg";
import stockFeed from "../assets/stockfeedtest.jpg";
import feedTesting from "../assets/feedtesting.jpg";
import { COLORS } from "../App";

export const whoWeServeCards = [
  {
    type: "Mines",
    description: "We do geochemistry tests, mineral identification, and baseline studies in mines.",
    image: geochemical,
  },
  {
    type: "Farmers",
    description: "Soil tests, water tests, and feed analysis for better crop yields.",
    image: stockFeed,
  },
  {
    type: "General Public",
  description: "We provide affordable and reliable soil testing services for anyone interested in understanding their soil quality. Whether you're a student learning about soil science, a homeowner working on a garden, or someone curious about soil health, our lab is here to help with clear, accurate results.",
    image: feedTesting,
  },
];

const WhoWeServe = () => {
  const navigate = useNavigate();

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-5">Who We <span style={{ color: COLORS.green }}>Serve</span></h2>
        <div className="row g-4">
          {whoWeServeCards.map((card, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div
                className="card h-100 shadow-sm cursor-pointer"
                onClick={() => navigate(`/serve/${card.type}`)}
              >
                <img
                  src={card.image}
                  className="card-img-top"
                  alt={card.type}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.type}</h5>
                  <p className="card-text">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
