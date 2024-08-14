const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    const connectionString =
      process.env.NODE_ENV === "test"
        ? process.env.MONGODB_URI_TEST
        : process.env.MONGODB_URI;

    await mongoose.connect(connectionString, {});

    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      console.error("Could not connect to MongoDB", err);
    }
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
