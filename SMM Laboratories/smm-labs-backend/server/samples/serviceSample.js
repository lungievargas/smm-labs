const Service = require("../models/Service");

const services = [
  new Service(
    "General Public",
    "Affordable and reliable soil testing for students, homeowners, and anyone curious about soil health.",
    "feedTesting.png"
  ),
  new Service(
    "Farmers",
    "Crop and soil testing designed to improve yield and fertilizer efficiency.",
    "farmersTesting.png"
  ),
  new Service(
    "Businesses",
    "Specialized soil & water testing for construction, mining, and industrial projects.",
    "businessTesting.png"
  )
];

async function seedServices() {
  for (const service of services) {
    const id = await service.save();
    console.log(`✅ Service added with ID: ${id}`);
  }
}

seedServices();
