import express from "express";
import { subscribeEmail } from "../controllers/emailController.js";

const router = express.Router();

// Route to handle email subscription from footer
router.post("/subscribe", subscribeEmail);

export default router;
