// models/hostel.js

import mongoose from "mongoose";

const nameRegex = /^[A-Za-z\s\-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [emailRegex, "Email must be valid"],
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomCategory",
    }],
    facilities: {
        type: [String], // e.g., ["WiFi", "Laundry", "Mess"]
        default: []
    },
    bookedDates: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const hostel = mongoose.model("Hostel", hostelSchema);

export { hostel };
