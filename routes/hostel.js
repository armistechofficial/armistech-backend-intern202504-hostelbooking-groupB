
// routes/hostel.js

// Import Express Router
import express from "express";

// Import controller functions using named imports
import {
    createHostel,
    getAllHostels,
    getHostelById,
    updateHostel,
    deleteHostel
} from "../controllers/hostel.js";

// Create a router instance
const hostelRouter = express.Router();

// Define hostel management routes
hostelRouter.post("/", createHostel);            
hostelRouter.get("/", getAllHostels);            
hostelRouter.get("/:id", getHostelById);         
hostelRouter.put("/:id", updateHostel);          
hostelRouter.delete("/:id", deleteHostel);       

// Export the router using named export
export { hostelRouter };

