require("dotenv").config();
const db = require("./firebase");

async function testFirestore() {
  try {
    console.log("🔹 Testing Firestore connection...");

    // Add a test document
    const docRef = await db.collection("test").add({
      message: "Hello Firestore!",
      timestamp: new Date(),
    });
    console.log(`✅ Test document added with ID: ${docRef.id}`);

    // Fetch all documents from 'test' collection
    const snapshot = await db.collection("test").get();
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data());
    });

    console.log("🎉 Firestore is working!");
  } catch (error) {
    console.error("❌ Firestore test failed:", error);
  }
}

testFirestore();
