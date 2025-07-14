//importing the required dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//importing the connectDB function to connect the mongodb
import { connectDB } from "./config/mongodb.js";

//loading environment variables
dotenv.config();

//importing routes
import { contactRouter } from "./routes/contact.js";
import { hostelRouter } from "./routes/hostel.js";
import emailRoutes from "./routes/emailRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import roomCategoryRoutes from "./routes/roomCategoryRoutes.js";
import { authRouter } from "./routes/user.js";
import { protectedRouter } from "./routes/protected.js";
import { publicRouter } from "./routes/public.js";

//importing the middlewares to handle request and response
import { checkForAuthentication } from "./middlewares/auth.js";

//initializing the app and port 
const app = express();
const PORT = process.env.PORT || 7000;

//middleware setup for routes
app.use(cors());
app.use(express.json({ extended: true }));
app.use(cookieParser());

//public routes accessable to everyone
app.use("/api/contacts", contactRouter);
app.use("/api/hostels", hostelRouter);
app.use("/api/email", emailRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/room-categories", roomCategoryRoutes);
app.use("/user", authRouter);
app.use("/api", publicRouter);

//protected routes accessable to only logged in and role based 
app.use("/api", checkForAuthentication, protectedRouter);

//root testing the route 
app.get("/", (req, res) => {
  res.send("Hi Express.js server for hostel booking!");
});

//starting the serverand connect DB
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});
