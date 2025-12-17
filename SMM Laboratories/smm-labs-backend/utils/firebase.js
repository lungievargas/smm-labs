// server/firebase.js
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
require("dotenv").config();

// Initialize Firebase Admin
initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.FIREBASE_DB_URL, // Corrected
});

// Get Firestore instance
const db = getFirestore();

module.exports = db;
