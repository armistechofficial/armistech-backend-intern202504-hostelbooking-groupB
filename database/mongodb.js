import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = "mongodb://localhost:27017/Hostel-Booking"

//function to connect to the MongoDB database
const connectDB = async () =>{

    //try-catch to attempt to connect to MongoDB using the provided URL
    try{
        await mongoose.connect(mongoURL);
        console.log("The Mongodb database is connected successfully.");
    }
    catch (error){
        console.log(error);
    }
}

//export the connectDB function so it can be used in other files
export {connectDB};