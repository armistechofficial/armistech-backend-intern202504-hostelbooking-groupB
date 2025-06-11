import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minLength: 4,
            maxLength: 50,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, 
            minLength: 8,
            maxLength: 100,
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