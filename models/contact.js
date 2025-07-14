// models/contact.js
import mongoose from "mongoose";

//creating a contact schema for the contact model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
}, {
    timestamps: true
});

//a model contact is created
const Contact = mongoose.model("Contact", contactSchema);

export { Contact };

