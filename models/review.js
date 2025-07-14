import mongoose from "mongoose";

//a review schema for reviews from customers
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

//model created from the schema
const Review = mongoose.model("Review", reviewSchema);
export default Review;
