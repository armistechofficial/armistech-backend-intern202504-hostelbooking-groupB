import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Routes
import emailRoutes from "./routes/emailRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import roomCategoryRoutes from "./routes/roomCategoryRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api/email", emailRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/room-categories", roomCategoryRoutes);

// Debug route loading
console.log('emailRoutes:', typeof emailRoutes);
console.log('reviewRoutes:', typeof reviewRoutes);
console.log('roomCategoryRoutes:', typeof roomCategoryRoutes);

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
