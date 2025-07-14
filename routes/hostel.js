
// routes/hostel.js

// Import Express Router
import express from "express";
import { checkForAuthentication, restrictTo } from "../middlewares/auth.js";

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

//public routes for everyone
hostelRouter.get("/", getAllHostels);            
hostelRouter.get("/:id", getHostelById);  

//hostel management routes for admin use only
hostelRouter.post("/", checkForAuthentication, restrictTo(["admin"]), createHostel);                   
hostelRouter.put("/:id", checkForAuthentication, restrictTo(["admin"]), updateHostel);          
hostelRouter.delete("/:id", checkForAuthentication, restrictTo(["admin"]), deleteHostel);       

// Export the router using named export
export { hostelRouter };

