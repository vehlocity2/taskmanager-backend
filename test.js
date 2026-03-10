import mongoose from "mongoose";

// Replace this with your full connection string (including DB name)
const MONGO_URI = "mongodb://oshiokeboss:Vehlocity@vehlocitycluster0.bhsxaom.mongodb.net/travelApp?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected from Node");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Node connection failed:", err.message);
    process.exit(1);
  });