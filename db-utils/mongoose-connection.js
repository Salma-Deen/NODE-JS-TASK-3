import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Fallback values for environment variables

const dbName = "student-mentor";
const cloudUrl=`mongodb+srv://salmamsc3:Ijpq9LmHTF0wAjkl@cluster0.ldasy.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

// Function to connect to MongoDB
export const connectDb = async () => {
    try {
        await mongoose.connect(cloudUrl)
        console.log("Connected to DB via Mongoose");
    } catch (e) {
        console.error("Error in connecting to DB", e);
        process.exit(1); // Exit with failure
    }
};
