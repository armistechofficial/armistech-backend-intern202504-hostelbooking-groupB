import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ["Card", "Esewa", "Khalti", "Cash"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    paidAt: {
        type: Date,
        default: Date.now,
    },
},
{ timestamps: true }
);

const payment = mongoose.model("payment", paymentSchema);

export {payment};