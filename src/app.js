const express = require("express");
const connectDB = require("./config/db");
const importDataRouter = require("./swift-api/routes/importDataRoute");
const songRoutes = require("../src/swift-api/routes/songRoutes");
const playsRoutes = require("../src/swift-api/routes/playsRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("SwiftCloud API");
});

// Use imported routes here
app.use("/", importDataRouter);
app.use("/", songRoutes);
app.use("/", playsRoutes)

// Export the app for testing, and conditionally start the server
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app; // Export the app for testing
