import mongoose from "mongoose";

const nameRegex = /^[A-Za-z\s\-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minLength: 4,
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
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, 
            minLength: 8,
            maxLength: 100,
            match: [emailRegex, "Email must be valid"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role:{
            type: String,
            required: [true, "User role is required"],
            default: "customer",
        },
    }, 
    {timestamps: true}
);

const user = mongoose.model("user", userSchema);

export {user};