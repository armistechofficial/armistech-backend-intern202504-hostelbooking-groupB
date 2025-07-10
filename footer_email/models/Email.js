const mongoose = require("mongoose");

// Define schema for email subscriptions
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Prevent duplicate subscriptions
  },
  subscribedAt: {
    type: Date,
    default: Date.now // Automatically sets to current date/time
  }
});

module.exports = mongoose.model("Email", emailSchema);
