import mongoose from "mongoose";

const nameRegex = /^[A-Za-z\s\-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new mongoose.Schema(
    {
        personalDetails: {
            nationalId:{
                type: String,
                required: [true, "National Id is required"],
                minLength: [11,"The National Id must be 11 digits long"],
                maxLength: [11,"The National Id must be 11 digits long"],
            },
            firstName: {
                type: String,
                required: [true, "First name is required"],
                trim: true,
                minLength: 2,
                maxLength: 50,
                match: [nameRegex, "First name must be only alphabetic"],
            },
            lastName: {
                type: String,
                required: [true, "Last name is required"],
                trim: true,
                minLength: 2,
                maxLength: 50,
                match: [nameRegex, "Last name must be only alphabetic"],
            },
        },
        residenceDetails: {
            address:{
                type: String,
                required: [true, "Address is required"],
                minLength: 8,
                maxLength: 100,
            },
            city: {
                type: String,
                required: [true, "City is required"],
                minLength: 2,
                maxLength: 50,
            },
            country: {
                type: String,
                required: [true, "Country is required"],
                minLength: 2,
                maxLength: 50,
            },
            postalCode: {
                type: String,
                required: [true, "Postal Code is required"],
                minLength: 4,
                maxLength: 20,
            },
        },
        contactDetails: {
            contactNumber:{
                type: String,
                required: [true, "Phone number is required"],
                unique: true, 
                minLength: [10,"The number must be 10 digits long"],
                maxLength: [10,"The number must be 10 digits long"],

            },
            email: {
                type: String,
                required: [true, "Email is required"],
                unique: true, 
                minLength: 8,
                maxLength: 100,
                match: [emailRegex, "Email must be valid"],
            },
        },
        status: {
            type: String,
            default: "in-progress", 
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment", 
        },
    }, 
    {timestamps: true}
);

const booking = mongoose.model("booking", bookingSchema);

export {booking};