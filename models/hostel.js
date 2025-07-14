// models/hostel.js

import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    facilities: {
        type: [String], // e.g., ["WiFi", "Laundry", "Mess"]
        default: []
    },
    bookedDates: {
        type: [Date],
        default: []
    }
}, {
    timestamps: true
});

const hostel = mongoose.model("Hostel", hostelSchema);

export { hostel };
