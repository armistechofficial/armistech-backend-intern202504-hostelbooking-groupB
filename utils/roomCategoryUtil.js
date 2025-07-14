import { z } from "zod";

const roomCategoryValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  features: z.array(z.string()).optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  capacity: z.number().int().positive("Capacity must be a positive integer"),
  images: z.array(z.string().url()).optional(),
});

export { roomCategoryValidationSchema };
