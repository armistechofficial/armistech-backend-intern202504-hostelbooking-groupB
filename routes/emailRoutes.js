//importing express dependency
import express from "express";
//importing subcribeEmail function from controllers emailController.js
import { subscribeEmail } from "../controllers/emailController.js";

//assigning router
const router = express.Router();

// Route to handle email subscription from footer
router.post("/subscribe", subscribeEmail);

export default router;
