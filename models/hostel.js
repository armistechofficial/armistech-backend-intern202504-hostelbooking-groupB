// models/hostel.js

import mongoose from "mongoose";

const nameRegex = /^[A-Za-z\s\-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Hostel name is required"],
        trim: true
    },
    email:{
        type: String,
        required: [true,"Hostel email is required"],
        unique: [true,"The email is already taken"],
        trim: true,
        match: [emailRegex, "Email must be valid"],
    },
    location: {
        type: String,
        required: [true,"Hostel location is required"],
        trim: true
    },
    capacity: {
        type: Number,
        required: [true,"Please provide capacity of hostel"],
        min: 1
    },
    price: {
        type: Number,
        required: [true,"Please provide base price"],
        min: 0
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomCategory",
    }],
    facilities: {
        type: [String], 
        default: []
    },
    images: {
        type: [String], 
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
