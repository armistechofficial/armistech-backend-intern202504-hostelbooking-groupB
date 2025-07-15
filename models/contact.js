import mongoose from "mongoose";
//a email regular expression
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//a schema for the contact us
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [ emailRegex, "Invalid email format" ]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    }
}, {
    timestamps: true
});

//a model contact is created
const Contact = mongoose.model("Contact", contactSchema);

export { Contact };
