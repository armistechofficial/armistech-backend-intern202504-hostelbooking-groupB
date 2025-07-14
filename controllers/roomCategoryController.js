import RoomCategory from '../models/roomCategory.js';
import { roomCategoryValidationSchema } from '../utils/roomCategoryUtil.js';


// Create
export const createRoomCategory = async (req, res) => {
  try {
    const validatedData = roomCategoryValidationSchema.parse(req.body);
    const newCategory = await RoomCategory.create(validatedData);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

// Get all
export const getAllRoomCategories = async (req, res) => {
  try {
    const categories = await RoomCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID
export const getRoomCategoryById = async (req, res) => {
  try {
    const category = await RoomCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update
export const updateRoomCategory = async (req, res) => {
  try {
    const validatedData = roomCategoryValidationSchema.parse(req.body);
    const updatedCategory = await RoomCategory.findByIdAndUpdate(req.params.id, validatedData, {
      new: true,
    });
    if (!updatedCategory) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

// Delete
export const deleteRoomCategory = async (req, res) => {
  try {
    const deleted = await RoomCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


