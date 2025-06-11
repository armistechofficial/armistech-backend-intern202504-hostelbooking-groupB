const { z } = require('zod');

const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  comment: z.string().min(1, "Comment is required"),
  rating: z.number().min(1).max(5)
});

module.exports = reviewSchema;
