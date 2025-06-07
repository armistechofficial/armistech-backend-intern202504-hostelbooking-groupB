import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = "mongodb://localhost:27017/Hostel-Booking"

const connectDB = async () =>{
    try{
        await mongoose.connect(mongoURL);
        console.log("The Mongodb database is connected successfully.");
    }
    catch (error){
        console.log(error);
    }
}

export {connectDB};