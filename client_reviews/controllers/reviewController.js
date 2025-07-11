const Review = require('../models/Review');
const reviewSchema = require('../validations/reviewValidation');

// Controller to add a new review
exports.addReview = async (req, res) => {
  try {
    const validated = reviewSchema.parse(req.body);
    //Create a new Review document and save to the database
    const newReview = new Review(validated);
    await newReview.save();
    
    res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    // Handle Zod validation errors
    if (error.name === 'ZodError') { 
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Server error" });
  }
};

//  Controller to fetch all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};
