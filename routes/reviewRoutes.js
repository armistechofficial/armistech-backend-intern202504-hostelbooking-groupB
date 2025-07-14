import express from "express";
import * as reviewController from "../controllers/reviewController.js";

const router = express.Router();

//post methodca new review
router.post("/add", reviewController.addReview);

//get method all reviews
router.get("/", reviewController.getAllReviews);

export default router;