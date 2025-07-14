import express from "express";
import * as reviewController from "../controllers/reviewController.js";

const router = express.Router();

// POST - add a new review
router.post("/add", reviewController.addReview);

// GET - get all reviews
router.get("/", reviewController.getAllReviews);

export default router;