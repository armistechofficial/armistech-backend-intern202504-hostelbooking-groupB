// controllers/contact.js
import { Contact } from "../models/contact.js";

const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please enter correct data"
            });
        }

        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        res.status(201).json({
            success: true,
            data: newContact
        });

    } catch (error) {
        console.error("Error creating contact message:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export { createMessage };


