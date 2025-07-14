
// controllers/hostelController.js

import { hostel } from "../models/hostel.js";


const createHostel = async (req, res) => {
    try {
        const { name, email, location, capacity, price, rooms, facilities, bookedDates } = req.body;

        const newHostel = new hostel({
            name,
            email,
            location,
            capacity,
            price,
            rooms,
            facilities,
            bookedDates,
        });

        await newHostel.save();

        res.status(201).json({
            success: true,
            message: "Hostel created successfully.",
            data: newHostel
        });
    } catch (error) {
        console.error("Error creating hostel:", error);
        res.status(500).json({ success: false, message: "Error creating hostel" });
    }
};

//  Get all hostels
const getAllHostels = async (req, res) => {
    try {
        const hostels = await hostel.find();
        res.status(200).json({ success: true, data: hostels });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch hostels" });
    }
};

//  Get a hostel by ID
const getHostelById = async (req, res) => {
    try {
        const hostelData = await hostel.findById(req.params.id);
        if (!hostelData) {
            return res.status(404).json({ success: false, message: "Hostel not found" });
        }
        res.status(200).json({ success: true, data: hostelData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving hostel" });
    }
};

//  Update a hostel by ID
const updateHostel = async (req, res) => {
    try {
        const updated = await hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Hostel not found" });
        }
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating hostel" });
    }
};


const deleteHostel = async (req, res) => {
    try {
        const deleted = await hostel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Hostel not found" });
        }
        res.status(200).json({ success: true, message: "Hostel deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting hostel" });
    }
};


export {
    createHostel,
    getAllHostels,
    getHostelById,
    updateHostel,
    deleteHostel
};

