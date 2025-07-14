import mongoose from "mongoose";

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

const RoomCategory = mongoose.model("RoomCategory", roomCategorySchema);
export default RoomCategory;
