import mongoose from "mongoose";
import { paymentSchema } from "./payment.js";

const nameRegex = /^[A-Za-z\s\-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", 
            required: true,
        },
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
                match: [phoneRegex, "Phone number must be exactly 10 digits"],
            },
            email: {
                type: String,
                required: [true, "Email is required"],
                minLength: 8,
                maxLength: 100,
                match: [emailRegex, "Email must be valid"],
            },
        },
        status: {
            type: String,
            default: "in-progress", 
        },
        paymentDetails: paymentSchema,
        taxDetails: {
            vat: {
                type: Number,
                default: 0,
                min: 0,
            },
            marketingCharge: {
                type: Number,
                default: 0,
                min: 0,
            },
            taxes: {
                type: Number,
                default: 0,
                min: 0,
            },
        },
        receipt: {
            orderNumber: { 
            type: String, 
            minlength: [1, 'Order number cannot be empty']
        },
            address: { 
                type: String, 
                default: "Kathmandu, Nepal",
            },
            dateAndTime: { 
                type: Date, 
                default: Date.now 
            },
            hostel: { 
                type: String, 
                trim: true,
                minlength: [1, 'Hostel name cannot be empty']
            },
            numberOfGuests: { 
                type: Number, 
                min: [1, 'Number of guests must be at least 1'],
                max: [100, 'Number of guests cannot exceed 100'],
            },
            checkInDate: { 
                type: Date, 
            },
            checkOutDate: { 
                type: Date, 
            },
        },
        totalAmount: {
            type: Number,
            min: 0,
        },
    }, 
    {timestamps: true}
);

const booking = mongoose.model("booking", bookingSchema);

export {booking};