// src/components/data.js

import geochemical from "../assets/geochemical.jpg";
import stockFeed from "../assets/stockfeedtest.jpg";
import feedTesting from "../assets/feedtesting.jpg";
import waterTest from "../assets/watertest.jpg";

// Services data
export const services = [
  {
    iconName: "FlaskConical",
    title: "Water Quality Testing",
    description:
      "Comprehensive analysis of drinking, industrial, and wastewater to ensure safety and compliance.",
    image: waterTest,
  },
  {
    iconName: "Pickaxe",
    title: "Mineral & Geochemical Testing",
    description:
      "Accurate identification and quantification of minerals and baseline geochemistry studies.",
    image: geochemical,
  },
  {
    iconName: "Leaf",
    title: "Agricultural Testing",
    description:
      "Soil, fertilizer, and plant analysis for better crop yields and sustainable farming.",
    image: stockFeed,
  },
  {
    iconName: "Microscope",
    title: "Microbiological Analysis",
    description:
      "Detection of harmful microorganisms in water, food, and environmental samples.",
    image: feedTesting,
  },
];

// Who We Serve data
export const whoWeServeCards = [
  {
    type: "Mines",
    description:
      "We do geochemistry tests, mineral identification, and baseline studies in mines.",
    image: geochemical,
  },
  {
    type: "Farmers",
    description:
      "Soil tests, water tests, and feed analysis for better crop yields.",
    image: stockFeed,
  },
  {
    type: "Students",
    description:
      "Soil tests and other project tests for school and university students.",
    image: feedTesting,
  },
];
