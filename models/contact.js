// models/contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true,
        minlength: [3, "Subject must be at least 3 characters"]
    },

}, {
    timestamps: true
});

const Contact = mongoose.model("Contact", contactSchema);

export { Contact };

