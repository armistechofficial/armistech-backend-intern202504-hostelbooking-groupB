//importing zod dependency
import { z } from 'zod';

//validation schema for user reviews
const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"), // Reviewer's name required and must not be empty
  comment: z.string().min(1, "Comment is required"), // Comment field required and must not be empty
  rating: z.number().min(1).max(5) // Rating must be a number between 1 and 5
});

export default reviewSchema;
