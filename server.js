import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//load environment variables
dotenv.config();

//necessary routes
import emailRoutes from "./routes/emailRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import roomCategoryRoutes from "./routes/roomCategoryRoutes.js";
import { authRouter } from "./routes/user.js";
import { protectedRouter } from "./routes/protected.js";
import { publicRouter } from "./routes/public.js";

// Middleware
import { checkForAuthentication } from "./middlewares/auth.js";

//initialize app
const app = express();

//middleware setup
app.use(cors());
app.use(express.json({ extended: true }));
app.use(cookieParser());

//mongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

//public routes
app.use("/api/email", emailRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/room-categories", roomCategoryRoutes);
app.use("/user", authRouter);
app.use("/api", publicRouter);

//protected routes
app.use("/api", checkForAuthentication, protectedRouter);

//root test route for express
app.get("/", (req, res) => {
  res.send("Hi Express.js server for hostel booking!");
});

//start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
