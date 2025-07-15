import mongoose from "mongoose";

//creates a schema for payment
const paymentSchema = new mongoose.Schema({
    method:{
        type: String,
        required: true,
        enum:["Credit card", "Esewa", "Khalti"],
    },
    cardholderName: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cvv:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 4,
    }
},
{ timestamps: true }
);

//export the schema to the booking schema
export {paymentSchema};
