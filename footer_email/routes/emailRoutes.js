console.log("Email routes loaded"); // Log to confirm that the email routes file has loaded

const express = require("express");
const router = express.Router();

// Import the subscribeEmail controller function
const { subscribeEmail } = require("../controllers/emailController");

// Route to handle email subscription from footer
router.post("/subscribe", subscribeEmail);

// Export the router to be used in the main app
module.exports = router;
