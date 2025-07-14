import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGO_URI;

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
