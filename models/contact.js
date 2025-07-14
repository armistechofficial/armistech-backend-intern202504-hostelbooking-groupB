// models/contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
}, {
    timestamps: true
});

const Contact = mongoose.model("Contact", contactSchema);

export { Contact };

