import mongoose from "mongoose";

//a room category to connect in hostels schema
const roomCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    
  },
  {
    timestamps: true,
  }
);

//room category model created from the schema
const RoomCategory = mongoose.model("RoomCategory", roomCategorySchema);
export default RoomCategory;
