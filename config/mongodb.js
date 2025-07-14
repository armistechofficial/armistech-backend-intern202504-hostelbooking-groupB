
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL =process.env.MONGO_URI;

// for connecting  to the MongoDB database
const connectDB = async () => {
    try {
    await mongoose.connect(mongoURL);
    console.log("The Mongodb database is connected successfully.");
    } catch (error) {
    console.log(error);
    }
};

// Export the connectDB function so it can be used in other files
export { connectDB };
