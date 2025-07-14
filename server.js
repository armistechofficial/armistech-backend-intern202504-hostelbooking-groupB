// app.js
import express from "express";
import { contactRouter } from "./routes/contact.js";
import { hostelRouter } from "./routes/hostel.js";
import { connectDB } from "./config/mongodb.js";

const app = express();
const PORT = 7000;

// Middleware
app.use(express.json());


// Mount routes
app.use("/api/contacts", contactRouter);
app.use("/api/hostels", hostelRouter);

// Start server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();
});




