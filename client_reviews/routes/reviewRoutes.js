const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/add', reviewController.addReview);

// GET - get all reviews
router.get('/', reviewController.getAllReviews);
module.exports = router;
