const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const emailRoutes = require("./routes/emailRoutes");

const app = express();
// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/email", emailRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
