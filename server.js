import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/mongodb.js";

// Load environment variables
dotenv.config();

// Import routes
import { contactRouter } from "./routes/contact.js";
import { hostelRouter } from "./routes/hostel.js";
import emailRoutes from "./routes/emailRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import roomCategoryRoutes from "./routes/roomCategoryRoutes.js";
import { authRouter } from "./routes/user.js";
import { protectedRouter } from "./routes/protected.js";
import { publicRouter } from "./routes/public.js";

// Middleware
import { checkForAuthentication } from "./middlewares/auth.js";

// Initialize app
const app = express();
const PORT = process.env.PORT || 7000;

// Middleware setup
app.use(cors());
app.use(express.json({ extended: true }));
app.use(cookieParser());

// Public routes
app.use("/api/contacts", contactRouter);
app.use("/api/hostels", hostelRouter);
app.use("/api/email", emailRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/room-categories", roomCategoryRoutes);
app.use("/user", authRouter);
app.use("/api", publicRouter);

// Protected routes
app.use("/api", checkForAuthentication, protectedRouter);

// Root test route
app.get("/", (req, res) => {
  res.send("Hi Express.js server for hostel booking!");
});

// Start server and connect to DB
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});
